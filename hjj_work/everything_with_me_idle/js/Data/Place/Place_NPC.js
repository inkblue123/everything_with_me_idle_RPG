import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id = 'village_Combat_coach';
    add_NPC_Place(places, id, 'village');
    places[id].add_behavior('new_player_combat_test');
    // places[id].add_condition_behavior('use_game_status', 'UGS_village_barracks_week', 1, 'new_player_teach_1');
    places[id].condition_behaviors = ['new_player_teach_1', 'new_player_teach_2'];

    //见面对话，按优先级排列，对话的文本id是状态id+状态值
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'exit');
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'death');
    places[id].add_condition_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'finish');
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 1);
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 2);
}

export { init_Place_NPC };
