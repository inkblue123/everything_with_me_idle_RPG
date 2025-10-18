import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { global } from '../../GameRun/global_manage.js';

//构建钓鱼技能的界面内容
function make_fishing_div(FIS_value_div) {
    //钓鱼上部，当前钓鱼状态和当前地点可钓的鱼列表
    let FIS_up_div = addElement(FIS_value_div, 'div', 'FIS_up_div', '', '');
    //钓鱼上部的左半边
    let FIS_up_L_div = addElement(FIS_up_div, 'div', 'FIS_up_L_div', 'FIS_up_port_div', '');
    //钓鱼状态文本框
    let FIS_status_head = addElement(FIS_up_L_div, 'div', 'FIS_status_head', 'FIS_table_head_text');
    FIS_status_head.innerHTML = '当前钓鱼状态';
    //钓鱼状态具体内容
    let FIS_status_value = addElement(FIS_up_L_div, 'div', 'FIS_status_value', '');
    FIS_status_value.innerHTML = '无';
    //钓鱼提示信息
    let FIS_tip_div = addElement(FIS_up_L_div, 'div', 'FIS_tip_div', '');

    //钓鱼上部的右半边
    let FIS_up_R_div = addElement(FIS_up_div, 'div', 'FIS_up_R_div', 'FIS_up_port_div');
    //掉落物列表
    let FIS_drop_table_head = addElement(FIS_up_R_div, 'div', 'FIS_drop_table_head', 'FIS_table_head_text');
    FIS_drop_table_head.innerHTML = '可能的产物';
    let FIS_drop_table_scroll_box = addElement(FIS_up_R_div, 'div', 'FIS_drop_table_scroll_box', ' overflow_y_div', '');
    let FIS_drop_table_value_div = addElement(FIS_drop_table_scroll_box, 'div', 'FIS_drop_table_value_div', 'in_overflow_div');
    let drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
    drop_value.innerHTML = '无';

    //钓鱼中部，无钓鱼和等鱼上钩阶段时，钓点选择和鱼饵选择ui
    let FIS_wait_middle_div = addElement(FIS_value_div, 'div', 'FIS_wait_middle_div', '', '');
    //中部左侧
    let FIS_M_L_div = addElement(FIS_wait_middle_div, 'div', 'FIS_M_L_div', null);
    // 钓点选择
    let FIS_point_head = addElement(FIS_M_L_div, 'div', 'FIS_point_head', null);
    FIS_point_head.innerHTML = '钓点选择';
    let FIS_point_div = addElement(FIS_M_L_div, 'div', 'FIS_point_div', null);

    //中部右侧，
    let FIS_M_R_div = addElement(FIS_wait_middle_div, 'div', 'FIS_M_R_div', null);
    //鱼饵选择
    let FIS_bait_table_head = addElement(FIS_M_R_div, 'div', 'FIS_bait_table_head', 'FIS_table_head_text');
    FIS_bait_table_head.innerHTML = '鱼饵选择';
    let FIS_bait_table_scroll_box = addElement(FIS_M_R_div, 'div', 'FIS_bait_table_scroll_box', ' overflow_y_div', '');
    let FIS_bait_table_value_div = addElement(FIS_bait_table_scroll_box, 'div', 'FIS_bait_table_value_div', 'in_overflow_div');
    // for (let i = 0; i < 10; i++) {
    //     let bait_value = addElement(FIS_bait_table_value_div, 'div', null, 'FIS_bait_value');
    //     bait_value.innerHTML = '无';
    // }

    //钓鱼中部，遛鱼阶段和钓鱼完成阶段时，将鱼钓上的进度条
    let FIS_walk_middle_div = addElement(FIS_value_div, 'div', 'FIS_walk_middle_div', '', 'none');
    //鱼头像ui的div
    let fish_ui_div = addElement(FIS_walk_middle_div, 'div', 'fish_ui_div', ' ', '');
    let fishing_rod_div = addElement(fish_ui_div, 'div', 'fishing_rod_div', ' ', '');
    fishing_rod_div.innerHTML = '🎣';
    let fish_head = addElement(fish_ui_div, 'div', 'fish_head', ' ', '');
    fish_head.innerHTML = '🐟';
    // fish_head.style.marginLeft = '20px'; // 20像素间距
    //进度条
    var walk_fish_bar = addElement(FIS_walk_middle_div, 'div', 'walk_fish_bar', 'progress_bar player_fishing_bar', '');
    var walk_fish_frame = addElement(walk_fish_bar, 'div', 'walk_fish_frame', 'progress_bar_frame player_fishing_frame'); //条的外框
    var walk_fish_current = addElement(walk_fish_frame, 'div', 'walk_fish_current', 'progress_bar_current player_fishing_current');
    walk_fish_bar.children[0].children[0].style.width = '0%';

    //钓鱼下部，开始按钮
    let FIS_down_div = addElement(FIS_value_div, 'div', 'FIS_down_div', null, '');
    var FIS_S_button = addElement(FIS_down_div, 'button', 'FIS_S_button', 'LP_button', '');
    FIS_S_button.innerHTML = '开始钓鱼';
    var FIS_E_button = addElement(FIS_down_div, 'button', 'FIS_E_button', 'LP_button', 'none');
    FIS_E_button.innerHTML = '停止钓鱼';
}

//为钓鱼界面中的按钮添加交互逻辑
function set_fishing_button(FIS_value_div) {
    let FIS_S_button = FIS_value_div.querySelector('#FIS_S_button');
    let FIS_E_button = FIS_value_div.querySelector('#FIS_E_button');
    //开始钓鱼按钮
    FIS_S_button.onclick = function () {
        //开启钓鱼状态
        global.set_flag('GS_game_statu', 'fishing');
        //开启一轮钓鱼，重置钓鱼的参数
        let live_plan_manage = global.get_live_plan_manage();
        let fishing_manage = live_plan_manage.get_EC_live_skill_manage('fishing_manage');
        fishing_manage.player_start_fishing();
        fishing_manage.reset_round();
        //开始钓鱼按钮切换成停止钓鱼
        FIS_S_button.style.display = 'none';
        FIS_E_button.style.display = '';
    };
    //停止钓鱼按钮
    FIS_E_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let fishing_manage = live_plan_manage.get_EC_live_skill_manage('fishing_manage');
        fishing_manage.stop_game_statu();
        fishing_manage.reset_round();
    };
}
export { make_fishing_div, set_fishing_button };
