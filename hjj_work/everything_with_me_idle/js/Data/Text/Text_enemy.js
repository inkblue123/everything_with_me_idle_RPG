import { add_text_object } from './Text_class.js';

//敌人相关的文本
function normal_enemy(texts) {
    let id = 'Training_Dummy';
    add_text_object(texts, id);
    texts[id].enemy_name = '训练假人';
    id = 'Attack_Dummy';
    add_text_object(texts, id);
    texts[id].enemy_name = '攻击假人';
    id = 'small_snake';
    add_text_object(texts, id);
    texts[id].enemy_name = '小蛇';
    id = 'small_slime';
    add_text_object(texts, id);
    texts[id].enemy_name = '小史莱姆';
    id = 'giant_teeth_rat';
    add_text_object(texts, id);
    texts[id].enemy_name = '巨齿鼠';
    id = 'rotten_wood_monster';
    add_text_object(texts, id);
    texts[id].enemy_name = '朽木精怪';
    id = 'mosquitoes';
    add_text_object(texts, id);
    texts[id].enemy_name = '蚊群';
    id = 'wild_boar';
    add_text_object(texts, id);
    texts[id].enemy_name = '野猪';
    id = 'blocking_shrubs';
    add_text_object(texts, id);
    texts[id].enemy_name = '拦路灌木';
    id = 'spider';
    add_text_object(texts, id);
    texts[id].enemy_name = '结网蜘蛛';
    id = 'wolf';
    add_text_object(texts, id);
    texts[id].enemy_name = '豺狼';
    id = 'decayed_skeleton';
    add_text_object(texts, id);
    texts[id].enemy_name = '腐朽骷髅';
    id = 'wood_monster';
    add_text_object(texts, id);
    texts[id].enemy_name = '树精';
}
function tree_enemy(texts) {
    let id = 'bushes';
    add_text_object(texts, id);
    texts[id].enemy_name = '灌木丛';
    id = 'oak_tree';
    add_text_object(texts, id);
    texts[id].enemy_name = '橡树';
    id = 'Willow_tree';
    add_text_object(texts, id);
    texts[id].enemy_name = '柳树';
    id = 'ash_skin_birch';
    add_text_object(texts, id);
    texts[id].enemy_name = '灰肤桦';
    id = 'pine';
    add_text_object(texts, id);
    texts[id].enemy_name = '松树';
    id = 'lightning_iron_fir';
    add_text_object(texts, id);
    texts[id].enemy_name = '雷击铁杉';
    id = 'frost_marrow_pine';
    add_text_object(texts, id);
    texts[id].enemy_name = '寒髓松';
    id = 'serpent_marked_bamboo';
    add_text_object(texts, id);
    texts[id].enemy_name = '蛇纹竹';
    id = 'violet_bamboo';
    add_text_object(texts, id);
    texts[id].enemy_name = '紫斑竹';
}
//初始化文本数据库中与敌人相关的文本
function init_Text_enemy(texts) {
    //普通敌人的文本
    normal_enemy(texts);
    //普通敌人的文本
    tree_enemy(texts);
}

export { init_Text_enemy };
