'use strict';
import { items } from '../Data/Item/Item.js';
import { P_skills } from '../Data/Skill/Skill.js';
import {} from '../Function/Function.js';

//玩家拥有的技能
class Player_skill {
    constructor(id) {
        this.id = id; //唯一id
        this.exp = 0; //当前技能经验
        this.level = 0; //当前等级
        this.next_level_need_exp = 0; //下一级需要的经验
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
    constructor() {
        //
    }
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
            //玩家没有该技能，不处理
            return;
        }
        this[id].exp += exp;
    }
}
