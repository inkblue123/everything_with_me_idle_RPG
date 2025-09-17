import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//设置每种装备类型的属性倾向
function set_equipment_type_attr_Presets(enums) {
    //预设匕首的属性
    add_Enum_Object(enums, 'equipment_type_attr_Presets');
    //匕首
    add_Enum_Object(enums.equipment_type_attr_Presets, 'dagger');
    enums.equipment_type_attr_Presets.dagger = {
        attack: 'less', //攻击较低
        precision: 'normal', //精准正常
        critical_chance: 'more', //暴击率较高
        critical_damage: 'more', //暴击伤害较高
        attack_speed: 'max', //攻击速度最快
    };
    //拳套
    add_Enum_Object(enums.equipment_type_attr_Presets, 'gloves');
    enums.equipment_type_attr_Presets.gloves = {
        attack: 'less', //攻击较低
        precision: 'normal', //精准正常
        critical_chance: 'more', //暴击率较高
        critical_damage: 'more', //暴击伤害较高
        attack_speed: 'max', //攻击速度最快
    };
    //剑
    add_Enum_Object(enums.equipment_type_attr_Presets, 'sword');
    enums.equipment_type_attr_Presets.sword = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'normal', //暴击率正常
        critical_damage: 'normal', //暴击伤害正常
        attack_speed: 'normal', //攻击速度正常
    };
    //棍棒
    add_Enum_Object(enums.equipment_type_attr_Presets, 'sticks');
    enums.equipment_type_attr_Presets.sticks = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'normal', //暴击率正常
        critical_damage: 'normal', //暴击伤害正常
        attack_speed: 'normal', //攻击速度正常
    };
    //战斧
    add_Enum_Object(enums.equipment_type_attr_Presets, 'battle_axe');
    enums.equipment_type_attr_Presets.battle_axe = {
        attack: 'max', //攻击最高
        precision: 'normal', //精准正常
        critical_chance: 'min', //暴击率最低
        critical_damage: 'min', //暴击伤害最低
        attack_speed: 'min', //攻击速度最慢
    };
    //大锤
    add_Enum_Object(enums.equipment_type_attr_Presets, 'hammers');
    enums.equipment_type_attr_Presets.hammers = {
        attack: 'max', //攻击最高
        precision: 'normal', //精准正常
        critical_chance: 'min', //暴击率最低
        critical_damage: 'min', //暴击伤害最低
        attack_speed: 'min', //攻击速度最慢
    };
    //长柄武器
    add_Enum_Object(enums.equipment_type_attr_Presets, 'long_handled');
    enums.equipment_type_attr_Presets.long_handled = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'less', //暴击率较低
        critical_damage: 'less', //暴击伤害较低
        attack_speed: 'less', //攻击速度较低
    };
    //鞭子
    add_Enum_Object(enums.equipment_type_attr_Presets, 'whips');
    enums.equipment_type_attr_Presets.whips = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'less', //暴击率较低
        critical_damage: 'less', //暴击伤害较低
        attack_speed: 'less', //攻击速度较低
    };
    //弓
    add_Enum_Object(enums.equipment_type_attr_Presets, 'bow');
    enums.equipment_type_attr_Presets.bow = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'normal', //暴击率正常
        critical_damage: 'normal', //暴击伤害正常
        attack_speed: 'normal', //攻击速度正常
    };
    //弩
    add_Enum_Object(enums.equipment_type_attr_Presets, 'crossbow');
    enums.equipment_type_attr_Presets.crossbow = {
        attack: 'max', //攻击最高
        precision: 'normal', //精准正常
        critical_chance: 'min', //暴击率最低
        critical_damage: 'min', //暴击伤害最低
        attack_speed: 'min', //攻击速度最慢
    };
    //手弩
    add_Enum_Object(enums.equipment_type_attr_Presets, 'hand_gun');
    enums.equipment_type_attr_Presets.hand_gun = {
        attack: 'less', //攻击较低
        precision: 'normal', //精准正常
        critical_chance: 'more', //暴击率较高
        critical_damage: 'more', //暴击伤害较高
        attack_speed: 'less', //攻击速度较低
    };
    //喷枪
    add_Enum_Object(enums.equipment_type_attr_Presets, 'spray_gun');
    enums.equipment_type_attr_Presets.spray_gun = {
        attack: 'min', //攻击最低
        precision: 'normal', //精准正常
        critical_chance: 'min', //暴击率最低
        critical_damage: 'min', //暴击伤害最低
        attack_speed: 'max', //攻击速度最快
    };
    //回旋武器
    add_Enum_Object(enums.equipment_type_attr_Presets, 'boomerang');
    enums.equipment_type_attr_Presets.boomerang = {
        attack: 'normal', //攻击正常
        precision: 'normal', //精准正常
        critical_chance: 'more', //暴击率较高
        critical_damage: 'more', //暴击伤害较高
        attack_speed: 'min', //攻击速度最低
    };
    //投掷工具
    add_Enum_Object(enums.equipment_type_attr_Presets, 'throw');
    enums.equipment_type_attr_Presets.throw = {
        attack: 'min', //攻击最低
        precision: 'normal', //精准正常
        critical_chance: 'less', //暴击率较高
        critical_damage: 'less', //暴击伤害较高
        attack_speed: 'normal', //攻击速度正常
    };
    // //魔法武器
    // 'putmagic_core', //施法核心
    // 'zhenfa_core', //阵法核心
    // 'magic_core', //法术核心
    // 'spread_core', //扩散核心
    // 'summon_core', //召唤核心
    // //防具
    //头盔
    add_Enum_Object(enums.equipment_type_attr_Presets, 'helmet');
    enums.equipment_type_attr_Presets.helmet = {
        defense: 'normal', //防御正常
        evade: 'more', //闪避较高
        resistance_point: 'less', //抵抗力较低
        move_speed: 'min', //移动速度最低
    };
    //胸甲
    add_Enum_Object(enums.equipment_type_attr_Presets, 'chest_armor');
    enums.equipment_type_attr_Presets.chest_armor = {
        defense: 'more', //防御较高
        evade: 'min', //闪避最低
        resistance_point: 'normal', //抵抗力正常
        move_speed: 'less', //移动速度较低
    };
    //腿甲
    add_Enum_Object(enums.equipment_type_attr_Presets, 'leg_armor');
    enums.equipment_type_attr_Presets.leg_armor = {
        defense: 'less', //防御较低
        evade: 'min', //闪避最低
        resistance_point: 'more', //抵抗力较高
        move_speed: 'normal', //移动速度正常
    };
    //鞋子
    add_Enum_Object(enums.equipment_type_attr_Presets, 'shoes');
    enums.equipment_type_attr_Presets.shoes = {
        defense: 'min', //防御最低
        evade: 'less', //闪避较低
        resistance_point: 'normal', //抵抗力正常
        move_speed: 'more', //移动速度较高
    };
    // 'deputy', //副手装备
    // 'ornament', //饰品
    //盾牌
    add_Enum_Object(enums.equipment_type_attr_Presets, 'shield');
    enums.equipment_type_attr_Presets.shield = {
        defense: 'normal', //防御正常
        evade: 'min', //闪避最低
        resistance_point: 'normal', //抵抗力正常
        move_speed: 'min', //移动速度最低
    };
}
//设置L1的属性预设
function set_L1_attr_Presets(enums) {
    //装备的预设属性
    add_Enum_Object(enums, 'equipment_attr_level');
    enums.equipment_attr_level.L1 = new Object();
    enums.equipment_attr_level.L1.attack = new Object();
    enums.equipment_attr_level.L1.defense = new Object();
    enums.equipment_attr_level.L1.survival = new Object();
    enums.equipment_attr_level.L1.player_base = new Object();
    //L1的近战武器，
    enums.equipment_attr_level.L1.attack.melee = {
        attack: { max: 8, more: 6, normal: 5, less: 3, min: 1 }, //攻击
        precision: { max: 15, more: 13, normal: 10, less: 8, min: 5 }, //精准
        critical_chance: { max: 10, more: 8, normal: 5, less: 3, min: 0 }, //暴击率
        critical_damage: { max: 40, more: 35, normal: 20, less: 10, min: 0 }, //暴击伤害
        attack_speed: { max: 0, more: 1, normal: 2, less: 3, min: 4 }, //攻击速度，数值越小在战斗中优势越大
    };
    //远程武器，一次攻击需要走两个攻速时间，所以会有补偿
    enums.equipment_attr_level.L1.attack.ranged = {
        attack: { max: 15, more: 12, normal: 8, less: 3, min: 1 },
        precision: { max: 15, more: 13, normal: 10, less: 8, min: 5 },
        critical_chance: { max: 10, more: 8, normal: 5, less: 3, min: 0 },
        critical_damage: { max: 15, more: 13, normal: 10, less: 5, min: 0 },
        attack_speed: { max: 0, more: 0, normal: 1, less: 3, min: 5 },
    };
    //魔法武器，一次攻击需要走三个攻速时间
    enums.equipment_attr_level.L1.attack.magic = {
        attack: { max: 24, more: 18, normal: 15, less: 9, min: 3 },
        precision: { max: 15, more: 13, normal: 10, less: 8, min: 5 },
        critical_chance: { max: 10, more: 8, normal: 5, less: 3, min: 0 },
        critical_damage: { max: 15, more: 13, normal: 10, less: 8, min: 5 },
        attack_speed: { max: 0, more: 0, normal: 0, less: 1, min: 2 },
    };
    //L1装备的防御属性预设
    enums.equipment_attr_level.L1.defense = {
        defense: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //防御
        evade: { max: 4, more: 3, normal: 2, less: 1, min: 0 }, //闪避
        resistance_point: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //抵抗力
        move_speed: { max: 4, more: 3, normal: 2, less: 1, min: 0 }, //移动速度
    };
    //L1装备的生存属性预设
    enums.equipment_attr_level.L1.survival = {
        health_max: { max: 25, more: 20, normal: 15, less: 10, min: 5 }, //最大血量上限
        magic_max: { max: 25, more: 20, normal: 15, less: 10, min: 5 }, //最大魔力上限
        energy_max: { max: 25, more: 20, normal: 15, less: 10, min: 5 }, //最大精力上限
    };
    //L1装备的玩家基础属性预设
    enums.equipment_attr_level.L1.player_base = {
        physique: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //体格
        Meridians: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //经脉
        soul: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //魂魄
        power: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //力量
        agile: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //敏捷
        intelligence: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //智力
        technique: { max: 5, more: 4, normal: 3, less: 2, min: 1 }, //技巧
    };
}
//设置每种等级的属性预设
function set_level_attr_Presets(enums) {
    set_L1_attr_Presets(enums);
}
//初始化枚举库中与装备相关的内容
function init_Enum_equipment(enums) {
    //创建新的内容之前建议先用add_Enum_Array,重名情况会用console.log输出
    //如果已经有过内容则应该考虑换个名字
    let id;

    //哪些武器类型属于双手武器
    id = 'both_hand';
    add_Enum_Array(enums, id);
    enums[id] = ['battle_axe', 'long_handled', 'hammers', 'gloves', 'bow', 'crossbow', 'spray_gun'];
    //哪些武器类型属于单手武器
    id = 'single_hand';
    add_Enum_Array(enums, id);
    enums[id] = [
        'dagger', //匕首
        'sword', //剑
        'sticks',
        'whips',
        'hand_gun',
        'throw',
        'boomerang',
        'putmagic_core',
        'zhenfa_core',
        'magic_core',
        'spread_core',
        'summon_core',
    ];
    //特制武器可能的稀有度
    id = 'special_rarity';
    add_Enum_Array(enums, id);
    enums[id] = [
        'damaged', //破损
        'ordinary', //普通
        'excellent', //优良
        'rare', //稀有
        'epic', //史诗
        'legendary', //传说
    ];
    //制式武器可能的稀有度
    //破损，普通，优良，稀有，史诗
    id = 'no_special_rarity';
    add_Enum_Array(enums, id);
    enums[id] = ['damaged', 'ordinary', 'excellent', 'rare', 'epic'];
    //装备可能放置的位置
    id = 'wearing_position';
    add_Enum_Array(enums, id);
    enums[id] = ['main_hand', 'head', 'chest', 'legs', 'feet', 'deputy', 'ornament'];
    //装备大类中，属于“武器”的可能的小类型
    id = 'weapon_equipment_type';
    add_Enum_Array(enums, id);
    enums[id] = [
        // 近战武器
        'dagger', //匕首
        'sword', //剑
        'battle_axe', //战斧
        'long_handled', //长柄武器
        'gloves', //拳套
        'sticks', //棍棒
        'hammers', //大锤
        'whips', //鞭子
        //远程武器
        'bow', //弓
        'crossbow', //弩
        'hand_gun', //手弩
        'spray_gun', //喷枪
        'boomerang', //回旋武器
        'throw', //投掷工具
        //魔法武器
        'putmagic_core', //施法核心
        'zhenfa_core', //阵法核心
        'magic_core', //法术核心
        'spread_core', //扩散核心
        'summon_core', //召唤核心
    ];

    //装备类型及其对应的伤害类型
    id = 'weapon_damage_type';
    add_Enum_Object(enums, id);
    enums[id] = {
        //近战
        dagger: 'melee',
        sword: 'melee',
        battle_axe: 'melee',
        long_handled: 'melee',
        gloves: 'melee',
        sticks: 'melee',
        hammers: 'melee',
        whips: 'melee',
        //远程
        bow: 'ranged',
        crossbow: 'ranged',
        hand_gun: 'ranged',
        spray_gun: 'ranged',
        boomerang: 'ranged',
        throw: 'ranged',
        //魔法
        putmagic_core: 'magic',
        zhenfa_core: 'magic',
        magic_core: 'magic',
        spread_core: 'magic',
        summon_core: 'magic',
    };
    //伤害类型枚举
    id = 'damage_type';
    add_Enum_Array(enums, id);
    enums[id] = ['melee', 'ranged', 'magic'];

    //设置每种装备类型的属性倾向
    set_equipment_type_attr_Presets(enums);
    //设置每种等级的属性预设
    set_level_attr_Presets(enums);
}

export { init_Enum_equipment };
