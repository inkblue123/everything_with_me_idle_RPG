import { is_Empty_Object, is_overlap } from '../Function/Function.js';

//地图管理类
export class Map_manage {
    constructor() {
        this.map_div; //地图界面最大父布局
        this.map_move_div; //地图界面负责移动的子布局
        this.isDragging = false; //是否在地图界面内“按下鼠标”

        this.startX = 0;
        this.startY = 0;
        //地图中负责移动子布局的坐标
        this.currentX = 0;
        this.currentY = 0;
    }
    init() {
        this.map_div = document.getElementById('map');
        this.map_move_div = document.getElementById('map_move_div');
        //在地图界面内“按下鼠标时”
        this.map_div.addEventListener('mousedown', (e) => {
            this.isDragging = true; //允许移动地图内布局
            //记录按下的初始位置
            this.startX = e.clientX;
            this.startY = e.clientY;
            //取消事件的默认行为，不是很懂，但是要搞这个
            e.preventDefault();
        });
        //在全局界面拖动时
        document.addEventListener('mousemove', (e) => {
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
            this.updatePosition(dx, dy);
        });

        document.addEventListener('mouseup', () => {
            this.isDragging = false;
        });
    }
    applyBoundaryConstraints(x, y) {
        const viewportRect = this.map_div.getBoundingClientRect();
        const contentRect = this.map_move_div.getBoundingClientRect();

        // 计算最大允许的拖动范围
        const maxX = 0; // 最右边
        const minX = viewportRect.width - contentRect.width; // 最左边
        const maxY = 0; // 最下边
        const minY = viewportRect.height - contentRect.height; // 最上边

        // 应用边界限制
        const boundedX = Math.min(maxX, Math.max(minX, x));
        const boundedY = Math.min(maxY, Math.max(minY, y));

        return { x: boundedX, y: boundedY };
    }

    updatePosition() {
        this.map_move_div.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    }
}
