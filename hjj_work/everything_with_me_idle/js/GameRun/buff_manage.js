import { is_Empty_Object } from '../Function/Function.js';
import { global } from './global_manage.js';
import { buffs } from '../Data/Buff/Buff.js';
import { add_show_Tooltip, addElement } from '../Function/Dom_function.js';
//全局buff结算层（调度台）
//职责：① 按效果目标分派、把效果作用到目标身上（apply_buff_effects 与 5 个生效函数）
//      ② 收集本帧各目标产出的「动作请求」→ 协调只有它能做的跨目标操作 → 统一生效 → 清空
//性质：无状态、不进存档（与 combat_manage 一致）
//注意：buff 容器与累加器不在这里，仍在各目标身上（玩家侧是 player.player_buff_manage）
//      —— data_attr.js 的 Summary_buff_attr() 是从目标侧取 get_end_data_attr() 的

export class Buff_manage {
    constructor() {
        this.request_queue = new Array(); //本帧各目标推送上来的动作请求
        //──── 目标来源清单 ────
        //每一项 = 一类来源，来源自己回答「本帧有哪些 buff 容器」
        //（一个容器就是一个目标的 buff 载体。这里返回容器而不是目标对象，是为了让消费者
        //  ——比如界面刷新——不必知道各目标专属的取用方法名；容器身上有 target，需要时再取）
        //顺序就是遍历顺序（ADR-19：玩家优先 → 敌人按格子顺序 → 区域）
        //  玩家：常驻单例，用「登记型」（Player.js 启动时注册一次）
        //  敌人：每帧变（刷出 / 死亡 / 离场），将来用「拉取型」去问 combat_manage
        //  环境（格子区域）：随战斗地点 / 格子存在，将来也用「拉取型」
        this.player_buff_holders = new Array(); //玩家是登记型，登记到这里
        this.target_sources = [
            { kind: 'player', get_buff_holders: () => this.player_buff_holders },
            { kind: 'enemy', get_buff_holders: () => [] }, //未实现：拉取型
            { kind: 'area', get_buff_holders: () => [] }, //未实现：拉取型
        ];
        //动作表：动作名 -> 处理函数
        //动作通道本期未开发，表里没有任何动作；
        //将来加动作时在这里登记，调度台不用改结构
        this.action_table = new Object();
        //玩家buff界面的渲染缓存（2026-09-24 从 Player_buff.js 搬来）
        //⚠️ 目前只有玩家一个目标会用到它们；将来敌人也接进来之前，
        //   必须先给敌人加自己的缓存，否则会共用这三份，症状是：
        //   ①「没变化就逐条更新」的分支永远走不到，每帧整体重建；
        //   ②玩家面板一隐藏（buff_div_init_flag = false）会把敌人的也判成未初始化，来回抖。
        this.player_buff_div_init_flag = false; //左上buff界面是否初始化
        this.player_game_time_buff_sort_id; //游戏时间buff的id排序情况
        this.player_combat_round_buff_sort_id; //战斗回合时间buff的id排序情况

        this.hovering_buff_id = null; //鼠标当前停在哪个buff图标上（存buff id）
    }
    init() {}
    //把一个目标的 buff 容器登记进某类来源
    //目前只有玩家是「登记型」；敌人 / 环境将来是「拉取型」（来源自己去问系统），不走登记
    register_buff_holder(kind, buff_holder) {
        if (kind != 'player') {
            console.log('目标来源%s目前没有实现登记（将来是拉取型），本次登记被忽略', kind);
            return;
        }
        if (this.player_buff_holders.includes(buff_holder)) {
            return;
        }
        this.player_buff_holders.push(buff_holder);
    }
    //按来源顺序取本帧所有 buff 容器（遍历顺序 = target_sources 的顺序）
    get_all_buff_holders() {
        let all = new Array();
        for (let source of this.target_sources) {
            for (let buff_holder of source.get_buff_holders()) {
                all.push(buff_holder);
            }
        }
        return all;
    }
    //目标侧把本帧产出的动作请求推上来
    push_request(request) {
        this.request_queue.push(request);
    }
    get_request_num() {
        return this.request_queue.length;
    }
    get_action_table() {
        return this.action_table;
    }
    //每帧统一结算：取出本帧收集到的请求，逐条执行，然后清空
    //生效顺序：玩家优先，其余按登记顺序；目标之内按 buff 产出先后（队列本身就是产出顺序）
    run_buff_scheduler() {
        if (is_Empty_Object(this.request_queue)) {
            return;
        }
        for (let request of this.request_queue) {
            this.do_request(request);
        }
        //收完就清，本层不保留任何跨帧状态
        this.request_queue = new Array();
    }
    //每帧刷新各目标的buff界面
    //调度台只负责「遍历目标 + 定顺序」，具体的画法（DOM 操作）留在目标侧：
    //玩家画左上那块面板，敌人将来画自己格子里的图标
    run_buff_show_scheduler() {
        for (let buff_holder of this.get_all_buff_holders()) {
            this.refresh_buff_show(buff_holder);
        }
    }
    //刷新一个目标的buff界面
    //目前只有玩家有 buff 界面（容器的 buff_show_kind == 'player'），三个渲染缓存在调度台上
    refresh_buff_show(buff_holder) {
        if (buff_holder.buff_show_kind != 'player') {
            //这个目标还没有 buff 界面，跳过（敌人将来在这里接自己的缓存与画法）
            return;
        }
        //鼠标停着的那个buff图标如果已经消失，提示窗收不到mouseleave，会留在屏幕上
        this.close_stale_buff_tooltip(buff_holder);
        const buff_show_scroll_box = document.getElementById('buff_show_scroll_box');
        if (buff_show_scroll_box.style.display == 'none') {
            //左上没有展示玩家buff界面，可以不用更新
            this.player_buff_div_init_flag = false;
            return;
        }
        if (this.player_buff_div_init_flag == false) {
            //初始化buff界面
            this.player_game_time_buff_sort_id = this.init_buff_show_div('game_time_buff_show_div', buff_holder.game_time_buff);
            this.player_combat_round_buff_sort_id = this.init_buff_show_div('combat_round_buff_show_div', buff_holder.combat_round_buff);
            this.player_buff_div_init_flag = true;
        }
        //处理当前buff和初始化时的buff区别
        //游戏时间buff
        let now_game_time_buff_sort_id = buff_id_sort(buff_holder.game_time_buff);
        if (getArrayDifferences(this.player_game_time_buff_sort_id, now_game_time_buff_sort_id)) {
            //存在buff变化，重新生成buff界面
            this.player_game_time_buff_sort_id = this.init_buff_show_div('game_time_buff_show_div', buff_holder.game_time_buff);
        } else {
            //没有buff变化，更新所有buff的持续时间
            for (let buff_id in buff_holder.game_time_buff) {
                let buff_obj = buff_holder.game_time_buff[buff_id];
                updata_buff_show_div(buff_obj);
            }
        }
        //战斗回合buff
        let now_combat_round_buff_sort_id = buff_id_sort(buff_holder.combat_round_buff);
        if (getArrayDifferences(this.player_combat_round_buff_sort_id, now_combat_round_buff_sort_id)) {
            this.player_combat_round_buff_sort_id = this.init_buff_show_div('combat_round_buff_show_div', buff_holder.combat_round_buff);
        } else {
            //没有buff变化，更新所有buff的持续时间
            for (let buff_id in buff_holder.combat_round_buff) {
                let buff_obj = buff_holder.combat_round_buff[buff_id];
                updata_buff_show_div(buff_obj);
            }
        }
    }
    //初始化一个buff展示分区（清空后按剩余时间排序重建）
    init_buff_show_div(div_id, buff_objs) {
        //初始化buff界面
        const buff_show_div = document.getElementById(div_id);
        buff_show_div.replaceChildren(); //清空现有buff
        //获取排序后的buffid
        let key_arr = buff_id_sort(buff_objs);
        //将所有buff添加到buff界面
        for (let buff_id of key_arr) {
            this.add_buff_show_div(buff_objs[buff_id], buff_show_div);
        }
        return key_arr;
    }
    //关闭「图标已经被删掉、提示窗却还开着」的buff提示窗
    //背景：buff面板是靠 replaceChildren() 整体重建的，鼠标正悬停的那一格被删掉时，
    //      浏览器不会给它补发mouseleave，于是提示窗再也不关（见 Version.txt 的待解决问题）
    //只处理buff提示窗，物品/技能等其他提示窗不受影响
    close_stale_buff_tooltip(buff_holder) {
        if (this.hovering_buff_id == null) {
            //鼠标没有停在buff图标上，没有残留风险
            return;
        }
        //提示窗正在显示的那个buff还在容器里，就什么都不用做
        let game_time_buff = buff_holder.game_time_buff;
        if (game_time_buff != undefined && game_time_buff[this.hovering_buff_id] != undefined) {
            return;
        }
        let combat_round_buff = buff_holder.combat_round_buff;
        if (combat_round_buff != undefined && combat_round_buff[this.hovering_buff_id] != undefined) {
            return;
        }
        //这个buff已经不在任何容器里了，提示窗留着也没有意义
        let tooltip = document.getElementById('tooltip');
        if (tooltip != null && tooltip.type == 'buff') {
            tooltip.CloseTip();
        }
        this.hovering_buff_id = null;
    }
    //──────── 效果分派与落地 ────────
    //「按效果目标分派」的执行端：目标侧只把本帧变化的 data_type 记下来，
    //真正的 5 路分派、以及「把效果作用到目标身上」都在这里做
    //buff_holder：目标身上的 buff 容器对象（Player_Buff_Manage）
    //             累加器 end_buff_attr / end_data_attr 与 target_dispatch 都还留在它身上
    apply_buff_effects(buff_holder) {
        let updata_end_attr_flag = false;

        for (let data_type of buff_holder.end_buff_change_data_type) {
            let end_buff_obj = buff_holder.end_buff_attr[data_type];
            let dispatch = buff_holder.target_dispatch[data_type]; //这个效果该分发给谁
            //获取data_type效果的生效数值
            let end_data;
            if (dispatch == 'flag') {
                //游戏标记是布尔量，用累加和的正负判断真假
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
            //根据效果的分发方式，调用对应的接口，让它们生效
            if (dispatch == 'resource') {
                change_data_attr(buff_holder.target, data_type, end_data);
            } else if (dispatch == 'attr') {
                if (is_Empty_Object(buff_holder.end_data_attr[data_type])) {
                    buff_holder.end_data_attr[data_type] = 0;
                }
                buff_holder.end_data_attr[data_type] += end_data;
                updata_end_attr_flag = true;
            } else if (dispatch == 'flag') {
                global_set_flag(buff_holder.target, data_type, end_data);
            } else if (dispatch == 'game_speed_num') {
                set_game_speed_num(buff_holder.target, end_data);
            } else if (dispatch == 'game_speed_ratio') {
                set_game_speed_ratio(buff_holder.target, end_data);
            } else {
                console.log('%s效果没有定义生效方式', data_type);
            }
        }
        if (updata_end_attr_flag) {
            updata_end_attr_buff(buff_holder.target);
        }
    }
    //──────── 获得 / 移除 / 清空 ────────
    //buff 的增删清空都在这里决策；目标侧只提供容器、实例工厂（create_buff_instance）与记账收尾（flush_end_buff_change）
    //根据id让目标获得一个buff
    //runtime_data：可选，施加时传参，形如 { time_value, effects }。
    //  用于「效果由实例数据决定」的来源（菜品 / 调料这类），缺省则完全按 buff 数据库的设定走。
    //  注意：可叠层 buff 走的是加层路径，不会应用传参。
    set_buff(buff_holder, id, runtime_data) {
        if (is_Empty_Object(buffs[id])) {
            console.log('获得id为%s的buff失败，buff数据库不存在这个buff', id);
            return;
        }

        //──────── 获得流程（§4.2-1 的六步；目前只有第④步和第⑥步有代码）────────
        //① 抵抗力判定：debuff 带 buff_level，按抵抗力阶段决定「免疫 / 缩短时长 / 直接获得」
        //   —— 没有 buff_level 字段、抵抗力也没接进战斗，这一步暂时为空
        //② 净化抵消：将来净化类效果在这里拦截（ADR-16 指定的拦截点）
        //   —— 暂时无净化类 buff，这一步为空
        //③ 系列覆盖判定：同系列且系列等级**严格更低**时清掉对方的实例（ADR-7）
        //   —— 没有 series / series_level 字段，这一步暂时为空；
        //   注意它必须排在下面第④步之前，否则同 id 重复获得会被当成「覆盖」，层数会永远停在 1
        //④ 同类获得规则：可叠层 → 加层；不可叠层 → 先撤销旧实例再新建（下面这段就是）

        if (buffs[id].stackable == true) {
            //可叠层的buff：已经有同id实例就加层，没有就落到下面去新建
            let stack_ch = buffs[id].time_type;
            if (!is_Empty_Object(buff_holder[stack_ch]) && !is_Empty_Object(buff_holder[stack_ch][id])) {
                let stack_buff_obj = buff_holder[stack_ch][id];
                stack_buff_obj.stack += 1;
                stack_buff_obj.init(); //重算剩余时间（含每多一层的时间衰减）
                return;
            }
        } else if (buffs[id].stackable == false) {
            //不可叠层的buff：先撤销旧实例的全部贡献，再落到下面去新建
            this.delete_buff(buff_holder, id);
        }

        //⑤ 免疫 / 抗性检查（如「冰封后 10 秒冰封抗性」这类状态）
        //   —— 暂时为空

        //⑥ 构建对象、init、入容器
        let buff_obj = buff_holder.create_buff_instance(id, runtime_data);
        if (is_Empty_Object(buff_obj)) {
            //尚未实现这个时间类型的buff，暂时不能获得
            console.log('获得id为%s的buff失败，时间类型%s尚未实现', id, buffs[id].time_type);
            return;
        }

        buff_obj.init();
        let time_type_ch = buff_obj.time_type;
        buff_holder[time_type_ch][id] = buff_obj;
    }
    //根据id移除目标身上的一个buff
    delete_buff(buff_holder, id) {
        if (is_Empty_Object(buffs[id])) {
            console.log('删除id为%s的buff失败，buff数据库不存在这个buff', id);
            return;
        }
        let time_type_ch = buffs[id].time_type;
        let buff_value_obj = new Object(); //
        if (!is_Empty_Object(buff_holder[time_type_ch]) && !is_Empty_Object(buff_holder[time_type_ch][id])) {
            buff_value_obj = buff_holder[time_type_ch][id].delete_buff_effect();
            delete buff_holder[time_type_ch][id];
        }
        //将buff生效或清除的属性变化更新到最终buff属性里
        buff_holder.updata_end_buff_attr(buff_value_obj);
        //最终buff属性变化了，将变化的部分更新到游戏的其他地方去
        buff_holder.flush_end_buff_change();
    }
    //清空目标身上的所有buff
    reset_buff(buff_holder) {
        let buff_value_obj = new Object(); //
        if (!is_Empty_Object(buff_holder.game_time_buff)) {
            for (let id in buff_holder.game_time_buff) {
                buff_value_obj = buff_holder.game_time_buff[id].delete_buff_effect();
                delete buff_holder.game_time_buff[id];

                //将buff生效或清除的属性变化更新到最终buff属性里
                buff_holder.updata_end_buff_attr(buff_value_obj);
            }
        }
        if (!is_Empty_Object(buff_holder.combat_round_buff)) {
            for (let id in buff_holder.combat_round_buff) {
                buff_value_obj = buff_holder.combat_round_buff[id].delete_buff_effect();
                delete buff_holder.combat_round_buff[id];

                //将buff生效或清除的属性变化更新到最终buff属性里
                buff_holder.updata_end_buff_attr(buff_value_obj);
            }
        }
        //最终buff属性变化了，将变化的部分更新到游戏的其他地方去
        buff_holder.flush_end_buff_change();
    }
    //执行一条动作请求
    do_request(request) {
        //动作名（数据层目前还没有这个字段，所以现在恒为 undefined）
        let action_name = request.act;
        let action = this.action_table[action_name];
        if (action === undefined) {
            //动作通道本期未开发：动作表为空，走到这里说明这个动作还没有实现
            console.log('buff动作通道尚未实现，%s buff的%s动作被跳过', request.buff_id, request.data_type);
            return;
        }
        action(request, this);
    }
    //向buff展示界面添加一个buff
    add_buff_show_div(buff_obj, show_div) {
        let buff_id = buff_obj.id;
        //初始文本
        let ch = get_buff_show_text(buff_obj);
        if (ch === undefined) {
            return;
        }
        let have_time = get_buff_time_text(buff_obj); //存格式化后的文本，1位小数才能逐帧刷新

        let div_id = 'buffid_' + buff_id;
        let abuff_div = addElement(show_div, 'div', div_id, 'buff_show');
        abuff_div.innerHTML = ch;
        abuff_div.dataset.buff_have_time = have_time;
        abuff_div.dataset.buff_stack = get_buff_stack_dataset(buffs[buff_id].stackable, buff_obj.stack);
        let tip_value = JSON.parse(JSON.stringify(buff_obj));
        add_show_Tooltip(abuff_div, 'buff', tip_value);
        //记录鼠标停在哪个buff图标上（配合 close_stale_buff_tooltip 收掉残留的提示窗）
        //mouseleave 只在鼠标自己移开时才触发；图标被删掉时不会触发，所以记录要留到刷新时再判断
        //这里必须用箭头函数：addEventListener 传普通 function 时，里面的 this 是那个图标，不是调度台
        const hover_id = buff_id;
        abuff_div.addEventListener('mouseenter', () => {
            this.hovering_buff_id = hover_id;
        });
        abuff_div.addEventListener('mouseleave', () => {
            //只有记录的仍是自己才清除，避免「先进入新图标、后离开旧图标」的顺序把记录冲掉
            if (this.hovering_buff_id == hover_id) {
                this.hovering_buff_id = null;
            }
        });
    }
}
//──────── 5 个生效函数（原本在目标侧，现统一放在调度台所在的这个文件里）────────
//第一个参数统一是 target，这样同一套调用形式既能作用于玩家、也能作用于以后的其他目标
//（target 用不到的几项也保留这个参数，将来按目标能力裁剪 dispatch 时要在同一处判断）
//它们不碰调度台的实例状态，只是"把效果作用到目标身上"的适配层，所以做成模块级函数，
//由 Buff_manage.apply_buff_effects() 调用
//改变目标属性接口
function change_data_attr(target, data_type, end_data) {
    let P_attr = target.get_player_attributes();
    P_attr.change_data_attr(data_type, end_data);
}
//更新目标最终属性中buff部分接口
function updata_end_attr_buff(target) {
    target.updata_end_attr('buff');
}
//修改游戏状态（全局量，与目标无关）
function global_set_flag(target, data_type, end_data) {
    global.set_flag(data_type, end_data);
}
//修改游戏速度，加算部分（全局量，与目标无关）
function set_game_speed_num(target, end_data) {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_num('buff', end_data);
}
//修改游戏速度，乘算部分（全局量，与目标无关）
function set_game_speed_ratio(target, end_data) {
    let time_manage = global.get_time_manage();
    time_manage.set_game_speed_ratio('buff', end_data);
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
    numericKeys.sort((a, b) => sortData[b] - sortData[a]);
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
//获取要存进 dataset 的层数：不可叠层的buff不受层数影响，统一存空串
function get_buff_stack_dataset(stackable, stack) {
    if (stackable == true) {
        return stack;
    }
    return '';
}
//把buff的剩余时间格式化成界面显示用的文本
function get_buff_time_text(buff_obj) {
    //负数由 get_buff_have_time() 负责钳到0并打提示
    let have_time = buff_obj.get_buff_have_time();
    if (have_time == 'infinite') {
        return have_time;
    }
    //要算出1位小数必须看毫秒值（get_buff_have_time 已经取整成秒了）
    let sec = buff_obj.buff_have_time / 1000;
    if (sec < 0) {
        sec = 0;
    }
    if (sec <= 10) {
        //  ≤10秒     → 保留1位小数（9.5秒）
        return (Math.floor(sec * 10) / 10).toFixed(1) + '秒'; //1位小数
    } else if (sec <= 60) {
        //  ≤60秒     → 整数秒（45秒）
        return Math.floor(sec) + '秒'; //整数秒
    } else if (sec <= 3600) {
        //  ≤1小时    → n分钟（59分钟）
        return Math.floor(sec / 60) + '分钟';
    } else {
        //  超过1小时 → n小时（2小时）
        return Math.floor(sec / 3600) + '小时';
    }
}
//获取一个buff在buff展示界面上要显示的文本
//返回 undefined 表示这个buff的时间类型未知，调用方应当跳过它
function get_buff_show_text(buff_obj) {
    let buff_id = buff_obj.id;
    let ch = buff_obj.name; //读实例的名字（菜品本体buff可能带调味前缀），不读数据库模板
    let time_type = buff_obj.time_type;
    let have_time = get_buff_time_text(buff_obj); //已经是带单位的文本
    //可叠层的buff额外显示当前层数
    if (buffs[buff_id].stackable == true) {
        ch = ch + 'x' + buff_obj.stack;
    }
    if (have_time == 'infinite') {
        //无限时间buff不显示额外时间
    } else if (time_type == 'game_time_buff') {
        ch = ch + '<br>' + have_time;
    } else if (time_type == 'combat_round_buff') {
        // ch = ch + '<br>' + have_time + '回合';//注意：have_time 已带单位，改成回合时要重新取整数回合
    } else {
        console.log('未知时间类型的buff，不知道应该如何设置文本');
        return;
    }
    return ch;
}

//更新buff展示界面的一个buff组件的内容
function updata_buff_show_div(buff_obj) {
    let buff_id = buff_obj.id;
    let ch = get_buff_show_text(buff_obj);
    if (ch === undefined) {
        return;
    }
    let have_time = get_buff_time_text(buff_obj); //存格式化后的文本，1位小数才能逐帧刷新
    let stack_data = get_buff_stack_dataset(buffs[buff_id].stackable, buff_obj.stack);
    let div_id = 'buffid_' + buff_id;
    const abuff_div = document.getElementById(div_id);
    //层数变化也必须触发文本刷新（否则同一帧内连点两次、剩余时间没变，层数会卡住不更新）
    if (abuff_div.dataset.buff_have_time != have_time || abuff_div.dataset.buff_stack != stack_data) {
        abuff_div.innerHTML = ch;
        abuff_div.dataset.buff_have_time = have_time;
        abuff_div.dataset.buff_stack = stack_data;
    }
}
