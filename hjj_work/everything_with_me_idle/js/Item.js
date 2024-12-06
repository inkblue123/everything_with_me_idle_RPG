var item = new Object();

class Item {
    constructor() {
        this.id = 0; //唯一id
        this.name = '未定义物品'; // 物品名称
        this.description; // 物品描述
        this.maxStack; // 最大堆叠数量
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

item[1] = new Item();
item[1].id = 1;
item[1].name = '普通木头';
item[1].description = '';
item[1].maxStack = 3;

export { item };
