import { is_Empty_Object, is_overlap } from '../Function/Function.js';
import { P_skills } from '../Data/Skill/Skill.js';
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
        this.attack_num = 0; //攻击次数
        this.attack_damage = 0; //攻击伤害
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
    set_combat_leveling_behavior(attack_num, attack_damage) {
        this.leveling_behavior.attack_num += attack_num;
        this.leveling_behavior.attack_damage += attack_damage;
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
            let exp = this.leveling_behavior[exp_source]; //这个技能要加的经验值
            if (exp == undefined || exp == 0) {
                continue;
            }
            P_All_Skills.get_skill_exp(id, this.leveling_behavior[exp_source]);
        }

        this.reset_leveling_behavior();
    }
    //判断当前行为能否为指定技能提供经验
    judge_leveling_behavior(skill_id) {
        let skill_LB = P_skills[skill_id].leveling_behavior;
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
}

var exp_manage = new Exp_manage();

export { exp_manage };
