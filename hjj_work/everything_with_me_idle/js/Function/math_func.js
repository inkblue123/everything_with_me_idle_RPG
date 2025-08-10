import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';

// 技能升级经验需求计算函数
const skill_levelup_exp_func = {
    1: skill_levelup_exp_1,
    2: skill_levelup_exp_2,
    3: skill_levelup_exp_3,
};
// 技能的常态等级加成具体数值计算函数
const skill_rewards_func = {
    1: skill_rewards_1,
    2: skill_rewards_2,
    // 3: skill_rewards_3,
};

//简单生成一个随机数
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//将玩家属性折算成一个结果
function get_Askill_base_attr(attr_correct, player_end_attr) {
    let end_attr = 0;
    for (let attr_name in attr_correct) {
        let P_attr = player_end_attr[attr_name];
        end_attr += P_attr * attr_correct[attr_name];
    }
    return end_attr;
}
//格式化输入，将里面的数字四舍五入取整
function format_numbers(input) {
    // 处理基本类型
    if (typeof input === 'number') {
        return Math.round(input);
    }

    if (typeof input !== 'object' || input === null) {
        return input; // 字符串、布尔值等直接返回
    }

    // 处理数组
    if (Array.isArray(input)) {
        return input.map((item) => formatNumbers(item));
    }

    // 处理对象
    const result = {};
    for (const key in input) {
        if (input.hasOwnProperty(key)) {
            const value = input[key];

            if (typeof value === 'number') {
                // 对数字进行四舍五入取整
                result[key] = Math.round(value);
            } else if (typeof value === 'object' && value !== null) {
                // 递归处理嵌套对象或数组
                result[key] = formatNumbers(value);
            } else {
                // 其他类型（字符串、布尔值等）直接保留
                result[key] = value;
            }
        }
    }

    return result;
}
//根据刷怪位置随机获得敌人距离参数
function get_random_enemy_distance(place_x, place_y) {
    let min;
    let max;
    if (place_x == 'little_distance') {
        //在近距离区域的敌人
        min = 0;
        max = 100;
        if (place_y % 3 == 0) {
            min = 0;
            max = 30;
        } else if (place_y % 3 == 1) {
            min = 31;
            max = 60;
        } else if (place_y % 3 == 2) {
            min = 61;
            max = 100;
        }
    }
    if (place_x == 'middle_distance') {
        //在中距离区域的敌人
        min = 101;
        max = 200;
        if (place_y % 3 == 0) {
            min = 101;
            max = 130;
        } else if (place_y % 3 == 1) {
            min = 131;
            max = 160;
        } else if (place_y % 3 == 2) {
            min = 161;
            max = 200;
        }
    }
    if (place_x == 'remote_distance') {
        //在远距离区域的敌人
        min = 201;
        max = 300;
        if (place_y % 3 == 0) {
            min = 201;
            max = 230;
        } else if (place_y % 3 == 1) {
            min = 231;
            max = 260;
        } else if (place_y % 3 == 2) {
            min = 261;
            max = 300;
        }
    }
    return get_random(min, max);
}

//攻击技能效果计算函数
function Attack_effect_algorithm(id, base_attr, Attack_effect) {
    let data;
    switch (id) {
        case 1: //1号函数，
            data = Askill_algorithm_1(base_attr);
            Attack_effect.base_damage = data;
            break;

        default:
            break;
    }
}
//防御技能效果计算函数
function Defense_effect_algorithm(skill_data, base_attr, Defense_effect) {
    let data = 0;
    switch (skill_data.algorithm) {
        case 1: //1号函数
            data = Askill_algorithm_1(base_attr);
            break;

        default:
            break;
    }
    let skill_effect = skill_data.effect;
    Defense_effect.defense_type = skill_effect.defense_type;
    Defense_effect.defense_num = skill_effect.defense_num;
    if (skill_effect.defense_type == 'damage_reduction') {
        Defense_effect.DR_math_type = skill_effect.DR_math_type;
        if (skill_effect.DR_math_type == 'num') {
            Defense_effect.DR_num = data;
        } else if (skill_effect.DR_math_type == 'ratio') {
            Defense_effect.DR_ratio = data;
        }
    }
}
//主动技能效果计算函数1号
function Askill_algorithm_1(base_attr) {
    let end_data;
    //只支持0-1000范围内的属性
    if (base_attr > 1000) {
        base_attr = 1000;
    }
    if (base_attr <= 100) {
        //每点属性+0.1补正伤害
        end_data = base_attr * 0.1;
    } else if (base_attr > 100 && base_attr <= 1000) {
        //属性开根号得到补正伤害
        end_data = Math.sqrt(base_attr);
    }
    return end_data;
}

//技能升级经验需求计算函数
function skill_levelup_exp_algorithm(id, base_exp, now_level) {
    const func = skill_levelup_exp_func[id];
    if (!func) {
        console.log('技能升级经验需求计算函数没有定义 %d', id);
    }
    return func(base_exp, now_level);

    // let levelup_exp;
    // switch (id) {
    //     case 1: //1号函数
    //         levelup_exp = skill_levelup_exp_1(base_exp, now_level);
    //         break;
    //     case 2: //2号函数
    //         levelup_exp = skill_levelup_exp_2(base_exp, now_level);
    //         break;
    //     case 3: //3号函数
    //         levelup_exp = skill_levelup_exp_3(base_exp, now_level);
    //         break;

    //     default:
    //         break;
    // }
    // return levelup_exp;
}
//技能升级经验需求计算函数1号，系数为1.5的指数函数
function skill_levelup_exp_1(base_exp, now_level) {
    //基数base_exp等于10的时候，
    //等级       1  2  3  4  5  6  7   8   9   10
    //经验需求   10 15 22 33 50 75 113 170 256 384
    if (now_level <= 0) now_level = 1;
    let levelup_exp = base_exp * Math.pow(1.5, now_level - 1);
    return Math.floor(levelup_exp);
}
//技能升级经验需求计算函数2号，系数为1的一次函数
function skill_levelup_exp_2(base_exp, now_level) {
    //基数base_exp等于10的时候
    //等级       1  2  3  4  5  6  7   8   9   10
    //经验需求   10 20 30 40 50 60 70  80  90  100
    if (now_level <= 0) now_level = 1;
    let levelup_exp = base_exp * now_level;
    return Math.floor(levelup_exp);
}
//技能升级经验需求计算函数3号
function skill_levelup_exp_3(base_exp, now_level) {
    //基数base_exp等于10的时候
    //等级       1  2  3  4   5   6   7   8   9  10
    //经验需求   10 23 41 67 101 146 207 285 388 520
    if (now_level <= 0) now_level = 1;
    let levelup_exp = base_exp * Math.pow(1.2, now_level - 1);
    levelup_exp = levelup_exp * (now_level - 1) * 1.1 + base_exp;
    return Math.floor(levelup_exp);
}
//技能的常态等级加成具体数值计算函数
function skill_rewards_algorithm(id, now_level) {
    const func = skill_rewards_func[id];
    if (!func) {
        console.log('技能的常态等级加成具体数值计算函数没有定义 %d', id);
    }
    return func(now_level);
}
//技能的常态等级加成计算函数1号
function skill_rewards_1(now_level) {
    //等级  0  1   2   3   4   5   6   7    8   9   10
    //加成  1 1.2 1.4 1.5 1.6 1.7 1.8 1.85 1.9 1.95 2.0
    //加成  0 20   40  50  60  70  80  85   90  95  100

    if (now_level <= 0) {
        return 0;
    } else if (now_level >= 1 && now_level <= 2) {
        return now_level * 20;
    } else if (now_level >= 3 && now_level <= 6) {
        return 20 + now_level * 10;
    } else if (now_level >= 7 && now_level <= 10) {
        return 50 + now_level * 5;
    } else if (now_level > 10) {
        return 100;
    }
}
//技能的常态等级加成计算函数2号
function skill_rewards_2(now_level) {
    //等级  0  1  2  3  4  5  6  7  8  9  10
    //加成  0  5  10 15 20 25 30 35 40 45 50
    if (now_level <= 0) {
        return 0;
    } else {
        return now_level * 5;
    }
}
export {
    get_random, //
    get_Askill_base_attr,
    get_random_enemy_distance,
    Attack_effect_algorithm,
    Defense_effect_algorithm,
    skill_levelup_exp_algorithm,
    skill_rewards_algorithm,
    format_numbers,
};
