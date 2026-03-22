import { init_Synthesis_Formula } from './Formula_Synthesis.js';

var formulas = new Object();

function init_formulas() {
    //初始化合成制造配方
    init_Synthesis_Formula(formulas);
    // //初始化锻造配方
    // init_Blacksmithing_Formula(formulas);
    // //初始化成品加工配方
    // init_Advanced_Crafting_Formula(formulas);
    // //初始化烹饪配方
    // init_Cooking_Formula(formulas);
    // //初始化炼丹配方
    // init_elixir_alchemy_Formula(formulas);
    // //初始化药浴配方
    // init_Herbal_Bath_Formula(formulas);
    // //初始化炼金术配方
    // init_Alchemy_Formula(formulas);
}

export { formulas, init_formulas };
