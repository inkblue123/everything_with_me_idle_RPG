# roadmap.md — 功能规划清单

> 这里是**你想做但还没做**的功能的愿望清单。
> 每加一个新功能，先在这里写清楚：目标 / 范围 / 验收标准，再按 `AGENTS.md` 的流程实现。
> 已实现的功能会从本文件移到 `SPEC.md`（现状说明书）。

> **🔗 关联**：想找"有哪些功能可做"，先看 `docs/idea_index.md`（idea3/4/5/6 的逐小节索引，默认都是「📚 素材参考」）。
> 你决定要做某条时，把它的状态从 📚 升格，然后在本文件追加一条带目标/范围/验收标准的待办。

---

## 使用说明

每个待办建议包含：
- **状态**：`待办` / `规划中` / `实现中` / `已完成`（完成后移到 SPEC.md）
- **目标**：这个功能要解决什么 / 达到什么效果（行为描述，不写具体代码）
- **范围**：大致涉及哪些系统（地点 / 战斗 / 生活技能 / 物品 / 事件…）
- **验收标准**：做到什么程度算完成（可测试）
- **来源**：对应 `docs/idea_index.md` 里的哪一条（可选）

---

## 待办清单

### 1. Buff 系统兼容性升级
- **状态**：架构重构已完成（2026-09-24），**内容层待办**——本轮只做机制，一条新类型 buff 都还没做
- **目标**：让 buff 系统支持更多种类的 buff，适配更多玩法（依据 `Version.txt` 提到"buff 系统需要更新升级以兼容更多种类的 buff"）。
- **范围**：`js/Data/Buff/`、`js/Player/Player_buff.js`、`js/GameRun/buff_manage.js`
- **本轮已完成（2026-09-24，详见 `docs/SPEC.md` §4.4 与 `docs/plan_buff_system.md` §16）**：
  - 运行层拆成「目标侧 `Player/Player_buff.js` + 全局结算层 `GameRun/buff_manage.js`（调度台，注册在 global 上）」
  - 目标抽象：`Player_Buff_Manage` 持有 `target`，换目标即可复用；原本写死 `player` 的 5 个模块级函数已**搬进 `Buff_manage`**
  - 效果通道：分派循环与 5 个生效函数都在调度台（`apply_buff_effects()`），累加器仍留在目标侧；
    目标侧原本那个只做转发的 `restart_end_buff()` 薄壳已并入 `flush_end_buff_change()` 并删除
  - **获得 / 移除 / 清空**：`set_buff` / `delete_buff` / `reset_buff` 的决策也搬进调度台（名字沿用，多一个 `buff_holder` 参数）；
    17 处调用点改成**两步写法**（`let buff_manage = global.get_buff_manage();` 然后 `buff_manage.set_buff(P_buff, …)`）；`set_buff()` 里按 §4.2-1 六步流程写好了注释位置（只有 ④ 同类叠层/替换 与 ⑥ 入容器有代码）
  - `out:'act'` 不再被丢弃，改为把动作请求推给调度台（动作表为空，位置已打通）
  - **界面刷新调度与绘制**：`Buff_manage.run_buff_show_scheduler()` 每帧遍历「目标来源清单」调自己的 `refresh_buff_show(holder)`；
    绘制代码与三个渲染缓存都在调度台上（`holder.buff_show_kind == 'player'` 才画）；`Player_buff.js` 因此变成**零 DOM** 的纯逻辑类
  - 读档恢复层数 `stack`（旧存档无该字段按 1 层）
  - 验证：`_devtools/buff_check/` 三个脚本全绿（188 个模块冒烟、114 条桩断言、43 条真实接缝断言）
- **验收标准（尚未满足）**：新增若干新类型 buff 后能正常挂载、每帧结算、正确叠加/刷新，且不影响现有 buff。
  → 要满足它还需要（本轮**没做**）：数据层新增分类字段（`tag` / `series` / `max_stack` / `buff_level` 等）、
  获得流程的抵抗力/净化/系列覆盖/免疫四步、公式表、钩子派发、动作表实现、回合型、敌人侧 buff。
  （**消耗品 `get_buff` 接通已于 2026-09-29 完成**，见 `Version.txt` V0.3.9 与 `docs/plan_consumable_attribute.md` §17）
- **来源**：`docs/idea_index.md` 的 E 区「buff系统兼容性分析与改造规划」；详细改动见 `docs/plan_buff_system.md`（§14 参考设计 / §15 目标抽象规划 / §16 本轮落地记录）

### 2. 玩家制造等拆解工具获取流程
- **状态**：待办
- **目标**：设计玩家获得"拆解工具"配方的流程（初步设想：玩家制造等级达到一定程度后，可在木匠店老板处触发事件获得）。
- **范围**：`js/Data/Game_event/`、`js/Data/Place/`、`js/Data/Formula/`
- **验收标准**：满足条件时正确触发事件，玩家获得拆解工具配方，且配方可学习、可使用。

### 3. 木匠坊老板事件的连锁解锁
- **状态**：待办
- **目标**：木匠坊老板事件可一并解锁一些商品/配方，并在其他地点散布一些解锁拆解工具的物品，防止玩家始终无法触发该事件。
- **范围**：`js/Data/Game_event/`、`js/Data/Place/Place_store.js`、`js/Data/Item/`
- **验收标准**：多种途径都能触发并解锁相关商品/配方，无"永远无法触发"的死角。

### 4. 消耗品的独特属性数据结构
- **状态**：已完成（2026-09-10。效果行字段改革见 `docs/plan_consumable_attribute.md` §13）
- **目标**：为消耗品设计独特属性数据结构，例如保存菜品的调料属性和调料使用情况。
- **范围**：`js/Data/Item/Consumable.js`、`js/Player/Player_backpack.js`、存档结构
- **验收标准**：消耗品能携带并保存其独特属性，存档读档后不丢失。

### 5. 烹饪技能完善
- **状态**：**部分完成（2026-09-29）** —— 下面第 6~11 条是它剩下的部分
- **目标**：完善烹饪技能（配方、菜品、调料、环境），与"原料处理-烹饪"相关的技能、配方、物品主要通过在数据库中添加内容实现。
- **范围**：`js/Data/Formula/Formula_Cooking.js`、`js/GameRun/live_plan/Material_handling/cooking/`
- **本次已完成（2026-09-29，详见 `everything_with_me_idle/Version.txt` 的 V0.3.9 与 `docs/plan_consumable_attribute.md` §17）**：
  - 消耗品「给予buff」效果接通：食用菜品能获得持续效果，支持在施加时传入时长与效果行
  - 十个成品有效果（7 道菜＝立刻恢复＋持续恢复；3 个干制品＝只给立刻恢复），并补上它们此前缺失的"可使用"定义
  - 六条烹饪配方（大烤鱼串 / 烤螃蟹 / 熟蚌肉 / 熟兽肉 / 烤蘑菇 / 鸡枞汤）
  - 调味配平：调料效果按"总量守恒"重新分布到统一时长上（同种调料重复添加只延长时间、不叠加每秒数值）
  - 名称前缀：按调味情况给菜品名与菜品 buff 名加前缀（美味的 / 重口味的 / 糟糕的）
  - 存读档修复：运行时效果的 buff 读档按"已结束"处理；属性类 buff 的加成账本读档后正确重建
- **验收标准**：烹饪技能可正常学习配方、按调料/环境制作菜品。→ **仍未满足**（技能还没有解锁途径，调料也拿不到）

### 6. 调料的产出途径（制调味品子功能 COK_MS）
- **状态**：待办
- **目标**：让玩家能正式获得调料。现在 `COK_MS` 是空壳，三种调料全项目只有物品定义、文本和开发者调试按钮三处落点，正式游玩拿不到，导致"调味"整条链路不可达。
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_make_seasonings.js`、`js/Dom/Live_plan/Material_handling/cooking.js`、`js/Data/Formula/Formula_Cooking.js`
- **验收标准**：`COK_MS` 子功能可用（界面 + 配方），玩家能由食材做出调料。

### 7. 烹饪技能的解锁途径
- **状态**：待办
- **目标**：给烹饪补一条正规解锁途径。`GS_unlock_COK` 默认 false，全仓**只有开发者调试菜单**能打开它；其他生活技能都有正规解锁（合成制造/采集/伐木＝迷你事件，钓鱼/挖矿＝支线奖励），唯独烹饪没有。→ 正常游玩看不到烹饪界面。
- **范围**：`js/Data/Game_event/`（迷你事件或支线）、`js/Data/Enum/Enum_game_flag.js`
- **验收标准**：正常游玩中通过某个事件或支线解锁烹饪，技能按钮正常出现且可进入。

### 8. 烹饪工作台系统
- **状态**：待办
- **目标**：让篝火 / 晾晒装置 / 调味工具成为真正的工作环境。现状：`Enum_live_plan.js` 只登记了 id，**没有任何升级配方或事件**；`cooking.js` 每次进入新地点都把三者重置为 0，且 `save/load_cooking_manage` 是空的（等级不存档）→ 烹饪配方只能借用木匠台。
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/cooking.js`（等级存档）、`js/Data/Formula/Formula_Cooking.js`（升级配方）、`js/Data/Game_event/`
- **验收标准**：工作台等级能提升并正确存档；烹饪配方可挂在自己的工作台上且玩家做得出来。

### 9. 干制品子功能（COK_MD）
- **状态**：待办
- **目标**：实现"制成干制品"子功能。现在 `COK_make_dry_product.js` 只有 6 行占位函数、界面也没建、开关默认 false，3 个干制品的配方无处安放。
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_make_dry_product.js`、`js/Dom/Live_plan/Material_handling/cooking.js`、`js/Data/Formula/Formula_Cooking.js`
- **验收标准**：干制品配方有地方制作，鱼肉干 / 兽肉干 / 浆果果干 在正式游玩中可得。

### 10. 变味规则（调味次数上限）
- **状态**：待办
- **目标**：重复调味超过阈值后，菜品本体效果开始退化（设计见 `idea5` 的设想 3；判定数已定为 `max(m_c)`，与名称前缀用的是同一个数）。调料自身的效果不受影响，始终正常加。
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js`（`get_seasoning_ex_data_by_arr` 内）
- **验收标准**：调味数超阈值后菜品本体效果按规则打折 / 转负，档位与名称前缀一致（4＝重口味的、5+＝糟糕的）。

### 11. 二次调味（COK_DS 菜品调味子功能）
- **状态**：待办
- **目标**：允许给已经调味的菜品再加调料（结构已预留：`ex_data` 可承载、复合背包 key 可区分）。
- **范围**：`js/GameRun/live_plan/Material_handling/cooking/COK_dishes_seasoning.js`、`COK_cooking_dishes.js`、`js/Dom/Live_plan/Material_handling/cooking.js`
- **验收标准**：能对已入包的调味菜二次加料；需处理"改实例 `ex_data` ⇒ 背包 key 变化 ⇒ 拆旧 key / 按新 key 合并重放（可能撞 maxStack 上限）"。

---

## 备注
- 本文件仅作规划，**不参与运行**。
- 新想法可直接追加到下方（复制上面的模板格式）。
- 完成后记得把条目从"待办"移到 `SPEC.md`，保持两份文档一致。
