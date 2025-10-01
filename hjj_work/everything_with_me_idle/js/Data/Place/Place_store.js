import { add_store_Place } from './Place_class.js';

function init_Place_store(places) {
    let id = 'VH_pharmacy'; //村庄诊所-药房
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    // places[id].add_infinite_normal_goods('Oak_logs');
    places[id].add_goods('Oak_logs');

    id = 'VM_smithy'; //村庄集市-铁匠铺
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    // places[id].add_infinite_normal_goods('Oak_logs');

    id = 'VM_woodshop_showcase'; //村庄集市-木工坊-商品橱窗
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    //橡树原木，固定商品，无限库存，不会涨价，不需要补货
    places[id].add_goods('Oak_logs', 'fixed', 'infinite', null, null, null, null);
    places[id].set_use_money_type('ordinary_coin');

    id = 'VM_trade_hub'; //村庄集市-交易市场
    add_store_Place(places, id, 'village');
    //该商店的商品列表
    // places[id].add_infinite_normal_goods('Oak_logs');
}

export { init_Place_store };
