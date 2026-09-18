import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
import { get_random } from '../Function/math_func.js';

//将属性补正数值转义成简写字母
function attr_correct_handle(attr_correct) {
    //
    if (0 <= attr_correct && attr_correct <= 3) {
        return 'D';
    } else if (3 < attr_correct && attr_correct <= 6) {
        return 'C';
    } else if (6 < attr_correct && attr_correct <= 10) {
        return 'B';
    } else if (10 < attr_correct && attr_correct <= 15) {
        return 'A';
    } else if (15 < attr_correct && attr_correct <= 20) {
        return 'S';
    }
}
//校验输入的参数是否是合法的装备信息
function check_Equipment(id, equip_rarity) {
    if (items[id] === undefined) {
        //该物品未定义
        console.log('输入的物品是未定义物品,id：%s', id);
        return false;
    }
    if (typeof equip_rarity != 'string') {
        console.log('输入的equip_rarity不是一个具体的稀有度字符串');
        return false;
    }
    if (items[id].main_type == 'equipment') {
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
        console.log('%s不属于装备', id);
        return false;
    }
}
//判断一个对象是否为空
function is_Empty_Object(obj) {
    //未定义内容会返回真
    if (obj === undefined) return true;
    //空指针会返回真
    if (obj === null) return true;
    //没有任何内容的对象会返回真
    if (JSON.stringify(obj) === '{}') return true;
    //没有任何内容的数组会返回真
    if (JSON.stringify(obj) === '[]') return true;

    return false;
}
//将hex颜色和透明度转换成rgba颜色
function hex2Rgba(bgColor, alpha = 1) {
    let color = bgColor.slice(1); // 去掉'#'号
    let rgba = [parseInt('0x' + color.slice(0, 2)), parseInt('0x' + color.slice(2, 4)), parseInt('0x' + color.slice(4, 6)), alpha];
    return 'rgba(' + rgba.toString() + ')';
}
//对Array数组去重
function get_uniqueArr(array) {
    // 使用 Set 去重
    let uniqueArr = [...new Set(array)];
    return uniqueArr;
}
//判断两个数组是否有重叠
function is_overlap(arr1, arr2) {
    const set = new Set(arr2);
    return arr1.some((item) => set.has(item));
}
//将两个数组合并
// function is_overlap(arr1, arr2) {
//     const set = new Set(arr2);
//     return arr1.some((item) => set.has(item));
// }
//获取一个对象中唯一的key
function get_object_only_key(obj) {
    let keys = Object.keys(obj); //将拥有的物品的key转换成一个数组
    if (keys.length != 1) {
        return false;
    }
    return keys[0];
}
//获取监控行为的文本
function get_monitor_ch(id, monitor_data, monitor_target) {
    if (is_Empty_Object(monitor_target[id]) || is_Empty_Object(monitor_data[id])) {
        console.log('错误，输入参数中没有%s监控行为', id);
        return;
    }
    let end_ch; //最终输出文本
    let condition_name = ''; //监控行为的文本
    let preset_flag = false; //是否有预设文本
    if (!is_Empty_Object(texts[id])) {
        if (!is_Empty_Object(texts[id].condition_name)) {
            //这个条件有预设名称，直接使用该文本
            condition_name = texts[id].condition_name;
            preset_flag = true;
        }
    }
    if (preset_flag == false) {
        //这个条件没有预设文本，尝试根据条件内容组合出文本
        condition_name = make_condition_name(id);
    }

    if (typeof monitor_data[id] == 'number') {
        //数字型目标，一般是累计数量，需要在文本后面加一个进度
        //例如：4个防具部位都有穿着的情况下受击（0/10）
        //其中“4个防具部位都有穿着的情况下受击”是这条监控行为的文本
        //后面跟着的部分表示完成的进度
        let after_text = ' (' + monitor_data[id] + '/' + monitor_target[id] + ')';
        end_ch = condition_name + after_text;
    } else if (typeof monitor_data[id] == 'boolean') {
        //布尔型目标，一般是完成某个事件
        //例如：完成新手战斗测试
        //前面需要加个“完成”字样
        if (preset_flag) {
            //有预设优先使用预设
            end_ch = condition_name;
        } else {
            //没有预设使用组合，在前面补齐动词
            end_ch = '完成' + condition_name;
        }
    } else {
        console.log('非数字且非布尔类型的监控行为目标数值，异常');
        return;
    }

    return end_ch;
}
//根据监控行为的id，尝试组合出文本
function make_condition_name(monitor_id) {
    let firstIndex = monitor_id.indexOf('_');

    let monitor_type = monitor_id.substring(0, firstIndex);
    if (!enums['monitor_type'].includes(monitor_type)) {
        console.log('未定义的监控行为的类型：%s', monitor_type);
        return;
    }
    if (monitor_type == 'ATD') {
        console.log('目前不应该调用这个逻辑');
        return;
    } else if (monitor_type == 'DSE') {
        console.log('目前不应该调用这个逻辑');
        return;
    } else if (monitor_type == 'PKL') {
        let secondIndex = monitor_id.indexOf('_', firstIndex + 1);
        if (secondIndex < 0) {
            console.log('监控行为id：%s不符合要求', monitor_id);
            return;
        }
        let PKL_type = monitor_id.substring(firstIndex + 1, secondIndex);
        if (PKL_type == 'DamageType') {
            let damage_type = monitor_id.slice(secondIndex + 1);
            let damage_type_name = texts['damage_type'].skill_desc[damage_type];
            return damage_type_name + '击杀敌人';
        } else if (PKL_type == 'EnemyId') {
            let enemy_id = monitor_id.slice(secondIndex + 1);
            let enemy_name = texts[enemy_id].enemy_name;
            return '击杀' + enemy_name;
        }
    } else if (monitor_type == 'EE') {
        let event_id = monitor_id.slice(firstIndex + 1);
        if (is_Empty_Object(texts[event_id])) {
            console.log('未知事件');
            return;
        }
        if (is_Empty_Object(texts[event_id].event_name)) {
            console.log('未知事件名');
            return;
        }
        let event_name = texts[event_id].event_name;
        return event_name;
    }
}
//从element界面的dataset里获取一个key的value
//set_dataset_value 存入时用 JSON 编码保类型，这里用 JSON.parse 还原，保证数字/字符串/布尔/null/对象/数组能原样往返
function get_dataset_value(element, key) {
    const raw = element.dataset[key];
    if (raw === undefined || raw === null || raw === '') {
        //未设置过（或被 set_dataset_value 删除）的值，返回 undefined
        return undefined;
    }
    try {
        return JSON.parse(raw);
    } catch (e) {
        //非合法 JSON（例如被其他代码直读写入的普通字符串），原样返回字符串
        return raw;
    }
}
//在element界面的dataset里保存一个key value
//由于 dataset 会把所有值转成字符串，这里统一用 JSON.stringify 编码以保留类型：
//数字 5 -> "5"，字符串 "5" -> "\"5\""，这样 JSON.parse 时能区分开。
function set_dataset_value(element, key, value) {
    //undefined 和 null 无法往返，视为清空该 key
    if (value === undefined || value === null) {
        delete element.dataset[key];
        return;
    }
    element.dataset[key] = JSON.stringify(value);
}
//将输入的参数转换成一个物品对象
function get_item_obj(id, num, ...args) {
    let item_obj = new Object();
    item_obj.id = id;
    item_obj.num = num;
    //设置独特属性
    if (items[id].main_type == 'equipment') {
        //物品是装备，args内参数的含义按以下顺序排列：稀有度
        let equip_rarity = args[0];
        if (args[0] == undefined) {
            console.log('获取装备物品对象时没有设置稀有度');
        } else {
            if (check_Equipment(id, equip_rarity)) {
                item_obj.equip_rarity = equip_rarity;
            } else {
                item_obj.equip_rarity = 'ordinary';
            }
        }
    } else if (items[id].main_type == 'material') {
        //物品是材料，没有独特属性
    } else if (items[id].main_type == 'consumable') {
        //物品是消耗品，args内参数的含义按以下顺序排列：使用进度，额外属性
        let use_ratio = args[0];
        let ex_data = args[1];
        if (check_Consumable(id, use_ratio, ex_data)) {
            item_obj.use_ratio = args[0];
            item_obj.ex_data = args[1];
        } else {
            if (items[id].use_type == 'once_use') {
            } else if (items[id].use_type == 'sustain_use') {
                item_obj.use_ratio = 0;
            }
        }
    }

    return item_obj;
}
//获取物品对象的唯一key
function get_item_id_key(item_obj, length = 16) {
    let id = item_obj.id;
    let item_value = '';
    if (items[id].main_type == 'equipment') {
        //装备的独特属性是它的稀有度
        item_value = item_obj.equip_rarity;
    } else if (items[id].main_type == 'consumable') {
        //消耗品的独特属性是使用进度和额外属性
        if (!is_Empty_Object(item_obj.use_ratio)) {
            item_value += item_obj.use_ratio;
        }
        if (!is_Empty_Object(item_obj.ex_data)) {
            item_value += JSON.stringify(item_obj.ex_data);
        }
    } else if (items[id].main_type == 'material') {
        //材料应该没有独特属性，空着
    }
    //获取物品独特属性哈希值
    let hash = 0;
    for (let i = 0; i < item_value.length; i++) {
        hash = (hash << 5) - hash + item_value.charCodeAt(i);
        hash |= 0;
    }
    let hash_key = Math.abs(hash).toString(16).padStart(length, '0').substring(0, length);
    //key由物品id+物品独特属性哈希值组成
    let item_key = id + ':' + hash_key;
    return item_key;
}
//在指定文本数据库中随机选择一条文本
//仅会选择key为text+数字的文本
function get_random_text(texts_id) {
    let text_obj = texts[texts_id];
    let keys = Object.keys(text_obj);
    let random = get_random(1, keys.length - 1); //-1是去掉文本数据库中的"id"这个键值对
    let key = 'text' + random;
    let ch = text_obj[key];
    if (ch == undefined) {
        console.log('随机文本选择异常，选择的id为%s', key);
        return 'error';
    }
    return ch;
}
//校验输入的参数是否是合法的消耗品信息
function check_Consumable(id, use_ratio, ex_data) {
    if (items[id] === undefined) {
        //该物品未定义
        console.log('输入的物品是未定义物品,id：%s', id);
        return false;
    }
    if (items[id].main_type != 'consumable') {
        //该物品不属于消耗品
        console.log('%s不属于消耗品', id);
        return false;
    }

    if (items[id].use_type == 'once_use') {
        //一次性使用物品，只应该有额外属性，而且允许为空
        if (typeof ex_data != 'object' && !is_Empty_Object(ex_data)) {
            console.log('一次性使用消耗品的额外属性异常%s', typeof ex_data);
            return false;
        }
        if (!is_Empty_Object(use_ratio)) {
            console.log('一次性使用消耗品的使用进度异常');
            return false;
        }
    } else if (items[id].use_type == 'sustain_use') {
        //持续使用物品，只应该有使用进度
        // if (typeof use_ratio != 'number') {
        if (typeof use_ratio != 'number' || is_Empty_Object(use_ratio)) {
            console.log('持续使用消耗品的使用进度异常');
            return false;
        }
        if (!is_Empty_Object(ex_data)) {
            console.log('持续使用消耗品的额外属性异常');
            return false;
        }
    }
    return true;
}
//把可能为空的值转成数字0(效果行的数值折算用)
function to_num(value) {
    if (value === undefined || value === null || value === '') {
        return 0;
    }
    return value;
}
//归并一份"使用效果/额外效果"的效果行集合：基础效果(模板use_attr或season_effect) 与 实例额外效果(ex_data.bonus)
//归并规则：
//  get_attr  ：按 attr_id 相加 attr_value(数值)
//  其他类型(如get_buff/get_item/get_formula)：原样保留，不去重、不合并(语义未定前不做合并，避免改错)
//返回一个新的数组，不改动传入的数据
function get_merge_use_attr(base_attr, ex_data) {
    let ret = new Array();
    let attr_map = new Object(); //get_attr类型的归并结果：attr_id -> 效果行
    //先归并基础效果行
    for (let attr_obj of base_attr || new Array()) {
        if (attr_obj.attr_type == 'get_attr') {
            if (attr_map[attr_obj.attr_id] === undefined) {
                let row = new Object();
                row.attr_type = attr_obj.attr_type;
                row.use_ratio = attr_obj.use_ratio;
                row.attr_id = attr_obj.attr_id;
                row.attr_value = to_num(attr_obj.attr_value);
                attr_map[attr_obj.attr_id] = row;
            } else {
                attr_map[attr_obj.attr_id].attr_value += to_num(attr_obj.attr_value);
            }
        } else {
            ret.push(attr_obj);
        }
    }
    //再归并实例额外效果行(ex_data.bonus)
    let bonus_arr = new Array();
    if (ex_data != undefined && !is_Empty_Object(ex_data.bonus)) {
        bonus_arr = ex_data.bonus;
    }
    for (let bonus_obj of bonus_arr) {
        if (bonus_obj.attr_type == 'get_attr') {
            if (attr_map[bonus_obj.attr_id] === undefined) {
                let row = new Object();
                row.attr_type = bonus_obj.attr_type;
                row.use_ratio = bonus_obj.use_ratio;
                row.attr_id = bonus_obj.attr_id;
                row.attr_value = to_num(bonus_obj.attr_value);
                attr_map[bonus_obj.attr_id] = row;
            } else {
                attr_map[bonus_obj.attr_id].attr_value += to_num(bonus_obj.attr_value);
            }
        } else {
            ret.push(bonus_obj);
        }
    }
    //把归并后的get_attr效果行追加到结果中
    for (let attr_id in attr_map) {
        ret.push(attr_map[attr_id]);
    }
    return ret;
}

export {
    check_Equipment,
    is_Empty_Object, //
    hex2Rgba,
    get_uniqueArr,
    attr_correct_handle,
    is_overlap,
    get_object_only_key,
    get_monitor_ch,
    get_dataset_value,
    set_dataset_value,
    get_item_id_key,
    get_item_obj,
    get_random_text,
    to_num,
    get_merge_use_attr,
};
