import { is_Empty_Object } from '../../Function/Function.js';

import { global } from '../global_manage.js';

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

export class Short_game_status {
    get_short_game_status(flag_name) {
        if (!flag_name.startsWith('SGS_')) {
            console.log('非短期游戏状态，不可调用该接口，%s', flag_name);
            return;
        }
        let flag_value;
        if (!is_Empty_Object(this[flag_name])) {
            flag_value = this[flag_name].value;
            //原来设计，短期游戏状态只会保存1秒，然后希望只读一次用掉就不用了
            //这样可以实现在玩家达成某个特殊状态的时候，游戏界面可以监测到，给出反应
            //并且只会在刚刚达成的这个特殊时候反应，其他时间点都正常
            //现在发现程序遍历的时候不可避免会读取多次，所以只保留1秒保质期的逻辑，不再设计单次读取就删除了
            // delete this[flag_name];
        }
        return flag_value;
    }
    //设置短期游戏状态标记
    set_short_game_status(flag_name, flag_value) {
        if (!flag_name.startsWith('SGS_')) {
            console.log('非短期游戏状态，不可调用该接口，%s', flag_name);
            return;
        }
        this[flag_name] = new ShortGameStatus();
        this[flag_name].value = flag_value;
    }
    //更新短期游戏状态，如果超时就删除
    updata_short_game_status() {
        let Time_manage = global.get_time_manage();
        let now_time = Time_manage.get_game_now_time();
        for (let flag_name in this) {
            let set_time = this[flag_name].set_time;
            if (now_time - set_time > 1000) {
                delete this[flag_name];
            }
        }
    }
}

export {};
