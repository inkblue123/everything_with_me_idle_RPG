import { Logging_manage } from './logging.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { global } from '../../GameRun/global_manage.js';
import { is_Empty_Object } from '../../Function/Function.js';
//生活技能规划管理对象
export class Live_plan_manage {
    constructor() {
        this.EC_live_plan_class_name = [
            'logging_manage',
            'fishing_manage',
            'mining_manage',
            'foraging_manage',
            'diving_manage',
            'archaeology_manage',
            'exploration_manage',
        ];
        this.logging_manage = new Logging_manage(); //伐木的目标对象
    }
    //对生活技能规划对象进行存档
    save_Live_plan_class() {
        let Live_plan_save = new Object();
        //获取每个子对象的存档
        //伐木管理对象
        Live_plan_save.logging_save = this.logging_manage.save_logging_class();

        return Live_plan_save;
    }
    //加载游戏存档
    load_Live_plan_class(Live_plan_save) {
        if (is_Empty_Object(Live_plan_save)) {
            return;
        }
        //伐木存档
        this.logging_manage.load_Logging_class(Live_plan_save.logging_save);
    }
    get_logging_manage() {
        return this.logging_manage;
    }
    //更新当前正在进行的生活技能的数值
    updata_live_plan_game_data(now_GS) {
        if (now_GS == 'logging') {
            // 伐木 logging LGI
            this.logging_manage.updata_logging_data();
        } else if (now_GS == 'fishing') {
            //钓鱼 fishing FIS
        } else if (now_GS == 'mining') {
            //挖矿 mining MIN
        } else if (now_GS == 'foraging') {
            //采集 foraging FAG
        } else if (now_GS == 'diving') {
            //潜水 diving DIV
        } else if (now_GS == 'archaeology') {
            //考古 archaeology ACL
        } else if (now_GS == 'exploration') {
            //探索 exploration ELT
        } else if (now_GS == 'engrave') {
            //雕刻
        }
    }
    //更新当前正在进行的生活技能的界面
    updata_live_plan_game_div(now_GS) {
        if (now_GS == 'logging') {
            //伐木
            this.logging_manage.updata_logging_div();
        } else if (now_GS == 'fishing') {
            //钓鱼
        } else if (now_GS == 'mining') {
            //挖矿
        } else if (now_GS == 'foraging') {
            //采集
        } else if (now_GS == 'diving') {
            //潜水
        } else if (now_GS == 'archaeology') {
            //考古
        } else if (now_GS == 'exploration') {
            //探索
        } else if (now_GS == 'engrave') {
            //雕刻
        }
    }
    //玩家属性更新，更新到生活技能类里
    updata_player_data(end_data_attr) {
        //伐木更新
        this.logging_manage.updata_player_data(end_data_attr);
    }
    //地点更新，给各个技能对象更新地点信息
    set_new_place(next_place) {
        //无论当前正在进行什么生活技能，移动地点之后都要停止
        let now_GS = global.get_flag('GS_game_statu');
        if (enums['live_plan_GS'].includes(now_GS)) {
            let manage_name = now_GS + '_manage';
            this[manage_name].stop_game_statu();
        }

        //探索采集类生活技能
        let EC_live_plan_min_name = { LGI: 0, FIS: 1, MIN: 2, FAG: 3, DIV: 4, ACL: 5, ELT: 6 };
        let live_plan_ch = ['伐木', '钓鱼', '挖矿', '采集', '潜水', '考古', '探索'];
        for (let i = 0; i < 7; i++) {
            if (!places[next_place].live_plan_flag[i]) {
                // 不可进行对应技能，不用更新
                continue;
            }
            //如果地点可以进行对应技能，更新地点信息
            this[this.EC_live_plan_class_name[i]].set_new_place(next_place);
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
            this[this.EC_live_plan_class_name[i]].updata_super_game_div(next_place);
        }
    }
    //重置当前正在进行的生活技能的回合
    reset_round() {
        let now_GS = global.get_flag('GS_game_statu');
        if (!enums['live_plan_GS'].includes(now_GS)) {
            return; //当前没有进行生活技能，不需要重置
        }
        let live_manage_name = now_GS + '_manage';
        let live_manage = this[live_manage_name];
        live_manage.reset_round();
    }
}

export {};
