import { texts } from '../Text/Text.js';

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
