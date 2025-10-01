import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div } from '../../Function/show_func.js';
import { player } from '../../Player/Player.js';
import { global } from '../../GameRun/global_manage.js';
import { make_logging_div, set_logging_button } from './logging.js';
import { make_fishing_div, set_fishing_button } from './fishing.js';
// import { make_mining_div, set_mining_button } from './mining.js';
import { make_foraging_div, set_foraging_button } from './foraging.js';
// import { make_diving_div, set_diving_button } from './diving.js';
// import { make_archaeology_div, set_archaeology_button } from './archaeology.js';
// import { make_exploration_div, set_exploration_button } from './exploration.js';

//创建非战斗时中上，生活规划界面
function create_Live_plan() {
    let Live_plan = crtElement('div', 'Live_plan', null, '');
    make_Live_plan_div(Live_plan);
    set_Live_plan_button(Live_plan);
    return Live_plan;
}

//创建中上，非战斗时玩家生活规划界面内的详细组件
function make_Live_plan_div(Live_plan) {
    //界面上部，区分当前展示的内容的按钮
    var Live_plan_switch_div = crtElement('div', 'Live_plan_switch_div', 'page_flex', 'none');
    //搜索采集窗口 Explore_collection EC
    var EC_switch_radio_div = addElement(Live_plan_switch_div, 'div', null, 'radio_div div_switch_button');
    addElement_radio(EC_switch_radio_div, 'EC_switch_button', 'Live_plan_switch', 'EC_switch', '搜索采集');
    EC_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //合成制造窗口 Synthetic_manufacturing SM
    var SM_switch_radio_div = addElement(Live_plan_switch_div, 'div', null, 'radio_div div_switch_button');
    addElement_radio(SM_switch_radio_div, 'SM_switch_button', 'Live_plan_switch', 'SM_switch', '合成制造');
    //界面下部，具体展示内容的窗口
    var Live_plan_value_div = crtElement('div', 'Live_plan_value_div', 'page_columns_1', 'none');
    var EC_div = addElement(Live_plan_value_div, 'div', 'EC_div', 'page_columns_12');
    var SM_div = addElement(Live_plan_value_div, 'div', 'SM_div', 'page_columns_12', 'none');
    //搜索采集窗口 Explore_collection EC
    {
        // 左侧的分类按钮界面
        {
            var EC_scroll_box = addElement(EC_div, 'div', 'EC_scroll_box', 'overflow_y_div');
            var EC_classifica_div = addElement(EC_scroll_box, 'div', 'EC_classifica_div', 'in_overflow_div');

            // 伐木 logging LGI
            var LGI_radio_div = addElement(EC_classifica_div, 'div', 'LGI_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(LGI_radio_div, 'LGI_button', 'EC_switch', 'LGI_button', '伐木');
            LGI_radio_div.children[0].checked = true; //初始激活该按钮
            addElement(LGI_radio_div, 'div', null, 'overlay', 'none'); //给组件加上默认隐藏的遮罩，在不可执行的时候显示
            //钓鱼 fishing FIS
            var FIS_radio_div = addElement(EC_classifica_div, 'div', 'FIS_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(FIS_radio_div, 'FIS_button', 'EC_switch', 'FIS_button', '钓鱼');
            addElement(FIS_radio_div, 'div', null, 'overlay', 'none');
            //挖矿 mining MIN
            var MIN_radio_div = addElement(EC_classifica_div, 'div', 'MIN_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(MIN_radio_div, 'MIN_button', 'EC_switch', 'MIN_button', '挖矿');
            addElement(MIN_radio_div, 'div', null, 'overlay', 'none');
            //采集 foraging FAG
            var FAG_radio_div = addElement(EC_classifica_div, 'div', 'FAG_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(FAG_radio_div, 'FAG_button', 'EC_switch', 'FAG_button', '采集');
            addElement(FAG_radio_div, 'div', null, 'overlay', 'none');
            //潜水 diving DIV
            var DIV_radio_div = addElement(EC_classifica_div, 'div', 'DIV_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(DIV_radio_div, 'DIV_button', 'EC_switch', 'DIV_button', '潜水');
            addElement(DIV_radio_div, 'div', null, 'overlay', 'none');
            //考古 archaeology ACL
            var ACL_radio_div = addElement(EC_classifica_div, 'div', 'ACL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(ACL_radio_div, 'ACL_button', 'EC_switch', 'ACL_button', '考古');
            addElement(ACL_radio_div, 'div', null, 'overlay', 'none');
            //探索 exploration ELT
            var ELT_radio_div = addElement(EC_classifica_div, 'div', 'ELT_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(ELT_radio_div, 'ELT_button', 'EC_switch', 'ELT_button', '探索');
            addElement(ELT_radio_div, 'div', null, 'overlay', 'none');
        }
        //右侧每个生活技能的内容界面
        {
            //伐木
            var LGI_value_div = addElement(EC_div, 'div', 'LGI_value_div', null, '');
            make_logging_div(LGI_value_div);
            let LGI_value_div_overlay = addElement(LGI_value_div, 'div', null, 'overlay', 'none');
            LGI_value_div_overlay.innerHTML = '这个地点没有伐木的条件';
            //钓鱼
            var FIS_value_div = addElement(EC_div, 'div', 'FIS_value_div', null, 'none');
            make_fishing_div(FIS_value_div);
            let FIS_value_div_overlay = addElement(FIS_value_div, 'div', null, 'overlay', 'none');
            FIS_value_div_overlay.innerHTML = '这个地点没有钓鱼的条件';
            //挖矿
            var MIN_value_div = addElement(EC_div, 'div', 'MIN_value_div', null, 'none');
            // make_mining_div(MIN_value_div);
            let MIN_value_div_overlay = addElement(MIN_value_div, 'div', null, 'overlay', 'none');
            MIN_value_div_overlay.innerHTML = '这个地点没有挖矿的条件';
            //采集
            var FAG_value_div = addElement(EC_div, 'div', 'FAG_value_div', null, 'none');
            make_foraging_div(FAG_value_div);
            let FAG_value_div_overlay = addElement(FAG_value_div, 'div', null, 'overlay', 'none');
            FAG_value_div_overlay.innerHTML = '这个地点没有采集的条件';
            //潜水
            var DIV_value_div = addElement(EC_div, 'div', 'DIV_value_div', null, 'none');
            // make_diving_div(DIV_value_div);
            let DIV_value_div_overlay = addElement(DIV_value_div, 'div', null, 'overlay', 'none');
            DIV_value_div_overlay.innerHTML = '这个地点没有潜水的条件';
            //考古
            var ACL_value_div = addElement(EC_div, 'div', 'ACL_value_div', null, 'none');
            // make_archaeology_div(ACL_value_div);
            let ACL_value_div_overlay = addElement(ACL_value_div, 'div', null, 'overlay', 'none');
            ACL_value_div_overlay.innerHTML = '这个地点没有考古的条件';
            //探索
            var ELT_value_div = addElement(EC_div, 'div', 'ELT_value_div', null, 'none');
            // make_exploration_div(ELT_value_div);
            let ELT_value_div_overlay = addElement(ELT_value_div, 'div', null, 'overlay', 'none');
            ELT_value_div_overlay.innerHTML = '这个地点没有探索的条件';
        }
    }
    //合成制造窗口 Synthetic_manufacturing SM
    {
        // 左侧的分类下拉表格界面
        {
            var SM_scroll_box = addElement(SM_div, 'div', 'SM_scroll_box', 'overflow_y_div');
            var SM_switch_div = addElement(SM_scroll_box, 'div', 'SM_switch_div', 'in_overflow_div');
            //原料加工 material_refining MTR
            var SM_MTR_button = addElement(SM_switch_div, 'button', 'SM_MTR_button', 'dropdown_button_1');
            SM_MTR_button.innerHTML = '原料加工';
            //成品制造 finishing FIN
            var SM_FIN_button = addElement(SM_switch_div, 'button', 'SM_FIN_button', 'dropdown_button_1');
            SM_FIN_button.innerHTML = '成品制造';
            //烹饪 cooking COK
            var SM_COK_button = addElement(SM_switch_div, 'button', 'SM_COK_button', 'dropdown_button_1');
            SM_COK_button.innerHTML = '烹饪';
            //锻造 forging FRG
            var SM_FRG_button = addElement(SM_switch_div, 'button', 'SM_FRG_button', 'dropdown_button_1');
            SM_FRG_button.innerHTML = '锻造';
            //炼丹 Elixir_alchemy  EXA
            var SM_EXA_button = addElement(SM_switch_div, 'button', 'SM_EXA_button', 'dropdown_button_1');
            SM_EXA_button.innerHTML = '炼丹';
            //药浴 herbal_bath HBB
            var SM_HBB_button = addElement(SM_switch_div, 'button', 'SM_HBB_button', 'dropdown_button_1');
            SM_HBB_button.innerHTML = '药浴';
            //雕刻 engrave EGV
            var SM_EGV_button = addElement(SM_switch_div, 'button', 'SM_EGV_button', 'dropdown_button_1');
            SM_EGV_button.innerHTML = '雕刻';
            //炼金术 alchemy ACM
            var SM_ACM_button = addElement(SM_switch_div, 'button', 'SM_ACM_button', 'dropdown_button_1');
            SM_ACM_button.innerHTML = '炼金术';
        }
        //右侧具体的内容
        {
        }
    }

    //未解锁任何生活技能时的填充页
    var lock_all_Live_plan_div = crtElement('div', 'lock_all_Live_plan_div', null, '');
    lock_all_Live_plan_div.innerHTML = '未解锁任何生活技能';
    lock_all_Live_plan_div.dataset.flag = true;

    Live_plan.appendChild(Live_plan_switch_div);
    Live_plan.appendChild(Live_plan_value_div);
    Live_plan.appendChild(lock_all_Live_plan_div);
}

// 为组件添加触发事件
function set_Live_plan_button(Live_plan) {
    //界面最上方，切换搜索采集、合成制造的按钮
    let radios = Live_plan.querySelectorAll('input[type="radio"][name="Live_plan_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Live_plan_div(this.id);
        });
    });
    //搜索采集界面，左侧选择某个技能之后，右侧切换成对应的界面
    radios = Live_plan.querySelectorAll('input[type="radio"][name="EC_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //停止当前进行的生活技能
            let live_plan_manage = global.get_live_plan_manage();
            live_plan_manage.stop_now_live_skill();
            //停止游戏状态
            global.set_flag('GS_game_statu', 'NULL');
            //切换界面
            change_Explore_collection_div(this.id);
        });
    });

    //为伐木界面中的按钮添加交互逻辑
    let LGI_value_div = Live_plan.querySelector('#LGI_value_div');
    set_logging_button(LGI_value_div);
    //为钓鱼界面中的按钮添加交互逻辑
    let FIS_value_div = Live_plan.querySelector('#FIS_value_div');
    set_fishing_button(FIS_value_div);
    //为挖矿界面中的按钮添加交互逻辑
    // let MIN_value_div = Live_plan.querySelector('#MIN_value_div');
    // set_mining_button(MIN_value_div);
    //为采集界面中的按钮添加交互逻辑
    let FAG_value_div = Live_plan.querySelector('#FAG_value_div');
    set_foraging_button(FAG_value_div);
    //为潜水界面中的按钮添加交互逻辑
    // let DIV_value_div = Live_plan.querySelector('#DIV_value_div');
    // set_diving_button(DIV_value_div);
    //为考古界面中的按钮添加交互逻辑
    // let ACL_value_div = Live_plan.querySelector('#ACL_value_div');
    // set_archaeology_button(ACL_value_div);
    //为探索界面中的按钮添加交互逻辑
    // let ELT_value_div = Live_plan.querySelector('#ELT_value_div');
    // set_exploration_button(ELT_value_div);
}
export { create_Live_plan };
// export { make_Live_plan_div, set_Live_plan_button };
