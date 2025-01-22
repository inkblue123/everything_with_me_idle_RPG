import { add_Enemy_object } from './Enemy_class.js';

//战斗地点初始化
function init_Enemy_normal(enemys) {
    let id = 'Training_Dummy';
    add_Enemy_object(enemys, id);
    enemys[id].health_max = 100; //最大血量上限
    // enemys[id].magic_max = 100;//最大魔力上限
    // enemys[id].energy_max = 100;//最大精力上限

    enemys[id].attack = 5; //攻击
    enemys[id].precision = 5; //精准
    enemys[id].critical_chance = 5; //暴击率
    enemys[id].critical_damage = 5; //暴击伤害
    enemys[id].attack_speed = 5; //攻速

    enemys[id].defense = 5; //防御
    enemys[id].evade = 5; //闪避
    enemys[id].resistance_point = 5; //抵抗力
    enemys[id].move_speed = 5; //移动速度
}
export { init_Enemy_normal };
