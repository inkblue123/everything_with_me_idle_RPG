import { add_Buff_object } from './Buff_class.js';

function init_normal_buff(buffs) {
    let id;
    id = 'test_buff1';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧都生效，清除buff时不需要复原的效果
    buffs[id].add_buff_value('continuous_start_no_restore', 'health_point', 5); //血量，每秒5点

    id = 'test_buff2';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果
    buffs[id].add_buff_value('continuous_start_restore', 'max_health_ratio', 5); //生命上限比例，每秒5%

    id = 'test_buff3';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果
    buffs[id].add_buff_value('continuous_start_restore', 'max_health_ratio', 5); //生命上限比例，每秒5%
    //仅生效一次，清除buff时需要还原的效果
    buffs[id].add_buff_value('only_start_restore', 'max_health_ratio', 10); //生命上限比例，加成5%

    id = 'sleep_1'; //睡眠
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧持续生效，清除buff时不需要还原的效果
    buffs[id].add_buff_value('continuous_start_no_restore', 'health_point', 0.25); //血量，每秒0.25点
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_value('only_start_restore', 'GS_rest_flag', true); //休息状态，设定成true
    buffs[id].add_buff_value('only_start_restore', 'change_game_speed', 30); //游戏速度，设定成30
    // buffs[id].add_buff_value('get_data_attr', 'energy_point', 0.25); //给予玩家精力

    id = 'get_up_buff'; //起床
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_value('only_start_restore', 'change_game_speed', -31); //游戏速度，设定成-31

    id = 'fatigue'; //疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_speed', -20); //伐木间隔延长20%
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_attack', -20); //伐木攻击力降低20%
    buffs[id].add_buff_value('only_start_restore', 'end_FIS_walkfish_attack', -20); //钓鱼遛鱼力降低20%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_attack', -20); //采集力降低20%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_speed', -20); //采集速度延长20%

    id = 'extreme_fatigue'; //极度疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_speed', -50); //伐木间隔延长50%
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_attack', -50); //伐木攻击力降低50%
    buffs[id].add_buff_value('only_start_restore', 'end_FIS_walkfish_attack', -50); //钓鱼遛鱼力降低50%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_attack', -50); //采集力降低50%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_speed', -50); //采集速度延长50%
    buffs[id].add_buff_value('only_start_restore', 'attack_ratio', -50); //攻击力降低50%
    buffs[id].add_buff_value('only_start_restore', 'precision_ratio', -50); //精准降低50%
    buffs[id].add_buff_value('only_start_restore', 'critical_chance_ratio', -50); //暴击率降低50%
    buffs[id].add_buff_value('only_start_restore', 'critical_damage_ratio', -50); //暴击伤害降低50%
    buffs[id].add_buff_value('only_start_restore', 'attack_interval_ratio', -50); //攻击间隔延长50%
    buffs[id].add_buff_value('only_start_restore', 'evade_ratio', -50); //闪避降低50%
    buffs[id].add_buff_value('only_start_restore', 'move_speed_ratio', -50); //移动速度降低50%

    id = 'energetic'; //精力充沛
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_speed', 20); //伐木间隔缩短20%
    buffs[id].add_buff_value('only_start_restore', 'end_LGI_attack', 20); //伐木攻击力提高20%
    buffs[id].add_buff_value('only_start_restore', 'end_FIS_walkfish_attack', 20); //钓鱼遛鱼力提高20%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_attack', 20); //采集力提高20%
    buffs[id].add_buff_value('only_start_restore', 'end_FAG_speed', 20); //采集间隔缩短20%
    buffs[id].add_buff_value('only_start_restore', 'attack_ratio', 20); //攻击力提高20%
    buffs[id].add_buff_value('only_start_restore', 'precision_ratio', 20); //精准提高20%
    buffs[id].add_buff_value('only_start_restore', 'critical_chance_ratio', 20); //暴击率提高20%
    buffs[id].add_buff_value('only_start_restore', 'critical_damage_ratio', 20); //暴击伤害提高20%
    buffs[id].add_buff_value('only_start_restore', 'attack_interval_ratio', 20); //攻击间隔缩短20%
    buffs[id].add_buff_value('only_start_restore', 'evade_ratio', 20); //闪避提高20%
    buffs[id].add_buff_value('only_start_restore', 'move_speed_ratio', 20); //移动速度提高20%
}

export { init_normal_buff };
