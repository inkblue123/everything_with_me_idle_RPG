import { add_Buff_object } from './Buff_class.js';

function init_normal_buff(buffs) {
    let id = 'buff1';
    add_Buff_object(buffs, id);
    buffs[id].type = 'get_data_attr'; //持续获得数值属性
    buffs[id].value = {
        data_attr: '', //获得哪种属性
        time: '', //持续时间
        sec_data: '', //每秒恢复
    };
}

export { init_normal_buff };
