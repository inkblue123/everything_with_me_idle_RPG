import { player } from '../Player/Player.js';
import { global } from './global_class.js';
import { places } from '../Data/Place/Place.js';
import { addElement } from '../Function/Dom_function.js';
import { get_combat_place_enemynum } from '../Function/Get_func.js';
import {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_BP_value,
    updata_attribute_show,
    updata_player_name,
    update_enemy_show,
} from '../Function/Updata_func.js';
import { texts } from '../Data/Text/Text.js';

function state_game() {
    //更新需要即时变动的游戏内容
    updata_game();

    if (global.get_combat_statu()) {
        updata_combat();
        // let random_manage = global.get_random_manage();
        // let num = random_manage.get_random(1, 10);
        // console.log(` ${num}`);
    }
    //睡眠一段时间，保证游戏一秒运行帧数次
    let sleep_ms = global.get_sleep_ms();
    setTimeout(state_game, 1000);
}

//更新游戏界面中的信息
function updata_game() {
    updata_HP();
    updata_MP();
    updata_ENP();
    updata_player_name();
    updata_attribute_show();
    // updata_BP_value();//其实不用在每时每刻更新，只要在背包物品发生变动的时候更新即可
}
//战斗中，计算一帧之后的战斗内容
function updata_combat() {
    let place_manage = global.get_place_manage();
    //刷出新怪
    let now_place = place_manage.get_now_place();
    if (get_combat_place_enemynum() < places[now_place].max_enemy_num) {
        //可以刷怪
        //获取刷怪坐标
        let place_x = global.get_random(1, 3);
        if (place_x == 1) place_x = 'near_enemy_field';
        if (place_x == 2) place_x = 'in_enemy_field';
        if (place_x == 3) place_x = 'far_enemy_field';
        let place_y = global.get_random(0, 8);
        //获取这次要刷的敌人id
        let enemy_id = places[now_place].enemy[0];
        //在指定地点新增这个怪
        let enemy = place_manage.add_enemy(place_x, place_y, enemy_id);
        //刷新战斗场景中指定位置，展示这个怪
        update_enemy_show(enemy, place_x, place_y);
    }
    //玩家动作
    //敌人动作
    //战斗结果
}

export { updata_game, state_game };
