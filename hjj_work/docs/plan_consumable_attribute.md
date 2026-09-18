# 消耗品「调味 / 实例属性」框架规划稿

> 性质：给**下一会话**看的**实现前置规划**。本稿只做**定义与规划**，不做任何实现。
> 对应 `docs/roadmap.md` #4「消耗品的独特属性数据结构」（目标原文：*保存菜品的调料属性和调料使用情况*；验收：*消耗品能携带并保存其独特属性，存档读档后不丢失*）。
> 生成方式：grill-with-docs 盘问会话（2026-09-09）逐轮收敛所得。

---

## 0. 目的与读者

- **读者**：下一个接手的会话（会读本稿后，按 AGENTS.md 流程先中文计划、经确认再改基线代码）。
- **本文交付深度**：数据 schema + 字段定义 + 需改动文件清单 + 实现顺序。
- **本次会话产出物边界**：只定义「如何定义与如何规划」，不触碰 `everything_with_me_idle/` 任何代码（基线只读）。

---

## 1. 领域词汇表（本会话固化的统一术语）

> 术语有歧义处，以下列为准。词汇随实现推进可能再增。

| 词 | 含义 | 出处/备注 |
|---|---|---|
| 消耗品 consumable | 一次性/按需使用、使用后消失或消耗的物品；`main_type='consumable'` | 现有 |
| 有内容消耗品 | 靠"制作/自定义"产生**实例内容**的消耗品，需按实例区分。首批=**菜品** | 本稿提出 |
| 白板菜品 | 未调味的菜品；只有模板基础效果 | 设计沿用 idea5「制式(白板)」 |
| 调味料 / 调料 seasoning | 一种"作为调料用"的消耗品；加入菜品会贡献属性。现有小类 `refined_seasoning` | 从材料迁入消耗品（见 §3 D3） |
| 调料小类 | 调料所属的消耗品小类（现仅 `refined_seasoning`，未来会增多种） | 记录口径用"小类" |
| 调味品情况 / 用量记录 | 一份菜品实例记录"用了哪些调料**小类**、各几次" | 实例 `ex_data.seasoning` |
| 调味后总加成 bonus | 调味那一刻算好并固化在实例上的**效果行集合**（食用/展示的真源） | 实例 `ex_data.bonus` |
| 调料的调味字段 | 每条**具体调料**在数据库里带一个"作为调料才有"的字段，声明它加入菜品时贡献的效果行 | DB 侧，本稿新增字段 |
| 模板效果 use_attr | 物品模板自带的食用效果行（白板基础） | 现有 `use_attr` |
| 实例 ex_data | 背包里每个物品实例的"使用时额外属性"容器 | 现有 `item_class.ex_data`（见 §2 关键结论） |
| 复合背包 key | `id:hash`；hash 由实例独特属性算出 → **内容(ex_data)相同则合堆、不同则分堆** | 现有 `get_item_id_key` |
| 同 id 不同属性 | 同一物品 id，不同实例属性/加成不同 | idea3「复合 id 方案」，装备=稀有度先例 |
| 效果行 | 结算单元，按类型用**具名字段**（见 §13）：`get_attr`→`attr_value`；`get_buff`→`buff_time`+`buff_value`；`get_item`→`item_num`；`get_formula`→无值字段。公共字段：`attr_type`、`use_ratio`、`attr_id` | 现有 `use_attr` 元素形态（2026-09-10 由 `attr_value1..3` 改革而来） |

---

## 2. 现状关键结论（只读调研，供下会话参考，勿改）

- **代码里已有预留缝，未落地**：
  - `item_class`（`Player_backpack.js`）消耗品已留 `use_ratio`(使用进度) + `ex_data`(使用时额外属性) 字段。
  - `get_item_obj(id, num, use_ratio, ex_data)` 已接受消耗品 ex_data 参数；`get_item_id_key()` 已把 `use_ratio + JSON.stringify(ex_data)` 哈希拼成复合背包 key（装备=稀有度同款机制，即 idea3 方案1 落地）。
  - `Function.js check_Consumable` 已对 ex_data 做基础校验。
  - 背包存档 `save_Player_backpack()` 整存 `backpack_items` → **实例自带数据天然进存档**。→ 因此本框架**无需新增存档字段**。
- **烹饪侧**：`COK_cooking_dishes.js` 的"添加调料"UI 已能把选择暂存并返回 `[{id, num}]`（`get_COK_CD_seasoning()`），但**无人把它写进产物实例**；`COK_MS(制调味品)/COK_DS(菜品调味)/COK_MD(干制品)/COK_EN` 多为空壳。
- **现菜品/干制品数据**：food 小类 6 项、dry_product 3 项**只填了 id/堆叠/价格，`use_attr` 全空**（模板半成品，需在实现时补基础效果）。
- **现调料实物**：材料大类下有 `fish_meat_floss 鱼肉松 / animal_meat_floss 兽肉松 / berry_jam 浆果果酱`，`refined_seasoning` 小类(270)；`elixir_essence 丹药精华` 小类(271) 也在材料大类。
- **领域设定来源**（素材级，未落码）：`idea/idea5生活玩法设定.md` 烹饪/调味（单调料超 3 次变味、需记属性+用量、调味范围只限菜品）；`idea/idea3.md` 小类矩阵与"同 id 不同属性"复合 id 方案。

---

## 3. 本次盘问定下的设计决策（含改判记录）

- **D1 载体**：实例独特属性放在现有 `item_class.ex_data`（**不新增独立字段、不新增存档字段**）。
- **D2 实例存两样**：`ex_data = { seasoning(调味品情况), bonus(调味后总加成) }`（**用量记录 + 总加成缓存都要**；见改判④）。
- **D3 类别归属搬迁**：把现有放在**材料大类**下的
  - **`refined_seasoning` 精制调味料**、以及
  - **`elixir_essence` 丹药精华**
  迁入**消耗品大类**（成为消耗品小类/条目）。以后消耗品下会新增多种"调料小类"。丹药精华**本期只搬迁、不处理其内容**。
- **D4 记录口径**：菜品实例只记录**调料小类 + 次数**（不记具体调料 id）——用于展示/追溯；不影响效果，因为效果已固化（见 D6/D2）。
- **D5 效果真源在 DB（调料侧）**：每种**具体调料**在数据库带一个"作为调料才有的字段"，声明它加入菜品时贡献的效果行。**同小类的不同具体调料贡献不同**，因此必须在"调味那一刻"用该字段算出贡献并固化（不可事后靠 id 重推——实例里不记具体 id）。
- **D6 效果接入**：食用结算 = **模板白板 `use_attr` ∪ 实例 `ex_data.bonus`**，归并后一次性交给 `consumable_manage` 结算器执行。
- **D7 buff 类效果延后**：调味贡献若含"每秒/持续恢复"等 **buff** 语义，本期只**定义接口/占位**（`get_buff` 预留），真正接通放到 buff 系统升级（roadmap #1）之后；本期用 `get_attr` 类即时效果验证链路。
- **改判记录**：
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
- 模板白板（DB）：`use_attr=[ {get_attr,health_point,30}, {get_attr,surface_energy_point,10} ]`
- 调味时用了"精制调味料"3 次（具体含鱼肉松×2、果酱×1，贡献各不相同，调味时已算入 bonus）：
  ```js
  ex_data = {
    seasoning: { refined_seasoning: 3 },
    bonus: [ { get_attr, magic_point, 5 }, { get_buff, regen_health, ... } ] // 数值/字段待领域定
  }
  ```

---

## 5. 调料数据模型（DB 侧，迁入消耗品后）

- 每个**具体调料**条目新增一个"作为调料才有的字段"，表达它贡献给菜品的效果行（形状建议与效果行同构，可多条）。
- 值随具体调料不同（同小类不同 → 字段不同）。
- 该字段在**调味时**被读取：把被选调料按其字段 × 使用次数 折算后，累加进产物菜品的 `ex_data.bonus`；同时把"小类→次数"写进 `ex_data.seasoning`。
- 调味流程（生产侧）：`COK_CD`（或将来的 `COK_DS`）选料 → `get_COK_CD_seasoning()=[{id,num}]` → 对每个 id 读其 DB 调味字段折算 → 写入产出实例 ex_data。
- 细节（是否按次数线性、是否受"变味/上限"约束）见 §10 遗留。

---

## 6. 食用效果结算规则

- 触发：`consumable_manage` 使用一次/持续完成的菜品。
- 归并：`效果清单 = 模板 items[id].use_attr ∪ 实例 item_obj.ex_data.bonus`。
- 执行：一次性交给 `get_consumable_use_data` 逐条结算（`get_attr` 已实现；`get_buff`/`get_item` 为占位，本期不动其实现，仅保证 bonus 里出现这类时**不崩、可识别、日志清晰**）。
- 去重/叠放规则：模板与 bonus 同 attr_id 是否合并相加，属 §10 待下阶段定的数值细节（本稿先标规则需定义）。

---

## 7. 需改动 / 新增文件清单（按层分组，供实现会话逐条出中文计划）

> 全部为**规划候选**；真正改哪条、怎么改，须下一会话按 AGENTS.md 先计划、经你确认。

- **Data（类别搬迁 + 内容/模板）**
  - `js/Data/Enum/Enum_item.js`：`refined_seasoning`、`elixir_essence` 归属从材料→消耗品的枚举整理（`secon_type_sort`、各 `*_secon_type` 分组依赖 `Data.js` 动态收集，需核对）。
  - `js/Data/Item/Material.js`：把精制调味料、丹药精华的条目声明**移出**。
  - `js/Data/Item/Consumable.js`：接收上述条目为消耗品；为 food/dry_product 白板补基础 `use_attr`；为各调料条目新增"调味字段"。
  - `js/Data/Item/Item_class.js`：Consumable 类若需新增调味字段的 setter / bonus 结构辅助（最小化）。
  - `js/Data/Data.js`（若受类别变动影响的小类自动收集逻辑需核对）。
- **Player / 背包**
  - `js/Player/Player_backpack.js`：确认/完善 ex_data 实例的入包、叠堆逻辑——**同 ex_data（同 key）合堆、异 ex_data 分堆**，沿用 `maxStack` 上限，不强设 maxStack=1。
  - `js/Function/Function.js`：`get_item_obj`/`get_item_id_key`/`check_Consumable` 对结构化 ex_data（seasoning+bonus）的哈希与校验适配。
- **GameRun（结算 + 调味生产）**
  - `js/GameRun/consumable_manage.js`：结算改为"模板 ∪ ex_data.bonus"归并。
  - `js/GameRun/live_plan/Material_handling/cooking/cooking.js` 与 `COK_cooking_dishes.js`：把已选调料折算写入产出菜品 ex_data（生产侧落点）。
- **Dom / 文本（展示）**
  - `js/Dom/Tooltip/item_tip.js` + `js/Data/Text/Text_item/*`：tooltip 展示"调味品情况 + 总加成"（文本命名约定）。
- **存档**：预计**无需改动**（整存实例）；实现时以"调味菜存取档读档不丢"自测为准。

---

## 8. 实现顺序（最小可用垂直切片 → 扩展）

1. **Step 1 类别搬迁**：调料与丹药精华迁入消耗品，先不接效果（含 all_seasoning / 枚举 / 文本归位），跑通显示。
2. **Step 2 数据结构**：定义 ex_data(seasoning+bonus) 结构化字段 + 校验 + key 哈希适配；能手工造一个"带 ex_data 的调味菜"实例并独立入包。
3. **Step 3 结算**：consumable_manage 归并模板∪bonus 结算（先只 get_attr 即时类，验证链路）。
4. **Step 4 生产**：把 COK_CD 所选调料折算写入产物 ex_data（真正产出"已调味菜"）。
5. **Step 5 展示**：tooltip/文本显示调味品情况与总加成。
6. **Step 6 兼容与自测**：存量无 ex_data 菜品的读档兼容；新建调味菜 → 存档 → 读档 → 校验不丢。
7. （buff/每秒效果真正接通、变味规则等 → §10 下阶段）

> 每步都先按 AGENTS.md 给"文件路径+改动+影响"的中文计划并经你确认；建议动手前 `git init && git add -A && commit`（基线保护）。

---

## 9. 归档：ADR（难反悔取舍：背景→决策→理由→后果）

- **ADR-1 实例容器用 ex_data**：背景：需要"同 id 不同属性"且存档持久。决策：扩展现有 `item_class.ex_data`，不新增字段/不新增存档结构。理由：key 哈希、整存存档已天然支持，改动最小、无迁移。后果：ex_data 语义需被约束为"调味品情况+bonus"，避免被别处滥用。
- **ADR-2 效果真源在调料 DB + 总加成固化在实例**：背景：调味后效果需稳定持久，且实例不记具体调料 id。决策：每种具体调料 DB 带调味字段；调味时算好 `ex_data.bonus` 固化。理由：只记小类无法事后重推不同调料差异 → 必须在写入瞬间固化。后果：一次调味=一次折算写入；改动配方/调料数值不会追溯影响已产出菜品。
- **ADR-3 复合背包 key / 按内容叠堆**：背包 key = `id:hash(ex_data)`。**调味结果相同(ex_data 相同)→同 key→合堆**；不同→分堆。不强设 maxStack=1，沿用 maxStack 上限。沿用现成机制，风险低。
- **ADR-4 buff 类效果延后接通**：背景：调料"每秒/持续恢复"本质是 buff，而 buff 系统为 roadmap #1。决策：本期定义接口、get_buff 占位，不实现 buff 本体。后果：buff 型调料效果暂不可用，待 #1 后补。
- **ADR-5 记录按调料小类而非具体 id**：展示/追溯粒度到小类；具体差异由固化 bonus 承载。

---

## 10. 遗留 / 下阶段（本稿明确不做，标记待办）

> 状态更新（2026-09-11）：本节的"数值映射公式"一项**已在实现中确定**，见下方标注；其余仍待办。

- **变味规则**与**调味次数上限**（单调料>3 次变味等，来自 idea5）：仅影响数值规则，需与存储结构解耦后另行定义。**仍待办**。
- ~~调味的**数值映射公式**（字段值 × 次数 如何折算；模板∪bonus 同 attr 是否相加）~~ → **已确定**：调料贡献按其 `season_effect` 行的 `attr_value` **× 每份剂量 n** 折算；`get_attr` 类型在归并时**同 attr 相加**（见 §13、§15）；`get_buff` 等其他类型暂不折算、原样保留（语义待 buff 系统升级）。
- **buff / 每秒恢复**真接通（依赖 roadmap #1 buff 系统升级）：缺口清单见 §13.3。**仍待办**。
- 其他"有内容消耗品"扩类（干制品当前不可调味，属后续）。**仍待办**。
- **二次调味（COK_DS 菜品调味子功能）**：结构已预留（`ex_data` 可承载、复合 key 可区分），但本期明确不做；将来实现时需处理"改已入包实例的 `ex_data` ⇒ 背包 key 变化 ⇒ 拆旧 key / 按新 key 合并重放（可能撞 maxStack 上限）"。**仍待办**。

---

## 11. 风险与注意

- **存量存档兼容**：旧菜品实例无 ex_data/无结构化内容，读档须优雅降级为白板。
- **基线只读**：本稿不落任何 `everything_with_me_idle/` 代码；实现由下会话按 AGENTS.md 逐条中文计划并经你确认。
- **类别搬迁副作用**：`all_seasoning`、配方材料消耗、商店/文本/图鉴等多处按材料小类引用调料的点，迁移后需全查（现材 → 现耗）。
- **SPEC 同步**：实现落地、结构定型后，按 AGENTS.md §3 把"已存在"部分回写 `docs/SPEC.md`；本稿属规划，不写进 SPEC。

---

## 12. 实现后续待办（2026-09-10 记录，均由盘问会话确认）

> 以下为**已确认要做、但本次不处理**的事项，按需再开实现计划。

- **切换批量数量会清空调料选择**：~~本次只记录，未改~~ → **已于 2026-09-11 修复**（见 §15）。原因：`updata_live_plan_div()` → `updata_COK_formula_Details_div()` → `init_COK_formula_Details_div()` 中的 `FD_S_value_div.replaceChildren()` 会把已选调料全部清零，而批量份数 m 正是调料扣量（n×m）的乘数。
- **合成制造（SYN）产物预览的同类问题**：~~本次只在烹饪侧修掉，SYN 侧未改~~ → **已于 2026-09-11 修复**（见 §14）。
- **变味规则 / 调味次数上限**、**数值映射公式**、**buff 真接通**、**其他有内容消耗品扩类**：见 §10。
- **持续使用型物品的 get_attr 行永不触发**：`consumable_manage.js` 的 `updata_sustain_use_consumable` 对**每一行**效果都读 `use_ratio` 当进度阈值，而 `get_attr` 行的 `use_ratio` 是 `null`，导致"给持续型物品加 get_attr 行"会静默永不触发且不报错。**本次只记录，未改**。
- **配方排序只看 attr_id、不看 attr_type**（**已于 2026-09-11 修复**）：`COK_function.js` 的 `COK_switch_type_handle` 在为配方列表排序时，遍历产物 `use_attr` 只比对 `attr_id`，命中就取该行的数值字段。若产物存在**同 `attr_id` 的非 `get_attr` 行**（例如将来的 `get_buff` 行），取到的是 `undefined` → 排序值变成 `NaN`、顺序错乱。
  - 该隐患**在字段改革前就存在**（当时读 `attr_value1`，同样会是 `undefined`），非本次引入；且**迄今触发不了**——要求"非 `get_attr` 行的 `attr_id` 恰好等于 `health_point`/`magic_point`/`surface_energy_point`"，而 buff/物品/配方 id 都不会叫这三个名字，烹饪产物的 `use_attr` 目前也全是 `get_attr` 行。属于**防御性**修复。
  - **已修法**：循环内先判 `if (use_attr_obj.attr_type != 'get_attr') continue;`，并在注释中写明"排序值只取自 `get_attr` 行"。
- **配方详情区在构建时即为"可见"状态**：`Dom/Live_plan/Material_handling/{cooking,synthesis}.js` 里 `addElement(..., sty_display)` 传的是空字符串，而 `addElement` 里 `if (sty_display)` 判空为假 → **display 从未被设置**，即元素默认可见；而 `check_show_*_formula_Details_div()` 正是用 `style.display == ''` 判定"详情已展示"，且 `now_formula` **不持久化**（`cooking.js` 的 `save_cooking_manage` 返回空对象；`synthesis.js` 只存 `SYN_all_place_work_bench`）。
  - 理论上读档/初始化路径可能在**没有选定配方**的状态下进入详情渲染，从而读到 `formulas[undefined].material` 而报错并中断游戏循环（`run_manage.js` 的 `setTimeout` 未能重新挂上）。
  - **2026-09-11 已查清"读档后配方详情为何是隐藏的"**：读档链最末端 `global_manage.load_global_manage` 的 `place_manage.load_place_manage()`（该调用刻意放在最后，注释写明"其他部分依赖地点切换"）→ `Place_manage.change_game_data()` → `live_plan_manage.set_new_place()` → 各原料处理技能管理类的 `set_new_place()`；其中**烹饪/合成**在 `UGS_now_MH_name == 自己` 时会调 `delete_*_formula_Details_div()`，于是详情被隐藏、`check_show_*()` 返回 false，**崩溃因此没有复现**。
  - 也就是说：**此前的"不崩"是依赖这条副作用，而非显式守卫**。风险窗口仍然存在——只要"详情处于可见 + 未选配方"，任何触发 `updata_live_plan_div()` 的动作（如 `Player_formula.js:155`：获得/失去任意物品）都会走进详情渲染。
  - **处理（2026-09-11 已修）**：采用方案 B —— 在 `updata_COK_formula_Details_div()` / `updata_SYN_formula_Details_div()` 开头增加显式守卫：`now_formula` 为空即视为异常，**打印异常信息**并调用 `delete_*_formula_Details_div()` 切回"未选择配方"界面后 return。理由：理论上要展示配方详情就必须已选定配方。
- **SYN 批量数量按钮一次点击触发两次详情渲染**：`Dom/Live_plan/Material_handling/synthesis.js` 的 SYN_MK 与 SYN_FM 两处数量按钮回调原本同时调了 `updata_live_plan_div()` 与 `updata_SYN_formula_Details_div()`，而前者内部已会经 `check_show_SYN_formula_Details_div()` 刷新详情 → 重复渲染一次。→ **已于 2026-09-11 修复**：两处都改为只调一次 `updata_live_plan_div()`。
- **调料没有任何正式产出途径（阻塞性内容缺口）**：`fish_meat_floss 鱼肉松` / `animal_meat_floss 兽肉松` / `berry_jam 浆果果酱` 三种调料目前全项目只有三处落点——物品定义（`js/Data/Item/Consumable.js`）、文本（`js/Data/Text/Text_item/consumable.js`）、以及**调试按钮**（`js/Dom/Game_log_test.js` 直接 `Player_get_item(..., 10)`）。**没有任何配方、采集掉落、商店库存能产出它们**（`COK_MS 制调味品` 子功能仍是空壳）。
  - 后果：正式游玩时玩家拿不到调料，"调味"整条链路实际不可达，只能在调试界面手动发放。
  - 需要内容侧补齐（例：为 `COK_MS` 或某个配方补上"由食材制成调料"的产出），**本次未处理**。
- **烹饪的"排序"按钮没有任何监听器**：`Dom/Live_plan/Material_handling/cooking.js` 里创建的 `#COK_CD_sort_button`（"排序"按钮）在 `set_COK_CD_button()` 中**没有绑定任何 onclick / addEventListener**，点击毫无反应；目前只有两个下拉框（`#COK_CD_attr_select` / `#COK_CD_dir_select`）的 `change` 会刷新配方列表。**已记下，暂无处理方案**。
- **`to_num` 存在重复实现**：`js/Function/Function.js` 已导出 `to_num`（效果行数值折算用），而 `js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js` 里仍保留一份**同名本地实现**。功能一致、无冲突，属代码整洁问题。**本次只记录，未改**。
- **字段改名带来的存量存档后果（已知，未做迁移）**：`ex_data.bonus` 行的字段随存档持久化，且参与背包 key 哈希；改名后旧存档里 `attr_value1..3` 的旧行不会被新读取端识别（`to_num` 兜底为 0 → 视作无加成），同内容的新旧实例也不再合堆。当时的决策是"直接替换、不管旧存档"，此处仅作记录。
- **调料区占位行会被读成一条无效选择**（已于 2026-09-11 加固）：`Dom/Live_plan/Material_handling/cooking.js` 构建时会在 `#COK_CD_FD_S_value_div` 里放 **5 行静态占位样例**（无 `item_id`/`use_num` dataset），它们要等第一次渲染详情时被 `init_COK_formula_Details_div()` 的 `replaceChildren()` 清掉。而 `get_COK_CD_seasoning()` 原先只判 `use_num <= 0`，占位行的 `use_num` 为 `undefined` → `parseInt` 得 `NaN` → `NaN <= 0` 为 false → 会被当成"已选"，产生一条 `{id: undefined, num: NaN}`。
  - 现状**无实际影响**（捕获只在详情已展示时发生，而进入烹饪界面的正常路径会先把详情隐藏；配方已选定时占位行早已被清掉），但属于脆弱点。
  - **已加固**：`get_COK_CD_seasoning()` 增加"没有 `item_id` 的行直接跳过"。

---

## 13. 消耗品使用效果字段改革（2026-09-10 实施）

### 13.1 改革内容

`add_use_attr` / `add_season_effect` 的**输入位置参数不变**，但存入效果行的字段改为**按效果类型命名**，解决"`attr_value1` 在不同效果类型下含义不同、看不懂"的问题。

| attr_type | 值字段 | 含义 |
|---|---|---|
| `get_attr` | `attr_value` | 属性数值 |
| `get_buff` | `buff_time` + `buff_value` | buff_time=持续时间(秒，对齐 Buff 的 `time_value`)；buff_value=数值(每秒多少，对齐 Buff 的 `data_value`) |
| `get_item` | `item_num` | 获得数量；`attr_id` 为物品 id |
| `get_formula` | 无值字段 | `attr_id` 为配方 id，靠 `use_ratio` 表示进度阈值 |
| 公共字段 | `attr_type` / `use_ratio` / `attr_id` | `use_ratio` 是"调度/触发阈值"字段，所有类型都保留 |

- 未支持的 `attr_type`：`console` 告警且**不写入**效果行。
- 归并规则（`Function.js` 的 `get_merge_use_attr`，结算与 tooltip **共用同一份实现**）：只有 `get_attr` 按 `attr_id` 相加 `attr_value`；其他类型原样保留、不去重不合并。
- 本次**不做**：`get_buff` 功能接通（仍为占位日志）、旧存档兼容/迁移。
  - 存档影响已知：`ex_data.bonus` 的字段名会随存档持久化，且参与背包 key 哈希（`get_item_id_key` 用 `JSON.stringify(ex_data)`），改名后新旧实例不再合堆；仓库内现有样例存档无 `ex_data` 键。

### 13.2 全项目"value1/2/3 式命名"清点（供后续决定是否也改）

改革只覆盖**消耗品使用效果 + 调味效果 + ex_data.bonus**（这三者是同一套行结构）。其余使用 `value1/2/3` 或类似"懒命名"的地方**本次未动**，清点如下：

| 类别 | 位置 | 说明 |
|---|---|---|
| 装备属性 | `js/Data/Item/Item_class.js` 的 `Equipment.equip_attr` / `init_Equipment_*_attr` | **不用** `attr_value1..3`，而是以属性名为 key（如 `equip_attr[rarity]['attack']`），本就具名，无需改 |
| buff 数值 | `js/Data/Buff/Buff_class.js` 的 `buff_value[]` → `data_value` | 已是具名字段（`data_value` / `time_value`），非 value1/2/3 |
| 日志文本 | `log_value1` / `log_value2` 等 | 与物品效果无关 |
| DOM id | `TS_value1_*` 等 | 纯界面元素 id |
| 材料/配方 | 各自用 `num` / `value` 等语义名 | 无 value1/2/3 |

> 结论：真正"同一字段在不同语境下含义不同"的问题**集中在消耗品使用效果**（本次已解决）。其他部位要么本就具名，要么只是局部变量的懒命名（id 唯一，不影响追溯），**建议不改**。

### 13.3 附：buff 系统现状（与本次改革相关的事实）

- `Buff_class` 有 `time_value`（`'infinite'` 或秒）与 `buff_value[]`（`data_value`，语义为"每秒多少"）；但运行时授予入口 `Player_Buff_Manage.set_buff_attr(buff_id)` **只收 buff_id**，时间与数值都从 DB 读——**没有"施加时传 N 秒 / V 值"的通道**。
- `load_init` 不恢复 `data_value` / `time_value`，即使临时覆盖也会在读档后打回 DB 默认值。
- 展示层（`item_tip.js` / `item_library.js`）目前只渲染 `get_attr` 行，buff 行不会显示。
- 因此"消耗品施加带 N 秒/V 值的 buff"要真接通，仍需：①`get_consumable_use_data` 的 `get_buff` 分支落地；②`set_buff_attr` 支持 N/V 覆盖；③存档恢复自定义 N/V；④展示层支持 buff 行。以上均属 roadmap #1 buff 系统升级范畴。

---

## 14. 产物预览实时化 + 产物 div 每次重建（2026-09-11 实施）

### 14.1 解决的问题

1. **SYN（合成制造）产物预览不跟随实时状态**：`updata_SYN_formula_Product_div` 原来在**渲染那一刻**把产物对象算好、作为固定值交给提示窗，之后配方/数量变化都不会反映到已挂载的提示上。
2. **产物 div 上的提示监听反复叠加**：`..._FD_P_value_div` 是 Dom 层创建一次的**常驻元素**，每次渲染都调一次 `add_show_Tooltip`（内部挂 `mouseenter`/`mousemove`/`mouseleave` 三个监听），而全项目从无 `removeEventListener`，旧的清空函数（`init_*_formula_Details_div`）只清子节点、不动元素本身 → 监听器**只增不减**。SYN 侧因批量数量按钮一次点击触发两次渲染，累积更快。
   - 原烹饪侧的修法是"dataset 幂等标记"（只挂一次、不清除），但它只是"不再重复挂"，并没有真正清理，且方案本身不易理解。

### 14.2 采用的方案

- **实时预览**：两侧产物详情都改为传**值提供者（函数）**，由提示窗在 `mouseenter` 时求值（`Tooltip.InitTip` 已支持函数值，见 `Tooltip.js`）。统一复用 tip_type `'formula_product'`（归类为物品展示）。
- **每次渲染就地重建产物 div**：在**清空/初始化函数** `init_*_formula_Details_div` 里，用 `crtElement` 新建**同 id、同 class** 的 div，并用 `old.replaceWith(new)` **在同位置替换**（层级、顺序、样式均不变）。旧元素连同它的全部监听一起被丢弃 → **从根上消除叠加**，也就不需要任何"幂等标记"或"移除机制"。
  - 之所以放在 `init_*`（而不是挂在 tooltip 的 `updata_*_formula_Product_div`）：与项目里其余 16 处"先清空容器 → 再由渲染函数新建子元素并挂 tooltip"的写法保持一致，让 `init_*` 负责"详情区里有哪些元素"、`updata_*` 只负责"往里面填内容"。
  - 代价是一处**顺序依赖**：`init_*` 必须在其 `updata_*_formula_Product_div` 之前执行（现状已满足：二者都只被 `updata_*_formula_Details_div` 成对调用），已在两侧代码注释中写明。
- 因此 `init_*` 里原来那句对产物 div 的 `replaceChildren()` 被"整个重建"取代（只清内容无法丢弃元素上的监听）。
- 烹饪侧同步**去掉 dataset 幂等标记**，与 SYN 统一。

### 14.3 provider 行为（两侧对称）

| 情况 | 行为 |
|---|---|
| 未选定配方 | 静默返回 `null`（预期内） |
| 配方不在配方数据库 | console 告警 + 返回 `null` |
| **产物是工作台等非物品** | **console 信息** + 返回 `null` |
| 产物物品不在物品数据库 | console 告警 + 返回 `null` |
| 正常物品产物 | 返回产物物品对象（烹饪侧含调味 `ex_data`） |

### 14.4 改动文件

- `js/GameRun/live_plan/Material_handling/synthesis/synthesis.js`：新增 `get_now_formula()` getter（对齐烹饪）；`updata_SYN_formula_Details_div()` 增加"未选配方"显式守卫（见 14.5）。
- `js/GameRun/live_plan/Material_handling/synthesis/SYN_function.js`：`init_SYN_formula_Details_div` 里改为**整个重建产物 div**；`updata_SYN_formula_Product_div` 只填内容 + 挂 provider；新增 provider `get_now_product_preview_obj()`。
- `js/GameRun/live_plan/Material_handling/cooking/COK_function.js`：同上（并去掉 dataset 幂等标记）；provider 增补"工作台产物"console。
- `js/GameRun/live_plan/Material_handling/cooking/cooking.js`：`updata_COK_formula_Details_div()` 增加"未选配方"显式守卫（见 14.5）。

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

| 项 | 说明 |
|---|---|
| 行内 `dataset.use_num` | 存**每份剂量 n**（扣料与 `ex_data` 折算都用它） |
| 显示文本 | `名称（Xn）`，**只表示"一份菜品上加几个"**，例如 `鱼肉松（X2）`、未选为 `（X0）`；**不显示批量总量、也不显示拥有量**（批量与实际消耗的关系由"批量制造选择"按钮体现） |
| 分区标题 | `添加调料` → **`单份菜品添加调料`** |
| `+` 上限 | `每份剂量上限 = floor(拥有量 / m)`，保证 `m×n ≤ 拥有量`；拥有量 < m 时上限为 0，`+` 禁用（**显示口径改回单份后上限仍保留批量口径**，以免选到"做不出来"的数量） |
| 拥有量为 0 | **不建行**（背包里数量归零的 key 不会被删除，必须显式跳过） |
| 同一调料 id 多 key | 按 `item_id` **去重只建一行**，并对重复情况打 console |

**（2）调料选择跨刷新保留（仅在"刷新链"生效）**

- 调料行的清空与重建都发生在 `updata_COK_formula_Details_div()`，而它有**两个入口**：
  - 入口①（刷新链）`updata_live_plan_div()`：批量数量、筛选、排序、切地点、**制造后整屏刷新**等；
  - 入口②（点左侧配方行）`COK_function.js` 的配方行 click → 直接调用详情刷新。
- 因此捕获点放在**入口①**：`updata_live_plan_div()` 在 `check_show_COK_formula_Details_div()` 为真时先 `get_COK_CD_seasoning()` 捕获，再作为参数传给 `updata_COK_formula_Details_div(previous_selection)` → `updata_COK_formula_Seasoning_div(previous_selection)`。
- **入口②不传参** ⇒ **切换配方即重新选择**（与"只在刷新链恢复"的设计意图一致），也避免了详情隐藏期间残留的"僵尸行"被误当作当前选择。
- 还原规则：按 `item_id` 匹配；`n = min(上次 n, floor(拥有量/m))`，**静默夹紧**（不提示、不打日志）；行已不存在（拥有量为 0）即自然归零。

**（3）顺带修正**："当前可制造"筛选原本固定按 1 份判断（`COK_function.js` 的 `check_now_COK_formula(formula_id, 1)`），改为按**当前批量数量**判断，与真实制造（含调料消耗）口径一致。

### 15.3 未改动

- `check_now_COK_formula()` 自身的调料校验**无需改**：它本来就用 `n × m` 算总需求，与新显示/新上限口径一致。
- 行内 `dataset.use_num` 语义、`ex_data` 结构、存档结构均未改。
- 不涉及 SYN（调料只存在于 COK_CD）。

### 15.4 改动文件

- `js/GameRun/live_plan/Material_handling/cooking/COK_cooking_dishes.js`：`updata_COK_formula_Seasoning_div(previous_selection)` 重写（去重、跳过 0、还原夹紧、上限）；`updata_COK_seasoning_button_mask(...)` 第 4 个参数语义由"拥有量"改为"每份剂量上限"；新增文本 helper `get_seasoning_text(item_name, use_num)`（输出 `名称（Xn）`）。
- `js/GameRun/live_plan/Material_handling/cooking/cooking.js`：`updata_live_plan_div()` 中捕获并透传；`updata_COK_formula_Details_div(previous_selection)` 新增可选参数并下传。
- `js/GameRun/live_plan/Material_handling/cooking/COK_function.js`："当前可制造"筛选改用当前批量数量。
- `js/Dom/Live_plan/Material_handling/cooking.js`：分区标题改为 `单份菜品添加调料`；"清空"按钮文本同步为 `名称（X0）`，`+` 是否启用按 `拥有量 >= 批量份数` 判断（上限为 0 时保持禁用）；构建期的 5 行占位样例文本同步为 `（X1）`。

---

*End of planning doc. 状态：仅规划、未实现。*
