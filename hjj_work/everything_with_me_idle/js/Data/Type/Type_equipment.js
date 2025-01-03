import { add_Type_Array } from './Type_class.js';
//初始化枚举库中与装备相关的内容
function init_Type_equipment(types) {
    //创建新的内容之前建议先用add_Type_Array,重名情况会用console.log输出
    //如果已经有过内容则应该考虑换个名字

    //哪些武器类型属于双手武器
    add_Type_Array(types, 'both_hand');
    types.both_hand = ['battle_axe', 'long_handled', 'hammers', 'gloves', 'bow', 'crossbow', 'spray_gun'];
    //哪些武器类型属于单手武器
    add_Type_Array(types, 'single_hand');
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
    add_Type_Array(types, 'special_rarity');
    types.special_rarity = [
        'damaged', //破损
        'ordinary', //普通
        'excellent', //优良
        'rare', //稀有
        'epic', //史诗
        'legendary', //传说
    ];
    //制式武器可能的稀有度
    //破损，普通，优良，稀有，史诗
    add_Type_Array(types, 'no_special_rarity');
    types.no_special_rarity = ['damaged', 'ordinary', 'excellent', 'rare', 'epic'];
    //装备可能放置的位置
    add_Type_Array(types, 'wearing_position');
    types.wearing_position = ['main_hand', 'head', 'chest', 'legs', 'feet', 'deputy', 'ornament'];
    //装备可能的小类型
    add_Type_Array(types, 'equipment_type');
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
}

export { init_Type_equipment };
