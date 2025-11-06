import { addElement } from '../../Function/Dom_function.js';
import { load_save, delete_save, init_game } from '../../LoadAndSave/load.js';

import { texts } from '../../Data/Text/Text.js';
import { TOOLTIP_WIDTH } from './Tooltip.js';


function init_game_save_tip(type, value) {
    let Tooltip = document.getElementById('tooltip');
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

    if (type == 'load_save') {
        //初始化导入存档界面
        init_load_save_tip(value);
    } else if (type == 'save_game') {
        //初始化导出存档界面
        init_save_game_tip(value);
    } else if (type == 'delete_save') {
        //初始化导出存档界面
        init_delete_save_tip(value);
    }
}

//初始化“导入存档”提示框
function init_load_save_tip(value) {
    let Tooltip = document.getElementById('tooltip');
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
    load_title.innerHTML = texts['load_tip_text'].lable_text1;
    //提示文本
    let load_text1 = addElement(load_game_div, 'div', null, 'SandL_text');
    load_text1.innerHTML = texts['load_tip_text'].lable_text2;
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
//初始化“导出存档”提示框
function init_save_game_tip(value) {
    let Tooltip = document.getElementById('tooltip');

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
    save_title.innerHTML = texts['save_tip_text'].lable_text1;
    //提示文本
    let save_text1 = addElement(save_game_div, 'div', null, 'SandL_text');
    save_text1.innerHTML = texts['save_tip_text'].lable_text2;
    let save_text2 = addElement(save_game_div, 'div', null, 'SandL_text');
    save_text2.innerHTML = texts['save_tip_text'].lable_text3;
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
//初始化“删除存档”提示框
function init_delete_save_tip(value) {
    let Tooltip = document.getElementById('tooltip');
    //添加删除存档布局
    let delete_save_div = addElement(Tooltip, 'div', 'SandL_game_div', null);
    //父布局的大小
    delete_save_div.style.width = TOOLTIP_WIDTH * 1.2 + 'px';
    delete_save_div.style.height = TOOLTIP_WIDTH * 1.2 + 'px';
    //父布局的位置
    let left = (window.innerWidth - delete_save_div.offsetWidth) / 2;
    let top = (window.innerHeight - delete_save_div.offsetHeight) / 2;
    delete_save_div.style.left = left + 'px';
    delete_save_div.style.top = top + 'px';

    //“删除存档”标题
    let delete_title = addElement(delete_save_div, 'div', null, 'SandL_title');
    delete_title.innerHTML = texts['delete_tip_text'].lable_text1;
    //提示文本
    let delete_text1 = addElement(delete_save_div, 'div', null, 'SandL_text');
    delete_text1.innerHTML = texts['delete_tip_text'].lable_text2;
    let delete_text2 = addElement(delete_save_div, 'div', null, 'SandL_text');
    delete_text2.innerHTML = texts['delete_tip_text'].lable_text3;
    delete_text2.style.color = '#ff1e00';

    let button_div = addElement(delete_save_div, 'div', 'SandL_button_div', null);
    //确认按钮
    let delete_button = addElement(button_div, 'button', 'SandL_delete_button', null);
    delete_button.innerHTML = texts['delete_tip_ok_button'].button_text;
    // 小延迟确保样式已加载，添加普通样式，触发渐变动画
    setTimeout(() => {
        delete_button.classList.add('normal');
    }, 50);
    //5秒之后再添加删除逻辑
    setTimeout(() => {
        delete_button.addEventListener('click', () => {
            //清理小窗口当前布局
            while (delete_save_div.lastChild) {
                delete_save_div.removeChild(delete_save_div.lastChild);
            }
            //删除存档
            delete_save();
            //重新构建删除完成小窗口
            init_delete_save_OK_tip(delete_save_div);
        });
    }, 50);
    // }, 5000);
    //取消按钮
    let exit_button = addElement(button_div, 'button', null, 'SandL_button');
    exit_button.innerHTML = texts['delete_tip_exit_button'].button_text;
    exit_button.addEventListener('click', () => {
        Tooltip.CloseTip(); //清空小窗口
    });
}
//构建“删除完成”提示框
function init_delete_save_OK_tip(delete_save_div) {
    //“删除存档”标题
    let delete_title = addElement(delete_save_div, 'div', null, 'SandL_title');
    delete_title.innerHTML = texts['delete_tip_text'].lable_text1;
    //提示文本
    let delete_text1 = addElement(delete_save_div, 'div', null, 'SandL_text');
    delete_text1.innerHTML = texts['delete_tip_text'].lable_text4;

    let button_div = addElement(delete_save_div, 'div', 'SandL_button_div', null);
    let exit_button = addElement(button_div, 'button', null, 'SandL_button');
    exit_button.innerHTML = texts['save_tip_exit_button'].button_text;
    exit_button.addEventListener('click', () => {
        let Tooltip = document.getElementById('tooltip');
        Tooltip.CloseTip(); //清空小窗口
        //重新刷新游戏界面
        init_game();
    });
}
export { init_game_save_tip };
