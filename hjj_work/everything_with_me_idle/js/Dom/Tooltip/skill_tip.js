import { addElement } from '../../Function/Dom_function.js';
import { is_Empty_Object, attr_correct_handle } from '../../Function/Function.js';

import { texts } from '../../Data/Text/Text.js';
import { enums } from '../../Data/Enum/Enum.js';
import { P_skills, B_skills } from '../../Data/Skill/Skill.js';
import { player } from '../../Player/Player.js';

import { Tooltip } from './Tooltip.js';

const TOOLTIP_WIDTH = 320;

function init_skill_tip(type, value) {
    if (type == 'active_skill') {
        //初始化装载在玩家主动技能槽里的主动技能内容
        init_active_skill_tip(value);
    } else if (type == 'show_active_skill') {
        //初始化战斗规划中，玩家拥有的主动技能的介绍内容
        init_show_active_skill_tip(value);
    }
}

//传入触发展示的玩家主动技能槽数，从玩家类身上获取该槽上的技能，展示这个主动技能的详细信息
function init_active_skill_tip(show_slot_num) {
    let P_Askill = player.get_player_ASkill_Manage();
    let id = P_Askill.active_slots[show_slot_num].id; //要展示的技能的id
    let slot_num = P_Askill.active_slots[show_slot_num].slot_num; //触发本次展示的，是要展示技能的第几个槽
    if (is_Empty_Object(P_skills[id])) {
        //技能库没有相关内容，简单展示信息
        let name = addElement(Tooltip, 'div', null, 'lable_down');
        name.innerHTML = '未定义技能';
        let desc = addElement(Tooltip, 'div', null, 'lable_down');
        desc.innerHTML = '技能id为 : ' + id;
        return false;
    }
    //创造主动技能展示的布局
    Tooltip.style.width = `${P_skills[id].need_slot_num * TOOLTIP_WIDTH}px`;
    let name_lable = addElement(Tooltip, 'div', null, 'lable_down');
    name_lable.innerHTML = P_skills[id].name; //技能名
    let slot_div = addElement(Tooltip, 'div', null, 'slot_div');
    for (let i = 0; i < P_skills[id].need_slot_num; i++) {
        let slot_value_div = addElement(slot_div, 'div', null, 'slot_value_div');

        let i_slot_num = show_slot_num - slot_num + i; //从要展示的技能的第一个槽开始
        let active_skill = P_Askill.active_slots[i_slot_num]; //获取对应槽中的主动技能信息
        let desc = addElement(slot_value_div, 'div', null, 'lable_down');
        desc.innerHTML = B_skills[active_skill.id].desc; //这个槽的技能描述
        // desc.innerHTML = active_skill.desc; //这个槽的技能描述
        //追加展示技能类型-伤害类型信息
        //不同类型的技能似乎展示效果不好，有待优化
        show_active_skill_type(slot_value_div, active_skill);
        //追加展示技能的限制条件
        show_active_skill_condition(slot_value_div, active_skill);
        //追加展示技能的属性补正
        show_active_skill_attr_correct(slot_value_div, active_skill);

        //对多槽技能，非当前展示的槽的展示内容上覆盖一层半透明颜色
        if (i != slot_num) {
            addElement(slot_value_div, 'div', null, 'cover');
        }
    }
}
//传入玩家拥有的一个主动技能，展示它的详情信息
function init_show_active_skill_tip(skill_id) {
    let P_All_Skills = player.get_player_All_Skills();
    if (is_Empty_Object(P_skills[skill_id])) {
        //技能库没有相关内容，简单展示信息
        let name = addElement(Tooltip, 'div', null, 'lable_down');
        name.innerHTML = '未定义技能';
        let desc = addElement(Tooltip, 'div', null, 'lable_down');
        desc.innerHTML = '技能id为 : ' + skill_id;
        return false;
    }
    //创造主动技能展示的布局
    Tooltip.style.width = `${P_skills[skill_id].need_slot_num * TOOLTIP_WIDTH}px`;
    let name_lable = addElement(Tooltip, 'div', null, 'lable_down');
    name_lable.innerHTML = P_skills[skill_id].name; //技能名
    let slot_div = addElement(Tooltip, 'div', null, 'slot_div');
    for (let i = 0; i < P_skills[skill_id].need_slot_num; i++) {
        let slot_value_div = addElement(slot_div, 'div', null, 'slot_value_div');

        let active_skill = P_All_Skills[skill_id].active_slots[i]; //获取对应槽中的主动技能信息
        let desc = addElement(slot_value_div, 'div', null, 'lable_down');
        desc.innerHTML = B_skills[active_skill.id].desc; //这个槽的技能描述

        // desc.innerHTML = active_skill.desc; //这个槽的技能描述
        //追加展示技能类型-伤害类型信息
        //不同类型的技能似乎展示效果不好，有待优化
        show_active_skill_type(slot_value_div, active_skill);
        //追加展示技能的限制条件
        show_active_skill_condition(slot_value_div, active_skill);
        //追加展示技能的属性补正
        show_active_skill_attr_correct(slot_value_div, active_skill);
    }
}

//展示技能的类型
function show_active_skill_type(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;
    let type_div = addElement(slot_value_div, 'div', null, 'page_columns_11');
    let active_type_div = addElement(type_div, 'div', null, 'lable_end');
    let T_value = addElement(type_div, 'div', null, 'lable_end');
    let active_type = active_skill.active_type;
    active_type_div.innerHTML = texts[active_type].active_type_name; //这个槽的技能类型

    return true;
}
//展示技能的限制条件
function show_active_skill_condition(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;

    let condition_name_div = addElement(slot_value_div, 'div', null, 'lable_down');
    if (is_Empty_Object(active_skill.active_condition)) {
        //没有设定限制条件，默认为允许执行
        condition_name_div.innerHTML = '限制条件：无';
    } else {
        // condition_name_div.innerHTML = '限制条件';
        let condition_value_div = addElement(slot_value_div, 'div', null, 'page_columns_11');
        for (let condition_key in active_skill.active_condition) {
            let C_value_div = addElement(condition_value_div, 'div', null, 'condition_value_div');
            let C_flag_div = addElement(C_value_div, 'div', null, 'condition_flag_div');
            let C_desc_div = addElement(C_value_div, 'div', null, 'condition_desc_div');

            if (condition_key == 'weapon_type') {
                //武器类型限制
                C_desc_div.innerHTML = '装备了';
                let AC_WT = active_skill.active_condition.weapon_type;
                if (is_Empty_Object(AC_WT)) {
                    C_desc_div.innerHTML += '未设定';
                    console.log(`没设定${id}技能的武器类型限制条件`);
                } else {
                    // for (let w_type of AC_WT) {
                    for (let i in AC_WT) {
                        let w_type = AC_WT[i];
                        if (enums['equipment_type'].includes(w_type)) {
                            if (i == 0) {
                                C_desc_div.innerHTML += texts[w_type].type_name;
                            } else {
                                C_desc_div.innerHTML += '、' + texts[w_type].type_name;
                            }
                        } else {
                            console.log('该技能的武器类型限制条件填写错误');
                            break;
                        }
                    }
                }
            } else if (condition_key == 'damage_type') {
                let damage_type = active_skill.active_condition.damage_type;
                C_desc_div.innerHTML = '手持武器为' + texts['damage_type'].skill_desc[damage_type] + '武器';
            }
            // else if (condition_key == '') {
            //     //其他限制条件
            // }
            //该限制条件当前是否满足
            let P_Askill = player.get_player_ASkill_Manage();
            let ret = P_Askill.judge_active_condition_key(condition_key, active_skill.active_condition[condition_key]);
            if (ret) {
                C_flag_div.innerHTML = '✔';
                C_flag_div.style.color = '#00c400';
            } else {
                C_flag_div.innerHTML = '✖';
                C_flag_div.style.color = '#ff0000';
            }
        }
    }
    return true;
}
//追加展示技能的属性补正
function show_active_skill_attr_correct(slot_value_div, active_skill) {
    let id = active_skill.id;
    let slot_num = active_skill.slot_num;
    let correct_name_div = addElement(slot_value_div, 'div', null, 'lable_down');
    correct_name_div.innerHTML = '属性补正';
    let correct_value_div = addElement(slot_value_div, 'div', null, 'page_columns_111');
    for (let correct_key in active_skill.attr_correct) {
        let C_value_div = addElement(correct_value_div, 'div', null, 'table_3_value');
        //属性补正名称
        let C_name = addElement(C_value_div, 'div', null, 'TLV_left');
        if (texts[correct_key].attr_name.length > 4) {
            C_name.innerHTML = texts[correct_key].min_attr_name + '：'; //完整名称太长,选用简称
        } else {
            C_name.innerHTML = texts[correct_key].attr_name + '：';
        }
        let C_value = addElement(C_value_div, 'div', null, 'TLV_right');
        C_value.innerHTML = attr_correct_handle(active_skill.attr_correct[correct_key]);
    }
    return true;
}
export { init_skill_tip };
