import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { player } from '../Player/Player.js';

//创建左下的战斗规划界面
function create_Combat_plan() {
    let Combat_plan = crtElement('div', 'Combat_plan', null, '');
    make_Combat_plan_div(Combat_plan);
    set_Combat_plan_button(Combat_plan);
    return Combat_plan;
}

//创建左下角，角色背包物品栏界面内的详细组件
function make_Combat_plan_div(Combat_plan) {
    //界面上部，区分当前展示的内容的按钮
    var Combat_plan_switch_div = crtElement('div', 'Combat_plan_switch_div', 'page_flex', '');
    //背包物品 Backpack BP
    var BP_switch_radio_div = addElement(Combat_plan_switch_div, 'div', 'BP_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(BP_switch_radio_div, 'BP_switch_button', 'Combat_plan_switch', 'BP_switch', '背包物品');
    BP_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //战斗规划 combat_plan CBP
    var CBP_switch_radio_div = addElement(Combat_plan_switch_div, 'div', 'CBP_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(CBP_switch_radio_div, 'CBP_switch_button', 'Combat_plan_switch', 'CBP_switch', '战斗规划');

    //界面下部，具体展示内容的窗口
    var Combat_plan_value_div = crtElement('div', 'Combat_plan_value_div', 'page_columns_1', '');
    var BP_div = addElement(Combat_plan_value_div, 'div', 'BP_div', 'page_columns_12');
    var CBP_div = addElement(Combat_plan_value_div, 'div', 'CBP_div', 'page_columns_12', 'none');
    //背包物品窗口
    {
        // 左侧的分类排序下拉表格界面
        {
            let BP_switch_sort_div = addElement(BP_div, 'div', 'BP_switch_sort_div', null);
            //上半分类按钮
            var BP_switch_scroll_box = addElement(BP_switch_sort_div, 'div', 'BP_switch_scroll_box', 'overflow_y_div');
            var BP_switch_div = addElement(BP_switch_scroll_box, 'div', 'BP_switch_div', 'in_overflow_div');
            // 全部
            var BP_ALL_radio_div = addElement(BP_switch_div, 'div', 'BP_ALL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_ALL_radio_div, 'BP_all', 'BP_switch', 'all', '全部');
            //默认激活"全部"过滤条件
            BP_ALL_radio_div.children[0].checked = true;
            // 武器装备 equipment
            var BP_EQP_radio_div = addElement(BP_switch_div, 'div', 'BP_EQP_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_EQP_radio_div, 'BP_EQP_button', 'BP_1_switch', 'BP_EQP_button', '武器装备');
            var BP_EQP_droptable = addElement(BP_switch_div, 'div', 'BP_EQP_droptable', 'dropdown_table');
            //消耗品 consumable
            var BP_CSB_radio_div = addElement(BP_switch_div, 'div', 'BP_CSB_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_CSB_radio_div, 'BP_CSB_button', 'BP_1_switch', 'BP_CSB_button', '消耗品');
            var BP_CSB_droptable = addElement(BP_switch_div, 'div', 'BP_CSB_droptable', 'dropdown_table');
            //材料 Material
            var BP_MTR_radio_div = addElement(BP_switch_div, 'div', 'BP_MTR_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_MTR_radio_div, 'BP_MTR_button', 'BP_1_switch', 'BP_MTR_button', '材料物品');
            var BP_MTR_droptable = addElement(BP_switch_div, 'div', 'BP_MTR_droptable', 'dropdown_table');

            //下半排序按钮
            var BP_sort_div = addElement(BP_switch_sort_div, 'div', 'BP_sort_div', null);
            var BP_num_radio_div = addElement(BP_sort_div, 'div', 'BP_num_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_num_radio_div, 'BP_num_sort', 'BP_sort', 'num_sort', '个数排序');
            BP_num_radio_div.children[0].checked = true; //默认激活"个数排序"过滤条件
            var BP_price_radio_div = addElement(BP_sort_div, 'div', 'BP_price_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(BP_price_radio_div, 'BP_price_sort', 'BP_sort', 'price_sort', '价格排序');
        }
        //右侧具体的背包物品
        var BP_value_scroll_box = addElement(BP_div, 'div', 'BP_value_scroll_box', 'overflow_y_div');
        var BP_value_div = addElement(BP_value_scroll_box, 'div', 'BP_value_div', 'in_overflow_div');
    }
    //战斗规划窗口
    {
        // 左侧的分类下拉表格界面
        {
            var CBP_scroll_box = addElement(CBP_div, 'div', 'CBP_scroll_box', 'overflow_y_div');
            var CBP_switch_div = addElement(CBP_scroll_box, 'div', 'CBP_switch_div', 'in_overflow_div');
            // 主动技能规划 Active_skill_plan ASP
            var ASP_radio_div = addElement(CBP_switch_div, 'div', 'ASP_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(ASP_radio_div, 'ASP_button', 'CBP_switch', 'ASP_button', '主动技能规划');
            ASP_radio_div.children[0].checked = true; //初始激活该按钮
            var ASP_droptable = addElement(CBP_switch_div, 'div', 'ASP_droptable', 'dropdown_table');
            var ASP_all_radio_div = addElement(ASP_droptable, 'div', 'ASP_all_radio_div', 'radio_div switch_radio_div_2');

            addElement_radio(ASP_all_radio_div, 'ASP_all', 'ASP_switch', 'ASP_all', '全部主动技能');
            ASP_all_radio_div.children[0].checked = true; //初始激活该按钮
            // var ASP_N_button = addElement(ASP_droptable, 'button', 'ASP_N_button', 'dropdown_button_2');
            // ASP_N_button.innerHTML = '占槽数分类';
            var ASP_N_radio_div = addElement(ASP_droptable, 'div', 'ASP_N_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(ASP_N_radio_div, 'ASP_N_button', 'ASP_1_switch', 'ASP_N_button', '占槽数分类');
            var ASP_N_droptable = addElement(ASP_droptable, 'div', 'ASP_N_droptable', 'dropdown_table');
            var ASP_N_1_radio_div = addElement(ASP_N_droptable, 'div', 'ASP_N_1_radio_div', 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_1_radio_div, 'ASP_N_1', 'ASP_switch', 'ASP_N_1', '1 槽');
            var ASP_N_2_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_2_radio_div, 'ASP_N_2', 'ASP_switch', 'ASP_N_2', '2 槽');
            var ASP_N_3_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_3_radio_div, 'ASP_N_3', 'ASP_switch', 'ASP_N_3', '3 槽');
            var ASP_N_4_radio_div = addElement(ASP_N_droptable, 'div', null, 'radio_div switch_radio_div_3');
            addElement_radio(ASP_N_4_radio_div, 'ASP_N_4', 'ASP_switch', 'ASP_N_4', '4 槽');

            var ASP_A_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_A_radio_div, 'ASP_A', 'ASP_switch', 'ASP_A', '可攻击的技能');
            var ASP_D_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_D_radio_div, 'ASP_D', 'ASP_switch', 'ASP_D', '可防御的技能');
            var ASP_R_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_R_radio_div, 'ASP_R', 'ASP_switch', 'ASP_R', '可恢复的技能');
            var ASP_F_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(ASP_F_radio_div, 'ASP_F', 'ASP_switch', 'ASP_F', '可辅助的技能');

            //自动恢复规划 Auto_recovery_plan ARP
            var ARP_radio_div = addElement(CBP_switch_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(ARP_radio_div, 'ARP_button', 'CBP_switch', 'ARP_button', '自动恢复规划');
            //自动撤离规划 Auto_evacuate_plan AEP
            var AEP_radio_div = addElement(CBP_switch_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(AEP_radio_div, 'AEP_button', 'CBP_switch', 'AEP_button', '自动撤离规划');
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
            var ARP_value_div = addElement(ARP_value_scroll_box, 'div', 'ARP_value_div', 'in_overflow_div');
            //自动撤离规划 Auto_evacuate_plan AEP
            var AEP_value_scroll_box = addElement(CBP_div, 'div', 'AEP_value_scroll_box', 'overflow_y_div', 'none');
            var AEP_value_div = addElement(AEP_value_scroll_box, 'div', 'AEP_value_div', 'in_overflow_div');
        }
    }

    Combat_plan.appendChild(Combat_plan_switch_div);
    Combat_plan.appendChild(Combat_plan_value_div);
}

// 为组件添加触发事件
function set_Combat_plan_button(Combat_plan) {
    //左下的背包物品栏界面
    //切换背包、技能的按钮
    let radios = Combat_plan.querySelectorAll('input[type="radio"][name="Combat_plan_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Combat_plan_div(this.id);
        });
    });

    //背包1级分类按钮，武器装备、消耗品、材料物品
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="BP_1_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'BP_EQP_button') {
                let BP_EQP_all_radio_div = document.getElementById('BP_EQP_all_radio_div');
                BP_EQP_all_radio_div.children[0].checked = true;
                show_dropdown_table('BP_switch_div', 'BP_EQP_droptable');
            } else if (this.id == 'BP_CSB_button') {
                let BP_CSB_all_radio_div = document.getElementById('BP_CSB_all_radio_div');
                BP_CSB_all_radio_div.children[0].checked = true;
                show_dropdown_table('BP_switch_div', 'BP_CSB_droptable');
            } else if (this.id == 'BP_MTR_button') {
                let BP_MTR_all_radio_div = document.getElementById('BP_MTR_all_radio_div');
                BP_MTR_all_radio_div.children[0].checked = true;
                show_dropdown_table('BP_switch_div', 'BP_MTR_droptable');
            }
            let P_backpack = player.get_player_backpack();
            P_backpack.updata_BP_value();
        });
    });
    //背包每种物品小类分类按钮
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="BP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'BP_all') {
                //针对背包界面的“全部”按钮，额外新增关闭其他下拉框的功能
                show_dropdown_table('BP_switch_div');
                //额外关闭所有1级分类按钮
                const radios = document.querySelectorAll('input[name="BP_1_switch"]');
                for (const radio of radios) {
                    radio.checked = false;
                }
            }
            let P_backpack = player.get_player_backpack();
            P_backpack.updata_BP_value();
        });
    });
    //背包物品排序按钮
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="BP_sort"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let P_backpack = player.get_player_backpack();
            P_backpack.updata_BP_value();
        });
    });

    //选择战斗规划界面的具体功能
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="CBP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //主动技能规划按钮
            if (this.id == 'ASP_button') {
                //切换到主动技能规划界面中
                change_ASP_ARP_AEP(this.id);
                //激活“全部”主动技能分类
                let ASP_all_radio_div = document.getElementById('ASP_all_radio_div');
                ASP_all_radio_div.children[0].checked = true;
                //打开主动技能规划中的分类下拉框
                show_dropdown_table('CBP_switch_div', 'ASP_droptable');
            } else {
                //切换到对应界面中
                change_ASP_ARP_AEP(this.id);
                //关闭其他下拉框
                show_dropdown_table('CBP_switch_div');
            }
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_ASP_value();
        });
    });
    //主动技能规划1级分类按钮，占槽数分类
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="ASP_1_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'ASP_N_button') {
                let ASP_N_1_radio_div = document.getElementById('ASP_N_1_radio_div');
                ASP_N_1_radio_div.children[0].checked = true;
                show_dropdown_table('ASP_droptable', 'ASP_N_droptable');
            }
            //关闭2级分类按钮
            // const radios = document.querySelectorAll('input[name="IB_2_switch"]');
            // for (const radio of radios) {
            //     radio.checked = false;
            // }
            //过滤主动技能
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_ASP_value();
        });
    });
    //主动技能过滤
    radios = Combat_plan.querySelectorAll('input[type="radio"][name="ASP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //过滤主动技能
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_ASP_value();

            //部分最小分类按钮要关闭所有2级分类按钮，并且关闭所属下拉框内的所有子下拉框
            let open_2_skill_C_id = ['ASP_all', 'ASP_A', 'ASP_D', 'ASP_R', 'ASP_F'];
            if (open_2_skill_C_id.includes(this.id)) {
                show_dropdown_table('ASP_droptable');
                radios = document.querySelectorAll('input[name="ASP_1_switch"]');
                for (const radio of radios) {
                    radio.checked = false;
                }
            }
        });
    });

    // let ASP_N_button = Combat_plan.querySelector('#ASP_N_button');
    // ASP_N_button.onclick = function () {
    //     let ASP_N_1_radio_div = document.getElementById('ASP_N_1_radio_div');
    //     ASP_N_1_radio_div.children[0].checked = true;
    //     show_dropdown_table('ASP_droptable', 'ASP_N_droptable');
    // };
}

//切换战斗规划界面中背包、战斗规划窗口的按钮
function change_Combat_plan_div(button_id) {
    const BP_div = document.getElementById('BP_div');
    const CBP_div = document.getElementById('CBP_div');
    if (button_id == 'BP_switch_button') {
        BP_div.style.display = '';
        CBP_div.style.display = 'none';
    }
    if (button_id == 'CBP_switch_button') {
        BP_div.style.display = 'none';
        CBP_div.style.display = '';
    }
}
//按下战斗规划中，主动技能规划、自动恢复规划、自动撤离规划按钮之后，切换到对应的子界面
function change_ASP_ARP_AEP(button_id) {
    const ASP_value_scroll_box = document.getElementById('ASP_value_div');
    const ARP_value_scroll_box = document.getElementById('ARP_value_scroll_box');
    const AEP_value_scroll_box = document.getElementById('AEP_value_scroll_box');
    if (button_id == 'ASP_button') {
        ASP_value_scroll_box.style.display = '';
        ARP_value_scroll_box.style.display = 'none';
        AEP_value_scroll_box.style.display = 'none';
    }
    if (button_id == 'ARP_button') {
        ASP_value_scroll_box.style.display = 'none';
        ARP_value_scroll_box.style.display = '';
        AEP_value_scroll_box.style.display = 'none';
    }
    if (button_id == 'AEP_button') {
        ASP_value_scroll_box.style.display = 'none';
        ARP_value_scroll_box.style.display = 'none';
        AEP_value_scroll_box.style.display = '';
    }
}
export { create_Combat_plan };
