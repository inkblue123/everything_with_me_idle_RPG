var items = new Object();
//物品的类别枚举
const Item_type = Object.freeze({
    //武器装备 equipment
    Weapon: 'weapon', //武器
    Armor: 'armor', //防具
    Deputy: 'deputy', //副手
    Ornament: 'ornament', //饰品
    //消耗品 consumable
    Restore: 'Restore_CSB', //恢复消耗品
    Buff: 'buff_CSB', //buff消耗品
    Combat: 'combat_CSB', //战斗消耗品
    Life: 'life_CSB', //生活消耗品
    //材料 Material
    Raw: 'raw_MTR', //原材料
    Process: 'process_MTR', //加工材料
    Finish: 'finish_MTR', //成品
    Other: 'other_MTR', //其他物品
});

class Item {
    constructor() {
        this.id = 0; //唯一id
        this.name = '未定义物品'; // 物品名称
        this.description; // 物品描述
        this.maxStack; // 最大堆叠数量
        this.type = new Array(); //类型
    }
}

items[1] = new Item();
items[1].id = 1;
items[1].name = '橡树原木';
items[1].description = '';
items[1].maxStack = 3;
items[1].type = ['raw_MTR'];

items[2] = new Item();
items[2].id = 2;
items[2].name = '木剑';
items[2].description = '';
items[2].maxStack = 1;
items[2].type = ['weapon'];

export { items };
