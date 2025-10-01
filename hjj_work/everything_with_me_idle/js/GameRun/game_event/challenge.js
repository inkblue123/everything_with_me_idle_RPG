import { is_Empty_Object, get_monitor_ch } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';

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
            return false;
        }
        //进入事件状态
        global.set_flag('GS_challenge_flag', true);
        this.challenge_id = event_id;

        //初始化需要监控的行为以及他们的目标数值
        this.init_monitor_target();
        //将监测情况展示到脑海-重要事件界面中
        //外面的游戏事件类统一初始化界面
        // this.init_challenge_IE_div();

        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();
            place_manage.set_now_place(game_events[event_id].place);
        }
        return true;
    }

    //更新当前游戏事件
    updata_challenge() {
        //更新脑海-重要事件界面中的数值
        this.updata_challenge_IE_div();
        //检测事件目标是否达成
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
            global_flag_manage.set_game_log('finish_event', event_id);
            global_flag_manage.record_event_finish_end(event_id);
        }
        //挑战结束原因设置短期游戏参数
        let SGS_flag_name = 'SGS_' + event_id;
        global_flag_manage.set_flag(SGS_flag_name, end_type);

        //如果当前挑战有起始地点，那么退出时应该回到进入事件的位置
        if (game_events[event_id].place != undefined) {
            let place_manage = global.get_place_manage();
            place_manage.set_now_place(this.event_start_place);
        }
        //清除数据
        this.reset_monitor_data(); //挑战管理类中的行为监控
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.delete_monitor_target_summ(event_id); //游戏事件管理类中的行为监控

        //清除挑战界面信息
        // this.delete_challenge_IE_div();
        // 统一刷新脑海-重要事件界面
        game_event_manage.init_IE_div();
    }
    //获取当前挑战id
    get_now_challenge_id() {
        return this.challenge_id;
    }
    //初始化需要监控的行为以及他们的目标数值
    init_monitor_target() {
        this.monitor_target = game_events[this.challenge_id].finish_condition;
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
        if (typeof this.monitor_data[type] == 'number') {
            if (this.monitor_data[type] >= this.monitor_target[type]) {
                //这一条监控行为已经达成，不需要继续监控
                return;
            }
            this.monitor_data[type] += value;
        } else if (typeof this.monitor_data[type] == 'boolean') {
            if (this.monitor_data[type] == this.monitor_target[type]) {
                //这一条监控行为已经达成，不需要继续监控
                return;
            }
            this.monitor_data[type] = value;
        } else {
            console.log('非数字且非布尔类型的监控行为目标数值，异常，不知道怎么更新');
            return;
        }
        this.updata_challenge();
    }
    //初始化脑海-重要事件界面中关于挑战的信息
    init_challenge_IE_div() {
        //当前没有事件，不需要更新
        if (this.challenge_id == null) {
            this.delete_challenge_IE_div();
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
            //获取指定监控数据是否达成，转换成图标
            let flag = this.get_monitor_flag(monitor_id);
            if (flag) {
                monitor_flag_div.innerHTML = '☑';
            } else {
                monitor_flag_div.innerHTML = '☐';
            }
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = get_monitor_ch(monitor_id, this.monitor_data, this.monitor_target);
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
            let flag = this.get_monitor_flag(monitor_id);
            if (flag) {
                monitor_flag_div.innerHTML = '☑';
            } else {
                monitor_flag_div.innerHTML = '☐';
            }
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = get_monitor_ch(monitor_id, this.monitor_data, this.monitor_target);
        }
    }
    //清空脑海-重要事件界面中关于挑战的信息
    delete_challenge_IE_div() {
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
}
