import { updata_equipment_show, updata_BP_value, updata_player_active } from '../Function/Updata_func.js';
import { hide_div } from '../Function/Dom_function.js';
import { global } from '../GameRun/global_class.js';
import { player } from '../Player/Player.js';

//游戏存档加载
function load_game() {
    let save_str;
    //从浏览器内存中获取存档
    save_str = window.localStorage.getItem('v0.1');

    if (save_str) {
        //base64解密
        console.log('%s', save_str);
        save_str = b64_to_utf8(save_str);
        //把字符串转换成存档对象
        console.log('%s', save_str);
        let save_obj = JSON.parse(save_str);
        //用存档对象里的内容加载游戏
        global.load_global_class(save_obj.global_save);
    } else {
        //没有存档文件，进行新游戏初始化
        new_game_init();
    }
}
//存档
function save_game() {
    let save_obj = new Object();
    //保存需要的游戏参数
    save_obj.global_save = global.save_global_class();

    //将存档对象转换成字符串
    let save_JSON_str = JSON.stringify(save_obj);
    console.log('%s', save_JSON_str);
    //用base64加密
    let save_str = utf8_to_b64(save_JSON_str);
    console.log('%s', save_str);
    //存储到浏览器内存中
    window.localStorage.setItem('v0.1', save_str);
}
//开始新游戏，进行开场剧情的准备
function new_game_init() {
    //开场剧情需要，隐藏部分界面
    hide_div('player_status');
    hide_div('Combat_plan');
    hide_div('live_plan');
    hide_div('map');
    hide_div('game_log');
    hide_div('control_name_left_div');
    hide_div('control_name_right_div');
    //开场剧情需要，设置初始属性
    let player_attributes = player.get_player_attributes();
    player_attributes.set_a_attr('health_point', 20);
    //开场剧情在村庄诊所
    let place_manage = global.get_place_manage();
    place_manage.set_now_place('village_hospital');
    //启动开场剧情
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.start_mini_event('new_game_start');
}

function utf8_to_b64(str) {
    try {
        return btoa(decodeURIComponent(encodeURIComponent(str)));
        // return Base64.encode(str);
        // return Base64.encode(decodeURIComponent(encodeURIComponent(str)));
    } catch (err) {
        return '';
    }
}
function b64_to_utf8(str) {
    try {
        return decodeURIComponent(encodeURIComponent(atob(str))); // 解码回原始字符串
        // return Base64.decode(str);
    } catch (err) {
        return '';
    }
}

//玩家参数初始化
function player_init() {
    //初始化玩家类
    player.init();
    let player_attributes = player.get_player_attributes();
    player_attributes.set_a_attr('health_point', 20); //新存档配合新手剧情，设置初始属性
    // let All_Skills = player.get_player_All_Skills();
    // All_Skills.player_unlock_skill('shield_defense'); //主动技能测试
    // All_Skills.player_unlock_skill('normal_attack_Melee');
    // All_Skills.player_unlock_skill('energy_storage_attack');
    // All_Skills.player_unlock_skill('test_3_slot_skill');
    // All_Skills.player_unlock_skill('test_4_slot_skill');
    //测试物品和装备系统
    // player.Player_get_item('Oak_logs', 10);
    // player.Player_get_item('wood_sword', 1, 'damaged');
    // player.Player_get_item('wood_sword', 2, 'ordinary');
    // player.Player_get_item('wood_sword', 2, 'excellent');
    // player.Player_get_item('wood_battle_axe', 2, 'ordinary'); //双手武器测试
    // player.Player_get_item('wood_battle_axe', 2, 'excellent');
    // player.Player_get_item('test_hand_gun', 1, 'ordinary'); //复合可穿戴位置装备测试
    // player.Player_get_item('test_hand_gun', 1, 'excellent');
    // player.Player_get_item('test_shield', 1, 'ordinary'); //盾牌测试
    // player.Player_get_item('test_shield', 1, 'excellent');
    // player.Player_get_item('test_boomerang', 1, 'ordinary');
    // player.Player_get_item('test_boomerang', 3, 'excellent');
    // player.Player_get_item('test_boomerang', 5, 'rare');
    // player.Player_get_item('test_boomerang', 8, 'epic');
    // player.Player_get_item('wood_bow', 1, 'ordinary'); //远程武器测试
    // let P_Askill = player.get_player_ASkill_Manage();
    // P_Askill.set_active_skill('shield_defense', 0); //在第0个主动技能槽里设置普通攻击
    // P_Askill.set_active_skill('normal_attack_Melee', 0); //在第0个主动技能槽里设置普通攻击
}
//游戏界面初始化
function dom_init() {
    // 将每个装备栏中的信息初始化
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    for (const radio of radios) {
        updata_equipment_show(radio.value);
    }
    //移动到初始位置
    let place_manage = global.get_place_manage();
    // place_manage.set_now_place('test_normal1');
    place_manage.set_now_place('village_hospital');

    //新存档配合新手剧情，隐藏部分界面
    // hide_div('player_status');
    // hide_div('Combat_plan');
    // hide_div('live_plan');
    // hide_div('map');
    // hide_div('game_log');
    // hide_div('control_name_left_div');
    // hide_div('control_name_right_div');
}

export { load_game, save_game };
