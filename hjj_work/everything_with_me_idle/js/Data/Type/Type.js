import { init_Type_equipment } from './Type_equipment.js';
import { init_Type_item } from './Type_item.js';
import { init_Type_attr } from './Type_attr.js';
import { init_Type_material } from './Type_material.js';

//创建新的内容之前建议先用add_Type_Array,重名情况会用console.log输出
//如果已经有过内容则应该考虑换个名字
var types = new Object();

//初始化枚举库中与物品相关的内容
init_Type_item(types);
//初始化枚举库中与装备相关的内容
init_Type_equipment(types);
//初始化枚举库中与属性相关的内容
init_Type_attr(types);
//初始化枚举库中与材料相关的内容
init_Type_material(types);

export { types };
