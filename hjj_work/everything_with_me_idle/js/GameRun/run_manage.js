import { player } from '../Player/Player.js';
import { items } from '../Data/Item/Item.js';
import { addElement } from '../Function/Dom_function.js';
import { updata_HP, updata_MP, updata_ENP, updata_BP_value, updata_attribute_show } from '../Function/Updata_func.js';
import { texts } from '../Data/Text/Text.js';

//更新游戏界面中的内容
function updata_game() {
    //用玩家信息初始化界面内的信息
    updata_HP();
    updata_MP();
    updata_ENP();
    updata_attribute_show();
    updata_BP_value();
}

export { updata_game };
