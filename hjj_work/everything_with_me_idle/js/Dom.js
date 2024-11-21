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
function addElement(parent_element, elem, id, cls) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    parent_element.appendChild(newelem);
    return newelem;
}

// 创建出所有需要的界面
dom.player_attribute = crtElement("div", null, "section", "", "#000000");
dom.player_attribute.textContent = "角色属性界面";

dom.player_equipment = crtElement("div", null, "section", "none", "#0000ff");
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

dom.game_dom = crtElement("div", null, "main_page", "");

dom.game_left = crtElement("div", null, "page_columns_1", "none");
dom.game_right = crtElement("div", null, "page_columns_1", "none");
//战斗时位于游戏上半部分的容器
dom.game_up_combat = crtElement("div", null, "page_columns_1", "none");
//平时位于游戏上半部分的容器
dom.game_up_nomal = crtElement("div", null, "page_columns_11", "none");
//平时位于游戏上半部分的容器
dom.game_down_nomal = crtElement("div", null, "page_columns_11", "none");

dom.option_dom = crtElement("div", null, "option_page", "");

// UI设计
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
