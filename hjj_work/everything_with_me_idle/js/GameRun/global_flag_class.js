import { isEmptyObject } from '../Function/Function.js';

//短期游戏状态监控类
class short_game_status_manage {
    constructor() {
        this.need_monitor_id = new Array(); //需要监控的行为的id
        this.monitor_data = new Object(); //需要监控的行为的监控数值
    }
}

//记录全局完成标记相关内容的对象
export class Global_flag_manage {
    constructor() {
        this.game_status = new Object(); //游戏状态统计

        this.achievement = new Object(); //成就完成标记
        this.challenge = new Object(); //挑战完成标记
        this.page = new Object(); //章节完成标记

        this.flag_name_enum = new Object(); //记录标记存储在哪个子管理对象的缓存
    }
    init() {
        //章节完成标记
        this.page.finish_page_1 = false;
        this.page.finish_page_2 = false;

        this.challenge.base = new Object(); //挑战1的相关内容
        this.challenge.base.finish = false; //挑战1的相关内容

        this.challenge.base2 = new Object(); //挑战2的相关内容
        this.challenge.base2.finish = false; //挑战2的相关内容

        this.achievement.test1 = new Object(); //测试
        this.achievement.test1.testtest2 = new Object(); //测试
        this.achievement.test1.testtest2.finish = false; //测试

        // this.page.finish_page_2 = false;
        // this.page.finish_page_2 = false;
        // this.page.finish_page_2 = false;

        this.flag_name_enum = {
            page: 'this',
            challenge: 'this',
            // achievement: 'this',
            base: 'challenge',
            base2: 'challenge',
            test1: 'achievement',
            testtest2: 'test1',
        };
    }
    get_game_status() {
        return this.game_status;
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
        return need_obj[flag_name];
    }
}
