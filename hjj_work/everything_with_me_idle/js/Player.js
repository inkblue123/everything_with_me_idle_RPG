'use strict';
import { items } from './Data/Item/Item.js';

class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0; //玩家拥有该物品总数
    }
}
class Player_Item_E extends Player_Item {
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
        this.soul = 10; //魂魄
        this.power = 10; //力量
        this.agile = 10; //敏捷
        this.intelligence = 10; //智力
        this.technique = 10; //技巧
        //背包物品
        this.backpack_items = new Object();
        //穿戴的装备
        this.worn_EQP = new Object();

        this.init();
    }

    init() {
        this.Player_get_item('Oak_logs', 10);
        this.Player_get_item('wood_sword', 1, 'damaged');
        this.Player_get_item('wood_sword', 2, 'ordinary');
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
            if (!equip_rarity) {
                //稀有度参数异常，默认给0稀有度物品
                equip_rarity = 'damaged';
            }
            //为玩家添加武器装备
            this.Player_get_Equipment(id, num, equip_rarity);
        } else {
            if (this.backpack_items[id] === undefined) {
                this.backpack_items[id] = new Player_Item(id);
                this.backpack_items[id].num = 0;
            }
            this.backpack_items[id].num += num;
        }
    }
    Player_get_Equipment(id, num, equip_rarity) {
        if (this.backpack_items[id] === undefined) {
            //判断玩家身上有无该物品，没有就创建
            this.backpack_items[id] = new Player_Item_E(id);
            this.backpack_items[id].rarity[equip_rarity] = 0;
        } else if (this.backpack_items[id].rarity[equip_rarity] === undefined) {
            //判断需要添加的稀有度是否存在，不存在就创建
            this.backpack_items[id].rarity[equip_rarity] = 0;
        }

        this.backpack_items[id].rarity[equip_rarity] += num;
        this.backpack_items[id].num += num;
    }
}

var player = new Player();

export { player };
