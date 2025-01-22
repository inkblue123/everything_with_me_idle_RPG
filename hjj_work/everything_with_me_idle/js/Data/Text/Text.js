import { init_Text_type } from './Text_type.js';
import { init_Text_item } from './Text_item.js';
import { init_Text_place } from './Text_place.js';
import { Text } from './Text_class.js';

var texts = new Object();

//初始化文本数据库中与类型相关的文本
init_Text_type(texts);
//初始化文本数据库中与物品相关的文本
init_Text_item(texts);
//初始化文本数据库中与地点相关的文本
init_Text_place(texts);

export { texts };
