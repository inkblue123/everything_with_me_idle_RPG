import { texts } from '../Text/Text.js';
import { isEmptyObject } from '../../Function/Function.js';

export class Game_Event {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //地点名称
        this.type; //地点类型
        this.init_event_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    init_event_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名事件';
            this.desc = '未设定事件描述';
        } else {
            if (texts[id].event_name) {
                this.name = texts[id].event_name;
            } else {
                this.name = '未命名事件';
            }
            if (texts[id].event_desc) {
                this.desc = texts[id].event_desc;
            } else {
                this.desc = '未设定事件描述';
            }
        }
    }
}
export class Page extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'page';
    }
}
export class Achievement extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'achievement';
    }
}
export class Challenge extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'challenge';
    }
}
export class Mini_event extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'mini_event';
        this.conditions_appear = new Array();
        this.process = new Object();
    }
    set_conditions_appear(...args) {
        if (args.length % 2 != 0) {
            console.log('输入的条件个数不是偶数，需要确认输入的条件是否正确');
            return;
        }
        let j = this.conditions_appear.length;
        for (let i = 0; i < args.length; i += 2) {
            this.conditions_appear[j] = new Object();
            this.conditions_appear[j].status_id = args[i];
            this.conditions_appear[j].value = args[i + 1];
            j++;
        }
    }
    //向迷你事件中新增一个流程
    set_new_process(process_id, control_dest_text) {
        if (isEmptyObject(this.process[process_id])) {
            this.process[process_id] = new Object();
        }
        this.process[process_id].control_dest_text = control_dest_text;
        this.process[process_id].button = new Object();
    }
    //向迷你事件的一个流程里添加一个按钮
    add_process_button(process_id, button_id, button_text, next_process) {
        let button_obj = new Object();
        button_obj.id = button_id; //按钮的id
        button_obj.text = button_text; //按钮上的文本
        this.process[process_id].button[button_id] = button_obj;
    }
    //设置一个按钮的点击效果
    add_process_button_click(process_id, button_id, click_type, ...click_value) {
        let button_obj = this.process[process_id].button[button_id];
        button_obj.click_type = click_type;
        if (click_type == 'next_process') {
            //按钮是进入下一个流程的，需要记录下一流程的id
            button_obj.next = click_value[0];
        } else if (click_type == 'chat') {
            //按钮是对话，按下之后会展示屏幕上的对话内容，并且标记这个按钮已经按过
            button_obj.click_text = click_value[0];
        }
    }
    //设置一个按钮的出现条件
    add_process_button_condition(process_id, button_id, ...condition_value) {
        let button_obj = this.process[process_id].button[button_id];
        if (button_obj.condition == undefined) {
            button_obj.condition = new Object();
        }
        for (let i = 0; i < condition_value.length; i += 2) {
            let condition_name = condition_value[i];
            let condition_status = condition_value[i + 1];
            button_obj.condition[condition_name] = condition_status;
        }
    }
    //设置一个按钮按下之后要做的事
    add_process_button_thing(process_id, button_id, thing_type, ...thing_value) {
        let button_obj = this.process[process_id].button[button_id];
        if (button_obj.thing == undefined) {
            button_obj.thing = new Object();
        }
        let thing_obj = button_obj.thing;
        if (thing_obj[thing_type] == undefined) {
            thing_obj[thing_type] = new Array();
        }
        if (thing_type == 'get_item') {
            if (thing_value.length % 3 != 0) {
                console.log('给予物品时没有给3的倍数的参数，需要确认输入是否正确');
                return;
            }
            for (let i = 0; i < thing_value.length; i += 3) {
                let aitem = new Object();
                aitem.id = thing_value[i];
                aitem.num = thing_value[i + 1];
                aitem.equip_rarity = thing_value[i + 2];
                thing_obj[thing_type].push(aitem);
            }
        } else if (thing_type == 'get_skill') {
            for (let skill_id of thing_value) {
                thing_obj[thing_type].push(skill_id);
            }
        } else if (thing_type == 'show_div') {
            for (let dom_id of thing_value) {
                thing_obj[thing_type].push(dom_id);
            }
        } else if (thing_type == 'move_place') {
            for (let place_id of thing_value) {
                thing_obj[thing_type].push(place_id);
            }
        } else if (thing_type == 'reset_time') {
            thing_obj[thing_type] = true;
        }
    }
}

function add_Game_Event_object(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Game_Event(newid);
    } else {
        console.log(`创建game_events[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Page_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Page(newid);
    } else {
        console.log(`创建game_events[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Achievement_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Achievement(newid);
    } else {
        console.log(`创建game_events[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Challenge_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Challenge(newid);
    } else {
        console.log(`创建game_events[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Mini_event_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Mini_event(newid);
    } else {
        console.log(`创建game_events[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Game_Event_object, add_Page_obj, add_Achievement_obj, add_Challenge_obj, add_Mini_event_obj };
