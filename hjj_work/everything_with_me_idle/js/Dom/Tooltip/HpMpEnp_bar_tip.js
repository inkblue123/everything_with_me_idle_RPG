import { addElement } from '../../Function/Dom_function.js';

import { texts } from '../../Data/Text/Text.js';
import { player } from '../../Player/Player.js';
import { TOOLTIP_WIDTH } from './Tooltip.js';


function init_Hp_Mp_Enp_tip(type, value) {
    if (type == 'HP_bar') {
        //初始化血条详情
        // init_HP_bar_tip(value);
    } else if (type == 'MP_bar') {
        //初始化魔力条详情
        // init_MP_bar_tip(value);
    } else if (type == 'ENP_bar') {
        //初始化精力条详情
        init_ENP_bar_tip(value);
    }
}

//初始化血条详情
function init_HP_bar_tip(value) {
    let Tooltip = document.getElementById('tooltip');
}
//初始化魔力条详情
function init_MP_bar_tip(value) {
    let Tooltip = document.getElementById('tooltip');
}
//初始化精力条详情
function init_ENP_bar_tip(value) {
    let Tooltip = document.getElementById('tooltip');
    let P_attr = player.get_player_attributes();
    let surface_energy_point = Math.floor(P_attr.get_data_attr('surface_energy_point')); //表层精力当前值
    let deep_energy_point = Math.floor(P_attr.get_data_attr('deep_energy_point')); //深层精力当前值
    let deep_energy_max = Math.floor(P_attr.get_data_attr('deep_energy_max')); //深层精力最大值
    let surface_energy_recover = P_attr.get_data_attr('surface_energy_recover'); //表层精力恢复速度
    let deep_energy_recover = P_attr.get_data_attr('deep_energy_recover'); //深层精力恢复速度
    let deep_energy_use_ratio = Math.floor(P_attr.get_data_attr('deep_energy_use_ratio')); //深层精力消耗比例
    let surface_energy_ratio = Math.floor(P_attr.get_data_attr('surface_energy_ratio')); //深层精力消耗比例

    let tip_surface_ENP_num = addElement(Tooltip, 'div', 'tip_surface_ENP_num', 'TLV_left');
    tip_surface_ENP_num.innerHTML = '表层精力值：' + surface_energy_point;
    let tip_surface_ENP_bar = addElement(Tooltip, 'div', 'tip_surface_ENP_bar', null);
    let tip_deep_ENP_num = addElement(Tooltip, 'div', 'tip_deep_ENP_num', 'TLV_left');
    tip_deep_ENP_num.innerHTML = '深层精力值：' + deep_energy_point;
    let tip_deep_ENP_bar = addElement(Tooltip, 'div', 'tip_deep_ENP_bar', null);
    let tip_ENMax_num = addElement(Tooltip, 'div', 'tip_ENMax_num', 'TLV_left');
    tip_ENMax_num.innerHTML = '深层精力上限：' + deep_energy_max;
    let tip_ENMax_bar = addElement(Tooltip, 'div', 'tip_ENMax_bar', null);

    let tip_ENP_text = addElement(Tooltip, 'div', 'tip_ENP_text', 'TLV_left');
    let ch = '';
    ch = ch + '表层精力值自然恢复最大为深层精力值的100%<br>';
    ch = ch + '表层精力恢复速度：' + surface_energy_recover + '/s<br>';
    ch = ch + '深层精力恢复速度：' + deep_energy_recover + '/s<br>';
    ch = ch + '精力消耗比例：每自然恢复' + deep_energy_use_ratio + '表层精力消耗1深层精力<br>';
    ch = ch + '当前表层精力占精力上限的比例：' + surface_energy_ratio + '%';
    if (surface_energy_ratio < 25) {
        ch = ch + '，处于极度疲劳<br>';
        ch = ch + '（极度疲劳：全属性降低50%）<br>';
    } else if (surface_energy_ratio >= 25 && surface_energy_ratio < 50) {
        ch = ch + '，处于疲劳<br>';
        ch = ch + '（疲劳：全生活属性降低20%）<br>';
    } else if (surface_energy_ratio >= 100.5) {
        ch = ch + '，处于精力充沛<br>';
        ch = ch + '（精力充沛：全属性增加20%）<br>';
    }
    tip_ENP_text.innerHTML = ch;

    P_attr.updata_HP_MP_ENP_div();
}

export { init_Hp_Mp_Enp_tip };
