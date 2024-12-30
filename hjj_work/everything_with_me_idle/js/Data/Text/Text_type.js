import { Text } from './Text_class.js';

//武器装备类型描述
function Equipment_type(texts) {
    //近战武器类型，锋利
    texts['dagger'] = new Text('dagger');
    texts['dagger'].type_name = '匕首';
    texts['dagger'].type_desc = '最短的近距离武器，可以对敌人造成锋利伤害';
    texts['sword'] = new Text('sword');
    texts['sword'].type_name = '剑';
    texts['sword'].type_desc = '近距离武器，可以对敌人造成锋利伤害';
    texts['battle_axe'] = new Text('battle_axe');
    texts['battle_axe'].type_name = '战斧';
    texts['battle_axe'].type_desc = '笨重的近距离武器，可以对敌人造成锋利伤害';
    texts['long_handled'] = new Text('long_handled');
    texts['long_handled'].type_name = '长柄武器';
    texts['long_handled'].type_desc = '最长的近距离武器，可以对多个敌人造成锋利伤害';
    //近战武器，打击
    texts['gloves'] = new Text('gloves');
    texts['gloves'].type_name = '拳套';
    texts['gloves'].type_desc = '最短的近距离武器，可以对敌人造成打击伤害';
    texts['sticks'] = new Text('sticks');
    texts['sticks'].type_name = '棍棒';
    texts['sticks'].type_desc = '近距离武器，可以对敌人造成打击伤害';
    texts['hammers'] = new Text('hammers');
    texts['hammers'].type_name = '大锤';
    texts['hammers'].type_desc = '笨重的近距离武器，可以对敌人造成打击伤害';
    texts['whips'] = new Text('whips');
    texts['whips'].type_name = '鞭子';
    texts['whips'].type_desc = '最长的近距离武器，可以对多个敌人造成打击伤害';
    //远程武器类型
    texts['bow'] = new Text('bow');
    texts['bow'].type_name = '弓';
    texts['bow'].type_desc = '中远距离武器，进行远程攻击时消耗箭矢';
    texts['crossbow'] = new Text('crossbow');
    texts['crossbow'].type_name = '弩';
    texts['crossbow'].type_desc = '笨重的中远距离武器，进行远程攻击时消耗弩箭';
    texts['hand_gun'] = new Text('hand_gun');
    texts['hand_gun'].type_name = '手弩';
    texts['hand_gun'].type_desc = '轻便的中距离武器，进行远程攻击时消耗弩箭';
    texts['spray_gun'] = new Text('spray_gun');
    texts['spray_gun'].type_name = '喷枪';
    texts['spray_gun'].type_desc = '中近距离武器，进行远程攻击时消耗喷枪弹药';
    texts['boomerang'] = new Text('boomerang');
    texts['boomerang'].type_name = '回旋武器';
    texts['boomerang'].type_desc = '中近距离武器，进行远程攻击后武器会飞回来，不消耗弹药';
    texts['throw'] = new Text('throw');
    texts['throw'].type_name = '投掷工具';
    texts['throw'].type_desc = '力大砖飞的武器，进行远程攻击时消耗可投掷弹药';
    //魔法武器类型
    texts['putmagic_core'] = new Text('putmagic_core');
    texts['putmagic_core'].type_name = '施法核心';
    texts['putmagic_core'].type_desc = '中近距离武器，可以消耗魔力施展法术';
    texts['zhenfa_core'] = new Text('zhenfa_core');
    texts['zhenfa_core'].type_name = '阵法核心';
    texts['zhenfa_core'].type_desc = '中近距离武器，可以消耗魔力展开阵法，战斗越久属性越强';
    texts['magic_core'] = new Text('magic_core');
    texts['magic_core'].type_name = '法术核心';
    texts['magic_core'].type_desc = '中近距离武器，可以消耗法术核心弹药进行魔法攻击，不消耗魔力';
    texts['spread_core'] = new Text('spread_core');
    texts['spread_core'].type_name = '扩散核心';
    texts['spread_core'].type_desc = '近距离武器，可以消耗大量魔力，将单体法术变成群体法术';
    texts['summon_core'] = new Text('summon_core');
    texts['summon_core'].type_name = '召唤核心';
    texts['summon_core'].type_desc = '中近距离武器，可以消耗少量魔力，操控召唤物进行攻击';
    //防具类型
    texts['helmet'] = new Text('helmet');
    texts['helmet'].type_name = '头盔';
    texts['helmet'].type_desc = '头部防护装备';
    texts['chest_armor'] = new Text('chest_armor');
    texts['chest_armor'].type_name = '胸甲';
    texts['chest_armor'].type_desc = '胸部防护装备';
    texts['leg_armor'] = new Text('leg_armor');
    texts['leg_armor'].type_name = '腿甲';
    texts['leg_armor'].type_desc = '腿部防护装备';
    texts['shoes'] = new Text('shoes');
    texts['shoes'].type_name = '鞋子';
    texts['shoes'].type_desc = '脚部防护装备';
    //副手
    texts['deputy'] = new Text('deputy');
    texts['deputy'].type_name = '副手';
    texts['deputy'].type_desc = '辅助战斗的装备';
    //饰品
    texts['ornament'] = new Text('ornament');
    texts['ornament'].type_name = '饰品';
    texts['ornament'].type_desc = '只能放在饰品槽的装备';
}
//武器装备稀有度描述
function Equipment_rarity(texts) {
    texts['damaged'] = new Text('damaged');
    texts['damaged'].rarity_name = '破损';
    texts['damaged'].type_desc = '完全不可使用的破损装备，也许有高人能回收利用，不然就只能卖掉了';
    texts['damaged'].rarity_color = '#838383';
    texts['damaged'].rarity_rgb_color = 'rgba(131,131,131)';
    texts['ordinary'] = new Text('ordinary');
    texts['ordinary'].rarity_name = '普通';
    texts['ordinary'].rarity_color = '#000000';
    texts['excellent'] = new Text('excellent');
    texts['excellent'].rarity_name = '优良';
    texts['excellent'].rarity_color = '#00c400';
    texts['rare'] = new Text('rare');
    texts['rare'].rarity_name = '稀有';
    texts['rare'].rarity_color = '#1100ff';
    texts['epic'] = new Text('epic');
    texts['epic'].rarity_name = '史诗';
    texts['epic'].rarity_color = '#7c00ff';
    texts['legendary'] = new Text('legendary');
    texts['legendary'].rarity_name = '传说';
    texts['legendary'].rarity_color = '#ff0000';
}
//武器装备的可装备位置描述
function Equipment_wearing_position(texts) {
    texts['main_hand'] = new Text('main_hand');
    texts['main_hand'].wearing_name = '主手';
    texts['main_hand'].wearing_desc = '这件装备只可放在主手位置';
    texts['main_hand_two'] = new Text('main_hand_two');
    texts['main_hand_two'].wearing_name = '双手';
    texts['main_hand_two'].wearing_desc = '这件装备需要双手共持';
    texts['head'] = new Text('head');
    texts['head'].wearing_name = '头部';
    texts['head'].wearing_desc = '这件装备可以穿戴在头部';
    texts['chest'] = new Text('chest');
    texts['chest'].wearing_name = '胸部';
    texts['chest'].wearing_desc = '这件装备可以穿戴在胸部';
    texts['legs'] = new Text('legs');
    texts['legs'].wearing_name = '腿部';
    texts['legs'].wearing_desc = '这件装备可以穿戴在腿部';
    texts['feet'] = new Text('feet');
    texts['feet'].wearing_name = '脚部';
    texts['feet'].wearing_desc = '这件装备可以穿戴在脚部';
    texts['ornament'] = new Text('ornament');
    texts['ornament'].wearing_name = '饰品';
    texts['ornament'].wearing_desc = '这件装备可以放在饰品位置';
    // texts['deputy'] = new Text('deputy');//重名
    texts['deputy'].wearing_name = '副手';
    texts['deputy'].wearing_desc = '这件装备可以放在副手';
}
//属性名称描述
function attr_type(texts) {
    texts['attack'] = new Text('attack');
    texts['attack'].attr_name = '攻击力';
    texts['precision'] = new Text('precision');
    texts['precision'].attr_name = '精准';
    texts['critical_chance'] = new Text('critical_chance');
    texts['critical_chance'].attr_name = '暴击率';
    texts['critical_damage'] = new Text('critical_damage');
    texts['critical_damage'].attr_name = '暴击伤害';
    texts['attack_speed'] = new Text('attack_speed');
    texts['attack_speed'].attr_name = '攻击速度';
    texts['defense'] = new Text('defense');
    texts['defense'].attr_name = '防御';
    texts['evade'] = new Text('evade');
    texts['evade'].attr_name = '闪避';
    texts['resistance_point'] = new Text('resistance_point');
    texts['resistance_point'].attr_name = '抵抗力';
    texts['move_speed'] = new Text('move_speed');
    texts['move_speed'].attr_name = '移动速度';

    texts['physique'] = new Text('physique');
    texts['physique'].attr_name = '体格';
    texts['Meridians'] = new Text('Meridians');
    texts['Meridians'].attr_name = '经脉';
    texts['soul'] = new Text('soul');
    texts['soul'].attr_name = '魂魄';
    texts['power'] = new Text('power');
    texts['power'].attr_name = '力量';
    texts['agile'] = new Text('agile');
    texts['agile'].attr_name = '敏捷';
    texts['intelligence'] = new Text('intelligence');
    texts['intelligence'].attr_name = '智力';
    texts['technique'] = new Text('technique');
    texts['technique'].attr_name = '技巧';
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
}
export { init_Text_type };
