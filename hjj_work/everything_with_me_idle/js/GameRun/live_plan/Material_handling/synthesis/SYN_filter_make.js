import { addElement, addElement_radio, add_show_Tooltip, get_radio_switch_click_value } from '../../../../Function/Dom_function.js';
import { is_Empty_Object, get_item_obj, get_uniqueArr } from '../../../../Function/Function.js';
import { updata_formula_UI_placeholder } from '../../../../Function/Updata_func.js';

import { enums } from '../../../../Data/Enum/Enum.js';
import { items } from '../../../../Data/Item/Item.js';
import { texts } from '../../../../Data/Text/Text.js';
import { formulas } from '../../../../Data/Formula/Formula.js';
import { player } from '../../../../Player/Player.js';
import { global } from '../../../global_manage.js';
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
export { updata_SYN_FM_title };
