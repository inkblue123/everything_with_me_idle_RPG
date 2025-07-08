import { add_P_Passive_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_Plyaer_Passive_skill(P_skills) {
    //普通剑术
    let id = 'normal_sword';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].passive_type = 'weapon_mastery'; //被动技能类型
    P_skills[id].set_skill_levelup_data(10, 10, 1);
    P_skills[id].add_leveling_behavior('behavior', 'combat'); //战斗时
    P_skills[id].add_leveling_behavior('weapon_type', 'sword'); //武器类型为剑时
    P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验
    P_skills[id].rewards = [
        {
            attr: 'sword_damage', //增加用剑造成的伤害
            algorithm: 1,
        }, //常态等级加成
    ];

    //普通棍法
    id = 'normal_sticks';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].passive_type = 'weapon_mastery'; //被动技能类型
    P_skills[id].set_skill_levelup_data(10, 10, 1);
    P_skills[id].add_leveling_behavior('behavior', 'combat');
    P_skills[id].add_leveling_behavior('weapon_type', 'sticks'); //武器类型为棍棒时
    P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验

    //普通棍法
    // id = 'normal_sticks';
    // add_P_Passive_skill(P_skills, id);
    // P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    // P_skills[id].passive_type = 'weapon_mastery'; //被动技能类型
    // P_skills[id].set_skill_levelup_data(10, 10, 1);
    // P_skills[id].add_leveling_behavior('behavior', 'combat');
    // P_skills[id].add_leveling_behavior('weapon_type', 'sticks'); //武器类型为棍棒时
    // P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验
}

export { init_Plyaer_Passive_skill };
