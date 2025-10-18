import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';
import { is_Empty_Object, get_item_obj, get_item_id_key } from '../../Function/Function.js';

export class Place {
    constructor(place_id, area_id) {
        this.id = place_id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.area_id; //地点所在的区域
        this.area_name; //区域名称
        this.connect_normal_place = new Array(); //可以联通的普通地点
        this.condition_connect_normal_place = new Array(); //满足条件才可联通的普通地点
        this.connect_combat_place = new Array(); //可以联通的战斗地点
        this.connect_store_place = new Array(); //可以联通的商店
        this.connect_other_place = new Array(); //可以联通的其他地点
        this.place_NPC = new Array(); //位于此处的NPC
        this.condition_event = new Array(); //条件可执行事件
        this.condition_behaviors = new Array(); //条件可执行行动
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
    //添加这个地点满足条件才可联通的其他普通地点
    add_condition_connect_normal_place(place_id, ...value) {
        if (is_Empty_Object(this.condition_connect_normal_place)) {
            this.condition_connect_normal_place = new Object();
        }
        if (value.length < 2 || value.length % 2 != 0) {
            console.log('参数数量错误，至少输入一对条件和条件值');
            return;
        }
        for (let i = 0; i < value.length; i += 2) {
            //输入参数后面每两个参数，一个是条件id，另一个是条件的值
            let status_id = value[i];
            let status_value = value[i + 1];
            let status_obj = new Object();
            status_obj[status_id] = status_value;
            this.condition_connect_normal_place[place_id] = status_obj;
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
    //添加在这个地点满足条件自动触发的事件
    //这个条件保存在地点库中
    add_condition_trigger_event(...value) {
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
    //添加在这个地点满足条件时才在控制界面添加按钮才可以做的行动
    //这个条件与事件绑定，地点库中不保存条件
    add_condition_behavior(...value) {
        for (let event_id of value) {
            this.condition_behaviors.push(event_id);
        }
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
        //用二进制数字的01来表示是否可执行
        //比如输入flag=1，二进制就是0000001，从最小的位置开始排，就是只允许第一个技能，也就是伐木
        //如果希望允许钓鱼、采集、潜水，就是0011010，也就是需要输入flag=26
        // 伐木+1、钓鱼+2、挖矿+4、采集+8、潜水+16、考古+32、探索+64
        for (let i = 0; i < 7; i++) {
            this.live_plan_flag[i] = flag % 2;
            flag = parseInt(flag / 2);
        }
    }
    //设置这个地点的伐木相关参数
    set_logging_data(reborn_time) {
        if (this.live_plan_flag[0] == false) {
            console.log('%s地点不允许伐木却设定了伐木相关参数');
        }
        this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点的钓鱼相关参数
    set_fishing_data(pass_takebait, max_takebait, max_wait_time) {
        if (this.live_plan_flag[1] == false) {
            console.log('%s地点不允许钓鱼却设定了钓鱼相关参数');
        }
        //等鱼上钩阶段，地点上钩及格阈值
        this.FIS_pass_takebait = pass_takebait;
        //等鱼上钩阶段，地点上钩最大阈值
        this.FIS_max_takebait = max_takebait;
        //等鱼上钩阶段，随机上钩时间最大值
        this.FIS_max_wait_time = max_wait_time;
    }
    //设置这个地点的挖矿相关参数
    set_mining_data() {
        if (this.live_plan_flag[2] == false) {
            console.log('%s地点不允许挖矿却设定了挖矿相关参数');
        }
        // this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点的采集相关参数
    set_foraging_data(defense) {
        if (this.live_plan_flag[3] == false) {
            console.log('%s地点不允许采集却设定了采集相关参数');
        }
        this.FAG_defense = defense;
    }
    //设置这个地点的潜水相关参数
    set_diving_data() {
        if (this.live_plan_flag[4] == false) {
            console.log('%s地点不允许潜水却设定了潜水相关参数');
        }
        // this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点的考古相关参数
    set_archaeology_data() {
        if (this.live_plan_flag[5] == false) {
            console.log('%s地点不允许考古却设定了考古相关参数');
        }
        // this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点的探索相关参数
    set_exploration_data() {
        if (this.live_plan_flag[6] == false) {
            console.log('%s地点不允许探索却设定了探索相关参数');
        }
        // this.LGI_reborn_time = reborn_time;
    }
    //设置这个地点伐木时可能出现的树
    set_logging_tree(id, chance, rare_flag, max_cumulative_num, cumulative_time) {
        if (this.live_plan_flag[0] == false) {
            console.log('%s地点不允许伐木却设定了伐木相关参数');
        }
        if (is_Empty_Object(this.LGI_trees)) {
            this.LGI_trees = new Object();
        }
        let obj = new Object();
        obj.id = id; //树的id
        obj.chance = chance; //树的刷新权重
        obj.rare_flag = rare_flag; //树是否属于稀有单位
        if (rare_flag == undefined) {
            console.log('%s地点定义伐木的树%s时没有设定稀有标记', this.id, id);
        }
        if (rare_flag) {
            obj.max_cumulative_num = max_cumulative_num; //囤积最大数量
            obj.cumulative_time = cumulative_time; //多长时间囤积一个，单位是游戏内的分钟
        }
        this.LGI_trees[id] = obj;
    }
    //设置这个地点钓鱼时可能出现的鱼
    set_fishing_fish(id, chance, rare_flag, max_cumulative_num, cumulative_time) {
        if (this.live_plan_flag[1] == false) {
            console.log('%s地点不允许钓鱼却设定了钓鱼相关参数');
        }
        if (is_Empty_Object(this.FIS_fishs)) {
            this.FIS_fishs = new Object();
        }
        let obj = new Object();
        obj.id = id; //鱼的id
        obj.chance = chance; //鱼刷新权重
        obj.rare_flag = rare_flag; //鱼是否属于稀有单位
        if (rare_flag == undefined) {
            console.log('%s地点定义钓鱼的鱼%s时没有设定稀有标记', this.id, id);
        }
        if (rare_flag) {
            obj.max_cumulative_num = max_cumulative_num; //囤积最大数量
            obj.cumulative_time = cumulative_time; //多长时间囤积一个，单位是游戏内的分钟
        }

        this.FIS_fishs[id] = obj;
    }
    //设置这个地点采集时可能的产物
    set_foraging_item(id, chance, rare_flag, max_cumulative_num, cumulative_time, ...args) {
        if (this.live_plan_flag[3] == false) {
            console.log('%s地点不允许采集却设定了采集相关参数');
        }
        if (is_Empty_Object(this.FAG_item)) {
            this.FAG_item = new Object();
        }
        let item_obj = new Object();
        if (items[id].main_type.includes('equipment')) {
            //物品是装备，args内参数的含义按以下顺序排列：
            //稀有度
            let equip_rarity = args[0];
            item_obj = get_item_obj(id, 1, equip_rarity);
        } else if (items[id].main_type.includes('material')) {
            item_obj = get_item_obj(id, 1);
            //物品是材料，没有独特属性
        } else if (items[id].main_type.includes('consumable')) {
            //物品是消耗品，args内参数的含义按以下顺序排列：
            // 暂无
            item_obj = get_item_obj(id, 1);
        }
        item_obj.chance = chance; //物品掉落权重
        item_obj.rare_flag = rare_flag; //物品是否属于稀有物品
        if (rare_flag == undefined) {
            console.log('%s地点定义采集物品%s时没有设定稀有标记', this.id, id);
        }
        if (rare_flag) {
            item_obj.max_cumulative_num = max_cumulative_num; //囤积最大数量
            item_obj.cumulative_time = cumulative_time; //多长时间囤积一个，单位是游戏内的分钟
        }
        let item_key = get_item_id_key(item_obj);
        this.FAG_item[item_key] = item_obj;
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
    set_add_enemy_data(max_live_enemy_num, add_enemy_time, little_enemy_num, little_enemy_time, add_enemy_distance, add_enemy_skill_point) {
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

        this.condition_meet_chat = new Array(); //条件见面对话
        if (is_Empty_Object(texts[place_id])) {
            console.log('未定义NPC地点%s的文本信息', place_id);
        } else {
            this.default_meet_chat = texts[place_id].default_meet_chat; //默认见面对话
        }
    }
    //添加在这个npc面前可以做的行动，在玩家控制界面添加一个按钮
    add_behavior(...args) {
        for (let id of args) {
            this.behaviors.push(id);
        }
    }
    //初始化见面时满足条件才说的话
    //npc说的话就只是一句文本，文本库中没有保存条件的数据结构，所以条件绑定在npc地点库中
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
        this.use_money_type;
        this.fixed_goods = new Object(); //固定商品
        this.random_goods = new Object(); //随机商品
    }
    //设置商人使用的货币种类
    set_use_money_type(money_type) {
        this.use_money_type = money_type;
    }
    //给这个商人新增一种商品
    add_goods(id, type, inventory, rise_num, rise_data, replenish_time, replenish_num, ...args) {
        let good_obj = new Object();
        if (items[id].main_type.includes('equipment')) {
            //物品是装备，args内参数的含义按以下顺序排列：
            //稀有度
            let equip_rarity = args[0];
            if (equip_rarity === undefined) {
                console.log('装备商品没有定义稀有度');
            }
            good_obj = get_item_obj(id, 1, equip_rarity);
        } else if (items[id].main_type.includes('material')) {
            good_obj = get_item_obj(id, 1);
            //物品是材料，没有独特属性
        } else if (items[id].main_type.includes('consumable')) {
            //物品是消耗品，args内参数的含义按以下顺序排列：
            // 暂无
            good_obj = get_item_obj(id, 1);
        }

        good_obj.inventory = inventory; //这个商品最大库存
        good_obj.rise_num = rise_num; //购买几个物品涨价一次
        good_obj.rise_data = rise_data; //涨价一次的幅度
        good_obj.replenish_time = replenish_time; //每隔多久时间补货
        good_obj.replenish_num = replenish_num; //每次补货的数量
        let item_key = get_item_id_key(good_obj);
        if (type == 'fixed') {
            this.fixed_goods[item_key] = good_obj;
        } else if (type == 'random') {
            this.random_goods[item_key] = good_obj;
        }
    }
    //设置商人清理回购商品列表的参数
    set_clearance_data(clearance_time, clearance_num) {
        this.clearance_time = clearance_time; //清理回购商品时间间隔
        this.clearance_num = clearance_num; //清理回购商品的数量
    }
}
//资源地点
export class P_resource extends Place {
    constructor(place_id, area_id) {
        super(place_id, area_id);
        this.type = 'resource';
    }

    set_resource_type() {}
}

function add_Place_object(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new Place(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_normal_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_normal(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_combat_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_combat(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_NPC_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_NPC(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_store_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_store(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_resource_Place(places, newid, area) {
    if (places[newid] === undefined) {
        places[newid] = new P_resource(newid, area);
    } else {
        console.log('创建places[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export {
    add_Place_object,
    add_normal_Place, //
    add_combat_Place,
    add_NPC_Place,
    add_store_Place,
    add_resource_Place,
};
