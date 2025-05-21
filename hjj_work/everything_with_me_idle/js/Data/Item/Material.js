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

//材料的具体类别
const material_type = Object.freeze({
    // 天然材料 raw_MTR
    For_logging: 'for_logging', //来自伐木的物品
    For_fishing: 'for_fishing', //来自钓鱼的物品
    For_mining: 'for_mining', //来自挖矿的物品
    For_harvest: 'for_harvest', //来自采集的物品
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
    {
        let id = 'Oak_logs'; //橡树原木
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_logging'); //材料小分类
        items[id].init_Item_price('coin', 5); //物品价值

        id = 'Oak_woodchip'; //橡树木屑
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_logging'); //材料小分类
        items[id].init_Item_price('coin', 1); //物品价值

        id = 'Willow_logs'; //柳树原木
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_logging'); //材料小分类
        items[id].init_Item_price('coin', 6); //物品价值

        id = 'Willow_woodchip'; //柳树木屑
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_logging'); //材料小分类
        items[id].init_Item_price('coin', 2); //物品价值
    }
    //人工材料
    {
        let id = 'normal_board'; //普通木板
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_making'); //材料小分类
        items[id].init_Item_price('coin', 10); //物品价值

        id = 'Oak_board'; //橡木板
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_making'); //材料小分类
        items[id].init_Item_price('coin', 12); //物品价值

        id = 'Willow_board'; //柳木板
        add_Item_object(items, id, 'material');
        items[id].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        items[id].init_Material('for_making'); //材料小分类
        items[id].init_Item_price('coin', 14); //物品价值
    }
}

export { init_Item_Material };
