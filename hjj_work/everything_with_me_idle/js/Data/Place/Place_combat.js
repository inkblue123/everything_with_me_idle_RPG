import { add_combat_Place } from './Place_class.js';

//战斗地点初始化
function init_Place_combat(places) {
    let id = 'test_combat1';
    add_combat_Place(places, id);
    //可联通地点的id
    places[id].connected_place = ['test_normal1'];
    //战斗地点-刷怪相关内容
    places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
    //刷怪方式的约束条件
    places[id].type_limit = {
        field: 'near_enemy_field', //只允许刷在近距离
        // distance: 50, //只允许刷在指定距离
    };
    places[id].enemy = ['Training_Dummy']; //能刷什么敌人
    places[id].max_enemy_num = 5;
    places[id].add_enemy_time = 3; //刷怪间隔
    places[id].unlimited_add_flag = true; //是否无限刷怪
}
export { init_Place_combat };
