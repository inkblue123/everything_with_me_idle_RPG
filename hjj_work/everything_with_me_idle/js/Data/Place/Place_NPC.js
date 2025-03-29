import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    let id = 'village_Combat_coach';
    add_NPC_Place(places, id);
    places[id].add_behavior_place('new_player_combat_test');
    //见面对话
    places[id].chat = [
        {
            //从“新手战斗训练”中退出时说的话
            status_type: 'short_game_status',
            status_id: 'new_player_combat_test',
            value: 'exit',
            text: '123',
        },
        {
            //从“新手战斗训练”中死亡时说的话
            status_type: 'short_game_status',
            status_id: 'new_player_combat_test',
            value: 'death',
            text: '456',
        },
        {
            //完成了“新手战斗训练”时说的话
            status_type: 'short_game_status',
            status_id: 'new_player_combat_test',
            value: 'finish',
            text: '789',
        },
        {
            //在村庄兵营处于轮周第一日的时候
            status_type: 'game_status',
            status_id: 'village_barracks_week',
            value: 1,
            text: '101112',
        },
        {
            //在村庄兵营处于轮周第二日的时候
            status_type: 'game_status',
            status_id: 'village_barracks_week',
            value: 2,
            text: '131415',
        },
    ];
    // {
    //     //

    //     normal: '123', //见面时说的话
    //     week:,
    // };
}

export { init_Place_NPC };
