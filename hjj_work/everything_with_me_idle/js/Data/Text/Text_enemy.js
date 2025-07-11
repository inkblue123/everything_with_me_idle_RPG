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
//初始化文本数据库中与敌人相关的文本
function init_Text_enemy(texts) {
    //普通敌人的文本
    normal_enemy(texts);
}

export { init_Text_enemy };
