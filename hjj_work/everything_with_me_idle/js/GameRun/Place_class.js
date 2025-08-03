import { is_Empty_Object } from '../Function/Function.js';
import { addElement } from '../Function/Dom_function.js';
import { buffs } from '../Data/Buff/Buff.js';

import { places } from '../Data/Place/Place.js';
import { global } from './global_manage.js';
import { player } from '../Player/Player.js';
//记录地点相关内容的对象
export class Place_manage {
    constructor() {
        this.now_place; //当前地点
        this.last_place; //上次地点
        this.next_place; //接下来要移动到的地点
        this.last_normal_place; //上一个安全的地点
        this.limited_combat_data = new Object(); //有限刷怪区域的数据缓存
    }
    init() {}
    //移动到新地点，更新相关参数
    set_now_place(next_place, goto_flag) {
        this.next_place = next_place;
        //检查这次移动应该到达的真正新地点
        let true_next_place = check_next_place(next_place);
        if (true_next_place != next_place) {
            this.set_now_place(true_next_place, goto_flag);
            return;
        }
        //移动时，如果涉及战斗地点和普通地点之间的切换，则更新游戏界面
        change_Combat_Normal_game_div(next_place);

        if (this.now_place != next_place) {
            //进入新地点会获得一些效果，在进入时获得
            goto_new_place_get(next_place);
            //如果旧地点有效果，离开时应该失去
            leave_old_place_delete(this.now_place);
        }

        //更新新旧地点参数
        this.updata_new_place_data();
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
    get_limited_combat_data() {
        return this.limited_combat_data;
    }
    //获取上一个普通地点
    get_last_normal_place() {
        return this.last_normal_place;
    }
    //获取地点类部分的游戏存档
    save_place_class() {
        let place_save = new Object();
        place_save.now_place = this.now_place; //当前地点
        place_save.last_normal_place = this.last_normal_place; //上次安全地点

        return place_save;
    }
    //加载地点类的游戏存档
    load_place_class(place_save) {
        if (is_Empty_Object(place_save)) {
            return;
        }
        //上次安全地点，放在上面替换掉当前地点，在之后进入存档的地点时就会正常填入上次安全地点
        this.now_place = place_save.last_normal_place;
        //如果地点有进入门槛，读档的时候就不能再收门槛了，可能这个接口要换成无条件进入
        this.set_now_place(place_save.now_place);
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
//移动时，如果涉及战斗地点和普通地点之间的切换，则更新游戏界面和参数
function change_Combat_Normal_game_div(next_place) {
    let next_place_type = places[next_place].type;
    if (next_place_type == 'normal' || next_place_type == 'NPC') {
        updata_to_normal_place();
    } else if (next_place_type == 'combat') {
        updata_to_combat_place();
    }
}
//移动到新的普通地点，更新相关参数
function updata_to_normal_place() {
    let place_manage = global.get_place_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type == 'combat') {
        //从战斗地点进入普通地点，执行转场
        show_normal_game_div();

        // 清除旧的战斗相关的信息
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.delete_all_enemy(); //清除战斗区域的怪物
        //退出战斗状态
        global.set_flag('GS_game_statu', 'NULL');
    }
    //根据普通地点的生活技能可用情况，显示或遮罩生活技能规划界面
    let next_place = place_manage.get_next_place();
    show_live_plan_div(next_place);
    //将新地点的信息更新到生活技能对象中
    let live_plan_manage = global.get_live_plan_manage();
    live_plan_manage.set_new_place(next_place);
}
//移动到新的战斗地点，更新相关参数
function updata_to_combat_place() {
    let place_manage = global.get_place_manage();
    let enemy_manage = global.get_enemy_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type != 'combat') {
        // if (now_place_type == 'normal' || now_place_type == 'NPC') {
        //从非战斗地点进入战斗地点，执行转场
        show_combat_game_div();
        //进入战斗状态
        global.set_flag('GS_game_statu', 'combat');
    } else {
        // 从一个战斗区域前往另一个战斗区域，要清除旧的战斗相关的信息
        enemy_manage.delete_all_enemy(); //清除当前战斗区域的怪物
    }

    let next_place = place_manage.get_next_place();
    enemy_manage.set_new_place(next_place); //设置新的战斗区域的敌人情况
    //玩家主动技能重置
    let P_Askill = player.get_player_ASkill_Manage();
    P_Askill.reset_round();
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
//进入新地点会获得一些效果，在进入时获得
function goto_new_place_get(next_place) {
    //新地点有buff
    if (!is_Empty_Object(places[next_place].buff)) {
        let P_attr = player.get_player_attributes();
        for (let id of places[next_place].buff) {
            if (is_Empty_Object(buffs[id])) {
                console.log('%s地点有未知buff：%s', next_place, id);
            } else {
                P_attr.set_buff_attr(id);
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
        let P_attr = player.get_player_attributes();
        for (let id of places[old_place].buff) {
            if (is_Empty_Object(buffs[id])) {
                console.log('%s地点有未知buff：%s', old_place, id);
            } else {
                P_attr.delete_buff_attr(id);
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
//根据普通地点的生活技能可用情况，调整生活技能规划界面
function show_live_plan_div(next_place) {
    //探索采集类生活技能
    let live_plan_id = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];
    let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
    for (let i = 0; i < 7; i++) {
        if (places[next_place].live_plan_flag[i]) {
            //如果地点可以进行对应技能，去掉遮罩
            //单选按钮
            let radio_id = live_plan_id[i] + '_radio_div';
            let radio_div = document.getElementById(radio_id);
            let overlay = radio_div.querySelector('.overlay');
            if (overlay) {
                overlay.remove();
            }
            //内容界面
            let value_div_id = live_plan_id[i] + '_value_div';
            let value_div = document.getElementById(value_div_id);
            overlay = value_div.querySelector('.overlay');
            if (overlay) {
                overlay.remove();
            }
        } else {
            // 不可进行对应技能，去掉遮罩
            //单选按钮
            let radio_id = live_plan_id[i] + '_radio_div';
            let radio_div = document.getElementById(radio_id);
            let overlay = radio_div.querySelector('.overlay');
            if (!overlay) {
                addElement(radio_div, 'div', null, 'overlay');
            }
            //内容界面
            let value_div_id = live_plan_id[i] + '_value_div';
            let value_div = document.getElementById(value_div_id);
            overlay = value_div.querySelector('.overlay');
            if (!overlay) {
                let value_overlay = addElement(value_div, 'div', null, 'overlay');
                value_overlay.innerHTML = '这个地点没有' + live_plan_ch[i] + '的条件';
            }
        }
    }
}
