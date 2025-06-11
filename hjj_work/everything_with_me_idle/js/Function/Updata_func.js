import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { texts } from '../Data/Text/Text.js';
import { enums } from '../Data/Enum/Enum.js';
import { enemys } from '../Data/Enemy/Enemy.js';
import { add_show_Tooltip, add_click_Active_skill_worn_remove } from './Dom_function.js';
import { delete_player_active_div, delete_active_show_div } from './delete_func.js';
import { is_Empty_Object } from './Function.js';
import { global } from '../GameRun/global_class.js';
//更新血条上的数值
function updata_HP() {
    const HP_bar = document.getElementById('HP_bar');
    let P_attr = player.get_player_attributes();
    let health_point = P_attr.get_a_attr('health_point');
    let health_max = P_attr.get_a_attr('health_max');

    HP_bar.children[0].children[0].style.width = `${(health_point / health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(health_point)}/${Math.ceil(health_max)} 生命`;
}
//更新魔力条上的数值
function updata_MP() {
    const MP_bar = document.getElementById('MP_bar');
    let P_attr = player.get_player_attributes();
    let magic_point = P_attr.get_a_attr('magic_point');
    let magic_max = P_attr.get_a_attr('magic_max');

    MP_bar.children[0].children[0].style.width = `${(magic_point / magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(magic_point)}/${Math.ceil(magic_max)} 魔力`;
}
//更新精力条上的数值
function updata_ENP() {
    const ENP_bar = document.getElementById('ENP_bar');
    let P_attr = player.get_player_attributes();
    let energy_point = P_attr.get_a_attr('energy_point');
    let energy_max = P_attr.get_a_attr('energy_max');

    ENP_bar.children[0].children[0].style.width = `${(energy_point / energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(energy_point)}/${Math.ceil(energy_max)} 精力`;
}
//更新角色名
function updata_player_name() {
    const name_input = document.getElementById('Player_name');
    let P_attr = player.get_player_attributes();

    //获取更新后的玩家名称
    if (name_input.value.toString().trim().length > 0) {
        P_attr.name = name_input.value;
    } else {
        P_attr.name = '玩家';
    }
    //修改左上玩家状态界面
    name_input.value = P_attr.name;
    //修改战斗界面玩家名称显示
    let MCP_player_head = document.getElementById('MCP_player_head');
    MCP_player_head.innerHTML = P_attr.name;
}

//更新玩家属性展示表格中的数值
function updata_attribute_show() {
    const combat_attr_show = document.getElementById('combat_attribute_show');
    const player_base_attr = document.getElementById('Player_attribute_show');

    let P_attr = player.get_player_attributes();

    //表格排序，从左到右，从上到下，右半边表示玩家基础属性
    //战斗属性中，前5个是攻击属性
    let i = 0;
    for (let id of enums.combat_attack_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        combat_attr_show.children[i].innerText = ch;
        i++;
    }
    //然后是4个是防御属性
    for (let id of enums.combat_defense_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        combat_attr_show.children[i].innerText = ch;
        i++;
    }
    //7个玩家基础属性
    i = 0;
    for (let id of enums.player_base_attr) {
        let ch = texts[id].attr_name + '\n' + P_attr.get_a_attr(id);
        player_base_attr.children[i].innerText = ch;
        i++;
    }
}
//玩家主动技能变动，调整相关布局的展示
function updata_player_active_slots_num() {
    let P_Askill = player.get_player_ASkill_Manage();
    let num = P_Askill.get_slot_num();

    //战斗界面-主动技能槽的数量
    let player_active_div = document.getElementById('player_active_div');
    for (let i = 0; i < 9; i++) {
        if (i < num) {
            player_active_div.children[i].style.display = '';
        } else {
            player_active_div.children[i].style.display = 'none';
        }
    }
    //填充玩家没设置主动技能的部分的空白主动技能进度条
    //将目标槽拷贝到一个可见的，不影响布局的临时窗口内，获取宽度
    var clonedChild = player_active_div.children[0].cloneNode(true);
    var tempContainer = document.createElement('div');
    tempContainer.style.position = 'absolute'; // 不影响布局
    tempContainer.style.visibility = 'hidden'; // 保证父元素不可见不会影响布局
    document.body.appendChild(tempContainer);
    tempContainer.appendChild(clonedChild);
    let aslot_width = clonedChild.offsetWidth; //获取一个主动技能槽的宽度
    document.body.removeChild(tempContainer);
    // 获取槽之间的间隔
    let divStyle = window.getComputedStyle(player_active_div);
    let div_gap = parseInt(divStyle.gap, 10);
    //计算主动技能进度条应该有多长
    let use_slots_num = P_Askill.get_use_active_slots_num();
    let active_time_bar_div = document.getElementById('active_time_bar_div');
    for (let i = 0; i < 9; i++) {
        if (i < use_slots_num) {
            if (use_slots_num == 1) {
                active_time_bar_div.children[i].style.width = aslot_width + 'px';
            } else {
                active_time_bar_div.children[i].style.width =
                    aslot_width + (div_gap * (use_slots_num - 1)) / use_slots_num + 'px';
            }
            active_time_bar_div.children[i].style.display = '';
        } else {
            active_time_bar_div.children[i].style.display = 'none';
        }
    }
    //无用进度条应该有多长
    let un_use_active_time_frame = document.getElementById('un_use_active_time_frame');
    let n = num - use_slots_num;
    if (n == num) {
        //没有主动技能
        let un_use_len = n * aslot_width + (n - 1) * div_gap;
        un_use_active_time_frame.style.display = '';
        un_use_active_time_frame.style.width = un_use_len + 'px';
    } else if (n == 0) {
        // 主动技能全满
        un_use_active_time_frame.style.display = 'none';
    } else {
        //其他情况
        let un_use_len = n * aslot_width + n * div_gap;
        un_use_active_time_frame.style.display = '';
        un_use_active_time_frame.style.width = un_use_len + 'px';
    }

    //战斗规划界面-战斗规划-主动技能规划中展示的主动技能槽数量
    let active_show_div = document.getElementById('active_show_div');
    for (let i = 0; i < 9; i++) {
        if (i < num) {
            active_show_div.children[i].style.display = '';
        } else {
            active_show_div.children[i].style.display = 'none';
        }
    }
}
//玩家主动技能发生变动，在布局中填入技能信息
function updata_player_active_show() {
    //将玩家设置的主动技能在界面上展示出来
    let player_active_div = document.getElementById('player_active_div'); //战斗界面，玩家主动技能展示框
    let active_show_div = document.getElementById('active_show_div'); //战斗规划界面，主动技能规划展示框
    let active_time_bar_div = document.getElementById('active_time_bar_div');
    let P_Askill = player.get_player_ASkill_Manage();
    let num = P_Askill.get_slot_num();
    let active_slots = P_Askill.get_active_slots();
    for (let i = 0; i < num; i++) {
        //
        if (!is_Empty_Object(active_slots[i])) {
            let skill_id = active_slots[i].id;
            let slot_num = active_slots[i].slot_num;
            //战斗界面，玩家主动技能展示框
            if (texts[skill_id].skill_name.length >= 10) {
                player_active_div.children[i].children[0].innerHTML = texts[skill_id].mini_skill_name;
            } else {
                player_active_div.children[i].children[0].innerHTML = texts[skill_id].skill_name;
            }
            player_active_div.children[i].data = active_slots[i];
            add_show_Tooltip(player_active_div.children[i], 'active_skill', i); //添加鼠标移动之后展示该槽位设置的主动技能

            //战斗规划界面，主动技能规划展示框
            let active_type = active_slots[i].active_type;
            active_show_div.children[i].style.backgroundColor = enums[active_type].active_show_color;
            active_show_div.children[i].data = active_slots[i];
            add_show_Tooltip(active_show_div.children[i], 'active_skill', i); //添加鼠标移动之后展示该槽位设置的主动技能
            add_click_Active_skill_worn_remove(active_show_div.children[i], i);
        }
    }
}
//更新玩家主动技能进度条的进度
function updata_player_active_time_bar() {
    //
    let P_Askill = player.get_player_ASkill_Manage();
    let now_run_slot = P_Askill.now_run_slot;
    let now_run_slot_time = P_Askill.now_run_slot_time;
    let any_slot_time = P_Askill.any_slot_time;
    let bar_ratio = (now_run_slot_time / any_slot_time[now_run_slot]) * 100;

    let active_time_bar_div = document.getElementById('active_time_bar_div');
    for (let i = 0; i < 9; i++) {
        if (i < now_run_slot) {
            active_time_bar_div.children[i].children[0].children[0].style.width = '100%';
        } else if (i == now_run_slot) {
            active_time_bar_div.children[i].children[0].children[0].style.width = bar_ratio + '%';
        } else if (i > now_run_slot) {
            active_time_bar_div.children[i].children[0].children[0].style.width = '0%';
        }
    }
}

//玩家装备信息发生变动，更新相关界面
function updata_player_EQP() {
    //更新玩家属性
    player.updata_attr(true);
    //更新装备栏
    let P_worn = player.get_player_worn();
    P_worn.updata_equipment_show();
    //更新属性栏
    updata_attribute_show();
}
//玩家主动技能发生变动，更新相关界面
function updata_player_active() {
    //清空原有界面的内容
    delete_player_active_div();
    delete_active_show_div();
    //更新主动技能相关布局的展示情况
    updata_player_active_slots_num();
    //更新玩家属性
    player.updata_attr(true);
    //在主动技能相关布局中填入技能信息
    updata_player_active_show();
}

export {
    updata_HP,
    updata_MP,
    updata_ENP,
    updata_player_name,
    updata_attribute_show,
    updata_player_EQP,
    updata_player_active_slots_num,
    updata_player_active_show,
    updata_player_active,
    updata_player_active_time_bar,
};
