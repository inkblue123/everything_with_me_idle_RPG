import { add_Side_event_obj } from './Game_Event_class.js';

function init_side_quest(game_events) {
    let id;

    id = 'study_fishing'; //学会钓鱼
    add_Side_event_obj(game_events, id);
    //完成条件
    // game_events[id].set_finish_condition('AAAA', true);//在村里的木工坊购买鱼竿
    game_events[id].set_finish_condition('EE_VM_woodshop_study_fishing', true); //向木工坊老板询问如何钓鱼
    // game_events[id].set_finish_condition('PKL_EnemyId_Training_Dummy', 3); //击杀3个训练草人
    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'GS_unlock_FIS', true);
    game_events[id].set_finish_reward('game_flag', 'study_fishing', true);

    id = 'study_mining'; //学会挖矿
    add_Side_event_obj(game_events, id);
    //完成条件
    //解锁了挖矿（由铁匠铺老板的力量测试事件设置）
    game_events[id].set_finish_condition('GS_unlock_MIN', true);
    //给“解锁挖矿”这个条件配一条任务专属文案，显示优先级高于全局条件文案
    game_events[id].set_condition_text('GS_unlock_MIN', 'condition_text1');
    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'GS_unlock_MIN', true);
    game_events[id].set_finish_reward('game_flag', 'study_mining', true);
}

export { init_side_quest };
