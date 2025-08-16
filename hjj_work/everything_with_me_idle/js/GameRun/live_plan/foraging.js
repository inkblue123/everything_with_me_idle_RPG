import { get_random } from '../../Function/math_func.js';
import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { enemys } from '../../Data/Enemy/Enemy.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { player } from '../../Player/Player.js';
import { global } from '../global_manage.js';

//采集技能管理类
export class Foraging_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place; //当前地点

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.true_FAG_speed; //实际用于计算的采集攻速
        this.true_FAG_attack; //实际用于计算的采集攻击
        this.true_FAG_critical_chance; //实际用于计算的采集暴击率
        this.true_FAG_critical_damage; //实际用于计算的采集暴击伤害

        this.last_logger_place_data = new Object(); //曾经到过的采集地点的参数
    }
    //获取采集技能管理对象的存档
    save_foraging_manage() {
        let foraging_save = new Object();
        //获取每个子对象的存档
        //采集管理对象
        foraging_save.now_time = this.now_time;
        foraging_save.last_logger_place_data = this.last_logger_place_data;

        return foraging_save;
    }
    //加载采集技能存档
    load_Foraging_manage(foraging_save) {
        if (is_Empty_Object(foraging_save)) {
            return;
        }
        let now_time = global.get_game_now_time();
        let save_time = foraging_save.now_time;
        this.last_logger_place_data = JSON.parse(JSON.stringify(foraging_save.last_logger_place_data));

        for (let place_id in foraging_save.last_logger_place_data) {
            let save_obj = foraging_save.last_logger_place_data[place_id];
            let manage_obj = this.last_logger_place_data[place_id];

            for (let tree_id in save_obj) {
                let save_tree_last_cumulative_time = save_time - save_obj[tree_id].last_cumulative_time;
                manage_obj[tree_id].last_cumulative_time = now_time - save_tree_last_cumulative_time;
            }
        }
    }
    //更新当前地点，初始化采集信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
    }
    //地点变化时，对采集界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //地点的生活技能可用标记第3个是采集
        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
        if (places[next_place].live_plan_flag[3]) {
            //新地点可以采集，会正常调用set_new_place函数，不需要这里特殊处理
            return;
        }

        //新地点不能采集，应该把界面更新成无采集目标
        this.delete_foraging_div();
    }
    //开始采集，更新采集技能的数值
    updata_foraging_data() {
        this.now_time = global.get_game_now_time();

        //读条开始采集
        this.now_round_time = this.now_time - this.round_start_time;

        if (this.now_round_time < this.true_FAG_speed * 1000) {
            //当前没有跑完攻速，不做处理
            return;
        }
        //

        //到时候了，进行一次采集，获取采集伤害
        let FAG_damage = this.get_FAG_damage();
        if (this.try_foraging(FAG_damage)) {
            //采集成功，获得采集物品
            // this.get_foraging_item();
        }

        //记录砍了多少伤害，用于结算采集技能的经验
        // let global_flag_manage = global.get_global_flag_manage();
        // global_flag_manage.record_foraging_behavior(FAG_damage);

        //采集完毕，重置回合
        this.reset_round();
    }
    //开始采集，更新采集技能的界面
    updata_foraging_div() {
        //玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');
        let now_attack_ratio = this.get_foraging_ratio();
        if (FAG_bar.Data.attack_ratio != now_attack_ratio) {
            FAG_bar.children[0].children[0].style.width = now_attack_ratio;
            FAG_bar.Data.attack_ratio = now_attack_ratio;
        }
    }
    //获取最终采集力
    get_FAG_damage() {
        //采集的数值计算流程有5个阶段
        //计算最终面板，结算采集力增幅，玩家采集力和地点的采集防御力结算
        // 此处结算采集力增幅
        let FAG_attack = this.player_end_attr['FAG_attack'];

        let damage_add = 0;
        //武器类型伤害增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let damage_attr_name = weapon_type + '_FAG_damage';
            if (!is_Empty_Object(this.player_end_attr[damage_attr_name])) {
                damage_add += this.player_end_attr[damage_attr_name];
            }
        }
        let FAG_damage = FAG_attack * (1 + damage_add * 0.01);
        return FAG_damage;
    }
    //尝试进行一次采集
    try_foraging(FAG_damage) {
        if (is_Empty_Object(places[this.now_place].FAG_defense)) {
            console.log('%s地点未定义采集防御');
            return false;
        }
        let FAG_defense = places[this.now_place].FAG_defense;

        this.drop_times = 0;
        this.drop_times = parseInt(FAG_damage / FAG_defense);
        FAG_damage = FAG_damage % FAG_defense;
        let end_chance = (FAG_damage / FAG_defense) * 100;
        let random_manage = global.get_random_manage(); //随机数管理类
        //借用暴击机制，充当数值随机
        if (random_manage.try_critical(end_chance)) {
            this.drop_times += 1;
        }

        if (this.drop_times <= 0) {
            return false;
        } else {
            return true;
        }
    }
    //重置一轮采集的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.round_start_time = global.get_game_now_time();
        this.now_round_time = 0;

        //重置玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');

        let now_attack_ratio = this.get_foraging_ratio();
        if (FAG_bar.Data.attack_ratio != now_attack_ratio) {
            FAG_bar.children[0].children[0].style.width = now_attack_ratio;
            FAG_bar.Data.attack_ratio = now_attack_ratio;
        }
    }
    //获取采集攻击进度比例
    get_foraging_ratio() {
        return `${(this.now_round_time / (this.true_FAG_speed * 1000)) * 100}%`;
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
        //重置按钮
        const FAG_S_button = document.getElementById('FAG_S_button');
        const FAG_E_button = document.getElementById('FAG_E_button');
        FAG_S_button.style.display = '';
        FAG_E_button.style.display = 'none';
    }
    //更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
        //更新采集时的玩家参数
        //采集速度
        this.true_FAG_speed = this.player_end_attr['FAG_speed'];
        //武器类型的采集速度增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let speed_attr_name = weapon_type + '_FAG_speed';
            if (!is_Empty_Object(this.player_end_attr[speed_attr_name])) {
                this.true_FAG_speed += this.player_end_attr[speed_attr_name];
            }
        }
    }
    //清空采集界面
    delete_foraging_div() {
        //当地可能的采集掉落物
        let FAG_drop_table_value_div = document.getElementById('FAG_drop_table_value_div');
        FAG_drop_table_value_div.replaceChildren(); //清空现有展示的物品
        var drop_value = addElement(FAG_drop_table_value_div, 'div', null, 'drop_value');
        drop_value.innerHTML = '无';
        //玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');
        FAG_bar.children[0].children[0].style.width = '100%';
        FAG_bar.Data.attack_ratio = '100%';
    }
    //从当前地点随机获得采集物品
    get_foraging_item() {}
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //
    //

    //更新当前地点的缓存数据
    updata_logger_place_data() {
        let FAG_trees = places[this.now_place].FAG_trees;
        if (is_Empty_Object(this.last_logger_place_data[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let id in FAG_trees) {
                //不稀有的树不需要记录缓存
                if (!FAG_trees[id].rare_flag) continue;

                //
                obj[id] = new Object();
                obj[id].cumulative_num = FAG_trees[id].max_cumulative_num;
                obj[id].last_cumulative_time = this.now_time;
            }
            this.last_logger_place_data[this.now_place] = obj;
        } else {
            let obj = this.last_logger_place_data[this.now_place];
            //当前地点已有缓存，更新一遍
            for (let id in obj) {
                if (obj[id].cumulative_num >= FAG_trees[id].max_cumulative_num) {
                    //这棵树堆积数量已经满了，更新时间
                    obj[id].last_cumulative_time = this.now_time;
                } else {
                    //这棵树没积累满，检查是否到了积累时间
                    let cumulative_time = (this.now_time - obj[id].last_cumulative_time) / 1000;
                    if (cumulative_time >= FAG_trees[id].cumulative_time) {
                        obj[id].cumulative_num++;
                        obj[id].last_cumulative_time = this.now_time;
                    }
                }
            }
        }
    }
    //根据能刷的所有怪的刷新概率权重，随机得到一个敌人id
    get_random_chance_tree_id() {
        let FAG_trees = places[this.now_place].FAG_trees;
        if (is_Empty_Object(FAG_trees)) {
            //当前地点没有定义可刷的任何树，直接结束
            console.log('%s地点没有定义任何可刷的树', this.now_place);
            return false;
        }
        //根据权重获得id
        let random_manage = global.get_random_manage(); //随机数管理类
        let tree_id = random_manage.get_place_add_tree_id(this.now_place);

        if (!FAG_trees[tree_id].rare_flag) {
            //随机得到的树不是稀有树，那本次随机就是它了
            return tree_id;
        } else {
            //随机得到的树是稀有树，查看缓存中是否还有数量
            if (this.last_logger_place_data[this.now_place][tree_id].cumulative_num <= 0) {
                //没了，随机选一个可以无限刷新的id
                let keys = new Array();
                for (let id in FAG_trees) {
                    if (!FAG_trees[tree_id].rare_flag) {
                        keys.push(id);
                    }
                }
                //这个地点没有可以非稀有的树，不可刷新
                if (keys.length <= 0) return false;

                let random = get_random(1, keys.length);
                return keys[random - 1];
            } else {
                //有积累的数量，本次随机就是它了
                // this.last_logger_place_data[this.now_place][tree_id].cumulative_num--;
                return tree_id;
            }
        }
    }
}

export {};
