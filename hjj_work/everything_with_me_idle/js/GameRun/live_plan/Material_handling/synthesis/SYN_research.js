import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_uniqueArr } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';
import { delete_SYN_formula_Details_div } from './SYN_function.js';

// 更新合成制造技能的配方研究界面的内容
function updata_SYN_RS_div() {
    // 玩家进入配方研究界面之后，程序清除旧的配方研究界面内容
    let SYN_RS_list_div = document.getElementById('SYN_RS_list_div');
    SYN_RS_list_div.replaceChildren();

    // 遍历背包中的所有物品，获取所有物品id
    let backpack_item_ids = get_backpack_item_ids();
    if (backpack_item_ids.length == 0) {
        // 背包为空，直接返回，保留默认占位界面
        return;
    }
    // 查找产出背包物品的配方
    let item_research_map = get_item_to_formulas(backpack_item_ids);

    // 补充每个配方的学习状态
    fill_item_research_status(item_research_map);

    // 在SYN_RS_list_div里填入物品id，根据记录的信息决定点击效果
    fill_SYN_RS_list_div(SYN_RS_list_div, backpack_item_ids, item_research_map);
}

// 遍历背包中的所有物品，获取所有物品id
function get_backpack_item_ids() {
    let P_backpack = player.get_player_backpack();
    let backpack_items_data = P_backpack.backpack_items_data;
    return Object.keys(backpack_items_data);
}

// 根据"原料处理技能简写_物品id_数字"的格式，查找配方数据库中产出背包物品的配方
function get_item_to_formulas(backpack_item_ids) {
    let item_research_map = {};

    // 获取所有原料处理技能的简写（SYN、COK、FRG……）
    let skill_min_map = enums['live_plan_process_skill_min'];
    //遍历每个原料处理技能简写
    for (let skill_min in skill_min_map) {
        //遍历每个物品id
        for (let item_id of backpack_item_ids) {
            // 从1开始递增数字，拼装配方id去数据库查找
            let num = 1;
            while (true) {
                //所有配方id的格式都是 原料处理技能简写_物品id_数字
                let formula_id = skill_min + '_' + item_id + '_' + num;
                if (!is_Empty_Object(formulas[formula_id])) {
                    //查询到了
                    if (is_Empty_Object(item_research_map[item_id])) {
                        item_research_map[item_id] = new Object();
                        item_research_map[item_id].formula_ids = new Array(); //当前物品的所有配方情况
                        item_research_map[item_id].all_learned = false; //当前物品所有配方是否都学习了的标记
                    }
                    let formula_obj = new Object();
                    formula_obj.id = formula_id; //可以产出这个物品的一个配方id
                    formula_obj.skill_min = skill_min; //这个配方的技能
                    formula_obj.status = 'none'; //这个配方的学习情况

                    item_research_map[item_id].formula_ids.push(formula_obj);
                    num++;
                } else {
                    // 当前数字不存在，该物品在此技能下没有更多配方了
                    break;
                }
            }
        }
    }

    return item_research_map;
}

// 补充每个配方的学习状态
function fill_item_research_status(item_research_map) {
    // 预取所有原料处理技能的玩家配方
    let P_formulas = {};
    let skill_min_map = enums['live_plan_process_skill_min'];
    for (let skill_min in skill_min_map) {
        P_formulas[skill_min] = player.get_player_skill_formulas(skill_min);
    }
    //查询玩家对每个配方的学习状态
    for (let item_id in item_research_map) {
        let entry = item_research_map[item_id];
        let all_learned = true;

        for (let formula_obj of entry.formula_ids) {
            // 根据配方的技能简写，到对应技能的玩家配方中查找
            let player_skill_formulas = P_formulas[formula_obj.skill_min];
            if (player_skill_formulas && player_skill_formulas[formula_obj.id]) {
                formula_obj.status = player_skill_formulas[formula_obj.id].status;
            } else {
                formula_obj.status = 'unknow'; //完全不知道配方
            }

            // 同一个物品的多个配方只要有一个完全不知道，就可以视作没有学完，允许之后进行研究
            if (formula_obj.status == 'unknow') {
                all_learned = false;
            }
        }

        entry.all_learned = all_learned;
    }
}

//向配方研究的物品列表界面填入物品
function fill_SYN_RS_list_div(SYN_RS_list_div, backpack_item_ids, item_research_map) {
    // 读取配方研究界面的筛选状态
    let SYN_RS_choice_can_make = document.getElementById('SYN_RS_choice_can_make');
    let only_researchable = false; // 是否只展示可研究的物品
    if (SYN_RS_choice_can_make.style.display != 'none') {
        only_researchable = true;
    }

    for (let item_id of backpack_item_ids) {
        //获取这个物品的配方情况
        let info = item_research_map[item_id];

        // 如果筛选为"只展示可研究"，则跳过无配方或已全部学会的物品
        if (only_researchable) {
            if (is_Empty_Object(info) || info.all_learned) {
                continue;
            }
        }

        let table_value = addElement(SYN_RS_list_div, 'div', null, 'formula_value');
        if (is_Empty_Object(texts[item_id])) {
            table_value.innerHTML = item_id;
            console.log('%s物品名称文本未定义', item_id);
        } else {
            table_value.innerHTML = texts[item_id].item_name;
        }

        // 没有配方，或者所有配方都已学会 → 变淡
        if (is_Empty_Object(info) || info.all_learned) {
            table_value.style.opacity = '0.4';
        }

        //根据物品配方情况处理点击后的逻辑
        table_value.addEventListener('click', () => {
            handle_SYN_RS_item_click(item_id, info);
        });
    }
}

// 处理配方研究界面中点击某个物品后的显示逻辑
function handle_SYN_RS_item_click(item_id, info) {
    let item_name = texts[item_id].item_name;
    let SYN_RS_no_formula_div = document.getElementById('SYN_RS_no_formula_div');
    let SYN_RS_formula_Details_div = document.getElementById('SYN_RS_formula_Details_div');

    // 如果物品没有对应配方可以制作，点击之后显示SYN_RS_no_formula_div，并且把文本改为"该物品没有配方可以研究"
    if (is_Empty_Object(info)) {
        SYN_RS_no_formula_div.innerHTML = item_name + '：该物品没有配方可以研究';
        SYN_RS_no_formula_div.style.display = '';
        SYN_RS_formula_Details_div.style.display = 'none';
        return;
    }

    // 如果物品有配方，并且所有配方玩家都"完全知晓"，那么点击之后显示SYN_RS_no_formula_div，文本改为"该物品的所有配方都已学习"
    if (info.all_learned) {
        SYN_RS_no_formula_div.innerHTML = item_name + '：该物品的所有配方都已学习';
        SYN_RS_no_formula_div.style.display = '';
        SYN_RS_formula_Details_div.style.display = 'none';
        return;
    }

    // 如果物品有配方，并且存在某个配方还没学习，那么点击之后显示SYN_RS_formula_Details_div
    SYN_RS_no_formula_div.style.display = 'none';
    SYN_RS_formula_Details_div.style.display = '';

    //循环该物品的各个配方，寻找第一个未学习的配方作为研究目标
    let research_formula_obj = null;
    for (let formula_obj of info.formula_ids) {
        //只选择尚未"完全知晓"的配方（unknow）
        if (formula_obj.status == 'unknow') {
            research_formula_obj = formula_obj;
            break;
        }
    }
    if (research_formula_obj == null) {
        //理论上不会走到这里，all_learned已经拦截了这种情况
        return;
    }

    //记录当前要研究的配方，供后续"研究"按钮使用
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    synthesis_manage.set_now_research_formula(research_formula_obj.id);

    //更新材料需求、工作环境、研究按钮
    let material_flag = updata_SYN_RS_FD_N_div(item_id, research_formula_obj); //材料是否达标
    let work_bench_flag = updata_SYN_RS_FD_E_div(research_formula_obj); //工作环境是否达标
    updata_SYN_RS_FD_P_button(material_flag && work_bench_flag); //研究按钮可用性
}
//更新配方研究界面的材料需求，返回材料是否达标
function updata_SYN_RS_FD_N_div(item_id, formula_obj) {
    let FD_N_value_div = document.getElementById('SYN_RS_FD_N_value_div');
    FD_N_value_div.replaceChildren();

    //点击的物品是武器装备，走不同的处理逻辑，接口预留
    if (items[item_id].main_type == 'equipment') {
        return updata_SYN_RS_FD_N_equipment(FD_N_value_div, item_id, formula_obj);
    }

    //获取研究需求数量
    let research = get_formula_research(formula_obj.id);
    let need_num = research.need_num;
    //玩家背包中该物品的数量
    let P_backpack = player.get_player_backpack();
    let BP_num = P_backpack.get_BP_Item_id_num(item_id);
    //显示"物品名称*n"
    let item_name = texts[item_id].item_name;
    let Details_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
    Details_div.innerHTML = item_name + ' X' + need_num;
    if (BP_num >= need_num) {
        Details_div.style.backgroundColor = enums['show_can_color']; //材料足够显示绿色
        return true;
    } else {
        Details_div.style.backgroundColor = enums['show_nocan_color']; //材料不足显示红色
        return false;
    }
}
//更新配方研究界面的武器装备材料需求，按稀有度从低到高展示可消耗的数量
function updata_SYN_RS_FD_N_equipment(FD_N_value_div, item_id, formula_obj) {
    let research = get_formula_research(formula_obj.id);
    let need_num = research.need_num; //研究需求数量
    let item_name = texts[item_id].item_name; //物品名称
    //玩家背包中该装备的总数量
    let P_backpack = player.get_player_backpack();
    let BP_data = P_backpack.backpack_items_data[item_id];
    let all_num = 0;
    if (!is_Empty_Object(BP_data)) {
        all_num = BP_data.all_num;
    }

    //第一个布局，展示任意该装备X需求数，达标绿色否则红色
    let Details_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
    Details_div.innerHTML = '任意' + item_name + ' X' + need_num;
    if (all_num >= need_num) {
        Details_div.style.backgroundColor = enums['show_can_color']; //数量足够显示绿色
    } else {
        Details_div.style.backgroundColor = enums['show_nocan_color']; //数量不足显示红色
    }

    //第二个布局，展示将要消耗
    let consume_title_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
    consume_title_div.innerHTML = '将要消耗';

    //按稀有度从低到高展示玩家背包中该装备可消耗的数量
    let need_lose_num = need_num; //还需要消耗的数量
    if (!is_Empty_Object(BP_data)) {
        //稀有度顺序，从低到高
        let rarity_order = enums['special_rarity'];
        //收集该装备背包里各个稀有度的key，并按稀有度低到高排序
        let rarity_key_arr = new Array();
        for (let item_key in BP_data.BP_key) {
            let rarity = item_key.split(':')[1]; //从背包key解析稀有度
            rarity_key_arr.push({ key: item_key, rarity: rarity });
        }
        rarity_key_arr.sort((a, b) => rarity_order.indexOf(a.rarity) - rarity_order.indexOf(b.rarity));
        //逐稀有度展示消耗数量
        for (let rarity_key of rarity_key_arr) {
            if (need_lose_num <= 0) {
                //需求已经满足，不再展示更高稀有度
                break;
            }
            let item_num = BP_data.BP_key[rarity_key.key];
            let remove_num = Math.min(need_lose_num, item_num); //该稀有度消耗的数量
            let rarity_div = addElement(FD_N_value_div, 'div', null, 'Details_div');
            rarity_div.innerHTML = item_name + ' X' + remove_num;
            //文本颜色按稀有度变化
            if (enums[rarity_key.rarity] && enums[rarity_key.rarity].rarity_color) {
                rarity_div.style.color = enums[rarity_key.rarity].rarity_color;
            }
            need_lose_num -= remove_num;
        }
    }

    //返回材料是否达标
    if (all_num >= need_num) {
        return true;
    } else {
        return false;
    }
}
//更新配方研究界面的工作环境需求，返回工作环境是否达标
function updata_SYN_RS_FD_E_div(formula_obj) {
    let FD_E_value_div = document.getElementById('SYN_RS_FD_E_value_div');
    //配方研究的工作环境一定是拆解工具
    let work_bench_id = 'disassembly_tool'; //工作环境id
    //获取研究需求工作环境等级
    let research = get_formula_research(formula_obj.id);
    let need_level = research.need_work_bench_level; //工作环境等级
    let work_bench_name = texts[work_bench_id].work_bench_name; //工作环境名称
    //当前地点该工作环境的等级
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let now_level = synthesis_manage.SYN_all_place_work_bench[synthesis_manage.now_place][work_bench_id];
    if (now_level == undefined) {
        now_level = 0;
    }
    //显示"n级拆解工具<br>当前<br>m级拆解工具"
    let FD_E_ch = need_level + '级' + work_bench_name + '<br>当前<br>' + now_level + '级' + work_bench_name;
    FD_E_value_div.innerHTML = FD_E_ch;
    if (now_level >= need_level) {
        FD_E_value_div.style.backgroundColor = enums['show_can_color']; //工作环境达标显示绿色
        return true;
    } else {
        FD_E_value_div.style.backgroundColor = enums['show_nocan_color']; //工作环境不足显示红色
        return false;
    }
}
//更新配方研究界面的研究按钮的可用性
function updata_SYN_RS_FD_P_button(make_flag) {
    let FD_P_make_button = document.getElementById('SYN_RS_FD_P_make_button');
    if (make_flag) {
        FD_P_make_button.disabled = false;
        FD_P_make_button.style.cursor = 'pointer';
    } else {
        FD_P_make_button.disabled = true;
        FD_P_make_button.style.cursor = 'not-allowed';
    }
}
//获取配方的研究需求数据，不可研究的配方把需求数量和等级都视作999
function get_formula_research(formula_id) {
    let research = formulas[formula_id].research;
    if (is_Empty_Object(research) || !research.can_research) {
        //不可研究的配方，研究需求数量和等级都视作999
        return {
            can_research: false,
            need_num: 999,
            need_work_bench_level: 999,
        };
    }
    return research;
}

// 构建配方的简要描述文本（需求→产出）
function build_formula_brief_text(formula_id) {
    let formula = formulas[formula_id];
    if (is_Empty_Object(formula)) {
        return formula_id;
    }

    // 需求材料文本
    let material_ch = '';
    for (let i = 0; i < formula.material.length; i++) {
        let m_id = formula.material[i].id;
        let m_num = formula.material[i].num;
        let m_name = m_id; // 默认使用id

        if (enums['all_secon_type'].includes(m_id)) {
            m_name = texts[m_id].type_name;
        } else if (enums['Item_secon_type'].includes(m_id)) {
            m_name = '任意' + texts[m_id].type_name;
        } else if (!is_Empty_Object(items[m_id])) {
            m_name = texts[m_id].item_name;
        }

        if (m_num == 1) {
            material_ch += m_name;
        } else {
            material_ch += m_name + ' X' + m_num;
        }

        if (i < formula.material.length - 1) {
            material_ch += ' + ';
        }
    }

    // 产物文本
    let product_id = formula.product.id;
    let product_num = formula.product.num;
    let product_name = product_id;
    if (!is_Empty_Object(items[product_id])) {
        product_name = texts[product_id].item_name;
    }

    let product_ch;
    if (product_num == 1) {
        product_ch = product_name;
    } else {
        product_ch = product_name + ' X' + product_num;
    }

    return material_ch + ' → ' + product_ch;
}

//开始配方研究，扣除研究需求并设置配方学习状态
function updata_live_plan_research() {
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');

    //当前没有选定要研究的配方
    if (is_Empty_Object(synthesis_manage.now_research_formula)) {
        console.log('没有选定要研究的配方');
        return;
    }
    let formula_id = synthesis_manage.now_research_formula;
    //校验研究条件是否满足
    if (!check_now_formula_research(formula_id)) {
        console.log('研究配方%s时条件不满足', formula_id);
        return;
    }

    //扣除研究需求数量的配方产物
    let research = get_formula_research(formula_id);
    let need_num = research.need_num; //研究需求数量
    let product_id = formulas[formula_id].product.id; //配方产物id
    let P_backpack = player.get_player_backpack();
    let ret = P_backpack.Player_lose_formula_item(product_id, need_num);
    if (ret != need_num) {
        console.log('研究配方扣除物品时失败，配方研究失败');
        return;
    }

    //设置该配方的学习状态为study
    let P_formulas_manage = player.get_player_formulas_manage();
    P_formulas_manage.Player_get_formula(formula_id, 'study');

    //切换到配方研究界面的无配方提示，显示研究成功提示
    let SYN_RS_no_formula_div = document.getElementById('SYN_RS_no_formula_div');
    delete_SYN_formula_Details_div('SYN_RS');
    SYN_RS_no_formula_div.innerHTML = build_research_success_text(formula_id);
    //锁住生活技能界面，防止2秒内的点击影响运行逻辑
    let live_plan_lock_div = document.getElementById('live_plan_lock_div');
    live_plan_lock_div.style.display = '';

    //2秒后刷新配方研究界面，重置为初始状态，并解除锁定
    setTimeout(() => {
        SYN_RS_no_formula_div.innerHTML = '未选择要研究的物品';
        live_plan_manage.updata_live_plan_game_div('synthesis');
        live_plan_lock_div.style.display = 'none';
    }, 2000);
}
//生成研究成功后的提示文本，与日志中的"开始研究"提示一致
function build_research_success_text(formula_id) {
    let ch;
    let product_id = formulas[formula_id].product.id; //配方产物id
    if (!is_Empty_Object(enums['all_work_bench'][product_id])) {
        //产出是工作环境
        let product_name = texts[product_id].work_bench_name; //工作台名称
        let skill_id = formulas[formula_id].skill; //配方所属技能id
        let live_skill_name = texts[skill_id].live_skill_name; //配方所属技能名称
        let level = formulas[formula_id].product.next_level;
        ch = '获知了在 ' + live_skill_name + ' 的 ' + level + '级' + product_name + ' 配方的需求';
    } else if (!is_Empty_Object(items[product_id])) {
        //产出是某种物品
        let product_name = texts[product_id].item_name; //产物名
        let skill_id = formulas[formula_id].skill; //配方所属技能id
        let live_skill_name = texts[skill_id].live_skill_name; //配方所属技能名称
        ch = '获知了在 ' + live_skill_name + ' 技能中制造 ' + product_name + ' 的配方的需求';
    }
    return ch;
}

//检查输入的配方是否可以研究（通用函数）
function check_now_formula_research(formula_id) {
    if (is_Empty_Object(formula_id)) {
        console.log('没有输入配方id，无法判断');
        return false;
    } else if (is_Empty_Object(formulas[formula_id])) {
        console.log('%s不属于配方id，不应该调用当前函数', formula_id);
        return false;
    }

    //配方是否仍未学习，只有完全不知道的配方可以研究
    let P_formulas_manage = player.get_player_formulas_manage();
    let skill_min = formula_id.slice(0, 3); //配方技能的简写，如SYN
    let P_formulas = P_formulas_manage.get_player_skill_formulas(skill_min);
    let study_status = 'unknow';
    if (!is_Empty_Object(P_formulas[formula_id])) {
        study_status = P_formulas[formula_id].status;
    }
    if (study_status != 'unknow') {
        //配方已经学会或者正在研究中，不能研究
        return false;
    }

    //研究需求
    let research = get_formula_research(formula_id);
    let need_num = research.need_num; //研究需求数量
    let need_work_bench_level = research.need_work_bench_level; //研究需求工作环境等级

    //材料检查：背包中该配方产物的数量是否达标
    let product_id = formulas[formula_id].product.id; //配方产物id
    let P_backpack = player.get_player_backpack();
    let BP_num = P_backpack.get_BP_Item_id_num(product_id);
    if (BP_num < need_num) {
        return false;
    }

    //工作环境检查：当前地点拆解工具等级是否达标
    let live_plan_manage = global.get_live_plan_manage();
    let synthesis_manage = live_plan_manage.get_LP_live_skill_manage('synthesis_manage');
    let SYN_now_place_work_bench = synthesis_manage.get_now_place_work_bench();
    let now_level = SYN_now_place_work_bench['disassembly_tool'];
    if (now_level == undefined) {
        now_level = 0;
    }
    if (now_level < need_work_bench_level) {
        return false;
    }

    return true;
}

export { updata_SYN_RS_div, get_formula_research, updata_live_plan_research, check_now_formula_research };
