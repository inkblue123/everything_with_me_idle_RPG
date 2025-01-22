import { add_text_object } from './Text_class.js';

//普通地点的文本
function normal_place(texts) {
    let id = 'test_normal1';
    add_text_object(texts, id);
    texts[id].place_name = '普通地点1';
    texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
}
//战斗地点的文本
function combat_place(texts) {
    let id = 'test_combat1';
    add_text_object(texts, id);
    texts[id].place_name = '战斗地点1';
    texts[id].place_desc = '这里是战斗地点1，测试战斗系统的地方';
}
//初始化文本数据库中与地点相关的文本
function init_Text_place(texts) {
    //普通地点的文本
    normal_place(texts);
    //战斗地点的文本
    combat_place(texts);
}

export { init_Text_place };
