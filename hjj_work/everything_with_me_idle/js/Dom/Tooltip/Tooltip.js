import { crtElement, addElement, empty_dom } from '../../Function/Dom_function.js';
import { enums } from '../../Data/Enum/Enum.js';

import { init_item_tip } from './item_tip.js';
import { init_skill_tip } from './skill_tip.js';
import { init_game_save_tip } from './game_save_tip.js';
import { init_Hp_Mp_Enp_tip } from './HpMpEnp_bar_tip.js';
import { init_buff_tip } from './buff_tip.js';

export const TOOLTIP_WIDTH = 360;

//创建游离于游戏布局之上，跟随鼠标的小窗口
function create_Tooltip() {
    let Tooltip = crtElement('div', 'tooltip', null, 'none');
    make_Tooltip_div(Tooltip);
    set_Tooltip_func(Tooltip);
    return Tooltip;
}

//跟随鼠标，当鼠标移动到特定元素上时显示出来，充当提示窗口
function make_Tooltip_div(Tooltip) {
    //提示窗口没有需要预设的布局
}
//给提示窗口添加函数
function set_Tooltip_func(Tooltip) {
    // 初始化小窗口内容并显示小窗口
    Tooltip.InitTip = function (type, value, event) {
        this.CloseTip();
        this.type = type;
        let Tooltip_type = enums['Tooltip_type'][type];

        this.style.display = 'block';
        if (Tooltip_type == 'item') {
            //初始化物品介绍内容
            init_item_tip(type, value);
        } else if (Tooltip_type == 'skill') {
            //技能详情
            init_skill_tip(type, value);
        } else if (Tooltip_type == 'load_save') {
            //存档导入导出窗口
            init_game_save_tip(type, value);
        } else if (Tooltip_type == 'HME_bar') {
            //血条蓝条精力条详情
            init_Hp_Mp_Enp_tip(type, value);
        } else if (Tooltip_type == 'buff') {
            //buff详情
            init_buff_tip(type, value);
        }
        //初始化后移动一次小窗口，避免直接初始化在浏览器窗口外
        this.MoveTip(event);
    };
    //移动小窗口
    Tooltip.MoveTip = function (event) {
        let Tooltip_type = enums['Tooltip_type'][this.type];
        //存档和读档时的弹窗借用了提示小窗口，但是不需要移动
        if (Tooltip_type == 'load_save') {
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
        this.type = null;
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
}

export { create_Tooltip };
