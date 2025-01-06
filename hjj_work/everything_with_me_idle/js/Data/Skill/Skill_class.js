export class Skill {
    constructor(id) {
        this.id = id; //唯一id
        this.name = '未定义技能'; // 技能名称
        this.description; // 技能描述
        this.max_level; // 最大等级上限
        this.exp_need_level; // 经验需求量等级
        this.type = new Array(); //类型
        this.leveling_behavior = new Array(); //练级行为

        //主动技能
        // this.active_type; //激活之后的类型，比如攻击/辅助
        // this.base_attr; //基于哪些属性进行计算
        // this.active_effect; //激活之后的效果
        // this.active_condition; //激活这个技能需要满足的条件
    }
}
