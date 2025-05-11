import { player } from '../Player/Player.js';
import {
    updata_equipment_show,
    updata_BP_value,
    // updata_player_active_slots_num,
    // updata_player_active_show,
    updata_player_active,
} from '../Function/Updata_func.js';
import { show_normal_game_div } from '../Function/show_func.js';

import { global } from '../GameRun/global_class.js';

//游戏存档加载
function LoadSaveFile(save_file) {
    if (save_file) {
        //读取存档文件
    } else {
        //没有存档文件，进行新游戏初始化
        new_game_init();
    }
}

function new_game_init() {
    //全局配置初始化
    global.init();
    //玩家参数初始化
    player_init();
    //游戏界面初始化
    dom_init();
}
//玩家参数初始化
function player_init() {
    //初始化玩家类
    player.init();
    // let All_Skills = player.get_player_All_Skills();
    // All_Skills.player_unlock_skill('shield_defense'); //主动技能测试
    // All_Skills.player_unlock_skill('normal_attack_Melee');
    // All_Skills.player_unlock_skill('energy_storage_attack');
    // All_Skills.player_unlock_skill('test_3_slot_skill');
    // All_Skills.player_unlock_skill('test_4_slot_skill');
    //测试物品和装备系统
    // player.Player_get_item('Oak_logs', 10);
    // player.Player_get_item('wood_sword', 1, 'damaged');
    // player.Player_get_item('wood_sword', 2, 'ordinary');
    // player.Player_get_item('wood_sword', 2, 'excellent');
    // player.Player_get_item('wood_battle_axe', 2, 'ordinary'); //双手武器测试
    // player.Player_get_item('wood_battle_axe', 2, 'excellent');
    // player.Player_get_item('test_hand_gun', 1, 'ordinary'); //复合可穿戴位置装备测试
    // player.Player_get_item('test_hand_gun', 1, 'excellent');
    // player.Player_get_item('test_shield', 1, 'ordinary'); //盾牌测试
    // player.Player_get_item('test_shield', 1, 'excellent');
    // player.Player_get_item('test_boomerang', 1, 'ordinary');
    // player.Player_get_item('test_boomerang', 3, 'excellent');
    // player.Player_get_item('test_boomerang', 5, 'rare');
    // player.Player_get_item('test_boomerang', 8, 'epic');
    // player.Player_get_item('wood_bow', 1, 'ordinary'); //远程武器测试
    // let P_Askill = player.get_player_ASkill_Manage();
    // P_Askill.set_active_skill('shield_defense', 0); //在第0个主动技能槽里设置普通攻击
    // P_Askill.set_active_skill('normal_attack_Melee', 0); //在第0个主动技能槽里设置普通攻击
}
//游戏界面初始化
function dom_init() {
    //激活非战斗时游戏界面
    show_normal_game_div();
    //初始化脑海-重要事件界面
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.init_IE_div();

    // show_combat_game_div();
    //初始化玩家主动技能部分
    updata_player_active(); //主动技能测试，正常应该在战斗规划界面设置主动技能，设置之后调用这个接口
    // updata_player_active_slots_num(); //主动技能槽数量
    // updata_player_active_show(); //主动技能槽内容

    //初始化玩家背包
    updata_BP_value();
    //更新左下角的战斗规划的主动技能规划部分的内容
    let All_Skills = player.get_player_All_Skills();
    All_Skills.updata_ASP_value();
    // 将每个装备栏中的信息初始化
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    for (const radio of radios) {
        updata_equipment_show(radio.value);
    }
    //移动到初始位置
    let place_manage = global.get_place_manage();
    // place_manage.set_now_place('test_normal1');
    // place_manage.set_next_place('test_combat1');
    place_manage.set_now_place('village_home');
    place_manage.set_next_place('village_home');
}
export { LoadSaveFile };
