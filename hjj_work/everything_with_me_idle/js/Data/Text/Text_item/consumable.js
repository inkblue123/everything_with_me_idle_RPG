import { add_text_object } from '../Text_class.js';

//初始化文本库中与消耗品相关的文本
function init_Text_consumable(texts) {
    //食材
    init_Text_ingredient(texts);
    //食品
    init_Text_food(texts);
    //干制品
    init_Text_dry_product(texts);
    //药材
    init_Text_crude_drug(texts);
    //药水
    init_Text_potion(texts);
    //丹药
    init_Text_elixir(texts);

    //箭矢
    init_Text_arrow(texts);
    //弩箭
    init_Text_bolt(texts);
    //喷枪弹药
    init_Text_spray_gun_bullet(texts);
    //可投掷弹药
    init_Text_throwable(texts);
    //法术核心弹药
    init_Text_magic_core_bullet(texts);

    //鱼饵
    init_Text_bait(texts);
    //宝箱
    init_Text_treasure_chest(texts);
    //凡间钱币
    init_Text_ordinary_coin(texts);
}
//食材
function init_Text_ingredient(texts) {
    let id;

    id = 'red_berry';
    add_text_object(texts, id);
    texts[id].item_name = '红浆果';
    texts[id].item_desc = '可食用的红色浆果，味道酸甜可口';
    id = 'yellow_berry';
    add_text_object(texts, id);
    texts[id].item_name = '黄浆果';
    texts[id].item_desc = '可食用的红色浆果，几乎没有味道，寡淡如嚼水';
    id = 'black_berry';
    add_text_object(texts, id);
    texts[id].item_name = '黑浆果';
    texts[id].item_desc = '可食用的红色浆果，味道辛辣，不好吃';
    // id = 'apple';
    // add_text_object(texts, id);
    // texts[id].item_name = '苹果';
    // texts[id].item_desc = '一天一苹果，医生远离我';
}
//食品
function init_Text_food(texts) {
    let id;

    id = 'grilled_fish';
    add_text_object(texts, id);
    texts[id].item_name = '烤鱼串';
    texts[id].item_desc = '使用小鱼简单烹饪而成的菜品';
    id = 'big_grilled_fish';
    add_text_object(texts, id);
    texts[id].item_name = '大烤鱼串';
    texts[id].item_desc = '使用大鱼简单烹饪而成的菜品';
    id = 'roasted_crab';
    add_text_object(texts, id);
    texts[id].item_name = '烤螃蟹';
    texts[id].item_desc = '使用螃蟹简单烹饪而成的菜品';
    id = 'cooked_mussel';
    add_text_object(texts, id);
    texts[id].item_name = '熟蚌肉';
    texts[id].item_desc = '使用蚌类简单烹饪而成的菜品';

    id = 'cooked_animal_meat';
    add_text_object(texts, id);
    texts[id].item_name = '熟兽肉';
    texts[id].item_desc = '使用兽肉简单烹饪而成的菜品';
    id = 'termite_mushroom_soup';
    add_text_object(texts, id);
    texts[id].item_name = '鸡枞汤';
    texts[id].item_desc = '一碗清澈的金黄色汤羹，汤底如晨光般透亮，菌肉脆嫩似嫩笋，咀嚼时能渗出微甜的汁液';
}
//干制品
function init_Text_dry_product(texts) {
    let id;

    id = 'fish_jerky';
    add_text_object(texts, id);
    texts[id].item_name = '鱼肉干';
    texts[id].item_desc = '使用鱼为原料制成的肉干';
    id = 'animal_jerky';
    add_text_object(texts, id);
    texts[id].item_name = '兽肉干';
    texts[id].item_desc = '使用兽肉为原料制成的肉干';
    id = 'berry_dried_fruit';
    add_text_object(texts, id);
    texts[id].item_name = '浆果果干';
    texts[id].item_desc = '使用浆果为原料制成的果干';
}
//药材
function init_Text_crude_drug(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//药水
function init_Text_potion(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//丹药
function init_Text_elixir(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//箭矢
function init_Text_arrow(texts) {
    let id;

    id = 'wood_arrow';
    add_text_object(texts, id);
    texts[id].item_name = '木制箭矢';
    texts[id].item_desc = '使用木头制作的箭矢，没有尾羽，没有箭头，只是一根细木棍而已';
}
//弩箭
function init_Text_bolt(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//喷枪弹药
function init_Text_spray_gun_bullet(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//可投掷弹药
function init_Text_throwable(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//法术核心弹药
function init_Text_magic_core_bullet(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//鱼饵
function init_Text_bait(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//宝箱
function init_Text_treasure_chest(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//凡间钱币
function init_Text_ordinary_coin(texts) {
    let id;

    id = 'copper_coin';
    add_text_object(texts, id);
    texts[id].item_name = '铜币';
    texts[id].item_desc = '王国内流通的货币，100铜币相当于1银币';
    id = 'greedy_copper_coin';
    add_text_object(texts, id);
    texts[id].item_name = '贪婪的铜币';
    texts[id].item_desc = '被附上“贪婪”诅咒的铜币，会排斥其他钱币。<br>“你永远无法拥有更多”';
    id = 'sliver_coin';
    add_text_object(texts, id);
    texts[id].item_name = '银币';
    texts[id].item_desc = '王国内流通的货币，1银币相当于100铜币，100银币相当于1金币';
    id = 'gold_coin';
    add_text_object(texts, id);
    texts[id].item_name = '金币';
    texts[id].item_desc = '王国内流通的货币，1金币相当于100银币';
}

export { init_Text_consumable };
