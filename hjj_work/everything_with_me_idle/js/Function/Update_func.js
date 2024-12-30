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
} from './Dom_function.js';
import { get_BP_type, get_EQP_switch, get_object_only_key } from './Get_func.js';
import { show_active_EQP } from './show_func.js';
import { Item_type_handle, BP_type_handle, isEmptyObject, hex2Rgba } from './Function.js';
//更新血条上的数值
function update_HP() {
    const HP_bar = document.getElementById('HP_bar');
    let player_attr = player.attributes;

    HP_bar.children[0].children[0].style.width = `${(player_attr.health_point / player_attr.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(player_attr.health_point)}/${Math.ceil(player_attr.health_max)} 生命`;
}
//更新魔力条上的数值
function update_MP() {
    const MP_bar = document.getElementById('MP_bar');
    let player_attr = player.attributes;

    MP_bar.children[0].children[0].style.width = `${(player_attr.magic_point / player_attr.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(player_attr.magic_point)}/${Math.ceil(player_attr.magic_max)} 魔力`;
}
//更新精力条上的数值
function update_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');
    let player_attr = player.attributes;

    ENP_bar.children[0].children[0].style.width = `${(player_attr.energy_point / player_attr.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(player_attr.energy_point)}/${Math.ceil(player_attr.energy_max)} 精力`;
}
//更新角色名
function update_player_name() {
    const name_input = document.getElementById('Player_name');
    if (name_input.value.toString().trim().length > 0) {
        player.attributes.name = name_input.value;
    } else {
        player.attributes.name = '我';
    }
    name_input.value = player.attributes.name;
}
//更新左下角的背包物品栏中的元素
function update_BP_value() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品

    let BP_type = get_BP_type(); //获取应该展示的物品类别
    let type_switch = BP_type_handle(BP_type); //获取应该展示的物品类别

    //遍历玩家的每个物品，按照物品的最大堆叠数量，显示到左下的背包中
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete player.backpack_items[play_item_id];
        } else if (Item_type_handle(type_switch, items[play_item_id].type)) {
            if (items[play_item_id].type.includes('equipment')) {
                addBP_equipment(player.backpack_items[play_item_id]);
            }
            if (items[play_item_id].type.includes('material')) {
                addBP_item(player.backpack_items[play_item_id]);
            }
        } else {
            // 玩家拥有的物品不属于当前启动的过滤规则，不显示
        }
    }
}
// 更新装备栏中显示的内容
function update_equipment_show(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //获取装备栏的具体组件
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_div_date = new Object();
    EQP_div_date['main_hand'] = EQP_column_div.children[0].children[0].children[0]; //主手位置;
    EQP_div_date['deputy'] = EQP_column_div.children[0].children[2].children[0]; //副手位置
    EQP_div_date['head'] = EQP_column_div.children[0].children[1].children[0]; //头部位置
    EQP_div_date['chest'] = EQP_column_div.children[0].children[1].children[1]; //胸部位置
    EQP_div_date['legs'] = EQP_column_div.children[0].children[1].children[2]; //腿部位置
    EQP_div_date['feet'] = EQP_column_div.children[0].children[1].children[3]; //脚部位置
    //清空原本信息
    for (let i in EQP_div_date) {
        EQP_div_date[i].innerHTML = texts[i].wearing_name;
        EQP_div_date[i].style.color = hex2Rgba(texts['ordinary'].rarity_color, 1);
        EQP_div_date[i].style.opacity = 0.5;
        // add_click_Equipment_worn_remove(EQP_div_date[i], i);
    }
    //读取玩家身上穿戴的装备信息，显示到装备栏上
    let player_EQP_column = player.get_worn_EQP(EQP_column);
    for (let wearing_position in player_EQP_column) {
        //如果位置上没有装备信息，不处理
        if (isEmptyObject(player_EQP_column[wearing_position])) continue;

        let id = player_EQP_column[wearing_position].id;
        let rarity = get_object_only_key(player_EQP_column[wearing_position].rarity);

        if (types.wearing_position.includes(wearing_position)) {
            EQP_div_date[wearing_position].innerHTML = items[id].name; //装备栏上物品的名称
            EQP_div_date[wearing_position].style.color = hex2Rgba(texts[rarity].rarity_color, 1); //装备栏物品的稀有度颜色
            EQP_div_date[wearing_position].style.opacity = 1; //高亮显示表示已经装备
            add_show_Tooltip(EQP_div_date[wearing_position], 'item', player_EQP_column[wearing_position]); //添加鼠标移动上去显示详细内容的功能
        } else if (wearing_position == 'main_hand_two') {
            //双手武器单独处理
            EQP_div_date['main_hand'].innerHTML = items[id].name;
            EQP_div_date['main_hand'].style.opacity = 1;
            EQP_div_date['main_hand'].style.color = hex2Rgba(texts[rarity].rarity_color, 1);
            add_show_Tooltip(EQP_div_date['main_hand'], 'item', player_EQP_column[wearing_position]);
            EQP_div_date['deputy'].innerHTML = items[id].name;
            EQP_div_date['deputy'].style.opacity = 1;
            EQP_div_date['deputy'].style.color = hex2Rgba(texts[rarity].rarity_color, 1);
            add_show_Tooltip(EQP_div_date['deputy'], 'item', player_EQP_column[wearing_position]);
        } else {
            console.log('异常位置 ：%s', wearing_position);
        }
    }
}

export { update_HP, update_MP, update_ENP, update_player_name, update_BP_value, update_equipment_show };
