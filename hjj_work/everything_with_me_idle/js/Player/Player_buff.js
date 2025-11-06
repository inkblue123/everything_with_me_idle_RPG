import { is_Empty_Object, get_uniqueArr } from '../Function/Function.js';
import { add_show_Tooltip, addElement } from '../Function/Dom_function.js';
import { buffs } from '../Data/Buff/Buff.js';
import { enums } from '../Data/Enum/Enum.js';
import { global } from '../GameRun/global_manage.js';
import { player } from './Player.js';
//一个玩家buff对象基类
class BUFF {
    constructor(id) {
        //buff通用变量
        this.id = id; //唯一id
        const copiedData = JSON.parse(JSON.stringify(buffs[id]));
        for (let key in copiedData) {
            this[key] = copiedData[key];
        }
        for (let buff_value of this.buff_value) {
            if (buff_value.buff_type == 'only_start_restore' || buff_value.buff_type == 'only_start_no_restore') {
                buff_value.start_flag = false; //仅需生效一次的效果才会有，记录是否生效
            }
            if (buff_value.buff_type == 'only_start_restore' || buff_value.buff_type == 'continuous_start_restore') {
                buff_value.start_data = 0; //需要还原的效果才会有，记录还原时要扣除的数值
            }
        }
    }
}
//使用游戏时间当作有效期依据的buff
class game_time_BUFF extends BUFF {
    constructor(id) {
        super(id);
        this.time_type = 'game_time_buff';
        this.buff_start_time; //buff启动时间
        this.last_buff_time; //上次触发buff的时间
        this.buff_have_time; //buff剩余有效时间
    }
    init() {
        let time_manage = global.get_time_manage();
        this.buff_start_time = time_manage.get_game_now_time(); //获得buff的游戏时间
        this.last_buff_time = this.buff_start_time; //上次触发buff的时间
        //buff数据库规定这个buff的持续时间
        if (buffs[this.id].time_value == 'infinite') {
            this.buff_have_time = 'infinite';
        } else {
            this.buff_have_time = buffs[this.id].time_value * 1000; //buff剩余有效时间
        }
    }
    //使用存档数据初始化
    load_init(buff_save) {
        let time_manage = global.get_time_manage();
        let game_now_time = time_manage.get_game_now_time();
        if (buff_save.buff_have_time == 'infinite') {
            // this.buff_start_time = buff_save.buff_start_time;//持续时间无限的buff其实不需要起始时间
            this.last_buff_time = game_now_time; //上次触发buff的时间
        } else {
            this.buff_start_time = game_now_time - buff_save.buff_have_time; //推算获得buff的游戏时间
            this.last_buff_time = this.buff_start_time; //上次触发buff的时间
        }
        this.buff_have_time = buff_save.buff_have_time; //buff剩余有效时间
    }
    //检查这个buff应该运行、等待、清除的状态
    get_buff_status(game_now_time) {
        if (this.buff_have_time == 'infinite') {
            //buff持续时间无限，可以执行
        } else {
            //buff持续时间有限，检查时间
            //持续时间归零了
            if (this.buff_have_time <= 0) {
                return 'delete';
            }
        }
        //游戏设定是30帧，也就是现实每秒游戏运行30次，
        //game_time_BUFF如果真的每秒才运行，游戏里看起来会很卡
        //所以实际运行时会每秒运行10次，每次触发1/10的buff效果
        let time_in = game_now_time - this.last_buff_time;
        if (time_in < 100) {
            //时间没到，不生效
            return 'wait';
        } else {
            //时间到了，生效一次
            return 'start';
        }
    }
    //获取这个buff的剩余有效时间
    get_buff_have_time() {
        if ((this.buff_have_time = 'infinite')) {
            return this.buff_have_time;
        } else {
            return Math.floor(this.buff_have_time / 1000);
        }
    }
    //激活一次这个buff
    start_buff(game_now_time) {
        //对基于游戏时间生效的buff，激活时将每秒应当生效的属性和经过的时间进行等比计算，
        let time_in = game_now_time - this.last_buff_time;
        let buff_value_obj = new Object();

        for (let buff_value of this.buff_value) {
            let buff_type = buff_value.buff_type;
            let data_type = buff_value.data_type;
            let data_value = buff_value.data_value;
            //仅需要运行一次的buff，如果已经生效过了，就不需要重复生效
            if (buff_type == 'only_start_no_restore' || buff_type == 'only_start_restore') {
                if (buff_value.start_flag == true) {
                    continue;
                }
            }

            if (is_Empty_Object(buff_value_obj[data_type])) {
                buff_value_obj[data_type] = new Array();
            }
            let obj = new Object();
            obj.buff_id = this.id;
            obj.buff_type = buff_type;
            if (buff_type == 'continuous_start_no_restore') {
                //每帧都生效，清除buff时不需要复原的效果
                let data = get_continuous_start_data(data_value, this.time_type, time_in);
                obj.data = data;
            } else if (buff_type == 'continuous_start_restore') {
                //每帧都生效，清除buff时需要复原的效果
                let data = get_continuous_start_data(data_value, this.time_type, time_in);
                obj.data = data;

                buff_value.start_data += data;
            } else if (buff_type == 'only_start_no_restore') {
                //仅生效一次，清除buff时不需要还原的效果
                obj.data = data_value;
                buff_value.start_flag = true;
            } else if (buff_type == 'only_start_restore') {
                //仅生效一次，清除buff时需要还原的效果
                let true_data = get_true_data(data_value);
                obj.data = true_data;
                buff_value.start_data = true_data;
                buff_value.start_flag = true;
            }
            buff_value_obj[data_type].push(obj);
        }
        //更新参数
        if (this.buff_have_time != 'infinite') {
            this.buff_have_time -= time_in;
        }
        this.last_buff_time = game_now_time;

        return buff_value_obj;
    }
    //清除这个buff的效果
    delete_buff(game_now_time) {
        let buff_value_obj = new Object();
        for (let buff_value of this.buff_value) {
            let buff_type = buff_value.buff_type;
            let data_type = buff_value.data_type;
            let data_value = buff_value.data_value;
            if (buff_type != 'continuous_start_restore' && buff_type != 'only_start_restore') {
                continue;
            }
            if (is_Empty_Object(buff_value_obj[data_type])) {
                buff_value_obj[data_type] = new Array();
            }
            let obj = new Object();
            obj.buff_id = this.id;
            obj.buff_type = buff_type;

            if (buff_type == 'continuous_start_restore') {
                //每帧都生效，清除buff时需要复原的效果
                obj.data = buff_value.start_data * -1;
            } else if (buff_type == 'only_start_restore') {
                //仅生效一次，清除buff时需要还原的效果
                obj.data = buff_value.start_data * -1;
            }
            buff_value_obj[data_type].push(obj);
        }
        return buff_value_obj;
    }
}
//计算持续获得属性的效果，这一次激活应该获得的数值
function get_continuous_start_data(data_value, time_type, time_value) {
    let data; //这一次激活需要提供的属性值

    if (time_type == 'game_time_buff') {
        //持续时间内持续有效的buff
        let time_in = time_value; //生效的单位时间
        data = (data_value / 1000) * time_in; //该单位时间获得的属性
    } else if (time_type == 'combat_active_buff') {
        //持续玩家数个主动技能时间的buff
        data = data_value; //每次生效获得的数值就等于数据库规定的数值
    }
    return data;
}
function get_true_data(raw_data) {
    let true_data = 0;
    if (raw_data === true) {
        true_data = 1;
    } else if (raw_data === false) {
        true_data = -1;
    } else {
        true_data = raw_data;
    }
    return true_data;
}

export class Player_Buff_Manage {
    constructor() {
        this.game_time_buff = new Object(); //所有以游戏内时间为时间依据的buff
        this.combat_round_buff = new Object(); //以玩家战斗回合为时间依据的buff

        this.end_buff_attr = new Object(); //所有buff的效果合计
        this.end_data_attr = new Object(); //所有buff效果中，需要汇入玩家属性类里汇总的属性

        this.end_buff_change_flag = false; //每一帧计算所有buff之后，最终buff有没有发生更改
        this.end_buff_change_data_type = new Array(); //改变了的效果id
        //左上buff界面更新情况
        this.buff_div_init_flag; //左上buff界面是否初始化
        this.game_time_buff_sort_id; //游戏时间buff的id排序情况
        this.combat_round_buff_sort_id; //战斗回合时间buff的id排序情况
    }
    init() {}
    //获取玩家buff部分的游戏存档
    save_Player_Buff_attr() {
        let buff_attr_save = new Object();
        // 使用游戏时间当作有效期依据的buff
        if (!is_Empty_Object(this.game_time_buff)) {
            buff_attr_save.game_time_buff = new Object();
            for (let id in this.game_time_buff) {
                //每个buff目前只保存剩余时间
                //之后或许还需要保存buff的加成效果等参数
                buff_attr_save.game_time_buff[id] = this.game_time_buff[id];
            }
        }

        return buff_attr_save;
    }
    //加载玩家buff部分的游戏存档
    load_Player_Buff_attr(buff_attr_save) {
        //先清空目前的所有buff
        this.reset_buff_attr();

        if (is_Empty_Object(buff_attr_save)) {
            return;
        }

        if (!is_Empty_Object(buff_attr_save.game_time_buff)) {
            for (let id in buff_attr_save.game_time_buff) {
                let buff_obj = new game_time_BUFF(id);
                buff_obj.load_init(buff_attr_save.game_time_buff[id]);
                this.game_time_buff[id] = buff_obj;
            }
        }
    }
    //根据id让玩家获得一个buff
    set_buff_attr(id) {
        if (is_Empty_Object(buffs[id])) {
            console.log('获得id为%s的buff失败，buff数据库不存在这个buff', id);
        }
        //构建buff对象
        let buff_obj = new Object();
        if (buffs[id].time_type == 'game_time_buff') {
            buff_obj = new game_time_BUFF(id);
        }

        buff_obj.init();
        let time_type_ch = buff_obj.time_type;
        //初始想法是将新旧buff的好的部分合并
        // let old_buff = this[time_type_ch][id];
        // if (is_Empty_Object(old_buff)) {
        //     // 没有同名buff，直接新增
        //     this[time_type_ch][id] = buff_obj;
        // } else {
        //     // 有同名buff，将两个buff的好的部分合并
        //     this.update_same_name_buff(old_buff, buff_obj);
        // }
        //没有想好同名的新旧buff如何更新，直接用新buff替换旧buff
        this[time_type_ch][id] = buff_obj;
    }
    //根据id清除玩家的一个buff
    delete_buff_attr(id) {
        let time_type_ch = buffs[id].time_type;
        let buff_value_obj = new Object(); //
        if (!is_Empty_Object(this[time_type_ch][id])) {
            buff_value_obj = this[time_type_ch][id].delete_buff();
            delete this[time_type_ch][id];
        }
        //将buff生效或清除的属性变化更新到最终buff属性里
        this.updata_end_buff_attr(buff_value_obj);
        //最终buff属性变化了，将变化的部分更新到游戏的其他地方去
        if (this.end_buff_change_flag) {
            this.restart_end_buff();
            //重置参数，等待下一帧继续处理
            this.end_buff_change_flag = false;
            this.end_buff_change_data_type = new Array();
        }
    }
    //清空玩家所有buff
    reset_buff_attr() {
        let buff_value_obj = new Object(); //
        if (!is_Empty_Object(this.game_time_buff)) {
            for (let id in this.game_time_buff) {
                buff_value_obj = this.game_time_buff[id].delete_buff();
                delete this.game_time_buff[id];

                //将buff生效或清除的属性变化更新到最终buff属性里
                this.updata_end_buff_attr(buff_value_obj);
            }
        }
        //最终buff属性变化了，将变化的部分更新到游戏的其他地方去
        if (this.end_buff_change_flag) {
            this.restart_end_buff();
            //重置参数，等待下一帧继续处理
            this.end_buff_change_flag = false;
            this.end_buff_change_data_type = new Array();
        }
    }
    //获取最终buff属性
    get_end_buff_attr() {
        return this.end_buff_attr;
    }
    //获取需要更新到玩家属性里的属性
    get_end_data_attr() {
        return this.end_data_attr;
    }
    //游戏运行一帧，计算玩家buff
    run_player_buff() {
        //以游戏内时间为时间依据的buff
        if (!is_Empty_Object(this.game_time_buff)) {
            this.run_game_time_buff();
        }
        //最终buff属性变化了，将变化的部分更新到游戏的其他地方去
        if (this.end_buff_change_flag) {
            this.restart_end_buff();
            //重置参数，等待下一帧继续处理
            this.end_buff_change_flag = false;
            this.end_buff_change_data_type = new Array();
        }
        //更新左上玩家buff界面的信息
        this.updata_buff_show();
    }

    //运行以游戏内时间为时间依据的buff
    run_game_time_buff() {
        let time_manage = global.get_time_manage();
        let game_now_time = time_manage.get_game_now_time();
        for (let id in this.game_time_buff) {
            let buff_obj = this.game_time_buff[id];
            let buff_value_obj = new Object(); //
            let status = buff_obj.get_buff_status(game_now_time); //判断这个buff的状态
            if (status == 'delete') {
                //buff结束了，应该清除
                buff_value_obj = buff_obj.delete_buff(); //清除这个buff的效果
                delete this.game_time_buff[id];
            } else if (status == 'start') {
                //此时buff可以激活一次
                buff_value_obj = buff_obj.start_buff(game_now_time);
            } else if (status == 'wait') {
                //此时buff不能激活，需要等待
            }
            //将buff生效或清除的属性变化更新到最终buff属性里
            this.updata_end_buff_attr(buff_value_obj);
        }
    }
    //更新最终属性
    updata_end_buff_attr(buff_value_obj) {
        if (is_Empty_Object(buff_value_obj)) {
            return;
        }

        this.end_buff_change_flag = true;
        for (let data_type in buff_value_obj) {
            for (let obj of buff_value_obj[data_type]) {
                // let obj = buff_value_obj[data_type];
                if (typeof obj.data != 'number') {
                    console.log('buff效果应该全部转换成数字，%s buff的%s效果异常', obj.buff_id, data_type);
                    continue;
                }
                //data_type效果发生变化，记录id
                this.end_buff_change_data_type.push(data_type);

                if (is_Empty_Object(this.end_buff_attr[data_type])) {
                    this.end_buff_attr[data_type] = new Object();
                    this.end_buff_attr[data_type].now_data = 0;
                    this.end_buff_attr[data_type].last_data = 0;
                }
                //最终属性里用效果id当作key，存储这个效果的最终值和组成部分
                let end_buff_obj = this.end_buff_attr[data_type];

                //data_type效果的最终值
                this.end_buff_attr[data_type].now_data += obj.data;
                //data_type效果的组成部分
                let data_key = obj.buff_type + '_' + obj.buff_id;
                if (is_Empty_Object(end_buff_obj[data_key])) {
                    end_buff_obj[data_key] = 0;
                }
                end_buff_obj[data_key] += obj.data; //记录data_type效果的来源
                //组成部分归零了，说明对应buff被清除，这里的记录也应该清除
                if (end_buff_obj[data_key] == 0) {
                    delete this.end_buff_attr[data_type][data_key];
                }
            }
        }
    }
    //把当前帧内发生变化的buff效果生效
    restart_end_buff() {
        //去重
        this.end_buff_change_data_type = get_uniqueArr(this.end_buff_change_data_type);

        let updata_end_attr_flag = false;

        for (let data_type of this.end_buff_change_data_type) {
            let end_buff_obj = this.end_buff_attr[data_type];
            //获取data_type效果的生效数值
            let end_data;
            if (enums['bool_data_type'].includes(data_type)) {
                if (end_buff_obj.now_data > 0) {
                    end_data = true;
                } else if (end_buff_obj.now_data == 0) {
                    end_data = false;
                } else {
                    console.log('由于js的浮点数误差，这里的结果出现了负数，需要给前面的流程添加约束');
                    end_data = false;
                }
            } else {
                end_data = end_buff_obj.now_data - end_buff_obj.last_data;
            }
            end_buff_obj.last_data = end_buff_obj.now_data;
            //根据效果的id，调用对应的接口，让它们生效
            if (enums['change_data_attr_data_type'].includes(data_type)) {
                change_data_attr(data_type, end_data);
            } else if (enums['updata_end_attr_data_type'].includes(data_type)) {
                if (is_Empty_Object(this.end_data_attr[data_type])) {
                    this.end_data_attr[data_type] = 0;
                }
                this.end_data_attr[data_type] += end_data;
                updata_end_attr_flag = true;
            } else if (enums['global_set_flag_data_type'].includes(data_type)) {
                global_set_flag(data_type, end_data);
            } else if (enums['set_game_speed_num_data_type'].includes(data_type)) {
                set_game_speed_num(end_data);
            } else if (enums['set_game_speed_ratio_data_type'].includes(data_type)) {
                set_game_speed_ratio(end_data);
            } else {
                console.log('%s效果没有定义生效方式', data_type);
            }
        }
        if (updata_end_attr_flag) {
            updata_end_attr_buff();
        }
    }
    //更新左上的玩家buff界面
    updata_buff_show() {
        const buff_show_scroll_box = document.getElementById('buff_show_scroll_box');
        if (buff_show_scroll_box.style.display == 'none') {
            //左上没有展示玩家buff界面，可以不用更新
            this.buff_div_init_flag = false;
            return;
        }
        if (this.buff_div_init_flag == false) {
            //初始化buff界面
            this.game_time_buff_sort_id = this.init_buff_show_div('game_time_buff_show_div', this.game_time_buff);
            this.combat_round_buff_sort_id = this.init_buff_show_div('combat_round_buff_show_div', this.combat_round_buff);
            this.buff_div_init_flag = true;
        }
        //处理当前buff和初始化时的buff区别
        //游戏时间buff
        let now_game_time_buff_sort_id = buff_id_sort(this.game_time_buff);
        if (getArrayDifferences(this.game_time_buff_sort_id, now_game_time_buff_sort_id)) {
            //存在buff变化，重新生成buff界面
            this.game_time_buff_sort_id = this.init_buff_show_div('game_time_buff_show_div', this.game_time_buff);
        } else {
            //没有buff变化，更新所有buff的持续时间
            for (let buff_id in this.game_time_buff) {
                let buff_obj = this.game_time_buff[buff_id];
                updata_buff_show_div(buff_obj);
            }
        }
        //战斗回合buff
        let now_combat_round_buff_sort_id = buff_id_sort(this.combat_round_buff);
        if (getArrayDifferences(this.combat_round_buff_sort_id, now_combat_round_buff_sort_id)) {
            this.combat_round_buff_sort_id = this.init_buff_show_div('combat_round_buff_show_div', this.combat_round_buff);
        } else {
            //没有buff变化，更新所有buff的持续时间
            for (let buff_id in this.combat_round_buff) {
                let buff_obj = this.combat_round_buff[buff_id];
                updata_buff_show_div(buff_obj);
            }
        }
    }
    //初始化左上的buff展示界面
    init_buff_show_div(div_id, buff_objs) {
        //初始化buff界面
        const buff_show_div = document.getElementById(div_id);
        buff_show_div.replaceChildren(); //清空现有buff
        //获取排序后的buffid
        let key_arr = buff_id_sort(buff_objs);
        //将所有buff添加到buff界面
        for (let buff_id of key_arr) {
            add_buff_show_div(buff_objs[buff_id], buff_show_div);
        }
        return key_arr;
    }
}
//对buffid进行排序，以buff的剩余有效时间
function buff_id_sort(buff_objs) {
    let sortData = new Object();
    for (let buff_id in buff_objs) {
        sortData[buff_id] = buff_objs[buff_id].buff_have_time;
    }
    // 分离 infinite 和数值键
    const keys = Object.keys(sortData);
    const infiniteKeys = keys.filter((key) => sortData[key] === 'infinite');
    const numericKeys = keys.filter((key) => sortData[key] !== 'infinite');
    // infinite 按键的字典序排序（升序）
    infiniteKeys.sort((a, b) => a.localeCompare(b));
    // 数值键按值从大到小排序
    numericKeys.sort((a, b) => obj[b] - obj[a]);
    // 合并结果：infinite在前（字典序），数值在后（从大到小）
    return [...infiniteKeys, ...numericKeys];
}
//获取两个数组独有的元素
function getArrayDifferences(arrA, arrB) {
    const set1 = new Set(arrA);
    const set2 = new Set(arrB);

    // 检查arr1是否有arr2没有的元素
    const hasUniqueInArr1 = arrA.some((item) => !set2.has(item));
    // 检查arr2是否有arr1没有的元素
    const hasUniqueInArr2 = arrB.some((item) => !set1.has(item));

    return hasUniqueInArr1 || hasUniqueInArr2;
}
//向左上buff展示界面添加一个buff
function add_buff_show_div(buff_obj, show_div) {
    //初始文本
    let buff_id = buff_obj.id;
    let ch = buffs[buff_id].name;
    let time_type = buff_obj.time_type;
    let have_time = buff_obj.get_buff_have_time();
    if (have_time == 'infinite') {
        ch = ch + '<br>&nbsp';
    } else if (time_type == 'game_time_buff') {
        ch = ch + '<br>' + have_time + '秒';
    } else if (time_type == 'combat_round_buff') {
        // ch = ch + '<br>' + have_time + '回合';
    } else {
        console.log('未知时间类型的buff，不知道应该如何设置文本');
        return;
    }

    let div_id = 'buffid_' + buff_id;
    let abuff_div = addElement(show_div, 'div', div_id, 'buff_show');
    abuff_div.innerHTML = ch;
    abuff_div.dataset.buff_have_time = have_time;
    let tip_value = JSON.parse(JSON.stringify(buff_obj));
    add_show_Tooltip(abuff_div, 'buff', tip_value);
}
//更新左上buff展示界面的一个buff组件的文本
function updata_buff_show_div(buff_obj) {
    let buff_id = buff_obj.id;
    let ch = buffs[buff_id].name;
    let time_type = buff_obj.time_type;
    let have_time = buff_obj.get_buff_have_time();
    if (have_time == 'infinite') {
    } else if (time_type == 'game_time_buff') {
        ch = ch + '<br>' + have_time + '秒';
    } else if (time_type == 'combat_round_buff') {
        // ch = ch + '<br>' + have_time + '回合';
    } else {
        console.log('未知时间类型的buff，不知道应该如何设置文本');
        return;
    }
    let div_id = 'buffid_' + buff_id;
    const abuff_div = document.getElementById(div_id);
    if (abuff_div.dataset.buff_have_time != have_time) {
        abuff_div.innerHTML = ch;
        abuff_div.dataset.buff_have_time = have_time;
    }
}
//改变玩家属性接口
function change_data_attr(data_type, end_data) {
    let P_attr = player.get_player_attributes();
    P_attr.change_data_attr(data_type, end_data);
}
//更新玩家最终属性中buff部分接口
function updata_end_attr_buff() {
    // let P_attr = player.get_player_attributes();
    // P_attr.updata_end_attr('buff');
    player.updata_end_attr('buff');
}
//修改游戏状态
function global_set_flag(data_type, end_data) {
    global.set_flag(data_type, end_data);
}
//修改游戏速度，加算部分
function set_game_speed_num(end_data) {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_num('buff', end_data);
}
//修改游戏速度，乘算部分
function set_game_speed_ratio(end_data) {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_ratio('buff', end_data);
}
