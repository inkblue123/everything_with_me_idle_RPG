import { add_show_Tooltip, addElement, addElement_radio } from '../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, get_item_id_key } from '../../Function/Function.js';
import { format_numbers } from '../../Function/math_func.js';
import { items } from '../../Data/Item/Item.js';
import { places } from '../../Data/Place/Place.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
import { player } from '../../Player/Player.js';

//出售管理类
export class Sell_Manage {
    constructor() {
        this.player_sell_goods = new Object(); //玩家待出售物品

        this.sell_price = new Object(); //玩家待出售物品的总价值

        this.now_place; //商店地点id
        this.money_type = 'ordinary_coin'; //这个商店使用的货币类型
    }
    init(money_type) {
        this.money_type = money_type;
        //清空待出售物品
        this.player_sell_goods = new Object();
        //重置价值
        this.sell_price = new Object();
        this.sell_price[this.money_type] = 0;
        //清空待出售界面
        this.updata_sell_value_div();
    }
    //对商店管理类存档
    save_sell_manage() {}
    //加载商店存档
    load_sell_manage(sell_save) {}
    //添加玩家将要出售的物品
    set_player_sell_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);
        //添加到玩家待出售物品中
        if (this.player_sell_goods[item_key] === undefined) {
            this.player_sell_goods[item_key] = item_obj;
        } else {
            this.player_sell_goods[item_key].num += item_obj.num;
        }
        //计算添加后的待出售物品价值
        this.updata_all_sell_item_price();
    }
    //从玩家待出售物品库中删除指定物品
    remove_player_sell_goods(item_obj) {
        let item_key = get_item_id_key(item_obj);

        if (this.player_sell_goods[item_key] === undefined) {
            console.log('要删除的物品在待出售物品库中不存在，逻辑上属于异常情况');
            return;
        }
        if (this.player_sell_goods[item_key].num < item_obj.num) {
            console.log('待出售物品删除数量比物品库中数量要多，没有设置好待出售物品的数量');
            return;
        }
        this.player_sell_goods[item_key].num -= item_obj.num;
        //计算删除后的待出售物品价值
        this.updata_all_sell_item_price();
    }
    //计算更新玩家出售的所有物品的总价值
    updata_all_sell_item_price() {
        //获取当前商人使用的货币种类
        //清空总价值
        this.sell_price = new Object();
        this.sell_price[this.money_type] = 0;

        for (let item_key in this.player_sell_goods) {
            let sell_good_obj = this.player_sell_goods[item_key];
            let id = sell_good_obj.id;
            //物品没有定义价值，跳过处理
            if (is_Empty_Object(items[id].price)) {
                // console.log('%s物品没有定义价值', id);
                continue;
            }
            //物品没有定义当前商人使用的货币种类的价值，跳过处理
            if (is_Empty_Object(items[id].price[this.money_type])) {
                // console.log('%s物品没有定义%s类型货币的价值', id, this.money_type);
                continue;
            }
            let num = sell_good_obj.num;
            if (num <= 0) {
                continue;
            }
            //获取这部分物品的出售价格
            let item_sell_price = this.get_sell_item_price(sell_good_obj, num, 0);
            this.sell_price[this.money_type] += item_sell_price;
        }
    }
    //获取当前所有出售物品的总价值
    get_all_sell_price() {
        return this.sell_price[this.money_type];
    }
    //获取玩家待出售界面中指定货币的总金额
    get_sell_money_type_num(money_type) {
        let money = 0;
        let arr = Object.keys(this.player_sell_goods); //将拥有的物品的key转换成一个数组
        for (let item_key of arr) {
            let id = this.player_sell_goods[item_key].id;
            if (items[id].secon_type.includes(money_type)) {
                money += this.player_sell_goods[item_key].num * items[id].price[money_type];
            }
        }
        return money;
    }
    //获取玩家出售指定物品应该得到的收入
    //num是玩家要出售的物品的指定数量
    //sell_goods_num是该物品在玩家待出售对象中已有的个数
    // 如果玩家已经出售了几个物品，需要基于这些物品的数量折算贬值情况
    // 如果没有，则基于80%售价开始计算
    get_sell_item_price(item_obj, num, sell_goods_num = 'null') {
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
        let sell_price = 0; //要出售的物品的总价
        //针对装备的稀有度，重算价值和堆叠数
        if (items[id].main_type.includes('equipment')) {
            let equip_rarity = item_obj.equip_rarity;
            let rarity_place_data = enums[equip_rarity].price_rate;
            base_price = base_price * rarity_place_data * 0.01;
            maxStack = maxStack * 5;
        }

        let sell_price_multiple = 80; //初始出售倍率
        let sell_depreciation = 0; //贬值档次
        //获取已经打算出售的同类物品数
        let item_key = get_item_id_key(item_obj);
        if (sell_goods_num == 'null') {
            sell_goods_num = this.get_sell_goods_num(item_key);
        }
        // 计算当前的贬值档次
        while (sell_goods_num) {
            if (sell_goods_num > maxStack) {
                sell_goods_num -= maxStack;
                sell_depreciation++;
            } else {
                break;
            }
        }

        while (num) {
            //获取贬值之后的出售倍率
            let true_sell_price_multiple = sell_price_multiple - sell_depreciation * 5;
            if (true_sell_price_multiple < 10) {
                true_sell_price_multiple = 10;
            }

            if (num > maxStack - sell_goods_num) {
                sell_price += base_price * (maxStack - sell_goods_num) * true_sell_price_multiple * 0.01;
                num -= maxStack - sell_goods_num;
                sell_goods_num = 0;
                sell_depreciation++;
            } else {
                sell_price += base_price * num * true_sell_price_multiple * 0.01;
                break;
            }
        }
        //计算结果四舍五入取整
        let true_sell_price = format_numbers(sell_price);
        if (true_sell_price == 0 && sell_price > 0) {
            return 1;
        } else {
            return true_sell_price;
        }
    }

    //获取玩家某种待出售物品的数量
    get_sell_goods_num(args) {
        let item_key;
        if (typeof args == 'object') {
            //输入的是物品对象，转换成key
            item_key = get_item_id_key(args);
        } else if (typeof args == 'string') {
            //输入的是key，直接使用
            item_key = args;
        }
        if (this.player_sell_goods[item_key] === undefined) {
            //待出售物品库没有该物品，等于出售0个
            return 0;
        }

        //待出售物品库有这个物品，直接查询数量
        return this.player_sell_goods[item_key].num;
    }
    //更新玩家待出售物品界面内容
    updata_sell_value_div() {
        let sell_value_div = document.getElementById('sell_value_div');
        sell_value_div.replaceChildren(); //清空现有待出售物品界面
        for (let item_key in this.player_sell_goods) {
            let sell_good_obj = this.player_sell_goods[item_key];
            let id = sell_good_obj.id;
            if (sell_good_obj.num <= 0) {
                continue;
            }

            let aitem_div = addElement(sell_value_div, 'div', null, 'sell_buy_value');
            let name = items[id].name;
            aitem_div.innerHTML = name + ' x' + sell_good_obj.num;
            if (items[id].main_type.includes('equipment')) {
                //根据装备稀有度调整文字颜色
                aitem_div.style.color = enums[sell_good_obj.equip_rarity].rarity_color;
            }
            //给div添加鼠标移动上去显示提示的效果
            let aitem_data = JSON.parse(JSON.stringify(sell_good_obj));
            add_show_Tooltip(aitem_div, 'sell_good', aitem_data);
            //添加鼠标点击取消出售的效果
            this.add_click_sell_backpack_item_remove(aitem_div, aitem_data);
        }
    }
    // 向目标组件添加 点击之后从待出售物品界面中删除 的功能
    add_click_sell_backpack_item_remove(target_div, item_data) {
        target_div.addEventListener('click', () => {
            //获取当前出售数量设定
            let sell_quantity_button = document.getElementById('sell_quantity_button');
            let quantity_num = sell_quantity_button.dataset.quantity_num;

            let store_manage = global.get_store_manage();
            //将待出售的物品的数量设定成规定数量
            let all_flag = store_manage.set_quantity_num(quantity_num, item_data, 'no_sell');
            //向商店管理类的待出售物品中删除物品
            this.remove_player_sell_goods(item_data);
            //物品变化，更新相关界面
            this.updata_sell_value_div();
            store_manage.updata_trade_result_div();
            let P_backpack = player.get_player_backpack();
            P_backpack.updata_BP_value();

            //关闭提示窗
            if (all_flag) {
                let tooltip = document.getElementById('tooltip');
                tooltip.CloseTip(); //清空小窗口
            }
        });
    }
    //达成交易，待出售物品放入当前商店的回购列表
    complete_trade() {
        let store_manage = global.get_store_manage();
        let buyback_manage = store_manage.get_buyback_manage();
        for (let item_key in this.player_sell_goods) {
            if (this.player_sell_goods.num <= 0) {
                continue;
            }
            //从玩家背包中去掉这个物品
            player.Player_lose_item(this.player_sell_goods[item_key]);
            //放入回购列表
            buyback_manage.add_store_Item_buy_back_goods(this.player_sell_goods[item_key]);
        }
        //刷新商店的回购列表
        buyback_manage.updata_store_IBB_value_div();
        //清空待出售物品
        this.player_sell_goods = new Object();
        //重置价值
        this.sell_price = new Object();
        this.sell_price[this.money_type] = 0;
        //清空待出售界面
        this.updata_sell_value_div();
    }
}
