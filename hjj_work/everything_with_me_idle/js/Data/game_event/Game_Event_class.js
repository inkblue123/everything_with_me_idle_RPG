import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';
import { is_Empty_Object } from '../../Function/Function.js';

export class Game_Event {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //事件名称
        this.type; //事件类型
        this.button_name; //事件在控制界面的按钮上的名称

        this.conditions_appear = new Array(); //事件出现条件
        this.finish_condition = new Object(); //事件完成条件
        this.finish_reward = new Object(); //事件完成奖励
        this.init_event_name_desc(id);
    }
    //设置该事件的出现条件
    set_conditions_appear(...args) {
        if (args.length % 2 != 0) {
            console.log('输入的条件个数不是偶数，需要确认输入的条件是否正确');
            return;
        }
        for (let i = 0; i < args.length; i += 2) {
            let appear_obj = new Object();
            appear_obj.status_id = args[i];
            appear_obj.value = args[i + 1];
            this.conditions_appear.push(appear_obj);
        }
    }
    //设置事件完成条件
    set_finish_condition(...args) {
        if (args.length % 2 != 0) {
            console.log('输入的条件个数不是偶数，需要确认输入的条件是否正确');
            return;
        }
        for (let i = 0; i < args.length; i += 2) {
            let finish_key = args[i];
            let finish_value = args[i + 1];
            this.finish_condition[finish_key] = finish_value;
        }
    }
    //设置事件完成奖励
    set_finish_reward(type, ...args) {
        //奖励是给予游戏状态，标记完成了相关内容
        if (type == 'game_flag') {
            if (args.length % 2 != 0) {
                console.log('输入的条件个数不是偶数，需要确认输入的条件是否正确');
                return;
            }
            if (is_Empty_Object(this.finish_reward['game_flag'])) {
                this.finish_reward['game_flag'] = new Object();
            }
            for (let i = 0; i < args.length; i += 2) {
                let finish_key = args[i];
                let finish_value = args[i + 1];
                this.finish_reward['game_flag'][finish_key] = finish_value;
            }
        }
        //奖励是开启新事件
        if (type == 'start_event') {
            if (is_Empty_Object(this.finish_reward['start_event'])) {
                this.finish_reward['start_event'] = new Array();
            }
            for (let i = 0; i < args.length; i++) {
                this.finish_reward['start_event'].push(args[i]);
            }
        }
    }
    //调用文本数据库中的地点名称和描述
    init_event_name_desc(id) {
        if (is_Empty_Object(texts[id])) {
            //尚未定义
            this.name = '未命名事件';
            this.desc = '未设定事件描述';
        } else {
            //事件名
            if (is_Empty_Object(texts[id].event_name)) {
                this.name = '未命名事件';
            } else {
                this.name = texts[id].event_name;
            }
            //事件描述
            if (is_Empty_Object(texts[id].event_desc)) {
                this.desc = '未设定事件描述';
            } else {
                this.desc = texts[id].event_desc;
            }
            //事件在控制界面的按钮上的名称
            if (is_Empty_Object(texts[id].button_name)) {
                this.button_name = this.name;
            } else {
                this.button_name = texts[id].button_name;
            }
        }
    }
}
export class Main_quest extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'main_quest';
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
        this.process = new Object(); //迷你事件的流程
    }

    //向迷你事件中新增一个流程
    set_new_process(process_id, control_dest_text) {
        if (is_Empty_Object(this.process[process_id])) {
            this.process[process_id] = new Object();
        }
        this.process[process_id].control_dest_text = control_dest_text;
        this.process[process_id].button = new Object();
    }
    //向迷你事件的一个流程里添加一个按钮
    add_process_button(process_id, button_id, button_text) {
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
            let condition_id = condition_value[i];
            let condition_status = condition_value[i + 1];
            button_obj.condition[condition_id] = condition_status;
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
            //给予玩家物品，虽然逻辑理论上是可以一个函数赋值几个物品的，但是感觉容易错漏，外面定义的时候还是尽量一次只传一个物品吧
            for (let i = 0; i < thing_value.length; ) {
                let id = thing_value[i];
                let num = thing_value[i + 1];
                let aitem = new Object();
                aitem.id = id;
                aitem.num = num;

                if (items[id].main_type.includes('equipment')) {
                    aitem.equip_rarity = thing_value[i + 2];
                    i += 3;
                } else {
                    i += 2;
                }

                thing_obj[thing_type].push(aitem);
            }
        } else if (thing_type == 'get_skill') {
            //给予玩家技能
            for (let skill_id of thing_value) {
                thing_obj[thing_type].push(skill_id);
            }
        } else if (thing_type == 'show_div') {
            //渐变显示指定界面
            for (let dom_id of thing_value) {
                thing_obj[thing_type].push(dom_id);
            }
        } else if (thing_type == 'move_place') {
            //移动到指定地点
            thing_obj[thing_type] = thing_value[0];
        } else if (thing_type == 'reset_time') {
            //重置游戏日期
            thing_obj[thing_type] = true;
        } else if (thing_type == 'set_player_attr') {
            //设置玩家属性
            if (thing_value.length % 2 != 0) {
                console.log('设置玩家属性时需要给予2倍数的参数，需要确认输入是否正确');
                return;
            }
            for (let i = 0; i < thing_value.length; i += 2) {
                let attr_obj = new Object();
                attr_obj.id = thing_value[i];
                attr_obj.value = thing_value[i + 1];
                thing_obj[thing_type].push(attr_obj);
            }
        } else if (thing_type == 'set_global_flag') {
            //设置全局游戏状态
            if (thing_value.length % 2 != 0) {
                console.log('设置玩家属性时需要给予2倍数的参数，需要确认输入是否正确');
                return;
            }
            for (let i = 0; i < thing_value.length; i += 2) {
                let attr_obj = new Object();
                attr_obj.id = thing_value[i];
                attr_obj.value = thing_value[i + 1];
                thing_obj[thing_type].push(attr_obj);
            }
        } else if (thing_type == 'get_side_quest') {
            //获得支线任务
            for (let i = 0; i < thing_value.length; i++) {
                let event_id = thing_value[i];
                thing_obj[thing_type].push(event_id);
            }
        } else if (thing_type == 'delete_buff') {
            //清除指定buff
            for (let i = 0; i < thing_value.length; i++) {
                let buff_id = thing_value[i];
                thing_obj[thing_type].push(buff_id);
            }
        } else if (thing_type == 'save_game') {
            //保存游戏
            thing_obj[thing_type] = true;
        } else {
            console.log('未知的迷你事件中要做的事：%s，没有开发对应的处理逻辑', thing_type);
        }
    }
    //向迷你事件的一个流程里添加一个buff,进入这个流程时获得
    add_process_buff(process_id, ...buff_value) {
        if (is_Empty_Object(this.process[process_id])) {
            this.process[process_id] = new Object();
        }
        this.process[process_id].buff = new Array();
        for (let buff_id of buff_value) {
            this.process[process_id].buff.push(buff_id);
        }
    }
}
export class Side_quest extends Game_Event {
    constructor(id) {
        super(id);
        this.type = 'side_quest';
    }
}

function add_Game_Event_object(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Game_Event(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Main_quest_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Main_quest(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Achievement_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Achievement(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Challenge_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Challenge(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Mini_event_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Mini_event(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Side_event_obj(game_events, newid) {
    if (game_events[newid] === undefined) {
        game_events[newid] = new Side_quest(newid);
    } else {
        console.log('创建game_events[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export {
    add_Game_Event_object,
    add_Main_quest_obj, //
    add_Achievement_obj,
    add_Challenge_obj,
    add_Mini_event_obj,
    add_Side_event_obj,
};
