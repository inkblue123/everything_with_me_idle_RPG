import { check_buff_data } from './Buff_class.js';
import { init_normal_buff } from './Buff_normal.js';
import { init_dish_buff } from './Buff_dish.js';

var buffs = new Object();
//初始化buff库
function init_buffs() {
    init_normal_buff(buffs);
    //菜品（烹饪成品）的buff
    init_dish_buff(buffs);

    //数据装完之后做一次自洽检查
    check_buff_data(buffs);
}

export { buffs, init_buffs };
