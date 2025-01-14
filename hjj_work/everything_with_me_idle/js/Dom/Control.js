import { crtElement, empty_dom, addElement } from '../Function/Dom_function.js';
import { isEmptyObject } from '../Function/Function.js';
import { updata_place } from '../Function/Updata_func.js';
import { places } from '../Data/Place/Place.js';

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

//移动到指定地点，读取新地点库信息，展示到控制界面中
Control.change_place = function (id) {
    empty_dom(Place_desc_div); //清空原本地点描述
    empty_dom(player_Control_div); //清空原本地点的可执行操作

    let new_place = places[id];

    //展示新地点的描述
    Place_desc_div.innerHTML = new_place.desc;

    //展示新地点的可执行操作

    //可以前往其他区域
    if (!isEmptyObject(new_place.connected_place)) {
        for (let next_place of new_place.connected_place) {
            var move_place_button = addElement(player_Control_div, 'div', null, 'player_Control_button'); //血条中，条的外框
            move_place_button.innerHTML = next_place.desc;
            move_place_button.addEventListener('click', function () {
                updata_place(next_place.id);
            });
        }
    }
};
export { Control };
