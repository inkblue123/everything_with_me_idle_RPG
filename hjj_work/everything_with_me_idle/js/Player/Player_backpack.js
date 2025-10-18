'use strict';
import { check_Equipment, is_Empty_Object, get_uniqueArr, get_item_id_key } from '../Function/Function.js';
import { add_show_Tooltip, add_click_Equipment_worn, addElement, addElement_radio } from '../Function/Dom_function.js';
import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { player } from './Player.js';
import { global } from '../GameRun/global_manage.js';
//玩家背包中的一个物品
// class Player_Item {
//     constructor(id) {
//         this.id = id; //唯一id
//         this.num = 0; //玩家拥有该物品总数
//         //装备特有的属性
//         this.equip_rarity;
//         //消耗品特有的属性
//     }
// }

export class Player_backpack {
    constructor() {
        this.backpack_items = new Object(); //玩家背包所有物品对象
    }
    //获取玩家背包部分的游戏存档
    save_Player_backpack() {
        let Player_backpack_save = new Object();
        Player_backpack_save.backpack_items = this.backpack_items;
        return Player_backpack_save;
    }
    //加载玩家背包部分的游戏存档
    load_Player_backpack(Player_backpack_save) {
        this.backpack_items = Player_backpack_save.backpack_items;
        this.updata_BP_value();
    }
    //给玩家背包添加物品
    Player_get_item(item_obj) {
        let id = item_obj.id;
        if (items[id] === undefined) {
            //添加的物品不在数据库中
            console.log('Player_get_item:未定义物品：%s', id);
            return -1;
        }
        let item_key = get_item_id_key(item_obj);
        if (this.backpack_items[item_key] === undefined) {
            //背包没有同key物品，初始化该物品
            this.backpack_items[item_key] = item_obj;
            return item_obj.num;
        }

        //背包已有同key物品，只需要增加数量
        this.backpack_items[item_key].num += item_obj.num;
        return item_obj.num;
    }
    //从玩家背包中去掉物品
    Player_lose_item(item_obj) {
        let id = item_obj.id;
        if (items[id] === undefined) {
            //添加的物品不在数据库中
            console.log('未定义物品：%s', id);
            return -1;
        }
        let item_key = get_item_id_key(item_obj);
        if (this.backpack_items[item_key] === undefined) {
            //背包没有同key物品，结束
            return 0;
        }

        //背包已有同key物品，减少数量
        if (this.backpack_items[item_key].num >= item_obj.num) {
            this.backpack_items[item_key].num -= item_obj.num;
            return item_obj.num;
        } else {
            let num = this.backpack_items[item_key].num;
            this.backpack_items[item_key].num = 0;
            return num;
        }
    }

    //更新左下角的背包物品栏中的元素
    updata_BP_value() {
        //缓存上次背包界面激活的分类条件
        let last_BP_switch_type = get_BP_switch_type();
        //清空左下角背包界面的所有元素
        delete_BP_div();
        //获取这次需要展示的物品的所有小类
        let all_BP_secon_type = get_all_BP_secon_type(this.backpack_items);
        //获取这次更新后应该激活的分类条件
        let now_BP_switch_type = check_BP_switch_type(last_BP_switch_type, all_BP_secon_type);
        //重新生成背包界面的分类条件按钮
        reset_BP_switch_button(now_BP_switch_type, all_BP_secon_type);
        //转义物品类别
        let type_switch = BP_switch_type_handle(now_BP_switch_type);
        //获取当前背包物品点击之后要发挥什么用处，正常使用/选择出售
        let click_use_type = get_BP_click_use_type();
        //获取当前背包界面激活的排序条件
        let BP_sort_type = get_BP_sort_type();
        //获取排序后的玩家所有物品的key集合
        let sort_item_array = this.get_BP_all_item_id_array_sort(BP_sort_type);

        //遍历玩家的每个物品，按照物品的最大堆叠数量，显示到左下的背包中
        for (let play_item_key of sort_item_array) {
            let item_obj = this.backpack_items[play_item_key];
            let id = item_obj.id;
            if (Item_type_handle(type_switch, id)) {
                if (click_use_type == 'store') {
                    addBP_goods(item_obj);
                } else {
                    if (items[id].main_type.includes('equipment')) {
                        addBP_equipment(item_obj);
                    } else if (items[id].main_type.includes('material')) {
                        addBP_item(item_obj);
                    } else if (items[id].main_type.includes('consumable')) {
                        addBP_item(item_obj);
                    }
                }
            } else {
                // 玩家拥有的物品不属于当前启动的过滤规则，不显示
            }
        }
    }

    //获取当前背包物品里数量最多的一种物品的数量
    get_BP_aitem_max_num() {
        let max_num = 0;
        let arr = Object.keys(this.backpack_items); //将拥有的物品的key转换成一个数组
        for (let item_key of arr) {
            if (max_num < this.backpack_items[item_key].num) {
                max_num = this.backpack_items[item_key].num;
            }
        }
        return max_num;
    }
    //获取玩家仓库中指定货币的总金额
    get_BP_money_type_num(money_type) {
        let money = 0;
        let arr = Object.keys(this.backpack_items); //将拥有的物品的key转换成一个数组
        for (let item_key of arr) {
            let id = this.backpack_items[item_key].id;
            if (items[id].secon_type.includes(money_type)) {
                money += this.backpack_items[item_key].num * this.backpack_items[item_key].price[money_type];
            }
        }
        return money;
    }
    //补齐货币，用背包中的指定货币尝试补齐指定数量
    supplement_money(money_type, need_money) {
        let store_manage = global.get_store_manage();
        let sell_manage = store_manage.get_sell_manage();
        //初始化背包中指定货币的可用数量
        let money_value = JSON.parse(JSON.stringify(enums[money_type].money_value));
        for (let item_key in money_value) {
            money_value[item_key].num = 0;
            if (this.backpack_items[item_key] === undefined) {
                continue;
            }
            let sell_num = sell_manage.get_sell_goods_num(item_key); //这种物品打算出售的数量
            money_value[item_key].num = this.backpack_items[item_key].num - sell_num;
        }
        //计算需要补齐的货币的数量
        // let need_money_obj = calculateCurrencyCombination(130, money_value);
        let need_money_obj = calculateCurrencyCombination(need_money, money_value);
        //将这些数量的货币放入待出售界面
        for (let item_key in need_money_obj.combination) {
            if (need_money_obj.combination[item_key] <= 0) {
                continue;
            }
            let aitem_data = JSON.parse(JSON.stringify(this.backpack_items[item_key]));
            aitem_data.num = need_money_obj.combination[item_key];
            sell_manage.set_player_sell_goods(aitem_data);
        }
        //刷新待出售界面
        sell_manage.updata_sell_value_div();
        //刷新背包界面
        this.updata_BP_value();
        return need_money_obj;
    }
    //获取排序后的玩家所有物品的key集合
    get_BP_all_item_id_array_sort(BP_sort_type) {
        let sortData = new Object();
        let arr = Object.keys(this.backpack_items); //将拥有的物品的key转换成一个数组
        let money_type;
        if (BP_sort_type == 'price_sort') {
            let store_manage = global.get_store_manage();
            let place_manage = global.get_place_manage();
            let now_place = place_manage.get_now_place();
            let now_store_place = store_manage.get_store_place();
            if (now_place == now_store_place) {
                money_type = store_manage.get_store_use_money_type();
            } else {
                money_type = store_manage.get_last_normal_money_type();
            }
        }
        //提取需要排序的关键数据
        for (let item_key of arr) {
            if (BP_sort_type == 'num_sort') {
                //个数排序
                sortData[item_key] = this.backpack_items[item_key].num;
            } else if (BP_sort_type == 'price_sort') {
                let id = this.backpack_items[item_key].id;
                //价值排序
                if (is_Empty_Object(items[id].price)) {
                    //价值未定义
                    sortData[item_key] = 0;
                    continue;
                }
                if (items[id].price[money_type] === undefined) {
                    //当前使用货币类型的价值未定义
                    sortData[item_key] = 0;
                    continue;
                }
                if (items[id].main_type.includes('equipment')) {
                    let equip_rarity = this.backpack_items[item_key].equip_rarity;
                    let rarity_place_data = enums[equip_rarity].price_rate;
                    sortData[item_key] = items[id].price[money_type] * rarity_place_data * 0.01;
                } else {
                    sortData[item_key] = items[id].price[money_type];
                }
            }
        }
        //对关键数据进行排序
        let key_arr = Object.keys(sortData).sort((a, b) => sortData[b] - sortData[a]);

        return key_arr;
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
function get_BP_switch_type() {
    const radios = document.querySelectorAll('input[name="BP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//检查之前屏幕上激活的过滤条件在更新后是否适用，返回更新后适用的当前激活过滤条件
function check_BP_switch_type(last_BP_switch_type, all_BP_secon_type) {
    if (last_BP_switch_type == 'all' || last_BP_switch_type == 'equipment_all' || last_BP_switch_type == 'consumable_all' || last_BP_switch_type == 'material_all') {
        //之前激活的过滤条件是所有物品或者三大分类的“全部”过滤条件，可以继续使用
        return last_BP_switch_type;
    }
    if (all_BP_secon_type.includes(last_BP_switch_type)) {
        //之前激活的过滤条件在更新后依然存在，继续使用
        return last_BP_switch_type;
    }
    //之前激活的过滤条件已经不适用，换成之前条件的大类的“全部”过滤条件
    if (enums['Equipment_secon_type'].includes(last_BP_switch_type)) {
        return 'equipment_all';
    }
    if (enums['Consumable_secon_type'].includes(last_BP_switch_type)) {
        return 'consumable_all';
    }
    if (enums['Material_secon_type'].includes(last_BP_switch_type)) {
        return 'material_all';
    }
}
//获取当前背包物品的所有小类
function get_all_BP_secon_type(player_items) {
    let all_BP_secon_type = new Array();
    let arr = Object.keys(player_items); //将拥有的物品的key转换成一个数组
    for (let play_item_key of arr) {
        //未拥有数量的物品不展示
        if (player_items[play_item_key].num == 0) {
            continue;
        }
        let item_id = player_items[play_item_key].id;
        all_BP_secon_type = all_BP_secon_type.concat(items[item_id].secon_type);
    }
    all_BP_secon_type = get_uniqueArr(all_BP_secon_type);
    all_BP_secon_type = all_BP_secon_type.sort((a, b) => enums['secon_type_sort'][a] - enums['secon_type_sort'][b]);
    return all_BP_secon_type;
}
//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_switch_type_handle(BP_switch_type) {
    var BP_item_type = [];
    if (BP_switch_type === undefined) {
        return BP_item_type;
    }

    if (BP_switch_type == 'all') {
        //全部物品
        BP_item_type = ['equipment', 'consumable', 'material'];
    } else if (BP_switch_type == 'equipment_all') {
        //武器装备，全部
        BP_item_type = ['equipment'];
    } else if (BP_switch_type == 'consumable_all') {
        //消耗品，全部
        BP_item_type = ['consumable'];
    } else if (BP_switch_type == 'material_all') {
        //材料，全部
        BP_item_type = ['material'];
    } else {
        //某个小类
        BP_item_type = [BP_switch_type];
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
//向背包界面展示玩家的一种武器装备，点击之后可以穿戴
function addBP_equipment(item_obj) {
    let maxStack = items[item_obj.id].maxStack;
    let player_item_num = item_obj.num;

    while (player_item_num) {
        let BP_value_div = document.getElementById('BP_value_div');
        let aitem_div = addElement(BP_value_div, 'div', null, 'BP_value');
        //根据装备稀有度调整文字颜色
        aitem_div.style.color = enums[item_obj.equip_rarity].rarity_color;

        let aitem_obj_data = JSON.parse(JSON.stringify(item_obj));
        let name = items[item_obj.id].name;
        if (maxStack == 1) {
            aitem_div.innerHTML = name;
            player_item_num -= maxStack;
            aitem_obj_data.num = maxStack;
        } else if (player_item_num >= maxStack) {
            aitem_div.innerHTML = name + ' x' + maxStack;
            player_item_num -= maxStack;
            aitem_obj_data.num = maxStack;
        } else {
            aitem_div.innerHTML = name + ' x' + player_item_num;
            aitem_obj_data.num = player_item_num;
            player_item_num = 0;
        }
        //给背包中的物品添加鼠标移动上去显示提示的效果
        add_show_Tooltip(aitem_div, 'item', aitem_obj_data);
        //添加鼠标点击可以穿戴到身上的效果
        if (item_obj.equip_rarity != 'damaged') {
            add_click_Equipment_worn(aitem_div, aitem_obj_data);
        }
    }
}
// 向背包物品界面中添加一个物品
function addBP_item(item_obj) {
    let maxStack = items[item_obj.id].maxStack;
    let player_item_num = item_obj.num;
    while (player_item_num) {
        let BP_value_div = document.getElementById('BP_value_div');
        let aitem_div = addElement(BP_value_div, 'div', null, 'BP_value');
        //设置显示的文本
        let name = items[item_obj.id].name;
        if (player_item_num >= maxStack) {
            aitem_div.innerHTML = name + ' x' + maxStack;
            player_item_num -= maxStack;
        } else {
            aitem_div.innerHTML = name + ' x' + player_item_num;
            player_item_num = 0;
        }
        //添加鼠标移动上去时展示提示信息的功能
        add_show_Tooltip(aitem_div, 'item', item_obj);
    }
}
//向背包物品界面中添加一个物品，点击之后进入待出售窗口
function addBP_goods(item_obj) {
    let store_manage = global.get_store_manage();
    let sell_manage = store_manage.get_sell_manage();

    if (item_obj.num <= 0) {
        return;
    }
    let sell_num = sell_manage.get_sell_goods_num(item_obj); //这种物品打算出售的数量
    let can_show_num = item_obj.num - sell_num; //物品可以在背包界面展示出来的数量
    if (can_show_num <= 0) {
        return;
    }
    let id = item_obj.id;
    let name = items[id].name;
    let aitem_data = new Object();
    aitem_data = JSON.parse(JSON.stringify(item_obj));
    aitem_data.num = can_show_num;

    let BP_value_div = document.getElementById('BP_value_div');
    let aitem_div = addElement(BP_value_div, 'div', null, 'BP_value');
    aitem_div.innerHTML = name + ' x' + can_show_num;
    if (items[id].main_type.includes('equipment')) {
        //根据装备稀有度调整文字颜色
        aitem_div.style.color = enums[item_obj.equip_rarity].rarity_color;
    }
    //给背包中的物品添加鼠标移动上去显示提示的效果
    add_show_Tooltip(aitem_div, 'sell_good', aitem_data);
    //添加鼠标点击可以出售的效果
    add_click_sell_backpack_item(aitem_div, aitem_data);
}
//生成背包界面的分类过滤按钮
function reset_BP_switch_button(now_BP_switch_type, all_BP_secon_type) {
    let BP_EQP_droptable = document.getElementById('BP_EQP_droptable');
    let BP_CSB_droptable = document.getElementById('BP_CSB_droptable');
    let BP_MTR_droptable = document.getElementById('BP_MTR_droptable');
    let checked_flag = false; //激活过滤条件是否完成
    if (now_BP_switch_type == 'all') {
        let BP_ALL_radio_div = document.getElementById('BP_ALL_radio_div');
        BP_ALL_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成三个大类的“全部”分类按钮
    let BP_EQP_all_radio_div = addElement(BP_EQP_droptable, 'div', 'BP_EQP_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_EQP_all_radio = addElement_radio(BP_EQP_all_radio_div, 'BP_EQP_all', 'BP_switch', 'equipment_all', '全部');
    add_click_updata_BP_value(BP_EQP_all_radio); //给按钮绑定点击事件
    if (now_BP_switch_type == 'equipment_all') {
        BP_EQP_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let BP_CSB_all_radio_div = addElement(BP_CSB_droptable, 'div', 'BP_CSB_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_CSB_all_radio = addElement_radio(BP_CSB_all_radio_div, 'BP_CSB_all', 'BP_switch', 'consumable_all', '全部');
    add_click_updata_BP_value(BP_CSB_all_radio); //给按钮绑定点击事件
    if (now_BP_switch_type == 'consumable_all') {
        BP_CSB_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let BP_MTR_all_radio_div = addElement(BP_MTR_droptable, 'div', 'BP_MTR_all_radio_div', 'radio_div switch_radio_div_2');
    let BP_MTR_all_radio = addElement_radio(BP_MTR_all_radio_div, 'BP_MTR_all', 'BP_switch', 'material_all', '全部');
    add_click_updata_BP_value(BP_MTR_all_radio); //给按钮绑定点击事件
    if (now_BP_switch_type == 'material_all') {
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
        if (checked_flag == false && now_BP_switch_type == BP_secon_type) {
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
            show_dropdown_table('BP_switch_div');
        }
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
    });
}
// 向目标组件添加 点击之后放入待出售物品界面中的功能
function add_click_sell_backpack_item(target_div, item_data) {
    target_div.addEventListener('click', () => {
        //获取当前出售数量设定
        let sell_quantity_button = document.getElementById('sell_quantity_button');
        let quantity_num = sell_quantity_button.dataset.quantity_num;

        let store_manage = global.get_store_manage();
        let sell_manage = store_manage.get_sell_manage();
        //将待出售的物品的数量设定成规定数量
        let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'sell');
        //向商店管理类添加待出售物品信息
        sell_manage.set_player_sell_goods(item_data);
        sell_manage.updata_sell_value_div();
        store_manage.updata_trade_result_div();
        //背包物品变化，更新相关界面
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();

        //关闭提示窗
        if (all_flag) {
            let tooltip = document.getElementById('tooltip');
            tooltip.CloseTip(); //清空小窗口
        }
    });
}
//获取背包物品点击之后应该发挥什么用处
function get_BP_click_use_type() {
    let place_manage = global.get_place_manage();
    let now_place_type = place_manage.get_now_place_type();
    if (now_place_type == 'store') {
        //如果玩家处于商店地点，背包中的物品点击之后会进入待出售界面
        return 'store';
    } else {
        //如果玩家处于其他的地点，背包物品点击之后正常使用
        return 'normal';
    }
}
//获取当前背包界面激活的排序条件
function get_BP_sort_type() {
    const radios = document.querySelectorAll('input[name="BP_sort"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//货币价值计算器
function calculateCurrencyCombination(targetValue, currencies) {
    // 1. 按价值从高到低排序货币
    let sortedCurrencies = new Array();
    for (let item_key in currencies) {
        sortedCurrencies.push(currencies[item_key]);
    }

    // 2. 初始化结果对象
    const result = {
        combination: {},
        totalValue: 0,
        excess: 0,
        isExact: false,
    };

    // 3. 尝试精确匹配
    let remaining = targetValue;
    for (const currency of sortedCurrencies) {
        const maxPossible = Math.min(Math.floor(remaining / currency.price), currency.num);
        result.combination[currency.key] = maxPossible;
        remaining -= maxPossible * currency.price;
    }

    // 4. 如果精确匹配成功
    if (remaining === 0) {
        result.totalValue = targetValue;
        result.isExact = true;
        return result;
    }

    // 5. 寻找最小超额组合（回溯算法）
    result.combination = {};
    let minExcess = Infinity;
    let bestCombination = null;

    function backtrack(index, currentCombination, currentValue) {
        if (currentValue >= targetValue) {
            const excess = currentValue - targetValue;
            if (excess < minExcess) {
                minExcess = excess;
                bestCombination = { ...currentCombination };
            }
            return;
        }

        if (index >= sortedCurrencies.length) {
            return;
        }

        const currency = sortedCurrencies[index];
        const maxPossible = Math.min(Math.ceil((targetValue - currentValue) / currency.price), currency.num);

        // 尝试从0到最大可能数量的所有组合
        for (let i = 0; i <= maxPossible; i++) {
            currentCombination[currency.key] = i;
            backtrack(index + 1, currentCombination, currentValue + i * currency.price);
        }

        currentCombination[currency.key] = 0; // 回溯
    }

    backtrack(0, {}, 0);

    // 6. 返回最佳组合
    if (bestCombination) {
        result.combination = bestCombination;
        result.totalValue = Object.entries(bestCombination).reduce((sum, [key, num]) => {
            const currency = sortedCurrencies.find((c) => c.key === key);
            return sum + num * currency.price;
        }, 0);
        result.excess = result.totalValue - targetValue;
    } else {
        // 7. 如果所有货币加起来都不够，返回最大可能组合
        const maxCombination = {};
        let maxTotal = 0;
        for (const currency of sortedCurrencies) {
            maxCombination[currency.key] = currency.num;
            maxTotal += currency.num * currency.price;
        }

        result.combination = maxCombination;
        result.totalValue = maxTotal;
        result.excess = maxTotal - targetValue;
    }

    return result;
}
export {};
