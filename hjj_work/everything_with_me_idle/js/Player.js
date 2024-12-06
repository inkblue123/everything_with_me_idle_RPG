'use strict';

class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0;
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
    }

    init() {}

    Player_get_item(id, num) {
        //判断玩家身上有无该物品，没有就创建，有就添加数量
        if (typeof this.backpack_items[id] == 'undefined') {
            this.backpack_items[id] = new Player_Item(id);
        }
        this.backpack_items[id].num += num;

        //测试
        let arr = Object.keys(this.backpack_items); //将拥有的物品的key转换成一个数组
        console.log('玩家此时拥有%d种物品', arr.length);
        for (let play_item_id of arr) {
            console.log('玩家拥有%d号物品%d个', play_item_id, this.backpack_items[play_item_id].num);
        }
    }
}

var player = new Player();

export { player };
