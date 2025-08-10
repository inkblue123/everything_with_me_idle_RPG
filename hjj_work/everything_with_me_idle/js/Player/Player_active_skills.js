'use strict';
import {
    get_Askill_base_attr,
    Attack_effect_algorithm,
    Defense_effect_algorithm,
    format_numbers,
} from '../Function/math_func.js';
import { is_Empty_Object, is_overlap } from '../Function/Function.js';
import { updata_player_active } from '../Function/Updata_func.js';
import { Attack_effect, Defense_effect } from '../GameRun/combat_class.js';
import { global } from '../GameRun/global_manage.js';
import { enums } from '../Data/Enum/Enum.js';
import { P_skills, B_skills } from '../Data/Skill/Skill.js';

const MAX_slot_num = 9;
const MIN_slot_num = 3;

class Player_active_skill {
    constructor(id = 0) {
        this.id = id; //唯一技能id
        this.slot_num = 0; //这一个槽属于技能的第几个部分
        // this.level;
        // this.unlock_flag; //这个技能的解禁情况
    }
    //读取技能数据库，将详细参数拷贝到当前类中
    init_active_skill_data() {
        let id = this.id;
        let slot_num = this.slot_num;
        this.set_raw_skill_data(id, slot_num);
    }
    //读取技能数据库中的id技能slot_num槽位，将原始版本信息拷贝到这里
    set_raw_skill_data(id, slot_num) {
        //
        let B_id = P_skills[id].need_slot_id[slot_num];
        this.active_condition = B_skills[B_id].active_condition; //限制条件
        this.active_type = B_skills[B_id].active_type; //辅助类型
        this.attr_correct = B_skills[B_id].attr_correct; //哪些属性作为基础数值进行计算
        this.algorithm = B_skills[B_id].algorithm; //使用哪个算法进行计算
        this.start_time = B_skills[B_id].start_time; //结束时计算
        this.effect = B_skills[B_id].effect; //技能效果
        this.desc = B_skills[B_id].desc; //技能描述
    }
}
export class Player_active_skills_Manage {
    constructor() {
        this.active_slot_num; //主动技能槽数量
        this.active_slots = new Array(); //主动技能槽内容

        this.now_time; //当前时间
        this.round_start_time; //当前回合开始时间
        this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_run_slot = 0; //当前帧运行到了哪个槽
        this.new_slot_flag = true; //当前帧有没有运行到一个新槽
        this.now_run_slot_time = 0; //当前运行到的槽运行了多久时间
        this.continue_skill_flag = true; //当前槽的技能如果是持续激活技能，是否满足激活条件
        this.any_slot_time = new Array(); //每个槽的技能需要运行的时间

        this.player_end_attr = new Object(); //玩家最终属性拷贝，方便调用
        this.main_Attack = new Attack_effect(); //玩家主手攻击效果
        this.deputy_Attack = new Attack_effect(); //玩家副手攻击效果
        this.other_Attack = new Attack_effect(); //其他可能的攻击效果

        this.main_defense = new Defense_effect(); //玩家主动技能防御效果
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
        this.reset_round();
    }
    //获取玩家主动技能部分的游戏存档
    save_Player_ASkills_manage() {
        let Player_ASkills_manage_save = new Object();
        Player_ASkills_manage_save.active_slot_num = this.active_slot_num; //主动技能槽数量
        Player_ASkills_manage_save.active_slots = new Array(); //主动技能槽内容
        for (let i = 0; i < this.active_slot_num; i++) {
            let slot_skill = new Object();
            if (!is_Empty_Object(this.active_slots[i])) {
                slot_skill.id = this.active_slots[i].id;
                slot_skill.slot_num = this.active_slots[i].slot_num;
            }
            Player_ASkills_manage_save.active_slots.push(slot_skill);
        }
        return Player_ASkills_manage_save;
    }
    //加载玩家主动技能部分的游戏存档
    load_Player_ASkills_manage(Player_ASkills_manage_save) {
        if (is_Empty_Object(Player_ASkills_manage_save)) {
            return;
        }
        //普通参数
        this.active_slot_num = Player_ASkills_manage_save.active_slot_num;
        //每个主动技能槽里的技能，
        for (let i = 0; i < this.active_slot_num; i++) {
            if (is_Empty_Object(Player_ASkills_manage_save.active_slots[i])) {
                continue;
            }
            let id = Player_ASkills_manage_save.active_slots[i].id;
            this.active_slots[i] = new Player_active_skill(id);
            this.active_slots[i].slot_num = Player_ASkills_manage_save.active_slots[i].slot_num;
            this.active_slots[i].init_active_skill_data();
        }
        updata_player_active();
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
            if (!is_Empty_Object(this.active_slots[slot_id + i])) {
                flag = false;
            }
        }
        if (flag == false) {
            //想使用的主动技能槽已经被占据
            //暂时算作设置失败
            return false;
        }
        //校验通过，可以设置主动技能
        for (let i = 0; i < skill.need_slot_num; i++) {
            this.active_slots[slot_id + i] = new Player_active_skill(skill_id);
            this.active_slots[slot_id + i].slot_num = i;
            this.active_slots[slot_id + i].init_active_skill_data();
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
            if (!is_Empty_Object(this.active_slots[i])) {
                end = i + 1;
            }
        }
        return end;
    }
    //获取当前从左到右首个空闲的技能槽是第几个
    get_unuse_active_slots_num() {
        let end = -1;
        for (let i = 0; i < this.active_slot_num; i++) {
            if (is_Empty_Object(this.active_slots[i])) {
                end = i;
                return end;
            }
        }
        return end;
    }
    //获取当前运行到了哪个槽
    get_now_run_slot() {
        let now_run_slot = 0;
        let now_round_time = this.now_round_time;
        for (let i = 0; i < this.active_slot_num; i++) {
            if (now_round_time >= this.any_slot_time[i]) {
                now_run_slot++;
                now_round_time -= this.any_slot_time[i];
            } else {
                break;
            }
        }
        return now_run_slot;
    }
    //一帧开始，更新相关信息
    updata_run_start() {
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;

        let now_run_slot = 0;
        let last_slot = this.now_run_slot;
        let now_run_slot_time = this.now_round_time;
        for (let i = 0; i < this.active_slot_num; i++) {
            if (now_run_slot_time >= this.any_slot_time[i]) {
                now_run_slot++;
                now_run_slot_time -= this.any_slot_time[i];
            } else {
                break;
            }
        }
        if (last_slot != now_run_slot) {
            this.new_slot_flag = true;
            this.continue_skill_flag = true;
        }
        this.now_run_slot = now_run_slot; //当前运行到了哪个槽
        this.now_run_slot_time = now_run_slot_time; //当前运行到的槽运行了多久时间
    }
    //一帧结束，更新相关信息
    updata_run_end() {
        this.new_slot_flag = false;
    }
    //更新角色属性
    updata_player_data(player_end_attr) {
        this.player_end_attr = player_end_attr;
        //属性变化之后，连带的参数更新
        for (let i = 0; i < this.active_slot_num; i++) {
            //如果i槽没有主动技能
            if (is_Empty_Object(this.active_slots[i])) {
                this.any_slot_time[i] = this.player_end_attr.attack_speed * 1000;
                continue;
            }
            //如果i槽的主动技能有设定攻速的属性补正
            if (this.active_slots[i].attr_correct['attack_speed']) {
                let atk_speed_correct = this.active_slots[i].attr_correct['attack_speed'];
                let base_atk_speed = this.player_end_attr.attack_speed * 1000;
                if ((atk_speed_correct.type = 'fixed')) {
                    //固定攻速
                    this.any_slot_time[i] = atk_speed_correct.value;
                } else if ((atk_speed_correct.type = 'ride')) {
                    //影响攻速的乘区
                    this.any_slot_time[i] = base_atk_speed * atk_speed_correct.value;
                }
                continue;
            }
            //没有影响因素，槽的运行时间就等于攻速
            this.any_slot_time[i] = this.player_end_attr.attack_speed * 1000;
        }
        // //是否需要重置当前回合
        // if (reset_flag) {
        //     this.reset_round();
        // }
    }
    //重置当前回合，重置相关参数
    reset_round() {
        this.round_start_time = global.get_game_now_time();
        this.now_round_time = 0;
        this.now_run_slot = 0;
        this.new_slot_flag = true;
        this.continue_skill_flag = true;
        //重置玩家技能效果
        this.reset_active_skill_effect();
    }
    //重置玩家技能效果
    reset_active_skill_effect() {
        this.main_Attack = new Attack_effect();
        this.deputy_Attack = new Attack_effect();
        this.deputy_Attack = new Attack_effect();
        if (!is_Empty_Object(this.player_end_attr)) {
            this.main_Attack.base_damage = this.player_end_attr['attack'];
            this.main_Attack.precision = this.player_end_attr['precision'];
            this.main_Attack.critical_chance = this.player_end_attr['critical_chance'];
            this.main_Attack.critical_damage = this.player_end_attr['critical_damage'];

            this.deputy_Attack.base_damage = this.player_end_attr['attack'];
            this.deputy_Attack.precision = this.player_end_attr['precision'];
            this.deputy_Attack.critical_chance = this.player_end_attr['critical_chance'];
            this.deputy_Attack.critical_damage = this.player_end_attr['critical_damage'];

            this.other_Attack.base_damage = this.player_end_attr['attack'];
            this.other_Attack.precision = this.player_end_attr['precision'];
            this.other_Attack.critical_chance = this.player_end_attr['critical_chance'];
            this.other_Attack.critical_damage = this.player_end_attr['critical_damage'];
        }
        this.main_defense = new Defense_effect();
    }
    //判断当前帧应该处理哪些槽中的技能
    judge_active_start() {
        if (this.new_slot_flag) {
            //这一帧运行到了新槽，属于旧槽的结束和新槽的开始，启动相关逻辑
            let old_slot = this.now_run_slot - 1;
            if (old_slot == -1) {
                //旧槽是-1，意味着当前属于一回合的第一帧，实际上没有旧槽，跳过处理
            } else {
                if (!is_Empty_Object(this.active_slots[old_slot])) {
                    //旧槽有技能，现在应该清除可能的残留效果
                    let combat_manage = global.get_combat_manage();
                    combat_manage.reset_palyer_combat_data();
                    if (this.active_slots[old_slot].start_time == 'end') {
                        //旧槽的技能是结束时触发，也就是现在
                        if (this.judge_active_condition(old_slot)) {
                            //目前运行的技能满足运行条件
                            this.start_player_active(old_slot);
                        }
                    }
                }
            }
            let new_slot = this.now_run_slot;
            if (!is_Empty_Object(this.active_slots[new_slot])) {
                if (this.active_slots[new_slot].start_time == 'start') {
                    //新槽的技能是启动时触发，也就是现在
                    if (this.judge_active_condition(new_slot)) {
                        //目前运行的技能满足运行条件
                        this.start_player_active(new_slot);
                    }
                }
            }
        } else {
            //这一帧运行在某个槽中，只有持续触发类技能需要处理
            let now_slot = this.now_run_slot;
            if (!is_Empty_Object(this.active_slots[now_slot])) {
                if (this.active_slots[now_slot].start_time == 'continue') {
                    //当前槽的技能是持续触发，也就是现在
                    if (this.continue_skill_flag && this.judge_active_condition(now_slot)) {
                        //目前运行的技能满足运行条件
                        this.start_player_active(now_slot);
                    } else {
                        //对持续运行类技能来说，如果中途不满足条件了，那么接下来的持续时间里也不再恢复
                        this.continue_skill_flag = false;
                    }
                }
            }
        }
    }
    //判断指定槽中的技能是否满足激活条件
    judge_active_condition(run_slot) {
        let flag = true;
        let active_condition = this.active_slots[run_slot].active_condition;
        if (is_Empty_Object(active_condition)) {
            //没有设定限制条件，默认为允许执行
            return true;
        } else {
            for (let condition_key in active_condition) {
                //任意条件不满足，该技能就不可以激活
                if (!this.judge_active_condition_key(condition_key, active_condition[condition_key])) {
                    return false;
                }
            }
        }

        return flag;
    }
    //激活玩家的第start_slot个主动技能
    start_player_active(start_slot) {
        let start_skill = this.active_slots[start_slot];
        if (is_Empty_Object(start_skill)) {
            //这个槽中没有技能，不运行
            return true;
        }
        let id = start_skill.id;
        //根据主动技能类型，产生这次效果
        if (start_skill.active_type == 'attack') {
            //攻击类型主动技能
            this.start_player_attack_type_skill(start_skill);
        } else if (start_skill.active_type == 'defense') {
            //防御类技能
            this.main_defense.id = id;
            //计算主动技能需要的玩家属性
            let askill_base_attr = get_Askill_base_attr(start_skill.attr_correct, this.player_end_attr);
            //计算主动技能防御效果
            Defense_effect_algorithm(start_skill, askill_base_attr, this.main_defense);
            let combat_manage = global.get_combat_manage();
            combat_manage.set_player_defense(this.main_defense);
        }
        this.reset_active_skill_effect();
    }
    start_player_attack_type_skill(start_skill) {
        //记录使用了哪个技能
        this.main_Attack.id = start_skill.id;
        //处理攻击类技能特有的内容
        let effect = start_skill.effect;
        //伤害类型
        this.main_Attack.damage_type = effect.damage_type;
        //攻击次数
        if (effect.attack_num.type == 'add') {
            this.main_Attack.attack_num += effect.attack_num.num;
        } else if (effect.attack_num.type == 'fixed') {
            this.main_Attack.attack_num = effect.attack_num.num;
        }
        //结算技能补正

        //基础数值等于攻击力+属性补正
        //计算属性补正
        let askill_base_attr = get_Askill_base_attr(start_skill.attr_correct, this.player_end_attr);
        askill_base_attr = this.player_end_attr['attack'] * (1 + askill_base_attr * 0.01);

        //计算攻击效果
        let algorithm = start_skill.algorithm;
        Attack_effect_algorithm(algorithm, askill_base_attr, this.main_Attack);

        //玩家属性里如果有伤害增幅的属性，现在就结算
        if (!is_Empty_Object(this.player_end_attr['sword_damage'])) {
            //剑造成的伤害增加

            if (this.player_end_attr['weapon_type'].includes('sword')) {
                //玩家手里用剑的时候，增加攻击的伤害
                this.main_Attack.base_damage = this.main_Attack.base_damage * this.player_end_attr['sword_damage'];
            }
        }
        //计算玩家装备的额外效果

        //格式化数值
        this.main_Attack.base_damage = format_numbers(this.main_Attack.base_damage);
        //攻击类技能，现在已经计算完毕，输出到战斗管理类中，准备执行该次攻击
        let combat_manage = global.get_combat_manage();
        combat_manage.set_player_next_attack(this.main_Attack);
    }
    //游戏运行一帧，计算主动技能部分内容
    run_player_active_skill() {
        //一帧启动
        this.updata_run_start();

        //判断当前是否有技能满足运行条件，并调用对应技能
        this.judge_active_start();

        //一帧结束
        this.updata_run_end();
        //如果运行到一回合结束
        if (this.now_run_slot >= this.get_use_active_slots_num()) {
            //重置时间，循环到下一回合
            this.reset_round();
        }
    }
    //卸下slot_id位置的主动技能
    remove_solt_active_skill(slot_id) {
        if (is_Empty_Object(this.active_slots[slot_id])) {
            return;
        }
        let skill_id = this.active_slots[slot_id].id;
        let skill_slot_num = this.active_slots[slot_id].slot_num;
        for (let i = 0; i < P_skills[skill_id].need_slot_num; i++) {
            this.active_slots[slot_id + i - skill_slot_num] = new Object();
        }
    }
    //判断当前状态是否满足一个具体的condition_key
    judge_active_condition_key(condition_key, condition_value) {
        if (condition_key == 'weapon_type') {
            //限制条件是装备了特定类型的装备
            //判断玩家装备类型和限制条件是否有重叠，有重叠就算成功
            if (is_overlap(this.player_end_attr['weapon_type'], condition_value)) {
                return true;
            }
        } else if (condition_key == 'damage_type') {
            //限制条件是玩家当前手持的武器属于什么伤害类型的武器
            //遍历每种玩家武器，转换成伤害类型，找到一样的就算成功
            let damage_type = condition_value;
            for (let pw of this.player_end_attr['weapon_type']) {
                let p_damage_type = enums.weapon_damage_type[pw];
                if (damage_type == p_damage_type) {
                    return true;
                }
            }
        }
        return false;
    }
}
