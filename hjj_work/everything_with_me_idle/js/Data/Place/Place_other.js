import { add_Place_object } from './Place_class.js';

function init_Place_other(places) {
    let id;
    let area = 'village';

    id = 'village_home_bed'; //村中住所-床上
    add_Place_object(places, id, area);
    places[id].add_connect_normal_place('village_home', 'village_square');
    places[id].buff = ['sleep_1'];
    //设置条件触发事件，满足临用游戏状态-当前处于起床时间点
    places[id].add_condition_trigger_event('get_up', 'UGS_get_up_time_flag', true);
}

export { init_Place_other };
