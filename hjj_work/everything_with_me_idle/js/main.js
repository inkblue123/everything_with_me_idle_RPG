import { player } from './Player.js';
// import { items } from './Item.js';
import { dom } from './Dom/Dom.js';

window.addEventListener('load', () => {
    dom.InitGameDomNomal();
    dom.LoadPlayerData(player);
});
