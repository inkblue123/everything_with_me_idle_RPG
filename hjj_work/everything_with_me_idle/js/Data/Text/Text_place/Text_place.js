import { add_text_object } from '../Text_class.js';
import { normal_place } from './normal_place.js';
import { area_text } from './area_place.js';
import { combat_place } from './combat_place.js';

//NPC地点的文本
function NPC_place(texts) {
    let id = 'village_Combat_coach';
    add_text_object(texts, id);
    texts[id].place_name = '兵营教练';
    texts[id].place_desc = '村庄内兵营的教练';
    //条件见面语句
    texts[id].text1 = '基本训练都做不到吗，无论你是少了装备还是不会用主动技能，我的课上都有教，过几天再来好好看好好学';
    texts[id].text3 =
        '你完成了基本战斗训练，看来你恢复的很好，按照约定，村庄里不会再限制你。如果你想变得更强，村外有更凶猛的野兽，找它们去练手吧';
    texts[id].text2 = '我发现你受伤不轻，就叫人把你带出来了，基本训练对你来说应该太早，再去练练身板吧';
    texts[id].default_meet_chat = '今天来这，有什么事';
}
//商店的文本
function store_place(texts) {
    let id = 'VH_pharmacy';
    add_text_object(texts, id);
    texts[id].place_name = '药房';
    texts[id].place_desc = '售药窗口：村庄药品不容浪费，每人每天限额购买，你需要什么';
}
//其他地点的文本
function other_place(texts) {
    let id = 'village_home_bed';
    add_text_object(texts, id);
    texts[id].place_name = '卧室床上';
    texts[id].place_desc = '安心休息，养精蓄锐';
}

//初始化文本数据库中与地点相关的文本
function init_Text_place(texts) {
    //普通地点的文本
    normal_place(texts);
    //战斗地点的文本
    combat_place(texts);
    //NPC地点的文本
    NPC_place(texts);
    //商店的文本
    store_place(texts);
    //其他地点的文本
    other_place(texts);
    //区域的文本
    area_text(texts);
}

export { init_Text_place };
