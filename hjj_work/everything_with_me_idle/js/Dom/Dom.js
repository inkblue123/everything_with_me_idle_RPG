import { crtElement, addElement } from '../Function/Dom_function.js';
import { updata_player_active } from '../Function/Updata_func.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';

import { create_player_status } from './Player_status.js';
import { create_Combat_plan } from './Combat_plan.js';
import { create_Option } from './Option.js';
import { create_Tooltip } from './Tooltip/Tooltip.js';
import { create_Control } from './Control.js';
import { create_Combat } from './Combat.js';
import { create_Game_log } from './Game_log.js';
import { create_Live_plan } from './Live_plan/Live_plan.js';
import { create_Store } from './Store.js';

//构建所有游戏界面布局
function create_game_dom() {
    var dom = new Object();
    // 创建出所有需要的界面
    //左上角色状态界面
    let player_status = create_player_status();
    //左下战斗规划界面
    let Combat_plan = create_Combat_plan();
    //中下玩家控制界面
    let control = create_Control();
    //右下游戏日志界面
    let game_log = create_Game_log();
    //非战斗时中上，生活规划界面
    let Live_plan = create_Live_plan();
    //非战斗时中上，商店界面
    let Store = create_Store();
    //战斗时，中上和右上的战斗界面
    let combat = create_Combat();
    //设置界面
    let option_dom = create_Option();
    //游离于游戏布局之上，跟随鼠标的小窗口
    let Tooltip = create_Tooltip();
    //非战斗时右上，地图界面
    let map = crtElement('div', 'map', null, '', '');
    map.textContent = '地图界面';

    //创建布局
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

    // 向布局中插入合适的元素，实现游戏界面
    dom.main_dom = addElement(document.body, 'div', null, 'main_page');

    dom.main_dom.appendChild(dom.game_dom);

    dom.game_dom.appendChild(dom.game_left);
    dom.game_dom.appendChild(dom.game_right);

    dom.game_left.appendChild(player_status); //左上 角色状态
    dom.game_left.appendChild(Combat_plan); //左下 战斗规划

    dom.game_right.appendChild(dom.game_up_combat);
    dom.game_right.appendChild(dom.game_up_nomal);
    dom.game_right.appendChild(dom.game_down_nomal);

    dom.game_up_combat.appendChild(combat); //战斗时，中上和右上，战斗详情

    dom.game_up_nomal.appendChild(Live_plan); //非战斗，中上，生活规划
    dom.game_up_nomal.appendChild(Store); //非战斗，中上，商店（默认隐藏）
    dom.game_up_nomal.appendChild(map); //非战斗，右上，地图

    dom.game_down_nomal.appendChild(control); //中下，玩家控制
    dom.game_down_nomal.appendChild(game_log); //右下，游戏日志

    dom.main_dom.appendChild(option_dom); //整个界面最下5%的区域，设置
    dom.main_dom.appendChild(Tooltip); //游离于游戏布局之上，跟随鼠标的小窗口
}
//将游戏界面切换到初始状态
function init_game_dom() {
    //中上和右上
    //激活非战斗时游戏界面
    const game_up_combat = document.getElementById('game_up_combat');
    const game_up_nomal = document.getElementById('game_up_nomal');
    game_up_combat.style.display = 'none';
    game_up_nomal.style.display = '';
    //激活生活技能规划窗口
    const Live_plan_div = document.getElementById('Live_plan');
    const Store_div = document.getElementById('Store');
    const goods_trade_div = document.getElementById('goods_trade_div');
    Live_plan_div.style.display = '';
    Store_div.style.display = 'none';
    goods_trade_div.style.display = 'none';

    //左上
    //玩家属性界面切换到角色属性窗口
    const PAB_div = document.getElementById('PAB_div');
    const PSK_div = document.getElementById('PSK_div');
    PAB_div.style.display = '';
    PSK_div.style.display = 'none';
    //玩家属性界面分类按钮切换到角色属性上
    const player_attr_switch_radio_div = document.getElementById('player_attr_switch_radio_div');
    player_attr_switch_radio_div.children[0].checked = true;
    //角色装备栏切换到第一个
    const EQP_switch_div = document.getElementById('EQP_switch_div');
    EQP_switch_div.children[0].children[0].checked = true;
    //展示属性和展示装备功能切换到展示属性
    const attribute_show = document.getElementById('attribute_show');
    const equipment_show = document.getElementById('equipment_show');
    const buff_show_scroll_box = document.getElementById('buff_show_scroll_box');
    attribute_show.style.display = '';
    equipment_show.style.display = 'none';
    buff_show_scroll_box.style.display = 'none';
    //玩家技能窗口内左侧的过滤条件调整到"全部"按钮
    const PSK_ALL_radio_div = document.getElementById('PSK_ALL_radio_div');
    PSK_ALL_radio_div.children[0].checked = true;
    //展开的其他过滤条件窗口都隐藏
    const PSK_B_droptable = document.getElementById('PSK_B_droptable');
    PSK_B_droptable.style.display = 'none';
    const PSK_C_droptable = document.getElementById('PSK_C_droptable');
    PSK_C_droptable.style.display = 'none';
    const PSK_L_droptable = document.getElementById('PSK_L_droptable');
    PSK_L_droptable.style.display = 'none';
    const PSK_A_droptable = document.getElementById('PSK_A_droptable');
    PSK_A_droptable.style.display = 'none';
    const PSK_S_droptable = document.getElementById('PSK_S_droptable');
    PSK_S_droptable.style.display = 'none';

    //左下
    //战斗规划功能分类切换到背包按钮上
    const BP_switch_radio_div = document.getElementById('BP_switch_radio_div');
    BP_switch_radio_div.children[0].checked = true;
    //战斗规划界面切换到背包窗口
    const BP_div = document.getElementById('BP_div');
    const CBP_div = document.getElementById('CBP_div');
    BP_div.style.display = '';
    CBP_div.style.display = 'none';
    //背包界面的过滤条件切换到"全部"上
    const BP_ALL_radio_div = document.getElementById('BP_ALL_radio_div');
    BP_ALL_radio_div.children[0].checked = true;
    //其他过滤按钮都隐藏
    const BP_EQP_droptable = document.getElementById('BP_EQP_droptable');
    BP_EQP_droptable.style.display = 'none';
    const BP_CSB_droptable = document.getElementById('BP_CSB_droptable');
    BP_CSB_droptable.style.display = 'none';
    const BP_MTR_droptable = document.getElementById('BP_MTR_droptable');
    BP_MTR_droptable.style.display = 'none';
    //背包界面排序按钮切换到个数排序
    const BP_num_radio_div = document.getElementById('BP_num_radio_div');
    BP_num_radio_div.children[0].checked = true;
    //战斗规划界面切换到主动技能规划
    const ASP_radio_div = document.getElementById('ASP_radio_div');
    ASP_radio_div.children[0].checked = true;

    //右下
    //游戏日志功能分类切换到脑海按钮
    const MD_switch_radio_div = document.getElementById('MD_switch_radio_div');
    MD_switch_radio_div.children[0].checked = true;
    //战斗规划界面切换到背包窗口
    const MD_div = document.getElementById('MD_div');
    const IB_div = document.getElementById('IB_div');
    MD_div.style.display = '';
    IB_div.style.display = 'none';
    //脑海界面的过滤按钮切换到流水账
    const RA_radio_div = document.getElementById('RA_radio_div');
    RA_radio_div.children[0].checked = true;
    //其他过滤按钮都隐藏
    const RA_droptable = document.getElementById('RA_droptable');
    RA_droptable.style.display = 'none';
    const OP_droptable = document.getElementById('OP_droptable');
    OP_droptable.style.display = 'none';
    //脑海界面的右侧内容切换到流水账
    const RA_value_scroll_box = document.getElementById('RA_value_scroll_box');
    const IE_value_scroll_box = document.getElementById('IE_value_scroll_box');
    const OP_div = document.getElementById('OP_div');
    RA_value_scroll_box.style.display = '';
    IE_value_scroll_box.style.display = 'none';
    OP_div.style.display = 'none';
}
export { create_game_dom, init_game_dom };
