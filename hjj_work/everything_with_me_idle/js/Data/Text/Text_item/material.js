import { add_text_object } from '../Text_class.js';

function init_Text_material(texts) {
    //木头系列
    init_Text_ordinary_wood(texts); //凡木
    init_Text_spirit_wood(texts); //灵木
    //草系列
    init_Text_spirit_grass(texts); //灵草
    //蘑菇系列
    init_Text_ordinary_mushroom(texts); //普通蘑菇
    init_Text_rare_mushroom(texts); //稀有蘑菇
    //水产系列
    init_Text_aquatic(texts); //水产
    //毛皮系列
    init_Text_fur(texts); //毛皮
    init_Text_leather(texts); //皮革
    //骨头系列
    init_Text_bone(texts); //骨头
    //生肉系列
    init_Text_raw_meat(texts); //生肉
    //石头与矿石系列
    init_Text_rock(texts); //石头
    //加工零件系列
    init_Text_wood_parts(texts); //木制零件
    init_Text_iron_parts(texts); //铁制零件
    //精制调味料
    init_Text_refined_seasoning(texts);
    //丹药精华
    init_Text_elixir_essence(texts);
}
//凡木的文本
function init_Text_ordinary_wood(texts) {
    let id;

    id = 'Oak_logs';
    add_text_object(texts, id);
    texts[id].item_name = '橡树原木';
    texts[id].item_desc = '一块足够大的橡树原木，可以进行加工，有效率的伐木才能获得更多的原木，而不是木屑';
    id = 'Oak_woodchip';
    add_text_object(texts, id);
    texts[id].item_name = '橡树木屑';
    texts[id].item_desc = '一堆橡木的碎片，伐木时如果砍的太碎了，那就只能获得木屑了';
    id = 'Willow_logs';
    add_text_object(texts, id);
    texts[id].item_name = '柳树原木';
    texts[id].item_desc = '一块足够大的柳树原木';
    id = 'Willow_woodchip';
    add_text_object(texts, id);
    texts[id].item_name = '柳树木屑';
    texts[id].item_desc = '一堆柳木碎屑，它所在的木头应该遭受了难以想象的折磨，才会变得如此细碎';
    id = 'birch_logs';
    add_text_object(texts, id);
    texts[id].item_name = '桦树原木';
    texts[id].item_desc = '一块足够大的桦树原木';
    id = 'birch_woodchip';
    add_text_object(texts, id);
    texts[id].item_name = '桦树木屑';
    texts[id].item_desc = '一堆桦木碎屑，在开采加工桦树时容易获得';
    id = 'pine_logs';
    add_text_object(texts, id);
    texts[id].item_name = '松树原木';
    texts[id].item_desc = '一块足够大的松树原木';
    id = 'pine_woodchip';
    add_text_object(texts, id);
    texts[id].item_name = '松树木屑';
    texts[id].item_desc = '一堆松木碎屑，在开采加工松树时容易获得';
    id = 'fir_logs';
    add_text_object(texts, id);
    texts[id].item_name = '杉树原木';
    texts[id].item_desc = '一块足够大的杉树原木';
    id = 'fir_woodchip';
    add_text_object(texts, id);
    texts[id].item_name = '杉树木屑';
    texts[id].item_desc = '一堆杉木碎屑，在开采加工杉树时容易获得';

    id = 'decayed_wood';
    add_text_object(texts, id);
    texts[id].item_name = '朽木';
    texts[id].item_desc = '腐烂干枯的木头，难以加工，基本只能烧掉';
}
//灵木的文本
function init_Text_spirit_wood(texts) {
    let id;

    id = 'lightning_bark';
    add_text_object(texts, id);
    texts[id].item_name = '雷杉树皮';
    texts[id].item_desc = '布满银色闪电纹的厚树皮，还残留有些许雷光，雷击铁杉的稀有素材';
    id = 'lightning_branch';
    add_text_object(texts, id);
    texts[id].item_name = '雷击尖枝';
    texts[id].item_desc = '雷击铁杉最尖端的树枝，常年受到雷击还不损坏的珍贵素材';
    id = 'lightning_iron_logs';
    add_text_object(texts, id);
    texts[id].item_name = '雷击铁杉木';
    texts[id].item_desc = '雷击铁杉的原木，质地沉重，不适合制作要求轻便的武器装备';
    id = 'frost_marrow_resin';
    add_text_object(texts, id);
    texts[id].item_name = '寒髓松树脂';
    texts[id].item_desc = '带有寒气的特殊树脂，触感冰凉如雪，寒髓松的稀有素材';
    id = 'frost_marrow_ice';
    add_text_object(texts, id);
    texts[id].item_name = '寒髓松冰晶';
    texts[id].item_desc = '在松针尖端凝结的菱形冰晶，内部封存着微量的蓝色髓液，永不融化，寒髓松的珍贵素材';
}
//灵草的文本
function init_Text_spirit_grass(texts) {
    let id;

    id = 'viresilver_stem';
    add_text_object(texts, id);
    texts[id].item_name = '绿银草茎';
    texts[id].item_desc = '一截泛着金属冷光的奇特植物茎秆，表面布满翡翠色的脉络，新鲜时柔韧如藤条，风干后却坚硬如淬火钢';
    id = 'symbiotic_root';
    add_text_object(texts, id);
    texts[id].item_name = '竹蛇共生根';
    texts[id].item_desc = '竹根与蛇巢纠缠的稀有素材，酒蛇斑竹林的特产';
    id = 'violet_bamboo_blade';
    add_text_object(texts, id);
    texts[id].item_name = '紫斑竹刃';
    texts[id].item_desc = '硬化紫斑竹上出现的锋利薄片，极为少见';
}
//普通蘑菇的文本
function init_Text_ordinary_mushroom(texts) {
    let id;

    id = 'porcini';
    add_text_object(texts, id);
    texts[id].item_name = '牛肝菌';
    texts[id].item_desc = '有着肥厚褐黄菌盖，海绵状菌孔的可食用蘑菇。味鲜似牛肉，晒干后香气更浓。';
    id = 'craterellus';
    add_text_object(texts, id);
    texts[id].item_name = '喇叭菌';
    texts[id].item_desc = '有着漏斗形灰褐色菌体的可食用蘑菇，薄如羊皮纸，常见于潮湿的地点';
    id = 'coral_fungus';
    add_text_object(texts, id);
    texts[id].item_name = '珊瑚菌';
    texts[id].item_desc = '洁白分枝如海底珊瑚，脆嫩微甜。生食有毒，必须煮沸去毒，是炖汤珍品';
    id = 'chanterelle';
    add_text_object(texts, id);
    texts[id].item_name = '鸡油菌';
    texts[id].item_desc = '金黄花边漏斗菌，杏香浓郁。是林间的黄金美味。';
}
//稀有蘑菇的文本
function init_Text_rare_mushroom(texts) {
    let id;

    id = 'termite_mushroom';
    add_text_object(texts, id);
    texts[id].item_name = '鸡枞';
    texts[id].item_desc = '只在少数地点特定时间才能采集到的珍贵食用菌，菌盖呈优雅的伞形，色泽从象牙白到淡金不等，菌柄修长如象牙雕刻';
    id = 'ice_matsutake';
    add_text_object(texts, id);
    texts[id].item_name = '寒髓冰松茸';
    texts[id].item_desc = '寒冷松林才能发现的珍贵食用菌，常与寒髓松共生，有着冰属性的魔力，很难烹饪';
}
//水产的文本
function init_Text_aquatic(texts) {
    let id;

    id = 'river_mussel';
    add_text_object(texts, id);
    texts[id].item_name = '河蚌';
    texts[id].item_desc = '常出现在河流中的贝类，表面布满流水冲刷形成的同心纹路，肉很少';
    id = 'river_crab';
    add_text_object(texts, id);
    texts[id].item_name = '河蟹';
    texts[id].item_desc = '甲壳青黑的螃蟹，这种螃蟹似乎长不大，简单烹饪就可食用';
    id = 'creek_fish';
    add_text_object(texts, id);
    texts[id].item_name = '溪鱼';
    texts[id].item_desc = '常出现在河流中的小鱼，十分警觉，有一条被抓到会让鱼群全都躲起来';
    id = 'iron_bone_fish';
    add_text_object(texts, id);
    texts[id].item_name = '铁骨鱼';
    texts[id].item_desc = '据说栖息于富铁地区，据说骨骼坚硬如铁，十分危险，但看起来实在普通，也没有特别的骨头，不知为何被命名为铁骨鱼';
    id = 'bite_fish';
    add_text_object(texts, id);
    texts[id].item_name = '咬鱼';
    texts[id].item_desc = '咬合力惊人的凶猛肉食鱼，能外出觅食的个体通常为族群中的大鱼，很难捕获';
}
//毛皮的文本
function init_Text_fur(texts) {
    let id;

    id = 'broken_fur';
    add_text_object(texts, id);
    texts[id].item_name = '碎毛皮';
    texts[id].item_desc = '破碎的动物毛皮，无法制成完整的护甲或衣物，但可作为填充料、修补材料，或炼金术中的低级成分';
    id = 'ordinary_fur';
    add_text_object(texts, id);
    texts[id].item_name = '普通毛皮';
    texts[id].item_desc = '虽不珍贵，却是无数工匠手中的起点——从粗犷的皮甲到温暖的靴衬，平凡中藏着万种可能';
    id = 'high_quality_fur';
    add_text_object(texts, id);
    texts[id].item_name = '优质毛皮';
    texts[id].item_desc = '无裂痕或虫蛀痕迹，毛发密度均匀的毛皮，保留了足够的韧性，可以制作高级服饰';
}
//皮革的文本
function init_Text_leather(texts) {
    let id;

    id = 'stitching_leather';
    add_text_object(texts, id);
    texts[id].item_name = '缝合皮革';
    texts[id].item_desc = '一块由零碎皮料拼接而成的粗糙革材，厚薄不均，不结实，不耐用';
    id = 'ordinary_leather';
    add_text_object(texts, id);
    texts[id].item_name = '普通皮革';
    texts[id].item_desc = '表面经过鞣制的平整皮革，抗撕裂且易塑形，工匠的万能素材';
    id = 'hard_and_thick_leather';
    add_text_object(texts, id);
    texts[id].item_name = '硬厚皮革';
    texts[id].item_desc = '柔韧且坚硬的皮革，防御性能十分优秀，需要很好的原料才能做成这样的皮革';
}
//骨头的文本
function init_Text_bone(texts) {
    let id;

    id = 'animal_bone';
    add_text_object(texts, id);
    texts[id].item_name = '兽骨';
    texts[id].item_desc = '一块野兽骨骼，表面残留着干涸的血迹和筋肉碎屑，骨节粗大，质地坚硬';
}
//生肉的文本
function init_Text_raw_meat(texts) {
    let id;

    id = 'animal_raw_meat';
    add_text_object(texts, id);
    texts[id].item_name = '野兽生肉';
    texts[id].item_desc = '简单处理的兽肉，不可生食，有多种烹饪方式';
    id = 'animal_viscus';
    add_text_object(texts, id);
    texts[id].item_name = '野兽内脏';
    texts[id].item_desc = '无法分辨类型的一堆内脏器官，某些器官仍微微抽搐，仿佛残留着生命本能';
}
//石与矿石的文本
function init_Text_rock(texts) {
    let id;

    id = 'hard_rock';
    add_text_object(texts, id);
    texts[id].item_name = '坚硬岩石';
    texts[id].item_desc = '一块致密而顽固的岩石，难以轻易破碎，用处很广';
    id = 'lowFe_rock';
    add_text_object(texts, id);
    texts[id].item_name = '含铁岩石';
    texts[id].item_desc = '一块暗沉厚重的岩石，断面可见锈红色的细密纹路，偶尔闪过金属光泽';
    id = 'highFe_rock';
    add_text_object(texts, id);
    texts[id].item_name = '富铁矿石';
    texts[id].item_desc = '高纯度含铁矿石，断裂面呈银灰色，重量比普通岩石更大，';
}
//木制零件的文本
function init_Text_wood_parts(texts) {
    let id;

    id = 'normal_board';
    add_text_object(texts, id);
    texts[id].item_name = '普通木板';
    texts[id].item_desc = '去除了原木上的树皮、裂纹之后的完整木板，理论上任何木头都能做成普通木板，感觉伐木技巧好一些甚至能直接从树里砍出木板，加工指南还说要保留原木的纹理，哪有那么麻烦';
    id = 'Oak_board';
    add_text_object(texts, id);
    texts[id].item_name = '橡木板';
    texts[id].item_desc = '用橡木制成的完整木板，保留了橡木的纹理，用它制作的物品应该更耐用';
    id = 'Willow_board';
    add_text_object(texts, id);
    texts[id].item_name = '柳木板';
    texts[id].item_desc = '用柳木制成的完整木板，保留了柳木的纹理，要是拿它去做一些形状不合适的物品岂不是浪费了纹路？所以用处比普通木板少';
}
//铁质零件的文本
function init_Text_iron_parts(texts) {
    let id;

    id = 'iron_waste';
    add_text_object(texts, id);
    texts[id].item_name = '铁质废品';
    texts[id].item_desc = '一堆扭曲变形的金属残骸，应该还能找到些许有用的部件';
    id = 'iron_ingot';
    add_text_object(texts, id);
    texts[id].item_name = '铁锭';
    texts[id].item_desc = '铁质标准金属锭，延展性与硬度平衡，适合绝大多数铁器制作';
}
//精制调味料的文本
function init_Text_refined_seasoning(texts) {
    let id;

    id = 'fish_meat_floss';
    add_text_object(texts, id);
    texts[id].item_name = '鱼肉松';
    texts[id].item_desc = '使用鱼为原料制成的调味品，可以在其他菜品烹饪时加入';

    id = 'animal_meat_floss';
    add_text_object(texts, id);
    texts[id].item_name = '兽肉松';
    texts[id].item_desc = '使用兽肉为原料制成的调味品，可以在其他菜品烹饪时加入';

    id = 'berry_jam';
    add_text_object(texts, id);
    texts[id].item_name = '浆果果酱';
    texts[id].item_desc = '使用浆果为原料制成的调味品，可以在其他菜品烹饪时加入';
}
//丹药精华的文本
function init_Text_elixir_essence(texts) {
    let id;

    // id = 'AAAA';
    // add_text_object(texts, id);
    // texts[id].item_name = '物品名称';
    // texts[id].item_desc = '物品描述';
}

export { init_Text_material };
