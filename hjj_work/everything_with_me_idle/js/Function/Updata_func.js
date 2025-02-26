import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { places } from '../Data/Place/Place.js';
import {
    addElement,
    addBP_item,
    addBP_equipment,
    add_show_Tooltip,
    add_click_Equipment_worn_remove,
    add_aEQP_data,
    add_ASP_skill,
} from './Dom_function.js';
import {
    get_BP_type,
    get_EQP_switch,
    get_object_only_key, //
    get_EQP_data,
    get_ASP_type,
} from './Get_func.js';
import { show_combat_game_div, show_normal_game_div } from './show_func.js';
import {
    delete_BP_div,
    delete_ASP_div,
    delete_equipment_show,
    delete_player_active_div,
    delete_active_show_div,
} from './delete_func.js';
import { Item_type_handle, BP_type_handle, isEmptyObject, hex2Rgba, ASP_type_handle } from './Function.js';
import { dom } from '../Dom/Dom.js';
import { global } from '../GameRun/global_class.js';
//更新血条上的数值
function updata_HP() {
    const HP_bar = document.getElementById('HP_bar');
    let P_attr = player.get_player_attributes();
    let health_point = P_attr.get_health_point();
    let health_max = P_attr.get_a_attr('health_max');

    HP_bar.children[0].children[0].style.width = `${(health_point / health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(health_point)}/${Math.ceil(health_max)} 生命`;
}
//更新魔力条上的数值
function updata_MP() {
    const MP_bar = document.getElementById('MP_bar');
    let P_attr = player.get_player_attributes();
    let magic_point = P_attr.get_magic_point();
    let magic_max = P_attr.get_a_attr('magic_max');

    MP_bar.children[0].children[0].style.width = `${(magic_point / magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(magic_point)}/${Math.ceil(magic_max)} 魔力`;
}
//更新精力条上的数值
function updata_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');
    let P_attr = player.get_player_attributes();
    let energy_point = P_attr.get_energy_point();
    let energy_max = P_attr.get_a_attr('energy_max');

    ENP_bar.children[0].children[0].style.width = `${(energy_point / energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(energy_point)}/${Math.ceil(energy_max)} 精力`;
}
//更新角色名
function updata_player_name() {
    const name_input = document.getElementById('Player_name');
    let P_attr = player.get_player_attributes();

    //获取更新后的玩家名称
    if (name_input.value.toString().trim().length > 0) {
        P_attr.name = name_input.value;
    } else {
        P_attr.name = '玩家';
    }
    //修改左上玩家状态界面
    name_input.value = P_attr.name;
    //修改战斗界面玩家名称显示
    let MCP_player_head = document.getElementById('MCP_player_head');
    MCP_player_head.innerHTML = P_attr.name;
}
//更新左下角的背包物品栏中的元素
function updata_BP_value() {
    //清空左下角背包界面的所有元素
    delete_BP_div();
    //获取应该展示的物品类别
    let BP_type = get_BP_type();
    //转义物品类别
    let type_switch = BP_type_handle(BP_type);

    //遍历玩家的每个物品，按照物品的最大堆叠数量，显示到左下的背包中
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            console.log('updata_BP_value : 玩家拥有未定义物品 id=%s', play_item_id);
            delete player.backpack_items[play_item_id];
        } else if (Item_type_handle(type_switch, play_item_id)) {
            if (items[play_item_id].main_type.includes('equipment')) {
                addBP_equipment(player.backpack_items[play_item_id]);
            } else if (items[play_item_id].main_type.includes('material')) {
                addBP_item(player.backpack_items[play_item_id]);
            }
        } else {
            // 玩家拥有的物品不属于当前启动的过滤规则，不显示
        }
    }
}
// 更新装备栏中显示的内容
function updata_equipment_show(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //清空原本装备栏的内容
    delete_equipment_show(EQP_column);
    //获取装备栏的具体组件
    let EQP_div_data = get_EQP_data(EQP_column);
    //读取玩家身上穿戴的装备信息，显示到装备栏上
    let player_worn_EQP = player.get_player_worn_EQP();
    let player_EQP_column = player_worn_EQP.get_worn_EQP(EQP_column);
    for (let wearing_position in player_EQP_column) {
        //如果位置上没有装备信息，不处理
        if (isEmptyObject(player_EQP_column[wearing_position])) continue;

        if (enums.wearing_position.includes(wearing_position)) {
            add_aEQP_data(player_EQP_column[wearing_position], wearing_position, 1);
        } else if (wearing_position == 'main_hand_two') {
            //双手武器单独处理
            add_aEQP_data(player_EQP_column[wearing_position], 'main_hand', 1);
            add_aEQP_data(player_EQP_column[wearing_position], 'deputy', 1);
        } else {
            console.log('异常位置 ：%s', wearing_position);
        }
    }
}
//更新玩家属性展示表格中的数值
function updata_attribute_show() {
    const combat_attr_show = document.getElementById('combat_attribute_show');
    const player_base_attr = document.getElementById('Player_attribute_show');

    let P_attr = player.get_player_attributes();

    //表格排序，从左到右，从上到下，右半边表示玩家基础属性
    //战斗属性中，前5个是攻击属性
    let i = 0;
    for (let id of enums.combat_attack_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        combat_attr_show.children[i].innerText = ch;
        i++;
    }
    //然后是4个是防御属性
    for (let id of enums.combat_defense_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        combat_attr_show.children[i].innerText = ch;
        i++;
    }
    //7个玩家基础属性
    i = 0;
    for (let id of enums.player_base_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        player_base_attr.children[i].innerText = ch;
        i++;
    }
}
//玩家主动技能槽数量变动，更新界面展示
function updata_player_active_slots_num() {
    let P_Askill = player.get_player_ASkill_Manage();
    let num = P_Askill.get_slot_num();

    //战斗界面-主动技能槽的数量
    let player_active_div = document.getElementById('player_active_div');
    for (let i = 0; i < 9; i++) {
        if (i < num) {
            player_active_div.children[i].style.display = '';
        } else {
            player_active_div.children[i].style.display = 'none';
        }
    }

    //战斗界面-主动技能进度条的长度
    //将目标槽拷贝到一个可见的，不影响布局的临时窗口内，获取宽度
    var clonedChild = player_active_div.children[0].cloneNode(true);
    var tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute'; // 不影响布局
    tempContainer.style.visibility = 'hidden'; // 保证父元素不可见不会影响布局
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedChild);
    let aslot_width = clonedChild.offsetWidth; //获取一个槽的宽度
    document.body.removeChild(tempContainer);
    // 获取槽之间的间隔
    let divStyle = window.getComputedStyle(player_active_div);
    let div_gap = parseInt(divStyle.gap, 10);
    //计算进度条应该有多长
    let active_time_width = (num - 1) * div_gap + num * aslot_width;
    let active_time_frame = document.getElementById('active_time_frame');
    active_time_frame.style.width = `${active_time_width}px`;

    //游戏规划界面-战斗规划-主动技能规划中展示的主动技能槽数量
    let active_show_div = document.getElementById('active_show_div');
    for (let i = 0; i < 9; i++) {
        if (i < num) {
            active_show_div.children[i].style.display = '';
        } else {
            active_show_div.children[i].style.display = 'none';
        }
    }
}
//玩家主动技能的内容发生变动，更新界面展示
function updata_player_active_show() {
    //清空原有内容
    delete_player_active_div();
    delete_active_show_div();
    let player_active_div = document.getElementById('player_active_div'); //战斗界面，玩家主动技能展示框
    let active_show_div = document.getElementById('active_show_div'); //战斗规划界面，主动技能规划展示框
    let P_Askill = player.get_player_ASkill_Manage();
    let num = P_Askill.get_slot_num();
    let active_slots = P_Askill.get_active_slots();
    for (let i = 0; i < num; i++) {
        //
        if (!isEmptyObject(active_slots[i])) {
            let skill_id = active_slots[i].id;
            let slot_num = active_slots[i].slot_num;
            //战斗界面，玩家主动技能展示框
            if (texts[skill_id].skill_name.length >= 10) {
                player_active_div.children[i].children[0].innerHTML = texts[skill_id].mini_skill_name;
            } else {
                player_active_div.children[i].children[0].innerHTML = texts[skill_id].skill_name;
            }
            player_active_div.children[i].data = active_slots[i];
            add_show_Tooltip(player_active_div.children[i], 'active_skill', active_slots[i]); //添加鼠标移动之后展示该槽位设置的主动技能

            //战斗规划界面，主动技能规划展示框
            let active_type = active_slots[i].active_type;
            active_show_div.children[i].style.backgroundColor = enums[active_type].active_show_color;
            active_show_div.children[i].data = active_slots[i];
            add_show_Tooltip(active_show_div.children[i], 'active_skill', active_slots[i]); //添加鼠标移动之后展示该槽位设置的主动技能
        }
    }
    let use_slots_num = P_Askill.get_use_active_slots_num();
    let un_use_active_time_frame = document.getElementById('un_use_active_time_frame');
    un_use_active_time_frame.style.width = `${100 * ((num - use_slots_num) / num)}%`;
}

//更新玩家主动技能进度条的进度
function updata_player_active_time_bar() {
    //
    let P_Askill = player.get_player_ASkill_Manage();
    let use_slots_num = P_Askill.get_use_active_slots_num();
    let max_ratio = 100 * (use_slots_num / P_Askill.active_slot_num);
    let bar_ratio = (P_Askill.now_round_time / P_Askill.max_round_time) * max_ratio;
    if (bar_ratio > max_ratio) {
        bar_ratio = max_ratio;
    }
    const active_time_bar = document.getElementById('active_time_bar');
    active_time_bar.children[0].children[0].style.width = `${bar_ratio}%`;
}
//更新战斗界面中的所有敌人
function update_enemy_show() {
    let enemy_manage = global.get_enemy_manage();
    let combat_place_enemys = enemy_manage.get_combat_place_enemys();
    for (let place_x in combat_place_enemys) {
        for (let place_y = 0; place_y < 9; place_y++) {
            //获取战斗界面中的敌人框
            let enemy_field = document.getElementById(place_x);
            let enemy_slot = enemy_field.children[1].children[place_y];
            let enemy_HP_bar = enemy_slot.querySelector('.enemy_HP_bar');
            let enemy_attr_bar = enemy_slot.querySelector('.enemy_attr_bar');
            let enemy_head = enemy_slot.querySelector('.enemy_head');
            //获取敌人信息
            let field = combat_place_enemys[place_x];
            let enemy = field[place_y];
            if (enemy.statu) {
                //该敌人活着，更新相关信息
                enemy_HP_bar.style.display = '';
                enemy_HP_bar.children[0].children[0].style.width = enemy.get_HP_ratio();
                enemy_attr_bar.style.display = '';
                enemy_attr_bar.children[0].children[0].style.width = enemy.get_attack_ratio();
                enemy_head.innerHTML = enemys[enemy.id].name;
            } else {
                //该敌人死了，清空相关信息
                enemy_HP_bar.style.display = 'none';
                enemy_attr_bar.style.display = 'none';
                enemy_head.innerHTML = '';
            }
        }
    }
}
//移动到id地点，并且更新相关界面
function updata_place(id) {
    //在全局配置中更新地点
    let place_manage = global.get_place_manage();
    place_manage.set_now_place(id);
    //清除旧地点中的内容
    let enemy_manage = global.get_enemy_manage();
    enemy_manage.delete_all_enemy();
    update_enemy_show();
    let P_Askill = player.get_player_ASkill_Manage();
    P_Askill.reset_round();
    // 获取玩家控制界面
    let control = document.getElementById('control');
    //展示新地点的内容
    control.change_place(id);
    //触发新地点的转场
    let new_place = places[id];
    if (new_place.type == 'combat') {
        show_combat_game_div();
    } else if (new_place.type == 'normal') {
        show_normal_game_div();
    }
}
//玩家装备信息发生变动，更新相关界面
function updata_player_EQP() {
    //更新玩家属性
    player.updata_attr(true);
    //更新装备栏
    updata_equipment_show();
    //更新属性栏
    updata_attribute_show();
}
//玩家主动技能发生变动，更新相关界面
function updata_player_active() {
    //更新玩家属性
    player.updata_attr(true);
    //更新主动技能框的展示内容
    updata_player_active_show();
    //更新主动技能进度条的总长度
    updata_player_active_slots_num();
}
//更新右下角的游戏规划中战斗规划的主动技能规划部分的内容
function updata_ASP_value() {
    //清空主动技能规划界面的所有元素
    delete_ASP_div();
    //获取应该展示的主动技能过滤条件
    let ASP_type = get_ASP_type();
    //获取在这个过滤条件下应该展示的技能id
    let arr = ASP_type_handle(ASP_type);
    //展示这些技能
    for (let skill_id of arr) {
        add_ASP_skill(skill_id);
    }
}

export {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_player_name,
    updata_BP_value,
    updata_equipment_show,
    updata_attribute_show,
    updata_player_EQP,
    updata_place,
    update_enemy_show,
    updata_player_active_slots_num,
    updata_player_active_show,
    updata_player_active,
    updata_player_active_time_bar,
    updata_ASP_value,
};
