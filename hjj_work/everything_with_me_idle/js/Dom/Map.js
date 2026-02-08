import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//创建左下的物品回购界面
function create_Map() {
    let Map = crtElement('div', 'map', null, '');
    make_Map_div(Map);
    set_Map_button(Map);
    return Map;
}
//创建右上角，地图界面内的详细组件
function make_Map_div(Map) {
    //脑海 mind MD
    var map_move_div = addElement(Map, 'div', 'map_move_div', null);
    map_move_div.innerHTML = '可拖动的超大内容';
}

// 为组件添加触发事件
function set_Map_button() {}

export { create_Map };
