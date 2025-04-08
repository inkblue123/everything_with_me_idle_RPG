import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { player } from '../Player/Player.js';
import { show_active_EQP } from './show_func.js';
import { hex2Rgba } from './Function.js';
import { updata_player_EQP, updata_BP_value, updata_attribute_show, updata_player_active } from './Updata_func.js';
import { get_object_only_key, get_EQP_wp_data } from './Get_func.js';
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
        add_show_Tooltip(aitem, 'item', aitem.Data);
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
//点亮左上装备栏中的指定展示框表示玩家穿戴了指定装备，并展示装备名
function add_aEQP_data(aBP_item, wp, alpha = 1) {
    let id = aBP_item.id;
    let rarity = get_object_only_key(aBP_item.rarity);
    let num = aBP_item.rarity[rarity];
    let EQP_div_data = get_EQP_wp_data(null, wp);
    if (num == 1) {
        EQP_div_data.innerHTML = items[id].name; //装备栏上物品的名称
    } else {
        EQP_div_data.innerHTML = `${items[id].name} x${num}`; //装备栏上物品的名称x数量
    }
    EQP_div_data.style.color = hex2Rgba(enums[rarity].rarity_color, alpha); //装备栏物品的稀有度颜色
    EQP_div_data.style.opacity = 1; //高亮显示表示已经装备
    add_show_Tooltip(EQP_div_data, 'item', aBP_item); //添加鼠标移动上去显示详细内容的功能
    add_click_Equipment_worn_remove(EQP_div_data, wp);
}

// 向目标组件添加鼠标移动显示小窗口的功能
function add_show_Tooltip(target_div, tip_type, tip_value) {
    // 获取目标元素和小窗口
    let tooltip = document.getElementById('tooltip');

    // 鼠标移入目标元素时显示小窗口
    target_div.addEventListener('mouseenter', () => {
        tooltip.InitTip(tip_type, tip_value); // 初始化小窗口内容并显示小窗口
    });

    // 鼠标移动时更新小窗口位置
    target_div.addEventListener('mousemove', (event) => {
        requestAnimationFrame(() => tooltip.MoveTip(event));
        // tooltip.MoveTip(event); //移动小窗口
    });

    // 鼠标移出目标元素时隐藏小窗口
    target_div.addEventListener('mouseleave', () => {
        tooltip.CloseTip(); //清空小窗口
    });
}
//  向目标组件添加鼠标点击穿戴到身上的功能
function add_click_Equipment_worn(target_div, tip_value) {
    target_div.addEventListener('click', () => {
        //从玩家背包中去掉要穿戴的物品
        let keys = Object.keys(tip_value.rarity);
        let rarity = keys[0];
        let ret = player.Player_lose_Equipment(tip_value);
        if (ret <= 0) return;
        //切换到当前激活的装备栏
        show_active_EQP();
        //将要穿戴的物品放到目前激活的装备栏的指定位置
        player.worn_Equipment(tip_value.id, tip_value.num, rarity);
        //刷新背包界面
        updata_BP_value();
        //装备信息发生变动，更新相关界面
        updata_player_EQP();
        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}
// 向目标组件添加鼠标点击后从装备栏里卸下的的功能
function add_click_Equipment_worn_remove(target_div, wp) {
    target_div.addEventListener('click', () => {
        //从玩家身上脱下指定位置的装备
        player.remove_worn_Equipment(wp);
        //刷新背包界面
        updata_BP_value();
        //装备信息发生变动，更新相关界面
        updata_player_EQP();
        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}


//  向主动技能组件添加鼠标点击设置到身上主动技能槽的功能
function add_click_Active_skill_worn(target_div, tip_value) {
    target_div.addEventListener('click', () => {
        let ASkill_Manage = player.get_player_ASkill_Manage();
        //获取从左到右首个空闲的主动技能槽位置
        let slot = ASkill_Manage.get_unuse_active_slots_num();
        if (slot == -1) {
            //身上主动技能槽全满，不设置
            return false;
        }
        //向空闲槽添加该技能
        ASkill_Manage.set_active_skill(tip_value, slot);
        updata_player_active();
    });
}
// 向目标组件添加 点击之后可以从玩家身上卸下指定的主动技能的功能
function add_click_Active_skill_worn_remove(target_div, tip_value) {
    //输入的tip_value表示要卸下玩家身上第几个槽的技能，从0开始计数
    target_div.addEventListener('click', () => {
        //从玩家身上卸下指定槽位的主动技能
        let ASkill_Manage = player.get_player_ASkill_Manage();
        ASkill_Manage.remove_solt_active_skill(tip_value);
        //主动技能发生变动，更新相关界面
        updata_player_active();
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
    add_show_Tooltip,
    add_click_Equipment_worn,
    add_click_Equipment_worn_remove,
    add_click_Active_skill_worn,
    add_aEQP_data,
    add_click_Active_skill_worn_remove,
};
