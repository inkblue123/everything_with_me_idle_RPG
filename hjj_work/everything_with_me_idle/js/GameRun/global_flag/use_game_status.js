import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';
import { places } from '../../Data/Place/Place.js';
import { is_Empty_Object } from '../../Function/Function.js';
import { get_radio_switch_click_value } from '../../Function/Dom_function.js';

//获取临用游戏状态
function get_use_game_status(flag_name, flag_in1, flag_in2, flag_in3) {
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
        case 'UGS_pass_road_flag': //获取指定的通道类型战斗地点是否曾通过了
            flag_value = get_UGS_pass_road_flag(flag_in1);
            break;
        case 'UGS_now_MH_name': //获取当前展示的原料处理类生活技能的编号
            flag_value = get_UGS_now_MH_name(flag_in1);
            break;

        default:
            console.log('未定义%s临用游戏状态标记的获取函数', flag_name);
            break;
    }
    return flag_value;
}
//临用游戏状态-主动技能规划界面的过滤条件
function get_UGS_ASP_type() {
    return get_radio_switch_click_value('ASP_switch');
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
    let BP_all_item = P_backpack.get_BP_all_item();
    let arr = Object.keys(BP_all_item); //将拥有的物品的key转换成一个数组
    for (let item_key of arr) {
        let item_obj = BP_all_item[item_key];
        let id = item_obj.id;

        let aitem_num = BP_all_item[item_key].num;
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
    let last_game_date = time_manage.get_last_game_date();
    if (game_date.hours >= 7 && last_game_date.hours <= 6) {
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
    return get_radio_switch_click_value('PSK_switch');
}
//临用游戏状态-获取指定的通道类型战斗地点是否曾通过了
function get_UGS_pass_road_flag(place_id) {
    if (is_Empty_Object(places[place_id])) {
        console.log('查询地点%s不存在', place_id);
        return false;
    }
    if (places[place_id].type != 'combat') {
        console.log('查询地点%s不是战斗地点', place_id);
        return false;
    }
    if (places[place_id].combat_type != 'limited_enemy_road') {
        console.log('查询地点%s不是通道类型战斗地点', place_id);
        return false;
    }
    let enemy_manage = global.get_enemy_manage();
    let last_combat_place_data = enemy_manage.get_last_combat_place_data();
    if (is_Empty_Object(last_combat_place_data[place_id])) {
        //没有指定地点的缓存信息，所以是没有来过该地点，没有通过
        return false;
    } else {
        if (is_Empty_Object(last_combat_place_data[place_id].pass_flag)) {
            return false;
        }
        return last_combat_place_data[place_id].pass_flag;
    }
}
//临用游戏状态-获取当前展示的原料处理类生活技能的编号
function get_UGS_now_MH_name() {
    const Live_plan_div = document.getElementById('Live_plan');
    if ((Live_plan_div.style.display = '')) {
        //当前上中位置的窗口展示不是生活技能类
        return null;
    }

    const MH_switch_button = document.getElementById('MH_switch_button');
    if (MH_switch_button.checked != true) {
        //当前展示的生活技能不是原料处理类
        return null;
    }
    // 寻找当前展示的生活技能
    let MH_live_plan_name = ['synthesis', 'cooking', 'forging', 'elixir_alchemy', 'herbal_bath', 'engrave', 'alchemy'];
    let MH_live_plan_min_name = { SYN: 0, COK: 1, FRG: 2, EXA: 3, HBB: 4, EGV: 5, ACM: 6 };

    let MH_switch_name = get_radio_switch_click_value('MH_switch');
    let MH_min_name = MH_switch_name.slice(0, 3);
    let MH_name = MH_live_plan_name[MH_live_plan_min_name[MH_min_name]];
    return MH_name;
}

export { get_use_game_status };
