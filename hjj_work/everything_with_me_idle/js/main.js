import { dom, addElement } from "./Dom.js";
import { update_HP, update_MP, update_ENP } from "./Function.js";
import { player } from "./Player.js";

window.addEventListener("load", () => {
    dom.InitGameDomNomal();
    update_HP();
    update_MP();
    update_ENP();
});
var button1 = addElement(dom.option_dom, "button");
button1.innerHTML = "战斗时的ui";
button1.onclick = function () {
    dom.InitGameDomCombat();
};
var button2 = addElement(dom.option_dom, "button");
button2.innerHTML = "平时的ui";
button2.onclick = function () {
    dom.InitGameDomNomal();
};

var button3 = addElement(dom.option_dom, "button");
button3.innerHTML = "加10生命";
button3.onclick = function () {
    if (player.health_point + 10 >= player.health_max) {
        player.health_point = player.health_max;
    } else {
        player.health_point += 10;
    }
    update_HP();
};

var button4 = addElement(dom.option_dom, "button");
button4.innerHTML = "减10生命";
button4.onclick = function () {
    if (player.health_point - 10 <= 0) {
        player.health_point = 0;
    } else {
        player.health_point -= 10;
    }
    update_HP();
};
