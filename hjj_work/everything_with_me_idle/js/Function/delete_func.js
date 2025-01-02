import { get_EQP_data } from './Get_func.js';
import { addElement } from './Dom_function.js';
import { hex2Rgba } from './Function.js';
import { types } from '../Data/Type.js';
import { texts } from '../Data/Text/Text.js';
//清空左下角背包界面的所有元素
function delete_BP_div() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
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
        EQP_div_data[i].style.color = hex2Rgba(texts['ordinary'].rarity_color, 1);
        EQP_div_data[i].style.opacity = 0.5;
    }
}
export { delete_BP_div, delete_equipment_show };
