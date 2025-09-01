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
    } else if (type == 'show_passive_skill') {
        //展示玩家拥有的一个被动技能的信息内容
        init_show_passive_skill_tip(value);
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
function init_show_active_skill_tip(skill_obj) {
    let skill_id = skill_obj.id;
    //技能库没有相关内容，简单展示信息
    if (is_Empty_Object(P_skills[skill_id])) {
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

    //追加展示技能等级相关
    show_skill_level(Tooltip, skill_obj);

    let slot_div = addElement(Tooltip, 'div', null, 'slot_div');
    for (let i = 0; i < P_skills[skill_id].need_slot_num; i++) {
        let slot_value_div = addElement(slot_div, 'div', null, 'slot_value_div');

        let active_skill = skill_obj.active_slots[i]; //获取对应槽中的主动技能信息
        let desc = addElement(slot_value_div, 'div', null, 'lable_down');
        desc.innerHTML = B_skills[active_skill.id].desc; //这个槽的技能描述

        //追加展示技能类型-伤害类型信息
        //不同类型的技能似乎展示效果不好，有待优化
        show_active_skill_type(slot_value_div, active_skill);
        //追加展示技能的限制条件
        show_active_skill_condition(slot_value_div, active_skill);
        //追加展示技能的属性补正
        show_active_skill_attr_correct(slot_value_div, active_skill);
    }
}

//展示主动技能其中一个槽的类型
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
//展示主动技能其中一个槽的限制条件
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
//展示主动技能其中一个槽的属性补正
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

//传入玩家拥有的一个被动技能对象，展示它的详细信息
function init_show_passive_skill_tip(skill_obj) {
    Tooltip.style.width = `${TOOLTIP_WIDTH}px`;
    //名称
    let name_lable = addElement(Tooltip, 'div', null, 'lable_down');
    name_lable.innerHTML = skill_obj.name; //技能名
    //描述
    // let desc_lable = addElement(Tooltip, 'div', null, 'lable_down');
    // desc_lable.innerHTML = skill_obj.desc; //技能描述
    //被动技能类型和等级
    show_passive_skill_type(Tooltip, skill_obj);
    //追加展示技能等级相关
    show_skill_level(Tooltip, skill_obj);
    //追加展示被动技能的常态等级加成
    show_passive_skill_rewards(Tooltip, skill_obj.rewards);
    //追加展示被动技能的关键等级节点加成
    show_passive_skill_milepost(Tooltip, skill_obj);
}
//追加展示被动技能的类型和等级
function show_passive_skill_type(div, skill_obj) {
    //类型
    let div_3 = addElement(div, 'div', null, 'page_columns_11');
    let type_div = addElement(div_3, 'div', null, 'lable_down');
    let switch_type = P_skills[skill_obj.id].switch_type;
    if (switch_type == 'super_passive') {
        type_div.innerHTML = texts[switch_type].passive_type_name;
    } else {
        let master_type;
        if (enums.basic_passive.includes(switch_type)) {
            master_type = 'basic_passive';
        } else if (enums.combat_passive.includes(switch_type)) {
            master_type = 'combat_passive';
        } else if (enums.life_passive.includes(switch_type)) {
            master_type = 'life_passive';
            // } else if (enums.super_passive.includes(switch_type)) {
            //     master_type = 'super_passive';
        }
        let ch = texts[master_type].passive_type_name + '：' + texts[switch_type].passive_type_name;
        type_div.innerHTML = ch;
    }
}
//追加展示技能的等级和经验相关内容
function show_skill_level(div, skill_obj) {
    if (skill_obj.levelup_type == 'unlevelup') {
        //不能升级的技能，也不用展示什么内容，特殊处理
        let level_div = addElement(div, 'div', null, 'lable_down');
        level_div.innerHTML = '等级：MAX';
        return;
    }
    //等级
    let level_div = addElement(div, 'div', null, 'page_columns_12');
    //等级数值
    let num_div = addElement(level_div, 'div', null, 'lable_down');
    let now_level = skill_obj.level;

    let max_level;
    for (let obj of P_skills[skill_obj.id].levelup_data) {
        max_level = obj.max_level;
    }
    P_skills[skill_obj.id].max_level;
    num_div.innerHTML = '等级：' + now_level + '/' + max_level;

    //经验或升级情况
    let exp_div = addElement(level_div, 'div', null, 'lable_end');
    if (skill_obj.levelup_type == 'exp_up') {
        //该技能的升级类型是累计经验升级，不断升级直到最高等级，展示目前经验情况
        var exp_bar = addElement(exp_div, 'div', 'exp_bar', 'progress_bar', '');
        var exp_frame = addElement(exp_bar, 'div', 'exp_frame', 'progress_bar_frame'); //进度条的外框
        var exp_current = addElement(exp_frame, 'div', 'exp_current', 'progress_bar_current'); //进度条中央，长度随当前进度数值变化的色块
        var exp_number = addElement(exp_bar, 'div', 'exp_number', 'progress_bar_number'); //进度条上显示的数字，表示当前进度具体数值
        if (skill_obj.levelmax_flag) {
            //技能满级了
            exp_bar.children[0].children[0].style.width = `100%`;
            exp_bar.children[1].innerText = `exp：MAX`;
        } else {
            let exp_radio = (skill_obj.exp / skill_obj.next_level_need_exp) * 100;
            exp_bar.children[0].children[0].style.width = `${exp_radio}%`;
            exp_bar.children[1].innerText = `exp：${Math.floor(skill_obj.exp)}/${Math.ceil(skill_obj.next_level_need_exp)}`;
        }
    } else {
        //该技能升级不靠经验，目前依靠的是达成某些事情
        //比如获得12345号技能书，多读一种就多升一级
        //比如完成5个特定挑战，每完成一个就升一级
        //这种技能就没有经验的概念，应该要展示升级相关事件的完成进度
    }
}
//追加展示被动技能的常态等级加成
function show_passive_skill_rewards(div, rewards) {
    //这个技能没有常态等级加成
    if (is_Empty_Object(rewards)) {
        return true;
    }

    if (rewards.length == 1) {
        //如果常态等级的加成只有一条属性，就直接居中显示
        let rewards_div = addElement(div, 'div', null, 'lable_down');
        let attr_id = rewards[0].attr;
        let attr_name = get_attr_name(attr_id);
        let ch;
        if (enums['need_per_cent_attr'].includes(attr_id)) {
            ch = attr_name + '：' + rewards[0].data + '%';
        } else {
            ch = attr_name + '：' + rewards[0].data;
        }
        rewards_div.innerHTML = ch;
    } else {
        //如果有多条属性，就每行两个依次往下排列
        let rewards_div = addElement(div, 'div', null, 'page_columns_11');
        for (let reward_obj of rewards) {
            let attr_div = addElement(rewards_div, 'div', null, 'table_2_value');

            let attr_id = reward_obj.attr;
            let attr_name_div = addElement(attr_div, 'div', null, 'TLV_left');
            attr_name_div.innerHTML = get_attr_name(attr_id) + '：';
            let attr_value_div = addElement(attr_div, 'div', null, 'TLV_right');
            if (enums['need_per_cent_attr'].includes(attr_id)) {
                attr_value_div.innerHTML = reward_obj.data + '%';
            } else {
                attr_value_div.innerHTML = reward_obj.data;
            }
        }
    }
}
//追加展示被动技能的关键节点加成
function show_passive_skill_milepost(div, skill_obj) {
    let skill_id = skill_obj.id;
    //这个技能没有关键节点加成
    if (is_Empty_Object(P_skills[skill_id].milepost)) {
        return true;
    }
    let milepost_div = addElement(div, 'div', null, 'lable_end');

    for (let milepost_level in P_skills[skill_id].milepost) {
        if (skill_obj.level >= milepost_level) {
            //玩家达到了的关键节点，显示对应数值
            let ch = '等级' + milepost_level + '奖励：';
            let milepost_array = P_skills[skill_id].milepost[milepost_level];
            for (let i in milepost_array) {
                let obj = milepost_array[i];
                let attr_id = obj.attr;
                let attr_name = get_attr_name(attr_id); //属性名
                let attr_data = obj.data; //属性数值
                if (i == 0) {
                    ch = ch + attr_name + '：' + attr_data;
                } else {
                    ch = ch + '，' + attr_name + '：' + attr_data;
                }
            }
            let a_milepost_div = addElement(milepost_div, 'div', null, 'lable_down');
            a_milepost_div.innerHTML = ch;
        } else {
            //玩家没达到的关键节点，用问号显示，且只显示一条
            let a_milepost_div = addElement(milepost_div, 'div', null, 'lable_down');
            let ch = '等级？？奖励：？？？';
            a_milepost_div.innerHTML = ch;
            break;
        }
    }
}
function get_attr_name(attr_id) {
    let attr_name;
    if (is_Empty_Object(texts[attr_id].attr_name)) {
        console.log('%s属性名称未定义', attr_id);
    }

    // if (texts[attr].attr_name.length > 4) {
    // attr_name = texts[attr_id].min_attr_name; //完整名称太长,选用简称
    // } else {
    attr_name = texts[attr_id].attr_name;
    // }
    return attr_name;
}

export { init_skill_tip };
