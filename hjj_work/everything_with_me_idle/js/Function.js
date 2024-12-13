import { player } from './Player.js';
import { items } from './Data/Item.js';
import { addElement, addBP_value } from './Dom/Dom_function.js';
//更新血条上的数值
function update_HP(p_player) {
    const HP_bar = document.getElementById('HP_bar');

    HP_bar.children[0].children[0].style.width = `${(p_player.health_point / p_player.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(p_player.health_point)}/${Math.ceil(p_player.health_max)} 生命`;
}
//更新魔力条上的数值
function update_MP(p_player) {
    const MP_bar = document.getElementById('MP_bar');

    MP_bar.children[0].children[0].style.width = `${(p_player.magic_point / p_player.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(p_player.magic_point)}/${Math.ceil(p_player.magic_max)} 魔力`;
}
//更新精力条上的数值
function update_ENP(p_player) {
    const ENP_bar = document.getElementById('ENP_bar');

    ENP_bar.children[0].children[0].style.width = `${(p_player.energy_point / p_player.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(p_player.energy_point)}/${Math.ceil(p_player.energy_max)} 精力`;
}
//更新属性展示表格中的数值
function update_attribute_show(p_player) {
    const Player_att = document.getElementById('attribute_show');

    Player_att.children[0].children[0].innerText = `攻击\n${p_player.attack}`;
    Player_att.children[0].children[1].innerText = `精准\n${p_player.precision}`;
    Player_att.children[0].children[2].innerText = `暴击率\n${p_player.critical_chance}`;
    Player_att.children[0].children[3].innerText = `暴击伤害\n${p_player.critical_damage}`;
    Player_att.children[0].children[4].innerText = `攻速\n${p_player.attack_speed}`;
    Player_att.children[0].children[5].innerText = `防御\n${p_player.defense}`;
    Player_att.children[0].children[6].innerText = `闪避\n${p_player.evade}`;
    Player_att.children[0].children[7].innerText = `抵抗力\n${p_player.resistance_point}`;
    Player_att.children[0].children[8].innerText = `移动速度\n${p_player.move_speed}`;

    Player_att.children[1].children[0].innerText = `体格\n${p_player.physique}`;
    Player_att.children[1].children[1].innerText = `魂魄\n${p_player.soul}`;
    Player_att.children[1].children[2].innerText = `经脉\n${p_player.Meridians}`;
    Player_att.children[1].children[3].innerText = `力量\n${p_player.power}`;
    Player_att.children[1].children[4].innerText = `敏捷\n${p_player.agile}`;
    Player_att.children[1].children[5].innerText = `智力\n${p_player.intelligence}`;
    Player_att.children[1].children[6].innerText = `技巧\n${p_player.technique}`;
}
//更新角色名
function update_player_name() {
    const name_input = document.getElementById('Player_name');
    if (name_input.value.toString().trim().length > 0) {
        player.name = name_input.value;
    } else {
        player.name = '我';
    }
    name_input.value = player.name;
}
//点击“属性展示”按钮之后，显示出或者隐藏属性展示界面
function change_PA() {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //如果显示了属性界面，则切换成装备栏
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
        let i = 0;
        let check_num = 0;
        const radios = document.querySelectorAll('input[name="EQP_switch"]');
        for (const radio of radios) {
            if (radio.checked) {
                equipment_show.children[i].style.display = '';
                // alert('Selected option: ' + radio.value);
                // return; // 找到一个选中的按钮后可以结束循环
            } else {
                equipment_show.children[i].style.display = 'none';
            }
            i++;
        }
    } else {
        attribute_show.style.display = '';
        equipment_show.style.display = 'none';
    }
}
//点击某个“装备栏”按钮之后，装备栏的切换
function change_EQP(EQP_value) {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');

    if (attribute_show.style.display == '') {
        //如果当前显示了属性界面，则不操作
        return;
    }
    if (equipment_show.style.display == '') {
        //如果当前显示了装备栏界面，则切换到对应的装备栏上
        for (let i = 0; i < 4; i++) {
            equipment_show.children[i].style.display = 'none';
        }
        equipment_show.children[EQP_value].style.display = '';
    }
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
//更新左下角的背包物品栏中的元素
function update_BP_value(BP_type) {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
    let type_switch = BP_type_handle(BP_type); //获取应该展示的物品类别

    //遍历玩家的每个物品
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete player.backpack_items[play_item_id];
        } else if (Item_type_handle(type_switch, items[play_item_id].type)) {
            //玩家拥有的物品属于当前过滤规则，允许展示
            //根据玩家拥有的个数，在背包界面中添加元素
            let aitem_num = player.backpack_items[play_item_id].num;
            do {
                if (aitem_num >= items[play_item_id].maxStack) {
                    addBP_value(player.backpack_items[play_item_id], items[play_item_id].maxStack);
                    // addBP_value(items[play_item_id].name, items[play_item_id].maxStack, play_item_id);
                    aitem_num -= items[play_item_id].maxStack;
                } else {
                    addBP_value(player.backpack_items[play_item_id], aitem_num);
                    // addBP_value(items[play_item_id].name, aitem_num, play_item_id);
                    aitem_num = 0;
                }
            } while (aitem_num > 0);
        } else {
            // 玩家拥有的物品不属于当前启动的过滤规则，不显示
        }
    }
}

//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_type_handle(BP_type) {
    var BP_item_type = [];
    if (BP_type === undefined) {
        return BP_item_type;
    }
    switch (BP_type) {
        case 'all':
            BP_item_type.push('equipment');
            BP_item_type.push('consumable');
            BP_item_type.push('material');
            break;
        case 'EQP_all':
            BP_item_type.push('equipment');
            break;
        case 'EQP_W':
            BP_item_type.push('weapon');
            break;
        case 'EQP_A':
            BP_item_type.push('armor');
            break;
        case 'EQP_D':
            BP_item_type.push('deputy');
            break;
        case 'EQP_O':
            BP_item_type.push('ornament');
            break;
        case 'CSB_all':
            BP_item_type.push('consumable');
            break;
        case 'CSB_R':
            BP_item_type.push('Restore_CSB');
            break;
        case 'CSB_B':
            BP_item_type.push('buff_CSB');
            break;
        case 'CSB_C':
            BP_item_type.push('combat_CSB');
            break;
        case 'CSB_L':
            BP_item_type.push('life_CSB');
            break;
        case 'MTR_all':
            BP_item_type.push('material');
            break;
        case 'MTR_R':
            BP_item_type.push('raw_MTR');
            break;
        case 'MTR_P':
            BP_item_type.push('process_MTR');
            break;
        case 'MTR_F':
            BP_item_type.push('finish_MTR');
            break;
        case 'MTR_O':
            BP_item_type.push('other_MTR');
            break;

        default:
            break;
    }

    return BP_item_type;
}

//判断物品类型中是否在指定过滤条件内
function Item_type_handle(type_switch, items_type) {
    for (let item_T of items_type) {
        if (type_switch.includes(item_T)) return true;
    }
    return false;
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
            //玩家拥有的物品属于当前过滤规则，允许展示
            //根据玩家拥有的个数，在背包界面中添加元素
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
    update_HP,
    update_MP,
    update_ENP,
    update_attribute_show,
    update_player_name,
    change_PA,
    change_EQP,
    change_BP_SK_IB,
    show_dropdown_table,
    update_BP_value,
    printf_play_item,
    get_BP_weight,
};
