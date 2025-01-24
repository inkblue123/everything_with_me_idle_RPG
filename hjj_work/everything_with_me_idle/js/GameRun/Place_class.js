//场地内的敌人对象
class place_enemy {
    constructor(id) {
        this.id = id; //唯一id
        this.statu = false; //死活状态
        this.num = 0; //玩家拥有该物品总数
    }
}

//记录地点相关内容的对象
export class Place_manage {
    constructor() {
        this.now_place;
        this.last_place;
        //战斗场地中的相关数据
        this.combat_place_enemys = new Object();
    }
    init() {
        this.combat_place_enemys['near_enemy_field'] = new Array();
        this.combat_place_enemys['in_enemy_field'] = new Array();
        this.combat_place_enemys['far_enemy_field'] = new Array();
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                let enemy = new place_enemy(0);
                field.push(enemy);
            }
        }
    }

    set_now_place(place) {
        this.last_place = this.now_place;
        this.now_place = place;
    }
    get_now_place() {
        return this.now_place;
    }
    get_last_place() {
        return this.last_place;
    }
    get_combat_place_enemys() {
        return this.combat_place_enemys;
    }
    get_combat_place_enemynum(enemy_id) {
        let enemy_num = 0;
        for (let key in this.combat_place_enemys) {
            let field = this.combat_place_enemys[key];
            for (let i = 0; i < 9; i++) {
                if (field[i].statu) {
                    if (!enemy_id) {
                        //如果没指定敌人id，获取全部敌人的数量
                        enemy_num++;
                    } else if (enemy_slot.id == enemy_id) {
                        //获取指定id的敌人数量
                        enemy_num++;
                    }
                }
            }
        }
        return enemy_num;
    }
    add_enemy(place_x, place_y, enemy_id) {
        if (place_x != 'near_enemy_field' && place_x != 'in_enemy_field' && place_x != 'far_enemy_field') {
            console.log(`add_enemy：输入的目标地点错误 ${place_x}`);
        }
        let field = this.combat_place_enemys[place_x];
        field[place_y] = new place_enemy(enemy_id);
        field[place_y].statu = true;
        return field[place_y];
    }
}
