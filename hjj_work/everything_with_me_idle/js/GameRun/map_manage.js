import { is_Empty_Object, get_uniqueArr } from '../Function/Function.js';
import { crtElement, addElement, addElement_radio } from '../Function/Dom_function.js';

import { places } from '../Data/Place/Place.js';
import { maps } from '../Data/Map/map.js';
import { texts } from '../Data/Text/Text.js';
import { global } from './global_manage.js';

//地图管理类
export class Map_manage {
    constructor() {
        this.now_place; //当前地点
        this.now_area; //当前地点所在区域
        this.map_div; //地图界面最大父布局
        this.map_move_div; //地图界面负责移动的子布局
        this.map_canvas; //地图界面负责承载画图线条的子布局
        this.ctx; //地图界面内的线条
        this.map_button = new Object(); //地图内按钮
        this.area_can_show_places = new Object(); //区域内可展示地点记录

        this.isDragging = false; //是否在地图界面内“按下鼠标”
        //在地图界面内按下鼠标的坐标
        this.startX = 0;
        this.startY = 0;
        //地图中负责移动的子布局的坐标
        this.currentX = 0;
        this.currentY = 0;
        //地图中负责移动的子布局的初始大小
        this.RawWidth;
        this.RawHeight;

        this.scale = 1; //地图中负责移动的子布局的缩放
        this.minScale = 0.1; // 最小缩放比例
        this.maxScale = 5.0; // 最大缩放比例
        this.zoomStep = 0.1; // 缩放步长
    }
    init() {
        this.map_div = document.getElementById('map');
        this.map_move_div = document.getElementById('map_move_div');
        this.map_canvas = document.getElementById('map_canvas');
        this.ctx = this.map_canvas.getContext('2d');

        //在地图界面内“按下鼠标时”
        this.map_div.addEventListener('mousedown', this.onMouseDown.bind(this));
        //在全局界面拖动时
        document.addEventListener('mousemove', this.onMouseMove.bind(this));
        //在全局界面放开鼠标时
        document.addEventListener('mouseup', this.onMouseUp.bind(this));
        //在地图界面内滚动鼠标滚轮时
        this.map_div.addEventListener('wheel', this.onWheel.bind(this));
        //移动到初始地点
        // this.set_now_place('game_statr');
    }
    //在地图界面内“按下鼠标时”的绑定函数
    onMouseDown(e) {
        this.isDragging = true; //允许移动地图内布局
        //记录按下的初始位置
        this.startX = e.clientX;
        this.startY = e.clientY;
        //取消事件的默认行为，不是很懂，但是要搞这个
        e.preventDefault();
    }
    //在全局界面拖动时的绑定函数
    onMouseMove(e) {
        if (!this.isDragging) return;

        //获取新地点和上次移动地点的坐标差值
        const dx = e.clientX - this.startX;
        const dy = e.clientY - this.startY;

        // 计算新的位置
        let newX = this.currentX + dx;
        let newY = this.currentY + dy;
        // 应用边界限制
        const boundedPos = this.applyBoundaryConstraints(newX, newY);
        //设置地图内布局的新坐标
        this.currentX = boundedPos.x;
        this.currentY = boundedPos.y;
        //设置新的按下位置坐标
        this.startX = e.clientX;
        this.startY = e.clientY;
        //使地图内布局的新坐标生效
        this.updatePosition(this.currentX, this.currentY);
    }
    //在全局界面放开鼠标时的绑定函数
    onMouseUp() {
        this.isDragging = false;
    }
    //在地图界面内滚动鼠标滚轮的绑定函数
    onWheel(e) {
        // 计算缩放中心和步长
        const mouseX = e.clientX - this.map_div.getBoundingClientRect().left;
        const mouseY = e.clientY - this.map_div.getBoundingClientRect().top;

        // 确定缩放步长
        const zoomStep = this.zoomStep;

        // 确定缩放方向
        const zoomDelta = e.deltaY > 0 ? -zoomStep : zoomStep;

        // 执行缩放
        this.zoomAt(mouseX, mouseY, zoomDelta);
    }
    //执行缩放
    zoomAt(centerX, centerY, zoomDelta) {
        const oldScale = this.scale;
        const newScale = Math.max(this.minScale, Math.min(this.maxScale, this.scale + zoomDelta));

        if (oldScale === newScale) return;

        // 计算缩放前后的坐标变换
        if (oldScale > 0) {
            // 以鼠标位置为中心缩放
            const worldX = centerX / oldScale - this.currentX / oldScale;
            const worldY = centerY / oldScale - this.currentY / oldScale;

            this.currentX = centerX - worldX * newScale;
            this.currentY = centerY - worldY * newScale;
        } else {
            // 以中心点缩放
            const parentRect = this.map_div.getBoundingClientRect();
            this.currentX = parentRect.width / 2 - (parentRect.width / 2 - this.currentX) * (newScale / oldScale);
            this.currentY = parentRect.height / 2 - (parentRect.height / 2 - this.currentY) * (newScale / oldScale);
        }

        this.scale = newScale;

        // 应用边界限制
        const boundedPos = this.applyBoundaryConstraints(this.currentX, this.currentY);
        //设置地图内布局的新坐标
        this.currentX = boundedPos.x;
        this.currentY = boundedPos.y;

        this.updatePosition(boundedPos.x, boundedPos.y);
    }
    //移动到新地点
    set_now_place(next_place) {
        //地点相同，不需要移动
        if (next_place == this.now_place) {
            return;
        }
        this.now_place = next_place;

        //获取新地点所属区域
        let next_area = get_place_area(next_place);
        if (next_area == this.now_area) {
            //区域相同，只需调整地图位置
            if (is_Empty_Object(maps[this.now_area])) {
                console.log('%s地点未定义地图信息，无法生成地图', this.now_area);
                return;
            }
        } else {
            //区域不同，重新生成新区域地图
            this.now_area = next_area;
            //清空旧地点图片
            this.map_move_div.replaceChildren();
            //重置旧布局位置和大小
            this.scale = 1;
            this.updatePosition(0, 0);
            //清空旧地点按钮
            this.map_button = new Object();
            if (is_Empty_Object(maps[this.now_area])) {
                console.log('%s地点未定义地图信息，无法生成地图', this.now_area);
                return;
            }
            this.init_map_move_div(); //初始化地图大小和位置
            this.init_map_button(); //初始化新区域内的地点按钮
            // this.init_map_button_line(); //初始化地点按钮之间的连线
        }
        this.updata_map_button(); //更新现在应该展示的按钮
        this.updata_map_button_line();
    }

    //初始化地图内移动子布局的参数
    init_map_move_div() {
        const area_size_x = maps[this.now_area].area_size_x;
        const area_size_y = maps[this.now_area].area_size_y;

        // 设置负责移动的容器尺寸
        this.map_move_div.style.width = area_size_x + 'px';
        this.map_move_div.style.height = area_size_y + 'px';
        //设置负责承载线条的容器的尺寸
        this.map_canvas.style.width = area_size_x + 'px';
        this.map_canvas.style.height = area_size_y + 'px';
        this.map_canvas.width = area_size_x;
        this.map_canvas.height = area_size_y;

        const viewportRect = this.map_div.getBoundingClientRect(); //地图界面最大父布局
        const contentRect = this.map_move_div.getBoundingClientRect(); //地图界面中负责移动的子布局

        //保存界面初始大小
        this.RawWidth = area_size_x;
        this.RawHeight = area_size_y;
        //确定缩放比例上下限
        let MinScaleX, MinScaleY;
        MinScaleX = viewportRect.width / area_size_x;
        MinScaleY = viewportRect.height / area_size_y;
        this.minScale = Math.min(MinScaleX, MinScaleY);
        this.maxScale = this.minScale * 3;
        //初始缩放比例
        this.scale = this.minScale;

        //移动到初始位置
        let x = (viewportRect.width - area_size_x * this.scale) / 2;
        let y = (viewportRect.height - area_size_y * this.scale) / 2;
        this.updatePosition(x, y);
    }
    //校验地图内布局的移动坐标，调整到合理的范围
    applyBoundaryConstraints(x, y) {
        const viewportRect = this.map_div.getBoundingClientRect(); //地图界面最大父布局
        const contentRect = this.map_move_div.getBoundingClientRect(); //地图界面中负责移动的子布局

        // 计算缩放后的子元素尺寸
        const scaledWidth = this.RawWidth * this.scale;
        const scaledHeight = this.RawHeight * this.scale;

        // 计算最大允许的拖动范围
        let maxX, minX, maxY, minY;
        if (viewportRect.width < scaledWidth) {
            maxX = 0; // 最右边
            minX = viewportRect.width - scaledWidth; // 最左边
        } else {
            maxX = (viewportRect.width - scaledWidth) / 2;
            minX = (viewportRect.width - scaledWidth) / 2;
        }
        if (viewportRect.height < scaledHeight) {
            maxY = 0; // 最下边
            minY = viewportRect.height - scaledHeight; // 最上边
        } else {
            maxY = (viewportRect.height - scaledHeight) / 2;
            minY = (viewportRect.height - scaledHeight) / 2;
        }

        // 应用边界限制
        const boundedX = Math.min(maxX, Math.max(minX, x));
        const boundedY = Math.min(maxY, Math.max(minY, y));

        return { x: boundedX, y: boundedY };
    }
    //将地图内布局的位置移动到指定坐标
    updatePosition(x, y) {
        if (x == undefined || y == undefined) {
            console.log('地图移动时没有输入坐标');
        }
        this.map_move_div.style.transform = `
        translate(${x}px, ${y}px)
        scale(${this.scale})
        `;
        this.map_canvas.style.transform = `
        translate(${x}px, ${y}px)
        scale(${this.scale})
        `;

        //触发缩放
        const parentRect = this.map_div.getBoundingClientRect();
        const childRect = this.map_move_div.getBoundingClientRect();
    }
    //初始化新区域内的地点按钮
    init_map_button() {
        //初始化区域内地点信息
        if (is_Empty_Object(this.area_can_show_places[this.now_area])) {
            this.area_can_show_places[this.now_area] = new Object();
            //获取当前区域内的所有地点按钮信息
            for (let place_id in maps[this.now_area].place_data) {
                this.area_can_show_places[this.now_area][place_id] = new Object();
                this.area_can_show_places[this.now_area][place_id].show_flag = false;
            }
        }
        //创建按钮
        for (let place_id in this.area_can_show_places[this.now_area]) {
            if (is_Empty_Object(texts[place_id])) {
                console.log('生成%s区域的地图时，缺少%s地点的文本信息', this.now_area, place_id);
                continue;
            }
            if (is_Empty_Object(texts[place_id].place_name)) {
                console.log('生成%s区域的地图时，缺少%s地点的文本信息', this.now_area, place_id);
                continue;
            }
            if (maps[this.now_area].place_data[place_id].place_button_flag == false) {
                continue; //该地点在地图内没有按钮
            }
            //生成可以显示的地点按钮
            let map_button = addElement(this.map_move_div, 'button', null, 'map_button');
            map_button.innerHTML = get_map_button_text(place_id, this.now_area);
            map_button.style.left = maps[this.now_area].place_data[place_id].button_x + 'px'; // 设置位置
            map_button.style.top = maps[this.now_area].place_data[place_id].button_y + 'px';
            map_button.addEventListener('click', function () {
                let place_manage = global.get_place_manage();
                place_manage.set_now_place(place_id);
            });
            this.map_button[place_id] = map_button; //保存按钮指针
        }
    }
    //更新当前地图的按钮状态
    updata_map_button() {
        //当前地点按钮标记为可显现
        if (!is_Empty_Object(this.area_can_show_places[this.now_area][this.now_place])) {
            this.area_can_show_places[this.now_area][this.now_place].show_flag = true;
        }
        //当前地点相连的可以移动的其他地点按钮标记为可显现
        let connect_place = get_connect_place_id(this.now_place);
        for (let place_id in this.map_button) {
            if (connect_place.includes(place_id)) {
                this.area_can_show_places[this.now_area][place_id].show_flag = true;
            }
        }
        //隐藏不可显现的按钮
        for (let place_id in this.area_can_show_places[this.now_area]) {
            if (maps[this.now_area].place_data[place_id].place_button_flag == false) {
                continue; //该地点在地图内没有按钮
            }
            let show_flag = this.area_can_show_places[this.now_area][place_id].show_flag;
            if (show_flag) {
                this.map_button[place_id].style.display = '';
            } else {
                this.map_button[place_id].style.display = 'none';
            }
        }
        //点亮当前地点相连的可移动的其他地点按钮
        for (let place_id in this.map_button) {
            if (connect_place.includes(place_id) || place_id == this.now_place) {
                this.map_button[place_id].classList.remove('btn-disabled');
            } else {
                this.map_button[place_id].classList.add('btn-disabled');
            }
        }
    }
    //更新地点按钮之间的连线
    updata_map_button_line() {
        //清除所有连线
        this.ctx.clearRect(0, 0, this.map_canvas.width, this.map_canvas.height);

        //地图窗口的位置信息
        const containerRect = this.map_move_div.getBoundingClientRect();

        for (let place_id in maps[this.now_area].place_data) {
            //获取一个地点和其他地点相连的信息
            let line_data = maps[this.now_area].place_data[place_id].line_places;
            if (is_Empty_Object(line_data)) {
                continue;
            }
            if (!this.area_can_show_places[this.now_area][place_id].show_flag) {
                continue;
            }
            for (let to_place_id of line_data) {
                if (!this.area_can_show_places[this.now_area][to_place_id].show_flag) {
                    continue;
                }

                //起点按钮位置信息
                const from_button = this.map_button[place_id];
                const from_Rect = from_button.getBoundingClientRect();
                let from_center_x = (from_Rect.left - containerRect.left + from_Rect.width / 2) / this.scale;
                let from_center_y = (from_Rect.top - containerRect.top + from_Rect.height / 2) / this.scale;

                //终点按钮位置信息
                const to_button = this.map_button[to_place_id];
                const to_Rect = to_button.getBoundingClientRect();
                let to_center_x = (to_Rect.left - containerRect.left + to_Rect.width / 2) / this.scale;
                let to_center_y = (to_Rect.top - containerRect.top + to_Rect.height / 2) / this.scale;

                // 绘制连线
                this.ctx.beginPath(); //起始一条路径，或重置当前路径。
                this.ctx.moveTo(from_center_x, from_center_y); //把路径移动到画布中的指定点，不创建线条
                this.ctx.lineTo(to_center_x, to_center_y); //添加一个新点，然后在画布中创建从该点到最后指定点的线条
                // this.ctx.strokeStyle = '#white'; //设置颜色
                this.ctx.lineWidth = 2; //设置粗细
                this.ctx.stroke(); //绘制已定义的路径
            }
        }
    }

    //测试，修改地图内布局的大小
    change_map_size() {
        let next_size = 0;
        let map_size = new Array();
        map_size[0] = { x: 120, y: 90 };
        map_size[1] = { x: 1200, y: 90 };
        map_size[2] = { x: 120, y: 900 };
        map_size[3] = { x: 1200, y: 900 };

        let div_size = this.map_move_div.getBoundingClientRect();
        if (div_size.width == 120 && div_size.height == 90) {
            next_size = 1;
        } else if (div_size.width == 1200 && div_size.height == 90) {
            next_size = 2;
        } else if (div_size.width == 120 && div_size.height == 900) {
            next_size = 3;
        } else if (div_size.width == 1200 && div_size.height == 900) {
            next_size = 0;
        }

        this.map_move_div.style.width = map_size[next_size].x + 'px';
        this.map_move_div.style.height = map_size[next_size].y + 'px';

        this.init_map_move_div(); //初始化地图内移动子布局的初始位置
    }
}
//获取地点的所在区域
function get_place_area(place_id) {
    if (is_Empty_Object(places[place_id])) {
        console.log('地点%s不存在', place_id);
        return;
    }
    if (is_Empty_Object(places[place_id].area_id)) {
        console.log('地点%s的所属区域不存在', place_id);
        return;
    }
    return places[place_id].area_id;
}
//获取地图按钮上的文本
function get_map_button_text(place_id, now_area) {
    let area_id = get_place_area(place_id);
    let text = '';
    if (area_id == now_area) {
        text = texts[place_id].place_name;
    } else {
        text = texts[area_id].area_name + '区域<br>' + texts[place_id].place_name;
    }
    return text;
}

//获取当前可以和指定地点相连的其他地点
function get_connect_place_id(place_id) {
    let connect_place = new Array();

    //可以回到上一个普通区域
    let place_manage = global.get_place_manage();
    let last_normal_place_id = place_manage.get_last_normal_place();
    connect_place.push(last_normal_place_id);

    let new_place = places[place_id];
    //无条件可以前往的普通区域
    if (!is_Empty_Object(new_place.connect_normal_place)) {
        for (let next_place_id of new_place.connect_normal_place) {
            connect_place.push(next_place_id);
        }
    }
    //有条件出现的普通区域
    if (!is_Empty_Object(new_place.condition_connect_normal_place)) {
        let global_flag_manage = global.get_global_flag_manage();
        for (let next_place_id in new_place.condition_connect_normal_place) {
            let condition = new_place.condition_connect_normal_place[next_place_id];
            let flag = true;
            for (let id in condition) {
                let status = global_flag_manage.get_flag(id); //当前需要判断的游戏状态的内容
                if (status != condition[id]) {
                    flag = false;
                    break;
                }
            }
            if (flag) {
                connect_place.push(next_place_id);
            }
        }
    }
    //可以前往战斗区域
    if (!is_Empty_Object(new_place.connect_combat_place)) {
        for (let next_place_id of new_place.connect_combat_place) {
            connect_place.push(next_place_id);
        }
    }
    //此处有NPC
    if (!is_Empty_Object(new_place.place_NPC)) {
        for (let next_place_id of new_place.place_NPC) {
            connect_place.push(next_place_id);
        }
    }
    //可以前往商店
    if (!is_Empty_Object(new_place.connect_store_place)) {
        for (let next_place_id of new_place.connect_store_place) {
            connect_place.push(next_place_id);
        }
    }
    //可以前往其他区域
    if (!is_Empty_Object(new_place.connect_other_place)) {
        for (let next_place_id of new_place.connect_other_place) {
            connect_place.push(next_place_id);
        }
    }
    connect_place = get_uniqueArr(connect_place); //去重
    return connect_place;
}
