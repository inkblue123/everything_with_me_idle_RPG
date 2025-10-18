import { add_Material_object } from './Item_class.js';

//初始化物品数据库中与材料相关的文本
function init_Item_Material(items) {
    //测试物品
    // init_test_item(items)
    //木头系列
    init_ordinary_wood(items); //凡木
    init_spirit_wood(items); //灵木
    //草系列
    init_spirit_grass(items); //灵草
    //蘑菇系列
    init_ordinary_mushroom(items); //普通蘑菇
    init_rare_mushroom(items); //稀有蘑菇
    //水产系列
    init_aquatic(items); //水产
    //毛皮系列
    init_fur(items); //毛皮
    init_leather(items); //皮革
    //骨头系列
    init_bone(items); //骨头
    //生肉系列
    init_raw_meat(items); //生肉
    //石头与矿石系列
    init_rock(items); //石头
    //加工零件系列
    init_wood_parts(items); //木制零件
    init_iron_parts(items); //铁制零件
    //精制调味料
    init_refined_seasoning(items);
    //丹药精华
    init_elixir_essence(items);
}
//测试物品
// function init_test_item(items) {
//     let id;
//     let secon_type = 'test'; //材料大类中的灵草小类

//     id = 'test_item'; //测试物品
//     add_Material_object(items, id);
//     items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
// }

//凡木
function init_ordinary_wood(items) {
    let id;
    let secon_type = 'ordinary_wood'; //材料大类中的凡木小类

    id = 'Oak_logs'; //橡树原木
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 5); //物品价值
    id = 'Oak_woodchip'; //橡树木屑
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值

    id = 'Willow_logs'; //柳树原木
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 6); //物品价值
    id = 'Willow_woodchip'; //柳树木屑
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'birch_logs'; //桦树原木
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 9); //物品价值
    id = 'birch_woodchip'; //桦树木屑
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'pine_logs'; //松树原木
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 15); //物品价值
    id = 'pine_woodchip'; //松树木屑
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 2); //物品价值
    id = 'fir_logs'; //杉树原木
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 25); //物品价值
    id = 'fir_woodchip'; //杉树木屑
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 3); //物品价值

    id = 'decayed_wood'; //朽木
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 2); //物品价值
}
//灵木
function init_spirit_wood(items) {
    let id;
    let secon_type = 'spirit_wood'; //材料大类中的灵木小类

    id = 'lightning_bark'; //雷杉树皮
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 173); //物品价值

    id = 'lightning_branch'; //雷击尖枝
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 218); //物品价值

    id = 'lightning_iron_logs'; //雷击铁杉木
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 112); //物品价值

    id = 'frost_marrow_resin'; //寒髓松树脂
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 200); //物品价值

    id = 'frost_marrow_ice'; //寒髓松冰晶
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 110); //物品价值
}
//灵草
function init_spirit_grass(items) {
    let id;
    let secon_type = 'spirit_grass'; //材料大类中的灵草小类

    id = 'viresilver_stem'; //绿银草茎
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 69); //物品价值

    id = 'symbiotic_root'; //竹蛇共生根
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 341); //物品价值

    id = 'violet_bamboo_blade'; //紫斑竹刃
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 715); //物品价值
}
//普通蘑菇
function init_ordinary_mushroom(items) {
    let id;
    let secon_type = 'ordinary_mushroom'; //材料大类中的普通蘑菇小类

    id = 'porcini'; //牛肝菌
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 16); //物品价值

    id = 'craterellus'; //喇叭菌
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 19); //物品价值

    id = 'coral_fungus'; //珊瑚菌
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 21); //物品价值

    id = 'chanterelle'; //鸡油菌
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 17); //物品价值
}
//稀有蘑菇
function init_rare_mushroom(items) {
    let id;
    let secon_type = 'rare_mushroom'; //材料大类中的稀有蘑菇小类

    id = 'termite_mushroom'; //鸡枞
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 120); //物品价值
    id = 'ice_matsutake'; //冰松茸
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 313); //物品价值
}
//水产
function init_aquatic(items) {
    let id;
    let secon_type = 'aquatic'; //材料大类中的水产小类

    id = 'river_mussel'; //河蚌
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 2); //物品价值
    id = 'river_crab'; //河蟹
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 4); //物品价值
    id = 'creek_fish'; //溪鱼
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 6); //物品价值
    id = 'iron_bone_fish'; //铁骨鱼
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 8); //物品价值
    id = 'bite_fish'; //咬鱼
    add_Material_object(items, id);
    items[id].init_Item_other(300, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 13); //物品价值
}
//毛皮
function init_fur(items) {
    let id;
    let secon_type = 'fur'; //材料大类中的毛皮小类

    id = 'broken_fur'; //碎毛皮
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 1); //物品价值
    id = 'ordinary_fur'; //普通毛皮
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 9); //物品价值
    id = 'high_quality_fur'; //优质毛皮
    add_Material_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 30); //物品价值
}
//皮革
function init_leather(items) {
    let id;
    let secon_type = 'leather'; //材料大类中的骨头小类

    id = 'stitching_leather'; //缝合皮革
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 5); //物品价值
    id = 'ordinary_leather'; //普通皮革
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 15); //物品价值
    id = 'hard_and_thick_leather'; //硬厚皮革
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 40); //物品价值
}
//骨头
function init_bone(items) {
    let id;
    let secon_type = 'bone'; //材料大类中的骨头小类

    id = 'animal_bone'; //兽骨
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 3); //物品价值
}
//生肉
function init_raw_meat(items) {
    let id;
    let secon_type = 'raw_meat'; //材料大类中的生肉小类

    id = 'animal_raw_meat'; //野兽生肉
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 7); //物品价值
    id = 'animal_viscus'; //野兽内脏
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 2); //物品价值
}
//石与矿石
function init_rock(items) {
    let id;
    let secon_type = 'rock'; //材料大类中的岩石小类

    id = 'hard_rock'; //坚硬岩石
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 4); //物品价值
    id = 'lowFe_rock'; //含铁岩石
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 8); //物品价值
    id = 'highFe_rock'; //富铁矿石
    add_Material_object(items, id);
    items[id].init_Item_other(50, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 16); //物品价值
}

//木制零件
function init_wood_parts(items) {
    let id;
    let secon_type = 'wood_parts'; //材料大类中的木制零件小类

    id = 'normal_board'; //普通木板
    add_Material_object(items, id);
    items[id].init_Item_other(3, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 5); //物品价值
    id = 'Oak_board'; //橡木板
    add_Material_object(items, id);
    items[id].init_Item_other(3, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 12); //物品价值
    id = 'Willow_board'; //柳木板
    add_Material_object(items, id);
    items[id].init_Item_other(3, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 14); //物品价值
}
//铁质零件
function init_iron_parts(items) {
    let id;
    let secon_type = 'iron_parts'; //材料大类中的铁质零件小类

    id = 'iron_waste'; //铁质废品
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 5); //物品价值

    id = 'iron_ingot'; //铁锭
    add_Material_object(items, id);
    items[id].init_Item_other(30, secon_type); //堆叠数量，物品小类
    items[id].init_Item_price('ordinary_coin', 20); //物品价值
}
//精制调味料
function init_refined_seasoning(items) {
    let id;
    let secon_type = 'refined_seasoning'; //材料大类中的精制调味料小类

    id = 'fish_meat_floss'; //鱼肉松
    add_Material_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 20); //物品价值
    id = 'animal_meat_floss'; //兽肉松
    add_Material_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 35); //物品价值
    id = 'berry_jam'; //浆果果酱
    add_Material_object(items, id);
    items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
    items[id].init_Item_price('ordinary_coin', 25); //物品价值
}
//丹药精华
function init_elixir_essence(items) {
    let id;
    let secon_type = 'elixir_essence'; //材料大类中的丹药精华小类

    // id = 'AAAA'; //
    // add_Material_object(items, id);
    // items[id].init_Item_other(20, secon_type); //堆叠数量，物品大分类
}

export { init_Item_Material };
