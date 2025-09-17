import { global } from './global_manage.js';
import { player } from '../Player/Player.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { items } from '../Data/Item/Item.js';
import { is_Empty_Object } from '../Function/Function.js';
import { get_random } from '../Function/math_func.js';

export class Attack_effect {
    constructor() {
        this.id; //这次攻击的主动技能id
        this.lock_enemy_type = new Object(); //索敌逻辑

        this.attack_num = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
        this.precision = 0; //精准
        this.critical_chance = 0; //暴击率
        this.critical_damage = 0; //暴击伤害
        this.damage_type; //伤害类型
    }
}
export class Defense_effect {
    constructor() {
        this.id; //这次防御的主动技能id
        this.defense_type; //防御类型
        this.defense_num = 0; //防御次数
        //伤害减免 damage_reduction DR
        this.DR_math_type; //减伤的计算方式
        this.DR_damage_type; //减伤适用的伤害类型
        this.DR_num; //减伤固定数值
        this.DR_ratio; //减伤比例
        //伤害吸收 damage_absorb DA
        this.DA_damage_type; //伤害吸收适用的伤害类型
        this.DA_num; //伤害吸收的数值
        //格挡 block BK
        //格挡不限伤害
        this.BK_num; //格挡次数
        //反击 counterattack CAK
        this.CAK_flag; //防御成功是否反击
        this.CAK_time; //触发反击的时间点
        this.CAK_effect = new Attack_effect(); //反击的效果
    }
}
export class P_Attack_effect {
    constructor() {
        // this.id; //这次攻击的主动技能id，实际上没用
        this.lock_enemy_type = new Object(); //索敌逻辑

        this.main_Attack = new Attack_effect();
        this.deputy_Attack = new Attack_effect();
        this.other_Attack = new Attack_effect();
    }
}
export class P_Defense_effect {
    constructor() {
        // this.defense_flag;
        this.main_Defense = new Defense_effect();
    }
}
export class E_Attack_effect {
    constructor() {
        this.id; //造成这次攻击的敌人的id
        this.place_x; //造成这次攻击的敌人的所在区域（little_distance近，middle_distance中，remote_distance远）
        this.place_y; //造成这次攻击的敌人在区域里的哪个位置（0-8）

        this.main_Attack = new Attack_effect();
    }
}

//战斗管理类
export class Combat_manage {
    constructor() {
        this.player_attack_flag; //当前帧是否需要玩家攻击的标记
        this.player_Attack = new P_Attack_effect();
        this.player_defense_flag; //当前帧玩家是否有防御效果的标记
        this.player_Defense = new P_Defense_effect();
        this.enemy_attack_flag; //当前帧是否需要敌人攻击的标记
        this.enemy_Attacks = new Array(); //数组每个都是E_Attack_effect结构
        this.combat_place_enemys; //战斗场地内敌人的浅拷贝
    }
    //设置玩家即将造成的攻击
    set_player_next_attack(main_Attack, deputy_Attack, other_Attack) {
        if (main_Attack) this.player_Attack.main_Attack = main_Attack;
        if (deputy_Attack) this.player_Attack.deputy_Attack = deputy_Attack;
        if (other_Attack) this.player_Attack.other_Attack = other_Attack;
        if (main_Attack || deputy_Attack || other_Attack) {
            this.player_attack_flag = true;
        }
    }
    //设置玩家当前帧激活的防御效果
    set_player_defense(main_defense) {
        if (!is_Empty_Object(main_defense)) this.player_Defense.main_Defense = main_defense;
        // if (main_Attack) {
        this.player_defense_flag = true;
        // }
    }
    //设置敌人即将造成的攻击
    set_enemy_next_attack(e_Attack_effect) {
        this.enemy_Attacks.push(e_Attack_effect);
        this.enemy_attack_flag = true;
    }
    //结算这一帧的战斗结果
    run_combat() {
        if (!this.enemy_attack_flag && !this.player_attack_flag) {
            return false;
        }

        let enemy_manage = global.get_enemy_manage();
        this.combat_place_enemys = enemy_manage.get_combat_place_enemys();
        //玩家攻击
        if (this.player_attack_flag) {
            this.PAE_manage();
            this.reset_player_attack_data();
        }
        //敌人攻击
        if (this.enemy_attack_flag) {
            this.EAP_manage();
            this.reset_enemy_attack_data();
        }
        //战斗结束，重置相关参数
        // this.reset_combat_data();
        return true;
    }
    //重置战斗相关参数
    reset_combat_data() {
        this.reset_player_attack_data();
        this.reset_player_defense_data();
        this.reset_enemy_attack_data();
    }
    //重置玩家的战斗参数
    reset_palyer_combat_data() {
        this.reset_player_attack_data();
        this.reset_player_defense_data();
    }
    reset_player_attack_data() {
        this.player_attack_flag = false;
        this.player_Attack = new P_Attack_effect();
    }
    reset_player_defense_data() {
        this.player_defense_flag = false;
        this.player_Defense = new P_Defense_effect();
    }
    reset_enemy_attack_data() {
        this.enemy_attack_flag = false;
        this.enemy_Attacks = new Array();
    }
    //玩家攻击敌人的战斗结果
    PAE_manage() {
        //索敌
        let enemys = this.get_lock_enemy();
        if (enemys.length == 0) {
            //没有找到敌人，攻击结束
            return true;
        }
        let main_Attack = this.player_Attack.main_Attack;
        let end_attack_damage = 0; //这一帧总共造成了多少伤害
        let end_attack_num = 0; //这一帧总共攻击了几次
        let global_flag_manage = global.get_global_flag_manage();
        //对每个目标都攻击
        for (let i = 0; i < enemys.length; i++) {
            //攻击n次
            for (let j = 0; j < main_Attack.attack_num; j++) {
                let p_damage = main_Attack.base_damage;
                if (enemys[i].health_point < p_damage) {
                    p_damage = enemys[i].health_point;
                }
                enemys[i].health_point -= p_damage;
                global_flag_manage.set_game_log('player_attack', main_Attack, p_damage, enemys[i].id);
                if (enemys[i].health_point <= 0) {
                    //击杀了一个敌人，记录相关数据
                    enemys[i].statu = false;

                    this.enemy_death(enemys[i], main_Attack);
                    continue;
                }
            }
        }
        end_attack_num = main_Attack.attack_num;
        // 玩家行为记录
        global_flag_manage.record_active_skill_use(main_Attack.id, end_attack_damage);
        global_flag_manage.record_combat_behavior(end_attack_num, end_attack_damage);
    }
    //敌人攻击玩家的战斗结果
    EAP_manage() {
        let P_attr = player.get_player_attributes();
        //处理这一帧每个敌人的攻击
        for (let i = 0; i < this.enemy_Attacks.length; i++) {
            this.player_attacted(this.enemy_Attacks[i]);
            //玩家生命归零，进入死亡逻辑
            let health_point = P_attr.get_data_attr('health_point');
            if (health_point <= 0) {
                P_attr.set_data_attr('health_point', 0);
                this.player_death();
                break;
            }
        }
    }
    //玩家受击逻辑
    player_attacted(E_Attack_effect) {
        let P_attr = player.get_player_attributes();
        let global_flag_manage = global.get_global_flag_manage();

        for (let j = 0; j < E_Attack_effect.main_Attack.attack_num; j++) {
            //敌人这一次攻击会造成的伤害
            let e_damage = E_Attack_effect.main_Attack.base_damage;
            //根据玩家防御效果改变要受到的伤害
            if (this.player_defense_flag == true) {
                //玩家启动了防御技能，优先结算防御技能的效果
                let main_Defense = this.player_Defense.main_Defense;
                if (main_Defense.defense_num == 'infinite' || main_Defense.defense_num > 0) {
                    //防御效果还有，结算防御效果
                    if (typeof main_Defense.defense_num == 'number') {
                        main_Defense.defense_num--; //使用一层防御效果
                    }
                    if (main_Defense.defense_type == 'damage_reduction') {
                        if (main_Defense.DR_math_type == 'num') {
                            e_damage -= main_Defense.DR_num;
                        } else if (main_Defense.DR_math_type == 'ratio') {
                            e_damage = e_damage * (1 - main_Defense.DR_num * 0.01);
                        }
                    }
                    global_flag_manage.record_defense_skill_effect(main_Defense.id);
                }
                if (main_Defense.defense_num != 'infinite' && main_Defense.defense_num <= 0) {
                    //防御效果用完，清除防御技能的效果，剩余的敌人攻击继续结算
                    this.reset_player_defense_data();
                }
            } else {
                //没有启动防御技能，不改变伤害，继续结算
            }
            //结算玩家防御数值
            let defense = P_attr.get_data_attr('defense');
            if (defense * 0.1 > e_damage) {
                e_damage = 0;
            } else {
                e_damage = e_damage - defense * 0.1;
                e_damage = Math.floor(e_damage);
            }
            e_damage = e_damage * -1;

            //计算完毕，攻击打到玩家身上
            // let health_point = P_attr.get_data_attr('health_point');
            // health_point -= e_damage;
            // P_attr.set_data_attr('health_point', health_point);
            P_attr.change_data_attr('health_point', e_damage);

            //添加一条敌人攻击的游戏日志
            global_flag_manage.set_game_log('enemy_attack', E_Attack_effect.id, e_damage, E_Attack_effect.main_Attack.damage_type);
            //记录玩家受击行为
            global_flag_manage.record_attacted_num(e_damage);
        }
    }

    //玩家死亡，处理相关逻辑
    player_death() {
        //原计划里玩家死亡是读档的，但是相关逻辑还没开发，就先临时这样了
        //回10点血
        let P_attr = player.get_player_attributes();
        P_attr.change_data_attr('health_point', 10);

        if (global.get_flag('GS_challenge_flag')) {
            //如果玩家处于事件中，死亡意味着事件失败，只退出事件
            let game_event_manage = global.get_game_event_manage();
            game_event_manage.end_challenge('death');
        } else {
            //非事件中，移动到安全的地方
            let place_manage = global.get_place_manage();
            place_manage.set_now_place('village_home');
        }
        //清空玩家buff
        //清空战斗区域的临时加成
    }
    //一个敌人死亡，处理相关逻辑
    enemy_death(enemy, main_Attack) {
        //玩家使用main_Attack击败了敌人，进行事件、经验相关的结算
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.record_kill_enemy_num(main_Attack, enemy);
        //地点可能是有限刷怪区域，记录敌人死亡的数据
        let enemy_manage = global.get_enemy_manage();
        enemy_manage.add_kill_enemy_num(1);
        //敌人掉落物品
        let items_obj = this.get_enemy_death_item(enemy.id);
        for (let key in items_obj) {
            let id = items_obj[key].id;
            let num = items_obj[key].num;
            let rarity = items_obj[key].rarity;
            player.Player_get_item(id, num, rarity);
        }
    }
    //获取当前玩家攻击的索敌目标
    get_lock_enemy() {
        let lock_enemys = new Array();
        if (is_Empty_Object(this.player_Attack.lock_enemy_type)) {
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
    //获取敌人死亡时掉落的物品
    get_enemy_death_item(enemy_id) {
        if (is_Empty_Object(enemys[enemy_id].item_array)) {
            //敌人没有掉落品，直接结束
            return;
        }

        let random_manage = global.get_random_manage(); //随机数管理类
        let drop_item_arry = new Array(); //掉落物汇总数组
        //获取敌人有几个掉落列表，对每个掉落列表进行一次判定
        let n = enemys[enemy_id].item_array.length;
        for (let i = 0; i < n; i++) {
            //根据掉落概率，判断这个列表里的物品要掉几次
            let enemy_item_obj = enemys[enemy_id].item_array[i];
            let chance = enemy_item_obj.drop_chance; //掉率
            let drop_times = parseInt(chance / 100);
            chance = chance % 100;
            let random = get_random(0, 100);
            if (random <= chance) {
                drop_times += 1;
            }
            for (let j = 0; j < drop_times; j++) {
                //根据权重，获取掉落哪一个物品
                let item_id = random_manage.get_enemy_death_item_id(enemy_id, i);
                let data_obj = enemy_item_obj.items[item_id];

                let item_obj = new Object();
                item_obj.id = item_id;
                item_obj.num = get_random(data_obj.min_num, data_obj.max_num); //这次掉落的数量
                if (items[item_id].main_type.includes('equipment')) {
                    //如果掉落的是装备，还需要记录稀有度
                    item_obj.rarity = data_obj.equip_rarity; //掉落的装备的稀有度;
                }
                //将掉落的信息存起来
                drop_item_arry.push(item_obj);
            }
        }
        //对掉落物去重
        let uniqueArr = new Object();
        for (let item_obj of drop_item_arry) {
            let id = item_obj.id;
            let key = id;
            if (items[id].main_type.includes('equipment')) {
                key = id + rarity;
            }

            if (is_Empty_Object(uniqueArr[key])) {
                uniqueArr[key] = item_obj;
            } else {
                uniqueArr[key].num += item_obj.num;
            }
        }
        return uniqueArr;
    }
}

var combat_manage = new Combat_manage();

export { combat_manage };
