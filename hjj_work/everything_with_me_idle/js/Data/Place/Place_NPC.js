import { add_NPC_Place } from './Place_class.js';

function init_Place_NPC(places) {
    //村庄区域的npc
    init_village_NPC(places);
    //村外后山区域的npc
    init_village_backhill_NPC(places);
}
//村庄区域的npc
function init_village_NPC(places) {
    let id;
    let area = 'village';

    id = 'village_Combat_coach'; //兵营教练
    add_NPC_Place(places, id, area);
    //有条件出现的事件入口
    places[id].add_condition_behavior('new_player_combat_test');
    places[id].add_condition_behavior('new_player_teach_1', 'new_player_teach_2', 'new_player_teach_3');
    //有条件出现的见面对话，按优先级从高到低排列
    places[id].add_condition_meet_chat('text1', 'SGS_new_player_combat_test', 'exit');
    places[id].add_condition_meet_chat('text2', 'SGS_new_player_combat_test', 'death');
    places[id].add_condition_meet_chat('text3', 'SGS_new_player_combat_test', 'finish');
    places[id].add_condition_meet_chat('default_meet_chat', 'new_player_combat_test', true);

    id = 'village_woodshop_owner'; //木工坊老板
    add_NPC_Place(places, id, area);
    //有条件出现的事件入口
    places[id].add_condition_behavior('VM_woodshop_study_fishing');
    //有条件出现的见面对话，按优先级排列
}
//村外后山区域的npc
function init_village_backhill_NPC(places) {
    let id;
    let area = 'village_backhill';

    id = 'village_old_woman'; //村口老妇
    add_NPC_Place(places, id, area);
    //有条件出现的事件入口
    places[id].add_condition_behavior('unlock_foraging_logging');
    //有条件出现的见面对话，按优先级排列
}

export { init_Place_NPC };
