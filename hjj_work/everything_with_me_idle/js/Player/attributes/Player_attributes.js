'use strict';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';
import { Data_attr_manage } from './data_attr.js';
import { Player_energy_manage } from './player_energy.js';

export class Player_attributes {
    constructor() {
        this.data_attr = new Data_attr_manage(); //玩家的数值属性
        this.player_energy = new Player_energy_manage(); //玩家精力管理类
    }
    //初始化玩家属性
    init() {
        this.data_attr.init();
        this.player_energy.init();
    }
    //获取玩家属性部分的游戏存档
    save_Player_attributes() {
        let Player_attr_save = new Object();
        Player_attr_save.data_attr_save = this.data_attr.save_Data_attr();
        Player_attr_save.player_energy_save = this.player_energy.save_Player_energy();
        return Player_attr_save;
    }
    //加载玩家属性部分的游戏存档
    load_Player_attributes(Player_attr_save) {
        if (is_Empty_Object(Player_attr_save)) {
            return;
        }
        this.data_attr.load_Data_attr(Player_attr_save.data_attr_save);
        this.player_energy.load_Player_energy(Player_attr_save.player_energy_save);
    }
    //根据id设置玩家的属性，只能设置玩家的属性，不会修改装备上、技能上的属性，
    set_data_attr(id, value) {
        if (enums['energy_attr'].includes(id)) {
            this.player_energy.set_energy_attr(id, value);
        } else {
            this.data_attr.set_data_attr(id, value);
        }
    }
    //根据id改变玩家的属性，改变量是value
    change_data_attr(id, value) {
        if (enums['energy_attr'].includes(id)) {
            this.player_energy.change_energy_attr(id, value);
        } else {
            this.data_attr.change_data_attr(id, value);
        }
    }
    //尝试使用value点精力
    use_energy_point(value) {
        return this.player_energy.use_energy_point(value);
    }
    //判断精力是否满了
    //判断表层精力是否满了
    judge_surface_energy_max() {
        return this.player_energy.judge_surface_energy_max();
    }

    //根据id获取数值属性
    get_data_attr(id) {
        if (enums['energy_attr'].includes(id)) {
            return this.player_energy.get_energy_attr(id);
        } else {
            return this.data_attr.get_data_attr(id);
        }
    }
    //获取最终属性
    get_end_data_attr() {
        return this.data_attr.get_end_data_attr();
    }
    //更新最终属性
    updata_end_attr(type) {
        this.data_attr.updata_end_attr(type);
    }
    //玩家自然恢复血量魔力精力
    recover_HP_MP_ENP() {
        // this.player_health.recover_health_point();//血量
        // this.player_magic.recover_magic_point();//魔力
        this.player_energy.recover_energy_point(); //精力
    }
    //更新玩家红蓝绿资源的界面呈现
    updata_HP_MP_ENP_div() {
        this.updata_HP_bar_div();
        this.updata_MP_bar_div();
        this.player_energy.updata_ENP_bar_div();
    }

    //更新血条上的数值
    updata_HP_bar_div() {
        let health_point = this.get_data_attr('health_point');
        let health_max = this.get_data_attr('health_max');
        let bar_ratio = (health_point / health_max) * 100;
        bar_ratio = bar_ratio.toFixed(2);
        bar_ratio = bar_ratio + '%';
        const HP_bar = document.getElementById('HP_bar');
        if (HP_bar.dataset.bar_ratio != bar_ratio) {
            HP_bar.children[0].children[0].style.width = bar_ratio;
            HP_bar.children[1].innerText = Math.floor(health_point) + '/' + Math.ceil(health_max) + '生命';
            HP_bar.dataset.bar_ratio = bar_ratio;
        }
    }
    //更新魔力条上的数值
    updata_MP_bar_div() {
        let magic_point = this.get_data_attr('magic_point');
        let magic_max = this.get_data_attr('magic_max');
        let bar_ratio = (magic_point / magic_max) * 100;
        bar_ratio = bar_ratio.toFixed(2);
        bar_ratio = bar_ratio + '%';
        const MP_bar = document.getElementById('MP_bar');
        if (MP_bar.dataset.bar_ratio != bar_ratio) {
            MP_bar.children[0].children[0].style.width = bar_ratio;
            MP_bar.children[1].innerText = Math.floor(magic_point) + '/' + Math.ceil(magic_max) + '魔力';
            MP_bar.dataset.bar_ratio = bar_ratio;
        }
    }
}
