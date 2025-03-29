import { init_Challenge } from './Challenge.js';
import { init_Page } from './page.js';

//初始化游戏事件库
var game_events = new Object();

//挑战部分初始化
init_Challenge(game_events);
//章节部分初始化
init_Page(game_events);

export { game_events };
