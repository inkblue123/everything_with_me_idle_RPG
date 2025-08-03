import { updata_attribute_show, updata_player_active_time_bar } from '../Function/Updata_func.js';
import { player } from '../Player/Player.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from './global_manage.js';

function state_game() {
    let Time_manage = global.get_time_manage();
    Time_manage.updata_FPS_start();

    //更新一帧内的数据变化
    updata_game_data();
    //更新这一帧的新的游戏画面
    updata_game_div();

    Time_manage.updata_FPS_end();
    //一帧运行完毕，睡眠一段时间，保证游戏一秒运行帧数次
    let sleep_ms = global.get_sleep_ms();
    setTimeout(state_game, sleep_ms);
}

//更新一帧内的数据变化
function updata_game_data() {
    //玩家数值更新
    player.run_player_normal();
    //判断这一帧是否有事件会触发
    let place_manage = global.get_place_manage();
    place_manage.updata_now_place_condition_event();

    let now_GS = global.get_flag('GS_game_statu');
    if (now_GS == 'combat') {
        //当前处于战斗状态，战斗数值更新
        player.run_player_combat(); //玩家攻击
        //敌人攻击
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.run_enemy_active_skill();
        //进行战斗
        let combat_manage = global.get_combat_manage();
        combat_manage.run_combat();
        //刷出新怪
        global.add_new_enemy();
    } else if (enums['live_plan_GS'].includes(now_GS)) {
        //当前处于生活技能状态，更新数值
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_data(now_GS);
    }

    //经验结算
    let exp_manage = global.get_exp_manage();
    exp_manage.set_leveling_behavior();
    exp_manage.player_get_exp();
    // 更新游戏状态
    let global_flag_manage = global.get_global_flag_manage();
    global_flag_manage.updata_flag();
}
//更新这一帧的新的游戏画面
function updata_game_div() {
    let now_GS = global.get_flag('GS_game_statu');

    if (now_GS == 'combat') {
        //玩家主动攻击进度条更新
        updata_player_active_time_bar();
        //战斗地点内的敌人呈现效果更新
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.updata_enemy_show();
    } else if (enums['live_plan_GS'].includes(now_GS)) {
        //当前处于生活技能状态，更新生活技能界面
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div(now_GS);
    }
    let P_attr = player.get_player_attributes();
    //血条显示更新
    P_attr.updata_HP_bar_div();
    //魔力条显示更新
    P_attr.updata_MP_bar_div();
    //精力条显示更新
    P_attr.updata_ENP_bar_div();
    //玩家名称显示更新
    // updata_player_name();
    //玩家属性显示更新
    updata_attribute_show();
}

export { updata_game_data, state_game };
