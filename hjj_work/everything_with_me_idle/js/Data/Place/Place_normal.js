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

function init_test_normal_place(places) {
    let id = 'game_statr';
    add_normal_Place(places, id, 'test');
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');
    id = 'test_normal1';
    add_normal_Place(places, id, 'test');
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');
}

function init_village_normal_place(places) {
    let id = 'village_home'; //村中住所
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_other_place('village_home_bed');

    id = 'village_square'; //村庄大广场
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_home', 'village_barracks', 'village_hospital');
    places[id].condition_connect_normal_place = {
        village_market: { main_quest_1: true }, //完成第一章才允许进入集市
        VBH_rest_location: { main_quest_1: true }, //完成第一章才允许进入村外后山
    };

    id = 'village_market'; //村庄集市
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_store_place('VM_smithy', 'VM_woodshop', 'VM_trade_hub');

    id = 'village_barracks'; //村庄兵营
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_combat_place('VB_melee_train', 'VB_range_train');
    places[id].add_place_NPC('village_Combat_coach');

    id = 'village_hospital'; //村庄诊所
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_store_place('VH_pharmacy');
}

function init_village_backhill_normal_place(places) {
    let id = 'VBH_rest_location'; //村外歇脚处
    add_normal_Place(places, id, 'village_backhill');
    // places[id].add_connect_normal_place('village_square', 'cemetery', 'logged_forest', 'forest_edge');
    places[id].add_connect_normal_place('village_square', 'cemetery', 'logged_forest', 'forest_edge_road');

    id = 'logged_forest'; //已开荒的林区
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('VBH_rest_location', 'LF_grass', 'LF_woodland', 'LF_creek');

    id = 'LF_grass'; //已开荒的林区-草地
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('logged_forest');
    id = 'LF_woodland'; //已开荒的林区-林地
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('logged_forest');
    id = 'LF_creek'; //已开荒的林区-小溪
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('logged_forest');

    id = 'cemetery'; //墓地
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('VBH_rest_location');

    id = 'forest_edge'; //外层森林
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place(
        'VBH_rest_location',
        'cave_inlet',
        'forest_core_road',
        'FE_woodland',
        'FE_pond'
    );
    // places[id].add_connect_normal_place('VBH_rest_location', 'cave_inlet', 'forest_core', 'FE_woodland', 'FE_pond');
    id = 'FE_woodland'; //外层森林-林地
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('forest_edge');
    id = 'FE_pond'; //外层森林-池塘
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('forest_edge');

    id = 'forest_core'; //内层森林
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('VBH_rest_location', 'alp_cave_inlet', 'FC_scree', 'FC_Peakarea');
    id = 'FC_scree'; //内层森林-碎石坡
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('forest_core');
    id = 'FC_Peakarea'; //内层森林-山顶区域
    add_normal_Place(places, id, 'village_backhill');
    places[id].add_connect_normal_place('forest_core');
}

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
