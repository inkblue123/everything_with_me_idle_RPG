import { is_Empty_Object } from '../Function/Function.js';
import { addElement } from '../Function/Dom_function.js';
import { buffs } from '../Data/Buff/Buff.js';

import { places } from '../Data/Place/Place.js';
import { global } from './global_manage.js';
import { player } from '../Player/Player.js';
//记录地点相关内容的对象
export class Place_manage {
    constructor() {
        this.now_place = 'game_statr'; //当前地点
        this.last_place; //上次地点
        this.next_place; //接下来要移动到的地点
        this.last_normal_place; //上一个安全的地点
    }
    init() {
        this.now_place = 'game_statr';
        this.set_now_place('village_home');
    }
    //移动到新地点，更新相关参数
    set_now_place(next_place, goto_flag) {
        this.next_place = next_place;
        //检查这次移动应该到达的真正新地点
        let true_next_place = check_next_place(next_place);
        if (true_next_place != next_place) {
            this.set_now_place(true_next_place, goto_flag);
            return;
        }
        if (this.now_place != next_place) {
            //如果旧地点有效果，离开时应该失去
            leave_old_place_delete(this.now_place);
            //进入新地点会获得一些效果，在进入时获得
            goto_new_place_get(next_place);
        }

        //移动时，如果涉及整体游戏界面布局的变化，则更新游戏界面
        change_game_div(next_place);

        //更新新旧地点参数
        this.updata_new_place_data();
        //更新背包界面物品的点击效果
        updata_backpack_value(this.last_place, this.now_place);
        //根据新地点参数，更新相关界面信息
        updata_control_place_name(next_place);

        if (goto_flag == 'mini_event') {
            //迷你事件中移动玩家位置，由于控制界面主要用来呈现迷你事件的按钮，所以仅更新参数，不更新控制界面
            return;
        }
        //展示新地点的内容
        let control = document.getElementById('control');
        control.show_now_place();
    }
    //更新新旧地点参数
    updata_new_place_data() {
        if (this.now_place && places[this.now_place]) {
            if (places[this.now_place].type == 'normal') {
                this.last_normal_place = this.now_place;
            }
        }
        this.last_place = this.now_place;
        this.now_place = this.next_place;
        this.next_place = undefined;
    }
    //更新当前地点的条件事件，满足条件时触发
    updata_now_place_condition_event() {
        if (is_Empty_Object(places[this.now_place].condition_event)) {
            //当前地点没有条件事件，不用更新
            return;
        }
        let global_flag_manage = global.get_global_flag_manage();
        for (let obj of places[this.now_place].condition_event) {
            let flag = true;
            for (let status_obj of obj.status) {
                let status = global_flag_manage.get_flag(status_obj.status_id); //当前需要判断的游戏状态的内容
                if (status != status_obj.value) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                let game_event_manage = global.get_game_event_manage();
                game_event_manage.start_game_event(obj.event_id);
            }
        }
    }
    get_now_place() {
        return this.now_place;
    }
    get_last_place() {
        return this.last_place;
    }
    get_next_place() {
        return this.next_place;
    }
    get_now_place_type() {
        if (this.now_place == undefined) {
            return undefined;
        }
        return places[this.now_place].type;
    }
    //获取上一个普通地点
    get_last_normal_place() {
        return this.last_normal_place;
    }
    //获取地点类部分的游戏存档
    save_place_manage() {
        let place_save = new Object();
        place_save.now_place = this.now_place; //当前地点
        place_save.last_place = this.last_place; //当前地点
        place_save.last_normal_place = this.last_normal_place; //上次安全地点

        return place_save;
    }
    //加载地点类的游戏存档
    load_place_manage(place_save) {
        if (is_Empty_Object(place_save)) {
            return;
        }

        let next_place = place_save.now_place;
        this.next_place = place_save.now_place;
        //移动时，如果涉及战斗地点和普通地点之间的切换，则更新游戏界面，更新其他模块
        let next_place_type = places[next_place].type;
        if (next_place_type == 'normal' || next_place_type == 'NPC') {
            //根据玩家生活技能解锁情况，展示或隐藏生活技能界面与按钮
            show_unlock_live_plan_div();
            //根据普通地点的生活技能可用情况，显示或遮罩生活技能规划界面
            show_place_can_live_plan_div(next_place);
            //将新地点的信息更新到生活技能对象中
            let live_plan_manage = global.get_live_plan_manage();
            live_plan_manage.load_set_new_place(next_place);
        } else if (next_place_type == 'combat') {
            updata_to_combat_place(next_place);
        } else if (next_place_type == 'store') {
            updata_to_store_place(next_place);
        }

        //进入新地点会获得一些效果，在进入时获得
        // goto_new_place_get(next_place);

        //更新存档地点参数
        this.now_place = place_save.now_place;
        this.last_normal_place = place_save.last_normal_place;
        this.last_place = place_save.last_place;
        this.next_place = undefined;

        //根据新地点参数，更新相关界面信息
        updata_control_place_name(next_place);
        //更新背包界面物品的点击效果
        updata_backpack_value(this.last_place, this.now_place);
        //展示新地点的内容
        let control = document.getElementById('control');
        control.show_now_place();
    }
}

//更新中下的玩家控制界面的当前所在区域和当前地点名称
function updata_control_place_name(now_place_id) {
    let area_name_div = document.getElementById('area_name_div');
    let place_name_div = document.getElementById('place_name_div');
    let place_ch = '当前地点：' + places[now_place_id].name;
    let area_name = '当前区域：' + places[now_place_id].area_name;
    area_name_div.innerHTML = area_name;
    place_name_div.innerHTML = place_ch;
}
//移动时，如果涉及整体游戏界面布局的变化，则更新游戏界面
function change_game_div(next_place) {
    let next_place_type = places[next_place].type;
    if (next_place_type == 'normal' || next_place_type == 'NPC') {
        updata_to_normal_place(next_place);
    } else if (next_place_type == 'combat') {
        updata_to_combat_place(next_place);
    } else if (next_place_type == 'store') {
        updata_to_store_place(next_place);
    }
}
//移动到新的普通地点，更新相关参数
function updata_to_normal_place(next_place) {
    let place_manage = global.get_place_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type == 'normal' || now_place_type == 'NPC') {
        //从普通地点到另一个普通地点，不需要执行额外操作
    } else if (now_place_type == 'combat') {
        //从战斗地点进入普通地点，执行转场
        show_normal_game_div();
        // 清除旧的战斗相关的信息
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.delete_all_enemy(); //清除战斗区域的怪物
        //退出战斗状态
        global.set_flag('GS_game_statu', 'NULL');
    } else if (now_place_type == 'store') {
        //从商店移动到普通地点，执行转场
        show_live_plan_div();
    }
    //根据玩家生活技能解锁情况，展示或隐藏生活技能界面与按钮
    show_unlock_live_plan_div();
    //根据普通地点的生活技能可用情况，显示或遮罩生活技能规划界面
    show_place_can_live_plan_div(next_place);
    //将新地点的信息更新到生活技能对象中
    let live_plan_manage = global.get_live_plan_manage();
    live_plan_manage.set_new_place(next_place);
}
//移动到新的战斗地点，更新相关参数
function updata_to_combat_place(next_place) {
    let place_manage = global.get_place_manage();
    let enemy_manage = global.get_enemy_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type == 'normal' || now_place_type == 'NPC') {
        //从非战斗地点进入战斗地点，执行转场
        show_combat_game_div();
        //进入战斗状态
        global.set_flag('GS_game_statu', 'combat');
    } else if (now_place_type == 'combat') {
        // 从一个战斗区域前往另一个战斗区域，
        //理论上不应该出现这样的地图联通情况
        console.log('理论上不应出现战斗地点连战斗地点的地图设计');
        return;
        //如果确实要做
        //要清除旧的战斗相关的信息
        // enemy_manage.delete_all_enemy(); //清除当前战斗区域的怪物
    } else if (now_place_type == 'store') {
        // 从商店前往战斗区域，理论上不应该出现这样的地图联通情况
        console.log('理论上不应出现商店地点战连斗地点的地图设计');
        return;
    }

    //设置新的战斗区域的敌人情况
    enemy_manage.set_new_place(next_place);
    //玩家主动技能重置
    let P_Askill = player.get_player_ASkill_Manage();
    P_Askill.reset_round();
}
//移动到商店地点，更新相关参数
function updata_to_store_place(next_place) {
    let place_manage = global.get_place_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type == 'normal' || now_place_type == 'NPC') {
        //从普通地点到商店，执行转场
        show_store_div();
    } else if (now_place_type == 'combat') {
        //从战斗地点到商店，理论上不应该出现这样的地图联通情况
        console.log('理论上不应出现战斗地点连商店地点的地图设计');
        return;
    } else if (now_place_type == 'store') {
        // 从一个商店前往另一个商店，不需要额外操作
        console.log('理论上不应出现商店地点连商店地点的地图设计');
    }
    //将新地点的信息更新到商店管理对象中
    let store_manage = global.get_store_manage();
    store_manage.set_new_place(next_place);
}
//展示战斗时的游戏界面
function show_combat_game_div() {
    const game_up_combat = document.getElementById('game_up_combat');
    const game_up_nomal = document.getElementById('game_up_nomal');

    game_up_combat.style.display = '';
    game_up_nomal.style.display = 'none';
}
//展示非战斗时的游戏界面
function show_normal_game_div() {
    const game_up_combat = document.getElementById('game_up_combat');
    const game_up_nomal = document.getElementById('game_up_nomal');

    game_up_combat.style.display = 'none';
    game_up_nomal.style.display = '';
}
//针对非战斗时的游戏界面，展示生活技能规划的窗口
function show_live_plan_div() {
    const Live_plan_div = document.getElementById('Live_plan');
    const Store_div = document.getElementById('Store');
    const goods_trade_div = document.getElementById('goods_trade_div');

    Live_plan_div.style.display = '';
    Store_div.style.display = 'none';
    goods_trade_div.style.display = 'none';
}
//针对非战斗时的游戏界面，展示商店的窗口
function show_store_div() {
    const Live_plan_div = document.getElementById('Live_plan');
    const Store_div = document.getElementById('Store');
    const goods_trade_div = document.getElementById('goods_trade_div');
    const PL_div = document.getElementById('PL_div');
    const IBB_div = document.getElementById('IBB_div');

    Live_plan_div.style.display = 'none';
    Store_div.style.display = '';
    goods_trade_div.style.display = '';
    //商店界面内部切换到商品列表界面
    PL_switch_radio_div.children[0].checked = true;
    PL_div.style.display = '';
    IBB_div.style.display = 'none';
}
//进入新地点会获得一些效果，在进入时获得
function goto_new_place_get(next_place) {
    //新地点有buff
    if (!is_Empty_Object(places[next_place].buff)) {
        let P_buff = player.get_player_buff();
        for (let id of places[next_place].buff) {
            if (is_Empty_Object(buffs[id])) {
                console.log('%s地点有未知buff：%s', next_place, id);
            } else {
                P_buff.set_buff_attr(id);
            }
        }
    }
}
//如果旧地点有效果，离开时应该失去
function leave_old_place_delete(old_place) {
    if (old_place == undefined) {
        return;
    }
    if (!is_Empty_Object(places[old_place].buff)) {
        //旧地点有buff
        let P_buff = player.get_player_buff();
        for (let id of places[old_place].buff) {
            if (is_Empty_Object(buffs[id])) {
                console.log('%s地点有未知buff：%s', old_place, id);
            } else {
                P_buff.delete_buff_attr(id);
            }
        }
    }
}
//检查当前想前往的新地点实际通往哪里
function check_next_place(next_place) {
    //a->b移动，b是通道类型的战斗区域，b通往c
    //如果b不满足刷怪战斗的条件，则从a->b的操作实际上应该是a->c
    if (places[next_place].type == 'combat' && places[next_place].combat_type == 'limited_enemy_road') {
        let enemy_manage = global.get_enemy_manage();
        if (enemy_manage.judge_infinite_enemy_place_goto(next_place)) {
            //通道内会发生战斗，正常进入
            return next_place;
        } else {
            //通道内不会发生战斗，直接进入通道对面
            return places[next_place].next_accessible_area;
        }
    }
    return next_place;
}
//根据普通地点的生活技能可用情况，给不可用的生活技能规划界面和按钮添加遮罩
function show_place_can_live_plan_div(next_place) {
    //探索采集类生活技能
    let live_plan_id = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];
    let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
    for (let i = 0; i < 7; i++) {
        //单选按钮
        let radio_id = live_plan_id[i] + '_radio_div';
        let radio_div = document.getElementById(radio_id);
        let radio_overlay = radio_div.querySelector('.overlay'); //按钮上的遮罩
        //内容界面
        let value_div_id = live_plan_id[i] + '_value_div';
        let value_div = document.getElementById(value_div_id);
        let value_overlay = value_div.querySelector('.overlay'); //内容界面上的遮罩

        if (places[next_place].live_plan_flag[i]) {
            //如果地点可以进行对应技能，隐藏遮罩
            radio_overlay.style.display = 'none';
            value_overlay.style.display = 'none';
        } else {
            // 不可进行对应技能，显示遮罩
            radio_overlay.style.display = '';
            value_overlay.style.display = '';
        }
    }
}
//根据生活技能的解锁情况，隐藏不可见的生活技能界面和按钮
function show_unlock_live_plan_div() {
    //探索采集类生活技能
    let live_plan_name = ['logging', 'fishing', 'mining', 'foraging', 'diving', 'archaeology', 'exploration'];
    let live_plan_div_id = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];
    let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
    let global_flag_manage = global.get_global_flag_manage();
    let unlock_skill_num = 0; //解锁技能数
    let only_unlock_skill_order = -1; //唯一解锁的技能

    for (let i = 0; i < 7; i++) {
        //单选按钮
        let radio_id = live_plan_div_id[i] + '_radio_div';
        let radio_div = document.getElementById(radio_id);
        //内容界面
        // let value_div_id = live_plan_div_id[i] + '_value_div';
        // let value_div = document.getElementById(value_div_id);

        let status_id = 'GS_unlock_' + live_plan_name[i];
        let status = global_flag_manage.get_flag(status_id);

        if (status == true) {
            unlock_skill_num++;
            only_unlock_skill_order = i;
            //解锁了的技能，单选按钮可以无条件出现
            radio_div.style.display = '';
            //同时只能展示一个技能的内容界面，所以在后续逻辑中判断应该要展示哪个
            // value_div.style.display = '';
        } else {
            radio_div.style.display = 'none';
            // value_div.style.display = 'none';
        }
    }
    let lock_all_Live_plan_div = document.getElementById('lock_all_Live_plan_div');
    if (unlock_skill_num == 0 && lock_all_Live_plan_div.dataset.flag == 'true') {
        //没有解锁生活技能，生活规划界面也是初始状态，不需要变化
        return;
    }
    if (unlock_skill_num != 0 && lock_all_Live_plan_div.dataset.flag == 'true') {
        //有生活技能解锁，生活规划界面不能再展示填充页了
        let Live_plan_switch_div = document.getElementById('Live_plan_switch_div');
        let Live_plan_value_div = document.getElementById('Live_plan_value_div');
        Live_plan_switch_div.style.display = '';
        Live_plan_value_div.style.display = '';
        lock_all_Live_plan_div.style.display = 'none';
        lock_all_Live_plan_div.dataset.flag = 'false';
    }
    //根据解锁的技能，展示对应的界面
    if (unlock_skill_num != 0 && lock_all_Live_plan_div.dataset.flag == 'false') {
        if (unlock_skill_num == 1) {
            //如果解锁了一个技能，单选按钮和内容界面都应该切换到这个技能上
            for (let i = 0; i < 7; i++) {
                //单选按钮
                let radio_id = live_plan_div_id[i] + '_radio_div';
                let radio_div = document.getElementById(radio_id);
                //内容界面
                let value_div_id = live_plan_div_id[i] + '_value_div';
                let value_div = document.getElementById(value_div_id);

                if (i == only_unlock_skill_order) {
                    // radio_div.style.display = '';
                    radio_div.children[0].checked = true;
                    value_div.style.display = '';
                } else {
                    // radio_div.style.display = 'none';
                    value_div.style.display = 'none';
                }
            }
        } else {
            //如果解锁了多个技能，
            //单选按钮应该全部展示
            //内容界面应该不变
            //所以不需要处理
            return;
        }
    }
    if (unlock_skill_num == 0 && lock_all_Live_plan_div.dataset.flag == 'false') {
        //没有解锁生活技能，但是生活规划界面处于非初始状态，可能是清除存档时需要恢复
        let Live_plan_switch_div = document.getElementById('Live_plan_switch_div');
        let Live_plan_value_div = document.getElementById('Live_plan_value_div');
        Live_plan_switch_div.style.display = 'none';
        Live_plan_value_div.style.display = 'none';
        lock_all_Live_plan_div.style.display = '';
        lock_all_Live_plan_div.dataset.flag = 'true';
        return;
    }
}
//更新背包界面物品的点击效果
function updata_backpack_value(last_place, now_place) {
    let last_place_type = places[last_place].type;
    let now_place_type = places[now_place].type;
    //进入商店和离开商店时，左下背包界面物品的点击效果要发生变化
    //所以满足条件时需要刷新一遍

    //离开商店
    if (last_place_type == 'store' && now_place_type != 'store') {
        //刷新背包界面的按钮
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
    }
    //进入商店
    if (now_place_type == 'store' && last_place_type != 'store') {
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
    }
}
