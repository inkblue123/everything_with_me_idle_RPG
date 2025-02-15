import { get_EQP_switch } from './Get_func.js';
import { updata_attribute_show, updata_player_EQP } from './Updata_func.js';
//点击“属性展示”按钮之后，显示出或者隐藏属性展示界面
function change_PA() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //如果显示了属性界面，则切换成装备栏
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
        //切换到当前激活的装备栏
        show_active_EQP();
    } else {
        attribute_show.style.display = '';
        equipment_show.style.display = 'none';
    }
}
//显示当前激活的装备栏
function show_active_EQP() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');
    //如果当前显示了属性界面，则切换成装备栏
    if (attribute_show.style.display == '') {
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
    }
    //切换到当前激活的的装备栏上
    for (let EQP_column of equipment_show.children) {
        EQP_column.style.display = 'none';
    }
    let EQP_value = get_EQP_switch();
    document.getElementById(EQP_value).style.display = '';
}
//切换背包、技能、图鉴的按钮
function change_BP_SK_IB(button_id) {
    const BP_div = document.getElementById('BP_div');
    const SK_div = document.getElementById('SK_div');
    const IB_div = document.getElementById('IB_div');
    if (button_id == 'BP_switch_button') {
        BP_div.style.display = '';
        SK_div.style.display = 'none';
        IB_div.style.display = 'none';
    }
    if (button_id == 'SK_switch_button') {
        BP_div.style.display = 'none';
        SK_div.style.display = '';
        IB_div.style.display = 'none';
    }
    if (button_id == 'IB_switch_button') {
        BP_div.style.display = 'none';
        SK_div.style.display = 'none';
        IB_div.style.display = '';
    }
}
//切换战斗规划、生活技能、创造合成界面的按钮
function change_CBP_LVP_CTP(button_id) {
    const CBP_div = document.getElementById('CBP_div');
    const LVP_div = document.getElementById('LVP_div');
    const CTP_div = document.getElementById('CTP_div');
    if (button_id == 'CBP_switch_button') {
        CBP_div.style.display = '';
        LVP_div.style.display = 'none';
        CTP_div.style.display = 'none';
    }
    if (button_id == 'LVP_switch_button') {
        CBP_div.style.display = 'none';
        LVP_div.style.display = '';
        CTP_div.style.display = 'none';
    }
    if (button_id == 'CTP_switch_button') {
        CBP_div.style.display = 'none';
        LVP_div.style.display = 'none';
        CTP_div.style.display = '';
    }
}
//按下战斗规划中，主动技能规划、自动恢复规划、自动撤离规划按钮之后，切换到对应的界面
function change_ASP_ARP_AEP(button_id) {
    const ASP_value_scroll_box = document.getElementById('ASP_value_div');
    const ARP_value_scroll_box = document.getElementById('ARP_value_scroll_box');
    const AEP_value_scroll_box = document.getElementById('AEP_value_scroll_box');
    if (button_id == 'ASP_button') {
        ASP_value_scroll_box.style.display = '';
        ARP_value_scroll_box.style.display = 'none';
        AEP_value_scroll_box.style.display = 'none';
    }
    if (button_id == 'ARP_button') {
        ASP_value_scroll_box.style.display = 'none';
        ARP_value_scroll_box.style.display = '';
        AEP_value_scroll_box.style.display = 'none';
    }
    if (button_id == 'AEP_button') {
        ASP_value_scroll_box.style.display = 'none';
        ARP_value_scroll_box.style.display = 'none';
        AEP_value_scroll_box.style.display = '';
    }
}
//点击了隐藏下拉框的按钮之后，展示当前按钮相关的下拉框，隐藏其他下拉框
function show_dropdown_table(classification_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    const Class_div = document.getElementById(classification_div);

    if (dropdownTable) {
        if (dropdownTable.style.display === 'block') {
            // 切换目标下拉框的显示/隐藏状态
            // 如果表格已经显示，则折叠它
            dropdownTable.style.maxHeight = '0';
            setTimeout(() => {
                dropdownTable.style.display = 'none';
            }, 500); // 等待动画完成后隐藏
        } else {
            // 如果表格没有显示，则展开它
            dropdownTable.style.display = 'block';
            setTimeout(() => {
                dropdownTable.style.maxHeight = '300px'; // 最大高度需要根据内容调整
            }, 10); // 让显示状态先更新，再触发动画
        }
    }
    //遍历，并且关闭其他下拉框
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id) {
            // 切换表格的显示/隐藏状态
            if (table.style.display === 'block') {
                // 如果表格已经显示，则折叠它
                table.style.maxHeight = '0';
                setTimeout(() => {
                    table.style.display = 'none';
                }, 500); // 等待动画完成后隐藏
            }
        }
    }
}

//展示战斗时的游戏界面
function show_combat_game_div() {
    const game_up_combat = document.getElementById('game_up_combat');
    const game_up_nomal = document.getElementById('game_up_nomal');
    const create = document.getElementById('create');
    const game_plan = document.getElementById('game_plan');

    game_up_combat.style.display = '';
    game_up_nomal.style.display = 'none';

    create.style.display = 'none';
    game_plan.style.display = '';
}
//展示非战斗时的游戏界面
function show_normal_game_div() {
    const game_up_combat = document.getElementById('game_up_combat');
    const game_up_nomal = document.getElementById('game_up_nomal');
    const create = document.getElementById('create');
    const game_plan = document.getElementById('game_plan');

    game_up_combat.style.display = 'none';
    game_up_nomal.style.display = '';

    create.style.display = '';
    game_plan.style.display = 'none';
}

export {
    change_PA,
    show_active_EQP,
    change_BP_SK_IB,
    change_CBP_LVP_CTP,
    change_ASP_ARP_AEP,
    show_dropdown_table,
    show_combat_game_div,
    show_normal_game_div, //
};
