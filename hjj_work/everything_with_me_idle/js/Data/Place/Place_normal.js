import { add_normal_Place } from './Place_class.js';

function init_Place_normal(places) {
    let id = 'test_normal1';
    add_normal_Place(places, id);
    //可联通地点的id
    places[id].add_connected_place('test_combat1');
}

export { init_Place_normal };
