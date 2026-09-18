import { get_random, calculate_num_attr } from '../../../../Function/math_func.js';
import { addElement } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_id_key, get_random_text } from '../../../../Function/Function.js';
import { updata_formula_UI_placeholder } from '../../../../Function/Updata_func.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { places } from '../../../../Data/Place/Place.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

import {
    get_COK_min_name,
    get_formula_product,
    change_cooking_div,
    init_COK_formula_Details_div,
    delete_COK_formula_Details_div,
    check_now_COK_formula,
    check_show_COK_formula_Details_div,
    add_COK_formula,
    get_now_quantity_num,
    updata_COK_formula_Material_div,
    updata_COK_formula_WorkBench_div,
    updata_COK_formula_Product_div,
    updata_COK_make_button,
} from './COK_function.js';
import { updata_COK_CD_div, updata_COK_formula_Seasoning_div, get_COK_CD_seasoning } from './COK_cooking_dishes.js';
import { updata_COK_MD_div } from './COK_make_dry_product.js';
import { updata_COK_MS_div } from './COK_make_seasonings.js';
import { updata_COK_DS_div } from './COK_dishes_seasoning.js';
import { updata_COK_EN_div } from './COK_environment.js';

//烹饪技能管理类
export class Cooking_manage {
    constructor() {
        this.now_place = 'village_home'; //当前地点
        this.COK_all_place_work_bench = new Object(); //所有地点的烹饪工作环境缓存

        this.player_end_attr; //玩家最终属性拷贝，方便调用
    }
    //获取烹饪技能管理对象的存档
    save_cooking_manage() {
        let cooking_save = new Object();
        return cooking_save;
    }
    //加载烹饪技能存档
    load_cooking_manage(cooking_save) {
        if (is_Empty_Object(cooking_save)) {
            return;
        }
    }
    //更新当前地点，初始化烹饪信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        //更新新地点的工作环境缓存
        if (is_Empty_Object(this.COK_all_place_work_bench[now_place])) {
            this.init_COK_place_work_bench(now_place);
        }
        //如果当前展示的技能就是烹饪，需要更新界面里的内容
        let MH_name = global.get_flag('UGS_now_MH_name');
        if (MH_name == 'cooking') {
            let COK_min = get_COK_min_name();
            delete_COK_formula_Details_div(COK_min);
            this.updata_live_plan_div();
        }
    }
    //生活技能切换，切换到了烹饪界面，初始化烹饪界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    init_live_plan_game_div(COK_min) {
        //如果没有指定需要更新哪个子界面，则更新当前展示的
        if (COK_min == undefined) {
            COK_min = get_COK_min_name();
        }
        //切换到烹饪子功能界面
        change_cooking_div(COK_min);

        //切换成未选择配方的界面
        delete_COK_formula_Details_div(COK_min);
        //更新当前烹饪子功能界面
        this.updata_live_plan_div(COK_min);
    }
    //地点变化时，对烹饪界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(next_place) {}
    //开始烹饪，更新烹饪技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        let COK_min = get_COK_min_name();
        if (COK_min == 'COK_RS') {
            //如果当前展示的烹饪子功能是配方研究，走研究逻辑
            updata_live_plan_research();
            return;
        }

        let quantity_num = get_now_quantity_num(COK_min);
        //验证当前配方是否可以制作
        let make_flag = this.check_now_COK_formula(this.now_formula, quantity_num);
        if (!make_flag) {
            console.log('运行到制作配方，配方却不满足制作条件，异常情况');
            return;
        }

        let P_backpack = player.get_player_backpack(); //玩家可用物品

        //从玩家背包物品中扣除配方需求
        for (let formula_material of formulas[this.now_formula].material) {
            let m_id = formula_material.id; //需求材料id
            let need_item_num = formula_material.num * parseInt(quantity_num); //需要的数量
            let ret = P_backpack.Player_lose_formula_item(m_id, need_item_num);
            if (ret != need_item_num) {
                console.log('制作配方去掉指定物品时失败，配方制作失败');
                return;
            }
        }

        //扣除所选调料
        let all_seasoning = new Array();
        if (COK_min == 'COK_CD') {
            let seasoning_arr = get_COK_CD_seasoning(); //所选调味料 [{id, num:n}]，n 为单份剂量
            for (let seasoning of seasoning_arr) {
                let id = seasoning.id;
                let n = parseInt(seasoning.num); //单份剂量
                let need_num = n * quantity_num; //整批消耗
                all_seasoning.push({ id: id, num: need_num });
            }
            //扣除所选调味料(整批：单份剂量n × 批量份数m)
            for (let need of all_seasoning) {
                let lose_ret = P_backpack.Player_lose_item_by_id(need.id, need.num);
                if (lose_ret != need.num) {
                    console.log('扣除调味料%s时失败，配方制作失败', need.id);
                    return;
                }
            }
        }

        //获得配方的产物
        let product_obj = new Object();
        let type = get_formula_product(this.now_formula, quantity_num, product_obj);
        if (type == 'item') {
            player.Player_get_item(product_obj);
        } else if (type == 'work_bench') {
            this.set_place_work_bench(this.now_place, product_obj.id, product_obj.next_level);
            this.updata_live_plan_div('COK_EN');
        }
        //结算烹饪的属性

        //记录烹饪行为，用于结算技能经验
        let global_flag_manage = global.get_global_flag_manage();
        let COK_behavior = new Object();
        COK_behavior.COK_formula_id = this.now_formula;
        global_flag_manage.record_live_plan_skill_leveling_behavior('cooking', COK_behavior);
    }
    //开始烹饪，更新烹饪技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div(COK_min) {
        //如果没有指定需要更新哪个子界面，则更新当前展示的
        if (COK_min == undefined) {
            COK_min = get_COK_min_name();
        }
        if (COK_min == 'COK_CD') {
            updata_COK_CD_div();
            updata_formula_UI_placeholder(COK_min); //更新配方列表头右侧的占位符
        }
        // } else if (COK_min == 'COK_MD') {
        //     updata_COK_MD_div();
        //     updata_formula_UI_placeholder(COK_min); //更新配方列表头右侧的占位符
        // } else if (COK_min == 'COK_MS') {
        //     updata_COK_MS_div(this.now_filter_type, this.now_filter_value);
        //     updata_formula_UI_placeholder(COK_min); //更新配方列表头右侧的占位符
        // } else if (COK_min == 'COK_DS') {
        //     updata_COK_DS_div();
        // } else if (COK_min == 'COK_EN') {
        //     let COK_place_work_bench = this.COK_all_place_work_bench[this.now_place]; //一个具体地点的所有烹饪环境
        //     updata_COK_EN_div(COK_place_work_bench);
        // }
        //如果当前打开了配方详情，则需要一起更新
        if (check_show_COK_formula_Details_div()) {
            //详情刷新会先清空调料区，所以先在这里捕获当前已选的调料，交给详情刷新尽量还原
            let previous_selection = get_COK_CD_seasoning();
            this.updata_COK_formula_Details_div(previous_selection);
        }
    }
    //重置一轮烹饪的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {}
    // 停止烹饪状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    stop_game_statu() {
        let now_GS = global.get_flag('GS_game_statu');
        //当前状态不是烹饪，不处理
        if (now_GS != 'cooking') {
            return;
        }
    }
    // 更新角色属性
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_player_data(player_end_attr) {
        if (player_end_attr) this.player_end_attr = player_end_attr;
    }
    //判断当前是否处于烹饪的休息状态
    // 上层管理类会调用，必须定义，必须使用这个名称
    is_rest_status() {}
    //设置指定地点的工作环境
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_place_work_bench(place_id, work_bench_id, level) {
        //新地点初始化
        let COK_place_work_bench = this.COK_all_place_work_bench[place_id]; //当前地点的所有烹饪环境
        if (is_Empty_Object(COK_place_work_bench)) {
            this.init_COK_place_work_bench(place_id);
        }

        if (!enums['all_COK_work_bench'].includes(work_bench_id)) {
            console.log('%s工作台不属于烹饪技能', work_bench_id);
            return;
        }

        COK_place_work_bench[work_bench_id] = level;
    }

    //初始化指定地点的烹饪工作环境情况
    init_COK_place_work_bench(place_id) {
        this.COK_all_place_work_bench[place_id] = new Object();
        for (let work_bench_id of enums['all_COK_work_bench']) {
            this.COK_all_place_work_bench[place_id][work_bench_id] = 0;
        }
    }
    //获取当前地点的烹饪工作环境
    get_now_place_work_bench() {
        return this.COK_all_place_work_bench[this.now_place];
    }
    //保存要做的配方
    set_now_formula(formula_id) {
        this.now_formula = formula_id;
    }
    //获取当前选定的配方
    get_now_formula() {
        return this.now_formula;
    }
    //只刷新当前配方的“制造”按钮遮罩，不重渲染配方详情(避免清空已选调料)
    //用于改动调料所选数量之后，让“能否制造”的显示跟上
    updata_now_make_button() {
        let COK_min = get_COK_min_name();
        let formula_id = this.now_formula;
        if (is_Empty_Object(formula_id)) {
            //尚未选定配方，没有按钮遮罩需要刷新
            return;
        }
        let quantity_num = get_now_quantity_num(COK_min);
        let make_flag = check_now_COK_formula(formula_id, quantity_num);
        updata_COK_make_button(COK_min, make_flag);
    }
    //更新烹饪技能的指定子功能中的配方详情
    //previous_selection：上一次的调料选择(仅刷新链传入)，用于刷新后尽量还原；不传表示重新选择
    updata_COK_formula_Details_div(previous_selection) {
        //确认当前界面，推断需要更新的子功能
        let COK_min = get_COK_min_name();
        //配方研究界面没有数量选择和产物值div，不应走到这里，保险判断
        if (COK_min == 'COK_RS') {
            return;
        }
        //展示配方详情的前提是已经选定了配方
        if (is_Empty_Object(this.now_formula)) {
            //没有选定配方却走到这里属于异常：打印异常信息，并切回“未选择配方”的界面
            console.log('展示%s的配方详情时，当前没有选定的配方，异常，切回未选择配方的界面', COK_min);
            delete_COK_formula_Details_div(COK_min);
            return;
        }

        //清空当前配方详情
        init_COK_formula_Details_div(COK_min);

        //展示点击配方的材料需求详情
        let make_flag = updata_COK_formula_Material_div(COK_min, this.now_formula);
        //展示点击配方的工作环境详情
        let WB_flag = updata_COK_formula_WorkBench_div(COK_min, this.now_formula, this.COK_all_place_work_bench[this.now_place]);
        if (COK_min == 'COK_CD') {
            //展示玩家背包里的可用调味料详情，并把上一次的选择传进去尽量还原
            updata_COK_formula_Seasoning_div(previous_selection);
        }
        //材料与工作环境任一不满足，则整体不可制造
        make_flag = make_flag && WB_flag;
        //展示点击配方的产出
        updata_COK_formula_Product_div(COK_min, this.now_formula);
        //根据当前情况调整“制造”按钮上的遮罩
        updata_COK_make_button(COK_min, make_flag);
    }
    //检查输入的配方是否可以制造
    check_now_COK_formula(id, num) {
        return check_now_COK_formula(id, num);
    }
}

export {};
