import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id = 'village_Combat_coach';
    add_NPC_Place(places, id);
    places[id].add_behavior_place('new_player_combat_test');
}

export { init_Place_NPC };
