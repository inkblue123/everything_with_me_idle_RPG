import { add_text_object } from './Text_class.js';

//游戏状态-设置部分的文本
function game_option_text(texts) {
    let id;

    id = 'OP_radio_div';
    add_text_object(texts, id);
    texts[id].option_name_default = '游戏设置';
    texts[id].option_name_super = '我想到了！';
    id = 'OP_game_FPS';
    add_text_object(texts, id);
    texts[id].option_name_default = '游戏帧率';
    texts[id].option_name_super = '我觉得游戏的帧率应该是';
    id = 'OP_game_OptionTipText';
    add_text_object(texts, id);
    texts[id].option_name_default = '设置界面提示文本';
    texts[id].option_name_super = '设置界面提示文本';
    id = 'OP_game_RASaveLogMax';
    add_text_object(texts, id);
    texts[id].option_name_default = '流水账界面日志保存数量上限';
    texts[id].option_name_super = '我应在流水账中记录几条日志';
    id = 'OP_game_SaveManage';
    add_text_object(texts, id);
    texts[id].option_name_default = '存档管理';
    texts[id].option_name_super = '觉醒前世记忆';
}
//初始化文本数据库中属于游戏状态相关的文本
function init_Text_game_flag(texts) {
    //游戏状态-设置部分的文本
    game_option_text(texts);
}

export { init_Text_game_flag };
