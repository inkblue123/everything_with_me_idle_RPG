import { addElement, addElement_botton, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_dataset_value, set_dataset_value } from '../../../../Function/Function.js';

import { get_COK_formula_switch_type, COK_switch_type_handle, add_COK_formula, get_COK_min_name, get_now_quantity_num } from './COK_function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';

//把可能为空的值转成数字0，用于数值折算(避免undefined参与乘法产生NaN)
function to_num(value) {
    if (value === undefined || value === null || value === '') {
        return 0;
    }
    return value;
}

//更新烹饪菜品子功能界面
function updata_COK_CD_div() {
    //清空这个界面里的配方
    let COK_CD_formula_value_div = document.getElementById('COK_CD_formula_value_div');
    COK_CD_formula_value_div.replaceChildren();
    //获取应该展示的配方过滤条件
    let COK_CD_type = get_COK_formula_switch_type('COK_CD');
    //获取在这个过滤条件下应该展示的配方id
    let formula_arr = COK_switch_type_handle(COK_CD_type);
    //展示这些配方
    for (let formula_id of formula_arr) {
        add_COK_formula('COK_CD', formula_id);
    }
}
//调料行文本：括号里只表示"一份菜品上加了几个该调料"，例如 鱼肉松（X2），未选时为（X0）
//不显示批量总量与拥有量（批量与实际消耗的关系由批量选择按钮体现）
function get_seasoning_text(item_name, use_num) {
    return item_name + '（X' + use_num + '）';
}
//更新烹饪配方详情的添加调料区
//previous_selection：上一次的调料选择 [{id,num:n}]（仅"刷新链"会传入，用于刷新后尽量还原；点配方行时不传，视为重新选择）
function updata_COK_formula_Seasoning_div(previous_selection) {
    //去玩家背包系统获取所有物品，遍历找到属于"任意调味品"的所有物品
    let P_backpack = player.get_player_backpack();
    let backpack_items = P_backpack.get_BP_all_item();
    //找到添加调料区
    let FD_S_value_div = document.getElementById('COK_CD_FD_S_value_div');
    //当前批量制造份数m：加号上限要用它(保证 每份剂量×批量份数 不超过拥有量)；行文本只表示单份剂量，不用它
    let quantity_num = parseInt(get_now_quantity_num('COK_CD'));
    if (is_Empty_Object(quantity_num) || quantity_num <= 0) {
        //批量份数异常(理论上不会出现)，按1份处理，避免后面的除法出错
        console.log('烹饪获取批量制造数量异常');
        quantity_num = 1;
    }

    //把上次的选择整理成 id -> 每份剂量n 的表，便于还原
    let previous_map = new Object();
    if (!is_Empty_Object(previous_selection)) {
        for (let previous of previous_selection) {
            if (is_Empty_Object(previous_map[previous.id])) {
                previous_map[previous.id] = 0;
            }
            previous_map[previous.id] += parseInt(previous.num);
        }
    }

    //已经建过行的调料id：同一个调料id在背包里可能有多个key(复合key)，只展示一行
    let built_item_id = new Object();

    for (let item_key in backpack_items) {
        let item_id = backpack_items[item_key].id;
        //判断这个物品是否属于"任意调味品"
        if (is_Empty_Object(items[item_id])) {
            continue;
        }
        let is_seasoning = false;
        let item_secon_type = items[item_id].secon_type;
        for (let seasoning_type of enums['all_seasoning']) {
            if (item_secon_type.includes(seasoning_type)) {
                is_seasoning = true;
                break;
            }
        }
        if (!is_seasoning) {
            continue;
        }
        //同一个调料id可能有多个背包key，只建一行，避免重复展示
        if (built_item_id[item_id] != undefined) {
            console.log('调料%s在背包中有多个key，只展示一行', item_id);
            continue;
        }
        built_item_id[item_id] = true;

        //物品在玩家背包中的数量，以及名称
        let item_num = P_backpack.get_BP_Item_id_num(item_id);
        //拥有量为0的调料不展示(背包里数量归零的key不会被删除，所以需要显式跳过)
        if (item_num <= 0) {
            continue;
        }
        let item_name = texts[item_id].item_name;
        //每份剂量的上限：保证 总量(剂量n × 批量份数m) 不超过拥有量
        let max_use_num = Math.floor(item_num / quantity_num);

        //尽量还原上次的选择；若拥有量不足，则夹紧到上限（静默夹紧）
        let use_num = 0;
        if (previous_map[item_id] != undefined) {
            use_num = Math.min(previous_map[item_id], max_use_num);
        }

        //生成这个调料的子元素：文本 + 减号/加号两个按钮（左减右加）
        let Seasoning_div = addElement(FD_S_value_div, 'div', null, 'Seasoning_div');
        let Seasoning_text = addElement(Seasoning_div, 'div', null, 'Seasoning_text');
        Seasoning_text.innerHTML = get_seasoning_text(item_name, use_num);
        //保存这个调料的物品id和已选数量（已选数量表示"一份菜品上加几个"，即每份剂量n）
        set_dataset_value(Seasoning_div, 'item_id', item_id);
        set_dataset_value(Seasoning_div, 'use_num', use_num);
        //减号按钮（左）
        let Seasoning_minus_button = addElement_botton(Seasoning_div, null, 'Seasoning_minus_button', '', '-');
        //加号按钮（右）
        let Seasoning_add_button = addElement_botton(Seasoning_div, null, 'Seasoning_add_button', '', '+');

        //减号按钮：点击后已选数量减1，最小不低于0
        Seasoning_minus_button.addEventListener('click', function () {
            let now_use_num = parseInt(get_dataset_value(Seasoning_div, 'use_num'));
            let next_use_num = now_use_num - 1;
            if (next_use_num < 0) {
                next_use_num = 0;
            }
            set_dataset_value(Seasoning_div, 'use_num', next_use_num);
            Seasoning_text.innerHTML = get_seasoning_text(item_name, next_use_num);
            updata_COK_seasoning_button_mask(Seasoning_minus_button, Seasoning_add_button, next_use_num, max_use_num);
            updata_now_make_button_mask();
        });
        //加号按钮：点击后已选数量加1，最大不超过"每份剂量的上限"
        Seasoning_add_button.addEventListener('click', function () {
            let now_use_num = parseInt(get_dataset_value(Seasoning_div, 'use_num'));
            let next_use_num = now_use_num + 1;
            if (next_use_num > max_use_num) {
                next_use_num = max_use_num;
            }
            set_dataset_value(Seasoning_div, 'use_num', next_use_num);
            Seasoning_text.innerHTML = get_seasoning_text(item_name, next_use_num);
            updata_COK_seasoning_button_mask(Seasoning_minus_button, Seasoning_add_button, next_use_num, max_use_num);
            updata_now_make_button_mask();
        });
        //初始化两个按钮的遮罩
        updata_COK_seasoning_button_mask(Seasoning_minus_button, Seasoning_add_button, use_num, max_use_num);
    }
}
//根据当前已选数量调整调料区加号/减号按钮的遮罩
//已选数量(每份剂量n)等于0时减号按钮覆盖遮罩，等于每份剂量上限(floor(拥有量/批量份数))时加号按钮覆盖遮罩
function updata_COK_seasoning_button_mask(Seasoning_minus_button, Seasoning_add_button, use_num, max_use_num) {
    //减号按钮
    if (use_num > 0) {
        Seasoning_minus_button.disabled = false;
        Seasoning_minus_button.style.cursor = 'pointer';
    } else {
        Seasoning_minus_button.disabled = true;
        Seasoning_minus_button.style.cursor = 'not-allowed';
    }
    //加号按钮
    if (use_num < max_use_num) {
        Seasoning_add_button.disabled = false;
        Seasoning_add_button.style.cursor = 'pointer';
    } else {
        Seasoning_add_button.disabled = true;
        Seasoning_add_button.style.cursor = 'not-allowed';
    }
}
//调料所选数量变化会影响“当前配方能否制造”(调料可能不足)，只刷新制造按钮的遮罩
function updata_now_make_button_mask() {
    let live_plan_manage = global.get_live_plan_manage();
    let cooking_manage = live_plan_manage.get_LP_live_skill_manage('cooking_manage');
    cooking_manage.updata_now_make_button();
}
//获取当前设置的调料情况，返回一个队列，保存调料id和数量
function get_COK_CD_seasoning() {
    let seasoning_arr = new Array(); //调料id和数量
    let FD_S_value_div = document.getElementById('COK_CD_FD_S_value_div');
    for (let child of FD_S_value_div.children) {
        let item_id = get_dataset_value(child, 'item_id');
        //没有item_id的行是界面构建时的占位样例，不是真实调料，跳过(否则会读出一份无效记录)
        if (is_Empty_Object(item_id)) {
            continue;
        }
        let use_num = parseInt(get_dataset_value(child, 'use_num'));
        //只返回已选的调料（数量大于0）
        if (use_num <= 0) {
            continue;
        }
        let seasoning_obj = new Object();
        seasoning_obj.id = item_id;
        seasoning_obj.num = use_num;
        seasoning_arr.push(seasoning_obj);
    }
    return seasoning_arr;
}
//调料小类没有配置基础时长时的兜底时长（秒），避免配平时除零
const seasoning_time_default = 10;
//只折算"单份"调味 ex_data(描述单份剂量n的加成 + 调料小类次数)，不做库存校验、不读背包数量
//返回 null：当前未选任何调味料(或当前界面没有调料区)
function get_COK_CD_seasoning_ex_data() {
    let COK_min = get_COK_min_name();
    //当前不是菜品烹饪界面时，视为未调味
    if (COK_min != 'COK_CD') {
        return null;
    }
    //所选调味料 [{id, num:n}]，n 为单份剂量
    let seasoning_arr = get_COK_CD_seasoning();
    return get_seasoning_ex_data_by_arr(seasoning_arr);
}
//按所选调料折算单份调味 ex_data（纯函数：不读界面、不读背包，便于单独验证）
//seasoning_arr：[{id, num:n}]，n 为单份剂量
//
//这里是「调味配平」的落点：整道菜的调料buff只能有一个时长，所以把各调料的效果按总量守恒重分布到那个时长上
//  小类份数 m_c = 该小类所有调料份数之和
//  小类时长 T_c = 小类基础时长 × m_c
//  最终时长 T   = max(T_c)
//  某调料单独使用时的总量 Q = 每秒数值 × 小类基础时长 × 份数
//  配平后每秒数值 v' = Q / T
//性质一：同一种调料放 n 份时 v' ≡ v（每秒数值不变、时间翻倍），即 idea5 的"重复调味品只加时间不堆叠效果"
//性质二：T ≥ T_c 恒成立，故 v' ≤ v —— 配平只稀释、不放大
function get_seasoning_ex_data_by_arr(seasoning_arr) {
    if (is_Empty_Object(seasoning_arr) || seasoning_arr.length == 0) {
        return null; //未选调味料，产出白板
    }

    //第一遍：累计每种调料的份数，以及每个"调料小类"的份数
    let seasoning_num_map = new Object(); //调料id -> 份数
    let seasoning_count = new Object(); //调料小类 -> 份数
    for (let seasoning of seasoning_arr) {
        let id = seasoning.id;
        let n = parseInt(seasoning.num);
        if (is_Empty_Object(items[id]) || n <= 0) {
            continue;
        }
        if (is_Empty_Object(seasoning_num_map[id])) {
            seasoning_num_map[id] = 0;
        }
        seasoning_num_map[id] += n;
        for (let seasoning_type of enums['all_seasoning']) {
            if (items[id].secon_type.includes(seasoning_type)) {
                if (is_Empty_Object(seasoning_count[seasoning_type])) {
                    seasoning_count[seasoning_type] = 0;
                }
                seasoning_count[seasoning_type] += n;
            }
        }
    }

    //配平后的时长 T
    let base_time_map = enums['seasoning_base_time'];
    let seasoning_time = 0;
    for (let seasoning_type in seasoning_count) {
        let base_time = to_num(base_time_map[seasoning_type]);
        let type_time = base_time * seasoning_count[seasoning_type];
        if (type_time > seasoning_time) {
            seasoning_time = type_time;
        }
    }
    if (seasoning_time <= 0) {
        console.log('调味配平：所选调料的小类都没有配置基础时长，暂按%s秒计算', seasoning_time_default);
        seasoning_time = seasoning_time_default;
    }

    //第二遍：折算每条效果行
    let bonus_map = new Object(); //单份总加成(key -> 效果行)，用于同目标相加归并
    for (let id in seasoning_num_map) {
        let n = seasoning_num_map[id];
        //该调料所属小类的基础时长
        let base_time = 0;
        for (let seasoning_type of enums['all_seasoning']) {
            if (items[id].secon_type.includes(seasoning_type)) {
                base_time = to_num(base_time_map[seasoning_type]);
                break;
            }
        }
        let season_effect = items[id].season_effect;
        if (is_Empty_Object(season_effect)) {
            continue;
        }
        for (let effect of season_effect) {
            let attr_type = effect.attr_type;
            let attr_id = effect.attr_id;
            if (attr_type == 'get_attr') {
                //即时效果：按剂量线性折算，同目标相加归并
                let key = attr_type + '_' + attr_id;
                if (is_Empty_Object(bonus_map[key])) {
                    let row = new Object();
                    row.attr_type = attr_type;
                    row.use_ratio = effect.use_ratio;
                    row.attr_id = attr_id;
                    row.attr_value = 0;
                    bonus_map[key] = row;
                }
                bonus_map[key].attr_value += to_num(effect.attr_value) * n;
            } else if (attr_type == 'get_buff') {
                //限时效果：按配平后的时长重分布（总量守恒），同目标相加归并
                let key = attr_type + '_' + attr_id + '_' + effect.buff_id;
                if (is_Empty_Object(bonus_map[key])) {
                    let row = new Object();
                    row.attr_type = attr_type;
                    row.use_ratio = effect.use_ratio;
                    row.attr_id = attr_id;
                    row.buff_id = effect.buff_id;
                    row.buff_value = 0;
                    row.buff_time = seasoning_time; //时长由配平决定，随效果行带入实例
                    bonus_map[key] = row;
                }
                let total = to_num(effect.buff_value) * base_time * n; //这一份单独使用时的总量
                let value = Math.round((total / seasoning_time) * 100) / 100; //量化到两位小数
                bonus_map[key].buff_value = Math.round((bonus_map[key].buff_value + value) * 100) / 100;
            } else {
                //其他效果类型暂不做折算，先原样带入(语义待确定)
                let key = attr_type + '_' + attr_id;
                if (is_Empty_Object(bonus_map[key])) {
                    let row = new Object();
                    for (let field in effect) {
                        row[field] = effect[field];
                    }
                    bonus_map[key] = row;
                }
            }
        }
    }

    //组装单份 ex_data
    let ex_data = new Object();
    ex_data.seasoning = seasoning_count; //调料使用情况
    ex_data.bonus = new Array(); //所有调料加成结果
    for (let key in bonus_map) {
        ex_data.bonus.push(bonus_map[key]);
    }
    return ex_data;
}
export {
    updata_COK_CD_div, //
    updata_COK_formula_Seasoning_div,
    get_COK_CD_seasoning,
    get_COK_CD_seasoning_ex_data,
    get_seasoning_ex_data_by_arr,
};
