import { player } from './Player.js';
import { item } from './Item.js';
import { dom, addElement } from './Dom.js';
import { update_HP, update_MP, update_ENP, update_attribute_show } from './Function.js';
import { add_test_button } from './test.js';

window.addEventListener('load', () => {
    dom.InitGameDomNomal();
    update_HP();
    update_MP();
    update_ENP();
    update_attribute_show();

    add_test_button(dom);
});
