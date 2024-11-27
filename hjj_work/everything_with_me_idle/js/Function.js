import { player } from "./Player.js";

function update_HP() {
    const HP_bar = document.getElementById("HP_bar");

    HP_bar.children[0].children[0].style.width = `${(player.health_point / player.health_max) * 100}%`;
    HP_bar.children[1].innerText = `${Math.floor(player.health_point)}/${Math.ceil(player.health_max)} 生命`;
}

function update_MP() {
    const MP_bar = document.getElementById("MP_bar");

    MP_bar.children[0].children[0].style.width = `${(player.magic_point / player.magic_max) * 100}%`;
    MP_bar.children[1].innerText = `${Math.floor(player.magic_point)}/${Math.ceil(player.magic_max)} 魔力`;
}

function update_ENP() {
    const ENP_bar = document.getElementById("ENP_bar");

    ENP_bar.children[0].children[0].style.width = `${(player.energy_point / player.energy_max) * 100}%`;
    ENP_bar.children[1].innerText = `${Math.floor(player.energy_point)}/${Math.ceil(player.energy_max)} 精力`;
}

function update_attribute_show() {
    const Player_att = document.getElementById("attribute_show");

    Player_att.children[0].children[0].innerText = `${player.attack}攻击`;
    Player_att.children[0].children[1].innerText = `${player.precision}精准`;
    Player_att.children[0].children[2].innerText = `${player.critical_chance}暴击率`;
    Player_att.children[0].children[3].innerText = `${player.critical_damage}暴击伤害`;
    Player_att.children[0].children[4].innerText = `${player.attack_speed}攻速`;
    Player_att.children[0].children[5].innerText = `${player.defense}防御`;
    Player_att.children[0].children[6].innerText = `${player.evade}闪避`;
    Player_att.children[0].children[7].innerText = `${player.resistance_point}抵抗力`;
    Player_att.children[0].children[8].innerText = `${player.move_speed}移动速度`;

    Player_att.children[1].children[0].innerText = `${player.physique}体格`;
    Player_att.children[1].children[1].innerText = `${player.Meridians}经脉`;
    Player_att.children[1].children[2].innerText = `${player.power}力量`;
    Player_att.children[1].children[3].innerText = `${player.agile}敏捷`;
    Player_att.children[1].children[4].innerText = `${player.technique}技巧`;
    Player_att.children[1].children[5].innerText = `${player.intelligence}智力`;
    Player_att.children[1].children[6].innerText = `${player.soul}魂魄`;
}

export { update_HP, update_MP, update_ENP, update_attribute_show };
