import { add_combat_Place } from './Place_class.js';

//战斗地点初始化
function init_Place_combat(places) {
    {
        let id = 'test_combat1'; //测试战斗地点
        add_combat_Place(places, id, 'test');
        //可联通地点的id
        places[id].add_connect_normal_place('test_normal1');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].enemy = ['Attack_Dummy']; //能刷什么敌人
        places[id].enemy = {
            //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
            Attack_Dummy: {
                chance: 50, //刷新概率
            },
        };
        places[id].max_enemy_num = 1;
        places[id].add_enemy_time = 1; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }
    {
        let id = 'VB_melee_train'; //村庄兵营-近战训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_connect_normal_place('village_barracks');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        // places[id].enemy = ['Training_Dummy']; //能刷什么敌人
        places[id].enemy = {
            //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
            Training_Dummy: {
                chance: 50, //刷新概率
            },
        };
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }

    {
        let id = 'VB_range_train'; //村庄兵营-远程训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_connect_normal_place('village_barracks');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'random'; //刷怪方式随机位置
        // places[id].enemy = ['Training_Dummy']; //能刷什么敌人
        places[id].enemy = {
            //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
            Training_Dummy: {
                chance: 50, //刷新概率
            },
        };
        places[id].max_enemy_num = 5;
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
    }

    {
        let id = 'new_player_combat_test'; //新手战斗训练场所
        add_combat_Place(places, id, 'village');
        places[id].exit_place = 'last_place'; //可以退出当前地点，退出到
        places[id].relation_quest = 'new_player_combat_test'; //当前地点关联的任务
        // places[id].add_connect_normal_place('last_place');
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].type_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].enemy = {
            //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
            Training_Dummy: {
                chance: 50, //刷新概率
                now_place_max_num: 4, //最大同场数量
            },
            Attack_Dummy: {
                chance: 50, //刷新概率
                now_place_max_num: 2, //最大同场数量
            },
        };
        // places[id].enemy = ['Training_Dummy', 'Attack_Dummy'];
        places[id].max_enemy_num = 5; //总敌人最大数量
        places[id].add_enemy_time = 3; //刷怪间隔
        places[id].unlimited_add_flag = true; //是否无限刷怪
        places[id].buff = ['111']; //战斗场地内的固定buff
    }
}
export { init_Place_combat };
