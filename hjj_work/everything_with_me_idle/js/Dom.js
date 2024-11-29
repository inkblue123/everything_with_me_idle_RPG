import { update_player_name } from "./Function.js";

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
function addElement_radio(parent_element, id, name, textContent) {
    let newradio = document.createElement("input");
    newradio.type = "radio";
    if (id) newradio.id = id;
    if (name) newradio.name = name;
    parent_element.appendChild(newradio);
    let newlabel = document.createElement("label");
    newlabel.setAttribute("for", id);
    if (textContent) newlabel.textContent = textContent;
    parent_element.appendChild(newlabel);
    return newradio;
}
//向指定id的radio绑定一个label
function addradio_label(parent_element, id, textContent) {
    let newlabel = document.createElement("label");
    newlabel.setAttribute("for", id);
    if (textContent) newlabel.textContent = textContent;
    parent_element.appendChild(newlabel);
    return newlabel;
}

// 创建出所有需要的界面
{
    dom.player_attribute = crtElement("div", "player_attribute", null, "", "#000000");
    // dom.player_attribute.textContent = "角色属性界面";

    dom.player_equipment = crtElement("div", "player_equipment", null, "none", "#0000ff");
    dom.player_equipment.textContent = "角色装备界面";

    dom.backpack = crtElement("div", null, "section", "", "#00ff00");
    dom.backpack.textContent = "背包物品界面";

    dom.skill = crtElement("div", null, "section", "none", "#ff0000");
    dom.skill.textContent = "技能列表界面";

    dom.library = crtElement("div", null, "section", "none", "#00ffff");
    dom.library.textContent = "图鉴界面";

    dom.control = crtElement("div", null, "section", "", "#ff00ff");
    dom.control.textContent = "玩家控制界面";

    dom.create = crtElement("div", null, "section", "", "#ffff00");
    dom.create.textContent = "合成制作界面";

    dom.map = crtElement("div", null, "section", "", "#33fff9");
    dom.map.textContent = "地图界面";

    dom.remenber = crtElement("div", null, "section", "", "#3357ff");
    dom.remenber.textContent = "脑海界面";

    dom.combat_setting = crtElement("div", null, "section", "", "#ff33a1");
    dom.combat_setting.textContent = "战斗规划界面";

    dom.combat = crtElement("div", null, "section", "", "#33fff9");
    dom.combat.textContent = "战斗界面";
}

//创建布局
{
    //整个项目先分成上下两部分，上95%是游戏主体，下5%是设置
    //游戏主体左侧三分之一是玩家相关，右侧三分之二是游戏的各种事件
    dom.game_dom = crtElement("div", null, "main_page", "");

    dom.game_left = crtElement("div", null, "page_rows_11", "none");
    dom.game_right = crtElement("div", null, "page_rows_11", "none");
    //战斗时位于游戏上半部分的容器
    dom.game_up_combat = crtElement("div", null, "page_columns_1", "none");
    //平时位于游戏上半部分的容器
    dom.game_up_nomal = crtElement("div", null, "page_columns_11", "none");
    //平时位于游戏上半部分的容器
    dom.game_down_nomal = crtElement("div", null, "page_columns_11", "none");

    dom.option_dom = crtElement("div", null, "option_page", "");
}

//创建左上角，角色属性展示界面内的详细组件
{
    //展示角色血条和名称的布局;
    dom.bar_div = crtElement("div", "bar_div", "page_columns_1", "");
    //角色名
    dom.Player_name_div = addElement(dom.bar_div, "div", "Player_name_div", "page_columns_1"); //血条中，条的外框
    dom.Player_name = addElement(dom.Player_name_div, "input", "Player_name", null); //血条中，条的外框
    dom.Player_name.type = "text";
    dom.Player_name.value = "text";
    //血条组件
    dom.HP_bar = addElement(dom.bar_div, "div", "HP_bar", null, "");
    dom.HP_frame = addElement(dom.HP_bar, "div", "HP_frame", null); //血条中，条的外框
    dom.HP_current = addElement(dom.HP_frame, "div", "HP_current", null); //血条中央，长度随当前血量变化的色块
    dom.HP_number = addElement(dom.HP_bar, "div", "HP_number", null); //血条上显示的数字，表示当前血量具体数值
    //蓝条组件
    dom.MP_bar = addElement(dom.bar_div, "div", "MP_bar", null, "");
    dom.MP_frame = addElement(dom.MP_bar, "div", "MP_frame", null); //条的外框
    dom.MP_current = addElement(dom.MP_frame, "div", "MP_current", null); //长度随当前蓝量变化的色块
    dom.MP_number = addElement(dom.MP_bar, "div", "MP_number", null); //显示的数字，表示当前蓝量具体数值
    //精力组件
    dom.ENP_bar = addElement(dom.bar_div, "div", "ENP_bar", null, "");
    dom.ENP_frame = addElement(dom.ENP_bar, "div", "ENP_frame", null); //条的外框
    dom.ENP_current = addElement(dom.ENP_frame, "div", "ENP_current", null); //长度随当前精力变化的色块
    dom.ENP_number = addElement(dom.ENP_bar, "div", "ENP_number", null); //显示的数字，表示当前精力具体数值

    //容纳玩家属性+玩家装备的布局
    dom.attr_equip_div = crtElement("div", null, "page_columns_1", "");
    //属性展示组件
    dom.attribute_show = addElement(dom.attr_equip_div, "div", "attribute_show", "page_columns_11", "");
    dom.combat_attribute_show = addElement(dom.attribute_show, "div", "combat_attribute_show", "page_grid_9");
    dom.Player_attribute_show = addElement(dom.attribute_show, "div", "Player_attribute_show", "page_grid_9");
    for (let i = 0; i < 9; i++) {
        addElement(dom.combat_attribute_show, "div", null, "state_show"); //条的外框
        addElement(dom.Player_attribute_show, "div", null, "state_show"); //条的外框
    }
    //角色装备栏
    dom.equipment_show = addElement(dom.attr_equip_div, "div", "equipment_show", "page_flex", "none");
    for (let i = 0; i < 4; i++) {
        // addElement(dom.combat_attribute_show, "div", null, "state_show"); //条的外框
        // addElement(dom.Player_attribute_show, "div", null, "state_show"); //条的外框
    }

    //切换属性和装备栏的按钮
    dom.Player_attr_switch_div = crtElement("div", "Player_attr_switch_div", "page_columns_12", "");
    dom.PA_switch_div = addElement(dom.Player_attr_switch_div, "div", "PA_switch_div", "page_columns_1");
    dom.PA_switch_button = addElement(dom.PA_switch_div, "button", null, "PA_switch_button");
    dom.PA_switch_button.innerHTML = `属性\n展示`;
    dom.EQP_switch_div = addElement(dom.Player_attr_switch_div, "div", null, "page_auto_columns");
    for (let i = 0; i < 4; i++) {
        let EQP_switch_radio_div = addElement(dom.EQP_switch_div, "div", null, "EQP_switch_radio_div");
        addElement_radio(EQP_switch_radio_div, `EQP_${i + 1}`, "EQP_switch", `装备栏\n${i + 1}`);
    }
    //
}

// 向布局中插入合适的元素，实现游戏界面
{
    dom.main_dom = addElement(document.body, "div", null, "page_columns_1");

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

    // dom.player_attribute.appendChild(dom.Player_name_div);
    // dom.player_attribute.appendChild(dom.HP_bar);
    // dom.player_attribute.appendChild(dom.MP_bar);
    // dom.player_attribute.appendChild(dom.ENP_bar);
    dom.player_attribute.appendChild(dom.bar_div);
    dom.player_attribute.appendChild(dom.attr_equip_div);
    dom.player_attribute.appendChild(dom.Player_attr_switch_div);
}

//为部分组件插入各种触发事件
{
    // const Player_name = document.querySelector("#Player_name");
    // Player_name.addEventListener("change", update_player_name);
    dom.Player_name.addEventListener("change", update_player_name);
}

//向游戏布局中填充战斗时的默认界面
dom.InitGameDomCombat = function () {
    dom.main_dom.style.display = "";

    dom.game_left.style.display = "";
    dom.game_right.style.display = "";

    dom.game_up_combat.style.display = "";
    dom.game_up_nomal.style.display = "none";
    dom.game_down_nomal.style.display = "";

    dom.create.style.display = "none";
    dom.combat_setting.style.display = "";
};

//向游戏布局中填充正常时的默认界面
dom.InitGameDomNomal = function () {
    dom.main_dom.style.display = "";

    dom.game_left.style.display = "";
    dom.game_right.style.display = "";

    dom.game_up_combat.style.display = "none";
    dom.game_up_nomal.style.display = "";
    dom.game_down_nomal.style.display = "";

    dom.create.style.display = "";
    dom.combat_setting.style.display = "none";
};

export { dom, addElement };
