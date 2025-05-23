import { is_Empty_Object } from '../Function/Function.js';
import { addElement, Gradient_div } from '../Function/Dom_function.js';
import { updata_BP_value } from '../Function/Updata_func.js';
import { game_events } from '../Data/Game_event/Game_Event.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { global } from './global_class.js';
import { player } from '../Player/Player.js';

//游戏事件类
export class Game_event_manage {
    constructor() {}
    init() {
        this.now_event_id = null; //当前进行的事件id
        this.event_start_place; //当前进行的事件的启动地点
        this.monitor_data = new Object(); //需要监控的行为的监控数值
        this.monitor_target = new Object(); //需要监控的行为以及目标数值
        this.mini_event_button_flag = new Object(); //迷你事件的按键情况记录
    }
    //启动一个游戏事件，激活相关接口
    start_game_event(event_id) {
        //异常处理
        if (is_Empty_Object(game_events[event_id])) {
            console.log('未定义事件%s', event_id);
            return;
        }

        if (game_events[event_id].type == 'challenge') {
            this.start_challenge(event_id);
        } else if (game_events[event_id].type == 'mini_event') {
            this.start_mini_event(event_id);
        }
    }
    //启动挑战事件
    start_challenge(event_id) {
        let global_flag_manage = global.get_global_flag_manage();
        if (global_flag_manage.get_game_status('GS_game_event')) {
            //已经处于挑战中，不能同时开启多个挑战
            return 0;
        }
        //进入事件状态
        global_flag_manage.set_game_status('GS_game_event', true);
        this.now_event_id = event_id;

        //启动事件游戏参数监测
        this.set_monitor_target(game_events[event_id].finish_condition);
        //将监测情况展示到脑海-重要事件界面中
        this.init_IE_div(event_id);

        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();

            // place_manage.set_event_start_place(now_place);
            place_manage.set_now_place(game_events[event_id].place);
        }
    }
    //设置需要监控的行为以及他们的目标数值
    set_monitor_target(monitor_target) {
        this.monitor_target = monitor_target;
        for (let id in monitor_target) {
            this.monitor_data[id] = 0;
        }
    }
    //更新当前游戏事件
    updata_game_event() {
        //更新脑海-重要事件界面中的数值
        this.updata_IE_div();
        //检测事件目标是否达成
        let finish_flag = true;
        for (let id in this.monitor_target) {
            if (this.monitor_data[id] < this.monitor_target[id]) {
                finish_flag = false;
                break;
            }
        }
        if (finish_flag) {
            this.end_game_event('finish');
        }
    }
    //结束当前游戏事件
    end_game_event(flag) {
        if (flag == 'finish') {
            //当前事件正常完成
            let finish_reward = game_events[this.now_event_id].finish_reward;
            for (let key in finish_reward) {
                if (key == 'game_flag') {
                    //设置完成标记
                    let global_flag_manage = global.get_global_flag_manage();
                    for (let flag_name in finish_reward['game_flag']) {
                        global_flag_manage.set_flag(flag_name, finish_reward['game_flag'][flag_name]);
                        global_flag_manage.set_finish_event_game_log(flag_name);
                    }
                }
                //  else if (key == 'item') {
                //     //给予物品奖励
                // }
            }
        }
        // else if (flag == 'exit') {
        //     //当前事件是玩家中断退出
        // } else if (flag == 'death') {
        //     //当前事件是玩家中断退出
        // }
        //事件退出原因设置
        let global_flag_manage = global.get_global_flag_manage();
        let SGS_flag_name = 'SGS_' + this.now_event_id;
        global_flag_manage.set_short_game_status(SGS_flag_name, flag);

        //如果当前事件有专属地点，则退出这个地点，回到进入事件的位置
        if (game_events[this.now_event_id].place) {
            let place_manage = global.get_place_manage();
            place_manage.set_now_place(this.event_start_place);
        }

        //清除数据
        this.reset_monitor_data();
        //关闭事件状态
        // let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_status('GS_game_event', false);
        //更新脑海-重要事件界面
        this.init_IE_div();
    }
    get_now_event_id() {
        return this.now_event_id;
    }
    //重置参数
    reset_monitor_data() {
        this.now_event_id = null;
        this.event_start_place = null;
        this.monitor_data = new Object();
        this.monitor_target = new Object();
    }

    //攻击次数记录
    record_attack_num() {
        if (this.now_event_id != null) {
            this.updata_game_event();
        }
    }
    //受击次数记录
    record_attacted_num() {
        if (this.now_event_id == null) {
            //当前没有事件，不需要监控任何参数
            return;
        }
        let change_flag = false;
        for (let id in this.monitor_data) {
            //寻找当前需要监控的数据中的受击类型数据
            if (!id.startsWith('ATD_')) continue;
            switch (id) {
                case 'ATD_all_armor': //4个防具部位都有穿着的情况下受击
                    //判断现在身上4个防具部位是否都有防具
                    let player_worn_EQP = player.get_player_worn_EQP();
                    if (player_worn_EQP.if_all_armor_attacted()) {
                        if (this.monitor_data[id] < this.monitor_target[id]) {
                            this.monitor_data[id]++;
                            change_flag = true;
                        }
                    }
                    break;
                default:
                    console.log('错误的需要监控的受击行为，未定义相应的监控函数，%s', id);
                    break;
            }
        }
        //如果有监控的参数变动，更新当前游戏事件
        if (change_flag) this.updata_game_event();
    }
    //防御技能生效记录
    record_defense_skill_effect(skill_id) {
        if (this.now_event_id == null) {
            //当前没有事件，不需要监控任何参数
            return;
        }
        let change_flag = false;
        for (let monitor_id in this.monitor_data) {
            //寻找当前需要监控的数据中的防御技能生效类型数据
            if (!monitor_id.startsWith('DSE_')) continue;

            let monitor_skill = monitor_id.substring(4);
            if (monitor_skill == skill_id) {
                if (this.monitor_data[monitor_id] < this.monitor_target[monitor_id]) {
                    this.monitor_data[monitor_id]++;
                    change_flag = true;
                }
            }
        }
        //如果有监控的参数变动，更新当前游戏事件
        if (change_flag) this.updata_game_event();
    }
    //击杀敌人记录
    record_kill_enemy_num(attack_effect) {
        if (this.now_event_id == null) {
            //当前没有事件，不需要监控任何参数
            return;
        }
        let change_flag = false;
        for (let id in this.monitor_data) {
            if (!enums.Player_kill_enemy_status.includes(id)) {
                continue;
            }
            switch (id) {
                case 'melee_kill': //近战击杀
                    //判断击杀是否属于近战伤害击杀
                    if (attack_effect.damage_type == 'melee') {
                        if (this.monitor_data[id] < this.monitor_target[id]) {
                            this.monitor_data[id]++;
                            change_flag = true;
                        }
                    }
                    break;
                default:
                    console.log('错误的需要监控的击杀敌人行为，未定义相应的监控函数，%s', id);
                    break;
            }
        }
        //如果有监控的参数变动，更新当前游戏事件
        if (change_flag) this.updata_game_event();
    }

    //启动迷你事件
    start_mini_event(event_id) {
        //判断该事件是否满足启动条件
        let ret = this.check_mini_event_start(event_id);
        if (ret != 'start') {
            //事件不能启动
            this.end_mini_event(event_id, ret);
            return;
        }
        // 获取玩家控制界面
        let control = document.getElementById('control');
        //展示新地点的内容
        control.show_mini_event_process(event_id, 'first');
    }
    //判断迷你事件是否满足启动条件
    check_mini_event_start(event_id) {
        if (game_events[event_id].isrepeat == false) {
            if (global.get_flag(event_id) == true) {
                return 'repeat_false';
            }
        }
        return 'start';
    }
    //玩家在迷你事件的一个流程中点击了一个按钮，更新迷你事件
    updata_mini_event(event_id, now_process_id, button_id) {
        //获取当前迷你事件的所处流程
        let now_process = game_events[event_id].process[now_process_id];
        let click_button = now_process.button[button_id];

        //如果这个按钮有要做的事
        if (!is_Empty_Object(click_button.thing)) {
            this.handle_button_thing(click_button);
        }
        if (click_button.click_type == 'next_process') {
            //如果这个按钮是进入下一流程的按钮
            this.handle_button_next_process(event_id, click_button);
        } else if (click_button.click_type == 'chat') {
            //如果这个按钮是对话按钮
            this.handle_button_chat(event_id, now_process_id, button_id);
        }
    }
    //处理按下按钮之后要做的事情
    handle_button_thing(click_button) {
        let thing_obj = click_button.thing;
        for (let thing_type in thing_obj) {
            if (thing_type == 'get_skill') {
                //给予技能
                let All_Skills = player.get_player_All_Skills();
                for (let skill_id of thing_obj[thing_type]) {
                    All_Skills.player_unlock_skill(skill_id);
                }
            } else if (thing_type == 'get_item') {
                //给予物品
                for (let item_obj of thing_obj[thing_type]) {
                    let id = item_obj.id;
                    let num = item_obj.num;
                    let equip_rarity = item_obj.equip_rarity;
                    player.Player_get_item(id, num, equip_rarity);
                }
            } else if (thing_type == 'show_div') {
                //渐变显示div
                for (let div_id of thing_obj[thing_type]) {
                    Gradient_div(div_id);
                }
            } else if (thing_type == 'move_place') {
                //移动到新地点
                let place_manage = global.get_place_manage();
                let place_id = thing_obj[thing_type];
                place_manage.goto_mini_event_new_place(place_id);
                // place_manage.set_now_place(place_id);
            } else if (thing_type == 'reset_time') {
                //刷新游戏日期
                let time_manage = global.get_time_manage();
                time_manage.reset_game_date();
            } else if (thing_type == 'set_player_attr') {
                //设置玩家属性
                let player_attributes = player.get_player_attributes();
                for (let attr_obj of thing_obj[thing_type]) {
                    let id = attr_obj.id;
                    let value = attr_obj.value;
                    player_attributes.set_a_attr(id, value);
                }
            }
        }
    }
    //处理按下按钮之后触发的对话
    handle_button_chat(event_id, now_process_id, button_id) {
        // let now_process = game_events[event_id].process[now_process_id];
        //记录这个按钮按过了
        this.mini_event_button_flag[button_id] = true;
        //重新展示当前流程，完成对话
        let control = document.getElementById('control');
        control.show_mini_event_process(event_id, now_process_id, button_id);
    }
    //处理按下按钮之后，迷你事件进入下一流程
    handle_button_next_process(event_id, click_button) {
        let next_process_id = click_button.next;
        if (next_process_id == 'end') {
            //下一流程是结束流程，进入结束的函数
            this.end_mini_event(event_id, 'finish');
        } else {
            //正常进入下一流程
            let control = document.getElementById('control');
            control.show_mini_event_process(event_id, next_process_id);
        }
    }
    //判断当前是否满足迷你事件中的一个按钮的出现条件
    check_mini_event_button_condition(event_id, process_id, button_id) {
        let button = game_events[event_id].process[process_id].button[button_id];
        //如果这个按钮没有设置出现条件，默认出现
        if (is_Empty_Object(button.condition)) {
            return true;
        }
        //目前只支持判定指定按钮是否按下过
        let flag = true;
        for (let condition_name in button.condition) {
            let condition_status = button.condition[condition_name];
            //防止未定义的判定
            if (this.mini_event_button_flag[condition_name] == undefined) {
                this.mini_event_button_flag[condition_name] = false;
            }
            if (this.mini_event_button_flag[condition_name] != condition_status) {
                flag = false;
                break;
            }
        }
        return flag;
    }
    //迷你事件结束
    end_mini_event(event_id, flag) {
        let global_flag_manage = global.get_global_flag_manage();
        if (flag == 'finish') {
            //事件完成
            global_flag_manage.set_flag(event_id, flag);
            global_flag_manage.set_finish_event_game_log(event_id);
        }
        //迷你事件退出原因设置
        let SGS_flag_name = 'SGS_' + event_id;
        global_flag_manage.set_flag(SGS_flag_name, flag);
        //迷你事件结束，回到当前地点
        let place_manage = global.get_place_manage();
        let now_place_id = place_manage.get_now_place();
        place_manage.set_now_place(now_place_id);
    }
    //初始化脑海-重要事件界面的信息
    init_IE_div(event_id) {
        if (this.now_event_id == null) {
            this.reset_IE_div();
        } else if (game_events[event_id].type == 'challenge') {
            let IE_value_div = document.getElementById('IE_value_div');
            IE_value_div.replaceChildren();
            let IE_name_div = addElement(IE_value_div, 'div', null, 'IE_name_div');
            let event_name = game_events[event_id].name;
            IE_name_div.innerHTML = '当前事件：' + event_name;
            let IE_monitor_data_div = addElement(IE_value_div, 'div', null, 'IE_monitor_data_div');
            for (let id in this.monitor_target) {
                let monitor_value_div = addElement(IE_monitor_data_div, 'div', null, 'monitor_value_div');
                monitor_value_div.id = id;
                let monitor_flag_div = addElement(monitor_value_div, 'div', null, 'monitor_flag_div');
                monitor_flag_div.innerHTML = '☐';
                let monitor_desc_div = addElement(monitor_value_div, 'div', null, 'monitor_desc_div');
                monitor_desc_div.innerHTML = texts[id].condition_name + ' (0/' + this.monitor_target[id] + ')';
            }
        }
    }
    //更新脑海-重要事件界面的信息
    updata_IE_div() {
        let IE_value_div = document.getElementById('IE_value_div');
        let IE_monitor_data_div = IE_value_div.children[1];
        for (let i = 0; i < IE_monitor_data_div.children.length; i++) {
            let monitor_value_div = IE_monitor_data_div.children[i];
            let id = monitor_value_div.id;
            let monitor_flag_div = monitor_value_div.children[0];
            if (this.monitor_data[id] < this.monitor_target[id]) {
                monitor_flag_div.innerHTML = '☐';
            } else {
                monitor_flag_div.innerHTML = '☑';
            }
            let monitor_desc_div = monitor_value_div.children[1];
            let ch = texts[id].condition_name + ' (' + this.monitor_data[id] + '/' + this.monitor_target[id] + ')';
            monitor_desc_div.innerHTML = ch;
        }
    }
    //清除脑海-重要事件界面中的信息
    reset_IE_div() {
        //清空原本内容
        let IE_value_div = document.getElementById('IE_value_div');
        IE_value_div.replaceChildren();

        let IE_name_div = addElement(IE_value_div, 'div', null, 'IE_name_div');
        IE_name_div.innerHTML = '当前没有重要事件';
    }
    //测试功能，一键完成当前事件
    test_finish_now_event() {
        if (this.now_event_id == null) {
            console.log('当前没有重要事件');
            return;
        }
        this.end_game_event('finish');
        // this.monitor_data = this.monitor_target;
    }
}
