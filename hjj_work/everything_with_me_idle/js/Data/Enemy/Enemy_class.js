import { is_Empty_Object, get_item_obj, get_item_id_key } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';

export class Enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //敌人名称
        this.desc; //敌人描述
        this.type; //敌人类型
        this.attack_attr = new Object(); //攻击属性
        this.defense_attr = new Object(); //防御属性
        this.survival_attr = new Object(); //生存属性
        this.item_array = new Array(); //击败后掉落物品列表

        this.init_Enemy_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    init_Enemy_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名敌人';
            this.desc = '未设定敌人描述';
        } else {
            if (texts[id].enemy_name) {
                this.name = texts[id].enemy_name;
            } else {
                this.name = '未命名敌人';
            }
            if (texts[id].enemy_desc) {
                this.desc = texts[id].enemy_desc;
            } else {
                this.desc = '未设定敌人描述';
            }
        }
    }
    init_attack_attr(attack, precision, critical_chance, critical_damage, attack_speed) {
        this.attack_attr['attack'] = attack; //攻击力
        this.attack_attr['precision'] = precision; //精准
        this.attack_attr['critical_chance'] = critical_chance; //暴击率，百分制，具体计算时会除以100
        this.attack_attr['critical_damage'] = critical_damage; //暴击伤害，百分制，具体计算时会除以100
        this.attack_attr['attack_speed'] = attack_speed; //攻速加成
    }
    init_defense_attr(defense, evade, resistance_point, move_speed) {
        this.defense_attr['defense'] = defense; //防御
        this.defense_attr['evade'] = evade; //闪避
        this.defense_attr['resistance_point'] = resistance_point; //抵抗力
        this.defense_attr['move_speed'] = move_speed; //移动速度
    }
    init_survival_attr(health_max, magic_max, energy_max) {
        this.survival_attr['health_max'] = health_max; //最大血量上限
        this.survival_attr['magic_max'] = magic_max; //最大魔力上限
        this.survival_attr['energy_max'] = energy_max; //最大精力上限
    }
    //创建一个掉落队列
    create_item_array(drop_chance) {
        let obj = new Object();
        obj.items = new Object();
        obj.drop_chance = drop_chance;
        this.item_array.push(obj);
    }
    //给这个敌人添加一个可掉落物品
    // add_item(item_array_id, item_id, chance, max_num, min_num, equip_rarity) {
    //     let item_;
    //     let item_obj = new Object();

    //     item_obj.id = item_id;
    //     item_obj.chance = chance; //权重
    //     item_obj.max_num = max_num;
    //     item_obj.min_num = min_num;
    //     if (equip_rarity) item_obj.equip_rarity = equip_rarity; //如果是装备，需要定义稀有度
    //     if (is_Empty_Object(this.item_array[item_array_id])) {
    //         console.log('未定义%d掉落列表', item_array_id);
    //         return;
    //     }
    //     this.item_array[item_array_id].items[item_id] = item_obj;
    // }
    //给这个敌人添加一个可掉落物品
    add_item(item_array_id, item_id, chance, max_num, min_num, ...args) {
        let item_obj;
        if (items[item_id].main_type.includes('equipment')) {
            //物品是装备，args内参数的含义按以下顺序排列：
            //稀有度
            let equip_rarity = args[0];
            item_obj = get_item_obj(item_id, 1, equip_rarity);
        } else if (items[item_id].main_type.includes('material')) {
            item_obj = get_item_obj(item_id, 1);
            //物品是材料，没有独特属性
        } else if (items[item_id].main_type.includes('consumable')) {
            //物品是消耗品，args内参数的含义按以下顺序排列：
            // 暂无
            item_obj = get_item_obj(item_id, 1);
        }

        item_obj.chance = chance; //权重
        item_obj.max_num = max_num;
        item_obj.min_num = min_num;
        if (is_Empty_Object(this.item_array[item_array_id])) {
            console.log('未定义%d掉落列表', item_array_id);
            return;
        }
        let item_key = get_item_id_key(item_obj);
        this.item_array[item_array_id].items[item_key] = item_obj;
    }
}
//伐木技能中的敌人
export class E_tree extends Enemy {
    constructor(enemy_id) {
        super(enemy_id);
        this.type = 'tree';
        //主要奖励层级
        this.reward_level_time = new Array();
        this.reward_level_item = new Array();
        //次要奖励
        this.second_reward_array = new Array();
        this.LGI_energy; //每次砍伐的精力需求
    }
    //设置属于树的属性
    init_tree_attr(LGI_energy) {
        this.LGI_energy = LGI_energy; //每次砍伐的精力需求
    }
    //设置掉落物奖励层级的时间
    set_reward_level_time(...time) {
        this.reward_level_time = time;
    }
    //创建掉落物奖励层级
    create_item_array(level, drop_chance) {
        if (is_Empty_Object(this.reward_level_item[level])) {
            this.reward_level_item[level] = new Array();
        }
        let obj = new Object();
        obj.items = new Object();
        obj.drop_chance = drop_chance;
        this.reward_level_item[level].push(obj);
    }
    //给这个敌人添加一个可掉落物品
    add_item(level, item_array_id, item_id, chance, max_num, min_num, ...args) {
        let item_obj = new Object();
        if (items[item_id].main_type.includes('equipment')) {
            //物品是装备，args内参数的含义按以下顺序排列：
            //稀有度
            equip_rarity = args[0];
            item_obj = get_item_obj(item_id, 1, equip_rarity);
        } else if (items[item_id].main_type.includes('material')) {
            item_obj = get_item_obj(item_id, 1);
            //物品是材料，没有独特属性
        } else if (items[item_id].main_type.includes('consumable')) {
            //物品是消耗品，args内参数的含义按以下顺序排列：
            // 暂无
            item_obj = get_item_obj(item_id, 1);
        }
        item_obj.chance = chance; //权重
        item_obj.max_num = max_num;
        item_obj.min_num = min_num;
        if (is_Empty_Object(this.reward_level_item[level])) {
            console.log('敌人%s在等级%d未定义掉落队列', this.id, level);
            return;
        }
        if (is_Empty_Object(this.reward_level_item[level][item_array_id])) {
            console.log('敌人%s在等级%d未定义%d号掉落队列', this.id, level, item_array_id);
            return;
        }
        let item_key = get_item_id_key(item_obj);
        this.reward_level_item[level][item_array_id].items[item_key] = item_obj;
    }
}
//挖矿技能中的敌人
export class E_ore extends Enemy {
    constructor(enemy_id) {
        super(enemy_id);
        this.type = 'ore';
        //奖励层级信息
        this.reward_level_data = new Array(); //每个层级的基础信息
        this.reward_level_attr = new Array(); //每个层级的属性补正
        this.reward_level_item = new Object(); //每个层级的奖励
        //次要奖励
        this.second_reward_array = new Array();
        this.MIN_energy; //每次挖矿的精力需求
    }
    //设置属于矿石的属性
    init_ore_attr(MIN_energy) {
        this.MIN_energy = MIN_energy; //每次挖矿的精力需求
    }
    //设置指定层级的基础信息
    set_reward_level_data(level, chance, super_flag) {
        if (!is_Empty_Object(this.reward_level_data[level])) {
            console.log('设置挖矿敌人的层级基础信息出现重复，将会覆盖已设置的信息，需要确认是否异常');
        }
        let obj = new Object();
        obj.chance = chance; //该层级出现权重
        obj.super_flag = super_flag; //该层级是否属于特殊层级
        this.reward_level_data[level] = obj;
    }
    //设置指定层级的属性补正
    set_reward_level_attr(level, health_max, defense, MIN_energy) {
        if (!is_Empty_Object(this.reward_level_attr[level])) {
            console.log('设置挖矿敌人的层级属性补正出现重复，将会覆盖已设置的信息，需要确认是否异常');
        }
        let obj = new Object();
        obj.health_max = health_max; //该层级血量补正
        obj.defense = defense; //该层级防御补正
        obj.MIN_energy = MIN_energy; //该层级挖矿精力消耗补正
        this.reward_level_attr[level] = obj;
    }
    //在指定层级设定一个物品队列
    set_reward_level_item_array(level, drop_chance) {
        if (is_Empty_Object(this.reward_level_item[level])) {
            this.reward_level_item[level] = new Array();
        }
        let obj = new Object();
        obj.items = new Object();
        obj.drop_chance = drop_chance;
        this.reward_level_item[level].push(obj);
    }
    //在指定层级指定物品队列里添加一个掉落物
    add_item(level, item_array_id, item_id, chance, max_num, min_num, ...args) {
        let item_obj = new Object();
        if (items[item_id].main_type.includes('equipment')) {
            //物品是装备，args内参数的含义按以下顺序排列：
            //稀有度
            equip_rarity = args[0];
            item_obj = get_item_obj(item_id, 1, equip_rarity);
        } else if (items[item_id].main_type.includes('material')) {
            item_obj = get_item_obj(item_id, 1);
            //物品是材料，没有独特属性
        } else if (items[item_id].main_type.includes('consumable')) {
            //物品是消耗品，args内参数的含义按以下顺序排列：
            // 暂无
            item_obj = get_item_obj(item_id, 1);
        }
        item_obj.chance = chance; //权重
        item_obj.max_num = max_num;
        item_obj.min_num = min_num;
        let item_key = get_item_id_key(item_obj);
        if (is_Empty_Object(this.reward_level_item[level])) {
            console.log('敌人%s在等级%d未定义掉落队列', this.id, level);
            return;
        }
        if (is_Empty_Object(this.reward_level_item[level][item_array_id])) {
            console.log('敌人%s在等级%d未定义%d号掉落队列', this.id, level, item_array_id);
            return;
        }

        this.reward_level_item[level][item_array_id].items[item_key] = item_obj;
    }
}
//钓鱼技能中的敌人
export class E_fish extends Enemy {
    constructor(enemy_id) {
        super(enemy_id);
        this.type = 'fish';
        this.flee_point; //逃跑力
        this.FIS_energy; //遛鱼时每秒精力消耗
    }
    //设置属于鱼的属性
    init_fish_attr(flee_point, FIS_energy) {
        this.flee_point = flee_point;
        this.FIS_energy = FIS_energy;
    }
}
function add_Enemy_object(enemys, newid) {
    if (enemys[newid] === undefined) {
        enemys[newid] = new Enemy(newid);
    } else {
        console.log('创建enemys[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_E_tree_object(enemys, newid) {
    if (enemys[newid] === undefined) {
        enemys[newid] = new E_tree(newid);
    } else {
        console.log('创建enemys[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_E_ore_object(enemys, newid) {
    if (enemys[newid] === undefined) {
        enemys[newid] = new E_ore(newid);
    } else {
        console.log('创建enemys[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_E_fish_object(enemys, newid) {
    if (enemys[newid] === undefined) {
        enemys[newid] = new E_fish(newid);
    } else {
        console.log('创建enemys[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
export { add_Enemy_object, add_E_tree_object, add_E_ore_object, add_E_fish_object };
