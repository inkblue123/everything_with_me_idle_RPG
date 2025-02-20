import { texts } from '../Text/Text.js';

export class Skill {
    constructor(id) {
        this.id = id; //唯一id
        this.name = '未定义技能'; // 技能名称
        this.desc; // 技能描述
        this.levelup_flag; //是否可以升级标记
        this.base_exp; //第一级需要的经验
        this.max_level; // 最大等级上限
        this.levelup_algorithm; // 经验需求量等级

        this.type; //类型
        this.leveling_behavior = new Array(); //练级行为
        this.init_Skill_name(id);
    }

    //调用文本数据库中的技能名称
    init_Skill_name(id) {
        if (texts[id] == undefined || texts[id].skill_name == undefined) {
            //尚未定义
            this.name = '未命名技能';
        } else {
            this.name = texts[id].skill_name;
        }
    }
    //自动调用技能参数，为每一个槽中的技能生成描述
    init_skill_desc() {
        for (let i = 0; i < this.need_slot_num; i++) {
            //
            let desc;
            let flag = true;
            let active_type = this.active_type[i];
            if (this.active_type[i]) {
                this.create_attack_skill_desc();
                desc = '对';
            } else {
                //缺少必要参数，中止这个槽的描述生成
                desc = '缺少技能类型，无法生成描述';
                flag = false;
            }
            // 对近距离敌人造成一次近战伤害;
            this.desc.push(desc);
        }
    }
    //手动输入参数，为每个槽中的技能生成描述
    set_skill_desc() {}
    create_attack_skill_desc(i) {
        //
    }
    set_skill_levelup_data(base_exp, max_level, algorithm) {
        if (base_exp) this.base_exp = base_exp;
        if (max_level) this.max_level = max_level;
        if (algorithm) this.levelup_algorithm = algorithm;
    }
}
//玩家被动技能
export class P_Passive_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'Passive';
        this.rewards; //常态等级加成
        this.milepost; // 关键等级节点
    }
}
//玩家主动技能
export class P_Active_skill extends Skill {
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
//敌人主动技能
export class E_Active_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'enemy_Active';
        //主动技能
        this.active_type = new Array(); //每个槽激活之后的类型，比如攻击/辅助
        this.base_attr = new Array(); //每个槽使用哪些属性作为基础数值进行计算
        this.algorithm = new Array(); //每个槽使用哪个算法进行计算
        this.start_time = new Array(); //每个槽会在何时激活，比如开始时/结束时/持续激活
    }
}

function add_Skill_object(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new Skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_P_Passive_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new P_Passive_skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_P_Active_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new P_Active_skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_E_Active_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new E_Active_skill(newid);
    } else {
        console.log(`创建places[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export {
    add_Skill_object,
    add_P_Passive_skill,
    add_P_Active_skill,
    add_E_Active_skill, //
};
