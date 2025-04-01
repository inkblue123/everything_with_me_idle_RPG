import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id = 'village_Combat_coach';
    add_NPC_Place(places, id);
    places[id].add_behavior_place('new_player_combat_test');
    //见面对话，按优先级排列
    places[id].add_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'exit');
    places[id].add_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'death');
    places[id].add_meet_chat('short_game_status', 'SGS_new_player_combat_test', 'finish');
    places[id].add_meet_chat('use_game_status', 'UGS_village_barracks_week', 1);
    places[id].add_meet_chat('use_game_status', 'UGS_village_barracks_week', 2);

    // places[id].meet_chat = [
    //     {
    //         //从“新手战斗训练”中退出时说的话
    //         status_type: 'short_game_status',
    //         status_id: 'SGS_new_player_combat_test',
    //         value: 'exit',
    //         text: '你完成了',
    //     },
    //     {
    //         //从“新手战斗训练”中死亡时说的话
    //         status_type: 'short_game_status',
    //         status_id: 'SGS_new_player_combat_test',
    //         value: 'death',
    //         text: '456',
    //     },
    //     {
    //         //完成了“新手战斗训练”时说的话
    //         status_type: 'short_game_status',
    //         status_id: 'SGS_new_player_combat_test',
    //         value: 'finish',
    //         text: '789',
    //     },
    //     {
    //         //在村庄兵营处于轮周第一日的时候
    //         status_type: 'use_game_status',
    //         status_id: 'UGS_village_barracks_week',
    //         value: 1,
    //         text: '101112',
    //     },
    //     {
    //         //在村庄兵营处于轮周第二日的时候
    //         status_type: 'use_game_status',
    //         status_id: 'UGS_village_barracks_week',
    //         value: 2,
    //         text: '131415',
    //     },
    // ];
}

export { init_Place_NPC };
