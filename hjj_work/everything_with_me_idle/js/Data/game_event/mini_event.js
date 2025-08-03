import { add_Mini_event_obj } from './Game_Event_class.js';

function init_mini_event(game_events) {
    let id = 'new_player_teach_1'; //周一新手教学
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 1);
    game_events[id].set_conditions_appear('new_player_teach_1', false);
    //该迷你事件的所有流程
    game_events[id].set_new_process('first', 'text1');
    game_events[id].add_process_button('first', 'b1', 'text2');
    game_events[id].add_process_button_click('first', 'b1', 'next_process', 'end');
    game_events[id].add_process_button_thing('first', 'b1', 'get_skill', 'normal_attack_Melee');

    id = 'new_player_teach_2'; //周二新手教学
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 2);
    game_events[id].set_conditions_appear('new_player_teach_2', false);
    //该迷你事件的所有流程
    game_events[id].set_new_process('first', 'text1');
    game_events[id].add_process_button('first', 'b1', 'text2');
    game_events[id].add_process_button_click('first', 'b1', 'next_process', 'end');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_sword', 1, 'ordinary');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_helmet', 1, 'ordinary');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_chest_armor', 1, 'ordinary');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_leg_armor', 1, 'ordinary');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_shoes', 1, 'ordinary');

    id = 'new_player_teach_3'; //周三新手教学
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 3);
    game_events[id].set_conditions_appear('new_player_teach_3', false);
    //该迷你事件的所有流程
    game_events[id].set_new_process('first', 'text1');
    game_events[id].add_process_button('first', 'b1', 'text2');
    game_events[id].add_process_button_click('first', 'b1', 'next_process', 'end');
    game_events[id].add_process_button_thing('first', 'b1', 'get_item', 'wood_shield', 1, 'ordinary');
    game_events[id].add_process_button_thing('first', 'b1', 'get_skill', 'shield_defense');

    id = 'new_game_start'; //开始新游戏
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件，无条件
    //该迷你事件的所有流程
    game_events[id].set_new_process('first', 'text1');
    game_events[id].add_process_button('first', 'b1', 'text2');
    game_events[id].add_process_button_click('first', 'b1', 'next_process', 'process1');
    game_events[id].set_new_process('process1', 'text3');
    game_events[id].add_process_button('process1', 'b2', 'text4'); //流程1新增一个b2按钮
    game_events[id].add_process_button_click('process1', 'b2', 'chat', 'text5'); //b2按钮点击之后触发对话
    game_events[id].add_process_button_condition('process1', 'b2', 'b2', false); //b2按钮出现条件是b2按钮没有被点击过
    game_events[id].add_process_button_thing('process1', 'b2', 'show_div', 'player_status', 'game_log');
    game_events[id].add_process_button('process1', 'b3', 'text6');
    game_events[id].add_process_button_click('process1', 'b3', 'chat', 'text7');
    game_events[id].add_process_button_condition('process1', 'b3', 'b3', false); //b3按钮出现条件是b3按钮没有被点击过
    game_events[id].add_process_button_thing('process1', 'b3', 'show_div', 'map', 'control_name_left_div');
    game_events[id].add_process_button('process1', 'b4', 'text8');
    game_events[id].add_process_button_click('process1', 'b4', 'next_process', 'process2');
    game_events[id].add_process_button_condition('process1', 'b4', 'b2', true, 'b3', true); //b4按钮出现条件是b2和b3都被点击了
    game_events[id].set_new_process('process2', 'text9');
    game_events[id].add_process_button('process2', 'b5', 'text10');
    game_events[id].add_process_button_click('process2', 'b5', 'chat', 'text11');
    game_events[id].add_process_button_condition('process2', 'b5', 'b5', false);
    game_events[id].add_process_button('process2', 'b6', 'text12');
    game_events[id].add_process_button_click('process2', 'b6', 'chat', 'text13');
    game_events[id].add_process_button_condition('process2', 'b6', 'b6', false);
    game_events[id].add_process_button('process2', 'b7', 'text14');
    game_events[id].add_process_button_click('process2', 'b7', 'chat', 'text15');
    game_events[id].add_process_button_condition('process2', 'b7', 'b7', false);
    game_events[id].add_process_button('process2', 'b8', 'text0');
    game_events[id].add_process_button_click('process2', 'b8', 'next_process', 'process3');
    game_events[id].add_process_button_condition('process2', 'b8', 'b5', true, 'b6', true, 'b7', true);
    game_events[id].set_new_process('process3', 'text16');
    game_events[id].add_process_button('process3', 'b9', 'text0');
    game_events[id].add_process_button_click('process3', 'b9', 'next_process', 'process4');
    game_events[id].add_process_button_thing('process3', 'b9', 'set_player_attr', 'health_point', 100);
    game_events[id].set_new_process('process4', 'text17');
    game_events[id].add_process_button('process4', 'b10', 'text18');
    game_events[id].add_process_button_click('process4', 'b10', 'next_process', 'process5');
    game_events[id].add_process_button_thing('process4', 'b10', 'show_div', 'Combat_plan', 'Live_plan');
    game_events[id].add_process_button_thing('process4', 'b10', 'move_place', 'village_home');
    game_events[id].set_new_process('process5', 'text19');
    game_events[id].add_process_button('process5', 'b11', 'text20');
    game_events[id].add_process_button_click('process5', 'b11', 'next_process', 'process6');
    game_events[id].set_new_process('process6', 'text21');
    game_events[id].add_process_button('process6', 'b12', 'text22');
    game_events[id].add_process_button_click('process6', 'b12', 'next_process', 'process7');
    game_events[id].set_new_process('process7', 'text23');
    game_events[id].add_process_button('process7', 'b13', 'text24');
    game_events[id].add_process_button_click('process7', 'b13', 'next_process', 'end');
    game_events[id].add_process_button_thing('process7', 'b13', 'reset_time');
    game_events[id].add_process_button_thing('process7', 'b13', 'show_div', 'control_name_right_div');

    id = 'get_up'; //起床
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件
    // game_events[id].set_conditions_appear('UGS_village_barracks_week', 3);
    //该迷你事件的所有流程
    game_events[id].set_new_process('first', 'text1');
    game_events[id].add_process_buff('first', 'get_up_buff');
    game_events[id].add_process_button('first', 'b1', 'text2');
    game_events[id].add_process_button_click('first', 'b1', 'next_process', 'end');
    game_events[id].add_process_button_thing('first', 'b1', 'move_place', 'village_home');
    game_events[id].game_log_flag = false; //这个迷你事件在完成时不产生游戏日志
}

export { init_mini_event };
