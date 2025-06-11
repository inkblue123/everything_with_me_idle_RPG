import { Time_manage } from './Time_class.js';
import { Place_manage } from './Place_class.js';
import { Random_manage } from './random_class.js';
import { Enemy_manage } from './enemy_class.js';
import { Combat_manage } from './combat_class.js';
import { Exp_manage } from './exp_manage.js';
import { Game_event_manage } from './game_event/game_event_manage.js';
import { Global_flag_manage } from './global_flag/global_flag_manage.js';
//记录全局参数和游戏状态的对象
class Global {
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
    }
    init() {
        //获取配置
        this.init_config();
        //初始化
        this.time_manage = new Time_manage();
        this.time_manage.init(this.config.fps);

        this.place_manage = new Place_manage();
        this.place_manage.init();

        this.enemy_manage = new Enemy_manage();
        this.enemy_manage.init();

        this.random_manage = new Random_manage();
        this.combat_manage = new Combat_manage();
        this.exp_manage = new Exp_manage();

        this.game_event_manage = new Game_event_manage();
        // this.game_event_manage.init();

        this.global_flag_manage = new Global_flag_manage();
        this.global_flag_manage.init();
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
    get_global_flag_game_status() {
        return this.global_flag_manage.GS_status;
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
    get_combat_statu() {
        return this.global_flag_manage.get_flag('GS_combat_statu');
    }
    add_new_enemy() {
        let now_place = this.place_manage.get_now_place();
        return this.enemy_manage.add_new_enemy(now_place);
    }
    set_conbat_player_attack(player_Attack_effect) {
        this.combat_manage.set_player_next_attack(player_Attack_effect);
    }
    //游戏运行一帧，计算全局内容
    run_game_FPS() {
        if (this.get_combat_statu()) {
            //当前处于战斗状态，这一帧需要计算战斗的情况
            //敌人主动技能
            this.enemy_manage.run_enemy_active_skill();
            //进行战斗
            this.combat_manage.run_combat();

            //刷出新怪
            this.add_new_enemy();
            //战斗界面敌人ui更新
            this.enemy_manage.updata_enemy_show();

            //战斗经验结算
            this.exp_manage.set_leveling_behavior();
            this.exp_manage.player_get_exp();
        }

        //更新游戏信息
        this.global_flag_manage.updata_flag();
    }
    //获取游戏标记
    get_flag(flag_name) {
        return this.global_flag_manage.get_flag(flag_name);
    }
    set_flag(flag_name, flag_value) {
        return this.global_flag_manage.set_flag(flag_name, flag_value);
    }
    //对global对象进行存档
    save_global_class() {
        let global_save = new Object();
        //获取每个子对象的存档
        //时间类
        global_save.Time_save = this.time_manage.save_Time_class();
        //地点类
        global_save.place_save = this.place_manage.save_place_class();
        //游戏状态类
        global_save.global_flag_save = this.global_flag_manage.save_global_flag_class();
        //敌人类
        global_save.enemy_save = this.enemy_manage.save_enemy_class();

        //游戏事件管理类
        global_save.game_event_save = this.game_event_manage.save_Game_event_class();
        //还没有开发需要用到重要随机数的内容，随机数类目前基本没用
        // this.random_manage; //随机数管理类
        //目前战斗管理类只是负责记录参数进行运算的平台，并没有需要保存的信息
        // this.combat_manage; //战斗管理类
        //经验管理类和战斗管理类相似，目前只是记一下数据，然后在同一帧里马上计算，所以也不需要处理
        // this.exp_manage; //技能经验管理类

        return global_save;
    }
    //加载游戏存档
    load_global_class(global_save) {
        this.time_manage.load_Time_class(global_save.Time_save);
        this.global_flag_manage.load_global_flag_class(global_save.global_flag_save);
        this.game_event_manage.load_Game_event_class(global_save.game_event_save);
        this.place_manage.load_place_class(global_save.place_save);
        this.enemy_manage.load_enemy_class(global_save.enemy_save);
    }
}
//记录全局参数和游戏状态的对象
var global = new Global();

export { global };
