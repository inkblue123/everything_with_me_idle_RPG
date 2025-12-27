import { crtElement, addElement, addElement_radio, addElement_select, addElement_lazy_select } from '../../Function/Dom_function.js';
// import {  } from '../../Function/show_func.js';
import { P_skills, B_skills } from '../../Data/Skill/Skill.js';
import { items } from '../../Data/Item/Item.js';
import { global } from '../../GameRun/global_manage.js';
import { player } from '../../Player/Player.js';

//构建挖矿技能的界面内容
function make_mining_div(MIN_value_div) {
    //挖矿上部，头像和掉落品展示
    let MIN_up_div = addElement(MIN_value_div, 'div', 'MIN_up_div', '', '');
    let ore_head_div = addElement(MIN_up_div, 'div', 'ore_head_div', '', '');
    //矿石的头像
    let ore_head = addElement(ore_head_div, 'div', 'ore_head', 'LP_div', '');
    ore_head.innerHTML = '没有目标';
    //矿石的生命进度条
    var ore_blood_bar = addElement(ore_head_div, 'div', 'ore_blood_bar', 'progress_bar', '');
    var ore_blood_frame = addElement(ore_blood_bar, 'div', 'ore_blood_frame', 'progress_bar_frame'); //条的外框
    var ore_blood_current = addElement(ore_blood_frame, 'div', 'ore_blood_current', 'progress_bar_current'); //长度随当前精力变化的色块
    var ore_blood_number = addElement(ore_blood_bar, 'div', 'ore_blood_number', 'progress_bar_number'); //显示的数字，表示当前精力具体数值
    //掉落物列表
    let MIN_drop_table_div = addElement(MIN_up_div, 'div', 'MIN_drop_table_div', '', '');
    let MIN_drop_table_head = addElement(MIN_drop_table_div, 'div', 'MIN_drop_table_head', 'LP_div', '');
    MIN_drop_table_head.innerHTML = '可能的产物';
    let drop_table_scroll_box = addElement(MIN_drop_table_div, 'div', 'MIN_drop_table_scroll_box', 'LP_div overflow_y_div', '');
    var MIN_drop_table_value_div = addElement(drop_table_scroll_box, 'div', 'MIN_drop_table_value_div', 'in_overflow_div');
    var drop_value = addElement(MIN_drop_table_value_div, 'div', null, 'drop_value');
    drop_value.innerHTML = '无';

    //挖矿中部，挖矿特有机制按钮
    let MIN_middle_div = addElement(MIN_value_div, 'div', 'MIN_middle_div', null, '');
    //中部左侧
    let MIN_M_L_div = addElement(MIN_middle_div, 'div', null, 'MIN_M_div');
    //使用消耗品的进度条
    let MIN_ML_bar_div = addElement(MIN_M_L_div, 'div', null, 'MIN_M_bar_div');
    var MIN_ML_bar = addElement(MIN_ML_bar_div, 'div', 'MIN_ML_bar', 'progress_bar');
    var MIN_ML_frame = addElement(MIN_ML_bar, 'div', 'MIN_ML_frame', 'progress_bar_frame player_mining_frame'); //条的外框
    var MIN_ML_current = addElement(MIN_ML_frame, 'div', 'MIN_ML_current', 'progress_bar_current player_mining_current');
    MIN_ML_bar.children[0].children[0].style.width = '0%';
    //使用消耗品的提示文本
    var MIN_M_UseCSB_label = addElement(MIN_M_L_div, 'div', null, 'MIN_M_label');
    MIN_M_UseCSB_label.innerHTML = '选择消耗品';
    //使用辅助类主动技能的下拉框
    addElement_lazy_select(MIN_M_L_div, 'MIN_M_UseCSB_select', 'MIN_M_select', 'MIN_select', '选择消耗品', '无', get_MIN_use_CSB);

    //中部中侧
    let MIN_M_M_div = addElement(MIN_middle_div, 'div', null, 'MIN_M_div');
    //使用辅助类主动技能的进度条
    let MIN_MM_bar_div = addElement(MIN_M_M_div, 'div', null, 'MIN_M_bar_div');
    var MIN_MM_bar = addElement(MIN_MM_bar_div, 'div', 'MIN_MM_bar', 'progress_bar');
    var MIN_MM_frame = addElement(MIN_MM_bar, 'div', 'MIN_MM_frame', 'progress_bar_frame player_mining_frame'); //条的外框
    var MIN_MM_current = addElement(MIN_MM_frame, 'div', 'MIN_MM_current', 'progress_bar_current player_mining_current');
    MIN_MM_bar.children[0].children[0].style.width = '0%';
    //使用辅助类主动技能的提示文本
    var MIN_M_UseAPS_label = addElement(MIN_M_M_div, 'div', null, 'MIN_M_label');
    MIN_M_UseAPS_label.innerHTML = '选择辅助技能';
    //使用辅助类主动技能的下拉框
    addElement_lazy_select(MIN_M_M_div, 'MIN_M_UseAPS_select', 'MIN_M_select', 'MIN_select', '选择辅助技能', '无', get_MIN_use_APS);

    //中部右侧
    let MIN_M_R_div = addElement(MIN_middle_div, 'div', null, 'MIN_M_div');
    //更换挖矿目标的进度条
    let MIN_MR_bar_div = addElement(MIN_M_R_div, 'div', null, 'MIN_M_bar_div');
    var MIN_MR_bar = addElement(MIN_MR_bar_div, 'div', 'MIN_MR_bar', 'progress_bar');
    var MIN_MR_frame = addElement(MIN_MR_bar, 'div', 'MIN_MR_frame', 'progress_bar_frame player_mining_frame'); //条的外框
    var MIN_MR_current = addElement(MIN_MR_frame, 'div', 'MIN_MR_current', 'progress_bar_current player_mining_current');
    MIN_MR_bar.children[0].children[0].style.width = '0%';
    MIN_MR_bar.style.visibility = 'hidden';
    //更换挖矿目标的按钮
    var MIN_replace_button = addElement(MIN_M_R_div, 'button', 'MIN_replace_button', null);
    MIN_replace_button.innerHTML = '更换目标';

    //挖矿下部，开始按钮
    let MIN_down_div = addElement(MIN_value_div, 'div', 'MIN_down_div', null, '');
    var MIN_start_button = addElement(MIN_down_div, 'button', 'MIN_start_button', 'LP_button', '');
    MIN_start_button.innerHTML = '开始挖矿';
    var MIN_end_button = addElement(MIN_down_div, 'button', 'MIN_end_button', 'LP_button', 'none');
    MIN_end_button.innerHTML = '停止挖矿';
}

//为挖矿界面中的按钮添加交互逻辑
function set_mining_button(MIN_value_div) {
    let MIN_start_button = MIN_value_div.querySelector('#MIN_start_button');
    let MIN_end_button = MIN_value_div.querySelector('#MIN_end_button');
    //开始挖矿按钮
    MIN_start_button.onclick = function () {
        //开启挖矿状态
        global.set_flag('GS_game_statu', 'mining');
        //开启一轮挖矿，重置挖矿的参数
        let live_plan_manage = global.get_live_plan_manage();
        let mining_manage = live_plan_manage.get_EC_live_skill_manage('mining_manage');
        mining_manage.player_start_mining();
        mining_manage.reset_round();
        //开始挖矿按钮切换成停止挖矿
        MIN_start_button.style.display = 'none';
        MIN_end_button.style.display = '';
    };
    //停止挖矿按钮
    MIN_end_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let mining_manage = live_plan_manage.get_EC_live_skill_manage('mining_manage');
        mining_manage.stop_game_statu();
        mining_manage.reset_round();
    };
    // 使用的主动技能变化
    let MIN_M_UseAPS_select = MIN_value_div.querySelector('#MIN_M_UseAPS_select');
    MIN_M_UseAPS_select.addEventListener('change', function () {
        console.log('选择已改变为:', this.value);
    });
    //更换挖矿目标按钮
    let MIN_replace_button = MIN_value_div.querySelector('#MIN_replace_button');
    MIN_replace_button.onclick = function () {
        let live_plan_manage = global.get_live_plan_manage();
        let mining_manage = live_plan_manage.get_EC_live_skill_manage('mining_manage');
        //更换当前挖矿目标
        mining_manage.reborn_ore();
        //停止当前挖矿动作
        mining_manage.stop_game_statu();
    };
}
function get_MIN_use_CSB() {
    let options = new Object();
    //遍历玩家背包物品，寻找消耗品类物品
    let P_backpack = player.get_player_backpack();
    let BP_all_item = P_backpack.get_BP_all_item();
    for (let item_key in BP_all_item) {
        if (BP_all_item[item_key].num == 0) {
            continue;
        }
        let item_id = BP_all_item[item_key].id;
        if (items[item_id].main_type.includes('consumable')) {
            options[item_key] = items[item_id].name;
            // options.push(item_id);
        }
    }
    return options;
}
//获取玩家可以在挖矿中使用的主动技能
function get_MIN_use_APS() {
    let options = new Object();
    //遍历玩家主动技能，寻找带有辅助类型的技能
    let P_All_A_Skills = player.get_player_All_active_skills();
    for (let skill_id in P_All_A_Skills) {
        for (let slot_id of P_skills[skill_id].need_slot_id) {
            if (B_skills[slot_id].active_type == 'auxiliary') {
                options[skill_id] = P_skills[skill_id].name;
                // options.push(skill_id);
                break;
            }
        }
    }
    return options;
}

export { make_mining_div, set_mining_button };
