import { add_text_object } from './Text_class.js';

//敌人相关的文本
function Challenge_text(texts) {
    let id = 'new_player_combat_test';
    add_text_object(texts, id);
    texts[id].event_name = '新手战斗训练';
}
//初始化文本数据库中与敌人相关的文本
function init_Text_game_event(texts) {
    //普通敌人的文本
    Challenge_text(texts);
}

export { init_Text_game_event };
