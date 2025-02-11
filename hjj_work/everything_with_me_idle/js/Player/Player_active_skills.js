'use strict';
import { P_skills } from '../Data/Skill/Skill.js';
import { global } from '../GameRun/global_class.js';
import { isEmptyObject } from '../Function/Function.js';
import { get_Askill_base_attr } from '../Function/math_func.js';
import { get_object_only_key } from '../Function/Get_func.js';

const MAX_slot_num = 9;
const MIN_slot_num = 3;

class Player_active_skill {
    constructor(id = 0) {
        this.id = id; //唯一技能id
        this.slot_num = 0; //这一个槽属于技能的第几个部分
    }
}
class Attack_effect {
    constructor() {
        this.number_times = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
    }
}

export class Player_active_skills_Manage {
    constructor() {
        this.active_slot_num; //主动技能槽数量
        this.active_slots = new Object(); //主动技能槽内容
        this.player_end_attr = new Object(); //角色最终属性

        this.round_start_time; //当前回合开始时间
        this.now_time; //当前时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.max_round_time = 9000; //当前回合最大时间
        this.last_run_slot; //上一个运行完毕的槽的编号
        this.last_run_time; //上一次运行的时间
        this.player_end_attr = new Object(); //玩家最终属性拷贝，方便调用
        this.naxt_Attack_effect = new Attack_effect();
    }
    //初始化主动技能槽
    init(slot_num = 3) {
        if (slot_num < MIN_slot_num || slot_num > MAX_slot_num) {
            //错误的槽数量，强制重置成3
            slot_num = 3;
        }
        this.active_slot_num = slot_num;
        for (let i = 0; i < slot_num; i++) {
            this.active_slots[i] = new Object();
        }
        this.now_time = global.get_game_now_time();
        this.max_round_time = 9000;
        this.reset_round();
    }
    //新增一个槽位
    add_slot() {
        if (slot_num == MAX_slot_num) {
            //已经达到最大，不操作
            return;
        }
        slot_num++;
        active_slots[slot_num - 1] = new Object();
    }
    //清空所有主动技能槽
    delete_all_slots() {
        //清空原本内容
        this.active_slots = new Object();
        for (let i; i < slot_num; i++) {
            active_slots[i] = new Object();
        }
    }
    //获取当前拥有的技能槽数量
    get_slot_num() {
        return this.active_slot_num;
    }
    //在第slot_id个主动技能槽的位置开始，摆放skill_id技能
    set_active_skill(skill_id, slot_id) {
        let skill = P_skills[skill_id];
        let flag = true;
        if (slot_id + 1 + (skill.need_slot_num - 1) > this.active_slot_num) {
            //设置的技能需要过多的技能槽，当前slot_id位置摆不下，设置失败
            return false;
        }
        for (let i = 0; i < skill.need_slot_num; i++) {
            if (!isEmptyObject(this.active_slots[slot_id + i])) {
                flag = false;
            }
        }
        if (flag == false) {
            //主动技能槽已经被占据
            //暂时算作设置失败
            return false;
        }
        //校验通过，可以设置主动技能
        for (let i = 0; i < skill.need_slot_num; i++) {
            this.active_slots[slot_id + i] = new Player_active_skill(skill_id);
            this.active_slots[slot_id + i].slot_num = i;
        }
    }
    //获取所有主动技能槽的内容
    get_active_slots() {
        return this.active_slots;
    }
    //获取当前使用了的最靠后的技能槽是第几个
    get_use_active_slots_num() {
        let end = 0;
        for (let i = 0; i < this.active_slot_num; i++) {
            if (!isEmptyObject(this.active_slots[i])) {
                end = i + 1;
            }
        }
        return end;
    }
    //更新角色属性
    updata_player_data(player_end_attr, reset_flag) {
        this.player_end_attr = player_end_attr;
        //属性变化之后，连带的参数更新
        let use_slots_num = this.get_use_active_slots_num();
        if (use_slots_num == 0) {
            //主动技能槽全空，在跑进度条的时候视作全满
            this.max_round_time = this.player_end_attr.attack_speed * this.active_slot_num * 1000;
        } else {
            this.max_round_time = this.player_end_attr.attack_speed * use_slots_num * 1000;
        }
        //是否需要重置当前回合
        if (reset_flag) {
            this.reset_round();
        }
    }
    //重置当前回合，重置相关参数
    reset_round() {
        this.round_start_time = global.get_game_now_time();
        this.now_round_time = 0;
        this.last_run_slot = -1;
        this.naxt_Attack_effect = new Attack_effect();
        this.updata_player_active_time_bar();
    }
    //重置玩家攻击
    reset_player_Attack_effect() {
        this.naxt_Attack_effect = new Attack_effect();
    }
    //计算主动技能进度条的进度
    updata_player_active_time_bar() {
        let use_slots_num = this.get_use_active_slots_num();
        let max_ratio = 100 * (use_slots_num / this.active_slot_num);
        let bar_ratio = (this.now_round_time / this.max_round_time) * max_ratio;
        if (bar_ratio > max_ratio) {
            bar_ratio = max_ratio;
        }
        const active_time_bar = document.getElementById('active_time_bar');
        active_time_bar.children[0].children[0].style.width = `${bar_ratio}%`;
    }
    //判断当前运行的槽中的技能是否准备就绪
    judge_active_start() {
        let now_run_slot = Math.floor(this.now_round_time / (this.player_end_attr.attack_speed * 1000));
        if (now_run_slot != this.last_run_slot) {
            for (let i = this.last_run_slot; i <= now_run_slot; i++) {
                if (i == -1 || isEmptyObject(this.active_slots[i])) {
                    continue;
                }
                let id = this.active_slots[i].id;
                let slot_num = this.active_slots[i].slot_num;
                let start_time = P_skills[id].start_time[slot_num];
                if (start_time == 'start') {
                    //当前技能应该在当前攻速时间的启动时激活
                    this.last_run_slot = i;
                    return i;
                } else if (start_time == 'end') {
                    //当前技能应该在当前攻速时间的结束时激活，也就是下一个攻速时间的开始时
                    if (this.last_run_slot + 1 < now_run_slot) {
                        this.last_run_slot = i;
                        return i;
                    } else {
                        continue;
                    }
                } else if (start_time == 'continued') {
                    //当前技能应该在当前攻速时间内全程激活
                    if (i == now_run_slot) {
                        return i;
                    } else {
                        this.last_run_slot = i;
                        continue;
                    }
                }
            }
        }
        return -1;
    }
    //激活玩家的第i个主动技能
    start_player_active(start_slot) {
        if (isEmptyObject(this.active_slots[start_slot])) {
            //这个槽中没有技能，不运行
            return true;
        }
        let id = this.active_slots[start_slot].id;
        let slot_num = this.active_slots[start_slot].slot_num;
        //计算主动技能需要的玩家属性
        let askill_base_attr = get_Askill_base_attr(P_skills[id].base_attr[slot_num], this.player_end_attr);
        //计算主动技能应该得到的效果
        let Askill_algorithm = P_skills[id].algorithm[slot_num];
        Askill_algorithm(askill_base_attr, this.naxt_Attack_effect);
        //计算玩家装备的额外效果

        //根据主动技能类型，产生这次效果
        if (P_skills[id].active_type[slot_num] == 'attack') {
            //攻击类技能，现在已经计算完毕，输出到战斗管理类中，准备执行该次攻击
            let combat_manage = global.get_combat_manage();
            combat_manage.set_player_next_attack(this.naxt_Attack_effect);
            this.reset_player_Attack_effect();
        }
    }
    //游戏运行一帧，计算主动技能部分内容
    run_player_active_skill() {
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;
        //计算主动技能进度条的进度
        this.updata_player_active_time_bar();
        //如果运行到某个技能准备就绪
        let start_slot = this.judge_active_start();
        if (start_slot != -1) {
            this.start_player_active(start_slot);
            // console.log(`${start_slot}`);
        }
        //如果运行到一回合结束，
        if (this.now_round_time >= this.max_round_time) {
            //重置时间，循环到下一回合
            this.reset_round();
        }
    }
}
