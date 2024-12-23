'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { get_EQP_switch } from '../Function/Get_func.js';
import { update_equipment_show } from '../Function/Update_func.js';

import { Player_attributes } from './Player_attributes.js';

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

class Player {
    constructor() {
        //角色属性
        this.attributes = new Player_attributes();
        //背包物品
        this.backpack_items = new Object();
        //穿戴的装备
        this.worn_EQP = new Object();

        this.init();
    }

    init() {
        //初始化玩家属性
        // this.attributes.init();

        //初始化身上穿戴的装备
        for (let i = 0; i < 4; i++) {
            this.worn_EQP[`EQP_column_${i + 1}`] = new Object();
        }
    }
    //给玩家添加num个物品
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
            if (this.backpack_items[id] === undefined) {
                this.backpack_items[id] = new Player_Item(id);
                this.backpack_items[id].num = 0;
            }
            this.backpack_items[id].num += num;
        }
    }
    //为玩家添加武器装备
    Player_get_Equipment(id, num, equip_rarity) {
        if (!equip_rarity) {
            //稀有度参数异常，默认给0稀有度物品
            equip_rarity = 'damaged';
        }
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
    //从玩家背包里去掉武器装备
    Player_lose_Equipment(id, num, equip_rarity) {
        if (!this.check_Equipment(id, equip_rarity)) {
            return 0;
        }
        if (this.backpack_items[id] === undefined) {
            //判断玩家背包有无该物品
            return -1;
        }
        //判断玩家背包里的物品数量是否足够
        if (this.backpack_items[id].num < num) {
            return -2;
        }
        //判断玩家是否有指定稀有度的目标装备
        if (
            this.backpack_items[id].rarity[equip_rarity] === undefined ||
            this.backpack_items[id].rarity[equip_rarity] < num
        ) {
            return -3;
        }

        this.backpack_items[id].rarity[equip_rarity] -= num;
        this.backpack_items[id].num -= num;
        return 1;
    }
    //穿戴一件装备
    worn_Equipment(id, num, equip_rarity) {
        //校验输入的装备
        if (!this.check_Equipment(id, equip_rarity)) {
            return 0;
        }
        let EQP_switct = get_EQP_switch();
        let wearing_position = items[id].wearing_position;
        if (this.worn_EQP[EQP_switct][wearing_position]) {
            //如果身上的目标位置已经穿戴有装备，则将其卸下，放入背包
            let worn_E = this.worn_EQP[EQP_switct][wearing_position];
            let keys = Object.keys(worn_E.rarity);
            let rarity = keys[0];
            this.Player_get_Equipment(worn_E.id, worn_E.num, rarity);
        }
        //将装备放到身上的装备栏里
        this.worn_EQP[EQP_switct][wearing_position] = new Player_Item_E(id);
        this.worn_EQP[EQP_switct][wearing_position].rarity[equip_rarity] = num;
        this.worn_EQP[EQP_switct][wearing_position].num = num;
        //更新装备栏
        update_equipment_show();
    }
    //校验输入的参数是否是合法的装备信息
    check_Equipment(id, equip_rarity) {
        if (items[id] === undefined) {
            //该物品未定义
            console.log('未定义物品：%s', id);
            return false;
        }
        if (items[id].type.includes('equipment')) {
            //稀有度参数校验
            if (items[id].special_flag) {
                if (!types.special_rarity.includes(equip_rarity)) {
                    console.log('稀有度异常，%s不属于特制武器的可能稀有度', equip_rarity);
                    return false;
                }
            } else {
                if (!types.no_special_rarity.includes(equip_rarity)) {
                    console.log('稀有度异常，%s不属于制式武器的可能稀有度', equip_rarity);
                    return false;
                }
            }
            //校验无误，当前输入参数属于正确的装备的参数
            return true;
        } else {
            //该物品不属于装备
            console.log('%s不属于装备', id);
            return false;
        }
    }
}

var player = new Player();

export { player };
