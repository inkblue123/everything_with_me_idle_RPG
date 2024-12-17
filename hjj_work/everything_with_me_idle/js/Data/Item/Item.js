import { texts } from '../Text/Text.js';
import { init_Item_Equipment } from './Equipment.js';
import { init_Item_Material } from './Material.js';
import { init_Item_Consumable } from './Consumable.js';

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

var items = new Object();
//用物品的名称做唯一id，小驼峰命名
// 材料
{
    init_Item_Material(items);
}
//武器装备
{
    init_Item_Equipment(items);
}
//消耗品
{
    init_Item_Consumable(items);
}
export { items };
