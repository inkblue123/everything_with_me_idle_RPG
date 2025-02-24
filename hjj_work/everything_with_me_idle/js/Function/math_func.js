import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';

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

//主动技能效果计算函数1号
function Askill_algorithm_1(base_attr, Attack_effect) {
    //只支持0-1000范围内的属性
    if (base_attr > 1000) {
        base_attr = 1000;
    }
    if (base_attr <= 100) {
        //每点属性+0.1补正伤害
        Attack_effect.base_damage = base_attr * 0.1;
    } else if (base_attr > 100 && base_attr <= 1000) {
        //属性开根号得到补正伤害
        Attack_effect.base_damage = Math.sqrt(base_attr);
    }
    return Attack_effect;
}
//主动技能效果计算函数
function Askill_effect_algorithm(id, base_attr, Attack_effect) {
    switch (id) {
        case 1: //1号函数，
            Askill_algorithm_1(base_attr, Attack_effect);
            break;

        default:
            break;
    }
}
//技能升级经验需求计算函数1号
function skill_levelup_exp_1(base_exp, now_level) {
    //基数base_exp等于10的时候，
    //等级       1  2  3  4  5  6  7   8   9   10
    //经验需求   10 15 22 33 50 75 113 170 256 384
    if (now_level <= 0) now_level = 1;
    let levelup_exp = Math.floor(base_exp * Math.pow(1.5, now_level - 1));
    return levelup_exp;
}
//技能升级经验需求计算函数
function skill_levelup_exp_algorithm(id, base_exp, now_level) {
    let levelup_exp;
    switch (id) {
        case 1: //1号函数
            levelup_exp = skill_levelup_exp_1(base_exp, now_level);
            break;

        default:
            break;
    }
    return levelup_exp;
}
// for (let i = 0; i <= 10; i++) {
//     let levelup_exp = skill_levelup_exp_1(10, i);
//     console.log(levelup_exp);
// }

export {
    get_random, //
    get_Askill_base_attr,
    get_random_enemy_distance,
    Askill_effect_algorithm,
    skill_levelup_exp_algorithm,
};
