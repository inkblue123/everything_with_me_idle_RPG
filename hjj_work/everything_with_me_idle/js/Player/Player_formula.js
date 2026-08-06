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
        //研究状态的配方，如果所有材料都在图鉴中解锁，直接视作完全了解
        let final_status = study_status;
        let library_unlock_flag = false; //是否通过图鉴解锁直接完全学会
        if (study_status == 'study') {
            let library_manage = global.get_library_manage();
            if (library_manage.is_formula_all_materials_unlocked(id)) {
                final_status = 'know'; //图鉴已点亮所有材料，直接完全了解
                library_unlock_flag = true;
            }
        }
        //获取这个配方属于哪个技能
        let skill_name = formulas[id].skill + '_formulas';
        //在对应技能的配方下获取
        this[skill_name][id] = new Player_formula(id);
        this[skill_name][id].status = final_status;
        this.updata_formula_value();
        //添加学会配方的日志
        let global_flag_manage = global.get_global_flag_manage();
        global_flag_manage.set_game_log('get_formula', id, study_status);
        if (library_unlock_flag) {
            //同时通过图鉴解锁直接完全学会，补充"已在图鉴中点亮..."日志
            global_flag_manage.set_game_log('formula_library_unlock', id);
        }
    }
    //检查玩家的所有配方，如果学习中的配方所有材料都在图鉴中解锁，就把配方调整为完全了解
    check_updata_study_formula_by_library() {
        let all_skill_names = ['synthesis', 'cooking', 'forging', 'elixir_alchemy', 'herbal_bath', 'engrave', 'alchemy'];
        let library_manage = global.get_library_manage();
        let updata_flag = false; //是否有配方被升级
        for (let skill_name of all_skill_names) {
            let P_formulas = this.get_player_skill_formulas(skill_name);
            for (let formula_id in P_formulas) {
                //只处理处于学习状态的配方
                if (P_formulas[formula_id].status != 'study') {
                    continue;
                }
                //配方所有材料都在图鉴中解锁，调整为完全了解
                if (library_manage.is_formula_all_materials_unlocked(formula_id)) {
                    P_formulas[formula_id].status = 'know';
                    let global_flag_manage = global.get_global_flag_manage();
                    global_flag_manage.set_game_log('formula_library_unlock', formula_id);
                    updata_flag = true;
                }
            }
        }
        //有配方升级，刷新生活技能配方界面
        if (updata_flag) {
            this.updata_formula_value();
        }
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
