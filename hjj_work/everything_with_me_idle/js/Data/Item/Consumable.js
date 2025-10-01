import { texts } from '../Text/Text.js';
import { add_Consumable_object } from './Item_class.js';

//初始化物品数据库中与消耗品相关的文本
function init_Item_Consumable(items) {
    //食材
    init_ingredient(items);
    //食品
    init_food(items);
    //干制品
    init_dry_product(items);
    //药材
    init_crude_drug(items);
    //药水
    init_potion(items);
    //丹药
    init_elixir(items);

    //箭矢
    init_arrow(items);
    //弩箭
    init_bolt(items);
    //喷枪弹药
    init_spray_gun_bullet(items);
    //可投掷弹药
    init_throwable(items);
    //法术核心弹药
    init_magic_core_bullet(items);

    //鱼饵
    init_bait(items);
    //宝箱
    init_treasure_chest(items);
    //凡间钱币
    init_ordinary_coin(items);
}
//食材
function init_ingredient(items) {
    let id;
    let secon_type = 'ingredient'; //消耗品大类中的食材小类

    id = 'red_berry'; //红浆果
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'yellow_berry'; //黄浆果
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'black_berry'; //黑浆果
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
}
//食品
function init_food(items) {
    let id;
    let secon_type = 'food'; //消耗品大类中的食品小类

    id = 'grilled_fish'; //烤鱼串
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 10); //物品价值
    id = 'big_grilled_fish'; //大烤鱼串
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 15); //物品价值
    id = 'roasted_crab'; //烤螃蟹
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 8); //物品价值
    id = 'cooked_mussel'; //熟蚌肉
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 5); //物品价值
    id = 'cooked_animal_meat'; //熟兽肉
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 10); //物品价值

    id = 'termite_mushroom_soup'; //鸡枞汤
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 130); //物品价值
}
//干制品
function init_dry_product(items) {
    let id;
    let secon_type = 'dry_product'; //消耗品大类中的食品小类

    id = 'fish_jerky'; //鱼肉干
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 30); //物品价值
    id = 'animal_jerky'; //兽肉干
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 35); //物品价值
    id = 'berry_dried_fruit'; //浆果果干
    add_Consumable_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 25); //物品价值
}
//药材
function init_crude_drug(items) {
    let id;
    let secon_type = 'crude_drug'; //消耗品大类中的药材小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//药水
function init_potion(items) {
    let id;
    let secon_type = 'potion'; //消耗品大类中的药水小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//丹药
function init_elixir(items) {
    let id;
    let secon_type = 'elixir'; //消耗品大类中的丹药小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//箭矢
function init_arrow(items) {
    let id;
    let secon_type = 'arrow'; //消耗品大类中的箭矢小类

    id = 'wood_arrow'; //木制箭矢
    add_Consumable_object(items, id);
    items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 3); //物品价值
}
//弩箭
function init_bolt(items) {
    let id;
    let secon_type = 'bolt'; //消耗品大类中的弩箭小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//喷枪弹药
function init_spray_gun_bullet(items) {
    let id;
    let secon_type = 'spray_gun_bullet'; //消耗品大类中的喷枪弹药小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//可投掷弹药
function init_throwable(items) {
    let id;
    let secon_type = 'throwable'; //消耗品大类中的可投掷弹药小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//法术核心弹药
function init_magic_core_bullet(items) {
    let id;
    let secon_type = 'magic_core_bullet'; //消耗品大类中的法术核心弹药小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//鱼饵
function init_bait(items) {
    let id;
    let secon_type = 'bait'; //消耗品大类中的鱼饵小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}
//宝箱
function init_treasure_chest(items) {
    let id;
    let secon_type = 'treasure_chest'; //消耗品大类中的宝箱小类

    // id = 'AAAA'; //
    // add_Consumable_object(items, id);
    // items[id].init_Item_other(100, secon_type); //堆叠数量，物品大分类
}

//凡间钱币
function init_ordinary_coin(items) {
    let id;
    let secon_type = 'ordinary_coin'; //消耗品大类中的凡间钱币小类

    id = 'copper_coin'; //铜币
    add_Consumable_object(items, id);
    items[id].init_Item_other(500, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'greedy_copper_coin'; //贪婪的铜币
    add_Consumable_object(items, id);
    items[id].init_Item_other(1, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'sliver_coin'; //银币
    add_Consumable_object(items, id);
    items[id].init_Item_other(500, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 100); //物品价值
    id = 'gold_coin'; //金币
    add_Consumable_object(items, id);
    items[id].init_Item_other(500, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 10000); //物品价值
}

export { init_Item_Consumable };
