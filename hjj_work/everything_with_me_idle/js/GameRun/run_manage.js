import { player } from '../Player/Player.js';
import { global } from './global_class.js';
import { places } from '../Data/Place/Place.js';
import { addElement } from '../Function/Dom_function.js';
import { get_combat_place_enemynum } from '../Function/Get_func.js';
import {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_BP_value,
    updata_attribute_show,
    updata_player_name,
    update_enemy_show,
} from '../Function/Updata_func.js';
import { texts } from '../Data/Text/Text.js';

function state_game() {
    if (global.get_combat_statu()) {
        updata_combat();
    }
    //更新需要即时变动的游戏内容
    updata_game();
    //睡眠一段时间，保证游戏一秒运行帧数次
    let sleep_ms = global.get_sleep_ms();
    setTimeout(state_game, sleep_ms);
}

//更新游戏界面中的信息
function updata_game() {
    updata_HP();
    updata_MP();
    updata_ENP();
    updata_player_name();
    updata_attribute_show();

    if (global.get_combat_statu()) {
        update_enemy_show();
    }
}
//战斗中，计算一帧之后的战斗内容
function updata_combat() {
    //刷出新怪
    global.add_new_enemy();
    //玩家动作
    player.run_game_FPS();
    //敌人动作
    //战斗结果
}

export { updata_game, state_game };
