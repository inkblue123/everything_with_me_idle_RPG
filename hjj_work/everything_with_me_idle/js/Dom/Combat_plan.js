import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table, change_Combat_plan_div, change_ASP_ARP_AEP } from '../Function/show_func.js';
import { player } from '../Player/Player.js';

var Combat_plan = crtElement('div', 'Combat_plan', null, '');

//创建左下角，角色背包物品栏界面内的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var Combat_plan_switch_div = crtElement('div', 'Combat_plan_switch_div', 'page_flex', '');
    var BP_switch_button = addElement(
        Combat_plan_switch_div,
        'button',
        'BP_switch_button',
        'Combat_plan_switch_button'
    );
    var CBP_switch_button = addElement(
        Combat_plan_switch_div,
        'button',
        'CBP_switch_button',
        'Combat_plan_switch_button'
    );
    BP_switch_button.innerHTML = `背包物品`;
    CBP_switch_button.innerHTML = `战斗规划`;
    //界面下部，具体展示内容的窗口
    var Combat_plan_value_div = crtElement('div', 'Combat_plan_value_div', 'page_columns_1', '');
    var BP_div = addElement(Combat_plan_value_div, 'div', 'BP_div', 'page_columns_12');
    var CBP_div = addElement(Combat_plan_value_div, 'div', 'CBP_div', 'page_columns_12', 'none');
    //背包物品窗口
    {
        // 左侧的分类下拉表格界面
        {
            var BP_scroll_box = addElement(BP_div, 'div', 'BP_scroll_box', 'overflow_y_div');
            var BP_classification_div = addElement(BP_scroll_box, 'div', 'BP_classification_div', 'classification_div');
            // 全部
            var BP_ALL_radio_div = addElement(BP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(BP_ALL_radio_div, `BP_all`, 'BP_switch', `all`, `全部`);
            //默认激活"全部"过滤条件
            BP_ALL_radio_div.children[0].checked = true;

            // 武器装备 equipment
            var BP_EQP_button = addElement(BP_classification_div, 'button', 'BP_EQP_button', 'dropdown_button_1');
            BP_EQP_button.innerHTML = `武器装备`;
            var BP_EQP_droptable = addElement(BP_classification_div, 'div', 'BP_EQP_droptable', 'dropdown_table');
            var BP_EQP_all_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_EQP_all_radio_div, `BP_EQP_all`, 'BP_switch', `EQP_all`, `全部`);
            var BP_EQP_W_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_EQP_W_radio_div, `BP_EQP_W`, 'BP_switch', `EQP_W`, `主手武器`);
            var BP_EQP_A_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_EQP_A_radio_div, `BP_EQP_A`, 'BP_switch', `EQP_A`, `防具`);
            var BP_EQP_D_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_EQP_D_radio_div, `BP_EQP_D`, 'BP_switch', `EQP_D`, `副手`);
            var BP_EQP_O_radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_EQP_O_radio_div, `BP_EQP_O`, 'BP_switch', `EQP_O`, `饰品`);

            //消耗品 consumable
            var BP_CSB_button = addElement(BP_classification_div, 'button', 'BP_CSB_button', 'dropdown_button_1');
            BP_CSB_button.innerHTML = `消耗品`;
            var BP_CSB_droptable = addElement(BP_classification_div, 'div', 'BP_CSB_droptable', 'dropdown_table');
            var BP_CSB_all_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_CSB_all_radio_div, `BP_CSB_all`, 'BP_switch', `CSB_all`, `全部`);
            var BP_CSB_F_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_CSB_F_radio_div, `BP_CSB_F`, 'BP_switch', `CSB_F`, `食品`);
            var BP_CSB_A_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_CSB_A_radio_div, `BP_CSB_A`, 'BP_switch', `CSB_A`, `弹药`);
            var BP_CSB_L_radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_CSB_L_radio_div, `BP_CSB_L`, 'BP_switch', `CSB_L`, `生活消耗品`);
            //材料 Material
            var BP_MTR_button = addElement(BP_classification_div, 'button', 'BP_MTR_button', 'dropdown_button_1');
            BP_MTR_button.innerHTML = `材料物品`;
            var BP_MTR_droptable = addElement(BP_classification_div, 'div', 'BP_MTR_droptable', 'dropdown_table');
            var BP_MTR_all_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_MTR_all_radio_div, `BP_MTR_all`, 'BP_switch', `MTR_all`, `全部`);
            var BP_MTR_R_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_MTR_R_radio_div, `BP_MTR_R`, 'BP_switch', `MTR_R`, `自然材料`);
            var BP_MTR_P_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_MTR_P_radio_div, `BP_MTR_B`, 'BP_switch', `MTR_P`, `人工材料`);
            var BP_MTR_F_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_MTR_F_radio_div, `BP_MTR_C`, 'BP_switch', `MTR_F`, `成品`);
            var BP_MTR_O_radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(BP_MTR_O_radio_div, `BP_MTR_L`, 'BP_switch', `MTR_O`, `其他物品`);
        }
        //右侧具体的背包物品
        var BP_value_scroll_box = addElement(BP_div, 'div', 'BP_value_scroll_box', 'overflow_y_div');
        var BP_value_div = addElement(BP_value_scroll_box, 'div', 'BP_value_div', 'classification_div');
    }
    //战斗规划窗口
    {
        // 左侧的分类下拉表格界面
        {
            var CBP_scroll_box = addElement(CBP_div, 'div', 'CBP_scroll_box', 'overflow_y_div');
            var CBP_classification_div = addElement(
                CBP_scroll_box,
                'div',
                'CBP_classification_div',
                'classification_div'
            );
            // 主动技能规划 Active_skill_plan ASP
            var ASP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(ASP_radio_div, `ASP_button`, 'CBP_switch', `ASP_button`, `主动技能规划`);
            ASP_radio_div.children[0].checked = true; //初始激活该按钮
            var ASP_droptable = addElement(CBP_classification_div, 'div', 'ASP_droptable', 'dropdown_table');
            var ASP_all_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');

            addElement_radio(ASP_all_radio_div, `ASP_all`, 'ASP_switch', `ASP_all`, `全部主动技能`);
            ASP_all_radio_div.children[0].checked = true; //初始激活该按钮
            // var ASP_U_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            // addElement_radio(ASP_U_radio_div, `ASP_U`, 'ASP_switch', `ASP_U`, `当前可用技能`);
            var ASP_N_radio_div = addElement(ASP_droptable, 'button', 'ASP_N_button', 'dropdown_button_2');
            ASP_N_radio_div.innerHTML = `占槽数分类`;
            var ASP_N_droptable = addElement(ASP_droptable, 'div', 'ASP_N_droptable', 'dropdown_table');
            var ASP_N_1_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_1_radio_div, `ASP_N_1`, 'ASP_switch', `ASP_N_1`, `1 槽`);
            var ASP_N_2_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_2_radio_div, `ASP_N_2`, 'ASP_switch', `ASP_N_2`, `2 槽`);
            var ASP_N_3_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_3_radio_div, `ASP_N_3`, 'ASP_switch', `ASP_N_3`, `3 槽`);
            var ASP_N_4_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_4_radio_div, `ASP_N_4`, 'ASP_switch', `ASP_N_4`, `4 槽`);

            var ASP_A_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_A_radio_div, `ASP_A`, 'ASP_switch', `ASP_A`, `可攻击的技能`);
            var ASP_D_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_D_radio_div, `ASP_D`, 'ASP_switch', `ASP_D`, `可防御的技能`);
            var ASP_R_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_R_radio_div, `ASP_R`, 'ASP_switch', `ASP_R`, `可恢复的技能`);
            var ASP_F_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_F_radio_div, `ASP_F`, 'ASP_switch', `ASP_F`, `可辅助的技能`);

            //自动恢复规划 Auto_recovery_plan ARP
            var ARP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(ARP_radio_div, `ARP_button`, 'CBP_switch', `ARP_button`, `自动恢复规划`);
            //自动撤离规划 Auto_evacuate_plan AEP
            var AEP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(AEP_radio_div, `AEP_button`, 'CBP_switch', `AEP_button`, `自动撤离规划`);
        }
        //右侧具体的内容
        {
            // 主动技能规划内容 Active_skill_plan ASP
            {
                var ASP_value_div = addElement(CBP_div, 'div', 'ASP_value_div');
                var active_scroll_box = addElement(ASP_value_div, 'div', 'active_scroll_box', 'overflow_y_div');
                var active_value_div = addElement(active_scroll_box, 'div', 'active_value_div');
                // for (let i = 0; i < 2; i++) {
                //     let askill = addElement(active_value_div, 'div', null, 'active_value');
                //     askill.innerHTML = '技能' + i;
                // }

                var active_show_div = addElement(ASP_value_div, 'div', 'active_show_div');
                for (let i = 0; i < 9; i++) {
                    addElement(active_show_div, 'div', null, 'active_show_value');
                }
            }
            //自动恢复规划 Auto_recovery_plan ARP
            var ARP_value_scroll_box = addElement(CBP_div, 'div', 'ARP_value_scroll_box', 'overflow_y_div', 'none');
            var ARP_value_div = addElement(ARP_value_scroll_box, 'div', 'ARP_value_div', 'classification_div');
            //自动撤离规划 Auto_evacuate_plan AEP
            var AEP_value_scroll_box = addElement(CBP_div, 'div', 'AEP_value_scroll_box', 'overflow_y_div', 'none');
            var AEP_value_div = addElement(AEP_value_scroll_box, 'div', 'AEP_value_div', 'classification_div');
        }
    }

    Combat_plan.appendChild(Combat_plan_switch_div);
    Combat_plan.appendChild(Combat_plan_value_div);
}

// 为组件添加触发事件
{
    //左下的背包物品栏界面
    //切换背包、技能、图鉴的按钮
    BP_switch_button.onclick = function () {
        change_Combat_plan_div(this.id);
    };
    CBP_switch_button.onclick = function () {
        change_Combat_plan_div(this.id);
    };
    //展开隐藏的分类按钮
    BP_EQP_button.onclick = function () {
        //点击就激活武器装备分类下的“全部”过滤条件
        BP_EQP_all_radio_div.children[0].checked = true;
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
        show_dropdown_table('BP_classification_div', 'BP_EQP_droptable');
    };
    BP_CSB_button.onclick = function () {
        //点击就激活消耗品分类下的“全部”过滤条件
        BP_CSB_all_radio_div.children[0].checked = true;
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
        show_dropdown_table('BP_classification_div', 'BP_CSB_droptable');
    };
    BP_MTR_button.onclick = function () {
        //点击就激活材料分类下的“全部”过滤条件
        BP_MTR_all_radio_div.children[0].checked = true;
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
        show_dropdown_table('BP_classification_div', 'BP_MTR_droptable');
    };

    ASP_N_radio_div.onclick = function () {
        ASP_N_1_radio_div.children[0].checked = true;
        show_dropdown_table('ASP_droptable', 'ASP_N_droptable');
    };
    //背包物品过滤
    let radios = Combat_plan.querySelectorAll('input[type="radio"][name="BP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'BP_all') {
                //针对背包界面的“全部”按钮，额外新增关闭其他下拉框的功能
                show_dropdown_table('BP_classification_div');
            }
            let P_backpack = player.get_player_backpack();
            P_backpack.updata_BP_value();
        });
    });
    // //选择战斗规划界面的具体功能
    radios = CBP_div.querySelectorAll('input[type="radio"][name="CBP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //主动技能规划按钮
            if (this.id == 'ASP_button') {
                //切换到主动技能规划界面中
                change_ASP_ARP_AEP(this.id);
                //激活“全部”主动技能分类
                ASP_all_radio_div.children[0].checked = true;
                //打开主动技能规划中的分类下拉框
                show_dropdown_table('CBP_classification_div', 'ASP_droptable');
            } else {
                //切换到对应界面中
                change_ASP_ARP_AEP(this.id);
                //关闭其他下拉框
                show_dropdown_table('CBP_classification_div');
            }
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_ASP_value();
        });
    });
    //主动技能过滤
    radios = CBP_div.querySelectorAll('input[type="radio"][name="ASP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_ASP_value();
        });
    });
}
export { Combat_plan };
