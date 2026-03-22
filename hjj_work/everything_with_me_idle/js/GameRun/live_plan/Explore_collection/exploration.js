import { get_random, calculate_num_attr } from '../../../Function/math_func.js';
import { addElement } from '../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_id_key, get_random_text } from '../../../Function/Function.js';
import { enemys } from '../../../Data/Enemy/Enemy.js';
import { items } from '../../../Data/Item/Item.js';
import { places } from '../../../Data/Place/Place.js';
import { texts } from '../../../Data/Text/Text.js';
import { player } from '../../../Player/Player.js';
import { global } from '../../global_manage.js';

//探索技能管理类
export class Exploration_manage {
    constructor() {
        this.now_time; //当前时间
        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_place = 'village_home'; //当前地点

        this.player_end_attr; //玩家最终属性拷贝，方便调用
    }
    //获取探索技能管理对象的存档
    save_exploration_manage() {
        let exploration_save = new Object();
        return exploration_save;
    }
    //加载探索技能存档
    load_exploration_manage(exploration_save) {
        if (is_Empty_Object(exploration_save)) {
            return;
        }
    }
    //更新当前地点，初始化探索信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
    }
    //生活技能切换，切换到了探索界面，初始化探索界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    init_live_plan_game_div() {}
    //地点变化时，对探索界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {}
    //开始探索，更新探索技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        this.now_time = global.get_game_now_time();
    }
    //开始探索，更新探索技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {}
    //重置一轮探索的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.round_start_time = this.now_time;
        this.now_round_time = 0;
    }
    // 停止探索状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是探索，不处理
        if (now_GS != 'exploration') {
            return;
        }
    }
    // 更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
    }
    //判断当前是否处于探索的休息状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {}
}

export {};
