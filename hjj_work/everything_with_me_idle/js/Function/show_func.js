import { player } from '../Player/Player.js';

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
    let div_obj = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];

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
function show_dropdown_table(in_overflow_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    let Class_div = document.getElementById(in_overflow_div);

    if (dropdownTable) {
        if (dropdownTable.style.display === 'flex') {
            // 切换目标下拉框的显示/隐藏状态
            // 如果表格已经显示，则折叠它
            const contentHeight = dropdownTable.scrollHeight;
            dropdownTable.style.height = contentHeight + 'px';
            // 强制重排，确保height变化被浏览器识别
            dropdownTable.offsetHeight;
            // 开始折叠动画
            dropdownTable.style.height = '0px';
            setTimeout(() => {
                dropdownTable.style.display = 'none';
                dropdownTable.style.height = '';
            }, 300); // 等待动画完成后隐藏
        } else {
            // 如果表格没有显示，则展开它
            dropdownTable.style.display = 'flex';
            dropdownTable.style.height = '0px';
            // 强制重排，确保height变化被浏览器识别
            dropdownTable.offsetHeight;
            // 开始折叠动画
            const contentHeight = dropdownTable.scrollHeight;
            dropdownTable.style.height = contentHeight + 'px';
            setTimeout(() => {
                dropdownTable.style.height = ''; // 最大高度需要根据内容调整
            }, 300); // 让显示状态先更新，再触发动画
        }
    }
    //遍历，并且关闭其他下拉框
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id) {
            // 切换表格的显示/隐藏状态
            if (table.style.display === 'flex') {
                // 如果表格已经显示，则折叠它
                const contentHeight = table.scrollHeight;
                table.style.height = contentHeight + 'px';
                // 强制重排，确保height变化被浏览器识别
                table.offsetHeight;
                // 开始折叠动画
                table.style.height = '0px';
                setTimeout(() => {
                    table.style.display = 'none';
                }, 300); // 等待动画完成后隐藏
            }
        }
    }
}

export { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div };
