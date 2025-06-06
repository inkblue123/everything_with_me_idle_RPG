'use strict';
import { check_Equipment, is_Empty_Object } from '../Function/Function.js';
import { updata_BP_value } from '../Function/Updata_func.js';

import { Player_attributes } from './Player_attributes.js';
import { Player_backpack } from './Player_backpack.js';
import { Player_worn } from './Player_worn_EQP.js';
import { Player_active_skills_Manage } from './Player_active_skills.js';
import { Player_skills } from './Player_skill.js';
import { global } from '../GameRun/global_class.js';

export class Player_Object {
    constructor() {
        //角色属性
        this.attributes = new Object();
        //背包物品
        this.backpack_items = new Object();
        //穿戴的装备
        this.worn_EQP = new Object();
        //拥有的全部技能
        this.All_Skills = new Object();
        //已装载的主动技能
        this.ASkill_Manage = new Object();
    }

    init() {
        //初始化玩家属性
        this.attributes = new Player_attributes();
        this.attributes.init();
        //玩家背包
        this.backpack_items = new Player_backpack();
        //初始化身上穿戴的装备
        this.worn_EQP = new Player_worn();
        this.worn_EQP.init();
        //玩家所有技能
        this.All_Skills = new Player_skills();
        this.All_Skills.init();
        //初始化主动技能槽
        this.ASkill_Manage = new Player_active_skills_Manage();
        this.ASkill_Manage.init();
        //更新玩家属性
        this.updata_attr();
    }
    get_player_attributes() {
        return this.attributes;
    }
    get_player_backpack_items() {
        return this.backpack_items;
    }
    get_player_worn_EQP() {
        return this.worn_EQP;
    }
    get_player_ASkill_Manage() {
        return this.ASkill_Manage;
    }
    get_player_All_Skills() {
        return this.All_Skills;
    }
    //给玩家背包添加物品，js版函数重载
    Player_get_item(...args) {
        let id, num, equip_rarity;
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            id = args[0].id;
            num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            equip_rarity = keys[0];
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            id = args[0];
            num = args[1];
            equip_rarity = args[2];
        }
        let ret = this.backpack_items.Player_get_item(id, num, equip_rarity);
        if (ret >= 0) {
            //物品添加正常，记录日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_get_item_game_log(id, num, equip_rarity);
            //背包物品变动，刷新背包界面
            updata_BP_value();
        }
    }
    //给玩家背包添加物品，不触发日志的接口
    Player_get_item_nolog(...args) {
        let id, num, equip_rarity;
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            id = args[0].id;
            num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            equip_rarity = keys[0];
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            id = args[0];
            num = args[1];
            equip_rarity = args[2];
        }
        let ret = this.backpack_items.Player_get_item(id, num, equip_rarity);
    }

    //从玩家背包里去掉武器装备
    Player_lose_Equipment(...args) {
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            let id = args[0].id;
            let num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            let equip_rarity = keys[0];
            this.backpack_items.Player_lose_Equipment(id, num, equip_rarity);
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            this.backpack_items.Player_lose_Equipment(args[0], args[1], args[2]);
        }
    }
    //穿戴一件装备
    worn_Equipment(id, num, equip_rarity) {
        //校验装备参数是否合法
        if (!check_Equipment(id, equip_rarity)) {
            return 0;
        }
        //脱下身上即将穿戴的目标位置的原装备
        let raw_worn_E = new Object();
        this.worn_EQP.Remove_worn_Equipment(id, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!is_Empty_Object(raw_worn_E[key])) {
                this.Player_get_item_nolog(raw_worn_E[key]);
            }
        }
        //将装备放到身上装备栏里对应的位置
        this.worn_EQP.worn_Equipment(id, num, equip_rarity);
        //背包物品变动，刷新背包界面
        updata_BP_value();
    }
    //脱掉一件装备
    remove_worn_Equipment(wp) {
        //脱下身上指定位置的装备
        let raw_worn_E = new Object();
        this.worn_EQP.Remove_position_Equipment(wp, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!is_Empty_Object(raw_worn_E[key])) this.Player_get_item_nolog(raw_worn_E[key]);
        }
        //背包物品变动，刷新背包界面
        updata_BP_value();
    }
    //根据玩家当前的加成更新属性
    updata_attr(active_reset_flag) {
        //获取当前穿戴的装备
        let worn_EQP = this.worn_EQP.get_worn_EQP();
        //更新装备的属性加成
        this.attributes.Summary_worn_EQP_attr(worn_EQP);
        //更新玩家穿戴的装备类型
        this.attributes.Summary_worn_EQP_weapon_type(worn_EQP);

        //获取当前拥有的技能
        //更新技能的加成

        //更新最终属性
        this.attributes.updata_end_attr();
        //将最终属性更新到其他会用的地方
        let end_attr = this.attributes.get_end_attr();
        this.ASkill_Manage.updata_player_data(end_attr, active_reset_flag);
    }
    //游戏运行一帧，计算玩家相关内容
    run_game_FPS() {
        //玩家主动技能
        this.ASkill_Manage.run_player_active_skill();
        //玩家被动技能

        //玩家临时buff
    }
}

var player = new Player_Object();

export { player };
