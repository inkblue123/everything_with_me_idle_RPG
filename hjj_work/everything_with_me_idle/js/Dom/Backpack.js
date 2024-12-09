import { crtElement, addElement } from './Dom_function.js';
import { show_dropdown_table, change_BP_SK_IB } from '../Function.js';

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

            // var BP_ALL_radio_div = addElement(BP_classification_div, 'div', 'BP_switch_radio_div', 'radio_div');
            // addElement_radio(BP_ALL_radio_div, `BP_1`, 'BP_switch', `all`, `装备栏\n${i + 1}`);

            var BP_ALL_button = addElement(BP_classification_div, 'button', 'BP_ALL_button', 'dropdown_button_1');
            BP_ALL_button.innerHTML = `全部`;
            // 武器装备
            var BP_EQP_button = addElement(BP_classification_div, 'button', 'BP_EQP_button', 'dropdown_button_1');
            BP_EQP_button.innerHTML = `武器装备`;
            var BP_EQP_droptable = addElement(BP_classification_div, 'div', 'BP_EQP_droptable', 'dropdown_table');
            var BP_EQP_all_button = addElement(BP_EQP_droptable, 'button', 'BP_EQP_all_button', 'dropdown_button_2');
            BP_EQP_all_button.innerHTML = `全部`;
            var BP_EQP_W_button = addElement(BP_EQP_droptable, 'button', 'BP_EQP_W_button', 'dropdown_button_2');
            BP_EQP_W_button.innerHTML = `主手武器`;
            var BP_EQP_A_button = addElement(BP_EQP_droptable, 'button', 'BP_EQP_A_button', 'dropdown_button_2');
            BP_EQP_A_button.innerHTML = `防具`;
            var BP_EQP_D_button = addElement(BP_EQP_droptable, 'button', 'BP_EQP_D_button', 'dropdown_button_2');
            BP_EQP_D_button.innerHTML = `副手`;
            var BP_EQP_O_button = addElement(BP_EQP_droptable, 'button', 'BP_EQP_O_button', 'dropdown_button_2');
            BP_EQP_O_button.innerHTML = `饰品`;
            //消耗品
            var BP_CSB_button = addElement(BP_classification_div, 'button', 'BP_CSB_button', 'dropdown_button_1');
            BP_CSB_button.innerHTML = `消耗品`;
            var BP_CSB_droptable = addElement(BP_classification_div, 'div', 'BP_CSB_droptable', 'dropdown_table');
            var BP_CSB_all_button = addElement(BP_CSB_droptable, 'button', 'BP_CSB_all_button', 'dropdown_button_2');
            BP_CSB_all_button.innerHTML = `全部`;
            var BP_CSB_W_button = addElement(BP_CSB_droptable, 'button', 'BP_CSB_W_button', 'dropdown_button_2');
            BP_CSB_W_button.innerHTML = `恢复物品`;
            var BP_CSB_A_button = addElement(BP_CSB_droptable, 'button', 'BP_CSB_A_button', 'dropdown_button_2');
            BP_CSB_A_button.innerHTML = `buff物品`;
            var BP_CSB_D_button = addElement(BP_CSB_droptable, 'button', 'BP_CSB_D_button', 'dropdown_button_2');
            BP_CSB_D_button.innerHTML = `战斗消耗品`;
            var BP_CSB_O_button = addElement(BP_CSB_droptable, 'button', 'BP_CSB_O_button', 'dropdown_button_2');
            BP_CSB_O_button.innerHTML = `生活消耗品`;
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
            var SK_ALL_button = addElement(SK_classification_div, 'button', 'SK_ALL_button', 'dropdown_button_1');
            SK_ALL_button.innerHTML = `全部`;
            // 根基技能
            var SK_basic_button = addElement(SK_classification_div, 'button', 'SK_basic_button', 'dropdown_button_1');
            SK_basic_button.innerHTML = `根基技能`;
            var SK_basic_droptable = addElement(SK_classification_div, 'div', 'SK_basic_droptable', 'dropdown_table');
            var SK_basic_all_button = addElement(
                SK_basic_droptable,
                'button',
                'SK_basic_all_button',
                'dropdown_button_2'
            );
            SK_basic_all_button.innerHTML = `全部`;
            //战斗技能
            var SK_combat_button = addElement(SK_classification_div, 'button', 'SK_combat_button', 'dropdown_button_1');
            SK_combat_button.innerHTML = `战斗技能`;
            var SK_combat_droptable = addElement(SK_classification_div, 'div', 'SK_combat_droptable', 'dropdown_table');
            var SK_combat_all_button = addElement(
                SK_combat_droptable,
                'button',
                'SK_combat_all_button',
                'dropdown_button_2'
            );
            SK_combat_all_button.innerHTML = `全部`;
            var SK_combat_W_button = addElement(
                SK_combat_droptable,
                'button',
                'SK_combat_W_button',
                'dropdown_button_2'
            );
            SK_combat_W_button.innerHTML = `武器技能`;
            var SK_combat_A_button = addElement(
                SK_combat_droptable,
                'button',
                'SK_combat_A_button',
                'dropdown_button_2'
            );
            SK_combat_A_button.innerHTML = `战斗姿态技能`;
            var SK_combat_D_button = addElement(
                SK_combat_droptable,
                'button',
                'SK_combat_D_button',
                'dropdown_button_2'
            );
            SK_combat_D_button.innerHTML = `环境适应技能`;
            var SK_combat_O_button = addElement(
                SK_combat_droptable,
                'button',
                'SK_combat_O_button',
                'dropdown_button_2'
            );
            SK_combat_O_button.innerHTML = `对敌精通技能`;
            //生活技能
            var SK_life_button = addElement(SK_classification_div, 'button', 'SK_life_button', 'dropdown_button_1');
            SK_life_button.innerHTML = `生活技能`;
            var SK_life_droptable = addElement(SK_classification_div, 'div', 'SK_life_droptable', 'dropdown_table');
            var SK_life_all_button = addElement(SK_life_droptable, 'button', 'SK_life_all_button', 'dropdown_button_2');
            SK_life_all_button.innerHTML = `全部`;
            var SK_life_W_button = addElement(SK_life_droptable, 'button', 'SK_life_W_button', 'dropdown_button_2');
            SK_life_W_button.innerHTML = `原料获取技能`;
            var SK_life_A_button = addElement(SK_life_droptable, 'button', 'SK_life_A_button', 'dropdown_button_2');
            SK_life_A_button.innerHTML = `原料加工技能`;
            var SK_life_D_button = addElement(SK_life_droptable, 'button', 'SK_life_D_button', 'dropdown_button_2');
            SK_life_D_button.innerHTML = `成品使用技能`;
            var SK_life_B_button = addElement(SK_life_droptable, 'button', 'SK_life_D_button', 'dropdown_button_2');
            SK_life_B_button.innerHTML = `回收利用技能`;
            // 主动技能
            var SK_active_button = addElement(SK_classification_div, 'button', 'SK_active_button', 'dropdown_button_1');
            SK_active_button.innerHTML = `主动技能`;
            var SK_active_droptable = addElement(SK_classification_div, 'div', 'SK_active_droptable', 'dropdown_table');
            var SK_active_all_button = addElement(
                SK_active_droptable,
                'button',
                'SK_active_all_button',
                'dropdown_button_2'
            );
            SK_active_all_button.innerHTML = `全部`;
            // 特殊功法
            var SK_super_button = addElement(SK_classification_div, 'button', 'SK_super_button', 'dropdown_button_1');
            SK_super_button.innerHTML = `特殊功法`;
            var SK_super_droptable = addElement(SK_classification_div, 'div', 'SK_super_droptable', 'dropdown_table');
            var SK_super_all_button = addElement(
                SK_super_droptable,
                'button',
                'SK_super_all_button',
                'dropdown_button_2'
            );
            SK_super_all_button.innerHTML = `全部`;
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
        show_dropdown_table('BP_classification_div', 'BP_EQP_droptable');
    };
    BP_CSB_button.onclick = function () {
        show_dropdown_table('BP_classification_div', 'BP_CSB_droptable');
    };
    SK_basic_button.onclick = function () {
        show_dropdown_table('SK_classification_div', 'SK_basic_droptable');
    };
    SK_combat_button.onclick = function () {
        show_dropdown_table('SK_classification_div', 'SK_combat_droptable');
    };
    SK_life_button.onclick = function () {
        show_dropdown_table('SK_classification_div', 'SK_life_droptable');
    };
    SK_active_button.onclick = function () {
        show_dropdown_table('SK_classification_div', 'SK_active_droptable');
    };
    SK_super_button.onclick = function () {
        show_dropdown_table('SK_classification_div', 'SK_super_droptable');
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
}
export { Backpack };
