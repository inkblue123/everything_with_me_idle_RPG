import { dom } from './Dom/Dom.js';
import { LoadSaveFile } from './LoadAndSave/load.js';
import { updata_game } from './GameRun/run_manage.js';

window.addEventListener('load', () => {
    //启动第一个类，dom类，
    // 负责构建全部游戏界面
    dom.InitGameDomNomal();

    //启动第二个类，dom管理类，
    // 负责为游戏内的按钮、单选框等等功能绑定触发后需要执行的函数
    //（一二类也许可以合并）

    //启动第三个类，存档加载类，
    //负责解读存档数据中获取信息，初始化玩家数据、配置数据等等
    LoadSaveFile();

    //更新一次游戏的各个界面（可能不需要）
    updata_game();

    //启动第四个类，游戏运行类，
    //负责按帧计算游戏内的数据，每帧更新一次游戏各个界面
});
