import { player } from '../Player/player.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { types } from '../Data/Type.js';
import {
    addElement,
    addBP_item,
    addBP_equipment,
    add_show_Tooltip,
    add_click_Equipment_worn_remove,
    add_aEQP_data,
} from './Dom_function.js';
import { get_BP_type, get_EQP_switch, get_object_only_key, get_EQP_data } from './Get_func.js';
import { show_active_EQP } from './show_func.js';
import { delete_BP_div, delete_equipment_show } from './delete_func.js';
import { Item_type_handle, BP_type_handle, isEmptyObject, hex2Rgba } from './Function.js';
//更新血条上的数值
function updata_HP() {
    const HP_bar = document.getElementById('HP_bar');
    let player_attr = player.attributes;

    HP_bar.children[0].children[0].style.width = `${(player_attr.health_point / player_attr.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(player_attr.health_point)}/${Math.ceil(player_attr.health_max)} 生命`;
}
//更新魔力条上的数值
function updata_MP() {
    const MP_bar = document.getElementById('MP_bar');
    let player_attr = player.attributes;

    MP_bar.children[0].children[0].style.width = `${(player_attr.magic_point / player_attr.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(player_attr.magic_point)}/${Math.ceil(player_attr.magic_max)} 魔力`;
}
//更新精力条上的数值
function updata_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');
    let player_attr = player.attributes;

    ENP_bar.children[0].children[0].style.width = `${(player_attr.energy_point / player_attr.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(player_attr.energy_point)}/${Math.ceil(player_attr.energy_max)} 精力`;
}
//更新角色名
function updata_player_name() {
    const name_input = document.getElementById('Player_name');
    if (name_input.value.toString().trim().length > 0) {
        player.attributes.name = name_input.value;
    } else {
        player.attributes.name = '我';
    }
    name_input.value = player.attributes.name;
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
            delete player.backpack_items[play_item_id];
        } else if (Item_type_handle(type_switch, items[play_item_id].type)) {
            if (items[play_item_id].type.includes('equipment')) {
                addBP_equipment(player.backpack_items[play_item_id]);
            } else if (items[play_item_id].type.includes('material')) {
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
    let player_EQP_column = player.get_worn_EQP(EQP_column);
    for (let wearing_position in player_EQP_column) {
        //如果位置上没有装备信息，不处理
        if (isEmptyObject(player_EQP_column[wearing_position])) continue;

        if (types.wearing_position.includes(wearing_position)) {
            add_aEQP_data(EQP_div_data[wearing_position], player_EQP_column[wearing_position], wearing_position, 1);
        } else if (wearing_position == 'main_hand_two') {
            //双手武器单独处理
            add_aEQP_data(EQP_div_data['main_hand'], player_EQP_column[wearing_position], 'main_hand', 1);
            add_aEQP_data(EQP_div_data['deputy'], player_EQP_column[wearing_position], 'deputy', 1);
        } else {
            console.log('异常位置 ：%s', wearing_position);
        }
    }
}

export { updata_HP, updata_MP, updata_ENP, updata_player_name, updata_BP_value, updata_equipment_show };
