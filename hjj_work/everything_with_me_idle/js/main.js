import { dom, addElement } from "./Dom.js";
import { player } from "./Player.js";

window.addEventListener("load", () => {
    dom.InitGameDomNomal();
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
