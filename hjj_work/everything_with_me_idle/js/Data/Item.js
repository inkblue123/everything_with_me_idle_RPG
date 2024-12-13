var items = new Object();
//物品的类别枚举
const Item_type = Object.freeze({
    //武器装备 equipment
    Weapon: 'weapon', //武器
    Armor: 'armor', //防具
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
    //消耗品 consumable
    Restore: 'Restore_CSB', //恢复消耗品
    Buff: 'buff_CSB', //buff消耗品
    Combat: 'combat_CSB', //战斗消耗品
    Life: 'life_CSB', //生活消耗品
    //材料 material
    Raw: 'raw_MTR', //原材料
    Process: 'process_MTR', //加工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
});
//武器装备的具体类别
const Equipment_type = Object.freeze({
    Empty_hands: 'empty_hands', //空手
    // 近战武器
    Dagger: 'Dagger', //匕首
    Sword: 'sword', //剑
    Battle_axe: 'battle_axe', //战斧
    Long_handled: 'long_handled', //长柄武器
    Gloves: 'gloves', //拳套
    Sticks: 'sticks', //棍棒
    Hammers: 'hammers', //大锤
    Whips: 'whips', //鞭子
    //远程武器
    Bow: 'bow', //弓
    Crossbow: 'crossbow', //弩
    Hand_gun: 'hand_gun', //手弩
    Spray_gun: 'spray_gun', //喷枪
    Boomerang: 'boomerang', //回旋镖
    Throw: 'throw', //投掷
    //魔法武器
    Putmagic_core: 'putmagic_core', //施法核心
    Zhenfa_core: 'zhenfa_core', //阵法核心
    magic_core: 'magic_core', //法术核心
    Spread_core: 'spread_core', //扩散核心
    Summon_core: 'summon_core', //召唤核心
    //防具
    Helmet: 'helmet', //头盔
    Process: 'process_MTR', //护胸
    Finish: 'finish_MTR', //护腿
    Other: 'other_MTR', //鞋子
    //副手
    Deputy: 'deputy', //副手
    //饰品
    Ornament: 'ornament', //饰品
});

//消耗品的具体类别
const Consumable_type = Object.freeze({
    // 恢复消耗品
    // HP_CSB: 'hp_CSB', //生命恢复物品
    // MP_CSB: 'mp_CSB', //魔力恢复物品
    // ENP_CSB: 'enp_CSB', //精力恢复物品
    //buff消耗品
    // 暂无
    //战斗消耗品
    Arrow: 'arrow', //箭矢
    Bolt: 'bolt', //弩箭
    Spray_gun_bullet: 'spray_gun_bullet', //喷枪弹药
    Throwable: 'throwable', //可投掷弹药
    Magic_core_bullet: 'magic_core_bullet', //法术核心弹药
    //生活消耗品
    Box: 'box', //宝箱
    Key: 'key', //钥匙
    Money: 'money', //货币
});

//物品通用属性
class Item {
    constructor(id, name, maxStack) {
        this.id = id; //唯一id
        this.name = name; // 物品名称
        this.maxStack = maxStack; // 最大堆叠数量

        this.description; // 物品描述
        this.type = new Array(); //类型
    }
}
//武器装备通用属性
class Equipment extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);
        this.type.push('equipment');
        this.equip_min_threshold = new Object(); //装备的最低使用属性
        this.equip_max_threshold = new Object(); //装备的最高使用属性
        this.equip_attr = new Object(); //装备后能提供的属性
        this.equip_effect = new Object(); //装备后能提供的被动
        this.Equipment_type = new Array(); //这件装备的具体类型
    }
}
//消耗品通用属性
class Consumable extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);

        this.type.push('consumable');
        this.Consumable_type = new Array(); //这个消耗品的具体类型
    }
}
//材料通用属性
class Material extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);
        this.type.push('material');
    }
}
//用物品的名称做唯一id，小驼峰命名
// 材料
{
    //原材料
    {
        items['Oak_logs'] = new Material('Oak_logs', '橡树原木', 30);
        items['Oak_logs'].description =
            '一块足够大的橡树原木，可以进行加工，有效率的伐木才能获得更多的原木，而不是木屑';
        items['Oak_logs'].type.push('raw_MTR');
        items['Oak_woodchip'] = new Material('Oak_woodchip', '橡树木屑', 300);
        items['Oak_woodchip'].description = '一堆橡木的碎片，伐木时如果砍的太碎了，那就只能获得木屑了';
        items['Oak_woodchip'].type.push('raw_MTR');

        items['Willow_logs'] = new Material('Willow_logs', '柳树原木', 30);
        items['Willow_logs'].description = '一块足够大的柳树原木';
        items['Willow_logs'].type.push('raw_MTR');
        items['Willow_woodchip'] = new Material('Willow_woodchip', '柳树木屑', 300);
        items['Willow_woodchip'].description = '一堆柳木碎屑，它所在的木头应该遭受了难以想象的折磨，才会变得如此细碎';
        items['Willow_woodchip'].type.push('raw_MTR');
    }
    //加工材料
    {
        items['normal_board'] = new Material('normal_board', '普通木板', 3);
        items['normal_board'].description =
            '去除了原木上的树皮、裂纹之后的完整木板，理论上任何木头都能做成普通木板，感觉伐木技巧好一些甚至能直接从树里砍出木板，加工指南还说要保留原木的纹理，哪有那么麻烦';
        items['normal_board'].type.push('process_MTR');
        items['Oak_board'] = new Material('Oak_board', '橡木板', 3);
        items['Oak_board'].description = '用橡木制成的完整木板，保留了橡木的纹理，用它制作的物品应该更耐用';
        items['Oak_board'].type.push('process_MTR');
        items['Willow_board'] = new Material('Willow_board', '柳木板', 3);
        items['Willow_board'].description =
            '用柳木制成的完整木板，保留了柳木的纹理，要是拿它去做一些形状不合适的物品岂不是浪费了纹路？所以用处比普通木板少';
        items['Willow_board'].type.push('process_MTR');
    }
}
//武器装备
{
    //近战武器
    {
        items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
        items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
        items['wood_sword'].type.push('weapon');
        items['wood_sword'].Equipment_type.push('sword');

        items['wood_battle_axe'] = new Equipment('wood_battle_axe', '木制战斧', 1);
        items['wood_battle_axe'].description =
            '使用木头制作的战斧，削出了一个棱角充当斧刃，看来只能打架，不能用来砍树了';
        items['wood_battle_axe'].type.push('weapon');
        items['wood_battle_axe'].Equipment_type.push('battle_axe');

        items['wood_sticks'] = new Equipment('wood_sticks', '木棒', 1);
        items['wood_sticks'].description =
            '使用木头制作的棍棒，感觉把树木砍伐做出木板再做成树枝的形状并叫做“木棒”的这个过程很蠢，不如直接捡真木棒';
        items['wood_sticks'].type.push('weapon');
        items['wood_sticks'].Equipment_type.push('sticks');

        items['wood_hammers'] = new Equipment('wood_hammers', '巨大木棒', 1);
        items['wood_hammers'].description = '使用木头制作的大锤，使用起来和直接挥舞原木战斗没什么区别';
        items['wood_hammers'].type.push('weapon');
        items['wood_hammers'].Equipment_type.push('hammers');
    }
    //远程武器
    {
        items['wood_bow(n)'] = new Equipment('wood_bow(n)', '木弓（无弦）', 10);
        items['wood_bow(n)'].description = '使用木头制作的弓，还没有上弦，至少足够拿在手里了';
        items['wood_bow(n)'].type.push('weapon', 'process_MTR');
        items['wood_bow(n)'].Equipment_type.push('sticks');

        items['wood_bow'] = new Equipment('wood_bow', '木弓', 1);
        items['wood_bow'].description =
            '使用木头制作的弓，想要正常使用它，需要有弹药，你会在有弹药的情况下正常使用的对吧';
        items['wood_bow'].type.push('weapon');
        items['wood_bow'].Equipment_type.push('bow');
    }
    //魔法武器
    {
    }
    //防具
    {
    }
}

//消耗品
{
    items['wood_arrow'] = new Consumable('wood_arrow', '木制箭矢', 100);
    items['wood_arrow'].description = '使用木头制作的箭矢，没有尾羽，没有箭头，只是一根细木棍而已';
    items['wood_arrow'].type.push('combat_CSB');
    items['wood_arrow'].Consumable_type.push('arrow');
}
export { items };
