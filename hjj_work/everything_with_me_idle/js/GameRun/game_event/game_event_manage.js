import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';
import { game_events } from '../../Data/Game_event/Game_Event.js';
import { player } from '../../Player/Player.js';

import { Main_quest_manage } from './main_quest.js';
import { Side_quest_manage } from './side_quest.js';
import { Challenge_manage } from './challenge.js';
import { Mini_event } from './mini_event.js';

//游戏事件类
export class Game_event_manage {
    constructor() {
        this.main_quest_manage = new Main_quest_manage();
        this.side_quest_manage = new Side_quest_manage();
        this.challenge_manage = new Challenge_manage();
        this.mini_event_manage = new Mini_event();
        this.monitor_target_summ = new Object(); //当前所有事件的需要监控行为汇总
    }
    init() {}

    //启动一个游戏事件，激活相关接口
    start_game_event(event_id) {
        //异常处理
        if (is_Empty_Object(game_events[event_id])) {
            console.log('未定义事件%s', event_id);
            return;
        }
        //启动事件管理类
        if (game_events[event_id].type == 'main_quest') {
            this.main_quest_manage.start_main_quest(event_id);
        } else if (game_events[event_id].type == 'side_quest') {
            this.side_quest_manage.start_side_quest(event_id);
        } else if (game_events[event_id].type == 'challenge') {
            this.challenge_manage.start_challenge(event_id);
        } else if (game_events[event_id].type == 'mini_event') {
            this.mini_event_manage.start_mini_event(event_id);
        }
        this.add_monitor_target_summ(event_id);
    }
    //将事件所要监控的行为进行汇总
    add_monitor_target_summ(event_id) {
        let event_type = game_events[event_id].type;
        let monitor_target = game_events[event_id].finish_condition;
        //
        for (let id in monitor_target) {
            const firstIndex = id.indexOf('_');
            let monitor_type = id.substring(0, firstIndex);

            if (is_Empty_Object(this.monitor_target_summ[monitor_type])) {
                this.monitor_target_summ[monitor_type] = new Object();
            }
            if (is_Empty_Object(this.monitor_target_summ[monitor_type][id])) {
                this.monitor_target_summ[monitor_type][id] = new Array();
            }

            if (!this.monitor_target_summ[monitor_type][id].includes(event_type)) {
                this.monitor_target_summ[monitor_type][id].push(event_type);
            }
        }
    }
    get_monitor_target_summ() {
        return this.monitor_target_summ;
    }
    //删除指定事件的需要监控的行为
    delete_monitor_target_summ(event_id) {
        //异常处理
        if (is_Empty_Object(game_events[event_id])) {
            console.log('未定义事件%s', event_id);
            return;
        }
        let event_type = game_events[event_id].type;
        if (event_type == 'main_quest' || event_type == 'challenge') {
            //主线任务和挑战不会同时拥有多个，可以直接从缓存中去除
            let monitor_target = game_events[event_id].finish_condition;
            for (let id in monitor_target) {
                const firstIndex = id.indexOf('_');
                let monitor_type = id.substring(0, firstIndex);

                let old_array = this.monitor_target_summ[monitor_type][id];
                const newArray = old_array.filter((item) => item !== event_type);
                this.monitor_target_summ[monitor_type][id] = newArray;
            }
        } else if (event_type == 'side_quest') {
            //支线任务可能有多个，如果AB任务都涉及到同一个行为，去除A时应该保留这个行为，所以不能去除，应该重新构建
        }
    }
    //结束当前挑战
    end_challenge(flag) {
        // let event_id = this.challenge_manage.get_now_challenge_id();
        // this.delete_monitor_target_summ(event_id);
        this.challenge_manage.end_challenge(flag);
    }
    //获取当前正在执行挑战id
    get_now_challenge_id() {
        return this.challenge_manage.get_now_challenge_id();
    }
    //攻击次数记录
    record_attack_num() {}
    //受击次数记录
    record_attacted_num() {
        //寻找监控行为汇总里的玩家受击类型的行为
        if (is_Empty_Object(this.monitor_target_summ['ATD'])) {
            //没有关于击杀敌人的监控行为
            return;
        }
        let ATD_monitor_summ = this.monitor_target_summ['ATD'];
        let ATD_data = new Object();
        for (let id in ATD_monitor_summ) {
            if (id == 'ATD_all_armor') {
                let P_worn = player.get_player_worn();
                if (P_worn.if_all_armor_attacted()) {
                    ATD_data[id] = 1;
                }
            }
        }
        //将行为的结果数据更新到对应的事件中
        this.updata_monitor_data(ATD_monitor_summ, ATD_data);
    }
    //防御技能生效记录
    record_defense_skill_effect(skill_id) {
        //寻找监控行为汇总里的玩家防御技能生效类型的行为
        if (is_Empty_Object(this.monitor_target_summ['DSE'])) {
            //没有关于击杀敌人的监控行为
            return;
        }
        let DSE_monitor_summ = this.monitor_target_summ['DSE'];
        let DSE_data = new Object();
        for (let id in DSE_monitor_summ) {
            let monitor_skill = id.substring(4);
            if (monitor_skill == skill_id) {
                DSE_data[id] = 1;
            }
        }
        //将行为的结果数据更新到对应的事件中
        this.updata_monitor_data(DSE_monitor_summ, DSE_data);
    }
    //击杀敌人记录
    record_kill_enemy_num(attack_effect, enemy) {
        //寻找监控行为汇总里的玩家击杀敌人类型的行为
        if (is_Empty_Object(this.monitor_target_summ['PKL'])) {
            //没有关于击杀敌人的监控行为
            return;
        }
        let PKL_monitor_summ = this.monitor_target_summ['PKL'];
        let PKL_data = new Object();
        let flag;
        for (let id in PKL_monitor_summ) {
            //获取这条监控需要的细节
            let PKL_type = get_PKL_type(id);
            if (PKL_type == 'DamageType') {
                //这条监控关注伤害类型
                flag = check_PKL_DamageType(id, attack_effect);
            } else if (PKL_type == 'EnemyId') {
                //这条监控关注击杀的敌人id
                flag = check_PKL_EnemyId(id, enemy);
            }
            //玩家行为和监控行为符合，击杀敌人的记录数+1
            if (flag) {
                PKL_data[id] = 1;
            }
        }
        //将行为的结果数据更新到对应的事件中
        this.updata_monitor_data(PKL_monitor_summ, PKL_data);
    }

    //有事件正常完成结束
    record_event_finish_end(event_id) {
        //寻找监控行为汇总里关于事件完成的行为
        if (is_Empty_Object(this.monitor_target_summ['EE'])) {
            //没有关于事件完成的监控行为
            return;
        }
        let EE_monitor_summ = this.monitor_target_summ['EE'];
        let EE_data = new Object();
        for (let id in EE_monitor_summ) {
            let monitor_name = 'EE_' + event_id;
            if (id == monitor_name) {
                EE_data[id] = true;
            }
        }
        //将行为的结果数据更新到对应的事件中
        this.updata_monitor_data(EE_monitor_summ, EE_data);
    }
    //将行为的结果数据更新到对应的事件中
    updata_monitor_data(monitor_summ, monitor_data) {
        for (let id in monitor_summ) {
            //只有当这个行为有数据的时候才更新
            if (monitor_data[id] == undefined) {
                continue;
            }
            for (let event_type of monitor_summ[id]) {
                if (event_type == 'main_quest') {
                    this.main_quest_manage.updata_monitor_data(id, monitor_data[id]);
                } else if (event_type == 'side_quest') {
                    this.side_quest_manage.updata_monitor_data(id, monitor_data[id]);
                } else if (event_type == 'challenge') {
                    this.challenge_manage.updata_monitor_data(id, monitor_data[id]);
                }
            }
        }
    }

    //玩家在迷你事件的一个流程中点击了一个按钮，更新迷你事件
    updata_mini_event(event_id, now_process_id, button_id) {
        this.mini_event_manage.updata_mini_event(event_id, now_process_id, button_id);
    }
    //判断当前是否满足迷你事件中的一个按钮的出现条件
    check_mini_event_button_condition(event_id, process_id, button_id) {
        return this.mini_event_manage.check_mini_event_button_condition(event_id, process_id, button_id);
    }
    //完成指定迷你事件
    end_mini_event(event_id, flag) {
        this.mini_event_manage.end_mini_event(event_id, flag);
    }

    //初始化脑海-重要事件界面的信息
    init_IE_div() {
        let flag = true;
        //如果有主线任务，则初始化主线任务的界面
        let main_quest_id = this.main_quest_manage.get_main_quest_id();
        if (main_quest_id != null) {
            this.main_quest_manage.init_main_quest_IE_div();
            flag = false;
        }
        //如果有支线任务，则初始化支线任务的界面
        let side_quest_num = this.side_quest_manage.get_side_quest_num();
        if (side_quest_num != 0) {
            this.side_quest_manage.init_side_quest_IE_div();
            flag = false;
        }
        //如果有挑战，则初始化挑战的界面
        let challenge_id = this.challenge_manage.get_now_challenge_id();
        if (challenge_id != null) {
            this.challenge_manage.init_challenge_IE_div();
            flag = false;
        }
        //特殊情况，没有任何重要事件的界面
        if (flag) {
            //借用主线任务的界面
            let main_quest_div = document.getElementById('main_quest_div');
            main_quest_div.replaceChildren();
            let IE_name_div = addElement(main_quest_div, 'div', null, 'IE_name_div');
            IE_name_div.innerHTML = '当前没有重要事件';
        }
    }
    //测试功能，一键完成当前挑战
    test_finish_now_challenge() {
        this.end_challenge('finish');
    }
    //获取游戏事件类部分的游戏存档
    save_Game_event_manage() {
        let game_event_save = new Object();
        game_event_save.main_quest_save = this.main_quest_manage.save_main_quest_manage();
        game_event_save.side_quest_save = this.side_quest_manage.save_side_quest_manage();
        game_event_save.challenge_save = this.challenge_manage.save_challenge_manage();

        return game_event_save;
    }
    //加载游戏事件类的游戏存档
    load_Game_event_manage(game_event_save) {
        if (is_Empty_Object(game_event_save)) {
            return;
        }
        this.main_quest_manage.load_main_quest_manage(game_event_save.main_quest_save);
        this.side_quest_manage.load_side_quest_manage(game_event_save.side_quest_save);
        this.challenge_manage.load_challenge_manage(game_event_save.challenge_save);
        //重新构建事件的行为监控
        let event_id = this.main_quest_manage.get_main_quest_id();
        if (!is_Empty_Object(game_events[event_id])) {
            this.add_monitor_target_summ(event_id);
        }

        event_id = this.challenge_manage.get_now_challenge_id();
        if (!is_Empty_Object(game_events[event_id])) {
            this.add_monitor_target_summ(event_id);
        }
        // let event_id_arr = this.side_quest_manage.get_side_quest_id();
        // for (let id of event_id_arr) {
        //     if (!is_Empty_Object(game_events[id])) {
        //         this.add_monitor_target_summ(id);
        //     }
        // }

        //加载右下角的重要事件界面
        this.init_IE_div();
    }
}
//获取击杀敌人的监控行为更细的类型
function get_PKL_type(monitor_id) {
    let parts = monitor_id.split('_');

    if (parts[0] != 'PKL') {
        console.log('%s不是击杀敌人的监控行为', monitor_id);
        return;
    }
    if (parts.length < 2) {
        console.log('%s监控行为名不符合要求', monitor_id);
        return;
    }
    let PKL_type = parts[1];
    return PKL_type;
}
//监控行为monitor_id是指定伤害类型击杀敌人，判断这次击杀是否符合
function check_PKL_DamageType(monitor_id, attack_effect) {
    if (monitor_id == 'PKL_DamageType_melee') {
        if (attack_effect.damage_type == 'melee') {
            return true;
        }
    } else if (id == 'PKL_DamageType_ranged') {
        if (attack_effect.damage_type == 'ranged') {
            return true;
        }
    } else if (id == 'PKL_DamageType_magic') {
        if (attack_effect.damage_type == 'magic') {
            return true;
        }
    }
    return false;
}
//监控行为monitor_id要求击杀特定id的敌人，判断这次击杀是否符合
function check_PKL_EnemyId(monitor_id, enemy) {
    //获取监控要求的敌人id
    let firstIndex = monitor_id.indexOf('_');
    let secondIndex = monitor_id.indexOf('_', firstIndex + 1);
    let monitor_enemy_id = monitor_id.slice(secondIndex + 1);
    //判断是否符合
    if (enemy.id == monitor_enemy_id) {
        return true;
    }
    return false;
}
