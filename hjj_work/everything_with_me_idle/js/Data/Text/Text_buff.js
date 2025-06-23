import { add_text_object } from './Text_class.js';

//buff相关的文本
function normal_buff(texts) {
    let id = 'sleep_hp1';
    add_text_object(texts, id);
    texts[id].buff_name = '睡眠';
    texts[id].buff_desc = '恢复生命';
}
//初始化文本数据库中与buff相关的文本
function init_Text_buff(texts) {
    //普通buff的文本
    normal_buff(texts);
}

export { init_Text_buff };
