import { player } from '../Player.js';
import { items } from '../Data/Item/Item.js';

//点击“属性展示”按钮之后，显示出或者隐藏属性展示界面
function change_PA() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //如果显示了属性界面，则切换成装备栏
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
        show_active_EQP();
    } else {
        attribute_show.style.display = '';
        equipment_show.style.display = 'none';
    }
}
//显示当前激活的装备栏
function show_active_EQP() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    let EQP_value;
    // 找到当前激活的装备栏的id
    for (const radio of radios) {
        if (radio.checked) {
            EQP_value = radio.value;
        }
    }
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
//点击了隐藏下拉框的按钮之后，展示当前按钮相关的下拉框，隐藏其他下拉框
function show_dropdown_table(classification_div, table_id) {
    const dropdownTable = document.getElementById(table_id);
    const Class_div = document.getElementById(classification_div);

    // 切换目标下拉框的显示/隐藏状态
    if (dropdownTable.style.display === 'block') {
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

//根据玩家背包物品获得负重
function get_BP_weight() {
    var BP_weight = 0;
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete player.backpack_items[play_item_id];
        } else {
            let aitem_num = player.backpack_items[play_item_id].num;
            BP_weight += Math.floor(aitem_num / items[play_item_id].maxStack);
            if (aitem_num % items[play_item_id].maxStack != 0) {
                BP_weight++;
            }
        }
    }
    console.log('玩家当前背包负重%d', BP_weight);
    return BP_weight;
}

//测试
function printf_play_item() {
    //测试
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    console.log('玩家此时拥有%d种物品', arr.length);
    for (let play_item_id of arr) {
        console.log('玩家拥有%d号物品%d个', play_item_id, player.backpack_items[play_item_id].num);
    }
    console.log('\n');
}

export {
    change_PA, //
    change_BP_SK_IB, //
    show_dropdown_table, //
    printf_play_item, //
    get_BP_weight, //
    show_active_EQP, ///
};
