# SPEC.md — 项目现状说明书

> 本文件**只描述项目已经存在的东西**，是给 AI 和开发者看的"现状地图"。
> **它不是改造指令**，不包含任何"应该改成什么样"的施工要求。
> 未实现的功能请写在 `docs/roadmap.md`。
> 现有代码（`everything_with_me_idle/`）是**基线 / 只读**，请遵守 `AGENTS.md`。

---

## 1. 项目概览

- **名称**：万般诸加吾身（everything_with_me_idle_RPG）
- **类型**：文字挂机 RPG（idle / 放置类）
- **技术栈**：纯前端 Vanilla JavaScript（ES Modules），无框架、无后端、无构建依赖
- **运行方式**：浏览器直接打开 `html/index.html`（需通过 HTTP 或构建产物加载 ES Module）
- **入口链**：`html/index.html` → `js/main.js` → 初始化数据 / 创建界面 / 加载存档 / 启动游戏循环
- **存档**：`window.localStorage` 的 `v0.1` 键，内容为 `JSON` 对象经 base64 编码后的字符串

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
- `updata_game_data()`：更新玩家数值、地点事件、战斗 / 生活技能 / 消耗品逻辑、经验结算、游戏状态
- `updata_game_div()`：刷新画面（战斗进度条、敌人、红蓝绿资源、属性显示）
- `updata_timing_game_data()`：按游戏内时间（分/时/天/月/年）触发定时任务（如矿点重生）

## 4. 核心数据模型

### 4.1 全局对象 `global`（`GameRun/global_manage.js`）
一个 `Global_manage` 单例，聚合管理所有子系统，通过 `get_xxx()` 暴露：
- `time_manage` 帧率与游戏内时间
- `place_manage` 玩家所处地点
- `enemy_manage` 场地内敌人
- `random_manage` 随机数
- `combat_manage` 战斗运算
- `exp_manage` 技能经验 / 升级
- `game_event_manage` 游戏事件（主线/支线/挑战/小事件/成就）
- `global_flag_manage` 游戏状态与标记
- `live_plan_manage` 生活技能
- `store_manage` 商店交易
- `map_manage` 地图
- `consumable_manage` 消耗品使用
- `library_manage` 图鉴

### 4.2 玩家对象 `player`（`Player/Player.js`）
`Player_Object` 单例，子系统包括：
- `player_attributes` 玩家属性（含 `player_energy`）
- `player_buff_manage` buff 管理（`Player/Player_buff.js`，见 §4.4）
- `player_backpack` 背包
- `player_worn` 穿戴装备栏
- `player_skills` 全部技能（主动/被动）
- `player_ASkills_manage` 已装载主动技能槽
- `player_formulas_manage` 玩家学会的配方

提供 `Player_get_item` / `Player_lose_item` / 穿戴脱装备 / `updata_end_attr`（联动战斗、生活技能、消耗品）/ 每帧 `run_player_normal`、`run_player_combat` / 存档 `save_player_class`、读档 `load_player_class`。

### 4.3 数据 / 静态库（`Data/`）
按类别存放静态内容，各库有 `init_xxx()` 初始化函数，`Data.js` 的 `game_data_init()` 统一调用：
- `Text/` 文本（属性名、物品名、技能名、地点名等）
- `Enum/` 枚举（物品大类/小类、属性展示方式、游戏状态、装备类型等）
- `Buff/` buff 定义（数据在 `Buff_normal.js`，类在 `Buff_class.js`，见 §4.4）
- `Item/` 物品（装备 equipment / 消耗品 consumable / 材料 material）
- `Formula/` 配方（合成、烹饪）
- `Game_event/` 游戏事件（主线 `main_quest`、支线 `side_quest`、挑战 `challenge`、小事件 `mini_event`）
- `Place/` 地点（普通 / 战斗 / NPC / 商店 / 资源 / 其他）
- `Skill/` 技能（玩家主动/被动、敌人主动/被动、附加/基础）
- `Enemy/` 敌人（普通 / 鱼 / 矿石 / 树等）
- `Map/` 地图（区域及其地点坐标）

`Data.js` 里还有若干**自动补齐逻辑**，避免手动维护遗漏：
- 自动把各事件类型填入 `enums.important_nodes`
- 自动收集物品小类进枚举并去重
- 自动生成组合型属性（如"伐木工具伐木伤害"）到枚举与文本库
- 自动汇总原料处理类生活技能的工作环境
- 校验每个地点是否都定义了地图信息

### 4.4 buff 系统（2026.09.18 改造后）

buff 系统已从「三元组效果行 + 枚举白名单分派」改造为「**声明式效果行 + 按效果目标分派**」。

**文件**
- **数据**：`Data/Buff/Buff_normal.js`。逐条用 `buffs[id].set_time_type(...)` 与
  `buffs[id].add_buff_effect(out, when, dispatch, target, value, per_layer, revert)` 声明
  （方法定义在 `Data/Buff/Buff_class.js`，7 个参数的顺序与含义见那里的注释）。字段含义：
  `out` 产出类型（本期恒为 `'value'`）/ `when` 时机（`'tick'` 或 `'on_apply'`）/ `dispatch` 分发给谁 /
  `target` 改哪个东西 / `value` 数值 / `per_layer` 是否乘层数 / `revert` 移除时是否撤销
- **运行**：`Player/Player_buff.js`，导出 `Player_Buff_Manage`（接口与改造前一致，所以各调用点无需改动）。
  `init()` 会扫一遍 buff 数据库汇总出 `target_dispatch` 表（效果目标 → 分发给谁），`restart_end_buff()` 按它决定调哪个接口。
- **数据自检**：`Buff_normal.js` 的 `check_buff_data()`，由 `init_normal_buff()` 在数据装完后调用，**只打警告、不阻止启动**。
  目前只检查一条：资源类（`dispatch:'resource'`）效果不得声明 `revert:true`——给出去的血不该因为 buff 消失被倒着算回去。

**不再使用的旧机制**
- `Data/Enum/Enum_buff.js` 的 6 张分派白名单：buff 系统改为按效果行上的 `dispatch` 字段分派，不再查这些表。

**存档**：buff 存档内容由实例的 `effects` 数组承载，随 `Player_buff_manage_save` 一起序列化。
读到更早格式（`buff_value` 数组）存档时，**剩余时间照常恢复，一次性效果会在读档后的下一帧重新生效**（不会丢 buff）。

## 5. 界面布局（`Dom/`）

`create_game_dom()` 构建的界面，整个页面分上下两块（上 95% 游戏主体、下 5% 设置），游戏主体左 1/3 玩家相关、右 2/3 事件：
- 左上：玩家状态 `player_status`
- 左下：战斗规划 `Combat_plan`（背包 / 主动技能规划）
- 中下：玩家控制 `control`
- 右下：游戏日志 `game_log`（脑海 / 图鉴）
- 中上非战斗：生活规划 `Live_plan`、商店 `Store`（默认隐藏）、地图 `Map`
- 战斗时：战斗界面 `Combat`
- 设置界面 `Option`、随鼠标 tooltip `Tooltip`

生活技能分两大类：
- **探索采集**（Explore_collection）：伐木 logging / 挖矿 mining / 采集 collect / 钓鱼 fishing / 潜水 diving / 考古 archaeology / 探索 exploration
- **原料处理**（Material_handling）：合成制造 SYN / 烹饪 COK / 锻造 forging / 镌刻 engrave / 炼丹 EXA / 草药浴 herbal_bath / 蒸馏 EGV / 炼金 alchemy / 仙丹 ACM

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
- 序列化：`JSON.stringify` → base64 编码（`utf8_to_b64`）
- 读档：base64 解码 → `JSON.parse` → 逐子系统 `load_xxx()`
- 支持导入/导出（明文或 base64 两种格式）、删除存档

## 7. 当前版本

见 `everything_with_me_idle/Version.txt`（开发日志）。截至 2026.08.27 为 **V0.3.1**，近期方向：buff 系统兼容性升级、烹饪技能开发、商店回购、地图事件提示、下拉框通用化等。
