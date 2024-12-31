'use strict';
import { items } from '../Data/Item/Item.js';
import { types } from '../Data/Type.js';
import { get_EQP_switch } from '../Function/Get_func.js';
import { updata_equipment_show } from '../Function/Updata_func.js';

export class Player_attributes {
    constructor(id) {
        this.name = '我'; //角色名称
        //战斗最终属性
        this.health_max = 100; //最大血量上限
        this.health_point = 100; //当前血量
        this.magic_max = 100; //最大魔力上限
        this.magic_point = 100; //当前魔力
        this.energy_max = 100; //最大精力上限
        this.energy_point = 100; //当前精力

        this.attack = 10; //攻击力
        this.precision = 10; //精准
        this.critical_chance = 1; //暴击率，百分制，具体计算时会除以100
        this.critical_damage = 150; //暴击伤害，百分制，具体计算时会除以100
        this.attack_speed = 1; //攻击速度
        this.defense = 10; //防御
        this.evade = 10; //闪避
        this.resistance_point = 10; //抵抗力
        this.move_speed = 10; //移动速度
        //角色固有属性
        this.physique = 10; //体格
        this.Meridians = 10; //经脉
        this.soul = 10; //魂魄
        this.power = 10; //力量
        this.agile = 10; //敏捷
        this.intelligence = 10; //智力
        this.technique = 10; //技巧
    }
}
