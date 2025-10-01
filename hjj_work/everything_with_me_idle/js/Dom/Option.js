import { crtElement, addElement } from '../Function/Dom_function.js';
import { get_item_obj } from '../Function/Function.js';
import { save_game, delete_save, load_save, load_save_show_tip } from '../LoadAndSave/load.js';
import { player } from '../Player/Player.js';
import { global } from '../GameRun/global_manage.js';

//创建处于整个游戏下发的设置界面
function create_Option() {
    let option_page = crtElement('div', 'option_page', null, '');
    make_option_page_test_div(option_page);
    // make_option_page_div(option_page);
    // set_option_page_button(option_page);
    return option_page;
}
//生成测试用的按钮
function make_option_page_test_div(option_page) {
    let button_div;
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '完成3天的新手教学';
    button_div.onclick = function () {
        finish_new_player_teach_123();
    };

    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '完成当前挑战';
    button_div.onclick = function () {
        finish_now_challenge();
    };

    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '逐渐解锁生活技能';
    button_div.onclick = function () {
        unlock_live_plan_skill();
    };

    // let button3 = addElement(option_page, 'button');
    // button3.innerHTML = '暂停游戏';
    // button3.onclick = function () {
    //     stop_game_speed();
    // };

    // let button4 = addElement(option_page, 'button');
    // button4.innerHTML = '恢复游戏';
    // button4.onclick = function () {
    //     start_game_speed();
    // };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '导出存档';
    button_div.onclick = function () {
        save_game();
    };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '清空存档';
    button_div.onclick = function () {
        delete_save();
    };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '导入存档';
    button_div.onclick = function () {
        load_save_show_tip();
    };
    //  button_div = addElement(option_page, 'button');
    // button_div.innerHTML = '进入测试战斗地点';
    // button_div.onclick = function () {
    //     let place_manage = global.get_place_manage();
    //     place_manage.set_now_place('test_combat1');
    // };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '血量设0';
    button_div.onclick = function () {
        let P_attr = player.get_player_attributes();
        P_attr.set_data_attr('health_point', 0);
    };
    //  button_div = addElement(option_page, 'button');
    // button_div0.innerHTML = '杀光通道的敌人';
    // button_div0.onclick = function () {
    //     let enemy_manage = global.get_enemy_manage();
    //     enemy_manage.add_kill_enemy_num(99);
    // };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '物品测试';
    button_div.onclick = function () {
        give_player_item();
    };
}
//完成3天的新手教学
function finish_new_player_teach_123() {
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
}
//完成当前挑战
function finish_now_challenge() {
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.test_finish_now_challenge();
    game_event_manage.init_IE_div();
}
//逐渐解锁生活技能
function unlock_live_plan_skill() {
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
}
//暂停游戏
function stop_game_speed() {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed(0);
}
//恢复游戏
function start_game_speed() {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed(1);
}
//切换商店界面和生活规划界面
function change_store_liveplan_div() {
    const Live_plan_div = document.getElementById('Live_plan');
    const Store_div = document.getElementById('Store');

    if (Live_plan_div.style.display == '') {
        Live_plan_div.style.display = 'none';
        Store_div.style.display = '';
    } else {
        Live_plan_div.style.display = '';
        Store_div.style.display = 'none';
    }
}
// 物品测试
function give_player_item() {
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

    player.Player_get_item('wood_sword', 6, 'damaged');
    player.Player_get_item('wood_sword', 6, 'ordinary');
    player.Player_get_item('wood_sword', 6, 'excellent');
    player.Player_get_item('wood_sword', 6, 'rare');
    player.Player_get_item('wood_sword', 6, 'epic');
}

export { create_Option };
