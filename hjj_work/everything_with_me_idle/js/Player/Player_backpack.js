'use strict';
import { check_Equipment, is_Empty_Object } from '../Function/Function.js';
import { add_show_Tooltip, add_click_Equipment_worn, addElement } from '../Function/Dom_function.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from '../GameRun/global_class.js';
//玩家背包中的一个物品
class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0; //玩家拥有该物品总数
    }
}
class Player_Item_E extends Player_Item {
    constructor(id) {
        super(id);
        //针对武器装备，当前物品的稀有度
        this.rarity = new Object(); //稀有度
    }
}

export class Player_backpack {
    constructor() {}
    //获取玩家背包部分的游戏存档
    save_Player_backpack() {
        let Player_backpack_save = new Object();
        for (let id in this) {
            Player_backpack_save[id] = this[id];
        }
        return Player_backpack_save;
    }
    //加载玩家背包部分的游戏存档
    load_Player_backpack(Player_backpack_save) {
        if (is_Empty_Object(Player_backpack_save)) {
            return;
        }
        for (let id in Player_backpack_save) {
            this[id] = Player_backpack_save[id];
        }
        this.updata_BP_value();
    }
    //给玩家背包添加物品
    Player_get_item(id, num, equip_rarity) {
        if (items[id] === undefined) {
            //添加的物品不在数据库中
            console.log('Player_get_item:未定义物品：%s', id);
            return -1;
        }
        //要添加的物品如果是武器装备，则必须要有稀有度，否则给予0稀有度物品
        //为玩家添加武器装备
        if (items[id].main_type.includes('equipment')) {
            this.Player_get_Equipment(id, num, equip_rarity);
        } else {
            if (this[id] === undefined) {
                this[id] = new Player_Item(id);
                this[id].num = 0;
            }
            this[id].num += num;
        }
        return 0;
    }

    //为玩家添加武器装备
    Player_get_Equipment(id, num, equip_rarity) {
        if (!equip_rarity) {
            //稀有度参数异常，默认给0稀有度物品
            equip_rarity = 'damaged';
        }
        if (this[id] === undefined) {
            //判断玩家身上有无该物品，没有就创建
            this[id] = new Player_Item_E(id);
            this[id].rarity[equip_rarity] = 0;
        } else if (this[id].rarity[equip_rarity] === undefined) {
            //判断需要添加的稀有度是否存在，不存在就创建
            this[id].rarity[equip_rarity] = 0;
        }

        this[id].rarity[equip_rarity] += num;
        this[id].num += num;
    }

    //从玩家背包里去掉武器装备
    Player_lose_Equipment(id, num, equip_rarity) {
        if (!check_Equipment(id, equip_rarity)) {
            return 0;
        }
        if (this[id] === undefined) {
            //判断玩家背包有无该物品
            return -1;
        }
        //判断玩家背包里的物品数量是否足够
        if (this[id].num < num) {
            return -2;
        }
        //判断玩家是否有指定稀有度的目标装备
        if (this[id].rarity[equip_rarity] === undefined || this[id].rarity[equip_rarity] < num) {
            return -3;
        }

        this[id].rarity[equip_rarity] -= num;
        this[id].num -= num;
        return 1;
    }

    //更新左下角的背包物品栏中的元素
    updata_BP_value() {
        //清空左下角背包界面的所有元素
        delete_BP_div();
        //获取应该展示的物品类别
        let BP_type = get_BP_type();
        //转义物品类别
        let type_switch = BP_type_handle(BP_type);

        //遍历玩家的每个物品，按照物品的最大堆叠数量，显示到左下的背包中
        // let P_backpack = player.get_player_backpack();
        let arr = Object.keys(this); //将拥有的物品的key转换成一个数组
        for (let play_item_id of arr) {
            if (items[play_item_id] === undefined) {
                //玩家拥有的物品不在数据库中，应该清除
                console.log('updata_BP_value : 玩家拥有未定义物品 id=%s', play_item_id);
                delete this[play_item_id];
            } else if (Item_type_handle(type_switch, play_item_id)) {
                if (items[play_item_id].main_type.includes('equipment')) {
                    addBP_equipment(this[play_item_id]);
                } else if (items[play_item_id].main_type.includes('material')) {
                    addBP_item(this[play_item_id]);
                }
            } else {
                // 玩家拥有的物品不属于当前启动的过滤规则，不显示
            }
        }
    }
}
//清空左下角背包界面的所有元素
function delete_BP_div() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
}
//获取背包界面激活的过滤条件
function get_BP_type() {
    const radios = document.querySelectorAll('input[name="BP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_type_handle(BP_type) {
    var BP_item_type = [];
    if (BP_type === undefined) {
        return BP_item_type;
    }
    switch (BP_type) {
        case 'all':
            BP_item_type = ['equipment', 'consumable', 'material'];
            break;
        case 'EQP_all': //武器装备，全部
            BP_item_type = ['equipment'];
            break;
        case 'EQP_W': //武器装备，武器
            BP_item_type.push('weapon');
            break;
        case 'EQP_A': //武器装备，防具
            BP_item_type.push('armor');
            break;
        case 'EQP_D': //武器装备，副手
            BP_item_type.push('deputy');
            break;
        case 'EQP_O': //武器装备，饰品
            BP_item_type.push('ornament');
            break;
        case 'CSB_all': //可使用物品，全部
            BP_item_type.push('Consumable');
            break;
        case 'CSB_F': //可使用物品，可食用物品
            BP_item_type.push('food_CSB');
            break;
        case 'CSB_A': //可使用物品，弹药
            BP_item_type.push('ammo_CSB');
            break;
        case 'CSB_L': //可使用物品，生活消耗品
            BP_item_type.push('life_CSB');
            break;
        case 'MTR_all': //材料，全部
            BP_item_type.push('material');
            break;
        case 'MTR_R': //材料，自然材料
            BP_item_type.push('raw_MTR');
            break;
        case 'MTR_P': //材料，人工材料
            BP_item_type.push('process_MTR');
            break;
        case 'MTR_F': //材料，成品
            BP_item_type.push('finish_MTR');
            break;
        case 'MTR_O': //材料，其他物品
            BP_item_type.push('other_MTR');
            break;

        default:
            break;
    }

    return BP_item_type;
}
//判断物品类型中是否在指定过滤条件内
function Item_type_handle(type_switch, id) {
    let item_type = new Array();
    item_type = item_type.concat(items[id].main_type);
    item_type = item_type.concat(items[id].secon_type);
    for (let item_T of item_type) {
        if (type_switch.includes(item_T)) return true;
    }
    return false;
}
//向背包界面展示玩家的一种武器装备
function addBP_equipment(player_item) {
    let maxStack = items[player_item.id].maxStack;
    //遍历玩家此种装备的每一个稀有度
    for (let i in player_item.rarity) {
        let player_E_rarity_num = player_item.rarity[i];
        while (player_E_rarity_num) {
            //当某个稀有度有数量，就展示到背包里
            let BP_value_div = document.getElementById('BP_value_div');
            let aitem = addElement(BP_value_div, 'div', null, 'BP_value');
            aitem.style.color = enums[i].rarity_color;
            let name = items[player_item.id].name;
            aitem.Data = JSON.parse(JSON.stringify(player_item));
            aitem.Data.rarity = [];
            if (maxStack == 1) {
                aitem.innerHTML = `${name}`;
                aitem.Data.rarity[i] = maxStack;
                aitem.Data.num = maxStack;
                player_E_rarity_num -= maxStack;
            } else if (player_E_rarity_num >= maxStack) {
                aitem.innerHTML = `${name} x${maxStack}`;
                aitem.Data.rarity[i] = maxStack;
                aitem.Data.num = maxStack;
                player_E_rarity_num -= maxStack;
            } else {
                aitem.innerHTML = `${name} x${player_E_rarity_num}`;
                aitem.Data.rarity[i] = player_E_rarity_num;
                aitem.Data.num = player_E_rarity_num;
                player_E_rarity_num = 0;
            }
            //给背包中的物品添加鼠标移动上去显示提示的效果
            add_show_Tooltip(aitem, 'item', aitem.Data);
            //添加鼠标点击可以穿戴到身上的效果
            if (i != 'damaged') {
                add_click_Equipment_worn(aitem, aitem.Data);
            }
        }
    }
}
// 向背包物品界面中添加一个物品
function addBP_item(player_item) {
    let maxStack = items[player_item.id].maxStack;
    let player_item_num = player_item.num;
    while (player_item_num) {
        let BP_value_div = document.getElementById('BP_value_div');
        let aitem = addElement(BP_value_div, 'div', null, 'BP_value');
        let name = items[player_item.id].name;
        let item_obj = JSON.parse(JSON.stringify(player_item));
        // aitem.dataset.Data =
        if (player_item_num >= maxStack) {
            aitem.innerHTML = `${name} x${maxStack}`;
            player_item_num -= maxStack;
        } else {
            aitem.innerHTML = `${name} x${player_item_num}`;
            player_item_num = 0;
        }
        add_show_Tooltip(aitem, 'item', item_obj);
    }
}

export {};
