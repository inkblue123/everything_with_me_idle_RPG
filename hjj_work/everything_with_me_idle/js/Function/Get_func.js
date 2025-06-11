import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from '../GameRun/global_class.js';
import { is_Empty_Object } from './Function.js';

//根据玩家背包物品获得负重
function get_UGS_BP_weight() {
    var BP_weight = 0;
    let P_backpack = player.get_player_backpack();
    let arr = Object.keys(P_backpack); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete P_backpack[play_item_id];
        } else {
            let aitem_num = P_backpack[play_item_id].num;
            BP_weight += Math.floor(aitem_num / items[play_item_id].maxStack);
            if (aitem_num % items[play_item_id].maxStack != 0) {
                BP_weight++;
            }
        }
    }
    console.log('玩家当前背包负重%d', BP_weight);
    return BP_weight;
}

//获取一个对象中唯一的key
function get_object_only_key(obj) {
    let keys = Object.keys(obj); //将拥有的物品的key转换成一个数组
    if (keys.length != 1) {
        return false;
    }
    return keys[0];
}

export { get_UGS_BP_weight, get_object_only_key };
