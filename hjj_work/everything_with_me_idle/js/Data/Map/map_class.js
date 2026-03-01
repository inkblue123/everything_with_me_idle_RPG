import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
//配方数据库
export class Map {
    constructor(id) {
        this.id = id; //唯一id

        this.area_size_x; //区域地图大小
        this.area_size_y;

        this.place_data = new Object(); //区域地图内的地点信息

        this.area_other_place; //区域内需要展示出的按钮的其他区域地点
    }
    //初始化区域的地图信息
    set_area_data(x, y) {
        this.area_size_x = x;
        this.area_size_y = y;
    }
    //设置区域内需要展示出的按钮的其他区域地点
    set_area_other_place(...other_places) {
        this.area_other_place = other_places;
    }
    //添加区域内一个地点的地图信息
    add_place_data(place_id, button_flag, x, y) {
        if (is_Empty_Object(this.place_data[place_id])) {
            this.place_data[place_id] = new Object();
        }
        this.place_data[place_id].place_button_flag = button_flag;
        if (button_flag) {
            this.place_data[place_id].button_x = x; //按钮位置
            this.place_data[place_id].button_y = y;
        } else {
            this.place_data[place_id].button_x = 0; //按钮位置
            this.place_data[place_id].button_y = 0;
        }
    }
    //添加区域内一个地点和其他地点相连的地图信息
    add_place_button_line(place_id, ...line_places) {
        this.place_data[place_id].line_places = line_places;
    }
}
function add_Map_object(map, newid) {
    if (map[newid] === undefined) {
        map[newid] = new Map(newid);
    } else {
        console.log('创建map[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export { add_Map_object };
