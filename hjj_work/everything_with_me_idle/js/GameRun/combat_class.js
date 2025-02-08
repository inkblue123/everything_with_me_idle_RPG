class Attack_effect {
    constructor() {
        this.number_times = 0; //攻击次数
        this.base_damage = 0; //攻击基础伤害
    }
}

//战斗管理类
export class Combat_manage {
    constructor() {
        this.player_Attack_effect = new Attack_effect();
    }

    set_player_next_attack(player_Attack_effect) {
        this.player_Attack_effect = player_Attack_effect;
    }
}

var combat_manage = new Combat_manage();

export { combat_manage };
