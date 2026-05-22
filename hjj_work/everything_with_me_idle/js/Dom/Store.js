import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//创建左下的物品回购界面
function create_Store() {
    let Store = crtElement('div', 'Store', null, 'none');
    make_Store_div(Store);
    set_Store_button(Store);
    return Store;
}

//创建左下角，角色商品列表栏界面内的详细组件
function make_Store_div(Store) {
    //界面上部，区分当前展示的内容的按钮
    var Store_switch_div = crtElement('div', 'Store_switch_div', null, '');
    //商品列表 product_list PL
    var PL_switch_radio_div = addElement(Store_switch_div, 'div', 'PL_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(PL_switch_radio_div, 'PL_switch_button', 'Store_switch', 'PL_switch', '商品列表');
    PL_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //物品回购 Item_buy_back IBB
    var IBB_switch_radio_div = addElement(Store_switch_div, 'div', null, 'radio_div div_switch_button');
    addElement_radio(IBB_switch_radio_div, 'IBB_switch_button', 'Store_switch', 'IBB_switch', '物品回购');

    //界面下部，具体展示内容的窗口
    var Store_value_div = crtElement('div', 'Store_value_div', 'page_columns_1', '');
    var PL_div = addElement(Store_value_div, 'div', 'PL_div', 'page_columns_12');
    var IBB_div = addElement(Store_value_div, 'div', 'IBB_div', 'page_columns_12', 'none');
    //商品列表窗口
    {
        // 左侧的分类下拉表格和排序按钮界面
        {
            let PL_switch_sort_div = addElement(PL_div, 'div', 'IBB_switch_sort_div', 'Store_switch_sort_div');
            //上半分类按钮
            var PL_scroll_box = addElement(PL_switch_sort_div, 'div', 'PL_scroll_box', 'overflow_y_div Store_switch_scroll_box');
            var PL_switch_div = addElement(PL_scroll_box, 'div', 'PL_switch_div', 'in_overflow_div');
            // 全部
            var PL_ALL_radio_div = addElement(PL_switch_div, 'div', 'PL_ALL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_ALL_radio_div, 'PL_all', 'PL_switch', 'all', '全部');
            //默认激活"全部"过滤条件
            PL_ALL_radio_div.children[0].checked = true;

            // 武器装备 equipment
            var PL_EQP_radio_div = addElement(PL_switch_div, 'div', 'PL_EQP_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_EQP_radio_div, 'PL_EQP', 'PL_1_switch', 'PL_EQP', '武器装备');
            var PL_EQP_droptable = addElement(PL_switch_div, 'div', 'PL_EQP_droptable', 'dropdown_table', 'none');
            //消耗品 consumable
            var PL_CSB_radio_div = addElement(PL_switch_div, 'div', 'PL_CSB_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_CSB_radio_div, 'PL_CSB', 'PL_1_switch', 'PL_CSB', '消耗品');
            var PL_CSB_droptable = addElement(PL_switch_div, 'div', 'PL_CSB_droptable', 'dropdown_table', 'none');
            //材料 Material
            var PL_MTR_radio_div = addElement(PL_switch_div, 'div', 'PL_MTR_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_MTR_radio_div, 'PL_MTR', 'PL_1_switch', 'PL_MTR', '材料物品');
            var PL_MTR_droptable = addElement(PL_switch_div, 'div', 'PL_MTR_droptable', 'dropdown_table', 'none');
            //下半排序按钮
            var PL_sort_div = addElement(PL_switch_sort_div, 'div', 'PL_sort_div', null);
            var PL_num_radio_div = addElement(PL_sort_div, 'div', 'PL_num_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_num_radio_div, 'PL_num_sort', 'PL_sort', 'num_sort', '个数排序');
            PL_num_radio_div.children[0].checked = true; //默认激活"个数排序"过滤条件
            var PL_price_radio_div = addElement(PL_sort_div, 'div', 'PL_price_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PL_price_radio_div, 'PL_price_sort', 'PL_sort', 'price_sort', '价格排序');
        }
        //右侧具体的商品列表
        var PL_value_scroll_box = addElement(PL_div, 'div', 'PL_value_scroll_box', 'overflow_y_div');
        var PL_value_div = addElement(PL_value_scroll_box, 'div', 'PL_value_div', 'in_overflow_div');
    }
    //物品回购窗口
    {
        // 左侧的分类下拉表格和排序按钮界面
        {
            let IBB_switch_sort_div = addElement(IBB_div, 'div', 'IBB_switch_sort_div', 'Store_switch_sort_div');
            //上半分类按钮
            var IBB_scroll_box = addElement(IBB_switch_sort_div, 'div', 'IBB_scroll_box', 'overflow_y_div Store_switch_scroll_box');
            var IBB_switch_div = addElement(IBB_scroll_box, 'div', 'IBB_switch_div', 'in_overflow_div');
            // 全部

            var IBB_ALL_radio_div = addElement(IBB_switch_div, 'div', 'IBB_ALL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_ALL_radio_div, 'IBB_all', 'IBB_switch', 'all', '全部');
            //默认激活"全部"过滤条件
            IBB_ALL_radio_div.children[0].checked = true;

            // 武器装备 equipment
            var IBB_EQP_radio_div = addElement(IBB_switch_div, 'div', 'IBB_EQP_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_EQP_radio_div, 'IBB_EQP', 'IBB_1_switch', 'IBB_EQP', '武器装备');
            var IBB_EQP_droptable = addElement(IBB_switch_div, 'div', 'IBB_EQP_droptable', 'dropdown_table', 'none');
            //消耗品 consumable
            var IBB_CSB_radio_div = addElement(IBB_switch_div, 'div', 'IBB_CSB_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_CSB_radio_div, 'IBB_CSB', 'IBB_1_switch', 'IBB_CSB', '消耗品');
            var IBB_CSB_droptable = addElement(IBB_switch_div, 'div', 'IBB_CSB_droptable', 'dropdown_table', 'none');
            //材料 Material
            var IBB_MTR_radio_div = addElement(IBB_switch_div, 'div', 'IBB_MTR_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_MTR_radio_div, 'IBB_MTR', 'IBB_1_switch', 'IBB_MTR', '材料物品');
            var IBB_MTR_droptable = addElement(IBB_switch_div, 'div', 'IBB_MTR_droptable', 'dropdown_table', 'none');

            //下半排序按钮
            var IBB_sort_div = addElement(IBB_switch_sort_div, 'div', 'IBB_sort_div', 'Store_sort_div');
            var IBB_num_radio_div = addElement(IBB_sort_div, 'div', 'IBB_num_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_num_radio_div, 'IBB_num_sort', 'IBB_sort', 'num_sort', '个数排序');
            IBB_num_radio_div.children[0].checked = true; //默认激活"个数排序"过滤条件
            var IBB_price_radio_div = addElement(IBB_sort_div, 'div', 'IBB_price_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(IBB_price_radio_div, 'IBB_price_sort', 'IBB_sort', 'price_sort', '价格排序');
        }
        //右侧具体的内容
        var IBB_value_scroll_box = addElement(IBB_div, 'div', 'IBB_value_scroll_box', 'overflow_y_div');
        var IBB_value_div = addElement(IBB_value_scroll_box, 'div', 'IBB_value_div', 'in_overflow_div');
    }

    Store.appendChild(Store_switch_div);
    Store.appendChild(Store_value_div);
}

// 为组件添加触发事件
function set_Store_button(Store) {
    //切换商品列表、物品回购的按钮
    let radios = Store.querySelectorAll('input[type="radio"][name="Store_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_store_div(this.id);
        });
    });
    //商店界面左侧的“全部”按钮
    let PL_ALL_radio_div = Store.querySelector('#PL_ALL_radio_div');
    PL_ALL_radio_div.addEventListener('click', function () {
        //点击商品列表界面的“全部”按钮，关闭该界面下其他下拉框
        show_dropdown_table('PL_switch_div');
        //额外关闭所有1级分类按钮
        const radios = document.querySelectorAll('input[name="PL_1_switch"]');
        for (const radio of radios) {
            radio.checked = false;
        }
        //刷新商店界面
        let store_manage = global.get_store_manage();
        store_manage.updata_store_PL_value_div();
    });
    //商店界面左侧分类按钮
    radios = Store.querySelectorAll('input[type="radio"][name="PL_1_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //展示当前按钮的下拉框，隐藏其他下拉框，点亮当前下拉框内的第一个分类按钮
            if (this.id == 'PL_EQP') {
                let PL_EQP_all_radio_div = document.getElementById('PL_EQP_all_radio_div');
                PL_EQP_all_radio_div.children[0].checked = true;
                show_dropdown_table('PL_switch_div', 'PL_EQP_droptable');
            } else if (this.id == 'PL_CSB') {
                let PL_CSB_all_radio_div = document.getElementById('PL_CSB_all_radio_div');
                PL_CSB_all_radio_div.children[0].checked = true;
                show_dropdown_table('PL_switch_div', 'PL_CSB_droptable');
            } else if (this.id == 'PL_MTR') {
                let PL_MTR_all_radio_div = document.getElementById('PL_MTR_all_radio_div');
                PL_MTR_all_radio_div.children[0].checked = true;
                show_dropdown_table('PL_switch_div', 'PL_MTR_droptable');
            }
            //刷新界面触发分类过滤
            let store_manage = global.get_store_manage();
            store_manage.updata_store_PL_value_div();
        });
    });

    //商品回购界面左侧的“全部”按钮
    let IBB_ALL_radio_div = Store.querySelector('#IBB_ALL_radio_div');
    IBB_ALL_radio_div.addEventListener('click', function () {
        //点击商品列表界面的“全部”按钮，关闭该界面下其他下拉框
        show_dropdown_table('IBB_switch_div');
        //额外关闭所有1级分类按钮
        const radios = document.querySelectorAll('input[name="IBB_1_switch"]');
        for (const radio of radios) {
            radio.checked = false;
        }
        //刷新商品回购界面
        let buyback_manage = global.get_buyback_manage();
        buyback_manage.updata_store_IBB_value_div();
    });
    //商品回购界面左侧分类按钮
    radios = Store.querySelectorAll('input[type="radio"][name="IBB_1_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //展示当前按钮的下拉框，隐藏其他下拉框，点亮当前下拉框内的第一个分类按钮
            if (this.id == 'IBB_EQP') {
                let IBB_EQP_all_radio_div = document.getElementById('IBB_EQP_all_radio_div');
                IBB_EQP_all_radio_div.children[0].checked = true;
                show_dropdown_table('IBB_switch_div', 'IBB_EQP_droptable');
            } else if (this.id == 'IBB_CSB') {
                let IBB_CSB_all_radio_div = document.getElementById('IBB_CSB_all_radio_div');
                IBB_CSB_all_radio_div.children[0].checked = true;
                show_dropdown_table('IBB_switch_div', 'IBB_CSB_droptable');
            } else if (this.id == 'IBB_MTR') {
                let IBB_MTR_all_radio_div = document.getElementById('IBB_MTR_all_radio_div');
                IBB_MTR_all_radio_div.children[0].checked = true;
                show_dropdown_table('IBB_switch_div', 'IBB_MTR_droptable');
            }
            //刷新界面触发分类过滤
            let buyback_manage = global.get_buyback_manage();
            buyback_manage.updata_store_IBB_value_div();
        });
    });
}
//切换商店界面中商品列表、物品回购子界面的按钮
function change_store_div(button_id) {
    const PL_div = document.getElementById('PL_div');
    const IBB_div = document.getElementById('IBB_div');
    if (button_id == 'PL_switch_button') {
        PL_div.style.display = '';
        IBB_div.style.display = 'none';
    }
    if (button_id == 'IBB_switch_button') {
        PL_div.style.display = 'none';
        IBB_div.style.display = '';
    }
}
export { create_Store };
