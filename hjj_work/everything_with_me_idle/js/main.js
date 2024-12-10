import { player } from './Player.js';
import { dom } from './Dom/Dom.js';

window.addEventListener('load', () => {
    dom.InitGameDomNomal();
    dom.LoadPlayerData(player);
});
