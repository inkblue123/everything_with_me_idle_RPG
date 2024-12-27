import { player } from '../Player/player.js';
import { update_equipment_show } from '../Function/Update_func.js';
//
function LoadSaveFile(save_file) {
    if (save_file) {
        //读取存档文件
    } else {
        //没有存档文件，进行新游戏初始化
        new_game_init();
    }
}

function new_game_init() {
    //游戏界面初始化
    dom_init();
    //玩家参数初始化
    player_init();
}

function player_init() {
    player.Player_get_item('Oak_logs', 10);
    player.Player_get_item('wood_sword', 1, 'damaged');
    player.Player_get_item('wood_sword', 2, 'ordinary');
    player.Player_get_item('wood_battle_axe', 2, 'ordinary');
    player.Player_get_item('wood_battle_axe', 2, 'excellent');

    player.Player_get_item('wood_battle_axe', 2, 'excellent');
}
function dom_init() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    // 将每个装备栏中的信息初始化
    for (const radio of radios) {
        update_equipment_show(radio.value);
    }
}
export { LoadSaveFile };
