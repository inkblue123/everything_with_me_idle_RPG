import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table, change_BP_SK_IB } from '../Function/Function.js';
import { update_BP_value } from '../Function/Update_func.js';

var Backpack = crtElement('div', 'backpack', null, '');

//创建左下角，角色背包物品栏界面内的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var BP_SK_IB_switch = crtElement('div', 'BP_SK_IB_switch', 'page_columns_111', '');
    var BP_switch_button = addElement(BP_SK_IB_switch, 'button', 'BP_switch_button', 'BP_SK_IB_switch_button');
    var SK_switch_button = addElement(BP_SK_IB_switch, 'button', 'SK_switch_button', 'BP_SK_IB_switch_button');
    var IB_switch_button = addElement(BP_SK_IB_switch, 'button', 'IB_switch_button', 'BP_SK_IB_switch_button');
    BP_switch_button.innerHTML = `背包物品`;
    SK_switch_button.innerHTML = `技能`;
    IB_switch_button.innerHTML = `图鉴`;
    //界面下部，具体展示内容的窗口
    var BP_SK_IB_div = crtElement('div', 'BP_SK_IB_div', 'page_columns_1', '');
    var BP_div = addElement(BP_SK_IB_div, 'div', 'BP_div', 'page_columns_12');
    var SK_div = addElement(BP_SK_IB_div, 'div', 'SK_div', 'page_columns_12', 'none');
    var IB_div = addElement(BP_SK_IB_div, 'div', 'IB_div', 'page_columns_12', 'none');
    //背包物品窗口
    {
        // 左侧的分类下拉表格界面
        {
            var BP_scroll_box = addElement(BP_div, 'div', 'BP_scroll_box', 'overflow_y_div');
            var BP_classification_div = addElement(BP_scroll_box, 'div', 'BP_classification_div', 'classification_div');
            // 全部
            var BP_ALL_radio_div = addElement(BP_classification_div, 'div', null, 'radio_div BP_switch_radio_div_1');
            addElement_radio(BP_ALL_radio_div, `BP_all`, 'BP_switch', `all`, `全部`);
            //默认激活"全部"过滤条件
            BP_ALL_radio_div.children[0].checked = true;

            // 武器装备 equipment
            var BP_EQP_button = addElement(BP_classification_div, 'button', 'BP_EQP_button', 'dropdown_button_1');
            BP_EQP_button.innerHTML = `武器装备`;
            var BP_EQP_droptable = addElement(BP_classification_div, 'div', 'BP_EQP_droptable', 'dropdown_table');
            var BP_EQP_all_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_EQP_all_radio_div, `BP_EQP_all`, 'BP_switch', `EQP_all`, `全部`);
            var BP_EQP_W_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_EQP_W_radio_div, `BP_EQP_W`, 'BP_switch', `EQP_W`, `主手武器`);
            var BP_EQP_A_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_EQP_A_radio_div, `BP_EQP_A`, 'BP_switch', `EQP_A`, `防具`);
            var BP_EQP_D_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_EQP_D_radio_div, `BP_EQP_D`, 'BP_switch', `EQP_D`, `副手`);
            var BP_EQP_O_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_EQP_O_radio_div, `BP_EQP_O`, 'BP_switch', `EQP_O`, `饰品`);

            //消耗品 consumable
            var BP_CSB_button = addElement(BP_classification_div, 'button', 'BP_CSB_button', 'dropdown_button_1');
            BP_CSB_button.innerHTML = `消耗品`;
            var BP_CSB_droptable = addElement(BP_classification_div, 'div', 'BP_CSB_droptable', 'dropdown_table');
            var BP_CSB_all_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_CSB_all_radio_div, `BP_CSB_all`, 'BP_switch', `CSB_all`, `全部`);
            var BP_CSB_F_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_CSB_F_radio_div, `BP_CSB_F`, 'BP_switch', `CSB_F`, `食品`);
            var BP_CSB_A_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_CSB_A_radio_div, `BP_CSB_A`, 'BP_switch', `CSB_A`, `弹药`);
            var BP_CSB_L_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_CSB_L_radio_div, `BP_CSB_L`, 'BP_switch', `CSB_L`, `生活消耗品`);
            //材料 Material
            var BP_MTR_button = addElement(BP_classification_div, 'button', 'BP_MTR_button', 'dropdown_button_1');
            BP_MTR_button.innerHTML = `材料物品`;
            var BP_MTR_droptable = addElement(BP_classification_div, 'div', 'BP_MTR_droptable', 'dropdown_table');
            var BP_MTR_all_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_MTR_all_radio_div, `BP_MTR_all`, 'BP_switch', `MTR_all`, `全部`);
            var BP_MTR_R_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_MTR_R_radio_div, `BP_MTR_R`, 'BP_switch', `MTR_R`, `自然材料`);
            var BP_MTR_P_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_MTR_P_radio_div, `BP_MTR_B`, 'BP_switch', `MTR_P`, `人工材料`);
            var BP_MTR_F_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_MTR_F_radio_div, `BP_MTR_C`, 'BP_switch', `MTR_F`, `成品`);
            var BP_MTR_O_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(BP_MTR_O_radio_div, `BP_MTR_L`, 'BP_switch', `MTR_O`, `其他物品`);
        }
        //右侧具体的背包物品
        var BP_value_scroll_box = addElement(BP_div, 'div', 'BP_value_scroll_box', 'overflow_y_div');
        var BP_value_div = addElement(BP_value_scroll_box, 'div', 'BP_value_div', 'classification_div');
    }
    //技能窗口
    {
        // 左侧的分类下拉表格界面
        {
            var SK_scroll_box = addElement(SK_div, 'div', 'SK_scroll_box', 'overflow_y_div');
            var SK_classification_div = addElement(SK_scroll_box, 'div', 'SK_classification_div', 'classification_div');
            // 全部
            var SK_ALL_radio_div = addElement(SK_classification_div, 'div', null, 'radio_div BP_switch_radio_div_1');
            addElement_radio(SK_ALL_radio_div, `SK_all`, 'SK_switch', `all`, `全部`);
            //默认激活"全部"过滤条件
            SK_ALL_radio_div.children[0].checked = true;

            // 根基技能 basic B
            var SK_B_button = addElement(SK_classification_div, 'button', 'SK_B_button', 'dropdown_button_1');
            SK_B_button.innerHTML = `根基技能`;
            var SK_B_droptable = addElement(SK_classification_div, 'div', 'SK_B_droptable', 'dropdown_table');
            var SK_B_all_radio_div = addElement(SK_B_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_B_all_radio_div, `SK_B_all`, 'SK_switch', `B_all`, `全部`);

            //战斗技能 combat C
            var SK_C_button = addElement(SK_classification_div, 'button', 'SK_C_button', 'dropdown_button_1');
            SK_C_button.innerHTML = `战斗技能`;
            var SK_C_droptable = addElement(SK_classification_div, 'div', 'SK_C_droptable', 'dropdown_table');
            var SK_C_all_radio_div = addElement(SK_C_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_C_all_radio_div, `SK_C_all`, 'SK_switch', `C_all`, `全部`);
            var SK_C_W_radio_div = addElement(SK_C_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_C_W_radio_div, `SK_C_W`, 'SK_switch', `C_W`, `武器技能`);
            var SK_C_S_radio_div = addElement(SK_C_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_C_S_radio_div, `SK_C_S`, 'SK_switch', `C_S`, `战斗姿态技能`);
            var SK_C_Env_radio_div = addElement(SK_C_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_C_Env_radio_div, `SK_C_Env`, 'SK_switch', `C_Env`, `环境适应技能`);
            var SK_C_Ene_radio_div = addElement(SK_C_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_C_Ene_radio_div, `SK_C_Ene`, 'SK_switch', `C_Ene`, `对敌精通技能`);

            //生活技能 life L
            var SK_L_button = addElement(SK_classification_div, 'button', 'SK_L_button', 'dropdown_button_1');
            SK_L_button.innerHTML = `生活技能`;
            var SK_L_droptable = addElement(SK_classification_div, 'div', 'SK_L_droptable', 'dropdown_table');
            var SK_L_all_radio_div = addElement(SK_L_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_L_all_radio_div, `SK_L_all`, 'SK_switch', `L_all`, `全部`);
            var SK_L_Raw_radio_div = addElement(SK_L_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_L_Raw_radio_div, `SK_L_Raw`, 'SK_switch', `L_Raw`, `原料获取技能`);
            var SK_L_P_radio_div = addElement(SK_L_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_L_P_radio_div, `SK_L_P`, 'SK_switch', `L_P`, `原料加工技能`);
            var SK_L_F_radio_div = addElement(SK_L_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_L_F_radio_div, `SK_L_F`, 'SK_switch', `L_F`, `成品使用技能`);
            var SK_L_Rec_radio_div = addElement(SK_L_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_L_Rec_radio_div, `SK_L_Rec`, 'SK_switch', `L_Rec`, `回收利用技能`);

            // 主动技能 active A
            var SK_A_button = addElement(SK_classification_div, 'button', 'SK_A_button', 'dropdown_button_1');
            SK_A_button.innerHTML = `主动技能`;
            var SK_A_droptable = addElement(SK_classification_div, 'div', 'SK_A_droptable', 'dropdown_table');
            var SK_A_all_radio_div = addElement(SK_A_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_A_all_radio_div, `SK_A_all`, 'SK_switch', `A_all`, `全部`);
            // 特殊功法 super S
            var SK_S_button = addElement(SK_classification_div, 'button', 'SK_S_button', 'dropdown_button_1');
            SK_S_button.innerHTML = `特殊功法`;
            var SK_S_droptable = addElement(SK_classification_div, 'div', 'SK_S_droptable', 'dropdown_table');
            var SK_S_all_radio_div = addElement(SK_S_droptable, 'div', null, 'radio_div BP_switch_radio_div_2');
            addElement_radio(SK_S_all_radio_div, `SK_S_all`, 'SK_switch', `S_all`, `全部`);
        }
        //
        var SK_value_div = addElement(SK_div, 'div', 'SK_value_div', null);
    }
    // 图鉴窗口
    {
        // 左侧的分类下拉表格界面
        var IB_scroll_box = addElement(IB_div, 'div', 'IB_scroll_box', 'overflow_y_div');
        var IB_classification_div = addElement(IB_scroll_box, 'div', 'IB_classification_div', 'classification_div');
        // 全部
        var IB_ALL_button = addElement(IB_classification_div, 'button', 'IB_ALL_button', 'dropdown_button_1');
        IB_ALL_button.innerHTML = `全部`;
        // 物品
        var IB_item_button = addElement(IB_classification_div, 'button', 'IB_item_button', 'dropdown_button_1');
        IB_item_button.innerHTML = `物品`;
        var IB_item_droptable = addElement(IB_classification_div, 'div', 'IB_item_droptable', 'dropdown_table');
        var IB_item_all_button = addElement(IB_item_droptable, 'button', 'IB_item_all_button', 'dropdown_button_2');
        IB_item_all_button.innerHTML = `全部`;
        var IB_item_W_button = addElement(IB_item_droptable, 'button', 'IB_item_W_button', 'dropdown_button_2');
        IB_item_W_button.innerHTML = `武器装备`;
        var IB_item_A_button = addElement(IB_item_droptable, 'button', 'IB_item_A_button', 'dropdown_button_2');
        IB_item_A_button.innerHTML = `消耗品`;
        var IB_item_D_button = addElement(IB_item_droptable, 'button', 'IB_item_D_button', 'dropdown_button_2');
        IB_item_D_button.innerHTML = `材料`;
        //技能
        var IB_skill_button = addElement(IB_classification_div, 'button', 'IB_skill_button', 'dropdown_button_1');
        IB_skill_button.innerHTML = `技能`;
        var IB_skill_droptable = addElement(IB_classification_div, 'div', 'IB_skill_droptable', 'dropdown_table');
        var IB_skill_all_button = addElement(IB_skill_droptable, 'button', 'IB_skill_all_button', 'dropdown_button_2');
        IB_skill_all_button.innerHTML = `全部`;
        var IB_skill_W_button = addElement(IB_skill_droptable, 'button', 'IB_skill_W_button', 'dropdown_button_2');
        IB_skill_W_button.innerHTML = `根基技能`;
        var IB_skill_A_button = addElement(IB_skill_droptable, 'button', 'IB_skill_A_button', 'dropdown_button_2');
        IB_skill_A_button.innerHTML = `战斗技能`;
        var IB_skill_D_button = addElement(IB_skill_droptable, 'button', 'IB_skill_D_button', 'dropdown_button_2');
        IB_skill_D_button.innerHTML = `生活技能`;
        var IB_skill_O_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
        IB_skill_O_button.innerHTML = `主动技能`;
        var IB_skill_B_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
        IB_skill_B_button.innerHTML = `特殊功法`;
        // 敌人
        var IB_enemy_button = addElement(IB_classification_div, 'button', 'IB_enemy_button', 'dropdown_button_1');
        IB_enemy_button.innerHTML = `敌人`;
        var IB_enemy_droptable = addElement(IB_classification_div, 'div', 'IB_enemy_droptable', 'dropdown_table');
        var IB_enemy_all_button = addElement(IB_enemy_droptable, 'button', 'IB_enemy_all_button', 'dropdown_button_2');
        IB_enemy_all_button.innerHTML = `全部`;
        // 事件
        var IB_event_button = addElement(IB_classification_div, 'button', 'IB_event_button', 'dropdown_button_1');
        IB_event_button.innerHTML = `事件`;
        var IB_event_droptable = addElement(IB_classification_div, 'div', 'IB_event_droptable', 'dropdown_table');
        var IB_event_all_button = addElement(IB_event_droptable, 'button', 'IB_event_all_button', 'dropdown_button_2');
        IB_event_all_button.innerHTML = `全部`;
        //
        var IB_value_div = addElement(IB_div, 'div', 'IB_value_div', null);
    }

    Backpack.appendChild(BP_SK_IB_switch);
    Backpack.appendChild(BP_SK_IB_div);
}

// 为组件添加触发事件
{
    //左下的背包物品栏界面
    //切换背包、技能、图鉴的按钮
    BP_switch_button.onclick = function () {
        change_BP_SK_IB(this.id);
    };
    SK_switch_button.onclick = function () {
        change_BP_SK_IB(this.id);
    };
    IB_switch_button.onclick = function () {
        change_BP_SK_IB(this.id);
    };
    //展开隐藏的分类按钮
    BP_EQP_button.onclick = function () {
        //点击就激活武器装备分类下的“全部”过滤条件
        BP_EQP_all_radio_div.children[0].checked = true;
        update_BP_value('EQP_all');
        show_dropdown_table('BP_classification_div', 'BP_EQP_droptable');
    };
    BP_CSB_button.onclick = function () {
        //点击就激活消耗品分类下的“全部”过滤条件
        BP_CSB_all_radio_div.children[0].checked = true;
        update_BP_value('CSB_all');
        show_dropdown_table('BP_classification_div', 'BP_CSB_droptable');
    };
    BP_MTR_button.onclick = function () {
        //点击就激活消耗品分类下的“全部”过滤条件
        BP_MTR_all_radio_div.children[0].checked = true;
        update_BP_value('MTR_all');
        show_dropdown_table('BP_classification_div', 'BP_MTR_droptable');
    };

    SK_B_button.onclick = function () {
        SK_B_all_radio_div.children[0].checked = true;
        show_dropdown_table('SK_classification_div', 'SK_B_droptable');
    };
    SK_C_button.onclick = function () {
        SK_C_all_radio_div.children[0].checked = true;
        show_dropdown_table('SK_classification_div', 'SK_C_droptable');
    };
    SK_L_button.onclick = function () {
        SK_L_all_radio_div.children[0].checked = true;
        show_dropdown_table('SK_classification_div', 'SK_L_droptable');
    };
    SK_A_button.onclick = function () {
        SK_A_all_radio_div.children[0].checked = true;
        show_dropdown_table('SK_classification_div', 'SK_A_droptable');
    };
    SK_S_button.onclick = function () {
        SK_S_all_radio_div.children[0].checked = true;
        show_dropdown_table('SK_classification_div', 'SK_S_droptable');
    };
    IB_item_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_item_droptable');
    };
    IB_skill_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_skill_droptable');
    };
    IB_enemy_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_enemy_droptable');
    };
    IB_event_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_event_droptable');
    };

    //背包物品过滤
    const radios = Backpack.querySelectorAll('input[type="radio"][name="BP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            update_BP_value(this.value);
        });
    });
}
export { Backpack };
