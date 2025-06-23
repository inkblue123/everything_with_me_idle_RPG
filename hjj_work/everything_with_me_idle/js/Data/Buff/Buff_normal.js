import { add_Buff_object } from './Buff_class.js';

function init_normal_buff(buffs) {
    let id = 'test_buff';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time', 'infinite'); //以游戏内时间为依据，持续时间无限
    buffs[id].add_buff_value('get_data_attr', 'health_point', 5);

    id = 'sleep_1';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time', 'infinite'); //以游戏内时间为依据，持续时间无限
    buffs[id].add_buff_value('get_data_attr', 'health_point', 0.25); //给予玩家血量
    buffs[id].add_buff_value('get_data_attr', 'energy_point', 0.25); //给予玩家精力
    buffs[id].add_buff_value('change_game_speed', 30); //加快游戏速度

    id = 'get_up_buff';
    add_Buff_object(buffs, id);
    buffs[id].set_time_type('game_time', 'infinite'); //以游戏内时间为依据，持续时间无限
    buffs[id].add_buff_value('change_game_speed', 0); //暂停时间
}

export { init_normal_buff };
