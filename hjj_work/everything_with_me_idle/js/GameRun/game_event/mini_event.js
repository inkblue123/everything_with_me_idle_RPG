import { is_Empty_Object } from '../../Function/Function.js';
import { Gradient_div } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js'; //启动迷你事件
//迷你事件对象
export class Mini_event {
    constructor() {
        // this.now_event_id = null; //当前进行的事件id
        this.mini_event_button_flag = new Object(); //迷你事件的按键情况记录
    }
    init() {}

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
    //迷你事件结束
    end_mini_event(event_id, flag) {
        //设置事件完成标记
        let global_flag_manage = global.get_global_flag_manage();
        if (flag == 'finish') {
            //设置事件本身完成
            global_flag_manage.set_flag(event_id, true);
            //触发“完成事件”行为
            global_flag_manage.record_event_finish_end(event_id);
            //在脑海-流水账里生成一条日志
            if (game_events[event_id].game_log_flag == true || game_events[event_id].game_log_flag == undefined) {
                global_flag_manage.set_game_log('finish_event', event_id);
            }
        }
        //迷你事件退出原因设置短期游戏参数
        let SGS_flag_name = 'SGS_' + event_id;
        global_flag_manage.set_flag(SGS_flag_name, flag);

        this.mini_event_button_flag = new Object(); //清空按钮记录情况
        //迷你事件结束，回到当前地点
        let place_manage = global.get_place_manage();
        let now_place_id = place_manage.get_now_place();
        place_manage.set_now_place(now_place_id);
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
                let P_All_Skills = player.get_player_All_Skills();
                for (let skill_id of thing_obj[thing_type]) {
                    P_All_Skills.player_unlock_skill(skill_id);
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
                //在迷你时间中移动到新地点时设置额外参数，防止新地点的按钮覆盖迷你事件的流程按钮
                place_manage.set_now_place(place_id, 'mini_event');
            } else if (thing_type == 'reset_time') {
                //刷新游戏日期
                let time_manage = global.get_time_manage();
                time_manage.reset_game_date();
            } else if (thing_type == 'set_player_attr') {
                //设置玩家属性
                let P_attr = player.get_player_attributes();
                for (let attr_obj of thing_obj[thing_type]) {
                    let id = attr_obj.id; //玩家属性id
                    let value = attr_obj.value; //属性要被修改到的值
                    P_attr.set_data_attr(id, value);
                }
            } else if (thing_type == 'set_global_flag') {
                //设置全局游戏状态
                let global_flag_manage = global.get_global_flag_manage();
                for (let attr_obj of thing_obj[thing_type]) {
                    let id = attr_obj.id; //要设置的游戏状态的key
                    let value = attr_obj.value; //要设置成的游戏状态值
                    global_flag_manage.set_flag(id, value);
                }
            } else if (thing_type == 'get_side_quest') {
                //获得支线任务
                let game_event_manage = global.get_game_event_manage();
                for (let event_id of thing_obj[thing_type]) {
                    game_event_manage.start_game_event(event_id);
                }
            } else {
                console.log('未知的迷你事件中要做的事：%s，没有开发对应的处理逻辑', thing_type);
            }
        }
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
    //处理按下按钮之后触发的对话
    handle_button_chat(event_id, now_process_id, button_id) {
        // let now_process = game_events[event_id].process[now_process_id];
        //记录这个按钮按过了
        this.mini_event_button_flag[button_id] = true;
        //重新展示当前流程，完成对话
        let control = document.getElementById('control');
        control.show_mini_event_process(event_id, now_process_id, button_id);
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
}
