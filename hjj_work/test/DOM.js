var dom = new Object();

//在parent_element中添加一个元素，赋予id或者classname
function addElement(parent_element, elem, id, cls) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    parent_element.appendChild(newelem);
    return newelem;
}

// dom.loading.style.zIndex = 9997;
// dom.loading.style.width = "100%";
// dom.loading.style.height = "100%";
// dom.loading.style.position = "absolute";
// dom.loading.style.backgroundColor = "lightgrey";
// dom.loading.style.margin = -8;

// // 1. 创建一个 style 标签并插入到 head 中
// const style = document.createElement("style");
// document.head.appendChild(style);

// 3. 创建一个 container 容器
dom.main_dom = addElement(document.body, "div", null, "container");
// const container = document.createElement("div");
// container.className = "container";

// 4. 创建并添加 6 个 section
// for (let i = 1; i <= 6; i++) {
dom.equipment = addElement(dom.main_dom, "div", null, "section");
dom.equipment.textContent = "角色装备界面";
dom.equipment = addElement(dom.main_dom, "div", null, "section");
dom.equipment.textContent = "角色装备界面";
dom.equipment = addElement(dom.main_dom, "div", null, "section");
dom.equipment.textContent = "角色装备界面";
// const section = document.createElement("div");
// section.className = "section";
// section.textContent = `Section ${i}`;
// dom.main_dom.appendChild(section);
// }

// 5. 将 container 添加到 body 中
// document.body.appendChild(container);

export { dom };
