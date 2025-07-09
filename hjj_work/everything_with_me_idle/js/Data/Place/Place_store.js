import { add_store_Place } from './Place_class.js';

function init_Place_store(places) {
    let id = 'VH_pharmacy'; //村庄诊所-药房
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    places[id].add_goods('Oak_logs', 1);

    id = 'VM_smithy'; //村庄集市-铁匠铺
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    places[id].add_goods('Oak_logs', 1);

    id = 'VM_woodshop'; //村庄集市-木工坊
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    places[id].add_goods('Oak_logs', 1);

    id = 'VM_trade_hub'; //村庄集市-交易市场
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    places[id].add_goods('Oak_logs', 1);
}

export { init_Place_store };
