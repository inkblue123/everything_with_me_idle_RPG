import { player } from '../Player/Player.js';

//按下生活规划中，搜索采集、原料处理按钮之后，切换到对应的子界面
function change_Live_plan_div(button_id) {
    const EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
    const MH_div = document.getElementById('MH_div'); //原料处理窗口 Material_handling MH
    if (button_id == 'EC_switch_button') {
        EC_div.style.display = '';
        MH_div.style.display = 'none';
    }
    if (button_id == 'MH_switch_button') {
        EC_div.style.display = 'none';
        MH_div.style.display = '';
    }
}
//按下生活规划中，搜索采集部分的某一个具体技能之后，切换到对应界面
function change_Explore_collection_div(button_id) {
    let div_obj = ['LGI', 'FIS', 'MIN', 'CLT', 'DIV', 'ACL', 'ELT'];

    for (let key of div_obj) {
        let div_id = key + '_value_div';
        let div = document.getElementById(div_id);
        div.style.display = 'none';
        if (button_id == key + '_button') {
            div.style.display = '';
        }
    }
}
//按下生活规划中，原料处理部分的某一个具体技能之后，切换到对应界面
function change_Material_handling_div(button_id) {
    let div_obj = ['SYN', 'COK', 'FRG', 'EXA', 'HBB', 'EGV', 'ACM'];

    for (let key of div_obj) {
        let div_id = key + '_value_div';
        let div = document.getElementById(div_id);
        div.style.display = 'none';
        if (button_id == key + '_button') {
            div.style.display = '';
        }
    }
}

// 检查一个元素是否是其父元素的最后一个元素子节点
function is_last_child_of_parent(element) {
    /**
     * lastElementChild 会跳过空白文本节点，只匹配元素节点，
     * 因此即使 DOM 中各元素之间有换行/缩进也不会误判。
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    // 先确保 element 存在且已挂载在 DOM 中（parentNode 不为 null）
    if (!element || !element.parentNode) {
        return false;
    }
    // 用 lastElementChild 做恒等比较：只匹配元素，忽略文本/注释节点
    return element.parentNode.lastElementChild === element;
}
//点击了隐藏下拉框的按钮之后，展示当前按钮相关的下拉框，隐藏其他下拉框
function show_dropdown_table(in_overflow_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    let Class_div = document.getElementById(in_overflow_div);

    if (dropdownTable) {
        if (dropdownTable.style.display === 'flex') {
            // 折叠前，如果之前展开时设置了overflow:visible，先恢复hidden确保动画正常裁剪
            if (dropdownTable.style.overflow === 'visible') {
                dropdownTable.style.overflow = '';
            }
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
            // 开始展开动画
            const contentHeight = dropdownTable.scrollHeight;
            dropdownTable.style.height = contentHeight + 'px';
            setTimeout(() => {
                dropdownTable.style.height = ''; // 最大高度需要根据内容调整
                // 如果这个dropdown_table是父元素的最后一个子元素，展开后设置overflow:visible，
                // 避免其内部最后一个子元素的下边框(outline)被overflow:hidden裁剪
                if (is_last_child_of_parent(dropdownTable)) {
                    dropdownTable.style.overflow = 'visible';
                }
            }, 300); // 让显示状态先更新，再触发动画
        }
    }
    //遍历，并且关闭其他下拉框
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id) {
            // 切换表格的显示/隐藏状态
            if (table.style.display === 'flex') {
                // 折叠前，如果之前展开时设置了overflow:visible，先恢复hidden确保动画正常裁剪
                if (table.style.overflow === 'visible') {
                    table.style.overflow = '';
                }
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

export { show_dropdown_table, change_Live_plan_div, change_Explore_collection_div, change_Material_handling_div };
