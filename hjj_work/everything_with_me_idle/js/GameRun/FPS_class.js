//帧率和时间库
export class FPS_manage {
    constructor() {
        //真实时间，取自Date.now()
        this.FPS;
        this.FPS_ms; //帧率对应的每次运行间隔时间，毫秒
        this.now_time; //当前时间
        this.start_time; //一帧开始时间
        this.last_start_time; //上一帧开始时间
        this.end_time; //一帧结束时间
        this.last_run_ms; //上一帧实际上运行了多久
        this.one_second_num; //一秒内运行的次数
        this.sleep_ms; //当前帧需要睡眠的时间
        //利用游戏速度和真实时间计算得到的假时间
        this.game_speed; //游戏速度
        this.game_now_time; //当前游戏时间
        this.last_game_now_time; //上一帧的游戏时间
    }
    // 初始化
    init(global_fps) {
        this.FPS = global_fps;
        this.FPS_ms = 1000 / this.FPS;
        this.now_time = Date.now();
        this.start_time = this.now_time;
        this.one_second_num = 0;
        this.game_speed = 1;
        this.game_now_time = this.now_time;
        this.last_game_now_time = this.now_time;
    }
    //修改游戏速度
    set_game_speed(game_speed) {
        this.game_speed = game_speed;
    }
    //一帧开始，更新相关时间
    updata_FPS_start() {
        //更新真实时间
        this.now_time = Date.now();
        this.last_start_time = this.start_time;
        this.start_time = this.now_time;
        //更新游戏时间
        let last_run_ms = this.start_time - this.last_start_time;
        this.game_now_time = this.last_game_now_time + last_run_ms * this.game_speed;
        this.last_game_now_time = this.game_now_time;
    }
    //一帧结束，更新相关时间
    updata_FPS_end() {
        this.now_time = Date.now();
        this.end_time = this.now_time;
        let run_ms = this.end_time - this.start_time;
        if (run_ms <= this.FPS_ms) {
            //运行了一轮游戏内容之后，时间小于一帧，应该睡眠
            this.sleep_ms = this.FPS_ms - run_ms;
        } else {
            //时间大于一帧，不睡眠
            this.sleep_ms = 0;
        }
        this.one_second_num++;
        if (this.one_second_num >= this.FPS) {
            // let currentDate = new Date();
            // let currentDate_ms = Date.now();
            // console.log(`${currentDate} ${currentDate_ms}`);
            // console.log(`运行了30次`);
            this.one_second_num = 0;
        }
    }
    //获取当前一帧还需要睡眠多长时间
    get_sleep_ms() {
        return this.sleep_ms;
    }
    //获取当前真实时间
    get_now_time() {
        return this.now_time;
    }
    //获取当前游戏时间
    get_game_now_time() {
        return this.game_now_time;
    }
}
