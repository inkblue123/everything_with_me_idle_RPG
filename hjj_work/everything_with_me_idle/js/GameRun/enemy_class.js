import { get_random, get_random_enemy_distance, Attack_effect_algorithm } from '../Function/math_func.js';
import { global } from './global_manage.js';
import { Attack_effect, E_Attack_effect } from './combat_class.js';
import { places } from '../Data/Place/Place.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { E_skills } from '../Data/Skill/Skill.js';
import { is_Empty_Object } from '../Function/Function.js';

var ch;
//场地内的敌人对象
class place_enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.health_point = 0; //当前血量
        this.attack_point = 0; //当前攻击进度

        this.statu = false; //死活状态
        this.distance = 0; //敌人与玩家的距离数值
        this.place_x; //敌人在战斗区域的近中远哪个区域
        this.place_y; //敌人在区域里的第几个位置（0-8）
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
    }
    //初始化敌人
    init() {
        if (!is_Empty_Object(enemys[this.id])) {
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
            console.log('敌人数据库中不存在该敌人，%s', this.id);
            return false;
        }
    }
    //使用存档文件中的拷贝初始化
    save_init(save_enemy) {
        this.statu = true;
        this.combat_attack_attr = save_enemy.combat_attack_attr;
        this.combat_defense_attr = save_enemy.combat_defense_attr;
        this.combat_survival_attr = save_enemy.combat_survival_attr;
        this.health_point = save_enemy.health_point;
        this.attack_point = save_enemy.attack_point;
        this.distance = save_enemy.distance;
        this.now_skill_attack_speed = save_enemy.now_skill_attack_speed;
        this.now_active_id = save_enemy.now_active_id;
        this.now_active_stage = 0;

        let save_now_time = global.get_now_time();
        this.last_attack_time = save_enemy.last_attack_time + save_now_time - save_enemy.now_time;
        this.now_time = save_now_time;
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
        if (is_Empty_Object(E_skills[this.now_active_id])) {
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
        if (is_Empty_Object(enemys[this.id])) {
            //敌人数据库中不存在该敌人，重置成普通敌人
            console.log(`${this.id}敌人未知，重置成普通敌人`);
            this.id = 'Training_Dummy';
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
        } else if (start_time == 'continue') {
            start_skill = true;
        }
        return start_skill;
    }
    //激活敌人的这一次主动技能
    start_enemy_active() {
        let id = this.now_active_id;
        let stage = this.now_active_stage;
        let E_SK = E_skills[id];

        let enemy_Attack_effect = new Attack_effect();
        //伤害类型
        enemy_Attack_effect.damage_type = E_SK.effect[stage].damage_type;
        //攻击次数
        if (E_SK.effect[stage].attack_num.type == 'add') {
            enemy_Attack_effect.attack_num += E_SK.effect[stage].attack_num.num;
        } else if (E_SK.effect[stage].attack_num.type == 'fixed') {
            enemy_Attack_effect.attack_num = E_SK.effect[stage].attack_num.num;
        }

        //计算主动技能需要的敌人属性
        //敌人没有属性补正，直接使用攻击力当作基础数值
        let askill_base_attr = this.combat_attack_attr['attack'];
        //计算主动技能应该得到的效果
        let algorithm = E_SK.algorithm[stage];
        Attack_effect_algorithm(algorithm, askill_base_attr, enemy_Attack_effect);

        //根据主动技能类型，产生这次效果
        if (E_SK.active_type[stage] == 'attack') {
            //攻击类技能，现在已经计算完毕，输出到战斗管理类中，准备执行该次攻击
            let combat_manage = global.get_combat_manage();
            let E_Attack = new E_Attack_effect();
            E_Attack.id = this.id;
            E_Attack.place_x = this.place_x;
            E_Attack.place_y = this.place_y;
            E_Attack.main_Attack = enemy_Attack_effect;
            combat_manage.set_enemy_next_attack(E_Attack);
        }
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
        this.now_time;
        this.now_place;
        this.now_round_time; //当前回合运行了多久
        this.last_add_enemy_time; //上次刷怪时间
        this.last_little_add_enemy_time; //上次触发同场少怪时刷怪的时间
        this.now_place_add_enemy_num; //当前地点已经刷怪的总数量
        this.now_place_enemy_cumulative; //当前地点积累的怪物数量
        this.kill_enemy_num; //当前地点被玩家杀死的敌人数
        this.combat_place_enemys = new Object();
        this.last_combat_place_data = new Object(); //曾经到过的战斗地点的参数
    }
    init() {
        this.combat_place_enemys['little_distance'] = new Array();
        this.combat_place_enemys['middle_distance'] = new Array();
        this.combat_place_enemys['remote_distance'] = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                let enemy = new Object();
                // let enemy = new place_enemy(0);

                field.push(enemy);
            }
        }
        this.last_add_enemy_time = 0; //上次刷怪时间
        this.last_little_add_enemy_time = 0; //上次触发同场少怪时刷怪的时间
        this.now_place_enemy_cumulative = 0; //当前地点积累的怪物数量
        this.kill_enemy_num = 0; //当前地点积累的怪物数量
    }
    //重置刷怪参数
    reset_enemy_data() {
        this.last_add_enemy_time = global.get_game_now_time();
        this.last_little_add_enemy_time = 0; //上次触发同场少怪时刷怪的时间
        this.now_place_add_enemy_num = 0;
        this.kill_enemy_num = 0;
    }
    //移动到了新的战斗地点，初始化相关参数
    set_new_place(next_place) {
        this.now_place = next_place;
        this.reset_enemy_data();
        if (places[next_place].combat_type != 'infinite_enemy') {
            //有限刷怪区域需要计算敌人积累的数量
            this.now_place_enemy_cumulative = this.get_place_enemy_cumulative_num(next_place);
        }
    }
    //设置当前地点积累的怪物总数
    set_now_place_enemy_cumulative(last_time, last_enemy_num) {}
    //获取当前地点的怪物对象
    get_combat_place_enemys() {
        return this.combat_place_enemys;
    }
    //获取当前战斗场地内，某个id的敌人的数量
    get_combat_place_enemy_num(enemy_id) {
        let enemy_num = 0;
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (this.judge_enemy_live(field[i])) {
                    // if (field[i].statu) {
                    if (!enemy_id) {
                        //如果没指定敌人id，获取全部敌人的数量
                        enemy_num++;
                    } else if (field[i].id == enemy_id) {
                        //获取指定id的敌人数量
                        enemy_num++;
                    }
                }
            }
        }
        return enemy_num;
    }

    //执行一次刷怪操作
    add_new_enemy() {
        //判断当前是否可以刷怪
        if (this.judge_add_new_enemy()) {
            //可以刷怪，尝试进行刷怪
            if (this.try_add_new_enemy()) {
                //刷怪成功，更新参数
                this.now_place_add_enemy_num++;
            }
        }
    }
    //判断当前帧是否可以刷怪
    judge_add_new_enemy() {
        //同场敌人数量判断
        let now_enemy_num = this.get_combat_place_enemy_num();
        if (now_enemy_num >= places[this.now_place].max_live_enemy_num) {
            //同场敌人已经达到上限，不能刷怪
            return false;
        }
        //当前区域总刷怪数量判断
        if (places[this.now_place].combat_type != 'infinite_enemy') {
            if (this.now_place_add_enemy_num >= this.now_place_enemy_cumulative) {
                //当前地点的怪刷完了，不能刷怪
                return false;
            }
        }

        //刷怪规则1：定时刷怪
        let now_time = global.get_game_now_time();
        if (now_time - this.last_add_enemy_time >= places[this.now_place].add_enemy_time * 1000) {
            this.last_add_enemy_time = now_time;
            return true;
        }
        //刷怪规则2：同场敌人少时刷怪
        if (now_enemy_num <= places[this.now_place].little_enemy_num) {
            if (now_time - this.last_little_add_enemy_time >= places[this.now_place].little_enemy_time * 1000) {
                this.last_little_add_enemy_time = now_time;
                return true;
            }
        }

        //没有满足任何规则，不能刷怪
        return false;
    }
    //尝试刷一个新的敌人
    try_add_new_enemy() {
        //获取这次刷怪的位置
        let place_x, place_y;
        if (places[this.now_place].add_enemy_type == 'fixed') {
            //地点限定，刷怪位置固定
            place_x = places[this.now_place].add_enemy_field_limit.field;
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
        if (this.judge_enemy_live(raw_enemy)) {
            // if (!is_Empty_Object(raw_enemy) && raw_enemy.statu == true) {
            //如果这个位置有一个活着的敌人，此次刷怪中止
            return false;
        }

        //获取这次要刷的敌人id
        let enemy_id = this.get_random_chance_enemy_id(places[this.now_place].enemy);
        //判断这次要刷的怪有没有限制条件，现在能不能刷
        if (!this.judge_add_new_enemy_id(enemy_id)) {
            return false;
        }

        //在指定位置新增这个怪
        let enemy = this.add_enemy(place_x, place_y, enemy_id);
        return true;
    }
    //根据能刷的所有怪的刷新概率权重，随机得到一个敌人id
    get_random_chance_enemy_id(enemys) {
        let all_chance = 0;
        for (let id in enemys) {
            all_chance += enemys[id].chance;
        }
        let chance = get_random(0, all_chance);
        let enemy_id;
        for (enemy_id in enemys) {
            if (chance > enemys[enemy_id].chance) {
                chance -= enemys[enemy_id].chance;
            } else {
                break;
            }
        }
        return enemy_id;
    }
    //判断当前要刷的这个怪，是否满足它的限制条件
    judge_add_new_enemy_id(enemy_id) {
        let enemy_obj = places[this.now_place].enemy[enemy_id];
        for (let key in enemy_obj) {
            if (key == 'chance') {
                continue;
            } else if (key == 'now_place_max_num') {
                let now_place_num = this.get_combat_place_enemy_num(enemy_id);
                let now_place_max_num = places[this.now_place].enemy[enemy_id][key];
                if (now_place_num >= now_place_max_num) {
                    return false;
                }
            }
        }
        return true;
    }
    //判断一个位置的敌人是否存活
    judge_enemy_live(enemy) {
        if (enemy == undefined) return false;
        if (is_Empty_Object(enemy)) return false;
        if (enemy.statu == true) {
            return true;
        }
        return false;
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
        field[place_y].place_x = place_x;
        field[place_y].place_y = place_y;

        return field[place_y];
    }
    //获取距离最近的n个活着的敌人的拷贝
    get_min_distance_enemy(n) {
        let enemys = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (this.judge_enemy_live(field[i])) {
                    // if (field[i].statu) {
                    enemys.push(field[i]);
                }
            }
        }
        enemys.sort((a, b) => a.distance - b.distance);
        return enemys.slice(0, n);
    }
    //离开了当前战斗区域，清空所有敌人
    delete_all_enemy() {
        //清除目前的敌人参数
        for (let place_x in this.combat_place_enemys) {
            let field = this.combat_place_enemys[place_x];
            for (let place_y = 0; place_y < 9; place_y++) {
                field[place_y] = new Object();
            }
        }
        //记录离开时的怪物数据
        this.set_leave_enemy_data();
        //重置刷怪参数
        this.reset_enemy_data();
        //更新战斗界面中的所有敌人，把界面上的敌人清空
        this.updata_enemy_show();
    }
    //游戏运行一帧，计算敌人的主动技能部分
    run_enemy_active_skill() {
        this.now_time = global.get_game_now_time();
        this.now_round_time = this.now_time - this.round_start_time;
        for (let place_x in this.combat_place_enemys) {
            let field = this.combat_place_enemys[place_x];
            for (let place_y = 0; place_y < 9; place_y++) {
                if (this.judge_enemy_live(field[place_y])) {
                    //更新活着的敌人的主动技能
                    field[place_y].run_active_skill(this.now_time);
                }
            }
        }
    }
    //更新战斗界面中的所有敌人
    updata_enemy_show() {
        let combat_place_enemys = this.get_combat_place_enemys();
        for (let place_x in combat_place_enemys) {
            for (let place_y = 0; place_y < 9; place_y++) {
                //获取战斗界面中的敌人框
                let enemy_field = document.getElementById(place_x);
                let enemy_slot = enemy_field.children[1].children[place_y];
                let enemy_HP_bar = enemy_slot.querySelector('.enemy_HP_bar');
                let enemy_attr_bar = enemy_slot.querySelector('.enemy_attr_bar');
                let enemy_head = enemy_slot.querySelector('.enemy_head');
                //获取敌人信息
                let field = combat_place_enemys[place_x];
                let enemy = field[place_y];
                if (this.judge_enemy_live(enemy)) {
                    //该敌人活着，更新相关信息
                    enemy_HP_bar.style.display = '';
                    enemy_HP_bar.children[0].children[0].style.width = enemy.get_HP_ratio(); //血条
                    enemy_attr_bar.style.display = '';
                    enemy_attr_bar.children[0].children[0].style.width = enemy.get_attack_ratio(); //攻击进度条
                    enemy_head.innerHTML = enemys[enemy.id].name; //名称
                } else {
                    //该敌人死了，清空相关信息
                    enemy_HP_bar.style.display = 'none';
                    enemy_attr_bar.style.display = 'none';
                    enemy_head.innerHTML = '';
                }
            }
        }
        //有限刷怪区域，需要更新剩余敌人的数量
        if (places[this.now_place].combat_type != 'infinite_enemy') {
            let remain_enemy_div = document.getElementById('remain_enemy_div');
            let remain_enemy_num = this.now_place_enemy_cumulative - this.kill_enemy_num;
            let ch = '敌人数量剩余' + remain_enemy_num + '个';
            remain_enemy_div.innerHTML = ch;
        }
    }
    //获取敌人类部分的游戏存档
    save_enemy_class() {
        let enemy_save = new Object();
        enemy_save.combat_place_enemys = this.combat_place_enemys; //当前地点内的敌人
        return enemy_save;
    }
    //加载敌人类的游戏存档
    load_enemy_class(enemy_save) {
        if (is_Empty_Object(enemy_save)) {
            return;
        }
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            let save_field = enemy_save.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (this.judge_enemy_live(save_field[i])) {
                    let enemy_id = save_field[i].id;
                    field[i] = new place_enemy(enemy_id);
                    field[i].save_init(save_field[i]);
                }
            }
        }
        this.reset_enemy_data(); //重置刷怪参数
    }
    //判断指定有限刷怪区域是否可以前进（是否有足够多的怪进入战斗）
    judge_infinite_enemy_place_goto(next_place) {
        if (places[next_place].type != 'combat') {
            //要去的地方是非战斗区域，虽然不知道为什么会调到这里，但是按这个函数的逻辑，是可以前进的
            console.log('针对有限刷怪区域的函数遇到了非战斗区域的输入，可能需要查看调用逻辑是否正常');
            return true;
        }
        //无限刷怪区域，一定有怪可以打，所以可以前进
        if (places[next_place].combat_type == 'infinite_enemy') {
            return true;
        }
        //有限刷怪区域-普通，一定有怪可以打，所以可以前进
        if (places[next_place].combat_type == 'limited_enemy_normal') {
            return true;
        }
        //有限刷怪区域-通道，只有当积累的敌人多于最大数量的20%时才会产生战斗
        if (places[next_place].combat_type == 'limited_enemy_road') {
            if (is_Empty_Object(this.last_combat_place_data[next_place])) {
                //没有关于这个地点的记录，说明是很久没来的通道，默认堆满怪
                return true;
            } else {
                //有记录，检查现在堆积了多少怪
                let last_out_enemy_num = this.last_combat_place_data[next_place].last_out_enemy_num; //上次离开时剩余的怪
                if (last_out_enemy_num != 0) {
                    //上次怪就没清完，这次进入必定产生战斗
                    return true;
                }
                let last_out_time = this.last_combat_place_data[next_place].last_out_time; //上次离开的时间
                let last_time = (this.now_time - last_out_time) / 1000; //上次离开到现在进入的时间
                let cumulative_enemy_num = Math.floor(last_time / places[next_place].cumulative_time); //上次离开到现在这段时间内积累的怪
                let all_cumulative_num = last_out_enemy_num + cumulative_enemy_num; //目前总共积累了多少怪
                if (all_cumulative_num >= places[next_place].max_enemy_cumulative * 0.2) {
                    //堆积的怪超过了最大数量的20%，应该战斗
                    return true;
                } else {
                    //堆积的怪数量不够，不会战斗
                    return false;
                }
            }
        }
        //有限刷怪区域-陷阱，只有当积累的敌人多于最大数量的10%时才会产生战斗
        if (places[next_place].combat_type == 'limited_enemy_trap') {
            return true;
        }
    }
    //记录离开时的怪物数据
    set_leave_enemy_data() {
        if (
            places[this.now_place].combat_type != 'limited_enemy_road' &&
            places[this.now_place].combat_type != 'limited_enemy_trap'
        ) {
            //只有通道和陷阱类型的战斗区域需要记录数据
            return true;
        }

        let data_obj = new Object();
        //这个地点还剩余的怪的数量等于目前积累的数减去已经杀死的敌人数
        data_obj.last_out_enemy_num = this.now_place_enemy_cumulative - this.kill_enemy_num;
        if (data_obj.last_out_enemy_num < 0) {
            data_obj.last_out_enemy_num = 0;
        }
        data_obj.last_out_time = this.now_time;
        this.last_combat_place_data[this.now_place] = data_obj;
    }
    //获取当前战斗场地内，敌人堆积了多少
    get_place_enemy_cumulative_num(now_place) {
        // if (is_Empty_Object(places[now_place])) {
        //     console.log('未定义地点');
        //     return false;
        // }
        // if (places[now_place].type != 'combat') {
        //     console.log('非战斗区域不会刷怪，错误的调用');
        //     return false;
        // }
        // if (places[next_place].combat_type == 'infinite_enemy') {
        //     console.log('无限刷怪区域不需要计算敌人堆积数量，错误的调用');
        //     return false;
        // }
        //有限刷怪区域-普通，堆积的怪总是最大数量
        if (places[now_place].combat_type == 'limited_enemy_normal') {
            return places[now_place].max_enemy_cumulative;
        }
        //有限刷怪区域-通道，
        if (places[now_place].combat_type == 'limited_enemy_road') {
            if (is_Empty_Object(this.last_combat_place_data[now_place])) {
                //没有关于这个地点的记录，说明是很久没来的通道，默认堆满怪
                return places[now_place].max_enemy_cumulative;
            } else {
                //有记录，检查现在堆积了多少怪
                let last_out_enemy_num = this.last_combat_place_data[now_place].last_out_enemy_num; //上次离开时剩余的怪
                let last_out_time = this.last_combat_place_data[now_place].last_out_time; //上次离开的时间
                let last_time = (this.now_time - last_out_time) / 1000; //上次离开到现在进入的时间
                let cumulative_enemy_num = Math.floor(last_time / places[now_place].cumulative_time); //上次离开到现在这段时间内积累的怪
                let all_cumulative_num = last_out_enemy_num + cumulative_enemy_num; //目前总共积累了多少怪
                if (all_cumulative_num > places[now_place].max_enemy_cumulative) {
                    all_cumulative_num = places[now_place].max_enemy_cumulative;
                }
                return all_cumulative_num;
            }
        }
        //有限刷怪区域-陷阱
        if (places[now_place].combat_type == 'limited_enemy_trap') {
            return places[now_place].max_enemy_cumulative;
        }
    }
    //击杀了敌人，记录数据
    add_kill_enemy_num(num) {
        if (places[this.now_place].combat_type == 'infinite_enemy') {
            //无限刷怪区域不需要杀敌计数
            return;
        }

        this.kill_enemy_num += num;
        if (this.kill_enemy_num < this.now_place_enemy_cumulative) {
            return;
        }
        //当前有限刷怪区域的敌人死完了，要执行相应的事情
        if (places[this.now_place].combat_type == 'limited_enemy_road') {
            let next_place = places[this.now_place].next_accessible_area;
            let place_manage = global.get_place_manage();
            place_manage.set_now_place(next_place);
        }
    }
}
