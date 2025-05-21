import { texts } from '../Text/Text.js';
import { enums } from '../Enum/Enum.js';

//物品通用属性
class Item {
    constructor(id) {
        this.id = id; //唯一id
        this.name = ''; // 物品名称
        this.desc = ''; // 物品描述
        this.maxStack = 1; // 最大堆叠数量
        // this.type = new Array(); //物品大类型
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
    init_Item_price(...args) {
        if (args.length % 2 != 0) {
            console.log('设定物品价格时的参数数量不正常，有%d个', args.length);
        }
        for (let i = 0; i < args.length / 2; i++) {
            //
            let price_name = args[i * 2];
            this.price[price_name] = args[i * 2 + 1];
        }
    }
}

//独属于武器装备的属性
let Equipment_class = (extendsClass) =>
    class extends extendsClass {
        constructor(id) {
            super(id);
            this.main_type.push('equipment');
            this.equipment_type = new Array(); //这件装备的具体类型
            this.wearing_position = new Array(); //这件装备能穿戴的位置
            this.two_handed_flag = false; //这件装备是否属于双手武器
            this.special_flag = false; //这件装备是否属于特制装备
            this.attr_level; //这件装备的属性级别

            this.equip_min_threshold = new Object(); //装备的最低使用属性
            this.equip_max_threshold = new Object(); //装备的最高使用属性
            this.equip_attr = new Object(); //装备后能提供的属性
            this.equip_effect = new Object(); //装备后能提供的被动
        }
        //为这个物品填写装备特有的属性
        //e_type：武器装备分支下的小类型
        //special是否属于特制武器，默认否
        init_Equipment(e_type, special = false) {
            this.equipment_type.push(e_type);
            //为装备预设穿戴位置
            if (enums.single_hand.includes(e_type)) {
                this.wearing_position.push('main_hand'); //这件装备可以放在主手位置
            } else if (enums.both_hand.includes(e_type)) {
                this.wearing_position.push('main_hand_two'); //这件装备可以放在主手位置
                this.two_handed_flag = true; //这件装备属于双手武器
            } else if (e_type == 'helmet') {
                this.wearing_position.push('head'); //这件装备可以放在头部
            } else if (e_type == 'chest_armor') {
                this.wearing_position.push('chest'); //这件装备可以放在胸部
            } else if (e_type == 'leg_armor') {
                this.wearing_position.push('legs'); //这件装备可以放在腿部
            } else if (e_type == 'shoes') {
                this.wearing_position.push('feet'); //这件装备可以放在脚部
            } else if (e_type == 'shield') {
                this.wearing_position.push('deputy'); //这件装备可以放在副手位置
            } else if (e_type == 'ornament') {
                this.wearing_position.push('ornament'); //这件装备可以放在饰品位置
            } else {
                console.log('该装备的小分类%s不明，需要重新定义', e_type);
            }

            //手弩可以同时放在主手和副手
            if (e_type == 'hand_gun') {
                this.wearing_position.push('deputy');
            }
            //制式武器或者特制武器的标记
            if (special) {
                this.special = special;
            }
        }
        //为这个物品填写穿戴之后可以获得的攻击属性
        //攻击，精准，暴击率，暴击伤害，攻击速度
        init_Equipment_attack_attr(attack, precision, critical_chance, critical_damage, attack_speed) {
            this.equip_attr['attack'] = attack;
            this.equip_attr['precision'] = precision;
            this.equip_attr['critical_chance'] = critical_chance;
            this.equip_attr['critical_damage'] = critical_damage;
            this.equip_attr['attack_speed'] = attack_speed;
        }
        //为这个物品填写穿戴之后可以获得的防御属性
        //防御，闪避，抵抗力，移动速度
        init_Equipment_defense_attr(defense, evade, resistance_point, move_speed) {
            this.equip_attr['defense'] = defense;
            this.equip_attr['evade'] = evade;
            this.equip_attr['resistance_point'] = resistance_point;
            this.equip_attr['move_speed'] = move_speed;
        }
        //为这个物品填写穿戴之后可以获得的生存属性
        //最大血量上限，最大魔力上限，最大精力上限
        init_Equipment_survival_attr(health_max, magic_max, energy_max) {
            this.equip_attr['health_max'] = health_max;
            this.equip_attr['magic_max'] = magic_max;
            this.equip_attr['energy_max'] = energy_max;
        }
        //为这个物品填写穿戴之后可以获得的玩家基础属性
        //体格，经脉，魂魄，力量，敏捷，智力，技巧
        init_Equipment_player_base_attr(physique, Meridians, soul, power, agile, intelligence, technique) {
            this.equip_attr['physique'] = physique;
            this.equip_attr['Meridians'] = Meridians;
            this.equip_attr['soul'] = soul;
            this.equip_attr['power'] = power;
            this.equip_attr['agile'] = agile;
            this.equip_attr['intelligence'] = intelligence;
            this.equip_attr['technique'] = technique;
        }
        //为这个物品设置属性级别,自动填充对应类型的属性
        //可能会给某些不应该填的属性填上数值
        set_attr_level(level, attr_type) {
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
            //复合类型装备或者未定义类型的装备，不支持属性预设，直接结束
            if (this.equipment_type.length != 1) {
                console.log('预设装备属性时，复合类型装备或者未定义类型的装备不支持属性预设');
                return;
            }
            //枚举库中没有对该装备类型设置属性倾向，直接结束
            if (enums.equipment_type_attr_Presets[this.equipment_type[0]] == undefined) {
                console.log('预设装备属性时，枚举库中没有对该装备类型设置属性倾向');
                return;
            }
            //获取数值预设
            let Level_attr = enums.equipment_attr_level[level][attr_type];
            //针对武器，获取该等级下具体伤害类型的属性预设
            if (this.secon_type[0] == 'weapon') {
                let damage_type = enums.weapon_damage_type[this.equipment_type[0]];
                //枚举库中没设置该种伤害类型的属性预设，直接结束
                if (Level_attr[damage_type] == undefined) {
                    console.log('预设装备属性时，枚举库中没设置%s伤害类型的属性预设', damage_type);
                    return;
                }
                Level_attr = Level_attr[damage_type];
            }
            //获取属性倾向
            let attr_Presets = enums.equipment_type_attr_Presets[this.equipment_type[0]];

            //获取需要填的属性名称，例如攻击攻速暴击
            let need_attr_name;
            if (attr_type == 'attack') {
                need_attr_name = enums['combat_attack_attr'];
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
                this.equip_attr[attr_name] = num;
            }
        }
    };

//消耗品通用属性
let Consumable_class = (extendsClass) =>
    class extends extendsClass {
        constructor(id) {
            super(id);
            this.main_type.push('consumable');
            this.consumable_type = new Array(); //这个消耗品的具体类型
        }
        //为这个物品填写消耗品特有的属性
        init_Consumable(e_type) {
            this.consumable_type.push(e_type);
        }
    };

//材料通用属性
let Material_class = (extendsClass) =>
    class extends extendsClass {
        constructor(id) {
            super(id);
            this.main_type.push('material');
            this.material_type = new Array(); //这个消耗品的具体类型
        }
        material_type = new Array(); //这个消耗品的具体类型

        //为这个物品填写材料特有的属性
        init_Material(e_type) {
            this.material_type.push(e_type);
        }
    };

class Equipment extends Equipment_class(Item) {}
class Consumable extends Consumable_class(Item) {}
class Material extends Material_class(Item) {}

//创建Item对象，如果已经创建过则生成混合类
function add_Item_object(items, newid, ...enums) {
    if (items[newid] === undefined) {
        //全新对象
        if (enums.length == 0) {
            console.log('add_mix_Item_object error :未输入物品类型');
            return;
        } else if (enums.length == 1) {
            if (enums[0] == 'equipment') {
                items[newid] = new Equipment(newid);
            } else if (enums[0] == 'consumable') {
                items[newid] = new Consumable(newid);
            } else if (enums[0] == 'material') {
                items[newid] = new Material(newid);
            }
        } else {
            //遍历每一种需要的类型,最终造出需要的混合类
            let mix_class = Item;
            for (let aT of enums) {
                if (aT == 'equipment') {
                    mix_class = Equipment_class(mix_class);
                }
                if (aT == 'consumable') {
                    mix_class = Consumable_class(mix_class);
                }
                if (aT == 'material') {
                    mix_class = Material_class(mix_class);
                }
            }
            class mix_Item extends mix_class {}

            items[newid] = new mix_Item(newid);
            items[newid].main_type = enums;
        }
    } else {
        //如果已经创建过对象,则尝试生成一个混合类,将原本对象中的值赋予新的混合类
        let base_types = new Array();
        let other_types = new Array();
        //获取源类型
        for (let raw_type of items[newid].main_type) {
            if (raw_type == 'equipment' || raw_type == 'consumable' || raw_type == 'material') {
                base_types.push(raw_type);
            } else {
                other_types.push(raw_type);
            }
        }
        //依据原类型和新类型生成混合类
        base_types = base_types.concat(enums);
        base_types = [...new Set(base_types)]; //去重
        //造出混合类
        let mix_class = Item;
        for (let aT of base_types) {
            if (aT == 'equipment') {
                mix_class = Equipment_class(mix_class);
            }
            if (aT == 'consumable') {
                mix_class = Consumable_class(mix_class);
            }
            if (aT == 'material') {
                mix_class = Material_class(mix_class);
            }
        }
        class mix_Item extends mix_class {}
        let new_item = new mix_Item(newid);
        // 递归的将源对象中的值赋予新对象
        for (let key in items[newid]) {
            if (items[newid].hasOwnProperty(key)) {
                new_item[key] = deepClone(items[newid][key]);
            }
        }
        let new_types = other_types.concat(base_types);
        new_types = [...new Set(new_types)]; //去重
        //完成
        items[newid] = new_item;
        items[newid].main_type = new_types;
    }
}
// 深拷贝函数
function deepClone(obj) {
    if (obj === null || typeof obj !== 'object') return obj;
    let copy = Array.isArray(obj) ? [] : {};
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            copy[key] = deepClone(obj[key]); // 递归深拷贝
        }
    }
    return copy;
}

export { add_Item_object };
