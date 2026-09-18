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

// 检查一个元素之后是否还有"实际会显示内容"的兄弟元素。
// display:none 的兄弟元素不参与布局（跳过）；高度为0的兄弟元素（例如内部子按钮全部隐藏的空下拉框）
// 会隔开位置，不会紧贴在本元素下边框处绘制内容。
// 如果之后没有能紧贴绘制下边框的兄弟元素，那么该元素就是父元素中"最后一个实际显示的子元素"：
// 它内部最后一个子元素的下边框(outline)没有其他元素来补，需要设置overflow:visible才不会被裁剪。
// 覆盖了is_last_child_of_parent无法处理的场景：父元素后续兄弟被隐藏
// （例如MH_switch_div中，前期未解锁的原料处理技能按钮被隐藏，导致位于中部的SYN_droptable
// 变成最后一个实际显示的元素，其内部最后一个按钮的下边框会消失）。
function is_last_visible_child_of_parent(element) {
    // 先确保 element 存在且已挂载在 DOM 中（parentNode 不为 null）
    if (!element || !element.parentNode) {
        return false;
    }
    let sibling = element.nextElementSibling;
    while (sibling) {
        // 隐藏的兄弟元素不参与布局，跳过继续向后找
        if (sibling.style.display !== 'none') {
            // 遇到第一个显示中的兄弟元素：
            // 如果它没有实际高度，则它不会紧贴在本元素下边框处绘制内容，
            // 后面的兄弟元素也会被它隔开，同样无法补下边框，视为"最后一个实际显示的子元素"
            return sibling.offsetHeight <= 0;
        }
        sibling = sibling.nextElementSibling;
    }
    // 后面没有兄弟元素，本身就是父元素的最后一个子元素
    return true;
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
                // 展开动画结束后，如果这个dropdown_table之后没有其他实际显示的子元素
                // （是父元素最后一个子元素，或后面的兄弟元素被隐藏/没有高度，例如MH_switch_div中
                // 前期未解锁的原料处理技能按钮被隐藏，导致位于中部的SYN_droptable变成最后一个实际显示元素），
                // 设置overflow:visible，避免其内部最后一个子元素的下边框(outline)被overflow:hidden裁剪
                if (is_last_visible_child_of_parent(dropdownTable)) {
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

//show_dropdown_table 的快速版本：跳过 height 动画和 setTimeout，同步直接设置动画结束后的最终状态。
//与 show_dropdown_table 在运行完毕（300ms 动画结束后）的效果一致：
// - 目标下拉框（table_id，可省略）：展开则折叠，关闭则展开
// - 容器 in_overflow_div 内的其它 .dropdown_table：一律折叠
// 差异仅在"最终态归一化"：所有被关闭的下拉框统一 height:''，不复刻原函数对其它下拉框残留的 height:'0px'。
function show_dropdown_table_fast(in_overflow_div, table_id) {
    //切换目标下拉框的显示/隐藏状态
    if (table_id) {
        const dropdownTable = document.getElementById(table_id);
        if (dropdownTable) {
            if (dropdownTable.style.display === 'flex') {
                //折叠：复位 overflow，直接隐藏
                dropdownTable.style.overflow = '';
                dropdownTable.style.display = 'none';
                dropdownTable.style.height = '';
            } else {
                //展开：直接以最终高度显示
                dropdownTable.style.display = 'flex';
                dropdownTable.style.height = '';
                //若该下拉框是父元素中最后一个实际显示的子元素，设置 overflow:visible，
                //避免其内部最后一个子元素的下边框被 overflow:hidden 裁剪
                if (is_last_visible_child_of_parent(dropdownTable)) {
                    dropdownTable.style.overflow = 'visible';
                }
            }
        }
    }
    //遍历，并且关闭容器内的其他下拉框
    const Class_div = document.getElementById(in_overflow_div);
    let tables = Class_div.querySelectorAll('.dropdown_table');
    for (let table of tables) {
        if (table.id !== table_id && table.style.display === 'flex') {
            //折叠：复位 overflow，直接隐藏
            table.style.overflow = '';
            table.style.display = 'none';
            table.style.height = '';
        }
    }
}

export { show_dropdown_table, show_dropdown_table_fast, change_Live_plan_div, change_Explore_collection_div, change_Material_handling_div };
