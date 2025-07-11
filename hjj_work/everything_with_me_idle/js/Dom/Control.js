import { crtElement, empty_dom, addElement } from '../Function/Dom_function.js';
import { is_Empty_Object } from '../Function/Function.js';
import { places } from '../Data/Place/Place.js';
import { game_events } from '../Data/Game_event/Game_Event.js';
import { texts } from '../Data/Text/Text.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

var Control = crtElement('div', 'control', null, '');

//创建中下，玩家控制界面内的详细组件
{
    //角色所处的时间地点名称
    let control_name_div = crtElement('div', 'control_name_div', null, '');
    let left_div = addElement(control_name_div, 'div', 'control_name_left_div', null);
    var area_name_div = addElement(left_div, 'div', 'area_name_div', 'control_text_div');
    area_name_div.innerHTML = '区域';
    var place_name_div = addElement(left_div, 'div', 'place_name_div', 'control_text_div');
    place_name_div.innerHTML = '地点';
    let right_div = addElement(control_name_div, 'div', 'control_name_right_div', null);
    var game_date_div = addElement(right_div, 'div', 'game_date_div', 'control_text_div');
    game_date_div.innerHTML = '当前时间';

    //角色所处位置描述
    var Place_desc_div = crtElement('div', 'Place_desc_div', null, '');
    //容纳角色在这里能做的事情的div
    var player_Control_div = crtElement('div', 'player_Control_div', null, '');

    //组件放入角色属性装备界面中
    Control.appendChild(control_name_div);
    Control.appendChild(Place_desc_div);
    Control.appendChild(player_Control_div);
}

// 为组件添加触发事件
{
}

//移动到指定地点，读取地点库信息，展示到控制界面中
Control.show_now_place = function () {
    empty_dom(Place_desc_div); //清空原本地点描述
    empty_dom(player_Control_div); //清空原本地点的可执行操作

    let place_manage = global.get_place_manage();
    let now_place_id = place_manage.get_now_place();

    if (places[now_place_id].type == 'NPC') {
        show_new_NPC(places[now_place_id]);
    } else if (places[now_place_id].type == 'store') {
        show_new_store(places[now_place_id]);
    } else if (places[now_place_id].type == 'combat') {
        show_new_combat(places[now_place_id]);
    } else {
        // if (places[now_place_id].type == 'normal' ) {
        show_new_place(places[now_place_id]);
    }
    if (global.get_flag('GS_game_event')) {
        add_control_button_end_event('退出', null);
    }
};
//展示迷你事件的其中一个流程
Control.show_mini_event_process = function (event_id, process_id, click_button_id) {
    empty_dom(Place_desc_div); //清空原本描述
    empty_dom(player_Control_div); //清空原本的可执行操作按钮
    //展示文本
    let process = game_events[event_id].process[process_id];
    let text_id;
    if (click_button_id == undefined) {
        text_id = process.control_dest_text; //没有特殊情况，展示默认文本
    } else {
        text_id = process.button[click_button_id].click_text; //是点击按钮之后重新展示当前流程，所以展示按钮上绑定的文本
    }
    Place_desc_div.innerHTML = texts[event_id][text_id];

    //添加按钮
    let game_event_manage = global.get_game_event_manage();
    for (let button_id in process.button) {
        //判断按钮的出现条件
        if (!game_event_manage.check_mini_event_button_condition(event_id, process_id, button_id)) {
            continue;
        }
        //满足出现条件，在控制界面中添加按钮
        let control_button = addElement(player_Control_div, 'button', null, 'player_Control_button');
        control_button.innerHTML = texts[event_id][process.button[button_id].text];
        control_button.addEventListener('click', function () {
            game_event_manage.updata_mini_event(event_id, process_id, button_id);
        });
    }

    //这个流程中会获得buff
    if (!is_Empty_Object(process.buff)) {
        for (let buff_id of process.buff) {
            let P_attr = player.get_player_attributes();
            P_attr.set_buff_attr(buff_id);
        }
    }
};

//展示新地点的内容
function show_new_place(new_place) {
    //展示新地点的描述
    Place_desc_div.innerHTML = new_place.desc;

    //可以前往普通区域
    if (!is_Empty_Object(new_place.connect_normal_place)) {
        for (let next_place_id of new_place.connect_normal_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //有条件出现的普通区域
    if (!is_Empty_Object(new_place.condition_connect_normal_place)) {
        let global_flag_manage = global.get_global_flag_manage();
        for (let next_place_id in new_place.condition_connect_normal_place) {
            let condition = new_place.condition_connect_normal_place[next_place_id];
            let flag = true;
            for (let id in condition) {
                let status = global_flag_manage.get_flag(id); //当前需要判断的游戏状态的内容
                if (status != condition[id]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                add_control_button_move(next_place_id, '前往', null);
            }
        }
    }
    //可以前往战斗区域
    if (!is_Empty_Object(new_place.connect_combat_place)) {
        for (let next_place_id of new_place.connect_combat_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //此处有NPC
    if (!is_Empty_Object(new_place.place_NPC)) {
        for (let next_place_id of new_place.place_NPC) {
            add_control_button_move(next_place_id, '拜访', null);
        }
    }
    //可以前往商店
    if (!is_Empty_Object(new_place.connect_store_place)) {
        for (let next_place_id of new_place.connect_store_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //可以前往其他区域
    if (!is_Empty_Object(new_place.connect_other_place)) {
        for (let next_place_id of new_place.connect_other_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
}
//根据当前游戏状态，地点的描述
function make_new_place_dexc(new_place) {}
//移动到指定NPC面前，读取地点库信息，将可以进行的行动展示到控制界面中
function show_new_NPC(new_NPC) {
    //展示新地点的描述
    Place_desc_div.innerHTML = make_NPC_condition_meet_chat(new_NPC);

    //可以回到上一个普通区域
    let place_manage = global.get_place_manage();
    let last_normal_place_id = place_manage.get_last_normal_place();
    add_control_button_move(last_normal_place_id, '回到', null);

    //可以进行的常态事件
    if (!is_Empty_Object(new_NPC.behaviors)) {
        for (let next_place_id of new_NPC.behaviors) {
            add_control_button_start_event(next_place_id, '进行', null);
        }
    }
    //有条件出现的事件
    if (!is_Empty_Object(new_NPC.condition_behaviors)) {
        for (let event_id of new_NPC.condition_behaviors) {
            //对每个事件的出现条件进行判断，满足条件才在界面中添加按钮
            if (check_condition_appear_behaviors(event_id)) {
                add_control_button_start_event(event_id, '进行', null);
            }
        }
    }
}
//移动到了商店，展示相关内容
function show_new_store(new_store) {
    //展示新地点的描述
    Place_desc_div.innerHTML = new_store.desc;

    //可以回到上一个普通区域
    let place_manage = global.get_place_manage();
    let last_normal_place_id = place_manage.get_last_normal_place();
    add_control_button_move(last_normal_place_id, '回到', null);
}
//移动到了战斗区域，展示相关内容
function show_new_combat(new_combat) {
    //展示新地点的描述
    if (new_combat.combat_type != 'infinite_enemy') {
        //有限刷怪区域，需要明确展示剩余敌人数量
        let desc_div = addElement(Place_desc_div, 'div', null, null);
        desc_div.innerHTML = new_combat.desc;
        let remain_enemy_div = addElement(Place_desc_div, 'div', 'remain_enemy_div', null);
        let enemy_manage = global.get_enemy_manage();
        let now_place_enemy_cumulative = enemy_manage.get_place_enemy_cumulative_num(new_combat.id);
        let ch = '敌人数量剩余' + now_place_enemy_cumulative + '个';
        remain_enemy_div.innerHTML = ch;
    } else {
        //无限刷怪区域直接展示描述
        Place_desc_div.innerHTML = new_combat.desc;
    }

    //可以前往普通区域
    if (!is_Empty_Object(new_combat.connect_normal_place)) {
        for (let next_place_id of new_combat.connect_normal_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //有条件出现的普通区域
    if (!is_Empty_Object(new_combat.condition_connect_normal_place)) {
        let global_flag_manage = global.get_global_flag_manage();
        for (let next_place_id in new_combat.condition_connect_normal_place) {
            let condition = new_combat.condition_connect_normal_place[next_place_id];
            let flag = true;
            for (let id in condition) {
                let status = global_flag_manage.get_flag(id); //当前需要判断的游戏状态的内容
                if (status != condition[id]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                add_control_button_move(next_place_id, '前往', null);
            }
        }
    }
}
//向玩家控制界面添加一个按钮，按钮的效果是移动到其他区域
function add_control_button_move(new_place_id, front_text, after_text) {
    //组成按钮上的文本
    let button_text = make_button_text(front_text, places[new_place_id].name, after_text);
    //生成按钮
    let move_place_button = addElement(player_Control_div, 'div', null, 'player_Control_button');
    move_place_button.innerHTML = button_text;
    move_place_button.addEventListener('click', function () {
        let place_manage = global.get_place_manage();
        place_manage.set_now_place(new_place_id);
    });
}
//向玩家控制界面添加一个按钮，按钮的效果是开启特殊事件
function add_control_button_start_event(event_id, front_text, after_text) {
    //组成按钮上的文本
    let button_text = make_button_text(front_text, game_events[event_id].name, after_text);
    //生成按钮
    let move_place_button = addElement(player_Control_div, 'div', null, 'player_Control_button');
    move_place_button.innerHTML = button_text;
    move_place_button.addEventListener('click', function () {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.start_game_event(event_id);
    });
}
//向玩家控制界面添加一个按钮，按钮的效果是退出当前挑战
function add_control_button_end_event(front_text, after_text) {
    //组成按钮上的文本
    let game_event_manage = global.get_game_event_manage();
    let name = game_events[game_event_manage.get_now_challenge_id()].name;
    let button_text = make_button_text(front_text, name, after_text);
    //生成按钮
    let move_place_button = addElement(player_Control_div, 'div', null, 'player_Control_button');
    move_place_button.innerHTML = button_text;
    move_place_button.addEventListener('click', function () {
        game_event_manage.end_challenge('exit');
    });
}
//构建按钮上的文本
function make_button_text(front_text, name, after_text) {
    let button_text = '';
    if (front_text) button_text += front_text;
    button_text += name;
    if (after_text) button_text += after_text;
    return button_text;
}
//根据当前游戏状态，选择NPC说的话
function make_NPC_condition_meet_chat(NPC) {
    let text = NPC.name + '：';
    let chat_flag = false;
    //按照优先级，判断游戏状态是否符合说话的条件
    let global_flag_manage = global.get_global_flag_manage();
    for (let meet_chat_obj of NPC.condition_meet_chat) {
        //遍历其中一条对话meet_chat_obj
        let status_flag = true;
        //遍历判断这个对话的所有条件是否满足
        for (let status_obj of meet_chat_obj.status) {
            let status_id = status_obj.status_id;
            let value = status_obj.value;
            let status = global_flag_manage.get_flag(status_id); //当前这个游戏状态的内容
            if (status != value) {
                //有一个条件不满足，这条对话就不能出现
                status_flag = false;
                break;
            }
        }
        if (status_flag) {
            text += meet_chat_obj.text;
            chat_flag = true;
            break;
        }
    }
    //需要满足游戏状态的对话都不满足，使用默认对话
    if (!chat_flag) {
        text += NPC.default_meet_chat;
    }
    return text;
}
//根据当前游戏状态，判断该事件是否满足出现条件
function check_condition_appear_behaviors(event_id) {
    //没有条件，视作异常情况，不出现
    if (is_Empty_Object(game_events[event_id].conditions_appear)) {
        console.log('事件%s设定为有条件出现的事件，但没有定义条件');
        return false;
    }
    let flag = true;
    let global_flag_manage = global.get_global_flag_manage();
    for (let obj of game_events[event_id].conditions_appear) {
        let status = global_flag_manage.get_flag(obj.status_id); //当前需要判断的游戏状态的内容
        if (status != obj.value) {
            flag = false;
            break;
        }
    }
    return flag;
}

export { Control };
