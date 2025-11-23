import { is_Empty_Object } from '../Function/Function.js';
import { format_numbers, get_random } from '../Function/math_func.js';
import { places } from '../Data/Place/Place.js';
import { enemys } from '../Data/Enemy/Enemy.js';

//稀有游戏内容保底管理对象
class Rare_manage {
    constructor() {}
    //初始化一个稀有游戏对象
    init_rare(key, drop_chance) {
        if (!is_Empty_Object(this[key])) {
            return;
        }
        this[key] = new Object();
        // this[key].last_drop_time = global.get_game_now_time(); //上次掉落时间
        this[key].floors_try_num = 0; //保底尝试次数
        this[key].floors_drop_chance = 0; //保底掉落概率
        this[key].expecta_num = Math.floor(1 / drop_chance); //期望掉落次数
        this[key].expecta_drop_chance = drop_chance; //期望掉落概率
    }
    //给指定稀有对象增加保底参数
    add_rare_floors(key) {
        if (is_Empty_Object(this[key])) {
            console.log('未初始化%s对象，无法管理保底参数', key);
            return;
        }
        let rare_obj = this[key];
        rare_obj.floors_try_num++; //保底尝试次数

        let floors_num = rare_obj.floors_try_num; //保底尝试次数
        let EX_num = rare_obj.expecta_num; //期望掉落次数
        let EX_chance = rare_obj.expecta_drop_chance; //保底尝试次数

        let floors_chance = (EX_chance * floors_num * 2) / EX_num;
        rare_obj.floors_drop_chance = floors_chance; //保底掉落概率
    }
    //重置指定的稀有对象的保底参数
    reset_rare(key) {
        if (is_Empty_Object(this[key])) {
            console.log('未初始化%s对象，无法管理保底参数', key);
            return;
        }
        let rare_obj = this[key];
        rare_obj.floors_try_num = 0; //保底尝试次数
        rare_obj.floors_drop_chance = 0; //保底掉落概率
    }
    //对指定稀有对象执行一次保底操作
    try_floors(key) {
        if (is_Empty_Object(this[key])) {
            console.log('未初始化%s对象，无法管理保底参数', key);
            return;
        }
        let rare_obj = this[key];
        //保底次数达到期望
        if (rare_obj.floors_try_num >= rare_obj.expecta_num) {
            this.reset_rare(key);
            return true;
        }

        let random = get_random(0, 100);
        if (random < rare_obj.floors_drop_chance * 100) {
            //保底概率命中，触发保底
            this.reset_rare(key);
            return true;
        } else {
            //保底概率没中，积累更新保底次数
            this.add_rare_floors(key);
            return false;
        }
    }
}
//暴击管理类
class Number_manage {
    constructor() {}
    //用宏观暴击率计算真暴击率
    get_true_chance(x, n) {
        let y = 0;
        if (x >= 0 && x < 85) {
            y = 0.011 * x ** 2 + 0.05 * x;
        } else if (x >= 85 && x <= 100) {
            y = 1.14 * x - 13.7;
        }

        let true_critical_chance = y * n;
        return true_critical_chance;
    }
    //尝试进行一次概率为chance的数值随机
    try_number_random(chance) {
        //对概率格式化
        if (typeof chance === 'string') {
            chance = parseInt(chance);
        }
        if (chance <= 0) {
            return false;
        } else if (chance >= 100) {
            return true;
        } else if (chance > 0 && chance < 100) {
            if (chance < 0.0001) {
                console.log('要随机的概率低于百万分级，必定失败，精确度可能需要升级了');
            }
            let key = chance.toFixed(4);
            if (is_Empty_Object(this[key])) {
                this[key] = 0;
            }
            //尝试次数+1
            this[key]++;
            //获取真概率
            let true_chance = this.get_true_chance(chance, this[key]);
            let random = Math.random() * 100;
            if (random <= true_chance) {
                //成功
                this[key] = 0;
                return true;
            } else {
                //失败
                return false;
            }
        } else {
            console.log('暴击随机失败，未知暴击率参数%s', chance);
        }
    }
}
//随机数相关的对象
export class Random_manage {
    constructor() {
        this.rare_manage = new Rare_manage(); //稀有游戏内容管理对象
        this.number_manage = new Number_manage(); //数值随机管理对象
    }
    //获取随机数管理对象的存档
    save_Random_manage() {
        let Random_save = new Object();
        //稀有游戏内容管理对象
        Random_save.rare_manage_save = this.rare_manage;
        //暴击管理部分可以不用保存
        Random_save.number_manage_save = this.number_manage;

        return Random_save;
    }
    //加载随机数管理对象存档
    load_Random_manage(Random_save) {
        if (is_Empty_Object(Random_save)) {
            return;
        }
        //稀有游戏内容管理对象
        for (let key in Random_save.rare_manage_save) {
            this.rare_manage[key] = Random_save.rare_manage_save[key];
        }
    }
    //在稀有对象管理类中初始化指定稀有对象
    //drop_arr是稀有对象所在的随机数组，随机方式为权重随机
    init_rare_manage(rare_arr, drop_arr, thing_flag, father_id) {
        //获取总权重
        let all_chance = 0;
        for (let item_key in drop_arr) {
            all_chance += drop_arr[item_key].chance;
        }
        //将rare_arr中的每个id都初始化到管理类中
        for (let item_key of rare_arr) {
            let key = item_key + '_' + thing_flag + '_' + father_id;
            let drop_chance = drop_arr[item_key].chance / all_chance;

            this.rare_manage.init_rare(key, drop_chance);
        }
    }
    //从队列里寻找稀有对象
    get_rare_arr(arr) {
        let rare_arr = new Array();
        //情况1：如果有“稀有标签”成员，以标签为准
        let if_def_rare_flag = false; //是否定义了稀有标签
        for (let item_key in arr) {
            if (arr[item_key].rare_flag == undefined) {
                continue;
            }
            if_def_rare_flag = true;
            if (arr[item_key].rare_flag) {
                rare_arr.push(item_key);
            }
        }
        //检测到定义了稀有标签，
        if (if_def_rare_flag) {
            return rare_arr;
        }

        //情况2：计算每个对象的期望概率，概率小于等于5%的视作稀有对象
        let all_chance = 0;
        for (let item_key in arr) {
            all_chance += arr[item_key].chance;
        }
        for (let item_key in arr) {
            if (arr[item_key].chance / all_chance < 0.05) {
                rare_arr.push(item_key);
            }
        }
        return rare_arr;
    }
    //从掉落对象里按照权重随机获得一个key
    chance_random_get_id(drop_obj, thing_flag, father_id) {
        //按照权重随机，先得到一个正常随机结果
        let item_key = get_obj_chance_random_id(drop_obj);

        //寻找队列里的稀有对象
        let rare_arr = this.get_rare_arr(drop_obj);
        //没有稀有对象，不需要处理保底，直接返回权重随机的结果
        if (is_Empty_Object(rare_arr)) {
            return item_key;
        }
        //初始化稀有对象的保底信息
        this.init_rare_manage(rare_arr, drop_obj, thing_flag, father_id);

        if (rare_arr.includes(item_key)) {
            //随机的结果是稀有对象，重置该对象的保底计数，更新其他对象的保底计数
            for (let rare_id of rare_arr) {
                let key = rare_id + '_' + thing_flag + '_' + father_id;
                if (rare_id == item_key) {
                    this.rare_manage.reset_rare(key);
                } else {
                    this.rare_manage.add_rare_floors(key);
                }
            }
        } else {
            //随机的结果不是稀有对象，尝试触发保底
            let floors_flag = false;
            for (let rare_id of rare_arr) {
                let key = rare_id + '_' + thing_flag + '_' + father_id;

                if (floors_flag == true) {
                    this.add_rare_floors(key);
                    continue;
                }
                if (this.rare_manage.try_floors(key)) {
                    //有一个对象成功触发保底，将本次随机的结果改成这个稀有对象，并更新其他对象
                    floors_flag = true;
                    item_key = rare_id;
                }
            }
        }
        return item_key;
    }
    //从drop_arr里按照权重随机获得一个id，不涉及稀有对象和保底
    chance_random_get_id_norare(drop_obj) {
        return get_obj_chance_random_id(drop_obj);
    }
    //敌人死亡，在指定掉落列表里返回一个物品id
    get_enemy_death_item_id(enemy_id, arr_id) {
        let items = enemys[enemy_id].item_array[arr_id].items;
        let father_id = enemy_id + '_' + arr_id;
        let item_id = this.chance_random_get_id(items, 'ENEMY_DEATH_DROP', father_id);
        return item_id;
    }
    //伐木敌人死亡，在指定等级的指定掉落列表里返回一个物品id
    get_tree_death_item_id(tree_id, reward_level, arr_id) {
        // let items = enemys[tree_id].item_array[arr_id].items;
        let items = enemys[tree_id].reward_level_item[reward_level][arr_id].items;
        let father_id = tree_id + '_' + reward_level + '_' + arr_id;
        let item_id = this.chance_random_get_id(items, 'ENEMY_DEATH_DROP', father_id);
        return item_id;
    }
    //尝试进行一次数值随机
    try_number_random(chance) {
        return this.number_manage.try_number_random(chance);
    }
}

//输入随机目标对象数组，根据每个对象的权重，随机得到某个对象的id
function get_obj_chance_random_id(arr) {
    let all_chance = 0;
    for (let item_key in arr) {
        all_chance += arr[item_key].chance;
    }
    let chance = get_random(0, all_chance);
    let item_key;
    for (item_key in arr) {
        if (chance > arr[item_key].chance) {
            chance -= arr[item_key].chance;
        } else {
            break;
        }
    }
    return item_key;
}
//输入权重数组，根据权重随机得到数组序号
// function get_arr_chance_random_num(arr) {
//     let all_chance = 0;
//     for (let chance of arr) {
//         all_chance += chance;
//     }
//     let chance = get_random(0, all_chance);
//     let item_key;
//     for (item_key in arr) {
//         if (chance > arr[item_key]) {
//             chance -= arr[item_key];
//         } else {
//             break;
//         }
//     }
//     return item_key;
// }
