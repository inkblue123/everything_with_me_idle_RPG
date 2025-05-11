import { add_text_object } from './Text_class.js';

//游戏章节的文本
function page_text(texts) {
    let id = 'page_1';
    add_text_object(texts, id);
    texts[id].event_name = '第一章';
}
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
    texts[id].event_name = '周一新手教学';
    texts[id].text1 =
        '        兵营教练：在战斗中，首先就得攻击到敌人，且看我的动作，像这样，再那样…………刚刚我演示的就是“普通攻击-近战”的技巧。如果你们自觉天赋异禀，那可以去训练场试试看，用不出来就再多练练……';
    texts[id].text2 = '学会了“普通攻击-近战”<br>（在左下窗口的“战斗规划中使用它”）';

    id = 'new_player_teach_2';
    add_text_object(texts, id);
    texts[id].event_name = '周二新手教学';
    texts[id].text1 =
        '        兵营教练：赤手空拳与敌人战斗是不明知的，合适的防具可以降低敌人的伤害，兵营为所有人都准备了一套装备，好好磨合，战斗考验要用的';
    texts[id].text2 = '获得“全套木制护甲”<br>（在左下窗口的“背包物品中使用它们”）';

    id = 'new_player_teach_3';
    add_text_object(texts, id);
    texts[id].event_name = '周三新手教学';
    texts[id].text1 =
        '        兵营教练：今天要教的是怎么用盾牌，我知道有些人打到上头就不管死活只顾输出，这是非常愚蠢的事情，所以我得教你们如何保护好自己，就靠这个盾，像这样…………';
    texts[id].text2 = '获得“木制盾牌”<br>学会了“盾牌防御”';
}
//事件完成条件的文本
function event_finish_condition_text(texts) {
    let id = 'melee_kill';
    add_text_object(texts, id);
    texts[id].condition_name = '近战击杀';
    id = 'ATD_all_armor';
    add_text_object(texts, id);
    texts[id].condition_name = '4个防具部位都有穿着的情况下受击';
    id = 'DSE_shield_defense';
    add_text_object(texts, id);
    texts[id].condition_name = '使用“盾牌防御”技能抵挡敌人攻击';
}
//初始化文本数据库中与游戏事件相关的文本
function init_Text_game_event(texts) {
    //章节的文本
    page_text(texts);
    //挑战的文本
    Challenge_text(texts);
    //迷你事件的文本
    mini_event_text(texts);
    //事件完成条件的文本
    event_finish_condition_text(texts);
}

export { init_Text_game_event };
