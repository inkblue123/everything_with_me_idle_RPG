import { items } from '../Data/Item/Item.js';
import { enums } from '../Data/Enum/Enum.js';
import { texts } from '../Data/Text/Text.js';
import { P_skills } from '../Data/Skill/Skill.js';
import { global } from '../GameRun/global_manage.js';
import { player } from '../Player/Player.js';
import { updata_player_EQP, updata_player_active } from './Updata_func.js';
// 创造一个dom元素，赋值id，className，style.display，style.backgroundColor
function crtElement(elem, id, cls, sty_display, sty_BGC) {
    let newdom = document.createElement(elem);
    if (id) newdom.id = id;
    if (cls) newdom.className = cls;
    if (sty_display) newdom.style.display = sty_display;
    if (sty_BGC) newdom.style.backgroundColor = sty_BGC;
    return newdom;
}
//向parent_element中添加一个元素，赋予id或者classname
function addElement(parent_element, elem, id, cls, sty_display) {
    let newelem = document.createElement(elem);
    if (id) newelem.id = id;
    if (cls) newelem.className = cls;
    if (sty_display) newelem.style.display = sty_display;
    parent_element.appendChild(newelem);
    return newelem;
}
//向parent_element中添加一个radio
function addElement_radio(parent_element, id, name, value, textContent) {
    let newradio = document.createElement('input');
    newradio.type = 'radio';
    if (id) newradio.id = id;
    if (name) newradio.name = name;
    if (value) newradio.value = value;
    parent_element.appendChild(newradio);
    let newlabel = document.createElement('label');
    newlabel.setAttribute('for', id);
    if (textContent) newlabel.textContent = textContent;
    parent_element.appendChild(newlabel);
    return newradio;
}
//向parent_element中添加一个选项固定的select
function addElement_select(parent_element, id, cls, name, title, ...option_name) {
    let newselect = document.createElement('select');
    //初始化select基本信息
    if (id) newselect.id = id;
    if (cls) newselect.className = cls;
    if (name) newselect.name = name;
    // newselect.size = 5;
    if (title) {
        newselect.setAttribute('aria-label', title);
    } else {
        newselect.setAttribute('aria-label', 'select_title');
    }
    //将选项放入select
    for (let index in option_name) {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = option_name[index];
        newselect.appendChild(option);
    }
    parent_element.appendChild(newselect);
    return newselect;
}
//向parent_element中添加一个选项会在点开之后才加载的select
function addElement_lazy_select(parent_element, id, cls, name, title, D_option, getOptionsLoader) {
    let newselect = document.createElement('select');
    //初始化select
    if (id) newselect.id = id;
    if (cls) newselect.className = cls;
    if (name) newselect.name = name;
    // newselect.size = 5;

    if (title) {
        newselect.setAttribute('aria-label', title);
    } else {
        newselect.setAttribute('aria-label', 'select_title');
    }
    //添加默认选项
    const option = document.createElement('option');
    option.value = D_option;
    option.textContent = D_option;
    newselect.appendChild(option);

    // 点击事件监听 - 用户点击下拉框时调用函数获取选项
    newselect.addEventListener('click', function () {
        //获取新选项
        let options = getOptionsLoader();
        // 保存当前选择的index和value
        const currentIndex = this.selectedIndex;
        const currentValue = this.value;
        // 清空现有选项（保留第一个占位符）
        while (this.options.length > 1) {
            this.removeChild(this.options[1]);
        }
        // 添加新选项
        for (let id in options) {
            const option = document.createElement('option');
            option.value = id;
            option.textContent = options[id];
            this.appendChild(option);
        }
        //该函数在下拉框click事件中，而与select交互的过程中，会触发两次click
        //一次是点开下拉框时，一次是选择了下拉框内部选项时
        //点开下拉框时，该函数清空了所有选项，会把框内的旧选择也重置成默认选项，这不符合直觉，
        //所以需要在清空之后将选项恢复为旧选项
        //选择下拉框内选项时，该函数清空了所有选项，会把框内刚刚选择的新选项重置成默认选项，
        //所以也要清空之后恢复为新选项
        //恢复选项
        if (currentValue && currentValue !== '无') {
            for (let i = 0; i < this.options.length; i++) {
                if (this.options[i].value === currentValue) {
                    this.selectedIndex = i;
                    return;
                }
            }
        }
        // 如果value找不到，尝试通过index恢复（但要确保index有效）
        if (currentIndex >= 0 && currentIndex < this.options.length) {
            this.selectedIndex = currentIndex;
        } else {
            // 否则选择默认选项
            this.selectedIndex = 0;
        }
    });

    parent_element.appendChild(newselect);
    return newselect;
}
//删除一个div中所有元素
function empty_dom(dom) {
    while (dom.lastChild) {
        dom.removeChild(dom.lastChild);
    }
}

// 向目标组件添加鼠标移动显示小窗口的功能
function add_show_Tooltip(target_div, tip_type, tip_value) {
    // 鼠标移入目标元素时显示小窗口
    target_div.addEventListener('mouseenter', (event) => {
        let tooltip = document.getElementById('tooltip');
        tooltip.InitTip(tip_type, tip_value, event); // 初始化小窗口内容并显示小窗口
    });

    // 鼠标移动时更新小窗口位置
    target_div.addEventListener('mousemove', (event) => {
        let tooltip = document.getElementById('tooltip');
        requestAnimationFrame(() => tooltip.MoveTip(event));
        // tooltip.MoveTip(event); //移动小窗口
    });

    // 鼠标移出目标元素时隐藏小窗口
    target_div.addEventListener('mouseleave', () => {
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}
//  向目标组件添加鼠标点击穿戴到身上的功能
function add_click_Equipment_worn(target_div, item_data) {
    target_div.addEventListener('click', () => {
        //从玩家背包中去掉要穿戴的物品
        let ret = player.Player_lose_item(item_data);
        if (ret <= 0) return;
        //切换到当前激活的装备栏
        let P_worn = player.get_player_worn();
        P_worn.show_active_EQP();
        //将要穿戴的物品放到目前激活的装备栏的指定位置
        // let equip_rarity = item_data.equip_rarity;
        player.worn_Equipment(item_data);
        //装备信息发生变动，更新相关界面和数据
        updata_player_EQP(); //玩家属性变化
        let now_GS = global.get_flag('GS_game_statu');
        if (now_GS == 'combat') {
            //如果在战斗中，玩家的主动技能回合应该重置
            let P_Askill = player.get_player_ASkill_Manage();
            P_Askill.reset_round();
        } else if (enums['live_plan_GS'].includes(now_GS)) {
            //如果在生活技能中，当前回合也应该重置
            let live_plan_manage = global.get_live_plan_manage();
            live_plan_manage.reset_round();
        }
        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}
// 向目标组件添加鼠标点击后从装备栏里卸下的的功能
function add_click_Equipment_worn_remove(target_div, wp) {
    target_div.addEventListener('click', () => {
        //从玩家身上脱下指定位置的装备
        player.remove_worn_Equipment(wp);
        //装备信息发生变动，更新相关界面
        updata_player_EQP();
        let now_GS = global.get_flag('GS_game_statu');
        if (now_GS == 'combat') {
            //如果在战斗中，玩家的主动技能回合应该重置
            let P_Askill = player.get_player_ASkill_Manage();
            P_Askill.reset_round();
        } else if (enums['live_plan_GS'].includes(now_GS)) {
            //如果在生活技能中，当前回合也应该重置
            let live_plan_manage = global.get_live_plan_manage();
            live_plan_manage.reset_round();
        }
        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}

// 向主动技能组件添加鼠标点击设置到身上主动技能槽的功能
function add_click_Active_skill_worn(target_div, skill_id) {
    target_div.addEventListener('click', () => {
        let P_Askill = player.get_player_ASkill_Manage();
        //获取从左到右首个空闲的主动技能槽位置
        let slot = P_Askill.get_unuse_active_slots_num();
        if (slot == -1) {
            //身上主动技能槽全满，不设置
            return false;
        }
        //向空闲槽添加该技能
        P_Askill.set_active_skill(skill_id, slot);
        updata_player_active();
    });
}
// 向目标组件添加 点击之后可以从玩家身上卸下指定的主动技能的功能
function add_click_Active_skill_worn_remove(target_div, slot_id) {
    //输入的slot_id表示要卸下玩家身上第几个槽的技能，从0开始计数
    target_div.addEventListener('click', () => {
        //从玩家身上卸下指定槽位的主动技能
        let P_Askill = player.get_player_ASkill_Manage();
        P_Askill.remove_solt_active_skill(slot_id);
        //主动技能发生变动，更新相关界面
        updata_player_active();
        //关闭提示窗
        let tooltip = document.getElementById('tooltip');
        tooltip.CloseTip(); //清空小窗口
    });
}

//隐藏指定div元素
function hide_div(div_id) {
    //
    let target_div = document.getElementById(div_id);
    if (target_div == undefined) {
        console.log('隐藏%s失败，没有找到这个元素', div_id);
    }
    // target_div.style.display = 'none';
    target_div.style.visibility = 'hidden';
}
//渐变显示指定的div元素
function Gradient_div(div_id) {
    let target_div = document.getElementById(div_id);
    if (target_div == undefined) {
        console.log('渐变显示%s失败，没有找到这个元素', div_id);
        return;
    }
    // target_div.style.display = '';
    target_div.style.visibility = 'visible';

    let opacity = 0;
    target_div.style.opacity = opacity;

    let interval = setInterval(function () {
        opacity += 0.05; // 每次增加 0.05
        if (opacity >= 1) {
            opacity = 1;
            clearInterval(interval); // 停止渐变
        }
        target_div.style.opacity = opacity;
    }, 50); // 设置渐变的时间
}
//让指定div元素从它的父元素上方向下移动到正常居中位置，可以用作特效显示文本
function start_magic_animation(div_id, text) {
    const textElement = document.getElementById(div_id);
    if (textElement == undefined) {
        console.log('渐变显示%s失败，没有找到这个元素', div_id);
        return;
    }
    textElement.innerHTML = text;

    // 重置位置
    textElement.style.transform = 'translateY(-100px)';

    let startTime = null;
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const duration = 500; // 动画时长1.5秒

        if (progress < duration) {
            // 计算动画进度 (0-1)
            const progressRatio = progress / duration;

            // 缓动函数 - 先快后慢
            const easeOut = 1 - Math.pow(1 - progressRatio, 3);

            // 位置移动
            const newY = -100 + easeOut * 100;
            textElement.style.transform = `translateY(${newY}px)`;

            // 透明度变化

            requestAnimationFrame(animate);
        } else {
            // 动画结束
            textElement.style.transform = 'translateY(0)';
        }
    }

    requestAnimationFrame(animate);
}

//重新生成战斗界面的玩家主动技能部分
function delete_player_active_div() {
    let player_active_div = document.getElementById('player_active_div');
    player_active_div.replaceChildren(); //清空现有主动技能槽内容
    for (let i = 0; i < 9; i++) {
        var player_active = addElement(player_active_div, 'div', null, 'player_active');
        addElement(player_active, 'div', null, 'player_active_text');
    }
}
//重新生成左下战斗规划界面中战斗规划界面的主动技能展示部分
function delete_active_show_div() {
    let active_show_div = document.getElementById('active_show_div');
    active_show_div.replaceChildren(); //清空现有内容
    for (let i = 0; i < 9; i++) {
        addElement(active_show_div, 'div', null, 'active_show_value');
    }
}

export {
    crtElement,
    addElement,
    addElement_radio,
    addElement_select,
    addElement_lazy_select,
    empty_dom,
    add_show_Tooltip,
    add_click_Equipment_worn,
    add_click_Equipment_worn_remove,
    add_click_Active_skill_worn,
    add_click_Active_skill_worn_remove,
    hide_div,
    Gradient_div,
    delete_player_active_div,
    delete_active_show_div,
    start_magic_animation,
};
