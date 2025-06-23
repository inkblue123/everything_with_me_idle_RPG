import { add_Place_object } from './Place_class.js';

function init_Place_other(places) {
    let id = 'village_home_bed'; //村中住所-床上
    add_Place_object(places, id, 'village');
    places[id].add_connect_normal_place('village_home', 'village_square');
    places[id].buff = ['sleep_1'];
    places[id].add_condition_event('get_up', 'UGS_get_up_time_flag', true, 'UGS_game_speed', 30);
}

export { init_Place_other };
