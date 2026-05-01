import { add_E_ore_object } from './Enemy_class.js';

//挖矿敌人数据库初始化
function init_Enemy_ore(enemys) {
    //碎石岩层，硬冷岩层，固板岩层，石泥岩层
    //深板岩层，重石岩层
    //玄铁矿层，寒元矿层，赤铜矿层

    // 极寒冰川/雪山：玄冰层、寒玉矿层、霜纹岩层、冰髓岩层
    // 火山地脉：地火岩层、熔心岩层、赤炎矿层、火曜石层
    // 森林/沼泽：青木岩层、腐殖岩层、泥炭石层、瘴气岩层
    // 沙漠/戈壁：流沙岩层、金砂岩层、旱魃岩层、风蚀岩层
    // 深海/水脉：玄水岩层、海眼石层、潮汐岩层、水精矿层
    // 普通山脉：玄铁岩层、精金矿层、戊土岩层、灵石矿层
    let id;

    id = 'gravel_layer'; //碎石岩层
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
    enemys[id].add_item(0, 0, 'hard_rock', 10, 1, 0); //坚硬岩石
    //设置等级1
    enemys[id].set_reward_level_data(1, 20, false); //20权重出现，非特殊
    enemys[id].set_reward_level_attr(1, 0, 0, 0); //属性不变
    enemys[id].set_reward_level_item_array(1, 100); //在等级1创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'hard_rock', 10, 2, 1); //坚硬岩石
    //设置等级2
    enemys[id].set_reward_level_data(2, 10, false); //10权重出现，非特殊
    enemys[id].set_reward_level_attr(2, 10, 0, 0); //血量+10
    enemys[id].set_reward_level_item_array(2, 80); //在第2档奖励创造一个物品队列，掉率80%
    enemys[id].add_item(2, 0, 'lowFe_rock', 10, 1, 1); //含铁矿石
    enemys[id].set_reward_level_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'hard_rock', 10, 2, 2); //坚硬岩石

    id = 'hard_stratum'; //坚硬山岩
    add_E_ore_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(25, 0, 0); //生存属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(4, 0, 0); //防御属性初始化
    enemys[id].init_ore_attr(2); //设置属于矿石的属性，每次挖矿的精力消耗
    //设置等级0
    enemys[id].set_reward_level_data(0, 70, false); //70权重出现，非特殊
    enemys[id].set_reward_level_attr(0, -5, -1, 0); //血量-5，防御-1
    enemys[id].set_reward_level_item_array(0, 100); //在等级0创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'hard_rock', 10, 1, 0); //坚硬岩石
    //设置等级1
    enemys[id].set_reward_level_data(1, 20, false); //20权重出现，非特殊
    enemys[id].set_reward_level_attr(1, 0, 0, 0); //属性不变
    enemys[id].set_reward_level_item_array(1, 100); //在等级1创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'lowFe_rock', 10, 1, 1); //含铁矿石
    //设置等级2
    enemys[id].set_reward_level_data(2, 10, false); //10权重出现，非特殊
    enemys[id].set_reward_level_attr(2, 10, 0, 0); //血量+10
    enemys[id].set_reward_level_item_array(2, 80); //在第2档奖励创造一个物品队列，掉率80%
    enemys[id].add_item(2, 0, 'lowFe_rock', 10, 1, 1); //含铁矿石
    enemys[id].set_reward_level_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'hard_rock', 10, 2, 2); //坚硬岩石

    id = 'iron_stratum'; //铁矿山石
    add_E_ore_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(60, 0, 0); //生存属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(10, 0, 0); //防御属性初始化
    enemys[id].init_ore_attr(5); //设置属于矿石的属性，每次挖矿的精力消耗
    //设置等级0
    enemys[id].set_reward_level_data(0, 50, false); //50权重出现，非特殊
    enemys[id].set_reward_level_attr(0, -20, -2, 0); //血量-20，防御-2
    enemys[id].set_reward_level_item_array(0, 100); //在等级0创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'lowFe_rock', 10, 1, 0); //含铁岩石
    enemys[id].set_reward_level_item_array(0, 100); //在等级0创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'hard_rock', 10, 1, 0); //坚硬岩石
    //设置等级1
    enemys[id].set_reward_level_data(1, 30, false); //20权重出现，非特殊
    enemys[id].set_reward_level_attr(1, 0, 0, 0); //属性不变
    enemys[id].set_reward_level_item_array(1, 150); //在等级1创造一个物品队列，掉率150%
    enemys[id].add_item(1, 0, 'highFe_rock', 10, 2, 1); //富铁矿石
    enemys[id].add_item(1, 0, 'lowFe_rock', 10, 2, 1); //含铁岩石
    enemys[id].set_reward_level_item_array(1, 100); //在等级1创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'hard_rock', 10, 2, 1); //坚硬岩石
    //设置等级2
    enemys[id].set_reward_level_data(2, 20, false); //10权重出现，非特殊
    enemys[id].set_reward_level_attr(2, 15, 1, 0); //血量+15，防御+1
    enemys[id].set_reward_level_item_array(2, 50); //在第2档奖励创造一个物品队列，掉率50%
    enemys[id].add_item(2, 0, 'low_xuantie_rock', 10, 1, 1); //玄铁碎石
    enemys[id].set_reward_level_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'highFe_rock', 10, 0, 2); //富铁矿石
    enemys[id].add_item(2, 1, 'lowFe_rock', 10, 2, 1); //含铁岩石

    id = 'cold_rock_layer'; //硬冷岩层
    add_E_ore_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(120, 0, 0); //生存属性初始化
    //防御，闪避，抵抗力，移动速度
    enemys[id].init_defense_attr(10, 0, 0); //防御属性初始化
    enemys[id].init_ore_attr(5); //设置属于矿石的属性，每次挖矿的精力消耗
    //设置等级0
    enemys[id].set_reward_level_data(0, 50, false); //50权重出现，非特殊
    enemys[id].set_reward_level_attr(0, -30, -2, 0); //血量-30，防御-2
    enemys[id].set_reward_level_item_array(0, 100); //在等级0创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'hard_rock', 10, 1, 1); //坚硬岩石
    //设置等级1
    enemys[id].set_reward_level_data(1, 30, false); //20权重出现，非特殊
    enemys[id].set_reward_level_attr(1, 0, 0, 0); //属性不变
    enemys[id].set_reward_level_item_array(1, 150); //在等级1创造一个物品队列，掉率150%
    enemys[id].add_item(1, 0, 'lowFe_rock', 10, 2, 1); //含铁岩石
    enemys[id].set_reward_level_item_array(1, 100); //在等级1创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'hard_rock', 10, 2, 1); //坚硬岩石
    //设置等级2
    enemys[id].set_reward_level_data(2, 20, false); //10权重出现，非特殊
    enemys[id].set_reward_level_attr(2, 15, 1, 0); //血量+15，防御+1
    enemys[id].set_reward_level_item_array(2, 50); //在第2档奖励创造一个物品队列，掉率50%
    enemys[id].add_item(2, 0, 'low_iceiron_rock', 10, 1, 1); //寒元碎石
    enemys[id].set_reward_level_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'lowFe_rock', 10, 2, 2); //含铁岩石
}

export { init_Enemy_ore };
