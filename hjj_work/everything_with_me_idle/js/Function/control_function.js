import { empty_dom, addElement, addElement_botton } from './Dom_function.js';
import { is_Empty_Object } from './Function.js';
import { places } from '../Data/Place/Place.js';
import { items } from '../Data/Item/Item.js';
import { game_events } from '../Data/Game_event/Game_Event.js';
import { texts } from '../Data/Text/Text.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//移动到指定地点，读取地点库信息，展示到控制界面中
function control_show_now_place() {
    let Place_desc_div = document.getElementById('Place_desc_div');
    let player_Control_div = document.getElementById('player_Control_div');
    empty_dom(Place_desc_div); //清空原本地点描述
    empty_dom(player_Control_div); //清空原本地点的可执行操作

    let place_manage = global.get_place_manage();
    let now_place_id = place_manage.get_now_place();

    //展示当前地点的描述
    make_place_desc(places[now_place_id]);
    // 展示当前地点的可执行操作
    add_control_move_part(now_place_id); //可移动到其他地点
    add_control_combat_part(now_place_id); //可移动到其他战斗地点
    add_control_NPC_part(now_place_id); //当前地点有npc
    add_control_store_part(now_place_id); //当前地点有商店
    add_control_event_part(now_place_id); //当前地点可以触发事件
    add_control_other_part(now_place_id); //当前地点和其他地点相连

    if (global.get_flag('GS_challenge_flag')) {
        add_control_button_end_event('退出', null);
    }
}
//展示迷你事件的其中一个流程
function control_show_mini_event_process(event_id, process_id, click_button_id) {
    let Place_desc_div = document.getElementById('Place_desc_div');
    let player_Control_div = document.getElementById('player_Control_div');
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
        let button_obj = process.button[button_id];
        //判断按钮的显示条件
        let condition_flag = game_event_manage.check_mini_event_button_condition(event_id, process_id, button_id);
        //不满足显示条件、又不要求始终显示，直接不生成按钮
        if (!condition_flag && button_obj.always_show != true) {
            continue;
        }
        let control_button;
        if (condition_flag) {
            //满足显示条件，正常生成可点击的按钮
            control_button = addElement_botton(player_Control_div, null, 'player_Control_button');
            control_button.addEventListener('click', function () {
                game_event_manage.updata_mini_event(event_id, process_id, button_id);
            });
        } else {
            //要求始终显示但显示条件不满足：半透明、不可点击
            control_button = addElement_botton(player_Control_div, null, 'player_Control_button player_Control_button_disabled');
        }
        control_button.innerHTML = texts[event_id][button_obj.text];
    }
}
//展示使用消耗品的界面
function control_show_use_consumable(id, use_ratio) {
    let Place_desc_div = document.getElementById('Place_desc_div');
    let player_Control_div = document.getElementById('player_Control_div');
    empty_dom(Place_desc_div); //清空原本描述
    empty_dom(player_Control_div); //清空原本的可执行操作按钮
    //展示文本
    let item_name = items[id].name;
    let text_ch = '正在使用消耗品 ' + item_name + '<br>';
    text_ch = text_ch + '进度 ' + use_ratio + ' %';
    Place_desc_div.innerHTML = text_ch;

    //添加按钮
    let control_button = addElement_botton(player_Control_div, null, 'player_Control_button', null, '停止使用');
    control_button.addEventListener('click', function () {
        //结算当前消耗品的使用情况
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.change_GS_game_statu('NULL');
    });
}

//根据当前地点的类型，生成并展示当前地点的描述
function make_place_desc(place) {
    let Place_desc_div = document.getElementById('Place_desc_div');
    if (place.type == 'NPC') {
        //NPC地点，展示NPC说的话
        Place_desc_div.innerHTML = make_NPC_condition_meet_chat(place);
    } else if (place.type == 'combat') {
        //战斗地点，有限刷怪区域需要展示剩余敌人数量
        if (place.combat_type != 'infinite_enemy') {
            let desc_div = addElement(Place_desc_div, 'div', null, null);
            desc_div.innerHTML = place.desc;
            let remain_enemy_div = addElement(Place_desc_div, 'div', 'remain_enemy_div', null);
            let enemy_manage = global.get_enemy_manage();
            let now_place_enemy_cumulative = enemy_manage.get_place_enemy_cumulative_num(place.id);
            let ch = '敌人数量剩余' + now_place_enemy_cumulative + '个';
            remain_enemy_div.innerHTML = ch;
        } else {
            //无限刷怪区域直接展示描述
            Place_desc_div.innerHTML = place.desc;
        }
    } else {
        //普通、商店等地点直接展示描述
        Place_desc_div.innerHTML = place.desc;
    }
}

//向玩家控制界面添加移动相关的提示和按钮
function add_control_move_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"地点移动"提示
    let player_Control_move_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_move_tip.innerHTML = '地点移动';
    let move_tip_flag = false;

    //回到上一个普通区域，NPC地点和商店地点可以回到上一个普通区域
    if (place.type == 'NPC' || place.type == 'store') {
        let place_manage = global.get_place_manage();
        let last_normal_place_id = place_manage.get_last_normal_place();
        add_control_button_move(last_normal_place_id, '回到', null);
        move_tip_flag = true;
    }

    //无条件可以前往的普通区域
    if (!is_Empty_Object(place.connect_normal_place)) {
        for (let next_place_id of place.connect_normal_place) {
            add_control_button_move(next_place_id, '前往', null);
            move_tip_flag = true;
        }
    }
    //有条件出现的普通区域
    if (!is_Empty_Object(place.condition_connect_normal_place)) {
        let global_flag_manage = global.get_global_flag_manage();
        for (let next_place_id in place.condition_connect_normal_place) {
            let condition = place.condition_connect_normal_place[next_place_id];
            let flag = global_flag_manage.use_obj_get_flag(condition);
            if (flag) {
                add_control_button_move(next_place_id, '前往', null);
                move_tip_flag = true;
            }
        }
    }
    //有可以移动的地点，显示"地点移动"提示
    if (move_tip_flag) {
        player_Control_move_tip.style.display = '';
    }
}
//向玩家控制界面添加战斗相关的提示和按钮
function add_control_combat_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"战斗"提示
    let player_Control_combat_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_combat_tip.innerHTML = '战斗';
    let combat_tip_flag = false;
    //可以前往战斗区域
    if (!is_Empty_Object(place.connect_combat_place)) {
        for (let next_place_id of place.connect_combat_place) {
            add_control_button_move(next_place_id, '前往', null);
            combat_tip_flag = true;
        }
    }
    //有可以战斗的地点，显示"战斗"提示
    if (combat_tip_flag) {
        player_Control_combat_tip.style.display = '';
    }
}
//向玩家控制界面添加NPC相关的提示和按钮
function add_control_NPC_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"NPC"提示
    let player_Control_NPC_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_NPC_tip.innerHTML = 'NPC';
    let NPC_tip_flag = false;
    //此处有NPC
    if (!is_Empty_Object(place.place_NPC)) {
        for (let next_place_id of place.place_NPC) {
            add_control_button_move(next_place_id, '拜访', null);
            NPC_tip_flag = true;
        }
    }
    //有NPC的地点，显示"NPC"提示
    if (NPC_tip_flag) {
        player_Control_NPC_tip.style.display = '';
    }
}
//向玩家控制界面添加商店相关的提示和按钮
function add_control_store_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"商店"提示
    let player_Control_store_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_store_tip.innerHTML = '商店';
    let store_tip_flag = false;
    //可以前往商店
    if (!is_Empty_Object(place.connect_store_place)) {
        for (let next_place_id of place.connect_store_place) {
            add_control_button_move(next_place_id, '前往', null);
            store_tip_flag = true;
        }
    }
    //有商店的地点，显示"商店"提示
    if (store_tip_flag) {
        player_Control_store_tip.style.display = '';
    }
}
//向玩家控制界面添加事件相关的提示和按钮
function add_control_event_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"事件"提示
    let player_Control_event_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_event_tip.innerHTML = '事件';
    let event_tip_flag = false;
    //可以进行的常态事件
    if (!is_Empty_Object(place.behaviors)) {
        for (let event_id of place.behaviors) {
            add_control_button_start_event(event_id);
            event_tip_flag = true;
        }
    }
    //有条件出现的事件
    if (!is_Empty_Object(place.condition_behaviors)) {
        for (let event_id of place.condition_behaviors) {
            //对每个事件的出现条件进行判断，满足条件才在界面中添加按钮
            if (check_condition_appear_behaviors(event_id)) {
                add_control_button_start_event(event_id);
                event_tip_flag = true;
            }
        }
    }
    //有可执行的事件，显示"事件"提示
    if (event_tip_flag) {
        player_Control_event_tip.style.display = '';
    }
}
//向玩家控制界面添加其他区域相关的提示和按钮
function add_control_other_part(place_id) {
    let place = places[place_id];
    let player_Control_div = document.getElementById('player_Control_div');

    //生成"其他"提示
    let player_Control_other_tip = addElement(player_Control_div, 'div', null, 'player_Control_tip', 'none');
    player_Control_other_tip.innerHTML = '其他';
    let other_tip_flag = false;
    //可以前往其他区域
    if (!is_Empty_Object(place.connect_other_place)) {
        for (let next_place_id of place.connect_other_place) {
            add_control_button_move(next_place_id, '前往', null);
            other_tip_flag = true;
        }
    }
    //有其他可前往的区域，显示"其他"提示
    if (other_tip_flag) {
        player_Control_other_tip.style.display = '';
    }
}

//向玩家控制界面添加一个按钮，按钮的效果是移动到其他区域
function add_control_button_move(new_place_id, front_text, after_text) {
    if (places[new_place_id].name == '未命名地点') {
        console.log('%s地点没有定义地点名称', new_place_id);
    }
    //组成按钮上的文本
    let button_text = make_button_text(front_text, places[new_place_id].name, after_text);
    //生成按钮
    let player_Control_div = document.getElementById('player_Control_div');
    let move_place_button = addElement_botton(player_Control_div, null, 'player_Control_button');
    move_place_button.innerHTML = button_text;
    move_place_button.addEventListener('click', function () {
        let place_manage = global.get_place_manage();
        place_manage.set_now_place(new_place_id);
    });
}
//向玩家控制界面添加一个按钮，按钮的效果是开启事件
function add_control_button_start_event(event_id) {
    //获取按钮上的文本
    let button_text = game_events[event_id].button_name;
    //生成按钮
    let player_Control_div = document.getElementById('player_Control_div');
    let move_place_button = addElement_botton(player_Control_div, null, 'player_Control_button');
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
    let player_Control_div = document.getElementById('player_Control_div');
    let move_place_button = addElement_botton(player_Control_div, null, 'player_Control_button');
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
        console.log('事件%s设定为有条件出现的事件，但没有定义条件', event_id);
        return false;
    }
    //只有全部出现条件都满足，事件才出现
    for (let cond of game_events[event_id].conditions_appear) {
        if (!check_one_appear_condition(event_id, cond)) {
            return false;
        }
    }
    return true;
}
//判断一条出现条件是否满足，任何异常情况都按不满足处理
function check_one_appear_condition(event_id, cond) {
    //验空验错
    if (cond.type == undefined || cond.type == '') {
        console.log('事件%s存在一条没有type的出现条件，该条件按不满足处理', event_id);
        return false;
    }
    if (cond.key == undefined || cond.key == '') {
        console.log('事件%s的%s类型出现条件缺少key，该条件按不满足处理', event_id, cond.type);
        return false;
    }
    if (cond.value === undefined) {
        console.log('事件%s的%s类型出现条件缺少value，该条件按不满足处理', event_id, cond.type);
        return false;
    }
    //按条件类型获取当前的实际值
    let current;
    if (cond.type == 'event_flag') {
        //读取游戏状态
        current = global.get_global_flag_manage().get_flag(cond.key);
    } else if (cond.type == 'skill_level') {
        //读取技能等级
        let skill_obj;
        try {
            skill_obj = player.get_player_All_Skills().get_skill_obj(cond.key);
        } catch (e) {
            console.log('事件%s的skill_level出现条件%s技能不存在，该条件按不满足处理', event_id, cond.key);
            return false;
        }
        if (is_Empty_Object(skill_obj)) {
            console.log('事件%s的skill_level出现条件%s玩家没有该技能，该条件按不满足处理', event_id, cond.key);
            return false;
        }
        current = skill_obj.level;
    } else if (cond.type == 'function_value') {
        //查询某个函数，得到返回值
        current = get_condition_function_value(cond.key);
    } else {
        console.log('事件%s存在未知的出现条件类型%s，该条件按不满足处理', event_id, cond.type);
        return false;
    }
    if (current === undefined) {
        console.log('事件%s的%s类型出现条件%s读取不到实际值，该条件按不满足处理', event_id, cond.type, cond.key);
        return false;
    }
    //按比较方向判断当前值是否满足要求，缺省为等值比较
    let direction = cond.direction == undefined ? '=' : cond.direction;
    if (direction == '=') {
        return current == cond.value;
    } else if (direction == '!=') {
        return current != cond.value;
    } else if (direction == '>') {
        return current > cond.value;
    } else if (direction == '>=') {
        return current >= cond.value;
    } else if (direction == '<') {
        return current < cond.value;
    } else if (direction == '<=') {
        return current <= cond.value;
    }
    console.log('事件%s的%s类型出现条件%s使用了未知的比较方向%s，该条件按不满足处理', event_id, cond.type, cond.key, direction);
    return false;
}
//查询type为function_value的出现条件的当前值，这里集中注册各种查询函数
function get_condition_function_value(key) {
    //以UGS_开头的查询，走统一的临用游戏状态接口
    if (key.startsWith('UGS_')) {
        return global.get_global_flag_manage().get_flag(key);
    }
    console.log('尚未注册%s的function_value查询函数', key);
    return undefined;
}
export { control_show_now_place, control_show_mini_event_process, control_show_use_consumable, check_condition_appear_behaviors, check_one_appear_condition, get_condition_function_value };
