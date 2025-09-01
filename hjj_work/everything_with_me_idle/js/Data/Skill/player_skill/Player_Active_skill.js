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
    P_skills[id].levelup_type = 'unlevelup';

    //蓄力重击
    id = 'energy_storage_attack';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 2; //需要几个技能槽
    //这个技能的每个槽使用哪个基础技能
    P_skills[id].need_slot_id = ['energy_storage', 'normal_attack_Melee'];
    P_skills[id].levelup_type = 'unlevelup';

    //测试3槽技能
    id = 'test_3_slot_skill';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 3; //需要几个技能槽
    //这个技能的每个槽使用哪个基础技能
    P_skills[id].need_slot_id = ['normal_attack_Melee', 'normal_attack_Melee', 'normal_attack_Melee'];
    P_skills[id].levelup_type = 'unlevelup';

    //测试4槽技能
    id = 'test_4_slot_skill';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 4; //需要几个技能槽
    //这个技能的每个槽使用哪个基础技能
    P_skills[id].need_slot_id = ['normal_attack_Melee', 'normal_attack_Melee', 'normal_attack_Melee', 'normal_attack_Melee'];
    P_skills[id].levelup_type = 'unlevelup';

    //盾牌防御
    id = 'shield_defense';
    add_P_Active_skill(P_skills, id);
    P_skills[id].need_slot_num = 1; //需要几个技能槽
    //这个技能的每个槽使用哪个基础技能
    P_skills[id].need_slot_id = ['shield_defense'];
    P_skills[id].levelup_type = 'unlevelup';
}

export { init_Player_Active_skill };
