import { add_E_Active_skill } from '../Skill_class.js';

//初始化技能数据库中与敌人的技能相关的内容
function init_Enemy_Active_skill(E_skills) {
    //不攻击
    let id = 'no_attack';
    add_E_Active_skill(E_skills, id);
    E_skills[id].start_time = ['end']; //每个阶段何时计算
    E_skills[id].attack_speed = [0]; //每个阶段的攻击速度，0表示使用敌人自身的攻击速度
    //普通攻击
    id = 'normal_attack';
    add_E_Active_skill(E_skills, id);
    E_skills[id].skill_stage = 1; //这个技能有几个阶段
    E_skills[id].active_type = ['attack']; //每个阶段的类型
    E_skills[id].algorithm = [1]; //每个阶段使用哪个算法进行计算
    E_skills[id].start_time = ['end']; //每个阶段何时计算
    E_skills[id].attack_speed = [0]; //每个阶段的攻击速度，0表示使用敌人自身的攻击速度
    E_skills[id].effect = [
        {
            damage_type: 'melee',
            attack_num: { type: 'add', num: 1 },
        },
    ];
}

export { init_Enemy_Active_skill };
