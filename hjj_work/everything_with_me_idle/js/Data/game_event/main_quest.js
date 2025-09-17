import { add_Main_quest_obj } from './Game_Event_class.js';

function init_main_quest(game_events) {
    let id;

    id = 'main_quest_1';
    add_Main_quest_obj(game_events, id);
    //完成条件
    game_events[id].set_finish_condition('EE_new_player_combat_test', true);
    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'main_quest_1', true);
    // game_events[id].set_finish_reward('start_event', 'main_quest_2');
}

export { init_main_quest };
