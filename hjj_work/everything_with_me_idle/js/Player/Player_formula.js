import { is_Empty_Object } from '../Function/Function.js';
import { get_radio_switch_click_value } from '../Function/Dom_function.js';

import { formulas } from '../Data/Formula/Formula.js';
import { global } from '../GameRun/global_manage.js';
//玩家拥有的一个配方
class Player_formula {
    constructor(id) {
        this.id = id; //唯一id
        if (is_Empty_Object(formulas[id])) {
            console.log('%s配方不存在，无法初始化', id);
            return;
        }
        this.status = 'unknow'; //该配方的学习状态
    }
}
//玩家配方管理
export class Player_formulas_manage {
    constructor() {
        this.synthesis_formulas = new Object(); //玩家拥有的合成制造配方
        this.cooking_formulas = new Object(); //玩家拥有的烹饪配方
        this.forging_formulas = new Object(); //玩家拥有的锻造配方
        this.elixir_alchemy_formulas = new Object(); //玩家拥有的炼丹配方
        this.herbal_bath_formulas = new Object(); //玩家拥有的药浴配方
        this.engrave_formulas = new Object(); //玩家拥有的雕刻配方
        this.alchemy_formulas = new Object(); //玩家拥有的炼金术配方
    }
    init() {
        this.player_get_initial_formulas();
        this.updata_formula_value();
    }
    //获取玩家配方部分的游戏存档
    save_Player_formulas_manage() {
        let Player_skills_save = new Object();
        Player_skills_save.synthesis_formulas = this.synthesis_formulas;
        Player_skills_save.cooking_formulas = this.cooking_formulas;
        Player_skills_save.forging_formulas = this.forging_formulas;
        Player_skills_save.elixir_alchemy_formulas = this.elixir_alchemy_formulas;
        Player_skills_save.herbal_bath_formulas = this.herbal_bath_formulas;
        Player_skills_save.engrave_formulas = this.engrave_formulas;
        Player_skills_save.alchemy_formulas = this.alchemy_formulas;
        return Player_skills_save;
    }
    //加载玩家配方部分的游戏存档
    load_Player_formulas_manage(Player_skills_save) {
        if (is_Empty_Object(Player_skills_save)) {
            return;
        }
        this.synthesis_formulas = Player_skills_save.synthesis_formulas;
        this.cooking_formulas = Player_skills_save.cooking_formulas;
        this.forging_formulas = Player_skills_save.forging_formulas;
        this.elixir_alchemy_formulas = Player_skills_save.elixir_alchemy_formulas;
        this.herbal_bath_formulas = Player_skills_save.herbal_bath_formulas;
        this.engrave_formulas = Player_skills_save.engrave_formulas;
        this.alchemy_formulas = Player_skills_save.alchemy_formulas;
        //测试过程中防止旧存档没有初始配方，所以每次加载存档都补充一遍初始配方
        this.player_get_initial_formulas();
    }

    //玩家学会指定配方
    Player_get_formula(id, study_status) {
        if (is_Empty_Object(formulas[id])) {
            console.log('不存在%s配方', id);
            return false;
        }
        //获取这个配方属于哪个技能
        let skill_name = formulas[id].skill + '_formulas';
        //在对应技能的配方下获取
        this[skill_name][id] = new Player_formula(id);
        this[skill_name][id].status = study_status;
        this.updata_formula_value();
        //添加学会了配方的日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('get_formula', id, study_status);
    }
    //获得当前玩家配方情况
    get_player_skill_formulas(skill_name) {
        let MH_live_plan_name = ['synthesis', 'cooking', 'forging', 'elixir_alchemy', 'herbal_bath', 'engrave', 'alchemy'];
        let MH_live_plan_min_name = { SYN: 0, COK: 1, FRG: 2, EXA: 3, HBB: 4, EGV: 5, ACM: 6 };
        let formulas_name;
        if (skill_name.length == 3) {
            let t_skill_name = MH_live_plan_name[MH_live_plan_min_name[skill_name]];
            formulas_name = t_skill_name + '_formulas';
        } else {
            formulas_name = skill_name + '_formulas';
        }
        return this[formulas_name];
    }
    //获得玩家对于指定配方的学习情况
    get_formula_study_status(id) {
        if (is_Empty_Object(formulas[id])) {
            console.log('不存在%s配方', id);
            return false;
        }
        let skill_name = formulas[id].skill + '_formulas';
        if (is_Empty_Object(this[skill_name][id])) {
            return 'unknow';
        }
        return this[skill_name][id].status;
    }
    //玩家获得基础配方
    player_get_initial_formulas() {
        for (let id in formulas) {
            if (formulas[id].initial_flag == false) {
                continue;
            }
            //获取这个配方属于哪个技能
            let skill_name = formulas[id].skill + '_formulas';
            //在对应技能的配方下获取
            this[skill_name][id] = new Player_formula(id);
            this[skill_name][id].status = 'know';
        }
    }
    //更新生活技能界面中的配方
    updata_formula_value() {
        //寻找当前展示出来的原料处理类生活技能
        let MH_name = global.get_flag('UGS_now_MH_name');
        if (MH_name == null) {
            return;
        }
        //针对这个生活技能进行更新
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div(MH_name);
    }
}

//获取当前展示的原料处理类生活技能的子功能编号
// function get_now_MH_min_name() {
//     const MH_switch_button = document.getElementById('MH_switch_button');
//     if (MH_switch_button.checked != true) {
//         //当前展示的生活技能不是原料处理类
//         return null;
//     }
//     // 寻找当前展示的生活技能
//     let MH_name;
//     const radios = document.querySelectorAll('input[name="MH_switch"]');
//     for (const radio of radios) {
//         if (radio.checked) {
//             MH_name = radio.value.slice(0, 3);
//             break;
//         }
//     }
//     //寻找当前展示的是生活技能中的哪个子功能
//     let MH_min_name = null;
//     radios = document.querySelectorAll('input[name="' + MH_skill_name + '_switch"]');
//     for (const radio of radios) {
//         if (radio.checked) {
//             MH_min_name = radio.value.slice(0, 6);
//             break;
//         }
//     }
//     return MH_min_name;
// }
//获取当前屏幕上展示的生活技能配方窗口
// function get_LP_formula_div() {
//     let MH_min_name = get_now_MH_min_name();
//     if (MH_min_name == null) {
//         return null;
//     }
//     //获取屏幕上展示的子功能的配方界面
//     let MH_min_formula_div = MH_min_skill + '_formula_value_div';
//     let LP_formula_div = document.getElementById(MH_min_formula_div);
//     return LP_formula_div;
// }
//获取指定生活技能子功能中激活的过滤条件
// function get_MH_type_switch(MH_min_name) {}
