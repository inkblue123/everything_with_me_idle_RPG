import { player } from '../Player.js';
// 
function LoadSaveFile(save_file) {
    if (save_file) {
        //读取存档文件
    } else {
        //没有存档文件，进行新游戏初始化
        player.Player_get_item('Oak_logs', 10);
        player.Player_get_item('wood_sword', 1, 'damaged');
        player.Player_get_item('wood_sword', 2, 'ordinary');
    }
}

export { LoadSaveFile};
