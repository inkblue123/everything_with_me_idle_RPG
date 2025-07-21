import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
export class Formula {
    constructor(id) {
        this.id = id; //唯一id
        // this.name; //buff名称
        // this.desc; //buff描述
        // this.init_Buff_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    // init_Buff_name_desc(id) {
    //     if (texts[id] === undefined) {
    //         //尚未定义
    //         this.name = '未命名buff';
    //         this.desc = '未设定buff描述';
    //     } else {
    //         if (texts[id].buff_name == undefined) {
    //             this.name = '未命名buff';
    //         } else {
    //             this.name = texts[id].buff_name;
    //         }
    //         if (texts[id].buff_desc == undefined) {
    //             this.desc = '未设定buff描述';
    //         } else {
    //             this.desc = texts[id].buff_desc;
    //         }
    //     }
    // }
}
function add_Formula_object(formulas, newid) {
    if (formulas[newid] === undefined) {
        formulas[newid] = new Formula(newid);
    } else {
        console.log(`创建formulas[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Formula_object };
