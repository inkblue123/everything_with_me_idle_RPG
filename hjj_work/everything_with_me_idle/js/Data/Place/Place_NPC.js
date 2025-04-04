import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id = 'village_Combat_coach';
    add_NPC_Place(places, id, 'village');
    places[id].add_behavior_place('new_player_combat_test');
    places[id].add_condition_behavior_place('use_game_status', 'UGS_village_barracks_week', 1, 'new_player_teach_1');

    //见面对话，按优先级排列
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'exit');
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'death');
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'finish');
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 1);
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 2);
}

export { init_Place_NPC };
