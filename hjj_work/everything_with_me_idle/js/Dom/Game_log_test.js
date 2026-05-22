import { crtElement, addElement, addElement_radio, addElement_select } from '../Function/Dom_function.js';
import { updata_formula_UI_placeholder } from '../Function/Updata_func.js';
import { is_Empty_Object } from '../Function/Function.js';
import { save_game, save_game_show_object_tip } from '../LoadAndSave/load.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { items } from '../Data/Item/Item.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';
import { get_item_id_key } from '../Function/Function.js';

//生成测试部分界面
function make_test_div(TS_div) {
    // 左侧的分类下拉表格界面
    {
        var TS_scroll_box = addElement(TS_div, 'div', 'TS_scroll_box', 'overflow_y_div');
        var TS_switch_div = addElement(TS_scroll_box, 'div', 'TS_switch_div', 'in_overflow_div');
        //测试分类按钮
        var test1_radio_div = addElement(TS_switch_div, 'div', 'test1_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(test1_radio_div, 'TS_button_1', 'TS_switch', 'TS_button_1', '测试1');
        test1_radio_div.children[0].checked = true; //初始激活该按钮
        var test2_radio_div = addElement(TS_switch_div, 'div', 'test2_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(test2_radio_div, 'TS_button_2', 'TS_switch', 'TS_button_2', '测试2');
    }
    //右侧具体的内容
    {
        //测试1
        {
            var TS_value1_scroll_box = addElement(TS_div, 'div', 'TS_value1_scroll_box', 'overflow_y_div', '');
            var TS_value1_div = addElement(TS_value1_scroll_box, 'div', 'TS_value1_div', 'in_overflow_div');
            //测试-完成3天的新手教学
            var TS1_FinishNewPlayerTeach123_div = addElement(TS_value1_div, 'div', 'TS1_FinishNewPlayerTeach123_div', 'OP_TLV_div');
            var TS1_FinishNewPlayerTeach123_lable = addElement(TS1_FinishNewPlayerTeach123_div, 'div', 'TS1_FinishNewPlayerTeach123_lable', 'OP_T2_div');
            TS1_FinishNewPlayerTeach123_lable.innerHTML = '完成3天的新手教学';
            var TS1_FinishNewPlayerTeach123_value = addElement(TS1_FinishNewPlayerTeach123_div, 'div', 'TS1_FinishNewPlayerTeach123_value', 'OP_V_div');
            var TS1_FinishNewPlayerTeach123_button = addElement(TS1_FinishNewPlayerTeach123_value, 'button', 'TS1_FinishNewPlayerTeach123_button', 'OP_button');
            TS1_FinishNewPlayerTeach123_button.innerHTML = '完成3天的新手教学';
            //测试-完成当前挑战
            var TS1_FinishNowChallenge_div = addElement(TS_value1_div, 'div', 'TS1_FinishNowChallenge_div', 'OP_TLV_div');
            var TS1_FinishNowChallenge_lable = addElement(TS1_FinishNowChallenge_div, 'div', 'TS1_FinishNowChallenge_lable', 'OP_T2_div');
            TS1_FinishNowChallenge_lable.innerHTML = '完成当前挑战';
            var TS1_FinishNowChallenge_value = addElement(TS1_FinishNowChallenge_div, 'div', 'TS1_FinishNowChallenge_value', 'OP_V_div');
            var TS1_FinishNowChallenge_button = addElement(TS1_FinishNowChallenge_value, 'button', 'TS1_FinishNowChallenge_button', 'OP_button');
            TS1_FinishNowChallenge_button.innerHTML = '完成当前挑战';
            //测试-逐渐解锁生活技能
            var TS1_UnlockLivePlanSkill_div = addElement(TS_value1_div, 'div', 'TS1_UnlockLivePlanSkill_div', 'OP_TLV_div');
            var TS1_UnlockLivePlanSkill_lable = addElement(TS1_UnlockLivePlanSkill_div, 'div', 'TS1_UnlockLivePlanSkill_lable', 'OP_T2_div');
            TS1_UnlockLivePlanSkill_lable.innerHTML = '逐渐解锁生活技能';
            var TS1_UnlockLivePlanSkill_value = addElement(TS1_UnlockLivePlanSkill_div, 'div', 'TS1_UnlockLivePlanSkill_value', 'OP_V_div');
            var TS1_UnlockLivePlanSkill_button = addElement(TS1_UnlockLivePlanSkill_value, 'button', 'TS1_UnlockLivePlanSkill_button', 'OP_button');
            TS1_UnlockLivePlanSkill_button.innerHTML = '逐渐解锁生活技能';
            //测试-暂停游戏
            var TS1_StopGameSpeed_div = addElement(TS_value1_div, 'div', 'TS1_StopGameSpeed_div', 'OP_TLV_div');
            var TS1_StopGameSpeed_lable = addElement(TS1_StopGameSpeed_div, 'div', 'TS1_StopGameSpeed_lable', 'OP_T2_div');
            TS1_StopGameSpeed_lable.innerHTML = '暂停游戏';
            var TS1_StopGameSpeed_value = addElement(TS1_StopGameSpeed_div, 'div', 'TS1_StopGameSpeed_value', 'OP_V_div');
            var TS1_StopGameSpeed_button = addElement(TS1_StopGameSpeed_value, 'button', 'TS1_StopGameSpeed_button', 'OP_button');
            TS1_StopGameSpeed_button.innerHTML = '暂停游戏';
            var TS1_StartGameSpeed_button = addElement(TS1_StopGameSpeed_value, 'button', 'TS1_StartGameSpeed_button', 'OP_button');
            TS1_StartGameSpeed_button.innerHTML = '恢复游戏';
            //测试-游戏速度
            var TS1_ChangeGameSpeed_div = addElement(TS_value1_div, 'div', 'TS1_ChangeGameSpeed_div', 'OP_TLV_div');
            var TS1_ChangeGameSpeed_lable = addElement(TS1_ChangeGameSpeed_div, 'div', 'TS1_ChangeGameSpeed_lable', 'OP_T3_div');
            TS1_ChangeGameSpeed_lable.innerHTML = '游戏速度';
            var TS1_ChangeGameSpeed_value = addElement(TS1_ChangeGameSpeed_div, 'div', 'TS1_ChangeGameSpeed_value', 'OP_V_div');
            var TS1_GameSpeedX1_button = addElement(TS1_ChangeGameSpeed_value, 'button', 'TS1_GameSpeedX1_button', 'OP_button');
            TS1_GameSpeedX1_button.innerHTML = '1倍速';
            var TS1_GameSpeedX2_button = addElement(TS1_ChangeGameSpeed_value, 'button', 'TS1_GameSpeedX2_button', 'OP_button');
            TS1_GameSpeedX2_button.innerHTML = '2倍速';
            var TS1_GameSpeedX5_button = addElement(TS1_ChangeGameSpeed_value, 'button', 'TS1_GameSpeedX5_button', 'OP_button');
            TS1_GameSpeedX5_button.innerHTML = '5倍速';
            //测试-红绿蓝设0
            var TS1_HPMPENPSet0_div = addElement(TS_value1_div, 'div', 'TS1_HPMPENPSet0_div', 'OP_TLV_div');
            var TS1_HPMPENPSet0_lable = addElement(TS1_HPMPENPSet0_div, 'div', 'TS1_HPMPENPSet0_lable', 'OP_T3_div');
            TS1_HPMPENPSet0_lable.innerHTML = '红绿蓝设0';
            var TS1_HPMPENPSet0_value = addElement(TS1_HPMPENPSet0_div, 'div', 'TS1_HPMPENPSet0_value', 'OP_V_div');
            var TS1_HPSet0_button = addElement(TS1_HPMPENPSet0_value, 'button', 'TS1_HPSet0_button', 'OP_button');
            TS1_HPSet0_button.innerHTML = '血量设0';
            var TS1_MPSet0_button = addElement(TS1_HPMPENPSet0_value, 'button', 'TS1_MPSet0_button', 'OP_button');
            TS1_MPSet0_button.innerHTML = '魔力设0';
            var TS1_ENPSet0_button = addElement(TS1_HPMPENPSet0_value, 'button', 'TS1_ENPSet0_button', 'OP_button');
            TS1_ENPSet0_button.innerHTML = '精力设0';
            //测试-批量物品测试
            var TS1_GivePlayerItems_div = addElement(TS_value1_div, 'div', 'TS1_GivePlayerItems_div', 'OP_TLV_div');
            var TS1_GivePlayerItems_lable = addElement(TS1_GivePlayerItems_div, 'div', 'TS1_GivePlayerItems_lable', 'OP_T2_div');
            TS1_GivePlayerItems_lable.innerHTML = '物品测试';
            var TS1_GivePlayerItems_value = addElement(TS1_GivePlayerItems_div, 'div', 'TS1_GivePlayerItems_value', 'OP_V_div');
            var TS1_GivePlayerItems_button = addElement(TS1_GivePlayerItems_value, 'button', 'TS1_GivePlayerItems_button', 'OP_button');
            TS1_GivePlayerItems_button.innerHTML = '部分物品测试';
            var TS1_GivePlayerAllItems_button = addElement(TS1_GivePlayerItems_value, 'button', 'TS1_GivePlayerAllItems_button', 'OP_button');
            TS1_GivePlayerAllItems_button.innerHTML = '全部物品测试';
            //测试-解锁全部技能
            var TS1_GivePlayerAllSkill_div = addElement(TS_value1_div, 'div', 'TS1_GivePlayerAllSkill_div', 'OP_TLV_div');
            var TS1_GivePlayerAllSkill_lable = addElement(TS1_GivePlayerAllSkill_div, 'div', 'TS1_GivePlayerAllSkill_lable', 'OP_T2_div');
            TS1_GivePlayerAllSkill_lable.innerHTML = '解锁全部技能';
            var TS1_GivePlayerAllSkill_value = addElement(TS1_GivePlayerAllSkill_div, 'div', 'TS1_GivePlayerAllSkill_value', 'OP_V_div');
            var TS1_GivePlayerAllSkill_button = addElement(TS1_GivePlayerAllSkill_value, 'button', 'TS1_GivePlayerAllSkill_button', 'OP_button');
            TS1_GivePlayerAllSkill_button.innerHTML = '解锁全部技能';
            //测试-给予buff测试
            var TS1_GivePlayerbuff_div = addElement(TS_value1_div, 'div', 'TS1_GivePlayerbuff_div', 'OP_TLV_div');
            var TS1_GivePlayerbuff_lable = addElement(TS1_GivePlayerbuff_div, 'div', 'TS1_GivePlayerbuff_lable', 'OP_T2_div');
            TS1_GivePlayerbuff_lable.innerHTML = 'buff测试';
            var TS1_Playerbuff_value = addElement(TS1_GivePlayerbuff_div, 'div', 'TS1_Playerbuff_value', 'OP_V_div');
            var TS1_GivePlayerbuff_button = addElement(TS1_Playerbuff_value, 'button', 'TS1_GivePlayerbuff_button', 'OP_button');
            TS1_GivePlayerbuff_button.innerHTML = '给予buff测试';
            var TS1_DeletePlayerbuff_button = addElement(TS1_Playerbuff_value, 'button', 'TS1_DeletePlayerbuff_button', 'OP_button');
            TS1_DeletePlayerbuff_button.innerHTML = '清空buff';
            //测试-导出存档对象
            var TS1_GetObjectSave_div = addElement(TS_value1_div, 'div', 'TS1_GetObjectSave_div', 'OP_TLV_div');
            var TS1_GetObjectSave_lable = addElement(TS1_GetObjectSave_div, 'div', 'TS1_GetObjectSave_lable', 'OP_T2_div');
            TS1_GetObjectSave_lable.innerHTML = '导出存档对象';
            var TS1_GetObjectSave_value = addElement(TS1_GetObjectSave_div, 'div', 'TS1_GetObjectSave_value', 'OP_V_div');
            var TS1_GetObjectSave_button = addElement(TS1_GetObjectSave_value, 'button', 'TS1_GetObjectSave_button', 'OP_button');
            TS1_GetObjectSave_button.innerHTML = '导出存档对象';
        }
        //测试2
        {
            var TS_value2_scroll_box = addElement(TS_div, 'div', 'TS_value2_scroll_box', 'overflow_y_div', 'none');
            var TS_value2_div = addElement(TS_value2_scroll_box, 'div', 'TS_value2_div', 'in_overflow_div');
            //测试2-地图功能测试
            var TS2_Map_div = addElement(TS_value2_div, 'div', 'TS2_Map_div', 'OP_TLV_div');
            var TS2_Map_lable = addElement(TS2_Map_div, 'div', 'TS2_Map_lable', 'OP_T2_div');
            TS2_Map_lable.innerHTML = '地图功能测试';
            var TS2_Map_value = addElement(TS2_Map_div, 'div', 'TS2_Map_value', 'OP_V_div');
            var TS2_MapSize_button = addElement(TS2_Map_value, 'button', 'TS2_MapSize_button', 'OP_button');
            TS2_MapSize_button.innerHTML = '地图大小测试';
            //测试2-制造配方测试
            var TS2_Makeformula_div = addElement(TS_value2_div, 'div', 'TS2_Makeformula_div', 'OP_TLV_div');
            var TS2_Makeformula_lable = addElement(TS2_Makeformula_div, 'div', 'TS2_Makeformula_lable', 'OP_T2_div');
            TS2_Makeformula_lable.innerHTML = '制造配方测试';
            var TS2_Addformula_value = addElement(TS2_Makeformula_div, 'div', 'TS2_Addformula_value', 'OP_V_div');
            var TS2_Addformula_button = addElement(TS2_Addformula_value, 'button', 'TS2_Addformula_button', 'OP_button');
            TS2_Addformula_button.innerHTML = '添加';
            var TS2_Deleteformula_button = addElement(TS2_Addformula_value, 'button', 'TS2_Deleteformula_button', 'OP_button');
            TS2_Deleteformula_button.innerHTML = '删除';
            //测试2-校验玩家背包物品
            var TS2_check_player_backpack_div = addElement(TS_value2_div, 'div', 'TS2_check_player_backpack_div', 'OP_TLV_div');
            var TS2_check_player_backpack_lable = addElement(TS2_check_player_backpack_div, 'div', 'TS2_check_player_backpack_lable', 'OP_T2_div');
            TS2_check_player_backpack_lable.innerHTML = '校验玩家背包物品';
            var TS2_check_player_backpack_value = addElement(TS2_check_player_backpack_div, 'div', 'TS2_check_player_backpack_value', 'OP_V_div');
            var TS2_check_player_backpack_button = addElement(TS2_check_player_backpack_value, 'button', 'TS2_check_player_backpack_button', 'OP_button');
            TS2_check_player_backpack_button.innerHTML = '校验';
        }
    }
}

//设置测试子功能中的按钮触发事件
function set_test_button(Game_log) {
    //选择测试界面的具体功能
    let radios = Game_log.querySelectorAll('input[type="radio"][name="TS_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_game_log_TS_div(this.id);
        });
    });
    //测试1部分按钮
    {
        //完成3天的新手教学
        let TS1_FinishNewPlayerTeach123_button = Game_log.querySelector('#TS1_FinishNewPlayerTeach123_button');
        TS1_FinishNewPlayerTeach123_button.onclick = function () {
            finish_new_player_teach_123();
        };
        //完成当前挑战
        let TS1_FinishNowChallenge_button = Game_log.querySelector('#TS1_FinishNowChallenge_button');
        TS1_FinishNowChallenge_button.onclick = function () {
            finish_now_challenge();
        };
        //逐渐解锁生活技能
        let TS1_UnlockLivePlanSkill_button = Game_log.querySelector('#TS1_UnlockLivePlanSkill_button');
        TS1_UnlockLivePlanSkill_button.onclick = function () {
            unlock_live_plan_skill();
        };
        //暂停游戏
        let TS1_StopGameSpeed_button = Game_log.querySelector('#TS1_StopGameSpeed_button');
        TS1_StopGameSpeed_button.onclick = function () {
            let time_manage = global.get_time_manage();
            time_manage.set_game_speed_num('global', 0);
        };
        //恢复游戏
        let TS1_StartGameSpeed_button = Game_log.querySelector('#TS1_StartGameSpeed_button');
        TS1_StartGameSpeed_button.onclick = function () {
            let time_manage = global.get_time_manage();
            time_manage.set_game_speed_num('global', 1);
        };
        //游戏速度X1
        let TS1_GameSpeedX1_button = Game_log.querySelector('#TS1_GameSpeedX1_button');
        TS1_GameSpeedX1_button.onclick = function () {
            let time_manage = global.get_time_manage();
            time_manage.set_game_speed_ratio('option', 0);
        };
        //游戏速度X2
        let TS1_GameSpeedX2_button = Game_log.querySelector('#TS1_GameSpeedX2_button');
        TS1_GameSpeedX2_button.onclick = function () {
            let time_manage = global.get_time_manage();
            time_manage.set_game_speed_ratio('option', 100);
        };
        //游戏速度X5
        let TS1_GameSpeedX5_button = Game_log.querySelector('#TS1_GameSpeedX5_button');
        TS1_GameSpeedX5_button.onclick = function () {
            let time_manage = global.get_time_manage();
            time_manage.set_game_speed_ratio('option', 400);
        };
        //血量设0
        let TS1_HPSet0_button = Game_log.querySelector('#TS1_HPSet0_button');
        TS1_HPSet0_button.onclick = function () {
            let P_attr = player.get_player_attributes();
            P_attr.set_data_attr('health_point', 0);
        };
        //魔力设0
        let TS1_MPSet0_button = Game_log.querySelector('#TS1_MPSet0_button');
        TS1_MPSet0_button.onclick = function () {
            let P_attr = player.get_player_attributes();
            P_attr.set_data_attr('magic_point', 0);
        };
        //精力设0
        let TS1_ENPSet0_button = Game_log.querySelector('#TS1_ENPSet0_button');
        TS1_ENPSet0_button.onclick = function () {
            let P_attr = player.get_player_attributes();
            P_attr.set_data_attr('surface_energy_point', 0);
        };
        //批量给予物品
        let TS1_GivePlayerItems_button = Game_log.querySelector('#TS1_GivePlayerItems_button');
        TS1_GivePlayerItems_button.onclick = function () {
            give_player_item();
        };
        //批量给予物品
        let TS1_GivePlayerAllItems_button = Game_log.querySelector('#TS1_GivePlayerAllItems_button');
        TS1_GivePlayerAllItems_button.onclick = function () {
            give_player_all_item();
        };
        //给予玩家所有技能
        let TS1_GivePlayerAllSkill_button = Game_log.querySelector('#TS1_GivePlayerAllSkill_button');
        TS1_GivePlayerAllSkill_button.onclick = function () {
            let P_All_Skills = player.get_player_All_Skills();
            for (let id in P_skills) {
                P_All_Skills.player_unlock_skill(id);
            }
        };
        //给予buff测试
        let TS1_GivePlayerbuff_button = Game_log.querySelector('#TS1_GivePlayerbuff_button');
        TS1_GivePlayerbuff_button.onclick = function () {
            let P_buff = player.get_player_buff_manage();
            // P_buff.set_buff_attr('fatigue');//疲劳
            P_buff.set_buff_attr('extreme_fatigue'); //极度疲劳
        };
        //清空buff
        let TS1_DeletePlayerbuff_button = Game_log.querySelector('#TS1_DeletePlayerbuff_button');
        TS1_DeletePlayerbuff_button.onclick = function () {
            let P_buff = player.get_player_buff_manage();
            P_buff.reset_buff_attr(); //清空所有buff
        };
        //导出存档对象
        let TS1_GetObjectSave_button = Game_log.querySelector('#TS1_GetObjectSave_button');
        TS1_GetObjectSave_button.onclick = function () {
            //保存游戏
            save_game();
            //弹出含有当前存档的提示框
            save_game_show_object_tip();
            //添加存档成功的日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('save_game', 'manual');
        };
    }
    //测试2部分按钮
    {
        //地图大小测试
        let TS2_MapSize_button = Game_log.querySelector('#TS2_MapSize_button');
        TS2_MapSize_button.onclick = function () {
            let map_manage = global.get_map_manage();
            map_manage.change_map_size();
        };
        //制造配方测试--添加
        let TS2_Addformula_button = Game_log.querySelector('#TS2_Addformula_button');
        TS2_Addformula_button.onclick = function () {
            const SYN_MK_formula_value_div = document.getElementById('SYN_MK_formula_value_div');
            var formula_value = addElement(SYN_MK_formula_value_div, 'div', null, 'formula_value');
            var formula_value_l = addElement(formula_value, 'div', null, 'formula_value_l');
            formula_value_l.innerHTML = '材料A x1+材料B x2';
            var formula_value_r = addElement(formula_value, 'div', null, 'formula_value_r');
            formula_value_r.innerHTML = '产物A x1';
            //配方数量变化，根据滚动条更新占位图标
            updata_formula_UI_placeholder('SYN_MK_formula_scroll_box', 'SYN_MK_formula_value_div', 'SYN_MK_formula_title_3');
        };
        //制造配方测试--删除
        let TS2_Deleteformula_button = Game_log.querySelector('#TS2_Deleteformula_button');
        TS2_Deleteformula_button.onclick = function () {
            const SYN_MK_formula_value_div = document.getElementById('SYN_MK_formula_value_div');
            if (SYN_MK_formula_value_div.firstChild) {
                SYN_MK_formula_value_div.removeChild(SYN_MK_formula_value_div.firstChild);
            }
            //配方数量变化，根据滚动条更新占位图标
            updata_formula_UI_placeholder('SYN_MK_formula_scroll_box', 'SYN_MK_formula_value_div', 'SYN_MK_formula_title_3');
        };
        //校验玩家背包物品
        let TS2_check_player_backpack_button = Game_log.querySelector('#TS2_check_player_backpack_button');
        TS2_check_player_backpack_button.onclick = function () {
            check_player_backpack();
        };
    }
}

//按下游戏日志中，测试界面左侧分类按钮之后，切换到测试界面对应的子界面
function change_game_log_TS_div(button_id) {
    const TS_value1_scroll_box = document.getElementById('TS_value1_scroll_box');
    const TS_value2_scroll_box = document.getElementById('TS_value2_scroll_box');
    if (button_id == 'TS_button_1') {
        TS_value1_scroll_box.style.display = '';
        TS_value2_scroll_box.style.display = 'none';
    } else if (button_id == 'TS_button_2') {
        TS_value1_scroll_box.style.display = 'none';
        TS_value2_scroll_box.style.display = '';
    }
}

//完成3天的新手教学
function finish_new_player_teach_123() {
    //正常流程得把文本和剧情呈现到玩家控制界面，但是这个测试按钮并不想管那么多
    //所以就只是获得物品和技能，以及一些标记
    //由于这些事件的物品奖励是在对话过程中给予的，完成事件其实什么都没有，所以单独给奖励
    let game_event_manage = global.get_game_event_manage();
    let P_All_Skills = player.get_player_All_Skills();
    game_event_manage.end_mini_event('new_player_teach_1', 'finish');
    P_All_Skills.player_unlock_skill('normal_attack_Melee');
    player.Player_get_item('wood_sword', 1, 'ordinary');
    player.Player_get_item('wood_helmet', 1, 'ordinary');
    player.Player_get_item('wood_chest_armor', 1, 'ordinary');
    player.Player_get_item('wood_leg_armor', 1, 'ordinary');
    player.Player_get_item('wood_shoes', 1, 'ordinary');
    game_event_manage.end_mini_event('new_player_teach_2', 'finish');
    player.Player_get_item('wood_shield', 1, 'ordinary');
    P_All_Skills.player_unlock_skill('shield_defense');
    game_event_manage.end_mini_event('new_player_teach_3', 'finish');
    player.Player_get_item('test_sword', 1, 'ordinary'); //测试用武器
}
//完成当前挑战
function finish_now_challenge() {
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.test_finish_now_challenge();
    game_event_manage.init_IE_div();
}
//逐渐解锁生活技能
function unlock_live_plan_skill() {
    if (!global.get_flag('GS_unlock_CLT')) {
        global.set_flag('GS_unlock_CLT', true);
    } else if (!global.get_flag('GS_unlock_FIS')) {
        global.set_flag('GS_unlock_FIS', true);
    } else if (!global.get_flag('GS_unlock_MIN')) {
        global.set_flag('GS_unlock_MIN', true);
    } else if (!global.get_flag('GS_unlock_LGI')) {
        global.set_flag('GS_unlock_LGI', true);
    } else if (!global.get_flag('GS_unlock_DIV')) {
        global.set_flag('GS_unlock_DIV', true);
    } else if (!global.get_flag('GS_unlock_ACL')) {
        global.set_flag('GS_unlock_ACL', true);
    } else if (!global.get_flag('GS_unlock_ELT')) {
        global.set_flag('GS_unlock_ELT', true);
    }
    //移动到当前位置，触发刷新界面的逻辑
    let place_manage = global.get_place_manage();
    let now_place = place_manage.get_now_place();
    place_manage.set_now_place(now_place);
}
// 批量给予物品
function give_player_item() {
    player.Player_get_item('Oak_logs', 10);
    player.Player_get_item('birch_logs', 10);
    player.Player_get_item('fir_logs', 10);
    player.Player_get_item('lightning_bark', 10);
    player.Player_get_item('frost_marrow_resin', 10);
    player.Player_get_item('viresilver_stem', 10);
    player.Player_get_item('porcini', 10);
    player.Player_get_item('chanterelle', 10);
    player.Player_get_item('termite_mushroom', 10);
    player.Player_get_item('river_mussel', 10);
    player.Player_get_item('creek_fish', 10);
    player.Player_get_item('animal_raw_meat', 10);
    player.Player_get_item('red_berry', 10);
    player.Player_get_item('yellow_berry', 10);
    player.Player_get_item('grilled_fish', 10);
    player.Player_get_item('termite_mushroom_soup', 10);
    player.Player_get_item('fish_jerky', 10);
    player.Player_get_item('wood_arrow', 10);
    player.Player_get_item('copper_coin', 10);
    player.Player_get_item('greedy_copper_coin', 10);

    player.Player_get_item('wood_sword', 6, 'damaged');
    player.Player_get_item('wood_sword', 6, 'ordinary');
    player.Player_get_item('wood_sword', 6, 'excellent');
    player.Player_get_item('wood_sword', 6, 'rare');
    player.Player_get_item('wood_sword', 6, 'epic');
    player.Player_get_item('test_boomerang', 1, 'ordinary');
    player.Player_get_item('test_boomerang', 3, 'excellent');
    player.Player_get_item('test_boomerang', 5, 'rare');
    player.Player_get_item('hatchet', 1, 'ordinary');
    player.Player_get_item('mowing_sickle', 1, 'ordinary');
}
// 批量给予物品
function give_player_all_item() {
    for (let id in items) {
        if (items[id].main_type == 'equipment') {
            player.Player_get_item(id, 1, 'ordinary');
        } else if (items[id].main_type == 'consumable') {
            player.Player_get_item(id, 1);
        } else if (items[id].main_type == 'material') {
            player.Player_get_item(id, 1);
        }
    }
}
//校验玩家背包物品
function check_player_backpack() {
    let flag = true;
    let P_backpack = player.get_player_backpack();
    for (let old_key in P_backpack.backpack_items) {
        let item_obj = P_backpack.backpack_items[old_key];
        //清空这个对象的所有空属性
        for (let id in item_obj) {
            if (item_obj[id] === undefined) {
                delete item_obj[id];
            }
        }
        //确认key情况
        let item_key = get_item_id_key(item_obj);
        if (old_key == item_key) {
            //物品key一样，没有问题
            continue;
        }
        flag = false;
        console.log('背包物品%s应该为%s', old_key, item_key);
        //物品key不一样，去掉原物品，新增新物品
        delete P_backpack.backpack_items[old_key];
        P_backpack.backpack_items[item_key] = item_obj;
    }
    if (flag) {
        console.log('背包物品无误');
        return;
    }

    class item_data_class {
        constructor(item_id) {
            //通用属性
            this.id = item_id; //物品id
            this.all_num = 0; //背包该物品总数量
            // this.can_use_num; //可以使用的数量

            this.BP_key = new Object(); //该id物品在玩家背包中的key有哪些
        }
    }

    //重新加载物品简要信息
    P_backpack.backpack_items_data = new Object();
    for (let item_key in P_backpack.backpack_items) {
        let item_id = P_backpack.backpack_items[item_key].id;
        let item_num = P_backpack.backpack_items[item_key].num;
        if (is_Empty_Object(P_backpack.backpack_items_data[item_id])) {
            P_backpack.backpack_items_data[item_id] = new item_data_class(item_id);
        }
        P_backpack.backpack_items_data[item_id].id = item_id;
        P_backpack.backpack_items_data[item_id].all_num += item_num;
        P_backpack.backpack_items_data[item_id].BP_key[item_key] = item_num;
    }
    //刷新
    P_backpack.updata_BP_value();
    console.log('背包物品修复完成');
}
export { make_test_div, set_test_button };
