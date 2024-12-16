import { crtElement, addElement, empty_dom } from './Dom_function.js';
import { update_HP, update_MP, update_ENP, update_BP_value, printf_play_item, get_BP_weight } from '../Function.js';
import { items } from '../Data/Item.js';
import { texts } from '../Data/Text.js';

//跟随鼠标，当鼠标移动到特定元素上时显示出来，充当提示窗口
var Tooltip = crtElement('div', 'tooltip', null, 'none');

// 初始化小窗口内容并显示小窗口
Tooltip.InitTip = function (type, value) {
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

//传入玩家的一个物品对象，展示物品的详细信息
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
function show_equipment(player_item) {
    //武器类型详情展示
    show_equipment_type(player_item);

    return true;
}
//武器类型详情展示
function show_equipment_type(player_item) {
    let equipment_type_div = addElement(Tooltip, 'div', null, 'TLV_div');
    let E_type = addElement(equipment_type_div, 'div', null, 'TLV_left');
    E_type.innerHTML = '装备类型：';
    let E_value = addElement(equipment_type_div, 'div', null, 'TLV_right');
    let type_describe = addElement(Tooltip, 'div', null, 'lable');

    let type_ch = '';
    let type_num = items[player_item.id].equipment_type.length;
    for (let a_type of items[player_item.id].equipment_type) {
        switch (a_type) {
            case 'dagger':
                type_ch += '匕首，';
                type_describe.innerHTML = '';
                break;
            case 'sword':
                type_ch += '剑，';
                type_describe.innerHTML = texts[a_type].type_desc;
                break;
            case 'battle_axe':
                type_ch += '战斧，';
                break;
            case 'long_handled':
                type_ch += '长柄武器，';
                break;
            case 'gloves':
                type_ch += '拳套，';
                break;
            case 'sticks':
                type_ch += '棍棒，';
                break;
            case 'hammers':
                type_ch += '大锤，';
                break;
            case 'whips':
                type_ch += '鞭子，';
                break;
            case 'bow':
                type_ch += '弓，';
                break;
            case 'crossbow':
                type_ch += '弩，';
                break;
            case 'hand_gun':
                type_ch += '手弩，';
                break;
            case 'spray_gun':
                type_ch += '喷枪，';
                break;
            case 'boomerang':
                type_ch += '回旋武器，';
                break;
            case 'throw':
                type_ch += '投掷工具，';
                break;
            case 'putmagic_core':
                type_ch += '施法核心，';
                break;
            case 'zhenfa_core':
                type_ch += '阵法核心，';
                break;
            case 'magic_core':
                type_ch += '法术核心，';
                break;
            case 'spread_core':
                type_ch += '扩散核心，';
                break;
            case 'summon_core':
                type_ch += '召唤核心，';
                break;
            case 'helmet':
                type_ch += '头盔，';
                break;
            case 'chest_armor':
                type_ch += '胸甲，';
                break;
            case 'leg_armor':
                type_ch += '腿甲，';
                break;
            case 'shoes':
                type_ch += '鞋子，';
                break;
            case 'deputy':
                type_ch += '副手装备，';
                break;
            case 'ornament':
                type_ch += '饰品，';
                break;

            default:
                type_num--;
                break;
        }
    }
    if (type_num == 0) {
        type_ch = '错误武器类型';
    } else if (type_num == 1) {
        type_ch = type_ch.substring(0, type_ch.length - 1);
    } else if (type_num == 1) {
        type_ch = type_ch.substring(0, type_ch.length - 1);
        type_describe.innerHTML = '同时拥有' + type_ch + '的特性';
    }
    E_value.innerHTML = type_ch;

    return true;
}

//判断物品类型
function switch_Item_type(player_item) {
    let item_id = player_item.id;

    for (let item_T of items_type) {
        if (type_switch.includes(item_T)) return true;
    }
    return false;
}

export { Tooltip };
