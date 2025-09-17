import { crtElement, addElement } from '../Function/Dom_function.js';
import { get_random } from '../Function/math_func.js';
import { save_game, delete_save, load_save, load_save_show_tip } from '../LoadAndSave/load.js';
import { player } from '../Player/Player.js';
import { global } from '../GameRun/global_manage.js';

var Option = crtElement('div', null, 'option_page', '');
{
    let button1 = addElement(Option, 'button');
    button1.innerHTML = '完成3天的新手教学';
    button1.onclick = function () {
        //正常流程得把文本和剧情呈现到玩家控制界面，但是这个测试按钮并不想管那么多
        //所以就只是获得物品和技能，以及一些标记
        //由于这些事件的物品奖励是在对话过程中给予的，完成事件其实什么都没有，所以单独给奖励
        let game_event_manage = global.get_game_event_manage();
        let P_All_Skills = player.get_player_All_Skills();
        game_event_manage.end_mini_event('new_player_teach_1', 'finish');
        P_All_Skills.player_unlock_skill('normal_attack_Melee');
        player.Player_get_item('wood_sword', 1, 'ordinary');
        player.Player_get_item('wood_helmet', 1, 'ordinary');
        player.Player_get_item('wood_chest_armor', 1, 'ordinary');
        player.Player_get_item('wood_leg_armor', 1, 'ordinary');
        player.Player_get_item('wood_shoes', 1, 'ordinary');
        game_event_manage.end_mini_event('new_player_teach_2', 'finish');
        player.Player_get_item('wood_shield', 1, 'ordinary');
        P_All_Skills.player_unlock_skill('shield_defense');
        game_event_manage.end_mini_event('new_player_teach_3', 'finish');
        player.Player_get_item('test_sword', 1, 'ordinary'); //测试用武器
        //物品测试
        player.Player_get_item('Oak_logs', 10);
        player.Player_get_item('birch_logs', 10);
        player.Player_get_item('fir_logs', 10);
        player.Player_get_item('lightning_bark', 10);
        player.Player_get_item('frost_marrow_resin', 10);
        player.Player_get_item('viresilver_stem', 10);
        player.Player_get_item('porcini', 10);
        player.Player_get_item('chanterelle', 10);
        player.Player_get_item('termite_mushroom', 10);
        player.Player_get_item('river_mussel', 10);
        player.Player_get_item('creek_fish', 10);
        player.Player_get_item('animal_raw_meat', 10);
        player.Player_get_item('red_berry', 10);
        player.Player_get_item('yellow_berry', 10);
        player.Player_get_item('grilled_fish', 10);
        player.Player_get_item('termite_mushroom_soup', 10);
        player.Player_get_item('fish_jerky', 10);
        player.Player_get_item('wood_arrow', 10);
        player.Player_get_item('copper_coin', 10);
        player.Player_get_item('greedy_copper_coin', 10);
    };

    let button2 = addElement(Option, 'button');
    button2.innerHTML = '完成当前挑战';
    button2.onclick = function () {
        let game_event_manage = global.get_game_event_manage();
        game_event_manage.test_finish_now_challenge();
        game_event_manage.init_IE_div();
    };
    button2 = addElement(Option, 'button');
    button2.innerHTML = '逐渐解锁生活技能';
    button2.onclick = function () {
        if (!global.get_flag('GS_unlock_foraging')) {
            global.set_flag('GS_unlock_foraging', true);
        } else if (!global.get_flag('GS_unlock_fishing')) {
            global.set_flag('GS_unlock_fishing', true);
        } else if (!global.get_flag('GS_unlock_mining')) {
            global.set_flag('GS_unlock_mining', true);
        } else if (!global.get_flag('GS_unlock_logging')) {
            global.set_flag('GS_unlock_logging', true);
        } else if (!global.get_flag('GS_unlock_diving')) {
            global.set_flag('GS_unlock_diving', true);
        } else if (!global.get_flag('GS_unlock_archaeology')) {
            global.set_flag('GS_unlock_archaeology', true);
        } else if (!global.get_flag('GS_unlock_exploration')) {
            global.set_flag('GS_unlock_exploration', true);
        }
        //移动到当前位置，触发刷新界面的逻辑
        let place_manage = global.get_place_manage();
        let now_place = place_manage.get_now_place();
        place_manage.set_now_place(now_place);
    };

    // let button3 = addElement(Option, 'button');
    // button3.innerHTML = '暂停游戏';
    // button3.onclick = function () {
    //     let time_manage = global.get_time_manage();
    //     time_manage.set_game_speed(0);
    // };

    // let button4 = addElement(Option, 'button');
    // button4.innerHTML = '恢复游戏';
    // button4.onclick = function () {
    //     let time_manage = global.get_time_manage();
    //     time_manage.set_game_speed(1);
    // };
    let button5 = addElement(Option, 'button');
    button5.innerHTML = '导出存档';
    button5.onclick = function () {
        save_game();
    };
    let button6 = addElement(Option, 'button');
    button6.innerHTML = '清空存档';
    button6.onclick = function () {
        delete_save();
    };
    let button7 = addElement(Option, 'button');
    button7.innerHTML = '导入存档';
    button7.onclick = function () {
        load_save_show_tip();
    };
    let button8 = addElement(Option, 'button');
    button8.innerHTML = '进入测试战斗地点';
    button8.onclick = function () {
        let place_manage = global.get_place_manage();
        place_manage.set_now_place('test_combat1');
    };
    let button9 = addElement(Option, 'button');
    button9.innerHTML = '血量设0';
    button9.onclick = function () {
        let P_attr = player.get_player_attributes();
        P_attr.set_data_attr('health_point', 0);
    };
    let button10 = addElement(Option, 'button');
    button10.innerHTML = '杀光通道的敌人';
    button10.onclick = function () {
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.add_kill_enemy_num(99);
    };
}

export { Option };
