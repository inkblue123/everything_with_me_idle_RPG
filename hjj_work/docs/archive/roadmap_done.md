# 已完成条目快照（roadmap 归档）

> **📦 只读归档**：这里记的是**已经从 `docs/roadmap.md` 移出的已完事项**，用于回溯"当初为什么这么做、验收怎么算过"。
> 现行待办只看 `docs/roadmap.md`；现状只看 `docs/SPEC.md`。
> 最后核对代码：**2026-10-22**。

## 编号对照

`roadmap.md` 在 2026-10-22 做过一次清理：删掉已完成条目、其余重新编号。旧 → 新对照如下。

| 旧编号 | 新编号 | 条目 |
|---|---|---|
| #1 | #1 | Buff 系统兼容性升级（内容层未做，保留） |
| #3 | #2 | 木匠坊老板事件的连锁解锁 |
| #5 | #3 | 烹饪技能收尾（只剩调料产出） |
| #6 | #4 | 调料产出（COK_MS） |
| #8 | #5 | 烹饪工作台系统 |
| #9 | #6 | 干制品子功能（COK_MD） |
| #10 | #7 | 变味规则 |
| #11 | #8 | 二次调味（COK_DS） |
| — | #8 | 浮点尘埃（本次新登记的技术债） |

## 已完成的条目

| 旧编号 | 条目 | 完成时间 | 验收结论 | 证据 |
|---|---|---|---|---|
| #4 | 消耗品的独特属性数据结构 | 2026-09-10 | 消耗品可携带并保存调料等实例属性，存档读档不丢 | `docs/SPEC.md` §4.4、`docs/archive/plan_consumable_attribute.md` §13 |
| #2 | 玩家制造等拆解工具获取流程 | 日期未记录，2026-10-22 核对确认 | 迷你事件 `VM_woodshop_get_disassembly_tool`：条件「事件未做过 + 合成制造技能 ≥ 2 级」，给 `SYN_disassembly_tool_1`；配方材料（绿银草茎 / 优质毛皮 / 铁锭）可由敌人掉落与采集取得 | `js/Data/Game_event/mini_event.js:202-218` |
| #7 | 烹饪技能的解锁途径 | 2026-10-21（V0.3.10 第 1 条） | 开场事件 `find_village_home_money` 设 `GS_unlock_COK = true`，正常游玩可解锁烹饪、技能按钮正常出现 | `js/Data/Game_event/mini_event.js:22`、`everything_with_me_idle/Version.txt` V0.3.10 |
| #5（部分） | 烹饪技能完善 —— 菜品/配方/调味部分 | 2026-09-29（V0.3.9） | 10 个成品效果接通、6 条新配方、调味配平、名称前缀、存读档修复 | `docs/SPEC.md` §4.4、`Version.txt` V0.3.9、`docs/archive/plan_consumable_attribute.md` §17 |

## 本轮追加（2026-10-21 ~ 10-22，烹饪配方侧收尾）

| 事项 | 结论 | 证据 |
|---|---|---|
| 新增「集齐材料自动解锁配方」机制 | 完成。`Formula.auto_know_unlock_flag` 默认关、逐条开；首批只标烹饪 7 条，且这 7 条改为不初始解锁 | `docs/SPEC.md` §4.5、`Version.txt` V0.3.10 第 6 条 |
| 配方列表空态提示 | 完成。烹饪 1 处、合成制造 2 处（制造 / 配方筛选），只在「一条该技能配方都没有」时显示 | `docs/SPEC.md` §4.5、`Version.txt` V0.3.10 第 7 条 |
| 验证脚本 | 新增 `_devtools/formula_check/auto_know_unlock_check.mjs`（17 条断言） | `_devtools/README.md` |

> 本轮更细的"做了什么 / 留了什么"见 `docs/archive/cooking_2026-10.md`。

## 2026-10-22 第二批：事件系统扩展 + 铁匠铺力量测试

| 事项 | 完成时间 | 验收结论 | 证据 |
|---|---|---|---|
| 迷你事件「按属性显隐按钮」原语 | 2026-10-22 | `add_process_button_attr_condition()` 生效；力量 10 / 14 / 15 下判定点按钮显隐互斥 | `docs/SPEC.md` §4.6、`_devtools/event_check/run_check.mjs` |
| 迷你事件「leave 不完成」原语 | 2026-10-22 | 点击 `leave` 只写 `SGS_<id>`、不写完成标记、回到地点；事件仍可再次进入 | 同上 |
| 支线状态型完成条件 | 2026-10-22 | 条件 key 为 `GS_*` 时直接读状态；`GS_unlock_MIN` 变真后支线自动完成并清出列表 | 同上 |
| 铁匠铺老板 + 力量测试事件 | 2026-10-22 | `village_smithy_owner` 挂在 `VM_smithy`；首次对话（A）与重试（B）两个事件接线完整；力量 ≥15 给 `Oak_logs`×1 占位 + 解锁挖矿；不足时 A 完成、B 可反复重试且不完成 | 同上、`docs/SPEC.md` §4.6 |
| 验证脚本 | 2026-10-22 | 新增 `_devtools/event_check/run_check.mjs`（50 条断言） | `_devtools/README.md`、`AGENTS.md` §7 |

> 编号说明：本批实现后，roadmap 的 #9（铁匠铺事件）已完成移出，原 #10（支线刷新机制）改为 #9。
