import { crtElement, addElement, empty_dom } from '../Function/Dom_function.js';
import { get_object_only_key } from '../Function/Get_func.js';
import { isEmptyObject, attr_correct_handle } from '../Function/Function.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
import { P_skills } from '../Data/Skill/Skill.js';

const TOOLTIP_WIDTH = 320;

//跟随鼠标，当鼠标移动到特定元素上时显示出来，充当提示窗口
var Tooltip = crtElement('div', 'tooltip', null, 'none');

// 初始化小窗口内容并显示小窗口
Tooltip.InitTip = function (type, value) {
    this.CloseTip();
    this.type = type;

    this.style.display = 'block';
    if (type == 'item') {
        //初始化物品介绍内容
        init_item_tip(value);
    } else if (type == 'active_skill') {
        //初始化主动技能介绍内容
        init_active_skill_tip(value);
    }
};
//移动小窗口
Tooltip.MoveTip = function (event) {
    const mouseX = event.pageX; // 鼠标横坐标
    const mouseY = event.pageY; // 鼠标纵坐标

    // 获取小窗口的宽度和高度
    const tooltipWidth = this.offsetWidth;
    const tooltipHeight = this.offsetHeight;

    // 获取浏览器窗口的宽度和高度
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    let left, top;
    if (this.type == 'active_skill') {
        //展示主动技能时固定位置
        // 计算小窗口的新位置
        left = (windowWidth - tooltipWidth) / 2; //在整个浏览器的中央位置显示
        top = windowHeight / 2; //在整个浏览器的中央位置显示
    } else {
        //其他情况下跟随鼠标移动
        // 计算小窗口的新位置
        left = mouseX + 10; // 初始假设小窗口显示在右侧
        top = mouseY + 10; // 初始假设小窗口显示在下方

        // 如果小窗口靠近浏览器右侧边缘，改为显示在左侧
        if (mouseX + tooltipWidth + 10 > windowWidth) {
            left = mouseX - tooltipWidth - 10; // 显示在左侧
        }

        // 如果小窗口靠近浏览器底部边缘，改为显示在上方
        if (mouseY + tooltipHeight + 10 > windowHeight) {
            top = mouseY - tooltipHeight - 10; // 显示在上方
        }
    }
    // 更新小窗口的位置
    this.style.left = left + 'px';
    this.style.top = top + 'px';
};
//清空并隐藏小窗口
Tooltip.CloseTip = function () {
    this.style.display = 'none'; // 隐藏小窗口
    this.style.width = TOOLTIP_WIDTH + 'px'; // 恢复宽度

    empty_dom(this); //清空内容
};
// 为小窗口添加鼠标移动时更新小窗口位置的功能
//如果不加，当鼠标移动过快，进入小窗口时，就失去了正常的移动能力
//似乎没生效
Tooltip.addEventListener('mousemove', (event) => {
    requestAnimationFrame(() => Tooltip.MoveTip(event));
});

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
    let type_num = items[show_item.id].equipment_type.length;
    if (type_num == 0) {
        type_ch = '错误武器类型';
    } else if (type_num == 1) {
        //单种类武器
        let e_type = items[show_item.id].equipment_type[0]; //获取这唯一的武器类型
        type_ch = texts[e_type].type_name; //获取类型名称
        type_describe.innerHTML = texts[e_type].type_desc; //展示武器类型的描述
    } else if (type_num > 1) {
        //复合类型武器
        for (let e_type of items[show_item.id].equipment_type) {
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
                if (items[id].equipment_type.includes('boomerang')) {
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

//传入玩家的一个主动技能拷贝对象，展示这个主动技能的详细信息
function init_active_skill_tip(active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;
    if (isEmptyObject(P_skills[id])) {
        //技能库没有相关内容，简单展示信息
        let name = addElement(Tooltip, 'div', null, 'lable_down');
        name.innerHTML = '未定义技能';
        let desc = addElement(Tooltip, 'div', null, 'lable_down');
        desc.innerHTML = '技能id为 : ' + id;
        return false;
    }
    //创造主动技能展示的布局
    Tooltip.style.width = `${P_skills[id].need_slot_num * TOOLTIP_WIDTH}px`;
    let name_lable = addElement(Tooltip, 'div', null, 'lable_down');
    name_lable.innerHTML = P_skills[id].name; //技能名
    let slot_div = addElement(Tooltip, 'div', null, 'slot_div');
    for (let i = 0; i < P_skills[id].need_slot_num; i++) {
        let slot_value_div = addElement(slot_div, 'div', null, 'slot_value_div');

        //展示物品的名称和描述
        let desc = addElement(slot_value_div, 'div', null, 'lable_down');
        desc.innerHTML = active_skill.desc; //这个槽的技能描述
        //追加展示技能类型-伤害类型信息
        //不同类型的技能似乎展示效果不好，有待优化
        show_active_skill_type(slot_value_div, active_skill);
        //追加展示技能的限制条件
        show_active_skill_condition(slot_value_div, active_skill);
        //追加展示技能的属性补正
        show_active_skill_attr_correct(slot_value_div, active_skill);
        //对多槽技能，非当前展示的槽的展示内容上覆盖一层半透明颜色
        if (i != slot_num) {
            addElement(slot_value_div, 'div', null, 'cover');
        }
    }
}
//展示技能的类型
function show_active_skill_type(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;
    let type_div = addElement(slot_value_div, 'div', null, 'page_columns_11');
    let active_type_div = addElement(type_div, 'div', null, 'lable_end');
    let T_value = addElement(type_div, 'div', null, 'lable_end');
    let active_type = active_skill.active_type;
    active_type_div.innerHTML = texts[active_type].active_type_name; //这个槽的技能类型

    return true;
}
//展示技能的限制条件
function show_active_skill_condition(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;

    let condition_name_div = addElement(slot_value_div, 'div', null, 'lable_down');
    if (isEmptyObject(active_skill.active_condition)) {
        //没有设定限制条件，默认为允许执行
        condition_name_div.innerHTML = '限制条件：无';
    } else {
        condition_name_div.innerHTML = '限制条件';
        let condition_value_div = addElement(slot_value_div, 'div', null, 'page_columns_11');
        for (let condition_key in active_skill.active_condition) {
            let C_value_div = addElement(condition_value_div, 'div', null, 'condition_value_div');
            let C_flag_div = addElement(C_value_div, 'div', null, 'condition_flag_div');
            let C_desc_div = addElement(C_value_div, 'div', null, 'condition_desc_div');

            if (condition_key == 'weapon_type') {
                //武器类型限制
                C_desc_div.innerHTML = '手持武器：';
                let AC_WT = active_skill.active_condition.weapon_type;
                if (isEmptyObject(AC_WT)) {
                    C_desc_div.innerHTML += '未设定';
                    console.log(`没设定${id}技能的武器类型限制条件`);
                } else {
                    for (let i in AC_WT) {
                        let w_type = AC_WT[i];
                        if (enums['damage_type'].includes(w_type)) {
                            //如果限制条件是伤害类型
                            if (i == 0) {
                                C_desc_div.innerHTML += texts['damage_type'].skill_desc[w_type] + '武器';
                            } else {
                                C_desc_div.innerHTML += '、' + texts['damage_type'].skill_desc[w_type] + '武器';
                            }
                        } else if (enums['equipment_type'].includes(w_type)) {
                            //如果限制条件是武器类型
                            if (i == 0) {
                                C_desc_div.innerHTML += texts['type_name'].type_name;
                            } else {
                                C_desc_div.innerHTML += '、' + texts['type_name'].type_name;
                            }
                        } else {
                            console.log('该技能的武器类型限制条件填写错误');
                            break;
                        }
                    }
                }
            }
            // else if (condition_key == '') {
            //     //其他限制条件
            // }
        }
    }
    return true;
}
//追加展示技能的属性补正
function show_active_skill_attr_correct(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;
    let correct_name_div = addElement(slot_value_div, 'div', null, 'lable_down');
    correct_name_div.innerHTML = '属性补正';
    let correct_value_div = addElement(slot_value_div, 'div', null, 'page_columns_111');
    for (let correct_key in active_skill.attr_correct) {
        let C_value_div = addElement(correct_value_div, 'div', null, 'table_3_value');
        //属性补正名称
        let C_name = addElement(C_value_div, 'div', null, 'TLV_left');
        if (texts[correct_key].attr_name.length > 4) {
            C_name.innerHTML = texts[correct_key].min_attr_name + '：'; //完整名称太长,选用简称
        } else {
            C_name.innerHTML = texts[correct_key].attr_name + '：';
        }
        let C_value = addElement(C_value_div, 'div', null, 'TLV_right');
        C_value.innerHTML = attr_correct_handle(active_skill.attr_correct[correct_key]);
    }
    return true;
}
export { Tooltip };
