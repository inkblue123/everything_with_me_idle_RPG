import { isEmptyObject } from '../Function/Function.js';
import { updata_BP_value } from '../Function/Updata_func.js';
import { game_events } from '../Data/Game_event/Game_Event.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from './global_class.js';
import { player } from '../Player/Player.js';

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
        if (game_events[event_id].type == 'challenge') {
            this.start_challenge(event_id);
        } else if (game_events[event_id].type == 'mini_event') {
            this.start_mini_event(event_id);
        }
    }
    //启动挑战事件
    start_challenge(event_id) {
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
    updata_mini_event(event_id, now_process_id, i) {
        //获取当前迷你事件的所处流程
        let now_process = game_events[event_id].process[now_process_id];
        //判断玩家触发的下一流程要做什么
        // let button_data = now_process.button[i];
        for (let thing of now_process.button[i].thing) {
            if (thing.type == 'get_skill') {
                //给予技能
                let All_Skills = player.get_player_All_Skills();
                for (let skill_id of thing.skill_id) {
                    All_Skills.player_unlock_skill(skill_id);
                }
            } else if (thing.type == 'get_item') {
                //给予物品
                for (let item of thing.item) {
                    player.Player_get_item(item.id, item.num, item.equip_rarity);
                }
                updata_BP_value();
            }
            //属性判定
            //技能判定
            //物品判定
        }
        //
        //处理完毕，进入下一流程
        // 获取玩家控制界面
        let next_process_id = now_process.button[i].next;
        if (next_process_id == 'end') {
            this.end_mini_event(event_id, 'finish');
        } else {
            let control = document.getElementById('control');
            control.show_mini_event_process(event_id, next_process_id);
        }
    }
    //迷你事件结束
    end_mini_event(event_id, flag) {
        let global_flag_manage = global.get_global_flag_manage();
        if (flag == 'finish') {
            //事件完成
            global_flag_manage.set_flag(event_id, flag);
        }
        //迷你事件退出原因设置
        let SGS_flag_name = 'SGS_' + event_id;
        global_flag_manage.set_flag(SGS_flag_name, flag);
        //迷你事件结束，回到当前地点
        let place_manage = global.get_place_manage();
        let now_place_id = place_manage.get_now_place();
        place_manage.set_next_place(now_place_id);
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
        let SGS_flag_name = 'SGS_' + this.now_event_id;
        global_flag_manage.set_short_game_status(SGS_flag_name, flag);

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
