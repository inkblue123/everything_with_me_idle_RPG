import { hide_div, Gradient_div } from '../Function/Dom_function.js';
import { init_game_dom } from '../Dom/Dom.js';
import { start_game_loop } from '../GameRun/run_manage.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//新游戏读档加载
function init_game() {
    //全局配置和全局对象初始化
    global.init();
    //玩家类初始化
    player.init();
    //初始化游戏界面
    init_game_dom();

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
        player.load_player_class(save_obj.player_save);
        global.load_global_manage(save_obj.global_save);
    } else {
        //没有存档文件，进行新游戏初始化
        new_game_init();
    }
}
//存档
function save_game() {
    let save_obj = new Object();
    //保存需要的游戏参数
    save_obj.global_save = global.save_global_manage();
    save_obj.player_save = player.save_player_class();

    //将存档对象转换成字符串
    let save_JSON_str = JSON.stringify(save_obj);
    console.log('%s', save_JSON_str);

    //用base64加密
    let save_str = utf8_to_b64(save_JSON_str);
    console.log('%s', save_str);
    //存储到浏览器内存中
    window.localStorage.setItem('v0.1', save_str);

    //将存档输出到提示框中，弹窗显示出来
    // let tooltip = document.getElementById('tooltip');
    // tooltip.InitTip('save_game', save_str);
}
//删除当前存档-弹窗提示玩家删除存档
function save_game_show_tip() {
    let save_str = window.localStorage.getItem('v0.1');
    let tooltip = document.getElementById('tooltip');
    tooltip.InitTip('save_game', save_str);
}
//删除当前存档-弹窗提示玩家删除存档
function delete_save_show_tip() {
    let tooltip = document.getElementById('tooltip');
    tooltip.InitTip('delete_save', null);
    // window.localStorage.setItem('v0.1', '');
}
//删除当前存档
function delete_save() {
    window.localStorage.setItem('v0.1', '');
}

//导入存档功能-弹窗接收玩家输入存档文件
function load_save_show_tip() {
    let tooltip = document.getElementById('tooltip');
    tooltip.InitTip('load_save', null);
}
//导入存档功能-加载存档数据，重新开始游戏
function load_save(save_str) {
    let save_obj;
    if (save_str.indexOf('global_save') != -1) {
        //输入内容是明文字符串存档
        //字符串->对象->字符串，去掉多于的换行和空格
        save_str = JSON.stringify(JSON.parse(save_str));
        console.log('%s', save_str);
        //用base64加密
        let b64_save_str = utf8_to_b64(save_str);
        console.log('%s', b64_save_str);
        //在浏览器中保存存档
        window.localStorage.setItem('v0.1', b64_save_str);

        //把字符串转换成存档对象
        save_obj = JSON.parse(save_str);
    } else {
        //输入的是b64加密存档
        //在浏览器中保存存档
        window.localStorage.setItem('v0.1', save_str);
        //base64解密
        console.log('%s', save_str);
        save_str = b64_to_utf8(save_str);
        //把字符串转换成存档对象
        console.log('%s', save_str);
        save_obj = JSON.parse(save_str);
    }

    //针对新游戏开场剧情的处理
    if (!global.get_flag('new_game_start')) {
        //如果没完成开场剧情就读档，需要将游戏恢复成普通状态
        finish_new_game_init();
    } else {
        //其他情况下读档，也需要将游戏恢复到普通状态
        finish_new_game_init();
    }

    //用存档对象里的内容加载游戏
    player.load_player_class(save_obj.player_save);
    global.load_global_manage(save_obj.global_save);
    //重新启动游戏循环
    start_game_loop();
}

//开始新游戏，进行开场剧情的准备
function new_game_init() {
    //开场剧情需要，隐藏部分界面
    hide_div('player_status');
    hide_div('Combat_plan');
    hide_div('Live_plan');
    hide_div('Store');
    hide_div('map');
    hide_div('game_log');
    hide_div('control_name_left_div');
    hide_div('control_name_right_div');
    //开场剧情需要，设置初始属性
    let P_attr = player.get_player_attributes();
    P_attr.set_data_attr('health_point', 20);
    //开场剧情在村庄诊所
    let place_manage = global.get_place_manage();
    // place_manage.set_now_place('village_home');
    place_manage.set_now_place('village_hospital');
    //启动开场剧情
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.start_game_event('new_game_start');
    game_event_manage.start_game_event('main_quest_1');
}
//把游戏从开场剧情状态恢复成正常状态
function finish_new_game_init() {
    //恢复开场剧情隐藏的界面
    Gradient_div('player_status');
    Gradient_div('Combat_plan');
    Gradient_div('Live_plan');
    Gradient_div('Store');
    Gradient_div('map');
    Gradient_div('control');
    Gradient_div('game_log');
    Gradient_div('control_name_left_div');
    Gradient_div('control_name_right_div');
    //血量设置
    let P_attr = player.get_player_attributes();
    P_attr.set_data_attr('health_point', 100);
    //当前地点
    let place_manage = global.get_place_manage();
    place_manage.set_now_place('village_hospital');
}
//把明文字符串转换成base64编码
function utf8_to_b64(str) {
    // return decodeURIComponent(escape(window.atob(str)));
    try {
        //人工实现
        return btoa(
            encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                return String.fromCharCode(parseInt(p1, 16));
            })
        );
        // 使用旧的js不再继续支持的函数实现
        // return window.btoa(unescape(encodeURIComponent(str)));
    } catch (err) {
        return '';
    }
}
//把base64编码转换成原始字符串
function b64_to_utf8(str) {
    try {
        //人工实现
        // 1. 使用atob解码Base64字符串
        const binaryStr = atob(str);
        // 2. 将每个字节转换为%XX形式
        let uriEncoded = '';
        for (let i = 0; i < binaryStr.length; i++) {
            const hex = binaryStr.charCodeAt(i).toString(16).padStart(2, '0');
            uriEncoded += '%' + hex;
        }
        // 3. 使用decodeURIComponent解码
        return decodeURIComponent(uriEncoded);

        // 使用旧的js不再继续支持的函数实现
        // return decodeURIComponent(escape(window.atob(str)));
    } catch (err) {
        return '';
    }
}

export {
    init_game, //
    save_game,
    save_game_show_tip,
    delete_save,
    delete_save_show_tip,
    load_save,
    load_save_show_tip,
};
