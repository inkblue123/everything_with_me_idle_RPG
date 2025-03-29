import { global } from './global_class.js';
import { player } from '../Player/Player.js';
import { isEmptyObject } from '../Function/Function.js';

export class Attack_effect {
    constructor() {
        this.id;
        this.lock_enemy_type = new Object(); //索敌逻辑

        this.attack_num = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
        this.precision = 0; //精准
        this.critical_chance = 0; //暴击率
        this.critical_damage = 0; //暴击伤害
        this.damage_type; //伤害类型
    }
}
export class P_Attack_effect {
    constructor() {
        this.id;
        this.lock_enemy_type = new Object(); //索敌逻辑

        this.main_Attack = new Attack_effect();
        this.deputy_Attack = new Attack_effect();
        this.other_Attack = new Attack_effect();
    }
}

//战斗管理类
export class Combat_manage {
    constructor() {
        this.player_Attack = new P_Attack_effect();
        this.enemy_Attacks = new Array();
        this.combat_place_enemys; //战斗场地内敌人的浅拷贝
        this.enemy_combat_flag; //当前帧是否需要进行战斗的标记
        this.player_combat_flag; //当前帧玩家战斗是否成功的标记
    }
    //设置玩家即将造成的攻击
    set_player_next_attack(main_Attack, deputy_Attack, other_Attack) {
        if (main_Attack) this.player_Attack.main_Attack = main_Attack;
        if (deputy_Attack) this.player_Attack.deputy_Attack = deputy_Attack;
        if (other_Attack) this.player_Attack.other_Attack = other_Attack;
        if (main_Attack || deputy_Attack || other_Attack) {
            this.player_combat_flag = true;
        }
    }
    //设置敌人即将造成的攻击
    set_enemy_next_attack(enemy_Attack) {
        this.enemy_Attacks.push(enemy_Attack);
        this.enemy_combat_flag = true;
    }
    //结算这一帧的战斗结果
    run_combat() {
        if (!this.enemy_combat_flag && !this.player_combat_flag) {
            return false;
        }

        let enemy_manage = global.get_enemy_manage();
        this.combat_place_enemys = enemy_manage.get_combat_place_enemys();
        //玩家攻击
        if (this.player_combat_flag) {
            this.PAE_manage();
        }
        //敌人攻击
        if (this.enemy_combat_flag) {
            this.EAP_manage();
        }
        //战斗结束，重置相关参数
        this.reset_combat_data();
        return true;
    }
    //重置战斗相关参数
    reset_combat_data() {
        this.player_Attack = new P_Attack_effect();
        this.enemy_Attacks = new Array();
        this.enemy_combat_flag = false;
        this.player_combat_flag = false;
    }
    //玩家攻击敌人的战斗结果
    PAE_manage() {
        //索敌
        let enemys = this.get_lock_enemy();
        if (enemys.length == 0) {
            //没有找到敌人，攻击结束
            return true;
        }
        //攻击n次
        // this.player_combat_flag = true;
        let end_attack_damage = 0;
        let end_attack_num = 0;
        for (let i = 0; i < enemys.length; i++) {
            for (let j = 0; j < this.player_Attack.main_Attack.attack_num; j++) {
                if (enemys[i].health_point < this.player_Attack.main_Attack.base_damage) {
                    end_attack_damage += enemys[i].health_point;
                    enemys[i].health_point = 0;
                } else {
                    end_attack_damage += this.player_Attack.main_Attack.base_damage;
                    enemys[i].health_point -= this.player_Attack.main_Attack.base_damage;
                }
                if (enemys[i].health_point <= 0) {
                    //击杀了一个敌人，记录相关数据
                    enemys[i].statu = false;

                    let game_event_manage = global.get_game_event_manage();
                    game_event_manage.record_kill_enemy_num(this.player_Attack.main_Attack);
                    break;
                }
            }
        }
        end_attack_num = this.player_Attack.main_Attack.attack_num;
        //结算经验
        let exp_manage = global.get_exp_manage();
        exp_manage.set_Active_skill_exp(this.player_Attack.main_Attack.id, end_attack_damage);
        exp_manage.set_combat_leveling_behavior(end_attack_num, end_attack_damage);
    }
    //敌人攻击玩家的战斗结果
    EAP_manage() {
        let P_attr = player.get_player_attributes();
        //处理这一帧每个敌人的攻击
        for (let i = 0; i < this.enemy_Attacks.length; i++) {
            for (let j = 0; j < this.enemy_Attacks[i].attack_num; j++) {
                P_attr.health_point -= this.enemy_Attacks[i].base_damage;
            }
            //玩家生命归零，进入死亡逻辑
            if (P_attr.health_point <= 0) {
                P_attr.health_point = 0;
                this.player_death();
                break;
            }
        }
    }
    //获取当前玩家攻击的索敌目标
    get_lock_enemy() {
        let lock_enemys = new Array();
        if (isEmptyObject(this.player_Attack.lock_enemy_type)) {
            //这次攻击未设定索敌逻辑，选用默认设定
            this.player_Attack.lock_enemy_type = {
                num: 1, //攻击一个敌人
                distance: 'min', //选择最近的
                type: 'normal', //普通直接攻击
            };
        }
        //距离优先
        if (this.player_Attack.lock_enemy_type.distance == 'min') {
            let enemy_manage = global.get_enemy_manage();
            lock_enemys = enemy_manage.get_min_distance_enemy(this.player_Attack.lock_enemy_type.num);
            return lock_enemys;
        }
    }
    //玩家死亡，处理相关逻辑
    player_death() {
        let global_flag_manage = global.get_global_flag_manage();
        if (global_flag_manage.get_game_status('game_event')) {
            //如果玩家处于事件中，死亡意味着事件失败，只退出事件
            let game_event_manage = global.get_game_event_manage();
            game_event_manage.end_game_event(false);
        } else {
            //非事件中，移动到安全的地方
            this.place_manage.set_next_place('village_home');
        }
        //清空玩家buff
        //清空战斗区域的临时加成
    }
}

var combat_manage = new Combat_manage();

export { combat_manage };
