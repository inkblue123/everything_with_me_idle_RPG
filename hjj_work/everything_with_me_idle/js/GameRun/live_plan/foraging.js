import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object } from '../../Function/Function.js';
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

        this.FAG_place_rare_item = new Object(); //各个采集地点的稀有对象积累数量
        this.place_FAG_items = new Object(); //地点的可采集物信息，如可采集物总数，哪些物品可以展示到掉落列表
    }
    //获取采集技能管理对象的存档
    save_foraging_manage() {
        let foraging_save = new Object();
        //获取每个子对象的存档
        //采集管理对象
        foraging_save.now_time = this.now_time;
        foraging_save.FAG_place_rare_item = this.FAG_place_rare_item;
        foraging_save.place_FAG_items = this.place_FAG_items;

        return foraging_save;
    }
    //加载采集技能存档
    load_Foraging_manage(foraging_save) {
        if (is_Empty_Object(foraging_save)) {
            return;
        }
        let now_time = global.get_game_now_time();
        let save_time = foraging_save.now_time;
        //稀有对象积累数量加载，需要将存档中的时间同步到当前时间
        this.FAG_place_rare_item = foraging_save.FAG_place_rare_item;
        for (let place_id in foraging_save.FAG_place_rare_item) {
            let save_obj = foraging_save.FAG_place_rare_item[place_id];
            let manage_obj = this.FAG_place_rare_item[place_id];

            for (let id in save_obj) {
                let save_tree_last_cumulative_time = save_time - save_obj[id].last_cumulative_time;
                manage_obj[id].last_cumulative_time = now_time - save_tree_last_cumulative_time;
            }
        }
        //可采集物信息
        this.place_FAG_items = foraging_save.place_FAG_items;
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
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        this.now_time = global.get_game_now_time();

        //读条开始采集
        this.now_round_time = this.now_time - this.round_start_time;

        if (this.now_round_time < this.true_FAG_speed * 1000) {
            //当前没有跑完攻速，不做处理
            return;
        }
        //

        //到时候了，进行一次采集行动
        //获取这次采集应该掉落几次物品
        let FAG_drop_times = this.get_FAG_drop_times();
        if (FAG_drop_times > 0) {
            //采集成功，获得采集物品
            let drop_items = this.get_foraging_item(FAG_drop_times);
            for (let key in drop_items) {
                let id = drop_items[key].id;
                let num = drop_items[key].num;
                let rarity = drop_items[key].rarity;
                player.Player_get_item(id, num, rarity);
            }
            //将掉落物更新到可采集列表中
            let ret = this.updata_foraging_place_show_drop(drop_items);
            if (ret == true) {
                //更新到游戏界面上
                this.show_foraging_drop_item_table();
            }
        }

        //记录砍了多少伤害，用于结算采集技能的经验
        // let global_flag_manage = global.get_global_flag_manage();
        // global_flag_manage.record_foraging_behavior(FAG_damage);

        //采集完毕，重置回合
        this.reset_round();
    }
    //开始采集，更新采集技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        //玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');
        let now_attack_ratio = this.get_foraging_ratio();
        if (FAG_bar.Data.attack_ratio != now_attack_ratio) {
            FAG_bar.children[0].children[0].style.width = now_attack_ratio;
            FAG_bar.Data.attack_ratio = now_attack_ratio;
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

    //获取采集攻击进度比例
    get_foraging_ratio() {
        return `${(this.now_round_time / (this.true_FAG_speed * 1000)) * 100}%`;
    }
    //清空采集界面
    delete_foraging_div() {
        //清空现有展示的内容
        let FAG_no_show_value_div = document.getElementById('FAG_no_show_value_div');
        FAG_no_show_value_div.innerHTML = '无';
        let FAG_have_show_value_div = document.getElementById('FAG_have_show_value_div');
        FAG_have_show_value_div.replaceChildren();
        //玩家攻击进度条
        let FAG_bar = document.getElementById('FAG_bar');
        FAG_bar.children[0].children[0].style.width = '0%';
        FAG_bar.Data.attack_ratio = '0%';
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
    //获取当前地点最大采集概率
    get_max_FAG_chance() {
        //地点中的最大采集概率等于当前地点可采集物品种数的一半乘100%
        //比如某地有5种可采集物品，最大概率为Math.ceil(5/2)*100%，具体数值为300%
        //表现为这个地点一次采集最多获得三个个物品
        return Math.ceil(this.place_FAG_items[this.now_place].num / 2) * 100;
    }
    //获取采集概率
    get_FAG_chance() {
        if (is_Empty_Object(places[this.now_place].FAG_defense)) {
            console.log('%s地点未定义采集防御');
            return 0;
        }
        let FAG_damage = this.get_FAG_damage(); //玩家采集力
        let FAG_defense = places[this.now_place].FAG_defense; //地点采集防御力

        let FAG_chance = parseInt((FAG_damage / FAG_defense) * 100);
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
        //借用暴击机制，充当数值随机
        if (random_manage.try_critical(end_chance)) {
            drop_times += 1;
        }
        return drop_times;
    }
    //从当前地点随机获得采集物品
    get_foraging_item(drop_times) {
        let FAG_item = places[this.now_place].FAG_item; //当前地点可采集的物品
        let random_manage = global.get_random_manage(); //随机数管理类
        //常规尝试drop_times次掉落
        let drop_item_arry = new Array();
        let rare_no_cumulative_num = 0; //稀有掉落但没有积累的次数
        for (let i = 0; i < drop_times; i++) {
            //随机获得一个物品id
            let item_id = random_manage.chance_randow_get_id(FAG_item, 'FAG_DROP', this.now_place);
            //如果随机到的物品是稀有物品，需要判断该物品在当前地点是否有积累
            if (is_Empty_Object(FAG_item[item_id].rare_flag)) {
                console.log('%s地点设定的%s采集对象没有定义稀有标记', this.now_place, item_id);
                return false;
            }
            if (FAG_item[item_id].rare_flag) {
                if (this.FAG_place_rare_item[this.now_place][item_id].cumulative_num <= 0) {
                    //如果该稀有物品没有积累，本次掉落作废，之后进行一次普通物品的掉落
                    rare_no_cumulative_num++;
                    continue;
                } else {
                    this.FAG_place_rare_item[this.now_place][item_id].cumulative_num--;
                }
            }

            //记录正常掉落物品的其他参数
            let item_obj = new Object();
            item_obj.id = item_id;
            item_obj.num = 1;
            if (items[item_id].main_type.includes('equipment')) {
                //如果掉落的是装备，还需要记录稀有度
                item_obj.rarity = FAG_item[item_id].equip_rarity; //掉落的装备的稀有度;
            }
            drop_item_arry.push(item_obj);
        }

        //补充rare_no_cumulative_num次非稀有物品掉落
        let norare_item = this.get_place_norare_item();
        for (let i = 0; i < rare_no_cumulative_num; i++) {
            let item_id = random_manage.chance_randow_get_id_norare(norare_item);
            let item_obj = new Object();
            item_obj.id = item_id;
            item_obj.num = 1;
            if (items[item_id].main_type.includes('equipment')) {
                //如果掉落的是装备，还需要记录稀有度
                item_obj.rarity = FAG_item[item_id].equip_rarity; //掉落的装备的稀有度;
            }
            drop_item_arry.push(item_obj);
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
    //获取当前地点没有稀有对象的可采集物品列表
    get_place_norare_item() {
        let FAG_item = places[this.now_place].FAG_item; //当前地点可采集的物品
        let norare_item = new Object();
        for (let id in FAG_item) {
            if (!FAG_item[id].rare_flag) {
                norare_item[id] = FAG_item[id];
            }
        }
        return norare_item;
    }
    //更新当前地点的稀有对象积累情况
    updata_foraging_place_rare_item() {
        let FAG_items = places[this.now_place].FAG_item;
        if (is_Empty_Object(this.FAG_place_rare_item[this.now_place])) {
            //没有当前地点的缓存，生成缓存数据
            let obj = new Object();
            for (let id in FAG_items) {
                //不稀有的对象不需要记录缓存
                if (!FAG_items[id].rare_flag) continue;

                //
                obj[id] = new Object();
                obj[id].cumulative_num = FAG_items[id].max_cumulative_num;
                obj[id].last_cumulative_time = this.now_time;
            }
            this.FAG_place_rare_item[this.now_place] = obj;
        } else {
            let obj = this.FAG_place_rare_item[this.now_place];
            //当前地点已有缓存，更新一遍
            for (let id in obj) {
                if (obj[id].cumulative_num >= FAG_items[id].max_cumulative_num) {
                    //该对象堆积数量已经满了，更新时间
                    obj[id].last_cumulative_time = this.now_time;
                } else {
                    //这对象没积累满，检查是否到了积累时间
                    let cumulative_time = (this.now_time - obj[id].last_cumulative_time) / 1000;
                    if (cumulative_time >= FAG_items[id].cumulative_time) {
                        obj[id].cumulative_num++;
                        obj[id].last_cumulative_time = this.now_time;
                    }
                }
            }
        }
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
        let all_num = this.place_FAG_items[this.now_place].num;
        for (let id in this.place_FAG_items[this.now_place].show_flag) {
            if (this.place_FAG_items[this.now_place].show_flag[id]) {
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
            for (let id in this.place_FAG_items[this.now_place].show_flag) {
                if (this.place_FAG_items[this.now_place].show_flag[id] == false) {
                    continue;
                }

                let FAG_drop_value = addElement(FAG_have_show_value_div, 'div', null, 'FAG_drop_value');
                if (items[id].main_type.includes('equipment')) {
                    //如果掉落的是装备，改变字体颜色变成稀有度的颜色
                    FAG_drop_value.style.color = hex2Rgba(enums[rarity].rarity_color, alpha);
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
        if (!is_Empty_Object(this.place_FAG_items[this.now_place])) {
            return;
        }
        this.place_FAG_items[this.now_place] = new Object();

        let FAG_items = places[this.now_place].FAG_item;
        let obj = new Object();
        let num = 0;
        for (let id in FAG_items) {
            obj[id] = false;
            num++;
        }
        this.place_FAG_items[this.now_place].show_flag = obj;
        this.place_FAG_items[this.now_place].num = num;
    }
    //更新当前地点可采集物品列表
    updata_foraging_place_show_drop(drop_items) {
        let updata_flag = false;
        for (let key in drop_items) {
            let id = drop_items[key].id;
            if (this.place_FAG_items[this.now_place].show_flag[id] == false) {
                this.place_FAG_items[this.now_place].show_flag[id] = true;
                updata_flag = true;
            }
        }
        return updata_flag;
    }
    //更新游戏界面上的采集概率展示
    updata_FAG_chance_show() {
        let FAG_chance = this.get_FAG_chance();
        let max_FAG_chance = this.get_max_FAG_chance();

        let ch = '采集概率：' + FAG_chance + '%';
        if (FAG_chance == max_FAG_chance) {
            ch += '(MAX)';
        }
        let FAG_show_chance_div = document.getElementById('FAG_show_chance_div');
        FAG_show_chance_div.innerHTML = ch;
    }
}

export {};
