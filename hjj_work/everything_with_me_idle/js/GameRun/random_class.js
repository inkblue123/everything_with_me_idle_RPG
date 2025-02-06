//随机数相关的对象
export class Random_manage {
    constructor() {}
    //生成一个min到max之间的1级随机数
    get_random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}

var random_manage = new Random_manage();

export { random_manage };
