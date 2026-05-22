import { add_Formula_object } from './Formula_class.js';

//合成制造技能的配方
function init_Synthesis_Formula(formulas) {
    //L1级的产出材料的配方
    SYN_Material_L1_Formula(formulas);
    //L1级的产出装备的配方
    SYN_Equipment_L1_Formula(formulas);

    //合成制造技能的工作台升级配方
    SYN_work_bench(formulas);
}
//L1级的产出材料的配方
function SYN_Material_L1_Formula(formulas) {
    let id;

    id = 'SYN_Oak_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Oak_logs', 5); //橡树原木，5个
    formulas[id].set_formula_product('Oak_board', 2); //橡木板，2个
    id = 'SYN_Oak_woodchip_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('Oak_logs', 1); //橡树原木，1个
    formulas[id].set_formula_product('Oak_woodchip', 10); //橡树木屑，10个

    id = 'SYN_Willow_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Willow_logs', 3); //柳树原木，3个
    formulas[id].set_formula_product('Willow_board', 1); //柳木板，1个
    id = 'SYN_Willow_woodchip_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('Willow_logs', 1); //柳树原木，1个
    formulas[id].set_formula_product('Willow_woodchip', 10); //柳树木屑，10个

    id = 'SYN_birch_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('birch_logs', 7); //桦树原木，7个
    formulas[id].set_formula_product('birch_board', 2); //桦木板，2个
    id = 'SYN_birch_woodchip_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('birch_logs', 1); //桦树原木，1个
    formulas[id].set_formula_product('birch_woodchip', 10); //桦树木屑，10个

    id = 'SYN_normal_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('woodchip', 100); //任意木屑，100个
    formulas[id].set_formula_product('normal_board', 1); //普通木板，1个
}
//L1级的产出装备的配方
function SYN_Equipment_L1_Formula(formulas) {
    let id;

    id = 'SYN_wood_sticks_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Oak_board', 5); //橡木板，5个
    formulas[id].set_formula_product('wood_sticks', 1, 'ordinary'); //木制棍棒，1个

    id = 'SYN_wood_hammers_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Oak_board', 5); //橡木板，5个
    formulas[id].set_formula_product('wood_hammers', 1, 'ordinary'); //木制大锤，1个

    id = 'SYN_wood_sword_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Willow_board', 5); //柳木板，5个
    formulas[id].set_formula_product('wood_sword', 1, 'ordinary'); //木剑，1个

    id = 'SYN_wood_battle_axe_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('Willow_board', 5); //柳木板，5个
    formulas[id].set_formula_product('wood_battle_axe', 1, 'ordinary'); //木制战斧，1个

    id = 'SYN_wood_dagger_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('birch_board', 5); //桦木板，5个
    formulas[id].set_formula_product('wood_dagger', 1, 'ordinary'); //木匕首，1个

    id = 'SYN_wood_helmet_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('normal_board', 6); //普通木板，6个
    formulas[id].set_formula_product('wood_helmet', 1, 'ordinary'); //木制头盔，1个

    id = 'SYN_wood_chest_armor_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('normal_board', 10); //普通木板，10个
    formulas[id].set_formula_product('wood_chest_armor', 1, 'ordinary'); //木制胸甲，1个

    id = 'SYN_wood_leg_armor_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('normal_board', 8); //普通木板，8个
    formulas[id].set_formula_product('wood_leg_armor', 1, 'ordinary'); //木制腿甲，1个

    id = 'SYN_wood_shoes_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_MK', 'SYN_FM'); //初始解锁，合成制造技能，属于 制造 和 配方筛选的制造 子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要木匠台1级
    formulas[id].add_formula_material('normal_board', 5); //普通木板，5个
    formulas[id].set_formula_product('wood_shoes', 1, 'ordinary'); //木制鞋子，1个
}

function SYN_work_bench(formulas) {
    let id;

    //工作台升到1级
    //carpentry_bench工作台任何地点初始都是1级，应该不会调用这个
    // id = 'SYN_carpentry_bench_1';
    // add_Formula_object(formulas, id);
    // formulas[id].init_formula_data(true, 'synthesis', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    // formulas[id].add_formula_work_bench('carpentry_bench', 0); //需要工作台0级
    // formulas[id].add_formula_material('wood_board', 5); //任意木板，5个
    // formulas[id].add_formula_material('iron_parts', 2); //铁质零件，2个
    // formulas[id].set_formula_product('carpentry_bench', 1); //工作台，1级

    //工作台升到2级
    id = 'SYN_carpentry_bench_2';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要工作台0级
    formulas[id].add_formula_material('wood_board', 5); //任意木板，5个
    formulas[id].add_formula_material('iron_parts', 2); //铁质零件，2个
    formulas[id].set_formula_product('carpentry_bench', 2); //工作台，1级

    //工作台升到3级
    id = 'SYN_carpentry_bench_3';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(false, 'synthesis', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 2); //需要工作台1级
    formulas[id].add_formula_material('frost_marrow_ice', 1); //寒髓松冰晶，1个
    formulas[id].add_formula_material('lightning_branch', 1); //雷击尖枝，1个
    formulas[id].add_formula_material('iron_ingot', 5); //铁锭，5个
    formulas[id].set_formula_product('carpentry_bench', 3); //工作台，2级

    //拆解工具升到1级
    id = 'SYN_disassembly_tool_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'SYN_EN'); //初始解锁，合成制造技能，属于工作环境详情子功能
    formulas[id].add_formula_work_bench('disassembly_tool', 0); //需要拆解工具0级
    formulas[id].add_formula_material('viresilver_stem', 1); //绿银草茎，1个
    formulas[id].add_formula_material('high_quality_fur', 1); //优质毛皮，1个
    formulas[id].add_formula_material('iron_ingot', 5); //铁锭，5个
    formulas[id].set_formula_product('disassembly_tool', 1); //拆解工具，1级
}

export { init_Synthesis_Formula };
