import { add_text_object } from '../Text_class.js';

//被动技能的文本
function init_passive_skill(texts) {
    //初始化与战斗相关的被动技能的文本
    init_combat_passive_skill(texts);
    //初始化与伐木相关的被动技能的文本
    init_logging_passive_skill(texts);
    //初始化与钓鱼相关的被动技能的文本
    init_fishing_passive_skill(texts);
    //初始化与采集相关的被动技能的文本
    init_foraging_passive_skill(texts);
}
//初始化与战斗相关的被动技能的文本
function init_combat_passive_skill(texts) {
    let id;

    id = 'normal_sword';
    add_text_object(texts, id);
    texts[id].skill_name = '普通剑术';
    texts[id].skill_desc = '恰当的挥舞剑的方法，可以有效伤害敌人，又不至于伤到自己';

    id = 'normal_sticks';
    add_text_object(texts, id);
    texts[id].skill_name = '普通棍法';
    texts[id].skill_desc = '恰当的挥舞棍棒的方法，利用棍的重量抡圆了打人或许会很有效';
}
//初始化与伐木相关的被动技能的文本
function init_logging_passive_skill(texts) {
    let id;

    id = 'bare_handed_logging';
    add_text_object(texts, id);
    texts[id].skill_name = '徒手伐木技巧';
    texts[id].skill_desc = '增加空手时的伐木伤害';

    id = 'fast_axe_skill';
    add_text_object(texts, id);
    texts[id].skill_name = '快斧手';
    texts[id].skill_desc = '增加装备伐木工具时的伐木伤害';
}
//初始化与钓鱼相关的被动技能的文本
function init_fishing_passive_skill(texts) {
    let id;

    id = 'precision_cast';
    add_text_object(texts, id);
    texts[id].skill_name = '精确抛竿';
    texts[id].skill_desc = '将鱼钩丢到距离鱼不近不远的地方，让鱼可以马上看到鱼饵又不至于吓跑鱼，有助于鱼儿快点上钩';
}
//初始化与采集相关的被动技能的文本
function init_foraging_passive_skill(texts) {
    let id;

    id = 'lucky_finder';
    add_text_object(texts, id);
    texts[id].skill_name = '幸运搜索者';
    texts[id].skill_desc = '好东西就藏在那里，我发现了，就是我的';
}

export { init_passive_skill };
