import { add_Place_object } from './Place_class.js';

function init_Place_other(places) {
    let id = 'village_home_bed'; //村中住所-床上
    add_Place_object(places, id, 'village');
    places[id].add_other_normal_place('village_home', 'village_square');
    places[id].buff = {
        id: 'buff1', //buff的id
        data_attr: 'health_point', //回血
        time_type: 'game_time', //这个buff的时间计算方式，game_time是基于游戏内时间
        time_value: 'infinite', //持续时间无限
        //基于游戏内时间，最小单位是游戏内1分钟（现实1秒），
        //buff生效之后对属性产生的效果
        sec_data: 5,
    };
}

export { init_Place_other };
