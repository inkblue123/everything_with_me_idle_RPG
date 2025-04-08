import { add_Item_object } from './Item_class.js';

//物品的大类别枚举
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

//可穿戴部位
const wearing_position_type = Object.freeze({
    Head: 'head', //头部
    Chest: 'chest', //胸部
    Legs: 'legs', //腿部
    Feet: 'feet', //脚部

    Main_hand: 'main_hand', //主手
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
});

//初始化文本数据库中与类型相关的文本
function init_Item_Equipment(items) {
    let item_type = 'equipment';
    //近战武器
    {
        //木剑
        add_Item_object(items, 'wood_sword', item_type); //id，物品主要分类
        // add_Item_object(items, 'equipment', 'wood_sword');
        items['wood_sword'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['wood_sword'].init_Equipment('sword'); //物品小分类，是否特制
        items['wood_sword'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        //攻击，精准，暴击率，暴击伤害，攻击速度
        // items['wood_sword'].init_Equipment_attack_attr(5, 5, 5, 20, 2);//手动设置攻击属性
        //木制战斧
        add_Item_object(items, 'wood_battle_axe', item_type);
        items['wood_battle_axe'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['wood_battle_axe'].init_Equipment('battle_axe'); //物品小分类
        items['wood_battle_axe'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['wood_battle_axe'].init_Equipment_attack_attr(10, 5, 0, 0, 3);
        //木制棍棒
        add_Item_object(items, 'wood_sticks', item_type);
        items['wood_sticks'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['wood_sticks'].init_Equipment('sticks'); //物品小分类
        items['wood_sticks'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['wood_sticks'].init_Equipment_attack_attr(5, 5, 5, 20, 2);
        //木制大锤
        add_Item_object(items, 'wood_hammers', item_type);
        items['wood_hammers'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['wood_hammers'].init_Equipment('hammers'); //物品小分类
        items['wood_hammers'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['wood_hammers'].init_Equipment_attack_attr(10, 5, 0, 0, 3);
    }
    //远程武器
    {
        add_Item_object(items, 'wood_bow', item_type);
        items['wood_bow'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['wood_bow'].init_Equipment('bow'); //物品小分类
        items['wood_bow'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['wood_bow'].init_Equipment_attack_attr(8, 5, 5, 20, 1);

        //测试手弩
        add_Item_object(items, 'test_hand_gun', item_type);
        items['test_hand_gun'].name = '测试用手弩';
        items['test_hand_gun'].init_Item_other(1, ['weapon']); //堆叠数量，物品次要分类
        items['test_hand_gun'].init_Equipment('hand_gun'); //物品小分类
        items['test_hand_gun'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['test_hand_gun'].init_Equipment_attack_attr(3, 5, 10, 50, 2);

        //测试回旋武器
        add_Item_object(items, 'test_boomerang', item_type);
        items['test_boomerang'].name = '测试用回旋武器';
        items['test_boomerang'].init_Item_other(5, ['weapon']); //堆叠数量，物品次要分类
        items['test_boomerang'].init_Equipment('boomerang'); //物品小分类
        items['test_boomerang'].set_attr_level('L1', 'attack'); //调用L1级的攻击属性预设
        // items['test_boomerang'].init_Equipment_attack_attr(8, 5, 10, 50, 5);
    }
    //魔法武器
    {
    }
    //防具
    {
        let id = 'test_helmet';
        add_Item_object(items, id, item_type);
        items[id].name = '测试头盔';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('helmet'); //物品小分类
        id = 'test_chest_armor';
        add_Item_object(items, id, item_type);
        items[id].name = '测试胸甲';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('chest_armor'); //物品小分类
        id = 'test_leg_armor';
        add_Item_object(items, id, item_type);
        items[id].name = '测试腿甲';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('leg_armor'); //物品小分类
        id = 'test_shoes';
        add_Item_object(items, id, item_type);
        items[id].name = '测试鞋子';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('shoes'); //物品小分类

        id = 'wood_helmet';
        add_Item_object(items, id, item_type);
        items[id].name = '木制头盔';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('helmet'); //物品小分类
        id = 'wood_chest_armor';
        add_Item_object(items, id, item_type);
        items[id].name = '木制胸甲';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('chest_armor'); //物品小分类
        id = 'wood_leg_armor';
        add_Item_object(items, id, item_type);
        items[id].name = '木制腿甲';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('leg_armor'); //物品小分类
        id = 'wood_shoes';
        add_Item_object(items, id, item_type);
        items[id].name = '木制鞋子';
        items[id].init_Item_other(1, ['armor']); //堆叠数量，物品次要分类
        items[id].init_Equipment('shoes'); //物品小分类
    }
    //副手
    {
        let id = 'test_shield';
        add_Item_object(items, id, item_type);
        items[id].name = '测试盾牌';
        items[id].init_Item_other(1, ['deputy']); //堆叠数量，物品次要分类
        items[id].init_Equipment('shield'); //物品小分类
        id = 'wood_shield';
        add_Item_object(items, id, item_type);
        items[id].name = '木制盾牌';
        items[id].init_Item_other(1, ['deputy']); //堆叠数量，物品次要分类
        items[id].init_Equipment('shield'); //物品小分类
    }
    //饰品
}

export { init_Item_Equipment };
