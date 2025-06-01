import { is_Empty_Object } from '../Function/Function.js';
import { addElement } from '../Function/Dom_function.js';
import { game_events } from '../Data/Game_event/Game_Event.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { items } from '../Data/Item/Item.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { global } from './global_class.js';
//短期游戏状态标记
class ShortGameStatus {
    constructor() {
        this.value;
        this.set_time;
        this.init_time();
    }
    init_time() {
        let Time_manage = global.get_time_manage();
        this.set_time = Time_manage.get_game_now_time();
    }
}
//环形队列
class CircularQueue {
    constructor(max_size) {
        this.QueueData = new Array(max_size);
        this.max_size = max_size;
        this.front = 0;
        this.rear = -1;
        this.size = 0;
    }
    //队列入队
    enqueue(element) {
        if (this.isFull()) return false;
        this.rear = (this.rear + 1) % this.max_size;
        this.QueueData[this.rear] = element;
        this.size++;
        return true;
    }
    //插入一条日志
    enLog(element) {
        if (this.isFull()) {
            //将最老的日志出队
            this.front = (this.front + 1) % this.max_size;
            //正常入队新日志
            this.rear = (this.rear + 1) % this.max_size;
            this.QueueData[this.rear] = element;
            //哈希表数量不变
            return false;
        } else {
            this.rear = (this.rear + 1) % this.max_size;
            this.QueueData[this.rear] = element;
            this.size++;
            return true;
        }
    }
    //队列出队
    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.QueueData[this.front];
        this.front = (this.front + 1) % this.max_size;
        this.size--;
        return item;
    }
    //获取所有日志信息，不出队
    getAllLog() {
        let log_arr = new Array();
        for (let i = 0; i < this.size; i++) {
            let j = (this.front + i) % this.max_size;
            log_arr.push(this.QueueData[j]);
        }
        return log_arr;
    }

    isFull() {
        return this.size === this.max_size;
    }
    isEmpty() {
        return this.size === 0;
    }
    getSize() {
        return this.size;
    }
}

//记录游戏发生了什么的相关标记的对象
export class Global_flag_manage {
    constructor() {
        //游戏状态标记，用于判定当前游戏正在做的，有明确起始和结束的事件
        //例如战斗中，事件中，生活中，睡觉中等等
        //会决定游戏当前运行什么逻辑，需要实时更新
        this.game_status = new Object();

        //短期游戏状态标记，用于记录游戏刚刚发生了什么事情，只在很短时间内需要记录和使用的事件
        //例如刚刚某个挑战失败了
        //用了就会被清除，如果没用到也只会保留几帧就清除
        this.short_game_status = new Object();

        //重要节点标记，用于记录游戏中的重要事件或节点是否完成
        //例如主线章节是否完成，挑战是否完成
        //分为主线章节，挑战，成就三部分
        this.important_nodes = new Object();
        this.important_nodes.page = new Object();
        this.important_nodes.challenge = new Object(); //挑战完成标记
        this.important_nodes.achievement = new Object(); //成就完成标记
        this.important_nodes.mini_event = new Object(); //迷你事件完成标记

        //临用游戏状态，用于记录游戏某些不需要即时更新的值
        //如当前激活了哪个装备栏，只在涉及到装备栏变化的时候才用到
        //如村庄当前属于轮周的第几日，只在村庄里才会用到
        //实际上没有存储数值，因为实时更新它们属于是浪费资源，
        //这里存的是数值对应的获取函数
        //好吧其实什么也没存
        this.use_game_status = new Object();

        //游戏日志记录，记录游戏实时需要反馈给玩家的信息
        //如玩家战斗时造成了多少伤害，被敌人攻击受到了多少伤害，获得了什么物品等
        //内部分成战斗日志，物品日志
        this.game_log_status = new Object();

        //玩家行为记录，记录玩家干了什么事情，主要用于调用其他接口
        //如玩家攻击了一次，打死了一个怪，吃了一个食物，进行了一次探索等等
        //玩家执行了这些动作，有时候要给主动被动技能添加经验，有时候要判断是否满足了当前事件的达成条件
        //此处只负责调用接口，并不会记录下每种行为的数据
        //也就是说实际上这个对象啥都没存
        this.game_behavior_status = new Object();
    }
    init() {
        //读取数据库中的事件
        // for (let event_id in game_events) {
        //     //
        //     if (game_events[event_id].type == 'page') {
        //         this.important_nodes.page[event_id] = false;
        //     }
        //     if (game_events[event_id].type == 'challenge') {
        //         this.important_nodes.challenge[event_id] = false;
        //     }
        //     if (game_events[event_id].type == 'achievement') {
        //         this.important_nodes.achievement[event_id] = false;
        //     }
        //     if (game_events[event_id].type == 'mini_event') {
        //         this.important_nodes.mini_event[event_id] = false;
        //     }
        // }
        //初始化游戏状态参数
        for (let id of enums['game_status']) {
            this.game_status[id] = false;
        }
        //初始化游戏日志
        this.game_log_status.all_log = new CircularQueue(10);
        this.game_log_status.combat_log = new CircularQueue(10);
        this.game_log_status.item_log = new CircularQueue(10);
        this.game_log_status.other_log = new CircularQueue(10);
        this.game_log_status.new_log = new CircularQueue(10);
    }
    //获取游戏标记类的游戏存档
    save_global_flag_class() {
        let global_flag_save = new Object();
        global_flag_save.game_status = this.game_status; //游戏状态标记
        global_flag_save.important_nodes = this.important_nodes; //游戏状态标记
        return global_flag_save;
    }
    //加载游戏标记类的游戏存档
    load_global_flag_class(global_flag_save) {
        if (is_Empty_Object(global_flag_save)) {
            return;
        }

        this.game_status = global_flag_save.game_status;
        this.important_nodes = global_flag_save.important_nodes;
        //清除原本日志
        let RA_value_div = document.getElementById('RA_value_div');
        RA_value_div.replaceChildren();
    }
    get_flag(flag_name) {
        let flag_type = this.get_flag_type(flag_name);
        let flag_value;
        if (flag_type == 'short_game_status') {
            flag_value = this.get_short_game_status(flag_name);
        } else if (flag_type == 'use_game_status') {
            flag_value = this.get_use_game_status(flag_name);
        } else {
            let flag_obj = this.get_flag_obj(flag_type);
            flag_value = flag_obj[flag_name];
        }
        if (flag_value == undefined) {
            flag_value = false;
        }

        return flag_value;
    }
    get_flag_type(id) {
        //这部分游戏状态涉及调用不同的逻辑，需要在枚举库中手动定义
        //游戏状态都以“GS_”开头
        if (id.startsWith('GS_')) return 'game_status';
        // if (enums['game_status'].includes(id)) return 'game_status';
        //这部分游戏状态对会影响游戏内容，原本也需要在枚举库中定义，现在已经在初始化时自动完成定义
        if (enums['important_nodes']['page'].includes(id)) return 'page';
        if (enums['important_nodes']['challenge'].includes(id)) return 'challenge';
        if (enums['important_nodes']['achievement'].includes(id)) return 'achievement';
        if (enums['important_nodes']['mini_event'].includes(id)) return 'mini_event';
        //短期游戏状态都以“SGS_”开头，不用在枚举库中定义了
        if (id.startsWith('SGS_')) return 'short_game_status';
        //临用游戏状态都以“UGS_”开头，不用在枚举库中定义了
        if (id.startsWith('UGS_')) return 'use_game_status';

        console.log('获取%s的游戏状态类型错误，未在枚举库中定义归属', id);
    }
    get_flag_obj(type) {
        if (type == 'short_game_status') {
            console.log('短期游戏状态不能直接读成员');
            return;
        }
        if (type == 'use_game_status') {
            console.log('临用游戏状态不能直接读成员');
            return;
        }
        if (type == 'game_status') return this.game_status;
        if (type == 'page') return this.important_nodes.page;
        if (type == 'challenge') return this.important_nodes.challenge;
        if (type == 'achievement') return this.important_nodes.achievement;
        if (type == 'mini_event') return this.important_nodes.mini_event;

        console.log('错误的游戏状态类型 %s', type);
    }
    set_flag(flag_name, flag_value) {
        let flag_type = this.get_flag_type(flag_name);
        if (flag_type == 'short_game_status') {
            this.set_short_game_status(flag_name, flag_value);
        } else if (flag_type == 'use_game_status') {
            console.log('临用游戏状态不能写入');
        } else {
            let flag_obj = this.get_flag_obj(flag_type);
            flag_obj[flag_name] = flag_value;
        }
    }
    //读取游戏状态标记
    get_game_status(flag_name) {
        if (!enums['game_status'].includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }
        return this.game_status[flag_name];
    }
    //设置游戏状态标记
    set_game_status(flag_name, flag_value) {
        if (!enums['game_status'].includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }
        this.game_status[flag_name] = flag_value;
    }
    //设置短期游戏状态标记
    set_short_game_status(flag_name, flag_value) {
        if (!flag_name.startsWith('SGS_')) {
            console.log('非短期游戏状态，不可调用该接口，%s', flag_name);
            return;
        }
        this.short_game_status[flag_name] = new ShortGameStatus();
        this.short_game_status[flag_name].value = flag_value;
    }
    //更新短期游戏状态，如果超时就删除
    updata_short_game_status() {
        let Time_manage = global.get_time_manage();
        let now_time = Time_manage.get_game_now_time();
        for (let flag_name in this.short_game_status) {
            let set_time = this.short_game_status[flag_name].set_time;
            if (now_time - set_time > 1000) {
                delete this.short_game_status[flag_name];
            }
        }
    }
    //读取短期游戏状态标记
    get_short_game_status(flag_name) {
        if (!flag_name.startsWith('SGS_')) {
            console.log('非短期游戏状态，不可调用该接口，%s', flag_name);
            return;
        }
        let flag_value;
        if (!is_Empty_Object(this.short_game_status[flag_name])) {
            flag_value = this.short_game_status[flag_name].value;
            //原来设计，短期游戏状态只会保存1秒，然后希望只读一次用掉就不用了
            //这样可以实现在玩家达成某个特殊状态的时候，游戏界面可以监测到，给出反应
            //并且只会在刚刚达成的这个特殊时候反应，其他时间点都正常
            //现在发现程序遍历的时候不可避免会读取多次，所以只保留1秒保质期的逻辑，不再设计单次读取就删除了
            // delete this.short_game_status[flag_name];
        }
        return flag_value;
    }
    //获取临用游戏状态
    get_use_game_status(flag_name) {
        if (!flag_name.startsWith('UGS_')) {
            console.log('非临用游戏状态，不可调用该接口，%s', flag_name);
            return;
        }
        let flag_value;
        switch (flag_name) {
            case 'UGS_ASP_type': //主动技能规划界面的过滤条件
                flag_value = this.get_UGS_ASP_type();
                break;
            case 'UGS_village_barracks_week': //当前游戏日期属于村庄轮周的第几日
                flag_value = this.get_UGS_village_barracks_week();
                break;
            case 'UGS_BP_weight': //当前玩家背包物品的负重
                flag_value = this.get_UGS_BP_weight();
                break;

            default:
                console.log('未定义%s临用游戏状态标记的获取函数', flag_name);
                break;
        }
        return flag_value;
    }
    //临用游戏状态-主动技能规划界面的过滤条件
    get_UGS_ASP_type() {
        const radios = document.querySelectorAll('input[name="ASP_switch"]');
        for (const radio of radios) {
            if (radio.checked) {
                // 找到一个选中的按钮后可以结束循环
                return radio.value;
            }
        }
    }
    //临用游戏状态-当前游戏日期属于村庄轮周的第几日
    get_UGS_village_barracks_week() {
        let time_manage = global.get_time_manage();
        let game_date = time_manage.get_game_date();
        let all_day = game_date.year * 360 + game_date.month * 30 + game_date.day;
        all_day -= 1; //初始日期2025.4.1是周二，在这里重置成周一
        // all_day += 1; //初始日期2025.4.1是周二，在这里重置成周三
        return (all_day % 5) + 1;
    }
    //临用游戏状态-当前玩家背包物品的负重
    get_UGS_BP_weight() {
        var BP_weight = 0;
        let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
        for (let play_item_id of arr) {
            if (items[play_item_id] === undefined) {
                //玩家拥有的物品不在数据库中，应该清除
                delete player.backpack_items[play_item_id];
            } else {
                let aitem_num = player.backpack_items[play_item_id].num;
                BP_weight += Math.floor(aitem_num / items[play_item_id].maxStack);
                if (aitem_num % items[play_item_id].maxStack != 0) {
                    BP_weight++;
                }
            }
        }
        console.log('玩家当前背包负重%d', BP_weight);
        return BP_weight;
    }
    //添加一条玩家攻击的游戏日志
    set_player_attack_game_log(main_Attack, damage, enemy_id) {
        //例句：我使用普通攻击对敌人造成了1近战伤害
        let skill_id = main_Attack.id;
        let active_name = texts[skill_id].skill_name;
        let damage_type = main_Attack.damage_type;
        let damage_type_name = texts.damage_type.skill_desc[damage_type];
        let enemy_name = texts[enemy_id].enemy_name;
        let ch = '我使用' + active_name + '对' + enemy_name + '造成了' + damage + damage_type_name + '伤害';
        let log_obj = new Object();
        log_obj.type = 'RA_combat';
        log_obj.ch = ch;
        this.game_log_status.new_log.enLog(log_obj);
        this.game_log_status.all_log.enLog(log_obj);
        this.game_log_status.combat_log.enLog(log_obj);
    }
    //添加一条敌人攻击的游戏日志
    set_enemy_attack_game_log(enemy_id, damage, damage_type) {
        //例句：敌人对我攻击，我受到了1近战伤害
        let enemy_name = texts[enemy_id].enemy_name;
        let damage_type_name = texts.damage_type.skill_desc[damage_type];
        let ch = enemy_name + '对我攻击，造成了' + damage + damage_type_name + '伤害';
        let log_obj = new Object();
        log_obj.type = 'RA_combat';
        log_obj.ch = ch;
        this.game_log_status.all_log.enLog(log_obj);
        this.game_log_status.combat_log.enLog(log_obj);
        this.game_log_status.new_log.enLog(log_obj);
    }
    //添加一条获得物品的游戏日志
    set_get_item_game_log(id, num, equip_rarity) {
        let ch;
        let item_name = items[id].name;
        if (items[id].main_type.includes('equipment')) {
            //物品是装备，
            //例句：获得了普通木剑
            let rarity_name = texts[equip_rarity].rarity_name;
            if (num == 1) {
                ch = '获得了' + rarity_name + item_name;
            } else {
                ch = '获得了' + rarity_name + item_name + 'x' + num;
            }
        } else {
            //其他物品
            //例句：获得了1个普通木头
            ch = '获得了' + num + '个' + item_name;
        }
        let log_obj = new Object();
        log_obj.type = 'RA_item';
        log_obj.ch = ch;
        this.game_log_status.item_log.enLog(log_obj);
        this.game_log_status.all_log.enLog(log_obj);
        this.game_log_status.new_log.enLog(log_obj);
    }
    //玩家解锁了新的主动技能的日志
    set_unluck_active_skill_game_log(id) {
        //例句：学会了施展“普通攻击-近战”
        let ch;
        let skill_name = P_skills[id].name;
        ch = '学会了施展"' + skill_name + '"';
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.ch = ch;
        this.game_log_status.other_log.enLog(log_obj);
        this.game_log_status.all_log.enLog(log_obj);
        this.game_log_status.new_log.enLog(log_obj);
    }
    //玩家完成了某个事件
    set_finish_event_game_log(event_id) {
        //例句：完成了“周一新手教学”事件
        let ch;
        let event_name = texts[event_id].event_name;
        ch = '完成了"' + event_name + '"';
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.ch = ch;
        this.game_log_status.other_log.enLog(log_obj);
        this.game_log_status.all_log.enLog(log_obj);
        this.game_log_status.new_log.enLog(log_obj);
    }
    //更新游戏日志信息，将这一帧新的日志打印到脑海界面里
    updata_new_game_log_status() {
        //如果当前帧没有新消息，就不用更新
        if (this.game_log_status.new_log.isEmpty()) return;
        //获取当前展示的脑海界面中流水账功能的按钮
        let radios = document.getElementById('RA_button');
        //如果没有启动，就不用更新
        if (!radios.checked) return;

        //获取当前流水账功能需要展示的日志类型
        let RA_type;
        radios = document.querySelectorAll('input[name="RA_switch"]');
        for (const radio of radios) {
            if (radio.checked) {
                RA_type = radio.value;
                break;
            }
        }
        //把这一帧新增的日志打印到脑海的流水账里
        let RA_value_div = document.getElementById('RA_value_div');
        let new_log_num = this.game_log_status.new_log.getSize();
        for (let i = 0; i < new_log_num; i++) {
            let a_new_log = this.game_log_status.new_log.dequeue();
            // let a_type = 'RA_' + a_new_log.type;
            if (a_new_log.type == RA_type || RA_type == 'RA_new') {
                var new_log_div = addElement(RA_value_div, 'div', null, 'RA_log_div');
                new_log_div.innerHTML = a_new_log.ch;
                if (a_new_log.type == 'RA_combat') new_log_div.style.color = '#a71111';
                if (a_new_log.type == 'RA_item') new_log_div.style.color = '#07d93c';
                if (a_new_log.type == 'RA_other') new_log_div.style.color = '#000000';
            }
        }
        //去除过多的信息
        while (RA_value_div.childNodes.length > 10) {
            const firstChild = RA_value_div.childNodes[0]; // 获取第一个子节点
            if (firstChild) {
                RA_value_div.removeChild(firstChild); // 删除第一个子节点
            }
        }
    }
    //根据当前启动的脑海流水账过滤条件，将对应队列里的日志打印出来
    show_game_log_status(RA_type) {
        //清除原本日志
        let RA_value_div = document.getElementById('RA_value_div');
        RA_value_div.replaceChildren();

        //获取要展示的日志的列表
        let log_arr;
        if (RA_type == 'RA_new') log_arr = this.game_log_status.all_log.getAllLog();
        else if (RA_type == 'RA_combat') log_arr = this.game_log_status.combat_log.getAllLog();
        else if (RA_type == 'RA_item') log_arr = this.game_log_status.item_log.getAllLog();
        else if (RA_type == 'RA_other') log_arr = this.game_log_status.other_log.getAllLog();

        for (let i = 0; i < log_arr.length; i++) {
            var new_log_div = addElement(RA_value_div, 'div', null, 'RA_log_div');
            let a_new_log = log_arr[i];
            new_log_div.innerHTML = a_new_log.ch;
            if (a_new_log.type == 'RA_combat') new_log_div.style.color = '#a71111';
            if (a_new_log.type == 'RA_item') new_log_div.style.color = '#07d93c';
            if (a_new_log.type == 'RA_other') new_log_div.style.color = '#000000';
        }

        //去除过多的信息
        //单个日志队列只能保存10个信息，并且在展示之前已经清空了原本日志，理论上不会过多
        // while (RA_value_div.childNodes.length > 10) {
        //     const firstChild = RA_value_div.childNodes[0]; // 获取第一个子节点
        //     if (firstChild) {
        //         RA_value_div.removeChild(firstChild); // 删除第一个子节点
        //     }
        // }
    }
    //玩家行为-击杀敌人记录
    record_kill_enemy_num(main_Attack) {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.record_kill_enemy_num(main_Attack);
    }
    //玩家行为-受击次数记录
    record_attacted_num() {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.record_attacted_num();
    }
    //玩家行为-攻击次数记录
    record_attack_num() {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.record_attack_num();
    }
    //玩家行为-主动技能使用
    record_active_skill_use(id, damage) {
        // // let game_event_manage = global.get_game_event_manage();
        // // game_event_manage.record_active_skill_use(id);
        let exp_manage = global.get_exp_manage();
        exp_manage.set_Active_skill_exp(id, damage);
    }
    //玩家行为-防御技能生效
    record_defense_skill_effect(id) {
        // let exp_manage = global.get_exp_manage();
        // exp_manage.set_Active_skill_exp(id, damage);
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.record_defense_skill_effect(id);
    }
    //玩家行为-战斗数据记录
    record_combat_behavior(attack_num, attack_damage) {
        // let game_event_manage = global.get_game_event_manage();
        // game_event_manage.record_active_skill_use(id);
        let exp_manage = global.get_exp_manage();
        exp_manage.set_combat_leveling_behavior(attack_num, attack_damage);
    }
}
