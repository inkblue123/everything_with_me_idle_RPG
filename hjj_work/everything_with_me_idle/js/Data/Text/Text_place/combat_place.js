import { add_text_object } from '../Text_class.js';
//所有战斗地点的文本
function combat_place(texts) {
    //位于测试区域的战斗地点
    test_combat_place(texts);
    //位于村庄区域的战斗地点
    village_combat_place(texts);
    //位于村外后山区域的战斗地点
    village_backhill_combat_place(texts);
    //位于村外后山洞穴区域的战斗地点
    backhill_cave_combat_place(texts);
}
//位于测试区域的战斗地点的文本
function test_combat_place(texts) {
    let id = 'test_combat1';
    add_text_object(texts, id);
    texts[id].place_name = '战斗地点1';
    texts[id].place_desc = '这里是战斗地点1，测试战斗系统的地方';
}
//位于村庄区域的战斗地点的文本
function village_combat_place(texts) {
    let id = 'VB_melee_train';
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
//位于村外后山区域的战斗地点
function village_backhill_combat_place(texts) {
    let id = 'forest_edge_road';
    add_text_object(texts, id);
    texts[id].place_name = '去森林外围的道路';
    texts[id].place_desc = '这条路堆积了一些怪物，想要前往森林外围就必须全部击败';
    id = 'forest_core_road';
    add_text_object(texts, id);
    texts[id].place_name = '去内层森林的道路';
    texts[id].place_desc = '这条路堆积了一些怪物，想要前往内层森林就必须全部击败';
}
//位于村外后山洞穴区域的战斗地点
function backhill_cave_combat_place(texts) {
    // id = 'VB_melee_train';
    // add_text_object(texts, id);
    // texts[id].place_name = '近战训练场地';
    // texts[id].place_desc = '村庄兵营中专门进行近战训练的地方，机关会在近距离布置假人';
    // id = 'VB_range_train';
    // add_text_object(texts, id);
    // texts[id].place_name = '远程训练场地';
    // texts[id].place_desc = '村庄兵营中专门进行远程训练的地方，机关会随机位置布置假人';
    // id = 'new_player_combat_test';
    // add_text_object(texts, id);
    // texts[id].place_name = '新手战斗训练场地';
    // texts[id].place_desc = '村庄兵营为考验新的战士准备的地方';
}

export { combat_place };
