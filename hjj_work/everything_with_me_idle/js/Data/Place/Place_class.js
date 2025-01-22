import { texts } from '../Text/Text.js';

export class Place {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.connected_place = new Array(); //可联通其他地方的id
        this.init_Place_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    init_Place_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名地点';
            this.desc = '未设定地点描述';
        } else {
            this.name = texts[id].place_name;
            this.desc = texts[id].place_desc;
        }
    }
    add_connected_place(...args) {
        for (let id of args) {
            this.connected_place.push(id);
        }
    }
}
export class P_normal extends Place {
    constructor(id) {
        super(id);
        this.type = 'normal';
    }
}
export class P_combat extends Place {
    constructor(id) {
        super(id);
        this.type = 'combat';
    }
}

function add_Place_object(places, newid) {
    if (places[newid] === undefined) {
        places[newid] = new Place(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_normal_Place(places, newid) {
    if (places[newid] === undefined) {
        places[newid] = new P_normal(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_combat_Place(places, newid) {
    if (places[newid] === undefined) {
        places[newid] = new P_combat(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Place_object, add_normal_Place, add_combat_Place };
