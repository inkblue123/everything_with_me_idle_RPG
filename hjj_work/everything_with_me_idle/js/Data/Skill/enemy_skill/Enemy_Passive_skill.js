import { add_E_Active_skill } from '../Skill_class.js';
import { Askill_algorithm_1 } from '../../../Function/math_func.js';

//初始化技能数据库中与敌人的技能相关的内容
function init_enemy_Active_skill(E_skills) {
    //不攻击
    let id = 'no_attack';
    add_E_Active_skill(E_skills, id);
    E_skills[id].active_condition = { weapon_damage_type: 'melee' }; //武器需要是近战类型
    E_skills[id].need_slot_num = 1; //需要几个技能槽
    E_skills[id].active_type = ['attack']; //攻击类型主动技能
    E_skills[id].attr_correct = [{ power: 1 }]; //哪些属性作为基础数值进行计算
    E_skills[id].algorithm = [Askill_algorithm_1]; //使用哪个算法进行计算
    E_skills[id].start_time = ['end']; //结束时计算
    E_skills[id].lock_enemy_type = {
        num: 1, //攻击一个敌人
        distance: 'min', //选择最近的
        type: 'normal', //普通直接攻击
    };
}

export { init_enemy_Active_skill };
