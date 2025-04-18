import { LoadSaveFile } from './LoadAndSave/load.js';
import { state_game } from './GameRun/run_manage.js';
import { game_data_init } from './Data/Data.js';
import { game_dom_init } from './Dom/Dom.js';

window.addEventListener('load', () => {
    //加载游戏布局
    game_dom_init();
    //部分游戏数据初始化
    game_data_init();

    //启动第三个类，存档加载类，
    //负责解读存档数据中获取信息，初始化玩家数据、配置数据等等
    LoadSaveFile();

    //启动第四个类，游戏运行类，
    //负责按帧计算游戏内的数据，每帧更新一次游戏各个界面
    state_game();
});
