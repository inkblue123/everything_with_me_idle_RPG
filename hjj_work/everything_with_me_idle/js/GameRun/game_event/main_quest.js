import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_class.js';
import { player } from '../../Player/Player.js';
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
            //已经处于挑战中，不能同时开启多个挑战
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
            if (this.monitor_data[id] < this.monitor_target[id]) {
                finish_flag = false;
                break;
            }
        }
        if (finish_flag) {
            this.end_main_quest();
        }
    }
    //完成当前主线任务
    end_main_quest() {
        //获得主线任务奖励
        let finish_reward = game_events[this.main_quest_id].finish_reward;
        for (let key in finish_reward) {
            if (key == 'game_flag') {
                //设置完成标记
                let global_flag_manage = global.get_global_flag_manage();
                for (let flag_name in finish_reward['game_flag']) {
                    global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                    global_flag_manage.set_game_log('finish_event', flag_name);
                }
            } else if (key == 'start_event') {
                //启动下一个主线
                let game_event_manage = global.get_game_event_manage();
                for (let event_id of finish_reward['start_event']) {
                    game_event_manage.start_game_event(event_id);
                    // game_event_manage.set_game_log('finish_event', flag_name);
                }
            }
        }
        //清除数据
        this.reset_monitor_data();
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
            this.monitor_data[id] = 0;
        }
    }
    //重置参数
    reset_monitor_data() {
        this.main_quest_id = null;
        this.monitor_data = new Object();
        this.monitor_target = new Object();
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
            this.updata_main_quest();
        }
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
            monitor_flag_div.innerHTML = this.get_monitor_flag(id);
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = this.get_monitor_ch(id);
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
            monitor_flag_div.innerHTML = this.get_monitor_flag(id);
            //获取指定监控数据的文本
            monitor_desc_div.innerHTML = this.get_monitor_ch(id);
        }
    }
    //判断某条监控行为是否达成
    get_monitor_flag(id) {
        if (is_Empty_Object(this.monitor_target[id])) {
            console.log('错误，当前%s主线中没有%s监控行为', this.main_quest_id, id);
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
            console.log('错误，当前%s主线中没有%s监控行为', this.main_quest_id, id);
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
