import { player, Player_Object } from '../Player/Player.js';
import { updata_equipment_show } from '../Function/Updata_func.js';
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
    //玩家参数初始化
    player_init();
    //游戏界面初始化
    dom_init();
}

function player_init() {
    //初始化玩家类
    player.init();

    player.Player_get_item('Oak_logs', 10);
    player.Player_get_item('wood_sword', 1, 'damaged');
    player.Player_get_item('wood_sword', 2, 'ordinary');
    player.Player_get_item('wood_sword', 2, 'excellent');
    player.Player_get_item('wood_battle_axe', 2, 'ordinary'); //双手武器测试
    player.Player_get_item('wood_battle_axe', 2, 'excellent');
    player.Player_get_item('test_hand_gun', 1, 'ordinary'); //复合可穿戴位置装备测试
    player.Player_get_item('test_hand_gun', 1, 'excellent');
    player.Player_get_item('test_shield', 1, 'ordinary'); //盾牌测试
    player.Player_get_item('test_shield', 1, 'excellent');
    player.Player_get_item('test_boomerang', 1, 'ordinary');
    player.Player_get_item('test_boomerang', 3, 'excellent');
    player.Player_get_item('test_boomerang', 5, 'rare');
    player.Player_get_item('test_boomerang', 8, 'epic');
    // player.Player_get_item('wood_bow(n)', 15, 'ordinary'); //复合类型物品测试
}
function dom_init() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    // 将每个装备栏中的信息初始化
    for (const radio of radios) {
        updata_equipment_show(radio.value);
    }
}
export { LoadSaveFile };
