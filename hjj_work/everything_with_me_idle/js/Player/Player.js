'use strict';
import { check_Equipment, is_Empty_Object, get_item_id_key, get_item_obj } from '../Function/Function.js';
import { Player_attributes } from './attributes/Player_attributes.js';
import { Player_backpack } from './Player_backpack.js';
import { Player_worn } from './Player_worn.js';
import { Player_active_skills_Manage } from './Player_active_skills.js';
import { Player_skills } from './Player_skill.js';
import { Player_Buff_Manage } from './Player_buff.js';
import { global } from '../GameRun/global_manage.js';
import { items } from '../Data/Item/Item.js';

export class Player_Object {
    constructor() {
        //角色属性
        this.player_attributes = new Object();
        //角色buff
        this.player_buff = new Object();

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
        //玩家buff
        this.player_buff = new Player_Buff_Manage();
        this.player_buff.init();
        //玩家背包
        this.player_backpack = new Player_backpack();
        this.player_backpack.init();
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
        this.updata_end_attr();
    }
    get_player_attributes() {
        return this.player_attributes;
    }
    get_player_attributes_data_attr() {
        return this.player_attributes.data_attr;
    }
    get_player_attributes_player_energy() {
        return this.player_attributes.player_energy;
    }
    get_player_buff() {
        return this.player_buff;
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
    get_player_All_passive_skills() {
        return this.player_skills.passive_skills;
    }
    get_player_All_active_skills() {
        return this.player_skills.active_skills;
    }
    //给玩家背包添加物品
    Player_get_item(...args) {
        let item_obj;
        if (typeof args[0] == 'object') {
            //输入的是一个物品对象，不需要额外处理
            item_obj = args[0];
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息，需要转换成物品对象
            let id = args[0];
            let num = args[1];
            if (items[id].main_type.includes('equipment')) {
                //物品是装备，args内参数的含义按以下顺序排列：
                //稀有度
                let equip_rarity = args[2];
                item_obj = get_item_obj(id, num, equip_rarity);
            } else if (items[id].main_type.includes('material')) {
                item_obj = get_item_obj(id, num);
                //物品是材料，没有独特属性
            } else if (items[id].main_type.includes('consumable')) {
                //物品是消耗品，args内参数的含义按以下顺序排列：
                //暂无
                item_obj = get_item_obj(id, num);
            }
        }
        let ret = this.player_backpack.Player_get_item(item_obj);
        if (ret >= 0) {
            //物品添加正常，记录日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('get_item', item_obj);
            //背包物品变动，刷新背包界面
            this.player_backpack.updata_BP_value();
        }
    }
    //给玩家背包添加物品，不触发日志的接口
    Player_get_item_nolog(...args) {
        let item_obj;
        if (typeof args[0] == 'object') {
            //输入的是一个物品对象，不需要额外处理
            item_obj = args[0];
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息，需要转换成物品对象
            let id = args[0];
            let num = args[1];
            if (items[id].main_type.includes('equipment')) {
                //物品是装备，args内参数的含义按以下顺序排列：
                //稀有度
                let equip_rarity = args[2];
                item_obj = get_item_obj(id, num, equip_rarity);
            } else if (items[id].main_type.includes('material')) {
                item_obj = get_item_obj(id, num);
                //物品是材料，没有独特属性
            } else if (items[id].main_type.includes('consumable')) {
                //物品是消耗品，args内参数的含义按以下顺序排列：
                //暂无
                item_obj = get_item_obj(id, num);
            }
        }

        let ret = this.player_backpack.Player_get_item(item_obj);
        if (ret >= 0) {
            //背包物品变动，刷新背包界面
            this.player_backpack.updata_BP_value();
        }
    }
    //从玩家背包里去掉指定物品
    Player_lose_item(...args) {
        let item_obj;
        if (typeof args[0] == 'object') {
            //输入的是一个物品对象，不需要额外处理
            item_obj = args[0];
        } else {
            // 有多个参数，输入的是物品的id、数量、稀有度等等信息，需要转换成物品对象
            let id = args[0];
            let num = args[1];
            if (items[id].main_type.includes('equipment')) {
                //物品是装备，args内参数的含义按以下顺序排列：
                //稀有度
                let equip_rarity = args[2];
                item_obj = get_item_obj(id, num, equip_rarity);
            } else if (items[id].main_type.includes('material')) {
                item_obj = get_item_obj(id, num);
                //物品是材料，没有独特属性
            } else if (items[id].main_type.includes('consumable')) {
                //物品是消耗品，args内参数的含义按以下顺序排列：
                //暂无
                item_obj = get_item_obj(id, num);
            }
        }
        this.player_backpack.Player_lose_item(item_obj);
    }

    //穿戴一件装备
    worn_Equipment(item_obj) {
        //校验装备参数是否合法
        if (!check_Equipment(item_obj.id, item_obj.equip_rarity)) {
            return 0;
        }
        let id = item_obj.id;
        //脱下身上即将穿戴的目标位置的原装备
        let raw_worn_E = new Object();
        this.player_worn.Remove_worn_Equipment(id, raw_worn_E);
        for (let key in raw_worn_E) {
            //如果原位置已有装备，则将原装备放回背包
            if (!is_Empty_Object(raw_worn_E[key])) {
                this.Player_get_item_nolog(raw_worn_E[key]);
            }
        }
        //将装备放到身上装备栏里对应的位置
        this.player_worn.worn_Equipment(item_obj);
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
    //更新玩家当前的最终属性，输入的type为更新指定部分的属性，不输入type为更新全部属性
    updata_end_attr(type) {
        //更新最终属性
        this.player_attributes.updata_end_attr(type);
        //将最终数值属性更新到其他会用的地方
        let end_data_attr = this.player_attributes.get_end_data_attr();
        this.player_ASkills_manage.updata_player_data(end_data_attr); //战斗方面属性更新
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_player_data(end_data_attr); //生活技能属性更新
    }
    //游戏运行一帧，计算玩家常态数值变化内容
    run_player_normal() {
        //玩家自然恢复血量魔力精力
        this.player_attributes.recover_HP_MP_ENP();
        //玩家被动技能

        //玩家buff
        this.player_buff.run_player_buff();
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
        //玩家buff
        player_save.Player_buff_save = this.player_buff.save_Player_Buff_attr();
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
        this.player_buff.load_Player_Buff_attr(player_save.Player_buff_save);
        this.player_backpack.load_Player_backpack(player_save.Player_backpack_save);
        this.player_worn.load_Player_worn(player_save.Player_worn_save);
        this.player_skills.load_Player_skills(player_save.Player_skills_save);
        this.player_ASkills_manage.load_Player_ASkills_manage(player_save.Player_ASkills_manage_save);
        this.updata_end_attr();
    }
}

var player = new Player_Object();

export { player };
