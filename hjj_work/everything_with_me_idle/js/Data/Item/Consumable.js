import { texts } from '../Text/Text.js';
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

//消耗品的具体类别
const consumable_type = Object.freeze({
    // 可食用物品 food_CSB
    // 食材，烹饪技能专属材料类型，因为可以吃所以归到消耗品
    // 食品，主要从烹饪技能中获取
    // 药材，炼丹技能专属材料类型，因为可以吃所以归到消耗品
    // 丹药，主要从炼丹中获取
    //弹药
    Arrow: 'arrow', //箭矢
    Bolt: 'bolt', //弩箭
    Spray_gun_bullet: 'spray_gun_bullet', //喷枪弹药
    Throwable: 'throwable', //可投掷弹药
    Magic_core_bullet: 'magic_core_bullet', //法术核心弹药
    //生活消耗品,主要是玩家主动使用的一次性物品
    Box: 'box', //宝箱
    // 技能书
    // 梦境
});

//初始化文本数据库中与类型相关的文本
function init_Item_Consumable(items) {
    //弹药
    {
        add_Item_object(items,  'wood_arrow','consumable',);
        items['wood_arrow'].init_Item_other(100, ['ammo_CSB']); //堆叠数量，物品大分类
        items['wood_arrow'].init_Consumable('arrow'); //物品小分类，是否特制
    }
}

export { init_Item_Consumable };
