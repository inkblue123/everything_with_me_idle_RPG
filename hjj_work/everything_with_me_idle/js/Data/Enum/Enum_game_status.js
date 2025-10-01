import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';

//初始化枚举库中与游戏行为监控相关的内容
function init_monitor_data(enums) {
    let id = 'Player_attack_status'; //玩家攻击相关参数
    add_Enum_Array(enums, id);
    enums[id] = [];

    //玩家受击的行为由ATD_开头，所以不用在枚举库中定义
    // id = 'Player_attacted_status'; //玩家受击相关参数
    // add_Enum_Array(enums, id);

    //玩家击杀行为由PKL_开头，不再定义
    // id = 'Player_kill_enemy_status'; //玩家击杀敌人相关参数
    // add_Enum_Array(enums, id);
}
//初始化枚举库中与游戏状态参数相关的内容
function init_game_status(enums) {
    //游戏状态由GS_开头，并且游戏开始时需要初始化，所以要在这里定义
    let id = 'game_status';
    add_Enum_Object(enums, id);
    enums[id] = {
        GS_game_statu: 'NULL', //当前游戏状态，比如战斗中、伐木中、钓鱼中等等
        GS_challenge_flag: false, //是否处于挑战中
        GS_logging_way: 'LGI_F_way', //伐木技能选择的伐木策略
        GS_unlock_logging: false, //伐木技能是否解锁
        GS_unlock_fishing: false, //钓鱼技能是否解锁
        GS_unlock_mining: false, //挖矿技能是否解锁
        GS_unlock_foraging: false, //采集技能是否解锁
        GS_unlock_diving: false, //潜水技能是否解锁
        GS_unlock_archaeology: false, //考古技能是否解锁
        GS_unlock_exploration: false, //探索技能是否解锁
    };
    //生活技能枚举
    //这里枚举的技能是会写入GS_game_statu游戏状态的，运行时遇到对应的状态就处理相应的逻辑
    id = 'live_plan_GS';
    add_Enum_Array(enums, id);
    enums[id] = ['logging', 'fishing', 'mining', 'foraging', 'diving', 'archaeology', 'exploration', 'engrave'];
}
//初始化枚举库中与短期游戏状态参数相关的内容
function init_short_game_status(enums) {
    //短期游戏状态由SGS_开头，不需要辨别
    // let id = 'short_game_status';
    // add_Enum_Array(enums, id);
    // enums[id] = [
    //     'SGS_new_player_combat_test', //新手战斗训练
    //     'SGS_new_player_teach_1',
    //     'SGS_new_player_teach_2',
    // ];
}
//初始化枚举库中与重要节点参数相关的内容
function init_important_nodes(enums) {
    let id = 'important_nodes';
    add_Enum_Object(enums, id);
    add_Enum_Array(enums[id], 'main_quest');
    add_Enum_Array(enums[id], 'challenge');
    add_Enum_Array(enums[id], 'achievement');
    add_Enum_Array(enums[id], 'mini_event');
    add_Enum_Array(enums[id], 'side_quest');
    //每种重要节点具体有哪些事件的枚举在Data.js中初始化
}
//初始化枚举库中与临用游戏状态参数相关的内容
function init_use_game_status(enums) {
    //临用游戏状态由UGS_开头，不需要在枚举库里添加了
    // let id = 'use_game_status'; //玩家攻击相关参数
    // add_Enum_Array(enums, id);
    // enums[id] = [
    //     'UGS_village_barracks_week', //当前日期在村庄中属于轮周的第几天
    //     'UGS_ASP_type', //主动技能规划界面的过滤条件
    // ];
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
