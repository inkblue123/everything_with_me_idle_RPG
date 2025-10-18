import { add_text_object } from '../Text_class.js';

//初始化装备数据库
function init_Text_equipment(texts) {
    //近战武器
    init_Text_sword(texts); //剑
    init_Text_battle_axe(texts); //战斧
    init_Text_sticks(texts); //棍棒
    init_Text_hammers(texts); //大锤

    //远程武器
    init_Text_bow(texts); //弓
    init_Text_hand_gun(texts); //手弩
    init_Text_boomerang(texts); //回旋武器

    //魔法武器

    //防具
    init_Text_helmet(texts); //头盔
    init_Text_chest_armor(texts); //胸甲
    init_Text_leg_armor(texts); //腿甲
    init_Text_shoes(texts); //鞋子

    //副手
    init_Text_shield(texts); //盾牌

    //饰品
    //工具
    init_Text_logging_tool(texts); //伐木工具
    init_Text_fishing_tool(texts); //钓鱼工具
    init_Text_mining_tool(texts); //挖矿工具
    init_Text_foraging_tool(texts); //采集工具
    init_Text_diving_tool(texts); //潜水工具
    init_Text_archaeology_tool(texts); //考古工具
    init_Text_exploration_tool(texts); //探索工具
}
//剑
function init_Text_sword(texts) {
    let id;

    id = 'wood_sword';
    add_text_object(texts, id);
    texts[id].item_name = '木剑';
    texts[id].item_desc = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
    id = 'test_sword';
    add_text_object(texts, id);
    texts[id].item_name = '测试武器-剑';
    texts[id].item_desc = '测试用的属性很高的剑';
}
//战斧
function init_Text_battle_axe(texts) {
    let id;

    id = 'wood_battle_axe';
    add_text_object(texts, id);
    texts[id].item_name = '木制战斧';
    texts[id].item_desc = '使用木头制作的战斧，削出了一个很钝的棱角充当斧刃，看来只能打架，不能用来砍树了';
}
//棍棒
function init_Text_sticks(texts) {
    let id;

    id = 'wood_sticks';
    add_text_object(texts, id);
    texts[id].item_name = '木棒';
    texts[id].item_desc = '使用木头制作的棍棒，感觉把树木砍伐做出木板再做成树枝的形状并叫做“木棒”的这个过程很蠢，不如直接捡真木棒';
}
//大锤
function init_Text_hammers(texts) {
    let id;

    id = 'wood_hammers';
    add_text_object(texts, id);
    texts[id].item_name = '巨大木棒';
    texts[id].item_desc = '使用木头制作的大锤，使用起来和直接挥舞原木战斗没什么区别';
}
//弓
function init_Text_bow(texts) {
    let id;

    id = 'wood_bow';
    add_text_object(texts, id);
    texts[id].item_name = '木弓';
    texts[id].item_desc = '使用木头制作的弓，想要正常使用它，需要有弹药，你会在有弹药的情况下正常使用的对吧';
}
//手弩
function init_Text_hand_gun(texts) {
    let id;

    id = 'test_hand_gun';
    add_text_object(texts, id);
    texts[id].item_name = '测试手弩';
    texts[id].item_desc = '测试手弩的描述';
}
//回旋武器
function init_Text_boomerang(texts) {
    let id;

    id = 'test_boomerang';
    add_text_object(texts, id);
    texts[id].item_name = '测试回旋武器';
    texts[id].item_desc = '测试回旋武器的描述';
}
//头盔
function init_Text_helmet(texts) {
    let id;

    id = 'test_helmet';
    add_text_object(texts, id);
    texts[id].item_name = '测试头盔';
    texts[id].item_desc = '测试头盔的描述';

    id = 'wood_helmet';
    add_text_object(texts, id);
    texts[id].item_name = '木制头盔';
    texts[id].item_desc = '木制的简易头盔，可提供少许防御力';
}
//胸甲
function init_Text_chest_armor(texts) {
    let id;

    id = 'test_chest_armor';
    add_text_object(texts, id);
    texts[id].item_name = '测试胸甲';
    texts[id].item_desc = '测试胸甲的描述';

    id = 'wood_chest_armor';
    add_text_object(texts, id);
    texts[id].item_name = '木制胸甲';
    texts[id].item_desc = '木制的简易胸甲，可提供少许防御力';
}
//腿甲
function init_Text_leg_armor(texts) {
    let id;

    id = 'test_leg_armor';
    add_text_object(texts, id);
    texts[id].item_name = '测试腿甲';
    texts[id].item_desc = '测试胸甲的描述';
    id = 'wood_leg_armor';
    add_text_object(texts, id);
    texts[id].item_name = '木制腿甲';
    texts[id].item_desc = '木制的简易腿甲，可提供少许防御力';
}
//鞋子
function init_Text_shoes(texts) {
    let id;

    id = 'test_shoes';
    add_text_object(texts, id);
    texts[id].item_name = '测试鞋子';
    texts[id].item_desc = '测试鞋子的描述';
    id = 'wood_shoes';
    add_text_object(texts, id);
    texts[id].item_name = '木制鞋子';
    texts[id].item_desc = '木制的简易鞋子，可提供少许防御力';
}
//盾牌
function init_Text_shield(texts) {
    let id;

    id = 'test_shield';
    add_text_object(texts, id);
    texts[id].item_name = '测试盾牌';
    texts[id].item_desc = '测试盾牌的描述';
    id = 'wood_shield';
    add_text_object(texts, id);
    texts[id].item_name = '木制盾牌';
    texts[id].item_desc = '木制的简易盾牌，可防御敌人的攻击';
}
//伐木工具
function init_Text_logging_tool(texts) {
    let id;

    id = 'hatchet';
    add_text_object(texts, id);
    texts[id].item_name = '柴刀';
    texts[id].item_desc = '简易的伐木工具，可以有效的完成割草、砍断枝条等任务';
}
//钓鱼工具
function init_Text_fishing_tool(texts) {
    let id;

    id = 'Bamboo_fishing_rod';
    add_text_object(texts, id);
    texts[id].item_name = '竹鱼竿';
    texts[id].item_desc = '使用竹子制作的鱼竿，适合新手钓鱼';
}
//挖矿工具
function init_Text_mining_tool(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//采集工具
function init_Text_foraging_tool(texts) {
    let id;

    id = 'mowing_sickle';
    add_text_object(texts, id);
    texts[id].item_name = '割草镰刀';
    texts[id].item_desc = '简单小巧的采集工具，适合从精确的位置切断草茎而不伤害到草';
}
//潜水工具
function init_Text_diving_tool(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//考古工具
function init_Text_archaeology_tool(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}
//探索工具
function init_Text_exploration_tool(texts) {
    let id;

    // id = 'AAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}

export { init_Text_equipment };
