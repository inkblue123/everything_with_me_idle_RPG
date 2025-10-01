import { crtElement, addElement } from '../Function/Dom_function.js';
import { is_Empty_Object } from '../Function/Function.js';

//创建战斗时，中上和右上的战斗界面
function create_Combat() {
    var Combat = crtElement('div', 'combat', null, '');
    make_Combat_div(Combat);
    set_Combat_button(Combat);
    return Combat;
}

//创建右上，战斗界面内的详细组件
function make_Combat_div(Combat) {
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
    var MCP_buff_value = addElement(MCP_buff_scroll_box, 'div', 'MCP_buff_value', 'in_overflow_div');
    // for (let i = 0; i < 20; i++) {
    //     let abuff = addElement(MCP_buff_value, 'div', null, 'buff');
    //     abuff.innerHTML = '啊';
    // }
    //玩家区域中，容纳玩家本人(目前只有名字)的div
    var MCP_player_div = addElement(MC_play_div, 'div', 'MCP_player_div', null);
    var MCP_player_head = addElement(MCP_player_div, 'div', 'MCP_player_head', null);
    MCP_player_head.innerHTML = '玩家';
    //敌人区域中，表示近中远三块区域的div
    let enemy_field = new Object();
    enemy_field['little_distance'] = addElement(MC_enemy_div, 'div', 'little_distance', 'MCE_field_div');
    enemy_field['middle_distance'] = addElement(MC_enemy_div, 'div', 'middle_distance', 'MCE_field_div');
    enemy_field['remote_distance'] = addElement(MC_enemy_div, 'div', 'remote_distance', 'MCE_field_div');
    //给三块区域添加描述框和敌人所处格子
    for (let key in enemy_field) {
        let field_div = enemy_field[key];
        addElement(field_div, 'div', null, 'field_up');
        let field_down = addElement(field_div, 'div', null, 'field_down');
        for (let i = 0; i < 9; i++) {
            let enemy_show = addElement(field_down, 'div', null, 'enemy_show');
            //敌人血条
            let enemy_HP_bar = addElement(enemy_show, 'div', null, 'enemy_HP_bar', 'none');
            let enemy_HP_frame = addElement(enemy_HP_bar, 'div', null, 'enemy_HP_frame');
            let enemy_HP_current = addElement(enemy_HP_frame, 'div', null, 'enemy_HP_current');
            //敌人攻击进度条
            let enemy_attr_bar = addElement(enemy_show, 'div', null, 'enemy_attr_bar', 'none');
            let enemy_attr_frame = addElement(enemy_attr_bar, 'div', null, 'enemy_attr_frame');
            let enemy_attr_current = addElement(enemy_attr_frame, 'div', null, 'enemy_attr_current');
            //敌人头像
            let enemy_head = addElement(enemy_show, 'div', null, 'enemy_head');
        }
    }
    let field_div = enemy_field['little_distance'];
    field_div.children[0].innerHTML = '近距离';
    field_div = enemy_field['middle_distance'];
    field_div.children[0].innerHTML = '中距离';
    field_div = enemy_field['remote_distance'];
    field_div.children[0].innerHTML = '远距离';
    //展示玩家的主动技能槽的部分
    var active_slot_div = addElement(combat_option_div, 'div', 'active_slot_div', null);
    //表示主动技能运行到哪里的进度条
    var active_time_bar_div = addElement(active_slot_div, 'div', 'active_time_bar_div', 'page_flex', '');
    for (let i = 0; i < 9; i++) {
        var active_time_bar = addElement(active_time_bar_div, 'div', null, 'active_time_bar', '');
        var active_time_frame = addElement(active_time_bar, 'div', null, 'active_time_frame'); //时间进度条外框
        var active_time_current = addElement(active_time_frame, 'div', null, 'active_time_current'); //时间进度条中央的色块
    }
    var un_use_active_time_frame = addElement(active_time_bar_div, 'div', 'un_use_active_time_frame', null); //没有使用的时间进度条外框
    //具体容纳主动技能的div
    var player_active_div = addElement(active_slot_div, 'div', 'player_active_div', null);
    for (let i = 0; i < 9; i++) {
        var player_active = addElement(player_active_div, 'div', null, 'player_active');
        addElement(player_active, 'div', null, 'player_active_text');
    }
    //恢复和撤离的div
    var other_active_div = addElement(combat_option_div, 'div', 'other_active_div', null);

    //恢复
    var recovery_active = addElement(other_active_div, 'div', null, 'player_active');
    //撤离
    var evacuate_active = addElement(other_active_div, 'div', null, 'player_active');
    //组件放入战斗界面中
    Combat.appendChild(main_combat_div);
    Combat.appendChild(combat_option_div);
}

// 为组件添加触发事件
function set_Combat_button(Combat) {}

export { create_Combat };
