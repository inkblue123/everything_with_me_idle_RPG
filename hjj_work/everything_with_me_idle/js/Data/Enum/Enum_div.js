import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与游戏界面布局相关的内容

//每种装备稀有度对应的颜色
function init_rarity_color(enums) {
    let id = 'damaged'; //破损
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#838383'; //灰色
    enums[id].rarity_rgb_color = 'rgba(131,131,131)';
    id = 'ordinary'; //普通
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#000000'; //黑色
    id = 'excellent'; //优良
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#00c400'; //淡绿色
    id = 'rare'; //稀有
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#1100ff'; //蓝色
    id = 'epic'; //史诗
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#7c00ff'; //紫色
    id = 'legendary'; //传说
    // add_Enum_Object(enums, id);
    enums[id].rarity_color = '#ff0000'; //红色
}
//玩家主动技能放在战斗规划界面中，根据主动技能类型呈现不同的颜色
function init_active_skill_show_color(enums) {
    let id;
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

//游戏布局中涉及到的颜色
function init_div_color(enums) {
    let id;
    id = 'border_color'; //默认边框颜色
    add_Enum_Object(enums, id);
    enums[id] = '#797691'; //灰色
    id = 'while_backgroud_color'; //白色背景的具体颜色
    add_Enum_Object(enums, id);
    enums[id] = '#ffffff'; //白色

    id = 'show_can_color'; //表达“可以”含义的颜色
    add_Enum_Object(enums, id);
    enums[id] = '#ccffcc'; //淡绿色
    id = 'show_nocan_color'; //表达“不可以”含义的颜色
    add_Enum_Object(enums, id);
    enums[id] = '#ffcccc'; //淡红色

    id = 'show_study_color'; //表达“研究中”含义的颜色
    add_Enum_Object(enums, id);
    enums[id] = '#797691'; //灰色

    id = 'button_color'; //按钮元素的默认颜色
    add_Enum_Object(enums, id);
    enums[id] = '#efefef'; //淡灰色
}

function init_Enum_div(enums) {
    //每种装备稀有度对应的颜色
    init_rarity_color(enums);
    //玩家主动技能放在战斗规划界面中，根据主动技能类型呈现不同的颜色
    init_active_skill_show_color(enums);
    //游戏布局中涉及到的颜色
    init_div_color(enums);
}

export { init_Enum_div };
