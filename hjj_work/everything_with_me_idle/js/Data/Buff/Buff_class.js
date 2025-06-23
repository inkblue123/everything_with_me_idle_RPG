import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
export class Buff {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //buff名称
        this.desc; //buff描述
        this.init_Buff_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
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
    add_buff_value(buff_type, ...value) {
        if (is_Empty_Object(this.buff_value)) {
            this.buff_value = new Array();
        }
        //buff效果的类型
        let buff_value = new Object();
        buff_value.buff_type = buff_type;
        if (buff_type == 'get_data_attr') {
            //给予属性的buff
            buff_value.data_attr = value[0]; //给予哪种属性
            buff_value.data = value[1]; //每次buff生效获得多少数值
        }
        if (buff_type == 'change_game_speed') {
            //给予属性的buff
            buff_value.data = value[0]; //每次buff生效获得多少数值
        }
        this.buff_value.push(buff_value);
    }
}
function add_Buff_object(buffs, newid) {
    if (buffs[newid] === undefined) {
        buffs[newid] = new Buff(newid);
    } else {
        console.log(`创建buffs[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}
// function add_normal_Place(enemys, newid) {
//     if (enemys[newid] === undefined) {
//         // enemys[newid] = new P_normal(newid);
//     } else {
//         console.log(`创建buffs[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
//     }
// }

export { add_Buff_object };
