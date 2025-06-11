import { add_text_object } from './Text_class.js';

//游戏章节的文本
function main_quest_text(texts) {
    let id = 'main_quest_1';
    add_text_object(texts, id);
    texts[id].event_name = '证明自己是正常人';
}
//挑战的文本
function Challenge_text(texts) {
    let id = 'new_player_combat_test';
    // add_text_object(texts, id);
    texts[id].event_name = '新手战斗训练';
}
//迷你事件的文本
function mini_event_text(texts) {
    let id = 'new_player_teach_1';
    add_text_object(texts, id);
    texts[id].event_name = '周一新手教学';
    texts[id].text1 =
        '        兵营教练：在战斗中，首先就得攻击到敌人，且看我的动作，像这样，再那样…………刚刚我演示的就是“普通攻击-近战”的技巧。如果你们自觉天赋异禀，那可以去训练场试试看，用不出来就再多练练……';
    texts[id].text2 = '学会了“普通攻击-近战”<br>（在左下窗口的“战斗规划中使用它”）';

    id = 'new_player_teach_2';
    add_text_object(texts, id);
    texts[id].event_name = '周二新手教学';
    texts[id].text1 =
        '        兵营教练：赤手空拳与敌人战斗是不明知的，合适的防具可以降低敌人的伤害，兵营为所有人都准备了一套装备，好好磨合，战斗考验要用的';
    texts[id].text2 = '获得“全套木制护甲”<br>（在左下窗口的“背包物品中使用它们”）';

    id = 'new_player_teach_3';
    add_text_object(texts, id);
    texts[id].event_name = '周三新手教学';
    texts[id].text1 =
        '        兵营教练：今天要教的是怎么用盾牌，我知道有些人打到上头就不管死活只顾输出，这是非常愚蠢的事情，所以我得教你们如何保护好自己，就靠这个盾，像这样…………';
    texts[id].text2 = '获得“木制盾牌”<br>学会了“盾牌防御”';

    id = 'new_game_start';
    add_text_object(texts, id);
    texts[id].event_name = '开始新游戏';
    texts[id].text0 = '…………';
    texts[id].text1 = '        我似乎躺着，身体很虚弱，没有力气';
    texts[id].text2 = '我这是在哪？发生了什么？';
    texts[id].text3 =
        '        我想起来了，不久之前兽潮冲击村庄，强征所有人到前线，前线似乎溃败了，我的父母最后关头护我，但是兽潮过于凶猛，我在那时受到冲击之后便不记得了。现在我应该是身受重伤，此地应该是村庄诊所，那兽潮应该是结束了，不知父母是否安好';
    texts[id].text4 = '“闭眼静修，检视自身”';
    texts[id].text5 = '        我现在确实是身受重伤，但是我曾经多少也练过些许，怎么现在如此无力';
    texts[id].text6 = '“环视四周”';
    texts[id].text7 =
        '        这里确实是村庄诊所的病房，但是怎么只有我一人，兽潮冲击过后应该有许多伤者，我何德何能可以单住一间';
    texts[id].text8 = '（门外传来脚步声）';
    texts[id].text9 =
        '        村长：啊，我的孩子，你看起来恢复的不错。你的父母在兽潮中保护了你，他们是英勇且强大的战士，我希望你恢复之后也会如你的父母一样强大，所以来看望一下你';
    texts[id].text10 = '“询问自己身体为什么无力”';
    texts[id].text11 =
        '        村长：这是因为你在兽潮里受伤太重了，要救回你的性命用了珍贵的药，应该是你现在虚不受补，有副作用吧';
    texts[id].text12 = '“询问父母的情况”';
    texts[id].text13 =
        '        村长：他们为了保你而死在了兽潮中，兽潮离去之后我们的人只找到些许残破身躯，如今已经火化下葬，你养好身体再去墓地看吧';
    texts[id].text14 = '“询问这间病房”';
    texts[id].text15 =
        '        村长：兽潮时我也在前线，我听到了你父母的求援，可惜兽潮太凶猛我也没法过去。我听到他们说只希望你能活下来，为此不惜将家产赠送给救援的人。现在村庄里伤者众多，但我也是重诺之人，就为你争取了这间病房，不过等你恢复了，还是要交给别人';
    texts[id].text16 =
        '（你还想问些什么，但是被村长挡回去了）<br>        村长：你就好好修养，将现在的困难当作磨练，或许未来你会比你父母更强大。<br>        村长：哦还有一件事，村庄现在百废待兴，但也不养闲人，你刚刚说身体无力，那当你出院之后就得去村庄兵营里测验一番，如果这次重伤实在伤筋动骨不能锻炼，那你就去找个扫地的营生吧。';
    texts[id].text17 =
        '        修养一段时间终于康复，诊所医师说村长已经打过招呼，让你回家准备兵营的“新手战斗训练”，只是所有与你交谈的人都不像是面对一个大病初愈的人，而是像面对一个处境很悲惨的人，这是怎么回事？';
    texts[id].text18 = '前往村庄住所';
    texts[id].text19 =
        '        从小长大的家里十分空旷，家具物品几乎都没了，你似乎理解村长说的“将家产赠送给救援的人”是什么意思了';
    texts[id].text20 = '（门口传来敲门声）';
    texts[id].text21 =
        '        兵营教练：我来是通知你，明天会开始三天的“新手战斗教学”，记得来兵营参加训练，如果错过就得等到下周了';
    texts[id].text22 = '知道了';
    texts[id].text23 =
        '        兵营教练：（小声）村里的守卫得到了命令，如果你不能完成训练，就不允许去村里其他地方，如果你强行要闯，他们就以你不守规矩为理由把你赶出村外。你曾经在兵营时就展现出了战斗的天赋，这样的才华不要一时糊涂被歹人算计了<br>        兵营教练：（大声）没什么事就不要出门了，为明天的训练做准备吧';
    texts[id].text24 = '…………知道了（休息到第二天）';
}
//事件完成条件的文本
function event_finish_condition_text(texts) {
    let id = 'PKL_melee_kill';
    add_text_object(texts, id);
    texts[id].condition_name = '近战击杀';
    id = 'ATD_all_armor';
    add_text_object(texts, id);
    texts[id].condition_name = '4个防具部位都有穿着的情况下受击';
    id = 'DSE_shield_defense';
    add_text_object(texts, id);
    texts[id].condition_name = '使用“盾牌防御”技能抵挡敌人攻击';
}
//初始化文本数据库中与游戏事件相关的文本
function init_Text_game_event(texts) {
    //主线任务的文本
    main_quest_text(texts);
    //挑战的文本
    Challenge_text(texts);
    //迷你事件的文本
    mini_event_text(texts);
    //事件完成条件的文本
    event_finish_condition_text(texts);
}

export { init_Text_game_event };
