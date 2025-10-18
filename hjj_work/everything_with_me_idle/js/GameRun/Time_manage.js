import { is_Empty_Object } from '../Function/Function.js';

//帧率和时间库
export class Time_manage {
    constructor() {
        //真实时间，取自Date.now()
        this.FPS;
        this.FPS_ms; //帧率对应的每次运行间隔时间，毫秒
        this.run_flag = false;
        this.now_time; //当前真实时间
        this.start_time; //一帧开始时间
        this.last_start_time = 0; //上一帧开始时间
        this.end_time; //一帧结束时间
        this.last_run_ms; //上一帧实际上运行了多久
        this.one_second_num; //一秒内运行的次数
        this.sleep_ms; //当前帧需要睡眠的时间
        //利用游戏速度和真实时间计算得到的假时间
        this.game_speed; //游戏速度
        this.game_now_time; //当前游戏时间
        this.last_game_now_time; //上一帧的游戏时间

        this.game_date = new Object(); //当前游戏日期
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
        //初始化游戏日期
        this.reset_game_date();
        this.show_game_date();
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
        //更新游戏日期
        this.updata_game_date(this.game_now_time);
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
            // console.log('%s %s',currentDate);
            // console.log('运行了30次');
            this.one_second_num = 0;
        }
    }
    updata_FPS_start_rAF() {
        this.now_time = Date.now();
        if (this.now_time - this.last_start_time >= this.FPS_ms) {
            //更新游戏时间
            let last_run_ms = this.now_time - this.last_start_time;
            this.game_now_time = this.last_game_now_time + last_run_ms * this.game_speed;
            this.last_game_now_time = this.game_now_time;
            //更新游戏日期
            this.updata_game_date(this.game_now_time);
            this.last_start_time = this.now_time;
            this.run_flag = true;
        }
        if (this.run_flag == true) {
        }
    }
    updata_FPS_end_rAF() {
        this.run_flag = false;
    }
    get_run_flag() {
        return this.run_flag;
    }

    //获取当前一帧还需要睡眠多长时间
    get_sleep_ms() {
        return this.sleep_ms;
    }
    //获取当前真实时间（毫秒级）
    get_now_time() {
        return this.now_time;
    }
    //获取当前游戏时间（毫秒级）
    get_game_now_time() {
        return this.game_now_time;
    }
    //获取当前游戏速度
    get_game_speed() {
        return this.game_speed;
    }
    //设置游戏日期到初始值
    reset_game_date() {
        this.game_date.year = 2025;
        this.game_date.month = 4;
        this.game_date.day = 1;
        this.game_date.hours = 16;
        this.game_date.minutes = 0;
        this.game_date.start_time = this.now_time;
    }
    //更新游戏日期
    updata_game_date(game_now_time) {
        let newTime = new Date(game_now_time);
        let newSeconds = newTime.getTime() / 1000;
        let gameDateTime = new Date(this.game_date.start_time);
        let gameDateSeconds = gameDateTime.getTime() / 1000;

        if (newSeconds - gameDateSeconds >= 1) {
            this.game_date.minutes++;
            if (this.game_date.minutes >= 60) {
                this.game_date.minutes = 0;
                this.game_date.hours++;
            }
            if (this.game_date.hours >= 24) {
                this.game_date.hours = 0;
                this.game_date.day++;
            }
            if (this.game_date.day >= 31) {
                this.game_date.day = 1;
                this.game_date.month++;
            }
            if (this.game_date.month >= 13) {
                this.game_date.month = 1;
                this.game_date.year++;
            }
            this.game_date.start_time = game_now_time;
            this.show_game_date();
        }
    }
    //展示游戏日期
    show_game_date() {
        let game_date_div = document.getElementById('game_date_div');

        let date = this.game_date;
        let ch = '当前日期：';
        ch += date.year + '年' + date.month + '月' + date.day + '日';
        ch += '-' + date.hours + ':' + date.minutes;
        game_date_div.innerHTML = ch;
    }
    //获取游戏日期
    get_game_date() {
        return this.game_date;
    }
    //获取时间类部分的游戏存档
    save_Time_manage() {
        let Time_save = new Object();
        Time_save.game_date = this.game_date; //当前游戏日期
        return Time_save;
    }
    //加载时间类的游戏存档
    load_Time_manage(Time_save) {
        if (is_Empty_Object(Time_save)) {
            return;
        }
        this.game_date = Time_save.game_date; //当前游戏日期
        this.game_date.start_time = this.now_time; //当前游戏日期
        this.show_game_date();
    }
}
