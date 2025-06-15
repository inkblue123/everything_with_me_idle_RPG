import { add_text_object } from '../Text_class.js';

//被动技能的文本
function init_passive_skill(texts) {
    let id = 'normal_sword';
    add_text_object(texts, id);
    texts[id].skill_name = '普通剑术';
    id = 'normal_sticks';
    add_text_object(texts, id);
    texts[id].skill_name = '普通棍法';
}

export { init_passive_skill };
