class Text {
    constructor(id) {
        this.id = id; //唯一id
        //设置多种类型的文本是为了预防同id的情况
        this.item_name; //物品名称
        this.item_desc; //物品描述

        this.type_name; //类型名称
        this.type_desc; //类型描述
    }
}

//初始化文本数据库中与类型相关的文本
function init_Text_type(texts) {
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

export { init_Text_type };
