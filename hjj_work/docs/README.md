# docs/README.md — 文档入口

> **这个文件是唯一入口。** 想了解项目，先看这里；其余文档按下面的职责分工各管一件事。
> 文档维护的硬规则见 `AGENTS.md` §8「文档收尾清单」。

## 一、只需要读这三份

| 想知道的 | 看这份 | 它管什么 |
|---|---|---|
| **现在是什么样** | `docs/SPEC.md` | 现状说明书：只描述**已存在**的系统、数据、接口 |
| **接下来做什么** | `docs/roadmap.md` | 待办清单：只放**还没做**的；做完必须移出 |
| **怎么在这里做事** | `AGENTS.md` | 协作规范：基线只读、先计划后动手、验证脚本、文档收尾 |

其余文档都是**按需查阅**，不用通读。

## 二、目录结构

```
docs/
  README.md       ← 本文件。唯一入口（≤ 80 行）
  SPEC.md         ← 现状说明书（预算 ≤ 400 行；超了按系统拆到 docs/spec/）
  roadmap.md      ← 待办清单（预算 ≤ 120 行；只放未做）
  glossary.md     ← 领域词汇表：术语的唯一解释处，写含义不写实现
  plan/           ← 进行中的系统计划 `<系统>.md`，完工后移入 archive/
  adr/            ← 不可逆决策记录，一条一个文件（ADR-0001 起）
  idea_index.md   ← 素材索引：idea 文档的逐小节索引，绝大多数是「📚 素材参考」，不算计划
  spec/           ← （尚未创建）单系统现状页，如 buff.md / cooking.md，每页 ≤ 150 行
  archive/        ← 只读归档，任何人不得再修改
    plan_buff_system.md          ← buff 改造的历史设计与实施记录
    plan_consumable_attribute.md ← 消耗品/调味框架的历史设计与实施记录
    cooking_2026-10.md           ← 烹饪系统本轮收尾记录（决策、坑、验证现状）
    roadmap_done.md              ← 已完成的 roadmap 条目快照 + 新旧编号对照
```

## 三、当前状态速览（2026-10-23）

- 版本：`V0.3.11`（见 `everything_with_me_idle/Version.txt`）。
- **烹饪系统告一段落**：配方侧（集齐材料自动解锁）与界面侧（空列表提示）已闭环；剩下的是产出链（调料 / 干制品 / 工作台），已转为 roadmap #3~#5，另加 #6/#7 两条调味规则。
- **事件系统扩展**（2026-10-22）：迷你事件新增「按属性显隐按钮」「leave 不完成退出」两个原语，支线新增「状态型完成条件」；首个使用者是铁匠铺的力量测试与挖矿解锁。现状见 `docs/SPEC.md` §4.6。
- **挖矿系统**（2026-10-23）：**机制已实现**（933 行管理类 + 界面 + 4 种矿层 + 铁匠铺解锁），
  缺的是内容层——洞内地图、铁镐、挖矿经验。计划见 `docs/plan/mining.md`，待办见 roadmap #10。
- **下一步方向**：开发其他系统的内容（本阶段不再往下做烹饪）。
- 配方解锁机制的现状见 `docs/SPEC.md` §4.5。

## 四、文档增长怎么控制（四条硬规则）

1. **一份事实只写一处**：同一件事只在 SPEC / roadmap / archive 里各写一次，其他地方只写链接。
2. **生命周期**：计划文档 → 实施完成 → 压缩成 SPEC 的几行 → 原文移入 `docs/archive/`，从此只读。
3. **长度预算**：README ≤ 80 行、roadmap ≤ 120 行、SPEC ≤ 400 行；超了就按系统拆到 `docs/spec/<系统>.md`，并在 SPEC 留一行链接。
4. **每次功能完成的收尾清单**：从 roadmap 移出 → 补 SPEC → 计划文档归档 → 更新本文的"当前状态速览"（详见 `AGENTS.md` §8）。

> 设计取向：**允许文件变多，但不允许单份变长**。多出来的文件由本文件索引兜住。

## 五、新开一个系统时怎么建文档

1. 在 `docs/roadmap.md` 加一条（目标 / 范围 / 验收标准）。
2. 若需要拆解设计（预期改动跨 3 个以上文件），才新建计划文档，路径 `docs/plan/<系统>.md`；简单的直接做，不建计划文档。
3. 完工后：SPEC 补一节（或拆 `docs/spec/<系统>.md`），计划文档移入 `docs/archive/`，roadmap 删条目并到 `archive/roadmap_done.md` 记一行。

## 六、路径迁移说明

2026-10-22 起，两份历史规划稿从 `docs/` 根目录移到 `docs/archive/`：

- `docs/plan_buff_system.md` → `docs/archive/plan_buff_system.md`
- `docs/plan_consumable_attribute.md` → `docs/archive/plan_consumable_attribute.md`

**已知残留**：游戏代码里有两处注释仍写旧路径（`js/Data/Buff/Buff_dish.js:4`、`js/GameRun/consumable_manage.js:320`）。基线代码未改动，按新路径对照即可。
