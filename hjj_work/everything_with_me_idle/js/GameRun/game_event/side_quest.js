import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';

//一个支线任务对象
class Side_quest {
    constructor() {
        this.event_id; //这个支线任务的id
        this.monitor_data = new Object(); //需要监控的行为的监控数值
        this.monitor_target = new Object(); //需要监控的行为以及目标数值
    }
    init(event_id) {
        this.event_id = event_id;
        this.init_monitor_target();
    }
    //获取这个支线的存档
    get_save() {
        let save_obj = new Object();
        save_obj.event_id = this.event_id; //当前主线任务id
        save_obj.monitor_data = this.monitor_data; //需要监控的行为的监控数值
        return save_obj;
    }
    //使用存档初始化
    save_init(save_obj) {
        this.event_id = save_obj.event_id;
        this.monitor_data = save_obj.monitor_data;
        this.monitor_target = game_events[this.event_id].finish_condition;
    }
    //设置需要监控的行为以及他们的目标数值
    init_monitor_target() {
        this.monitor_target = game_events[this.event_id].finish_condition;
        for (let id in this.monitor_target) {
            this.monitor_data[id] = 0;
        }
    }
    //判断某条监控行为是否达成
    get_monitor_flag(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s支线中没有%s监控行为', this.event_id, id);
            return false;
        }
        if (id.startsWith('EE_')) {
            //如果完成条件是达成型
            if (this.monitor_data[id] == this.monitor_target[id]) {
                return '☑';
            } else {
                return '☐';
            }
        } else {
            //如果完成条件是累计型
            if (this.monitor_data[id] < this.monitor_target[id]) {
                return '☐';
            } else {
                return '☑';
            }
        }
    }
    //获取某条监控行为呈现到div布局中的文本
    get_monitor_ch(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s支线中没有%s监控行为', this.event_id, id);
            return false;
        }
        let ch;
        if (id.startsWith('EE_')) {
            //如果完成条件是达成型
            let monitor_id = id.slice(3);
            ch = '完成' + texts[monitor_id].event_name;
        } else {
            //如果完成条件是累计型
            ch = texts[id].condition_name + ' (' + this.monitor_data[id] + '/' + this.monitor_target[id] + ')';
        }
        return ch;
    }
    //获取支线任务是否完成
    judge_quest_finish() {
        let finish_flag = true;
        for (let id in this.monitor_target) {
            if (this.monitor_data[id] < this.monitor_target[id]) {
                finish_flag = false;
                break;
            }
        }
        return finish_flag;
    }
}
//支线任务管理类
export class Side_quest_manage {
    constructor() {
        this.Side_quest_objs = new Object();
    }
    //获取支线任务的游戏存档
    save_side_quest_manage() {
        let side_quest_save = new Object();
        for (let side_id in this.Side_quest_objs) {
            let side_save = this.Side_quest_objs[side_id].get_save();
            side_quest_save[side_id] = side_save;
        }
        return side_quest_save;
    }
    //加载支线任务的游戏存档
    load_side_quest_manage(side_quest_save) {
        if (is_Empty_Object(side_quest_save)) {
            return;
        }
        for (let side_id in side_quest_save) {
            this.Side_quest_objs[side_id] = new Side_quest();
            this.Side_quest_objs[side_id].save_init(side_quest_save[side_id]);
        }
        //加载存档时由外面的游戏事件类统一初始化界面
        // this.init_side_quest_IE_div();
    }
    //启动支线任务
    start_side_quest(event_id) {
        for (let old_event_id in this.Side_quest_objs) {
            if (old_event_id == event_id) {
                console.log('已经处于%s支线中，不能同时启动同一个支线', old_event_id);
                return;
            }
        }
        //初始化一个支线任务对象
        let new_side_quest = new Side_quest();
        new_side_quest.init(event_id);

        this.Side_quest_objs[event_id] = new_side_quest;

        //将支线情况展示到脑海-重要事件界面中
        this.init_side_quest_IE_div();
        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place != undefined) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();

            place_manage.set_now_place(game_events[event_id].place);
        }
    }
    //更新支线任务进度
    updata_side_quest() {
        //检测是否有支线完成了
        for (let event_id in this.Side_quest_objs) {
            let side_quest = this.Side_quest_objs[event_id];
            let finish_flag = side_quest.judge_quest_finish();
            if (finish_flag) {
                end_side_quest(event_id, 'finish');
            }
        }
        //有支线任务的监控数据发生了变化，更新重要事件界面
        this.updata_side_quest_IE_div();
    }
    //结束一个当前拥有的指定支线任务
    end_side_quest(event_id, end_type) {
        if (is_Empty_Object(this.Side_quest_objs[event_id])) {
            console.log('当前没有%s支线，无法关闭');
            return;
        }
        let global_flag_manage = global.get_global_flag_manage();
        if (end_type == 'finish') {
            //支线正常完成，获得支线任务奖励
            let finish_reward = game_events[event_id].finish_reward;
            for (let key in finish_reward) {
                if (key == 'game_flag') {
                    //设置完成标记
                    for (let flag_name in finish_reward['game_flag']) {
                        global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                        global_flag_manage.set_game_log('finish_event', flag_name);
                    }
                } else if (key == 'start_event') {
                    //启动下一个支线
                    let game_event_manage = global.get_game_event_manage();
                    for (let event_id of finish_reward['start_event']) {
                        game_event_manage.start_game_event(event_id);
                    }
                }
            }
            //记录玩家完成了一个支线
            global_flag_manage.record_event_finish_end(event_id);
        } else {
            let SGS_flag_name = 'SGS_' + event_id;
            global_flag_manage.set_flag(SGS_flag_name, end_type);
        }
        //清除这个支线
        delete this.Side_quest_objs[event_id];

        //将新的支线情况展示到脑海-重要事件界面中
        this.init_side_quest_IE_div();
    }
    //获取当前支线任务数量
    get_side_quest_num() {
        return Object.keys(this.Side_quest_objs).length;
    }
    //玩家行为-有事件正常完成结束
    record_event_finish_end(event_id) {
        let change_flag = false; //变动标记
        for (let id in this.monitor_data) {
            //寻找当前需要监控的数据中关于完成事件的条件
            if (!id.startsWith('EE_')) continue;
            let monitor_event_id = id.slice(3);
            if (monitor_event_id == event_id && this.monitor_data[id] != true) {
                this.monitor_data[id] = true;
                change_flag = true;
            }
        }
        if (change_flag) {
            this.updata_side_quest();
        }
    }
    //击杀敌人记录
    record_kill_enemy_num(attack_effect) {
        if (is_Empty_Object(Side_quest_objs)) {
            //当前没有任何支线，不需要监控任何参数
            return;
        }

        let change_flag = false;
        for (let event_id in this.Side_quest_objs) {
            let side_quest = this.Side_quest_objs[event_id];
            for (let id in side_quest.monitor_data) {
                if (!id.startsWith('PKL_')) {
                    continue;
                }
                switch (id) {
                    case 'PKL_melee_kill': //近战击杀
                        //判断击杀是否属于近战伤害击杀
                        if (attack_effect.damage_type == 'melee') {
                            if (side_quest.monitor_data[id] < side_quest.monitor_target[id]) {
                                side_quest.monitor_data[id]++;
                                change_flag = true;
                            }
                        }
                        break;
                    default:
                        console.log('错误的需要监控的击杀敌人行为，未定义相应的监控函数，%s', id);
                        break;
                }
            }
        }
        //如果有监控的参数变动，更新当前游戏事件
        if (change_flag) {
            this.updata_side_quest();
        }
    }
    //初始化脑海-重要事件界面中关于支线任务的信息
    init_side_quest_IE_div() {
        //清空原有界面
        let all_side_quest_div = document.getElementById('all_side_quest_div');
        all_side_quest_div.replaceChildren();
        //遍历每个支线任务
        for (let event_id in this.Side_quest_objs) {
            let side_quest = this.Side_quest_objs[event_id];
            let a_side_quest_div = addElement(all_side_quest_div, 'div', null, 'a_side_quest_div');
            a_side_quest_div.dataset.event_id = event_id;
            //支线任务的标题和名称
            let IE_name_div = addElement(a_side_quest_div, 'div', null, 'IE_name_div');
            let event_name = game_events[event_id].name;
            IE_name_div.innerHTML = '支线任务：' + event_name;
            //支线任务的完成条件
            let IE_monitor_data_div = addElement(a_side_quest_div, 'div', null, 'IE_monitor_data_div');
            for (let monitor_id in side_quest.monitor_target) {
                let monitor_value_div = addElement(IE_monitor_data_div, 'div', null, 'monitor_value_div');
                monitor_value_div.dataset.monitor_id = monitor_id;
                let monitor_flag_div = addElement(monitor_value_div, 'div', null, 'monitor_flag_div');
                let monitor_desc_div = addElement(monitor_value_div, 'div', null, 'monitor_desc_div');
                //获取指定监控数据是否达成
                monitor_flag_div.innerHTML = side_quest.get_monitor_flag(monitor_id);
                //获取指定监控数据的文本
                monitor_desc_div.innerHTML = side_quest.get_monitor_ch(monitor_id);
            }
        }
    }
    //更新脑海-重要事件界面中关于支线任务的信息
    updata_side_quest_IE_div() {
        let all_side_quest_div = document.getElementById('all_side_quest_div');
        //更新每个支线的监控数据
        for (let a_side_quest_div of all_side_quest_div.children) {
            let event_id = a_side_quest_div.dataset.event_id;
            let IE_monitor_data_div = a_side_quest_div.children[1]; //获取容纳监控数据的父div

            let side_quest = this.Side_quest_objs[event_id]; //获取这个支线任务
            for (let monitor_value_div of IE_monitor_data_div.children) {
                let monitor_id = monitor_value_div.dataset.id;
                let monitor_flag_div = monitor_value_div.children[0];
                let monitor_desc_div = monitor_value_div.children[1];
                //获取指定监控数据是否达成
                monitor_flag_div.innerHTML = side_quest.get_monitor_flag(monitor_id);
                //获取指定监控数据的文本
                monitor_desc_div.innerHTML = side_quest.get_monitor_ch(monitor_id);
            }
        }
    }
}
