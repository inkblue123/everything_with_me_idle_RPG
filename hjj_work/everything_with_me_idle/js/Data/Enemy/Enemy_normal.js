import { add_Enemy_object } from './Enemy_class.js';

//敌人数据库初始化
function init_Enemy_normal(enemys) {
    let id = 'Training_Dummy';
    add_Enemy_object(enemys, id);
    enemys[id].init_attack_attr(50, 5, 5, 5, 5); //攻击属性初始化
    enemys[id].init_defense_attr(5, 5, 5, 5, 5); //防御属性初始化
    enemys[id].init_survival_attr(5, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['no_attack']; //敌人技能初始化

    id = 'Attack_Dummy';
    add_Enemy_object(enemys, id);
    enemys[id].init_attack_attr(50, 5, 5, 5, 5); //攻击属性初始化
    enemys[id].init_defense_attr(5, 5, 5, 5, 5); //防御属性初始化
    enemys[id].init_survival_attr(2, 0, 1); //生存属性初始化
    enemys[id].active_skill = ['normal_attack']; //敌人技能初始化
}
export { init_Enemy_normal };
