import { player } from '../Player.js';
import { items } from '../Data/Item/Item.js';

//获取背包界面激活的过滤条件
function get_BP_type() {
    const radios = document.querySelectorAll('input[name="BP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}

//找到当前激活的装备栏的id
function get_EQP_switch() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    let EQP_value;
    // 找到当前激活的装备栏的id
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
        }
    }
}

//根据玩家背包物品获得负重
function get_BP_weight() {
    var BP_weight = 0;
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete player.backpack_items[play_item_id];
        } else {
            let aitem_num = player.backpack_items[play_item_id].num;
            BP_weight += Math.floor(aitem_num / items[play_item_id].maxStack);
            if (aitem_num % items[play_item_id].maxStack != 0) {
                BP_weight++;
            }
        }
    }
    console.log('玩家当前背包负重%d', BP_weight);
    return BP_weight;
}

export { get_BP_type, get_EQP_switch, get_BP_weight };
