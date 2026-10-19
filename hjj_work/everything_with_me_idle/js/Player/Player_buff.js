import { is_Empty_Object, get_uniqueArr } from '../Function/Function.js';
import { buffs } from '../Data/Buff/Buff.js';
import { global } from '../GameRun/global_manage.js';
import { player } from './Player.js';
//战斗外，战斗型（scope == 'combat'）buff的时间流逝倍率
//idea6 L697-708：负面战斗buff战斗外加速消失，时间型每秒扣5秒
const out_combat_time_speed = 5;
//一个玩家buff对象基类
class BUFF {
    constructor(id) {
        //buff通用变量
        this.id = id; //唯一id
        const copiedData = JSON.parse(JSON.stringify(buffs[id]));
        for (let key in copiedData) {
            this[key] = copiedData[key];
        }
        for (let effect of this.effects) {
            if (effect.when == 'on_apply') {
                effect.start_flag = false; //仅需生效一次的效果才会有，记录是否生效
            }
            if (effect.revert) {
                effect.start_data = 0; //需要还原的效果才会有，记录还原时要扣除的数值
            }
        }
        this.stack = 1; //buff当前层数,默认1层
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
        //buff的持续时间：默认取数据库设定；施加时传参会覆盖 this.time_value
        if (this.time_value == 'infinite') {
            this.buff_have_time = 'infinite';
        } else {
            //基础时长 × 每多一层的时间衰减（layer_time_ratio 默认1，即不衰减）
            this.buff_have_time = this.time_value * 1000 * Math.pow(this.layer_time_ratio, this.stack - 1); //buff剩余有效时间
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
        //读档恢复层数（旧存档里没有 stack 字段时按构造器的 1 层处理）
        //这里不重算剩余时间：存档里的 buff_have_time 本身就是按存档时的层数算出来的
        if (buff_save.stack !== undefined) {
            this.stack = buff_save.stack;
        }
        //注：这里**不**照搬存档里效果行的 start_flag / start_data。
        //一次性效果（on_apply）与需要还原的效果（revert）的"实际加成"记在容器的累加器里，
        //而累加器不进存档——load_buff 开头的 reset_buff 已经把它清零了。
        //所以让这些效果在下一帧重新生效一次（构造器已把 start_flag 置 false），账才能重建正确。
        //若照搬存档里的 start_flag=true，会出现"加成丢失（累加器为 0）、删除时却仍按 start_data 撤销"的反向加回。
    }
    //检查这个buff应该运行、等待、清除的状态
    //now_GS：当前游戏状态，用于判断战斗型buff在战斗外是否要改为加速消散
    get_buff_status(game_now_time, now_GS) {
        if (this.scope == 'combat' && now_GS != 'combat') {
            //战斗型（scope == 'combat'）的buff在战斗外不结算效果，改为加速消散
            return 'accelerate';
        }
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
        if (this.buff_have_time == 'infinite') {
            return this.buff_have_time;
        } else {
            if (this.buff_have_time < 0) {
                console.log('buff剩余时间出现负数：%s 的 buff_have_time = %s，界面按0显示', this.id, this.buff_have_time);
                return 0;
            }
            return Math.floor(this.buff_have_time / 1000);
        }
    }
    //激活一次这个buff
    start_buff(game_now_time) {
        //对基于游戏时间生效的buff，激活时将每秒应当生效的属性和经过的时间进行等比计算，
        let time_in = game_now_time - this.last_buff_time;
        //这一帧的时间跨度不能超过剩余时间：超出的部分不算
        if (this.buff_have_time != 'infinite' && time_in > this.buff_have_time) {
            time_in = this.buff_have_time;
        }
        let buff_value_obj = new Object();

        for (let effect of this.effects) {
            let is_once;
            //这一条效果是不是「只在获得时产出一次」
            if (effect.when == 'on_apply') {
                is_once = true;
            }
            //仅需要生效一次的效果（when == 'on_apply'），检查它有没有生效过：
            //  start_flag == true  —— 已经生效过了，跳过，本次不再产出
            //  start_flag == false —— 还没生效过，继续往下走，本次产出后会把标记置成 true
            //（when == 'tick' 的效果没有这个标记，每一帧都要产出）
            if (is_once && effect.start_flag == true) {
                continue;
            }

            //时机 when 与产出类型 out 的取值（并排列出，未开发的先占好位置）：
            //  when = 'tick'     —— 每帧产出一次（数值按经过时间等比摊算，即 100ms 摊算）
            //  when = 'on_apply' —— 获得时只产出一次
            //  out  = 'value'    —— 产出一个「加成值」，汇进总对象 end_buff_attr，由调度台的 apply_buff_effects 统一分派生效（本期使用）
            //  out  = 'act'      —— 产出一个「动作」，交给动作通道执行（本期未开发，只留接口位置）
            let data = 0; //这一次为这条效果行产出的数值
            if (effect.out == 'act') {
                //──────── 动作通道（本期未开发，位置预留）────────
                //将来在这里产出「动作描述」，例如：做什么动作、对谁、多少
                //动作不进总对象累加，而是交给动作通道排队执行
                data = 0;
            } else if (effect.out == 'value') {
                //本条效果这一帧的基础数值：先按 get_true_data 归一（flag 行的 value 是布尔量），
                //声明了 per_layer 的效果再按当前层数放大
                let base_value = get_true_data(effect.value);
                if (effect.per_layer == true) {
                    base_value = base_value * this.stack;
                }
                //buff的效果是某种加成值，按时机 when 分两种产法
                if (effect.when == 'on_apply') {
                    //只在获得时产出一次（走到这里说明上面的 start_flag 必定是 false，也就是还没生效过）
                    data = base_value;
                    if (effect.revert) {
                        //需要还原的效果：记下这次加进去的数值，移除buff时取负返还
                        effect.start_data = data;
                    }
                    effect.start_flag = true; //这条一次性效果已生效，下次不再产出
                } else if (effect.when == 'tick') {
                    //每帧都产出，数值按经过的时间等比摊算
                    data = get_continuous_start_data(base_value, this.time_type, time_in);
                    if (effect.revert) {
                        //需要还原的效果：把每帧产出的数值累加起来，移除buff时整体取负返还
                        effect.start_data += data;
                    }
                } else {
                    console.log('%s buff的效果行时机类型未定义，跳过：%s', this.id, effect.when);
                }
            } else {
                console.log('%s buff的效果行产出类型未定义，跳过：%s', this.id, effect.out);
                continue;
            }

            let data_type = effect.target;
            if (is_Empty_Object(buff_value_obj[data_type])) {
                buff_value_obj[data_type] = new Array();
            }
            let obj = new Object();
            obj.buff_id = this.id;
            obj.row_key = get_row_key(effect, this.id);
            obj.out = effect.out; //产出类型：与数据库里声明的保持一致（'value' 或 'act'），供 updata_end_buff_attr 判断
            if (effect.out == 'act') {
                obj.act = effect.act; //动作名（数据层目前还没有这个字段，将来补上后由这里带上来）
            }
            obj.data = data;
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
    delete_buff_effect(game_now_time) {
        let buff_value_obj = new Object();
        for (let effect of this.effects) {
            //只有需要还原的效果才需要取负返还
            if (!effect.revert) {
                continue;
            }
            let data_type = effect.target;
            if (is_Empty_Object(buff_value_obj[data_type])) {
                buff_value_obj[data_type] = new Array();
            }
            let obj = new Object();
            obj.buff_id = this.id;
            obj.row_key = get_row_key(effect, this.id);
            obj.out = 'value'; //还原也属于「加成值」这一路：移除时把之前加进去的取负返还
            obj.data = effect.start_data * -1;
            buff_value_obj[data_type].push(obj);
        }
        return buff_value_obj;
    }
    //战斗外加速消散：不产出任何效果，只按加速倍率扣除剩余时间
    //返回 true 表示时间已经扣到（需要走到期处理）
    //无限时长的buff没有时间可扣，只推进 last_buff_time 后返回 false（永远不到期）
    pass_time_out_of_combat(game_now_time, time_speed) {
        let time_in = game_now_time - this.last_buff_time;
        //必须同步推进 last_buff_time：否则回到战斗的第一帧会把战斗外积攒的整段时间
        //一次性结算成效果（等于战斗外没生效，进战斗却补了一大笔伤害）
        this.last_buff_time = game_now_time;
        if (this.buff_have_time == 'infinite') {
            //无限时长：只停止结算，不消散
            return false;
        }
        this.buff_have_time -= time_in * time_speed;
        if (this.buff_have_time <= 0) {
            return true;
        }
        return false;
    }
}
//取得一条效果行在总对象里的记账key
function get_row_key(effect, buff_id) {
    return effect.when + '_' + (effect.revert ? 'restore' : 'no_restore') + '_' + buff_id;
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
//取全局结算层（调度台）；尚未建立时返回 undefined，由调用方决定怎么降级
//注意：这里**不能**用 is_Empty_Object() 判断——它内部是 JSON.stringify，而调度台持有
//      player_buff_holders → player_buff_manage → target → player 这样的环，会直接抛异常
function get_buff_manage_or_undefined() {
    if (global.get_buff_manage === undefined) {
        return undefined;
    }
    let buff_manage = global.get_buff_manage();
    if (buff_manage === undefined || buff_manage === null) {
        return undefined;
    }
    return buff_manage;
}
//把动作请求推给全局结算层（调度台）
//调度台尚未建立时（例如无头测试里没有装它）只打一条日志，不影响加成值通道
function push_buff_request(request) {
    let buff_manage = get_buff_manage_or_undefined();
    if (buff_manage === undefined || typeof buff_manage.push_request != 'function') {
        console.log('buff调度台尚未建立，%s buff的%s动作被跳过', request.buff_id, request.data_type);
        return;
    }
    buff_manage.push_request(request);
}

export class Player_Buff_Manage {
    //target：这套buff逻辑服务的对象（玩家 / 敌人 / 测试用的假目标）
    //不传时默认玩家，保持原有的 new Player_Buff_Manage() 调用方式可用
    constructor(target) {
        this.target = target === undefined ? player : target;
        this.game_time_buff = new Object(); //所有以游戏内时间为时间依据的buff
        this.combat_round_buff = new Object(); //以玩家战斗回合为时间依据的buff

        this.end_buff_attr = new Object(); //所有buff的效果合计
        this.end_data_attr = new Object(); //所有buff效果中，需要汇入玩家属性类里汇总的属性
        this.target_dispatch = new Object(); //效果目标 -> 分发给谁（从buff数据库汇总而来）

        this.end_buff_change_flag = false; //每一帧计算所有buff之后，最终buff有没有发生更改
        this.end_buff_change_data_type = new Array(); //改变了的效果id
        this.buff_show_kind = 'player'; //这个容器的buff界面由玩家面板负责（调度台据此判断读哪份缓存）
    }
    init() {
        this.init_target_dispatch();
    }
    //从buff数据库汇总「效果目标 -> 分发给谁」
    //同一个目标被两条效果行声明成不同的分发方式时，打印告警
    init_target_dispatch() {
        this.target_dispatch = new Object();
        for (let id in buffs) {
            for (let effect of buffs[id].effects) {
                if (this.target_dispatch[effect.target] == undefined) {
                    this.target_dispatch[effect.target] = effect.dispatch;
                } else if (this.target_dispatch[effect.target] != effect.dispatch) {
                    console.log('buff效果%s同时声明了两种分发方式：%s / %s', effect.target, this.target_dispatch[effect.target], effect.dispatch);
                }
            }
        }
    }
    //获取玩家buff部分的游戏存档
    save_buff() {
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
    load_buff(buff_attr_save) {
        //先清空目前的所有buff（清空本身属于「增删清空」，由全局结算层决策）
        let buff_manage = global.get_buff_manage();
        buff_manage.reset_buff(this);

        if (is_Empty_Object(buff_attr_save)) {
            return;
        }

        if (!is_Empty_Object(buff_attr_save.game_time_buff)) {
            for (let id in buff_attr_save.game_time_buff) {
                let buff_save = buff_attr_save.game_time_buff[id];
                //效果来自"施加时传参"的buff（菜品本体效果 / 调料效果）不恢复：
                //它的效果行只存在于实例上，数据库模板里那份是对不上的占位值，
                //硬恢复会得到一个"看着还在、数值却是错的"的buff。这里按"持续时间已结束"处理。
                if (buff_save.from_runtime_data == true) {
                    console.log('读档：%s 的效果是运行时传入的，数据库模板对不上，按已结束处理', id);
                    continue;
                }
                let buff_obj = new game_time_BUFF(id);
                buff_obj.load_init(buff_save);
                this.game_time_buff[id] = buff_obj;
            }
        }
    }
    //──── 实例工厂：唯一留在目标侧、却被调度台调用的建实例接口 ────
    //实例类 game_time_BUFF 没有导出，所以由目标侧负责 new；
    //返回空对象表示这个时间类型的 buff 尚未实现，调用方据此打日志
    create_buff_instance(id, runtime_data) {
        let buff_obj = new Object();
        if (buffs[id].time_type == 'game_time_buff') {
            buff_obj = new game_time_BUFF(id);
        }
        //施加时传参：用来源带来的数据覆盖数据库默认值（菜品 / 调料这类「效果由实例决定」的来源要用）
        //必须在 init() 之前完成——init() 会拿 time_value 算剩余有效时间
        if (!is_Empty_Object(buff_obj) && !is_Empty_Object(runtime_data)) {
            //标记这条buff的效果来自运行时，数据库模板里那份对不上；
            //读档时不会恢复它（按"持续时间已结束"处理），见 load_buff
            buff_obj.from_runtime_data = true;
            if (runtime_data.time_value !== undefined) {
                buff_obj.time_value = runtime_data.time_value;
            }
            //名称前缀：菜品本体buff按调味情况带上「美味的」之类的前缀
            //（"调料效果"这类全局buff由调用方决定不给前缀，所以这里只做拼接、不判断来源）
            if (runtime_data.name_prefix !== undefined) {
                buff_obj.name = runtime_data.name_prefix + buff_obj.name;
            }
            if (!is_Empty_Object(runtime_data.effects)) {
                buff_obj.effects = runtime_data.effects;
                //target_dispatch 是 init_target_dispatch() 从「静态 buff 表」汇总出来的快照，
                //而传参带来的效果行不在静态表里 —— 不补登记，这些效果就会打「XX效果没有定义生效方式」并静默失效
                if (is_Empty_Object(this.target_dispatch)) {
                    this.init_target_dispatch();
                }
                for (let effect of buff_obj.effects) {
                    //与 BUFF 构造器保持一致：换上来的效果行同样要补这两个运行期字段，
                    //否则 when == 'on_apply' 的行会因为 start_flag 为 undefined 而判定异常、revert 的行会丢还原值
                    if (effect.when == 'on_apply') {
                        effect.start_flag = false;
                    }
                    if (effect.revert) {
                        effect.start_data = 0;
                    }
                    //补登记分发表（口径与 init_target_dispatch 一致，含同目标两种分发方式的告警）
                    if (this.target_dispatch[effect.target] == undefined) {
                        this.target_dispatch[effect.target] = effect.dispatch;
                    } else if (this.target_dispatch[effect.target] != effect.dispatch) {
                        console.log('buff效果%s同时声明了两种分发方式：%s / %s', effect.target, this.target_dispatch[effect.target], effect.dispatch);
                    }
                }
            }
        }
        return buff_obj;
    }
    //最终buff属性发生变化后的统一收尾
    flush_end_buff_change() {
        if (this.end_buff_change_flag == false) {
            return;
        }
        //去重
        this.end_buff_change_data_type = get_uniqueArr(this.end_buff_change_data_type);
        //把本帧变化的buff效果交给全局结算层去分派与生效
        let buff_manage = get_buff_manage_or_undefined();
        if (buff_manage === undefined) {
            //调度台尚未建立：本帧的效果无处生效，打日志而不是静默失败
            console.log('buff调度台尚未建立，本帧的buff效果无法生效');
        } else {
            buff_manage.apply_buff_effects(this);
        }
        //重置参数，等待下一帧继续处理
        this.end_buff_change_flag = false;
        this.end_buff_change_data_type = new Array();
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
        this.flush_end_buff_change();
    }

    //运行以游戏内时间为时间依据的buff
    run_game_time_buff() {
        let time_manage = global.get_time_manage();
        let game_now_time = time_manage.get_game_now_time();
        let now_GS = global.get_flag('GS_game_statu'); //当前游戏状态：战斗型的buff在战斗外要加速消散
        for (let id in this.game_time_buff) {
            let buff_obj = this.game_time_buff[id];
            let buff_value_obj = new Object(); //

            //判断这个buff的状态
            let status = buff_obj.get_buff_status(game_now_time, now_GS);

            if (status == 'delete') {
                //buff到期了，走统一的到期处理（减层 或 清除）
                buff_value_obj = this.end_buff_expire(id, buff_obj);
            } else if (status == 'accelerate') {
                //战斗外加速消散：不产出任何效果，只按加速倍率扣时间
                if (buff_obj.pass_time_out_of_combat(game_now_time, out_combat_time_speed)) {
                    //时间已经扣到了，同样走到期处理
                    buff_value_obj = this.end_buff_expire(id, buff_obj);
                }
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
    //处理一个buff的「到期」：可叠层的按时长规则减1层并重启计时，不可叠层的整条清除
    //返回这次到期要撤销的属性变化（减层时是空对象，因为整条效果没有被撤销）
    //注意：减层路径不能调 delete_buff()，那会把整条效果按 start_data 取负撤销
    end_buff_expire(id, buff_obj) {
        if (buff_obj.stack_expire == 'reduce_layer' && buff_obj.stack > 1) {
            //到期减1层，并按新的层数重启计时
            buff_obj.stack -= 1;
            buff_obj.init(); //重算剩余时间
            return new Object();
        }
        //最后一层（或 stack_expire == 'remove'）：整条清除
        let buff_value_obj = buff_obj.delete_buff_effect(); //清除这个buff的效果
        delete this.game_time_buff[id];
        return buff_value_obj;
    }
    //更新最终属性
    updata_end_buff_attr(buff_value_obj) {
        if (is_Empty_Object(buff_value_obj)) {
            return;
        }

        this.end_buff_change_flag = true;
        for (let data_type in buff_value_obj) {
            for (let obj of buff_value_obj[data_type]) {
                //按产出类型 out 分派（取值与 start_buff 里一致，并排列出）：
                //  out = 'value' —— 加成值：累加进总对象 end_buff_attr，稍后由调度台的 apply_buff_effects 统一分派生效（本期使用）
                //  out = 'act'   —— 动作：交给动作通道执行（本期未开发，只留接口位置）
                //  其他          —— 未定义的产出类型，打日志并跳过
                if (obj.out == 'act') {
                    //──────── 动作通道 ────────
                    //不在总对象里累加，而是推给全局结算层（调度台）排队执行
                    //（数据层目前还没有「动作名」这个字段，调度台的动作表也为空，
                    //  所以现在推过去之后只会得到一条「尚未实现」的日志）
                    let request = new Object();
                    request.buff_id = obj.buff_id;
                    request.row_key = obj.row_key;
                    request.out = obj.out;
                    request.act = obj.act; //动作名（数据层将来补上字段后由 effect.act 带过来）
                    request.data_type = data_type;
                    request.data = obj.data;
                    push_buff_request(request);
                    continue;
                } else if (obj.out == 'value') {
                    //──────── 加成值通道（本期使用）────────
                    if (typeof obj.data != 'number') {
                        console.log('buff效果应该全部转换成数字，%s buff的%s效果异常', obj.buff_id, data_type);
                        continue;
                    }
                    //接下来data_type效果会发生变化，记录id
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
                    let data_key = obj.row_key;
                    if (is_Empty_Object(end_buff_obj[data_key])) {
                        end_buff_obj[data_key] = 0;
                    }
                    end_buff_obj[data_key] += obj.data; //记录data_type效果的来源
                    //组成部分归零了，说明对应buff被清除，这里的记录也应该清除
                    if (end_buff_obj[data_key] == 0) {
                        delete this.end_buff_attr[data_type][data_key];
                    }
                } else {
                    console.log('buff效果的产出类型未定义，%s buff的%s效果被跳过：%s', obj.buff_id, data_type, obj.out);
                    continue;
                }
            }
        }
    }
}
