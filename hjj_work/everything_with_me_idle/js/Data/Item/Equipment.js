import { texts } from '../Text/Text.js';
import { Item } from './Item_class.js';
import { types } from '../Type.js';

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

//武器装备通用属性
class Equipment extends Item {
    constructor(id) {
        super(id);
        this.type.push('equipment');
        this.equipment_type = new Array(); //这件装备的具体类型
        this.wearing_position = new Array(); //这件装备能穿戴的位置
        this.two_handed_flag = false; //这件装备是否属于双手武器
        this.special_flag = false; //这件装备是否属于特制装备

        this.equip_min_threshold = new Object(); //装备的最低使用属性
        this.equip_max_threshold = new Object(); //装备的最高使用属性
        this.equip_attr = new Object(); //装备后能提供的属性
        this.equip_effect = new Object(); //装备后能提供的被动
    }
    //为这个物品填写装备特有的属性
    init_Equipment(e_type, special) {
        this.equipment_type.push(e_type);
        //为装备预设穿戴位置
        if (types.single_hand.includes(e_type)) {
            this.wearing_position.push('main_hand'); //这件装备可以放在主手位置
        } else if (types.both_hand.includes(e_type)) {
            this.wearing_position.push('main_hand_two'); //这件装备可以放在主手位置
            this.two_handed_flag = true; //这件装备属于双手武器
        } else if (e_type == 'helmet') {
            this.wearing_position.push('head'); //这件装备可以放在头部
        } else if (e_type == 'chest_armor') {
            this.wearing_position.push('chest'); //这件装备可以放在胸部
        } else if (e_type == 'leg_armor') {
            this.wearing_position.push('legs'); //这件装备可以放在腿部
        } else if (e_type == 'shoes') {
            this.wearing_position.push('feet'); //这件装备可以放在脚部
        } else if (e_type == 'deputy') {
            this.wearing_position.push('deputy'); //这件装备可以放在副手位置
        } else if (e_type == 'ornament') {
            this.wearing_position.push('ornament'); //这件装备可以放在饰品位置
        }
        if (e_type == 'hand_gun') {
            //手弩可以同时放在主手和副手
            this.wearing_position.push('deputy');
        }
        //制式武器或者特制武器的标记
        if (special) {
            this.special = special;
        }
    }
}
//初始化文本数据库中与类型相关的文本
function init_Item_Equipment(items) {
    //近战武器
    {
        //木剑
        items['wood_sword'] = new Equipment('wood_sword');
        items['wood_sword'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['wood_sword'].init_Equipment('sword'); //物品小分类，是否特制

        items['wood_battle_axe'] = new Equipment('wood_battle_axe');
        items['wood_battle_axe'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['wood_battle_axe'].init_Equipment('battle_axe'); //物品小分类

        items['wood_sticks'] = new Equipment('wood_sticks');
        items['wood_sticks'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['wood_sticks'].init_Equipment('sticks'); //物品小分类

        items['wood_hammers'] = new Equipment('wood_hammers');
        items['wood_hammers'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['wood_hammers'].init_Equipment('hammers'); //物品小分类
    }
    //远程武器
    {
        items['wood_bow(n)'] = new Equipment('wood_bow(n)');
        items['wood_bow(n)'].init_Item_other(10, ['weapon', 'process_MTR']); //堆叠数量，物品大分类
        items['wood_bow(n)'].init_Equipment('sticks'); //物品小分类

        items['wood_bow'] = new Equipment('wood_bow');
        items['wood_bow'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['wood_bow'].init_Equipment('bow'); //物品小分类

        //测试手弩
        items['test_hand_gun'] = new Equipment('test_hand_gun');
        items['test_hand_gun'].name = '测试用手弩';
        items['test_hand_gun'].init_Item_other(1, ['weapon']); //堆叠数量，物品大分类
        items['test_hand_gun'].init_Equipment('hand_gun'); //物品小分类

        //测试回旋武器
        items['test_boomerang'] = new Equipment('test_boomerang');
        items['test_boomerang'].name = '测试用回旋武器';
        items['test_boomerang'].init_Item_other(5, ['weapon']); //堆叠数量，物品大分类
        items['test_boomerang'].init_Equipment('boomerang'); //物品小分类
    }
    //魔法武器
    {
    }
    //防具
    {
        items['test_helmet'] = new Equipment('test_helmet');
        items['test_helmet'].name = '测试头盔';
        items['test_helmet'].init_Item_other(1, ['armor']); //堆叠数量，物品大分类
        items['test_helmet'].init_Equipment('helmet'); //物品小分类
        items['test_chest_armor'] = new Equipment('test_chest_armor');
        items['test_chest_armor'].name = '测试胸甲';
        items['test_chest_armor'].init_Item_other(1, ['armor']); //堆叠数量，物品大分类
        items['test_chest_armor'].init_Equipment('chest_armor'); //物品小分类
        items['test_leg_armor'] = new Equipment('test_leg_armor');
        items['test_leg_armor'].name = '测试腿甲';
        items['test_leg_armor'].init_Item_other(1, ['armor']); //堆叠数量，物品大分类
        items['test_leg_armor'].init_Equipment('leg_armor'); //物品小分类
        items['test_shoes'] = new Equipment('test_shoes');
        items['test_shoes'].name = '测试鞋子';
        items['test_shoes'].init_Item_other(1, ['armor']); //堆叠数量，物品大分类
        items['test_shoes'].init_Equipment('shoes'); //物品小分类
    }
    //副手
    {
        items['test_shield'] = new Equipment('test_shield');
        items['test_shield'].name = '测试盾牌';
        items['test_shield'].init_Item_other(1, ['deputy']); //堆叠数量，物品大分类
        items['test_shield'].init_Equipment('deputy'); //物品小分类
    }
    //饰品
}

export { init_Item_Equipment };
