import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { global } from '../../GameRun/global_manage.js';

//构建采集技能的界面内容
function make_foraging_div(FAG_value_div) {
    //采集上部，当前地点的掉落品展示
    let FAG_up_div = addElement(FAG_value_div, 'div', 'FAG_up_div', '', '');
    //掉落物列表表头
    let FAG_drop_table_head = addElement(FAG_up_div, 'div', 'FAG_drop_table_head', 'LP_div', '');
    FAG_drop_table_head.innerHTML = '可能的产物';
    //掉落物列表内容
    let FAG_drop_table_scroll_box = addElement(FAG_up_div, 'div', 'FAG_drop_table_scroll_box', 'LP_div overflow_y_div', '');
    var FAG_drop_table_value_div = addElement(FAG_drop_table_scroll_box, 'div', 'FAG_drop_table_value_div', 'in_overflow_div');
    var FAG_no_show_value_div = addElement(FAG_drop_table_value_div, 'div', 'FAG_no_show_value_div', 'drop_value');
    var FAG_have_show_value_div = addElement(FAG_drop_table_value_div, 'div', 'FAG_have_show_value_div', 'page_columns_111');

    // for (let i = 0; i < 10; i++) {
    //     let FAG_drop_value = addElement(FAG_drop_table_value_div, 'div', 'FAG_drop_value', 'drop_value');
    //     FAG_drop_value.innerHTML = i;
    // }

    //采集中部，采集提示信息
    let FAG_middle_div = addElement(FAG_value_div, 'div', 'FAG_middle_div', null, '');
    //采集概率展示
    var FAG_show_chance_div = addElement(FAG_middle_div, 'div', 'FAG_show_chance_div', ' player_foraging_bar');
    FAG_show_chance_div.innerHTML = '采集概率：';

    //采集的进度条
    var FAG_bar = addElement(FAG_middle_div, 'div', 'FAG_bar', 'progress_bar player_foraging_bar', '');
    var FAG_frame = addElement(FAG_bar, 'div', 'FAG_frame', 'progress_bar_frame player_foraging_frame'); //条的外框
    var FAG_current = addElement(FAG_frame, 'div', 'FAG_current', 'progress_bar_current player_foraging_current');
    FAG_bar.children[0].children[0].style.width = '0%';

    //采集下部，开始按钮
    let FAG_down_div = addElement(FAG_value_div, 'div', 'FAG_down_div', null, '');
    var FAG_S_button = addElement(FAG_down_div, 'button', 'FAG_S_button', 'LP_button', '');
    FAG_S_button.innerHTML = '开始采集';
    var FAG_E_button = addElement(FAG_down_div, 'button', 'FAG_E_button', 'LP_button', 'none');
    FAG_E_button.innerHTML = '停止采集';
}

//为采集界面中的按钮添加交互逻辑
function set_foraging_button(FAG_value_div) {
    let FAG_S_button = FAG_value_div.querySelector('#FAG_S_button');
    let FAG_E_button = FAG_value_div.querySelector('#FAG_E_button');
    //开始采集按钮
    FAG_S_button.onclick = function () {
        //开启采集状态
        global.set_flag('GS_game_statu', 'foraging');
        //开启一轮采集，重置采集的参数
        let live_plan_manage = global.get_live_plan_manage();
        let foraging_manage = live_plan_manage.get_EC_live_skill_manage('foraging_manage');
        foraging_manage.reset_round();
        //开始采集按钮切换成停止采集
        FAG_S_button.style.display = 'none';
        FAG_E_button.style.display = '';
    };
    //停止采集按钮
    FAG_E_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let foraging_manage = live_plan_manage.get_EC_live_skill_manage('foraging_manage');
        foraging_manage.stop_game_statu(); // 停止采集状态
        foraging_manage.reset_round(); //重置一轮采集的参数
    };
}
export { make_foraging_div, set_foraging_button };
