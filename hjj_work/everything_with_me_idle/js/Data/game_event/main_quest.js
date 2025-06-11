import { add_Main_quest_obj } from './Game_Event_class.js';

function init_main_quest(game_events) {
    let id = 'main_quest_1';
    add_Main_quest_obj(game_events, id);
    //主线完成条件
    game_events[id].finish_condition = {
        EE_new_player_combat_test: true, //完成新手战斗训练
    };
    //挑战完成奖励
    game_events[id].finish_reward = {
        //标记完成了相关内容
        game_flag: {
            main_quest_1: true, //主线本身完成
        },
        // start_event: ['main_quest_2'],
    };
}

export { init_main_quest };
