import { add_text_object } from './Text_class.js';

//敌人相关的文本
function normal_enemy(texts) {
    let id = 'Training_Dummy';
    add_text_object(texts, id);
    texts[id].enemy_name = '训练假人';
    // texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
}
//初始化文本数据库中与敌人相关的文本
function init_Text_enemy(texts) {
    //普通敌人的文本
    normal_enemy(texts);
}

export { init_Text_enemy };
