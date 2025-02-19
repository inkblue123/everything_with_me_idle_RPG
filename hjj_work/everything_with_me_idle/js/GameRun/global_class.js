import { FPS_manage } from './FPS_class.js';
import { Place_manage } from './Place_class.js';
import { Random_manage } from './random_class.js';
import { Enemy_manage } from './enemy_class.js';
import { Combat_manage } from './combat_class.js';
import { Exp_manage } from './exp_class.js';
import { places } from '../Data/Place/Place.js';
import { updata_place } from '../Function/Updata_func.js';
//记录全局参数和游戏状态的对象
class Global {
    constructor() {
        this.config; //全局设置
        this.fps_manage; //帧率和时间类
        this.place_manage; //玩家所处地点类
        this.enemy_manage; //场地内敌人类
        this.random_manage; //随机数管理类
        this.combat_manage; //战斗管理类
        this.exp_manage; //技能经验管理类
    }
    init() {
        //获取配置
        this.init_config();
        //初始化
        this.fps_manage = new FPS_manage();
        this.fps_manage.init(this.config.fps);

        this.place_manage = new Place_manage();
        this.place_manage.init();

        this.enemy_manage = new Enemy_manage();
        this.enemy_manage.init();

        this.random_manage = new Random_manage();
        this.combat_manage = new Combat_manage();
        this.exp_manage = new Exp_manage();
    }
    init_config() {
        //
        this.config = new Object();
        this.config.fps = 30;
    }
    //如果需要，可以拿整个对象去调接口
    get_fps_manage() {
        return this.fps_manage;
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
    //对外提供一些常用功能的接口
    update_FPS_manage() {
        return this.fps_manage.update_FPS_manage();
    }
    get_sleep_ms() {
        return this.fps_manage.get_sleep_ms();
    }
    get_now_time() {
        return this.fps_manage.get_now_time();
    }
    get_game_now_time() {
        return this.fps_manage.get_game_now_time();
    }
    get_combat_statu() {
        let now_place = this.place_manage.get_now_place();
        if (places[now_place].type == 'combat') {
            return true;
        }
        return false;
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
    //玩家死亡，处理相关逻辑
    player_death() {
        //移动到安全的地方
        updata_place('test_normal1');
        //清空玩家buff
        //清空战斗区域的临时加成
    }
}
//记录全局参数和游戏状态的对象
var global = new Global();

export { global };
