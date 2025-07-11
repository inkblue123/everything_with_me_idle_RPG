import { add_combat_Place } from './Place_class.js';

//位于测试区域的战斗地点
function init_test_combat_place(places) {
    let id = 'test_combat1'; //测试战斗地点
    add_combat_Place(places, id, 'test');
    //可联通地点的id
    places[id].add_connect_normal_place('test_normal1');
    places[id].set_combat_type('infinite_enemy');
    places[id].set_add_enemy_data(1, 1);

    //战斗地点-刷怪相关内容
    places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
    //刷怪方式的约束条件
    places[id].add_enemy_field_limit = {
        field: 'little_distance', //只允许刷在近距离
        // distance: 50, //只允许刷在指定距离
    };
    places[id].enemy = {
        //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
        Attack_Dummy: {
            chance: 50, //刷新概率
        },
    };
}
//位于村庄区域的战斗地点
function init_village_combat_place(places) {
    {
        let id = 'VB_melee_train'; //村庄兵营-近战训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_connect_normal_place('village_barracks');
        places[id].set_combat_type('infinite_enemy');
        places[id].set_add_enemy_data(5, 3);
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪位置约束条件
        places[id].add_enemy_field_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].set_enemy_data('Training_Dummy', 50);
    }

    {
        let id = 'VB_range_train'; //村庄兵营-远程训练场地
        add_combat_Place(places, id, 'village');
        places[id].add_connect_normal_place('village_barracks');
        places[id].set_combat_type('infinite_enemy');
        places[id].set_add_enemy_data(5, 3);
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'random'; //刷怪方式随机位置
        places[id].set_enemy_data('Training_Dummy', 50);
    }

    {
        let id = 'new_player_combat_test'; //新手战斗训练场所
        add_combat_Place(places, id, 'village');
        places[id].set_combat_type('infinite_enemy');
        places[id].set_add_enemy_data(5, 3);
        //战斗地点-刷怪相关内容
        places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
        //刷怪方式的约束条件
        places[id].add_enemy_field_limit = {
            field: 'little_distance', //只允许刷在近距离
            // distance: 50, //只允许刷在指定距离
        };
        places[id].set_enemy_data('Training_Dummy', 50, 4);
        places[id].set_enemy_data('Attack_Dummy', 50, 2);
    }
}
//位于村外后山区域的战斗地点
function init_village_backhill_combat_place(places) {
    let id = 'forest_edge_road'; //通往森林外围的道路
    add_combat_Place(places, id, 'village_backhill');
    //可联通地点的id
    places[id].add_connect_normal_place('VBH_rest_location');
    places[id].set_combat_type('limited_enemy_road', 20, 120, 'forest_edge');
    places[id].set_add_enemy_data(3, 5, 2, 3);
    //战斗地点-刷怪相关内容
    places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
    //刷怪方式的约束条件
    places[id].add_enemy_field_limit = {
        field: 'little_distance', //只允许刷在近距离
    };
    places[id].set_enemy_data('blocking_shrubs', 40); //拦路灌木
    places[id].set_enemy_data('small_snake', 10); //小蛇
    places[id].set_enemy_data('small_slime', 10); //小史莱姆
    places[id].set_enemy_data('giant_teeth_rat', 10); //巨齿鼠
    places[id].set_enemy_data('rotten_wood_monster', 5); //朽木精怪
    places[id].set_enemy_data('mosquitoes', 5); //蚊群
    places[id].set_enemy_data('wild_boar', 2); //野猪

    id = 'forest_core_road'; //通往内层森林的道路
    add_combat_Place(places, id, 'village_backhill');
    //可联通地点的id
    places[id].add_connect_normal_place('forest_edge');
    places[id].set_combat_type('limited_enemy_road', 15, 120, 'forest_core');
    places[id].set_add_enemy_data(3, 5, 2, 3);
    //战斗地点-刷怪相关内容
    places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
    //刷怪方式的约束条件
    places[id].add_enemy_field_limit = {
        field: 'little_distance', //只允许刷在近距离
    };
    places[id].set_enemy_data('blocking_shrubs', 40); //拦路灌木
    // places[id].set_enemy_data('small_snake', 10); //小蛇
    // places[id].set_enemy_data('small_slime', 10); //小史莱姆
    // places[id].set_enemy_data('giant_teeth_rat', 10); //巨齿鼠
    // places[id].set_enemy_data('rotten_wood_monster', 5); //朽木精怪
    // places[id].set_enemy_data('mosquitoes', 5); //蚊群
    // places[id].set_enemy_data('wild_boar', 2); //野猪
}
//位于村外后山洞穴区域的战斗地点
function init_backhill_cave_combat_place(places) {
    // let id = 'test_combat1'; //测试战斗地点
    // add_combat_Place(places, id, 'test');
    // //可联通地点的id
    // places[id].add_connect_normal_place('test_normal1');
    // places[id].set_combat_type('infinite_enemy');
    // places[id].set_add_enemy_data(1, 1);
    // //战斗地点-刷怪相关内容
    // places[id].add_enemy_type = 'fixed'; //刷怪方式-固定位置
    // //刷怪方式的约束条件
    // places[id].add_enemy_field_limit = {
    //     field: 'little_distance', //只允许刷在近距离
    //     // distance: 50, //只允许刷在指定距离
    // };
    // places[id].enemy = {
    //     //能刷什么敌人,key是敌人id，value是针对这个敌人的刷怪限制
    //     Attack_Dummy: {
    //         chance: 50, //刷新概率
    //     },
    // };
}

//战斗地点初始化
function init_Place_combat(places) {
    //位于测试区域的战斗地点
    init_test_combat_place(places);
    //位于村庄区域的战斗地点
    init_village_combat_place(places);
    //位于村外后山区域的战斗地点
    init_village_backhill_combat_place(places);
    //位于村外后山洞穴区域的战斗地点
    init_backhill_cave_combat_place(places);
}
export { init_Place_combat };
