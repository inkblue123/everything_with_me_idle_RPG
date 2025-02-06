import { init_Passive_skill } from './Passive_skill/Passive_skill.js';
import { init_Active_skill } from './Active_skill/Active_skill.js';
//技能的类别枚举
// const skill_type = Object.freeze({
//     //根基技能 basic
//     //暂无
//     //战斗技能 combat
//     Weapon: 'weapon_C', //武器技能
//     Stance: 'stance_C', //战斗姿态技能
//     Environment: 'environment_C', //环境适应技能
//     Enemy: 'enemy_C', //对敌精通技能
//     //生活技能 life
//     Raw: 'raw_L', //原料获取技能
//     Process: 'process_L', //原料加工技能
//     Finish: 'finish_L', //成品使用技能
//     Recycle: 'recycle_L', //回收利用技能
//     //主动技能 active
//     // 暂无
//     //特殊功法 super
//     // 暂无
// });
var skills = new Object();

//初始化技能数据库中与被动技能相关的内容
init_Passive_skill(skills);
//初始化技能数据库中与主动技能相关的内容
init_Active_skill(skills);

export { skills };
