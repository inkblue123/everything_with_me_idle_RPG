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
    let id = 'little_distance';
    add_text_object(texts, id);
    texts[id].skill_desc = '近距离';
    id = 'middle_distance';
    add_text_object(texts, id);
    texts[id].skill_desc = '中距离';
    id = 'remote_distance';
    add_text_object(texts, id);
    texts[id].skill_desc = '远距离';
    id = 'melee';
    add_text_object(texts, id);
    texts[id].skill_desc = '近战';
    id = 'range';
    add_text_object(texts, id);
    texts[id].skill_desc = '远程';
    id = 'magic';
    add_text_object(texts, id);
    texts[id].skill_desc = '魔法';
    id = 'attack';
    add_text_object(texts, id);
    texts[id].skill_desc = '攻击';
    id = 'defense';
    add_text_object(texts, id);
    texts[id].skill_desc = '防御';
    id = 'recovery';
    add_text_object(texts, id);
    texts[id].skill_desc = '恢复';
    id = 'auxiliary';
    add_text_object(texts, id);
    texts[id].skill_desc = '辅助';
}
//初始化文本数据库中与技能相关的文本
function init_Text_skill(texts) {
    //攻击型技能的文本
    init_attack_skill(texts);
    // //防御型技能的文本
    // defense_skill(texts);
}

export { init_Text_skill };
