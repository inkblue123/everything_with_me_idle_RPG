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

export { update_HP, update_MP, update_ENP };
