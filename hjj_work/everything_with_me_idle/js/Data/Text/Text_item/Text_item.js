import { add_text_object } from '../Text_class.js';
import { init_Text_equipment } from './equipment.js';
import { init_Text_material } from './material.js';
import { init_Text_consumable } from './consumable.js';

//初始化文本数据库中物品的文本
function init_Text_item(texts) {
    //装备的文本
    init_Text_equipment(texts);
    //消耗品的文本
    init_Text_consumable(texts);
    //材料的文本
    init_Text_material(texts);
}

export { init_Text_item };
