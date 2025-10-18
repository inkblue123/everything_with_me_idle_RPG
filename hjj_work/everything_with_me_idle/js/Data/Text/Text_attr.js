import { add_text_object } from './Text_class.js';

//玩家身上的属性名称描述
function init_player_attr(texts) {
    let id = 'attack';
    // add_text_object(texts, id);
    texts[id].attr_name = '攻击力';
    id = 'precision';
    add_text_object(texts, id);
    texts[id].attr_name = '精准';
    id = 'critical_chance';
    add_text_object(texts, id);
    texts[id].attr_name = '暴击率';
    id = 'critical_damage';
    add_text_object(texts, id);
    texts[id].attr_name = '暴击伤害';
    texts[id].min_attr_name = '暴伤';
    id = 'attack_speed';
    add_text_object(texts, id);
    texts[id].attr_name = '攻击速度';
    texts[id].min_attr_name = '攻速';
    id = 'attack_interval';
    add_text_object(texts, id);
    texts[id].attr_name = '攻击间隔';
    id = 'true_attack_interval';
    add_text_object(texts, id);
    texts[id].attr_name = '攻击间隔';

    id = 'defense';
    // add_text_object(texts, id);
    texts[id].attr_name = '防御';
    id = 'evade';
    add_text_object(texts, id);
    texts[id].attr_name = '闪避';
    id = 'resistance_point';
    add_text_object(texts, id);
    texts[id].attr_name = '抵抗力';
    id = 'move_speed';
    add_text_object(texts, id);
    texts[id].attr_name = '移动速度';
    texts[id].min_attr_name = '移速';

    id = 'health_max';
    add_text_object(texts, id);
    texts[id].attr_name = '生命上限';
    id = 'magic_max';
    add_text_object(texts, id);
    texts[id].attr_name = '魔力上限';
    id = 'energy_max';
    add_text_object(texts, id);
    texts[id].attr_name = '精力上限';

    id = 'physique';
    add_text_object(texts, id);
    texts[id].attr_name = '体格';
    id = 'Meridians';
    add_text_object(texts, id);
    texts[id].attr_name = '经脉';
    id = 'soul';
    add_text_object(texts, id);
    texts[id].attr_name = '魂魄';
    id = 'power';
    add_text_object(texts, id);
    texts[id].attr_name = '力量';
    id = 'agile';
    add_text_object(texts, id);
    texts[id].attr_name = '敏捷';
    id = 'intelligence';
    add_text_object(texts, id);
    texts[id].attr_name = '智力';
    id = 'technique';
    add_text_object(texts, id);
    texts[id].attr_name = '技巧';
}

//不是很常规的属性-战斗方面的
function init_no_normal_attr_name_combat(texts) {
    let id;
    //前缀是暴击率、暴击伤害、伤害加成、攻速加成、
    //后缀是所有武器工具子类和空手
    //这样的属性已经在Data.js中自动定义了，这里可以不需要重复定义
    // id = 'damage_sword';
    // add_text_object(texts, id);
    // texts[id].attr_name = '剑伤害加成';
    // id = 'damage_sticks';
    // add_text_object(texts, id);
    // texts[id].attr_name = '棍棒伤害加成';
}
//不是很常规的属性-伐木方面的
function init_no_normal_attr_name_logging(texts) {
    let id;
    //前缀是伐木暴率、伐木暴伤、伐木伤害、伐木攻速
    //后缀是所有武器工具子类和空手
    //这样的属性已经在Data.js中自动定义了，这里可以不需要重复定义
    // id = 'LGI_damage_emptyhanded';
    // add_text_object(texts, id);
    // texts[id].attr_name = '空手伐木伤害';
    // id = 'LGI_damage_battle_axe';
    // add_text_object(texts, id);
    // texts[id].attr_name = '战斧伐木伤害';
    // id = 'LGI_damage_logging_tool';
    // add_text_object(texts, id);
    // texts[id].attr_name = '伐木工具伐木伤害';
    // id = 'LGI_speed_battle_axe';
    // add_text_object(texts, id);
    // texts[id].attr_name = '战斧伐木速度';
    // id = 'LGI_speed_logging_tool';
    // add_text_object(texts, id);
    // texts[id].attr_name = '伐木工具伐木速度';
}
//不是很常规的属性-钓鱼方面的
function init_no_normal_attr_name_fishing(texts) {
    let id;
    id = 'FIS_takebait_attack';
    add_text_object(texts, id);
    texts[id].attr_name = '钓鱼上钩力';
    id = 'FIS_walkfish_attack';
    add_text_object(texts, id);
    texts[id].attr_name = '钓鱼遛鱼力';
}
//不是很常规的属性-采集方面的
function init_no_normal_attr_name_foraging(texts) {
    let id;
    id = 'FAG_chance';
    add_text_object(texts, id);
    texts[id].attr_name = '采集概率';
    id = 'FAG_attack';
    add_text_object(texts, id);
    texts[id].attr_name = '采集力';
    //前缀是采集概率
    //后缀是所有物品子类和一些子类集合
    //这样的属性已经在Data.js中自动定义了，这里可以不需要重复定义
    // id = 'FAG_chance_all_wood';
    // add_text_object(texts, id);
    // texts[id].attr_name = '采集时获得任意木头的概率';
    // id = 'FAG_chance_ordinary_wood';
    // add_text_object(texts, id);
    // texts[id].attr_name = '采集时获得凡木的概率';
    // id = 'FAG_chance_all_grass';
    // add_text_object(texts, id);
    // texts[id].attr_name = '采集时获得任意草的概率';
}
//初始化文本数据库中属性名称相关的文本
function init_Text_attr(texts) {
    //玩家身上的常规属性
    init_player_attr(texts);
    //不是很常规的属性-战斗方面的
    init_no_normal_attr_name_combat(texts);
    //不是很常规的属性-伐木方面的
    init_no_normal_attr_name_logging(texts);
    //不是很常规的属性-钓鱼方面的
    init_no_normal_attr_name_fishing(texts);
    //不是很常规的属性-采集方面的
    init_no_normal_attr_name_foraging(texts);
}

export { init_Text_attr };
