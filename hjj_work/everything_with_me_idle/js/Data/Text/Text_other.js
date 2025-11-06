import { add_text_object } from './Text_class.js';

//生活技能的名称文本
function live_skill_name(texts) {
    let id;

    id = 'logging';
    add_text_object(texts, id);
    texts[id].live_skill_name = '伐木';
    id = 'fishing';
    add_text_object(texts, id);
    texts[id].live_skill_name = '钓鱼';
    id = 'mining';
    add_text_object(texts, id);
    texts[id].live_skill_name = '挖矿';
    id = 'foraging';
    add_text_object(texts, id);
    texts[id].live_skill_name = '采集';
    id = 'diving';
    add_text_object(texts, id);
    texts[id].live_skill_name = '潜水';
    id = 'archaeology';
    add_text_object(texts, id);
    texts[id].live_skill_name = '考古';
    id = 'exploration';
    add_text_object(texts, id);
    texts[id].live_skill_name = '探索';
}
//初始化文本数据库中没有明确分类的文本
function init_Text_other(texts) {
    //生活技能的名称文本
    live_skill_name(texts);
}

export { init_Text_other };
