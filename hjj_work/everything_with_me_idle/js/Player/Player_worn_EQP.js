'use strict';
import { items } from '../Data/Item/Item.js';
import { get_EQP_switch } from '../Function/Get_func.js';
import { isEmptyObject } from '../Function/Function.js';

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
    //穿戴一件装备，默认目标位置没有装备
    worn_Equipment(id, num, equip_rarity) {
        let wearing_position = items[id].wearing_position;
        if (wearing_position.length == 1) {
            //这件装备只能穿戴在指定位置，直接穿戴
            this.worn_Equipment_only_position(wearing_position[0], id, num, equip_rarity);
        } else {
            //这件装备允许穿戴在多个位置，遍历选择一个空位
            this.worn_Equipment_many_position(wearing_position, id, num, equip_rarity);
        }
        return;
    }
    //在指定位置穿戴一件装备
    worn_Equipment_only_position(wp, id, num, equip_rarity) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        //将装备放到身上的装备栏里
        ac_EQP[wp] = new Player_Item_E(id);
        ac_EQP[wp].rarity[equip_rarity] = num;
        ac_EQP[wp].num = num;
    }
    //在多个位置选择空位穿戴一件装备
    worn_Equipment_many_position(wearing_positions, id, num, equip_rarity) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        let worn_flag = false;
        //遍历可穿戴的每个位置
        for (let wp of wearing_positions) {
            let empty_flag = false;
            //判断这件装备可穿戴的位置是否为空
            if (wp == 'main_hand') {
                if (isEmptyObject(ac_EQP['main_hand']) && isEmptyObject(ac_EQP['main_hand_two'])) {
                    empty_flag = true;
                }
            } else if (wp == 'main_hand_two') {
                if (
                    isEmptyObject(ac_EQP['main_hand']) &&
                    isEmptyObject(ac_EQP['main_hand_two']) &&
                    isEmptyObject(ac_EQP['deputy'])
                ) {
                    empty_flag = true;
                }
            } else if (wp == 'deputy') {
                if (isEmptyObject(ac_EQP['main_hand_two']) && isEmptyObject(ac_EQP['deputy'])) {
                    empty_flag = true;
                }
            } else if (!ac_EQP[wp]) {
                empty_flag = true;
            }
            //这个可穿戴位置确实为空，直接穿上
            if (empty_flag) {
                this.worn_Equipment_only_position(wp, id, num, equip_rarity);
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
            this.worn_Equipment_only_position(wp, num, equip_rarity);
        }
    }
    //获取玩家身上指定的装备栏
    get_worn_EQP(EQP_switct) {
        if (!EQP_switct) {
            //如果没指定装备栏，则获取当前激活的装备栏
            EQP_switct = get_EQP_switch();
        }
        return this.worn_EQP[EQP_switct];
    }
    //脱下指定位置的装备，放到raw_worn_E里
    Remove_position_Equipment(wp, raw_worn_E) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        if (ac_EQP[wp]) {
            //如果身上的目标位置已经穿戴有装备，则将其卸下
            raw_worn_E[wp] = JSON.parse(JSON.stringify(ac_EQP[wp]));
            ac_EQP[wp] = {};
        }
        if (wp == 'main_hand') {
            //针对单手武器，可以额外顶下双手武器
            if (!isEmptyObject(ac_EQP['main_hand_two'])) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
        if (wp == 'main_hand_two') {
            //针对双手武器，需要额外卸下两个位置
            if (!isEmptyObject(ac_EQP['main_hand'])) {
                raw_worn_E['main_hand'] = JSON.parse(JSON.stringify(ac_EQP['main_hand']));
                ac_EQP['main_hand'] = {};
            }
            if (!isEmptyObject(ac_EQP['deputy'])) {
                raw_worn_E['deputy'] = JSON.parse(JSON.stringify(ac_EQP['deputy']));
                ac_EQP['deputy'] = {};
            }
        }
        if (wp == 'deputy') {
            //针对副手
            if (!isEmptyObject(ac_EQP['main_hand_two'])) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
    }
    //针对id物品的可穿戴位置，脱下身上即将穿戴的目标位置的原装备
    Remove_worn_Equipment(id, raw_worn_E) {
        let wearing_positions = items[id].wearing_position;
        if (wearing_positions.length == 1) {
            //这件装备只能穿戴在指定位置，如果对应位置有装备则脱下
            this.Remove_position_Equipment(wearing_positions[0], raw_worn_E);
        } else {
            let EQP_switct = get_EQP_switch();
            let ac_EQP = this.worn_EQP[EQP_switct];
            //这件装备允许穿戴在多个位置，遍历寻找空位
            for (let wp of wearing_positions) {
                let empty_flag = false;
                //判断这件装备可穿戴的位置是否为空
                if (wp == 'main_hand') {
                    if (isEmptyObject(ac_EQP['main_hand']) && isEmptyObject(ac_EQP['main_hand_two'])) {
                        empty_flag = true;
                    }
                } else if (wp == 'main_hand_two') {
                    if (
                        isEmptyObject(ac_EQP['main_hand']) &&
                        isEmptyObject(ac_EQP['main_hand_two']) &&
                        isEmptyObject(ac_EQP['deputy'])
                    ) {
                        empty_flag = true;
                    }
                } else if (wp == 'deputy') {
                    if (isEmptyObject(ac_EQP['main_hand_two']) && isEmptyObject(ac_EQP['deputy'])) {
                        empty_flag = true;
                    }
                } else if (!ac_EQP[wp]) {
                    empty_flag = true;
                }
                //存在可穿戴位置，不需要脱下
                if (empty_flag) {
                    return true;
                }
            }
            //每个位置都不空，则脱下第一个位置的装备
            this.Remove_position_Equipment(wearing_positions[0], raw_worn_E);
        }
    }
    //判断当前是否每个防具部位都穿着了装备
    if_all_armor_attacted() {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        if (isEmptyObject(ac_EQP['head'])) return false;
        if (isEmptyObject(ac_EQP['chest'])) return false;
        if (isEmptyObject(ac_EQP['legs'])) return false;
        if (isEmptyObject(ac_EQP['feet'])) return false;
        return true;
    }
}
