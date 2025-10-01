import { addElement } from '../../Function/Dom_function.js';
import { get_object_only_key } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';
import { items } from '../../Data/Item/Item.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../../GameRun/global_manage.js';

//传入玩家的一个物品拷贝对象，展示这个物品的详细信息
function init_item_tip(tip_type, item_obj) {
    //展示物品的名称和描述
    if (!show_item_name_description(item_obj)) {
        return false; //异常物品，中止展示
    }
    //根据物品的大类别，追加展示额外的信息
    if (items[item_obj.id].main_type.includes('equipment')) {
        show_equipment(tip_type, item_obj);
    } else if (items[item_obj.id].main_type.includes('material')) {
        show_material(tip_type, item_obj);
    } else if (items[item_obj.id].main_type.includes('consumable')) {
        show_consumable(tip_type, item_obj);
    }
}
//展示物品的名称和描述
function show_item_name_description(item_obj) {
    let Tooltip = document.getElementById('tooltip');
    let id = item_obj.id;

    if (items[id] === undefined) {
        let label = addElement(Tooltip, 'div', null, 'lable_down');
        label.innerHTML = '未定义物品';
        let text = addElement(Tooltip, 'div', null, 'lable_down');
        text.innerHTML = '物品id为 : ' + id;
        return false;
    }
    let label = addElement(Tooltip, 'div', null, 'lable_down');
    if (items[item_obj.id].main_type.includes('equipment')) {
        //为装备的名称上色
        let equip_rarity = item_obj.equip_rarity;
        label.style.color = enums[equip_rarity].rarity_color;
    }
    label.innerHTML = items[id].name; //物品名称
    let text = addElement(Tooltip, 'div', null, 'lable_down');
    text.innerHTML = items[id].desc; //物品描述
    return true;
}
//针对武器装备，追加展示稀有度，详细类型，可装备位置
function show_equipment(tip_type, item_obj) {
    //装备类型详情展示
    show_equipment_type(item_obj);
    if (item_obj.equip_rarity == 'damaged') {
        //展示的物品是破损稀有度的装备，属于装备的内容已经展示完毕
        //接下来展示其他内容
        //追加展示物品价值
        show_item_price(tip_type, item_obj);
        return;
    }
    //展示可装备位置
    show_equipment_wearing_position(item_obj);
    //装备属性
    show_equipment_attr(item_obj);
    //追加展示物品价值
    show_item_price(tip_type, item_obj);

    return true;
}
//追加展示装备类型详情
function show_equipment_type(item_obj) {
    let Tooltip = document.getElementById('tooltip');
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
    let equip_rarity = item_obj.equip_rarity;
    R_value.innerHTML = texts[equip_rarity].rarity_name;
    rarity_div.style.color = enums[equip_rarity].rarity_color;
    if (equip_rarity == 'damaged') {
        //破损武器描述
        type_describe.innerHTML = texts[equip_rarity].type_desc;
        return true;
    }

    let type_ch = '';
    //武器类型获取，类型描述展示
    let type_num = items[item_obj.id].secon_type.length;
    if (type_num == 0) {
        type_ch = '错误武器类型';
    } else if (type_num == 1) {
        //单种类武器
        let e_type = items[item_obj.id].secon_type[0]; //获取这唯一的武器类型
        type_ch = texts[e_type].type_name; //获取类型名称
        type_describe.innerHTML = texts[e_type].type_desc; //展示武器类型的描述
    } else if (type_num > 1) {
        //复合类型武器
        for (let e_type of items[item_obj.id].secon_type) {
            type_ch = type_ch + texts[e_type].type_name + '，';
        }
        type_ch = type_ch.substring(0, type_ch.length - 1);
        type_describe.innerHTML = '同时拥有' + type_ch + '的特性';
    }
    T_value.innerHTML = type_ch;
    return true;
}
//追加展示可装备位置
function show_equipment_wearing_position(item_obj) {
    let Tooltip = document.getElementById('tooltip');
    let item_id = item_obj.id;
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
function show_equipment_attr(item_obj) {
    let Tooltip = document.getElementById('tooltip');
    let id = item_obj.id;
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
                    T_value.innerHTML = '+(' + items[id].equip_attr[attr] + '/' + item_obj.num + ')秒';
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

//针对消耗品，追加展示类型
function show_consumable(tip_type, item_obj) {
    //材料类型详情展示
    show_secon_type(item_obj);
    //追加展示物品价值
    show_item_price(tip_type, item_obj);
    return true;
}

//针对材料，追加展示材料类型，
function show_material(tip_type, item_obj) {
    //材料类型详情展示
    show_secon_type(item_obj);
    //追加展示物品价值
    show_item_price(tip_type, item_obj);
    //材料来源和用处展示
    // show_material_source_use(item_obj);

    return true;
}
//追加展示物品小类详情
function show_secon_type(item_obj) {
    let Tooltip = document.getElementById('tooltip');
    let TLV_div = addElement(Tooltip, 'div', null, 'TLV_div');
    let T_name = addElement(TLV_div, 'div', null, 'TLV_left');
    if (items[item_obj.id].main_type.includes('equipment')) {
        T_name.innerHTML = '装备类型';
    } else if (items[item_obj.id].main_type.includes('material')) {
        T_name.innerHTML = '材料类型';
    } else if (items[item_obj.id].main_type.includes('consumable')) {
        T_name.innerHTML = '消耗品类型';
    }
    let T_value = addElement(TLV_div, 'div', null, 'TLV_right');
    //从大类里查找属于这个材料的分类

    let type_ch = '';
    if (!items[item_obj.id].secon_type) {
        type_ch = '未定义材料类型';
    } else {
        let type_num = items[item_obj.id].secon_type.length;
        if (type_num == 0) {
            type_ch = '错误材料类型';
        } else if (type_num == 1) {
            //单种类
            let m_type = items[item_obj.id].secon_type[0]; //获取这唯一的材料类型
            type_ch = texts[m_type].type_name; //获取类型名称
        } else if (type_num > 1) {
            //复合类型材料
            for (let m_type of items[item_obj.id].secon_type) {
                type_ch = type_ch + texts[m_type].type_name + '、';
            }
            type_ch = type_ch.substring(0, type_ch.length - 1);
        }
    }
    T_value.innerHTML = type_ch;
}

//追加展示材料来源和用处
function show_material_source_use(item_obj) {}

//追加展示物品的价值或者出售购买时的标价
function show_item_price(tip_type, item_obj) {
    let Tooltip = document.getElementById('tooltip');
    if (tip_type == 'item') {
        //平常展示物品的时候，不会常态展示物品价值，因为有些物品含有多种价值，全部展示会很乱
        //需要有技能之后才允许常态展示
        // let label = addElement(Tooltip, 'div', null, 'lable_down');
        // label.innerHTML = '物品价值：xx铜币';
    } else {
        // 玩家位于商店，打算出售该物品，需要展示此时这个物品在商人眼里的价值
        let label = addElement(Tooltip, 'div', null, 'lable_down');
        let id, num, equip_rarity, money_type, item_trade_price;
        id = item_obj.id;

        //获取商人使用的货币类型
        let store_manage = global.get_store_manage();
        let sell_manage = store_manage.get_sell_manage();
        money_type = store_manage.get_store_use_money_type();
        let money_type_name = texts[money_type].money_type_name;

        if (tip_type == 'sell_good') {
            //获取当前出售数量设定
            let sell_quantity_button = document.getElementById('sell_quantity_button');
            let quantity_num = sell_quantity_button.dataset.quantity_num;
            //调整要出售的数量
            if (item_obj.num >= quantity_num) {
                num = quantity_num;
            } else {
                num = item_obj.num;
            }
            //计算得到出售这些物品能收入多少
            item_trade_price = sell_manage.get_sell_item_price(item_obj, num);
            if (item_trade_price > 0) {
                label.innerHTML = '出售' + num + '个，价值' + item_trade_price + money_type_name;
            } else {
                label.innerHTML = '对方觉得它一文不值';
                label.style.fontWeight = 'bold';
                label.style.color = '#ff0000';
            }
        } else if (tip_type == 'buy_good') {
            //获取当前购买数量设定
            let buy_quantity_button = document.getElementById('buy_quantity_button');
            let quantity_num = buy_quantity_button.dataset.quantity_num;
            //调整要购买的数量
            if (item_obj.num >= quantity_num) {
                num = quantity_num;
            } else {
                num = item_obj.num;
            }
            //计算购买这些物品的价格是多少
            let buy_manage = store_manage.get_buy_manage();
            item_trade_price = buy_manage.get_buy_item_price(item_obj, num);
            if (item_trade_price > 0) {
                label.innerHTML = '购买' + num + '个，价值' + item_trade_price + money_type_name;
            } else {
                label.innerHTML = '免费';
                // label.style.fontWeight = 'bold';
                // label.style.color = '#ff0000';
            }
        }
    }
}

export { init_item_tip };
