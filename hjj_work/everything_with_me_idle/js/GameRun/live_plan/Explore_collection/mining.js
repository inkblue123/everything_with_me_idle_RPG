import { get_random, calculate_num_attr, calculate_speed_attr } from '../../../Function/math_func.js';
import { addElement } from '../../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, get_item_id_key } from '../../../Function/Function.js';
import { enemys } from '../../../Data/Enemy/Enemy.js';
import { items } from '../../../Data/Item/Item.js';
import { places } from '../../../Data/Place/Place.js';
import { player } from '../../../Player/Player.js';
import { global } from '../../global_manage.js';
//挖矿状态
const MIN_status = Object.freeze({
    NO_MIN: 1, //没有挖矿

    ENERGY_MIN: 2, //正在挖矿并且精力充足
    NO_ENERGY_MIN: 3, //正在挖矿并且精力不足
    REST_MIN: 4, //正在挖矿并且精力实在不足，暂停挖矿，进入休息状态

    R_ORE_NO_MIN: 5, //没有挖矿并且矿石正在重生
    R_ORE_MIN: 6, //正在挖矿并且矿石正在重生
});
//挖矿目标对象
class Ore_manage {
    constructor() {
        this.id;
        this.statu; //存活状态
        this.level; //等级
        this.death_time; //死亡时间点
        // this.reborn_time; //重生时间点
        this.health_max; //最大生命
        this.health_point; //当前生命
        this.defense; //矿石防御
        this.MIN_energy; //每次挖矿的精力需求
    }
    //重生成id矿石
    reborn_ore(id) {
        this.id = id;
        this.statu = true; //存活状态
        this.level = get_random_chance_ore_level(id); //等级
        // this.reborn_time = global.get_game_now_time(); //重生时间点
        this.health_max = enemys[id].survival_attr['health_max']; //最大生命
        this.health_max += enemys[id].reward_level_attr[this.level].health_max; //等级补正
        if (is_Empty_Object(this.health_max)) {
            console.log('矿石生命初始化异常');
        }
        this.health_point = this.health_max;
        this.MIN_energy = enemys[id].MIN_energy; //每次挖矿的精力消耗
        this.MIN_energy += enemys[id].reward_level_attr[this.level].MIN_energy; //等级补正
        if (is_Empty_Object(this.MIN_energy)) {
            console.log('挖矿的精力消耗初始化异常');
        }
        this.defense = enemys[id].defense_attr['defense']; //矿石防御
        this.defense += enemys[id].reward_level_attr[this.level].defense; //等级补正
        if (is_Empty_Object(this.defense)) {
            console.log('矿石防御初始化异常');
        }
    }
    //使用地点缓存关键信息初始化矿石对象
    ore_data_init(ore_data) {
        this.statu = ore_data.statu;
        if (ore_data.statu) {
            //矿石活着，用缓存信息初始化
            let id = ore_data.id;
            this.id = id;
            this.level = ore_data.level;
            this.health_max = enemys[id].survival_attr['health_max']; //最大生命
            this.health_max += enemys[id].reward_level_attr[this.level].health_max; //等级补正
            if (is_Empty_Object(this.health_max)) {
                console.log('矿石生命初始化异常');
            }
            this.health_point = ore_data.health_point; //当前剩余生命值
            this.MIN_energy = enemys[id].MIN_energy; //每次挖矿的精力消耗
            this.MIN_energy += enemys[id].reward_level_attr[this.level].MIN_energy; //等级补正
            if (is_Empty_Object(this.MIN_energy)) {
                console.log('挖矿的精力消耗初始化异常');
            }
            this.defense = enemys[id].defense_attr['defense']; //矿石防御
            this.defense += enemys[id].reward_level_attr[this.level].defense; //等级补正
            if (is_Empty_Object(this.defense)) {
                console.log('矿石防御初始化异常');
            }
        } else {
            //矿石是死的
            this.death_time = ore_data.death_time;
        }
    }

    //用MIN_attack伤害挖一下矿石
    attack_ore(MIN_attack) {
        this.health_point -= MIN_attack;
        if (this.health_point <= 0) {
            this.start_rebron();
        }
    }
    //进入复活逻辑
    start_rebron() {
        this.health_point = 0;
        this.death_time = global.get_game_now_time();
        this.statu = false;
    }
    //获取矿石的存活状态
    get_ore_statu() {
        return this.statu;
    }
    //获取矿石的id
    get_ore_id() {
        return this.id;
    }
    //获取挖这个矿石需要花费多少精力
    get_MIN_energy() {
        return this.MIN_energy;
    }
    //获取当前矿石的关键信息
    get_ore_data() {
        let obj = new Object();
        obj.statu = this.statu;
        if (this.statu == true) {
            obj.id = this.id;
            obj.level = this.level;
            obj.health_point = this.health_point;
        } else {
            obj.death_time = this.death_time;
        }
        return obj;
    }
    //获取血量比例
    get_HP_ratio() {
        return (this.health_point / this.health_max) * 100 + '%';
    }
    //获取这个矿石的最大血量
    get_max_HP() {
        return this.health_max;
    }

    //获取当前状态下，这个矿石应该掉落的主要奖励
    get_drop_reward() {
        //根据击杀时间，判断应该获得哪一档奖励
        let level = this.level;
        //从reward_level这一档奖励中随机出掉落物
        if (is_Empty_Object(enemys[this.id].reward_level_item[level])) {
            //敌人没有这一档的掉落品，直接结束
            console.log('id为%s的矿石没有定义%d档的奖励', this.id, level);
            return;
        }
        let random_manage = global.get_random_manage(); //随机数管理类
        let drop_item_arry = new Array();
        let enemy_reward_level_data = enemys[this.id].reward_level_item[level];
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
                let item_key = random_manage.get_enemy_death_reward_level_item_id(this.id, level, i);
                let data_obj = enemy_item_array.items[item_key];

                let item_obj = new Object();
                item_obj.id = data_obj.id;
                item_obj.num = get_random(data_obj.min_num, data_obj.max_num); //这次掉落的数量
                if (items[data_obj.id].main_type == 'equipment') {
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
            if (item_obj.num == 0) {
                continue;
            }
            let item_key = get_item_id_key(item_obj);

            if (is_Empty_Object(uniqueArr[item_key])) {
                uniqueArr[item_key] = item_obj;
            } else {
                uniqueArr[item_key].num += item_obj.num;
            }
        }
        return uniqueArr;
    }
}
//挖矿技能管理类
export class Mining_manage {
    constructor() {
        this.now_time; //当前时间
        this.now_place = 'village_home'; //当前地点

        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_MIN_status; //当前挖矿状态

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.true_MIN_interval; //实际用于计算的挖矿攻速
        this.true_MIN_attack; //实际用于计算的挖矿攻击
        this.true_MIN_critical_chance; //实际用于计算的挖矿暴击率
        this.true_MIN_critical_damage; //实际用于计算的挖矿暴击伤害

        this.MIN_place_ores = new Object(); //曾经到过的挖矿地点的参数

        this.ore_manage = new Ore_manage(); //挖矿的目标对象
    }
    //获取挖矿技能管理对象的存档
    save_mining_manage() {
        let mining_save = new Object();
        mining_save.now_time = this.now_time;
        mining_save.MIN_place_ores = this.MIN_place_ores;
        mining_save.now_MIN_status = this.now_MIN_status;
        mining_save.now_place = this.now_place;

        return mining_save;
    }
    //加载挖矿技能存档
    load_mining_manage(mining_save) {
        if (is_Empty_Object(mining_save)) {
            return;
        }

        this.now_place = mining_save.now_place; //地点
        let now_time = global.get_game_now_time();
        let save_time = mining_save.now_time;
        // 挖矿地点参数加载，需要将存档中的时间同步到当前时间
        this.MIN_place_ores = mining_save.MIN_place_ores;
        for (let place_id in mining_save.MIN_place_ores) {
            let save_obj = mining_save.MIN_place_ores[place_id];
            let manage_obj = this.MIN_place_ores[place_id];
            for (let ore_id in save_obj) {
                // let save_ore_last_cumulative_time = save_time - save_obj[ore_id].last_cumulative_time;
                // manage_obj[ore_id].last_cumulative_time = now_time - save_ore_last_cumulative_time;
            }
        }
        this.now_MIN_status = mining_save.now_MIN_status;
    }
    //更新当前地点，初始化挖矿信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        //更新当前地点
        this.now_place = now_place;
        this.now_time = global.get_game_now_time();

        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索，地点的生活技能可用标记第2个是挖矿
        //如果当前地点不能挖矿，不需要更新后续
        if (!places[now_place].live_plan_flag[2]) {
            return;
        }

        if (is_Empty_Object(this.MIN_place_ores[this.now_place])) {
            //更新一遍当前地点的重要缓存数据
            //没有当前地点的缓存，所以是第一次到达该地点，刷新一个矿石
            this.reborn_ore();
            //获取当前矿石信息，保存到地点缓存里
            let obj = this.ore_manage.get_ore_data();
            this.MIN_place_ores[this.now_place] = obj;
        } else {
            //有缓存，使用缓存初始化矿石对象
            if (this.now_place == '') {
            }
            this.ore_manage.ore_data_init(this.MIN_place_ores[this.now_place]);
            //重置回合
            this.reset_round();
            if (this.ore_manage.get_ore_statu()) {
                //矿石活着，更新新矿石的界面信息
                this.show_new_ore_div();
            }
        }
        //调整挖矿状态
        this.updata_now_MIN_status('set_new_place');
    }
    //地点变化时，对挖矿界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {
        //地点的生活技能可用标记第2个是挖矿
        // 伐木、钓鱼、挖矿、采集、潜水、考古、探索
        if (places[next_place].live_plan_flag[2]) {
            //新地点可以挖矿，根据当前挖矿状态调整界面
            if (this.now_MIN_status == MIN_status.NO_MIN || this.now_MIN_status == MIN_status.R_ORE_NO_MIN) {
                //当前没有正在挖矿，视作常规的地点切换，已更新完成
            } else {
                //当前正在挖矿（如通过存档进入），需要更新到开始挖矿之后的界面

                //重置按钮
                const MIN_S_button = document.getElementById('MIN_S_button');
                const MIN_E_button = document.getElementById('MIN_E_button');
                MIN_S_button.style.display = 'none';
                MIN_E_button.style.display = '';
            }
            //进入了可挖矿的界面，调整游戏状态到挖矿
            global.set_flag('GS_game_statu', 'mining');
        } else {
            //新地点不能挖矿
            //把界面更新成无挖矿目标
            delete_mining_div('move_place');
            //调整挖矿状态
            this.updata_now_MIN_status('updata_super_game_div');
            //离开了可挖矿的界面，停止游戏状态
            global.set_flag('GS_game_statu', 'NULL');
        }
    }
    //开始挖矿，更新挖矿技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        //当前没有挖矿
        if (this.now_MIN_status == MIN_status.NO_MIN) {
            return;
        }
        //更新时间
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;

        if (this.ore_manage.get_ore_statu()) {
            //矿石活着
            if (this.now_MIN_status == MIN_status.ENERGY_MIN || this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
                // 精力够用，进行一次挖矿
                this.ore_live_mining();
            } else {
                console.log('矿石活着且状态错误');
            }
        } else {
            // 矿石死了
            if (this.now_MIN_status == MIN_status.REST_MIN || this.now_MIN_status == MIN_status.R_ORE_NO_MIN || this.now_MIN_status == MIN_status.R_ORE_MIN) {
                //进入复活逻辑
                this.ore_death_reborn();
            } else {
                console.log('矿石死了且状态错误');
            }
        }

        //将矿石状态更新到缓存中
        this.updata_MIN_place_data();
        //调整挖矿状态
        this.updata_now_MIN_status('updata_live_plan_data');
        //实时监测精力，根据精力值切换到对应的挖矿状态
        // this.monitor_energy_change_MIN_status();
    }
    //生活技能切换，切换到了挖矿界面，初始化挖矿界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    init_live_plan_game_div() {
        //挖矿目前不需要初始化界面
    }
    //开始挖矿，更新挖矿技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        //当前没有挖矿
        if (this.now_MIN_status == MIN_status.NO_MIN) {
            return;
        }
        let ore_statu = this.ore_manage.get_ore_statu();
        if (ore_statu) {
            //矿石活着
            let ore_head = document.getElementById('ore_head');
            if (ore_head.dataset.statu != String(ore_statu)) {
                //这一帧矿石复活，展示新矿石的信息
                this.show_new_ore_div();
                ore_head.dataset.statu = String(ore_statu);
            }
            //实时更新矿石的生命进度条
            let ore_blood_bar = document.getElementById('ore_blood_bar');
            let now_HP_ratio = this.ore_manage.get_HP_ratio();
            if (ore_blood_bar.dataset.HP_ratio != now_HP_ratio) {
                ore_blood_bar.children[0].children[0].style.width = now_HP_ratio; //血条
                ore_blood_bar.dataset.HP_ratio = now_HP_ratio;
            }
            //实时更新玩家攻击进度条
            let player_mining_bar = document.getElementById('MIN_D_bar');
            let now_attack_ratio = this.get_attack_ratio();
            if (player_mining_bar.dataset.attack_ratio != now_attack_ratio) {
                player_mining_bar.children[0].children[0].style.width = now_attack_ratio;
                player_mining_bar.dataset.HP_ratio = now_attack_ratio;
            }
        } else {
            //矿石死了
            let ore_head = document.getElementById('ore_head');
            if (ore_head.dataset.statu != String(ore_statu)) {
                //这一帧矿石死了，清空界面
                delete_mining_div('ore_death');
            }
            //实时更新矿石复活进度条
            let ore_reborn_bar = document.getElementById('MIN_MR_bar');
            let ore_reborn_ratio = this.get_ore_reborn_ratio();
            if (ore_reborn_bar.dataset.attack_ratio != ore_reborn_ratio) {
                ore_reborn_bar.children[0].children[0].style.width = ore_reborn_ratio;
                ore_reborn_bar.dataset.HP_ratio = ore_reborn_ratio;
            }
        }
    }
    //重置一轮挖矿的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        this.round_start_time = global.get_game_now_time();
        this.now_round_time = 0;
    }
    //停止挖矿状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        //调整挖矿状态
        this.updata_now_MIN_status('stop_game_statu');

        //重置按钮
        const MIN_S_button = document.getElementById('MIN_S_button');
        const MIN_E_button = document.getElementById('MIN_E_button');
        MIN_S_button.style.display = '';
        MIN_E_button.style.display = 'none';
        //重置玩家攻击进度条
        let player_mining_bar = document.getElementById('MIN_D_bar');
        player_mining_bar.children[0].children[0].style.width = '0%';
        //重置矿石复活进度条
        let ore_reborn_bar = document.getElementById('MIN_MR_bar');
        ore_reborn_bar.children[0].children[0].style.width = '0%';

        //重置回合
        this.reset_round();
    }
    //更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;

        //更新挖矿时的玩家参数
        this.updata_true_MIN_data();

        // 如果当前地点不可挖矿，就不用更新后续的挖矿属性，防止读到未定义的挖矿参数
        if (!places[this.now_place].live_plan_flag[0]) {
            return;
        }
    }
    //判断当前是否处于挖矿的可以恢复体力的状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {
        if (this.now_MIN_status == MIN_status.NO_MIN) {
            return true;
        }
        if (this.now_MIN_status == MIN_status.REST_MIN) {
            return true;
        }
        if (this.now_MIN_status == MIN_status.R_ORE_NO_MIN) {
            return true;
        }
        if (this.now_MIN_status == MIN_status.R_ORE_MIN) {
            return true;
        }
        return false;
    }

    //按下了“开始挖矿”按钮，这里初始化挖矿参数，
    player_start_mining() {
        //调整挖矿状态
        this.updata_now_MIN_status('player_start_mining');

        //开始挖矿的日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('live_skill_run', 'start', 'mining');
    }
    //更新挖矿时的玩家参数
    updata_true_MIN_data() {
        //挖矿攻击力
        this.true_MIN_attack = this.get_true_MIN_attack();

        //挖矿间隔
        this.true_MIN_interval = this.get_true_MIN_interval();

        //挖矿暴击率
        this.true_MIN_critical_chance = this.player_end_attr['MIN_critical_chance'];
        //挖矿暴击伤害
        this.true_MIN_critical_damage = this.player_end_attr['MIN_critical_damage'];
    }
    //矿石活着的挖矿逻辑
    ore_live_mining() {
        if (this.now_round_time < this.true_MIN_interval * 1000) {
            //当前没有跑完攻速，不做处理
            return;
        }
        //到时候了，准备挖一下矿石
        //判断精力是否足够挖这一下
        let MIN_energy = this.get_true_MIN_ene();
        let P_attr = player.get_player_attributes();
        if (!P_attr.use_energy_point(MIN_energy)) {
            //精力不足，不能挖，要进入挖矿休息状态
            this.now_MIN_status = MIN_status.REST_MIN;
            //写游戏日志，实在没有精力了，暂停挖矿，原地休息
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('live_skill_run', 'no_energy_2', 'mining');
            return;
        }
        //精力足够，已经消耗，挖一下矿石

        //获取挖矿伤害
        let MIN_damage = this.get_MIN_damage();
        //挖到矿石身上
        this.ore_manage.attack_ore(MIN_damage);

        //记录挖矿中的参数，用于结算挖矿技能的经验
        let global_flag_manage = global.get_global_flag_manage();
        let mining_behavior = new Object();
        mining_behavior.MIN_damage = MIN_damage;
        global_flag_manage.record_live_plan_skill_leveling_behavior('mining', mining_behavior);

        if (!this.ore_manage.get_ore_statu()) {
            //矿石死了
            // 进入掉落物品逻辑
            let items_arr = this.ore_manage.get_drop_reward();
            for (let item_key in items_arr) {
                player.Player_get_item(items_arr[item_key]);
            }
            if (this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
                //如果玩家疲劳了，进入休息状态，
                this.now_MIN_status = MIN_status.REST_MIN;
                //写游戏日志，感到疲劳，暂停挖矿，原地休息
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.set_game_log('live_skill_run', 'no_energy_1', 'mining');
            } else {
                //其他状态调整为，正在挖矿并且矿石正在重生
                this.now_MIN_status = MIN_status.R_ORE_MIN;
            }
        }
        //挖完重置回合
        this.reset_round();
    }

    //主动更换挖矿目标时的矿石复活逻辑
    ore_replace_reborn() {
        if (this.ore_manage.get_ore_statu()) {
            //矿石活着
            //直接让当前矿石死亡，进入复活逻辑
            this.ore_manage.start_rebron();
            //调整挖矿状态
            this.updata_now_MIN_status('ore_replace_reborn');
        } else {
            //矿石死了，正在复活，不能重复更换
        }
    }
    //矿石死亡时的复活逻辑
    ore_death_reborn() {
        //当前地点不能挖矿，不需要处理
        if (!places[this.now_place].live_plan_flag[2]) {
            return;
        }
        //矿石活着，不需要复活
        if (this.ore_manage.get_ore_statu()) {
            return;
        }
        this.now_time = global.get_game_now_time();
        let reborn_time = places[this.now_place].MIN_reborn_time; //当前地点规定的矿石复活时间
        let ore_death_time = this.ore_manage.death_time; //上一个矿石死亡的时间

        //没到复活时间
        if (this.now_time - ore_death_time < reborn_time * 1000) {
            return;
        }
        //刷新复活一个矿石
        this.reborn_ore();
    }
    //刷新复活一个矿石
    reborn_ore() {
        //随机获得当前地点的某矿石的id
        let ore_id = get_random_chance_ore_id(this.now_place);
        if (ore_id == false) {
            //当前地点没有可以复活的矿石，停止运行
            //避免下一帧又重新计算复活，重置上一个矿石的死亡时间
            this.ore_manage.death_time = this.now_time;
            return;
        }
        //刷新这个矿石
        this.ore_manage.reborn_ore(ore_id);
        //重置回合
        this.reset_round();
        //更新新矿石的界面信息
        this.show_new_ore_div();
        //调整挖矿状态
        this.updata_now_MIN_status('reborn_ore');
    }
    //更新当前地点的缓存数据
    updata_MIN_place_data() {
        // if (is_Empty_Object(this.MIN_place_ores[this.now_place])) {
        //     //没有当前地点的缓存，所以是第一次到达该地点，刷新一个矿石
        //     this.reborn_ore();
        // }
        //当前地点不能挖矿，不需要处理
        if (!places[this.now_place].live_plan_flag[2]) {
            return;
        }
        //获取当前矿石信息，保存到地点缓存里
        let obj = this.ore_manage.get_ore_data();
        this.MIN_place_ores[this.now_place] = obj;
    }
    //获取挖矿攻击进度比例
    get_attack_ratio() {
        if (this.now_MIN_status == MIN_status.REST_MIN) {
            return '0%';
        } else {
            return (this.now_round_time / (this.true_MIN_interval * 1000)) * 100 + '%';
        }
    }
    //获取矿石复活进度比例
    get_ore_reborn_ratio() {
        let max_reborn_time = places[this.now_place].MIN_reborn_time; //当前地点规定的矿石复活时间
        let ore_death_time = this.ore_manage.death_time; //上一个矿石死亡的时间
        let now_reborn_time = this.now_time - ore_death_time; //这个矿石现在复活了多久
        return (now_reborn_time / (max_reborn_time * 1000)) * 100 + '%';
    }
    //获取最终挖矿攻击力
    get_true_MIN_attack() {
        //基础挖矿攻击
        let MIN_attack = this.player_end_attr['MIN_attack'];
        //直接加算增幅
        let attack_add = 0;

        //获取所有直接乘算增幅
        let damage_add = 0;
        //武器类型伤害增幅
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let damage_attr_name = 'MIN_damage_' + weapon_type;
            if (!is_Empty_Object(this.player_end_attr[damage_attr_name])) {
                damage_add += this.player_end_attr[damage_attr_name];
            }
        }

        //获取所有最终乘算增幅
        let end_MIN_attack_ratio = this.player_end_attr['end_MIN_attack_ratio'];

        let true_MIN_attack = calculate_num_attr(MIN_attack, attack_add, damage_add, 0, end_MIN_attack_ratio);
        return true_MIN_attack;
    }
    //获取当前挖一次矿需要消耗的精力
    get_true_MIN_ene() {
        //挖掘当前矿石必要的精力消耗
        let MIN_energy = this.ore_manage.get_MIN_energy();
        //挖矿时选择的主动技能的消耗
        return MIN_energy;
    }

    //获取最终挖矿伤害
    get_MIN_damage() {
        let MIN_damage = this.true_MIN_attack;
        //暴击结算
        let random_manage = global.get_random_manage(); //随机数管理类
        if (random_manage.try_number_random(this.true_MIN_critical_chance)) {
            MIN_damage = MIN_damage * (this.true_MIN_critical_damage * 0.01);
        }

        return MIN_damage;
    }
    //获取最终挖矿间隔
    get_true_MIN_interval() {
        //基础挖矿间隔
        let base_MIN_interval = this.player_end_attr['MIN_interval'];

        //累加所有挖矿攻速加成
        let MIN_speed = this.player_end_attr['MIN_speed']; //结算完的常态挖矿攻速
        if (MIN_speed === undefined) {
            MIN_speed = 0;
        }
        //武器类型的挖矿攻速加成
        for (let weapon_type of this.player_end_attr['weapon_type']) {
            let speed_attr_name = 'MIN_speed_' + weapon_type;
            if (!is_Empty_Object(this.player_end_attr[speed_attr_name])) {
                MIN_speed += this.player_end_attr[speed_attr_name];
            }
        }

        //最终挖矿攻速加成
        let end_MIN_speed = this.player_end_attr['end_MIN_speed']; //结算完的常态挖矿攻速
        if (end_MIN_speed === undefined) {
            end_MIN_speed = 0;
        }

        //结算挖矿间隔
        let true_MIN_interval = calculate_speed_attr(base_MIN_interval, 0, MIN_speed, 0, end_MIN_speed);
        return true_MIN_interval;
    }
    //矿石刚刚复活时，将新复活的矿石的信息展示出来
    show_new_ore_div() {
        //矿石的名称
        let ore_id = this.ore_manage.get_ore_id();
        let ore_head = document.getElementById('ore_head');
        ore_head.innerHTML = enemys[ore_id].name;
        ore_head.dataset.statu = 'true';
        //矿石的掉落物
        let drop_item_arry = new Array();
        //遍历每一级
        for (let level in enemys[ore_id].reward_level_item) {
            //每一级奖励中可能有多组掉落列表，遍历每一个掉落列表
            let level_item_array = enemys[ore_id].reward_level_item[level];
            for (let drop_array of level_item_array) {
                //每个掉落列表里有多个可能的掉落物，获取所有掉落物
                for (let item_id in drop_array.items) {
                    drop_item_arry.push(item_id);
                }
            }
        }
        drop_item_arry = get_uniqueArr(drop_item_arry);
        //将掉落物展示到界面里
        let MIN_drop_table_value_div = document.getElementById('MIN_drop_table_value_div');
        MIN_drop_table_value_div.replaceChildren(); //清空现有展示的物品
        for (let item_key of drop_item_arry) {
            let id = item_key.split(':')[0];
            let drop_value = addElement(MIN_drop_table_value_div, 'div', null, 'drop_value');
            drop_value.innerHTML = items[id].name;
        }
        //矿石的血条回满
        let ore_blood_bar = document.getElementById('ore_blood_bar');
        ore_blood_bar.children[0].children[0].style.width = '100%';
        //矿石复活进度条归零
        let ore_reborn_bar = document.getElementById('MIN_MR_bar');
        let ore_reborn_ratio = this.get_ore_reborn_ratio();
        ore_reborn_bar.children[0].children[0].style.width = '0%';
    }

    //实时监测精力，恢复好就切换到其他挖矿状态
    monitor_energy_change_MIN_status() {
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        if (this.now_MIN_status == MIN_status.ENERGY_MIN) {
            //精力掉到49%以内时切换为精力不足且挖矿
            if (surface_energy_ratio < 50) {
                this.now_MIN_status = MIN_status.NO_ENERGY_MIN;
            }
        } else if (this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
            //精力不足且挖矿在一个矿石挖矿完成时自动切换成休息
        } else if (this.now_MIN_status == MIN_status.REST_MIN) {
            //精力不足且休息状态在精力回满的时候切换到其他挖矿状态
            if (P_attr.judge_player_attr_max('surface_energy_point')) {
                let global_flag_manage = global.get_global_flag_manage();
                if (surface_energy_ratio >= 50) {
                    //精力充足
                    this.now_MIN_status = MIN_status.ENERGY_MIN;
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'mining');
                } else if (surface_energy_ratio >= 25 && surface_energy_ratio < 50) {
                    //精力不太足
                    this.now_MIN_status = MIN_status.NO_ENERGY_MIN;
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'mining');
                } else if (surface_energy_ratio < 25) {
                    //精力不足，不能挖矿
                    this.stop_game_statu();
                    global_flag_manage.set_game_log('live_skill_run', 'max_energy_2', 'mining');
                }
            }
        }
    }
    //获取挖矿状态
    get_now_MIN_status() {
        return this.now_MIN_status;
    }
    //根据当前情况调整挖矿状态
    updata_now_MIN_status(func_type) {
        //当前精力比例
        let P_attr = player.get_player_attributes();
        let surface_energy_ratio = P_attr.get_data_attr('surface_energy_ratio');
        //精力是否满了
        let energy_max_flag = P_attr.judge_player_attr_max('surface_energy_point');
        //矿石存活状态
        let ore_statu = this.ore_manage.get_ore_statu();
        //更新前的挖矿状态
        let old_MIN_statu = this.now_MIN_status;

        //移动到新地点函数
        if (func_type == 'set_new_place') {
            //主要有两个情况，一是读取存档时，二是移动到可以挖矿的地点
            //由于此刻时间不会主动向前，需要考虑矿石复活、精力回满的情况
            if (ore_statu) {
                //矿石活着
                if (this.now_MIN_status == MIN_status.R_ORE_NO_MIN) {
                    this.now_MIN_status = MIN_status.NO_MIN;
                }
                if (this.now_MIN_status == MIN_status.R_ORE_MIN) {
                    if (surface_energy_ratio >= 50) {
                        this.now_MIN_status = MIN_status.ENERGY_MIN; //正在挖矿并且精力充足
                    } else {
                        this.now_MIN_status = MIN_status.NO_ENERGY_MIN; //正在挖矿并且精力不足
                    }
                }
            } else {
                //矿石死了，正在复活
            }
        }
        //地点变化时，对挖矿界面特殊更新
        if (func_type == 'updata_super_game_div') {
            //如果新地点可以挖矿，则在之前的set_new_place函数已经完成了状态更新，此时不会调到这个函数
            //如果新地点不可挖矿，游戏状态都会退出，挖矿状态无条件改成停止挖矿
            this.now_MIN_status = MIN_status.NO_MIN;
        }
        //停止挖矿状态
        if (func_type == 'stop_game_statu') {
            //主要有3个情况，按下停止挖矿按钮；同一地点切换到其他生活技能界面；地点移动
            //如果是停止挖矿按钮，应该基于矿石存活状态切换到不挖矿
            //如果是切换到其他生活技能界面，应该基于矿石存活状态切换到不挖矿
            //如果是地点移动，应该无条件停止挖矿，之后根据新地点的矿石状态切换，那时有set_new_place函数
            if (ore_statu) {
                //矿石活着
                this.now_MIN_status = MIN_status.NO_MIN;
            } else {
                //矿石死了
                this.now_MIN_status = MIN_status.R_ORE_NO_MIN;
            }
        }
        //开始挖矿按钮
        if (func_type == 'player_start_mining') {
            //根据矿石存活状态和精力比例调整到开始挖矿的状态
            if (ore_statu) {
                //矿石活着
                if (surface_energy_ratio >= 50) {
                    this.now_MIN_status = MIN_status.ENERGY_MIN; //正在挖矿并且精力充足
                } else {
                    this.now_MIN_status = MIN_status.NO_ENERGY_MIN; //正在挖矿并且精力不足
                }
            } else {
                this.now_MIN_status = MIN_status.R_ORE_MIN; //正在挖矿并且矿石正在重生
            }
        }
        //主动更换挖矿目标
        if (func_type == 'ore_replace_reborn') {
            //重刷矿石的开始时，根据当前状态调到新状态
            if (this.now_MIN_status == MIN_status.NO_MIN) {
                this.now_MIN_status = MIN_status.R_ORE_NO_MIN;
            } else if (this.now_MIN_status == MIN_status.ENERGY_MIN || this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
                this.now_MIN_status = MIN_status.R_ORE_MIN;
            } else if (this.now_MIN_status == MIN_status.REST_MIN) {
            } else if (this.now_MIN_status == MIN_status.R_ORE_NO_MIN || this.now_MIN_status == MIN_status.R_ORE_MIN) {
                console.log('挖矿状态错误');
            }
        }
        //刷新复活一个矿石
        if (func_type == 'reborn_ore') {
            //重刷矿石的结束时，根据当前状态调到新状态
            if (this.now_MIN_status == MIN_status.ENERGY_MIN || this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
                console.log('挖矿状态错误');
            } else if (this.now_MIN_status == MIN_status.REST_MIN) {
            } else if (this.now_MIN_status == MIN_status.R_ORE_NO_MIN) {
                this.now_MIN_status = MIN_status.NO_MIN;
            } else if (this.now_MIN_status == MIN_status.R_ORE_MIN) {
                if (surface_energy_ratio >= 50) {
                    this.now_MIN_status = MIN_status.ENERGY_MIN; //正在挖矿并且精力充足
                } else {
                    this.now_MIN_status = MIN_status.NO_ENERGY_MIN; //正在挖矿并且精力不足
                }
            }
        }
        //正常挖矿过程中
        if (func_type == 'updata_live_plan_data') {
            //根据当前精力比例调到新状态
            if (this.now_MIN_status == MIN_status.ENERGY_MIN) {
                //精力掉到49%以内时切换为精力不足且挖矿
                if (surface_energy_ratio < 50) {
                    this.now_MIN_status = MIN_status.NO_ENERGY_MIN;
                }
            } else if (this.now_MIN_status == MIN_status.NO_ENERGY_MIN) {
                //精力不足且挖矿在一个矿石挖矿完成时自动切换成休息
            } else if (this.now_MIN_status == MIN_status.REST_MIN) {
                //精力不足且休息状态在精力回满的时候切换到其他挖矿状态
                if (energy_max_flag) {
                    let global_flag_manage = global.get_global_flag_manage();
                    if (surface_energy_ratio >= 50) {
                        this.now_MIN_status = MIN_status.ENERGY_MIN; //正在挖矿并且精力充足
                        global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'mining');
                    } else if (surface_energy_ratio >= 25 && surface_energy_ratio < 50) {
                        //精力不太足
                        this.now_MIN_status = MIN_status.NO_ENERGY_MIN; //正在挖矿并且精力不足
                        global_flag_manage.set_game_log('live_skill_run', 'max_energy_1', 'mining');
                    } else if (surface_energy_ratio < 25) {
                        //精力不足，不能挖矿
                        this.stop_game_statu();
                        global_flag_manage.set_game_log('live_skill_run', 'max_energy_2', 'mining');
                    }
                }
            } else if (this.now_MIN_status == MIN_status.NO_MIN) {
                console.log('挖矿状态错误');
            } else if (this.now_MIN_status == MIN_status.R_ORE_NO_MIN || this.now_MIN_status == MIN_status.R_ORE_MIN) {
                //什么都不用做，等待矿石复活时自动切换状态
            }
        }
    }
}

//清空挖矿界面
function delete_mining_div(delete_flag) {
    //矿石的名称
    let ore_head = document.getElementById('ore_head');
    if (delete_flag == 'ore_death') {
        ore_head.innerHTML = '正在搜索挖矿目标';
    } else if (delete_flag == 'move_place') {
        ore_head.innerHTML = '没有目标';
    }

    //矿石的血条
    let ore_blood_bar = document.getElementById('ore_blood_bar');
    ore_blood_bar.children[0].children[0].style.width = '100%';
    //矿石的掉落物
    let MIN_drop_table_value_div = document.getElementById('MIN_drop_table_value_div');
    MIN_drop_table_value_div.replaceChildren(); //清空现有展示的物品
    var drop_value = addElement(MIN_drop_table_value_div, 'div', null, 'drop_value');
    drop_value.innerHTML = '无';
    //玩家攻击进度条
    let player_mining_bar = document.getElementById('MIN_D_bar');
    player_mining_bar.children[0].children[0].style.width = '0%';
    //矿石复活进度条归零
    let ore_reborn_bar = document.getElementById('MIN_MR_bar');
    ore_reborn_bar.children[0].children[0].style.width = '0%';

    ore_head.dataset.statu = 'false';
}
//根据指定地点的所有矿石的刷新概率权重，随机得到一个矿石id
function get_random_chance_ore_id(place_id) {
    let MIN_ores = places[place_id].MIN_ores;
    if (is_Empty_Object(MIN_ores)) {
        //当前地点没有定义可刷的任何矿石，直接结束
        console.log('%s地点没有定义任何可刷的矿石', place_id);
        return false;
    }
    //根据权重获得id
    let random_manage = global.get_random_manage(); //随机数管理类
    let ore_id = random_manage.chance_random_get_id(MIN_ores, 'ADD_ENEMY', place_id);

    return ore_id;
}
//根据指定矿石的所有等级刷新概率权重，随机得到一个等级
function get_random_chance_ore_level(ore_id) {
    let ore_obj = enemys[ore_id];

    //根据权重获得id
    let random_manage = global.get_random_manage(); //随机数管理类
    let level = random_manage.chance_random_get_id_norare(ore_obj.reward_level_data);

    return level;
}

export {};
