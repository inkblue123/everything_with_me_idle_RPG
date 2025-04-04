import { add_text_object } from './Text_class.js';

//挑战的文本
function Challenge_text(texts) {
    let id = 'new_player_combat_test';
    add_text_object(texts, id);
    texts[id].event_name = '新手战斗训练';
}
//迷你事件的文本
function mini_event_text(texts) {
    let id = 'new_player_teach_1';
    add_text_object(texts, id);
    texts[id].event_name = '新手教学1';
    texts[id].text1 =
        '        兵营教练：在战斗中，首先就得攻击到敌人，且看我的动作，像这样，再那样…………刚刚我演示的就是“普通攻击-近战”的技巧。如果你们自觉天赋异禀，那可以去训练场试试看，用不出来就再多练练……';
    texts[id].text2 = '学会了“普通攻击-近战”<br>（在左下窗口的“战斗规划中使用它”）';
}

//初始化文本数据库中与游戏事件相关的文本
function init_Text_game_event(texts) {
    //挑战的文本
    Challenge_text(texts);
    //挑战的文本
    mini_event_text(texts);
}

export { init_Text_game_event };
