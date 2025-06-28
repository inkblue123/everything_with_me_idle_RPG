import { is_Empty_Object } from '../../Function/Function.js';
import { addElement } from '../../Function/Dom_function.js';

import { game_events } from '../../Data/Game_event/Game_Event.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';

import { Game_status } from './game_status.js';
import { get_use_game_status } from './use_game_status.js';
import { Short_game_status } from './short_game_status.js';
import { Game_log_status } from './game_log_status.js';

//记录游戏发生了什么的相关标记的对象
export class Global_flag_manage {
    constructor() {
        //游戏状态标记，用于判定当前游戏正在做的，有明确起始和结束的事件
        //例如战斗中，事件中，生活中，睡觉中等等
        //会决定游戏当前运行什么逻辑，需要实时更新
        this.GS_status = new Game_status();

        //短期游戏状态标记，用于记录游戏刚刚发生了什么事情，只在很短时间内需要记录和使用的事件
        //例如刚刚某个挑战失败了
        //用了就会被清除，如果没用到也只会保留几帧就清除
        this.SGS_status = new Short_game_status();

        //重要节点标记，用于记录游戏中的重要事件或节点是否完成
        //例如主线章节是否完成，挑战是否完成
        //分为主线章节，挑战，成就，迷你事件
        this.important_nodes = new Object();
        this.important_nodes.main_quest = new Object();
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
        this.GL_status = new Game_log_status();

        //玩家行为记录，记录玩家干了什么事情，主要用于调用其他接口
        //如玩家攻击了一次，打死了一个怪，吃了一个食物，进行了一次探索等等
        //玩家执行了这些动作，有时候要给主动被动技能添加经验，有时候要判断是否满足了当前事件的达成条件
        //此处只负责调用接口，并不会记录下每种行为的数据
        //也就是说实际上这个对象啥都没存
        this.game_behavior_status = new Object();
    }
    init() {}
    //获取游戏标记类的游戏存档
    save_global_flag_class() {
        let global_flag_save = new Object();
        global_flag_save.GS_status = new Object();
        //游戏状态标记
        for (let flag_name in this.GS_status) {
            global_flag_save.GS_status[flag_name] = this.GS_status[flag_name];
        }
        //重要节点标记
        global_flag_save.important_nodes = this.important_nodes;
        return global_flag_save;
    }
    //加载游戏标记类的游戏存档
    load_global_flag_class(global_flag_save) {
        if (is_Empty_Object(global_flag_save)) {
            return;
        }
        //游戏状态标记
        for (let flag_name in global_flag_save.GS_status) {
            this.GS_status[flag_name] = global_flag_save.GS_status[flag_name];
        }
        this.important_nodes = global_flag_save.important_nodes;
        //清除原本日志
        let RA_value_div = document.getElementById('RA_value_div');
        RA_value_div.replaceChildren();
    }
    get_flag(flag_name) {
        let flag_type = this.get_flag_type(flag_name);
        let flag_value;
        if (flag_type == 'game_status') {
            flag_value = this.GS_status.get_game_status(flag_name);
        } else if (flag_type == 'short_game_status') {
            flag_value = this.SGS_status.get_short_game_status(flag_name);
        } else if (flag_type == 'use_game_status') {
            flag_value = get_use_game_status(flag_name);
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
        //游戏状态都以“GS_”开头
        if (id.startsWith('GS_')) return 'game_status';
        //这部分游戏状态对会影响游戏内容，原本也需要在枚举库中定义，现在已经在初始化时自动完成定义
        if (enums['important_nodes']['main_quest'].includes(id)) return 'main_quest';
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
        if (type == 'game_status') return this.GS_status;
        if (type == 'main_quest') return this.important_nodes.main_quest;
        if (type == 'challenge') return this.important_nodes.challenge;
        if (type == 'achievement') return this.important_nodes.achievement;
        if (type == 'mini_event') return this.important_nodes.mini_event;

        console.log('错误的游戏状态类型 %s', type);
    }
    set_flag(flag_name, flag_value) {
        let flag_type = this.get_flag_type(flag_name);
        if (flag_type == 'game_status') {
            this.GS_status.set_game_status(flag_name, flag_value);
        } else if (flag_type == 'short_game_status') {
            this.SGS_status.set_short_game_status(flag_name, flag_value);
        } else if (flag_type == 'use_game_status') {
            console.log('临用游戏状态不能写入');
        } else {
            let flag_obj = this.get_flag_obj(flag_type);
            flag_obj[flag_name] = flag_value;
        }
    }
    //更新一些具有时效性的游戏状态
    updata_flag() {
        //更新短期游戏状态，删除过期状态
        this.SGS_status.updata_short_game_status();
        //更新这一帧的游戏日志
        this.GL_status.updata_new_game_log_status();
    }
    //记录一条游戏日志
    set_game_log(type, ...value) {
        this.GL_status.set_game_log(type, value);
    }
    //调用接口，根据脑海中的流水账过滤条件，将对应的游戏日志打印出来
    show_game_log_status(RA_type) {
        this.GL_status.show_game_log_status(RA_type);
    }

    //玩家行为-击杀敌人记录
    record_kill_enemy_num(main_Attack) {
        let game_event_manage = global.get_game_event_manage();
        let monitor_target_summ = game_event_manage.get_monitor_target_summ();
        let PKL_flag;
        let PKL_monitor_target_summ = new Object();

        for (let monitor_id in monitor_target_summ) {
            if (monitor_id.startsWith('PKL_')) {
                PKL_flag = true;
                PKL_monitor_target_summ[monitor_id] = monitor_target_summ[monitor_id];
            }
        }
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
    //玩家行为-正常完成了某个事件
    record_event_finish_end(id) {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.record_event_finish_end(id);
    }
}
