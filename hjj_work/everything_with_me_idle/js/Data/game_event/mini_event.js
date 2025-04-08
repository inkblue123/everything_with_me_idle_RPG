import { add_Mini_event_obj } from './Game_Event_class.js';

function init_mini_event(game_events) {
    let id = 'new_player_teach_1';
    add_Mini_event_obj(game_events, id);
    // game_events[id].isrepeat = false; //该迷你事件是否可以重复
    //该迷你事件出现的条件
    // game_events[id].set_conditions_appear('UGS_village_barracks_week', 1, 'new_player_teach_1', false);
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 1);
    game_events[id].set_conditions_appear('new_player_teach_1', false);
    //该迷你事件的所有流程
    game_events[id].set_process('first', 'chat', 'text1');
    game_events[id].process['first'].button = [
        {
            text: 'text2', //这个按钮的文本
            next: 'end', //按下之后进行的下一个流程
            thing: [
                {
                    type: 'get_skill',
                    skill_id: ['normal_attack_Melee'],
                },
            ],
        },
    ];

    id = 'new_player_teach_2';
    add_Mini_event_obj(game_events, id);
    // game_events[id].isrepeat = false; //该迷你事件是否可以重复
    //该迷你事件出现的条件
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 2);
    game_events[id].set_conditions_appear('new_player_teach_2', false);
    //该迷你事件的所有流程
    game_events[id].set_process('first', 'chat', 'text1');
    game_events[id].process['first'].button = [
        {
            text: 'text2', //这个按钮的文本
            next: 'end', //按下之后进行的下一个流程
            thing: [
                {
                    type: 'get_item',
                    item: [
                        {
                            id: 'wood_sword',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                        {
                            id: 'wood_helmet',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                        {
                            id: 'wood_chest_armor',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                        {
                            id: 'wood_leg_armor',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                        {
                            id: 'wood_shoes',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                    ],
                },
            ],
        },
    ];

    id = 'new_player_teach_3';
    add_Mini_event_obj(game_events, id);
    //该迷你事件出现的条件
    game_events[id].set_conditions_appear('UGS_village_barracks_week', 3);
    game_events[id].set_conditions_appear('new_player_teach_3', false);
    //该迷你事件的所有流程
    game_events[id].set_process('first', 'chat', 'text1');
    game_events[id].process['first'].button = [
        {
            text: 'text2', //这个按钮的文本
            next: 'end', //按下之后进行的下一个流程
            thing: [
                {
                    type: 'get_skill',
                    skill_id: ['normal_attack_Melee'],
                },
                {
                    type: 'get_item',
                    item: [
                        {
                            id: 'wood_shield',
                            num: 1,
                            equip_rarity: 'ordinary',
                        },
                    ],
                },
            ],
        },
    ];
}

export { init_mini_event };
