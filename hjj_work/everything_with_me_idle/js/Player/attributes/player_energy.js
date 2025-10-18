'use strict';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';

export class Player_energy_manage {
    constructor() {
        this.surface_energy_point = 100; //表层精力当前值
        this.surface_energy_max = 100; //表层精力最大值
        this.surface_energy_recover = 1; //表层精力恢复速度，初始1点每秒

        this.deep_energy_point = 100; //深层精力当前值
        this.deep_energy_max = 100; //深层精力最大值
        this.deep_energy_use_ratio = 20; //深层精力消耗比例（初始20，表示表层精力每恢复20点，深层精力可用最大值扣掉1点）
        this.deep_energy_recover = 0.25; //深层精力恢复速度，初始0.25点每秒
    }
    //初始化玩家属性
    init() {}
    //获取玩家属性部分的游戏存档
    save_Player_energy() {
        let Player_energy_save = new Object();
        return Player_energy_save;
    }
    //加载玩家属性部分的游戏存档
    load_Player_energy(Player_energy_save) {
        if (is_Empty_Object(Player_energy_save)) {
            return;
        }
    }
    //将精力相关的属性设置成value值
    set_energy_attr(id, value) {
        if (!enums['energy_attr'].includes(id)) {
            console.log('%s属性不属于精力相关的属性，不可以修改，也不应该调用到当前函数', id);
            return;
        }
        this[id] = value;

        if (id == 'surface_energy_point') {
            //表层精力当前值最大不能超过深层精力最大值*2，最小不能小于0
            if (this[id] > this.deep_energy_max * 2) {
                this[id] = this.deep_energy_max * 2;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'surface_energy_max' || id == 'deep_energy_point') {
            //表层精力最大值，深层精力当前值
            //最大不能超过深层精力最大值，最小不能小于0
            if (this[id] > this.deep_energy_max) {
                this[id] = this.deep_energy_max;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'surface_energy_recover' || id == 'deep_energy_max' || id == 'deep_energy_use_ratio' || id == 'deep_energy_recover') {
            //表层精力恢复速度，深层精力最大值
            //不能小于0
            if (this[id] < 0) {
                this[id] = 0;
            }
        }
    }
    //获取精力相关属性的数值
    get_energy_attr(id) {
        if (!enums['energy_attr'].includes(id)) {
            console.log('%s属性不属于精力相关的属性，不可以获取，也不应该调用到当前函数', id);
            return 0;
        }
        return this[id];
    }
    //改变精力相关的属性，变化量是value
    change_energy_attr(value) {
        if (!enums['energy_attr'].includes(id)) {
            console.log('%s属性不属于精力相关的属性，不可以修改，也不应该调用到当前函数', id);
            return 0;
        }
        this[id] += value;

        if (id == 'surface_energy_point') {
            //表层精力当前值最大不能超过深层精力最大值*2，最小不能小于0
            if (this[id] > this.deep_energy_max * 2) {
                this[id] = this.deep_energy_max * 2;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'surface_energy_max' || id == 'deep_energy_point') {
            //表层精力最大值，深层精力当前值
            //最大不能超过深层精力最大值，最小不能小于0
            if (this[id] > this.deep_energy_max) {
                this[id] = this.deep_energy_max;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'surface_energy_recover' || id == 'deep_energy_max' || id == 'deep_energy_use_ratio' || id == 'deep_energy_recover') {
            //表层精力恢复速度，深层精力最大值
            //不能小于0
            if (this[id] < 0) {
                this[id] = 0;
            }
        }
    }
    //使用value点精力
    use_energy_point(value) {
        if (this.surface_energy_point >= value) {
            //表层精力当前值足够，正常使用
            this.surface_energy_point -= value;
            return true;
        } else {
            //表层精力当前值不够，如果精力值超过需要的一半，也可以使用，之后精力值设置为0
            if (this.surface_energy_point >= value / 2) {
                this.surface_energy_point = 0;
                return true;
            } else {
                return false;
            }
        }
    }
}
