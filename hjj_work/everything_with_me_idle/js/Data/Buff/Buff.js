import { init_normal_buff } from './Buff_normal.js';

var buffs = new Object();
//初始化敌人库
function init_buffs() {
    init_normal_buff(buffs);
}

export { buffs, init_buffs };
