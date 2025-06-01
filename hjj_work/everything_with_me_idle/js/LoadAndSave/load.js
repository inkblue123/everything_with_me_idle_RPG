import { updata_equipment_show, updata_BP_value, updata_player_active } from '../Function/Updata_func.js';
import { hide_div, Gradient_div } from '../Function/Dom_function.js';
import { global } from '../GameRun/global_class.js';
import { player } from '../Player/Player.js';

//新游戏读档加载
function init_game() {
    let save_str;
    //从浏览器内存中获取存档
    save_str = window.localStorage.getItem('v0.1');

    if (save_str) {
        //base64解密
        console.log('%s', save_str);
        save_str = b64_to_utf8(save_str);
        //把字符串转换成存档对象
        console.log('%s', save_str);
        let save_obj = JSON.parse(save_str);
        //用存档对象里的内容加载游戏
        global.load_global_class(save_obj.global_save);
    } else {
        //没有存档文件，进行新游戏初始化
        new_game_init();
    }
}
//存档
function save_game() {
    let save_obj = new Object();
    //保存需要的游戏参数
    save_obj.global_save = global.save_global_class();

    //将存档对象转换成字符串
    let save_JSON_str = JSON.stringify(save_obj);
    console.log('%s', save_JSON_str);
    //用base64加密
    let save_str = utf8_to_b64(save_JSON_str);
    console.log('%s', save_str);
    //存储到浏览器内存中
    window.localStorage.setItem('v0.1', save_str);
}
//删除当前存档
function delete_save() {
    window.localStorage.setItem('v0.1', '');
}
//导入存档
function load_save() {
    // function load_save(save_str) {
    // let save_str =
    //     'eyJnbG9iYWxfc2F2ZSI6eyJUaW1lX3NhdmUiOnsiZ2FtZV9kYXRlIjp7InllYXIiOjIwMjUsIm1vbnRoIjo0LCJkYXkiOjEsImhvdXJzIjoxNiwibWludXRlcyI6NSwic3RhcnRfdGltZSI6MTc0ODQ4ODk3MTM0Mn19LCJwbGFjZV9zYXZlIjp7Im5vd19wbGFjZSI6InZpbGxhZ2VfaG9tZSJ9fX0=';
    // let save_str =
    //     'eyJnbG9iYWxfc2F2ZSI6eyJUaW1lX3NhdmUiOnsiZ2FtZV9kYXRlIjp7InllYXIiOjIwMjUsIm1vbnRoIjo0LCJkYXkiOjEsImhvdXJzIjoxNiwibWludXRlcyI6MTQsInN0YXJ0X3RpbWUiOjE3NDg0OTc2MzY0ODl9fSwicGxhY2Vfc2F2ZSI6eyJub3dfcGxhY2UiOiJ2aWxsYWdlX0NvbWJhdF9jb2FjaCJ9LCJnbG9iYWxfZmxhZ19zYXZlIjp7ImdhbWVfc3RhdHVzIjp7IkdTX2NvbWJhdF9zdGF0dSI6ZmFsc2UsIkdTX2dhbWVfZXZlbnQiOmZhbHNlfSwiaW1wb3J0YW50X25vZGVzIjp7InBhZ2UiOnt9LCJjaGFsbGVuZ2UiOnt9LCJhY2hpZXZlbWVudCI6e30sIm1pbmlfZXZlbnQiOnsibmV3X3BsYXllcl90ZWFjaF8xIjoiZmluaXNoIn19fX19';
    // let save_str =
    //     'eyJnbG9iYWxfc2F2ZSI6eyJUaW1lX3NhdmUiOnsiZ2FtZV9kYXRlIjp7InllYXIiOjIwMjUsIm1vbnRoIjo0LCJkYXkiOjEsImhvdXJzIjoxNywibWludXRlcyI6NCwic3RhcnRfdGltZSI6MTc0ODQ5OTExNjM4M319LCJwbGFjZV9zYXZlIjp7Im5vd19wbGFjZSI6IlZCX21lbGVlX3RyYWluIiwibGFzdF9ub3JtYWxfcGxhY2UiOiJ2aWxsYWdlX2JhcnJhY2tzIn0sImdsb2JhbF9mbGFnX3NhdmUiOnsiZ2FtZV9zdGF0dXMiOnsiR1NfY29tYmF0X3N0YXR1Ijp0cnVlLCJHU19nYW1lX2V2ZW50IjpmYWxzZX0sImltcG9ydGFudF9ub2RlcyI6eyJwYWdlIjp7fSwiY2hhbGxlbmdlIjp7fSwiYWNoaWV2ZW1lbnQiOnt9LCJtaW5pX2V2ZW50Ijp7Im5ld19wbGF5ZXJfdGVhY2hfMSI6ImZpbmlzaCJ9fX0sImVuZW15X3NhdmUiOnsiY29tYmF0X3BsYWNlX2VuZW15cyI6eyJsaXR0bGVfZGlzdGFuY2UiOlt7fSx7fSx7fSx7fSx7fSx7fSx7fSx7ImlkIjoiVHJhaW5pbmdfRHVtbXkiLCJoZWFsdGhfcG9pbnQiOjAsImF0dGFja19wb2ludCI6MCwic3RhdHUiOmZhbHNlLCJkaXN0YW5jZSI6NDQsImNvbWJhdF9hdHRhY2tfYXR0ciI6e30sImNvbWJhdF9kZWZlbnNlX2F0dHIiOnt9LCJjb21iYXRfc3Vydml2YWxfYXR0ciI6e30sImVuZW15X0F0dGFja19lZmZlY3QiOnsibG9ja19lbmVteV90eXBlIjp7fSwiYXR0YWNrX251bSI6MCwiYmFzZV9kYW1hZ2UiOjAsInByZWNpc2lvbiI6MCwiY3JpdGljYWxfY2hhbmNlIjowLCJjcml0aWNhbF9kYW1hZ2UiOjB9LCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6N30se31dLCJtaWRkbGVfZGlzdGFuY2UiOlt7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fV0sInJlbW90ZV9kaXN0YW5jZSI6W3t9LHt9LHt9LHt9LHt9LHt9LHt9LHt9LHt9XX19fX0=';
    // let save_str =
    //     'eyJnbG9iYWxfc2F2ZSI6eyJUaW1lX3NhdmUiOnsiZ2FtZV9kYXRlIjp7InllYXIiOjIwMjUsIm1vbnRoIjo0LCJkYXkiOjEsImhvdXJzIjoxNywibWludXRlcyI6MjAsInN0YXJ0X3RpbWUiOjE3NDg0OTk0NjIyNzV9fSwicGxhY2Vfc2F2ZSI6eyJub3dfcGxhY2UiOiJWQl9tZWxlZV90cmFpbiIsImxhc3Rfbm9ybWFsX3BsYWNlIjoidmlsbGFnZV9iYXJyYWNrcyJ9LCJnbG9iYWxfZmxhZ19zYXZlIjp7ImdhbWVfc3RhdHVzIjp7IkdTX2NvbWJhdF9zdGF0dSI6dHJ1ZSwiR1NfZ2FtZV9ldmVudCI6ZmFsc2V9LCJpbXBvcnRhbnRfbm9kZXMiOnsicGFnZSI6e30sImNoYWxsZW5nZSI6e30sImFjaGlldmVtZW50Ijp7fSwibWluaV9ldmVudCI6eyJuZXdfcGxheWVyX3RlYWNoXzEiOiJmaW5pc2gifX19LCJlbmVteV9zYXZlIjp7ImNvbWJhdF9wbGFjZV9lbmVteXMiOnsibGl0dGxlX2Rpc3RhbmNlIjpbe30seyJpZCI6IlRyYWluaW5nX0R1bW15IiwiaGVhbHRoX3BvaW50Ijo1LCJhdHRhY2tfcG9pbnQiOjAsInN0YXR1Ijp0cnVlLCJkaXN0YW5jZSI6NDMsImNvbWJhdF9hdHRhY2tfYXR0ciI6eyJhdHRhY2siOjUwLCJwcmVjaXNpb24iOjUsImNyaXRpY2FsX2NoYW5jZSI6NSwiY3JpdGljYWxfZGFtYWdlIjo1LCJhdHRhY2tfc3BlZWQiOjV9LCJjb21iYXRfZGVmZW5zZV9hdHRyIjp7ImRlZmVuc2UiOjUsImV2YWRlIjo1LCJyZXNpc3RhbmNlX3BvaW50Ijo1LCJtb3ZlX3NwZWVkIjo1fSwiY29tYmF0X3N1cnZpdmFsX2F0dHIiOnsiaGVhbHRoX21heCI6NSwibWFnaWNfbWF4IjowLCJlbmVyZ3lfbWF4IjoxfSwiZW5lbXlfQXR0YWNrX2VmZmVjdCI6eyJsb2NrX2VuZW15X3R5cGUiOnt9LCJhdHRhY2tfbnVtIjowLCJiYXNlX2RhbWFnZSI6MCwicHJlY2lzaW9uIjowLCJjcml0aWNhbF9jaGFuY2UiOjAsImNyaXRpY2FsX2RhbWFnZSI6MH0sImxhc3RfYXR0YWNrX3RpbWUiOjE3NDg0OTk0NTIwNzgsIm5vd19hY3RpdmVfaWQiOiJub19hdHRhY2siLCJub3dfYWN0aXZlX3N0YWdlIjowLCJub3dfc2tpbGxfYXR0YWNrX3NwZWVkIjo1MDAwLCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6MX0seyJpZCI6IlRyYWluaW5nX0R1bW15IiwiaGVhbHRoX3BvaW50Ijo1LCJhdHRhY2tfcG9pbnQiOjAsInN0YXR1Ijp0cnVlLCJkaXN0YW5jZSI6ODgsImNvbWJhdF9hdHRhY2tfYXR0ciI6eyJhdHRhY2siOjUwLCJwcmVjaXNpb24iOjUsImNyaXRpY2FsX2NoYW5jZSI6NSwiY3JpdGljYWxfZGFtYWdlIjo1LCJhdHRhY2tfc3BlZWQiOjV9LCJjb21iYXRfZGVmZW5zZV9hdHRyIjp7ImRlZmVuc2UiOjUsImV2YWRlIjo1LCJyZXNpc3RhbmNlX3BvaW50Ijo1LCJtb3ZlX3NwZWVkIjo1fSwiY29tYmF0X3N1cnZpdmFsX2F0dHIiOnsiaGVhbHRoX21heCI6NSwibWFnaWNfbWF4IjowLCJlbmVyZ3lfbWF4IjoxfSwiZW5lbXlfQXR0YWNrX2VmZmVjdCI6eyJsb2NrX2VuZW15X3R5cGUiOnt9LCJhdHRhY2tfbnVtIjowLCJiYXNlX2RhbWFnZSI6MCwicHJlY2lzaW9uIjowLCJjcml0aWNhbF9jaGFuY2UiOjAsImNyaXRpY2FsX2RhbWFnZSI6MH0sImxhc3RfYXR0YWNrX3RpbWUiOjE3NDg0OTk0NDkwNzIsIm5vd19hY3RpdmVfaWQiOiJub19hdHRhY2siLCJub3dfYWN0aXZlX3N0YWdlIjowLCJub3dfc2tpbGxfYXR0YWNrX3NwZWVkIjo1MDAwLCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6Mn0se30seyJpZCI6IlRyYWluaW5nX0R1bW15IiwiaGVhbHRoX3BvaW50Ijo1LCJhdHRhY2tfcG9pbnQiOjAsInN0YXR1Ijp0cnVlLCJkaXN0YW5jZSI6MzcsImNvbWJhdF9hdHRhY2tfYXR0ciI6eyJhdHRhY2siOjUwLCJwcmVjaXNpb24iOjUsImNyaXRpY2FsX2NoYW5jZSI6NSwiY3JpdGljYWxfZGFtYWdlIjo1LCJhdHRhY2tfc3BlZWQiOjV9LCJjb21iYXRfZGVmZW5zZV9hdHRyIjp7ImRlZmVuc2UiOjUsImV2YWRlIjo1LCJyZXNpc3RhbmNlX3BvaW50Ijo1LCJtb3ZlX3NwZWVkIjo1fSwiY29tYmF0X3N1cnZpdmFsX2F0dHIiOnsiaGVhbHRoX21heCI6NSwibWFnaWNfbWF4IjowLCJlbmVyZ3lfbWF4IjoxfSwiZW5lbXlfQXR0YWNrX2VmZmVjdCI6eyJsb2NrX2VuZW15X3R5cGUiOnt9LCJhdHRhY2tfbnVtIjowLCJiYXNlX2RhbWFnZSI6MCwicHJlY2lzaW9uIjowLCJjcml0aWNhbF9jaGFuY2UiOjAsImNyaXRpY2FsX2RhbWFnZSI6MH0sImxhc3RfYXR0YWNrX3RpbWUiOjE3NDg0OTk0NjE2OTYsIm5vd19hY3RpdmVfaWQiOiJub19hdHRhY2siLCJub3dfYWN0aXZlX3N0YWdlIjowLCJub3dfc2tpbGxfYXR0YWNrX3NwZWVkIjo1MDAwLCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6NH0seyJpZCI6IlRyYWluaW5nX0R1bW15IiwiaGVhbHRoX3BvaW50Ijo1LCJhdHRhY2tfcG9pbnQiOjAsInN0YXR1Ijp0cnVlLCJkaXN0YW5jZSI6ODQsImNvbWJhdF9hdHRhY2tfYXR0ciI6eyJhdHRhY2siOjUwLCJwcmVjaXNpb24iOjUsImNyaXRpY2FsX2NoYW5jZSI6NSwiY3JpdGljYWxfZGFtYWdlIjo1LCJhdHRhY2tfc3BlZWQiOjV9LCJjb21iYXRfZGVmZW5zZV9hdHRyIjp7ImRlZmVuc2UiOjUsImV2YWRlIjo1LCJyZXNpc3RhbmNlX3BvaW50Ijo1LCJtb3ZlX3NwZWVkIjo1fSwiY29tYmF0X3N1cnZpdmFsX2F0dHIiOnsiaGVhbHRoX21heCI6NSwibWFnaWNfbWF4IjowLCJlbmVyZ3lfbWF4IjoxfSwiZW5lbXlfQXR0YWNrX2VmZmVjdCI6eyJsb2NrX2VuZW15X3R5cGUiOnt9LCJhdHRhY2tfbnVtIjowLCJiYXNlX2RhbWFnZSI6MCwicHJlY2lzaW9uIjowLCJjcml0aWNhbF9jaGFuY2UiOjAsImNyaXRpY2FsX2RhbWFnZSI6MH0sImxhc3RfYXR0YWNrX3RpbWUiOjE3NDg0OTk0NTUxMTEsIm5vd19hY3RpdmVfaWQiOiJub19hdHRhY2siLCJub3dfYWN0aXZlX3N0YWdlIjowLCJub3dfc2tpbGxfYXR0YWNrX3NwZWVkIjo1MDAwLCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6NX0se30seyJpZCI6IlRyYWluaW5nX0R1bW15IiwiaGVhbHRoX3BvaW50IjowLCJhdHRhY2tfcG9pbnQiOjAsInN0YXR1IjpmYWxzZSwiZGlzdGFuY2UiOjQ0LCJjb21iYXRfYXR0YWNrX2F0dHIiOnt9LCJjb21iYXRfZGVmZW5zZV9hdHRyIjp7fSwiY29tYmF0X3N1cnZpdmFsX2F0dHIiOnt9LCJlbmVteV9BdHRhY2tfZWZmZWN0Ijp7ImxvY2tfZW5lbXlfdHlwZSI6e30sImF0dGFja19udW0iOjAsImJhc2VfZGFtYWdlIjowLCJwcmVjaXNpb24iOjAsImNyaXRpY2FsX2NoYW5jZSI6MCwiY3JpdGljYWxfZGFtYWdlIjowfSwicGxhY2VfeCI6ImxpdHRsZV9kaXN0YW5jZSIsInBsYWNlX3kiOjd9LHsiaWQiOiJUcmFpbmluZ19EdW1teSIsImhlYWx0aF9wb2ludCI6NSwiYXR0YWNrX3BvaW50IjowLCJzdGF0dSI6dHJ1ZSwiZGlzdGFuY2UiOjg4LCJjb21iYXRfYXR0YWNrX2F0dHIiOnsiYXR0YWNrIjo1MCwicHJlY2lzaW9uIjo1LCJjcml0aWNhbF9jaGFuY2UiOjUsImNyaXRpY2FsX2RhbWFnZSI6NSwiYXR0YWNrX3NwZWVkIjo1fSwiY29tYmF0X2RlZmVuc2VfYXR0ciI6eyJkZWZlbnNlIjo1LCJldmFkZSI6NSwicmVzaXN0YW5jZV9wb2ludCI6NSwibW92ZV9zcGVlZCI6NX0sImNvbWJhdF9zdXJ2aXZhbF9hdHRyIjp7ImhlYWx0aF9tYXgiOjUsIm1hZ2ljX21heCI6MCwiZW5lcmd5X21heCI6MX0sImVuZW15X0F0dGFja19lZmZlY3QiOnsibG9ja19lbmVteV90eXBlIjp7fSwiYXR0YWNrX251bSI6MCwiYmFzZV9kYW1hZ2UiOjAsInByZWNpc2lvbiI6MCwiY3JpdGljYWxfY2hhbmNlIjowLCJjcml0aWNhbF9kYW1hZ2UiOjB9LCJsYXN0X2F0dGFja190aW1lIjoxNzQ4NDk5NDU4NTcyLCJub3dfYWN0aXZlX2lkIjoibm9fYXR0YWNrIiwibm93X2FjdGl2ZV9zdGFnZSI6MCwibm93X3NraWxsX2F0dGFja19zcGVlZCI6NTAwMCwicGxhY2VfeCI6ImxpdHRsZV9kaXN0YW5jZSIsInBsYWNlX3kiOjh9XSwibWlkZGxlX2Rpc3RhbmNlIjpbe30se30se30se30se30se30se30se30se31dLCJyZW1vdGVfZGlzdGFuY2UiOlt7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fV19fX19';
    let save_str =
        'eyJnbG9iYWxfc2F2ZSI6eyJUaW1lX3NhdmUiOnsiZ2FtZV9kYXRlIjp7InllYXIiOjIwMjUsIm1vbnRoIjo0LCJkYXkiOjEsImhvdXJzIjoxNywibWludXRlcyI6NTIsInN0YXJ0X3RpbWUiOjE3NDg1ODg5NDI0NDF9fSwicGxhY2Vfc2F2ZSI6eyJub3dfcGxhY2UiOiJuZXdfcGxheWVyX2NvbWJhdF90ZXN0IiwibGFzdF9ub3JtYWxfcGxhY2UiOiJ2aWxsYWdlX2JhcnJhY2tzIn0sImdsb2JhbF9mbGFnX3NhdmUiOnsiZ2FtZV9zdGF0dXMiOnsiR1NfY29tYmF0X3N0YXR1Ijp0cnVlLCJHU19nYW1lX2V2ZW50Ijp0cnVlfSwiaW1wb3J0YW50X25vZGVzIjp7InBhZ2UiOnt9LCJjaGFsbGVuZ2UiOnt9LCJhY2hpZXZlbWVudCI6e30sIm1pbmlfZXZlbnQiOnsibmV3X3BsYXllcl90ZWFjaF8xIjoiZmluaXNoIn19fSwiZW5lbXlfc2F2ZSI6eyJjb21iYXRfcGxhY2VfZW5lbXlzIjp7ImxpdHRsZV9kaXN0YW5jZSI6W3t9LHt9LHsiaWQiOiJUcmFpbmluZ19EdW1teSIsImhlYWx0aF9wb2ludCI6NSwiYXR0YWNrX3BvaW50IjowLCJzdGF0dSI6dHJ1ZSwiZGlzdGFuY2UiOjcwLCJjb21iYXRfYXR0YWNrX2F0dHIiOnsiYXR0YWNrIjo1MCwicHJlY2lzaW9uIjo1LCJjcml0aWNhbF9jaGFuY2UiOjUsImNyaXRpY2FsX2RhbWFnZSI6NSwiYXR0YWNrX3NwZWVkIjo1fSwiY29tYmF0X2RlZmVuc2VfYXR0ciI6eyJkZWZlbnNlIjo1LCJldmFkZSI6NSwicmVzaXN0YW5jZV9wb2ludCI6NSwibW92ZV9zcGVlZCI6NX0sImNvbWJhdF9zdXJ2aXZhbF9hdHRyIjp7ImhlYWx0aF9tYXgiOjUsIm1hZ2ljX21heCI6MCwiZW5lcmd5X21heCI6MX0sImxhc3RfYXR0YWNrX3RpbWUiOjE3NDg1ODg5NDExOTAsIm5vd19hY3RpdmVfaWQiOiJub19hdHRhY2siLCJub3dfYWN0aXZlX3N0YWdlIjowLCJub3dfc2tpbGxfYXR0YWNrX3NwZWVkIjo1MDAwLCJwbGFjZV94IjoibGl0dGxlX2Rpc3RhbmNlIiwicGxhY2VfeSI6Mn0se30se30se30se30se30se31dLCJtaWRkbGVfZGlzdGFuY2UiOlt7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fSx7fV0sInJlbW90ZV9kaXN0YW5jZSI6W3t9LHt9LHt9LHt9LHt9LHt9LHt9LHt9LHt9XX19LCJnYW1lX2V2ZW50X3NhdmUiOnsibm93X2V2ZW50X2lkIjoibmV3X3BsYXllcl9jb21iYXRfdGVzdCIsImV2ZW50X3N0YXJ0X3BsYWNlIjoidmlsbGFnZV9Db21iYXRfY29hY2giLCJtb25pdG9yX2RhdGEiOnsibWVsZWVfa2lsbCI6MCwiQVREX2FsbF9hcm1vciI6MCwiRFNFX3NoaWVsZF9kZWZlbnNlIjowfX19fQ==';
    //base64解密
    console.log('%s', save_str);
    save_str = b64_to_utf8(save_str);
    //把字符串转换成存档对象
    console.log('%s', save_str);
    let save_obj = JSON.parse(save_str);

    //针对新游戏开场剧情的处理
    if (!global.get_flag('new_game_start')) {
        //如果没完成开场剧情，需要将游戏恢复成普通状态
        finish_new_game_init();
    }
    //如果完成了开场剧情，则正常读档

    //用存档对象里的内容加载游戏
    global.load_global_class(save_obj.global_save);
}

//开始新游戏，进行开场剧情的准备
function new_game_init() {
    //开场剧情需要，隐藏部分界面
    hide_div('player_status');
    hide_div('Combat_plan');
    hide_div('live_plan');
    hide_div('map');
    hide_div('game_log');
    hide_div('control_name_left_div');
    hide_div('control_name_right_div');
    //开场剧情需要，设置初始属性
    let player_attributes = player.get_player_attributes();
    player_attributes.set_a_attr('health_point', 20);
    //开场剧情在村庄诊所
    let place_manage = global.get_place_manage();
    place_manage.set_now_place('village_hospital');
    //启动开场剧情
    let game_event_manage = global.get_game_event_manage();
    game_event_manage.start_mini_event('new_game_start');
}
//把游戏从开场剧情状态恢复成正常状态
function finish_new_game_init() {
    //恢复开场剧情隐藏的界面
    Gradient_div('player_status');
    Gradient_div('Combat_plan');
    Gradient_div('live_plan');
    Gradient_div('map');
    Gradient_div('game_log');
    Gradient_div('control_name_left_div');
    Gradient_div('control_name_right_div');
    //血量设置
    let player_attributes = player.get_player_attributes();
    player_attributes.set_a_attr('health_point', 100);
    //当前地点
    let place_manage = global.get_place_manage();
    place_manage.set_now_place('village_hospital');
    //
    // let game_event_manage = global.get_game_event_manage();
    // game_event_manage.start_mini_event('village_home');
}

function utf8_to_b64(str) {
    try {
        return btoa(decodeURIComponent(encodeURIComponent(str)));
        // return Base64.encode(str);
        // return Base64.encode(decodeURIComponent(encodeURIComponent(str)));
    } catch (err) {
        return '';
    }
}
function b64_to_utf8(str) {
    try {
        return decodeURIComponent(encodeURIComponent(atob(str))); // 解码回原始字符串
        // return Base64.decode(str);
    } catch (err) {
        return '';
    }
}

//玩家参数初始化
function player_init() {
    //初始化玩家类
    player.init();
    let player_attributes = player.get_player_attributes();
    player_attributes.set_a_attr('health_point', 20); //新存档配合新手剧情，设置初始属性
    // let All_Skills = player.get_player_All_Skills();
    // All_Skills.player_unlock_skill('shield_defense'); //主动技能测试
    // All_Skills.player_unlock_skill('normal_attack_Melee');
    // All_Skills.player_unlock_skill('energy_storage_attack');
    // All_Skills.player_unlock_skill('test_3_slot_skill');
    // All_Skills.player_unlock_skill('test_4_slot_skill');
    //测试物品和装备系统
    // player.Player_get_item('Oak_logs', 10);
    // player.Player_get_item('wood_sword', 1, 'damaged');
    // player.Player_get_item('wood_sword', 2, 'ordinary');
    // player.Player_get_item('wood_sword', 2, 'excellent');
    // player.Player_get_item('wood_battle_axe', 2, 'ordinary'); //双手武器测试
    // player.Player_get_item('wood_battle_axe', 2, 'excellent');
    // player.Player_get_item('test_hand_gun', 1, 'ordinary'); //复合可穿戴位置装备测试
    // player.Player_get_item('test_hand_gun', 1, 'excellent');
    // player.Player_get_item('test_shield', 1, 'ordinary'); //盾牌测试
    // player.Player_get_item('test_shield', 1, 'excellent');
    // player.Player_get_item('test_boomerang', 1, 'ordinary');
    // player.Player_get_item('test_boomerang', 3, 'excellent');
    // player.Player_get_item('test_boomerang', 5, 'rare');
    // player.Player_get_item('test_boomerang', 8, 'epic');
    // player.Player_get_item('wood_bow', 1, 'ordinary'); //远程武器测试
    // let P_Askill = player.get_player_ASkill_Manage();
    // P_Askill.set_active_skill('shield_defense', 0); //在第0个主动技能槽里设置普通攻击
    // P_Askill.set_active_skill('normal_attack_Melee', 0); //在第0个主动技能槽里设置普通攻击
}
//游戏界面初始化
function dom_init() {
    // 将每个装备栏中的信息初始化
    const radios = document.querySelectorAll('input[name="EQP_switch"]');
    for (const radio of radios) {
        updata_equipment_show(radio.value);
    }
    //移动到初始位置
    let place_manage = global.get_place_manage();
    // place_manage.set_now_place('test_normal1');
    place_manage.set_now_place('village_hospital');

    //新存档配合新手剧情，隐藏部分界面
    // hide_div('player_status');
    // hide_div('Combat_plan');
    // hide_div('live_plan');
    // hide_div('map');
    // hide_div('game_log');
    // hide_div('control_name_left_div');
    // hide_div('control_name_right_div');
}

export { init_game, save_game, delete_save, load_save };
