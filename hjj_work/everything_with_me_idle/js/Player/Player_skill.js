'use strict';
import { items } from '../Data/Item/Item.js';
import { addElement } from '../Function/Dom_function.js';
import { P_skills, B_skills } from '../Data/Skill/Skill.js';
import { global } from '../GameRun/global_class.js';
import { skill_levelup_exp_algorithm } from '../Function/math_func.js';
import { add_click_Active_skill_worn, add_show_Tooltip } from '../Function/Dom_function.js';

//玩家拥有的技能
class Player_skill {
    constructor(id) {
        this.id = id; //唯一id
        this.exp = 0; //当前技能经验
        this.level = 0; //当前等级
        this.next_level_need_exp = 0; //升到下一级需要的经验
        this.levelup_flag; //当前技能能否通过经验升级标记
        this.levelmax_flag; //当前技能满级标记
    }
    init() {
        this.levelup_flag = P_skills[this.id].levelup_flag;
        if (P_skills[this.id].levelup_flag) {
            //该技能可以升级，初始化经验相关
            this.next_level_need_exp = P_skills[this.id].base_exp; //升到下一级需要的经验
        } else {
            //该技能不可通过累计经验升级，只能直接给予等级
        }
        this.levelmax_flag = false;
    }
}
//玩家拥有的主动技能
class Player_A_skill extends Player_skill {
    constructor(id) {
        super(id);
        this.init();
        this.level = 1; //主动技能初始就是可用的1级
        this.active_slots = new Array();
        for (let i = 0; i < P_skills[id].need_slot_num; i++) {
            //
            this.active_slots[i] = new Object();
            this.init_A_skill_aslot(this.active_slots[i], id, i);
        }
    }
    init_A_skill_aslot(active_slots, id, i) {
        let B_id = P_skills[id].need_slot_id[i];
        this.active_slots[i].id = id; //技能id
        this.active_slots[i].slot_num = i; //所处槽数
        this.active_slots[i].active_condition = B_skills[B_id].active_condition; //限制条件
        this.active_slots[i].active_type = B_skills[B_id].active_type; //辅助类型
        this.active_slots[i].attr_correct = B_skills[B_id].attr_correct; //哪些属性作为基础数值进行计算
        this.active_slots[i].algorithm = B_skills[B_id].algorithm; //使用哪个算法进行计算
        this.active_slots[i].start_time = B_skills[B_id].start_time; //结束时计算
        this.active_slots[i].effect = B_skills[B_id].effect; //技能效果
        this.active_slots[i].desc = B_skills[B_id].desc; //技能描述
    }
}
//玩家拥有的被动技能
class Player_P_skill extends Player_skill {
    constructor(id) {
        super(id);
        this.level = 1; //被动技能初始0级，不可用
    }
}

export class Player_skills {
    constructor() {}
    init() {
        this.player_get_initial_skil();
    }
    //玩家获得基础技能
    player_get_initial_skil() {
        //当玩家进行战斗或者生活技能之后，要根据行为给对应的技能加经验
        //那程序显然应该遍历玩家身上拥有的技能，找到可以加经验的才加
        //意味着玩家身上应该拥有所有不需要解锁的技能，这里称为初始技能
        //这些技能一开始就在玩家身上，0级，只有当达到1级的时候才会呈现到游戏界面中，并提供效果
        for (let id in P_skills) {
            if (P_skills[id].initial_flag == true) {
                this[id] = new Player_P_skill(id);
            }
        }
    }
    //为玩家解锁某个技能
    player_unlock_skill(id) {
        if (P_skills[id] === undefined) {
            //该技能不在数据库中
            console.log('player_unlock_skill:未定义技能：%s', id);
            return;
        }
        if (P_skills[id].type == 'Passive') {
            //被动技能
            if (this[id]) {
                //该被动技能已拥有，不重复解锁
                return;
            } else {
                //新的被动技能
                this[id] = new Player_P_skill(id);
            }
        } else if (P_skills[id].type == 'Active') {
            //主动技能
            if (this[id]) {
                //判断这次解锁是通过什么方式解锁的，以解锁原有技能的对应内容
                //该主动技能已拥有，不重复解锁
                return;
            } else {
                //新的主动技能
                this[id] = new Player_A_skill(id);
                //记录日志
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.set_unluck_active_skill_game_log(id);
            }
            //解锁了新主动技能，更新需要展示这个技能的界面
            this.updata_ASP_value();
        }
    }
    //给技能增加一定的经验
    get_skill_exp(id, exp) {
        if (!this[id]) {
            //玩家没有该技能
            console.log('get_skill_exp:未拥有技能：%s', id);
            return -1;
        }
        if (this[id].levelmax_flag) {
            //该技能满级了，不加经验
            return true;
        } else {
            this[id].exp += exp;
            if (this[id].exp >= this[id].next_level_need_exp) {
                this.skill_levelup(id);
            }
        }
    }
    //给指定技能提升等级
    skill_levelup(id) {
        //玩家没有该技能
        if (!this[id]) {
            this.player_unlock_skill(id);
        }
        //该技能满级了，不再升级
        if (this[id].levelmax_flag) {
            return true;
        }
        if (this[id].levelup_flag) {
            //该技能不能通过累计经验升级，在这里直接给予等级
            this[id].level++;
        } else {
            //结算该技能的经验来提升等级
            while (this[id].exp >= this[id].next_level_need_exp) {
                this[id].exp -= this[id].next_level_need_exp;
                this[id].level++;
                if (this[id].level >= P_skills[id].max_level) {
                    break;
                } else {
                    let algorithm = P_skills[id].levelup_algorithm;
                    let base_exp = P_skills[id].base_exp;
                    let now_level = this[id].level;
                    this[id].next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, now_level);
                }
            }
        }
        if (this[id].level >= P_skills[id].max_level) {
            //技能满级了
            this[id].levelmax_flag = true;
            this[id].level = P_skills[id].max_level;
        }
    }
    //获取玩家拥有的指定技能对象
    get_skills() {}

    //玩家技能发生变动时需要展示出来，调用这些接口更新界面
    //更新左下角的战斗规划界面中战斗规划的主动技能规划部分的内容
    updata_ASP_value() {
        //清空主动技能规划界面的所有元素
        this.delete_ASP_div();
        //获取应该展示的主动技能过滤条件
        let ASP_type = global.get_flag('UGS_ASP_type');
        //获取在这个过滤条件下应该展示的技能id
        let arr = this.ASP_type_handle(ASP_type);
        //展示这些技能
        for (let skill_id of arr) {
            this.add_ASP_skill(skill_id);
        }
    }
    //清空左下角的战斗规划界面中战斗规划的主动技能规划部分的内容
    delete_ASP_div() {
        let active_value_div = document.getElementById('active_value_div');
        active_value_div.replaceChildren();
    }
    //按照主动技能规划的过滤或筛选条件，获得应该展示的技能id队列
    ASP_type_handle(type_switch) {
        let arr = new Array();
        for (let skill_id in this) {
            if (P_skills[skill_id].type == 'Active') {
                switch (type_switch) {
                    case 'ASP_all': //全部主动技能
                        arr.push(skill_id);
                        break;
                    case 'ASP_N_1': //占用1槽的主动技能
                        if (P_skills[skill_id].need_slot_num == 1) {
                            arr.push(skill_id);
                        }
                        break;
                    case 'ASP_N_2': //占用2槽的主动技能
                        if (P_skills[skill_id].need_slot_num == 2) {
                            arr.push(skill_id);
                        }
                        break;
                    case 'ASP_N_3': //占用3槽的主动技能
                        if (P_skills[skill_id].need_slot_num == 3) {
                            arr.push(skill_id);
                        }
                        break;
                    case 'ASP_N_4': //占用4槽的主动技能
                        if (P_skills[skill_id].need_slot_num == 4) {
                            arr.push(skill_id);
                        }
                        break;
                    case 'ASP_A': //可以攻击的主动技能
                        for (let slot_id of P_skills[skill_id].need_slot_id) {
                            if (B_skills[slot_id].active_type == 'attack') {
                                arr.push(skill_id);
                                break;
                            }
                        }
                        break;
                    case 'ASP_D': //可以防御的主动技能
                        for (let slot_id of P_skills[skill_id].need_slot_id) {
                            if (B_skills[slot_id].active_type == 'defense') {
                                arr.push(skill_id);
                                break;
                            }
                        }
                        break;
                    case 'ASP_R': //可以恢复的主动技能
                        for (let slot_id of P_skills[skill_id].need_slot_id) {
                            if (B_skills[slot_id].active_type == 'recovery') {
                                arr.push(skill_id);
                                break;
                            }
                        }
                        break;
                    case 'ASP_F': //可以辅助的主动技能
                        for (let slot_id of P_skills[skill_id].need_slot_id) {
                            if (B_skills[slot_id].active_type == 'auxiliary') {
                                arr.push(skill_id);
                                break;
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        }

        return arr;
    }
    // 向战斗规划界面的主动技能规划界面添加一个主动技能
    add_ASP_skill(skill_id) {
        let active_value_div = document.getElementById('active_value_div');
        let askill = addElement(active_value_div, 'div', null, 'active_value');
        askill.innerHTML = P_skills[skill_id].name;
        //鼠标点击之后可以设置到玩家身上
        add_click_Active_skill_worn(askill, skill_id);
        //添加鼠标移动之后展示该技能详情
        add_show_Tooltip(askill, 'show_active_skill', skill_id);
    }
}
