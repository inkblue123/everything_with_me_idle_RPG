import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';

//简单生成一个随机数
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_Askill_base_attr(base_attr, player_end_attr) {
    let end_attr = 0;
    for (let attr_name in base_attr) {
        let P_attr = player_end_attr.attr_name;
        end_attr += P_attr * base_attr[attr_name];
    }
    return end_attr;
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
function Askill_algorithm(i, base_attr, Attack_effect) {
    switch (i) {
        case 1:
            Askill_algorithm_1(base_attr, Attack_effect);
            break;

        default:
            break;
    }
    return Attack_effect;
}

export {
    get_random, //
    get_Askill_base_attr,
    Askill_algorithm_1,
};
