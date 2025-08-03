import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';

//挑战管理类
export class Challenge_manage {
    constructor() {
        this.challenge_id = null; //当前主线任务id
        this.event_start_place = null; //当前进行的挑战的启动地点
        this.monitor_data = new Object(); //需要监控的行为的监控数值
        this.monitor_target = new Object(); //需要监控的行为以及目标数值
    }
    //获取挑战的游戏存档
    save_challenge_manage() {
        let challenge_save = new Object();
        challenge_save.challenge_id = this.challenge_id; //当前主线任务id
        if (this.challenge_id != null) {
            challenge_save.event_start_place = this.event_start_place; //当前进行的挑战的启动地点
            challenge_save.monitor_data = this.monitor_data; //需要监控的行为的监控数值
        }
        return challenge_save;
    }
    //加载挑战的游戏存档
    load_challenge_manage(challenge_save) {
        if (is_Empty_Object(challenge_save)) {
            return;
        }
        this.challenge_id = challenge_save.challenge_id; //当前事件
        if (this.challenge_id != null) {
            this.event_start_place = challenge_save.event_start_place; //当前进行的挑战的启动地点
            this.monitor_data = challenge_save.monitor_data; //需要监控的行为的监控数值
            this.monitor_target = game_events[this.challenge_id].finish_condition;
        }
        //加载存档时由外面的游戏事件类统一初始化界面
        // this.init_challenge_IE_div();
    }
    //启动挑战事件
    start_challenge(event_id) {
        if (global.get_flag('GS_challenge_flag')) {
            //已经处于挑战中，不能同时开启多个挑战
            return 0;
        }
        //进入事件状态
        global.set_flag('GS_challenge_flag', true);
        this.challenge_id = event_id;

        //初始化需要监控的行为以及他们的目标数值
        this.init_monitor_target();
        //将监测情况展示到脑海-重要事件界面中
        this.init_challenge_IE_div();

        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();
            place_manage.set_now_place(game_events[event_id].place);
        }
    }

    //更新当前游戏事件
    updata_challenge() {
        //更新脑海-重要事件界面中的数值
        this.updata_challenge_IE_div();
        //检测事件目标是否达成
        let finish_flag = true;
        for (let id in this.monitor_target) {
            if (this.monitor_data[id] < this.monitor_target[id]) {
                finish_flag = false;
                break;
            }
        }
        if (finish_flag) {
            this.end_challenge('finish');
        }
    }
    //结束当前挑战
    end_challenge(end_type) {
        if (this.challenge_id == null) {
            console.log('错误：当前没有挑战');
            return;
        }
        //关闭事件状态
        global.set_flag('GS_challenge_flag', false);

        let event_id = this.challenge_id;
        let global_flag_manage = global.get_global_flag_manage();
        if (end_type == 'finish') {
            //挑战正常完成，获得奖励
            let finish_reward = game_events[event_id].finish_reward;
            for (let key in finish_reward) {
                if (key == 'game_flag') {
                    //设置完成标记
                    for (let flag_name in finish_reward['game_flag']) {
                        global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                        global_flag_manage.set_game_log('finish_event', flag_name);
                    }
                } else if (key == 'start_event') {
                    //启动相连的其他事件
                    let game_event_manage = global.get_game_event_manage();
                    for (let new_event_id of finish_reward['start_event']) {
                        game_event_manage.start_game_event(new_event_id);
                    }
                }
            }
            //记录玩家完成了一个事件
            global_flag_manage.record_event_finish_end(event_id);
        }

        let SGS_flag_name = 'SGS_' + event_id;
        global_flag_manage.set_flag(SGS_flag_name, end_type);

        //如果当前挑战有起始地点，那么退出时应该回到进入事件的位置
        if (game_events[event_id].place != undefined) {
            let place_manage = global.get_place_manage();
            place_manage.set_now_place(this.event_start_place);
        }
        //清除数据
        this.reset_monitor_data(); //挑战管理类中的行为监控
        let global_event_manage = global.get_game_event_manage();
        global_event_manage.delete_monitor_target_summ(event_id); //游戏事件管理类中的行为监控

        //清除挑战界面信息
        this.reset_challenge_IE_div();
    }
    //获取当前挑战id
    get_now_challenge_id() {
        return this.challenge_id;
    }
    //初始化需要监控的行为以及他们的目标数值
    init_monitor_target() {
        this.monitor_target = game_events[this.challenge_id].finish_condition;
        for (let id in this.monitor_target) {
            this.monitor_data[id] = 0;
        }
    }
    //重置参数
    reset_monitor_data() {
        this.challenge_id = null;
        this.event_start_place = null;
        this.monitor_data = new Object();
        this.monitor_target = new Object();
    }
    //触发了监控行为，更新数值
    updata_monitor_data(type, value) {
        if (this.challenge_id == null) {
            //当前没有挑战，不需要监控任何参数
            console.log('当前没有挑战，却触发了更新函数，说明外部程序没有更新好挑战的监控行为');
            return;
        }
        if (this.monitor_data[type] >= this.monitor_target[type]) {
            //这一条监控行为已经达成，不需要继续监控
            return;
        }
        this.monitor_data[type] += value;
        this.updata_challenge();
    }
    //初始化脑海-重要事件界面中关于挑战的信息
    init_challenge_IE_div() {
        //当前没有事件，不需要更新
        if (this.challenge_id == null) {
            this.reset_challenge_IE_div();
            return;
        }
        let challenge_div = document.getElementById('challenge_div');
        challenge_div.replaceChildren();
        //挑战的标题和名称
        let IE_name_div = addElement(challenge_div, 'div', null, 'IE_name_div');
        let event_name = game_events[this.challenge_id].name;
        IE_name_div.innerHTML = '挑战：' + event_name;
        //挑战的完成条件
        let IE_monitor_data_div = addElement(challenge_div, 'div', null, 'IE_monitor_data_div');
        for (let monitor_id in this.monitor_target) {
            let monitor_value_div = addElement(IE_monitor_data_div, 'div', null, 'monitor_value_div');
            monitor_value_div.dataset.monitor_id = monitor_id;
            let monitor_flag_div = addElement(monitor_value_div, 'div', null, 'monitor_flag_div');
            let monitor_desc_div = addElement(monitor_value_div, 'div', null, 'monitor_desc_div');
            //获取指定监控数据是否达成
            monitor_flag_div.innerHTML = this.get_monitor_flag(monitor_id);
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = this.get_monitor_ch(monitor_id);
        }
    }
    //更新脑海-重要事件界面中关于挑战的信息
    updata_challenge_IE_div() {
        //当前没有事件，不需要更新
        if (this.challenge_id == null) {
            console.log('错误：没有挑战却初始化挑战信息界面，需要判断运行情况是否正常');
            return;
        }
        let challenge_div = document.getElementById('challenge_div');
        //更新挑战的监控数据
        let IE_monitor_data_div = challenge_div.children[1]; //获取容纳监控数据的父div
        for (let monitor_value_div of IE_monitor_data_div.children) {
            let monitor_id = monitor_value_div.dataset.monitor_id;
            let monitor_flag_div = monitor_value_div.children[0];
            let monitor_desc_div = monitor_value_div.children[1];
            //获取指定监控数据是否达成
            monitor_flag_div.innerHTML = this.get_monitor_flag(monitor_id);
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = this.get_monitor_ch(monitor_id);
        }
    }
    //清空脑海-重要事件界面中关于挑战的信息
    reset_challenge_IE_div() {
        //清空原本内容
        let challenge_div = document.getElementById('challenge_div');
        challenge_div.replaceChildren();
        // let IE_name_div = addElement(challenge_div, 'div', null, 'IE_name_div');
        // IE_name_div.innerHTML = '当前没有挑战';
    }
    //判断某条监控行为是否达成
    get_monitor_flag(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s挑战中没有%s监控行为', this.challenge_id, id);
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
            console.log('错误，当前%s挑战中没有%s监控行为', this.challenge_id, id);
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
}
