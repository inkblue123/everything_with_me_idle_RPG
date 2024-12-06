import { player } from './Player.js';
//更新血条上的数值
function update_HP() {
    const HP_bar = document.getElementById('HP_bar');

    HP_bar.children[0].children[0].style.width = `${(player.health_point / player.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(player.health_point)}/${Math.ceil(player.health_max)} 生命`;
}
//更新魔力条上的数值
function update_MP() {
    const MP_bar = document.getElementById('MP_bar');

    MP_bar.children[0].children[0].style.width = `${(player.magic_point / player.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(player.magic_point)}/${Math.ceil(player.magic_max)} 魔力`;
}
//更新精力条上的数值
function update_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');

    ENP_bar.children[0].children[0].style.width = `${(player.energy_point / player.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(player.energy_point)}/${Math.ceil(player.energy_max)} 精力`;
}
//更新属性展示表格中的数值
function update_attribute_show() {
    const Player_att = document.getElementById('attribute_show');

    Player_att.children[0].children[0].innerText = `攻击\n${player.attack}`;
    Player_att.children[0].children[1].innerText = `精准\n${player.precision}`;
    Player_att.children[0].children[2].innerText = `暴击率\n${player.critical_chance}`;
    Player_att.children[0].children[3].innerText = `暴击伤害\n${player.critical_damage}`;
    Player_att.children[0].children[4].innerText = `攻速\n${player.attack_speed}`;
    Player_att.children[0].children[5].innerText = `防御\n${player.defense}`;
    Player_att.children[0].children[6].innerText = `闪避\n${player.evade}`;
    Player_att.children[0].children[7].innerText = `抵抗力\n${player.resistance_point}`;
    Player_att.children[0].children[8].innerText = `移动速度\n${player.move_speed}`;

    Player_att.children[1].children[0].innerText = `体格\n${player.physique}`;
    Player_att.children[1].children[1].innerText = `魂魄\n${player.soul}`;
    Player_att.children[1].children[2].innerText = `经脉\n${player.Meridians}`;
    Player_att.children[1].children[3].innerText = `力量\n${player.power}`;
    Player_att.children[1].children[4].innerText = `敏捷\n${player.agile}`;
    Player_att.children[1].children[5].innerText = `智力\n${player.intelligence}`;
    Player_att.children[1].children[6].innerText = `技巧\n${player.technique}`;
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
function update_BP(button_id) {
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
    // show_dropdown_table2,
};
