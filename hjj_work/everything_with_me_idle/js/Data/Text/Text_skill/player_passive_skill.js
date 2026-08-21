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
    init_collect_passive_skill(texts);
    //初始化与挖矿相关的被动技能的文本
    init_mining_passive_skill(texts);
    //初始化与潜水相关的被动技能的文本
    init_diving_passive_skill(texts);
    //初始化与考古相关的被动技能的文本
    init_archaeology_passive_skill(texts);
    //初始化与探索相关的被动技能的文本
    init_exploration_passive_skill(texts);
    //初始化与合成制造相关的被动技能的文本
    init_synthesis_passive_skill(texts);
    //初始化与烹饪相关的被动技能的文本
    init_cooking_passive_skill(texts);
    //初始化与锻造相关的被动技能的文本
    init_forging_passive_skill(texts);
    //初始化与炼丹相关的被动技能的文本
    init_elixir_alchemy_passive_skill(texts);
    //初始化与药浴相关的被动技能的文本
    init_herbal_bath_passive_skill(texts);
    //初始化与雕刻相关的被动技能的文本
    init_engrave_passive_skill(texts);
    //初始化与炼金术相关的被动技能的文本
    init_alchemy_passive_skill(texts);
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
    id = 'accurate_continuous_logging';
    add_text_object(texts, id);
    texts[id].skill_name = '精确连续劈砍';
    texts[id].skill_desc = '已经可以做到精确的砍到同一个位置，精确伐木时效率更高了';

    //伐木专精
    id = 'logging_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '伐木专精';
    texts[id].skill_desc = '精通伐木之道，完成伐木时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与钓鱼相关的被动技能的文本
function init_fishing_passive_skill(texts) {
    let id;

    id = 'precision_cast';
    add_text_object(texts, id);
    texts[id].skill_name = '精确抛竿';
    texts[id].skill_desc = '将鱼钩丢到距离鱼不近不远的地方，让鱼可以马上看到鱼饵又不至于吓跑鱼，有助于鱼儿快点上钩';

    //钓鱼专精
    id = 'fishing_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '钓鱼专精';
    texts[id].skill_desc = '精通钓鱼之道，完成钓鱼时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与采集相关的被动技能的文本
function init_collect_passive_skill(texts) {
    let id;

    id = 'lucky_finder';
    add_text_object(texts, id);
    texts[id].skill_name = '幸运搜索者';
    texts[id].skill_desc = '好东西就藏在那里，我发现了，就是我的';
    // id = 'mushroom_bulge_sharp_perception';
    // add_text_object(texts, id);
    // texts[id].skill_name = '蘑菇鼓包敏锐察觉';
    // texts[id].skill_desc = '蘑菇顶起的鼓包总是有迹可循，善于发现这些鼓包可以找到更多蘑菇，或是找到其他采集物品';
    id = 'be_careful_with_collect';
    add_text_object(texts, id);
    texts[id].skill_name = '小心采集';
    texts[id].skill_desc = '有些采集物品嵌在石壁里或者埋在深土中，下手轻些才可以完整的取出，有时会有意外收获';
    id = 'have_the_discerning_eye';
    add_text_object(texts, id);
    texts[id].skill_name = '慧眼识珠';
    texts[id].skill_desc = '你已经采集过许多稀有的物品，你已经知道它们的共同特点，想找到它们会更容易';

    //采集专精
    id = 'collect_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '采集专精';
    texts[id].skill_desc = '精通采集之道，完成采集时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与挖矿相关的被动技能的文本
function init_mining_passive_skill(texts) {
    let id;
    //挖矿专精
    id = 'mining_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '挖矿专精';
    texts[id].skill_desc = '精通挖矿之道，完成挖矿时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与潜水相关的被动技能的文本
function init_diving_passive_skill(texts) {
    let id;
    //潜水专精
    id = 'diving_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '潜水专精';
    texts[id].skill_desc = '精通潜水之道，完成潜水时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与考古相关的被动技能的文本
function init_archaeology_passive_skill(texts) {
    let id;
    //考古专精
    id = 'archaeology_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '考古专精';
    texts[id].skill_desc = '精通考古之道，完成考古时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与探索相关的被动技能的文本
function init_exploration_passive_skill(texts) {
    let id;
    //探索专精
    id = 'exploration_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '探索专精';
    texts[id].skill_desc = '精通探索之道，完成探索时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与合成制造相关的被动技能的文本
function init_synthesis_passive_skill(texts) {
    let id;
    //合成制造专精
    id = 'synthesis_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '合成制造专精';
    texts[id].skill_desc = '精通合成制造之道，完成某个配方时获得该配方上记载的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与烹饪相关的被动技能的文本
function init_cooking_passive_skill(texts) {
    let id;
    //烹饪专精
    id = 'cooking_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '烹饪专精';
    texts[id].skill_desc = '精通烹饪之道，完成烹饪时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与锻造相关的被动技能的文本
function init_forging_passive_skill(texts) {
    let id;
    //锻造专精
    id = 'forging_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '锻造专精';
    texts[id].skill_desc = '精通锻造之道，完成锻造时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与炼丹相关的被动技能的文本
function init_elixir_alchemy_passive_skill(texts) {
    let id;
    //炼丹专精
    id = 'elixir_alchemy_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '炼丹专精';
    texts[id].skill_desc = '精通炼丹之道，完成炼丹时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与药浴相关的被动技能的文本
function init_herbal_bath_passive_skill(texts) {
    let id;
    //药浴专精
    id = 'herbal_bath_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '药浴专精';
    texts[id].skill_desc = '精通药浴之道，完成药浴时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与雕刻相关的被动技能的文本
function init_engrave_passive_skill(texts) {
    let id;
    //雕刻专精
    id = 'engrave_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '雕刻专精';
    texts[id].skill_desc = '精通雕刻之道，完成雕刻时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}
//初始化与炼金术相关的被动技能的文本
function init_alchemy_passive_skill(texts) {
    let id;
    //炼金术专精
    id = 'alchemy_mastery';
    add_text_object(texts, id);
    texts[id].skill_name = '炼金术专精';
    texts[id].skill_desc = '精通炼金之道，完成炼金时提升该技能的经验（当前仅提供经验值，暂无其他效果）';
}

export { init_passive_skill };
