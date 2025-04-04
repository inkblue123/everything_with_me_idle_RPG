import { isEmptyObject } from '../Function/Function.js';
import { game_events } from '../Data/game_event/Game_Event.js';
import { enums } from '../Data/Enum/Enum.js';
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

//记录全局完成标记相关内容的对象
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

        //临用游戏状态，用于记录游戏某些不需要即时更新的值
        //如当前激活了哪个装备栏，只在涉及到装备栏变化的时候才用到
        //如村庄当前属于轮周的第几日，只在村庄里才会用到
        //实际上没有存储数值，因为实时更新它们属于是浪费资源，
        //这里存的是数值对应的获取函数
        //好吧其实什么也没存
        this.use_game_status = new Object();

        //章节完成标记，记录当前存档完成了多少章节
        this.flag_name_enum = new Object(); //记录标记存储在哪个子管理对象的缓存
    }
    init() {
        this.flag_name_enum = {
            page: 'this',
            challenge: 'this',
            achievement: 'this',
        };
        //读取数据库中的事件
        for (let event_id in game_events) {
            //
            if (game_events[event_id].type == 'page') {
                this.important_nodes.page[event_id] = false;
            }
            if (game_events[event_id].type == 'challenge') {
                this.important_nodes.challenge[event_id] = false;
            }
            if (game_events[event_id].type == 'achievement') {
                this.important_nodes.achievement[event_id] = false;
            }
            this.flag_name_enum[event_id] = game_events[event_id].type;
        }
        //初始化游戏状态参数
        for (let id of enums['game_status']) {
            this.game_status[id] = false;
        }
    }
    get_flag(flag_name) {
        let flag_type = this.get_flag_type(flag_name);
        let flag_value;
        // if (flag_type == 'game_status') {
        //     flag_value = this.get_game_status(flag_name);
        // } else
        if (flag_type == 'short_game_status') {
            flag_value = this.get_short_game_status(flag_name);
        } else if (flag_type == 'use_game_status') {
            flag_value = this.get_use_game_status(flag_name);
        } else {
            let flag_obj = this.get_flag_obj(flag_type);
            flag_value = flag_obj[flag_name];
        }
        return flag_value;
    }
    get_flag_type(id) {
        if (enums['game_status'].includes(id)) return 'game_status';
        if (enums['short_game_status'].includes(id)) return 'short_game_status';
        if (enums['use_game_status'].includes(id)) return 'use_game_status';
        if (enums['important_nodes']['page'].includes(id)) return 'page';
        if (enums['important_nodes']['challenge'].includes(id)) return 'challenge';
        if (enums['important_nodes']['achievement'].includes(id)) return 'achievement';

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

        console.log('错误的游戏状态类型 %s', type);
    }
    set_flag(flag_name, flag_type, flag_value) {
        if (!flag_type) {
            flag_type = this.get_flag_type(flag_name);
        }
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
        let SGS_flag_name = 'SGS_' + flag_name;
        if (!enums['short_game_status'].includes(SGS_flag_name)) {
            console.log('未定义的短期游戏状态标记，%s', SGS_flag_name);
            return;
        }
        this.short_game_status[SGS_flag_name] = new ShortGameStatus();
        this.short_game_status[SGS_flag_name].value = flag_value;
    }
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
        if (!enums['short_game_status'].includes(flag_name)) {
            console.log('未定义的短期游戏状态标记，%s', flag_name);
            return;
        }
        let flag_value;
        if (!isEmptyObject(this.short_game_status[flag_name])) {
            flag_value = this.short_game_status[flag_name].value;
            // flag_value = JSON.parse(JSON.stringify(this.short_game_status[flag_name]));
            delete this.short_game_status[flag_name];
        }
        return flag_value;
    }
    //获取临用游戏状态
    get_use_game_status(flag_name) {
        if (!enums['use_game_status'].includes(flag_name)) {
            console.log('未定义的临用游戏状态标记，%s', flag_name);
            return;
        }
        let flag_value;
        switch (flag_name) {
            case 'UGS_ASP_type':
                flag_value = this.get_ASP_type();
                break;
            case 'UGS_village_barracks_week':
                flag_value = this.get_village_barracks_week();
                break;

            default:
                console.log('未定义%s临用游戏状态标记的获取函数', flag_name);
                break;
        }
        return flag_value;
    }
    //临用游戏状态-主动技能规划界面的过滤条件
    get_ASP_type() {
        const radios = document.querySelectorAll('input[name="ASP_switch"]');
        for (const radio of radios) {
            if (radio.checked) {
                // 找到一个选中的按钮后可以结束循环
                return radio.value;
            }
        }
    }
    //临用游戏状态-当前游戏日期属于村庄轮周的第几日
    get_village_barracks_week() {
        //
        let time_manage = global.get_time_manage();
        let game_date = time_manage.get_game_date();
        let all_day = game_date.year * 360 + game_date.month * 30 + game_date.day;
        all_day -= 1; //初始日期2025.4.1是周二，在这里重置成周一
        return (all_day % 5) + 1;
    }

    // find_flag_obj(flag_name) {
    //     let path = new Array();
    //     let keys = Object.keys(this.flag_name_enum);
    //     let i = 0;
    //     let name = flag_name;
    //     //根据缓存中的记录，找到想要的标记对象的路径
    //     while (1) {
    //         if (!keys.includes(name)) {
    //             console.log('Global_flag_manage.flag_name_enum中没有找到想查询的%s', name);
    //             return null;
    //         }
    //         //
    //         if (this.flag_name_enum[name] == 'this') {
    //             break;
    //         } else {
    //             path[i] = this.flag_name_enum[name];
    //             name = this.flag_name_enum[name];
    //             i++;
    //         }
    //     }
    //     //根据路径，返回对象
    //     let need_obj = this;
    //     while (i--) {
    //         need_obj = need_obj[path[i]];
    //     }
    //     return need_obj;
    // }
}
