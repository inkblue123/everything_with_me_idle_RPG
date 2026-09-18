import { crtElement, addElement, addElement_botton, addElement_radio, addElement_select } from '../../../Function/Dom_function.js';
import { get_dataset_value, set_dataset_value } from '../../../Function/Function.js';

import { texts } from '../../../Data/Text/Text.js';
import { player } from '../../../Player/Player.js';
import { global } from '../../../GameRun/global_manage.js';

var last_COK_switch = 'COK_CD';

//构建烹饪技能的界面内容
function make_cooking_div(COK_value_div) {
    //烹饪第一个子界面，烹饪菜品界面
    let COK_CD_value_div = addElement(COK_value_div, 'div', 'COK_CD_value_div', 'COK_son_div', '');
    make_COK_CD_value_div(COK_CD_value_div);
    //烹饪第二个子界面，制作干制品界面
    let COK_MD_value_div = addElement(COK_value_div, 'div', 'COK_MD_value_div', 'COK_son_div', 'none');
    make_COK_MD_value_div(COK_MD_value_div);
    //烹饪第三个子界面，制作调味品界面
    let COK_MS_value_div = addElement(COK_value_div, 'div', 'COK_MS_value_div', 'COK_son_div', 'none');
    make_COK_MS_value_div(COK_MS_value_div);
    //烹饪第四个子界面，菜品调味
    let COK_DS_value_div = addElement(COK_value_div, 'div', 'COK_DS_value_div', 'COK_son_div', 'none');
    make_COK_DS_value_div(COK_DS_value_div);
    //烹饪第四个子界面，工作环境界面
    let COK_EN_value_div = addElement(COK_value_div, 'div', 'COK_EN_value_div', 'COK_son_div', 'none');
    make_COK_EN_value_div(COK_EN_value_div);
}
//烹饪第一个子界面，烹饪菜品（制造）界面
function make_COK_CD_value_div(COK_CD_value_div) {
    //顶部配方标题
    let COK_CD_formula_title_div = addElement(COK_CD_value_div, 'div', 'COK_CD_formula_title_div', 'COK_formula_title_div', '');
    let COK_CD_formula_title_1 = addElement(COK_CD_formula_title_div, 'div', 'COK_CD_formula_title_1', 'COK_formula_title_1', '');
    COK_CD_formula_title_1.innerHTML = '需求';
    let COK_CD_formula_title_2 = addElement(COK_CD_formula_title_div, 'div', 'COK_CD_formula_title_2', 'COK_formula_title_2', '');
    COK_CD_formula_title_2.innerHTML = '产出';
    let COK_CD_formula_title_3 = addElement(COK_CD_formula_title_div, 'div', 'COK_CD_formula_title_3', 'COK_formula_title_3', '');
    // COK_CD_formula_title_3.innerHTML = '占位';

    //容纳所有配方内容div
    let COK_CD_formula_scroll_box = addElement(COK_CD_value_div, 'div', 'COK_CD_formula_scroll_box', 'overflow_y_div COK_formula_scroll_box', '');
    var COK_CD_formula_value_div = addElement(COK_CD_formula_scroll_box, 'div', 'COK_CD_formula_value_div', 'in_overflow_div');
    for (let i = 0; i < 30; i++) {
        var formula_value = addElement(COK_CD_formula_value_div, 'div', null, 'formula_value');
        var formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
        formula_value_l.innerHTML = '材料A x1+材料B x2 ' + i;
        var formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
        formula_value_r.innerHTML = '产物A x1';
    }

    //选择div
    let COK_CD_choice_div = addElement(COK_CD_value_div, 'div', 'COK_CD_choice_div', 'COK_choice_div', '');
    //标题
    let COK_CD_choice_title = addElement(COK_CD_choice_div, 'div', 'COK_CD_choice_title', 'COK_choice_title', '');
    COK_CD_choice_title.innerHTML = '筛选';
    //可否制造筛选按钮
    let COK_CD_choice_make_flag_div = addElement(COK_CD_choice_div, 'div', 'COK_CD_choice_make_flag_div', 'COK_choice_make_flag_div', '');
    let COK_CD_choice_no_make = addElement_botton(COK_CD_choice_make_flag_div, 'COK_CD_choice_no_make', 'COK_choice_make_flag_button', '', '☐当前可制造');
    let COK_CD_choice_can_make = addElement_botton(COK_CD_choice_make_flag_div, 'COK_CD_choice_can_make', 'COK_choice_make_flag_button', 'none', '☑当前可制造');
    //排序多选框
    let COK_CD_sort_type_div = addElement(COK_CD_choice_div, 'div', 'COK_CD_sort_type_div', 'COK_sort_type_div', '');
    //标题
    let COK_CD_sort_label = addElement(COK_CD_sort_type_div, 'div', 'COK_CD_sort_label', 'COK_sort_label', '');
    COK_CD_sort_label.innerHTML = '按照';
    //排序属性下拉框（生命/魔力/精力）
    addElement_select(COK_CD_sort_type_div, 'COK_CD_attr_select', 'COK_sort_select', 'COK_sort_select', '排序属性', '默认', '生命', '魔力', '精力');
    //排序方向下拉框（升序/降序）
    addElement_select(COK_CD_sort_type_div, 'COK_CD_dir_select', 'COK_sort_select', 'COK_sort_select', '排序方向', '降序', '升序');
    //排序按钮
    let COK_CD_sort_button = addElement_botton(COK_CD_sort_type_div, 'COK_CD_sort_button', 'COK_sort_button', '', '排序');

    //没有选择配方时的填充
    let COK_CD_no_formula_div = addElement(COK_CD_value_div, 'div', 'COK_CD_no_formula_div', 'COK_no_formula_div', 'none');
    COK_CD_no_formula_div.innerHTML = '未选择要制造的配方';

    //选定配方详情div
    let COK_CD_formula_Details_div = addElement(COK_CD_value_div, 'div', 'COK_CD_formula_Details_div', 'COK_formula_Details_div', '');
    //详情上部（占75%高度，放置需求/状态/工作环境三个子元素，横向均分）
    let COK_CD_formula_Details_up_div = addElement(COK_CD_formula_Details_div, 'div', 'COK_CD_formula_Details_up_div', 'page_columns_111', '');
    //需求材料详情
    let COK_CD_FD_N_div = addElement(COK_CD_formula_Details_up_div, 'div', 'COK_CD_FD_N_div', 'COK_FD_N_div', '');
    //标题
    let COK_CD_FD_N_title_div = addElement(COK_CD_FD_N_div, 'div', 'COK_CD_FD_N_title_div', 'Details_div', '');
    COK_CD_FD_N_title_div.innerHTML = '材料需求';
    //所有需求材料
    let COK_CD_FD_N_scroll_box = addElement(COK_CD_FD_N_div, 'div', 'COK_CD_FD_N_scroll_box', 'overflow_y_div COK_FD_N_scroll_box', '');
    var COK_CD_FD_N_value_div = addElement(COK_CD_FD_N_scroll_box, 'div', 'COK_CD_FD_N_value_div', 'in_overflow_div');
    for (let i = 0; i < 2; i++) {
        var Details_div = addElement(COK_CD_FD_N_value_div, 'div', null, 'Details_div');
        Details_div.innerHTML = '材料A（1/10' + i;
    }
    //添加调料选择界面
    let COK_CD_FD_S_div = addElement(COK_CD_formula_Details_up_div, 'div', 'COK_CD_FD_S_div', 'COK_FD_S_div', '');
    //标题"添加调料"
    let COK_CD_FD_S_title_div = addElement(COK_CD_FD_S_div, 'div', 'COK_CD_FD_S_title_div', 'Details_div', '');
    COK_CD_FD_S_title_div.innerHTML = '单份菜品添加调料';
    //清空按钮
    let COK_CD_FD_S_clear_button = addElement_botton(COK_CD_FD_S_div, 'COK_CD_FD_S_clear_button', 'COK_FD_S_clear_button', '', '清空');
    //可撑开滚动条的列表布局（占剩余空间）
    let COK_CD_FD_S_scroll_box = addElement(COK_CD_FD_S_div, 'div', 'COK_CD_FD_S_scroll_box', 'overflow_y_div COK_FD_S_scroll_box', '');
    var COK_CD_FD_S_value_div = addElement(COK_CD_FD_S_scroll_box, 'div', 'COK_CD_FD_S_value_div', 'in_overflow_div');
    for (let i = 0; i < 5; i++) {
        var Seasoning_div = addElement(COK_CD_FD_S_value_div, 'div', null, 'Seasoning_div');
        //文本（占剩余空间，靠左）
        var Seasoning_text = addElement(Seasoning_div, 'div', null, 'Seasoning_text');
        Seasoning_text.innerHTML = '调料A<br>（X1）';
        //加号按钮（正方形，靠右）
        let add_button = addElement_botton(Seasoning_div, 'COK_CD_FD_S_add_button', 'Seasoning_add_button', '', '+');
        //减号按钮（正方形，靠右）
        let minus_button = addElement_botton(Seasoning_div, 'COK_CD_FD_S_minus_button', 'Seasoning_minus_button', '', '-');
    }
    //工作环境详情
    let COK_CD_FD_E_div = addElement(COK_CD_formula_Details_up_div, 'div', 'COK_CD_FD_E_div', 'COK_FD_E_div', '');
    //标题
    let COK_CD_FD_E_title_div = addElement(COK_CD_FD_E_div, 'div', 'COK_CD_FD_E_title_div', 'Details_div', '');
    COK_CD_FD_E_title_div.innerHTML = '工作环境需求';
    //当前选定
    let COK_CD_FD_E_value_div = addElement(COK_CD_FD_E_div, 'div', 'COK_CD_FD_E_value_div', 'COK_FD_E_value_div', '');
    COK_CD_FD_E_value_div.innerHTML = '1级工作台<br>当前<br>1级工作台';
    //详情下部（占25%高度，放置产物详情相关子元素，横向摆放）
    let COK_CD_formula_Details_down_div = addElement(COK_CD_formula_Details_div, 'div', 'COK_CD_formula_Details_down_div', '', '');
    //产物详情（去掉 COK_CD_FD_P_div 本身，4个子元素直接放入 down_div）
    let COK_CD_FD_P_title_div = addElement(COK_CD_formula_Details_down_div, 'div', 'COK_CD_FD_P_title_div', 'Details_div', '');
    COK_CD_FD_P_title_div.innerHTML = '产物';
    let COK_CD_FD_P_quantity_button = addElement_botton(COK_CD_formula_Details_down_div, 'COK_CD_FD_P_quantity_button', 'COK_FD_P_quantity_button', undefined, '批量制造选择<br>-> X1');
    set_dataset_value(COK_CD_FD_P_quantity_button, 'quantity_num', 1);
    var COK_CD_FD_P_value_div = addElement(COK_CD_formula_Details_down_div, 'div', 'COK_CD_FD_P_value_div', 'COK_FD_P_value_div');
    COK_CD_FD_P_value_div.innerHTML = '产物A x1';
    let COK_CD_FD_P_make_button = addElement_botton(COK_CD_formula_Details_down_div, 'COK_CD_FD_P_make_button', 'COK_FD_P_make_button', undefined, '制造');
}
//烹饪第二个子界面，制作干制品界面
function make_COK_MD_value_div(COK_MD_value_div) {}

//烹饪第三个子界面，制作调味品界面
function make_COK_MS_value_div(COK_MS_value_div) {}

//烹饪第四个子界面，菜品调味界面
function make_COK_DS_value_div(COK_DS_value_div) {}

//烹饪第五个子界面，工作环境界面
function make_COK_EN_value_div(COK_EN_value_div) {
    //顶部说明
    let COK_EN_title_div = addElement(COK_EN_value_div, 'div', 'COK_EN_title_div', '', '');
    COK_EN_title_div.innerHTML = '当前地点用于 烹饪 技能的工作环境';
    let COK_EN_detail_div = addElement(COK_EN_value_div, 'div', 'COK_EN_detail_div', '', '');

    //左侧的各种工作环境选择按钮
    let COK_EN_left_div = addElement(COK_EN_detail_div, 'div', 'COK_EN_left_div', '', '');
    var COK_EN_add_button = addElement(COK_EN_left_div, 'div', 'COK_EN_add_button', 'radio_div switch_radio_div_1');
    addElement_radio(COK_EN_add_button, 'COK_EN_ADD_switch_button', 'COK_EN_switch', 'COK_EN_ADD', '新增工作环境');
    COK_EN_add_button.children[0].checked = true; //初始激活该按钮

    //右侧详情
    let COK_EN_right_div = addElement(COK_EN_detail_div, 'div', 'COK_EN_right_div', '', '');

    //详情上半部分
    let COK_EN_Rup_div = addElement(COK_EN_right_div, 'div', 'COK_EN_Rup_div', '', '');
    //左边当前工作环境
    let COK_EN_Rup_now_div = addElement(COK_EN_Rup_div, 'div', 'COK_EN_Rup_now_div', 'COK_EN_Rup_son_div', '');
    let COK_EN_Rup_now_title = addElement(COK_EN_Rup_now_div, 'div', 'COK_EN_Rup_now_title', 'COK_EN_Rup_title', '');
    COK_EN_Rup_now_title.innerHTML = '当前';
    let COK_EN_Rup_now_name = addElement(COK_EN_Rup_now_div, 'div', 'COK_EN_Rup_now_name', 'COK_EN_Rup_name', '');
    COK_EN_Rup_now_name.innerHTML = '无';
    let COK_EN_Rup_now_desc = addElement(COK_EN_Rup_now_div, 'div', 'COK_EN_Rup_now_desc', 'COK_EN_Rup_desc', '');
    COK_EN_Rup_now_desc.innerHTML = '没有工作环境';
    //右边下一级工作环境
    let COK_EN_Rup_next_div = addElement(COK_EN_Rup_div, 'div', 'COK_EN_Rup_next_div', 'COK_EN_Rup_son_div', '');
    let COK_EN_Rup_next_title = addElement(COK_EN_Rup_next_div, 'div', 'COK_EN_Rup_next_title', 'COK_EN_Rup_title', '');
    COK_EN_Rup_next_title.innerHTML = '下一级';
    let COK_EN_Rup_next_name = addElement(COK_EN_Rup_next_div, 'div', 'COK_EN_Rup_next_name', 'COK_EN_Rup_name', '');
    COK_EN_Rup_next_name.innerHTML = '无';
    let COK_EN_Rup_next_desc = addElement(COK_EN_Rup_next_div, 'div', 'COK_EN_Rup_next_desc', 'COK_EN_Rup_desc', '');
    COK_EN_Rup_next_desc.innerHTML = '选择要搭建的<br>   工作环境';
    //中间的箭头
    let COK_EN_Rup_arrow_div = addElement(COK_EN_Rup_div, 'div', 'COK_EN_Rup_arrow_div', '', '');
    COK_EN_Rup_arrow_div.innerHTML = '➤';

    //详情中部
    let COK_EN_Rin_div = addElement(COK_EN_right_div, 'div', 'COK_EN_Rin_div', '', '');
    let COK_EN_Rin_title = addElement(COK_EN_Rin_div, 'div', 'COK_EN_Rin_title', '', '');
    COK_EN_Rin_title.innerHTML = '材料需求';

    let COK_EN_Rin_div_scroll_box = addElement(COK_EN_Rin_div, 'div', 'COK_EN_Rin_div_scroll_box', 'overflow_y_div', '');
    var COK_EN_Rin_value_div = addElement(COK_EN_Rin_div_scroll_box, 'div', 'COK_EN_Rin_value_div', 'in_overflow_div');
    for (let i = 0; i < 20; i++) {
        var COK_EN_value = addElement(COK_EN_Rin_value_div, 'div', null, 'COK_EN_value');
        COK_EN_value.innerHTML = '材料A（1/10）' + i;
    }

    //详情下部
    let COK_EN_Rdown_div = addElement(COK_EN_right_div, 'div', 'COK_EN_Rdown_div', '', '');
    let COK_EN_rechoice_button = addElement_botton(COK_EN_Rdown_div, 'COK_EN_rechoice_button', 'LP_button', '', '重选');
    let COK_EN_set_button = addElement_botton(COK_EN_Rdown_div, 'COK_EN_set_button', 'LP_button', '', '制造');

    //选择将要新增的工作环境
    let COK_EN_add_choice_div = addElement(COK_EN_right_div, 'div', 'COK_EN_add_choice_div', '', 'none');
    let COK_EN_add_choice_title = addElement(COK_EN_add_choice_div, 'div', 'COK_EN_add_choice_title', '', '');
    COK_EN_add_choice_title.innerHTML = '选择要建造的工作环境';
    let COK_EN_add_choice_value = addElement(COK_EN_add_choice_div, 'div', 'COK_EN_add_choice_value', '', '');
    for (let i = 0; i < 2; i++) {
        var COK_EN_add_choice_button = addElement_botton(COK_EN_add_choice_value, 'COK_EN_add_button', 'LP_button');
        COK_EN_add_choice_button.innerHTML = '工作台' + i;
    }
}

//为烹饪界面中的按钮添加交互逻辑
function set_cooking_button(Live_plan) {
    //在原料处理界面，左侧选择烹饪的子功能之后，右侧切换成烹饪的对应子功能界面
    let radios = Live_plan.querySelectorAll('input[type="radio"][name="COK_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let live_plan_manage = global.get_live_plan_manage();
            if (last_COK_switch != this.id) {
                //点击了当前没有展示的另一个子功能，初始化新界面
                live_plan_manage.init_live_plan_game_div(this.id);
            }
            last_COK_switch = this.id; //更新上一次点击的生活技能界面按钮
        });
    });
    let COK_value_div = Live_plan.querySelector('#COK_value_div');
    //为烹饪第一个子界面，烹饪菜品界面中的按钮添加交互逻辑
    set_COK_CD_button(COK_value_div);
    //为烹饪第二个子界面，制作干制品界面中的按钮添加交互逻辑
    set_COK_MD_button(COK_value_div);
    //为烹饪第三个子界面，制作调味品界面中的按钮添加交互逻辑
    set_COK_MS_button(COK_value_div);
    //为烹饪第四个子界面，菜品调味界面中的按钮添加交互逻辑
    set_COK_DS_button(COK_value_div);
    //为烹饪第五个子界面，工作环境中的按钮添加交互逻辑
    set_COK_EN_button(COK_value_div);
}
//为烹饪第一个子界面，烹饪菜品界面中的按钮添加交互逻辑
function set_COK_CD_button(COK_value_div) {
    let COK_CD_choice_no_make = COK_value_div.querySelector('#COK_CD_choice_no_make');
    let COK_CD_choice_can_make = COK_value_div.querySelector('#COK_CD_choice_can_make');
    //选定可制造配方
    COK_CD_choice_no_make.onclick = function () {
        //把没勾选的按钮切换成勾选
        COK_CD_choice_no_make.style.display = 'none';
        COK_CD_choice_can_make.style.display = '';
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div('cooking');
    };
    //不选定可制造配方
    COK_CD_choice_can_make.onclick = function () {
        //把勾选的按钮切换成没勾选
        COK_CD_choice_no_make.style.display = '';
        COK_CD_choice_can_make.style.display = 'none';
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div('cooking');
    };
    //批量选择按钮，点击之后要更换数字
    let COK_CD_quantity_button = COK_value_div.querySelector('#COK_CD_FD_P_quantity_button');
    COK_CD_quantity_button.addEventListener('click', function () {
        let now_quantity_num = get_dataset_value(this, 'quantity_num');
        let next_quantity_num = get_COK_next_quantity_num(now_quantity_num);
        this.innerHTML = '批量制造选择<br>-> X' + next_quantity_num;
        set_dataset_value(this, 'quantity_num', next_quantity_num);
        let live_plan_manage = global.get_live_plan_manage();
        let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
        cooking_manage.updata_live_plan_div(); //更新界面
    });
    //清空调料按钮，把调料区所有已选数量清零
    let COK_CD_FD_S_clear_button = COK_value_div.querySelector('#COK_CD_FD_S_clear_button');
    COK_CD_FD_S_clear_button.addEventListener('click', function () {
        let COK_CD_FD_S_value_div = document.getElementById('COK_CD_FD_S_value_div');
        let P_backpack = player.get_player_backpack();
        //当前批量制造份数：调料行的"总量"显示与加号上限都要用到它
        let quantity_button = document.getElementById('COK_CD_FD_P_quantity_button');
        let quantity_num = parseInt(get_dataset_value(quantity_button, 'quantity_num'));
        for (let child of COK_CD_FD_S_value_div.children) {
            //把已选数量设为0
            set_dataset_value(child, 'use_num', 0);
            //同步更新文本显示：物品名称（X0），表示一份菜品上加几个
            let item_id = get_dataset_value(child, 'item_id');
            let item_num = P_backpack.get_BP_Item_id_num(item_id);
            let item_name = texts[item_id].item_name;
            let Seasoning_text = child.children[0];
            Seasoning_text.innerHTML = item_name + '（X0）';
            //同步更新按钮状态：已选数量为0，减号禁用；加号是否可点取决于"每份剂量上限"是否大于0
            //每份剂量上限 = floor(拥有量/批量份数)，拥有量不足一份时上限为0，加号也应保持禁用
            let Seasoning_minus_button = child.children[1];
            let Seasoning_add_button = child.children[2];
            Seasoning_minus_button.disabled = true;
            Seasoning_minus_button.style.cursor = 'not-allowed';
            if (item_num >= quantity_num) {
                Seasoning_add_button.disabled = false;
                Seasoning_add_button.style.cursor = 'pointer';
            } else {
                Seasoning_add_button.disabled = true;
                Seasoning_add_button.style.cursor = 'not-allowed';
            }
        }
        //调料清空后，刷新制造按钮遮罩(调料不再影响能否制造)
        let live_plan_manage = global.get_live_plan_manage();
        let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
        cooking_manage.updata_now_make_button();
    });
    //制造按钮
    let COK_CD_FD_P_make_button = COK_value_div.querySelector('#COK_CD_FD_P_make_button');
    COK_CD_FD_P_make_button.addEventListener('click', function () {
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_data('cooking');
    });
    //排序属性下拉框：改变选择后刷新配方界面
    let COK_CD_attr_select = COK_value_div.querySelector('#COK_CD_attr_select');
    COK_CD_attr_select.addEventListener('change', function () {
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div('cooking');
    });
    //排序方向下拉框：改变选择后刷新配方界面
    let COK_CD_dir_select = COK_value_div.querySelector('#COK_CD_dir_select');
    COK_CD_dir_select.addEventListener('change', function () {
        let live_plan_manage = global.get_live_plan_manage();
        live_plan_manage.updata_live_plan_game_div('cooking');
    });
}
//为烹饪第二个子界面，制作干制品界面中的按钮添加交互逻辑
function set_COK_MD_button(COK_value_div) {}
//为烹饪第三个子界面，制作调味品界面中的按钮添加交互逻辑
function set_COK_MS_button(COK_value_div) {}
//为烹饪第四个子界面，菜品调味界面中的按钮添加交互逻辑
function set_COK_DS_button(COK_value_div) {}
//为烹饪第五个子界面，工作环境中的按钮添加交互逻辑
function set_COK_EN_button(COK_value_div) {}

//获取原料处理界面中的批量选择按钮下一个要切换到的数量
function get_COK_next_quantity_num(now_quantity_num) {
    // 批量选择的数量设置如下
    // 1 5 10 50 100 500 1000
    // 每按一次按钮，数量就不断向下切换
    // 到1000再切换变成1

    //计算当前数字有多少个0
    let zero_num = 0;
    let x = parseInt(now_quantity_num);
    while (1) {
        if (zero_num >= 10) {
            console.log('数字计算错误，now_quantity_num的值不正常');
            return 1;
        }

        if (parseInt(x / 10) > 0) {
            x = parseInt(x / 10);
            zero_num++;
        } else {
            break;
        }
    }

    //基于剩余数字获取下一个要切换到的数
    let arrr = [0, 5, 0, 0, 0, 1];
    let next_x = arrr[x];
    if (next_x == 0 || next_x == undefined) {
        console.log('数字计算错误，next_x的值不正常');
        return 1;
    }
    if (next_x == 1) {
        zero_num++;
    }
    next_x = next_x * 10 ** zero_num;
    if (next_x > 1000) {
        next_x = 1;
    }
    return next_x;
}

export { make_cooking_div, set_cooking_button };
