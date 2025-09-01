import { get_random } from '../../Function/math_func.js';
import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { enemys } from '../../Data/Enemy/Enemy.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { player } from '../../Player/Player.js';
import { global } from '../../GameRun/global_manage.js';
//伐木目标对象
class Tree_manage {
    constructor() {
        this.id;
        this.statu; //存活状态
        this.death_time; //死亡时间点

        this.reborn_time; //重生时间点
        this.health_max; //最大生命
        this.health_point; //当前生命
    }
    //重生成id树
    reborn_tree(id) {
        this.id = id;
        this.statu = true; //存活状态
        this.reborn_time = global.get_game_now_time(); //重生时间点
        this.health_max = enemys[id].survival_attr['health_max']; //最大生命
        this.health_point = this.health_max;
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
                let item_id = random_manage.get_tree_death_item_id(this.id, reward_level, i);
                let data_obj = enemy_item_array.items[item_id];

                let item_obj = new Object();
                item_obj.id = item_id;
                item_obj.num = get_random(data_obj.min_num, data_obj.max_num); //这次掉落的数量
                if (items[item_id].main_type.includes('equipment')) {
                    //如果掉落的是装备，还需要记录稀有度
                    item_obj.rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
                }
                //将掉落的信息存起来
                drop_item_arry.push(item_obj);
            }
        }
        //对掉落物去重
        let uniqueArr = new Object();
        for (let item_obj of drop_item_arry) {
            let id = item_obj.id;
            let key = id;
            if (items[id].main_type.includes('equipment')) {
                key = id + rarity;
            }

            if (is_Empty_Object(uniqueArr[key])) {
                uniqueArr[key] = item_obj;
            } else {
                uniqueArr[key].num += item_obj.num;
            }
        }
        return uniqueArr;
    }
    //获取血量比例
    get_HP_ratio() {
        return `${(this.health_point / this.health_max) * 100}%`;
    }
}
//伐木技能管理类
export class Logging_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place; //当前地点
        this.now_LGI_way = 'LGI_F_way'; //当前选择的伐木方式

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.true_LGI_speed; //实际用于计算的伐木攻速
        this.true_LGI_attack; //实际用于计算的伐木攻击
        this.true_LGI_critical_chance; //实际用于计算的伐木暴击率
        this.true_LGI_critical_damage; //实际用于计算的伐木暴击伤害

        this.logger_place_data = new Object(); //曾经到过的伐木地点的参数

        this.tree_manage = new Tree_manage(); //伐木的目标对象
    }
    //获取伐木技能管理对象的存档
    save_logging_manage() {
        let logging_save = new Object();
        //获取每个子对象的存档
        //伐木管理对象
        logging_save.now_time = this.now_time;
        logging_save.logger_place_data = this.logger_place_data;

        return logging_save;
    }
    //加载伐木技能存档
    load_Logging_manage(logging_save) {
        if (is_Empty_Object(logging_save)) {
            return;
        }
        let now_time = global.get_game_now_time();
        let save_time = logging_save.now_time;
        // 伐木地点参数加载，需要将存档中的时间同步到当前时间
        this.logger_place_data = logging_save.logger_place_data;
        for (let place_id in logging_save.logger_place_data) {
            let save_obj = logging_save.logger_place_data[place_id];
            let manage_obj = this.logger_place_data[place_id];
            for (let tree_id in save_obj) {
                let save_tree_last_cumulative_time = save_time - save_obj[tree_id].last_cumulative_time;
                manage_obj[tree_id].last_cumulative_time = now_time - save_tree_last_cumulative_time;
            }
        }
    }
    //更新当前地点，初始化伐木信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();
        //更新一遍当前地点的重要缓存数据
        this.updata_logger_place_data();
        //进入新地点，无条件重刷一棵树
        this.reborn_tree();
    }
    //地点变化时，对伐木界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //地点的生活技能可用标记第0个是伐木
        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
        if (places[next_place].live_plan_flag[0]) {
            //新地点可以伐木，会正常调用set_new_place函数，不需要这里特殊处理
            return;
        }

        //新地点不能伐木，应该把界面更新成无伐木目标
        this.delete_logging_div('move_place');
    }
    //开始伐木，更新伐木技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        this.now_time = global.get_game_now_time();
        if (this.tree_manage.get_tree_statu()) {
            //树活着，读条进行砍伐
            this.tree_live_logging();
        } else {
            //树死了，进入复活逻辑
            this.tree_death_reborn();
        }
    }
    //开始伐木，更新伐木技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        let tree_statu = this.tree_manage.get_tree_statu();
        if (tree_statu) {
            //树活着，应该更新玩家攻击进度和树的血量
            let tree_head = document.getElementById('tree_head');
            if (tree_head.Data.statu != tree_statu) {
                //这一帧树复活，展示新树的信息
                this.show_new_tree_div();
                tree_head.Data.statu = tree_statu;
            }
            //树的生命进度条
            let tree_blood_bar = document.getElementById('tree_blood_bar');
            let now_HP_ratio = this.tree_manage.get_HP_ratio();
            if (tree_blood_bar.Data.HP_ratio != now_HP_ratio) {
                tree_blood_bar.children[0].children[0].style.width = now_HP_ratio; //血条
                tree_blood_bar.Data.HP_ratio = now_HP_ratio;
            }
            //玩家攻击进度条
            let logging_way_bar;
            let logging_way = global.get_flag('GS_logging_way');
            if (logging_way == 'LGI_F_way') {
                logging_way_bar = document.getElementById('LGI_F_way_bar');
            } else if (logging_way == 'LGI_M_way') {
                logging_way_bar = document.getElementById('LGI_M_way_bar');
            }
            let now_attack_ratio = this.get_attack_ratio();
            if (logging_way_bar.Data.attack_ratio != now_attack_ratio) {
                logging_way_bar.children[0].children[0].style.width = now_attack_ratio;
                logging_way_bar.Data.HP_ratio = now_attack_ratio;
            }
        } else {
            //树死了，清空界面
            let tree_head = document.getElementById('tree_head');
            if (tree_head.Data.statu != tree_statu) {
                // //这一帧树死了，清空界面
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
        let logging_way = global.get_flag('GS_logging_way');
        if (logging_way == 'LGI_F_way') {
            logging_way_bar = document.getElementById('LGI_F_way_bar');
        } else if (logging_way == 'LGI_M_way') {
            logging_way_bar = document.getElementById('LGI_M_way_bar');
        }
        let now_attack_ratio = this.get_attack_ratio();
        if (logging_way_bar.Data.attack_ratio != now_attack_ratio) {
            logging_way_bar.children[0].children[0].style.width = now_attack_ratio;
            logging_way_bar.Data.HP_ratio = now_attack_ratio;
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
        //重置按钮
        const LGI_S_button = document.getElementById('LGI_S_button');
        const LGI_E_button = document.getElementById('LGI_E_button');
        LGI_S_button.style.display = '';
        LGI_E_button.style.display = 'none';
        //
    }
    //更新角色属性或者伐木模式
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
        //更新伐木时的玩家参数
        this.updata_true_LGI_data();
    }

    //伐木模式切换，更新数值
    updata_logger_way(now_way) {
        this.now_LGI_way = now_way;
        //更新伐木时的玩家参数
        this.updata_true_LGI_data();
        this.reset_round();
    }
    //更新伐木时的玩家参数
    updata_true_LGI_data() {
        //伐木速度
        this.true_LGI_speed = this.player_end_attr['LGI_speed'];
        //武器类型的伐木速度增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let speed_attr_name = weapon_type + '_LGI_speed';
            if (!is_Empty_Object(this.player_end_attr[speed_attr_name])) {
                this.true_LGI_speed += this.player_end_attr[speed_attr_name];
            }
        }
        //伐木暴击率
        this.true_LGI_critical_chance = this.player_end_attr['LGI_critical_chance'];
        //伐木暴击伤害
        this.true_LGI_critical_damage = this.player_end_attr['LGI_critical_damage'];

        if (this.now_LGI_way == 'LGI_M_way') {
            //精细伐木有数值补正
            this.true_LGI_speed = this.player_end_attr['LGI_speed'] * 1.5;
            this.true_LGI_critical_chance = this.player_end_attr['LGI_critical_chance'] + 30;
            this.true_LGI_critical_damage = this.player_end_attr['LGI_critical_damage'] + 50;
        } else if (this.now_LGI_way == 'LGI_F_way') {
            //快速伐木没有属性补正，就等于玩家属性
        }
    }
    //树活着的砍伐逻辑
    tree_live_logging() {
        this.now_round_time = this.now_time - this.round_start_time;

        if (this.now_round_time < this.true_LGI_speed * 1000) {
            //当前没有跑完攻速，不做处理
            return;
        }
        //到时候了，准备砍一下树
        //获取伐木伤害
        let LGI_damage = this.get_LGI_damage();
        //砍到树身上
        this.tree_manage.attack_tree(LGI_damage);

        //记录砍了多少伤害，用于结算伐木技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.record_logging_behavior(LGI_damage);

        if (!this.tree_manage.get_tree_statu()) {
            //树死了，进入掉落物品逻辑
            let items_obj = this.tree_manage.get_drop_reward();
            for (let key in items_obj) {
                let id = items_obj[key].id;
                let num = items_obj[key].num;
                let rarity = items_obj[key].rarity;
                player.Player_get_item(id, num, rarity);
            }
            //如果这棵树是稀有的树，需要处理积累数量
            let tree_id = this.tree_manage.get_tree_id();
            if (places[this.now_place].LGI_trees[tree_id].rare_flag) {
                this.logger_place_data[this.now_place][tree_id].cumulative_num--;
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
        this.updata_logger_place_data();
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
    updata_logger_place_data() {
        let LGI_trees = places[this.now_place].LGI_trees;
        if (is_Empty_Object(this.logger_place_data[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let id in LGI_trees) {
                //不稀有的树不需要记录缓存
                if (!LGI_trees[id].rare_flag) continue;

                //
                obj[id] = new Object();
                obj[id].cumulative_num = LGI_trees[id].max_cumulative_num;
                obj[id].last_cumulative_time = this.now_time;
            }
            this.logger_place_data[this.now_place] = obj;
        } else {
            let obj = this.logger_place_data[this.now_place];
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
        let tree_id = random_manage.get_place_add_tree_id(this.now_place);

        if (is_Empty_Object(LGI_trees[tree_id].rare_flag)) {
            console.log('%s地点设定的%s伐木对象没有定义稀有标记', this.now_place, tree_id);
            return false;
        }
        if (!LGI_trees[tree_id].rare_flag) {
            //随机得到的树不是稀有树，那本次随机就是它了
            return tree_id;
        } else {
            //随机得到的树是稀有树，查看缓存中是否还有数量
            if (this.logger_place_data[this.now_place][tree_id].cumulative_num <= 0) {
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
                // this.logger_place_data[this.now_place][tree_id].cumulative_num--;
                return tree_id;
            }
        }
    }
    //获取伐木攻击进度比例
    get_attack_ratio() {
        return `${(this.now_round_time / (this.true_LGI_speed * 1000)) * 100}%`;
    }
    //获取最终伐木伤害
    get_LGI_damage() {
        //伐木的伤害计算流程有5个阶段
        //计算最终面板，伤害增幅结算，暴击结算，伤害打到树上结算
        // 这里进行结算伤害增幅和结算暴击
        let LGI_attack = this.player_end_attr['LGI_attack'];

        let damage_add = 0;
        //武器类型伤害增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let damage_attr_name = weapon_type + '_LGI_damage';
            if (!is_Empty_Object(this.player_end_attr[damage_attr_name])) {
                damage_add += this.player_end_attr[damage_attr_name];
            }
        }
        let LGI_damage = LGI_attack * (1 + damage_add * 0.01);

        //暴击结算
        let random_manage = global.get_random_manage(); //随机数管理类
        if (random_manage.try_critical(this.true_LGI_critical_chance)) {
            LGI_damage = LGI_damage * (this.true_LGI_critical_damage * 0.01);
        }
        return LGI_damage;
    }
    //树刚刚复活时，将新复活的树的信息展示出来
    show_new_tree_div() {
        //树的名称
        let tree_id = this.tree_manage.get_tree_id();
        let tree_head = document.getElementById('tree_head');
        tree_head.innerHTML = enemys[tree_id].name;

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
        for (let id of drop_item_arry) {
            let drop_value = addElement(LGI_drop_table_value_div, 'div', null, 'drop_value');
            drop_value.innerHTML = items[id].name;
        }
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
        let logging_way = global.get_flag('GS_logging_way');
        if (logging_way == 'LGI_F_way') {
            logging_way_bar = document.getElementById('LGI_F_way_bar');
        } else if (logging_way == 'LGI_M_way') {
            logging_way_bar = document.getElementById('LGI_M_way_bar');
        }
        logging_way_bar.children[0].children[0].style.width = '100%';

        tree_head.Data.statu = false;
    }
}

export {};
