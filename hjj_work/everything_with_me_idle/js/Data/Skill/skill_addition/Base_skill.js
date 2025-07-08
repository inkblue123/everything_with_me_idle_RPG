import { add_P_Active_skill } from '../Skill_class.js';

//初始化技能数据库中仅做数据的主动技能
function init_base_Active_skill(B_skills) {
    //普通攻击-近战
    let id = 'normal_attack_Melee';
    add_P_Active_skill(B_skills, id);
    B_skills[id].active_condition = { damage_type: ['melee'] }; //武器需要是近战类型
    B_skills[id].active_type = 'attack'; //攻击类型主动技能
    B_skills[id].attr_correct = { power: 1 }; //哪些属性作为基础数值进行计算
    B_skills[id].algorithm = 1; //使用哪个算法进行计算
    B_skills[id].start_time = 'end'; //结束时计算
    //技能效果
    B_skills[id].effect = {
        damage_type: 'melee',
        attack_num: { type: 'add', num: 1 },
        //索敌逻辑
        lock_enemy_type: {
            num: 1, //攻击一个敌人
            distance: 'min', //选择最近的
        },
    };
    B_skills[id].set_skill_desc();

    //蓄力
    id = 'energy_storage';
    add_P_Active_skill(B_skills, id);
    B_skills[id].active_condition = {}; //无要求
    B_skills[id].active_type = 'auxiliary'; //辅助类型
    B_skills[id].attr_correct = { power: 1 }; //哪些属性作为基础数值进行计算
    B_skills[id].algorithm = 1; //使用哪个算法进行计算
    B_skills[id].start_time = 'end'; //结束时计算
    //技能效果
    B_skills[id].effect = {
        auxiliary_type: 'add_main_Attack', //什么类型的辅助，比如新增buff、加成下一次攻击、等等
    };
    B_skills[id].set_skill_desc();

    //盾牌防御
    id = 'shield_defense';
    add_P_Active_skill(B_skills, id);
    B_skills[id].active_condition = { weapon_type: ['shield'] }; //无要求
    B_skills[id].active_type = 'defense'; //防御类型
    B_skills[id].attr_correct = { power: 1 }; //哪些属性作为基础数值进行计算
    B_skills[id].algorithm = 1; //使用哪个算法进行计算
    B_skills[id].start_time = 'start'; //启动时计算
    //技能效果
    B_skills[id].effect = {
        defense_type: 'damage_reduction', //伤害减免类型
        defense_num: 1, //防御1次
        DR_math_type: 'num', //固定数值减免
    };
    B_skills[id].set_skill_desc();
}

export { init_base_Active_skill };
