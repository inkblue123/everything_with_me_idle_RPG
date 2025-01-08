import { add_Enum_Array } from './Enum_class.js';
//初始化枚举库中与物品相关的内容
function init_Enum_item(enums) {
    //物品可能的大类型
    add_Enum_Array(enums, 'Item_type');
    enums['Item_type'] = [
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
    //物品最基础的类型
    add_Enum_Array(enums, 'Item_base_type');
    enums['Item_base_type'] = [
        //装备
        'equipment', //武器装备
        //可使用物品
        'consumable', //可使用物品
        //材料
        'material', //材料
    ];
}

export { init_Enum_item };
