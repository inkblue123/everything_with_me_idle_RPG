import { init_Synthesis_Formula } from './Formula_Synthesis.js';
import { init_Cooking_Formula } from './Formula_Cooking.js';

var formulas = new Object();

function init_formulas() {
    //初始化合成制造配方
    init_Synthesis_Formula(formulas);
    //初始化烹饪配方
    init_Cooking_Formula(formulas);
    // //初始化锻造配方
    // init_forging_Formula(formulas);
    // //初始化炼丹配方
    // init_elixir_alchemy_Formula(formulas);
    // //初始化药浴配方
    // init_Herbal_Bath_Formula(formulas);
    // //初始化雕刻配方
    // init_Engrave_Formula(formulas);
    // //初始化炼金术配方
    // init_Alchemy_Formula(formulas);
}

export { formulas, init_formulas };
