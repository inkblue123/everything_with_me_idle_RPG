'use strict';
import { is_Empty_Object, get_uniqueArr } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';
import { player } from '../Player.js';
import { global } from '../../GameRun/global_manage.js';

export class Player_energy_manage {
    constructor() {
        this.surface_energy_point = 100; //表层精力当前值
        this.surface_energy_recover = 1; //表层精力恢复速度，初始1点每秒

        this.deep_energy_point = 100; //深层精力当前值
        this.deep_energy_max = 100; //深层精力最大值
        this.deep_energy_use_ratio = 20; //深层精力消耗比例（初始20，表示表层精力每恢复20点，深层精力可用最大值扣掉1点）
        this.deep_energy_recover = 0.25; //深层精力恢复速度，初始0.25点每秒

        this.last_recover_time = 0; //上次恢复精力的时间
        this.tip_ENP_change_time = 0; //上次精力条详情提示框的文本更新时间
    }
    //初始化玩家属性
    init() {
        this.last_recover_time = global.get_game_now_time();
    }
    //获取玩家属性部分的游戏存档
    save_Player_energy() {
        let Player_energy_save = new Object();
        Player_energy_save.surface_energy_point = this.surface_energy_point;
        Player_energy_save.deep_energy_point = this.deep_energy_point;
        return Player_energy_save;
    }
    //加载玩家属性部分的游戏存档
    load_Player_energy(Player_energy_save) {
        if (is_Empty_Object(Player_energy_save)) {
            return;
        }
        this.deep_energy_point = Player_energy_save.deep_energy_point;
        this.surface_energy_point = Player_energy_save.surface_energy_point;
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
        } else if (id == 'deep_energy_point') {
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
        if (id == 'surface_energy_ratio') {
            return this.get_surface_energy_ratio();
        } else {
            return this[id];
        }
    }
    //改变精力相关的属性，变化量是value
    change_energy_attr(id, value) {
        if (!enums['energy_attr'].includes(id)) {
            console.log('%s属性不属于精力相关的属性，不可以修改，也不应该调用到当前函数', id);
            return 0;
        }
        let front_surface_energy_ratio = this.get_surface_energy_ratio();

        this[id] += value;

        if (id == 'surface_energy_point') {
            //表层精力当前值最大不能超过深层精力最大值*2，最小不能小于0
            if (this[id] > this.deep_energy_max * 2) {
                this[id] = this.deep_energy_max * 2;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'deep_energy_point') {
            //深层精力当前值
            //最大不能超过深层精力最大值，最小不能小于0
            if (this[id] > this.deep_energy_max) {
                this[id] = this.deep_energy_max;
            }
            if (this[id] < 0) {
                this[id] = 0;
            }
        } else if (id == 'surface_energy_recover' || id == 'deep_energy_max' || id == 'deep_energy_use_ratio' || id == 'deep_energy_recover') {
            //表层精力恢复速度，深层精力最大值，深层精力消耗比例，深层精力恢复速度
            //不能小于0
            if (this[id] < 0) {
                this[id] = 0;
            }
        }

        let after_surface_energy_ratio = this.get_surface_energy_ratio();
        //表层精力跨过了特定比例的时候，玩家会获得和失去buff
        this.get_or_delete_energy_buff(front_surface_energy_ratio, after_surface_energy_ratio);
    }
    //使用value点精力
    use_energy_point(value) {
        if (this.surface_energy_point >= value) {
            //表层精力当前值足够，正常使用
            value = value * -1;
            this.change_energy_attr('surface_energy_point', value);
            return true;
        } else {
            //表层精力当前值不够，如果精力值超过需要的一半，也可以使用，之后精力值设置为0
            if (this.surface_energy_point >= value / 2) {
                value = this.surface_energy_point * -1;
                this.change_energy_attr('surface_energy_point', value);
                return true;
            } else {
                return false;
            }
        }
    }
    //随时间自然恢复精力
    recover_energy_point() {
        if (this.surface_energy_point >= this.deep_energy_point) {
            //表层精力满了，不用恢复
            return;
        }
        let rest_flag = global.get_flag('GS_rest_flag');
        let GS_flag = global.get_flag('GS_game_statu');
        let game_now_time = global.get_game_now_time();
        let time_in = game_now_time - this.last_recover_time;
        this.last_recover_time = game_now_time;

        if (GS_flag == 'NULL' && rest_flag == true) {
            let deep_recover = 0;
            let surface_recover = 0;
            //当前没有战斗也没有处于生活技能时，同时还处于休息状态，以100%效率恢复表层和深层精力
            if (this.deep_energy_point >= this.deep_energy_max) {
                //深层精力满了，不用恢复深层精力
            } else {
                deep_recover = this.deep_energy_recover * (time_in / 1000); //深层精力恢复值
                //防止自然恢复的精力超过上限
                if (deep_recover + this.deep_energy_point > this.deep_energy_max) {
                    deep_recover = this.deep_energy_max - this.deep_energy_point;
                }
                this.change_energy_attr('deep_energy_point', deep_recover);
            }
            if (this.surface_energy_point >= this.deep_energy_point) {
                //表层精力满了，不用恢复
            } else {
                surface_recover = this.surface_energy_recover * (time_in / 1000); //表层精力恢复值
                //防止自然恢复的精力超过上限
                if (surface_recover + this.surface_energy_point > deep_recover + this.deep_energy_point) {
                    surface_recover = deep_recover + this.deep_energy_point - this.surface_energy_point;
                }
                this.change_energy_attr('surface_energy_point', surface_recover);
            }
        } else if (GS_flag == 'NULL' || rest_flag == true) {
            //当前处于休息状态时，或者什么都没做，恢复表层精力
            if (this.surface_energy_point >= this.deep_energy_point) {
                //表层精力已满，不用处理
                return;
            }
            this.recover_surface_energy_point(time_in);
        } else if (GS_flag == 'fishing') {
            //钓鱼的等鱼上钩阶段，也允许恢复表层精力
            let live_plan_manage = global.get_live_plan_manage();
            let fishing_manage = live_plan_manage.get_EC_live_skill_manage('fishing_manage');
            let FIS_status = fishing_manage.get_now_FIS_status();
            //钓鱼中的休息状态为数字枚举2和6
            if (FIS_status != 2 && FIS_status != 6) {
                return;
            }
            this.recover_surface_energy_point(time_in);
        } else if (GS_flag == 'logging') {
            //伐木时的休息状态也允许恢复表层精力
            let live_plan_manage = global.get_live_plan_manage();
            let logging_manage = live_plan_manage.get_EC_live_skill_manage('logging_manage');
            let LGI_status = logging_manage.get_now_LGI_status();
            //伐木中的休息状态为数字枚举4
            if (LGI_status != 4) {
                return;
            }
            this.recover_surface_energy_point(time_in);
        } else {
            //其他状态不恢复精力，不处理
        }

        return;
    }
    //恢复time_in时间内的表层精力
    recover_surface_energy_point(time_in) {
        let surface_recover = this.surface_energy_recover * (time_in / 1000); //表层精力恢复值
        let deep_energy_use = (surface_recover / this.deep_energy_use_ratio) * -1; //深层精力消耗值
        if (surface_recover + this.surface_energy_point > this.deep_energy_point + deep_energy_use) {
            surface_recover = this.deep_energy_point + deep_energy_use - this.surface_energy_point;
        }
        this.change_energy_attr('surface_energy_point', surface_recover);
        this.change_energy_attr('deep_energy_point', deep_energy_use);
    }
    //判断玩家此刻是否应该获得精力相关的buff
    get_or_delete_energy_buff(front_surface_energy_ratio, after_surface_energy_ratio) {
        let P_buff = player.get_player_buff();
        if (front_surface_energy_ratio < 25 && 25 < after_surface_energy_ratio) {
            P_buff.delete_buff_attr('extreme_fatigue');
            P_buff.set_buff_attr('fatigue');
        } else if (front_surface_energy_ratio < 50 && 50 < after_surface_energy_ratio) {
            P_buff.delete_buff_attr('fatigue');
        } else if (front_surface_energy_ratio < 100.5 && 100.5 < after_surface_energy_ratio) {
            P_buff.set_buff_attr('energetic');
        } else if (after_surface_energy_ratio < 25 && 25 < front_surface_energy_ratio) {
            P_buff.delete_buff_attr('fatigue');
            P_buff.set_buff_attr('extreme_fatigue');
        } else if (after_surface_energy_ratio < 50 && 50 < front_surface_energy_ratio) {
            P_buff.set_buff_attr('fatigue');
        } else if (after_surface_energy_ratio < 100.5 && 100.5 < front_surface_energy_ratio) {
            P_buff.delete_buff_attr('energetic');
        }
    }
    //获取当前表层精力拥有量百分比
    get_surface_energy_ratio() {
        let surface_energy_ratio;
        if (this.surface_energy_point == 0) {
            surface_energy_ratio = 0;
        } else {
            surface_energy_ratio = (this.surface_energy_point / this.deep_energy_max) * 100;
            surface_energy_ratio = surface_energy_ratio.toFixed(2);
        }
        return surface_energy_ratio;
    }
    //获取当前深层精力拥有量百分比
    get_deep_energy_ratio() {
        let deep_energy_ratio;
        if (this.deep_energy_point == 0) {
            deep_energy_ratio = 0;
        } else {
            deep_energy_ratio = (this.deep_energy_point / this.deep_energy_max) * 100;
            deep_energy_ratio = deep_energy_ratio.toFixed(2);
        }
        return deep_energy_ratio;
    }
    //判断表层精力是否满了
    judge_surface_energy_max() {
        if (this.surface_energy_point >= this.deep_energy_point) {
            return true;
        } else {
            return false;
        }
    }

    //更新精力条
    updata_ENP_bar_div() {
        let surface_energy_ratio; //表层精力条长度
        let deep_energy_ratio; //深层精力条长度
        let threshold_25, threshold_50, threshold_100; //精力阈值位置

        if (this.surface_energy_point <= this.deep_energy_max) {
            //表层精力比较少，以深层精力最大值为100%的基础
            surface_energy_ratio = this.get_surface_energy_ratio();
            surface_energy_ratio = surface_energy_ratio * 0.995;
            surface_energy_ratio = surface_energy_ratio + '%';

            deep_energy_ratio = this.get_deep_energy_ratio();
            deep_energy_ratio = deep_energy_ratio * 0.995;
            deep_energy_ratio = deep_energy_ratio + '%';
            //精力阈值正常，最大值等同深层精力最大比例
            threshold_25 = '25%';
            threshold_50 = '50%';
            threshold_100 = '99%'; //表层精力最大为99.5%，阈值div宽1%，
        } else {
            //表层精力比较多，以表层精力当前值作为100%的基础
            //在div布局里左侧依旧隔开1%，右侧顶格
            surface_energy_ratio = '99.5%';
            //深层精力以表层精力为基础计算比例
            let deep_energy_ratio_num = (this.deep_energy_point / this.surface_energy_point) * 100;
            deep_energy_ratio_num = deep_energy_ratio_num.toFixed(2);
            deep_energy_ratio = deep_energy_ratio_num + '%';

            //精力阈值最大值等同深层精力最大比例
            threshold_25 = deep_energy_ratio_num * 0.25 - 0.5;
            threshold_25 = threshold_25 + '%';
            threshold_50 = deep_energy_ratio_num * 0.5 - 0.5;
            threshold_50 = threshold_50 + '%';
            threshold_100 = deep_energy_ratio_num - 0.5;
            threshold_100 = threshold_100 + '%';
        }
        //表层精力进度条
        const surface_ENP_current = document.getElementById('surface_ENP_current');
        if (surface_ENP_current.dataset.bar_ratio != surface_energy_ratio) {
            surface_ENP_current.style.width = surface_energy_ratio;
            surface_ENP_current.dataset.bar_ratio = surface_energy_ratio;
        }
        //深层精力进度条
        const deep_ENP_current = document.getElementById('deep_ENP_current');
        if (deep_ENP_current.dataset.bar_ratio != deep_energy_ratio) {
            deep_ENP_current.style.width = deep_energy_ratio;
            deep_ENP_current.dataset.bar_ratio = deep_energy_ratio;
        }
        //三个精力阈值的位置
        const ENP_threshold_25 = document.getElementById('ENP_threshold_25');
        if (ENP_threshold_25.dataset.bar_ratio != threshold_25) {
            ENP_threshold_25.style.left = threshold_25;
            ENP_threshold_25.dataset.bar_ratio = threshold_25;
        }
        const ENP_threshold_50 = document.getElementById('ENP_threshold_50');
        if (ENP_threshold_50.dataset.bar_ratio != threshold_50) {
            ENP_threshold_50.style.left = threshold_50;
            ENP_threshold_50.dataset.bar_ratio = threshold_50;
        }
        const ENP_threshold_100 = document.getElementById('ENP_threshold_100');
        if (ENP_threshold_100.dataset.bar_ratio != threshold_100) {
            ENP_threshold_100.style.left = threshold_100;
            ENP_threshold_100.dataset.bar_ratio = threshold_100;
        }
        //精力数值
        let energy_ratio = this.get_surface_energy_ratio();
        energy_ratio = Math.floor(energy_ratio);
        energy_ratio = '精力：' + energy_ratio + '%';
        const ENP_number = document.getElementById('ENP_number');
        if (ENP_number.dataset.bar_ratio != energy_ratio) {
            ENP_number.innerHTML = energy_ratio;
            ENP_number.dataset.bar_ratio = energy_ratio;
        }

        //如果鼠标移到了精力条上，显示了精力详情提示框，这里要一起更新
        let Tooltip = document.getElementById('tooltip');
        if (Tooltip.type != 'ENP_bar') {
            return;
        }
        // let game_now_time = global.get_game_now_time();
        // if (game_now_time - this.tip_ENP_change_time < 1000) {
        //     return; //防止频繁刷新，每秒更新一次
        // }
        //提示框的表层精力条
        let tip_surface_ENP_num = Tooltip.querySelector('#tip_surface_ENP_num');
        tip_surface_ENP_num.innerHTML = '表层精力值：' + Math.floor(this.surface_energy_point);
        let tip_surface_ENP_bar = Tooltip.querySelector('#tip_surface_ENP_bar');
        tip_surface_ENP_bar.style.width = surface_energy_ratio;
        //提示框的深层精力条
        let tip_deep_ENP_num = Tooltip.querySelector('#tip_deep_ENP_num');
        tip_deep_ENP_num.innerHTML = '深层精力值：' + Math.floor(this.deep_energy_point);
        let tip_deep_ENP_bar = Tooltip.querySelector('#tip_deep_ENP_bar');
        tip_deep_ENP_bar.style.width = deep_energy_ratio;
        //提示框的精力上限
        let tip_ENMax_num = Tooltip.querySelector('#tip_ENMax_num');
        tip_ENMax_num.innerHTML = '深层精力上限：' + Math.floor(this.deep_energy_max);
        let tip_ENMax_bar = Tooltip.querySelector('#tip_ENMax_bar');
        let tip_ENMax_bar_ratio;
        if (this.surface_energy_point <= this.deep_energy_max) {
            tip_ENMax_bar_ratio = '99.5%';
        } else {
            tip_ENMax_bar_ratio = (this.deep_energy_point / this.surface_energy_point) * 100;
        }
        tip_ENMax_bar.style.width = tip_ENMax_bar_ratio;
        //其他精力属性的提示文本
        let surface_ENP_ratio = Math.floor(this.get_surface_energy_ratio());
        let tip_ENP_text = Tooltip.querySelector('#tip_ENP_text');
        let ch = '';
        ch = ch + '表层精力值自然恢复最大为深层精力值的100%<br>';
        ch = ch + '表层精力恢复速度：' + this.surface_energy_recover + '/s<br>';
        ch = ch + '深层精力恢复速度：' + this.deep_energy_recover + '/s<br>';
        ch = ch + '精力消耗比例：每自然恢复' + this.deep_energy_use_ratio + '表层精力消耗1深层精力<br>';
        ch = ch + '当前表层精力占精力上限的比例：' + Math.floor(surface_ENP_ratio) + '%';
        if (surface_ENP_ratio < 25) {
            ch = ch + '，处于极度疲劳<br>';
            ch = ch + '（极度疲劳：全属性降低50%）<br>';
        } else if (surface_ENP_ratio >= 25 && surface_ENP_ratio < 50) {
            ch = ch + '，处于疲劳<br>';
            ch = ch + '（疲劳：全生活属性降低20%）<br>';
        } else if (surface_ENP_ratio >= 100.5) {
            ch = ch + '，处于精力充沛<br>';
            ch = ch + '（精力充沛：全属性增加20%）<br>';
        }
        // ch = ch + '精力模块<br>';//测试

        tip_ENP_text.innerHTML = ch;
        //更新完毕，重置时间
        // this.tip_ENP_change_time = game_now_time;
    }
}
