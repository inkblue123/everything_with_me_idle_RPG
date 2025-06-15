import { add_store_Place } from './Place_class.js';

function init_Place_store(places) {
    let id = 'village_hospital_pharmacy'; //村庄诊所-药房
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    places[id].add_goods('Oak_logs', 1);
}

export { init_Place_store };
