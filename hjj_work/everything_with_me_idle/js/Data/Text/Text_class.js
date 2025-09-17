export class Text {
    constructor(id) {
        this.id = id; //唯一id
        //设置多种类型的文本是为了预防同id的情况
        this.item_name; //物品名称
        this.item_desc; //物品描述

        this.type_name; //类型名称
        this.type_desc; //类型描述

        this.rarity_name; //稀有度名称
        this.rarity_color; //稀有度代表颜色

        this.wearing_name; //装备位置名称
        this.wearing_desc; //装备位置描述
    }
}

function add_text_object(texts, newid) {
    if (texts[newid] === undefined) {
        texts[newid] = new Text(newid);
    } else {
        console.log('创建texts[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export { add_text_object };
