# 消耗品「调味 / 实例属性」框架规划稿

> 性质：给**下一会话**看的**实现前置规划**。本稿只做**定义与规划**，不做任何实现。
> 对应 `docs/roadmap.md` #4「消耗品的独特属性数据结构」（目标原文：_保存菜品的调料属性和调料使用情况_；验收：_消耗品能携带并保存其独特属性，存档读档后不丢失_）。
> 生成方式：grill-with-docs 盘问会话（2026-09-09）逐轮收敛所得。

---

## 0. 目的与读者

-   **读者**：下一个接手的会话（会读本稿后，按 AGENTS.md 流程先中文计划、经确认再改基线代码）。
-   **本文交付深度**：数据 schema + 字段定义 + 需改动文件清单 + 实现顺序。
-   **本次会话产出物边界**：只定义「如何定义与如何规划」，不触碰 `everything_with_me_idle/` 任何代码（基线只读）。

---

## 1. 领域词汇表（本会话固化的统一术语）

> 术语有歧义处，以下列为准。词汇随实现推进可能再增。

| 词                      | 含义                                                                                                                                                                                                  | 出处/备注                                                           |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| 消耗品 consumable       | 一次性/按需使用、使用后消失或消耗的物品；`main_type='consumable'`                                                                                                                                     | 现有                                                                |
| 有内容消耗品            | 靠"制作/自定义"产生**实例内容**的消耗品，需按实例区分。首批=**菜品**                                                                                                                                  | 本稿提出                                                            |
| 白板菜品                | 未调味的菜品；只有模板基础效果                                                                                                                                                                        | 设计沿用 idea5「制式(白板)」                                        |
| 调味料 / 调料 seasoning | 一种"作为调料用"的消耗品；加入菜品会贡献属性。现有小类 `refined_seasoning`                                                                                                                            | 从材料迁入消耗品（见 §3 D3）                                        |
| 调料小类                | 调料所属的消耗品小类（现仅 `refined_seasoning`，未来会增多种）                                                                                                                                        | 记录口径用"小类"                                                    |
| 调味品情况 / 用量记录   | 一份菜品实例记录"用了哪些调料**小类**、各几次"                                                                                                                                                        | 实例 `ex_data.seasoning`                                            |
| 调味后总加成 bonus      | 调味那一刻算好并固化在实例上的**效果行集合**（食用/展示的真源）                                                                                                                                       | 实例 `ex_data.bonus`                                                |
| 调料的调味字段          | 每条**具体调料**在数据库里带一个"作为调料才有"的字段，声明它加入菜品时贡献的效果行                                                                                                                    | DB 侧，本稿新增字段                                                 |
| 模板效果 use_attr       | 物品模板自带的食用效果行（白板基础）                                                                                                                                                                  | 现有 `use_attr`                                                     |
| 实例 ex_data            | 背包里每个物品实例的"使用时额外属性"容器                                                                                                                                                              | 现有 `item_class.ex_data`（见 §2 关键结论）                         |
| 复合背包 key            | `id:hash`；hash 由实例独特属性算出 → **内容(ex_data)相同则合堆、不同则分堆**                                                                                                                          | 现有 `get_item_id_key`                                              |
| 同 id 不同属性          | 同一物品 id，不同实例属性/加成不同                                                                                                                                                                    | idea3「复合 id 方案」，装备=稀有度先例                              |
| 效果行                  | 结算单元，按类型用**具名字段**（见 §13）：`get_attr`→`attr_value`；`get_buff`→`buff_time`+`buff_value`；`get_item`→`item_num`；`get_formula`→ 无值字段。公共字段：`attr_type`、`use_ratio`、`attr_id` | 现有 `use_attr` 元素形态（2026-09-10 由 `attr_value1..3` 改革而来） |

---

## 2. 现状关键结论（只读调研，供下会话参考，勿改）

-   **代码里已有预留缝，未落地**：
    -   `item_class`（`Player_backpack.js`）消耗品已留 `use_ratio`(使用进度) + `ex_data`(使用时额外属性) 字段。
    -   `get_item_obj(id, num, use_ratio, ex_data)` 已接受消耗品 ex_data 参数；`get_item_id_key()` 已把 `use_ratio + JSON.stringify(ex_data)` 哈希拼成复合背包 key（装备=稀有度同款机制，即 idea3 方案 1 落地）。
    -   `Function.js check_Consumable` 已对 ex_data 做基础校验。
    -   背包存档 `save_Player_backpack()` 整存 `backpack_items` → **实例自带数据天然进存档**。→ 因此本框架**无需新增存档字段**。
-   **烹饪侧**：`COK_cooking_dishes.js` 的"添加调料"UI 已能把选择暂存并返回 `[{id, num}]`（`get_COK_CD_seasoning()`），但**无人把它写进产物实例**；`COK_MS(制调味品)/COK_DS(菜品调味)/COK_MD(干制品)/COK_EN` 多为空壳。
-   **现菜品/干制品数据**：food 小类 6 项、dry_product 3 项**只填了 id/堆叠/价格，`use_attr` 全空**（模板半成品，需在实现时补基础效果）。
-   **现调料实物**：材料大类下有 `fish_meat_floss 鱼肉松 / animal_meat_floss 兽肉松 / berry_jam 浆果果酱`，`refined_seasoning` 小类(270)；`elixir_essence 丹药精华` 小类(271) 也在材料大类。
-   **领域设定来源**（素材级，未落码）：`idea/idea5生活玩法设定.md` 烹饪/调味（单调料超 3 次变味、需记属性+用量、调味范围只限菜品）；`idea/idea3.md` 小类矩阵与"同 id 不同属性"复合 id 方案。

---

## 3. 本次盘问定下的设计决策（含改判记录）

-   **D1 载体**：实例独特属性放在现有 `item_class.ex_data`（**不新增独立字段、不新增存档字段**）。
-   **D2 实例存两样**：`ex_data = { seasoning(调味品情况), bonus(调味后总加成) }`（**用量记录 + 总加成缓存都要**；见改判 ④）。
-   **D3 类别归属搬迁**：把现有放在**材料大类**下的
    -   **`refined_seasoning` 精制调味料**、以及
    -   **`elixir_essence` 丹药精华**
        迁入**消耗品大类**（成为消耗品小类/条目）。以后消耗品下会新增多种"调料小类"。丹药精华**本期只搬迁、不处理其内容**。
-   **D4 记录口径**：菜品实例只记录**调料小类 + 次数**（不记具体调料 id）——用于展示/追溯；不影响效果，因为效果已固化（见 D6/D2）。
-   **D5 效果真源在 DB（调料侧）**：每种**具体调料**在数据库带一个"作为调料才有的字段"，声明它加入菜品时贡献的效果行。**同小类的不同具体调料贡献不同**，因此必须在"调味那一刻"用该字段算出贡献并固化（不可事后靠 id 重推——实例里不记具体 id）。
-   **D6 效果接入**：食用结算 = **模板白板 `use_attr` ∪ 实例 `ex_data.bonus`**，归并后一次性交给 `consumable_manage` 结算器执行。
-   **D7 buff 类效果延后**：调味贡献若含"每秒/持续恢复"等 **buff** 语义，本期只**定义接口/占位**（`get_buff` 预留），真正接通放到 buff 系统升级（roadmap #1）之后；本期用 `get_attr` 类即时效果验证链路。
-   **改判记录**：
    ① 初定"只存算好的结果(+可选记录)" → **改**为结果与用量都留（D2）。
    ② 初定 effect 行存实例 → 曾一度改为"效果从 DB 现读、不落实例" → **最终改回**：总加成必须固化在实例（因只记小类、同小类效果不同，事后无法重推）。
    ③ 调料归属：材料 → 消耗品（D3），并顺带丹药精华。

---

## 4. ex_data 数据模型（schema）

有内容消耗品**不强求 `maxStack = 1`**。叠堆规则由现有复合 key 决定：背包 key = `id : hash(ex_data)`，因此**调味结果完全相同的两个实例 → 相同 key → 自动叠在同一格**（数量累加，受 `maxStack` 上限约束）；调味结果不同 → 不同 key → 各自独立格。其 `ex_data` 固定结构：

```js
// 背包实例对象（key = '菜品id:' + hash(use_ratio + JSON.stringify(ex_data)) ）
{
  id: '<菜品id>',
  num: 1,
  // 使用方式若为持续型还需 use_ratio（现有语义保留）
  ex_data: {
    // ① 调味品情况：按“调料小类”记用量（展示/追溯用）
    seasoning: {
      '<调料小类secon_type>': <次数>,
      // 例：refined_seasoning: 3
    },
    // ② 调味后总加成：算好的效果行集合（食用/展示的真源）
    bonus: [
      // 效果行，与 use_attr 元素同构（字段名按效果类型而定，见 §13）
      { attr_type:'get_attr', attr_id:'magic_point', attr_value:5 },
      { attr_type:'get_buff', attr_id:'...', buff_time:..., buff_value:... }, // buff 类本期占位、延后接通
    ]
  }
}
```

**三种实例形态对比**：
| 形态 | ex_data | 效果来源 |
|---|---|---|
| 白板菜品（未调味） | 无 ex_data 或 `seasoning={}`/`bonus=[]` | 仅模板 `use_attr` |
| 已调味菜品 | `seasoning={小类:次数}` + `bonus=[...]` | 模板 ∪ bonus |
| 同 id 不同加成 | 各自不同 ex_data → 不同 hash key | 各自独立格 |

**样例（调味鸡枞汤 termite_mushroom_soup）**：

-   模板白板（DB）：`use_attr=[ {get_attr,health_point,30}, {get_attr,surface_energy_point,10} ]`
-   调味时用了"精制调味料"3 次（具体含鱼肉松 ×2、果酱 ×1，贡献各不相同，调味时已算入 bonus）：
    ```js
    ex_data = {
      seasoning: { refined_seasoning: 3 },
      bonus: [ { get_attr, magic_point, 5 }, { get_buff, regen_health, ... } ] // 数值/字段待领域定
    }
    ```

---

## 5. 调料数据模型（DB 侧，迁入消耗品后）

-   每个**具体调料**条目新增一个"作为调料才有的字段"，表达它贡献给菜品的效果行（形状建议与效果行同构，可多条）。
-   值随具体调料不同（同小类不同 → 字段不同）。
-   该字段在**调味时**被读取：把被选调料按其字段 × 使用次数 折算后，累加进产物菜品的 `ex_data.bonus`；同时把"小类 → 次数"写进 `ex_data.seasoning`。
-   调味流程（生产侧）：`COK_CD`（或将来的 `COK_DS`）选料 → `get_COK_CD_seasoning()=[{id,num}]` → 对每个 id 读其 DB 调味字段折算 → 写入产出实例 ex_data。
-   细节（是否按次数线性、是否受"变味/上限"约束）见 §10 遗留。

---

## 6. 食用效果结算规则

-   触发：`consumable_manage` 使用一次/持续完成的菜品。
-   归并：`效果清单 = 模板 items[id].use_attr ∪ 实例 item_obj.ex_data.bonus`。
-   执行：一次性交给 `get_consumable_use_data` 逐条结算（`get_attr` 已实现；`get_buff`/`get_item` 为占位，本期不动其实现，仅保证 bonus 里出现这类时**不崩、可识别、日志清晰**）。
-   去重/叠放规则：模板与 bonus 同 attr_id 是否合并相加，属 §10 待下阶段定的数值细节（本稿先标规则需定义）。

---

## 7. 需改动 / 新增文件清单（按层分组，供实现会话逐条出中文计划）

> 全部为**规划候选**；真正改哪条、怎么改，须下一会话按 AGENTS.md 先计划、经你确认。

-   **Data（类别搬迁 + 内容/模板）**
    -   `js/Data/Enum/Enum_item.js`：`refined_seasoning`、`elixir_essence` 归属从材料 → 消耗品的枚举整理（`secon_type_sort`、各 `*_secon_type` 分组依赖 `Data.js` 动态收集，需核对）。
    -   `js/Data/Item/Material.js`：把精制调味料、丹药精华的条目声明**移出**。
    -   `js/Data/Item/Consumable.js`：接收上述条目为消耗品；为 food/dry_product 白板补基础 `use_attr`；为各调料条目新增"调味字段"。
    -   `js/Data/Item/Item_class.js`：Consumable 类若需新增调味字段的 setter / bonus 结构辅助（最小化）。
    -   `js/Data/Data.js`（若受类别变动影响的小类自动收集逻辑需核对）。
-   **Player / 背包**
    -   `js/Player/Player_backpack.js`：确认/完善 ex_data 实例的入包、叠堆逻辑——**同 ex_data（同 key）合堆、异 ex_data 分堆**，沿用 `maxStack` 上限，不强设 maxStack=1。
    -   `js/Function/Function.js`：`get_item_obj`/`get_item_id_key`/`check_Consumable` 对结构化 ex_data（seasoning+bonus）的哈希与校验适配。
-   **GameRun（结算 + 调味生产）**
    -   `js/GameRun/consumable_manage.js`：结算改为"模板 ∪ ex_data.bonus"归并。
    -   `js/GameRun/live_plan/Material_handling/cooking/cooking.js` 与 `COK_cooking_dishes.js`：把已选调料折算写入产出菜品 ex_data（生产侧落点）。
-   **Dom / 文本（展示）**
    -   `js/Dom/Tooltip/item_tip.js` + `js/Data/Text/Text_item/*`：tooltip 展示"调味品情况 + 总加成"（文本命名约定）。
-   **存档**：预计**无需改动**（整存实例）；实现时以"调味菜存取档读档不丢"自测为准。

---

## 8. 实现顺序（最小可用垂直切片 → 扩展）

1. **Step 1 类别搬迁**：调料与丹药精华迁入消耗品，先不接效果（含 all_seasoning / 枚举 / 文本归位），跑通显示。
2. **Step 2 数据结构**：定义 ex_data(seasoning+bonus) 结构化字段 + 校验 + key 哈希适配；能手工造一个"带 ex_data 的调味菜"实例并独立入包。
3. **Step 3 结算**：consumable_manage 归并模板 ∪bonus 结算（先只 get_attr 即时类，验证链路）。
4. **Step 4 生产**：把 COK_CD 所选调料折算写入产物 ex_data（真正产出"已调味菜"）。
5. **Step 5 展示**：tooltip/文本显示调味品情况与总加成。
6. **Step 6 兼容与自测**：存量无 ex_data 菜品的读档兼容；新建调味菜 → 存档 → 读档 → 校验不丢。
7. （buff/每秒效果真正接通、变味规则等 → §10 下阶段）

> 每步都先按 AGENTS.md 给"文件路径+改动+影响"的中文计划并经你确认；建议动手前 `git init && git add -A && commit`（基线保护）。

---

## 9. 归档：ADR（难反悔取舍：背景 → 决策 → 理由 → 后果）

-   **ADR-1 实例容器用 ex_data**：背景：需要"同 id 不同属性"且存档持久。决策：扩展现有 `item_class.ex_data`，不新增字段/不新增存档结构。理由：key 哈希、整存存档已天然支持，改动最小、无迁移。后果：ex_data 语义需被约束为"调味品情况+bonus"，避免被别处滥用。
-   **ADR-2 效果真源在调料 DB + 总加成固化在实例**：背景：调味后效果需稳定持久，且实例不记具体调料 id。决策：每种具体调料 DB 带调味字段；调味时算好 `ex_data.bonus` 固化。理由：只记小类无法事后重推不同调料差异 → 必须在写入瞬间固化。后果：一次调味=一次折算写入；改动配方/调料数值不会追溯影响已产出菜品。
-   **ADR-3 复合背包 key / 按内容叠堆**：背包 key = `id:hash(ex_data)`。**调味结果相同(ex_data 相同)→ 同 key→ 合堆**；不同 → 分堆。不强设 maxStack=1，沿用 maxStack 上限。沿用现成机制，风险低。
-   **ADR-4 buff 类效果延后接通**：背景：调料"每秒/持续恢复"本质是 buff，而 buff 系统为 roadmap #1。决策：本期定义接口、get_buff 占位，不实现 buff 本体。后果：buff 型调料效果暂不可用，待 #1 后补。**（2026-09-28 改判：已纳入本次设计范围，见 ADR-9 与 §16）**
-   **ADR-5 记录按调料小类而非具体 id**：展示/追溯粒度到小类；具体差异由固化 bonus 承载。
-   **ADR-6 调料的限时效果只成一条 buff**（2026-09-28）：背景：若按具体调料或小类各成一条，一份菜会让 buff 栏同时冒出三四条。决策：全局唯一 `seasoning_effect`「调料效果」，一份菜的全部调料限时效果装进它的多条效果行；跨份整体替换。理由：保住"一份菜内多调料全共存（全能食物）"的玩法，同时把 buff 栏压到一条，并天然防住"连吃多份菜叠调料"。后果：不同菜品之间的调料效果互相覆盖；这条 buff 只有一个倒计时，故其内部所有效果必须统一时长（由 ADR-7 提供）。
-   **ADR-7 调味配平（总量守恒的时间重分布）**（2026-09-28）：背景：一条 buff 只有一个时长，而各调料小类各有自己的节奏设定。决策：`T_c = 小类基础时长 × m_c`、`T = max(T_c)`，每条效果按 `v' = v × base × n / T` 重分布（公式见 §16.3）。理由：① 同种调料 n 份时 `v' ≡ v`，自动实现 idea5「重复调味品只加时间不堆叠效果」；② 恒有 `T ≥ T_c` ⇒ `v' ≤ v`，配平只稀释不放大，加得越多整体越稀，是内生的平衡阀。后果：属性型效果会被摊成小数（需量化 1~2 位）；调料失去"自带时长"这一设计维度。
-   **ADR-8 菜品本体 buff 每菜一条、id 复用菜品 id、时长菜品级统一**（2026-09-28）：背景：①"同菜品覆盖、不同菜品共存"要求 buff 身份按菜品区分；② buff id 必须静态存在于表中，否则读档抛异常。决策：每菜品一条静态条目、id = 菜品 id、时长写在该条目的 `time_value` 上。理由：复用菜品 id 可白拿 `texts[id]` 的名字与描述（零额外文本）；时长只存一处，不会与行级设置自相矛盾。后果：每新增一个菜品要在 buffs 表加一条；buff 描述暂时等于菜品描述，将来若需专属描述，在文本库同 id 对象里加字段。
-   **ADR-9 buff 侧对接改造纳入本次范围**（2026-09-28，扩展 ADR-4）：背景：`set_buff` 不支持施加传参、运行实例不保存自定义参数、`load_init` 不还原，且实测 `on_apply` 属性加成读档丢失、删除时反向加回。ADR-4 原定"buff 类效果延后"，但本次已确定要做属性型调料。决策：把"自定义参数保存 + 存档还原 + 修 on_apply bug + 展示实际值"作为本设计的必要前提一并规划。理由：不修则施加传参与属性型调料都无法真正可用。后果：本设计跨越消耗品侧与 buff 核心两侧；改 buff 核心须跑 `_devtools/buff_check/` 三个脚本并补断言。

---

## 10. 遗留 / 下阶段（本稿明确不做，标记待办）

> 状态更新（2026-09-11）：本节的"数值映射公式"一项**已在实现中确定**，见下方标注；其余仍待办。

-   **变味规则**与**调味次数上限**（单调料>3 次变味等，来自 idea5）：仅影响数值规则，需与存储结构解耦后另行定义。**仍待办**（**2026-09-28**：判定数已定为 `max(m_c)`，数值规则仍待办，见 §16.2 D18 / §16.6）。
-   ~~调味的**数值映射公式**（字段值 × 次数 如何折算；模板 ∪bonus 同 attr 是否相加）~~ → **已确定**：调料贡献按其 `season_effect` 行的 `attr_value` **× 每份剂量 n** 折算；`get_attr` 类型在归并时**同 attr 相加**（见 §13、§15）；~~`get_buff` 等其他类型暂不折算、原样保留（语义待 buff 系统升级）~~ → **2026-09-28 已定**：`get_buff` 行不按 ×n 折算，改由**调味配平**按总量守恒重分布（见 §16.3-4）。
-   **buff / 每秒恢复**真接通（依赖 roadmap #1 buff 系统升级）：缺口清单见 §13.3。~~**仍待办**~~ → **2026-09-28 已纳入设计范围**，方案见 §16，坑位见 §16.5。
-   其他"有内容消耗品"扩类（干制品当前不可调味，属后续）。**仍待办**。
-   **二次调味（COK_DS 菜品调味子功能）**：结构已预留（`ex_data` 可承载、复合 key 可区分），但本期明确不做；将来实现时需处理"改已入包实例的 `ex_data` ⇒ 背包 key 变化 ⇒ 拆旧 key / 按新 key 合并重放（可能撞 maxStack 上限）"。**仍待办**。

---

## 11. 风险与注意

-   **存量存档兼容**：旧菜品实例无 ex_data/无结构化内容，读档须优雅降级为白板。
-   **基线只读**：本稿不落任何 `everything_with_me_idle/` 代码；实现由下会话按 AGENTS.md 逐条中文计划并经你确认。
-   **类别搬迁副作用**：`all_seasoning`、配方材料消耗、商店/文本/图鉴等多处按材料小类引用调料的点，迁移后需全查（现材 → 现耗）。
-   **SPEC 同步**：实现落地、结构定型后，按 AGENTS.md §3 把"已存在"部分回写 `docs/SPEC.md`；本稿属规划，不写进 SPEC。

---

## 12. 实现后续待办（2026-09-10 记录，均由盘问会话确认）

> 以下为**已确认要做、但本次不处理**的事项，按需再开实现计划。

-   **切换批量数量会清空调料选择**：~~本次只记录，未改~~ → **已于 2026-09-11 修复**（见 §15）。原因：`updata_live_plan_div()` → `updata_COK_formula_Details_div()` → `init_COK_formula_Details_div()` 中的 `FD_S_value_div.replaceChildren()` 会把已选调料全部清零，而批量份数 m 正是调料扣量（n×m）的乘数。
-   **合成制造（SYN）产物预览的同类问题**：~~本次只在烹饪侧修掉，SYN 侧未改~~ → **已于 2026-09-11 修复**（见 §14）。
-   **变味规则 / 调味次数上限**、**数值映射公式**、**buff 真接通**、**其他有内容消耗品扩类**：见 §10。
-   **持续使用型物品的 get_attr 行永不触发**：`consumable_manage.js` 的 `updata_sustain_use_consumable` 对**每一行**效果都读 `use_ratio` 当进度阈值，而 `get_attr` 行的 `use_ratio` 是 `null`，导致"给持续型物品加 get_attr 行"会静默永不触发且不报错。**本次只记录，未改**。
-   **配方排序只看 attr_id、不看 attr_type**（**已于 2026-09-11 修复**）：`COK_function.js` 的 `COK_switch_type_handle` 在为配方列表排序时，遍历产物 `use_attr` 只比对 `attr_id`，命中就取该行的数值字段。若产物存在**同 `attr_id` 的非 `get_attr` 行**（例如将来的 `get_buff` 行），取到的是 `undefined` → 排序值变成 `NaN`、顺序错乱。
    -   该隐患**在字段改革前就存在**（当时读 `attr_value1`，同样会是 `undefined`），非本次引入；且**迄今触发不了**——要求"非 `get_attr` 行的 `attr_id` 恰好等于 `health_point`/`magic_point`/`surface_energy_point`"，而 buff/物品/配方 id 都不会叫这三个名字，烹饪产物的 `use_attr` 目前也全是 `get_attr` 行。属于**防御性**修复。
    -   **已修法**：循环内先判 `if (use_attr_obj.attr_type != 'get_attr') continue;`，并在注释中写明"排序值只取自 `get_attr` 行"。
-   **配方详情区在构建时即为"可见"状态**：`Dom/Live_plan/Material_handling/{cooking,synthesis}.js` 里 `addElement(..., sty_display)` 传的是空字符串，而 `addElement` 里 `if (sty_display)` 判空为假 → **display 从未被设置**，即元素默认可见；而 `check_show_*_formula_Details_div()` 正是用 `style.display == ''` 判定"详情已展示"，且 `now_formula` **不持久化**（`cooking.js` 的 `save_cooking_manage` 返回空对象；`synthesis.js` 只存 `SYN_all_place_work_bench`）。
    -   理论上读档/初始化路径可能在**没有选定配方**的状态下进入详情渲染，从而读到 `formulas[undefined].material` 而报错并中断游戏循环（`run_manage.js` 的 `setTimeout` 未能重新挂上）。
    -   **2026-09-11 已查清"读档后配方详情为何是隐藏的"**：读档链最末端 `global_manage.load_global_manage` 的 `place_manage.load_place_manage()`（该调用刻意放在最后，注释写明"其他部分依赖地点切换"）→ `Place_manage.change_game_data()` → `live_plan_manage.set_new_place()` → 各原料处理技能管理类的 `set_new_place()`；其中**烹饪/合成**在 `UGS_now_MH_name == 自己` 时会调 `delete_*_formula_Details_div()`，于是详情被隐藏、`check_show_*()` 返回 false，**崩溃因此没有复现**。
    -   也就是说：**此前的"不崩"是依赖这条副作用，而非显式守卫**。风险窗口仍然存在——只要"详情处于可见 + 未选配方"，任何触发 `updata_live_plan_div()` 的动作（如 `Player_formula.js:155`：获得/失去任意物品）都会走进详情渲染。
    -   **处理（2026-09-11 已修）**：采用方案 B —— 在 `updata_COK_formula_Details_div()` / `updata_SYN_formula_Details_div()` 开头增加显式守卫：`now_formula` 为空即视为异常，**打印异常信息**并调用 `delete_*_formula_Details_div()` 切回"未选择配方"界面后 return。理由：理论上要展示配方详情就必须已选定配方。
-   **SYN 批量数量按钮一次点击触发两次详情渲染**：`Dom/Live_plan/Material_handling/synthesis.js` 的 SYN_MK 与 SYN_FM 两处数量按钮回调原本同时调了 `updata_live_plan_div()` 与 `updata_SYN_formula_Details_div()`，而前者内部已会经 `check_show_SYN_formula_Details_div()` 刷新详情 → 重复渲染一次。→ **已于 2026-09-11 修复**：两处都改为只调一次 `updata_live_plan_div()`。
-   **调料没有任何正式产出途径（阻塞性内容缺口）**：`fish_meat_floss 鱼肉松` / `animal_meat_floss 兽肉松` / `berry_jam 浆果果酱` 三种调料目前全项目只有三处落点——物品定义（`js/Data/Item/Consumable.js`）、文本（`js/Data/Text/Text_item/consumable.js`）、以及**调试按钮**（`js/Dom/Game_log_test.js` 直接 `Player_get_item(..., 10)`）。**没有任何配方、采集掉落、商店库存能产出它们**（`COK_MS 制调味品` 子功能仍是空壳）。
    -   后果：正式游玩时玩家拿不到调料，"调味"整条链路实际不可达，只能在调试界面手动发放。
    -   需要内容侧补齐（例：为 `COK_MS` 或某个配方补上"由食材制成调料"的产出），**本次未处理**。
-   **烹饪的"排序"按钮没有任何监听器**：`Dom/Live_plan/Material_handling/cooking.js` 里创建的 `#COK_CD_sort_button`（"排序"按钮）在 `set_COK_CD_button()` 中**没有绑定任何 onclick / addEventListener**，点击毫无反应；目前只有两个下拉框（`#COK_CD_attr_select` / `#COK_CD_dir_select`）的 `change` 会刷新配方列表。**已记下，暂无处理方案**。
-   **`to_num` 存在重复实现**：`js/Function/Function.js` 已导出 `to_num`（效果行数值折算用），而 `js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js` 里仍保留一份**同名本地实现**。功能一致、无冲突，属代码整洁问题。**本次只记录，未改**。
-   **字段改名带来的存量存档后果（已知，未做迁移）**：`ex_data.bonus` 行的字段随存档持久化，且参与背包 key 哈希；改名后旧存档里 `attr_value1..3` 的旧行不会被新读取端识别（`to_num` 兜底为 0 → 视作无加成），同内容的新旧实例也不再合堆。当时的决策是"直接替换、不管旧存档"，此处仅作记录。
-   **调料区占位行会被读成一条无效选择**（已于 2026-09-11 加固）：`Dom/Live_plan/Material_handling/cooking.js` 构建时会在 `#COK_CD_FD_S_value_div` 里放 **5 行静态占位样例**（无 `item_id`/`use_num` dataset），它们要等第一次渲染详情时被 `init_COK_formula_Details_div()` 的 `replaceChildren()` 清掉。而 `get_COK_CD_seasoning()` 原先只判 `use_num <= 0`，占位行的 `use_num` 为 `undefined` → `parseInt` 得 `NaN` → `NaN <= 0` 为 false → 会被当成"已选"，产生一条 `{id: undefined, num: NaN}`。
    -   现状**无实际影响**（捕获只在详情已展示时发生，而进入烹饪界面的正常路径会先把详情隐藏；配方已选定时占位行早已被清掉），但属于脆弱点。
    -   **已加固**：`get_COK_CD_seasoning()` 增加"没有 `item_id` 的行直接跳过"。

---

## 13. 消耗品使用效果字段改革（2026-09-10 实施）

### 13.1 改革内容

`add_use_attr` / `add_season_effect` 的**输入位置参数不变**，但存入效果行的字段改为**按效果类型命名**，解决"`attr_value1` 在不同效果类型下含义不同、看不懂"的问题。

| attr_type     | 值字段                                | 含义                                                                                                    |
| ------------- | ------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `get_attr`    | `attr_value`                          | 属性数值                                                                                                |
| `get_buff`    | `buff_time` + `buff_value`            | buff_time=持续时间(秒，对齐 Buff 的 `time_value`)；buff_value=数值(每秒多少，对齐 Buff 的 `data_value`) |
| `get_item`    | `item_num`                            | 获得数量；`attr_id` 为物品 id                                                                           |
| `get_formula` | 无值字段                              | `attr_id` 为配方 id，靠 `use_ratio` 表示进度阈值                                                        |
| 公共字段      | `attr_type` / `use_ratio` / `attr_id` | `use_ratio` 是"调度/触发阈值"字段，所有类型都保留                                                       |

-   未支持的 `attr_type`：`console` 告警且**不写入**效果行。
-   归并规则（`Function.js` 的 `get_merge_use_attr`，结算与 tooltip **共用同一份实现**）：只有 `get_attr` 按 `attr_id` 相加 `attr_value`；其他类型原样保留、不去重不合并。
-   本次**不做**：`get_buff` 功能接通（仍为占位日志）、旧存档兼容/迁移。
    -   存档影响已知：`ex_data.bonus` 的字段名会随存档持久化，且参与背包 key 哈希（`get_item_id_key` 用 `JSON.stringify(ex_data)`），改名后新旧实例不再合堆；仓库内现有样例存档无 `ex_data` 键。

### 13.2 全项目"value1/2/3 式命名"清点（供后续决定是否也改）

改革只覆盖**消耗品使用效果 + 调味效果 + ex_data.bonus**（这三者是同一套行结构）。其余使用 `value1/2/3` 或类似"懒命名"的地方**本次未动**，清点如下：

| 类别      | 位置                                                                             | 说明                                                                                                 |
| --------- | -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| 装备属性  | `js/Data/Item/Item_class.js` 的 `Equipment.equip_attr` / `init_Equipment_*_attr` | **不用** `attr_value1..3`，而是以属性名为 key（如 `equip_attr[rarity]['attack']`），本就具名，无需改 |
| buff 数值 | `js/Data/Buff/Buff_class.js` 的 `buff_value[]` → `data_value`                    | 已是具名字段（`data_value` / `time_value`），非 value1/2/3                                           |
| 日志文本  | `log_value1` / `log_value2` 等                                                   | 与物品效果无关                                                                                       |
| DOM id    | `TS_value1_*` 等                                                                 | 纯界面元素 id                                                                                        |
| 材料/配方 | 各自用 `num` / `value` 等语义名                                                  | 无 value1/2/3                                                                                        |

> 结论：真正"同一字段在不同语境下含义不同"的问题**集中在消耗品使用效果**（本次已解决）。其他部位要么本就具名，要么只是局部变量的懒命名（id 唯一，不影响追溯），**建议不改**。

### 13.3 附：buff 系统现状（与本次改革相关的事实）

-   `Buff_class` 有 `time_value`（`'infinite'` 或秒）与 `buff_value[]`（`data_value`，语义为"每秒多少"）；但运行时授予入口 `Player_Buff_Manage.set_buff_attr(buff_id)` **只收 buff_id**，时间与数值都从 DB 读——**没有"施加时传 N 秒 / V 值"的通道**。
-   `load_init` 不恢复 `data_value` / `time_value`，即使临时覆盖也会在读档后打回 DB 默认值。
-   展示层（`item_tip.js` / `item_library.js`）目前只渲染 `get_attr` 行，buff 行不会显示。
-   因此"消耗品施加带 N 秒/V 值的 buff"要真接通，仍需：①`get_consumable_use_data` 的 `get_buff` 分支落地；②`set_buff_attr` 支持 N/V 覆盖；③ 存档恢复自定义 N/V；④ 展示层支持 buff 行。以上均属 roadmap #1 buff 系统升级范畴。

---

## 14. 产物预览实时化 + 产物 div 每次重建（2026-09-11 实施）

### 14.1 解决的问题

1. **SYN（合成制造）产物预览不跟随实时状态**：`updata_SYN_formula_Product_div` 原来在**渲染那一刻**把产物对象算好、作为固定值交给提示窗，之后配方/数量变化都不会反映到已挂载的提示上。
2. **产物 div 上的提示监听反复叠加**：`..._FD_P_value_div` 是 Dom 层创建一次的**常驻元素**，每次渲染都调一次 `add_show_Tooltip`（内部挂 `mouseenter`/`mousemove`/`mouseleave` 三个监听），而全项目从无 `removeEventListener`，旧的清空函数（`init_*_formula_Details_div`）只清子节点、不动元素本身 → 监听器**只增不减**。SYN 侧因批量数量按钮一次点击触发两次渲染，累积更快。
    - 原烹饪侧的修法是"dataset 幂等标记"（只挂一次、不清除），但它只是"不再重复挂"，并没有真正清理，且方案本身不易理解。

### 14.2 采用的方案

-   **实时预览**：两侧产物详情都改为传**值提供者（函数）**，由提示窗在 `mouseenter` 时求值（`Tooltip.InitTip` 已支持函数值，见 `Tooltip.js`）。统一复用 tip_type `'formula_product'`（归类为物品展示）。
-   **每次渲染就地重建产物 div**：在**清空/初始化函数** `init_*_formula_Details_div` 里，用 `crtElement` 新建**同 id、同 class** 的 div，并用 `old.replaceWith(new)` **在同位置替换**（层级、顺序、样式均不变）。旧元素连同它的全部监听一起被丢弃 → **从根上消除叠加**，也就不需要任何"幂等标记"或"移除机制"。
    -   之所以放在 `init_*`（而不是挂在 tooltip 的 `updata_*_formula_Product_div`）：与项目里其余 16 处"先清空容器 → 再由渲染函数新建子元素并挂 tooltip"的写法保持一致，让 `init_*` 负责"详情区里有哪些元素"、`updata_*` 只负责"往里面填内容"。
    -   代价是一处**顺序依赖**：`init_*` 必须在其 `updata_*_formula_Product_div` 之前执行（现状已满足：二者都只被 `updata_*_formula_Details_div` 成对调用），已在两侧代码注释中写明。
-   因此 `init_*` 里原来那句对产物 div 的 `replaceChildren()` 被"整个重建"取代（只清内容无法丢弃元素上的监听）。
-   烹饪侧同步**去掉 dataset 幂等标记**，与 SYN 统一。

### 14.3 provider 行为（两侧对称）

| 情况                     | 行为                                       |
| ------------------------ | ------------------------------------------ |
| 未选定配方               | 静默返回 `null`（预期内）                  |
| 配方不在配方数据库       | console 告警 + 返回 `null`                 |
| **产物是工作台等非物品** | **console 信息** + 返回 `null`             |
| 产物物品不在物品数据库   | console 告警 + 返回 `null`                 |
| 正常物品产物             | 返回产物物品对象（烹饪侧含调味 `ex_data`） |

### 14.4 改动文件

-   `js/GameRun/live_plan/Material_handling/synthesis/synthesis.js`：新增 `get_now_formula()` getter（对齐烹饪）；`updata_SYN_formula_Details_div()` 增加"未选配方"显式守卫（见 14.5）。
-   `js/GameRun/live_plan/Material_handling/synthesis/SYN_function.js`：`init_SYN_formula_Details_div` 里改为**整个重建产物 div**；`updata_SYN_formula_Product_div` 只填内容 + 挂 provider；新增 provider `get_now_product_preview_obj()`。
-   `js/GameRun/live_plan/Material_handling/cooking/COK_function.js`：同上（并去掉 dataset 幂等标记）；provider 增补"工作台产物"console。
-   `js/GameRun/live_plan/Material_handling/cooking/cooking.js`：`updata_COK_formula_Details_div()` 增加"未选配方"显式守卫（见 14.5）。

### 14.5 附：配方详情渲染的"未选配方"显式守卫

**背景**：详情区在 DOM 构建时即为"可见"（`addElement` 的 `sty_display` 传空串被判假、从未设置），而 `check_show_*_formula_Details_div()` 只看 `style.display == ''`，`now_formula` 又不入存档 → 存在"详情可见但未选配方"的状态，此时渲染详情会读到 `formulas[undefined].material` 报错并中断游戏循环。

**此前为何没复现**：读档链最末端的 `place_manage.load_place_manage()` → `change_game_data()` → `live_plan_manage.set_new_place()` → 各技能 `set_new_place()`，其中烹饪/合成在"当前展示的正是自己"时会调 `delete_*_formula_Details_div()`，**顺带把详情隐藏了**，于是 `check_show_*()` 返回 false。即"不崩"依赖的是这条副作用。

**本次处理**：不再依赖副作用，在 `updata_COK_formula_Details_div()` / `updata_SYN_formula_Details_div()` 的 `COK_RS`/`SYN_RS` 早退之后加显式守卫：

```js
//展示配方详情的前提是已经选定了配方
//没有选定配方却走到这里属于异常：打印异常信息，并切回“未选择配方”的界面
if (is_Empty_Object(this.now_formula)) {
    console.log('展示%s的配方详情时，当前没有选定的配方，异常，切回未选择配方的界面', COK_min);
    delete_COK_formula_Details_div(COK_min);
    return;
}
```

**取舍说明**：未在 `check_show_*` 中加"已选配方"判断（那会改变"详情是否展示"的查询语义、影响调用方分支），而是把守卫放在**真正要渲染详情**的地方，并在异常时就地恢复正常界面。

---

## 15. 调料选择跨刷新保留 + 调料区显示/上限调整（2026-09-11 实施）

### 15.1 解决的问题

1. **切换批量数量会清空调料选择**：`updata_live_plan_div()` → `updata_COK_formula_Details_div()` → `init_COK_formula_Details_div()` 里的 `FD_S_value_div.replaceChildren()` 会删掉所有调料行，随后 `updata_COK_formula_Seasoning_div()` 以 `use_num=0` 重建。（制造后整屏刷新同理）
2. **`+` 按钮上限没算批量**：上限原本是"拥有量"本身，而实际扣量是 `n × 批量份数 m`，m>1 时可以选到必然做不出来的量。
3. **行文本口径**：一度改成"总量 `m×n / 拥有量`"，**随后按需求改回"单份"**（`（Xn）`），只表示"一份菜品上加几个"，并同步分区标题为 `单份菜品添加调料`。

### 15.2 采用的方案

**（1）显示改回"单份"口径，上限仍按批量**

> 注：2026-09-11 同日第二次调整——显示曾一度改为"总量 `m×n / 拥有量`"，随后按需求**改回"单份"**，并改成 `（Xn）` 的写法（见下表）。上限于当时**未回退**，仍按批量口径计算。

| 项                     | 说明                                                                                                                                                                 |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 行内 `dataset.use_num` | 存**每份剂量 n**（扣料与 `ex_data` 折算都用它）                                                                                                                      |
| 显示文本               | `名称（Xn）`，**只表示"一份菜品上加几个"**，例如 `鱼肉松（X2）`、未选为 `（X0）`；**不显示批量总量、也不显示拥有量**（批量与实际消耗的关系由"批量制造选择"按钮体现） |
| 分区标题               | `添加调料` → **`单份菜品添加调料`**                                                                                                                                  |
| `+` 上限               | `每份剂量上限 = floor(拥有量 / m)`，保证 `m×n ≤ 拥有量`；拥有量 < m 时上限为 0，`+` 禁用（**显示口径改回单份后上限仍保留批量口径**，以免选到"做不出来"的数量）       |
| 拥有量为 0             | **不建行**（背包里数量归零的 key 不会被删除，必须显式跳过）                                                                                                          |
| 同一调料 id 多 key     | 按 `item_id` **去重只建一行**，并对重复情况打 console                                                                                                                |

**（2）调料选择跨刷新保留（仅在"刷新链"生效）**

-   调料行的清空与重建都发生在 `updata_COK_formula_Details_div()`，而它有**两个入口**：
    -   入口 ①（刷新链）`updata_live_plan_div()`：批量数量、筛选、排序、切地点、**制造后整屏刷新**等；
    -   入口 ②（点左侧配方行）`COK_function.js` 的配方行 click → 直接调用详情刷新。
-   因此捕获点放在**入口 ①**：`updata_live_plan_div()` 在 `check_show_COK_formula_Details_div()` 为真时先 `get_COK_CD_seasoning()` 捕获，再作为参数传给 `updata_COK_formula_Details_div(previous_selection)` → `updata_COK_formula_Seasoning_div(previous_selection)`。
-   **入口 ② 不传参** ⇒ **切换配方即重新选择**（与"只在刷新链恢复"的设计意图一致），也避免了详情隐藏期间残留的"僵尸行"被误当作当前选择。
-   还原规则：按 `item_id` 匹配；`n = min(上次 n, floor(拥有量/m))`，**静默夹紧**（不提示、不打日志）；行已不存在（拥有量为 0）即自然归零。

**（3）顺带修正**："当前可制造"筛选原本固定按 1 份判断（`COK_function.js` 的 `check_now_COK_formula(formula_id, 1)`），改为按**当前批量数量**判断，与真实制造（含调料消耗）口径一致。

### 15.3 未改动

-   `check_now_COK_formula()` 自身的调料校验**无需改**：它本来就用 `n × m` 算总需求，与新显示/新上限口径一致。
-   行内 `dataset.use_num` 语义、`ex_data` 结构、存档结构均未改。
-   不涉及 SYN（调料只存在于 COK_CD）。

### 15.4 改动文件

-   `js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js`：`updata_COK_formula_Seasoning_div(previous_selection)` 重写（去重、跳过 0、还原夹紧、上限）；`updata_COK_seasoning_button_mask(...)` 第 4 个参数语义由"拥有量"改为"每份剂量上限"；新增文本 helper `get_seasoning_text(item_name, use_num)`（输出 `名称（Xn）`）。
-   `js/GameRun/live_plan/Material_handling/cooking/cooking.js`：`updata_live_plan_div()` 中捕获并透传；`updata_COK_formula_Details_div(previous_selection)` 新增可选参数并下传。
-   `js/GameRun/live_plan/Material_handling/cooking/COK_function.js`："当前可制造"筛选改用当前批量数量。
-   `js/Dom/Live_plan/Material_handling/cooking.js`：分区标题改为 `单份菜品添加调料`；"清空"按钮文本同步为 `名称（X0）`，`+` 是否启用按 `拥有量 >= 批量份数` 判断（上限为 0 时保持禁用）；构建期的 5 行占位样例文本同步为 `（X1）`。

---

## 16. 菜品 / 调料 buff 对接（2026-09-28 盘问会话）

> 性质：接续 §3 的 D1–D7，把「菜品 + 调料 → 数据库 buff + 实例额外属性」的对接方式定完。
> 前置事实（§13.3）：buff 系统 2026-09-24 完成运行层重构后，仍是**只能按 id 施加、施加时不能传参**；`get_buff` 效果行至今是未接通的桩。
> 本节的落地**跨越消耗品侧与 buff 核心两侧**（见 ADR-9）。
> 相关原始设定：`idea/idea5生活玩法设定.md` 烹饪系统 / 调味品的使用 / 烹饪的菜品的效果三节。

### 16.1 词汇表增补

| 词              | 含义                                                                                         |
| --------------- | -------------------------------------------------------------------------------------------- |
| 菜品本体效果    | 由菜品模板 `use_attr` 提供、与调料无关的那部分效果                                           |
| 菜品覆盖        | 特指**同 id 覆盖**（同一个菜只留后吃那份）；**不同菜品共存**                                 |
| 调料效果        | 由调料 `season_effect` 贡献、经调味固化进实例 `ex_data.bonus` 的效果                         |
| 即时类 / 限时类 | 即时类走 `get_attr` 直接结算；限时类走 buff                                                  |
| 施加传参        | `set_buff` 在施加时接受实例带来的时长与效果参数                                              |
| 调味配平        | 按小类份数定时长（取最大），并把所有调料效果的每秒数值按**总量守恒**重分布                   |
| 调料效果 buff   | 全局唯一一条 buff，id = `seasoning_effect`，显示名「调料效果」，承载一份菜的全部调料限时效果 |
| `dish_self`     | `get_buff` 行中 `buff_id` 的保留字，表示"并进这道菜的本体 buff"                              |
| 调味数          | `max(m_c)`，即份数最多的那个小类的份数；名称前缀与（将来的）变味规则共用此数                 |

### 16.2 本次定下的决策（D8–D18）

| 编号 | 决策                                                                                                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| D8   | **菜品本体 buff 的身份**：每个菜品在 buffs 表里有一条**静态**条目，**id 复用菜品 id**（如 `termite_mushroom_soup`）；同 id 覆盖、不同菜品共存                                                                 |
| D9   | **菜品本体 buff 的时长**：**菜品级统一**，不允许在 `use_attr` 行里逐行设置；唯一真源是该条目的 `time_value`                                                                                                   |
| D10  | **调料限时效果的承载**：全部装进唯一一条 `seasoning_effect`「调料效果」；一份菜内**不限调料种类**；**跨份只保留最后一次**（整体替换、时间刷满）                                                               |
| D11  | **调料即时效果**：`get_attr` 行写进 `bonus`，与模板归并时同 `attr_id` 相加（沿用现实现）                                                                                                                      |
| D12  | **`get_buff` 行字段**：`{ attr_type:'get_buff', use_ratio, attr_id, buff_id, buff_value }`，**取消 `buff_time`**（时长由"来源"决定，见 D9/D14）                                                               |
| D13  | **施加传参**：`set_buff(holder, buff_id, { time_value, effects })`；buff 运行实例需保存自定义参数、进存档并能还原                                                                                             |
| D14  | **调味配平**：见 §16.3-4（含公式与量化口径）；同 `attr_id` 的结果在写入 `bonus` 前合并为一行                                                                                                                  |
| D15  | **调料效果范围**：速率型与属性型**都支持**；属性型接受被配平摊薄成小数                                                                                                                                        |
| D16  | **效果行到 buff 效果行的映射**：按 `attr_id` 落在哪张表**自动判定**为主，调料数据可显式覆盖                                                                                                                   |
| D17  | **调料"加成菜品本身"**：行的 `buff_id` 写保留字 `dish_self` → 并进菜品本体 buff 的参数（时长跟本体、**不参与配平**）；其余行进「调料效果」                                                                    |
| D18  | **名称前缀**：`调味数 = max(m_c)`；0 = 原名、1–3 =「美味的」、4 =「重口味的」、5+ =「糟糕的」；前缀加在**物品名**与**菜品本体 buff 名**上，且**全部展示位置**生效；「调料效果」这条 buff 的名字固定、不加前缀 |

**改判记录**（接 §3）：

-   ④ idea5「重复调味品只加时间不堆叠效果」→ 不再需要独立规则，**由配平公式自动得出**（见 §16.3-4 性质一）。
-   ⑤ 菜品本体时长"逐行设置"→ 本会话中一度如此定，随后改判为**菜品级统一**（D9）。
-   ⑥ `get_buff` 行的 `buff_time`（§13.1 于 2026-09-10 定）→ **取消**（D12）。
-   ⑦ ADR-4「buff 类效果延后接通」→ 本次**纳入范围**（ADR-9）。
-   ⑧ 调料 buff 的承载粒度：曾在"按具体调料""按小类""全局一条"之间摇摆，最终定为**全局一条**（ADR-6）。

### 16.3 数据结构与样例

**（1）调料小类的基础时长**

挂在调料小类的定义处（落点按 `js/Data/Enum/Enum_item.js` 既有小类结构的实际形态确定）。例：精制调味料 `refined_seasoning = 10` 秒、辣味小类 `= 5` 秒。

**（2）`get_buff` 效果行（终态形态）**

```js
{ attr_type: 'get_buff', use_ratio: null,
  attr_id:    '<作用目标：资源键或属性键>',
  buff_id:    '<施加哪条 buff；或保留字 dish_self>',
  buff_value: <数值> }
```

-   与 `get_attr` 行的 `attr_id` **语义统一**（都是"作用于哪个目标"），修掉了 §13 批评过的"同字段不同含义"。
-   **没有 `buff_time`**：本体行的时长取自本体 buff 条目；调料行的时长由配平算出。

**（3）效果行 → buff 效果行的自动映射（D16）**

| `attr_id` 落在                                                                          | dispatch     | when       | revert  |
| --------------------------------------------------------------------------------------- | ------------ | ---------- | ------- |
| 资源键（`health_point` / `magic_point` / `surface_energy_point` / `deep_energy_point`） | `resource`   | `tick`     | `false` |
| 属性键（`data_attr.js` 分类字典内）                                                     | `attr`       | `on_apply` | `true`  |
| 两者都不在                                                                              | 告警，不施加 |            |         |

调料数据可显式声明覆盖（D16）。⚠️ 属性型走 `on_apply + revert`，会踩到 §16.5 的读档 bug。

**（4）调味配平公式（D14）**

```
设一份菜里，小类 c 下的具体调料 s（基准数值 v_s、份数 n_s）：

  m_c = Σ n_s                  该小类在这份菜里的总份数（= 调味数 max 的被取对象）
  T_c = base_c × m_c           base_c = 该小类的基础时长
  T   = max over c ( T_c )     ← 「调料效果」这条 buff 的时长

  每种具体调料的总量   Q_s = v_s × base_c × n_s
  配平后的数值         v'_s = Q_s / T
```

-   **性质一**：同一种调料放 n 份时 `v' ≡ v`（每秒数值不变、时间翻倍）——正是 idea5「只加时间不堆叠效果」。
-   **性质二**：恒有 `T ≥ T_c`，故 `v'_s ≤ v_s`：配平**只稀释、不放大**；加得越多整体越稀。
-   **量化**：`v'` 保留 1~2 位小数；**同一 `attr_id` 的多条结果在写入 `bonus` 前相加合并为一行**。
-   **不参与配平者**：`get_attr` 即时行；`buff_id = dish_self` 的本体行。

**（5）端到端样例**

设定：果酱（小类 `refined_seasoning`，`base = 10`）单独使用 = 每秒 +2 蓝；辣椒（辣味小类，`base = 5`）单独使用 = 攻击 +1。鸡枞汤本体 = 即时 +30 血、每秒 +1 血，本体时长 60 秒。

```js
// ── DB 侧 ─────────────────────────────────────────────────
// 菜品本体 buff：id 复用菜品 id，时长写在这里（D8/D9）
buffs['termite_mushroom_soup'].set_buff_data('game_time_buff', 60);

// 菜品模板 use_attr（不含 buff_time）
[ { attr_type:'get_attr', attr_id:'health_point', attr_value:30 },
  { attr_type:'get_buff', attr_id:'health_point', buff_id:'dish_self', buff_value:1 } ]

// 调料 season_effect
果酱：[ { attr_type:'get_buff', attr_id:'magic_point', buff_id:'seasoning_effect', buff_value:2 } ]
辣椒：[ { attr_type:'get_buff', attr_id:'attack',      buff_id:'seasoning_effect', buff_value:1 } ]

// ── 调味（做一份：果酱×1 + 辣椒×1）───────────────────────
m_果酱 = 1 → T_果酱 = 10 × 1 = 10         m_辣味 = 1 → T_辣味 = 5 × 1 = 5
T = max(10, 5) = 10

果酱： Q = 2 × 10 × 1 = 20 → v' = 20 / 10 = 2.0    每秒 +2 蓝
辣椒： Q = 1 ×  5 × 1 =  5 → v' =  5 / 10 = 0.5    攻击 +0.5（被摊薄）

// ── 固化的实例 ────────────────────────────────────────────
ex_data = {
  seasoning: { refined_seasoning: 1, spicy: 1 },    // 调味数 = max(1,1) = 1 →「美味的」
  bonus: [
    { attr_type:'get_buff', attr_id:'magic_point', buff_id:'seasoning_effect', buff_value:2.0 },
    { attr_type:'get_buff', attr_id:'attack',      buff_id:'seasoning_effect', buff_value:0.5 }
  ]
}

// ── 食用 ──────────────────────────────────────────────────
模板 dish_self 行 → set_buff(holder, 'termite_mushroom_soup',
                        { time_value: 60, effects: [ tick resource health_point 1 ] })

bonus 两行        → set_buff(holder, 'seasoning_effect',
                        { time_value: 10, effects: [ tick     resource magic_point 2.0,
                                                    on_apply attr     attack      0.5  (revert) ] })

→ buff 栏：『美味的鸡枞汤』60 秒 + 『调料效果』10 秒，共 2 条
```

### 16.4 需改动文件清单（候选；实现前须按 AGENTS.md 先出中文计划并经确认）

**buff 侧（本次新增范围，见 ADR-9）**

-   `js/GameRun/buff_manage.js`：`set_buff` 增加第三参数（施加传参）；`apply_buff_effects` 支持"效果行由实例带入"
-   `js/Player/Player_buff.js`：运行实例保存自定义 `time_value` / `effects`；`load_init` 还原自定义参数；**修 `on_apply` 读档丢失 + 删除时反向加回的 bug**
-   `js/Data/Buff/Buff_class.js` / `Buff.js`：条目可只声明身份与计时规则（effects 由施加时带入）
-   数据补充：**每个菜品一条本体 buff 条目**（D8）、**`seasoning_effect` 条目**（D10）
-   展示层：buff 栏与 buff tooltip 显示**实际值**与名称前缀（D18）

**消耗品 / 烹饪侧**

-   `js/Data/Enum/Enum_item.js`（或调料小类定义处）：**调料小类基础时长**字段（§16.3-1）
-   `js/Data/Item/Item_class.js`：`add_use_attr` / `add_season_effect` 的 `get_buff` 字段调整（去 `buff_time`、加 `buff_id`）
-   `js/Data/Item/Consumable.js`：三种调料补 `buff_id`；白板菜品补基础 `use_attr`
-   `js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js`：`get_COK_CD_seasoning_ex_data()` 实现**配平 + dish_self 分流 + 同 target 合并**
-   `js/GameRun/consumable_manage.js`：`get_consumable_use_data()` 的 `get_buff` 分支接通（→ `set_buff` 传参）
-   `js/Function/Function.js`：`get_merge_use_attr()` 对 `get_buff` 行的处理口径

**展示层**

-   `js/Dom/Tooltip/item_tip.js` 与 `js/Data/Text/Text_item/*`：名称前缀、调味情况（`seasoning`）、总加成（`bonus`）、buff 行
-   背包格 / buff 栏 / buff tooltip：名称前缀与**实例化名称**（不能再直接读静态 `texts[id]`）
-   烹饪产物预览 provider：产物名称与效果预览带上配平结果

### 16.5 依赖与风险

1. **`on_apply` 读档 bug（实测）**：属性加成（`on_apply` + `revert`）施加后存档再读档会**丢失加成**，随后删除该 buff 还会**反向加回**（实测 `-20 → 0 → +20`）。D15 允许属性型调料 ⇒ **必须先修**。
2. **自定义参数存档还原**：`load_init` 目前不恢复 `data_value` / `time_value`；不修则 M1（施加传参）拿到的"60 秒 / 每秒 2 点"在读档后会被打回数据库默认值。
3. **`target_dispatch` 是容器 `init()` 时的快照**：新 target 必须先重跑 `init_target_dispatch()`，否则效果**静默不生效**（实测）。
4. **buff id 必须静态存在于 `buffs` 表**：否则读档抛 `SyntaxError`（实测）。→ 菜品本体 buff 与 `seasoning_effect` 都必须是静态条目。
5. **名称前缀需要实例级取名**：同 id 不同调味的菜品名称不同，展示层不能再直接读静态文本。
6. **前缀与变味规则必须共用同一个数**（`max(m_c)`）：否则会出现"名字写着糟糕的、效果却完全正常"的打脸状态。
7. **存档兼容**：旧存档的菜品实例无 `ex_data` → 优雅降级为白板（沿用 §11）。
8. 改 buff 核心后须跑 `_devtools/buff_check/` 三个脚本，且**新逻辑不在现有断言覆盖内，需补断言**。

### 16.6 本设计明确延后

-   **变味规则 / 调味次数上限**（数值规则；判定数已定为 `max(m_c)`）——仍待办
-   **二次调味（COK_DS）**——仍待办；若要做，必须先解决"实例内记录各具体调料的累计份数"（现 `ex_data.seasoning` 只记小类）
-   **白板菜品 `use_attr` 补全**、**调料产出途径**（内容层，与机制解耦）
-   干制品与其他"有内容消耗品"的扩类

---

## 17. 实施记录：get_buff 接通 + 第一道有效果的菜（2026-09-29）

> 本节记录**已落地**的改动，是 §16 设计的第一次落地。性质同 §13–§15：实施记录，不是规划。

### 17.1 已实施

**（1）最小机制：消耗品的 `get_buff` 效果行真正接通**

| 文件 | 改动 |
|---|---|
| `js/GameRun/buff_manage.js` | `set_buff(buff_holder, id, runtime_data)` 新增**可选**第三参数，透传给实例工厂 |
| `js/Player/Player_buff.js` | ① `init()` 改用 `this.time_value`（原为 `buffs[this.id].time_value`，行为等价，但这是"施加传参"能生效的前提）；② `create_buff_instance(id, runtime_data)` 应用自定义时长/效果行、补 `start_flag`/`start_data`，并**补登记 `target_dispatch`** |
| `js/GameRun/consumable_manage.js` | ① 新增 `get_buff_effect_by_use_attr()`：效果行 → buff 效果行的**自动判定**（可用 `buff_dispatch` 显式覆盖）；② `get_buff` 分支真正施加（原为打日志跳过）；③ `use_once_use_consumable` 里同 `buff_id` 的多行**先聚合再施加**（否则后一行会把前一行整条替换掉） |
| `js/Data/Item/Item_class.js` | `add_use_attr` / `add_season_effect` 的 `get_buff` 分支字段由 `buff_time` 改为 `buff_id`（= §16 D12） |

⚠️ **实现时踩到的坑（后续必看）**：`target_dispatch` 是 `init_target_dispatch()` 从**静态 buff 表**汇总出来的快照，而传参带来的效果行**不在静态表里**。不补登记，这些效果会打「XX效果没有定义生效方式」并**静默失效**（不报错、不崩）。
这对"每菜一条本体 buff、效果由实例带入"的设计是**必经之路**，`create_buff_instance` 里已补登记。

**（2）第一道有效果的菜：烤鱼串**

| 文件 | 改动 |
|---|---|
| `js/Data/Buff/Buff_dish.js` | **新增**：菜品 buff 数据文件，写「烤鱼串」（30 秒 / 每秒回血 1） |
| `js/Data/Buff/Buff.js` | import 并调用 `init_dish_buff(buffs)` |
| `js/Data/Text/Text_buff.js` | 新增 `dish_buff(texts)`，写 `buff_name` / `buff_desc`；与物品文本同 id，**已存在时只补字段、不重复创建**（否则启动会打"已有同名对象"告警） |
| `js/Data/Item/Consumable.js` | 烤鱼串增加一行 `get_buff` 效果：立刻回血 10 + 每秒回血 1（总量 40） |

**验证**：`_devtools/dish_check/run_check.mjs`（新增，34 条断言）+ 既有 `run_check`(133) / `run_check_real`(53) / `data_check` 全绿。

**（3）内容铺开：其余 6 道菜 + 3 个干制品（2026-09-29 第二批）**

| 成品 | 即时恢复 | 持续恢复 | 总恢复 |
|---|---|---|---|
| 熟蚌肉 | 血 +8 | 血 0.5/秒 × 20 秒 | 18 |
| 烤螃蟹 | 血 +10 | 血 0.5/秒 × 30 秒 | 25 |
| 烤蘑菇 | 血 +10 | 血 1/秒 × 20 秒 | 30 |
| 烤鱼串 | 血 +10 | 血 1/秒 × 30 秒 | 40 |
| 熟兽肉 | 血 +12 | 血 1/秒 × 30 秒 | 42 |
| 大烤鱼串 | 血 +15 | 血 1/秒 × 40 秒 | 55 |
| 鸡枞汤 | 血 +30 | 血 1/秒 × 60 秒 | 90 |
| 浆果果干 | 血 +15、精力 +10 | 无（干制品不给持续恢复） | 25 |
| 鱼肉干 | 血 +20、魔力 +5 | 无 | 25 |
| 兽肉干 | 血 +20、精力 +15 | 无 | 35 |

涉及文件：`Buff_dish.js`（+6 条 buff）、`Text_buff.js`（+6 条 buff 文本）、`Consumable.js`（9 个成品补效果行，并补上此前缺失的 `init_Consumable('once_use')`）。
**数值为初版梯度，可整体重调。**

**效果**：`data_check` 的「食品/干制品/食材没有任何效果」整类清零；「不可主动使用的消耗品」由 13 条降到 4 条（3 种调料 + 木箭，均属本就不可直接使用）。

**（4）烹饪配方：6 道菜（2026-09-29 第三批）**

| 产物 | 材料 | 数量 |
|---|---|---|
| 大烤鱼串 | 溪鱼 `creek_fish` | 3 |
| 烤螃蟹 | 河蟹 `river_crab` | 1 |
| 熟蚌肉 | 河蚌 `river_mussel` | 1 |
| 熟兽肉 | 野兽生肉 `animal_raw_meat` | 2 |
| 烤蘑菇 | 任意蘑菇 `all_mushroom` | 2 |
| 鸡枞汤 | 鸡枞 `termite_mushroom` | 3 |

全部挂 `carpentry_bench` 1 级、`initial_flag=true`（开局学会），与既有 `COK_grilled_fish_1` 完全一致。
**为什么不用烹饪自己的工作台**：篝火 / 晾晒装置 / 调味工具**全地图恒 0 级且等级不存档**（`cooking.js:224-229` 初始化 + `:44-53` 存档函数为空），任何要求它们 ≥1 级的配方玩家永远做不出来；而木匠台每个地点恒 1 级（`synthesis.js:232-240`），是唯一稳定达标的选择。
**食材可获得性**：上述材料全部已有获取途径（钓鱼 / 采集 / 敌人掉落），无一缺失。
**效果**：配方数 21 → 27；`data_check` 的「成品没有配方产出」由 12 条降到 6 条。

**（5）调味配平（2026-09-29 第四批）**

按 §16 D14 实现配平，并补齐它依赖的三样数据：

| 文件 | 改动 |
|---|---|
| `js/Data/Enum/Enum_item.js` | 新增 `enums['seasoning_base_time']`（调料小类基础时长，先只有 `refined_seasoning: 10` 秒） |
| `js/Data/Buff/Buff_dish.js` | 新增全局唯一的「调料效果」buff（id `seasoning_effect`）：时长与效果行由食用时传入，条目里的值只是占位 |
| `js/Data/Text/Text_buff.js` | 「调料效果」的名字与描述 |
| `js/Data/Item/Consumable.js` | 3 种调料各增加一条 `get_buff` 限时效果（每秒 2 点：蓝 / 精力 / 血） |
| `js/GameRun/.../COK_cooking_dishes.js` | 折算逻辑抽成**纯函数** `get_seasoning_ex_data_by_arr(seasoning_arr)`（不读界面、可直接验证），在其内实现配平 |
| `js/GameRun/consumable_manage.js` | 施加时若效果行自带 `buff_time` 就用它（调料走配平结果），否则用 buff 条目默认值（本体走条目） |

**关于 `buff_time` 字段（对 §16 D12 的细化）**：D12 原写"取消 `buff_time`"，理由是"行里手写时长会与本体 buff 条目打架"。但配平算出的 `T` 是**运行时结果**，必须随效果行带入实例，否则食用时不知道持续多久。因此字段保留、语义收窄为「运行时决定的时长」：**作者手写的本体行不填它**（时长取自本体 buff 条目），**由程序填的调料行填它**（时长取自配平）。施加端只有一条规则：行里有就用、没有就回落条目默认。

**验证结果**（`dish_check` 用例 10 / 11，纯函数 + 端到端）：
- 单份果酱 → 时长 10 秒、每秒 2（未被稀释）
- **两份果酱 → 时长 20 秒、每秒仍是 2** —— 即 idea5「重复调味品只加时间不堆叠效果」，**由配平公式自动得出，无需专门规则**
- 跨小类 → 整块时长取最大值；辣椒（基础 5 秒）的攻击加成被稀释到 0.5
- 端到端：吃一份「烤鱼串 + 2 份果酱」，本体 buff（30 秒）与调料 buff（20 秒）**两条独立共存**，1 秒内共回 23 点（本体即时 10 + 调料即时 10 + 本体每秒 1 + 调料每秒 2）

**（6）名称前缀（2026-09-29 第五批）**

按 §16 D18 实现「调味数 → 名称前缀」，并把前缀接到展示层。

| 文件 | 改动 |
|---|---|
| `js/Function/Function.js` | 新增 `get_seasoning_name_prefix(ex_data)`（调味数 = `max(m_c)`：0→无、1~3→美味的、4→重口味的、5+→糟糕的）与 `get_item_show_name(item_obj)`（前缀 + 模板名） |
| `js/Dom/Tooltip/item_tip.js` | 物品名改用 `get_item_show_name(item_obj)` —— **一处即覆盖背包 / 商店 / 回购 / 烹饪产物预览的全部 tooltip** |
| `js/Player/Player_backpack.js` | 背包格 ×2（普通模式 + 商店地点的待出售模式） |
| `js/GameRun/global_flag/game_log_status.js` | 「获得了 N 个 X」日志 |
| `js/GameRun/buff_manage.js` | buff 栏文本改读**实例**的 name（原读数据库模板） |
| `js/Dom/Tooltip/buff_tip.js` | buff 提示窗同上 |
| `js/GameRun/consumable_manage.js` + `js/Player/Player_buff.js` | 施加时把前缀随「施加传参」带进 buff 实例（`runtime_data.name_prefix`）；**只有 id 与菜品相同的"菜品本体 buff"才加**，「调料效果」不加 |
| store 4 个文件 5 处 | 商店货架 / 待出售 / 待购买 / 回购 ×2（预防性：商店目前不卖调味菜，前缀恒为空） |

**明确未改**（它们**只有模板 id、拿不到实例**，想加也加不了）：图鉴（按 id 一份）、掉落与采集预览表、合成制造全线、配方材料名、装备栏、使用中消耗品文本（`sustain_use` 被 `check_Consumable` 禁止带 ex_data）。

**已知遗留**：buff 的前缀与配平时长**读档会丢**（`load_init` 只还原剩余时间 / 层数 / 效果行标记，不还原 `name` / `time_value`）——本次按决定不修，与 §16.5-2 是同一条。

**验证**：`dish_check` 新增用例 12（前缀四个分支 + 实例取名全分支），并在用例 11 加断言「本体 buff 名为『美味的烤鱼串』、调料 buff 仍为『调料效果』」，合计 58 条断言全绿。

**（7）存读档修复（2026-09-29 第六批）**

**问题根因**：`save_buff` 其实把整个 buff 实例都存了（含 `name` / `time_value` / `effects`），但 `load_buff` **不是还原实例，而是"按 id 从数据库重建一个模板实例，再用存档贴回剩余时间与层数"**（`new game_time_BUFF(id)` + `load_init`）。在"施加时传参"出现之前，模板与实例必然一致，所以这个写法一直没暴露问题；菜品 / 调料把效果行实例化之后，读档就会拿模板的**占位值**覆盖真实效果。

**修复方式**（与用户确认的方案）：

| 改动 | 位置 | 内容 |
|---|---|---|
| ① 打标记 | `Player_buff.js` `create_buff_instance` | 带 `runtime_data` 施加的 buff 记一个 `from_runtime_data = true` |
| ② 读档丢弃 | `Player_buff.js` `load_buff` | 存档里带该标记的 buff **不恢复**（按"持续时间已结束"处理）。因为 `load_buff` 开头的 `reset_buff` 已把它的贡献撤销干净，不会留下残留 |
| ③ 账本重建 | `Player_buff.js` `load_init` | **删除**原本"照搬存档中效果行 `start_flag` / `start_data`"的那段。累加器不进存档、且已被 `reset_buff` 清零，所以让 `on_apply` / `revert` 效果在下一帧**重新生效一次**（构造器已把 `start_flag` 置 false），账才能重建正确 |

**为什么选"丢弃"而不是"完整还原"**：这类 buff 的效果行只存在于实例上，数据库里那份是对不上的占位值。硬还原等于再引入一套"实例效果行"的序列化与旧存档兼容逻辑，而且会产出**"看着还在、数值却是错的"**的 buff —— 那比消失更危险。语义上也说得通：它们代表"刚吃下去的食物效果"，读档相当于隔了一段时间，劲儿过去了。

**验证**（`dish_check` 用例 13）：
- 运行时效果 buff 读档后消失；普通 buff（`burn`）被保留且剩余时间正确
- `fatigue`（infinite + `on_apply` + `revert`）读档后累加器**从 -20 正确重建为 -20**（不再丢失），删除后归零（**不再反向加回**）

### 17.2 本次明确未做（待办，按优先级）

1. ~~**提示窗不显示持续效果**~~ → **已于 2026-09-29 修复，见 §17.3**。原现象：`js/Dom/Tooltip/item_tip.js` 的 `use_type == 'once_use'` 分支（约 L358–373）只渲染 `get_attr` 行，`get_buff` 行被静默跳过 —— 烤鱼串的提示窗因此只显示"生命 +10"。
2. ~~**满血时带 buff 的菜也吃不了**~~ → **已于 2026-09-29 修复，见 §17.3**。原行为：`check_consumable_can_use()` 只看模板 `use_attr` 里的 `get_attr` 行（任一目标满值即整份禁用，一票否决），且**完全不看** `ex_data.bonus`。
3. ~~**施加时传入的自定义参数不进存档**~~ → **已于 2026-09-29 以设计方式解决**（见 §17.1（7））：这类 buff 的效果无法从数据库模板重建，读档时**按"持续时间已结束"处理**，直接不恢复。
4. ~~**`on_apply` 属性加成读档 bug**~~ → **已于 2026-09-29 修复**（见 §17.1（7））：改为读档后让 `on_apply` / `revert` 效果重新生效一次，把累加器的账重建正确。
5. **烹饪技能没有解锁途径**（2026-09-29 发现）：`GS_unlock_COK` 默认 `false`（`Enum_game_flag.js:38`），全仓**只有开发者调试菜单** `js/Dom/Game_log_test.js:409` 能打开它；其他生活技能都有正规解锁（合成制造 / 采集 / 伐木 = 迷你事件，钓鱼 / 挖矿 = 支线奖励），唯独烹饪没有。→ **正常游玩看不到烹饪界面**（`Place_manage.js:428` 用 `GS_unlock_*` 控制技能按钮显隐）。本批配方因此只能靠调试菜单验证。
6. **烹饪工作台全地图恒 0 级且等级不存档**：`bonfire` / `drying_device` / `seasoning_tool` 既无升级配方也无事件（`Enum_live_plan.js:105` 只登记了 id）；`cooking.js:224-229` 每次进入新地点都把三者重置为 0，且 `save/load_cooking_manage` 是空的（`:44-53`）→ 即使改了也会在读档后回 0。要做真正的烹饪工作台，需要：升级配方（`set_formula_product('bonfire', N)`，`Formula_class.js:113-130` 已认这些 id）+ 补烹饪侧存档 + 相应的获取事件。
7. **干制品与调味料子功能是空壳**：`COK_make_dry_product.js` / `COK_make_seasonings.js` 各只有 6 行占位函数，`cooking.js:167-178` 的调用分支被注释，`GS_unlock_COK_MD/MS` 默认 false → 干制品 / 调味料配方目前**无处安放**（本批因此未做）。
8. §16.6 列出的其余各项：二次调味、变味规则（**调味配平见 §17.1（5）、名称前缀见 §17.1（6）**）。

### 17.3 体验补完（2026-09-29，同批次）

| 文件 | 改动 |
|---|---|
| `js/Dom/Tooltip/item_tip.js` | `use_type == 'once_use'` 分支拆成**两块**：**立即效果**（`get_attr`，仍用 `page_table_111` 表格、不加标题）与**给予 buff 的效果**（`get_buff`，单独成块）。buff 块 = `lable_up` 标题行（自带一条上分割线）+ **一段逐条文本**（`lable_down` + `<br>` 换行）——**与装备的"非常规属性"同一种写法**（参照 `show_equipment_attr`），不用表格。标题文本为 `获得持续X的buff`（整块只有一种时长时 X 填具体值，如「30秒」；多种时长混在一起时退化为「获得持续buff」，此时时长改在每行末尾以「，持续T」补出）。行文本形如 `生命：每秒+1`（资源型）/ `攻击：+5`（属性型），数值直接用 `get_table_attr_value_ch()`（自带正负号与 %/秒 后缀）。时长取自 `buffs[buff_id].time_value`（与生效口径一致），用 `seconds_time_to_ch()` 转文本，`infinite` 显示「无限」。**未新增任何 CSS**，全部复用现有 class（`lable_up` / `lable_down` / `page_table_111` / `table_value` / `TLV_left` / `TLV_right`） |
| `js/GameRun/consumable_manage.js` | `check_consumable_can_use()` 的 `once_use` 分支：改为先归并 `use_attr ∪ ex_data.bonus` 再判定；**只要带 `get_buff` 行就允许使用**（满血不再拦），没带 buff 行的保持原行为不变 |

验证：`dish_check` 新增用例 8（满血可用 + "摘掉 buff 行后满血仍不可用"的反例），共 30 条断言全绿。
提示窗那部分是纯 DOM 渲染，**无头脚本覆盖不到，需人工在浏览器确认**。

---

_End of planning doc. 状态：§1–§12 为规划；§13–§15、**§17 为实施记录**；**§16 为设计规划，已部分实现（见 §17）**；§16.6 与 §17.2 为待办。_
