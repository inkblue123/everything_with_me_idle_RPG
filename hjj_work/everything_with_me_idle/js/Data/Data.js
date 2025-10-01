import { enums } from './Enum/Enum.js';
import { items } from './Item/Item.js';
import { game_events } from './Game_event/Game_Event.js';
import { get_uniqueArr } from '../Function/Function.js';

//数据库中内容大部分可以写死定义
//部分内容需要在游戏内容不断扩展的同时进行填充和更新
//这个填充和更新的部分时常遗忘和遗漏
//在这个函数中进行动态的更新，避免手动更新的遗漏
//游戏数据库初始化
function game_data_init() {
    //枚举数据库-游戏状态部分的枚举更新
    Enum_game_status_init();
    //枚举数据库-物品部分的枚举更新
    Enum_item_init();
}
//
function Enum_game_status_init() {
    //游戏运行中遇到了事件完成，需要在游戏状态管理里标记，该事件完成了
    //如何知晓这个事件属于主线、支线、挑战、成就，在对应的管理对象里存储
    //就要用到enums.important_nodes，事先存储好分类，后续简单查询即可
    //开发中新增了事件，理应在enums.important_nodes里添加对应的名称
    //但是开发有时候会遗忘，毕竟新事件在Game_event数据库中，
    //所以在这里进行自动初始化，自动填充enums.important_nodes里的事件名
    //把4种重要节点放到枚举类中，用于判断某事件属于哪种重要事件
    for (let id in game_events) {
        let type = game_events[id].type;
        if (type == 'main_quest' || type == 'challenge' || type == 'achievement' || type == 'mini_event' || type == 'side_quest') {
            enums.important_nodes[type].push(id);
        }
    }
}
function Enum_item_init() {
    //物品有大类，决定物品是装备、消耗品、材料，就三种
    //物品还有小类，决定这个物品具体的类型，比如剑类型，木头类型，食品类型，很多很多小类，而且还会不断扩展
    //做物品过滤时经常用到这个小类
    //由于小类在开发时会不断扩展，在物品库中开发时可能会忘了要在枚举库中新增
    for (let id in items) {
        let main_type = items[id].main_type;
        let secon_type_array = items[id].secon_type;

        for (let secon_type of secon_type_array) {
            enums.Item_secon_type.push(secon_type);
            if (main_type == 'equipment') {
                enums.Equipment_secon_type.push(secon_type);
            } else if (main_type == 'consumable') {
                enums.Consumable_secon_type.push(secon_type);
            } else if (main_type == 'material') {
                enums.Material_secon_type.push(secon_type);
            }
        }
    }
    //去重
    enums.Item_secon_type = get_uniqueArr(enums.Item_secon_type);
    enums.Equipment_secon_type = get_uniqueArr(enums.Equipment_secon_type);
    enums.Consumable_secon_type = get_uniqueArr(enums.Consumable_secon_type);
    enums.Material_secon_type = get_uniqueArr(enums.Material_secon_type);
}

export { game_data_init };
