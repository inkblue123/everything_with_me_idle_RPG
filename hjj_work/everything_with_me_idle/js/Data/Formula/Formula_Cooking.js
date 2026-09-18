import { add_Formula_object } from './Formula_class.js';

//合成制造技能的配方
function init_Cooking_Formula(formulas) {
    //L1级的产出的配方
    COK_L1_Formula(formulas);

    //合成制造技能的工作台升级配方
    COK_work_bench(formulas);
}
//L1级的产出材料的配方
function COK_L1_Formula(formulas) {
    let id;

    id = 'COK_grilled_fish_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'cooking', 'COK_CD'); //初始解锁，烹饪技能，属于 烹饪菜品 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('creek_fish', 1); //溪鱼，1个
    formulas[id].set_formula_product('grilled_fish', 1); //烤鱼串，1个
    formulas[id].set_formula_exp('make_exp', 1); //制作时获得经验
    formulas[id].set_formula_research(3, 1); //研究需求：3个物品，1级拆解工具

    // id = 'COK_red_berry_1';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(true, 'cooking', 'COK_CD'); //初始解锁，烹饪技能，属于 烹饪菜品 子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    // formulas[id].add_formula_material('creek_fish', 1); //溪鱼，1个
    // formulas[id].set_formula_product('red_berry', 1); //测试样例配方，暂注释
    // formulas[id].set_formula_exp('make_exp', 1); //制作时获得经验
    // formulas[id].set_formula_research(3, 1); //研究需求：3个物品，1级拆解工具
    // id = 'COK_yellow_berry_1';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(true, 'cooking', 'COK_CD'); //初始解锁，烹饪技能，属于 烹饪菜品 子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    // formulas[id].add_formula_material('creek_fish', 1); //溪鱼，1个
    // formulas[id].set_formula_product('yellow_berry', 1); //测试样例配方，暂注释
    // formulas[id].set_formula_exp('make_exp', 1); //制作时获得经验
    // formulas[id].set_formula_research(3, 1); //研究需求：3个物品，1级拆解工具
    // id = 'COK_black_berry_1';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(true, 'cooking', 'COK_CD'); //初始解锁，烹饪技能，属于 烹饪菜品 子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    // formulas[id].add_formula_material('creek_fish', 1); //溪鱼，1个
    // formulas[id].set_formula_product('black_berry', 1); //测试样例配方，暂注释
    // formulas[id].set_formula_exp('make_exp', 1); //制作时获得经验
    // formulas[id].set_formula_research(3, 1); //研究需求：3个物品，1级拆解工具
}

function COK_work_bench(formulas) {
    let id;

    //工作台升到1级
    //carpentry_bench工作台任何地点初始都是1级，应该不会调用这个
    // id = 'SYN_carpentry_bench_1';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(true, 'cooking', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 0); //需要工作台0级
    // formulas[id].add_formula_material('wood_board', 5); //任意木板，5个
    // formulas[id].add_formula_material('iron_parts', 2); //铁质零件，2个
    // formulas[id].set_formula_product('carpentry_bench', 1); //工作台，1级

    //工作台升到2级
    // id = 'SYN_carpentry_bench_2';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(false, 'cooking', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要工作台0级
    // formulas[id].add_formula_material('wood_board', 5); //任意木板，5个
    // formulas[id].add_formula_material('iron_parts', 2); //铁质零件，2个
    // formulas[id].set_formula_product('carpentry_bench', 2); //工作台，1级

    // //工作台升到3级
    // id = 'SYN_carpentry_bench_3';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(false, 'cooking', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要工作台1级
    // formulas[id].add_formula_material('frost_marrow_ice', 1); //寒髓松冰晶，1个
    // formulas[id].add_formula_material('lightning_branch', 1); //雷击尖枝，1个
    // formulas[id].add_formula_material('iron_ingot', 5); //铁锭，5个
    // formulas[id].set_formula_product('carpentry_bench', 3); //工作台，2级
}

export { init_Cooking_Formula };
