import { init_Text_type } from './Text_type.js';
import { init_Text_item } from './Text_item.js';

class Text {
    constructor(id) {
        this.id = id; //唯一id
        //设置多种类型的文本是为了预防同id的情况
        this.item_name; //物品名称
        this.item_desc; //物品描述

        this.type_name; //类型名称
        this.type_desc; //类型描述
    }
}

var texts = new Object();
//初始化文本数据库中与类型相关的文本
init_Text_type(texts);
//初始化文本数据库中与物品相关的文本
init_Text_item(texts);

export { texts };
