import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';

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
        console.log('check_Equipment : 输入的物品是未定义物品,id：%s', id);
        return false;
    }
    if (typeof equip_rarity != 'string') {
        console.log('输入的equip_rarity不是一个具体的稀有度字符串');
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
//比较div中dataset里存储的key值和valueToCompare是否一致
function compare_dataset_value(element, key, valueToCompare) {
    const storedValue = element.dataset[key];

    // 处理未存储值的情况
    if (storedValue === undefined) {
        return valueToCompare === undefined;
    }

    // 处理布尔值比较
    if (typeof valueToCompare === 'boolean') {
        return storedValue === (valueToCompare ? 'true' : 'false');
    }

    // 处理数字比较
    if (typeof valueToCompare === 'number') {
        const parsed = parseFloat(storedValue);
        return !isNaN(parsed) && parsed === valueToCompare;
    }

    // 处理对象/数组比较
    if (typeof valueToCompare === 'object' && valueToCompare !== null) {
        try {
            const parsed = JSON.parse(storedValue);
            return JSON.stringify(parsed) === JSON.stringify(valueToCompare);
        } catch (e) {
            return false;
        }
    }

    // 默认字符串比较
    return storedValue === String(valueToCompare);
}
//在element界面的dataset里保存一个key value
function set_dataset_value(element, key, value) {
    if (value === undefined || value === null) {
        delete element.dataset[key];
        return;
    }

    // 特殊处理布尔值
    if (typeof value === 'boolean') {
        element.dataset[key] = value ? 'true' : 'false';
        return;
    }

    // 处理对象和数组
    if (typeof value === 'object') {
        try {
            element.dataset[key] = JSON.stringify(value);
            return;
        } catch (e) {
            console.error('Failed to stringify object:', e);
            return;
        }
    }

    // 其他类型直接转为字符串
    element.dataset[key] = String(value);
}
//将输入的参数转换成一个物品对象
function get_item_obj(id, num, ...args) {
    let item_obj = new Object();
    item_obj.id = id;
    item_obj.num = num;
    //设置独特属性
    if (items[id].main_type.includes('equipment')) {
        //物品是装备，args内参数的含义按以下顺序排列：
        //稀有度
        item_obj.equip_rarity = args[0];
    } else if (items[id].main_type.includes('material')) {
        //物品是材料，没有独特属性
    } else if (items[id].main_type.includes('consumable')) {
        //物品是消耗品，args内参数的含义按以下顺序排列：
        // 暂无
    }

    return item_obj;
}

//获取物品对象的唯一key
function get_item_id_key(item_obj, length = 16) {
    let id = item_obj.id;
    let item_value = '';
    if (items[id].main_type.includes('equipment')) {
        //装备的独特属性是它的稀有度
        item_value = item_obj.equip_rarity;
    } else if (items[id].main_type.includes('consumable')) {
        //消耗品的独特属性有待开发
        //目前不写，和材料一样空着
    } else if (items[id].main_type.includes('material')) {
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

export {
    check_Equipment,
    is_Empty_Object, //
    hex2Rgba,
    get_uniqueArr,
    attr_correct_handle,
    is_overlap,
    get_object_only_key,
    get_monitor_ch,
    compare_dataset_value,
    set_dataset_value,
    get_item_id_key,
    get_item_obj,
};
