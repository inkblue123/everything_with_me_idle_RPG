# Buff 系统兼容性分析与改造规划

> 分析对象：未来 buff 需求（`idea/idea3.md` 的 buff 章节、`idea/idea4技能可能做出来的效果.md` 的战斗 buff、`idea/idea6战斗系统设定.md` 的战斗 buff 章节） vs 当前实现（`everything_with_me_idle/js/Player/Player_buff.js` 及关联文件）。
> 本文只做分析与规划，不修改任何代码。文中"改动"均为建议方向，用于说明要为未来准备什么。

---

## 一、当前 buff 系统快照

### 1.1 数据结构

| 层 | 文件 | 结构 |
| --- | --- | --- |
| buff 数据库 | `js/Data/Buff/Buff_class.js` | 每个 buff：`{id, name, desc, time_type, time_value, buff_value[]}`；`buff_value` 每条 = `{buff_type, data_type, data_value}` |
| buff 数据库内容 | `js/Data/Buff/Buff_normal.js` | 目前只有 9 个 buff：测试 buff、睡眠/起床、疲劳/极度疲劳/精力充沛 |
| 运行对象 | `js/Player/Player_buff.js` 第 8-25 行 | `BUFF` 基类：把数据库内容深拷贝到实例上，并为每个 buff_value 初始化 `start_flag`（一次性效果是否已生效）、`start_data`（需要还原时扣除的数值） |
| 时间子类 | 同上第 27-172 行 | `game_time_BUFF`：`buff_start_time / last_buff_time / buff_have_time` |
| 管理类 | 同上第 199-213 行 | `Player_Buff_Manage`：两个按 **buff id 做 key** 的容器 `game_time_buff`、`combat_round_buff`；汇总对象 `end_buff_attr`；汇入玩家属性的 `end_data_attr` |

### 1.2 效果通道（buff 效果的"最终归宿"）

`js/Data/Enum/Enum_buff.js` 定义了 5 条通道 + 1 个 bool 列表，所有 `data_type` 必须且只能走其中一条：

1. `change_data_attr_data_type`：`health_point / magic_point / surface_energy_point / deep_energy_point` —— 直接增减当前资源（`data_attr.js` 的 `change_data_attr`）。
2. `updata_end_attr_data_type`：`max_health_ratio / attack_ratio / precision_ratio / …` —— 数值加算进玩家属性类，由 `data_attr.js` 的 `updata_need_calculate_end_attr()` 汇总成 `true_xxx`。
3. `global_set_flag_data_type`：`GS_rest_flag` —— 修改游戏状态。
4. `set_game_speed_num_data_type`：`change_game_speed` —— 加算修改游戏速度。
5. `set_game_speed_ratio_data_type`：目前为空。

核心约束（`Player_buff.js` 第 367 行）：**所有 buff 效果最终必须是数字**，bool 在 `get_true_data()`（第 187-197 行）里转成 ±1。这正是 idea3 问题 4 定的规矩："buff 的效果尽量都变成加减算数字"。

### 1.3 运行流程

- 每帧 `run_player_buff()`（第 319 行）只运行 `game_time_buff`（`run_game_time_buff`，第 336 行）。
- `game_time_BUFF` 以 **100ms 为 tick**（`get_buff_status` 第 60-81 行），每次激活按"每秒数值 × 经过时间比例"算出增量（`start_buff` 第 91-143 行）。
- 增量汇总进 `end_buff_attr`（`updata_end_buff_attr` 第 358-396 行），然后 `restart_end_buff`（第 398-443 行）把**本帧变化过的 data_type** 通过枚举通道生效到游戏里。
- 清除 buff 时，restore 型效果取负值返还（`delete_buff` 第 145-171 行）。
- 同 id 的新 buff **直接替换**旧 buff（`set_buff_attr` 第 248-271 行，对应 idea3 问题 2 的最终决定）。
- 存档只存 `game_time_buff` 的剩余时间（第 216-229 行），`combat_round_buff` 从未被运行、从未被写入。

### 1.4 与设计文档的对应关系

| 设计文档要求 | 现状 |
| --- | --- |
| idea3 问题 1：同效果不同 buff 叠加 | ✅ 数值上已支持（`end_buff_attr` 按 data_type 累加） |
| idea3 问题 2：同 id 新替换旧 | ✅ 已实现 |
| idea3 问题 3：复合属性 buff（方案 1） | ✅ 一个 buff 多个 `buff_value` 已支持 |
| idea3 问题 4：总对象机制 / bool 转数字 | ⚠️ 已实现（增量式），但见"改动 4" |
| idea3 问题 5：buff 展示排序 / 提示窗 | ⚠️ 基本框架有，存在 bug（见第五章） |
| idea3 问题 6：正负面 / 可叠层 / 系列分类 | ❌ 完全没有 |
| idea3 问题 7：抵抗力 | ❌ 完全没有（抵抗力属性存在但未被 buff 系统使用） |
| idea4 战斗 buff（系列、层数、DoT、事件触发） | ❌ 完全没有 |
| idea6 战斗 buff 章节（战斗作用域、战斗外加速消失、回合型） | ❌ 完全没有 |

---

## 二、未来需求整理（按改动来源）

### 2.1 idea3 buff 章节提出的需求

- **正/负面分类**：所有 buff 分正面、负面（问题 6）。
- **可叠层 / 不可叠层**：可叠层 buff 单层效果弱、易获取易去除；不可叠层 buff 数值高、重复获得刷新时间、难去除（问题 6）。
- **系列与等级**：如"火系列同等级共存、高级覆盖低级"，且最终倾向"无脑全部覆盖"（问题 6）。
- **抵抗力**：debuff 带等级，抵抗力按每 100 点一个等级阶段；低于抵抗力等级的 debuff 免疫、同级按阶段内数值缩短持续时间（问题 7）。
- **buff 展示**：无限时间最左、有限时间按剩余时间降序；时间型与回合型分开展示；频繁刷新的场地 buff 不应"前一帧给下一帧清"（问题 5）。

### 2.2 idea4 战斗 buff 提出的需求

- **系列系统**：火、毒、冰、雷、威压、净化、心魔、咒印、煞气、业力等，各系列有"覆盖低级 / 可共存 / 互斥"等不同规则。
- **层数机制**：叠层上限、层数衰减（"每多一层持续时间乘 0.75/0.5"）、"持续时间结束减少 1 层"、"触发后清空层数"、"层数达阈值自动引爆"、"重复获得刷新/不刷新持续时间"。
- **DoT 伤害**：每秒每层伤害，伤害来源有固定值、目标当前生命百分比、目标最大生命百分比、施术者攻击力比例（赤炎 5% 攻击力）、按击杀数成长（业火）等。
- **事件触发效果**：攻击时（吸血、疗愈、隔离、醉酒、瘟疫之毒传播、心魔友伤）、受击时（弹反、格挡、接、化、发、雷系"触电"）、施法时（焚心火、情花毒、心猿意马）、移动时（流血）、击杀时（业力"报应"、戾气缠身 +2 层）。
- **特殊机制**：延迟结算（血咒记录伤害、业力反噬、因果缠身、生死咒、劫数倒计时）、转化（魔气侵蚀、阴阳和合散、剧毒→中毒、火毒→中毒）、净化抵消（圣洁）、免疫/抗性（冰封抗性、震慑抗性）、不可净化/不可抵抗（永冻、鸩毒、神雷、劫数、三昧真火）、区域型（瘴气作用于距离格子）、不显示型（领域压制）、复活保留（尸毒）、技能冷却延长（情花毒）、行为控制（冰封无法行动、执念锁目标）。

### 2.3 idea6 战斗 buff 章节提出的需求

- **战斗作用域**：战斗 buff 战斗结束不再生效（正面战斗 buff 清除或停止生效；负面战斗 buff 战斗外加速消失——时间型每秒扣 5 秒、回合型每秒结算 1 回合）。
- **回合型 buff**：以玩家战斗回合为时间依据的 buff（当前 `combat_round_buff` 容器是空壳）。
- **抵抗力是唯一对抗属性**：不多做多种抗性。

---

## 三、需要改动的地方（数据结构 + 运行逻辑）

### 改动 1：buff 数据库结构扩展（`Buff_class.js` / `Buff_normal.js`）

**位置**：`js/Data/Buff/Buff_class.js` 的 `Buff` 类（第 3-30 行）、`add_buff_value`（第 37-48 行）。

**现状**：buff 只有 `id/name/desc/time_type/time_value/buff_value[]`，效果条只有 `buff_type/data_type/data_value` 三元组，没有任何分类、等级、层数、作用域信息。

**建议增加数据库字段（均为可选字段，老 buff 不填即用默认值）**：

| 字段 | 取值示例 | 为谁准备 |
| --- | --- | --- |
| `buff_tag`（正/负面/中立） | `positive / negative / neutral` | idea3 问题 6；魔气侵蚀要枚举"正面 buff"；净化/增益类技能只作用正面 |
| `stackable`（可叠层） | `true / false`，配合 `max_stack` | idea3 问题 6；idea4 全部叠层 buff |
| `series`（系列） + `series_level`（系列等级） | `fire/1`、`ice/3`、`poison`（无等级共存） | idea3 问题 6 系列覆盖；idea4 火/冰/毒/雷/威压/心魔/咒印/煞气/业力 |
| `series_cover_rule` | 覆盖低级 / 同系列共存 / 与其他系列互斥 | 火"高级覆盖低级"、冰同、道心破碎"不可与心魔入侵共存"、火毒"同时视为火+毒" |
| `default_time` + 层数相关时间规则 | `refresh_time`（重复获得刷新）/ `no_refresh`（不刷新）/ `layer_decay`（每层×系数，如 0.75/0.5）/ `end_reduce_layer`（结束减 1 层）/ `trigger_clear_layer`（触发清层） | idea4 各系列的时间行为 |
| `max_stack` / `min_stack` | 焚心火"层数上限较低"、封灵咒"最多 5 层"、寒魄入体"上限 10 层" | 层数上限 |
| `buff_level` | 1/2/3/4/5 | idea3 问题 7 抵抗力按等级免疫；净化"圣洁"按等级消耗层数；火/冰系列等级 |
| `scope`（作用域） | `normal / combat / life` | idea6：战斗 buff 战斗外不生效 |
| `resistable` / `resist_ignore` | `true / false` | 三昧真火"无法被抵抗类属性减免"、莽牯朱蛤毒"无视毒抗" |
| `cleanable` / `clean_immune` | `true / false`（或"仅可被消业类清除"标记） | 永冻、鸩毒、神雷、劫数、业力 |
| `show_flag` | 是否在目标身上显示 | 领域压制"不在目标身上显示为 debuff" |
| `target_type` | `unit / grid` | 瘴气作用于距离格子（后续距离系统） |
| `effect_type`（效果表达方式） | `attr`（数字加算，走现有通道）/ `dot`（每秒伤害）/ `event`（事件触发）/ `record`（记录延迟结算） | 见改动 4，决定效果走哪条结算通道 |

**注意**：`add_buff_value` 的三元组也应扩展（或补充一个 `effect_config` 对象字段），用于携带 DoT 公式（基础值/比例/来源属性）、事件触发条件、记录比例等，避免把公式硬塞进 `data_value` 一个数字里。

### 改动 2：buff 运行对象增加"层数 + 运行时状态"字段（`Player_buff.js` 的 `BUFF` 类）

**位置**：`BUFF` 类（第 8-25 行）、`game_time_BUFF`（第 27-172 行）。

**现状**：实例上只有 `id + 数据库拷贝 + start_flag/start_data + 时间字段`，一个 buff 实例就是"一个 buff"，没有层数概念，持续时间在 `init()` 时一次性从数据库取。

**建议**：
- 增加 `stack`（当前层数）、`max_stack`（生效上限）、`series`/`series_level`（供覆盖判定与展示）、`immunity_have_time`（冰封抗性、震慑抗性这类"结束后获得抗性"的剩余时间）。
- 增加记录型字段：`record_data`（血咒累计记录伤害、业力反噬累计记录伤害、生死咒记录的施加时血量百分比、因果池累计伤害）、`countdown`（劫数倒计时层数）。
- 增加施加者/来源信息：`caster_id`、`caster_attack`（赤炎需要施术者 5% 攻击力、心魔反噬按目标自身攻击力）、`kill_num`（业火按击杀数增伤、戾气缠身击杀 +2 层）——当前 buff 只存在于玩家身上所以没这个概念，敌人施加给玩家的 buff、玩家施加给敌人的 buff 都需要来源。
- `buff_have_time` 不再是"init 时定死"：要支持"每多一层持续时间衰减"（获得时重算）、"持续时间结束减少 1 层并重启计时"（毒系列默认行为）、"触发后清空层数"（催眠/失手/心魔入侵）、"层数达阈值引爆清空"（霹雳）。

### 改动 3：获得 buff 的规则引擎（重构 `set_buff_attr`）

**位置**：`set_buff_attr`（第 248-271 行）。

**现状**：无脑"同 id 新替换旧"；`time_type` 只处理 `game_time_buff`，遇到其他 time_type 的 buff 会直接报错（`buff_obj` 是空对象却调用 `init()`）。

**建议把"获得一个 buff"拆成流程**：
1. **抵抗力判定**（改动 8）：debuff 按等级与抵抗力阶段判定——免疫 / 直接获得 / 持续时间缩短（idea3 问题 7）；有 `resist_ignore` 标记的跳过。
2. **净化抵消判定**（圣洁）：目标有圣洁层数时消耗层数抵消（idea4 净化系列）——需要拦截点就在获得流程入口。
3. **系列覆盖判定**（idea3 问题 6）：按 `series_cover_rule` 决定是否清除/禁止低级同系列 buff（"无脑全部覆盖"方案）。
4. **同类获得规则**：按改动 1 的时间规则分流——`stackable` 则层数 +1（按配置刷新时间或不刷新、层数上限截断）；`refresh_time` 则重置剩余时间；`no_refresh + end_reduce_layer` 则层数 +1 不动时间；触发"持续时间结束减层"的 buff 要在层数 > 0 时保持存活。
5. **免疫/抗性检查**：目标身上有对应抗性（冰封抗性、震慑抗性）时不获得。
6. 最后才是现有逻辑（构建对象、init、入容器）。

这一步是整个兼容改造里**最核心的运行逻辑改动**，因为未来几乎所有 buff 的差异都体现在"重复获得时发生什么"。

### 改动 4：效果结算通道扩展（在"数字加算进属性"之外开第二个通道）

**位置**：`updata_end_buff_attr`（第 358-396 行，强制数字）、`restart_end_buff`（第 398-443 行，枚举路由）、`Enum_buff.js`（5 条通道）。

**现状**：所有效果最终都是"数字增量 → 玩家属性/状态"。DoT 伤害、事件触发、行为修改、延迟结算、转化，这五类效果**在现在的通道里根本无法表达**，这才是"新 buff 装不下"的根因。

**建议**：
- **属性型效果**（攻防增减、恢复增减等）：继续走 `end_buff_attr` 总对象机制（这正是 idea3 问题 4 的既定方向），新 data_type 只需在 `Enum_buff.js` 登记 + 在接收端（`data_attr.js` / 战斗代码）实现消费。未来 idea4 的战斗被动属性（吸血概率/比例、弹反概率/伤害、穿防值、格挡概率/值、斩杀线/倍率、接/化/发概率比例、疗愈、隔离、抵抗力、暴击率、暴击伤害、攻速、精准、闪避、移动速度）都能这样挂上，但**战斗结算代码（`combat_manage.js`、`Player_active_skills.js`）也要真正去读这些属性**，buff 系统本身只负责把数字算对。
- **DoT 伤害通道**：新增"每帧/每秒对目标血量结算伤害"的效果类型，伤害公式支持：固定值 × 层数、目标当前生命百分比 × 层数（中毒 0.1%/剧毒 0.5%）、目标最大生命百分比、施术者攻击力比例（赤炎 5%）、按击杀数成长（业火）。打到玩家走 `change_data_attr('health_point')`，打到敌人需要敌人侧血量接口（改动 5）。
- **事件触发通道**：为"攻击时/受击时/施法时/移动时/击杀时/被暴击时"建立 buff 触发 hook 列表。战斗结算点（`combat_manage.js` 的 `PAE_manage`/`player_attacted`/`EAP_manage`、`Player_active_skills.js` 的技能施放流程）在这些时刻调用 buff 管理器的触发接口，buff 按配置概率/比例结算。这覆盖 idea4 绝大部分战斗被动与 debuff 触发效果。
- **行为修改通道**：攻速延长（寒冷）、生命恢复降低（阻生之毒）、技能失败概率（心猿意马）、锁目标（执念）、无法行动（冰封）、攻击随机化（醉酒）、技能冷却延长（情花毒）等，属于"结算时查询"型效果，需要战斗系统提供读取点，而不是 buff 主动改属性。
- **延迟结算通道**：血咒/业力反噬/因果缠身/生死咒/劫数——buff 运行中"记录"，到"结束/达阈值/倒计时归零"时一次性结算。需要记录字段（改动 2）+ 专门的结算入口（如 buff 被删除、层数归零、行动计数归零时触发）。
- **转化通道**：魔气侵蚀（把正面 buff 转成毒/煞 debuff）、阴阳和合散（复制增益给施术者）、剧毒/火毒结束时转 1 层中毒、蛊毒死亡传播——需要枚举目标 buff + 创建新 buff 的能力，属于跨 buff 操作，建议在管理类提供"查询 + 替换 + 新增"的原子接口（改动 7）。

**方向性建议**：目前 `end_buff_attr` 是"增量式"维护（每帧加减 delta），idea3 问题 4 原文描述的是"每一帧把所有 buff 效果累加到一个总对象"，两者都能满足需求；但未来层数变化、转化、净化会频繁产生"整条贡献重算"，增量式容易累积浮点误差（第 414 行已有相关注释）。可以考虑逐步转向"按需全量重算"（buff 变动时，从所有存活 buff 重新累加 `end_buff_attr`），逻辑更稳、和文档描述更一致。

### 改动 5：buff 目标抽象与敌人侧 buff（`Player_Buff_Manage` 之外的承载）

**位置**：`Player_Buff_Manage`（第 199 行）、`js/Data/Enemy/Enemy_class.js`（当前完全没有 buff 字段）。

**现状**：buff 系统是**玩家专属**的，敌人对象没有任何 buff 容器，也没有敌人 buff 运行循环。当前 buff 也只会影响玩家属性，不会"打到敌人身上"。

**建议**：
- 把 `BUFF` 运行类从"玩家属性"解耦成"目标无关"（伤害/效果统一走目标接口），或至少把 `Player_Buff_Manage` 里与玩家属性绑定死的部分（`change_data_attr`、`updata_end_attr`、`global_set_flag` 的调用）抽象成目标适配层，玩家和敌人各自实现。
- 敌人侧需要：buff 容器、每帧/每回合结算循环、DoT 伤害结算与死亡判定、buff 图标（敌人头顶/血条旁）。
- 目标类型要支持**距离格子**（瘴气作用于格子）和**不显示型**（领域压制）——`target_type` 字段（改动 1）在这里兑现。
- 施加者信息（改动 2 的 `caster`）让"赤炎按施术者攻击力""业火按击杀数""蛊毒向友方传播""报应按击败友方数"这些跨目标效果可算。

### 改动 6：回合型 buff 与战斗作用域（时间结算逻辑）

**位置**：`run_player_buff`（第 319 行，只跑 game_time_buff）、`combat_round_buff` 容器（第 202 行，空壳）、`game_status.js` 的 `change_GS_game_statu`（第 34-54 行，退出战斗钩子已在第 43-46 行）、`Player_active_skills.js`（已有回合概念：`round_start_time`/`reset_round`）。

**现状**：`combat_round_buff` 从未被写入也从未被运行；`combat_active_buff` 只有 `get_continuous_start_data` 里一个计算分支（第 181-184 行），没有对应类；buff 运行完全不感知"是否在战斗中"。

**建议**：
- 实现 `combat_round_BUFF` 类：以玩家战斗回合（现有 `Player_active_skills` 的回合概念）为计时单位，回合推进时结算；战斗外按 idea6 规则"每秒钟结算一回合"。
- 实现 `combat_active_buff`（持续数个主动技能施放次数）或明确搁置，先在 `set_buff_attr` 里能正确构建。
- 战斗作用域：给 buff 增加 `scope` 标记（改动 1）；`run_player_buff` 每帧根据当前 `GS_game_statu == 'combat'` 决定哪些 buff 生效；**退出战斗时**（挂到 `change_GS_game_statu` 的 combat 分支）处理：正面战斗 buff 停止生效/清除，负面战斗 buff 进入"加速消失"模式（时间型每秒扣 5 秒、回合型每秒 1 回合——idea6）。
- DoT 类 buff 的结算频率：现有 100ms tick 的"按时间比例折算"模式对"每秒每层一次伤害"不直观，DoT 通道应支持按真实秒/层数结算。

### 改动 7：buff 查询接口（管理类新增 API）

**位置**：`Player_Buff_Manage`（第 199 行起）。

**现状**：只有"按 id 加/删/清空"，没有按系列、按等级、按效果、按正负面查询的能力。

**建议新增**：
- `has_series(series)` / `get_series_buffs(series)`：雷系列设计明确要求"技能使用时看敌人身上有没有雷系列 debuff"（idea4 雷系列）；火毒"同时视为火+毒"需要按多系列查询。
- `get_buff_level()` / 按等级查询：净化"圣洁"抵消时要知道 incoming debuff 的等级（改动 3 的拦截点）。
- 枚举正面 buff（魔气侵蚀）、枚举指定效果类型的 buff（转化、净化）。
- 批量接口：领域压制"范围内目标每 2 秒自动 +1 层"需要周期批量叠层；场地效果（idea3 问题 5 的"场地 buff + 驱散 buff 并存但跳过处理"）需要"存在但效果被跳过"的状态表达。

### 改动 8：抵抗力接入

**位置**：buff 获得流程（改动 3 的入口）、`data_attr.js`（`true_resistance_point` 已算出但无人消费）。

**现状**：抵抗力是玩家属性之一（`data_attr.js` 第 483-485 行已计算 `true_resistance_point`），但 buff 系统完全没用到它。

**建议**：
- 按 idea3 问题 7 的定稿方案：buff 带等级（改动 1 的 `buff_level`）；获得 debuff 时，低于抵抗力等级阶段 → 免疫，同级 → 持续时间 × 阶段内抵抗数值修正。
- 需要"不可抵抗"标记（`resist_ignore`）让三昧真火这类效果绕过。
- idea3 问题 7 末尾提到的"199 抵抗力 vs 3 阶段 debuff"的体验断层是**设计问题**，数据结构先预留（等级字段 + 判定函数），具体数值策略后续再定。

### 改动 9：存档兼容（`save_Player_Buff_attr` / `load_Player_Buff_attr`）

**位置**：第 216-246 行。

**现状**：只存 `game_time_buff` 的剩余时间（且是直接把对象引用塞进存档结构）。

**建议**：
- 存档内容扩展：层数、记录值（血咒/业力/生死咒/因果池）、倒计时（劫数）、抗性剩余时间、来源信息、战斗作用域 buff 的当前状态。
- 战斗 buff 的处理策略要定：战斗结束已清除的不用存；战斗外加速消失中的要存剩余时间；读档时如果不在战斗，要能恢复"战斗外加速消失"的后续行为（idea6 的规则要能跨存档成立）。
- 回合型 buff 存剩余回合数（战斗外每秒减 1 回合的规则也要在存档恢复后继续）。

### 改动 10：展示层（buff 界面与提示窗）

**位置**：`updata_buff_show`（第 445-495 行）、`add_buff_show_div`（第 527-550 行）、`buff_tip.js`。

**现状**：左上角按剩余时间排序显示 buff 名 + 秒数，提示窗只有名称和描述。

**建议**：
- 显示层数（`x3`）、系列/等级标识、正负面颜色区分（改动 1 的字段）。
- 显示"抵抗力修正后的实际持续时间"而不是数据库原始值。
- 不显示型 buff（领域压制）跳过展示。
- 排序规则保留 idea3 问题 5 的方案（无限左、时间降序），但要处理"层数变化导致刷新"和"战斗外加速消失导致时间快速变化"的更新频率问题。
- 提示窗扩展：效果明细（每条 buff_value 的效果）、层数说明、来源/施术者。
- **注意**：现有 `buff_id_sort` 有 bug（见第五章），这个排序逻辑未来直接服务于问题 5 的方案，必须先修好。

---

## 四、依赖关系与建议改造顺序

```
第一批（硬伤，不改则任何新 buff 都无法落地）
  ├─ 改动 1：数据库字段扩展        ← 一切分类/层数/等级信息的地基
  ├─ 改动 2：运行对象层数与状态      ← 依赖改动 1
  ├─ 改动 3：获得规则引擎            ← 依赖改动 1、2；抵抗力/净化拦截入口
  └─ 改动 4：效果通道扩展            ← 依赖改动 1（effect_type）

第二批（战斗 buff 落地必需）
  ├─ 改动 5：目标抽象与敌人侧 buff   ← 依赖改动 4（DoT/事件要打到敌人）
  ├─ 改动 6：回合型与战斗作用域      ← 依赖改动 1（scope）、改动 3
  └─ 改动 7：查询接口                ← 依赖改动 1（series）、改动 2

第三批（完善）
  ├─ 改动 8：抵抗力                  ← 依赖改动 1（buff_level）、改动 3
  ├─ 改动 9：存档兼容                ← 依赖改动 2（所有新字段先可序列化）
  └─ 改动 10：展示层                 ← 依赖改动 1、2
```

建议第一批先做"改动 1 → 改动 2 → 改动 3"（数据结构与获得规则），因为它们决定整个 buff 系统的骨架；"改动 4 的效果通道"可以和敌人侧 buff（改动 5）一起做，因为 DoT 需要目标接口。

---

## 五、现状代码里顺带发现的问题（与本次改造相关）

> 更新：以下 1-4 项已在 2026 年修复，5 项属于设计约束、不是 bug，留给后续改造（改动 4）处理。

1. **`get_buff_have_time()` 恒返回 'infinite'**（`Player_buff.js`）：~~`if ((this.buff_have_time = 'infinite'))` 是**赋值**不是比较，条件恒真~~。✅ 已修复为 `==`，有限时间 buff 现在能正确返回剩余秒数，buff 界面会正常显示"x 秒"。
2. **`buff_id_sort` 引用未定义变量**（`Player_buff.js`）：`numericKeys.sort((a, b) => obj[b] - obj[a])` 里的 `obj` 不存在（应为 `sortData`）。✅ 已修复为 `sortData[b] - sortData[a]`，有限时间 buff 的排序不再抛 ReferenceError，idea3 问题 5 的排序方案可以正常运转。
3. **`set_buff_attr` / `delete_buff_attr` 对未知 id / 未知时间类型会直接崩溃**：`set_buff_attr` 只处理 `game_time_buff`，一旦数据库出现 `combat_round_buff`/`combat_active_buff` 类型或传入了不存在的 id，`buff_obj.init()` 会抛 TypeError。✅ 已加守卫：不存在的 id、未实现的时间类型都会打印日志并安全返回，不会中断游戏。
4. **读档后 restore 型 buff 的生效状态丢失**（`load_init`）：存档时把整个 buff 对象写入，但读档只恢复了 `buff_have_time`，`start_flag`/`start_data` 没有恢复——导致一次性效果（睡眠的休息状态、游戏速度）读档后**重复生效**，连续 restore 效果（生命上限加成）在 buff 消失时**无法正确还原**（还原值为 0，属性永久残留）。✅ 已修复：`load_init` 会按 `buff_type + data_type` 匹配，把存档里的 `start_flag` / `start_data` 恢复到对应效果上。
5. **buff 效果强制数字**（`updata_end_buff_attr`）：对"非数字效果直接 console 跳过"。这是**设计约束**而非 bug（idea3 问题 4 的既定规则），未来效果类型多样后需要按 `effect_type` 分流（见改动 4），届时再调整。

**附带修复**（同类 `=` 赋值 bug，不在 buff 文件内）：
- `Player_active_skills.js` 的 `updata_player_data`：`if ((atk_speed_correct.type = 'fixed'))` / `else if ((atk_speed_correct.type = 'ratio'))` 两处赋值恒真，导致攻速修正永远走"固定间隔"分支，"比例加成"分支永远不可达；且 ratio 分支引用了不存在的 `this.end_data_attr`（应为 `this.player_end_attr`）。✅ 三处均已修复。当前没有技能数据使用 `attr_correct['attack_speed']`，此修复暂不改变现有玩法，是为未来主动技能攻速修正准备。
