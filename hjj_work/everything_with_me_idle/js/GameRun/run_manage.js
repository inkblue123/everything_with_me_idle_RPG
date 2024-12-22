import { player } from '../Player.js';
import { items } from '../Data/Item/Item.js';
import { addElement } from '../Function/Dom_function.js';
import { update_HP, update_MP, update_ENP, update_BP_value } from '../Function/Update_func.js';
import { texts } from '../Data/Text/Text.js';

//更新属性展示表格中的数值
function update_attribute_show() {
    const Player_att = document.getElementById('attribute_show');

    Player_att.children[0].children[0].innerText = `攻击\n${player.attack}`;
    Player_att.children[0].children[1].innerText = `精准\n${player.precision}`;
    Player_att.children[0].children[2].innerText = `暴击率\n${player.critical_chance}`;
    Player_att.children[0].children[3].innerText = `暴击伤害\n${player.critical_damage}`;
    Player_att.children[0].children[4].innerText = `攻速\n${player.attack_speed}`;
    Player_att.children[0].children[5].innerText = `防御\n${player.defense}`;
    Player_att.children[0].children[6].innerText = `闪避\n${player.evade}`;
    Player_att.children[0].children[7].innerText = `抵抗力\n${player.resistance_point}`;
    Player_att.children[0].children[8].innerText = `移动速度\n${player.move_speed}`;

    Player_att.children[1].children[0].innerText = `体格\n${player.physique}`;
    Player_att.children[1].children[1].innerText = `经脉\n${player.Meridians}`;
    Player_att.children[1].children[2].innerText = `魂魄\n${player.soul}`;
    Player_att.children[1].children[3].innerText = `力量\n${player.power}`;
    Player_att.children[1].children[4].innerText = `敏捷\n${player.agile}`;
    Player_att.children[1].children[5].innerText = `智力\n${player.intelligence}`;
    Player_att.children[1].children[6].innerText = `技巧\n${player.technique}`;
}

//更新游戏界面中的内容
function update_game() {
    //用玩家信息初始化界面内的信息
    update_HP();
    update_MP();
    update_ENP();
    update_attribute_show();
    update_BP_value();
}

export { update_game };
