'use strict';
import { items } from './Data/Item.js';

class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0; //玩家拥有该物品总数
    }
}
class Player_Equipment extends Player_Item {
    constructor(id) {
        super(id);
        //针对武器装备，当前物品的稀有度
        this.rarity = new Object(); //稀有度，只限定在0-5之内
    }
}

class Player {
    constructor() {
        this.name = '我'; //角色名称
        //战斗最终属性
        this.health_max = 100; //最大血量上限
        this.health_point = 100; //当前血量
        this.magic_max = 100; //最大魔力上限
        this.magic_point = 100; //当前魔力
        this.energy_max = 100; //最大精力上限
        this.energy_point = 100; //当前精力

        this.attack = 10; //攻击力
        this.precision = 10; //精准
        this.critical_chance = 1; //暴击率，百分制，具体计算时会除以100
        this.critical_damage = 150; //暴击伤害，百分制，具体计算时会除以100
        this.attack_speed = 1; //攻击速度
        this.defense = 10; //防御
        this.evade = 10; //闪避
        this.resistance_point = 10; //抵抗力
        this.move_speed = 10; //移动速度
        //角色固有属性
        this.physique = 10; //体格
        this.Meridians = 10; //经脉
        this.power = 10; //力量
        this.agile = 10; //敏捷
        this.technique = 10; //技巧
        this.intelligence = 10; //智力
        this.soul = 10; //魂魄

        this.backpack_items = new Object();
        this.init();
        // this.backpack_items['Oak_logs'] = new Player_Item('Oak_logs');
        // this.backpack_items['Oak_logs'].num = 10;
        // this.backpack_items['wood_sword'] = new Player_Item('wood_sword');
        // this.backpack_items['wood_sword'].num = 2;
    }

    init() {
        this.Player_get_item('Oak_logs', 10);
        this.Player_get_item('wood_sword', 2, 0);
    }
    //给玩家添加num个物品
    Player_get_item(id, num, equip_rarity) {
        if (items[id] === undefined) {
            //添加的物品不在数据库中
            console.log('未定义物品：%s', id);
            return;
        }
        //要添加的物品如果是武器装备，则必须要有稀有度，否则给予0稀有度物品
        if (items[id].type.includes('equipment')) {
            if (typeof equip_rarity != 'number' || equip_rarity > 5) {
                //稀有度参数异常，默认给0稀有度物品
                equip_rarity = 0;
            }
        }
        if (this.backpack_items[id] === undefined) {
            //判断玩家身上有无该物品，没有就创建，有就添加数量
            if (items[id].type.includes('equipment')) {
                this.backpack_items[id] = new Player_Equipment(id);
                this.backpack_items[id].rarity[equip_rarity] = num;
                this.backpack_items[id].num = num;
            } else {
                this.backpack_items[id] = new Player_Item(id);
                this.backpack_items[id].num = num;
            }
        } else {
            if (items[id].type.includes('equipment')) {
                this.backpack_items[id].rarity[equip_rarity] += num;
                this.backpack_items[id].num += num;
            } else {
                this.backpack_items[id].num += num;
            }
        }
    }
}

var player = new Player();

export { player };
