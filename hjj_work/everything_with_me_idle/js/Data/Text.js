var texts = new Object();

class Text {
    constructor(id) {
        this.id = id; //唯一id
        //设置多种类型的文本是为了预防同id的情况
        this.item_desc; //物品描述
        this.type_desc; //类型描述
    }
}

texts['Oak_logs'] = new Text('Oak_logs');
texts['Oak_logs'].item_desc = '一块足够大的橡树原木，可以进行加工，有效率的伐木才能获得更多的原木，而不是木屑';
texts['Oak_woodchip'] = new Text('Oak_woodchip');
texts['Oak_woodchip'].item_desc = '一堆橡木的碎片，伐木时如果砍的太碎了，那就只能获得木屑了';

texts['Willow_logs'] = new Text('Willow_logs');
texts['Willow_logs'].item_desc = '一块足够大的柳树原木';
texts['Willow_woodchip'] = new Text('Willow_woodchip');
texts['Willow_woodchip'].item_desc = '一堆柳木碎屑，它所在的木头应该遭受了难以想象的折磨，才会变得如此细碎';

texts['normal_board'] = new Text('normal_board');
texts['normal_board'].item_desc =
    '去除了原木上的树皮、裂纹之后的完整木板，理论上任何木头都能做成普通木板，感觉伐木技巧好一些甚至能直接从树里砍出木板，加工指南还说要保留原木的纹理，哪有那么麻烦';
texts['Oak_board'] = new Text('Oak_board');
texts['Oak_board'].item_desc = '用橡木制成的完整木板，保留了橡木的纹理，用它制作的物品应该更耐用';
texts['Willow_board'] = new Text('Willow_board');
texts['Willow_board'].item_desc =
    '用柳木制成的完整木板，保留了柳木的纹理，要是拿它去做一些形状不合适的物品岂不是浪费了纹路？所以用处比普通木板少';

texts['wood_sword'] = new Text('wood_sword');
texts['wood_sword'].item_desc = '使用木头制作的剑，并不如何锋利，仅仅是可以挥舞罢了';
texts['wood_battle_axe'] = new Text('wood_battle_axe');
texts['wood_battle_axe'].item_desc = '使用木头制作的战斧，削出了一个棱角充当斧刃，看来只能打架，不能用来砍树了';
texts['wood_sticks'] = new Text('wood_sticks');
texts['wood_sticks'].item_desc =
    '使用木头制作的棍棒，感觉把树木砍伐做出木板再做成树枝的形状并叫做“木棒”的这个过程很蠢，不如直接捡真木棒';
texts['wood_hammers'] = new Text('wood_hammers');
texts['wood_hammers'].item_desc = '使用木头制作的大锤，使用起来和直接挥舞原木战斗没什么区别';

texts['wood_bow(n)'] = new Text('wood_bow(n)');
texts['wood_bow(n)'].item_desc = '使用木头制作的弓，还没有上弦，至少足够拿在手里了';
texts['wood_bow'] = new Text('wood_bow');
texts['wood_bow'].item_desc = '使用木头制作的弓，想要正常使用它，需要有弹药，你会在有弹药的情况下正常使用的对吧';

texts['wood_arrow'] = new Text('wood_arrow');
texts['wood_arrow'].item_desc = '使用木头制作的箭矢，没有尾羽，没有箭头，只是一根细木棍而已';

texts['sword'] = new Text('sword');
texts['sword'].type_desc = '可以对敌人造成锋利伤害';

export { texts };
