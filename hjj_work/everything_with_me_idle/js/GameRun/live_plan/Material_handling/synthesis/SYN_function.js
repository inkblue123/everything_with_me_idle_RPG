import { addElement, addElement_radio, add_show_Tooltip, add_formula_product_tooltip, get_radio_switch_click_value, crtElement } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, is_overlap, get_dataset_value, set_dataset_value } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

//在指定配方界面添加配方
function add_SYN_formula(SYN_min, formula_id) {
    let player_formulas_manage = player.get_player_formulas_manage();
    let P_SYN_formulas = player_formulas_manage.get_player_skill_formulas('SYN'); //玩家所有配方
    let now_quantity_num = get_now_quantity_num(SYN_min);

    let material_ch = ''; //左侧需求材料的文本
    if (P_SYN_formulas[formula_id].status == 'know') {
        //添加完全学习的配方需求
        material_ch = build_formula_material_ch(formula_id, false, now_quantity_num);
    } else if (P_SYN_formulas[formula_id].status == 'study') {
        //添加还在学习的配方需求，未解锁图鉴的材料显示？？？
        material_ch = build_formula_material_ch(formula_id, true, now_quantity_num);
    }
    //生成配方产出
    let product_ch = ''; //右侧产物的文本
    let product_obj = formulas[formula_id].product;
    let item_name = texts[product_obj.id].item_name;
    let show_num = product_obj.num * now_quantity_num;
    if (show_num == 1) {
        product_ch = product_ch + item_name;
    } else {
        product_ch = product_ch + item_name + ' X' + show_num;
    }
    //生成这个配方的简要内容div
    let formula_value_div_id = SYN_min + '_formula_value_div';
    let formula_value_div = document.getElementById(formula_value_div_id);
    let formula_value = addElement(formula_value_div, 'div', null, 'formula_value');
    let formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
    formula_value_l.innerHTML = material_ch;
    let formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
    formula_value_r.innerHTML = product_ch;
    //鼠标移到产物上时展示该产物的物品详情（白板）
    add_formula_product_tooltip(formula_value_r, formula_id);
    //判断配方能否制作
    let make_flag = check_now_SYN_formula(formula_id, now_quantity_num);
    if (P_SYN_formulas[formula_id].status == 'study') {
        //研究状态的配方始终视作不可制作，显示灰色
        formula_value.style.backgroundColor = enums['show_study_color'];
    } else if (make_flag) {
        formula_value.style.backgroundColor = enums['show_can_color']; //可以制造显示绿色
    } else {
        formula_value.style.backgroundColor = enums['show_nocan_color']; //不可制造显示红色
    }
    //添加鼠标点击会显示详情的功能
    formula_value.addEventListener('click', () => {
        let live_plan_manage = global.get_live_plan_manage();
        let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
        //保存当前选定的配方
        synthesis_manage.set_now_formula(formula_id);
        //更新配方详情
        synthesis_manage.updata_SYN_formula_Details_div();
    });
}
//构建配方左侧的需求材料文本
//check_library_flag为true时（研究状态），未解锁图鉴的材料显示？？？
function build_formula_material_ch(formula_id, check_library_flag, quantity_num) {
    let material_ch = ''; //左侧需求材料的文本
    let library_manage = null;
    if (check_library_flag) {
        //研究状态需要访问图鉴系统判断材料是否解锁
        library_manage = global.get_library_manage();
    }
    let formula_materials = formulas[formula_id].material;
    for (let i = 0; i < formula_materials.length; i++) {
        let material_obj = formula_materials[i];
        let m_name = ''; //需求材料名
        let m_unlock = true; //材料是否解锁过图鉴
        if (check_library_flag) {
            //研究状态，检查该材料是否解锁过图鉴
            m_unlock = library_manage.is_formula_material_unlocked(material_obj.id);
        }
        if (m_unlock) {
            //解锁过图鉴（或完全学习），按材料类型取名
            if (enums['all_secon_type'].includes(material_obj.id)) {
                //配方的这个材料是“任意**”子类合集
                m_name = texts[material_obj.id].type_name;
            } else if (enums['Item_secon_type'].includes(material_obj.id)) {
                //配方的这个材料是某个子类
                m_name = '任意' + texts[material_obj.id].type_name;
            } else if (!is_Empty_Object(items[material_obj.id])) {
                //配方的这个材料是某个具体物品
                m_name = texts[material_obj.id].item_name;
            } else {
                console.log('%s配方的材料需求%s不属于已知类型，无法判断', formula_id, material_obj.id);
            }
            //名字+数量
            let show_num = material_obj.num * quantity_num;
            if (show_num == 1) {
                material_ch = material_ch + m_name;
            } else {
                material_ch = material_ch + m_name + ' X' + show_num;
            }
        } else {
            //未解锁图鉴，单纯显示？？？
            material_ch = material_ch + '？？？';
        }

        if (i != formula_materials.length - 1) {
            material_ch = material_ch + ' + ';
        }
    }
    return material_ch;
}
//获取当前正在使用合成制造的哪个子功能
function get_SYN_min_name() {
    let MH_name = get_radio_switch_click_value('SYN_switch');
    let MH_min_name = MH_name.slice(0, 6);
    //配方筛选按钮实际上可能有两个界面，需要再查看具体是哪个界面
    if (MH_min_name == 'SYN_FL') {
        let SYN_FL_value_div = document.getElementById('SYN_FL_value_div');
        let SYN_FM_value_div = document.getElementById('SYN_FM_value_div');
        if (SYN_FL_value_div.style.display == 'none' && SYN_FM_value_div.style.display == '') {
            MH_min_name = 'SYN_FM';
        } else if (SYN_FL_value_div.style.display == '' && SYN_FM_value_div.style.display == 'none') {
            MH_min_name = 'SYN_FL';
        } else if (SYN_FL_value_div.style.display == 'none' && SYN_FM_value_div.style.display == 'none') {
            MH_min_name = 'SYN_FL';
        } else {
            console.log('获取合成制造技能当前使用界面时的异常');
        }
    }

    return MH_min_name;
}
//切换到合成制造技能的指定子功能
function change_synthesis_div(SYN_min) {
    let div_obj = {
        SYN_MK: 'SYN_MK_value_div', //
        SYN_FL: 'SYN_FL_value_div',
        SYN_FM: 'SYN_FM_value_div',
        SYN_RS: 'SYN_RS_value_div',
        SYN_EN: 'SYN_EN_value_div',
    };

    for (let key in div_obj) {
        let div = document.getElementById(div_obj[key]);
        if (SYN_min == key) {
            div.style.display = '';
        } else {
            div.style.display = 'none';
        }
    }
}
//初始化合成制造技能界面的制造界面的配方详情
function init_SYN_formula_Details_div(SYN_min) {
    //把指定合成制造子功能的配方详情切换到有详情的状态
    let no_formula_div_id = SYN_min + '_no_formula_div'; //无配方填充页
    let formula_Details_div_id = SYN_min + '_formula_Details_div'; //配方详情页
    const no_formula_div = document.getElementById(no_formula_div_id);
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    no_formula_div.style.display = 'none';
    formula_Details_div.style.display = '';
    //将旧的配方详情清空
    let FD_N_value_div_id = SYN_min + '_FD_N_value_div'; //配方详情页的材料需求
    let FD_E_value_div_id = SYN_min + '_FD_E_value_div'; //配方详情页的工作环境
    let FD_P_value_div_id = SYN_min + '_FD_P_value_div'; //配方详情页的产物
    const FD_N_value_div = document.getElementById(FD_N_value_div_id);
    const FD_E_value_div = document.getElementById(FD_E_value_div_id);
    const FD_P_value_div = document.getElementById(FD_P_value_div_id);
    FD_N_value_div.replaceChildren();
    FD_E_value_div.innerHTML = '';
    //产物div上面挂着提示窗的鼠标监听，只有连元素一起换掉才能丢弃旧监听，避免反复叠加
    FD_P_value_div.replaceWith(crtElement('div', FD_P_value_div_id, FD_P_value_div.className));
}
//获取合成制造技能中，指定子功能的配方筛选条件
function get_SYN_formula_switch_type(SYN_min) {
    let SYN_formula_switch_type = new Object();

    SYN_formula_switch_type.SYN_min = SYN_min;
    //是否选择了“当前可制造”筛选按钮
    let SYN_choice_no_make_div_id = SYN_min + '_choice_no_make';
    let SYN_choice_can_make_div_id = SYN_min + '_choice_can_make';
    const SYN_choice_no_make = document.getElementById(SYN_choice_no_make_div_id);
    const SYN_choice_can_make = document.getElementById(SYN_choice_can_make_div_id);
    if (SYN_choice_no_make.style.display == '') {
        SYN_formula_switch_type.can_make_flag = 'all';
    } else if (SYN_choice_can_make.style.display == '') {
        SYN_formula_switch_type.can_make_flag = 'can_make';
    }
    //选择了产出哪种物品的配方
    let SYN_type_switch_id = SYN_min + '_type_switch';
    SYN_formula_switch_type.product_type = get_radio_switch_click_value(SYN_type_switch_id);
    return SYN_formula_switch_type;
}
//清空合成制造技能界面的制造界面的配方详情
function delete_SYN_formula_Details_div(SYN_min) {
    //这几个子界面没有配方详情，不用清空
    if (SYN_min == 'SYN_EN') {
        return;
    }
    //如果是要清空配方筛选的筛选界面，实际上是要清空配方筛选的制造界面
    if (SYN_min == 'SYN_FL') {
        SYN_min = 'SYN_FM';
    }
    let no_formula_div_id = SYN_min + '_no_formula_div';
    let formula_Details_div_id = SYN_min + '_formula_Details_div';
    const no_formula_div = document.getElementById(no_formula_div_id);
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    no_formula_div.style.display = '';
    formula_Details_div.style.display = 'none';
    if (SYN_min == 'SYN_MK' || SYN_min == 'SYN_FM') {
        //将批量选择按钮重置到1
        let quantity_button_id = SYN_min + '_FD_P_quantity_button';
        const quantity_button = document.getElementById(quantity_button_id);
        set_dataset_value(quantity_button, 'quantity_num', 1);
        quantity_button.innerHTML = '批量制造选择<br>-> X' + 1;
    }
}
//判断合成制造界面当前子功能是否展示了配方详情，返回true或false
function check_show_SYN_formula_Details_div() {
    let SYN_min = get_SYN_min_name();
    //只有SYN_MK、SYN_FM、SYN_RS可能有配方详情，其他子功能直接返回否
    if (SYN_min != 'SYN_MK' && SYN_min != 'SYN_FM' && SYN_min != 'SYN_RS') {
        return false;
    }
    //配方详情是否展示：详情div处于显示状态即视为已展示
    let formula_Details_div_id = SYN_min + '_formula_Details_div';
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    if (formula_Details_div.style.display == '') {
        return true;
    } else {
        return false;
    }
}
//获得指定配方的产物对象
function get_formula_product(formula_id, make_num, product_obj) {
    let product_id = formulas[formula_id].product.id;
    let ret;
    if (!is_Empty_Object(enums['all_work_bench'][product_id])) {
        //产出是工作环境
        ret = 'work_bench';
        product_obj.id = product_id;
        product_obj.next_level = formulas[formula_id].product.next_level;
    } else if (!is_Empty_Object(items[product_id])) {
        //产出是某种物品
        ret = 'item';
        let item_obj;
        let product_num = formulas[formula_id].product.num * parseInt(make_num);
        if (items[product_id].main_type == 'equipment') {
            //物品是装备，产物信息还应该有：稀有度
            let product_equip_rarity = formulas[formula_id].product.equip_rarity;
            item_obj = get_item_obj(product_id, product_num, product_equip_rarity);
        } else if (items[product_id].main_type == 'material') {
            //物品是材料，没有独特属性
            item_obj = get_item_obj(product_id, product_num);
        } else if (items[product_id].main_type == 'consumable') {
            //物品是消耗品，产物信息还应该有：暂无
            item_obj = get_item_obj(product_id, product_num);
        }
        Object.assign(product_obj, item_obj);
    }
    return ret;
}
//获取指定筛选条件下应该显示的合成制造技能制造子功能配方
function SYN_switch_type_handle(SYN_switch_type) {
    let formula_arr = new Array(); //应该展示的配方

    let P_SYN_formulas = player.get_player_skill_formulas('SYN'); //玩家的合成制造配方

    for (let formula_id in P_SYN_formulas) {
        //配方是否属于合成制造
        if (formulas[formula_id].skill != 'synthesis') {
            console.log('玩家身上的%s配方不属于合成制造技能', formula_id);
            continue;
        }

        //配方是否是当前子功能所属的配方
        if (formulas[formula_id].skill_min.includes(SYN_switch_type.SYN_min)) {
            //属于子功能，通过
        } else {
            //是其他子功能的配方，不通过
            continue;
        }
        //当前是否可制造筛选
        if (SYN_switch_type.can_make_flag == 'can_make') {
            //选择了“当前可制造”筛选，需要挑出可以制作的配方，不可制作的配方不通过
            let can_flag = check_now_SYN_formula(formula_id, 1);

            if (!can_flag) {
                continue;
            }
        } else if (SYN_switch_type.can_make_flag == 'all') {
            //没有选择“当前可制造”筛选，所有配方都通过这一条
        }
        //产物类型筛选
        if (SYN_switch_type.product_type == 'SYN_MK_T_A') {
            //当前选择的产物筛选是“全部”，所有配方都通过这一条
        } else {
            let product_id = formulas[formula_id].product.id;
            if (SYN_switch_type.product_type == 'SYN_MK_T_E') {
                if (items[product_id].main_type != 'equipment') {
                    continue;
                }
            } else if (SYN_switch_type.product_type == 'SYN_MK_T_C') {
                if (items[product_id].main_type != 'consumable') {
                    continue;
                }
            } else if (SYN_switch_type.product_type == 'SYN_MK_T_M') {
                if (items[product_id].main_type != 'material') {
                    continue;
                }
            }
        }

        //配方筛选界面的条件
        if (is_Empty_Object(SYN_switch_type.filter_type)) {
            //当前筛选条件里没有关于配方筛选界面的内容，所有配方都通过这一条
        } else {
            let filter_value = SYN_switch_type.filter_value;
            if (SYN_switch_type.filter_type.slice(0, 8) == 'SYN_FL_N') {
                //该配方的需求中必须有指定筛选内容，才能通过
                let filter_flag = false;
                for (let formula_material of formulas[formula_id].material) {
                    let m_id = formula_material.id; //需求材料id
                    if (enums['Item_main_type'].includes(filter_value)) {
                        //筛选内容是物品大类
                        if (enums['all_secon_type'].includes(m_id)) {
                            //配方的这个材料是“任意**”子类合集
                            let m_secon_type = enums[m_id][0];
                            if (filter_value == 'equipment' && enums['Equipment_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            } else if (filter_value == 'consumable' && enums['Consumable_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            } else if (filter_value == 'material' && enums['Material_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            }
                        } else if (enums['Item_secon_type'].includes(m_id)) {
                            //配方的这个材料是某个子类
                            if (filter_value == 'equipment' && enums['Equipment_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            } else if (filter_value == 'consumable' && enums['Consumable_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            } else if (filter_value == 'material' && enums['Material_secon_type'].includes(m_secon_type)) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            }
                        } else if (!is_Empty_Object(items[m_id])) {
                            //配方的这个材料是某个具体物品
                            if (items[m_id].main_type == filter_value) {
                                filter_flag = true; //有一种材料大类与筛选相同
                                break;
                            }
                        }
                    } else if (enums['all_secon_type'].includes(filter_value)) {
                        //筛选内容是“任意**”子类合集
                        if (enums['all_secon_type'].includes(m_id)) {
                            //配方的这个材料是“任意**”子类合集
                            if (is_overlap(enums[filter_value], enums[m_id])) {
                                filter_flag = true;
                                break;
                            }
                        } else if (enums['Item_secon_type'].includes(m_id)) {
                            //配方的这个材料是某个子类
                            if (enums[filter_value].includes(m_id)) {
                                filter_flag = true;
                                break;
                            }
                        } else if (!is_Empty_Object(items[m_id])) {
                            //配方的这个材料是某个具体物品
                            if (is_overlap(enums[filter_value], items[m_id].secon_type)) {
                                filter_flag = true;
                                break;
                            }
                        }
                    } else if (enums['Item_secon_type'].includes(filter_value)) {
                        //筛选内容是某个子类
                        if (enums['all_secon_type'].includes(m_id)) {
                            //配方的这个材料是“任意**”子类合集
                            if (enums[m_id].includes(filter_value)) {
                                filter_flag = true;
                                break;
                            }
                        } else if (enums['Item_secon_type'].includes(m_id)) {
                            //配方的这个材料是某个子类
                            if (filter_value == m_id) {
                                filter_flag = true;
                                break;
                            }
                        } else if (!is_Empty_Object(items[m_id])) {
                            //配方的这个材料是某个具体物品
                            if (items[m_id].secon_type.includes(filter_value)) {
                                filter_flag = true;
                                break;
                            }
                        }
                    } else if (!is_Empty_Object(items[filter_value])) {
                        //筛选内容是某个具体物品
                        if (enums['all_secon_type'].includes(m_id)) {
                            //配方的这个材料是“任意**”子类合集
                            if (is_overlap(enums[m_id], items[filter_value].secon_type)) {
                                filter_flag = true;
                                break;
                            }
                        } else if (enums['Item_secon_type'].includes(m_id)) {
                            //配方的这个材料是某个子类
                            if (items[filter_value].secon_type.includes(m_id)) {
                                filter_flag = true;
                                break;
                            }
                        } else if (!is_Empty_Object(items[m_id])) {
                            //配方的这个材料是某个具体物品
                            if (m_id == filter_value) {
                                filter_flag = true;
                                break;
                            }
                        }
                    } else {
                        console.log('%s筛选内容无法判断，无法获取名称', filter_value);
                    }
                }
                if (!filter_flag) {
                    continue;
                }
            } else if (SYN_switch_type.filter_type.slice(0, 8) == 'SYN_FL_P') {
                //该配方的产出中必须有指定筛选内容，才能通过
                let filter_flag = false;
                let product_id = formulas[formula_id].product.id;
                if (enums['Item_main_type'].includes(filter_value)) {
                    //筛选内容是物品大类
                    if (items[product_id].main_type == filter_value) {
                        filter_flag = true; //有一种材料大类与筛选相同
                    }
                } else if (enums['all_secon_type'].includes(filter_value)) {
                    //筛选内容是“任意**”子类合集
                    if (is_overlap(enums[filter_value], items[product_id].secon_type)) {
                        filter_flag = true; //有一种材料小类属于筛选的小类合集中
                    }
                } else if (enums['Item_secon_type'].includes(filter_value)) {
                    //筛选内容是某个子类
                    if (items[product_id].secon_type.includes(filter_value)) {
                        filter_flag = true; //有一种材料小类符合筛选的小类要求
                    }
                } else if (!is_Empty_Object(items[filter_value])) {
                    //筛选内容是某个具体物品
                    if (product_id == filter_value) {
                        filter_flag = true; //有一种材料id与筛选物品id一致
                    }
                } else {
                    console.log('%s筛选内容无法判断，无法获取名称', filter_value);
                }
                if (!filter_flag) {
                    continue;
                }
            }
        }

        //记录通过筛选的配方
        formula_arr.push(formula_id);
    }
    return formula_arr;
}
//检查输入的配方是否可以制造（通用函数）
function check_now_SYN_formula(id, num) {
    let formula_id = '';
    let quantity_num = 1;
    if (is_Empty_Object(id)) {
        console.log('没有输入配方id，无法判断');
        return false;
    } else if (is_Empty_Object(formulas[id])) {
        console.log('%s不属于配方id，不应该调用当前函数', id);
        return false;
    } else if (formulas[id].skill != 'synthesis') {
        console.log('%s配方不属于合成制造技能，不应该调用当前函数', id);
        return false;
    } else {
        formula_id = id;
        if (typeof num == 'number') {
            quantity_num = num;
        } else if (typeof num == 'string') {
            quantity_num = parseInt(num);
        }
    }

    //配方处于研究状态时始终视作不可制作
    let P_formulas = player.get_player_formulas_manage();
    let P_SYN_formulas = P_formulas.get_player_skill_formulas('SYN');
    if (!is_Empty_Object(P_SYN_formulas[formula_id]) && P_SYN_formulas[formula_id].status == 'study') {
        return false;
    }

    let make_flag = true;

    //当前配方的需求材料检查
    let P_backpack = player.get_player_backpack(); //玩家可用物品
    for (let formula_material of formulas[formula_id].material) {
        let m_id = formula_material.id; //需求材料id
        let m_num = formula_material.num * quantity_num; //需要的数量
        let BP_num = 0; //玩家拥有的数量
        if (enums['all_secon_type'].includes(m_id)) {
            //配方的这个材料是“任意**”子类合集
            BP_num = P_backpack.get_BP_all_secon_type_num(m_id);
        } else if (enums['Item_secon_type'].includes(m_id)) {
            //配方的这个材料是某个子类
            BP_num = P_backpack.get_BP_Item_secon_type_num(m_id);
        } else if (!is_Empty_Object(items[m_id])) {
            //配方的这个材料是某个具体物品
            BP_num = P_backpack.get_BP_Item_id_num(m_id);
        } else {
            console.log('%s配方的材料需求%s不属于已知类型，无法判断', formula_id, m_id);
            return false;
        }
        if (BP_num < m_num) {
            make_flag = false;
            break;
        }
    }

    //当前配方的工作环境检查
    let need_work_bench = formulas[formula_id].work_bench; //配方需求工作环境
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let SYN_now_place_work_bench = synthesis_manage.get_now_place_work_bench();
    for (let i = 0; i < need_work_bench.length; i++) {
        let work_bench_id = need_work_bench[i].id;
        let need_level = need_work_bench[i].level;
        let now_level = SYN_now_place_work_bench[work_bench_id];
        if (now_level == undefined) {
            now_level = 0;
        }
        if (need_level > now_level) {
            make_flag = false;
            break;
        }
    }
    return make_flag;
}
//更新合成制造配方详情的材料需求部分，返回材料是否充足（true：材料足够）
function updata_SYN_formula_Material_div(SYN_min, formula_id) {
    let FD_N_value_div_id = SYN_min + '_FD_N_value_div';
    let FD_N_value_div = document.getElementById(FD_N_value_div_id); //配方材料需求详情div
    let P_backpack = player.get_player_backpack(); //玩家可用物品
    let now_quantity_num = get_now_quantity_num(SYN_min); //当前批量制造数
    //获取配方学习状态，研究状态的配方始终视作不可制作
    let P_formulas_manage = player.get_player_formulas_manage();
    let P_formulas = P_formulas_manage.get_player_skill_formulas('SYN');
    let is_study = false; //配方是否处于研究状态
    if (!is_Empty_Object(P_formulas[formula_id]) && P_formulas[formula_id].status == 'study') {
        is_study = true;
    }
    let library_manage = null;
    if (is_study) {
        //研究状态需要访问图鉴系统判断材料是否解锁
        library_manage = global.get_library_manage();
    }
    let make_flag = true;
    if (is_study) {
        //研究状态的配方始终不可制作
        make_flag = false;
    }
    for (let formula_material of formulas[formula_id].material) {
        let m_id = formula_material.id; //需求材料id
        let m_name = ''; //需求材料名
        let need_item_num = formula_material.num * parseInt(now_quantity_num); //需要的数量
        let BP_num = 0; //玩家拥有的数量
        let m_unlock = true; //材料是否解锁过图鉴
        if (is_study) {
            //研究状态，检查该材料是否解锁过图鉴
            m_unlock = library_manage.is_formula_material_unlocked(m_id);
        }
        if (m_unlock) {
            //解锁过图鉴（或完全学习），按材料类型取名
            if (enums['all_secon_type'].includes(m_id)) {
                //配方的这个材料是“任意**”子类合集
                m_name = texts[m_id].type_name;
                BP_num = P_backpack.get_BP_all_secon_type_num(m_id);
            } else if (enums['Item_secon_type'].includes(m_id)) {
                //配方的这个材料是某个子类
                m_name = '任意' + texts[m_id].type_name;
                BP_num = P_backpack.get_BP_Item_secon_type_num(m_id);
            } else if (!is_Empty_Object(items[m_id])) {
                //配方的这个材料是某个具体物品
                m_name = texts[m_id].item_name;
                BP_num = P_backpack.get_BP_Item_id_num(m_id);
            } else {
                console.log('%s配方的材料需求%s不属于已知类型，无法判断', formula_id, m_id);
            }
            //正常显示材料需求
            let FD_N_ch = m_name + '( ' + BP_num + ' / ' + need_item_num + ' )';
            let Details_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
            Details_div.innerHTML = FD_N_ch;
            if (need_item_num > BP_num) {
                Details_div.style.backgroundColor = enums['show_nocan_color']; //材料不足显示红色
                make_flag = false;
            } else {
                Details_div.style.backgroundColor = enums['show_can_color']; //材料足够显示绿色
            }
        } else {
            //未解锁图鉴，显示灰色和？？？
            let Details_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
            Details_div.innerHTML = '？？？';
            Details_div.style.backgroundColor = enums['show_study_color']; //显示灰色
        }
    }
    return make_flag;
}
//更新合成制造配方详情的工作环境部分，返回工作环境是否达标（true：达标）
function updata_SYN_formula_WorkBench_div(SYN_min, formula_id, SYN_place_work_bench) {
    let FD_E_value_div_id = SYN_min + '_FD_E_value_div';
    let FD_E_value_div = document.getElementById(FD_E_value_div_id); //配方工作环境详情div
    let need_work_bench = formulas[formula_id].work_bench; //配方需求工作环境
    let need_WB_ch = '需求<br>';
    let now_WB_ch = '当前<br>';
    let WB_flag = true;
    for (let i = 0; i < need_work_bench.length; i++) {
        let work_bench_id = need_work_bench[i].id;
        let need_level = need_work_bench[i].level;
        let work_bench_name = texts[work_bench_id].work_bench_name;
        let now_level = SYN_place_work_bench[work_bench_id];
        if (now_level == undefined) {
            now_level = 0;
        }

        if (i == need_work_bench.length - 1) {
            need_WB_ch = need_WB_ch + work_bench_name + ' ' + need_level + ' 级<br>';
            now_WB_ch = now_WB_ch + work_bench_name + ' ' + now_level + ' 级';
        } else {
            need_WB_ch = need_WB_ch + work_bench_name + ' ' + need_level + ' 级 ';
            now_WB_ch = now_WB_ch + work_bench_name + ' ' + now_level + ' 级 ';
        }
        if (need_level > now_level) {
            WB_flag = false;
        }
    }
    FD_E_value_div.innerHTML = need_WB_ch + now_WB_ch;
    if (WB_flag) {
        FD_E_value_div.style.backgroundColor = enums['show_can_color']; //工作环境达标显示绿色
    } else {
        FD_E_value_div.style.backgroundColor = enums['show_nocan_color']; //工作环境不足显示红色
    }
    return WB_flag;
}
//更新合成制造配方详情的产出部分
function updata_SYN_formula_Product_div(SYN_min, formula_id) {
    let FD_P_value_div_id = SYN_min + '_FD_P_value_div';
    let FD_P_value_div = document.getElementById(FD_P_value_div_id); //配方产出
    let product_id = formulas[formula_id].product.id;
    let product_name = texts[product_id].item_name;
    let now_quantity_num = get_now_quantity_num(SYN_min); //当前批量制造数
    let product_num = formulas[formula_id].product.num * parseInt(now_quantity_num);
    let product_ch = product_name + ' X' + product_num;
    FD_P_value_div.innerHTML = product_ch;
    //添加鼠标移动上去展示产物的详情信息的功能
    //产物详情要跟随“当前配方/当前数量”实时变化，因此传的是值提供者(函数)，由提示窗在鼠标移入时求值
    add_show_Tooltip(FD_P_value_div, 'formula_product', get_now_product_preview_obj);
}
//值提供者：在鼠标移入产物区的那一刻，按“当前选定的配方 + 当前批量数量”实时算出产物对象
//返回 null：当前没有可预览的产物
function get_now_product_preview_obj() {
    let SYN_min = get_SYN_min_name();
    //从合成制造管理类中读取当前选定的配方
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let formula_id = synthesis_manage.get_now_formula();
    if (is_Empty_Object(formula_id)) {
        //尚未选定配方，预期内没有产物可预览，静默
        return null;
    }
    if (is_Empty_Object(formulas[formula_id])) {
        //选定的配方不在配方数据库中，属于数据缺失异常
        console.log('产物预览时，当前选定的配方%s未定义，异常', formula_id);
        return null;
    }
    let now_quantity_num = get_now_quantity_num(SYN_min);
    let product_obj = new Object();
    let type = get_formula_product(formula_id, now_quantity_num, product_obj);
    if (type != 'item') {
        //产物是工作环境等非物品，没有物品提示可展示
        console.log('产物预览时，产物%s是工作环境等非物品，不展示物品提示', product_obj.id);
        return null;
    }
    if (is_Empty_Object(items[product_obj.id])) {
        //产物物品不在物品数据库中，属于数据缺失异常
        console.log('产物预览时，产物物品%s未定义，异常', product_obj.id);
        return null;
    }
    return product_obj;
}
//根据当前情况调整“制造”按钮上的遮罩
function updata_SYN_make_button(SYN_min, make_flag) {
    let FD_P_make_button_id = SYN_min + '_FD_P_make_button';
    let FD_P_make_button = document.getElementById(FD_P_make_button_id);
    if (make_flag) {
        FD_P_make_button.disabled = false;
        FD_P_make_button.style.cursor = 'pointer';
    } else {
        FD_P_make_button.disabled = true;
        FD_P_make_button.style.cursor = 'not-allowed';
    }
}
//获取指定子功能中的批量制作数
function get_now_quantity_num(SYN_min) {
    if (SYN_min != 'SYN_MK' && SYN_min != 'SYN_FM') {
        console.log('%s功能不应该获取批量制作数，错误调用', SYN_min);

        return 1;
    }
    let quantity_button_id = SYN_min + '_FD_P_quantity_button';
    const quantity_button = document.getElementById(quantity_button_id);
    let now_quantity_num = get_dataset_value(quantity_button, 'quantity_num');
    return now_quantity_num;
}

export {
    add_SYN_formula,
    change_synthesis_div,
    get_SYN_min_name,
    get_SYN_formula_switch_type, //
    init_SYN_formula_Details_div,
    delete_SYN_formula_Details_div,
    check_show_SYN_formula_Details_div,
    get_formula_product,
    get_now_quantity_num,
    SYN_switch_type_handle,
    check_now_SYN_formula,
    updata_SYN_formula_Material_div,
    updata_SYN_formula_WorkBench_div,
    updata_SYN_formula_Product_div,
    updata_SYN_make_button,
};
