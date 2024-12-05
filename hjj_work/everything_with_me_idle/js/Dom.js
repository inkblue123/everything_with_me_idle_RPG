import { update_player_name, change_PA, change_EQP, change_BP_SK_IB, show_dropdown_table } from './Function.js';

var dom = new Object();

// 创造一个dom元素，赋值id，className，style.display，style.backgroundColor
function crtElement(elem, id, cls, sty_display, sty_BGC) {
    let newdom = document.createElement(elem);
    if (id) newdom.id = id;
    if (cls) newdom.className = cls;
    if (sty_display) newdom.style.display = sty_display;
    if (sty_BGC) newdom.style.backgroundColor = sty_BGC;
    return newdom;
}
//向parent_element中添加一个元素，赋予id或者classname
function addElement(parent_element, elem, id, cls, sty_display) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    if (sty_display) newelem.style.display = sty_display;
    parent_element.appendChild(newelem);
    return newelem;
}
//向parent_element中添加一个radio
function addElement_radio(parent_element, id, name, value, textContent) {
    let newradio = document.createElement('input');
    newradio.type = 'radio';
    if (id) newradio.id = id;
    if (name) newradio.name = name;
    if (value) newradio.value = value;
    parent_element.appendChild(newradio);
    let newlabel = document.createElement('label');
    newlabel.setAttribute('for', id);
    if (textContent) newlabel.textContent = textContent;
    parent_element.appendChild(newlabel);
    return newradio;
}

// 创建出所有需要的界面
{
    //角色属性和装备界面
    dom.player_attribute = crtElement('div', 'player_attribute', null, '', '#000000');

    dom.backpack = crtElement('div', 'backpack', null, '');
    // dom.backpack.textContent = '背包物品界面';

    // dom.skill = crtElement('div', null, 'section', 'none', '#ff0000');
    // dom.skill.textContent = '技能列表界面';

    // dom.library = crtElement('div', null, 'section', 'none', '#00ffff');
    // dom.library.textContent = '图鉴界面';

    dom.control = crtElement('div', null, 'section', '', '#ff00ff');
    dom.control.textContent = '玩家控制界面';

    dom.create = crtElement('div', null, 'section', '', '#ffff00');
    dom.create.textContent = '合成制作界面';

    dom.map = crtElement('div', null, 'section', '', '#33fff9');
    dom.map.textContent = '地图界面';

    dom.remenber = crtElement('div', null, 'section', '', '#3357ff');
    dom.remenber.textContent = '脑海界面';

    dom.combat_setting = crtElement('div', null, 'section', '', '#ff33a1');
    dom.combat_setting.textContent = '战斗规划界面';

    dom.combat = crtElement('div', null, 'section', '', '#33fff9');
    dom.combat.textContent = '战斗界面';
}

//创建布局
{
    //整个项目先分成上下两部分，上95%是游戏主体，下5%是设置
    //游戏主体左侧三分之一是玩家相关，右侧三分之二是游戏的各种事件
    dom.game_dom = crtElement('div', null, 'main_page', '');

    dom.game_left = crtElement('div', null, 'page_rows_11', 'none');
    dom.game_right = crtElement('div', null, 'page_rows_11', 'none');
    //战斗时位于游戏上半部分的容器
    dom.game_up_combat = crtElement('div', null, 'page_columns_1', 'none');
    //平时位于游戏上半部分的容器
    dom.game_up_nomal = crtElement('div', null, 'page_columns_11', 'none');
    //平时位于游戏上半部分的容器
    dom.game_down_nomal = crtElement('div', null, 'page_columns_11', 'none');

    dom.option_dom = crtElement('div', null, 'option_page', '');
}

//创建左上角，角色装备属性展示界面内的详细组件
{
    //展示角色血条和名称的布局;
    dom.bar_div = crtElement('div', 'bar_div', 'page_columns_1', '');
    //角色名
    dom.Player_name_div = addElement(dom.bar_div, 'div', 'Player_name_div', 'page_columns_1'); //血条中，条的外框
    dom.Player_name = addElement(dom.Player_name_div, 'input', 'Player_name', null); //血条中，条的外框
    dom.Player_name.type = 'text';
    dom.Player_name.value = 'text';
    //血条组件
    dom.HP_bar = addElement(dom.bar_div, 'div', 'HP_bar', null, '');
    dom.HP_frame = addElement(dom.HP_bar, 'div', 'HP_frame', null); //血条中，条的外框
    dom.HP_current = addElement(dom.HP_frame, 'div', 'HP_current', null); //血条中央，长度随当前血量变化的色块
    dom.HP_number = addElement(dom.HP_bar, 'div', 'HP_number', null); //血条上显示的数字，表示当前血量具体数值
    //蓝条组件
    dom.MP_bar = addElement(dom.bar_div, 'div', 'MP_bar', null, '');
    dom.MP_frame = addElement(dom.MP_bar, 'div', 'MP_frame', null); //条的外框
    dom.MP_current = addElement(dom.MP_frame, 'div', 'MP_current', null); //长度随当前蓝量变化的色块
    dom.MP_number = addElement(dom.MP_bar, 'div', 'MP_number', null); //显示的数字，表示当前蓝量具体数值
    //精力组件
    dom.ENP_bar = addElement(dom.bar_div, 'div', 'ENP_bar', null, '');
    dom.ENP_frame = addElement(dom.ENP_bar, 'div', 'ENP_frame', null); //条的外框
    dom.ENP_current = addElement(dom.ENP_frame, 'div', 'ENP_current', null); //长度随当前精力变化的色块
    dom.ENP_number = addElement(dom.ENP_bar, 'div', 'ENP_number', null); //显示的数字，表示当前精力具体数值

    //容纳玩家属性+玩家装备的布局
    dom.attr_equip_div = crtElement('div', 'attr_equip_div', 'page_columns_1', '');
    //属性展示组件
    dom.attribute_show = addElement(dom.attr_equip_div, 'div', 'attribute_show', 'page_columns_11', '');
    dom.combat_attribute_show = addElement(dom.attribute_show, 'div', 'combat_attribute_show', 'page_grid_9');
    dom.Player_attribute_show = addElement(dom.attribute_show, 'div', 'Player_attribute_show', 'page_grid_9');
    for (let i = 0; i < 9; i++) {
        addElement(dom.combat_attribute_show, 'div', null, 'state_show'); //条的外框
        addElement(dom.Player_attribute_show, 'div', null, 'state_show'); //条的外框
    }
    //角色装备栏
    dom.equipment_show = addElement(dom.attr_equip_div, 'div', 'equipment_show', 'page_columns_1', 'none');
    for (let i = 0; i < 4; i++) {
        let EQP_i = addElement(dom.equipment_show, 'div', null, 'page_columns_11', '');
        let EQP_left = addElement(EQP_i, 'div', null, 'page_columns_111', ''); //装备栏左侧，角色的4个防具和主副手
        let EQP_arms_div = addElement(EQP_left, 'div', 'EQP_arms_div', null, '');
        let EQP_Armor_div = addElement(EQP_left, 'div', 'EQP_Armor_div', null, '');
        let EQP_arm_div = addElement(EQP_left, 'div', 'EQP_arm_div', null, '');
        addElement(EQP_arms_div, 'button', null, 'EQP_show', '');
        for (let j = 0; j < 4; j++) {
            addElement(EQP_Armor_div, 'button', null, 'EQP_show', '');
        }
        let test = addElement(EQP_arm_div, 'button', null, 'EQP_show', '');
        test.innerHTML = `装备栏\n${i + 1}`;
        let EQP_right = addElement(EQP_i, 'div', null, 'page_columns_11', ''); //装备栏右侧，饰品和饰品槽
    }

    //切换属性和装备栏的按钮
    dom.Player_attr_switch_div = crtElement('div', 'Player_attr_switch_div', 'page_columns_12', '');
    dom.PA_switch_div = addElement(dom.Player_attr_switch_div, 'div', 'PA_switch_div', 'page_columns_1');
    dom.PA_switch_button = addElement(dom.PA_switch_div, 'button', null, 'PA_switch_button');
    dom.PA_switch_button.innerHTML = `属性\n展示`;
    dom.EQP_switch_div = addElement(dom.Player_attr_switch_div, 'div', 'EQP_switch_div', 'page_auto_columns');
    for (let i = 0; i < 4; i++) {
        let EQP_switch_radio_div = addElement(dom.EQP_switch_div, 'div', null, 'EQP_switch_radio_div');
        addElement_radio(EQP_switch_radio_div, `EQP_${i + 1}`, 'EQP_switch', `${i}`, `装备栏\n${i + 1}`);
    }
    dom.EQP_switch_div.children[0].children[0].checked = true;

    //组件放入角色属性装备界面中
    dom.player_attribute.appendChild(dom.bar_div);
    dom.player_attribute.appendChild(dom.attr_equip_div);
    dom.player_attribute.appendChild(dom.Player_attr_switch_div);
    //
}

//创建左下角，角色背包物品栏界面内的详细组件
{
    //界面上部，区分当前展示的内容的按钮
    dom.BP_SK_IB_switch = crtElement('div', 'BP_SK_IB_switch', 'page_columns_111', '');
    dom.BP_switch_button = addElement(dom.BP_SK_IB_switch, 'button', 'BP_switch_button', 'BP_SK_IB_switch_button');
    dom.SK_switch_button = addElement(dom.BP_SK_IB_switch, 'button', 'SK_switch_button', 'BP_SK_IB_switch_button');
    dom.IB_switch_button = addElement(dom.BP_SK_IB_switch, 'button', 'IB_switch_button', 'BP_SK_IB_switch_button');
    dom.BP_switch_button.innerHTML = `背包物品`;
    dom.SK_switch_button.innerHTML = `技能`;
    dom.IB_switch_button.innerHTML = `图鉴`;
    //界面下部，具体展示内容的窗口
    dom.BP_SK_IB_div = crtElement('div', 'BP_SK_IB_div', 'page_columns_1', '');
    dom.BP_div = addElement(dom.BP_SK_IB_div, 'div', 'BP_div', 'page_columns_12');
    dom.SK_div = addElement(dom.BP_SK_IB_div, 'div', 'SK_div', 'page_columns_12', 'none');
    dom.IB_div = addElement(dom.BP_SK_IB_div, 'div', 'IB_div', 'page_columns_12', 'none');
    //背包物品窗口
    {
        // 左侧的分类下拉表格界面
        dom.BP_scroll_box = addElement(dom.BP_div, 'div', 'BP_scroll_box', 'overflow_y_div');
        dom.BP_classification_div = addElement(dom.BP_scroll_box, 'div', 'BP_classification_div', 'classification_div');
        // 全部
        dom.BP_ALL_button = addElement(dom.BP_classification_div, 'button', 'BP_ALL_button', 'dropdown_button_1');
        dom.BP_ALL_button.innerHTML = `全部`;
        // 武器装备
        dom.BP_EQP_button = addElement(dom.BP_classification_div, 'button', 'BP_EQP_button', 'dropdown_button_1');
        dom.BP_EQP_button.innerHTML = `武器装备`;
        dom.BP_EQP_droptable = addElement(dom.BP_classification_div, 'div', 'BP_EQP_droptable', 'dropdown_table');
        dom.BP_EQP_all_button = addElement(dom.BP_EQP_droptable, 'button', 'BP_EQP_all_button', 'dropdown_button_2');
        dom.BP_EQP_all_button.innerHTML = `全部`;
        dom.BP_EQP_W_button = addElement(dom.BP_EQP_droptable, 'button', 'BP_EQP_W_button', 'dropdown_button_2');
        dom.BP_EQP_W_button.innerHTML = `主手武器`;
        dom.BP_EQP_A_button = addElement(dom.BP_EQP_droptable, 'button', 'BP_EQP_A_button', 'dropdown_button_2');
        dom.BP_EQP_A_button.innerHTML = `防具`;
        dom.BP_EQP_D_button = addElement(dom.BP_EQP_droptable, 'button', 'BP_EQP_D_button', 'dropdown_button_2');
        dom.BP_EQP_D_button.innerHTML = `副手`;
        dom.BP_EQP_O_button = addElement(dom.BP_EQP_droptable, 'button', 'BP_EQP_O_button', 'dropdown_button_2');
        dom.BP_EQP_O_button.innerHTML = `饰品`;
        //消耗品
        dom.BP_CSB_button = addElement(dom.BP_classification_div, 'button', 'BP_CSB_button', 'dropdown_button_1');
        dom.BP_CSB_button.innerHTML = `消耗品`;
        dom.BP_CSB_droptable = addElement(dom.BP_classification_div, 'div', 'BP_CSB_droptable', 'dropdown_table');
        dom.BP_CSB_all_button = addElement(dom.BP_CSB_droptable, 'button', 'BP_CSB_all_button', 'dropdown_button_2');
        dom.BP_CSB_all_button.innerHTML = `全部`;
        dom.BP_CSB_W_button = addElement(dom.BP_CSB_droptable, 'button', 'BP_CSB_W_button', 'dropdown_button_2');
        dom.BP_CSB_W_button.innerHTML = `恢复物品`;
        dom.BP_CSB_A_button = addElement(dom.BP_CSB_droptable, 'button', 'BP_CSB_A_button', 'dropdown_button_2');
        dom.BP_CSB_A_button.innerHTML = `buff物品`;
        dom.BP_CSB_D_button = addElement(dom.BP_CSB_droptable, 'button', 'BP_CSB_D_button', 'dropdown_button_2');
        dom.BP_CSB_D_button.innerHTML = `战斗消耗品`;
        dom.BP_CSB_O_button = addElement(dom.BP_CSB_droptable, 'button', 'BP_CSB_O_button', 'dropdown_button_2');
        dom.BP_CSB_O_button.innerHTML = `生活消耗品`;
        //
        dom.BP_value_div = addElement(dom.BP_div, 'div', 'BP_value_div', null);
    }
    //技能窗口
    {
        // 左侧的分类下拉表格界面
        dom.SK_scroll_box = addElement(dom.SK_div, 'div', 'SK_scroll_box', 'overflow_y_div');
        dom.SK_classification_div = addElement(dom.SK_scroll_box, 'div', 'SK_classification_div', 'classification_div');
        // 全部
        dom.SK_ALL_button = addElement(dom.SK_classification_div, 'button', 'SK_ALL_button', 'dropdown_button_1');
        dom.SK_ALL_button.innerHTML = `全部`;
        // 根基技能
        dom.SK_basic_button = addElement(dom.SK_classification_div, 'button', 'SK_basic_button', 'dropdown_button_1');
        dom.SK_basic_button.innerHTML = `根基技能`;
        //战斗技能
        dom.SK_combat_button = addElement(dom.SK_classification_div, 'button', 'SK_combat_button', 'dropdown_button_1');
        dom.SK_combat_button.innerHTML = `战斗技能`;
        dom.SK_combat_droptable = addElement(dom.SK_classification_div, 'div', 'SK_combat_droptable', 'dropdown_table');
        dom.SK_combat_all_button = addElement(
            dom.SK_combat_droptable,
            'button',
            'SK_combat_all_button',
            'dropdown_button_2'
        );
        dom.SK_combat_all_button.innerHTML = `全部`;
        dom.SK_combat_W_button = addElement(
            dom.SK_combat_droptable,
            'button',
            'SK_combat_W_button',
            'dropdown_button_2'
        );
        dom.SK_combat_W_button.innerHTML = `武器技能`;
        dom.SK_combat_A_button = addElement(
            dom.SK_combat_droptable,
            'button',
            'SK_combat_A_button',
            'dropdown_button_2'
        );
        dom.SK_combat_A_button.innerHTML = `战斗姿态技能`;
        dom.SK_combat_D_button = addElement(
            dom.SK_combat_droptable,
            'button',
            'SK_combat_D_button',
            'dropdown_button_2'
        );
        dom.SK_combat_D_button.innerHTML = `环境适应技能`;
        dom.SK_combat_O_button = addElement(
            dom.SK_combat_droptable,
            'button',
            'SK_combat_O_button',
            'dropdown_button_2'
        );
        dom.SK_combat_O_button.innerHTML = `对敌精通技能`;
        //生活技能
        dom.SK_life_button = addElement(dom.SK_classification_div, 'button', 'SK_life_button', 'dropdown_button_1');
        dom.SK_life_button.innerHTML = `生活技能`;
        dom.SK_life_droptable = addElement(dom.SK_classification_div, 'div', 'SK_life_droptable', 'dropdown_table');
        dom.SK_life_all_button = addElement(dom.SK_life_droptable, 'button', 'SK_life_all_button', 'dropdown_button_2');
        dom.SK_life_all_button.innerHTML = `全部`;
        dom.SK_life_W_button = addElement(dom.SK_life_droptable, 'button', 'SK_life_W_button', 'dropdown_button_2');
        dom.SK_life_W_button.innerHTML = `原料获取技能`;
        dom.SK_life_A_button = addElement(dom.SK_life_droptable, 'button', 'SK_life_A_button', 'dropdown_button_2');
        dom.SK_life_A_button.innerHTML = `原料加工技能`;
        dom.SK_life_D_button = addElement(dom.SK_life_droptable, 'button', 'SK_life_D_button', 'dropdown_button_2');
        dom.SK_life_D_button.innerHTML = `成品使用技能`;
        dom.SK_life_B_button = addElement(dom.SK_life_droptable, 'button', 'SK_life_D_button', 'dropdown_button_2');
        dom.SK_life_B_button.innerHTML = `回收利用技能`;
        // 主动技能
        dom.SK_active_button = addElement(dom.SK_classification_div, 'button', 'SK_active_button', 'dropdown_button_1');
        dom.SK_active_button.innerHTML = `主动技能`;
        // 特殊功法
        dom.SK_super_button = addElement(dom.SK_classification_div, 'button', 'SK_super_button', 'dropdown_button_1');
        dom.SK_super_button.innerHTML = `特殊功法`;
        //
        dom.SK_value_div = addElement(dom.SK_div, 'div', 'SK_value_div', null);
    }

    // dom.bar_div = crtElement('div', 'bar_div', 'page_columns_1', '');
    // dom.Player_name_div = addElement(dom.bar_div, 'div', 'Player_name_div', 'page_columns_1'); //血条中，条的外框
    dom.backpack.appendChild(dom.BP_SK_IB_switch);
    dom.backpack.appendChild(dom.BP_SK_IB_div);
}

// 向布局中插入合适的元素，实现游戏界面
{
    dom.main_dom = addElement(document.body, 'div', null, 'page_columns_1');

    dom.main_dom.appendChild(dom.game_dom);

    dom.game_dom.appendChild(dom.game_left);
    dom.game_dom.appendChild(dom.game_right);

    dom.game_left.appendChild(dom.player_attribute);
    dom.game_left.appendChild(dom.backpack);

    dom.game_right.appendChild(dom.game_up_combat);
    dom.game_right.appendChild(dom.game_up_nomal);
    dom.game_right.appendChild(dom.game_down_nomal);

    dom.game_up_combat.appendChild(dom.combat);

    dom.game_up_nomal.appendChild(dom.remenber);
    dom.game_up_nomal.appendChild(dom.map);

    dom.game_down_nomal.appendChild(dom.control);
    dom.game_down_nomal.appendChild(dom.create);
    dom.game_down_nomal.appendChild(dom.combat_setting);

    dom.main_dom.appendChild(dom.option_dom);

    //左上角的角色属性装备界面
}

//为部分组件插入各种触发事件
{
    //左上角的角色属性装备界面
    {
        //角色名文本框，实时修改角色名称
        dom.Player_name.addEventListener('change', update_player_name);
        //角色属性界面切换开关
        dom.PA_switch_button.onclick = function () {
            change_PA();
        };
        //角色装备栏切换开关
        const radios = document.querySelectorAll('input[type="radio"][name="EQP_switch"]');
        radios.forEach((radio) => {
            radio.addEventListener('click', function () {
                change_EQP(this.value);
            });
        });
    }

    //左下的背包物品栏界面
    {
        //切换背包、技能、图鉴的按钮
        dom.BP_switch_button.onclick = function () {
            change_BP_SK_IB(this.id);
        };
        dom.SK_switch_button.onclick = function () {
            change_BP_SK_IB(this.id);
        };
        dom.IB_switch_button.onclick = function () {
            change_BP_SK_IB(this.id);
        };
        dom.BP_EQP_button.onclick = function () {
            show_dropdown_table('BP_EQP_droptable');
        };
        dom.BP_CSB_button.onclick = function () {
            show_dropdown_table('BP_CSB_droptable');
        };
        dom.SK_combat_button.onclick = function () {
            show_dropdown_table('SK_combat_droptable');
        };
        dom.SK_life_button.onclick = function () {
            show_dropdown_table('SK_life_droptable');
        };
    }
}

//向游戏布局中填充战斗时的默认界面
dom.InitGameDomCombat = function () {
    dom.main_dom.style.display = '';

    dom.game_left.style.display = '';
    dom.game_right.style.display = '';

    dom.game_up_combat.style.display = '';
    dom.game_up_nomal.style.display = 'none';
    dom.game_down_nomal.style.display = '';

    dom.create.style.display = 'none';
    dom.combat_setting.style.display = '';
};

//向游戏布局中填充正常时的默认界面
dom.InitGameDomNomal = function () {
    dom.main_dom.style.display = '';

    dom.game_left.style.display = '';
    dom.game_right.style.display = '';

    dom.game_up_combat.style.display = 'none';
    dom.game_up_nomal.style.display = '';
    dom.game_down_nomal.style.display = '';

    dom.create.style.display = '';
    dom.combat_setting.style.display = 'none';
};

export { dom, addElement };
