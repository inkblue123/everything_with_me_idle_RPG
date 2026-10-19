# SPEC.md — 项目现状说明书

> 本文件**只描述项目已经存在的东西**，是给 AI 和开发者看的"现状地图"。
> **它不是改造指令**，不包含任何"应该改成什么样"的施工要求。
> 未实现的功能请写在 `docs/roadmap.md`。
> 现有代码（`everything_with_me_idle/`）是**基线 / 只读**，请遵守 `AGENTS.md`。

---

## 1. 项目概览

-   **名称**：万般诸加吾身（everything_with_me_idle_RPG）
-   **类型**：文字挂机 RPG（idle / 放置类）
-   **技术栈**：纯前端 Vanilla JavaScript（ES Modules），无框架、无后端、无构建依赖
-   **运行方式**：浏览器直接打开 `html/index.html`（需通过 HTTP 或构建产物加载 ES Module）
-   **入口链**：`html/index.html` → `js/main.js` → 初始化数据 / 创建界面 / 加载存档 / 启动游戏循环
-   **存档**：`window.localStorage` 的 `v0.1` 键，内容为 `JSON` 对象经 base64 编码后的字符串

## 2. 代码目录结构

```
everything_with_me_idle/
├── html/index.html          # 入口页面（标题"万般诸加吾身"）
├── js/
│   ├── main.js              # 程序入口
│   ├── Data/                # 数据 / 静态库（游戏内容数据库）
│   ├── Dom/                 # 界面构建与交互（DOM）
│   ├── Function/            # 通用工具函数
│   ├── GameRun/             # 游戏运行逻辑 / 管理类
│   ├── LoadAndSave/         # 存档 / 读档
│   └── Player/              # 玩家对象及其子系统
├── css/                     # 样式
├── output/                  # 生成产物（勿手动改）
├── Version.txt              # 开发日志 / 版本记录
└── (dist/, node_modules/)   # 构建相关生成物
```

## 3. 启动与主循环

`js/main.js` 在页面加载时依次执行：

1. `game_data_init()` — 初始化各数据库
2. `create_game_dom()` — 构建全部游戏界面布局
3. `init_game()` — 加载存档（有存档则读档，无则新游戏开场剧情）
4. `start_game_loop()` — 启动游戏循环

游戏循环（`js/GameRun/run_manage.js`）用 `setTimeout` 以约 30 FPS 驱动，每帧：

-   `updata_game_data()`：更新玩家数值、地点事件、战斗 / 生活技能 / 消耗品逻辑、经验结算、游戏状态
-   `updata_game_div()`：刷新画面（战斗进度条、敌人、红蓝绿资源、属性显示）
-   `updata_timing_game_data()`：按游戏内时间（分/时/天/月/年）触发定时任务（如矿点重生）

## 4. 核心数据模型

### 4.1 全局对象 `global`（`GameRun/global_manage.js`）

一个 `Global_manage` 单例，聚合管理所有子系统，通过 `get_xxx()` 暴露：

-   `time_manage` 帧率与游戏内时间
-   `place_manage` 玩家所处地点
-   `enemy_manage` 场地内敌人
-   `random_manage` 随机数
-   `combat_manage` 战斗运算
-   `exp_manage` 技能经验 / 升级
-   `game_event_manage` 游戏事件（主线/支线/挑战/小事件/成就）
-   `global_flag_manage` 游戏状态与标记
-   `live_plan_manage` 生活技能
-   `store_manage` 商店交易
-   `map_manage` 地图
-   `consumable_manage` 消耗品使用
-   `library_manage` 图鉴

### 4.2 玩家对象 `player`（`Player/Player.js`）

`Player_Object` 单例，子系统包括：

-   `player_attributes` 玩家属性（含 `player_energy`）
-   `player_buff_manage` buff 管理（`Player/Player_buff.js`，见 §4.4）
-   `player_backpack` 背包
-   `player_worn` 穿戴装备栏
-   `player_skills` 全部技能（主动/被动）
-   `player_ASkills_manage` 已装载主动技能槽
-   `player_formulas_manage` 玩家学会的配方

提供 `Player_get_item` / `Player_lose_item` / 穿戴脱装备 / `updata_end_attr`（联动战斗、生活技能、消耗品）/ 每帧 `run_player_normal`、`run_player_combat` / 存档 `save_player_class`、读档 `load_player_class`。

### 4.3 数据 / 静态库（`Data/`）

按类别存放静态内容，各库有 `init_xxx()` 初始化函数，`Data.js` 的 `game_data_init()` 统一调用：

-   `Text/` 文本（属性名、物品名、技能名、地点名等）
-   `Enum/` 枚举（物品大类/小类、属性展示方式、游戏状态、装备类型等）
-   `Buff/` buff 定义（数据在 `Buff_normal.js`，类在 `Buff_class.js`，见 §4.4）
-   `Item/` 物品（装备 equipment / 消耗品 consumable / 材料 material）
-   `Formula/` 配方（合成、烹饪）
-   `Game_event/` 游戏事件（主线 `main_quest`、支线 `side_quest`、挑战 `challenge`、小事件 `mini_event`）
-   `Place/` 地点（普通 / 战斗 / NPC / 商店 / 资源 / 其他）
-   `Skill/` 技能（玩家主动/被动、敌人主动/被动、附加/基础）
-   `Enemy/` 敌人（普通 / 鱼 / 矿石 / 树等）
-   `Map/` 地图（区域及其地点坐标）

`Data.js` 里还有若干**自动补齐逻辑**，避免手动维护遗漏：

-   自动把各事件类型填入 `enums.important_nodes`
-   自动收集物品小类进枚举并去重
-   自动生成组合型属性（如"伐木工具伐木伤害"）到枚举与文本库
-   自动汇总原料处理类生活技能的工作环境
-   校验每个地点是否都定义了地图信息

### 4.4 buff 系统（2026.09.24 重构后）

buff 系统已从「三元组效果行 + 枚举白名单分派」改造为「**声明式效果行 + 按效果目标分派**」，并补上层数与作用域。

**文件**

-   **数据**：`Data/Buff/Buff_normal.js`。逐条用 `buffs[id].set_buff_data(time_type, time_value, scope, stackable, layer_time_ratio, stack_expire)`
    设置 buff 级参数，再用 `buffs[id].add_buff_effect(out, when, dispatch, target, value, per_layer, revert)` 逐条添加效果行
    （两个方法都定义在 `Data/Buff/Buff_class.js`，参数顺序与含义见那里的注释）。
    **`set_buff_data` 的 6 个位置**：`time_type` 时间计算方式（默认 `'game_time_buff'`）/ `time_value` 有效时间（秒数或 `'infinite'`，**无默认值**，不传会告警）/
    `scope` 作用域（默认 `'normal'`）/ `stackable` 是否可叠层（默认 `false`）/ `layer_time_ratio` 每层时长倍率（默认 `1`）/ `stack_expire` 到期行为（默认 `'remove'`）。
    **省略或传 `undefined` 的参数保持默认值**；取值不在白名单、类型不对、参数多于 6 个，都只打 `console.log` 告警、不阻断启动。
    **效果行字段**：`out` 产出类型（目前恒为 `'value'`，`'act'` 只留占位）/ `when` 时机（`'tick'` 或 `'on_apply'`）/ `dispatch` 分发给谁 /
    `target` 改哪个东西 / `value` 数值（可为布尔量，flag 行用）/ `per_layer` 是否乘当前层数 / `revert` 移除时是否撤销
-   **buff 级字段**（`Buff_class.js` 构造器给默认值，由 `set_buff_data` 覆盖）：
    `scope` 作用域（`normal` / `combat` / `life`）、`stackable` 是否可叠层（`false` = 重复获得仍为新替换旧）、
    `layer_time_ratio` 每多一层的时长倍率（`1` = 不衰减）、`stack_expire` 到期行为（`remove` 整条消失 / `reduce_layer` 减 1 层并重启计时）
-   **运行**：拆成两个文件（**buff 的增删清空 + 效果分派与落地 + 界面绘制都在调度台，容器与累加器在目标侧**）——

    -   **目标侧**：`Player/Player_buff.js` 导出 `Player_Buff_Manage`，负责 buff **容器**、计时、到期、层数、效果行产出、
        `end_buff_attr` / `end_data_attr` **累加**、存档。构造时接收 `target`（不传则默认玩家）。
        **它现在零 DOM 依赖**（2026-09-24 起界面绘制移到了调度台，连 `Dom_function` 的 import 都删掉了）。
        `init()` 会扫一遍 buff 数据库汇总出 `target_dispatch` 表（效果目标 → 分发给谁）。
        它对外只暴露三类「被调度台调用」的接口：
        `create_buff_instance(id)`（实例工厂：`game_time_BUFF` 没有导出，只能由它 new；返回空对象表示该时间类型未实现）、
        `updata_end_buff_attr(buff_value_obj)`（累加记账）、
        `flush_end_buff_change()`（统一收尾，目标侧唯一的效果出口：有变化时**去重 → 检查调度台 → 调 `apply_buff_effects(this)`**，最后复位标志与待处理列表。
        2026-09-24 之前这里还夹着一个只做"去重 + 守卫 + 转发"的 `restart_end_buff()` 薄壳，已并入本方法删除）。
        另有 `save_buff()` / `load_buff()`（目标自身的存读档生命周期，由 `Player.js` 调用）与一个 `buff_show_kind = 'player'`
        ——后者让调度台知道"这个目标的 buff 界面由谁画、该读哪份渲染缓存"。
    -   **全局结算层（调度台）**：`GameRun/buff_manage.js` 导出 `Buff_manage`，注册在 `global` 上（`global.get_buff_manage()`）。它承担四件事：
        ① **获得 / 移除 / 清空**：`set_buff(buff_holder, id)` / `delete_buff(buff_holder, id)` / `reset_buff(buff_holder)`
        —— 增删清空的**决策**都在这里，目标侧只提供容器与上面的三个接口。
        `set_buff()` 里按 §4.2-1 的六步流程排好了注释位置：**只有第 ④ 步（同类叠层/替换）与第 ⑥ 步（构建入容器）有代码**，
        ① 抵抗力 / ② 净化 / ③ 系列覆盖 / ⑤ 免疫四步**只有注释、没有 if**（没有 `buff_level` / `series` 等字段支撑）；
        ② **效果分派与落地**：`apply_buff_effects(buff_holder)` 逐 `data_type` 算出增量（`flag` 解真假，其余取 `now_data - last_data`），
        按 `dispatch` 走 5 路分派，再调用它自己持有的 5 个生效函数
        （`change_data_attr(target, …)` / `updata_end_attr_buff(target)` / `global_set_flag(target, …)` /
        `set_game_speed_num(target, …)` / `set_game_speed_ratio(target, …)`，统一带 `target` 参数）；
        ③ **动作通道**：收集本帧各目标推上来的**动作请求** → 统一执行 → 清空。
        ④ **界面刷新调度与绘制**：`run_buff_show_scheduler()` 遍历「目标来源清单」拿到的所有 buff 容器，对每个调 `this.refresh_buff_show(holder)`；
        `refresh_buff_show(holder)` 先看 `holder.buff_show_kind`，**只有 `'player'` 才继续画**（其余目标直接跳过），
        再用本文件里的 7 个绘制函数（`buff_id_sort` / `getArrayDifferences` / `get_buff_stack_dataset` / `get_buff_time_text` /
        `get_buff_show_text` / `add_buff_show_div` / `updata_buff_show_div`）把面板画出来。
        **玩家面板的三个渲染缓存挂在调度台上**（`player_buff_div_init_flag` / `player_game_time_buff_sort_id` / `player_combat_round_buff_sort_id`），
        它们不再是目标侧字段。
        ⚠️ 面板被隐藏时会把 `player_buff_div_init_flag = false`，使面板重新显示时整体重建；所以**调度台必须每帧遍历到玩家**，
        否则"面板隐藏再显示"就再也不会重建。
        ⚠️ **将来敌人也接进来源清单之前，必须先给它加自己的缓存**：这三份缓存是全局单例的，
        多个目标共用会退化成「没变化就逐条更新」的分支永远走不到（每帧整体重建），
        且玩家面板一隐藏就把敌人的也判成未初始化、来回抖。今天只有玩家一个目标，所以不会触发。
        ⚠️ **它现在不是"零 DOM"的**：绘制代码（约 178 行）与 `Dom_function` 的 import 都在这个文件里。
        这与 `combat_manage.js`（结算、零 DOM）+ `Dom/Combat.js`（绘制）的分法不同，但与本项目 `enemy_manage.js`
        （管理器自己 `document.getElementById` 画自己的目标）的做法一致。
        它是**无状态、不进存档**的，也**不持有 buff 容器与累加器**（那两个仍在目标侧，因为 `data_attr.js` 的 `Summary_buff_attr()` 是从目标侧取 `get_end_data_attr()`）。
        它在**同一帧的两个不同阶段**被各调一次（都在 `run_manage.js`）：

        -   **数据阶段** `updata_game_data()`：玩家常态更新之后、战斗分支之前调 `run_buff_scheduler()`（结算动作请求；空队列时直接返回）；
        -   **画面阶段** `updata_game_div()` 末尾调 `run_buff_show_scheduler()`（刷新 buff 界面）。
            这样界面刷新的是"这一帧所有系统都跑完之后"的最终状态，比放在数据阶段更及时。
            它还持有**目标来源清单**与一张**动作表**（本期为空）：

        ```
        this.target_sources = [
            { kind: 'player', get_buff_holders: () => this.player_buff_holders }, // 登记型（已实现）
            { kind: 'enemy',  get_buff_holders: () => [] },                       // 拉取型（未实现）
            { kind: 'area',   get_buff_holders: () => [] },                       // 拉取型（未实现）
        ]
        ```

        -   **清单顺序就是遍历顺序**：玩家 → 敌人 → 区域（与 ADR-19 的「玩家优先 → 敌人按格子顺序」一致）。
        -   每个来源回答「本帧有哪些 **buff 容器**」（返回容器而不是目标对象，消费者就不必知道各目标专属的取用方法名；容器身上有 `target`，需要时再取）。
        -   **`register_buff_holder(kind, holder)` 目前只支持 `'player'`**（登记型：玩家是常驻单例，`Player.js` 的 `init()` 里登记一次）；
            敌人 / 环境将来是**拉取型**（各自去问 `combat_manage` / 区域管理器要本帧列表），传其它 kind 会打一条日志并忽略。
        -   `get_all_buff_holders()` 按来源顺序把三类合并成一个数组，供遍历用。
        -   ⚠️ 敌人 / 环境目前返回空数组，所以**今天遍历结果与只有玩家时完全一样**——这是为将来做的结构预留，没有行为收益。
            ⚠️ `buff_manage.js` 与 `global_manage.js` 之间是**循环 import**（后者创建前者、前者要用 `global` 处理 flag 与游戏速度），
            靠"模块求值期不访问 `global`"成立，`import_smoke.js` 已验证。

-   **对外接口（全部在调度台上，调用方要先拿到目标侧的容器对象）**：
    **写法是两步**（与项目既有风格一致，例如 `run_manage.js` 的 `let place_manage = global.get_place_manage();`）：

    ```js
    let P_buff = player.get_player_buff_manage();
    let buff_manage = global.get_buff_manage();
    buff_manage.set_buff(P_buff, id); //或 delete_buff(P_buff, id) / reset_buff(P_buff)
    ```
    —— 名字沿用旧的 `set_buff_attr` / `delete_buff_attr` / `reset_buff_attr`（去掉 `_attr` 后缀），但**所在对象换成了调度台**，并多一个 `buff_holder` 参数。
    目标侧另有 `save_buff()` / `load_buff(save)`（由 `Player.js` 调用，属目标自身存档生命周期）；`load_buff` 内部清空走调度台的 `reset_buff(this)`。
    实例内部负责产出撤销值的方法叫 `delete_buff_effect()`，避免与调度台的 `delete_buff` 同名。
    **17 处调用点**（`player_energy.js` 8 / `Place_manage.js` 3 / `mini_event.js` 2 / `Game_log_test.js` 4）已同步改成上述写法。
    **约定：不要写成 `global.get_buff_manage().set_buff(...)` 这种一行里套两层调用**——本项目一律先取到变量再调用。
-   **层数**：一个 buff 实例只有一个计时器（ADR-8）。重复获得可叠层 buff → `stack + 1` 并按 `layer_time_ratio` 重算剩余时间；
    到期减 1 层并重启计时，减到 0 层才消失（`end_buff_expire()`）。
    **重复获得不可叠层 buff → 先撤销旧实例的全部贡献（由调度台的 `delete_buff` 完成）再构建新实例**，所以同 id 重复获得是"替换"而不是"叠加"（ADR-17）。
-   **游戏标记（flag）通道**：`dispatch:'flag'` 的目标是布尔量，靠 `end_buff_attr` 里**累加和的正负**判定（`>0` → true / `==0` → false）。
    效果行的 `value` 由 `get_true_data()` 归一：`true` → `+1`、`false` → `-1`、数字原样。
    ⚠️ 因此它是**票数制**：没有优先级，"1 个 true + 1 个 false" 相加为 0 会解成 `false`，而 "2 个 true + 1 个 false" 会解成 `true`；
    且 `now_data < 0` 会走调度台 `apply_buff_effects()` 的分支并打一条"浮点数误差"告警（`1 true + 2 false` 会命中）。
    另：`now_data == 0` 与"没有任何 buff 参与"不可区分，所以**默认值为 `true` 的 flag 不要交给 buff 系统管**。
-   **计时取整**：`start_buff()` 会把这一帧的 `time_in` 按**剩余时间封顶**——超出的部分既不计时也不结算，
    所以 `buff_have_time` 只会落到 `0`、**不会变成负数**（否则界面会显示「-1 秒」，且一帧跨太久时会多结算伤害）。
    界面用的 `get_buff_have_time()` 再做一层兜底：若剩余时间为负，按 `0` 显示并打一条 `console.log` 提示。
    到期判定仍是「**下一帧**才处理」（`get_buff_status()` 在帧首看到 `<= 0` 才返回 `delete`），所以减层那一帧界面会短暂显示 `0秒`。
-   **作用域**：`run_game_time_buff()` 每帧读一次 `GS_game_statu` 并传给 `get_buff_status(game_now_time, now_GS)`；
    `scope == 'combat'` 的 buff 在战斗外**不结算效果**——`get_buff_status` 会产出 `'accelerate'` 状态，
    `run_game_time_buff()` 对它调 `pass_time_out_of_combat()`：按 `Player_buff.js` 顶部常量 `out_combat_time_speed`（5，出自 idea6）
    加速扣时间并同步推进 `last_buff_time`，扣到就走到期处理。**无限时长的 buff 只被停止结算、不会消散**（没有时间可扣）。
    不接战斗状态变更钩子。
-   **数据自检**：`Buff_normal.js` 的 `check_buff_data()`，由 `init_normal_buff()` 在数据装完后调用，**只打警告、不阻止启动**。
    目前检查三条：① 资源类（`dispatch:'resource'`）效果不得声明 `revert:true`——给出去的血不该因为 buff 消失被倒着算回去；
    ② 可叠层 buff 的 `when:'on_apply'` 效果行不得声明 `per_layer`——一次性效果只在获得时结算一次，加层不会补足；
    ③`dispatch:'flag'` 的效果行不得声明 `revert:false`——移除时不撤销的话，那一票会永久留在累加器里、标记卡住再也回不去。
-   **动作通道（`out:'act'`）**：`updata_end_buff_attr()` 遇到 `out:'act'` 的效果行时**不再直接丢弃**，而是组装成请求推给调度台
    （`push_buff_request()`；调度台尚未建立时降级为一条日志，不影响加成值通道）。`act` 请求**不进 `end_buff_attr` 累加器**。
    ⚠️ 数据层目前还没有「动作名」这个字段、调度台的动作表也是空的，所以现在推过去只会得到一条「尚未实现」的日志——
    **位置已打通，动作一个都还没实现**。
-   **尚未做的机制**（只有位置、没有实现）：抵抗力 / 净化 / 系列覆盖 / 免疫四步（获得流程里只留注释）、公式表、钩子派发、
    回合型（`combat_round_buff` 仍是空壳）、敌人侧 buff、区域目标、消耗品 `get_buff` 接通、施加时传参。
-   **展示**：左上 buff 界面**只对可叠层 buff** 在名称后紧跟 `x{层数}`（如 `燃烧x3`，随后才是持续时间行；现有不可叠层的 buff 显示不变）。
    剩余时间由 `get_buff_time_text()` 格式化：**≤10 秒**保留 1 位小数（`9.5秒`）/ **≤60 秒**整数秒（`45秒`）/ **≤1 小时**`n分钟`（`59分钟`）/ **超过 1 小时**`n小时`（`2小时`）；
    一律**向下取整**（含边界：恰好 10 秒 → `10.0秒`、恰好 60 秒 → `60秒`、恰好 1 小时 → `60分钟`）；`infinite` 不显示时间行。
    层数与**格式化后的时间文本**都存进 `dataset`（`buff_stack` / `buff_have_time`）并参与刷新判断——时间文本放进 dataset 是因为
    1 位小数档需要比"整数秒"更细的比较粒度，否则小数位不会刷新。

**当前唯一的 buff 条目**：`burn`（燃烧）—— `scope:'combat'`、可叠层、`layer_time_ratio: 0.75`、`stack_expire:'reduce_layer'`、
效果行为 `value + tick + resource + health_point + per_layer`（每秒每层 1 点）。测试入口在 `Game_log_test.js` **测试 2** 的「燃烧 buff 测试」（施加燃烧 / 清除燃烧）。

**不再使用的旧机制**

-   `Data/Enum/Enum_buff.js` 的 6 张分派白名单：buff 系统改为按效果行上的 `dispatch` 字段分派，不再查这些表。

**存档**：buff 存档内容由实例的 `effects` 数组承载，随 `Player_buff_manage_save` 一起序列化。
读到更早格式（`buff_value` 数组）存档时，**剩余时间照常恢复，一次性效果会在读档后的下一帧重新生效**（不会丢 buff）。
**已知限制**：`stack` 会被写进存档（存的是整个对象），**`load_init()` 现在会把它读回来**（2026.09.24 起），
且**不按层数重算剩余时间**（存档里的 `buff_have_time` 本身就是按存档时的层数算出来的）；存档里没有 `stack` 字段的旧存档按 1 层处理。
`record` / `charges` / `caster` / 施加参数带来的自定义时长数值等字段**尚未纳入存档**——等真有那些 buff 时再加。

## 5. 界面布局（`Dom/`）

`create_game_dom()` 构建的界面，整个页面分上下两块（上 95% 游戏主体、下 5% 设置），游戏主体左 1/3 玩家相关、右 2/3 事件：

-   左上：玩家状态 `player_status`
-   左下：战斗规划 `Combat_plan`（背包 / 主动技能规划）
-   中下：玩家控制 `control`
-   右下：游戏日志 `game_log`（脑海 / 图鉴）
-   中上非战斗：生活规划 `Live_plan`、商店 `Store`（默认隐藏）、地图 `Map`
-   战斗时：战斗界面 `Combat`
-   设置界面 `Option`、随鼠标 tooltip `Tooltip`

生活技能分两大类：

-   **探索采集**（Explore_collection）：伐木 logging / 挖矿 mining / 采集 collect / 钓鱼 fishing / 潜水 diving / 考古 archaeology / 探索 exploration
-   **原料处理**（Material_handling）：合成制造 SYN / 烹饪 COK / 锻造 forging / 镌刻 engrave / 炼丹 EXA / 草药浴 herbal_bath / 蒸馏 EGV / 炼金 alchemy / 仙丹 ACM

## 6. 存档结构

`save_game()` 将 `global.save_global_manage()` 与 `player.save_player_class()` 组装成一个对象：

```js
{ global_save: {Time_save, place_save, global_flag_save, enemy_save,
                game_event_save, live_plan_save, random_save, store_save,
                map_save, library_save},
  player_save: {Player_attr_save, Player_buff_manage_save, Player_backpack_save,
                Player_worn_save, Player_skills_save, Player_ASkills_manage_save,
                Player_formulas_manage_save} }
```

-   序列化：`JSON.stringify` → base64 编码（`utf8_to_b64`）
-   读档：base64 解码 → `JSON.parse` → 逐子系统 `load_xxx()`
-   支持导入/导出（明文或 base64 两种格式）、删除存档

## 7. 当前版本

见 `everything_with_me_idle/Version.txt`（开发日志）。截至 2026.08.27 为 **V0.3.1**，近期方向：buff 系统兼容性升级、烹饪技能开发、商店回购、地图事件提示、下拉框通用化等。
