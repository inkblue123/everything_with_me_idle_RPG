import { add_text_object } from '../Text_class.js';

function init_Text_equipment(texts) {
    let id = 'wood_sword';
    add_text_object(texts, id);
    texts[id].item_name = '木剑';
    texts[id].item_desc = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
    id = 'test_sword';
    add_text_object(texts, id);
    texts[id].item_name = '测试武器-剑';
    texts[id].item_desc = '测试用的属性很高的剑';

    id = 'wood_battle_axe';
    add_text_object(texts, id);
    texts[id].item_name = '木制战斧';
    texts[id].item_desc = '使用木头制作的战斧，削出了一个很钝的棱角充当斧刃，看来只能打架，不能用来砍树了';
    id = 'wood_sticks';
    add_text_object(texts, id);
    texts[id].item_name = '木棒';
    texts[id].item_desc =
        '使用木头制作的棍棒，感觉把树木砍伐做出木板再做成树枝的形状并叫做“木棒”的这个过程很蠢，不如直接捡真木棒';
    id = 'wood_hammers';
    add_text_object(texts, id);
    texts[id].item_name = '巨大木棒';
    texts[id].item_desc = '使用木头制作的大锤，使用起来和直接挥舞原木战斗没什么区别';

    id = 'wood_bow(n)';
    add_text_object(texts, id);
    texts[id].item_name = '木弓（无弦）';
    texts[id].item_desc = '使用木头制作的弓，还没有上弦，至少足够拿在手里了';
    id = 'wood_bow';
    add_text_object(texts, id);
    texts[id].item_name = '木弓';
    texts[id].item_desc = '使用木头制作的弓，想要正常使用它，需要有弹药，你会在有弹药的情况下正常使用的对吧';
}
export { init_Text_equipment };
