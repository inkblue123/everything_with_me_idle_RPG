# 挖矿系统补完计划（2026-10-23）

> 状态：**M1 / M2 / M5 / M6 / M7 已完成（2026-10-23）**，M3 经验 / M4 修复待办。
> 整份计划实施完成后，本文件按 `AGENTS.md` §8 归档到 `docs/archive/`。
> 术语见 [`docs/glossary.md`](../glossary.md)；两条不可逆取舍见 `docs/adr/0001`、`0002`。

## 一、一句话结论

挖矿**机制已经实现**（933 行 `Mining_manage` + 界面 + 4 种矿层 + 事件解锁），本计划只补内容层：
**洞内地图、一把镐子、挖矿经验、两处存量修复**。不改状态机、不改公式、不加新矿层。

## 二、范围

**做**

| # | 内容 | 里程碑 |
|---|---|---|
| 1 | `backhill_cave` 区域地图（3 节点 + 1 连线） | M1 |
| 2 | 铁镐（物品 + 文本 + 作为解锁事件奖励） | M2 |
| 3 | 挖矿经验（打通 `mining_mastery` 经验通道，每次挖出矿石 +1） | M3 |
| 4 | 存量修复：`live_plan_flag` 位序、界面空壳控件 | M4 |

**不做**（都记在本文 §七，转后续待办）

- 消耗品（炸药）与单槽辅助技能的接线 —— 界面控件本轮隐藏，不实现
- 矿石冶炼/锻造配方 —— 矿石只进背包，图鉴自动点亮
- 新矿层（维持现有 4 种：碎石岩层 / 坚硬山岩 / 铁矿山石 / 硬冷岩层）
- 稀有度可视化、找矿按钮、"挖得越快档位越高" —— 属于机制改造
- 洞内新增地点、地图美术与图标

## 三、现状盘点（可直接复用的部分）

| 层 | 证据 |
|---|---|
| 运行逻辑 | `js/GameRun/live_plan/Explore_collection/mining.js:192` `class Mining_manage`；6 状态机 `:10`；主循环 `:475` |
| 接入主循环/存档 | `live_plan_manage.js:46` 建对象、`:67/:112` 存档读档、`:181` 每帧派发 |
| 界面 | `js/Dom/Live_plan/Explore_collection/mining.js`；`Live_plan.js:111-114` 建 div、`:319` 绑按钮 |
| 矿石数据 | `js/Data/Enemy/Enemy_class.js:153` `class E_ore`；实例 `Enemy_ore.js:17/42/67/98` |
| 地点挂矿 | `Place_class.js:283 set_mining_ore(id, chance)`、`:226 set_mining_data(reborn_time)` |
| 属性通道 | `data_attr.js:86-89` `MIN_attack/MIN_interval/MIN_critical_*`；按武器子类自动派生（`Data.js:110-131`、`:153-161`） |
| 图鉴 | 获得物品即点亮，无需专门接入（`Player.js:110`、`library_manage.js:48`） |
| 解锁 | `GS_unlock_MIN` 由铁匠铺力量测试与支线写入（`mini_event.js:243/267`、`side_quest.js:24`） |

## 四、里程碑

### M1 洞内地图（backhill_cave）

**目标**：进洞后地图区有节点与连线，不再是空白。

**现状**：`js/Data/Map/map.js:6-13` 只初始化 `test / village / village_backhill` 三张图；
`cave_inlet` 与 `alp_cave_inlet` 已经作为"跨区地点"出现在后山图上（`map.js:194-199`，坐标 0,300 / 0,500），
洞内唯一连通是 `cave_inlet ↔ karst_cave`（`Place_normal.js:262,273`）。缺的是 `backhill_cave` 这张画布。

**改动**：只改 `js/Data/Map/map.js`

1. 新增 `function init_backhill_cave_map(maps)`，并加入 `init_maps()` 的调用序列（放在后山之后）。
2. 画布：`set_area_data(770, 550)`。
3. 区域内节点（`add_place_data(place_id, true, x, y)` + `add_place_event_tip_show`）：

   | 地点 | 坐标 | 说明 |
   |---|---|---|
   | `cave_inlet` | (470, 140) | 溶洞入口 |
   | `karst_cave` | (70, 140) | 溶洞（主挖矿点） |
   | `alp_cave_inlet` | (470, 430) | 高山洞穴入口 |

4. **跨区入口按钮**：`forest_edge`(670,140)、`forest_core`(670,430) 属于 `village_backhill` 区域，
   必须登记进洞穴地图的 `place_data`，否则站在洞里时地图上没有「回后山」的按钮可点。
   按钮文本由 `get_map_button_text()` 自动拼成「区域名 + 地点名」，依赖 `texts['village_backhill'].area_name`。
5. 连线：`cave_inlet → karst_cave`、`cave_inlet → forest_edge`、`alp_cave_inlet → forest_core`。
   **不改任何地点连通数据**——跨区可达性本来就存在（`Place_normal.js:262/282`），地图只负责把它画出来。

**注意**：一个地点同时出现在两张区域地图上是现有惯例（`village_square` 也这样），不是重复登记。

**验收**

- 进入 `cave_inlet` 时，地图上同时出现「洞穴入口 / 溶洞 / 村外后山区域-外层森林」三个按钮与两条连线；
- 进入 `alp_cave_inlet` 时出现「高山洞穴入口 / 村外后山区域-内层森林」与一条连线；
- 点跨区按钮能真的走回后山，且地图自动切回后山区域（`map_manage.set_now_place` → 区域不同则重建）；
- `Data.js:244 check_map_data()` 无新增告警；
- 后山地图原有内容不受影响。

**实施记录（2026-10-23）**：只改 `js/Data/Map/map.js` —— 新增 `init_backhill_cave_map()` 并在 `init_maps()` 里调用。
画布尺寸与节点坐标由你后续调整（770×550、5 个按钮）；这次补齐两个跨区按钮的 `add_place_event_tip_show`
与三条 `add_place_button_line`。已用一次性脚本校验（尺寸、5 个节点坐标与按钮标记、三条连线、跨区区域名与地点名文本齐全、
洞内地点全部有地图条目），`_devtools/buff_check/import_smoke.mjs` 全绿（188/189，0 新失败）。渲染效果待人工进洞确认。

### M2 铁镐

**目标**：游戏里有第一把镐子，并且铁匠铺力量测试真的发它，而不是发橡木。

**改动**

1. `js/Data/Item/Equipment.js` → `init_mining_tool()`（现在是空函数，`:385-395`），照 `init_logging_tool`（`:352-367`）的写法建 `iron_pickaxe`：

   ```js
   id = 'iron_pickaxe'; //铁镐
   add_Equipment_object(items, id);
   items[id].init_Item_other(1, secon_type, 2);   // 章节 2，与图鉴上限 normal_chapter=2 一致
   items[id].init_Equipment(false, attack_interval); // attack_interval = 4，同柴刀
   items[id].init_Item_price('ordinary_coin', 50);
   items[id].set_attr_level('L0', 'attack', secon_type);          // 战斗属性走 mining_tool 的 L0 预设
   items[id].equip_attr['ordinary']['MIN_damage_add'] = 3; // 挖矿伤害 +3，直接加算（原因见 M5）
   items[id].auto_set_all_rarity_attr();
   ```

2. `js/Data/Text/Text_item/equipment.js` → `init_Text_mining_tool()`（`：201-208` 现在只有注释）：补 `item_name = '铁镐'` 与 `item_desc`。
3. `js/Data/Game_event/mini_event.js:242` 与 `:266`：`get_item` 的 `'Oak_logs'` → `'iron_pickaxe'`，并删掉"暂时用木头占位"的注释。
4. 核对 `js/Data/Text/Text_game_event.js:169/181`：文案已写"获得铁镐"，改完即一致。

**验收**

- 力量 ≥15 走完力量测试 → 背包出现铁镐、图鉴自动点亮；
- 装备铁镐在洞内挖矿，单次挖矿伤害从 3 提升到 6（基础 3 + 镐子 3）；
- 未装备时仍能空手挖（本计划不设工具门槛，见 ADR-0002）；
- 读档后装备状态与背包数量正确。

**实施记录（2026-10-23）**：改了 3 个文件 —— `Equipment.js`（建 `iron_pickaxe`）、`Text_item/equipment.js`（名称/描述）、
`mini_event.js`（两处奖励改成 `iron_pickaxe`）。运行时校验通过：物品存在、`secon_type` 只有 `mining_tool`、
五个稀有度档位都铺开、派生属性名文本齐全（提示窗不会露原始 id）。
**后续修正**：装备属性的 id 由百分比通道 `MIN_damage_mining_tool` 改成直接加算通道 `MIN_damage_add`，原因见 M5。

### M3 挖矿经验

**目标**：`mining_mastery` 能升级了（只通经验，不给属性效果）。

**现状**：`mining.js:501-503` 每挖一下都会记录 `mining_behavior.MIN_damage`，
但 `Enum_skill_exp.js:8-22` 没有对应映射，`Player_Passive_skill.js:230-236` 的 `mining_mastery` 也没有 `exp_source`。

**改动**

1. `js/Data/Enum/Enum_skill_exp.js`：在 `exp_source_for_Leveling_Behavior` 里加

   ```js
   //挖矿行为
   mining_times: 'mining_behavior', //挖出一块矿石计一次
   ```

2. `js/GameRun/live_plan/Explore_collection/mining.js`（`ore_live_mining()` 内，约 `:495-508`）：
   把"矿石被打死"这一次写进同一个 `mining_behavior` 对象：

   ```js
   let MIN_damage = this.get_MIN_damage();
   this.ore_manage.attack_ore(MIN_damage);
   let mining_behavior = new Object();
   mining_behavior.MIN_damage = MIN_damage;
   if (!this.ore_manage.get_ore_statu()) mining_behavior.mining_times = 1; //本块矿石被挖掉
   global_flag_manage.record_live_plan_skill_leveling_behavior('mining', mining_behavior);
   ```

   （即：把原本 `:505` 处的存活判断提前到记录之前，不要新增一次记录调用。）

3. `js/Data/Skill/player_skill/Player_Passive_skill.js` → `init_live_skill_mining()` 的 `mining_mastery`：

   ```js
   P_skills[id].add_leveling_behavior('behavior', 'mining'); //挖矿时
   P_skills[id].exp_source = 'mining_times';                 //每挖出一块矿石 +1 经验
   ```

   保留现有 `set_levelup_data(10, 0, 10, 1)`（0~10 级）与"暂无常态加成"的注释。

**验收**

- 连挖 10 块矿石 → `mining_mastery` 经验 +10、不因单次伤害高低飘；
- 升级时走通用升级流程（日志、等级显示）正常，且**不产生任何属性变化**；
- 存档读档后经验与等级保留；
- 伐木/采集/钓鱼的经验结算不受影响（回归脚本见 §六）。

### M4 存量修复与界面清理

**目标**：清掉两处已知坑。

**改动**

1. `js/GameRun/live_plan/Explore_collection/mining.js:430`：
   `if (!places[this.now_place].live_plan_flag[0])` → `live_plan_flag[2]`
   （位序见 `Place_manage.js:381` = `['LGI','FIS','MIN',...]`，挖矿是第 3 位）。
   当前该函数在 `return` 之后没有代码，所以**今天没有行为差异**；这是防以后踩坑的修正，注释里写明"挖矿位序是 2"。
2. `js/Dom/Live_plan/Explore_collection/mining.js`：把"挖矿消耗品"（`MIN_M_UseCSB_select` 那行，`:43` 附近）
   与"辅助技能"（`:57` 附近）两整行容器的 `display` 设为 `'none'`。
   **保留 DOM 结构**，后续接消耗品时直接放开显示即可，不删元素、不删样式。

**验收**

- 在 `karst_cave`（只能挖矿、不能伐木）挖矿，参数与伤害正常；
- 挖矿界面不再出现两个常年 0% 的进度条与空下拉框，其余布局无位移。

### M5 挖矿界面数值显示（2026-10-23 追加）

**目标**：让挖矿的数值可读——血条显示「当前 / 上限」，每次攻击在矿石上飘出伤害数字。

**改动**

1. `js/GameRun/live_plan/Explore_collection/mining.js`
   - `Ore_manage` 新增 `get_now_HP()`。
   - `updata_live_plan_div()` 每帧把 `#ore_blood_number` 填成「当前血量 / 血量上限」，`show_new_ore_div()` 复活时立即填、`delete_mining_div()` 清空。
   - 新增 `show_damage_number(damage)`：在 `#ore_head` 内插入 `.MIN_damage_number`，横向随机 ±25px 错开，800ms 后移除节点；
     `ore_live_mining()` 在每次 `attack_ore()` 之后调用。
2. `css/live_plan/Explore_collection/mining.css`
   - `#ore_blood_bar` 与 `#ore_head` 各加 `position: relative`（分别作为血量数字、伤害数字的定位基准）。
     **没有新增容器，没有改 flex/grid，没有加 gap、没有加 outline。**
   - 新增 `.MIN_damage_number` 与 `@keyframes MIN_damage_float`：0.8 秒内向上 60px 并淡出。

**为什么不是百分比**：`MIN_damage_<武器子类>` 走的是 `calculate_num_attr` 的**直接乘算**通道（第 3 个参数），
且在 `enums.need_per_cent_attr` 里，显示成 `+3%`——1 点只值 3% 伤害。装备要的是**直接加算**通道，
所以改用新属性 `MIN_damage_add`（`calculate_num_attr` 第 2 个参数）：基础 3 + 3 = 6，提示窗显示「挖矿伤害：+3」，没有百分号。
属性名加在 `Text_attr.js` 的 `init_no_normal_attr_name_mining()`。

**验收**

- 血条上出现「12 / 15」这样的数字，攻击时随血量下降；
- 每次命中在矿石框内飘出一个黄色数字，向上移动并淡出，连续攻击时位置轻微错开；
- 铁镐的物品提示窗显示「挖矿伤害：+3」，不带 `%`；
- 停挖或矿石死亡后，血量数字清空。

**实施记录（2026-10-23）**：数值链路已用脚本验证（属性 `MIN_damage_add = 3`、名称「挖矿伤害」、
不在百分比显示表里、`calculate_num_attr(3, 3, 0, 0, 0) = 6`），`data_check` 硬错误 0、`import_smoke` 0 新失败。
飘字动画与血条排版只能进游戏看。

### M6 更换目标进度条在暂停时保留（2026-10-23 追加，bug 修复）

**问题**：按停止挖矿暂停"更换目标"时，`#MIN_MR_bar` 被清零，但内部进度（`ore_manage.death_time` 起算的复活计时）没有清，
再开始还能接上——纯视觉 bug。

**根因**：`stop_game_statu()` 无条件把 `MIN_MR_bar` 写成 `0%`；而停止后挖矿技能不再是当前技能，
`updata_live_plan_div()` 不再被调用，所以没人把真实进度画回去。补充：这条进度条本来就是**地点级复活计时**，
"更换目标"只是让当前矿石立刻死亡（`start_rebron()` 写入 `death_time`），两者共用同一套计时。

**改法**：`stop_game_statu()` 里不再无脑清零——矿石已死且该地点有 `MIN_reborn_time` 时，
用 `(now - death_time) / (MIN_reborn_time*1000)` 算真实比例写回，超过 100% 封顶；矿石活着才写 `0%`。

**验收**：开始更换目标 → 进度条走到一半 → 按停止挖矿 → 进度条**停在半途**；再点开始挖矿，从同一位置继续。
矿石自然死亡后的等待同理。

> 后续：M7 把这条修复并入了统一渲染，`stop_game_statu()` 里那段临时算法已被 `refresh_mining_panel()` 取代。

### M7 目标复活规则统一：状态结算 + 单一渲染入口（2026-10-23 追加）

**要解决的问题**：换目标期间暂停，界面不动；矿在暂停时自己复活但面板不刷新；再点「更换目标」看起来没反应，
点「开始挖矿」却突然跳到等待界面。根因是**面板只在"挖矿是当前生活技能"时刷新，而状态会被定时器和按钮在别的时机改掉**。

**定下来的规则**（与用户逐条确认）：

| 决策 | 结论 |
|---|---|
| 换目标锁在哪 | 每个地点各自独立，走到别的矿点可以挖那边的矿 |
| 等待期间的时间 | 按游戏时间照走，离开地点也继续 |
| 等待期间点「开始挖矿」 | 可点，进入等待界面；**新矿出现后自动开挖**（排队） |
| 换目标的代价 | 只有时间（`MIN_reborn_time`），不加资源/次数/确认 |
| 读档地点 | 不修，仍回村庄；只保证矿石状态不丢 |

**改法**

1. `settle_ore_state()`：矿已死且 `now - death_time ≥ MIN_reborn_time` → 复活；`statu` 为 `undefined` 时不处理（交给 `set_new_place`）。
2. `refresh_mining_panel()`：唯一渲染入口，三态渲染（矿活着 / 等待新矿 / 当前地点不能挖矿）+ 开始-停止按钮切显隐
   + 等待时「更换目标」按钮 `disabled` 且文案「正在寻找新矿」。
3. 所有入口统一「先结算、再刷新」：`set_new_place`、`updata_live_plan_data`（含 `NO_MIN` 也要结算，否则站在矿点上等人不刷新）、
   `updata_live_plan_div`、`init_live_plan_game_div`（切回挖矿页）、`stop_game_statu`、`player_start_mining`、
   `ore_replace_reborn`、`ore_death_reborn`（暂停期间的定时器路径）、`reborn_ore`。
4. 缓存在 `ore_replace_reborn` / `reborn_ore` 后立刻写一次，不再只依赖逐帧写。
5. CSS：`#MIN_replace_button:disabled` 置灰（半透明 + `not-allowed`），没有新增容器、没有改 gap/outline。

**验收**

- 点更换目标：立刻进等待态，进度条从 0 起，按钮置灰；
- 等待期点停止：进度保留；点开始：进等待界面，复活后自动开挖；
- 暂停期间矿复活：面板自动变成新矿（不用再点任何按钮）；
- 离开再回来：同一地点的矿（id/等级/HP 或等待进度）不变；
- 等待期点「更换目标」：按钮点不动。

**实施记录（2026-10-23）**：改 `mining.js` + `mining.css`；`import_smoke` 188/189、0 新失败。
状态机路径只能进游戏手点验证（四条验收里前三条必须按顺序点一遍）。

**M7 修复记录（同日，两处回归）**

1. **攻击进度条溢出边框**：M7 让 `updata_live_plan_div` 无条件写 `#MIN_D_bar`，而等待新矿期间 `now_round_time` 仍在
   逐帧累加、又不会 reset，于是宽度能到 300% 以上。修法：`#MIN_D_bar` 只在「矿活着 + 正在挖矿」时推进，
   其余状态写 `0%`；`get_attack_ratio()` 同时加上 0~100 的封顶。
2. **等待进度条一秒一跳**：停止挖矿后 `GS_game_statu` 变 `NULL`，挖矿的逐帧刷新停止，只剩
   `reborn_mining_ore_timing_func`（每现实 1 秒）在推进，所以看起来是一格一格跳。修法：暂停且矿石在等复活时，
   给 `#MIN_MR_current` 加 `transition: width 1s linear` 把两次刷新之间的空档补平；逐帧刷新的场景（正在挖 / 排队中）
   保持 `transition: none`，否则会一直追不上目标值。

## 五、文档与决策

- 术语：[`docs/glossary.md`](../glossary.md)（挖矿力、矿层、稀有度、找矿冷却、挖矿专精、生活技能位序、洞内地图、洞口节点）
- 取舍记录：
  - [`ADR-0001 复用现有挖矿实现`](../adr/0001-挖矿复用现有实现.md)
  - [`ADR-0002 挖矿工具只加效率`](../adr/0002-挖矿工具只加效率.md)

## 六、验收与回归

改动涉及数据层（物品/文本/枚举/事件/技能），按 `AGENTS.md` §7：

```bash
node _devtools/data_check/check.mjs        # 物品/文本/分类/配方/工作台 逐条体检
node _devtools/event_check/run_check.mjs   # 事件系统（M2 改了 mini_event 奖励）
node _devtools/buff_check/run_check_real.mjs  # 属性派生链路（M2/M3 动了属性与技能经验）
```

地图与界面（M1/M4）**没有脚本覆盖**，只能手动验：进洞看地图、挖矿看伤害、界面看控件。

## 七、本计划不做，转后续待办

1. 矿石没有下游配方 —— `hard_rock / lowFe_rock / highFe_rock` 等在 `js/Data/Formula/` 中 0 命中，只能堆包。
2. 矿层只有 4 种，`Enemy_ore.js:5-14` 注释里的 20+ 种（玄铁/寒元/赤铜/地火/深海…）全未建。
3. 挖矿界面里的消耗品与辅助技能（炸药、单槽辅助技能）只有空壳，未接运行层。
4. 稀有度不展示给玩家；`idea4` 里的「稀有矿石敏感 / 特殊矿石敏感」技能尚无实现。
5. 洞内没有新增矿点/岔路，`Place_resource.js` 仍是占位类。
6. 挖矿暴击/速度没有任何来源（无工具、无 buff、无技能加成），现在恒为 `MIN_attack` + 暴击。

## 八、完工后的文档动作（照 AGENTS.md §8）

1. 从 `docs/roadmap.md` 删掉"挖矿系统内容层补完"条目；
2. `docs/SPEC.md` 补一节"生活技能 - 挖矿"的现状（含铁镐、经验口径、洞内地图）；
3. 本文件移入 `docs/archive/`，文件头加"已归档、不再更新"；
4. `docs/archive/roadmap_done.md` 记一行，更新 `docs/README.md` 的"当前状态速览"。
