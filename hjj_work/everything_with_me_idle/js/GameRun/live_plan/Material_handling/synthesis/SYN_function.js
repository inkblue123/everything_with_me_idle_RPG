import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, is_overlap } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

//在指定配方界面添加配方
function add_formula(SYN_min, formula_id) {
    let player_formulas_manage = player.get_player_formulas_manage();
    let P_SYN_formulas = player_formulas_manage.get_player_skill_formulas('SYN'); //玩家所有配方

    let material_ch = ''; //左侧需求材料的文本
    if (P_SYN_formulas[formula_id].status == 'know') {
        //添加完全学习的配方需求
        for (let i = 0; i < formulas[formula_id].material.length; i++) {
            let material_obj = formulas[formula_id].material[i];
            let m_name = ''; //需求材料名
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
            if (material_obj.num == 1) {
                material_ch = material_ch + m_name;
            } else {
                material_ch = material_ch + m_name + ' X' + material_obj.num;
            }

            if (i != formulas[formula_id].material.length - 1) {
                material_ch = material_ch + ' + ';
            }
        }
    } else if (P_SYN_formulas[formula_id].status == 'study') {
        //添加还在学习的配方需求
    }
    //生成配方产出
    let product_ch = ''; //右侧产物的文本
    let product_obj = formulas[formula_id].product;
    let item_name = texts[product_obj.id].item_name;
    if (product_obj.num == 1) {
        product_ch = product_ch + item_name;
    } else {
        product_ch = product_ch + item_name + ' X' + product_obj.num;
    }
    //生成这个配方的简要内容div
    let formula_value_div_id = SYN_min + '_formula_value_div';
    let formula_value_div = document.getElementById(formula_value_div_id);
    let formula_value = addElement(formula_value_div, 'div', null, 'formula_value');
    let formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
    formula_value_l.innerHTML = material_ch;
    let formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
    formula_value_r.innerHTML = product_ch;
    //判断配方能否制作
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let now_quantity_num = synthesis_manage.get_now_quantity_num();
    let make_flag = synthesis_manage.check_now_formula(formula_id, now_quantity_num);
    if (make_flag) {
        formula_value.style.backgroundColor = '#00ff0033'; //可以制造显示绿色
    } else {
        formula_value.style.backgroundColor = '#ff000033'; //不可制造显示红色
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
//获取当前正在使用合成制造的哪个子功能
function get_SYN_min_name() {
    let MH_name = get_radio_switch_click_value('SYN_switch');
    let MH_min_name = MH_name.slice(0, 6);
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
    FD_P_value_div.replaceChildren();
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
    //还没有开发这几个子界面，不用清空
    if (SYN_min == 'SYN_FL' || SYN_min == 'SYN_RS' || SYN_min == 'SYN_EN') {
        return;
    }
    if (SYN_min == 'SYN_FL') {
        SYN_min = 'SYN_FM';
    }
    let no_formula_div_id = SYN_min + '_no_formula_div';
    let formula_Details_div_id = SYN_min + '_formula_Details_div';
    const no_formula_div = document.getElementById(no_formula_div_id);
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    no_formula_div.style.display = '';
    formula_Details_div.style.display = 'none';
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
            let live_plan_manage = global.get_live_plan_manage();
            let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
            let can_flag = synthesis_manage.check_now_formula(formula_id, 1);

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
export {
    add_formula,
    change_synthesis_div,
    get_SYN_min_name,
    get_SYN_formula_switch_type, //
    init_SYN_formula_Details_div,
    delete_SYN_formula_Details_div,
    get_formula_product,
    SYN_switch_type_handle,
};
