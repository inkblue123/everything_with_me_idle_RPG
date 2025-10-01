import { add_text_object } from '../Text_class.js';
import { normal_place_text } from './normal_place.js';
import { area_text } from './area_place.js';
import { combat_place_text } from './combat_place.js';
import { NPC_place_text } from './NPC_place.js';
import { store_place_text } from './store_place.js';

//其他地点的文本
function other_place_text(texts) {
    let id = 'village_home_bed';
    add_text_object(texts, id);
    texts[id].place_name = '卧室床上';
    texts[id].place_desc = '安心休息，养精蓄锐';
}

//初始化文本数据库中与地点相关的文本
function init_Text_place(texts) {
    //普通地点的文本
    normal_place_text(texts);
    //战斗地点的文本
    combat_place_text(texts);
    //NPC地点的文本
    NPC_place_text(texts);
    //商店的文本
    store_place_text(texts);
    //其他地点的文本
    other_place_text(texts);
    //区域的文本
    area_text(texts);
}

export { init_Text_place };
