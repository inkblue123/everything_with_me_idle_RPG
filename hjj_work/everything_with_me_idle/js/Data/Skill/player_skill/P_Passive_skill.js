import { add_P_Passive_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_P_Passive_skill(skills) {
    //普通剑术
    let id = 'normal_sword';
    add_P_Passive_skill(skills, id);
}

export { init_P_Passive_skill };
