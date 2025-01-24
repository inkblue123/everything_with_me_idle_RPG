//帧率和时间库
export class FPS_manage {
    constructor() {
        this.FPS;
        this.FPS_ms; //帧率对应的每次运行间隔时间，毫秒
        this.last_run_time; //上次运行的时间
        this.last_sleep_ms; //上一次睡眠的时间
        this.now_run_time; //当前时间
        this.one_second_num; //一秒内运行的次数
    }
    // 初始化
    init(global_fps) {
        this.FPS = global_fps;
        this.FPS_ms = 1000 / this.FPS;
        this.last_run_time = Date.now();
        // this.now_run_time = new Date();
        this.one_second_num = 0;
        this.last_sleep_ms = 0;
    }
    //获取当前一帧还需要睡眠多长时间
    get_sleep_ms() {
        let sleep_ms;
        this.now_run_time = Date.now();
        let run_ms = this.now_run_time - this.last_run_time - this.last_sleep_ms;
        if (run_ms <= this.FPS_ms) {
            //运行了一轮游戏内容之后，时间小于一帧，应该睡眠
            sleep_ms = this.FPS_ms - run_ms;
        } else {
            //时间大于一帧，不睡眠
            sleep_ms = 0;
        }
        // console.log(`now = ${this.now_run_time},last = ${this.last_run_time}`);
        // console.log(`sleep_ms = ${sleep_ms}`);

        //从此处开始是新的一帧
        this.last_run_time = this.now_run_time;
        this.last_sleep_ms = sleep_ms;
        this.one_second_num++;
        if (this.one_second_num >= this.FPS) {
            let currentDate = new Date();
            let currentDate_ms = Date.now();
            // console.log(`${currentDate} ${currentDate_ms}`);
            // console.log(`运行了30次`);
            this.one_second_num = 0;
        }
        return sleep_ms;
    }
    get_now_time() {
        return this.now_run_time;
    }
}
