import { is_Empty_Object } from '../../Function/Function.js';
import { addElement, get_radio_switch_click_value } from '../../Function/Dom_function.js';
import { global } from '../global_manage.js';
import { items } from '../../Data/Item/Item.js';
import { enums } from '../../Data/Enum/Enum.js';
import { updata_IB_item_value_div } from './item_library.js';

//图鉴管理类
export class Library_manage {
    constructor() {
        this.item_library_data = new Object(); //物品图鉴数据
        this.item_type_library_data = new Object(); //物品大类下的小类图鉴数据
        this.skill_library_data = new Object(); //技能图鉴数据
        this.enemy_library_data = new Object(); //敌人图鉴数据
        this.event_library_data = new Object(); //事件图鉴数据
        this.rule_library_data = new Object(); //游戏机制图鉴数据
        this.normal_chapter = 2; //图鉴系统可用的最大游戏章节
    }
    init() {}
    //获取图鉴类的游戏存档
    save_library_manage() {
        let library_save = new Object();
        library_save.item_library_data = this.item_library_data;
        library_save.skill_library_data = this.skill_library_data;
        library_save.enemy_library_data = this.enemy_library_data;
        library_save.event_library_data = this.event_library_data;
        library_save.rule_library_data = this.rule_library_data;
        library_save.item_type_library_data = this.item_type_library_data;
        return library_save;
    }
    //加载图鉴类的游戏存档
    load_library_manage(library_save) {
        if (is_Empty_Object(library_save)) {
            return;
        }
        this.item_library_data = library_save.item_library_data;
        this.skill_library_data = library_save.skill_library_data;
        this.enemy_library_data = library_save.enemy_library_data;
        this.event_library_data = library_save.event_library_data;
        this.rule_library_data = library_save.rule_library_data;
        this.item_type_library_data = library_save.item_type_library_data || new Object();
        //更新分类按钮
        this.update_IB_switch_div();
        //更新图鉴列表
        this.updata_IB_select_div();
    }
    //获得物品时更新图鉴
    get_item_updata_library(item_obj) {
        let item_id = item_obj.id;

        //检查图鉴数据中是否已有该物品id的记录
        if (is_Empty_Object(this.item_library_data[item_id])) {
            //没有获得过，在图鉴数据中创建该物品id
            this.item_library_data[item_id] = new Object();
            this.item_library_data[item_id].get_count = 0;
        }

        //增加历史获得计数
        this.item_library_data[item_id].get_count++;

        //判断物品大类
        if (items[item_id].main_type == 'equipment') {
            // 装备需要额外更新同稀有度获得计数
            let equip_rarity = item_obj.equip_rarity;

            //检查图鉴数据中是否已有该稀有度的记录
            if (is_Empty_Object(this.item_library_data[item_id].rarity_count)) {
                this.item_library_data[item_id].rarity_count = new Object();
            }
            if (is_Empty_Object(this.item_library_data[item_id].rarity_count[equip_rarity])) {
                this.item_library_data[item_id].rarity_count[equip_rarity] = 0;
            }

            //增加同稀有度获得计数
            this.item_library_data[item_id].rarity_count[equip_rarity]++;
        }

        //更新物品大类下的小类图鉴数据
        let item_main_type = items[item_id].main_type;
        let item_secon_type = items[item_id].secon_type;
        if (is_Empty_Object(this.item_type_library_data[item_main_type])) {
            this.item_type_library_data[item_main_type] = new Object();
        }
        this.item_type_library_data[item_main_type][item_secon_type] = true;
    }
    //使用消耗品时更新图鉴
    use_item_updata_library(item_obj) {
        let item_id = item_obj.id;
        //校验物品大类，非消耗品不处理
        if (items[item_id].main_type != 'consumable') {
            console.log('使用消耗品时更新图鉴：输入物品的大类异常，%s不是消耗品', item_id);
            return;
        }
        //从物品数据库获取使用方式
        let use_type = items[item_id].use_type;

        if (use_type == 'none') {
            //不可点击使用，不处理
            return;
        } else if (use_type == 'sustain_use') {
            //持续使用型，使用进度达到100时记录使用完成
            if (is_Empty_Object(this.item_library_data[item_id])) {
                this.item_library_data[item_id] = new Object();
                this.item_library_data[item_id].max_use_ratio = 0;
            }
            if (is_Empty_Object(this.item_library_data[item_id].max_use_ratio)) {
                this.item_library_data[item_id].max_use_ratio = 0;
            }
            if (item_obj.use_ratio > this.item_library_data[item_id].max_use_ratio) {
                this.item_library_data[item_id].max_use_ratio = item_obj.use_ratio;
            }
        } else if (use_type == 'once_use') {
            //一次性使用型，记录使用次数+1
            if (is_Empty_Object(this.item_library_data[item_id])) {
                this.item_library_data[item_id] = new Object();
            }
            if (is_Empty_Object(this.item_library_data[item_id].use_count)) {
                this.item_library_data[item_id].use_count = 0;
            }
            this.item_library_data[item_id].use_count++;
        } else if (use_type == 'keep_use') {
            //自动消耗型，暂不处理
        } else if (use_type == 'condition_once_use') {
            //满足条件时一次性使用，暂不处理
        } else if (use_type == 'condition_sustain_use') {
            //满足条件时持续使用，暂不处理
        }
    }

    //检查更新技能图鉴
    check_updata_skill_library() {}

    //检查更新敌人图鉴
    check_updata_enemy_library() {}

    //检查更新事件图鉴
    check_updata_event_library() {}

    //检查更新游戏机制图鉴
    check_updata_rule_library() {}

    //获取一个具体图鉴条目的存储数据
    get_library_data(type, id) {
        //根据type选择对应的图鉴数据结构
        let data_map = {
            item: this.item_library_data,
            skill: this.skill_library_data,
            enemy: this.enemy_library_data,
            event: this.event_library_data,
            rule: this.rule_library_data,
        };
        let library_data = data_map[type];
        if (library_data && !is_Empty_Object(library_data[id])) {
            return library_data[id];
        }
        //图鉴数据中没有记录，返回空
        console.log('没有查询到%s的%s图鉴数据，理论上不应该出现', type, id);
        return new Object();
    }

    //更新图鉴左侧的分类按钮界面
    update_IB_switch_div() {
        //物品部分
        update_IB_item_switch_div(this.item_type_library_data);
        //技能部分
        //敌人部分
        //事件部分
        //游戏机制部分
    }
    //更新展示所有图鉴条目的div界面
    updata_IB_select_div() {
        //获取IB_select_div并清空现有内容
        let IB_select_div = document.getElementById('IB_select_div');
        IB_select_div.replaceChildren();

        //获取图鉴左侧一级分类单选按钮当前点亮的是哪个类型
        let IB_1_switch_value = get_radio_switch_click_value('IB_1_switch');

        if (IB_1_switch_value == 'IB_select_button') {
            updata_IB_item_select_div(this.normal_chapter, this.item_library_data); //物品
        } else if (IB_1_switch_value == 'IB_skill_button') {
            updata_IB_skill_select_div(this.normal_chapter); //技能
        } else if (IB_1_switch_value == 'IB_enemy_button') {
            updata_IB_enemy_select_div(this.normal_chapter); //敌人
        } else if (IB_1_switch_value == 'IB_event_button') {
            updata_IB_event_select_div(this.normal_chapter); //事件
        } else if (IB_1_switch_value == 'IB_rule_button') {
            updata_IB_rule_select_div(this.normal_chapter); //游戏机制
        }
    }
    //更新展示一个具体图鉴条目的界面
    updata_IB_value_div(type, id) {
        let IB_value_content_div = document.getElementById('IB_value_content_div');
        IB_value_content_div.replaceChildren();

        if (type == 'item') {
            updata_IB_item_value_div(this.item_library_data, id); //物品
        } else if (type == 'skill') {
            // updata_IB_skill_value_div(this.normal_chapter); //技能
        } else if (type == 'enemy') {
            // updata_IB_enemy_value_div(this.normal_chapter); //敌人
        } else if (type == 'event') {
            // updata_IB_event_value_div(this.normal_chapter); //事件
        } else if (type == 'rule') {
            // updata_IB_rule_value_div(this.normal_chapter); //游戏机制
        }
    }
}
//切换图鉴界面的选择列表和详情内容显示
function change_IB_select_or_value_div(div_id) {
    const select_box = document.getElementById('IB_select_scroll_box');
    const IB_value_div = document.getElementById('IB_value_div');
    if (div_id == 'IB_select_scroll_box') {
        select_box.style.display = '';
        IB_value_div.style.display = 'none';
    } else if (div_id == 'IB_value_div') {
        select_box.style.display = 'none';
        IB_value_div.style.display = '';
    }
}
//获取当前图鉴显示模式：IB_show_have（已拥有）或 IB_show_all（全部）
function get_IB_show_mode() {
    const IB_show_have_div = document.getElementById('IB_show_have_div');
    if (IB_show_have_div && IB_show_have_div.style.display !== 'none') {
        return 'IB_show_have';
    }
    return 'IB_show_all';
}

//更新图鉴左侧的物品部分分类按钮显示
function update_IB_item_switch_div(item_type_library_data) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    //三种物品大类对应的小类枚举和3级按钮id前缀
    let item_main_types = ['equipment', 'consumable', 'material'];
    let secon_type_enum_of = {
        equipment: enums.Equipment_secon_type,
        consumable: enums.Consumable_secon_type,
        material: enums.Material_secon_type,
    };
    let id_prefix_of = {
        equipment: 'IB_item_E_',
        consumable: 'IB_item_C_',
        material: 'IB_item_M_',
    };

    //按三种物品大类循环处理
    for (let main_type of item_main_types) {
        //获取该大类下已获得的小类数据
        let sub_data = item_type_library_data[main_type];
        if (is_Empty_Object(sub_data)) {
            sub_data = new Object();
        }
        //获取该大类下所有小类的枚举列表
        let secon_type_list = secon_type_enum_of[main_type];
        let id_prefix = id_prefix_of[main_type];
        //遍历每个小类
        for (let secon_type of secon_type_list) {
            //构造该小类按钮容器的唯一id：IB_item_E_{secon_type}radio_div
            let radio_div_id = id_prefix + secon_type + 'radio_div';
            let radio_div = document.getElementById(radio_div_id);
            if (!radio_div) {
                console.log('没有找到%s小类对应的图鉴分类按钮', secon_type);
                continue;
            }
            if (IB_show_mod == 'IB_show_all') {
                //显示全部：所有小类按钮都显示
                radio_div.style.display = '';
            } else if (IB_show_mod == 'IB_show_have') {
                //只显示已拥有：根据小类图鉴数据决定显隐
                if (sub_data[secon_type]) {
                    radio_div.style.display = '';
                } else {
                    radio_div.style.display = 'none';
                }
            }
        }
    }
}

//物品分类的展示所有图鉴条目界面
function updata_IB_item_select_div(normal_chapter, item_library_data) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    //获取物品二级分类
    let IB_2_switch_value = get_radio_switch_click_value('IB_2_switch');
    //获取物品三级分类
    let IB_3_switch_value = get_radio_switch_click_value('IB_switch');
    //按物品的章节归属归类物品id
    let chapter_items = new Object();
    for (let chapter = 0; chapter <= normal_chapter; chapter++) {
        chapter_items[chapter] = new Array();
    }
    //遍历物品数据库，按二级分类过滤并按章节归类
    for (let item_id in items) {
        let item = items[item_id];
        //根据二级分类按钮过滤物品大类
        if (IB_2_switch_value == 'IB_item_E') {
            //武器装备大类
            if (item.main_type != 'equipment') {
                continue;
            }
        } else if (IB_2_switch_value == 'IB_item_C') {
            //消耗品大类
            if (item.main_type != 'consumable') {
                continue;
            }
        } else if (IB_2_switch_value == 'IB_item_M') {
            //材料大类
            if (item.main_type != 'material') {
                continue;
            }
        }
        //IB_2_switch_value为undefined时（仅三级IB_item_all模式），不按大类过滤

        //根据三级分类按钮过滤物品小类
        if (IB_3_switch_value && IB_3_switch_value != 'IB_item_all' && IB_3_switch_value != 'IB_item_E_all' && IB_3_switch_value != 'IB_item_C_all' && IB_3_switch_value != 'IB_item_M_all') {
            //三级分类是具体小类，物品小类数组包含该小类才算通过
            if (!item.secon_type.includes(IB_3_switch_value)) {
                continue;
            }
        }

        //根据图鉴显示模式过滤
        let is_lit = !is_Empty_Object(item_library_data[item_id]); //该物品是否在图鉴中有记录
        if (IB_show_mod == 'IB_show_have') {
            //只显示点亮的图鉴
            if (!is_lit) {
                continue;
            }
        } else if (IB_show_mod == 'IB_show_all') {
            //全部显示
        }
        //获取物品的章节归属
        let item_chapter = item.chapter;
        //只保留在当前normal_chapter范围内的物品
        if (item_chapter >= 0 && item_chapter <= normal_chapter) {
            let item_data = new Object();
            item_data.id = item_id; //物品id
            item_data.is_lit = is_lit;
            chapter_items[item_chapter].push(item_data);
        }
    }
    let IB_select_div = document.getElementById('IB_select_div');
    //根据章节数循环生成
    for (let chapter = 1; chapter <= normal_chapter; chapter++) {
        //生成章节标题行
        let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
        IB_select_title_div.innerHTML = '第' + chapter + '章';
        //生成容纳按钮布局
        let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');
        let chapter_item_ids = chapter_items[chapter];
        if (chapter_item_ids.length == 0) {
            //该章节没有物品，显示"无"
            IB_select_button_div.innerHTML = '无';
        } else {
            //遍历该章节的每个物品，生成按钮
            for (let item_data of chapter_item_ids) {
                let item_id = item_data.id;
                let is_lit = item_data.is_lit;
                if (is_lit) {
                    //图鉴点亮，正常显示
                    let button = addElement(IB_select_button_div, 'button', null, 'IB_select_button');
                    button.innerHTML = items[item_id].name;
                    //点击切换到详情界面
                    button.onclick = function () {
                        change_IB_select_or_value_div('IB_value_div');
                        let library_manage = global.get_library_manage();
                        library_manage.updata_IB_value_div('item', item_id);
                    };
                } else {
                    //图鉴未点亮，使用禁用样式
                    let button = addElement(IB_select_button_div, 'button', null, 'IB_select_button btn_disabled');
                    button.innerHTML = '？？？';
                }
            }
        }
    }

    //生成没有归纳章节的物品的图鉴界面
    let chapter_0_item_ids = chapter_items[0];
    if (chapter_0_item_ids.length == 0) {
        //该章节没有物品，显示"无"
        return;
    }
    let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
    IB_select_title_div.innerHTML = '未归纳章节物品';
    //生成容纳按钮布局
    let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');
    //遍历该章节的每个物品，生成按钮
    for (let item_data of chapter_0_item_ids) {
        let item_id = item_data.id;
        let button = addElement(IB_select_button_div, 'button', null, 'IB_select_button');
        button.innerHTML = items[item_id].name;
        //点击切换到详情界面
        button.onclick = function () {
            change_IB_select_or_value_div('IB_value_div'); //切换到图鉴详细界面
            let library_manage = global.get_library_manage();
            library_manage.updata_IB_value_div('item', item_id); //更新图鉴详情界面到item_id
        };
    }
}
//技能分类的展示所有图鉴条目界面
function updata_IB_skill_select_div(normal_chapter) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    let IB_select_div = document.getElementById('IB_select_div');
    //获取技能二级分类
    let IB_switch_value = get_radio_switch_click_value('IB_switch');

    //根据章节数循环生成
    for (let i = 1; i <= normal_chapter; i++) {
        let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
        IB_select_title_div.innerHTML = '第' + i + '章';

        let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');

        //TODO：遍历技能数据库，根据二级分类和章节过滤生成按钮
    }
}
//敌人分类的展示所有图鉴条目界面
function updata_IB_enemy_select_div(normal_chapter) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    let IB_select_div = document.getElementById('IB_select_div');
    //获取敌人二级分类
    let IB_switch_value = get_radio_switch_click_value('IB_switch');

    //根据章节数循环生成
    for (let i = 1; i <= normal_chapter; i++) {
        let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
        IB_select_title_div.innerHTML = '第' + i + '章';

        let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');

        //TODO：遍历敌人数据库，根据二级分类和章节过滤生成按钮
    }
}
//事件分类的展示所有图鉴条目界面
function updata_IB_event_select_div(normal_chapter) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    let IB_select_div = document.getElementById('IB_select_div');
    //获取事件二级分类
    let IB_switch_value = get_radio_switch_click_value('IB_switch');

    //根据章节数循环生成
    for (let i = 1; i <= normal_chapter; i++) {
        let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
        IB_select_title_div.innerHTML = '第' + i + '章';

        let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');

        //TODO：遍历事件数据库，根据二级分类和章节过滤生成按钮
    }
}
//游戏机制分类的展示所有图鉴条目界面
function updata_IB_rule_select_div(normal_chapter) {
    //获取图鉴显示模式
    let IB_show_mod = get_IB_show_mode();
    let IB_select_div = document.getElementById('IB_select_div');
    //获取游戏机制二级分类
    let IB_switch_value = get_radio_switch_click_value('IB_switch');

    //根据章节数循环生成
    for (let i = 1; i <= normal_chapter; i++) {
        let IB_select_title_div = addElement(IB_select_div, 'div', null, 'IB_select_title_div');
        IB_select_title_div.innerHTML = '第' + i + '章';

        let IB_select_button_div = addElement(IB_select_div, 'div', null, 'IB_select_button_div');

        //TODO：遍历游戏机制数据库，根据二级分类和章节过滤生成按钮
    }
}
