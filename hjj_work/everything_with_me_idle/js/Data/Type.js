var types = new Object();
//技能的类别枚举

class Type {
    constructor() {
        this.both_hand; //哪些武器类型属于双手武器
        this.single_hand; //哪些武器类型属于单手武器
    }
}
//物品可能的大类型
types.Item_type = [
    //装备
    'equipment', //武器装备大类
    'weapon', //武器
    'armor', //防具
    'deputy', //副手
    'ornament', //饰品
    //可使用物品
    'consumable', //可使用物品大类
    'food_CSB', //食品
    'ammo_CSB', //弹药
    'life_CSB', //生活消耗品
    //材料
    'material', //材料大类
    'raw_MTR', //自然材料
    'process_MTR', //人工材料
    'finish_MTR', //成品
    'other_MTR', //其他物品
];

//哪些武器类型属于双手武器
types.both_hand = ['battle_axe', 'long_handled', 'hammers', 'gloves', 'bow', 'crossbow', 'spray_gun'];
//哪些武器类型属于单手武器
types.single_hand = [
    'dagger',
    'sword',
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
//破损，普通，优良，稀有，史诗，传说
types.special_rarity = ['damaged', 'ordinary', 'excellent', 'rare', 'epic', 'legendary'];
//制式武器可能的稀有度
//破损，普通，优良，稀有，史诗
types.no_special_rarity = ['damaged', 'ordinary', 'excellent', 'rare', 'epic'];
//装备可能放置的位置
types.wearing_position = ['main_hand', 'head', 'chest', 'legs', 'feet', 'deputy', 'ornament'];
//装备可能的小类型
types.equipment_type = [
    'empty_hands', //空手
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
    //防具
    'helmet', //头盔
    'chest_armor', //胸甲
    'leg_armor', //腿甲
    'shoes', //鞋子
    'deputy', //副手装备
    'ornament', //饰品
];
//战斗-进攻相关属性
types.combat_attack_attr = [
    'attack', //攻击力
    'precision', //精准
    'critical_chance', //暴击率，百分制，具体计算时会除以100
    'critical_damage', //暴击伤害，百分制，具体计算时会除以100
    'attack_speed', //攻击速度
];
//战斗-防御相关属性
types.combat_defense_attr = [
    'defense', //防御
    'evade', //闪避
    'resistance_point', //抵抗力
    'move_speed', //移动速度
];
//战斗-生存相关属性
types.combat_survival_attr = [
    'health_max', //最大血量上限
    'magic_max', //最大魔力上限
    'energy_max', //最大精力上限
];
//玩家基本属性
types.player_base_attr = [
    'physique', //体格
    'Meridians', //经脉
    'soul', //魂魄
    'power', //力量
    'agile', //敏捷
    'intelligence', //智力
    'technique', //技巧
];

export { types };
