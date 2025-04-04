import { places } from '../Data/Place/Place.js';
//记录地点相关内容的对象
export class Place_manage {
    constructor() {
        this.now_place; //当前地点
        this.last_place; //上次地点
        this.last_normal_place; //上一个安全的地点
        this.next_place; //下一帧要移动到的新地点
    }
    init() {}
    //移动到新地点，更新相关参数
    set_now_place(place) {
        if (this.now_place && places[this.now_place]) {
            if (places[this.now_place].type == 'normal') {
                this.last_normal_place = this.now_place;
            }
        }
        this.last_place = this.now_place;
        this.now_place = place;

        updata_control_place_name(place);
    }
    set_next_place(next_place) {
        this.next_place = next_place;
    }
    get_now_place() {
        return this.now_place;
    }
    get_now_place_type() {
        return places[this.now_place].type;
    }
    get_next_place_type() {
        return places[this.next_place].type;
    }
    get_last_place() {
        return this.last_place;
    }
    //获取上一个普通地点
    get_last_normal_place() {
        return this.last_normal_place;
    }

    //判断是否需要更新地点
    is_need_change_place() {
        if (this.next_place) {
            return true;
        } else {
            return false;
        }
    }
    //前往要移动到的新地点
    goto_next_place() {
        if (this.next_place == this.now_place) {
            //新地点就是当前地点，不需要变更参数
        } else {
            //新地点不等于当前地点，需要变更参数
            this.set_now_place(this.next_place);
        }
        this.next_place = null;
    }
}

//更新中下的玩家控制界面的当前所在区域和当前地点名称
function updata_control_place_name(now_place_id) {
    //
    let area_name_div = document.getElementById('area_name_div');
    let place_name_div = document.getElementById('place_name_div');
    let place_ch = '当前地点：' + places[now_place_id].name;
    let area_name = '当前区域：' + places[now_place_id].area_name;
    area_name_div.innerHTML = area_name;
    place_name_div.innerHTML = place_ch;
}
