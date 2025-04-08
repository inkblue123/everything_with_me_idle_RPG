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
    set_process(process_id, type, control_dest_text) {
        if (isEmptyObject(this.process[process_id])) {
            this.process[process_id] = new Object();
        }
        this.process[process_id].type = type;
        this.process[process_id].control_dest_text = control_dest_text;
        this.process[process_id].button = new Array();
    }
    // add_process_button(process_id, text, next) {
    //     let i = this.process[process_id].button.length;
    //     this.process[process_id].button[i] = new Object();
    //     this.process[process_id].button[i].text = text;
    //     this.process[process_id].button[i].next = next;
    // }
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
