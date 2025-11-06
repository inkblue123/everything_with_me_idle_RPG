import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';
//获取临用游戏状态
function get_use_game_status(flag_name) {
    if (!flag_name.startsWith('UGS_')) {
        console.log('非临用游戏状态，不可调用该接口，%s', flag_name);
        return;
    }
    let flag_value;
    switch (flag_name) {
        case 'UGS_ASP_type': //主动技能规划界面的过滤条件
            flag_value = get_UGS_ASP_type();
            break;
        case 'UGS_village_barracks_week': //当前游戏日期属于村庄轮周的第几日
            flag_value = get_UGS_village_barracks_week();
            break;
        case 'UGS_BP_weight': //当前玩家背包物品的负重
            flag_value = get_UGS_BP_weight();
            break;
        case 'UGS_get_up_time_flag': //当前游戏时间是否到了起床的时间点
            flag_value = get_UGS_get_up_time_flag();
            break;
        case 'UGS_game_speed': //当前游戏运行速度
            flag_value = get_UGS_game_speed();
            break;
        case 'UGS_PSK_type': //左上角的玩家属性界面中的玩家所有技能界面的过滤条件
            flag_value = get_UGS_PSK_type();
            break;

        default:
            console.log('未定义%s临用游戏状态标记的获取函数', flag_name);
            break;
    }
    return flag_value;
}
//临用游戏状态-主动技能规划界面的过滤条件
function get_UGS_ASP_type() {
    const radios = document.querySelectorAll('input[name="ASP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//临用游戏状态-当前游戏日期属于村庄轮周的第几日
function get_UGS_village_barracks_week() {
    let time_manage = global.get_time_manage();
    let game_date = time_manage.get_game_date();
    let all_day = game_date.year * 360 + game_date.month * 30 + game_date.day;
    all_day -= 1; //初始日期2025.4.1是周二，在这里重置成周一
    // all_day += 1; //初始日期2025.4.1是周二，在这里重置成周三
    return (all_day % 5) + 1;
}
//临用游戏状态-当前玩家背包物品的负重
function get_UGS_BP_weight() {
    var BP_weight = 0;
    let P_backpack = player.get_player_backpack();
    let arr = Object.keys(P_backpack); //将拥有的物品的key转换成一个数组
    for (let item_key of arr) {
        let item_obj = P_backpack[item_key];
        let id = item_obj.id;

        let aitem_num = P_backpack[item_key].num;
        BP_weight += Math.floor(aitem_num / items[id].maxStack);
        if (aitem_num % items[id].maxStack != 0) {
            BP_weight++;
        }
    }
    console.log('玩家当前背包负重%d', BP_weight);
    return BP_weight;
}
//临用游戏状态-当前游戏时间是否到了起床的时间点
function get_UGS_get_up_time_flag() {
    let time_manage = global.get_time_manage();
    let game_date = time_manage.get_game_date();
    let last_game_now_time = time_manage.get_last_game_now_time();
    let last_date = time_manage.judge_game_date(last_game_now_time);
    if (game_date.hours >= 7 && last_date.hours <= 6) {
        return true;
    }

    return false;
}
//临用游戏状态-当前游戏运行速度
function get_UGS_game_speed() {
    let time_manage = global.get_time_manage();
    return time_manage.get_game_speed();
}

//临用游戏状态-左上角的玩家属性界面中的玩家所有技能界面的过滤条件
function get_UGS_PSK_type() {
    const radios = document.querySelectorAll('input[name="PSK_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}

export { get_use_game_status };
