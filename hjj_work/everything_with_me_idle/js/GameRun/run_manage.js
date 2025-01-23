import { player } from '../Player/Player.js';
import { global } from './global_class.js';
import { fps_manage } from './FPS_class.js';
import { items } from '../Data/Item/Item.js';
import { addElement } from '../Function/Dom_function.js';
import {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_BP_value,
    updata_attribute_show,
    updata_player_name,
} from '../Function/Updata_func.js';
import { texts } from '../Data/Text/Text.js';

function state_game() {
    //更新需要即时变动的游戏内容
    updata_game();
    //睡眠一段时间，保证游戏一秒运行帧数次
    let sleep_ms = fps_manage.get_sleep_ms();
    setTimeout(state_game, sleep_ms);
}

//更新游戏界面中的信息
function updata_game() {
    updata_HP();
    updata_MP();
    updata_ENP();
    updata_player_name();
    updata_attribute_show();
    // updata_BP_value();//其实不用在每时每刻更新，只要在背包物品发生变动的时候更新即可
}

export { updata_game, state_game };
