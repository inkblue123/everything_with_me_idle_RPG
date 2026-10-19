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

    id = 'burn';
    add_text_object(texts, id);
    texts[id].buff_name = '燃烧';
    texts[id].buff_desc = '每秒每层受到1点火焰伤害<br>每多一层，持续时间乘0.75<br>战斗外不再造成伤害，并快速消散';
}
//菜品buff的文本
//id 与菜品物品 id 相同，所以这里是在物品文本对象上补 buff_name / buff_desc 两个字段
function dish_buff(texts) {
    let id;

    id = 'grilled_fish';
    //菜品buff与菜品物品同 id：物品文本可能已经建过这个对象，已存在时直接补字段即可，不重复创建
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '烤鱼串';
    texts[id].buff_desc = '食用烤鱼串后的饱腹效果<br>每秒恢复1点生命，持续30秒';

    id = 'cooked_mussel';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '熟蚌肉';
    texts[id].buff_desc = '食用熟蚌肉后的饱腹效果<br>每秒恢复0.5点生命，持续20秒';

    id = 'roasted_crab';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '烤螃蟹';
    texts[id].buff_desc = '食用烤螃蟹后的饱腹效果<br>每秒恢复0.5点生命，持续30秒';

    id = 'grilled_mushrooms';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '烤蘑菇';
    texts[id].buff_desc = '食用烤蘑菇后的饱腹效果<br>每秒恢复1点生命，持续20秒';

    id = 'cooked_animal_meat';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '熟兽肉';
    texts[id].buff_desc = '食用熟兽肉后的饱腹效果<br>每秒恢复1点生命，持续30秒';

    id = 'big_grilled_fish';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '大烤鱼串';
    texts[id].buff_desc = '食用大烤鱼串后的饱腹效果<br>每秒恢复1点生命，持续40秒';

    id = 'termite_mushroom_soup';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '鸡枞汤';
    texts[id].buff_desc = '喝下鸡枞汤后的饱腹效果<br>每秒恢复1点生命，持续60秒';

    id = 'seasoning_effect';
    if (texts[id] === undefined) {
        add_text_object(texts, id);
    }
    texts[id].buff_name = '调料效果';
    texts[id].buff_desc = '食用调味菜品后获得的持续效果<br>持续时间与每秒数值由所用的调料决定';
}
//初始化文本数据库中与buff相关的文本
function init_Text_buff(texts) {
    //普通buff的文本
    normal_buff(texts);
    //菜品buff的文本
    dish_buff(texts);
}

export { init_Text_buff };
