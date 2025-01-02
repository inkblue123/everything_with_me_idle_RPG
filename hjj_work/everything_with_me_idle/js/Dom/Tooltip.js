import { crtElement, addElement, empty_dom } from '../Function/Dom_function.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';

//跟随鼠标，当鼠标移动到特定元素上时显示出来，充当提示窗口
var Tooltip = crtElement('div', 'tooltip', null, 'none');

// 初始化小窗口内容并显示小窗口
Tooltip.InitTip = function (type, value) {
    this.CloseTip();

    this.style.display = 'block';
    if (type == 'item') {
        //初始化物品介绍内容
        init_item_tip(value);
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

    // 计算小窗口的新位置
    let left = mouseX + 10; // 初始假设小窗口显示在右侧
    let top = mouseY + 10; // 初始假设小窗口显示在下方

    // 如果小窗口靠近浏览器右侧边缘，改为显示在左侧
    if (mouseX + tooltipWidth + 10 > windowWidth) {
        left = mouseX - tooltipWidth - 10; // 显示在左侧
    }

    // 如果小窗口靠近浏览器底部边缘，改为显示在上方
    if (mouseY + tooltipHeight + 10 > windowHeight) {
        top = mouseY - tooltipHeight - 10; // 显示在上方
    }

    // 更新小窗口的位置
    this.style.left = left + 'px';
    this.style.top = top + 'px';
};
//清空并隐藏小窗口
Tooltip.CloseTip = function () {
    this.style.display = 'none'; // 隐藏小窗口
    empty_dom(this); //清空内容
};
// 为小窗口添加鼠标移动时更新小窗口位置的功能
//如果不加，当鼠标移动过快，进入小窗口时，就失去了正常的移动能力
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
    if (items[player_item.id].type.includes('equipment')) {
        show_equipment(player_item);
    }
}
//展示物品的名称和描述
function show_item_name_description(player_item) {
    let item_id = player_item.id;

    if (items[item_id] === undefined) {
        let label = addElement(Tooltip, 'div', null, 'lable');
        label.innerHTML = '未定义物品';
        let text = addElement(Tooltip, 'div', null, 'lable');
        text.innerHTML = '物品id为 : ' + item_id;
        return false;
    }

    let label = addElement(Tooltip, 'div', null, 'lable');
    label.innerHTML = items[item_id].name; //物品名称
    let text = addElement(Tooltip, 'div', null, 'lable');
    text.innerHTML = items[item_id].description; //物品描述
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
    show_equipment_wearing_position(show_item);

    return true;
}
//装备类型详情展示
function show_equipment_type(show_item) {
    let type_and_rarity_div = addElement(Tooltip, 'div', null, 'TLV_div');
    //类型展示
    let type_div = addElement(type_and_rarity_div, 'div', null, 'TLV_div');
    let T_type = addElement(type_div, 'div', null, 'TLV_left');
    T_type.innerHTML = '装备类型：';
    let T_value = addElement(type_div, 'div', null, 'TLV_right');
    let type_describe = addElement(Tooltip, 'div', null, 'lable');
    //稀有度展示
    let rarity_div = addElement(type_and_rarity_div, 'div', null, 'TLV_div');
    let R_type = addElement(rarity_div, 'div', null, 'TLV_left');
    R_type.innerHTML = '稀有度：';
    let R_value = addElement(rarity_div, 'div', null, 'TLV_right');
    let show_item_rarity;
    for (show_item_rarity in show_item.rarity) {
        R_value.innerHTML = texts[show_item_rarity].rarity_name;
        rarity_div.style.color = texts[show_item_rarity].rarity_color;
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
//可装备位置展示
function show_equipment_wearing_position(show_item) {
    let item_id = show_item.id;
    let wearing_position_lable = addElement(Tooltip, 'div', null, 'lable');
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

export { Tooltip };
