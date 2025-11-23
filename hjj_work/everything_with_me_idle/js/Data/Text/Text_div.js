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
//采集界面中用到的文本
function foraging_div_text(texts) {
    let id;
    //幸运采集时的提示文本
    id = 'luck_FAG_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '幸运采集！好东西怎么在路边呢';
    texts[id].text2 = '幸运采集！这么好的东西就在这放着，我寻思没人要呢';
    texts[id].text3 = '幸运采集！哦，捡到此物，还不错';
    texts[id].text4 = '幸运采集！自动拾取发力了';
    texts[id].text5 = '幸运采集！得来全不费工夫';
    texts[id].text6 = '幸运采集！这是俺拾滴';
    texts[id].text7 = '幸运采集！走路都能捡到宝';
    texts[id].text8 = '幸运采集！白捡的不要白不要';
    texts[id].text9 = '幸运采集！随便逛逛就有这好事？';
    texts[id].text10 = '幸运采集！放在路边都没人看见？';
    texts[id].text11 = '幸运采集！此物与我有缘';
    texts[id].text12 = '幸运采集！天赐机缘，合该我得';
    texts[id].text13 = '幸运采集！气运所钟，非我莫属';
    texts[id].text14 = '幸运采集！天上掉馅饼，正好砸我头上';
    texts[id].text15 = '幸运采集！快哉快哉';
    //涉险采集开始时的提示文本
    id = 'danger_FAG_start_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集开始，风险与收益并存，我去去就回';
    texts[id].text2 = '涉险采集开始，那边好像有个好东西在发光，虽然过去的路不好走，但值得试试看';
    texts[id].text3 = '涉险采集开始，远处有个亮闪闪的东西，估计是宝贝。虽然有点远，但还是过去看看吧';
    texts[id].text4 = '涉险采集开始，虽然有点远，但看样子是个稀罕物，不过去会后悔的';
    texts[id].text5 = '涉险采集开始，估计要费不少力气，不过看样子是个好东西，不能错过';
    texts[id].text6 = '涉险采集开始，过去的路确实不好走，不过为了那个宝贝，冒点险也值得';
    texts[id].text7 = '涉险采集开始，好东西就在眼前，不过去拿太可惜了，小心点应该没问题';
    texts[id].text8 = '涉险采集开始，那边有个宝贝，过去拿了再说';
    texts[id].text9 = '涉险采集开始，看到好东西了，虽然路远也得去';
    texts[id].text10 = '涉险采集开始，发光的东西不能放过，再远也要去看看';
    texts[id].text11 = '涉险采集开始，冒险就冒险吧，为了稀有物品值得';
    texts[id].text12 = '涉险采集开始，重宝在前，岂能畏首畏尾！纵有刀山火海，也要闯上一闯！';
    texts[id].text13 = '涉险采集开始，前路虽险，但富贵险中求';
    texts[id].text14 = '涉险采集开始，得想个安全的路线过去，不能太莽撞，但一定要拿到手';
    texts[id].text15 = '涉险采集开始，虽然累了点，但看到宝贝就有劲了，加把劲过去看看';
    //触发涉险采集，但当前处于疲劳状态，直接放弃时的文本
    id = 'danger_FAG_start_no_energy_end_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集结束，采集的路上发现远处有个稀有物品，但现在有点累了，涉险过去要不得，果断放弃';
    texts[id].text2 = '涉险采集结束，收益虽好，风险太大，以现在的状态，不该去';
    texts[id].text3 = '涉险采集结束，前路看着就费劲，体力所剩无几，果断放弃';
    texts[id].text4 = '涉险采集结束，远处有好东西，但过去太危险了，累了，不划算';
    texts[id].text5 = '涉险采集结束，身体在发出警告，没力气去冒险了，放弃吧';
    texts[id].text6 = '涉险采集结束，好东西虽好，但小命更重要，状态不好就别逞强';
    texts[id].text7 = '涉险采集结束，远处的机缘先记下，等恢复好了再来，不急这一时';
    texts[id].text8 = '涉险采集结束，我停下脚步，观望着那宝物，但我实在是累了。算了，还是专注于能安全到手的收获吧';
    texts[id].text9 = '涉险采集结束，通往宝物的路径看起来危机重重。以我现在的状态，实在无力应对，唯有叹息作罢';
    texts[id].text10 = '涉险采集结束，强烈的占有欲涌上心头，但我评估了自身所剩无几的精力，最终决定不冒这个风险';
    texts[id].text11 = '涉险采集结束，我停下脚步，心中满是无奈。身体的疲劳是如此真实，我知道今天只能到此为止';
    texts[id].text12 = '涉险采集结束，宝物诚可贵，生命价更高。今日身体不适，过去也是白给，不如在此调息恢复';
    //触发涉险采集，但当前地点没有稀有物品，直接放弃时的文本
    id = 'danger_FAG_start_no_rare_end_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集结束，远远看着还以为是什么稀罕物，仔细一瞧才发现就是普通的草药，白高兴一场';
    texts[id].text2 = '涉险采集结束，发现个隐藏的道路，还以为捡到宝了，结果就是个常见玩意儿';
    texts[id].text3 = '涉险采集结束，看走眼了，那边根本没有稀有物品';
    texts[id].text4 = '涉险采集结束，幸好先看清楚再行动，不然为个普通东西冒险太不值了';
    texts[id].text5 = '涉险采集结束，得亏多看了一眼，要不就为这点普通物品白费力气了';
    texts[id].text6 = '涉险采集结束，理智占了上风，先观察再行动，避免了一场无谓的冒险';
    texts[id].text7 = '涉险采集结束，既然不是稀有物品，就在周边安全区域采集，省时省力';
    texts[id].text8 = '涉险采集结束，不为普通东西冒险，在安全区域轻松采集到同等品质的物品';
    texts[id].text9 = '涉险采集结束，经验告诉我，远观和近看往往差别很大，以后要谨慎行事';
    texts[id].text10 = '涉险采集结束，得失随缘，既然不是珍品，也不必强求';
    texts[id].text11 = '涉险采集结束，既然不是宝贝，那该放弃就放弃，不浪费精力了';
    texts[id].text12 = '涉险采集结束，白高兴一场';
    //触发涉险采集，遭遇无法承受的危险，中途放弃时的文本
    id = 'danger_FAG_process_danger_end_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集结束，刚走到半路就遇到塌方，看来这宝贝和我没缘分，还是回去采点普通药草算了';
    texts[id].text2 = '涉险采集结束，低估了难度，准备不足差点出事，下次要做好万全准备再来尝试';
    texts[id].text3 = '涉险采集结束，命里无时莫强求，看来这宝贝今天不该我得，随缘吧';
    texts[id].text4 = '涉险采集结束，陷阱、落石、毒物，这条路实在太危险了，真不该来这里';
    texts[id].text5 = '涉险采集结束，至宝周围都有守护之物，我这一路的危险应该都是它导致的，实力不济，差点栽在这';
    texts[id].text6 = '涉险采集结束，我是拿不到它了，真没想到，早该想到，怎么可能会有这么好拿的东西';
    texts[id].text7 = '涉险采集结束，这般凶险，这谁来都没用啊，早早退避吧';
    texts[id].text8 = '涉险采集结束，试了试，发现承受不住，还是退回来做点安全的采集吧';
    texts[id].text9 = '涉险采集结束，走到一半感觉不行了，及时止损，回来采些普通药材也挺好';
    texts[id].text10 = '涉险采集结束，走到这里已经到极限了，知难而退也是种智慧';
    //触发涉险采集，过程中精力不足无法继续，中途放弃时的文本
    id = 'danger_FAG_process_no_energy_end_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集结束，感觉快摸到宝物了，结果体力耗尽晕了过去，醒来发现宝物也找不到了，只能自认倒霉';
    texts[id].text2 = '涉险采集结束，走得太深耗光了力气，昏睡一觉后彻底迷失方向，宝物再也找不到了';
    texts[id].text3 = '涉险采集结束，追着宝物痕迹走到陌生地域，体力透支昏厥，醒来已不识归路，只能作罢';
    texts[id].text4 = '涉险采集结束，在复杂地形中追寻宝物，耗尽精力后迷失，幸好还能找到离开的路';
    texts[id].text5 = '涉险采集结束，太过专注追宝，体力耗尽后昏睡，醒来发现身处完全陌生的环境，宝物已无从寻觅';
    texts[id].text6 = '涉险采集结束，拼到油尽灯枯，却在最后关头功亏一篑，醒来之后环境大变，已经不能继续了';
    texts[id].text7 = '涉险采集结束，与宝物只有一步之遥，却倒在了终点线前，醒来时连宝物在哪都找不到了';
    texts[id].text8 = '涉险采集结束，为宝物拼尽全力却晕倒迷路，既然无缘，不如在安全区域踏实采集';
    texts[id].text9 = '涉险采集结束，冒险失败还迷了路，宝物是找不回来了，只好在附近采些普通资源弥补损失';
    texts[id].text10 = '涉险采集结束，宝物没拿到还差点丢命，醒来后认清现实，老老实实采集安全地带的物资';
    texts[id].text11 = '涉险采集结束，命里无时莫强求，昏睡迷路也许是天意，安心采药才是正道';
    texts[id].text12 = '涉险采集结束，得失随缘，既然宝物与我无缘，不如珍惜眼前能获得的资源';
    texts[id].text13 = '涉险采集结束，虽然可惜，但能捡回一条命已是万幸，宝物就当是过眼云烟吧';
    texts[id].text14 = '涉险采集结束，贪心冒进吃了亏，以后要知道自己的极限在哪里';
    texts[id].text15 = '涉险采集结束，这次教训深刻，追逐宝物要预留体力，否则得不偿失';
    texts[id].text16 = '涉险采集结束，吃一堑长一智，下次要做好充分准备再冒险';
    //触发涉险采集，度过所有危险，得到稀有物品的文本
    id = 'danger_FAG_finish_end_tip_text';
    add_text_object(texts, id);
    texts[id].text1 = '涉险采集结束，几经周折，终于把东西拿到手了。这一路上可真不容易，好在最后总算没白忙活';
    texts[id].text2 = '涉险采集结束，费了这么大劲，差点把命搭上，不过看着到手的宝贝，觉得一切都值了';
    texts[id].text3 = '涉险采集结束，闯过这么多难关，身上挂了不少彩，但能把宝物平安带回来，这些苦也算没白受';
    texts[id].text4 = '涉险采集结束，这一路惊险不断，好几次都以为要撑不住了，幸好最后还是成功了';
    texts[id].text5 = '涉险采集结束，虽然过程艰难，但结果令人满意，这一趟冒险很值得';
    texts[id].text6 = '涉险采集结束，付出总有回报，历经千辛万苦，终于如愿以偿';
    texts[id].text7 = '涉险采集结束，这份收获来之不易，每一道伤痕都是它的价值证明';
    texts[id].text8 = '涉险采集结束，再多的困难也阻挡不了决心，最终的成功让一切付出都有了意义';
    texts[id].text9 = '涉险采集结束，过程有点小波折，但结果还不错';
    texts[id].text10 = '涉险采集结束，虽然不轻松，但该拿到的还是拿到了';
    texts[id].text11 = '涉险采集结束，费了一番功夫，最终没有白跑一趟';
    texts[id].text12 = '涉险采集结束，稍微费了点周折，不过东西总算到手了';
    texts[id].text13 = '涉险采集结束，目标达成，可以安心返回了';
    texts[id].text14 = '涉险采集结束，计划中的风险都应对过去了，收获也在计划之中';
    texts[id].text15 = '涉险采集结束，身上的伤痕还在隐隐作痛，但看到宝物就觉得这些代价都值得';
    texts[id].text16 = '涉险采集结束，握紧宝物长舒一口气，最难的部分总算过去了';
    texts[id].text17 = '涉险采集结束，终于拿到了！这一路上的提心吊胆可以放下了';
}
//初始化文本数据库中与界面布局相关的文本
function init_Text_div(texts) {
    //普通文本
    lable_text(texts);
    //按钮上的文本
    button_text(texts);
    //钓鱼界面中用到的文本
    fishing_div_text(texts);
    //采集界面中用到的文本
    foraging_div_text(texts);
}

export { init_Text_div };
