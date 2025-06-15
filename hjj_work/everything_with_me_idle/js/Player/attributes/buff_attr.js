import { buffs } from '../../Data/Buff/Buff.js';

export class Buff_attr_manage {
    constructor() {
        //所有加成计算完毕之后的最终属性
        this.end_buff_attr = new Object();
        //所有加成计算完毕之后的最终buff
    }
    init() {}
    //根据id让玩家获得一个buff
    set_buff_attr(value) {
        // return this.buff_attr.set_buff_attr(id, value);
    }
    //获取最终属性
    get_end_buff_attr() {
        return this.end_buff_attr;
    }
}
