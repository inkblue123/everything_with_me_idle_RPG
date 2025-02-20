import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与类型相关的内容

function init_Enum_type(enums) {
    //每种装备稀有度对应的颜色
    let id = 'damaged'; //破损
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#838383'; //灰色
    enums[id].rarity_rgb_color = 'rgba(131,131,131)';
    id = 'ordinary'; //普通
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#000000'; //黑色
    id = 'excellent'; //优良
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#00c400'; //淡绿色
    id = 'rare'; //稀有
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#1100ff'; //蓝色
    id = 'epic'; //史诗
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#7c00ff'; //紫色
    id = 'legendary'; //传说
    add_Enum_Object(enums, id);
    enums[id].rarity_color = '#ff0000'; //红色
    //每种主动技能在战斗规划界面的展示颜色
    id = 'attack'; //攻击型
    add_Enum_Object(enums, id);
    enums[id].active_show_color = '#ff0000'; //红色
    id = 'defense'; //防御型
    add_Enum_Object(enums, id);
    enums[id].active_show_color = '#ff9800'; //橙色
    id = 'recovery'; //恢复型
    add_Enum_Object(enums, id);
    enums[id].active_show_color = '#00ff00'; //绿色
    id = 'auxiliary'; //辅助型
    add_Enum_Object(enums, id);
    enums[id].active_show_color = '#673ab7'; //紫色
}

export { init_Enum_type };
