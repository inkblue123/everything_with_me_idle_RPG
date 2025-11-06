import { crtElement, addElement, addElement_radio } from '../../Function/Dom_function.js';
// import {  } from '../../Function/show_func.js';
import { global } from '../../GameRun/global_manage.js';

//构建伐木技能的界面内容
function make_logging_div(LGI_value_div) {
    //伐木上部，头像和掉落品展示
    let LGI_up_div = addElement(LGI_value_div, 'div', 'LGI_up_div', '', '');
    let tree_head_div = addElement(LGI_up_div, 'div', 'tree_head_div', '', '');
    //树的头像
    let tree_head = addElement(tree_head_div, 'div', 'tree_head', 'LP_div', '');
    tree_head.innerHTML = '没有目标';
    //树的生命进度条
    var tree_blood_bar = addElement(tree_head_div, 'div', 'tree_blood_bar', 'progress_bar', '');
    var tree_blood_frame = addElement(tree_blood_bar, 'div', 'tree_blood_frame', 'progress_bar_frame'); //条的外框
    var tree_blood_current = addElement(tree_blood_frame, 'div', 'tree_blood_current', 'progress_bar_current'); //长度随当前精力变化的色块
    var tree_blood_number = addElement(tree_blood_bar, 'div', 'tree_blood_number', 'progress_bar_number'); //显示的数字，表示当前精力具体数值
    //掉落物列表
    let LGI_drop_table_div = addElement(LGI_up_div, 'div', 'LGI_drop_table_div', '', '');
    let LGI_drop_table_head = addElement(LGI_drop_table_div, 'div', 'LGI_drop_table_head', 'LP_div', '');
    LGI_drop_table_head.innerHTML = '可能的产物';
    let drop_table_scroll_box = addElement(LGI_drop_table_div, 'div', 'LGI_drop_table_scroll_box', 'LP_div overflow_y_div', '');
    var LGI_drop_table_value_div = addElement(drop_table_scroll_box, 'div', 'LGI_drop_table_value_div', 'in_overflow_div');
    var drop_value = addElement(LGI_drop_table_value_div, 'div', null, 'drop_value');
    drop_value.innerHTML = '无';

    //伐木中部，伐木策略方式按钮
    let LGI_middle_div = addElement(LGI_value_div, 'div', 'LGI_middle_div', 'page_columns_111', '');
    //中部左侧
    let LGI_M_L_div = addElement(LGI_middle_div, 'div', null, null);
    //快速伐木的进度条
    var LGI_F_way_bar = addElement(LGI_M_L_div, 'div', 'LGI_F_way_bar', 'progress_bar player_logging_bar', '');
    var LGI_F_way_frame = addElement(LGI_F_way_bar, 'div', 'LGI_F_way_frame', 'progress_bar_frame player_logging_frame'); //条的外框
    var LGI_F_way_current = addElement(LGI_F_way_frame, 'div', 'LGI_F_way_current', 'progress_bar_current player_logging_current');
    LGI_F_way_bar.children[0].children[0].style.width = '0%';

    var LGI_F_way_radio_div = addElement(LGI_M_L_div, 'div', null, 'radio_div LGI_radio_div');
    addElement_radio(LGI_F_way_radio_div, 'LGI_F_way', 'LGI_switch', 'LGI_F_way', '快速伐木');
    LGI_F_way_radio_div.children[0].checked = true; //初始激活该按钮
    //中部中侧
    let LGI_M_M_div = addElement(LGI_middle_div, 'div', null, null);
    //精细伐木的进度条
    var LGI_M_way_bar = addElement(LGI_M_M_div, 'div', 'LGI_M_way_bar', 'progress_bar player_logging_bar', '');
    var LGI_M_way_frame = addElement(LGI_M_way_bar, 'div', 'LGI_M_way_frame', 'progress_bar_frame player_logging_frame'); //条的外框
    var LGI_M_way_current = addElement(LGI_M_way_frame, 'div', 'LGI_M_way_current', 'progress_bar_current player_logging_current');
    //初始隐藏精细伐木进度条
    LGI_M_way_bar.style.visibility = 'hidden';
    LGI_M_way_bar.children[0].children[0].style.width = '0%';

    var LGI_M_way_radio_div = addElement(LGI_M_M_div, 'div', null, 'radio_div LGI_radio_div');
    addElement_radio(LGI_M_way_radio_div, 'LGI_M_way', 'LGI_switch', 'LGI_M_way', '精细伐木');

    //中部右侧
    var LGI_R_button = addElement(LGI_middle_div, 'button', 'LGI_R_button', 'LP_button');
    LGI_R_button.innerHTML = '更换目标';

    //伐木下部，开始按钮
    let LGI_down_div = addElement(LGI_value_div, 'div', 'LGI_down_div', null, '');
    var LGI_S_button = addElement(LGI_down_div, 'button', 'LGI_S_button', 'LP_button', '');
    // var LGI_S_button = addElement(LGI_down_div, 'button', 'LGI_S_button', null, '');
    LGI_S_button.innerHTML = '开始伐木';
    var LGI_E_button = addElement(LGI_down_div, 'button', 'LGI_E_button', 'LP_button', 'none');
    // var LGI_E_button = addElement(LGI_down_div, 'button', 'LGI_E_button', null, 'none');
    LGI_E_button.innerHTML = '停止伐木';
}

//为伐木界面中的按钮添加交互逻辑
function set_logging_button(LGI_value_div) {
    //伐木模式切换
    let radios = LGI_value_div.querySelectorAll('input[type="radio"][name="LGI_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            global.set_flag('GS_logging_way', this.id);
            change_LGI_way(this.id);
            let live_plan_manage = global.get_live_plan_manage();
            let logging_manage = live_plan_manage.get_EC_live_skill_manage('logging_manage');
            logging_manage.updata_logging_way(this.id);
        });
    });

    let LGI_S_button = LGI_value_div.querySelector('#LGI_S_button');
    let LGI_E_button = LGI_value_div.querySelector('#LGI_E_button');
    //开始伐木按钮
    LGI_S_button.onclick = function () {
        //开启伐木状态
        global.set_flag('GS_game_statu', 'logging');
        //开启一轮伐木，重置伐木的参数
        let live_plan_manage = global.get_live_plan_manage();
        let logging_manage = live_plan_manage.get_EC_live_skill_manage('logging_manage');
        logging_manage.player_start_logging();
        logging_manage.reset_round();
        //开始伐木按钮切换成停止伐木
        LGI_S_button.style.display = 'none';
        LGI_E_button.style.display = '';
    };
    //停止伐木按钮
    LGI_E_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let logging_manage = live_plan_manage.get_EC_live_skill_manage('logging_manage');
        logging_manage.stop_game_statu();
        logging_manage.reset_round();
    };
    //更换伐木目标按钮
    let LGI_R_button = LGI_value_div.querySelector('#LGI_R_button');
    LGI_R_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let logging_manage = live_plan_manage.get_EC_live_skill_manage('logging_manage');
        //更换当前伐木目标
        logging_manage.reborn_tree();
        //停止当前伐木动作
        logging_manage.stop_game_statu();
    };
}
//按下伐木界面的伐木策略按钮之后，切换界面显示
function change_LGI_way(button_id) {
    const LGI_F_way_bar = document.getElementById('LGI_F_way_bar');
    const LGI_M_way_bar = document.getElementById('LGI_M_way_bar');
    if (button_id == 'LGI_F_way') {
        //快速伐木
        LGI_F_way_bar.style.visibility = 'visible';
        LGI_M_way_bar.style.visibility = 'hidden';
    }
    if (button_id == 'LGI_M_way') {
        LGI_F_way_bar.style.visibility = 'hidden';
        LGI_M_way_bar.style.visibility = 'visible';
    }
}
export { make_logging_div, set_logging_button };
