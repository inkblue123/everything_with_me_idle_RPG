import { crtElement, addElement, addElement_radio, add_click_Equipment_worn_remove } from '../Function/Dom_function.js';
import { change_PA, show_active_EQP } from '../Function/show_func.js';
import { updata_player_name, updata_player_EQP } from '../Function/Updata_func.js';
import { change_Player_status_div, show_dropdown_table } from '../Function/show_func.js';

var player_status = crtElement('div', 'player_status', null, '', '#000000');

//创建左上角，角色状态界面内的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var player_status_switch = crtElement('div', 'player_status_switch_div', 'page_flex', '');
    //属性 player_attribute PAB
    var PAB_switch_button = addElement(
        player_status_switch,
        'button',
        'PAB_switch_button',
        'player_status_switch_button'
    );
    //技能 player_skill PSK
    var PSK_switch_button = addElement(
        player_status_switch,
        'button',
        'PSK_switch_button',
        'player_status_switch_button'
    );
    PAB_switch_button.innerHTML = `属性`;
    PSK_switch_button.innerHTML = `技能`;
    //界面下部，具体展示内容的窗口
    var player_status_value_div = crtElement('div', 'player_status_value_div', 'page_columns_1', '');
    var PAB_div = addElement(player_status_value_div, 'div', 'PAB_div', 'PAB_div');
    var PSK_div = addElement(player_status_value_div, 'div', 'PSK_div', 'page_columns_12', 'none');

    //角色属性窗口
    {
        //展示角色血条和名称的布局;
        var bar_div = crtElement('div', 'bar_div', 'page_columns_1', '');
        //角色名
        var Player_name_div = addElement(bar_div, 'div', 'Player_name_div', 'page_columns_1'); //血条中，条的外框
        var Player_name = addElement(Player_name_div, 'input', 'Player_name', null); //血条中，条的外框
        Player_name.type = 'text';
        Player_name.value = '玩家';
        //血条组件
        var HP_bar = addElement(bar_div, 'div', 'HP_bar', 'progress_bar', '');
        var HP_frame = addElement(HP_bar, 'div', 'HP_frame', 'progress_bar_frame'); //血条中，条的外框
        // HP_frame.innerHTML = 100;
        var HP_current = addElement(HP_frame, 'div', 'HP_current', 'progress_bar_current'); //血条中央，长度随当前血量变化的色块
        var HP_number = addElement(HP_bar, 'div', 'HP_number', 'progress_bar_number'); //血条上显示的数字，表示当前血量具体数值
        // HP_number.innerHTML = 100;
        //蓝条组件
        var MP_bar = addElement(bar_div, 'div', 'MP_bar', 'progress_bar', '');
        var MP_frame = addElement(MP_bar, 'div', 'MP_frame', 'progress_bar_frame'); //条的外框
        var MP_current = addElement(MP_frame, 'div', 'MP_current', 'progress_bar_current'); //长度随当前蓝量变化的色块
        var MP_number = addElement(MP_bar, 'div', 'MP_number', 'progress_bar_number'); //显示的数字，表示当前蓝量具体数值
        //精力组件
        var ENP_bar = addElement(bar_div, 'div', 'ENP_bar', 'progress_bar', '');
        var ENP_frame = addElement(ENP_bar, 'div', 'ENP_frame', 'progress_bar_frame'); //条的外框
        var ENP_current = addElement(ENP_frame, 'div', 'ENP_current', 'progress_bar_current'); //长度随当前精力变化的色块
        var ENP_number = addElement(ENP_bar, 'div', 'ENP_number', 'progress_bar_number'); //显示的数字，表示当前精力具体数值

        //容纳玩家属性+玩家装备的布局
        var attr_equip_div = crtElement('div', 'attr_equip_div', 'page_columns_1', '');
        //属性展示组件
        var attribute_show = addElement(attr_equip_div, 'div', 'attribute_show', 'page_columns_11', '');
        var combat_attribute_show = addElement(attribute_show, 'div', 'combat_attribute_show', 'page_columns_111');
        var Player_attribute_show = addElement(attribute_show, 'div', 'Player_attribute_show', 'page_columns_111');
        for (let i = 0; i < 9; i++) {
            addElement(combat_attribute_show, 'div', null, 'state_show'); //条的外框
            let test = addElement(Player_attribute_show, 'div', null, 'state_show'); //条的外框
            // if (i == 9) test.innerHTML = '测试';
        }
        //角色装备栏
        var equipment_show = addElement(attr_equip_div, 'div', 'equipment_show', 'page_columns_1', 'none');
        for (let i = 0; i < 4; i++) {
            var EQP_i = addElement(equipment_show, 'div', `EQP_column_${i + 1}`, 'page_columns_11', '');
            var EQP_left = addElement(EQP_i, 'div', null, 'page_columns_111', ''); //装备栏左侧，角色的4个防具和主副手
            var EQP_arms_div = addElement(EQP_left, 'div', null, 'EQP_arms_div', '');
            var EQP_Armor_div = addElement(EQP_left, 'div', null, 'EQP_Armor_div', '');
            var EQP_deputy_div = addElement(EQP_left, 'div', null, 'EQP_deputy_div', '');
            addElement(EQP_arms_div, 'div', null, 'hand_EQP_show', '');
            for (let j = 0; j < 4; j++) {
                addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
            }
            addElement(EQP_deputy_div, 'div', null, 'hand_EQP_show', '');
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
            addElement_radio(
                EQP_switch_radio_div,
                `EQP_${i + 1}`,
                'EQP_switch',
                `EQP_column_${i + 1}`,
                `装备栏\n${i + 1}`
            );
        }
        //默认激活第一个装备栏
        EQP_switch_div.children[0].children[0].checked = true;
        //组件放入角色属性装备界面中
        // player_status.appendChild(player_status_switch);
        PAB_div.appendChild(bar_div);
        PAB_div.appendChild(attr_equip_div);
        PAB_div.appendChild(Player_attr_switch_div);
    }
    //角色技能窗口
    {
        // 左侧的分类下拉表格界面
        {
            var PSK_scroll_box = addElement(PSK_div, 'div', 'PSK_scroll_box', 'overflow_y_div');
            var PSK_classification_div = addElement(
                PSK_scroll_box,
                'div',
                'PSK_classification_div',
                'classification_div'
            );
            // 全部
            var PSK_ALL_radio_div = addElement(PSK_classification_div, 'div', null, 'radio_div PS_switch_radio_div_1');
            addElement_radio(PSK_ALL_radio_div, `PSK_all`, 'PSK_switch', `PSK_all`, `全部`);
            //默认激活"全部"过滤条件
            PSK_ALL_radio_div.children[0].checked = true;

            // 根基技能 basic B
            var PSK_B_button = addElement(PSK_classification_div, 'button', 'PSK_B_button', 'dropdown_button_1');
            PSK_B_button.innerHTML = `根基技能`;
            var PSK_B_droptable = addElement(PSK_classification_div, 'div', 'PSK_B_droptable', 'dropdown_table');
            var PSK_B_all_radio_div = addElement(PSK_B_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_B_all_radio_div, `PSK_B_all`, 'PSK_switch', `B_all`, `全部`);

            //战斗技能 combat C
            var PSK_C_button = addElement(PSK_classification_div, 'button', 'PSK_C_button', 'dropdown_button_1');
            PSK_C_button.innerHTML = `战斗技能`;
            var PSK_C_droptable = addElement(PSK_classification_div, 'div', 'PSK_C_droptable', 'dropdown_table');
            var PSK_C_all_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_C_all_radio_div, `PSK_C_all`, 'PSK_switch', `C_all`, `全部`);
            var PSK_C_W_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_C_W_radio_div, `PSK_C_W`, 'PSK_switch', `C_W`, `武器技能`);
            var PSK_C_S_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_C_S_radio_div, `PSK_C_S`, 'PSK_switch', `C_S`, `战斗姿态技能`);
            var PSK_C_Env_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_C_Env_radio_div, `PSK_C_Env`, 'PSK_switch', `C_Env`, `环境适应技能`);
            var PSK_C_Ene_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_C_Ene_radio_div, `PSK_C_Ene`, 'PSK_switch', `C_Ene`, `对敌精通技能`);

            //生活技能 life L
            var PSK_L_button = addElement(PSK_classification_div, 'button', 'PSK_L_button', 'dropdown_button_1');
            PSK_L_button.innerHTML = `生活技能`;
            var PSK_L_droptable = addElement(PSK_classification_div, 'div', 'PSK_L_droptable', 'dropdown_table');
            var PSK_L_all_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_L_all_radio_div, `PSK_L_all`, 'PSK_switch', `L_all`, `全部`);
            var PSK_L_Raw_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_L_Raw_radio_div, `PSK_L_Raw`, 'PSK_switch', `L_Raw`, `原料获取技能`);
            var PSK_L_P_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_L_P_radio_div, `PSK_L_P`, 'PSK_switch', `L_P`, `原料加工技能`);
            var PSK_L_F_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_L_F_radio_div, `PSK_L_F`, 'PSK_switch', `L_F`, `成品使用技能`);
            var PSK_L_Rec_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_L_Rec_radio_div, `PSK_L_Rec`, 'PSK_switch', `L_Rec`, `回收利用技能`);

            // 主动技能 active A
            var PSK_A_button = addElement(PSK_classification_div, 'button', 'PSK_A_button', 'dropdown_button_1');
            PSK_A_button.innerHTML = `主动技能`;
            var PSK_A_droptable = addElement(PSK_classification_div, 'div', 'PSK_A_droptable', 'dropdown_table');
            var PSK_A_all_radio_div = addElement(PSK_A_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_A_all_radio_div, `PSK_A_all`, 'PSK_switch', `A_all`, `全部`);
            // 特殊功法 super S
            var PSK_S_button = addElement(PSK_classification_div, 'button', 'PSK_S_button', 'dropdown_button_1');
            PSK_S_button.innerHTML = `特殊功法`;
            var PSK_S_droptable = addElement(PSK_classification_div, 'div', 'PSK_S_droptable', 'dropdown_table');
            var PSK_S_all_radio_div = addElement(PSK_S_droptable, 'div', null, 'radio_div PS_switch_radio_div_2');
            addElement_radio(PSK_S_all_radio_div, `PSK_S_all`, 'PSK_switch', `S_all`, `全部`);
        }
        //
        var PSK_value_div = addElement(PSK_div, 'div', 'PSK_value_div', null);
    }

    player_status.appendChild(player_status_switch);
    player_status.appendChild(player_status_value_div);
}

// 为组件添加触发事件
{
    PAB_switch_button.onclick = function () {
        change_Player_status_div(this.id);
    };
    PSK_switch_button.onclick = function () {
        change_Player_status_div(this.id);
    };
    PSK_B_button.onclick = function () {
        PSK_B_all_radio_div.children[0].checked = true;
        show_dropdown_table('PSK_classification_div', 'SK_B_droptable');
    };
    PSK_C_button.onclick = function () {
        PSK_C_all_radio_div.children[0].checked = true;
        show_dropdown_table('PSK_classification_div', 'SK_C_droptable');
    };
    PSK_L_button.onclick = function () {
        PSK_L_all_radio_div.children[0].checked = true;
        show_dropdown_table('PSK_classification_div', 'SK_L_droptable');
    };
    PSK_A_button.onclick = function () {
        PSK_A_all_radio_div.children[0].checked = true;
        show_dropdown_table('PSK_classification_div', 'SK_A_droptable');
    };
    PSK_S_button.onclick = function () {
        PSK_S_all_radio_div.children[0].checked = true;
        show_dropdown_table('PSK_classification_div', 'SK_S_droptable');
    };

    //角色名文本框，实时修改角色名称
    Player_name.addEventListener('change', updata_player_name);
    //角色属性界面切换开关
    PA_switch_button.onclick = function () {
        change_PA();
    };
    //角色装备栏切换开关
    let radios = player_status.querySelectorAll('input[type="radio"][name="EQP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //显示当前激活的装备栏界面
            show_active_EQP();
            //身上穿着的装备更新了，更新相关内容
            updata_player_EQP();
        });
    });

    //技能展示过滤
    radios = player_status.querySelectorAll('input[type="radio"][name="SK_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'PSK_all') {
                //针对技能展示界面最大的“全部”按钮，额外新增关闭其他下拉框的功能
                show_dropdown_table('PSK_classification_div');
            }
            // updata_PSK_value();
        });
    });
}

export { player_status };
