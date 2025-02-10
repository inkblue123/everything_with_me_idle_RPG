import { global } from './global_class.js';
import { isEmptyObject } from '../Function/Function.js';
import { skills } from '../Data/Skill/Skill.js';
class Attack_effect {
    constructor() {
        this.id;
        this.number_times = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
        this.lock_enemy_type = new Object(); //索敌逻辑
    }
}

//战斗管理类
export class Combat_manage {
    constructor() {
        this.player_Attack = new Attack_effect();
        this.combat_place_enemys; //战斗场地内敌人的浅拷贝
    }
    //设置玩家即将造成的攻击
    set_player_next_attack(player_Attack) {
        this.player_Attack = player_Attack;
    }
    //结算这一帧的战斗结果
    run_conbat() {
        let enemy_manage = global.get_enemy_manage();
        this.combat_place_enemys = enemy_manage.get_combat_place_enemys();
        //玩家攻击
        this.PAE_manage();
        //
    }
    //玩家攻击敌人的战斗结果
    PAE_manage() {
        //索敌
        let enemys = this.get_lock_enemy();
        //攻击n次
        if (enemys.length == 0) {
            //没有找到敌人，攻击结束
            this.player_Attack = new Attack_effect();
            return true;
        }
        for (let i = 0; i < enemys.length; i++) {
            for (let j = 0; j < this.player_Attack.number_times; j++) {
                enemys[i].health_point -= this.player_Attack.base_damage;
            }
            if (enemys[i].health_point <= 0) {
                enemys[i].statu = false;
            }
        }
        //结束
        this.player_Attack = new Attack_effect();
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
}

var combat_manage = new Combat_manage();

export { combat_manage };
