'use strict';
import { items } from '../Data/Item/Item.js';
import { isEmptyObject } from '../Function/Function.js';
import { get_object_only_key } from '../Function/Get_func.js';

const MAX_slot_num = 9;
const MIN_slot_num = 3;

class Player_active_skill {
    constructor(id = 0) {
        this.id = id; //唯一id
    }
}

export class Player_active_skills_Manage {
    constructor() {
        this.active_slot_num; //主动技能槽数量
        this.active_slots = new Object(); //主动技能槽内容
    }
    //初始化主动技能槽
    init(slot_num = 3) {
        if (slot_num < MIN_slot_num || slot_num > MAX_slot_num) {
            //错误的槽数量，强制重置成3
            slot_num = 3;
        }
        this.active_slot_num = slot_num;
        this.active_slots = new Object(); //主动技能槽内容

        for (let i; i < slot_num; i++) {
            active_slots[i] = new Player_active_skill();
        }
    }
    //新增一个槽位
    add_slot() {
        if (slot_num == MAX_slot_num) {
            //已经达到最大，不操作
            return;
        }
        slot_num++;
        active_slots[slot_num - 1] = new Player_active_skill();
    }
    //清空所有主动技能槽
    delete_all_slots() {
        //清空原本内容
        this.active_slots = new Object();
        for (let i; i < slot_num; i++) {
            active_slots[i] = new Player_active_skill();
        }
    }
}
