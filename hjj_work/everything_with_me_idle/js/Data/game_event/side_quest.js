import { add_Side_event_obj } from './Game_Event_class.js';

function init_side_quest(game_events) {
    let id;

    id = 'study_fishing'; //学会钓鱼
    add_Side_event_obj(game_events, id);
    //完成条件
    // game_events[id].set_finish_condition('AAAA', true);//在村内商店里购买鱼竿
    // game_events[id].set_finish_condition('BBBB', true);//向商店老板询问如何钓鱼
    game_events[id].set_finish_condition('PKL_EnemyId_Training_Dummy', 3); //击杀3个训练草人

    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'GS_unlock_fishing', true);
    game_events[id].set_finish_reward('game_flag', 'study_fishing', true);

    id = 'study_mining'; //学会挖矿
    add_Side_event_obj(game_events, id);
    //完成条件
    // game_events[id].set_finish_condition('CCCC', true);//向铁匠铺老板询问如何挖矿
    // game_events[id].set_finish_condition('CCCC', true);//通过铁匠铺老板的力量测试
    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'GS_unlock_mining', true);
    game_events[id].set_finish_reward('game_flag', 'study_mining', true);
}

export { init_side_quest };
