var dom = new Object();

dom.dseparator = '<div class="dseparator">　</div>';
//三种硬币的颜色
dom.coincopper = '<small style="color:rgb(255, 116, 63)">●</small>';
dom.coinsilver = '<small style="color:rgb(192, 192, 192)">●</small>';
dom.coingold = '<small style="color:rgb(255, 215, 0)">●</small>';

//游戏开始时挡在最前面的加载界面，为了测试暂时关闭
dom.loading = addElement(document.body, "div");
// dom.loading.style.zIndex = 9997;
// dom.loading.style.width = "100%";
// dom.loading.style.height = "100%";
// dom.loading.style.position = "absolute";
// dom.loading.style.backgroundColor = "lightgrey";
// dom.loading.style.margin = -8;
dom.loadingt = addElement(document.body, "div");
// dom.loadingt.style.zIndex = 9998;
// dom.loadingt.innerHTML = "LOADING";
// dom.loadingt.style.textAlign = "center";
// dom.loadingt.style.top = window.innerHeight / 2 - 50;
// dom.loadingt.style.fontSize = "4em";
// dom.loadingt.style.position = "absolute";
// dom.loadingt.style.left = window.innerWidth / 2 - 150;

//在parent_element中添加一个元素，赋予id或者classname
function addElement(parent_element, elem, id, cls) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    parent_element.appendChild(newelem);
    return newelem;
}

//将dom元素渐变显示出来
function appear(dom) {
    if (!!dom) {
        let tmr = 0;
        dom.style.opacity = 0; //设置dom元素的透明度，0表示完全透明
        dom.style.display = ""; //清空dom元素的呈现方式，空字符就是默认情况，会把元素显示出来
        let a = setInterval(() => {
            tmr++;
            dom.style.opacity = tmr / 100; //逐渐把透明度设置成100
            if (tmr === 100) clearInterval(a);
        }, 10); //设置一个定时器函数，10毫秒执行一次
    }
}

export { dom, addElement };
