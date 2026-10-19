import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
//buff的时间计算方式白名单
const buff_time_type_list = ['game_time_buff', 'combat_round_buff', 'combat_active_buff'];
//buff的作用域白名单
const buff_scope_list = ['normal', 'combat', 'life'];
//buff到期行为的白名单
const buff_stack_expire_list = ['remove', 'reduce_layer'];
export class Buff {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //buff名称
        this.desc; //buff描述
        this.time_type = 'game_time_buff'; //时间计算方式（默认以游戏内时间为依据；其余时间类型用到再显式声明）
        this.time_value; //有效时间（没有默认值，必须在set_buff_data里给出，否则会告警）
        this.scope = 'normal'; //作用域：normal 普通 / combat 战斗（战斗外不生效，只加速消散）/ life 生活
        this.stackable = false; //是否可叠层（默认 false = 不填即传统行为，重复获得仍是新buff替换旧buff）
        this.layer_time_ratio = 1; //每多一层，持续时间的倍率（1 = 不衰减）
        this.stack_expire = 'remove'; //到期行为：remove 整条消失 / reduce_layer 减1层并重启计时
        this.effects = new Array(); //buff的具体效果（效果行数组）
        this.init_Buff_name_desc(id);
    }

    //调用文本数据库中的buff名称和描述
    init_Buff_name_desc(id) {
        if (texts[id] === undefined) {
            //尚未定义
            this.name = '未命名buff';
            this.desc = '未设定buff描述';
        } else {
            if (texts[id].buff_name == undefined) {
                this.name = '未命名buff';
            } else {
                this.name = texts[id].buff_name;
            }
            if (texts[id].buff_desc == undefined) {
                this.desc = '未设定buff描述';
            } else {
                this.desc = texts[id].buff_desc;
            }
        }
    }
    //设置buff的参数
    //参数的顺序是固定的，写调用的时候请对照下面这 6 项：
    //  time_type         时间计算方式：'game_time_buff'     以游戏内时间为依据（默认）
    //                                  'combat_round_buff'  以玩家战斗回合为依据（尚未实现）
    //                                  'combat_active_buff' 以玩家主动技能时间为依据（尚未实现）
    //  time_value        在这个计算方式下的有效时间：秒数，或 'infinite'
    //  scope             作用域：'normal' 普通（默认）
    //                          'combat' 战斗（战斗外不结算效果，只加速消散）
    //                          'life'   生活（尚未使用）
    //  stackable         是否可叠层：true 重复获得层数+1 / false 新buff替换旧buff（默认）
    //  layer_time_ratio  每多一层，持续时间的倍率（默认 1 = 不衰减）
    //  stack_expire      到期行为：'remove' 整条消失（默认） / 'reduce_layer' 减1层并重启计时
    //没有传（或传 undefined）的参数，保持构造器里的默认值
    set_buff_data(time_type, time_value, scope, stackable, layer_time_ratio, stack_expire) {
        if (arguments.length > 6) {
            console.log('buff参数设置：%s 的set_buff_data最多只接收6个参数，多余的被忽略', this.id);
        }
        //时间计算方式
        if (time_type !== undefined) {
            if (buff_time_type_list.includes(time_type)) {
                this.time_type = time_type;
            } else {
                console.log('buff参数设置：%s 的时间计算方式 %s 未定义，已忽略（可选：%s）', this.id, time_type, buff_time_type_list.join(' / '));
            }
        }
        //有效时间
        if (time_value !== undefined) {
            if (time_value === 'infinite' || typeof time_value == 'number') {
                this.time_value = time_value;
            } else {
                console.log('buff参数设置：%s 的有效时间 %s 不是秒数也不是infinite，已忽略', this.id, time_value);
            }
        } else {
            console.log('buff参数设置：%s 没有设置有效时间（time_value），这个buff无法正常计时', this.id);
        }
        //作用域
        if (scope !== undefined) {
            if (buff_scope_list.includes(scope)) {
                this.scope = scope;
            } else {
                console.log('buff参数设置：%s 的作用域 %s 未定义，已忽略（可选：%s）', this.id, scope, buff_scope_list.join(' / '));
            }
        }
        //是否可叠层
        if (stackable !== undefined) {
            if (typeof stackable == 'boolean') {
                this.stackable = stackable;
            } else {
                console.log('buff参数设置：%s 的stackable %s 不是布尔量，已忽略', this.id, stackable);
            }
        }
        //每多一层的时间倍率
        if (layer_time_ratio !== undefined) {
            if (typeof layer_time_ratio == 'number') {
                this.layer_time_ratio = layer_time_ratio;
            } else {
                console.log('buff参数设置：%s 的layer_time_ratio %s 不是数字，已忽略', this.id, layer_time_ratio);
            }
        }
        //到期行为
        if (stack_expire !== undefined) {
            if (buff_stack_expire_list.includes(stack_expire)) {
                this.stack_expire = stack_expire;
            } else {
                console.log('buff参数设置：%s 的到期行为 %s 未定义，已忽略（可选：%s）', this.id, stack_expire, buff_stack_expire_list.join(' / '));
            }
        }
    }
    //添加一条buff的效果
    //参数的顺序是固定的，写调用的时候请对照下面这 7 项：
    //  out        产出类型：'value' 产出一个加成值（汇进总对象 end_buff_attr，由调度台的 apply_buff_effects 统一分派）
    //                      'act'   产出一件事（交给动作通道执行，本期还没开发，只占位置）
    //  when       时机：'tick'     每帧产出一次（数值按经过时间等比摊算，即 100ms 摊算）
    //                    'on_apply' 获得时只产出一次
    //  dispatch   分发给谁：'resource'         当前资源（血量/魔力/精力）
    //                      'attr'             最终属性汇总（end_data_attr）
    //                      'flag'             游戏标记（布尔量）
    //                      'game_speed_num'   游戏速度加算
    //                      'game_speed_ratio' 游戏速度乘算
    //  target     改哪个东西
    //  value      数值
    //  per_layer  是否乘以当前层数
    //  revert     移除 buff 时是否把已经加上的撤销
    add_buff_effect(out, when, dispatch, target, value, per_layer, revert) {
        if (is_Empty_Object(this.effects)) {
            this.effects = new Array();
        }
        //buff效果行
        let effect = new Object();
        effect.out = out;
        effect.when = when;
        effect.dispatch = dispatch;
        effect.target = target;
        effect.value = value;
        effect.per_layer = per_layer;
        effect.revert = revert;

        this.effects.push(effect);
    }
}
function add_Buff_object(buffs, newid) {
    if (buffs[newid] === undefined) {
        buffs[newid] = new Buff(newid);
    } else {
        console.log('创建buffs[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

//检查 buff 数据是否自洽
//只打警告，不阻止游戏启动；返回发现的问题数量
function check_buff_data(buffs) {
    let warn_num = 0;
    let effect_num = 0;
    for (let id in buffs) {
        for (let effect of buffs[id].effects) {
            effect_num++;
            //资源类效果（血量/魔力/精力）不允许「移除时撤销」：
            //给出去的血、扣掉的血，不应该因为 buff 消失就被倒着算回去
            if (effect.dispatch == 'resource' && effect.revert) {
                console.log('buff数据校验：%s 的 %s 是资源类效果，不应该声明 revert:true（移除时会把它倒着算回去）', id, effect.target);
                warn_num++;
            }
            //「获得时一次性」的效果（when == 'on_apply'）只在获得时结算一次，
            //之后再加层也不会重新结算，所以它声明 per_layer 是没有意义的（层数对它不生效）
            if (buffs[id].stackable == true && effect.when == 'on_apply' && effect.per_layer == true) {
                console.log('buff数据校验：%s 的 %s 是获得时一次性的效果，又声明了 per_layer，层数对它不生效（不会随加层补足）', id, effect.target);
                warn_num++;
            }
            //游戏标记类效果必须能撤销：flag 是布尔量，靠「累加和的正负」判定真假，
            //声明 revert:false 的话，buff 移除时这一票会永久留在累加器里，标记再也回不去
            if (effect.dispatch == 'flag' && !effect.revert) {
                console.log('buff数据校验：%s 的 %s 是游戏标记类效果，不应该声明 revert:false（移除时不会撤销，标记会卡住）', id, effect.target);
                warn_num++;
            }
        }
    }
    if (warn_num == 0) {
        // console.log('buff数据校验通过：%s 条 buff、%s 条效果行', Object.keys(buffs).length, effect_num);
    } else {
        console.log('buff数据校验发现 %s 处问题（仅告警，不影响运行）', warn_num);
    }
    return warn_num;
}

export { add_Buff_object, check_buff_data };
