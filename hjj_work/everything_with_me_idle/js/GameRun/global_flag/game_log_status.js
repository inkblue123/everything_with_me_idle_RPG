import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';

import { texts } from '../../Data/Text/Text.js';
import { items } from '../../Data/Item/Item.js';
import { enums } from '../../Data/Enum/Enum.js';
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
    set_game_log(type, value) {
        if (type == 'player_attack') {
            this.set_player_attack_game_log(value);
        }
        if (type == 'finish_event') {
            this.set_finish_event_game_log(value);
        }
        if (type == 'unluck_skill') {
            this.set_unluck_skill_game_log(value);
        }
        if (type == 'get_item') {
            this.set_get_item_game_log(value);
        }
        if (type == 'enemy_attack') {
            this.set_enemy_attack_game_log(value);
        }
        if (type == 'skill_levelup') {
            this.set_skill_levelup(value);
        }
    }
    //添加一条玩家攻击的游戏日志
    set_player_attack_game_log(value) {
        //例句：我使用普通攻击对敌人造成了1近战伤害
        //需要用到的攻击的主动技能id，伤害值，伤害类型，敌人id
        let log_obj = new Object();
        log_obj.type = 'RA_combat';
        log_obj.log_type = 'player_attack';
        log_obj.main_Attack = value[0];
        log_obj.damage = value[1];
        log_obj.enemy_id = value[2];
        this.new_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.combat_log.enLog(log_obj);
    }
    //添加一条敌人攻击的游戏日志
    set_enemy_attack_game_log(value) {
        //例句：敌人对我攻击，我受到了1近战伤害
        //需要用到的参数是敌人id，伤害值，伤害类型
        let log_obj = new Object();
        log_obj.type = 'RA_combat';
        log_obj.log_type = 'enemy_attack';
        log_obj.enemy_id = value[0];
        log_obj.damage = value[1];
        log_obj.damage_type = value[2];
        this.all_log.enLog(log_obj);
        this.combat_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //添加一条获得物品的游戏日志
    set_get_item_game_log(value) {
        //物品是装备，例句：获得了普通木剑
        //其他物品，例句：获得了1个普通木头
        //需要用到的参数是物品id，数量，稀有度
        let log_obj = new Object();
        log_obj.type = 'RA_item';
        log_obj.log_type = 'get_item';
        log_obj.id = value[0];
        log_obj.num = value[1];
        log_obj.equip_rarity = value[2];
        this.item_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //玩家完成了某个事件
    set_finish_event_game_log(value) {
        //例句：完成了“周一新手教学”事件
        //需要用到的参数是事件id
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.log_type = 'finish_event';
        log_obj.event_id = value[0];
        this.other_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //玩家解锁了新的技能的日志
    set_unluck_skill_game_log(value) {
        //例句：学会了施展“普通攻击-近战”
        //需要用到的参数是技能id
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.log_type = 'unluck_skill';
        log_obj.id = value;
        this.other_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
        this.new_log.enLog(log_obj);
    }
    //玩家有技能升级了
    set_skill_levelup(value) {
        //例句：“普通攻击-近战”提高了1级，目前2级
        //需要用到的参数是技能id，提升的等级，目前等级
        let log_obj = new Object();
        log_obj.type = 'RA_other';
        log_obj.log_type = 'skill_levelup';
        log_obj.id = value[0];
        log_obj.up_level = value[1];
        log_obj.now_level = value[2];
        this.other_log.enLog(log_obj);
        this.all_log.enLog(log_obj);
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
        //将列表里的信息打印出来
        for (let a_new_log of log_arr) {
            var new_log_div = addElement(RA_value_div, 'div', null, 'RA_log_div');
            addElement(new_log_div, 'div', null, 'RA_log_div_br');

            if (a_new_log.log_type == 'get_item') {
                this.make_get_item_game_log(new_log_div, a_new_log);
            } else if (a_new_log.log_type == 'enemy_attack') {
                this.make_enemy_attack_game_log(new_log_div, a_new_log);
            } else if (a_new_log.log_type == 'player_attack') {
                this.make_player_attack_game_log(new_log_div, a_new_log);
            } else if (a_new_log.log_type == 'finish_event') {
                this.make_finish_event_game_log(new_log_div, a_new_log);
            } else if (a_new_log.log_type == 'unluck_skill') {
                this.make_unluck_skill_game_log(new_log_div, a_new_log);
            } else if (a_new_log.log_type == 'skill_levelup') {
                this.make_skill_levelup_game_log(new_log_div, a_new_log);
            }
        }
        //去除过多的信息
        //单个日志队列只能保存10个信息，并且在展示之前已经清空了原本日志，理论上不会过多
        // while (RA_value_div.childNodes.length > 10) {
        //     const firstChild = RA_value_div.childNodes[0]; // 获取第一个子节点
        //     if (firstChild) {
        //         RA_value_div.removeChild(firstChild); // 删除第一个子节点
        //     }
        // }
        let first_br = RA_value_div.childNodes[0].childNodes[0];
        if (first_br.className == 'RA_log_div_br') {
            RA_value_div.childNodes[0].removeChild(first_br);
        }
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
            if (a_new_log.type == RA_type || RA_type == 'RA_new') {
                var new_log_div = addElement(RA_value_div, 'div', null, 'RA_log_div');
                addElement(new_log_div, 'div', null, 'RA_log_div_br');
                if (a_new_log.log_type == 'get_item') {
                    this.make_get_item_game_log(new_log_div, a_new_log);
                } else if (a_new_log.log_type == 'enemy_attack') {
                    this.make_enemy_attack_game_log(new_log_div, a_new_log);
                } else if (a_new_log.log_type == 'player_attack') {
                    this.make_player_attack_game_log(new_log_div, a_new_log);
                } else if (a_new_log.log_type == 'finish_event') {
                    this.make_finish_event_game_log(new_log_div, a_new_log);
                } else if (a_new_log.log_type == 'unluck_skill') {
                    this.make_unluck_skill_game_log(new_log_div, a_new_log);
                } else if (a_new_log.log_type == 'skill_levelup') {
                    this.make_skill_levelup_game_log(new_log_div, a_new_log);
                }
            }
        }
        //去除过多的信息
        while (RA_value_div.childNodes.length > 10) {
            let firstChild = RA_value_div.childNodes[0]; // 获取第一个子节点
            if (firstChild) {
                RA_value_div.removeChild(firstChild); // 删除第一个子节点
            }
        }
        let first_br = RA_value_div.childNodes[0].childNodes[0];
        if (first_br.className == 'RA_log_div_br') {
            RA_value_div.childNodes[0].removeChild(first_br);
        }
    }

    //生成一条敌人攻击的游戏日志
    make_enemy_attack_game_log(new_log_div, log_obj) {
        let enemy_id = log_obj.enemy_id;
        let damage = log_obj.damage;
        let damage_type = log_obj.damage_type;
        //例句：敌人对我攻击，我受到了1近战伤害
        let enemy_name = texts[enemy_id].enemy_name;
        let damage_type_name = texts.damage_type.skill_desc[damage_type];
        let ch = enemy_name + '对我攻击，造成了' + damage + damage_type_name + '伤害';

        let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
        part1.innerHTML = ch;
    }
    //生成一条玩家攻击的游戏日志
    make_player_attack_game_log(new_log_div, log_obj) {
        let main_Attack = log_obj.main_Attack;
        let damage = log_obj.damage;
        let enemy_id = log_obj.enemy_id;
        //例句：我使用普通攻击对敌人造成了1近战伤害
        let skill_id = main_Attack.id;
        let active_name = texts[skill_id].skill_name;
        let damage_type = main_Attack.damage_type;
        let damage_type_name = texts.damage_type.skill_desc[damage_type];
        let enemy_name = texts[enemy_id].enemy_name;
        let ch = '我使用' + active_name + '对' + enemy_name + '造成了' + damage + damage_type_name + '伤害';
        let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
        part1.innerHTML = ch;
    }
    //生成一条获取物品的游戏日志
    make_get_item_game_log(new_log_div, log_obj) {
        let id = log_obj.id;
        let item_name = items[id].name;
        let num = log_obj.num;
        let equip_rarity = log_obj.equip_rarity;
        if (items[id].main_type.includes('equipment')) {
            //物品是装备，例句：获得了普通木剑
            let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
            part1.innerHTML = '获得了';

            let part2 = addElement(new_log_div, 'div', null, 'RA_log_div');
            let rarity_name = texts[equip_rarity].rarity_name;
            part2.innerHTML = rarity_name + item_name;
            part2.style.color = enums[equip_rarity].rarity_color;

            if (num != 1) {
                let part3 = addElement(new_log_div, 'div', null, 'RA_log_div');
                part3.innerHTML = 'x' + num;
            }
        } else {
            //其他物品，例句：获得了1个普通木头
            let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
            part1.innerHTML = '获得了' + num + '个';

            let part2 = addElement(new_log_div, 'div', null, 'RA_log_div');
            part2.innerHTML = item_name;
        }
    }
    //生成一条玩家完成了某个事件的游戏日志
    make_finish_event_game_log(new_log_div, log_obj) {
        let event_id = log_obj.event_id;
        //例句：完成了“周一新手教学”事件
        let event_name = texts[event_id].event_name;
        let ch = '完成了"' + event_name + '"';
        let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
        part1.innerHTML = ch;
    }
    //生成一条玩家解锁了新的技能的日志
    make_unluck_skill_game_log(new_log_div, log_obj) {
        // 例句：学会了新的（主动/被动）技能“普通攻击-近战”
        let id = log_obj.id;
        let type_ch;
        if (P_skills[id].type == 'Passive') {
            type_ch = '被动';
        } else if (P_skills[id].type == 'Active') {
            type_ch = '主动';
        }
        let skill_name = P_skills[id].name;
        let ch = '学会了新的' + type_ch + '技能"' + skill_name + '"';
        let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
        part1.innerHTML = ch;
    }
    //生成一条玩家有技能升级了的日志
    make_skill_levelup_game_log(new_log_div, log_obj) {
        let id = log_obj.id;
        let up_level = log_obj.up_level;
        let now_level = log_obj.now_level;
        //例句：“普通攻击-近战”提高了1级，目前2级
        let skill_name = P_skills[id].name;
        let ch = '"' + skill_name + '"提高了' + up_level + '级，目前' + now_level + '级';
        let part1 = addElement(new_log_div, 'div', null, 'RA_log_div');
        part1.innerHTML = ch;
    }
}

export {};
