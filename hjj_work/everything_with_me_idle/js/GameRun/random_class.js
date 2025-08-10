import { is_Empty_Object, get_uniqueArr } from '../Function/Function.js';
import { global } from '../GameRun/global_manage.js';

//稀有游戏内容管理对象
class Rare_manage {
    constructor() {
        this.rare_manage = new Object(); //稀有游戏内容管理对象
    }
    //初始化一个稀有游戏对象
    init_rare(id) {
        if (!is_Empty_Object(this[id])) {
            return;
        }
        this[id] = new Object();
        this[id].last_drop_time = global.get_game_now_time(); //上次掉落时间
    }
}
//随机数相关的对象
export class Random_manage {
    constructor() {
        this.rare_manage = new Rare_manage(); //稀有游戏内容管理对象
    }
    //生成一个min到max之间的1级随机数
    get_random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    //从队列里获取权重，随机得到某个对象的序号
    get_arr_chance_random(arr) {
        let all_chance = 0;
        for (let id in arr) {
            all_chance += arr[id].chance;
        }
        let chance = this.get_random(0, all_chance);
        let id;
        for (id in arr) {
            if (chance > arr[id].chance) {
                chance -= arr[id].chance;
            } else {
                break;
            }
        }
        return id;
    }

    //在地点中刷怪，返回一个敌人id
    get_place_add_enemy_id(enemys) {
        //寻找队列里的稀有对象
        let rare_arr = this.get_rare_arr(enemys);
        //地点刷怪遵守权重随机，得到一个结果
        let id = this.get_arr_chance_random(enemys);

        //没有稀有对象，返回权重随机的结果
        if (is_Empty_Object(rare_arr)) {
            return id;
        }

        if (rare_arr.includes(id)) {
            //随机的结果是稀有对象，重置该对象的保底计数，更新其他对象的保底计数
        } else {
            //随机的结果不是稀有对象，尝试触发保底
        }
    }
    //从队列里寻找稀有对象
    get_rare_arr(arr) {
        let rare_arr = new Array();
        //情况1：如果有“稀有标签”成员，以标签为准
        let if_def_rare_flag = false; //是否定义了稀有标签
        for (let id in arr) {
            if (arr[id].rare_flag == undefined) {
                continue;
            }
            if_def_rare_flag = true;
            if (arr[id].rare_flag) {
                rare_arr.push(id);
            }
        }
        //检测到定义了稀有标签，
        if (if_def_rare_flag) {
            return rare_arr;
        }

        //情况2：计算每个对象的期望概率，概率小于等于5%的视作稀有对象
        let all_chance = 0;
        for (let id in arr) {
            all_chance += arr[id].chance;
        }
        for (let id in arr) {
            if (arr[id].chance / all_chance < 0.05) {
                rare_arr.push(id);
            }
        }
        return rare_arr;
    }
}

var random_manage = new Random_manage();

export { random_manage };
