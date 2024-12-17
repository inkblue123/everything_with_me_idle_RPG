import { texts } from '../Text/Text.js';
import { Item } from './Item_class.js';
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

//材料通用属性
class Material extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);
        this.type.push('material');
    }
}
//初始化物品数据库中与材料相关的文本
function init_Item_Material(items) {
    //自然材料
    {
        items['Oak_logs'] = new Material('Oak_logs');
        items['Oak_logs'].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        items['Oak_woodchip'] = new Material('Oak_woodchip');
        items['Oak_woodchip'].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类

        items['Willow_logs'] = new Material('Willow_logs');
        items['Willow_logs'].init_Item_other(30, ['raw_MTR']); //堆叠数量，物品大分类
        items['Willow_woodchip'] = new Material('Willow_woodchip');
        items['Willow_woodchip'].init_Item_other(300, ['raw_MTR']); //堆叠数量，物品大分类
    }
    //人工材料
    {
        items['normal_board'] = new Material('normal_board');
        items['normal_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        items['Oak_board'] = new Material('Oak_board');
        items['Oak_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
        items['Willow_board'] = new Material('Willow_board');
        items['Willow_board'].init_Item_other(3, ['process_MTR']); //堆叠数量，物品大分类
    }
}

export { init_Item_Material };
