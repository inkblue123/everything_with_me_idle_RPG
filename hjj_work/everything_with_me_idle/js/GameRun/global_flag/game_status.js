import { enums } from '../../Data/Enum/Enum.js';
import { global } from '../global_manage.js';

export class Game_status {
    constructor() {
        for (let flag_name in enums['game_status']) {
            this[flag_name] = enums['game_status'][flag_name];
        }
    }
    //读取游戏状态标记
    get_game_status(flag_name) {
        let all_GS = Object.keys(enums['game_status']);
        if (!all_GS.includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }
        return this[flag_name];
    }
    //设置游戏状态标记
    set_game_status(flag_name, flag_value) {
        let all_GS = Object.keys(enums['game_status']);
        if (!all_GS.includes(flag_name)) {
            console.log('未定义的游戏状态标记，%s', flag_name);
            return;
        }

        if (flag_name == 'GS_game_statu') {
            this.change_GS_game_statu(flag_value);
        } else {
            this[flag_name] = flag_value;
        }
    }
    //将当前游戏状态切换到指定值
    change_GS_game_statu(flag_value) {
        let now_GS = this.GS_game_statu;

        if (now_GS == 'NULL') {
            //本来就没有游戏状态
        } else if (enums['live_plan_GS'].includes(now_GS)) {
            //生活技能的游戏状态全部停止
            let live_plan_manage = global.get_live_plan_manage();
            live_plan_manage.stop_now_live_skill();
        } else if (now_GS == 'combat') {
            //退出战斗状态
            let enemy_manage = global.get_enemy_manage();
            enemy_manage.delete_all_enemy(); //清除战斗区域的怪物
        } else if (now_GS == 'use_continuous') {
            //退出使用消耗品的状态
            let consumable_manage = global.get_consumable_manage();
            consumable_manage.end_sustain_use_consumable(); //结算消耗品使用情况
        }

        this.GS_game_statu = flag_value;
    }
}

export {};
