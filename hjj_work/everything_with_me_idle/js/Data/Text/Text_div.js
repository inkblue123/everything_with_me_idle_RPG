import { add_text_object } from './Text_class.js';

//界面布局中普通的文本
function lable_text(texts) {
    let id;

    id = 'save_tip_text';
    add_text_object(texts, id);
    texts[id].lable_text1 = '导出存档';
    texts[id].lable_text2 = '你的存档位于下方的方框中';
    texts[id].lable_text3 = '请务必全部复制，否则无法生效';
    id = 'load_tip_text';
    add_text_object(texts, id);
    texts[id].lable_text1 = '导入存档';
    texts[id].lable_text2 = '将你的原始存档粘贴至下方的方框中';

    id = 'delete_tip_text';
    add_text_object(texts, id);
    texts[id].lable_text1 = '删除存档';
    texts[id].lable_text2 = '将删除当前存档，并且重置到新游戏开始界面';
    texts[id].lable_text3 = '此操作不可逆，确定吗';
    texts[id].lable_text4 = '已完成';
}
//界面布局中按钮元素上的文本
function button_text(texts) {
    let id = 'save_tip_exit_button';
    add_text_object(texts, id);
    texts[id].button_text = '好';
    id = 'load_tip_load_button';
    add_text_object(texts, id);
    texts[id].button_text = '导入';
    id = 'load_tip_exit_button';
    add_text_object(texts, id);
    texts[id].button_text = '取消';
    id = 'delete_tip_ok_button';
    add_text_object(texts, id);
    texts[id].button_text = '确认删除';
    id = 'delete_tip_exit_button';
    add_text_object(texts, id);
    texts[id].button_text = '取消';
}
//钓鱼界面中用到的文本
function fishing_div_text(texts) {
    let id;
    //钓鱼状态切换时的提示文本
    id = 'FIS_status_change';
    add_text_object(texts, id);
    texts[id].NO_FIS_text = '';
    texts[id].WAIT_FIS_text = '开始钓鱼<br>等鱼上钩';
    texts[id].WAIT_FIS_no_tool_text = '开始钓鱼<br>随手拿了一根树枝<br>等鱼咬枝';
    texts[id].WALK_FIS_text = '鱼已咬钩<br>正在遛鱼';
    texts[id].FINISH_FIS_text = '鱼钓上来了<br>钓到的是';
    texts[id].RUN_FIS_text = '哎呀';
    texts[id].REST_FIS_text = '感到疲劳<br>休息好了再继续';
    //等鱼上钩阶段的不定时提示文本
    id = 'wail_FIS_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '感觉有东西碰钩<br>但它没咬';
    texts[id].text2 = '看到浮漂附近有气泡<br>鱼一定很近了';
    texts[id].text3 = '今天的风儿甚是喧嚣啊';
    texts[id].text4 = '钓的好慢<br>不知换个钓点有没有帮助';
    texts[id].text5 = '好的猎手总是最有耐心';
    texts[id].text6 = '将来会被我吃掉的鱼<br>现在在哪呢？';
    texts[id].text7 = '刚才的啄食很谨慎<br>是老家伙呢……';
    texts[id].text8 = '我开始怀疑这片水域到底有没有鱼……';
    texts[id].text9 = '希望不要勾到水草……';
    texts[id].text10 = '我应该再多等等……';
    texts[id].text11 = 'ZZzzz……<br>ZZzzz……';
    //遛鱼阶段，鱼的逃跑力达到初始一半时的不定时提示文本
    id = 'walk_FIS_status1_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '鱼还在往水里钻<br>还得撑住';
    texts[id].text2 = '这次上钩了个不好惹的家伙！';
    texts[id].text3 = '鱼第一次发力最猛<br>撑过去就好';
    texts[id].text4 = '来吧<br>比比谁的耐力更强！';
    texts[id].text5 = '这是一场意志力的较量……';
    //遛鱼阶段，鱼的逃跑力达到0时的不定时提示文本
    id = 'walk_FIS_status2_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '鱼已经没力气了';
    texts[id].text2 = '真是一条大鱼<br>拉回来都费劲';
    texts[id].text3 = '一切尽在我的掌握';
    texts[id].text4 = '它已经没法再下潜了';
    //遛鱼阶段，鱼的逃跑力达到初始负一半时的不定时提示文本
    id = 'walk_FIS_status3_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '你已是我的囊中之物';
    texts[id].text2 = '胜利在望！<br>慢慢收线就好';
    texts[id].text3 = '鱼的体力耗尽<br>保持稳妥收线';
    texts[id].text4 = '好久没有这样的体验了';
    //遛鱼阶段，鱼的逃跑力达到负初始时的不定时提示文本
    id = 'walk_FIS_status4_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '比我想象的要累……';
    texts[id].text2 = '到这里了<br>还想跑吗';
    texts[id].text3 = '我已经能看到你的影子了';
    texts[id].text4 = '快拿我的抄网来';
    //遛鱼阶段，任何时间点触发都可以用的提示文本
    id = 'walk_FIS_general_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '你是我的了';
    texts[id].text2 = '鱼！<br>好大的鱼！';
    texts[id].text3 = '要一收一放<br>节奏不能乱';
    texts[id].text4 = '快快收线<br>快快收线';
}
//初始化文本数据库中与界面布局相关的文本
function init_Text_div(texts) {
    //普通文本
    lable_text(texts);
    //按钮上的文本
    button_text(texts);
    //钓鱼界面中用到的文本
    fishing_div_text(texts);
}

export { init_Text_div };
