import { addElement } from '../../Function/Dom_function.js';
import { get_object_only_key } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';
import { items } from '../../Data/Item/Item.js';
import { texts } from '../../Data/Text/Text.js';

import { Tooltip } from './Tooltip.js';

//传入玩家的一个物品拷贝对象，展示这个物品的详细信息
function init_item_tip(player_item) {
    //展示物品的名称和描述
    if (!show_item_name_description(player_item)) {
        return false; //异常物品，中止展示
    }
    //根据物品的大类别，追加展示额外的信息
    if (items[player_item.id].main_type.includes('equipment')) {
        show_equipment(player_item);
    } else if (items[player_item.id].main_type.includes('material')) {
        show_material(player_item);
    }
}
//展示物品的名称和描述
function show_item_name_description(player_item) {
    let item_id = player_item.id;

    if (items[item_id] === undefined) {
        let label = addElement(Tooltip, 'div', null, 'lable_down');
        label.innerHTML = '未定义物品';
        let text = addElement(Tooltip, 'div', null, 'lable_down');
        text.innerHTML = '物品id为 : ' + item_id;
        return false;
    }
    let label = addElement(Tooltip, 'div', null, 'lable_down');
    if (items[player_item.id].main_type.includes('equipment')) {
        //为装备的名称上色
        let rarity = get_object_only_key(player_item.rarity);
        label.style.color = enums[rarity].rarity_color;
    }
    label.innerHTML = items[item_id].name; //物品名称
    let text = addElement(Tooltip, 'div', null, 'lable_down');
    text.innerHTML = items[item_id].desc; //物品描述
    return true;
}
//针对武器装备，追加展示稀有度，详细类型，可装备位置
function show_equipment(show_item) {
    //装备类型详情展示
    let show_item_rarity = show_equipment_type(show_item);
    if (show_item_rarity == 'damaged') {
        //展示的物品是破损稀有度的装备，已经展示完毕
        return;
    }
    //展示可装备位置
    show_equipment_wearing_position(show_item);
    //装备属性
    show_equipment_attr(show_item);

    return true;
}

//追加展示装备类型详情
function show_equipment_type(show_item) {
    let type_and_rarity_div = addElement(Tooltip, 'div', null, 'TLV_div');
    //类型展示
    let type_div = addElement(type_and_rarity_div, 'div', null, 'TLV_div');
    let T_type = addElement(type_div, 'div', null, 'TLV_left');
    T_type.innerHTML = '装备类型：';
    let T_value = addElement(type_div, 'div', null, 'TLV_right');
    let type_describe = addElement(Tooltip, 'div', null, 'lable_down');
    //稀有度展示
    let rarity_div = addElement(type_and_rarity_div, 'div', null, 'TLV_div');
    let R_type = addElement(rarity_div, 'div', null, 'TLV_left');
    R_type.innerHTML = '稀有度：';
    let R_value = addElement(rarity_div, 'div', null, 'TLV_right');
    let show_item_rarity;
    for (show_item_rarity in show_item.rarity) {
        R_value.innerHTML = texts[show_item_rarity].rarity_name;
        rarity_div.style.color = enums[show_item_rarity].rarity_color;
    }
    let type_ch = '';
    //武器类型获取，类型描述展示
    let type_num = items[show_item.id].secon_type.length;
    if (type_num == 0) {
        type_ch = '错误武器类型';
    } else if (type_num == 1) {
        //单种类武器
        let e_type = items[show_item.id].secon_type[0]; //获取这唯一的武器类型
        type_ch = texts[e_type].type_name; //获取类型名称
        type_describe.innerHTML = texts[e_type].type_desc; //展示武器类型的描述
    } else if (type_num > 1) {
        //复合类型武器
        for (let e_type of items[show_item.id].secon_type) {
            type_ch = type_ch + texts[e_type].type_name + '，';
        }
        type_ch = type_ch.substring(0, type_ch.length - 1);
        type_describe.innerHTML = '同时拥有' + type_ch + '的特性';
    }
    T_value.innerHTML = type_ch;
    if (show_item_rarity == 'damaged') {
        //破损武器描述
        type_describe.innerHTML = texts[show_item_rarity].type_desc;
        return 'damaged';
    }

    return true;
}
//追加展示可装备位置
function show_equipment_wearing_position(show_item) {
    let item_id = show_item.id;
    let wearing_position_lable = addElement(Tooltip, 'div', null, 'lable_down');
    if (items[item_id].wearing_position.length == 1) {
        let wearing = items[item_id].wearing_position[0];
        wearing_position_lable.innerHTML = texts[wearing].wearing_desc;
    } else {
        let wearing_ch = '这件装备可以放在';
        for (let wearing of items[item_id].wearing_position) {
            wearing_ch = wearing_ch + texts[wearing].wearing_name + '、';
        }
        wearing_ch = wearing_ch.substring(0, wearing_ch.length - 1);
        wearing_ch += '位置上';
        wearing_position_lable.innerHTML = wearing_ch;
    }
}
//追加展示装备属性
function show_equipment_attr(show_item) {
    let id = show_item.id;
    let attr_div = addElement(Tooltip, 'div', null, 'page_columns_111');
    for (let attr in items[id].equip_attr) {
        if (items[id].equip_attr[attr] != 0) {
            let TLV_div = addElement(attr_div, 'div', null, 'table_3_value');
            // 属性名称
            let T_name = addElement(TLV_div, 'div', null, 'TLV_left');
            if (texts[attr].attr_name.length > 3) {
                T_name.innerHTML = texts[attr].min_attr_name; //完整名称太长,选用简称
            } else {
                T_name.innerHTML = texts[attr].attr_name;
            }
            //属性数值
            let T_value = addElement(TLV_div, 'div', null, 'TLV_right');
            if (enums.need_per_cent_attr.includes(attr)) {
                //这是需要用百分号表示的属性
                T_value.innerHTML = '+' + items[id].equip_attr[attr] + '%';
            } else if (attr == 'attack_speed') {
                //回旋武器的攻击速度单独处理
                if (items[id].secon_type.includes('boomerang')) {
                    // this.EQP_attr[i] += items[id].equip_attr[i] / num;
                    T_value.innerHTML = '+(' + items[id].equip_attr[attr] + '/' + show_item.num + ')秒';
                } else {
                    T_value.innerHTML = '+' + items[id].equip_attr[attr] + '秒';
                }
            } else {
                //其他属性
                T_value.innerHTML = '+' + items[id].equip_attr[attr];
            }
        }
    }
}

//针对材料，追加展示材料类型，
function show_material(show_item) {
    //材料类型详情展示
    show_material_type(show_item);
    //材料来源和用处展示
    show_material_source_use(show_item);

    return true;
}
//追加展示材料类型详情
function show_material_type(show_item) {
    let id = show_item.id;
    let TLV_div = addElement(Tooltip, 'div', null, 'TLV_div');
    let T_name = addElement(TLV_div, 'div', null, 'TLV_left');
    T_name.innerHTML = '材料类型';
    let T_value = addElement(TLV_div, 'div', null, 'TLV_right');
    //从大类里查找属于这个材料的分类
    let type_name_flag = false;
    // let m_type = items[id].material_type;

    let type_ch = '';
    if (!items[show_item.id].material_type) {
        type_ch = '未定义材料类型';
    } else {
        let type_num = items[show_item.id].material_type.length;
        if (type_num == 0) {
            type_ch = '错误材料类型';
        } else if (type_num == 1) {
            //单种类
            let m_type = items[show_item.id].material_type[0]; //获取这唯一的武器类型
            type_ch = '来源于 ' + texts[m_type].source; //获取类型名称
        } else if (type_num > 1) {
            // //复合类型武器
            for (let m_type of items[show_item.id].material_type) {
                type_ch = type_ch + texts[m_type].type_name + '、';
            }
            type_ch = type_ch.substring(0, type_ch.length - 1);
        }
    }
    T_value.innerHTML = type_ch;
}
//追加展示材料来源和用处
function show_material_source_use(show_item) {}

export { init_item_tip };
