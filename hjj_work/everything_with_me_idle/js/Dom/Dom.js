import { crtElement, addElement } from '../Function/Dom_function.js';

import { player_status } from './Player_status.js';
import { Combat_plan } from './Combat_plan.js';
import { Option } from './Option.js';
import { Tooltip } from './Tooltip.js';
import { Control } from './Control.js';
import { Combat } from './Combat.js';
import { Game_data } from './Game_data.js';

var dom = new Object();

// 创建出所有需要的界面
{
    //角色属性装备界面
    dom.player_status = player_status;
    //物品、技能、图鉴展示界面
    dom.combat_plan = Combat_plan;
    //设置界面
    dom.option_dom = Option;
    //游离于游戏布局之上，跟随鼠标的小窗口
    dom.tooltip = Tooltip;
    //玩家控制界面
    dom.control = Control;
    //战斗界面
    dom.combat = Combat;
    //游戏规划界面（战斗规划，生活技能规划）
    dom.game_data = Game_data;

    dom.live_plan = crtElement('div', 'live_plan', 'section', '', '#ffff00');
    dom.live_plan.textContent = '生活规划界面';

    dom.map = crtElement('div', null, 'section', '', '#33fff9');
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
    dom.game_up_nomal = crtElement('div', 'game_up_nomal', 'page_columns_11', 'none');
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
    dom.game_left.appendChild(dom.combat_plan); //坐下 战斗规划

    dom.game_right.appendChild(dom.game_up_combat);
    dom.game_right.appendChild(dom.game_up_nomal);
    dom.game_right.appendChild(dom.game_down_nomal);

    dom.game_up_combat.appendChild(dom.combat); //战斗时，中上和右上，战斗详情

    dom.game_up_nomal.appendChild(dom.live_plan); //非战斗，中上，生活规划
    dom.game_up_nomal.appendChild(dom.map); //非战斗，右上，地图

    dom.game_down_nomal.appendChild(dom.control); //中下，玩家控制
    dom.game_down_nomal.appendChild(dom.game_data); //右下，游戏数据

    dom.main_dom.appendChild(dom.option_dom);
    dom.main_dom.appendChild(dom.tooltip);
}
export { dom };
