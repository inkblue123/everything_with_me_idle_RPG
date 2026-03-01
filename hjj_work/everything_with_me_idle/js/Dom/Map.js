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
    //地图界面负责承载画图线条的子布局
    var map_canvas = addElement(Map, 'canvas', 'map_canvas', null);
    //地图界面负责移动的子布局
    var map_move_div = addElement(Map, 'div', 'map_move_div', null);

    // var test_map_button = addElement(map_move_div, 'button', 'test_map_button', 'map_button');
    // test_map_button.innerHTML = '测试按钮';

    //     map_move_div.innerHTML = '可拖动的超大内容';
    //     map_move_div.innerHTML = '<div class="grid-background"></div>
    //   <h1>可拖拽和缩放的内容</h1>
    //   <p>使用鼠标拖拽移动，滚轮缩放</p>
    //   <p>按住 Ctrl 键 + 滚轮可更精确缩放</p>
    //   <p>当前位置: <span id="positionText">(0, 0)</span></p>
    //   ';

    //     map_move_div.innerHTML = `
    //   <div class="grid-background"></div>
    //   <h1>可拖拽和缩放的内容</h1>
    //   <p>使用鼠标拖拽移动，滚轮缩放</p>
    //   <p>按住 Ctrl 键 + 滚轮可更精确缩放</p>
    //   <p>当前位置: <span id="positionText">(0, 0)</span></p>
    // `;
}

// 为组件添加触发事件
function set_Map_button() {}

export { create_Map };
