import { add_Formula_object } from './Formula_class.js';

//原料加工技能的配方
function init_Material_Processing_Formula(formulas) {
    let id = 'test_Formula';
    add_Formula_object(formulas, id);
    formulas[id].Work_bench = [{ id: 'carpentry_bench', level: 1 }]; //配方需要的工作台条件
    formulas[id].material = [{ id: 'Oak_logs', num: 1 }]; //配方需要的材料
    formulas[id].product = [
        { id: 'Oak_board', num: 2 },
        { id: 'Oak_woodchip', num: 1 },
    ]; //配方的产物
    formulas[id].main_product = 'Oak_board'; //配方的主要产物
    formulas[id].skill = 'material_process'; //配方所属的技能
}

export { init_Material_Processing_Formula };
