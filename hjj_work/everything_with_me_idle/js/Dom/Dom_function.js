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

export { crtElement, addElement, addElement_radio };
