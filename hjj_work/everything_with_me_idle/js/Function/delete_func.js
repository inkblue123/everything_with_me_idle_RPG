import { get_EQP_data } from './Get_func.js';
import { addElement } from './Dom_function.js';
import { hex2Rgba } from './Function.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
//清空左下角背包界面的所有元素
function delete_BP_div() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
}
//清空右下角的游戏规划中战斗规划的主动技能规划部分的内容
function delete_ASP_div() {
    let active_value_div = document.getElementById('active_value_div');
    active_value_div.replaceChildren();
}
//重新生成左上角装备展示界面的元素
function delete_equipment_show(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_arms_div = EQP_column_div.children[0].children[0]; //容纳武器的div
    let EQP_Armor_div = EQP_column_div.children[0].children[1]; //容纳4个防具的div
    let EQP_deputy_div = EQP_column_div.children[0].children[2]; //容纳副手的div
    EQP_arms_div.replaceChildren();
    EQP_Armor_div.replaceChildren();
    EQP_deputy_div.replaceChildren();
    //重新创建展示框
    addElement(EQP_arms_div, 'div', null, 'EQP_show', '');
    for (let j = 0; j < 4; j++) {
        addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
    }
    addElement(EQP_deputy_div, 'div', null, 'EQP_show', '');
    let EQP_div_data = get_EQP_data(EQP_column);
    //初始化展示框内容
    for (let i in EQP_div_data) {
        EQP_div_data[i].innerHTML = texts[i].wearing_name;
        EQP_div_data[i].style.color = hex2Rgba(enums['ordinary'].rarity_color, 1);
        EQP_div_data[i].style.opacity = 0.5;
    }
}
//重新生成右上战斗界面的玩家主动技能部分
function delete_player_active_div() {
    let player_active_div = document.getElementById('player_active_div');
    player_active_div.replaceChildren(); //清空现有主动技能槽内容
    for (let i = 0; i < 9; i++) {
        var player_active = addElement(player_active_div, 'div', null, 'player_active');
        addElement(player_active, 'div', null, 'player_active_text');
    }
}
//重新生成右下游戏规划界面中战斗规划界面的主动技能展示部分
function delete_active_show_div() {
    let active_show_div = document.getElementById('active_show_div');
    active_show_div.replaceChildren(); //清空现有内容
    for (let i = 0; i < 9; i++) {
        addElement(active_show_div, 'div', null, 'active_show_value');
    }
}

export { delete_BP_div, delete_ASP_div, delete_equipment_show, delete_player_active_div, delete_active_show_div };
