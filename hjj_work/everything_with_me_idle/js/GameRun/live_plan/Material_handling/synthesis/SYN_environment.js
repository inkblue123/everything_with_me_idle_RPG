import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_uniqueArr } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

//获取工作环境界面左侧选择的工作环境
function get_now_SYN_EN_work_bench() {
    return get_radio_switch_click_value('SYN_EN_switch');
}

function delete_SYN_EN() {
    //左侧工作环境选择按钮
    let SYN_EN_left_div = document.getElementById('SYN_EN_left_div');
    SYN_EN_left_div.replaceChildren();
    //显示下一级工作环境
    let SYN_EN_Rup_next_div = document.getElementById('SYN_EN_Rup_next_div');
    SYN_EN_Rup_next_div.style.display = '';
    //隐藏选择将要新增的工作环境
    let SYN_EN_add_choice_value = document.getElementById('SYN_EN_add_choice_value');
    SYN_EN_add_choice_value.replaceChildren();
    // SYN_EN_add_choice_div.style.display = 'none';
    //清除现在展示的材料需求
    let SYN_EN_Rin_value_div = document.getElementById('SYN_EN_Rin_value_div');
    SYN_EN_Rin_value_div.replaceChildren();
}
//初始化工作环境详情界面的所有内容
function init_SYN_EN(SYN_place_work_bench) {
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let SYN_EN_left_div = document.getElementById('SYN_EN_left_div');
    //遍历每种可能的工作台
    for (let work_bench_id of enums['all_SYN_work_bench']) {
        if (SYN_place_work_bench[work_bench_id] == undefined) {
            console.log('玩家没有初始化%s工作环境', work_bench_id);
        } else if (SYN_place_work_bench[work_bench_id] == 0) {
            //当前地点该工作台等级为0，确认是否有配方
            let new_work_bench_formulas_id = 'SYN_' + work_bench_id + '_1';
            let P_formula = player.get_player_formulas_manage();
            let study_status = P_formula.get_formula_study_status(new_work_bench_formulas_id);
            if (study_status == 'know') {
                //玩家知晓创建新工作台的配方，添加到选择界面
                let work_bench_name = texts[work_bench_id].work_bench_name;
                let SYN_EN_add_choice_value = document.getElementById('SYN_EN_add_choice_value');
                var SYN_EN_add_choice_button = addElement(SYN_EN_add_choice_value, 'button', '', 'LP_button');
                SYN_EN_add_choice_button.innerHTML = work_bench_name;
                SYN_EN_add_choice_button.addEventListener('click', function () {
                    change_SYN_EN_div('creat_work_bench', work_bench_id);
                });
            } else {
                //玩家不知晓下一级升级配方，不处理
            }
        } else if (SYN_place_work_bench[work_bench_id] != 0) {
            //当前地点存在某种工作环境等级不是0，需要在左侧显示
            let work_bench_name = texts[work_bench_id].work_bench_name;
            var SYN_EN_add_button = addElement(SYN_EN_left_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(SYN_EN_add_button, 'SYN_EN_' + work_bench_id, 'SYN_EN_switch', work_bench_id, work_bench_name);
        }
    }
    //设置按下某种工作台的按钮后调整界面的逻辑
    let radios = document.querySelectorAll('input[type="radio"][name="SYN_EN_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_SYN_EN_div('level_up', this.value);
        });
    });
    //添加创建新工作台按钮
    var SYN_EN_add_button = addElement(SYN_EN_left_div, 'div', null, 'radio_div switch_radio_div_1');
    addElement_radio(SYN_EN_add_button, 'SYN_EN_ADD_switch_button', 'SYN_EN_switch', 'SYN_EN_ADD', '新增工作环境');
    SYN_EN_add_button.addEventListener('click', function () {
        change_SYN_EN_div('choice_work_bench', this.value);
    });

    //初始化左侧的第一个按钮
    SYN_EN_left_div.children[0].children[0].checked = true;
    let click_value = SYN_EN_left_div.children[0].children[0].value;
    if (click_value == 'SYN_EN_ADD') {
        change_SYN_EN_div('choice_work_bench');
    } else {
        change_SYN_EN_div('level_up', click_value);
    }
}
//点击了工作环境详情界面的切换界面按钮，调整界面内容
function change_SYN_EN_div(change_type, change_value) {
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');

    let SYN_EN_Rup_div = document.getElementById('SYN_EN_Rup_div');
    let SYN_EN_Rin_div = document.getElementById('SYN_EN_Rin_div');
    let SYN_EN_Rdown_div = document.getElementById('SYN_EN_Rdown_div');
    let SYN_EN_add_choice_div = document.getElementById('SYN_EN_add_choice_div');
    let SYN_EN_rechoice_button = document.getElementById('SYN_EN_rechoice_button');
    let SYN_EN_Rin_value_div = document.getElementById('SYN_EN_Rin_value_div');

    if (change_type == 'level_up') {
        //点击了左侧的一个已有的工作台，要展示即将升级的界面
        //调整界面
        SYN_EN_Rup_div.style.display = '';
        SYN_EN_Rin_div.style.display = '';
        SYN_EN_Rdown_div.style.display = '';
        SYN_EN_add_choice_div.style.display = 'none';
        SYN_EN_rechoice_button.style.display = 'none';

        let place_work_bench = synthesis_manage.get_now_place_work_bench();
        let now_level = place_work_bench[change_value];
        let next_level_formulas_id = 'SYN_' + change_value + '_' + (now_level + 1);
        let work_bench_name = texts[change_value].work_bench_name;
        //调整左侧内容
        let SYN_EN_Rup_now_name = document.getElementById('SYN_EN_Rup_now_name');
        let SYN_EN_Rup_now_desc = document.getElementById('SYN_EN_Rup_now_desc');
        SYN_EN_Rup_now_name.innerHTML = now_level + '级' + work_bench_name;
        SYN_EN_Rup_now_desc.innerHTML = texts[change_value].work_bench_desc[now_level];
        //调整右侧内容
        let SYN_EN_Rup_next_name = document.getElementById('SYN_EN_Rup_next_name');
        let SYN_EN_Rup_next_desc = document.getElementById('SYN_EN_Rup_next_desc');
        if (is_Empty_Object(formulas[next_level_formulas_id])) {
            //下一级升级配方不存在，所以当前等级是最高的了
            SYN_EN_Rup_next_name.innerHTML = 'MAX';
            SYN_EN_Rup_next_desc.innerHTML = '世间再也没有更好的了';
        } else {
            //下一级升级配方存在，
            let P_formula = player.get_player_formulas_manage();
            let study_status = P_formula.get_formula_study_status(next_level_formulas_id);
            if (study_status == 'know') {
                //玩家知晓下一级升级配方，展示出来
                SYN_EN_Rup_next_name.innerHTML = now_level + 1 + '级' + work_bench_name;
                SYN_EN_Rup_next_desc.innerHTML = texts[change_value].work_bench_desc[now_level + 1];
                //下一级升级配方的材料
                updata_SYN_EN_formula_Details_div(next_level_formulas_id);
                //保存这个配方id，准备制作
                synthesis_manage.set_now_formula(next_level_formulas_id);
            } else {
                //玩家不知晓下一级升级配方
                SYN_EN_Rup_next_name.innerHTML = '？MAX？';
                SYN_EN_Rup_next_desc.innerHTML = '     应该还能升级<br>但是你不知道怎么做';
            }
        }
    } else if (change_type == 'creat_work_bench') {
        //点击了要搭建某种新工作环境按钮，显示建造所需的材料界面
        SYN_EN_Rup_div.style.display = '';
        SYN_EN_Rin_div.style.display = '';
        SYN_EN_Rdown_div.style.display = '';
        SYN_EN_add_choice_div.style.display = 'none';
        SYN_EN_rechoice_button.style.display = '';

        let place_work_bench = synthesis_manage.get_now_place_work_bench();
        let now_level = place_work_bench[change_value];
        let next_level_formulas_id = 'SYN_' + change_value + '_1';
        let work_bench_name = texts[change_value].work_bench_name;
        //调整左侧内容
        let SYN_EN_Rup_now_name = document.getElementById('SYN_EN_Rup_now_name');
        let SYN_EN_Rup_now_desc = document.getElementById('SYN_EN_Rup_now_desc');
        SYN_EN_Rup_now_name.innerHTML = '无';
        SYN_EN_Rup_now_desc.innerHTML = '一片空地';
        //调整右侧内容
        let SYN_EN_Rup_next_name = document.getElementById('SYN_EN_Rup_next_name');
        let SYN_EN_Rup_next_desc = document.getElementById('SYN_EN_Rup_next_desc');
        if (is_Empty_Object(formulas[next_level_formulas_id])) {
            //下一级升级配方不存在，所以当前等级是最高的了
            console.log('不存在1级%s工作台的升级配方，逻辑异常', next_level_formulas_id);
        } else {
            //下一级升级配方存在，
            let P_formula = player.get_player_formulas_manage();
            let study_status = P_formula.get_formula_study_status(next_level_formulas_id);
            if (study_status == 'know') {
                //玩家知晓下一级升级配方，展示出来
                SYN_EN_Rup_next_name.innerHTML = now_level + 1 + '级' + work_bench_name;
                SYN_EN_Rup_next_desc.innerHTML = texts[change_value].work_bench_desc[now_level + 1];

                updata_SYN_EN_formula_Details_div(next_level_formulas_id);

                synthesis_manage.set_now_formula(next_level_formulas_id);
            } else {
                //玩家不知晓下一级升级配方
                console.log('玩家不知晓1级%s工作台的升级配方，逻辑异常', next_level_formulas_id);
            }
        }
    } else if (change_type == 'choice_work_bench') {
        //点击了重选新工作环境按钮
        SYN_EN_Rup_div.style.display = 'none';
        SYN_EN_Rin_div.style.display = 'none';
        SYN_EN_Rdown_div.style.display = 'none';
        SYN_EN_add_choice_div.style.display = '';
        SYN_EN_rechoice_button.style.display = '';
    }
}
function updata_SYN_EN_formula_Details_div(formulas_id) {
    //清空当前配方详情
    let SYN_EN_Rin_value_div = document.getElementById('SYN_EN_Rin_value_div');
    SYN_EN_Rin_value_div.replaceChildren();

    let make_flag = true;
    //展示指定配方的材料需求详情
    let P_backpack = player.get_player_backpack(); //玩家可用物品
    for (let formula_material of formulas[formulas_id].material) {
        let m_id = formula_material.id; //需求材料id
        let m_name = ''; //需求材料名
        let need_item_num = formula_material.num; //需要的数量
        let BP_num = 0; //玩家拥有的数量
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
        let FD_N_ch = m_name + '( ' + BP_num + ' / ' + need_item_num + ' )';
        let Details_div = addElement(SYN_EN_Rin_value_div, 'div', null, 'Details_div');
        Details_div.innerHTML = FD_N_ch;
        if (need_item_num > BP_num) {
            Details_div.style.backgroundColor = '#ff000033'; //材料不足显示红色
            make_flag = false;
        } else {
            Details_div.style.backgroundColor = '#00ff0033'; //材料足够显示绿色
        }
    }

    //校验指定配方的工作环境需求
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let now_work_bench = synthesis_manage.get_now_place_work_bench();
    let need_work_bench = formulas[formulas_id].work_bench; //配方需求工作环境
    for (let i = 0; i < need_work_bench.length; i++) {
        let work_bench_id = need_work_bench[i].id;
        let need_level = need_work_bench[i].level;
        let now_level = now_work_bench[work_bench_id];
        if (now_level == undefined) {
            now_level = 0;
            console.log('%s配方需要的%s工作环境没有初始化', formulas_id, work_bench_id);
        }
        if (need_level > now_level) {
            make_flag = false;
            console.log('%s配方的工作环境未满足，逻辑异常', formulas_id);
        }
    }

    //根据配方需求情况调整制造按钮
    let SYN_EN_set_button = document.getElementById('SYN_EN_set_button');
    if (make_flag) {
        SYN_EN_set_button.disabled = false;
        SYN_EN_set_button.style.cursor = 'pointer';
    } else {
        SYN_EN_set_button.disabled = true;
        SYN_EN_set_button.style.cursor = 'not-allowed';
    }
}

export { get_now_SYN_EN_work_bench, delete_SYN_EN, init_SYN_EN, change_SYN_EN_div };
