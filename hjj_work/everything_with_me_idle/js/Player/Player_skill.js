'use strict';
import { items } from '../Data/Item/Item.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { skill_levelup_exp_algorithm } from '../Function/math_func.js';

//玩家拥有的技能
class Player_skill {
    constructor(id) {
        this.id = id; //唯一id
        this.exp = 0; //当前技能经验
        this.level = 0; //当前等级
        this.next_level_need_exp = 0; //升到下一级需要的经验
        this.levelup_flag; //当前技能能否通过经验升级标记
        this.levelmax_flag; //当前技能满级标记
    }
    init() {
        if (P_skills[this.id].levelup_flag) {
            //该技能可以升级，初始化经验相关
            this.next_level_need_exp = P_skills[this.id].base_exp; //升到下一级需要的经验
        } else {
            //该技能不可通过累计经验升级，只能直接给予等级
        }
        this.levelmax_flag = false;
        this.levelup_flag = P_skills[this.id].levelup_flag;
    }
}
//玩家拥有的主动技能
class Player_A_skill extends Player_skill {
    constructor(id) {
        super(id);
    }
}
//玩家拥有的被动技能
class Player_P_skill extends Player_skill {
    constructor(id) {
        super(id);
    }
}

export class Player_skills {
    constructor() {}
    //为玩家解锁某个技能
    player_unlock_skill(id) {
        if (P_skills[id] === undefined) {
            //该技能不在数据库中
            console.log('player_unlock_skill:未定义技能：%s', id);
            return;
        }
        if (P_skills[id].type == 'Passive') {
            //被动技能
            if (this[id]) {
                //该被动技能已拥有，不重复解锁
                return;
            } else {
                //新的被动技能
                this[id] = new Player_P_skill(id);
            }
        } else if (P_skills[id].type == 'Active') {
            //主动技能
            if (this[id]) {
                //判断这次解锁是通过什么方式解锁的，以解锁原有技能的对应内容
                //该主动技能已拥有，不重复解锁
                return;
            } else {
                //新的主动技能
                this[id] = new Player_A_skill(id);
            }
        }
    }
    //给技能增加一定的经验
    get_skill_exp(id, exp) {
        if (!this[id]) {
            //玩家没有该技能，将其初始化出来
            this.player_unlock_skill(id);
        }
        if (this[id].levelmax_flag) {
            //该技能满级了，不加经验
            return true;
        } else {
            this[id].exp += exp;
            if (this[id].exp >= this[id].next_level_need_exp) {
                this.skill_levelup(id);
            }
        }
    }
    //给指定技能提升等级
    skill_levelup(id) {
        //玩家没有该技能
        if (!this[id]) {
            this.player_unlock_skill(id);
        }
        //该技能满级了，不再升级
        if (this[id].levelmax_flag) {
            return true;
        }
        if (this[id].levelup_flag) {
            //该技能不能通过累计经验升级，在这里直接给予等级
            this[id].level++;
        } else {
            //结算该技能的经验来提升等级
            while (this[id].exp >= this[id].next_level_need_exp) {
                this[id].exp -= this[id].next_level_need_exp;
                this[id].level++;
                if (this[id].level >= P_skills[id].max_level) {
                    break;
                } else {
                    let algorithm = P_skills[id].levelup_algorithm;
                    let base_exp = P_skills[id].base_exp;
                    let now_level = this[id].level;
                    this[id].next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, now_level);
                }
            }
        }
        if (this[id].level >= P_skills[id].max_level) {
            //技能满级了
            this[id].levelmax_flag = true;
            this[id].level = P_skills[id].max_level;
        }
    }
    //获取玩家拥有的指定技能
    get_skills() {}
}
