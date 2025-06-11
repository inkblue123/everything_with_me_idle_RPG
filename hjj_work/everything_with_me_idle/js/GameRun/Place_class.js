import { is_Empty_Object } from '../Function/Function.js';
// import { show_combat_game_div, show_normal_game_div } from '../Function/show_func.js';

import { places } from '../Data/Place/Place.js';
import { global } from './global_class.js';
import { player } from '../Player/Player.js';
// import { updata_to_normal_place, updata_to_combat_place } from '../Function/Updata_func.js';
//记录地点相关内容的对象
export class Place_manage {
    constructor() {
        this.now_place; //当前地点
        this.last_place; //上次地点
        this.last_normal_place; //上一个安全的地点
    }
    init() {}
    //移动到新地点，更新相关参数
    set_now_place(next_place) {
        //新地点就是当前地点，不需要移动
        // if (next_place == this.now_place) {
        //     return;
        // }

        //移动时，如果涉及战斗地点和普通地点之间的切换，则更新游戏界面
        let next_place_type = places[next_place].type;
        if (next_place_type == 'normal' || next_place_type == 'NPC') {
            updata_to_normal_place();
        } else if (next_place_type == 'combat') {
            updata_to_combat_place();
        }

        //更新新旧地点参数
        if (this.now_place && places[this.now_place]) {
            if (places[this.now_place].type == 'normal') {
                this.last_normal_place = this.now_place;
            }
        }
        this.last_place = this.now_place;
        this.now_place = next_place;

        //根据新地点参数，更新相关界面信息
        updata_control_place_name(next_place);
        let control = document.getElementById('control');
        //展示新地点的内容
        control.show_now_place();
    }
    //迷你事件中移动玩家位置，由于控制界面主要用来呈现迷你事件的按钮，所以仅更新参数，不更新控制界面
    goto_mini_event_new_place(next_place) {
        //新地点就是当前地点，不需要移动
        // if (next_place == this.now_place) {
        //     return;
        // }

        //移动时，如果涉及战斗地点和普通地点之间的切换，则更新游戏界面
        let next_place_type = places[next_place].type;
        if (next_place_type == 'normal' || next_place_type == 'NPC') {
            updata_to_normal_place();
        } else if (next_place_type == 'combat') {
            updata_to_combat_place();
        }

        //更新新旧地点参数
        if (this.now_place && places[this.now_place]) {
            if (places[this.now_place].type == 'normal') {
                this.last_normal_place = this.now_place;
            }
        }
        this.last_place = this.now_place;
        this.now_place = next_place;

        //根据新地点参数，更新相关界面信息
        updata_control_place_name(next_place);
        //展示新地点的内容
        // let control = document.getElementById('control');
        // control.show_now_place();
    }
    get_now_place() {
        return this.now_place;
    }
    get_last_place() {
        return this.last_place;
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
        global.set_flag('GS_combat_statu', false);
    }
}

//移动到新的战斗地点，更新相关参数
function updata_to_combat_place() {
    // 前往新的战斗区域，要清除旧的战斗相关的信息
    let enemy_manage = global.get_enemy_manage();
    enemy_manage.delete_all_enemy(); //清除战斗区域的怪物
    //玩家主动技能重置
    let P_Askill = player.get_player_ASkill_Manage();
    P_Askill.reset_round();

    let place_manage = global.get_place_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type != 'combat') {
        // if (now_place_type == 'normal' || now_place_type == 'NPC') {
        //从非战斗地点进入战斗地点，执行转场
        show_combat_game_div();
        //进入战斗状态
        global.set_flag('GS_combat_statu', true);
    }
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
