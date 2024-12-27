'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { get_EQP_switch } from '../Function/Get_func.js';
import { update_equipment_show } from '../Function/Update_func.js';

class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0; //玩家拥有该物品总数
    }
}
class Player_Item_E extends Player_Item {
    constructor(id) {
        super(id);
        this.rarity = new Object(); //稀有度
    }
}

export class Player_worn {
    constructor() {
        this.worn_EQP = new Object();
    }

    init() {
        //初始化身上穿戴的装备
        for (let i = 0; i < 4; i++) {
            this.worn_EQP[`EQP_column_${i + 1}`] = new Object();
        }
    }
    //穿戴一件装备
    worn_Equipment(id, num, equip_rarity, raw_worn_E) {
        let wearing_position = items[id].wearing_position;
        if (wearing_position.length == 1) {
            //这件装备只能穿戴在指定位置，直接穿戴
            this.worn_Equipment_only_position(wearing_position[0], id, num, equip_rarity, raw_worn_E);
        } else {
            //这件装备允许穿戴在多个位置，遍历选择一个空位
            this.worn_Equipment_only_position(wearing_position, id, num, equip_rarity, raw_worn_E);
        }
        return;
    }
    worn_Equipment_only_position(wp, id, num, equip_rarity, raw_worn_E) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        if (ac_EQP[wp]) {
            //如果身上的目标位置已经穿戴有装备，则将其卸下
            // raw_worn_E[wp] = ac_EQP[wp];
            raw_worn_E[wp] = JSON.parse(JSON.stringify(ac_EQP[wp]));
            ac_EQP[wp] = {};
        }
        if (wp == 'main_hand') {
            //针对单手武器，可以顶下双手武器
            if (ac_EQP['main_hand_two']) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
        if (wp == 'main_hand_two') {
            //针对双手武器，需要额外卸下两个位置
            if (ac_EQP['main_hand']) {
                raw_worn_E['main_hand'] = JSON.parse(JSON.stringify(ac_EQP['main_hand']));
                ac_EQP['main_hand'] = {};
            }
            if (ac_EQP['deputy']) {
                raw_worn_E['deputy'] = JSON.parse(JSON.stringify(ac_EQP['deputy']));
                ac_EQP['deputy'] = {};
            }
        }
        if (wp == 'deputy') {
            //针对副手
            if (ac_EQP['main_hand_two']) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
        //将装备放到身上的装备栏里
        ac_EQP[wp] = new Player_Item_E(id);
        ac_EQP[wp].rarity[equip_rarity] = num;
        ac_EQP[wp].num = num;
    }
    worn_Equipment_many_position(wearing_positions, id, num, equip_rarity, raw_worn_E) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        let worn_flag = false;
        //遍历可穿戴的每个位置
        for (let wp of wearing_positions) {
            let empty_flag = false;
            //判断这件装备可穿戴的位置是否为空
            if (wp == 'main_hand') {
                if (!ac_EQP['main_hand'] && !ac_EQP['main_hand_two']) {
                    empty_flag = true;
                }
            } else if (wp == 'main_hand_two') {
                if (!ac_EQP['main_hand'] && !ac_EQP['main_hand_two'] && !ac_EQP['deputy']) {
                    empty_flag = true;
                }
            } else if (wp == 'deputy') {
                if (!ac_EQP['main_hand_two'] && !ac_EQP['deputy']) {
                    empty_flag = true;
                }
            } else if (!ac_EQP[wp]) {
                empty_flag = true;
            }
            //这个可穿戴位置确实为空，直接穿上
            if (empty_flag) {
                this.worn_Equipment_only_position(wp, num, equip_rarity, raw_worn_E);
                worn_flag = true;
                break;
            }
        }

        if (worn_flag) {
            //找到了空位，穿戴成功
            return true;
        } else {
            //每个位置都不空，则穿戴在第一个位置
            let wp = wearing_positions[0];
            this.worn_Equipment_only_position(wp, num, equip_rarity, raw_worn_E);
        }
    }

    get_worn_EQP(EQP_switct) {
        if (!EQP_switct) {
            //如果没指定装备栏，则获取当前激活的装备栏
            EQP_switct = get_EQP_switch();
        }
        return this.worn_EQP[EQP_switct];
    }
}
