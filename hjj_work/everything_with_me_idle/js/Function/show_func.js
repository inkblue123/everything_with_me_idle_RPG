import { player } from '../Player/Player.js';

//点击“属性展示”按钮之后，显示出或者隐藏属性展示界面
function change_PA() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //如果显示了属性界面，则切换成装备栏
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
        //切换到当前激活的装备栏
        let P_worn = player.get_player_worn();
        P_worn.show_active_EQP();
    } else {
        attribute_show.style.display = '';
        equipment_show.style.display = 'none';
    }
}

//切换角色状态界面中的角色属性、角色技能界面的按钮
function change_Player_status_div(button_id) {
    const PAB_div = document.getElementById('PAB_div');
    const PSK_div = document.getElementById('PSK_div');
    if (button_id == 'PAB_switch_button') {
        PAB_div.style.display = '';
        PSK_div.style.display = 'none';
    }
    if (button_id == 'PSK_switch_button') {
        PAB_div.style.display = 'none';
        PSK_div.style.display = '';
    }
}
//切换战斗规划界面中背包、战斗规划窗口的按钮
function change_Combat_plan_div(button_id) {
    const BP_div = document.getElementById('BP_div');
    const CBP_div = document.getElementById('CBP_div');
    if (button_id == 'BP_switch_button') {
        BP_div.style.display = '';
        CBP_div.style.display = 'none';
    }
    if (button_id == 'CBP_switch_button') {
        BP_div.style.display = 'none';
        CBP_div.style.display = '';
    }
}
//切换游戏数据界面中的脑海、图鉴界面的按钮
function change_Game_log_div(button_id) {
    const MD_div = document.getElementById('MD_div');
    const IB_div = document.getElementById('IB_div');
    if (button_id == 'MD_switch_button') {
        MD_div.style.display = '';
        IB_div.style.display = 'none';
    }
    if (button_id == 'IB_switch_button') {
        MD_div.style.display = 'none';
        IB_div.style.display = '';
    }
}
//按下战斗规划中，主动技能规划、自动恢复规划、自动撤离规划按钮之后，切换到对应的子界面
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
//按下游戏日志中，流水账、重要事件按钮之后，切换到对应的子界面
function change_RA_IE(button_id) {
    const RA_value_scroll_box = document.getElementById('RA_value_scroll_box');
    const IE_value_scroll_box = document.getElementById('IE_value_scroll_box');
    if (button_id == 'RA_button') {
        RA_value_scroll_box.style.display = '';
        IE_value_scroll_box.style.display = 'none';
    }
    if (button_id == 'IE_button') {
        RA_value_scroll_box.style.display = 'none';
        IE_value_scroll_box.style.display = '';
    }
}
//按下生活规划中，搜索采集、合成制造按钮之后，切换到对应的子界面
function change_Live_plan_div(button_id) {
    const EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
    const SM_div = document.getElementById('SM_div'); //合成制造窗口 Synthetic_manufacturing SM
    if (button_id == 'EC_switch_button') {
        EC_div.style.display = '';
        SM_div.style.display = 'none';
    }
    if (button_id == 'SM_switch_button') {
        EC_div.style.display = 'none';
        SM_div.style.display = '';
    }
}
//按下生活规划中，搜索采集部分是某一个具体技能之后，切换到对应界面
function change_Explore_collection_div(button_id) {
    let div_obj = ['LBJ', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];

    for (let key of div_obj) {
        let div_id = key + '_value_div';
        let div = document.getElementById(div_id);
        div.style.display = 'none';
        if (button_id == key + '_button') {
            div.style.display = '';
        }
    }
}
//点击了隐藏下拉框的按钮之后，展示当前按钮相关的下拉框，隐藏其他下拉框
function show_dropdown_table(classification_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    let Class_div = document.getElementById(classification_div);

    if (dropdownTable) {
        if (dropdownTable.style.display === 'flex') {
            // 切换目标下拉框的显示/隐藏状态
            // 如果表格已经显示，则折叠它
            dropdownTable.style.maxHeight = '0';
            setTimeout(() => {
                dropdownTable.style.display = 'none';
            }, 500); // 等待动画完成后隐藏
        } else {
            // 如果表格没有显示，则展开它
            dropdownTable.style.display = 'flex';
            setTimeout(() => {
                // const contentHeight = dropdownTable.scrollHeight; // 获取实际内容的高度
                // dropdownTable.style.maxHeight = contentHeight + 'px';
                dropdownTable.style.maxHeight = '500px'; // 最大高度需要根据内容调整
            }, 10); // 让显示状态先更新，再触发动画
        }
    }
    //遍历，并且关闭其他下拉框
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id) {
            // 切换表格的显示/隐藏状态
            if (table.style.display === 'flex') {
                // 如果表格已经显示，则折叠它
                table.style.maxHeight = '0';
                setTimeout(() => {
                    table.style.display = 'none';
                }, 500); // 等待动画完成后隐藏
            }
        }
    }
}

export {
    change_PA,
    change_Player_status_div,
    change_Combat_plan_div,
    change_Game_log_div,
    change_ASP_ARP_AEP,
    change_RA_IE,
    show_dropdown_table,
    change_Live_plan_div,
    change_Explore_collection_div,
};
