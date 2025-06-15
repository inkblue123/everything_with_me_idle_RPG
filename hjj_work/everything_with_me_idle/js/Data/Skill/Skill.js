import { init_Plyaer_Passive_skill } from './player_skill/Player_Passive_skill.js';
import { init_Player_Active_skill } from './player_skill/Player_Active_skill.js';
import { init_Enemy_Active_skill } from './enemy_skill/Enemy_Active_skill.js';
import { init_base_Active_skill } from './skill_addition/Base_skill.js';
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
//组成主动技能的各个基础技能
var B_skills = new Object();
//初始化主动技能需要的基础技能参数
init_base_Active_skill(B_skills);

//玩家所有技能
var P_skills = new Object();
//初始化技能数据库中与玩家被动技能相关的内容
init_Plyaer_Passive_skill(P_skills);
//初始化技能数据库中与玩家主动技能相关的内容
init_Player_Active_skill(P_skills);

//敌人所有技能
var E_skills = new Object();
//初始化技能数据库中与敌人被动技能相关的内容
// init_Enemy_Passive_skill(P_skills);
//初始化技能数据库中与敌人主动技能相关的内容
init_Enemy_Active_skill(E_skills);

export { P_skills, E_skills, B_skills };
