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
        let FPS_manage = global.get_fps_manage();
        this.set_time = FPS_manage.get_game_now_time();
    }
}

//记录全局完成标记相关内容的对象
export class Global_flag_manage {
    constructor() {
        //游戏状态标记，用于判定当前游戏正在做的，有明确起始和结束的事件
        //例如战斗中，事件中，生活中，睡觉中等等
        this.game_status = new Object();

        //短期游戏状态标记，用于记录游戏刚刚发生了什么事情，只在很短时间内需要记录和使用的事件
        //例如刚刚某个挑战失败了
        //用了就会被清除，如果没用到也只会保留几帧就清除
        this.short_game_status = new Object();

        //章节完成标记，记录当前存档完成了多少章节
        this.page = new Object();
        this.challenge = new Object(); //挑战完成标记
        this.achievement = new Object(); //成就完成标记
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
                this.page[event_id] = false;
            }
            if (game_events[event_id].type == 'challenge') {
                this.challenge[event_id] = false;
            }
            if (game_events[event_id].type == 'achievement') {
                this.achievement[event_id] = false;
            }
            this.flag_name_enum[event_id] = game_events[event_id].type;
        }
        //初始化游戏状态参数
        for (let id of enums['game_status']) {
            this.game_status[id] = false;
        }
    }
    //获取整个子对象
    get_manage(manage_name) {
        if (isEmptyObject(this[manage_name])) {
            return this[manage_name];
        } else {
            return null;
        }
    }
    get_flag(flag_name) {
        let need_obj = this.find_flag_obj(flag_name);
        return need_obj[flag_name];
    }
    set_flag(flag_name, flag) {
        let need_obj = this.find_flag_obj(flag_name);
        need_obj[flag_name] = flag;
    }
    //查找指定标记，返回该标记所在的对象
    find_flag_obj(flag_name) {
        let path = new Array();
        let keys = Object.keys(this.flag_name_enum);
        let i = 0;
        let name = flag_name;
        //根据缓存中的记录，找到想要的标记对象的路径
        while (1) {
            if (!keys.includes(name)) {
                console.log('Global_flag_manage.flag_name_enum中没有找到想查询的%s', name);
                return null;
            }
            //
            if (this.flag_name_enum[name] == 'this') {
                break;
            } else {
                path[i] = this.flag_name_enum[name];
                name = this.flag_name_enum[name];
                i++;
            }
        }
        //根据路径，返回对象
        let need_obj = this;
        while (i--) {
            need_obj = need_obj[path[i]];
        }
        return need_obj;
    }
    //设置游戏状态
    set_game_status(id, flag) {
        if (!enums['game_status'].includes(id)) {
            console.log('未定义的游戏状态设置，%s', id);
            return;
        }
        this.game_status[id] = flag;
    }
    //读取游戏状态
    get_game_status(id) {
        if (!enums['game_status'].includes(id)) {
            console.log('未定义的游戏状态获取，%s', id);
            return;
        }
        return this.game_status[id];
    }
    set_short_game_status(id, flag) {
        this.short_game_status[id] = new ShortGameStatus();
        this.short_game_status[id].value = flag;
    }
    updata_short_game_status() {
        let FPS_manage = global.get_fps_manage();
        let now_time = FPS_manage.get_game_now_time();
        for (let id in this.short_game_status) {
            let set_time = this.short_game_status[id].set_time;
            if (now_time - set_time > 1000) {
                delete this.short_game_status[id];
            }
        }
    }

    get_short_game_status(id) {
        let status;
        if (!isEmptyObject(this.short_game_status[id])) {
            status = JSON.parse(JSON.stringify(this.short_game_status[id]));
            delete this.short_game_status[id];
        }

        return status;
    }

    get_use_game_status(id) {
        return null;
    }
}
