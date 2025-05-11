import { add_store_Place } from './Place_class.js';

function init_Place_store(places) {
    let id = 'VH_pharmacy'; //村庄诊所-药房
    add_store_Place(places, id, 'village');
    places[id].add_behavior('new_player_combat_test');
    // places[id].add_condition_behavior('use_game_status', 'UGS_village_barracks_week', 1, 'new_player_teach_1');
    places[id].condition_behaviors = ['new_player_teach_1', 'new_player_teach_2', 'new_player_teach_3'];
}

export { init_Place_store };
