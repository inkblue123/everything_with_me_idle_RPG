'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { check_Equipment, isEmptyObject } from '../Function/Function.js';
import { updata_equipment_show } from '../Function/Updata_func.js';

import { Player_attributes } from './Player_attributes.js';
import { Player_backpack } from './Player_backpack.js';
import { Player_worn } from './Player_worn_EQP.js';

class Player {
    constructor() {
        //角色属性
        this.attributes = new Player_attributes();
        //背包物品
        this.backpack_items = new Player_backpack();
        //穿戴的装备
        this.worn_EQP = new Player_worn();

        this.init();
    }

    init() {
        //初始化玩家属性
        this.attributes.init();
        //初始化身上穿戴的装备
        this.worn_EQP.init();
    }
    get_player_attributes() {
        return this.attributes;
    }
    get_player_backpack_items() {
        return this.backpack_items;
    }
    get_player_worn_EQP() {
        return this.worn_EQP;
    }

    //给玩家背包添加物品，js版函数重载
    Player_get_item(...args) {
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            let id = args[0].id;
            let num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            let equip_rarity = keys[0];
            this.backpack_items.Player_get_item(id, num, equip_rarity);
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            this.backpack_items.Player_get_item(args[0], args[1], args[2]);
        }
    }
    //从玩家背包里去掉武器装备
    Player_lose_Equipment(...args) {
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            let id = args[0].id;
            let num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            let equip_rarity = keys[0];
            this.backpack_items.Player_lose_Equipment(id, num, equip_rarity);
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            this.backpack_items.Player_lose_Equipment(args[0], args[1], args[2]);
        }
    }

    //穿戴一件装备
    worn_Equipment(id, num, equip_rarity) {
        //校验装备参数是否合法
        if (!check_Equipment(id, equip_rarity)) {
            return 0;
        }
        //脱下身上即将穿戴的目标位置的原装备
        let raw_worn_E = new Object();
        this.worn_EQP.Remove_worn_Equipment(id, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!isEmptyObject(raw_worn_E[key])) this.Player_get_item(raw_worn_E[key]);
        }

        //将装备放到身上装备栏里对应的位置
        this.worn_EQP.worn_Equipment(id, num, equip_rarity);
        //更新玩家属性
        this.updata_attr();
    }
    //脱掉一件装备
    remove_worn_Equipment(wp) {
        //脱下身上指定位置的装备
        let raw_worn_E = new Object();
        this.worn_EQP.Remove_position_Equipment(wp, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!isEmptyObject(raw_worn_E[key])) this.Player_get_item(raw_worn_E[key]);
        }
        this.updata_attr();
    }
    //根据玩家当前的加成更新属性
    updata_attr() {
        //获取当前穿戴的装备
        let worn_EQP = this.worn_EQP.get_worn_EQP();
        //更新装备的属性加成
        this.attributes.Summary_worn_EQP_attr(worn_EQP);
        //获取当前拥有的技能
        //更新技能的加成

        this.attributes.updata_end_attr();
    }
}

var player = new Player();

export { player };
