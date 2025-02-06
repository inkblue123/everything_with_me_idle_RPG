import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';

//简单生成一个随机数
function get_random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_Askill_base_attr(base_attr, Player_attributes) {
    let end_attr = 0;
    for (let attr_name in base_attr) {
        let P_attr = Player_attributes.get_a_attr(attr_name);
        end_attr += P_attr * base_attr[attr_name];
    }
    return end_attr;
}
//主动技能效果计算函数1号
function Askill_algorithm_1(base_attr) {
    let end_attr = 0;
    if (base_attr <= 100) {
        end_attr = base_attr * 0.1;
    } else {
        end_attr = Math.sqrt(base_attr);
    }
    return end_attr;
}

export {
    get_random, //
    get_Askill_base_attr,
    Askill_algorithm_1,
};
