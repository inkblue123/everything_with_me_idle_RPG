import { add_Place_object } from './Place_class.js';
import { init_Place_normal } from './Place_normal.js';
import { init_Place_combat } from './Place_combat.js';

var places = new Object();

//初始化地点库

//普通地点初始化
init_Place_normal(places);
//战斗地点初始化
init_Place_combat(places);

export { places };
