import { add_Enum_Array } from './Enum_class.js';
//初始化枚举库中与属性相关的内容
function init_Enum_attr(enums) {
    let id;
    //左上属性展示-战斗-进攻相关属性
    id = 'show_combat_attack_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'true_attack', //攻击力
        'true_precision', //精准
        'true_critical_chance', //暴击率，百分制，具体计算时会除以100
        'true_critical_damage', //暴击伤害，百分制，具体计算时会除以100
        'true_attack_interval', //攻击间隔
    ];
    //战斗-进攻相关属性
    id = 'combat_attack_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'attack', //攻击力
        'precision', //精准
        'critical_chance', //暴击率，百分制，具体计算时会除以100
        'critical_damage', //暴击伤害，百分制，具体计算时会除以100
        'attack_speed', //攻击速度加成
        'attack_interval', //攻击间隔
    ];
    //战斗-防御相关属性
    id = 'show_combat_defense_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'true_defense', //防御
        'true_evade', //闪避
        'true_resistance_point', //抵抗力
        'true_move_speed', //移动速度
    ];
    //战斗-防御相关属性
    id = 'combat_defense_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'defense', //防御
        'evade', //闪避
        'resistance_point', //抵抗力
        'move_speed', //移动速度
    ];
    //战斗-生存相关属性
    id = 'combat_survival_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'health_max', //最大血量上限
        'magic_max', //最大魔力上限
        'energy_max', //最大精力上限
    ];
    //精力相关属性
    id = 'energy_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'surface_energy_point', //表层精力当前值
        'surface_energy_recover', //表层精力恢复速度
        'surface_energy_ratio', //表层精力拥有量比例
        'deep_energy_point', //深层精力当前值
        'deep_energy_max', //深层精力最大值
        'deep_energy_use_ratio', //深层精力消耗比例
        'deep_energy_recover', //深层精力恢复速度
    ];
    //玩家基本属性
    id = 'player_base_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'physique', //体格
        'Meridians', //经脉
        'soul', //魂魄
        'power', //力量
        'agile', //敏捷
        'intelligence', //智力
        'technique', //技巧
    ];
    //需要使用百分号表示的属性
    id = 'need_per_cent_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'critical_chance', //暴击率
        'true_critical_chance', //暴击率
        'critical_damage', //暴击伤害
        'true_critical_damage', //暴击伤害
        'attack_speed', //攻击速度
        'FAG_item_add_1_chance', //采集物品数+1概率

        //前缀是暴击率、暴击伤害、伤害加成、攻速加成、伐木暴率、伐木暴伤、伐木伤害、伐木攻速、挖矿暴率、挖矿暴伤、挖矿伤害、挖矿攻速
        //后缀是所有武器工具子类和空手
        //这样的属性已经在Data.js中自动定义了，这里可以不需要重复定义
        // 'LGI_damage_emptyhanded', //空手伐木伤害
        // 'LGI_damage_battle_axe', //战斧伐木伤害
        // 'LGI_damage_logging_tool', //伐木工具伐木伤害
        // 'LGI_damage_gloves', //拳套伐木伤害
        // 'LGI_speed_battle_axe', //战斧伐木速度

        //前缀是采集概率
        //后缀是所有物品子类和一些子类集合
        //这样的属性已经在Data.js中自动定义了，这里可以不需要重复定义
        // 'FAG_chance_all_grass', //采集时获得任意草的概率
    ];
    //需要使用秒表示的属性
    id = 'need_second_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'attack_interval', //攻击间隔
        'true_attack_interval', //攻击间隔
    ];

    //在展示属性时会放入表格中显示的常用属性
    id = 'normal_attr';
    add_Enum_Array(enums, id);
    enums[id] = [
        'attack', //攻击力
        'precision', //精准
        'critical_chance', //暴击率，百分制，具体计算时会除以100
        'critical_damage', //暴击伤害，百分制，具体计算时会除以100
        'attack_speed', //攻击速度
        'attack_interval', //攻击间隔
        'defense', //防御
        'evade', //闪避
        'resistance_point', //抵抗力
        'move_speed', //移动速度
        'health_max', //最大血量上限
        'magic_max', //最大魔力上限
        'energy_max', //最大精力上限
        'physique', //体格
        'Meridians', //经脉
        'soul', //魂魄
        'power', //力量
        'agile', //敏捷
        'intelligence', //智力
        'technique', //技巧
    ];
}

export { init_Enum_attr };
