import { texts } from '../Text/Text.js';

export class Place {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.other_normal_place = new Array(); //可以联通的其他普通地点
        this.other_combat_place = new Array(); //可以联通的其他战斗地点
        this.other_NPC = new Array(); //位于此处的NPC
        this.init_Place_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    init_Place_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名地点';
            this.desc = '未设定地点描述';
        } else {
            if (texts[id].place_name) {
                this.name = texts[id].place_name;
            } else {
                this.name = '未命名地点';
            }
            if (texts[id].place_desc) {
                this.desc = texts[id].place_desc;
            } else {
                this.desc = '未设定地点描述';
            }
        }
    }
    //添加这个地点可以联通的其他普通地点
    add_other_normal_place(...args) {
        for (let id of args) {
            this.other_normal_place.push(id);
        }
    }
    //添加这个地点可以联通的其他战斗地点
    add_other_combat_place(...args) {
        for (let id of args) {
            this.other_combat_place.push(id);
        }
    }
    //添加这个地点存在的NPC
    add_other_NPC(...args) {
        for (let id of args) {
            this.other_NPC.push(id);
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
        this.enemy = new Array();
        this.max_enemy_num = 0;
    }
}
export class P_NPC extends Place {
    constructor(id) {
        super(id);
        this.type = 'NPC';
        this.behaviors = new Array();
    }
    //添加在这个npc面前可以做的行动
    add_behavior_place(...args) {
        for (let id of args) {
            this.behaviors.push(id);
        }
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
function add_NPC_Place(places, newid) {
    if (places[newid] === undefined) {
        places[newid] = new P_NPC(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Place_object, add_normal_Place, add_combat_Place, add_NPC_Place };
