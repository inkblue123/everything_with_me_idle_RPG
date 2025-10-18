import { Place_manage } from './Place_manage.js';
import { Time_manage } from './Time_manage.js';
import { Random_manage } from './random_manage.js';
import { Enemy_manage } from './enemy_manage.js';
import { Combat_manage } from './combat_manage.js';
import { Exp_manage } from './exp_manage.js';
import { Game_event_manage } from './game_event/game_event_manage.js';
import { Global_flag_manage } from './global_flag/global_flag_manage.js';
import { Live_plan_manage } from './live_plan/live_plan_manage.js';
import { Store_manage } from './store/store_manage.js';
//记录全局参数和游戏状态的对象
class Global_manage {
    constructor() {
        this.config; //全局设置
        this.time_manage; //帧率和时间类
        this.place_manage; //玩家所处地点类
        this.enemy_manage; //场地内敌人类
        this.random_manage; //随机数管理类
        this.combat_manage; //战斗管理类
        this.exp_manage; //技能经验管理类
        this.game_event_manage; //游戏事件管理类
        this.global_flag_manage; //游戏状态管理类
        this.live_plan_manage; //生活技能管理类
        this.store_manage; //交易和商店管理类
    }
    init() {
        //获取配置
        this.init_config();
        //初始化
        this.time_manage = new Time_manage(); //帧率和时间类
        this.time_manage.init(this.config.fps);
        this.place_manage = new Place_manage(); //玩家所处地点类
        this.place_manage.init();
        this.enemy_manage = new Enemy_manage(); //场地内敌人类
        this.enemy_manage.init();
        this.random_manage = new Random_manage(); //随机数管理类
        this.combat_manage = new Combat_manage(); //战斗管理类
        this.exp_manage = new Exp_manage(); //技能经验管理类
        this.game_event_manage = new Game_event_manage(); //游戏事件管理类
        // this.game_event_manage.init();
        this.global_flag_manage = new Global_flag_manage(); //游戏状态管理类
        this.global_flag_manage.init();
        this.live_plan_manage = new Live_plan_manage(); //生活技能管理类
        // this.live_plan_manage.init();
        this.store_manage = new Store_manage(); //交易和商店管理类
    }
    init_config() {
        //
        this.config = new Object();
        this.config.fps = 30;
    }
    //如果需要，可以拿整个对象去调接口
    get_time_manage() {
        return this.time_manage;
    }
    get_place_manage() {
        return this.place_manage;
    }
    get_enemy_manage() {
        return this.enemy_manage;
    }
    get_random_manage() {
        return this.random_manage;
    }
    get_combat_manage() {
        return this.combat_manage;
    }
    get_exp_manage() {
        return this.exp_manage;
    }
    get_game_event_manage() {
        return this.game_event_manage;
    }
    get_global_flag_manage() {
        return this.global_flag_manage;
    }
    get_live_plan_manage() {
        return this.live_plan_manage;
    }
    get_store_manage() {
        return this.store_manage;
    }
    //对外提供一些常用功能的接口
    updata_time_manage() {
        return this.time_manage.updata_time_manage();
    }
    get_sleep_ms() {
        return this.time_manage.get_sleep_ms();
    }
    get_now_time() {
        return this.time_manage.get_now_time();
    }
    get_game_now_time() {
        return this.time_manage.get_game_now_time();
    }
    set_conbat_player_attack(player_Attack_effect) {
        this.combat_manage.set_player_next_attack(player_Attack_effect);
    }
    //获取游戏标记
    get_flag(flag_name) {
        return this.global_flag_manage.get_flag(flag_name);
    }
    set_flag(flag_name, flag_value) {
        return this.global_flag_manage.set_flag(flag_name, flag_value);
    }
    //对global对象进行存档
    save_global_manage() {
        let global_save = new Object();
        //获取每个子对象的存档
        //时间类
        global_save.Time_save = this.time_manage.save_Time_manage();
        //地点类
        global_save.place_save = this.place_manage.save_place_manage();
        //游戏状态类
        global_save.global_flag_save = this.global_flag_manage.save_global_flag_manage();
        //敌人类
        global_save.enemy_save = this.enemy_manage.save_enemy_manage();
        //游戏事件管理类
        global_save.game_event_save = this.game_event_manage.save_Game_event_manage();
        //生活技能管理类
        global_save.live_plan_save = this.live_plan_manage.save_Live_plan_manage();
        //随机数管理类
        global_save.random_save = this.random_manage.save_Random_manage();
        //交易和商店管理类
        global_save.store_save = this.store_manage.save_Store_manage();

        //目前战斗管理类只是负责记录参数进行运算的平台，并没有需要保存的信息
        // this.combat_manage; //战斗管理类
        //经验管理类和战斗管理类相似，目前只是记一下数据，然后在同一帧里马上计算，所以也不需要处理
        // this.exp_manage; //技能经验管理类

        return global_save;
    }
    //加载游戏存档
    load_global_manage(global_save) {
        this.init_config();
        this.time_manage = new Time_manage(); //帧率和时间类
        this.time_manage.init(this.config.fps);
        this.time_manage.load_Time_manage(global_save.Time_save);
        this.global_flag_manage.load_global_flag_manage(global_save.global_flag_save);
        this.game_event_manage.load_Game_event_manage(global_save.game_event_save);
        this.enemy_manage.load_enemy_manage(global_save.enemy_save);
        this.live_plan_manage.load_Live_plan_manage(global_save.live_plan_save);
        this.random_manage.load_Random_manage(global_save.random_save);
        this.store_manage.load_Store_manage(global_save.store_save);
        // 其他的游戏部分内容展示有很多依赖于地点的切换，所以地点存档最后更新
        this.place_manage.load_place_manage(global_save.place_save);
    }
}
//记录全局参数和游戏状态的对象
var global = new Global_manage();

export { global };
