import { texts } from '../Text/Text.js';
import { Item } from './Item_class.js';

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
//单手
var single_hand = [
    'dagger',
    'sword',
    'sticks',
    'whips',
    'hand_gun',
    'throw',
    'boomerang',
    'putmagic_core',
    'zhenfa_core',
    'magic_core',
    'spread_core',
    'summon_core',
];
//双手
var both_hand = ['battle_axe', 'long_handled', 'hammers', 'gloves', 'bow', 'crossbow', 'spray_gun'];

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
        if (single_hand.includes(e_type)) {
            this.wearing_position.push('main_hand'); //这件装备可以放在主手位置
        } else if (both_hand.includes(e_type)) {
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
    }
    //魔法武器
    {
    }
    //防具
    {
    }
}

export { init_Item_Equipment };
