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
    Player_att.children[1].children[1].innerText = `魂魄\n${player.soul}`;
    Player_att.children[1].children[2].innerText = `经脉\n${player.Meridians}`;
    Player_att.children[1].children[3].innerText = `力量\n${player.power}`;
    Player_att.children[1].children[4].innerText = `敏捷\n${player.agile}`;
    Player_att.children[1].children[5].innerText = `技巧\n${player.technique}`;
    Player_att.children[1].children[6].innerText = `智力\n${player.intelligence}`;
}

function update_player_name() {
    const name_input = document.getElementById("Player_name");
    if (name_input.value.toString().trim().length > 0) {
        player.name = name_input.value;
    } else {
        player.name = "我";
    }
    name_input.value = player.name;
}

export { update_HP, update_MP, update_ENP, update_attribute_show, update_player_name };
