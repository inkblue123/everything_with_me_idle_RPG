import { add_combat_Place } from './Place_class.js';

//战斗地点初始化
function init_Place_combat(places) {
    {
        let id = 'test_combat1';
        add_combat_Place(places, id, 'test');
        //可联通地点的id
        places[id].add_other_normal_place('test_normal1');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].enemy = ['Training_Dummy']; //能刷什么敌人
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }
    {
        let id = 'VB_melee_train'; //村庄兵营-近战训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_other_normal_place('village_barracks');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].enemy = ['Training_Dummy']; //能刷什么敌人
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }

    {
        let id = 'VB_range_train'; //村庄兵营-远程训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_other_normal_place('village_barracks');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'random'; //刷怪方式随机位置
        places[id].enemy = ['Training_Dummy']; //能刷什么敌人
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }

    {
        let id = 'new_player_combat_test'; //新手战斗训练场所
        add_combat_Place(places, id, 'village');
        // places[id].add_other_normal_place('village_barracks');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].enemy = ['Training_Dummy', 'Attack_Dummy']; //能刷什么敌人
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
        places[id].buff = ['111']; //战斗场地内的固定buff
    }
}
export { init_Place_combat };
