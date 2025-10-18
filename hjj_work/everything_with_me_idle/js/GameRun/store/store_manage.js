import { add_show_Tooltip, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, get_item_id_key } from '../../Function/Function.js';
import { format_numbers } from '../../Function/math_func.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';
import { Sell_Manage } from './sell.js';
import { Buy_Manage } from './buy.js';
import { BuyBack_Manage } from './buyback.js';

export class Store_manage {
    constructor() {
        //出售管理类
        this.sell_manage = new Sell_Manage();
        //购买管理类
        this.buy_manage = new Buy_Manage();
        //回购管理类
        this.buyback_manage = new BuyBack_Manage();

        this.now_place; //商店地点id
        this.money_type = 'ordinary_coin'; //这个商店使用的货币类型
        this.last_normal_money_type = 'ordinary_coin'; //最近一次用过的正常的货币类型
    }
    //对商店管理类存档
    save_Store_manage() {
        let store_save = new Object();
        //出售类没有需要保存的数据
        // store_save.sell_save = this.sell_manage.save_sell_manage();
        store_save.buy_save = this.buy_manage.save_buy_manage();
        store_save.buyback_save = this.buyback_manage.save_buyback_manage();
        return store_save;
    }
    //加载商店存档
    load_Store_manage(store_save) {
        if (is_Empty_Object(store_save)) {
            return;
        }
        //出售类没有需要保存的数据
        // this.sell_manage.load_sell_manage(store_save.sell_save);
        if (!is_Empty_Object(store_save.buy_save)) {
            this.buy_manage.load_buy_manage(store_save.buy_save);
        }
        if (!is_Empty_Object(store_save.buyback_save)) {
            this.buyback_manage.load_buyback_manage(store_save.buyback_save);
        }
    }
    //地点更新，初始化商店管理类
    set_new_place(next_place) {
        this.now_place = next_place;
        //更新这个商店使用的货币种类
        this.updata_money_type(next_place);

        //初始化商店管理类
        this.sell_manage.init(this.money_type);
        this.buy_manage.init(this.money_type, this.now_place);
        this.buyback_manage.init(this.money_type, this.now_place);

        //刷新交易结果界面
        this.updata_trade_result_div();
        //刷新商店商品列表界面信息
        this.updata_store_PL_value_div();
    }
    get_sell_manage() {
        return this.sell_manage;
    }
    get_buy_manage() {
        return this.buy_manage;
    }
    get_buyback_manage() {
        return this.buyback_manage;
    }

    //根据设定的批量选择数，修改单格物品数据中的数量
    set_quantity_num(quantity_num, item_data, type) {
        let all_flag = false;
        if (type == 'sell' || type == 'no_sell' || type == 'no_buy' || type == 'buyback' || type == 'no_buyback') {
            //最大值基于单格物品存储的数量
            if (quantity_num == 'half') {
                //选择一半的物品
                let half_num = Math.ceil(item_data.num / 2);
                if (item_data.num == half_num) {
                    all_flag = true;
                }
                item_data.num = half_num;
            } else if (quantity_num == 'all') {
                //选择全部物品，不需要修改数量
                all_flag = true;
            } else {
                //选择指定数量
                quantity_num = parseInt(quantity_num);
                if (item_data.num > quantity_num) {
                    //指定数量较少，设置为指定数量
                    item_data.num = quantity_num;
                } else {
                    //指定数量较多，等同于全部，不需要设置
                    all_flag = true;
                }
            }
        } else if (type == 'buy') {
            //购买物品，最大值是这个物品可购买的最大数量
            let buy_goods_num = this.buy_manage.get_buy_goods_num(item_data); //同类物品已经待购买的数量
            let can_buy_inventory = item_data.inventory - buy_goods_num; //总库存-待购买数=剩余可购买数量
            if (quantity_num == 'half') {
                //选择一半的物品
                //获取当前玩家背包里的总货币
                let P_backpack = player.get_player_backpack();
                let money = P_backpack.get_BP_money_type_num(this.money_type); //玩家背包总货币
                let buy_price = this.buy_manage.get_all_buy_price(); //当前待购买物品要支出的货币
                buy_price += this.buyback_manage.get_all_buyback_price();
                let can_use_money = money - buy_price; //当前还能用的货币
                let buy_max_num = this.buy_manage.get_money_buy_item_max_num(item_data, can_use_money); //理论最大可购买数量
                if (item_data.inventory == 'infinite') {
                    item_data.num = Math.ceil(buy_max_num / 2);
                } else if (can_buy_inventory >= buy_max_num) {
                    item_data.num = Math.ceil(buy_max_num / 2);
                    if (item_data.num == can_buy_inventory) {
                        all_flag = true;
                    }
                } else if (can_buy_inventory < buy_max_num) {
                    item_data.num = Math.ceil(can_buy_inventory / 2);
                    if (item_data.num == can_buy_inventory) {
                        all_flag = true;
                    }
                }
            } else if (quantity_num == 'all') {
                //选择全部物品
                let P_backpack = player.get_player_backpack();
                let money = P_backpack.get_BP_money_type_num(this.money_type); //玩家背包总货币
                let buy_price = this.buy_manage.get_all_buy_price(); //当前待购买物品要支出的货币
                buy_price += this.buyback_manage.get_all_buyback_price();
                let can_use_money = money - buy_price; //当前还能用的货币
                let buy_max_num = this.buy_manage.get_money_buy_item_max_num(item_data, can_use_money); //理论最大可购买数量
                if (item_data.inventory == 'infinite') {
                    //库存是无限的，全部物品就等于最大可购买数
                    item_data.num = buy_max_num;
                } else if (can_buy_inventory >= buy_max_num) {
                    //库存有限，但剩余库存大于最大可购买数，全部物品也等于最大可购买数
                    item_data.num = buy_max_num;
                    if (item_data.num == can_buy_inventory) {
                        all_flag = true;
                    }
                } else if (can_buy_inventory < buy_max_num) {
                    //库存有限，剩余库存小于最大可购买数，全部物品就等于剩余库存
                    item_data.num = can_buy_inventory;
                    if (item_data.num == can_buy_inventory) {
                        all_flag = true;
                    }
                }
                all_flag = true;
            } else {
                //选择指定数量
                quantity_num = parseInt(quantity_num);
                if (item_data.inventory == 'infinite') {
                    //库存是无限的
                    item_data.num = quantity_num;
                } else if (can_buy_inventory > quantity_num) {
                    //库存有限
                    item_data.num = quantity_num;
                } else {
                    //库存有限
                    item_data.num = can_buy_inventory;
                    all_flag = true;
                }
            }
        }
        return all_flag;
    }

    //更新交易结果界面
    updata_trade_result_div() {
        let trade_result_name_div = document.getElementById('trade_result_name_div');
        let money_type_name = texts[this.money_type].money_type_name;
        //出售物品总收入
        let sell_price = this.sell_manage.get_all_sell_price();
        //购买物品总支出
        let buy_price = this.buy_manage.get_all_buy_price();
        buy_price += this.buyback_manage.get_all_buyback_price();
        let ch = '交易结果<br>';
        ch += '收入：' + sell_price + money_type_name + '<br>';
        ch += '支出：' + buy_price + money_type_name + '<br>';
        trade_result_name_div.innerHTML = ch;

        //根据支出收入判断是否可以交易
        let trade_button = document.getElementById('trade_button');
        let trade_button_overlay = document.getElementById('trade_button_overlay');
        if (sell_price < buy_price) {
            //不可交易，显示遮罩并关闭按钮的点击效果
            trade_button.style.pointerEvents = 'none';
            trade_button_overlay.style.display = '';
        } else {
            //可以交易，正常显示
            trade_button.style.pointerEvents = '';
            trade_button_overlay.style.display = 'none';
        }
    }
    //获取商店使用的货币类型
    get_store_use_money_type() {
        return this.money_type;
    }
    //获取最近一次用过的正常的货币类型
    get_last_normal_money_type() {
        return this.last_normal_money_type;
    }
    //获取当前地点
    get_store_place() {
        return this.now_place;
    }
    //更新这个地点使用的货币种类
    updata_money_type(next_place) {
        if (places[next_place].use_money_type === undefined) {
            console.log('%s商店没有设置交易货币种类', next_place);
        }
        let store_money_type = places[next_place].use_money_type;

        if (enums['normal_momey_type'].includes(store_money_type)) {
            this.last_normal_money_type = store_money_type;
        }
        this.money_type = store_money_type;
    }
    //更新当前商店的商品界面内容
    updata_store_PL_value_div() {
        // 缓存上次商品界面激活的分类条件
        let last_PL_switch_type = get_store_PL_switch_type();
        //清空商品界面的所有元素
        delete_store_PL_div();
        //获取这次需要展示的物品的所有小类
        let product_list = this.buy_manage.get_store_product_list_goods();
        let all_PL_secon_type = get_all_secon_type(product_list);
        //获取这次更新后应该激活的分类条件
        let now_PL_switch_type = check_item_switch_type(last_PL_switch_type, all_PL_secon_type);
        //重新生成商店界面的分类条件按钮
        reset_PL_switch_button(now_PL_switch_type, all_PL_secon_type);
        //转义物品类别
        let type_switch = item_switch_type_handle(now_PL_switch_type);
        //获取当前商店界面激活的排序条件
        let PL_sort_type = get_PL_sort_type();
        //获取排序后的玩家所有物品的key集合
        let sort_item_array = get_all_item_id_array_sort(PL_sort_type, product_list);

        //遍历商店的每个物品，按照物品的最大堆叠数量，显示到商店界面中
        for (let item_key of sort_item_array) {
            let good_obj = product_list[item_key];
            let item_id = good_obj.id;
            if (items[item_id] === undefined) {
                //玩家拥有的物品不在数据库中
                console.log('商品列表中出现了未定义物品 id=%s', item_id);
            } else if (Item_type_handle(type_switch, item_id)) {
                add_store_div_goods(good_obj);
            } else {
                // 玩家拥有的物品不属于当前启动的过滤规则，不显示
            }
        }
    }
    //尝试使用背包中的货币补齐交易所需
    supplement_money() {
        //出售物品总收入
        let sell_price = this.sell_manage.get_all_sell_price();
        //购买物品总支出
        let buy_price = this.buy_manage.get_all_buy_price();
        buy_price += this.buyback_manage.get_all_buyback_price();

        if (sell_price >= buy_price) {
            //可以交易，尝试让商人找零
            let need_money = sell_price - buy_price;
            this.buy_manage.supplement_money(this.money_type, need_money, 'for_buy');
            // 更新商店货物界面
            this.updata_store_PL_value_div();
        } else {
            //计算需要补充的货币数
            let P_backpack = player.get_player_backpack();
            let need_money = buy_price - sell_price; //当前为了达成交易还需要补齐的货币

            //根据需要的货币，自动补齐数量，放入待出售界面
            let result = P_backpack.supplement_money(this.money_type, need_money);
            if (!result.isExact) {
                // 如果自动补齐时是超额补齐，则尝试从商店中补齐差额货币，简单来说，让商人找零
                this.buy_manage.supplement_money(this.money_type, result.excess, 'for_buy');
                // 更新商店货物界面
                this.updata_store_PL_value_div();
            }
        }
        //刷新交易结果界面
        this.updata_trade_result_div();
    }
    // 根据当前待购买和待出售物品，完成交易
    complete_trade() {
        //出售物品总收入
        let sell_price = this.sell_manage.get_all_sell_price();
        //购买物品总支出
        let buy_price = this.buy_manage.get_all_buy_price();
        buy_price += this.buyback_manage.get_all_buyback_price();

        if (sell_price < buy_price) {
            //不可交易，理论上不能执行这个函数
            console.log('支出与收入不符合，不可交易，不应该调用交易函数');
            return;
        }
        //可以交易
        //商人补给玩家差价
        let need_money = sell_price - buy_price;
        if (need_money > 0) {
            this.buy_manage.supplement_money(this.money_type, need_money, 'for_backpack');
        }

        //玩家待出售的物品放入这个商人的回购列表
        this.sell_manage.complete_trade();

        //玩家待购买的物品放入背包
        this.buy_manage.complete_trade();
        this.buyback_manage.complete_trade();

        //刷新背包界面
        let P_backpack = player.get_player_backpack();
        P_backpack.updata_BP_value();
        //刷新交易结果界面
        this.updata_trade_result_div();
    }
}

//获取商店界面中激活的过滤条件
function get_store_PL_switch_type() {
    const radios = document.querySelectorAll('input[name="PL_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//清空中上商店界面的所有元素
function delete_store_PL_div() {
    let PL_value_div = document.getElementById('PL_value_div');
    PL_value_div.replaceChildren(); //清空现有商店的商品列表内展示的物品
    let PL_EQP_droptable = document.getElementById('PL_EQP_droptable');
    PL_EQP_droptable.replaceChildren(); //清空装备的过滤选项
    let PL_CSB_droptable = document.getElementById('PL_CSB_droptable');
    PL_CSB_droptable.replaceChildren(); //清空消耗品的过滤选项
    let PL_MTR_droptable = document.getElementById('PL_MTR_droptable');
    PL_MTR_droptable.replaceChildren(); //清空材料的过滤选项
}
//获取输入的物品列表内所有可出售物品的所有小类
function get_all_secon_type(store_product_list) {
    let all_secon_type = new Array();
    for (let item_key in store_product_list) {
        //未拥有数量的物品不展示
        if (store_product_list[item_key].num == 0) {
            continue;
        }
        let id = store_product_list[item_key].id;
        all_secon_type = all_secon_type.concat(items[id].secon_type);
    }
    //去重
    all_secon_type = get_uniqueArr(all_secon_type);
    //排序
    all_secon_type = all_secon_type.sort((a, b) => enums['secon_type_sort'][a] - enums['secon_type_sort'][b]);

    return all_secon_type;
}
//检查之前屏幕上激活的过滤条件在更新后是否适用，返回更新后适用的当前激活过滤条件
function check_item_switch_type(last_switch_type, all_secon_type) {
    if (last_switch_type == 'all' || last_switch_type == 'equipment_all' || last_switch_type == 'consumable_all' || last_switch_type == 'material_all') {
        //之前激活的过滤条件是所有物品或者三大分类的“全部”过滤条件，可以继续使用
        return last_switch_type;
    }
    if (all_secon_type.includes(last_switch_type)) {
        //之前激活的过滤条件在更新后依然存在，继续使用
        return last_switch_type;
    }
    //之前激活的过滤条件已经不适用，换成之前条件的大类的“全部”过滤条件
    if (enums['Equipment_secon_type'].includes(last_switch_type)) {
        return 'equipment_all';
    }
    if (enums['Consumable_secon_type'].includes(last_switch_type)) {
        return 'consumable_all';
    }
    if (enums['Material_secon_type'].includes(last_switch_type)) {
        return 'material_all';
    }
}
//生成商品列表界面的分类过滤按钮
function reset_PL_switch_button(now_PL_switch_type, all_PL_secon_type) {
    let PL_EQP_droptable = document.getElementById('PL_EQP_droptable');
    let PL_CSB_droptable = document.getElementById('PL_CSB_droptable');
    let PL_MTR_droptable = document.getElementById('PL_MTR_droptable');
    let checked_flag = false; //激活过滤条件是否完成
    if (now_PL_switch_type == 'all') {
        let PL_ALL_radio_div = document.getElementById('PL_ALL_radio_div');
        PL_ALL_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成三个大类的“全部”分类按钮
    let PL_EQP_all_radio_div = addElement(PL_EQP_droptable, 'div', 'PL_EQP_all_radio_div', 'radio_div switch_radio_div_2');
    let PL_EQP_all_radio = addElement_radio(PL_EQP_all_radio_div, 'PL_EQP_all', 'PL_switch', 'equipment_all', '全部');
    add_click_updata_PL_value(PL_EQP_all_radio); //给按钮绑定点击事件
    if (now_PL_switch_type == 'equipment_all') {
        PL_EQP_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let PL_CSB_all_radio_div = addElement(PL_CSB_droptable, 'div', 'PL_CSB_all_radio_div', 'radio_div switch_radio_div_2');
    let PL_CSB_all_radio = addElement_radio(PL_CSB_all_radio_div, 'PL_CSB_all', 'PL_switch', 'consumable_all', '全部');
    add_click_updata_PL_value(PL_CSB_all_radio); //给按钮绑定点击事件
    if (now_PL_switch_type == 'consumable_all') {
        PL_CSB_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let PL_MTR_all_radio_div = addElement(PL_MTR_droptable, 'div', 'PL_MTR_all_radio_div', 'radio_div switch_radio_div_2');
    let PL_MTR_all_radio = addElement_radio(PL_MTR_all_radio_div, 'PL_MTR_all', 'PL_switch', 'material_all', '全部');
    add_click_updata_PL_value(PL_MTR_all_radio); //给按钮绑定点击事件
    if (now_PL_switch_type == 'material_all') {
        PL_MTR_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成每个小类的分类按钮
    for (let PL_secon_type of all_PL_secon_type) {
        if (is_Empty_Object(texts[PL_secon_type])) {
            console.log('没有定义%s小类的名称', PL_secon_type);
            continue;
        }
        let radio_div;
        let radio;
        //属于装备大类的小类
        if (enums['Equipment_secon_type'].includes(PL_secon_type)) {
            radio_div = addElement(PL_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'PL_EQP_' + PL_secon_type;
            let radio_text = texts[PL_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'PL_switch', PL_secon_type, radio_text);
        }
        //属于消耗品大类的小类
        if (enums['Consumable_secon_type'].includes(PL_secon_type)) {
            radio_div = addElement(PL_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'PL_CSB_' + PL_secon_type;
            let radio_text = texts[PL_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'PL_switch', PL_secon_type, radio_text);
        }
        //属于材料大类的小类
        if (enums['Material_secon_type'].includes(PL_secon_type)) {
            radio_div = addElement(PL_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'PL_MTR_' + PL_secon_type;
            let radio_text = texts[PL_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'PL_switch', PL_secon_type, radio_text);
        }
        //激活过滤条件
        if (checked_flag == false && now_PL_switch_type == PL_secon_type) {
            radio_div.children[0].checked = true;
            checked_flag = true;
        }
        add_click_updata_PL_value(radio); //给按钮绑定点击事件
    }

    if (checked_flag == false) {
        console.log('生成商店界面的过滤条件时找不到需要激活的过滤条件');
    }
}
//将物品过滤条件类型转义成能适应的全部类型，方便判断物品类型
function item_switch_type_handle(item_switch_type) {
    var item_types = [];
    if (item_switch_type === undefined) {
        return item_types;
    }

    if (item_switch_type == 'all') {
        //全部物品
        item_types = ['equipment', 'consumable', 'material'];
    } else if (item_switch_type == 'equipment_all') {
        //武器装备，全部
        item_types = ['equipment'];
    } else if (item_switch_type == 'consumable_all') {
        //消耗品，全部
        item_types = ['consumable'];
    } else if (item_switch_type == 'material_all') {
        //材料，全部
        item_types = ['material'];
    } else {
        //某个小类
        item_types = [item_switch_type];
    }

    return item_types;
}
//获取当前商店界面激活的排序条件
function get_PL_sort_type() {
    const radios = document.querySelectorAll('input[name="PL_sort"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//根据排序方式，对物品队列进行排序，获得排序后的物品id集合
function get_all_item_id_array_sort(sort_type, store_product_list) {
    let sortData = new Object();
    let arr = Object.keys(store_product_list); //将拥有的物品的key转换成一个数组
    let money_type;
    if (sort_type == 'price_sort') {
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
        if (sort_type == 'num_sort') {
            sortData[item_key] = store_product_list[item_key].num;
        } else if (sort_type == 'price_sort') {
            let id = store_product_list[item_key].id;
            if (is_Empty_Object(items[id].price)) {
                sortData[item_key] = 0;
            } else {
                if (items[id].price[money_type] === undefined) {
                    sortData[item_key] = 0;
                } else {
                    sortData[item_key] = items[id].price[money_type];
                }
            }
        }
    }
    //对关键数据进行排序
    let key_arr = Object.keys(sortData).sort((a, b) => sortData[b] - sortData[a]);

    let test = Array();
    for (let id of key_arr) {
        let test_obj = new Object();
        test_obj[id] = sortData[id];
        test.push(test_obj);
    }
    return key_arr;
}

// 向目标组件添加 点击之后过滤商店中的商品列表 的功能
function add_click_updata_PL_value(target_div) {
    target_div.addEventListener('click', function () {
        if (this.id == 'PL_all') {
            //针对商品列表界面的“全部”按钮，额外新增关闭其他下拉框的功能
            show_dropdown_table('PL_switch_div');
        }
        let store_manage = global.get_store_manage();
        store_manage.updata_store_PL_value_div();
    });
}
//向商店界面的商品列表里添加一个物品，并且点击之后进入待购买窗口
function add_store_div_goods(good_item) {
    //调整显示出来的数量
    let can_show_num;
    if (good_item.inventory == 'infinite') {
        can_show_num = '∞';
    } else {
        let store_manage = global.get_store_manage();
        let buy_manage = store_manage.get_buy_manage();
        let buy_num = buy_manage.get_buy_goods_num(good_item); //这种物品玩家当前打算购买的数量
        can_show_num = good_item.inventory - buy_num;
        if (can_show_num <= 0) {
            return;
        }
    }
    let PL_value_div = document.getElementById('PL_value_div');
    let aitem_div = addElement(PL_value_div, 'div', null, 'goods_value');
    if (items[good_item.id].main_type.includes('equipment')) {
        //根据装备稀有度调整文字颜色
        aitem_div.style.color = enums[good_item.equip_rarity].rarity_color;
    }

    //物品名称
    let name = items[good_item.id].name;
    aitem_div.innerHTML = name + ' x ' + can_show_num;

    //给商店中的物品添加鼠标移动上去显示提示的效果
    let aitem_data = new Object();
    aitem_data = JSON.parse(JSON.stringify(good_item));
    add_show_Tooltip(aitem_div, 'buy_good', aitem_data);
    //添加鼠标点击可以购买的效果
    add_click_buy_item(aitem_div, aitem_data);
}
// 向目标组件添加 点击之后放入待购买物品界面中的功能
function add_click_buy_item(target_div, item_data) {
    target_div.addEventListener('click', () => {
        //获取当前购买数量设定
        let buy_quantity_button = document.getElementById('buy_quantity_button');
        let quantity_num = buy_quantity_button.dataset.quantity_num;

        let store_manage = global.get_store_manage();
        let buy_manage = store_manage.get_buy_manage();
        //将待购买的物品的数量设定成规定数量
        let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'buy');
        //向商店管理类添加待购买物品信息
        buy_manage.set_player_buy_goods(item_data);
        //更新控制界面中待购买物品界面
        buy_manage.updata_buy_value_div();
        //更新控制界面中交易结果界面
        store_manage.updata_trade_result_div();
        //商店中的商品列表变化，更新界面
        store_manage.updata_store_PL_value_div();

        //关闭提示窗
        if (all_flag) {
            let tooltip = document.getElementById('tooltip');
            tooltip.CloseTip(); //清空小窗口
        }
    });
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
