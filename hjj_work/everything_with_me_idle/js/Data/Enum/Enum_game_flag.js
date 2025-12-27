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
        GS_rest_flag: false, //是否处于休息状态
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
//初始化枚举库中与游戏日志相关的内容
function init_game_log_status(enums) {
    let id;

    id = 'combat_log_type'; //属于战斗相关的游戏日志
    add_Enum_Array(enums, id);
    enums[id] = [
        'player_attack', //玩家攻击
        'enemy_attack', //敌人攻击
    ];
    id = 'item_log_type'; //属于物品相关的游戏日志
    add_Enum_Array(enums, id);
    enums[id] = [
        'get_item', //获得物品
    ];
    id = 'live_log_type'; //属于生活技能相关的游戏日志
    add_Enum_Array(enums, id);
    enums[id] = [
        'live_skill_run', //生活技能运行时的通用日志
        'logging', //伐木技能运行时的日志
        'fishing', //钓鱼技能运行时的日志
        'mining', //挖矿技能运行时的日志
        'foraging', //采集技能运行时的日志
        'diving', //潜水技能运行时的日志
        'archaeology', //考古技能运行时的日志
        'exploration', //探索技能运行时的日志
    ];
    id = 'other_log_type'; //属于其他部分的游戏日志
    add_Enum_Array(enums, id);
    enums[id] = [
        'finish_event', //完成了某个事件
        'unluck_skill', //解锁了新的技能
        'skill_levelup', //技能升级
    ];
}
//初始化枚举库中与游戏设置相关的内容
function init_game_option(enums) {
    let id;

    //游戏设置由OP_开头，并且游戏开始时需要初始化，所以要在这里定义
    id = 'game_option';
    add_Enum_Object(enums, id);
    enums[id] = {
        OP_game_FPS: 30, //游戏帧率
        OP_game_OptionTipText: 'default', //设置界面提示文本
        OP_game_RASaveLogMax: 10, //流水账界面日志保存数量上限
    };
    //每个游戏设置在处理时的类型
    id = 'game_option_type';
    add_Enum_Object(enums, id);
    enums[id] = {
        OP_game_FPS: 'select', //游戏帧率
        OP_game_OptionTipText: 'select', //设置界面提示文本
        OP_game_RASaveLogMax: 'select', //流水账界面日志保存数量上限
        OP_game_SaveManage: 'button', //存档管理
    };

    //游戏-游戏帧率的所有选项
    id = 'OP_game_FPS';
    add_Enum_Object(enums, id);
    enums[id] = [30, 60];
    //游戏-设置界面提示文本的所有选项
    id = 'OP_game_OptionTipText';
    add_Enum_Object(enums, id);
    enums[id] = ['default', 'super'];
    //游戏-流水账界面日志保存数量上限的所有选项
    id = 'OP_game_RASaveLogMax';
    add_Enum_Object(enums, id);
    enums[id] = [10, 15, 20, 30, 50];
}
//初始化枚举库中与游戏状态参数相关的内容
function init_Enum_game_flag(enums) {
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
    //游戏日志
    init_game_log_status(enums);
    //游戏设置
    init_game_option(enums);
}

export { init_Enum_game_flag };
