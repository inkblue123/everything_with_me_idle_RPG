import { add_Equipment_object } from './Item_class.js';

//初始化装备数据库
function init_Item_Equipment(items) {
    //近战武器
    init_dagger(items); //匕首
    init_sword(items); //剑
    init_battle_axe(items); //战斧
    init_long_handled(items); //长柄武器

    init_gloves(items); //拳套
    init_sticks(items); //棍棒
    init_hammers(items); //大锤
    init_whips(items); //鞭子

    //远程武器
    init_bow(items); //弓
    init_crossbow(items); //弩炮
    init_hand_gun(items); //手弩
    init_spray_gun(items); //喷枪
    init_boomerang(items); //回旋武器
    init_throw(items); //投掷工具

    //魔法武器
    init_putmagic_core(items); //施法核心
    init_zhenfa_core(items); //阵法核心
    init_magic_core(items); //法术核心
    init_spread_core(items); //扩散核心
    init_summon_core(items); //召唤核心

    //防具
    init_helmet(items); //头盔
    init_chest_armor(items); //胸甲
    init_leg_armor(items); //腿甲
    init_shoes(items); //鞋子

    //副手
    init_shield(items); //盾牌

    //饰品

    //工具
    init_logging_tool(items); //伐木工具
    init_fishing_tool(items); //钓鱼工具
    init_mining_tool(items); //挖矿工具
    init_foraging_tool(items); //采集工具
    init_diving_tool(items); //潜水工具
    init_archaeology_tool(items); //考古工具
    init_exploration_tool(items); //探索工具
}
//匕首
function init_dagger(items) {
    let id;
    let secon_type = 'dagger';
    let attack_interval = -1; //匕首的攻击间隔为-1
}
//剑
function init_sword(items) {
    let id;
    let secon_type = 'sword';
    let attack_interval = 2; //剑的攻击间隔为+2

    id = 'wood_sword'; //木剑
    add_Equipment_object(items, id); //id，物品主要分类
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 20); //物品价值
    //攻击，精准，暴击率，暴击伤害，攻击速度
    // items[id].init_Equipment_attack_attr('ordinary',5, 5, 5, 20, 2);//手动设置攻击属性

    id = 'test_sword'; //测试剑
    add_Equipment_object(items, id); //id，物品主要分类
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // items[id].init_Item_price('ordinary_coin', 60); //物品价值
    //攻击，精准，暴击率，暴击伤害，攻击速度
    items[id].init_Equipment_attack_attr('ordinary', 100, 5, 5, 20, -2); //手动设置攻击属性
}
//战斧
function init_battle_axe(items) {
    let id;
    let secon_type = 'battle_axe';
    let attack_interval = 4; //战斧的攻击间隔为+4

    id = 'wood_battle_axe'; //木制战斧
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 25); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',10, 5, 0, 0, 3);
}
//长柄武器
function init_long_handled(items) {
    let id;
    let secon_type = 'long_handled';
    let attack_interval = 3; //长柄武器的攻击间隔为+3
}
//拳套
function init_gloves(items) {
    let id;
    let secon_type = 'gloves';
    let attack_interval = -1; //拳套的攻击间隔为-1
}
//棍棒
function init_sticks(items) {
    let id;
    let secon_type = 'sticks';
    let attack_interval = 2; //棍棒的攻击间隔为+2

    id = 'wood_sticks'; //木制棍棒
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 20); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',5, 5, 5, 20, 2);
}
//大锤
function init_hammers(items) {
    let id;
    let secon_type = 'hammers';
    let attack_interval = 4; //大锤的攻击间隔为+4

    id = 'wood_hammers'; //木制大锤
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 34); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',10, 5, 0, 0, 3);
}
//鞭子
function init_whips(items) {
    let id;
    let secon_type = 'whips';
    let attack_interval = 3; //鞭子的攻击间隔为+3
}
//弓
function init_bow(items) {
    let id;
    let secon_type = 'bow';
    let attack_interval = 1; //弓的攻击间隔为+1

    id = 'wood_bow'; //木弓
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 80); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',8, 5, 5, 20, 1);
}
//弩炮
function init_crossbow(items) {
    let id;
    let secon_type = 'crossbow';
    let attack_interval = 5; //弩炮的攻击间隔为+5
}
//手弩
function init_hand_gun(items) {
    let id;
    let secon_type = 'hand_gun';
    let attack_interval = 3; //手弩的攻击间隔为+3

    id = 'test_hand_gun'; //测试手弩
    add_Equipment_object(items, id);
    items[id].name = '测试用手弩';
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 60); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',3, 5, 10, 50, 2);
}
//喷枪
function init_spray_gun(items) {
    let id;
    let secon_type = 'spray_gun';
    let attack_interval = -1; //喷枪的攻击间隔为-1
}
//回旋武器
function init_boomerang(items) {
    let id;
    let secon_type = 'boomerang';
    let attack_interval = 5; //回旋武器的攻击间隔为+5

    id = 'test_boomerang'; //测试回旋武器
    add_Equipment_object(items, id);
    items[id].name = '测试用回旋武器';
    items[id].init_Equipment(secon_type, 5, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'attack', secon_type); //调用L1级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 100); //物品价值
    // items[id].init_Equipment_attack_attr('ordinary',8, 5, 10, 50, 5);
}
//投掷工具
function init_throw(items) {
    let id;
    let secon_type = 'throw';
    let attack_interval = 1; //投掷工具的攻击间隔为+1
}
//施法核心
function init_putmagic_core(items) {
    let id;
    let secon_type = 'putmagic_core';
}
//阵法核心
function init_zhenfa_core(items) {
    let id;
    let secon_type = 'zhenfa_core';
}
//法术核心
function init_magic_core(items) {
    let id;
    let secon_type = 'magic_core';
}
//扩散核心
function init_spread_core(items) {
    let id;
    let secon_type = 'spread_core';
}
//召唤核心
function init_summon_core(items) {
    let id;
    let secon_type = 'summon_core';
}
//头盔
function init_helmet(items) {
    let id;
    let secon_type = 'helmet';

    id = 'test_helmet';
    add_Equipment_object(items, id);
    items[id].name = '测试头盔';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    // items[id].init_Item_price('ordinary_coin', 80); //物品价值

    id = 'wood_helmet';
    add_Equipment_object(items, id);
    items[id].name = '木制头盔';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 40); //物品价值
}
//胸甲
function init_chest_armor(items) {
    let id;
    let secon_type = 'chest_armor';

    id = 'test_chest_armor';
    add_Equipment_object(items, id);
    items[id].name = '测试胸甲';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // items[id].init_Item_price('ordinary_coin', 100); //物品价值

    id = 'wood_chest_armor';
    add_Equipment_object(items, id);
    items[id].name = '木制胸甲';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 50); //物品价值
}
//腿甲
function init_leg_armor(items) {
    let id;
    let secon_type = 'leg_armor';

    id = 'test_leg_armor';
    add_Equipment_object(items, id);
    items[id].name = '测试腿甲';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // items[id].init_Item_price('ordinary_coin', 90); //物品价值

    id = 'wood_leg_armor';
    add_Equipment_object(items, id);
    items[id].name = '木制腿甲';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 40); //物品价值
}
//鞋子
function init_shoes(items) {
    let id;
    let secon_type = 'shoes';

    id = 'test_shoes';
    add_Equipment_object(items, id);
    items[id].name = '测试鞋子';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // items[id].init_Item_price('ordinary_coin', 60); //物品价值

    id = 'wood_shoes';
    add_Equipment_object(items, id);
    items[id].name = '木制鞋子';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 45); //物品价值
}
//盾牌
function init_shield(items) {
    let id;
    let secon_type = 'shield';

    id = 'test_shield';
    add_Equipment_object(items, id);
    items[id].name = '测试盾牌';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // items[id].init_Item_price('ordinary_coin', 60); //物品价值

    id = 'wood_shield';
    add_Equipment_object(items, id);
    items[id].name = '木制盾牌';
    items[id].init_Equipment(secon_type, 1, false); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].set_attr_level('L1', 'defense', secon_type); //调用L1级的防御属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    items[id].init_Item_price('ordinary_coin', 30); //物品价值
}
//伐木工具
function init_logging_tool(items) {
    let id;
    let secon_type = 'logging_tool';
    let attack_interval = 4; //伐木工具的攻击间隔为+4

    id = 'hatchet'; //柴刀
    add_Equipment_object(items, id);
    items[id].init_Equipment([secon_type, 'foraging_tool'], 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].init_Item_price('ordinary_coin', 50); //物品价值
    items[id].set_attr_level('L0', 'attack', secon_type); //调用L0级的攻击属性预设
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
    // items[id].init_Equipment_attack_attr('ordinary',3, 5, 10, 50, 2);
}
//钓鱼工具
function init_fishing_tool(items) {
    let id;
    let secon_type = 'fishing_tool';
    let attack_interval = 3; //钓鱼工具的攻击间隔为+3

    id = 'Bamboo_fishing_rod'; //竹鱼竿
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].init_Item_price('ordinary_coin', 30); //物品价值
    items[id].set_attr_level('L0', 'attack', secon_type); //调用L0级的攻击属性预设
    items[id].equip_attr['ordinary']['FIS_takebait_attack'] = 5;
    items[id].equip_attr['ordinary']['FIS_walkfish_attack'] = 5;
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
}
//挖矿工具
function init_mining_tool(items) {
    let id;
    let secon_type = 'mining_tool';
    let attack_interval = 4; //挖矿工具的攻击间隔为+4

    // id = 'test_shield';
    // add_Equipment_object(items, id);
    // items[id].name = '测试盾牌';
    // items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // // items[id].init_Item_price('ordinary_coin', 60); //物品价值
}
//采集工具
function init_foraging_tool(items) {
    let id;
    let secon_type = 'foraging_tool';
    let attack_interval = -1; //采集工具的攻击间隔为-1

    id = 'mowing_sickle'; //割草镰刀
    add_Equipment_object(items, id);
    items[id].init_Equipment(secon_type, 1, false, attack_interval); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    items[id].init_Item_price('ordinary_coin', 35); //物品价值
    items[id].set_attr_level('L0', 'attack', secon_type); //调用L0级的攻击属性预设
    items[id].equip_attr['ordinary']['FAG_chance_all_grass'] = 10;
    items[id].auto_set_all_rarity_attr(); //将“普通”稀有度的属性自动填充到其他全部稀有度里
}
//潜水工具
function init_diving_tool(items) {
    let id;
    let secon_type = 'diving_tool';
    let attack_interval = 3; //潜水工具的攻击间隔为+3

    // id = 'test_shield';
    // add_Equipment_object(items, id);
    // items[id].name = '测试盾牌';
    // items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // // items[id].init_Item_price('ordinary_coin', 60); //物品价值
}
//考古工具
function init_archaeology_tool(items) {
    let id;
    let secon_type = 'archaeology_tool';
    let attack_interval = -1; //考古工具的攻击间隔为-1

    // id = 'test_shield';
    // add_Equipment_object(items, id);
    // items[id].name = '测试盾牌';
    // items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // // items[id].init_Item_price('ordinary_coin', 60); //物品价值
}
//探索工具
function init_exploration_tool(items) {
    let id;
    let secon_type = 'exploration_tool';
    let attack_interval = 2; //探索工具的攻击间隔为+2

    // id = 'test_shield';
    // add_Equipment_object(items, id);
    // items[id].name = '测试盾牌';
    // items[id].init_Equipment(['shield']); //武器小类，堆叠数量，是否属于特制装备，攻击间隔
    // // items[id].init_Item_price('ordinary_coin', 60); //物品价值
}
export { init_Item_Equipment };
