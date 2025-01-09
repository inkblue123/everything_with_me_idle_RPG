// import { init_Text_type } from './Text_type.js';
// import { init_Text_item } from './Text_item.js';
import { add_Place_object } from './Place_class.js';

var places = new Object();

//初始化地点库
init_Text_type(places);

function init_Text_type(places) {
    let id = 'test_normal1';
    add_Place_object(places, id);
    places[id].desc = '1号测试地点描述';
    //地点的类型
    places[id].type = 'normal'; //普通地点
    //可联通地点的id
    places[id].connected_place = [
        {
            desc: '前往战斗区域',
            id: 'test_combat1',
        },
    ];

    id = 'test_combat1';
    add_Place_object(places, id);
    places[id].desc = '1号战斗地点描述';
    places[id].type = 'combat'; //战斗地点
    //可联通地点的id
    places[id].connected_place = [
        {
            desc: '前往非战斗区域',
            id: 'test_normal1',
        },
    ];
}

export { places };
