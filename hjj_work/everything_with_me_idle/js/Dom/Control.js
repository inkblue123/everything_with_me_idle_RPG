import { crtElement } from '../Function/Dom_function.js';

var Control = crtElement('div', 'control', null, '');

//创建中下，玩家控制界面内的详细组件
{
    //角色所处位置描述
    var Place_desc_div = crtElement('div', 'Place_desc_div', null, '');
    //容纳角色在这里能做的事情的div
    var player_Control_div = crtElement('div', 'player_Control_div', null, '');

    //组件放入角色属性装备界面中
    Control.appendChild(Place_desc_div);
    Control.appendChild(player_Control_div);
}

// 为组件添加触发事件
{
}

export { Control };
