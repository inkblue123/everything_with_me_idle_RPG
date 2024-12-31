'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { get_EQP_switch } from '../Function/Get_func.js';
import { check_Equipment } from '../Function/Function.js';
import { updata_equipment_show } from '../Function/Updata_func.js';

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
        this.rarity = new Object(); //稀有度
    }
}

export class Player_backpack {
    constructor() {}

    //给玩家背包添加物品
    Player_get_item(id, num, equip_rarity) {
        if (items[id] === undefined) {
            //添加的物品不在数据库中
            console.log('未定义物品：%s', id);
            return;
        }
        //要添加的物品如果是武器装备，则必须要有稀有度，否则给予0稀有度物品
        //为玩家添加武器装备
        if (items[id].type.includes('equipment')) {
            this.Player_get_Equipment(id, num, equip_rarity);
        } else {
            if (this[id] === undefined) {
                this[id] = new Player_Item(id);
                this[id].num = 0;
            }
            this[id].num += num;
        }
    }

    //为玩家添加武器装备
    Player_get_Equipment(id, num, equip_rarity) {
        if (!equip_rarity) {
            //稀有度参数异常，默认给0稀有度物品
            equip_rarity = 'damaged';
        }
        if (this[id] === undefined) {
            //判断玩家身上有无该物品，没有就创建
            this[id] = new Player_Item_E(id);
            this[id].rarity[equip_rarity] = 0;
        } else if (this[id].rarity[equip_rarity] === undefined) {
            //判断需要添加的稀有度是否存在，不存在就创建
            this[id].rarity[equip_rarity] = 0;
        }

        this[id].rarity[equip_rarity] += num;
        this[id].num += num;
    }

    //从玩家背包里去掉武器装备
    Player_lose_Equipment(id, num, equip_rarity) {
        if (!check_Equipment(id, equip_rarity)) {
            return 0;
        }
        if (this[id] === undefined) {
            //判断玩家背包有无该物品
            return -1;
        }
        //判断玩家背包里的物品数量是否足够
        if (this[id].num < num) {
            return -2;
        }
        //判断玩家是否有指定稀有度的目标装备
        if (this[id].rarity[equip_rarity] === undefined || this[id].rarity[equip_rarity] < num) {
            return -3;
        }

        this[id].rarity[equip_rarity] -= num;
        this[id].num -= num;
        return 1;
    }
}
