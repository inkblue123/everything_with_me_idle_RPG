import { add_P_Passive_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_Plyaer_Passive_skill(P_skills) {
    //普通剑术
    let id = 'normal_sword';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true;
    P_skills[id].base_flag = true;
    P_skills[id].set_skill_levelup_data(10, 10, 1);
    P_skills[id].leveling_behavior = {
        //
        behavior: 'combat', //战斗时
        weapon_type: 'sword', //武器类型为剑时
    };
    P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验
}

export { init_Plyaer_Passive_skill };
