import { add_combat_Place } from './Place_class.js';

//战斗地点初始化
function init_Place_combat(places) {
    let id = 'test_combat1';
    add_combat_Place(places, id);
    //可联通地点的id
    places[id].connected_place = ['test_normal1'];
    //战斗地点-可以刷的怪
    places[id].enemy = ['Training_Dummy'];
    places[id].max_enemy_num = 5;
}
export { init_Place_combat };
