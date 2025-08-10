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
//伤害增幅属性
function init_damage_attr(texts) {
    let id = 'sword_damage';
    add_text_object(texts, id);
    texts[id].attr_name = '剑伤害加成';
    id = 'sword_sticks';
    add_text_object(texts, id);
    texts[id].attr_name = '棍棒伤害加成';
    id = 'gloves_LGI_damage';
    add_text_object(texts, id);
    texts[id].attr_name = '空手伐木伤害';
    id = 'axe_LGI_damage';
    add_text_object(texts, id);
    texts[id].attr_name = '斧头伐木伤害';
    id = 'axe_LGI_speed';
    add_text_object(texts, id);
    texts[id].attr_name = '斧头伐木速度';
}
//初始化文本数据库中属性名称相关的文本
function init_Text_attr(texts) {
    //玩家身上的属性
    init_player_attr(texts);
    //伤害增幅属性
    init_damage_attr(texts);
}

export { init_Text_attr };
