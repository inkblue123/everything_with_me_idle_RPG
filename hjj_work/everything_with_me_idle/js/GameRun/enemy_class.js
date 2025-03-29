import { global } from './global_class.js';
import { Attack_effect } from './combat_class.js';
import { places } from '../Data/Place/Place.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { E_skills } from '../Data/Skill/Skill.js';
import { get_random, get_random_enemy_distance, Askill_effect_algorithm } from '../Function/math_func.js';

//场地内的敌人对象
class place_enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.health_point = 0; //当前血量
        this.attack_point = 0; //当前攻击进度
        this.statu = false; //死活状态
        this.distance = 0;
        //战斗攻击属性
        this.combat_attack_attr = new Object();
        //战斗防御属性
        this.combat_defense_attr = new Object();
        //战斗生存属性
        this.combat_survival_attr = new Object();
        this.now_time; //当前时间
        this.last_attack_time; //上次攻击的时间
        this.now_active_id; //当前要执行的主动技能id
        this.now_active_stage; //当前执行主动技能的第几个阶段
        this.now_skill_attack_speed; //当前执行的主动技能当前阶段的时长
        this.enemy_Attack_effect = new Attack_effect();
    }
    //初始化敌人
    init() {
        if (enemys[this.id]) {
            this.combat_attack_attr = JSON.parse(JSON.stringify(enemys[this.id].attack_attr));
            this.combat_defense_attr = JSON.parse(JSON.stringify(enemys[this.id].defense_attr));
            this.combat_survival_attr = JSON.parse(JSON.stringify(enemys[this.id].survival_attr));
            this.statu = true; //死活状态
            this.health_point = this.combat_survival_attr['health_max']; //设置满血
            this.attack_point = 0;
            this.distance = 0;
            this.last_attack_time = global.get_now_time();
            this.set_next_active();

            this.now_skill_attack_speed = this.get_active_skill_attack_speed();
            return true;
        } else {
            //敌人数据库中不存在该敌人
            return false;
        }
    }
    //获取当前血条比例
    get_HP_ratio() {
        return `${(this.health_point / this.combat_survival_attr['health_max']) * 100}%`;
    }
    //获取当前攻击进度比例
    get_attack_ratio() {
        return `${(this.attack_point / this.now_skill_attack_speed) * 100}%`;
    }
    //获取当前要执行的主动技能的攻击速度
    get_active_skill_attack_speed() {
        let skill_attack_speed;
        if (!E_skills[this.now_active_id]) {
            //未定义的敌人技能，改成普通攻击
            this.now_active_id = 'normal_attack';
            console.log(`敌人技能库中未定义${this.now_active_id}技能`);
        } else if (E_skills[this.now_active_id].attack_speed.length == 0) {
            //未设定该技能的攻速，选用敌人自己的攻速
            skill_attack_speed = this.combat_attack_attr['attack_speed'];
        } else if (E_skills[this.now_active_id].attack_speed[this.now_active_stage] == 0) {
            //当前要执行的技能的当前阶段就设定的是敌人自己的攻速
            skill_attack_speed = this.combat_attack_attr['attack_speed'];
        } else {
            skill_attack_speed = E_skills[this.now_active_id].attack_speed[this.now_active_stage];
        }
        return skill_attack_speed * 1000;
    }
    //随机获取下一个要执行的主动技能
    set_next_active() {
        if (!enemys[this.id]) {
            //敌人数据库中不存在该敌人，重置成普通敌人
            console.log(`${this.id}敌人未知，重置成普通敌人`);
            this.id = 'Training_Dummy';
            // return false;
        }
        let skill_num = enemys[this.id].active_skill.length;
        this.now_active_id = enemys[this.id].active_skill[get_random(0, skill_num - 1)];
        this.now_active_stage = 0;
        return true;
    }
    //更新当前攻击进度
    updata_enemy_attack_point(now_time) {
        if (this.now_active_id == 'no_attack') {
            //不攻击状态下单独处理，攻击进度0，并且不更新时间
            this.attack_point = 0;
        } else {
            this.now_time = now_time;
            this.attack_point = now_time - this.last_attack_time;
        }
    }
    //判断当前技能是否准备就绪
    judge_active_start() {
        let start_skill = false;
        if (this.now_active_id == 'no_attack') {
            //不攻击状态下单独处理，直接输出否
            return false;
        }

        let start_time = E_skills[this.now_active_id].start_time[this.now_active_stage];
        if (start_time == 'end') {
            if (this.attack_point >= this.now_skill_attack_speed) {
                start_skill = true;
            }
        } else if (start_time == 'continued') {
            start_skill = true;
        }
        return start_skill;
    }
    //激活敌人的这一次主动技能
    start_enemy_active() {
        let id = this.now_active_id;
        let stage = this.now_active_stage;
        let E_SK = E_skills[id];

        //伤害类型
        this.enemy_Attack_effect.damage_type = E_SK.effect[stage].damage_type;
        //攻击次数
        if (E_SK.effect[stage].attack_num.type == 'add') {
            this.enemy_Attack_effect.attack_num += E_SK.effect[stage].attack_num.num;
        } else if (E_SK.effect[stage].attack_num.type == 'fixed') {
            this.enemy_Attack_effect.attack_num = E_SK.effect[stage].attack_num.num;
        }

        //计算主动技能需要的敌人属性
        let askill_base_attr = this.combat_attack_attr['attack'];
        //计算主动技能应该得到的效果
        let algorithm = E_SK.algorithm[stage];
        Askill_effect_algorithm(algorithm, askill_base_attr, this.enemy_Attack_effect);
        // Askill_algorithm(askill_base_attr, this.enemy_Attack_effect);

        //根据主动技能类型，产生这次效果
        if (E_SK.active_type[stage] == 'attack') {
            //攻击类技能，现在已经计算完毕，输出到战斗管理类中，准备执行该次攻击
            let combat_manage = global.get_combat_manage();
            combat_manage.set_enemy_next_attack(this.enemy_Attack_effect);
            this.reset_enemy_Attack_effect();
        }
    }
    reset_enemy_Attack_effect() {
        this.enemy_Attack_effect = new Attack_effect();
    }
    //敌人一回合结束，结算相关内容
    reset_round() {
        this.last_attack_time = this.now_time;
        this.attack_point = 0;
        //应该要按照敌人
        if (this.now_active_stage + 1 < E_skills[this.now_active_id].skill_stage) {
            this.now_active_stage++;
        } else {
            this.set_next_active();
        }
        this.now_skill_attack_speed = this.get_active_skill_attack_speed();
    }
    //敌人运行一帧，处理主动技能部分
    run_active_skill(now_time) {
        //更新时间
        this.updata_enemy_attack_point(now_time);
        //判断当前技能是否准备就绪
        if (this.judge_active_start()) {
            //激活当前技能
            this.start_enemy_active();
        }
        //时间到一回合结束，结算并重置相关参数
        if (this.attack_point >= this.now_skill_attack_speed) {
            this.reset_round();
        }
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
        this.combat_place_enemys['little_distance'] = new Array();
        this.combat_place_enemys['middle_distance'] = new Array();
        this.combat_place_enemys['remote_distance'] = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                let enemy = new place_enemy(0);
                field.push(enemy);
            }
        }
        this.last_add_enemy_time = 0; //上次刷怪时间
    }
    //重置刷怪参数
    reset_enemy_data() {
        this.last_add_enemy_time = global.get_game_now_time();
    }
    //获取当前地点的怪物对象
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
                this.last_add_enemy_time = global.get_game_now_time();
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
        let now_time = global.get_game_now_time();
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
            if (place_x == 1) place_x = 'little_distance';
            if (place_x == 2) place_x = 'middle_distance';
            if (place_x == 3) place_x = 'remote_distance';
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
        if (place_x != 'little_distance' && place_x != 'middle_distance' && place_x != 'remote_distance') {
            console.log(`add_enemy：输入的目标地点错误 ${place_x}`);
        }
        let field = this.combat_place_enemys[place_x];
        field[place_y] = new place_enemy(enemy_id);
        field[place_y].init();
        field[place_y].distance = get_random_enemy_distance(place_x, place_y);

        return field[place_y];
    }
    //获取距离最近的n个活着的敌人的拷贝
    get_min_distance_enemy(n) {
        let enemys = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (field[i].statu) {
                    enemys.push(field[i]);
                }
            }
        }
        enemys.sort((a, b) => a.distance - b.distance);
        return enemys.slice(0, n);
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
    //游戏运行一帧，计算敌人的主动技能部分
    run_enemy_active_skill() {
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;
        for (let place_x in this.combat_place_enemys) {
            let field = this.combat_place_enemys[place_x];
            for (let place_y = 0; place_y < 9; place_y++) {
                if (field[place_y].statu) {
                    //更新活着的敌人的主动技能
                    field[place_y].run_active_skill(this.now_time);
                }
            }
        }
    }
}
