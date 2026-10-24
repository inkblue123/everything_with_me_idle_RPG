import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_uniqueArr } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';
import { add_SYN_formula, get_SYN_formula_switch_type, SYN_switch_type_handle } from './SYN_function.js';

//更新配方筛选的制造界面
function updata_SYN_FM_div(now_filter_type, now_filter_value) {
    //清空这个界面里的配方
    let SYN_FM_formula_value_div = document.getElementById('SYN_FM_formula_value_div');
    SYN_FM_formula_value_div.replaceChildren();

    //获取应该展示的配方过滤条件
    let SYN_FM_formula_switch_type = get_SYN_formula_switch_type('SYN_FM');
    SYN_FM_formula_switch_type.filter_type = now_filter_type;
    SYN_FM_formula_switch_type.filter_value = now_filter_value;
    //重新生成标题
    updata_SYN_FM_title(SYN_FM_formula_switch_type);

    // 获取在这个过滤条件下应该展示的配方id
    let formula_arr = SYN_switch_type_handle(SYN_FM_formula_switch_type);
    //玩家一条合成制造配方都没学会时显示占位提示，避免看到空白列表不知道是怎么回事
    //（只是被筛选条件过滤成空的情况不算，那种保持原来的空白表现）
    let P_SYN_formulas = player.get_player_skill_formulas('SYN');
    if (formula_arr.length == 0 ) {
        let empty_tip_div = addElement(SYN_FM_formula_value_div, 'div', null, 'SYN_formula_empty_tip');
        empty_tip_div.innerHTML = '未学会任何制作配方';
    }
    // 展示这些配方
    for (let formula_id of formula_arr) {
        add_SYN_formula('SYN_FM', formula_id);
    }
}

//生成指定筛选条件下的制造界面标题
function updata_SYN_FM_title(SYN_FM_formula_switch_type) {
    //'筛选了 ** 物品A 的所有配方';
    let filter_type = SYN_FM_formula_switch_type.filter_type;
    let filter_value = SYN_FM_formula_switch_type.filter_value;
    let filter_type_ch, filter_value_ch;
    //获取筛选类型的名称
    if (filter_type.slice(0, 8) == 'SYN_FL_N') {
        filter_type_ch = '需求';
    } else if (filter_type.slice(0, 8) == 'SYN_FL_P') {
        filter_type_ch = '产出';
    }
    //获取筛选内容的名称
    if (enums['Item_main_type'].includes(filter_value)) {
        //筛选内容是物品大类
        filter_value_ch = texts[filter_value].type_name;
    } else if (enums['all_secon_type'].includes(filter_value)) {
        //筛选内容是“任意**”子类合集
        filter_value_ch = texts[filter_value].type_name;
    } else if (enums['Item_secon_type'].includes(filter_value)) {
        //筛选内容是某个子类
        filter_value_ch = texts[filter_value].type_name;
    } else if (!is_Empty_Object(items[filter_value])) {
        //筛选内容是某个具体物品
        filter_value_ch = texts[filter_value].item_name;
    } else {
        console.log('%s筛选内容无法判断，无法获取名称', filter_value);
    }
    let SYN_FM_title_ch = '筛选了所有 ' + filter_type_ch + ' ' + filter_value_ch + ' 的配方';
    let SYN_FM_title_value = document.getElementById('SYN_FM_title_value');
    SYN_FM_title_value.innerHTML = SYN_FM_title_ch;
}
export { updata_SYN_FM_div, updata_SYN_FM_title };
