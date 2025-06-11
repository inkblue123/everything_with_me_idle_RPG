import { init_Challenge } from './Challenge.js';
import { init_main_quest } from './main_quest.js';
import { init_mini_event } from './mini_event.js';

//初始化游戏事件库
var game_events = new Object();

//挑战部分初始化
init_Challenge(game_events);
//章节部分初始化
init_main_quest(game_events);
//迷你事件初始化
init_mini_event(game_events);
//成就初始化
// init_achievement(game_events);

export { game_events };
