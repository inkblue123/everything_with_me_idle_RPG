import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, attr_correct_handle } from '../../Function/Function.js';

import { texts } from '../../Data/Text/Text.js';
import { enums } from '../../Data/Enum/Enum.js';
import { P_skills } from '../../Data/Skill/Skill.js';
import { player } from '../../Player/Player.js';

import { Tooltip } from './Tooltip.js';

function init_game_save_tip(type, value) {
    if (type == 'load_save') {
        //初始化导入存档界面
        init_load_save_tip(value);
    } else if (type == 'save_game') {
        //初始化导出存档界面
    }
}

//初始化导入存档窗口
function init_load_save_tip(value) {
    //提示框扩大到整个窗口大小
    Tooltip_full_windows();
    //添加其中布局
    //点击了非中央div的时候关闭这个界面
    //中央界面的布局
}
//提示框扩大到整个窗口
function Tooltip_full_windows() {
    //小窗口移动到左上角
    Tooltip.style.left = '0px';
    Tooltip.style.top = '0px';
    //获取浏览器窗口大小
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    //小窗口放大到整个浏览器大小
    Tooltip.style.width = windowWidth + 'px';
    Tooltip.style.height = windowHeight + 'px';
    //变成半透明黑色
    // Tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';

    // target_div.addEventListener('click', () => {
    //     //从玩家背包中去掉要穿戴的物品
    //     let keys = Object.keys(tip_value.rarity);
    //     let rarity = keys[0];
    //     let ret = player.Player_lose_Equipment(tip_value);
    //     if (ret <= 0) return;
    //     //切换到当前激活的装备栏
    //     show_active_EQP();
    //     //将要穿戴的物品放到目前激活的装备栏的指定位置
    //     player.worn_Equipment(tip_value.id, tip_value.num, rarity);
    //     //装备信息发生变动，更新相关界面
    //     updata_player_EQP();
    //     //关闭提示窗
    //     let tooltip = document.getElementById('tooltip');
    //     tooltip.CloseTip(); //清空小窗口
    // });
}
//给
function add_load_save_div() {
    let cover_div = addElement(Tooltip, 'div', null, 'cover');
    let full_window_div = addElement(Tooltip, 'div', 'full_window_div', null);
}

export { init_game_save_tip };
