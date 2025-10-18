import { add_show_Tooltip, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, get_item_id_key } from '../../Function/Function.js';
import { format_numbers } from '../../Function/math_func.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';
//交易过程中的一个物品
class Goods_Item {
    constructor(id) {
        this.id = id; //物品id
        //当前数量
        //在当前商店的商品列表对象中，则是商店内的库存数量
        this.num = 0;
        //仅在商店货物积累与购买数量情况中记录，表示这个商品在过去被购买了多少个
        this.buy_num = 0;
        //上一次补货的时间
        this.last_replenish_time;
    }
}

//回购管理类
export class BuyBack_Manage {
    constructor() {
        this.store_Item_buy_back_goods = new Object(); //所有商店的回购商品列表
        this.store_last_clearance_time = new Object(); //所有商店的回购商品上次清理时间

        this.player_buyback_goods = new Object(); //玩家待回购物品
        this.buyback_price = new Object(); //玩家待回购的物品的总价值

        this.now_place; //商店地点id
        this.money_type = 'ordinary_coin'; //这个商店使用的货币类型
    }
    init(money_type, now_place) {
        this.money_type = money_type;
        this.now_place = now_place;
        //清空待购买物品
        this.player_buyback_goods = new Object();
        //重置价值
        this.buyback_price = new Object();
        this.buyback_price[this.money_type] = 0;
        //初始化当前商店的回购商品列表
        this.updata_store_Item_buy_back_goods();
        //刷新商店回购商品列表界面信息
        this.updata_store_IBB_value_div();
        //清空待回购界面
        this.updata_buyback_value_div();
    }
    //对商店管理类存档
    save_buyback_manage() {
        let buyback_save = new Object();
        //所有商店的物品购买情况，用于计算商品库存和涨价
        buyback_save.store_Item_buy_back_goods = this.store_Item_buy_back_goods;
        buyback_save.store_last_clearance_time = this.store_last_clearance_time;
        return buyback_save;
    }
    //加载商店存档
    load_buyback_manage(buyback_save) {
        this.store_Item_buy_back_goods = buyback_save.store_Item_buy_back_goods;
        this.store_last_clearance_time = buyback_save.store_last_clearance_time;
    }
    //向当前商店的可回购物品列表里新增一个项目
    add_store_Item_buy_back_goods(item_obj) {
        if (this.store_Item_buy_back_goods[this.now_place] === undefined) {
            this.store_Item_buy_back_goods[this.now_place] = new Object();
            console.log('商店的回购物品列表应该一开始就初始化完成，后续调用不应该出现空');
        }
        let item_goods = this.store_Item_buy_back_goods[this.now_place];
        let item_key = get_item_id_key(item_obj);
        if (is_Empty_Object(item_goods[item_key])) {
            item_goods[item_key] = item_obj;
        } else {
            item_goods[item_key].num += item_obj.num;
        }
    }
    //获取当前商店的可回购物品
    get_store_Item_buy_back_goods() {
        return this.store_Item_buy_back_goods[this.now_place];
    }
    //获取当前商店的可回购物品总价
    get_all_buyback_price() {
        return this.buyback_price[this.money_type];
    }
    //更新当前地点的回购列表
    updata_store_Item_buy_back_goods() {
        let game_now_time = global.get_game_now_time();
        if (is_Empty_Object(this.store_Item_buy_back_goods[this.now_place])) {
            //如果没有当前地点的回购商品缓存，则初始化
            this.store_Item_buy_back_goods[this.now_place] = new Object();
            this.store_last_clearance_time[this.now_place] = game_now_time;
        } else {
            //已有缓存，根据地点的清仓时间清理回购商品
            let clearance_time = places[this.now_place].clearance_time; //清仓时间
            let clearance_num = places[this.now_place].clearance_num; //清仓数量
            let last_clearance_time = this.store_last_clearance_time[this.now_place];
            if ((game_now_time - last_clearance_time) / 1000 < clearance_time) {
                //回购物品清理时间没到，不处理
                return;
            }
            let item_goods = this.store_Item_buy_back_goods[this.now_place]; //总回购物品列表
            for (let item_key in item_goods) {
                //按照地点规定，每种物品都清除一定比例的回购物品数量
                item_goods[item_key].num = Math.floor(item_goods[item_key].num * (100 - clearance_num) * 0.01);
                if (item_goods[item_key].num <= 0) {
                    //如果数量到0了，清除这个键值
                    delete item_goods[item_key];
                }
            }
            this.store_last_clearance_time[this.now_place] = game_now_time;
        }
    }
    //更新当前商店的回购商品界面内容
    updata_store_IBB_value_div() {
        // 缓存上次商品回购界面激活的分类条件
        let last_IBB_switch_type = get_store_IBB_switch_type();
        //清空商品界面的所有元素
        delete_store_IBB_div();
        //获取这次需要展示的物品的所有小类
        let Item_buy_back_list = this.get_store_Item_buy_back_goods();
        let all_IBB_secon_type = get_all_secon_type(Item_buy_back_list);
        //获取这次更新后应该激活的分类条件
        let now_IBB_switch_type = check_item_switch_type(last_IBB_switch_type, all_IBB_secon_type);
        //重新生成商店界面的分类条件按钮
        reset_IBB_switch_button(now_IBB_switch_type, all_IBB_secon_type);
        //转义物品类别
        let type_switch = item_switch_type_handle(now_IBB_switch_type);
        //获取当前商店界面激活的排序条件
        let IBB_sort_type = get_IBB_sort_type();
        //获取排序后的玩家所有物品的key集合
        let sort_item_array = get_all_item_id_array_sort(IBB_sort_type, Item_buy_back_list);

        //遍历商店的每个物品，按照物品的最大堆叠数量，显示到商店界面中
        for (let item_key of sort_item_array) {
            let good_obj = Item_buy_back_list[item_key];
            let item_id = good_obj.id;
            if (items[item_id] === undefined) {
                //玩家拥有的物品不在数据库中
                console.log('商品列表中出现了未定义物品 id=%s', item_id);
            } else if (Item_type_handle(type_switch, item_id)) {
                this.add_store_IBB_div_goods(good_obj);
            } else {
                // 玩家拥有的物品不属于当前启动的过滤规则，不显示
            }
        }
    }
    //向商店界面的商品列表里添加一个物品，并且点击之后进入待购买窗口
    add_store_IBB_div_goods(good_item) {
        //调整显示出来的数量
        let can_show_num;
        if (good_item.num == 'infinite') {
            //
            console.log('回购商品不应该出现无限数量的情况');
            can_show_num = '∞';
        } else {
            let buyback_num = this.get_buyback_goods_num(good_item); //这种物品玩家当前打算购买的数量
            can_show_num = good_item.num - buyback_num;
            if (can_show_num <= 0) {
                return;
            }
        }
        let IBB_value_div = document.getElementById('IBB_value_div');
        let aitem_div = addElement(IBB_value_div, 'div', null, 'goods_value');
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
        aitem_data.num = can_show_num;
        add_show_Tooltip(aitem_div, 'buyback_good', aitem_data);
        //添加鼠标点击可以回购的效果
        this.add_click_buyback_item(aitem_div, aitem_data);
    }

    //获取玩家某种待购买物品的数量
    get_buyback_goods_num(args) {
        let item_key;
        if (typeof args == 'object') {
            //输入的是物品对象，转换成key
            item_key = get_item_id_key(args);
        } else if (typeof args == 'string') {
            //输入的是key，直接使用
            item_key = args;
        }
        if (this.player_buyback_goods[item_key] === undefined) {
            //待购买物品库没有该物品，等于购买0个
            return 0;
        }

        //待购买物品库有这个物品，直接查询数量
        return this.player_buyback_goods[item_key].num;
    }
    // 向目标组件添加 点击之后放入待回购物品界面中的功能
    add_click_buyback_item(target_div, item_data) {
        target_div.addEventListener('click', () => {
            //获取当前购买数量设定
            let buy_quantity_button = document.getElementById('buy_quantity_button');
            let quantity_num = buy_quantity_button.dataset.quantity_num;

            let store_manage = global.get_store_manage();
            //将待购买的物品的数量设定成规定数量
            let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'buyback');
            //向商店管理类添加待购买物品信息
            this.set_player_buyback_goods(item_data);
            //更新控制界面中待购买物品界面
            this.updata_buyback_value_div();
            //更新控制界面中交易结果界面
            store_manage.updata_trade_result_div();
            //商店中的回购商品列表变化，更新界面
            this.updata_store_IBB_value_div();

            //关闭提示窗
            if (all_flag) {
                let tooltip = document.getElementById('tooltip');
                tooltip.CloseTip(); //清空小窗口
            }
        });
    }
    //添加玩家将要购买的物品
    set_player_buyback_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);

        //添加到玩家待购买物品中
        if (this.player_buyback_goods[item_key] === undefined) {
            this.player_buyback_goods[item_key] = item_obj;
        } else {
            this.player_buyback_goods[item_key].num += item_obj.num;
        }
        //计算添加后的待购买物品价值
        this.count_player_buyback_price();
    }
    //计算玩家购买的所有物品的价值
    count_player_buyback_price() {
        //获取当前商人使用的货币种类
        //清空总价值
        this.buyback_price = new Object();
        this.buyback_price[this.money_type] = 0;

        for (let item_key in this.player_buyback_goods) {
            let buyback_good_obj = this.player_buyback_goods[item_key];
            let id = buyback_good_obj.id;
            //物品没有定义价值，跳过处理
            if (is_Empty_Object(items[id].price)) {
                // console.log('%s物品没有定义价值');
                continue;
            }
            //物品没有定义当前商人使用的货币种类的价值，跳过处理
            if (is_Empty_Object(items[id].price[this.money_type])) {
                // console.log('%s物品没有定义%s类型货币的价值', id, this.money_type);
                continue;
            }
            let num = buyback_good_obj.num;
            if (num <= 0) {
                continue;
            }

            //获取这部分物品的购买价格
            let item_buyback_price = this.get_buyback_item_price(buyback_good_obj, num, 0);
            this.buyback_price[this.money_type] += item_buyback_price;
        }
    }
    //获取玩家回购指定物品的支出
    //num是玩家要出售的物品的指定数量
    //buyback_num是该物品在玩家待出售对象中已有的个数
    // 如果玩家已经出售了几个物品，需要基于这些物品的数量折算贬值情况
    // 如果没有，则基于80%售价开始计算
    get_buyback_item_price(item_obj, num, buyback_num = 'null') {
        let id = item_obj.id;
        let base_price; //物品基础价值
        if (is_Empty_Object(items[id].price[this.money_type])) {
            return 0;
        } else {
            base_price = items[id].price[this.money_type];
        }
        //判断物品是否保值，保值的物品不需要进行贬值计算
        for (let secon_type of items[id].secon_type) {
            if (enums['preserve_value_secon_type'].includes(secon_type)) {
                //根据小类推测，该物品是保值物品，直接使用价值乘数量得到结果
                return num * base_price;
            }
        }

        let maxStack = items[id].maxStack; //物品堆叠数
        let buyback_price = 0; //要出售的物品的总价
        //针对装备的稀有度，重算价值和堆叠数
        if (items[id].main_type.includes('equipment')) {
            let equip_rarity = item_obj.equip_rarity;
            let rarity_place_data = enums[equip_rarity].price_rate;
            base_price = base_price * rarity_place_data * 0.01;
            maxStack = maxStack * 5;
        }

        let price_multiple = 80; //初始回购倍率
        let depreciation = 0; //贬值档次
        //获取已经打算出售的同类物品数
        let item_key = get_item_id_key(item_obj);
        if (buyback_num == 'null') {
            buyback_num = this.get_buyback_goods_num(item_key);
        }
        // 计算当前的贬值档次
        depreciation += Math.floor(buyback_num / maxStack);
        buyback_num = buyback_num % maxStack;

        while (num) {
            //获取贬值之后的出售倍率
            let true_price_multiple = price_multiple - depreciation * 5;
            if (true_price_multiple < 10) {
                true_price_multiple = 10;
            }

            if (num > maxStack - buyback_num) {
                buyback_price += base_price * (maxStack - buyback_num) * true_price_multiple * 0.01;
                num -= maxStack - buyback_num;
                buyback_num = 0;
                depreciation++;
            } else {
                buyback_price += base_price * num * true_price_multiple * 0.01;
                break;
            }
        }
        //计算结果四舍五入取整
        let true_buyback_price = format_numbers(buyback_price);
        if (true_buyback_price == 0 && buyback_price > 0) {
            return 1;
        } else {
            return true_buyback_price;
        }
    }
    //获取玩家某种待回购物品的数量
    get_buyback_goods_num(args) {
        let item_key;
        if (typeof args == 'object') {
            //输入的是物品对象，转换成key
            item_key = get_item_id_key(args);
        } else if (typeof args == 'string') {
            //输入的是key，直接使用
            item_key = args;
        }
        if (this.player_buyback_goods[item_key] === undefined) {
            //待回购物品库没有该物品，等于回购0个
            return 0;
        }

        //待回购物品库有这个物品，直接查询数量
        return this.player_buyback_goods[item_key].num;
    }
    //更新玩家待回购物品界面内容
    updata_buyback_value_div() {
        let buyback_value_div = document.getElementById('buyback_value_div');
        buyback_value_div.replaceChildren(); //清空现有待出售物品界面
        let flag = false;

        for (let item_key in this.player_buyback_goods) {
            let good_obj = this.player_buyback_goods[item_key];
            let id = good_obj.id;
            if (good_obj.num <= 0) {
                continue;
            }

            let aitem_div = addElement(buyback_value_div, 'div', null, 'sell_buy_value');
            let name = items[id].name;
            aitem_div.innerHTML = name + ' x' + good_obj.num;
            if (items[id].main_type.includes('equipment')) {
                //根据装备稀有度调整文字颜色
                aitem_div.style.color = enums[good_obj.equip_rarity].rarity_color;
            }
            //给div添加鼠标移动上去显示提示的效果
            let aitem_data = JSON.parse(JSON.stringify(good_obj));
            add_show_Tooltip(aitem_div, 'buyback_good', aitem_data);
            //添加鼠标点击取消出售的效果
            this.add_click_buyback_item_remove(aitem_div, aitem_data);
            flag = true;
        }
        let buyback_name_div = document.getElementById('buyback_name_div');
        if (flag) {
            //如果待回购物品里没有物品，同时需要隐藏表头
            buyback_name_div.style.display = '';
        } else {
            //有物品，正常显示表头
            buyback_name_div.style.display = 'none';
        }
    }
    // 向目标组件添加 点击之后从待购买物品界面中删除 的功能
    add_click_buyback_item_remove(target_div, item_data) {
        target_div.addEventListener('click', () => {
            //获取当前购买数量设定
            let buy_quantity_button = document.getElementById('buy_quantity_button');
            let quantity_num = buy_quantity_button.dataset.quantity_num;

            let store_manage = global.get_store_manage();
            //将待购买的物品的数量设定成规定数量
            let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'no_buyback');
            //从待购买物品中删除物品
            this.remove_player_buyback_goods(item_data);
            //物品变化，更新待购买界面
            this.updata_buyback_value_div();
            //更新回购商品列表界面
            this.updata_store_IBB_value_div();
            //更新交易结果界面
            store_manage.updata_trade_result_div();

            //关闭提示窗
            if (all_flag) {
                let tooltip = document.getElementById('tooltip');
                tooltip.CloseTip(); //清空小窗口
            }
        });
    }
    //从玩家待回购物品库中删除指定物品
    remove_player_buyback_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);

        if (this.player_buyback_goods[item_key] === undefined) {
            console.log('要删除的物品在待回购物品库中不存在，逻辑上属于异常情况');
            return;
        }
        if (this.player_buyback_goods[item_key].num < item_obj.num) {
            console.log('待购买物品删除数量比回购物品库中数量要多，没有设置好待购买物品的数量');
            return;
        }
        this.player_buyback_goods[item_key].num -= item_obj.num;
        //计算删除后的待购买物品价值
        this.count_player_buyback_price();
    }
    //达成交易，回购物品放入玩家背包
    complete_trade() {
        for (let item_key in this.player_buyback_goods) {
            if (this.player_buyback_goods[item_key].num <= 0) {
                continue;
            }
            //给予玩家物品
            player.Player_get_item(this.player_buyback_goods[item_key]);
            //商店的回购物品列表减少对应的数量
            this.store_Item_buy_back_goods[this.now_place][item_key].num -= this.player_buyback_goods[item_key].num;
        }
        //清空待购买物品
        this.player_buyback_goods = new Object();
        //重置价值
        this.buyback_price = new Object();
        this.buyback_price[this.money_type] = 0;
        //清空待购买界面
        this.updata_buyback_value_div();
    }
}
//获取商店回购界面中激活的过滤条件
function get_store_IBB_switch_type() {
    const radios = document.querySelectorAll('input[name="IBB_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//清空中上商店回购界面的所有元素
function delete_store_IBB_div() {
    let IBB_value_div = document.getElementById('IBB_value_div');
    IBB_value_div.replaceChildren(); //清空现有商店的商品列表内展示的物品
    let IBB_EQP_droptable = document.getElementById('IBB_EQP_droptable');
    IBB_EQP_droptable.replaceChildren(); //清空装备的过滤选项
    let IBB_CSB_droptable = document.getElementById('IBB_CSB_droptable');
    IBB_CSB_droptable.replaceChildren(); //清空消耗品的过滤选项
    let IBB_MTR_droptable = document.getElementById('IBB_MTR_droptable');
    IBB_MTR_droptable.replaceChildren(); //清空材料的过滤选项
}
//获取输入的物品列表内所有物品的所有小类
function get_all_secon_type(Item_buy_back_goods) {
    let all_secon_type = new Array();
    for (let item_key in Item_buy_back_goods) {
        //未拥有数量的物品不展示
        if (Item_buy_back_goods[item_key].num == 0) {
            continue;
        }
        let id = Item_buy_back_goods[item_key].id;
        all_secon_type = all_secon_type.concat(items[id].secon_type);
    }
    all_secon_type = get_uniqueArr(all_secon_type);
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
function reset_IBB_switch_button(now_IBB_switch_type, all_IBB_secon_type) {
    let IBB_EQP_droptable = document.getElementById('IBB_EQP_droptable');
    let IBB_CSB_droptable = document.getElementById('IBB_CSB_droptable');
    let IBB_MTR_droptable = document.getElementById('IBB_MTR_droptable');
    let checked_flag = false; //激活过滤条件是否完成
    if (now_IBB_switch_type == 'all') {
        let IBB_ALL_radio_div = document.getElementById('IBB_ALL_radio_div');
        IBB_ALL_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成三个大类的“全部”分类按钮
    let IBB_EQP_all_radio_div = addElement(IBB_EQP_droptable, 'div', 'IBB_EQP_all_radio_div', 'radio_div switch_radio_div_2');
    let IBB_EQP_all_radio = addElement_radio(IBB_EQP_all_radio_div, 'IBB_EQP_all', 'IBB_switch', 'equipment_all', '全部');
    add_click_updata_IBB_value(IBB_EQP_all_radio); //给按钮绑定点击事件
    if (now_IBB_switch_type == 'equipment_all') {
        IBB_EQP_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let IBB_CSB_all_radio_div = addElement(IBB_CSB_droptable, 'div', 'IBB_CSB_all_radio_div', 'radio_div switch_radio_div_2');
    let IBB_CSB_all_radio = addElement_radio(IBB_CSB_all_radio_div, 'IBB_CSB_all', 'IBB_switch', 'consumable_all', '全部');
    add_click_updata_IBB_value(IBB_CSB_all_radio); //给按钮绑定点击事件
    if (now_IBB_switch_type == 'consumable_all') {
        IBB_CSB_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }
    let IBB_MTR_all_radio_div = addElement(IBB_MTR_droptable, 'div', 'IBB_MTR_all_radio_div', 'radio_div switch_radio_div_2');
    let IBB_MTR_all_radio = addElement_radio(IBB_MTR_all_radio_div, 'IBB_MTR_all', 'IBB_switch', 'material_all', '全部');
    add_click_updata_IBB_value(IBB_MTR_all_radio); //给按钮绑定点击事件
    if (now_IBB_switch_type == 'material_all') {
        IBB_MTR_all_radio_div.children[0].checked = true;
        checked_flag = true;
    }

    //生成每个小类的分类按钮
    for (let IBB_secon_type of all_IBB_secon_type) {
        if (is_Empty_Object(texts[IBB_secon_type])) {
            console.log('没有定义%s小类的名称', IBB_secon_type);
            continue;
        }
        let radio_div;
        let radio;
        //属于装备大类的小类
        if (enums['Equipment_secon_type'].includes(IBB_secon_type)) {
            radio_div = addElement(IBB_EQP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'IBB_EQP_' + IBB_secon_type;
            let radio_text = texts[IBB_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'IBB_switch', IBB_secon_type, radio_text);
        }
        //属于消耗品大类的小类
        if (enums['Consumable_secon_type'].includes(IBB_secon_type)) {
            radio_div = addElement(IBB_CSB_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'IBB_CSB_' + IBB_secon_type;
            let radio_text = texts[IBB_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'IBB_switch', IBB_secon_type, radio_text);
        }
        //属于材料大类的小类
        if (enums['Material_secon_type'].includes(IBB_secon_type)) {
            radio_div = addElement(IBB_MTR_droptable, 'div', null, 'radio_div switch_radio_div_2');
            let radio_id = 'IBB_MTR_' + IBB_secon_type;
            let radio_text = texts[IBB_secon_type].type_name;
            radio = addElement_radio(radio_div, radio_id, 'IBB_switch', IBB_secon_type, radio_text);
        }
        //激活过滤条件
        if (checked_flag == false && now_IBB_switch_type == IBB_secon_type) {
            radio_div.children[0].checked = true;
            checked_flag = true;
        }
        add_click_updata_IBB_value(radio); //给按钮绑定点击事件
    }

    if (checked_flag == false) {
        console.log('生成商店回购界面的过滤条件时找不到需要激活的过滤条件');
    }
}
// 向目标组件添加 点击之后过滤商店中的商品列表 的功能
function add_click_updata_IBB_value(target_div) {
    target_div.addEventListener('click', function () {
        if (this.id == 'IBB_all') {
            //针对商品列表界面的“全部”按钮，额外新增关闭其他下拉框的功能
            show_dropdown_table('IBB_switch_div');
        }
        let store_manage = global.get_store_manage();
        let buyback_manage = store_manage.get_buyback_manage();
        buyback_manage.updata_store_IBB_value_div();
    });
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
function get_IBB_sort_type() {
    const radios = document.querySelectorAll('input[name="IBB_sort"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}
//根据排序方式，对物品队列进行排序，获得排序后的物品id集合
function get_all_item_id_array_sort(sort_type, Item_buy_back_goods) {
    let sortData = new Object();
    let arr = Object.keys(Item_buy_back_goods); //将拥有的物品的key转换成一个数组
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
            sortData[item_key] = Item_buy_back_goods[item_key].num;
        } else if (sort_type == 'price_sort') {
            let id = Item_buy_back_goods[item_key].id;
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
