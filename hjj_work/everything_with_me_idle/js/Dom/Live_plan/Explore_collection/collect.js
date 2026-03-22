import { crtElement, addElement, addElement_radio } from '../../../Function/Dom_function.js';
import { global } from '../../../GameRun/global_manage.js';

//构建采集技能的界面内容
function make_collect_div(CLT_value_div) {
    //采集上部，当前地点的掉落品展示
    let CLT_up_div = addElement(CLT_value_div, 'div', 'CLT_up_div', '', '');
    //掉落物列表表头
    let CLT_drop_table_head = addElement(CLT_up_div, 'div', 'CLT_drop_table_head', null, '');
    CLT_drop_table_head.innerHTML = '可能的产物';
    //掉落物列表内容
    let CLT_drop_table_scroll_box = addElement(CLT_up_div, 'div', 'CLT_drop_table_scroll_box', 'overflow_y_div', '');
    var CLT_drop_table_value_div = addElement(CLT_drop_table_scroll_box, 'div', 'CLT_drop_table_value_div', 'in_overflow_div');
    var CLT_no_show_value_div = addElement(CLT_drop_table_value_div, 'div', 'CLT_no_show_value_div', 'drop_value');
    var CLT_have_show_value_div = addElement(CLT_drop_table_value_div, 'div', 'CLT_have_show_value_div', 'page_columns_111');

    // for (let i = 0; i < 10; i++) {
    //     let CLT_drop_value = addElement(CLT_drop_table_value_div, 'div', 'CLT_drop_value', 'drop_value');
    //     CLT_drop_value.innerHTML = i;
    // }

    //采集中部，采集提示信息
    let CLT_middle_div = addElement(CLT_value_div, 'div', 'CLT_middle_div', null, '');
    //采集概率展示
    var CLT_show_chance_div = addElement(CLT_middle_div, 'div', 'CLT_show_chance_div', null);
    CLT_show_chance_div.innerHTML = '采集概率：';
    //采集的进度条
    var CLT_bar = addElement(CLT_middle_div, 'div', 'CLT_bar', 'progress_bar ', null);
    var CLT_frame = addElement(CLT_bar, 'div', 'CLT_frame', 'progress_bar_frame'); //条的外框
    var CLT_current = addElement(CLT_frame, 'div', 'CLT_current', 'progress_bar_current');
    CLT_bar.children[0].children[0].style.width = '0%';
    //特殊采集状态的提示信息
    var CLT_show_tip_div = addElement(CLT_middle_div, 'div', 'CLT_show_tip_div', null);
    var CLT_show_tip_text = addElement(CLT_show_tip_div, 'div', 'CLT_show_tip_text', null);

    //采集下部，各种设置按钮
    let CLT_down_div = addElement(CLT_value_div, 'div', 'CLT_down_div', null, '');
    //左边，启动幸运采集和涉险采集的按钮
    let CLT_option1_div = addElement(CLT_down_div, 'div', null, 'CLT_option_div', '');
    var CLT_luck_open_button = addElement(CLT_option1_div, 'button', 'CLT_luck_open_button', 'LP_button', '');
    CLT_luck_open_button.innerHTML = '☑幸运采集';
    var CLT_luck_close_button = addElement(CLT_option1_div, 'button', 'CLT_luck_close_button', 'LP_button', 'none');
    CLT_luck_close_button.innerHTML = '☐幸运采集';
    var CLT_danger_open_button = addElement(CLT_option1_div, 'button', 'CLT_danger_open_button', 'LP_button', '');
    CLT_danger_open_button.innerHTML = '☑涉险采集';
    var CLT_danger_close_button = addElement(CLT_option1_div, 'button', 'CLT_danger_close_button', 'LP_button', 'none');
    CLT_danger_close_button.innerHTML = '☐涉险采集';
    //中间，开始或停止采集的按钮
    let CLT_start_button_div = addElement(CLT_down_div, 'div', 'CLT_start_button_div', 'CLT_option_div', '');
    var CLT_S_button = addElement(CLT_start_button_div, 'button', 'CLT_S_button', 'LP_button', '');
    CLT_S_button.innerHTML = '开始采集';
    var CLT_E_button = addElement(CLT_start_button_div, 'button', 'CLT_E_button', 'LP_button', 'none');
    CLT_E_button.innerHTML = '停止采集';
    //右边，待定
    let CLT_option2_div = addElement(CLT_down_div, 'div', null, 'CLT_option_div', '');
}

//为采集界面中的按钮添加交互逻辑
function set_collect_button(CLT_value_div) {
    let CLT_S_button = CLT_value_div.querySelector('#CLT_S_button');
    let CLT_E_button = CLT_value_div.querySelector('#CLT_E_button');
    //开始采集按钮
    CLT_S_button.onclick = function () {
        //开启采集状态
        global.set_flag('GS_game_statu', 'collect');
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        //开启一轮采集，重置采集的参数
        collect_manage.player_start_collect();
        collect_manage.reset_round();
        //开始采集按钮切换成停止采集
        CLT_S_button.style.display = 'none';
        CLT_E_button.style.display = '';
    };
    //停止采集按钮
    CLT_E_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        collect_manage.stop_game_statu(); // 停止采集状态
        collect_manage.reset_round(); //重置一轮采集的参数
    };

    //幸运采集按钮
    let CLT_luck_open_button = CLT_value_div.querySelector('#CLT_luck_open_button');
    let CLT_luck_close_button = CLT_value_div.querySelector('#CLT_luck_close_button');
    CLT_luck_open_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        collect_manage.set_CLT_option('luck_CLT_flag', false);
        //幸运采集按钮样式切换
        CLT_luck_open_button.style.display = 'none';
        CLT_luck_close_button.style.display = '';
    };
    CLT_luck_close_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        collect_manage.set_CLT_option('luck_CLT_flag', true);
        //幸运采集按钮样式切换
        CLT_luck_open_button.style.display = '';
        CLT_luck_close_button.style.display = 'none';
    };
    //涉险采集按钮
    let CLT_danger_open_button = CLT_value_div.querySelector('#CLT_danger_open_button');
    let CLT_danger_close_button = CLT_value_div.querySelector('#CLT_danger_close_button');
    CLT_danger_open_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        collect_manage.set_CLT_option('danger_CLT_flag', false);
        //涉险采集按钮样式切换
        CLT_danger_open_button.style.display = 'none';
        CLT_danger_close_button.style.display = '';
    };
    CLT_danger_close_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let collect_manage = live_plan_manage.get_LP_live_skill_manage('collect_manage');
        collect_manage.set_CLT_option('danger_CLT_flag', true);
        //涉险采集按钮样式切换
        CLT_danger_open_button.style.display = '';
        CLT_danger_close_button.style.display = 'none';
    };
}
export { make_collect_div, set_collect_button };
