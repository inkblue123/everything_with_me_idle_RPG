import { is_Empty_Object, get_monitor_ch } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
//主线任务管理类
export class Main_quest_manage {
    constructor() {
        this.main_quest_id = null; //当前主线任务id
        this.monitor_data = new Object(); //需要监控的行为的监控数值
        this.monitor_target = new Object(); //需要监控的行为以及目标数值
    }
    //获取主线任务的游戏存档
    save_main_quest_manage() {
        let main_quest_save = new Object();

        main_quest_save.main_quest_id = this.main_quest_id; //当前主线任务id
        main_quest_save.monitor_data = this.monitor_data; //需要监控的行为的监控数值

        return main_quest_save;
    }
    //加载主线任务的游戏存档
    load_main_quest_manage(main_quest_save) {
        if (is_Empty_Object(main_quest_save)) {
            return;
        }
        this.main_quest_id = main_quest_save.main_quest_id; //当前事件
        if (this.main_quest_id == null) {
            return;
        }
        //继承存档中正在进行的事件进度
        this.monitor_data = main_quest_save.monitor_data; //需要监控的行为的监控数值
        this.monitor_target = game_events[this.main_quest_id].finish_condition;
        //加载右下角的重要事件界面
        //加载存档时由外面的游戏事件类统一初始化界面
        // this.init_main_quest_IE_div();
    }
    //启动主线任务
    start_main_quest(event_id) {
        if (this.main_quest_id != null) {
            //已经处于主线中，不能同时开启另一个主线
            console.log('已经处于%s主线中，不能同时启动另一个主线', this.main_quest_id);
            return 0;
        }
        //进入事件状态
        this.main_quest_id = event_id;

        //启动事件游戏参数监测
        this.init_monitor_target();
        //将主线情况展示到脑海-重要事件界面中
        this.init_main_quest_IE_div();
    }

    //更新主线任务进度
    updata_main_quest() {
        //更新脑海-重要事件界面中的数值
        this.updata_main_quest_IE_div();
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
            this.end_main_quest('finish');
        }
    }
    //完成当前主线任务
    end_main_quest(end_type) {
        let event_id = this.main_quest_id;
        let game_event_manage = global.get_game_event_manage();
        if (end_type == 'finish') {
            //获得主线任务奖励
            let global_flag_manage = global.get_global_flag_manage();
            let finish_reward = game_events[this.main_quest_id].finish_reward;
            for (let key in finish_reward) {
                if (key == 'game_flag') {
                    //设置完成标记
                    for (let flag_name in finish_reward['game_flag']) {
                        global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                        global_flag_manage.set_game_log('finish_event', flag_name);
                    }
                } else if (key == 'start_event') {
                    //启动下一个主线
                    for (let id of finish_reward['start_event']) {
                        game_event_manage.start_game_event(id);
                    }
                }
            }
            //记录玩家完成了一个事件
            global_flag_manage.record_event_finish_end(event_id);
        } else {
            console.log('理论上主线只能正常完成，不存在其他结束状态，遇到了异常状态%s', end_type);
        }
        //清除数据
        this.reset_monitor_data(); //主线任务类中的行为监控
        game_event_manage.delete_monitor_target_summ(event_id); //游戏事件管理类中的行为监控
        //将新的主线情况展示到脑海-重要事件界面中
        this.init_main_quest_IE_div();
    }
    //获取主线任务id
    get_main_quest_id() {
        return this.main_quest_id;
    }
    //设置需要监控的行为以及他们的目标数值
    init_monitor_target() {
        this.monitor_target = game_events[this.main_quest_id].finish_condition;
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
        this.main_quest_id = null;
        this.monitor_data = new Object();
        this.monitor_target = new Object();
    }
    //触发了监控行为，更新数值
    updata_monitor_data(type, value) {
        if (this.main_quest_id == null) {
            //当前没有挑战，不需要监控任何参数
            console.log('当前没有主线，却触发了更新函数，说明外部程序没有更新好主线的监控行为');
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
        this.updata_main_quest();
    }
    //初始化脑海-重要事件界面中关于主线任务的信息
    init_main_quest_IE_div() {
        //清空原有界面
        let main_quest_div = document.getElementById('main_quest_div');
        main_quest_div.replaceChildren();
        if (this.main_quest_id == null) {
            // console.log('错误：没有主线却初始化主线信息，需要判断运行情况是否正常');
            return;
        }
        //主线任务的标题和名称
        let IE_name_div = addElement(main_quest_div, 'div', null, 'IE_name_div');
        let event_name = game_events[this.main_quest_id].name;
        IE_name_div.innerHTML = '主线任务：' + event_name;
        //主线任务的达成条件
        let IE_monitor_data_div = addElement(main_quest_div, 'div', null, 'IE_monitor_data_div');
        for (let id in this.monitor_target) {
            let monitor_value_div = addElement(IE_monitor_data_div, 'div', null, 'monitor_value_div');
            monitor_value_div.dataset.id = id;
            let monitor_flag_div = addElement(monitor_value_div, 'div', null, 'monitor_flag_div');
            let monitor_desc_div = addElement(monitor_value_div, 'div', null, 'monitor_desc_div');
            //获取指定监控数据是否达成
            let flag = this.get_monitor_flag(id);
            if (flag) {
                monitor_flag_div.innerHTML = '☑';
            } else {
                monitor_flag_div.innerHTML = '☐';
            }
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = get_monitor_ch(id, this.monitor_data, this.monitor_target);
        }
    }
    //更新脑海-重要事件界面中关于主线任务的信息
    updata_main_quest_IE_div() {
        //当前没有事件，不需要更新
        if (this.main_quest_id == null) {
            console.log('错误：没有主线却初始化主线信息，需要判断运行情况是否正常');
            return;
        }
        let main_quest_div = document.getElementById('main_quest_div');
        let IE_monitor_data_div = main_quest_div.children[1];
        for (let i = 0; i < IE_monitor_data_div.children.length; i++) {
            let monitor_value_div = IE_monitor_data_div.children[i];
            let id = monitor_value_div.dataset.id;
            let monitor_flag_div = monitor_value_div.children[0];
            let monitor_desc_div = monitor_value_div.children[1];
            //获取指定监控数据是否达成
            let flag = this.get_monitor_flag(id);
            if (flag) {
                monitor_flag_div.innerHTML = '☑';
            } else {
                monitor_flag_div.innerHTML = '☐';
            }
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = get_monitor_ch(id, this.monitor_data, this.monitor_target);
        }
    }
    //判断某条监控行为是否达成
    get_monitor_flag(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s主线中没有%s监控行为', this.main_quest_id, id);
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
