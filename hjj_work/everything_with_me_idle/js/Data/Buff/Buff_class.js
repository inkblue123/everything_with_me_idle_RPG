import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
export class Buff {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //buff名称
        this.desc; //buff描述
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
    //设置buff的时间计算方式
    set_time_type(time_type, time_value) {
        this.time_type = time_type; //这个buff的时间计算方式
        this.time_value = time_value; //在这个计算方式下的有效时间
    }
    //添加一条buff的效果
    //参数的顺序是固定的，写调用的时候请对照下面这 7 项：
    //  out        产出类型：'value' 产出一个加成值（汇进总对象 end_buff_attr，由 restart_end_buff 统一分派）
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

export { add_Buff_object };
