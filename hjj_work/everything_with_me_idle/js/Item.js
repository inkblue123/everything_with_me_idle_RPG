var items = new Object();
//物品的类别枚举
const Item_type = Object.freeze({
    Small: 'small',
    Medium: 'medium',
    Large: 'large',
});

class Item {
    constructor() {
        this.id = 0; //唯一id
        this.name = '未定义物品'; // 物品名称
        this.description; // 物品描述
        this.maxStack; // 最大堆叠数量
        this.type = new Array(); // 最大堆叠数量
    }
    // this.name = 'dummy';
    // this.desc = '';
    // this.eff = [];
    // this.data = { dscv: false };
    // this.amount = 0;
    // this.type = 1;
    // this.stype = 1;
    // this.rar = 1;
    // this.new = false;
    // this.have = false;
    // this.important = false;
    // this.onGet = function () {};
    // this.use = function () {};
}

items[1] = new Item();
items[1].id = 1;
items[1].name = '普通木头';
items[1].description = '';
items[1].maxStack = 3;
items[1].type = ['item'];

items[2] = new Item();
items[2].id = 2;
items[2].name = '木剑';
items[2].description = '';
items[2].maxStack = 1;
items[1].type = ['weapon'];

export { items };
