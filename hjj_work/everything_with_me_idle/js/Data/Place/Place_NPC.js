import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id;

    id = 'village_Combat_coach'; //兵营教练
    add_NPC_Place(places, id, 'village');
    // places[id].add_behavior('new_player_combat_test');
    //有条件出现的事件入口
    places[id].add_condition_behavior('new_player_combat_test');
    places[id].add_condition_behavior('new_player_teach_1', 'new_player_teach_2', 'new_player_teach_3');
    //有条件出现的见面对话，按优先级排列
    places[id].add_condition_meet_chat('text1', 'SGS_new_player_combat_test', 'exit');
    places[id].add_condition_meet_chat('text2', 'SGS_new_player_combat_test', 'death');
    places[id].add_condition_meet_chat('text3', 'SGS_new_player_combat_test', 'finish');
    places[id].add_condition_meet_chat('default_meet_chat', 'new_player_combat_test', true);
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 1);
    // places[id].add_condition_meet_chat('use_game_status', 'UGS_village_barracks_week', 2);

    id = 'village_old_woman'; //村口老妇
    add_NPC_Place(places, id, 'village_backhill');
    //有条件出现的事件入口
    places[id].add_condition_behavior('unlock_foraging_logging');
    // //有条件出现的见面对话，按优先级排列
    // places[id].add_condition_meet_chat('text1', 'SGS_new_player_combat_test', 'exit');
    // places[id].add_condition_meet_chat('text2', 'SGS_new_player_combat_test', 'death');
    // places[id].add_condition_meet_chat('text3', 'SGS_new_player_combat_test', 'finish');
    // places[id].add_condition_meet_chat('default_meet_chat', 'new_player_combat_test', true);
}

export { init_Place_NPC };
