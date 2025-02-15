import { crtElement, empty_dom, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table, change_CBP_LVP_CTP, change_ASP_ARP_AEP } from '../Function/show_func.js';
import { updata_BP_value } from '../Function/Updata_func.js';

var Game_plan = crtElement('div', 'game_plan', null, '');

//创建右下，游戏规划界面中的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var Game_plan_switch = crtElement('div', 'Game_plan_switch_div', 'page_columns_111', '');
    //战斗规划 combat_plan CBP
    var CBP_switch_button = addElement(Game_plan_switch, 'button', 'CBP_switch_button', 'GP_switch_button');
    //生活行动规划 live_ Plan LVP
    var LVP_switch_button = addElement(Game_plan_switch, 'button', 'LVP_switch_button', 'GP_switch_button');
    //创造行动规划 create_ Plan CTP
    var CTP_switch_button = addElement(Game_plan_switch, 'button', 'CTP_switch_button', 'GP_switch_button');
    CBP_switch_button.innerHTML = `战斗规划`;
    LVP_switch_button.innerHTML = `生活技能`;
    CTP_switch_button.innerHTML = `创造合成`;
    //界面下部，具体展示内容的窗口
    var Game_plan_value_div = crtElement('div', 'Game_plan_value_div', 'page_columns_1', '');
    var CBP_div = addElement(Game_plan_value_div, 'div', 'CBP_div', 'page_columns_12');
    var LVP_div = addElement(Game_plan_value_div, 'div', 'LVP_div', 'page_columns_12', 'none');
    var CTP_div = addElement(Game_plan_value_div, 'div', 'CTP_div', 'page_columns_12', 'none');
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
            var ASP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(ASP_radio_div, `ASP_button`, 'CBP_switch', `ASP_button`, `主动技能规划`);
            ASP_radio_div.children[0].checked = true; //初始激活该按钮
            var ASP_droptable = addElement(CBP_classification_div, 'div', 'ASP_droptable', 'dropdown_table');
            var ASP_all_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_all_radio_div, `ASP_all`, 'ASP_switch', `ASP_all`, `全部主动技能`);
            var ASP_U_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_U_radio_div, `ASP_U`, 'ASP_switch', `ASP_U`, `当前可用技能`);
            var ASP_N_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_N_radio_div, `ASP_N`, 'ASP_switch', `ASP_N`, `占槽数分类`);
            var ASP_A_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_A_radio_div, `ASP_A`, 'ASP_switch', `ASP_A`, `可攻击的技能`);
            var ASP_D_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_D_radio_div, `ASP_D`, 'ASP_switch', `ASP_D`, `可防御的技能`);
            var ASP_F_radio_div = addElement(ASP_droptable, 'div', null, 'radio_div GP_switch_radio_div_2');
            addElement_radio(ASP_F_radio_div, `ASP_F`, 'ASP_switch', `ASP_F`, `可辅助的技能`);

            //自动恢复规划 Auto_recovery_plan ARP
            var ARP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(ARP_radio_div, `ARP_button`, 'CBP_switch', `ARP_button`, `自动恢复规划`);
            //自动撤离规划 Auto_evacuate_plan AEP
            var AEP_radio_div = addElement(CBP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(AEP_radio_div, `AEP_button`, 'CBP_switch', `AEP_button`, `自动撤离规划`);
        }
        //右侧具体的内容
        {
            // 主动技能规划内容 Active_skill_plan ASP
            {
                var ASP_value_div = addElement(CBP_div, 'div', 'ASP_value_div');
                var active_scroll_box = addElement(ASP_value_div, 'div', 'active_scroll_box', 'overflow_y_div');
                var active_value_div = addElement(active_scroll_box, 'div', 'active_value_div');
                // for (let i = 0; i < 9; i++) {
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
    // 生活技能窗口;
    {
        // 左侧的分类下拉表格界面
        {
            var LVP_scroll_box = addElement(LVP_div, 'div', 'LVP_scroll_box', 'overflow_y_div');
            var LVP_classification_div = addElement(
                LVP_scroll_box,
                'div',
                'LVP_classification_div',
                'classification_div'
            );
            // 伐木 Woodcutting WCT
            var Woodcutting_radio_div = addElement(
                LVP_classification_div,
                'div',
                null,
                'radio_div GP_switch_radio_div_1'
            );
            addElement_radio(Woodcutting_radio_div, `Woodcutting_button`, 'LVP_switch', `Woodcutting_button`, `伐木`);
            // 木雕 Woodcarving WCV
            var Woodcarving_radio_div = addElement(
                LVP_classification_div,
                'div',
                null,
                'radio_div GP_switch_radio_div_1'
            );
            addElement_radio(Woodcarving_radio_div, `Woodcarving_button`, 'LVP_switch', `Woodcarving_button`, `木雕`);
            // 挖矿 mining MNG
            var mining_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(mining_radio_div, `mining_button`, 'LVP_switch', `mining_button`, `挖矿`);
            // 考古 Archaeology ACO
            var Archaeology_radio_div = addElement(
                LVP_classification_div,
                'div',
                null,
                'radio_div GP_switch_radio_div_1'
            );
            addElement_radio(Archaeology_radio_div, `Archaeology_button`, 'LVP_switch', `Archaeology_button`, `考古`);
            // 采集 collection CLC
            var collection_radio_div = addElement(
                LVP_classification_div,
                'div',
                null,
                'radio_div GP_switch_radio_div_1'
            );
            addElement_radio(collection_radio_div, `collection_button`, 'LVP_switch', `collection_button`, `采集`);
            // 探索 explore
            var explore_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(explore_radio_div, `explore_button`, 'LVP_switch', `explore_button`, `探索`);
            // 钓鱼 fishing
            var fishing_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(fishing_radio_div, `fishing_button`, 'LVP_switch', `fishing_button`, `钓鱼`);
            // 潜水 diving
            var diving_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div GP_switch_radio_div_1');
            addElement_radio(diving_radio_div, `diving_button`, 'LVP_switch', `diving_button`, `潜水`);
        }
        //
        var LVP_value_div = addElement(LVP_div, 'div', 'LVP_value_div', null);
        //自动恢复规划 Auto_recovery_plan ARP
        var ARP_value_scroll_box = addElement(LVP_div, 'div', 'ARP_value_scroll_box', 'overflow_y_div', 'none');
        var ARP_value_div = addElement(ARP_value_scroll_box, 'div', 'ARP_value_div', 'classification_div');
    }
    // // 创造合成窗口
    // {
    //     // 左侧的分类下拉表格界面
    //     var IB_scroll_box = addElement(CTP_div, 'div', 'IB_scroll_box', 'overflow_y_div');
    //     var IB_classification_div = addElement(IB_scroll_box, 'div', 'IB_classification_div', 'classification_div');
    //     // 全部
    //     var IB_ALL_button = addElement(IB_classification_div, 'button', 'IB_ALL_button', 'dropdown_button_1');
    //     IB_ALL_button.innerHTML = `全部`;
    //     // 物品
    //     var IB_item_button = addElement(IB_classification_div, 'button', 'IB_item_button', 'dropdown_button_1');
    //     IB_item_button.innerHTML = `物品`;
    //     var IB_item_droptable = addElement(IB_classification_div, 'div', 'IB_item_droptable', 'dropdown_table');
    //     var IB_item_all_button = addElement(IB_item_droptable, 'button', 'IB_item_all_button', 'dropdown_button_2');
    //     IB_item_all_button.innerHTML = `全部`;
    //     var IB_item_W_button = addElement(IB_item_droptable, 'button', 'IB_item_W_button', 'dropdown_button_2');
    //     IB_item_W_button.innerHTML = `武器装备`;
    //     var IB_item_A_button = addElement(IB_item_droptable, 'button', 'IB_item_A_button', 'dropdown_button_2');
    //     IB_item_A_button.innerHTML = `消耗品`;
    //     var IB_item_D_button = addElement(IB_item_droptable, 'button', 'IB_item_D_button', 'dropdown_button_2');
    //     IB_item_D_button.innerHTML = `材料`;
    //     //技能
    //     var IB_skill_button = addElement(IB_classification_div, 'button', 'IB_skill_button', 'dropdown_button_1');
    //     IB_skill_button.innerHTML = `技能`;
    //     var IB_skill_droptable = addElement(IB_classification_div, 'div', 'IB_skill_droptable', 'dropdown_table');
    //     var IB_skill_all_button = addElement(IB_skill_droptable, 'button', 'IB_skill_all_button', 'dropdown_button_2');
    //     IB_skill_all_button.innerHTML = `全部`;
    //     var IB_skill_W_button = addElement(IB_skill_droptable, 'button', 'IB_skill_W_button', 'dropdown_button_2');
    //     IB_skill_W_button.innerHTML = `根基技能`;
    //     var IB_skill_A_button = addElement(IB_skill_droptable, 'button', 'IB_skill_A_button', 'dropdown_button_2');
    //     IB_skill_A_button.innerHTML = `战斗技能`;
    //     var IB_skill_D_button = addElement(IB_skill_droptable, 'button', 'IB_skill_D_button', 'dropdown_button_2');
    //     IB_skill_D_button.innerHTML = `生活技能`;
    //     var IB_skill_O_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
    //     IB_skill_O_button.innerHTML = `主动技能`;
    //     var IB_skill_B_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
    //     IB_skill_B_button.innerHTML = `特殊功法`;
    //     // 敌人
    //     var IB_enemy_button = addElement(IB_classification_div, 'button', 'IB_enemy_button', 'dropdown_button_1');
    //     IB_enemy_button.innerHTML = `敌人`;
    //     var IB_enemy_droptable = addElement(IB_classification_div, 'div', 'IB_enemy_droptable', 'dropdown_table');
    //     var IB_enemy_all_button = addElement(IB_enemy_droptable, 'button', 'IB_enemy_all_button', 'dropdown_button_2');
    //     IB_enemy_all_button.innerHTML = `全部`;
    //     // 事件
    //     var IB_event_button = addElement(IB_classification_div, 'button', 'IB_event_button', 'dropdown_button_1');
    //     IB_event_button.innerHTML = `事件`;
    //     var IB_event_droptable = addElement(IB_classification_div, 'div', 'IB_event_droptable', 'dropdown_table');
    //     var IB_event_all_button = addElement(IB_event_droptable, 'button', 'IB_event_all_button', 'dropdown_button_2');
    //     IB_event_all_button.innerHTML = `全部`;
    //     //
    //     var IB_value_div = addElement(CTP_div, 'div', 'IB_value_div', null);
    // }

    //组件放入游戏规划界面中
    Game_plan.appendChild(Game_plan_switch);
    Game_plan.appendChild(Game_plan_value_div);
}

// 为组件添加触发事件
{
    //切换战斗规划、生活技能、创造合成的按钮
    CBP_switch_button.onclick = function () {
        change_CBP_LVP_CTP(this.id);
    };
    LVP_switch_button.onclick = function () {
        change_CBP_LVP_CTP(this.id);
    };
    CTP_switch_button.onclick = function () {
        change_CBP_LVP_CTP(this.id);
    };
    //选择战斗规划界面的具体功能
    const radios = Game_plan_value_div.querySelectorAll('input[type="radio"][name="CBP_switch"]');
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
        });
    });
}

export { Game_plan };
