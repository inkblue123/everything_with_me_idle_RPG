import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div } from '../../Function/show_func.js';
import { player } from '../../Player/Player.js';
import { make_logging_div, set_logging_button } from './logging.js';

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
            var EC_classifica_div = addElement(EC_scroll_box, 'div', 'EC_classifica_div', 'classification_div');

            // 伐木 logging LGI
            var LGI_radio_div = addElement(EC_classifica_div, 'div', 'LGI_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(LGI_radio_div, `LGI_button`, 'EC_switch', `LGI_button`, `伐木`);
            LGI_radio_div.children[0].checked = true; //初始激活该按钮
            //钓鱼 fishing FIS
            var FIS_radio_div = addElement(EC_classifica_div, 'div', 'FIS_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(FIS_radio_div, `FIS_button`, 'EC_switch', `FIS_button`, `钓鱼`);
            //挖矿 mining MIN
            var MIN_radio_div = addElement(EC_classifica_div, 'div', 'MIN_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(MIN_radio_div, `MIN_button`, 'EC_switch', `MIN_button`, `挖矿`);
            //采集 foraging FAG
            var FAG_radio_div = addElement(EC_classifica_div, 'div', 'FAG_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(FAG_radio_div, `FAG_button`, 'EC_switch', `FAG_button`, `采集`);
            //潜水 diving DIV
            var DIV_radio_div = addElement(EC_classifica_div, 'div', 'DIV_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(DIV_radio_div, `DIV_button`, 'EC_switch', `DIV_button`, `潜水`);
            //考古 archaeology ACL
            var ACL_radio_div = addElement(EC_classifica_div, 'div', 'ACL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(ACL_radio_div, `ACL_button`, 'EC_switch', `ACL_button`, `考古`);
            //探索 exploration ELT
            var ELT_radio_div = addElement(EC_classifica_div, 'div', 'ELT_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(ELT_radio_div, `ELT_button`, 'EC_switch', `ELT_button`, `探索`);
        }
        //右侧每个生活技能的内容界面
        {
            //伐木
            var LGI_value_div = addElement(EC_div, 'div', 'LGI_value_div', null, '');
            make_logging_div(LGI_value_div);

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

    //为伐木界面中的按钮添加交互逻辑
    set_logging_button(LGI_value_div);
}
export { Live_plan };
