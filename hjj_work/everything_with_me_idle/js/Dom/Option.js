import { crtElement, addElement } from '../Function/Dom_function.js';
import { update_HP, update_BP_value } from '../Function/Update_func.js';
import { printf_play_item } from '../Function/Function.js';
import { get_BP_weight } from '../Function/Get_func.js';
import { player } from '../Player.js';

var Option = crtElement('div', null, 'option_page', '');

{
    var button1 = addElement(Option, 'button');
    button1.innerHTML = '战斗时的ui';
    button1.onclick = function () {
        dom.InitGameDomCombat();
    };
    var button2 = addElement(Option, 'button');
    button2.innerHTML = '平时的ui';
    button2.onclick = function () {
        dom.InitGameDomNomal();
    };

    var button3 = addElement(Option, 'button');
    button3.innerHTML = '加10生命';
    button3.onclick = function () {
        if (player.health_point + 10 >= player.health_max) {
            player.health_point = player.health_max;
        } else {
            player.health_point += 10;
        }
        update_HP(player);
    };

    var button4 = addElement(Option, 'button');
    button4.innerHTML = '减10生命';
    button4.onclick = function () {
        if (player.health_point - 10 <= 0) {
            player.health_point = 0;
        } else {
            player.health_point -= 10;
        }
        update_HP(player);
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予一个橡木原木';
    button5.onclick = function () {
        // printf_play_item();
        player.Player_get_item('Oak_logs', 1);
        // printf_play_item();
        update_BP_value();
        printf_play_item();
        get_BP_weight();
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予玩家一个未定义物品';
    button5.onclick = function () {
        printf_play_item();
        player.Player_get_item(10, 1);
        printf_play_item();
        update_BP_value();
        printf_play_item();
    };
}

export { Option };
