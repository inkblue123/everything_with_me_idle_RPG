import { add_E_ore_object } from './Enemy_class.js';

//挖矿敌人数据库初始化
function init_Enemy_ore(enemys) {
    let id;
    id = 'hard_stratum'; //坚硬岩层
    add_E_ore_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(15, 0, 0); //生存属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(2, 0, 0); //防御属性初始化
    enemys[id].init_ore_attr(2); //设置属于矿石的属性，每次挖矿的精力消耗
    //设置等级0
    enemys[id].set_reward_level_data(0, 70, false); //70权重出现，非特殊
    enemys[id].set_reward_level_attr(0, -5, -1, 0); //血量-5，防御-1
    enemys[id].set_reward_level_item_array(0, 100); //在等级0创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'hard_rock', 10, 0, 1); //坚硬岩石
    //设置等级1
    enemys[id].set_reward_level_data(1, 20, false); //20权重出现，非特殊
    enemys[id].set_reward_level_attr(1, 0, 0, 0); //属性不变
    enemys[id].set_reward_level_item_array(1, 100); //在等级1创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'hard_rock', 10, 1, 2); //坚硬岩石
    //设置等级2
    enemys[id].set_reward_level_data(2, 10, false); //10权重出现，非特殊
    enemys[id].set_reward_level_attr(2, 10, 0, 0); //血量+10
    enemys[id].set_reward_level_item_array(2, 80); //在第2档奖励创造一个物品队列，掉率80%
    enemys[id].add_item(2, 0, 'lowFe_rock', 10, 1, 1); //含铁矿石
    enemys[id].set_reward_level_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'hard_rock', 10, 2, 2); //坚硬岩石
}

export { init_Enemy_ore };
