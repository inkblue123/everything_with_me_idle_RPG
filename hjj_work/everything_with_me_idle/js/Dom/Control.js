import { crtElement, addElement, addElement_botton } from '../Function/Dom_function.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//创建中下玩家控制界面
function create_Control() {
    var Control = crtElement('div', 'control', null, '');
    make_Control_div(Control);
    set_Control_func(Control);
    return Control;
}
//创建中下，玩家控制界面内的详细组件
function make_Control_div(Control) {
    //角色所处的时间地点名称
    let control_name_div = crtElement('div', 'control_name_div', null, '');
    let left_div = addElement(control_name_div, 'div', 'control_name_left_div', null);
    var area_name_div = addElement(left_div, 'div', 'area_name_div', 'control_text_div');
    area_name_div.innerHTML = '区域';
    var place_name_div = addElement(left_div, 'div', 'place_name_div', 'control_text_div');
    place_name_div.innerHTML = '地点';
    let right_div = addElement(control_name_div, 'div', 'control_name_right_div', null);
    var game_date_div = addElement(right_div, 'div', 'game_date_div', 'control_text_div');
    game_date_div.innerHTML = '当前时间';

    //角色所处位置描述
    let Place_desc_div = crtElement('div', 'Place_desc_div', null, '');
    //容纳玩家在地点里能做的事情的div
    let player_Control_div = crtElement('div', 'player_Control_div', null, '');

    //容纳商店交易相关信息的div，常态隐藏，进入商店时显示
    let goods_trade_div = crtElement('div', 'goods_trade_div', null, 'none');
    let sell_div = addElement(goods_trade_div, 'div', 'sell_div', null);
    let trade_result_div = addElement(goods_trade_div, 'div', 'trade_result_div', null);
    let buy_div = addElement(goods_trade_div, 'div', 'buy_div', null);
    //左边的待出售物品div
    let sell_name_div = addElement(sell_div, 'div', null, 'sell_buy_name_div');
    sell_name_div.innerHTML = '准备出售的物品';
    let sell_quantity_button = addElement_botton(sell_div, 'sell_quantity_button', 'player_Control_button', null, '出售批量选择-> X1');
    sell_quantity_button.dataset.quantity_num = '1';
    var sell_value_scroll_box = addElement(sell_div, 'div', 'null', 'overflow_y_div sell_buy_scroll_box');
    var sell_value_div = addElement(sell_value_scroll_box, 'div', 'sell_value_div', 'in_overflow_div');

    //中间的的交易结果div
    let trade_result_name_div = addElement(trade_result_div, 'div', 'trade_result_name_div', null);
    trade_result_name_div.innerHTML = '交易结果<br>收入：0<br>支出：0';
    let supplement_money_button = addElement_botton(trade_result_div, 'supplement_money_button', null, null, '补齐货币');
    let trade_button = addElement_botton(trade_result_div, 'trade_button', null, null, '确认交易');
    addElement(trade_button, 'div', 'trade_button_overlay', 'overlay', 'none');
    trade_button.style.pointerEvents = 'auto';

    //右边的待购买物品div
    let buy_name_div = addElement(buy_div, 'div', null, 'sell_buy_name_div');
    buy_name_div.innerHTML = '准备购买的物品';
    let buy_quantity_button = addElement_botton(buy_div, 'buy_quantity_button', 'player_Control_button', null, '购买批量选择-> X1');
    buy_quantity_button.dataset.quantity_num = '1';
    var buy_value_scroll_box = addElement(buy_div, 'div', null, 'overflow_y_div sell_buy_scroll_box');
    var buy_value_div = addElement(buy_value_scroll_box, 'div', 'buy_value_div', 'in_overflow_div');
    var normalbuy_value_div = addElement(buy_value_div, 'div', 'normalbuy_value_div', null);
    var buyback_name_div = addElement(buy_value_div, 'div', 'buyback_name_div', 'sell_buy_name_div');
    buyback_name_div.innerHTML = '回购物品';
    var buyback_value_div = addElement(buy_value_div, 'div', 'buyback_value_div', null);

    //组件放入角色属性装备界面中
    Control.appendChild(control_name_div);
    Control.appendChild(Place_desc_div);
    Control.appendChild(player_Control_div);
    Control.appendChild(goods_trade_div); //常态隐藏，进入商店之后显示
}
// 为组件添加事件
function set_Control_func(Control) {
    //商店交易情况界面中的批量出售按钮，点击之后要更换数字
    let sell_quantity_button = Control.querySelector('#sell_quantity_button');
    sell_quantity_button.addEventListener('click', function () {
        let now_quantity_num = this.dataset.quantity_num;
        let next_quantity_num = get_store_next_quantity_num(now_quantity_num);
        if (next_quantity_num == 'half') {
            this.innerHTML = '出售批量选择-> 一半';
        } else if (next_quantity_num == 'all') {
            this.innerHTML = '出售批量选择-> 全部';
        } else {
            this.innerHTML = '出售批量选择-> X' + next_quantity_num;
        }
        this.dataset.quantity_num = next_quantity_num;
    });
    //商店交易情况界面中的批量购买按钮，点击之后要更换数字
    let buy_quantity_button = Control.querySelector('#buy_quantity_button');
    buy_quantity_button.addEventListener('click', function () {
        let now_quantity_num = this.dataset.quantity_num;
        let next_quantity_num = get_store_next_quantity_num(now_quantity_num);
        if (next_quantity_num == 'half') {
            this.innerHTML = '购买批量选择-> 一半';
        } else if (next_quantity_num == 'all') {
            this.innerHTML = '购买批量选择-> 全部';
        } else {
            this.innerHTML = '购买批量选择-> X' + next_quantity_num;
        }
        this.dataset.quantity_num = next_quantity_num;
    });
    //商店交易情况界面的补齐货币按钮，点击之后尝试将背包中的货币放入待出售界面
    let supplement_money_button = Control.querySelector('#supplement_money_button');
    supplement_money_button.addEventListener('click', function () {
        let store_manage = global.get_store_manage();
        store_manage.supplement_money();
    });
    //商店交易情况界面的确认交易按钮，点击之后完成交易
    let trade_button = Control.querySelector('#trade_button');
    trade_button.addEventListener('click', function () {
        let store_manage = global.get_store_manage();
        store_manage.complete_trade();
    });
}
//获取商店界面中的批量选择按钮下一个要切换到的数量
function get_store_next_quantity_num(now_quantity_num) {
    // 批量选择的数量设置如下
    // 1 5 10 50 100 500 …………
    // 每按一次按钮，数量就不断向下切换
    // 玩家背包里个数最多的某种物品，数量为y
    // 当批量选择个数大于y时，下一次切换到“一半”，再下一次切换到“全部”，再下一次切换到1

    if (now_quantity_num == 'half') {
        return 'all';
    }
    if (now_quantity_num == 'all') {
        return '1';
    }
    let P_backpack = player.get_player_backpack();
    let aitem_max_num = P_backpack.get_BP_aitem_max_num();
    if (parseInt(now_quantity_num) >= aitem_max_num) {
        return 'half';
    }
    //计算当前数字有多少个0
    let zero_num = 0;
    let x = parseInt(now_quantity_num);
    while (1) {
        if (zero_num >= 10) {
            console.log('数字计算错误，now_quantity_num的值不正常');
            return '1';
        }

        if (parseInt(x / 10) > 0) {
            x = parseInt(x / 10);
            zero_num++;
        } else {
            break;
        }
    }

    //基于剩余数字获取下一个要切换到的数
    let arrr = [0, 5, 0, 0, 0, 1];
    let next_x = arrr[x];
    if (next_x == 0 || next_x == undefined) {
        console.log('数字计算错误，next_x的值不正常');
        return '1';
    }
    if (next_x == 1) {
        zero_num++;
    }
    next_x = next_x * 10 ** zero_num;
    return String(next_x);
}
export { create_Control };
