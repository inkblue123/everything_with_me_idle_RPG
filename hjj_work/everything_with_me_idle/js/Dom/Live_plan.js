import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div } from '../Function/show_func.js';
import { player } from '../Player/Player.js';

var Live_plan = crtElement('div', 'Live_plan', null, '');

//创建中上，非战斗时玩家生活规划界面内的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var Live_plan_switch_div = crtElement('div', 'Live_plan_switch_div', 'page_flex', '');
    var EC_switch_button = addElement(Live_plan_switch_div, 'button', 'EC_switch_button', 'Live_plan_switch_button');
    var SM_switch_button = addElement(Live_plan_switch_div, 'button', 'SM_switch_button', 'Live_plan_switch_button');
    EC_switch_button.innerHTML = `搜索采集`;
    SM_switch_button.innerHTML = `合成制造`;
    //界面下部，具体展示内容的窗口
    var Live_plan_value_div = crtElement('div', 'Live_plan_value_div', 'page_columns_1', '');
    var EC_div = addElement(Live_plan_value_div, 'div', 'EC_div', 'page_columns_12');
    var SM_div = addElement(Live_plan_value_div, 'div', 'SM_div', 'page_columns_12', 'none');
    //搜索采集窗口 Explore_collection EC
    {
        // 左侧的分类按钮界面
        {
            var EC_scroll_box = addElement(EC_div, 'div', 'EC_scroll_box', 'overflow_y_div');
            var EC_classification_div = addElement(EC_scroll_box, 'div', 'EC_classification_div', 'classification_div');

            // 伐木 lumberjacking LBJ
            var LBJ_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(LBJ_radio_div, `LBJ_button`, 'EC_switch', `LBJ_button`, `伐木`);
            //钓鱼 fishing FIS
            var FIS_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(FIS_radio_div, `FIS_button`, 'EC_switch', `FIS_button`, `钓鱼`);
            //挖矿 mining MIN
            var MIN_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(MIN_radio_div, `MIN_button`, 'EC_switch', `MIN_button`, `挖矿`);
            //采集 foraging FAG
            var FAG_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(FAG_radio_div, `FAG_button`, 'EC_switch', `FAG_button`, `采集`);
            //潜水 diving DIV
            var DIV_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(DIV_radio_div, `DIV_button`, 'EC_switch', `DIV_button`, `潜水`);
            //考古 archaeology ACL
            var ACL_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(ACL_radio_div, `ACL_button`, 'EC_switch', `ACL_button`, `考古`);
            //探索 exploration ELT
            var ELT_radio_div = addElement(EC_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(ELT_radio_div, `ELT_button`, 'EC_switch', `ELT_button`, `探索`);
        }
        //右侧每个生活技能的内容界面
        {
            //伐木
            {
                let LBJ_value_div = addElement(EC_div, 'div', 'LBJ_value_div', null, '');
                //伐木上部，头像和掉落品展示
                let LBJ_up_div = addElement(LBJ_value_div, 'div', 'LBJ_up_div', '', '');
                let tree_head_div = addElement(LBJ_up_div, 'div', 'tree_head_div', '', '');
                //树的头像
                let tree_head = addElement(tree_head_div, 'div', 'tree_head', 'LP_div', '');
                tree_head.innerHTML = '某树';
                //树的生命进度条
                var tree_blood_bar = addElement(tree_head_div, 'div', 'tree_blood_bar', 'progress_bar', '');
                var tree_blood_frame = addElement(tree_blood_bar, 'div', 'tree_blood_frame', 'progress_bar_frame'); //条的外框
                var tree_blood_current = addElement(
                    tree_blood_frame,
                    'div',
                    'tree_blood_current',
                    'progress_bar_current'
                ); //长度随当前精力变化的色块
                var tree_blood_number = addElement(tree_blood_bar, 'div', 'tree_blood_number', 'progress_bar_number'); //显示的数字，表示当前精力具体数值
                //掉落物列表
                let drop_table_div = addElement(LBJ_up_div, 'div', 'drop_table_div', '', '');
                let drop_table_head = addElement(drop_table_div, 'div', 'drop_table_head', 'LP_div', '');
                drop_table_head.innerHTML = '可能的产物';
                let drop_table_scroll_box = addElement(
                    drop_table_div,
                    'div',
                    'drop_table_scroll_box',
                    'LP_div overflow_y_div',
                    ''
                );
                var drop_table_value_div = addElement(
                    drop_table_scroll_box,
                    'div',
                    'drop_table_value_div',
                    'classification_div'
                );

                //伐木中部，伐木策略方式按钮
                let LBJ_middle_div = addElement(LBJ_value_div, 'div', 'LBJ_middle_div', null, '');

                var LBJ_radio_div = addElement(LBJ_middle_div, 'div', null, 'radio_div LBJ_radio_div');
                addElement_radio(LBJ_radio_div, `LBJ_F_way`, 'LBJ_switch', `LBJ_F_way`, `快速伐木`);
                var LBJ_radio_div = addElement(LBJ_middle_div, 'div', null, 'radio_div LBJ_radio_div');
                addElement_radio(LBJ_radio_div, `LBJ_M_way`, 'LBJ_switch', `LBJ_M_way`, `精细伐木`);

                // var LBJ_F_button = addElement(LBJ_middle_div, 'button', 'LBJ_F_button');
                // LBJ_F_button.innerHTML = `快速伐木`;
                // var LBJ_M_button = addElement(LBJ_middle_div, 'button', 'LBJ_M_button');
                // LBJ_M_button.innerHTML = `精细伐木`;
                var LBJ_R_button = addElement(LBJ_middle_div, 'button', 'LBJ_R_button');
                LBJ_R_button.innerHTML = `更换目标`;

                //伐木下部，开始按钮
                let LBJ_down_div = addElement(LBJ_value_div, 'div', 'LBJ_down_div', null, '');
                LBJ_down_div.style.height = '20%';
                var LBJ_S_button = addElement(LBJ_down_div, 'button', 'LBJ_S_button', null, '');
                LBJ_S_button.innerHTML = `开始伐木`;
                var LBJ_E_button = addElement(LBJ_down_div, 'button', 'LBJ_E_button', null, 'none');
                LBJ_E_button.innerHTML = `停止伐木`;
            }

            //钓鱼
            var FIS_value_div = addElement(EC_div, 'div', 'FIS_value_div', null, 'none');
            //挖矿
            var MIN_value_div = addElement(EC_div, 'div', 'MIN_value_div', null, 'none');
            //采集
            var FAG_value_div = addElement(EC_div, 'div', 'FAG_value_div', null, 'none');
            //潜水
            var DIV_value_div = addElement(EC_div, 'div', 'DIV_value_div', null, 'none');
            //考古
            var ACL_value_div = addElement(EC_div, 'div', 'ACL_value_div', null, 'none');
            //探索
            var ELT_value_div = addElement(EC_div, 'div', 'ELT_value_div', null, 'none');
        }
    }
    //合成制造窗口 Synthetic_manufacturing SM
    {
        // 左侧的分类下拉表格界面
        {
            var SM_scroll_box = addElement(SM_div, 'div', 'SM_scroll_box', 'overflow_y_div');
            var SM_classification_div = addElement(SM_scroll_box, 'div', 'SM_classification_div', 'classification_div');
            //原料加工 material_refining MTR
            var SM_MTR_button = addElement(SM_classification_div, 'button', 'SM_MTR_button', 'dropdown_button_1');
            SM_MTR_button.innerHTML = `原料加工`;
            //成品制造 finishing FIN
            var SM_FIN_button = addElement(SM_classification_div, 'button', 'SM_FIN_button', 'dropdown_button_1');
            SM_FIN_button.innerHTML = `成品制造`;
            //烹饪 cooking COK
            var SM_COK_button = addElement(SM_classification_div, 'button', 'SM_COK_button', 'dropdown_button_1');
            SM_COK_button.innerHTML = `烹饪`;
            //锻造 forging FRG
            var SM_FRG_button = addElement(SM_classification_div, 'button', 'SM_FRG_button', 'dropdown_button_1');
            SM_FRG_button.innerHTML = `锻造`;
            //炼丹 Elixir_alchemy  EXA
            var SM_EXA_button = addElement(SM_classification_div, 'button', 'SM_EXA_button', 'dropdown_button_1');
            SM_EXA_button.innerHTML = `炼丹`;
            //药浴 herbal_bath HBB
            var SM_HBB_button = addElement(SM_classification_div, 'button', 'SM_HBB_button', 'dropdown_button_1');
            SM_HBB_button.innerHTML = `药浴`;
            //雕刻 engrave EGV
            var SM_EGV_button = addElement(SM_classification_div, 'button', 'SM_EGV_button', 'dropdown_button_1');
            SM_EGV_button.innerHTML = `雕刻`;
            //炼金术 alchemy ACM
            var SM_ACM_button = addElement(SM_classification_div, 'button', 'SM_ACM_button', 'dropdown_button_1');
            SM_ACM_button.innerHTML = `炼金术`;
        }
        //右侧具体的内容
        {
            // 主动技能规划内容 Active_skill_plan ASP
            // {
            //     var ASP_value_div = addElement(SM_div, 'div', 'ASP_value_div');
            //     var active_scroll_box = addElement(ASP_value_div, 'div', 'active_scroll_box', 'overflow_y_div');
            //     var active_value_div = addElement(active_scroll_box, 'div', 'active_value_div');
            //     // for (let i = 0; i < 2; i++) {
            //     //     let askill = addElement(active_value_div, 'div', null, 'active_value');
            //     //     askill.innerHTML = '技能' + i;
            //     // }
            //     var active_show_div = addElement(ASP_value_div, 'div', 'active_show_div');
            //     for (let i = 0; i < 9; i++) {
            //         addElement(active_show_div, 'div', null, 'active_show_value');
            //     }
            // }
            // //自动恢复规划 Auto_recovery_plan ARP
            // var ARP_value_scroll_box = addElement(SM_div, 'div', 'ARP_value_scroll_box', 'overflow_y_div', 'none');
            // var ARP_value_div = addElement(ARP_value_scroll_box, 'div', 'ARP_value_div', 'classification_div');
            // //自动撤离规划 Auto_evacuate_plan AEP
            // var AEP_value_scroll_box = addElement(SM_div, 'div', 'AEP_value_scroll_box', 'overflow_y_div', 'none');
            // var AEP_value_div = addElement(AEP_value_scroll_box, 'div', 'AEP_value_div', 'classification_div');
        }
    }

    Live_plan.appendChild(Live_plan_switch_div);
    Live_plan.appendChild(Live_plan_value_div);
}

// 为组件添加触发事件
{
    //最上，切换搜索采集、合成制造的按钮
    EC_switch_button.onclick = function () {
        change_Live_plan_div(this.id);
    };
    SM_switch_button.onclick = function () {
        change_Live_plan_div(this.id);
    };
    //搜索采集界面，左侧选择某个技能之后，右侧切换成对应的界面
    let radios = Live_plan.querySelectorAll('input[type="radio"][name="EC_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Explore_collection_div(this.id);
        });
    });
}
export { Live_plan };
