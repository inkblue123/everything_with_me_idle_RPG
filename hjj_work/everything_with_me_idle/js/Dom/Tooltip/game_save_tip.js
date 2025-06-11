import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, attr_correct_handle } from '../../Function/Function.js';
import { load_save } from '../../LoadAndSave/load.js';

import { texts } from '../../Data/Text/Text.js';
import { enums } from '../../Data/Enum/Enum.js';
import { P_skills } from '../../Data/Skill/Skill.js';
import { player } from '../../Player/Player.js';

import { Tooltip } from './Tooltip.js';

const TOOLTIP_WIDTH = 320;

function init_game_save_tip(type, value) {
    if (type == 'load_save') {
        //初始化导入存档界面
        init_load_save_tip(value);
    } else if (type == 'save_game') {
        //初始化导出存档界面
        init_save_game_tip(value);
    }
}

//初始化“导入存档”提示框
function init_load_save_tip(value) {
    //小窗口移动到左上角
    Tooltip.style.left = '0px';
    Tooltip.style.top = '0px';
    //小窗口放大到整个浏览器大小
    Tooltip.style.width = '100%';
    Tooltip.style.height = '100%';
    Tooltip.style.background = ' #ffffff';
    Tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    //添加一个遮罩
    let cover_div = addElement(Tooltip, 'div', null, 'cover');
    //点击遮罩会关闭
    cover_div.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
    });
    //添加导入存档布局
    let load_game_div = addElement(Tooltip, 'div', 'SandL_game_div', null);
    //父布局的大小
    load_game_div.style.width = TOOLTIP_WIDTH * 1.2 + 'px';
    load_game_div.style.height = TOOLTIP_WIDTH * 1.2 + 'px';
    //父布局的位置
    let left = (window.innerWidth - load_game_div.offsetWidth) / 2;
    let top = (window.innerHeight - load_game_div.offsetHeight) / 2;
    load_game_div.style.left = left + 'px';
    load_game_div.style.top = top + 'px';

    //“导出存档”标题
    let load_title = addElement(load_game_div, 'div', null, 'SandL_title');
    load_title.innerHTML = texts['load_tip_title'].lable_text;
    //提示文本
    let load_text1 = addElement(load_game_div, 'div', null, 'SandL_text');
    load_text1.innerHTML = texts['load_tip_text1'].lable_text;
    //存放存档的文本框
    let load_textarea = addElement(load_game_div, 'textarea', 'SandL_textarea', null);
    load_textarea.innerHTML = value;
    load_textarea.select();

    let button_div = addElement(load_game_div, 'div', 'SandL_button_div', null);
    //导入按钮
    let load_button = addElement(button_div, 'button', null, 'SandL_button');
    load_button.innerHTML = texts['load_tip_load_button'].button_text;
    load_button.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
        let save_str = load_textarea.value;
        load_save(save_str);
    });
    //退出按钮
    let exit_button = addElement(button_div, 'button', null, 'SandL_button');
    exit_button.innerHTML = texts['load_tip_exit_button'].button_text;
    exit_button.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
    });
}
// //初始化导入存档窗口
// function init_save_game_tip(value) {
//     //提示框扩大到整个窗口大小
//     Tooltip_full_windows();
//     //添加其中布局
//     //点击了非中央div的时候关闭这个界面
//     //中央界面的布局
// }

//初始化“导出存档”提示框
function init_save_game_tip(value) {
    //小窗口移动到左上角
    Tooltip.style.left = '0px';
    Tooltip.style.top = '0px';
    //小窗口放大到整个浏览器大小
    Tooltip.style.width = '100%';
    Tooltip.style.height = '100%';
    Tooltip.style.background = ' #ffffff';
    Tooltip.style.backgroundColor = 'rgba(0, 0, 0, 0)';

    //添加一个遮罩
    let cover_div = addElement(Tooltip, 'div', null, 'cover');
    //点击遮罩会关闭
    cover_div.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
    });
    //添加导出存档布局
    let save_game_div = addElement(Tooltip, 'div', 'SandL_game_div', null);
    //父布局的大小
    save_game_div.style.width = TOOLTIP_WIDTH * 1.2 + 'px';
    save_game_div.style.height = TOOLTIP_WIDTH * 1.2 + 'px';
    //父布局的位置
    let left = (window.innerWidth - save_game_div.offsetWidth) / 2;
    let top = (window.innerHeight - save_game_div.offsetHeight) / 2;
    save_game_div.style.left = left + 'px';
    save_game_div.style.top = top + 'px';

    //“导出存档”标题
    let save_title = addElement(save_game_div, 'div', null, 'SandL_title');
    save_title.innerHTML = texts['save_tip_title'].lable_text;
    //提示文本
    let save_text1 = addElement(save_game_div, 'div', null, 'SandL_text');
    save_text1.innerHTML = texts['save_tip_text1'].lable_text;
    let save_text2 = addElement(save_game_div, 'div', null, 'SandL_text');
    save_text2.innerHTML = texts['save_tip_text2'].lable_text;
    save_text2.style.color = '#ff1e00';
    //存放存档的文本框
    let save_textarea = addElement(save_game_div, 'textarea', 'SandL_textarea', null);
    save_textarea.innerHTML = value;
    save_textarea.select();

    let button_div = addElement(save_game_div, 'div', 'SandL_button_div', null);
    //退出按钮
    let exit_button = addElement(button_div, 'button', null, 'SandL_button');
    exit_button.innerHTML = texts['save_tip_exit_button'].button_text;
    exit_button.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
    });
}

export { init_game_save_tip };
