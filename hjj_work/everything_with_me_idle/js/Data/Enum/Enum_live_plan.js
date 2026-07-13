import { add_Enum_Array, add_Enum_Object } from './Enum_class.js';
//初始化枚举库中与生活技能相关的内容
function init_Enum_live_plan(enums) {
    //探索采集类生活技能
    init_live_plan_explore(enums);
    //原料处理类生活技能
    init_live_plan_process(enums);
    //原料处理类生活技能的工作环境枚举
    init_live_plan_work_bench(enums);
}

//探索采集类生活技能
function init_live_plan_explore(enums) {
    let id = 'live_plan_explore_skill';
    add_Enum_Array(enums, id);
    enums[id] = [
        'logging', //伐木
        'fishing', //钓鱼
        'mining', //挖矿
        'collect', //采集
        'diving', //潜水
        'archaeology', //考古
        'exploration', //探索
    ];
}
//原料处理类生活技能
function init_live_plan_process(enums) {
    let id = 'live_plan_process_skill';
    add_Enum_Array(enums, id);
    enums[id] = [
        'synthesis', //合成制造
        'cooking', //烹饪
        'forging', //锻造
        'elixir_alchemy', //炼丹
        'herbal_bath', //药浴
        'engrave', //雕刻
        'alchemy', //炼金术
    ];
}

function init_live_plan_work_bench(enums) {
    let id;

    //所有工作环境
    id = 'all_work_bench';
    add_Enum_Object(enums, id);
    //该内容在Data.js里自动更新

    //合成制造技能的所有工作环境
    id = 'all_SYN_work_bench';
    add_Enum_Array(enums, id);
    enums[id] = ['carpentry_bench', 'disassembly_tool'];

    //烹饪技能的所有工作环境
    id = 'all_COK_work_bench';
    add_Enum_Array(enums, id);

    //锻造技能的所有工作环境
    id = 'all_FRG_work_bench';
    add_Enum_Array(enums, id);
    //炼丹技能的所有工作环境
    id = 'all_EXA_work_bench';
    add_Enum_Array(enums, id);
    //药浴技能的所有工作环境
    id = 'all_HBB_work_bench';
    add_Enum_Array(enums, id);
    //雕刻技能的所有工作环境
    id = 'all_EGV_work_bench';
    add_Enum_Array(enums, id);
    //炼金术技能的所有工作环境
    id = 'all_ACM_work_bench';
    add_Enum_Array(enums, id);
}
export { init_Enum_live_plan };
