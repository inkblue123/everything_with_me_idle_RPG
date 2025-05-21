import { crtElement, addElement } from '../Function/Dom_function.js';
import { updata_BP_value } from '../Function/Updata_func.js';
import { printf_play_item } from '../Function/Function.js';
import { show_combat_game_div, show_normal_game_div } from '../Function/show_func.js';
import { get_UGS_BP_weight } from '../Function/Get_func.js';
import { player } from '../Player/Player.js';
import { global } from '../GameRun/global_class.js';

var Option = crtElement('div', null, 'option_page', '');
{
    var button1 = addElement(Option, 'button');
    button1.innerHTML = '完成3天的新手教学';
    button1.onclick = function () {
        //正常流程得把文本和剧情呈现到玩家控制界面，但是这个测试按钮并不想管那么多
        //所以就只是获得物品和技能，以及一些标记
        //由于这些事件的物品奖励是在对话过程中给予的，完成事件其实什么都没有，所以单独给奖励
        let game_event_manage = global.get_game_event_manage();
        let All_Skills = player.get_player_All_Skills();
        game_event_manage.end_mini_event('new_player_teach_1', 'finish');
        All_Skills.player_unlock_skill('normal_attack_Melee');
        player.Player_get_item('wood_sword', 1, 'ordinary');
        player.Player_get_item('wood_helmet', 1, 'ordinary');
        player.Player_get_item('wood_chest_armor', 1, 'ordinary');
        player.Player_get_item('wood_leg_armor', 1, 'ordinary');
        player.Player_get_item('wood_shoes', 1, 'ordinary');
        game_event_manage.end_mini_event('new_player_teach_2', 'finish');
        player.Player_get_item('wood_shield', 1, 'ordinary');
        All_Skills.player_unlock_skill('shield_defense');
        game_event_manage.end_mini_event('new_player_teach_3', 'finish');
    };

    var button2 = addElement(Option, 'button');
    button2.innerHTML = '完成当前重要事件';
    button2.onclick = function () {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.test_finish_now_event();
    };

    var button3 = addElement(Option, 'button');
    button3.innerHTML = '加10生命';
    button3.onclick = function () {
        let P_attr = player.get_player_attributes();
        let health_point = P_attr.get_a_attr('health_point');
        let health_max = P_attr.get_a_attr('health_max');

        if (health_point + 10 >= health_max) {
            P_attr.health_point = health_max;
        } else {
            P_attr.health_point += 10;
        }
        P_attr.updata_end_attr();
    };

    var button4 = addElement(Option, 'button');
    button4.innerHTML = '减10生命';
    button4.onclick = function () {
        let P_attr = player.get_player_attributes();
        let health_point = P_attr.get_a_attr('health_point');
        let health_max = P_attr.get_a_attr('health_max');
        if (health_point - 10 <= 0) {
            P_attr.health_point = 0;
        } else {
            P_attr.health_point -= 10;
        }
        P_attr.updata_end_attr();
        // updata_HP();
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予一个橡木原木';
    button5.onclick = function () {
        // printf_play_item();
        player.Player_get_item('Oak_logs', 1);
        // printf_play_item();
        printf_play_item();
        get_UGS_BP_weight();
    };

    var button5 = addElement(Option, 'button');
    button5.innerHTML = '给予玩家一个未定义物品';
    button5.onclick = function () {
        printf_play_item();
        player.Player_get_item(10, 1);
        printf_play_item();
    };
}

export { Option };
