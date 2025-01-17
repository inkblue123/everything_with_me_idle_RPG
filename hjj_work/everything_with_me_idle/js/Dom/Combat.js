import { crtElement, empty_dom, addElement } from '../Function/Dom_function.js';
import { isEmptyObject } from '../Function/Function.js';
import { updata_place } from '../Function/Updata_func.js';

var Combat = crtElement('div', 'combat', null, '');

//创建右上，战斗界面内的详细组件
{
    //上部75%，主要战斗区域
    var main_combat_div = crtElement('div', 'main_combat', null, '');
    //左侧20%，玩家所处区域
    var MC_play_div = addElement(main_combat_div, 'div', 'MC_play_div', null, '');
    //右侧80%，敌人所处区域
    var MC_enemy_div = addElement(main_combat_div, 'div', 'MC_enemy_div', null, '');
    //下部25%，战斗设置区域
    var combat_option_div = crtElement('div', 'combat_option', null, '');

    //玩家区域中，玩家的各种buff的div
    var MCP_buff_div = addElement(MC_play_div, 'div', 'MCP_buff_div', null);
    var MCP_buff_scroll_box = addElement(MCP_buff_div, 'div', null, 'overflow_y_div');
    var MCP_buff_value = addElement(MCP_buff_scroll_box, 'div', 'MCP_buff_value', 'classification_div');
    // for (let i = 0; i < 20; i++) {
    //     let abuff = addElement(MCP_buff_value, 'div', null, 'buff');
    //     abuff.innerHTML = '啊';
    // }
    //玩家区域中，容纳玩家本人(目前只有名字)的div
    var MCP_player_div = addElement(MC_play_div, 'div', 'MCP_player_div', null);
    var MCP_player_head = addElement(MCP_player_div, 'div', 'MCP_player_head', null);
    //敌人区域中，表示近中远三块区域的div
    let enemy_field = new Object();
    enemy_field['near_enemy_field'] = addElement(MC_enemy_div, 'div', 'near_enemy_field', 'MCE_field_div');
    enemy_field['in_enemy_field'] = addElement(MC_enemy_div, 'div', 'in_enemy_field', 'MCE_field_div');
    enemy_field['far_enemy_field'] = addElement(MC_enemy_div, 'div', 'far_enemy_field', 'MCE_field_div');

    for (let key in enemy_field) {
        let field_div = enemy_field[key];
        addElement(field_div, 'div', null, 'field_up');
        let field_down = addElement(field_div, 'div', null, 'field_down');
        for (let i = 0; i < 9; i++) {
            addElement(field_down, 'div', null, 'enemy');
        }
    }
    let field_div = enemy_field['near_enemy_field'];
    field_div.children[0].innerHTML = '近距离';
    field_div = enemy_field['in_enemy_field'];
    field_div.children[0].innerHTML = '中距离';
    field_div = enemy_field['far_enemy_field'];
    field_div.children[0].innerHTML = '远距离';

    var active_slot_div = addElement(combat_option_div, 'div', 'active_slot_div', null);
    var other_active_div = addElement(combat_option_div, 'div', 'other_active_div', null);

    //组件放入战斗界面中
    Combat.appendChild(main_combat_div);
    Combat.appendChild(combat_option_div);
}

// 为组件添加触发事件
{
}

export { Combat };
