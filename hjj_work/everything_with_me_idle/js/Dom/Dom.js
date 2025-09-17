import { crtElement, addElement } from '../Function/Dom_function.js';
import { updata_player_active } from '../Function/Updata_func.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

import { player_status } from './Player_status.js';
import { Combat_plan } from './Combat_plan.js';
import { Option } from './Option.js';
import { Tooltip } from './Tooltip/Tooltip.js';
import { Control } from './Control.js';
import { Combat } from './Combat.js';
import { Game_log } from './Game_log.js';
import { Live_plan } from './Live_plan/Live_plan.js';

var dom = new Object();

dom.init = function () {
    //激活非战斗时游戏界面
    // show_normal_game_div();

    //初始化脑海-重要事件界面
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.init_IE_div();

    //初始化玩家主动技能展示
    updata_player_active(); //主动技能测试，正常应该在战斗规划界面设置主动技能，设置之后调用这个接口

    // 将每个装备栏中的信息初始化
    let P_worn = player.get_player_worn();
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    for (const radio of radios) {
        P_worn.updata_equipment_show(radio.value);
    }
    //移动到初始位置
    let place_manage = global.get_place_manage();
    place_manage.set_now_place('village_home');
};

function game_dom_init() {
    // 创建出所有需要的界面
    {
        //左上角色状态界面
        dom.player_status = player_status;
        //左下战斗规划界面
        dom.combat_plan = Combat_plan;
        //中下玩家控制界面
        dom.control = Control;
        //右下游戏日志界面
        dom.game_log = Game_log;
        //非战斗时中上，生活规划界面
        dom.live_plan = Live_plan;

        //战斗界面
        dom.combat = Combat;
        //设置界面
        dom.option_dom = Option;
        //游离于游戏布局之上，跟随鼠标的小窗口
        dom.tooltip = Tooltip;

        dom.map = crtElement('div', 'map', 'section', '', '');
        dom.map.textContent = '地图界面';

        // dom.remenber = crtElement('div', null, 'section', '', '#3357ff');
        // dom.remenber.textContent = '脑海界面';
    }

    //创建布局
    {
        //整个项目先分成上下两部分，上95%是游戏主体，下5%是设置
        //游戏主体左侧三分之一是玩家相关，右侧三分之二是游戏的各种事件
        dom.game_dom = crtElement('div', null, 'game_dom', '');

        dom.game_left = crtElement('div', null, 'page_rows_11', '');
        dom.game_right = crtElement('div', null, 'page_rows_11', '');
        //战斗时位于游戏上半部分的容器
        dom.game_up_combat = crtElement('div', 'game_up_combat', 'page_columns_1', 'none');
        //平时位于游戏上半部分的容器
        dom.game_up_nomal = crtElement('div', 'game_up_nomal', 'page_columns_11', '');
        //平时位于游戏上半部分的容器
        dom.game_down_nomal = crtElement('div', null, 'page_columns_11', '');
    }

    // 向布局中插入合适的元素，实现游戏界面
    {
        dom.main_dom = addElement(document.body, 'div', null, 'main_page');

        dom.main_dom.appendChild(dom.game_dom);

        dom.game_dom.appendChild(dom.game_left);
        dom.game_dom.appendChild(dom.game_right);

        dom.game_left.appendChild(dom.player_status); //左上 角色状态
        dom.game_left.appendChild(dom.combat_plan); //左下 战斗规划

        dom.game_right.appendChild(dom.game_up_combat);
        dom.game_right.appendChild(dom.game_up_nomal);
        dom.game_right.appendChild(dom.game_down_nomal);

        dom.game_up_combat.appendChild(dom.combat); //战斗时，中上和右上，战斗详情

        dom.game_up_nomal.appendChild(dom.live_plan); //非战斗，中上，生活规划
        dom.game_up_nomal.appendChild(dom.map); //非战斗，右上，地图

        dom.game_down_nomal.appendChild(dom.control); //中下，玩家控制
        dom.game_down_nomal.appendChild(dom.game_log); //右下，游戏日志

        dom.main_dom.appendChild(dom.option_dom); //整个界面最下5%的区域，设置
        dom.main_dom.appendChild(dom.tooltip); //游离于游戏布局之上，跟随鼠标的小窗口
    }
}
export { dom, game_dom_init };
