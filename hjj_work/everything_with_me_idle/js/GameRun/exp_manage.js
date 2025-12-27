import { is_Empty_Object, is_overlap } from '../Function/Function.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from './global_manage.js';
import { player } from '../Player/Player.js';

export class Attack_effect {
    constructor() {
        this.id;
        this.lock_enemy_type = new Object(); //索敌逻辑

        this.attack_num = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
        this.precision = 0; //精准
        this.critical_chance = 0; //暴击率
        this.critical_damage = 0; //暴击伤害
    }
}
//当前帧的练级行为汇总
export class Leveling_Behavior {
    constructor() {
        //可以随时获取的参数
        this.behavior = 'NULL'; //当前行为
        this.weapon_type = 'NULL'; //手持武器详细类型
        // this.enemy_type = new Object();//攻击的敌人类型
        // this.combat_place_type = new Object();//战斗场地类型
        // this.armor_flag = [0,0,0,0,0];//护甲穿着标记
        //战斗中即时获取的参数
        this.combat_behavior = new Object();
        //伐木过程中发生的行为的参数
        this.logging_behavior = new Object();
        //钓鱼过程中发生的行为的参数
        this.fishing_behavior = new Object();
        //挖矿过程中发生的行为的参数
        this.mining_behavior = new Object();
        //采集过程中发生的行为的参数
        this.foraging_behavior = new Object();
    }
}

//技能经验管理类
export class Exp_manage {
    constructor() {
        this.leveling_behavior = new Leveling_Behavior(); //一帧里的练级数据
        this.Active_skill_exp = new Object(); //玩家主动技能获得的经验
        this.Passive_skill_exp = new Object(); //玩家被动技能获得的经验
    }
    //记录指定主动技能应该获得的经验
    set_Active_skill_exp(id, damage) {
        if (is_Empty_Object(P_skills[id])) {
            console.log('%s主动技能未定义，不能获得经验');
            return;
        }
        //这个主动技能不能通过累计经验升级
        if (P_skills[id].levelup_type == 'unlevelup') {
            return;
        }
        if (is_Empty_Object(this.Active_skill_exp[id])) {
            this.Active_skill_exp[id] = 0;
        }
        this.Active_skill_exp[id] += damage;
    }
    //记录战斗时发生的练级行为
    set_combat_leveling_behavior(combat_behavior) {
        for (let id in combat_behavior) {
            if (is_Empty_Object(this.leveling_behavior.combat_behavior[id])) {
                this.leveling_behavior.combat_behavior[id] = 0;
            }
            this.leveling_behavior.combat_behavior[id] += combat_behavior[id];
        }
    }
    //记录生活技能中发生的练级行为
    set_live_plan_skill_leveling_behavior(skill_type, behavior) {
        //寻找指定生活技能的存储数据结构
        const methodName = skill_type + '_behavior';
        let leveling_behavior = this.leveling_behavior[methodName];
        if (leveling_behavior === undefined) {
            console.log('记录%s技能的经验时未定义对应技能的存储数据结构', skill_type);
            return;
        }
        //记录练级行为以及对应的数据
        for (let id in behavior) {
            if (is_Empty_Object(leveling_behavior[id])) {
                leveling_behavior[id] = 0;
            }
            leveling_behavior[id] += behavior[id];
        }
    }
    //记录其他练级行为
    set_leveling_behavior() {
        //当前行为，如战斗，伐木，钓鱼等等
        this.leveling_behavior.behavior = global.get_flag('GS_game_statu');
        //手持武器详细类型
        let P_attr = player.get_player_attributes();
        this.leveling_behavior.weapon_type = P_attr.get_data_attr('weapon_type');
    }
    //重置练级行为
    reset_leveling_behavior() {
        this.leveling_behavior = new Leveling_Behavior(); //一帧里的练级数据
        this.Active_skill_exp = new Object(); //玩家主动技能获得的经验
        this.Passive_skill_exp = new Object(); //玩家被动技能获得的经验
    }

    //结算玩家应该获得的技能经验
    player_get_exp() {
        let P_All_Skills = player.get_player_All_Skills();
        //主动技能获得经验
        for (let id in this.Active_skill_exp) {
            P_All_Skills.get_skill_exp(id, this.Active_skill_exp[id]);
        }

        let P_All_P_Skills = player.get_player_All_passive_skills();
        //被动技能获得经验
        for (let id in P_All_P_Skills) {
            //满级和不能获得经验的技能跳过
            if (P_All_P_Skills[id].levelup_type == 'unlevelup' || P_All_P_Skills[id].levelmax_flag) {
                continue;
            }
            //升级行为和当前玩家所进行的行为不符合的跳过
            if (!this.judge_leveling_behavior(id)) {
                continue;
            }
            //遍历找到可以获得经验的技能
            let exp_source = P_skills[id].exp_source; //这个技能加经验的依据
            let exp = this.get_exp_source(exp_source); //从练级行为中寻找指定依据的数值
            if (exp == undefined || exp == 0) {
                continue;
            }
            P_All_Skills.get_skill_exp(id, exp);
        }

        this.reset_leveling_behavior();
    }
    //判断当前行为能否为指定技能提供经验
    judge_leveling_behavior(skill_id) {
        let skill_LB = P_skills[skill_id].leveling_behavior;
        if (is_Empty_Object(skill_LB)) {
            //技能没有规定什么行为下可以加经验，判定为任何情况下都不加经验
            return false;
        }
        let P_LB = this.leveling_behavior;
        for (let type in skill_LB) {
            if (type == 'behavior') {
                //行为判断
                if (P_LB[type] != skill_LB[type]) {
                    return false;
                }
            }
            if (type == 'weapon_type') {
                //武器类型判断
                //玩家手持的武器类型和技能升级要求的类型是否有重叠
                if (!is_overlap(P_LB[type], skill_LB[type])) {
                    return false;
                }
            }
        }
        return true;
    }
    //从玩家行为中寻找指定经验依据的数值
    get_exp_source(exp_source) {
        if (enums['exp_source_for_Leveling_Behavior'][exp_source] === undefined) {
            console.log('%s经验依据没有定义它归属于哪种升级行为', exp_source);
            return 0;
        }
        let son_behavior = enums['exp_source_for_Leveling_Behavior'][exp_source];
        if (is_Empty_Object(this.leveling_behavior[son_behavior])) {
            //子行为结构体是空的，正常情况，返回0
            return 0;
        }
        if (is_Empty_Object(this.leveling_behavior[son_behavior][exp_source])) {
            //子行为结构体中指定经验依据是空的，正常情况，返回0
            return 0;
        }

        return this.leveling_behavior[son_behavior][exp_source];
    }
}

var exp_manage = new Exp_manage();

export { exp_manage };
