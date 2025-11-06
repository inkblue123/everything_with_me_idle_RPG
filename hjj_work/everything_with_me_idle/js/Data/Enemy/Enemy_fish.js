import { add_E_fish_object } from './Enemy_class.js';

//钓鱼敌人数据库初始化
function init_Enemy_fish(enemys) {
    let id;

    id = 'river_mussel'; //河蚌
    add_E_fish_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(50, 0, 0); //生存属性初始化
    enemys[id].init_fish_attr(15, 1); //设置属于鱼的属性，逃跑力
    enemys[id].create_item_array(100); //创造一个物品队列，掉率100%
    enemys[id].add_item(0, 'river_mussel', 10, 1, 1); //河蚌

    id = 'river_crab'; //河蟹
    add_E_fish_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(20, 0, 0); //生存属性初始化
    enemys[id].init_fish_attr(30, 1); //设置属于鱼的属性，逃跑力
    enemys[id].create_item_array(100); //创造一个物品队列，掉率100%
    enemys[id].add_item(0, 'river_crab', 10, 1, 1); //河蟹

    id = 'creek_fish'; //溪鱼
    add_E_fish_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(100, 0, 0); //生存属性初始化
    enemys[id].init_fish_attr(37, 2); //设置属于鱼的属性，逃跑力
    enemys[id].create_item_array(100); //创造一个物品队列，掉率100%
    enemys[id].add_item(0, 'creek_fish', 10, 1, 1); //溪鱼

    id = 'iron_bone_fish'; //铁骨鱼
    add_E_fish_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(120, 0, 0); //生存属性初始化
    enemys[id].init_fish_attr(40, 3); //设置属于鱼的属性，逃跑力
    enemys[id].create_item_array(100); //创造一个物品队列，掉率100%
    enemys[id].add_item(0, 'iron_bone_fish', 10, 1, 1); //铁骨鱼

    id = 'bite_fish'; //咬鱼
    add_E_fish_object(enemys, id);
    //最大生命，最大魔力，最大精力
    enemys[id].init_survival_attr(180, 0, 0); //生存属性初始化
    enemys[id].init_fish_attr(40, 3); //设置属于鱼的属性，逃跑力
    enemys[id].create_item_array(100); //创造一个物品队列，掉率100%
    enemys[id].add_item(0, 'bite_fish', 10, 1, 1); //咬鱼
}

export { init_Enemy_fish };
