import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';

export class Place {
    constructor(place_id, area_id) {
        this.id = place_id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.area_id; //地点所在的区域
        this.area_name; //区域名称
        this.other_normal_place = new Array(); //可以联通的其他普通地点
        this.other_combat_place = new Array(); //可以联通的其他战斗地点
        this.other_NPC = new Array(); //位于此处的NPC
        this.init_Place_name_desc(place_id);
        if (area_id === undefined) {
            console.log('Place[%s]定义时没有设定所属区域', place_id);
        } else {
            this.set_area(area_id);
        }
    }

    //调用文本数据库中的地点名称和描述
    init_Place_name_desc(place_id) {
        //地点名称
        if (texts[place_id] === undefined) {
            //尚未定义
            this.name = '未命名地点';
            this.desc = '未设定地点描述';
        } else {
            if (texts[place_id].place_name) {
                this.name = texts[place_id].place_name;
            } else {
                this.name = '未命名地点';
            }
            if (texts[place_id].place_desc) {
                this.desc = texts[place_id].place_desc;
            } else {
                this.desc = '未设定地点描述';
            }
        }
    }
    //添加这个地点可以联通的其他普通地点
    add_other_normal_place(...args) {
        for (let id of args) {
            this.other_normal_place.push(id);
        }
    }
    //添加这个地点可以联通的其他战斗地点
    add_other_combat_place(...args) {
        for (let id of args) {
            this.other_combat_place.push(id);
        }
    }
    //添加这个地点存在的NPC
    add_other_NPC(...args) {
        for (let id of args) {
            this.other_NPC.push(id);
        }
    }
    //设置这个地点的所属区域
    set_area(area_id) {
        this.area_id = area_id; //地点所在的区域
        //区域名称
        if (texts[area_id] === undefined) {
            //尚未定义
            this.area_name = '未命名区域';
        } else {
            if (texts[area_id].area_name) {
                this.area_name = texts[area_id].area_name;
            } else {
                this.area_name = '未命名区域';
            }
        }
    }
}
//普通地点
export class P_normal extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'normal';
    }
}
//战斗地点
export class P_combat extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'combat';
        this.enemy = new Array();
        this.max_enemy_num = 0;
    }
}
//npc地点
export class P_NPC extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'NPC';
        this.behaviors = new Array(); //常态可执行行动
        this.condition_behaviors = new Array(); //条件可执行行动
        this.condition_meet_chat = new Array(); //条件见面对话
        this.default_meet_chat = texts[place_id].default_meet_chat; //默认见面对话
    }
    //添加在这个npc面前可以做的行动
    add_behavior(...args) {
        for (let id of args) {
            this.behaviors.push(id);
        }
    }
    //添加在这个npc面前满足条件才可以做的行动
    add_condition_behavior(status_type, status_id, value, event_id) {
        let i = this.condition_behaviors.length;
        this.condition_behaviors[i] = new Object();
        this.condition_behaviors[i].status_type = status_type;
        this.condition_behaviors[i].status_id = status_id;
        this.condition_behaviors[i].value = value;
        this.condition_behaviors[i].event_id = event_id;
    }
    //初始化见面时满足条件才说的话
    add_condition_meet_chat(status_type, status_id, value) {
        let i = this.condition_meet_chat.length;
        this.condition_meet_chat[i] = new Object();
        this.condition_meet_chat[i].status_type = status_type;
        this.condition_meet_chat[i].status_id = status_id;
        this.condition_meet_chat[i].value = value;
        let text_id = status_id + '_' + value;
        if (texts[this.id][text_id] === undefined) {
            console.log('texts[%s][%s]未定义', this.id, text_id);
            this.condition_meet_chat[i].text = 'texts[%s][%s]未定义';
        } else {
            this.condition_meet_chat[i].text = texts[this.id][text_id];
        }
    }
}
//商店地点
export class P_store extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'store';
        this.goods = new Array();
    }
    add_goods(id, type, rise_num, rise_data, unrise_time, inventory, replenish_time, replenish_event) {
        let good_obj = new Object();
        good_obj.id = id;
        good_obj.base_price = items[id].price;
        good_obj.type = type;
        // 根据商品类型，填充其他信息
        switch (type) {
            case 1: //1：无限商品，没有什么特别的
                //没有其他信息
                break;
            case 2: //2：无限商品，买到一定程度之后涨价，定时恢复
                good_obj.rise_num = rise_num; //购买几个物品涨价一次
                good_obj.rise_data = rise_data; //涨价一次的幅度
                good_obj.unrise_time = unrise_time; //每隔多久时间恢复价格
                break;
            case 3: //3：有限商品，没有什么特别的，不补货
                good_obj.inventory = inventory; //这个商品有多少存货
                break;
            case 4: //4：有限商品，买到一定程度之后涨价，定时恢复价格，定时补货
                good_obj.inventory = inventory; //这个商品有多少存货
                good_obj.rise_num = rise_num; //购买几个物品涨价一次
                good_obj.rise_data = rise_data; //涨价一次的幅度
                good_obj.unrise_time = unrise_time; //每隔多久时间恢复价格
                good_obj.replenish_time = replenish_time; //每隔多久时间补货
                break;
            case 5: //5：有限商品，定时补货
                good_obj.inventory = inventory; //这个商品有多少存货
                good_obj.replenish_time = replenish_time; //每隔多久时间补货
                break;
            case 6: //6：有限商品，特定事件补货
                good_obj.inventory = inventory; //这个商品有多少存货
                good_obj.replenish_event = replenish_event; //遇到什么事件会补货
                break;
            default:
                break;
        }
        this.goods.push(good_obj);
    }
}

function add_Place_object(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new Place(newid, area);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_normal_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_normal(newid, area);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_combat_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_combat(newid, area);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_NPC_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_NPC(newid, area);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_store_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_store(newid, area);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Place_object, add_normal_Place, add_combat_Place, add_NPC_Place, add_store_Place };
