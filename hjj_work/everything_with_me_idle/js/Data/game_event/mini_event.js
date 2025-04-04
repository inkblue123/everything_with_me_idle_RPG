import { add_Mini_event_obj } from './Game_Event_class.js';

function init_mini_event(game_events) {
    let id = 'new_player_teach_1';
    add_Mini_event_obj(game_events, id);
    game_events[id].isrepeat = false; //该迷你事件是否可以重复
    //该迷你事件的所有流程
    game_events[id].process = {
        first: {
            type: 'chat', //事件第一幕，对话
            control_dest_text: 'text1', //在控制界面的描述中展示的文本
            button: [
                {
                    text: 'text2', //这个按钮的文本
                    next: 'end', //按下之后进行的下一个流程
                    thing: [
                        {
                            type: 'get_skill',
                            value: ['normal_attack_Melee'],
                        },
                    ],
                },
            ],
        },
    };
    //异常时中止事件，回到事件开始的地点，设置异常状态
    game_events[id].abnormal_text = {
        repeat_error: 'SGS_new_player_teach_1',
    };
}

export { init_mini_event };
