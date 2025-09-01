import { init_game } from './LoadAndSave/load.js';
import { state_game } from './GameRun/run_manage.js';
import { game_data_init } from './Data/Data.js';
import { game_dom_init } from './Dom/Dom.js';
import { global } from './GameRun/global_manage.js';
import { player } from './Player/Player.js';
import { dom } from './Dom/Dom.js';

window.addEventListener('load', () => {
    //加载游戏布局
    game_dom_init();
    //部分游戏数据初始化
    game_data_init();
    //全局配置和全局对象初始化
    global.init();
    //玩家类初始化
    player.init();
    //游戏界面初始化
    dom.init();

    //开始存档加载，解读存档数据中获取信息，初始化玩家数据、配置数据等等
    init_game();

    //启动第四个类，游戏运行类，
    //负责按帧计算游戏内的数据，每帧更新一次游戏各个界面
    state_game();
});
