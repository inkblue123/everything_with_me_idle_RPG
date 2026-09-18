import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_uniqueArr } from '../../../../Function/Function.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';
import { add_SYN_formula, get_SYN_formula_switch_type, SYN_switch_type_handle } from './SYN_function.js';

//更新合成制造技能的制造界面的内容
function updata_SYN_MK_div() {
    //清空这个界面里的配方
    let SYN_MK_formula_value_div = document.getElementById('SYN_MK_formula_value_div');
    SYN_MK_formula_value_div.replaceChildren();
    //获取应该展示的配方过滤条件
    let SYN_MK_type = get_SYN_formula_switch_type('SYN_MK');
    //获取在这个过滤条件下应该展示的配方id
    let formula_arr = SYN_switch_type_handle(SYN_MK_type);
    //展示这些配方
    for (let formula_id of formula_arr) {
        add_SYN_formula('SYN_MK', formula_id);
    }
}

export { updata_SYN_MK_div };
