import { add_Rare_object } from './Rare_class.js';

//稀有敌人的信息
function init_rare_enemy(rares) {
    let id = 'test_rare';
    add_Rare_object(rares, id);
    rares[id].drop_time = 24; //稀有敌人出现的保底时间间隔，单位是游戏内小时
    // rares[id].drop_try_num = ;//稀有敌人出现的保底次数，由期望概率动态生成

    id = 'sleep_1';
    add_Rare_object(rares, id);
    rares[id].set_time_type('game_time', 'infinite'); //以游戏内时间为依据，持续时间无限
    rares[id].add_rare_value('get_data_attr', 'health_point', 0.25); //给予玩家血量
    rares[id].add_rare_value('get_data_attr', 'energy_point', 0.25); //给予玩家精力
    rares[id].add_rare_value('change_game_speed', 30); //加快游戏速度

    id = 'get_up_rare';
    add_Rare_object(rares, id);
    rares[id].set_time_type('game_time', 'infinite'); //以游戏内时间为依据，持续时间无限
    rares[id].add_rare_value('change_game_speed', 0); //暂停时间
}

export { init_rare_enemy };
