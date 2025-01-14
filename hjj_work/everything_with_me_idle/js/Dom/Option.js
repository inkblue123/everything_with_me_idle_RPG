import { crtElement, addElement } from '../Function/Dom_function.js';
import { updata_HP, updata_BP_value } from '../Function/Updata_func.js';
import { printf_play_item } from '../Function/Function.js';
import { show_combat_game_div, show_normal_game_div } from '../Function/show_func.js';
import { get_BP_weight } from '../Function/Get_func.js';
import { player } from '../Player/Player.js';
import { dom } from './Dom.js';

var Option = crtElement('div', null, 'option_page', '');
{
    var button1 = addElement(Option, 'button');
    button1.innerHTML = '战斗时的ui';
    button1.onclick = function () {
        show_combat_game_div();
    };
    var button2 = addElement(Option, 'button');
    button2.innerHTML = '平时的ui';
    button2.onclick = function () {
        show_normal_game_div();
    };

    var button3 = addElement(Option, 'button');
    button3.innerHTML = '加10生命';
    button3.onclick = function () {
        if (player.health_point + 10 >= player.health_max) {
            player.health_point = player.health_max;
        } else {
            player.health_point += 10;
        }
        updata_HP(player);
    };

    var button4 = addElement(Option, 'button');
    button4.innerHTML = '减10生命';
    button4.onclick = function () {
        if (player.health_point - 10 <= 0) {
            player.health_point = 0;
        } else {
            player.health_point -= 10;
        }
        updata_HP(player);
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予一个橡木原木';
    button5.onclick = function () {
        // printf_play_item();
        player.Player_get_item('Oak_logs', 1);
        // printf_play_item();
        updata_BP_value();
        printf_play_item();
        get_BP_weight();
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予玩家一个未定义物品';
    button5.onclick = function () {
        printf_play_item();
        player.Player_get_item(10, 1);
        printf_play_item();
        updata_BP_value();
        printf_play_item();
    };
}

export { Option };
