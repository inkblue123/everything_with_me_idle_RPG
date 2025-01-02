'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { isEmptyObject } from '../Function/Function.js';
import { get_EQP_switch, get_object_only_key } from '../Function/Get_func.js';
import { updata_equipment_show } from '../Function/Updata_func.js';

export class Player_attributes {
    constructor(id) {
        this.name = '我'; //角色名称
        //战斗攻击属性
        this.combat_attack_attr = new Object();
        //战斗防御属性
        this.combat_defense_attr = new Object();
        //战斗生存属性
        this.combat_survival_attr = new Object();
        this.health_point = 100; //当前血量
        this.magic_point = 100; //当前魔力
        this.energy_point = 100; //当前精力
        //角色基础属性汇总
        this.player_base_attr = new Object();
        //当前激活的装备栏上所有装备的属性汇总
        this.EQP_attr = new Object();
        //当前拥有的可用技能的所有属性汇总
        this.skill_attr = new Object();

        //所有加成计算完毕之后的最终属性
        this.end_attr = new Object();
    }
    //初始化玩家属性
    init() {
        //战斗攻击属性初始化
        this.combat_attack_attr['attack'] = 10; //攻击力
        this.combat_attack_attr['precision'] = 10; //精准
        this.combat_attack_attr['critical_chance'] = 5; //暴击率，百分制，具体计算时会除以100
        this.combat_attack_attr['critical_damage'] = 150; //暴击伤害，百分制，具体计算时会除以100
        this.combat_attack_attr['attack_speed'] = 3; //玩家基础攻击速度
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
        this.updata_end_attr();
    }
    //汇总穿戴的装备上的属性加成
    Summary_worn_EQP_attr(worn_EQP) {
        this.EQP_attr = new Object();
        for (let wp in worn_EQP) {
            if (isEmptyObject(worn_EQP[wp])) continue;
            //遍历每个部位的装备
            let EQP = worn_EQP[wp];
            let id = EQP.id;
            let rarity = get_object_only_key(EQP.rarity);
            let num = EQP.rarity[rarity];
            for (let i in items[id].equip_attr) {
                if (items[id].equip_attr[i] == 0) continue;
                //将数据库中记载的属性存入玩家身上
                if (isEmptyObject(this.EQP_attr[i])) {
                    this.EQP_attr[i] = 0;
                }
                //副手武器的攻速不计算
                if (wp == 'deputy' && i == 'attack_speed') continue;
                //其他属性正常计算
                this.EQP_attr[i] += items[id].equip_attr[i];
            }
        }
    }
    get_health_point() {
        return this.health_point;
    }
    get_magic_point() {
        return this.magic_point;
    }
    get_energy_point() {
        return this.energy_point;
    }
    //根据id获取属性
    get_a_attr(id) {
        return this.end_attr[id];
    }
    //更新最终属性
    updata_end_attr() {
        this.end_attr = new Object();
        //初始战斗攻击属性
        for (let id in this.combat_attack_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[id] = 0;
            }
            this.end_attr[id] += this.combat_attack_attr[id];
        }
        //初始战斗防御属性
        for (let id in this.combat_defense_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[id] = 0;
            }
            this.end_attr[id] += this.combat_defense_attr[id];
        } //初始战斗生存属性
        for (let id in this.combat_survival_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[id] = 0;
            }
            this.end_attr[id] += this.combat_survival_attr[id];
        }
        //初始
        for (let id in this.player_base_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[id] = 0;
            }
            this.end_attr[id] += this.player_base_attr[id];
        }
        //汇总装备属性
        for (let id in this.EQP_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[i] = 0;
            }
            this.end_attr[id] += this.EQP_attr[id];
        }
        //汇总技能属性
        for (let id in this.skill_attr) {
            if (isEmptyObject(this.end_attr[id])) {
                this.end_attr[i] = 0;
            }
            this.end_attr[id] += this.skill_attr[id];
        }
    }
}
