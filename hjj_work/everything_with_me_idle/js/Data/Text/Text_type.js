import { add_text_object } from './Text_class.js';

//武器装备类型描述
function Equipment_type(texts) {
    //近战武器类型，锋利
    add_text_object(texts, 'dagger');
    texts['dagger'].type_name = '匕首';
    texts['dagger'].type_desc = '最短的近距离近战武器，可以对敌人造成锋利伤害';
    add_text_object(texts, 'sword');
    texts['sword'].type_name = '剑';
    texts['sword'].type_desc = '近距离近战武器，可以对敌人造成锋利伤害';
    add_text_object(texts, 'battle_axe');
    texts['battle_axe'].type_name = '战斧';
    texts['battle_axe'].type_desc = '笨重的近距离近战武器，可以对敌人造成锋利伤害';
    add_text_object(texts, 'long_handled');
    texts['long_handled'].type_name = '长柄武器';
    texts['long_handled'].type_desc = '最长的近距离近战武器，可以对多个敌人造成锋利伤害';
    //近战武器，打击
    add_text_object(texts, 'gloves');
    texts['gloves'].type_name = '拳套';
    texts['gloves'].type_desc = '最短的近距离近战武器，可以对敌人造成打击伤害';
    add_text_object(texts, 'sticks');
    texts['sticks'].type_name = '棍棒';
    texts['sticks'].type_desc = '近距离近战武器，可以对敌人造成打击伤害';
    add_text_object(texts, 'hammers');
    texts['hammers'].type_name = '大锤';
    texts['hammers'].type_desc = '笨重的近距离近战武器，可以对敌人造成打击伤害';
    add_text_object(texts, 'whips');
    texts['whips'].type_name = '鞭子';
    texts['whips'].type_desc = '最长的近距离近战武器，可以对多个敌人造成打击伤害';
    //远程武器类型
    add_text_object(texts, 'bow');
    texts['bow'].type_name = '弓';
    texts['bow'].type_desc = '中远距离远程武器，进行远程攻击时消耗箭矢';
    add_text_object(texts, 'crossbow');
    texts['crossbow'].type_name = '弩';
    texts['crossbow'].type_desc = '笨重的中远距离远程武器，进行远程攻击时消耗弩箭';
    add_text_object(texts, 'hand_gun');
    texts['hand_gun'].type_name = '手弩';
    texts['hand_gun'].type_desc = '轻便的中距离远程武器，进行远程攻击时消耗弩箭';
    add_text_object(texts, 'spray_gun');
    texts['spray_gun'].type_name = '喷枪';
    texts['spray_gun'].type_desc = '中近距离远程武器，进行远程攻击时消耗喷枪弹药';
    add_text_object(texts, 'boomerang');
    texts['boomerang'].type_name = '回旋武器';
    texts['boomerang'].type_desc = '中近距离远程武器，进行远程攻击时不消耗弹药，数量越多攻速越快';
    add_text_object(texts, 'throw');
    texts['throw'].type_name = '投掷工具';
    texts['throw'].type_desc = '全距离适用的远程武器，进行远程攻击时消耗可投掷弹药';
    //魔法武器类型
    add_text_object(texts, 'putmagic_core');
    texts['putmagic_core'].type_name = '施法核心';
    texts['putmagic_core'].type_desc = '中近距离魔法武器，可以消耗魔力施展法术';
    add_text_object(texts, 'zhenfa_core');
    texts['zhenfa_core'].type_name = '阵法核心';
    texts['zhenfa_core'].type_desc = '中近距离魔法武器，可以消耗魔力展开阵法，战斗越久属性越强';
    add_text_object(texts, 'magic_core');
    texts['magic_core'].type_name = '法术核心';
    texts['magic_core'].type_desc = '中近距离魔法武器，可以消耗法术核心弹药进行魔法攻击，不消耗魔力';
    add_text_object(texts, 'spread_core');
    texts['spread_core'].type_name = '扩散核心';
    texts['spread_core'].type_desc = '近距离魔法武器，可以消耗大量魔力，将单体法术变成群体法术';
    add_text_object(texts, 'summon_core');
    texts['summon_core'].type_name = '召唤核心';
    texts['summon_core'].type_desc = '中近距离魔法武器，可以消耗少量魔力，操控召唤物进行攻击';
    //防具类型
    add_text_object(texts, 'helmet');
    texts['helmet'].type_name = '头盔';
    texts['helmet'].type_desc = '头部防护装备';
    add_text_object(texts, 'chest_armor');
    texts['chest_armor'].type_name = '胸甲';
    texts['chest_armor'].type_desc = '胸部防护装备';
    add_text_object(texts, 'leg_armor');
    texts['leg_armor'].type_name = '腿甲';
    texts['leg_armor'].type_desc = '腿部防护装备';
    add_text_object(texts, 'shoes');
    texts['shoes'].type_name = '鞋子';
    texts['shoes'].type_desc = '脚部防护装备';
    //副手
    add_text_object(texts, 'deputy');
    texts['deputy'].type_name = '副手';
    texts['deputy'].type_desc = '辅助战斗的装备';
    //饰品
    add_text_object(texts, 'ornament');
    texts['ornament'].type_name = '饰品';
    texts['ornament'].type_desc = '只能放在饰品槽的装备';
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
    // add_text_object(texts, 'deputy');//重名，不需要重复new
    texts['deputy'].wearing_name = '副手';
    texts['deputy'].wearing_desc = '这件装备可以放在副手';
}
//属性名称描述
function attr_type(texts) {
    add_text_object(texts, 'attack');
    texts['attack'].attr_name = '攻击力';
    add_text_object(texts, 'precision');
    texts['precision'].attr_name = '精准';
    add_text_object(texts, 'critical_chance');
    texts['critical_chance'].attr_name = '暴击率';
    add_text_object(texts, 'critical_damage');
    texts['critical_damage'].attr_name = '暴击伤害';
    texts['critical_damage'].min_attr_name = '暴伤';
    add_text_object(texts, 'attack_speed');
    texts['attack_speed'].attr_name = '攻击速度';
    texts['attack_speed'].min_attr_name = '攻速';
    add_text_object(texts, 'defense');
    texts['defense'].attr_name = '防御';
    add_text_object(texts, 'evade');
    texts['evade'].attr_name = '闪避';
    add_text_object(texts, 'resistance_point');
    texts['resistance_point'].attr_name = '抵抗力';
    add_text_object(texts, 'move_speed');
    texts['move_speed'].attr_name = '移动速度';
    texts['move_speed'].min_attr_name = '移速';

    add_text_object(texts, 'physique');
    texts['physique'].attr_name = '体格';
    add_text_object(texts, 'Meridians');
    texts['Meridians'].attr_name = '经脉';
    add_text_object(texts, 'soul');
    texts['soul'].attr_name = '魂魄';
    add_text_object(texts, 'power');
    texts['power'].attr_name = '力量';
    add_text_object(texts, 'agile');
    texts['agile'].attr_name = '敏捷';
    add_text_object(texts, 'intelligence');
    texts['intelligence'].attr_name = '智力';
    add_text_object(texts, 'technique');
    texts['technique'].attr_name = '技巧';
}
//材料的类型名称
function material_type(texts) {
    add_text_object(texts, 'raw_MTR');
    texts['raw_MTR'].type_name = '自然材料';
    add_text_object(texts, 'process_MTR');
    texts['process_MTR'].type_name = '人工材料';
    add_text_object(texts, 'finish_MTR');
    texts['finish_MTR'].type_name = '成品';
    add_text_object(texts, 'other_MTR');
    texts['other_MTR'].type_name = '其他物品';

    add_text_object(texts, 'for_logging');
    texts['for_logging'].source = '伐木';
    add_text_object(texts, 'for_fishing');
    texts['for_fishing'].source = '钓鱼';
    add_text_object(texts, 'for_mining');
    texts['for_mining'].source = '挖矿';
    add_text_object(texts, 'for_harvest');
    texts['for_harvest'].source = '采集';

    add_text_object(texts, 'for_cooking');
    texts['for_cooking'].source = '烹饪';
    add_text_object(texts, 'for_making');
    texts['for_making'].source = '制造';
    add_text_object(texts, 'for_forging');
    texts['for_forging'].source = '锻造';
    add_text_object(texts, 'for_alchemy');
    texts['for_alchemy'].source = '炼金';
}
//初始化文本数据库中与类型相关的文本
function init_Text_type(texts) {
    //武器装备类型描述
    Equipment_type(texts);
    //武器装备稀有度描述
    Equipment_rarity(texts);
    //武器装备的可装备位置描述
    Equipment_wearing_position(texts);
    //属性名称描述
    attr_type(texts);
    //材料类型描述
    material_type(texts);
}
export { init_Text_type };
