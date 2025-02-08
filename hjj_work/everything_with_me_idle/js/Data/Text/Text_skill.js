import { add_text_object } from './Text_class.js';

//普通地点的文本
function attack_skill(texts) {
    let id = 'normal_attack_Melee';
    add_text_object(texts, id);
    texts[id].skill_name = '普通攻击-近战';
    texts[id].mini_skill_name = '普攻-近';
    // texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
}
//初始化文本数据库中与技能相关的文本
function init_Text_skill(texts) {
    //攻击型技能的文本
    attack_skill(texts);
    // //防御型技能的文本
    // defense_skill(texts);
}

export { init_Text_skill };
