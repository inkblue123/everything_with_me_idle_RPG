'use strict';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { get_object_only_key } from '../../Function/Get_func.js';
import { items } from '../../Data/Item/Item.js';
import { enums } from '../../Data/Enum/Enum.js';
import { Data_attr_manage } from './data_attr.js';
import { Buff_attr_manage } from './buff_attr.js';

export class Player_attributes {
    constructor() {
        this.data_attr = new Data_attr_manage(); //玩家的数值属性
        this.buff_attr = new Buff_attr_manage(); //玩家的数值属性
    }
    //初始化玩家属性
    init() {
        this.data_attr.init();
        this.updata_end_attr();
    }
    //获取玩家属性部分的游戏存档
    save_Player_attributes() {
        let Player_attr_save = new Object();
        Player_attr_save.data_attr_save = this.data_attr.save_Data_attr();
        return Player_attr_save;
    }
    //加载玩家属性部分的游戏存档
    load_Player_attributes(Player_attr_save) {
        if (is_Empty_Object(Player_attr_save)) {
            return;
        }
        this.data_attr.load_Data_attr(Player_attr_save.data_attr_save);
    }
    //汇总穿戴的装备上的属性加成
    Summary_worn_EQP_attr(worn_EQP) {
        //装备上的属性
        this.data_attr.Summary_worn_EQP_attr(worn_EQP);
        //手持武器的武器类型
        this.data_attr.Summary_worn_EQP_weapon_type(worn_EQP);
    }
    //根据id设置玩家的属性，只能设置玩家的属性，不会修改装备上、技能上的属性，
    set_data_attr(id, value) {
        return this.data_attr.set_data_attr(id, value);
    }
    //根据id让玩家获得一个buff
    set_buff_attr(value) {
        return this.buff_attr.set_buff_attr(value);
    }
    //根据id获取数值属性
    get_data_attr(id) {
        return this.data_attr.get_data_attr(id);
    }
    //获取最终属性
    get_end_data_attr() {
        return this.data_attr.get_end_data_attr();
    }
    //获取最终属性
    get_end_buff_attr() {
        return this.buff_attr.get_end_buff_attr();
    }
    //更新最终属性
    updata_end_attr() {
        this.data_attr.updata_end_attr();
    }
    //更新血条上的数值
    updata_HP_bar_div() {
        let health_point = this.get_data_attr('health_point');
        let health_max = this.get_data_attr('health_max');

        const HP_bar = document.getElementById('HP_bar');
        HP_bar.children[0].children[0].style.width = `${(health_point / health_max) * 100}%`;
        HP_bar.children[1].innerText = `${Math.floor(health_point)}/${Math.ceil(health_max)} 生命`;
    }
    //更新魔力条上的数值
    updata_MP_bar_div() {
        let magic_point = this.get_data_attr('magic_point');
        let magic_max = this.get_data_attr('magic_max');

        const MP_bar = document.getElementById('MP_bar');
        MP_bar.children[0].children[0].style.width = `${(magic_point / magic_max) * 100}%`;
        MP_bar.children[1].innerText = `${Math.floor(magic_point)}/${Math.ceil(magic_max)} 魔力`;
    }
    //更新精力条上的数值
    updata_ENP_bar_div() {
        let energy_point = this.get_data_attr('energy_point');
        let energy_max = this.get_data_attr('energy_max');

        const ENP_bar = document.getElementById('ENP_bar');
        ENP_bar.children[0].children[0].style.width = `${(energy_point / energy_max) * 100}%`;
        ENP_bar.children[1].innerText = `${Math.floor(energy_point)}/${Math.ceil(energy_max)} 精力`;
    }
}
