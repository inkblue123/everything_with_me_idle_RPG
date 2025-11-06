'use strict';
import { is_Empty_Object, get_uniqueArr, get_object_only_key } from '../../Function/Function.js';
import { calculate_num_attr, calculate_speed_attr } from '../../Function/math_func.js';
import { player } from '../Player.js';

import { items } from '../../Data/Item/Item.js';
import { enums } from '../../Data/Enum/Enum.js';
import { P_skills } from '../../Data/Skill/Skill.js';

export class Data_attr_manage {
    constructor() {
        this.name = '玩家'; //角色名称
        this.health_point = 100; //当前血量
        this.magic_point = 100; //当前魔力
        this.energy_point = 100; //当前精力
        //战斗攻击属性
        this.combat_attack_attr = new Object();
        //战斗防御属性
        this.combat_defense_attr = new Object();
        //战斗生存属性
        this.combat_survival_attr = new Object();
        //角色基础属性点
        this.player_base_attr = new Object();
        //生活技能属性
        this.live_plan_attr = new Object();

        //玩家所有基础属性汇总，实质上是上面所有部分的总和
        this.player_attr = new Object();
        //当前激活的装备栏上所有装备的属性汇总
        this.EQP_attr = new Object();
        //当前拥有的可用被动技能的所有属性汇总
        this.passive_skill_attr = new Object();
        //当前使用的主动技能的所有属性汇总
        this.active_skill_attr = new Object();
        //当前地点提供的属性汇总
        this.place_attr = new Object();
        //当前拥有的buff的属性汇总
        this.buff_attr = new Object();

        //上一次属性汇总的缓存
        this.prevObjects = new Object();

        //所有加成计算完毕之后的最终属性
        this.end_data_attr = new Object();
        //所有加成计算完毕之后的最终buff
    }
    //初始化玩家属性
    init() {
        //战斗攻击属性初始化
        this.combat_attack_attr['attack'] = 10; //攻击力
        this.combat_attack_attr['precision'] = 10; //精准
        this.combat_attack_attr['critical_chance'] = 5; //暴击率，百分制，具体计算时会除以100
        this.combat_attack_attr['critical_damage'] = 150; //暴击伤害，百分制，具体计算时会除以100
        this.combat_attack_attr['attack_speed'] = 0; //玩家攻击速度加成
        this.combat_attack_attr['attack_interval'] = 3; //玩家基础攻击间隔
        //战斗防御属性初始化
        this.combat_defense_attr['defense'] = 10; //防御
        this.combat_defense_attr['evade'] = 10; //闪避
        this.combat_defense_attr['resistance_point'] = 10; //抵抗力
        this.combat_defense_attr['move_speed'] = 10; //移动速度
        //战斗生存属性初始化
        this.combat_survival_attr['health_max'] = 100; //最大血量上限
        this.combat_survival_attr['magic_max'] = 100; //最大魔力上限
        this.combat_survival_attr['energy_max'] = 100; //最大精力上限
        //角色基础属性初始化
        this.player_base_attr['physique'] = 10; //体格
        this.player_base_attr['Meridians'] = 10; //经脉
        this.player_base_attr['soul'] = 10; //魂魄
        this.player_base_attr['power'] = 10; //力量
        this.player_base_attr['agile'] = 10; //敏捷
        this.player_base_attr['intelligence'] = 10; //智力
        this.player_base_attr['technique'] = 10; //技巧
        //角色生活技能属性初始化
        this.live_plan_attr['LGI_interval'] = 3; //伐木基础间隔
        this.live_plan_attr['LGI_attack'] = 3; //伐木力
        this.live_plan_attr['LGI_critical_chance'] = 5; //伐木暴击率
        this.live_plan_attr['LGI_critical_damage'] = 150; //伐木暴击伤害
        this.live_plan_attr['FIS_takebait_attack'] = 1; //钓鱼上钩力
        this.live_plan_attr['FIS_walkfish_attack'] = 3; //钓鱼遛鱼力
        this.live_plan_attr['FAG_attack'] = 5; //采集力
        this.live_plan_attr['FAG_interval'] = 5; //采集速度

        //汇总
        this.prevObjects['player_attr'] = JSON.parse(JSON.stringify(this.player_attr));
        this.prevObjects['EQP_attr'] = JSON.parse(JSON.stringify(this.EQP_attr));
        this.prevObjects['passive_skill_attr'] = JSON.parse(JSON.stringify(this.passive_skill_attr));
        this.prevObjects['active_skill_attr'] = JSON.parse(JSON.stringify(this.active_skill_attr));
        this.prevObjects['place_attr'] = JSON.parse(JSON.stringify(this.place_attr));
        this.prevObjects['buff_attr'] = JSON.parse(JSON.stringify(this.buff_attr));
        this.updata_Player_attr();
    }
    //获取玩家属性部分的游戏存档
    save_Data_attr() {
        let data_attr_save = new Object();
        data_attr_save.name = this.name; //角色名称
        data_attr_save.health_point = this.health_point; //当前血量
        data_attr_save.magic_point = this.magic_point; //当前魔力
        data_attr_save.energy_point = this.energy_point; //当前精力
        return data_attr_save;
    }
    //加载玩家属性部分的游戏存档
    load_Data_attr(data_attr_save) {
        if (is_Empty_Object(data_attr_save)) {
            return;
        }
        this.name = data_attr_save.name; //角色名称
        this.health_point = data_attr_save.health_point; //当前血量
        this.magic_point = data_attr_save.magic_point; //当前魔力
        this.energy_point = data_attr_save.energy_point; //当前精力
    }
    //玩家属性变化，更新到最终属性里
    updata_Player_attr() {
        //获得新的玩家属性汇总
        this.Summary_Player_attr();
        //将最终属性中的玩家属性部分更新
        this.partial_update_end_attr('player_attr');
    }
    //玩家装备变化，更新到最终属性里
    updata_EQP_attr() {
        let P_worn = player.get_player_worn();
        let worn_EQP = P_worn.get_worn_EQP();
        //获得新的玩家装备属性汇总
        this.Summary_worn_EQP_attr(worn_EQP);
        this.Summary_worn_EQP_weapon_type(worn_EQP);
        //将最终属性中的玩家属性部分更新
        this.partial_update_end_attr('EQP_attr');
    }
    //玩家被动技能变化，更新到最终属性里
    updata_passive_skill_attr() {
        //获得新的玩家属性汇总
        this.Summary_passive_skill_attr();
        //将最终属性中的玩家属性部分更新
        this.partial_update_end_attr('passive_skill_attr');
    }
    //玩家主动技能变化，更新到最终属性里
    updata_active_skill_attr() {
        //获得新的玩家属性汇总
        this.Summary_active_skill_attr();
        //将最终属性中的玩家属性部分更新
        this.partial_update_end_attr('active_skill_attr');
    }
    //玩家buff属性变化，更新到最终属性里
    updata_buff_attr() {
        //获得新的玩家属性汇总
        this.Summary_buff_attr();
        //将最终属性中的玩家属性部分更新
        this.partial_update_end_attr('buff_attr');
    }
    //更新汇总玩家的最基础的属性
    Summary_Player_attr() {
        this.player_attr = new Object();
        //初始战斗攻击属性
        for (let id in this.combat_attack_attr) {
            if (is_Empty_Object(this.player_attr[id])) {
                this.player_attr[id] = 0;
            }
            this.player_attr[id] += this.combat_attack_attr[id];
        }
        //初始战斗防御属性
        for (let id in this.combat_defense_attr) {
            if (is_Empty_Object(this.player_attr[id])) {
                this.player_attr[id] = 0;
            }
            this.player_attr[id] += this.combat_defense_attr[id];
        }
        //初始战斗生存属性
        for (let id in this.combat_survival_attr) {
            if (is_Empty_Object(this.player_attr[id])) {
                this.player_attr[id] = 0;
            }
            this.player_attr[id] += this.combat_survival_attr[id];
        }
        //初始角色基础属性
        for (let id in this.player_base_attr) {
            if (is_Empty_Object(this.player_attr[id])) {
                this.player_attr[id] = 0;
            }
            this.player_attr[id] += this.player_base_attr[id];
        }
        //初始角色生活技能属性
        for (let id in this.live_plan_attr) {
            if (is_Empty_Object(this.player_attr[id])) {
                this.player_attr[id] = 0;
            }
            this.player_attr[id] += this.live_plan_attr[id];
        }
    }
    //汇总穿戴的装备上的属性加成
    Summary_worn_EQP_attr(worn_EQP) {
        //清空原有装备属性加成
        this.EQP_attr = new Object();
        this.EQP_attr['weapon_type'] = new Array();

        for (let wp in worn_EQP) {
            if (is_Empty_Object(worn_EQP[wp])) continue;
            //遍历每个部位的装备
            let EQP = worn_EQP[wp];
            let id = EQP.id;
            let equip_rarity = EQP.equip_rarity;
            //记录每件装备的每条属性
            for (let attr in items[id].equip_attr[equip_rarity]) {
                if (items[id].equip_attr[equip_rarity][attr] == 0) {
                    continue;
                }
                //将数据库中记载的属性存入玩家身上
                if (is_Empty_Object(this.EQP_attr[attr])) {
                    this.EQP_attr[attr] = 0;
                }
                //回旋武器的攻击间隔单独计算
                if (items[id].secon_type.includes('boomerang') && attr == 'attack_interval') {
                    let num = EQP.num;
                    this.EQP_attr[attr] += items[id].equip_attr[equip_rarity][attr] / num;
                    continue;
                }
                //其他属性正常计算
                this.EQP_attr[attr] += items[id].equip_attr[equip_rarity][attr];
            }
        }
    }
    //获取手持武器的武器类型
    Summary_worn_EQP_weapon_type(worn_EQP) {
        this.EQP_attr['weapon_type'] = new Array();

        if (!is_Empty_Object(worn_EQP['main_hand'])) {
            //带了单手武器
            let item_id = worn_EQP['main_hand'].id; //主手位置的装备的id
            let item_eqt = items[item_id].secon_type; //该装备的武器类型
            this.EQP_attr['weapon_type'] = this.EQP_attr['weapon_type'].concat(item_eqt);
        } else if (!is_Empty_Object(worn_EQP['main_hand_two'])) {
            //带了双手武器
            let item_id = worn_EQP['main_hand_two'].id; //双手位置的装备的id
            let item_eqt = items[item_id].secon_type; //该装备的武器类型
            this.EQP_attr['weapon_type'] = this.EQP_attr['weapon_type'].concat(item_eqt);
        } else {
            //没有带武器，空手
            this.EQP_attr['weapon_type'].push('emptyhanded'); //空手
            this.EQP_attr['weapon_type'].push('gloves'); //视作拥有拳套
            //解锁之后空手也可以视作投掷工具
            // this.EQP_attr['weapon_type'].push('throw');
            //解锁之后空手也可以视作施法核心
            // this.EQP_attr['weapon_type'].push('putmagic_core');
        }
        if (!is_Empty_Object(worn_EQP['deputy'])) {
            //带了副手装备
            let item_id = worn_EQP['deputy'].id; //主手位置的装备的id
            let item_eqt = items[item_id].secon_type; //该装备的武器类型
            this.EQP_attr['weapon_type'] = this.EQP_attr['weapon_type'].concat(item_eqt);
        }
        //去重
        this.EQP_attr['weapon_type'] = get_uniqueArr(this.EQP_attr['weapon_type']);
    }
    //汇总玩家身上所有可用被动技能提供的属性
    Summary_passive_skill_attr() {
        this.passive_skill_attr = new Object();
        //遍历所有被动技能，获得加成
        let P_All_P_Skills = player.get_player_All_passive_skills();
        for (let id in P_All_P_Skills) {
            let skill_obj = P_All_P_Skills[id];
            if (skill_obj.level < 1) {
                //初始被动技能0级时不可用，没有属性
                continue;
            }
            //可用的被动技能有两部分属性加成，一部分是常态等级加成，一部分是关键等级节点提供的加成
            //常态等级加成
            if (!is_Empty_Object(skill_obj.rewards)) {
                for (let reward_obj of skill_obj.rewards) {
                    let attr = reward_obj.attr;
                    if (is_Empty_Object(this.passive_skill_attr[attr])) {
                        this.passive_skill_attr[attr] = 0;
                    }
                    this.passive_skill_attr[attr] += reward_obj.data;
                }
            }
            //关键节点加成
            if (!is_Empty_Object(P_skills[id].milepost)) {
                for (let milepost_level in P_skills[id].milepost) {
                    if (skill_obj.level < milepost_level) {
                        //只计算到玩家达到了的关键节点的加成
                        break;
                    }
                    let milepost_array = P_skills[id].milepost[milepost_level];
                    for (let obj of milepost_array) {
                        let attr = obj.attr;
                        if (is_Empty_Object(this.passive_skill_attr[attr])) {
                            this.passive_skill_attr[attr] = 0;
                        }
                        this.passive_skill_attr[attr] += obj.data;
                    }
                }
            }
        }
    }
    //汇总玩家身上所有可用主动技能提供的属性
    Summary_active_skill_attr() {
        //有些主动技能装备上之后也有加成，也要汇总
        this.active_skill_attr = new Object();
    }
    //汇总玩家身上所有可用主动技能提供的属性
    Summary_buff_attr() {
        this.buff_attr = new Object();
        let P_buff = player.get_player_buff();
        let buff_end_data_attr = P_buff.get_end_data_attr();
        this.buff_attr = JSON.parse(JSON.stringify(buff_end_data_attr));
    }
    //根据id设置玩家的属性，只能设置玩家的属性，不会修改装备上、技能上的属性，
    set_data_attr(id, value) {
        if (id == 'health_point') {
            this.health_point = value;
        } else if (id == 'magic_point') {
            this.magic_point = value;
        } else if (id == 'energy_point') {
            this.energy_point = value;
        } else if (id == 'name') {
            this.name = value;
        } else if (enums.combat_attack_attr.includes(id)) {
            this.combat_attack_attr[id] = value;
        } else if (enums.combat_defense_attr.includes(id)) {
            this.combat_defense_attr[id] = value;
        } else if (enums.combat_survival_attr.includes(id)) {
            this.combat_survival_attr[id] = value;
        } else if (enums.player_base_attr.includes(id)) {
            this.player_base_attr[id] = value;
        }
        // 玩家属性变化，更新到最终属性里
        this.updata_Player_attr();
    }
    //根据id改变玩家属性，只允许改变血量蓝量精力的当前值
    change_data_attr(id, value) {
        if (id == 'health_point') {
            this.health_point += value;
            if (this.health_point < 0) {
                this.health_point = 0;
            } else if (this.health_point > this.end_data_attr['health_max']) {
                this.health_point = this.end_data_attr['health_max'];
            }
        } else if (id == 'magic_point') {
            this.magic_point += value;
            if (this.magic_point < 0) {
                this.magic_point = 0;
            } else if (this.magic_point > this.end_data_attr['magic_max']) {
                this.magic_point = this.end_data_attr['magic_max'];
            }
        } else if (id == 'energy_point') {
            this.energy_point += value;
            if (this.energy_point < 0) {
                this.energy_point = 0;
            } else if (this.energy_point > this.end_data_attr['energy_max']) {
                this.energy_point = this.end_data_attr['energy_max'];
            }
        }
    }
    //根据id获取属性
    get_data_attr(id) {
        if (id == 'health_point') {
            return this.health_point;
        } else if (id == 'magic_point') {
            return this.magic_point;
        } else if (id == 'energy_point') {
            return this.energy_point;
        } else if (id == 'name') {
            return this.name;
        } else {
            return this.end_data_attr[id];
        }
    }
    //获取最终属性
    get_end_data_attr() {
        return this.end_data_attr;
    }
    //更新最终属性
    updata_end_attr(type) {
        if (type == 'equipment') {
            //指定更新装备属性
            this.updata_EQP_attr(); //玩家装备属性
        } else if (type == 'passive_skill') {
            //指定更新被动技能属性
            this.updata_passive_skill_attr(); //玩家被动技能属性
        } else if (type == 'active_skill') {
            //指定更新主动技能属性
            this.updata_active_skill_attr(); //玩家主动技能属性
        } else if (type == 'buff') {
            //指定更新buff属性
            this.updata_buff_attr(); //玩家buff属性
        } else if (type == undefined) {
            //没有指定，把每个属性部分都更新一遍
            this.updata_Player_attr(); //玩家基础属性
            this.updata_EQP_attr(); //玩家装备属性
            this.updata_passive_skill_attr(); //玩家被动技能属性
            this.updata_active_skill_attr(); //玩家主动技能属性
            this.updata_buff_attr(); //玩家buff属性
        }
    }
    //增量更新最终属性，只修改变更了的指定部分属性
    partial_update_end_attr(index) {
        let old_obj = this.prevObjects[index];
        let new_obj = this[index];
        //撤销旧属性
        for (const [key, value] of Object.entries(old_obj)) {
            if (key == 'weapon_type') {
                const setB = new Set(value);
                this.end_data_attr[key] = this.end_data_attr[key].filter((item) => !setB.has(item));
                if (this.end_data_attr[key].length === 0) {
                    delete this.end_data_attr[key]; // 清理值为0的键
                }
            } else {
                this.end_data_attr[key] -= value;
                if (this.end_data_attr[key] === 0) {
                    delete this.end_data_attr[key]; // 清理值为0的键
                }
            }
        }
        //累加新属性
        for (const [key, value] of Object.entries(new_obj)) {
            if (key == 'weapon_type') {
                if (is_Empty_Object(this.end_data_attr[key])) {
                    this.end_data_attr[key] = new Array();
                }
                this.end_data_attr[key] = this.end_data_attr[key].concat(value);
            } else {
                this.end_data_attr[key] = (this.end_data_attr[key] || 0) + value;
            }
        }
        //重新计算部分属性
        this.updata_need_calculate_end_attr();

        //更新缓存
        this.prevObjects[index] = JSON.parse(JSON.stringify(new_obj));
    }
    //计算部分属性，获得真正使用的数值
    updata_need_calculate_end_attr() {
        //true_attack 攻击力
        let base_attack = this.end_data_attr['attack']; //基本攻击力
        let attack_ratio = this.end_data_attr['attack_ratio']; //攻击力加成
        this.end_data_attr['true_attack'] = calculate_num_attr(base_attack, 0, attack_ratio, 0, 0);
        //true_precision 精准
        let base_precision = this.end_data_attr['precision']; //基本精准
        let precision_ratio = this.end_data_attr['precision_ratio']; //精准加成
        this.end_data_attr['true_precision'] = calculate_num_attr(base_precision, 0, precision_ratio, 0, 0);
        //true_critical_chance 暴击率
        let base_critical_chance = this.end_data_attr['critical_chance']; //基本暴击率
        let critical_chance_ratio = this.end_data_attr['critical_chance_ratio']; //暴击率加成
        this.end_data_attr['true_critical_chance'] = calculate_num_attr(base_critical_chance, 0, critical_chance_ratio, 0, 0);
        //true_critical_damage 暴击伤害
        let base_critical_damage = this.end_data_attr['critical_damage']; //基本暴击伤害
        let critical_damage_ratio = this.end_data_attr['critical_damage_ratio']; //暴击伤害加成
        this.end_data_attr['true_critical_damage'] = calculate_num_attr(base_critical_damage, 0, critical_damage_ratio, 0, 0);
        //true_attack_interval 攻击间隔
        let base_attack_interval = this.end_data_attr['attack_interval']; //基础攻击间隔
        let attack_speed = this.end_data_attr['attack_speed']; //攻速加成
        let attack_interval_ratio = this.end_data_attr['attack_interval_ratio']; //攻速影响倍率
        this.end_data_attr['true_attack_interval'] = calculate_speed_attr(base_attack_interval, 0, attack_speed, 0, attack_interval_ratio);

        //true_defense 防御
        let base_defense = this.end_data_attr['defense']; //基本防御
        let defense_ratio = this.end_data_attr['defense_ratio']; //防御加成
        this.end_data_attr['true_defense'] = calculate_num_attr(base_defense, 0, defense_ratio, 0, 0);
        //true_evade 闪避
        let base_evade = this.end_data_attr['evade']; //基本闪避
        let evade_ratio = this.end_data_attr['evade_ratio']; //闪避加成
        this.end_data_attr['true_evade'] = calculate_num_attr(base_evade, 0, evade_ratio, 0, 0);
        //true_resistance_point 抵抗力
        let base_resistance_point = this.end_data_attr['resistance_point']; //基本抵抗力
        let resistance_point_ratio = this.end_data_attr['resistance_point_ratio']; //抵抗力加成
        this.end_data_attr['true_resistance_point'] = calculate_num_attr(base_resistance_point, 0, resistance_point_ratio, 0, 0);
        //true_move_speed 移动速度
        let base_move_speed = this.end_data_attr['move_speed']; //基本移动速度
        let move_speed_ratio = this.end_data_attr['move_speed_ratio']; //移动速度加成
        this.end_data_attr['true_move_speed'] = calculate_num_attr(base_move_speed, 0, move_speed_ratio, 0, 0);
    }
}
