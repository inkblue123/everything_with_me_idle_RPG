import { addElement } from '../../Function/Dom_function.js';

import { texts } from '../../Data/Text/Text.js';
import { player } from '../../Player/Player.js';
import { TOOLTIP_WIDTH } from './Tooltip.js';

function init_map_tip(type, map_obj) {
    if (type == 'event_show') {
        //初始化常规map
        init_normal_map_tip(map_obj);
        // } else if (type == 'map2') {
        //初始化其他的map
        // init_map2_tip(value);
    }
}

//初始化常规map详情
function init_normal_map_tip(map_obj) {
    let Tooltip = document.getElementById('tooltip');
    let label = addElement(Tooltip, 'div', null, 'lable_down');
    label.innerHTML = '此地可以找到感兴趣的事件';
    return true;
}

export { init_map_tip };
