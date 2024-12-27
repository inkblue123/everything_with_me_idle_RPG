import { player } from '../Player/player.js';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';

//判断物品类型中是否在指定过滤条件内
function Item_type_handle(type_switch, items_type) {
    for (let item_T of items_type) {
        if (type_switch.includes(item_T)) return true;
    }
    return false;
}

//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_type_handle(BP_type) {
    var BP_item_type = [];
    if (BP_type === undefined) {
        return BP_item_type;
    }
    switch (BP_type) {
        case 'all':
            BP_item_type.push('equipment');
            BP_item_type.push('consumable');
            BP_item_type.push('material');
            break;
        case 'EQP_all': //武器装备，全部
            BP_item_type.push('equipment');
            break;
        case 'EQP_W': //武器装备，武器
            BP_item_type.push('weapon');
            break;
        case 'EQP_A': //武器装备，防具
            BP_item_type.push('armor');
            break;
        case 'EQP_D': //武器装备，副手
            BP_item_type.push('deputy');
            break;
        case 'EQP_O': //武器装备，饰品
            BP_item_type.push('ornament');
            break;
        case 'CSB_all': //可使用物品，全部
            BP_item_type.push('consumable');
            break;
        case 'CSB_F': //可使用物品，可食用物品
            BP_item_type.push('food_CSB');
            break;
        case 'CSB_A': //可使用物品，弹药
            BP_item_type.push('ammo_CSB');
            break;
        case 'CSB_L': //可使用物品，生活消耗品
            BP_item_type.push('life_CSB');
            break;
        case 'MTR_all': //材料，全部
            BP_item_type.push('material');
            break;
        case 'MTR_R': //材料，自然材料
            BP_item_type.push('raw_MTR');
            break;
        case 'MTR_P': //材料，人工材料
            BP_item_type.push('process_MTR');
            break;
        case 'MTR_F': //材料，成品
            BP_item_type.push('finish_MTR');
            break;
        case 'MTR_O': //材料，其他物品
            BP_item_type.push('other_MTR');
            break;

        default:
            break;
    }

    return BP_item_type;
}

//校验输入的参数是否是合法的装备信息
function check_Equipment(id, equip_rarity) {
    if (items[id] === undefined) {
        //该物品未定义
        console.log('未定义物品：%s', id);
        return false;
    }
    if (items[id].type.includes('equipment')) {
        //稀有度参数校验
        if (items[id].special_flag) {
            if (!types.special_rarity.includes(equip_rarity)) {
                console.log('稀有度异常，%s不属于特制武器的可能稀有度', equip_rarity);
                return false;
            }
        } else {
            if (!types.no_special_rarity.includes(equip_rarity)) {
                console.log('稀有度异常，%s不属于制式武器的可能稀有度', equip_rarity);
                return false;
            }
        }
        //校验无误，当前输入参数属于正确的装备的参数
        return true;
    } else {
        //该物品不属于装备
        console.log('%s不属于装备', id);
        return false;
    }
}

//判断一个对象是否为空
function isEmptyObject(obj) {
    //测试
    return JSON.stringify(obj) === '{}';
}

//测试
function printf_play_item() {
    //测试
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    console.log('玩家此时拥有%d种物品', arr.length);
    for (let play_item_id of arr) {
        console.log('玩家拥有%d号物品%d个', play_item_id, player.backpack_items[play_item_id].num);
    }
    console.log('\n');
}

export { printf_play_item, Item_type_handle, BP_type_handle, check_Equipment, isEmptyObject };
