import { get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object } from '../../../../Function/Function.js';
import { updata_formula_UI_placeholder } from '../../../../Function/Updata_func.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

import {
    get_SYN_min_name,
    change_synthesis_div,
    init_SYN_formula_Details_div,
    delete_SYN_formula_Details_div,
    check_show_SYN_formula_Details_div,
    get_formula_product,
    get_now_quantity_num,
    check_now_SYN_formula,
    updata_SYN_formula_Material_div,
    updata_SYN_formula_WorkBench_div,
    updata_SYN_formula_Product_div,
    updata_SYN_make_button,
} from './SYN_function.js';
import { updata_SYN_FL_div } from './SYN_filter.js';
import { updata_SYN_FM_div } from './SYN_filter_make.js';
import { updata_SYN_MK_div } from './SYN_make.js';
import { updata_SYN_EN_div } from './SYN_environment.js';
import { updata_SYN_RS_div, updata_live_plan_research } from './SYN_research.js';

//合成制造技能管理类 Synthesis SYN
export class Synthesis_manage {
    constructor() {
        this.now_place = 'village_home'; //当前地点
        this.now_formula; //当前选定的配方
        this.now_research_formula; //当前选定的研究配方
        this.now_filter_type; //当前在配方筛选界面选定的类型
        this.now_filter_value; //当前在配方筛选界面选定的内容

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.SYN_all_place_work_bench = new Object(); //所有地点的合成制造工作环境缓存
    }
    //获取合成制造技能管理对象的存档
    save_synthesis_manage() {
        let synthesis_save = new Object();
        synthesis_save.SYN_all_place_work_bench = this.SYN_all_place_work_bench;
        return synthesis_save;
    }
    //加载合成制造技能存档
    load_synthesis_manage(synthesis_save) {
        if (is_Empty_Object(synthesis_save)) {
            return;
        }
        this.SYN_all_place_work_bench = synthesis_save.SYN_all_place_work_bench || new Object();
    }
    //更新当前地点，初始化合成制造信息
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_new_place(now_place) {
        this.now_place = now_place;
        //更新新地点的工作环境缓存
        if (is_Empty_Object(this.SYN_all_place_work_bench[now_place])) {
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
    init_live_plan_game_div(SYN_min) {
        //如果没有指定需要更新哪个子界面，则更新当前展示的
        if (SYN_min == undefined) {
            SYN_min = get_SYN_min_name();
        }
        //切换到合成制作子功能界面
        change_synthesis_div(SYN_min);

        //切换成未选择配方的界面
        delete_SYN_formula_Details_div(SYN_min);
        //更新当前合成制造子功能界面
        this.updata_live_plan_div(SYN_min);
    }
    //地点变化时，对合成制造界面特殊更新
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_super_game_div(now_place) {
        this.now_place = now_place;
        // this.now_time = global.get_game_now_time();
        //更新新地点的合成环境缓存
        if (is_Empty_Object(this.SYN_all_place_work_bench[now_place])) {
            this.init_SYN_place_work_bench(now_place);
        }
        //如果当前展示的技能就是合成制造，需要更新界面里的内容
        let MH_name = global.get_flag('UGS_now_MH_name');
        if (MH_name == 'synthesis') {
            let SYN_min = get_SYN_min_name();
            this.updata_live_plan_div();
            delete_SYN_formula_Details_div(SYN_min);
        }
    }
    //开始合成制造，更新合成制造技能的数值
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_data() {
        let SYN_min = get_SYN_min_name();
        if (SYN_min == 'SYN_RS') {
            //当前展示的合成制造子功能是配方研究，走研究逻辑
            updata_live_plan_research();
            return;
        }
        let quantity_num = get_now_quantity_num(SYN_min);

        //验证当前配方是否可以制作
        let make_flag = this.check_now_SYN_formula(this.now_formula, quantity_num);
        if (!make_flag) {
            console.log('运行到制作配方，配方却不满足制作条件，异常情况');
            return;
        }

        //从玩家背包物品中扣除配方需求
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        for (let formula_material of formulas[this.now_formula].material) {
            let m_id = formula_material.id; //需求材料id
            let need_item_num = formula_material.num * parseInt(quantity_num); //需要的数量

            let ret = P_backpack.Player_lose_formula_item(m_id, need_item_num);
            if (ret != need_item_num) {
                console.log('制作配方去掉指定物品时失败，配方制作失败');
                return;
            }
        }

        //获得配方的产物
        let product_obj = new Object();
        let type = get_formula_product(this.now_formula, quantity_num, product_obj);
        if (type == 'item') {
            player.Player_get_item(product_obj);
        } else if (type == 'work_bench') {
            this.set_place_work_bench(this.now_place, product_obj.id, product_obj.next_level);
            this.updata_live_plan_div('SYN_EN');
        }
        //结算合成制造的属性

        //记录合成制造行为，用于结算技能经验
        let global_flag_manage = global.get_global_flag_manage();
        let SYN_behavior = new Object();
        SYN_behavior.SYN_formula_id = this.now_formula;
        global_flag_manage.record_live_plan_skill_leveling_behavior('synthesis', SYN_behavior);
    }
    //开始合成制造，更新合成制造技能的界面
    // 上层管理类会调用，必须定义，必须使用这个名称
    updata_live_plan_div(SYN_min) {
        //如果没有指定需要更新哪个子界面，则更新当前展示的
        if (SYN_min == undefined) {
            SYN_min = get_SYN_min_name();
        }
        if (SYN_min == 'SYN_MK') {
            updata_SYN_MK_div();
            //更新配方列表头右侧的占位符
            updata_formula_UI_placeholder(SYN_min);
            //更新配方详情，如果点击过某个配方，制造界面会始终显示配方详情，并跟随this.now_formula变化
            //制造界面一直展示配方详情好像不太好，于是禁用
            // if (this.now_formula === undefined) {
            //     let no_formula_div_id = SYN_min + '_no_formula_div';
            //     const no_formula_div = document.getElementById(no_formula_div_id);
            //     no_formula_div.style.display = '';
            // }
            // // if (no_formula_div.style.display == 'none')
            // else {
            //     this.updata_SYN_formula_Details_div();
            // }
        } else if (SYN_min == 'SYN_FL') {
            this.updata_SYN_FL_div('delete');
        } else if (SYN_min == 'SYN_FM') {
            updata_SYN_FM_div(this.now_filter_type, this.now_filter_value);
            //更新配方列表头右侧的占位符（与 SYN_MK 同理，使用 getRectEvenHidden 兼容隐藏状态）
            updata_formula_UI_placeholder(SYN_min);
        } else if (SYN_min == 'SYN_RS') {
            updata_SYN_RS_div();
        } else if (SYN_min == 'SYN_EN') {
            let SYN_place_work_bench = this.SYN_all_place_work_bench[this.now_place]; //一个具体地点的所有合成制造环境
            updata_SYN_EN_div(SYN_place_work_bench);
        }
        //如果当前打开了配方详情，则需要一起更新
        if (check_show_SYN_formula_Details_div()) {
            this.updata_SYN_formula_Details_div();
        }
    }
    //重置一轮合成制造的参数
    // 上层管理类会调用，必须定义，必须使用这个名称
    reset_round() {}
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
    //设置指定地点的工作环境
    // 上层管理类会调用，必须定义，必须使用这个名称
    set_place_work_bench(place_id, work_bench_id, level) {
        //新地点初始化
        let SYN_place_work_bench = this.SYN_all_place_work_bench[place_id]; //当前地点的所有合成制造环境
        if (is_Empty_Object(SYN_place_work_bench)) {
            this.init_SYN_place_work_bench(place_id);
        }

        if (!enums['all_SYN_work_bench'].includes(work_bench_id)) {
            console.log('%s工作台不属于合成制造技能', work_bench_id);
            return;
        }

        SYN_place_work_bench[work_bench_id] = level;
    }

    //更新上中的生活技能界面中的合成制造技能界面的配方筛选的筛选界面的内容
    updata_SYN_FL_div(updata_type, click_type, click_value) {
        updata_SYN_FL_div(updata_type, click_type, click_value);
    }
    //初始化指定地点的合成制造工作环境情况
    init_SYN_place_work_bench(place_id) {
        this.SYN_all_place_work_bench[place_id] = new Object();
        for (let work_bench_id of enums['all_SYN_work_bench']) {
            if (work_bench_id == 'carpentry_bench') {
                this.SYN_all_place_work_bench[place_id][work_bench_id] = 1;
            } else {
                this.SYN_all_place_work_bench[place_id][work_bench_id] = 0;
            }
        }
    }
    //获取当前地点的工作环境
    get_now_place_work_bench() {
        return this.SYN_all_place_work_bench[this.now_place];
    }
    //保存要做的配方
    set_now_formula(formula_id) {
        this.now_formula = formula_id;
    }
    //获取当前选定的配方
    get_now_formula() {
        return this.now_formula;
    }
    //保存要研究的配方
    set_now_research_formula(formula_id) {
        this.now_research_formula = formula_id;
    }
    //保存配方筛选界面选择的筛选内容
    set_SYN_filter(click_type) {
        this.now_filter_type = click_type;
        let switch_name = {
            SYN_FL_N_main_type_set_button: 'SYN_FL_N_M_switch',
            SYN_FL_N_secon_type_set_button: 'SYN_FL_N_S_switch',
            SYN_FL_N_item_set_button: 'SYN_FL_N_I_switch',
            SYN_FL_P_main_type_set_button: 'SYN_FL_P_M_switch',
            SYN_FL_P_secon_type_set_button: 'SYN_FL_P_S_switch',
            SYN_FL_P_item_set_button: 'SYN_FL_P_I_switch',
        };
        this.now_filter_value = get_radio_switch_click_value(switch_name[click_type]);
    }
    //更新合成制造技能的指定子功能中的配方详情
    updata_SYN_formula_Details_div() {
        //确认当前界面，推断需要更新的子功能
        let SYN_min = get_SYN_min_name();
        if (SYN_min == 'SYN_FL') {
            SYN_min = 'SYN_FM';
        }
        //配方研究界面没有数量选择和产物值div，不应走到这里，保险判断
        if (SYN_min == 'SYN_RS') {
            return;
        }
        //展示配方详情的前提是已经选定了配方
        //没有选定配方却走到这里属于异常：打印异常信息，并切回“未选择配方”的界面
        if (is_Empty_Object(this.now_formula)) {
            console.log('展示%s的配方详情时，当前没有选定的配方，异常，切回未选择配方的界面', SYN_min);
            delete_SYN_formula_Details_div(SYN_min);
            return;
        }
        //清空当前配方详情
        init_SYN_formula_Details_div(SYN_min);

        //展示点击配方的材料需求详情
        let make_flag = updata_SYN_formula_Material_div(SYN_min, this.now_formula);
        //展示点击配方的工作环境详情
        let WB_flag = updata_SYN_formula_WorkBench_div(SYN_min, this.now_formula, this.SYN_all_place_work_bench[this.now_place]);
        //材料与工作环境任一不满足，则整体不可制造
        make_flag = make_flag && WB_flag;
        //展示点击配方的产出
        updata_SYN_formula_Product_div(SYN_min, this.now_formula);
        //根据当前情况调整“制造”按钮上的遮罩
        updata_SYN_make_button(SYN_min, make_flag);
    }
    //检查输入的配方是否可以制造
    check_now_SYN_formula(id, num) {
        //调用SYN_function.js的通用函数
        return check_now_SYN_formula(id, num);
    }
}

export {};
