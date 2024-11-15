var dom = new Object();

import { global } from "./Global.js";
import { you } from "./You.js";

dom.dseparator = '<div class="dseparator">　</div>';
dom.coincopper = '<small style="color:rgb(255, 116, 63)">●</small>';
dom.coinsilver = '<small style="color:rgb(192, 192, 192)">●</small>';
dom.coingold = '<small style="color:rgb(255, 215, 0)">●</small>';

dom.loading = addElement(document.body, "div");
dom.loading.style.zIndex = 9997;
dom.loading.style.width = "100%";
dom.loading.style.height = "100%";
dom.loading.style.position = "absolute";
dom.loading.style.backgroundColor = "lightgrey";
dom.loading.style.margin = -8;
dom.loadingt = addElement(document.body, "div");
dom.loadingt.style.zIndex = 9998;
dom.loadingt.innerHTML = "LOADING";
dom.loadingt.style.textAlign = "center";
dom.loadingt.style.top = window.innerHeight / 2 - 50;
dom.loadingt.style.fontSize = "4em";
dom.loadingt.style.position = "absolute";
dom.loadingt.style.left = window.innerWidth / 2 - 150;

///////////////////////////////////////////
//DOM
///////////////////////////////////////////
dom.d0 = addElement(document.body, "div", "d1", "d");

dom.d1 = addElement(dom.d0, "div");
dom.d101 = addElement(dom.d0, "div", "se_i");
dom.d2c = addElement(dom.d1, "div", null, "d2");
dom.d2 = addElement(dom.d2c, "div");
dom.d2.innerHTML = you.name;
dom.d2_a = addElement(dom.d2c, "input", "nch");
dom.d2_a.addEventListener("focusin", function () {
  dom.d2_a.value = you.name;
  you.name = "";
  dom.d2.innerHTML = "　";
});
dom.d2_a.addEventListener("focusout", function () {
  you.name = dom.d2_a.value;
  dom.d2_a.value = "";
  dom.d2.innerHTML = you.name;
});
addDesc(dom.d2c, null, 2, you.name, you.desc);
dom.d3 = addElement(dom.d1, "div", null, "d3");
dom.d3.innerHTML = " lvl:" + you.lvl + " '" + you.title.name + "'";
dom.d3.addEventListener("click", function () {
  if (!global.flags.ttlscrnopn) {
    global.flags.ttlscrnopn = true;
    dom.ttlcont = addElement(document.body, "div", "youttlc");
    dom.ttlhead = addElement(dom.ttlcont, "div", "youttlh");
    dom.ttlhead.innerHTML = "SELECT YOUR TITLE";
    dom.ttlbd = addElement(dom.ttlcont, "div");
    dom.ttlbd.style.overflow = "auto";
    dom.ttlbd.style.maxHeight = window.innerHeight - 130;
    for (let obj in global.titles) {
      this.ttlent = addElement(dom.ttlbd, "div", null, "youttl");
      let title = global.titles[obj];
      if (obj === 0) this.ttlent.style.borderTop = "";
      this.ttlent.innerHTML = '"' + title.name + '"';
      if (global.titles[obj].talent)
        this.ttlent.innerHTML +=
          " <span style='color:yellow;text-shadow:0px 0px 5px orange'>*</span>";
      addDesc(this.ttlent, title, 5);
      this.ttlent.addEventListener("click", function () {
        you.title = title;
        empty(dom.ttlcont);
        document.body.removeChild(dom.ttlcont);
        dom.d3.innerHTML = " lvl:" + you.lvl + " '" + you.title.name + "'";
        empty(global.dscr);
        global.dscr.style.display = "none";
        global.flags.ttlscrnopn = false;
      });
    }
  }
});
addDesc(dom.d3, you.title, 5, true);
//dom.d5 = addElement(dom.d1,'div','d5'); ???????
dom.d5_1 = addElement(dom.d1, "div", null, "hp");
dom.d5_2 = addElement(dom.d1, "div", null, "exp");
dom.d5_3 = addElement(dom.d1, "div", null, "en");
addDesc(
  dom.d5_1,
  null,
  2,
  "Health",
  function () {
    return (
      'Physical health points, needed to stay alive. You will probably die if it reaches 0<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">' +
      ((you.stat_p[0] * 100) << 0) +
      "%</span></small>"
    );
  },
  true
);
addDesc(
  dom.d5_2,
  null,
  2,
  "Experience",
  function () {
    return (
      'Physical and combat experience. You\'ll have to work hard to achieve new heights<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>EXP Gain Potential: <span style="color:gold">' +
      ((you.exp_t * 100) << 0) +
      '%</span><br>Current EXP Gain: <span style="color:yellow">' +
      ((you.exp_t * 100 * you.efficiency()) << 0) +
      "%</span></small>"
    );
  },
  true
);
addDesc(
  dom.d5_3,
  null,
  2,
  "Energy meter",
  function () {
    let lose = you.mods.sdrate;
    if (global.flags.iswet === true) lose *= 3 / (1 + skl.abw.lvl * 0.03);
    if (global.flags.iscold === true)
      lose += effect.cold.duration / 1000 / (1 + skl.coldr.lvl * 0.05);
    lose = ((lose * 100) << 0) / 100;
    return (
      'Influences the effectiveness of your actions, eat a lot to keep it full<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Energy Effectiveness: <span style="color:deeppink">' +
      (((you.mods.sbonus + 1) * 100) << 0) +
      '%</span><br>Energy Consumption Rate: <span style="color:gold">' +
      lose +
      "/s</span></small>"
    );
  },
  true
);
dom.d5_1_1 = addElement(dom.d5_1, "div", "hpp");
dom.d5_2_1 = addElement(dom.d5_2, "div", "expp");
dom.d5_3_1 = addElement(dom.d5_3, "div", "enn");
dom.d6 = addElement(dom.d1, "div", "d6");
addDesc(
  dom.d6,
  null,
  2,
  "Power rank",
  "Your power position in this realm. The lower the number the stronger you are"
);
dom.d4 = addElement(dom.d1, "div", "d4");
dom.d4_1 = addElement(dom.d4, "span", null, "dd");
dom.d4_2 = addElement(dom.d4, "span", null, "dd");
dom.d4_3 = addElement(dom.d4, "span", null, "dd");
dom.d4_4 = addElement(dom.d4, "span", null, "dd");
addDesc(
  dom.d4_1,
  null,
  2,
  "Physical Strength",
  function () {
    return (
      'Determines physical damage dealt and received<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">' +
      ((you.stat_p[1] * 100) << 0) +
      "%</span></small>"
    );
  },
  true
);
addDesc(
  dom.d4_2,
  null,
  2,
  "Agility",
  function () {
    return (
      'Determines hit/dodge rate<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">' +
      ((you.stat_p[2] * 100) << 0) +
      "%</span></small>"
    );
  },
  true
);
addDesc(
  dom.d4_3,
  null,
  2,
  "Mental acuity",
  function () {
    return (
      'Determines magic damage dealt and received<div style="  border-bottom: 1px solid grey;width:100%;height:8px">　</div><br><small>Growth Potential: <span style="color:lime">' +
      ((you.stat_p[3] * 100) << 0) +
      "%</span></small>"
    );
  },
  true
);
addDesc(
  dom.d4_4,
  null,
  2,
  "Speed",
  "Allows for faster attacks and multihit combos"
);
dom.d7 = addElement(dom.d1, "div", "eq_w");
dom.d7_1 = addElement(dom.d7, "div", null, "ddd_2");
dom.d7_slot_1 = addElement(dom.d7_1, "div", null, "ddd_1");
dom.d7_slot_1.innerHTML = "Weapon";
dom.d7_slot_1.style.color = "grey";
dom.d7_slot_2 = addElement(dom.d7_1, "div", null, "ddd_1");
dom.d7_slot_2.innerHTML = "Shield";
dom.d7_slot_2.style.color = "grey";
dom.d7_2 = addElement(dom.d7, "div", null, "ddd_2");
dom.d7_slot_3 = addElement(dom.d7_2, "div", null, "ddd_1");
dom.d7_slot_3.innerHTML = "Head";
dom.d7_slot_3.style.color = "grey";
dom.d7_slot_4 = addElement(dom.d7_2, "div", null, "ddd_1");
dom.d7_slot_4.innerHTML = "Body";
dom.d7_slot_4.style.color = "grey";
dom.d7_3 = addElement(dom.d7, "div", null, "ddd_2");
dom.d7_slot_5 = addElement(dom.d7_3, "div", null, "ddd_1");
dom.d7_slot_5.innerHTML = "L Arm";
dom.d7_slot_5.style.color = "grey";
dom.d7_slot_6 = addElement(dom.d7_3, "div", null, "ddd_1");
dom.d7_slot_6.innerHTML = "R Arm";
dom.d7_slot_6.style.color = "grey";
dom.d7_4 = addElement(dom.d7, "div", null, "ddd_2");
dom.d7_slot_7 = addElement(dom.d7_4, "div", null, "ddd_1");
dom.d7_slot_7.innerHTML = "Legs";
dom.d7_slot_7.style.color = "grey";
dom.d7_slot_8 = addElement(dom.d7_4, "div", null, "ddd_1");
dom.d7_slot_8.innerHTML = "Accessory";
dom.d7_slot_8.style.color = "grey";
dom.d7_5 = addElement(dom.d7, "div", null, "ddd_2");
dom.d7_5.style.borderBottom = "solid 2px rgb(12,86,195)";
dom.d7_slot_9 = addElement(dom.d7_5, "div", null, "ddd_1");
dom.d7_slot_9.innerHTML = "∥LOCKED∥";
dom.d7_slot_9.style.color = "grey";
dom.d7_slot_10 = addElement(dom.d7_5, "div", null, "ddd_1");
dom.d7_slot_10.innerHTML = "∥LOCKED∥";
dom.d7_slot_10.style.color = "grey";
dom.d8 = addElement(dom.d1, "div");
dom.d8.style.fontSize = ".9em";
dom.d8.style.paddingTop = "5px";
dom.d8_2 = addElement(dom.d1, "div");
dom.d8_2.style.fontSize = ".7em";
if (typeof InstallTrigger == "undefined") dom.d8_2.style.paddingTop = "5px";
dom.d8_2.innerHTML =
  "Critical chance: " + (you.mods.crflt + you.crt) * 100 + "%";
dom.d7_slot_3.addEventListener("mouseenter", function () {
  global._tad = this.innerHTML;
  this.innerHTML =
    "DEF: " +
    Math.round(
      you.eqp[2].str * (you.eqp[2].dp / you.eqp[2].dpmax) +
        you.str_r +
        you.eqp[1].str * (you.eqp[1].dp / you.eqp[1].dpmax)
    );
});
dom.d7_slot_3.addEventListener("mouseleave", function () {
  this.innerHTML = global._tad;
});
dom.d7_slot_4.addEventListener("mouseenter", function () {
  global._tad = this.innerHTML;
  this.innerHTML =
    "DEF: " +
    Math.round(
      you.eqp[3].str * (you.eqp[3].dp / you.eqp[3].dpmax) +
        you.str_r +
        you.eqp[1].str * (you.eqp[1].dp / you.eqp[1].dpmax)
    );
});
dom.d7_slot_4.addEventListener("mouseleave", function () {
  this.innerHTML = global._tad;
});
dom.d7_slot_5.addEventListener("mouseenter", function () {
  global._tad = this.innerHTML;
  this.innerHTML =
    "DEF: " +
    Math.round(
      you.eqp[4].str * (you.eqp[4].dp / you.eqp[4].dpmax) +
        you.str_r +
        you.eqp[1].str * (you.eqp[1].dp / you.eqp[1].dpmax)
    );
});
dom.d7_slot_5.addEventListener("mouseleave", function () {
  this.innerHTML = global._tad;
});
dom.d7_slot_6.addEventListener("mouseenter", function () {
  global._tad = this.innerHTML;
  this.innerHTML =
    "DEF: " +
    Math.round(
      you.eqp[5].str * (you.eqp[5].dp / you.eqp[5].dpmax) +
        you.str_r +
        you.eqp[1].str * (you.eqp[1].dp / you.eqp[1].dpmax)
    );
});
dom.d7_slot_6.addEventListener("mouseleave", function () {
  this.innerHTML = global._tad;
});
dom.d7_slot_7.addEventListener("mouseenter", function () {
  global._tad = this.innerHTML;
  this.innerHTML =
    "DEF: " +
    Math.round(
      you.eqp[6].str * (you.eqp[6].dp / you.eqp[6].dpmax) +
        you.str_r +
        you.eqp[1].str * (you.eqp[1].dp / you.eqp[1].dpmax)
    );
});
dom.d7_slot_7.addEventListener("mouseleave", function () {
  this.innerHTML = global._tad;
});
dom.d1m = addElement(document.body, "div", "d1", "d");
if (!global.flags.aw_u) dom.d1m.style.display = "none";
dom.d101m = addElement(dom.d1m, "div", "se_i");
dom.d1m.style.top = 8;
dom.d1m.style.left = 457;
dom.d1m.style.position = "absolute";
dom.d101m.style.top = 264;
global.special_x = dom.d1m.style.left;
global.special_y = dom.d1m.style.top;

/*dom.d1m.addEventListener('mousedown',function(){
  this.style.left=parseInt(global.special_x)+rand(-5,5)+'px';
  this.style.top=parseInt(global.special_y)+rand(-5,5)+'px';
});
dom.d1m.addEventListener('mouseup',function(){
  this.style.left=parseInt(global.special_x)+'px';
  this.style.top=parseInt(global.special_y)+'px';
});*/
dom._d23m = addElement(dom.d1m, "div");
addDesc(dom._d23m, null, 3, global.current_m.name, global.current_m.desc);
dom.d2m = addElement(dom._d23m, "div", null, "d2");
dom.d3m = addElement(dom._d23m, "div", null, "d3m");
dom.d5_1m = addElement(dom.d1m, "div", null, "hp");
dom.d5_2m = addElement(dom.d1m, "div", null, "exp");
dom.d5_1_1m = addElement(dom.d5_1m, "div", "hpp");
dom.d5_2_1m = addElement(dom.d5_2m, "div");
dom.d5_1_1m.update = function () {
  this.innerHTML =
    "hp: " +
    format3(global.current_m.hp.toString()) +
    "/" +
    format3(global.current_m.hpmax.toString());
  dom.d5_1m.style.width =
    (100 * global.current_m.hp) / global.current_m.hpmax + "%";
};
dom.d4m = addElement(dom.d1m, "div", "d4");
dom.d4_1m = addElement(dom.d4m, "span", null, "dd");
dom.d4_2m = addElement(dom.d4m, "span", null, "dd");
dom.d4_3m = addElement(dom.d4m, "span", null, "dd");
dom.d4_4m = addElement(dom.d4m, "span", null, "dd");
dom.d9m = addElement(dom.d1m, "div");
dom.d9m.update = function () {
  this.innerHTML = "rank: " + global.text.eranks[global.current_m.rnk];
  if (global.current_m.rnk <= 4) this.style.color = "lightgrey";
  else if (global.current_m.rnk > 4 && global.current_m.rnk <= 7)
    this.style.color = "white";
  else if (global.current_m.rnk > 7 && global.current_m.rnk <= 10)
    this.style.color = "lightblue";
  else if (global.current_m.rnk > 10 && global.current_m.rnk <= 13)
    this.style.color = "lightgreen";
  else if (global.current_m.rnk > 13 && global.current_m.rnk <= 16)
    this.style.color = "lime";
  else if (global.current_m.rnk > 16 && global.current_m.rnk <= 19)
    this.style.color = "yellow";
};
dom.d9m.style.borderBottom = "#545299 dotted 2px";
dom.d9m.style.backgroundColor = "#272744";
dom.d8m_c = addElement(dom.d1m, "small", "bbts");
dom.d8m1 = addElement(dom.d8m_c, "div", null, "bbts");
dom.d8m1.innerHTML = "Pause next battle: <span style='color:green'>&nbspOFF";
dom.d8m1.addEventListener("click", function () {
  if (global.flags.to_pause === true) {
    if (!global.flags.civil) global.flags.btl = true;
    global.flags.to_pause = false;
    this.innerHTML = "Pause next battle: <span style='color:green'>&nbspOFF";
  } else {
    global.flags.to_pause = true;
    this.innerHTML = "Pause next battle: <span style='color:crimson'>&nbspON";
  }
});
dom.d8m2 = addElement(dom.d8m_c, "div", null, "bbts");
dom.d8m2.innerHTML = "Resume the fight";
dom.d8m2.style.right = "0px";
dom.d8m2.style.position = "absolute";
dom.d8m2.addEventListener("click", function () {
  if (!global.flags.civil) global.flags.btl = true;
});
dom.d7m_c = addElement(dom.d1m, "div", "ainfo");
dom.d7m = addElement(dom.d7m_c, "small");
dom.d7m.update = function () {
  global.current_z.size >= 0
    ? (this.innerHTML =
        "Area: " + global.current_z.name + " / " + global.current_z.size)
    : (this.innerHTML = "Area: " + global.current_z.name + " / " + "∞");
};
dom.d7m.update();
dom.inv_ctx = addElement(document.body, "div", "inv");
if (!global.flags.aw_u) dom.inv_ctx.style.display = "none";
dom.inventory = addElement(dom.inv_ctx, "div");
dom.inv_control = addElement(dom.inventory, "div", "inv_control");
dom.inv_btn_1 = addElement(dom.inv_control, "div", null, "bts");
dom.inv_btn_2 = addElement(dom.inv_control, "div", null, "bts");
dom.inv_btn_3 = addElement(dom.inv_control, "div", null, "bts");
dom.inv_btn_4 = addElement(dom.inv_control, "div", null, "bts");
dom.inv_btn_5 = addElement(dom.inv_control, "div", null, "bts");
dom.inv_ctx_b = addElement(dom.inventory, "div", "inv_ctx_b");
dom.inv_control_b = addElement(dom.inv_ctx, "div", "inv_control_b");
dom.inv_btn_1_b = addElement(dom.inv_control_b, "div", null, "bts_b");
dom.inv_btn_2_b = addElement(dom.inv_control_b, "div", null, "bts_b");
dom.inv_btn_3_b = addElement(dom.inv_control_b, "div", null, "bts_b");
dom.mn = addElement(dom.inv_control_b, "div", "mn");
dom.mn_1 = addElement(dom.mn, "small", "mnb");
dom.mn_1.innerHTML = "㊧0";
dom.mn_2 = addElement(dom.mn, "small", "mnb");
dom.mn_2.innerHTML = "●0";
dom.mn_3 = addElement(dom.mn, "small", "mnb");
dom.mn_3.innerHTML = "●0";
dom.mn_4 = addElement(dom.mn, "small", "mnb");
dom.mn_4.innerHTML = "●0";
dom.mn_1.style.textShadow = "red -1px 1px 0px, crimson 2px 0px 0px";
dom.mn_1.style.backgroundColor = "darkred";
dom.mn_1.style.color = "chartreuse";
dom.mn_2.style.color = "#ffd700";
dom.mn_2.style.backgroundColor = "664200";
dom.mn_3.style.color = "#c0c0c0";
dom.mn_3.style.backgroundColor = "383838";
dom.mn_4.style.color = "#ff743f";
dom.mn_4.style.backgroundColor = "662617";
dom.mn_1.style.opacity = 0;
dom.mn_2.style.display = "none";
dom.mn_3.style.display = "none";
dom.mn_4.style.display = "none";
dom.ctrmg = addElement(document.body, "div", "ctrmg");
dom.ctrmg_ca = addElement(dom.ctrmg, "div");
dom.ctrmg_cb = addElement(dom.ctrmg, "div");
dom.ctrwin1 = addElement(dom.ctrmg_cb, "div");
dom.ctrwin1.style.display = "";
dom.ctrwin2 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin2.style.display = "none";
dom.ctrwin3 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin3.style.display = "none";
dom.ctrwin4 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin4.style.display = "none";
dom.ctrwin5 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin5.style.display = "none";
dom.ctrwin6 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin6.style.display = "none";
dom.ctrwin7 = addElement(dom.ctrmg_cb, "div", null, "ctrwinbx");
dom.ctrwin7.style.display = "none";
dom.nthngdsp = addElement(dom.ctrmg_cb, "div");
dom.nthngdsp.style.top = 200;
dom.nthngdsp.style.left = 210;
dom.nthngdsp.style.position = "relative";
dom.nthngdsp.style.color = "grey";
dom.nthngdsp.innerHTML = "Nothing here yet";
dom.nthngdsp.style.display = "none";
dom.ctr_1 = addElement(dom.ctrmg_ca, "div", "ctrm_1");
if (!global.flags.aw_u) dom.ctr_1.style.display = "none";
dom.ctr_1a = addElement(dom.ctr_1, "div");
dom.d_weather = addElement(dom.ctr_1a, "div", "ctr_w");
dom.d_weathers = addElement(dom.d_weather, "small");
dom.d_weathert = addElement(dom.d_weather, "span");
dom.d_weathers.style.marginRight = 5;
dom.d_weathers.addEventListener("click", () => {
  global.flags.ssngaijin = !global.flags.ssngaijin;
  wdrseason(global.flags.ssngaijin);
});
dom.d_moon = addElement(dom.d_weather, "span");
dom.d_anomaly = addElement(dom.d_weather, "span");
dom.d_anomaly.innerHTML = "";
if (typeof InstallTrigger == "undefined") {
  dom.d_anomaly.style.float = "right";
  dom.d_anomaly.style.top = -4;
  dom.d_anomaly.style.position = "relative";
  dom.d_moon.style.float = "right";
  dom.d_moon.style.top = -4;
  dom.d_moon.style.position = "relative";
}
dom.d_time = addElement(dom.ctr_1a, "div", "ctr_t");
dom.d_time.addEventListener("click", function () {
  if (global.flags.tmmode >= 3) global.flags.tmmode = 1;
  else global.flags.tmmode++;
  this.innerHTML =
    "<small>" + getDay(global.flags.tmmode) + "</small> " + timeDisp(time);
});
dom.d_lct = addElement(dom.ctr_1a, "div", "ctr_l");
dom.d_lct.style.display = "none";
dom.d_lct.innerHTML = "Location: ";
dom.d_lctc = addElement(dom.d_lct, "div");
dom.d_lctc.style.fontSize = "0.85em";
dom.d_lctc.style.paddingTop = 7;
dom.d_lctc.style.marginLeft = -1;
dom.d_lctc.style.display = "flex";
dom.d_lctt = addElement(dom.d_lctc, "span");
dom.d_lctte = addElement(dom.d_lctc, "span");
dom.ctr_2 = addElement(dom.ctrwin1, "div", "ctrm_2");
dom.ct_ctrl = addElement(dom.ctrmg, "div", "ct_ctrl");
if (!global.flags.aw_u) dom.ct_ctrl.style.display = "none";
dom.ct_bt1 = addElement(dom.ct_ctrl, "div", null, "ct_bts");
dom.ct_bt1.innerHTML = global.flags.asbu ? "assemble" : "???????";
dom.ct_bt2 = addElement(dom.ct_ctrl, "div", null, "ct_bts");
dom.ct_bt2.innerHTML = global.flags.sklu ? "skills" : "???????";
dom.ct_bt3 = addElement(dom.ct_ctrl, "div", null, "ct_bts");
dom.ct_bt3.innerHTML = global.flags.actsu ? "actions" : "???????";
//dom.ct_bt4 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt4.innerHTML = '';
//dom.ct_bt5 = addElement(dom.ct_ctrl ,'div',null,'ct_bts'); dom.ct_bt5.innerHTML = '';
dom.ct_bt6 = addElement(dom.ct_ctrl, "div", null, "ct_bts");
dom.ct_bt6.innerHTML = global.flags.jnlu ? "journal" : "???????";
dom.ct_bt7 = addElement(dom.ct_ctrl, "div", null, "ct_bts");
dom.ct_bt7.innerHTML = "settings";
dom.ct_bt1.style.borderLeft = "none";
dom.ct_bt7.style.borderRight = "none";

dom.ct_bt7.addEventListener("click", () => {
  dom.nthngdsp.style.display = "none";
  if (global.lw_op === 7) {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "";
    global.lw_op = 0;
    clearInterval(timers.sklupdate);
    clearInterval(timers.bstmonupdate);
  } else {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin1.style.display = "none";
    dom.ctrwin2.style.display = "none";
    global.lw_op = 7;
  }
  clearInterval(timers.sklupdate);
  clearInterval(timers.bstmonupdate);
});
dom.ct_bt1.addEventListener("click", () => {
  dom.nthngdsp.style.display = "none";
  if (global.lw_op === 1) {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "";
    global.lw_op = 0;
    clearInterval(timers.sklupdate);
    clearInterval(timers.bstmonupdate);
  } else {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "";
    dom.ctrwin1.style.display = "none";
    global.lw_op = 1;
    if (global.rec_d.length > 0) {
      dom.ct_bt1_c.style.display = "";
      rsort(global.rm);
      clearInterval(timers.sklupdate);
      clearInterval(timers.bstmonupdate);
    } else {
      dom.ct_bt1_c.style.display = "none";
      dom.nthngdsp.style.display = "";
    }
  }
});

dom.ct_bt3.addEventListener("click", () => {
  dom.nthngdsp.style.display = "none";
  if (global.lw_op === 3) {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "";
    global.lw_op = 0;
    clearInterval(timers.sklupdate);
    clearInterval(timers.bstmonupdate);
  } else {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "none";
    global.lw_op = 3;
    empty(dom.ctrwin5);
    if (acts.length > 0) {
      this.acch = addElement(dom.ctrwin5, "div");
      this.acch.innerHTML = "A c t i o n　　l i s t";
      this.acch.style.padding = "2px";
      this.acch.style.textAlign = "center";
      this.acch.style.backgroundColor = "#050730";
      this.acch_e = addElement(this.acch, "div");
      this.acch_e.style.float = "right";
      this.acch_e.style.display = "flex";
      this.acch_e.style.position = "relative";
      this.acch_e.style.top = -6;
      this.acch_e.style.right = -2;
      this.acch_e.style.height = 20;
      dom.acccon = addElement(dom.ctrwin5, "div");
      empty(dom.acccon);
      for (let a in acts) {
        renderAct(acts[a]);
      }
    } else dom.nthngdsp.style.display = "";
  }
});

dom.ct_bt2.addEventListener("click", function () {
  dom.nthngdsp.style.display = "none";
  if (global.lw_op === 2) {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "";
    global.lw_op = 0;
    clearInterval(timers.sklupdate);
    clearInterval(timers.bstmonupdate);
  } else {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "none";
    global.lw_op = 2;
    if (you.skls.length > 0) {
      dom.nthngdsp.style.display = "none";
      empty(dom.ctrwin3);
      this.skwm = addElement(dom.ctrwin3, "div");
      this.skwm.innerHTML = "S k i l l　　l i s t";
      this.skwm.style.padding = "2px";
      this.skwm.style.textAlign = "center";
      this.skwm.style.backgroundColor = "#050730";
      this.skwm_e = addElement(this.skwm, "div");
      this.skwm_e.style.float = "right";
      this.skwm_e.style.display = "flex";
      this.skwm_e.style.position = "relative";
      this.skwm_e.style.top = -6;
      this.skwm_e.style.right = -2;
      this.skwm_e.style.height = 20;
      this.skwm_e_btn_1_b = addElement(this.skwm_e, "div", null, "bts_b");
      this.skwm_e_btn_1_b.innerHTML = "A-Z";
      this.skwm_e_btn_1_b.style.border = "1px solid #46a";
      this.skwm_e_btn_2_b = addElement(this.skwm_e, "div", null, "bts_b");
      this.skwm_e_btn_2_b.innerHTML = "TPE";
      this.skwm_e_btn_2_b.style.border = "1px solid #46a";
      this.skwm_e_btn_3_b = addElement(this.skwm_e, "div", null, "bts_b");
      this.skwm_e_btn_3_b.innerHTML = "LVL";
      this.skwm_e_btn_3_b.style.border = "1px solid #46a";
      this.skwm_e_btn_1_b.addEventListener("click", function () {
        if (global.flags.ssort_a === true) {
          you.skls.sort(function (a, b) {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          });
          global.flags.ssort_a = false;
        } else {
          you.skls.sort(function (a, b) {
            if (a.name > b.name) return -1;
            if (a.name < b.name) return 1;
            return 0;
          });
          global.flags.ssort_a = true;
        }
        empty(dom.skcon);
        for (let m = 0; m < you.skls.length; m++) {
          renderSkl(you.skls[m]);
          if (m === you.skls.length - 1)
            dom.skcon.children[m].style.borderBottom = "1px solid #46a";
        }
      });
      this.skwm_e_btn_2_b.addEventListener("click", function () {
        if (global.flags.ssort_b === true) {
          you.skls.sort(function (a, b) {
            if (a.type < b.type) return -1;
            if (a.type > b.type) return 1;
            if (a.id < b.id) return -1;
            if (a.id > b.id) return 1;
            return 0;
          });
          global.flags.ssort_b = false;
        } else {
          you.skls.sort(function (a, b) {
            if (a.type > b.type) return -1;
            if (a.type < b.type) return 1;
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
          });
          global.flags.ssort_b = true;
        }
        empty(dom.skcon);
        for (let m = 0; m < you.skls.length; m++) {
          renderSkl(you.skls[m]);
          if (m === you.skls.length - 1)
            dom.skcon.children[m].style.borderBottom = "1px solid #46a";
        }
      });
      this.skwm_e_btn_3_b.addEventListener("click", function () {
        if (global.flags.ssort_b === true) {
          you.skls.sort(function (a, b) {
            if (a.lvl < b.lvl) return -1;
            if (a.lvl > b.lvl) return 1;
            if (a.exp < b.exp) return -1;
            if (a.exp > b.exp) return 1;
            return 0;
          });
          global.flags.ssort_b = false;
        } else {
          you.skls.sort(function (a, b) {
            if (a.lvl > b.lvl) return -1;
            if (a.lvl < b.lvl) return 1;
            if (a.exp > b.exp) return -1;
            if (a.exp < b.exp) return 1;
            return 0;
          });
          global.flags.ssort_b = true;
        }
        empty(dom.skcon);
        for (let m = 0; m < you.skls.length; m++) {
          renderSkl(you.skls[m]);
          if (m === you.skls.length - 1)
            dom.skcon.children[m].style.borderBottom = "1px solid #46a";
        }
      });
      addDesc(this.skwm_e_btn_1_b, null, 2, "Filter", "Alphabetically");
      addDesc(this.skwm_e_btn_2_b, null, 2, "Filter", "by Type");
      addDesc(this.skwm_e_btn_3_b, null, 2, "Filter", "by Levels");
      dom.skcon = addElement(dom.ctrwin3, "div");
      dom.skcon.style.overflow = "auto";
      dom.skcon.style.height = 335;
      dom.skcon.style.width = "100%";
      for (let m = 0; m < you.skls.length; m++) {
        renderSkl(you.skls[m]);
        if (m === you.skls.length - 1)
          dom.skcon.children[m].style.borderBottom = "1px solid #46a";
      }
      let sklsize = you.skls.length;
      timers.sklupdate = setInterval(() => {
        if (sklsize < you.skls.length) {
          empty(dom.skcon);
          for (let m = 0; m < you.skls.length; m++) {
            renderSkl(you.skls[m]);
            if (m === you.skls.length - 1)
              dom.skcon.children[m].style.borderBottom = "1px solid #46a";
          }
        }
        for (let n = 1; n < you.skls.length + 1; n++) {
          dom.skcon.children[n - 1].children[0].innerHTML =
            you.skls[n - 1].name + " lvl: " + you.skls[n - 1].lvl;
          dom.skcon.children[n - 1].children[0].style.fontSize =
            you.skls[n - 1].sp;
          dom.skcon.children[n - 1].children[1].innerHTML =
            "　exp: " +
            formatw(Math.floor(you.skls[n - 1].exp)) +
            "/" +
            formatw(you.skls[n - 1].expnext_t);
          dom.skcon.children[n - 1].children[2].children[0].style.width =
            (you.skls[n - 1].exp / you.skls[n - 1].expnext_t) * 100 + "%";
          //if(you.skls[n-1].lastupd&&you.skls[n-1].lastupd-time.minute>=1) dom.skcon.children[n-1].children[2].children[0].style.backgroundColor='limegreen'; else dom.skcon.children[n-1].children[2].children[0].style.backgroundColor='yellow';
        }
      }, 1000);
    } else dom.nthngdsp.style.display = "";
  }
});
dom.ct_bt6.addEventListener("click", function () {
  if (!global.flags.jnlu) return;
  dom.nthngdsp.style.display = "none";
  if (global.lw_op === 6) {
    dom.ctrwin6.style.display = "none";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "";
    global.lw_op = 0;
    clearInterval(timers.sklupdate);
    clearInterval(timers.bstmonupdate);
  } else {
    dom.ctrwin6.style.display = "";
    dom.ctrwin5.style.display = "none";
    dom.ctrwin4.style.display = "none";
    dom.ctrwin3.style.display = "none";
    dom.ctrwin2.style.display = "none";
    dom.ctrwin1.style.display = "none";
    global.lw_op = 6;
    empty(dom.ctrwin6);
    this.jlbl = addElement(dom.ctrwin6, "div");
    this.jlbl.innerHTML = "J o u r n a l";
    this.jlbl.style.padding = "2px";
    this.jlbl.style.textAlign = "center";
    this.jlbl.style.backgroundColor = "#050730";
    this.jlbl.style.borderBottom = "1px solid rgb(12,86,195)";
    this.jlmain = addElement(dom.ctrwin6, "div");
    this.jlmain.style.height = 336;
    this.jlmain.style.background =
      "linear-gradient(0deg, rgb(35, 67, 125), rgb(19, 18, 97))";
    this.jlbod = addElement(this.jlmain, "div");
    this.jlbrw1 = addElement(this.jlbod, "div", null, "jrow");
    dom.jlbrw1s1 = addElement(this.jlbrw1, "div", "jcell1", "jcell");
    dom.jlbrw1s2 = addElement(this.jlbrw1, "div", "jcell2", "jcell");
    this.jlbrw2 = addElement(this.jlbod, "div", null, "jrow");
    this.jlbrw2s1 = addElement(this.jlbrw2, "div", "jcell3", "jcell");
    this.jlbrw2s2 = addElement(this.jlbrw2, "div", "jcell4", "jcell");
    this.jlbod.style.height = 100;
    this.jlbod.style.width = "100%";
    dom.jlbrw1s1.innerHTML = "Q U E S T S";
    dom.jlbrw1s2.innerHTML =
      global.flags.bstu === true ? "B E S T I A R Y" : "????????????";
    this.jlbrw2s1.innerHTML = "????????????";
    this.jlbrw2s2.innerHTML = "S T A T I S T I C S";
    dom.jlbrw1s1.addEventListener("click", () => {
      empty(dom.ctrwin6);
      global.lw_op = -1;
      qsts.sort(function (a, b) {
        if (a.id > b.id && a.data.started === true) return -1;
        if (a.id < b.id && a.data.done === true && a.data.started === false)
          return 1;
      });
      dom.qstbody = addElement(dom.ctrwin6, "div");
      this.qstlbl = addElement(dom.qstbody, "div");
      this.qstlbl.innerHTML = "Q U E S T　　L I S T";
      this.qstlbl.style.textAlign = "center";
      this.qstlbl.style.padding = 7;
      this.qstlbl.style.background = "linear-gradient(180deg,#182347,#13152f)";
      for (let a in qsts) {
        let c,
          rarc,
          rarts = "";
        switch (qsts[a].rar) {
          case 0: {
            rarc = "grey";
            break;
          }
          case 1: {
            rarc = "white";
            break;
          }
          case 2: {
            rarts = "0px 0px 1px blue";
            rarc = "cyan";
            break;
          }
          case 3: {
            rarts = "0px 0px 2px lime";
            rarc = "lime";
            break;
          }
          case 4: {
            rarts = "0px 0px 3px orange";
            rarc = "yellow";
            break;
          }
          case 5: {
            rarts = "0px 0px 2px crimson,0px 0px 5px red";
            rarc = "orange";
            break;
          }
          case 6: {
            rarts = "1px 1px 1px black,0px 0px 2px purple";
            rarc = "purple";
            break;
          }
          case 7: {
            rarts = "hotpink 1px 1px .1em,cyan -1px -1px .1em";
            rarc = "black";
            break;
          }
        }
        if (qsts[a].data.done) c = "green";
        if (qsts[a].data.started) c = "cyan";
        this.qstcell = addElement(dom.qstbody, "div", null, "skwmmc");
        this.qstcell.innerHTML = qsts[a].name;
        this.qstcell.style.color = c;
        this.qstcell.style.textAlign = "center";
        this.qstcell.style.display = "block";
        let rar = "";
        for (let i = 0; i < qsts[a].rar; i++) rar += " ★ ";
        this.qstcell.innerHTML +=
          ' <small style="font-size:.6em;color:' +
          rarc +
          ";text-shadow:" +
          rarts +
          '">' +
          rar +
          "</small>";
        if (qsts[a].repeatable)
          this.qstcell.innerHTML += '<small style="color:grey"> ≶</small>';
        if (qsts.length - 1 == Number(a))
          this.qstcell.style.borderBottom = "1px solid #46a";
        this.qstcell.addEventListener("click", function () {
          empty(dom.qstbody);
          this.qmain = addElement(dom.qstbody, "div");
          this.qmain.style.height = 359;
          this.qmain.style.width = "100%";
          this.qmain.style.background =
            "linear-gradient(180deg,#040b2d,#29071c)";
          this.qmain.style.textAlign = "center";
          this.qlabl = addElement(this.qmain, "small");
          this.qlabl.innerHTML =
            "#" +
            qsts[a].id +
            ": " +
            qsts[a].name +
            ' [<small style="color:' +
            rarc +
            ";text-shadow:" +
            rarts +
            '">' +
            rar +
            "</small>]" +
            (qsts[a].data.done && !qsts[a].data.started
              ? '<span style="color:lime"> completed</span>'
              : '<span style="color:yellow"> in progress</span>');
          this.qlabl.style.padding = 6;
          this.qlabl.style.borderBottom = "dotted 2px #2b408a";
          this.qlabl.style.backgroundColor = "#12152f";
          this.qlabl.style.display = "inherit";
          this.qstatba = addElement(this.qmain, "small");
          this.qstatba.innerHTML =
            'Location: <span style="color:green">' + qsts[a].loc + "</span>";
          this.qstatba.style.borderBottom = "1px solid #2b408a";
          this.qstatba.style.display = "block";
          this.qdsc = addElement(this.qmain, "div");
          this.qdsc.innerHTML = qsts[a].desc;
          this.qdsc.style.padding = 12;
          this.qdsc.style.borderBottom = "dotted 2px #2b408a";
          this.qdsc.style.color = "#f7ff82";
          this.qtodo = addElement(this.qmain, "div");
          let goals =
            qsts[a].data.done && !qsts[a].data.started
              ? qsts[a].goalsf()
              : qsts[a].goals();
          this.qtodo.style.padding = 6;
          this.qtodo.innerHTML = "「Objectives」";
          this.qtodo.style.color = "#ffc319";
          this.qtodo.style.backgroundColor = "#12152f";
          this.qgoalbod = addElement(this.qmain, "div");
          this.qgoalbod.style.borderBottom = "dotted 2px #2b408a";
          for (let b in goals) {
            this.qtodoitm = addElement(this.qgoalbod, "div");
            this.qtodoitm.style.padding = 4;
            this.qtodoitm.style.fontSize = "smaller";
            this.qtodoitm.style.backgroundColor = "#182247";
            this.qtodoitm.style.borderTop = "1px solid #3b3158";
            this.qtodoitm.innerHTML = goals[b];
          }
          this.qstatbak = addElement(this.qmain, "div", "qtrtn");
          this.qstatbak.innerHTML = "<= Return";
          this.qstatbak.addEventListener("click", () => {
            dom.jlbrw1s1.click();
          });
        });
      }
    });
    dom.jlbrw1s2.addEventListener("click", function () {
      if (!global.flags.bstu) return;
      empty(dom.ctrwin6);
      global.lw_op = -1;
      let bst_entr_case = addElement(dom.ctrwin6, "div");
      bst_entr_case.style.height = "84%";
      bst_entr_case.style.backgroundColor = "rgb(0,20,44)";
      bst_entr_case.style.overflow = "auto";
      this.bst_entr_head = addElement(bst_entr_case, "div", null, "bst_entr");
      this.bst_entr_head.style.textAlign = "center";
      this.bst_entr_head.style.paddingTop = "3px";
      this.bst_entr_head.style.paddingBottom = "3px";
      this.bst_entr_head1 = addElement(
        this.bst_entr_head,
        "div",
        null,
        "bst_entr1"
      );
      this.bst_entr_head1.innerHTML = "name";
      this.bst_entr_head2 = addElement(
        this.bst_entr_head,
        "div",
        null,
        "bst_entr2"
      );
      this.bst_entr_head2.innerHTML = "rank";
      this.bst_entr_head3 = addElement(
        this.bst_entr_head,
        "div",
        null,
        "bst_entr3"
      );
      this.bst_entr_head3.innerHTML = "kills";
      for (let ii = 1; ii < global.bestiary.length; ii++) {
        let mon;
        for (let id in creature)
          if (creature[id].id === global.bestiary[ii].id) mon = creature[id];
        this.bst_entr_m_case = addElement(
          bst_entr_case,
          "div",
          "bst_entrh",
          "bst_entr"
        );
        this.bst_entr_m_case.style.backgroundColor = "rgb(10,30,54)";
        this.bst_entr_m_e1 = addElement(
          this.bst_entr_m_case,
          "div",
          null,
          "bst_entr1"
        );
        this.bst_entr_m_e1.innerHTML = mon.name;
        this.bst_entr_m_e2 = addElement(
          this.bst_entr_m_case,
          "div",
          null,
          "bst_entr2"
        );
        this.bst_entr_m_e2.innerHTML = global.text.eranks[mon.rnk];
        if (mon.rnk <= 4) this.bst_entr_m_e2.style.color = "lightgrey";
        else if (mon.rnk > 4 && mon.rnk <= 7)
          this.bst_entr_m_e2.style.color = "white";
        else if (mon.rnk > 7 && mon.rnk <= 10)
          this.bst_entr_m_e2.style.color = "lightblue";
        else if (mon.rnk > 10 && mon.rnk <= 13)
          this.bst_entr_m_e2.style.color = "lightgreen";
        else if (mon.rnk > 13 && mon.rnk <= 16)
          this.bst_entr_m_e2.style.color = "lime";
        else if (mon.rnk > 16 && mon.rnk <= 19)
          this.bst_entr_m_e2.style.color = "yellow";
        this.bst_entr_m_e3 = addElement(
          this.bst_entr_m_case,
          "div",
          null,
          "bst_entr3"
        );
        this.bst_entr_m_e3.innerHTML = global.bestiary[ii].kills;
        addDesc(this.bst_entr_m_case, mon, 10);
      }
      let monsize = global.bestiary.length;
      timers.bstmonupdate = setInterval(function () {
        if (monsize < global.bestiary.length) {
          for (let ii = monsize; ii < global.bestiary.length; ii++) {
            let mon;
            for (let id in creature)
              if (creature[id].id === global.bestiary[ii].id)
                mon = creature[id];
            this.bst_entr_m_case = addElement(
              bst_entr_case,
              "div",
              "bst_entrh",
              "bst_entr"
            );
            this.bst_entr_m_case.style.backgroundColor = "rgb(10,30,54)";
            this.bst_entr_m_e1 = addElement(
              this.bst_entr_m_case,
              "div",
              null,
              "bst_entr1"
            );
            this.bst_entr_m_e1.innerHTML = mon.name;
            this.bst_entr_m_e2 = addElement(
              this.bst_entr_m_case,
              "div",
              null,
              "bst_entr2"
            );
            this.bst_entr_m_e2.innerHTML = global.text.eranks[mon.rnk];
            if (mon.rnk <= 4) this.bst_entr_m_e2.style.color = "lightgrey";
            else if (mon.rnk > 4 && mon.rnk <= 7)
              this.bst_entr_m_e2.style.color = "white";
            else if (mon.rnk > 7 && mon.rnk <= 10)
              this.bst_entr_m_e2.style.color = "lightblue";
            else if (mon.rnk > 10 && mon.rnk <= 13)
              this.bst_entr_m_e2.style.color = "lightgreen";
            else if (mon.rnk > 13 && mon.rnk <= 16)
              this.bst_entr_m_e2.style.color = "lime";
            else if (mon.rnk > 16 && mon.rnk <= 19)
              this.bst_entr_m_e2.style.color = "yellow";
            this.bst_entr_m_e3 = addElement(
              this.bst_entr_m_case,
              "div",
              null,
              "bst_entr3"
            );
            this.bst_entr_m_e3.innerHTML = global.bestiary[ii].kills;
            addDesc(this.bst_entr_m_case, mon, 10);
          }
          monsize = global.bestiary.length;
        }
        for (let ii = 1; ii < global.bestiary.length; ii++) {
          let mon;
          for (let id in creature)
            if (creature[id].id === global.bestiary[ii].id) mon = creature[id];
          bst_entr_case.children[ii].children[2].innerHTML =
            global.bestiary[ii].kills;
        }
      }, 1000);
    });
    this.jlbrw2s2.addEventListener("click", function () {
      empty(dom.ctrwin6);
      global.lw_op = -1;
      dom.ch_1 = addElement(dom.ctrwin6, "div");
      dom.ch_1.style.height = "359px";
      dom.ch_1.style.background =
        "linear-gradient(0deg, rgb(24, 18, 51), rgb(0, 44, 87))";
      dom.flsthdr = addElement(dom.ch_1, "div");
      dom.flsthdr.innerHTML = "S T A T S";
      dom.flsthdr.style.background =
        "linear-gradient(0deg,rgb(21, 17, 49),rgb(0, 42, 85))";
      dom.flsthdr.style.borderBottom = "1px #44c dashed";
      dom.flsthdr.style.padding = 2;
      dom.flsthdr.style.fontSize = "small";
      dom.flsthdr.style.height = 18;
      dom.statbod = addElement(dom.ch_1, "div");
      dom.statbod.style.overflow = "auto";
      dom.statbod.style.maxHeight = "93%";
      dom.statbod.style.background =
        "linear-gradient(90deg,rgb(1,1,87),rgb(55,7,57))";
      dom.ch_1.style.textAlign = "center";
      dom.tccon = addElement(dom.statbod, "small", null, "sttc");
      dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
      dom.tcright = addElement(dom.tccon, "div", null, "sttr");
      dom.tcleft.innerHTML = "Game start time";
      dom.tcright.innerHTML = global.stat.sttime;
      /*dom.tccon=addElement(dom.statbod,'small',null,'sttc'); dom.tcleft=addElement(dom.tccon,'div',null,'sttl'); dom.tcright=addElement(dom.tccon,'div',null,'sttr');
        dom.tcleft.innerHTML='Time passed'; let br=global.stat.tick;dom.tcright.innerHTML=(br>=86400?(br/(86400)<<0+' Days '):'')+(br%86400>=3600?(((br%86400/3600)<<0)%24+':'):'')+(br%3600<60?'00':(br%3600>=600?(br%3600/60)<<0:'0'+(br%3600/60)<<0))+(':'+(br%360<60?'0'+br%60:br%60));*/
      dom.tccon = addElement(dom.statbod, "small", null, "sttc");
      dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
      dom.tcright = addElement(dom.tccon, "div", null, "sttr");
      dom.tcleft.innerHTML = "Ingame time passed";
      let br = time.minute - 338143959;
      dom.tcright.innerHTML =
        (br >= YEAR
          ? '<span style="color:orange">' +
            ((br / YEAR) << 0) +
            "</span> Years "
          : "") +
        (br >= MONTH
          ? '<span style="color:yellow">' +
            (((br / MONTH) << 0) % 12) +
            "</span> Months "
          : "") +
        (br >= DAY
          ? '<span style="color:lime">' +
            (((br / DAY) << 0) % 30) +
            "</span> Days "
          : "") +
        ((br / HOUR) % 24 << 0) +
        ":" +
        (br % 60 < 10 ? "0" + (br % 60) : br % 60);
      dom.tcright.style.fontSize = ".9em";
      if (global.stat.gsvs > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Game saves";
        dom.tcright.innerHTML += global.stat.gsvs;
      }
      if (global.stat.athme > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total time spent at home";
        let br = global.stat.athme;
        dom.tcright.innerHTML =
          (br >= YEAR
            ? '<span style="color:orange">' +
              ((br / YEAR) << 0) +
              "</span> Years "
            : "") +
          (br >= MONTH
            ? '<span style="color:yellow">' +
              (((br / MONTH) << 0) % 12) +
              "</span> Months "
            : "") +
          (br >= DAY
            ? '<span style="color:lime">' +
              (((br / DAY) << 0) % 30) +
              "</span> Days "
            : "") +
          ((br / HOUR) % 24 << 0) +
          ":" +
          (br % 60 < 10 ? "0" + (br % 60) : br % 60);
      }
      if (global.stat.timeslp > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Time Slept";
        let br = global.stat.timeslp;
        dom.tcright.innerHTML =
          (br >= YEAR
            ? '<span style="color:orange">' +
              ((br / YEAR) << 0) +
              "</span> Years "
            : "") +
          (br >= MONTH
            ? '<span style="color:yellow">' +
              (((br / MONTH) << 0) % 12) +
              "</span> Months "
            : "") +
          (br >= DAY
            ? '<span style="color:lime">' +
              (((br / DAY) << 0) % 30) +
              "</span> Days "
            : "") +
          ((br / HOUR) % 24 << 0) +
          ":" +
          (br % 60 < 10 ? "0" + (br % 60) : br % 60);
      }
      if (global.stat.lgtstk > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times struck by lightning";
        dom.tcright.innerHTML =
          '<span style="color:black;background-color:yellow">' +
          global.stat.lgtstk +
          "</span>";
      }
      if (global.stat.qstc > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Quests completed";
        dom.tcright.innerHTML = global.stat.qstc;
      }
      if (global.stat.jcom > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Jobs completed";
        dom.tcright.innerHTML = global.stat.jcom;
      }
      if (global.stat.dsct > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Discoveries made";
        dom.tcright.innerHTML = global.stat.dsct;
      }
      if (global.stat.smovet > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times walked";
        dom.tcright.innerHTML = global.stat.smovet;
      }
      if (global.stat.cat_c > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Cat pets";
        dom.tcright.innerHTML = global.stat.cat_c;
      }
      if (global.stat.fooda > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Food consumed";
        dom.tcright.innerHTML = global.stat.fooda;
      }
      if (global.stat.foodt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Bad food consumed";
        dom.tcright.innerHTML = global.stat.foodt;
      }
      if (global.stat.foodb > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Drinks consumed";
        dom.tcright.innerHTML = global.stat.foodb;
      }
      if (global.stat.foodal > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Alcohol consumed";
        dom.tcright.innerHTML = global.stat.foodal;
      }
      if (global.stat.ftried > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Unique food tried";
        dom.tcright.innerHTML = global.stat.ftried;
      }
      if (global.stat.medst > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Medicine used";
        dom.tcright.innerHTML = global.stat.medst;
      }
      if (global.stat.potst > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Potions consumed";
        dom.tcright.innerHTML = global.stat.potst;
      }
      if (global.stat.plst > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Pills consumed";
        dom.tcright.innerHTML = global.stat.plst;
      }
      if (global.stat.igtttl > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Items picked up";
        dom.tcright.innerHTML = global.stat.igtttl;
      }
      if (global.stat.dsst > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Items disassembled";
        dom.tcright.innerHTML = global.stat.dsst;
      }
      if (global.stat.thrt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Items thrown away";
        dom.tcright.innerHTML = global.stat.thrt;
      }
      if (global.stat.crftt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Items crafted";
        dom.tcright.innerHTML = global.stat.crftt;
      }
      if (global.rec_d.length > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Recipes unlocked";
        dom.tcright.innerHTML = global.rec_d.length;
      }
      if (you.skls.length > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Skills unlocked";
        dom.tcright.innerHTML = you.skls.length;
      }
      if (global.titles.length > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Titles unlocked";
        dom.tcright.innerHTML = global.titles.length;
      }
      if (global.stat.exptotl > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total EXP gained";
        dom.tcright.innerHTML = formatw(global.stat.exptotl);
      }
      if (global.stat.slvs > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total skill levels";
        dom.tcright.innerHTML = global.stat.slvs;
      }
      if (global.stat.moneyg > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Money acquired";
        dom.ch_etn2_1 = addElement(dom.tcright, "span");
        dom.ch_etn2_1.style.width = "33.3%";
        dom.ch_etn2_2 = addElement(dom.tcright, "span");
        dom.ch_etn2_2.style.width = "33.3%";
        dom.ch_etn2_3 = addElement(dom.tcright, "span");
        dom.ch_etn2_3.style.width = "33.3%";
        let p = global.stat.moneyg;
        if (p >= GOLD) {
          dom.ch_etn2_1.innerHTML = dom.coingold + ((p / GOLD) << 0);
          dom.ch_etn2_1.style.backgroundColor = "rgb(102, 66, 0)";
        }
        if (p >= SILVER && p % GOLD >= SILVER) {
          dom.ch_etn2_2.innerHTML =
            dom.coinsilver + ((p / SILVER) % SILVER << 0);
          dom.ch_etn2_2.style.backgroundColor = "rgb(56, 56, 56)";
        }
        if (p < SILVER || (p > SILVER && p % SILVER > 0)) {
          dom.ch_etn2_3.innerHTML = dom.coincopper + (p % SILVER << 0);
          dom.ch_etn2_3.style.backgroundColor = "rgb(102, 38, 23)";
        }
      }
      if (global.stat.moneysp > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Money spent in shops";
        dom.ch_etn2_1 = addElement(dom.tcright, "span");
        dom.ch_etn2_1.style.width = "33.3%";
        dom.ch_etn2_2 = addElement(dom.tcright, "span");
        dom.ch_etn2_2.style.width = "33.3%";
        dom.ch_etn2_3 = addElement(dom.tcright, "span");
        dom.ch_etn2_3.style.width = "33.3%";
        let p = global.stat.moneysp;
        if (p >= GOLD) {
          dom.ch_etn2_1.innerHTML = dom.coingold + ((p / GOLD) << 0);
          dom.ch_etn2_1.style.backgroundColor = "rgb(102, 66, 0)";
        }
        if (p >= SILVER && p % GOLD >= SILVER) {
          dom.ch_etn2_2.innerHTML =
            dom.coinsilver + ((p / SILVER) % SILVER << 0);
          dom.ch_etn2_2.style.backgroundColor = "rgb(56, 56, 56)";
        }
        if (p < SILVER || (p > SILVER && p % SILVER > 0)) {
          dom.ch_etn2_3.innerHTML = dom.coincopper + (p % SILVER << 0);
          dom.ch_etn2_3.style.backgroundColor = "rgb(102, 38, 23)";
        }
      }
      if (global.stat.buyt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Goods bought";
        dom.tcright.innerHTML = global.stat.buyt;
      }
      if (global.stat.rdttl > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Books read";
        dom.tcright.innerHTML = global.stat.rdttl;
        addDesc(
          dom.tccon,
          null,
          2,
          "Info",
          '<span style="color:lie">Click to list known books</span>'
        );
        dom.tccon.addEventListener("click", function () {
          if (!global.flags.bksstt) {
            global.flags.bksstt = true;
            dom.bkssttbd = addElement(document.body, "div", null, "bksstt");
            dom.bkssttbd.addEventListener("click", function () {
              empty(dom.bkssttbd);
              document.body.removeChild(dom.bkssttbd);
              global.flags.bksstt = false;
              global.dscr.style.display = "none";
            });
            let bks = [];
            for (let a in item) if (item[a].data.finished) bks.push(item[a]);
            for (let a in bks) {
              dom.bkssttcell = addElement(dom.bkssttbd, "div", null, "blssttc");
              dom.bkssttcell.innerHTML = bks[a].name;
              addDesc(dom.bkssttcell, bks[a]);
              switch (bks[a].rar) {
                case 0: {
                  dom.bkssttcell.style.color = "grey";
                  break;
                }
                case 1: {
                  dom.bkssttcell.style.color = "rgb(188,254,254)";
                  break;
                }
                case 2: {
                  dom.bkssttcell.style.textShadow = "0px 0px 1px blue";
                  dom.bkssttcell.style.color = "cyan";
                  break;
                }
                case 3: {
                  dom.bkssttcell.style.textShadow = "0px 0px 2px lime";
                  dom.bkssttcell.style.color = "lime";
                  break;
                }
                case 4: {
                  dom.bkssttcell.style.textShadow = "0px 0px 3px orange";
                  dom.bkssttcell.style.color = "yellow";
                  break;
                }
                case 5: {
                  dom.bkssttcell.style.textShadow =
                    "0px 0px 2px crimson,0px 0px 5px red";
                  dom.bkssttcell.style.color = "orange";
                  break;
                }
                case 6: {
                  dom.bkssttcell.style.textShadow =
                    "1px 1px 1px black,0px 0px 2px purple";
                  dom.bkssttcell.style.color = "purple";
                  break;
                }
              }
            }
          }
        });
      }
      if (global.stat.rdgtttl > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total reading time";
        let br = global.stat.rdgtttl;
        dom.tcright.innerHTML =
          (br >= YEAR
            ? '<span style="color:orange">' +
              ((br / YEAR) << 0) +
              "</span> Years "
            : "") +
          (br >= MONTH
            ? '<span style="color:yellow">' +
              (((br / MONTH) << 0) % 12) +
              "</span> Months "
            : "") +
          (br >= DAY
            ? '<span style="color:lime">' +
              (((br / DAY) << 0) % 30) +
              "</span> Days "
            : "") +
          ((br / HOUR) % 24 << 0) +
          ":" +
          (br % 60 < 10 ? "0" + (br % 60) : br % 60);
      }
      if (global.stat.popt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times description window appeared";
        dom.tcright.innerHTML = global.stat.popt;
      }
      if (global.stat.dmgdt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total damage dealt";
        dom.tcright.innerHTML = formatw(global.stat.dmgdt);
      }
      if (global.stat.dmgrt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total damage recieved";
        dom.tcright.innerHTML = formatw(global.stat.dmgrt);
      }
      if (global.stat.deadt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times died";
        dom.tcright.innerHTML = global.stat.deadt;
      }
      if (global.stat.deadt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Last cause of casualty";
        dom.tcright.innerHTML = getlastd();
      }
      if (global.stat.akills > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Total kills";
        dom.tcright.innerHTML = global.stat.akills;
      }
      if (global.stat.onesht > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times killed with a single hit";
        dom.tcright.innerHTML = global.stat.onesht;
      }
      if (global.stat.misst > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times missed the attack";
        dom.tcright.innerHTML = global.stat.misst;
      }
      if (global.stat.dodgt > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Times dodged the attack";
        dom.tcright.innerHTML = global.stat.dodgt;
      }
      if (global.stat.msks[0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Humanoid-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[0];
      }
      if (global.stat.msks[1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Beast-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[1];
      }
      if (global.stat.msks[2] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Undead-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[2];
      }
      if (global.stat.msks[3] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Evil-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[3];
      }
      if (global.stat.msks[4] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Phantom-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[4];
      }
      if (global.stat.msks[5] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Dragon-class foes slayed";
        dom.tcright.innerHTML = global.stat.msks[5];
      }
      if (global.stat.msts[0][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Unarmed attacks";
        dom.tcright.innerHTML = global.stat.msts[0][0];
      }
      if (global.stat.msts[0][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Unarmed kills";
        dom.tcright.innerHTML = global.stat.msts[0][1];
      }
      if (global.stat.msts[1][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Sword attacks";
        dom.tcright.innerHTML = global.stat.msts[1][0];
      }
      if (global.stat.msts[1][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Sword kills";
        dom.tcright.innerHTML = global.stat.msts[1][1];
      }
      if (global.stat.msts[2][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Axe attacks";
        dom.tcright.innerHTML = global.stat.msts[2][0];
      }
      if (global.stat.msts[2][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Axe kills";
        dom.tcright.innerHTML = global.stat.msts[2][1];
      }
      if (global.stat.msts[3][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Dagger attacks";
        dom.tcright.innerHTML = global.stat.msts[3][0];
      }
      if (global.stat.msts[3][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Dagger kills";
        dom.tcright.innerHTML = global.stat.msts[3][1];
      }
      if (global.stat.msts[4][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Polearm/Spear attacks";
        dom.tcright.innerHTML = global.stat.msts[4][0];
      }
      if (global.stat.msts[4][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Polearm/Spear kills";
        dom.tcright.innerHTML = global.stat.msts[4][1];
      }
      if (global.stat.msts[5][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Hammer/Club attacks";
        dom.tcright.innerHTML = global.stat.msts[5][0];
      }
      if (global.stat.msts[5][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Hammer/Club kills";
        dom.tcright.innerHTML = global.stat.msts[5][1];
      }
      if (global.stat.msts[6][0] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Staff attacks";
        dom.tcright.innerHTML = global.stat.msts[6][0];
      }
      if (global.stat.msts[6][1] > 0) {
        dom.tccon = addElement(dom.statbod, "small", null, "sttc");
        dom.tcleft = addElement(dom.tccon, "div", null, "sttl");
        dom.tcright = addElement(dom.tccon, "div", null, "sttr");
        dom.tcleft.innerHTML = "Staff kills";
        dom.tcright.innerHTML = global.stat.msts[6][1];
      }
    });
  }
});

dom.ct_bt1_c = addElement(dom.ctrwin2, "div", "crf_c");
dom.ct_bt1_1_ncont = addElement(dom.ct_bt1_c, "div");
dom.ct_bt1_1_ncont.style.height = "100%";
dom.ct_bt1_1_ncont.style.width = "45%";
dom.ct_bt1_1_cont = addElement(dom.ct_bt1_1_ncont, "div");
dom.ct_bt1_1 = addElement(dom.ct_bt1_1_ncont, "div", "crf_l");
dom.ct_bt1_1.style.height = 343;
dom.ct_bt1_1.style.width = "100%";
dom.ct_bt1_1_cont.style.bottom = 0;
dom.ct_bt1_1_cont.style.borderBottom = "1px solid cornflowerblue ";
dom.ct_bt1_1_cont.style.display = "flex";
dom.ct_bt1_1_cont_a = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_c = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_b = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_d = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_e = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_f = addElement(dom.ct_bt1_1_cont, "small", null, "crf_c_bts");
dom.ct_bt1_1_cont_f.style.borderRight = "none";
16;
dom.ct_bt1_1_cont_a.style.backgroundColor = "darkslategrey";
dom.ct_bt1_1_cont_b.style.backgroundColor = "#332e12";
dom.ct_bt1_1_cont_c.style.backgroundColor = "#1c3319";
dom.ct_bt1_1_cont_d.style.backgroundColor = "#b73c0d";
dom.ct_bt1_1_cont_e.style.backgroundColor = "#313254";
dom.ct_bt1_1_cont_f.style.backgroundColor = "#5155d6";
dom.ct_bt1_1_cont_a.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(0);
});
dom.ct_bt1_1_cont_b.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(1);
});
dom.ct_bt1_1_cont_c.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(2);
});
dom.ct_bt1_1_cont_d.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(3);
});
dom.ct_bt1_1_cont_e.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(4);
});
dom.ct_bt1_1_cont_f.addEventListener("click", function () {
  rstcrtthg();
  this.style.color = "yellow";
  rsort(5);
});
global.spbtsr = [
  dom.ct_bt1_1_cont_a,
  dom.ct_bt1_1_cont_b,
  dom.ct_bt1_1_cont_c,
  dom.ct_bt1_1_cont_d,
  dom.ct_bt1_1_cont_e,
  dom.ct_bt1_1_cont_f,
];
dom.ct_bt1_1_cont_a.innerHTML = "ALL";
dom.ct_bt1_1_cont_b.innerHTML = "FOD";
dom.ct_bt1_1_cont_c.innerHTML = "MED";
dom.ct_bt1_1_cont_d.innerHTML = "WEP";
dom.ct_bt1_1_cont_e.innerHTML = "EQP";
dom.ct_bt1_1_cont_f.innerHTML = "MAT";
addDesc(dom.ct_bt1_1_cont_a, null, 2, "Filter", "All");
addDesc(dom.ct_bt1_1_cont_b, null, 2, "Filter", "Food");
addDesc(dom.ct_bt1_1_cont_c, null, 2, "Filter", "Medicine/Tools");
addDesc(dom.ct_bt1_1_cont_d, null, 2, "Filter", "Weapons");
addDesc(dom.ct_bt1_1_cont_e, null, 2, "Filter", "Equipment/Accessories");
addDesc(dom.ct_bt1_1_cont_f, null, 2, "Filter", "Materials/Misc.");
dom.ct_bt1_2 = addElement(dom.ct_bt1_c, "div", "crf_r");
dom.ct_bt4_1 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_1a = addElement(dom.ct_bt4_1, "div", null, "opt_t");
dom.ct_bt4_1a.innerHTML = "Message log limit";
dom.ct_bt4_1b = addElement(dom.ct_bt4_1, "input", null, "opt_v");
dom.ct_bt4_1b.value = global.msgs_max;
dom.ct_bt4_1b.type = "number";
dom.ct_bt4_1b.min = 1;
dom.ct_bt4_1b.max = 100;
dom.ct_bt4_1b.addEventListener("change", function () {
  if (this.value < 1) this.value = 1;
  else if (this.value > 100) this.value = 100;
  global.msgs_max = this.value;
});
function rstcrtthg() {
  for (let a in global.spbtsr) global.spbtsr[a].style.color = "inherit";
}

dom.ct_bt4_2 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_2a = addElement(dom.ct_bt4_2, "div", null, "opt_t");
dom.ct_bt4_2a.innerHTML = "BG Color";
dom.ct_bt4_21b = addElement(dom.ct_bt4_2, "input", null, "opt_v");
dom.ct_bt4_21b.value = global.bg_r;
dom.ct_bt4_21b.type = "range";
dom.ct_bt4_21b.min = 0;
dom.ct_bt4_21b.max = 255;
dom.ct_bt4_21b.style.width = "85px";
dom.ct_bt4_21b.style.height = "16px";
dom.ct_bt4_21b.addEventListener("input", function () {
  document.body.removeAttribute("style");
  global.flags.bgspc = false;
  global.bg_r = this.value;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
  dom.ct_bt4_31b.innerHTML = global.bg_r;
});
dom.ct_bt4_22b = addElement(dom.ct_bt4_2, "input", null, "opt_v");
dom.ct_bt4_22b.value = global.bg_g;
dom.ct_bt4_22b.type = "range";
dom.ct_bt4_21b.style.height = "16px";
dom.ct_bt4_22b.style.height = "16px";
dom.ct_bt4_22b.min = 0;
dom.ct_bt4_22b.max = 255;
dom.ct_bt4_22b.style.width = "85px";
dom.ct_bt4_22b.style.left = "367px";
dom.ct_bt4_22b.addEventListener("input", function () {
  document.body.removeAttribute("style");
  global.flags.bgspc = false;
  global.bg_g = this.value;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
  dom.ct_bt4_32b.innerHTML = global.bg_g;
});
dom.ct_bt4_23b = addElement(dom.ct_bt4_2, "input", null, "opt_v");
dom.ct_bt4_23b.value = global.bg_b;
dom.ct_bt4_23b.type = "range";
dom.ct_bt4_21b.style.height = "16px";
dom.ct_bt4_23b.style.height = "16px";
dom.ct_bt4_23b.min = 0;
dom.ct_bt4_23b.max = 255;
dom.ct_bt4_23b.style.width = "85px";
dom.ct_bt4_23b.style.left = "459px";
dom.ct_bt4_23b.addEventListener("input", function () {
  document.body.removeAttribute("style");
  global.flags.bgspc = false;
  global.bg_b = this.value;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
  dom.ct_bt4_33b.innerHTML = global.bg_b;
});

dom.ct_bt4_3 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_3a = addElement(dom.ct_bt4_3, "div", null, "opt_t");
dom.ct_bt4_3a.innerHTML = "　";
dom.ct_bt4_31b = addElement(dom.ct_bt4_3, "div", null, "opt_v");
dom.ct_bt4_31b.style.textAlign = "center";
dom.ct_bt4_31b.style.width = "83px";
dom.ct_bt4_31b.innerHTML = global.bg_r || 255;
dom.ct_bt4_32b = addElement(dom.ct_bt4_3, "div", null, "opt_v");
dom.ct_bt4_32b.style.textAlign = "center";
dom.ct_bt4_32b.style.width = "83px";
dom.ct_bt4_32b.innerHTML = global.bg_g || 255;
dom.ct_bt4_32b.style.left = "367px";
dom.ct_bt4_33b = addElement(dom.ct_bt4_3, "div", null, "opt_v");
dom.ct_bt4_33b.style.textAlign = "center";
dom.ct_bt4_33b.style.width = "83px";
dom.ct_bt4_33b.innerHTML = global.bg_b || 255;
dom.ct_bt4_33b.style.left = "459px";

dom.ct_bt4_03 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_03a = addElement(dom.ct_bt4_03, "div", null, "opt_t");
dom.ct_bt4_03a.innerHTML = "BG presets";
dom.ct_bt4_03b = addElement(dom.ct_bt4_03, "div", null, "opt_v");
dom.ct_bt4_03b.style.width = 274;
dom.ct_bt4_03b.style.height = 20;
dom.ct_bt4_03b.style.display = "flex";
dom.ct_bt4_03b.style.padding = 0;
dom.ct_bt4_03b.style.textAlign = "center";
dom.ct_bt4_03b1 = addElement(dom.ct_bt4_03b, "small");
dom.ct_bt4_03b2 = addElement(dom.ct_bt4_03b, "small");
dom.ct_bt4_03b3 = addElement(dom.ct_bt4_03b, "small");
dom.ct_bt4_03b4 = addElement(dom.ct_bt4_03b, "small");
dom.ct_bt4_03b1.style.width =
  dom.ct_bt4_03b2.style.width =
  dom.ct_bt4_03b3.style.width =
  dom.ct_bt4_03b4.style.width =
    "25%";
dom.ct_bt4_03b1.innerHTML = "White";
dom.ct_bt4_03b2.innerHTML = "grey";
dom.ct_bt4_03b3.innerHTML = "night";
dom.ct_bt4_03b4.innerHTML = "special";
dom.ct_bt4_03b1.style.color = "#000";
dom.ct_bt4_03b1.style.backgroundColor = "white";
dom.ct_bt4_03b2.style.color = "lightgrey";
dom.ct_bt4_03b2.style.backgroundColor = "#666";
dom.ct_bt4_03b3.style.color = "yellow";
dom.ct_bt4_03b3.style.backgroundColor = "rgb(18,18,46)";
dom.ct_bt4_03b4.style.background = "linear-gradient(180deg,#000,#123)";
dom.ct_bt4_03b1.addEventListener("click", function () {
  global.flags.bgspc = false;
  global.bg_r = 255;
  global.bg_g = 255;
  global.bg_b = 255;
  document.body.removeAttribute("style");
  dom.ct_bt4_31b.innerHTML = 255;
  dom.ct_bt4_32b.innerHTML = 255;
  dom.ct_bt4_33b.innerHTML = 255;
  dom.ct_bt4_21b.value = global.bg_r;
  dom.ct_bt4_22b.value = global.bg_g;
  dom.ct_bt4_23b.value = global.bg_b;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
});
dom.ct_bt4_03b2.addEventListener("click", function () {
  global.flags.bgspc = false;
  global.bg_r = 188;
  global.bg_g = 188;
  global.bg_b = 188;
  document.body.removeAttribute("style");
  dom.ct_bt4_31b.innerHTML = 188;
  dom.ct_bt4_32b.innerHTML = 188;
  dom.ct_bt4_33b.innerHTML = 188;
  dom.ct_bt4_21b.value = global.bg_r;
  dom.ct_bt4_22b.value = global.bg_g;
  dom.ct_bt4_23b.value = global.bg_b;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
});
dom.ct_bt4_03b3.addEventListener("click", function () {
  global.flags.bgspc = false;
  global.bg_r = 18;
  global.bg_g = 18;
  global.bg_b = 46;
  document.body.removeAttribute("style");
  dom.ct_bt4_31b.innerHTML = 18;
  dom.ct_bt4_32b.innerHTML = 18;
  dom.ct_bt4_33b.innerHTML = 46;
  dom.ct_bt4_21b.value = global.bg_r;
  dom.ct_bt4_22b.value = global.bg_g;
  dom.ct_bt4_23b.value = global.bg_b;
  document.body.style.backgroundColor =
    "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
});
dom.ct_bt4_03b4.addEventListener("click", function () {
  global.flags.bgspc = true;
  dom.ct_bt4_31b.innerHTML = "SPCL";
  dom.ct_bt4_32b.innerHTML = "SPCL";
  dom.ct_bt4_33b.innerHTML = "SPCL";
  document.body.style.background = "linear-gradient(180deg,#000,#123)";
});

dom.ct_bt4_4 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_4a = addElement(dom.ct_bt4_4, "div", null, "opt_t");
dom.ct_bt4_4a.innerHTML = "Destroy gradients";
dom.ct_bt4_41b = addElement(dom.ct_bt4_4, "input", null, "opt_v");
dom.ct_bt4_41b.type = "checkbox";
dom.ct_bt4_41b.addEventListener("click", () => {
  nograd(global.flags.grd_s);
});
dom.ct_bt4_5 = addElement(dom.ctrwin4, "div", null, "opt_c");
dom.ct_bt4_5a = addElement(dom.ct_bt4_5, "div", null, "opt_ta");
dom.ct_bt4_5b = addElement(dom.ct_bt4_5, "div", null, "opt_va");
dom.ct_bt4_5a.innerHTML = "Export";
dom.ct_bt4_5a.style.border = "1px lightgrey solid";
dom.ct_bt4_5a.addEventListener("click", function () {
  if (!global.flags.expatv) {
    t = save(true);
    global.flags.expatv = true;
    dom.ct_bt4_5a_nc = addElement(document.body, "div");
    dom.ct_bt4_5a_nc.style.position = "absolute";
    dom.ct_bt4_5a_nc.style.padding = 2;
    dom.ct_bt4_5a_nc.style.top = 370;
    dom.ct_bt4_5a_nc.style.left = 330;
    dom.ct_bt4_5a_nc.style.width = 600;
    dom.ct_bt4_5a_nc.style.height = 400;
    dom.ct_bt4_5a_nc.style.border = "2px solid black";
    dom.ct_bt4_5a_nc.style.backgroundColor = "lightgrey";
    dom.ct_bt4_5a_nh = addElement(dom.ct_bt4_5a_nc, "div");
    dom.ct_bt4_5a_nh.style.height = 20;
    dom.ct_bt4_5a_nh.style.borderBottom = "2px solid black";
    dom.ct_bt4_5a_nhv = addElement(dom.ct_bt4_5a_nh, "div");
    dom.ct_bt4_5a_nhv.style.float = "left";
    dom.ct_bt4_5a_nhv.style.marginRight = 6;
    dom.ct_bt4_5a_nhv.style.backgroundColor = "grey";
    dom.ct_bt4_5a_nhv.innerHTML = "Export As Text";
    dom.ct_bt4_5a_nhv.addEventListener("click", function () {
      dom.ct_bt4_5a_nbc.value = t;
    });
    dom.ct_bt4_5a_nhz = addElement(dom.ct_bt4_5a_nh, "div");
    dom.ct_bt4_5a_nhz.style.float = "left";
    dom.ct_bt4_5a_nhz.style.backgroundColor = "grey";
    dom.ct_bt4_5a_nhz.innerHTML = "Export As File";
    dom.ct_bt4_5a_nhz.addEventListener("click", function () {
      let a = new Date();
      let temp = document.createElement("a");
      temp.href = "data:text/plain;charset=utf-8," + t;
      let n = you.name;
      if (/(<.*>)|(\(.*\))/.test(you.name)) n = "";
      temp.download =
        n +
        " - v" +
        global.ver +
        " - " +
        (a.getFullYear() +
          "/" +
          (a.getMonth() + 1) +
          "/" +
          a.getDate() +
          " " +
          a.getHours() +
          "_" +
          (a.getMinutes() >= 10 ? a.getMinutes() : "0" + a.getMinutes()) +
          "_" +
          (a.getSeconds() >= 10 ? a.getSeconds() : "0" + a.getSeconds())) +
        " [Proto23]";
      temp.click();
    });
    dom.ct_bt4_5a_nhx = addElement(dom.ct_bt4_5a_nh, "div");
    draggable(dom.ct_bt4_5a_nh, dom.ct_bt4_5a_nc);
    dom.ct_bt4_5a_nhx.innerHTML = "✖";
    dom.ct_bt4_5a_nhx.style.float = "right";
    dom.ct_bt4_5a_nhx.style.backgroundColor = "red";
    dom.ct_bt4_5a_nhx.addEventListener("click", function () {
      global.flags.expatv = false;
      empty(dom.ct_bt4_5a_nc);
      document.body.removeChild(dom.ct_bt4_5a_nc);
      kill(dom.ct_bt4_5a_nc);
    });
    dom.ct_bt4_5a_nb = addElement(dom.ct_bt4_5a_nc, "div");
    dom.ct_bt4_5a_nbc = addElement(dom.ct_bt4_5a_nb, "textArea");
    dom.ct_bt4_5a_nbc.style.fontFamily = "MS Gothic";
    dom.ct_bt4_5a_nbc.style.width = "100%";
    dom.ct_bt4_5a_nbc.style.height = "378px";
    dom.ct_bt4_5a_nbc.style.overflow = "auto";
  }
});
dom.ct_bt4_5b.innerHTML = "Import";
dom.ct_bt4_5b.style.border = "1px lightgrey solid";
dom.ct_bt4_5b.addEventListener("click", function () {
  if (!global.flags.impatv) {
    global.flags.impatv = true;
    dom.ct_bt4_5b_nc = addElement(document.body, "div");
    dom.ct_bt4_5b_nc.style.position = "absolute";
    dom.ct_bt4_5b_nc.style.padding = 2;
    dom.ct_bt4_5b_nc.style.top = 370;
    dom.ct_bt4_5b_nc.style.left = 330;
    dom.ct_bt4_5b_nc.style.width = 600;
    dom.ct_bt4_5b_nc.style.height = 400;
    dom.ct_bt4_5b_nc.style.border = "2px solid black";
    dom.ct_bt4_5b_nc.style.backgroundColor = "lightgrey";
    dom.ct_bt4_5b_nh = addElement(dom.ct_bt4_5b_nc, "div");
    dom.ct_bt4_5b_nh.style.height = 20;
    dom.ct_bt4_5b_nh.style.borderBottom = "2px solid black";
    dom.ct_bt4_5b_nhv = addElement(dom.ct_bt4_5b_nh, "div");
    draggable(dom.ct_bt4_5b_nh, dom.ct_bt4_5b_nc);
    dom.ct_bt4_5b_nhv.style.float = "left";
    dom.ct_bt4_5b_nhv.style.backgroundColor = "grey";
    dom.ct_bt4_5b_nhv.innerHTML = "Import As Text";
    dom.ct_bt4_5b_nhv.style.marginRight = 6;
    dom.ct_bt4_5b_nhv.addEventListener("click", function () {
      if (dom.ct_bt4_5b_nbc.value == "" || dom.ct_bt4_5b_nbc.value == "?") {
        dom.ct_bt4_5b_nbc.value = "?";
        return;
      }
      let storage = window.localStorage;
      let t = dom.ct_bt4_5b_nbc.value;
      bt = b64_to_utf8(dom.ct_bt4_5b_nbc.value);
      if (/savevalid/g.test(bt)) {
        storage.setItem("v0.2a", t);
        load(t);
        global.flags.impatv = false;
        empty(dom.ct_bt4_5b_nc);
        document.body.removeChild(dom.ct_bt4_5b_nc);
        kill(dom.ct_bt4_5b_nc);
      } else {
        dom.ct_bt4_5b_nbc.value = "Save Invalid";
        return;
      }
    });
    dom.ct_bt4_5b_nhx = addElement(dom.ct_bt4_5b_nh, "div");
    dom.ct_bt4_5b_nhx.innerHTML = "✖";
    dom.ct_bt4_5b_nhx.style.float = "right";
    dom.ct_bt4_5b_nhx.style.backgroundColor = "red";
    dom.ct_bt4_5b_nhx.addEventListener("click", function () {
      global.flags.impatv = false;
      empty(dom.ct_bt4_5b_nc);
      document.body.removeChild(dom.ct_bt4_5b_nc);
    });
    dom.ct_bt4_5b_nhz = addElement(dom.ct_bt4_5b_nh, "div");
    dom.ct_bt4_5b_nhz.style.float = "left";
    dom.ct_bt4_5b_nhz.style.backgroundColor = "grey";
    dom.ct_bt4_5b_nhz.innerHTML = "Load File";
    dom.ct_bt4_5b_nhz2 = addElement(dom.ct_bt4_5b_nhz, "input");
    dom.ct_bt4_5b_nhz2.innerHTML = "323";
    dom.ct_bt4_5b_nhz2.accept = ".txt";
    dom.ct_bt4_5b_nhz2.type = "file";
    dom.ct_bt4_5b_nhz2.style.opacity = 0;
    dom.ct_bt4_5b_nhz2.style.position = "absolute";
    dom.ct_bt4_5b_nhz2.style.left = 128;
    dom.ct_bt4_5b_nhz2.style.width = 81;
    dom.ct_bt4_5b_nhz2.style.top = 0;
    dom.ct_bt4_5b_nhz2.style.height = 18;
    dom.ct_bt4_5b_nhz2.addEventListener("change", function () {
      let r = new FileReader();
      r.readAsText(this.files[0]);
      let storage = window.localStorage;
      r.addEventListener("load", function () {
        let t = b64_to_utf8(r.result);
        if (/savevalid/g.test(t)) {
          dom.ct_bt4_5b_nbc.value = "Load Successful";
          storage.setItem("v0.2a", r.result);
          load(r.result);
          global.flags.impatv = false;
          empty(dom.ct_bt4_5b_nc);
          document.body.removeChild(dom.ct_bt4_5b_nc);
          kill(dom.ct_bt4_5b_nc);
        } else {
          dom.ct_bt4_5b_nbc.value = "Save Invalid";
          return;
        }
      });
    });
    dom.ct_bt4_5b_nb = addElement(dom.ct_bt4_5b_nc, "div");
    dom.ct_bt4_5b_nbc = addElement(dom.ct_bt4_5b_nb, "textArea");
    dom.ct_bt4_5b_nbc.style.fontFamily = "MS Gothic";
    dom.ct_bt4_5b_nbc.style.width = "100%";
    dom.ct_bt4_5b_nbc.style.height = "378px";
    dom.ct_bt4_5b_nbc.style.overflow = "auto";
  }
});
/*
  dom.ct_bt4_6 = addElement(dom.ctrwin4,'div',null,'opt_c'); 
  dom.ct_bt4_6a = addElement(dom.ct_bt4_6,'div',null,'opt_t');
  dom.ct_bt4_6a.innerHTML = 'Attach timestamp to messages';
  dom.ct_bt4_61b = addElement(dom.ct_bt4_6,'input',null,'opt_v'); dom.ct_bt4_61b.type='checkbox';
  dom.ct_bt4_61b.addEventListener('click',()=>{global.flags.msgtm=!global.flags.msgtm});*/

dom.gmsgs = addElement(document.body, "div", "gmsgs");
dom.mstt = addElement(dom.gmsgs, "div", "mstt");
if (!global.flags.aw_u) dom.gmsgs.style.display = "none";
dom.mstt.style.textAlign = "center";
dom.mstt.innerHTML = "m e s s a g e　　　l o g";
dom.mstt.style.fontSize = "1.1em";
dom.mstt.style.borderBottom = "dashed 2px RoyalBlue";
dom.mscont = addElement(dom.gmsgs, "div", "mscont");
dom.m_control = addElement(dom.gmsgs, "div", "m_control");
dom.m_b_1 = addElement(dom.m_control, "small", null, "bts_m");
dom.m_b_1.innerHTML = "freeze messagelog　";
dom.m_b_1_c = addElement(dom.m_b_1, "span", null, "bts_m_b");
dom.m_b_1.addEventListener("click", () => {
  if (global.flags.m_freeze === false) {
    global.flags.m_freeze = true;
    dom.m_b_1_c.innerHTML = "Ｘ";
  } else {
    global.flags.m_freeze = false;
    dom.m_b_1_c.innerHTML = "";
  }
});

dom.m_b_2 = addElement(dom.m_control, "small", null, "bts_m");
dom.m_b_2.innerHTML = "　stop combatlog　";
dom.m_b_2.style.left = "19px";
dom.m_b_2_c = addElement(dom.m_b_2, "span", null, "bts_m_b");
dom.m_b_2.addEventListener("click", () => {
  if (global.flags.m_blh === false) {
    global.flags.m_blh = true;
    dom.m_b_2_c.innerHTML = "Ｘ";
  } else {
    global.flags.m_blh = false;
    dom.m_b_2_c.innerHTML = "";
  }
});
dom.m_b_3 = addElement(dom.m_control, "small", null, "bts_m");
dom.m_b_3.innerHTML = "CLR";
dom.m_b_3.style.width = "36px";
dom.m_b_3.style.borderRight = "none";
dom.m_b_3.style.left = "38px";
dom.m_b_3.style.textAlign = "center";
dom.m_b_3.addEventListener("click", () => {
  empty(dom.mscont);
});

dom.inv_btn_1.innerHTML = "ALL";
dom.inv_btn_2.innerHTML = "WPN";
dom.inv_btn_3.innerHTML = "EQP";
dom.inv_btn_4.innerHTML = "USE";
dom.inv_btn_5.innerHTML = "OTHER";
dom.inv_btn_1_b.innerHTML = "A-Z";
dom.inv_btn_2_b.innerHTML = "1-9";
dom.inv_btn_3_b.innerHTML = "TPE";
dom.inv_con = addElement(dom.inv_ctx_b, "div", "inv_con");
dom.inv_con.style.padding = "8px";
/*dom.inv_con.addEventListener('scroll',function(){
  for(a in this.children) {if(this.children[a].offsetTop-this.scrollTop+19<0) this.children[a].style.display='none'; else dom.inv_con[a].style.display='';}
});*/
dom.inv_btn_1.addEventListener("click", function () {
  isort(1);
  invbtsrst();
});
dom.inv_btn_2.addEventListener("click", function () {
  isort(2);
  invbtsrst();
});
dom.inv_btn_3.addEventListener("click", function () {
  isort(3);
  invbtsrst();
});
dom.inv_btn_4.addEventListener("click", function () {
  isort(4);
  invbtsrst();
});
dom.inv_btn_5.addEventListener("click", function () {
  isort(5);
  invbtsrst();
});
dom.inv_btn_1_b.addEventListener("click", function () {
  if (global.flags.sort_a === true) {
    inv.sort(function (a, b) {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    global.flags.sort_a = false;
  } else {
    inv.sort(function (a, b) {
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    global.flags.sort_a = true;
  }
  iftrunkopenc(1);
  isort(global.sm);
});
dom.inv_btn_2_b.addEventListener("click", function () {
  if (global.flags.sort_b === true) {
    inv.sort(function (a, b) {
      if (a.amount < b.amount) return -1;
      if (a.amount > b.amount) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    global.flags.sort_b = false;
  } else {
    inv.sort(function (a, b) {
      if (a.amount > b.amount) return -1;
      if (a.amount < b.amount) return 1;
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    global.flags.sort_b = true;
  }
  iftrunkopenc(1);
  isort(global.sm);
});
dom.inv_btn_3_b.addEventListener("click", function () {
  if (global.flags.sort_c === true) {
    inv.sort(function (a, b) {
      if (a.id < b.id) return -1;
      if (a.id > b.id) return 1;
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    global.flags.sort_c = false;
  } else {
    inv.sort(function (a, b) {
      if (a.id > b.id) return -1;
      if (a.id < b.id) return 1;
      if (a.name > b.name) return -1;
      if (a.name < b.name) return 1;
      return 0;
    });
    global.flags.sort_c = true;
  }
  iftrunkopenc(1);
  isort(global.sm);
});
dom.d3.update = function () {
  this.innerHTML = " lvl:" + you.lvl + " '" + you.title.name + "'";
};
dom.d5_1_1.update = function () {
  this.innerHTML =
    "hp: " + format3(you.hp.toString()) + "/" + format3(you.hpmax.toString());
  dom.d5_1.style.width = (100 * you.hp) / you.hpmax + "%";
};
dom.d5_2_1.update = function () {
  this.innerHTML =
    "exp: " +
    format3(Math.round(you.exp).toString()) +
    "/" +
    format3(you.expnext_t.toString());
  dom.d5_2.style.width = (100 * you.exp) / you.expnext_t + "%";
};
dom.d5_2_1.update();
dom.d5_3_1.update = function () {
  this.innerHTML =
    "energy: " +
    format3(Math.round(you.sat).toString()) +
    "/" +
    format3(you.satmax.toString()) +
    " eff: " +
    Math.round(you.efficiency() * 100) +
    "%";
  dom.d5_3.style.width =
    you.sat >= 0 ? (100 * you.sat) / you.satmax + "%" : "0%";
};
dom.d6.update = function () {
  this.innerHTML = "rank: " + format3(you.rank().toString());
};
dom.d6.update();
dom.hit_c = function () {
  let hit_a = hit_calc(1);
  let hit_b = hit_calc(2);
  let drk = global.flags.isdark && !cansee();
  if (hit_a > 100) hit_a = 100;
  else if (hit_a < 0) hit_a = 0;
  if (hit_b > 100) hit_b = 100;
  else if (hit_b < 0) hit_b = 0;
  dom.d8.innerHTML =
    'hit chance: <span style="color:' +
    (drk ? "darkgrey" : "") +
    '">' +
    Math.round(hit_a * (drk ? 0.3 + skl.ntst.lvl * 0.07 : 1)) +
    "%</span> / dodge chance: " +
    (100 - Math.round(hit_b)) +
    "%" +
    (you.mods.ddgmod !== 0
      ? '(<span style="color:orange">' + you.mods.ddgmod * 100 + "%</span>)"
      : "");
};

dom.sl = addElement(document.body, "div", "sl", "noselect");
dom.sl.style.zIndex = 10000;
dom.sl_s = addElement(dom.sl, "span", null, "sl");
dom.sl_s.innerHTML = "save";
dom.sl_s.addEventListener("click", () => {
  save();
  let j = addElement(dom.sl, "span");
  j.style.fontSize = ".9em";
  j.style.padding = "3px";
  j.innerHTML = "saved...";
  fade(j);
  setTimeout(() => {
    dom.sl.removeChild(j);
  }, 500);
});
dom.sl_l = addElement(dom.sl, "span", null, "sl");
dom.sl_l.innerHTML = "load";
dom.sl_l.addEventListener("click", () => load(null, true));
dom.sl_extra = addElement(dom.sl, "span", null, "sl");
dom.sl_extra.style.borderLeft = "none";
dom.sl_extra.innerHTML = '<span style="color:crimson">game not saved!</span>';
dom.autosve = addElement(dom.sl, "span", null, "sl");
dom.autosve.innerHTML = "Autosave";
dom.autosve.style.position = "fixed";
dom.autosve.style.width = "auto";
dom.autosve.style.right = "139px";
dom.autosve.style.bottom = "1px";
dom.autosve.style.paddingRight = "20px";
dom.autosves = addElement(dom.autosve, "input");
dom.autosves.type = "checkbox";
dom.autosves.margin = 0;
dom.autosves.style.position = "fixed";
if (typeof InstallTrigger === "undefined")
  dom.autosves.style.bottom = "inherit";
dom.autosves.addEventListener("click", function () {
  global.flags.autosave = !global.flags.autosave;
  if (global.flags.autosave === true)
    timers.autos = setInterval(function () {
      save(true);
    }, 30000);
  else clearInterval(timers.autos);
});
dom.sl_h = addElement(dom.sl, "span", null, "sl");
dom.sl_h.innerHTML = ">>";
dom.sl_h.style.right = "214px";
dom.sl_h.style.position = "fixed";
dom.sl_h.style.width = "auto";
dom.sl_h.style.bottom = "1px";
dom.sl_h.addEventListener("click", () => {
  dom.sl.style.display = "none";
  if (dom.sl_h_n) empty(dom.sl_h_n);
  dom.sl_h_n = addElement(document.body, "span", null, "sl");
  dom.sl_h_n.innerHTML = "<<";
  dom.sl_h_n.style.right = 0;
  dom.sl_h_n.style.position = "absolute";
  dom.sl_h_n.style.bottom = 0;
  dom.sl_h_n.style.width = 14;
  dom.sl_h_n.style.backgroundColor = "lightgrey";
  dom.sl_h_n.addEventListener("click", () => {
    dom.sl.style.display = "";
    empty(dom.sl_h_n);
    document.body.removeChild(dom.sl_h_n);
  });
});

dom.vrs = addElement(dom.sl, "div", null, "sl");
dom.vrs.style.position = "fixed";
dom.vrs.style.width = "auto";
dom.vrs.innerHTML = "v" + global.ver;
dom.vrs.style.right = "105px";
dom.vrs.style.bottom = "1px";
dom.vrs.style.color = "black";
dom.vrs.style.textDecoration = "underline";
dom.vrs.addEventListener("click", function () {
  window.open("changelog.html", "_blank");
});
dom.vrs.href = "changelog.html";
dom.sl_kill = addElement(dom.sl, "span", null, "sl");
dom.sl_kill.style.position = "fixed";
dom.sl_kill.style.width = "auto";
dom.sl_kill.innerHTML = "delete the save";
dom.sl_kill.style.right = "5px";
dom.sl_kill.style.bottom = "1px";
dom.sl_kill.addEventListener("click", () => {
  localStorage.clear();
  msg("Save deleted", "");
});

function addElement(parent_element, elem, id, cls) {
  let newelem = document.createElement(elem);
  if (id) newelem.id = id;
  if (cls) newelem.className = cls;
  parent_element.appendChild(newelem);
  return newelem;
}

export { dom, addElement };
