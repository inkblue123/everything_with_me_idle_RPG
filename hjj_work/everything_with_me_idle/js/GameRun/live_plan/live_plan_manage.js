import { change_Live_plan_div, change_Explore_collection_div, change_Material_handling_div } from '../../Function/show_func.js';
import { is_Empty_Object } from '../../Function/Function.js';
import { get_radio_switch_click_value } from '../../Function/Dom_function.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { global } from '../../GameRun/global_manage.js';

import { Logging_manage } from './Explore_collection/logging.js';
import { Fishing_manage } from './Explore_collection/fishing.js';
import { Mining_manage } from './Explore_collection/mining.js';
import { Collect_manage } from './Explore_collection/collect.js';
import { Diving_manage } from './Explore_collection/diving.js';
import { Archaeology_manage } from './Explore_collection/archaeology.js';
import { Exploration_manage } from './Explore_collection/exploration.js';

import { Synthesis_manage } from './Material_handling/synthesis/synthesis.js';
import { Cooking_manage } from './Material_handling/cooking.js';
import { Forging_manage } from './Material_handling/forging.js';
import { Elixir_alchemy_manage } from './Material_handling/elixir_alchemy.js';
import { Herbal_bath_manage } from './Material_handling/herbal_bath.js';
import { Engrave_manage } from './Material_handling/engrave.js';
import { Alchemy_manage } from './Material_handling/alchemy.js';

//生活技能规划管理对象
export class Live_plan_manage {
    constructor() {
        this.now_place; //当前地点
        this.EC_live_plan_class_name = ['logging_manage', 'fishing_manage', 'mining_manage', 'collect_manage', 'diving_manage', 'archaeology_manage', 'exploration_manage'];
        this.EC_live_plan_min_name = { LGI: 0, FIS: 1, MIN: 2, CLT: 3, DIV: 4, ACL: 5, ELT: 6 };
        this.MH_live_plan_class_name = ['synthesis_manage', 'cooking_manage', 'forging_manage', 'elixir_alchemy_manage', 'herbal_bath_manage', 'engrave_manage', 'alchemy_manage'];
        this.MH_live_plan_min_name = { SYN: 0, COK: 1, FRG: 2, EXA: 3, HBB: 4, EGV: 5, ACM: 6 };
        // this.live_plan_name = ['logging', 'fishing', 'mining', 'collect', 'diving', 'archaeology', 'exploration'];
        // //为药浴界面中的按钮添加交互逻辑
        // let HBB_value_div = Live_plan.querySelector('#HBB_value_div');
        // set_herbal_bath_button(HBB_value_div);
        // //为雕刻界面中的按钮添加交互逻辑
        // let EGV_value_div = Live_plan.querySelector('#EGV_value_div');
        // set_engrave_button(EGV_value_div);
        // //为炼金术界面中的按钮添加交互逻辑
        // let ACM_value_div = Live_plan.querySelector('#ACM_value_div');
        // set_alchemy_button(ACM_value_div);
    }
    init() {
        this.logging_manage = new Logging_manage(); //伐木管理对象
        this.fishing_manage = new Fishing_manage(); //钓鱼管理对象
        this.mining_manage = new Mining_manage(); //挖矿管理对象
        this.collect_manage = new Collect_manage(); //采集管理对象
        this.diving_manage = new Diving_manage(); //潜水管理对象
        this.archaeology_manage = new Archaeology_manage(); //考古管理对象
        this.exploration_manage = new Exploration_manage(); //探索管理对象

        this.synthesis_manage = new Synthesis_manage(); //合成制造管理对象
        this.cooking_manage = new Cooking_manage(); //烹饪管理对象
        this.forging_manage = new Forging_manage(); //锻造管理对象
        this.elixir_alchemy_manage = new Elixir_alchemy_manage(); //炼丹管理对象
        this.herbal_bath_manage = new Herbal_bath_manage(); //药浴管理对象
        this.engrave_manage = new Engrave_manage(); //雕刻管理对象
        this.alchemy_manage = new Alchemy_manage(); //炼金术管理对象
    }
    //对生活技能规划对象进行存档
    save_Live_plan_manage() {
        let Live_plan_save = new Object();
        Live_plan_save.now_place = this.now_place;
        //获取每个子对象的存档
        Live_plan_save.logging_save = this.logging_manage.save_logging_manage(); //伐木存档
        Live_plan_save.fishing_save = this.fishing_manage.save_fishing_manage(); //钓鱼存档
        Live_plan_save.mining_save = this.mining_manage.save_mining_manage(); //挖矿存档
        Live_plan_save.collect_save = this.collect_manage.save_collect_manage(); //采集存档
        Live_plan_save.diving_save = this.diving_manage.save_diving_manage(); //潜水存档
        Live_plan_save.archaeology_save = this.archaeology_manage.save_archaeology_manage(); //考古存档
        Live_plan_save.exploration_save = this.exploration_manage.save_exploration_manage(); //探索存档

        Live_plan_save.synthesis_save = this.synthesis_manage.save_synthesis_manage(); //合成制造存档
        Live_plan_save.cooking_save = this.cooking_manage.save_cooking_manage(); //烹饪存档
        Live_plan_save.forging_save = this.forging_manage.save_forging_manage(); //锻造存档
        Live_plan_save.elixir_alchemy_save = this.elixir_alchemy_manage.save_elixir_alchemy_manage(); //炼丹存档
        Live_plan_save.herbal_bath_save = this.herbal_bath_manage.save_herbal_bath_manage(); //药浴存档
        Live_plan_save.engrave_save = this.engrave_manage.save_engrave_manage(); //雕刻存档
        Live_plan_save.alchemy_save = this.alchemy_manage.save_alchemy_manage(); //炼金术存档

        //保存当前生活技能规划界面展示了哪个大分类
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        let MH_div = document.getElementById('MH_div'); //原料处理窗口 Material_handling MH
        let EX_LP_name;
        if (EC_div.style.display == '') {
            Live_plan_save.LP_type = 'EC_switch_button';
            EX_LP_name = ['LGI', 'FIS', 'MIN', 'CLT', 'DIV', 'ACL', 'ELT'];
        } else if (MH_div.style.display == '') {
            Live_plan_save.LP_type = 'MH_switch_button';
            EX_LP_name = ['SYN', 'COK', 'FRG', 'EXA', 'HBB', 'EGV', 'ACM'];
        }
        //保存当前生活技能规划界面展示了哪个具体技能
        for (let key of EX_LP_name) {
            let div_id = key + '_value_div';
            let div = document.getElementById(div_id);
            if (div.style.display == '') {
                Live_plan_save.EX_LP_name = key;
                break;
            }
        }
        return Live_plan_save;
    }
    //加载游戏存档
    load_Live_plan_manage(Live_plan_save) {
        if (is_Empty_Object(Live_plan_save)) {
            return;
        }
        Live_plan_save.now_place = 'village_home';
        //探索采集部分技能
        this.logging_manage.load_logging_manage(Live_plan_save.logging_save); //伐木存档
        this.fishing_manage.load_fishing_manage(Live_plan_save.fishing_save); //钓鱼存档
        this.mining_manage.load_mining_manage(Live_plan_save.mining_save); //挖矿存档
        this.collect_manage.load_collect_manage(Live_plan_save.collect_save); //采集存档
        this.diving_manage.load_diving_manage(Live_plan_save.diving_save); //潜水存档
        this.archaeology_manage.load_archaeology_manage(Live_plan_save.archaeology_save); //考古存档
        this.exploration_manage.load_exploration_manage(Live_plan_save.exploration_save); //探索存档
        //原料处理部分技能
        this.synthesis_manage.load_synthesis_manage(Live_plan_save.synthesis_save); //合成制造存档
        this.cooking_manage.load_cooking_manage(Live_plan_save.cooking_save); //烹饪存档
        this.forging_manage.load_forging_manage(Live_plan_save.forging_save); //锻造存档
        this.elixir_alchemy_manage.load_elixir_alchemy_manage(Live_plan_save.elixir_alchemy_save); //炼丹存档
        this.herbal_bath_manage.load_herbal_bath_manage(Live_plan_save.herbal_bath_save); //药浴存档
        this.engrave_manage.load_engrave_manage(Live_plan_save.engrave_save); //雕刻存档
        this.alchemy_manage.load_alchemy_manage(Live_plan_save.alchemy_save); //炼金术存档

        //还没有解锁任何生活技能
        if (Live_plan_save.EX_LP_name == undefined) {
            return;
        }
        // 将生活技能规划界面切换到存档中保存的技能上
        let EX_LP_button_name = Live_plan_save.EX_LP_name + '_button';
        change_Live_plan_div(Live_plan_save.LP_type); //切换到大类
        if (Live_plan_save.LP_type == 'EC_switch_button') {
            var EC_switch_radio_div = document.getElementById('EC_switch_radio_div');
            EC_switch_radio_div.children[0].checked = true; //生活技能规划最上方的分类按钮切换到探索采集
            change_Explore_collection_div(EX_LP_button_name);
            let i = this.EC_live_plan_min_name[Live_plan_save.EX_LP_name];
            let manage_name = this.EC_live_plan_class_name[i];
            this[manage_name].updata_super_game_div(Live_plan_save.now_place);
        } else if (Live_plan_save.LP_type == 'MH_switch_button') {
            var MH_switch_radio_div = document.getElementById('MH_switch_radio_div');
            MH_switch_radio_div.children[0].checked = true; //生活技能规划最上方的分类按钮切换到合成制造
            change_Material_handling_div(EX_LP_button_name);
            let i = this.MH_live_plan_min_name[Live_plan_save.EX_LP_name];
            let manage_name = this.MH_live_plan_class_name[i];
            this[manage_name].updata_super_game_div(Live_plan_save.now_place);
        }
        let radio_div = document.getElementById(EX_LP_button_name);
        radio_div.checked = true;
    }
    //获取生活技能的管理对象
    get_LP_live_skill_manage(manage_name) {
        if (!this.EC_live_plan_class_name.includes(manage_name) && !this.MH_live_plan_class_name.includes(manage_name)) {
            console.log('未知管理对象，无法获取');
        }
        if (is_Empty_Object(this[manage_name])) {
            console.log('%s管理对象未定义', manage_name);
        }
        return this[manage_name];
    }
    //更新当前正在进行的生活技能的数值
    updata_live_plan_data(now_GS) {
        if (!enums['live_plan_GS'].includes(now_GS)) {
            console.log('当前进行的游戏状态%s不属于生活技能，无法处理', now_GS);
            return;
        }
        let manage_name = now_GS + '_manage';
        this[manage_name].updata_live_plan_data();
    }
    //更新当前正在进行的生活技能的界面
    updata_live_plan_game_div(now_GS) {
        if (!enums['live_plan_GS'].includes(now_GS)) {
            console.log('当前进行的游戏状态%s不属于生活技能，无法处理', now_GS);
            return;
        }
        let manage_name = now_GS + '_manage';
        this[manage_name].updata_live_plan_div();
    }
    //生活界面切换，对切换到的技能界面进行初始化
    init_live_plan_game_div(button_id) {
        let min_name = button_id.substring(0, 3);
        let manage_name;
        const EC_keys = Object.keys(this.EC_live_plan_min_name);
        const MH_keys = Object.keys(this.MH_live_plan_min_name);
        if (EC_keys.includes(min_name)) {
            let i = this.EC_live_plan_min_name[min_name];
            manage_name = this.EC_live_plan_class_name[i];
        } else if (MH_keys.includes(min_name)) {
            let i = this.MH_live_plan_min_name[min_name];
            manage_name = this.MH_live_plan_class_name[i];
        } else {
            console.log('%s按钮调到切换界面函数，未知处理');
        }
        if (!is_Empty_Object(this[manage_name])) {
            this[manage_name].init_live_plan_game_div();
            change_Explore_collection_div(button_id);
        }
    }
    //玩家属性更新，更新到生活技能类里
    updata_player_data(end_data_attr) {
        for (let manage_name of this.EC_live_plan_class_name) {
            if (!is_Empty_Object(this[manage_name])) {
                this[manage_name].updata_player_data(end_data_attr);
            }
        }
    }
    //地点更新，给各个技能对象更新地点信息
    set_new_place(next_place) {
        this.now_place = next_place;
        //无论当前正在进行什么生活技能，移动地点之后都要停止
        this.stop_now_live_skill();

        //探索采集类生活技能
        let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
        for (let i = 0; i < 7; i++) {
            // if (!places[next_place].live_plan_flag[i]) {
            //     // 不可进行对应技能，不用更新
            //     continue;
            // }
            //如果地点可以进行对应技能，更新地点信息
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].set_new_place(next_place);
            }
        }
        //原料处理类生活技能
        for (let i = 0; i < 7; i++) {
            //如果地点可以进行对应技能，更新地点信息
            if (!is_Empty_Object(this[this.MH_live_plan_class_name[i]])) {
                this[this.MH_live_plan_class_name[i]].set_new_place(next_place);
            }
        }

        //当前展示的那一个生活技能需要特别更新
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        if (EC_div.style.display == '') {
            // 找到当前激活的生活技能
            let EC_skill = get_radio_switch_click_value('EC_switch');
            EC_skill = EC_skill.substring(0, 3);
            let i = this.EC_live_plan_min_name[EC_skill];
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].updata_super_game_div(next_place);
            }
        }
        let MH_div = document.getElementById('MH_div'); //原料处理窗口 Material_handling MH
        if (MH_div.style.display == '') {
            let MH_skill = get_radio_switch_click_value('MH_switch');
            MH_skill = MH_skill.substring(0, 3);
            let i = this.MH_live_plan_min_name[MH_skill];
            if (!is_Empty_Object(this[this.MH_live_plan_class_name[i]])) {
                this[this.MH_live_plan_class_name[i]].updata_super_game_div(next_place);
            }
        }
    }
    //读取存档，地点更新，给各个技能对象更新地点信息
    load_set_new_place(next_place) {
        //读取存档时保留存档中的游戏状态
        // this.stop_now_live_skill();

        //探索采集类生活技能
        let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
        for (let i = 0; i < 7; i++) {
            if (!places[next_place].live_plan_flag[i]) {
                // 不可进行对应技能，不用更新
                continue;
            }
            //如果地点可以进行对应技能，更新地点信息
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].set_new_place(next_place);
            }
        }
        //原料处理类生活技能
        for (let i = 0; i < 7; i++) {
            //如果地点可以进行对应技能，更新地点信息
            if (!is_Empty_Object(this[this.MH_live_plan_class_name[i]])) {
                this[this.MH_live_plan_class_name[i]].set_new_place(next_place);
            }
        }

        // 当前展示的那一个生活技能需要特别更新
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        if (EC_div.style.display == '') {
            // 找到当前激活的生活技能
            let EC_skill = get_radio_switch_click_value('EC_switch');
            EC_skill = EC_skill.substring(0, 3);
            let i = this.EC_live_plan_min_name[EC_skill];
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].updata_super_game_div(next_place);
            }
        }
        let MH_div = document.getElementById('MH_div'); //原料处理窗口 Material_handling MH
        if (MH_div.style.display == '') {
            // 找到当前激活的生活技能
            let MH_skill = get_radio_switch_click_value('MH_switch');
            MH_skill = MH_skill.substring(0, 3);
            let i = this.MH_live_plan_min_name[MH_skill];
            if (!is_Empty_Object(this[this.MH_live_plan_min_name[i]])) {
                this[this.MH_live_plan_min_name[i]].updata_super_game_div(next_place);
            }
        }
    }
    // 重置当前正在进行的生活技能的回合
    reset_round() {
        let now_GS = global.get_flag('GS_game_statu');
        if (!enums['live_plan_GS'].includes(now_GS)) {
            return; //当前没有进行生活技能，不需要重置
        }
        let live_manage_name = now_GS + '_manage';
        let live_manage = this[live_manage_name];
        live_manage.reset_round();
    }
    //停止当前正在进行的生活技能
    stop_now_live_skill() {
        let now_GS = global.get_flag('GS_game_statu');
        if (enums['live_plan_GS'].includes(now_GS)) {
            let manage_name = now_GS + '_manage';
            this[manage_name].stop_game_statu();
        }
    }
    //判断当前正在进行的生活技能是否处于休息状态
    is_live_plan_skill_rest() {
        let now_GS = global.get_flag('GS_game_statu');
        if (!enums['live_plan_GS'].includes(now_GS)) {
            return false; //当前不处于生活技能，不算休息状态
        }
        let manage_name = now_GS + '_manage';
        return this[manage_name].is_rest_status();
    }
    //设置指定地点的指定工作环境等级
    set_place_work_bench(place_id, work_bench_id, level) {
        if (is_Empty_Object(enums['all_work_bench'][work_bench_id])) {
            console.log('%s不是工作环境');
            return;
        }
        let min_name = enums['all_work_bench'][work_bench_id];
        let i = this.MH_live_plan_min_name[min_name];
        let manage_name = this.MH_live_plan_class_name[i];
        this[manage_name].set_place_work_bench(place_id, work_bench_id, level);
    }
}

export {};
