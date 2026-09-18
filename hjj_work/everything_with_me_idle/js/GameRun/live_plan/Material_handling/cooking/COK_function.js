import { addElement, addElement_botton, addElement_radio, add_show_Tooltip, get_radio_switch_click_value, crtElement } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_dataset_value, set_dataset_value } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

import { get_COK_CD_seasoning, get_COK_CD_seasoning_ex_data } from './COK_cooking_dishes.js';

//获取当前正在使用烹饪的哪个子功能
function get_COK_min_name() {
    let MH_name = get_radio_switch_click_value('COK_switch');
    let MH_min_name = MH_name.slice(0, 6);
    return MH_min_name;
}
//获取当前正在使用的烹饪子功能的批量制造数量（直接从批量按钮的dataset读取）
function get_now_quantity_num(COK_min) {
    let quantity_button_id = COK_min + '_FD_P_quantity_button';
    const quantity_button = document.getElementById(quantity_button_id);
    let now_quantity_num = get_dataset_value(quantity_button, 'quantity_num');
    return now_quantity_num;
}
//获取烹饪技能中，指定子功能的配方筛选条件
function get_COK_formula_switch_type(COK_min) {
    let COK_formula_switch_type = new Object();

    COK_formula_switch_type.COK_min = COK_min;
    //是否选择了"当前可制造"筛选按钮
    let COK_choice_no_make_div_id = COK_min + '_choice_no_make';
    let COK_choice_can_make_div_id = COK_min + '_choice_can_make';
    const COK_choice_no_make = document.getElementById(COK_choice_no_make_div_id);
    const COK_choice_can_make = document.getElementById(COK_choice_can_make_div_id);
    if (COK_choice_no_make.style.display == '') {
        COK_formula_switch_type.can_make_flag = 'all';
    } else if (COK_choice_can_make.style.display == '') {
        COK_formula_switch_type.can_make_flag = 'can_make';
    }
    //读取排序属性下拉框（生命/魔力/精力），返回原始 .value 索引
    let COK_attr_select_id = COK_min + '_attr_select';
    const COK_attr_select = document.getElementById(COK_attr_select_id);
    COK_formula_switch_type.sort_attr = COK_attr_select.value;
    //读取排序方向下拉框（升序/降序），返回原始 .value 索引
    let COK_dir_select_id = COK_min + '_dir_select';
    const COK_dir_select = document.getElementById(COK_dir_select_id);
    COK_formula_switch_type.sort_dir = COK_dir_select.value;
    return COK_formula_switch_type;
}
//获取指定筛选条件下应该显示的烹饪技能制造子功能配方，并按产物属性排序
function COK_switch_type_handle(COK_switch_type) {
    let formula_arr = new Array(); //应该展示的配方

    let P_COK_formulas = player.get_player_skill_formulas('COK'); //玩家的烹饪配方

    for (let formula_id in P_COK_formulas) {
        //配方是否属于烹饪技能
        if (formulas[formula_id].skill != 'cooking') {
            console.log('玩家身上的%s配方不属于烹饪技能', formula_id);
            continue;
        }

        //配方是否是当前子功能所属的配方
        if (formulas[formula_id].skill_min.includes(COK_switch_type.COK_min)) {
            //属于子功能，通过
        } else {
            //是其他子功能的配方，不通过
            continue;
        }
        //当前是否可制造筛选
        if (COK_switch_type.can_make_flag == 'can_make') {
            //选择了"当前可制造"筛选，需要挑出可以制作的配方，不可制作的配方不通过
            let now_quantity_num = get_now_quantity_num(COK_switch_type.COK_min);
            let can_flag = check_now_COK_formula(formula_id, now_quantity_num);

            if (!can_flag) {
                continue;
            }
        } else if (COK_switch_type.can_make_flag == 'all') {
            //没有选择"当前可制造"筛选，所有配方都通过这一条
        }

        //记录通过筛选的配方
        formula_arr.push(formula_id);
    }

    //确定排序依据的属性名：0默认、1生命、2魔力、3精力
    let sort_attr_name = '';
    if (COK_switch_type.sort_attr == 0) {
        sort_attr_name = 'default';
    } else if (COK_switch_type.sort_attr == 1) {
        sort_attr_name = 'health_point';
    } else if (COK_switch_type.sort_attr == 2) {
        sort_attr_name = 'magic_point';
    } else if (COK_switch_type.sort_attr == 3) {
        sort_attr_name = 'surface_energy_point';
    }
    //"默认"排序依据：不基于某种属性排序，保持原状或整体倒序
    if (sort_attr_name == 'default') {
        let sort_dir = COK_switch_type.sort_dir;
        if (sort_dir == 0) {
            formula_arr.reverse(); //整体倒序
        }
    } else {
        //为每个配方计算排序依据数值（取产物 use_attr 中"直接获得属性"那条的 attr_value，缺失视为0）
        let formula_sort_value = new Object(); //配方id -> 排序数值
        for (let formula_id of formula_arr) {
            let product_id = formulas[formula_id].product.id; //配方产物id
            let sort_value = 0;
            let product_item = items[product_id];
            if (!is_Empty_Object(product_item) && !is_Empty_Object(product_item.use_attr)) {
                for (let use_attr_obj of product_item.use_attr) {
                    if (use_attr_obj.attr_type != 'get_attr') {
                        //其他效果类型(get_buff/get_item/get_formula)的attr_id不是玩家属性id，
                        //也没有attr_value这个数值字段，不能拿来排序，跳过
                        continue;
                    }
                    if (use_attr_obj.attr_id == sort_attr_name) {
                        sort_value = use_attr_obj.attr_value;
                        break;
                    }
                }
            }
            formula_sort_value[formula_id] = sort_value;
        }
        //按照升序/降序排序配方id（sort_dir：0降序，1升序）
        let sort_dir = COK_switch_type.sort_dir;
        formula_arr.sort((formula_id_a, formula_id_b) => {
            let value_a = formula_sort_value[formula_id_a];
            let value_b = formula_sort_value[formula_id_b];
            if (sort_dir == 0) {
                return value_b - value_a; //降序
            } else {
                return value_a - value_b; //升序
            }
        });
    }
    return formula_arr;
}
//切换到烹饪技能的指定子功能
function change_cooking_div(COK_min) {
    let div_obj = {
        COK_CD: 'COK_CD_value_div', //
        COK_MD: 'COK_MD_value_div',
        COK_MS: 'COK_MS_value_div',
        COK_DS: 'COK_DS_value_div',
        COK_EN: 'COK_EN_value_div',
    };

    for (let key in div_obj) {
        let div = document.getElementById(div_obj[key]);
        if (COK_min == key) {
            div.style.display = '';
        } else {
            div.style.display = 'none';
        }
    }
}
//初始化烹饪技能界面的烹饪菜品的配方详情
function init_COK_formula_Details_div(COK_min) {
    //COK_DS和COK_EN不应该调用这个函数，防御判断，防止逻辑出错
    if (COK_min == 'COK_DS' || COK_min == 'COK_EN') {
        console.log('%s子功能不应该调用init_COK_formula_Details_div，异常', COK_min);
        return;
    }
    //把指定烹饪子功能的配方详情切换到有详情的状态
    let no_formula_div_id = COK_min + '_no_formula_div'; //无配方填充页
    let formula_Details_div_id = COK_min + '_formula_Details_div'; //配方详情页
    const no_formula_div = document.getElementById(no_formula_div_id);
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    no_formula_div.style.display = 'none';
    formula_Details_div.style.display = '';
    //将旧的配方详情清空
    let FD_N_value_div_id = COK_min + '_FD_N_value_div'; //配方详情页的材料需求
    let FD_E_value_div_id = COK_min + '_FD_E_value_div'; //配方详情页的工作环境
    let FD_P_value_div_id = COK_min + '_FD_P_value_div'; //配方详情页的产物
    const FD_N_value_div = document.getElementById(FD_N_value_div_id);
    const FD_E_value_div = document.getElementById(FD_E_value_div_id);
    const FD_P_value_div = document.getElementById(FD_P_value_div_id);
    FD_N_value_div.replaceChildren();
    FD_E_value_div.innerHTML = '';
    //产物div上面挂着提示窗的鼠标监听，只有连元素一起换掉才能丢弃旧监听，避免反复叠加
    FD_P_value_div.replaceWith(crtElement('div', FD_P_value_div_id, FD_P_value_div.className));

    //COK_CD子功能的配方详情界面里多了一个添加调料区FD_S，一起清空
    //COK_MD和COK_MS没有这一部分，无需处理
    if (COK_min == 'COK_CD') {
        let FD_S_value_div_id = COK_min + '_FD_S_value_div'; //配方详情页的添加调料区
        const FD_S_value_div = document.getElementById(FD_S_value_div_id);
        FD_S_value_div.replaceChildren();
    }
}
//清空烹饪技能界面的烹饪菜品的配方详情
function delete_COK_formula_Details_div(COK_min) {
    //这几个子界面没有界面，不用清空
    if (COK_min == 'COK_MD' || COK_min == 'COK_MS' || COK_min == 'COK_DS') {
        return;
    }
    if (COK_min == 'COK_EN') {
        return;
    }
    let no_formula_div_id = COK_min + '_no_formula_div';
    let formula_Details_div_id = COK_min + '_formula_Details_div';
    const no_formula_div = document.getElementById(no_formula_div_id);
    const formula_Details_div = document.getElementById(formula_Details_div_id);
    no_formula_div.style.display = '';
    formula_Details_div.style.display = 'none';
    if (COK_min == 'COK_CD') {
        //将批量选择按钮重置到1
        let quantity_button_id = COK_min + '_FD_P_quantity_button';
        const quantity_button = document.getElementById(quantity_button_id);
        set_dataset_value(quantity_button, 'quantity_num', 1);
        quantity_button.innerHTML = '批量制造选择<br>-> X' + 1;
    }
}
//判断烹饪界面当前子功能是否展示了配方详情，返回true或false
function check_show_COK_formula_Details_div() {
    let COK_min = get_COK_min_name();
    //只有COK_CD、COK_MD、COK_MS可能有配方详情，其他子功能直接返回否
    if (COK_min != 'COK_CD' && COK_min != 'COK_MD' && COK_min != 'COK_MS') {
        return false;
    }
    //目前还没开发这两个子功能
    if (COK_min == 'COK_MD' || COK_min == 'COK_MS') {
        return false;
    }
    //配方详情是否展示：详情div处于显示状态即视为已展示
    let formula_Details_div_id = COK_min + '_formula_Details_div';
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
            //物品是消耗品，产物信息还应该有：调味的额外属性 ex_data
            item_obj = get_item_obj(product_id, product_num);
            let seasoning_ex_data = get_COK_CD_seasoning_ex_data();
            if (seasoning_ex_data != null) {
                item_obj.ex_data = seasoning_ex_data;
            }
        }
        Object.assign(product_obj, item_obj);
    }
    return ret;
}
//检查输入的配方是否可以烹饪
function check_now_COK_formula(id, num) {
    let formula_id = '';
    let quantity_num = 1;
    if (is_Empty_Object(id)) {
        console.log('没有输入配方id，无法判断');
        return false;
    } else if (is_Empty_Object(formulas[id])) {
        console.log('%s不属于配方id，不应该调用当前函数', id);
        return false;
    } else if (formulas[id].skill != 'cooking') {
        console.log('%s配方不属于烹饪技能，不应该调用当前函数', id);
        return false;
    } else {
        formula_id = id;
        if (typeof num == 'number') {
            quantity_num = num;
        } else if (typeof num == 'string') {
            quantity_num = parseInt(num);
        }
    }

    let P_backpack = player.get_player_backpack(); //玩家可用物品
    let COK_min = get_COK_min_name();
    if (COK_min == 'COK_CD') {
        //菜品烹饪子功能特有，调料不足时不可烹饪
        let seasoning_arr = get_COK_CD_seasoning(); //所选调味料 [{id, num:n}]，n 为单份剂量
        for (let seasoning of seasoning_arr) {
            let id = seasoning.id;
            let n = parseInt(seasoning.num); //单份剂量
            let need_num = n * quantity_num; //整批消耗
            let BP_num = P_backpack.get_BP_Item_id_num(id); //该具体调味料的背包数量
            if (BP_num < need_num) {
                // console.log('调味料%s数量不足：需要%d个，背包有%d个', id, need_num, BP_num);
                return false;
            }
        }
    }

    //配方处于研究状态时始终视作不可制作
    let P_formulas = player.get_player_formulas_manage();
    let P_COK_formulas = P_formulas.get_player_skill_formulas('COK');
    if (!is_Empty_Object(P_COK_formulas[formula_id]) && P_COK_formulas[formula_id].status == 'study') {
        return false;
    }

    let make_flag = true;

    //当前配方的需求材料检查
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
    let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
    let COK_now_place_work_bench = cooking_manage.get_now_place_work_bench(); //烹饪自身的工作环境
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let SYN_now_place_work_bench = synthesis_manage.get_now_place_work_bench(); //合成制造的工作环境（唯一例外：木匠台）
    for (let i = 0; i < need_work_bench.length; i++) {
        let work_bench_id = need_work_bench[i].id;
        let need_level = need_work_bench[i].level;
        let now_level;
        if (enums['all_COK_work_bench'].includes(work_bench_id)) {
            //烹饪自己的某种工作环境
            now_level = COK_now_place_work_bench[work_bench_id];
        } else if (work_bench_id == 'carpentry_bench') {
            //烹饪配方的唯一例外：木匠台，需从合成制造技能获取
            now_level = SYN_now_place_work_bench[work_bench_id];
        } else {
            //出现了其他未知工作环境，视为异常
            console.log('%s配方需求的工作环境%s不属于烹饪技能，且不是唯一例外的木匠台，异常', formula_id, work_bench_id);
            return false;
        }
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
//在指定烹饪子界面添加配方
function add_COK_formula(COK_min, formula_id) {
    let player_formulas_manage = player.get_player_formulas_manage();
    let P_COK_formulas = player_formulas_manage.get_player_skill_formulas('COK'); //玩家所有配方
    let now_quantity_num = get_now_quantity_num(COK_min); //当前批量制造数（从批量按钮读取）

    let material_ch = ''; //左侧需求材料的文本
    if (P_COK_formulas[formula_id].status == 'know') {
        //添加完全学习的配方需求
        material_ch = build_formula_material_ch(formula_id, false, now_quantity_num);
    } else if (P_COK_formulas[formula_id].status == 'study') {
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
    let formula_value_div_id = COK_min + '_formula_value_div';
    let formula_value_div = document.getElementById(formula_value_div_id);
    let formula_value = addElement(formula_value_div, 'div', null, 'formula_value');
    let formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
    formula_value_l.innerHTML = material_ch;
    let formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
    formula_value_r.innerHTML = product_ch;
    //判断配方能否制作
    let make_flag = check_now_COK_formula(formula_id, now_quantity_num);
    if (P_COK_formulas[formula_id].status == 'study') {
        //研究状态的配方始终视作不可制作，显示灰色
        formula_value.style.backgroundColor = enums['show_study_color'];
    } else if (make_flag) {
        formula_value.style.backgroundColor = enums['show_can_color']; //可以制作显示绿色
    } else {
        formula_value.style.backgroundColor = enums['show_nocan_color']; //不可制作显示红色
    }
    //添加鼠标点击会显示详情的功能
    formula_value.addEventListener('click', () => {
        let live_plan_manage = global.get_live_plan_manage();
        let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
        //保存当前选定的配方
        cooking_manage.set_now_formula(formula_id);
        //更新配方详情
        cooking_manage.updata_COK_formula_Details_div();
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

//更新烹饪配方详情的材料需求部分，返回材料是否充足（true：材料足够）
function updata_COK_formula_Material_div(COK_min, formula_id) {
    let FD_N_value_div_id = COK_min + '_FD_N_value_div';
    let FD_N_value_div = document.getElementById(FD_N_value_div_id); //配方材料需求详情div
    let P_backpack = player.get_player_backpack(); //玩家可用物品
    let now_quantity_num = get_now_quantity_num(COK_min); //当前批量制造数
    //获取配方学习状态，研究状态的配方始终视作不可制作
    let P_formulas_manage = player.get_player_formulas_manage();
    let P_formulas = P_formulas_manage.get_player_skill_formulas('COK');
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
//更新烹饪配方详情的工作环境部分，返回工作环境是否达标（true：达标）
function updata_COK_formula_WorkBench_div(COK_min, formula_id, COK_place_work_bench) {
    let FD_E_value_div_id = COK_min + '_FD_E_value_div';
    let FD_E_value_div = document.getElementById(FD_E_value_div_id); //配方工作环境详情div
    let need_work_bench = formulas[formula_id].work_bench; //配方需求工作环境
    let need_WB_ch = '需求<br>';
    let now_WB_ch = '当前<br>';
    let WB_flag = true;
    //合成制造工作台（唯一例外：木匠台需要从合成制造获取），首次用到时懒获取
    for (let i = 0; i < need_work_bench.length; i++) {
        let work_bench_id = need_work_bench[i].id;
        let need_level = need_work_bench[i].level;
        let work_bench_name = texts[work_bench_id].work_bench_name;
        let now_level;
        if (enums['all_COK_work_bench'].includes(work_bench_id)) {
            //烹饪自己的某种工作环境
            now_level = COK_place_work_bench[work_bench_id];
        } else if (work_bench_id == 'carpentry_bench') {
            //烹饪配方的唯一例外：木匠台，需从合成制造技能获取
            let live_plan_manage = global.get_live_plan_manage();
            let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
            let SYN_now_place_work_bench = synthesis_manage.get_now_place_work_bench();
            now_level = SYN_now_place_work_bench[work_bench_id];
        } else {
            //出现了其他未知工作环境，视为异常，但仍渲染该条（视为0级）
            console.log('%s配方需求的工作环境%s不属于烹饪技能，且不是唯一例外的木匠台，异常', formula_id, work_bench_id);
            WB_flag = false;
        }
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
function updata_COK_formula_Product_div(COK_min, formula_id) {
    let FD_P_value_div_id = COK_min + '_FD_P_value_div';
    let FD_P_value_div = document.getElementById(FD_P_value_div_id); //配方产出
    let product_id = formulas[formula_id].product.id;
    let product_name = texts[product_id].item_name;
    let now_quantity_num = get_now_quantity_num(COK_min); //当前批量制造数
    let product_num = formulas[formula_id].product.num * parseInt(now_quantity_num);
    let product_ch = product_name + ' X' + product_num;
    FD_P_value_div.innerHTML = product_ch;
    //添加鼠标移动上去展示产物详情信息的功能
    //产物详情要跟随“当前配方/当前数量/当前所选调料”实时变化，因此传的是值提供者(函数)，由提示窗在鼠标移入时求值
    add_show_Tooltip(FD_P_value_div, 'formula_product', get_now_product_preview_obj);
}
//值提供者：在鼠标移入产物区的那一刻，按“当前选定的配方 + 当前批量数量 + 当前所选调料”实时算出产物对象
//返回 null：当前没有可预览的产物
function get_now_product_preview_obj() {
    let COK_min = get_COK_min_name();
    //从烹饪管理类中读取当前选定的配方
    let live_plan_manage = global.get_live_plan_manage();
    let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
    let formula_id = cooking_manage.get_now_formula();
    if (is_Empty_Object(formula_id)) {
        //尚未选定配方，预期内没有产物可预览，静默
        return null;
    }
    if (is_Empty_Object(formulas[formula_id])) {
        //选定的配方不在配方数据库中，属于数据缺失异常
        console.log('产物预览时，当前选定的配方%s未定义，异常', formula_id);
        return null;
    }
    let now_quantity_num = get_now_quantity_num(COK_min);
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
function updata_COK_make_button(COK_min, make_flag) {
    let FD_P_make_button_id = COK_min + '_FD_P_make_button';
    let FD_P_make_button = document.getElementById(FD_P_make_button_id);
    if (make_flag) {
        FD_P_make_button.disabled = false;
        FD_P_make_button.style.cursor = 'pointer';
    } else {
        FD_P_make_button.disabled = true;
        FD_P_make_button.style.cursor = 'not-allowed';
    }
}

export {
    get_COK_min_name,
    get_now_quantity_num,
    get_COK_formula_switch_type,
    get_formula_product,
    change_cooking_div,
    init_COK_formula_Details_div,
    delete_COK_formula_Details_div,
    check_show_COK_formula_Details_div,
    check_now_COK_formula,
    add_COK_formula,
    updata_COK_formula_Material_div,
    updata_COK_formula_WorkBench_div,
    updata_COK_formula_Product_div,
    updata_COK_make_button,
    COK_switch_type_handle,
};
