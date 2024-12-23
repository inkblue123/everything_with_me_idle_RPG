import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { player } from '../Player/player.js';
import { show_active_EQP } from './show_func.js';
import { update_BP_value } from './Update_func.js';
// 创造一个dom元素，赋值id，className，style.display，style.backgroundColor
function crtElement(elem, id, cls, sty_display, sty_BGC) {
    let newdom = document.createElement(elem);
    if (id) newdom.id = id;
    if (cls) newdom.className = cls;
    if (sty_display) newdom.style.display = sty_display;
    if (sty_BGC) newdom.style.backgroundColor = sty_BGC;
    return newdom;
}
//向parent_element中添加一个元素，赋予id或者classname
function addElement(parent_element, elem, id, cls, sty_display) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    if (sty_display) newelem.style.display = sty_display;
    parent_element.appendChild(newelem);
    return newelem;
}
//向parent_element中添加一个radio
function addElement_radio(parent_element, id, name, value, textContent) {
    let newradio = document.createElement('input');
    newradio.type = 'radio';
    if (id) newradio.id = id;
    if (name) newradio.name = name;
    if (value) newradio.value = value;
    parent_element.appendChild(newradio);
    let newlabel = document.createElement('label');
    newlabel.setAttribute('for', id);
    if (textContent) newlabel.textContent = textContent;
    parent_element.appendChild(newlabel);
    return newradio;
}
//删除一个div中所有元素
function empty_dom(dom) {
    while (dom.lastChild) {
        dom.removeChild(dom.lastChild);
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
        aitem.Data = JSON.parse(JSON.stringify(player_item));
        if (player_item_num >= maxStack) {
            aitem.innerHTML = `${name} x${maxStack}`;
            player_item_num -= maxStack;
        } else {
            aitem.innerHTML = `${name} x${player_item_num}`;
            player_item_num = 0;
        }
        add_mousemove(aitem, 'item', aitem.Data);
    }
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
            aitem.style.color = texts[i].rarity_color;
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
            add_mousemove(aitem, 'item', aitem.Data);
            //对于装备，添加鼠标点击可以穿戴到身上的效果
            if (i != 'damaged') {
                BPEQP_add_click(aitem, 'item', aitem.Data);
            }
        }
    }
}
// 向目标组件添加鼠标移动显示小窗口的功能
function add_mousemove(target_div, tip_type, tip_value) {
    // 获取目标元素和小窗口
    let tooltip = document.getElementById('tooltip');

    // 鼠标移入目标元素时显示小窗口
    target_div.addEventListener('mouseenter', () => {
        tooltip.InitTip(tip_type, tip_value); // 初始化小窗口内容并显示小窗口
    });

    // 鼠标移动时更新小窗口位置
    target_div.addEventListener('mousemove', (event) => {
        tooltip.MoveTip(event); //移动小窗口
    });

    // 鼠标移出目标元素时隐藏小窗口
    target_div.addEventListener('mouseleave', () => {
        tooltip.CloseTip(); //清空小窗口
    });
}
// 向背包界面中的装备元素添加鼠标点击穿戴到身上的功能
function BPEQP_add_click(target_div, tip_type, tip_value) {
    target_div.addEventListener('click', () => {
        //从玩家背包中去掉要穿戴的物品
        let keys = Object.keys(tip_value.rarity);
        let rarity = keys[0];
        let ret = player.Player_lose_Equipment(tip_value.id, tip_value.num, rarity);
        if (ret <= 0) return;
        //切换到当前激活的装备栏
        show_active_EQP();
        //将要穿戴的物品放到目前激活的装备栏的指定位置
        player.worn_Equipment(tip_value.id, tip_value.num, rarity);
        //刷新背包界面
        update_BP_value();

        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}

export {
    crtElement,
    addElement,
    addElement_radio,
    empty_dom,
    addBP_item,
    addBP_equipment,
    add_mousemove,
    BPEQP_add_click,
};
