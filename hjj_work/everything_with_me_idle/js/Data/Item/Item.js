import { init_Item_Equipment } from './Equipment.js';
import { init_Item_Material } from './Material.js';
import { init_Item_Consumable } from './Consumable.js';

export class Item_obj {}

var items = new Object();
// 材料
init_Item_Material(items);
//武器装备
init_Item_Equipment(items);
//消耗品
init_Item_Consumable(items);

export { items };
