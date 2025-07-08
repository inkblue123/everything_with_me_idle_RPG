'use strict';
import { is_Empty_Object } from '../Function/Function.js';
import { skill_levelup_exp_algorithm, skill_rewards_algorithm } from '../Function/math_func.js';
import { addElement, add_click_Active_skill_worn, add_show_Tooltip } from '../Function/Dom_function.js';
import { P_skills, B_skills } from '../Data/Skill/Skill.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//玩家拥有的技能
class Player_skill {
    constructor(id) {
        this.id = id; //唯一id
        this.type = P_skills[id].type; //主动或被动类型
        this.name = P_skills[id].name; //技能名
        this.desc = P_skills[id].desc; //技能描述
        this.exp = 0; //当前技能经验
        this.level = 0; //当前等级
        this.next_level_need_exp = 0; //升到下一级需要的经验
        this.exp_levelup_flag; //当前技能能否通过经验升级标记
        this.levelmax_flag; //当前技能满级标记
        this.rewards = new Array(); //常态等级加成
    }
    //初始化升级相关参数
    levelup_exp_init() {
        this.exp_levelup_flag = P_skills[this.id].exp_levelup_flag;
        if (P_skills[this.id].exp_levelup_flag) {
            //该技能可以升级，初始化经验相关
            this.next_level_need_exp = P_skills[this.id].base_exp; //升到下一级需要的经验
        } else {
            //该技能不可通过累计经验升级，只能直接给予等级
        }
        this.levelmax_flag = false;
    }
    //初始化常态等级加成
    rewards_init() {
        if (is_Empty_Object(P_skills[this.id].rewards)) {
            //这个技能没有常态等级加成
            return;
        }
        this.rewards = JSON.parse(JSON.stringify(P_skills[this.id].rewards));
    }
    // 更新这个技能的常态等级加成
    update_skill_rewards() {
        for (let reward_obj of this.rewards) {
            let algorithm = reward_obj.algorithm;
            reward_obj.data = skill_rewards_algorithm(algorithm, this.level);
        }
    }
}
//玩家拥有的主动技能
class Player_A_skill extends Player_skill {
    constructor(id) {
        super(id);
        this.levelup_exp_init();
        this.rewards_init();
        this.level = 1; //主动技能初始就是可用的1级
        this.active_slots = new Array();
        //初始化这个主动技能每个槽里的单个技能的属性
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
        // this.active_slots[i].desc = B_skills[B_id].desc; //技能描述
    }
}
//玩家拥有的被动技能
class Player_P_skill extends Player_skill {
    constructor(id) {
        super(id);
        this.levelup_exp_init(); //初始化升级相关参数
        this.rewards_init(); //初始化常态等级加成

        this.level = 0; //被动技能初始0级，不可用
    }
}

export class Player_skills {
    constructor() {
        this.passive_skills = new Object();
        this.active_skills = new Object();
    }
    init() {
        this.player_get_initial_skil();
    }
    //获取玩家技能部分的游戏存档
    save_Player_skills() {
        let Player_skills_save = new Object();
        Player_skills_save.passive_skills = new Object();
        Player_skills_save.active_skills = new Object();

        //只保存部分重要信息，其他信息可以初始化时自动填充
        for (let id in this.passive_skills) {
            let skill_obj = this.passive_skills[id];
            Player_skills_save.passive_skills[id] = new Object();
            Player_skills_save.passive_skills[id].exp = skill_obj.exp;
            Player_skills_save.passive_skills[id].level = skill_obj.level;
            Player_skills_save.passive_skills[id].levelmax_flag = skill_obj.levelmax_flag;
        }
        for (let id in this.active_skills) {
            let skill_obj = this.active_skills[id];
            Player_skills_save.active_skills[id] = new Object();
            Player_skills_save.active_skills[id].exp = skill_obj.exp;
            Player_skills_save.active_skills[id].level = skill_obj.level;
            Player_skills_save.active_skills[id].levelmax_flag = skill_obj.levelmax_flag;
        }

        return Player_skills_save;
    }
    //加载玩家技能部分的游戏存档
    load_Player_skills(Player_skills_save) {
        if (is_Empty_Object(Player_skills_save)) {
            return;
        }

        for (let id in Player_skills_save.active_skills) {
            let skill_obj = new Player_A_skill(id);
            let skill_save = Player_skills_save.active_skills[id];

            skill_obj.exp = skill_save.exp; //当前经验
            skill_obj.level = skill_save.level; //当前等级
            //升到下一级所需经验
            let algorithm = P_skills[id].levelup_algorithm;
            let base_exp = P_skills[id].base_exp;
            skill_obj.next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, skill_save.level);
            //满级标记
            if (skill_obj.level >= P_skills[id].max_level) {
                skill_obj.levelmax_flag = true;
            } else {
                skill_obj.levelmax_flag = false;
            }
            //技能的常态等级加成
            skill_obj.update_skill_rewards();

            this.active_skills[id] = skill_obj;
        }
        for (let id in Player_skills_save.passive_skills) {
            let skill_obj = new Player_P_skill(id);
            let skill_save = Player_skills_save.passive_skills[id];

            skill_obj.exp = skill_save.exp; //当前经验
            skill_obj.level = skill_save.level; //当前等级
            //升到下一级所需经验
            let algorithm = P_skills[id].levelup_algorithm;
            let base_exp = P_skills[id].base_exp;
            skill_obj.next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, skill_save.level);
            //满级标记
            if (skill_obj.level >= P_skills[id].max_level) {
                skill_obj.levelmax_flag = true;
            } else {
                skill_obj.levelmax_flag = false;
            }
            //技能的常态等级加成
            skill_obj.update_skill_rewards();

            this.passive_skills[id] = skill_obj;
        }
        this.updata_ASP_value();
        this.updata_PSK_value();
    }
    //玩家获得基础技能
    player_get_initial_skil() {
        //当玩家进行战斗或者生活技能之后，要根据行为给对应的技能加经验
        //那程序显然应该遍历玩家身上拥有的技能，找到可以加经验的才加
        //意味着玩家身上应该拥有所有不需要解锁的技能，这里称为初始技能
        //这些技能一开始就在玩家身上，0级，只有当达到1级的时候才会呈现到游戏界面中，并提供效果
        for (let id in P_skills) {
            if (P_skills[id].initial_flag == true) {
                if (P_skills[id].type == 'Active') {
                    this.active_skills[id] = new Player_A_skill(id);
                } else if (P_skills[id].type == 'Passive') {
                    this.passive_skills[id] = new Player_P_skill(id);
                }
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
            if (!is_Empty_Object(this.passive_skills[id])) {
                //该被动技能已拥有，不重复解锁
                return;
            } else {
                //新的被动技能
                this.passive_skills[id] = new Player_P_skill(id);
                //除了初始解锁的技能，后续获得的技能都是1级
                this.skill_levelup(id);
                //记录日志
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.set_game_log('unluck_skill', id);
            }
        } else if (P_skills[id].type == 'Active') {
            //主动技能
            if (!is_Empty_Object(this.active_skills[id])) {
                //判断这次解锁是通过什么方式解锁的，以解锁原有技能的对应内容
                //该主动技能已拥有，不重复解锁
                return;
            } else {
                //新的主动技能
                this.active_skills[id] = new Player_A_skill(id);
                //记录日志
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.set_game_log('unluck_skill', id);
            }
            //解锁了新主动技能，更新需要展示这个技能的界面
            this.updata_ASP_value();
        }
        this.updata_PSK_value();
    }
    //获得指定技能的对象
    get_skill_obj(id) {
        let skill_obj;
        if (P_skills[id].type == 'Passive') {
            skill_obj = this.passive_skills[id];
        } else if (P_skills[id].type == 'Active') {
            skill_obj = this.active_skills[id];
        } else {
            console.log('未定义技能%s', id);
            return;
        }
        if (is_Empty_Object(skill_obj)) {
            //玩家没有该技能
            console.log('get_skill_exp:未拥有技能：%s', id);
            return;
        }
        return skill_obj;
    }
    //给技能增加一定的经验
    get_skill_exp(id, exp) {
        //经验为0就不用进行后面的计算了
        if (exp <= 0) {
            return;
        }
        //该技能的对象
        let skill_obj = this.get_skill_obj(id);
        if (is_Empty_Object(skill_obj)) {
            return;
        }

        if (skill_obj.levelmax_flag || skill_obj.exp_levelup_flag == false) {
            //该技能满级了，不加经验
            //这个技能不能通过累计经验的方式升级，也不需要加经验
            return true;
        } else {
            skill_obj.exp += exp;
            if (skill_obj.exp >= skill_obj.next_level_need_exp) {
                //这个技能经验累计满了，应该升级
                this.skill_exp_levelup(id);
            }
        }
    }
    //结算指定技能的经验，提升等级
    skill_exp_levelup(id) {
        //该技能的对象
        let skill_obj = this.get_skill_obj(id);
        if (is_Empty_Object(skill_obj)) {
            return;
        }
        //经验不足，不能升级
        if (skill_obj.exp < skill_obj.next_level_need_exp) {
            return;
        }

        let up_level = 0;
        //结算该技能的经验来提升等级
        while (skill_obj.exp >= skill_obj.next_level_need_exp) {
            skill_obj.exp -= skill_obj.next_level_need_exp;
            skill_obj.level++;
            up_level++;
            if (skill_obj.level >= P_skills[id].max_level) {
                break;
            } else {
                let algorithm = P_skills[id].levelup_algorithm;
                let base_exp = P_skills[id].base_exp;
                let now_level = skill_obj.level;
                skill_obj.next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, now_level);
            }
        }

        //技能满级的处理
        if (skill_obj.level >= P_skills[id].max_level) {
            up_level = up_level - (skill_obj.level - P_skills[id].max_level);
            skill_obj.levelmax_flag = true;
            skill_obj.level = P_skills[id].max_level;
        }

        //记录日志
        let global_flag_manage = global.get_global_flag_manage();
        if (skill_obj.level - up_level == 0) {
            //这是一个玩家初始拥有的基础被动技能，从0到1的日志应该是解锁，后面的等级提升用升级
            global_flag_manage.set_game_log('unluck_skill', id);
            if (up_level != 1) {
                global_flag_manage.set_game_log('skill_levelup', id, up_level, skill_obj.level);
            }
        } else {
            //这是正常拥有的一个技能的升级
            global_flag_manage.set_game_log('skill_levelup', id, up_level, skill_obj.level);
        }

        //在这个技能对象中更新升级之后这个技能提供的属性
        skill_obj.update_skill_rewards();

        //被动技能的属性可以直接更新到玩家身上
        if (skill_obj.type == 'Passive') {
            let P_attr = player.get_player_attributes();
            P_attr.updata_passive_skill_attr();
            //将更新后的最终数值属性更新到其他会用的地方
            let end_data_attr = P_attr.get_end_data_attr();
            let P_Askill = player.get_player_ASkill_Manage();
            P_Askill.updata_player_data(end_data_attr);
        }
        //更新这个技能在左上角界面的展示效果
        this.updata_PSK_value();
        //更新游戏日志
    }
    //无条件提升指定技能等级1级
    skill_levelup(id) {
        //该技能的对象
        let skill_obj = this.get_skill_obj(id);
        if (is_Empty_Object(skill_obj)) {
            return;
        }
        //技能已经满级，不升级
        if (skill_obj.level >= P_skills[id].max_level) {
            return;
        }

        skill_obj.level++;

        //技能满级的处理
        if (skill_obj.level >= P_skills[id].max_level) {
            skill_obj.levelmax_flag = true;
            skill_obj.level = P_skills[id].max_level;
        }

        if (skill_obj.exp_levelup_flag) {
            //这个技能正常来说是累计经验升级的，升级之后应该清空经验，更新下一级的经验需求
            skill_obj.exp = 0;
            let algorithm = P_skills[id].levelup_algorithm;
            let base_exp = P_skills[id].base_exp;
            let now_level = skill_obj.level;
            skill_obj.next_level_need_exp = skill_levelup_exp_algorithm(algorithm, base_exp, now_level);
        } else {
            //这个技能正常来说是不能累计经验升级的，如果有什么操作在这里处理
        }

        //记录日志
        let global_flag_manage = global.get_global_flag_manage();
        if (skill_obj.level == 1) {
            //这是一个玩家初始拥有的基础被动技能，从0到1的日志应该是解锁
            global_flag_manage.set_game_log('unluck_skill', id);
        } else {
            //这是正常拥有的一个技能的升级
            global_flag_manage.set_game_log('skill_levelup', id, 1, skill_obj.level);
        }
        //更新升级之后这个技能提供的属性
        skill_obj.update_skill_rewards();
        //被动技能的属性可以直接更新到玩家身上
        if (skill_obj.type == 'Passive') {
            let P_attr = player.get_player_attributes();
            P_attr.updata_passive_skill_attr();
            //将更新后的最终数值属性更新到其他会用的地方
            let end_data_attr = P_attr.get_end_data_attr();
            let P_Askill = player.get_player_ASkill_Manage();
            P_Askill.updata_player_data(end_data_attr);
        }
        //更新这个技能在左上角界面的展示效果
        this.updata_PSK_value();
    }

    //玩家技能发生变动时需要展示出来，调用这些接口更新界面
    //更新左下角的战斗规划界面中战斗规划的主动技能规划部分的内容
    updata_ASP_value() {
        //清空主动技能规划界面的所有元素
        delete_ASP_div();
        //获取应该展示的主动技能过滤条件
        let ASP_type = global.get_flag('UGS_ASP_type');
        //获取在这个过滤条件下应该展示的技能id
        let arr = ASP_type_handle(ASP_type);
        //展示这些技能
        for (let skill_id of arr) {
            let skill_obj = this.get_skill_obj(skill_id);
            add_ASP_skill(skill_obj);
        }
    }
    //更新左上角的玩家属性界面中的玩家所有技能界面的内容
    updata_PSK_value() {
        //清空玩家所有技能界面的所有元素
        delete_PSK_div();
        //获取应该展示的技能过滤条件
        let PSK_type = global.get_flag('UGS_PSK_type');
        //获取在这个过滤条件下应该展示的技能id
        let arr = PSK_type_handle(PSK_type);
        //展示这些技能
        for (let skill_id of arr) {
            let skill_obj = this.get_skill_obj(skill_id);
            add_PSK_skill(skill_obj);
        }
    }
}
//按照主动技能规划的过滤或筛选条件，获得应该展示的技能id队列
function ASP_type_handle(type_switch) {
    let arr = new Array();
    let P_All_A_Skills = player.get_player_All_active_skills();
    for (let skill_id in P_All_A_Skills) {
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

    return arr;
}
// 向战斗规划界面的主动技能规划界面添加一个主动技能
function add_ASP_skill(skill_obj) {
    let active_value_div = document.getElementById('active_value_div');
    let askill = addElement(active_value_div, 'div', null, 'active_value');
    askill.innerHTML = skill_obj.name;
    //鼠标点击之后可以设置到玩家身上
    add_click_Active_skill_worn(askill, skill_obj.id);
    //添加鼠标移动之后展示该技能详情
    add_show_Tooltip(askill, 'show_active_skill', skill_obj);
}
//清空左下角的战斗规划界面中战斗规划的主动技能规划部分的内容
function delete_ASP_div() {
    let active_value_div = document.getElementById('active_value_div');
    active_value_div.replaceChildren();
}
//清空左上角的玩家属性界面中的玩家技能界面的内容
function delete_PSK_div() {
    let PSK_value_div = document.getElementById('PSK_value_div');
    PSK_value_div.replaceChildren();
}
//按照需要展示的技能的过滤或筛选条件，获得应该展示的技能id队列
function PSK_type_handle(type_switch) {
    let arr = new Array();
    //获取玩家身上可以展示给玩家看到的技能
    let P_All_A_Skills = player.get_player_All_active_skills();
    let P_All_P_Skills = player.get_player_All_passive_skills();

    //所有主动技能都可以直接展示
    let P_All_skills = Object.keys(P_All_A_Skills);
    //被动技能起码要有1级才能展示
    for (let id in P_All_P_Skills) {
        if (P_All_P_Skills[id].level >= 1) {
            P_All_skills.push(id);
        }
    }

    for (let skill_id of P_All_skills) {
        switch (type_switch) {
            case 'PSK_all': //全部技能
                arr.push(skill_id);
                break;
            case 'B_all': //全部根基技能
                if (enums.basic_passive.includes(P_skills[skill_id].passive_type)) {
                    arr.push(skill_id);
                }
                break;
            case 'C_all': //全部战斗技能
                if (enums.combat_passive.includes(P_skills[skill_id].passive_type)) {
                    arr.push(skill_id);
                }
                break;
            case 'C_W': //战斗技能中的武器技能
                if (P_skills[skill_id].passive_type == 'weapon_mastery') {
                    arr.push(skill_id);
                }
                break;
            case 'C_Env': //战斗技能中的环境适应技能
                if (P_skills[skill_id].passive_type == 'environment_adaptation') {
                    arr.push(skill_id);
                }
                break;
            case 'C_Ene': //战斗技能中的对敌精通技能
                if (P_skills[skill_id].passive_type == 'enemy_mastery') {
                    arr.push(skill_id);
                }
                break;
            case 'L_all': //全部生活技能
                if (enums.life_passive.includes(P_skills[skill_id].passive_type)) {
                    arr.push(skill_id);
                }
                break;
            case 'L_Raw': //生活技能中的原料获取技能
                if (P_skills[skill_id].passive_type == 'material_acquisition') {
                    arr.push(skill_id);
                }
                break;
            case 'L_P': //生活技能中的原料加工技能
                if (P_skills[skill_id].passive_type == 'material_processing') {
                    arr.push(skill_id);
                }
                break;
            case 'L_F': //生活技能中的成品使用技能
                if (P_skills[skill_id].passive_type == 'product_usage') {
                    arr.push(skill_id);
                }
                break;
            case 'L_Rec': //生活技能中的回收利用技能
                if (P_skills[skill_id].passive_type == 'recycling') {
                    arr.push(skill_id);
                }
                break;
            case 'A_all': //全部主动技能
                if (P_skills[skill_id].type == 'Active') {
                    arr.push(skill_id);
                }
                break;
            case 'A_A': //可以攻击的主动技能
                if (is_Empty_Object(P_skills[skill_id].need_slot_id)) {
                    break;
                }
                for (let slot_id of P_skills[skill_id].need_slot_id) {
                    if (B_skills[slot_id].active_type == 'attack') {
                        arr.push(skill_id);
                        break;
                    }
                }
                break;
            case 'A_D': //可以防御的主动技能
                if (is_Empty_Object(P_skills[skill_id].need_slot_id)) {
                    break;
                }
                for (let slot_id of P_skills[skill_id].need_slot_id) {
                    if (B_skills[slot_id].active_type == 'defense') {
                        arr.push(skill_id);
                        break;
                    }
                }
                break;
            case 'A_R': //可以恢复的主动技能
                if (is_Empty_Object(P_skills[skill_id].need_slot_id)) {
                    break;
                }
                for (let slot_id of P_skills[skill_id].need_slot_id) {
                    if (B_skills[slot_id].active_type == 'recovery') {
                        arr.push(skill_id);
                        break;
                    }
                }
                break;
            case 'A_F': //可以辅助的主动技能
                if (is_Empty_Object(P_skills[skill_id].need_slot_id)) {
                    break;
                }
                for (let slot_id of P_skills[skill_id].need_slot_id) {
                    if (B_skills[slot_id].active_type == 'auxiliary') {
                        arr.push(skill_id);
                        break;
                    }
                }
                break;
            case 'S_all': //全部特殊功法
                if (enums.super_passive.includes(P_skills[skill_id].passive_type)) {
                    arr.push(skill_id);
                }
                break;

            default:
                break;
        }
    }

    return arr;
}
// 向左上角的玩家属性界面中的玩家技能界面添加一个技能
function add_PSK_skill(skill_obj) {
    let active_value_div = document.getElementById('PSK_value_div');
    let skill_div = addElement(active_value_div, 'div', null, 'PSK_value');
    skill_div.innerHTML = skill_obj.name;
    //鼠标点击之后可以设置到玩家身上
    // add_click_Active_skill_worn(skill_div, skill_id);
    //添加鼠标移动之后展示该技能详情
    if (skill_obj.type == 'Passive') {
        add_show_Tooltip(skill_div, 'show_passive_skill', skill_obj);
    } else if (skill_obj.type == 'Active') {
        add_show_Tooltip(skill_div, 'show_active_skill', skill_obj);
    }
}
