import { texts } from '../Text/Text.js';

//物品通用属性
export class Item {
    constructor(id) {
        this.id = id; //唯一id
        this.name = ''; // 物品名称
        this.description = ''; // 物品描述
        this.maxStack = 1; // 最大堆叠数量
        this.type = new Array(); //类型

        this.init_Item_name_desc(id);
    }
    //调用文本数据库中的物品名称和描述
    init_Item_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义物品名称和描述
            this.name = '未命名物品';
            this.description = '未设定物品描述';
        } else {
            this.name = texts[id].item_name;
            this.description = texts[id].item_desc;
        }
    }
    //手动定义其他的物品属性
    init_Item_other(maxStack, type) {
        if (maxStack) {
            this.maxStack = maxStack;
        }
        this.type = this.type.concat(type);
    }
}
