import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与buff相关的内容
function init_Enum_buff(enums) {
    let id;
    //buff效果中，要用bool类型看待的有哪些
    id = 'bool_data_type';
    add_Enum_Array(enums, id);
    enums[id] = ['GS_rest_flag'];
    //buff效果中，需要调用change_data_attr接口去改变玩家属性的效果
    id = 'change_data_attr_data_type';
    add_Enum_Array(enums, id);
    enums[id] = ['health_point', 'magic_point', 'surface_energy_point', 'deep_energy_point'];
    //buff效果中，需要调用updata_end_attr接口，让玩家属性类读取buff部分的属性，统一计算的效果
    id = 'updata_end_attr_data_type';
    add_Enum_Array(enums, id);
    enums[id] = [
        'max_health_ratio',
        'end_LGI_speed',
        'end_LGI_attack', //
        'end_FIS_walkfish_attack',
        'end_FAG_attack',
        'end_FAG_speed',
        'attack_ratio',
        'precision_ratio',
        'critical_chance_ratio',
        'critical_damage_ratio',
        'attack_interval_ratio',
        'evade_ratio',
        'move_speed_ratio',
    ];
    //buff效果中，需要调用global.set_flag接口，修改游戏状态的效果
    id = 'global_set_flag_data_type';
    add_Enum_Array(enums, id);
    enums[id] = ['GS_rest_flag'];
    //buff效果中，需要调用set_game_speed_num接口，加算修改游戏速度的效果
    id = 'set_game_speed_num_data_type';
    add_Enum_Array(enums, id);
    enums[id] = ['change_game_speed'];
    //buff效果中，需要调用set_game_speed_ratio接口，乘算修改游戏速度的效果
    id = 'set_game_speed_ratio_data_type';
    add_Enum_Array(enums, id);
    enums[id] = [];
}

export { init_Enum_buff };
