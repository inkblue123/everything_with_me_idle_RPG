import { add_text_object } from './Text_class.js';

//攻击型技能的文本
function init_attack_skill(texts) {
    let id = 'normal_attack_Melee';
    add_text_object(texts, id);
    texts[id].skill_name = '普通攻击-近战';
    texts[id].mini_skill_name = '普攻-近';
    // texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
}
//技能描述
function init_skill_desc(texts) {
    //
    let id = 'attack_distance'; //攻击范围
    add_text_object(texts, id);
    texts[id].skill_desc = {
        little_distance: '近距离',
        middle_distance: '中距离',
        remote_distance: '远距离',
    };
    id = 'damage_type'; //伤害类型
    add_text_object(texts, id);
    texts[id].skill_desc = {
        melee: '近战',
        range: '远程',
        magic: '魔法',
    };
    id = 'active_type'; //技能类型
    add_text_object(texts, id);
    texts[id].skill_desc = {
        attack: '攻击',
        defense: '防御',
        recovery: '恢复',
        auxiliary: '辅助',
    };
    id = 'lock_enemy_distance'; //索敌描述-距离
    add_text_object(texts, id);
    texts[id].skill_desc = {
        min: '最近',
        max: '最远',
    };
}
//技能限制条件描述
function init_skill_condition_desc(texts) {
    //
    let id = 'weapon_damage_type'; //攻击范围
    add_text_object(texts, id);
    texts[id].condition_desc = '武器';
    // id = 'damage_type'; //伤害类型
    // add_text_object(texts, id);
    // texts[id].skill_desc = {
    //     melee: '近战伤害',
    //     range: '远程伤害',
    //     magic: '魔法伤害',
    // };
}
//初始化文本数据库中与技能相关的文本
function init_Text_skill(texts) {
    //攻击型技能的文本
    init_attack_skill(texts);
    // //防御型技能的文本
    // defense_skill(texts);

    //技能描述的文本
    init_skill_desc(texts);
}

export { init_Text_skill };
