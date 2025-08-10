import { add_text_object } from '../Text_class.js';

//被动技能的文本
function init_passive_skill(texts) {
    let id = 'normal_sword';
    add_text_object(texts, id);
    texts[id].skill_name = '普通剑术';

    id = 'normal_sticks';
    add_text_object(texts, id);
    texts[id].skill_name = '普通棍法';

    id = 'bare_handed_logging';
    add_text_object(texts, id);
    texts[id].skill_name = '徒手伐木技巧';
    texts[id].skill_desc = '增加空手或装备拳套时的伐木伤害';

    id = 'fast_axe_skill';
    add_text_object(texts, id);
    texts[id].skill_name = '快斧手';
    // texts[id].skill_desc = '增加空手或装备拳套时的伐木伤害';
}

export { init_passive_skill };
