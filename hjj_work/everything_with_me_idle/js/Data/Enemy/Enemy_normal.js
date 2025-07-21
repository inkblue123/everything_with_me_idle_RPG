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
    //可掉落物品
    enemys[id].create_item_array(10); //创造一个物品队列，掉率10%
    enemys[id].add_item(0, 'animal_bone', 10, 1, 1); //兽骨

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
    //可掉落物品
    enemys[id].create_item_array(30); //创造一个物品队列，掉率30%
    enemys[id].add_item(0, 'animal_bone', 10, 2, 1); //兽骨
    enemys[id].add_item(0, 'animal_raw_meat', 1, 3, 1); //野兽生肉
    enemys[id].add_item(0, 'animal_viscus', 3, 3, 1); //野兽内脏

    id = 'rotten_wood_monster'; //朽木精怪
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(10, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(20, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化
    enemys[id].create_item_array(30); //创造一个物品队列，掉率30%
    enemys[id].add_item(0, 'decayed_wood', 10, 3, 1); //朽木
    enemys[id].add_item(0, 'viresilver_stem', 1, 1, 1); //绿银草茎

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
    //可掉落物品
    enemys[id].create_item_array(80); //创造一个物品队列，掉率80%
    enemys[id].add_item(0, 'animal_bone', 10, 5, 2); //兽骨
    enemys[id].add_item(0, 'animal_raw_meat', 1, 5, 2); //野兽生肉
    enemys[id].add_item(0, 'animal_viscus', 3, 5, 3); //野兽内脏
    enemys[id].create_item_array(80); //创造一个物品队列，掉率80%
    enemys[id].add_item(1, 'broken_fur', 3, 5, 1); //碎毛皮
    enemys[id].add_item(1, 'ordinary_fur', 3, 2, 1); //普通毛皮
    enemys[id].add_item(1, 'high_quality_fur', 1, 1, 1); //优质毛皮

    id = 'blocking_shrubs'; //拦路灌木
    add_Enemy_object(enemys, id);
    //攻击力，精准，暴击率，暴击伤害，攻速
    enemys[id].init_attack_attr(0, 5, 5, 5, 5); //攻击属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(5, 5, 5, 5); //防御属性初始化
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化
    enemys[id].create_item_array(50); //创造一个物品队列，掉率50%
    enemys[id].add_item(0, 'Oak_woodchip', 10, 1, 1); //橡树木屑
    enemys[id].add_item(0, 'Willow_woodchip', 10, 1, 1); //柳树木屑
    enemys[id].add_item(0, 'decayed_wood', 10, 1, 1); //朽木
    enemys[id].add_item(0, 'viresilver_stem', 1, 1, 1); //绿银草茎
    enemys[id].create_item_array(130); //创造一个物品队列，掉率130%
    enemys[id].add_item(1, 'red_berry', 10, 5, 2); //红浆果
    enemys[id].add_item(1, 'yellow_berry', 10, 5, 2); //黄浆果
    enemys[id].add_item(1, 'black_berry', 10, 5, 2); //黑浆果

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
    //可掉落物品
    enemys[id].create_item_array(200); //创造一个物品队列，掉率80%
    enemys[id].add_item(0, 'animal_bone', 10, 1, 1); //兽骨
    enemys[id].add_item(0, 'animal_raw_meat', 8, 1, 1); //野兽生肉
    enemys[id].add_item(0, 'animal_viscus', 3, 1, 1); //野兽内脏
    enemys[id].create_item_array(100); //创造一个物品队列，掉率80%
    enemys[id].add_item(1, 'broken_fur', 3, 6, 5); //碎毛皮
    enemys[id].add_item(1, 'ordinary_fur', 3, 1, 1); //普通毛皮
    enemys[id].add_item(1, 'high_quality_fur', 3, 1, 1); //优质毛皮

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
    //可掉落物品
    enemys[id].create_item_array(210); //创造一个物品队列，掉率80%
    enemys[id].add_item(0, 'Oak_logs', 10, 1, 1); //橡树原木
    enemys[id].add_item(0, 'Oak_woodchip', 1, 1, 1); //橡树木屑
    enemys[id].add_item(0, 'Willow_logs', 10, 1, 1); //橡树原木
    enemys[id].add_item(0, 'Willow_woodchip', 1, 1, 1); //橡树木屑
}

export { init_Enemy_normal };
