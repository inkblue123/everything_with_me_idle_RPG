# roadmap.md — 待办清单

> 只放**还没做**的功能。做完必须移出：本文件删条目 + `docs/archive/roadmap_done.md` 记一行（规则见 `AGENTS.md` §8）。
> 现状看 `docs/SPEC.md`；文档入口看 `docs/README.md`；历史设计与实施记录看 `docs/archive/`。
> 每条包含：**状态 / 目标 / 范围 / 验收标准 / 来源**（来源指 `docs/idea_index.md` 里的条目，可选）。

## 待办清单

### 1. Buff 系统兼容性升级（内容层）
- **状态**：架构重构已完成（2026-09-24），**内容层待办**——本轮只做机制，一条新类型 buff 都还没做
- **已完成**：运行层拆分（目标侧 + 全局结算层）、目标抽象、效果通道、获得/移除/清空、叠层、展示调度、读档恢复层数、消耗品 `get_buff` 接通（2026-09-29）
  → 实施记录见 `docs/archive/plan_buff_system.md` §13/§16、`docs/archive/plan_consumable_attribute.md` §17
- **还剩**：数据层分类字段（`tag` / `series` / `max_stack` / `buff_level`）、获得流程的抵抗力/净化/系列覆盖/免疫四步、公式表、钩子派发、动作表实现、回合型 buff、敌人侧 buff
- **范围**：`js/Data/Buff/`、`js/Player/Player_buff.js`、`js/GameRun/buff_manage.js`
- **验收标准**：新增若干新类型 buff 后能正常挂载、每帧结算、正确叠加/刷新，且不影响现有 buff
- **来源**：`docs/idea_index.md` E 区「buff 系统兼容性分析与改造规划」

### 2. 木匠坊老板事件的连锁解锁
- **状态**：待办
- **目标**：木匠坊老板事件可一并解锁一些商品/配方；并在其他地点散布一些能解锁拆解工具的物品，防止玩家始终无法触发该事件
- **范围**：`js/Data/Game_event/`、`js/Data/Place/Place_store.js`、`js/Data/Item/`
- **验收标准**：多种途径都能触发并解锁相关商品/配方，无"永远无法触发"的死角
- **备注**：拆解工具配方的**事件本体已完成**（见 `docs/archive/roadmap_done.md`），这里补的是"多途径 + 连带解锁商品"

### 3. 烹饪技能收尾：调料产出（COK_MS）
- **状态**：待办（烹饪其余部分已闭环，见 `docs/archive/cooking_2026-10.md`）
- **目标**：让玩家能正式获得调料。`COK_MS` 现在是空壳，三种调料只有物品定义、文本和开发者调试按钮，正式游玩拿不到，导致"调味"整条链路不可达
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_make_seasonings.js`、`js/Dom/Live_plan/Material_handling/cooking.js`、`js/Data/Formula/Formula_Cooking.js`
- **验收标准**：`COK_MS` 子功能可用（界面 + 配方），玩家能由食材做出调料

### 4. 干制品子功能（COK_MD）
- **状态**：待办
- **目标**：实现"制成干制品"子功能。`COK_make_dry_product.js` 只有占位函数，界面没建，开关默认 false，3 个干制品的配方无处安放
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_make_dry_product.js`、`js/Dom/Live_plan/Material_handling/cooking.js`、`js/Data/Formula/Formula_Cooking.js`
- **验收标准**：干制品配方有地方制作，鱼肉干 / 兽肉干 / 浆果果干 在正式游玩中可得

### 5. 烹饪工作台系统
- **状态**：待办
- **目标**：让篝火 / 晾晒装置 / 调味工具成为真正的工作环境。现状：只登记了 id，没有升级配方或事件；进入新地点会被重置为 0，且等级不存档 → 烹饪配方只能借用木匠台
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/cooking.js`（等级存档）、`js/Data/Formula/Formula_Cooking.js`（升级配方）、`js/Data/Game_event/`
- **验收标准**：工作台等级能提升并正确存档；烹饪配方可挂在自己的工作台上且玩家做得出来

### 6. 变味规则（调味次数上限）
- **状态**：待办
- **目标**：重复调味超过阈值后，菜品本体效果开始退化；判定数已定为 `max(m_c)`（与名称前缀用同一个数），调料自身效果始终正常加
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js`（`get_seasoning_ex_data_by_arr` 内）
- **验收标准**：调味数超阈值后菜品本体效果按规则打折 / 转负，档位与名称前缀一致（4＝重口味的、5+＝糟糕的）

### 7. 二次调味（COK_DS 菜品调味子功能）
- **状态**：待办
- **目标**：允许给已经调味的菜品再加调料（结构已预留：`ex_data` 可承载、复合背包 key 可区分）
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_dishes_seasoning.js`、`COK_cooking_dishes.js`、`js/Dom/Live_plan/Material_handling/cooking.js`
- **验收标准**：能对已入包的调味菜二次加料；需处理"改实例 `ex_data` ⇒ 背包 key 变化 ⇒ 拆旧 key / 按新 key 合并重放（可能撞 maxStack 上限）"
- **前置**：需先解决"实例内记录各具体调料的累计份数"（现 `ex_data.seasoning` 只记小类）

### 8. 浮点尘埃：多来源滚动累加改为全量重算
- **状态**：待办（技术债）
- **目标**：涉及多个来源的滚动累加时，把"去掉旧值加上新值"改成"全部重新累加"，避免浮点尘埃反复累计造成精度漂移
- **范围**：buff 累加器结算链路（`js/GameRun/buff_manage.js`）与属性派生（`js/Player/Player.js` 的 `updata_end_attr`）
- **验收标准**：多次增减同一属性后累计值回到精确值；现有 buff 回归脚本全绿
- **来源**：`everything_with_me_idle/Version.txt` 顶部「有待解决的问题」第 4 条
- **备注**：改动面广，建议单独排期，不要和其他功能混做

### 9. 支线状态条件的刷新机制改为事件驱动
- **状态**：待办（技术债，2026-10-22 实现「用 GS_unlock_MIN 当支线完成条件」时留下的）
- **目标**：现在支线的状态型条件（`GS_*` 这类直接读游戏状态的条件）靠**每帧判定**发现变化，开销虽小但不优雅；改为「写 flag 时通知支线」的事件驱动方式，去掉轮询
- **范围**：`js/GameRun/game_event/side_quest.js`、`js/GameRun/global_flag/global_flag_manage.js`、`js/GameRun/run_manage.js`
- **验收标准**：去掉每帧调用后，状态型条件仍能在 flag 变化后及时完成支线；现有支线回归脚本全绿
- **风险**：flag 写入点极多，直接回调容易形成反向依赖与递归，需要先定「通知时机 + 防重入」方案

### 10. 挖矿系统内容层补完
- **状态**：待办（计划已出，见 `docs/plan/mining.md`；机制已实现，只补内容）
- **目标**：让挖矿从"能挖"变成"有内容"——洞内地图、铁镐、挖矿经验，并修掉两处存量问题
- **范围**：`js/Data/Map/map.js`、`js/Data/Item/Equipment.js`、`js/Data/Text/Text_item/equipment.js`、`js/Data/Enum/Enum_skill_exp.js`、`js/Data/Skill/player_skill/Player_Passive_skill.js`、`js/Data/Game_event/mini_event.js`、`js/Dom/Live_plan/Explore_collection/mining.js`
- **验收标准**：进洞后有地图节点与连线；力量测试发真铁镐（不再发橡木）；`mining_mastery` 每次挖出矿石 +1 经验且不产生属性变化；`live_plan_flag` 位序修正；界面空壳控件隐藏
- **里程碑**：M1 地图 → M2 铁镐 → M3 经验 → M4 修复
- **来源**：`docs/idea_index.md` C 区「挖矿系统」

