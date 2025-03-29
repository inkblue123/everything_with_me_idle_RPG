import { crtElement, empty_dom, addElement } from '../Function/Dom_function.js';
import { isEmptyObject } from '../Function/Function.js';
// import { updata_place } from '../Function/Updata_func.js';
import { places } from '../Data/Place/Place.js';
import { game_events } from '../Data/game_event/Game_Event.js';
import { texts } from '../Data/Text/Text.js';
import { global } from '../GameRun/global_class.js';

var Control = crtElement('div', 'control', null, '');

//创建中下，玩家控制界面内的详细组件
{
    //角色所处位置描述
    var Place_desc_div = crtElement('div', 'Place_desc_div', null, '');
    //容纳角色在这里能做的事情的div
    var player_Control_div = crtElement('div', 'player_Control_div', null, '');

    //组件放入角色属性装备界面中
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

    if (places[now_place_id].type == 'normal' || places[now_place_id].type == 'combat') {
        show_new_place(places[now_place_id]);
    } else if (places[now_place_id].type == 'NPC') {
        show_new_NPC(places[now_place_id]);
    }
    let global_flag_manage = global.get_global_flag_manage();
    if (global_flag_manage.get_game_status('game_event')) {
        add_control_button_end_event('退出', null);
    }
};

//展示新地点的内容
function show_new_place(new_place) {
    //展示新地点的描述
    Place_desc_div.innerHTML = new_place.desc;

    //可以前往其他普通区域
    if (!isEmptyObject(new_place.other_normal_place)) {
        for (let next_place_id of new_place.other_normal_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //可以前往其他战斗区域
    if (!isEmptyObject(new_place.other_combat_place)) {
        for (let next_place_id of new_place.other_combat_place) {
            add_control_button_move(next_place_id, '前往', null);
        }
    }
    //此处有其他NPC
    if (!isEmptyObject(new_place.other_NPC)) {
        for (let next_place_id of new_place.other_NPC) {
            add_control_button_move(next_place_id, '拜访', null);
        }
    }
}
//移动到指定NPC面前，读取地点库信息，将可以进行的行动展示到控制界面中
function show_new_NPC(new_NPC) {
    //展示新地点的描述
    Place_desc_div.innerHTML = new_NPC.desc;

    //可以回到上一个普通区域
    let place_manage = global.get_place_manage();
    let last_normal_place_id = place_manage.get_last_normal_place();
    add_control_button_move(last_normal_place_id, '回到', null);

    //可以进行的事件
    if (!isEmptyObject(new_NPC.behaviors)) {
        for (let next_place_id of new_NPC.behaviors) {
            add_control_button_start_event(next_place_id, '前往', null);
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
        place_manage.set_next_place(new_place_id);
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
//向玩家控制界面添加一个按钮，按钮的效果是关闭当前特殊事件
function add_control_button_end_event(front_text, after_text) {
    //组成按钮上的文本
    let game_event_manage = global.get_game_event_manage();
    let name = game_events[game_event_manage.get_now_event_id()].name;
    let button_text = make_button_text(front_text, name, after_text);
    //生成按钮
    let move_place_button = addElement(player_Control_div, 'div', null, 'player_Control_button');
    move_place_button.innerHTML = button_text;
    move_place_button.addEventListener('click', function () {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.end_game_event(false);
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
function make_NPC_chat(NPC) {
    let text = NPC.name + '：';
    //按照优先级，判断游戏状态是否符合说话的条件
    let global_flag_manage = global.get_global_flag_manage();
    for (let i = 0; i < NPC.chat.length; i++) {
        //
        let status_type = NPC.chat[i].status_type;
        let id = NPC.chat[i].status_id;
        let value = NPC.chat[i].value;
        if (status_type == 'short_game_status') {
            let status = global_flag_manage.get_short_game_status(id);
            if (status && status == value) {
                text += NPC.chat[i].text;
                break;
            }
        } else if (status_type == 'game_status') {
        }
    }
}

export { Control };
