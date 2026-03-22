import { add_Formula_object } from './Formula_class.js';

//合成制造技能的配方
function init_Synthesis_Formula(formulas) {
    let id;

    id = 'SYN_Oak_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'null'); //初始解锁，合成制造技能，无子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('Oak_logs', 5); //橡树原木，5个
    formulas[id].set_formula_product('Oak_board', 2); //橡木板，2个

    id = 'SYN_Willow_board_1';
    add_Formula_object(formulas, id);
    formulas[id].init_formula_data(true, 'synthesis', 'null'); //初始解锁，合成制造技能，无子功能
    formulas[id].add_formula_work_bench('carpentry_bench', 1); //需要木匠台1级
    formulas[id].add_formula_material('Willow_logs', 3); //柳树原木，3个
    formulas[id].set_formula_product('Willow_board', 1); //橡木板，1个
}

export { init_Synthesis_Formula };
