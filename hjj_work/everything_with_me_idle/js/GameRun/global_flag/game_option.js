import { is_Empty_Object } from '../../Function/Function.js';
import { enums } from '../../Data/Enum/Enum.js';
import { texts } from '../../Data/Text/Text.js';
import { global } from '../global_manage.js';
// 每个设置的生效函数
const game_option_func = {
    OP_game_FPS: set_OP_game_FPS,
    OP_game_OptionTipText: set_OP_game_OptionTipText,
    OP_game_RASaveLogMax: set_OP_game_RASaveLogMax,
};
export class Game_Option {
    constructor() {
        for (let option_id in enums['game_option']) {
            this[option_id] = 0;
        }
    }
    //读取游戏设置
    get_game_option(option_id) {
        let all_OP = Object.keys(enums['game_option']);
        if (!all_OP.includes(option_id)) {
            console.log('未定义的游戏设置，%s', option_id);
            return;
        }
        return this[option_id];
    }
    load_game_option(game_option_save) {
        for (let option_id in game_option_save) {
            this[option_id] = game_option_save[option_id];
            this.active_game_option(option_id);
        }
    }
    //设置游戏设置
    set_game_option(option_id, option_num) {
        let all_OP = Object.keys(enums['game_option']);
        if (!all_OP.includes(option_id)) {
            console.log('未定义的游戏设置，%s', option_id);
            return;
        }
        this[option_id] = option_num;
        //修改的游戏设置即刻生效
        this.active_game_option(option_id);
    }
    //将指定的游戏设置生效
    active_game_option(option_id) {
        if (game_option_func[option_id] === undefined) {
            console.log('%s游戏设置没有定义对应的生效函数', option_id);
            return;
        }
        let option_type = enums['game_option_type'][option_id];
        let option_value;
        if (option_type == 'select') {
            //选项是下拉多选框，this对象保存的是这个选项的第n个，需要从枚举库里获取这个选项的具体数值
            if (is_Empty_Object(enums[option_id])) {
                console.log('%s游戏设置没有设定枚举，不知道该设置的第%s个对应数值是多少', option_id, this[option_id]);
                return;
            }
            option_value = enums[option_id][this[option_id]];
            //将设置界面的下拉框切换成选项的内容
            let option_select_div = document.getElementById(option_id);
            option_select_div.value = this[option_id];
        } else {
            //选项是鼠标拖动的进度条，this对象保存的数值就是选项的具体数值
            option_value = this[option_id];
        }
        //调用对应的生效函数
        let func = game_option_func[option_id];
        func(option_value);
    }
}
//游戏设置-帧率
function set_OP_game_FPS(option_value) {
    let time_manage = global.get_time_manage();
    time_manage.set_game_FPS(option_value);
}
//游戏设置-设置提示文本
function set_OP_game_OptionTipText(option_value) {
    let text_option_id = 'option_name_' + option_value;
    //修改每个设置选项的提示文本
    for (let option_id in enums['game_option_type']) {
        let div_id = option_id + '_lable';
        let option_div = document.getElementById(div_id);
        if (option_div == null) {
            console.log('修改设置提示文本失败，id为%s的布局没有找到', div_id);
            return;
        }
        if (is_Empty_Object(texts[option_id])) {
            console.log('修改设置提示文本失败，id为%s的文本没有定义', option_id);
            return;
        }
        let new_div_name;
        if (is_Empty_Object(texts[option_id][text_option_id])) {
            //没有指定这个设置的option_value版提示文本，使用默认版本
            if (is_Empty_Object(texts[option_id].option_name_default)) {
                console.log('修改设置提示文本失败，id为%s的文本没有定义默认版本', option_id);
                return;
            } else {
                new_div_name = texts[option_id].option_name_default;
            }
        } else {
            new_div_name = texts[option_id][text_option_id];
        }
        option_div.innerHTML = new_div_name;
    }

    //修改脑海-设置的文本
    let OP_radio_div = document.getElementById('OP_radio_div');
    OP_radio_div.children[1].textContent = texts['OP_radio_div'][text_option_id];
}
//游戏设置-流水账界面日志保存数量上限
function set_OP_game_RASaveLogMax(option_value) {
    let global_flag_manage = global.get_global_flag_manage();
    let game_log_manage = global_flag_manage.get_game_log_manage();
    game_log_manage.set_config_max_log_num(option_value);
}

export {};
