import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';

//简单生成一个随机数
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
//将玩家属性折算成一个结果
function get_Askill_base_attr(base_attr, player_end_attr) {
    let end_attr = 0;
    for (let attr_name in base_attr) {
        let P_attr = player_end_attr[attr_name];
        end_attr += P_attr * base_attr[attr_name];
    }
    return end_attr;
}
//根据刷怪位置随机获得敌人距离参数
function get_random_enemy_distance(place_x, place_y) {
    let min;
    let max;
    if (place_x == 'near_enemy_field') {
        //在近距离区域的敌人
        min = 0;
        max = 99;
        if (place_y % 3 == 0) {
            min = 0;
            max = 29;
        } else if (place_y % 3 == 1) {
            min = 30;
            max = 59;
        } else if (place_y % 3 == 2) {
            min = 60;
            max = 99;
        }
    }
    if (place_x == 'in_enemy_field') {
        //在中距离区域的敌人
        min = 100;
        max = 199;
        if (place_y % 3 == 0) {
            min = 100;
            max = 129;
        } else if (place_y % 3 == 1) {
            min = 130;
            max = 159;
        } else if (place_y % 3 == 2) {
            min = 160;
            max = 199;
        }
    }
    if (place_x == 'far_enemy_field') {
        //在远距离区域的敌人
        min = 200;
        max = 300;
        if (place_y % 3 == 0) {
            min = 200;
            max = 229;
        } else if (place_y % 3 == 1) {
            min = 230;
            max = 259;
        } else if (place_y % 3 == 2) {
            min = 260;
            max = 300;
        }
    }
    return get_random(min, max);
}
//主动技能效果计算函数1号
function Askill_algorithm_1(base_attr, Attack_effect) {
    if (base_attr <= 100) {
        Attack_effect.base_damage = base_attr * 0.1;
    } else {
        Attack_effect.base_damage = Math.sqrt(base_attr);
    }
    return Attack_effect;
}

export {
    get_random, //
    get_Askill_base_attr,
    get_random_enemy_distance,
    Askill_algorithm_1,
};
