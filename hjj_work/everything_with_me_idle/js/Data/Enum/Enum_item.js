import { add_Enum_Array } from './Enum_class.js';
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
}

export { init_Enum_item };
