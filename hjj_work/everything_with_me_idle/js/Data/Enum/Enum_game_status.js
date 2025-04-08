import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';

//初始化枚举库中与游戏行为监控相关的内容
function init_monitor_data(enums) {
    let id = 'Player_attack_status'; //玩家攻击相关参数
    add_Enum_Array(enums, id);
    enums[id] = [];

    id = 'Player_attacted_status'; //玩家受击相关参数
    add_Enum_Array(enums, id);
    enums[id] = ['all_armor_attacted'];

    id = 'Player_kill_enemy_status'; //玩家击杀敌人相关参数
    add_Enum_Array(enums, id);
    enums[id] = ['melee_kill'];
}
//初始化枚举库中与游戏状态参数相关的内容
function init_game_status(enums) {
    let id = 'game_status';
    add_Enum_Array(enums, id);
    enums[id] = [
        'GS_combat_statu', //是否处于战斗中
        'GS_game_event', //是否处于事件中
    ];
}
//初始化枚举库中与短期游戏状态参数相关的内容
function init_short_game_status(enums) {
    let id = 'short_game_status';
    add_Enum_Array(enums, id);
    enums[id] = [
        'SGS_new_player_combat_test', //新手战斗训练
        'SGS_new_player_teach_1',
        'SGS_new_player_teach_2',
    ];
}
//初始化枚举库中与重要节点参数相关的内容
function init_important_nodes(enums) {
    let id = 'important_nodes';
    add_Enum_Object(enums, id);
    add_Enum_Array(enums[id], 'page');
    add_Enum_Array(enums[id], 'challenge');
    add_Enum_Array(enums[id], 'achievement');
    add_Enum_Array(enums[id], 'mini_event');
    enums[id].page = ['page_1'];
    enums[id].challenge = ['new_player_combat_test'];
    enums[id].mini_event = ['new_player_teach_1', 'new_player_teach_2'];
}
//初始化枚举库中与临用游戏状态参数相关的内容
function init_use_game_status(enums) {
    let id = 'use_game_status'; //玩家攻击相关参数
    add_Enum_Array(enums, id);
    enums[id] = [
        'UGS_village_barracks_week', //当前日期在村庄中属于轮周的第几天
        'UGS_ASP_type', //主动技能规划界面的过滤条件
    ];
}

//初始化枚举库中与游戏状态参数相关的内容
function init_Enum_game_status(enums) {
    //事件数值监控
    init_monitor_data(enums);

    //游戏状态
    init_game_status(enums);
    //短期游戏状态
    init_short_game_status(enums);
    //重要节点
    init_important_nodes(enums);
    //临用游戏状态
    init_use_game_status(enums);
}

export { init_Enum_game_status };
