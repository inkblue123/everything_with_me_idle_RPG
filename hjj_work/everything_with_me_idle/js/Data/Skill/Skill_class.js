import { texts } from '../Text/Text.js';

export class Skill {
    constructor(id) {
        this.id = id; //唯一id
        this.name = '未定义技能'; // 技能名称
        this.desc; // 技能描述
        this.max_level; // 最大等级上限
        this.exp_need_level; // 经验需求量等级
        this.type; //类型
        this.leveling_behavior = new Array(); //练级行为
        this.init_Skill_name_desc(id);
    }

    //调用文本数据库中的技能名称和描述
    init_Skill_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名技能';
            this.desc = '未设定技能描述';
        } else {
            if (texts[id].Skill_name) {
                this.name = texts[id].Skill_name;
            } else {
                this.name = '未命名技能';
            }
            if (texts[id].Skill_desc) {
                this.desc = texts[id].Skill_desc;
            } else {
                this.desc = '未设定技能描述';
            }
        }
    }
}
export class Passive_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'Passive';
        this.rewards; //常态等级加成
        this.milepost; // 关键等级节点
    }
}

export class Active_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'Active';
        //主动技能
        this.active_condition = new Object(); //激活这个技能需要满足的条件
        this.lock_enemy_type = new Object(); //索敌方式
        this.need_slot_num; //需要几个技能槽
        this.active_type = new Array(); //每个槽激活之后的类型，比如攻击/辅助
        this.base_attr = new Array(); //每个槽使用哪些属性作为基础数值进行计算
        this.algorithm = new Array(); //每个槽使用哪个算法进行计算
        this.start_time = new Array(); //每个槽会在何时激活，比如开始时/结束时/持续激活

        // this.active_effect = new Array(); //激活之后的效果
    }
}

function add_Skill_object(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new Skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Passive_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new Passive_skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_Active_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new Active_skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Skill_object, add_Passive_skill, add_Active_skill };
