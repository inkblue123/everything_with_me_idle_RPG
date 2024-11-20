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
dom.player_attribute = crtElement("div", null, "section", "none", "#000000");
dom.player_attribute.textContent = "角色属性界面";

dom.player_equipment = crtElement("div", null, "section", "none", "#0000ff");
dom.player_equipment.textContent = "角色装备界面";

dom.backpack = crtElement("div", null, "section", "none", "#00ff00");
dom.backpack.textContent = "背包物品界面";

dom.skill = crtElement("div", null, "section", "none", "#ff0000");
dom.skill.textContent = "技能列表界面";

dom.library = crtElement("div", null, "section", "none", "#00ffff");
dom.library.textContent = "图鉴界面";

dom.control = crtElement("div", null, "section", "none", "#ff00ff");
dom.control.textContent = "玩家控制界面";

dom.create = crtElement("div", null, "section", "none", "#ffff00");
dom.create.textContent = "合成制作界面";

dom.map = crtElement("div", null, "section", "none", "#33fff9");
dom.map.textContent = "地图界面";

dom.Reserved = crtElement("div", null, "section", "none", "#3357ff");
dom.Reserved.textContent = "占位界面";

dom.combat_setting = crtElement("div", null, "section", "none", "#ff33a1");
dom.combat_setting.textContent = "战斗规划界面";

dom.combat = crtElement("div", null, "section", "none", "#33fff9");
dom.combat.textContent = "战斗界面";

//战斗时位于游戏上半部分的容器
dom.game_up_combat = document.createElement("div");
dom.game_up_combat.className = "page_2section";
dom.game_up_combat.style.display = "none";
//平时位于游戏上半部分的容器
dom.game_up_nomal = document.createElement("div");
dom.game_up_nomal.className = "page_3section";
dom.game_up_nomal.style.display = "none";
//平时位于游戏上半部分的容器
dom.game_down_nomal = document.createElement("div");
dom.game_down_nomal.className = "page_3section";
dom.game_down_nomal.style.display = "none";

// UI设计
dom.main_dom = addElement(document.body, "div", null, "game_page");
//给整体容器分两部分，其实上部分有两个，要根据具体情况分别显示
dom.main_dom.appendChild(dom.game_up_nomal);
// dom.game_up_nomal.style.display = "";
dom.main_dom.appendChild(dom.game_up_combat);
dom.game_up_combat.style.display = ""; //默认处于非战斗时刻，不显示
dom.main_dom.appendChild(dom.game_down_nomal);
dom.game_down_nomal.style.display = "";

//给每个部分填入具体的界面
dom.game_up_combat.appendChild(dom.player_attribute);
dom.player_attribute.style.display = "";
dom.game_up_combat.appendChild(dom.combat);
dom.combat.style.display = "";

dom.game_up_nomal.appendChild(dom.player_equipment); //并不能真的共用，要改
dom.player_equipment.style.display = "";
dom.game_up_nomal.appendChild(dom.Reserved);
dom.Reserved.style.display = "";
dom.game_up_nomal.appendChild(dom.map);
dom.map.style.display = "";

dom.game_down_nomal.appendChild(dom.backpack);
dom.backpack.style.display = "";
dom.game_down_nomal.appendChild(dom.control);
dom.control.style.display = "";
dom.game_down_nomal.appendChild(dom.create);
dom.create.style.display = "";

export { dom };
