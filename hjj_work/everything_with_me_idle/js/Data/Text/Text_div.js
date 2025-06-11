import { add_text_object } from './Text_class.js';

//界面布局中普通的文本
function lable_text(texts) {
    let id = 'save_tip_title';
    add_text_object(texts, id);
    texts[id].lable_text = '导出存档';
    id = 'load_tip_title';
    add_text_object(texts, id);
    texts[id].lable_text = '导入存档';
    id = 'save_tip_text1';
    add_text_object(texts, id);
    texts[id].lable_text = '你的存档位于下方的方框中';
    id = 'save_tip_text2';
    add_text_object(texts, id);
    texts[id].lable_text = '请务必全部复制，否则无法生效';
    id = 'load_tip_text1';
    add_text_object(texts, id);
    texts[id].lable_text = '将你的原始存档粘贴至下方的方框中';
}
//界面布局中按钮元素上的文本
function button_text(texts) {
    let id = 'save_tip_exit_button';
    add_text_object(texts, id);
    texts[id].button_text = '好';
    id = 'load_tip_load_button';
    add_text_object(texts, id);
    texts[id].button_text = '导入';
    id = 'load_tip_exit_button';
    add_text_object(texts, id);
    texts[id].button_text = '取消';
}
//初始化文本数据库中与界面布局相关的文本
function init_Text_div(texts) {
    //普通文本
    lable_text(texts);
    //按钮上的文本
    button_text(texts);
}

export { init_Text_div };
