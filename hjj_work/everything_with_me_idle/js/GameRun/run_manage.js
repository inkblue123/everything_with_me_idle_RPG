import { player } from '../Player/Player.js';
import { global } from './global_class.js';
import { places } from '../Data/Place/Place.js';
import { texts } from '../Data/Text/Text.js';
import { addElement } from '../Function/Dom_function.js';
import {} from '../Function/Get_func.js';
import {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_BP_value,
    updata_attribute_show,
    updata_player_name,
    update_enemy_show,
    updata_player_active_time_bar,
    updata_game_dom,
} from '../Function/Updata_func.js';
import { show_combat_game_div, show_normal_game_div } from '../Function/show_func.js';

function state_game() {
    let FPS_manage = global.get_fps_manage();
    FPS_manage.update_FPS_start();

    //更新需要变动的游戏界面
    updata_game_dom();
    //更新战斗内容
    if (global.get_combat_statu()) {
        updata_combat();
    }
    //更新需要即时变动的游戏界面内的数据
    updata_game_data();

    FPS_manage.update_FPS_end();
    //一帧运行完毕，睡眠一段时间，保证游戏一秒运行帧数次
    let sleep_ms = global.get_sleep_ms();
    setTimeout(state_game, sleep_ms);
}

//更新需要即时变动的游戏界面内的数据
function updata_game_data() {
    //左上玩家属性展示界面更新
    updata_HP();
    updata_MP();
    updata_ENP();
    updata_player_name();
    updata_attribute_show();
    //
    updata_player_active_time_bar();
    if (global.get_combat_statu()) {
        update_enemy_show();
    }
}
//战斗中，计算一帧之后的战斗内容
function updata_combat() {
    //玩家动作
    player.run_game_FPS();
    //敌人动作
    global.run_game_FPS();
    //战斗结果
    let combat_manage = global.get_combat_manage();
    combat_manage.run_combat();
    //结算战斗产生的经验
    let exp_manage = global.get_exp_manage();
    exp_manage.set_leveling_behavior();
    exp_manage.player_get_exp();
    //刷出新怪
    global.add_new_enemy();
}

export { updata_game_data, state_game };
