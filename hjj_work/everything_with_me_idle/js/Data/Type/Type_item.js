import { add_Type_Array } from './Type_class.js';
//初始化枚举库中与物品相关的内容
function init_Type_item(types) {
    //物品可能的大类型
    add_Type_Array(types, 'Item_type');
    types['Item_type'] = [
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
}

export { init_Type_item };
