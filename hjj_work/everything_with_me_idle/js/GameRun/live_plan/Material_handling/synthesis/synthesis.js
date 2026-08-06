import { addElement, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object } from '../../../../Function/Function.js';
import { updata_formula_UI_placeholder } from '../../../../Function/Updata_func.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

import { get_SYN_min_name, change_synthesis_div, init_SYN_formula_Details_div, delete_SYN_formula_Details_div, get_formula_product, check_now_formula } from './SYN_function.js';
import { get_SYN_FL_click_type, delete_SYN_FL_value, get_SYN_FL_show_value, set_a_SYN_FL_show_value } from './SYN_filter.js';
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
        this.now_quantity_num = '1'; //当前批量制造的数量
        this.now_filter_type; //当前在配方筛选界面选定的类型
        this.now_filter_value; //当前在配方筛选界面选定的内容

        this.player_end_attr; //玩家最终属性拷贝，方便调用
        this.SYN_all_place_work_bench = new Object(); //所有地点的合成制造工作环境缓存
        this.SYN_work_bench_unlock = new Object(); //合成制造技能的工作环境解锁情况

        for (let work_bench of enums['all_SYN_work_bench']) {
            this.SYN_work_bench_unlock[work_bench] = 0;
        }
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
        //更新新低点的合成环境缓存
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
        //当前展示的合成制造子功能是配方研究，走研究逻辑
        let SYN_min = get_SYN_min_name();
        if (SYN_min == 'SYN_RS') {
            updata_live_plan_research();
            return;
        }

        //验证当前配方是否可以制作
        let make_flag = this.check_now_formula(this.now_formula, this.now_quantity_num);
        if (!make_flag) {
            console.log('运行到制作配方，配方却不满足制作条件，异常情况');
            return;
        }

        //从玩家背包物品中扣除配方需求
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        for (let formula_material of formulas[this.now_formula].material) {
            let m_id = formula_material.id; //需求材料id
            let need_item_num = formula_material.num * parseInt(this.now_quantity_num); //需要的数量

            let ret = P_backpack.Player_lose_formula_item(m_id, need_item_num);
            if (ret != need_item_num) {
                console.log('制作配方去掉指定物品时失败，配方制作失败');
                return;
            }
        }

        //获得配方的产物
        let product_obj = new Object();
        let type = get_formula_product(this.now_formula, this.now_quantity_num, product_obj);
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
        SYN_behavior.formula_id = this.now_formula;
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
            //更新配方详情
            if (this.now_formula === undefined) {
                let no_formula_div_id = SYN_min + '_no_formula_div';
                const no_formula_div = document.getElementById(no_formula_div_id);
                no_formula_div.style.display = '';
            }
            // if (no_formula_div.style.display == 'none')
            else {
                this.updata_SYN_formula_Details_div();
            }
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
    //这个函数不建议放进配方筛选的文件里，因为界面中有一些按钮会触发这个函数，需要作为合成制造管理类的成员函数方便调用
    updata_SYN_FL_div(updata_type, click_type, click_value) {
        //获取当前选择的筛选类型
        let SYN_FL_N_type = get_radio_switch_click_value('SYN_FL_N_type_switch');
        let SYN_FL_P_type = get_radio_switch_click_value('SYN_FL_P_type_switch');
        //获取当前选择的筛选内容
        let SYN_FL_C = get_SYN_FL_click_type(updata_type, click_type, click_value);

        //清空目前的全部内容
        delete_SYN_FL_value();

        //获取需要展示的所有内容
        let SYN_FL_show_value = get_SYN_FL_show_value(SYN_FL_N_type, SYN_FL_P_type, SYN_FL_C);

        // 填充当前选择的筛选条件下需要展示的内容
        set_a_SYN_FL_show_value('N_main_type', SYN_FL_C.SYN_FL_N_M, SYN_FL_show_value.need_main_type); //需求-物品大类
        set_a_SYN_FL_show_value('N_secon_type', SYN_FL_C.SYN_FL_N_S, SYN_FL_show_value.need_secon_type); //需求-物品小类
        set_a_SYN_FL_show_value('N_item', SYN_FL_C.SYN_FL_N_I, SYN_FL_show_value.need_item); //需求-具体物品
        set_a_SYN_FL_show_value('P_main_type', SYN_FL_C.SYN_FL_P_M, SYN_FL_show_value.product_main_type); //产物-物品大类
        set_a_SYN_FL_show_value('P_secon_type', SYN_FL_C.SYN_FL_P_S, SYN_FL_show_value.product_secon_type); //产物-物品小类
        set_a_SYN_FL_show_value('P_item', SYN_FL_C.SYN_FL_P_I, SYN_FL_show_value.product_item); //产物-具体物品
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
    //保存要研究的配方
    set_now_research_formula(formula_id) {
        this.now_research_formula = formula_id;
    }
    //保存当前批量制造的数量
    set_now_quantity_num(quantity_num) {
        this.now_quantity_num = quantity_num;
    }
    get_now_quantity_num() {
        return this.now_quantity_num;
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
        let SYN_min = get_SYN_min_name();
        if (SYN_min == 'SYN_FL') {
            SYN_min = 'SYN_FM';
        }
        //配方研究界面没有数量选择和产物值div，不应走到这里，保险判断
        if (SYN_min == 'SYN_RS') {
            return;
        }

        //清空当前配方详情
        init_SYN_formula_Details_div(SYN_min);

        //展示点击配方的材料需求详情
        let FD_N_value_div_id = SYN_min + '_FD_N_value_div';
        let FD_N_value_div = document.getElementById(FD_N_value_div_id); //配方材料需求详情div
        let P_backpack = player.get_player_backpack(); //玩家可用物品
        //获取配方学习状态，研究状态的配方始终视作不可制作
        let P_formulas_manage = player.get_player_formulas_manage();
        let P_formulas = P_formulas_manage.get_player_skill_formulas('SYN');
        let is_study = false; //配方是否处于研究状态
        if (!is_Empty_Object(P_formulas[this.now_formula]) && P_formulas[this.now_formula].status == 'study') {
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
        for (let formula_material of formulas[this.now_formula].material) {
            let m_id = formula_material.id; //需求材料id
            let m_name = ''; //需求材料名
            let need_item_num = formula_material.num * parseInt(this.now_quantity_num); //需要的数量
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
                    console.log('%s配方的材料需求%s不属于已知类型，无法判断', this.now_formula, m_id);
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

        //展示点击配方的工作环境详情
        let FD_E_value_div_id = SYN_min + '_FD_E_value_div';
        let FD_E_value_div = document.getElementById(FD_E_value_div_id); //配方工作环境详情div
        let need_work_bench = formulas[this.now_formula].work_bench; //配方需求工作环境
        let SYN_place_work_bench = this.SYN_all_place_work_bench[this.now_place]; //当前地点的所有合成制造环境
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
                make_flag = false;
            }
        }
        FD_E_value_div.innerHTML = need_WB_ch + now_WB_ch;
        if (WB_flag) {
            FD_E_value_div.style.backgroundColor = enums['show_can_color']; //工作环境达标显示绿色
        } else {
            FD_E_value_div.style.backgroundColor = enums['show_nocan_color']; //工作环境不足显示红色
        }

        //展示点击配方的产出
        let FD_P_value_div_id = SYN_min + '_FD_P_value_div';
        let FD_P_value_div = document.getElementById(FD_P_value_div_id); //配方产出
        let product_id = formulas[this.now_formula].product.id;
        let product_name = texts[product_id].item_name;
        let product_num = formulas[this.now_formula].product.num * parseInt(this.now_quantity_num);
        let product_ch = product_name + ' X' + product_num;
        FD_P_value_div.innerHTML = product_ch;
        //添加鼠标移动上去展示产物的详情信息的功能
        let product_obj = new Object();
        get_formula_product(this.now_formula, this.now_quantity_num, product_obj);
        add_show_Tooltip(FD_P_value_div, 'item', product_obj);

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
    //检查输入的配方是否可以制造
    check_now_formula(id, num) {
        //调用SYN_function.js的通用函数
        return check_now_formula(id, num);
    }
}

export {};
