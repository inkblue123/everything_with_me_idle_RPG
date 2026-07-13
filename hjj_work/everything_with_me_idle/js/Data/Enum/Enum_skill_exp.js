import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与技能和经验相关的内容
function init_Enum_skill_exp(enums) {
    let id;
    //每个经验依据归属于哪一种行为
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
        CLT_get_item_num: 'collect_behavior', //采集获得物品数量
        CLT_get_rare_item_num: 'collect_behavior', //采集获得稀有物品数量
        //合成制造行为
        make_exp: 'synthesis_behavior', //合成制造配方的项目经验
        formula_id: 'synthesis_behavior', //合成制造配方的项目经验
    };
    //部分经验依据的数值要从数据库中获取，这里记录了经验依据和数据库的联系
    id = 'exp_source_for_Data';
    add_Enum_Object(enums, id);
    enums[id] = {
        make_exp: 'formula', //配方经验
        combat_exp: 'enemy', //敌人经验
        use_exp: 'item', //物品使用经验
    };
}

export { init_Enum_skill_exp };
