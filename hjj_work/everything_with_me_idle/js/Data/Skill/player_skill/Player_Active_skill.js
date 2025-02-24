import { add_P_Active_skill } from '../Skill_class.js';
// import { Askill_algorithm_1 } from '../../../Function/math_func.js';

//初始化技能数据库中最终呈现的主动技能
function init_Player_Active_skill(P_skills) {
    //普通攻击-近战
    let id = 'normal_attack_Melee';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 1; //需要几个技能槽
    //每个槽中使用的基础技能
    P_skills[id].need_slot_id = ['normal_attack_Melee'];
    // P_skills[id].init_skill_desc();
    P_skills[id].levelup_flag = false;

    //蓄力重击
    id = 'energy_storage_attack';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 2; //需要几个技能槽
    //这个技能的每个槽使用哪个基础技能
    P_skills[id].need_slot_id = ['energy_storage', 'normal_attack_Melee'];
    // P_skills[id].init_skill_desc();
    P_skills[id].levelup_flag = false;
}

export { init_Player_Active_skill };
