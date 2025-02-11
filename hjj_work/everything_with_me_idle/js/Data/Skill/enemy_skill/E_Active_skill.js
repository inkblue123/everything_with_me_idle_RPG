import { add_E_Active_skill } from '../Skill_class.js';
import { Askill_algorithm_1 } from '../../../Function/math_func.js';

//初始化技能数据库中与敌人的技能相关的内容
function init_E_Active_skill(skills) {
    //不攻击
    let id = 'no_attack';
    add_E_Active_skill(skills, id);
    skills[id].start_time = ['end']; //每个阶段何时计算
    skills[id].attack_speed = [0]; //每个阶段的攻击速度，0表示使用敌人自身的攻击速度
    //普通攻击
    id = 'normal_attack';
    add_E_Active_skill(skills, id);
    skills[id].skill_stage = 1; //这个技能有几个阶段
    skills[id].active_type = ['attack']; //每个阶段的类型
    skills[id].algorithm = [Askill_algorithm_1]; //每个阶段使用哪个算法进行计算
    skills[id].start_time = ['end']; //每个阶段何时计算
    skills[id].attack_speed = [0]; //每个阶段的攻击速度，0表示使用敌人自身的攻击速度
}

export { init_E_Active_skill };
