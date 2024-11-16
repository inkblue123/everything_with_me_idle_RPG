var chss = new Object();
/*

 @name    : 锅巴汉化 - Web汉化插件
 @author  : 麦子、JAR、小蓝、好阳光的小锅巴
 @version : V0.6.1 - 2019-07-09
 @website : http://www.g8hh.com

*/

//1.汉化杂项
var cnItems = {
    _OTHER_: [],

    //未分类：
    "*Donk* ..It sounds hollow": "*咚* ..听起来是空心的",
    Save: "保存",
    Export: "导出",
    Import: "导入",
    Settings: "设置",
    Achievements: "成就",
    Statistics: "统计",
    Changelog: "更新日志",
    Hotkeys: "快捷键",
    ALL: "全部",
    Default: "默认",
    AUTO: "自动",
    default: "默认",
    Kid: "孩子",
    "Quit daydreaming": "别做白日梦了",
    "∥LOCKED∥": "∥未解锁∥",
    "|Dojo, training area|": "|道场 :: 训练区|",
    Accessory: "配饰",
    Autosave: "自动保存",
    Body: "身体",
    CLR: "清除",
    Clear: "明朗",
    "BG Color": "背景色",
    "BG presets": "背景预设",
    "delete the save": "删除存档",
    "Destroy gradients": "取消渐变",
    night: "夜间",
    Location: "位置",
    LOADING: "加载中",
    Legs: "腿部",
    Head: "头部",
    Shield: "护盾",
    WEP: "武器",
    Weapon: "武器",
    White: "白色",
    special: "特殊",
    settings: "设置",
    save: "保存",
    "Resume the fight": "返回战斗",
    "R Arm": "右臂",
    "L Arm": "左臂",
    "R hand": "右手",
    "L hand": "左手",
    "Message log limit": "消息日志上限",
    Nothing: "空无一人",
    "Nothing here yet": "这里什么都没有",
    OTHER: "其它",
    "Pause next battle": "暂停下一场战斗",
    USE: "杂货",
    "　stop combatlog　": "　停止战斗日志　",
    "　new": "　新",
    '"<= Get up"': '"<= 起床"',
    '"Easiest"': "“休闲”",
    '"Easy"': '"简单"',
    '"Normal"': '"正常"',
    '"Select the difficulty"': '"选择难度"',
    '"You are fighting training dummies"': '"你在和训练假人战斗"',
    "(body": "(身体",
    "(R hand": "(右手",
    "|Your Home, Bed|": "|你的家 :: 床|",
    Monday: "周一",
    load: "加载",
    grey: "灰色",
    "hit chance": "命中率",
    "lvl:1 'Evil'": "等级:1 '邪恶'",
    "lvl:1 'Nobody'": "等级:1 '无名之辈'",
    "m e s s a g e　　　l o g": "消息日志",
    "game not saved!": "游戏未保存！",
    "freeze messagelog　": "冻结消息日志",
    FOD: "食物",
    WPN: "武器",
    "(L hand": "(左手",
    "": "",
    "A Stick": "棍子",
    "Cure Grass": "治愈草",
    EQP: "护甲",
    "Game Saved": "游戏已保存",
    "Grab your stuff and get to it": "拿上东西，开始吧",
    "lvl:1 'Evil ♀'": "等级:1 '邪恶♀'",
    "New item obtained": "获得新物品",
    "saved...": "已保存...",
    "Wooden dummy": "木制假人",
    "Wooden dummy ->": "木制假人 ->",
    "Wooden dummy missed": "木假人未命中",
    You: "你",
    "You ->": "你 ->",
    "You have training to complete": "你还得接着训练",
    "You missed": "你未命中",
    '"A Stick"': '"棍子"',
    Class: "类型",
    "Club/Hammer, Blunt": "球杆/锤子，钝器",
    "Club/Hammer": "球杆/锤",
    "Medicine/Tool": "医药/工具",
    Deletes: "丢弃",
    health: "生命值",
    "Herb with minor healing properties. Has to be processed before use. Can somewhat speed up recovery of tiny cuts and bruises if applied directly":
        "具有较弱的治疗作用的草本植物。需要经过加工后再使用，否则只能一定程度上加快微小伤口的恢复",
    "L arm": "左臂",
    permanently: "，不可逆",
    "R arm": "右臂",
    Rarity: "稀有度",
    "Throw away": "丢弃",
    Restores: "恢复 ",
    "Your favorite weapon!": "你最喜欢的武器！",
    All: "全部",
    Armor: "护甲",
    Comestibles: "杂货",
    Filter: "过滤",
    "Materials/Other": "材料/其他",
    Weapons: "武器",
    "CRIT!": "暴击!",
    "(head": "(头部",
    head: "头部",
    "lvl:1 'Evil ♂'": "等级:1 '邪恶♂'",
    "Material/Misc": "材料/杂项",
    "You have been knocked out...": "你被淘汰了...",
    "Looking at this fills you with bad memories": "它勾起了你痛苦的回忆",
    "Death Badge": "死亡徽章",
    "Awarded by fate for dying. Congratulations": "灾厄的赠礼。恭喜",
    '"<= Go outside"': '"<= 出门"',
    '"Crash down and take a nap"': "“睡觉”",
    '"Examine basement door"': '"检查地下室门"',
    '"Examine Fireplace"': '"检查壁炉"',
    '"Examine your bag"': '"检查你的包"',
    '"Examine your hidden stash"': '"检查房间里藏东西的地方"',
    "|Your Home|": "|家|",
    Foggy: "有雾",
    "Great way to pass time": "打发时间的好方法",
    Sunny: "晴天",
    Wednesday: "周三",
    "Your humble abode. You can rest here.": "你破旧的房间。 可以在这休息。",
    '"<= Step away"': '"<= 离开"',
    '"Idea paper"': '"草稿纸"',
    '"Retrieve spare firewood. You have a feeling you\'ll need it"': '"拿出备用的木柴。你感觉这东西以后会用得到"',
    '"Toss a stick into the fireplace"': '"往壁炉里扔一根棍子"',
    "|Your Home, Fireplace|": "|你的家 :: 壁炉|",
    Bandana: "头巾",
    "Better take this with you": "还是带上它们吧",
    Bread: "面包",
    "Comfy fireplace. You can warm up here if you light it up": "舒适的壁炉。点燃它可以暖暖身子",
    Egg: "鸡蛋",
    "It's locked": "它被锁上了",
    Milk: "牛奶",
    Rice: "大米",
    "Something you've forgotten to grab before. There's a pack of food and some junk idea paper.":
        "之前忘记拿走的东西。有一包食物和几张草稿纸。",
    "Wooden Sword": "木剑",
    Water: "水",
    '"Property Deed"': "“财产契约”",
    '"Throw a stick into the fireplace"': '"往壁炉里扔一根棍子"',
    '"Throw some firewood into the fireplace"': '"往壁炉里扔些柴火"',
    "Comfy fireplace. You'll need fire if you want to get some cooking done":
        "舒适的壁炉。想要烹饪的话可能需要先点上火",
    Firewood: "柴火",
    "Grab the contents": "拿走东西",
    "Woven Wallet": "编织钱包",
    "You have some lying around nearby": "你在旁边找到了几块",
    "You reach for a small red box which you keep your valuables in, it is time to take it out":
        "你摸索到了一个红色的盒子，里面应该有一些贵重的东西，是它们发挥作用的时候了",
    "You notice the fire flickering slightly": "火苗微弱",
    '"Famine"': "“饥荒”",
    "'Famine'": "'饥荒'",
    "Fireplace Aura": "在火焰旁",
    "You're feeling the warmth of the fireplace": "你能感受到火焰的温暖",
    "Allows you to list and examine your possessions": "让你可以查看自己拥有的财产",
    Book: "书",
    "Clean rice grains. Healthy and delicious when cooked, but awful to eat in dry state":
        "洗干净的米粒。煮熟后健康美味，但在那之前实在难以下咽",
    Cloudy: "多云",
    Drizzle: "细雨",
    energy: "能量",
    Food: "食物",
    "Food(": "食物(",
    Never: "否",
    "NEW PERK UNLOCKED": "获得新特效",
    "New Skill Unlocked!": "新技能解锁！",
    Night: "夜晚",
    Overcast: "阴",
    perishable: "易腐烂的",
    "Power potion for your bones": "用于骨骼的力量魔药",
    Rain: "雨天",
    Read: "阅读",
    "Regular drinkable water": "普通的饮用水",
    "Simple loaf of bread, baked with care. It's crunchy and smells nice": "精心烘烤的小面包。香脆可口。",
    "Simple long sword carved from light wood. Easy to handle and is suitable as amateurish training weapon":
        "用轻木雕刻而成的简单长剑。 易于操作，适合作为业余训练武器",
    skills: "技能",
    Sword: "剑",
    "Sword, Blunt": "剑、钝器",
    "Thin cloth bandana. It protects your face from sweat": "薄布头巾。让汗水不再恼人",
    "This is your personal wallet, you received it as a gift": "这是你自己的钱包，它曾是某人送给你的礼物",
    "This old looking legal document indentifies you as a sole owner of this broken down hut you live in. It was passed down to you by your ancestors, you speculate":
        "这份具有法律效力的文件证明了你房主的身份。如果你没猜错的话，这应该是你的祖辈传下来的",
    Thursday: "周四",
    "Tiny scrap of paper with information. You wrote it yourself to remember things.":
        "胡乱涂鸦的小纸片，勉强能让你回想起曾经的灵感。",
    Tried: "尝试",
    "Whole chicken egg, very nutritious": "完整的鸡蛋，富有营养",
    "You can feel coinage inside": "你可以感觉到里面的硬币",
    "You took a sip": "你啜了一口",
    '"=> Check the Message Board"': '"=> 查看留言板"',
    '"=> Approach the cat"': '"=> 接近猫"',
    '"=> Enter Dojo"': '"=> 进入道场"',
    '"=> Enter Southern forest"': '"=> 进入南方森林"',
    '"=> Enter Western Woods"': '"=> 进入西部森林"',
    '"=> Food stand"': '"=> 食品摊"',
    '"=> Go home"': '"=> 回家"',
    "The rain feels surprisingly refreshing": "下雨的感觉出奇的清爽",
    "Village Center": "村中心",
    "Your clothes get soaked": "你的衣服湿透了 ",
    '"=> Shady Kid"': '"=> 阴暗里的孩子"',
    "You have a feeling it might rain soon": "天气很阴，也许过一会有雨",
    '"<= Go back"': '"<= 离开"',
    "Bun with red beans added to it, resulting in rich flavour": "包子里加了红豆，香味浓郁",
    '"<= Return"': '"<= 返回"',
    '"Pet the cat"': '"拍拍猫"',
    "Red Bean Bun": "红豆包子",
    Stormy: "暴风雨",
    "Street Merchant Ran: Welcome! What would you like?": "街头小贩 Ran：欢迎光临！买点什么？",
    "There is a cat.": "有一只猫。",
    "Village Center, Cat": "村中心 :: 猫",
    '"Explore the posts"': "“翻阅帖子”",
    "Village Center, Street Food Stand": "村中心 :: 街头小吃摊",
    "This is an advertisement for woven straw baskets": "这是一个编织草篮的广告",
    "Message Board": "留言板",
    "Village Center, Message Board": "村中心 :: 留言板",
    "You can find jobs or other stuff here": "上面有招聘帖子以及一些其他东西",
    "This is an  advertisement for fresh vegetables": "这是新鲜蔬菜的广告",
    '"Instructor: You got beaten up by an inanimated dummy?! Pay attention to your condition!"':
        '"教官：你被一个无生命的假人殴打了？！注意你的情况！"',
    "|Dojo, lobby|": "|道场，大厅|",
    "Item Acquired": "获得物品",
    "This is an advertisement for carpentery supplies": "这是木工用品的广告",
    'Gate Guard: "It is too dangerous for you to leave at this moment. Come back when you train a bit"':
        "门卫：“你这个时候离开太危险了，训练一下再回来。”",
    'Gate Guard: "Nothing for you to do there. Scram!"': "门卫：“在那里你无事可做。快滚！”",
    "Lunar Phase": "月相",
    "Last Quarter Moon": "上弦月",
    "A single penny, outdated form of currency. For some reason it's still in circulation":
        "一分钱，过时的货币形式。 由于某种原因它仍在流通",
    Dime: "一毛钱",
    "It will take you about": "距离结束大概还需要",
    "minutes to finish": " 分钟",
    Nickel: "镍",
    Penny: "一分钱",
    Quarter: "25美分硬币",
    "Round copper dime. Still shiny": "圆形铜币。 依旧闪亮",
    "Small nickel, outdated form of currency. It was worth much more in the past":
        "小镍币，过时的货币形式。 过去更值钱",
    "Very large coin, made of copper. Not much worth as money, but collected and used by poor blacksmiths for resmelting into tools":
        "非常大的硬币，由铜制成。 不值钱，但被贫穷的铁匠收集并用于重新熔炼成工具",
    "You are reading": "你在阅读",
    "A tiny useless stone, found everywhere. Can be thrown to create distraction":
        "一块无用的小石头，随处可见。 可以扔来分散注意力",
    "Bring money next time": "下次带钱来",
    "Hey, I've got some good stuff for you": "嘿，我有一些好东西给你",
    Pebble: "卵石",
    "Piece of old stale bread covered in mold. Takes courage to eat": "一块被霉菌覆盖的陈旧面包。 吃东西需要勇气",
    "Spoiled Bread": "变质的面包",
    "Sorry you can't afford that!": "对不起，你买不起！",
    "Village Center, Child Trader": "村中心，儿童商人",
    "Training dummy": "训练假人",
    "Training dummy ->": "训练假人 ->",
    "You dry up": "你身上干了",
    "You passed out...": "你昏过去了...",
    legs: "腿部",
    '"Sleeping"': "“睡眠”",
    "The rest of Body": "身体的其余部分",
    "Unremarkable someone trying to find his purpose in life": "寻求生命意义之人",
    "You can't read while sleeping": "你不能在睡觉时阅读",
    "Ability to go by without any sustenance": "能够在没有食物的情况下活下去",
    Alphabetically: "按字母顺序",
    "by Amount": "按数量",
    "by Levels": "按等级",
    "by Type": "按类型",
    "EXP Gain +1%": "经验增益 +1%",
    "Export As File": "导出为文件",
    "Export As Text": "导出为文本",
    Famine: "饥荒",
    "Import As Text": "通过文本导入",
    "Increases health gain during sleep": "增加睡眠时的生命值恢复速度",
    "Increases lower energy effectiveness bonus": "较少地增加能量效率",
    "Load File": "从文件加载",
    LVL: "等级",
    Nobody: "无名之辈",
    "Perks unlocked": "特效",
    "S k i l l　　l i s t": "技能列表",
    '"Bandana"': "“头巾”",
    '"Wooden Sword"': '"木剑"',
    "(legs": "(腿部",
    Dusk: "黄昏",
    Friday: "周五",
    Sleeping: "睡眠",
    "This is an advertisement for smithing orders": "这是铁匠铺的广告",
    Yes: "是",
    yes: "是",
    '"Fighting"': "“战斗”",
    '"Pain Resistance"': '"抗痛性"',
    Skill: "技能",
    "Starry Night": "星夜",
    Saturday: "周六",
    "You put one in your mouth...": "你把一颗放进嘴里...",
    " died": " 死亡了",
    " missed": " 未命中",
    "'Fighting'": "'战斗'",
    Apple: "苹果",
    "Area cleared": "区域已清理",
    "It is too dangerous to read right now": "现在读书太危险了",
    "Juicy red fruit. Makes a fine breakfast if you have nothing else...":
        "多汁的红色水果。 如果你没有别的东西，做一顿美味的早餐......",
    kills: "杀死",
    "lvl:2 'Nobody'": "等级:2 '没人'",
    '"Instructor: Nice job kid! Here\'s the reward for completing the course"': '"教官：干得好！这是完成课程的奖励"',
    '"Instructor: Great job kid! Here\'s the reward for completing the course"': '"教官：干得好！这是完成课程的奖励"',
    '"Instructor: Nice work kid! Here\'s the reward for completing the course"': '"教官：干得好！这是完成课程的奖励"',
    "Strand Of Straw": "稻草绳",
    '"Sandals"': "“凉鞋”",
    "Cheap unremarkable sandals made from light leather. Aren't even that comfortable to wear":
        "由轻质皮革制成的廉价平底凉鞋。 穿起来也不是很舒服",
    Sandals: "凉鞋",
    "This fell out of a dummy when you punched it to death": "当你一拳打死它时，它从一个假人身上掉了下来",
    "You lost consciousness...": "你失去了知觉……",
    "You threw Clay Milk Cap into the distance": "你把粘土奶盖扔到远处",
    "Clay Milk Cap": "粘土奶盖",
    "Milk caps made from packed clay. Children like to play with these": "用粘土制成的奶盖。 孩子们喜欢玩这些",
    Sunday: "周日",
    "The surroundings are flourishing with life, nothing bad can happen": "周围生机勃勃，没有什么不好的事情发生",
    "This is an advertisement for herbal medicine": "这是中草药的广告",
    "Training dummy died": "训练假人死了",
    "You hit Wooden dummy for": "你击中了木制人偶",
    "You hit Straw dummy for": "你击中了稻草人偶",
    "You hit Training dummy for": "你击中了训练假人",
    "'Pain Resistance'": "'抗痛'",
    "'Sword Mastery'": "'剑术精通'",
    '"Stop reading"': '"停止阅读"',
    damage: "伤害",
    "Linen Vest": "亚麻背心",
    "New Title Earned!": "获得新称号！",
    "Training dummy missed": "训练假人未命中",
    "Wood Splint": "木夹板",
    "You're already reading": "你已经在阅读了",
    "Wooden dummy died": "木制假人死了",
    '"Initiate"': '"开始"',
    '"Instructor: Good job kid! Here\'s the reward for completing the course"': '"教官：干得好！这是完成课程的奖励"',
    '"Instructor: Your training is over for today, you did well. As a reward, select one of these skill manuals to practice. The better your understanding, the stronger you will be in battle"':
        "“教官：今天的训练结束了，你做得很好。作为奖励，选择这些技能手册之一进行练习。你的理解越好，你在战斗中就越强大”",
    '"Practitioner Skillbook (Axes)"': '"修行者技能书（斧）"',
    '"Practitioner Skillbook (Hammers)"': '"修行者技能书（锤）"',
    '"Practitioner Skillbook (Knives)"': '"修行者技能书（刀）"',
    '"Practitioner Skillbook (Martial)"': '"修行者技能书（武术）"',
    '"Practitioner Skillbook (Spears)"': '"修行者技能书（矛）"',
    '"Practitioner Skillbook (Swords)"': '"修行者技能书（剑）"',
    '"Destroy more dummies"': "“摧毁更多的假人”",
    '"Dojo infoboard"': '"道场信息板"',
    '"Grab a serving of free food"': "“拿一份免费食物”",
    '"Instructor: Back already?"': '"指导员：回来了吗？"',
    '"Level Advancement"': '"等级提升"',
    '"Turn in dojo gear"': "“道场装备回收”",
    '"Pamphlet"': "“小册子”",
    "P Skillbook (Swords": "P 技能书（剑",
    "Paper Boy: Hey, this is for you!": "纸男孩：嘿，这是给你的！",
    '"<= Return back into lobby"': '"<= 返回大厅 "',
    '"Claim your rewards!"': "“领取你的奖励！”",
    '"Get stronger!"': "“变强！”",
    '"Get your grub at the canteen!"': "“去食堂拿你的食物！”",
    '"Gluttony"': "“饮食”",
    '"Graduate!"': '"毕业了！"',
    '"Instructor: If you put effort into training you will get rewards as long as you are still a disciple of this hall. After every 5 levels you reach, come here and recieve your share! You might get something really useful if you continue to improve your skills"':
        '"教官：只要你努力修炼，只要你还是本堂弟子，就会得到奖励。每升5级，就来这里领取一份吧！继续练下去，说不定会得到真正有用的东西提高你的技能"',
    "\"Instructor: You can return whatever you punched off of dummies and get coin for it, it's dojo's equipment after all. Or you can keep and use for it yourself, the choice is yours\"":
        '"教官：你打出的假人什么的都可以退还给它，它毕竟是道场的装备。或者你可以自己保留和使用，选择权在你手中"',
    '"Measure your power!"': "“衡量你的力量！”",
    '"Return the rags"': "v",
    "*Chow*": "* 周 *",
    "|Dojo, Infoboard|": "| 道场，信息板 |",
    "A little dry but, that will do": "有点干，但没关系",
    "Punch as many as you want": "打多少你想打多少",
    "Pieces of broken training dummies are scattered on the floor": "破碎的训练假人碎片散落在地板上",
    "Useful information regarding dojo is written here. What will you read?":
        "有关 道场 的有用信息写在此处。 你会读什么？",
    "You notice other dojo disciples diligently train": "你注意到其他道场弟子努力训练",
    "Physical Strength": "体力",
    "Power rank": "实力排行",
    Speed: "速度",
    "This is you": "这是你",
    "This was shoved onto you by someone on the streets. Store names, discount prices, hot items... An entire wall of advertisements in tiny letters, to fit as much of it as possible on this piece of paper. It is a good idea to memorize the addresses":
        "这是街上有人推给你的。 商店名称、折扣价、热门商品……一整面小字母的广告墙，在这张纸上尽可能多地放上广告。 记住地址是个好主意",
    "'Literacy'": "'识字'",
    '"Linen Vest"': '"亚麻背心"',
    '"Literacy"': '"识字"',
    '"Sword M"': '"剑术精通"',
    "A small chipped piece of wood. Not very useful by itself": "一小块碎木头。 本身不是很有用",
    Agility: "敏捷",
    "Allows for faster attacks and multihit combos": "允许更快的攻击和多重连击",
    "Current EXP Gain": "当前经验增益",
    "Determines hit/dodge rate": "决定命中率/闪避率",
    "Determines magic damage dealt and received": "决定造成和受到的魔法伤害",
    "Determines physical damage dealt and received": "决定造成和受到的物理伤害",
    "Empty space": "空的空间",
    "Energy Consumption Rate": "能量消耗率",
    "Energy Effectiveness": "能量效率",
    "Energy meter": "能量表",
    "Entry level practitioner skillbook about sword combat": "剑战入门级练功书",
    "EXP Gain Potential": "经验获得潜力",
    Experience: "经验",
    "Fight dummies provided by dojo to improve your physique and weapon skills! Destroy them and grab their stuff, or vanquish thousands for a special reward! The doors of our dojo is open for everyone willing to lead the path of a warrio":
        "对抗道场提供的假人，提升你的体质和武器技能！ 摧毁他们并抢走他们的东西，或者征服数千人以获得特殊奖励！ 我们道场的大门向所有愿意引领勇士之路的人敞开",
    "Growth Potential": "成长潜力",
    "hours to finish": "小时去完成",
    "Influences the effectiveness of your actions, eat a lot to keep it full": "影响你行动的有效性，多吃以保持饱腹感",
    '"Book"': '"书"',
    '"Meditation"': "“冥想”",
    Furniture: "家具",
    "Book which you've already read. It doesn't contain any new useful information":
        "你已经读过的书。 它不包含任何新的有用信息",
    Current: "当前",
    "Furniture Acquired": "收购家具",
    Health: "健康",
    "Mental acuity": "精神敏锐度",
    owned: "拥有",
    no: "否",
    "Physical and combat experience. You'll have to work hard to achieve new heights":
        "体力和战斗经验。 你必须努力工作才能达到新的高度",
    "Physical health points, needed to stay alive. You will probably die if it reaches 0":
        "维持生命所需的身体健康点数。 如果它达到0你可能会死",
    Scrawny: "骨瘦如柴",
    "Use to add to the furniture list": "用于添加到家具列表",
    "You feel terrible. You might want to eat something or you'll end up being nothing more than a skeleton":
        "你感觉很不好。可能你得吃点东西，不然最后比一副骨头架子也多不了什么东西了",
    "Your power position in this realm. The lower the number the stronger you are":
        "你在此区域的实力排行，数字越小代表你越强。",
    "Ability to fight using swords": "使用剑进行战斗的能力",
    "Ability to perform better in a fight": "在战斗中表现更好的能力",
    Fighting: "战斗",
    "Ability to tolerate physical harm": "身体承受伤害的能力",
    Gluttony: "饮食",
    "Improves reading speed": "提高阅读速度",
    Literacy: "识字",
    "Mastery of eating": "精于饮食",
    "SAT +5, HP +5, Gluttony EXP Gain +3%, New Title": "能量 +5，生命值 +5，饮食经验增益 + 3%，新称号",
    "Pain Resistance": "抗痛性",
    Meditation: "冥想",
    "Slightly decreases damage received": "小幅减少受到的伤害",
    "Slightly increases attack power when holding a sword": "持剑时稍微增加攻击力",
    "Slightly increases overall attack power": "小幅提升整体攻击力",
    "Sword M lvl: ": "剑术精通 等级:",
    "Sword Mastery": "剑术精通",
    "The rest of Mind": "心灵的休息",
    "Understanding of meaning behind texts": "理解文本背后的意义",
    '"Boiled Egg"': "“煮鸡蛋”",
    '"Boiled Rice"': " “煮好的饭 ”",
    '"Low-grade Healing Powder"': '"低品疗伤粉"',
    '"Straw Pendant"': '"稻草吊坠"',
    assemble: "工艺",
    "New blueprint unlocked": "解锁新蓝图",
    "! Get in time for your weekly menu!": "！ 及时了解您的每周菜单！",
    '"Give it a try"': "“试一试”",
    "As long as you keep gaining experience and train hard, dojo will provide you with gifts and money! Don't miss out!":
        "只要你不断积累经验并努力训练，道场就会为你提供礼物和金钱！ 不要错过！",
    "Boiled Rice": "煮饭",
    "Boiled Egg": "煮鸡蛋",
    "Fight dummies provided by dojo to improve your physique and weapon skills! Destroy them and grab their stuff, or vanquish thousands for a special reward! The doors of our dojo is open for everyone willing to lead the path of a warrior":
        "对抗道场提供的假人，提升你的体质和武器技能！ 摧毁他们并抢走他们的东西，或者征服数千人以获得特殊奖励！ 我们道场的大门向所有愿意引领勇士之路的人敞开",
    "Free Meals": "免费餐点",
    "Indestructable Dummy": "坚不可摧的假人",
    "Low-grade Healing Powder": "低品疗伤粉",
    "Our generous dojo provides": "我们慷慨的道场提供",
    "Straw Pendant": "稻草吊坠",
    "to every attending low-class disciple every": "给每一个在读的低阶弟子",
    "to measure the power of your fist!": "来衡量你拳头的力量！",
    "Try out punching this": "试试打这个",
    "When you are confident in your skills, try your fist at fighting powerful golems! How much beating can you withstand?":
        "当您对自己的技能充满信心时，请尝试与强大的傀儡战斗！ 你能承受多大的打击？",
    '"Instructor: There\'s nothing I can take from you"': '"教官：我不能从你这里拿走什么"',
    '"Furniture list"': '"家具清单"',
    'A "bed" made from several layers of straw placed onto each other. Extremely itchy and isn\'t much better from sleeping on a rock':
        "用稻草堆成的“床”。扎的你后背疼，也许还不如睡在石头上",
    "Comfy fireplace. You can light it up for various useful means, or just to warm up":
        "舒适的壁炉。点燃以后可以用于各种事情，或者只是暖暖身子",
    Fireplace: "壁炉",
    "Furniture Owned": "家具",
    "Home rating": "房屋评级",
    "Straw Bedding": "稻草被褥",
    "'Gluttony'": "'饮食'",
    "This is an advertisement for bottled water": "这是瓶装水的广告",
    Bandage: "绷带",
    Hands: "手部",
    "Simple handwraps": "简单的裹手",
    "Perfect for morning runs": "晨跑的完美选择",
    "Dojo Pants": "道场裤",
    '"Death"': "“死亡”",
    '"Bandage"': "“绷带”",
    "Ability to cling to your fate": "把握命运的能力",
    Death: "死亡",
    "Reduces energy loss on death": "减少死亡时的能量损失",
    '"Aspiring Ronin"': '"有抱负的浪人"',
    '"Civilian"': "“平民”",
    "1, AGL +1, New Title": "1、敏捷 +1、新称号",
    "Aspiring Ronin": "有抱负的浪人",
    "He's made of wood": "他是木头做的",
    "lvl:4 'Aspiring Ronin'": "",
    "Sword M": "剑术精通",
    "Wooden Knife": "木刀",
    "Watching swordplay of elder swordmasters always fascinated you, yet even trying to hold the sword properly is apparently extremely difficult. You are not the type to give up though":
        "看老剑客的剑法总是让你着迷，但即便是想要好好握剑，显然也是极其困难的。 你不是那种会放弃的人",
    "Lost kid's toy. The relic of many playground battles": "丢了孩子的玩具。 许多游乐场战斗的遗迹",
    "You'll feel chilly without sleeves": "不穿袖子会觉得冷",
    "He's made of straw": "他是稻草做的",
    Knife: "刀",
    "'Knife Mastery'": "'刀法精通'",
    '"Dojo Pants"': '"道场裤"',
    '"Knife M"': '"刀法精通"',
    '"Knife Mastery"': '"刀法精通"',
    '"Small Wood Bundle"': '"小木捆"',
    '"Starving Child"': "“饥饿的孩子”",
    '"Wooden Knife"': '"木刀"',
    "Knife, Blunt": "刀, 钝的",
    "Equipment/Accessories": "装备/配饰",
    "Materials/Misc.": "材料/杂项",
    "Medicine/Tools": "医药/工具",
    "Nearby firesource": "火源",
    output: "产出",
    Prick: "刺",
    "reagents required": "所需材料",
    "Small Wood Bundle": "小木捆",
    "Steamed Rice": "蒸米饭",
    "tools needed": "需要的工具",
    "You found it fun to make little holes in plant leaves and look through them at the Sun. You think this could be morbidly useful in a fight":
        "你发现在植物叶子上打小洞并透过它们看太阳很有趣。 你认为这在战斗中可能非常有用",
    TPE: "类型",
    "Straw Kasa": "草帽",
    "You're too busy fighting": "你太忙于战斗了",
    "A Sando-gasa is made by weaving straw together. Great for boys who are too embarrassed to use a parasol":
        "Sando-gasa是用稻草编织而成的。 非常适合那些不好意思使用遮阳伞的男孩",
    "to max energy": "达到最大能量",
    "You made this yourself!": "这是你自己做的！",
    "Ability to fight using knives and daggers": "使用刀和匕首进行战斗的能力",
    "Knife Mastery": "刀法精通",
    "Slightly increases attack power when holding a knife": "持刀时稍微增加攻击力",
    "1, New Title": "1, 新称号",
    "10, HP +5, New Title": "10, 生命值 +5, 新称号",
    "2, EXP Gain +1%": "2, 经验增益 +1%",
    "13%, SAT +20, HP +40, New Title": "13%, 能量 +20, 生命值 +40, 新称号",
    "2%, AGL +1": "2%, 敏捷 +1",
    "5, HP +5": "5, 生命值 +5",
    "5, HP +5, Gluttony EXP Gain +3%, New Title": "5、生命值+5、饮食经验增加+3%、新称号",
    "Finely crushed cure grass. Used as a base to make weak medicine": "用捣碎的治愈草作为基质配制而成的药，效力有限",
    "Type of dry wood, prepared for easy burning. Useful at camps or during winter":
        "一种干燥过的木头。易燃，在冬天或者营地里能够派上用场",
    '"Accept"': '"同意"',
    '"Instructor: This is a good start, congratulations! Keep working hard!"':
        '"指导员：这是一个好的开始，恭喜！继续努力！"',
    '"Level 5 reward"': '"5级奖励"',
    'copper. How does that sound?"': "铜。 听上去怎么样？”",
    "Hit! Your approximate hand strength is measured in": "打！ 你大概的手部力量是用",
    "Low-grade Spirit Pill": "下品灵丹",
    "Punch! Your approximate hand strength is measured in": "冲！ 你大概的手部力量是用",
    "Slap! Your approximate hand strength is measured in": "拍！ 你大概的手部力量是用",
    "Wham! Your approximate hand strength is measured in": "哇！ 你大概的手部力量是用",
    "You're out in the forest. You can hunt here": "你在森林里。 你可以在这里打猎",
    "You have been poisoned!": "你中毒了！",
    "You -> x2(": "你 -> x2(",
    "While coal is not easy to obtain around here, good burnable wood is always in demand. Your job this time is to collect and bring about 10 bundles of firewood, keep an eye out while you're strolling out in the forest. Your deed will help the villagers, and you will get something out of it as well":
        "虽然这里的煤炭并不容易获得，但优质的可燃木材总是很受欢迎。 这次你的工作是收集并带来大约10捆木柴，在森林漫步时留意。 你的行为会帮助村民，你也会从中得到一些东西",
    "Western Woods, The Wooden Gate": "西部森林，木门",
    "stabs you with something rusty": "用生锈的东西刺伤你",
    "Hm? Your face is unfamiliar. Might be your first time around here I take it? These are the Western Woods, or simply the western part of the forest. Spots here are very meek and mild on danger and resources, it is perfect for newbies like you. You are free to come and hunt as much as you like. Consider doing some of the available jobs while you're at it. Won't pay much, but you can be of help to the people.":
        "嗯？ 你的脸很陌生。 可能是你第一次来这里我接受它？ 这些是西部森林，或者干脆就是森林的西部。 这里的景点对危险和资源非常温和，非常适合像你这样的新手。 您可以随意来打猎。 当你在做一些可用的工作时，考虑一下。 不会付出太多，但你可以帮助人们。",
    "Here is what's available, take a look": "这是可用的，看看",
    "Head Hunter Yamato": "猎头大和",
    "Hack! Your approximate hand strength is measured in": "嗨！ 你大概的手部力量是用",
    "Delicious!": "美味！",
    "|Western Woods, Hunter's Lodge|": "|西部森林，猎人小屋|",
    '"Tell me something"': '"告诉我一件事"',
    '"Refuse"': "“拒绝”",
    '"Hunting for meat"': '"狩猎肉类"',
    '"Firewood gathering"': '"柴火聚会"',
    '"=> Enter the Hunter\'s lodge"': '"=> 进入猎人小屋"',
    '"=> Delve inside the forest"': '"=> 深入森林"',
    '"<= Return back"': '"<= 返回"',
    '"<= Exit"': '"<= 退出"',
    '"!Ask about the jobs"': '"！询问工作"',
    "A - Continental Threat": "A - 大陆威胁",
    "B - National Crisis": "B - 国家危机",
    "Beasts are your usual, normal wildlife like wolves, slimes, mimics, or prone to being evil Demihumans with low intelligence and high level of aggression like ogres, harpies, minotaurs. While animals are dumb, never underestimate a wild beast. With their thick skin and natural weapons like fangs and claws, they pose a major threat when driven into a desperate state. Fire works very well against the most, especially those with fur and feathers, keep that in mind next time you go hunting":
        "野兽是你平常的、正常的野生动物，如狼、史莱姆、模仿者，或者容易成为低智商和高侵略性的邪恶亚人，如食人魔、鹰身人、牛头怪。 虽然动物很笨，但永远不要低估野兽。 凭借厚厚的皮肤和尖牙利爪等天生武器，当他们被逼入绝境时会构成重大威胁。 火对大多数人都很有效，尤其是那些有毛皮和羽毛的人，下次去打猎时请记住这一点",
    "Beings that are artificially made or existences who are inherently evil, can be classified as such. Demons, imps, golems, possessed weapons and armor, gremlins, devils and much of anything else that comes out from the Underworld. They are extremely dangerous and seek destruction all that they come across":
        "人工制造的存在或本质上邪恶的存在，可以归类为此类。 恶魔、小鬼、傀儡、拥有的武器和盔甲、小鬼、恶魔以及来自冥界的任何其他东西。 他们非常危险，遇到的一切都寻求破坏",
    "D - Townside Crisis": "D - 城镇危机",
    "C - Citywide Crisis": "C - 全市危机",
    "Dragons are legendary creatures that possess evil and cunning intellect. Through some unknown means many dragons in ancient times were reduced to subspecies of wyverns and wyrms, or outright bastard draconids like lizardmen, and other beings with Dragon bloodline. The power of said bloodline grants them superior defence against magic and energy abilities, their physical toughness is also no joke":
        "龙是传说中的生物，拥有邪恶和狡猾的智慧。 通过某种未知的方式，古代的许多龙被降级为双足飞龙和巨龙的亚种，或者像蜥蜴人这样的混蛋龙类，以及其他具有龙血统的生物。 血脉之力，赋予了他们对魔法和能量能力的超强防御，他们的身体韧性也不是开玩笑",
    "E - Village Crisis": "E - 村庄危机",
    "F - Can be dealth with by male adults": "F - 可以由男性成年人处理",
    "G - Can be dealth with by able people": "G - 可以由有能力的人处理",
    "Grants +500 EXP": "授予 +500 经验",
    "Great! I will be awaiting your return": "伟大的！ 我会等待你的归来",
    "Human, Beast, Undead, Evil, Phantom, Dragon": "人、兽、亡灵、邪恶、幻影、龙",
    "Humans and Demihumans fall into the same class. People like you and me, beastmen, orcs, goblins... Mostly creatures intelligent enough to walk on their two, use tools, form societies, make settlements, trade and speak on their own violition. You will encounter and perhaps fight them as bandits, criminals, members of the opposing factions and armies, whoever you disagree with. Always be on your guard, humanoids are cunning and skilled, versatile and very adaptive. Yet, they have mushy bodies. One correct strike and you get an advantage":
        "人类和亚人属于同一阶级。 像你我这样的人，野兽人、兽人、地精……大多数是足够聪明的生物，它们可以在两个人的基础上行走，使用工具，组建社会，建立定居点，贸易和说话。 您会遇到并可能以土匪、罪犯、敌对派系和军队成员的身份与他们战斗，无论您不同意谁。 时刻保持警惕，类人生物狡猾而熟练，多才多艺且适应性强。 然而，他们有糊状的身体。 一次正确击球，您将获得优势",
    "If you find your task too difficult, go back to the training grounds": "如果你觉得你的任务太难了，回到训练场",
    "If you want to survive, you will need to eat. Prove that you can handle yourself in the wilderness by hunting down wildlife. 10 piece of fresh meat should be enough, bring them to me for the evaluation":
        "如果你想生存，你就需要吃饭。 证明您可以通过猎杀野生动物在荒野中应付自如。 10块鲜肉就够了，拿来给我评估",
    "Monsters, you say? There are many and they are around, terrorizing peaceful folk in the outside world. Our remote parts don't see much of that, these lands are tame. Not without dangers, of course, you meet a wild boar in the forest - a single wrong move and its tusks are in your guts and that is it, end of the fool. Or those pesky slimes, while don't look menacing and pose little danger, they sometimes gather and destroy the fields by melting crops and soil. We have it good but starvation is worse than any monster, at times. *cough* anyway, anything living and non-living you meet can be separated into 6 categories":
        "怪物，你说？ 有很多，他们就在身边，恐吓外面世界和平的人们。 我们的偏远地区很少看到这些，这些土地很温顺。 当然，并非没有危险，您在森林中遇到了一只野猪——一个错误的举动，它的象牙在你的胆子里，就是这样，傻瓜的结局。 或者那些讨厌的史莱姆，虽然看起来并不可怕，也不构成什么危险，但它们有时会通过融化庄稼和土壤来聚集和破坏田地。 我们有它，但饥饿有时比任何怪物都更糟糕。 *咳嗽*无论如何，你遇到的任何生物和非生物都可以分为6类",
    "Quest accepted": "接受任务",
    "No money - no goods! Don't waste my time!": "没钱——没货！ 不要浪费我的时间！",
    "Ranking is a way to separate monsters by their relative danger level, they go as following":
        "排名是一种根据怪物的相对危险等级来区分怪物的方法，它们如下",
    "S - Global Crisis": "S - 全球危机",
    "So you want something from the hidden stash, huh? Good eye! You are one of the dojo runts, I've got just what someone like you needs. One book, 3 silver":
        "所以你想从隐藏的藏匿处拿东西，是吗？ 好眼力！ 你是道场中的一员，我有像你这样的人需要的东西。 一本书，3银",
    "Souls of the dead, ethereal beings, manifestations of powers or other apparitions can all be called Phantoms. They take forms of wisp and sprites, benevolent or twisted elementals or spirits and wraiths that terrorize the living. They are difficult or sometimes outright impossible to hurt using normal physical means, magic or exorcism would be a preferred way of dealing with such enemies":
        "死者的灵魂，空灵的存在，力量的体现或其他幻影都可以称为幻影。 它们以精灵和精灵的形式出现，仁慈或扭曲的元素或精神和幽灵使生者感到恐惧。 使用正常的物理手段很难或有时完全不可能伤害它们，魔法或驱魔将是对付此类敌人的首选方式",
    "SS - World Disaster": "SS - 世界灾难",
    "SSS - Universal Calamity": "SSS - 普遍灾难",
    "The smell of beef jerky assaults your nose": "牛肉干的香味扑鼻而来",
    "Tiny cheap spirit pill, made from condensed Ki. Lowest type, given to weak people and children to nourish their bodies.":
        "小巧廉价的灵丹，由气凝聚而成。 最低的类型，给虚弱的人和孩子以滋养他们的身体。",
    "Undead, as you could already tell, are living dead. Reanimated remains of humans and beasts by the influence of natural forces or a skilled necromancer. Even if they completely lack intelligence and wander around aimlessly, controlled bodies of the dead get strenghtened by Dark magic and gain unnatural resilience and power as a result. It doesn't prevent them from being hurt by fire or Holy powers, hovewer. You can deal with lesser fragile skeletal beings quickly if you bash them with something blunt":
        "正如您已经知道的那样，不死生物正在死去。 在自然力量或熟练的死灵法师的影响下复活的人类和野兽的遗骸。 即使他们完全缺乏智慧，漫无目的地四处游荡，被控制的死者尸体也会被黑暗魔法强化，并因此获得不自然的弹性和力量。 但是，这并不能阻止他们受到火或神圣力量的伤害。 如果您用钝器猛击它们，您可以快速处理较不脆弱的骨骼生物",
    "We haven't experienced anything stronger than the E rank in all history of our village. Whatever is above the A rank is completely unheard of, and only partially mentioned in ancient texts. That's the realm of gods, world destroyers and higher beings that our mortal souls are unlikely to ever face":
        "在我们村的所有历史中，我们还没有经历过比E级更强的事情。 任何高于A级的都是闻所未闻的，在古代文本中也只是部分提及。 那是我们凡人的灵魂不可能面对的神界、世界毁灭者和高等生物的领域",
    "What do you want to ask, kid? Want to know how to butcher a carcass? Khahhahhah! *cough*":
        "你想问什么，孩子？ 想知道如何屠宰尸体吗？ 哈哈哈哈！ *咳嗽*",
    "You notice head hunter maintaining his hunting gear": "你注意到猎头在维护他的狩猎装备",
    "You see a variety of bows and other hunting tools arranged on the table and hanging from the walls":
        "你看到桌子上摆放着各种弓箭和其他狩猎工具，挂在墙上",
    ". So, watcha say?": ". 那么，怎么说呢？",
    '"<= Nah"': '"<= 好吧"',
    '"♪La, laaaah, la, la-la. Lah, la-la,la la....♪"': '"♪ 啦，啦啦啦啦啦，啦，啦啦啦啦啦...♪"',
    '"About Beasts"': '"关于野兽"',
    '"About Dragons"': '"关于龙"',
    '"About Evil"': '"关于邪恶"',
    '"About Humans"': "“关于人类”",
    '"About monsters"': '"关于怪物"',
    '"About Phantoms"': '"关于幻影"',
    '"About Undead"': '"关于亡灵"',
    '"Firewood Gathering"': '"柴火聚会"',
    '"First Hunt"': '"第一次狩猎"',
    '"Oh my! Such pretty flowers♪"': "“天啊！好漂亮的花♪”",
    '"Give me"': "“给我”",
    '"Straw Basket"': '"草篮"',
    '"Show me something better"': '"给我看更好的东西"',
    '"What are monster ranks?"': "“什么是怪物等级？”",
    "Straw Basket": "草篮",
    "That was good!": "那太好了！",
    "Green Slime": "绿色史莱姆",
    Illiterate: "文盲",
    "Small woven basket. For storing stuff in": "小编织篮。 用于存放东西",
    Ouch: "哎哟",
    "The woods are silent": "树林静悄悄",
    "Western Woods, The Yellow Path": "西部森林，黄色小径",
    '"=> Visit Marketplace"': '"=> 访问市场"',
    '"<= Return back to the village Center"': '"<=返回村中心"',
    '"<= Walk away"': '"<= 离开"',
    '"General Store =>"': '"综合商店 =>"',
    '"Grocery Shop =>"': '"杂货店 =>"',
    '"Nervous Guy =>"': '"神经质的家伙 =>"',
    '"Purchase"': '"购买"',
    "|Marketplace, Grocery Shop|": "|市场、杂货店|",
    "|Marketplace, Shabby General Store|": "|市场，破旧的综合商店|",
    "A length of sturdy rope, for tying things up": "一根结实的绳子，用来绑东西",
    "A poor quality swatch of cloth. Unstitches when you so much as breathe on it":
        "劣质布样。 当你呼吸到它的时候就解开缝线",
    "A small quantity of thread that could be used in sewing and tailoring projects": "少量可用于缝纫和裁缝项目的线",
    "Argh, what am I gonna do now! How could this... Uh? S-sorry, can't talk right now, please leave me be. Ahh damn it...\"":
        "啊，我现在该怎么办！ 这怎么可能……呃？ S-对不起，现在不能说话，请让我呆着。 啊该死的……”",
    "Barely reached the standard, maybe you should keep it for longer": "勉强达到标准，也许你应该保持更长时间",
    "Cheap massproduced tableware carved from wood. Kind of a pain to wash": "廉价的大量生产的木雕餐具。 洗起来有点痛",
    "Cheap Cloth": "廉价布料",
    "General Store": "综合商店",
    "Gluttony EXP gain +5": "饮食经验增益 +5",
    "Marketplace, Stalls": "市场, 摊位",
    "Grocery Shop": "杂货店",
    "Nervous Guy": "紧张的家伙",
    "Old Lady: Freshest vegetables for the lowest price!": "老太太：最新鲜的蔬菜，最低的价格！",
    "Old Lady: These are very fresh, buy some!": "老太太：这些很新鲜，买一些吧！",
    "Old Lady: Try a few and you'll want even more!": "老太太：尝试一些，你会想要更多！",
    "One-year Wine": "一年酒",
    Onion: "洋葱",
    "Raw wheat. While not very tasty, powder made out of them is the main ingredient in breadmaking":
        "生小麦。 虽然不是很好吃，但用它们制成的粉末是面包制作的主要成分",
    "Rock salt crushed into tiny crystals. Yuck! You surely wouldn't want to eat this. It's good for preserving perishable foods and cooking, though":
        "岩盐粉碎成微小的晶体。 糟糕！ 你肯定不想吃这个。 不过，它有利于保存易腐烂的食物和烹饪",
    Rope: "绳子",
    Salt: "盐",
    "Sleeping Old Man: ...": "沉睡的老人：...",
    "Sleeping Old Man: zzz...": "沉睡的老人：zzz...",
    "Tailoring quality": "剪裁质量",
    "The man then proceeds to fidget in unrest": "该男子随后在不安中坐立不安",
    "The marketplace feels busy": "市场感觉很忙",
    Thread: "线",
    "Vegetable cultivated since ancient times. Enhances the dish in various ways, also makes you cry":
        "自古栽培的蔬菜。 以各种方式增强菜肴，也让你哭泣",
    "Very primitive needle crafted from tough wood. Despite its simplicity, the craftsmanship is quiet nice":
        "用坚韧的木头制成的非常原始的针。 尽管它很简单，但工艺却很安静",
    "Village Center, Marketplace": "村中心、市场",
    Wheat: "小麦",
    "Wooden Needle": "木针",
    "Wooden Tableware": "木制餐具",
    "This is an advertisement for farming equipment": "这是农业设备的广告",
    Tuesday: "周二",
    "went bad!": "变坏了！",
    Your: "你的",
    "Your stomach bothers you": "你的胃让你烦恼",
    "Ability to absorb Air Ki and assimilate it within your body": "能够吸收气气并将其吸收到体内",
    "Air Absorption": "空气吸收",
    "Provides minor protection from air-based attacks": "对空中攻击提供轻微的保护",
    '"Can I tag along? I won\'t be a bother♪"': "“我可以跟着吗？我不会打扰的♪”",
    "Blunt Sword": "钝剑",
    "Crude planks cobbled together to form a container for a matress or such. Not a whole lot in terms of sleeping place, but somewhat better than a hard cold floor":
        "粗木板拼凑在一起，形成一个用于放置床垫等的容器。 睡觉的地方不是很多，但比硬冷的地板好一些",
    "Plain Bed": "普通床",
    "Rain Cap": "雨帽",
    "Rain Shoes": "雨鞋",
    "Simple shoes made from tree rubber. Sturdy and longlasting, they protect one's toes from cold":
        "由树胶制成的简单鞋子。 坚固耐用，保护脚趾免受寒冷",
    "The cap with the wide brim for keeping the rain from the wearer's eyes": "宽檐帽可防止雨水进入佩戴者的眼睛",
    "This is the blunt sword used as a bad example of a knife in demonstration sales for housewives. Good luck trying to cut onions with this":
        "这是在家庭主妇的示范销售中用作刀的坏例子的钝剑。 祝你用这个切洋葱好运",
    Wastebread: "面包屑",
    "When flour becomes a commodity to deal with, wayfarers and the poor resort to mix it with leftovers of other ingredients and bake it all into bread":
        "当面粉成为一种需要处理的商品时，流浪者和穷人将其与其他成分的剩菜混合，然后全部烤成面包",
    "You have a really difficult time understanding even the basic writings. Even the signs outside the shops give you trouble":
        "即使是基本的著作，你也很难理解。 连店外的招牌都给你添麻烦",
    "Sleeping Old Man: ...Welcome": "沉睡的老人：......欢迎",
    "This is a warning to stay away from fortune tellers": "这是远离算命先生的警告",
    "Sleeping Old Man: Take your time": "沉睡的老人：慢慢来",
    "Watery leaves, usually used in salads": "水汪汪的叶子，通常用于沙拉",
    Lettuce: "生菜",
    '"Eat flowers evil-doer!♪"': '"吃花坏人！♪"',
    '"...deal!..."': "“...成交！...”",
    "10, HP +5, Survival EXP Gain +5%": "10、生命值+5、生存经验获得+5%",
    "2%, New Title": "2%, 新称号",
    "Green Slime": "绿色史莱姆",
    "Blue Slime": "蓝色史莱姆",
    Blue: "蓝色",
    Green: "绿色",
    "Can't see a meter in front of you with all this fog": "迷雾重重，看不到你面前的一米",
    "It doesn't seem very sturdy": "看起来不是很坚固",
    "Wild Rabbit": "野兔",
    "Wild Rabbit ->": "野兔 ->",
    "Wild Rabbit -> x2(": "野兔 -> x2(",
    '"...check for yourself then..."': '"...然后自己检查一下..."',
    "We're restocking, step out for a minute": "我们正在补货，出去一会儿",
    "Ability to evaluate your choices": "评估您的选择的能力",
    Judgement: "判断",
    "Rainy Night": "雨夜",
    '"...is this real?..."': "“...这是真的吗？...”",
    '"...never seen this thing..."': '"...从没见过这个东西..."',
    '"...right, I\'ll take 10, put them in..."': '"...对了，我取10个，放进去..."',
    '"...this isn\'t even fresh!..."': '"...这甚至都不新鲜！..."',
    '"...whatever, I\'m not buying..."': '"...无论如何，我不买..."',
    '"...who said so? Gotta be a lie..."': '"......谁说的？一定是谎言......"',
    '"Judgement"': "“判断”",
    '"All the children must return home by 8PM!"': "“所有孩子必须在晚上8点前回家！”",
    '"If you do not work your hours daily, you will not get any dessert"': "“如果你每天不加班，你就得不到任何甜点”",
    "There is a section of useless gossip": "有一段没用的八卦",
    "This is an advertisement for cooking courses": "这是烹饪课程的广告",
    "This is an advertisement for dried meat": "这是干肉的广告",
    "This is an advertisement for knitting advices": "这是针织建议的广告",
    "This is an advertisement for wine kegs": "这是一个酒桶广告",
    Duration: "持续时间",
    Sleep: "睡觉",
    "You are fast asleep": "你睡得很熟",
    Charcoal: "木炭",
    "Coal made from carefuly burning quality wood for lengths of time. This coal cinders for a very long time":
        "由精心燃烧的优质木材制成的煤炭，可长时间燃烧。 这煤渣很长一段时间",
    "Sleeping Old Man: A customer? Pick what you want": "沉睡的老人：顾客？ 选择你想要的",
    "1, Toughness EXP Gain +3": "1、韧性经验增益+3",
    "Plain round bun, very soft and filling": "纯圆的包子，非常柔软和有馅",
    "Steamed Bun": "包子",
    "You're drenched in water": "你被水淋湿了",
    Wet: "潮湿",
    "[Spring]": "[春]",
    ") for": ") ",
    "Tasty!": "可口！",
    "Wild Rabbit died": "野兔死了",
    '"Water Absorption"': '"吸水"',
    "Ability to absorb Water Ki and assimilate it within your body": "能够吸收水气并在体内同化",
    "Provides minor protection from water-based attacks": "对水基攻击提供轻微保护",
    "Reduces energy loss when wet": "减少潮湿时的能量损失",
    "Water Absorption": "吸水",
    "Water Absorption lvl: ": "吸水等级：",
    '"Sharp Eye"': '"锐眼"',
    "Hard/soft-boiled egg, you aren't sure. Will fill you up either way":
        "你不太确定这是全熟还是半熟煮鸡蛋，但是总之能让你吃饱",
    "Rotten Onigiri": "乐天饭团",
    "This riceball has gone bad. You normally wouldn't eat this, but when you run out of food even this looks delicious":
        "这个饭团坏了。 你通常不会吃这个，但当你没有食物时，即使这个看起来也很好吃",
    "'Meditation'": "'冥想'",
    "A pungent garlic, popular as a seasoning for its strong flavor":
        "一种辛辣的大蒜，因其浓郁的味道而作为调味品而广受欢迎",
    "Ability to notice weak points": "发现弱点的能力",
    "Long piece of wood with a sharp metal chunk at the end of it. Couldn't get simpler than that":
        "一根长木头，末端有一块锋利的金属块。 没有比这更简单的了",
    Garlic: "大蒜",
    "New Moon": "新月",
    "Sharp Eye": "锐眼",
    "Slightly increases critical probability": "略微增加临界概率",
    Spear: "矛",
    "Spear/Polearm": "矛/长柄武器",
    "Spear/Polearm, Piercing": "矛/长柄武器，穿刺",
    '"...I won\'t lower it further!..."': '"......我不会再降低它了！......"',
    "1, Toughness EXP Gain +3%": "1、坚韧经验获得+3%",
    "Ability to walk": "步行能力",
    actions: "动作",
    Storm: "风暴",
    Sunrise: "日出",
    Walking: "步行",
    "You learned a new action": "你学会了一个新动作",
    "'Sleeping'": "'睡觉'",
    '"Run"': "“跑”",
    '"Walking"': '"不行"',
    "Energy Consumption +0.1": "能耗 +0.1",
    "A c t i o n　　l i s t": "动作列表",
    Run: "跑",
    "Run within this area to improve your physique": "在该区域内跑步以改善您的体质",
    "This isn't the best place to run around": "这不是跑来跑去的最佳场所",
    "Trains Walking": "训练步行",
    "You start running": "你开始跑步",
    "You stop": "你停下了",
    Running: "跑步中",
    "You're jogging": "你在慢跑",
    "'Walking'": "'步行'",
    '"Walker"': '"步行者"',
    "5, New Title": "5, 新称号",
    "All this walking around feels very beneficial for your body": "所有这些走动感觉对你的身体非常有益",
    "Running consumes 5% less energy": "跑步消耗的能量减少 5%",
    "talent effect": "天赋效应",
    Walker: "步行者",
    "Tiny shield that is supposed to be strapped onto an arm. Low defence, but provides high mobility":
        "应该绑在手臂上的小盾牌。 低防御，但提供高机动性",
    "Toughness EXP Gain +10%, STR +1, SAT +10, EXP Gain +3%, STR Training Potential +3%":
        "韧性 经验 增益 +10%，力量 +1，体力 +10，经验 增益 +3%，力量 训练潜力 +3%",
    Tunic: "束腰外衣",
    "narmed Mastery": "武装精通",
    War: "战争",
    "Wearable ornament in the shape of a sword. Even if ranking the lowest, it serves as a proof of one's affiliation with dojo and martial arts in general":
        "剑形的可穿戴装饰品。 即使排名最低，也可以作为证明自己与道场和武术有渊源的证据",
    "Weakest healing potion you can possibly find. Nearly useless for actual healing, but can act as a headache reliever":
        "你能找到的最弱的治疗药水。 对实际治疗几乎无用，但可以起到缓解头痛的作用",
    "Wide selection of various edible berries collected from the forest": "从森林中收集的各种可食用浆果",
    "Wild Berries": "野生浆果",
    "Wood Effigy": "木雕",
    '"Book of Fairy Tales"': '"童话书"',
    '"Checkpoint"': '"检查站"',
    '"First Aid Manual"': '"急救手册"',
    '"Herbalist =>"': '"草药师 =>"',
    '"Street Fighting"': "“巷战”",
    '"Sweet purchase!"': "“甜蜜的购买！”",
    '"There ya go, enjoy"': "“你去吧，享受”",
    "|Marketplace, Herbalist|": "|市场，草药师|",
    "1, Pierce DEF +1, New Title": "1、穿刺防御+1，新称号",
    "12, EXP Gain +3%, HP Training Potential +3%": "12、经验增益+3%，生命值训练潜力+3%",
    "12, Pain Resistance EXP Gain +2%": "12、抗痛性经验增益+2%",
    "3%, Pain Resistance EXP Gain +1%": "3%, 抗痛性 经验 增益 +1%",
    "A basic stone bowl and a pounder used to mince and crush herbs, seeds, bones and other pharmaceutical oddities":
        "一个基本的石碗和一个捣碎器，用于切碎和压碎草药、种子、骨头和其他药品",
    "A handful of acorns, still in their shells. Squirrels like them, but they're not very good for you to eat in this state":
        "一把橡子，还在壳里。松鼠喜欢它们，但它们在这种状态下不太适合你吃",
    "A simple, short-sleeved shirt. It's somewhat short in length and tailored to snugly fit the wearer's body":
        "一件简单的短袖衬衫。它的长度略短，并量身定制以紧贴佩戴者的身体",
    "A very long bread": "一个很长的面包",
    "Ability to detect and avoid danger": "发现和避免危险的能力",
    "Ability to fight using blunt weaponry": "使用钝器进行战斗的能力",
    "Ability to fight using polearms and lances": "使用长矛和长矛进行战斗的能力",
    "Ability to safely digest dangerous food": "能够安全地消化危险食物",
    "Ability to use shields better": "能够更好地使用盾牌",
    Acorn: "橡子",
    "Alchemical vessel used for distilling, important for vapor separation": "用于蒸馏的炼金容器，对蒸汽分离很重要",
    "Alchemy EXP gain +10": "炼金经验增益 +10",
    "Alchemy EXP gain +5": "炼金经验获得+5",
    "Alchemy quality": "炼金品质",
    "All masteries EXP Gain +10": "所有专精经验获得 +10",
    "Alliviates food poisoning": "缓解食物中毒",
    "An amusing collection of folklore featuring the usual cast of fairies and demons":
        "一个有趣的民间传说集合，以通常的仙女和恶魔为特色",
    "Any sharp tool": "任何锋利的工具",
    Baguette: "法国面包",
    "Beef Jerky": "牛肉干",
    "Brittle bone of some animal": "一些动物的脆骨",
    Buckler: "圆盾",
    "Bundle of certain common herbs, mixed together. Tastes incredibly bitter, but helps to detoxify blood from containments":
        "某些常见草药的捆绑，混合在一起。味道令人难以置信的苦，但有助于从容器中解毒血液",
    Carrot: "萝卜",
    "Clear blob of slime. Used in elementary alchemy to make adhesives. Also acts as a base for some potions":
        "清除一团粘液。在初级炼金术中用于制造粘合剂。也可作为某些药水的基础",
    Dagger: "匕首",
    "Danger Sense": "危险意识",
    "Energy Effectiveness +1%, New Title": "能量效率 +1%，新称号",
    "Fake Sword": "假剑",
    "Grants +2500 EXP": "授予 +2500 经验",
    "Grants invulnerability to poisons for a few hours": "使毒药在几个小时内无敌",
    "Hammer Mastery": "锤子精通",
    "Healing potion with weak healing powers. It is usually used by commoners as first aid before deciding whether to go see a doctor or not":
        "治疗力较弱的治疗药水。通常被平民在决定是否去看医生之前作为急救使用",
    "Healing Stew": "治愈炖肉",
    "Herbal Antidote": "草本解毒剂",
    Herbalist: "草药师",
    "Herbalist: Don't neglect your well being, stack on anything you will need":
        "草药师：不要忽视您的健康，多吃您需要的任何东西",
    "Herbalist: Injured? Come in, I'll give you a check up": "草药师：受伤了？进来我给你检查",
    Jelly: "果冻",
    "Knife, Edged": "刀，有边",
    "Lesser Healing Potion": "次级治疗药水",
    "Long stick with a sharpened end. Watch out, you may hurt someone with it":
        "末端锋利的长棍。小心，你可能会用它伤害别人",
    "LUCK +1": "运气+1",
    "lvl:14 'Jogger'": "lvl:14 '慢跑者'",
    "Makes animals love you": "让动物喜欢你",
    "Mastery of destruction and military tactics": "掌握破坏和军事战术",
    "Mastery of petting animals": "掌握抚摸动物",
    "Mastery of unarmed combat": "掌握徒手格斗",
    "Mid-grade Spirit Pill": "中品灵丹",
    "Minor Healing Potion": "初级治疗药水",
    "Mixture of ginger, bittervine,  and other herbs. Destroys toxins in one's body":
        "姜、苦藤和其他草药的混合物。清除体内毒素",
    "Mortar and Pestle": "研钵和研杵",
    "Neautralizes the effects of weak poisons": "中和弱毒的效果",
    "Old worthless blade, forgotten for ages. It falls apart as you attempt to swing it":
        "旧的毫无价值的刀片，被遗忘了多年。当你试图摆动它时它会崩溃",
    Patting: "拍拍",
    "Patting lvl: 5": "拍拍等级：5",
    "Poison Ward": "中毒病房",
    "Polearm M lvl: 5": "长柄武器等级：5",
    "Polearm Mastery": "长柄武器精通",
    "Raw Meat": "生肉",
    "Reduces energy loss from food poisoning": "减少食物中毒造成的能量损失",
    Retort: "反驳",
    "Roasted Meat": "烤肉",
    "Rusty Katana": "生锈的武士刀",
    "Rusty Key": "生锈的钥匙",
    "Scummy old key. You can open your basement with it": "肮脏的旧钥匙。你可以用它打开你的地下室",
    "Sharpened Stick": "削尖的棍子",
    "Shield Mastery": "盾牌精通",
    "Should you really be eating this stuff?": "你真的应该吃这些东西吗？",
    "Simple knife used by wayfarers. Not a combat weapon, has a minor domestic use":
        "徒步旅行者使用的简单刀。不是作战武器，在国内有少量使用",
    "Slightly decreases critical damage received": "略微降低受到的暴击伤害",
    "Slightly increases attack power when fighting unarmed": "徒手战斗时稍微增加攻击力",
    "Slightly increases attack power when holding a club/hammer": "持有棍棒/锤子时略微增加攻击力",
    "Slightly increases attack power when holding a spear/polearm": "手持长矛/长柄武器时略微增加攻击力",
    "Slightly increases crit damage": "略微增加暴击伤害",
    Slime: "粘液",
    "Small Bone": "小骨头",
    "Small cheap spirit pill, made from condensed Ki. Developed to help young martial artists to go through their training":
        "小巧廉价的灵丹，由气凝聚而成。旨在帮助年轻的武术家完成他们的训练",
    "Solution developed to protect residents from diseases during times of plague":
        "开发解决方案以在鼠疫期间保护居民免受疾病侵害",
    "Stomach Medicine": "胃药",
    "Straw Effigy": "稻草人像",
    Survival: "生存",
    "Sword Medal": "剑勋章",
    "Sword, Edged": "剑，刃",
    "The sword is made of bamboo. Poorer ronin sometimes pretend to be full-fledged samurai with this":
        "剑是竹制的。可怜的浪人有时会用这个假装是成熟的武士",
    "This is a well illustrated fairy tale about a war between the birds and the beasts, with particulars on the wartime conduct and eventual fate of the bat.":
        "这是一个关于鸟与野兽之间战争的精美童话故事，详细介绍了蝙蝠的战时行为和最终命运。",
    "Tiny red pocket-sized guide to emergency care, covers basic bandaging and wound treating":
        "红色袖珍版急救护理指南，涵盖基本的包扎和伤口治疗",
    '"...mama!!..."': '"...妈妈!!..."',
    '"<= Escape"': '"<= 逃脱"',
    '"Challenge a dangerous opponent"': '"挑战一个危险的对手"',
    '"Check on Cat"': '"查看猫"',
    '"Decline"': "“拒绝”",
    '"Enter the basement"': '"进入地下室"',
    '"Pet Cat"': "“拍拍猫”",
    '"Rename"': '"重命名"',
    '"You are facing a golem"': '"你面对的是一个傀儡"',
    "| Color": "| 颜色",
    "Actually give it a name, maybe?": "实际上给它一个名字，也许？",
    "|Your Home, Basement|": "|您的家，地下室|",
    Age: "年纪",
    And: "和",
    "Argh! This place is infested!": "啊！ 这地方到处都是虫！",
    Bat: "蝙蝠",
    "can't rename later!": "以后不能重命名！",
    "Cat ♀": "猫 ♀",
    "Day of birth": "出生日期",
    Days: "天",
    Fawn: "讨好",
    Fluffy: "蓬松的",
    "Give your cat a name!": "给你的猫起个名字！",
    "Great way to pass time. Your cat is resting next to you": "打发时间的好方法。 你的猫在你旁边休息",
    Hiding: "隐藏",
    "Its Master": "它的主人",
    Likes: "喜欢",
    "Lookout Guard: If you want work come at the time that's stated in the notice and not a minute late!":
        "了望卫队：如果你想上班，请按通知中规定的时间来，不要迟到一分钟！",
    Months: "月",
    Name: "名字",
    "Paper Golem": "纸傀儡",
    Pattern: "图案",
    "You feel safe. You can rest here.": "你感到安全。 你可以在这里休息。",
    "You feel safe. You can rest here. Meow": "你感到安全。 你可以在这里休息。 喵",
    "You feel safe. You can rest here. You hear rustling": "你感到安全。 你可以在这里休息。 你听到沙沙声",
    "Great way to pass time. You feel warm": "打发时间的好方法。 你感到温暖",
    "Running consumes 15% less energy": "跑步消耗的能量减少 15%",
    "Simply walking doesn't cut it anymore, maybe you should speed up a bit while travelling on foot?":
        "单纯走路已经不行了，也许你应该在步行时加快一点？",
    '"=> Hunt indefinitely"': '"=> 无限期狩猎"',
    Cyan: "青色",
    "Western Woods, They're Nearby": "西部森林，他们就在附近",
    '"Monster eradication"': "“消灭怪物”",
    '"Sell firewood': '"卖柴火',
    "Cyan Slime": "青色史莱姆",
    "Don't even think about it, you will not be sent to your death. Go back and train, dojo has everything you need":
        "想都别想，你不会被送死的。 回去训练，道场有你需要的一切",
    "I'll fetch you 15 copper per bundle! How many do you want to sell?": "一包15铜给你！ 你想卖多少？",
    "Perfectly dried strips of meat. The taste is not bad, this jerky can be kept edible for years":
        "完全干燥的肉条。 味道还不错，这个肉干可以保存多年",
    "Getting beat up like this hurts like hell. You better think of a way out of this misery!":
        "像这样被殴打真是太痛苦了。 你最好想办法摆脱这种痛苦！",
    "Lesser slimes, devoid of any senses. They survive by absorbing debris from the ground":
        "较小的史莱姆，没有任何感官。 它们靠吸收地面上的碎片生存",
    "Punching Bag": "沙袋",
    "Unarmed Mastery": "徒手精通",
    "Durability of one's body": "身体的耐久性",
    "Edible part of some animal, has to be cooked before consumption": "某些动物的可食用部分，食用前必须煮熟",
    "Rusty Dagger": "生锈的匕首",
    "Slightly improves physical defence": "小幅提升物理防御",
    "Small wooden doll with flexible joints. This type can be used, with Dark enchantment, to take control of living things.":
        "带有灵活关节的小木娃娃。 这种类型可以与黑暗附魔一起使用来控制生物。",
    SPCL: "特殊",
    "Used up useless knife. More of a blunt weapon in it's current state": "用完没用的刀。 在当前状态下更像是一种钝器",
    Toughness: "韧性",
    "15, HP +30, Gluttony EXP Gain +5%": "15、生命值 +30、饮食经验增加+5%",
    "3%, Pain Resistance EXP Gain +5%, New Title": "3%，抗痛经验获得 +5%，新称号",
    "5%, STR +1, Drinking EXP Gain +10%, New Title": "5%, 力量 +1, 饮酒经验增加 +10%, 新称号",
    "5%, Toughness EXP Gain +10%": "5%, 坚韧 经验 增益 +10%",
    "Toppling objects": "倾倒对象",
    Tricolored: "三色",
    "You feel safe. You can rest here. Your cat comes out to greet you!":
        "你感到安全。 你可以在这里休息。 你的猫出来迎接你！",
    "Your best feline friend": "你最好的猫科动物朋友",
    '"Challenge a stronger opponent"': "“挑战更强大的对手”",
    "Straw Golem": "稻草魔像",
    "Straw Golem ->": "稻草魔像 ->",
    "Straw Golem -> x2(": "稻草魔像 -> x2(",
    '"<= Take it back"': '"<= 拿回去"',
    '"Do your job well and you will be rewarded"': '"做好你的工作，你会得到回报"',
    '"Nooooo it\'s ugly!!"': "“不不不不不不 太丑了！！”",
    '"Show Xiao Xiao a wooden doll"': '"给 小小 看一个木偶"',
    '"The Hunter Association offers you a large variety of boxes full of smoked meat and furs"':
        "“猎人协会为您提供种类繁多的装满熏肉和毛皮的盒子”",
    '"What is it what is it?"': '"它是什么它是什么？"',
    '"Xiao Xiao =>"': '"小小 =>"',
    "All the time you had to consume disgusting rotten stuff is finally paying off... Kind of. You would rather avoid doing that in the future, if possible":
        "你不得不消耗令人作呕的腐烂东西的所有时间终于得到了回报......有点。 如果可能的话，你宁愿在未来避免这样做",
    "Garbage Eater": "垃圾吞噬者",
    "Heavy rain": "倾盆大雨",
    "It's pouring so hard the streets are completely flooded. There's noone around except for a few kids":
        "倾盆大雨，街道完全被淹。 除了几个孩子，周围没有人",
    "There is a report of a missing cat": "有一只猫失踪的报告",
    "This is an advertisement for cleaning services": "这是清洁服务的广告",
    "This is an advertisement for dojo membership": "这是道场会员的广告",
    "This is an advertisement for hemp clothing": "这是一则麻衣广告",
    "This is an advertisement for joining the militia": "这是加入民兵的广告",
    "This is an advertisement for wooden furniture": "这是木制家具的广告",
    "Xiao Xiao": "小小",
    '"Glass Bones"': '"玻璃骨头"',
    "Bizzarely, you got yourself knocked out by the weakest enemy in existence. How did that happen? You feel like you have achieved somewhat absurd understanding of how frail your body actually is. Perhaps violence isn't for you":
        "你竟然打不过这里最弱的敌人，为什么？也许你的体质太差了，又或许暴力根本不适合你？",
    "Glass Bones": "玻璃骨头",
    "Mon.": "我的。",
    '"Be bored"': '"无聊"',
    "*whistle*": "*吹口哨*",
    ", AGL +1": ", 敏捷 +1",
    "1, Pain Resistance EXP Gain +3%": "1、抗痛性经验增益+3%",
    "1, Pain Resistance EXP Gain +7%, New Title": "1、抗痛性经验获得+7%，新称号",
    "5%, Energy Effectiveness +1%, New Title": "5%, 能量效率 +1%, 新称号",
    "5%, STR +1, New Title": "5%, 力量 +1, 新称号",
    "Penny of Wealth": "一分钱财",
    Perception: "洞察力",
    "Picking a coin gives you an extra coin": "选择一枚硬币会给你一个额外的硬币",
    "Pine Nuts": "松子",
    "Prevents you from getting rained on": "防止你淋雨",
    "Provides minor protection from fire-based attacks": "提供轻微的保护以免受基于火的攻击",
    "Rabbit Foot": "兔脚",
    "Raises stats during day": "提高白天的属性数据",
    "Reduces chances to cook a failed product": "减少烹饪失败产品的机会",
    "Regular carrot, boiled in water. It is sweet but not all that tasty, actually":
        "普通胡萝卜，在水中煮沸。它很甜，但不是那么好吃，实际上",
    "Right...": "对...",
    "Scrambled Eggs": "炒鸡蛋",
    "Simple slab of meat, roasted on an open fire without any seasoning. Tastes pretty good nonetheless":
        "简单的肉块，在明火上烤，不加任何调味料。不过味道还不错",
    "Simple square shield with reinforced corners": "带加强角的简单方形盾牌",
    "Skill of chances": "机会技能",
    "Slightly shifts shop prices in your favour": "稍微调整商店价格对您有利",
    "Small handcrafted straw doll. Dolls of this type are used to bind with the souls of the living. Appropriate for Curses and Dark Magic manipulation":
        "手工制作的小草娃娃。这种类型的娃娃用于与活人的灵魂结合。适用于诅咒和黑魔法操作",
    "Somewhat stops bleeding": "有点止血",
    "Soul Puppet": "魂傀",
    "Stake Shield": "桩盾",
    "Stamina Jelly": "耐力果冻",
    "Sun blessing": "赞美太阳",
    "Sun Charm": "阳光魅力",
    Targe: "塔吉",
    "Tasteless soup made by boiling heaps of cure grass in water. Healing only in name, it is known that exposing cure grass to high temperatures destroys any healing properties of the product":
        "将成堆的治疗草在水中煮沸制成的无味汤。只是名义上的愈合，众所周知，将治疗草暴露在高温下会破坏产品的任何愈合特性",
    "The art of Cooking": "烹饪艺术",
    "The art of Creation": "创造的艺术",
    "The power of possessions": "财产的力量",
    "There doesn't seem to be anything of interest around..": "周围好像没什么兴趣。。",
    "This is boring": "这很无聊",
    "Thoroughly examine current area in search for hidden passages, treasure, secrets or anything of interest":
        "彻底检查当前区域以寻找隐藏的通道、宝藏、秘密或任何感兴趣的东西",
    Toolbox: "工具箱",
    "Tough leather gauntlet that covers your entire hand. May prevent you from losing fingers":
        "坚固的皮革手套，覆盖您的整只手。可以防止你失去手指",
    Trading: "贸易",
    Umbrella: "伞",
    "Village Center, Marketplace Entry Gate": "村中心、市场入口",
    "Yarn Ball": "纱球",
    "Yawn..": "打哈欠..",
    "Yeah...": "是的...",
    "You are blessed by Sun": "你被太阳祝福",
    "You are standing on guard duty. This isn't very fun": "你正在值班。这不是很有趣",
    "You begin to look around": "你开始环顾四周",
    "A handful of tasty crunchy nuts from a pinecone": "一把松果中的美味松脆坚果",
    "A passerby dropped a coin. Sweet!": "一个路人丢了一枚硬币。甜的！",
    "A proof of loyalty brought to you by your cat": "您的猫给您带来的忠诚证明",
    "A small doll carved from beast bone. It's a charm that protects the wearer from evil":
        "用兽骨雕刻而成的小人偶。是保护佩戴者免受邪恶侵害的护身符",
    "A-Z": "A-Z",
    "Ability to absorb Fire Ki and assimilate it within your body": "能够吸收 Fire Ki 并将其吸收到体内",
    "Ability to exchange wealth for goods and services": "用财富换取商品和服务的能力",
    "Ability to find and collect usable materials from the surroundings": "能够从周围寻找和收集可用材料",
    "Ability to see the unseen and better understand your surroundings": "能够看到看不见的事物并更好地了解周围环境",
    "Adhesive Bandage": "粘性绷带",
    "Ah...": "啊...",
    Alchemy: "炼金术",
    "Allows deconstruction of items and equipment when kept in inventory": "允许在库存中分解物品和设备",
    "An extra shiny penny, that looks like it's made of gold. It probably isn't, but you feel richer just by holding it":
        "一个额外闪亮的便士，看起来像是用金子做的。可能不是，但只要持有它，你就会感觉更富有",
    "Bandage, boiled in hot water and sterilized using herbs": "绷带，在热水中煮沸并用草药消毒",
    "Bleed resist +5": "流血抗性 +5",
    "Boiled Carrot": "水煮胡萝卜",
    "Bone Doll": "骨娃娃",
    "Burnt Meat": "烧肉",
    "Clean piece of thin sturdy cloth, perfect for wrapping and securing open wounds":
        "干净的一块坚固的薄布，非常适合包裹和固定开放的伤口",
    "Coal-looking overcooked chunk of meat. Mildly nutritious but awful to eat":
        "像煤炭一样煮熟的大块肉。有点营养，但吃起来很糟糕",
    "Common edible mushroom. When cooked with the right ingredients, the flavour of this mushroom is not so common":
        "常见的食用菌。当用正确的原料烹制时，这种蘑菇的味道并不那么常见",
    "Concentrated green jelly. Improves stamina": "浓缩的绿色果冻。提高耐力",
    Cooking: "烹饪",
    Crafting: "制作",
    "Dead Bird": "死鸟",
    Deconstruct: "解构",
    Disassemble: "拆卸",
    "Dolls that could be remotely controlled by one's soul. Employed by spies to infiltrate enemy lines unnoticed":
        "可以被灵魂遥控的人偶。被间谍雇佣以潜入敌军，不被发现",
    "Family Heirloom": "传家宝",
    "Family Heirloom+": "传家宝+",
    "Fire Absorption": "吸火",
    "Fluffy and delicious scrambled eggs": "松软可口的炒鸡蛋",
    "Fluffy ball of yarn which is normally used as a material for knitting. Cats love these and often claim them as toys":
        "蓬松的纱线球，通常用作针织材料。猫喜欢这些并经常声称它们是玩具",
    "Fluffy rice. Simple dish that tastes good": "蓬松的米饭。简单但美味",
    Gambling: "赌博",
    Gauntlet: "护手",
    Greed: "贪婪",
    Harvesting: "收获",
    "Increases chances of obtaining area loot": "增加获得区域战利品的机会",
    into: "进入",
    Investigate: "调查",
    "It gets very sweet when boiled": "煮的时候很甜",
    "Knowledge of medicine and alchemical transmutation": "医学和炼金术的知识",
    L: "左",
    R: "右",
    "Life Shard": "生命碎片",
    "Light umbrella with a cloud pattern. Young masters and ladies carry these to display their carefree nature":
        "带有云纹的光伞。少爷女士们随身带着这些，彰显洒脱的本性",
    "Little charm with a piece of power of the Sun imbued into it. It absorbs Sun energy":
        "带着一丝太阳之力的小符咒。它吸收太阳能",
    "Lookout Guard: Work's done for today, you have performed your duty just well and earned your salary, take it. You are advised to go straight home after you check out":
        "守望者：今天的工作已经完成了，你尽职尽责，拿到了工资，拿去吧。建议您退房后直接回家",
    "Lucky charm made from a foot of a rabbit. Wearing this gives you a strange feeling of satisfaction":
        "由一只兔子的脚制成的幸运符。穿上它，让你有一种莫名的满足感",
    "Makes autocrafting faster": "使自动制作更快",
    "Metal box with a variety of fine tools inside, multipurpose knives, mallets, pincers, chisels and a few more. Used for precision work and tinkering with simple and complex objects":
        "金属盒，里面有各种精美的工具、多用途刀、木槌、钳子、凿子等等。 用于精密工作和修补简单和复杂的物体",
    Mushroom: "蘑菇",
    "Not actually a shield, but a row of spiky wood stakes tightly packed together to form a square panel. It's a bit heavy":
        "实际上不是盾牌，而是一排尖尖的木桩紧紧地挤在一起形成一个方板。 有点重",
    "Nothing in the box yet": "盒子里还没有东西",
    "Rotten Meat": "腐烂的肉",
    Spotted: "斑点",
    "Unarmed STR": "徒手力量",
    "Storage Box": "储物盒",
    "You reinforced your family pendant's string with straw to prevent possible breaking. It looks even more lame like this":
        "你用稻草加固了家庭吊坠的绳子，以防止可能的断裂。 这样看起来更蹩脚",
    '"Access Storagebox"': '"存取储物箱"',
    '"<= Step Away"': '"<= 离开"',
    '"Poison Resistance"': '"抗毒"',
    '"Toss some firewood into the fireplace"': '"往壁炉里扔些柴火"',
    "|Your Home, Storage Box|": "|您的家，储物箱|",
    "A knife originally used to cut fish, not people. It's not a sword, but ordering one won't get you yelled at":
        "刀原本是用来切鱼的，不是用来切人的。 这不是剑，但订购一把不会让你大吼大叫",
    "A sword designed for mass production by reducing labor and material cost down to a minimum. It may look like a sword, but it's not really fit to cut anything. The manual suggests it be used to cut radishes":
        "通过将劳动力和材料成本降至最低而设计用于大规模生产的剑。 它看起来像一把剑，但它并不适合切割任何东西。 说明书上建议用来切萝卜",
    "Attic spider": "阁楼蜘蛛",
    "Being brushed": "被刷",
    Cat: "猫",
    "Dull Sword": "钝剑",
    "Greenish grey organic mass that was once something edible, now isn't good for pretty much anything":
        "曾经是可食用的绿灰色有机物质，现在几乎不适合任何东西",
    "Huge container with a secure padlock. You can put your possessions inside to keep them safe.":
        "带有安全挂锁的巨大容器。 你可以把你的财物放在里面以保证它们的安全。",
    "Kitchen Knife": "菜刀",
    Knuckles: "指关节",
    "Leather bands that cover fingers": "覆盖手指的皮带",
    "Master's bed": "主人的床",
    Alembic: "阿朗比克",
    Candle: "蜡烛",
    "Dangerous beasts were sighted in vicinity of the Southern Forest. These reports are likely linked to the cause of livestock and locals getting injured, therefore, to avoid further casualties, entry into the forest is prohibited to those without permit or high enough self-defence ability until the situation is resolved":
        "南方森林附近出现了危险的野兽。 这些报告很可能与牲畜和当地人受伤有关，因此，为避免进一步伤亡，在情况解决之前，没有许可证或具有足够自卫能力的人禁止进入森林",
    "Herbalist: Yes yes..": "草药师：是的，是的..",
    "It says here": "它说这里",
    'Looking for a anyone with free time to assist local militia with guarding duty. Apply at the checkpoint near marketplace area between 7AM and 10AM"':
        '寻找任何有空闲时间的人来协助当地民兵执勤。 早上 7 点到 10 点在市场附近的检查站申请"',
    Pathetic: "可怜的",
    "Your weak punch can barely exert a power of 100kg, which is a measly amount in the martial world. A simple farmer can hit harder than this":
        "你那一拳微弱的力量，勉强能发挥出一百公斤的威力，这在武林中是微不足道的。 一个简单的农民可以打得比这更重",
    '"Huh.."': "“嗯..”",
    '"I see"': "“我懂了”",
    '"Pathetic"': "“可怜的”",
    '"Sword Medal"': '"剑勋章"',
    '"Warning!"': "“警告！”",
    "一Head of The Guard, Hitoshi": "一警卫队长仁志",
    "A tall wax candle, made to burn for a very long time": "一根高大的蜡烛，可以燃烧很长时间",
    "Alchemical vessel used in distilling, especially useful for cooling": "用于蒸馏的炼金容器，特别适用于冷却",
    Amber: "琥珀色",
    "Bamboo Training Sword": "竹练剑",
    "Herbalist: Yes indeed, if you have any cure grass to sell, by all means bring it here, you can never have too much. I will take bundles of 50 for 15":
        "草药师：是的，如果你有任何治疗草要卖，一定要带过来，你永远不会有太多的。 我要一包 50 个 15 个",
    "High-grade Spirit Pill": "上品灵丹",
    'Looks like a page from someone\'s notebook, marked "H", poorly written in bad handwriting. It lists several simple things you can cook and make from widely available cheap materials':
        "看起来像是某人笔记本上的一页，标有“H”，字迹不佳。 它列出了一些简单的东西，你可以用广泛可用的廉价材料烹饪和制作",
    "Bag Of Bones": "骨头袋",
    Pinecone: "松果",
    "Small spirit pill, made from condensed Ki. Given to young warriors as energy supplement":
        "小灵丸，由气凝聚而成。 送给年轻战士作为能量补充",
    Vitamins: "维生素",
    '"<= Rather not"': '"<= 而不是"',
    '"Guide To Living By Yourself"': "“独自生活指南”",
    '"Sell cure grass': '"卖治愈草',
    '"Sell your goods"': '"卖你的货"',
    "[Summer]": "[夏]",
    "A bottle of powerful vitamins, which grant one's body incresed vitality": "一瓶强效维生素，增强身体活力",
    "A training sword for kenjutsu lessons. Designed in the late Edo period, it is strung together from four bamboo planks. The ruthless chief of a female bandit group named Danfu is known to wield it":
        "剑术课的练剑。 江户时代后期设计，由四块竹板串成。 众所周知，一个名叫丹芙的女强盗团伙的无情头目挥舞着它",
    "A spiny pod from a pine tree.  Dry seeds rattle around inside when you shake it":
        "松树上的多刺豆荚。 当你摇动它时，干燥的种子会在里面发出嘎嘎声",
    "A very short manual filled with illustrations about primitive dollmaking. The instructions are easy to understand so children could make the dolls too. Looks like there was a chapter dedicated to sewing, now it's almost entirely missing":
        "一本非常简短的手册，里面有关于原始玩偶制作的插图。 说明很容易理解，所以孩子们也可以制作娃娃。 好像有一章专门讲缝纫的，现在几乎完全没有了",
    "3%, INT +1, New Title": "3%, 智力 +1, 新称号",
    "1, AGL +1": "1, 敏捷 +1",
    "A fragment of living energy, trapped within a crystallic shell. Absorbing these slightly increases lifespan":
        "被困在水晶壳中的生命能量碎片。吸收这些会略微延长寿命",
    "Ability to endure forms of suffering without complaint": "能够毫无怨言地忍受各种形式的痛苦",
    "All Masteries EXP Gain +5%, Fighting EXP Gain +5%, New Title": "所有精通经验增益 +5%，格斗经验增益 +5%，新称号",
    "Apple Juice": "苹果汁",
    "Awful sandwich that doesn't taste like anything. It is filling, at the very least":
        "可怕的三明治，尝起来不像任何东西。它正在填充，至少",
    "Bone Cracker": "骨饼干",
    "Bones of some kind, baked until crisp": "某种骨头，烤至酥脆",
    "Coat stitched together from patches of cloth of various sizes and thickness. Somewhat durable but looks desperate":
        "用不同尺寸和厚度的布块缝合在一起的外套。有点耐用但看起来很绝望",
    "Crude attempt at pants, very baggy looking and somewhat uncomfortable to wear. Potential holes near stitch areas make your lower body shiver when it's windy":
        "对裤子的粗暴尝试，看起来很宽松，穿起来有点不舒服。缝合区域附近的潜在孔洞使您的下半身在刮风时颤抖",
    "Dead Mouse": "死老鼠",
    "Fighting EXP Gain +10%, New Title": "战斗经验获得 +10%，新称号",
    "Freshly-squeezed from real apples!": "从真正的苹果新鲜挤压！",
    "Increases HP by +2 permanently": "生命值永久 +2",
    "Jelly Sandwich": "果冻三明治",
    "Juice Pulp": "果汁浆",
    "Left-over byproduct from juicing the fruit.  Not very tasty, but contains a lot of healthy fiber":
        "榨汁后剩下的副产品。不是很好吃，但含有大量健康纤维",
    "More like a healthy dose of dry grass in a sack. Uneven, hard, itchy, and probably bad for your neck. Despite that, it still passes as a basic tool of comfort":
        "更像是一袋健康剂量的干草。不均匀、坚硬、发痒，可能对你的脖子有害。尽管如此，它仍然作为一种基本的舒适工具",
    "More like a long sheet of cloth folded trice and stitched in. Barely offers any warmth, but keeps you from getting frostbites if it's windy":
        "更像是一张折叠三折并缝合的长布。几乎不能提供任何温暖，但可以防止刮风时被冻伤",
    "Patchwork Coat": "拼布大衣",
    "Patchwork Pants": "拼布裤",
    Patience: "耐心",
    "Perception EXP Gain +5%, Critical Damage +2%, EXP Gain +6%": "感知 EXP 获得 +5%，暴击伤害 +2%，EXP 获得 +6%",
    "Ragwork Blanket": "碎花毯",
    "Straw Pillow": "稻草枕",
    "Vermin hunted by your cat, now proudly displayed before you": "被您的猫猎杀的害虫，现在自豪地展示在您面前",
    '"...break time!..."': "“...休息时间！...”",
    '"...I\'ll come back, just wait for a minute..."': '"......我会回来的，你等一下......"',
    '"...right, I\'ll take 4, put them in..."': '"...对了，我拿4个，放进去..."',
    '"...she\'ll return shortly. As for you..."': '"......她很快就会回来。至于你......"',
    '"...stop pushing!..."': '"...别再推了！..."',
    '"...turn right and then..."': '"...右转然后..."',
    '"...what a scam..."': '"...真是个骗局..."',
    '"...why is this so expensive?..."': '"...为什么这么贵？..."',
    '"...yeah, he said it\'s there..."': "“......是的，他说它在那里......”",
    '"Dead Mouse"': "“死老鼠”",
    '"Dollmaker\'s Handbook"': "“玩偶手册”",
    "Bright Night": "明亮的夜晚",
    "You sense something": "你感觉到了什么",
    DP: "耐久",
    "Bad food consumed": "吃坏食物",
    "Beast-class foes slayed": "兽级敌人被杀",
    "Books read": "读过的书",
    "Cat pets": "宠物猫",
    completed: "已完成",
    "Dagger attacks": "匕首攻击",
    "Dagger kills": "匕首杀死",
    "Discoveries made": "做出的发现",
    "done!": "完毕！",
    "Drinks consumed": "饮用的饮料",
    "Evil-class foes slayed": "邪恶级的敌人被杀死",
    "Firewood collected": "收集的柴火",
    "Firewood Gathering": "柴火聚会",
    "First Hunt": "第一次狩猎",
    "Food consumed": "消耗的食物",
    "Game saves": "游戏存档",
    "Game start time": "比赛开始时间",
    Git游戏: "吉特游戏",
    "Goods bought": "购买的商品",
    "Guard the gate until 8PM (": "守卫大门直到晚上 8 点（",
    "Guarding Duty": "守卫职责",
    "Hammer/Club attacks": "锤击/俱乐部攻击",
    "Hammer/Club kills": "锤击/俱乐部击杀",
    "Hunt for 10 peices of meat for hunter Yamato": "为猎人大和猎取 10 块肉",
    "Ingame time passed": "游戏时间过去了",
    "Items crafted": "制作的物品",
    "Items disassembled": "拆解物品",
    "Items picked up": "捡到的物品",
    "J o u r n a l": "日记",
    "Jobs completed": "作业完成",
    journal: "日记",
    "Last cause of casualty": "最后的伤亡原因",
    "lvl:19 'Jogger'": "lvl:19 '慢跑者'",
    "Marked Wakizashi": "标记胁差",
    "Medicine used": "所用药物",
    "Money acquired": "获得的钱",
    "Money spent in shops": "在商店花的钱",
    "Old wakizashi variant with red hilt. Scarred and chipped blade hints that it was used rather heavily in the past":
        "带有红色刀柄的旧 胁差 变体。伤痕累累的刀片暗示它在过去被大量使用",
    "Pills consumed": "服用的药丸",
    "Polearm/Spear attacks": "长矛/矛攻击",
    "Polearm/Spear kills": "长柄武器/长矛击杀",
    "Q U E S T　　L I S T": "任务列表",
    "Q U E S T S": "任务",
    "Quests completed": "任务完成",
    "Raw meat collected": "收集的生肉",
    "Recipes unlocked": "食谱已解锁",
    "S T A T I S T I C S": "统计数据",
    "S T A T S": "统计",
    "Secure 10 bundles of firewood for hunter Yamato": "为猎人大和确保 10 捆木柴",
    "Skills unlocked": "技能解锁",
    "Sword attacks": "剑攻击",
    "Sword kills": "剑杀",
    "Time Slept": "睡眠时间",
    "Times description window appeared": "出现次数描述窗口",
    "Times died": "时代已逝",
    "Times dodged the attack": "时代躲过了攻击",
    "Times killed with a single hit": "被一击杀死的次数",
    "Times missed the attack": "时代错过了进攻",
    "Times walked": "走过的时光",
    "Titles unlocked": "标题已解锁",
    "Total damage dealt": "造成的总伤害",
    "Total damage recieved": "受到的总伤害",
    "Total EXP gained": "获得的总经验值",
    "Total kills": "总击杀数",
    "Total reading time": "总阅读时间",
    "Total skill levels": "总技能水平",
    "Total time spent at home": "在家花费的总时间",
    "Unarmed attacks": "徒手攻击",
    "Unarmed kills": "徒手击杀",
    "Unique food tried": "尝试独特的食物",
    "Western Woods, Hunter's Lodge": "西部森林，猎人小屋",
    "what casualty?": "什么伤亡？",
    "You were tasked with guarding duty to watch over marketplace": "你的任务是守卫看管市场",
    '"Gauntlet"': '"护手"',
    '"Targe"': '"目标"',
    "「Objectives」": "「目标」",
    "#2: Firewood Gathering [": "#2：柴火聚会[",
    "#3: First Hunt [": "#3：第一次狩猎[",
    "#4: Guarding Duty [": "#4：守卫职责[",
    "<= Return": "<= 返回",
    Jogger: "慢跑者",
    "rotted away!": "烂掉了！",
    '"...buy it! You won\'t regret it!..."': '"...买它！你不会后悔的！..."',
    '"...is this really?..."': '"...这是真的吗？..."',
    '"...no, go by yourself..."': '"...不，你自己去..."',
    '"...right, coming next evening. You should probably p..."': "“……好吧，明天晚上来。你应该……”",
    '"...right, I\'ll take 15, put them in..."': '"...对了，我取15个，放进去..."',
    '"...try a different one..."': '"...尝试不同的..."',
    '"Bat Eyes"': "蝙蝠眼",
    '"Decadent"': "“颓废”",
    '"Fallen"': "堕落",
    '"Illiterate"': "“文盲”",
    '"Jogger"': '"慢跑者"',
    '"Nameless"': "“无名”",
    '"Nobody"': "“无名之辈”",
    '"Punching Bag"': "“沙袋”",
    '"Scrawny"': '"骨瘦如柴"',
    '"Uneducated"': '"目不识丁"',
    '"Unknown"': "“未知”",
    '"Valley Cat"': "谷猫",
    '"Wary"': "警惕",
    '"Wimp"': '"懦夫"',
    "25 titles would be something an average working man would aquire effortlessly by simply living his life. You shouldn't feel proud by only reaching this high":
        "25个头衔是普通工人只要过着生活就能毫不费力地获得的东西。只达到这个高度你不应该感到自豪",
    "Bat Eyes": "蝙蝠眼",
    Civilian: "平民",
    Decadent: "颓废",
    "Dojo disciple who managed to finish the first training stages. Woo!": "成功完成第一阶段修炼的道场弟子。哇！",
    Fallen: "堕落",
    Initiate: "发起",
    Nameless: "无名",
    "Often you manage to avoid death even after being heavily injured. Perhaps you have a very resilient body, or Heavens aren't willing to accept you yet":
        "通常，即使在受重伤之后，您也能设法避免死亡。或许你的身体很有韧性，或者上天还不愿意接受你",
    "SELECT YOUR TITLE": "选择你的头衔",
    "Somehow you always escape life threatening situations even after being hit and bruised a lot, hovewer you still lose conciousness. Newbie's luck?":
        "不知何故，即使在受到重创和瘀伤之后，您也总能逃脱危及生命的情况，但您仍然会失去知觉。新手的运气？",
    "Sometimes when you hit an enemy the certain way your attack feels somewhat stronger, you noticed. What's that about?":
        "有时，当您以某种方式击中敌人时，您的攻击会感觉更强一些，您注意到了。那是关于什么的？",
    "Sometimes when you're hit it hurts much more then usual. You hate this, but why does that happen? You have to figure out how to avoid this":
        "有时，当你被击中时，它会比平时更痛。你讨厌这个，但为什么会这样？你必须弄清楚如何避免这种情况",
    "Starving Child": "饥饿的孩子",
    "Stray animals don't seem to be wary of you that much, for some reason. You are able to hug a random cat without it running away":
        "出于某种原因，流浪动物似乎并没有那么警惕你。你可以拥抱一只随机的猫而不会逃跑",
    "The fear of pain has forced you to begin taking cover behind whatever you take your hands on. Shields fall within this category nicely, you think you should try learning how to handle them properly":
        "对疼痛的恐惧迫使你开始在你手上的任何东西背后寻找掩护。盾牌很好地属于这一类，你认为你应该尝试学习如何正确处理它们",
    Uneducated: "目不识丁",
    Unknown: "未知",
    "Valley Cat": "谷猫",
    Wary: "警惕",
    "Wed.": "星期三。",
    Wimp: "懦夫",
    "You are not very friendly with books, your entire literature knowledge is nothing but simple kiddie stories and fairy tales":
        "你对书不是很友好，你整个文学知识不过是简单的小故事和童话",
    "You barely took a single minor step into the world by gathering 10 titles. Nobody takes notice of you or your ambition, you are but a filler existence that doesn't amount to anything yet":
        "通过收集 10 个标题，您几乎没有向世界迈出一小步。没有人注意到你或你的野心，你只是一个没有任何意义的填充存在",
    "You're not very suitable for combat. But you think you're out of options": "你不太适合战斗。但你认为你别无选择",
    "You've been all skin and bones as long as you can remember. You will need to start eating properly if you wish to survive":
        "你小的时候总是吃不饱饭，皮包骨头。但你依然需要正确的饮食习惯来保证生存",
    '"Garbage Eater"': '"垃圾吞噬者"',
    '"Prick"': "“刺”",
    '"Stick Kid"': "“棍棒小子”",
    '"Weakling"': '"弱者"',
    "Stick Kid": "棍棒小子",
    Weakling: "弱者",
    "You always liked swinging that thing around. You think you're beginning to understand how to land hits properly. Or not":
        "你总是喜欢摆弄那东西。 您认为您已经开始了解如何正确击球。 或不",
    "You can't really hit anything with these frail arms of yours": "用你这些虚弱的手臂，你真的不能打任何东西",
    "Ability to tolerate harmful poisons": "对有害毒药的耐受能力",
    '"...right, I\'ll take 2, put them in..."': '"...对了，我拿2个，放进去..."',
    Apprentice: "学徒",
    "Cat Lover": "爱猫人士",
    "Increases HP by +25 permanently": "生命值永久增加 +25",
    "Increases probability to avoid being poisoned": "增加避免中毒的概率",
    "It's pouring so hard the streets are completely flooded. There's noone around":
        "倾盆大雨，街道完全被淹。 周围没有人",
    "Life Stone": "生命之石",
    "Life vessel that lost its energy and became impure, now looks like an ordinary small pebble and serves very little purpose. Can be absorbed for minor health benefits":
        "失去能量，变得不纯洁的生命容器，现在看起来就像一块普通的小卵石，没有什么用处。 可以被吸收以获得轻微的健康益处",
    "Wild Rabbit -> x1(": "野兔 -> x1(",
    "of hunger took a toll on your body, yet made you learn to conserve your energy by other means, which shows. Just a bit":
        "饥饿对你的身体造成伤害，但让你学会通过其他方式保存你的能量，这表明。 一点点",
    "Pest Control": "害虫防治",
    "Poison Resistance": "毒抗性",
    Sleeper: "嗜睡者",
    "Suspicious Eyes": "可疑的眼睛",
    "Technique book full of fundamental knowledge about swordfighting": "充满了剑术基础知识的技术书",
    "The one who destroyed dojo's precious equipment. Were you a bit older you'd pay the expences, but you made your teacher proud.":
        "破坏道场珍贵装备的人。 如果你年纪大一点，你会支付费用，但你让你的老师感到自豪。",
    Thrasher: "痛击者",
    "You have confirmed it, bashing the enemy on the head makes your battles end slightly quicker. Is it only the head that does that?":
        "你已经确认了，猛击敌人的头部会让你的战斗结束得更快一些。 是不是只有头部会这样做？",
    "You have succesfully completed the second part of dojo's training courses. You are impressed by your own achievements!":
        "您已成功完成道场培训课程的第二部分。 你对自己的成就印象深刻！",
    "You have wiped out about 10000 creatures on your way. Most of them weren't living things though... right?":
        "你在路上消灭了大约 10000 只生物。 他们中的大多数都不是生物……对吧？",
    "You really like sleeping don't you? You spend a lot of time in your bed":
        "你人生的意义就是睡觉吗？你在床上花了太多的时间",
    "You really love that kitty": "你真的很喜欢那只小猫",
    '"Apprentice"': "“学徒”",
    '"Bag Of Bones"': '"骨头袋"',
    '"Bladesman Manual"': '"剑客手册"',
    '"Cat Lover"': "“爱猫人”",
    '"Pest Control"': '"害虫防治"',
    '"Sleeper"': '"嗜睡者"',
    '"Suspicious Eyes"': '"可疑的眼睛"',
    '"Thrasher"': "“痛击者”",
    "[Autumn]": "[秋]",
    Thunderstorm: "雷雨",
    "Tue.": "周二",
    "You were struck by lightning!": "你被闪电击中了！",
    '"Umbrella"': "“雨伞”",
    Stardust: "星尘",
    Takemitsu: "竹光剑",
    "Tiny bits of solar pieces that came from the Sky. They shine in darkness and hold the energy of stars":
        "来自天空的微小太阳碎片。 他们在黑暗中闪耀，承载着星辰的能量",
    "Ability to deconstruct goods into raw spare parts": "能够将货物解构为原始材料",
    Disassembly: "拆解",
    "Increases yield from deconstructed items": "增加拆解物品的产量",
    "This reinforced sword is made of bamboo. Not much as a weapon, but makes you seem stronger":
        "这把强化剑是用竹子制成的。 不是什么武器，但让你看起来更强壮",
    '"Hungry Child"': '"饥饿的孩子"',
    '"Iron Stomach"': '"铁胃"',
    '"Spearholder"': '"持矛者"',
    '"Trained Civilian"': "“受过训练的平民”",
    "Allows you to roughly guess when perishable food rots (shift key":
        "允许您粗略地猜测易腐烂的食物何时腐烂（Shift 键",
    "Going through these desperate times of having such an unsafe diet, your stomach doesn't feel as awful anymore. You really shouldn't be doing that":
        "经历了这些不安全饮食的绝望时期，你的胃不再那么糟糕了。 你真的不应该那样做",
    "Hungry Child": "饥饿的孩子",
    "Iron Stomach": "铁胃",
    Spearholder: "持矛者",
    "Trained Civilian": "受过训练的平民",
    "You begin to gain some weight eating all this boring and dry food. But you're not complaining, at least you live":
        "以吃光这些无聊透顶的食物为代价，你的体重终于有所增加。不过至少你还活着，这就够了",
    "You have learned how the art of Spearmanship can be used for both offensive and defensive combat, which you think suits you pretty well. Hovewer, handling a spear with skill is much more difficult than you initially thought":
        "您已经了解了如何将矛术艺术用于进攻和防御战斗，您认为这非常适合您。 然而，熟练地处理长矛比你最初想象的要困难得多",
    "You're still nearly useless in a real fight, but you have learned to at least move out of the way of danger":
        "在真正的战斗中你仍然几乎毫无用处，但你至少学会了避开危险",
    "Evasion EXP Gain +5%, HP +15, AGL +2, EXP Gain +3%, AGL Training Potential +3%":
        "闪避经验增益 +5%、生命值 +15、敏捷 +2、经验 增益 +3%、敏捷 训练潜力 +3%",
    '"Animal Friend"': '"动物朋友"',
    '"Emaciated"': '"瘦弱"',
    '"Heavy Sleeper"': '"深度睡眠者"',
    '"Hikikomori"': '"社交退缩"',
    '"Runner"': '"赛跑者"',
    '"Wild Kid"': '"野孩子"',
    '"Shut In"': '"关门"',
    '"Hermit"': '"隐士"',
    '"Knuckles"': '"指关节"',
    '"Rain Shoes"': '"雨鞋"',
    '"Wooden Needle"': '"木针"',
    "1, STR +1, EXP Gain +2%": "1, 力量 +1, 经验增益 +2%",
    "10, HP +20, New Title": "10, 生命值 +20, 新称号",
    "10, Patience EXP Gain +5%, New Title": "10、耐心经验获得+5%，新称号",
    "2, HP +15, Survival EXP Gain +15%, New Title": "2、生命值+15、生存经验获得+15%、新称号",
    "7%, Pain Resistance EXP Gain +10%, Gluttony EXP Gain +10%, New Title":
        "7%，抗痛经验增益 +10%，饮食经验增益 +10%，新称号",
    "8, SAT +6": "8, 能量 +6",
    "'Greed'": "'贪婪'",
    "'Trading'": "'贸易'",
    "A dry and virtually tasteless bread product capable of remaining edible without spoilage for vast lengths of time":
        "一种干燥且几乎无味的面包产品，能够在很长一段时间内保持食用而不会变质",
    "Ability to keep going with blood loss": "在失血的情况下继续前进的能力",
    "Ability to tolerate harsh and cold temperatures": "能够耐受严酷和寒冷的温度",
    "All Masteries EXP Gain +10%": "所有精通经验增益 +10%",
    "Bleeding Resistance": "流血抗性",
    "Cold Resistance": "抗寒",
    "Evasion EXP Gain +8%, Critical Damage +8%, War EXP Gain +7%": "闪避经验获得+8%，暴击伤害+8%，战争经验获得+7%",
    Hardtack: "硬钉",
    "Heavy wooden crate you were asked to deliver to dojo. It is sealed shut and you can't look inside. It smells faintly of meat, spices and mushrooms. Probably filled with preserved dry produce":
        "你被要求运送到道场的重型木箱。 它是密封的，你不能看里面。 淡淡的肉味、香料味和蘑菇味。 可能装满了腌制的干果",
    "Hunter's Crate": "猎人的箱子",
    "Patience EXP Gain +10%, HP +25": "耐心 经验 增益 +10%，生命值 +25",
    "Slightly decreases energy loss when cold": "寒冷时略微减少能量损失",
    "Unarmed Mastery EXP gain +10%": "徒手精通经验增益 +10%",
    "Wounds bleed less": "伤口流血更少",
    ", New Title": ", 新称号",
    "10, Death EXP Gain +5%, Gluttony EXP Gain +7%": "10、死亡经验获得+5%，饮食经验获得+7%",
    "10, SAT 10, SPD +1, New Title": "10，能量 10，速度 +1，新标题",
    "30, Death EXP Gain +10%, New Title": "30，死亡经验获得+10%，新称号",
    "10%, Beast Class DEF +3, New Title": "10%, 兽类防御 +3, 新称号",
    "5%, Evasion EXP Gain +10%, STR +1": "5%, 回避经验获得 +10%, 力量 +1",
    "8, SAT +8, EXP Gain +6%": "8、能量 +8、经验增益+6%",
    "Your body is in much better shape, so is your stamina. Moving around fast doesn't bother you as much anymore, but you spend your energy and get kind of hungry from it":
        "你的身体状态更好，你的耐力也更好。 快速移动不再那么困扰您，但是您会花费精力并因此而感到饥饿",
    "You learned to sleep very soundly, without any care for the outside world. Your body begins to adapt and grow stronger with every break you take":
        "睡觉让你与外界世界隔绝，你在身体素质在睡觉中逐渐提高",
    "You have spent an entire year at your house without going out even once. You were somewhat productive in your seclusion, but the time spent didn't even feel like a year, however...":
        "你在家里呆了整整一年，甚至一次都没有出去。 你隐居的时候有些收获，但度过的时间甚至感觉不到一年，然而……",
    "Yesterdays's weakness is today's strength. Or so you've heard. You are not feeling as awful and weak by starving yourself, but there's still nothing to be proud of":
        "昨天的弱点就是今天的力量。 或者你听说过。 你不会因为饿死自己而感到可怕和虚弱，但仍然没有什么值得骄傲的",
    "Wild Kid": "野孩子",
    "Tenth of century at home, you did it. What were you even doing in there? Sleeping? Cultivating? It doesn't matter, you can proudly call yourself a hermit and stay forgotten until you decide to show yourself in light again":
        "十世纪在家里，你做到了。 你在里面做什么？ 睡眠？ 修炼？ 没关系，你可以自豪地称自己为隐士并被遗忘，直到你决定再次暴露自己",
    "Staying home for a year was nothing, this time you went half a decade staying put in your comfortable living space, caring not for the outside world. You are not sure how you feel about nobody ever checking on you..":
        "在家呆一年不算什么，这一次你在舒适的生活空间里呆了五年，不关心外面的世界。 你不确定你对没有人检查你的感觉如何..",
    "Shut In": "关门",
    Runner: "赛跑者",
    "Minor predators don't view you as a threat, which is good, but you don't want to bother them when they're hungry, though. You think you have a way to avoid the dangers of wild life, at least":
        "小型掠食者不会将您视为威胁，这很好，但是您不想在它们饿了的时候打扰它们。 你认为你有办法避免野生动物的危险，至少",
    Hikikomori: "社交退缩",
    "Hunter's Crate": "猎人的箱子",
    "All that time you spent with your cat made you understand a whole lot about the habits and behaviour of vicious predators. You feel that knowledge might prove to be useful one day":
        "与猫相处的所有时间都让您对恶毒的捕食者的习性和行为有了很多了解。 你觉得知识有一天会证明是有用的",
    "Animal Friend": "动物朋友",
    Emaciated: "瘦弱",
    "Foggy Morning": "有雾的早晨",
    "Foggy Night": "有雾的夜晚",
    "Heavy Sleeper": "深度睡眠者",
    Hermit: "隐士",
    Misty: "朦胧",
    "Misty Morning": "雾蒙蒙的早晨",
    "Misty Night": "朦胧的夜",
    "spoiled!": "宠坏了！",
    "Ability to see better in the darkness": "在黑暗中看得更清楚的能力",
    "Concentrated blue jelly. Improves metabolism": "浓缩的蓝色果冻。改善新陈代谢",
    "Discount Ticket": "优惠票",
    "Either cooking is a very difficult art, or you're just very bad at it. Leaving you alone in the kitchen is a recipe for disaster. But you won't become good without making some mistakes first":
        "要么烹饪是一门非常困难的艺术，要么你就是很糟糕。把你一个人留在厨房是灾难的秘诀。但不先犯一些错误，你就不会变好",
    "Eliminating 50000 creatures like it was nothing made you wonder whether this realm is filled with weaklings or it is you who are simply too strong to handle. It is probably the former":
        "像这样消灭50000个生物没什么让你怀疑这个领域是否充满了弱者，或者是你太强大而无法处理。大概是前者",
    "Elusion EXP Gain +15%, STR +2, HP +100": "闪避经验增加+15%，力量+2，HP+100",
    "Energy Consumtion +0.2": "能量消耗 +0.2",
    Fighter: "战斗机",
    "Firewood Pile": "木柴堆",
    "Kitchen Nightmare": "厨房噩梦",
    "Knowledge of land surfaces": "地表知识",
    "Little charm with a piece of power of the Moon imbued into it. It absorbs Moon energy":
        "蕴含着月之力量的小符咒。它吸收月亮能量",
    "Metal plating worn around the neck. Minor protection from direct frontal attacks":
        "戴在脖子上的金属镀层。对正面直接攻击的轻微保护",
    "Mitigates hit penalty while fighting in darkness": "在黑暗中战斗时减轻命中惩罚",
    "Moon Charm": "月亮护身符",
    "Neck Guard": "护颈",
    Nightsight: "夜视",
    "Nightsight lvl: 1": "夜视等级：1",
    "Raises stats during night": "在夜间提高统计数据",
    "Shop price reduction -1": "店铺降价-1",
    "Small ticket that allows you to buy things for cheaper, if you show it to the shopkeeper. Sometimes given to random customers for promotional purposes":
        "小票，如果您向店主出示，可以让您以更便宜的价格购买东西。有时出于促销目的随机提供给客户",
    Softhitter: "软打",
    "sold out": "售罄",
    "Stockpile of firewood neatly packed together for easy storage": "木柴堆放整齐，便于存放",
    Sweeper: "清道夫",
    "Sword Trainee": "剑修士",
    Topography: "地形",
    "Vital Jelly": "活力果冻",
    "You begin to start liking to fight! At the very least you can now somewhat defend yourself against mild threats and not just die in one hit":
        "你开始喜欢打架了！至少你现在可以在某种程度上保护自己免受轻微威胁，而不仅仅是一击而死",
    "You got somewhat stronger in reaching 250kg worth of punch power. You can manage some physical labor with that strength, but nothing noteworthy":
        "在达到 250 公斤的出拳力量时，你变得更强壮了。你可以用那种力量管理一些体力劳动，但没有什么值得注意的",
    "You have only just began learning the Way of the Sword, which clearly shows. You still find it hard to wield the sword properly, let alone attempting to hit something with it":
        "你才刚刚开始学习剑道，这很明显。你仍然很难正确地使用剑，更不用说试图用它击中什么了",
    '"...for that price? Are you cr..."': "“......那个价格？你是......”",
    '"Fighter"': "“战斗机”",
    '"Kitchen Nightmare"': "“厨房噩梦”",
    '"Softhitter"': '"软打"',
    '"Sweeper"': '"扫地机"',
    '"Sword Trainee"': '"剑修士"',
    "1, War EXP Gain +5%, New Title": "1、战争经验获得+5%，新称号",
    "Clear and sharp fang of a predator. It still looks dangerous": "捕食者清晰而锋利的尖牙。 看起来还是很危险",
    "Wolf Fang": "狼防",
    '"Apple Juice"': '"苹果汁"',
    "Entry level practitioner skillbook about unarmed combat": "关于徒手格斗的入门级从业者技能书",
    Martial: "武术",
    "Aggressive little bats living in the dark": "生活在黑暗中的好斗的小蝙蝠",
    "B E S T I A R Y": "最佳",
    "Attack Golem": "攻击魔像",
    "Basic and easy to wield spear used in self-defence": "用于自卫的基本且易于使用的长矛",
    "Big golem composed of straw. These golems are brittle and weak, their main purpose is to assist newbies in training":
        "稻草构成的大魔像。 这些魔像又脆又弱，它们的主要目的是帮助新手训练",
    "Brightly colored slime. It looks like it can perfectly reflect the sky":
        "颜色鲜艳的史莱姆。 看起来可以完美地倒映天空",
    "Clear Slime": "清除史莱姆",
    "Dangerous monsters have invaded the southern forest and terrorizing the villagers. Get rid of them!":
        "危险的怪物入侵了南部的森林并恐吓村民。摆脱他们！",
    "Docile rabbits, often found in plains and woods. They're difficult to catch":
        "温顺的兔子，经常在平原和树林中发现。他们很难被抓住",
    "drop table": "删除表",
    "Fighter Insignia": "战斗机徽章",
    "Golem with implanted martial prowess. Somewhat similar to a trained militant, they pose a dangerous threat to any unprepared opponent":
        "植入了武力的魔像。有点类似于训练有素的激进分子，他们对任何毫无准备的对手构成危险的威胁",
    "Guard Spear": "守卫长矛",
    "He's made of fabric": "他是用布做的",
    "Large Copper Coin": "大铜币",
    "Local currency in a form of a heavy coin. Poor people can eat for a whole day with a few of those":
        "重硬币形式的当地货币。穷人可以吃一整天",
    "luck boy": "幸运男孩",
    "Monster Eradication": "消灭怪物",
    name: "姓名",
    rank: "排行",
    "Reinforced Straw Golem": "强化稻草魔像",
    "Ring tempered by unending fighter spirit, was formerly owned by a rookie knight":
        "磨练无止境斗士的戒指，原为菜鸟骑士所有",
    "Slim golem made of paper-like material. While not as tough as other training golems, it has a light body which allows it to move faster":
        "由纸状材料制成的纤细魔像。虽然不像其他训练魔像那样坚韧，但它的身体很轻，可以让它移动得更快",
    "Slime of a very deep darkblue hue, which looks shiny under the light and almost completely dark in the shade":
        "非常深的深蓝色调的粘液，在光线下看起来有光泽，在阴影下几乎完全变黑",
    "Small docile spiders who live in damp and dark places": "生活在潮湿阴暗处的温顺小蜘蛛",
    "Small forest slimes. They hide in leaves and grass": "小型森林史莱姆。他们躲在树叶和草丛中",
    "Weakened Wolf": "虚弱的狼",
    "Weird transparent slime, bearing no distinct color. They can hide anywhere and are very difficult to notice":
        "奇怪的透明粘液，没有明显的颜色。它们可以隐藏在任何地方并且很难被发现",
    "Wolves affected by a disease or other negative influences. While not nearly as dangerous as its healthy counterpart, even in such a low state they pose danger to those who aren't careful":
        "受疾病或其他负面影响的狼。虽然不像它的健康对应物那么危险，但即使在如此低的状态下，它们也会对那些不小心的人构成危险",
    "Wolves killed": "狼被杀",
    "#5: Monster Eradication [": "#5：消灭怪物[",
    Safehouse: "安全屋",
    "in progress": "进行中",
    "This golem's joints have been binded by the rope, giving it sturdier and more stable frame":
        "这个魔像的关节被绳索捆绑，使其框架更坚固、更稳定",
    "Western Woods, The Shaded Path": "西部森林，阴凉的小路",
    "Western Woods, The Underbushes": "西部森林，灌木丛",
    "'Water Absorption'": "'吸水'",
    '"--> Enter the hidden path"': '"-->进入隐藏路径"',
    '"=> Go further into the forest"': '"=> 进一步深入森林"',
    '"Safehouse"': '"安全屋"',
    'Gate Guard: "You were given permission to proceed. Go on"': "门卫：“你被允许继续前进。继续”",
    "Heavy Hunter's Encyclopedia. There are a few entries about wild life, beasts, and mythical creatures you can encounter, the other pages are blank. You feel the urge to fill them in":
        "重猎人百科全书。 有一些关于你可以遇到的野生动物、野兽和神话生物的条目，其他页面是空白的。 你有一种想把它们填满的冲动",
    "Southern Forest, The Foliage": "南方森林，树叶",
    "Southern Forest, The Oaken Gate": "南方森林，橡木门",
    "Technique book full of fundamental knowledge about fistfighting": "充满格斗基础知识的技巧书",
    "The air here feels intimidating": "这里的空气让人感到害怕",
    "Unlocks Bestiary": "解锁动物寓言",
    "Well then..": "好吧..",
    '"=> Explore the depths"': '"=> 探索深处"',
    '"Animalis Vicipaedia"': "“动物日志”",
    '"Brawler Manual"': '"拳手手册"',
    '"Passerby: Looking for the foodstand guy? He took his stuff and went South. That one supposedly travels from place to place to sell the food he makes, doubt we\'ll see him back any time soon"':
        '"路人：找那个食摊的人？他拿了东西往南走。据说那个人到处跑来卖他做的食物，怀疑我们很快就会看到他回来"',
    '"Quartermaster"': "“军需官”",
    "Dummies may drop something special": "假人可能会掉落一些特别的东西",
    Quartermaster: "军需官",
    "You have returned more than 300 pieces of dojo supplies. How much of that stuff do they have?":
        "您已退回超过 300 件道场物品。 他们有多少这种东西？",
    "Your reflexes wielding a polearm got slightly better, at the very least you aren't dropping your weapon after every second swing anymore. You could be considered a part of a peasant spear group with your measly skills":
        "你挥舞长柄武器的反应稍微好一点，至少你不会再每挥动一秒就放下武器了。 你这可怜的技能可以被认为是农枪队的一员",
    "Bone Collector": "骨头收集器",
    "By slaying foes as much as you did, you learned how to quickly notice your enemies' weak points. This knowledge will allow you quickly and effectively dispose of those standing in your way":
        "通过像你一样杀死敌人，你学会了如何快速发现敌人的弱点。这些知识将使您能够快速有效地处理那些阻碍您的人",
    Careful: "小心",
    "Click to list known books": "单击以列出已知书籍",
    Dissector: "解剖器",
    "Fighting EXP Gain +3%": "战斗经验获得 +3%",
    "Hack and slash! 200000 foes have fallen under mighty arm! You're getting a little too comfortable on your path of destruction":
        "砍杀！ 20万敌人倒在了强大的臂膀下！你在毁灭之路上有点太自在了",
    Info: "信息",
    "Items thrown away": "扔掉的物品",
    "Medicated Bandage": "药绷带",
    "Physical Resistance +1%, New Title": "物理抗性 +1%，新称号",
    "Squashing things with a hammer or a club may seem simple, but it does require some skill to do so properly and effectively. You understand the basics but lack the strength for it, though":
        "用锤子或棍棒挤压东西看起来很简单，但它确实需要一些技巧才能正确有效地做到这一点。你了解基础知识，但缺乏力量，尽管",
    "Sterile bandage soaked in strong medical solution": "浸泡在强力医用溶液中的无菌绷带",
    "Third-Rate Shopper": "三流购物者",
    "This place looks dark": "这个地方看起来很暗",
    "Times struck by lightning": "被闪电击中的次数",
    "Village Militia": "乡村民兵",
    Years: "年",
    "You left the shop with half a thousand goods total. It's a tiny amount if you think about it - food, cooking ingredients, household tools":
        "你带着五千件货物离开了商店。如果您考虑一下，这是一个很小的数量 - 食物，烹饪原料，家用工具",
    "Alcohol consumed": "饮酒",
    "Avoiding hits to the vitals is much harder, as you found out. You must think of a way to take precautions to guarantee your own safety":
        "正如您所发现的，避免击中要害要困难得多。你必须想办法采取预防措施来保证自己的安全",
    Basher: "巴舍尔",
    "Bleed resist +8": "流血抗性 +8",
    "2, Energy Effectiveness +1%, Sharp Eye EXP Gain +10%, New Title": "2、能量效率+1%、锐眼EXP增益+10%、新称号",
    "7%, STR +2, Perception EXP Gain +10%, Energy Effectiveness +1%": "7%，力量+2，感知经验增加+10%，能量效率+1%",
    '"Basher"': '"破坏者"',
    '"Bone Collector"': '"骨头收集器"',
    '"Careful"': "“小心”",
    '"Dissector"': '"解剖器"',
    '"Moon Charm"': '"月亮魅力"',
    '"Sun Charm"': '"太阳魅力"',
    '"Third-Rate Shopper"': '"三流购物者"',
    '"Village Militia"': "“乡村民兵”",
    '"...right, I\'ll take 11, put them in..."': '"...对了，我拿11，把它们放进去..."',
    "Basic Alchemy Set": "基本炼金术套装",
    "Wide variety of aberrant glassware and precision tools for all types of entry level alchemy-based manipulations. A necessity for making basic medicine, pills, poisons, elixirs and everything inbetween":
        "各种各样的异常玻璃器皿和精密工具，适用于所有类型的入门级炼金术操作。 制作基本药物、丹药、毒药、丹药以及介于两者之间的一切的必需品",
    "Acquiring a whole 1 Gold coin worth of money is a lot for someone as pathetic you. You could survive with that amount for a year!":
        "对于像你这样可悲的人来说，获得一整枚 1 金币的钱是很多的。 你可以用这个数量生存一年！",
    Beggar: "乞丐",
    Bully: "恶霸",
    Butterfly: "蝴蝶",
    "Critical Damage +10%, New Title": "暴击伤害 +10%，新称号",
    "Decreases waiting time between throws": "减少两次投掷之间的等待时间",
    "Mastery of throwing": "精通投掷",
    Ordinary: "普通",
    "Slightly increases throwing damage": "略微增加投掷伤害",
    Throwing: "投掷",
    "You always thought knives were cool. You aren't nearly precise with your knifework yet, But you will learn":
        "你一直认为刀很酷。 你的刀工还不够精确，但你会学到",
    "You have graduated from being a mere Weakling. You feel powerful! You still find it difficult to stand your own in a fight":
        "你已经从一个弱者毕业了。 你感觉很强大！ 你仍然觉得很难在战斗中站稳脚跟",
    "You're finally getting somewhere, having a basic set of skills and minor achievements. You could even be called reliable by some. But once again, you are feeling like a part of the mass":
        "你终于到达某个地方，拥有一套基本的技能和小成就。 有些人甚至会说你可靠。 但再一次，你感觉自己是大众的一部分",
    '"Beggar"': '"乞丐"',
    '"Bully"': '"恶霸"',
    '"Butterfly"': '"蝴蝶"',
    '"Ordinary"': '"普通"',
    "10%, STR +1, Poison Resistance EXP Gain +10%, Gluttony EXP Gain +15%,":
        "10%, 力量 +1, 毒抗经验增加 +10%, 饮食经验增加 +15%,",
    "15, HP +35, Survival EXP Gain +15%": "15、生命值 +35、生存经验获得 +15%",
    "There doesn't seem to be anything of interest left in this area": "这个区域似乎没有任何有趣的东西了",
    "Your cat found something for you": "你的猫为你找到了一些东西",
    "Another one of your cat's gifts": "另一个你的猫的礼物",
    "Something was lying in the corner of the room. Probably cat's": "有什么东西躺在房间的角落里。 可能是猫的",
    "Your cat dropped something before you": "你的猫在你之前掉了什么东西",
    Clearbane: "清毒",
    Drakevine: "龙脉",
    "Herb of clarity. This herb is often used in making of high quality incense":
        "清明药草。 这种药草常用于制作高品质的香",
    "Herb of flexibility. There are rumors of an old hermit growing these herbs under the hidden mountain":
        "柔韧药草。 有传言说一位老隐士在隐藏的山下种植这些草药",
    "Herb of might. This fiery herb is rumored to improve muscle density":
        "威力药草。 传闻这种火热的草药可以提高肌肉密度",
    "Herb of swiftness. Loved by Serpents, this herb slightly raises one's reaction time":
        "速成药草。 受到蛇类的喜爱，这种药草可以稍微提高一个人的反应时间",
    Morgia: "莫吉亚",
    Springsweed: "春草",
    "Permanently increases AGL by +1": "永久提高 敏捷 +1",
    "Permanently increases INT by +1": "永久提高 智力 +1",
    "Permanently increases SPD by +1": "永久提高 速度 +1",
    "Permanently increases STR by +1": "永久提高 力量 +1",
    "Clover of the rare breed. Whoever is able to find even one will be blessed by the Gods of Luck":
        "稀有品种的三叶草。 能找到的人，都会得到幸运之神的祝福",
    "Damage Reduction +1%, Pain Resistance EXP Gain +20%, Poison Resistance EXP Gain +20%, New Title":
        "伤害减免+1%，痛苦抗性经验值获得+20%，毒抗性经验值获得+20%，新称号",
    "Half ton punch isn't bad, you can successfully push a body a few meters back if you hit correctly in the right spot. This only applies to entities without strong physical protection, you are no match to anything with real strength":
        "半吨重拳还不错，如果你在正确的位置击中正确，你可以成功地将身体向后推几米。 这只适用于没有强大物理保护的实体，你不是任何真正强大的东西",
    "It seems like you can eat a lot of awful stuff and feel fine afterwards. Is that really worth it? You think it is. The taste doesn't get any better though...":
        "看起来你可以吃很多可怕的东西，然后感觉很好。 这真的值得吗？ 你认为是。 味道并没有变得更好......",
    Jawbreaker: "破颚者",
    "Lucky Clover": "幸运四叶草",
    Malnourished: "营养不良",
    "Menacing fang of the wolf, in the form of a pendant. Wearing this can help to repell and scare away minor beasts":
        "凶恶的狼牙，以吊坠的形式出现。 戴上它可以帮助击退和吓跑小野兽",
    Omnivore: "杂食动物",
    "Red Die": "红色模具",
    Rookie: "菜鸟",
    Temperance: "节制",
    "Wolf Fang Necklace": "狼牙项链",
    "You are clearly undereating, yet, eating something other than bland untasty bread leaves you in a positive mood":
        "您显然饮食不足，但是，除了平淡难吃的面包之外，吃其他东西会让您心情愉快",
    "A novice fighter. You have a knack for martial arts but it doesn't amount to much yet":
        "一个新手战士。 你有武术的诀窍，但还不够",
    "Ability to resist temptation of worldly possessions": "抗拒世俗诱惑的能力",
    "Assorted Grains": "杂粮",
    "Beast Class DEF +15": "兽类防御 +15",
    "Buckwheat, sunflower seeds, oats, rye... Various grains, seeds and nuts in very small quantities as such making them not very useful for pretty much anything":
        "荞麦、葵花籽、燕麦、黑麦……各种谷物、种子和坚果的数量非常少，因此它们对几乎任何东西都不是很有用",
    "5%, Energy Effectiveness +2%, New Title": "5%, 能量效率 +2%, 新称号",
    "8%, All Masteries EXP Gain +10%, New Title": "8%, 所有精通经验获得 +10%, 新称号",
    '"Buckler"': '"圆盾"',
    '"Jawbreaker"': "“破颚者”",
    '"Malnourished"': '"营养不良"',
    '"Omnivore"': "“杂食动物”",
    '"Rookie"': '"菜鸟"',
    "You're too occupied with something else": "你太忙于别的事情了",
    Snow: "雪",
    "This fairy tale is about a wolf who eats so much salted meat she becomes trapped in the butcher's cellar.":
        "这个童话故事是关于一只狼吃了太多咸肉，她被困在屠夫的地窖里。",
    "Watching others": "看看其它",
    "You feel colder": "你感觉更冷",
    "You're warming up": "你在热身",
    Plain: "平原",
    "Attic spider ->": "阁楼蜘蛛- >",
    "Die with 6 sides. Brings luck": "死有 6 个面。 带来好运",
    '"Rusty Dagger"': "“生锈的匕首”",
    "[Winter]": "[冬季]",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    MED: "药",
    MAT: "材料",

    //树游戏
    "Loading...": "加载中...",
    ALWAYS: "一直",
    "HARD RESET": "硬重置",
    "Export to clipboard": "导出到剪切板",
    INCOMPLETE: "不完整",
    HIDDEN: "隐藏",
    AUTOMATION: "自动",
    NEVER: "从不",
    ON: "打开",
    OFF: "关闭",
    SHOWN: "显示",
    "Play Again": "再次游戏",
    "Keep Going": "继续",
    "The Modding Tree Discord": "模型树Discord",
    "You have": "你有",
    "It took you {{formatTime(player.timePlayed)}} to beat the game.":
        "花费了 {{formatTime(player.timePlayed)}} 时间去通关游戏.",
    "Congratulations! You have reached the end and beaten this game, but for now...":
        "恭喜你！ 您已经结束并通关了本游戏，但就目前而言...",
    "Main Prestige Tree server": "主声望树服务器",
    "Reach {{formatWhole(ENDGAME)}} to beat the game!": "达到 {{formatWhole(ENDGAME)}} 去通关游戏!",
    "Loading... (If this takes too long it means there was a serious error!)←":
        "正在加载...（如果时间太长，则表示存在严重错误！）←",
    "Main\n\t\t\t\tPrestige Tree server": "主\n\t\t\t\t声望树服务器",
    "The Modding Tree\n\t\t\t\t\t\t\tDiscord": "模型树\n\t\t\t\t\t\t\tDiscord",
    "Please check the Discord to see if there are new content updates!": "请检查 Discord 以查看是否有新的内容更新！",
    aqua: "水色",
    "AUTOMATION, INCOMPLETE": "自动化，不完整",
    "LAST, AUTO, INCOMPLETE": "最后，自动，不完整",
    NONE: "无",
    "P: Reset for": "P: 重置获得",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
    "": "",
};

//需处理的前缀
var cnPrefix = {
    "(-": "(-",
    "(+": "(+",
    "(": "(",
    "-": "-",
    "+": "+",
    " ": " ",
    ": ": "： ",
    "\n": "",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": "",
    //树游戏
    "Show Milestones: ": "显示里程碑：",
    "Autosave: ": "自动保存: ",
    "Offline Prod: ": "离线生产: ",
    "Completed Challenges: ": "完成的挑战: ",
    "High-Quality Tree: ": "高质量树贴图: ",
    "Offline Time: ": "离线时间: ",
    "Theme: ": "主题: ",
    "Anti-Epilepsy Mode: ": "抗癫痫模式：",
    "In-line Exponent: ": "直列指数：",
    "Single-Tab Mode: ": "单标签模式：",
    "Time Played: ": "已玩时长：",
    "???: ": "???: ",
    "/ dodge chance: ": "/ 闪避几率：",
    "Critical chance: ": "暴击几率: ",
    "INT: ": "智力: ",
    "hp: ": "生命值: ",
    "SPD: ": "速度: ",
    "rank: ": "排行: ",
    "STR: ": "力量: ",
    "Straw dummy": "稻草人偶",
    "exp: ": "经验: ",
    "AGL: ": "敏捷: ",
    "Area: Somewhere ": "地区：某处 ",
    "Area: Training Grounds ": "区域：训练场",
    "Last save: ": "上次保存 ",
    "Class: ": "类型: ",
    "Rarity: ": "稀有度: ",
    "DEF: ": "防御: ",
    "lvl: ": "等级: ",
    "There is a cat. Pets: ": "有一只猫。 拍拍：",
    "　exp: ": "　经验: ",
    '"Patting"': '"拍拍"',
    "Famine lvl: ": "饥荒等级：",
    "Leveled Up: ": "升级：",
    "Rank: ": "等级: ",
    "Sleeping lvl: ": "睡眠等级：",
    "| AGL +": "| 敏捷 +",
    "| HP +": "| 生命值 +",
    "| INT +": "| 智力 +",
    "EXP: ": "经验: ",
    "Leveled Up ": "升级 ",
    "STR +": "力量 +",
    "Sword Mastery EXP gain +": "剑精通经验获得+",
    "Literacy EXP gain +": "读写经验增益 +",
    "AGL +": "敏捷 +",
    "EXP Gain +": "经验增益 +",
    "Fighting lvl: ": "战斗等级: ",
    "Gluttony lvl: ": "饮食等级：",
    "HP +": "生命值 +",
    "INT +": "智力 +",
    "Literacy lvl: ": "识字等级：",
    "Meditation lvl: ": "冥想等级：",
    "Pain Resistance lvl: ": "抗痛等级：",
    "SAT +": "能量 +",
    "Perk lvl ": "等级 ",
    "SPD +": "速度 +",
    "Death lvl: ": "死亡等级: ",
    "Knife M lvl: ": "刀法精通等级：",
    "Sword M lvl: ": "剑术精通等级: ",
    "Tailoring EXP Gain +": "裁缝经验增益 +",
    '"Instructor: For all your stuff I can fetch you': '"指导员：你所有的东西给我，我可以给你 ',
    "Air Absorption lvl: ": "空气吸收等级：",
    "Area: Western forest hunting area / ": "面积：西部森林狩猎区",
    "Judgement lvl: ": "判断等级：",
    "Duration: ": "持续时间：",
    "Sharp Eye lvl: ": "锐眼等级：",
    "Water Absorption lvl: ": "吸水等级：",
    "Walking lvl: ": "步行等级: ",
    "Exp +": "经验 +",
    "Unarmed M lvl: ": "徒手精通 等级：",
    "War lvl: ": "战争等级: ",
    "Danger Sense lvl: ": "危险感知等级：",
    "Shield M lvl: ": "盾牌精通等级: ",
    "Survival lvl: ": "生存等级：",
    "Hammer M lvl: ": "锤子精通等级：",
    "Area: Your basement / ": "区域：您的地下室 /",
    "Blunt DEF +": "钝器防御 +",
    "Edged DEF +": "边缘防御 +",
    "Piercing DEF +": "穿刺防御 +",
    "Patience lvl: ": "耐心等级：",
    "Toughness lvl: ": "韧性等级：",
    "'Patting'": "'拍拍'",
    "Passive Patting EXP +": "被动拍拍经验 +",
    "Patting EXP gain +": "拍打经验增益 +",
    "Patting lvl: ": "拍拍等级: ",
    "Perception lvl: ": "认知等级：",
    "Physical ATK +": "物理攻击+",
    "Physical DEF +": "物理防御 +",
    "Polearm M lvl: ": "长柄武器精通等级：",
    "Trading lvl: ": "交易等级：",
    "Dark RES +": "深红+",
    "Danger Sense EXP Gain +": "危机感经验增益 +",
    "Crafting lvl: ": "工艺等级: ",
    "Cooking lvl: ": "烹饪等级: ",
    "Alchemy lvl: ": "炼金术等级：",
    "Gambling lvl: ": "赌博等级：",
    "Fire Absorption lvl: ": "火焰吸收等级：",
    "Greed EXP gain +": "贪婪经验增益 +",
    "Evil Class DEF +": "邪恶职业防御 +",
    "Greed lvl: ": "贪婪等级：",
    "Harvesting lvl: ": "收获等级：",
    "LUCK +": "幸运 +",
    "Max SAT +": "最大能量 +",
    "MAX SAT +": "最大能量 +",
    "Cooking EXP gain +": "烹饪经验增益 +",
    "MAX HP +": "最大生命值 +",
    "Alchemy EXP gain +": "炼金经验获得 +",
    "Poison resist +": "毒抗+",
    "Tailoring tool lvl: ": "裁缝工具等级：",
    "Sleep EXP gain +": "睡眠经验增益 +",
    "Days ": "天 ",
    "Poison Resistance lvl: ": "抗毒等级：",
    "Disassembly lvl: ": "拆解等级：",
    "Cold Resistance lvl: ": "抗寒等级：",
    "Bleeding Resistance lvl: ": "流血抗性等级：",
    "Topography lvl: ": "地形等级：",
    "Martial Mastery EXP gain ": "武学精通经验增益 ",
    "P Skillbook (": "修行者技能书（",
    "Nightsight lvl: ": "夜视等级：",
    "Area: Southern forest hunting area / ": "区域：南部森林狩猎区 / ",
    "Throwing lvl: ": "投掷等级: ",
    "Temperance lvl: ": "节制: ",
    "": "",
    "": "",
    "": "",
    "": "",
};

//需处理的后缀
var cnPostfix = {
    ":": "：",
    "：": "：",
    ": ": "： ",
    "： ": "： ",
    "/s)": "/s)",
    "/s": "/s",
    ")": ")",
    "%": "%",
    "                   ": "",
    "                  ": "",
    "                 ": "",
    "                ": "",
    "               ": "",
    "              ": "",
    "             ": "",
    "            ": "",
    "           ": "",
    "          ": "",
    "         ": "",
    "        ": "",
    "       ": "",
    "      ": "",
    "     ": "",
    "    ": "",
    "   ": "",
    "  ": "",
    " ": " ",
    "\n": "",
    OFF: "关闭",
    " Throwing Damage": " 投掷伤害",
    " Items returned back to dojo": " 物品退回道场",
    "Buying price": "购买价格",
    Reputation: "名声",
    " Slime died": " 史莱姆死了",
    " Slime missed": "史莱姆未命中",
    " Slime ->": " 史莱姆 ->",
    " Slime -> x2(": " 史莱姆 -> x2(",
    "": "",
    "": "",
    "": "",
    '"Malnourished"': '"营养不良"',
    Malnourished: "营养不良",
    "You are clearly undereating, yet, eating something other than bland untasty bread leaves you in a positive mood":
        "你仍然吃得太少，然而吃一些平淡无味的面包以外的东西使你心情美好",
};

//需排除的，正则匹配
var cnExcludeWhole = [
    /^(\d+)$/,
    /^x(\d+)$/,
    /^\/ (\d+)$/,
    /^([\d\.]+)\/([\d\.]+)\/([\d\.]+) ([\d\.]+)\:([\d\.]+)$/,
    /^([\d\.]+)\/([\d\.]+)\/([\d\.]+) ([\d\.]+)\:([\d\.]+)\:([\d\.]+)$/,
    /^([\d\.]+)e(\d+)$/,
    /^\-([\d\.,]+)\/([\d\.,]+)$/,
    /^\-([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.,]+) \/ ([\d\.,]+)$/,
    /^([\d\.]+)K\/([\d\.]+)K$/,
    /^([\d\.]+)K\/([\d\.]+)K $/,
    /^([\d\.]+)K\/([\d\.]+)K　$/,
    /^([\d\.,]+)\/(.+)$/,
    /^([\d\.,]+)\/(.+)$/,
    /^([\d\.,]+)\/([\d\.,]+)\/([\d\.,]+) ([\d\.,]+):([\d\.,]+)  $/,
    /^([\d\.,]+)$/,
    /^([\d\.]+)e([\d\.,]+)$/,
    /^[\u4E00-\u9FA5]+$/,
];
var cnExcludePostfix = [];

//正则替换，带数字的固定格式句子
//纯数字：(\d+)
//逗号：([\d\.,]+)
//小数点：([\d\.]+)
//原样输出的字段：(.+)
//换行加空格：\n(.+)
var cnRegReplace = new Map([
    [/^lvl:(.+) \'Beast (.+)\'$/, "等级:$1 '野兽 $2'"],
    [/^lvl:(.+) \'Evil (.+)\'$/, "等级:$1 '邪恶 $2'"],
    [/^lvl:(.+) \'Glass Bones\'$/, "等级:$1 '玻璃骨头'"],
    [/^lvl:(.+) \'Iron Stomach\'$/, "等级:$1 '铁胃'"],
    [/^lvl:(.+) \'Garbage Eater\'$/, "等级:$1 '垃圾吞噬者'"],
    [/^lvl:(.+) \'Bag Of Bones\'$/, "等级:$1 '骨头袋'"],
    [/^lvl:(.+) \'Fighter\'$/, "等级:$1 '战斗者'"],
    [/^lvl:(.+) \'Sword Trainee\'$/, "等级:$1 '剑修士'"],
    [/^lvl:(.+) \'Bone Collector\'$/, "等级:$1 '骨头收集者'"],
    [/^lvl:(.+) \'Basher\'$/, "等级:$1 '破坏者'"],
    [/^lvl:(.+) \'Third-Rate Shopper\'$/, "等级:$1 '三流购物者'"],
    [/^lvl:(.+) \'Village Militia\'$/, "等级:$1 '村庄民兵'"],
    [/^lvl:(.+) \'Bully\'$/, "等级:$1 '恶霸'"],
    [/^lvl:(.+) \'Butterfly\'$/, "等级:$1 '蝴蝶'"],
    [/^lvl:(.+) \'Ordinary\'$/, "等级:$1 '普通'"],
    [/^lvl:(.+) \'Beggar\'$/, "等级:$1 '乞丐'"],
    [/^lvl:(.+) \'Careful\'$/, "等级:$1 '小心'"],
    [/^lvl:(.+) \'Dissector\'$/, "等级:$1 '解剖器'"],
    [/^lvl:(.+) \'Sweeper\'$/, "等级:$1 '清道夫'"],
    [/^lvl:(.+) \'Kitchen Nightmare\'$/, "等级:$1 '厨房噩梦'"],
    [/^lvl:(.+) \'Softhitter\'$/, "等级:$1 '软打者'"],
    [/^lvl:(.+) \'Jawbreaker\'$/, "等级:$1 '破颚者'"],
    [/^lvl:(.+) \'Rookie\'$/, "等级:$1 '菜鸟'"],
    [/^lvl:(.+) \'Omnivore\'$/, "等级:$1 '杂食动物'"],
    [/^lvl:(.+) \'Malnourished\'$/, "等级:$1 '营养不良'"],
    [/^lvl:(.+) \'Pathetic\'$/, "等级:$1 '可怜的'"],
    [/^lvl:(.+) \'Aspiring Ronin\'$/, "等级:$1 '有抱负的浪人'"],
    [/^lvl:(.+) \'Starving Child\'$/, "等级:$1 '饥饿的孩子'"],
    [/^lvl:(.+) \'Punching Bag\'$/, "等级:$1 '沙袋'"],
    [/^lvl:(.+) \'Quartermaster\'$/, "等级:$1 '军需官'"],
    [/^lvl:(.+) \'Weakling\'$/, "等级:$1 '弱者'"],
    [/^lvl:(.+) \'Safehouse\'$/, "等级:$1 '安全屋'"],
    [/^lvl:(.+) \'Jogger\'$/, "等级:$1 '慢跑者'"],
    [/^lvl:(.+) \'Bat Eyes\'$/, "等级:$1 '蝙蝠眼'"],
    [/^lvl:(.+) \'Animal Friend\'$/, "等级:$1 '动物朋友'"],
    [/^lvl:(.+) \'Hikikomori\'$/, "等级:$1 '社交退缩'"],
    [/^lvl:(.+) \'Hermit\'$/, "等级:$1 '隐士'"],
    [/^lvl:(.+) \'Runner\'$/, "等级:$1 '赛跑者'"],
    [/^lvl:(.+) \'Wild Kid\'$/, "等级:$1 '野孩子'"],
    [/^lvl:(.+) \'Shut In\'$/, "等级:$1 '关门'"],
    [/^lvl:(.+) \'Emaciated\'$/, "等级:$1 '瘦弱'"],
    [/^lvl:(.+) \'Heavy Sleeper\'$/, "等级:$1 '深度睡眠者'"],
    [/^lvl:(.+) \'Sleeper\'$/, "等级:$1 '嗜睡者'"],
    [/^lvl:(.+) \'Apprentice\'$/, "等级:$1 '学徒'"],
    [/^lvl:(.+) \'Stick Kid\'$/, "等级:$1 '棍棒小子'"],
    [/^lvl:(.+) \'Trained Civilian\'$/, "等级:$1 '受过训练的平民'"],
    [/^lvl:(.+) \'Suspicious Eyes\'$/, "等级:$1 '可疑的眼睛'"],
    [/^lvl:(.+) \'Pest Control\'$/, "等级:$1 '害虫防治'"],
    [/^lvl:(.+) \'Decadent\'$/, "等级:$1 '颓废'"],
    [/^lvl:(.+) \'Fallen\'$/, "等级:$1 '堕落'"],
    [/^lvl:(.+) \'Nameless\'$/, "等级:$1 '无名'"],
    [/^lvl:(.+) \'Uneducated\'$/, "等级:$1 '目不识丁'"],
    [/^lvl:(.+) \'Hungry Child\'$/, "等级:$1 '饥饿的孩子'"],
    [/^lvl:(.+) \'Unknown\'$/, "等级:$1 '未知'"],
    [/^lvl:(.+) \'Valley Cat\'$/, "等级:$1 '谷猫'"],
    [/^lvl:(.+) \'Wary\'$/, "等级:$1 '警惕'"],
    [/^lvl:(.+) \'Wimp\'$/, "等级:$1 '懦夫'"],
    [/^lvl:(.+) \'Thrasher\'$/, "等级:$1 '痛击者'"],
    [/^lvl:(.+) \'Illiterate\'$/, "等级:$1 '文盲'"],
    [/^lvl:(.+) \'Walker\'$/, "等级:$1 '步行者'"],
    [/^lvl:(.+) \'Prick\'$/, "等级:$1 '刺'"],
    [/^lvl:(.+) \'Civilian\'$/, "等级:$1 '平民'"],
    [/^lvl:(.+) \'Scrawny\'$/, "等级:$1 '骨瘦如柴'"],
    [/^lvl:(.+) \'Initiate\'$/, "等级:$1 '开始'"],
    [/^lvl:(.+) \'Malnourished\'$/, "等级:$1 '营养不良'"],
    [/^lvl:(.+) \'Nobody\'$/, "等级:$1 '无名之辈'"],
    [/^Restored (.+) hp$/, "恢复 $1 生命值"],
    [/^Restored (.+) energy$/, "恢复 $1 能量"],
    [/^energy: (.+) eff: (.+)$/, "能量：$1 效率：$2"],
    [/^Grants (.+) EXP$/, "授予 $1 经验"],
    [/^You have (.+) points$/, "你有 $1 点数"],
    [/^\"Notice \#([\d\.]+)\"$/, '"注意 #$1"'],
    [/^Next at (.+) points$/, "下一个在 $1 点数"],
    [/^lvl ([\d\.]+)$/, "等级 $1"],
    [/^([\d\.]+), EXP Gain \+([\d\.]+)\%$/, "$1、经验增益+$2%"],
    [/^([\d\.]+), EXP Gain \+([\d\.]+)\%, New Title$/, "$1，经验增益+$2%, 新称号"],
    [/^([\d\.]+), SAT \+([\d\.]+), New Title$/, "$1，能量 +$2, 新称号"],
    [/^([\d\.]+)\/sec$/, "$1/秒"],
    [/^requires ([\d\.]+) more research points$/, "需要$1个研究点"],
    [/^(\d+), HP \+(\d+)$/, "$1, 生命值 +$2"],
    [/^(\d+) Royal points$/, "$1 皇家点数"],
    [/^Cost: (\d+) RP$/, "成本：$1 皇家点数"],
    [/^Usages: (\d+)\/$/, "用途：$1/"],
    [/^workers: (\d+)\/$/, "工人：$1/"],
]);

function Chs() {
    this.ttl;
    this.sl = function () {};
    this.data = {};
    this.onStay = function () {};
    this.onEnter = function () {};
    this.onLeave = function () {};
    this.onScout = function () {};
    this.sector = [];
}

chss.t1 = new Chs();
chss.t1.id = 101;
chss.t1.sl = function () {
    global.lst_loc = 101;
    global.flags.inside = true;
    d_loc("Dojo, training area");
    chs("???: Kid", true);
    chs('"..."', false).addEventListener("click", function () {
        global.time += DAY;
        appear(dom.ctr_1);
        chs("???: Quit daydreaming", true);
        chs('"?"', false).addEventListener("click", function () {
            appear(dom.d0);
            chs("???: You have training to complete", true);
            chs('"!"', false).addEventListener("click", function () {
                appear(dom.inv_ctx);
                appear(dom.d_lct);
                chs("???: Grab your stuff and get to it", true);
                chs('"..."', false).addEventListener("click", function () {
                    appear(dom.ct_ctrl);
                    smove(chss.tdf, false);
                    giveItem(wpn.stk1);
                    giveItem(item.hrb1, 15);
                    global.flags.aw_u = true;
                });
            });
        });
    });
};
if (global.flags.gameone === false) {
    global.current_l = chss.t1;
    smove(chss.t1);
    giveFurniture(furniture.frplc, null, false);
    let _b = giveFurniture(furniture.bed1, null, false);
    home.bed = _b;
}

chss.tdf = new Chs();
chss.tdf.id = 102;
chss.tdf.sl = function () {
    global.lst_loc = 102;
    global.flags.inside = true;
    clr_chs();
    if (!global.flags.dmap) {
        appear(dom.gmsgs);
        global.flags.dmap = true;
    }
    chs('"Select the difficulty"', true);
    if (!global.flags.tr1_win)
        chs('"Easiest"', false).addEventListener("click", function () {
            chs('"You are fighting training dummies"', true);
            if (!global.flags.dm1ap) {
                appear(dom.d1m);
                global.flags.dm1ap = true;
            }
            area_init(area.trn1);
        });
    if (!global.flags.tr2_win)
        chs('"Easy"', false).addEventListener("click", function () {
            chs('"You are fighting training dummies"', true);
            if (!global.flags.dm1ap) {
                appear(dom.d1m);
                global.flags.dm1ap = true;
            }
            area_init(area.trn2);
        });
    if (!global.flags.tr3_win)
        chs('"Normal"', false).addEventListener("click", function () {
            chs('"You are fighting training dummies"', true);
            if (!global.flags.dm1ap) {
                appear(dom.d1m);
                global.flags.dm1ap = true;
            }
            area_init(area.trn3);
        });
};
chss.tdf.onEnter = function () {
    area_init(area.nwh);
};

chss.t2 = new Chs();
chss.t2.id = 103;
chss.t2.sl = function () {
    global.lst_loc = 103;
    global.flags.inside = true;
    chs(
        '"Instructor: ' +
            select(["Good", "Nice", "Great", "Excellent"]) +
            " " +
            select(["job", "work"]) +
            " kid! Here's the reward for completing the course\"",
        true,
        "lime"
    );
    chs('"->"', false).addEventListener("click", function () {
        if (global.flags.tr1_win === true && !global.flags.rwd1) {
            global.flags.rwd1 = true;
            giveItem(item.appl, 4);
            giveItem(item.hrb1, 5);
            smove(chss.tdf);
        } else if (global.flags.tr2_win === true && !global.flags.rwd2) {
            global.flags.rwd2 = true;
            giveItem(item.brd, 2);
            giveItem(item.hrb1, 5);
            giveItem(eqp.sndl);
            smove(chss.tdf);
        } else if (global.flags.tr3_win === true && !global.flags.rwd3) {
            global.flags.rwd3 = true;
            let itm = giveItem(eqp.vst);
            itm.dp *= 0.7;
            if (global.flags.m_un === true) giveItem(item.cp, 10);
        }
        if (!global.flags.tr3_win || !global.flags.tr2_win || !global.flags.tr1_win) smove(chss.tdf);
        else {
            smove(chss.t3);
            giveTitle(ttl.inn);
        }
    });
};

chss.t3 = new Chs();
chss.t3.id = 104;
chss.t3.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, lobby");
    global.lst_loc = 104;
    global.flags.inside = true;
    if (global.flags.nbtfail) {
        chs('"Instructor: You got beaten up by an inanimated dummy?! Pay attention to your condition!"', true);
        chs('"..."', false).addEventListener("click", () => {
            global.flags.nbtfail = false;
            clr_chs();
            smove(chss.tdf, false);
            giveItem(item.hrb1, 4);
        });
    } else {
        if (!global.flags.dj1end) {
            chs(
                '"Instructor: Your training is over for today, you did well. As a reward, select one of these skill manuals to practice. The better your understanding, the stronger you will be in battle"',
                true
            );
            chs('"Practitioner Skillbook (Swords)"', false).addEventListener("click", () => {
                giveItem(item.skl1);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
            chs('"Practitioner Skillbook (Knives)"', false).addEventListener("click", () => {
                giveItem(item.skl2);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
            chs('"Practitioner Skillbook (Axes)"', false).addEventListener("click", () => {
                giveItem(item.skl3);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
            chs('"Practitioner Skillbook (Spears)"', false).addEventListener("click", () => {
                giveItem(item.skl4);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
            chs('"Practitioner Skillbook (Hammers)"', false).addEventListener("click", () => {
                giveItem(item.skl5);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
            chs('"Practitioner Skillbook (Martial)"', false).addEventListener("click", () => {
                giveItem(item.skl6);
                global.flags.dj1end = true;
                smove(chss.lsmain1);
            });
        } else if (global.flags.trnex1 === true && !global.flags.trnex2) {
            chs(
                "\"Instructor: Hahahhha! What a great disciple! That's not the dedication most of the other disciples have! Take this, it'll help you in your future endeavours\"",
                true,
                "yellow"
            );
            chs('"Thanks teacher!"', false).addEventListener("click", () => {
                giveItem(acc.snch);
                smove(chss.lsmain1);
                global.flags.trnex2 = true;
            });
        } else {
            chs(
                select([
                    '"Instructor: Back already?"',
                    "You notice other dojo disciples diligently train",
                    "Pieces of broken training dummies are scattered on the floor",
                ]),
                true
            );
            chs('"Dojo infoboard"', false).addEventListener("click", () => {
                smove(chss.djinf, false);
            });
            chs('"Destroy more dummies"', false).addEventListener("click", () => {
                smove(chss.return1, false);
            });
            if (global.flags.dj1end === true && you.lvl >= 10 && !global.flags.trne1e1)
                chs('"Challenge a stronger opponent"', false).addEventListener("click", () => {
                    chs('"You are facing a golem"', true);
                    area_init(area.trne1);
                    chs('"<= Escape"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (global.flags.trne1e1 && !global.flags.trne2e1)
                chs('"Challenge an even stronger opponent"', false, "cornflowerblue").addEventListener("click", () => {
                    chs('"You are facing a golem"', true);
                    area_init(area.trne2);
                    chs('"<= Escape"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (global.flags.trne2e1 && !global.flags.trne3e1)
                chs('"Challenge a dangerous opponent"', false, "crimson").addEventListener("click", () => {
                    chs('"You are facing a golem"', true);
                    area_init(area.trne3);
                    chs('"<= Escape"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (global.flags.trne3e1 && !global.flags.trne4e1)
                chs('"Challenge a powerful opponent"', false, "red").addEventListener("click", () => {
                    chs('"You are facing a golem"', true);
                    area_init(area.trne4);
                    chs('"<= Escape"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (global.flags.dj1end)
                chs('"Turn in dojo gear"', false).addEventListener("click", () => {
                    chs(
                        "\"Instructor: You can return whatever you punched off of dummies and get coin for it, it's dojo's equipment after all. Or you can keep and use for it yourself, the choice is yours\"",
                        true
                    );
                    chs('"Return the rags"', false).addEventListener("click", () => {
                        let dlr = 0;
                        stash = [];
                        verify = true;
                        for (let a in inv) {
                            if (inv[a].id === wpn.knf1.id && you.eqp[0].data.uid !== inv[a].data.uid) {
                                stash.push(inv[a]);
                                dlr += 1;
                            }
                        }
                        for (let a in inv) {
                            if (inv[a].id === wpn.wsrd2.id && you.eqp[0].data.uid !== inv[a].data.uid) {
                                stash.push(inv[a]);
                                dlr += 3;
                            }
                        }
                        for (let a in inv) {
                            if (inv[a].id === eqp.brc.id) {
                                verify = true;
                                for (let b in you.eqp) if (you.eqp[b].data.uid === inv[a].data.uid) verify = false;
                                if (verify === true) {
                                    stash.push(inv[a]);
                                    dlr += 1;
                                }
                            }
                        }
                        for (let a in inv) {
                            if (inv[a].id === eqp.vst.id) {
                                verify = true;
                                for (let b in you.eqp) if (you.eqp[b].data.uid === inv[a].data.uid) verify = false;
                                if (verify === true) {
                                    stash.push(inv[a]);
                                    dlr += 1;
                                }
                            }
                        }
                        for (let a in inv) {
                            if (inv[a].id === eqp.pnt.id) {
                                verify = true;
                                for (let b in you.eqp) if (you.eqp[b].data.uid === inv[a].data.uid) verify = false;
                                if (verify === true) {
                                    stash.push(inv[a]);
                                    dlr += 1;
                                }
                            }
                        }
                        for (let a in inv) {
                            if (inv[a].id === eqp.bnd.id) {
                                verify = true;
                                for (let b in you.eqp) if (you.eqp[b].data.uid === inv[a].data.uid) verify = false;
                                if (verify === true) {
                                    stash.push(inv[a]);
                                    dlr += 1;
                                }
                            }
                        }
                        if (dlr === 0) chs('"Instructor: There\'s nothing I can take from you"', true);
                        else {
                            chs(
                                '"Instructor: For all your stuff I can fetch you ' +
                                    dlr +
                                    " " +
                                    dom.coincopper +
                                    ' copper. How does that sound?"',
                                true
                            );
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                msg(stash.length + " Items returned back to dojo", "ghostwhite");
                                global.stat.ivtntdj += stash.length;
                                giveWealth(dlr);
                                for (let a in stash) removeItem(stash[a]);
                                if (global.stat.ivtntdj >= 300) giveTitle(ttl.tqtm);
                                smove(chss.t3, false);
                            });
                        }
                        chs('"<= Go back"', false).addEventListener("click", () => {
                            smove(chss.t3, false);
                        });
                    });
                    chs('"<= Go back"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (global.flags.djmlet && getDay(1) == "Sunday") {
                chs('"Grab a serving of free food"', false, "lime").addEventListener("click", () => {
                    if (getDay(1) == "Sunday") {
                        msg(select(["*Chow*", "*Munch*", "*Crunch*", "*Gulp*"]), "lime");
                        msg(
                            select([
                                "That was good!",
                                "Delicious!",
                                "A little dry but, that will do",
                                "Tasty!",
                                "Phew, I needed that!",
                            ]),
                            "lime"
                        );
                        you.sat = you.satmax;
                        giveSkExp(skl.glt, 42);
                        dom.d5_3_1.update();
                        global.flags.djmlet = false;
                        smove(chss.t3, false);
                        return;
                    } else {
                        msg("Too late for that", "yellow");
                        global.flags.djmlet = false;
                        smove(chss.t3, false);
                        return;
                    }
                });
            }
            if (global.flags.dj1end === true)
                chs('"Level Advancement"', false, "orange").addEventListener("click", () => {
                    chs(
                        '"Instructor: If you put effort into training you will get rewards as long as you are still a disciple of this hall. After every 5 levels you reach, come here and recieve your share! You might get something really useful if you continue to improve your skills"',
                        true
                    );
                    if (!global.flags.dj1rw1 && you.lvl >= 5) {
                        chs('"Level 5 reward"', false).addEventListener("click", () => {
                            chs('"Instructor: This is a good start, congratulations! Keep working hard!"', true);
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw1 = true;
                                giveWealth(25);
                                giveItem(item.sp1, 5);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    if (!global.flags.dj1rw2 && global.flags.dj1rw1 === true && you.lvl >= 10) {
                        chs('"Level 10 reward"', false, "royalblue").addEventListener("click", () => {
                            chs(
                                '"Instructor: You seem to not neglect your training, good job! Keep working hard!"',
                                true
                            );
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw2 = true;
                                giveWealth(100);
                                giveItem(item.sp2, 2);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    if (!global.flags.dj1rw3 && global.flags.dj1rw2 === true && you.lvl >= 15) {
                        chs('"Level 15 reward"', false, "lime").addEventListener("click", () => {
                            chs(
                                '"Instructor: You\'re slowly growing into a fine young warrior! Keep working hard!"',
                                true
                            );
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw3 = true;
                                giveWealth(200);
                                giveItem(item.sp3, 1);
                                giveItem(eqp.tnc);
                                giveItem(item.lifedr);
                                giveItem(eqp.knkls);
                                giveItem(eqp.knkls);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    if (!global.flags.dj1rw4 && global.flags.dj1rw3 === true && you.lvl >= 20) {
                        chs('"Level 20 reward"', false, "gold").addEventListener("click", () => {
                            chs('"Instructor: Time to start getting serious! Keep working hard!"', true);
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw4 = true;
                                giveWealth(300);
                                giveItem(wpn.tkmts);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    if (!global.flags.dj1rw5 && global.flags.dj1rw4 === true && you.lvl >= 25) {
                        chs('"Level 25 reward"', false, "orange").addEventListener("click", () => {
                            chs(
                                '"Instructor: You\'re almost ready to face real dangers of the outside world! Keep working hard!"',
                                true
                            );
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw5 = true;
                                giveWealth(350);
                                giveItem(acc.mnch);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    if (!global.flags.dj1rw6 && global.flags.dj1rw5 === true && you.lvl >= 30) {
                        chs('"Level 30 reward"', false, "crimson").addEventListener("click", () => {
                            chs(
                                '"Instructor: You are almost as strong as an average adult! Good job kid and Keep working hard! Maybe you can defend this village one day"',
                                true
                            );
                            chs('"Accept"', false, "lime").addEventListener("click", () => {
                                global.flags.dj1rw6 = true;
                                giveWealth(400);
                                giveItem(item.stthbm1);
                                giveItem(item.stthbm4);
                                giveItem(item.stthbm3);
                                giveItem(item.stthbm2);
                                smove(chss.t3, false);
                            });
                        });
                    }
                    chs('"<= Return"', false).addEventListener("click", () => {
                        smove(chss.t3, false);
                    });
                });
            if (item.htrdvr.have)
                chs('"Deliver the crate"', false, "lightblue").addEventListener("click", () => {
                    chs(
                        "\"Instructor: Yamato sent something? Great timing on that, we were getting very close to running out already. This will be turned into rations for you lads, you better don't forget to thank our hunters properly next time you see them, as they work hard to bring food to people's tables. Here, small compensation for your timely delivery\"",
                        true
                    );
                    chs('"Accept"', false, "lime").addEventListener("click", () => {
                        chs(
                            "\"Instructor: Hold it, that's not all, catch this as well, i believe it is yours. You won't be as lucky next time and lose your possessions for good if you leave them around again, pay better attention to where your stuff is\"",
                            true
                        );
                        chs('"Accept x2"', false, "lime").addEventListener("click", () => {
                            giveWealth(50);
                            giveItem(item.key0);
                            removeItem(item.htrdvr);
                            smove(chss.t3, false);
                        });
                    });
                });
            chs('"<= Go outside"', false).addEventListener("click", () => {
                smove(chss.lsmain1);
            });
            if (global.flags.trne4e1 && !global.flags.trne4e1b) {
                chs(
                    '"Instructor: Once again, choose the skillbook of specialization you are interested in. Doesn\'t mean you have to stick with it to the bitter end, but it will help you train"',
                    true
                );
                chs('"Bladesman Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl1a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
                chs('"Assassin Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl2a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
                chs('"Axeman Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl3a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
                chs('"Lancer Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl4a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
                chs('"Clubber Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl5a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
                chs('"Brawler Manual"', false).addEventListener("click", () => {
                    giveItem(item.skl6a);
                    global.flags.trne4e1b = true;
                    smove(chss.lsmain1);
                });
            }
        }
    }
};
chss.t3.onEnter = function () {
    area_init(area.nwh);
};

chss.djinf = new Chs();
chss.djinf.id = 160;
chss.djinf.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, Infoboard");
    global.lst_loc = 160;
    chs("Useful information regarding dojo is written here. What will you read?", true);
    chs('"Get stronger!"', false).addEventListener("click", () => {
        chs(
            "Fight dummies provided by dojo to improve your physique and weapon skills! Destroy them and grab their stuff, or vanquish thousands for a special reward! The doors of our dojo is open for everyone willing to lead the path of a warrior",
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.djinf, false);
        });
    });
    chs('"Graduate!"', false).addEventListener("click", () => {
        chs(
            "When you are confident in your skills, try your fist at fighting powerful golems! How much beating can you withstand?",
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.djinf, false);
        });
    });
    chs('"Claim your rewards!"', false).addEventListener("click", () => {
        chs(
            "As long as you keep gaining experience and train hard, dojo will provide you with gifts and money! Don't miss out!",
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.djinf, false);
        });
    });
    chs('"Get your grub at the canteen!"', false).addEventListener("click", () => {
        chs(
            "Our generous dojo provides " +
                col("Free Meals", "lime") +
                " to every attending low-class disciple every " +
                col("Sunday", "yellow") +
                "! Get in time for your weekly menu!",
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.djinf, false);
        });
    });
    chs('"Measure your power!"', false).addEventListener("click", () => {
        let v = chs(
            "Try out punching this " + col("Indestructable Dummy", "orange") + " to measure the power of your fist!",
            true
        );
        chs('"Give it a try"', false).addEventListener("click", () => {
            you.stat_r();
            let hs = handStr();
            v.innerHTML =
                select(["Wham!", "Slap!", "Hit!", "Punch!", "Hack!"]) +
                ' Your approximate hand strength is measured in: <br><br><span style="border:1px dashed yellow;padding:6px">' +
                col(format3(hs.toString()) + "kg", "springgreen") +
                "</span><br><br>";
            for (let x in global.htrchl) global.htrchl[x](hs);
        });
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.djinf, false);
        });
    });
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.t3, false);
    });
};

chss.trne1e1 = new Chs();
chss.trne1e1.id = 124;
chss.trne1e1.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, training area");
    global.lst_loc = 124;
    chs(
        "Instructor: Great job smashing that golem! This golem is one of the weakest types around, but even he can become a huge trouble if you're not giving it your best. Now, grab this and proceed with your training",
        true
    );
    chs('"Proceed with your training"', false).addEventListener("click", () => {
        giveItem(item.hptn1, 10);
        global.flags.trne1e1 = true;
        smove(chss.t3);
    });
};

chss.trne2e1 = new Chs();
chss.trne2e1.id = 125;
chss.trne2e1.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, training area");
    global.lst_loc = 125;
    chs(
        "Instructor: Just like that, keep it up. You are starting to stand much longer in fights, such an improvement from when you just arrived here! You deserver your praise, but don't get complacent",
        true
    );
    chs('"Proceed with your training"', false).addEventListener("click", () => {
        giveItem(wpn.fksrd);
        giveItem(acc.otpin);
        global.flags.trne2e1 = true;
        smove(chss.t3);
    });
};

chss.trne3e1 = new Chs();
chss.trne3e1.id = 126;
chss.trne3e1.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, training area");
    global.lst_loc = 126;
    chs(
        "Instructor: That was a tough one, but you still managed to crush it! You are getting close to finishing a second course. Don't give up!",
        true
    );
    chs('"Proceed with your training"', false).addEventListener("click", () => {
        giveItem(item.scrlw);
        global.flags.trne3e1 = true;
        smove(chss.t3);
    });
};

chss.trne4e1 = new Chs();
chss.trne4e1.id = 162;
chss.trne4e1.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, training area");
    global.lst_loc = 162;
    chs(
        'Instructor: <span style="color:lime">As expected, you have what it takes to protect yourself! And with that, you have finished the second entry course of this dojo, job well done! Soon, you will be able to step out of the village and take on serious jobs that will let you explore the land. You better prepare yourself well before that happens!</span>',
        true
    );
    chs('"Finish training"', false, "lime").addEventListener("click", () => {
        global.flags.trne4e1 = true;
        smove(chss.t3);
    });
};

chss.return1 = new Chs();
chss.return1.id = 105;
chss.return1.sl = () => {
    global.flags.inside = true;
    d_loc("Dojo, training area");
    global.lst_loc = 105;
    chs("Punch as many as you want", true);
    if (!global.flags.trnex2) area_init(area.trn);
    else area_init(area.trnf);
    chs('"<= Return back into lobby"', false).addEventListener("click", () => {
        smove(chss.t3);
    });
};

chss.frstn1main = new Chs();
chss.frstn1main.id = 113;
chss.frstn1main.sl = () => {
    global.flags.inside = false;
    d_loc("Western Woods, The Wooden Gate");
    global.lst_loc = 113;
    chs("You're out in the forest. You can hunt here", true);
    chs('"=> Enter the Hunter\'s lodge"', false).addEventListener("click", () => {
        smove(chss.frstn1b1);
    });
    chs('"=> Delve inside the forest"', false).addEventListener("click", () => {
        smove(chss.frstn1a1);
    });
    if (global.flags.frstn1a3u)
        chs('"=> Hunt indefinitely"', false).addEventListener("click", () => {
            smove(chss.frstn1a3);
        });
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};

chss.frstn1a3 = new Chs();
chss.frstn1a3.id = 130;
addtosector(sector.forest1, chss.frstn1a3);
chss.frstn1a3.sl = () => {
    global.flags.inside = false;
    d_loc("Western Woods, They're Nearby");
    global.lst_loc = 130;
    chs("The woods are silent", true);
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.frstn1main);
    });
};
chss.frstn1a3.onEnter = function () {
    area_init(area.frstn1a3);
};

chss.frstn1a4 = new Chs();
chss.frstn1a4.id = 161;
addtosector(sector.forest1, chss.frstn1a4);
chss.frstn1a4.sl = () => {
    global.flags.inside = false;
    d_loc("Western Woods, Round Branches");
    if (area.frstn1a4.size > 0) {
        chs("Something ambushes you!", true, "red");
        chs('"<= Escape"', false).addEventListener("click", () => {
            smove(chss.frstn1main);
        });
    } else {
        chs("You never knew this secluded area was here", true);
        if (!global.flags.frstnskltg)
            chs('"Look around"', false).addEventListener("click", () => {
                chs("You see something sticking out from the ground in the grass over there. Bones?", true);
                chs('"Examine whatever that might be"', false).addEventListener("click", () => {
                    chs(
                        "Indeed, bones. Skeletal remains of a person to be exact. Looks like he died long time ago, much of everything rotted off, even metallic bits of whatever armor he was wearing have fallen apart.",
                        true
                    );
                    chs('"See if you can salvage anything"', false).addEventListener("click", () => {
                        chs(
                            "There isn't much you can take with you, except for the sword on the skeleton's hip, still inside its half-desintegrated sheath. What was the cause of his death? He wasn't in a fight judging by the state of the sword. Was he poisoned? Or caught by surprise? Couldn't leave this place for whatever reason? You are not sure. The least you can do is honor the deceased by burying his remains",
                            true
                        );
                        chs('"Make a grave"', false).addEventListener("click", () => {
                            global.flags.frstnskltg = true;
                            giveItem(wpn.mkrdwk);
                            you.karma += 3;
                            you.luck++;
                            msg("Your good deed improved your karma!", "gold");
                            msg("LUCK Increased +1", "gold");
                            chss.frstn1a4.sl();
                        });
                    });
                });
            });
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.frstn1main);
        });
    }
};
chss.frstn1a4.onEnter = function () {
    if (area.frstn1a4.size > 0) area_init(area.frstn1a4);
};
chss.frstn1a4.onLeave = function () {
    area.frstn1a4.size = rand(5) + 20;
};
chss.frstn1a4.data = {
    scoutm: 600,
    scout: 0,
    scoutf: false,
    gets: [false],
    gotmod: 0,
};
chss.frstn1a4.scout = [
    {
        c: 0.009,
        f: () => {
            msg(
                "You discover a pouch half-etched into the ground and covered by a rock. It probably belonged to the corpse",
                "lime"
            );
            giveItem(item.mnblm, 3);
            chss.frstn1a4.data.gets[0] = true;
        },
        exp: 35,
    },
    {
        c: 0.0005,
        cond: () => {
            if (getHour() >= 0 && getHour() <= 3 && getLunarPhase() === 0) return true;
        },
        f: () => {
            msg("You found Moonbloom!", "lime");
            giveItem(item.mnblm);
        },
        exp: 10,
    },
];
chss.frstn1a4.onScout = function () {
    scoutGeneric(this);
};

chss.frstn1b1 = new Chs();
chss.frstn1b1.id = 118;
chss.frstn1b1.sl = () => {
    global.flags.inside = true;
    d_loc("Western Woods, Hunter's Lodge");
    if (wearingany(wpn.mkrdwk) && !global.flags.wkrtndrt) {
        chs('<span style="color:limegreen">Head Hunter Yamato</span>: You! Why do you have that?', true);
        chs('"?"', false).addEventListener("click", () => {
            chs('<span style="color:limegreen">Head Hunter Yamato</span>: The sword! Where did you get it!?', true);
            chs("Give explanation", false).addEventListener("click", () => {
                chs(
                    '<span style="color:limegreen">Head Hunter Yamato</span>: The body in the forest, you say... Dammit! Our scouts are worthless if it takes someone like you to make such an important discovery! *sigh..* This sword you\'re holding once belonged to our deputy chief - Dein. You might have not met him before if you never set your foot out of the village, he was a promising and talented young soldier who were assigned to such an remote settlement for his field training',
                    true
                );
                chs("=>", false).addEventListener("click", () => {
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: Then one day he staight up vanished, without letting anyone know, and he was well respected and cared for our people all the same. Of course, being a part of the military would prevent him from disclosing his plans and duties, but it is highly doubtful a special task from the higher command would be the reason of his abscence. All of his belongins, personal items and possessions are still there, where he left them. Lad knew how to fight and wield a sword, I do not for once believe a man of his caliber would perish and die like this, the corpse you speak of might not be his...',
                        true
                    );
                    chs("Express your condolences to the deceased", false).addEventListener("click", () => {
                        chs(
                            '<span style="color:limegreen">Head Hunter Yamato</span>: Alright, enough. Your sentiment is appreciated, but let us hope Dein still draws breath out there. This entire precident calls for investigation, a team of hunters will be dispatched shortly and you keep yourself alert too. And I will be taking that from your hands, thank you for bringing it here. Time will tell wether this sword becomes a memento or returns to its rightful owner',
                            true
                        );
                        chs("Part with the sword", false).addEventListener("click", () => {
                            chs(
                                '<span style="color:limegreen">Head Hunter Yamato</span>: Here, take this for your trouble',
                                true
                            );
                            chs("Accept", false, "lime").addEventListener("click", () => {
                                removeItem(findbyid(inv, wpn.mkrdwk.id));
                                giveWealth(300);
                                global.flags.wkrtndrt = true;
                                smove(chss.frstn1b1, false);
                            });
                        });
                    });
                });
            });
        });
        return;
    }
    if (!global.flags.frstn1b1int) {
        chs(
            "<span style=\"color:limegreen\">Head Hunter Yamato</span>: Hm? Your face is unfamiliar. Might be your first time around here I take it? These are the Western Woods, or simply the western part of the forest. Spots here are very meek and mild on danger and resources, it is perfect for newbies like you. You are free to come and hunt as much as you like. Consider doing some of the available jobs while you're at it. Won't pay much, but you can be of help to the people.",
            true,
            "orange",
            null,
            null,
            null,
            ".9em"
        );
        global.flags.frstn1b1int = true;
    } else
        global.flags.wkrtndrt && random() > 0.5
            ? chs(select(["You sight the hunter thinking deeply about something", "You hear mumbling"]), true)
            : chs(
                  select([
                      "You see a variety of bows and other hunting tools arranged on the table and hanging from the walls",
                      "You notice head hunter maintaining his hunting gear",
                      "The smell of beef jerky assaults your nose",
                  ]),
                  true
              );
    chs('"!Ask about the jobs"', false, "yellow").addEventListener("click", () => {
        smove(chss.frstn1b1j, false);
    });
    chs('"Tell me something"', false).addEventListener("click", () => {
        smove(chss.htrtch0, false);
    });
    if (quest.fwd1.data.done === true) {
        chs('"Sell firewood ' + dom.coincopper + '"', false).addEventListener("click", () => {
            smove(chss.frstn1b1s, false);
        });
    }
    if (item.hbtsvr.have)
        chs('"Deliver the satchel"', false, "lightblue").addEventListener("click", () => {
            chs(
                "<span style=\"color:limegreen\">Head Hunter Yamato</span>: Delivery back? That's unexpected! Put this here, let me examine it... I see, we're going east soon, then... Well, that's not for you to worry about, hhah! There is another thing. You wait here a moment<br>.......<br><br> Heeere we go! Get this crate to the dojo since you're going in that direction anyway. They'll know what to do with it. Go now, go",
                true
            );
            chs('"Ok"', false).addEventListener("click", () => {
                giveItem(item.htrdvr);
                removeItem(item.hbtsvr);
                smove(chss.frstn1main);
            });
        });
    chs('"<= Exit"', false).addEventListener("click", () => {
        smove(chss.frstn1main);
    });
    if (quest.fwd1.data.done === true && quest.hnt1.data.done === true && !global.flags.frstn1b1g1) {
        chs(
            "<span style=\"color:limegreen\">Head Hunter Yamato</span>: You're still going around without a proper weapon? That won't do, catch this. It isn't much, but a bit better than you being nearly emptyhanded. Once you return back you should check the " +
                col("Notice Board", "lime") +
                " by the village center, you never know if something important is happening in the ouskirts that you aren't aware of, but it will almost certainly be written there. You may find a job offer or two, or see pleads of fellow villagers asking for help with mundane things, consider those as well",
            true
        );
        chs('"Thanks!"', false).addEventListener("click", () => {
            chs(
                "<span style=\"color:limegreen\">Head Hunter Yamato</span>: One more thing. I'll ask you to do this very easy, little job. Grab this bag and get it to the village's herbalist. You know where the herbalist is? Here are the directions, listen well: head to the marketplace and look for a very unremarkable little building with a sign that looks like a vial. Like those vials they use in alchemy, those ones. The building is located a little further back from the road, in the shade, so you may simply forget it exists if you aren't specifically looking for it, you keep your eyes peeled. Now go, you should have no problem getting there",
                true
            );
            chs('"Got it"', false).addEventListener("click", () => {
                global.flags.frstn1b1g1 = true;
                giveItem(wpn.dgknf);
                giveItem(item.htrsvr);
                smove(chss.frstn1b1, false);
                global.flags.phai1udt = true;
            });
        });
    }
};

chss.htrtch0 = new Chs();
chss.htrtch0.id = 164;
chss.htrtch0.sl = () => {
    global.flags.inside = true;
    chs(
        '<span style="color:limegreen">Head Hunter Yamato</span>: What do you want to ask, kid? Want to know how to butcher a carcass? Khahhahhah! *cough*',
        true
    );
    chs('"About monsters"', false).addEventListener("click", () => {
        smove(chss.htrtch1, false);
    });
    chs('"What are monster ranks?"', false).addEventListener("click", () => {
        chs(
            '<div style="line-height:16px"><span style="color:limegreen">Head Hunter Yamato</span>: Ranking is a way to separate monsters by their relative danger level, they go as following:<div style="border: darkblue 1px solid;background-color:#0b1c3c;margin:10px;"><div><span style="color:lighgrey">G - Can be dealth with by able people</span></div><div><span style="color:white">F - Can be dealth with by male adults</span></div><div><span style="color:lightgreen">E - Village Crisis</span></div><div><span style="color:lime">D - Townside Crisis</span></div><div><span style="color:yellow">C - Citywide Crisis</span></div><div><span style="color:orange">B - National Crisis</span></div><div><span style="color:crimson">A - Continental Threat</span></div><div><span style="color:gold;text-shadow: 0px 0px 2px red,0px 0px 2px red,0px 0px 2px red">S - Global Crisis</span></div><div><span style="color:black;text-shadow:hotpink 1px 1px .1em,cyan -1px -1px .1em">SS - World Disaster</span></div><div><span style="color:white;text-shadow:2px 0px 2px red,-2px 0px 2px magenta,0px 2px 2px cyan,0px -2px 2px yellow,0px 0px 2px gold">SSS - Universal Calamity</div></div>We haven\'t experienced anything stronger than the E rank in all history of our village. Whatever is above the A rank is completely unheard of, and only partially mentioned in ancient texts. That\'s the realm of gods, world destroyers and higher beings that our mortal souls are unlikely to ever face</div>',
            true,
            0,
            0,
            0,
            0,
            ".9em"
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch0, false);
        });
    });
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.frstn1b1, false);
    });
};

chss.htrtch1 = new Chs();
chss.htrtch1.id = 163;
chss.htrtch1.sl = () => {
    global.flags.inside = true;
    chs(
        '<div style="line-height:14px"><span style="color:limegreen">Head Hunter Yamato</span>: Monsters, you say? There are many and they are around, terrorizing peaceful folk in the outside world. Our remote parts don\'t see much of that, these lands are tame. Not without dangers, of course, you meet a wild boar in the forest - a single wrong move and its tusks are in your guts and that is it, end of the fool. Or those pesky slimes, while don\'t look menacing and pose little danger, they sometimes gather and destroy the fields by melting crops and soil. We have it good but starvation is worse than any monster, at times. *cough* anyway, anything living and non-living you meet can be separated into 6 categories:<br>Human, Beast, Undead, Evil, Phantom, Dragon</div>',
        true,
        0,
        0,
        0,
        0,
        ".8em"
    );
    chs('"About Humans"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Humans and Demihumans fall into the same class. People like you and me, beastmen, orcs, goblins... Mostly creatures intelligent enough to walk on their two, use tools, form societies, make settlements, trade and speak on their own violition. You will encounter and perhaps fight them as bandits, criminals, members of the opposing factions and armies, whoever you disagree with. Always be on your guard, humanoids are cunning and skilled, versatile and very adaptive. Yet, they have mushy bodies. One correct strike and you get an advantage',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"About Beasts"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Beasts are your usual, normal wildlife like wolves, slimes, mimics, or prone to being evil Demihumans with low intelligence and high level of aggression like ogres, harpies, minotaurs. While animals are dumb, never underestimate a wild beast. With their thick skin and natural weapons like fangs and claws, they pose a major threat when driven into a desperate state. Fire works very well against the most, especially those with fur and feathers, keep that in mind next time you go hunting',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"About Undead"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Undead, as you could already tell, are living dead. Reanimated remains of humans and beasts by the influence of natural forces or a skilled necromancer. Even if they completely lack intelligence and wander around aimlessly, controlled bodies of the dead get strenghtened by Dark magic and gain unnatural resilience and power as a result. It doesn\'t prevent them from being hurt by fire or Holy powers, hovewer. You can deal with lesser fragile skeletal beings quickly if you bash them with something blunt',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"About Evil"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Beings that are artificially made or existences who are inherently evil, can be classified as such. Demons, imps, golems, possessed weapons and armor, gremlins, devils and much of anything else that comes out from the Underworld. They are extremely dangerous and seek destruction all that they come across',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"About Phantoms"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Souls of the dead, ethereal beings, manifestations of powers or other apparitions can all be called Phantoms. They take forms of wisp and sprites, benevolent or twisted elementals or spirits and wraiths that terrorize the living. They are difficult or sometimes outright impossible to hurt using normal physical means, magic or exorcism would be a preferred way of dealing with such enemies',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"About Dragons"', false, 0, 0, 0, 0, ".8em", 0, "15px").addEventListener("click", () => {
        chs(
            '<span style="color:limegreen">Head Hunter Yamato</span>: Dragons are legendary creatures that possess evil and cunning intellect. Through some unknown means many dragons in ancient times were reduced to subspecies of wyverns and wyrms, or outright bastard draconids like lizardmen, and other beings with Dragon bloodline. The power of said bloodline grants them superior defence against magic and energy abilities, their physical toughness is also no joke',
            true
        );
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.htrtch1, false);
        });
    });
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.htrtch0, false);
    });
};

chss.frstn1b1s = new Chs();
chss.frstn1b1s.id = 121;
chss.frstn1b1s.sl = () => {
    global.flags.inside = true;
    chs(
        '<span style="color:limegreen">Head Hunter Yamato</span>: I\'ll fetch you 15 copper per bundle! How many do you want to sell?',
        true
    );
    let fwd = item.fwd1.have ? item.fwd1.amount : 0;
    if (fwd >= 1)
        chs('"Sell 1 piece"', false, "lightgrey").addEventListener("click", () => {
            item.fwd1.amount -= 1;
            if (item.fwd1.amount <= 0) removeItem(item.fwd1);
            giveWealth(15);
            smove(chss.frstn1b1s, false);
        });
    if (fwd >= 5)
        chs('"Sell 5 piece"', false, "lime").addEventListener("click", () => {
            item.fwd1.amount -= 5;
            if (item.fwd1.amount <= 0) removeItem(item.fwd1);
            giveWealth(75);
            smove(chss.frstn1b1s, false);
        });
    if (fwd >= 10)
        chs('"Sell 10 pieces"', false, "cyan").addEventListener("click", () => {
            item.fwd1.amount -= 10;
            if (item.fwd1.amount <= 0) removeItem(item.fwd1);
            giveWealth(150);
            smove(chss.frstn1b1s, false);
        });
    if (fwd >= 1)
        chs('"Sell Everything"', false, "orange").addEventListener("click", () => {
            giveWealth(item.fwd1.amount * 15);
            item.fwd1.amount = 0;
            removeItem(item.fwd1);
            smove(chss.frstn1b1s, false);
        });
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.frstn1b1, false);
    });
};

chss.frstn1b1j = new Chs();
chss.frstn1b1j.id = 119;
chss.frstn1b1j.sl = () => {
    global.flags.inside = true;
    chs('<span style="color:limegreen">Head Hunter Yamato</span>: Here is what\'s available, take a look', true);
    if (quest.fwd1.data.done && quest.hnt1.data.done) {
        if (!quest.lmfstkil1.data.started && !quest.lmfstkil1.data.done) {
            chs('"Monster eradication"', false).addEventListener("click", () => {
                if (you.lvl < 20 || !global.flags.trne4e1) {
                    msg(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: Don\'t even think about it, you will not be sent to your death. Go back and train, dojo has everything you need'
                    );
                    return;
                }
                if (!quest.lmfstkil1.data.started) {
                    chs(
                        "<span style=\"color:limegreen\">Head Hunter Yamato</span>: What's this? Your aura has changed since we last met! All the martial training you went through certainly hasn't gone to waste, this kid is definitely isn't a pushover anymore, hah! If you have the guts to take on the next task, listen well - southern forest is becoming more and more dangerous, lethal beasts keep crawling in from the farther plains, making it very difficult to do any sort of work in the south. Looks like wolves this time. Some fear, at this rate, they might reach and assault the village, and that will have need to be dealth with. This is a dangerous issue, and you will have to have courage to take it on, but in turn it will serve you as great real battle experience. Other lads have already signed up, as well. Are you willing?",
                        true,
                        "yellow",
                        0,
                        0,
                        0,
                        ".9em"
                    );
                    chs('"Accept"', false, "lime").addEventListener("click", () => {
                        giveQst(quest.lmfstkil1);
                        global.flags.frst1u = true;
                        giveItem(item.bstr);
                        chs(
                            '<span style="color:limegreen">Head Hunter Yamato</span>: Hunt down all the wolves you find and return once you destroy at least 35 of them. You will also want this, every hunter should keep his personal notes close. And prepare medicinal bandages, just in case. Be careful, and good luck',
                            true
                        );
                        chs('"<= Return"', false).addEventListener("click", () => {
                            smove(chss.frstn1b1, false);
                        });
                    });
                    chs('"Refuse"', false, "crimson").addEventListener("click", () => {
                        smove(chss.frstn1b1, false);
                    });
                }
            });
        } else if (quest.lmfstkil1.data.started) {
            if (quest.lmfstkil1.data.mkilled < 35) {
                chs('<span style="color:limegreen">Head Hunter Yamato</span>: Having troubles with the task?', true);
                chs('"<= Return"', false).addEventListener("click", () => {
                    smove(chss.frstn1b1, false);
                });
                return;
            } else
                chs(
                    '<span style="color:limegreen">Head Hunter Yamato</span>: What is that fire in your eyes? Can it be you are done already?',
                    true
                );
            chs('"Report the sounds you heard"', false, "lime").addEventListener("click", () => {
                chs(
                    '<span style="color:limegreen">Head Hunter Yamato</span>: That isn\'t good, sounds like trouble... Might have been the leader of the pack, furious about death of his underlings. This matter will need to be resolved quickly. As for you, go and have a good hard earned rest, you have done very well. Expect to be contacted later for further monster subjugation',
                    true
                );
                chs('"Accept the reward"', false, "lime").addEventListener("click", () => {
                    finishQst(quest.lmfstkil1);
                    smove(chss.frstn1main);
                });
            });
        }
    }
    if (!quest.fwd1.data.done) {
        chs('"Firewood gathering"', false).addEventListener("click", () => {
            if (!quest.fwd1.data.started) {
                chs(
                    '<span style="color:limegreen">Head Hunter Yamato</span>: While coal is not easy to obtain around here, good burnable wood is always in demand. Your job this time is to collect and bring about 10 bundles of firewood, keep an eye out while you\'re strolling out in the forest. Your deed will help the villagers, and you will get something out of it as well',
                    true,
                    "yellow"
                );
                chs('"Accept"', false, "lime").addEventListener("click", () => {
                    giveQst(quest.fwd1);
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: Great! I will be awaiting your return',
                        true
                    );
                    chs('"<= Return"', false).addEventListener("click", () => {
                        smove(chss.frstn1b1, false);
                    });
                });
                chs('"Refuse"', false, "crimson").addEventListener("click", () => {
                    smove(chss.frstn1b1, false);
                });
            } else {
                if (!item.fwd1.have)
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: If you find your task too difficult, go back to the training grounds',
                        true
                    );
                else if (item.fwd1.amount < 10)
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: You found some already? You still need ' +
                            (10 - item.fwd1.amount) +
                            " more bundles of firewood to finish the task",
                        true
                    );
                else
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: If you got requested firewood, turn it in',
                        true
                    );
                if (item.fwd1.amount >= 10) {
                    chs('"Hand over firewood"', false, "lime").addEventListener("click", () => {
                        reduce(item.fwd1, 10);
                        chs(
                            "<span style=\"color:limegreen\">Head Hunter Yamato</span>: Very good, you didn't disappoint. You can never have enough burning material, be it for cooking or warmth, or anything else. Here, this is for you. And some monetary compensation for the job well done. Oh, by the way, I'll buy any spare firewood off of you if you need some coin",
                            true
                        );
                        chs('"Accept the reward"', false, "lime").addEventListener("click", () => {
                            finishQst(quest.fwd1);
                        });
                    });
                }
                chs('"<= Return"', false).addEventListener("click", () => {
                    smove(chss.frstn1b1, false);
                });
            }
        });
    }
    if (!quest.hnt1.data.done) {
        chs('"Hunting for meat"', false).addEventListener("click", () => {
            if (!quest.hnt1.data.started) {
                chs(
                    '<span style="color:limegreen">Head Hunter Yamato</span>: If you want to survive, you will need to eat. Prove that you can handle yourself in the wilderness by hunting down wildlife. 10 piece of fresh meat should be enough, bring them to me for the evaluation',
                    true,
                    "yellow"
                );
                chs('"Accept"', false, "lime").addEventListener("click", () => {
                    giveQst(quest.hnt1);
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: Great! I will be awaiting your return',
                        true
                    );
                    chs('"<= Return"', false).addEventListener("click", () => {
                        smove(chss.frstn1b1, false);
                    });
                });
                chs('"Refuse"', false, "crimson").addEventListener("click", () => {
                    smove(chss.frstn1b1, false);
                });
            } else {
                if (!item.fwd1.have)
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: If you find your task too difficult, go back to the training grounds',
                        true
                    );
                else if (item.rwmt1.amount < 10)
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: Oh, so you managed to hunt down some of the animals. You still need ' +
                            (10 - item.rwmt1.amount) +
                            " more chunks of meat to end he job. Hurry up before it goes bad!",
                        true
                    );
                else
                    chs(
                        '<span style="color:limegreen">Head Hunter Yamato</span>: If you have everything already, leave it here',
                        true
                    );
                if (item.rwmt1.amount >= 10) {
                    chs('"Turn in raw meat"', false, "lime").addEventListener("click", () => {
                        reduce(item.rwmt1, 10);
                        chs(
                            '<span style="color:limegreen">Head Hunter Yamato</span>: Well done! Hunting down animals and stockpiling food that way is always a good precaution. Cooking or drying raw meat is generally a better idea than consuming it raw, give that a piece of mind if you\'re not sure what to do with the stuff you have.<br>All in all, you deserve a reward',
                            true
                        );
                        chs('"Accept the reward"', false, "lime").addEventListener("click", () => {
                            finishQst(quest.hnt1);
                            smove(chss.frstn1b1, false);
                        });
                    });
                }
                chs('"<= Return"', false).addEventListener("click", () => {
                    smove(chss.frstn1b1, false);
                });
            }
        });
    }
    //blabla

    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.frstn1b1, false);
    });
};

chss.frstn1a1 = new Chs();
chss.frstn1a1.id = 114;
addtosector(sector.forest1, chss.frstn1a1);
chss.frstn1a1.sl = () => {
    global.flags.inside = false;
    d_loc("Western Woods, The Yellow Path");
    chs("The woods are silent", true);
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.frstn1main);
    });
};
chss.frstn1a1.onEnter = function () {
    area_init(area.frstn1a2);
};

chss.frstn1a2 = new Chs();
chss.frstn1a2.id = 115;
addtosector(sector.forest1, chss.frstn1a2);
chss.frstn1a2.sl = () => {
    global.lst_loc = 115;
    global.flags.inside = false;
    d_loc("Western Woods, The Underbushes");
    chs("You scavenged some goods from this forest area", true);
    chs('"=> Go further into the forest"', false).addEventListener("click", () => {
        smove(chss.frstn2a1);
    });
    if (global.flags.frstnscgr)
        chs('"--> Enter the hidden path"', false, "grey").addEventListener("click", () => {
            smove(chss.frstn1a4);
        });
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.frstn1main);
    });
};
chss.frstn1a2.data = {
    scoutm: 320,
    scout: 0,
    scoutf: false,
    gets: [false],
    gotmod: 0,
};
chss.frstn1a2.scout = [
    {
        c: 0.008,
        f: () => {
            msg("You uncover a hidden passage!", "lime");
            global.flags.frstnscgr = true;
            smove(chss.frstn1a4);
            chss.frstn1a2.data.gets[0] = true;
        },
        exp: 66,
    },
];
chss.frstn1a2.onScout = function () {
    scoutGeneric(this);
};

chss.frstn2a1 = new Chs();
chss.frstn2a1.id = 120;
addtosector(sector.forest1, chss.frstn2a1);
chss.frstn2a1.sl = () => {
    global.flags.inside = false;
    d_loc("Western Woods, The Shaded Path");
    chs("The woods are silent", true);
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.frstn1main);
    });
};
chss.frstn2a1.onEnter = function () {
    area_init(area.frstn2a2);
};

chss.frstn3main = new Chs();
chss.frstn3main.id = 168;
chss.frstn3main.sl = () => {
    global.flags.inside = false;
    d_loc("Southern Forest, The Oaken Gate");
    global.lst_loc = 168;
    chs("The air here feels intimidating", true);
    chs('"=> Explore the depths"', false).addEventListener("click", () => {
        smove(chss.frstn9a1m);
    });
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};

chss.frstn9a1m = new Chs();
chss.frstn9a1m.id = 169;
chss.frstn9a1m.sl = () => {
    global.flags.inside = false;
    d_loc("Southern Forest, The Foliage");
    global.lst_loc = 169;
    chs("This place looks dark", true);
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.frstn3main);
    });
};
chss.frstn9a1m.onEnter = function () {
    area_init(area.frstn9a1);
};

chss.lsmain1 = new Chs();
chss.lsmain1.id = 106;
addtosector(sector.vcent, chss.lsmain1);
addtosector(sector.vmain1, chss.lsmain1);
chss.lsmain1.sl = () => {
    global.flags.inside = false;
    d_loc("Village Center");
    global.lst_loc = 106;
    if (isWeather(weather.sunny) || isWeather(weather.clear))
        chs("The surroundings are flourishing with life, nothing bad can happen", true);
    else if (isWeather(weather.cloudy) || isWeather(weather.overcast) || isWeather(weather.stormy))
        chs("You have a feeling it might rain soon", true);
    else if (isWeather(weather.storm) || isWeather(weather.rain) || isWeather(weather.drizzle))
        chs("The rain feels surprisingly refreshing", true);
    else if (isWeather(weather.heavyrain) || isWeather(weather.thunder))
        chs(
            "It's pouring so hard the streets are completely flooded. There's noone around " +
                (getHour() > 6 && getHour() < 21 ? "except for a few kids" : ""),
            true
        );
    else if (isWeather(weather.misty) || isWeather(weather.foggy))
        chs("Can't see a meter in front of you with all this fog", true);
    chs('"=> Check the Message Board"', false).addEventListener("click", () => {
        smove(chss.mbrd, false);
    });
    chs('"=> Enter Dojo"', false).addEventListener("click", () => {
        smove(chss.t3);
    });
    chs('"=> Enter Southern forest"', false).addEventListener("click", () => {
        if (!global.flags.frst1u) msg('Gate Guard: "Nothing for you to do there. Scram!"', "yellow");
        else {
            if (!global.flags.frst1um) {
                msg('Gate Guard: "You were given permission to proceed. Go on"', "yellow");
                global.flags.frst1um = true;
            }
            smove(chss.frstn3main);
        }
    });
    chs('"=> Enter Western Woods"', false).addEventListener("click", () => {
        if (you.lvl >= 6) smove(chss.frstn1main);
        else
            msg(
                'Gate Guard: "It is too dangerous for you to leave at this moment. Come back when you train a bit"',
                "yellow"
            );
    });
    //  chs('"=> Visit Pill Tower"',false).addEventListener('click',()=>{
    //    smove(chss.pltwr1);
    //  });
    if (global.flags.mkplc1u === true)
        chs('"=> Visit Marketplace"', false).addEventListener("click", () => {
            smove(chss.mrktvg1);
        });
    chs('"=> Go home"', false, "green").addEventListener("click", () => {
        smove(chss.home);
    });
    if (!global.flags.scrtgltt)
        chs('"=> Food stand"', false).addEventListener("click", () => {
            if (skl.trad.lvl >= 2 && random() < 0.2) global.flags.scrtglti = true;
            if (global.flags.scrtglti === true) {
                chs("...", true);
                chs("?", false).addEventListener("click", () => {
                    chs(
                        '"Passerby: Looking for the foodstand guy? He took his stuff and went South. That one supposedly travels from place to place to sell the food he makes, doubt we\'ll see him back any time soon"',
                        true
                    );
                    chs("Well then..", false).addEventListener("click", () => {
                        global.flags.scrtgltt = true;
                        smove(chss.lsmain1, false);
                    });
                });
            } else smove(chss.vndr1, false);
        });
    if (random() < 0.15)
        chs('"=> Shady Kid"', false, "springgreen").addEventListener("click", () => {
            smove(chss.vndrkd1, false);
        });

    // chs('"test"',false,'red').addEventListener('click',()=>{
    //   chss.tst.sl();
    // });
    if (!global.flags.catget)
        chs('"=> Approach the cat"', false).addEventListener("click", () => {
            smove(chss.cat1);
            if (!global.stat.cat_c) global.stat.cat_c = 0;
        });
    if (!global.flags.mkplc1u) {
        if (global.flags.dj1end === true && global.flags.pmfspmkm1 !== true && random() < 0.4) {
            chs("Paper Boy: Hey, this is for you!", true);
            chs("?", false).addEventListener("click", () => {
                giveItem(item.shppmf);
                smove(chss.lsmain1, false);
            });
        }
    }
};

chss.mrktvg1 = new Chs();
chss.mrktvg1.id = 127;
addtosector(sector.vmain1, chss.mrktvg1);
chss.mrktvg1.sl = () => {
    global.flags.inside = false;
    d_loc("Village Center, Marketplace");
    global.lst_loc = 127;
    chs("The marketplace feels busy", true);
    chs('"Grocery Shop =>"', false, "gold").addEventListener("click", () => {
        smove(chss.grc1);
    });
    chs('"General Store =>"', false, "gold").addEventListener("click", () => {
        smove(chss.gens1);
    });
    if (global.flags.phai1udt)
        chs('"Herbalist =>"', false, "gold").addEventListener("click", () => {
            smove(chss.pha1);
        });
    chs('"Nervous Guy =>"', false).addEventListener("click", () => {
        smove(chss.fdwrg1qt);
    });

    if (global.flags.grddtjb)
        chs('"Checkpoint"', false, "hotpink").addEventListener("click", () => {
            if (getHour() >= 7 && getHour() <= 10) {
                chs(
                    "Lookout Guard: Here for work? You won't have to do much, just stand there near the gate and look intimidating. You're not doing any fighting if someone dangerous comes around, that would be dealth by Us, your militia. Your shift ends at 8PM, sign up now and go",
                    true
                );
                chs('"Alright..."', false).addEventListener("click", () => {
                    if (getHour() >= 7 && getHour() <= 10) {
                        giveQst(quest.grds1);
                        smove(chss.jbgd1);
                    } else {
                        chs(
                            "Lookout Guard: Too damn late, next time don't stand there like a decoration wasting everyone's time",
                            true
                        );
                        chs('"Ah..."', false).addEventListener("click", () => {
                            smove(chss.lsmain1);
                        });
                    }
                });
                chs('"<= Maybe not"', false).addEventListener("click", () => {
                    smove(chss.mrktvg1);
                });
            } else {
                chs(
                    "Lookout Guard: If you want work come at the time that's stated in the notice and not a minute late!",
                    true
                );
                chs('"<= Return"', false).addEventListener("click", () => {
                    smove(chss.mrktvg1);
                });
            }
        });
    chs('"<= Return back to the village Center"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};
chss.mrktvg1.onEnter = function () {
    if (!timers.mktwawa1)
        timers.mktwawa1 = setInterval(function () {
            if (random() < 0.1) {
                if (!global.text.mktwawa1)
                    global.text.mktwawa1 = [
                        '<small>"...for that price? Are you cr..."</small>',
                        '<small>"...no, go by yourself..."</small>',
                        "<small>\"...right, I'll take " + rand(15) + ', put them in..."</small>',
                        '<small>"...is this really?..."</small>',
                        '<small>"...never seen this thing..."</small>',
                        '<small>"...is this real?..."</small>',
                        '<small>"...yeah, he said it\'s there..."</small>',
                        '<small>"...mama!!..."</small>',
                        '<small>"...right, coming next evening. You should probably p..."</small>',
                        '<small>"...stop pushing!..."</small>',
                        '<small>"...what a scam..."</small>',
                        '<small>"...this isn\'t even fresh!..."</small>',
                        '<small>"...why is this so expensive?..."</small>',
                        '<small>"...I won\'t lower it further!..."</small>',
                        '<small>"...I\'ll come back, just wait for a minute..."</small>',
                        '<small>"...break time!..."</small>',
                        '<small>"...who said so? Gotta be a lie..."</small>',
                        '<small>"...whatever, I\'m not buying..."</small>',
                        '<small>"...turn right and then..."</small>',
                        '<small>"...check for yourself then..."</small>',
                        '<small>"...she\'ll return shortly. As for you..."</small>',
                        '<small>"...deal!..."</small>',
                        '<small>"...try a different one..."</small>',
                        '<small>"...buy it! You won\'t regret it!..."</small>',
                        '<small>"Oh no! I dropped it in the forest!..."</small>',
                    ];
                msg(select(global.text.mktwawa1), "rgb(" + rand(255) + "," + rand(255) + "," + rand(255) + ")");
            }
        }, 1000);
};
chss.mrktvg1.onLeave = function () {
    clearInterval(timers.mktwawa1);
    delete timers.mktwawa1;
};

chss.jbgd1 = new Chs();
chss.jbgd1.id = 159;
chss.jbgd1.sl = () => {
    global.flags.inside = false;
    d_loc("Village Center, Marketplace Entry Gate");
    global.lst_loc = 159;
    let c = chs("You are standing on guard duty. This isn't very fun", true);
    global.flags.work = true;
    dom.trddots = addElement(c, "span");
    dom.trddots.frames = ["", ".", "..", "..."];
    dom.trddots.frame = 0;
    dom.trddots.style.position = "absolute";
    clearInterval(timers.rdngdots);
    timers.rdngdots = setInterval(() => {
        dom.trddots.innerHTML =
            dom.trddots.frames[(dom.trddots.frame = dom.trddots.frame > 2 ? 0 : ++dom.trddots.frame)];
    }, 333);
    chs('"Be bored"', false).addEventListener("click", () => {
        msg(
            select(["Right...", "This is boring", "*whistle*", "Ah...", "...", "Yeah...", "Mhm...", "Yawn.."]),
            "lightgrey"
        );
    });
};
chss.jbgd1.onEnter = function () {
    timers.job1t = setInterval(() => {
        if (getHour() >= 20) {
            msg(
                "Lookout Guard: Work's done for today, you have performed your duty just well and earned your salary, take it. You are advised to go straight home after you check out"
            );
            finishQst(quest.grds1);
            global.flags.work = false;
            clearInterval(this);
            smove(chss.home);
            global.flags.jcom++;
        } else {
            giveSkExp(skl.ptnc, 0.08);
            if (random() <= 0.01)
                msg(
                    select(["Right...", "This is boring", "*whistle*", "Ah...", "...", "Yeah...", "Mhm...", "Yawn..."]),
                    "lightgrey"
                );
            if (random() <= 0.0005 + skl.seye.lvl * 0.0002) {
                msg("A passerby dropped a coin. Sweet!", "lime");
                giveItem(select([item.cp, item.lcn, item.cn, item.cd, item.cq]));
                giveSkExp(skl.seye, 20);
            }
        }
    }, 1000);
};
chss.jbgd1.onLeave = function () {
    clearInterval(timers.job1t);
    global.flags.work = false;
};

chss.fdwrg1qt = new Chs();
chss.fdwrg1qt.id = 165;
chss.fdwrg1qt.sl = () => {
    d_loc("Marketplace, Stalls");
    chs(
        '"<span style="color:cyan">Nervous Guy:</span> Argh, what am I gonna do now! How could this... Uh? S-sorry, can\'t talk right now, please leave me be. Ahh damn it..."<div style="color: darkgrey">The man then proceeds to fidget in unrest</div>',
        true
    );
    chs('"<= Walk away"', false).addEventListener("click", () => {
        smove(chss.mrktvg1, false);
    });
};

chss.grc1 = new Chs();
chss.grc1.id = 128;
chss.grc1.effectors = [{ e: effector.shop }];
chss.grc1.sl = () => {
    global.flags.inside = true;
    d_loc("Marketplace, Grocery Shop");
    global.lst_loc = 128;
    chs(
        "Old Lady: " +
            select([
                "These are very fresh, buy some!",
                "Freshest vegetables for the lowest price!",
                "Try a few and you'll want even more!",
            ]),
        true
    );
    chs('"Purchase"', false, "orange").addEventListener("click", () => {
        chs_spec(4, vendor.grc1);
        vendor.grc1.restocked = false;
        clearInterval(timers.vndrstkchk);
        timers.vndrstkchk = setInterval(function () {
            if (vendor.grc1.restocked === true) {
                clearInterval(timers.vndrstkchk);
                vendor.grc1.restocked = false;
                msg("We're restocking, step out for a minute");
                smove(chss.mrktvg1, false);
            }
        });
        chs('"<= Return"', false, "", "", null, null, null, true).addEventListener("click", () => {
            smove(chss.grc1, false);
            clearInterval(timers.vndrstkchk);
        });
    });
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.mrktvg1);
    });
};
chss.grc1.data = {
    scoutm: 200,
    scout: 0,
    scoutf: false,
    gets: [false],
    gotmod: 0,
};
chss.grc1.scout = [
    {
        c: 0.01,
        f: () => {
            msg(
                select([
                    "You notice a coin on the ground!",
                    "You pick a coin from under the counter",
                    "You snatch a coin while no one is looking",
                ]),
                "lime"
            );
            giveItem(select([item.cp, item.cn, item.cq, item.cd]));
            chss.grc1.data.gets[0] = true;
        },
        exp: 5,
    },
];
chss.grc1.onScout = function () {
    scoutGeneric(this);
};

chss.gens1 = new Chs();
chss.gens1.id = 129;
chss.gens1.effectors = [{ e: effector.shop }];
chss.gens1.sl = () => {
    global.flags.inside = true;
    d_loc("Marketplace, Shabby General Store");
    global.lst_loc = 129;
    chs(
        "Sleeping Old Man: " +
            select(["...Welcome", "...", "zzz...", "A customer? Pick what you want", "Take your time"]),
        true
    );
    chs('"Purchase"', false, "orange").addEventListener("click", () => {
        chs_spec(4, vendor.gens1);
        vendor.gens1.restocked = false;
        clearInterval(timers.vndrstkchk);
        timers.vndrstkchk = setInterval(function () {
            if (vendor.gens1.restocked === true) {
                clearInterval(timers.vndrstkchk);
                vendor.gens1.restocked = false;
                msg("We're restocking, step out for a minute");
                smove(chss.mrktvg1, false);
            }
        });
        chs('"<= Return"', false, "", "", null, null, null, true).addEventListener("click", () => {
            smove(chss.gens1, false);
            clearInterval(timers.vndrstkchk);
        });
    });
    if (item.wvbkt.have)
        chs('"Sell straw baskets ' + dom.coincopper + '"', false).addEventListener("click", () => {
            chs(
                "Sleeping Old Man: You made these, kid? Hahaha, alright, i'll take them off your hands. 15 " +
                    dom.coincopper +
                    " each!",
                true
            );
            chs('"Sell your goods"', false, "lime").addEventListener("click", () => {
                if (item.wvbkt.amount > 0) {
                    giveWealth(item.wvbkt.amount * 15);
                    item.wvbkt.amount = 0;
                    removeItem(item.wvbkt);
                    smove(chss.gens1, false);
                } else {
                    smove(chss.gens1, false);
                    msg("?");
                }
            });
            chs('"<= Maybe next time"', false).addEventListener("click", () => {
                smove(chss.gens1, false);
            });
        });
    if (area.hmbsmnt.size >= 1000 && global.flags.hbs1 && !global.flags.bmntsmkgt)
        chs("Infestation problem", false, "grey").addEventListener("click", () => {
            chs(
                "Sleeping Old Man: Your basement is in bad shape? Same been happening to the other folks lately, it's not just you. Something is drilling through the underground right into people's homes! And then you get a cellar full of rats. A complete travesty! Some speculate there's a monster cave nearby, but nothing was found yet. But don't fret, there is a solution for you - you smoke the pests out. Light this bag and toss it in, the deeper the better. Your entire place will be filled with smog, so you will have to leave and stay out for a few hours, then you'll have a clean and monster free basement at your disposal. 5 " +
                    dom.coinsilver +
                    " silver the price",
                true
            );
            if (you.wealth >= SILVER * 5)
                chs('"Sounds good"', false, "lime").addEventListener("click", () => {
                    if (you.wealth < SILVER * 5) return;
                    spend(SILVER * 5);
                    giveItem(item.bmsmktt);
                    global.flags.bmntsmkgt = true;
                    smove(chss.gens1, false);
                });
            chs('"<= Too expensive"', false).addEventListener("click", () => {
                smove(chss.gens1, false);
            });
        });
    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.mrktvg1);
    });
};
chss.gens1.data = {
    scoutm: 200,
    scout: 0,
    scoutf: false,
    gets: [false],
    gotmod: 0,
};
chss.gens1.scout = [
    {
        c: 0.01,
        f: () => {
            msg(
                select([
                    "You notice a coin on the ground!",
                    "You pick a coin from under the counter",
                    "You snatch a coin while no one is looking",
                ]),
                "lime"
            );
            giveItem(select([item.cp, item.cn, item.cq, item.cd]));
            chss.gens1.data.gets[0] = true;
        },
        exp: 5,
    },
];
chss.gens1.onScout = function () {
    scoutGeneric(this);
};

chss.pha1 = new Chs();
chss.pha1.id = 166;
chss.pha1.effectors = [{ e: effector.shop }];
chss.pha1.sl = () => {
    global.flags.inside = true;
    d_loc("Marketplace, Herbalist");
    global.lst_loc = 166;
    chs(
        "Herbalist: " +
            select([
                "Injured? Come in, I'll give you a check up",
                "Yes yes..",
                "Don't neglect your well being, stack on anything you will need",
            ]),
        true
    );
    chs('"Purchase"', false, "orange").addEventListener("click", () => {
        chs_spec(4, vendor.pha1);
        vendor.pha1.restocked = false;
        clearInterval(timers.vndrstkchk);
        timers.vndrstkchk = setInterval(function () {
            if (vendor.pha1.restocked === true) {
                clearInterval(timers.vndrstkchk);
                vendor.pha1.restocked = false;
                msg("We're restocking, step out for a minute");
                smove(chss.mrktvg1, false);
            }
        });
        chs('"<= Return"', false, "", "", null, null, null, true).addEventListener("click", () => {
            smove(chss.pha1, false);
            clearInterval(timers.vndrstkchk);
        });
    });
    if (item.hrb1.amount >= 50)
        chs('"Sell cure grass ' + dom.coincopper + '"', false).addEventListener("click", () => {
            chs(
                "Herbalist: Yes indeed, if you have any cure grass to sell, by all means bring it here, you can never have too much. I will take bundles of 50 for 15 " +
                    dom.coincopper,
                true
            );
            chs('"Sell your goods"', false, "lime").addEventListener("click", () => {
                if (item.hrb1.amount >= 50) {
                    global.stat.hbhbsld++;
                    giveWealth(15);
                    item.hrb1.amount -= 50;
                    reduce(item.hrb1);
                    if (global.stat.hbhbsld >= 7 && !global.flags.hbhbgft) {
                        chs(
                            "Herbalist: You were such a great help bringing all this cure grass to me! Take this, as a bonus",
                            true
                        );
                        chs('"Accept"', false, "lime").addEventListener("click", () => {
                            giveItem(item.hptn1, 15);
                            giveItem(item.hptn2, 3);
                            vendor.pha1.data.rep = vendor.pha1.data.rep + 10 > 100 ? 100 : vendor.pha1.data.rep + 10;
                            msg("The Herbalist likes you a bit more", "lime");
                            global.flags.hbhbgft = true;
                            smove(chss.pha1, false);
                            return;
                        });
                    }
                    if (item.hrb1.amount < 50) smove(chss.pha1, false);
                } else {
                    smove(chss.pha1, false);
                    msg("?");
                }
            });
            chs('"<= Rather not"', false).addEventListener("click", () => {
                smove(chss.pha1, false);
            });
        });
    if (item.htrsvr.have)
        chs('"Deliver the bag"', false, "lightblue").addEventListener("click", () => {
            chs(
                "Herbalist: And who might you be? Ohhhh, aren't you that dojo kid who's learning the art of hunting from the head himself? Come in come in, welcome! What is it you wish to deliver? Ah! Wonderful, excellent, this will last for plenty of time. Thank you for coming all this way in timely manner, you've been a great help. I will give you these to sample, as a reward, they will be useful to you. Oh, and one simple request, if you don't mind. Give this to him when you meet next time, it is very important that he gets it.",
                true
            );
            chs('"I can do it!"', false).addEventListener("click", () => {
                removeItem(item.htrsvr);
                giveItem(item.atd1, 3);
                giveItem(item.hptn1, 10);
                giveItem(item.psnwrd);
                giveItem(item.hptn2);
                giveItem(item.hbtsvr);
                smove(chss.pha1);
            });
        });

    chs('"<= Return back"', false).addEventListener("click", () => {
        smove(chss.mrktvg1);
    });
};
chss.pha1.data = {
    scoutm: 200,
    scout: 0,
    scoutf: false,
    gets: [false],
    gotmod: 0,
};
chss.pha1.scout = [
    {
        c: 0.01,
        f: () => {
            msg(
                select([
                    "You notice a coin on the ground!",
                    "You pick a coin from under the counter",
                    "You snatch a coin while no one is looking",
                ]),
                "lime"
            );
            giveItem(select([item.cp, item.cn, item.cq, item.cd]));
            chss.pha1.data.gets[0] = true;
        },
        exp: 5,
    },
];
chss.pha1.onScout = function () {
    scoutGeneric(this);
};

chss.vndr1 = new Chs();
chss.vndr1.id = 116;
chss.vndr1.effectors = [{ e: effector.shop }];
addtosector(sector.vcent, chss.vndr1);
addtosector(sector.vmain1, chss.vndr1);
chss.vndr1.sl = () => {
    d_loc("Village Center, Street Food Stand");
    global.lst_loc = 116;
    vendor.stvr1.restocked = false;
    clearInterval(timers.vndrstkchk);
    timers.vndrstkchk = setInterval(function () {
        if (vendor.stvr1.restocked === true) {
            clearInterval(timers.vndrstkchk);
            vendor.stvr1.restocked = false;
            msg("We're restocking, step out for a minute");
            smove(chss.lsmain1, false);
        }
    });
    let hi = "Street Merchant Ran: Welcome! What would you like?";
    dom.vndr1 = chs(hi, true);
    for (let ost = 0; ost < vendor.stvr1.stock.length; ost++) {
        let itm = vendor.stvr1.stock[ost];
        dom.vndrs = chs(
            itm[0].name + ' <small style="color:rgb(255, 116, 63)">' + itm[2] + "●</small> x" + itm[1],
            false
        );
        dom.vndrs.addEventListener("click", function () {
            if (you.wealth - itm[2] >= 0) {
                spend(itm[2]);
                mf(-itm[2], 1);
                m_update();
                giveItem(itm[0]);
                global.stat.buyt++;
                if (--itm[1] === 0) {
                    clr_chs(vendor.stvr1.stock.indexOf(itm) + 1);
                    vendor.stvr1.stock.splice(vendor.stvr1.stock.indexOf(itm), 1);
                    empty(global.dscr);
                    global.dscr.style.display = "none";
                } else
                    this.innerHTML =
                        itm[0].name + ' <small style="color:rgb(255, 116, 63)">' + itm[2] + "●</small> x" + itm[1];
            } else {
                clearTimeout(timers.shopcant);
                dom.vndr1.innerHTML = "Sorry you can't afford that!";
                timers.shopcant = setTimeout(() => {
                    dom.vndr1.innerHTML = hi;
                }, 1000);
            }
        });
        addDesc(dom.vndrs, itm[0]);
    }
    chs('"<= Go back"', false).addEventListener("click", () => {
        smove(chss.lsmain1, false);
        clearInterval(timers.vndrstkchk);
    });
};

chss.vndrkd1 = new Chs();
chss.vndrkd1.id = 123;
chss.vndrkd1.shop = true;
addtosector(sector.vcent, chss.vndrkd1);
addtosector(sector.vmain1, chss.vndrkd1);
chss.vndrkd1.sl = () => {
    d_loc("Village Center, Child Trader");
    global.lst_loc = 123;
    vendor.kid1.restocked = false;
    clearInterval(timers.vndrstkchk);
    timers.vndrstkchk = setInterval(function () {
        if (vendor.kid1.restocked === true) {
            clearInterval(timers.vndrstkchk);
            vendor.kid1.restocked = false;
            msg("You, step out for a moment, I'm getting new stuff");
            smove(chss.lsmain1, false);
        }
    });
    let hi = "Hey, I've got some good stuff for you";
    dom.vndr1 = chs(hi, true);
    for (let ost = 0; ost < vendor.kid1.stock.length; ost++) {
        let itm = vendor.kid1.stock[ost];
        dom.vndrs = chs(
            itm[0].name + ' <small style="color:rgb(255, 116, 63)">' + itm[2] + "●</small> x" + itm[1],
            false
        );
        dom.vndrs.addEventListener("click", function () {
            if (you.wealth - itm[2] >= 0) {
                spend(itm[2]);
                mf(-itm[2], 1);
                m_update();
                giveItem(itm[0]);
                global.stat.buyt++;
                if (--itm[1] === 0) {
                    clr_chs(vendor.kid1.stock.indexOf(itm) + 1);
                    vendor.kid1.stock.splice(vendor.kid1.stock.indexOf(itm), 1);
                    empty(global.dscr);
                    global.dscr.style.display = "none";
                } else
                    this.innerHTML =
                        itm[0].name + ' <small style="color:rgb(255, 116, 63)">' + itm[2] + "●</small> x" + itm[1];
            } else {
                clearTimeout(timers.shopcant);
                dom.vndr1.innerHTML = "Bring money next time";
                timers.shopcant = setTimeout(() => {
                    dom.vndr1.innerHTML = hi;
                }, 1000);
            }
        });
        addDesc(dom.vndrs, itm[0]);
    }
    if (skl.fgt.lvl >= 5 && !global.flags.vndrkd1sp1)
        chs('"Show me something better"', false, "darkgrey").addEventListener("click", () => {
            chs(
                "So you want something from the hidden stash, huh? Good eye! You are one of the dojo runts, I've got just what someone like you needs. One book, 3 silver" +
                    dom.coinsilver +
                    ". So, watcha say?",
                true
            );
            chs('"Give me"', false, "lime").addEventListener("click", () => {
                if (you.wealth >= 300) {
                    chs('"There ya go, enjoy"', true);
                    global.flags.vndrkd1sp1 = true;
                    giveItem(item.fgtsb1);
                    spend(300);
                    chs('"Sweet purchase!"', false).addEventListener("click", () => {
                        smove(chss.lsmain1, false);
                    });
                } else {
                    chs("No money - no goods! Don't waste my time!", true);
                    chs('"<= Go back"', false).addEventListener("click", () => {
                        smove(chss.lsmain1, false);
                    });
                }
            });
            chs('"<= Nah"', false, "Red").addEventListener("click", () => {
                chs("No worries, I'll keep it for you", true);
                chs('"<= Go back"', false).addEventListener("click", () => {
                    smove(chss.lsmain1, false);
                });
            });
        });
    else if (global.stat.moneyg >= 1000 && !global.flags.vndrkd1sp2 && global.flags.vndrkd1sp1)
        chs('"Show me something better"', false, "darkgrey").addEventListener("click", () => {
            chs(
                "Alright, there's something else for you, snatched from some sleeping guy and I bet would be useful for you. Similar deal, 5 silver" +
                    dom.coinsilver,
                true
            );
            chs('"Yes please"', false, "lime").addEventListener("click", () => {
                if (you.wealth >= 500) {
                    chs('"Deal successfully made"', true);
                    global.flags.vndrkd1sp2 = true;
                    giveItem(item.bfsnwt);
                    spend(500);
                    chs('"Score!"', false).addEventListener("click", () => {
                        smove(chss.lsmain1, false);
                    });
                } else {
                    chs("No money - no goods! Don't waste my time!", true);
                    chs('"<= Go back"', false).addEventListener("click", () => {
                        smove(chss.lsmain1, false);
                    });
                }
            });
            chs('"<= Nah"', false, "Red").addEventListener("click", () => {
                chs("No worries, I'll keep it for you", true);
                chs('"<= Go back"', false).addEventListener("click", () => {
                    smove(chss.lsmain1, false);
                });
            });
        });
    chs('"<= Go back"', false).addEventListener("click", () => {
        smove(chss.lsmain1, false);
    });
};
chss.vndrkd1.onLeave = function () {
    clearInterval(timers.vndrstkchk);
};

chss.tstauto = new Chs();
chss.tstauto.id = -1;
chss.tstauto.sl = () => {
    d_loc("Test auto");
    global.lst_loc = -1;
    dom.testauto = chs("TEST", true);
    if (!global.flags.testauto_1 || global.flags.testauto_1 === false)
        chs("Run", false).addEventListener("click", () => {
            global.flags.testauto_1 = true;
            timers.testauto1 = setInterval(() => {
                dom.testauto.innerHTML = rand(9999999);
            }, 1000);
            chss.tstauto.sl();
        });
    else
        chs("Stop", false).addEventListener("click", () => {
            global.flags.testauto_1 = false;
            chss.tstauto.sl();
            clearInterval(timers.testauto1);
        });
    chs('"<= Go back"', false).addEventListener("click", () => {
        chss.lsmain1.sl();
    });
};

chss.tst = new Chs();
chss.tst.id = -1;
chss.tst.sl = () => {
    d_loc("Test");
    global.lst_loc = -1;
    dom.tst = chs("TEST", true);
    global.flags.btl = true;
    global.flags.civil = false;
    area_init(area.tst);
    chs('"<= Go back"', false).addEventListener("click", () => {
        chss.lsmain1.sl();
    });
};

chss.cat1 = new Chs();
chss.cat1.id = 107;
addtosector(sector.vcent, chss.cat1);
addtosector(sector.vmain1, chss.cat1);
chss.cat1.sl = () => {
    d_loc("Village Center, Cat"); //global.lst_loc = 107;
    let w = !global.stat.cat_c ? chs("There is a cat.", true) : chs("There is a cat. Pets: " + global.stat.cat_c, true);
    chs('"Pet the cat"', false).addEventListener("click", (x) => {
        let a = addElement(document.body, "span");
        a.style.pointerEvents = "none";
        a.style.position = "absolute";
        a.style.color = "lime";
        a.innerHTML = select([":3", "'w'", "'ω'", "(=・∀・=)", "*ﾟヮﾟ"]);
        a.style.top = -55;
        a.style.left = -55;
        a.style.fontSize = "1.25em";
        a.style.textShadow = "2px 2px 1px blue";
        a.posx = x.clientX - 20;
        a.posy = x.clientY - 20;
        a.spos = randf(-1, 1);
        let t = 0;
        let g = setInterval(() => {
            t++;
            a.style.top = a.posy - 2 * t;
            a.style.left = a.posx + Math.sin(t / 5 + a.spos) * 15;
            a.style.opacity = (110 - t) / 110;
            if (t === 110) {
                clearInterval(g);
                document.body.removeChild(a);
            }
        }, 20);
        global.stat.cat_c++;
        if (global.stat.cat_c < 333) skl.pet.use();
        w.innerHTML = "There is a cat. Pets: " + global.stat.cat_c;
        if (global.stat.cat_c >= 100) {
            if (!global.flags.cat_g) {
                clr_chs(2);
                global.flags.cat_g = true;
                chs('"???"', false).addEventListener("click", () => {
                    chs("Cat wants to tag along", true);
                    chs('"Take it with you"', false).addEventListener("click", () => {
                        let cat = giveFurniture(furniture.cat, true, false);
                        cat.data.sex = rand(1);
                        cat.data.c = rand(global.text.cfc.length - 1);
                        cat.data.p = rand(global.text.cfp.length - 1);
                        cat.data.l1 = rand(global.text.cln.length - 1);
                        let tg = rand(global.text.cln.length - 1);
                        do {
                            tg = rand(global.text.cln.length - 1);
                        } while (tg === cat.data.l1);
                        cat.data.l2 = rand(global.text.cln.length - 1);
                        global.flags.catget = true;
                        msg("The cat decided to move into your house!", "lime");
                        smove(chss.lsmain1);
                    });
                    chs('"Leave it as is"', false).addEventListener("click", () => {
                        smove(chss.lsmain1);
                    });
                });
                chs('"<= Return"', false).addEventListener("click", () => {
                    smove(chss.lsmain1);
                });
            }
        }
    });
    if (global.stat.cat_c >= 100) {
        chs('"???"', false).addEventListener("click", () => {
            chs("Cat wants to tag along", true);
            chs('"Take it with you"', false).addEventListener("click", () => {
                let cat = giveFurniture(furniture.cat, true, false);
                cat.data.sex = rand(1);
                cat.data.c = rand(global.text.cfc.length - 1);
                cat.data.p = rand(global.text.cfp.length - 1);
                cat.data.l1 = rand(global.text.cln.length - 1);
                let tg = rand(global.text.cln.length - 1);
                do {
                    tg = rand(global.text.cln.length - 1);
                } while (tg === cat.data.l1);
                cat.data.l2 = rand(global.text.cln.length - 1);
                global.flags.catget = true;
                msg("The cat decided to move into your house!", "lime");
                smove(chss.lsmain1);
            });
            chs('"Leave it as is"', false).addEventListener("click", () => {
                smove(chss.lsmain1);
            });
        });
    }
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};

global.text.mbrdtt = [
    '"If you do not work your hours daily, you will not get any dessert"',
    '"Do your job well and you will be rewarded"',
    "There is a report of a missing cat",
    "There is a section of useless gossip",
    "This is an  advertisement for fresh vegetables",
    "This is an advertisement for dojo membership",
    "This is an advertisement for wooden furniture",
    "This is an advertisement for dried meat",
    "This is an advertisement for joining the militia",
    '"The Hunter Association offers you a large variety of boxes full of smoked meat and furs"',
    "This is an advertisement for herbal medicine",
    "This is an advertisement for wine kegs",
    "This is an advertisement for farming equipment",
    "This is an advertisement for carpentery supplies",
    '"All the children must return home by 8PM!"',
    "This is an advertisement for smithing orders",
    "This is an advertisement for cooking courses",
    "This is an advertisement for bottled water",
    "This is an advertisement for knitting advices",
    "This is an advertisement for cleaning services",
    "This is a warning to stay away from fortune tellers",
    "This is an advertisement for woven straw baskets",
    "This is an advertisement for hemp clothing",
];

chss.mbrd = new Chs();
chss.mbrd.id = 108;
addtosector(sector.vcent, chss.mbrd);
addtosector(sector.vmain1, chss.mbrd);
chss.mbrd.sl = () => {
    d_loc("Village Center, Message Board");
    global.lst_loc = 108;
    for (let a in inv)
        if (
            inv[a].id === acc.wdl1.id ||
            inv[a].id === acc.sdl1.id ||
            inv[a].id === acc.bdl1.id ||
            inv[a].id === acc.gdl1.id
        ) {
            if (!global.flags.glqtdltn && getHour() < 20 && getHour() > 8 && random() < 0.15) {
                {
                    chs("You notice a little girl with emerald green hair approach you", true);
                    chs('"?"', false).addEventListener("click", () => {
                        chs(
                            '<span style="color:lime">Xiao Xiao</span>: "Hey, hey, what are those dolls you carry? Make one for me!!"',
                            true
                        );
                        chs('"Alright..."', false).addEventListener("click", () => {
                            global.flags.glqtdltn = true;
                            smove(chss.mbrd, false);
                        });
                    });
                }
                return;
            }
            break;
        }
    chs("Message Board<br>You can find jobs or other stuff here", true);
    chs('"Explore the posts"', false).addEventListener("click", () => {
        chs(select(global.text.mbrdtt), true);
        chs('"<= Return"', false).addEventListener("click", () => {
            smove(chss.mbrd, false);
        });
    });
    if (global.flags.frstn1b1g1) {
        chs('"Notice #4"', false).addEventListener("click", () => {
            chs(
                'It says here:<br><span style="color:orange">Looking for a anyone with free time to assist local militia with guarding duty. Apply at the checkpoint near marketplace area between 7AM and 10AM"</span>',
                true
            );
            chs('"Huh.."', false).addEventListener("click", () => {
                global.flags.grddtjb = true;
                smove(chss.mbrd);
            });
        });
        chs('"Warning!"', false).addEventListener("click", () => {
            chs(
                'Dangerous beasts were sighted in vicinity of the Southern Forest. These reports are likely linked to the cause of livestock and locals getting injured, therefore, to avoid further casualties, entry into the forest is prohibited to those without permit or high enough self-defence ability until the situation is resolved<br><br><div style="text-align:right">一Head of The Guard, Hitoshi</div>',
                true
            );
            chs('"I see"', false).addEventListener("click", () => {
                smove(chss.mbrd);
            });
        });
    }
    if (global.flags.glqtdltn && !global.flags.glqtdldn && getHour() < 20 && getHour() > 8) {
        chs('"Xiao Xiao =>"', false).addEventListener("click", () => {
            smove(chss.xpgdqt1, false);
        });
    }
    chs('"<= Go back"', false).addEventListener("click", () => {
        smove(chss.lsmain1, false);
    });
};

chss.xpgdqt1 = new Chs();
chss.xpgdqt1.id = 167;
addtosector(sector.vcent, chss.xpgdqt1);
addtosector(sector.vmain1, chss.xpgdqt1);
chss.xpgdqt1.sl = () => {
    d_loc("Village Center, Message Board");
    global.lst_loc = 166;
    chs('<span style="color:lime">Xiao Xiao</span>: "What is it what is it?"', true);
    let dl1 = findbyid(inv, acc.wdl1.id);
    let dl2 = findbyid(inv, acc.sdl1.id);
    let dl3 = findbyid(inv, acc.bdl1.id);
    let dl4 = findbyid(inv, acc.gdl1.id);
    if (dl1) {
        chs('"Show Xiao Xiao a wooden doll"', false).addEventListener("click", () => {
            chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s ugly!!"', true);
            chs('"<= Take it back"', false).addEventListener("click", () => {
                smove(chss.xpgdqt1, false);
            });
        });
    }
    if (dl2) {
        chs('"Show Xiao Xiao a straw doll"', false).addEventListener("click", () => {
            chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s creepy!!"', true);
            chs('"<= Take it back"', false).addEventListener("click", () => {
                smove(chss.xpgdqt1, false);
            });
        });
    }
    if (dl3) {
        chs('"Show Xiao Xiao a bone doll"', false).addEventListener("click", () => {
            chs('<span style="color:lime">Xiao Xiao</span>: "Nooooo it\'s scary!!"', true);
            chs('"<= Take it back"', false).addEventListener("click", () => {
                smove(chss.xpgdqt1, false);
            });
        });
    }
    if (dl4) {
        chs('"Show Xiao Xiao a soul doll"', false).addEventListener("click", () => {
            chs(
                '<span style="color:lime">Xiao Xiao</span>: "Waai thank you! I love it! I\'ll give you this! Here, take!"<br><br><span style="color:lightgrey">The girl happily runs away with her new toy</span>',
                true
            );
            chs('"Claim your hardearned reward"', false).addEventListener("click", () => {
                removeItem(dl4);
                global.flags.glqtdldn = true;
                global.offline_evil_index -= 0.002;
                msg("You feel more peaceful", "gold");
                giveItem(acc.ubrlc);
                smove(chss.mbrd, false);
            });
        });
    }
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.mbrd, false);
    });
};

chss.trd = new Chs();
chss.trd.id = 109;
chss.trd.sl = function (b, x) {
    global.flags.rdng = true;
    let rd = skl.rdg.use();
    b.data.timep = b.data.timep || 0;
    b.cmax = (b.data.time * (1 / (1 + rd / 10))) / you.mods.rdgrt - (1 / (1 + rd / 10) - 1) / you.mods.rdgrt;
    let c = b.cmax - b.data.timep;
    if (c < 0) c = 0;
    let ttxt;
    if (c > HOUR) ttxt = ((c / HOUR) << 0) + "</span> hours to finish";
    else ttxt = (c << 0) + "</span> minutes to finish";
    dom.trdc = chs("", true);
    dom.trd = addElement(dom.trdc, "span");
    dom.trd.innerHTML =
        'You are reading <span style="color:orange">' +
        b.name +
        '</span><br>It will take you about <span style="color:lime">' +
        ttxt;
    dom.trddots = addElement(dom.trdc, "span");
    dom.trddots.frames = ["", ".", "..", "..."];
    dom.trddots.frame = 0;
    dom.trddots.style.position = "absolute";
    timers.rdngdots = setInterval(() => {
        dom.trddots.innerHTML =
            dom.trddots.frames[(dom.trddots.frame = dom.trddots.frame > 2 ? 0 : ++dom.trddots.frame)];
    }, 333);
    timers.rdng = setInterval(() => {
        global.stat.rdgtttl++;
        let rd = skl.rdg.use();
        giveSkExp(skl.rdg, x || 1);
        b.cmax = (b.data.time * (1 / (1 + rd / 10))) / you.mods.rdgrt - (1 / (1 + rd / 10) - 1) / you.mods.rdgrt;
        let c = b.cmax - b.data.timep;
        if (c < 0) c = 0;
        let ttxt;
        if (c > HOUR) ttxt = ((c / HOUR) << 0) + "</span> hours to finish";
        else ttxt = (c << 0) + "</span> minutes to finish";
        dom.trd.innerHTML =
            'You are reading <span style="color:orange">' +
            b.name +
            '</span><br>It will take you about <span style="color:lime">' +
            ttxt;
        if (++b.data.timep >= b.cmax) {
            clearInterval(timers.rdng);
            clearInterval(timers.rdngdots);
            global.stat.rdttl++;
            global.flags.rdng = false;
            for (let gg in chss) if (chss[gg].id === global.lst_loc) chss[gg].sl();
            b.use();
            reduce(b);
            b.data.timep = 0;
        }
    }, 1000);
    chs('"Stop reading"', false).addEventListener("click", () => {
        clearInterval(timers.rdng);
        clearInterval(timers.rdngdots);
        global.flags.rdng = false;
        for (let gg in chss) if (chss[gg].id === global.lst_loc) chss[gg].sl();
    });
};

chss.home = new Chs();
chss.home.id = 111;
addtosector(sector.home, chss.home);
chss.home.sl = () => {
    d_loc("Your Home");
    global.lst_loc = 111;
    if (!global.flags.catget || sector.home.data.smkp > 0) chs("Your humble abode. You can rest here. ", true);
    else {
        if (!global.text.hmcttt)
            global.text.hmcttt = ["Your cat comes out to greet you!", "", "You hear rustling", "Meow"];
        chs("You feel safe. You can rest here. " + select(global.text.hmcttt), true);
    }
    if (!global.flags.hbgget)
        chs('"Examine your bag"', false).addEventListener("click", () => {
            chs("Something you've forgotten to grab before. There's a pack of food and some junk idea paper.", true);
            chs("Better take this with you", false).addEventListener("click", () => {
                global.flags.hbgget = true;
                giveItem(eqp.bnd);
                giveItem(item.ip1);
                giveItem(item.watr, 10);
                giveItem(wpn.wsrd1);
                giveItem(item.eggn, 3);
                giveItem(item.mlkn, 2);
                giveItem(item.rice, 5);
                giveItem(item.brd, 50);
                smove(chss.home, false);
            });
        });
    chs('"Crash down and take a nap"', false).addEventListener("click", () => {
        if (sector.home.data.smkp > 0) {
            msg("This isn't time for sleep", "red");
            return;
        }
        smove(chss.hbed, false);
    });
    if (!global.flags.chbdfst)
        chs('"Examine your hidden stash"', false).addEventListener("click", () => {
            chs("You reach for a small red box which you keep your valuables in, it is time to take it out", true);
            chs("Grab the contents", false).addEventListener("click", () => {
                giveItem(item.ywlt);
                giveItem(item.pdeedhs);
                global.flags.chbdfst = true;
                smove(chss.home, false);
            });
        });
    chs(global.flags.hbs1 === true ? '"Enter the basement"' : '"Examine basement door"', false).addEventListener(
        "click",
        () => {
            if (!global.flags.hbs1) {
                if (item.key0.have) {
                    msg("*click...* ", "lightgrey");
                    msg_add("The door has opened", "lime");
                    global.flags.hbs1 = true;
                    smove(chss.home, false);
                } else msg("It's locked");
            } else smove(chss.bsmnthm1, false);
        }
    );
    if (global.flags.hsedchk)
        chs(' "Furniture list"', false, "orange", "", 1, 8).addEventListener("click", () => {
            chs_spec(2);
            global.wdwidx = 1;
            chs('"<= Return"', false).addEventListener("click", () => {
                smove(chss.home, false);
            });
        });
    if (scanbyid(furn, furniture.frplc.id)) {
        chs('"Examine Fireplace"', false).addEventListener("click", () => {
            smove(chss.ofrplc, false);
        });
    }
    if (scanbyid(furn, furniture.strgbx.id)) {
        chs('"Access Storagebox"', false).addEventListener("click", () => {
            smove(chss.sboxhm, false);
        });
    }
    if (global.flags.catget) {
        tcat = findbyid(furn, furniture.cat.id);
        tcat.data.mood = tcat.data.mood || 1;
        chs('"Check on Cat"', false).addEventListener("click", () => {
            if (sector.home.data.smkp > 0) {
                msg("Your cat went outside", "yellow");
                return;
            }
            chs_spec(1);
            if (tcat.data.named === false)
                chs('"Rename"', false).addEventListener("click", () => {
                    chs("Give your cat a name!<br><small>(can't rename later!)</small>", true);
                    let inp = addElement(dom.ctr_2, "input", "chs");
                    inp.style.textAlign = "center";
                    inp.style.color = "white";
                    inp.style.fontFamily = "MS Gothic";
                    chs('"Accept"', false, "lime").addEventListener("click", () => {
                        if (inp.value == "" || inp.value.search(/ *$/) === 0)
                            msg("Actually give it a name, maybe?", "springgreen");
                        else if (inp.value.search(/[Kk][Ii][Rr][Ii]/) === 0) {
                            msg("Hey now! o:<", "crimson");
                            dom.gmsgs.children[1].lastChild.style.fontSize = "2em";
                        } else {
                            tcat.data.name = inp.value;
                            tcat.data.named = true;
                        }
                        smove(chss.home, false);
                    });
                    chs('"Decline"', false, "red").addEventListener("click", () => {
                        smove(chss.home, false);
                    });
                });
            dom.ctspcl = chs('"Pet ' + tcat.data.name + '"', false);
            dom.ctspcl.addEventListener("click", (x) => {
                let a = addElement(document.body, "span");
                global.stat.cat_c++;
                for (let x in global.cptchk) global.cptchk[x]();
                a.style.pointerEvents = "none";
                a.style.position = "absolute";
                a.style.color = "lime";
                a.innerHTML =
                    tcat.data.mood > 0.2
                        ? select([":3", "'w'", "'ω'", "(=・∀・=)", "*ﾟヮﾟ"])
                        : select(["¦3", "ーωー", "( ˘ω˘)", "(´-ω-`)", "(。-∀-)"]);
                a.style.top = -55;
                a.style.left = -55;
                a.style.fontSize = "1.25em";
                a.style.textShadow = "2px 2px 1px blue";
                a.posx = x.clientX - 20;
                a.posy = x.clientY - 20;
                a.spos = randf(-1, 1);
                let t = 0;
                let g = setInterval(() => {
                    t++;
                    a.style.top = a.posy - 2 * t;
                    a.style.left = a.posx + Math.sin(t / 5 + a.spos) * 15;
                    a.style.opacity = (110 - t) / 110;
                    if (t === 110) {
                        clearInterval(g);
                        document.body.removeChild(a);
                    }
                }, 20);
                tcat.data.mood = tcat.data.mood - 0.01 <= 0 ? 0 : tcat.data.mood - 0.01;
                if (tcat.data.mood >= 0.01) skl.pet.use();
            });
            chs('"<= Return"', false).addEventListener("click", () => {
                smove(chss.home, false);
                clearInterval(timers.caupd);
            });
        });
    }
    chs('"<= Go outside"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};

chss.home.data = {
    scoutm: 1200,
    scout: 0,
    scoutf: false,
    gets: [false, false],
    gotmod: 0,
};
chss.home.scout = [
    {
        c: 0.006,
        f: () => {
            msg("Oh, you forgot you had this around", "orange");
            giveItem(wpn.kiknif);
            chss.home.data.gets[0] = true;
        },
        exp: 30,
    },
    {
        c: 0.01,
        f: () => {
            msg("There was a coin stuck between the floor boards", "orange");
            giveItem(item.lcn);
            chss.home.data.gets[1] = true;
        },
        exp: 3,
    },
];
chss.home.onScout = function () {
    scoutGeneric(this);
};

chss.bsmnthm1 = new Chs();
chss.bsmnthm1.id = 158;
addtosector(sector.home, chss.bsmnthm1);
chss.bsmnthm1.effectors = [{ e: effector.dark }];
chss.bsmnthm1.sl = () => {
    d_loc("Your Home, Basement");
    global.lst_loc = 158;
    if (area.hmbsmnt.size > 0) {
        chs("Argh! This place is infested!", true, "red");
        area_init(area.hmbsmnt);
    } else {
        if (!cansee())
            chs(
                select(global.text.bsseldark) +
                    ". You can't see anything in this darkness, it'll be better if you find a lightsource",
                true,
                "darkgrey"
            );
        else {
            chs(select(global.text.bssel), true);
            if (!global.flags.bsmntchck)
                chs('"Examine your surroundings"', false).addEventListener("click", () => {
                    if (!cansee()) {
                        chs("Your light went off..", true, "darkgrey");
                        chs('"<= Return"', false).addEventListener("click", () => {
                            smove(chss.home, false);
                        });
                    } else {
                        chs(
                            "You glance around and find mountains of broken crates, shelves, boxes, furniture and other decaying goods. Don't expect to find anything of great value amongst this trash. Perhaps you can salvage at least something if you look careful enough" +
                                (!global.flags.bsmntchstgt ? ", like that giant chest over there" : ""),
                            true,
                            "orange"
                        );
                        if (!global.flags.bsmntchstgt)
                            chs('"Seek significance of a massive container"', false).addEventListener("click", () => {
                                chs(
                                    "It looks like an ordinary coffer, except it's unusually big and has a padlock, which thankfully isn't locked. You get a brilliant idea to carry this hunk-a-junk upstairs",
                                    true
                                );
                                chs('"Do exactly that"', false, "lime").addEventListener("click", () => {
                                    global.flags.bsmntchstgt = true;
                                    giveFurniture(furniture.strgbx);
                                    smove(chss.home, false);
                                    msg(
                                        "Phew! That felt like a workout! You won't need to descend into that awful basement anymore if you wish to access the Big Box",
                                        "orange"
                                    );
                                    msg("Your muscles feel stronger!", "lime");
                                    msg("STR increased by +1 permanently", "lime");
                                    you.sat *= 0.5;
                                    you.stra++;
                                    you.stat_r();
                                });
                            });
                        if (!global.flags.bsmntsctgt)
                            chs('"Rummage through rubble"', false).addEventListener("click", () => {
                                chs(
                                    "Indeed, simply glancing over the rubble won't reveal you any hidden secrets, you think you better investigate everything carefully",
                                    true
                                );
                                chs('"Prepare for further examination"', false).addEventListener("click", () => {
                                    global.flags.bsmntsctgt = true;
                                    giveAction(act.scout);
                                    global.current_a.deactivate();
                                    global.current_a = act.default;
                                    smove(chss.bsmnthm1, false);
                                });
                            });
                        chs('"<= Return"', false).addEventListener("click", () => {
                            smove(chss.bsmnthm1, false);
                        });
                    }
                });
        }
    }
    chs('"<= Return"', false).addEventListener("click", () => {
        smove(chss.home, false);
    });
};
chss.bsmnthm1.data = {
    scoutm: 900,
    scout: 0,
    scoutf: false,
    gets: [false, false],
    gotmod: 0,
};
chss.bsmnthm1.scout = [
    {
        c: 0.01,
        f: () => {
            msg("You found a pouch with some coins!", "lime");
            giveItem(item.cp, rand(1, 5));
            giveItem(item.cn, rand(1, 5));
            giveItem(item.cq, rand(1, 5));
            chss.bsmnthm1.data.gets[0] = true;
        },
        exp: 40,
    },
    {
        c: 0.03,
        f: () => {
            msg(
                "You found a pile of scattered firewood, some logs seem useful but others have rotted completely. You decide to grab them anyway"
            );
            giveItem(item.fwd1, rand(2, 4));
            giveItem(item.wdc, (45, 90));
            chss.bsmnthm1.data.gets[1] = true;
        },
        exp: 10,
    },
    {
        c: 0.03,
        f: () => {
            chs(
                "Among the rabble and remains of collapsed bookshelves you decide to confirm if anything survived. Rotten and soaked in basement juices books seems unsalvagable, bookshelves as well, you can't even tell if they are made of wood anymore. One of the books was incased into a small mound formed by rocks and sand, it seems surprisingly fine",
                true
            );
            chs('"<= I\'m taking this"', false).addEventListener("click", () => {
                chss.bsmnthm1.data.gets[2] = true;
                giveItem(item.jnlbk);
                deactivateAct(global.current_a);
                smove(chss.bsmnthm1, false);
            });
        },
        exp: 15,
    },
];
chss.bsmnthm1.onScout = function () {
    scoutGeneric(this);
};

chss.hbed = new Chs();
chss.hbed.id = 112;
addtosector(sector.home, chss.hbed);
chss.hbed.sl = () => {
    d_loc("Your Home, Bed");
    global.lst_loc = 112;
    let extra = "";
    if (you.alive === false) {
        chs(select(["You lost consciousness...", "You have been knocked out...", "You passed out..."]), true);
        you.alive = true;
    } else {
        if (global.flags.catget) extra = select([". Your cat is resting next to you", ". You feel warm"]);
        chs("Great way to pass time" + extra, true);
    }
    chs('"<= Get up"', false).addEventListener("click", () => {
        for (let i in chss) if (chss[i].id === global.home_loc) smove(chss[i]);
    });
};
chss.hbed.onStay = function () {
    let hpr = (skl.sleep.use(home.bed) + (global.flags.catget ? 5 : 1) + 1) << 0;
    if (!effect.fei1.active && you.hp < you.hpmax) {
        you.hp + hpr <= you.hpmax ? (you.hp += hpr) : (you.hp = you.hpmax);
        dom.d5_1_1.update();
    }
    // if(global.current_z.id!==-666&&random()<.00001){
    //   let ta = new Area(); ta.id=-666;
    //   ta.name = 'Nightmare';
    //   ta.pop = [{crt:creature.ngtmr1,lvlmin:you.lvl,lvlmax:you.lvl,c:1}]; ta.protected=true;
    //   ta.onEnd=function(){area_init(area.nwh);global.flags.civil=true; global.flags.btl=false;}; global.flags.civil=false; global.flags.btl=true;
    //   ta.size = 1; z_bake(ta); area_init(ta); dom.d7m.update(); msg('Your sins are crawling up on you','red')
    //}
};
chss.hbed.onEnter = function () {
    global.flags.sleepmode = true;
    if (effect.slep.active === false) giveEff(you, effect.slep);
    global.timescale = 5;
};
chss.hbed.onLeave = function () {
    global.flags.sleepmode = false;
    global.timescale = 1;
    removeEff(effect.slep);
};

chss.ofrplc = new Chs();
chss.ofrplc.id = 117;
addtosector(sector.home, chss.ofrplc);
chss.ofrplc.sl = () => {
    d_loc("Your Home, Fireplace");
    let fire = findbyid(furn, furniture.frplc.id);
    global.lst_loc = 117;
    //dom.d_lctt.innerHTML+='<span style="color:orange;font-size:1.2em">&nbspⓞ<span>'
    let its = [];
    if (findbyid(inv, item.fwd1.id)) its.push([findbyid(inv, item.fwd1.id), "some firewood", 30]);
    if (findbyid(inv, item.coal1.id)) its.push([findbyid(inv, item.coal1.id), "some coal", 300]);
    if (findbyid(inv, item.coal2.id)) its.push([findbyid(inv, item.coal2.id), "some charcoal", 300]);
    if (findbyid(inv, wpn.stk1.id)) its.push([findbyid(inv, wpn.stk1.id), "a stick", 15]);
    if (!global.text.fplcextra)
        global.text.fplcextra = [
            "You'll need fire if you want to get some cooking done",
            "You can warm up here if you light it up",
        ];
    if (!global.text.frplcfrextra)
        global.text.frplcfrextra = [
            "You notice the fire flickering slightly",
            "Tiny fire is warming up the room",
            "Comfy fire lights up the surroundings",
            "Bright flame is roaring inside the Fireplace",
        ];
    let textra0;
    if (fire.data.fuel === 0) textra0 = "";
    else if (fire.data.fuel <= 60) textra0 = global.text.frplcfrextra[0];
    else if (fire.data.fuel >= 130 && fire.data.fuel <= 300) textra0 = global.text.frplcfrextra[1];
    else if (fire.data.fuel >= 300 && fire.data.fuel <= 540) textra0 = global.text.frplcfrextra[2];
    else if (fire.data.fuel >= 540) textra0 = global.text.frplcfrextra[3];
    dom.frpls = chs("Comfy fireplace. " + (select(global.text.fplcextra) + "<br>" + textra0), true);
    if (!global.flags.fplcgtwd)
        chs('"Retrieve spare firewood. You have a feeling you\'ll need it"', false).addEventListener(
            "click",
            function () {
                msg("You have some lying around nearby", "orange");
                global.flags.fplcgtwd = true;
                giveItem(item.fwd1, 3);
                smove(chss.ofrplc, false);
            }
        );
    for (let a in its) {
        chs('"' + select(["Toss ", "Throw "]) + its[a][1] + ' into the fireplace"', false).addEventListener(
            "click",
            function () {
                its[a][0].amount--;
                fire.data.fuel = fire.data.fuel + its[a][2] > its[a][2] ? its[a][2] : fire.data.fuel + its[a][2];
                if (fire.data.fuel <= its[a][2]) dom.frpls.innerHTML = global.text.frplcfrextra[0];
                else if (fire.data.fuel >= 130 && fire.data.fuel <= 300)
                    dom.frpls.innerHTML = global.text.frplcfrextra[1];
                else if (fire.data.fuel >= 300 && fire.data.fuel <= 540)
                    dom.frpls.innerHTML = global.text.frplcfrextra[2];
                else if (fire.data.fuel >= 540) dom.frpls.innerHTML = global.text.frplcfrextra[3];
                if (its[a][0].amount <= 0) {
                    removeItem(its[a][0]);
                    dom.ctr_2.removeChild(this);
                } else if (global.sm === 1) updateInv(inv.indexOf(its[a][0]));
                else if (global.sm === its[a][0]) updateInv(global.sinv.indexOf(its[a][0]));
            }
        );
    }
    let afire = findbyid(furn, furniture.fwdpile.id);
    if (afire && afire.data.fuel > 0) {
        chs('"Light a fire"', false, "orange").addEventListener("click", () => {
            if (effect.fplc.active) msg("Fire is already on", "orange");
            else {
                afire.data.fuel--;
                fire.data.fuel += 16;
            }
        });
    }
    chs('"<= Step away"', false).addEventListener("click", () => {
        smove(chss.home, false);
    });
};

chss.sboxhm = new Chs();
chss.sboxhm.id = 131;
addtosector(sector.home, chss.sboxhm);
chss.sboxhm.sl = () => {
    d_loc("Your Home, Storage Box");
    //  chs('"Your botomless storage container, full of your belongings"',true)
    chs_spec(3, home.trunk);
    chs('"<= Step Away"', false, "", "", null, null, null, true).addEventListener("click", () => {
        smove(chss.home, false);
    });
};

global.text.catasound = [
    "You are hearing weird sounds",
    "Crunching sound echoes",
    "Your feet sink into the muddy ground",
    "You hear wailing",
    "Something growls in the distance",
    "Damp stagnant air of the underground makes it difficult to breathe",
    "You hear bones",
    "You notice something move in the darkness",
    "You feel sinister aura",
    "Aged walls have something written on them, but you are unable to decipher what it is",
    "Bone bits are littered on the ground",
    "Old rotting cloth is hanging from the walls",
    "Something rusty sparkes from below",
    "old stale air fills your lungs",
];

chss.catamn = new Chs();
chss.catamn.id = 132;
addtosector(sector.cata1, chss.catamn);
chss.catamn.sl = () => {
    d_loc("Catacombs, The Entryway");
    global.lst_loc = 132;
    chs('"You have entered the Catacombs"', true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata1);
    });
    chs('"<= Exit"', false).addEventListener("click", () => {
        smove(chss.lsmain1);
    });
};

chss.cata1 = new Chs();
chss.cata1.id = 133;
addtosector(sector.cata1, chss.cata1);
chss.cata1.sl = () => {
    d_loc("Catacombs, The Casket Service");
    global.lst_loc = 133;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata13);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata2);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.catamn);
    });
};

chss.cata2 = new Chs();
chss.cata2.id = 134;
addtosector(sector.cata1, chss.cata2);
chss.cata2.sl = () => {
    d_loc("Catacombs, The Mourning Hall");
    global.lst_loc = 134;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata1);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata3);
    });
};

chss.cata3 = new Chs();
chss.cata3.id = 135;
addtosector(sector.cata1, chss.cata3);
chss.cata3.sl = () => {
    d_loc("Catacombs, The Last Breath");
    global.lst_loc = 135;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata4);
    });
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata2);
    });
};

chss.cata4 = new Chs();
chss.cata4.id = 136;
addtosector(sector.cata1, chss.cata4);
chss.cata4.sl = () => {
    d_loc("Catacombs, Tunnel of the Dead");
    global.lst_loc = 136;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata5);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata3);
    });
};

chss.cata5 = new Chs();
chss.cata5.id = 137;
addtosector(sector.cata1, chss.cata5);
chss.cata5.sl = () => {
    d_loc("Catacombs, Movement Below");
    global.lst_loc = 137;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata6, false);
    });
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata12);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata4);
    });
};

chss.cata6 = new Chs();
chss.cata6.id = 138;
addtosector(sector.cata1, chss.cata6);
chss.cata6.sl = () => {
    d_loc("Catacombs, The Web Corridor");
    global.lst_loc = 138;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata7);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata5);
    });
};

chss.cata7 = new Chs();
chss.cata7.id = 139;
addtosector(sector.cata1, chss.cata7);
chss.cata7.sl = () => {
    d_loc("Catacombs, Grievance");
    global.lst_loc = 139;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata8);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata6);
    });
};

chss.cata8 = new Chs();
chss.cata8.id = 140;
addtosector(sector.cata1, chss.cata8);
chss.cata8.sl = () => {
    d_loc("Catacombs, Forgotten Post");
    global.lst_loc = 140;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata9);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata7);
    });
};

chss.cata9 = new Chs();
chss.cata9.id = 141;
addtosector(sector.cata1, chss.cata9);
chss.cata9.sl = () => {
    d_loc("Catacombs, Withered Hand");
    global.lst_loc = 141;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata8);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata10);
    });
};

chss.cata10 = new Chs();
chss.cata10.id = 142;
addtosector(sector.cata1, chss.cata10);
chss.cata10.sl = () => {
    d_loc("Catacombs, The Rusted Arc");
    global.lst_loc = 142;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata9);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata11);
    });
};

chss.cata11 = new Chs();
chss.cata11.id = 143;
addtosector(sector.cata1, chss.cata11);
chss.cata11.sl = () => {
    d_loc("Catacombs, Old One's Destination");
    global.lst_loc = 143;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata10);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata12);
    });
};

chss.cata12 = new Chs();
chss.cata12.id = 144;
addtosector(sector.cata1, chss.cata12);
chss.cata12.sl = () => {
    d_loc("Catacombs, Thawing Candles");
    global.lst_loc = 144;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata11);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata5);
    });
};

chss.cata13 = new Chs();
chss.cata13.id = 145;
addtosector(sector.cata1, chss.cata13);
chss.cata13.sl = () => {
    d_loc("Catacombs, The Endless Echoes");
    global.lst_loc = 145;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata14);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata1);
    });
};

chss.cata14 = new Chs();
chss.cata14.id = 146;
addtosector(sector.cata1, chss.cata14);
chss.cata14.sl = () => {
    d_loc("Catacombs, The Dusty Underpass");
    global.lst_loc = 146;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata15);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata13);
    });
};

chss.cata15 = new Chs();
chss.cata15.id = 147;
addtosector(sector.cata1, chss.cata15);
chss.cata15.sl = () => {
    d_loc("Catacombs, Light's Corner");
    global.lst_loc = 147;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata16);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata14);
    });
};

chss.cata16 = new Chs();
chss.cata16.id = 148;
addtosector(sector.cata1, chss.cata16);
chss.cata16.sl = () => {
    d_loc("Catacombs, Son's Last Visit");
    global.lst_loc = 148;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata17);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata15);
    });
};

chss.cata17 = new Chs();
chss.cata17.id = 149;
addtosector(sector.cata1, chss.cata17);
chss.cata17.sl = () => {
    d_loc("Catacombs, The Stone Plate");
    global.lst_loc = 149;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata18);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata16);
    });
};

chss.cata18 = new Chs();
chss.cata18.id = 150;
addtosector(sector.cata1, chss.cata18);
chss.cata18.sl = () => {
    d_loc("Catacombs, Cracked Passageway");
    global.lst_loc = 150;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata19);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata17);
    });
};

chss.cata19 = new Chs();
chss.cata19.id = 151;
addtosector(sector.cata1, chss.cata19);
chss.cata19.sl = () => {
    d_loc("Catacombs, The Limited Leeway");
    global.lst_loc = 151;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata20);
    });
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata18);
    });
};

chss.cata20 = new Chs();
chss.cata20.id = 152;
addtosector(sector.cata1, chss.cata20);
chss.cata20.sl = () => {
    d_loc("Catacombs, The Brittle Turn");
    global.lst_loc = 152;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata19);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata21);
    });
};

chss.cata21 = new Chs();
chss.cata21.id = 153;
addtosector(sector.cata1, chss.cata21);
chss.cata21.sl = () => {
    d_loc("Catacombs, Bright Ray Above");
    global.lst_loc = 153;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata20);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata22);
    });
};

chss.cata22 = new Chs();
chss.cata22.id = 154;
addtosector(sector.cata1, chss.cata22);
chss.cata22.sl = () => {
    d_loc("Catacombs, Nowhere To Run");
    global.lst_loc = 154;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata21);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata23);
    });
};

chss.cata23 = new Chs();
chss.cata23.id = 155;
addtosector(sector.cata1, chss.cata23);
chss.cata23.sl = () => {
    d_loc("Catacombs, The Aging Room");
    global.lst_loc = 155;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata22);
    });
    chs('"↓ Move South"', false).addEventListener("click", () => {
        smove(chss.cata24);
    });
};

chss.cata24 = new Chs();
chss.cata24.id = 156;
addtosector(sector.cata1, chss.cata24);
chss.cata24.sl = () => {
    d_loc("Catacombs, Eleven Wisemen");
    global.lst_loc = 156;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"↑ Move North"', false).addEventListener("click", () => {
        smove(chss.cata23);
    });
    chs('"← Move West"', false).addEventListener("click", () => {
        smove(chss.cata25);
    });
};

chss.cata25 = new Chs();
chss.cata25.id = 157;
addtosector(sector.cata1, chss.cata25);
chss.cata25.sl = () => {
    d_loc("Catacombs, The End Of Journey");
    global.lst_loc = 157;
    chs(select(global.text.catasound), true, "lightgrey", "black");
    chs('"→ Move East"', false).addEventListener("click", () => {
        smove(chss.cata24);
    });
};

export { time };
