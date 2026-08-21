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
        SYN_formula_make_exp: 'synthesis_behavior', //合成制造配方id
    };
    //部分经验依据的数值要从数据库中获取，这里记录了经验依据和数据库的联系
    id = 'exp_source_for_Data';
    add_Enum_Object(enums, id);
    enums[id] = {
        // make_exp: {
        //     data_name: 'formula',
        //     exp_name: 'make_exp',
        // }, //配方经验
        // SYN_formula_id: 'formula', //配方经验
        SYN_formula_make_exp: {
            data_name: 'formula',
            exp_name: 'make_exp',
        }, //配方经验
        // COK_formula_id: 'formula', //配方经验
        // FRG_formula_id: 'formula', //配方经验
        // EXA_formula_id: 'formula', //配方经验
        // HBB_formula_id: 'formula', //配方经验
        // EGV_formula_id: 'formula', //配方经验
        // ACM_formula_id: 'formula', //配方经验
        // combat_exp: 'enemy', //敌人经验
        // use_exp: 'item', //物品使用经验
    };
    //数值来源于数据库的经验依据，它对应的经验依据要从练级行为的哪个字段上读取数据库查询用的id
    //字段名带技能前缀（如SYN_formula_id）是为了区分各个生活技能自己记录的配方id
    id = 'exp_source_for_Data_key';
    add_Enum_Object(enums, id);
    enums[id] = {
        SYN_formula_make_exp: {
            son_behavior: 'synthesis_behavior',
            id_key: 'SYN_formula_id', //配方经验使用合成制造行为里的配方id
        },
    };
}

export { init_Enum_skill_exp };
