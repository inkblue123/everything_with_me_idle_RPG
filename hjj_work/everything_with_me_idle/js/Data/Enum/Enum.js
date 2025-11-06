import { init_Enum_equipment } from './Enum_equipment.js';
import { init_Enum_item } from './Enum_item.js';
import { init_Enum_attr } from './Enum_attr.js';
// import { init_Enum_material } from './Enum_material.js';
import { init_Enum_type } from './Enum_type.js';
import { init_Enum_game_flag } from './Enum_game_flag.js';
import { init_Enum_skill_exp } from './Enum_skill_exp.js';
import { init_Enum_buff } from './Enum_buff.js';

//创建新的内容之前建议先用add_Enum_Array,重名情况会用console.log输出
//如果已经有过内容则应该考虑换个名字
var enums = new Object();

//初始化枚举库中与物品相关的内容
init_Enum_item(enums);
//初始化枚举库中与装备相关的内容
init_Enum_equipment(enums);
//初始化枚举库中与属性相关的内容
init_Enum_attr(enums);
//初始化枚举库中与材料相关的内容
// init_Enum_material(enums);
//初始化枚举库中与类型相关的内容
init_Enum_type(enums);
//初始化枚举库中与游戏状态参数相关的内容
init_Enum_game_flag(enums);
//初始化枚举库中与技能和经验相关的内容
init_Enum_skill_exp(enums);
//初始化枚举库中与buff相关的内容
init_Enum_buff(enums);

export { enums };
