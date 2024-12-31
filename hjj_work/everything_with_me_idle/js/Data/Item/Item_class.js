import { texts } from '../Text/Text.js';
import { types } from '../Type.js';

//物品通用属性
export class Item {
    constructor(id) {
        this.id = id; //唯一id
        this.name = ''; // 物品名称
        this.description = ''; // 物品描述
        this.maxStack = 1; // 最大堆叠数量
        this.type = new Array(); //物品大类型

        this.init_Item_name_desc(id);
    }
    //调用文本数据库中的物品名称和描述
    init_Item_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义物品名称和描述
            this.name = '未命名物品';
            this.description = '未设定物品描述';
        } else {
            this.name = texts[id].item_name;
            this.description = texts[id].item_desc;
        }
    }
    //手动定义其他的物品属性
    init_Item_other(maxStack, type) {
        if (maxStack) {
            this.maxStack = maxStack;
        }
        this.type = this.type.concat(type);
    }
}

//武器装备通用属性
export class Equipment extends Item {
    constructor(id) {
        super(id);
        this.type.push('equipment');
        this.equipment_type = new Array(); //这件装备的具体类型
        this.wearing_position = new Array(); //这件装备能穿戴的位置
        this.two_handed_flag = false; //这件装备是否属于双手武器
        this.special_flag = false; //这件装备是否属于特制装备

        this.equip_min_threshold = new Object(); //装备的最低使用属性
        this.equip_max_threshold = new Object(); //装备的最高使用属性
        this.equip_attr = new Object(); //装备后能提供的属性
        this.equip_effect = new Object(); //装备后能提供的被动
    }
    //为这个物品填写装备特有的属性
    init_Equipment(e_type, special) {
        this.equipment_type.push(e_type);
        //为装备预设穿戴位置
        if (types.single_hand.includes(e_type)) {
            this.wearing_position.push('main_hand'); //这件装备可以放在主手位置
        } else if (types.both_hand.includes(e_type)) {
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
        } else if (e_type == 'deputy') {
            this.wearing_position.push('deputy'); //这件装备可以放在副手位置
        } else if (e_type == 'ornament') {
            this.wearing_position.push('ornament'); //这件装备可以放在饰品位置
        }
        if (e_type == 'hand_gun') {
            //手弩可以同时放在主手和副手
            this.wearing_position.push('deputy');
        }
        //制式武器或者特制武器的标记
        if (special) {
            this.special = special;
        }
    }
}

//消耗品通用属性
export class Consumable extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);

        this.type.push('consumable');
        this.Consumable_type = new Array(); //这个消耗品的具体类型
    }

    //为这个物品填写消耗品特有的属性
    init_Consumable(e_type) {
        this.Consumable_type.push(e_type);
    }
}

//材料通用属性
class Material extends Item {
    constructor(id, name, maxStack) {
        super(id, name, maxStack);
        this.type.push('material');
    }
}

//创建Item对象，如果已经创建过就不创建
function add_Item_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Item(newid);
    } else {
        console.log(`items[${newid}] is no undefined`);
    }
}
//创建Equipment对象，如果已经创建过就不创建
function add_Equipment_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Equipment(newid);
    } else {
        console.log(`items[${newid}] is no undefined`);
    }
}
//创建Consumable对象，如果已经创建过就不创建
function add_Consumable_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Consumable(newid);
    } else {
        console.log(`items[${newid}] is no undefined`);
    }
}
//创建Material对象，如果已经创建过就不创建
function add_Material_object(items, newid) {
    if (items[newid] === undefined) {
        items[newid] = new Material(newid);
    } else {
        console.log(`items[${newid}] is no undefined`);
    }
}

export { add_Item_object, add_Equipment_object, add_Consumable_object, add_Material_object };
