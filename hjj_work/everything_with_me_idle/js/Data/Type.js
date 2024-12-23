var types = new Object();
//技能的类别枚举

class Type {
    constructor() {
        this.both_hand; //哪些武器类型属于双手武器
        this.single_hand; //哪些武器类型属于单手武器
    }
}
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
types.wearing_position = ['main_hand', 'head', 'chest', 'legs', 'feet', 'deputy'];

export { types };
