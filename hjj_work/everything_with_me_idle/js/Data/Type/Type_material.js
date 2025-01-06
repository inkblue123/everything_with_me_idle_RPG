import { add_Type_Array } from './Type_class.js';
//初始化枚举库中与物品相关的内容
function init_Type_material(types) {
    //仅仅属于材料的小类型
    add_Type_Array(types, 'material_type');
    types.material_type = [
        // 天然材料 raw_MTR
        'for_logging', //来自伐木的物品
        'for_fishing', //来自钓鱼的物品
        'for_mining', //来自挖矿的物品
        'for_harvest', //来自采集的物品
        //人工材料 process_MTR
        'for_cooking', //来自烹饪的物品
        'for_making', //来自制造的物品
        'for_forging', //来自锻造的物品
        'for_alchemy', //来自炼金的物品
        //成品 finish_MTR 已经不再参与合成,但是有用的物品
        'key', //钥匙
        'money', //货币
        //其他物品 other_MTR
        'other',
    ];
    // types.material_type = [
    //     'raw_MTR', //自然材料
    //     'process_MTR', //人工材料
    //     'finish_MTR', //成品
    //     'other_MTR', //其他物品
    // ];
}

export { init_Type_material };
