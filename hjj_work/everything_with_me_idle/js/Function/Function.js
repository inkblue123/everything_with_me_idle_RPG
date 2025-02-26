import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { P_skills, B_skills } from '../Data/Skill/Skill.js';

//判断物品类型中是否在指定过滤条件内
function Item_type_handle(type_switch, id) {
    let item_type = new Array();
    item_type = item_type.concat(items[id].main_type);
    item_type = item_type.concat(items[id].secon_type);
    for (let item_T of item_type) {
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
            BP_item_type = ['equipment', 'consumable', 'material'];
            break;
        case 'EQP_all': //武器装备，全部
            BP_item_type = ['equipment'];
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
            BP_item_type.push('Consumable');
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
//按照主动技能规划的过滤或筛选条件，获得应该展示的技能id队列
function ASP_type_handle(type_switch) {
    let arr = new Array();
    for (let skill_id in player.All_Skills) {
        if (P_skills[skill_id].type == 'Active') {
            switch (type_switch) {
                case 'ASP_all': //全部主动技能
                    arr.push(skill_id);
                    break;
                case 'ASP_N_1': //占用1槽的主动技能
                    if (P_skills[skill_id].need_slot_num == 1) {
                        arr.push(skill_id);
                    }
                    break;
                case 'ASP_N_2': //占用2槽的主动技能
                    if (P_skills[skill_id].need_slot_num == 2) {
                        arr.push(skill_id);
                    }
                    break;
                case 'ASP_N_3': //占用3槽的主动技能
                    if (P_skills[skill_id].need_slot_num == 3) {
                        arr.push(skill_id);
                    }
                    break;
                case 'ASP_N_4': //占用4槽的主动技能
                    if (P_skills[skill_id].need_slot_num == 4) {
                        arr.push(skill_id);
                    }
                    break;
                case 'ASP_A': //可以攻击的主动技能
                    for (let slot_id in P_skills[skill_id].need_slot_id) {
                        if (B_skills[slot_id].active_type == 'attack') {
                            arr.push(skill_id);
                            break;
                        }
                    }
                    break;
                case 'ASP_D': //可以防御的主动技能
                    for (let slot_id in P_skills[skill_id].need_slot_id) {
                        if (B_skills[slot_id].active_type == 'defense') {
                            arr.push(skill_id);
                            break;
                        }
                    }
                    break;
                case 'ASP_R': //可以恢复的主动技能
                    for (let slot_id in P_skills[skill_id].need_slot_id) {
                        if (B_skills[slot_id].active_type == 'recovery') {
                            arr.push(skill_id);
                            break;
                        }
                    }
                    break;
                case 'ASP_F': //可以辅助的主动技能
                    for (let slot_id in P_skills[skill_id].need_slot_id) {
                        if (B_skills[slot_id].active_type == 'auxiliary') {
                            arr.push(skill_id);
                            break;
                        }
                    }
                    break;

                default:
                    break;
            }
        }
    }

    return arr;
}
//将属性补正数值转义成简写字母
function attr_correct_handle(attr_correct) {
    //
    if (0 <= attr_correct && attr_correct <= 0.21) {
        return 'D';
    } else if (0.21 < attr_correct && attr_correct <= 0.41) {
        return 'C';
    } else if (0.41 < attr_correct && attr_correct <= 0.61) {
        return 'B';
    } else if (0.61 < attr_correct && attr_correct <= 0.81) {
        return 'A';
    } else if (0.81 < attr_correct && attr_correct <= 1.01) {
        return 'S';
    }
}
//校验输入的参数是否是合法的装备信息
function check_Equipment(id, equip_rarity) {
    if (items[id] === undefined) {
        //该物品未定义
        console.log('check_Equipment : 输入的物品是未定义物品,id：%s', id);
        return false;
    }
    if (items[id].main_type.includes('equipment')) {
        //稀有度参数校验
        if (items[id].special_flag) {
            if (!enums.special_rarity.includes(equip_rarity)) {
                console.log('稀有度异常，%s不属于特制武器的可能稀有度', equip_rarity);
                return false;
            }
        } else {
            if (!enums.no_special_rarity.includes(equip_rarity)) {
                console.log('稀有度异常，%s不属于制式武器的可能稀有度', equip_rarity);
                return false;
            }
        }
        //校验无误，当前输入参数属于正确的装备的参数
        return true;
    } else {
        //该物品不属于装备
        console.log('check_Equipment:%s不属于装备', id);
        return false;
    }
}
//判断一个对象是否为空
function isEmptyObject(obj) {
    //未定义内容会返回真
    if (obj === undefined) return true;
    //没有任何内容的对象会返回真
    return JSON.stringify(obj) === '{}';
}
//将hex颜色和透明度转换成rgba颜色
function hex2Rgba(bgColor, alpha = 1) {
    let color = bgColor.slice(1); // 去掉'#'号
    let rgba = [
        parseInt('0x' + color.slice(0, 2)),
        parseInt('0x' + color.slice(2, 4)),
        parseInt('0x' + color.slice(4, 6)),
        alpha,
    ];
    return 'rgba(' + rgba.toString() + ')';
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
//对Array数组去重
function get_uniqueArr(array) {
    // 使用 Set 去重
    let uniqueArr = [...new Set(array)];
    return uniqueArr;
}

export {
    printf_play_item, //
    Item_type_handle,
    BP_type_handle,
    ASP_type_handle,
    check_Equipment,
    isEmptyObject,
    hex2Rgba,
    get_uniqueArr,
    attr_correct_handle,
};
