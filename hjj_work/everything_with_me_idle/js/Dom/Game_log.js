import { crtElement, addElement, addElement_radio, addElement_select } from '../Function/Dom_function.js';
import { save_game, save_game_show_tip, delete_save_show_tip, load_save_show_tip } from '../LoadAndSave/load.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { global } from '../GameRun/global_manage.js';
import { make_test_div, set_test_button } from './Game_log_test.js';

//是否开启测试按钮
var TEST_DIV_FLAG = true;
//创建右下游戏日志界面
function create_Game_log() {
    let Game_log = crtElement('div', 'game_log', null, '');
    make_Game_log_div(Game_log);
    set_Game_log_button(Game_log);
    return Game_log;
}

//创建右下，游戏数据界面中的详细组件
function make_Game_log_div(Game_log) {
    //界面上部，区分当前展示的内容的按钮
    var Game_log_switch_div = crtElement('div', 'Game_log_switch_div', 'page_flex', '');
    //脑海 mind MD
    var MD_switch_radio_div = addElement(Game_log_switch_div, 'div', 'MD_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(MD_switch_radio_div, 'MD_switch_button', 'Game_log_switch', 'MD_switch', '脑海');
    MD_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //图鉴窗口 library IB
    var IB_switch_radio_div = addElement(Game_log_switch_div, 'div', null, 'radio_div div_switch_button');
    addElement_radio(IB_switch_radio_div, 'IB_switch_button', 'Game_log_switch', 'IB_switch', '图鉴');
    //测试窗口 test TS
    if (typeof TEST_DIV_FLAG !== 'undefined' && TEST_DIV_FLAG) {
        var TS_switch_radio_div = addElement(Game_log_switch_div, 'div', null, 'radio_div div_switch_button');
        addElement_radio(TS_switch_radio_div, 'TS_switch_button', 'Game_log_switch', 'TS_switch', '测试');
    }

    //界面下部，具体展示内容的窗口
    var Game_log_value_div = crtElement('div', 'Game_log_value_div', 'page_columns_1', '');
    // 脑海（日志）mind MD
    var MD_div = addElement(Game_log_value_div, 'div', 'MD_div', 'page_columns_12');
    make_mind_div(MD_div);
    // 图鉴窗口 library IB
    var IB_div = addElement(Game_log_value_div, 'div', 'IB_div', 'page_columns_12', 'none');
    make_library_div(IB_div);
    // 测试窗口 test TS
    if (typeof TEST_DIV_FLAG !== 'undefined' && TEST_DIV_FLAG) {
        var TS_div = addElement(Game_log_value_div, 'div', 'TS_div', 'page_columns_12', 'none');
        make_test_div(TS_div);
    }

    //组件放入游戏数据界面中
    Game_log.appendChild(Game_log_switch_div);
    Game_log.appendChild(Game_log_value_div);
}
//生成脑海部分界面
function make_mind_div(MD_div) {
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
        // var OP_test_radio_div = addElement(OP_droptable, 'div', null, 'radio_div switch_radio_div_2');
        // addElement_radio(OP_test_radio_div, 'OP_test', 'OP_switch', 'OP_test', '测试');
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
                addElement_select(OP_game_OptionTipText_value, 'OP_game_OptionTipText', null, 'OP_select', '设置提示文本', '默认', '以我为尊');
                //设置-游戏设置-游戏运行帧率
                var OP_game_FPS_div = addElement(OP_game_div, 'div', 'OP_game_FPS_div', 'OP_TLV_div');
                var OP_game_FPS_lable = addElement(OP_game_FPS_div, 'div', 'OP_game_FPS_lable', 'OP_T2_div');
                OP_game_FPS_lable.innerHTML = '游戏运行帧率';
                var OP_game_FPS_value = addElement(OP_game_FPS_div, 'div', 'OP_game_FPS_value', 'OP_V_div');
                addElement_select(OP_game_FPS_value, 'OP_game_FPS', null, 'OP_select', '帧率选择', 30, 60);
                //设置-游戏设置-流水账界面日志保存数量上限
                var OP_game_RASaveLogMax_div = addElement(OP_game_div, 'div', 'OP_game_RASaveLogMax_div', 'OP_TLV_div');
                var OP_game_RASaveLogMax_lable = addElement(OP_game_RASaveLogMax_div, 'div', 'OP_game_RASaveLogMax_lable', 'OP_T2_div');
                OP_game_RASaveLogMax_lable.innerHTML = '流水账界面日志保存数量上限';
                var OP_game_RASaveLogMax_value = addElement(OP_game_RASaveLogMax_div, 'div', 'OP_game_RASaveLogMax_value', 'OP_V_div');
                addElement_select(
                    OP_game_RASaveLogMax_value,
                    'OP_game_RASaveLogMax',
                    null,
                    'OP_select',
                    '流水账界面日志保存数量上限',
                    '10',
                    '15',
                    '20',
                    '30',
                    '50'
                );
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
        }
    }
}
//生成图鉴部分界面
function make_library_div(IB_div) {
    // 左侧的分类下拉表格界面
    {
        var IB_scroll_box = addElement(IB_div, 'div', 'IB_scroll_box', 'overflow_y_div');
        var IB_switch_div = addElement(IB_scroll_box, 'div', 'IB_switch_div', 'in_overflow_div');

        // 全部
        var IB_ALL_radio_div = addElement(IB_switch_div, 'div', 'IB_ALL_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_ALL_radio_div, 'IB_all', 'IB_switch', 'IB_all', '全部');
        //默认激活"全部"过滤条件
        IB_ALL_radio_div.children[0].checked = true;

        //物品 item I
        var IB_item_radio_div = addElement(IB_switch_div, 'div', 'IB_item_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_item_radio_div, 'IB_item_button', 'IB_1_switch', 'IB_item_button', '物品');
        var IB_item_droptable = addElement(IB_switch_div, 'div', 'IB_item_droptable', 'dropdown_table');
        var IB_item_all_radio_div = addElement(IB_item_droptable, 'div', 'IB_item_all_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_item_all_radio_div, 'IB_item_all', 'IB_switch', 'IB_item_all', '全部');
        var IB_item_E_radio_div = addElement(IB_item_droptable, 'div', 'IB_item_E_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_item_E_radio_div, 'IB_item_E', 'IB_switch', 'IB_item_E', '武器装备');
        var IB_item_C_radio_div = addElement(IB_item_droptable, 'div', 'IB_item_C_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_item_C_radio_div, 'IB_item_A', 'IB_switch', 'IB_item_C', '消耗品');
        var IB_item_M_radio_div = addElement(IB_item_droptable, 'div', 'IB_item_M_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_item_M_radio_div, 'IB_item_M', 'IB_switch', 'IB_item_M', '材料物品');

        //技能 skill S
        var IB_skill_radio_div = addElement(IB_switch_div, 'div', 'IB_skill_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_skill_radio_div, 'IB_skill_button', 'IB_1_switch', 'IB_skill_button', '技能');
        var IB_skill_droptable = addElement(IB_switch_div, 'div', 'IB_skill_droptable', 'dropdown_table');
        var IB_skill_all_radio_div = addElement(IB_skill_droptable, 'div', 'IB_skill_all_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_skill_all_radio_div, 'IB_skill_all', 'IB_switch', 'IB_skill_all', '全部');

        var IB_skill_B_radio_div = addElement(IB_skill_droptable, 'div', 'IB_skill_B_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_skill_B_radio_div, 'IB_skill_B', 'IB_switch', 'IB_skill_B', '根基技能');

        var IB_skill_C_radio_div = addElement(IB_skill_droptable, 'div', 'IB_skill_C_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_skill_C_radio_div, 'IB_skill_C', 'IB_2_switch', 'IB_skill_C', '战斗技能');
        var IB_skill_C_droptable = addElement(IB_skill_droptable, 'div', 'IB_skill_C_droptable', 'dropdown_table');
        var IB_skill_C_all_radio_div = addElement(IB_skill_C_droptable, 'div', 'IB_skill_C_all_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_C_all_radio_div, 'IB_skill_C_all', 'IB_switch', 'open_2_switch', '全部');
        var IB_skill_C_W_radio_div = addElement(IB_skill_C_droptable, 'div', 'IB_skill_C_W_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_C_W_radio_div, 'IB_skill_C_W', 'IB_switch', 'open_2_switch', '武器精通技能');
        var IB_skill_C_Env_radio_div = addElement(IB_skill_C_droptable, 'div', 'IB_skill_C_Env_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_C_Env_radio_div, 'IB_skill_C_Env', 'IB_switch', 'open_2_switch', '环境适应技能');
        var IB_skill_C_Ene_radio_div = addElement(IB_skill_C_droptable, 'div', 'IB_skill_C_Ene_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_C_Ene_radio_div, 'IB_skill_C_Ene', 'IB_switch', 'open_2_switch', '对敌精通技能');

        var IB_skill_L_radio_div = addElement(IB_skill_droptable, 'div', 'IB_skill_L_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_skill_L_radio_div, 'IB_skill_L', 'IB_2_switch', 'IB_skill_L', '生活技能');
        var IB_skill_L_droptable = addElement(IB_skill_droptable, 'div', 'IB_skill_L_droptable', 'dropdown_table');
        var IB_skill_L_all_radio_div = addElement(IB_skill_L_droptable, 'div', 'IB_skill_L_all_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_L_all_radio_div, 'IB_skill_L_all', 'IB_switch', 'open_2_switch', '全部');
        var IB_skill_L_Raw_radio_div = addElement(IB_skill_L_droptable, 'div', 'IB_skill_L_Raw_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_L_Raw_radio_div, 'IB_skill_L_Raw', 'IB_switch', 'open_2_switch', '原料获取技能');
        var IB_skill_L_P_radio_div = addElement(IB_skill_L_droptable, 'div', 'IB_skill_L_P_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_L_P_radio_div, 'IB_skill_L_P', 'IB_switch', 'open_2_switch', '原料加工技能');
        var IB_skill_L_F_radio_div = addElement(IB_skill_L_droptable, 'div', 'IB_skill_L_F_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_L_F_radio_div, 'IB_skill_L_F', 'IB_switch', 'open_2_switch', '成品使用技能');
        var IB_skill_L_Rec_radio_div = addElement(IB_skill_L_droptable, 'div', 'IB_skill_L_Rec_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_L_Rec_radio_div, 'IB_skill_L_Rec', 'IB_switch', 'open_2_switch', '回收利用技能');

        var IB_skill_A_radio_div = addElement(IB_skill_droptable, 'div', 'IB_skill_A_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_skill_A_radio_div, 'IB_skill_A', 'IB_2_switch', 'IB_skill_A', '主动技能');
        var IB_skill_A_droptable = addElement(IB_skill_droptable, 'div', 'IB_skill_A_droptable', 'dropdown_table');
        var IB_skill_A_all_radio_div = addElement(IB_skill_A_droptable, 'div', 'IB_skill_A_all_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_A_all_radio_div, 'IB_skill_A_all', 'IB_switch', 'open_2_switch', '全部');
        var IB_skill_A_A_radio_div = addElement(IB_skill_A_droptable, 'div', 'IB_skill_A_A_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_A_A_radio_div, 'IB_skill_A_A', 'IB_switch', 'open_2_switch', '可攻击的技能');
        var IB_skill_A_D_radio_div = addElement(IB_skill_A_droptable, 'div', 'IB_skill_A_D_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_A_D_radio_div, 'IB_skill_A_D', 'IB_switch', 'open_2_switch', '可防御的技能');
        var IB_skill_A_R_radio_div = addElement(IB_skill_A_droptable, 'div', 'IB_skill_A_R_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_A_R_radio_div, 'IB_skill_A_R', 'IB_switch', 'open_2_switch', '可恢复的技能');
        var IB_skill_A_F_radio_div = addElement(IB_skill_A_droptable, 'div', 'IB_skill_A_F_radio_div', 'radio_div switch_radio_div_3');
        addElement_radio(IB_skill_A_F_radio_div, 'IB_skill_A_F', 'IB_switch', 'open_2_switch', '可辅助的技能');
        //敌人 enemy E
        var IB_enemy_radio_div = addElement(IB_switch_div, 'div', 'IB_enemy_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_enemy_radio_div, 'IB_enemy_button', 'IB_1_switch', 'IB_enemy_button', '敌人');
        var IB_enemy_droptable = addElement(IB_switch_div, 'div', 'IB_enemy_droptable', 'dropdown_table');
        var IB_enemy_N_radio_div = addElement(IB_enemy_droptable, 'div', 'IB_enemy_N_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_enemy_N_radio_div, 'IB_enemy_N', 'IB_switch', 'IB_enemy_N', '战斗敌人');
        var IB_enemy_T_radio_div = addElement(IB_enemy_droptable, 'div', 'IB_enemy_T_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_enemy_T_radio_div, 'IB_enemy_T', 'IB_switch', 'IB_enemy_T', '伐木“敌人”');
        var IB_enemy_F_radio_div = addElement(IB_enemy_droptable, 'div', 'IB_enemy_F_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_enemy_F_radio_div, 'IB_enemy_F', 'IB_switch', 'IB_enemy_F', '钓鱼“敌人”');
        var IB_enemy_O_radio_div = addElement(IB_enemy_droptable, 'div', 'IB_enemy_O_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_enemy_O_radio_div, 'IB_enemy_O', 'IB_switch', 'IB_enemy_O', '挖矿“敌人”');
        //事件 event E
        var IB_event_radio_div = addElement(IB_switch_div, 'div', 'IB_event_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_event_radio_div, 'IB_event_button', 'IB_1_switch', 'IB_event_button', '事件');
        var IB_event_droptable = addElement(IB_switch_div, 'div', 'IB_event_droptable', 'dropdown_table');
        var IB_event_MQ_radio_div = addElement(IB_event_droptable, 'div', 'IB_event_MQ_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_event_MQ_radio_div, 'IB_event_MQ', 'IB_switch', 'IB_event_MQ', '主线任务');
        var IB_event_SQ_radio_div = addElement(IB_event_droptable, 'div', 'IB_event_SQ_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_event_SQ_radio_div, 'IB_event_SQ', 'IB_switch', 'IB_event_SQ', '支线任务');
        var IB_event_CL_radio_div = addElement(IB_event_droptable, 'div', 'IB_event_CL_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_event_CL_radio_div, 'IB_event_CL', 'IB_switch', 'IB_event_CL', '挑战');
        var IB_event_AM_radio_div = addElement(IB_event_droptable, 'div', 'IB_event_AM_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_event_AM_radio_div, 'IB_event_AM', 'IB_switch', 'IB_event_AM', '成就');

        //游戏机制 rule R
        var IB_rule_radio_div = addElement(IB_switch_div, 'div', 'IB_rule_radio_div', 'radio_div switch_radio_div_1');
        addElement_radio(IB_rule_radio_div, 'IB_rule_button', 'IB_1_switch', 'IB_rule_button', '游戏机制');
        var IB_rule_droptable = addElement(IB_switch_div, 'div', 'IB_rule_droptable', 'dropdown_table');
        var IB_rule_TYPE1_radio_div = addElement(IB_rule_droptable, 'div', 'IB_rule_TYPE1_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_rule_TYPE1_radio_div, 'IB_rule_MQ', 'IB_switch', 'IB_rule_MQ', '机制分类1');
        var IB_rule_TYPE2_radio_div = addElement(IB_rule_droptable, 'div', 'IB_rule_TYPE2_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_rule_TYPE2_radio_div, 'IB_rule_SQ', 'IB_switch', 'IB_rule_SQ', '机制分类2');
        var IB_rule_TYPE3_radio_div = addElement(IB_rule_droptable, 'div', 'IB_rule_TYPE3_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_rule_TYPE3_radio_div, 'IB_rule_CL', 'IB_switch', 'IB_rule_CL', '机制分类3');
        var IB_rule_TYPE4_radio_div = addElement(IB_rule_droptable, 'div', 'IB_rule_TYPE4_radio_div', 'radio_div switch_radio_div_2');
        addElement_radio(IB_rule_TYPE4_radio_div, 'IB_rule_AM', 'IB_switch', 'IB_rule_AM', '机制分类4');
    }
    //右侧图鉴内容
    {
        //选择界面
        var IB_select_div = addElement(IB_div, 'div', 'IB_select_div', null);

        //可滚动区域
        var IB_select_scroll_box = addElement(IB_select_div, 'div', 'IB_select_scroll_box', 'overflow_y_div');
        var IB_select_content_div = addElement(IB_select_scroll_box, 'div', 'IB_select_content_div', 'in_overflow_div');
        //6个章节的标题+按钮网格
        var chapterNames = ['一', '二', '三', '四', '五', '六'];
        for (let c = 0; c < 6; c++) {
            //章节标题
            var chapter_title = addElement(IB_select_content_div, 'div', null, 'IB_chapter_title');
            chapter_title.textContent = '第' + chapterNames[c] + '章';

            //按钮网格，每行3个
            var chapter_grid = addElement(IB_select_content_div, 'div', null, 'IB_chapter_grid');
            for (let b = 1; b <= 10; b++) {
                var chapter_button = addElement(chapter_grid, 'button', null, 'IB_select_button');
                chapter_button.textContent = '第' + chapterNames[c] + '章按钮' + b;
            }
        }

        //内容界面
        var IB_value_div = addElement(IB_div, 'div', 'IB_value_div', null, 'none');
        //上半部分：导航栏，高度与switch_radio_div_1一致
        var IB_nav_div = addElement(IB_value_div, 'div', 'IB_nav_div', 'page_flex');
        var IB_back_button = addElement(IB_nav_div, 'button', 'IB_back_button', null);
        IB_back_button.innerHTML = '<--返回';
        var IB_prev_button = addElement(IB_nav_div, 'button', 'IB_prev_button', 'IB_value_button');
        IB_prev_button.innerHTML = '<--上一条';
        var IB_next_button = addElement(IB_nav_div, 'button', 'IB_next_button', 'IB_value_button');
        IB_next_button.innerHTML = '下一条-->';
        //下半部分：可滚动的图鉴内容区域，占据剩余空间
        var IB_value_scroll_box = addElement(IB_value_div, 'div', 'IB_value_scroll_box', 'overflow_y_div');
        var IB_content_div = addElement(IB_value_scroll_box, 'div', 'IB_content_div', 'in_overflow_div');
        for (let i = 0; i < 20; i++) {
            let test_text = addElement(IB_content_div, 'div', null, null);
            test_text.innerHTML = '文本' + i;
        }
    }
}

// 为组件添加触发事件
function set_Game_log_button(Game_log) {
    //切换脑海、图鉴的按钮
    let radios = Game_log.querySelectorAll('input[type="radio"][name="Game_log_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Game_log_div(this.id);
        });
    });
    //脑海中的组件
    set_mind_button(Game_log);
    //图鉴中的组件
    set_library_button(Game_log);
    //测试中的组件
    if (typeof TEST_DIV_FLAG !== 'undefined' && TEST_DIV_FLAG) {
        set_test_button(Game_log);
    }
}
//设置脑海子功能中的按钮触发事件
function set_mind_button(Game_log) {
    //选择脑海界面的具体功能
    let radios = Game_log.querySelectorAll('input[type="radio"][name="MD_switch"]');
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

    //给脑海-设置里用select下拉框的每个选项添加触发函数
    let selects = Game_log.querySelectorAll('[name="OP_select"]');
    selects.forEach((select) => {
        select.addEventListener('change', function (event) {
            let new_set = event.target.value;
            let option_type = this.id;
            global.set_flag(option_type, new_set);
        });
    });
    //设置界面中的按钮
    {
        //导出存档
        let OP_game_Save_button = Game_log.querySelector('#OP_game_Save_button');
        OP_game_Save_button.onclick = function () {
            //保存游戏
            save_game();
            //弹出含有当前存档的提示框
            save_game_show_tip();
            //添加存档成功的日志
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.set_game_log('save_game', 'manual');
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
    }
}
//设置图鉴子功能中的按钮触发事件
function set_library_button(Game_log) {
    //图鉴界面1级分类按钮，物品、技能、敌人
    let radios = Game_log.querySelectorAll('input[type="radio"][name="IB_1_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'IB_item_button') {
                let IB_item_all_radio_div = document.getElementById('IB_item_all_radio_div');
                IB_item_all_radio_div.children[0].checked = true;
                show_dropdown_table('IB_switch_div', 'IB_item_droptable');
            } else if (this.id == 'IB_skill_button') {
                let IB_skill_all_radio_div = document.getElementById('IB_skill_all_radio_div');
                IB_skill_all_radio_div.children[0].checked = true;
                show_dropdown_table('IB_switch_div', 'IB_skill_droptable');
            } else if (this.id == 'IB_enemy_button') {
                let IB_enemy_N_radio_div = document.getElementById('IB_enemy_N_radio_div');
                IB_enemy_N_radio_div.children[0].checked = true;
                show_dropdown_table('IB_switch_div', 'IB_enemy_droptable');
            } else if (this.id == 'IB_event_button') {
                let IB_event_MQ_radio_div = document.getElementById('IB_event_MQ_radio_div');
                IB_event_MQ_radio_div.children[0].checked = true;
                show_dropdown_table('IB_switch_div', 'IB_event_droptable');
            } else if (this.id == 'IB_rule_button') {
                let IB_rule_TYPE1_radio_div = document.getElementById('IB_rule_TYPE1_radio_div');
                IB_rule_TYPE1_radio_div.children[0].checked = true;
                show_dropdown_table('IB_switch_div', 'IB_rule_droptable');
            }
            //关闭2级分类按钮
            const radios = document.querySelectorAll('input[name="IB_2_switch"]');
            for (const radio of radios) {
                radio.checked = false;
            }
        });
    });
    //图鉴界面2级分类按钮
    radios = Game_log.querySelectorAll('input[type="radio"][name="IB_2_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'IB_skill_C') {
                let IB_skill_C_all_radio_div = document.getElementById('IB_skill_C_all_radio_div');
                IB_skill_C_all_radio_div.children[0].checked = true;
                show_dropdown_table('IB_skill_droptable', 'IB_skill_C_droptable');
            } else if (this.id == 'IB_skill_L') {
                let IB_skill_L_all_radio_div = document.getElementById('IB_skill_L_all_radio_div');
                IB_skill_L_all_radio_div.children[0].checked = true;
                show_dropdown_table('IB_skill_droptable', 'IB_skill_L_droptable');
            } else if (this.id == 'IB_skill_A') {
                let IB_skill_A_all_radio_div = document.getElementById('IB_skill_A_all_radio_div');
                IB_skill_A_all_radio_div.children[0].checked = true;
                show_dropdown_table('IB_skill_droptable', 'IB_skill_A_droptable');
            }
            // let P_All_Skills = player.get_player_All_Skills();
            // P_All_Skills.updata_PSK_value();
        });
    });
    //图鉴内每种最小分类按钮
    radios = Game_log.querySelectorAll('input[type="radio"][name="IB_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'IB_all') {
                //针对图鉴界面的“全部”按钮，额外新增关闭其他下拉框的功能
                show_dropdown_table('IB_switch_div');
                //额外关闭所有1级2级分类按钮
                const radios = document.querySelectorAll('input[name="IB_1_switch"]');
                for (const radio of radios) {
                    radio.checked = false;
                }
                radios = document.querySelectorAll('input[name="IB_2_switch"]');
                for (const radio of radios) {
                    radio.checked = false;
                }
            }
            //部分最小分类按钮要关闭所有2级分类按钮，并且关闭所属下拉框内的所有子下拉框
            let open_2_skill_C_id = ['IB_skill_all', 'IB_skill_B', 'IB_skill_A', 'IB_skill_SS'];
            if (open_2_skill_C_id.includes(this.id)) {
                show_dropdown_table('IB_skill_droptable');
                radios = document.querySelectorAll('input[name="IB_2_switch"]');
                for (const radio of radios) {
                    radio.checked = false;
                }
            }
        });
    });
}

//切换游戏数据界面中的脑海、图鉴界面的按钮
function change_Game_log_div(button_id) {
    if (typeof TEST_DIV_FLAG !== 'undefined' && TEST_DIV_FLAG) {
        const MD_div = document.getElementById('MD_div');
        const IB_div = document.getElementById('IB_div');
        const TS_div = document.getElementById('TS_div');
        if (button_id == 'MD_switch_button') {
            MD_div.style.display = '';
            IB_div.style.display = 'none';
            TS_div.style.display = 'none';
        }
        if (button_id == 'IB_switch_button') {
            MD_div.style.display = 'none';
            IB_div.style.display = '';
            TS_div.style.display = 'none';
        }
        if (button_id == 'TS_switch_button') {
            MD_div.style.display = 'none';
            IB_div.style.display = 'none';
            TS_div.style.display = '';
        }
    } else {
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
//按下游戏日志中，脑海-设置的子分类按钮之后，切换到设置界面对应的子界面
function change_game_log_OP_div(button_id) {
    const OP_game_div = document.getElementById('OP_game_div');
    const OP_picture_div = document.getElementById('OP_picture_div');
    const OP_music_div = document.getElementById('OP_music_div');
    let div_obj = {
        OP_game: OP_game_div, //
        OP_picture: OP_picture_div,
        OP_music: OP_music_div,
    };
    for (let id in div_obj) {
        if (id == button_id) {
            div_obj[id].style.display = '';
        } else {
            div_obj[id].style.display = 'none';
        }
    }
}

export { create_Game_log };
