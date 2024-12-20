import { player } from './Player.js';
import { dom } from './Dom/Dom.js';

window.addEventListener('load', () => {
    //构造游戏界面，仅仅使用div、button等等元素进行组合
    dom.InitGameDomNomal();
    //使游戏界面内的按钮、单选等等功能生效

    //加载玩家数据
    dom.LoadPlayerData(player);
});
