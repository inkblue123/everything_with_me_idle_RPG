import { add_P_Passive_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_Plyaer_Passive_skill(P_skills) {
    //普通剑术
    let id = 'normal_sword';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'weapon_mastery'; //被动技能类型
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(10, 0, 10, 1); //设置一个等级阶段
    //练级行为
    P_skills[id].add_leveling_behavior('behavior', 'combat'); //战斗时
    P_skills[id].add_leveling_behavior('weapon_type', 'sword'); //武器类型为剑时
    P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验
    //常态等级加成
    P_skills[id].add_rewards('sword_damage', 1); //增加用剑造成的伤害

    //普通棍法
    id = 'normal_sticks';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'weapon_mastery'; //被动技能类型
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(10, 0, 10, 1); //设置一个等级阶段
    //练级行为
    P_skills[id].add_leveling_behavior('behavior', 'combat');
    P_skills[id].add_leveling_behavior('weapon_type', 'sticks'); //武器类型为棍棒时
    P_skills[id].exp_source = 'attack_num'; //根据攻击次数获得经验

    //徒手伐木技巧
    id = 'bare_handed_logging';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(300, 0, 3, 3); //设置一个等级阶段
    P_skills[id].add_leveling_behavior('behavior', 'logging'); //伐木时
    P_skills[id].add_leveling_behavior('weapon_type', 'gloves'); //武器类型为拳套时
    P_skills[id].exp_source = 'LGI_damage'; //根据伐木伤害结算经验
    //常态等级加成
    P_skills[id].add_rewards('gloves_LGI_damage', 1); //增加空手伐木造成的伤害

    //快斧手
    id = 'fast_axe_skill';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(500, 0, 2, 3); //设置一个等级阶段
    P_skills[id].add_leveling_behavior('behavior', 'logging'); //伐木时
    P_skills[id].add_leveling_behavior('weapon_type', 'axe'); //武器类型为斧头时
    P_skills[id].exp_source = 'LGI_damage'; //根据伐木伤害结算经验
    //常态等级加成
    P_skills[id].add_rewards('axe_LGI_damage', 2); //斧头伐木伤害
    //关键等级节点
    P_skills[id].add_milepost(1, 'axe_LGI_speed', -0.25); //
}

export { init_Plyaer_Passive_skill };
