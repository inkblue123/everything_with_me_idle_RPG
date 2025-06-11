import { addElement } from './Dom_function.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';

//重新生成战斗界面的玩家主动技能部分
function delete_player_active_div() {
    let player_active_div = document.getElementById('player_active_div');
    player_active_div.replaceChildren(); //清空现有主动技能槽内容
    for (let i = 0; i < 9; i++) {
        var player_active = addElement(player_active_div, 'div', null, 'player_active');
        addElement(player_active, 'div', null, 'player_active_text');
    }
}
//重新生成左下战斗规划界面中战斗规划界面的主动技能展示部分
function delete_active_show_div() {
    let active_show_div = document.getElementById('active_show_div');
    active_show_div.replaceChildren(); //清空现有内容
    for (let i = 0; i < 9; i++) {
        addElement(active_show_div, 'div', null, 'active_show_value');
    }
}

export { delete_player_active_div, delete_active_show_div };
