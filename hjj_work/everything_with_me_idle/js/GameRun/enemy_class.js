import { places } from '../Data/Place/Place.js';
import { get_random } from '../Function/math_func.js';
//场地内的敌人对象
class place_enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.health_max = 1;
        this.health_point = 1;
        this.statu = false; //死活状态
        //战斗攻击属性
        this.combat_attack_attr = new Object();
        //战斗防御属性
        this.combat_defense_attr = new Object();
        //战斗生存属性
        this.combat_survival_attr = new Object();
    }
}

//记录敌人相关内容的对象
export class Enemy_manage {
    constructor() {
        this.now_place;
        this.last_add_enemy_time; //上次刷怪时间
        this.combat_place_enemys = new Object();
    }
    init() {
        this.combat_place_enemys['near_enemy_field'] = new Array();
        this.combat_place_enemys['in_enemy_field'] = new Array();
        this.combat_place_enemys['far_enemy_field'] = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                let enemy = new place_enemy(0);
                field.push(enemy);
            }
        }
        this.last_add_enemy_time = 0; //上次刷怪时间
    }
    get_combat_place_enemys() {
        return this.combat_place_enemys;
    }
    //获取当前战斗场地内，某个id的敌人的数量
    get_combat_place_enemynum(enemy_id) {
        let enemy_num = 0;
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (field[i].statu) {
                    if (!enemy_id) {
                        //如果没指定敌人id，获取全部敌人的数量
                        enemy_num++;
                    } else if (enemy_slot.id == enemy_id) {
                        //获取指定id的敌人数量
                        enemy_num++;
                    }
                }
            }
        }
        return enemy_num;
    }
    //执行一次刷怪操作
    add_new_enemy(now_place) {
        this.now_place = now_place;
        //判断当前是否可以刷怪
        if (this.judge_add_new_enemy(now_place)) {
            //可以刷怪，尝试进行刷怪
            if (this.try_add_new_enemy()) {
                //刷怪成功，更新参数
                this.last_add_enemy_time = Date.now();
            }
        }
    }

    //判断当前帧是否可以刷怪
    judge_add_new_enemy() {
        //根据地点信息，选择判断的依据
        let time_judge = false; //刷怪间隔
        let live_enemy_num_judge = false; //同场敌人数量
        let all_enemy_num_judge = false; //已击杀敌人数量

        //同场敌人数量判断
        if (this.get_combat_place_enemynum() < places[this.now_place].max_enemy_num) {
            //敌人数量不足，可以刷怪
            live_enemy_num_judge = true;
        }
        //上次刷怪时间间隔判断
        let now_time = Date.now();
        if (now_time - this.last_add_enemy_time >= places[this.now_place].add_enemy_time * 1000) {
            time_judge = true;
        }
        if (places[this.now_place].unlimited_add_flag) {
            //当前区域总刷怪数量判断
            all_enemy_num_judge = true;
        }
        if (time_judge && live_enemy_num_judge && all_enemy_num_judge) {
            return true;
        } else {
            return false;
        }
    }
    //尝试刷一个新的敌人
    try_add_new_enemy() {
        //获取这次刷怪的位置
        let place_x, place_y;
        if (places[this.now_place].add_enemy_type == 'fixed') {
            //地点限定，刷怪位置固定
            place_x = places[this.now_place].type_limit.field;
            place_y = get_random(0, 8);
        } else if (places[this.now_place].add_enemy_type == 'random') {
            //地点不约束，随机刷新
            place_x = get_random(1, 3);
            if (place_x == 1) place_x = 'near_enemy_field';
            if (place_x == 2) place_x = 'in_enemy_field';
            if (place_x == 3) place_x = 'far_enemy_field';
            place_y = get_random(0, 8);
        }

        let raw_enemy = this.combat_place_enemys[place_x][place_y];
        if (raw_enemy.statu == true) {
            //位置已被占据，此次刷怪中止
            return false;
        }
        //获取这次要刷的敌人id
        let et_num = places[this.now_place].enemy.length;
        let et_ran = get_random(0, et_num - 1);
        let enemy_id = places[this.now_place].enemy[et_ran];

        //在指定位置新增这个怪
        let enemy = this.add_enemy(place_x, place_y, enemy_id);
        return true;
    }
    //在指定位置刷出一个敌人
    add_enemy(place_x, place_y, enemy_id) {
        if (place_x != 'near_enemy_field' && place_x != 'in_enemy_field' && place_x != 'far_enemy_field') {
            console.log(`add_enemy：输入的目标地点错误 ${place_x}`);
        }
        let field = this.combat_place_enemys[place_x];
        field[place_y] = new place_enemy(enemy_id);
        field[place_y].statu = true;
        return field[place_y];
    }
    //清空所有敌人
    delete_all_enemy() {
        for (let place_x in this.combat_place_enemys) {
            let field = this.combat_place_enemys[place_x];
            for (let place_y = 0; place_y < 9; place_y++) {
                field[place_y] = new place_enemy(0);
            }
        }
    }
}
