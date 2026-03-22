import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div, change_Material_handling_div } from '../../Function/show_func.js';
import { player } from '../../Player/Player.js';
import { global } from '../../GameRun/global_manage.js';

import { make_logging_div, set_logging_button } from './Explore_collection/logging.js';
import { make_fishing_div, set_fishing_button } from './Explore_collection/fishing.js';
import { make_mining_div, set_mining_button } from './Explore_collection/mining.js';
import { make_collect_div, set_collect_button } from './Explore_collection/collect.js';
import { make_diving_div, set_diving_button } from './Explore_collection/diving.js';
import { make_archaeology_div, set_archaeology_button } from './Explore_collection/archaeology.js';
import { make_exploration_div, set_exploration_button } from './Explore_collection/exploration.js';

import { make_synthesis_div, set_synthesis_button } from './Material_handling/synthesis.js';
import { make_cooking_div, set_cooking_button } from './Material_handling/cooking.js';
import { make_forging_div, set_forging_button } from './Material_handling/forging.js';
import { make_elixir_alchemy_div, set_elixir_alchemy_button } from './Material_handling/elixir_alchemy.js';
import { make_herbal_bath_div, set_herbal_bath_button } from './Material_handling/herbal_bath.js';
import { make_engrave_div, set_engrave_button } from './Material_handling/engrave.js';
import { make_alchemy_div, set_alchemy_button } from './Material_handling/alchemy.js';

//上一次点击的生活技能界面按钮
var last_Live_plan_switch = 'EC_switch_button';
var last_EC_switch = 'LGI_button';
var last_MH_switch = 'SYN_button';

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
    var EC_switch_radio_div = addElement(Live_plan_switch_div, 'div', 'EC_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(EC_switch_radio_div, 'EC_switch_button', 'Live_plan_switch', 'EC_switch', '搜索采集');
    EC_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //原料处理窗口 Material_handling MH
    var MH_switch_radio_div = addElement(Live_plan_switch_div, 'div', 'MH_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(MH_switch_radio_div, 'MH_switch_button', 'Live_plan_switch', 'MH_switch', '原料处理');
    //界面下部，具体展示内容的窗口
    var Live_plan_value_div = crtElement('div', 'Live_plan_value_div', 'page_columns_1', 'none');
    var EC_div = addElement(Live_plan_value_div, 'div', 'EC_div', 'page_columns_12');
    make_Explore_collection_div(EC_div); // 探索采集窗口 Explore_collection EC
    var MH_div = addElement(Live_plan_value_div, 'div', 'MH_div', 'page_columns_12', 'none');
    make_Material_handling_div(MH_div); //原料处理窗口 Material_handling MH

    //未解锁任何生活技能时的填充页
    var lock_all_Live_plan_div = crtElement('div', 'lock_all_Live_plan_div', null, '');
    lock_all_Live_plan_div.innerHTML = '未解锁任何生活技能';
    lock_all_Live_plan_div.dataset.flag = true;

    Live_plan.appendChild(Live_plan_switch_div);
    Live_plan.appendChild(Live_plan_value_div);
    Live_plan.appendChild(lock_all_Live_plan_div);
}
//创建探索采集窗口 Explore_collection EC
function make_Explore_collection_div(EC_div) {
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
        //采集 collect CLT
        var CLT_radio_div = addElement(EC_classifica_div, 'div', 'CLT_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(CLT_radio_div, 'CLT_button', 'EC_switch', 'CLT_button', '采集');
        addElement(CLT_radio_div, 'div', null, 'overlay', 'none');
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
        make_mining_div(MIN_value_div);
        let MIN_value_div_overlay = addElement(MIN_value_div, 'div', null, 'overlay', 'none');
        MIN_value_div_overlay.innerHTML = '这个地点没有挖矿的条件';
        //采集
        var CLT_value_div = addElement(EC_div, 'div', 'CLT_value_div', null, 'none');
        make_collect_div(CLT_value_div);
        let CLT_value_div_overlay = addElement(CLT_value_div, 'div', null, 'overlay', 'none');
        CLT_value_div_overlay.innerHTML = '这个地点没有采集的条件';
        //潜水
        var DIV_value_div = addElement(EC_div, 'div', 'DIV_value_div', null, 'none');
        make_diving_div(DIV_value_div);
        let DIV_value_div_overlay = addElement(DIV_value_div, 'div', null, 'overlay', 'none');
        DIV_value_div_overlay.innerHTML = '这个地点没有潜水的条件';
        //考古
        var ACL_value_div = addElement(EC_div, 'div', 'ACL_value_div', null, 'none');
        make_archaeology_div(ACL_value_div);
        let ACL_value_div_overlay = addElement(ACL_value_div, 'div', null, 'overlay', 'none');
        ACL_value_div_overlay.innerHTML = '这个地点没有考古的条件';
        //探索
        var ELT_value_div = addElement(EC_div, 'div', 'ELT_value_div', null, 'none');
        make_exploration_div(ELT_value_div);
        let ELT_value_div_overlay = addElement(ELT_value_div, 'div', null, 'overlay', 'none');
        ELT_value_div_overlay.innerHTML = '这个地点没有探索的条件';
    }
}
//创建原料处理窗口 Material_handling MH
function make_Material_handling_div(MH_div) {
    // 左侧的分类下拉表格界面
    {
        var MH_scroll_box = addElement(MH_div, 'div', 'MH_scroll_box', 'overflow_y_div');
        var MH_switch_div = addElement(MH_scroll_box, 'div', 'MH_switch_div', 'in_overflow_div');

        //合成制造 synthesis SYN
        var SYN_radio_div = addElement(MH_switch_div, 'div', 'SYN_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(SYN_radio_div, 'SYN_button', 'MH_switch', 'SYN_button', '合成制造');
        SYN_radio_div.children[0].checked = true; //初始激活该按钮
        var SYN_droptable = addElement(MH_switch_div, 'div', 'SYN_droptable', 'dropdown_table');
        var SYN_MK_radio_div = addElement(SYN_droptable, 'div', 'SYN_MK_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(SYN_MK_radio_div, 'SYN_MK', 'SYN_switch', 'SYN_MK', '制造');
        var SYN_FL_radio_div = addElement(SYN_droptable, 'div', 'SYN_FL_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(SYN_FL_radio_div, 'SYN_FL', 'SYN_switch', 'SYN_FL', '配方筛选');
        var SYN_RS_radio_div = addElement(SYN_droptable, 'div', 'SYN_RS_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(SYN_RS_radio_div, 'SYN_RS', 'SYN_switch', 'SYN_RS', '配方研究');
        var SYN_EN_radio_div = addElement(SYN_droptable, 'div', 'SYN_EN_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(SYN_EN_radio_div, 'SYN_EN', 'SYN_switch', 'SYN_EN', '工作环境详情');

        //烹饪 cooking COK
        var COK_radio_div = addElement(MH_switch_div, 'div', 'COK_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(COK_radio_div, 'COK_button', 'MH_switch', 'COK_button', '烹饪');
        var COK_droptable = addElement(MH_switch_div, 'div', 'COK_droptable', 'dropdown_table');
        var COK_DS_radio_div = addElement(COK_droptable, 'div', 'COK_DS_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(COK_DS_radio_div, 'COK_DS', 'COK_switch', 'COK_DS', '烹饪菜品');
        var COK_MD_radio_div = addElement(COK_droptable, 'div', 'COK_MD_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(COK_MD_radio_div, 'COK_MD', 'COK_switch', 'COK_MD', '制作干制品');
        var COK_MS_radio_div = addElement(COK_droptable, 'div', 'COK_MS_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(COK_MS_radio_div, 'COK_MS', 'COK_switch', 'COK_MS', '制作调味品');
        var COK_EN_radio_div = addElement(COK_droptable, 'div', 'COK_EN_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(COK_EN_radio_div, 'COK_EN', 'COK_switch', 'COK_EN', '工作环境详情');

        //锻造 forging FRG
        var FRG_radio_div = addElement(MH_switch_div, 'div', 'FRG_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(FRG_radio_div, 'FRG_button', 'MH_switch', 'FRG_button', '锻造');
        var FRG_droptable = addElement(MH_switch_div, 'div', 'FRG_droptable', 'dropdown_table');
        var FRG_SO_radio_div = addElement(FRG_droptable, 'div', 'FRG_SO_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(FRG_SO_radio_div, 'FRG_SO', 'FRG_switch', 'FRG_SO', '冶炼矿锭');
        var FRG_FF_radio_div = addElement(FRG_droptable, 'div', 'FRG_FF_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(FRG_FF_radio_div, 'FRG_FF', 'FRG_switch', 'FRG_FF', '锻造成品');
        var FRG_EN_radio_div = addElement(FRG_droptable, 'div', 'FRG_EN_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(FRG_EN_radio_div, 'FRG_EN', 'FRG_switch', 'FRG_EN', '工作环境详情');

        //炼丹 elixir_alchemy  EXA
        var EXA_radio_div = addElement(MH_switch_div, 'div', 'EXA_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(EXA_radio_div, 'EXA_button', 'MH_switch', 'EXA_button', '炼丹');
        var EXA_droptable = addElement(MH_switch_div, 'div', 'EXA_droptable', 'dropdown_table');

        //药浴 herbal_bath HBB
        var HBB_radio_div = addElement(MH_switch_div, 'div', 'HBB_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(HBB_radio_div, 'HBB_button', 'MH_switch', 'HBB_button', '药浴');
        var HBB_droptable = addElement(MH_switch_div, 'div', 'HBB_droptable', 'dropdown_table');

        //雕刻 engrave EGV
        var EGV_radio_div = addElement(MH_switch_div, 'div', 'EGV_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(EGV_radio_div, 'EGV_button', 'MH_switch', 'EGV_button', '雕刻');
        var EGV_droptable = addElement(MH_switch_div, 'div', 'EGV_droptable', 'dropdown_table');

        //炼金术 alchemy ACM
        var ACM_radio_div = addElement(MH_switch_div, 'div', 'ACM_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(ACM_radio_div, 'ACM_button', 'MH_switch', 'ACM_button', '炼金术');
        var ACM_droptable = addElement(MH_switch_div, 'div', 'ACM_droptable', 'dropdown_table');
    }
    //右侧具体的内容
    {
        //合成制造 synthesis SYN
        var SYN_value_div = addElement(MH_div, 'div', 'SYN_value_div', null, '');
        make_synthesis_div(SYN_value_div);

        //烹饪 cooking COK
        var COK_value_div = addElement(MH_div, 'div', 'COK_value_div', null, 'none');
        make_cooking_div(COK_value_div);

        //锻造 forging FRG
        var FRG_value_div = addElement(MH_div, 'div', 'FRG_value_div', null, 'none');
        make_forging_div(FRG_value_div);

        //炼丹 elixir_alchemy  EXA
        var EXA_value_div = addElement(MH_div, 'div', 'EXA_value_div', null, 'none');
        make_elixir_alchemy_div(EXA_value_div);

        //药浴 herbal_bath HBB
        var HBB_value_div = addElement(MH_div, 'div', 'HBB_value_div', null, 'none');
        make_herbal_bath_div(HBB_value_div);

        //雕刻 engrave EGV
        var EGV_value_div = addElement(MH_div, 'div', 'EGV_value_div', null, 'none');
        make_engrave_div(EGV_value_div);

        //炼金术 alchemy ACM
        var ACM_value_div = addElement(MH_div, 'div', 'ACM_value_div', null, 'none');
        make_alchemy_div(ACM_value_div);
    }
}

// 为组件添加触发事件
function set_Live_plan_button(Live_plan) {
    //界面最上方，切换搜索采集、原料处理的按钮
    let radios = Live_plan.querySelectorAll('input[type="radio"][name="Live_plan_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Live_plan_div(this.id);
            if (last_Live_plan_switch != this.id) {
                let live_plan_manage = global.get_live_plan_manage();
                //停止当前进行的生活技能
                live_plan_manage.stop_now_live_skill();
                //初始化新技能的界面
                if (this.id == 'EC_switch_button') {
                    live_plan_manage.init_live_plan_game_div(last_EC_switch);
                } else if (this.id == 'MH_switch_button') {
                    live_plan_manage.init_live_plan_game_div(last_MH_switch);
                }
            }
            last_Live_plan_switch = this.id; //更新上一次点击的生活技能界面按钮
        });
    });
    //搜索采集界面，左侧选择某个技能之后，右侧切换成对应的界面
    radios = Live_plan.querySelectorAll('input[type="radio"][name="EC_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let live_plan_manage = global.get_live_plan_manage();
            //停止当前进行的生活技能
            live_plan_manage.stop_now_live_skill();
            if (last_EC_switch != this.id) {
                //点击了当前没有展示的另一个生活技能，初始化新技能的界面
                live_plan_manage.init_live_plan_game_div(this.id);
            }
            last_EC_switch = this.id; //更新上一次点击的生活技能界面按钮

            //切换游戏状态
            if (this.id == 'MIN_button') {
                global.set_flag('GS_game_statu', 'mining');
            } else {
                //停止游戏状态
                global.set_flag('GS_game_statu', 'NULL');
            }
            //切换界面
            change_Explore_collection_div(this.id);
        });
    });
    //原料处理界面，左侧选择某个技能之后，右侧切换成对应的界面
    radios = Live_plan.querySelectorAll('input[type="radio"][name="MH_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let live_plan_manage = global.get_live_plan_manage();
            //停止当前进行的生活技能
            live_plan_manage.stop_now_live_skill();
            if (last_MH_switch != this.id) {
                //点击了当前没有展示的另一个生活技能，初始化新技能的界面
                live_plan_manage.init_live_plan_game_div(this.id);
            }
            last_MH_switch = this.id; //更新上一次点击的生活技能界面按钮

            //停止游戏状态
            global.set_flag('GS_game_statu', 'NULL');
            //切换界面
            change_Material_handling_div(this.id);
            //展示对应技能的子功能隐藏下拉框
            let skill_name = this.id.slice(0, 3);
            let drop_name = skill_name + '_droptable';
            show_dropdown_table('MH_switch_div', drop_name);
        });
    });
    //原料处理界面，左侧选择合成制造的子功能之后，右侧切换成合成制造的对应子功能界面

    //为伐木界面中的按钮添加交互逻辑
    let LGI_value_div = Live_plan.querySelector('#LGI_value_div');
    set_logging_button(LGI_value_div);
    //为钓鱼界面中的按钮添加交互逻辑
    let FIS_value_div = Live_plan.querySelector('#FIS_value_div');
    set_fishing_button(FIS_value_div);
    //为挖矿界面中的按钮添加交互逻辑
    let MIN_value_div = Live_plan.querySelector('#MIN_value_div');
    set_mining_button(MIN_value_div);
    //为采集界面中的按钮添加交互逻辑
    let CLT_value_div = Live_plan.querySelector('#CLT_value_div');
    set_collect_button(CLT_value_div);
    //为潜水界面中的按钮添加交互逻辑
    let DIV_value_div = Live_plan.querySelector('#DIV_value_div');
    set_diving_button(DIV_value_div);
    //为考古界面中的按钮添加交互逻辑
    let ACL_value_div = Live_plan.querySelector('#ACL_value_div');
    set_archaeology_button(ACL_value_div);
    //为探索界面中的按钮添加交互逻辑
    let ELT_value_div = Live_plan.querySelector('#ELT_value_div');
    set_exploration_button(ELT_value_div);

    //为合成制造界面中的按钮添加交互逻辑
    // let SYN_value_div = Live_plan.querySelector('#SYN_value_div');
    set_synthesis_button(Live_plan);
    //为烹饪界面中的按钮添加交互逻辑
    let COK_value_div = Live_plan.querySelector('#COK_value_div');
    set_cooking_button(COK_value_div);
    //为锻造界面中的按钮添加交互逻辑
    let FRG_value_div = Live_plan.querySelector('#FRG_value_div');
    set_forging_button(FRG_value_div);
    //为炼丹界面中的按钮添加交互逻辑
    let EXA_value_div = Live_plan.querySelector('#EXA_value_div');
    set_elixir_alchemy_button(EXA_value_div);
    //为药浴界面中的按钮添加交互逻辑
    let HBB_value_div = Live_plan.querySelector('#HBB_value_div');
    set_herbal_bath_button(HBB_value_div);
    //为雕刻界面中的按钮添加交互逻辑
    let EGV_value_div = Live_plan.querySelector('#EGV_value_div');
    set_engrave_button(EGV_value_div);
    //为炼金术界面中的按钮添加交互逻辑
    let ACM_value_div = Live_plan.querySelector('#ACM_value_div');
    set_alchemy_button(ACM_value_div);
}
export { create_Live_plan };
