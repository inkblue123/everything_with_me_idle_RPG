import { addElement } from './Function/Dom_function.js';
import { player } from './Player/Player.js';
import { updata_MP, updata_ENP } from './Function/Function.js';
import { updata_HP } from './Function/Updata_func.js';

function add_test_button(dom) {
    var button1 = addElement(dom.option_dom, 'button');
    button1.innerHTML = '战斗时的ui';
    button1.onclick = function () {
        dom.InitGameDomCombat();
    };
    var button2 = addElement(dom.option_dom, 'button');
    button2.innerHTML = '平时的ui';
    button2.onclick = function () {
        dom.InitGameDomNomal();
    };

    var button3 = addElement(dom.option_dom, 'button');
    button3.innerHTML = '加10生命';
    button3.onclick = function () {
        if (player.health_point + 10 >= player.health_max) {
            player.health_point = player.health_max;
        } else {
            player.health_point += 10;
        }
        updata_HP();
    };

    var button4 = addElement(dom.option_dom, 'button');
    button4.innerHTML = '减10生命';
    button4.onclick = function () {
        if (player.health_point - 10 <= 0) {
            player.health_point = 0;
        } else {
            player.health_point -= 10;
        }
        updata_HP();
    };

    var button5 = addElement(dom.option_dom, 'button');
    button5.innerHTML = '给予玩家一个1号物品';
    button5.onclick = function () {
        player.Player_get_item(10, 1);
    };
}

export { add_test_button };
