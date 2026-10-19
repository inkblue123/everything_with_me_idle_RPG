import { add_Buff_object } from './Buff_class.js';

//普通buff的数据
//buff参数统一用 buffs[id].set_buff_data(time_type, time_value, scope, stackable, layer_time_ratio, stack_expire) 设置
//参数的顺序是固定的，写调用的时候请对照下面这 6 项：
//  time_type         时间计算方式：'game_time_buff'     以游戏内时间为依据（默认）
//                                  'combat_round_buff'  以玩家战斗回合为依据（尚未实现）
//                                  'combat_active_buff' 以玩家主动技能时间为依据（尚未实现）
//  time_value        在这个计算方式下的有效时间：秒数，或 'infinite'
//  scope             作用域：'normal' 普通（默认）
//                          'combat' 战斗（战斗外不结算效果，只加速消散）
//                          'life'   生活（尚未使用）
//  stackable         是否可叠层：true 重复获得层数+1 / false 新buff替换旧buff（默认）
//  layer_time_ratio  每多一层，持续时间的倍率（默认 1 = 不衰减）
//  stack_expire      到期行为：'remove' 整条消失（默认） / 'reduce_layer' 减1层并重启计时
//没有传（或传 undefined）的参数，保持默认值
//效果行统一用 buffs[id].add_buff_effect(out, when, dispatch, target, value, per_layer, revert) 添加
//参数的顺序也是固定的，请对照 Buff_class.js 里那 7 项注释
function init_normal_buff(buffs) {
    let id;
    id = 'test_buff1';
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧都生效，清除buff时不需要复原的效果
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 5, false, false); //血量，每秒5点

    id = 'test_buff2';
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果：生命上限比例，每秒5%
    buffs[id].add_buff_effect('value', 'tick', 'attr', 'max_health_ratio', 5, false, true);

    id = 'test_buff3';
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果：生命上限比例，每秒5%
    buffs[id].add_buff_effect('value', 'tick', 'attr', 'max_health_ratio', 5, false, true);
    //仅生效一次，清除buff时需要还原的效果：生命上限比例，加成10%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'max_health_ratio', 10, false, true);

    id = 'sleep_1'; //睡眠
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧持续生效，清除buff时不需要还原的效果：血量，每秒0.25点
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 0.25, false, false);
    //仅需要生效一次，清除buff时需要还原：休息状态，设定成true
    buffs[id].add_buff_effect('value', 'on_apply', 'flag', 'GS_rest_flag', true, false, true);
    //仅需要生效一次，清除buff时需要还原：游戏速度，设定成30
    buffs[id].add_buff_effect('value', 'on_apply', 'game_speed_num', 'change_game_speed', 30, false, true);
    // buffs[id].add_buff_effect('value', 'tick', 'resource', 'energy_point', 0.25, false, false); //给予玩家精力

    id = 'get_up_buff'; //起床
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原：游戏速度，设定成-31
    buffs[id].add_buff_effect('value', 'on_apply', 'game_speed_num', 'change_game_speed', -31, false, true);

    id = 'fatigue'; //疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_speed', -20, false, true); //伐木间隔延长20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_attack_ratio', -20, false, true); //伐木攻击力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_FIS_walkfish_attack', -20, false, true); //钓鱼遛鱼力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_attack', -20, false, true); //采集力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_speed_num', -20, false, true); //采集速度延长20%

    id = 'extreme_fatigue'; //极度疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_speed', -50, false, true); //伐木间隔延长50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_attack_ratio', -50, false, true); //伐木攻击力降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_FIS_walkfish_attack', -50, false, true); //钓鱼遛鱼力降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_attack', -50, false, true); //采集力降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_speed_num', -50, false, true); //采集速度延长50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'attack_ratio', -50, false, true); //攻击力降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'precision_ratio', -50, false, true); //精准降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'critical_chance_ratio', -50, false, true); //暴击率降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'critical_damage_ratio', -50, false, true); //暴击伤害降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'attack_interval_ratio', -50, false, true); //攻击间隔延长50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'evade_ratio', -50, false, true); //闪避降低50%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'move_speed_ratio', -50, false, true); //移动速度降低50%

    id = 'energetic'; //精力充沛
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_speed', 20, false, true); //伐木间隔缩短20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_attack_ratio', 20, false, true); //伐木攻击力提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_FIS_walkfish_attack', 20, false, true); //钓鱼遛鱼力提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_attack', 20, false, true); //采集力提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_speed_num', 20, false, true); //采集间隔缩短20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'attack_ratio', 20, false, true); //攻击力提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'precision_ratio', 20, false, true); //精准提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'critical_chance_ratio', 20, false, true); //暴击率提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'critical_damage_ratio', 20, false, true); //暴击伤害提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'attack_interval_ratio', 20, false, true); //攻击间隔缩短20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'evade_ratio', 20, false, true); //闪避提高20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'move_speed_ratio', 20, false, true); //移动速度提高20%

    id = 'burn'; //燃烧
    add_Buff_object(buffs, id);
    //战斗型：战斗外不结算效果，只加速消散；可叠层，重复获得层数+1并按时长规则重算剩余时间
    //每多一层持续时间乘0.75；到期减1层并重启计时，减到0层才消失
    buffs[id].set_buff_data('game_time_buff', 10, 'combat', true, 0.75, 'reduce_layer');
    //每帧都生效，清除buff时不需要复原的效果：血量，每秒每层1点
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', -1, true, false);
}

export { init_normal_buff };
