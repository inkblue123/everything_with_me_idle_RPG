import { add_text_object } from '../Text_class.js';

//NPC地点的文本
function NPC_place_text(texts) {
    //村庄区域的npc文本
    village_NPC_place_text(texts);
    //村外后山区域的npc文本
    village_backhill_NPC_place_text(texts);
}
//村庄区域的npc文本
function village_NPC_place_text(texts) {
    let id;

    id = 'village_Combat_coach';
    add_text_object(texts, id);
    texts[id].place_name = '兵营教练';
    texts[id].place_desc = '村庄内兵营的教练'; //这个文本目前用不到
    //默认见面语句
    texts[id].default_meet_chat = '今天来这，有什么事';
    //条件见面语句
    texts[id].text1 = '基本训练都做不到吗，无论你是少了装备还是不会用主动技能，我的课上都有教，过几天再来好好看好好学';
    texts[id].text3 = '你完成了基本战斗训练，看来你恢复的很好，按照约定，村庄里不会再限制你。如果你想变得更强，村外有更凶猛的野兽，找它们去练手吧';
    texts[id].text2 = '我发现你受伤不轻，就叫人把你带出来了，基本训练对你来说应该太早，再去练练身板吧';

    id = 'village_woodshop_owner';
    add_text_object(texts, id);
    texts[id].place_name = '木工坊老板';
    texts[id].place_desc = ''; //这个文本目前用不到
    //默认见面语句
    texts[id].default_meet_chat = '工坊的货都在橱窗里，看看想要什么';
    //条件见面语句
    // texts[id].text1 = '';
    // texts[id].text3 = '';
    // texts[id].text2 = '';
}
//村外后山区域的npc文本
function village_backhill_NPC_place_text(texts) {
    let id;

    id = 'village_old_woman';
    add_text_object(texts, id);
    texts[id].place_name = '村口老妇';
    texts[id].place_desc = '时常出现在村外歇脚处的老妇人，据她所说亲人都死于兽潮，目前一个人生活'; //这个文本目前用不到
    //默认见面语句
    texts[id].default_meet_chat = '年轻人，在外面要小心啊';
    //条件见面语句
    // texts[id].text1 = '';
    // texts[id].text3 = '';
    // texts[id].text2 = '';
}

export { NPC_place_text };
