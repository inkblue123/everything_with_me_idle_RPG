import { get_random } from '../../Function/math_func.js';
import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, compare_dataset_value, set_dataset_value, get_item_id_key } from '../../Function/Function.js';
import { enemys } from '../../Data/Enemy/Enemy.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { texts } from '../../Data/Text/Text.js';
import { player } from '../../Player/Player.js';
import { global } from '../global_manage.js';
//钓鱼状态
const FIS_status = Object.freeze({
    NO_FIS: 1, //没有钓鱼
    WAIT_FIS: 2, //开始钓鱼的第一阶段，等鱼上钩
    WALK_FIS: 3, //开始钓鱼的第二阶段，遛鱼
    FINISH_FIS: 4, //开始钓鱼的第三阶段，钓鱼完成，结算物品
    RUN_FIS: 5, //钓鱼的特殊阶段，鱼跑了
    REST_FIS: 6, //钓鱼休息阶段
});

//钓鱼目标对象
class Fish_manage {
    constructor() {
        this.id;
        this.statu = false; //存活状态
        this.init_flee_point; //鱼的初始逃跑力
        this.now_flee_point; //鱼的当前逃跑力
        this.last_flee_point; //上一帧鱼的逃跑力
        this.FIS_energy; //遛鱼时需要消耗的每秒精力

        this.health_max; //理论最大生命
        this.health_point; //当前生命

        this.all_time = 0; //遛鱼阶段经过的总时长
        this.tip_time_flag; //遛鱼阶段的时间点触发标记
    }
    //初始化为id鱼
    init_fish(id, player_walkfish_attack) {
        this.id = id;
        this.statu = true; //存活状态
        this.health_point = enemys[id].survival_attr['health_max'];
        this.init_flee_point = enemys[id].flee_point;
        this.now_flee_point = enemys[id].flee_point;
        this.last_flee_point = enemys[id].flee_point;
        this.FIS_energy = enemys[id].FIS_energy;
        this.tip_time_flag = 0;

        //玩家遛鱼力为 a，鱼的逃跑力为 b，鱼的初始生命为 c，
        // 时间和玩家钓鱼间隔转换为尝试次数作为 x，鱼的当前生命为 y
        //有y=- a/2 *x^2 +b*x+c
        //二次函数最高点为鱼的理论最大生命
        let A = -1 * (player_walkfish_attack / 2);
        let B = this.init_flee_point;
        let C = this.health_point;
        this.health_max = (4 * A * C - B * B) / (4 * A);
        // 鱼的生命达到理论最大时，游戏界面里的进度条看起来就像是鱼跑了
        // 所以给最大值额外增加一段，防止看起来鱼跑掉
        this.health_max += this.health_point * 0.2;

        this.all_time = 0;
    }
    //获取鱼的id
    get_fish_id() {
        return this.id;
    }
    //获取鱼的名称
    get_fish_name() {
        return texts[this.id].enemy_name;
    }
    //获取鱼的存活状态
    get_fish_statu() {
        return this.statu;
    }
    //获取血量比例
    get_HP_ratio() {
        return (this.health_point / this.health_max) * 100 + '%';
    }
    //经过一帧，更新鱼的血量
    updata_fish_health(round_time, player_walkfish_attack) {
        // round_time = 500;
        this.all_time += round_time;
        let time_ratio = round_time / 1000;
        let player_attack = player_walkfish_attack * time_ratio;
        //鱼的逃跑力每次降低
        this.last_flee_point = this.now_flee_point;
        this.now_flee_point -= player_attack;
        //将鱼的逃跑力加到生命上
        let flee_point = this.now_flee_point * time_ratio;
        this.health_point += flee_point;
        // console.log('生命=%s，逃跑力=%s', this.health_point, this.now_flee_point);
        // console.log('遛鱼总时长%s，当前帧时长=%s，逃跑力变化=%s', this.all_time, round_time, player_attack);
        if (this.health_point <= 0) {
            this.health_point = 0;
            this.statu = false;
        }
    }
    //根据当前鱼的逃跑力获取是否处于遛鱼提示信息时间点
    get_walk_FIS_tip_time() {
        if (this.statu == false) {
            return 0;
        }
        let time_flee_1 = this.init_flee_point / 2;
        let time_flee_2 = 0;
        let time_flee_3 = time_flee_1 * -1;
        let time_flee_4 = this.init_flee_point * -1;

        if (this.now_flee_point < time_flee_1 && this.last_flee_point > time_flee_1) {
            this.tip_time_flag = 1;
            return 1;
        } else if (this.now_flee_point < time_flee_2 && this.last_flee_point > time_flee_2) {
            this.tip_time_flag = 2;
            return 2;
        } else if (this.now_flee_point < time_flee_3 && this.last_flee_point > time_flee_3) {
            this.tip_time_flag = 3;
            return 3;
        } else if (this.now_flee_point < time_flee_4 && this.last_flee_point > time_flee_4) {
            this.tip_time_flag = 4;
            return 4;
        }
        return 0;
    }
    //获取遛鱼阶段一帧的精力消耗
    get_walk_need_energy(round_time) {
        let need_energy = (round_time / 1000) * this.FIS_energy;
        return need_energy;
    }
}
//钓鱼技能管理类
export class Fishing_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place; //当前地点
        this.last_FIS_status = FIS_status.NO_FIS; //上一帧钓鱼状态
        this.now_FIS_status; //当前钓鱼状态

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.wait_FIS_time; //上钩阶段的随机上钩时间
        this.FIS_tip_change_time; //钓鱼提示文本更新时间
        this.FIS_tip_break_order_time; //钓鱼提示文本随机破序时间
        this.walk_FIS_no_energy_time; //遛鱼阶段没有精力的时间

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.FIS_point_data; //钓点的数值补正
        this.FIS_food_data; //鱼饵的数值补正
        this.true_takebait_attack; //实际用于计算的上钩力
        this.true_walkfish_attack; //实际用于计算的遛鱼力

        this.finish_fish_flag; //钓鱼完成阶段仅执行一次的标记
        this.FIS_status_flag; //记录当前帧是否切换到了新的钓鱼状态

        this.wait_FIS_status_flag; //记录当前帧在等鱼上钩阶段发生的事件
        // this.walk_FIS_status_flag; //记录当前帧在遛鱼阶段发生的事件

        this.fish_manage = new Fish_manage(); //钓鱼的目标对象
        this.FIS_place_rare_fishs = new Object(); //曾经到过的钓鱼地点的参数
        this.FIS_place_items_show = new Object(); //地点的可钓鱼对象展示信息
    }
    //获取钓鱼技能管理对象的存档
    save_fishing_manage() {
        let fishing_save = new Object();
        fishing_save.now_time = this.now_time;
        fishing_save.now_FIS_status = this.now_FIS_status;
        fishing_save.FIS_place_rare_fishs = this.FIS_place_rare_fishs;
        fishing_save.FIS_place_items_show = this.FIS_place_items_show;
        return fishing_save;
    }
    //加载钓鱼技能存档
    load_fishing_manage(fishing_save) {
        if (is_Empty_Object(fishing_save)) {
            return;
        }
        if (fishing_save.now_FIS_status != FIS_status.NO_FIS) {
            //存档中当前处于某个钓鱼状态，读档之后全部重置为等鱼上钩
            this.now_FIS_status = FIS_status.WAIT_FIS;
        } else {
            //存档中没有钓鱼
            this.now_FIS_status = FIS_status.NO_FIS;
        }
        let now_time = global.get_game_now_time();
        let save_time = fishing_save.now_time;
        // 钓鱼地点参数加载，需要将存档中的时间同步到当前时间
        this.FIS_place_rare_fishs = fishing_save.FIS_place_rare_fishs;
        for (let place_id in fishing_save.FIS_place_rare_fishs) {
            let save_obj = fishing_save.FIS_place_rare_fishs[place_id];
            let manage_obj = this.FIS_place_rare_fishs[place_id];
            for (let fish_id in save_obj) {
                let save_fish_last_cumulative_time = save_time - save_obj[fish_id].last_cumulative_time;
                manage_obj[fish_id].last_cumulative_time = now_time - save_fish_last_cumulative_time;
            }
        }
        this.FIS_place_items_show = fishing_save.FIS_place_items_show;
    }
    //更新当前地点，初始化钓鱼信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
        this.FIS_tip_break_order_time = this.now_time; //钓鱼提示文本随机破序时间初始化

        //更新一遍当前地点的重要缓存数据
        this.updata_FIS_place_rare_fishs();
        //初始化地点的可钓鱼对象列表
        this.init_fishing_place_show_drop();
        //展示可钓鱼对象
        this.show_fishing_drop_item_table();
        //界面切换到钓鱼状态对应界面
        this.show_now_FIS_status_div();
    }
    //地点变化时，对钓鱼界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //地点的生活技能可用标记第1个是钓鱼
        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
        if (places[next_place].live_plan_flag[1]) {
            // 新地点可以钓鱼

            // 如果当前正在钓鱼（如通过存档进入），需要更新到开始钓鱼之后的界面
            let now_GS = global.get_flag('GS_game_statu');
            if (now_GS == 'fishing') {
                //重置按钮
                const FIS_S_button = document.getElementById('FIS_S_button');
                const FIS_E_button = document.getElementById('FIS_E_button');
                FIS_S_button.style.display = 'none';
                FIS_E_button.style.display = '';
            } else {
                //当前没有正在伐木，视作常规的地点切换
            }
            return;
        }
        //新地点不能钓鱼，应该把界面更新成无钓鱼目标
        //钓鱼状态设置为无
        this.now_FIS_status = FIS_status.NO_FIS;
        if (this.last_FIS_status != this.now_FIS_status) {
            this.FIS_status_flag = true;
            //切换到新钓鱼状态的界面
            this.show_now_FIS_status_div();
            //更新钓鱼状态文本框的内容
            let FIS_status_value = document.getElementById('FIS_status_value');
            FIS_status_value.innerHTML = texts[this.now_FIS_status].fish_status_name;
            //钓鱼状态发生变动，必须更新钓鱼提示信息
            this.updata_FIS_status_change_tip();

            this.last_FIS_status = this.now_FIS_status;
        }
        //可钓鱼对象列表
        let FIS_drop_table_value_div = document.getElementById('FIS_drop_table_value_div');
        FIS_drop_table_value_div.replaceChildren();
        let drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
        drop_value.innerHTML = '无';
    }
    //开始钓鱼，更新钓鱼技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;
        //当前进入了新的钓鱼状态，
        if (this.last_FIS_status != this.now_FIS_status) {
            //记录当前帧是否切换到了新的钓鱼状态
            this.FIS_status_flag = true;

            this.init_FIS_data();
            this.last_FIS_status = this.now_FIS_status;
        }
        if (this.now_FIS_status == FIS_status.NO_FIS) {
            //当前没有钓鱼，却进入了钓鱼逻辑，属于错误情况
            console.log('钓鱼状态为无，游戏状态为钓鱼，状态冲突');
        } else if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //当前处于等鱼上钩阶段
            this.updata_wait_FIS_data();
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段，
            this.updata_walk_FIS_data();
        } else if (this.now_FIS_status == FIS_status.FINISH_FIS) {
            //当前处于钓鱼完成的结算阶段
            this.updata_finish_FIS_data();
        } else if (this.now_FIS_status == FIS_status.RUN_FIS) {
            //当前处于鱼跑了的阶段
            this.updata_run_FIS_data();
        } else if (this.now_FIS_status == FIS_status.REST_FIS) {
            //当前处于钓鱼休息阶段
            this.updata_rest_FIS_data();
        }
        return;
    }
    //开始钓鱼，更新钓鱼技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        //当前帧切换到了新的钓鱼状态
        if (this.FIS_status_flag) {
            //切换到新钓鱼状态的界面
            this.show_now_FIS_status_div();
            //更新钓鱼状态文本框的内容
            let FIS_status_value = document.getElementById('FIS_status_value');
            FIS_status_value.innerHTML = texts[this.now_FIS_status].fish_status_name;
            //钓鱼状态发生变动，必须更新钓鱼提示信息
            this.updata_FIS_status_change_tip();

            this.FIS_status_flag = false;
        }

        //常态每帧更新钓鱼信息
        this.updata_not_fixed_FIS_tip();

        if (this.now_FIS_status == FIS_status.NO_FIS) {
            //当前没有钓鱼，却进入了钓鱼逻辑，属于错误情况
            console.log('钓鱼状态为无，游戏状态为钓鱼，状态冲突');
            return;
        } else if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //当前处于等鱼上钩阶段
            this.wait_FIS_status_flag = false;
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段，
            // 更新遛鱼进度条
            let walk_fish_bar = document.getElementById('walk_fish_bar');
            let HP_ratio = this.fish_manage.get_HP_ratio();
            if (walk_fish_bar.dataset.HP_ratio != HP_ratio) {
                walk_fish_bar.children[0].children[0].style.width = HP_ratio;
                walk_fish_bar.dataset.HP_ratio = HP_ratio;
            }
            //更新鱼头像ui位置
            let fish_head = document.getElementById('fish_head');
            let head_width = fish_head.offsetWidth;
            let marginLeft = walk_fish_bar.children[0].children[0].offsetWidth;
            marginLeft = marginLeft - head_width / 2;
            fish_head.style.marginLeft = marginLeft + 'px';
        } else if (this.now_FIS_status == FIS_status.FINISH_FIS) {
            //当前处于钓鱼完成的结算阶段
        } else if (this.now_FIS_status == FIS_status.RUN_FIS) {
            //当前处于鱼跑了的阶段
        } else if (this.now_FIS_status == FIS_status.REST_FIS) {
            //当前处于钓鱼休息阶段
        }
    }
    //重置一轮钓鱼的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.round_start_time = this.now_time;
        this.now_round_time = 0;

        if (this.now_FIS_status == FIS_status.NO_FIS) {
            //当前没有钓鱼,不需要重置更多参数
            return;
        } else if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //当前处于等鱼上钩阶段，重置一次随机上钩时间
            let min_time = 1;
            let max_time = places[this.now_place].FIS_max_wait_time;
            this.wait_FIS_time = get_random(min_time, max_time);
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段，不可重置，跳到鱼跑了的阶段
            this.now_FIS_status = FIS_status.RUN_FIS;
        } else if (this.now_FIS_status == FIS_status.FINISH_FIS) {
            //当前处于钓鱼完成的结算阶段，不需要重置更多参数
        }
    }
    // 停止钓鱼状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是钓鱼，不处理
        if (now_GS != 'fishing') {
            return;
        }
        //停止钓鱼
        global.set_flag('GS_game_statu', 'NULL'); //游戏状态设定为空
        this.now_FIS_status = FIS_status.NO_FIS; //将钓鱼状态切换到空
        if (this.last_FIS_status != this.now_FIS_status) {
            this.FIS_status_flag = true;
            //切换到新钓鱼状态的界面
            this.show_now_FIS_status_div();
            //更新钓鱼状态文本框的内容
            let FIS_status_value = document.getElementById('FIS_status_value');
            FIS_status_value.innerHTML = texts[this.now_FIS_status].fish_status_name;
            //钓鱼状态发生变动，必须更新钓鱼提示信息
            this.updata_FIS_status_change_tip();

            this.last_FIS_status = this.now_FIS_status;
        }
        //重置按钮
        const FIS_S_button = document.getElementById('FIS_S_button');
        const FIS_E_button = document.getElementById('FIS_E_button');
        FIS_S_button.style.display = '';
        FIS_E_button.style.display = 'none';
    }
    // 更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
        // //更新钓鱼时的玩家参数
        this.updata_true_FIS_data();
    }

    //每个阶段初始化钓鱼参数
    init_FIS_data() {
        this.round_start_time = this.now_time;
        this.now_round_time = 0;

        if (this.now_FIS_status == FIS_status.NO_FIS) {
            //当前没有钓鱼
        } else if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //当前处于等鱼上钩阶段，重置一次随机上钩时间
            let min_time = 1;
            let max_time = places[this.now_place].FIS_max_wait_time;
            this.wait_FIS_time = get_random(min_time, max_time);
            this.wait_FIS_status_flag = false;
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段，初始化上钩的鱼对象
            let fish_id = this.get_random_chance_fish_id();
            this.fish_manage.init_fish(fish_id, this.true_walkfish_attack);
            this.walk_FIS_no_energy_time = 0;
        } else if (this.now_FIS_status == FIS_status.FINISH_FIS) {
            //当前处于钓鱼完成的结算阶段
            this.finish_fish_flag = false;
        } else if (this.now_FIS_status == FIS_status.RUN_FIS) {
            //当前处于鱼跑了的结算阶段
        } else if (this.now_FIS_status == FIS_status.REST_FIS) {
            //当前处于鱼跑了的结算阶段
        }
        return;
    }
    //按下了“开始钓鱼”按钮，这里初始化钓鱼参数，
    player_start_fishing() {
        this.now_FIS_status = FIS_status.WAIT_FIS; //将钓鱼状态切换到等鱼上钩
        //重置一轮钓鱼的参数
        // this.reset_round();
        //写日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('live_skill_run', 'start', 'fishing');
    }
    //将钓鱼界面切换到新钓鱼状态的界面
    show_now_FIS_status_div() {
        let FIS_wait_middle_div = document.getElementById('FIS_wait_middle_div');
        let FIS_walk_middle_div = document.getElementById('FIS_walk_middle_div');

        if (this.now_FIS_status == FIS_status.NO_FIS || this.now_FIS_status == FIS_status.WAIT_FIS) {
            FIS_wait_middle_div.style.display = '';
            FIS_walk_middle_div.style.display = 'none';
        } else if (this.now_FIS_status == FIS_status.WALK_FIS || this.now_FIS_status == FIS_status.FINISH_FIS || this.now_FIS_status == FIS_status.RUN_FIS) {
            FIS_wait_middle_div.style.display = 'none';
            FIS_walk_middle_div.style.display = '';
        }
    }
    //更新等鱼上钩阶段的数值
    updata_wait_FIS_data() {
        //还没到时候，不处理
        if (this.now_round_time < this.wait_FIS_time * 1000) {
            return;
        }
        //到时候了
        //更新地点的鱼的积累
        this.updata_FIS_place_rare_fishs();
        //判断当前是否有鱼可以上钩
        let can_bait_flag = this.judge_have_fish_can_bait();
        if (!can_bait_flag) {
            //没有鱼可以咬钩，重置上钩阶段
            this.reset_round();
            return;
        }
        // 判断鱼是否上钩
        let bait_flag = this.get_wait_bait_flag();
        if (bait_flag) {
            //上钩成功，进入遛鱼阶段
            this.now_FIS_status = FIS_status.WALK_FIS;
            //记录上钩了一条鱼，用于结算钓鱼技能的经验
            let global_flag_manage = global.get_global_flag_manage();
            let fishing_behavior = new Object();
            fishing_behavior.bait_fish_num = 1;
            global_flag_manage.record_fishing_behavior(fishing_behavior);
        } else {
            //上钩失败，重置上钩阶段
            this.reset_round();
            this.wait_FIS_status_flag = true;
        }
    }
    //随机获取等鱼上钩阶段的上钩结果
    get_wait_bait_flag() {
        //地点上钩及格阈值
        let FIS_pass_takebait = places[this.now_place].FIS_pass_takebait;
        //地点上钩最大阈值
        let FIS_max_takebait = places[this.now_place].FIS_max_takebait;

        if (this.true_takebait_attack < FIS_pass_takebait) {
            //玩家上钩力低于地点上钩及格阈值，必定失败
            return false;
        } else if (this.true_takebait_attack >= FIS_pass_takebait && this.true_takebait_attack < FIS_max_takebait) {
            //玩家上钩力介于及格和最大阈值之间，进行数值随机
            let random_manage = global.get_random_manage(); //随机数管理类
            let chance = (this.true_takebait_attack / FIS_max_takebait) * 100;
            return random_manage.try_critical(chance);
        } else if (this.true_takebait_attack >= FIS_max_takebait) {
            //玩家上钩力大于最大阈值，必定成功
            return true;
        }
    }
    //根据能刷的所有鱼的刷新概率权重，随机得到一个鱼id
    get_random_chance_fish_id() {
        let FIS_fishs = places[this.now_place].FIS_fishs;
        if (is_Empty_Object(FIS_fishs)) {
            //当前地点没有定义可刷的任何鱼，直接结束
            console.log('%s地点没有定义任何可刷的鱼', this.now_place);
            return false;
        }
        //根据权重获得id
        let random_manage = global.get_random_manage(); //随机数管理类
        let fish_id = random_manage.chance_randow_get_id(FIS_fishs, 'ADD_ENEMY', this.now_place);

        if (is_Empty_Object(FIS_fishs[fish_id].rare_flag)) {
            console.log('%s地点设定的%s钓鱼对象没有定义稀有标记', this.now_place, fish_id);
            return false;
        }
        if (!FIS_fishs[fish_id].rare_flag) {
            //随机得到的鱼不是稀有鱼，那本次随机就是它了
            return fish_id;
        } else {
            //随机得到的鱼是稀有鱼，查看缓存中是否还有数量
            if (this.FIS_place_rare_fishs[this.now_place][fish_id].cumulative_num <= 0) {
                //没了，随机选一个可以无限刷新的id
                let keys = new Array();
                for (let id in FIS_fishs) {
                    if (!FIS_fishs[fish_id].rare_flag) {
                        keys.push(id);
                    }
                }
                //这个地点没有可以非稀有的鱼，不可刷新
                if (keys.length <= 0) return false;

                let random = get_random(1, keys.length);
                return keys[random - 1];
            } else {
                //有积累的数量，本次随机就是它了
                //刷出稀有对象时不消耗积累的数量，只有在玩家钓到了这个鱼时才消耗
                // this.FIS_place_rare_fishs[this.now_place][fish_id].cumulative_num--;
                return fish_id;
            }
        }
    }
    //更新当前地点的稀有鱼积累情况
    updata_FIS_place_rare_fishs() {
        let FIS_fishs = places[this.now_place].FIS_fishs;
        if (is_Empty_Object(this.FIS_place_rare_fishs[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let id in FIS_fishs) {
                //不稀有的鱼不需要记录缓存
                if (!FIS_fishs[id].rare_flag) continue;
                obj[id] = new Object();
                obj[id].cumulative_num = FIS_fishs[id].max_cumulative_num;
                obj[id].last_cumulative_time = this.now_time;
            }
            this.FIS_place_rare_fishs[this.now_place] = obj;
        } else {
            let obj = this.FIS_place_rare_fishs[this.now_place];
            //当前地点已有缓存，更新一遍
            for (let id in obj) {
                if (obj[id].cumulative_num >= FIS_fishs[id].max_cumulative_num) {
                    //这棵鱼堆积数量已经满了，更新时间
                    obj[id].last_cumulative_time = this.now_time;
                } else {
                    //这棵鱼没积累满，检查是否到了积累时间
                    let cumulative_time = (this.now_time - obj[id].last_cumulative_time) / 1000;
                    if (cumulative_time >= FIS_fishs[id].cumulative_time) {
                        obj[id].cumulative_num++;
                        obj[id].last_cumulative_time = this.now_time;
                    }
                }
            }
        }
    }
    //判断当前地点是否有鱼可以上钩
    judge_have_fish_can_bait() {
        //当前地点没有普通鱼
        //没有稀有鱼积累
        //没有宝箱垃圾等特殊资源
        //都没有的情况下，这个地点不会有鱼上钩
        let FIS_fishs = places[this.now_place].FIS_fishs;
        for (let fish_id in FIS_fishs) {
            if (!FIS_fishs[fish_id].rare_flag) {
                return true; //当前地点存在普通鱼，可以上钩
            } else {
                if (this.FIS_place_rare_fishs[this.now_place][fish_id].cumulative_num > 0) {
                    return true; //当前地点有稀有鱼的积累，可以上钩
                }
            }
        }
        return false;
    }
    //更新遛鱼阶段的数值
    updata_walk_FIS_data() {
        //获取这一帧需要消耗的精力
        let need_energy = this.fish_manage.get_walk_need_energy(this.now_round_time);
        let P_attr = player.get_player_attributes();
        if (P_attr.use_energy_point(need_energy)) {
            //精力足够，实时更新鱼的生命数值
            this.fish_manage.updata_fish_health(this.now_round_time, this.true_walkfish_attack);
            if (!this.fish_manage.get_fish_statu()) {
                //鱼死了，进入第三阶段，钓鱼完成，结算物品
                this.now_FIS_status = FIS_status.FINISH_FIS;
            }
        } else {
            //精力不足，进入倒计时
            if (this.walk_FIS_no_energy_time == 0) {
                this.walk_FIS_no_energy_time = this.now_time;
                const FIS_tip_div = document.getElementById('FIS_tip_div');
                FIS_tip_div.innerHTML = '可恶，没有体力了，难道说……';
                this.FIS_tip_change_time = global.get_game_now_time();
                this.FIS_tip_break_order_time = global.get_game_now_time();
            }
            //倒计时期间继续实时更新鱼的生命数值
            this.fish_manage.updata_fish_health(this.now_round_time, this.true_walkfish_attack);
            if (!this.fish_manage.get_fish_statu()) {
                //鱼死了，进入第三阶段，钓鱼完成，结算物品
                this.now_FIS_status = FIS_status.FINISH_FIS;
            } else if (this.now_time - this.walk_FIS_no_energy_time >= 3000) {
                //倒计时结束还没钓上来，算作这条鱼跑了
                this.now_FIS_status = FIS_status.RUN_FIS;
            }
        }

        //遛鱼阶段，每一帧都视作一个回合，重置时间
        this.round_start_time = global.get_game_now_time();
    }
    //更新钓鱼完成阶段的数值
    updata_finish_FIS_data() {
        //完成阶段仅执行一次
        if (this.finish_fish_flag == false) {
            //获取钓到的鱼
            let fish_id = this.fish_manage.get_fish_id();

            //获取钓鱼物品
            let items_arr = this.get_fish_death_item(fish_id);
            for (let item_key in items_arr) {
                player.Player_get_item(items_arr[item_key]);
            }

            //结算钓鱼经验

            //将钓到的鱼更新到可钓鱼对象列表中
            let ret = this.updata_fishing_place_show_drop(fish_id);
            if (ret == true) {
                //更新到游戏界面上
                this.show_fishing_drop_item_table();
            }

            //防止完成阶段执行第二次
            this.finish_fish_flag = true;
        }

        //钓鱼完成阶段持续2秒不操作
        if (this.now_round_time < 2000) {
        }
        // 之后根据玩家精力切换到其他状态
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio >= 50) {
            //精力充足，切换到等鱼上钩，进入下一个循环
            this.now_FIS_status = FIS_status.WAIT_FIS;
        } else {
            //精力不足，切换到休息状态
            this.now_FIS_status = FIS_status.REST_FIS;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_1', 'fishing');
        }
    }
    //更新鱼跑了阶段的数值
    updata_run_FIS_data() {
        //鱼跑了阶段持续2秒不操作
        if (this.now_round_time < 2000) {
            return;
        }
        //之后根据玩家精力切换到其他状态
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio >= 50) {
            //精力充足，切换到等鱼上钩，进入下一个循环
            this.now_FIS_status = FIS_status.WAIT_FIS;
        } else {
            //精力不足，切换到休息状态
            this.now_FIS_status = FIS_status.REST_FIS;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_2', 'fishing');
        }
    }
    //更新钓鱼休息阶段的数值
    updata_rest_FIS_data() {
        let P_attr = player.get_player_attributes();
        if (!P_attr.judge_surface_energy_max()) {
            return;
        }
        //精力回满时，切换到其他状态
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio >= 25) {
            //精力充足，切换到等鱼上钩，进入下一个循环
            this.now_FIS_status = FIS_status.WAIT_FIS;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'fishing');
        } else if (surface_energy_ratio < 25) {
            //精力不足，不能钓鱼，停止
            this.stop_game_statu();
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'max_energy_2', 'fishing');
        }
    }
    //获取鱼成功钓上时的物品
    get_fish_death_item(fish_id) {
        if (is_Empty_Object(enemys[fish_id].item_array)) {
            //敌人没有掉落品，直接结束
            return;
        }

        let random_manage = global.get_random_manage(); //随机数管理类
        let drop_item_arry = new Array(); //掉落物汇总数组
        //获取敌人有几个掉落列表，对每个掉落列表进行一次判定
        let n = enemys[fish_id].item_array.length;
        for (let i = 0; i < n; i++) {
            //根据掉落概率，判断这个列表里的物品要掉几次
            let enemy_item_obj = enemys[fish_id].item_array[i];
            let chance = enemy_item_obj.drop_chance; //掉率
            let drop_times = parseInt(chance / 100);
            chance = chance % 100;
            let random = get_random(0, 100);
            if (random <= chance) {
                drop_times += 1;
            }
            for (let j = 0; j < drop_times; j++) {
                //根据权重，获取掉落哪一个物品
                let item_key = random_manage.get_enemy_death_item_id(fish_id, i);
                let data_obj = enemy_item_obj.items[item_key];

                let item_obj = new Object();
                item_obj.id = data_obj.id;
                item_obj.num = get_random(data_obj.min_num, data_obj.max_num); //这次掉落的数量
                if (items[item_obj.id].main_type.includes('equipment')) {
                    //如果掉落的是装备，还需要记录稀有度
                    item_obj.equip_rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
                }
                //将掉落的信息存起来
                drop_item_arry.push(item_obj);
            }
        }
        //对掉落物去重
        let uniqueArr = new Object();
        for (let item_obj of drop_item_arry) {
            let item_key = get_item_id_key(item_obj);

            if (is_Empty_Object(uniqueArr[item_key])) {
                uniqueArr[item_key] = item_obj;
            } else {
                uniqueArr[item_key].num += item_obj.num;
            }
        }
        return uniqueArr;
    }
    //更新玩家属性
    updata_true_FIS_data() {
        //玩家上钩力
        this.true_takebait_attack = this.player_end_attr['FIS_takebait_attack'];
        // this.true_takebait_attack += this.FIS_point_data; //添加钓点补正
        // this.true_takebait_attack += this.FIS_food_data; //添加鱼饵补正
        //玩家遛鱼力
        this.true_walkfish_attack = this.get_true_walkfish_attack();
        // this.true_walkfish_attack = this.player_end_attr['FIS_walkfish_attack'];
    }
    //更新切换钓鱼状态时的固定提示信息
    updata_FIS_status_change_tip() {
        //只有钓鱼状态切换时才更新提示信息
        if (!this.FIS_status_flag) {
            return;
        }
        const FIS_tip_div = document.getElementById('FIS_tip_div');
        let ch = '';

        if (this.now_FIS_status == FIS_status.NO_FIS) {
            //当前没有钓鱼
            let now_GS = global.get_flag('GS_game_statu');
            if (now_GS == 'fishing') {
                //开始钓鱼后不应该运行这个逻辑
                console.log('开始钓鱼后不应该运行到这个逻辑，错误情况');
            } else {
                //停止钓鱼时会运行到这里，逻辑是正常的，为了避免后续判空报错，在这里给ch填一个符号
                ch = ' ';
            }
        } else if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //当前处于等鱼上钩阶段
            if (this.player_end_attr['weapon_type'].includes('fishing_tool')) {
                ch = texts['FIS_status_change']['WAIT_FIS_text'];
            } else {
                ch = texts['FIS_status_change']['WAIT_FIS_no_tool_text'];
            }
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段，
            ch = texts['FIS_status_change']['WALK_FIS_text'];
        } else if (this.now_FIS_status == FIS_status.FINISH_FIS) {
            //当前处于钓鱼完成的结算阶段
            ch = texts['FIS_status_change']['FINISH_FIS_text'];
            let fish_name = this.fish_manage.get_fish_name();
            ch = ch + '<br>' + fish_name;
        } else if (this.now_FIS_status == FIS_status.RUN_FIS) {
            //当前处于鱼跑了的阶段
            ch = texts['FIS_status_change']['RUN_FIS_text'];
        } else if (this.now_FIS_status == FIS_status.REST_FIS) {
            //当前处于钓鱼休息阶段
            ch = texts['FIS_status_change']['REST_FIS_text'];
        }
        if (ch == '' || is_Empty_Object(ch)) {
            console.log('error2');
        }
        FIS_tip_div.innerHTML = ch;
        //更新时间
        this.FIS_tip_change_time = global.get_game_now_time();
        this.FIS_tip_break_order_time = global.get_game_now_time();
        return;
    }
    //更新不定时钓鱼提示信息
    updata_not_fixed_FIS_tip() {
        //判断当前是否可用更新提示信息
        let flag = this.check_tip_updata_flag();
        if (!flag) {
            return;
        }
        //开始更新
        const FIS_tip_div = document.getElementById('FIS_tip_div');
        let ch = '';
        //当前处于等鱼上钩阶段
        if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //随机选择等鱼上钩阶段的一个文本
            let keys = Object.keys(texts['wail_FIS_tip_text']);
            let num = get_random(0, keys.length - 1 - 1); //-1是为了序号，再-1是去掉文本数据库中的"id"这个键值对
            let key = 'text' + (num + 1);
            ch = texts['wail_FIS_tip_text'][key];
        }
        //当前处于遛鱼阶段
        if (this.now_FIS_status == FIS_status.WALK_FIS) {
            let text_id;
            let general_flag = get_random(0, 100);
            if (general_flag < 20) {
                text_id = 'walk_FIS_general_tip_text';
            } else {
                let walk_FIS_time = this.fish_manage.get_walk_FIS_tip_time();
                text_id = 'walk_FIS_status' + walk_FIS_time + '_tip_text';
            }
            let text_obj = texts[text_id];
            let keys = Object.keys(text_obj);
            let num = get_random(0, keys.length - 1 - 1); //-1是为了序号，再-1是去掉文本数据库中的"id"这个键值对
            let key = 'text' + (num + 1);
            ch = text_obj[key];
        }
        if (ch == '' || is_Empty_Object(ch)) {
            console.log('error2');
        }
        FIS_tip_div.innerHTML = ch;
        //更新时间
        this.FIS_tip_change_time = global.get_game_now_time();
    }
    //检查当前是否可以不定时更新钓鱼提示信息
    check_tip_updata_flag() {
        //当前处于等鱼上钩阶段
        if (this.now_FIS_status == FIS_status.WAIT_FIS) {
            //没有触发时间点，不会更新
            if (this.wait_FIS_status_flag == false) {
                return false;
            }
        } else if (this.now_FIS_status == FIS_status.WALK_FIS) {
            //当前处于遛鱼阶段
            //没有触发时间点，不会更新
            let walk_FIS_time = this.fish_manage.get_walk_FIS_tip_time();
            if (walk_FIS_time == 0) {
                return false;
            } else {
                // console.log('%d', walk_FIS_time);
            }
        } else {
            //其他钓鱼阶段不会用到不定时更新钓鱼信息的功能
            return false;
        }
        //获取破序机制的结果
        let break_order_flag = false;
        if (this.now_time - this.FIS_tip_break_order_time >= 3000) {
            if (get_random(0, 100) >= 50) {
                break_order_flag = true;
            }
        }
        //在任意提示信息更新过5秒之后可以正常更新
        let change_time_flag = false;
        if (this.now_time - this.FIS_tip_change_time >= 5000) {
            change_time_flag = true;
        }

        if (break_order_flag) {
            //如果可以破序，则颠倒正常更新的结果，更新破序时间
            this.FIS_tip_break_order_time = global.get_game_now_time();
            return !change_time_flag;
        } else {
            //如果不可破序，则按照正常更新结果执行
            return change_time_flag;
        }
    }
    //刷新当前地点展示的可钓鱼对象
    show_fishing_drop_item_table() {
        //清空现有展示的内容
        let FIS_drop_table_value_div = document.getElementById('FIS_drop_table_value_div');
        FIS_drop_table_value_div.replaceChildren();
        //获取可展示物品个数
        let can_show_num = 0;
        let all_num = this.FIS_place_items_show[this.now_place].num;
        for (let id in this.FIS_place_items_show[this.now_place].show_flag) {
            if (this.FIS_place_items_show[this.now_place].show_flag[id]) {
                can_show_num++;
            }
        }
        if (can_show_num == 0 && all_num == 0) {
            //当前地点没有可展示的鱼，应该属于不可钓鱼的地点，显示相应的信息
            let drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
            drop_value.innerHTML = '无';
        } else if (can_show_num != 0 && all_num == 0) {
            //不应出现的错误情况
            console.log('异常：地点%s，没有可钓鱼对象，但却有可展示的信息', this.now_place);
        } else if (can_show_num == 0 && all_num != 0) {
            //地点里有可钓鱼对象，但没有需要展示的内容，仅显示提示信息
            let drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
            drop_value.innerHTML = '未知鱼影';
        } else if (can_show_num != 0 && all_num != 0) {
            //地点里有可钓鱼对象，也有需要展示的内容
            for (let id in this.FIS_place_items_show[this.now_place].show_flag) {
                if (this.FIS_place_items_show[this.now_place].show_flag[id] == false) {
                    continue;
                }
                let FAG_drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
                if (items[id].main_type.includes('equipment')) {
                    //如果掉落的是装备，改变字体颜色变成稀有度的颜色
                    FAG_drop_value.style.color = hex2Rgba(enums[equip_rarity].rarity_color, alpha);
                }
                FAG_drop_value.innerHTML = items[id].name;
            }
            if (can_show_num < all_num) {
                //当前地点里还有玩家没发现的可采集物，显示提示信息
                let FAG_drop_value = addElement(FIS_drop_table_value_div, 'div', null, 'drop_value');
                FAG_drop_value.innerHTML = '未知鱼影';
            }
        }
    }
    //初始化当前地点可钓鱼对象列表
    init_fishing_place_show_drop() {
        //当前地点可采集物品已经初始化过，不需要重复初始化
        if (!is_Empty_Object(this.FIS_place_items_show[this.now_place])) {
            return;
        }
        this.FIS_place_items_show[this.now_place] = new Object();
        let obj = new Object();
        let num = 0;

        //常规钓鱼对象，比如各种鱼
        let FIS_fishs = places[this.now_place].FIS_fishs;
        for (let id in FIS_fishs) {
            obj[id] = false;
            num++;
        }
        //特殊钓鱼对象，比如宝箱、垃圾

        this.FIS_place_items_show[this.now_place].show_flag = obj;
        this.FIS_place_items_show[this.now_place].num = num;
    }
    //更新当前地点可钓鱼对象列表
    updata_fishing_place_show_drop(fish_id) {
        let updata_flag = false;
        if (this.FIS_place_items_show[this.now_place].show_flag[fish_id] == false) {
            this.FIS_place_items_show[this.now_place].show_flag[fish_id] = true;
            updata_flag = true;
        }
        return updata_flag;
    }
    //获取最终遛鱼力
    get_true_walkfish_attack() {
        //基础遛鱼力
        let base_FIS_walkfish_attack = this.player_end_attr['FIS_walkfish_attack'];

        //累加所有直接乘算遛鱼力加成
        let FIS_walkfish = 0;
        // let FIS_walkfish = this.player_end_attr['FIS_walkfish'];
        // if (FIS_walkfish === undefined) {
        //     FIS_walkfish = 0;
        // }

        //最终乘算遛鱼力
        let end_FIS_walkfish_attack = this.player_end_attr['end_FIS_walkfish_attack'];
        if (end_FIS_walkfish_attack === undefined) {
            end_FIS_walkfish_attack = 0;
        }

        //结算遛鱼力
        let true_walkfish_attack = 0;
        if (FIS_walkfish >= 0) {
            true_walkfish_attack = base_FIS_walkfish_attack * ((100 + FIS_walkfish) * 0.01);
        } else {
            true_walkfish_attack = base_FIS_walkfish_attack * (100 / (100 - FIS_walkfish));
        }
        if (end_FIS_walkfish_attack >= 0) {
            true_walkfish_attack = true_walkfish_attack * ((100 + end_FIS_walkfish_attack) * 0.01);
        } else {
            true_walkfish_attack = true_walkfish_attack * (100 / (100 - end_FIS_walkfish_attack));
        }

        return true_walkfish_attack;
    }
    get_now_FIS_status() {
        return this.now_FIS_status;
    }
}

export {};
