import { init_Text_type } from './Text_type.js';
import { init_Text_item } from './Text_item.js';
import { init_Text_place } from './Text_place/Text_place.js';
import { init_Text_enemy } from './Text_enemy.js';
import { init_Text_skill } from './Text_skill/Text_skill.js';
import { init_Text_game_event } from './Text_game_event.js';
import { init_Text_div } from './Text_div.js';
import { init_Text_buff } from './Text_buff.js';

var texts = new Object();

//初始化文本数据库中与类型相关的文本
init_Text_type(texts);
//初始化文本数据库中与物品相关的文本
init_Text_item(texts);
//初始化文本数据库中与地点相关的文本
init_Text_place(texts);
//初始化文本数据库中与敌人相关的文本
init_Text_enemy(texts);
//初始化文本数据库中与技能相关的文本
init_Text_skill(texts);
//初始化文本数据库中与游戏事件相关的文本
init_Text_game_event(texts);
//初始化文本数据库中与界面布局相关的文本
init_Text_div(texts);
//初始化文本数据库中与buff相关的文本
init_Text_buff(texts);

export { texts };
