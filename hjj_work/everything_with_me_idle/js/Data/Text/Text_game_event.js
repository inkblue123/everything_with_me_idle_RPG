import { add_text_object } from './Text_class.js';

//主线任务的文本
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
    texts[id].button_name = '进行新手战斗训练';
}
//迷你事件的文本
function mini_event_text(texts) {
    let id;

    id = 'find_village_home_money';
    add_text_object(texts, id);
    texts[id].event_name = '翻找住所寻找可用资源';
    texts[id].button_name = '翻找住所寻找可用资源';
    texts[id].text1 = '        你仔细找遍住所每个角落，洗劫一空的家里确实没发现有用的东西，杂物间里破损的桌椅，厨房里腐烂的食物残渣，这些东西有什么用呢';
    texts[id].text2 = '再仔细找找';
    texts[id].text3 =
        '        来搬东西的人应该只会像刚刚你搜的那样寻找明面上的储藏空间，不会掘地三尺不会搜查每个夹层，想到这里你再寻找了一遍住所，终于在床垫里、在柜子背后找到了一些钱币<br>        有些钱币看起来放了很久很久，应该是生活时遗漏的，有些钱币用纸巾包起来了，应该是特意保存的，无论如何，这就是你现在拥有的全部了';
    texts[id].text4 = '获得“1银币”和“325铜币”';

    id = 'new_player_teach_1';
    add_text_object(texts, id);
    texts[id].event_name = '周一新手教学';
    texts[id].button_name = '进行周一新手教学';
    texts[id].text1 =
        '        兵营教练：在战斗中，首先就得攻击到敌人，且看我的动作，像这样，再那样…………刚刚我演示的就是“普通攻击-近战”的技巧。如果你们自觉天赋异禀，那可以去训练场试试看，用不出来就再多练练……';
    texts[id].text2 = '学会了“普通攻击-近战”<br>（在左下窗口的“战斗规划中使用它”）';

    id = 'new_player_teach_2';
    add_text_object(texts, id);
    texts[id].event_name = '周二新手教学';
    texts[id].button_name = '进行周二新手教学';
    texts[id].text1 = '        兵营教练：赤手空拳与敌人战斗是不明知的，合适的防具可以降低敌人的伤害，兵营为所有人都准备了一套装备，好好磨合，战斗考验要用的';
    texts[id].text2 = '获得“全套木制护甲”<br>（在左下窗口的“背包物品中使用它们”）';

    id = 'new_player_teach_3';
    add_text_object(texts, id);
    texts[id].event_name = '周三新手教学';
    texts[id].button_name = '进行周三新手教学';
    texts[id].text1 = '        兵营教练：今天要教的是怎么用盾牌，我知道有些人打到上头就不管死活只顾输出，这是非常愚蠢的事情，所以我得教你们如何保护好自己，就靠这个盾，像这样…………';
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
    texts[id].text7 = '        这里确实是村庄诊所的病房，但是怎么只有我一人，兽潮冲击过后应该有许多伤者，我何德何能可以单住一间';
    texts[id].text8 = '（门外传来脚步声）';
    texts[id].text9 = '        村长：啊，我的孩子，你看起来恢复的不错。你的父母在兽潮中保护了你，他们是英勇且强大的战士，我希望你恢复之后也会如你的父母一样强大，所以来看望一下你';
    texts[id].text10 = '“询问自己身体为什么无力”';
    texts[id].text11 = '        村长：这是因为你在兽潮里受伤太重了，要救回你的性命用了珍贵的药，应该是你现在虚不受补，有副作用吧';
    texts[id].text12 = '“询问父母的情况”';
    texts[id].text13 = '        村长：他们为了保你而死在了兽潮中，兽潮离去之后我们的人只找到些许残破身躯，如今已经火化下葬，你养好身体再去墓地看吧';
    texts[id].text14 = '“询问这间病房”';
    texts[id].text15 =
        '        村长：兽潮时我也在前线，我听到了你父母的求援，可惜兽潮太凶猛我也没法过去。我听到他们说只希望你能活下来，为此不惜将家产赠送给救援的人。现在村庄里伤者众多，但我也是重诺之人，就为你争取了这间病房，不过等你恢复了，还是要交给别人';
    texts[id].text16 =
        '（你还想问些什么，但是被村长挡回去了）<br>        村长：你就好好修养，将现在的困难当作磨练，或许未来你会比你父母更强大。<br>        村长：哦还有一件事，村庄现在百废待兴，但也不养闲人，你刚刚说身体无力，那当你出院之后就得去村庄兵营里测验一番，如果这次重伤实在伤筋动骨不能锻炼，那你就去找个扫地的营生吧。';
    texts[id].text17 =
        '        修养一段时间终于康复，诊所医师说村长已经打过招呼，让你回家准备兵营的“新手战斗训练”，只是所有与你交谈的人都不像是面对一个大病初愈的人，而是像面对一个处境很悲惨的人，这是怎么回事？';
    texts[id].text18 = '前往村庄住所';
    texts[id].text19 = '        从小长大的家里十分空旷，家具物品几乎都没了，你似乎理解村长说的“将家产赠送给救援的人”是什么意思了';
    texts[id].text20 = '（门口传来敲门声）';
    texts[id].text21 = '        兵营教练：我来是通知你，明天会开始三天的“新手战斗教学”，记得来兵营参加训练，如果错过就得等到下周了';
    texts[id].text22 = '知道了';
    texts[id].text23 =
        '        兵营教练：（小声）村里的守卫得到了命令，如果你不能完成训练，就不允许去村里其他地方，如果你强行要闯，他们就以你不守规矩为理由把你赶出村外。你曾经在兵营时就展现出了战斗的天赋，这样的才华不要一时糊涂被歹人算计了<br>        兵营教练：（大声）没什么事就不要出门了，为明天的训练做准备吧';
    texts[id].text24 = '…………知道了（休息到第二天）';

    id = 'get_up';
    add_text_object(texts, id);
    texts[id].event_name = '该起床了';
    texts[id].text1 = '时候不早，该起床了';
    texts[id].text2 = '起床，前往村庄住所';

    id = 'unlock_foraging_logging';
    add_text_object(texts, id);
    texts[id].event_name = '向老妇人询问村外的情况';
    texts[id].button_name = '向老妇人询问村外的情况';
    texts[id].text0 = '…………';
    texts[id].text1 = '        村口老妇：不久前的兽潮踏过了村子附近，村外的种的庄稼都被踩坏，啥也没留下';
    texts[id].text2 = '村外有哪里比较安全';
    texts[id].text3 = '        村口老妇：往“已开荒的林区”那边可以走，往“外层森林”那边似乎还有一些动静，我不清楚是不是安全的';
    texts[id].text4 = '村外真的没有东西能收集吗';
    texts[id].text5 = '        村口老妇：要说山野水果或者鱼虾那还是有一些的，在“已开荒的林区”那边应该有，但是也不如以前的多了，“外层森林”那边从兽潮开始就没人去过，或许会有更多东西';
    texts[id].text6 = '好的，老人家，我这就去村外看看';
    texts[id].text7 = '        村口老妇：慢着，年轻人，你就打算这么去收集物资吗，我看你手里的家伙也不合适啊';
    texts[id].text8 = '我手里确实没有好工具，又能怎么办呢';
    texts[id].text9 =
        '        村口老妇：这我熟啊，空手也可以采集，你就像这样，专挑有用的部分，避开尖刺。有时候你会通过一些线索发现地里有珍贵的材料，采集到的概率很低，仔细寻找，总能找到的。还有啊，这些东西既然颇为珍贵，你拿到了，地里就少了，此后一段时间再采集不到也是正常。还有啊…………';
    texts[id].text10 = '（学会了生活技能-采集）';
    texts[id].text11 =
        '        村口老妇：我们村背靠山林，树木也是重要资源，一般来说得有个工具去伐木，不过我知道你们年轻人力气大，或许也可以徒手掰断些柴火回来。你就把树当成兵营里的草人，把它折断批了。还有啊，伐木时弄出来的木屑最好也带回来，这也是好东西，用处不小…………';
    texts[id].text12 = '（学会了生活技能-伐木）';
    texts[id].text13 = '        村口老妇：“已开荒的林区”那边有条溪流，以前是有鱼的，不知道现在还有没有，钓鱼这事你得有个鱼竿，村里的商店或许有卖，你到时候问问人家怎么钓鱼，要是没有鱼竿，那可没法钓鱼';
    texts[id].text14 = '（获得支线任务-学会钓鱼）';
    texts[id].text15 =
        '        村口老妇：以前的时候村里是挖矿卖矿发展来的，村里的铁匠铺都留到了现在，后来山里闹魔兽，随着山里越来越危险，村里人都转成练武了。呵呵说远了，我是说这村里还有一门挖矿的手艺，现在的村里大概比以往都要缺矿，你要是能搞到，肯定能比什么鱼啊木头啊要值钱吧';
    texts[id].text16 = '（获得支线任务-学会挖矿）';
    texts[id].text17 =
        '        村口老妇：年轻人啊，这次兽潮过去，我失去了所有亲人，村里再无牵挂，但这日子还得过，一天天越发无趣，现在遇到你，既是想帮帮你，也是想找人聊聊天，多说了这些话，怕是耽误你行程了，不要怪我啊';
    texts[id].text18 = '无妨，老人家，你的话很有帮助，我会记得的';
    texts[id].text19 = '多谢指点，我这就去试试';
    texts[id].text20 = '（转身离开）';

    id = 'VM_woodshop_study_fishing';
    add_text_object(texts, id);
    texts[id].event_name = '向木工坊老板询问如何钓鱼';
    texts[id].button_name = '向木工坊老板询问如何钓鱼';
    texts[id].text0 = '…………';
    texts[id].text1 = '        木工坊老板：这钓鱼啊，一般人还真不如我懂，常人可能觉得钓鱼不过是丢饵下去等鱼上钩的事情，最多还要计较遛鱼时会不会脱钩，但在我眼里，钓鱼可大不一样';
    texts[id].text2 = '哦，怎么说';
    texts[id].text3 =
        '        木工坊老板：我以前也是村里第一钓鱼好手，钓遍周围所有水域，要我总结，那钓鱼之道不在钓鱼本身，而是前期准备。先准备一把好钓竿，再找到一个好钓点，准备妥当之后，鱼自然会上钩的';
    texts[id].text4 = '没有鱼饵？鱼会咬钩吗';
    texts[id].text5 = '        木工坊老板：新手总是这样想的，有些鱼确实喜欢吃饵，但有些鱼十分谨慎，生活的环境里突然多了一块鱼饵反而不敢靠近，总之，钓鱼可以没有鱼饵，会有鱼上钩的';
    texts[id].text6 = '…………那然后呢';
    texts[id].text7 =
        '        木工坊老板：然后不就是等着鱼上钩就好了，注意，在等鱼上钩的时候千万不能动，鱼一旦察觉到动静会立刻跑开，再想它放松警惕可难了<br>        木工坊老板：待到鱼上钩之后，要松鱼线，让鱼先跑一会，消磨它的体力，再徐徐拉回，不可硬拉，在拉回来的这段时间可是钓鱼过程最享受的时候了，一定要慢，这都是教训啊';
    texts[id].text8 = '放松鱼线让鱼跑了可怎么办';
    texts[id].text9 =
        '        木工坊老板：你要是买我做的鱼竿，必不可能跑鱼，这也是教训，当年我的钓鱼技术太好，遇到了一条大鱼，最终它把我拉下水了鱼竿也没事。也就是这事让我觉得物极必反，技术太好也是错啊，但是做鱼竿的手艺确实没得说，我就开了这家木工坊，顺便做些其他的东西';
    texts[id].text10 = '还有这样的故事，那你多年钓鱼一定有什么绝招吧，能否说来听听';
    texts[id].text11 = '        木工坊老板：哪有什么绝招啊，有也不是你这种钓鱼新手能听得懂的，还是去找个水域试试店里的鱼竿吧';
    texts[id].text12 = '（学会了生活技能-钓鱼）';
}
//支线任务的文本
function side_quest_text(texts) {
    let id;

    id = 'study_fishing';
    add_text_object(texts, id);
    texts[id].event_name = '学习如何钓鱼';
    id = 'study_mining';
    add_text_object(texts, id);
    texts[id].event_name = '学习如何挖矿';
}

//事件完成条件的文本
function event_finish_condition_text(texts) {
    let id;

    //部分完成条件可以通过id自动组合出文本，可以不用设置了
    // id = 'PKL_DamageType_melee';
    // add_text_object(texts, id);
    // texts[id].condition_name = '近战击杀';
    // id = 'PKL_EnemyId_Training_Dummy';
    // add_text_object(texts, id);
    // texts[id].condition_name = '击杀训练草人';

    id = 'ATD_all_armor';
    add_text_object(texts, id);
    texts[id].condition_name = '4个防具部位都有穿着的情况下受击';
    id = 'DSE_shield_defense';
    add_text_object(texts, id);
    texts[id].condition_name = '使用“盾牌防御”技能抵挡敌人攻击';
    // id = '_shield_defense';
    // add_text_object(texts, id);
    // texts[id].condition_name = '在村内商店里购买鱼竿';
    id = 'EE_VM_woodshop_study_fishing';
    add_text_object(texts, id);
    texts[id].condition_name = '向木工坊老板询问如何钓鱼';
}
//事件完成奖励的文本
function event_finish_reward_text(texts) {
    let id;

    // id = 'ATD_all_armor';
    // add_text_object(texts, id);
    // texts[id].reward_name = '4个防具部位都有穿着的情况下受击';
}
//初始化文本数据库中与游戏事件相关的文本
function init_Text_game_event(texts) {
    //主线任务的文本
    main_quest_text(texts);
    //挑战的文本
    Challenge_text(texts);
    //迷你事件的文本
    mini_event_text(texts);
    //支线任务的文本
    side_quest_text(texts);
    //事件完成条件的文本
    event_finish_condition_text(texts);
}

export { init_Text_game_event };
