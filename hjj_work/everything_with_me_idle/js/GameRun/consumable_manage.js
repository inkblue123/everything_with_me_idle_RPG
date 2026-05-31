import { is_Empty_Object, get_item_obj, get_item_id_key } from '../Function/Function.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from './global_manage.js';
import { player } from '../Player/Player.js';

//消耗品管理类
export class Consumable_Manage {
    constructor() {
        this.now_use_id; //当前正在使用的消耗品id
        this.now_use_item_key; //当前正在使用的消耗品的key
        this.start_use_time; //当前正在使用的消耗品的启动时间
        this.last_use_time; //当前正在使用的消耗品的上次使用时间
        this.start_use_ratio; //当前正在使用的消耗品的初始使用进度
        this.last_use_ratio; //当前正在使用的消耗品的上次使用进度

        this.player_end_attr = new Object(); //玩家最终属性拷贝，方便调用
    }
    updata_player_data(player_end_attr) {
        this.player_end_attr = player_end_attr;
    }
    //使用一份指定消耗品
    use_consumable(item_data) {
        let id = item_data.id;

        let use_type = items[id].use_type;
        if (use_type == 'none' || use_type == 'keep_use') {
            //这两种类型的消耗品不能主动点击使用
            return;
        }

        //判断指定消耗品当前能否使用
        if (!this.check_consumable_con_use(item_data)) {
            return;
        }

        let ret;
        //根据消耗品使用类型，使用一份
        if (use_type == 'once_use') {
            ret = this.use_once_use_consumable(item_data);
            if (ret) {
                let P_backpack = player.get_player_backpack();
                P_backpack.updata_BP_value();
            }
        } else if (use_type == 'sustain_use') {
            this.init_sustain_use_consumable(item_data);
        }
    }
    //判断指定消耗品当前能否使用
    check_consumable_con_use(item_data) {
        let flag = true;
        let id = item_data.id;
        let use_type = items[id].use_type;
        if (use_type == 'once_use') {
            //一次性使用，要判断使用的效果能否生效
            for (let attr_obj of items[id].use_attr) {
                if (attr_obj.attr_type == 'get_attr') {
                    //给予属性类型的效果，如果当前该属性满了，就不能使用
                    if (enums['need_judge_max_attr'].includes(attr_obj.attr_id)) {
                        let P_attr = player.get_player_attributes();
                        if (P_attr.judge_player_attr_max(attr_obj.attr_id)) {
                            flag = false;
                        } else {
                            // flag = true;
                        }
                    } else {
                        // flag = true;
                    }
                } else if (attr_obj.attr_type == 'get_item') {
                    //给予物品的效果，如果当前背包空间满了，就不能使用
                }
            }
        } else if (use_type == 'sustain_use') {
            //持续使用物品，要判断玩家状态能否开始使用，以及这个物品本身还能不能用了
            let now_GS = global.get_flag('GS_game_statu');
            if (now_GS != 'NULL' && now_GS != 'use_continuous') {
                //当前处于其他游戏状态，不能使用消耗品
                flag = false;
            }
            //消耗品已经使用完毕，不能使用
            if (item_data.use_ratio >= 100) {
                flag = false;
            }
        }
        return flag;
    }
    //使用一份一次性使用消耗品
    use_once_use_consumable(item_data) {
        let item_key = get_item_id_key(item_data);
        let id = item_data.id;
        //物品减少一个
        let ret = player.Player_lose_item(item_key, 1);
        if (!ret) {
            console.log('去掉%s消耗品时异常', item_key);
            return false;
        }
        //获得一次效果
        for (let attr_obj of items[id].use_attr) {
            get_consumable_use_data(attr_obj);
        }
        return true;
    }
    //开始使用一个持续使用消耗品
    init_sustain_use_consumable(item_data) {
        //保存这个消耗品的初始状态
        this.now_use_id = item_data.id;
        this.now_use_item_key = get_item_id_key(item_data);
        this.start_use_time = global.get_game_now_time();
        this.last_use_time = global.get_game_now_time();
        this.start_use_ratio = item_data.use_ratio;
        this.last_use_ratio = item_data.use_ratio;
        //启动使用消耗品状态
        global.set_flag('GS_game_statu', 'use_continuous');
        //玩家控制界面切换到消耗品
        let control = document.getElementById('control');
        control.show_use_consumable(item_data.id, item_data.use_ratio);
    }
    //更新一帧当前正在使用的消耗品
    updata_sustain_use_consumable() {
        let now_time = global.get_game_now_time();
        //至少每秒结算一次
        // if (now_time - this.last_use_time < 500) {
        //     return;
        // }
        //获取一段时间内使用当前消耗品需要的资源
        let use_max_data = new Object(); //这段时间内针对消耗品需要资源的最大消耗量
        let have_data = new Object(); //当前消耗品需要资源的拥有量
        let need_data = new Object(); //消耗品剩余需要的资源量
        let true_can_use_data_ratio = 100; //这段时间内可以推进的消耗品使用进度
        let time = now_time - this.last_use_time; //当前时间段
        for (let use_data_obj of items[this.now_use_id].sustain_use_data) {
            let id = use_data_obj.id;
            let value = use_data_obj.value;
            let can_use_data; //遍历的这条属性，当前时间段内可以消耗的资源值
            if (id == 'time') {
                use_max_data[id] = time / 1000; //这段时间内消耗的秒数
                need_data[id] = (100 - this.last_use_ratio) * 0.01 * value * 1000; //剩余需要的秒数
                can_use_data = Math.min(use_max_data[id], need_data[id]);
            } else {
                let use_speed_id = 'UCSB_' + id;
                let use_speed = this.player_end_attr[use_speed_id];
                let P_attr = player.get_player_attributes();

                use_max_data[id] = (time / 1000) * use_speed; //这段时间内可以用的理论最大值
                have_data[id] = P_attr.get_data_attr(id); //当前拥有的值
                need_data[id] = (100 - this.last_use_ratio) * 0.01 * value; //剩余需要的值

                can_use_data = Math.min(use_max_data[id], have_data[id]);
                can_use_data = Math.min(can_use_data, need_data[id]);
            }
            //遍历的这条属性，当前时间段可以推进消耗品使用的进度
            let can_use_data_ratio = (can_use_data / value) * 100;
            can_use_data_ratio = parseFloat(can_use_data_ratio.toFixed(2));
            if (true_can_use_data_ratio > can_use_data_ratio) {
                true_can_use_data_ratio = can_use_data_ratio;
            }
        }
        if (true_can_use_data_ratio == 0) {
            //有一种资源不足，不能继续使用了，结算
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.change_GS_game_statu('NULL');
            return;
        }
        let true_use_data = new Object(); //消耗品剩余需要的资源量
        //根据这段时间内可以推进的消耗品使用进度，计算推进这点进度需要的资源量
        for (let use_data_obj of items[this.now_use_id].sustain_use_data) {
            let id = use_data_obj.id;
            let value = use_data_obj.value;
            true_use_data[id] = value * (true_can_use_data_ratio / 100);
        }
        //消耗这些资源
        let P_attr = player.get_player_attributes();
        for (let id in true_use_data) {
            if (id != 'time') {
                let use_data = true_use_data[id] * -1;
                P_attr.change_data_attr(id, use_data);
            }
        }
        //使用进度跨过了使用效果中记载的一个阈值，获得这个进度对应的效果
        for (let attr_obj of items[this.now_use_id].use_attr) {
            if (this.last_use_ratio < attr_obj.use_ratio && this.last_use_ratio + true_can_use_data_ratio >= attr_obj.use_ratio) {
                get_consumable_use_data(attr_obj);
            }
        }
        //推进使用进度
        this.last_use_time = now_time;
        this.last_use_ratio += true_can_use_data_ratio;
        this.last_use_ratio = parseFloat(this.last_use_ratio.toFixed(2)); //变成2位字符串再变成数字

        if (this.last_use_ratio >= 100) {
            //使用进度达到100，结算
            this.last_use_ratio = 100;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.change_GS_game_statu('NULL');
        } else {
            //更新玩家控制界面的文本
            let control = document.getElementById('control');
            let Place_desc_div = control.querySelector('#Place_desc_div');
            let item_name = items[this.now_use_id].name;
            let text_ch = '正在使用消耗品 ' + item_name + '<br>';
            text_ch = text_ch + '进度 ' + this.last_use_ratio + ' %';
            Place_desc_div.innerHTML = text_ch;
        }
    }
    //结算当前使用的消耗品
    end_sustain_use_consumable() {
        //失去原物品
        let ret = player.Player_lose_item(this.now_use_item_key, 1);
        if (!ret) {
            console.log('结算消耗品时找不到使用的东西了，异常情况');
            return;
        }
        //获得使用后的新物品
        let item_obj = get_item_obj(this.now_use_id, 1, this.last_use_ratio);
        player.Player_get_item_nolog(item_obj);
        //玩家控制界面调回原位
        let control = document.getElementById('control');
        control.show_now_place();
    }

    //计算指定消耗品预计需要多长时间使用完毕
    get_use_consumable_time(item_obj) {
        let item_id = item_obj.id;
        let need_time = new Object();

        for (let use_data_obj of items[item_id].sustain_use_data) {
            let id = use_data_obj.id;
            let value = use_data_obj.value;
            if (id == 'time') {
                need_time[id] = (100 - item_obj.use_ratio) * 0.01 * value; //剩余需要的秒数
            } else {
                let use_speed_id = 'UCSB_' + id;
                let P_attr = player.get_player_attributes();
                let use_speed = P_attr.get_data_attr(use_speed_id);

                let need_data = (100 - item_obj.use_ratio) * 0.01 * value; //剩余需要的值
                need_time[id] = need_data / use_speed; //剩余需要的秒数
            }
            need_time[id] = parseFloat(need_time[id].toFixed(2)); //格式化
        }
        //返回所需时间最长的一个
        let ret = 0;
        for (let id in need_time) {
            if (ret < need_time[id]) {
                ret = need_time[id];
            }
        }
        return ret;
    }
}

//生效一个消耗品的属性
function get_consumable_use_data(attr_obj) {
    if (attr_obj.attr_type == 'get_attr') {
        let P_attr = player.get_player_attributes();
        P_attr.change_data_attr(attr_obj.attr_id, attr_obj.attr_value1);
    } else if (attr_obj.attr_type == 'get_item') {
        //给予物品的效果，如果当前背包空间满了，就不能使用
        console.log('没有开发给予物品的消耗品的逻辑');
    } else if (attr_obj.attr_type == 'get_buff') {
        console.log('没有开发给予buff的消耗品的逻辑');
    } else if (attr_obj.attr_type == 'get_formula') {
        let P_formula = player.get_player_formulas_manage();
        P_formula.Player_get_formula(attr_obj.attr_id, 'know');
    }
}
