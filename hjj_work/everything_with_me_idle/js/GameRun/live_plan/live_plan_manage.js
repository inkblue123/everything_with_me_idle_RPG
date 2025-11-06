import { change_Live_plan_div, change_Explore_collection_div } from '../../Function/show_func.js';
import { is_Empty_Object } from '../../Function/Function.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { global } from '../../GameRun/global_manage.js';
import { Logging_manage } from './logging.js';
import { Fishing_manage } from './fishing.js';
// import { Mining_manage } from './mining.js';
import { Foraging_manage } from './foraging.js';
// import { Diving_manage } from './diving.js';
// import { Archaeology_manage } from './archaeology.js';
// import { Exploration_manage } from './exploration.js';
//生活技能规划管理对象
export class Live_plan_manage {
    constructor() {
        this.EC_live_plan_class_name = ['logging_manage', 'fishing_manage', 'mining_manage', 'foraging_manage', 'diving_manage', 'archaeology_manage', 'exploration_manage'];
        // this.logging_manage = new Logging_manage(); //伐木管理对象
        // this.fishing_manage = new Fishing_manage(); //钓鱼管理对象
        // // this.mining_manage = new Mining_manage(); //挖矿管理对象
        // this.foraging_manage = new Foraging_manage(); //采集管理对象
        // // this.diving_manage = new Diving_manage(); //潜水管理对象
        // // this.archaeology_manage = new Archaeology_manage(); //考古管理对象
        // // this.exploration_manage = new Exploration_manage(); //探索管理对象
    }
    init() {
        this.logging_manage = new Logging_manage(); //伐木管理对象
        this.fishing_manage = new Fishing_manage(); //钓鱼管理对象
        // this.mining_manage = new Mining_manage(); //挖矿管理对象
        this.foraging_manage = new Foraging_manage(); //采集管理对象
        // this.diving_manage = new Diving_manage(); //潜水管理对象
        // this.archaeology_manage = new Archaeology_manage(); //考古管理对象
        // this.exploration_manage = new Exploration_manage(); //探索管理对象
    }
    //对生活技能规划对象进行存档
    save_Live_plan_manage() {
        let Live_plan_save = new Object();
        //获取每个子对象的存档
        //伐木存档
        Live_plan_save.logging_save = this.logging_manage.save_logging_manage();
        //钓鱼存档
        Live_plan_save.fishing_save = this.fishing_manage.save_fishing_manage();
        //挖矿存档
        // Live_plan_save.mining_save = this.mining_manage.save_mining_manage();
        //采集存档
        Live_plan_save.foraging_save = this.foraging_manage.save_foraging_manage();
        //潜水存档
        // Live_plan_save.diving_save = this.diving_manage.save_diving_manage();
        //考古存档
        // Live_plan_save.archaeology_save = this.archaeology_manage.save_archaeology_manage();
        //探索存档
        // Live_plan_save.exploration_save = this.exploration_manage.save_exploration_manage();

        //保存当前生活技能规划界面展示了哪个大分类
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        let SM_div = document.getElementById('SM_div'); //合成制造窗口 Synthetic_manufacturing SM
        let EX_LP_name;
        if (EC_div.style.display == '') {
            Live_plan_save.LP_type = 'EC_switch_button';
            EX_LP_name = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];
        } else if (SM_div.style.display == '') {
            Live_plan_save.LP_type = 'SM_switch_button';
            // EX_LP_name = ['LGI', 'FIS', 'MIN', 'FAG', 'DIV', 'ACL', 'ELT'];
        }
        //保存当前生活技能规划界面展示了哪个具体技能
        for (let key of EX_LP_name) {
            let div_id = key + '_value_div';
            let div = document.getElementById(div_id);
            if (div.style.display == '') {
                Live_plan_save.EX_LP_name = key + '_button';
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
        //伐木存档
        this.logging_manage.load_logging_manage(Live_plan_save.logging_save);
        //钓鱼存档
        this.fishing_manage.load_fishing_manage(Live_plan_save.fishing_save);
        //挖矿存档
        // this.mining_manage.load_mining_manage(Live_plan_save.mining_save);
        //采集存档
        this.foraging_manage.load_foraging_manage(Live_plan_save.foraging_save);
        //潜水存档
        // this.diving_manage.load_diving_manage(Live_plan_save.diving_save);
        //考古存档
        // this.archaeology_manage.load_archaeology_manage(Live_plan_save.archaeology_save);
        //探索存档
        // this.exploration_manage.load_exploration_manage(Live_plan_save.exploration_save);

        // 将生活技能规划界面切换到存档中保存的技能上
        change_Live_plan_div(Live_plan_save.LP_type); //切换到大类
        if (Live_plan_save.LP_type == 'EC_switch_button') {
            change_Explore_collection_div(Live_plan_save.EX_LP_name);
            let radio_div = document.getElementById(Live_plan_save.EX_LP_name);
            radio_div.checked = true;
        } else {
            //合成制造部分还没开发，暂时不能跳转，只处理搜索采集类型的子技能
        }
    }
    //获取探索采集类生活技能的管理对象
    get_EC_live_skill_manage(manage_name) {
        if (!this.EC_live_plan_class_name.includes(manage_name)) {
            console.log('未知管理对象，无法获取');
        }
        if (is_Empty_Object(this[manage_name])) {
            console.log('%s管理对象未定义', manage_name);
        }
        return this[manage_name];
    }
    //更新当前正在进行的生活技能的数值
    updata_live_plan_game_data(now_GS) {
        if (!enums['live_plan_GS'].includes(now_GS)) {
            console.log('当前进行的游戏状态不属于生活技能，无法处理');
            return;
        }
        let manage_name = now_GS + '_manage';
        this[manage_name].updata_live_plan_data();
    }
    //更新当前正在进行的生活技能的界面
    updata_live_plan_game_div(now_GS) {
        if (!enums['live_plan_GS'].includes(now_GS)) {
            console.log('当前进行的游戏状态不属于生活技能，无法处理');
            return;
        }
        let manage_name = now_GS + '_manage';
        this[manage_name].updata_live_plan_div();
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
        //无论当前正在进行什么生活技能，移动地点之后都要停止
        this.stop_now_live_skill();

        //探索采集类生活技能
        let EC_live_plan_min_name = { LGI: 0, FIS: 1, MIN: 2, FAG: 3, DIV: 4, ACL: 5, ELT: 6 };
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
        //合成制造类生活技能

        //当前展示的那一个生活技能需要特别更新
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        if (EC_div.style.display == '') {
            let EC_skill;
            let radios = document.querySelectorAll('input[name="EC_switch"]');
            // 找到当前激活的生活技能
            for (const radio of radios) {
                if (radio.checked) {
                    EC_skill = radio.value;
                    break;
                }
            }
            EC_skill = EC_skill.substring(0, 3);
            let i = EC_live_plan_min_name[EC_skill];
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].updata_super_game_div(next_place);
            }
        }
    }
    //读取存档，地点更新，给各个技能对象更新地点信息
    load_set_new_place(next_place) {
        //读取存档时保留存档中的游戏状态
        // this.stop_now_live_skill();

        //探索采集类生活技能
        let EC_live_plan_min_name = { LGI: 0, FIS: 1, MIN: 2, FAG: 3, DIV: 4, ACL: 5, ELT: 6 };
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
        //合成制造类生活技能

        // 当前展示的那一个生活技能需要特别更新
        let EC_div = document.getElementById('EC_div'); //搜索采集窗口 Explore_collection EC
        if (EC_div.style.display == '') {
            let EC_skill;
            let radios = document.querySelectorAll('input[name="EC_switch"]');
            // 找到当前激活的生活技能
            for (const radio of radios) {
                if (radio.checked) {
                    EC_skill = radio.value;
                    break;
                }
            }
            EC_skill = EC_skill.substring(0, 3);
            let i = EC_live_plan_min_name[EC_skill];
            if (!is_Empty_Object(this[this.EC_live_plan_class_name[i]])) {
                this[this.EC_live_plan_class_name[i]].updata_super_game_div(next_place);
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
}

export {};
