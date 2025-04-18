import { enums } from './Enum/Enum.js';
import { game_events } from './Game_event/Game_Event.js';

//游戏数据库初始化
function game_data_init() {
    Enum_init();
}

function Enum_init() {
    for (let id in game_events) {
        let type = game_events[id].type;
        enums.important_nodes[type].push(id);
    }
}

export { game_data_init };
