import { texts } from '../Text/Text.js';
import { is_Empty_Object } from '../../Function/Function.js';

export class Skill {
    constructor(id) {
        this.id = id; //唯一id
        this.name = '未定义技能'; // 技能名称
        this.desc = new Array(); // 技能描述
        this.levelup_type; //升级类型
        this.max_level = 1; //最大等级
        this.levelup_data = new Array(); //多个等级上限

        this.type; //大类型，主动技能或被动技能
        this.leveling_behavior = new Object(); //练级行为
        this.init_skill_name(id);
        this.init_skill_desc(id);
    }

    //调用文本数据库中的技能名称
    init_skill_name(id) {
        if (texts[id] == undefined || texts[id].skill_name == undefined) {
            //尚未定义
            this.name = '未命名技能';
        } else {
            this.name = texts[id].skill_name;
        }
    }

    //调用文本数据库中的技能描述
    init_skill_desc(id) {
        if (texts[id] == undefined || texts[id].skill_desc == undefined) {
            //尚未定义
            this.desc = '未定义技能描述';
        } else {
            this.desc = texts[id].skill_desc;
        }
    }
    //设置一个等级阶段
    set_levelup_data(base_exp, start_level, max_level, algorithm, exp_decay, unluck_flag) {
        let obj = new Object();
        obj.base_exp = base_exp; //第一级需要的经验
        obj.start_level = start_level; //该等级阶段的初始等级
        obj.max_level = max_level; //该等级阶段的等级上限
        obj.algorithm = algorithm; //经验需求量算法
        obj.exp_decay = exp_decay; //经验衰减
        obj.unluck_flag = unluck_flag; //解锁这段等级上限的条件
        this.levelup_data.push(obj);
    }

    //添加什么情况下会获得经验
    add_leveling_behavior(type, ...value) {
        if (type == 'behavior') {
            //有些行为可以直接赋值，
            this.leveling_behavior[type] = value[0];
        }
        if (type == 'weapon_type') {
            //有些行为添加的是一个范围，要转义成具体的值
            this.leveling_behavior[type] = value;
        }
    }
}
//玩家被动技能
export class P_Passive_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'Passive';
        this.switch_type; //这个技能用于过滤时的类型，比如加成战斗的，加成生活的，武器精通类、使用道具类等等
        this.initial_flag; //是否属于玩家初始技能
        this.rewards = new Array(); //常态等级加成
        this.milepost = new Object(); // 关键等级节点
    }
    //设置一条常态等级加成属性
    add_rewards(attr_name, algorithm) {
        let obj = new Object();
        obj.attr = attr_name; //属性名
        obj.algorithm = algorithm; //常态等级加成算法
        this.rewards.push(obj);
    }
    //在指定的关键等级节点队列里添加一个属性
    add_milepost(level, attr_name, data) {
        if (is_Empty_Object(this.milepost[level])) {
            this.milepost[level] = new Array();
        }
        let obj = new Object();
        obj.attr = attr_name; //属性名
        obj.data = data; //属性数值
        this.milepost[level].push(obj);
    }
}
//玩家主动技能
export class P_Active_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'Active';
        //主动技能
        this.need_slot_num; //需要几个技能槽
        this.active_condition = new Object(); //激活这个技能需要满足的条件
        //由于玩家主动技能实际上是由多个基础技能拼接起来的，使用类型时用的是基础技能的类型，这里的类型实际上并没有用
        this.active_type; //这个技能的类型，比如攻击/辅助，
        this.attr_correct = new Object(); //这个技能的属性补正
        this.algorithm; //这个技能的属性计算算法
        this.start_time; //这个技能的激活时间点，比如开始时/结束时/持续激活
        this.effect = new Object(); //这个技能激活之后具体产生的效果
    }
    //自动调用技能参数，生成技能描述
    set_skill_desc() {
        //
        let desc;
        if (this.active_type == 'attack') {
            desc = this.create_attack_skill_desc();
        } else if (this.active_type == 'defense') {
            desc = this.create_defense_skill_desc();
        } else {
            //缺少必要参数，中止这个槽的描述生成
            desc = '缺少技能类型，无法生成描述';
        }
        this.desc = desc;
    }
    //创造攻击型技能的描述
    create_attack_skill_desc() {
        //对{距离}的{索敌方式}个敌人造成{攻击次数}次{伤害类型}伤害
        let desc = '对';
        //距离
        //没有开发距离设定

        //索敌方式
        let lock_enemy_type = this.effect.lock_enemy_type;
        if (is_Empty_Object(lock_enemy_type)) {
            desc = '缺少索敌方式，无法生成描述';
            return desc;
        }
        let distance = lock_enemy_type.distance;
        desc = desc + texts['lock_enemy_distance'].skill_desc[distance] + '的';
        let num = lock_enemy_type.num;
        desc = desc + num + '个敌人';

        //攻击次数
        let attack_num = this.effect.attack_num;
        if (is_Empty_Object(attack_num)) {
            desc = '缺少攻击次数，无法生成描述';
            return desc;
        }
        if (attack_num.type == 'fixed') {
            desc = desc + '固定造成' + attack_num.num + '次';
        } else if (attack_num.type == 'add') {
            desc = desc + '造成' + attack_num.num + '次';
        }
        //伤害类型
        let damage_type = this.effect.damage_type;
        if (is_Empty_Object(damage_type)) {
            desc = '缺少伤害类型，无法生成描述';
            return desc;
        }
        desc = desc + texts['damage_type'].skill_desc[damage_type] + '伤害';
        return desc;
    }
    //创造防御型技能的描述
    create_defense_skill_desc() {
        //受到敌人攻击时减少{减伤类型}的伤害
        let desc = '受到敌人攻击时减少';

        //减伤类型
        let defense_type = this.effect.defense_type;
        if (defense_type == 'damage_reduction') {
            //固定数值伤害减免
            desc = desc + '固定数值的伤害';
        } else if (defense_type == 'damage_reduction_ratio') {
            //固定数值伤害减免
            desc = desc + '一定比例的伤害';
        }
        return desc;
    }
}
//敌人主动技能
export class E_Active_skill extends Skill {
    constructor(id) {
        super(id);
        this.type = 'enemy_Active';
        //主动技能
        this.active_type = new Array(); //每个槽激活之后的类型，比如攻击/辅助
        this.attr_correct = new Array(); //每个槽使用哪些属性作为基础数值进行计算
        this.algorithm = new Array(); //每个槽使用哪个算法进行计算
        this.start_time = new Array(); //每个槽会在何时激活，比如开始时/结束时/持续激活
    }
}

function add_Skill_object(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new Skill(newid);
    } else {
        console.log(`创建skills[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_P_Passive_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new P_Passive_skill(newid);
    } else {
        console.log(`创建skills[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_P_Active_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new P_Active_skill(newid);
    } else {
        console.log(`创建skills[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
function add_E_Active_skill(skills, newid) {
    if (skills[newid] === undefined) {
        skills[newid] = new E_Active_skill(newid);
    } else {
        console.log(`创建skills[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export {
    add_Skill_object,
    add_P_Passive_skill,
    add_P_Active_skill,
    add_E_Active_skill, //
};
