import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { P_skills, B_skills } from '../Data/Skill/Skill.js';

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
    let rgba = [
        parseInt('0x' + color.slice(0, 2)),
        parseInt('0x' + color.slice(2, 4)),
        parseInt('0x' + color.slice(4, 6)),
        alpha,
    ];
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

export {
    check_Equipment,
    is_Empty_Object, //
    hex2Rgba,
    get_uniqueArr,
    attr_correct_handle,
    is_overlap,
};
