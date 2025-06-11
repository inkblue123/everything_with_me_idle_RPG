import { enums } from './Enum/Enum.js';
import { game_events } from './Game_event/Game_Event.js';

//游戏数据库初始化
function game_data_init() {
    Enum_init();
}

function Enum_init() {
    for (let id in game_events) {
        //把4种重要节点放到枚举类中，用于判断某事件属于哪种重要事件
        let type = game_events[id].type;
        if (type == 'main_quest' || type == 'challenge' || type == 'achievement' || type == 'mini_event') {
            enums.important_nodes[type].push(id);
        }
    }
}

export { game_data_init };
