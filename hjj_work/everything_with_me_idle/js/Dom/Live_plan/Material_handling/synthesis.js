import { crtElement, addElement, addElement_radio } from '../../../Function/Dom_function.js';
import { global } from '../../../GameRun/global_manage.js';

var last_SYN_switch = 'SYN_MK';

//构建合成制造技能的界面内容
function make_synthesis_div(SYN_value_div) {
    //合成制造第一个子界面，制造界面
    let SYN_make_div = addElement(SYN_value_div, 'div', 'SYN_make_div', '', '');
    make_SYN_make_div(SYN_make_div);
    //合成制造第二个子界面，配方筛选的筛选界面
    let SYN_filter_div = addElement(SYN_value_div, 'div', 'SYN_filter_div', '', 'none');
    make_SYN_filter_div(SYN_filter_div);
    //合成制造第三个子界面，配方筛选的制造界面
    let SYN_filter_make_div = addElement(SYN_value_div, 'div', 'SYN_filter_make_div', '', 'none');
    make_SYN_filter_make_div(SYN_filter_make_div);
    //合成制造第四个子界面，配方研究界面
    let SYN_research_div = addElement(SYN_value_div, 'div', 'SYN_research_div', '', 'none');
    make_SYN_research_div(SYN_research_div);
    //合成制造第五个子界面，工作环境界面
    let SYN_environment_div = addElement(SYN_value_div, 'div', 'SYN_environment_div', '', 'none');
    make_SYN_environment_div(SYN_environment_div);
}
//合成制造第一个子界面，制造界面
function make_SYN_make_div(SYN_make_div) {
    //顶部配方标题
    let SYN_MK_formula_title_div = addElement(SYN_make_div, 'div', 'SYN_MK_formula_title_div', '', '');
    let SYN_MK_rt1 = addElement(SYN_MK_formula_title_div, 'div', 'SYN_MK_rt1', '', '');
    SYN_MK_rt1.innerHTML = '需求';
    let SYN_MK_rt2 = addElement(SYN_MK_formula_title_div, 'div', 'SYN_MK_rt2', '', '');
    SYN_MK_rt2.innerHTML = '产出';
    let SYN_MK_rt3 = addElement(SYN_MK_formula_title_div, 'div', 'SYN_MK_rt3', '', '');
    // SYN_MK_rt2.innerHTML = '占位';

    //容纳所有配方内容div
    let SYN_MK_formula_scroll_box = addElement(SYN_make_div, 'div', 'SYN_MK_formula_scroll_box', 'overflow_y_div', '');
    var SYN_MK_formula_value_div = addElement(SYN_MK_formula_scroll_box, 'div', 'SYN_MK_formula_value_div', 'in_overflow_div');
    for (let i = 0; i < 3; i++) {
        var formula_value = addElement(SYN_MK_formula_value_div, 'div', null, 'formula_value');
        var formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
        formula_value_l.innerHTML = '材料A x1+材料B x2';
        var formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
        formula_value_r.innerHTML = '产物A x1';
    }

    //筛选div
    let SYN_MK_filter_div = addElement(SYN_make_div, 'div', 'SYN_MK_filter_div', '', '');
    //标题
    let SYN_MK_filter_title = addElement(SYN_MK_filter_div, 'div', 'SYN_MK_filter_title', '', '');
    SYN_MK_filter_title.innerHTML = '筛选';
    //可否制造筛选按钮
    let SYN_MK_filter_make_flag_div = addElement(SYN_MK_filter_div, 'div', 'SYN_MK_filter_make_flag_div', '', '');
    let SYN_MK_filter_no_make = addElement(SYN_MK_filter_make_flag_div, 'button', 'SYN_MK_filter_no_make', 'SYN_MK_filter_make_flag_button', '');
    SYN_MK_filter_no_make.innerHTML = '☐当前可制造';
    let SYN_MK_filter_can_make = addElement(SYN_MK_filter_make_flag_div, 'button', 'SYN_MK_filter_can_make', 'SYN_MK_filter_make_flag_button', 'none');
    SYN_MK_filter_can_make.innerHTML = '☑当前可制造';
    //类型筛选多选框
    let SYN_MK_filter_type_div = addElement(SYN_MK_filter_div, 'div', 'SYN_MK_filter_type_div', '', '');
    var SYN_MK_type_A_div = addElement(SYN_MK_filter_type_div, 'div', 'SYN_MK_type_A_div', 'radio_div div_switch_button');
    addElement_radio(SYN_MK_type_A_div, 'SYN_MK_T_A_switch_button', 'SYN_MK_type_switch', 'SYN_MK_T_A', '全部');
    SYN_MK_type_A_div.children[0].checked = true; //初始激活该按钮
    var SYN_MK_type_E_div = addElement(SYN_MK_filter_type_div, 'div', 'SYN_MK_type_E_div', 'radio_div div_switch_button');
    addElement_radio(SYN_MK_type_E_div, 'SYN_MK_T_E_switch_button', 'SYN_MK_type_switch', 'SYN_MK_T_E', '产出装备');
    var SYN_MK_type_C_div = addElement(SYN_MK_filter_type_div, 'div', 'SYN_MK_type_C_div', 'radio_div div_switch_button');
    addElement_radio(SYN_MK_type_C_div, 'SYN_MK_T_C_switch_button', 'SYN_MK_type_switch', 'SYN_MK_T_C', '产出\n消耗品');
    var SYN_MK_type_M_div = addElement(SYN_MK_filter_type_div, 'div', 'SYN_MK_type_M_div', 'radio_div div_switch_button');
    addElement_radio(SYN_MK_type_M_div, 'SYN_MK_T_M_switch_button', 'SYN_MK_type_switch', 'SYN_MK_T_M', '产出材料');

    //没有选择配方时的填充
    let SYN_MK_no_formula_div = addElement(SYN_make_div, 'div', 'SYN_MK_no_formula_div', '', 'none');
    SYN_MK_no_formula_div.innerHTML = '未选择要制造的配方';
    //选定配方详情div
    let SYN_MK_formula_Details_div = addElement(SYN_make_div, 'div', 'SYN_MK_formula_Details_div', '', '');
    //需求详情
    let SYN_MK_FD_N_div = addElement(SYN_MK_formula_Details_div, 'div', 'SYN_MK_FD_N_div', '', '');
    //标题
    let SYN_MK_FD_N_title_div = addElement(SYN_MK_FD_N_div, 'div', 'SYN_MK_FD_N_title_div', 'Details_div', '');
    SYN_MK_FD_N_title_div.innerHTML = '材料需求';
    //所有需求材料
    let SYN_MK_FD_N_scroll_box = addElement(SYN_MK_FD_N_div, 'div', 'SYN_MK_FD_N_scroll_box', 'overflow_y_div', '');
    var SYN_MK_FD_N_value_div = addElement(SYN_MK_FD_N_scroll_box, 'div', 'SYN_MK_FD_N_value_div', 'in_overflow_div');
    for (let i = 0; i < 10; i++) {
        var Details_div = addElement(SYN_MK_FD_N_value_div, 'div', null, 'Details_div');
        Details_div.innerHTML = '材料A（1/10）';
    }
    //工作环境详情
    let SYN_MK_FD_E_div = addElement(SYN_MK_formula_Details_div, 'div', 'SYN_MK_FD_E_div', '', '');
    //标题
    let SYN_MK_FD_E_title_div = addElement(SYN_MK_FD_E_div, 'div', 'SYN_MK_FD_E_title_div', 'Details_div', '');
    SYN_MK_FD_E_title_div.innerHTML = '工作环境需求';
    //当前选定
    let SYN_MK_FD_E_value_div = addElement(SYN_MK_FD_E_div, 'div', 'SYN_MK_FD_E_value_div', '', '');
    SYN_MK_FD_E_value_div.innerHTML = '1级工作台<br>当前<br>1级工作台';
    //产物详情
    let SYN_MK_FD_P_div = addElement(SYN_MK_formula_Details_div, 'div', 'SYN_MK_FD_P_div', '', '');
    let SYN_MK_FD_P_title_div = addElement(SYN_MK_FD_P_div, 'div', 'SYN_MK_FD_P_title_div', 'Details_div', '');
    SYN_MK_FD_P_title_div.innerHTML = '产物';
    let SYN_MK_FD_P_quantity_button = addElement(SYN_MK_FD_P_div, 'button', 'SYN_MK_FD_P_quantity_button', '');
    SYN_MK_FD_P_quantity_button.innerHTML = '批量制造选择-> X1';
    SYN_MK_FD_P_quantity_button.dataset.quantity_num = '1';
    var SYN_MK_FD_P_value_div = addElement(SYN_MK_FD_P_div, 'div', 'SYN_MK_FD_P_value_div', '');
    SYN_MK_FD_P_value_div.innerHTML = '产物A x1';
    let SYN_MK_FD_P_make_button = addElement(SYN_MK_FD_P_div, 'button', 'SYN_MK_FD_P_make_button', '');
    SYN_MK_FD_P_make_button.innerHTML = '制造';
}
//合成制造第二个子界面，配方筛选的筛选界面
function make_SYN_filter_div(SYN_filter_div) {}
//合成制造第三个子界面，配方筛选的制造界面
function make_SYN_filter_make_div(SYN_filter_make_div) {}
//合成制造第四个子界面，配方研究界面
function make_SYN_research_div(SYN_research_div) {}
//合成制造第五个子界面，工作环境界面
function make_SYN_environment_div(SYN_environment_div) {}

//为合成制造界面中的按钮添加交互逻辑
function set_synthesis_button(Live_plan) {
    //在原料处理界面，左侧选择合成制造的子功能之后，右侧切换成合成制造的对应子功能界面
    let radios = Live_plan.querySelectorAll('input[type="radio"][name="SYN_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let live_plan_manage = global.get_live_plan_manage();
            if (last_SYN_switch != this.id) {
                //点击了当前没有展示的另一个子功能，初始化新界面
                live_plan_manage.init_live_plan_game_div(this.id);
            }
            last_SYN_switch = this.id; //更新上一次点击的生活技能界面按钮
        });
    });

    let SYN_value_div = Live_plan.querySelector('#SYN_value_div');
    //为合成制造第一个子界面，制造界面中的按钮添加交互逻辑
    set_SYN_make_button(SYN_value_div);
    //为合成制造第二个子界面，配方筛选的筛选界面中的按钮添加交互逻辑
    set_SYN_filter_button(SYN_value_div);
    //为合成制造第三个子界面，配方筛选的制造界面中的按钮添加交互逻辑
    set_SYN_filter_make_button(SYN_value_div);
    //为合成制造第四个子界面，配方研究中的按钮添加交互逻辑
    set_SYN_research_button(SYN_value_div);
    //为合成制造第五个子界面，工作环境中的按钮添加交互逻辑
    set_SYN_environment_button(SYN_value_div);
}
//为合成制造第一个子界面，制造界面中的按钮添加交互逻辑
function set_SYN_make_button(SYN_value_div) {
    let SYN_MK_filter_no_make = SYN_value_div.querySelector('#SYN_MK_filter_no_make');
    let SYN_MK_filter_can_make = SYN_value_div.querySelector('#SYN_MK_filter_can_make');
    //选定可制造配方
    SYN_MK_filter_no_make.onclick = function () {
        //把没勾选的按钮切换成勾选
        SYN_MK_filter_no_make.style.display = 'none';
        SYN_MK_filter_can_make.style.display = '';
    };
    //不选定可制造配方
    SYN_MK_filter_can_make.onclick = function () {
        //把勾选的按钮切换成没勾选
        SYN_MK_filter_no_make.style.display = '';
        SYN_MK_filter_can_make.style.display = 'none';
    };

    //批量选择按钮，点击之后要更换数字
    let SYN_MK_quantity_button = SYN_value_div.querySelector('#SYN_MK_FD_P_quantity_button');
    SYN_MK_quantity_button.addEventListener('click', function () {
        let now_quantity_num = this.dataset.quantity_num;
        let next_quantity_num = get_SYN_next_quantity_num(now_quantity_num);
        this.innerHTML = '批量制造选择-> X' + next_quantity_num;
        this.dataset.quantity_num = next_quantity_num;
        let live_plan_manage = global.get_live_plan_manage();
        let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
        synthesis_manage.set_now_quantity_num(next_quantity_num); //设置批量数字
        // live_plan_manage.updata_live_plan_game_div('synthesis');
        synthesis_manage.updata_SYN_formula_Details_div(); //更新配方详情
    });
    //制造按钮
    let SYN_MK_FD_P_make_button = SYN_value_div.querySelector('#SYN_MK_FD_P_make_button');
    SYN_MK_FD_P_make_button.addEventListener('click', function () {
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_data('synthesis');
    });
}
//为合成制造第二个子界面，配方筛选的筛选界面中的按钮添加交互逻辑
function set_SYN_filter_button(SYN_value_div) {}
//为合成制造第三个子界面，配方筛选的制造界面中的按钮添加交互逻辑
function set_SYN_filter_make_button(SYN_value_div) {}
//为合成制造第四个子界面，配方研究中的按钮添加交互逻辑
function set_SYN_research_button(SYN_value_div) {}
//为合成制造第五个子界面，工作环境中的按钮添加交互逻辑
function set_SYN_environment_button(SYN_value_div) {}

//获取原料处理界面中的批量选择按钮下一个要切换到的数量
function get_SYN_next_quantity_num(now_quantity_num) {
    // 批量选择的数量设置如下
    // 1 5 10 50 100 500 1000
    // 每按一次按钮，数量就不断向下切换
    // 到1000再切换变成1

    //计算当前数字有多少个0
    let zero_num = 0;
    let x = parseInt(now_quantity_num);
    while (1) {
        if (zero_num >= 10) {
            console.log('数字计算错误，now_quantity_num的值不正常');
            return '1';
        }

        if (parseInt(x / 10) > 0) {
            x = parseInt(x / 10);
            zero_num++;
        } else {
            break;
        }
    }

    //基于剩余数字获取下一个要切换到的数
    let arrr = [0, 5, 0, 0, 0, 1];
    let next_x = arrr[x];
    if (next_x == 0 || next_x == undefined) {
        console.log('数字计算错误，next_x的值不正常');
        return '1';
    }
    if (next_x == 1) {
        zero_num++;
    }
    next_x = next_x * 10 ** zero_num;
    if (next_x > 1000) {
        next_x = 1;
    }
    return String(next_x);
}

export { make_synthesis_div, set_synthesis_button };
