import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
export class Buff {
    constructor(id) {
        this.id = id; //唯一id
        this.name; //buff名称
        this.desc; //buff描述
        this.buff_value = new Array(); //buff的具体效果
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
    add_buff_value(buff_type, data_type, data_value) {
        if (is_Empty_Object(this.buff_value)) {
            this.buff_value = new Array();
        }
        //buff效果的类型
        let buff_value = new Object();
        buff_value.buff_type = buff_type;
        buff_value.data_type = data_type;
        buff_value.data_value = data_value;

        this.buff_value.push(buff_value);
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
