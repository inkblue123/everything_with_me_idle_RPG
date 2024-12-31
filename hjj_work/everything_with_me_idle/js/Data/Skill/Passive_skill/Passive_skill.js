import { Skill } from '..Skill_class.js';

//被动技能通用属性
class Passive_skill extends Skill {
    constructor(id) {
        super(id);
        //被动技能
        this.rewards; //常态等级加成
        this.milepost; // 关键等级节点
    }
}

//初始化技能数据库中与被动技能相关的内容
function init_Passive_skill(skills) {
    //普通剑术
    skills['normal_sword'] = new Passive_skill('normal_sword');
}

export { init_Passive_skill };
