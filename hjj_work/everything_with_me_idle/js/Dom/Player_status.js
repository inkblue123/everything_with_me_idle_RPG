import { crtElement, addElement, addElement_radio, add_click_Equipment_worn_remove } from '../Function/Dom_function.js';
import { change_PA, show_active_EQP } from '../Function/show_func.js';
import { updata_player_name, updata_player_EQP } from '../Function/Updata_func.js';

var player_status = crtElement('div', 'player_status', null, '', '#000000');

//创建左上角，角色装备属性展示界面内的详细组件
{
    //展示角色血条和名称的布局;
    var bar_div = crtElement('div', 'bar_div', 'page_columns_1', '');
    //角色名
    var Player_name_div = addElement(bar_div, 'div', 'Player_name_div', 'page_columns_1'); //血条中，条的外框
    var Player_name = addElement(Player_name_div, 'input', 'Player_name', null); //血条中，条的外框
    Player_name.type = 'text';
    Player_name.value = '玩家';
    //血条组件
    var HP_bar = addElement(bar_div, 'div', 'HP_bar', null, '');
    var HP_frame = addElement(HP_bar, 'div', 'HP_frame', null); //血条中，条的外框
    var HP_current = addElement(HP_frame, 'div', 'HP_current', null); //血条中央，长度随当前血量变化的色块
    var HP_number = addElement(HP_bar, 'div', 'HP_number', null); //血条上显示的数字，表示当前血量具体数值
    //蓝条组件
    var MP_bar = addElement(bar_div, 'div', 'MP_bar', null, '');
    var MP_frame = addElement(MP_bar, 'div', 'MP_frame', null); //条的外框
    var MP_current = addElement(MP_frame, 'div', 'MP_current', null); //长度随当前蓝量变化的色块
    var MP_number = addElement(MP_bar, 'div', 'MP_number', null); //显示的数字，表示当前蓝量具体数值
    //精力组件
    var ENP_bar = addElement(bar_div, 'div', 'ENP_bar', null, '');
    var ENP_frame = addElement(ENP_bar, 'div', 'ENP_frame', null); //条的外框
    var ENP_current = addElement(ENP_frame, 'div', 'ENP_current', null); //长度随当前精力变化的色块
    var ENP_number = addElement(ENP_bar, 'div', 'ENP_number', null); //显示的数字，表示当前精力具体数值

    //容纳玩家属性+玩家装备的布局
    var attr_equip_div = crtElement('div', 'attr_equip_div', 'page_columns_1', '');
    //属性展示组件
    var attribute_show = addElement(attr_equip_div, 'div', 'attribute_show', 'page_columns_11', '');
    var combat_attribute_show = addElement(attribute_show, 'div', 'combat_attribute_show', 'page_columns_111');
    var Player_attribute_show = addElement(attribute_show, 'div', 'Player_attribute_show', 'page_columns_111');
    for (let i = 0; i < 9; i++) {
        addElement(combat_attribute_show, 'div', null, 'state_show'); //条的外框
        addElement(Player_attribute_show, 'div', null, 'state_show'); //条的外框
    }
    //角色装备栏
    var equipment_show = addElement(attr_equip_div, 'div', 'equipment_show', 'page_columns_1', 'none');
    for (let i = 0; i < 4; i++) {
        var EQP_i = addElement(equipment_show, 'div', `EQP_column_${i + 1}`, 'page_columns_11', '');
        var EQP_left = addElement(EQP_i, 'div', null, 'page_columns_111', ''); //装备栏左侧，角色的4个防具和主副手
        var EQP_arms_div = addElement(EQP_left, 'div', null, 'EQP_arms_div', '');
        var EQP_Armor_div = addElement(EQP_left, 'div', null, 'EQP_Armor_div', '');
        var EQP_deputy_div = addElement(EQP_left, 'div', null, 'EQP_deputy_div', '');
        addElement(EQP_arms_div, 'div', null, 'EQP_show', '');
        for (let j = 0; j < 4; j++) {
            addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
        }
        var test = addElement(EQP_deputy_div, 'div', null, 'EQP_show', '');
        var EQP_right = addElement(EQP_i, 'div', null, 'page_columns_11', ''); //装备栏右侧，饰品和饰品槽
    }

    //切换属性和装备栏的按钮
    var Player_attr_switch_div = crtElement('div', 'Player_attr_switch_div', 'page_columns_12', '');
    var PA_switch_div = addElement(Player_attr_switch_div, 'div', 'PA_switch_div', 'page_columns_1');
    var PA_switch_button = addElement(PA_switch_div, 'button', null, 'PA_switch_button');
    PA_switch_button.innerHTML = `属性\n展示`;
    var EQP_switch_div = addElement(Player_attr_switch_div, 'div', 'EQP_switch_div', 'page_auto_columns');
    for (let i = 0; i < 4; i++) {
        var EQP_switch_radio_div = addElement(EQP_switch_div, 'div', null, 'radio_div EQP_switch_radio_div');
        addElement_radio(EQP_switch_radio_div, `EQP_${i + 1}`, 'EQP_switch', `EQP_column_${i + 1}`, `装备栏\n${i + 1}`);
    }
    //默认激活第一个装备栏
    EQP_switch_div.children[0].children[0].checked = true;

    //组件放入角色属性装备界面中
    player_status.appendChild(bar_div);
    player_status.appendChild(attr_equip_div);
    player_status.appendChild(Player_attr_switch_div);
}

// 为组件添加触发事件
{
    //角色名文本框，实时修改角色名称
    Player_name.addEventListener('change', updata_player_name);
    //角色属性界面切换开关
    PA_switch_button.onclick = function () {
        change_PA();
    };
    //角色装备栏切换开关
    const radios = player_status.querySelectorAll('input[type="radio"][name="EQP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //显示当前激活的装备栏界面
            show_active_EQP();
            //身上穿着的装备更新了，更新相关内容
            updata_player_EQP();
        });
    });
}

export { player_status };
