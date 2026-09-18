import { add_Buff_object } from './Buff_class.js';

//普通buff的数据
//效果行统一用 buffs[id].add_buff_effect(out, when, dispatch, target, value, per_layer, revert) 添加
//参数的顺序是固定的，写调用的时候请对照下面这 7 项：
//  out        产出类型：'value' 产出一个加成值（汇进总对象 end_buff_attr，由 restart_end_buff 统一分派）
//                      'act'   产出一件事（交给动作通道执行，本期还没开发，只占位置）
//  when       时机：'tick'     每帧产出一次（数值按经过时间等比摊算，即 100ms 摊算）
//                    'on_apply' 获得时只产出一次
//  dispatch   分发给谁：'resource'         当前资源（血量/魔力/精力）
//                      'attr'             最终属性汇总（end_data_attr）
//                      'flag'             游戏标记（布尔量）
//                      'game_speed_num'   游戏速度加算
//                      'game_speed_ratio' 游戏速度乘算
//  target     改哪个东西
//  value      数值
//  per_layer  是否乘以当前层数
//  revert     移除 buff 时是否把已经加上的撤销
function init_normal_buff(buffs) {
    let id;
    id = 'test_buff1';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧都生效，清除buff时不需要复原的效果
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 5, false, false); //血量，每秒5点

    id = 'test_buff2';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果：生命上限比例，每秒5%
    buffs[id].add_buff_effect('value', 'tick', 'attr', 'max_health_ratio', 5, false, true);

    id = 'test_buff3';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 5); //以游戏内时间为依据，持续时间5秒
    //每帧都生效，清除buff时需要复原的效果：生命上限比例，每秒5%
    buffs[id].add_buff_effect('value', 'tick', 'attr', 'max_health_ratio', 5, false, true);
    //仅生效一次，清除buff时需要还原的效果：生命上限比例，加成10%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'max_health_ratio', 10, false, true);

    id = 'sleep_1'; //睡眠
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //每帧持续生效，清除buff时不需要还原的效果：血量，每秒0.25点
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 0.25, false, false);
    //仅需要生效一次，清除buff时需要还原：休息状态，设定成true
    buffs[id].add_buff_effect('value', 'on_apply', 'flag', 'GS_rest_flag', true, false, true);
    //仅需要生效一次，清除buff时需要还原：游戏速度，设定成30
    buffs[id].add_buff_effect('value', 'on_apply', 'game_speed_num', 'change_game_speed', 30, false, true);
    // buffs[id].add_buff_effect('value', 'tick', 'resource', 'energy_point', 0.25, false, false); //给予玩家精力

    id = 'get_up_buff'; //起床
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原：游戏速度，设定成-31
    buffs[id].add_buff_effect('value', 'on_apply', 'game_speed_num', 'change_game_speed', -31, false, true);

    id = 'fatigue'; //疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
    //仅需要生效一次，清除buff时需要还原
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_speed', -20, false, true); //伐木间隔延长20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_LGI_attack_ratio', -20, false, true); //伐木攻击力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_FIS_walkfish_attack', -20, false, true); //钓鱼遛鱼力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_attack', -20, false, true); //采集力降低20%
    buffs[id].add_buff_effect('value', 'on_apply', 'attr', 'end_CLT_speed_num', -20, false, true); //采集速度延长20%

    id = 'extreme_fatigue'; //极度疲劳
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
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
    buffs[id].set_time_type('game_time_buff', 'infinite'); //以游戏内时间为依据，持续时间无限
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

    //数据装完之后做一次自洽检查（只打警告，不阻止游戏启动）
    check_buff_data(buffs);
}

//检查 buff 数据是否自洽
//只打警告，不阻止游戏启动；返回发现的问题数量
function check_buff_data(buffs) {
    let warn_num = 0;
    let effect_num = 0;
    for (let id in buffs) {
        for (let effect of buffs[id].effects) {
            effect_num++;
            //资源类效果（血量/魔力/精力）不允许「移除时撤销」：
            //给出去的血、扣掉的血，不应该因为 buff 消失就被倒着算回去
            if (effect.dispatch == 'resource' && effect.revert) {
                console.log('buff数据校验：%s 的 %s 是资源类效果，不应该声明 revert:true（移除时会把它倒着算回去）', id, effect.target);
                warn_num++;
            }
        }
    }
    if (warn_num == 0) {
        console.log('buff数据校验通过：%s 条 buff、%s 条效果行', Object.keys(buffs).length, effect_num);
    } else {
        console.log('buff数据校验发现 %s 处问题（仅告警，不影响运行）', warn_num);
    }
    return warn_num;
}

export { init_normal_buff, check_buff_data };
