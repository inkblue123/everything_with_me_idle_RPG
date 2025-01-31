import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { places } from '../Data/Place/Place.js';
import {
    addElement,
    addBP_item,
    addBP_equipment,
    add_show_Tooltip,
    add_click_Equipment_worn_remove,
    add_aEQP_data,
} from './Dom_function.js';
import { get_BP_type, get_EQP_switch, get_object_only_key, get_EQP_data } from './Get_func.js';
import { show_active_EQP, show_combat_game_div, show_normal_game_div } from './show_func.js';
import { delete_BP_div, delete_equipment_show } from './delete_func.js';
import { Item_type_handle, BP_type_handle, isEmptyObject, hex2Rgba } from './Function.js';
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
//更新战斗界面中，一个敌人的具体表现
function update_enemy_show(enemy, place_x, place_y) {
    let enemy_field = document.getElementById(place_x);
    let enemy_slot = enemy_field.children[1].children[place_y];
    if (enemy.statu) {
        //该敌人活着，更新相关信息
        enemy_slot.innerHTML = enemys[enemy.id].name;
    } else {
        //该敌人死了，清空相关信息
        enemy_slot.innerHTML = '';
    }
}
//移动到id地点，并且更新相关界面
function updata_place(id) {
    //在全局配置中更新地点
    let place_manage = global.get_place_manage();
    place_manage.set_now_place(id);
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
    player.updata_attr();
    //更新装备栏
    updata_equipment_show();
    //更新属性栏
    updata_attribute_show();
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
};
