import { is_Empty_Object } from '../../Function/Function.js';

import { enums } from '../../Data/Enum/Enum.js';
import { global } from '../global_class.js';

export class Game_status {
    //读取游戏状态标记
    get_game_status(flag_name) {
        if (!enums['game_status'].includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }
        return this[flag_name];
    }
    //设置游戏状态标记
    set_game_status(flag_name, flag_value) {
        if (!enums['game_status'].includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }
        this[flag_name] = flag_value;
    }
}

export {};
