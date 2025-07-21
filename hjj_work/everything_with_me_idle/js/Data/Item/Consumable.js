import { texts } from '../Text/Text.js';
import { add_Item_object } from './Item_class.js';
//物品的大类别枚举
const Item_type = Object.freeze({
    //武器装备 equipment
    Weapon: 'weapon', //武器
    Armor: 'armor', //防具
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
    //可使用物品 consumable
    Food: 'food_CSB', //食品
    Ammo: 'ammo_CSB', //弹药
    Life: 'life_CSB', //生活消耗品
    //材料 material
    Raw: 'raw_MTR', //自然材料
    Process: 'process_MTR', //人工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
});

//消耗品的具体类别
const consumable_type = Object.freeze({
    // 可食用物品 food_CSB
    // 食材，烹饪技能专属材料类型，因为可以吃所以归到消耗品
    // 食品，主要从烹饪技能中获取
    // 药材，炼丹技能专属材料类型，因为可以吃所以归到消耗品
    // 丹药，主要从炼丹中获取
    //弹药 ammo_CSB
    Arrow: 'arrow', //箭矢
    Bolt: 'bolt', //弩箭
    Spray_gun_bullet: 'spray_gun_bullet', //喷枪弹药
    Throwable: 'throwable', //可投掷弹药
    Magic_core_bullet: 'magic_core_bullet', //法术核心弹药
    //生活消耗品,主要是玩家主动使用的一次性物品
    Box: 'box', //宝箱
    // 技能书
    // 梦境
});

//初始化物品数据库中与消耗品相关的文本
function init_Item_Consumable(items) {
    //可食用物品
    init_Item_food_CSB(items);
    //弹药
    init_Item_ammo_CSB(items);
}
//可食用物品
function init_Item_food_CSB(items) {
    let id = 'grilled_fish'; //烤鱼串
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'big_grilled_fish'; //大烤鱼串
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'fish_jerky'; //鱼肉干
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'fish_meat_floss'; //鱼肉松
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类

    id = 'roasted_crab'; //烤螃蟹
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'cooked_mussel'; //熟蚌肉
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类

    id = 'cooked_animal_meat'; //熟兽肉
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'animal_jerky'; //兽肉干
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'animal_meat_floss'; //兽肉松
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类

    id = 'red_berry'; //红浆果
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'yellow_berry'; //黄浆果
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'black_berry'; //黑浆果
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'berry_dried_fruit'; //浆果果干
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
    id = 'berry_jam'; //浆果果酱
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类

    id = 'termite_mushroom_soup'; //鸡枞汤
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(20, ['food_CSB']); //堆叠数量，物品大分类
}
//弹药
function init_Item_ammo_CSB(items) {
    let id = 'wood_arrow'; //木制箭矢
    add_Item_object(items, id, 'consumable');
    items[id].init_Item_other(100, ['ammo_CSB']); //堆叠数量，物品大分类
    // items[id].init_Consumable('arrow'); //物品小分类，是否特制
    // items[id].init_Item_price('coin', 3); //物品价值
}
export { init_Item_Consumable };
