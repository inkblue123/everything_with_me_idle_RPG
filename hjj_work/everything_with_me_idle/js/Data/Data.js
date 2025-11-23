import { buffs, init_buffs } from './Buff/Buff.js';
import { enemys, init_enemys } from './Enemy/Enemy.js';
import { enums, init_enums } from './Enum/Enum.js';
import { formulas, init_formulas } from './Formula/Formula.js';
import { items, init_items } from './Item/Item.js';
import { places, init_places } from './Place/Place.js';
import { init_skills } from './Skill/Skill.js';
import { texts, init_texts } from './Text/Text.js';
import { add_text_object } from './Text/Text_class.js';
import { game_events, init_game_events } from './Game_event/Game_Event.js';
import { get_uniqueArr } from '../Function/Function.js';

//数据库中内容大部分可以写死定义
//部分内容需要在游戏内容不断扩展的同时进行填充和更新
//这个填充和更新的部分时常遗忘和遗漏
//在这个函数中进行动态的更新，避免手动更新的遗漏
//游戏数据库初始化
function game_data_init() {
    //初始化每个数据库，有顺序要求，不要乱动
    init_texts();
    init_enums();
    init_buffs();
    init_items();
    init_formulas();
    init_game_events();
    init_places();
    init_skills();
    init_enemys();

    //枚举数据库-游戏状态部分的枚举更新
    Enum_game_status_init();
    //枚举数据库-物品部分的枚举更新
    Enum_item_init();
    //枚举数据库-属性部分的枚举更新
    Enum_attr_init();
    //文本数据库-属性部分的更新
    Text_attr_init();
}
//
function Enum_game_status_init() {
    //游戏运行中遇到了事件完成，需要在游戏状态管理里标记，该事件完成了
    //如何知晓这个事件属于主线、支线、挑战、成就，在对应的管理对象里存储
    //就要用到enums.important_nodes，事先存储好分类，后续简单查询即可
    //开发中新增了事件，理应在enums.important_nodes里添加对应的名称
    //但是开发有时候会遗忘，毕竟新事件在Game_event数据库中，
    //所以在这里进行自动初始化，自动填充enums.important_nodes里的事件名
    //把4种重要节点放到枚举类中，用于判断某事件属于哪种重要事件
    for (let id in game_events) {
        let type = game_events[id].type;
        if (type == 'main_quest' || type == 'challenge' || type == 'achievement' || type == 'mini_event' || type == 'side_quest') {
            enums.important_nodes[type].push(id);
        }
    }
}
function Enum_item_init() {
    //物品有大类，决定物品是装备、消耗品、材料，就三种
    //物品还有小类，决定这个物品具体的类型，比如剑类型，木头类型，食品类型，很多很多小类，而且还会不断扩展
    //做物品过滤时经常用到这个小类
    //由于小类在开发时会不断扩展，在物品库中开发时可能会忘了要在枚举库中新增
    for (let id in items) {
        let main_type = items[id].main_type;
        let secon_type_array = items[id].secon_type;

        for (let secon_type of secon_type_array) {
            enums.Item_secon_type.push(secon_type);
            if (main_type == 'equipment') {
                enums.Equipment_secon_type.push(secon_type);
            } else if (main_type == 'consumable') {
                enums.Consumable_secon_type.push(secon_type);
            } else if (main_type == 'material') {
                enums.Material_secon_type.push(secon_type);
            }
        }
    }
    //去重
    enums.Item_secon_type = get_uniqueArr(enums.Item_secon_type);
    enums.Equipment_secon_type = get_uniqueArr(enums.Equipment_secon_type);
    enums.Consumable_secon_type = get_uniqueArr(enums.Consumable_secon_type);
    enums.Material_secon_type = get_uniqueArr(enums.Material_secon_type);
}

function Enum_attr_init() {
    //游戏中有很多属性，攻击、防御、伤害加成、攻击速度、伐木伤害、伐木工具伐木伤害、伐木工具伐木攻速等等
    //其中有些属性，例如伐木工具伐木伤害、战斧伐木伤害、空手伐木伤害、以及所有武器小类后面都加个伐木伤害
    //不止伐木，7种生活技能各自有各自的一些属性，会和举例的一样，其实就是几个词语的组合，由于几个词语种类很多，最终总数就很多
    //这些属性，理论上来说，数据库里应该定义一下，这种属性的id，属性的名称，属性用百分比展示或者秒展示或者直接展示
    //数据库里理论上应该都要有，问题在于手动复制粘贴很麻烦，且容易错漏
    //在这里写一个函数自动全部定义出来
    //这个函数负责枚举库里的，即哪些属性用百分比展示或者秒展示或者直接展示

    //需要用百分号表示的属性
    //前缀是暴击率、暴击伤害、伤害加成、攻速加成、伐木暴率、伐木暴伤、伐木伤害、伐木速度、挖矿暴率、挖矿暴伤、挖矿伤害、挖矿速度
    //后缀是所有武器工具子类和空手
    //组合效果就是伐木工具伐木伤害、伐木工具伐木攻速这样
    let front = [
        'critical_chance',
        'critical_damage',
        'damage',
        'attack_speed',
        'LGI_critical_chance',
        'LGI_critical_damage',
        'LGI_damage',
        'LGI_speed',
        'MIN_critical_chance',
        'MIN_critical_damage',
        'MIN_damage',
        'MIN_speed',
    ];
    let after = JSON.parse(JSON.stringify(enums['weapon_equipment_type']));
    after.push('emptyhanded');
    for (let front_text of front) {
        for (let after_text of after) {
            let attr_id = front_text + '_' + after_text;
            enums['need_per_cent_attr'].push(attr_id);
        }
    }
    //前缀是采集概率
    //后缀是所有物品子类和一些子类集合
    //组合效果就是采集时获得凡木的概率、采集时获得蘑菇的概率，采集时获得任意木头的概率这样
    front = ['FAG_chance'];
    after = JSON.parse(JSON.stringify(enums['Item_secon_type']));
    after.push('all_wood');
    after.push('all_grass');
    after.push('all_mushroom');
    for (let front_text of front) {
        for (let after_text of after) {
            let attr_id = front_text + '_' + after_text;
            enums['need_per_cent_attr'].push(attr_id);
        }
    }
    //去重
    enums['need_per_cent_attr'] = get_uniqueArr(enums['need_per_cent_attr']);

    //需要用秒表示的属性
    //前缀是攻击间隔、伐木间隔、挖矿间隔
    //后缀是所有武器工具子类和空手
    //组合效果就是剑攻击间隔、战斧伐木间隔，镐子挖矿间隔这样
    front = ['attack_interval', 'LGI_interval', 'MIN_interval'];
    after = JSON.parse(JSON.stringify(enums['weapon_equipment_type']));
    after.push('emptyhanded');
    for (let front_text of front) {
        for (let after_text of after) {
            let attr_id = front_text + '_' + after_text;
            enums['need_second_attr'].push(attr_id);
        }
    }
    //去重
    enums['need_second_attr'] = get_uniqueArr(enums['need_second_attr']);
}
function Text_attr_init() {
    //游戏中有很多属性，攻击、防御、伤害加成、攻击速度、伐木伤害、伐木工具伐木伤害、伐木工具伐木攻速等等
    //其中有些属性，例如伐木工具伐木伤害、战斧伐木伤害、空手伐木伤害、以及所有武器小类后面都加个伐木伤害
    //不止伐木，7种生活技能各自有各自的一些属性，会和举例的一样，其实就是几个词语的组合，由于几个词语种类很多，最终总数就很多
    //这些属性，理论上来说，数据库里应该定义一下，这种属性的id，属性的名称，属性用百分比展示或者秒展示或者直接展示
    //数据库里理论上应该都要有，问题在于手动复制粘贴很麻烦，且容易错漏
    //在这里写一个函数自动全部定义出来
    //这个函数负责文本库里的，即这些自动设定的属性的属性名称

    //前缀是暴击率、暴击伤害、伤害加成、攻速加成、伐木暴率、伐木暴伤、伐木伤害、伐木速度、挖矿暴率、挖矿暴伤、挖矿伤害、挖矿速度
    //后缀是所有武器工具子类和空手
    //组合效果就是伐木工具伐木伤害、伐木工具伐木攻速这样
    let front = {
        critical_chance: '暴击率',
        critical_damage: '暴击伤害',
        damage: '伤害',
        attack_speed: '攻击速度',
        LGI_critical_chance: '伐木暴率',
        LGI_critical_damage: '伐木暴伤',
        LGI_damage: '伐木伤害',
        LGI_speed: '伐木速度',
        MIN_critical_chance: '挖矿暴率',
        MIN_critical_damage: '挖矿暴伤',
        MIN_damage: '挖矿伤害',
        MIN_speed: '挖矿速度',
    };
    let after = JSON.parse(JSON.stringify(enums['weapon_equipment_type']));
    after.push('emptyhanded');
    for (let front_id in front) {
        for (let after_id of after) {
            let attr_id = front_id + '_' + after_id;
            let attr_name = texts[after_id].type_name + front[front_id];
            add_text_object(texts, attr_id);
            texts[attr_id].attr_name = attr_name;
        }
    }
    //前缀是采集概率
    //后缀是所有物品子类和一些子类集合
    //组合效果就是采集时获得凡木的概率、采集时获得蘑菇的概率，采集时获得任意木头的概率这样
    front = { FAG_chance: '采集时获得' };
    after = JSON.parse(JSON.stringify(enums['Item_secon_type']));
    after.push('all_wood');
    after.push('all_grass');
    after.push('all_mushroom');
    for (let front_id in front) {
        for (let after_id of after) {
            let attr_id = front_id + '_' + after_id;
            let attr_name = front[front_id] + texts[after_id].type_name + '的概率';
            add_text_object(texts, attr_id);
            texts[attr_id].attr_name = attr_name;
        }
    }

    //前缀是攻击间隔、伐木间隔、挖矿间隔
    //后缀是所有武器工具子类和空手
    //组合效果就是剑攻击间隔、战斧伐木间隔，镐子挖矿间隔这样
    front = { attack_interval: '攻击间隔', LGI_interval: '伐木间隔', MIN_interval: '挖矿间隔' };
    after = JSON.parse(JSON.stringify(enums['weapon_equipment_type']));
    after.push('emptyhanded');
    for (let front_id in front) {
        for (let after_id of after) {
            let attr_id = front_id + '_' + after_id;
            let attr_name = texts[after_id].type_name + front[front_id];
            add_text_object(texts, attr_id);
            texts[attr_id].attr_name = attr_name;
        }
    }
}

export { game_data_init };
