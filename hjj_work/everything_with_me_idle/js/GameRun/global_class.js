import { Time_manage } from './Time_class.js';
import { Place_manage } from './Place_class.js';
import { Random_manage } from './random_class.js';
import { Enemy_manage } from './enemy_class.js';
import { Combat_manage } from './combat_class.js';
import { Exp_manage } from './exp_class.js';
import { Game_event_manage } from './game_event.js';
import { Global_flag_manage } from './global_flag_class.js';
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
        this.game_event_manage; //全局标记管理类
        this.global_flag_manage; //全局标记管理类
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
        this.game_event_manage.init();
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
        return this.global_flag_manage.get_game_status('GS_combat_statu');
        // let now_place = this.place_manage.get_now_place();
        // if (places[now_place].type == 'combat') {
        //     return true;
        // }
        // return false;
    }
    add_new_enemy() {
        let now_place = this.place_manage.get_now_place();
        return this.enemy_manage.add_new_enemy(now_place);
    }
    set_conbat_player_attack(player_Attack_effect) {
        this.combat_manage.set_player_next_attack(player_Attack_effect);
    }
    //游戏运行一帧，计算其他全局内容
    run_game_FPS() {
        //敌人主动技能
        this.enemy_manage.run_enemy_active_skill();
        //玩家被动技能
        //玩家临时buff
    }

    get_flag(flag_name) {
        return this.global_flag_manage.get_flag(flag_name);
    }
    set_flag(flag_name, flag_value) {
        return this.global_flag_manage.set_flag(flag_name, flag_value);
    }
    // //玩家死亡，处理相关逻辑
    // player_death() {
    //     //移动到安全的地方
    //     this.place_manage.set_next_place('village_home');
    //     //清空玩家buff
    //     //清空战斗区域的临时加成
    // }
}
//记录全局参数和游戏状态的对象
var global = new Global();

export { global };
