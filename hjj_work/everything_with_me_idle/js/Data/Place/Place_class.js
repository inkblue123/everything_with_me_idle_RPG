import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';
import { is_Empty_Object } from '../../Function/Function.js';

export class Place {
    constructor(place_id, area_id) {
        this.id = place_id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.area_id; //地点所在的区域
        this.area_name; //区域名称
        this.connect_normal_place = new Array(); //可以联通的普通地点
        this.connect_combat_place = new Array(); //可以联通的战斗地点
        this.connect_store_place = new Array(); //可以联通的商店
        this.connect_other_place = new Array(); //可以联通的其他地点
        this.place_NPC = new Array(); //位于此处的NPC
        this.condition_event = new Array();
        this.live_plan_flag = new Array(); //这个地点可以执行的生活技能标记
        this.init_Place_name_desc(place_id);
        this.set_area(area_id); //设置这个地点的所属区域
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
    add_connect_normal_place(...args) {
        for (let id of args) {
            this.connect_normal_place.push(id);
        }
    }
    //添加这个地点可以联通的其他战斗地点
    add_connect_combat_place(...args) {
        for (let id of args) {
            this.connect_combat_place.push(id);
        }
    }
    //添加这个地点存在的NPC
    add_place_NPC(...args) {
        for (let id of args) {
            this.place_NPC.push(id);
        }
    }
    //添加这个地点可以联通的商店
    add_connect_store_place(...args) {
        for (let id of args) {
            this.connect_store_place.push(id);
        }
    }
    //添加这个地点可以联通的其他地点
    add_connect_other_place(...args) {
        for (let id of args) {
            this.connect_other_place.push(id);
        }
    }
    //设置这个地点的所属区域
    set_area(area_id) {
        if (area_id === undefined) {
            console.log('Place[%s]定义时没有设定所属区域', this.id);
            return;
        }
        this.area_id = area_id; //地点所在的区域
        //区域名称
        if (texts[area_id] === undefined) {
            //尚未定义
            this.area_name = '未命名区域';
        } else {
            if (texts[area_id].area_name == undefined) {
                this.area_name = '未命名区域';
            } else {
                this.area_name = texts[area_id].area_name;
            }
        }
    }
    //添加在这个地点有条件触发的事件
    add_condition_event(...value) {
        if (value.length < 3 || value.length % 2 != 1) {
            console.log('参数数量错误，至少输入3个参数，且应该是奇数个参数');
            return;
        }
        let condition_event_obj = new Object();
        condition_event_obj.status = new Array();
        condition_event_obj.event_id = value[0]; //输入参数中第一个参数是事件id
        for (let i = 1; i < value.length; i += 2) {
            //输入参数后面每两个参数，一个是条件id，另一个是条件的值
            let status_obj = new Object();
            status_obj.status_id = value[i];
            status_obj.value = value[i + 1];
            condition_event_obj.status.push(status_obj);
        }
        this.condition_event.push(condition_event_obj);
    }
}
//普通地点
export class P_normal extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'normal';
    }
    //设置这个地点可以执行的生活技能
    set_live_plan_flag(flag) {
        //伐木、钓鱼、挖矿、采集、潜水、考古、探索
        //这些是探索采集类的生活技能，通过这个函数设置
        for (let i = 0; i < 7; i++) {
            this.live_plan_flag[i] = flag % 2;
            flag = parseInt(flag / 2);
        }
    }
    //设置这个地点的伐木相关参数
    set_logging_data(reborn_time) {
        this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点伐木时可能出现的树
    set_logging_tree(id, chance, infinite_flag, max_cumulative_num, cumulative_time) {
        if (is_Empty_Object(this.LGI_trees)) {
            this.LGI_trees = new Object();
        }
        let obj = new Object();
        obj.id = id; //树的id
        obj.chance = chance; //树的刷新权重
        obj.infinite_flag = infinite_flag; //树是否可以无限刷新
        obj.max_cumulative_num = max_cumulative_num; //囤积最大数量
        obj.cumulative_time = cumulative_time; //多长时间囤积一个，单位是游戏内的分钟
        this.LGI_trees[id] = obj;
    }
}
//战斗地点
export class P_combat extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'combat';
        this.combat_type;
        this.enemy = new Object();
        this.max_live_enemy_num = 0; //同场最多敌人数量
        this.add_enemy_time = 0; //定时刷怪时间间隔
    }
    //设置战斗地点类型
    set_combat_type(combat_type, ...value) {
        this.combat_type = combat_type;
        if (combat_type == 'infinite_enemy') {
            //无限刷怪区域
            return;
        } else {
            this.max_enemy_cumulative = value[0];
            if (combat_type == 'limited_enemy_normal') {
                //有限刷怪区域-普通
                return;
            } else if (combat_type == 'limited_enemy_road') {
                //有限刷怪区域-通道
                this.cumulative_time = value[1]; //积累一个怪所需的时间，单位为现实时间的秒，游戏内的分钟
                this.next_accessible_area = value[2]; //通道对面的地点id，清理完所有怪之后移动到这里
                return;
            } else if (combat_type == 'limited_enemy_trap') {
                //有限刷怪区域-埋伏/陷阱
                this.thing_cumulative = value[1]; //做什么事会积累怪
                this.thing_cumulative_num = value[2]; //做某事之后积累多少个怪
                return;
            }
        }
    }
    //设置刷怪的相关参数
    set_add_enemy_data(
        max_live_enemy_num,
        add_enemy_time,
        little_enemy_num,
        little_enemy_time,
        add_enemy_distance,
        add_enemy_skill_point
    ) {
        this.max_live_enemy_num = max_live_enemy_num; //同场最多敌人数量
        //刷怪规则1，定时刷怪
        this.add_enemy_time = add_enemy_time; //定时刷怪时间间隔
        //刷怪规则2，同场少怪时刷怪
        this.little_enemy_num = little_enemy_num; //少怪时刷怪的敌人数量限制
        this.little_enemy_time = little_enemy_time; //少怪时刷怪的时间间隔
        //刷怪规则3，玩家移动距离刷怪
        this.add_enemy_distance = add_enemy_distance; //玩家前进多少距离刷新一个怪
        //刷怪规则4，玩家技能影响刷怪
        this.add_enemy_skill_point = add_enemy_skill_point; //影响刷怪力
    }
    //设置当前地点的敌人情况
    set_enemy_data(id, chance, now_place_max_num) {
        if (is_Empty_Object(this.enemy[id])) {
            let obj = new Object();
            //刷怪概率权重
            if (chance) obj.chance = chance;
            //同场最大数量
            if (now_place_max_num) obj.now_place_max_num = now_place_max_num;
            this.enemy[id] = obj;
        } else {
            console.log('已设定了同id敌人，不能重复设置');
        }
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
    //添加在这个npc面前可以做的行动，在玩家控制界面添加一个按钮
    add_behavior(...args) {
        for (let id of args) {
            this.behaviors.push(id);
        }
    }
    //添加在这个npc面前满足条件才可以做的行动，满足条件时才在控制界面添加按钮
    add_condition_behavior(...value) {
        for (let event_id of value) {
            this.condition_behaviors.push(event_id);
        }
    }
    //初始化见面时满足条件才说的话
    add_condition_meet_chat(...value) {
        if (value.length < 3 || value.length % 2 != 1) {
            console.log('参数数量错误，至少输入3个参数，且应该是奇数个参数');
            return;
        }
        let meet_chat_obj = new Object();
        meet_chat_obj.status = new Array();
        let text_id = value[0]; //输入参数中第一个参数是对话文本
        meet_chat_obj.text = texts[this.id][text_id];
        for (let i = 1; i < value.length; i += 2) {
            //输入参数后面每两个参数，一个是条件id，另一个是条件的值
            let status_obj = new Object();
            status_obj.status_id = value[i];
            status_obj.value = value[i + 1];
            meet_chat_obj.status.push(status_obj);
        }
        this.condition_meet_chat.push(meet_chat_obj);
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
