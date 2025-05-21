import { add_text_object } from './Text_class.js';

//普通地点的文本
function normal_place(texts) {
    let id = 'test_normal1';
    add_text_object(texts, id);
    texts[id].place_name = '普通地点1';
    texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
    id = 'village_home';
    add_text_object(texts, id);
    texts[id].place_name = '村中住所';
    texts[id].place_desc = '你在村中的居所，大部分物件都被变卖或抢走，目前只留空房';
    id = 'village_square';
    add_text_object(texts, id);
    texts[id].place_name = '村庄大广场';
    texts[id].place_desc = '可以通往村中绝大部分区域的广场';
    id = 'village_market';
    add_text_object(texts, id);
    texts[id].place_name = '村庄集市';
    texts[id].place_desc = '可以在这找到很多店铺';
    id = 'village_barracks';
    add_text_object(texts, id);
    texts[id].place_name = '村庄兵营';
    texts[id].place_desc = '村里训练战士的场所';
    id = 'village_hospital';
    add_text_object(texts, id);
    texts[id].place_name = '村庄诊所';
    texts[id].place_desc = '可以在此治病，可以买到药物，真希望少来这里';
}
//战斗地点的文本
function combat_place(texts) {
    let id = 'test_combat1';
    add_text_object(texts, id);
    texts[id].place_name = '战斗地点1';
    texts[id].place_desc = '这里是战斗地点1，测试战斗系统的地方';
    id = 'VB_melee_train';
    add_text_object(texts, id);
    texts[id].place_name = '近战训练场地';
    texts[id].place_desc = '村庄兵营中专门进行近战训练的地方，机关会在近距离布置假人';
    id = 'VB_range_train';
    add_text_object(texts, id);
    texts[id].place_name = '远程训练场地';
    texts[id].place_desc = '村庄兵营中专门进行远程训练的地方，机关会随机位置布置假人';
    id = 'new_player_combat_test';
    add_text_object(texts, id);
    texts[id].place_name = '新手战斗训练场地';
    texts[id].place_desc = '村庄兵营为考验新的战士准备的地方';
}
//NPC地点的文本
function NPC_place(texts) {
    let id = 'village_Combat_coach';
    add_text_object(texts, id);
    texts[id].place_name = '兵营教练';
    texts[id].place_desc = '村庄内兵营的教练';
    //条件见面语句
    texts[id].SGS_new_player_combat_test_exit =
        '基本训练都做不到吗，无论你是少了装备还是不会用主动技能，我的课上都有教，过几天再来好好看好好学';
    texts[id].SGS_new_player_combat_test_finish =
        '你完成了基本战斗训练，看来你恢复的很好，按照约定，村庄里不会再限制你。如果你想变得更强，村外有更凶猛的野兽，找它们去练手吧';
    texts[id].SGS_new_player_combat_test_death =
        '我发现你受伤不轻，就叫人把你带出来了，基本训练对你来说应该太早，再去练练身板吧';
    texts[id].UGS_village_barracks_week_1 = '123';
    texts[id].UGS_village_barracks_week_2 = '456';
    texts[id].UGS_village_barracks_week_3 = '789';
    texts[id].UGS_village_barracks_week_4 = '101112';
    texts[id].UGS_village_barracks_week_5 = '131415';
    texts[id].default_meet_chat = '今天来这，有什么事';
}
//区域的文本
function area_text(texts) {
    let id = 'village';
    add_text_object(texts, id);
    texts[id].area_name = '村庄';
}

//初始化文本数据库中与地点相关的文本
function init_Text_place(texts) {
    //普通地点的文本
    normal_place(texts);
    //战斗地点的文本
    combat_place(texts);
    //NPC地点的文本
    NPC_place(texts);
    //区域的文本
    area_text(texts);
}

export { init_Text_place };
