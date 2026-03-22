import { get_random, calculate_num_attr } from '../../../Function/math_func.js';
import { addElement } from '../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_id_key, get_random_text } from '../../../Function/Function.js';
import { updata_formula_UI_placeholder } from '../../../Function/Updata_func.js';
import { enemys } from '../../../Data/Enemy/Enemy.js';
import { items } from '../../../Data/Item/Item.js';
import { places } from '../../../Data/Place/Place.js';
import { texts } from '../../../Data/Text/Text.js';
import { formulas } from '../../../Data/Formula/Formula.js';
import { player } from '../../../Player/Player.js';
import { global } from '../../global_manage.js';

//合成制造技能管理类 Synthesis SYN
export class Synthesis_manage {
    constructor() {
        // this.now_time; //当前时间
        // this.round_start_time; //当前回合开始时间
        // this.now_round_time = 0; //当前回合运行了多久的时间
        this.now_place = 'village_home'; //当前地点
        this.now_formula; //当前选定的配方
        this.now_quantity_num = '1'; //当前批量制造的数量

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        // this.player_formulas; //玩家拥有的配方拷贝，方便调用
        this.SYN_place_work_bench = new Object(); //所有地点的合成制造工作环境缓存
    }
    //获取合成制造技能管理对象的存档
    save_synthesis_manage() {
        let synthesis_save = new Object();
        synthesis_save.SYN_place_work_bench = this.SYN_place_work_bench;
        return synthesis_save;
    }
    //加载合成制造技能存档
    load_synthesis_manage(synthesis_save) {
        if (is_Empty_Object(synthesis_save)) {
            return;
        }
        this.SYN_place_work_bench = synthesis_save.SYN_place_work_bench;
    }
    //更新当前地点，初始化合成制造信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        // this.now_time = global.get_game_now_time();
        //更新新低点的合成环境缓存
        if (is_Empty_Object(this.SYN_place_work_bench[now_place])) {
            this.init_SYN_place_work_bench(now_place);
        }
        //如果当前展示的技能就是合成制造，需要更新界面里的内容
        let MH_name = global.get_flag('UGS_now_MH_name');
        if (MH_name == 'synthesis') {
            let SYN_min = get_SYN_min_name();
            delete_SYN_formula_Details_div(SYN_min);
            this.updata_live_plan_div();
        }
    }
    //生活技能切换，切换到了合成制造界面，初始化合成制造界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    init_live_plan_game_div() {
        let SYN_min = get_SYN_min_name();
        //切换到合成制作子功能界面
        change_synthesis_div(SYN_min);

        if (SYN_min == 'SYN_MK') {
            //切换成未选择配方的界面
            delete_SYN_formula_Details_div(SYN_min);
            //更新当前配方内容
            this.updata_live_plan_div();
        }
    }
    //地点变化时，对合成制造界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(now_place) {
        this.now_place = now_place;
        // this.now_time = global.get_game_now_time();
        //更新新低点的合成环境缓存
        if (is_Empty_Object(this.SYN_place_work_bench[now_place])) {
            this.init_SYN_place_work_bench(now_place);
        }
        //如果当前展示的技能就是合成制造，需要更新界面里的内容
        let MH_name = global.get_flag('UGS_now_MH_name');
        if (MH_name == 'synthesis') {
            let SYN_min_name = get_SYN_min_name();
            this.updata_live_plan_div();
            delete_SYN_formula_Details_div(SYN_min_name);
        }
    }
    //开始合成制造，更新合成制造技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        // this.now_time = global.get_game_now_time();
        //验证当前配方是否可以制作
        let make_flag = this.check_now_formula();
        if (!make_flag) {
            console.log('运行到制作配方，配方却不满足制作条件，异常情况');
            return;
        }

        //从玩家背包物品中扣除配方需求
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        for (let formula_material of formulas[this.now_formula].material) {
            let item_id = formula_material.id; //需求材料id
            let need_item_num = formula_material.num * parseInt(this.now_quantity_num); //需要的数量

            let ret = P_backpack.Player_lose_item_data(item_id, need_item_num);
            if (ret != need_item_num) {
                console.log('制作配方去掉指定物品时失败，配方制作失败');
                return;
            }
        }

        //给予玩家配方对应物品
        let product_id = formulas[this.now_formula].product.id;
        let product_num = formulas[this.now_formula].product.num * parseInt(this.now_quantity_num);
        if (items[product_id].main_type.includes('equipment')) {
            //物品是装备，产物信息还应该有：稀有度
            let product_equip_rarity = formulas[this.now_formula].product.equip_rarity;
            player.Player_get_item(product_id, product_num, product_equip_rarity);
        } else if (items[product_id].main_type.includes('material')) {
            //物品是材料，没有独特属性
            player.Player_get_item(product_id, product_num);
        } else if (items[product_id].main_type.includes('consumable')) {
            //物品是消耗品，产物信息还应该有：暂无
            player.Player_get_item(product_id, product_num);
        }

        //获取经验
    }
    //开始合成制造，更新合成制造技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div() {
        let SYN_min = get_SYN_min_name();
        if (SYN_min == 'SYN_MK') {
            this.updata_SYN_MK_value();
        } else if (SYN_min == 'SYN_FL') {
            // this.updata_SYN_FL_value();
        } else if (SYN_min == 'SYN_RS') {
            // this.updata_SYN_RS_value();
        } else if (SYN_min == 'SYN_EN') {
            // this.updata_SYN_EN_value();
        }

        //更新配方列表头右侧的占位符
        let scroll_box = SYN_min + '_formula_scroll_box';
        let value_div = SYN_min + '_formula_value_div';
        let rt3 = SYN_min + '_rt3';
        updata_formula_UI_placeholder(scroll_box, value_div, rt3);

        //更新配方详情
        let no_formula_div_id = SYN_min + '_no_formula_div';
        const no_formula_div = document.getElementById(no_formula_div_id);
        if (no_formula_div.style.display == 'none') {
            this.updata_SYN_formula_Details_div();
        }
    }
    //重置一轮合成制造的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {
        // this.round_start_time = this.now_time;
        // this.now_round_time = 0;
    }
    // 停止合成制造状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是合成制造，不处理
        if (now_GS != 'synthesis') {
            return;
        }
    }
    // 更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
    }
    //判断当前是否处于合成制造的休息状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {}

    //更新上中的生活技能界面中的合成制造技能界面的制造界面的内容
    updata_SYN_MK_value() {
        //清空这个界面里的配方
        let SYN_MK_formula_value_div = document.getElementById('SYN_MK_formula_value_div');
        SYN_MK_formula_value_div.replaceChildren();
        //获取应该展示的配方过滤条件
        let SYN_MK_type = get_SYN_MK_switch_type();
        //获取在这个过滤条件下应该展示的配方id
        let formula_arr = SYN_MK_type_handle(SYN_MK_type, this.SYN_place_work_bench[this.now_place]);
        //展示这些配方
        for (let formula_id of formula_arr) {
            add_formula('SYN_MK', formula_id);
        }
    }
    //初始化指定地点的合成制造工作环境情况
    init_SYN_place_work_bench(place_id) {
        this.SYN_place_work_bench[place_id] = new Object();
        this.SYN_place_work_bench[place_id].carpentry_bench = 1;
    }
    //获取当前地点的工作环境
    get_now_place_work_bench() {
        return this.SYN_place_work_bench[this.now_place];
    }
    //保存要做的配方
    set_now_formula(formula_id) {
        this.now_formula = formula_id;
    }
    //保存当前批量制造的数量
    set_now_quantity_num(quantity_num) {
        this.now_quantity_num = quantity_num;
    }
    //获取当前配方可制作的最大数量
    get_SYN_now_formula_max_num() {}
    //更新合成制造技能的指定子功能中的配方详情
    updata_SYN_formula_Details_div() {
        let SYN_min = get_SYN_min_name();
        let make_flag = true;

        //清空当前配方详情
        init_SYN_formula_Details_div(SYN_min);

        //展示点击配方的材料需求详情
        let FD_N_value_div_id = SYN_min + '_FD_N_value_div';
        let FD_N_value_div = document.getElementById(FD_N_value_div_id); //配方材料需求详情div
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        for (let formula_material of formulas[this.now_formula].material) {
            let item_id = formula_material.id; //需求材料id
            let item_name = texts[item_id].item_name; //需求材料名
            let need_item_num = formula_material.num * parseInt(this.now_quantity_num); //需要的数量
            let play_item_num = P_backpack.backpack_items_data[item_id].all_num; //玩家拥有的数量
            let FD_N_ch = item_name + '( ' + play_item_num + ' / ' + need_item_num + ' )';
            let Details_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
            Details_div.innerHTML = FD_N_ch;
            if (need_item_num > play_item_num) {
                Details_div.style.backgroundColor = '#ff000033'; //材料不足显示红色
                make_flag = false;
            } else {
                Details_div.style.backgroundColor = '#00ff0033'; //材料足够显示绿色
            }
        }

        //展示点击配方的工作环境详情
        let FD_E_value_div_id = SYN_min + '_FD_E_value_div';
        let FD_E_value_div = document.getElementById(FD_E_value_div_id); //配方工作环境详情div
        let need_work_bench = formulas[this.now_formula].work_bench; //配方需求工作环境
        let now_work_bench = this.SYN_place_work_bench[this.now_place]; //当前地点的工作环境
        let need_WB_ch = '需求<br>';
        let now_WB_ch = '当前<br>';
        let WB_flag = true;
        for (let i = 0; i < need_work_bench.length; i++) {
            let work_bench_id = need_work_bench[i].id;
            let need_level = need_work_bench[i].level;
            let work_bench_name = texts[work_bench_id].work_bench_name;
            let now_level = now_work_bench[work_bench_id];
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
                make_flag = false;
            }
        }
        FD_E_value_div.innerHTML = need_WB_ch + now_WB_ch;
        if (WB_flag) {
            FD_E_value_div.style.backgroundColor = '#00ff0033'; //工作环境达标显示绿色
        } else {
            FD_E_value_div.style.backgroundColor = '#ff000033'; //工作环境不足显示红色
        }

        //展示点击配方的产出
        let FD_P_value_div_id = SYN_min + '_FD_P_value_div';
        let FD_P_value_div = document.getElementById(FD_P_value_div_id); //配方产出
        let product_id = formulas[this.now_formula].product.id;
        let product_name = texts[product_id].item_name;
        let product_num = formulas[this.now_formula].product.num * parseInt(this.now_quantity_num);
        let product_ch = product_name + ' X' + product_num;
        FD_P_value_div.innerHTML = product_ch;

        //根据当前情况调整“制造”按钮上的遮罩
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
    //检查当前配方是否可以制造
    check_now_formula() {
        let make_flag = true;

        //当前配方的需求材料检查
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        for (let formula_material of formulas[this.now_formula].material) {
            let item_id = formula_material.id; //需求材料id
            let need_item_num = formula_material.num * parseInt(this.now_quantity_num); //需要的数量
            let play_item_num = P_backpack.backpack_items_data[item_id].all_num; //玩家拥有的数量
            if (need_item_num > play_item_num) {
                make_flag = false;
                break;
            }
        }

        //当前配方的工作环境检查
        let need_work_bench = formulas[this.now_formula].work_bench; //配方需求工作环境
        let now_work_bench = this.SYN_place_work_bench[this.now_place]; //当前地点的工作环境
        for (let i = 0; i < need_work_bench.length; i++) {
            let work_bench_id = need_work_bench[i].id;
            let need_level = need_work_bench[i].level;
            let now_level = now_work_bench[work_bench_id];
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
}

//获取当前正在使用合成制造的哪个子功能
function get_SYN_min_name() {
    let MH_min_name = null;
    let radios = document.querySelectorAll('input[name="SYN_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            MH_min_name = radio.value.slice(0, 6);
            break;
        }
    }
    return MH_min_name;
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
//清空合成制造技能界面的制造界面的配方详情
function delete_SYN_formula_Details_div(SYN_min) {
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
//获取当前合成制造技能界面的制造界面的配方筛选条件
function get_SYN_MK_switch_type() {
    let SYN_MK_switch_type = new Object();
    //是否选择了“当前可制造”筛选按钮
    const SYN_MK_filter_no_make = document.getElementById('SYN_MK_filter_no_make');
    const SYN_MK_filter_can_make = document.getElementById('SYN_MK_filter_can_make');
    if (SYN_MK_filter_no_make.style.display == '') {
        SYN_MK_switch_type.can_make_flag = 'all';
    } else if (SYN_MK_filter_can_make.style.display == '') {
        SYN_MK_switch_type.can_make_flag = 'can_make';
    }
    //选择了产出哪种物品的配方
    const radios = document.querySelectorAll('input[name="SYN_MK_type_switch"]');
    for (const radio of radios) {
        if (radio.checked) {
            // 找到一个选中的按钮后可以结束循环
            SYN_MK_switch_type.product_type = radio.value;
        }
    }
    return SYN_MK_switch_type;
}
//获取指定筛选条件下应该显示的合成制造技能制造子功能配方
function SYN_MK_type_handle(SYN_MK_type, SYN_work_bench) {
    let formula_arr = new Array(); //应该展示的配方

    let P_SYN_formulas = player.get_player_formulas('SYN'); //玩家的合成制造配方
    let P_backpack = player.get_player_backpack(); //玩家可用物品

    for (let formula_id in P_SYN_formulas) {
        //配方是否属于合成制造
        if (formulas[formula_id].skill != 'synthesis') {
            console.log('玩家身上的%s配方不属于合成制造技能', formula_id);
            continue;
        }
        //当前是否可制造筛选
        if (SYN_MK_type.can_make_flag == 'can_make') {
            //选择了“当前可制造”筛选，需要挑出可以制作的配方
            let can_flag = true;
            //是否拥有每种材料
            for (let formula_material of formulas[formula_id].material) {
                let item_id = formula_material.id;
                let item_num = formula_material.num;
                if (P_backpack.backpack_items_data[item_id].all_num < item_num) {
                    can_flag = false;
                    break;
                }
            }
            //每种工作环境是否达标
            for (let formula_Work_bench of formulas[formula_id].work_bench) {
                let Work_bench_id = formula_Work_bench.id;
                let Work_bench_level = formula_Work_bench.level;
                if (SYN_work_bench[Work_bench_id] < Work_bench_level) {
                    can_flag = false;
                    break;
                }
            }
            if (!can_flag) {
                continue;
            }
        } else if (SYN_MK_type.can_make_flag == 'all') {
            //没有选择“当前可制造”筛选，所有配方都通过这一条
        }
        //产物类型筛选
        if (SYN_MK_type.product_type == 'SYN_MK_T_A') {
            //当前选择的产物筛选是“全部”，所有配方都通过这一条
        } else {
            let product_id = formulas[formula_id].product.id;
            if (SYN_MK_type.product_type == 'SYN_MK_T_E') {
                if (items[product_id].main_type != 'equipment') {
                    continue;
                }
            } else if (SYN_MK_type.product_type == 'SYN_MK_T_C') {
                if (items[product_id].main_type != 'consumable') {
                    continue;
                }
            } else if (SYN_MK_type.product_type == 'SYN_MK_T_M') {
                if (items[product_id].main_type != 'material') {
                    continue;
                }
            }
        }
        //记录通过筛选的配方
        formula_arr.push(formula_id);
    }
    return formula_arr;
}
//在指定配方界面添加配方
function add_formula(SYN_min, formula_id) {
    let player_formulas_manage = player.get_player_formulas_manage();
    let P_SYN_formulas = player_formulas_manage.get_player_formulas('SYN'); //玩家所有配方

    let material_ch = ''; //左侧需求材料的文本
    if (P_SYN_formulas[formula_id].status == 'know') {
        //添加完全学习的配方需求
        for (let i = 0; i < formulas[formula_id].material.length; i++) {
            let material_obj = formulas[formula_id].material[i];
            let item_name = texts[material_obj.id].item_name;
            if (material_obj.num == 1) {
                material_ch = material_ch + item_name;
            } else {
                material_ch = material_ch + item_name + ' X' + material_obj.num;
            }
            if (i != formulas[formula_id].material.length - 1) {
                material_ch = material_ch + ' + ';
            }
            // 材料A X1 + 材料2 + 材料3
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
//切换到合成制造技能的指定子功能
function change_synthesis_div(SYN_min) {
    let div_obj = {
        SYN_MK: 'SYN_make_div', //
        SYN_FL: 'SYN_filter_div',
        SYN_FM: 'SYN_filter_make_div', //实际上不会有这个情况，只是为了禁用这个界面
        SYN_RS: 'SYN_research_div',
        SYN_EN: 'SYN_environment_div',
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

export {};
