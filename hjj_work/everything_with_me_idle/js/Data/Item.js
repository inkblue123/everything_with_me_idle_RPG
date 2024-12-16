import { texts } from './Text.js';
var items = new Object();

//物品的类别枚举
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
//武器装备的具体类别
const equipment_type = Object.freeze({
    Empty_hands: 'empty_hands', //空手
    // 近战武器
    Dagger: 'dagger', //匕首
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
    Boomerang: 'boomerang', //回旋武器
    Throw: 'throw', //投掷工具
    //魔法武器
    Putmagic_core: 'putmagic_core', //施法核心
    Zhenfa_core: 'zhenfa_core', //阵法核心
    magic_core: 'magic_core', //法术核心
    Spread_core: 'spread_core', //扩散核心
    Summon_core: 'summon_core', //召唤核心
    //防具
    Helmet: 'helmet', //头盔
    Chest_armor: 'chest_armor', //胸甲
    Leg_armor: 'leg_armor', //腿甲
    Shoes: 'shoes', //鞋子
    //副手
    Deputy: 'deputy', //副手装备
    //饰品
    Ornament: 'ornament', //饰品
});

//消耗品的具体类别
const Consumable_type = Object.freeze({
    // 可食用物品 food_CSB
    // 食材，烹饪技能专属材料类型，因为可以吃所以归到消耗品
    // 食品，主要从烹饪技能中获取
    // 药材，炼丹技能专属材料类型，因为可以吃所以归到消耗品
    // 丹药，主要从炼丹中获取
    // 药水，主要从制药中获取
    //弹药
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
        this.equipment_type = new Array(); //这件装备的具体类型
        this.special_flag; //这件装备是否属于特制装备
        this.wearing_position = new Array(); //这件装备能穿戴的位置
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
    //自然材料
    {
        items['Oak_logs'] = new Material('Oak_logs', '橡树原木', 30);
        items['Oak_logs'].description = texts['Oak_logs'].item_desc;
        items['Oak_logs'].type.push('raw_MTR');
        items['Oak_woodchip'] = new Material('Oak_woodchip', '橡树木屑', 300);
        items['Oak_woodchip'].description = texts['Oak_woodchip'].item_desc;
        items['Oak_woodchip'].type.push('raw_MTR');

        items['Willow_logs'] = new Material('Willow_logs', '柳树原木', 30);
        items['Willow_logs'].description = texts['Willow_logs'].item_desc;
        items['Willow_logs'].type.push('raw_MTR');
        items['Willow_woodchip'] = new Material('Willow_woodchip', '柳树木屑', 300);
        items['Willow_woodchip'].description = texts['Willow_woodchip'].item_desc;
        items['Willow_woodchip'].type.push('raw_MTR');
    }
    //人工材料
    {
        items['normal_board'] = new Material('normal_board', '普通木板', 3);
        items['normal_board'].description = texts['normal_board'].item_desc;
        items['normal_board'].type.push('process_MTR');
        items['Oak_board'] = new Material('Oak_board', '橡木板', 3);
        items['Oak_board'].description = texts['Oak_board'].item_desc;
        items['Oak_board'].type.push('process_MTR');
        items['Willow_board'] = new Material('Willow_board', '柳木板', 3);
        items['Willow_board'].description = texts['Willow_board'].item_desc;
        items['Willow_board'].type.push('process_MTR');
    }
}
//武器装备
{
    //近战武器
    {
        items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
        items['wood_sword'].description = texts['wood_sword'].item_desc;
        items['wood_sword'].type.push('weapon');
        items['wood_sword'].equipment_type.push('sword');

        items['wood_battle_axe'] = new Equipment('wood_battle_axe', '木制战斧', 1);
        items['wood_battle_axe'].description = texts['wood_battle_axe'].item_desc;
        items['wood_battle_axe'].type.push('weapon');
        items['wood_battle_axe'].equipment_type.push('battle_axe');

        items['wood_sticks'] = new Equipment('wood_sticks', '木棒', 1);
        items['wood_sticks'].description = texts['wood_sticks'].item_desc;
        items['wood_sticks'].type.push('weapon');
        items['wood_sticks'].equipment_type.push('sticks');

        items['wood_hammers'] = new Equipment('wood_hammers', '巨大木棒', 1);
        items['wood_hammers'].description = texts['wood_hammers'].item_desc;
        items['wood_hammers'].type.push('weapon');
        items['wood_hammers'].equipment_type.push('hammers');
    }
    //远程武器
    {
        items['wood_bow(n)'] = new Equipment('wood_bow(n)', '木弓（无弦）', 10);
        items['wood_bow(n)'].description = texts['wood_bow(n)'].item_desc;
        items['wood_bow(n)'].type.push('weapon', 'process_MTR');
        items['wood_bow(n)'].equipment_type.push('sticks');

        items['wood_bow'] = new Equipment('wood_bow', '木弓', 1);
        items['wood_bow'].description =
            '使用木头制作的弓，想要正常使用它，需要有弹药，你会在有弹药的情况下正常使用的对吧';
        items['wood_bow'].type.push('weapon');
        items['wood_bow'].equipment_type.push('bow');
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
    items['wood_arrow'].description = texts['wood_arrow'].item_desc;
    items['wood_arrow'].type.push('combat_CSB');
    items['wood_arrow'].Consumable_type.push('arrow');
}
export { items };
