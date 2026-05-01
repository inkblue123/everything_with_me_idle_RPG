import { is_Empty_Object } from '../../Function/Function.js';
import { texts } from '../Text/Text.js';
import { items } from '../Item/Item.js';
//配方数据库
export class Formula {
    constructor(id) {
        this.id = id; //唯一id
        this.initial_flag; //是否初始解锁

        this.type; //配方类型，指定材料或者
        this.skill; //配方归属那个生活技能
        this.skill_min; //配方归属生活技能的哪个子功能下
        this.work_bench = new Array(); //配方所需工作环境
        this.material = new Array(); //配方所需材料
        this.product = new Object(); //配方产出
    }

    //设置配方基本参数
    init_formula_data(initial_flag, skill, skill_min) {
        this.initial_flag = initial_flag;
        this.skill = skill;
        this.skill_min = skill_min;
    }
    //为这个配方添加一个需要的工作环境
    add_formula_work_bench(work_bench_id, level) {
        let flag = false;
        for (let WB_obj of this.work_bench) {
            if (WB_obj.id == work_bench_id) {
                flag = true;
                break;
            }
        }
        if (flag) {
            console.log('%s配方添加%s工作环境时曾有过同id的环境，id冲突，需要检查配方数据库', this.id, work_bench_id);
            return;
        }
        let work_bench_obj = new Object();
        work_bench_obj.id = work_bench_id;
        work_bench_obj.level = level;
        this.work_bench.push(work_bench_obj);
    }
    //为这个配方添加一种需要的材料
    add_formula_material(material_id, material_num) {
        let flag = false;
        for (let MT_obj of this.material) {
            if (MT_obj.id == material_id) {
                flag = true;
                break;
            }
        }
        if (flag) {
            console.log('%s配方添加%s需求材料时曾有过同id的需求材料，id冲突，需要检查配方数据库', this.id, work_bench_id);
            return;
        }
        let material_obj = new Object();
        material_obj.id = material_id;
        material_obj.num = material_num;
        this.material.push(material_obj);
    }
    //设置这个配方的产出
    set_formula_product(product_id, product_num, ex_data) {
        this.product.id = product_id;
        this.product.num = product_num;
        //设置物品的额外属性
        if (items[product_id].main_type == 'equipment') {
            if (is_Empty_Object(ex_data)) {
                console.log('%s配方的产物没有定义额外属性', this.id);
                return;
            }
            //物品是装备，产物信息还应该有：稀有度
            this.product.equip_rarity = ex_data;
        } else if (items[product_id].main_type == 'material') {
            //物品是材料，没有独特属性
        } else if (items[product_id].main_type == 'consumable') {
            //物品是消耗品，产物信息还应该有：暂无
        }
    }
}
function add_Formula_object(formulas, newid) {
    if (formulas[newid] === undefined) {
        formulas[newid] = new Formula(newid);
    } else {
        console.log('创建formulas[%s]时已有同名对象，需要确认是否会清空原有内容', newid);
    }
}

export { add_Formula_object };
