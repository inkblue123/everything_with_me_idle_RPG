import { add_P_Passive_skill } from '../Skill_class.js';

//初始化技能数据库中与被动技能相关的内容
function init_Player_Passive_skill(P_skills) {
    //战斗相关的被动技能
    init_combat(P_skills);

    //伐木相关的被动技能
    init_live_skill_logging(P_skills);
    //采集相关的被动技能
    init_live_skill_foraging(P_skills);
    //钓鱼相关的被动技能
    init_live_skill_fishing(P_skills);
}

function init_combat(P_skills) {
    //普通剑术
    let id;
    id = 'normal_sword';
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
    P_skills[id].add_rewards('damage_sword', 1); //增加用剑造成的伤害

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
}
//初始化与伐木相关的被动技能
function init_live_skill_logging(P_skills) {
    let id;
    //徒手伐木技巧
    id = 'bare_handed_logging';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(5, 0, 3, 3); //设置一个等级阶段
    // P_skills[id].set_levelup_data(300, 0, 3, 3); //设置一个等级阶段
    P_skills[id].add_leveling_behavior('behavior', 'logging'); //伐木时
    P_skills[id].add_leveling_behavior('weapon_type', 'emptyhanded'); //武器类型为空手时
    P_skills[id].exp_source = 'LGI_damage'; //根据伐木伤害结算经验
    //常态等级加成
    P_skills[id].add_rewards('LGI_damage_emptyhanded', 1); //增加空手伐木造成的伤害

    //快斧手
    id = 'fast_axe_skill';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(500, 0, 2, 3); //设置一个等级阶段
    P_skills[id].add_leveling_behavior('behavior', 'logging'); //伐木时
    P_skills[id].add_leveling_behavior('weapon_type', 'battle_axe', 'logging_tool'); //武器类型为战斧或者伐木工具时
    P_skills[id].exp_source = 'LGI_damage'; //根据伐木伤害结算经验
    //常态等级加成
    P_skills[id].add_rewards('LGI_damage_battle_axe', 2); //战斧伐木伤害
    P_skills[id].add_rewards('LGI_damage_logging_tool', 2); //伐木工具伐木伤害
    //关键等级节点
    P_skills[id].add_milepost(1, 'LGI_speed_battle_axe', 10); //
    P_skills[id].add_milepost(1, 'LGI_speed_logging_tool', 10); //
}
//初始化与采集相关的被动技能
function init_live_skill_foraging(P_skills) {
    let id;
    //幸运搜索者
    id = 'lucky_finder';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = false; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    P_skills[id].set_levelup_data(500, 0, 2, 3); //设置一个等级阶段
    //常态等级加成
    P_skills[id].add_rewards('FAG_attack', 2); //采集力
}
//初始化与钓鱼相关的被动技能
function init_live_skill_fishing(P_skills) {
    let id;
    //精确抛竿
    id = 'precision_cast';
    add_P_Passive_skill(P_skills, id);
    P_skills[id].initial_flag = true; //这是玩家一开始就应该有的初始技能
    P_skills[id].switch_type = 'material_acquisition'; //被动技能类型，原料获取
    P_skills[id].levelup_type = 'exp_up'; //累计经验可升级，只有一个等级上限，可升级到等级上限
    // P_skills[id].set_levelup_data(1, 0, 10, 3); //设置一个等级阶段
    P_skills[id].set_levelup_data(30, 0, 10, 3); //设置一个等级阶段
    P_skills[id].add_leveling_behavior('behavior', 'fishing'); //钓鱼时
    P_skills[id].add_leveling_behavior('weapon_type', 'fishing_tool'); //武器类型为钓鱼工具时
    P_skills[id].exp_source = 'bait_fish_num'; //根据钓鱼上钩阶段成功的次数获取经验
    //常态等级加成
    P_skills[id].add_rewards('FIS_takebait_attack', 3); //钓鱼上钩力
}

export { init_Player_Passive_skill };
