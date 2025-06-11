import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';

import { texts } from '../../Data/Text/Text.js';
import { items } from '../../Data/Item/Item.js';
import { P_skills } from '../../Data/Skill/Skill.js';

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

export class Game_log_status {
    constructor() {
        this.all_log = new CircularQueue(10);
        this.combat_log = new CircularQueue(10);
        this.item_log = new CircularQueue(10);
        this.other_log = new CircularQueue(10);
        this.new_log = new CircularQueue(10);
    }
    //添加一条玩家攻击的游戏日志
    set_player_attack_game_log(value) {
        //输入参数
        let main_Attack = value[0];
        let damage = value[1];
        let enemy_id = value[2];
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
        this.new_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.combat_log.enLog(log_obj);
    }
    //玩家完成了某个事件
    set_finish_event_game_log(value) {
        let event_id = value[0];
        //例句：完成了“周一新手教学”事件
        let ch;
        let event_name = texts[event_id].event_name;
        ch = '完成了"' + event_name + '"';
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.ch = ch;
        this.other_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //玩家解锁了新的主动技能的日志
    set_unluck_active_skill_game_log(value) {
        let id = value;
        //例句：学会了施展“普通攻击-近战”
        let ch;
        let skill_name = P_skills[id].name;
        ch = '学会了施展"' + skill_name + '"';
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.ch = ch;
        this.other_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //添加一条获得物品的游戏日志
    set_get_item_game_log(value) {
        let id = value[0];
        let num = value[1];
        let equip_rarity = value[2];
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
        this.item_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //添加一条敌人攻击的游戏日志
    set_enemy_attack_game_log(value) {
        let enemy_id = value[0];
        let damage = value[1];
        let damage_type = value[2];
        //例句：敌人对我攻击，我受到了1近战伤害
        let enemy_name = texts[enemy_id].enemy_name;
        let damage_type_name = texts.damage_type.skill_desc[damage_type];
        let ch = enemy_name + '对我攻击，造成了' + damage + damage_type_name + '伤害';
        let log_obj = new Object();
        log_obj.type = 'RA_combat';
        log_obj.ch = ch;
        this.all_log.enLog(log_obj);
        this.combat_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //根据当前启动的脑海流水账过滤条件，将对应队列里的日志打印出来
    show_game_log_status(RA_type) {
        //清除原本日志
        let RA_value_div = document.getElementById('RA_value_div');
        RA_value_div.replaceChildren();

        //获取要展示的日志的列表
        let log_arr;
        if (RA_type == 'RA_new') log_arr = this.all_log.getAllLog();
        else if (RA_type == 'RA_combat') log_arr = this.combat_log.getAllLog();
        else if (RA_type == 'RA_item') log_arr = this.item_log.getAllLog();
        else if (RA_type == 'RA_other') log_arr = this.other_log.getAllLog();

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

    //更新游戏日志信息，将这一帧新的日志打印到脑海界面里
    updata_new_game_log_status() {
        //如果当前帧没有新消息，就不用更新
        if (this.new_log.isEmpty()) return;
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
        let new_log_num = this.new_log.getSize();
        for (let i = 0; i < new_log_num; i++) {
            let a_new_log = this.new_log.dequeue();
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
}

export {};
