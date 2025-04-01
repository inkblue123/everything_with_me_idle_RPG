import { isEmptyObject } from '../Function/Function.js';
import { game_events } from '../Data/game_event/Game_Event.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from './global_class.js';

//游戏事件类
export class Game_event_manage {
    constructor() {}
    init() {
        this.now_event_id; //当前进行的事件id
        this.event_start_place; //当前进行的事件的启动地点
        this.monitor_data = new Object(); //需要监控的行为的监控数值
        this.monitor_target = new Object(); //需要监控的行为以及目标数值
    }
    //启动一个游戏事件，激活相关接口
    start_game_event(event_id) {
        //异常处理
        if (isEmptyObject(game_events[event_id])) {
            console.log('未定义事件%s', event_id);
            return;
        }
        //进入事件状态
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_status('GS_game_event', true);
        this.now_event_id = event_id;

        //启动短期游戏参数监测
        this.set_monitor_target(game_events[event_id].finish_condition);

        //如果有事件起始地点，则移动过去
        if (game_events[event_id].place) {
            let place_manage = global.get_place_manage();
            this.event_start_place = place_manage.get_now_place();

            // place_manage.set_event_start_place(now_place);
            place_manage.set_next_place(game_events[event_id].place);
        }
    }
    //更新当前游戏事件
    updata_game_event() {
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
        global_flag_manage.set_short_game_status(this.now_event_id, flag);

        //如果当前事件有专属地点，则退出这个地点，回到进入事件的位置
        if (game_events[this.now_event_id].place) {
            let place_manage = global.get_place_manage();
            place_manage.set_next_place(this.event_start_place);
        }

        //清除数据
        this.reset_monitor_data();
        //关闭事件状态
        // let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_status('GS_game_event', false);
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
    record_attack_num() {}
    //受击次数记录
    record_attacted_num() {}
    //击杀敌人记录
    record_kill_enemy_num(attack_effect) {
        for (let id in this.monitor_data) {
            if (!enums.Player_kill_enemy_status.includes(id)) {
                continue;
            }
            switch (id) {
                case 'melee_kill': //近战击杀
                    this.get_melee_kill_data(attack_effect.damage_type);
                    break;
                default:
                    console.log('错误的需要监控的击杀敌人行为，未定义相应的监控函数，%s', id);
                    break;
            }
        }
    }
    //设置需要监控的行为以及他们的目标数值
    set_monitor_target(monitor_target) {
        this.monitor_target = monitor_target;
        for (let id in monitor_target) {
            this.monitor_data[id] = 0;
        }
    }
    //判断击杀是否属于近战伤害击杀
    get_melee_kill_data(damage_type) {
        if (damage_type == 'melee') {
            this.monitor_data.melee_kill++;
        }
    }
}
