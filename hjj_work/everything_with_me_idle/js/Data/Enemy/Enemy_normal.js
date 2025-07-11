import { add_Enemy_object } from './Enemy_class.js';

//敌人数据库初始化
function init_Enemy_normal(enemys) {
    let id = 'Training_Dummy';
    add_Enemy_object(enemys, id);
    enemys[id].init_attack_attr(50, 5, 5, 5, 5); //攻击属性初始化
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'Attack_Dummy'; //
    add_Enemy_object(enemys, id);
    enemys[id].init_attack_attr(50, 5, 5, 5, 5); //攻击属性初始化
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    enemys[id].init_survival_attr(2, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'small_snake'; //小蛇
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(10, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(8, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'small_slime'; //小史莱姆
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(10, 5, 5, 5, 6); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(12, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'giant_teeth_rat'; //巨齿鼠
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(30, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(8, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'rotten_wood_monster'; //朽木精怪
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(10, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(20, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'mosquitoes'; //蚊群
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 1); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(2, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'wild_boar'; //野猪
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(50, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(30, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化

    id = 'blocking_shrubs'; //拦路灌木
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'spider'; //结网蜘蛛
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'wolf'; //豺狼
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'decayed_skeleton'; //腐朽骷髅
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'wood_monster'; //树精
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化
}

export { init_Enemy_normal };
