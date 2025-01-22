import { texts } from '../Text/Text.js';

export class Enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //地点名称
        this.desc; //地点描述
        this.type; //地点类型
        this.attack_attr = new Object(); //攻击属性
        this.defense_attr = new Object(); //防御属性
        this.survival_attr = new Object(); //生存属性

        this.init_Place_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    init_Enemy_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名地点';
            this.desc = '未设定地点描述';
        } else {
            this.name = texts[id].place_name;
            this.desc = texts[id].place_desc;
        }
    }
    init_attack_attr(attack, precision, critical_chance, critical_damage, attack_speed) {
        this.attack_attr['attack'] = attack; //攻击力
        this.attack_attr['precision'] = precision; //精准
        this.attack_attr['critical_chance'] = critical_chance; //暴击率，百分制，具体计算时会除以100
        this.attack_attr['critical_damage'] = critical_damage; //暴击伤害，百分制，具体计算时会除以100
        this.attack_attr['attack_speed'] = attack_speed; //攻速
    }
    init_defense_attr(defense, evade, resistance_point, move_speed) {
        this.defense_attr['defense'] = defense; //防御
        this.defense_attr['evade'] = evade; //闪避
        this.defense_attr['resistance_point'] = resistance_point; //抵抗力
        this.defense_attr['move_speed'] = move_speed; //移动速度
    }
    init_survival_attr(health_max, magic_max, energy_max) {
        this.survival_attr['health_max'] = health_max; //最大血量上限
        this.survival_attr['magic_max'] = magic_max; //最大魔力上限
        this.survival_attr['energy_max'] = energy_max; //最大精力上限
    }
}
// export class P_normal extends Place {
//     constructor(id) {
//         super(id);
//         this.type = 'normal';
//     }
// }
// export class P_combat extends Place {
//     constructor(id) {
//         super(id);
//         this.type = 'combat';
//     }
// }
function add_Enemy_object(enemys, newid) {
    if (enemys[newid] === undefined) {
        enemys[newid] = new Enemy(newid);
    } else {
        console.log(`创建enemys[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_normal_Place(enemys, newid) {
    if (enemys[newid] === undefined) {
        // enemys[newid] = new P_normal(newid);
    } else {
        console.log(`创建enemys[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Enemy_object, add_normal_Place };
