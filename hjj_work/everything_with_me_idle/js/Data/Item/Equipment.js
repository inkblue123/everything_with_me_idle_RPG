import { add_Equipment_object } from './Item_class.js';

//初始化装备数据库
function init_Item_Equipment(items) {
    //近战武器
    init_sword(items); //剑
    init_battle_axe(items); //战斧
    init_sticks(items); //棍棒
    init_hammers(items); //大锤

    //远程武器
    init_bow(items); //弓
    init_hand_gun(items); //手弩
    init_boomerang(items); //回旋武器

    //魔法武器

    //防具
    init_helmet(items); //头盔
    init_chest_armor(items); //胸甲
    init_leg_armor(items); //腿甲
    init_shoes(items); //鞋子

    //副手
    init_shield(items); //盾牌

    //饰品
}
//剑
function init_sword(items) {
    let id;

    id = 'wood_sword'; //木剑
    add_Equipment_object(items, id); //id，物品主要分类
    items[id].init_Equipment(['sword']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 60); //物品价值
    //攻击，精准，暴击率，暴击伤害，攻击速度
    // items[id].init_Equipment_attack_attr(5, 5, 5, 20, 2);//手动设置攻击属性

    id = 'test_sword'; //测试剑
    add_Equipment_object(items, id); //id，物品主要分类
    items[id].init_Equipment(['sword']); //武器小类，堆叠数量，是否属于特制装备
    items[id].init_Item_price('coin', 60); //物品价值
    //攻击，精准，暴击率，暴击伤害，攻击速度
    items[id].init_Equipment_attack_attr(100, 5, 5, 20, -2); //手动设置攻击属性
}
//战斧
function init_battle_axe(items) {
    let id;

    id = 'wood_battle_axe'; //木制战斧
    add_Equipment_object(items, id);
    items[id].init_Equipment(['battle_axe']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 70); //物品价值
    // items[id].init_Equipment_attack_attr(10, 5, 0, 0, 3);
}
//棍棒
function init_sticks(items) {
    let id;

    id = 'wood_sticks'; //木制棍棒
    add_Equipment_object(items, id);
    items[id].init_Equipment(['sticks']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 55); //物品价值
    // items[id].init_Equipment_attack_attr(5, 5, 5, 20, 2);
}
//大锤
function init_hammers(items) {
    let id;

    id = 'wood_hammers'; //木制大锤
    add_Equipment_object(items, id);
    items[id].init_Equipment(['hammers']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 70); //物品价值
    // items[id].init_Equipment_attack_attr(10, 5, 0, 0, 3);
}
//弓
function init_bow(items) {
    let id;

    id = 'wood_bow'; //木弓
    add_Equipment_object(items, id);
    items[id].init_Equipment(['bow']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 80); //物品价值
    // items[id].init_Equipment_attack_attr(8, 5, 5, 20, 1);
}
//手弩
function init_hand_gun(items) {
    let id;

    id = 'test_hand_gun'; //测试手弩
    add_Equipment_object(items, id);
    items[id].name = '测试用手弩';
    items[id].init_Equipment(['hand_gun']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 60); //物品价值
    // items[id].init_Equipment_attack_attr(3, 5, 10, 50, 2);
}
//回旋武器
function init_boomerang(items) {
    let id;

    id = 'test_boomerang'; //测试回旋武器
    add_Equipment_object(items, id);
    items[id].name = '测试用回旋武器';
    items[id].init_Equipment(['boomerang'], 5); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
    items[id].init_Item_price('coin', 100); //物品价值
    // items[id].init_Equipment_attack_attr(8, 5, 10, 50, 5);
}
//头盔
function init_helmet(items) {
    let id;

    id = 'test_helmet';
    add_Equipment_object(items, id);
    items[id].name = '测试头盔';
    items[id].init_Equipment(['helmet']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 80); //物品价值

    id = 'wood_helmet';
    add_Equipment_object(items, id);
    items[id].name = '木制头盔';
    items[id].init_Equipment(['helmet']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 80); //物品价值
}
//胸甲
function init_chest_armor(items) {
    let id;

    id = 'test_chest_armor';
    add_Equipment_object(items, id);
    items[id].name = '测试胸甲';
    items[id].init_Equipment(['chest_armor']); //武器小类，堆叠数量，是否属于特制装备
    items[id].init_Item_price('coin', 100); //物品价值

    id = 'wood_chest_armor';
    add_Equipment_object(items, id);
    items[id].name = '木制胸甲';
    items[id].init_Equipment(['chest_armor']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 100); //物品价值
}
//腿甲
function init_leg_armor(items) {
    let id;

    id = 'test_leg_armor';
    add_Equipment_object(items, id);
    items[id].name = '测试腿甲';
    items[id].init_Equipment(['leg_armor']); //武器小类，堆叠数量，是否属于特制装备
    items[id].init_Item_price('coin', 90); //物品价值

    id = 'wood_leg_armor';
    add_Equipment_object(items, id);
    items[id].name = '木制腿甲';
    items[id].init_Equipment(['leg_armor']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 90); //物品价值
}
//鞋子
function init_shoes(items) {
    let id;

    id = 'test_shoes';
    add_Equipment_object(items, id);
    items[id].name = '测试鞋子';
    items[id].init_Equipment(['shoes']); //武器小类，堆叠数量，是否属于特制装备
    items[id].init_Item_price('coin', 60); //物品价值

    id = 'wood_shoes';
    add_Equipment_object(items, id);
    items[id].name = '木制鞋子';
    items[id].init_Equipment(['shoes']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 60); //物品价值
}
//盾牌
function init_shield(items) {
    let id;

    id = 'test_shield';
    add_Equipment_object(items, id);
    items[id].name = '测试盾牌';
    items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备
    items[id].init_Item_price('coin', 60); //物品价值

    id = 'wood_shield';
    add_Equipment_object(items, id);
    items[id].name = '木制盾牌';
    items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备
    items[id].set_attr_level('L1', 'defense'); //调用L1级的防御属性预设
    items[id].init_Item_price('coin', 60); //物品价值
}
export { init_Item_Equipment };
