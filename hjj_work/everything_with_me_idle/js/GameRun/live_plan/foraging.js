import { addElement, start_magic_animation } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_item_id_key, is_overlap, get_random_text } from '../../Function/Function.js';
import { calculate_num_attr, calculate_speed_attr, get_random } from '../../Function/math_func.js';
import { items } from '../../Data/Item/Item.js';
import { places, areas } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { player } from '../../Player/Player.js';
import { global } from '../global_manage.js';
//采集状态
const FAG_status = Object.freeze({
    NO_FAG: 1, //没有采集
    NORMAL_FAG: 2, //正常采集
    REST_FAG: 3, //停止采集，进入休息状态
    LUCK_FAG: 4, //幸运采集
    DANGER_FAG: 5, //涉险采集
    DANGER_FAG_END: 6, //涉险采集结束阶段
});
//采集技能管理类
export class Foraging_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place; //当前地点

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_round_max_time; //当前回合最大运行时间
        this.last_start_time; //上一帧的时间
        this.last_try_luck_FAG_time; //上次尝试幸运采集的时间
        this.luck_FAG_start_time = 0; //幸运采集进入时间
        this.last_try_danger_FAG_time; //上次尝试涉险采集的时间
        this.danger_FAG_start_time = 0; //涉险采集进入时间
        this.danger_FAG_end_time = 0; //涉险采集离开时间

        this.now_FAG_status = FAG_status.NO_FAG; //当前采集状态
        this.next_FAG_status = null; //下一帧的采集状态
        this.luck_FAG_flag = true; //是否开启了幸运采集
        this.danger_FAG_flag = true; //是否开启了涉险采集
        this.normal_FAG_one_run_flag = false; //正常采集阶段只执行一次的标记
        this.rest_FAG_one_run_flag = false; //休息阶段只执行一次的标记
        this.luck_FAG_one_run_flag = false; //幸运采集阶段只执行一次的标记
        this.danger_FAG_start_flag = false; //涉险采集阶段开始时只执行一次的标记
        this.danger_FAG_end_flag = false; //涉险采集阶段结束时只执行一次的标记

        this.danger_FAG_speed_num; //涉险采集状态下的采集速度加成
        this.danger_FAG_MAX_danger; //涉险采集状态中随机出的危险最大数量
        this.danger_FAG_now_danger; //涉险采集状态当前经历过的危险数量
        this.danger_FAG_continuous_danger_obj = new Object(); //涉险采集状态当前触发的持续性危险记录
        this.danger_FAG_end_reason; //涉险采集结束原因

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.true_FAG_interval; //实际用于计算的采集间隔
        this.true_FAG_speed; //实际用于计算的采集速度加成
        this.true_FAG_attack; //实际用于计算的采集攻击
        this.true_FAG_luck_chance; //实际用于计算的幸运采集概率
        this.true_FAG_danger_chance; //实际用于计算的涉险采集概率

        this.FAG_place_rare_items = new Object(); //各个采集地点的稀有对象积累数量
        this.FAG_place_items_show = new Object(); //地点的可采集物展示信息
    }
    //获取采集技能管理对象的存档
    save_foraging_manage() {
        let foraging_save = new Object();
        //获取每个子对象的存档
        //采集管理对象
        foraging_save.now_time = this.now_time;
        foraging_save.FAG_place_rare_items = this.FAG_place_rare_items;
        foraging_save.FAG_place_items_show = this.FAG_place_items_show;
        foraging_save.now_FAG_status = this.now_FAG_status;
        foraging_save.luck_FAG_flag = this.luck_FAG_flag;
        foraging_save.danger_FAG_flag = this.danger_FAG_flag;

        return foraging_save;
    }
    //加载采集技能存档
    load_foraging_manage(foraging_save) {
        if (is_Empty_Object(foraging_save)) {
            return;
        }
        let now_time = global.get_game_now_time();
        let save_time = foraging_save.now_time;
        //稀有对象积累数量加载，需要将存档中的时间同步到当前时间
        this.FAG_place_rare_items = foraging_save.FAG_place_rare_items;
        for (let place_id in foraging_save.FAG_place_rare_items) {
            let save_obj = foraging_save.FAG_place_rare_items[place_id];
            let manage_obj = this.FAG_place_rare_items[place_id];

            for (let id in save_obj) {
                let save_tree_last_cumulative_time = save_time - save_obj[id].last_cumulative_time;
                manage_obj[id].last_cumulative_time = now_time - save_tree_last_cumulative_time;
            }
        }
        //可采集物信息
        this.FAG_place_items_show = foraging_save.FAG_place_items_show;
        //采集状态
        this.now_FAG_status = foraging_save.now_FAG_status;
        this.luck_FAG_flag = foraging_save.luck_FAG_flag;
        this.danger_FAG_flag = foraging_save.danger_FAG_flag;
        //上一帧的时间
        this.last_start_time = now_time;
    }

    //更新当前地点，初始化采集信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
        //到达新地点，先初始化可采集物品列表
        this.init_foraging_place_show_drop();
        //到达新地点，需要展示新地点的可采集物品
        this.show_foraging_drop_item_table();
        //更新玩家的采集概率展示
        this.updata_FAG_chance_show();
        //更新当前地点的稀有对象积累情况
        this.updata_foraging_place_rare_item();
    }
    //地点变化时，对采集界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //两个采集模式的按钮切换到正确的样式
        let FAG_luck_open_button = FAG_value_div.querySelector('#FAG_luck_open_button');
        let FAG_luck_close_button = FAG_value_div.querySelector('#FAG_luck_close_button');
        if (this.luck_FAG_flag) {
            FAG_luck_open_button.style.display = '';
            FAG_luck_close_button.style.display = 'none';
        } else {
            FAG_luck_open_button.style.display = 'none';
            FAG_luck_close_button.style.display = '';
        }
        let FAG_danger_open_button = FAG_value_div.querySelector('#FAG_danger_open_button');
        let FAG_danger_close_button = FAG_value_div.querySelector('#FAG_danger_close_button');
        if (this.danger_FAG_flag) {
            FAG_danger_open_button.style.display = '';
            FAG_danger_close_button.style.display = 'none';
        } else {
            FAG_danger_open_button.style.display = 'none';
            FAG_danger_close_button.style.display = '';
        }
        if (places[next_place].live_plan_flag[3]) {
            //地点的生活技能可用标记第3个是采集
            // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
            //新地点可以采集
            // 如果当前正在采集（如通过存档进入），需要更新到开始采集之后的界面
            let now_GS = global.get_flag('GS_game_statu');
            if (now_GS == 'foraging') {
                //重置按钮
                const FAG_S_button = document.getElementById('FAG_S_button');
                const FAG_E_button = document.getElementById('FAG_E_button');
                FAG_S_button.style.display = 'none';
                FAG_E_button.style.display = '';
            } else {
                //当前没有正在采集，视作常规的地点切换，已更新完成
            }
        } else {
            //新地点不能采集，应该把界面更新成无采集目标
            let FAG_no_show_value_div = document.getElementById('FAG_no_show_value_div');
            FAG_no_show_value_div.innerHTML = '无';
            let FAG_have_show_value_div = document.getElementById('FAG_have_show_value_div');
            FAG_have_show_value_div.replaceChildren();
            let FAG_show_chance_div = document.getElementById('FAG_show_chance_div');
            FAG_show_chance_div.innerHTML = '0%';
            //玩家采集进度条
            let FAG_bar = document.getElementById('FAG_bar');
            FAG_bar.children[0].children[0].style.width = '0%';
            FAG_bar.dataset.attack_ratio = '0%';
        }
    }
    //开始采集，更新采集技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        this.now_time = global.get_game_now_time();
        if (this.next_FAG_status != null) {
            //采集状态切换
            this.now_FAG_status = this.next_FAG_status;
            this.next_FAG_status = null;
            //重置标记
            this.normal_FAG_one_run_flag = false;
            this.rest_FAG_one_run_flag = false;
            this.luck_FAG_one_run_flag = false;
            this.danger_FAG_start_flag = false;
            this.danger_FAG_end_flag = false;
        }
        if (this.now_FAG_status == FAG_status.NORMAL_FAG) {
            // this.now_round_time = this.now_time - this.round_start_time;
            //处于正常采集状态
            this.updata_normal_FAG_data();
        } else if (this.now_FAG_status == FAG_status.REST_FAG) {
            //处于休息状态
            this.updata_rest_FAG_data();
        } else if (this.now_FAG_status == FAG_status.LUCK_FAG) {
            //处于幸运采集状态
            this.updata_luck_FAG_data();
        } else if (this.now_FAG_status == FAG_status.DANGER_FAG) {
            //处于涉险采集状态
            this.updata_danger_FAG_start_data();
        } else if (this.now_FAG_status == FAG_status.DANGER_FAG_END) {
            //处于涉险采集状态
            this.updata_danger_FAG_end_data();
        }
        this.last_start_time = this.now_time;
    }
    //开始采集，更新采集技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        if (this.now_FAG_status == FAG_status.NORMAL_FAG) {
            //处于正常采集状态，实时更新采集进度条
            if (this.normal_FAG_one_run_flag == false) {
                let FAG_current = document.getElementById('FAG_current');
                FAG_current.style.backgroundColor = 'rgb(16, 118, 201)'; //进度条切换回正常颜色
                let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
                FAG_show_tip_text.style.color = ''; //恢复文本颜色
                FAG_show_tip_text.innerHTML = ''; //清空文本
                this.normal_FAG_one_run_flag = true;
            }
        } else if (this.now_FAG_status == FAG_status.REST_FAG) {
            //处于休息状态，进度条不动
            if (this.rest_FAG_one_run_flag == false) {
                let FAG_current = document.getElementById('FAG_current');
                FAG_current.style.backgroundColor = 'rgb(16, 118, 201)'; //进度条切换回正常颜色
                let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
                FAG_show_tip_text.style.color = ''; //恢复文本颜色
                FAG_show_tip_text.innerHTML = ''; //清空文本
                this.rest_FAG_one_run_flag = true;
            }
        } else if (this.now_FAG_status == FAG_status.LUCK_FAG) {
            //处于幸运采集状态
            if (this.luck_FAG_one_run_flag == false) {
                //展示幸运采集的特效
                let FAG_current = document.getElementById('FAG_current');
                FAG_current.style.backgroundColor = '#FFEB3B'; //进度条切换成黄色
                let ch = get_random_text('luck_FAG_tip_text'); //随机获取一条幸运采集提示文本
                start_magic_animation('FAG_show_tip_text', ch); //加载提示文本动画
                //提示文本颜色变成黄色
                let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
                FAG_show_tip_text.style.color = '#FF9800';

                this.luck_FAG_one_run_flag = true;
            }
        } else if (this.now_FAG_status == FAG_status.DANGER_FAG) {
            //处于涉险采集状态
            if (this.danger_FAG_start_flag == false) {
                //展示涉险采集的特效
                let FAG_current = document.getElementById('FAG_current');
                FAG_current.style.backgroundColor = '#F44336'; //进度条切换成红色
                let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
                FAG_show_tip_text.style.color = '#F44336';
                let ch = get_random_text('danger_FAG_start_tip_text');
                start_magic_animation('FAG_show_tip_text', ch);
                this.danger_FAG_start_flag = true;
            }
        } else if (this.now_FAG_status == FAG_status.DANGER_FAG_END) {
            //处于涉险采集状态
            if (this.danger_FAG_end_flag == false) {
                //展示涉险采集的特效
                let FAG_current = document.getElementById('FAG_current');
                FAG_current.style.backgroundColor = '#F44336'; //进度条切换成红色
                let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
                FAG_show_tip_text.style.color = '#F44336';
                //根据涉险采集的结束原因，切换
                let ch;
                let reason_text_id = 'danger_FAG_' + this.danger_FAG_end_reason + '_end_tip_text';
                if (is_Empty_Object(texts[reason_text_id])) {
                    console.log('结束原因为%s，没有定义对应的提示文本');
                    ch = '涉险采集结束，未定义提示文本';
                } else {
                    ch = get_random_text(reason_text_id);
                }
                start_magic_animation('FAG_show_tip_text', ch);
                this.danger_FAG_end_flag = true;
            }
        }

        //实时更新进度条
        let FAG_bar = document.getElementById('FAG_bar');
        let now_attack_ratio = this.get_foraging_ratio();
        if (FAG_bar.dataset.attack_ratio != now_attack_ratio) {
            FAG_bar.children[0].children[0].style.width = now_attack_ratio;
            FAG_bar.dataset.attack_ratio = now_attack_ratio;
        }
    }
    //重置一轮采集的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.now_time = global.get_game_now_time();
        this.round_start_time = this.now_time;
        this.now_round_time = 0;
        this.danger_FAG_speed_num = 0;
        this.danger_FAG_now_danger = 0;
        this.danger_FAG_continuous_danger_arr = new Array();
        this.true_FAG_speed = get_true_FAG_speed(this.player_end_attr, this.danger_FAG_speed_num);

        this.last_try_luck_FAG_time = this.now_time;
        this.last_try_danger_FAG_time = this.now_time;
        this.now_round_max_time = this.true_FAG_interval * 1000;

        //重置玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');
        let now_attack_ratio = this.get_foraging_ratio();
        if (FAG_bar.dataset.attack_ratio != now_attack_ratio) {
            FAG_bar.children[0].children[0].style.width = now_attack_ratio;
            FAG_bar.dataset.attack_ratio = now_attack_ratio;
        }
    }
    // 停止采集状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是采集，不处理
        if (now_GS != 'foraging') {
            return;
        }
        //停止采集
        global.set_flag('GS_game_statu', 'NULL');
        this.now_FAG_status = FAG_status.NO_FAG;
        //重置按钮
        const FAG_S_button = document.getElementById('FAG_S_button');
        const FAG_E_button = document.getElementById('FAG_E_button');
        FAG_S_button.style.display = '';
        FAG_E_button.style.display = 'none';
        //重置进度条
        let FAG_bar = document.getElementById('FAG_bar');
        FAG_bar.children[0].children[0].style.width = '0%';
        FAG_bar.dataset.attack_ratio = '0%';
        //进度条切换回正常颜色
        let FAG_current = document.getElementById('FAG_current');
        FAG_current.style.backgroundColor = 'rgb(16, 118, 201)';
        //清空提示文本
        let FAG_show_tip_text = document.getElementById('FAG_show_tip_text');
        FAG_show_tip_text.innerHTML = '';
        FAG_show_tip_text.style.color = '';
    }
    //更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
        //更新采集时的玩家参数
        //采集力
        this.true_FAG_attack = get_true_FAG_attack(this.player_end_attr);
        //采集间隔
        this.true_FAG_interval = get_true_FAG_interval(this.player_end_attr);
        //采集速度
        this.true_FAG_speed = get_true_FAG_speed(this.player_end_attr, this.danger_FAG_speed_num);
        //幸运采集概率
        this.true_FAG_luck_chance = get_true_FAG_luck_chance(this.player_end_attr);
        //涉险采集概率
        this.true_FAG_danger_chance = get_true_FAG_danger_chance(this.player_end_attr);

        //采集力更新，当前地点的采集概率更新
        this.updata_FAG_chance_show();
    }
    //判断当前是否处于采集的休息状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {
        if (this.now_FAG_status == FAG_status.REST_FAG) {
            return true;
        } else {
            return false;
        }
    }

    //按下了“开始采集”按钮，这里初始化采集参数
    player_start_foraging() {
        //采集状态切换到正常采集
        this.now_FAG_status = FAG_status.NORMAL_FAG;
        //缓存时间
        this.last_start_time = global.get_game_now_time();
        //写日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('live_skill_run', 'start', 'foraging');
    }
    //调整采集系统的一些设置参数
    set_FAG_option(id, value) {
        if (this[id] == undefined) {
            console.log('设置采集系统的参数%s时异常，不存在这个参数', id);
            return;
        }
        this[id] = value;
    }
    //更新正常采集状态的数值
    updata_normal_FAG_data() {
        let last_time = this.now_time - this.last_start_time;

        //消耗精力
        let FAG_energy = places[this.now_place].FAG_energy;
        let need_energy = (last_time / 1000) * FAG_energy;
        let P_attr = player.get_player_attributes();
        P_attr.use_energy_point(need_energy);

        //正常推进回合时间
        this.updata_FAG_round_time();

        //判断当前能否进入幸运采集状态
        if (this.judge_goto_luck_FAG()) {
            //已经进入幸运采集状态，正常采集中止
            return;
        }
        //判断当前能否进入涉险采集状态
        if (this.judge_goto_danger_FAG()) {
            //已经进入涉险采集状态，正常采集中止
            return;
        }

        if (this.now_round_time < this.now_round_max_time) {
            //当前没有跑完攻速，不做处理
            return;
        }

        //到时候了，进行一次采集行动
        this.get_normal_FAG_item();

        //正常采集结束，切换到下一个采集状态
        this.judge_goto_next_FAG_status();
        //采集完毕，重置回合
        this.reset_round();
    }
    //更新休息状态的数值
    updata_rest_FAG_data() {
        let P_attr = player.get_player_attributes();
        if (!P_attr.judge_surface_energy_max()) {
            return;
        }
        //精力回满时，切换到其他状态
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio >= 25) {
            //精力充足，切换到正常采集，进入下一个循环
            this.next_FAG_status = FAG_status.NORMAL_FAG;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'foraging');
        } else if (surface_energy_ratio < 25) {
            //精力不足，不能采集，停止
            this.stop_game_statu();
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'max_energy_2', 'foraging');
        }
    }
    //更新幸运采集状态的数值
    updata_luck_FAG_data() {
        //仅执行一次
        if (this.luck_FAG_one_run_flag == false) {
            //进入幸运采集时无条件进行一次幸运采集行动
            this.get_luck_FAG_item();
            //写日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('foraging', this.now_FAG_status);
        }

        if (this.now_time - this.luck_FAG_start_time < 2000) {
            //幸运采集阶段2秒不操作
            return;
        }
        //幸运采集结束，切换到下一个状态
        this.judge_goto_next_FAG_status();
        this.reset_round();
    }
    //更新涉险采集状态正常运行阶段的数值
    updata_danger_FAG_start_data() {
        if (this.danger_FAG_start_flag == false) {
            //仅执行一次
            //获取涉险采集状态下的采集速度加成
            this.danger_FAG_speed_num = get_danger_FAG_speed_num(this.now_round_max_time, this.now_round_time, this.true_FAG_speed);
            //更新采集速度
            this.true_FAG_speed = get_true_FAG_speed(this.player_end_attr, this.danger_FAG_speed_num);
            //获取这次涉险采集的危险数量
            this.danger_FAG_MAX_danger = get_random(1, 5);
            //清空持续型危险记录
            this.danger_FAG_continuous_danger_obj = new Object(); //涉险采集状态当前触发的持续性危险记录
            //写日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('foraging', this.now_FAG_status, 'start');
        }

        if (this.now_time - this.danger_FAG_start_time < 2000) {
            //进入涉险采集阶段2秒不操作
            return;
        }
        //正常推进
        //2秒后正常推进回合时间
        let last_time = this.now_time - this.last_start_time;
        this.updata_FAG_round_time();
        //消耗精力
        let FAG_energy = places[this.now_place].FAG_energy;
        let need_energy = (last_time / 1000) * FAG_energy;
        let P_attr = player.get_player_attributes();
        if (!P_attr.use_energy_point(need_energy)) {
            //如果精力不足，将被迫结束涉险采集
            this.next_FAG_status = FAG_status.DANGER_FAG_END;
            this.danger_FAG_end_time = this.now_time;
            this.danger_FAG_end_reason = 'process_no_energy';
        }

        //判断是否触发危险
        if (this.judge_danger_FAG_get_danger()) {
            this.danger_FAG_get_danger(); //随机选择危险
        }
        //生效一帧持续型的危险
        this.continuous_foraging_danger();

        if (this.now_round_time < this.now_round_max_time) {
            //当前没有跑完攻速，不做额外处理
            return;
        }
        //到时候了，获得涉险采集的奖励
        this.get_danger_FAG_item();

        //涉险采集完成，进入涉险采集结束阶段
        this.next_FAG_status = FAG_status.DANGER_FAG_END;
        this.danger_FAG_end_time = this.now_time;
        this.danger_FAG_end_reason = 'finish';
    }
    //更新涉险采集状态结束阶段的数值
    updata_danger_FAG_end_data() {
        //仅执行一次
        if (this.danger_FAG_end_flag == false) {
            //写日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('foraging', this.now_FAG_status, this.danger_FAG_end_reason);
        }

        //在流水账里提示原因

        if (this.now_time - this.danger_FAG_end_time < 2000) {
            //要离开涉险采集阶段首先2秒不操作
            return;
        }
        //2秒后退出涉险采集
        this.judge_goto_next_FAG_status();
        this.reset_round();
    }

    //获取采集攻击进度比例
    get_foraging_ratio() {
        return (this.now_round_time / this.now_round_max_time) * 100 + '%';
    }
    //获取当前地点最大采集概率
    get_max_FAG_chance() {
        //地点中的最大采集概率等于当前地点可采集物品种数开平方根，向上取整，乘100%
        //比如某地有5种可采集物品，开平方根为2.23，向上取整为3，乘100为300%，最终具体数值为300%
        //表现为这个地点一次采集最多获得三个物品
        let max_FAG_chance = this.FAG_place_items_show[this.now_place].num; //当前地点可采集物品种数
        max_FAG_chance = Math.sqrt(max_FAG_chance); //开平方根
        max_FAG_chance = Math.ceil(max_FAG_chance); //向上取整
        max_FAG_chance = max_FAG_chance * 100; //乘100%
        return max_FAG_chance;
    }
    //进行正常采集获得物品的操作
    get_normal_FAG_item() {
        //获取这次采集应该掉落几次物品
        let FAG_drop_times = this.get_FAG_drop_times();
        if (FAG_drop_times <= 0) {
            //采集力较低，这次采集没有掉落物品
            return;
        }
        //采集成功，获得采集物品
        let drop_items = this.get_foraging_item(FAG_drop_times);
        for (let key in drop_items) {
            let id = drop_items[key].id;
            let num = drop_items[key].num;
            let equip_rarity = drop_items[key].equip_rarity;
            player.Player_get_item(id, num, equip_rarity);
        }
        //记录采集行为，用于结算采集技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        let foraging_behavior = new Object();
        foraging_behavior.FAG_get_item_num = Object.keys(drop_items).length;
        foraging_behavior.FAG_get_rare_item_num = get_FAG_get_rare_item_num(this.now_place, drop_items);
        global_flag_manage.record_foraging_behavior(foraging_behavior);
        //将掉落物更新到可采集列表中
        let ret = this.updata_foraging_place_show_drop(drop_items);
        if (ret == true) {
            //更新到游戏界面上
            this.show_foraging_drop_item_table();
        }
    }
    //进行幸运采集获得物品的操作
    get_luck_FAG_item() {
        //获取这次采集应该掉落几次物品
        let FAG_drop_times = this.get_FAG_drop_times();
        if (FAG_drop_times <= 0) {
            //触发幸运采集时必定成功获得物品，最少都要有一个
            FAG_drop_times = 1;
        }
        //采集成功，获得采集物品
        let drop_items = this.get_foraging_item(FAG_drop_times);
        for (let key in drop_items) {
            let id = drop_items[key].id;
            let num = drop_items[key].num;
            let equip_rarity = drop_items[key].equip_rarity;
            player.Player_get_item(id, num, equip_rarity);
        }
        //记录采集行为，用于结算采集技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        let foraging_behavior = new Object();
        foraging_behavior.FAG_get_item_num = Object.keys(drop_items).length;
        foraging_behavior.FAG_get_rare_item_num = get_FAG_get_rare_item_num(this.now_place, drop_items);
        global_flag_manage.record_foraging_behavior(foraging_behavior);
        //将掉落物更新到可采集列表中
        let ret = this.updata_foraging_place_show_drop(drop_items);
        if (ret == true) {
            //更新到游戏界面上
            this.show_foraging_drop_item_table();
        }
    }
    //进行涉险采集获得物品的操作
    get_danger_FAG_item() {
        //涉险采集至少获得一个物品
        let FAG_drop_times = 1;
        //获取当前地点经过属性加成后的可采集物品列表
        let FAG_item = get_true_FAG_item(this.now_place, this.player_end_attr);
        //从可采集物品中筛选稀有物品
        let rare_item = get_place_rare_item(FAG_item);
        if (is_Empty_Object(rare_item)) {
            console.log('当前地点%s采集物品中没有稀有物品，却进入了涉险采集状态，异常', this.now_place);
            return;
        }
        //进行FAG_drop_times次掉落
        let drop_item_arry = new Array();
        let random_manage = global.get_random_manage(); //随机数管理类
        for (let i = 0; i < FAG_drop_times; i++) {
            let item_key = random_manage.chance_random_get_id(rare_item);
            let data_obj = rare_item[item_key];
            let item_obj = new Object();
            item_obj.id = data_obj.id;
            item_obj.num = 1;
            if (items[data_obj.id].main_type.includes('equipment')) {
                //如果掉落的是装备，还需要记录稀有度
                item_obj.equip_rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
            }
            drop_item_arry.push(item_obj);
        }
        //对掉落物去重并进行合并
        let uniqueArr = new Object();
        for (let item_obj of drop_item_arry) {
            let item_key = get_item_id_key(item_obj);
            if (is_Empty_Object(uniqueArr[item_key])) {
                uniqueArr[item_key] = item_obj;
            } else {
                uniqueArr[item_key].num += item_obj.num;
            }
        }
        //玩家获得掉落物
        for (let key in uniqueArr) {
            let id = uniqueArr[key].id;
            let num = uniqueArr[key].num;
            let equip_rarity = uniqueArr[key].equip_rarity;
            player.Player_get_item(id, num, equip_rarity);
        }
        //记录采集行为，用于结算采集技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        let foraging_behavior = new Object();
        foraging_behavior.FAG_get_item_num = Object.keys(uniqueArr).length;
        foraging_behavior.FAG_get_rare_item_num = get_FAG_get_rare_item_num(this.now_place, uniqueArr);
        global_flag_manage.record_foraging_behavior(foraging_behavior);

        //将掉落物更新到可采集列表中
        let ret = this.updata_foraging_place_show_drop(uniqueArr);
        if (ret == true) {
            //更新到游戏界面上
            this.show_foraging_drop_item_table();
        }
    }
    //获取采集概率
    get_FAG_chance() {
        if (is_Empty_Object(places[this.now_place].FAG_defense)) {
            console.log('%s地点未定义采集防御');
            return 0;
        }
        let FAG_danger = this.true_FAG_attack; //玩家采集力
        let FAG_defense = places[this.now_place].FAG_defense; //地点采集防御力

        let FAG_chance = parseInt((FAG_danger / FAG_defense) * 100);
        let max_FAG_chance = this.get_max_FAG_chance();
        let min_FAG_chance = 5;
        if (FAG_chance >= max_FAG_chance) {
            return max_FAG_chance;
        } else if (FAG_chance > min_FAG_chance && FAG_chance < max_FAG_chance) {
            return FAG_chance;
        } else if (FAG_chance <= min_FAG_chance) {
            return min_FAG_chance;
        }
    }
    //获取当前采集应该掉落几次物品
    get_FAG_drop_times() {
        let FAG_chance = this.get_FAG_chance();
        let drop_times = parseInt(FAG_chance / 100);

        let end_chance = FAG_chance % 100;
        let random_manage = global.get_random_manage(); //随机数管理类
        if (random_manage.try_number_random(end_chance)) {
            drop_times += 1;
        }
        return drop_times;
    }
    //从当前地点随机获得采集物品
    get_foraging_item(drop_times) {
        //获取当前地点经过属性加成后的可采集物品列表
        let FAG_item = get_true_FAG_item(this.now_place, this.player_end_attr);

        let random_manage = global.get_random_manage(); //随机数管理类
        //常规尝试drop_times次掉落
        let drop_item_arry = new Array();
        let rare_no_cumulative_num = 0; //稀有掉落但没有积累的次数
        for (let i = 0; i < drop_times; i++) {
            //随机获得一个物品id
            let item_key = random_manage.chance_random_get_id(FAG_item, 'FAG_DROP', this.now_place);
            let data_obj = FAG_item[item_key];
            //如果随机到的物品是稀有物品，需要判断该物品在当前地点是否有积累
            if (is_Empty_Object(FAG_item[item_key].rare_flag)) {
                console.log('%s地点设定的%s采集对象没有定义稀有标记', this.now_place, item_key);
                return false;
            }
            if (data_obj.rare_flag) {
                if (this.FAG_place_rare_items[this.now_place][item_key].cumulative_num <= 0) {
                    //如果该稀有物品没有积累，本次掉落作废，之后进行一次普通物品的掉落
                    rare_no_cumulative_num++;
                    continue;
                } else {
                    this.FAG_place_rare_items[this.now_place][item_key].cumulative_num--;
                }
            }

            //记录正常掉落物品的其他参数
            let item_obj = new Object();
            item_obj.id = data_obj.id;
            item_obj.num = get_true_drop_item_num(this.player_end_attr);
            if (items[data_obj.id].main_type.includes('equipment')) {
                //如果掉落的是装备，还需要记录稀有度
                item_obj.equip_rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
            }
            drop_item_arry.push(item_obj);
        }

        //补充rare_no_cumulative_num次非稀有物品掉落
        let norare_item = get_place_norare_item(FAG_item);
        for (let i = 0; i < rare_no_cumulative_num; i++) {
            let item_key = random_manage.chance_random_get_id_norare(norare_item);
            let data_obj = norare_item[item_key];
            let item_obj = new Object();
            item_obj.id = data_obj.id;
            item_obj.num = get_true_drop_item_num(this.player_end_attr);
            if (items[data_obj.id].main_type.includes('equipment')) {
                //如果掉落的是装备，还需要记录稀有度
                item_obj.equip_rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
            }
            drop_item_arry.push(item_obj);
        }

        //对掉落物去重并进行合并
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

    // 随机选择当前所在区域的一个危险并触发
    danger_FAG_get_danger() {
        let place_manage = global.get_place_manage();
        let area_id = place_manage.get_now_area();
        if (is_Empty_Object(areas[area_id].foraging_danger)) {
            console.log('当前地点没有定义危险');
            return;
        }
        let foraging_danger = areas[area_id].foraging_danger;
        let random = get_random(0, foraging_danger.length - 1);
        let random_danger = JSON.parse(JSON.stringify(foraging_danger[random]));
        if (random_danger.danger_type == 'start') {
            //即刻生效的危险
            this.start_foraging_danger(random_danger);
        } else if (random_danger.danger_type == 'continuous') {
            //持续生效的危险
            //先判断当前已激活的危险库里有没有效果相同的危险
            if (this.judge_have_continuous_danger(random_danger)) {
                //当前已激活了这个危险，不重复激活
                return;
            }
            this.get_continuous_foraging_danger(random_danger);
        } else {
            console.log('随机到的危险类型未知，异常情况');
        }
    }
    //触发一个即刻生效的危险
    start_foraging_danger(danger_obj) {
        let data_value;
        if (is_Empty_Object(danger_obj.data_value)) {
            //这个危险没有指定内容，从最大值和最小值之间随机一个数
            data_value = get_random(danger_obj.min_data, danger_obj.max_data);
        } else {
            //这个危险指定了内容，直接使用
            data_value = danger_obj.data_value;
        }

        let end_flag;
        let data_type = danger_obj.data_type;
        if (data_type == 'use_health_point') {
            //消耗生命
            let P_attr = player.get_player_attributes();
            P_attr.change_data_attr('health_point', data_value);
            end_flag = true;
        } else if (data_type == 'use_magic_point') {
            //消耗魔力
            let P_attr = player.get_player_attributes();
            P_attr.change_data_attr('magic_point', data_value);
            end_flag = true;
        } else if (data_type == 'use_energy_point') {
            //消耗精力
            let P_attr = player.get_player_attributes();
            end_flag = P_attr.use_energy_point(data_value);
        }
        //写日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('foraging', this.now_FAG_status, 'start_danger', data_type, data_value);
        if (!end_flag) {
            //当前危险触发后生效失败，说明此时的涉险采集太困难了，停止涉险采集
            this.danger_FAG_end_reason = 'process_danger';
            this.next_FAG_status = FAG_status.DANGER_FAG_END;
            this.danger_FAG_end_time = this.now_time;
        }
    }
    //记录当前触发了一个持续型危险
    get_continuous_foraging_danger(danger_obj) {
        //获取危险的数值
        let data_value;
        if (is_Empty_Object(danger_obj.data_value)) {
            //这个危险没有指定内容，从最大值和最小值之间随机一个数
            data_value = get_random(danger_obj.min_data, danger_obj.max_data);
        } else {
            //这个危险指定了内容，直接使用
            data_value = danger_obj.data_value;
        }
        //获取危险的持续时间
        let continuous_time;
        if (is_Empty_Object(danger_obj.data_time)) {
            //这个危险没有指定内容，从最大值和最小值之间随机一个数
            continuous_time = get_random(danger_obj.min_time, danger_obj.max_time);
        } else {
            //这个危险指定了内容，直接使用
            continuous_time = danger_obj.data_time;
        }
        //记录危险参数
        let obj = new Object();
        obj.data_type = danger_obj.data_type;
        obj.data_value = data_value;
        obj.continuous_time = continuous_time * 1000;
        obj.start_time = this.now_time;
        obj.last_start_time = this.now_time;
        obj.continuous_end = false;
        this.danger_FAG_continuous_danger_obj[danger_obj.data_type] = obj;
        //写日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('foraging', this.now_FAG_status, 'continuous_danger', danger_obj.data_type);
    }
    //触发当前还生效的持续型危险
    continuous_foraging_danger() {
        for (let data_type in this.danger_FAG_continuous_danger_obj) {
            let conditions_danger = this.danger_FAG_continuous_danger_obj[data_type];
            //如果持续标记已经设置过了，说明危险已经到了规定的持续时间，之后不能再触发了
            if (conditions_danger.continuous_end == true) {
                continue;
            }
            //一帧的时间
            let last_time = this.now_time - conditions_danger.last_start_time;
            //一帧内生效的数值
            let data_value = conditions_danger.data_value * (last_time / 1000);

            let end_flag = false;
            if (data_type == 'use_health_point') {
                //消耗生命
                let P_attr = player.get_player_attributes();
                P_attr.change_data_attr('health_point', data_value);
                end_flag = true;
            } else if (data_type == 'use_magic_point') {
                //消耗魔力
                let P_attr = player.get_player_attributes();
                P_attr.change_data_attr('magic_point', data_value);
                end_flag = true;
            } else if (data_type == 'use_energy_point') {
                //消耗精力
                let P_attr = player.get_player_attributes();
                end_flag = P_attr.use_energy_point(data_value);
            }
            if (!end_flag) {
                //当前危险触发后生效失败，说明此时的涉险采集太困难了，停止涉险采集
                this.danger_FAG_end_reason = 'process_danger';
                this.next_FAG_status = FAG_status.DANGER_FAG_END;
                this.danger_FAG_end_time = this.now_time;
                return;
            }

            //更新危险触发一帧后的数值
            conditions_danger.last_start_time = this.now_time;
            if (this.now_time - conditions_danger.start_time >= conditions_danger.continuous_time) {
                conditions_danger.continuous_end = true;
            }
        }
    }

    //更新当前地点的稀有对象积累情况
    updata_foraging_place_rare_item() {
        let FAG_items = places[this.now_place].FAG_item;
        if (is_Empty_Object(this.FAG_place_rare_items[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let item_key in FAG_items) {
                //不稀有的对象不需要记录缓存
                if (!FAG_items[item_key].rare_flag) continue;

                //
                obj[item_key] = new Object();
                obj[item_key].cumulative_num = FAG_items[item_key].max_cumulative_num;
                obj[item_key].last_cumulative_time = this.now_time;
            }
            this.FAG_place_rare_items[this.now_place] = obj;
        } else {
            let obj = this.FAG_place_rare_items[this.now_place];
            //当前地点已有缓存，更新一遍
            for (let item_key in obj) {
                if (obj[item_key].cumulative_num >= FAG_items[item_key].max_cumulative_num) {
                    //该对象堆积数量已经满了，更新时间
                    obj[item_key].last_cumulative_time = this.now_time;
                } else {
                    //这对象没积累满，检查是否到了积累时间
                    let cumulative_time = (this.now_time - obj[item_key].last_cumulative_time) / 1000;
                    if (cumulative_time >= FAG_items[item_key].cumulative_time) {
                        obj[item_key].cumulative_num++;
                        obj[item_key].last_cumulative_time = this.now_time;
                    }
                }
            }
        }
    }
    //更新当前帧推进时间进度条
    updata_FAG_round_time() {
        let last_time = this.now_time - this.last_start_time;
        if (this.true_FAG_speed >= 0) {
            last_time = last_time * ((100 + this.true_FAG_speed) * 0.01);
        } else {
            last_time = last_time / ((100 - this.true_FAG_speed) * 0.01);
        }
        this.now_round_time += last_time;
    }
    //刷新当前地点展示的可采集物品列表
    show_foraging_drop_item_table() {
        //清空现有展示的内容
        let FAG_no_show_value_div = document.getElementById('FAG_no_show_value_div');
        FAG_no_show_value_div.innerHTML = '';
        let FAG_have_show_value_div = document.getElementById('FAG_have_show_value_div');
        FAG_have_show_value_div.replaceChildren();
        //获取可展示物品个数
        let can_show_num = 0;
        let all_num = this.FAG_place_items_show[this.now_place].num;
        for (let item_key in this.FAG_place_items_show[this.now_place].show_flag) {
            if (this.FAG_place_items_show[this.now_place].show_flag[item_key]) {
                can_show_num++;
            }
        }
        if (can_show_num == 0 && all_num == 0) {
            //当前地点没有可展示的采集物品，应该属于不可采集的地点，显示相应的信息
            FAG_no_show_value_div.innerHTML = '无';
        } else if (can_show_num != 0 && all_num == 0) {
            //不应出现的错误情况
            console.log('异常：地点%s，没有可采集物品，但却有可展示的采集物', this.now_place);
        } else if (can_show_num == 0 && all_num != 0) {
            //地点里有可采集物，但没有需要展示的物品，仅显示提示信息
            FAG_no_show_value_div.innerHTML = '未知物品';
        } else if (can_show_num != 0 && all_num != 0) {
            //地点里有可采集物，也有需要展示的物品
            for (let item_key in this.FAG_place_items_show[this.now_place].show_flag) {
                if (this.FAG_place_items_show[this.now_place].show_flag[item_key] == false) {
                    continue;
                }
                let FAG_drop_value = addElement(FAG_have_show_value_div, 'div', null, 'FAG_drop_value');
                let id = item_key.split(':')[0];
                if (items[id].main_type.includes('equipment')) {
                    //如果掉落的是装备，改变字体颜色变成稀有度的颜色
                    FAG_drop_value.style.color = hex2Rgba(enums[equip_rarity].rarity_color, alpha);
                }
                FAG_drop_value.innerHTML = items[id].name;
            }
            if (can_show_num < all_num) {
                //当前地点里还有玩家没发现的可采集物，显示提示信息
                let FAG_drop_value = addElement(FAG_have_show_value_div, 'div', null, 'FAG_drop_value');
                FAG_drop_value.innerHTML = '未知物品';
            }
        }
    }
    //初始化当前地点可采集物品列表
    init_foraging_place_show_drop() {
        //当前地点可采集物品已经初始化过，不需要重复初始化
        if (!is_Empty_Object(this.FAG_place_items_show[this.now_place])) {
            return;
        }
        this.FAG_place_items_show[this.now_place] = new Object();

        let FAG_items = places[this.now_place].FAG_item;
        let obj = new Object();
        let num = 0;
        for (let id in FAG_items) {
            obj[id] = false;
            num++;
        }
        this.FAG_place_items_show[this.now_place].show_flag = obj;
        this.FAG_place_items_show[this.now_place].num = num;
    }
    //更新当前地点可采集物品列表
    updata_foraging_place_show_drop(drop_items) {
        let updata_flag = false;
        for (let key in drop_items) {
            let id = drop_items[key].id;
            if (this.FAG_place_items_show[this.now_place].show_flag[key] == false) {
                this.FAG_place_items_show[this.now_place].show_flag[key] = true;
                updata_flag = true;
            }
        }
        return updata_flag;
    }
    //更新游戏界面上的采集概率展示
    updata_FAG_chance_show() {
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        if (EC_div.style.display != '') {
            //当前不处于搜索采集窗口内，不需要更新
            return;
        }
        let EC_skill;
        let radios = document.querySelectorAll('input[name="EC_switch"]');
        // 找到当前激活的生活技能
        for (const radio of radios) {
            if (radio.checked) {
                EC_skill = radio.value;
                break;
            }
        }
        EC_skill = EC_skill.substring(0, 3);
        if (EC_skill != 'FAG') {
            //当前展示的窗口不是采集，不需要更新
            return;
        }

        let FAG_chance = this.get_FAG_chance();
        let max_FAG_chance = this.get_max_FAG_chance();

        let ch = '采集概率：' + FAG_chance + '%';
        if (FAG_chance == max_FAG_chance) {
            ch += '(MAX)';
        }
        let FAG_show_chance_div = document.getElementById('FAG_show_chance_div');
        FAG_show_chance_div.innerHTML = ch;
    }

    //一个采集状态结束了，判断当前需要进入的下一个采集状态
    judge_goto_next_FAG_status() {
        //采集完毕后如果精力不足，进入休息状态
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio >= 25 && surface_energy_ratio < 50) {
            this.next_FAG_status = FAG_status.REST_FAG;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_1', 'foraging');
        } else if (surface_energy_ratio < 25) {
            this.next_FAG_status = FAG_status.REST_FAG;
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_2', 'foraging');
        } else if (surface_energy_ratio >= 50) {
            //精力充足，进入正常采集
            this.next_FAG_status = FAG_status.NORMAL_FAG;
        }
    }
    //判断当前是否可以进入幸运采集
    judge_goto_luck_FAG() {
        //没有开启幸运采集逻辑，不处理
        if (!this.luck_FAG_flag) {
            return false;
        }
        //每秒触发一次，时间没到不处理
        if (this.now_time - this.last_try_luck_FAG_time < 1000) {
            return false;
        }
        this.last_try_luck_FAG_time = this.now_time;
        //判定一次幸运采集概率
        let random_manage = global.get_random_manage(); //随机数管理类
        if (!random_manage.try_number_random(this.true_FAG_luck_chance)) {
            return false; //失败
        }
        //成功，进入幸运采集状态
        this.next_FAG_status = FAG_status.LUCK_FAG;
        this.luck_FAG_one_run_flag = false;
        this.luck_FAG_start_time = this.now_time;
        return true;
    }
    //判断当前是否可以进入涉险采集状态
    judge_goto_danger_FAG() {
        //没有开启涉险采集逻辑，不处理
        if (!this.danger_FAG_flag) {
            return false;
        }
        //每秒触发一次，时间没到不处理
        if (this.now_time - this.last_try_danger_FAG_time < 1000) {
            return false;
        }
        this.last_try_danger_FAG_time = this.now_time;
        //采集进度已经到了50%以上时不处理
        let now_attack_ratio = (this.now_round_time / this.now_round_max_time) * 100;
        if (now_attack_ratio > 50) {
            return false;
        }
        //判定一次涉险采集概率
        let random_manage = global.get_random_manage(); //随机数管理类
        if (!random_manage.try_number_random(this.true_FAG_danger_chance)) {
            return false; //失败
        }
        //到这里就可以进入涉险采集状态
        //当前地点可采集物品中没有稀有物品，即刻退出
        let FAG_item = get_true_FAG_item(this.now_place, this.player_end_attr);
        let rare_item = get_place_rare_item(FAG_item);
        if (is_Empty_Object(rare_item)) {
            this.danger_FAG_end_reason = 'start_no_rare';
            this.next_FAG_status = FAG_status.DANGER_FAG_END;
            this.danger_FAG_end_time = this.now_time;
            return true;
        }

        //精力低于50%，处于疲劳状态，即刻退出
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (surface_energy_ratio < 50) {
            //中止涉险采集
            this.danger_FAG_end_reason = 'start_no_energy';
            this.next_FAG_status = FAG_status.DANGER_FAG_END;
            this.danger_FAG_end_time = this.now_time;
            return true;
        }
        //血量处于重伤状态，即刻退出

        //进入正常的涉险采集状态
        this.next_FAG_status = FAG_status.DANGER_FAG;
        this.danger_FAG_start_time = this.now_time;
        return true;
    }
    //判断当前能否触发一个危险
    judge_danger_FAG_get_danger() {
        //当前涉险采集触发的危险数量已经达到上限
        if (this.danger_FAG_now_danger >= this.danger_FAG_MAX_danger) {
            return false;
        }
        if (this.now_time - this.last_try_danger_FAG_time < 500) {
            //每0.5秒尝试一次
            return false;
        }
        this.last_try_danger_FAG_time = this.now_time;
        //每次25%概率触发
        let random_manage = global.get_random_manage(); //随机数管理类
        if (random_manage.try_number_random(25)) {
            this.danger_FAG_now_danger++;
            return true;
        }
        return false;
    }
    //判断当前是否已经触发了指定的危险
    judge_have_continuous_danger(danger) {
        for (let data_type in this.danger_FAG_continuous_danger_obj) {
            if (data_type == danger.data_type) {
                return true;
            }
        }
        return false;
    }
}
//获取最终采集力
function get_true_FAG_attack(player_end_attr) {
    //基础采集力
    let FAG_attack = player_end_attr['FAG_attack'];

    //获取所有直接乘算增幅
    let danger_add = 0;
    //武器类型伤害增幅
    for (let weapon_type of player_end_attr['weapon_type']) {
        let danger_attr_name = weapon_type + '_FAG_danger';
        if (!is_Empty_Object(player_end_attr[danger_attr_name])) {
            danger_add += player_end_attr[danger_attr_name];
        }
    }

    //获取所有最终乘算增幅
    let end_FAG_attack = player_end_attr['end_FAG_attack'];

    let true_FAG_attack = calculate_num_attr(FAG_attack, 0, danger_add, 0, end_FAG_attack);
    return true_FAG_attack;
}
//获取最终采集间隔
function get_true_FAG_interval(player_end_attr) {
    //基础采集间隔
    let FAG_interval = player_end_attr['FAG_interval'];

    //直接加算采集间隔
    let FAG_interval_num = player_end_attr['FAG_interval_num'];
    //直接乘算采集间隔
    let FAG_interval_ratio = player_end_attr['FAG_interval_ratio'];
    //最终采集攻速加成
    let end_FAG_interval_num = player_end_attr['end_FAG_interval_num'];
    //最终采集攻速加成
    let end_FAG_interval_ratio = player_end_attr['end_FAG_interval_ratio'];

    //结算采集间隔
    let true_FAG_interval = calculate_speed_attr(FAG_interval, FAG_interval_num, FAG_interval_ratio, end_FAG_interval_num, end_FAG_interval_ratio);
    return true_FAG_interval;
}
//获取最终采集速度
function get_true_FAG_speed(player_end_attr, danger_FAG_speed_num) {
    //基础采集速度
    let FAG_speed = player_end_attr['FAG_speed'];
    if (FAG_speed === undefined) {
        FAG_speed = 0;
    }
    //直接加算采集速度
    let FAG_speed_num = player_end_attr['FAG_speed_num'];
    if (FAG_speed_num === undefined) {
        FAG_speed_num = 0;
    }
    //涉险采集状态下的采集速度补正
    if (danger_FAG_speed_num === undefined) {
        danger_FAG_speed_num = 0;
    }
    FAG_speed_num += danger_FAG_speed_num;
    //武器类型的采集速度增幅
    for (let weapon_type of player_end_attr['weapon_type']) {
        let speed_attr_name = weapon_type + '_FAG_speed';
        if (!is_Empty_Object(player_end_attr[speed_attr_name])) {
            FAG_speed_num += player_end_attr[speed_attr_name];
        }
    }
    //直接乘算采集速度
    let FAG_speed_ratio = player_end_attr['FAG_speed_ratio'];
    if (FAG_speed_ratio === undefined) {
        FAG_speed_ratio = 0;
    }
    //最终加算采集速度
    let end_FAG_speed_num = player_end_attr['end_FAG_speed_num'];
    if (end_FAG_speed_num === undefined) {
        end_FAG_speed_num = 0;
    }

    //最终乘算采集速度
    let end_FAG_speed_ratio = player_end_attr['end_FAG_speed_ratio'];
    if (end_FAG_speed_ratio === undefined) {
        end_FAG_speed_ratio = 0;
    }

    //结算采集速度
    let true_FAG_speed = calculate_num_attr(FAG_speed, FAG_speed_num, FAG_speed_ratio, end_FAG_speed_num, end_FAG_speed_ratio);
    return true_FAG_speed;
}
//获取最终幸运采集概率
function get_true_FAG_luck_chance(player_end_attr) {
    //基础幸运采集概率
    let FAG_luck_chance = player_end_attr['FAG_luck_chance'];

    //结算幸运采集概率
    let true_FAG_luck_chance = calculate_num_attr(FAG_luck_chance, 0, 0, 0, 0);
    return true_FAG_luck_chance;
}
//获取最终涉险采集概率
function get_true_FAG_danger_chance(player_end_attr) {
    //基础涉险采集概率
    let FAG_danger_chance = player_end_attr['FAG_danger_chance'];

    //结算涉险采集概率
    let true_FAG_danger_chance = calculate_num_attr(FAG_danger_chance, 0, 0, 0, 0);
    return true_FAG_danger_chance;
}
//获取当前地点经过加成后的可采集物品的权重
function get_true_FAG_item(now_place, player_end_attr) {
    let FAG_item = JSON.parse(JSON.stringify(places[now_place].FAG_item));

    for (let attr_id in player_end_attr) {
        //寻找玩家属性中关于改变采集产物权重的属性

        let index = attr_id.indexOf('FAG_chance_');
        if (index != 0) {
            continue;
        }
        //获取这条属性要改变的产物类型
        let type_switch = FAG_chance_type_handle(attr_id);
        for (let item_key in FAG_item) {
            let id = FAG_item[item_key].id;
            if (!is_overlap(type_switch, items[id].secon_type)) {
                continue;
            }
            //指定产物类型和物品小类有重叠，在权重上得到属性加成
            let attr_data = player_end_attr[attr_id];
            if (attr_data >= 0) {
                FAG_item[item_key].chance = FAG_item[item_key].chance * (100 + attr_data) * 0.01;
            } else {
                FAG_item[item_key].chance = FAG_item[item_key].chance * (100 / (100 - attr_data));
            }
        }
    }
    return FAG_item;
}
//获取一次掉落的物品数量
function get_true_drop_item_num(player_end_attr) {
    //采集每次成功掉落时初始数量为1
    let num = 1;

    //结算掉落时数量+1的效果
    let FAG_item_add_1_chance = player_end_attr['FAG_item_add_1_chance'];
    if (FAG_item_add_1_chance == undefined) {
        FAG_item_add_1_chance = 0;
    }
    //进行保底数值随机
    let random_manage = global.get_random_manage(); //随机数管理类
    if (random_manage.try_number_random(FAG_item_add_1_chance)) {
        num += 1;
    }

    return num;
}
//将改变采集产物权重的属性名转义成需要处理的子类集合
function FAG_chance_type_handle(attr_id) {
    let type_switch = [];
    const prefix = 'FAG_chance_';
    let FAG_chance_type = attr_id.slice(prefix.length);
    if (enums.Item_secon_type.includes(FAG_chance_type)) {
        //属性针对某个具体的小类
        type_switch.push(FAG_chance_type);
    } else {
        //属性针对的是几种小类
        if (is_Empty_Object(enums[attr_id])) {
            console.log('%s属性没有在枚举库中定义', attr_id);
            return type_switch;
        }
        type_switch = enums[attr_id];
    }
    return type_switch;
}
//获取涉险采集状态下的采集速度
function get_danger_FAG_speed_num(now_round_max_time, now_round_time, true_FAG_speed) {
    let target_time = get_random(5, 10); //要达到的目标采集时间
    let theory_time = (now_round_max_time - now_round_time) / 1000; //当前回合剩余时间
    let danger_FAG_speed_num = 0;
    for (let i = 0; i < 10; i++) {
        danger_FAG_speed_num += -50;
        let end_theory_time;
        let theory_speed = true_FAG_speed + danger_FAG_speed_num;
        if (theory_speed >= 0) {
            end_theory_time = theory_time / ((100 + theory_speed) * 0.01);
        } else {
            end_theory_time = theory_time * ((100 - theory_speed) * 0.01);
        }
        if (end_theory_time >= target_time) {
            break;
        }
    }
    return danger_FAG_speed_num;
}
//获取当前地点没有稀有对象的可采集物品列表
function get_place_norare_item(FAG_item) {
    let norare_item = new Object();
    for (let item_key in FAG_item) {
        if (!FAG_item[item_key].rare_flag) {
            norare_item[item_key] = FAG_item[item_key];
        }
    }
    return norare_item;
}
//获取当前地点纯稀有对象的可采集物品列表
function get_place_rare_item(FAG_item) {
    let rare_item = new Object();
    for (let item_key in FAG_item) {
        if (FAG_item[item_key].rare_flag) {
            rare_item[item_key] = FAG_item[item_key];
        }
    }
    return rare_item;
}
//获取掉落物中稀有物品的数量
function get_FAG_get_rare_item_num(now_place, drop_tiems) {
    let FAG_item = JSON.parse(JSON.stringify(places[now_place].FAG_item));
    let rare_num = 0;
    for (let item_key in drop_tiems) {
        if (FAG_item[item_key].rare_flag) {
            rare_num += drop_tiems[item_key].num;
        }
    }
    return rare_num;
}

export {};
