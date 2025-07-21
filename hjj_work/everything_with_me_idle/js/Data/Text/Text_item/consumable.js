import { add_text_object } from '../Text_class.js';

function init_Text_consumable(texts) {
    //可食用物品的文本
    init_Text_food_CSB(texts);
    //弹药的文本
    init_Text_ammo_CSB(texts);
}
//可食用物品的文本
function init_Text_food_CSB(texts) {
    let id = 'grilled_fish';
    add_text_object(texts, id);
    texts[id].item_name = '烤鱼串';
    texts[id].item_desc = '使用小鱼简单烹饪而成的菜品';
    id = 'big_grilled_fish';
    add_text_object(texts, id);
    texts[id].item_name = '大烤鱼串';
    texts[id].item_desc = '使用大鱼简单烹饪而成的菜品';
    id = 'fish_jerky';
    add_text_object(texts, id);
    texts[id].item_name = '鱼肉干';
    texts[id].item_desc = '使用鱼为原料制成的肉干';
    id = 'fish_meat_floss';
    add_text_object(texts, id);
    texts[id].item_name = '鱼肉松';
    texts[id].item_desc = '使用鱼为原料制成的调味品，可以在其他菜品烹饪时加入';

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
    id = 'animal_jerky';
    add_text_object(texts, id);
    texts[id].item_name = '兽肉干';
    texts[id].item_desc = '使用兽肉为原料制成的肉干';
    id = 'animal_meat_floss';
    add_text_object(texts, id);
    texts[id].item_name = '兽肉松';
    texts[id].item_desc = '使用兽肉为原料制成的调味品，可以在其他菜品烹饪时加入';

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
    id = 'berry_dried_fruit';
    add_text_object(texts, id);
    texts[id].item_name = '浆果果干';
    texts[id].item_desc = '使用浆果为原料制成的果干';
    id = 'berry_jam';
    add_text_object(texts, id);
    texts[id].item_name = '浆果果酱';
    texts[id].item_desc = '使用浆果为原料制成的调味品，可以在其他菜品烹饪时加入';

    id = 'termite_mushroom_soup';
    add_text_object(texts, id);
    texts[id].item_name = '鸡枞汤';
    texts[id].item_desc = '一碗清澈的金黄色汤羹，汤底如晨光般透亮，菌肉脆嫩似嫩笋，咀嚼时能渗出微甜的汁液';
}
//弹药的文本
function init_Text_ammo_CSB(texts) {
    let id = 'wood_arrow';
    add_text_object(texts, id);
    texts[id].item_name = '木制箭矢';
    texts[id].item_desc = '使用木头制作的箭矢，没有尾羽，没有箭头，只是一根细木棍而已';
}

export { init_Text_consumable };
