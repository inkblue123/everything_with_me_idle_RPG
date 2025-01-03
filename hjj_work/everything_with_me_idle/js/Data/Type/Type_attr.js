import { add_Type_Array } from './Type_class.js';
//初始化枚举库中与物品相关的内容
function init_Type_attr(types) {
    //战斗-进攻相关属性
    add_Type_Array(types, 'combat_attack_attr');
    types['combat_attack_attr'] = [
        'attack', //攻击力
        'precision', //精准
        'critical_chance', //暴击率，百分制，具体计算时会除以100
        'critical_damage', //暴击伤害，百分制，具体计算时会除以100
        'attack_speed', //攻击速度
    ];
    //战斗-防御相关属性
    add_Type_Array(types, 'combat_defense_attr');
    types['combat_defense_attr'] = [
        'defense', //防御
        'evade', //闪避
        'resistance_point', //抵抗力
        'move_speed', //移动速度
    ];
    //战斗-生存相关属性
    add_Type_Array(types, 'combat_survival_attr');
    types['combat_survival_attr'] = [
        'health_max', //最大血量上限
        'magic_max', //最大魔力上限
        'energy_max', //最大精力上限
    ];
    //玩家基本属性
    add_Type_Array(types, 'player_base_attr');
    types['player_base_attr'] = [
        'physique', //体格
        'Meridians', //经脉
        'soul', //魂魄
        'power', //力量
        'agile', //敏捷
        'intelligence', //智力
        'technique', //技巧
    ];
    //需要使用百分号表示的属性
    add_Type_Array(types, 'need_per_cent_attr');
    types['need_per_cent_attr'] = [
        'critical_chance', //暴击率
        'critical_damage', //暴击伤害
    ];
}

export { init_Type_attr };
