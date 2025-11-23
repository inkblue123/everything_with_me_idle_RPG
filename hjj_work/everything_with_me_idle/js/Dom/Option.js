import { crtElement, addElement } from '../Function/Dom_function.js';
import { get_item_obj } from '../Function/Function.js';
import { get_random } from '../Function/math_func.js';
import { save_game, save_game_show_tip, delete_save, load_save, load_save_show_tip } from '../LoadAndSave/load.js';
import { player } from '../Player/Player.js';
import { P_skills } from '../Data/Skill/Skill.js';
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

    //  button_div = addElement(option_page, 'button');
    // button_div.innerHTML = '进入测试战斗地点';
    // button_div.onclick = function () {
    //     let place_manage = global.get_place_manage();
    //     place_manage.set_now_place('test_combat1');
    // };
    // button_div = addElement(option_page, 'button');
    // button_div.innerHTML = '血量设0';
    // button_div.onclick = function () {
    //     let P_attr = player.get_player_attributes();
    //     P_attr.set_data_attr('health_point', 0);
    // };
    // button_div = addElement(option_page, 'button');
    // button_div.innerHTML = '精力设0';
    // button_div.onclick = function () {
    //     let P_attr = player.get_player_attributes();
    //     P_attr.set_data_attr('surface_energy_point', 0);
    // };
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
    // button_div = addElement(option_page, 'button');
    // button_div.innerHTML = '技能测试';
    // button_div.onclick = function () {
    //     player_skill_test();
    // };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = 'css特效测试';
    button_div.onclick = function () {
        startMagicAnimation();
    };
    button_div = addElement(option_page, 'button');
    button_div.innerHTML = '随机数测试';
    button_div.onclick = function () {
        let data = Math.random();
        // let data = get_random(0, 100);
        console.log('%s', data);
    };
}

//暂停游戏
function stop_game_speed() {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_num('global', 0);
}
//恢复游戏
function start_game_speed() {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_num('global', 1);
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
    player.Player_get_item('test_boomerang', 1, 'ordinary');
    player.Player_get_item('test_boomerang', 3, 'excellent');
    player.Player_get_item('test_boomerang', 5, 'rare');
    player.Player_get_item('hatchet', 1, 'ordinary');
    player.Player_get_item('mowing_sickle', 1, 'ordinary');
}

//技能测试
function player_skill_test() {
    let P_All_Skills = player.get_player_All_Skills();
    P_All_Skills.skill_levelup('lucky_finder');
}
//css特效测试
function startMagicAnimation() {
    const textElement = document.getElementById('FAG_show_tip_text');
    const text = '道法自然，万法归宗';
    textElement.innerHTML = text;

    // 重置位置
    textElement.style.transform = 'translateY(-100px)';

    let startTime = null;
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const duration = 500; // 动画时长1.5秒

        if (progress < duration) {
            // 计算动画进度 (0-1)
            const progressRatio = progress / duration;

            // 缓动函数 - 先快后慢
            const easeOut = 1 - Math.pow(1 - progressRatio, 3);

            // 位置移动
            const newY = -100 + easeOut * 100;
            textElement.style.transform = `translateY(${newY}px)`;

            // 透明度变化

            requestAnimationFrame(animate);
        } else {
            // 动画结束
            textElement.style.transform = 'translateY(0)';
        }
    }

    requestAnimationFrame(animate);
}

export { create_Option };
