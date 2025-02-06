import { FPS_manage } from './FPS_class.js';
import { Place_manage } from './Place_class.js';
import { Random_manage } from './random_class.js';
import { Enemy_manage } from './enemy_class.js';
import { places } from '../Data/Place/Place.js';
//记录全局参数和游戏状态的对象
class Global {
    constructor() {
        this.config;
        this.fps_manage;
        this.place_manage;
        this.enemy_manage;
        this.random_manage;
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
    //对外提供一些常用功能的接口
    get_sleep_ms() {
        return this.fps_manage.get_sleep_ms();
    }
    get_combat_statu() {
        let now_place = this.place_manage.get_now_place();
        if (places[now_place].type == 'combat') {
            return true;
        }
        return false;
    }
    add_new_enemy(now_place) {
        return this.enemy_manage.add_new_enemy(now_place);
    }
}
//记录全局参数和游戏状态的对象
var global = new Global();

export { global };
