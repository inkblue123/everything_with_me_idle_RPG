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
    //材料 Material
    Raw: 'raw_MTR', //原材料
    Process: 'process_MTR', //加工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
});
//武器装备的具体类别
const Equipment_type = Object.freeze({
    //武器 weapon
    //锐器，匕首，剑，长毛，斧头
    //钝器

    Weapon: 'weapon', //武器
    Armor: 'armor', //防具
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
    //防具 armor
    Restore: 'Restore_CSB', //恢复消耗品
    Buff: 'buff_CSB', //buff消耗品
    Combat: 'combat_CSB', //战斗消耗品
    Life: 'life_CSB', //生活消耗品
    //副手 Deputy
    Restore: 'Restore_CSB', //恢复消耗品
    Buff: 'buff_CSB', //buff消耗品
    Combat: 'combat_CSB', //战斗消耗品
    Life: 'life_CSB', //生活消耗品
    //饰品 Material
    Raw: 'raw_MTR', //原材料
    Process: 'process_MTR', //加工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
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

        this.rarity = 0; //稀有度，只限定在0-5之内
        this.equip_threshold = new Object(); //装备的使用需求
        this.equip_threshold = new Object(); //装备的使用需求
        this.equip_attr = new Object(); //装备后能提供的属性
        this.Equipment_type = new Object(); //这件装备的具体类型
    }
}
//消耗品通用属性
class Consumable extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);

        this.use_effect = new Object(); //使用后能提供的效果
    }
}
//材料通用属性
class Material extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);
    }
}

//用物品的名称做唯一id，小驼峰命名
items['Oak_logs'] = new Material('Oak_logs', '橡树原木', 30);
items['Oak_logs'].description = '一块足够大的橡树原木，可以进行加工，有效率的伐木才能获得更多的原木，而不是木屑';
items['Oak_logs'].type = ['raw_MTR'];
items['Oak_woodchip'] = new Material('Oak_woodchip', '橡树木屑', 300);
items['Oak_woodchip'].description = '一堆橡木的碎片，伐木时如果砍的太碎了，那就只能获得木屑了';
items['Oak_woodchip'].type = ['raw_MTR'];

items['Willow_logs'] = new Material('Willow_logs', '柳树原木', 30);
items['Willow_logs'].description = '一块足够大的柳树原木';
items['Willow_logs'].type = ['raw_MTR'];
items['Willow_woodchip'] = new Material('Willow_woodchip', '柳树木屑', 300);
items['Willow_woodchip'].description = '一堆柳木碎屑，它所在的木头应该遭受了难以想象的折磨，才会变得如此细碎';
items['Willow_woodchip'].type = ['raw_MTR'];

items['normal_board'] = new Material('normal_board', '普通木板', 3);
items['normal_board'].description =
    '去除了原木上的树皮、裂纹之后的完整木板，理论上任何木头都能做成普通木板，感觉伐木技巧好一些甚至能直接从树里砍出木板，加工指南还说要保留原木的纹理，哪有那么麻烦';
items['normal_board'].type = ['process_MTR'];
items['Oak_board'] = new Material('Oak_board', '橡木板', 3);
items['Oak_board'].description = '用橡木制成的完整木板，保留了橡木的纹理，用它制作的物品应该更耐用';
items['Oak_board'].type = ['process_MTR'];
items['Willow_board'] = new Material('Willow_board', '柳木板', 3);
items['Willow_board'].description =
    '用柳木制成的完整木板，保留了柳木的纹理，要是拿它去做一些形状不合适的物品岂不是浪费了纹路？所以用处比普通木板少';
items['Willow_board'].type = ['process_MTR'];

items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];
items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];
items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];
items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];
items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];
items['wood_sword'] = new Equipment('wood_sword', '木剑', 1);
items['wood_sword'].description = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
items['wood_sword'].type = ['weapon'];

export { items };
