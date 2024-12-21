import { player } from '../Player.js';
import { items } from '../Data/Item/Item.js';
import { addElement } from './Dom_function.js';
import { texts } from '../Data/Text/Text.js';
//更新血条上的数值
function update_HP() {
    const HP_bar = document.getElementById('HP_bar');

    HP_bar.children[0].children[0].style.width = `${(player.health_point / player.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(player.health_point)}/${Math.ceil(player.health_max)} 生命`;
}
//更新魔力条上的数值
function update_MP() {
    const MP_bar = document.getElementById('MP_bar');

    MP_bar.children[0].children[0].style.width = `${(player.magic_point / player.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(player.magic_point)}/${Math.ceil(player.magic_max)} 魔力`;
}
//更新精力条上的数值
function update_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');

    ENP_bar.children[0].children[0].style.width = `${(player.energy_point / player.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(player.energy_point)}/${Math.ceil(player.energy_max)} 精力`;
}
//更新角色名
function update_player_name() {
    const name_input = document.getElementById('Player_name');
    if (name_input.value.toString().trim().length > 0) {
        player.name = name_input.value;
    } else {
        player.name = '我';
    }
    name_input.value = player.name;
}
//更新左下角的背包物品栏中的元素
function update_BP_value(BP_type) {
    let BP_value_div = document.getElementById('BP_value_div');
    BP_value_div.replaceChildren(); //清空现有背包内展示的物品
    let type_switch = BP_type_handle(BP_type); //获取应该展示的物品类别

    //遍历玩家的每个物品，按照物品的最大堆叠数量，显示到左下的背包中
    let arr = Object.keys(player.backpack_items); //将拥有的物品的key转换成一个数组
    for (let play_item_id of arr) {
        if (items[play_item_id] === undefined) {
            //玩家拥有的物品不在数据库中，应该清除
            delete player.backpack_items[play_item_id];
        } else if (Item_type_handle(type_switch, items[play_item_id].type)) {
            if (items[play_item_id].type.includes('equipment')) {
                addBP_equipment(player.backpack_items[play_item_id]);
            }
            if (items[play_item_id].type.includes('material')) {
                addBP_item(player.backpack_items[play_item_id]);
            }
        } else {
            // 玩家拥有的物品不属于当前启动的过滤规则，不显示
        }
    }
}
//显示当前激活的装备栏
function show_active_EQP() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    let EQP_value;
    // 找到当前激活的装备栏的id
    for (const radio of radios) {
        if (radio.checked) {
            EQP_value = radio.value;
        }
    }
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');
    //如果当前显示了属性界面，则切换成装备栏
    if (attribute_show.style.display == '') {
        attribute_show.style.display = 'none';
        equipment_show.style.display = '';
    }
    //切换到当前激活的的装备栏上
    for (let EQP_column of equipment_show.children) {
        EQP_column.style.display = 'none';
    }
    document.getElementById(EQP_value).style.display = '';
}

//将物品类型转义成能适应的全部类型，方便判断物品类型
function BP_type_handle(BP_type) {
    var BP_item_type = [];
    if (BP_type === undefined) {
        return BP_item_type;
    }
    switch (BP_type) {
        case 'all':
            BP_item_type.push('equipment');
            BP_item_type.push('consumable');
            BP_item_type.push('material');
            break;
        case 'EQP_all': //武器装备，全部
            BP_item_type.push('equipment');
            break;
        case 'EQP_W': //武器装备，武器
            BP_item_type.push('weapon');
            break;
        case 'EQP_A': //武器装备，防具
            BP_item_type.push('armor');
            break;
        case 'EQP_D': //武器装备，副手
            BP_item_type.push('deputy');
            break;
        case 'EQP_O': //武器装备，饰品
            BP_item_type.push('ornament');
            break;
        case 'CSB_all': //可使用物品，全部
            BP_item_type.push('consumable');
            break;
        case 'CSB_F': //可使用物品，可食用物品
            BP_item_type.push('food_CSB');
            break;
        case 'CSB_A': //可使用物品，弹药
            BP_item_type.push('ammo_CSB');
            break;
        case 'CSB_L': //可使用物品，生活消耗品
            BP_item_type.push('life_CSB');
            break;
        case 'MTR_all': //材料，全部
            BP_item_type.push('material');
            break;
        case 'MTR_R': //材料，自然材料
            BP_item_type.push('raw_MTR');
            break;
        case 'MTR_P': //材料，人工材料
            BP_item_type.push('process_MTR');
            break;
        case 'MTR_F': //材料，成品
            BP_item_type.push('finish_MTR');
            break;
        case 'MTR_O': //材料，其他物品
            BP_item_type.push('other_MTR');
            break;

        default:
            break;
    }

    return BP_item_type;
}
//判断物品类型中是否在指定过滤条件内
function Item_type_handle(type_switch, items_type) {
    for (let item_T of items_type) {
        if (type_switch.includes(item_T)) return true;
    }
    return false;
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
            BPEQP_add_click(aitem, 'item', aitem.Data);
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
        player.Player_lose_Equipment(tip_value.id, tip_value.num, rarity);
        //切换到当前激活的装备栏
        show_active_EQP();
        //将要穿戴的物品放到目前激活的装备栏的指定位置

        //获取背包界面当前激活的过滤条件
        let BP_type = get_BP_type();
        //刷新背包界面
        update_BP_value(BP_type);

        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}

//获取背包界面激活的过滤条件
function get_BP_type() {
    //测试
    const radios = document.querySelectorAll('input[name="BP_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            return radio.value;
        }
    }
}

export { update_HP, update_MP, update_ENP, update_player_name, update_BP_value };
