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
        this.sleep_ms; //当前帧需要睡眠的时间
        //利用游戏速度和真实时间计算得到的假时间
        this.game_speed = 1; //游戏速度
        this.game_speed_num_component = new Object(); //游戏速度组成部分，直接加算
        this.game_speed_ratio_component = new Object(); //游戏速度组成部分，直接乘算
        this.game_now_time; //当前游戏时间
        this.last_game_now_time; //上一帧的游戏时间

        this.init_game_date = new Object(); //初始游戏日期
        this.game_date = new Object(); //当前游戏日期

        //测试参数
        this.one_second_num = 0; //一秒内运行的次数
        this.last_log_time = 0; //上次出测试日志的时间
    }
    // 初始化
    init() {
        this.FPS = 30;
        this.FPS_ms = 1000 / this.FPS;
        this.run_flag = false;
        //游戏时间
        this.now_time = Date.now();
        this.start_time = this.now_time;
        this.game_now_time = this.now_time;
        this.last_game_now_time = this.now_time;
        //游戏速度

        //初始化游戏日期
        this.set_init_game_date();
        this.show_game_date();
    }
    //修改游戏帧率
    set_game_FPS(new_fps) {
        //帧率相同，不需要修改
        if (new_fps == this.FPS) {
            return;
        }

        this.FPS = new_fps;
        this.FPS_ms = 1000 / this.FPS;
    }
    //修改游戏速度
    set_game_speed_num(type, game_speed) {
        //记录是什么功能要求调整游戏速度的
        if (is_Empty_Object(this.game_speed_num_component[type])) {
            this.game_speed_num_component[type] = 0;
        }
        this.game_speed_num_component[type] += game_speed;
        this.updata_game_speed();
    }
    set_game_speed_ratio(type, game_speed) {
        //记录是什么功能要求调整游戏速度的
        this.game_speed_ratio_component[type] = game_speed;
        this.updata_game_speed();
    }
    //更新最终使用的游戏速度
    updata_game_speed() {
        //最高优先级游戏速度修改
        if (!is_Empty_Object(this.game_speed_num_component['global'])) {
            if (this.game_speed_num_component['global'] != 1) {
                this.game_speed = this.game_speed_num_component['global'];
                return;
            }
        }

        let num = 1;
        let ratio = 0;
        for (let type in this.game_speed_num_component) {
            if (type == 'global') {
                continue;
            }
            num += this.game_speed_num_component[type];
        }
        for (let type in this.game_speed_ratio_component) {
            ratio += this.game_speed_ratio_component[type];
        }
        if (ratio >= 0) {
            this.game_speed = num * (100 + ratio) * 0.01;
        } else {
            this.game_speed = num * (100 / (100 - ratio));
        }
    }
    //一帧开始，更新相关时间
    updata_FPS_start() {
        //更新真实时间
        this.now_time = Date.now();
        this.last_start_time = this.start_time;
        this.start_time = this.now_time;
        //更新游戏时间
        let last_run_ms = this.start_time - this.last_start_time;
        this.last_game_now_time = this.game_now_time;
        this.game_now_time = this.last_game_now_time + last_run_ms * this.game_speed;
        //更新游戏日期
        this.game_date = this.judge_game_date(this.game_now_time);
        this.show_game_date();
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
        //时间管理类的测试函数
        // this.set_time_manage_log();
    }
    //时间管理类的测试函数
    set_time_manage_log() {
        this.one_second_num++;
        if (this.now_time - this.last_log_time >= 1000) {
            let currentDate = new Date();
            let currentDate_ms = Date.now();
            console.log('%s', currentDate);
            console.log('运行了%s次', this.one_second_num);
            this.one_second_num = 0;
            this.last_log_time = this.now_time;
        }
    }
    updata_FPS_start_rAF() {
        this.now_time = Date.now();
        if (this.now_time - this.last_start_time >= this.FPS_ms) {
            //更新游戏时间
            let last_run_ms = this.now_time - this.last_start_time;
            this.last_game_now_time = this.game_now_time;
            this.game_now_time = this.last_game_now_time + last_run_ms * this.game_speed;
            //更新游戏日期
            this.game_date = this.judge_game_date(this.game_now_time);
            this.show_game_date();
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
    //获取上一帧的游戏时间（毫秒级）
    get_last_game_now_time() {
        return this.last_game_now_time;
    }
    //获取当前游戏速度
    get_game_speed() {
        return this.game_speed;
    }
    //设置游戏日期到初始值
    set_init_game_date() {
        this.init_game_date.year = 2025;
        this.init_game_date.month = 4;
        this.init_game_date.day = 1;
        this.init_game_date.hours = 16;
        this.init_game_date.minutes = 0;
        this.init_game_date.start_time = this.now_time;
        //更新游戏日期
        this.game_date = this.judge_game_date(this.now_time);
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
    //通过输入的时间戳计算这个时间戳对应的游戏日期
    judge_game_date(time) {
        let timeSeconds = Math.floor(time / 1000);
        let initTimeSeconds = Math.floor(this.init_game_date.start_time / 1000);

        //根据秒的差距增加分钟数值，每超过60分钟进位到小时
        let game_date = new Object();
        game_date.minutes = this.init_game_date.minutes + (timeSeconds - initTimeSeconds);
        let add_hours = Math.floor(game_date.minutes / 60);
        game_date.minutes = game_date.minutes % 60;
        //每超过24小时进位到日
        game_date.hours = this.init_game_date.hours + add_hours;
        let add_day = Math.floor(game_date.hours / 24);
        game_date.hours = game_date.hours % 24;
        //每超过31日进位到月
        game_date.day = this.init_game_date.day + add_day;
        let add_month = Math.floor(game_date.day / 31);
        game_date.day = game_date.day % 31;
        //每超过13月进位到年
        game_date.month = this.init_game_date.month + add_month;
        let add_year = Math.floor(game_date.month / 13);
        game_date.month = game_date.month % 13;
        //年不再进位
        game_date.year = this.init_game_date.year + add_year;

        return game_date;
    }
    //获取时间类部分的游戏存档
    save_Time_manage() {
        let Time_save = new Object();
        Time_save.init_game_date = this.init_game_date; //当前游戏日期
        Time_save.now_time = this.now_time; //当前游戏时间戳
        return Time_save;
    }
    //加载时间类的游戏存档
    load_Time_manage(Time_save) {
        if (is_Empty_Object(Time_save)) {
            return;
        }
        this.init_game_date = Time_save.init_game_date; //当前游戏日期
        this.init_game_date.start_time = this.now_time - (Time_save.now_time - this.init_game_date.start_time);
        this.show_game_date();
    }
}
