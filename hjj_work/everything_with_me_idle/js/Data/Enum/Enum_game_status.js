import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';

//初始化枚举库中与游戏行为监控相关的内容
function init_short_game_data_monitor(enums) {
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
    let id = 'game_status'; //玩家攻击相关参数
    add_Enum_Array(enums, id);
    enums[id] = [
        'combat_statu', //是否处于战斗中
        'game_event', //是否处于事件中
    ];
}

//初始化枚举库中与游戏状态参数相关的内容
function init_Enum_game_status(enums) {
    //短期游戏数值监控
    init_short_game_data_monitor(enums);
    //游戏状态
    init_game_status(enums);
}

export { init_Enum_game_status };
