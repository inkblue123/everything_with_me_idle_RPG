var skills = new Object();
//技能的类别枚举
const skill_type = Object.freeze({
    //根基技能 basic
    //暂无
    //战斗技能 combat
    Weapon: 'weapon_C', //武器技能
    Stance: 'stance_C', //战斗姿态技能
    Environment: 'environment_C', //环境适应技能
    Enemy: 'enemy_C', //对敌精通技能
    //生活技能 life
    Raw: 'raw_L', //原料获取技能
    Process: 'process_L', //原料加工技能
    Finish: 'finish_L', //成品使用技能
    Recycle: 'recycle_L', //回收利用技能
    //主动技能 active
    // 暂无
    //特殊功法 super
    // 暂无
});

class Skill {
    constructor() {
        this.id = 0; //唯一id
        this.name = '未定义技能'; // 技能名称
        this.description; // 技能描述
        this.max_level; // 最大等级上限
        this.exp_level; // 经验需求量等级
        this.milepost; // 关键等级节点

        this.type = new Array();
        this.leveling_behavior = new Array(); //练级行为
    }
}

// skills[1] = new Skill();
// skills[1].id = 1;
// skills[1].name = '普通木头';
// skills[1].description = '';
// skills[1].maxStack = 3;
// skills[1].type = ['raw_MTR'];

// skills[2] = new Skill();
// skills[2].id = 2;
// skills[2].name = '木剑';
// skills[2].description = '';
// skills[2].maxStack = 1;
// skills[2].type = ['weapon'];

export { skills };
