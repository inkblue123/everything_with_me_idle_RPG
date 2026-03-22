import { add_text_object } from '../Text_class.js';
//区域的文本
//所有的区域的文本后会附带“区域”二字，所以区域的名称就不能带有这两个字了
function area_text(texts) {
    let id = 'village';
    add_text_object(texts, id);
    texts[id].area_name = '村庄';
    id = 'village_backhill';
    add_text_object(texts, id);
    texts[id].area_name = '村外后山';
    id = 'backhill_cave';
    add_text_object(texts, id);
    texts[id].area_name = '村外后山洞穴';
}

export { area_text };
