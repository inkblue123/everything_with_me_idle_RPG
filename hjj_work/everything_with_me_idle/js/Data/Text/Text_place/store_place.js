import { add_text_object } from '../Text_class.js';

//商店地点的文本
function store_place_text(texts) {
    //村庄区域的npc文本
    village_store_place_text(texts);
    //村外后山区域的npc文本
    village_backhill_store_place_text(texts);
}
//村庄区域的npc文本
function village_store_place_text(texts) {
    let id;

    id = 'VH_pharmacy';
    add_text_object(texts, id);
    texts[id].place_name = '药房';
    texts[id].place_desc = '售药窗口：村庄药品不容浪费，每人每天限额购买，你需要什么';

    id = 'VM_woodshop_showcase';
    add_text_object(texts, id);
    texts[id].place_name = '木工坊商店橱窗';
    texts[id].place_desc = ''; //这个文本目前用不到
}
//村外后山区域的npc文本
function village_backhill_store_place_text(texts) {
    let id;

    // id = 'village_old_woman';
    // add_text_object(texts, id);
    // texts[id].place_name = '村口老妇';
    // texts[id].place_desc = '时常出现在村外歇脚处的老妇人，据她所说亲人都死于兽潮，目前一个人生活'; //这个文本目前用不到
    // //默认见面语句
    // texts[id].default_meet_chat = '年轻人，在外面要小心啊';
    // //条件见面语句
}

export { store_place_text };
