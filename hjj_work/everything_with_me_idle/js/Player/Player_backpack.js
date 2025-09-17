'use strict';
import { check_Equipment, is_Empty_Object, get_uniqueArr } from '../Function/Function.js';
import { add_show_Tooltip, add_click_Equipment_worn, addElement, addElement_radio } from '../Function/Dom_function.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { player } from './Player.js';
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
            this.updata_BP_value();
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
        //缓存上次背包界面激活的过滤条件
        let last_BP_type = get_BP_type();
        //清空左下角背包界面的所有元素
        delete_BP_div();
        //获取这次需要展示的物品的所有小类
        let all_BP_secon_type = this.get_all_BP_secon_type();
        //获取这次更新后应该激活的过滤条件
        let now_BP_type = check_BP_type(last_BP_type, all_BP_secon_type);
        //重新生成背包界面的过滤条件按钮
        reset_BP_switch(now_BP_type, all_BP_secon_type);
        //转义物品类别
        let type_switch = BP_type_handle(now_BP_type);
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
                } else if (items[play_item_id].main_type.includes('consumable')) {
                    addBP_item(this[play_item_id]);
                }
            } else {
                // 玩家拥有的物品不属于当前启动的过滤规则，不显示
            }
        }
    }
    //获取当前背包物品的所有小类
    get_all_BP_secon_type() {
        let all_BP_secon_type = new Array();
        let arr = Object.keys(this); //将拥有的物品的key转换成一个数组
        for (let play_item_id of arr) {
            //未拥有数量的物品不展示
            if (this[play_item_id].num == 0) {
                continue;
            }
            all_BP_secon_type = all_BP_secon_type.concat(items[play_item_id].secon_type);
        }
        all_BP_secon_type = get_uniqueArr(all_BP_secon_type);
        return all_BP_secon_type;
    }
}
//清空左下角背包界面的所有元素
function delete_BP_div() {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
    let BP_EQP_droptable = document.getElementById('BP_EQP_droptable');
    BP_EQP_droptable.replaceChildren(); //清空装备的过滤选项
    let BP_CSB_droptable = document.getElementById('BP_CSB_droptable');
    BP_CSB_droptable.replaceChildren(); //清空消耗品的过滤选项
    let BP_MTR_droptable = document.getElementById('BP_MTR_droptable');
    BP_MTR_droptable.replaceChildren(); //清空材料的过滤选项
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
//检查之前屏幕上激活的过滤条件在更新后是否适用，返回更新后适用的当前激活过滤条件
function check_BP_type(last_BP_type, all_BP_secon_type) {
    if (last_BP_type == 'all' || last_BP_type == 'equipment_all' || last_BP_type == 'consumable_all' || last_BP_type == 'material_all') {
        //之前激活的过滤条件是所有物品或者三大分类的“全部”过滤条件，可以继续使用
        return last_BP_type;
    }
    if (all_BP_secon_type.includes(last_BP_type)) {
        //之前激活的过滤条件在更新后依然存在，继续使用
        return last_BP_type;
    }
    //之前激活的过滤条件已经不适用，换成之前条件的大类的“全部”过滤条件
    if (enums['Equipment_secon_type'].includes(last_BP_type)) {
        return 'equipment_all';
    }
    if (enums['Consumable_secon_type'].includes(last_BP_type)) {
        return 'consumable_all';
    }
    if (enums['Material_secon_type'].includes(last_BP_type)) {
        return 'material_all';
    }
}

//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_type_handle(BP_type) {
    var BP_item_type = [];
    if (BP_type === undefined) {
        return BP_item_type;
    }

    if (BP_type == 'all') {
        //全部物品
        BP_item_type = ['equipment', 'consumable', 'material'];
    } else if (BP_type == 'equipment_all') {
        //武器装备，全部
        BP_item_type = ['equipment'];
    } else if (BP_type == 'consumable_all') {
        //消耗品，全部
        BP_item_type = ['consumable'];
    } else if (BP_type == 'material_all') {
        //材料，全部
        BP_item_type = ['material'];
    } else {
        //某个小类
        BP_item_type = [BP_type];
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
    for (let rarity_id in player_item.rarity) {
        let player_E_rarity_num = player_item.rarity[rarity_id];
        while (player_E_rarity_num) {
            //当某个稀有度有数量，就展示到背包里
            let BP_value_div = document.getElementById('BP_value_div');
            let aitem_div = addElement(BP_value_div, 'div', null, 'BP_value');
            aitem_div.style.color = enums[rarity_id].rarity_color;
            let name = items[player_item.id].name;

            let aitem_data = new Object();
            aitem_data = JSON.parse(JSON.stringify(player_item));
            aitem_data.rarity = [];
            if (maxStack == 1) {
                aitem_div.innerHTML = name;
                aitem_data.rarity[rarity_id] = maxStack;
                aitem_data.num = maxStack;
                player_E_rarity_num -= maxStack;
            } else if (player_E_rarity_num >= maxStack) {
                aitem_div.innerHTML = name + ' x' + maxStack;
                aitem_data.rarity[rarity_id] = maxStack;
                aitem_data.num = maxStack;
                player_E_rarity_num -= maxStack;
            } else {
                aitem_div.innerHTML = name + ' x' + player_E_rarity_num;
                aitem_data.rarity[rarity_id] = player_E_rarity_num;
                aitem_data.num = player_E_rarity_num;
                player_E_rarity_num = 0;
            }
            // aitem_div.dataset.item_data = JSON.stringify(aitem_data);
            //给背包中的物品添加鼠标移动上去显示提示的效果
            add_show_Tooltip(aitem_div, 'item', aitem_data);
            //添加鼠标点击可以穿戴到身上的效果
            if (rarity_id != 'damaged') {
                add_click_Equipment_worn(aitem_div, aitem_data);
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
        if (player_item_num >= maxStack) {
            aitem.innerHTML = name + ' x' + maxStack;
            player_item_num -= maxStack;
        } else {
            aitem.innerHTML = name + ' x' + player_item_num;
            player_item_num = 0;
        }
        add_show_Tooltip(aitem, 'item', item_obj);
    }
}

//生成背包界面的分类过滤按钮
function reset_BP_switch(now_BP_type, all_BP_secon_type) {
    let BP_EQP_droptable = document.getElementById('BP_EQP_droptable');
    let BP_CSB_droptable = document.getElementById('BP_CSB_droptable');
    let BP_MTR_droptable = document.getElementById('BP_MTR_droptable');
    let checked_flag = false; //激活过滤条件是否完成
    if (now_BP_type == 'all') {
        let BP_ALL_radio_div = document.getElementById('BP_ALL_radio_div');
        BP_ALL_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成三个大类的“全部”分类按钮
    let BP_EQP_all_radio_div = addElement(BP_EQP_droptable, 'div', 'BP_EQP_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_EQP_all_radio = addElement_radio(BP_EQP_all_radio_div, `BP_EQP_all`, 'BP_switch', `equipment_all`, `全部`);
    add_click_updata_BP_value(BP_EQP_all_radio); //给按钮绑定点击事件
    if (now_BP_type == 'equipment_all') {
        BP_EQP_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let BP_CSB_all_radio_div = addElement(BP_CSB_droptable, 'div', 'BP_CSB_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_CSB_all_radio = addElement_radio(BP_CSB_all_radio_div, `BP_CSB_all`, 'BP_switch', `consumable_all`, `全部`);
    add_click_updata_BP_value(BP_CSB_all_radio); //给按钮绑定点击事件
    if (now_BP_type == 'consumable_all') {
        BP_CSB_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let BP_MTR_all_radio_div = addElement(BP_MTR_droptable, 'div', 'BP_MTR_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_MTR_all_radio = addElement_radio(BP_MTR_all_radio_div, `BP_MTR_all`, 'BP_switch', `material_all`, `全部`);
    add_click_updata_BP_value(BP_MTR_all_radio); //给按钮绑定点击事件
    if (now_BP_type == 'material_all') {
        BP_MTR_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成每个小类的分类按钮
    for (let BP_secon_type of all_BP_secon_type) {
        if (is_Empty_Object(texts[BP_secon_type])) {
            console.log('没有定义%s小类的名称', BP_secon_type);
            continue;
        }
        let radio_div;
        let radio;
        //属于装备大类的小类
        if (enums['Equipment_secon_type'].includes(BP_secon_type)) {
            radio_div = addElement(BP_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'BP_EQP_' + BP_secon_type;
            let radio_text = texts[BP_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'BP_switch', BP_secon_type, radio_text);
        }
        //属于消耗品大类的小类
        if (enums['Consumable_secon_type'].includes(BP_secon_type)) {
            radio_div = addElement(BP_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'BP_CSB_' + BP_secon_type;
            let radio_text = texts[BP_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'BP_switch', BP_secon_type, radio_text);
        }
        //属于材料大类的小类
        if (enums['Material_secon_type'].includes(BP_secon_type)) {
            radio_div = addElement(BP_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'BP_MTR_' + BP_secon_type;
            let radio_text = texts[BP_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'BP_switch', BP_secon_type, radio_text);
        }
        //激活过滤条件
        if (checked_flag == false && now_BP_type == BP_secon_type) {
            radio_div.children[0].checked = true;
            checked_flag = true;
        }
        add_click_updata_BP_value(radio); //给按钮绑定点击事件
    }

    if (checked_flag == false) {
        console.log('生成背包界面的过滤条件时找不到需要激活的过滤条件');
    }
}
// 向目标组件添加 点击之后过滤玩家背包物品 的功能
function add_click_updata_BP_value(target_div) {
    //输入的tip_value表示要卸下玩家身上第几个槽的技能，从0开始计数
    target_div.addEventListener('click', function () {
        if (this.id == 'BP_all') {
            //针对背包界面的“全部”按钮，额外新增关闭其他下拉框的功能
            show_dropdown_table('BP_classification_div');
        }
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
    });
}

export {};
