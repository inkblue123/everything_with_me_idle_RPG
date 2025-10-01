import { add_normal_Place } from './Place_class.js';

function init_Place_normal(places) {
    //测试区域的普通地点
    init_test_normal_place(places);
    //村庄区域的普通地点
    init_village_normal_place(places);
    //村外后山区域的普通地点
    init_village_backhill_normal_place(places);
    //后山洞穴区域的普通地点
    init_backhill_cave_place(places);
}
//测试区域的普通地点
function init_test_normal_place(places) {
    let id;
    let area = 'test';

    id = 'game_statr';
    add_normal_Place(places, id, area);
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');

    id = 'test_normal1';
    add_normal_Place(places, id, area);
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');
}
//村庄区域的普通地点
function init_village_normal_place(places) {
    let id;
    let area = 'village';

    id = 'village_home'; //村中住所
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_other_place('village_home_bed');

    id = 'village_square'; //村庄大广场
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_home', 'village_barracks', 'village_hospital');
    places[id].add_condition_connect_normal_place('village_market', 'main_quest_1', true); //完成第一章才允许进入集市
    places[id].add_condition_connect_normal_place('VBH_rest_location', 'main_quest_1', true); //完成第一章才允许进入村外后山

    id = 'village_market'; //村庄集市
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_square', 'VM_woodshop');
    // places[id].add_connect_store_place('VM_smithy', 'VM_woodshop', 'VM_trade_hub');

    id = 'village_barracks'; //村庄兵营
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_combat_place('VB_melee_train', 'VB_range_train');
    places[id].add_place_NPC('village_Combat_coach');

    id = 'village_hospital'; //村庄诊所
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_store_place('VH_pharmacy');

    id = 'VM_woodshop'; //村庄集市-木工坊
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_market');
    places[id].add_connect_store_place('VM_woodshop_showcase');
    places[id].add_place_NPC('village_woodshop_owner');
}
//村外后山区域的普通地点
function init_village_backhill_normal_place(places) {
    let id;
    let area = 'village_backhill';

    id = 'VBH_rest_location'; //村外歇脚处
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('village_square', 'cemetery'); //测试
    // places[id].add_connect_normal_place('village_square', 'cemetery', 'logged_forest', 'forest_edge'); //测试
    places[id].add_condition_connect_normal_place('logged_forest', 'unlock_foraging_logging', true); //完成了指定事件才允许进入已开荒的林区
    // places[id].add_condition_connect_normal_place('forest_edge', 'unlock_foraging_logging', true); //完成了指定事件才允许进入外层森林
    places[id].add_condition_connect_normal_place('forest_edge_road', 'unlock_foraging_logging', true); //完成了指定事件才允许进入外层森林
    places[id].add_place_NPC('village_old_woman');
    // places[id].add_connect_normal_place('village_square', 'cemetery', 'logged_forest', 'forest_edge_road');

    id = 'logged_forest'; //已开荒的林区
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('VBH_rest_location', 'LF_grass', 'LF_woodland', 'LF_creek');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(5); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('bushes', 10, false); //这个地点可刷的树
    places[id].set_foraging_data(100); //这个地点的采集相关参数，采集防御力100点
    places[id].set_foraging_item('red_berry', 100, false); //这个地点可采集的物品，红浆果
    places[id].set_foraging_item('yellow_berry', 100, false); //这个地点可采集的物品，黄浆果
    places[id].set_foraging_item('black_berry', 100, false); //这个地点可采集的物品，黑浆果
    places[id].set_foraging_item('porcini', 1, false); //这个地点可采集的物品，牛肝菌

    id = 'LF_grass'; //已开荒的林区-草地
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('logged_forest');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(10); //这个地点的伐木相关参数，树的复活时间10秒
    places[id].set_logging_tree('bushes', 10, false); //这个地点可刷的树
    places[id].set_foraging_data(10); //这个地点的采集相关参数，采集防御力10点
    places[id].set_foraging_item('red_berry', 100, false); //这个地点可采集的物品，红浆果
    places[id].set_foraging_item('yellow_berry', 100, false); //这个地点可采集的物品，黄浆果
    places[id].set_foraging_item('black_berry', 100, false); //这个地点可采集的物品，黑浆果
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('broken_fur', 50, false); //这个地点可采集的物品，碎毛皮
    places[id].set_foraging_item('hard_rock', 10, false); //这个地点可采集的物品，坚硬岩石
    places[id].set_foraging_item('porcini', 5, false); //这个地点可采集的物品，牛肝菌
    places[id].set_foraging_item('craterellus', 5, false); //这个地点可采集的物品，喇叭菌
    places[id].set_foraging_item('copper_coin', 1, false); //这个地点可采集的物品，铜币
    places[id].set_foraging_item('wood_sticks', 1, false, null, null, 'ordinary'); //这个地点可采集的物品，木制棍棒
    places[id].set_foraging_item('termite_mushroom', 1, true, 2, 2880); //这个地点可采集的物品，鸡枞

    id = 'LF_woodland'; //已开荒的林区-林地
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('logged_forest');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(3); //这个地点的伐木相关参数，树的复活时间3秒
    places[id].set_logging_tree('oak_tree', 10, false); //这个地点可刷的树，橡树
    places[id].set_logging_tree('Willow_tree', 10, false); //这个地点可刷的树，柳树
    places[id].set_foraging_data(15); //这个地点的采集相关参数，采集防御力15点
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('broken_fur', 50, false); //这个地点可采集的物品，碎毛皮
    places[id].set_foraging_item('animal_bone', 10, false); //这个地点可采集的物品，兽骨
    places[id].set_foraging_item('Oak_logs', 10, false); //这个地点可采集的物品，橡树原木
    places[id].set_foraging_item('porcini', 1, false); //这个地点可采集的物品，牛肝菌
    places[id].set_foraging_item('craterellus', 1, false); //这个地点可采集的物品，喇叭菌
    places[id].set_foraging_item('wood_sticks', 1, false, null, null, 'ordinary'); //这个地点可采集的物品，木制棍棒

    id = 'LF_creek'; //已开荒的林区-小溪
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('logged_forest');
    places[id].set_live_plan_flag(10); //当前地点可以执行的生活技能
    places[id].set_foraging_data(100); //这个地点的采集相关参数，采集防御力100点
    places[id].set_foraging_item('decayed_wood', 100, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('river_mussel', 20, false); //这个地点可采集的物品，河蚌
    places[id].set_foraging_item('river_crab', 20, false); //这个地点可采集的物品，河蟹
    places[id].set_foraging_item('coral_fungus', 5, false); //这个地点可采集的物品，珊瑚菌
    places[id].set_foraging_item('chanterelle', 5, false); //这个地点可采集的物品，鸡油菌
    places[id].set_fishing_data(0, 16, 1); //这个地点的钓鱼相关参数
    places[id].set_fishing_fish('river_mussel', 5, false); //这个地点可钓到的鱼，河蚌
    places[id].set_fishing_fish('river_crab', 5, false); //这个地点可钓到的鱼，河蟹
    places[id].set_fishing_fish('creek_fish', 1, false); //这个地点可钓到的鱼，溪鱼

    id = 'cemetery'; //墓地
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('VBH_rest_location');

    id = 'forest_edge'; //外层森林
    add_normal_Place(places, id, area);
    // places[id].add_connect_normal_place('VBH_rest_location', 'cave_inlet', 'forest_core_road', 'FE_woodland', 'FE_pond'); //测试
    places[id].add_connect_normal_place('VBH_rest_location', 'cave_inlet', 'forest_core', 'FE_woodland', 'FE_pond');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(5); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('bushes', 10, false); //这个地点可刷的树，灌木丛
    places[id].set_logging_tree('oak_tree', 10, false); //这个地点可刷的树，橡树
    places[id].set_foraging_data(120); //这个地点的采集相关参数，采集防御力120点
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('red_berry', 10, false); //这个地点可采集的物品，红浆果
    places[id].set_foraging_item('yellow_berry', 10, false); //这个地点可采集的物品，黄浆果
    places[id].set_foraging_item('black_berry', 10, false); //这个地点可采集的物品，黑浆果
    places[id].set_foraging_item('Oak_logs', 5, false); //这个地点可采集的物品，橡树原木
    places[id].set_foraging_item('porcini', 1, false); //这个地点可采集的物品，牛肝菌
    places[id].set_foraging_item('coral_fungus', 1, false); //这个地点可采集的物品，珊瑚菌

    id = 'FE_woodland'; //外层森林-林地
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('forest_edge');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(3); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('bushes', 10, false); //这个地点可刷的树，灌木丛
    places[id].set_logging_tree('oak_tree', 10, false); //这个地点可刷的树，橡树
    places[id].set_logging_tree('ash_skin_birch', 5, false); //这个地点可刷的树，灰肤桦
    places[id].set_foraging_data(60); //这个地点的采集相关参数，采集防御力60点
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('red_berry', 10, false); //这个地点可采集的物品，红浆果
    places[id].set_foraging_item('yellow_berry', 10, false); //这个地点可采集的物品，黄浆果
    places[id].set_foraging_item('black_berry', 10, false); //这个地点可采集的物品，黑浆果
    places[id].set_foraging_item('Oak_logs', 5, false); //这个地点可采集的物品，橡树原木
    places[id].set_foraging_item('craterellus', 1, false); //这个地点可采集的物品，喇叭菌
    places[id].set_foraging_item('coral_fungus', 1, false); //这个地点可采集的物品，珊瑚菌
    places[id].set_foraging_item('chanterelle', 1, false); //这个地点可采集的物品，鸡油菌

    id = 'FE_pond'; //外层森林-池塘
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('forest_edge');
    places[id].set_live_plan_flag(11); //当前地点可以执行的生活技能
    places[id].set_logging_data(5); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('bushes', 10, false); //这个地点可刷的树，灌木丛
    places[id].set_logging_tree('Willow_tree', 10, false); //这个地点可刷的树，柳树
    places[id].set_foraging_data(200); //这个地点的采集相关参数，采集防御力200点
    places[id].set_foraging_item('coral_fungus', 5, false); //这个地点可采集的物品，珊瑚菌
    places[id].set_foraging_item('chanterelle', 5, false); //这个地点可采集的物品，鸡油菌
    places[id].set_foraging_item('viresilver_stem', 1, true, 1440); //这个地点可采集的物品，绿银草茎
    places[id].set_fishing_data(0, 48, 2); //这个地点的钓鱼相关参数
    places[id].set_fishing_fish('river_crab', 3, false); //这个地点可钓到的鱼，河蟹
    places[id].set_fishing_fish('iron_bone_fish', 3, false); //这个地点可钓到的鱼，铁骨鱼
    places[id].set_fishing_fish('bite_fish', 1, false); //这个地点可钓到的鱼，咬鱼

    id = 'forest_core'; //内层森林
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('VBH_rest_location', 'alp_cave_inlet', 'FC_scree', 'FC_Peakarea');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(5); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('oak_tree', 20, false); //这个地点可刷的树，橡树
    places[id].set_logging_tree('ash_skin_birch', 20, false); //这个地点可刷的树，灰肤桦
    places[id].set_logging_tree('pine', 5, false); //这个地点可刷的树，松树
    places[id].set_logging_tree('frost_marrow_pine', 1, true, 1, 4320); //这个地点可刷的树，寒髓松
    places[id].set_foraging_data(90); //这个地点的采集相关参数，采集防御力90点
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，朽木
    places[id].set_foraging_item('animal_bone', 50, false); //这个地点可采集的物品，兽骨
    places[id].set_foraging_item('hard_rock', 50, false); //这个地点可采集的物品，坚硬岩石
    places[id].set_foraging_item('pine_logs', 50, false); //这个地点可采集的物品，松树原木
    places[id].set_foraging_item('sliver_coin', 20, false); //这个地点可采集的物品，银币
    places[id].set_foraging_item('greedy_copper_coin', 5, false); //这个地点可采集的物品，贪婪的铜币
    places[id].set_foraging_item('termite_mushroom', 5, true, 3, 1440); //这个地点可采集的物品，鸡枞
    places[id].set_foraging_item('frost_marrow_ice', 1, true, 1, 2880); //这个地点可采集的物品，寒髓松冰晶

    id = 'FC_scree'; //内层森林-碎石坡
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('forest_core');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(20); //这个地点的伐木相关参数，树的复活时间20秒
    places[id].set_logging_tree('bushes', 20, false); //这个地点可刷的树，灌木丛
    places[id].set_foraging_data(300); //这个地点的采集相关参数，采集防御力300点
    places[id].set_foraging_item('hard_rock', 5, false); //这个地点可采集的物品，坚硬岩石
    places[id].set_foraging_item('lowFe_rock', 1, false); //这个地点可采集的物品，含铁岩石

    id = 'FC_Peakarea'; //内层森林-山顶区域
    add_normal_Place(places, id, area);
    places[id].add_connect_normal_place('forest_core');
    places[id].set_live_plan_flag(9); //当前地点可以执行的生活技能
    places[id].set_logging_data(5); //这个地点的伐木相关参数，树的复活时间5秒
    places[id].set_logging_tree('pine', 30, false); //这个地点可刷的树，松树
    places[id].set_logging_tree('lightning_iron_fir', 1, true, 5, 4320); //这个地点可刷的树，雷击铁杉
    places[id].set_logging_tree('frost_marrow_pine', 1, true, 5, 4320); //这个地点可刷的树，寒髓松
    places[id].set_foraging_data(300); //这个地点的采集相关参数，采集防御力300点
    places[id].set_foraging_item('decayed_wood', 50, false); //这个地点可采集的物品，含铁岩石
    places[id].set_foraging_item('pine_logs', 20, false); //这个地点可采集的物品，松树原木
    places[id].set_foraging_item('lightning_bark', 5, true, 1, 1440); //这个地点可采集的物品，雷杉树皮
    places[id].set_foraging_item('lightning_iron_logs', 1, true, 1, 1440); //这个地点可采集的物品，雷击铁杉木
    places[id].set_foraging_item('ice_matsutake', 1, true, 1, 1440); //这个地点可采集的物品，冰松茸
    places[id].set_foraging_item('frost_marrow_ice', 1, true, 1, 1440); //这个地点可采集的物品，寒髓松冰晶
}
//后山洞穴区域的普通地点
function init_backhill_cave_place(places) {
    let id = 'cave_inlet'; //洞穴入口
    add_normal_Place(places, id, 'backhill_cave');
    places[id].add_connect_normal_place('forest_edge', 'karst_cave');
    id = 'karst_cave'; //溶洞
    add_normal_Place(places, id, 'backhill_cave');
    places[id].add_connect_normal_place('cave_inlet');

    id = 'alp_cave_inlet'; //高山洞穴入口
    add_normal_Place(places, id, 'backhill_cave');
    places[id].add_connect_normal_place('forest_core');
}

export { init_Place_normal };
