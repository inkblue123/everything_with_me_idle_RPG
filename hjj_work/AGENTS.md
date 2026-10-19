# AGENTS.md — 项目协作规则（对 AI 及开发者）

> 本文件是**纯规范层**，用于约束「AI 如何在本项目里工作」，**不参与运行、不被 import、不影响任何代码逻辑**。
> 请 AI 在开始任何任务前完整阅读本文件，并严格遵守。

## 0. 最重要的铁律：现有代码是"基线"

**现有代码（`everything_with_me_idle/` 下的所有 .js / .html / .css）一律视为"基线（baseline）"，是只读的。**

除非用户**明确点名**某个具体文件并要求修改，否则 AI 被禁止：
- ❌ 重构、重命名、重新组织任何现有函数 / 类 / 变量
- ❌ 格式化 / 美化现有代码（调整空格、换行、命名风格）
- ❌ "顺手修复"、"顺手优化"、"顺手删掉没用代码"——哪怕看起来很明显
- ❌ 移动文件、合并文件、拆分文件

**允许的读操作（Always OK）：** 读取任何文件来理解游戏逻辑、数据结构、存档格式。**读，永远没问题；改，必须有用户点名。**

## 1. 修改代码前必须"先计划，再动手"

任何时候要新增 / 修改代码，AI 必须遵循以下流程，**未经用户确认不得落地**：

1. **读**：先读懂相关文件，明确现状。
2. **计划**：说明「要动哪些文件、每个文件改什么、为什么、会影响哪些地方」。用中文，列出文件路径清单。
3. **确认**：把计划交给用户，**等待用户明确同意**后才开始写代码。
4. **最小改动**：只改计划里列出的文件；不顺手碰其他任何东西。
5. **完成后说明**：汇报改了哪些文件、每处改了什么，方便用户回滚。

> 例外：用户明确说的「直接做 / 帮我改 / 去实现」，视为已确认，但仍需遵守"最小改动"原则。

### 布局样式规则：gap 与 outline（必须确认）

游戏的界面布局遵守「父布局加 `gap`，子布局加 `outline`」的总体设定：

- **父容器（flex / grid）**：如果其直接子元素之间需要视觉分隔，父容器应加 `gap`（通常是 `gap: 2px`）。否则子元素紧贴时，相邻的 `outline` 会叠加成 2 倍厚的边框。
- **子元素**：需要形成可见边框盒的元素才加 `outline`；纯布局包裹层（只做分块定位、不直接承载内容）一般不加。

**今后 AI 只要涉及「容器 / 布局样式」的调整（新增或修改容器、改 flex/grid、动 gap/outline），都必须把下面两个问题明确问用户、等确认后再动手：**
1. 该容器要不要加 `gap`？加多少？
2. 该容器要不要加 `outline`？

不确定时宁可多问，不要擅自决定。这条优先级高于「最小改动」里"不顺手碰"的约束——它是专门针对布局样式的确认要求。

### CSS 样式规则：尽量不使用选择器（新增 / 修改时）

游戏项目目前的样式绝大多数都是**单纯的 id / class**，只有少数的选择器（如 `#a > *`、`.b .c`）。为保持一致，**AI 在新增 / 修改 CSS 样式时，默认尽量不使用选择器**，优先用单纯的 id / class 实现。

但有些样式需求用选择器会简单很多（例如更通用、代码量更少、或能覆盖多个同类元素）。**当 AI 判断某需求用选择器明显更简单时，必须把两种方案（用选择器 / 不用选择器）都写清楚给用户，由用户决定选择哪种**，不得擅自采用选择器方案。

此规则只约束**新增 / 修改**的样式，不要求回头清理存量代码里已有的选择器。

### 函数调用风格：不要在一行里链式调用两层「取用函数」

项目里常见「先取对象、再调它的方法」的写法，例如 `run_manage.js`：

```js
let place_manage = global.get_place_manage();
place_manage.updata_now_place_condition_event();
```

**AI 新增 / 修改代码时不要写成一行里套两层调用**，例如 ❌ `global.get_buff_manage().run_buff_scheduler();`，应写成：

```js
let buff_manage = global.get_buff_manage();
buff_manage.run_buff_scheduler();
```

- 同一个函数里要调多次时，变量**只声明一次**（放在函数体靠前处），后面复用。
- 这条只约束**新增 / 修改**的代码，**不要求**回头清理存量写法。
- 存量已知的例外（暂不改）：`js/Function/control_function.js` 里两处 `global.get_global_flag_manage().get_flag(...)`。

## 2. 新增功能优先"添加新文件"，而不是"改动旧文件"

只要条件允许，新功能应优先：
- **新增**数据文件（如 `js/Data/...`）、新增管理类文件，而不是塞进已有大文件里。
- 在 `docs/SPEC.md` 里**先写清楚这个功能的目标、范围、验收标准**（行为描述），再实现。

## 3. 何时更新本规范与 SPEC

- 当现有代码发生结构性变化（新增了系统、改了存档结构）时，应同步在 `docs/SPEC.md` 里更新对应描述。
- `docs/SPEC.md` 是"现状说明书"，只描述**已经存在**的东西；未实现的功能写进 `docs/roadmap.md`。

## 4. 技术背景（帮助理解项目）

- 纯前端 **Vanilla JavaScript ES Module**（`<script type="module">`），无框架、无构建依赖（`dist/`、`node_modules/` 为生成物，勿手动改）。
- 入口：`everything_with_me_idle/html/index.html` → `js/main.js`。
- 游戏主体分三大块：**Data（数据/静态库）、GameRun（运行逻辑）、Player（玩家状态）、Dom（界面）**。
- 游戏循环：`run_manage.js` 的 `game_loop()` 用 `setTimeout` 驱动，每帧依次"更新数据 → 更新画面 → 定时任务"。
- 存档：`localStorage` 存 `v0.1` 键，JSON 序列化后 base64 编码。

## 5. 给 AI 的提问 / 汇报格式要求

- 回答用户问题时，中文优先（用户习惯中文）。
- 涉及"我要改代码"时，务必先给出**文件路径 + 改动内容**的计划清单。
- 不确定要不要改时，宁可多问一句，也不要擅自动代码。

## 6. 版本控制建议

动手改代码前，若项目尚未 git 管理，建议先执行：
```
git init
git add -A
git commit -m "baseline before spec work"
```
任何改动都可一键回滚到基线，最大程度保护现有代码。

## 7. 验证脚本（改动游戏逻辑后应当跑）

`_devtools/` 下有一套**零依赖**的验证脚本。它**不属于游戏本体**（在 `everything_with_me_idle/` 之外，不参与运行、不被任何游戏代码 import），存在的目的是在没有浏览器的条件下验证不该靠肉眼确认的逻辑：

```
node _devtools/buff_check/import_smoke.mjs     # 真实模块图冒烟：全仓 188 个 .js 逐个 import，抓断裂的 import / 导出
node _devtools/buff_check/run_check.mjs        # buff 系统回归：133 条断言（用桩测纯逻辑）
node _devtools/buff_check/run_check_real.mjs   # 真实运行时接缝：53 条断言（真实属性 / 真实钳制 / 真实属性派生链路）
node _devtools/data_check/check.mjs            # 数据完整性：物品 / 文本 / 分类 / 配方 / 工作台 逐条体检
node _devtools/dish_check/run_check.mjs        # 菜品 / 调料 get_buff 接通验证：22 条断言（真实属性 + 真实 buff 容器）
```

退出码 `0` = 全通过，`1` = 有问题。

**改过 `js/Player/Player_buff.js`、`js/Data/Buff/`、`js/Data/Text/Text_buff.js` 之后，前三个都跑一遍。**

**改过 `js/Data/` 下的物品 / 配方 / 文本数据之后，跑 `data_check/check.mjs`。** 它的**【红】硬错误**（引用断裂、缺必配文本、字段非法）必须修；**【黄】完成度清单**是待办清单，不影响退出码。

**改过消耗品效果结算或 buff 施加入口（`js/GameRun/consumable_manage.js`、`js/GameRun/buff_manage.js`）之后，跑 `dish_check/run_check.mjs`，再加前三个。**

⚠️ **通过不等于没问题**：这些脚本**不覆盖 DOM/CSS 与存档读档**，也跑不了完整的 `global.init()` / `player.init()`（那需要界面已建好）。`run_check.mjs` 用的是桩，`run_check_real.mjs` 只初始化 buff 链条需要的真实部件。覆盖范围、白名单机制、以及写用例时的帧序约定，见 `_devtools/README.md`。

前提：Node ≥ 22.7（游戏源码是 `.js` 且仓内无 `package.json`，靠 Node 的模块语法自动识别当 ESM 跑；本机 v24.18 实测可用）。
