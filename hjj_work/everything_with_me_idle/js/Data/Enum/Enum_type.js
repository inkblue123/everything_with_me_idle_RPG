import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与类型相关的内容

function init_type_color(enums) {
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

function init_skill_type(enums) {
    //根基技能
    add_Enum_Array(enums, 'basic_passive');
    enums.basic_passive = ['basic_passive'];
    //战斗技能
    add_Enum_Array(enums, 'combat_passive');
    enums.combat_passive = ['combat_passive', 'weapon_mastery', 'environment_adaptation', 'enemy_mastery'];
    //生活技能
    add_Enum_Array(enums, 'life_passive');
    enums.life_passive = [
        'life_passive', //
        'material_acquisition', //原料获取
        'material_processing', //原料加工
        'product_usage', //成品使用
        'recycling', //回收利用
    ];
    //特殊功法
    add_Enum_Array(enums, 'super_passive');
    enums.super_passive = ['super_passive'];

    //技能升级类型
    add_Enum_Array(enums, 'levelup_type');
    enums.super_passive = [
        'unlevelup', //不可升级
        'exp_up', //累计经验可升级，只有一个等级上限，可升级到等级上限
        'give_up', //不可累计经验，但是可以升级的类型，一般是通过特定事件或者道具直接给予等级
    ];
}

function init_monitor_type(enums) {
    let id;

    id = 'monitor_type';
    add_Enum_Array(enums, id);
    enums[id] = [
        'EE', //事件正常完成
        'ATD', //玩家受击
        'DSE', //防御技能生效
        'PKL', //玩家击杀敌人
    ];
}

function init_Enum_type(enums) {
    //每种装备稀有度对应的颜色
    init_type_color(enums);

    //玩家主动被动技能的分类
    init_skill_type(enums);

    //游戏事件的监控行为的类型
    init_monitor_type(enums);
}

export { init_Enum_type };
