import { add_text_object } from '../Text_class.js';
//所有普通地点的文本
function normal_place_text(texts) {
    //位于测试区域的普通地点
    test_normal_place(texts);
    //位于村庄区域的普通地点
    village_normal_place(texts);
    //位于村外后山区域的普通地点
    village_backhill_normal_place(texts);
    //位于村外后山洞穴区域的普通地点
    backhill_cave_normal_place(texts);
}
//位于测试区域的普通地点
function test_normal_place(texts) {
    let id = 'test_normal1';
    add_text_object(texts, id);
    texts[id].place_name = '普通地点1';
    texts[id].place_desc = '这里是普通地点1，这里不会进行战斗，可以通往其他地方';
}
//位于村庄区域的普通地点
function village_normal_place(texts) {
    let id = 'village_home';
    add_text_object(texts, id);
    texts[id].place_name = '村中住所';
    texts[id].place_desc = '你在村中的居所，大部分物件都被变卖或抢走，目前只留空房';
    id = 'village_square';
    add_text_object(texts, id);
    texts[id].place_name = '村庄大广场';
    texts[id].place_desc = '可以通往村中绝大部分区域的广场';
    id = 'village_market';
    add_text_object(texts, id);
    texts[id].place_name = '村庄集市';
    texts[id].place_desc = '可以在这找到很多店铺';
    id = 'village_barracks';
    add_text_object(texts, id);
    texts[id].place_name = '村庄兵营';
    texts[id].place_desc = '村里训练战士的场所';
    id = 'village_hospital';
    add_text_object(texts, id);
    texts[id].place_name = '村庄诊所';
    texts[id].place_desc = '可以在此治病，可以买到药物，真希望少来这里';
}
//位于村外后山区域的普通地点
function village_backhill_normal_place(texts) {
    let id = 'VBH_rest_location';
    add_text_object(texts, id);
    texts[id].place_name = '村外歇脚处';
    texts[id].place_desc = '村外一处可以歇脚的亭子';
    id = 'logged_forest';
    add_text_object(texts, id);
    texts[id].place_name = '已开荒的林区';
    texts[id].place_desc = '靠近村庄的树林，经常有人来采集资源，已经踩出了道路，没有危险的地方';
    id = 'LF_grass';
    add_text_object(texts, id);
    texts[id].place_name = '草地';
    texts[id].place_desc = '已开荒区域的草地，在这里探索可以找到有用的资源';
    id = 'LF_woodland';
    add_text_object(texts, id);
    texts[id].place_name = '林地';
    texts[id].place_desc = '已开荒区域的林地，在这里伐木可以有效的得到木材';
    id = 'LF_creek';
    add_text_object(texts, id);
    texts[id].place_name = '小溪';
    texts[id].place_desc = '已开荒区域的小溪，水中看到了活物，可以在这里钓鱼';
    id = 'cemetery';
    add_text_object(texts, id);
    texts[id].place_name = '墓地';
    texts[id].place_desc = '村庄的公墓，有个衣冠冢是你父母的，此外没有什么特别的了';
    id = 'forest_edge';
    add_text_object(texts, id);
    texts[id].place_name = '森林外围';
    texts[id].place_desc = '村后的森林的外围，有人会进山劳作寻找不常见的资源，这块地方只有一些小动物聚集';
    id = 'FE_woodland';
    add_text_object(texts, id);
    texts[id].place_name = '森林外围-林地';
    texts[id].place_desc = '森林外围的林地，这里有较高的树木，在这里伐木可以有效的得到木材';
    id = 'FE_pond';
    add_text_object(texts, id);
    texts[id].place_name = '森林外围-池塘';
    texts[id].place_desc = '森林外围的池塘，水比较深，看不到底，可以在这里钓鱼';
    id = 'forest_core';
    add_text_object(texts, id);
    texts[id].place_name = '内层森林';
    texts[id].place_desc = '村后的森林的内层，平常少有人来到这里，有危险的野生怪物';
    id = 'FC_scree';
    add_text_object(texts, id);
    texts[id].place_name = '碎石坡';
    texts[id].place_desc = '山坡上一片满是碎石的地方，在这里挖矿可以有效的得到石材';
    id = 'FC_Peakarea';
    add_text_object(texts, id);
    texts[id].place_name = '山顶区域';
    texts[id].place_desc = '村外后山的山顶区域，没有植被和动物，十分荒凉';
}
//位于后山洞穴区域的普通地点
function backhill_cave_normal_place(texts) {
    let id = 'cave_inlet';
    add_text_object(texts, id);
    texts[id].place_name = '洞穴入口';
    texts[id].place_desc = '村庄后山洞穴的入口，洞穴里可见度很低，如果有野兽可不好打';
    id = 'karst_cave';
    add_text_object(texts, id);
    texts[id].place_name = '溶洞';
    texts[id].place_desc = '一个开阔、安静、通风的巨大地下溶洞，是一个相对安全的场所';
    id = 'alp_cave_inlet';
    add_text_object(texts, id);
    texts[id].place_name = '高山洞穴入口';
    texts[id].place_desc = '村庄后山洞穴的高山处入口，这里环境更恶劣，洞穴里一定更危险';
}

//位于原始森林区域的普通地点
function virgin_forest_normal_place(texts) {
    let id = 'hunting_lodge';
    add_text_object(texts, id);
    texts[id].place_name = '森林深处猎人小屋';
    texts[id].place_desc = '位于森林深处的隐秘小屋，可以在此歇息';
    id = 'campsite_clearing';
    add_text_object(texts, id);
    texts[id].place_name = '可露营空地';
    texts[id].place_desc = '森林深处也不是全都充满危险，至少这里看起来稍微安静些，适合歇息';
}

export { normal_place_text };
