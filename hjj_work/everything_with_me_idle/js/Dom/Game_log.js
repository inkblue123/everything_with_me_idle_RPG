import { crtElement, addElement, addElement_radio, addElement_select } from '../Function/Dom_function.js';
import { save_game, save_game_show_tip, delete_save_show_tip, load_save_show_tip } from '../LoadAndSave/load.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

//创建右下游戏日志界面
function create_Game_log() {
    let Game_log = crtElement('div', 'game_log', null, '');
    make_Combat_plan_div(Game_log);
    set_Combat_plan_button(Game_log);
    return Game_log;
}

//创建右下，游戏数据界面中的详细组件
function make_Combat_plan_div(Game_log) {
    //界面上部，区分当前展示的内容的按钮
    var Game_log_switch_div = crtElement('div', 'Game_log_switch_div', 'page_flex', '');
    //脑海 mind MD
    var MD_switch_radio_div = addElement(Game_log_switch_div, 'div', 'MD_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(MD_switch_radio_div, 'MD_switch_button', 'Game_log_switch', 'MD_switch', '脑海');
    MD_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //图鉴窗口 library IB
    var IB_switch_radio_div = addElement(Game_log_switch_div, 'div', null, 'radio_div div_switch_button');
    addElement_radio(IB_switch_radio_div, 'IB_switch_button', 'Game_log_switch', 'IB_switch', '图鉴');
    //界面下部，具体展示内容的窗口
    var Game_log_value_div = crtElement('div', 'Game_log_value_div', 'page_columns_1', '');
    var MD_div = addElement(Game_log_value_div, 'div', 'MD_div', 'page_columns_12');
    var IB_div = addElement(Game_log_value_div, 'div', 'IB_div', 'page_columns_12', 'none');

    // 脑海（日志）mind MD
    {
        // 左侧的分类下拉表格界面
        {
            var MD_scroll_box = addElement(MD_div, 'div', 'MD_scroll_box', 'overflow_y_div');
            var MD_switch_div = addElement(MD_scroll_box, 'div', 'MD_switch_div', 'in_overflow_div');
            //流水账 running_account RA
            var RA_radio_div = addElement(MD_switch_div, 'div', 'RA_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(RA_radio_div, 'RA_button', 'MD_switch', 'RA_button', '流水账');
            RA_radio_div.children[0].checked = true; //初始激活该按钮
            var RA_droptable = addElement(MD_switch_div, 'div', 'RA_droptable', 'dropdown_table');
            var RA_new_radio_div = addElement(RA_droptable, 'div', 'RA_new_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(RA_new_radio_div, 'RA_new', 'RA_switch', 'RA_new', '最新消息');
            RA_new_radio_div.children[0].checked = true; //初始激活该按钮
            var RA_combat_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_combat_radio_div, 'RA_combat', 'RA_switch', 'RA_combat', '战斗相关');
            var RA_item_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_item_radio_div, 'RA_item', 'RA_switch', 'RA_item', '获得物品相关');
            var RA_live_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_live_radio_div, 'RA_live', 'RA_switch', 'RA_live', '生活技能相关');
            var RA_other_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_other_radio_div, 'RA_other', 'RA_switch', 'RA_other', '其他');
            //重要事件 important_event IE
            var IE_radio_div = addElement(MD_switch_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(IE_radio_div, 'IE_button', 'MD_switch', 'IE_button', '重要事件');
            //游戏设置 option OP
            var OP_radio_div = addElement(MD_switch_div, 'div', 'OP_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(OP_radio_div, 'OP_button', 'MD_switch', 'OP_button', '游戏设置');
            var OP_droptable = addElement(MD_switch_div, 'div', 'OP_droptable', 'dropdown_table');
            var OP_game_radio_div = addElement(OP_droptable, 'div', 'OP_game_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(OP_game_radio_div, 'OP_game', 'OP_switch', 'OP_game', '游戏');
            OP_game_radio_div.children[0].checked = true; //初始激活该按钮
            var OP_picture_radio_div = addElement(OP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(OP_picture_radio_div, 'OP_picture', 'OP_switch', 'OP_picture', '画面');
            var OP_music_radio_div = addElement(OP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(OP_music_radio_div, 'OP_music', 'OP_switch', 'OP_music', '音乐');
            var OP_test_radio_div = addElement(OP_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(OP_test_radio_div, 'OP_test', 'OP_switch', 'OP_test', '测试');
        }
        //右侧具体的内容
        {
            // var MD_value_div = addElement(MD_div, 'div', 'MD_value_div', null);
            //流水账 running_account RA
            {
                var RA_value_scroll_box = addElement(MD_div, 'div', 'RA_value_scroll_box', 'overflow_y_div', '');
                var RA_value_div = addElement(RA_value_scroll_box, 'div', 'RA_value_div', 'in_overflow_div');
            }
            //重要事件 important_event IE
            {
                var IE_value_scroll_box = addElement(MD_div, 'div', 'IE_value_scroll_box', 'overflow_y_div', 'none');
                var IE_value_div = addElement(IE_value_scroll_box, 'div', 'IE_value_div', 'in_overflow_div');
                var main_quest_div = addElement(IE_value_div, 'div', 'main_quest_div', null);
                var all_side_quest_div = addElement(IE_value_div, 'div', 'all_side_quest_div', null);
                var challenge_div = addElement(IE_value_div, 'div', 'challenge_div', null);
            }
            //游戏设置 option OP
            {
                var OP_div = addElement(MD_div, 'div', 'OP_div', null, 'none');
                var OP_up_div = addElement(OP_div, 'div', 'OP_up_div', null);
                var OP_down_div = addElement(OP_div, 'div', 'OP_down_div', null);
                var OP_value_scroll_box = addElement(OP_up_div, 'div', 'OP_value_scroll_box', 'overflow_y_div');
                var OP_value_div = addElement(OP_value_scroll_box, 'div', 'OP_value_div', 'in_overflow_div');
                //设置-游戏设置
                {
                    var OP_game_div = addElement(OP_value_div, 'div', 'OP_game_div', null);
                    //设置-游戏设置-设置界面提示文本
                    var OP_game_OptionTipText_div = addElement(OP_game_div, 'div', 'OP_game_OptionTipText_div', 'OP_TLV_div');
                    var OP_game_OptionTipText_lable = addElement(OP_game_OptionTipText_div, 'div', 'OP_game_OptionTipText_lable', 'OP_T2_div');
                    OP_game_OptionTipText_lable.innerHTML = '设置界面提示文本';
                    var OP_game_OptionTipText_value = addElement(OP_game_OptionTipText_div, 'div', 'OP_game_OptionTipText_value', 'OP_V_div');
                    addElement_select(OP_game_OptionTipText_value, 'OP_game_OptionTipText', 'OP_select', '设置提示文本', '默认', '以我为尊');
                    //设置-游戏设置-游戏运行帧率
                    var OP_game_FPS_div = addElement(OP_game_div, 'div', 'OP_game_FPS_div', 'OP_TLV_div');
                    var OP_game_FPS_lable = addElement(OP_game_FPS_div, 'div', 'OP_game_FPS_lable', 'OP_T2_div');
                    OP_game_FPS_lable.innerHTML = '游戏运行帧率';
                    var OP_game_FPS_value = addElement(OP_game_FPS_div, 'div', 'OP_game_FPS_value', 'OP_V_div');
                    addElement_select(OP_game_FPS_value, 'OP_game_FPS', 'OP_select', '帧率选择', 30, 60);
                    //设置-游戏设置-流水账界面日志保存数量上限
                    var OP_game_RASaveLogMax_div = addElement(OP_game_div, 'div', 'OP_game_RASaveLogMax_div', 'OP_TLV_div');
                    var OP_game_RASaveLogMax_lable = addElement(OP_game_RASaveLogMax_div, 'div', 'OP_game_RASaveLogMax_lable', 'OP_T2_div');
                    OP_game_RASaveLogMax_lable.innerHTML = '流水账界面日志保存数量上限';
                    var OP_game_RASaveLogMax_value = addElement(OP_game_RASaveLogMax_div, 'div', 'OP_game_RASaveLogMax_value', 'OP_V_div');
                    addElement_select(OP_game_RASaveLogMax_value, 'OP_game_RASaveLogMax', 'OP_select', '流水账界面日志保存数量上限', '10', '15', '20', '30', '50');
                    //设置-游戏设置-存档管理
                    var OP_game_SaveManage_div = addElement(OP_game_div, 'div', 'OP_game_SaveManage_div', 'OP_TLV_div');
                    var OP_game_SaveManage_lable = addElement(OP_game_SaveManage_div, 'div', 'OP_game_SaveManage_lable', 'OP_T3_div');
                    OP_game_SaveManage_lable.innerHTML = '存档管理';
                    var OP_game_SaveManage_value = addElement(OP_game_SaveManage_div, 'div', 'OP_game_SaveManage_value', 'OP_V_div');
                    var OP_game_Save_button = addElement(OP_game_SaveManage_value, 'button', 'OP_game_Save_button', 'OP_button');
                    OP_game_Save_button.innerHTML = '导出存档';
                    var OP_game_Load_button = addElement(OP_game_SaveManage_value, 'button', 'OP_game_Load_button', 'OP_button');
                    OP_game_Load_button.innerHTML = '导入存档';
                    var OP_game_CleanSave_button = addElement(OP_game_SaveManage_value, 'button', 'OP_game_CleanSave_button', 'OP_button');
                    OP_game_CleanSave_button.innerHTML = '删除存档';
                    OP_game_CleanSave_button.style.backgroundColor = '#ff000080';
                }
                //设置-画面设置
                {
                    var OP_picture_div = addElement(OP_value_div, 'div', 'OP_picture_div', null, 'none');
                }
                //设置-音乐设置
                {
                    var OP_music_div = addElement(OP_value_div, 'div', 'OP_music_div', null, 'none');
                }
                //设置-测试
                {
                    var OP_test_div = addElement(OP_value_div, 'div', 'OP_test_div', null, 'none');
                    //设置-测试-完成3天的新手教学
                    var OP_test_FinishNewPlayerTeach123_div = addElement(OP_test_div, 'div', 'OP_test_FinishNewPlayerTeach123_div', 'OP_TLV_div');
                    var OP_test_FinishNewPlayerTeach123_lable = addElement(OP_test_FinishNewPlayerTeach123_div, 'div', 'OP_test_FinishNewPlayerTeach123_lable', 'OP_T2_div');
                    OP_test_FinishNewPlayerTeach123_lable.innerHTML = '完成3天的新手教学';
                    var OP_test_FinishNewPlayerTeach123_value = addElement(OP_test_FinishNewPlayerTeach123_div, 'div', 'OP_test_FinishNewPlayerTeach123_value', 'OP_V_div');
                    var OP_test_FinishNewPlayerTeach123_button = addElement(OP_test_FinishNewPlayerTeach123_value, 'button', 'OP_test_FinishNewPlayerTeach123_button', 'OP_button');
                    OP_test_FinishNewPlayerTeach123_button.innerHTML = '完成3天的新手教学';
                    //设置-测试-完成当前挑战
                    var OP_test_FinishNowChallenge_div = addElement(OP_test_div, 'div', 'OP_test_FinishNowChallenge_div', 'OP_TLV_div');
                    var OP_test_FinishNowChallenge_lable = addElement(OP_test_FinishNowChallenge_div, 'div', 'OP_test_FinishNowChallenge_lable', 'OP_T2_div');
                    OP_test_FinishNowChallenge_lable.innerHTML = '完成当前挑战';
                    var OP_test_FinishNowChallenge_value = addElement(OP_test_FinishNowChallenge_div, 'div', 'OP_test_FinishNowChallenge_value', 'OP_V_div');
                    var OP_test_FinishNowChallenge_button = addElement(OP_test_FinishNowChallenge_value, 'button', 'OP_test_FinishNowChallenge_button', 'OP_button');
                    OP_test_FinishNowChallenge_button.innerHTML = '完成当前挑战';
                    //设置-测试-逐渐解锁生活技能
                    var OP_test_UnlockLivePlanSkill_div = addElement(OP_test_div, 'div', 'OP_test_UnlockLivePlanSkill_div', 'OP_TLV_div');
                    var OP_test_UnlockLivePlanSkill_lable = addElement(OP_test_UnlockLivePlanSkill_div, 'div', 'OP_test_UnlockLivePlanSkill_lable', 'OP_T2_div');
                    OP_test_UnlockLivePlanSkill_lable.innerHTML = '逐渐解锁生活技能';
                    var OP_test_UnlockLivePlanSkill_value = addElement(OP_test_UnlockLivePlanSkill_div, 'div', 'OP_test_UnlockLivePlanSkill_value', 'OP_V_div');
                    var OP_test_UnlockLivePlanSkill_button = addElement(OP_test_UnlockLivePlanSkill_value, 'button', 'OP_test_UnlockLivePlanSkill_button', 'OP_button');
                    OP_test_UnlockLivePlanSkill_button.innerHTML = '逐渐解锁生活技能';
                    //设置-测试-暂停游戏
                    var OP_test_StopGameSpeed_div = addElement(OP_test_div, 'div', 'OP_test_StopGameSpeed_div', 'OP_TLV_div');
                    var OP_test_StopGameSpeed_lable = addElement(OP_test_StopGameSpeed_div, 'div', 'OP_test_StopGameSpeed_lable', 'OP_T2_div');
                    OP_test_StopGameSpeed_lable.innerHTML = '暂停游戏';
                    var OP_test_StopGameSpeed_value = addElement(OP_test_StopGameSpeed_div, 'div', 'OP_test_StopGameSpeed_value', 'OP_V_div');
                    var OP_test_StopGameSpeed_button = addElement(OP_test_StopGameSpeed_value, 'button', 'OP_test_StopGameSpeed_button', 'OP_button');
                    OP_test_StopGameSpeed_button.innerHTML = '暂停游戏';
                    var OP_test_StartGameSpeed_button = addElement(OP_test_StopGameSpeed_value, 'button', 'OP_test_StartGameSpeed_button', 'OP_button');
                    OP_test_StartGameSpeed_button.innerHTML = '恢复游戏';
                    //设置-测试-游戏速度
                    var OP_test_ChangeGameSpeed_div = addElement(OP_test_div, 'div', 'OP_test_ChangeGameSpeed_div', 'OP_TLV_div');
                    var OP_test_ChangeGameSpeed_lable = addElement(OP_test_ChangeGameSpeed_div, 'div', 'OP_test_ChangeGameSpeed_lable', 'OP_T3_div');
                    OP_test_ChangeGameSpeed_lable.innerHTML = '游戏速度';
                    var OP_test_ChangeGameSpeed_value = addElement(OP_test_ChangeGameSpeed_div, 'div', 'OP_test_ChangeGameSpeed_value', 'OP_V_div');
                    var OP_test_GameSpeedX1_button = addElement(OP_test_ChangeGameSpeed_value, 'button', 'OP_test_GameSpeedX1_button', 'OP_button');
                    OP_test_GameSpeedX1_button.innerHTML = '1倍速';
                    var OP_test_GameSpeedX2_button = addElement(OP_test_ChangeGameSpeed_value, 'button', 'OP_test_GameSpeedX2_button', 'OP_button');
                    OP_test_GameSpeedX2_button.innerHTML = '2倍速';
                    var OP_test_GameSpeedX5_button = addElement(OP_test_ChangeGameSpeed_value, 'button', 'OP_test_GameSpeedX5_button', 'OP_button');
                    OP_test_GameSpeedX5_button.innerHTML = '5倍速';
                    //设置-测试-红绿蓝设0
                    var OP_test_HPMPENPSet0_div = addElement(OP_test_div, 'div', 'OP_test_HPMPENPSet0_div', 'OP_TLV_div');
                    var OP_test_HPMPENPSet0_lable = addElement(OP_test_HPMPENPSet0_div, 'div', 'OP_test_HPMPENPSet0_lable', 'OP_T3_div');
                    OP_test_HPMPENPSet0_lable.innerHTML = '红绿蓝设0';
                    var OP_test_HPMPENPSet0_value = addElement(OP_test_HPMPENPSet0_div, 'div', 'OP_test_HPMPENPSet0_value', 'OP_V_div');
                    var OP_test_HPSet0_button = addElement(OP_test_HPMPENPSet0_value, 'button', 'OP_test_HPSet0_button', 'OP_button');
                    OP_test_HPSet0_button.innerHTML = '血量设0';
                    var OP_test_MPSet0_button = addElement(OP_test_HPMPENPSet0_value, 'button', 'OP_test_MPSet0_button', 'OP_button');
                    OP_test_MPSet0_button.innerHTML = '魔力设0';
                    var OP_test_ENPSet0_button = addElement(OP_test_HPMPENPSet0_value, 'button', 'OP_test_ENPSet0_button', 'OP_button');
                    OP_test_ENPSet0_button.innerHTML = '精力设0';
                    //设置-测试-批量物品测试
                    var OP_test_GivePlayerItems_div = addElement(OP_test_div, 'div', 'OP_test_GivePlayerItems_div', 'OP_TLV_div');
                    var OP_test_GivePlayerItems_lable = addElement(OP_test_GivePlayerItems_div, 'div', 'OP_test_GivePlayerItems_lable', 'OP_T2_div');
                    OP_test_GivePlayerItems_lable.innerHTML = '批量物品测试';
                    var OP_test_GivePlayerItems_value = addElement(OP_test_GivePlayerItems_div, 'div', 'OP_test_GivePlayerItems_value', 'OP_V_div');
                    var OP_test_GivePlayerItems_button = addElement(OP_test_GivePlayerItems_value, 'button', 'OP_test_GivePlayerItems_button', 'OP_button');
                    OP_test_GivePlayerItems_button.innerHTML = '批量物品测试';
                    //设置-测试-解锁全部技能
                    var OP_test_GivePlayerAllSkill_div = addElement(OP_test_div, 'div', 'OP_test_GivePlayerAllSkill_div', 'OP_TLV_div');
                    var OP_test_GivePlayerAllSkill_lable = addElement(OP_test_GivePlayerAllSkill_div, 'div', 'OP_test_GivePlayerAllSkill_lable', 'OP_T2_div');
                    OP_test_GivePlayerAllSkill_lable.innerHTML = '解锁全部技能';
                    var OP_test_GivePlayerAllSkill_value = addElement(OP_test_GivePlayerAllSkill_div, 'div', 'OP_test_GivePlayerAllSkill_value', 'OP_V_div');
                    var OP_test_GivePlayerAllSkill_button = addElement(OP_test_GivePlayerAllSkill_value, 'button', 'OP_test_GivePlayerAllSkill_button', 'OP_button');
                    OP_test_GivePlayerAllSkill_button.innerHTML = '解锁全部技能';
                    //设置-测试-给予buff测试
                    var OP_test_GivePlayerbuff_div = addElement(OP_test_div, 'div', 'OP_test_GivePlayerbuff_div', 'OP_TLV_div');
                    var OP_test_GivePlayerbuff_lable = addElement(OP_test_GivePlayerbuff_div, 'div', 'OP_test_GivePlayerbuff_lable', 'OP_T2_div');
                    OP_test_GivePlayerbuff_lable.innerHTML = '给予buff测试';
                    var OP_test_GivePlayerbuff_value = addElement(OP_test_GivePlayerbuff_div, 'div', 'OP_test_GivePlayerbuff_value', 'OP_V_div');
                    var OP_test_GivePlayerbuff_button = addElement(OP_test_GivePlayerbuff_value, 'button', 'OP_test_GivePlayerbuff_button', 'OP_button');
                    OP_test_GivePlayerbuff_button.innerHTML = '给予buff测试';
                }
            }
        }
    }
    // 图鉴窗口 library IB
    {
        // 左侧的分类下拉表格界面
        {
            var IB_scroll_box = addElement(IB_div, 'div', 'IB_scroll_box', 'overflow_y_div');
            var IB_switch_div = addElement(IB_scroll_box, 'div', 'IB_switch_div', 'in_overflow_div');
            // 全部
            var IB_ALL_button = addElement(IB_switch_div, 'button', 'IB_ALL_button', 'dropdown_button_1');
            IB_ALL_button.innerHTML = '全部';
            // 物品
            var IB_item_button = addElement(IB_switch_div, 'button', 'IB_item_button', 'dropdown_button_1');
            IB_item_button.innerHTML = '物品';
            var IB_item_droptable = addElement(IB_switch_div, 'div', 'IB_item_droptable', 'dropdown_table');
            var IB_item_all_button = addElement(IB_item_droptable, 'button', 'IB_item_all_button', 'dropdown_button_2');
            IB_item_all_button.innerHTML = '全部';
            var IB_item_W_button = addElement(IB_item_droptable, 'button', 'IB_item_W_button', 'dropdown_button_2');
            IB_item_W_button.innerHTML = '武器装备';
            var IB_item_A_button = addElement(IB_item_droptable, 'button', 'IB_item_A_button', 'dropdown_button_2');
            IB_item_A_button.innerHTML = '消耗品';
            var IB_item_D_button = addElement(IB_item_droptable, 'button', 'IB_item_D_button', 'dropdown_button_2');
            IB_item_D_button.innerHTML = '材料';
            //技能
            var IB_skill_button = addElement(IB_switch_div, 'button', 'IB_skill_button', 'dropdown_button_1');
            IB_skill_button.innerHTML = '技能';
            var IB_skill_droptable = addElement(IB_switch_div, 'div', 'IB_skill_droptable', 'dropdown_table');
            var IB_skill_all_button = addElement(IB_skill_droptable, 'button', 'IB_skill_all_button', 'dropdown_button_2');
            IB_skill_all_button.innerHTML = '全部';
            var IB_skill_W_button = addElement(IB_skill_droptable, 'button', 'IB_skill_W_button', 'dropdown_button_2');
            IB_skill_W_button.innerHTML = '根基技能';
            var IB_skill_A_button = addElement(IB_skill_droptable, 'button', 'IB_skill_A_button', 'dropdown_button_2');
            IB_skill_A_button.innerHTML = '战斗技能';
            var IB_skill_D_button = addElement(IB_skill_droptable, 'button', 'IB_skill_D_button', 'dropdown_button_2');
            IB_skill_D_button.innerHTML = '生活技能';
            var IB_skill_O_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
            IB_skill_O_button.innerHTML = '主动技能';
            var IB_skill_B_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
            IB_skill_B_button.innerHTML = '特殊功法';
            // 敌人
            var IB_enemy_button = addElement(IB_switch_div, 'button', 'IB_enemy_button', 'dropdown_button_1');
            IB_enemy_button.innerHTML = '敌人';
            var IB_enemy_droptable = addElement(IB_switch_div, 'div', 'IB_enemy_droptable', 'dropdown_table');
            var IB_enemy_all_button = addElement(IB_enemy_droptable, 'button', 'IB_enemy_all_button', 'dropdown_button_2');
            IB_enemy_all_button.innerHTML = '全部';
            // 事件
            var IB_event_button = addElement(IB_switch_div, 'button', 'IB_event_button', 'dropdown_button_1');
            IB_event_button.innerHTML = '事件';
            var IB_event_droptable = addElement(IB_switch_div, 'div', 'IB_event_droptable', 'dropdown_table');
            var IB_event_all_button = addElement(IB_event_droptable, 'button', 'IB_event_all_button', 'dropdown_button_2');
            IB_event_all_button.innerHTML = '全部';
        }
        //右侧图鉴内容
        {
            var IB_value_div = addElement(IB_div, 'div', 'IB_value_div', null);
        }
    }

    //组件放入游戏数据界面中
    Game_log.appendChild(Game_log_switch_div);
    Game_log.appendChild(Game_log_value_div);
}

// 为组件添加触发事件
function set_Combat_plan_button(Game_log) {
    //切换脑海、图鉴的按钮
    let radios = Game_log.querySelectorAll('input[type="radio"][name="Game_log_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Game_log_div(this.id);
        });
    });
    //选择脑海界面的具体功能
    radios = Game_log.querySelectorAll('input[type="radio"][name="MD_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'RA_button') {
                //针对流水账按钮，按下之后打开流水账的过滤按钮
                show_dropdown_table('MD_switch_div', 'RA_droptable');
                //激活“最新消息”分类
                let RA_new_radio_div = Game_log.querySelector('#RA_new_radio_div');
                RA_new_radio_div.children[0].checked = true;
                let global_flag_manage = global.get_global_flag_manage();
                global_flag_manage.show_game_log_status('RA_new');
            } else if (this.id == 'OP_button') {
                //针对游戏设置按钮，按下之后打开游戏设置的过滤按钮
                show_dropdown_table('MD_switch_div', 'OP_droptable');
                //激活游戏设置下的第一个分类，“游戏”分类
                let OP_game_radio_div = Game_log.querySelector('#OP_game_radio_div');
                OP_game_radio_div.children[0].checked = true;
                change_game_log_OP_div('OP_game');
            } else {
                show_dropdown_table('MD_switch_div');
            }
            // 流水账与重要事件的切换
            change_game_log_MD_div(this.id);
        });
    });

    //选择脑海-流水账功能的过滤条件
    radios = Game_log.querySelectorAll('input[type="radio"][name="RA_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.show_game_log_status(this.id);
        });
    });
    //选择脑海-设置功能的过滤条件
    radios = Game_log.querySelectorAll('input[type="radio"][name="OP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_game_log_OP_div(this.id);
        });
    });
    let IB_item_button = Game_log.querySelector('#IB_item_button');
    IB_item_button.onclick = function () {
        show_dropdown_table('IB_switch_div', 'IB_item_droptable');
    };
    let IB_skill_button = Game_log.querySelector('#IB_skill_button');
    IB_skill_button.onclick = function () {
        show_dropdown_table('IB_switch_div', 'IB_skill_droptable');
    };
    let IB_enemy_button = Game_log.querySelector('#IB_enemy_button');
    IB_enemy_button.onclick = function () {
        show_dropdown_table('IB_switch_div', 'IB_enemy_droptable');
    };
    let IB_event_button = Game_log.querySelector('#IB_event_button');
    IB_event_button.onclick = function () {
        show_dropdown_table('IB_switch_div', 'IB_event_droptable');
    };
    //给脑海-设置里用select下拉框的每个选项添加触发函数
    let selects = Game_log.querySelectorAll('[name="OP_select"]');
    selects.forEach((select) => {
        select.addEventListener('change', function (event) {
            let new_set = event.target.value;
            let option_type = this.id;
            global.set_flag(option_type, new_set);
        });
    });
    //导出存档
    let OP_game_Save_button = Game_log.querySelector('#OP_game_Save_button');
    OP_game_Save_button.onclick = function () {
        //保存游戏
        save_game();
        //弹出含有当前存档的提示框
        save_game_show_tip();
    };
    //导入存档
    let OP_game_Load_button = Game_log.querySelector('#OP_game_Load_button');
    OP_game_Load_button.onclick = function () {
        load_save_show_tip();
    };
    //删除存档
    let OP_game_CleanSave_button = Game_log.querySelector('#OP_game_CleanSave_button');
    OP_game_CleanSave_button.onclick = function () {
        delete_save_show_tip();
    };
    //完成3天的新手教学
    let OP_test_FinishNewPlayerTeach123_button = Game_log.querySelector('#OP_test_FinishNewPlayerTeach123_button');
    OP_test_FinishNewPlayerTeach123_button.onclick = function () {
        finish_new_player_teach_123();
    };
    //完成当前挑战
    let OP_test_FinishNowChallenge_button = Game_log.querySelector('#OP_test_FinishNowChallenge_button');
    OP_test_FinishNowChallenge_button.onclick = function () {
        finish_now_challenge();
    };
    //逐渐解锁生活技能
    let OP_test_UnlockLivePlanSkill_button = Game_log.querySelector('#OP_test_UnlockLivePlanSkill_button');
    OP_test_UnlockLivePlanSkill_button.onclick = function () {
        unlock_live_plan_skill();
    };
    //暂停游戏
    let OP_test_StopGameSpeed_button = Game_log.querySelector('#OP_test_StopGameSpeed_button');
    OP_test_StopGameSpeed_button.onclick = function () {
        let time_manage = global.get_time_manage();
        time_manage.set_game_speed_num('global', 0);
    };
    //恢复游戏
    let OP_test_StartGameSpeed_button = Game_log.querySelector('#OP_test_StartGameSpeed_button');
    OP_test_StartGameSpeed_button.onclick = function () {
        let time_manage = global.get_time_manage();
        time_manage.set_game_speed_num('global', 1);
    };
    //游戏速度X1
    let OP_test_GameSpeedX1_button = Game_log.querySelector('#OP_test_GameSpeedX1_button');
    OP_test_GameSpeedX1_button.onclick = function () {
        let time_manage = global.get_time_manage();
        time_manage.set_game_speed_ratio('option', 0);
    };
    //游戏速度X2
    let OP_test_GameSpeedX2_button = Game_log.querySelector('#OP_test_GameSpeedX2_button');
    OP_test_GameSpeedX2_button.onclick = function () {
        let time_manage = global.get_time_manage();
        time_manage.set_game_speed_ratio('option', 100);
    };
    //游戏速度X5
    let OP_test_GameSpeedX5_button = Game_log.querySelector('#OP_test_GameSpeedX5_button');
    OP_test_GameSpeedX5_button.onclick = function () {
        let time_manage = global.get_time_manage();
        time_manage.set_game_speed_ratio('option', 400);
    };
    //血量设0
    let OP_test_HPSet0_button = Game_log.querySelector('#OP_test_HPSet0_button');
    OP_test_HPSet0_button.onclick = function () {
        let P_attr = player.get_player_attributes();
        P_attr.set_data_attr('health_point', 0);
    };
    //魔力设0
    let OP_test_MPSet0_button = Game_log.querySelector('#OP_test_MPSet0_button');
    OP_test_MPSet0_button.onclick = function () {
        let P_attr = player.get_player_attributes();
        P_attr.set_data_attr('magic_point', 0);
    };
    //精力设0
    let OP_test_ENPSet0_button = Game_log.querySelector('#OP_test_ENPSet0_button');
    OP_test_ENPSet0_button.onclick = function () {
        let P_attr = player.get_player_attributes();
        P_attr.set_data_attr('surface_energy_point', 0);
    };
    //批量给予物品
    let OP_test_GivePlayerItems_button = Game_log.querySelector('#OP_test_GivePlayerItems_button');
    OP_test_GivePlayerItems_button.onclick = function () {
        give_player_item();
    };
    //给予玩家所有技能
    let OP_test_GivePlayerAllSkill_button = Game_log.querySelector('#OP_test_GivePlayerAllSkill_button');
    OP_test_GivePlayerAllSkill_button.onclick = function () {
        let P_All_Skills = player.get_player_All_Skills();
        for (let id in P_skills) {
            P_All_Skills.player_unlock_skill(id);
        }
    };
    //给予buff测试
    let OP_test_GivePlayerbuff_button = Game_log.querySelector('#OP_test_GivePlayerbuff_button');
    OP_test_GivePlayerbuff_button.onclick = function () {
        let P_buff = player.get_player_buff();
        // P_buff.set_buff_attr('fatigue');//疲劳
        P_buff.set_buff_attr('extreme_fatigue'); //极度疲劳
    };
}
//按下游戏日志中，脑海界面左侧分类按钮之后，切换到脑海界面对应的子界面
function change_game_log_MD_div(button_id) {
    const RA_value_scroll_box = document.getElementById('RA_value_scroll_box');
    const IE_value_scroll_box = document.getElementById('IE_value_scroll_box');
    const OP_div = document.getElementById('OP_div');
    if (button_id == 'RA_button') {
        RA_value_scroll_box.style.display = '';
        IE_value_scroll_box.style.display = 'none';
        OP_div.style.display = 'none';
    } else if (button_id == 'IE_button') {
        RA_value_scroll_box.style.display = 'none';
        IE_value_scroll_box.style.display = '';
        OP_div.style.display = 'none';
    } else if (button_id == 'OP_button') {
        RA_value_scroll_box.style.display = 'none';
        IE_value_scroll_box.style.display = 'none';
        OP_div.style.display = '';
    }
}
//切换游戏数据界面中的脑海、图鉴界面的按钮
function change_Game_log_div(button_id) {
    const MD_div = document.getElementById('MD_div');
    const IB_div = document.getElementById('IB_div');
    if (button_id == 'MD_switch_button') {
        MD_div.style.display = '';
        IB_div.style.display = 'none';
    }
    if (button_id == 'IB_switch_button') {
        MD_div.style.display = 'none';
        IB_div.style.display = '';
    }
}
//按下游戏日志中，脑海界面左侧分类按钮之后，切换到脑海界面对应的子界面
function change_game_log_OP_div(button_id) {
    const OP_game_div = document.getElementById('OP_game_div');
    const OP_picture_div = document.getElementById('OP_picture_div');
    const OP_music_div = document.getElementById('OP_music_div');
    const OP_test_div = document.getElementById('OP_test_div');
    let div_obj = {
        OP_game: OP_game_div, //
        OP_picture: OP_picture_div,
        OP_music: OP_music_div,
        OP_test: OP_test_div,
    };
    for (let id in div_obj) {
        if (id == button_id) {
            div_obj[id].style.display = '';
        } else {
            div_obj[id].style.display = 'none';
        }
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
    if (!global.get_flag('GS_unlock_foraging')) {
        global.set_flag('GS_unlock_foraging', true);
    } else if (!global.get_flag('GS_unlock_fishing')) {
        global.set_flag('GS_unlock_fishing', true);
    } else if (!global.get_flag('GS_unlock_mining')) {
        global.set_flag('GS_unlock_mining', true);
    } else if (!global.get_flag('GS_unlock_logging')) {
        global.set_flag('GS_unlock_logging', true);
    } else if (!global.get_flag('GS_unlock_diving')) {
        global.set_flag('GS_unlock_diving', true);
    } else if (!global.get_flag('GS_unlock_archaeology')) {
        global.set_flag('GS_unlock_archaeology', true);
    } else if (!global.get_flag('GS_unlock_exploration')) {
        global.set_flag('GS_unlock_exploration', true);
    }
    //移动到当前位置，触发刷新界面的逻辑
    let place_manage = global.get_place_manage();
    let now_place = place_manage.get_now_place();
    place_manage.set_now_place(now_place);
}
// 批量给予物品
function give_player_item() {
    // player.Player_get_item('Oak_logs', 10);
    // player.Player_get_item('birch_logs', 10);
    // player.Player_get_item('fir_logs', 10);
    // player.Player_get_item('lightning_bark', 10);
    // player.Player_get_item('frost_marrow_resin', 10);
    // player.Player_get_item('viresilver_stem', 10);
    // player.Player_get_item('porcini', 10);
    // player.Player_get_item('chanterelle', 10);
    // player.Player_get_item('termite_mushroom', 10);
    // player.Player_get_item('river_mussel', 10);
    // player.Player_get_item('creek_fish', 10);
    // player.Player_get_item('animal_raw_meat', 10);
    // player.Player_get_item('red_berry', 10);
    // player.Player_get_item('yellow_berry', 10);
    // player.Player_get_item('grilled_fish', 10);
    // player.Player_get_item('termite_mushroom_soup', 10);
    // player.Player_get_item('fish_jerky', 10);
    // player.Player_get_item('wood_arrow', 10);
    player.Player_get_item('copper_coin', 1);
    // player.Player_get_item('greedy_copper_coin', 10);

    // player.Player_get_item('wood_sword', 6, 'damaged');
    // player.Player_get_item('wood_sword', 6, 'ordinary');
    // player.Player_get_item('wood_sword', 6, 'excellent');
    // player.Player_get_item('wood_sword', 6, 'rare');
    // player.Player_get_item('wood_sword', 6, 'epic');
    // player.Player_get_item('test_boomerang', 1, 'ordinary');
    // player.Player_get_item('test_boomerang', 3, 'excellent');
    // player.Player_get_item('test_boomerang', 5, 'rare');
    // player.Player_get_item('hatchet', 1, 'ordinary');
    // player.Player_get_item('mowing_sickle', 1, 'ordinary');
}
export { create_Game_log };
