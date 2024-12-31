import { texts } from '../Text/Text.js';
import { Item, add_Material_object } from './Item_class.js';
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

//初始化物品数据库中与材料相关的文本
function init_Item_Material(items) {
    //自然材料
    {
        add_Material_object(items, 'Oak_logs');
        items['Oak_logs'].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        add_Material_object(items, 'Oak_woodchip');
        items['Oak_woodchip'].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类

        add_Material_object(items, 'Willow_logs');
        items['Willow_logs'].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        add_Material_object(items, 'Willow_woodchip');
        items['Willow_woodchip'].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    }
    //人工材料
    {
        add_Material_object(items, 'normal_board');
        items['normal_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        add_Material_object(items, 'Oak_board');
        items['Oak_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        add_Material_object(items, 'Willow_board');
        items['Willow_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
    }
}

export { init_Item_Material };
