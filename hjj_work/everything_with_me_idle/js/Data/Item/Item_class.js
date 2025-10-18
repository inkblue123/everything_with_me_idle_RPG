import { texts } from '../Text/Text.js';
import { enums } from '../Enum/Enum.js';
import { get_uniqueArr, is_Empty_Object } from '../../Function/Function.js';

//物品通用属性
class Item {
    constructor(id) {
        this.id = id; //唯一id
        this.name = ''; // 物品名称
        this.desc = ''; // 物品描述
        this.maxStack = 1; // 最大堆叠数量
        this.main_type = new Array(); //物品大类型
        this.secon_type = new Array(); //物品小类型
        this.price = new Object();
        this.init_Item_name_desc(id);
    }
    //调用文本数据库中的物品名称和描述
    init_Item_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义物品名称和描述
            this.name = '未命名物品';
            this.desc = '未设定物品描述';
            console.log('%s物品的名称和描述没有定义', id);
        } else {
            if (texts[id].item_name) {
                this.name = texts[id].item_name;
            } else {
                this.name = '未命名物品';
            }
            if (texts[id].item_desc) {
                this.desc = texts[id].item_desc;
            } else {
                this.desc = '未设定物品描述';
            }
        }
    }
    //手动定义其他的物品属性
    init_Item_other(maxStack, secon_type) {
        if (maxStack) {
            this.maxStack = maxStack;
        }
        //复合类型物品,追加其他类型
        if (secon_type) {
            if (typeof secon_type == 'object') {
                this.secon_type = this.secon_type.concat(secon_type);
            }
            if (typeof secon_type == 'string') {
                this.secon_type.push(secon_type);
            }
        }
    }
    //设定物品的价值
    //没有开发到这部分，还没用
    init_Item_price(...args) {
        if (args.length % 2 != 0) {
            console.log('设定物品价格时的参数数量不正常，有%d个', args.length);
        }
        for (let i = 0; i < args.length; i += 2) {
            //
            let money_type = args[i];
            this.price[money_type] = args[i + 1];
        }
    }
}
class Equipment extends Item {
    constructor(id) {
        super(id);
        this.main_type.push('equipment');
        this.wearing_position = new Array(); //这件装备能穿戴的位置
        this.two_handed_flag = false; //这件装备是否属于双手武器
        this.special_flag = false; //这件装备是否属于特制装备
        this.attr_level; //这件装备的属性级别

        this.equip_min_threshold = new Object(); //装备的最低使用属性
        this.equip_max_threshold = new Object(); //装备的最高使用属性
        this.equip_attr = new Object(); //装备后能提供的属性
    }
    //为这个物品填写装备特有的属性
    //e_type：武器装备分支下的小类型
    //maxStack：装备的堆叠数量，默认1
    //special：是否属于特制武器，默认否
    //attack_interval：攻击间隔，默认2
    init_Equipment(e_type, maxStack = 1, special = false, attack_interval = 2) {
        //装备小类
        if (e_type) {
            if (typeof e_type == 'object') {
                this.secon_type = this.secon_type.concat(e_type);
            }
            if (typeof e_type == 'string') {
                this.secon_type.push(e_type);
            }
        }
        //为装备预设穿戴位置
        for (let ee_type of this.secon_type) {
            if (enums.single_hand.includes(ee_type)) {
                this.wearing_position.push('main_hand'); //这件装备可以放在主手位置
            } else if (enums.both_hand.includes(ee_type)) {
                this.wearing_position.push('main_hand_two'); //这件装备可以放在主手位置
                this.two_handed_flag = true; //这件装备属于双手武器
            } else if (ee_type == 'helmet') {
                this.wearing_position.push('head'); //这件装备可以放在头部
            } else if (ee_type == 'chest_armor') {
                this.wearing_position.push('chest'); //这件装备可以放在胸部
            } else if (ee_type == 'leg_armor') {
                this.wearing_position.push('legs'); //这件装备可以放在腿部
            } else if (ee_type == 'shoes') {
                this.wearing_position.push('feet'); //这件装备可以放在脚部
            } else if (ee_type == 'shield') {
                this.wearing_position.push('deputy'); //这件装备可以放在副手位置
            } else if (ee_type == 'ornament') {
                this.wearing_position.push('ornament'); //这件装备可以放在饰品位置
            } else {
                console.log('该装备的小分类%s不明，需要重新定义', e_type);
            }
            //手弩可以同时放在主手和副手
            if (ee_type == 'hand_gun') {
                this.wearing_position.push('deputy');
            }
        }
        // 去重
        this.wearing_position = get_uniqueArr(this.wearing_position);
        if (this.wearing_position.includes('main_hand') && this.wearing_position.includes('main_hand_two')) {
            console.log('装备不可以同时属于主手和双手，%s装备异常', this.id);
        }
        //堆叠数量
        this.maxStack = maxStack;
        //制式武器或者特制武器的标记
        if (special) {
            //特制武器，稀有度设置到传说
            this.special = special;
            for (let rarity of enums['special_rarity']) {
                this.equip_attr[rarity] = new Object();
            }
        } else {
            //制式武器，稀有度设置到史诗
            for (let rarity of enums['no_special_rarity']) {
                this.equip_attr[rarity] = new Object();
            }
        }
        //攻击间隔
        this.equip_attr['ordinary']['attack_interval'] = attack_interval;
    }
    //为这个物品填写穿戴之后可以获得的攻击属性
    //攻击，精准，暴击率，暴击伤害，攻击速度加成
    init_Equipment_attack_attr(rarity, attack, precision, critical_chance, critical_damage, attack_speed) {
        this.equip_attr[rarity]['attack'] = attack;
        this.equip_attr[rarity]['precision'] = precision;
        this.equip_attr[rarity]['critical_chance'] = critical_chance;
        this.equip_attr[rarity]['critical_damage'] = critical_damage;
        this.equip_attr[rarity]['attack_speed'] = attack_speed;
    }
    //为这个物品填写穿戴之后可以获得的防御属性
    //防御，闪避，抵抗力，移动速度
    init_Equipment_defense_attr(rarity, defense, evade, resistance_point, move_speed) {
        this.equip_attr[rarity]['defense'] = defense;
        this.equip_attr[rarity]['evade'] = evade;
        this.equip_attr[rarity]['resistance_point'] = resistance_point;
        this.equip_attr[rarity]['move_speed'] = move_speed;
    }
    //为这个物品填写穿戴之后可以获得的生存属性
    //最大血量上限，最大魔力上限，最大精力上限
    init_Equipment_survival_attr(rarity, health_max, magic_max, energy_max) {
        this.equip_attr[rarity]['health_max'] = health_max;
        this.equip_attr[rarity]['magic_max'] = magic_max;
        this.equip_attr[rarity]['energy_max'] = energy_max;
    }
    //为这个物品填写穿戴之后可以获得的玩家基础属性
    //体格，经脉，魂魄，力量，敏捷，智力，技巧
    init_Equipment_player_base_attr(rarity, physique, Meridians, soul, power, agile, intelligence, technique) {
        this.equip_attr[rarity]['physique'] = physique;
        this.equip_attr[rarity]['Meridians'] = Meridians;
        this.equip_attr[rarity]['soul'] = soul;
        this.equip_attr[rarity]['power'] = power;
        this.equip_attr[rarity]['agile'] = agile;
        this.equip_attr[rarity]['intelligence'] = intelligence;
        this.equip_attr[rarity]['technique'] = technique;
    }
    //为这个物品设置属性级别,自动填充对应类型的属性
    //可能会给某些不应该填的属性填上数值
    set_attr_level(level, attr_type, secon_type = null) {
        //枚举库中没有该等级的预设，直接结束
        if (enums.equipment_attr_level[level] == undefined) {
            console.log('预设装备属性时，枚举库没有%s等级的预设', level);
            return;
        }
        //枚举库中没有对应类型的预设，直接结束
        if (enums.equipment_attr_level[level][attr_type] == undefined) {
            console.log('预设装备属性时，枚举库没有%s类型的预设', attr_type);
            return;
        }
        let e_type;
        if (is_Empty_Object(secon_type)) {
            //复合类型装备或者未定义类型的装备，不支持属性预设，直接结束
            if (this.secon_type.length != 1) {
                console.log('预设装备属性时，复合类型装备或者未定义类型的装备不支持属性预设');
                return;
            }
            e_type = this.secon_type[0];
        } else {
            //调用指定的装备小类
            e_type = secon_type;
        }
        //枚举库中没有对该装备类型设置属性倾向，直接结束
        if (enums.equipment_type_attr_Presets[e_type] == undefined) {
            console.log('预设装备属性时，枚举库中没有对该装备类型设置属性倾向');
            return;
        }
        //获取数值预设
        let Level_attr = enums.equipment_attr_level[level][attr_type];
        //针对武器，获取该等级下具体伤害类型的属性预设
        if (enums['weapon_equipment_type'].includes(e_type)) {
            let damage_type = enums.weapon_damage_type[e_type];
            //枚举库中没设置该种伤害类型的属性预设，直接结束
            if (Level_attr[damage_type] == undefined) {
                console.log('预设装备属性时，枚举库中没设置%s伤害类型的属性预设', damage_type);
                return;
            }
            Level_attr = Level_attr[damage_type];
        }

        //获取属性倾向
        let attr_Presets = enums.equipment_type_attr_Presets[e_type];

        //获取需要填的属性名称，例如攻击攻速暴击
        let need_attr_name;
        if (attr_type == 'attack') {
            // need_attr_name = enums['combat_attack_attr'];
            need_attr_name = ['attack', 'precision', 'critical_chance', 'critical_damage'];
        }
        if (attr_type == 'defense') {
            need_attr_name = enums['combat_defense_attr'];
        }
        if (attr_type == 'survival') {
            need_attr_name = enums['combat_survival_attr'];
        }
        if (attr_type == 'player_base') {
            need_attr_name = enums['player_base_attr'];
        }

        for (let attr_name of need_attr_name) {
            if (attr_Presets[attr_name] == undefined) {
                console.log('预设装备属性时，没有为装备预设%s类型的属性倾向', attr_type);
                return;
            }
            //获取attr_name属性倾向，例如最高较高普通较低最低
            let Presets = attr_Presets[attr_name];
            //获取level等级下，属性倾向的具体数值
            let num = Level_attr[attr_name][Presets];
            //赋值
            this.equip_attr['ordinary'][attr_name] = num;
        }
    }
    //自动设置所有稀有度的最基本的属性值
    auto_set_all_rarity_attr() {
        for (let rarity in this.equip_attr) {
            let attr_rate = enums[rarity].attr_rate;
            for (let attr_name in this.equip_attr['ordinary']) {
                if (attr_name == 'attack_interval') {
                    //不同稀有度的攻击间隔一致，如果需要自定义需要手动设置
                    this.equip_attr[rarity][attr_name] = this.equip_attr['ordinary'][attr_name];
                } else {
                    //其他属性正常
                    this.equip_attr[rarity][attr_name] = this.equip_attr['ordinary'][attr_name] * attr_rate * 0.01;
                }
            }
        }
    }
}
class Consumable extends Item {
    constructor(id) {
        super(id);
        this.main_type.push('consumable');
        this.consumable_type = new Array(); //这个消耗品的具体类型
    }
    //为这个物品填写消耗品特有的属性
    init_Consumable(e_type) {
        this.consumable_type.push(e_type);
    }
}
class Material extends Item {
    constructor(id) {
        super(id);
        this.main_type.push('material');
        this.material_type = new Array(); //这个材料的具体类型
    }

    //为这个物品填写材料特有的属性
    //没有开发到这部分，还没用
    // init_Material(e_type) {
    //     this.material_type.push(e_type);
    // }
}
function add_Item_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Item(newid);
    } else {
        console.log('items[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Equipment_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Equipment(newid);
    } else {
        console.log('items[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Consumable_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Consumable(newid);
    } else {
        console.log('items[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}
function add_Material_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Material(newid);
    } else {
        console.log('items[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export { add_Item_object, add_Equipment_object, add_Consumable_object, add_Material_object };
