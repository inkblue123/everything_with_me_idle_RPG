import { player } from '../Player/Player.js';
import { global } from './global_class.js';
import {} from '../Function/Get_func.js';
import {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_attribute_show,
    updata_player_name,
    updata_player_active_time_bar,
} from '../Function/Updata_func.js';

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
    if (global.get_combat_statu()) {
        //玩家攻击
        player.run_game_FPS();
        //敌人攻击
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.run_enemy_active_skill();
        //进行战斗
        let combat_manage = global.get_combat_manage();
        combat_manage.run_combat();
        //刷出新怪
        global.add_new_enemy();
    }
    //经验结算
    let exp_manage = global.get_exp_manage();
    exp_manage.set_leveling_behavior();
    exp_manage.player_get_exp();
    // 更新游戏状态
    let global_flag_manage = global.get_global_flag_manage();
    global_flag_manage.updata_short_game_status();
    global_flag_manage.updata_new_game_log_status();
}
//更新这一帧的新的游戏画面
function updata_game_div() {
    if (global.get_combat_statu()) {
        //玩家主动攻击进度条更新
        updata_player_active_time_bar();
        //战斗地点内的敌人呈现效果更新
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.updata_enemy_show();
    }
    //血条显示更新
    updata_HP();
    //魔力条显示更新
    updata_MP();
    //精力条显示更新
    updata_ENP();
    //玩家名称显示更新
    updata_player_name();
    //玩家属性显示更新
    updata_attribute_show();
}

export { updata_game_data, state_game };
