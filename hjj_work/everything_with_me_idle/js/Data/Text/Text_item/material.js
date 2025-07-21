import { add_text_object } from '../Text_class.js';

function init_Text_material(texts) {
    //自然材料的文本
    init_Text_raw_MTR(texts);
    //人工材料的文本
    init_Text_process_MTR(texts);
}
//自然材料的文本
function init_Text_raw_MTR(texts) {
    let id = 'Oak_logs';
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

    id = 'viresilver_stem';
    add_text_object(texts, id);
    texts[id].item_name = '绿银草茎';
    texts[id].item_desc =
        '一截泛着金属冷光的奇特植物茎秆，表面布满翡翠色的脉络，新鲜时柔韧如藤条，风干后却坚硬如淬火钢';
    id = 'termite_mushroom';
    add_text_object(texts, id);
    texts[id].item_name = '鸡枞';
    texts[id].item_desc =
        '只在少数地点特定时间才能采集到的珍贵食用菌，菌盖呈优雅的伞形，色泽从象牙白到淡金不等，菌柄修长如象牙雕刻';

    id = 'Mussel';
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

    id = 'animal_bone';
    add_text_object(texts, id);
    texts[id].item_name = '兽骨';
    texts[id].item_desc = '一块野兽骨骼，表面残留着干涸的血迹和筋肉碎屑，骨节粗大，质地坚硬';
    id = 'animal_raw_meat';
    add_text_object(texts, id);
    texts[id].item_name = '野兽生肉';
    texts[id].item_desc = '简单处理的兽肉，不可生食，有多种烹饪方式';
    id = 'animal_viscus';
    add_text_object(texts, id);
    texts[id].item_name = '野兽内脏';
    texts[id].item_desc = '无法分辨类型的一堆内脏器官，某些器官仍微微抽搐，仿佛残留着生命本能';

    id = 'hard_rock';
    add_text_object(texts, id);
    texts[id].item_name = '坚硬岩石';
    texts[id].item_desc = '一块致密而顽固的岩石，难以轻易破碎，用处很广';
    id = 'lowFe_rock';
    add_text_object(texts, id);
    texts[id].item_name = '含铁岩石';
    texts[id].item_desc = '一块暗沉厚重的岩石，断面可见锈红色的细密纹路，偶尔闪过金属光泽';
    id = '​​highFe_rock';
    add_text_object(texts, id);
    texts[id].item_name = '富铁矿石';
    texts[id].item_desc = '高纯度含铁矿石，断裂面呈银灰色，重量比普通岩石更大，';
}
//人工材料的文本
function init_Text_process_MTR(texts) {
    let id = 'normal_board';
    add_text_object(texts, id);
    texts[id].item_name = '普通木板';
    texts[id].item_desc =
        '去除了原木上的树皮、裂纹之后的完整木板，理论上任何木头都能做成普通木板，感觉伐木技巧好一些甚至能直接从树里砍出木板，加工指南还说要保留原木的纹理，哪有那么麻烦';
    id = 'Oak_board';
    add_text_object(texts, id);
    texts[id].item_name = '橡木板';
    texts[id].item_desc = '用橡木制成的完整木板，保留了橡木的纹理，用它制作的物品应该更耐用';
    id = 'Willow_board';
    add_text_object(texts, id);
    texts[id].item_name = '柳木板';
    texts[id].item_desc =
        '用柳木制成的完整木板，保留了柳木的纹理，要是拿它去做一些形状不合适的物品岂不是浪费了纹路？所以用处比普通木板少';

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

    id = 'iron_waste';
    add_text_object(texts, id);
    texts[id].item_name = '铁质废品';
    texts[id].item_desc = '一堆扭曲变形的金属残骸，应该还能找到些许有用的部件';
    id = 'iron_ingot';
    add_text_object(texts, id);
    texts[id].item_name = '铁锭';
    texts[id].item_desc = '铁质标准金属锭，延展性与硬度平衡，适合绝大多数铁器制作';

    id = 'copper_coin';
    add_text_object(texts, id);
    texts[id].item_name = '铜币';
    texts[id].item_desc = '王国内流通的货币，100铜币相当于1银币';
    id = 'sliver_coin';
    add_text_object(texts, id);
    texts[id].item_name = '银币';
    texts[id].item_desc = '王国内流通的货币，1银币相当于100铜币，100银币相当于1金币';
    id = 'gold_coin';
    add_text_object(texts, id);
    texts[id].item_name = '金币';
    texts[id].item_desc = '王国内流通的货币，1金币相当于100银币';
}

export { init_Text_material };
