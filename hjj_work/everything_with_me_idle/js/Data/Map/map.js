import { add_Map_object } from './map_class.js';

var maps = new Object();

//初始化地图库
function init_maps() {
    //初始化测试区域的地图信息
    init_test_map(maps);
    //初始化村庄区域的地图信息
    init_village_map(maps);
    //初始化村外后山区域的地图信息
    init_village_backhill_map(maps);
    //初始化村外后山洞穴区域的地图信息
    init_backhill_cave_map(maps);
}
//初始化测试区域的地图信息
function init_test_map(maps) {
    let area_id;
    let place_id;

    //区域
    area_id = 'test'; //测试区域
    add_Map_object(maps, area_id);
    maps[area_id].set_area_data(600, 400); //区域地图大小

    //区域内战斗地点
    place_id = 'test_combat1'; //测试战斗地点
    maps[area_id].add_place_data(place_id, true, 70, 120);

    //区域内普通地点
    place_id = 'game_statr';
    maps[area_id].add_place_data(place_id, true, 70, 240);
    place_id = 'test_normal1';
    maps[area_id].add_place_data(place_id, true, 250, 240);

    //区域内NPC地点
    //区域内其他地点
    //区域内资源地点
    //区域内商店地点
    //该区域和其他区域相连的地点
}
//初始化村庄区域的地图信息
function init_village_map(maps) {
    let area_id;
    let place_id;

    //区域
    area_id = 'village'; //村庄
    add_Map_object(maps, area_id);
    maps[area_id].set_area_data(600, 400); //区域地图大小

    //区域内战斗地点
    place_id = 'VB_melee_train'; //村庄兵营-近战训练场地
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'village_barracks');
    place_id = 'VB_range_train'; //村庄兵营-远程训练场地
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'village_barracks');
    place_id = 'new_player_combat_test'; //新手战斗训练场所
    maps[area_id].add_place_data(place_id, false);

    //区域内普通地点
    place_id = 'village_home'; //村中住所
    maps[area_id].add_place_data(place_id, true, 70, 240);
    maps[area_id].add_place_event_tip_show(place_id, 'village_home');
    // maps[area_id].add_place_button_line(place_id, 'village_square');
    place_id = 'village_square'; //村庄大广场
    maps[area_id].add_place_data(place_id, true, 250, 240);
    maps[area_id].add_place_event_tip_show(place_id, 'village_square');
    maps[area_id].add_place_button_line(place_id, 'village_home', 'village_hospital', 'VBH_rest_location', 'village_barracks', 'village_market');
    place_id = 'village_market'; //村庄集市
    maps[area_id].add_place_data(place_id, true, 250, 120);
    maps[area_id].add_place_event_tip_show(place_id, 'village_market');
    maps[area_id].add_place_button_line(place_id, 'VM_trade_hub', 'VM_woodshop', 'VM_smithy');
    place_id = 'village_barracks'; //村庄兵营
    maps[area_id].add_place_data(place_id, true, 430, 240);
    maps[area_id].add_place_event_tip_show(place_id, 'village_barracks');
    place_id = 'village_hospital'; //村庄诊所
    maps[area_id].add_place_data(place_id, true, 70, 120);
    maps[area_id].add_place_event_tip_show(place_id, 'village_hospital');
    place_id = 'VM_woodshop'; //村庄集市-木工坊
    maps[area_id].add_place_data(place_id, true, 250, 0);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_woodshop');
    place_id = 'VM_smithy'; //村庄集市-铁匠铺
    maps[area_id].add_place_data(place_id, true, 430, 0);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_smithy');

    //区域内NPC地点
    place_id = 'village_Combat_coach'; //兵营教练
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'village_barracks');
    place_id = 'village_woodshop_owner'; //木工坊老板
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_woodshop');
    place_id = 'village_smithy_owner'; //铁匠铺老板
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_smithy');
    //区域内其他地点
    place_id = 'village_home_bed'; //村中住所-床上
    maps[area_id].add_place_data(place_id, false);

    //区域内资源地点

    //区域内商店地点
    place_id = 'VH_pharmacy'; //村庄诊所-药房
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'village_hospital');
    place_id = 'VM_smithy_showcase'; //村庄集市-铁匠铺-商品橱窗
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_smithy');
    place_id = 'VM_woodshop_showcase'; //村庄集市-木工坊-商品橱窗
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_woodshop');
    place_id = 'VM_trade_hub'; //村庄集市-交易市场
    maps[area_id].add_place_data(place_id, true, 70, 0);
    maps[area_id].add_place_event_tip_show(place_id, 'VM_trade_hub');

    //该区域和其他区域相连的地点
    place_id = 'VBH_rest_location'; //村外后山区域-村外歇脚处
    maps[area_id].add_place_data(place_id, true, 250, 340);
    maps[area_id].add_place_event_tip_show(place_id, 'VBH_rest_location');
}
//初始化村外后山区域的地图信息
function init_village_backhill_map(maps) {
    let area_id;
    let place_id;

    //区域
    area_id = 'village_backhill'; //村外后山
    add_Map_object(maps, area_id);
    maps[area_id].set_area_data(700, 700);

    //战斗地点
    place_id = 'forest_edge_road'; //通往森林外围的道路
    maps[area_id].add_place_data(place_id, true, 100, 180);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_edge_road');
    place_id = 'forest_core_road'; //通往内层森林的道路
    maps[area_id].add_place_data(place_id, true, 460, 430);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_core_road');

    //普通地点
    place_id = 'VBH_rest_location'; //村外歇脚处
    maps[area_id].add_place_data(place_id, true, 260, 100);
    maps[area_id].add_place_event_tip_show(place_id, 'VBH_rest_location');
    maps[area_id].add_place_button_line(place_id, 'village_square', 'cemetery', 'forest_edge_road', 'forest_edge', 'forest_core', 'logged_forest');
    place_id = 'logged_forest'; //已开荒的林区
    maps[area_id].add_place_data(place_id, true, 410, 100);
    maps[area_id].add_place_event_tip_show(place_id, 'logged_forest');
    maps[area_id].add_place_button_line(place_id, 'LF_grass', 'LF_woodland', 'LF_creek');
    place_id = 'LF_grass'; //已开荒的林区-草地
    maps[area_id].add_place_data(place_id, true, 570, 100);
    maps[area_id].add_place_event_tip_show(place_id, 'LF_grass');
    place_id = 'LF_woodland'; //已开荒的林区-林地
    maps[area_id].add_place_data(place_id, true, 570, 170);
    maps[area_id].add_place_event_tip_show(place_id, 'LF_woodland');
    place_id = 'LF_creek'; //已开荒的林区-小溪
    maps[area_id].add_place_data(place_id, true, 570, 30);
    maps[area_id].add_place_event_tip_show(place_id, 'LF_creek');
    place_id = 'cemetery'; //墓地
    maps[area_id].add_place_data(place_id, true, 100, 30);
    maps[area_id].add_place_event_tip_show(place_id, 'cemetery');
    place_id = 'forest_edge'; //外层森林
    maps[area_id].add_place_data(place_id, true, 210, 300);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_edge');
    maps[area_id].add_place_button_line(place_id, 'forest_edge_road', 'cave_inlet', 'forest_core', 'forest_core_road', 'FE_pond', 'FE_woodland');
    place_id = 'FE_woodland'; //外层森林-林地
    maps[area_id].add_place_data(place_id, true, 420, 220);
    maps[area_id].add_place_event_tip_show(place_id, 'FE_woodland');
    place_id = 'FE_pond'; //外层森林-池塘
    maps[area_id].add_place_data(place_id, true, 550, 330);
    maps[area_id].add_place_event_tip_show(place_id, 'FE_pond');
    place_id = 'forest_core'; //内层森林
    maps[area_id].add_place_data(place_id, true, 320, 525);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_core');
    maps[area_id].add_place_button_line(place_id, 'FC_scree', 'alp_cave_inlet', 'FC_Peakarea', 'forest_core_road');
    place_id = 'FC_scree'; //内层森林-碎石坡
    maps[area_id].add_place_data(place_id, true, 90, 400);
    maps[area_id].add_place_event_tip_show(place_id, 'FC_scree');
    place_id = 'FC_Peakarea'; //内层森林-山顶区域
    maps[area_id].add_place_data(place_id, true, 90, 610);
    maps[area_id].add_place_event_tip_show(place_id, 'FC_Peakarea');

    //NPC地点
    place_id = 'village_old_woman'; //村口老妇
    maps[area_id].add_place_data(place_id, false);
    maps[area_id].add_place_event_tip_show(place_id, 'VBH_rest_location');

    //其他地点
    //资源地点
    //商店地点

    //该区域和其他区域相连的地点
    place_id = 'village_square'; //村庄大广场
    maps[area_id].add_place_data(place_id, true, 260, 0);
    maps[area_id].add_place_event_tip_show(place_id, 'village_square');
    place_id = 'cave_inlet'; //洞穴入口
    maps[area_id].add_place_data(place_id, true, 0, 300);
    maps[area_id].add_place_event_tip_show(place_id, 'cave_inlet');
    place_id = 'alp_cave_inlet'; //高山洞穴入口
    maps[area_id].add_place_data(place_id, true, 0, 500);
    maps[area_id].add_place_event_tip_show(place_id, 'alp_cave_inlet');
    // place_id = 'alp_cave_inlet'; //猎人小屋
    // maps[area_id].add_place_data(place_id, true, 250, 340);
}
//初始化村外后山洞穴区域的地图信息
function init_backhill_cave_map(maps) {
    let area_id;
    let place_id;

    //区域
    area_id = 'backhill_cave'; //村外后山洞穴
    add_Map_object(maps, area_id);
    maps[area_id].set_area_data(770, 550); //区域地图大小

    //区域内普通地点
    place_id = 'cave_inlet'; //洞穴入口
    maps[area_id].add_place_data(place_id, true, 470, 140);
    maps[area_id].add_place_event_tip_show(place_id, 'cave_inlet');
    //洞内只有入口与溶洞相通；两个洞口各自用跨区按钮走回后山
    maps[area_id].add_place_button_line(place_id, 'karst_cave', 'forest_edge');
    place_id = 'karst_cave'; //溶洞
    maps[area_id].add_place_data(place_id, true, 70, 140);
    maps[area_id].add_place_event_tip_show(place_id, 'karst_cave');
    place_id = 'alp_cave_inlet'; //高山洞穴入口
    maps[area_id].add_place_data(place_id, true, 470, 430);
    maps[area_id].add_place_event_tip_show(place_id, 'alp_cave_inlet');
    maps[area_id].add_place_button_line(place_id, 'forest_core');

    //该区域和其他区域相连的地点
    place_id = 'forest_edge'; //外层森林
    maps[area_id].add_place_data(place_id, true, 670, 140);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_edge');
    place_id = 'forest_core'; //内层森林
    maps[area_id].add_place_data(place_id, true, 670, 430);
    maps[area_id].add_place_event_tip_show(place_id, 'forest_core');
}

export { maps, init_maps };
