import { add_Buff_object } from './Buff_class.js';

//菜品（烹饪成品）的buff数据
//每道菜一条自己的buff，id 与菜品物品 id 相同（见 docs/plan_consumable_attribute.md §16 的 ADR-8）
//于是「同一个菜重复吃会覆盖刷新、不同菜品可以共存」这件事，靠 buff id 天然区分就实现了
//参数与效果行的写法同 Buff_normal.js，请对照那边的注释
function init_dish_buff(buffs) {
    let id;

    //烤鱼串：使用小鱼简单烹饪而成的菜品
    //这里的效果行是「数据库默认值」，食用时会被消耗品带来的效果行覆盖（见 consumable_manage.js）
    //两者的 target / 数值保持一致，所以覆盖前覆盖后表现相同
    id = 'grilled_fish';
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 30); //以游戏内时间为依据，持续30秒
    //每帧都生效，清除buff时不需要复原的效果
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false); //血量，每秒1点

    id = 'cooked_mussel'; //熟蚌肉
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 20);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 0.5, false, false);

    id = 'roasted_crab'; //烤螃蟹
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 30);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 0.5, false, false);

    id = 'grilled_mushrooms'; //烤蘑菇
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 20);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false);

    id = 'cooked_animal_meat'; //熟兽肉
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 30);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false);

    id = 'big_grilled_fish'; //大烤鱼串
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 40);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false);

    id = 'termite_mushroom_soup'; //鸡枞汤
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 60);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false);

    //调料效果：承载一份菜里所有调料的限时效果（全局唯一一条，见 plan §16 的 ADR-6）
    //时长与效果行都由食用时传入（调料经「调味配平」算出的结果），下面这组值只是占位
    id = 'seasoning_effect';
    add_Buff_object(buffs, id);
    buffs[id].set_buff_data('game_time_buff', 10);
    buffs[id].add_buff_effect('value', 'tick', 'resource', 'health_point', 1, false, false);
}

export { init_dish_buff };
