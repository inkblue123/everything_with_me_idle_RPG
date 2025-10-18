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

//常规购买管理类
export class Buy_Manage {
    constructor() {
        this.store_product_list_goods = new Object(); //当前商店的商品列表
        this.store_buy_goods_cumulative = new Object(); //各个商店货物的购买数量情况

        this.player_buy_goods = new Object(); //玩家待购买物品
        this.buy_price = new Object(); //玩家待购买的物品的总价值

        this.now_place; //商店地点id
        this.money_type = 'ordinary_coin'; //这个商店使用的货币类型
    }
    init(money_type, now_place) {
        this.money_type = money_type;
        this.now_place = now_place;
        //清空待购买物品
        this.player_buy_goods = new Object();
        //重置价值
        this.buy_price = new Object();
        this.buy_price[this.money_type] = 0;
        //更新当前商店的货物积累与购买数量情况
        this.updata_store_goods_cumulative();
        //初始化当前商店的商品列表
        this.init_store_product_list_goods();
        //清空待购买界面
        this.updata_buy_value_div;
    }
    //对商店管理类存档
    save_buy_manage() {
        let buy_save = new Object();
        //所有商店的物品购买情况，用于计算商品库存和涨价
        buy_save.store_buy_goods_cumulative = this.store_buy_goods_cumulative;
        return buy_save;
    }
    //加载商店存档
    load_buy_manage(buy_save) {
        this.store_buy_goods_cumulative = buy_save.store_buy_goods_cumulative;
    }
    //更新当前地点的商品积累与购买情况
    updata_store_goods_cumulative() {
        let game_now_time = global.get_game_now_time();
        //如果没有当前地点的情况缓存，则初始化
        if (is_Empty_Object(this.store_buy_goods_cumulative[this.now_place])) {
            let fixed_goods = places[this.now_place].fixed_goods;
            let goods_cumulative = new Object();
            for (let item_key in fixed_goods) {
                let id = fixed_goods[item_key].id;
                //商品库存
                if (fixed_goods[item_key].inventory != 'infinite') {
                    //有限库存商品才需要记录数据，才有必要初始化
                    goods_cumulative[item_key] = new Goods_Item(id);
                }
                //补货时间
                if (fixed_goods[item_key].replenish_time != null) {
                    goods_cumulative[item_key].last_replenish_time = game_now_time;
                }
            }
            this.store_buy_goods_cumulative[this.now_place] = goods_cumulative;
        } else {
            //当前地点已有购买情况缓存，根据时间计算补货情况
            let fixed_goods = places[this.now_place].fixed_goods;
            for (let item_key in this.store_buy_goods_cumulative[this.now_place]) {
                let goods_cumulative = this.store_buy_goods_cumulative[this.now_place][item_key];
                if (fixed_goods[item_key].replenish_time == null) {
                    //这个商品没有补货时间，永远不会补货，不处理
                    continue;
                }
                let replenish_time = fixed_goods[item_key].replenish_time; //这个商品的补货间隔
                let replenish_num = fixed_goods[item_key].replenish_num; //这个商品每次补货的数量
                let last_replenish_time = goods_cumulative.last_replenish_time; //这个商品上次补货的时间
                if ((game_now_time - last_replenish_time) / 1000 < replenish_time) {
                    //没到补货时间，不处理
                    continue;
                }
                //商品库存具体是由总库存-已购买数量，所以补货只需要清理已购买数量即可
                if (goods_cumulative.buy_num >= replenish_num) {
                    goods_cumulative.buy_num -= replenish_num;
                } else {
                    goods_cumulative.buy_num = 0;
                }
                //重置上次补货时间
                goods_cumulative.last_replenish_time = game_now_time;
            }
        }
    }
    //初始化当前地点的商品列表
    init_store_product_list_goods() {
        //清空当前商店的商品列表
        this.store_product_list_goods = new Object();
        //读取地点库中的商品，先读取固定商品
        let fixed_goods = places[this.now_place].fixed_goods;

        let goods_cumulative = this.store_buy_goods_cumulative[this.now_place];
        for (let item_key in fixed_goods) {
            let good_obj = JSON.parse(JSON.stringify(fixed_goods[item_key]));
            //商品库存
            if (fixed_goods[item_key].inventory != 'infinite') {
                let buy_num = 0;
                if (!is_Empty_Object(goods_cumulative[item_key])) {
                    buy_num = goods_cumulative[item_key].buy_num;
                }
                //有限库存商品，需要读取地点内的购买情况，得到当前真正的库存数量
                good_obj.inventory = fixed_goods[item_key].inventory - buy_num;
            }

            this.store_product_list_goods[item_key] = good_obj;
        }
    }
    //获取当前地点商品列表
    get_store_product_list_goods() {
        return this.store_product_list_goods;
    }
    //添加玩家将要购买的物品
    set_player_buy_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);

        //添加到玩家待购买物品中
        if (this.player_buy_goods[item_key] === undefined) {
            this.player_buy_goods[item_key] = item_obj;
        } else {
            this.player_buy_goods[item_key].num += item_obj.num;
        }
        //计算添加后的待购买物品价值
        this.count_player_buy_price();
    }
    //计算玩家购买的所有物品的价值
    count_player_buy_price() {
        //获取当前商人使用的货币种类
        //清空总价值
        this.buy_price = new Object();
        this.buy_price[this.money_type] = 0;

        for (let item_key in this.player_buy_goods) {
            let buy_good_obj = this.player_buy_goods[item_key];
            let id = buy_good_obj.id;
            //物品没有定义价值，跳过处理
            if (is_Empty_Object(items[id].price)) {
                console.log('%s物品没有定义价值');
                continue;
            }
            //物品没有定义当前商人使用的货币种类的价值，跳过处理
            if (is_Empty_Object(items[id].price[this.money_type])) {
                console.log('%s物品没有定义%s类型货币的价值', id, this.money_type);
                continue;
            }
            let num = buy_good_obj.num;
            if (num <= 0) {
                continue;
            }

            //获取这部分物品的购买价格
            let item_buy_price = this.get_buy_item_price(buy_good_obj, num, 0);
            this.buy_price[this.money_type] += item_buy_price;
        }
    }
    //获取玩家购买指定物品的支出
    //num是玩家要购买的物品的指定数量
    //sell_goods_num是该物品在玩家待购买对象中已有的个数
    // 如果玩家已经购买了几个物品，需要基于这些物品的数量折算涨价情况
    // 如果没有，则基于100%售价开始计算
    get_buy_item_price(item_obj, num, buy_goods_num = 'null') {
        let id = item_obj.id;
        let base_price; //物品基础价值
        if (is_Empty_Object(items[id].price[this.money_type])) {
            console.log('%s物品没有定义%s类型货币的价值', id, this.money_type);
            return 0;
        } else {
            base_price = items[id].price[this.money_type];
        }

        //针对装备的稀有度，重算价值
        if (items[id].main_type.includes('equipment')) {
            let equip_rarity = item_obj.equip_rarity;
            let rarity_place_data = enums[equip_rarity].price_rate;
            base_price = base_price * rarity_place_data * 0.01;
        }
        //判断物品是否保值，保值的物品可以直接得到结果
        for (let secon_type of items[id].secon_type) {
            if (enums['preserve_value_secon_type'].includes(secon_type)) {
                //根据小类推测，该物品是保值物品，直接使用价值乘数量得到结果
                return num * base_price;
            }
        }
        //判断商品是否有涨价机制，没有涨价机制的商品可以直接得到结果
        let rise_num = item_obj.rise_num;
        let rise_data = item_obj.rise_data;
        if (rise_num == null || rise_data == null) {
            return num * base_price;
        }

        let sell_price_multiple = 100; //初始购买倍率
        let sell_depreciation = 0; //涨价档次
        //获取已经打算购买的同类物品数
        if (buy_goods_num == 'null') {
            let item_key = get_item_id_key(item_obj);
            buy_goods_num = this.get_buy_goods_num(item_key);
        }
        // 计算当前的涨价档次
        while (buy_goods_num) {
            if (buy_goods_num > rise_num) {
                buy_goods_num -= rise_num;
                sell_depreciation++;
            } else {
                break;
            }
        }
        let buy_price = 0; //要购买的物品的总价
        while (num) {
            //获取涨价之后的购买倍率
            let true_sell_price_multiple = sell_price_multiple + sell_depreciation * rise_data;
            if (true_sell_price_multiple < 10) {
                true_sell_price_multiple = 10;
            }

            if (num > rise_num - buy_goods_num) {
                buy_price += base_price * (rise_num - buy_goods_num) * true_sell_price_multiple * 0.01;
                num -= rise_num - buy_goods_num;
                buy_goods_num = 0;
                sell_depreciation++;
            } else {
                buy_price += base_price * num * true_sell_price_multiple * 0.01;
                break;
            }
        }
        //计算结果四舍五入取整
        let true_buy_price = format_numbers(buy_price);
        if (true_buy_price == 0 && buy_price > 0) {
            return 1;
        } else {
            return true_buy_price;
        }
    }
    //获取玩家某种待购买物品的数量
    get_buy_goods_num(args) {
        let item_key;
        if (typeof args == 'object') {
            //输入的是物品对象，转换成key
            item_key = get_item_id_key(args);
        } else if (typeof args == 'string') {
            //输入的是key，直接使用
            item_key = args;
        }
        if (this.player_buy_goods[item_key] === undefined) {
            //待购买物品库没有该物品，等于购买0个
            return 0;
        }

        //待购买物品库有这个物品，直接查询数量
        return this.player_buy_goods[item_key].num;
    }
    //获取当前所有购买物品的总价值
    get_all_buy_price() {
        return this.buy_price[this.money_type];
    }
    //指定货币数购买指定物品，最大能买到多少个
    get_money_buy_item_max_num(item_obj, money_num) {
        if (money_num <= 0) {
            return 0;
        }
        let id = item_obj.id;
        let base_price; //物品基础价值
        if (is_Empty_Object(items[id].price[this.money_type])) {
            console.log('%s物品没有定义%s类型货币的价值', id, this.money_type);
            return 0;
        } else {
            base_price = items[id].price[this.money_type];
        }

        //针对装备的稀有度，重算价值
        if (items[id].main_type.includes('equipment')) {
            let equip_rarity = item_obj.equip_rarity;
            let rarity_place_data = enums[equip_rarity].price_rate;
            base_price = base_price * rarity_place_data * 0.01;
        }
        //判断物品是否保值，保值的物品可以直接得到结果
        for (let secon_type of items[id].secon_type) {
            if (enums['preserve_value_secon_type'].includes(secon_type)) {
                //根据小类推测，该物品是保值物品，直接用货币数除以价值
                return Math.floor(money_num / base_price);
            }
        }
        //判断商品是否有涨价机制，没有涨价机制的商品可以直接得到结果
        let rise_num = item_obj.rise_num;
        let rise_data = item_obj.rise_data;
        if (rise_num == null || rise_data == null) {
            //没有涨价机制，可以直接除
            return Math.floor(money_num / base_price);
        }

        //有涨价机制，按涨价的规则推算最大可购买数
        let buy_max_num = 0;
        let sell_price_multiple = 100; //初始购买倍率
        let sell_depreciation = 0; //涨价档次
        let item_key = get_item_id_key(item_obj);
        let buy_goods_num = this.get_buy_goods_num(item_key); //当前打算购买的同key物品数量
        // 计算当前的涨价档次
        while (buy_goods_num) {
            if (buy_goods_num > rise_num) {
                buy_goods_num -= rise_num;
                sell_depreciation++;
            } else {
                break;
            }
        }
        while (money_num) {
            //获取涨价之后的购买倍率
            let true_sell_price_multiple = sell_price_multiple + sell_depreciation * rise_data;
            if (true_sell_price_multiple < 10) {
                true_sell_price_multiple = 10;
            }
            let price = base_price * true_sell_price_multiple * 0.01;
            if (money_num / price > rise_num - buy_goods_num) {
                buy_max_num += rise_num - buy_goods_num;
                money_num -= (rise_num - buy_goods_num) * price;
                buy_goods_num = 0;
                sell_depreciation++;
            } else {
                buy_max_num += Math.floor(money_num / price);
                break;
            }
        }
        return buy_max_num;
    }
    //更新玩家待购买物品界面内容
    updata_buy_value_div() {
        let normalbuy_value_div = document.getElementById('normalbuy_value_div');
        normalbuy_value_div.replaceChildren(); //清空现有待购买物品界面
        for (let item_key in this.player_buy_goods) {
            let buy_good_obj = this.player_buy_goods[item_key];
            let id = buy_good_obj.id;
            if (buy_good_obj.num <= 0) {
                continue;
            }

            let aitem_div = addElement(normalbuy_value_div, 'div', null, 'sell_buy_value');
            let name = items[id].name;
            aitem_div.innerHTML = name + ' x' + buy_good_obj.num;
            if (items[id].main_type.includes('equipment')) {
                //根据装备稀有度调整文字颜色
                aitem_div.style.color = enums[buy_good_obj.equip_rarity].rarity_color;
            }
            //给div添加鼠标移动上去显示提示的效果
            let aitem_data = JSON.parse(JSON.stringify(buy_good_obj));
            add_show_Tooltip(aitem_div, 'sell_good', aitem_data);
            //添加鼠标点击取消购买的效果
            this.add_click_buy_item_remove(aitem_div, aitem_data);
        }
    }
    // 向目标组件添加 点击之后从待购买物品界面中删除 的功能
    add_click_buy_item_remove(target_div, item_data) {
        target_div.addEventListener('click', () => {
            //获取当前购买数量设定
            let buy_quantity_button = document.getElementById('buy_quantity_button');
            let quantity_num = buy_quantity_button.dataset.quantity_num;

            let store_manage = global.get_store_manage();
            //将待购买的物品的数量设定成规定数量
            let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'no_buy');
            //从待购买物品中删除物品
            this.remove_player_buy_goods(item_data);
            //物品变化，更新待购买界面
            this.updata_buy_value_div();
            //更新交易结果界面
            store_manage.updata_trade_result_div();

            //关闭提示窗
            if (all_flag) {
                let tooltip = document.getElementById('tooltip');
                tooltip.CloseTip(); //清空小窗口
            }
        });
    }
    //从玩家待购买物品库中删除指定物品
    remove_player_buy_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);

        if (this.player_buy_goods[item_key] === undefined) {
            console.log('要删除的物品在待购买物品库中不存在，逻辑上属于异常情况');
            return;
        }
        if (this.player_buy_goods[item_key].num < item_obj.num) {
            console.log('待购买物品删除数量比物品库中数量要多，没有设置好待购买物品的数量');
            return;
        }
        this.player_buy_goods[item_key].num -= item_obj.num;
        //计算删除后的待购买物品价值
        this.count_player_buy_price();
    }
    //补齐货币，用商人库存的指定货币尝试补齐指定数量
    supplement_money(money_type, need_money, type) {
        // 初始化商人指定货币的可用数量;
        let money_value = JSON.parse(JSON.stringify(enums[money_type].money_value));
        for (let item_key in money_value) {
            money_value[item_key].num = 0;
            if (this.store_product_list_goods[item_key] === undefined) {
                continue;
            }
            if (this.store_product_list_goods[item_key].inventory == 'infinite') {
                money_value[item_key].num = 'infinite';
            } else {
                let buy_num = this.get_buy_goods_num(item_key); //这种物品打算出售的数量
                money_value[item_key].num = this.store_product_list_goods[item_key].inventory - buy_num;
            }
        }
        //计算需要补齐的货币的数量
        let need_money_obj = calculateCurrencyCombination(need_money, money_value);
        if (type == 'for_buy') {
            //将这些数量的货币放入待购买界面
            for (let item_key in need_money_obj.combination) {
                if (need_money_obj.combination[item_key] <= 0) {
                    continue;
                }
                let aitem_data = JSON.parse(JSON.stringify(this.store_product_list_goods[item_key]));
                aitem_data.num = need_money_obj.combination[item_key];
                this.set_player_buy_goods(aitem_data);
            }
            //刷新待购买界面
            this.updata_buy_value_div();
        } else if (type == 'for_backpack') {
            //将这些数量的货币放入玩家背包
            for (let item_key in need_money_obj.combination) {
                if (need_money_obj.combination[item_key] <= 0) {
                    continue;
                }
                let aitem_data = JSON.parse(JSON.stringify(this.store_product_list_goods[item_key]));
                aitem_data.num = need_money_obj.combination[item_key];
                player.Player_get_item(aitem_data);
            }
        }
    }
    //达成交易，待购买物品放入玩家背包
    complete_trade() {
        for (let item_key in this.player_buy_goods) {
            if (this.player_buy_goods[item_key].num <= 0) {
                continue;
            }
            //给予玩家物品
            player.Player_get_item(this.player_buy_goods[item_key]);
            //记录购买数量
            if (!is_Empty_Object(this.store_buy_goods_cumulative[this.now_place][item_key])) {
                this.store_buy_goods_cumulative[this.now_place][item_key].buy_num += this.player_buy_goods[item_key].num;
            }
        }
        //清空待购买物品
        this.player_buy_goods = new Object();
        //重置价值
        this.buy_price = new Object();
        this.buy_price[this.money_type] = 0;
        //清空待购买界面
        this.updata_buy_value_div();
    }
}

//找零货币价值计算器
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
        let maxPossible;
        if (currency.num == 'infinite') {
            maxPossible = Math.floor(remaining / currency.price);
        } else {
            maxPossible = Math.min(Math.floor(remaining / currency.price), currency.num);
        }
        result.combination[currency.key] = maxPossible;
        remaining -= maxPossible * currency.price;
    }

    // 4. 如果精确匹配成功
    if (remaining === 0) {
        result.totalValue = targetValue;
        result.isExact = true;
        return result;
    }

    // 5. 商店找零不会超额，精确匹配结果就是计算结果
    return result;
}
