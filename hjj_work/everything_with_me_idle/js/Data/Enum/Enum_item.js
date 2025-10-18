import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与物品相关的内容
function init_Enum_item(enums) {
    let id;
    //物品可能的大类
    id = 'Item_main_type';
    add_Enum_Array(enums, id);
    enums[id] = [
        'equipment', //武器装备
        'consumable', //可使用物品
        'material', //材料
    ];
    //每个大类中具体有哪些小类的枚举在Data.js中初始化
    //物品可能的所有小类
    id = 'Item_secon_type';
    add_Enum_Array(enums, id);

    //装备大类中可能的小类
    id = 'Equipment_secon_type';
    add_Enum_Array(enums, id);
    //消耗品大类中可能的小类
    id = 'Consumable_secon_type';
    add_Enum_Array(enums, id);
    //材料大类中可能的小类
    id = 'Material_secon_type';
    add_Enum_Array(enums, id);

    //所有小类的排序
    id = 'secon_type_sort';
    add_Enum_Object(enums, id);
    enums[id] = {
        //装备大类
        //近战武器
        dagger: 1, //匕首
        sword: 2, //剑
        battle_axe: 3, //战斧
        long_handled: 4, //长柄武器
        gloves: 10, //拳套
        sticks: 11, //棍棒
        hammers: 12, //大锤
        whips: 13, //鞭子
        //远程武器
        bow: 20, //弓
        crossbow: 21, //弩炮
        hand_gun: 22, //手弩
        spray_gun: 23, //喷枪
        boomerang: 24, //回旋武器
        throw: 25, //投掷工具
        //魔法武器
        putmagic_core: 30, //施法核心
        zhenfa_core: 31, //阵法核心
        magic_core: 32, //法术核心
        spread_core: 33, //扩散核心
        summon_core: 34, //召唤核心
        //防具
        helmet: 40, //头盔
        chest_armor: 41, //胸甲
        leg_armor: 42, //腿甲
        shoes: 43, //鞋子
        //副手
        shield: 50, //盾牌
        //饰品
        ornament: 60, //饰品
        //工具
        logging_tool: 70, //伐木工具
        fishing_tool: 71, //钓鱼工具
        mining_tool: 72, //挖矿工具
        foraging_tool: 73, //采集工具
        diving_tool: 74, //潜水工具
        archaeology_tool: 75, //考古工具
        exploration_tool: 76, //探索工具

        //消耗品大类
        ingredient: 101, //食材
        food: 102, //食品
        dry_product: 103, //干制品
        crude_drug: 110, //药材
        potion: 111, //药水
        elixir: 112, //丹药
        arrow: 120, //箭矢
        bolt: 121, //弩箭
        spray_gun_bullet: 122, //喷枪弹药
        throwable: 123, //可投掷弹药
        magic_core_bullet: 130, //法术核心弹药
        bait: 140, //鱼饵
        treasure_chest: 150, //宝箱
        ordinary_coin: 160, //钱币

        //材料大类
        ordinary_wood: 201, //凡木
        spirit_wood: 202, //灵木
        spirit_grass: 210, //灵草
        ordinary_mushroom: 220, //普通蘑菇
        rare_mushroom: 221, //稀有蘑菇
        aquatic: 230, //水产
        fur: 240, //毛皮
        leather: 241, //皮革
        bone: 242, //骨头
        raw_meat: 243, //生肉
        rock: 250, //岩石
        wood_parts: 260, //木制零件
        iron_parts: 261, //铁质零件
        refined_seasoning: 270, //精制调味料
        elixir_essence: 271, //丹药精华
    };

    //购买出售物品时，这些小类中的物品不会涨价和贬值
    id = 'preserve_value_secon_type';
    add_Enum_Array(enums, id);
    enums[id] = [
        'ordinary_coin', //凡间钱币
    ];

    //采集时提到的任意木头是指哪些小类
    id = 'FAG_chance_all_wood';
    add_Enum_Array(enums, id);
    enums[id] = [
        'ordinary_wood', //凡木
        'spirit_wood', //灵木
    ];
    //采集时提到的任意草是指哪些小类
    id = 'FAG_chance_all_grass';
    add_Enum_Array(enums, id);
    enums[id] = [
        'spirit_grass', //灵草
    ];
    //采集时提到的任意蘑菇是指哪些小类
    id = 'FAG_chance_all_mushroom';
    add_Enum_Array(enums, id);
    enums[id] = [
        'ordinary_mushroom', //普通蘑菇
        'rare_mushroom', //稀有蘑菇
    ];
}

export { init_Enum_item };
