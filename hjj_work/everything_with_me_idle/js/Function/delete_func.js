import { get_EQP_data } from './Get_func.js';
import { addElement } from './Dom_function.js';
import { hex2Rgba } from './Function.js';
import { types } from '../Data/Type.js';
import { texts } from '../Data/Text/Text.js';
//������½Ǳ������������Ԫ��
function delete_BP_div() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //������б�����չʾ����Ʒ
}
//�����������Ͻ�װ��չʾ�����Ԫ��
function delete_equipment_show(EQP_column) {
    if (!EQP_column) {
        //���ûָ��װ���������ȡ��ǰ�����װ����id
        EQP_column = get_EQP_switch();
    }
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_arms_div = EQP_column_div.children[0].children[0]; //����������div
    let EQP_Armor_div = EQP_column_div.children[0].children[1]; //����4�����ߵ�div
    let EQP_deputy_div = EQP_column_div.children[0].children[2]; //���ɸ��ֵ�div
    EQP_arms_div.replaceChildren();
    EQP_Armor_div.replaceChildren();
    EQP_deputy_div.replaceChildren();
    //���´���չʾ��
    addElement(EQP_arms_div, 'div', null, 'EQP_show', '');
    for (let j = 0; j < 4; j++) {
        addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
    }
    addElement(EQP_deputy_div, 'div', null, 'EQP_show', '');
    let EQP_div_data = get_EQP_data(EQP_column);
    //��ʼ��չʾ������
    for (let i in EQP_div_data) {
        EQP_div_data[i].innerHTML = texts[i].wearing_name;
        EQP_div_data[i].style.color = hex2Rgba(texts['ordinary'].rarity_color, 1);
        EQP_div_data[i].style.opacity = 0.5;
    }
}
export { delete_BP_div, delete_equipment_show };
