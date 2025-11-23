import { init_Player_Passive_skill } from './player_skill/Player_Passive_skill.js';
import { init_Player_Active_skill } from './player_skill/Player_Active_skill.js';
import { init_Enemy_Active_skill } from './enemy_skill/Enemy_Active_skill.js';
import { init_base_Active_skill } from './skill_addition/Base_skill.js';
//组成主动技能的各个基础技能
var B_skills = new Object();
//玩家所有技能
var P_skills = new Object();
//敌人所有技能
var E_skills = new Object();
function init_skills() {
    //初始化主动技能需要的基础技能参数
    init_base_Active_skill(B_skills);

    //初始化技能数据库中与玩家被动技能相关的内容
    init_Player_Passive_skill(P_skills);
    //初始化技能数据库中与玩家主动技能相关的内容
    init_Player_Active_skill(P_skills);

    //初始化技能数据库中与敌人被动技能相关的内容
    // init_Enemy_Passive_skill(E_skills);
    //初始化技能数据库中与敌人主动技能相关的内容
    init_Enemy_Active_skill(E_skills);
}

export { P_skills, E_skills, B_skills, init_skills };
