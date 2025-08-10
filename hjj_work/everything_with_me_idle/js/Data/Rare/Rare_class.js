import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
export class Rare {
    constructor(id) {
        this.id = id; //唯一id
        // this.name; //rare名称
        // this.desc; //rare描述
        // this.init_Rare_name_desc(id);
    }

    //调用文本数据库中的地点名称和描述
    // init_Rare_name_desc(id) {
    //     if (texts[id] === undefined) {
    //         //尚未定义
    //         this.name = '未命名rare';
    //         this.desc = '未设定rare描述';
    //     } else {
    //         if (texts[id].rare_name == undefined) {
    //             this.name = '未命名rare';
    //         } else {
    //             this.name = texts[id].rare_name;
    //         }
    //         if (texts[id].rare_desc == undefined) {
    //             this.desc = '未设定rare描述';
    //         } else {
    //             this.desc = texts[id].rare_desc;
    //         }
    //     }
    // }

    //设置rare的时间计算方式
    set_time_type(time_type, time_value) {
        this.time_type = time_type; //这个rare的时间计算方式
        this.time_value = time_value; //在这个计算方式下的有效时间
    }
    //添加一条rare的效果
    add_rare_value(rare_type, ...value) {
        if (is_Empty_Object(this.rare_value)) {
            this.rare_value = new Array();
        }
        //rare效果的类型
        let rare_value = new Object();
        rare_value.rare_type = rare_type;
        if (rare_type == 'get_data_attr') {
            //给予属性的rare
            rare_value.data_attr = value[0]; //给予哪种属性
            rare_value.data = value[1]; //每次rare生效获得多少数值
        }
        if (rare_type == 'change_game_speed') {
            //给予属性的rare
            rare_value.data = value[0]; //每次rare生效获得多少数值
        }
        this.rare_value.push(rare_value);
    }
}

function add_Rare_object(rares, newid) {
    if (rares[newid] === undefined) {
        rares[newid] = new Rare(newid);
    } else {
        console.log(`创建rares[${newid}]时已有同名对象，需要确认是否会清空原有内容`);
    }
}

export { add_Rare_object };
