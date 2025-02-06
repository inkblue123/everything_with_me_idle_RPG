import { add_Active_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_Active_skill(skills) {
    //普通攻击-近战
    let id = 'normal_attack_Melee';
    add_Active_skill(skills, id);
    skills[id].active_type = 'attack'; //攻击类型主动技能
    skills[id].base_attr = { power: 1 }; //哪些属性作为基础数值进行计算
    skills[id].algorithm = 1; //使用哪个算法进行计算
    skills[id].need_slot_num = 1; //需要几个技能槽
}

export { init_Active_skill };
