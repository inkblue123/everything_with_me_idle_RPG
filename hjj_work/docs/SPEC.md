# SPEC.md — 项目现状说明书

> 本文件**只描述项目已经存在的东西**，是给 AI 和开发者看的"现状地图"。
> **它不是改造指令**，不包含任何"应该改成什么样"的施工要求。
> 未实现的功能请写在 `docs/roadmap.md`。
> 现有代码（`everything_with_me_idle/`）是**基线 / 只读**，请遵守 `AGENTS.md`。
> 文档入口与维护规则见 `docs/README.md`（本文件预算 ≤ 400 行，超了按系统拆到 `docs/spec/`）。

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
        按 `dispatch` 走 5 路分派，再调用**同文件的 5 个模块级生效函数**
        （`change_data_attr(target, …)` / `updata_end_attr_buff(target)` / `global_set_flag(target, …)` /
        `set_game_speed_num(target, …)` / `set_game_speed_ratio(target, …)`，统一带 `target` 参数）。
        这 5 个函数**不碰调度台的实例状态**（`this`），所以是模块级函数、不是方法（2026-10-21 移出类）；分派入口仍是方法；
        ③ **动作通道**：收集本帧各目标推上来的**动作请求** → 统一执行 → 清空。
        ④ **界面刷新调度与绘制**：`run_buff_show_scheduler()` 遍历「目标来源清单」拿到的所有 buff 容器，对每个调 `this.refresh_buff_show(holder)`；
        `refresh_buff_show(holder)` 先看 `holder.buff_show_kind`，**只有 `'player'` 才继续画**（其余目标直接跳过），
        再用本文件里的绘制函数（`buff_id_sort` / `getArrayDifferences` / `get_buff_stack_dataset` / `get_buff_time_text` /
        `get_buff_show_text` / `updata_buff_show_div` 是模块级函数；`add_buff_show_div` 与 `refresh_buff_show` / `init_buff_show_div` 是调度台的方法）把面板画出来。
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
    回合型（`combat_round_buff` 仍是空壳）、敌人侧 buff、区域目标。
-   **消耗品（菜品 / 调料）来源的 buff**（2026-09-29 接通）：消耗品的 `use_attr` / `season_effect` 里写
    `{attr_type:'get_buff', attr_id, buff_id, buff_value}`，食用时由 `GameRun/consumable_manage.js` 先按 `buff_id` 聚合成一条
    （否则后一行会把前一行整条替换掉），再调 `set_buff(buff_holder, id, runtime_data)`。`runtime_data` 只认三个字段：
    `effects`（按 `attr_id` 自动判定的 buff 效果行：资源键 → `tick + resource + revert:false`，其余 → `on_apply + attr + revert:true`，
    可用行上的 `buff_dispatch` 覆盖）、`time_value`（行上带 `buff_time` 时用它，调料走「调味配平」算出的结果；否则用 buff 条目的值）、
    `name_prefix`（菜品本体 buff 专用：名称前缀拼在实例的 `name` 上）。
    ⚠️ 传参带来的效果行不在静态 buff 表里，实例工厂 `create_buff_instance()` 会**补登记 `target_dispatch`**——
    不补登记的话这些效果会打一条「XX效果没有定义生效方式」并**静默失效**。
    ⚠️ **可叠层 buff 已有实例时走加层路径，不应用 `runtime_data`**。
    ⚠️ 这类实例带 `from_runtime_data = true`，**读档时不恢复**（按「持续时间已结束」处理）：效果行只存在于实例上，
    数据库模板里那份是对不上的占位值。读档前的 `reset_buff` 已把贡献撤销干净，`on_apply` / `revert` 效果会在读档后的下一帧重新生效一次。
-   **展示**：左上 buff 界面**只对可叠层 buff** 在名称后紧跟 `x{层数}`（如 `燃烧x3`，随后才是持续时间行；现有不可叠层的 buff 显示不变）。
    剩余时间由 `get_buff_time_text()` 格式化：**≤10 秒**保留 1 位小数（`9.5秒`）/ **≤60 秒**整数秒（`45秒`）/ **≤1 小时**`n分钟`（`59分钟`）/ **超过 1 小时**`n小时`（`2小时`）；
    一律**向下取整**（含边界：恰好 10 秒 → `10.0秒`、恰好 60 秒 → `60秒`、恰好 1 小时 → `60分钟`）；`infinite` 不显示时间行。
    层数与**格式化后的时间文本**都存进 `dataset`（`buff_stack` / `buff_have_time`）并参与刷新判断——时间文本放进 dataset 是因为
    1 位小数档需要比"整数秒"更细的比较粒度，否则小数位不会刷新。
    **提示窗残留**：buff 面板是靠 `replaceChildren()` 整体重建的，鼠标正悬停的那一格被删掉时浏览器**不会**补发 `mouseleave`，
    提示窗会一直留在屏幕上。所以调度台用字段 `this.hovering_buff_id` 记录"鼠标停在哪个 buff 上"（`add_buff_show_div()` 给图标挂 `mouseenter` / `mouseleave`，
    **必须用箭头函数**，否则 `addEventListener` 里的 `this` 是图标本身而不是调度台），
    `refresh_buff_show()` 每帧开头调 `close_stale_buff_tooltip()`：**只有那个 buff 已经从两个容器里消失、且提示窗正显示 buff** 时才 `CloseTip()`。
    物品 / 技能等其他提示窗不受影响。

**现有 buff 条目（17 条）**

-   **常规 9 条**（`Data/Buff/Buff_normal.js`）：`test_buff1` / `test_buff2` / `test_buff3`（测试）、`sleep_1` / `get_up_buff`（睡眠 / 起床）、
    `fatigue` / `extreme_fatigue` / `energetic`（疲劳 / 极度疲劳 / 精力充沛）、`burn`（燃烧）。
    `burn` 是唯一带层数与作用域的：`scope:'combat'`、可叠层、`layer_time_ratio: 0.75`、`stack_expire:'reduce_layer'`，
    效果行是 `value + tick + resource + health_point + per_layer`（每秒每层 1 点）；测试入口在 `Game_log_test.js` **测试 2** 的「燃烧 buff 测试」。
-   **菜品 7 条**（`Data/Buff/Buff_dish.js`，2026-09-29 新增）：`grilled_fish` / `big_grilled_fish` / `roasted_crab` / `cooked_mussel` /
    `cooked_animal_meat` / `grilled_mushrooms` / `termite_mushroom_soup`。**id 与菜品物品 id 相同**（同 id 覆盖刷新、不同菜品共存），
    时长写在各条目里，效果行在食用时由实例带入（条目里那份只是占位的默认值）。
-   **调料效果 1 条**（`seasoning_effect`）：全局唯一，承载一份菜的全部调料限时效果；时长与效果行都由食用时传入。
-   **展示**：可叠层的 buff 在名称后紧跟 `x{层数}`；菜品本体 buff 的实例名带「美味的 / 重口味的 / 糟糕的」前缀（读实例 `name`，不读数据库模板），
    「调料效果」这条不带前缀。

**不再使用的旧机制**

-   `Data/Enum/Enum_buff.js` 的 6 张分派白名单：buff 系统改为按效果行上的 `dispatch` 字段分派，不再查这些表。

**存档**：buff 存档内容由实例的 `effects` 数组承载，随 `Player_buff_manage_save` 一起序列化。
读到更早格式（`buff_value` 数组）存档时，**剩余时间照常恢复，一次性效果会在读档后的下一帧重新生效**（不会丢 buff）。
**已知限制**：`stack` 会被写进存档（存的是整个对象），**`load_init()` 现在会把它读回来**（2026.09.24 起），
且**不按层数重算剩余时间**（存档里的 `buff_have_time` 本身就是按存档时的层数算出来的）；存档里没有 `stack` 字段的旧存档按 1 层处理。
`record` / `charges` / `caster` / 施加参数带来的自定义时长数值等字段**尚未纳入存档**——等真有那些 buff 时再加。

### 4.5 配方解锁（2026-10-21 起）

配方状态只有三种（`Player_formula.js` 的 `Player_formula.status`）：`unknow`（还没学会，玩家字典里没有这个 key，配方列表不显示）/ `study`（**已研究**，知道需求但不能制造）/ `know`（完全掌握，可制造）。

现有 5 条解锁途径：

1. **初始解锁**：`Formula.initial_flag = true`，由 `player_get_initial_formulas()` 直接写 `know`；读档时也会补一遍（防旧存档缺初始配方）。
2. **研究**：配方研究界面花「`research.need_num` 个该配方产物 + 当前地点 `disassembly_tool` 等级」，成功后写 `study`；研究**不能**对 `know`/`study` 的配方进行。
3. **图鉴补齐**（老机制）：`study` 的配方，每种材料都在物品图鉴点亮过时升为 `know`（`check_updata_study_formula_by_library()`，只在“首次点亮某个新物品”时跑）。
4. **迷你事件**：`game_events` 的 `get_formula` thing，直接写 `know`（例如 `SYN_carpentry_bench_2`、`SYN_disassembly_tool_1`）。
5. **消耗品（配方书）**：`use_attr` 里 `attr_type == 'get_formula'`，按使用进度阈值给 `know`（木工入门手册 1/2）。

**新增：集齐材料自动解锁**（`auto_know_unlock_flag`）。`Formula` 新增字段 `auto_know_unlock_flag`，**默认 `false`**，由 `set_auto_know_unlock()` 逐条开启。开启后：玩家**还没拥有**（`unknow`）该配方、且配方所需的每种材料都已在物品图鉴点亮过（复用 `Library_manage.is_formula_all_materials_unlocked()`，**不看需求数量**，`study` 状态不处理），就直接写 `know`。

-   触发点两处：`Player_get_item()` 里“首次点亮新物品图鉴”后（紧跟老机制）；读档末尾（`load.js` 的 `init_game()` / `load_save()`，用于按历史图鉴补齐旧存档，接口上已注明以后要收拢进存档版本迁移）。
-   批量解锁走 `Player_get_formulas(ids)`：逐条写状态 + 逐条写 `get_formula` 游戏日志，**只在最后刷新一次**生活技能界面。
-   旧存档缺 `library_save`（`item_library_data` 为 `undefined`）时直接跳过，不抛错。
-   首批开启的只有**烹饪 7 条**（烤鱼串 / 大烤鱼串 / 烤螃蟹 / 熟蚌肉 / 熟兽肉 / 烤蘑菇 / 鸡枞汤），且这 7 条的 `initial_flag` 已改为 `false`——**烹饪配方不再开局全送**，要靠采集/钓鱼/战斗拿到对应食材才会解锁。合成制造 20 条**一条都没开启**，仍靠木工手册与事件解锁。
-   已知副作用：因为不看数量，获得 1 条溪鱼会同时解锁「烤鱼串（1 条）」和「大烤鱼串（3 条）」；烹饪配方理论上仍可研究，但研究要求背包里有该配方产物、而产物只能靠该配方自己做，实际摸不到。
-   配方列表为空时插一行占位提示（只看「玩家一条该技能配方都没有」，被“当前可制造”等筛选条件过滤成空时不显示，保持原来的空白表现）：
    -   烹饪菜品列表（`COK_CD_formula_value_div`）→ `.COK_formula_empty_tip`，文本「尚未学会任何烹饪配方，获得新的食材可能解锁新配方」；
    -   合成制造的「制造」（`SYN_MK_formula_value_div`）与「配方筛选」（`SYN_FM_formula_value_div`）→ `.SYN_formula_empty_tip`，文本「未学会任何制作配方」。
    两个 class 都**不加 `outline`**（外层列表容器本身已有 2px 描边），它们是子元素、不涉及 `gap`。
-   验证：`node _devtools/formula_check/auto_know_unlock_check.mjs`（17 条断言，覆盖数据标记、只看材料不看数量、任意蘑菇集合口径、未标记配方不受影响、重复调用幂等、缺图鉴数据不抛错、批量只刷新一次）。

### 4.6 事件系统（2026-10-22 补记）

事件库只有一份 `game_events`（`js/Data/Game_event/`），按 `type` 分五类：`main_quest` / `side_quest` / `challenge` / `mini_event` / `achievement`（成就类已定义但无实例）。**迷你事件没有重入锁**：`check_mini_event_start()` 里的 `isrepeat` 全仓从未被赋值，`undefined == false` 不成立，所以判断恒通过。

**完成 / 未完成**：`end_mini_event(event_id, flag)` 只有 `flag == 'finish'` 时才写完成标记（`important_nodes.mini_event[event_id] = true`）、广播 `record_event_finish_end` 并写 `finish_event` 日志；其他值只写短期状态 `SGS_<event_id>`。事件出现条件写成 `event_flag <自身id> == false` 时，完成后就会自动消失。

**迷你事件的两个原语**（2026-10-22 新增，只影响用到它们的事件）：

-   **按钮显示条件（统一结构）**：`button.condition` 是一个数组，每项带 `type`：

    | type | 写入方法 | 含义 |
    |---|---|---|
    | `'button'` | `add_process_button_condition(process, btn, 'b2', false, ...)` | 事件内条件：某个按钮是否被按过 |
    | `'attr'` | `add_process_button_attr_condition(process, btn, 'power', '>=', 15)` | 玩家属性达标（读 `get_player_attributes().get_data_attr()` 的**最终值**，含装备加成） |

    判定统一由 `check_mini_event_button_condition()` 按 `type` 分派、**全部满足**才为真；未知 `type` 按不满足处理并打日志。

-   **始终显示**：`add_process_button_always_show(process, btn)` 设 `button.always_show = true`。渲染时：显示条件满足 → 正常可点；不满足但 `always_show` 为真 → 仍然生成按钮，加 `.player_Control_button_disabled`（`opacity: .5` + `cursor: not-allowed`）且**不挂点击监听**；不满足且未设 `always_show` → 不生成。

-   **点击类型 `leave`**：`add_process_button_click(process_id, button_id, 'leave')`。点击后调用 `end_mini_event(id, 'leave')` → 结束事件、回到地点、**不写完成标记**，所以事件按钮下次仍会出现。用于"这次没通过，以后再来"。

**支线状态型完成条件**（2026-10-22 新增）：`set_finish_condition()` 的 key 以 `GS_` / `UGS_` / `SGS_` / `OP_` 开头时，判定直接读当前游戏状态（`is_flag_condition_id()`），不走 `monitor_data`。这类条件没有行为广播，由 `run_manage.js` 每帧调 `Game_event_manage.check_side_quest_finish()` 发现变化。

**达成条件的显示文案**：脑海-重要事件面板里「每条条件一行」的文字，全部由**唯一入口** `get_IE_condition_ch(event_id, 条件id, monitor_data, monitor_target)`（`js/Function/Function.js`，普通函数、不是类成员）解析，分支都在它内部处理：

-   **状态型条件**（`GS_*` 等）：直接读当前游戏状态，不需要 `monitor_data`；
-   文案按三级优先级取：

1. **任务专属文案**：事件用 `set_condition_text(条件id, 文本键)` 配，内容写在 `texts[任务id][文本键]`；同一条条件被多个任务共用时可以各写各的。
2. **全局条件文案**：`texts[条件id].condition_name`（例如 `GS_unlock_MIN` → 「解锁挖矿」）。
3. **自动生成**：`make_condition_name()`（`PKL_*` / `EE_*`）；数字型条件补 ` (当前/目标)`，布尔型无预设时补「完成」。

主线 / 支线 / 挑战的渲染与增量更新共 6 处都直接调用这个函数。`Game_Event` 只承载 `condition_text` 数据与 `set_condition_text()` 配置入口。**☑/☐ 仍绑定真实条件**，自定义文案只改文字、不改判定；文本键写错时回退到下一级并打日志。

**铁匠铺力量测试**（同批落地）：NPC 地点 `village_smithy_owner`（挂在 `VM_smithy`）下有两个迷你事件——`VM_smithy_study_mining`（首次对话，前置 `unlock_collect_logging` 完成）与 `VM_smithy_power_test_retry`（首次失败后的重试）。两处判定点都放**两个始终显示的按钮**：力量 ≥15 时"试试"可点、另一个半透明不可点；低于 15 时反过来。通过 → 给 `Oak_logs`×1 占位 + 置 `GS_unlock_MIN` → 事件完成；首次事件不论通过与否都会完成，重试事件失败时用 `leave` 退出、不完成。支线 `study_mining` 的完成条件已从"击杀 10 个训练草人"改为 `GS_unlock_MIN`。

**已知限制**：支线的状态型条件靠每帧轮询发现变化（开销是每帧几个布尔比较）。没有更好的触发点是因为 `set_flag` 写入点极多，直接回调会形成反向依赖与递归风险。改进方向记在 `docs/roadmap.md`。

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

**配方列表的产物提示窗**（2026-10-21 起）：烹饪菜品列表（`COK_CD_formula_value_div`）与合成制造的「制造」「配方筛选」两个列表（`SYN_MK_*` / `SYN_FM_*`）里，每条配方右侧的**产物文本**（`.formula_value_r`）都挂了物品详情提示窗：
`Dom_function.js` 的 `add_formula_product_tooltip(product_div, formula_id)` 按配方造一个**白板产物对象**（不带调料等实例数据），直接用现成的 `formula_product` 提示类型（= `item`，与背包/商店同一套渲染）。
产物不是物品（例如工作台升级）或数据缺失时**只打一条日志、不挂提示窗**。左侧的材料文本本轮**没有**加提示。

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

见 `everything_with_me_idle/Version.txt`（开发日志）。截至 2026.10.22 为 **V0.3.10**。

**阶段状态**：烹饪系统已告一段落——配方侧（集齐材料自动解锁）与界面侧（空列表提示）闭环，剩余产出链（调料 / 干制品 / 工作台）已转为 `docs/roadmap.md` #3~#5，调味规则转 #6/#7；本阶段收尾记录见 `docs/archive/cooking_2026-10.md`。下一阶段方向：开发其他系统的内容。
