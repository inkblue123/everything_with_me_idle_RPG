import { add_Challenge_obj } from './Game_Event_class.js';

function init_Challenge(game_events) {
    let id = 'new_player_combat_test';
    add_Challenge_obj(game_events, id);
    game_events[id].set_conditions_appear('new_player_combat_test', false);

    // game_events[id].add_behavior('new_player_combat_test');
    game_events[id].place = 'new_player_combat_test'; //挑战开始地点
    game_events[id].finish_condition = {
        PKL_melee_kill: 3, //近战击杀3个敌人
        ATD_all_armor: 10, //4个部位防具都穿着的情况下受击10次
        DSE_shield_defense: 3, //使用“盾牌防御”技能抵挡敌人3次攻击
    }; //挑战完成条件
    game_events[id].finish_reward = {
        //标记完成了相关内容
        game_flag: {
            new_player_combat_test: true, //挑战本身完成
            // main_quest_1: true, //第一章完成
        },
    }; //挑战完成奖励
}

export { init_Challenge };
