import { get_random, calculate_num_attr, calculate_speed_attr } from '../../Function/math_func.js';
import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, get_item_id_key, get_item_obj } from '../../Function/Function.js';
import { enemys } from '../../Data/Enemy/Enemy.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { player } from '../../Player/Player.js';
import { global } from '../../GameRun/global_manage.js';
//伐木状态
const LGI_status = Object.freeze({
    NO_LGI: 1, //没有伐木
    ENERGY_LGI: 2, //精力充足并且正在伐木
    NO_ENERGY_LGI: 3, //精力不足并且正在伐木
    REST_LGI: 4, //精力不足且停止伐木，进入休息状态
});
//伐木目标对象
class Tree_manage {
    constructor() {
        this.id;
        this.statu; //存活状态
        this.death_time; //死亡时间点

        this.reborn_time; //重生时间点
        this.health_max; //最大生命
        this.health_point; //当前生命

        this.LGI_energy; //每次砍伐的精力需求
    }
    //重生成id树
    reborn_tree(id) {
        this.id = id;
        this.statu = true; //存活状态
        this.reborn_time = global.get_game_now_time(); //重生时间点
        this.health_max = enemys[id].survival_attr['health_max']; //最大生命
        this.health_point = this.health_max;
        this.LGI_energy = enemys[id].LGI_energy;
    }
    //用LGI_attack伤害砍一下树
    attack_tree(LGI_attack) {
        this.health_point -= LGI_attack;
        if (this.health_point <= 0) {
            this.health_point = 0;
            this.death_time = global.get_game_now_time();
            this.statu = false;
        }
    }
    //获取树的存活状态
    get_tree_statu() {
        return this.statu;
    }
    //获取树的id
    get_tree_id() {
        return this.id;
    }
    //获取砍伐这棵树需要花费多少精力
    get_LGI_energy() {
        return this.LGI_energy;
    }
    //获得奖励层次
    get_reward_level() {
        //根据击杀时间，判断应该获得哪一档奖励
        let tree_live_time = this.death_time - this.reborn_time;
        let flag = false;
        let reward_level;
        let i;
        if (is_Empty_Object(enemys[this.id].reward_level_time)) {
            console.log('id为%d的树没有定义奖励层级时间', this.id);
            reward_level = 0;
        } else {
            for (i = 0; i < enemys[this.id].reward_level_time.length; i++) {
                if (enemys[this.id].reward_level_time[i] * 1000 > tree_live_time) {
                    break;
                }
            }
            reward_level = i;
        }
        return reward_level;
    }
    //获取当前状态下，这棵树应该掉落的主要奖励
    get_drop_reward() {
        //根据击杀时间，判断应该获得哪一档奖励
        let reward_level = this.get_reward_level();
        //从reward_level这一档奖励中随机出掉落物
        if (is_Empty_Object(enemys[this.id].reward_level_item[reward_level])) {
            //敌人没有这一档的掉落品，直接结束
            console.log('id为%s的树没有定义%d档的奖励', this.id, reward_level);
            return;
        }
        let random_manage = global.get_random_manage(); //随机数管理类
        let drop_item_arry = new Array();
        let enemy_reward_level_data = enemys[this.id].reward_level_item[reward_level];
        //获取敌人有几个掉落列表，对每个掉落列表进行一次判定
        let n = enemy_reward_level_data.length;
        for (let i = 0; i < n; i++) {
            //根据掉落概率，判断这个列表里的物品要掉几次
            let enemy_item_array = enemy_reward_level_data[i];
            let chance = enemy_item_array.drop_chance; //掉率
            let drop_times = parseInt(chance / 100);
            chance = chance % 100;
            let random = get_random(0, 100);
            if (random <= chance) {
                drop_times += 1;
            }
            for (let j = 0; j < drop_times; j++) {
                //根据权重，获取掉落哪一个物品
                let item_key = random_manage.get_tree_death_item_id(this.id, reward_level, i);
                let data_obj = enemy_item_array.items[item_key];

                let item_obj = new Object();
                item_obj.id = data_obj.id;
                item_obj.num = get_random(data_obj.min_num, data_obj.max_num); //这次掉落的数量
                if (items[data_obj.id].main_type.includes('equipment')) {
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
    //获取血量比例
    get_HP_ratio() {
        return (this.health_point / this.health_max) * 100 + '%';
    }
    //获取这棵树的最大血量
    get_max_HP() {
        return this.health_max;
    }
}
//伐木技能管理类
export class Logging_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place = 'village_home'; //当前地点
        this.now_LGI_way = 'LGI_F_way'; //当前选择的伐木方式

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_LGI_status; //当前伐木状态

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.true_LGI_interval; //实际用于计算的伐木攻速
        this.true_LGI_attack; //实际用于计算的伐木攻击
        this.true_LGI_critical_chance; //实际用于计算的伐木暴击率
        this.true_LGI_critical_damage; //实际用于计算的伐木暴击伤害

        this.LGI_place_rare_trees = new Object(); //曾经到过的伐木地点的参数

        this.tree_manage = new Tree_manage(); //伐木的目标对象
    }
    //获取伐木技能管理对象的存档
    save_logging_manage() {
        let logging_save = new Object();
        //获取每个子对象的存档
        //伐木管理对象
        logging_save.now_time = this.now_time;
        logging_save.LGI_place_rare_trees = this.LGI_place_rare_trees;
        logging_save.now_LGI_status = this.now_LGI_status;
        logging_save.now_LGI_way = this.now_LGI_way;
        logging_save.now_place = this.now_place;

        return logging_save;
    }
    //加载伐木技能存档
    load_logging_manage(logging_save) {
        if (is_Empty_Object(logging_save)) {
            return;
        }

        this.now_place = logging_save.now_place; //地点
        let now_time = global.get_game_now_time();
        let save_time = logging_save.now_time;
        // 伐木地点参数加载，需要将存档中的时间同步到当前时间
        this.LGI_place_rare_trees = logging_save.LGI_place_rare_trees;
        for (let place_id in logging_save.LGI_place_rare_trees) {
            let save_obj = logging_save.LGI_place_rare_trees[place_id];
            let manage_obj = this.LGI_place_rare_trees[place_id];
            for (let tree_id in save_obj) {
                let save_tree_last_cumulative_time = save_time - save_obj[tree_id].last_cumulative_time;
                manage_obj[tree_id].last_cumulative_time = now_time - save_tree_last_cumulative_time;
            }
        }
        this.now_LGI_status = logging_save.now_LGI_status;
        //伐木方式按钮切换
        this.now_LGI_way = logging_save.now_LGI_way;
        const LGI_F_way_bar = document.getElementById('LGI_F_way_bar');
        const LGI_M_way_bar = document.getElementById('LGI_M_way_bar');
        if (logging_save.now_LGI_way == 'LGI_F_way') {
            //快速伐木
            LGI_F_way_bar.style.visibility = 'visible';
            LGI_M_way_bar.style.visibility = 'hidden';
            const LGI_F_way_radio_div = document.getElementById('LGI_F_way_radio_div');
            LGI_F_way_radio_div.children[0].checked = true; //激活快速伐木按钮
        }
        if (logging_save.now_LGI_way == 'LGI_M_way') {
            //精细伐木
            LGI_F_way_bar.style.visibility = 'hidden';
            LGI_M_way_bar.style.visibility = 'visible';
            const LGI_M_way_radio_div = document.getElementById('LGI_M_way_radio_div');
            LGI_M_way_radio_div.children[0].checked = true; //激活精细伐木按钮
        }
    }
    //更新当前地点，初始化伐木信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
        //更新一遍当前地点的重要缓存数据
        this.updata_LGI_place_data();
        //进入新地点，无条件重刷一棵树
        this.reborn_tree();
    }
    //地点变化时，对伐木界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //地点的生活技能可用标记第0个是伐木
        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
        if (places[next_place].live_plan_flag[0]) {
            //新地点可以伐木
            //如果当前正在伐木（如通过存档进入），需要更新到开始伐木之后的界面
            let now_GS = global.get_flag('GS_game_statu');
            if (now_GS == 'logging') {
                //重置按钮
                const LGI_S_button = document.getElementById('LGI_S_button');
                const LGI_E_button = document.getElementById('LGI_E_button');
                LGI_S_button.style.display = 'none';
                LGI_E_button.style.display = '';
            } else {
                //当前没有正在伐木，视作常规的地点切换，已更新完成
                // this.set_new_place(next_place);
            }
            return;
        }

        //新地点不能伐木，应该把界面更新成无伐木目标
        this.delete_logging_div('move_place');
    }
    //开始伐木，更新伐木技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        //更新时间
        this.now_time = global.get_game_now_time();

        if (this.now_LGI_status == LGI_status.NO_LGI) {
            //当前没有伐木，却进入了伐木逻辑，属于错误情况
            console.log('伐木状态为无，游戏状态为伐木，状态冲突');
            return;
        }

        if (this.tree_manage.get_tree_statu()) {
            //树活着
            if (this.now_LGI_status == LGI_status.ENERGY_LGI || this.now_LGI_status == LGI_status.NO_ENERGY_LGI) {
                // 精力够用，进行砍伐
                this.tree_live_logging();
            }
        } else {
            //树死了，进入复活逻辑
            this.tree_death_reborn();
        }
        //实时监测精力，根据精力值切换到对应的伐木状态
        this.monitor_energy_change_LGI_status();
    }
    //生活技能切换，切换到了伐木界面，初始化伐木界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    init_live_plan_game_div() {}
    //开始伐木，更新伐木技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        let tree_statu = this.tree_manage.get_tree_statu();
        if (tree_statu) {
            //树活着，应该更新玩家攻击进度和树的血量
            let tree_head = document.getElementById('tree_head');
            if (tree_head.dataset.statu != String(tree_statu)) {
                //这一帧树复活，展示新树的信息
                this.show_new_tree_div();
                tree_head.dataset.statu = String(tree_statu);
            }
            //树的生命进度条
            let tree_blood_bar = document.getElementById('tree_blood_bar');
            let now_HP_ratio = this.tree_manage.get_HP_ratio();
            if (tree_blood_bar.dataset.HP_ratio != now_HP_ratio) {
                tree_blood_bar.children[0].children[0].style.width = now_HP_ratio; //血条
                tree_blood_bar.dataset.HP_ratio = now_HP_ratio;
            }
            //玩家攻击进度条
            let logging_way_bar;
            if (this.now_LGI_way == 'LGI_F_way') {
                logging_way_bar = document.getElementById('LGI_F_way_bar');
            } else if (this.now_LGI_way == 'LGI_M_way') {
                logging_way_bar = document.getElementById('LGI_M_way_bar');
            }
            let now_attack_ratio = this.get_attack_ratio();
            if (logging_way_bar.dataset.attack_ratio != now_attack_ratio) {
                logging_way_bar.children[0].children[0].style.width = now_attack_ratio;
                logging_way_bar.dataset.HP_ratio = now_attack_ratio;
            }
        } else {
            //树死了，清空界面
            let tree_head = document.getElementById('tree_head');
            if (tree_head.dataset.statu != String(tree_statu)) {
                //这一帧树死了，清空界面
                this.delete_logging_div('tree_death');
            }
        }
    }
    //重置一轮伐木的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.round_start_time = global.get_game_now_time();
        this.now_round_time = 0;

        //重置玩家攻击进度条
        let logging_way_bar;
        if (this.now_LGI_way == 'LGI_F_way') {
            logging_way_bar = document.getElementById('LGI_F_way_bar');
        } else if (this.now_LGI_way == 'LGI_M_way') {
            logging_way_bar = document.getElementById('LGI_M_way_bar');
        }
        let now_attack_ratio = this.get_attack_ratio();
        if (logging_way_bar.dataset.attack_ratio != now_attack_ratio) {
            logging_way_bar.children[0].children[0].style.width = now_attack_ratio;
            logging_way_bar.dataset.HP_ratio = now_attack_ratio;
        }
    }
    //停止伐木状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是伐木，不处理
        if (now_GS != 'logging') {
            return;
        }
        //停止伐木
        global.set_flag('GS_game_statu', 'NULL');
        this.now_LGI_status = LGI_status.NO_LGI;
        //重置按钮
        const LGI_S_button = document.getElementById('LGI_S_button');
        const LGI_E_button = document.getElementById('LGI_E_button');
        LGI_S_button.style.display = '';
        LGI_E_button.style.display = 'none';
        //重置进度条
        let logging_way_bar;
        if (this.now_LGI_way == 'LGI_F_way') {
            logging_way_bar = document.getElementById('LGI_F_way_bar');
        } else if (this.now_LGI_way == 'LGI_M_way') {
            logging_way_bar = document.getElementById('LGI_M_way_bar');
        }
        logging_way_bar.children[0].children[0].style.width = '0%';
    }
    //更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;

        //更新伐木时的玩家参数
        this.updata_true_LGI_data();

        // 如果当前地点不可伐木，就不用更新后续的伐木属性，防止读到未定义的伐木参数
        if (!places[this.now_place].live_plan_flag[0]) {
            return;
        }
    }
    //判断当前是否处于伐木的休息状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {
        if (this.now_LGI_status == LGI_status.REST_LGI) {
            return true;
        } else {
            return false;
        }
    }

    //按下了“开始伐木”按钮，这里初始化伐木参数，
    player_start_logging() {
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');

        if (surface_energy_ratio >= 50) {
            //精力充足，切换到对应的状态
            this.now_LGI_status = LGI_status.ENERGY_LGI;
        } else {
            //精力不太足
            this.now_LGI_status = LGI_status.NO_ENERGY_LGI;
        }
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('live_skill_run', 'start', 'logging');
    }
    //伐木模式切换，更新数值
    updata_logging_way(now_way) {
        this.now_LGI_way = now_way;
        //更新伐木时的玩家参数
        this.updata_true_LGI_data();
        this.reset_round();
    }
    //更新伐木时的玩家参数
    updata_true_LGI_data() {
        //伐木攻击力
        this.true_LGI_attack = this.get_true_LGI_attack();

        //伐木间隔
        this.true_LGI_interval = this.get_true_LGI_interval();

        //伐木暴击率
        this.true_LGI_critical_chance = this.player_end_attr['LGI_critical_chance'];
        //伐木暴击伤害
        this.true_LGI_critical_damage = this.player_end_attr['LGI_critical_damage'];

        if (this.now_LGI_way == 'LGI_M_way') {
            //精细伐木有数值补正
            this.true_LGI_critical_chance = this.player_end_attr['LGI_critical_chance'] + 30;
            this.true_LGI_critical_damage = this.player_end_attr['LGI_critical_damage'] + 50;
        } else if (this.now_LGI_way == 'LGI_F_way') {
            //快速伐木没有属性补正，就等于玩家属性
        }
    }
    //树活着的砍伐逻辑
    tree_live_logging() {
        this.now_round_time = this.now_time - this.round_start_time;

        if (this.now_round_time < this.true_LGI_interval * 1000) {
            //当前没有跑完攻速，不做处理
            return;
        }
        //到时候了，准备砍一下树
        //判断精力是否足够砍这一下
        let LGI_energy = this.tree_manage.get_LGI_energy();
        let P_attr = player.get_player_attributes();
        if (!P_attr.use_energy_point(LGI_energy)) {
            //精力不足，不能砍伐，要进入伐木休息状态
            this.now_LGI_status = LGI_status.REST_LGI;
            //写游戏日志，实在没有精力了，暂停伐木，原地休息
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_2', 'logging');
            return;
        }
        //精力足够，已经消耗，砍一下树

        //获取伐木伤害
        let LGI_damage = this.get_LGI_damage();
        //砍到树身上
        this.tree_manage.attack_tree(LGI_damage);

        //记录伐木中的参数，用于结算伐木技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        let logging_behavior = new Object();
        logging_behavior.LGI_damage = LGI_damage;
        if (this.now_LGI_status == 'LGI_F_way') {
            //当前模式是快速伐木，记录快速伐木模式的伐木伤害
            logging_behavior.LGI_F_damage = LGI_damage;
        } else if (this.now_LGI_status == 'LGI_M_way') {
            //当前模式是精细伐木，记录精细伐木模式的伐木伤害
            logging_behavior.LGI_M_damage = LGI_damage;
        }
        global_flag_manage.record_live_plan_skill_leveling_behavior('logging', logging_behavior);

        if (!this.tree_manage.get_tree_statu()) {
            //树死了
            // 进入掉落物品逻辑
            let items_arr = this.tree_manage.get_drop_reward();
            for (let item_key in items_arr) {
                player.Player_get_item(items_arr[item_key]);
            }
            //如果这棵树是稀有的树，需要处理积累数量
            let tree_id = this.tree_manage.get_tree_id();
            if (places[this.now_place].LGI_trees[tree_id].rare_flag) {
                this.LGI_place_rare_trees[this.now_place][tree_id].cumulative_num--;
            }
            //如果玩家疲劳了，进入休息状态，
            if (this.now_LGI_status == LGI_status.NO_ENERGY_LGI) {
                this.now_LGI_status = LGI_status.REST_LGI;
                //写游戏日志，感到疲劳，暂停伐木，原地休息
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.set_game_log('live_skill_run', 'no_energy_1', 'logging');
            }
        }
        //砍完重置回合
        this.reset_round();
    }
    //树死亡时的复活逻辑
    tree_death_reborn() {
        let reborn_time = places[this.now_place].LGI_reborn_time; //当前地点规定的树复活时间
        let tree_death_time = this.tree_manage.death_time; //上一颗树死亡的时间

        //没到复活时间
        if (this.now_time - tree_death_time < reborn_time * 1000) {
            return;
        }
        //更新一遍当前地点的重要缓存数据
        this.updata_LGI_place_data();
        //刷新复活一棵树
        this.reborn_tree();
    }
    //刷新复活一棵树
    reborn_tree() {
        //随机获得当前地点的某树的id
        let tree_id = this.get_random_chance_tree_id();
        if (tree_id == false) {
            //当前地点没有可以复活的树，停止运行
            //避免下一帧又重新计算复活，重置上一颗树的死亡时间
            this.tree_manage.death_time = this.now_time;
            return;
        }
        //刷新这棵树
        this.tree_manage.reborn_tree(tree_id);
        //重置回合
        this.reset_round();
        //更新新树的界面信息
        this.show_new_tree_div();
    }
    //更新当前地点的缓存数据
    updata_LGI_place_data() {
        let LGI_trees = places[this.now_place].LGI_trees;
        if (is_Empty_Object(this.LGI_place_rare_trees[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let id in LGI_trees) {
                //不稀有的树不需要记录缓存
                if (!LGI_trees[id].rare_flag) {
                    continue;
                }

                obj[id] = new Object();
                obj[id].cumulative_num = LGI_trees[id].max_cumulative_num;
                obj[id].last_cumulative_time = this.now_time;
            }
            this.LGI_place_rare_trees[this.now_place] = obj;
        } else {
            let obj = this.LGI_place_rare_trees[this.now_place];
            //当前地点已有缓存，更新一遍
            for (let id in obj) {
                if (obj[id].cumulative_num >= LGI_trees[id].max_cumulative_num) {
                    //这棵树堆积数量已经满了，更新时间
                    obj[id].last_cumulative_time = this.now_time;
                } else {
                    //这棵树没积累满，检查是否到了积累时间
                    let cumulative_time = (this.now_time - obj[id].last_cumulative_time) / 1000;
                    if (cumulative_time >= LGI_trees[id].cumulative_time) {
                        obj[id].cumulative_num++;
                        obj[id].last_cumulative_time = this.now_time;
                    }
                }
            }
        }
    }
    //根据能刷的所有怪的刷新概率权重，随机得到一个敌人id
    get_random_chance_tree_id() {
        let LGI_trees = places[this.now_place].LGI_trees;
        if (is_Empty_Object(LGI_trees)) {
            //当前地点没有定义可刷的任何树，直接结束
            console.log('%s地点没有定义任何可刷的树', this.now_place);
            return false;
        }
        //根据权重获得id
        let random_manage = global.get_random_manage(); //随机数管理类
        let tree_id = random_manage.chance_random_get_id(LGI_trees, 'ADD_ENEMY', this.now_place);

        if (is_Empty_Object(LGI_trees[tree_id].rare_flag)) {
            console.log('%s地点设定的%s伐木对象没有定义稀有标记', this.now_place, tree_id);
            return false;
        }
        if (!LGI_trees[tree_id].rare_flag) {
            //随机得到的树不是稀有树，那本次随机就是它了
            return tree_id;
        } else {
            //随机得到的树是稀有树，查看缓存中是否还有数量
            if (this.LGI_place_rare_trees[this.now_place][tree_id].cumulative_num <= 0) {
                //没了，随机选一个可以无限刷新的id
                let keys = new Array();
                for (let id in LGI_trees) {
                    if (!LGI_trees[tree_id].rare_flag) {
                        keys.push(id);
                    }
                }
                //这个地点没有可以非稀有的树，不可刷新
                if (keys.length <= 0) return false;

                let random = get_random(1, keys.length);
                return keys[random - 1];
            } else {
                //有积累的数量，本次随机就是它了
                //刷出稀有对象时不消耗积累的数量，只有在玩家砍掉这个树时才消耗
                // this.LGI_place_rare_trees[this.now_place][tree_id].cumulative_num--;
                return tree_id;
            }
        }
    }
    //获取伐木攻击进度比例
    get_attack_ratio() {
        return (this.now_round_time / (this.true_LGI_interval * 1000)) * 100 + '%';
    }
    //获取最终伐木攻击力
    get_true_LGI_attack() {
        //基础伐木攻击
        let LGI_attack = this.player_end_attr['LGI_attack'];
        //直接加算增幅
        let attack_add = 0;
        if (this.now_LGI_way == 'LGI_M_way') {
            if (!is_Empty_Object(this.player_end_attr['LGI_M_attack'])) {
                attack_add += this.player_end_attr['LGI_M_attack'];
            }
        }

        //获取所有直接乘算增幅
        let damage_add = 0;
        //武器类型伤害增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let damage_attr_name = 'LGI_damage_' + weapon_type;
            if (!is_Empty_Object(this.player_end_attr[damage_attr_name])) {
                damage_add += this.player_end_attr[damage_attr_name];
            }
        }

        //获取所有最终乘算增幅
        let end_LGI_attack_ratio = this.player_end_attr['end_LGI_attack_ratio'];

        let true_LGI_attack = calculate_num_attr(LGI_attack, attack_add, damage_add, 0, end_LGI_attack_ratio);
        return true_LGI_attack;
    }
    //获取最终伐木伤害
    get_LGI_damage() {
        let LGI_damage = this.true_LGI_attack;
        //暴击结算
        let random_manage = global.get_random_manage(); //随机数管理类
        if (random_manage.try_number_random(this.true_LGI_critical_chance)) {
            LGI_damage = LGI_damage * (this.true_LGI_critical_damage * 0.01);
        }
        //对小树的增伤
        if (this.tree_manage.get_max_HP() <= 15) {
            if (!is_Empty_Object(this.player_end_attr['mini_tree_LGI_damage'])) {
                LGI_damage += this.player_end_attr['mini_tree_LGI_damage'];
            }
        }

        return LGI_damage;
    }
    //获取最终伐木间隔
    get_true_LGI_interval() {
        //基础伐木间隔
        let base_LGI_interval = this.player_end_attr['LGI_interval'];

        //累加所有伐木攻速加成
        let LGI_speed = this.player_end_attr['LGI_speed']; //结算完的常态伐木攻速
        if (LGI_speed === undefined) {
            LGI_speed = 0;
        }
        //武器类型的伐木攻速加成
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let speed_attr_name = 'LGI_speed_' + weapon_type;
            if (!is_Empty_Object(this.player_end_attr[speed_attr_name])) {
                LGI_speed += this.player_end_attr[speed_attr_name];
            }
        }

        //最终伐木攻速加成
        let end_LGI_speed = this.player_end_attr['end_LGI_speed']; //结算完的常态伐木攻速
        if (end_LGI_speed === undefined) {
            end_LGI_speed = 0;
        }
        if (this.now_LGI_way == 'LGI_M_way') {
            end_LGI_speed += -50;
        }

        //结算伐木间隔
        let true_LGI_interval = calculate_speed_attr(base_LGI_interval, 0, LGI_speed, 0, end_LGI_speed);
        return true_LGI_interval;
    }
    //树刚刚复活时，将新复活的树的信息展示出来
    show_new_tree_div() {
        //树的名称
        let tree_id = this.tree_manage.get_tree_id();
        let tree_head = document.getElementById('tree_head');
        tree_head.innerHTML = enemys[tree_id].name;
        tree_head.dataset.statu = 'true';
        //树的掉落物
        let drop_item_arry = new Array();
        //遍历每一级
        for (let reward_level of enemys[tree_id].reward_level_item) {
            //每一级奖励中可能有多组掉落列表，遍历每一个掉落列表
            for (let drop_array of reward_level) {
                //每个掉落列表里有多个可能的掉落物，获取所有掉落物
                for (let item_id in drop_array.items) {
                    drop_item_arry.push(item_id);
                }
            }
        }
        drop_item_arry = get_uniqueArr(drop_item_arry);
        //将掉落物展示到界面里
        let LGI_drop_table_value_div = document.getElementById('LGI_drop_table_value_div');
        LGI_drop_table_value_div.replaceChildren(); //清空现有展示的物品
        for (let item_key of drop_item_arry) {
            let id = item_key.split(':')[0];
            let drop_value = addElement(LGI_drop_table_value_div, 'div', null, 'drop_value');
            drop_value.innerHTML = items[id].name;
        }
        //树的血条回满
        let tree_blood_bar = document.getElementById('tree_blood_bar');
        tree_blood_bar.children[0].children[0].style.width = '100%';
    }
    //清空伐木界面
    delete_logging_div(delete_flag) {
        //树的名称
        let tree_head = document.getElementById('tree_head');
        if (delete_flag == 'tree_death') {
            tree_head.innerHTML = '正在搜索伐木目标';
        } else if (delete_flag == 'move_place') {
            tree_head.innerHTML = '没有目标';
        }

        //树的血条
        let tree_blood_bar = document.getElementById('tree_blood_bar');
        tree_blood_bar.children[0].children[0].style.width = '100%';
        //树的掉落物
        let LGI_drop_table_value_div = document.getElementById('LGI_drop_table_value_div');
        LGI_drop_table_value_div.replaceChildren(); //清空现有展示的物品
        var drop_value = addElement(LGI_drop_table_value_div, 'div', null, 'drop_value');
        drop_value.innerHTML = '无';
        //玩家攻击进度条
        let logging_way_bar;
        if (this.now_LGI_way == 'LGI_F_way') {
            logging_way_bar = document.getElementById('LGI_F_way_bar');
        } else if (this.now_LGI_way == 'LGI_M_way') {
            logging_way_bar = document.getElementById('LGI_M_way_bar');
        }
        logging_way_bar.children[0].children[0].style.width = '0%';

        tree_head.dataset.statu = 'false';
    }
    //实时监测精力，恢复好就切换到其他伐木状态
    monitor_energy_change_LGI_status() {
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (this.now_LGI_status == LGI_status.ENERGY_LGI) {
            //精力掉到49%以内时切换为精力不足且伐木
            if (surface_energy_ratio < 50) {
                this.now_LGI_status = LGI_status.NO_ENERGY_LGI;
            }
        } else if (this.now_LGI_status == LGI_status.NO_ENERGY_LGI) {
            //精力不足且伐木在一棵树伐木完成时自动切换成休息
        } else if (this.now_LGI_status == LGI_status.REST_LGI) {
            //精力不足且休息状态在精力回满的时候切换到其他伐木状态
            if (P_attr.judge_surface_energy_max()) {
                let global_flag_manage = global.get_global_flag_manage();
                if (surface_energy_ratio >= 50) {
                    //精力充足
                    this.now_LGI_status = LGI_status.ENERGY_LGI;
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'logging');
                } else if (surface_energy_ratio >= 25 && surface_energy_ratio < 50) {
                    //精力不太足
                    this.now_LGI_status = LGI_status.NO_ENERGY_LGI;
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'logging');
                } else if (surface_energy_ratio < 25) {
                    //精力不足，不能伐木
                    this.stop_game_statu();
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_2', 'logging');
                }
            }
        }
    }
    //获取伐木状态
    get_now_LGI_status() {
        return this.now_LGI_status;
    }
}

export {};
