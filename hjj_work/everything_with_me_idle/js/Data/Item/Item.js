import { init_Item_Equipment } from './Equipment.js';
import { init_Item_Material } from './Material.js';
import { init_Item_Consumable } from './Consumable.js';

var items = new Object();
function init_items() {
    // 材料
    init_Item_Material(items);
    //武器装备
    init_Item_Equipment(items);
    //消耗品
    init_Item_Consumable(items);
}

export { items, init_items };
