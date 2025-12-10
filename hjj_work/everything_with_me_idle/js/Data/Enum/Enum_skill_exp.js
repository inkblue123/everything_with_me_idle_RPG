import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与技能和经验相关的内容
function init_Enum_skill_exp(enums) {
    let id;
    //每个升级行为参数归属于哪一种行为
    id = 'exp_source_for_Leveling_Behavior';
    add_Enum_Object(enums, id);
    enums[id] = {
        //战斗行为
        attack_num: 'combat_behavior', //攻击次数
        attack_damage: 'combat_behavior', //攻击伤害

        //伐木行为
        LGI_damage: 'logging_behavior', //伐木伤害
        //钓鱼行为
        bait_fish_num: 'fishing_behavior', //上钩成功次数
        //采集行为
        FAG_get_item_num: 'foraging_behavior', //采集获得物品数量
        FAG_get_rare_item_num: 'foraging_behavior', //采集获得稀有物品数量
    };
}

export { init_Enum_skill_exp };
