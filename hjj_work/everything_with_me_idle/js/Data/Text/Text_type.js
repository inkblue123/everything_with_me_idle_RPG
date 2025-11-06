import { add_text_object } from './Text_class.js';

//武器装备类型描述
function Equipment_type(texts) {
    let id;
    id = 'emptyhanded';
    add_text_object(texts, id);
    texts[id].type_name = '空手';
    texts[id].type_desc = '手上没有装备';
    //近战武器类型，锋利
    id = 'dagger';
    add_text_object(texts, id);
    texts[id].type_name = '匕首';
    texts[id].type_desc = '最短的近距离近战武器，可以对敌人造成锋利伤害';
    id = 'sword';
    add_text_object(texts, id);
    texts[id].type_name = '剑';
    texts[id].type_desc = '近距离近战武器，可以对敌人造成锋利伤害';
    id = 'battle_axe';
    add_text_object(texts, id);
    texts[id].type_name = '战斧';
    texts[id].type_desc = '笨重的近距离近战武器，可以对敌人造成锋利伤害';
    id = 'long_handled';
    add_text_object(texts, id);
    texts[id].type_name = '长柄武器';
    texts[id].type_desc = '最长的近距离近战武器，可以对多个敌人造成锋利伤害';
    //近战武器，打击
    id = 'gloves';
    add_text_object(texts, id);
    texts[id].type_name = '拳套';
    texts[id].type_desc = '最短的近距离近战武器，可以对敌人造成打击伤害';
    id = 'sticks';
    add_text_object(texts, id);
    texts[id].type_name = '棍棒';
    texts[id].type_desc = '近距离近战武器，可以对敌人造成打击伤害';
    id = 'hammers';
    add_text_object(texts, id);
    texts[id].type_name = '大锤';
    texts[id].type_desc = '笨重的近距离近战武器，可以对敌人造成打击伤害';
    id = 'whips';
    add_text_object(texts, id);
    texts[id].type_name = '鞭子';
    texts[id].type_desc = '最长的近距离近战武器，可以对多个敌人造成打击伤害';
    //远程武器类型
    id = 'bow';
    add_text_object(texts, id);
    texts[id].type_name = '弓';
    texts[id].type_desc = '中远距离远程武器，进行远程攻击时消耗箭矢';
    id = 'crossbow';
    add_text_object(texts, id);
    texts[id].type_name = '弩炮';
    texts[id].type_desc = '笨重的中远距离远程武器，进行远程攻击时消耗弩箭';
    id = 'hand_gun';
    add_text_object(texts, id);
    texts[id].type_name = '手弩';
    texts[id].type_desc = '轻便的中距离远程武器，进行远程攻击时消耗弩箭';
    id = 'spray_gun';
    add_text_object(texts, id);
    texts[id].type_name = '喷枪';
    texts[id].type_desc = '中近距离远程武器，进行远程攻击时消耗喷枪弹药';
    id = 'boomerang';
    add_text_object(texts, id);
    texts[id].type_name = '回旋武器';
    texts[id].type_desc = '中近距离远程武器，进行远程攻击时不消耗弹药，数量越多攻速越快';
    id = 'throw';
    add_text_object(texts, id);
    texts[id].type_name = '投掷工具';
    texts[id].type_desc = '全距离适用的远程武器，进行远程攻击时消耗可投掷弹药';
    //魔法武器类型
    id = 'putmagic_core';
    add_text_object(texts, id);
    texts[id].type_name = '施法核心';
    texts[id].type_desc = '中近距离魔法武器，可以消耗魔力施展法术';
    id = 'zhenfa_core';
    add_text_object(texts, id);
    texts[id].type_name = '阵法核心';
    texts[id].type_desc = '中近距离魔法武器，可以消耗魔力展开阵法，战斗越久属性越强';
    id = 'magic_core';
    add_text_object(texts, id);
    texts[id].type_name = '法术核心';
    texts[id].type_desc = '中近距离魔法武器，可以消耗法术核心弹药进行魔法攻击，不消耗魔力';
    id = 'spread_core';
    add_text_object(texts, id);
    texts[id].type_name = '扩散核心';
    texts[id].type_desc = '近距离魔法武器，可以消耗大量魔力，将单体法术变成群体法术';
    id = 'summon_core';
    add_text_object(texts, id);
    texts[id].type_name = '召唤核心';
    texts[id].type_desc = '中近距离魔法武器，可以消耗少量魔力，操控召唤物进行攻击';
    //防具类型
    id = 'helmet';
    add_text_object(texts, id);
    texts[id].type_name = '头盔';
    texts[id].type_desc = '头部防护装备';
    id = 'chest_armor';
    add_text_object(texts, id);
    texts[id].type_name = '胸甲';
    texts[id].type_desc = '胸部防护装备';
    id = 'leg_armor';
    add_text_object(texts, id);
    texts[id].type_name = '腿甲';
    texts[id].type_desc = '腿部防护装备';
    id = 'shoes';
    add_text_object(texts, id);
    texts[id].type_name = '鞋子';
    texts[id].type_desc = '脚部防护装备';
    //副手
    id = 'shield';
    add_text_object(texts, id);
    texts[id].type_name = '盾牌';
    texts[id].type_desc = '副手使用的防御敌人攻击的装备';
    //饰品
    id = 'ornament';
    add_text_object(texts, id);
    texts[id].type_name = '饰品';
    texts[id].type_desc = '只能放在饰品槽的装备';
    //工具
    id = 'logging_tool';
    add_text_object(texts, id);
    texts[id].type_name = '伐木工具';
    texts[id].help_skill = '伐木';
    texts[id].type_desc = '帮助伐木的装备';
    id = 'fishing_tool';
    add_text_object(texts, id);
    texts[id].type_name = '钓鱼工具';
    texts[id].help_skill = '钓鱼';
    texts[id].type_desc = '帮助钓鱼的装备';
    id = 'mining_tool';
    add_text_object(texts, id);
    texts[id].type_name = '挖矿工具';
    texts[id].help_skill = '挖矿';
    texts[id].type_desc = '帮助挖矿的装备';
    id = 'foraging_tool';
    add_text_object(texts, id);
    texts[id].type_name = '采集工具';
    texts[id].help_skill = '采集';
    texts[id].type_desc = '帮助采集的装备';
    id = 'diving_tool';
    add_text_object(texts, id);
    texts[id].type_name = '潜水工具';
    texts[id].help_skill = '潜水';
    texts[id].type_desc = '帮助潜水的装备';
    id = 'archaeology_tool';
    add_text_object(texts, id);
    texts[id].type_name = '考古工具';
    texts[id].help_skill = '考古';
    texts[id].type_desc = '帮助考古的装备';
    id = 'exploration_tool';
    add_text_object(texts, id);
    texts[id].type_name = '探索工具';
    texts[id].help_skill = '探索';
    texts[id].type_desc = '帮助探索的装备';
}
//武器装备稀有度描述
function Equipment_rarity(texts) {
    add_text_object(texts, 'damaged');
    texts['damaged'].rarity_name = '破损';
    texts['damaged'].type_desc = '完全不可使用的破损装备，也许有高人能回收利用，不然就只能卖掉了';
    add_text_object(texts, 'ordinary');
    texts['ordinary'].rarity_name = '普通';
    add_text_object(texts, 'excellent');
    texts['excellent'].rarity_name = '优良';
    add_text_object(texts, 'rare');
    texts['rare'].rarity_name = '稀有';
    add_text_object(texts, 'epic');
    texts['epic'].rarity_name = '史诗';
    add_text_object(texts, 'legendary');
    texts['legendary'].rarity_name = '传说';
}
//武器装备的可装备位置描述
function Equipment_wearing_position(texts) {
    add_text_object(texts, 'main_hand');
    texts['main_hand'].wearing_name = '主手';
    texts['main_hand'].wearing_desc = '这件装备只可放在主手位置';
    add_text_object(texts, 'main_hand_two');
    texts['main_hand_two'].wearing_name = '双手';
    texts['main_hand_two'].wearing_desc = '这件装备需要双手共持';
    add_text_object(texts, 'head');
    texts['head'].wearing_name = '头部';
    texts['head'].wearing_desc = '这件装备可以穿戴在头部';
    add_text_object(texts, 'chest');
    texts['chest'].wearing_name = '胸部';
    texts['chest'].wearing_desc = '这件装备可以穿戴在胸部';
    add_text_object(texts, 'legs');
    texts['legs'].wearing_name = '腿部';
    texts['legs'].wearing_desc = '这件装备可以穿戴在腿部';
    add_text_object(texts, 'feet');
    texts['feet'].wearing_name = '脚部';
    texts['feet'].wearing_desc = '这件装备可以穿戴在脚部';
    // add_text_object(texts, 'ornament');//重名，不需要重复new
    texts['ornament'].wearing_name = '饰品';
    texts['ornament'].wearing_desc = '这件装备可以放在饰品位置';
    add_text_object(texts, 'deputy');
    texts['deputy'].wearing_name = '副手';
    texts['deputy'].wearing_desc = '这件装备可以放在副手';
}

//消耗品大类中的小类型名称
function consumable_type(texts) {
    let id;

    id = 'ingredient';
    add_text_object(texts, id);
    texts[id].type_name = '食材';
    id = 'food';
    add_text_object(texts, id);
    texts[id].type_name = '食品';
    id = 'dry_product';
    add_text_object(texts, id);
    texts[id].type_name = '干制品';
    id = 'crude_drug';
    add_text_object(texts, id);
    texts[id].type_name = '药材';
    id = 'potion';
    add_text_object(texts, id);
    texts[id].type_name = '药水';
    id = 'elixir';
    add_text_object(texts, id);
    texts[id].type_name = '丹药';
    id = 'arrow';
    add_text_object(texts, id);
    texts[id].type_name = '箭矢';
    id = 'bolt';
    add_text_object(texts, id);
    texts[id].type_name = '弩箭';
    id = 'spray_gun_bullet';
    add_text_object(texts, id);
    texts[id].type_name = '喷枪弹药';
    id = 'throwable';
    add_text_object(texts, id);
    texts[id].type_name = '可投掷弹药';
    id = 'magic_core_bullet';
    add_text_object(texts, id);
    texts[id].type_name = '法术核心弹药';
    id = 'bait';
    add_text_object(texts, id);
    texts[id].type_name = '鱼饵';
    id = 'treasure_chest';
    add_text_object(texts, id);
    texts[id].type_name = '宝箱';
    id = 'ordinary_coin';
    add_text_object(texts, id);
    texts[id].type_name = '钱币';
}
//材料的类型名称
function material_type(texts) {
    let id;

    id = 'ordinary_wood';
    add_text_object(texts, id);
    texts[id].type_name = '凡木';
    id = 'spirit_wood';
    add_text_object(texts, id);
    texts[id].type_name = '灵木';
    id = 'spirit_grass';
    add_text_object(texts, id);
    texts[id].type_name = '灵草';
    id = 'ordinary_mushroom';
    add_text_object(texts, id);
    texts[id].type_name = '普通蘑菇';
    id = 'rare_mushroom';
    add_text_object(texts, id);
    texts[id].type_name = '稀有蘑菇';
    id = 'aquatic';
    add_text_object(texts, id);
    texts[id].type_name = '水产';
    id = 'fur';
    add_text_object(texts, id);
    texts[id].type_name = '毛皮';
    id = 'leather';
    add_text_object(texts, id);
    texts[id].type_name = '皮革';
    id = 'bone';
    add_text_object(texts, id);
    texts[id].type_name = '骨头';
    id = 'raw_meat';
    add_text_object(texts, id);
    texts[id].type_name = '生肉';
    id = 'rock';
    add_text_object(texts, id);
    texts[id].type_name = '岩石';
    id = 'wood_parts';
    add_text_object(texts, id);
    texts[id].type_name = '木制零件';
    id = 'iron_parts';
    add_text_object(texts, id);
    texts[id].type_name = '铁质零件';
    id = 'refined_seasoning';
    add_text_object(texts, id);
    texts[id].type_name = '精制调味料';
    id = 'elixir_essence';
    add_text_object(texts, id);
    texts[id].type_name = '丹药精华';

    //一些小类的集合的名称
    id = 'all_wood';
    add_text_object(texts, id);
    texts[id].type_name = '任意木头';
    id = 'all_grass';
    add_text_object(texts, id);
    texts[id].type_name = '任意草';
    id = 'all_mushroom';
    add_text_object(texts, id);
    texts[id].type_name = '任意蘑菇';
}
//主动技能类型
function active_type(texts) {
    add_text_object(texts, 'attack');
    texts['attack'].active_type_name = '攻击型';
    add_text_object(texts, 'defense');
    texts['defense'].active_type_name = '防御型';
    add_text_object(texts, 'recovery');
    texts['recovery'].active_type_name = '恢复型';
    add_text_object(texts, 'auxiliary');
    texts['auxiliary'].active_type_name = '辅助型';
}
//被动技能类型
function passive_switch_type(texts) {
    // 根基技能 basic
    let id = 'basic_passive';
    add_text_object(texts, id);
    texts[id].passive_type_name = '根基技能';
    //战斗技能 combat
    id = 'combat_passive';
    add_text_object(texts, id);
    texts[id].passive_type_name = '战斗技能';
    id = 'weapon_mastery';
    add_text_object(texts, id);
    texts[id].passive_type_name = '武器精通';
    id = 'environment_adaptation';
    add_text_object(texts, id);
    texts[id].passive_type_name = '环境适应';
    id = 'enemy_mastery';
    add_text_object(texts, id);
    texts[id].passive_type_name = '对敌精通';

    //生活技能 life
    id = 'life_passive';
    add_text_object(texts, id);
    texts[id].passive_type_name = '生活技能';
    id = 'material_acquisition';
    add_text_object(texts, id);
    texts[id].passive_type_name = '原料获取';
    id = 'material_processing';
    add_text_object(texts, id);
    texts[id].passive_type_name = '原料加工';
    id = 'product_usage';
    add_text_object(texts, id);
    texts[id].passive_type_name = '成品使用';
    id = 'recycling';
    add_text_object(texts, id);
    texts[id].passive_type_name = '回收利用';
    //特殊功法 super
    id = 'super_passive';
    add_text_object(texts, id);
    texts[id].passive_type_name = '特殊功法';
}
//钓鱼技能内的状态名称
function fish_status(texts) {
    let id;

    //钓鱼状态的具体值是从1开始的枚举
    //数字枚举已经统一定义过，不再重复定义
    id = 1;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '无';
    id = 2;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '等鱼上钩';
    id = 3;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '遛鱼';
    id = 4;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '钓鱼完成';
    id = 5;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '鱼跑了';
    id = 6;
    // add_text_object(texts, id);
    texts[id].fish_status_name = '原地休息';
}
//商人使用的货币名称
function store_use_money_type(texts) {
    let id;

    // 根基技能 basic
    id = 'ordinary_coin';
    // add_text_object(texts, id);//在其他地方定义过
    texts[id].money_type_name = '钱币';
}

//初始化文本数据库中与类型相关的文本
function init_Text_type(texts) {
    //武器装备类型描述
    Equipment_type(texts);
    //武器装备稀有度描述
    Equipment_rarity(texts);
    //武器装备的可装备位置描述
    Equipment_wearing_position(texts);
    //消耗品大类中的小类描述
    consumable_type(texts);
    //材料类型描述
    material_type(texts);
    //主动技能类型描述
    active_type(texts);
    //被动技能过滤类型描述
    passive_switch_type(texts);
    //钓鱼技能内的状态名称
    fish_status(texts);
    //商人使用的货币名称
    store_use_money_type(texts);
}
export { init_Text_type };
