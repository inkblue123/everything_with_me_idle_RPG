import { add_text_object } from '../Text_class.js';

//攻击型技能的文本
function init_attack_skill(texts) {
    let id;
    id = 'normal_attack_Melee';
    add_text_object(texts, id);
    texts[id].skill_name = '普通攻击-近战';
    texts[id].mini_skill_name = '普攻-近';

    id = 'energy_storage_attack';
    add_text_object(texts, id);
    texts[id].skill_name = '蓄力攻击';
    // texts[id].mini_skill_name = ;

    id = 'test_3_slot_skill';
    add_text_object(texts, id);
    texts[id].skill_name = '测试3槽技能';
    // texts[id].mini_skill_name = ;

    id = 'test_4_slot_skill';
    add_text_object(texts, id);
    texts[id].skill_name = '测试4槽技能';
    // texts[id].mini_skill_name = ;
}
//防御型技能的文本
function init_defense_skill(texts) {
    let id = 'shield_defense';
    add_text_object(texts, id);
    texts[id].skill_name = '盾牌防御';
}

//被动技能的文本
function init_active_skill(texts) {
    //攻击型技能的文本
    init_attack_skill(texts);
    //防御型技能的文本
    init_defense_skill(texts);
}

export { init_active_skill };
