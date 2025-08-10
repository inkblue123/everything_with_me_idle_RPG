'use strict';
import { addElement, add_show_Tooltip, add_click_Equipment_worn_remove } from '../Function/Dom_function.js';
import { is_Empty_Object, hex2Rgba, get_object_only_key } from '../Function/Function.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';

class Player_Item {
    constructor(id) {
        this.id = id; //唯一id
        this.num = 0; //玩家拥有该物品总数
    }
}
class Player_Item_E extends Player_Item {
    constructor(id) {
        super(id);
        this.rarity = new Object(); //稀有度
    }
}

export class Player_worn {
    constructor() {
        this.worn_EQP = new Object();
    }

    init() {
        //初始化身上穿戴的装备
        for (let i = 0; i < 4; i++) {
            this.worn_EQP[`EQP_column_${i + 1}`] = new Object();
        }
    }
    //获取玩家装备栏的游戏存档
    save_Player_worn() {
        let Player_worn_save = new Object();
        Player_worn_save.worn_EQP = this.worn_EQP;
        return Player_worn_save;
    }
    //加载玩家装备栏的游戏存档
    load_Player_worn(Player_worn_save) {
        if (is_Empty_Object(Player_worn_save)) {
            return;
        }
        this.worn_EQP = Player_worn_save.worn_EQP;
        this.updata_equipment_show();
    }
    //穿戴一件装备，默认目标位置没有装备
    worn_Equipment(id, num, equip_rarity) {
        let wearing_position = items[id].wearing_position;
        if (wearing_position.length == 1) {
            //这件装备只能穿戴在指定位置，直接穿戴
            this.worn_Equipment_only_position(wearing_position[0], id, num, equip_rarity);
        } else {
            //这件装备允许穿戴在多个位置，遍历选择一个空位
            this.worn_Equipment_many_position(wearing_position, id, num, equip_rarity);
        }
        return;
    }
    //在指定位置穿戴一件装备
    worn_Equipment_only_position(wp, id, num, equip_rarity) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        //将装备放到身上的装备栏里
        ac_EQP[wp] = new Player_Item_E(id);
        ac_EQP[wp].rarity[equip_rarity] = num;
        ac_EQP[wp].num = num;
    }
    //在多个位置选择空位穿戴一件装备
    worn_Equipment_many_position(wearing_positions, id, num, equip_rarity) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        let worn_flag = false;
        //遍历可穿戴的每个位置
        for (let wp of wearing_positions) {
            let empty_flag = false;
            //判断这件装备可穿戴的位置是否为空
            if (wp == 'main_hand') {
                if (is_Empty_Object(ac_EQP['main_hand']) && is_Empty_Object(ac_EQP['main_hand_two'])) {
                    empty_flag = true;
                }
            } else if (wp == 'main_hand_two') {
                if (
                    is_Empty_Object(ac_EQP['main_hand']) &&
                    is_Empty_Object(ac_EQP['main_hand_two']) &&
                    is_Empty_Object(ac_EQP['deputy'])
                ) {
                    empty_flag = true;
                }
            } else if (wp == 'deputy') {
                if (is_Empty_Object(ac_EQP['main_hand_two']) && is_Empty_Object(ac_EQP['deputy'])) {
                    empty_flag = true;
                }
            } else if (!ac_EQP[wp]) {
                empty_flag = true;
            }
            //这个可穿戴位置确实为空，直接穿上
            if (empty_flag) {
                this.worn_Equipment_only_position(wp, id, num, equip_rarity);
                worn_flag = true;
                break;
            }
        }

        if (worn_flag) {
            //找到了空位，穿戴成功
            return true;
        } else {
            //每个位置都不空，则穿戴在第一个位置
            let wp = wearing_positions[0];
            this.worn_Equipment_only_position(wp, num, equip_rarity);
        }
    }
    //获取玩家身上指定的装备栏
    get_worn_EQP(EQP_switct) {
        if (!EQP_switct) {
            //如果没指定装备栏，则获取当前激活的装备栏
            EQP_switct = get_EQP_switch();
        }
        return this.worn_EQP[EQP_switct];
    }
    //脱下指定位置的装备，放到raw_worn_E里
    Remove_position_Equipment(wp, raw_worn_E) {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        if (ac_EQP[wp]) {
            //如果身上的目标位置已经穿戴有装备，则将其卸下
            raw_worn_E[wp] = JSON.parse(JSON.stringify(ac_EQP[wp]));
            ac_EQP[wp] = {};
        }
        if (wp == 'main_hand') {
            //针对单手武器，可以额外顶下双手武器
            if (!is_Empty_Object(ac_EQP['main_hand_two'])) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
        if (wp == 'main_hand_two') {
            //针对双手武器，需要额外卸下两个位置
            if (!is_Empty_Object(ac_EQP['main_hand'])) {
                raw_worn_E['main_hand'] = JSON.parse(JSON.stringify(ac_EQP['main_hand']));
                ac_EQP['main_hand'] = {};
            }
            if (!is_Empty_Object(ac_EQP['deputy'])) {
                raw_worn_E['deputy'] = JSON.parse(JSON.stringify(ac_EQP['deputy']));
                ac_EQP['deputy'] = {};
            }
        }
        if (wp == 'deputy') {
            //针对副手
            if (!is_Empty_Object(ac_EQP['main_hand_two'])) {
                raw_worn_E['main_hand_two'] = JSON.parse(JSON.stringify(ac_EQP['main_hand_two']));
                ac_EQP['main_hand_two'] = {};
            }
        }
    }
    //针对id物品的可穿戴位置，脱下身上即将穿戴的目标位置的原装备
    Remove_worn_Equipment(id, raw_worn_E) {
        let wearing_positions = items[id].wearing_position;
        if (wearing_positions.length == 1) {
            //这件装备只能穿戴在指定位置，如果对应位置有装备则脱下
            this.Remove_position_Equipment(wearing_positions[0], raw_worn_E);
        } else {
            let EQP_switct = get_EQP_switch();
            let ac_EQP = this.worn_EQP[EQP_switct];
            //这件装备允许穿戴在多个位置，遍历寻找空位
            for (let wp of wearing_positions) {
                let empty_flag = false;
                //判断这件装备可穿戴的位置是否为空
                if (wp == 'main_hand') {
                    if (is_Empty_Object(ac_EQP['main_hand']) && is_Empty_Object(ac_EQP['main_hand_two'])) {
                        empty_flag = true;
                    }
                } else if (wp == 'main_hand_two') {
                    if (
                        is_Empty_Object(ac_EQP['main_hand']) &&
                        is_Empty_Object(ac_EQP['main_hand_two']) &&
                        is_Empty_Object(ac_EQP['deputy'])
                    ) {
                        empty_flag = true;
                    }
                } else if (wp == 'deputy') {
                    if (is_Empty_Object(ac_EQP['main_hand_two']) && is_Empty_Object(ac_EQP['deputy'])) {
                        empty_flag = true;
                    }
                } else if (!ac_EQP[wp]) {
                    empty_flag = true;
                }
                //存在可穿戴位置，不需要脱下
                if (empty_flag) {
                    return true;
                }
            }
            //每个位置都不空，则脱下第一个位置的装备
            this.Remove_position_Equipment(wearing_positions[0], raw_worn_E);
        }
    }
    //判断当前是否每个防具部位都穿着了装备
    if_all_armor_attacted() {
        let EQP_switct = get_EQP_switch();
        let ac_EQP = this.worn_EQP[EQP_switct];
        if (is_Empty_Object(ac_EQP['head'])) return false;
        if (is_Empty_Object(ac_EQP['chest'])) return false;
        if (is_Empty_Object(ac_EQP['legs'])) return false;
        if (is_Empty_Object(ac_EQP['feet'])) return false;
        return true;
    }
    // 更新装备栏中显示的内容
    updata_equipment_show(EQP_column) {
        if (!EQP_column) {
            //如果没指定装备栏，则获取当前激活的装备栏id
            EQP_column = get_EQP_switch();
        }
        //清空原本装备栏的内容
        delete_equipment_show(EQP_column);
        //获取装备栏的具体组件
        let EQP_div_data = get_EQP_data(EQP_column);
        //读取玩家身上穿戴的装备信息，显示到装备栏上
        let player_EQP_column = this.get_worn_EQP(EQP_column);
        for (let wearing_position in player_EQP_column) {
            //如果位置上没有装备信息，不处理
            if (is_Empty_Object(player_EQP_column[wearing_position])) continue;

            if (enums.wearing_position.includes(wearing_position)) {
                add_aEQP_data(player_EQP_column[wearing_position], wearing_position, 1);
            } else if (wearing_position == 'main_hand_two') {
                //双手武器单独处理
                add_aEQP_data(player_EQP_column[wearing_position], 'main_hand', 1);
                add_aEQP_data(player_EQP_column[wearing_position], 'deputy', 1);
            } else {
                console.log('异常位置 ：%s', wearing_position);
            }
        }
    }
    //显示当前激活的装备栏
    show_active_EQP() {
        const attribute_show = document.getElementById('attribute_show');
        const equipment_show = document.getElementById('equipment_show');
        //如果当前显示了属性界面，则切换成装备栏
        if (attribute_show.style.display == '') {
            attribute_show.style.display = 'none';
            equipment_show.style.display = '';
            const PA_switch_button = document.getElementById('PA_switch_button');
            const EQP_switch_button = document.getElementById('EQP_switch_button');
            EQP_switch_button.style.display = 'none';
            PA_switch_button.style.display = '';
        }
        //切换到当前激活的的装备栏上
        for (let EQP_column of equipment_show.children) {
            EQP_column.style.display = 'none';
        }
        let EQP_value = get_EQP_switch();
        document.getElementById(EQP_value).style.display = '';
    }
}
//重新生成左上角装备展示界面的元素
function delete_equipment_show(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_arms_div = EQP_column_div.children[0].children[0]; //容纳武器的div
    let EQP_Armor_div = EQP_column_div.children[0].children[1]; //容纳4个防具的div
    let EQP_deputy_div = EQP_column_div.children[0].children[2]; //容纳副手的div
    EQP_arms_div.replaceChildren();
    EQP_Armor_div.replaceChildren();
    EQP_deputy_div.replaceChildren();
    //重新创建展示框
    addElement(EQP_arms_div, 'div', null, 'hand_EQP_show', '');
    for (let j = 0; j < 4; j++) {
        addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
    }
    addElement(EQP_deputy_div, 'div', null, 'hand_EQP_show', '');
    let EQP_div_data = get_EQP_data(EQP_column);
    //初始化展示框内容
    for (let i in EQP_div_data) {
        EQP_div_data[i].innerHTML = texts[i].wearing_name;
        EQP_div_data[i].style.color = hex2Rgba(enums['ordinary'].rarity_color, 1);
        EQP_div_data[i].style.opacity = 0.5;
    }
}
//获取指定装备栏里的6个展示框
function get_EQP_data(EQP_column) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //获取装备栏的具体组件
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_div_data = new Object();
    EQP_div_data['main_hand'] = EQP_column_div.children[0].children[0].children[0]; //主手位置;
    EQP_div_data['deputy'] = EQP_column_div.children[0].children[2].children[0]; //副手位置
    EQP_div_data['head'] = EQP_column_div.children[0].children[1].children[0]; //头部位置
    EQP_div_data['chest'] = EQP_column_div.children[0].children[1].children[1]; //胸部位置
    EQP_div_data['legs'] = EQP_column_div.children[0].children[1].children[2]; //腿部位置
    EQP_div_data['feet'] = EQP_column_div.children[0].children[1].children[3]; //脚部位置
    return EQP_div_data;
}
//找到当前激活的装备栏的id
function get_EQP_switch() {
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    let EQP_value;
    // 找到当前激活的装备栏的id
    for (const radio of radios) {
        if (radio.checked) {
            return radio.value;
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
//获取指定装备栏里的一个具体位置的展示框
function get_EQP_wp_data(EQP_column, wp) {
    if (!EQP_column) {
        //如果没指定装备栏，则获取当前激活的装备栏id
        EQP_column = get_EQP_switch();
    }
    //获取装备栏的具体组件
    const EQP_column_div = document.getElementById(EQP_column);
    let EQP_wp_data = new Object();
    if (enums.wearing_position.includes(wp)) {
        //位置合法
        switch (wp) {
            case 'main_hand':
                EQP_wp_data = EQP_column_div.children[0].children[0].children[0]; //主手位置;
                break;
            case 'deputy':
                EQP_wp_data = EQP_column_div.children[0].children[2].children[0]; //副手位置
                break;
            case 'head':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[0]; //头部位置
                break;
            case 'chest':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[1]; //胸部位置
                break;
            case 'legs':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[2]; //腿部位置
                break;
            case 'feet':
                EQP_wp_data = EQP_column_div.children[0].children[1].children[3]; //脚部位置
                break;

            default:
                break;
        }
    }
    return EQP_wp_data;
}

export { get_EQP_switch };
