import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';
import { show_dropdown_table, change_Game_log_div, change_RA_IE } from '../Function/show_func.js';
import { global } from '../GameRun/global_manage.js';

var Game_log = crtElement('div', 'game_log', null, '');

//创建右下，游戏数据界面中的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    var Game_log_switch = crtElement('div', 'Game_log_switch_div', 'page_flex', '');
    //脑海 mind MD
    var MD_switch_button = addElement(Game_log_switch, 'button', 'MD_switch_button', 'GL_switch_button');
    //图鉴窗口 library IB
    var IB_switch_button = addElement(Game_log_switch, 'button', 'IB_switch_button', 'GL_switch_button');
    MD_switch_button.innerHTML = `脑海`;
    IB_switch_button.innerHTML = `图鉴`;
    //界面下部，具体展示内容的窗口
    var Game_log_value_div = crtElement('div', 'Game_log_value_div', 'page_columns_1', '');
    var MD_div = addElement(Game_log_value_div, 'div', 'MD_div', 'page_columns_12');
    var IB_div = addElement(Game_log_value_div, 'div', 'IB_div', 'page_columns_12', 'none');

    // 脑海（日志）mind MD
    {
        // 左侧的分类下拉表格界面
        {
            var MD_scroll_box = addElement(MD_div, 'div', 'MD_scroll_box', 'overflow_y_div');
            var MD_classification_div = addElement(MD_scroll_box, 'div', 'MD_classification_div', 'classification_div');
            //流水账 running_account RA
            var RA_radio_div = addElement(MD_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(RA_radio_div, `RA_button`, 'MD_switch', `RA_button`, `流水账`);
            RA_radio_div.children[0].checked = true; //初始激活该按钮
            var RA_droptable = addElement(MD_classification_div, 'div', 'RA_droptable', 'dropdown_table');
            var RA_new_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_new_radio_div, `RA_new`, 'RA_switch', `RA_new`, `最新消息`);
            RA_new_radio_div.children[0].checked = true; //初始激活该按钮
            var RA_combat_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_combat_radio_div, `RA_combat`, 'RA_switch', `RA_combat`, `战斗`);
            var RA_item_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_item_radio_div, `RA_item`, 'RA_switch', `RA_item`, `物品`);
            var RA_other_radio_div = addElement(RA_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(RA_other_radio_div, `RA_other`, 'RA_switch', `RA_other`, `其他`);
            //重要事件 important_event IE
            var IE_radio_div = addElement(MD_classification_div, 'div', null, 'radio_div switch_radio_div_1');
            addElement_radio(IE_radio_div, `IE_button`, 'MD_switch', `IE_button`, `重要事件`);
        }
        //右侧具体的内容
        {
            // var MD_value_div = addElement(MD_div, 'div', 'MD_value_div', null);
            //流水账 running_account RA
            var RA_value_scroll_box = addElement(MD_div, 'div', 'RA_value_scroll_box', 'overflow_y_div', '');
            var RA_value_div = addElement(RA_value_scroll_box, 'div', 'RA_value_div', 'classification_div');
            //重要事件 important_event IE
            var IE_value_scroll_box = addElement(MD_div, 'div', 'IE_value_scroll_box', 'overflow_y_div', 'none');
            var IE_value_div = addElement(IE_value_scroll_box, 'div', 'IE_value_div', 'classification_div');
            var main_quest_div = addElement(IE_value_div, 'div', 'main_quest_div', null);
            var all_side_quest_div = addElement(IE_value_div, 'div', 'all_side_quest_div', null);
            var challenge_div = addElement(IE_value_div, 'div', 'challenge_div', null);
        }
    }
    // 图鉴窗口 library IB
    {
        // 左侧的分类下拉表格界面
        var IB_scroll_box = addElement(IB_div, 'div', 'IB_scroll_box', 'overflow_y_div');
        var IB_classification_div = addElement(IB_scroll_box, 'div', 'IB_classification_div', 'classification_div');
        // 全部
        var IB_ALL_button = addElement(IB_classification_div, 'button', 'IB_ALL_button', 'dropdown_button_1');
        IB_ALL_button.innerHTML = `全部`;
        // 物品
        var IB_item_button = addElement(IB_classification_div, 'button', 'IB_item_button', 'dropdown_button_1');
        IB_item_button.innerHTML = `物品`;
        var IB_item_droptable = addElement(IB_classification_div, 'div', 'IB_item_droptable', 'dropdown_table');
        var IB_item_all_button = addElement(IB_item_droptable, 'button', 'IB_item_all_button', 'dropdown_button_2');
        IB_item_all_button.innerHTML = `全部`;
        var IB_item_W_button = addElement(IB_item_droptable, 'button', 'IB_item_W_button', 'dropdown_button_2');
        IB_item_W_button.innerHTML = `武器装备`;
        var IB_item_A_button = addElement(IB_item_droptable, 'button', 'IB_item_A_button', 'dropdown_button_2');
        IB_item_A_button.innerHTML = `消耗品`;
        var IB_item_D_button = addElement(IB_item_droptable, 'button', 'IB_item_D_button', 'dropdown_button_2');
        IB_item_D_button.innerHTML = `材料`;
        //技能
        var IB_skill_button = addElement(IB_classification_div, 'button', 'IB_skill_button', 'dropdown_button_1');
        IB_skill_button.innerHTML = `技能`;
        var IB_skill_droptable = addElement(IB_classification_div, 'div', 'IB_skill_droptable', 'dropdown_table');
        var IB_skill_all_button = addElement(IB_skill_droptable, 'button', 'IB_skill_all_button', 'dropdown_button_2');
        IB_skill_all_button.innerHTML = `全部`;
        var IB_skill_W_button = addElement(IB_skill_droptable, 'button', 'IB_skill_W_button', 'dropdown_button_2');
        IB_skill_W_button.innerHTML = `根基技能`;
        var IB_skill_A_button = addElement(IB_skill_droptable, 'button', 'IB_skill_A_button', 'dropdown_button_2');
        IB_skill_A_button.innerHTML = `战斗技能`;
        var IB_skill_D_button = addElement(IB_skill_droptable, 'button', 'IB_skill_D_button', 'dropdown_button_2');
        IB_skill_D_button.innerHTML = `生活技能`;
        var IB_skill_O_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
        IB_skill_O_button.innerHTML = `主动技能`;
        var IB_skill_B_button = addElement(IB_skill_droptable, 'button', 'IB_skill_O_button', 'dropdown_button_2');
        IB_skill_B_button.innerHTML = `特殊功法`;
        // 敌人
        var IB_enemy_button = addElement(IB_classification_div, 'button', 'IB_enemy_button', 'dropdown_button_1');
        IB_enemy_button.innerHTML = `敌人`;
        var IB_enemy_droptable = addElement(IB_classification_div, 'div', 'IB_enemy_droptable', 'dropdown_table');
        var IB_enemy_all_button = addElement(IB_enemy_droptable, 'button', 'IB_enemy_all_button', 'dropdown_button_2');
        IB_enemy_all_button.innerHTML = `全部`;
        // 事件
        var IB_event_button = addElement(IB_classification_div, 'button', 'IB_event_button', 'dropdown_button_1');
        IB_event_button.innerHTML = `事件`;
        var IB_event_droptable = addElement(IB_classification_div, 'div', 'IB_event_droptable', 'dropdown_table');
        var IB_event_all_button = addElement(IB_event_droptable, 'button', 'IB_event_all_button', 'dropdown_button_2');
        IB_event_all_button.innerHTML = `全部`;
        //
        var IB_value_div = addElement(IB_div, 'div', 'IB_value_div', null);
    }
    // // 生活技能窗口;
    // {
    //     // 左侧的分类下拉表格界面
    //     {
    //         var LVP_scroll_box = addElement(LVP_div, 'div', 'LVP_scroll_box', 'overflow_y_div');
    //         var LVP_classification_div = addElement(
    //             LVP_scroll_box,
    //             'div',
    //             'LVP_classification_div',
    //             'classification_div'
    //         );
    //         // 伐木 Woodcutting WCT
    //         var Woodcutting_radio_div = addElement(
    //             LVP_classification_div,
    //             'div',
    //             null,
    //             'radio_div switch_radio_div_1'
    //         );
    //         addElement_radio(Woodcutting_radio_div, `Woodcutting_button`, 'LVP_switch', `Woodcutting_button`, `伐木`);
    //         // 木雕 Woodcarving WCV
    //         var Woodcarving_radio_div = addElement(
    //             LVP_classification_div,
    //             'div',
    //             null,
    //             'radio_div switch_radio_div_1'
    //         );
    //         addElement_radio(Woodcarving_radio_div, `Woodcarving_button`, 'LVP_switch', `Woodcarving_button`, `木雕`);
    //         // 挖矿 mining MNG
    //         var mining_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
    //         addElement_radio(mining_radio_div, `mining_button`, 'LVP_switch', `mining_button`, `挖矿`);
    //         // 考古 Archaeology ACO
    //         var Archaeology_radio_div = addElement(
    //             LVP_classification_div,
    //             'div',
    //             null,
    //             'radio_div switch_radio_div_1'
    //         );
    //         addElement_radio(Archaeology_radio_div, `Archaeology_button`, 'LVP_switch', `Archaeology_button`, `考古`);
    //         // 采集 collection CLC
    //         var collection_radio_div = addElement(
    //             LVP_classification_div,
    //             'div',
    //             null,
    //             'radio_div switch_radio_div_1'
    //         );
    //         addElement_radio(collection_radio_div, `collection_button`, 'LVP_switch', `collection_button`, `采集`);
    //         // 探索 explore
    //         var explore_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
    //         addElement_radio(explore_radio_div, `explore_button`, 'LVP_switch', `explore_button`, `探索`);
    //         // 钓鱼 fishing
    //         var fishing_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
    //         addElement_radio(fishing_radio_div, `fishing_button`, 'LVP_switch', `fishing_button`, `钓鱼`);
    //         // 潜水 diving
    //         var diving_radio_div = addElement(LVP_classification_div, 'div', null, 'radio_div switch_radio_div_1');
    //         addElement_radio(diving_radio_div, `diving_button`, 'LVP_switch', `diving_button`, `潜水`);
    //     }
    //     //
    //     var LVP_value_div = addElement(LVP_div, 'div', 'LVP_value_div', null);
    //     //自动恢复规划 Auto_recovery_plan ARP
    //     var ARP_value_scroll_box = addElement(LVP_div, 'div', 'ARP_value_scroll_box', 'overflow_y_div', 'none');
    //     var ARP_value_div = addElement(ARP_value_scroll_box, 'div', 'ARP_value_div', 'classification_div');
    // }
    // // 创造合成窗口
    // {
    // }

    //组件放入游戏数据界面中
    Game_log.appendChild(Game_log_switch);
    Game_log.appendChild(Game_log_value_div);
}

// 为组件添加触发事件
{
    //切换脑海、图鉴的按钮
    MD_switch_button.onclick = function () {
        change_Game_log_div(this.id);
    };
    IB_switch_button.onclick = function () {
        change_Game_log_div(this.id);
    };
    //选择脑海界面的具体功能
    let radios = MD_div.querySelectorAll('input[type="radio"][name="MD_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'RA_button') {
                //针对流水账按钮，按下之后打开流水账的过滤按钮
                show_dropdown_table('MD_classification_div', 'RA_droptable');
                //激活“最新消息”分类
                RA_new_radio_div.children[0].checked = true;
            } else {
                show_dropdown_table('MD_classification_div');
            }
            // 流水账与重要事件的切换
            change_RA_IE(this.id);
        });
    });

    //选择脑海流水账功能的过滤条件
    radios = MD_div.querySelectorAll('input[type="radio"][name="RA_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            let global_flag_manage = global.get_global_flag_manage();
            global_flag_manage.show_game_log_status(this.id);
        });
    });

    IB_item_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_item_droptable');
    };
    IB_skill_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_skill_droptable');
    };
    IB_enemy_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_enemy_droptable');
    };
    IB_event_button.onclick = function () {
        show_dropdown_table('IB_classification_div', 'IB_event_droptable');
    };
}

export { Game_log };
