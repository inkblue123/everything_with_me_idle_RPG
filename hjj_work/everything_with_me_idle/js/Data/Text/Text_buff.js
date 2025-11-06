import { add_text_object } from './Text_class.js';

//buff相关的文本
function normal_buff(texts) {
    let id;

    id = 'sleep_1';
    add_text_object(texts, id);
    texts[id].buff_name = '睡眠';
    texts[id].buff_desc = '进入休息状态，获得生命恢复效果';

    id = 'get_up_buff';
    add_text_object(texts, id);
    texts[id].buff_name = '起床';
    texts[id].buff_desc = '该起床了';

    id = 'serious_injury';
    add_text_object(texts, id);
    texts[id].buff_name = '重伤';
    texts[id].buff_desc =
        '严重的失血让你虚弱，但是濒临死亡的状态让你的身体爆发出一些本能<br>攻击力降低30%，攻速加成降低30%，闪避和精准降低50%，抵抗力降低50%，自然恢复生命的效果无效<br>暴击率增加30%，暴击伤害增加50%，移动速度增加20%';

    id = 'fatigue';
    add_text_object(texts, id);
    texts[id].buff_name = '疲劳';
    texts[id].buff_desc = '当前表层精力少于50%，非战斗属性降低20%';
    id = 'extreme_fatigue';
    add_text_object(texts, id);
    texts[id].buff_name = '极度疲劳';
    texts[id].buff_desc = '当前表层精力少于25%，全属性降低50%';
    id = 'energetic';
    add_text_object(texts, id);
    texts[id].buff_name = '精力充沛';
    texts[id].buff_desc = '当前表层精力大于100%，全属性增加20%';

    id = 'night';
    add_text_object(texts, id);
    texts[id].buff_name = '夜晚';
    texts[id].buff_desc = '精准和闪避降低50%';
    id = 'humid_and_hot_air';
    add_text_object(texts, id);
    texts[id].buff_name = '湿热空气';
    texts[id].buff_desc = '使用表层精力时额外增加20%，深层精力消耗比例降低5点';
    id = 'dim_environment';
    add_text_object(texts, id);
    texts[id].buff_name = '昏暗环境';
    texts[id].buff_desc = '精准和闪避降低50%';
}
//初始化文本数据库中与buff相关的文本
function init_Text_buff(texts) {
    //普通buff的文本
    normal_buff(texts);
}

export { init_Text_buff };
