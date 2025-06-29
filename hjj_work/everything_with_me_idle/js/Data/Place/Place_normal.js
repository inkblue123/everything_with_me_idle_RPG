import { add_normal_Place } from './Place_class.js';

function init_Place_normal(places) {
    let id = 'game_statr';
    add_normal_Place(places, id, 'test');
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');
    id = 'test_normal1';
    add_normal_Place(places, id, 'test');
    //可联通地点的id
    places[id].add_connect_normal_place('test_combat1');

    id = 'village_home'; //村中住所
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_other_place('village_home_bed');

    id = 'village_square'; //村庄大广场
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_home', 'village_barracks', 'village_hospital');
    places[id].condition_connected_place = {
        // village_market: ['finish_main_quest_1'], //完成第一章才允许进入集市
        // village_outside_mountain: ['finish_main_quest_1'], //完成第一章才允许进入村外后山
    };

    id = 'village_market'; //村庄集市
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');

    id = 'village_barracks'; //村庄兵营
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
    places[id].add_connect_combat_place('VB_melee_train', 'VB_range_train');
    places[id].add_place_NPC('village_Combat_coach');

    id = 'village_hospital'; //村庄诊所
    add_normal_Place(places, id, 'village');
    places[id].add_connect_normal_place('village_square');
}

export { init_Place_normal };
