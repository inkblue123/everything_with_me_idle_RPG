import { init_Enemy_normal } from './Enemy_normal.js';
import { init_Enemy_tree } from './Enemy_tree.js';
import { init_Enemy_fish } from './Enemy_fish.js';

var enemys = new Object();

//初始化普通敌人库
init_Enemy_normal(enemys);
//初始化伐木技能中的敌人
init_Enemy_tree(enemys);
//初始化钓鱼技能中的敌人
init_Enemy_fish(enemys);

export { enemys };
