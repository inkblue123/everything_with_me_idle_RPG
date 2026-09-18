import { is_Empty_Object } from '../../Function/Function.js';
import { seconds_time_to_ch } from '../../Function/math_func.js';
import { items } from '../../Data/Item/Item.js';
import { texts } from '../../Data/Text/Text.js';
import { enums } from '../../Data/Enum/Enum.js';
import { formulas } from '../../Data/Formula/Formula.js';
import { addElement, addElement_botton } from '../../Function/Dom_function.js';

//显示一个物品的图鉴详情
function updata_IB_item_value_div(item_library_data, item_id) {
    let item = items[item_id];
    if (!item) {
        console.log('图鉴详情-物品：未找到物品%s的数据', item_id);
        return;
    }

    //物品通用数据
    show_item_general_data(item_id);

    //根据物品的大类别，追加展示额外的信息
    if (item.main_type == 'equipment') {
        show_IB_item_equipment_data(item_id); //武器装备：稀有度按钮与属性展示
    } else if (item.main_type == 'consumable') {
        show_IB_item_consumable_data(item_library_data, item_id); //消耗品：使用方法和使用效果
    }

    //物品发现次数
    let get_count = 0;
    if (!is_Empty_Object(item_library_data[item_id]) && item_library_data[item_id].get_count) {
        get_count = item_library_data[item_id].get_count; //获取该物品的发现次数
    }
    let count_div = addElement(IB_value_content_div, 'div', null, null);
    count_div.innerHTML = '发现次数：' + get_count;
}
//物品通用数据
function show_item_general_data(item_id) {
    let item_data = items[item_id];
    let IB_value_content_div = document.getElementById('IB_value_content_div');
    //标题
    let IB_value_title_text = document.getElementById('IB_value_title_text');
    IB_value_title_text.innerHTML = item_data.name;

    //物品名称
    let name_div = addElement(IB_value_content_div, 'div', null, null);
    name_div.innerHTML = '物品名称：' + item_data.name;

    //物品大类
    let main_type_div = addElement(IB_value_content_div, 'div', null, null);
    main_type_div.innerHTML = '物品大类：' + (texts[item_data.main_type].type_name || item_data.main_type);

    //物品小类（secon_type是数组）
    let secon_type_div = addElement(IB_value_content_div, 'div', null, null);
    let secon_type_names = [];
    for (let j = 0; j < item_data.secon_type.length; j++) {
        let st = item_data.secon_type[j];
        if (texts[st] && texts[st].type_name) {
            secon_type_names.push(texts[st].type_name);
        } else {
            secon_type_names.push(st);
        }
    }
    secon_type_div.innerHTML = '物品小类：' + secon_type_names.join('、');

    //物品描述
    let desc_div = addElement(IB_value_content_div, 'div', null, null);
    desc_div.innerHTML = '物品描述：' + item_data.desc;

    //物品价值
    let price_div = addElement(IB_value_content_div, 'div', null, null);
    let price_str = '';
    for (let money_type in item_data.price) {
        let money_type_name = money_type; //保存一下价值id
        if (texts[money_type] && texts[money_type].money_type_name) {
            money_type_name = texts[money_type].money_type_name; //获取物品价值名称
        }
        price_str = price_str + money_type_name + '：' + item_data.price[money_type] + ' ';
    }
    if (price_str == '') {
        price_str = '暂无';
    }
    price_div.innerHTML = '物品价值：' + price_str;
}

//显示武器装备的独特内容
function show_IB_item_equipment_data(item_id) {
    let item_data = items[item_id];
    let IB_value_content_div = document.getElementById('IB_value_content_div');

    let separate_div = addElement(IB_value_content_div, 'div', null, null);
    separate_div.innerHTML = '-----------------------';
    //获取该装备可能的稀有度列表
    let rarity_list = item_data.special ? enums['special_rarity'] : enums['no_special_rarity'];

    //稀有度选择提示
    let rarity_div = addElement(IB_value_content_div, 'div', null, null);
    rarity_div.innerHTML = '装备稀有度选择：';
    //稀有度按钮行
    let rarity_btn_div = addElement(IB_value_content_div, 'div', null, 'page_flex');
    //属性展示区
    let IB_item_attr_show_div = addElement(IB_value_content_div, 'div', 'IB_item_attr_show_div', null);

    //生成稀有度按钮
    for (let rarity of rarity_list) {
        let rarity_name = rarity;
        if (texts[rarity] && texts[rarity].rarity_name) {
            rarity_name = texts[rarity].rarity_name;
        }
        let btn = addElement_botton(rarity_btn_div, null, 'IB_rarity_button');
        btn.innerHTML = rarity_name;
        //按稀有度颜色设置按钮文字颜色
        if (enums[rarity] && enums[rarity].rarity_color) {
            btn.style.color = enums[rarity].rarity_color;
        }
        //点击切换属性显示
        btn.onclick = function () {
            update_IB_item_attr_show(rarity, item_id);
        };
    }
    //默认显示普通稀有度的属性
    update_IB_item_attr_show('ordinary', item_id);

    separate_div = addElement(IB_value_content_div, 'div', null, null);
    separate_div.innerHTML = '-----------------------';
}
//显示消耗品的独特内容
function show_IB_item_consumable_data(item_library_data, item_id) {
    let item_data = items[item_id];
    let library_data = item_library_data[item_id];
    let IB_value_content_div = document.getElementById('IB_value_content_div');

    let separate_div = addElement(IB_value_content_div, 'div', null, null);
    separate_div.innerHTML = '-----------------------';

    //消耗品使用方式
    let C_use_div = addElement(IB_value_content_div, 'div', null, '');
    let use_type = item_data.use_type;
    if (texts[use_type] && texts[use_type].type_name) {
        C_use_div.innerHTML = '使用方式：' + texts[use_type].type_name;
    } else {
        C_use_div.innerHTML = '使用方式：' + use_type;
    }

    //持续使用型额外展示使用进度
    if (use_type == 'sustain_use' || use_type == 'condition_sustain_use') {
        let max_use_ratio_div = addElement(IB_value_content_div, 'div', null, null);
        if (is_Empty_Object(library_data.max_use_ratio)) {
            max_use_ratio_div.innerHTML = '历史最大使用进度：0%';
        } else {
            max_use_ratio_div.innerHTML = '历史最大使用进度：' + library_data.max_use_ratio + '%';
            if (library_data.max_use_ratio >= 100) {
                max_use_ratio_div.style.color = '#00c400';
            }
        }

        //持续使用的消耗要求
        let sustain_use_data_text = addElement(IB_value_content_div, 'div', null, null);
        sustain_use_data_text.innerHTML = '使用需要消耗：';
        for (let use_data_obj of item_data.sustain_use_data) {
            let id = use_data_obj.id;
            let value = use_data_obj.value;
            if (id == 'time') {
                let sustain_use_data_div = addElement(IB_value_content_div, 'div', null, null);
                let need_time_ch = seconds_time_to_ch(value); //将秒时间转换成易读的字符串
                sustain_use_data_div.innerHTML = '时间：' + need_time_ch;
            } else {
                //消耗生命魔力精力
            }
        }
    }

    let use_attr_text = addElement(IB_value_content_div, 'div', null, null);
    use_attr_text.innerHTML = '使用效果：';
    //使用效果展示
    let use_attr = item_data.use_attr;
    if (use_type == 'sustain_use' || use_type == 'condition_sustain_use') {
        //持续使用型：每行2列表格，展示解锁的内容
        let show_flag = false;
        let use_attr_div = addElement(IB_value_content_div, 'div', null, 'page_table_11');
        for (let attr_obj of use_attr) {
            if (is_Empty_Object(library_data.max_use_ratio) || attr_obj.use_ratio > library_data.max_use_ratio) {
                //历史使用进度未达标，不展示属性
                show_flag = true;
                continue;
            }
            let TLV_div = addElement(use_attr_div, 'div', null, 'table_value');
            if (attr_obj.attr_type == 'get_formula') {
                //获得配方效果，整行展示
                let product_name = '未知';
                if (formulas && formulas[attr_obj.attr_id]) {
                    let product_id = formulas[attr_obj.attr_id].product.id;
                    if (!is_Empty_Object(enums['all_work_bench'][product_id])) {
                        let level = formulas[attr_obj.attr_id].product.next_level;
                        product_name = level + '级' + texts[product_id].work_bench_name + '的配方';
                    } else if (!is_Empty_Object(items[product_id])) {
                        product_name = items[product_id].name + '的制作配方';
                    }
                }
                TLV_div.innerHTML = attr_obj.use_ratio + '%：学会' + product_name;
            }
        }
        if (show_flag) {
            let TLV_div = addElement(use_attr_div, 'div', null, 'table_value');
            TLV_div.innerHTML = '未知配方？？？';
        }
    } else {
        //一次性等使用型：每行3列表格，展示使用后获得的属性
        let use_attr_div = addElement(IB_value_content_div, 'div', null, 'page_table_111');
        for (let attr_obj of use_attr) {
            if (attr_obj.attr_type == 'get_attr') {
                //直接获得属性效果
                let TLV_div = addElement(use_attr_div, 'div', null, 'table_value');
                let T_name = addElement(TLV_div, 'div', null, 'TLV_left');
                if (texts[attr_obj.attr_id] && texts[attr_obj.attr_id].attr_name) {
                    T_name.innerHTML = texts[attr_obj.attr_id].attr_name;
                } else {
                    T_name.innerHTML = attr_obj.attr_id;
                }
                let T_value = addElement(TLV_div, 'div', null, 'TLV_right');
                let sign = attr_obj.attr_value > 0 ? '+' : '-';
                let ch_value = Math.abs(attr_obj.attr_value);
                let suffix = '';
                if (enums['need_per_cent_attr'] && enums['need_per_cent_attr'].includes(attr_obj.attr_id)) {
                    suffix = '%';
                } else if (enums['need_second_attr'] && enums['need_second_attr'].includes(attr_obj.attr_id)) {
                    suffix = '秒';
                }
                T_value.innerHTML = sign + ch_value + suffix;
            }
        }
    }

    separate_div = addElement(IB_value_content_div, 'div', null, null);
    separate_div.innerHTML = '-----------------------';
}

//更新属性展示区内容的函数
function update_IB_item_attr_show(rarity, item_id) {
    //读取物品数据库
    let item = items[item_id];
    //清空属性展示区
    let IB_item_attr_show_div = document.getElementById('IB_item_attr_show_div');
    IB_item_attr_show_div.replaceChildren();
    if (rarity == 'damaged') {
        IB_item_attr_show_div.innerHTML = '破损武器没有属性，不能装备';
        return;
    }

    let normal_attr_div = addElement(IB_item_attr_show_div, 'div', null, 'page_table_111');

    let equip_attr = item.equip_attr[rarity];
    if (!equip_attr) {
        return;
    }
    let no_normal_attr_ch = '';
    let no_normal_flag = false;
    for (let attr in equip_attr) {
        let attr_value = equip_attr[attr];
        if (attr_value == 0) {
            //0数值的属性不展示
            continue;
        }
        if (enums['normal_attr'] && enums['normal_attr'].includes(attr)) {
            //常规属性，用表格行展示
            let TLV_div = addElement(normal_attr_div, 'div', null, 'table_value');
            //属性名称
            let T_name = addElement(TLV_div, 'div', null, 'TLV_left');
            if (texts[attr] && texts[attr].attr_name) {
                if (texts[attr].attr_name.length > 3) {
                    //名称太长，有简称就用简称
                    if (is_Empty_Object(texts[attr].min_attr_name)) {
                        T_name.innerHTML = texts[attr].attr_name;
                    } else {
                        T_name.innerHTML = texts[attr].min_attr_name;
                    }
                } else {
                    T_name.innerHTML = texts[attr].attr_name;
                }
            } else {
                T_name.innerHTML = attr;
            }
            //属性数值
            let T_value = addElement(TLV_div, 'div', null, 'TLV_right');
            let sign = attr_value > 0 ? '+' : '-';
            let ch_value = Math.round((Math.abs(attr_value) + Number.EPSILON) * 100) / 100;
            let suffix = '';
            if (enums['need_per_cent_attr'] && enums['need_per_cent_attr'].includes(attr)) {
                suffix = '%';
            } else if (enums['need_second_attr'] && enums['need_second_attr'].includes(attr)) {
                suffix = '秒';
            }
            T_value.innerHTML = sign + ch_value + suffix;
        } else {
            //特殊属性，集中到一个文本框显示
            if (is_Empty_Object(texts[attr])) {
                console.log('装备属性%s没有定义属性名称', attr);
                continue;
            }
            let attr_ch = texts[attr].attr_name + '：';
            if (attr_value > 0) {
                attr_ch += '+' + attr_value;
            } else {
                attr_ch += attr_value;
            }
            if (enums['need_per_cent_attr'] && enums['need_per_cent_attr'].includes(attr)) {
                attr_ch += '%';
            } else if (enums['need_second_attr'] && enums['need_second_attr'].includes(attr)) {
                attr_ch += '秒';
            }
            if (no_normal_flag) {
                no_normal_attr_ch += '<br>' + attr_ch;
            } else {
                no_normal_attr_ch += attr_ch;
            }
            no_normal_flag = true;
        }
    }
    //使用单独的div展示非常规属性
    if (no_normal_flag) {
        let no_normal_div = addElement(IB_item_attr_show_div, 'div', null, 'lable_down');
        no_normal_div.innerHTML = no_normal_attr_ch;
    }
}

export { updata_IB_item_value_div };
