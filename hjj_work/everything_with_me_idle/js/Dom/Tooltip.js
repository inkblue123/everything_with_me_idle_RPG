import { crtElement, addElement, empty_dom } from './Dom_function.js';
import { update_HP, update_MP, update_ENP, update_BP_value, printf_play_item, get_BP_weight } from '../Function.js';
import { items } from '../Data/Item.js';

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

function init_item_tip(item_id) {
    if (items[item_id] === undefined) {
        let label = addElement(Tooltip, 'div', 'title');
        label.innerHTML = '未定义物品';
        let text = addElement(Tooltip, 'div', 'd_t');
        text.innerHTML = '物品id为 : ' + item_id;
    } else {
        let label = addElement(Tooltip, 'div', 'title');
        label.innerHTML = items[item_id].name;
        let text = addElement(Tooltip, 'div', 'd_t');
        text.innerHTML = items[item_id].description;
    }
}

export { Tooltip };
