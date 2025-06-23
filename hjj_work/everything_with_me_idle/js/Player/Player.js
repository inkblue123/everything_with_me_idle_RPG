'use strict';
import { check_Equipment, is_Empty_Object } from '../Function/Function.js';
import { Player_attributes } from './attributes/Player_attributes.js';
import { Player_backpack } from './Player_backpack.js';
import { Player_worn } from './Player_worn.js';
import { Player_active_skills_Manage } from './Player_active_skills.js';
import { Player_skills } from './Player_skill.js';
import { global } from '../GameRun/global_manage.js';

export class Player_Object {
    constructor() {
        //角色属性
        this.player_attributes = new Object();
        //背包物品
        this.player_backpack = new Object();
        //穿戴的装备
        this.player_worn = new Object();
        //拥有的全部技能
        this.player_skills = new Object();
        //已装载的主动技能
        this.player_ASkills_manage = new Object();
    }

    init() {
        //初始化玩家属性
        this.player_attributes = new Player_attributes();
        this.player_attributes.init();
        //玩家背包
        this.player_backpack = new Player_backpack();
        //初始化身上穿戴的装备
        this.player_worn = new Player_worn();
        this.player_worn.init();
        //玩家所有技能
        this.player_skills = new Player_skills();
        this.player_skills.init();
        //初始化主动技能槽
        this.player_ASkills_manage = new Player_active_skills_Manage();
        this.player_ASkills_manage.init();
        //更新玩家属性
        this.updata_attr();
    }
    get_player_attributes() {
        return this.player_attributes;
    }
    get_player_backpack() {
        return this.player_backpack;
    }
    get_player_worn() {
        return this.player_worn;
    }
    get_player_ASkill_Manage() {
        return this.player_ASkills_manage;
    }
    get_player_All_Skills() {
        return this.player_skills;
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
        let ret = this.player_backpack.Player_get_item(id, num, equip_rarity);
        if (ret >= 0) {
            //物品添加正常，记录日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('get_item', id, num, equip_rarity);
            //背包物品变动，刷新背包界面
            this.player_backpack.updata_BP_value();
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
        let ret = this.player_backpack.Player_get_item(id, num, equip_rarity);
    }
    //从玩家背包里去掉武器装备
    Player_lose_Equipment(...args) {
        if (typeof args[0] == 'object') {
            //输入的是一格物品，是一个Player_Item对象
            let id = args[0].id;
            let num = args[0].num;
            let keys = Object.keys(args[0].rarity);
            let equip_rarity = keys[0];
            this.player_backpack.Player_lose_Equipment(id, num, equip_rarity);
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息
            this.player_backpack.Player_lose_Equipment(args[0], args[1], args[2]);
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
        this.player_worn.Remove_worn_Equipment(id, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!is_Empty_Object(raw_worn_E[key])) {
                this.Player_get_item_nolog(raw_worn_E[key]);
            }
        }
        //将装备放到身上装备栏里对应的位置
        this.player_worn.worn_Equipment(id, num, equip_rarity);
        //背包物品变动，刷新背包界面
        this.player_backpack.updata_BP_value();
    }
    //脱掉一件装备
    remove_worn_Equipment(wp) {
        //脱下身上指定位置的装备
        let raw_worn_E = new Object();
        this.player_worn.Remove_position_Equipment(wp, raw_worn_E);
        let keys = Object.keys(raw_worn_E);
        for (let key of keys) {
            //如果原位置已有装备，则将原装备放回背包
            if (!is_Empty_Object(raw_worn_E[key])) this.Player_get_item_nolog(raw_worn_E[key]);
        }
        //背包物品变动，刷新背包界面
        this.player_backpack.updata_BP_value();
    }
    //根据玩家当前的加成更新属性
    updata_attr(active_reset_flag) {
        //获取当前穿戴的装备
        let player_worn = this.player_worn.get_worn_EQP();
        //更新装备的属性
        this.player_attributes.Summary_worn_EQP_attr(player_worn);

        //获取当前拥有的技能
        //更新技能的加成

        //更新最终属性
        this.player_attributes.updata_end_attr();
        //将最终数值属性更新到其他会用的地方
        let end_data_attr = this.player_attributes.get_end_data_attr();
        this.player_ASkills_manage.updata_player_data(end_data_attr, active_reset_flag);
    }
    //游戏运行一帧，计算玩家常态数值变化内容
    run_player_normal() {
        //玩家被动技能

        //玩家buff
        this.player_attributes.run_player_buff();
    }
    //游戏运行一帧，计算玩家的战斗相关内容
    run_player_combat() {
        //玩家主动技能
        this.player_ASkills_manage.run_player_active_skill();
    }

    //对玩家对象进行存档
    save_player_class() {
        let player_save = new Object();
        //获取每个子对象的存档
        //玩家属性
        player_save.Player_attr_save = this.player_attributes.save_Player_attributes();
        //玩家背包物品
        player_save.Player_backpack_save = this.player_backpack.save_Player_backpack();
        //玩家装备栏
        player_save.Player_worn_save = this.player_worn.save_Player_worn();
        //玩家技能类
        player_save.Player_skills_save = this.player_skills.save_Player_skills();
        //玩家主动技能类
        player_save.Player_ASkills_manage_save = this.player_ASkills_manage.save_Player_ASkills_manage();

        return player_save;
    }
    //加载玩家对象存档
    load_player_class(player_save) {
        this.player_attributes.load_Player_attributes(player_save.Player_attr_save);
        this.player_backpack.load_Player_backpack(player_save.Player_backpack_save);
        this.player_worn.load_Player_worn(player_save.Player_worn_save);
        this.player_skills.load_Player_skills(player_save.Player_skills_save);
        this.player_ASkills_manage.load_Player_ASkills_manage(player_save.Player_ASkills_manage_save);
        this.updata_attr();
    }
}

var player = new Player_Object();

export { player };
