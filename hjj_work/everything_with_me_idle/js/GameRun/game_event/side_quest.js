import { is_Empty_Object, get_monitor_ch } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';

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
            if (typeof this.monitor_target[id] == 'number') {
                this.monitor_data[id] = 0;
            } else if (typeof this.monitor_target[id] == 'boolean') {
                this.monitor_data[id] = false;
            } else {
                console.log('未知类型的监控行为目标数值，无法设定初始值');
            }
        }
    }
    //触发了监控行为，更新数值
    updata_monitor_data(type, value) {
        if (is_Empty_Object(this.monitor_data[type])) {
            //当前支线没有type这个监控行为，不需要更新数值
            return false;
        }
        if (typeof this.monitor_data[type] == 'number') {
            if (this.monitor_data[type] >= this.monitor_target[type]) {
                //这一条监控行为已经达成，不需要继续监控
                return false;
            }
            this.monitor_data[type] += value;
        } else if (typeof this.monitor_data[type] == 'boolean') {
            if (this.monitor_data[type] == this.monitor_target[type]) {
                //这一条监控行为已经达成，不需要继续监控
                return false;
            }
            this.monitor_data[type] = value;
        } else {
            console.log('非数字且非布尔类型的监控行为目标数值，异常，不知道怎么更新');
            return false;
        }
        return true;
    }
    //判断某条监控行为是否达成
    get_monitor_flag(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s支线中没有%s监控行为', this.event_id, id);
            return false;
        }
        if (typeof this.monitor_data[id] == 'number') {
            //数字型目标，当前数值达到目标值就算达成
            if (this.monitor_data[id] >= this.monitor_target[id]) {
                return true;
            } else {
                return false;
            }
        } else if (typeof this.monitor_data[id] == 'boolean') {
            //布尔型目标，当前数值和目标值一致就算达成
            if (this.monitor_data[id] == this.monitor_target[id]) {
                return true;
            } else {
                return false;
            }
        } else {
            console.log('非数字且非布尔类型的监控行为目标数值，异常，不知道怎么判断达成');
            return;
        }
    }
    //获取某条监控行为呈现到div布局中的文本
    get_monitor_ch(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s支线中没有%s监控行为', this.event_id, id);
            return false;
        }
        return get_monitor_ch(id, this.monitor_data, this.monitor_target);
    }
    //获取支线任务是否完成
    judge_quest_finish() {
        let finish_flag = true;
        for (let id in this.monitor_target) {
            if (typeof this.monitor_data[id] == 'number') {
                //数字类型目标，数值小于目标值时没有完成
                if (this.monitor_data[id] < this.monitor_target[id]) {
                    finish_flag = false;
                    break;
                }
            } else if (typeof this.monitor_data[id] == 'boolean') {
                //布尔类型目标，当前值与目标值不同时没有完成
                if (this.monitor_data[id] != this.monitor_target[id]) {
                    finish_flag = false;
                    break;
                }
            } else {
                console.log('未知类型的监控行为目标数值，无法设定初始值');
                return;
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
        this.Side_quest_objs = new Object();
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
        let now_side_quest_id = Object.keys(this.Side_quest_objs);
        if (now_side_quest_id.includes(event_id)) {
            console.log('已经处于%s支线中，不能同时启动同一个支线', event_id);
            return false;
        }
        //初始化一个支线任务对象
        let new_side_quest = new Side_quest();
        new_side_quest.init(event_id);

        this.Side_quest_objs[event_id] = new_side_quest;

        //将支线情况展示到脑海-重要事件界面中
        // this.init_side_quest_IE_div();
        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place != undefined) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();

            place_manage.set_now_place(game_events[event_id].place);
        }
        return true;
    }
    //更新支线任务进度
    updata_side_quest() {
        //检测是否有支线完成了
        for (let event_id in this.Side_quest_objs) {
            let side_quest = this.Side_quest_objs[event_id];
            let finish_flag = side_quest.judge_quest_finish();
            if (finish_flag) {
                this.end_side_quest(event_id, 'finish');
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
        let game_event_manage = global.get_game_event_manage();
        if (end_type == 'finish') {
            //支线正常完成，获得支线任务奖励
            let finish_reward = game_events[event_id].finish_reward;
            for (let key in finish_reward) {
                if (key == 'game_flag') {
                    //设置完成标记
                    for (let flag_name in finish_reward['game_flag']) {
                        global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                    }
                } else if (key == 'start_event') {
                    //启动下一个支线
                    for (let event_id of finish_reward['start_event']) {
                        game_event_manage.start_game_event(event_id);
                    }
                }
            }
            //记录玩家完成了一个支线
            global_flag_manage.set_game_log('finish_event', event_id); //在脑海-流水账里生成一条日志
            global_flag_manage.record_event_finish_end(event_id); //完成事件本身也算行为，
        } else {
            let SGS_flag_name = 'SGS_' + event_id;
            global_flag_manage.set_flag(SGS_flag_name, end_type);
        }
        //清除这个支线
        delete this.Side_quest_objs[event_id];
        game_event_manage.delete_monitor_target_summ(event_id); //游戏事件管理类中的行为监控
        // 将新的主线情况展示到脑海-重要事件界面中
        // this.init_main_quest_IE_div();
        // 统一刷新脑海-重要事件界面
        game_event_manage.init_IE_div();

        //将新的支线情况展示到脑海-重要事件界面中
        // this.init_side_quest_IE_div();
    }
    //获取当前支线任务数量
    get_side_quest_num() {
        return Object.keys(this.Side_quest_objs).length;
    }
    //获取当前支线任务id列表
    get_side_quest_id_array() {
        return Object.keys(this.Side_quest_objs);
    }
    //触发了监控行为，更新数值
    updata_monitor_data(type, value) {
        let updata_flag = false;
        for (let event_id in this.Side_quest_objs) {
            let side_quest = this.Side_quest_objs[event_id];
            let ret = side_quest.updata_monitor_data(type, value);
            if (ret) {
                updata_flag = true;
            }
        }
        //有任一支线任务的监控行为发生了更新
        if (updata_flag) {
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
                let flag = side_quest.get_monitor_flag(monitor_id);
                if (flag) {
                    monitor_flag_div.innerHTML = '☑';
                } else {
                    monitor_flag_div.innerHTML = '☐';
                }
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
                let monitor_id = monitor_value_div.dataset.monitor_id;
                let monitor_flag_div = monitor_value_div.children[0];
                let monitor_desc_div = monitor_value_div.children[1];
                //获取指定监控数据是否达成
                let flag = side_quest.get_monitor_flag(monitor_id);
                if (flag) {
                    monitor_flag_div.innerHTML = '☑';
                } else {
                    monitor_flag_div.innerHTML = '☐';
                }
                //获取指定监控数据的文本
                monitor_desc_div.innerHTML = side_quest.get_monitor_ch(monitor_id);
            }
        }
    }
    delete_side_quest_IE_div() {
        //清空原有界面
        let all_side_quest_div = document.getElementById('all_side_quest_div');
        all_side_quest_div.replaceChildren();
    }
}
