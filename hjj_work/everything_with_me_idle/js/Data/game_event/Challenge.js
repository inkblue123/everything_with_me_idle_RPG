import { add_Challenge_obj } from './Game_Event_class.js';

function init_Challenge(game_events) {
    let id = 'new_player_combat_test';
    add_Challenge_obj(game_events, id);
    //事件出现条件
    game_events[id].set_conditions_appear('new_player_combat_test', false);

    // game_events[id].add_behavior('new_player_combat_test');
    game_events[id].place = 'new_player_combat_test'; //挑战开始地点
    //事件完成条件
    game_events[id].set_finish_condition('PKL_DamageType_melee', 3); //近战伤害击杀3个敌人
    game_events[id].set_finish_condition('ATD_all_armor', 10); //4个部位防具都穿着的情况下受击10次
    game_events[id].set_finish_condition('DSE_shield_defense', 3); //使用“盾牌防御”技能抵挡敌人3次攻击
    //完成奖励
    game_events[id].set_finish_reward('game_flag', 'new_player_combat_test', true); //挑战本身完成
    // game_events[id].set_finish_reward('game_flag', 'main_quest_1', true); //第一章完成
}

export { init_Challenge };
