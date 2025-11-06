import { crtElement, addElement, addElement_radio, add_show_Tooltip } from '../Function/Dom_function.js';
import { updata_player_name, updata_player_EQP } from '../Function/Updata_func.js';
import { show_dropdown_table } from '../Function/show_func.js';
import { player } from '../Player/Player.js';

//创建左上角色状态界面
function create_player_status() {
    let player_status = crtElement('div', 'player_status', null, '');
    make_player_status_div(player_status);
    set_player_status_button(player_status);
    return player_status;
}

//创建左上角，角色状态界面内的详细组件
function make_player_status_div(player_status) {
    //界面上部，区分当前展示的内容的按钮
    var player_status_switch = crtElement('div', 'player_status_switch_div', null, '');
    //属性 player_attribute PAB
    var PAB_switch_radio_div = addElement(player_status_switch, 'div', 'PAB_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(PAB_switch_radio_div, 'PAB_switch_button', 'player_status_switch', 'PAB_switch', '属性');
    PAB_switch_radio_div.children[0].checked = true; //初始激活该按钮
    //技能 player_skill PSK
    var PSK_switch_radio_div = addElement(player_status_switch, 'div', 'PSK_switch_radio_div', 'radio_div div_switch_button');
    addElement_radio(PSK_switch_radio_div, 'PSK_switch_button', 'player_status_switch', 'PSK_switch', '技能');
    //界面下部，具体展示内容的窗口
    var player_status_value_div = crtElement('div', 'player_status_value_div', 'page_columns_1', '');
    var PAB_div = addElement(player_status_value_div, 'div', 'PAB_div', 'PAB_div');
    var PSK_div = addElement(player_status_value_div, 'div', 'PSK_div', 'page_columns_12', 'none');

    //角色属性窗口
    {
        //展示角色血条和名称的布局;
        var bar_div = crtElement('div', 'bar_div', null, '');
        //角色名
        var Player_name_div = addElement(bar_div, 'div', 'Player_name_div', null); //血条中，条的外框
        var Player_name = addElement(Player_name_div, 'input', 'Player_name', null); //血条中，条的外框
        Player_name.type = 'text';
        Player_name.value = '玩家';
        //血条组件
        var HP_bar = addElement(bar_div, 'div', 'HP_bar', 'progress_bar', '');
        var HP_frame = addElement(HP_bar, 'div', 'HP_frame', 'progress_bar_frame'); //血条中，条的外框
        var HP_current = addElement(HP_frame, 'div', 'HP_current', 'progress_bar_current'); //血条中央，长度随当前血量变化的色块
        var HP_number = addElement(HP_bar, 'div', 'HP_number', 'progress_bar_number'); //血条上显示的数字，表示当前血量具体数值
        //蓝条组件
        var MP_bar = addElement(bar_div, 'div', 'MP_bar', 'progress_bar', '');
        var MP_frame = addElement(MP_bar, 'div', 'MP_frame', 'progress_bar_frame'); //条的外框
        var MP_current = addElement(MP_frame, 'div', 'MP_current', 'progress_bar_current'); //长度随当前蓝量变化的色块
        var MP_number = addElement(MP_bar, 'div', 'MP_number', 'progress_bar_number'); //显示的数字，表示当前蓝量具体数值
        //精力组件
        var ENP_ui_div = addElement(bar_div, 'div', 'ENP_ui_div', null, '');
        var ENP_number = addElement(ENP_ui_div, 'div', 'ENP_number', null); //显示的数字，表示当前精力具体数值
        ENP_number.innerHTML = '精力：100%';
        var ENP_bar = addElement(ENP_ui_div, 'div', 'ENP_bar', null); //显示的数字，表示当前精力具体数值
        var deep_ENP_current = addElement(ENP_bar, 'div', 'deep_ENP_current', null); //深层精力条
        var surface_ENP_current = addElement(ENP_bar, 'div', 'surface_ENP_current', null); //表层精力条
        var ENP_threshold_25 = addElement(ENP_bar, 'div', 'ENP_threshold_25', 'threshold'); //25%精力阈值
        ENP_threshold_25.style.left = '25%';
        var ENP_threshold_50 = addElement(ENP_bar, 'div', 'ENP_threshold_50', 'threshold'); //50%精力阈值
        ENP_threshold_50.style.left = '50%';
        var ENP_threshold_100 = addElement(ENP_bar, 'div', 'ENP_threshold_100', 'threshold'); //100%精力阈值
        ENP_threshold_100.style.left = '99%';

        //容纳玩家属性、玩家buff、玩家装备的布局
        var player_status_div = crtElement('div', 'player_status_div', null, '');
        //属性展示组件
        var attribute_show = addElement(player_status_div, 'div', 'attribute_show', null, '');
        var combat_attribute_show = addElement(attribute_show, 'div', 'combat_attribute_show', null);
        var Player_attribute_show = addElement(attribute_show, 'div', 'Player_attribute_show', null);
        for (let i = 0; i < 10; i++) {
            let test1 = addElement(combat_attribute_show, 'div', null, 'state_show'); //条的外框
            let test2 = addElement(Player_attribute_show, 'div', null, 'state_show'); //条的外框
            if (i >= 9) {
                test1.innerText = '测试\n测试';
                test2.innerText = '测试\n测试';
                // test.innerHTML = '测试\n测试';
            }
        }
        //buff展示组件
        var buff_show_scroll_box = addElement(player_status_div, 'div', 'buff_show_scroll_box', 'overflow_y_div');
        var buff_show_div = addElement(buff_show_scroll_box, 'div', null, 'in_overflow_div', '');
        var game_time_buff_show_div = addElement(buff_show_div, 'div', 'game_time_buff_show_div', '', '');
        // for (let i = 0; i < 31; i++) {
        //     var test_buff = addElement(game_time_buff_show_div, 'div', null, 'buff_show');
        //     test_buff.innerHTML = '测试测试测试<br>测试';
        // }
        var combat_round_buff_show_div = addElement(buff_show_div, 'div', 'combat_round_buff_show_div', '', '');
        // for (let i = 0; i < 32; i++) {
        //     var test_buff = addElement(combat_round_buff_show_div, 'div', null, 'buff_show');
        //     test_buff.innerHTML = '测试测试测试<br>测试';
        // }

        //角色装备栏
        var equipment_show = addElement(player_status_div, 'div', 'equipment_show', 'page_columns_1', 'none');
        for (let i = 0; i < 4; i++) {
            let column_id = 'EQP_column_' + (i + 1);
            var EQP_i = addElement(equipment_show, 'div', column_id, 'page_columns_11', '');
            var EQP_left = addElement(EQP_i, 'div', null, 'page_columns_111', ''); //装备栏左侧，角色的4个防具和主副手
            var EQP_arms_div = addElement(EQP_left, 'div', null, 'EQP_arms_div', '');
            var EQP_Armor_div = addElement(EQP_left, 'div', null, 'EQP_Armor_div', '');
            var EQP_deputy_div = addElement(EQP_left, 'div', null, 'EQP_deputy_div', '');
            addElement(EQP_arms_div, 'div', null, 'hand_EQP_show', '');
            for (let j = 0; j < 4; j++) {
                addElement(EQP_Armor_div, 'div', null, 'EQP_show', '');
            }
            addElement(EQP_deputy_div, 'div', null, 'hand_EQP_show', '');
            var EQP_right = addElement(EQP_i, 'div', null, 'page_columns_11', ''); //装备栏右侧，饰品和饰品槽
        }

        //切换属性、buff、装备栏的按钮
        var Player_attr_switch_div = crtElement('div', 'Player_attr_switch_div', null, '');
        var PA_switch_div = addElement(Player_attr_switch_div, 'div', 'PA_switch_div', null);
        var player_attr_switch_radio_div = addElement(PA_switch_div, 'div', 'player_attr_switch_radio_div', 'PA_switch_radio_div');
        addElement_radio(player_attr_switch_radio_div, 'player_attr', 'PA_switch', 'player_attr', '属性\n展示');
        player_attr_switch_radio_div.children[0].checked = true;
        var buff_switch_radio_div = addElement(PA_switch_div, 'div', 'buff_switch_radio_div', 'PA_switch_radio_div');
        addElement_radio(buff_switch_radio_div, 'player_buff', 'PA_switch', 'player_buff', 'buff\n展示');
        var EQP_switch_radio_div = addElement(PA_switch_div, 'div', 'EQP_switch_radio_div', 'PA_switch_radio_div');
        addElement_radio(EQP_switch_radio_div, 'player_EQP', 'PA_switch', 'player_EQP', '装备\n展示');
        //多个装备栏选择按钮
        var EQP_switch_div = addElement(Player_attr_switch_div, 'div', 'EQP_switch_div', null);
        for (let i = 0; i < 4; i++) {
            let EQP_switch_radio_div = addElement(EQP_switch_div, 'div', null, 'PA_switch_radio_div');
            let id = 'EQP_' + (i + 1);
            let value = 'EQP_column_' + (i + 1);
            let text = '装备栏\n' + (i + 1);
            addElement_radio(EQP_switch_radio_div, id, 'EQP_switch', value, text);
        }
        //默认激活第一个装备栏
        EQP_switch_div.children[0].children[0].checked = true;
        //组件放入角色属性装备界面中
        PAB_div.appendChild(bar_div);
        PAB_div.appendChild(player_status_div);
        PAB_div.appendChild(Player_attr_switch_div);
    }
    //角色技能窗口
    {
        // 左侧的分类排序下拉表格界面
        {
            let PSK_switch_sort_div = addElement(PSK_div, 'div', 'PSK_switch_sort_div', null);

            var PSK_switch_scroll_box = addElement(PSK_switch_sort_div, 'div', 'PSK_switch_scroll_box', 'overflow_y_div');
            var PSK_switch_div = addElement(PSK_switch_scroll_box, 'div', 'PSK_switch_div', 'in_overflow_div');
            // 全部
            var PSK_ALL_radio_div = addElement(PSK_switch_div, 'div', 'PSK_ALL_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PSK_ALL_radio_div, 'PSK_all', 'PSK_switch', 'PSK_all', '全部');
            //默认激活"全部"过滤条件
            PSK_ALL_radio_div.children[0].checked = true;

            // 根基技能 basic B
            var PSK_B_button = addElement(PSK_switch_div, 'button', 'PSK_B_button', 'dropdown_button_1');
            PSK_B_button.innerHTML = '根基技能';
            var PSK_B_droptable = addElement(PSK_switch_div, 'div', 'PSK_B_droptable', 'dropdown_table');
            var PSK_B_all_radio_div = addElement(PSK_B_droptable, 'div', 'PSK_B_all_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(PSK_B_all_radio_div, 'PSK_B_all', 'PSK_switch', 'B_all', '全部');

            //战斗技能 combat C
            var PSK_C_button = addElement(PSK_switch_div, 'button', 'PSK_C_button', 'dropdown_button_1');
            PSK_C_button.innerHTML = '战斗技能';
            var PSK_C_droptable = addElement(PSK_switch_div, 'div', 'PSK_C_droptable', 'dropdown_table');
            var PSK_C_all_radio_div = addElement(PSK_C_droptable, 'div', 'PSK_C_all_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(PSK_C_all_radio_div, 'PSK_C_all', 'PSK_switch', 'C_all', '全部');
            var PSK_C_W_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_C_W_radio_div, 'PSK_C_W', 'PSK_switch', 'C_W', '武器精通技能');
            var PSK_C_Env_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_C_Env_radio_div, 'PSK_C_Env', 'PSK_switch', 'C_Env', '环境适应技能');
            var PSK_C_Ene_radio_div = addElement(PSK_C_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_C_Ene_radio_div, 'PSK_C_Ene', 'PSK_switch', 'C_Ene', '对敌精通技能');

            //生活技能 life L
            var PSK_L_button = addElement(PSK_switch_div, 'button', 'PSK_L_button', 'dropdown_button_1');
            PSK_L_button.innerHTML = '生活技能';
            var PSK_L_droptable = addElement(PSK_switch_div, 'div', 'PSK_L_droptable', 'dropdown_table');
            var PSK_L_all_radio_div = addElement(PSK_L_droptable, 'div', 'PSK_L_all_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(PSK_L_all_radio_div, 'PSK_L_all', 'PSK_switch', 'L_all', '全部');
            var PSK_L_Raw_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_L_Raw_radio_div, 'PSK_L_Raw', 'PSK_switch', 'L_Raw', '原料获取技能');
            var PSK_L_P_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_L_P_radio_div, 'PSK_L_P', 'PSK_switch', 'L_P', '原料加工技能');
            var PSK_L_F_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_L_F_radio_div, 'PSK_L_F', 'PSK_switch', 'L_F', '成品使用技能');
            var PSK_L_Rec_radio_div = addElement(PSK_L_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_L_Rec_radio_div, 'PSK_L_Rec', 'PSK_switch', 'L_Rec', '回收利用技能');

            // 主动技能 active A
            var PSK_A_button = addElement(PSK_switch_div, 'button', 'PSK_A_button', 'dropdown_button_1');
            PSK_A_button.innerHTML = '主动技能';
            var PSK_A_droptable = addElement(PSK_switch_div, 'div', 'PSK_A_droptable', 'dropdown_table');
            var PSK_A_all_radio_div = addElement(PSK_A_droptable, 'div', 'PSK_A_all_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(PSK_A_all_radio_div, 'PSK_A_all', 'PSK_switch', 'A_all', '全部');
            var PSK_A_A_radio_div = addElement(PSK_A_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_A_A_radio_div, 'PSK_A_A', 'PSK_switch', 'A_A', '可攻击的技能');
            var PSK_A_D_radio_div = addElement(PSK_A_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_A_D_radio_div, 'PSK_A_D', 'PSK_switch', 'A_D', '可防御的技能');
            var PSK_A_R_radio_div = addElement(PSK_A_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_A_R_radio_div, 'PSK_A_R', 'PSK_switch', 'A_R', '可恢复的技能');
            var PSK_A_F_radio_div = addElement(PSK_A_droptable, 'div', null, 'radio_div switch_radio_div_2');
            addElement_radio(PSK_A_F_radio_div, 'PSK_A_F', 'PSK_switch', 'A_F', '可辅助的技能');

            // 特殊功法 super S
            var PSK_S_button = addElement(PSK_switch_div, 'button', 'PSK_S_button', 'dropdown_button_1');
            PSK_S_button.innerHTML = '特殊功法';
            var PSK_S_droptable = addElement(PSK_switch_div, 'div', 'PSK_S_droptable', 'dropdown_table');
            var PSK_S_all_radio_div = addElement(PSK_S_droptable, 'div', 'PSK_S_all_radio_div', 'radio_div switch_radio_div_2');
            addElement_radio(PSK_S_all_radio_div, 'PSK_S_all', 'PSK_switch', 'S_all', '全部');

            //下半排序按钮
            var PSK_sort_div = addElement(PSK_switch_sort_div, 'div', 'PSK_sort_div', null);
            var PSK_level_radio_div = addElement(PSK_sort_div, 'div', 'PSK_level_radio_div', 'radio_div switch_radio_div_1');
            addElement_radio(PSK_level_radio_div, 'PSK_level_sort', 'PSK_sort', 'level_sort', '等级排序');
            PSK_level_radio_div.children[0].checked = true; //默认激活"个数排序"过滤条件
        }
        //
        var PSK_value_div = addElement(PSK_div, 'div', 'PSK_value_div', null);
    }

    player_status.appendChild(player_status_switch);
    player_status.appendChild(player_status_value_div);
}

// 为组件添加触发事件
function set_player_status_button(player_status) {
    //切换属性界面、技能界面的按钮
    let radios = player_status.querySelectorAll('input[type="radio"][name="player_status_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_Player_status_div(this.id);
        });
    });
    let PSK_B_button = player_status.querySelector('#PSK_B_button');
    PSK_B_button.onclick = function () {
        let PSK_B_all_radio_div = player_status.querySelector('#PSK_B_all_radio_div');
        PSK_B_all_radio_div.children[0].checked = true;
        let P_All_Skills = player.get_player_All_Skills();
        P_All_Skills.updata_PSK_value();
        show_dropdown_table('PSK_switch_div', 'PSK_B_droptable');
    };
    let PSK_C_button = player_status.querySelector('#PSK_C_button');
    PSK_C_button.onclick = function () {
        let PSK_C_all_radio_div = player_status.querySelector('#PSK_C_all_radio_div');
        PSK_C_all_radio_div.children[0].checked = true;
        let P_All_Skills = player.get_player_All_Skills();
        P_All_Skills.updata_PSK_value();
        show_dropdown_table('PSK_switch_div', 'PSK_C_droptable');
    };
    let PSK_L_button = player_status.querySelector('#PSK_L_button');
    PSK_L_button.onclick = function () {
        let PSK_L_all_radio_div = player_status.querySelector('#PSK_L_all_radio_div');
        PSK_L_all_radio_div.children[0].checked = true;
        let P_All_Skills = player.get_player_All_Skills();
        P_All_Skills.updata_PSK_value();
        show_dropdown_table('PSK_switch_div', 'PSK_L_droptable');
    };
    let PSK_A_button = player_status.querySelector('#PSK_A_button');
    PSK_A_button.onclick = function () {
        let PSK_A_all_radio_div = player_status.querySelector('#PSK_A_all_radio_div');
        PSK_A_all_radio_div.children[0].checked = true;
        let P_All_Skills = player.get_player_All_Skills();
        P_All_Skills.updata_PSK_value();
        show_dropdown_table('PSK_switch_div', 'PSK_A_droptable');
    };
    let PSK_S_button = player_status.querySelector('#PSK_S_button');
    PSK_S_button.onclick = function () {
        let PSK_S_all_radio_div = player_status.querySelector('#PSK_S_all_radio_div');
        PSK_S_all_radio_div.children[0].checked = true;
        let P_All_Skills = player.get_player_All_Skills();
        P_All_Skills.updata_PSK_value();
        show_dropdown_table('PSK_switch_div', 'PSK_S_droptable');
    };

    //角色名文本框，实时修改角色名称
    let Player_name = player_status.querySelector('#Player_name');
    Player_name.addEventListener('change', updata_player_name);
    //角色属性、buff栏、装备栏界面切换开关
    radios = player_status.querySelectorAll('input[type="radio"][name="PA_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            change_PA(this.value);
        });
    });
    //角色装备栏切换开关
    radios = player_status.querySelectorAll('input[type="radio"][name="EQP_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            //显示当前激活的装备栏界面
            let P_worn = player.get_player_worn();
            P_worn.show_active_EQP();
            //身上穿着的装备更新了，更新相关内容
            updata_player_EQP();
        });
    });

    //技能展示过滤
    radios = player_status.querySelectorAll('input[type="radio"][name="PSK_switch"]');
    radios.forEach((radio) => {
        radio.addEventListener('click', function () {
            if (this.id == 'PSK_all') {
                //针对技能展示界面最大的“全部”按钮，额外新增关闭其他下拉框的功能
                show_dropdown_table('PSK_switch_div');
            }
            let P_All_Skills = player.get_player_All_Skills();
            P_All_Skills.updata_PSK_value();
        });
    });
    //精力条移动上去显示提示
    let ENP_bar = player_status.querySelector('#ENP_bar');
    add_show_Tooltip(ENP_bar, 'ENP_bar', 1);
}
//点击“属性展示”按钮之后，显示出或者隐藏属性展示界面
function change_PA(radio_value) {
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');
    const buff_show_scroll_box = document.getElementById('buff_show_scroll_box');

    if (radio_value == 'player_attr') {
        //切换到属性栏
        attribute_show.style.display = '';
        buff_show_scroll_box.style.display = 'none';
        equipment_show.style.display = 'none';
    } else if (radio_value == 'player_EQP') {
        attribute_show.style.display = 'none';
        buff_show_scroll_box.style.display = 'none';
        equipment_show.style.display = '';
        //切换到当前激活的装备栏
        let P_worn = player.get_player_worn();
        P_worn.show_active_EQP();
    } else if (radio_value == 'player_buff') {
        attribute_show.style.display = 'none';
        buff_show_scroll_box.style.display = '';
        equipment_show.style.display = 'none';
    }
}
//切换角色状态界面中的角色属性、角色技能界面的按钮
function change_Player_status_div(button_id) {
    const PAB_div = document.getElementById('PAB_div');
    const PSK_div = document.getElementById('PSK_div');
    if (button_id == 'PAB_switch_button') {
        PAB_div.style.display = '';
        PSK_div.style.display = 'none';
    }
    if (button_id == 'PSK_switch_button') {
        PAB_div.style.display = 'none';
        PSK_div.style.display = '';
    }
}
export { create_player_status };
