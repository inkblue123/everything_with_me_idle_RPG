'use strict';
import { skills } from '../Data/Skill/Skill.js';
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
            active_slots[i] = new Object();
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
            active_slots[i] = new Object();
        }
    }
    //获取当前拥有的技能槽数量
    get_slot_num() {
        return this.active_slot_num;
    }
    //在第slot_id个主动技能槽的位置开始，摆放skill_id技能
    set_active_skill(skill_id, slot_id) {
        let skill = skills[skill_id];
        let flag = true;
        for (let i = 0; i < skill.need_slot_num; i++) {
            if (!isEmptyObject(this.active_slots[slot_id + i])) {
                flag = false;
            }
        }
        if (flag == false) {
            //主动技能槽已经被占据
            //暂时算作设置失败
            return false;
        }
        //校验通过，可以设置主动技能
        for (let i = 0; i < skill.need_slot_num; i++) {
            active_slots[slot_id + i] = new Player_active_skill(skill_id);
        }
    }
}
