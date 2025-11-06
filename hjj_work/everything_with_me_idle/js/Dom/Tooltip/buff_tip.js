import { addElement } from '../../Function/Dom_function.js';

import { texts } from '../../Data/Text/Text.js';
import { buffs } from '../../Data/Buff/Buff.js';
import { player } from '../../Player/Player.js';
import { TOOLTIP_WIDTH } from './Tooltip.js';

function init_buff_tip(type, buff_obj) {
    if (type == 'buff') {
        //初始化常规buff
        init_normal_buff_tip(buff_obj);
        // } else if (type == 'buff2') {
        //初始化其他的buff
        // init_buff2_tip(value);
    }
}

//初始化常规buff详情
function init_normal_buff_tip(buff_obj) {
    let Tooltip = document.getElementById('tooltip');
    let buff_id = buff_obj.id;
    if (buffs[buff_id] === undefined) {
        let label = addElement(Tooltip, 'div', null, 'lable_down');
        label.innerHTML = '未定义buff';
        let text = addElement(Tooltip, 'div', null, 'lable_down');
        text.innerHTML = 'buff的id为 : ' + buff_id;
        return false;
    }
    let label = addElement(Tooltip, 'div', null, 'lable_down');
    label.innerHTML = buffs[buff_id].name; //物品名称
    let text = addElement(Tooltip, 'div', null, 'lable_down');
    text.innerHTML = buffs[buff_id].desc; //物品描述
    return true;
}

export { init_buff_tip };
