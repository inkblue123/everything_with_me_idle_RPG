import { add_Item_object } from './Item_class.js';
//物品的大类别枚举
const Item_type = Object.freeze({
    //武器装备 equipment
    Weapon: 'weapon', //武器
    Armor: 'armor', //防具
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
    //可使用物品 consumable
    Food: 'food_CSB', //食品
    Ammo: 'ammo_CSB', //弹药
    Life: 'life_CSB', //生活消耗品
    //材料 material
    Raw: 'raw_MTR', //自然材料
    Process: 'process_MTR', //人工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
});

//材料的具体类别，好像不好用，
const material_type = Object.freeze({
    // 天然材料 raw_MTR
    For_logging: 'for_logging', //来自伐木的物品
    For_fishing: 'for_fishing', //来自钓鱼的物品
    For_mining: 'for_mining', //来自挖矿的物品
    For_harvest: 'for_harvest', //来自采集的物品
    For_monster: 'for_monster', //来自怪物掉落的物品

    //人工材料 process_MTR
    For_cooking: 'for_cooking', //来自烹饪的物品
    For_making: 'for_making', //来自制造的物品
    For_forging: 'for_forging', //来自锻造的物品
    For_alchemy: 'for_alchemy', //来自炼金的物品
    //成品,已经不再参与合成,但是有用的物品
    //大多数物品合成出来就属于其他分类了
    Key: 'key', //钥匙
    Money: 'money', //货币
    //其他物品,纯垃圾桶,但凡有点用处的物品都不应该放到这里
    Other: 'other',
});

//初始化物品数据库中与材料相关的文本
function init_Item_Material(items) {
    //自然材料
    init_Item_raw_MTR(items);
    //人工材料
    init_Item_process_MTR(items);
}
//自然材料
function init_Item_raw_MTR(items) {
    let id = 'Oak_logs'; //橡树原木
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_logging'); //材料小分类
    // items[id].init_Item_price('coin', 5); //物品价值
    id = 'Oak_woodchip'; //橡树木屑
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_logging'); //材料小分类
    // items[id].init_Item_price('coin', 1); //物品价值
    id = 'Willow_logs'; //柳树原木
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_logging'); //材料小分类
    // items[id].init_Item_price('coin', 6); //物品价值
    id = 'Willow_woodchip'; //柳树木屑
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_logging'); //材料小分类
    // items[id].init_Item_price('coin', 2); //物品价值
    id = 'decayed_wood'; //朽木
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类

    id = 'viresilver_stem'; //绿银草茎
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'termite_mushroom'; //鸡枞
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类

    id = 'river_mussel'; //河蚌
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'river_crab'; //河蟹
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'creek_fish'; //溪鱼
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类

    id = 'broken_fur'; //碎毛皮
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'ordinary_fur'; //普通毛皮
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'high_quality_fur'; //优质毛皮
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(20, ['raw_MTR']); //堆叠数量，物品大分类

    id = 'animal_bone'; //兽骨
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'animal_raw_meat'; //野兽生肉
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'animal_viscus'; //野兽内脏
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类

    id = 'hard_rock'; //坚硬岩石
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = 'lowFe_rock'; //含铁岩石
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
    id = '​​highFe_rock'; //富铁矿石
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(50, ['raw_MTR']); //堆叠数量，物品大分类
}
function init_Item_process_MTR(items) {
    let id = 'normal_board'; //普通木板
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_making'); //材料小分类
    // items[id].init_Item_price('coin', 10); //物品价值
    id = 'Oak_board'; //橡木板
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_making'); //材料小分类
    // items[id].init_Item_price('coin', 12); //物品价值
    id = 'Willow_board'; //柳木板
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
    // items[id].init_Material('for_making'); //材料小分类
    // items[id].init_Item_price('coin', 14); //物品价值

    id = 'stitching_leather'; //缝合皮革
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['process_MTR']); //堆叠数量，物品大分类
    id = 'ordinary_leather'; //普通皮革
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['process_MTR']); //堆叠数量，物品大分类
    id = 'hard_and_thick_leather'; //硬厚皮革
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['process_MTR']); //堆叠数量，物品大分类

    id = 'iron_waste'; //铁质废品
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['process_MTR']); //堆叠数量，物品大分类
    id = 'iron_ingot'; //铁锭
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(30, ['process_MTR']); //堆叠数量，物品大分类

    id = 'copper_coin'; //铜币
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(500, ['process_MTR']); //堆叠数量，物品大分类
    id = 'greedy_copper_coin'; //贪婪的铜币
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(1, ['process_MTR']); //堆叠数量，物品大分类
    id = 'sliver_coin'; //银币
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(500, ['process_MTR']); //堆叠数量，物品大分类
    id = 'gold_coin'; //金币
    add_Item_object(items, id, 'material');
    items[id].init_Item_other(500, ['process_MTR']); //堆叠数量，物品大分类
}

export { init_Item_Material };
