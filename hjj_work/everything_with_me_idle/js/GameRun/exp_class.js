import { global } from './global_class.js';
import { player } from '../Player/Player.js';
import { is_Empty_Object } from '../Function/Function.js';
import { P_skills } from '../Data/Skill/Skill.js';

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
        if (global.get_combat_statu()) {
            this.leveling_behavior.behavior = 'combat';
        } else {
            this.leveling_behavior.behavior = 'NULL';
        }
        //手持武器详细类型
        let player_attr = player.get_player_attributes();
        this.leveling_behavior.weapon_type = player_attr.get_a_attr('weapon_type');
    }
    reset_leveling_behavior() {
        this.leveling_behavior = new Leveling_Behavior(); //一帧里的练级数据
        this.Active_skill_exp = new Object(); //玩家主动技能获得的经验
        this.Passive_skill_exp = new Object(); //玩家被动技能获得的经验
    }

    //结算玩家应该获得的技能经验
    player_get_exp() {
        //主动技能获得经验
        let All_Skills = player.get_player_All_Skills();
        for (let id in this.Active_skill_exp) {
            All_Skills.get_skill_exp(id, this.Active_skill_exp[id]);
        }
        //被动技能获得经验
        for (let id in All_Skills) {
            //主动技能跳过
            if (P_skills[id].type == 'Active') continue;
            //满级和不能获得经验的技能跳过
            if (!All_Skills[id].levelup_flag || All_Skills[id].levelmax_flag) continue;
            //遍历找到可以获得经验的技能
            if (this.judge_leveling_behavior(id)) {
                if (P_skills[id].exp_source == 'attack_num') {
                    All_Skills.get_skill_exp(id, this.leveling_behavior['attack_num']);
                }
            }
        }
        this.reset_leveling_behavior();
    }
    //判断当前行为能否为指定技能提供经验
    judge_leveling_behavior(skill_id) {
        let skill_LB = P_skills[skill_id].leveling_behavior;
        let P_LB = this.leveling_behavior;
        //行为判断
        let i = 'behavior';
        if (skill_LB[i]) {
            if (P_LB[i] != skill_LB[i]) {
                return false;
            }
        }
        //武器类型判断
        i = 'weapon_type';
        if (skill_LB[i]) {
            let weapon_type_flag = false;
            for (let pw of skill_LB[i]) {
                if (P_LB[i].includes(pw)) {
                    //武器类型判定成功
                    weapon_type_flag = true;
                    break;
                }
            }
            if (weapon_type_flag == false) {
                return false;
            }
        }

        return true;
    }
}

var exp_manage = new Exp_manage();

export { exp_manage };
