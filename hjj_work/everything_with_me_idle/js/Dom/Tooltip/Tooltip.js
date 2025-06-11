import { crtElement, addElement, empty_dom } from '../../Function/Dom_function.js';
import { is_Empty_Object, attr_correct_handle } from '../../Function/Function.js';

import { texts } from '../../Data/Text/Text.js';
import { enums } from '../../Data/Enum/Enum.js';
import { P_skills } from '../../Data/Skill/Skill.js';
import { player } from '../../Player/Player.js';

import { init_item_tip } from './item_tip.js';
import { init_skill_tip } from './skill_tip.js';
import { init_game_save_tip } from './game_save_tip.js';

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
    } else if (type == 'active_skill' || type == 'show_active_skill') {
        init_skill_tip(type, value);
    } else if (type == 'load_save' || type == 'save_game') {
        init_game_save_tip(type, value);
    }
};
//移动小窗口
Tooltip.MoveTip = function (event) {
    //存档和读档时的弹窗借用了提示小窗口，但是不需要移动
    if (this.type == 'load_save' || this.type == 'save_game') {
        return;
    }
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
        //如果小窗口初步调整后超过浏览器左侧边缘，改为在浏览器居中显示
        if (left < 0) {
            left = (windowWidth - tooltipWidth) / 2; //在整个浏览器的中央位置显示
        }
    }
    // 更新小窗口的位置
    this.style.left = left + 'px';
    this.style.top = top + 'px';
};
//清空并隐藏小窗口
Tooltip.CloseTip = function () {
    // 隐藏小窗口
    this.style.display = 'none';
    // 恢复宽度
    this.style.width = TOOLTIP_WIDTH + 'px';
    this.style.height = 'auto';
    // 恢复背景颜色
    this.style.background = 'linear-gradient(90deg, #ffffff, #ebebeb)';

    empty_dom(this); //清空内容
};
// 为小窗口添加鼠标移动时更新小窗口位置的功能
//如果不加，当鼠标移动过快，进入小窗口时，就失去了正常的移动能力
//似乎没生效
Tooltip.addEventListener('mousemove', (event) => {
    requestAnimationFrame(() => Tooltip.MoveTip(event));
});

export { Tooltip };
