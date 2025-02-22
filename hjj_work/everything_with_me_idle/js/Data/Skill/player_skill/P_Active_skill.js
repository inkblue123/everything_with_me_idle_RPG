import { add_P_Active_skill } from '../Skill_class.js';
// import { Askill_algorithm_1 } from '../../../Function/math_func.js';

//初始化技能数据库中与主动技能相关的内容
function init_P_Active_skill(P_skills) {
    //普通攻击-近战
    let id = 'normal_attack_Melee';
    add_P_Active_skill(P_skills, id);
    P_skills[id].active_condition = { weapon_type: ['melee'] }; //武器需要是近战类型
    P_skills[id].need_slot_num = 1; //需要几个技能槽
    P_skills[id].active_type = ['attack']; //攻击类型主动技能
    P_skills[id].base_attr = [{ power: 1 }]; //哪些属性作为基础数值进行计算
    P_skills[id].algorithm = [1]; //使用哪个算法进行计算
    P_skills[id].attack_num = [{ type: 'add', num: 1 }]; //攻击次数
    P_skills[id].damage_type = ['melee']; //伤害类型
    P_skills[id].start_time = ['end']; //结束时计算
    P_skills[id].lock_enemy_type = {
        num: 1, //攻击一个敌人
        distance: 'min', //选择最近的
        // type: 'normal', //普通直接攻击
    };
    P_skills[id].init_skill_desc();
    P_skills[id].levelup_flag = false;
}

export { init_P_Active_skill };
