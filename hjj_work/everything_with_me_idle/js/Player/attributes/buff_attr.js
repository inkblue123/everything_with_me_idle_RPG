import { is_Empty_Object } from '../../Function/Function.js';
import { buffs } from '../../Data/Buff/Buff.js';
import { global } from '../../GameRun/global_manage.js';
import { player } from '../../Player/Player.js';
//一个玩家buff对象基类
class BUFF {
    constructor(id) {
        //buff通用变量
        this.id = id; //唯一id
        const copiedData = JSON.parse(JSON.stringify(buffs[id]));
        for (let key in copiedData) {
            this[key] = copiedData[key];
        }
        for (let buff_value of this.buff_value) {
            if (buff_value.buff_type == 'change_game_speed') {
                buff_value.start_flag = false;
            }
        }
    }
}
//使用游戏时间当作有效期依据的buff
class game_time_BUFF extends BUFF {
    constructor(id) {
        super(id);
        this.buff_start_time; //buff启动时间
        this.last_buff_time; //上次触发buff的时间
        this.buff_have_time; //buff剩余有效时间
    }
    init() {
        let time_manage = global.get_time_manage();
        this.buff_start_time = time_manage.get_game_now_time(); //获得buff的游戏时间
        this.last_buff_time = this.buff_start_time; //上次触发buff的时间
        if (this.time_value != 'infinite') {
            this.buff_have_time = this.time_value * 1000; //buff剩余有效时间
        }
    }
    //使用存档数据初始化
    load_init(buff_have_time) {
        let time_manage = global.get_time_manage();
        let game_now_time = time_manage.get_game_now_time();
        this.buff_start_time = game_now_time - buff_have_time; //推算获得buff的游戏时间
        this.last_buff_time = this.buff_start_time; //上次触发buff的时间
        if (this.time_value != 'infinite') {
            this.buff_have_time = buff_have_time; //buff剩余有效时间
        }
    }
    //检查这个buff应该运行、等待、清除的状态
    get_buff_status(game_now_time) {
        if (this.time_value != 'infinite') {
            //持续时间超过了有效时间
            // if (game_now_time - this.buff_start_time >= this.time_value * 1000) {
            //     return 'delete';
            // }
            //有效时间归零了
            if (this.buff_have_time <= 0) {
                return 'delete';
            }
        }
        //游戏设定是30帧，也就是现实每秒游戏运行30次，
        //game_time_BUFF如果真的每秒才运行，游戏里看起来会很卡
        //所以实际运行时会每秒运行10次，每次触发1/10的buff效果
        let time_in = game_now_time - this.last_buff_time;
        if (time_in < 100) {
            //时间没到，不生效
            return 'wait';
        } else {
            //时间到了，生效一次
            return 'start';
        }
    }
    //激活一次这个buff
    start_buff(game_now_time) {
        //对基于游戏时间生效的buff，激活时将每秒应当生效的属性和经过的时间进行等比计算，
        let time_in = game_now_time - this.last_buff_time;

        for (let buff_value of this.buff_value) {
            if (buff_value.buff_type == 'get_data_attr') {
                start_get_data_attr_buff(buff_value, this.time_type, time_in);
            } else if (buff_value.buff_type == 'change_game_speed') {
                if (buff_value.start_flag == true) {
                    //修改游戏速度的buff已经生效，不需要重复启动
                    continue;
                } else {
                    start_change_game_speed_buff(buff_value);
                    buff_value.start_flag = true;
                }
            }
        }
        //更新参数
        if (this.time_value != 'infinite') {
            this.buff_have_time -= time_in;
        }
        this.last_buff_time = game_now_time;
    }
    //清除这个buff的效果
    delete_buff(game_now_time) {
        //对基于游戏时间生效的buff，激活时将每秒应当生效的属性和经过的时间进行等比计算，

        for (let buff_value of this.buff_value) {
            if (buff_value.buff_type == 'change_game_speed') {
                delete_change_game_speed_buff();
            }
        }
    }
}
//激活一次提供属性的buff效果
function start_get_data_attr_buff(buff_value, time_type, time_value) {
    let data; //这一次激活需要提供的属性值

    if (time_type == 'game_time') {
        //持续时间内持续有效的buff
        let time_in = time_value; //生效的单位时间
        data = (buff_value.data / 1000) * time_in; //该单位时间获得的属性
    } else if (time_type == 'combat_active') {
        //持续玩家数个主动技能时间的buff
        data = buff_value.data; //每次生效的属性
    }
    //生效
    let P_attr = player.get_player_attributes();
    P_attr.change_data_attr(buff_value.data_attr, data);
}
//激活一次修改游戏速度的buff效果
function start_change_game_speed_buff(buff_value) {
    //生效
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed(buff_value.data);
}
//恢复修改游戏速度的buff效果
function delete_change_game_speed_buff() {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed(1);
}

export class Buff_attr_manage {
    constructor() {
        //所有以游戏内时间为时间依据的buff
        this.game_time_buff = new Object();
        //所有加成计算完毕之后的最终属性
        this.end_buff_attr = new Object();
    }
    init() {}
    //获取玩家buff部分的游戏存档
    save_Buff_attr() {
        let buff_attr_save = new Object();
        // 使用游戏时间当作有效期依据的buff
        if (!is_Empty_Object(this.game_time_buff)) {
            buff_attr_save.game_time_buff = new Object();
            for (let id in this.game_time_buff) {
                let buff_obj = new Object();
                //每个buff目前只保存剩余时间
                //之后或许还需要保存buff的加成效果等参数
                if (buffs[id].time_value != 'infinite') {
                    buff_obj.buff_have_time = this.game_time_buff[id].buff_have_time;
                }

                buff_attr_save.game_time_buff[id] = buff_obj;
            }
        }

        return buff_attr_save;
    }
    //加载玩家buff部分的游戏存档
    load_Buff_attr(buff_attr_save) {
        //先清空目前的所有buff
        this.reset_buff_attr();

        if (is_Empty_Object(buff_attr_save)) {
            return;
        }

        if (!is_Empty_Object(buff_attr_save.game_time_buff)) {
            for (let id in buff_attr_save.game_time_buff) {
                let buff_have_time = buff_attr_save.game_time_buff[id].buff_have_time;
                //有些无限时间的buff是没有剩余时间的，buff_have_time会是未定义，已经在load_init里处理了
                let buff_obj = new game_time_BUFF(id);
                buff_obj.load_init(buff_have_time);
                this.game_time_buff[id] = buff_obj;
            }
        }
    }
    //根据id让玩家获得一个buff
    set_buff_attr(id) {
        //构建buff对象
        let buff_obj = new Object();
        if (buffs[id].time_type == 'game_time') {
            buff_obj = new game_time_BUFF(id);
        }

        buff_obj.init();
        let time_type_ch = buff_obj.time_type + '_buff';
        //初始想法是将新旧buff的好的部分合并
        // let old_buff = this[time_type_ch][id];
        // if (is_Empty_Object(old_buff)) {
        //     // 没有同名buff，直接新增
        //     this[time_type_ch][id] = buff_obj;
        // } else {
        //     // 有同名buff，将两个buff的好的部分合并
        //     this.update_same_name_buff(old_buff, buff_obj);
        // }
        //没有想好同名的新旧buff如何更新，直接用新buff替换旧buff
        this[time_type_ch][id] = buff_obj;
    }
    //根据id清除玩家的一个buff
    delete_buff_attr(id) {
        let time_type_ch = buffs[id].time_type + '_buff';
        if (!is_Empty_Object(this[time_type_ch][id])) {
            this[time_type_ch][id].delete_buff();
            delete this[time_type_ch][id];
        }
    }
    //清空玩家所有buff
    reset_buff_attr() {
        if (!is_Empty_Object(this.game_time_buff)) {
            for (let id in this.game_time_buff) {
                this.game_time_buff[id].delete_buff();
                delete this.game_time_buff[id];
            }
        }
    }
    //获取最终属性
    get_end_buff_attr() {
        return this.end_buff_attr;
    }
    //游戏运行一帧，计算玩家buff
    run_player_buff() {
        //以游戏内时间为时间依据的buff
        if (!is_Empty_Object(this.game_time_buff)) {
            this.run_game_time_buff();
        }
    }

    //运行以游戏内时间为时间依据的buff
    run_game_time_buff() {
        let time_manage = global.get_time_manage();
        let game_now_time = time_manage.get_game_now_time();
        for (let id in this.game_time_buff) {
            let buff_obj = this.game_time_buff[id];
            let status = buff_obj.get_buff_status(game_now_time); //判断这个buff的状态
            if (status == 'delete') {
                //buff结束了，应该清除
                buff_obj.delete_buff(); //清除这个buff的效果
                delete this.game_time_buff[id];
            } else if (status == 'start') {
                //此时buff可以激活一次
                buff_obj.start_buff(game_now_time);
            } else if (status == 'wait') {
                //此时buff不能激活，需要等待
            }
        }
    }
}
