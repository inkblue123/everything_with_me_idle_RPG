import { addElement, addElement_radio, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_uniqueArr, is_overlap } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';
//获取配方筛选界面已选择的筛选内容
function get_SYN_FL_click_type(updata_type, click_type, click_value) {
    let obj = new Object();
    if (updata_type == undefined) {
        console.log('异常输入参数');
    } else if (updata_type == 'delete') {
        //清除所有已选
    } else if (updata_type == 'change') {
        if (click_type.substring(0, 1) == 'N') {
            if (click_type == 'N_main_type') {
                obj.SYN_FL_N_M = click_value;
            } else if (click_type == 'N_secon_type') {
                obj.SYN_FL_N_M = get_radio_switch_click_value('SYN_FL_N_M_switch'); //需求-物品大类
                obj.SYN_FL_N_S = click_value;
            } else if (click_type == 'N_item') {
                obj.SYN_FL_N_M = get_radio_switch_click_value('SYN_FL_N_M_switch'); //需求-物品大类
                obj.SYN_FL_N_S = get_radio_switch_click_value('SYN_FL_N_S_switch'); //需求-物品小类
                obj.SYN_FL_N_I = get_radio_switch_click_value('SYN_FL_N_I_switch'); //需求-具体物品
            }
            obj.SYN_FL_P_M = get_radio_switch_click_value('SYN_FL_P_M_switch'); //产物-物品大类
            obj.SYN_FL_P_S = get_radio_switch_click_value('SYN_FL_P_S_switch'); //产物-物品小类
            obj.SYN_FL_P_I = get_radio_switch_click_value('SYN_FL_P_I_switch'); //产物-具体物品
        } else if (click_type.substring(0, 1) == 'P') {
            if (click_type == 'P_main_type') {
                obj.SYN_FL_P_M = click_value;
            } else if (click_type == 'P_secon_type') {
                obj.SYN_FL_P_M = get_radio_switch_click_value('SYN_FL_P_M_switch'); //产物-物品大类
                obj.SYN_FL_P_S = click_value;
            } else if (click_type == 'P_item') {
                obj.SYN_FL_P_M = get_radio_switch_click_value('SYN_FL_P_M_switch'); //产物-物品大类
                obj.SYN_FL_P_S = get_radio_switch_click_value('SYN_FL_P_S_switch'); //产物-物品小类
                obj.SYN_FL_P_I = get_radio_switch_click_value('SYN_FL_P_I_switch'); //产物-具体物品
            }
            obj.SYN_FL_N_M = get_radio_switch_click_value('SYN_FL_N_M_switch'); //需求-物品大类
            obj.SYN_FL_N_S = get_radio_switch_click_value('SYN_FL_N_S_switch'); //需求-物品小类
            obj.SYN_FL_N_I = get_radio_switch_click_value('SYN_FL_N_I_switch'); //需求-具体物品
        } else {
            console.log('异常输入参数');
        }
    }

    //如果选择了比较细的筛选内容，将上级筛选内容自动选择
    if (!is_Empty_Object(obj.SYN_FL_N_I)) {
        obj.SYN_FL_N_S = items[obj.SYN_FL_N_I].secon_type[0];
        obj.SYN_FL_N_M = items[obj.SYN_FL_N_I].main_type;
    }
    if (!is_Empty_Object(obj.SYN_FL_N_S)) {
        if (enums['all_secon_type'].includes(obj.SYN_FL_N_S)) {
            //选中的子类是“任意**”子类合集
            let secon_type = enums[obj.SYN_FL_N_S][0];
            if (enums['Equipment_secon_type'].includes(secon_type)) {
                obj.SYN_FL_N_M = 'equipment';
            } else if (enums['Consumable_secon_type'].includes(secon_type)) {
                obj.SYN_FL_N_M = 'consumable';
            } else if (enums['Material_secon_type'].includes(secon_type)) {
                obj.SYN_FL_N_M = 'material';
            }
        } else if (enums['Item_secon_type'].includes(obj.SYN_FL_N_S)) {
            //选中的子类就是一个子类，判断这个子类属于哪个大类
            if (enums['Equipment_secon_type'].includes(obj.SYN_FL_N_S)) {
                obj.SYN_FL_N_M = 'equipment';
            } else if (enums['Consumable_secon_type'].includes(obj.SYN_FL_N_S)) {
                obj.SYN_FL_N_M = 'consumable';
            } else if (enums['Material_secon_type'].includes(obj.SYN_FL_N_S)) {
                obj.SYN_FL_N_M = 'material';
            }
        }
    }

    if (!is_Empty_Object(obj.SYN_FL_P_I)) {
        obj.SYN_FL_P_S = items[obj.SYN_FL_P_I].secon_type[0];
        obj.SYN_FL_P_M = items[obj.SYN_FL_P_I].main_type;
    }
    if (!is_Empty_Object(obj.SYN_FL_P_S)) {
        if (enums['all_secon_type'].includes(obj.SYN_FL_P_S)) {
            //选中的子类是“任意**”子类合集
            let secon_type = enums[obj.SYN_FL_P_S][0];
            if (enums['Equipment_secon_type'].includes(secon_type)) {
                obj.SYN_FL_P_M = 'equipment';
            } else if (enums['Consumable_secon_type'].includes(secon_type)) {
                obj.SYN_FL_P_M = 'consumable';
            } else if (enums['Material_secon_type'].includes(secon_type)) {
                obj.SYN_FL_P_M = 'material';
            }
        } else if (enums['Item_secon_type'].includes(obj.SYN_FL_P_S)) {
            //选中的子类就是一个子类，判断这个子类属于哪个大类
            if (enums['Equipment_secon_type'].includes(obj.SYN_FL_P_S)) {
                obj.SYN_FL_P_M = 'equipment';
            } else if (enums['Consumable_secon_type'].includes(obj.SYN_FL_P_S)) {
                obj.SYN_FL_P_M = 'consumable';
            } else if (enums['Material_secon_type'].includes(obj.SYN_FL_P_S)) {
                obj.SYN_FL_P_M = 'material';
            }
        }
    }

    return obj;
}

//清空合成制造技能的第二个界面，配方筛选的筛选界面所有内容
function delete_SYN_FL_value() {
    const SYN_FL_N_main_type_choice_value = document.getElementById('SYN_FL_N_main_type_choice_value');
    SYN_FL_N_main_type_choice_value.replaceChildren();
    const SYN_FL_N_secon_type_choice_value = document.getElementById('SYN_FL_N_secon_type_choice_value');
    SYN_FL_N_secon_type_choice_value.replaceChildren();
    const SYN_FL_N_item_choice_value = document.getElementById('SYN_FL_N_item_choice_value');
    SYN_FL_N_item_choice_value.replaceChildren();
    const SYN_FL_P_main_type_choice_value = document.getElementById('SYN_FL_P_main_type_choice_value');
    SYN_FL_P_main_type_choice_value.replaceChildren();
    const SYN_FL_P_secon_type_choice_value = document.getElementById('SYN_FL_P_secon_type_choice_value');
    SYN_FL_P_secon_type_choice_value.replaceChildren();
    const SYN_FL_P_item_choice_value = document.getElementById('SYN_FL_P_item_choice_value');
    SYN_FL_P_item_choice_value.replaceChildren();

    const SYN_FL_N_main_type_delete_button = document.getElementById('SYN_FL_N_main_type_delete_button');
    SYN_FL_N_main_type_delete_button.style.display = 'none';
    const SYN_FL_N_main_type_set_button = document.getElementById('SYN_FL_N_main_type_set_button');
    SYN_FL_N_main_type_set_button.style.display = 'none';
    const SYN_FL_N_secon_type_delete_button = document.getElementById('SYN_FL_N_secon_type_delete_button');
    SYN_FL_N_secon_type_delete_button.style.display = 'none';
    const SYN_FL_N_secon_type_set_button = document.getElementById('SYN_FL_N_secon_type_set_button');
    SYN_FL_N_secon_type_set_button.style.display = 'none';
    const SYN_FL_N_item_delete_button = document.getElementById('SYN_FL_N_item_delete_button');
    SYN_FL_N_item_delete_button.style.display = 'none';
    const SYN_FL_N_item_set_button = document.getElementById('SYN_FL_N_item_set_button');
    SYN_FL_N_item_set_button.style.display = 'none';
    const SYN_FL_P_main_type_delete_button = document.getElementById('SYN_FL_P_main_type_delete_button');
    SYN_FL_P_main_type_delete_button.style.display = 'none';
    const SYN_FL_P_main_type_set_button = document.getElementById('SYN_FL_P_main_type_set_button');
    SYN_FL_P_main_type_set_button.style.display = 'none';
    const SYN_FL_P_secon_type_delete_button = document.getElementById('SYN_FL_P_secon_type_delete_button');
    SYN_FL_P_secon_type_delete_button.style.display = 'none';
    const SYN_FL_P_secon_type_set_button = document.getElementById('SYN_FL_P_secon_type_set_button');
    SYN_FL_P_secon_type_set_button.style.display = 'none';
    const SYN_FL_P_item_delete_button = document.getElementById('SYN_FL_P_item_delete_button');
    SYN_FL_P_item_delete_button.style.display = 'none';
    const SYN_FL_P_item_set_button = document.getElementById('SYN_FL_P_item_set_button');
    SYN_FL_P_item_set_button.style.display = 'none';
}

//获取配方筛选界面需要展示的所有内容
function get_SYN_FL_show_value(SYN_FL_N_type, SYN_FL_P_type, SYN_FL_C) {
    let obj = new Object();
    //需求筛选部分
    obj.need_main_type = new Array();
    obj.need_secon_type = new Array();
    obj.need_item = new Array();
    //产物筛选部分
    obj.product_main_type = new Array();
    obj.product_secon_type = new Array();
    obj.product_item = new Array();

    let P_SYN_formulas = player.get_player_skill_formulas('SYN'); //玩家的合成制造配方
    for (let formula_id in P_SYN_formulas) {
        if (SYN_FL_N_type == 'SYN_FL_N_T_A') {
            //要展示所有配方的需求物品
            for (let formula_material of formulas[formula_id].material) {
                let item_id = formula_material.id; //需求材料id
                if (enums['all_secon_type'].includes(item_id)) {
                    //配方的这个材料是“任意**”子类合集
                    let secon_type = enums[item_id][0]; //从子类合集中取一个具体子类
                    //判断这个子类属于哪个大类
                    if (enums['Equipment_secon_type'].includes(secon_type)) {
                        obj.need_main_type.push('equipment');
                    } else if (enums['Consumable_secon_type'].includes(secon_type)) {
                        obj.need_main_type.push('consumable');
                    } else if (enums['Material_secon_type'].includes(secon_type)) {
                        obj.need_main_type.push('material');
                    }
                    //记录子类合集
                    obj.need_secon_type.push(item_id);
                } else if (enums['Item_secon_type'].includes(item_id)) {
                    //配方的这个材料是某个子类
                    //判断这个子类属于哪个大类
                    if (enums['Equipment_secon_type'].includes(item_id)) {
                        obj.need_main_type.push('equipment');
                    } else if (enums['Consumable_secon_type'].includes(item_id)) {
                        obj.need_main_type.push('consumable');
                    } else if (enums['Material_secon_type'].includes(item_id)) {
                        obj.need_main_type.push('material');
                    }
                    //记录子类合集
                    obj.need_secon_type.push(item_id);
                } else if (!is_Empty_Object(items[item_id])) {
                    //配方的这个材料是某个具体物品
                    obj.need_main_type.push(items[item_id].main_type); //记录这个需求材料的大类
                    obj.need_secon_type = obj.need_secon_type.concat(items[item_id].secon_type); //记录这个需求材料的所有小类
                    obj.need_item.push(item_id); //记录这个需求材料的物品名
                } else {
                    console.log('%s配方的材料需求%s不属于已知类型，无法判断', formula_id, m_id);
                }
            }
        }
        if (SYN_FL_P_type == 'SYN_FL_P_T_A') {
            //要展示所有配方的产物
            let item_id = formulas[formula_id].product.id;
            obj.product_main_type.push(items[item_id].main_type); //记录这个产物的大类
            obj.product_secon_type = obj.product_secon_type.concat(items[item_id].secon_type); //记录这个产物的所有小类
            obj.product_item.push(item_id); //记录这个产物的物品名
        }
    }
    let P_backpack = player.get_player_backpack(); //玩家物品管理类
    let backpack_items = P_backpack.get_BP_all_item(); //玩家所有物品对象
    for (let item_key in backpack_items) {
        if (SYN_FL_N_type == 'SYN_FL_N_T_E') {
            //要展示当前拥有的可用物品
            let item_id = backpack_items[item_key].id;
            obj.need_main_type.push(items[item_id].main_type); //记录这个需求材料的大类
            obj.need_secon_type = obj.need_secon_type.concat(items[item_id].secon_type); //记录这个需求材料的所有小类
            obj.need_item.push(item_id); //记录这个需求材料的物品名
        }
        if (SYN_FL_P_type == 'SYN_FL_P_T_E') {
            //从当前拥有的可用物品选择
            let item_id = backpack_items[item_key].id;
            obj.product_main_type.push(items[item_id].main_type); //记录这个产物的大类
            obj.product_secon_type = obj.product_secon_type.concat(items[item_id].secon_type); //记录这个产物的所有小类
            obj.product_item.push(item_id); //记录这个产物的物品名
        }
    }
    //去重
    obj.need_main_type = get_uniqueArr(obj.need_main_type);
    obj.need_secon_type = get_uniqueArr(obj.need_secon_type);
    obj.need_item = get_uniqueArr(obj.need_item);
    obj.product_main_type = get_uniqueArr(obj.product_main_type);
    obj.product_secon_type = get_uniqueArr(obj.product_secon_type);
    obj.product_item = get_uniqueArr(obj.product_item);
    //根据已选的筛选条件，去掉不需要展示的部分
    if (!is_Empty_Object(SYN_FL_C.SYN_FL_N_M)) {
        //已经选择了需求大类，将需求子类中不符合需求大类的内容全部去除
        let retain_secon_type;
        if (SYN_FL_C.SYN_FL_N_M == 'equipment') {
            retain_secon_type = 'Equipment_secon_type';
        } else if (SYN_FL_C.SYN_FL_N_M == 'consumable') {
            retain_secon_type = 'Consumable_secon_type';
        } else if (SYN_FL_C.SYN_FL_N_M == 'material') {
            retain_secon_type = 'Material_secon_type';
        }
        let new_need_secon_type = new Array();
        for (let secon_type of obj.need_secon_type) {
            let handle_secon_type;
            if (enums['all_secon_type'].includes(secon_type)) {
                //选中的子类是“任意**”子类合集，取合集的第一个当作子类进行判断
                handle_secon_type = enums[secon_type][0];
            } else if (enums['Item_secon_type'].includes(secon_type)) {
                //选中的子类就是一个子类，判断这个子类属于哪个大类
                handle_secon_type = secon_type;
            }

            if (enums[retain_secon_type].includes(handle_secon_type)) {
                new_need_secon_type.push(secon_type);
            }
        }
        obj.need_secon_type = new_need_secon_type;
    }
    if (!is_Empty_Object(SYN_FL_C.SYN_FL_N_S)) {
        if (!obj.need_secon_type.includes(SYN_FL_C.SYN_FL_N_S)) {
            console.log('处理配方需要展示内容时异常，选择的需求子类不存在');
        }
        //已经选择了子类，将具体物品中不符合子类的内容全部去除
        let click_secon_type = new Array();
        if (enums['all_secon_type'].includes(SYN_FL_C.SYN_FL_N_S)) {
            //选中的子类是“任意**”子类合集
            click_secon_type = enums[SYN_FL_C.SYN_FL_N_S];
        } else if (enums['Item_secon_type'].includes(SYN_FL_C.SYN_FL_N_S)) {
            //选中的子类就是一个子类，转换成数组方便后面判断
            click_secon_type.push(SYN_FL_C.SYN_FL_N_S);
        }
        let new_need_item = new Array();
        for (let item_id of obj.need_item) {
            //判断选择的子类和具体物品的子类是否有交集
            if (is_overlap(click_secon_type, items[item_id].secon_type)) {
                new_need_item.push(item_id);
            }
        }
        obj.need_item = new_need_item;
    }
    if (!is_Empty_Object(SYN_FL_C.SYN_FL_N_I)) {
        //校验需求具体物品
        if (!obj.need_item.includes(SYN_FL_C.SYN_FL_N_I)) {
            console.log('处理配方需要展示内容时异常，选择的需求具体物品不存在');
        }
    }

    if (!is_Empty_Object(SYN_FL_C.SYN_FL_P_M)) {
        //已经选择了大类，将子类中不符合大类的内容全部去除
        let retain_secon_type;
        if (SYN_FL_C.SYN_FL_P_M == 'equipment') {
            retain_secon_type = 'Equipment_secon_type';
        } else if (SYN_FL_C.SYN_FL_P_M == 'consumable') {
            retain_secon_type = 'Consumable_secon_type';
        } else if (SYN_FL_C.SYN_FL_P_M == 'material') {
            retain_secon_type = 'Material_secon_type';
        }
        let new_product_secon_type = new Array();
        for (let secon_type of obj.product_secon_type) {
            let handle_secon_type;
            if (enums['all_secon_type'].includes(secon_type)) {
                //选中的子类是“任意**”子类合集，在产物分类里不应该出现
                console.log('产物子类中出现了“任意**”子类合集，异常');
            } else if (enums['Item_secon_type'].includes(secon_type)) {
                //选中的子类就是一个子类，判断这个子类属于哪个大类
                handle_secon_type = secon_type;
            }

            if (enums[retain_secon_type].includes(handle_secon_type)) {
                new_product_secon_type.push(secon_type);
            }
        }
        obj.product_secon_type = new_product_secon_type;
    }
    if (!is_Empty_Object(SYN_FL_C.SYN_FL_P_S)) {
        if (!obj.product_secon_type.includes(SYN_FL_C.SYN_FL_P_S)) {
            console.log('处理配方需要展示内容时异常，选择的需求子类不存在');
        }
        //已经选择了子类，将具体物品中不符合子类的内容全部去除
        let click_secon_type = new Array();
        if (enums['all_secon_type'].includes(SYN_FL_C.SYN_FL_P_S)) {
            //选中的子类是“任意**”子类合集
            console.log('产物子类中出现了“任意**”子类合集，异常');
        } else if (enums['Item_secon_type'].includes(SYN_FL_C.SYN_FL_P_S)) {
            //选中的子类就是一个子类，转换成数组方便后面判断
            click_secon_type.push(SYN_FL_C.SYN_FL_P_S);
        }
        let new_product_item = new Array();
        for (let item_id of obj.product_item) {
            //判断选择的子类和具体物品的子类是否有交集
            if (is_overlap(click_secon_type, items[item_id].secon_type)) {
                new_product_item.push(item_id);
            }
        }
        obj.product_item = new_product_item;
    }
    if (!is_Empty_Object(SYN_FL_C.SYN_FL_P_I)) {
        //校验需求具体物品
        if (!obj.product_item.includes(SYN_FL_C.SYN_FL_P_I)) {
            console.log('处理配方需要展示内容时异常，选择的产物具体物品不存在');
        }
    }

    return obj;
}

// 填充指定筛选条件下需要展示的内容
function set_a_SYN_FL_show_value(choice_id, click_value, value_attr) {
    //获取下拉框div
    let choice_div_id = 'SYN_FL_' + choice_id + '_choice_value';
    let switch_name = {
        N_main_type: 'SYN_FL_N_M_switch',
        N_secon_type: 'SYN_FL_N_S_switch',
        N_item: 'SYN_FL_N_I_switch',
        P_main_type: 'SYN_FL_P_M_switch',
        P_secon_type: 'SYN_FL_P_S_switch',
        P_item: 'SYN_FL_P_I_switch',
    };
    let choice_switch_id = switch_name[choice_id];
    let SYN_FL_choice_value = document.getElementById(choice_div_id);
    //将数组中的每个id都取名称然后添加到下拉框中
    for (let value_id of value_attr) {
        let name;
        let Details_div;
        let radio_div_id;
        if (!is_Empty_Object(items[value_id])) {
            name = items[value_id].name;
            Details_div = addElement(SYN_FL_choice_value, 'div', '', 'radio_div SYN_FL_item_button');
        } else {
            name = texts[value_id].type_name;
            Details_div = addElement(SYN_FL_choice_value, 'div', '', 'radio_div SYN_FL_item_type_button');
        }
        radio_div_id = 'SYN_FL_' + choice_id + '_' + value_id;
        addElement_radio(Details_div, radio_div_id, choice_switch_id, value_id, name);
    }
    //为下拉框的每个对象添加点击事件
    let select_id = 'input[name="' + choice_switch_id + '"]';
    const radios = document.querySelectorAll(select_id);
    for (const radio of radios) {
        radio.addEventListener('click', function () {
            let live_plan_manage = global.get_live_plan_manage();
            let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
            synthesis_manage.updata_SYN_FL_value('change', choice_id, this.value);
        });
    }

    if (!is_Empty_Object(click_value)) {
        //选中了筛选条件，显示清空和确认按钮
        let delete_button_id = 'SYN_FL_' + choice_id + '_delete_button';
        const SYN_FL_delete_button = document.getElementById(delete_button_id);
        SYN_FL_delete_button.style.display = '';
        let set_button_id = 'SYN_FL_' + choice_id + '_set_button';
        const SYN_FL_set_button = document.getElementById(set_button_id);
        SYN_FL_set_button.style.display = '';

        const children = SYN_FL_choice_value.children;
        for (let i = 0; i < children.length; i++) {
            const click_div = children[i];
            if (click_div.children[0].value != click_value) {
                continue;
            }
            //将筛选条件的对象点亮，移动到可显示的位置
            click_div.children[0].checked = true;
            click_div.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
            break;
        }
    }
}
export { get_SYN_FL_click_type, delete_SYN_FL_value, get_SYN_FL_show_value, set_a_SYN_FL_show_value };
