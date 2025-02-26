import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from '../GameRun/global_class.js';
import { isEmptyObject } from './Function.js';

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

//获取一个对象中唯一的key
function get_object_only_key(obj) {
    let keys = Object.keys(obj); //将拥有的物品的key转换成一个数组
    if (keys.length != 1) {
        return false;
    }
    return keys[0];
}
//获取指定装备栏里的6个展示框
function get_EQP_data(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //获取装备栏的具体组件
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_div_data = new Object();
    EQP_div_data['main_hand'] = EQP_column_div.children[0].children[0].children[0]; //主手位置;
    EQP_div_data['deputy'] = EQP_column_div.children[0].children[2].children[0]; //副手位置
    EQP_div_data['head'] = EQP_column_div.children[0].children[1].children[0]; //头部位置
    EQP_div_data['chest'] = EQP_column_div.children[0].children[1].children[1]; //胸部位置
    EQP_div_data['legs'] = EQP_column_div.children[0].children[1].children[2]; //腿部位置
    EQP_div_data['feet'] = EQP_column_div.children[0].children[1].children[3]; //脚部位置
    return EQP_div_data;
}
//获取指定装备栏里的一个具体位置的展示框
function get_EQP_wp_data(EQP_column, wp) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //获取装备栏的具体组件
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_wp_data = new Object();
    if (enums.wearing_position.includes(wp)) {
        //位置合法
        switch (wp) {
            case 'main_hand':
                EQP_wp_data = EQP_column_div.children[0].children[0].children[0]; //主手位置;
                break;
            case 'deputy':
                EQP_wp_data = EQP_column_div.children[0].children[2].children[0]; //副手位置
                break;
            case 'head':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[0]; //头部位置
                break;
            case 'chest':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[1]; //胸部位置
                break;
            case 'legs':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[2]; //腿部位置
                break;
            case 'feet':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[3]; //脚部位置
                break;

            default:
                break;
        }
    }
    return EQP_wp_data;
}
//获取当前战斗场地里的敌人数量
function get_combat_place_enemynum(enemy_id) {
    let enemy_num = 0;
    let place_manage = global.get_place_manage();
    let enemy_field = place_manage.get_combat_place_enemys();
    for (let key in enemy_field) {
        let field = enemy_field[key];

        for (let i = 0; i < 9; i++) {
            if (field[i].statu) {
                if (!enemy_id) {
                    //如果没指定敌人id，获取全部敌人的数量
                    enemy_num++;
                } else if (enemy_slot.id == enemy_id) {
                    //获取指定id的敌人数量
                    enemy_num++;
                }
            }
        }
    }
    return enemy_num;
}
//获取主动技能规划界面的过滤条件
function get_ASP_type() {
    const radios = document.querySelectorAll('input[name="ASP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}

export {
    get_BP_type,
    get_EQP_switch,
    get_BP_weight,
    get_object_only_key,
    get_EQP_data,
    get_EQP_wp_data,
    get_combat_place_enemynum,
    get_ASP_type,
};
