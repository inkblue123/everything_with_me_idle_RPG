import { add_E_tree_object } from './Enemy_class.js';

//伐木敌人数据库初始化
function init_Enemy_tree(enemys) {
    let id = 'bushes'; //灌木丛
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(5, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(4); //分了2档，0-4秒，大于4秒
    //第0档的奖励
    enemys[id].create_item_array(0, 1); //在第0档奖励创造一个物品队列，掉率1%
    enemys[id].add_item(0, 0, 'viresilver_stem', 10, 1, 1); //绿银草茎
    enemys[id].create_item_array(0, 120); //在第0档奖励创造一个物品队列，掉率120%
    enemys[id].add_item(0, 1, 'red_berry', 10, 2, 1); //红浆果
    enemys[id].add_item(0, 1, 'yellow_berry', 10, 2, 1); //黄浆果
    enemys[id].add_item(0, 1, 'black_berry', 10, 2, 1); //黑浆果
    //第1档的奖励
    enemys[id].create_item_array(1, 80); //在第1档奖励创造一个物品队列，掉率80%
    enemys[id].add_item(1, 0, 'red_berry', 10, 1, 1); //红浆果
    enemys[id].add_item(1, 0, 'yellow_berry', 10, 1, 1); //黄浆果
    enemys[id].add_item(1, 0, 'black_berry', 10, 1, 1); //黑浆果

    id = 'oak_tree'; //橡树
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(8, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(4, 8, 16); //分了4档，0-4秒，4-8秒，8-16秒，大于16秒
    //第0档的奖励，5个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'Oak_logs', 10, 5, 5); //橡树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'Oak_woodchip', 10, 2, 1); //橡树木屑
    //第1档的奖励，3个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'Oak_logs', 10, 3, 3); //橡树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'Oak_woodchip', 10, 5, 3); //橡树木屑
    //第2档的奖励，1个木头，5-7个木屑
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'Oak_logs', 10, 1, 1); //橡树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'Oak_woodchip', 10, 7, 5); //橡树木屑
    //第3档的奖励，0个木头，7-13个木屑
    enemys[id].create_item_array(3, 0); //在第3档奖励创造一个物品队列，掉率0%
    enemys[id].add_item(3, 0, 'Oak_logs', 10, 0, 0); //橡树原木
    enemys[id].create_item_array(3, 100); //在第3档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(3, 1, 'Oak_woodchip', 10, 13, 7); //橡树木屑

    id = 'Willow_tree'; //柳树
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(12, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(5, 11); //分了3档，0-5秒，5-11秒，大于11秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'Willow_logs', 10, 3, 3); //柳树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'Willow_woodchip', 10, 2, 1); //柳树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'Willow_logs', 10, 1, 1); //柳树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'Willow_woodchip', 10, 5, 3); //柳树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'Willow_logs', 10, 0, 0); //柳树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'Willow_woodchip', 10, 7, 5); //柳树木屑

    id = 'ash_skin_birch'; //灰肤桦
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(18, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(7, 14); //分了3档，0-7秒，7-14秒，大于14秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'birch_logs', 10, 3, 3); //桦树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'birch_woodchip', 10, 2, 1); //柳树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'birch_logs', 10, 1, 1); //桦树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'birch_woodchip', 10, 5, 3); //柳树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'birch_logs', 10, 0, 0); //桦树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'birch_woodchip', 10, 7, 5); //柳树木屑

    id = 'pine'; //松树
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(25, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(7, 14); //分了3档，0-7秒，7-14秒，大于14秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'pine_logs', 10, 3, 3); //松树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'pine_woodchip', 10, 2, 1); //松树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'pine_logs', 10, 1, 1); //松树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'pine_woodchip', 10, 5, 3); //松树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'pine_logs', 10, 0, 0); //松树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'pine_woodchip', 10, 7, 5); //松树木屑

    id = 'lightning_iron_fir'; //雷击铁杉
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(40, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(8, 16); //分了3档，0-8秒，8-16秒，大于16秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 2); //在第0档奖励创造一个物品队列，掉率2%
    enemys[id].add_item(0, 0, 'lightning_bark', 10, 1, 1); //雷杉树皮
    enemys[id].add_item(0, 0, 'lightning_branch', 10, 1, 1); //雷击尖枝
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'fir_logs', 10, 3, 3); //杉树原木
    enemys[id].add_item(0, 1, 'lightning_iron_logs', 10, 2, 1); //雷击铁杉木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 2, 'fir_woodchip', 10, 2, 1); //杉树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'fir_logs', 10, 1, 1); //杉树原木
    enemys[id].add_item(1, 0, 'lightning_iron_logs', 3, 1, 1); //雷击铁杉木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'fir_woodchip', 10, 5, 3); //杉树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 50); //在第2档奖励创造一个物品队列，掉率50%
    enemys[id].add_item(2, 0, 'fir_logs', 10, 0, 0); //杉树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'fir_woodchip', 10, 7, 5); //杉树木屑

    id = 'frost_marrow_pine'; //寒髓松
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(40, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(8, 16); //分了3档，0-5秒，5-11秒，大于11秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 5); //在第0档奖励创造一个物品队列，掉率5%
    enemys[id].add_item(0, 0, 'frost_marrow_resin', 10, 7, 3); //寒髓松树脂
    enemys[id].add_item(0, 0, 'frost_marrow_ice', 10, 1, 1); //寒髓松冰晶
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'pine_logs', 10, 3, 3); //松树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 2, 'pine_woodchip', 10, 2, 1); //松树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 5); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'frost_marrow_resin', 10, 1, 1); //寒髓松树脂
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'pine_logs', 10, 1, 1); //松树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 2, 'pine_woodchip', 10, 5, 3); //松树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'pine_logs', 10, 0, 0); //松树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'pine_woodchip', 10, 7, 5); //松树木屑

    id = 'serpent_marked_bamboo'; //蛇纹竹
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(12, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(5, 11); //分了3档，0-5秒，5-11秒，大于11秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'Willow_logs', 10, 3, 3); //柳树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'Willow_woodchip', 10, 2, 1); //柳树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'Willow_logs', 10, 1, 1); //柳树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'Willow_woodchip', 10, 5, 3); //柳树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'Willow_logs', 10, 0, 0); //柳树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'Willow_woodchip', 10, 7, 5); //柳树木屑

    id = 'violet_bamboo'; //紫斑竹
    add_E_tree_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(12, 0, 0); //生存属性初始化
    //设置奖励层级时间
    enemys[id].set_reward_level_time(5, 11); //分了3档，0-5秒，5-11秒，大于11秒
    //第0档的奖励，3个木头，1-2个木屑
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 0, 'Willow_logs', 10, 3, 3); //柳树原木
    enemys[id].create_item_array(0, 100); //在第0档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(0, 1, 'Willow_woodchip', 10, 2, 1); //柳树木屑
    //第1档的奖励，1个木头，3-5个木屑
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 0, 'Willow_logs', 10, 1, 1); //柳树原木
    enemys[id].create_item_array(1, 100); //在第1档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(1, 1, 'Willow_woodchip', 10, 5, 3); //柳树木屑
    //第2档的奖励，0个木头，5-7个木屑
    enemys[id].create_item_array(2, 0); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 0, 'Willow_logs', 10, 0, 0); //柳树原木
    enemys[id].create_item_array(2, 100); //在第2档奖励创造一个物品队列，掉率100%
    enemys[id].add_item(2, 1, 'Willow_woodchip', 10, 7, 5); //柳树木屑
}

export { init_Enemy_tree };
