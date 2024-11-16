import { global } from "./Global.js";
import { dom, addElement } from "./Document_Object_Model.js";

import { ttl } from "./Title.js";
import { weather } from "./Weather.js";
import { skl, giveSkExp } from "./Skill.js";
import { effect } from "./Effect.js";
import { furniture } from "./Furniture.js";
import { quest } from "./Quest.js";
import { sector, addtosector } from "./Sector.js";
import { time } from "./Time.js";
import { area, testz } from "./Area.js";
import { vendor } from "./Vendor.js";
import { act } from "./Action.js";
import { rcp } from "./Recipe.js";
import { abl } from "./Ability.js";
import { creature } from "./Creature.js";
import { eqp, wpn, sld, acc } from "./Equipment.js";
import { you } from "./You.js";
import { item } from "./Item.js";
import { effector } from "./Effector.js";
import { chss } from "./chs.js";
import { planner } from "./Plan.js";
import { mastery } from "./Mastery.js";

var w_manager = new Object();
var timers = new Object();
var itemgroup = [item, wpn, eqp, sld, acc];
var test = new Object();
var callback = new Object();
var plans = [[], [], []];
var sectors = [];
var check = new Object();
var checksd = [];
var inv = [];
var furn = [];
var qsts = [];
var dar = [[], [], [], [], []];
var home = new Object();
var container = new Object();
const YEAR = 518400;
const MONTH = 43200;
const DAY = 1440;
const WEEK = 10080;
const HOUR = 60;
const SILVER = 100;
const GOLD = 10000;
let tempt = new Date();

window.addEventListener("load", () => {
    load();
});

function save(lvr) {
    let storage = window.localStorage;
    global.flags.savestate = true;
    global.stat.gsvs++;
    let str = "";
    let a = new Date();
    global.lst_sve =
        a.getFullYear() +
        "/" +
        (a.getMonth() + 1) +
        "/" +
        a.getDate() +
        " " +
        a.getHours() +
        ":" +
        (a.getMinutes() >= 10 ? a.getMinutes() : "0" + a.getMinutes()) +
        ":" +
        (a.getSeconds() >= 10 ? a.getSeconds() : "0" + a.getSeconds());
    dom.sl_extra.innerHTML = "Last save: " + global.lst_sve;
    let o = [];
    for (let obj in you.eqp) {
        o[obj] = you.eqp[obj];
        unequip(you.eqp[obj], { save: true });
    }
    you.stat_r();
    let freezete = global.flags.m_freeze;
    if (inSector(sector.home)) {
        for (let a in furn) deactivatef(furn[a]);
    }
    global.flags.m_freeze = true;
    for (let a in you.eff) if (you.eff[a].type === 5) you.eff[a].onRemove();
    let yu = {
        name: you.name,
        title: you.title.id,
        lvl: you.lvl,
        exp: you.exp,
        exp_t: you.exp_t,
        sat: you.sat,
        satmax: you.satmax,
        sat_r: you.sat_r,
        hp: you.hp,
        hpmax: you.hpmax,
        hp_r: you.hp_r,
        str: you.str,
        str_r: you.str_r,
        agl: you.agl,
        agl_r: you.agl_r,
        int: you.int,
        int_r: you.int_r,
        spd: you.spd,
        spd_r: you.spd_r,
        luck: you.luck,
        stat_p: you.stat_p,
        wealth: you.wealth,
        crt: you.crt,
        res: you.res,
        mods: you.mods,
        stra: you.stra,
        strm: you.strm,
        inta: you.inta,
        intm: you.intm,
        agla: you.agla,
        aglm: you.agml,
        spda: you.spda,
        spdm: you.spdm,
        hpa: you.hpa,
        hpm: you.hpm,
        sata: you.sata,
        satm: you.satm,
        cls: you.cls,
        ccls: you.ccls,
        aff: you.aff,
        maff: you.maff,
        caff: you.caff,
        cmaff: you.cmaff,
        karma: you.karma,
        ki: you.ki,
    };
    global.flags.m_freeze = true;
    global.current_a.deactivate();
    dom.ct_bt3.style.backgroundColor = "inherit";
    for (let a in you.eff) if (you.eff[a].type === 5) you.eff[a].onGive();
    str += JSON.stringify(yu);
    str += "|";
    let a4 = [];
    for (let obj in you.eff)
        if (!!you.eff[obj].id) {
            var pw;
            !!you.eff[obj].power ? (pw = you.eff[obj].power) : (pw = 1);
            a4[obj] = { a: you.eff[obj].id, b: you.eff[obj].duration, c: pw };
        }
    global.flags.m_freeze = false;
    str += JSON.stringify(a4);
    str += "|";
    let a6 = [];
    for (let obj in you.skls) {
        a6[obj] = { id: you.skls[obj].id, lvl: you.skls[obj].lvl, mst: [] };
        for (let m in you.skls[obj].mlstn) a6[obj].mst[m] = you.skls[obj].mlstn[m].g;
    }
    str += JSON.stringify(a6);
    str += "|";
    let a7 = [];
    for (let obj in skl) a7.push([skl[obj].exp, skl[obj].p]);
    str += JSON.stringify(a7);
    str += "|";
    var datasi = [];
    let nindxdt = 0;
    for (let obj in item) if (item[obj].data.tried === true) datasi[nindxdt++] = item[obj].id;
    var datare = [];
    let nindxat = 0;
    for (let obj in item) if (item[obj].data.finished === true) datare[nindxat++] = item[obj].id;
    let a1 = {
        uid: global.uid,
        jj: global.stat,
        x: global.current_z.id,
        a: global.rm,
        b: global.sm,
        e: global.flags,
        f: global.spirits,
        g: global.msgs_max,
        i: global.lst_loc,
        j: time.minute,
        k: w_manager.duration,
        l: w_manager.curr.id,
        m: global.lst_sve,
        n: global.bg_r,
        o: global.bg_g,
        p: global.bg_b,
        q: global.bestiary,
        r: global.timehold,
        r2: global.timewold,
        datas: datasi,
        u: global.timescale,
        datar: datare,
        z: global.offline_evil_index,
        drdata: global.drdata,
    };
    str += JSON.stringify(a1);
    str += "|";
    let a2 = [];
    for (let obj in global.rec_d) a2[obj] = { id: global.rec_d[obj].id, data: global.rec_d[obj].data };
    str += JSON.stringify(a2);
    str += "|";
    let a3 = [[], [], [], [], [], []];
    for (let obj in o) equip(o[obj], { save: true });
    you.stat_r();
    for (let obj in inv) {
        let expectedIndex = Math.max(0, Math.min(4, Math.floor(inv[obj].id / 10000)));
        if (expectedIndex === 0) {
            a3[0].push({
                id: inv[obj].id,
                am: inv[obj].amount,
                data: inv[obj].data,
            });
        } else {
            a3[expectedIndex].push({
                id: inv[obj].id,
                dp: inv[obj].dp,
                toeq: true,
                data: inv[obj].data,
            });
            if (!scanbyuid(you.eqp, inv[obj].data.uid)) a3[expectedIndex][a3[expectedIndex].length - 1].toeq = false;
        }
    }
    for (let a in item) if (item[a].save === true) a3[5].push({ item: item[a].id, data: item[a].data });
    str += JSON.stringify(a3);
    str += "|";
    let a5 = [];
    let xx = 0;
    for (let o in area) a5[xx++] = area[o].size;
    str += JSON.stringify(a5);
    str += "|";
    let a8 = dar;
    str += JSON.stringify(a8);
    str += "|";
    let a9 = [];
    for (let obj in furn) a9.push({ id: furn[obj].id, data: furn[obj].data });
    str += JSON.stringify(a9);
    str += "|";
    let a10 = {};
    let a11 = {};
    for (let obj in vendor) {
        let stock = [];
        for (let i = 0; i < vendor[obj].stock.length; i++) {
            stock[i] = [];
            stock[i][0] = vendor[obj].stock[i][0].id;
            stock[i][1] = vendor[obj].stock[i][1];
            stock[i][2] = vendor[obj].stock[i][2];
        }
        a10[obj] = { stock: stock, data: vendor[obj].data };
    }
    str += JSON.stringify(a10);
    str += "|";
    let a12 = [];
    for (let a in global.titles) a12.push(global.titles[a].id); //for(let obj in ttl) if(ttl[obj].have===true) a12.push(ttl[obj].id);
    str += JSON.stringify(a12);
    str += "|";
    let a13 = new Object();
    for (let s in home) a13[s] = home[s].id;
    str += JSON.stringify(a13);
    str += "|";
    let a14 = [];
    for (let obj in qsts) a14.push({ id: qsts[obj].id, data: qsts[obj].data });
    str += JSON.stringify(a14);
    str += "|";
    let a15 = [];
    for (let obj in acts) a15.push({ id: acts[obj].id, data: acts[obj].data });
    str += JSON.stringify(a15);
    str += "|";
    let a17 = [];
    for (let obj in sector) a17.push({ id: sector[obj].id, data: sector[obj].data });
    str += JSON.stringify(a17);
    str += "|";
    let a18 = [];
    for (let obj in container) {
        let cont = [];
        for (let a in container[obj].c)
            cont.push({
                id: container[obj].c[a].item.id,
                data: container[obj].c[a].data,
                am: container[obj].c[a].am,
                dp: container[obj].c[a].dp,
            });
        a18.push({ id: container[obj].id, c: cont });
    }
    str += JSON.stringify(a18);
    str += "|";
    let a19 = [];
    for (let obj in chss)
        if (JSON.stringify(chss[obj].data) !== "{}") a19.push({ id: chss[obj].id, data: chss[obj].data });
    str += JSON.stringify(a19);
    str += "|savevalid|";
    let a20 = [];
    for (let a in ttl) if (ttl[a].tget) a20.push(ttl[a].id);
    str += JSON.stringify(a20);
    if (inSector(sector.home)) {
        for (let a in furn) activatef(furn[a]);
    }
    global.flags.m_freeze = true;
    global.current_a.activate();
    global.flags.m_freeze = freezete;
    if (global.flags.busy === true) dom.ct_bt3.style.backgroundColor = "darkslategray";
    str = utf8_to_b64(str);
    storage.setItem("v0.3", str);
    global.flags.savestate = false;
    if (!lvr) msg("Game Saved", "cyan");
    return str;
}

function load(dt) {
    var str = dt || window.localStorage.getItem("v0.3");
    str = b64_to_utf8(str);
    if (str && str != "") {
        dom.error = addElement(document.body, "div");
        dom.error.style.width = "100%";
        dom.error.style.height = "auto";
        dom.error.style.position = "absolute";
        dom.error.style.fontSize = "2em";
        dom.error.style.color = "red";
        dom.error.style.zIndex = 9999;
        dom.error.style.lineHeight = "normal";
        dom.error.style.opacity = 0;
        setTimeout(function () {
            appear(dom.error);
        }, 500);
        dom.error.style.textAlign = "center";
        dom.error.innerHTML =
            "SOMETHING BROKE<br>PERHAPS DUE TO STUPIDITY OR DATA STRUCTURE CHANGES<br>⋗1 DELETING THE SAVE IS ADVISED<br>⋗2 OR WAITING FOR SOME TIME TIL FIXED<br>⋗3 OR CHECKING IN DIFFERENT BROWSER, MIGHT WORK THERE(MEANS THE SAVE IS BORKED(REFER TO 1))";
        clearInterval(timers.mnch);
        clearInterval(timers.snch);
        clearInterval(timers.autos);
        clearInterval(timers.rdng);
        clearInterval(timers.rdngdots);
        global.menuo = 0;
        clearInterval(timers.actm);
        clearInterval(timers.job1t);
        clearInterval(timers.bstmonupdate);
        clearInterval(timers.rptbncgt);
        global.flags.rptbncgtf = false;
        global.flags.rptbncgt = false;
        str = str.split("|");
        let yu_s = JSON.parse(str[0]);
        for (let a in ttl) {
            ttl[a].have = false;
            ttl[a].tget = false;
        }
        global.titles = [];
        you.name = yu_s.name;
        for (let o in ttl) if (ttl[o].id === yu_s.title) you.title = ttl[o];
        you.lvl = yu_s.lvl;
        you.exp = yu_s.exp;
        you.exp_t = yu_s.exp_t;
        you.expnext_t = you.expnext();
        you.sat = yu_s.sat;
        you.satmax = yu_s.satmax;
        you.sat_r = yu_s.sat_r;
        you.sata = yu_s.sata || 0;
        you.satm = yu_s.satm || 1;
        you.ki = yu_s.ki || new Object();
        you.hp = yu_s.hp;
        you.hpmax = yu_s.hpmax;
        you.hp_r = yu_s.hp_r;
        you.hpa = yu_s.hpa || 0;
        you.hpm = yu_s.hpm || 1;
        you.hp = you.hp > you.hpmax ? you.hpmax : you.hp;
        you.str = yu_s.str;
        you.str_r = yu_s.str_r;
        you.stra = yu_s.stra || 0;
        you.strm = yu_s.strm || 1;
        you.agl = yu_s.agl;
        you.agl_r = yu_s.agl_r;
        you.agla = yu_s.agla || 0;
        you.aglm = yu_s.aglm || 1;
        you.int = yu_s.int;
        you.int_r = yu_s.int_r;
        you.inta = yu_s.inta || 0;
        you.intm = yu_s.intm || 1;
        you.spd = yu_s.spd;
        you.spd_r = yu_s.spd_r;
        you.spda = yu_s.spda || 0;
        you.spdm = yu_s.spdm || 1;
        you.cls = yu_s.cls || [0, 0, 0];
        you.ccls = yu_s.ccls || [0, 0, 0];
        you.aff = yu_s.aff || [0, 0, 0, 0, 0, 0, 0];
        you.maff = yu_s.maff || [0, 0, 0, 0, 0, 0, 0];
        you.caff = yu_s.caff || [0, 0, 0, 0, 0, 0, 0];
        you.cmaff = yu_s.cmaff || [0, 0, 0, 0, 0, 0, 0];
        you.luck = yu_s.luck;
        you.stat_p = yu_s.stat_p;
        you.karma = yu_s.karma || 0;
        you.wealth = yu_s.wealth;
        you.crt = yu_s.crt;
        global.flags.loadstate = true;
        for (let a in callback)
            for (let b in callback[a].hooks)
                if (callback[a].hooks[b].data.q) callback[a].hooks.splice(callback[a].hooks[b], 1);
        for (let obj in item) {
            item[obj].amount = 0;
            item[obj].have = false;
        }
        inv = [];
        for (let g in yu_s.res) you.res[g] = yu_s.res[g];
        for (let g in yu_s.mods) you.mods[g] = yu_s.mods[g];
        you.eqp = [
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
            eqp.dummy,
        ];
        for (let a in you.eff) you.eff[a].active = false;
        you.eff = [];
        empty(dom.d101);
        global.e_e = [];
        global.e_em = [];
        empty(dom.d101m);
        global.current_m.eff = [];
        let a4 = JSON.parse(str[1]);
        global.msgs_max = 300;
        empty(dom.mscont);
        global.rec_d = [];
        for (let ba in rcp) {
            rcp[ba].have = false;
        }
        global.flags.loadstate = false;
        let a6 = JSON.parse(str[2]);
        you.skls = [];
        for (let ab in skl) {
            skl[ab].lvl = 0;
            skl[ab].exp = 0;
        }
        for (let a in global.rec_d) global.rec_d[a].have = false;
        global.rec_d = [];
        for (let i in skl) for (let ii in skl[i].mlstn) skl[i].mlstn[ii].g = false;
        for (let a in a6)
            for (let b in skl)
                if (a6[a].id === skl[b].id) {
                    you.skls.push(skl[b]);
                    skl[b].lvl = a6[a].lvl;
                    for (let c in a6[a].mst) skl[b].mlstn[c].g = a6[a].mst[c];
                    if (skl[b].mlstn)
                        for (let d in skl[b].mlstn)
                            if (skl[b].mlstn[d].g === false && skl[b].mlstn[d].lv <= skl[b].lvl) {
                                skl[b].mlstn[d].f();
                                skl[b].mlstn[d].g = true;
                                msg(
                                    "NEW PERK UNLOCKED " +
                                        '<span style="color:tomato">("' +
                                        skl[b].name +
                                        '")<span style="color:orange">lvl: ' +
                                        skl[b].mlstn[d].lv +
                                        "</span></span>",
                                    "lime",
                                    {
                                        x: skl[b].name,
                                        y:
                                            "Perk lvl " +
                                            skl[b].mlstn[d].lv +
                                            ': <span style="color:yellow">' +
                                            skl[b].mlstn[d].p +
                                            "</span>",
                                    },
                                    7
                                );
                            }
                }
        var ro = [];
        for (let io in global.rec_d) ro.push(global.rec_d[io].id);
        let a7 = JSON.parse(str[3]);
        let skk = 0;
        for (let obj in skl)
            if (a7[skk]) {
                skl[obj].exp = a7[skk][0] || 0;
                skl[obj].expnext_t = skl[obj].expnext();
                skl[obj].p = a7[skk++][1];
                if (!skl[obj].p) skl[obj].p = 1;
                if (skl[obj].p < 0.99) skl[obj].p += 1;
            }
        global.flags.loadstate = true;
        for (let o = 0; o < a4.length; o++)
            for (let obj in effect)
                if (effect[obj].id === a4[o].a) {
                    if (effect[obj].save !== false) giveEff(you, effect[obj], a4[o].b, a4[o].c);
                    else {
                        effect[obj].onRemove();
                    }
                    continue;
                }
        global.flags.loadstate = false;
        let a1 = JSON.parse(str[4]);
        global.sm = a1.b;
        global.rm = a1.a;
        global.spirits = a1.f;
        global.lst_loc = a1.i;
        global.uid = a1.uid;
        global.msgs_max = a1.g;
        global.flags = {};
        global.sinv = [];
        global.bestiary = a1.q;
        global.timehold = a1.r || (time.minute / DAY) << 0;
        global.timewold = a1.r2 || (time.minute / WEEK) << 0;
        global.lst_sve = a1.m;
        global.timescale = a1.u || 1;
        global.offline_evil_index = a1.z || 1;
        global.drdata = a1.drdata || {};
        for (let gb = 0; gb < a1.datas.length; gb++) {
            for (let itm in item) if (item[itm].id === a1.datas[gb]) item[itm].data.tried = true;
        }
        if (a1.datar)
            for (let gb = 0; gb < a1.datar.length; gb++) {
                for (let itm in item) if (item[itm].id === a1.datar[gb]) item[itm].data.finished = true;
            }
        time.minute = a1.j;
        timeConv(time);
        for (let w in weather) if (weather[w].id === a1.l) setWeather(weather[w], a1.k);
        global.bg_r = a1.n;
        global.bg_g = a1.o;
        global.bg_b = a1.p;
        for (let a in global.stat) global.stat[a] = a1.jj[a] || 0;
        let tempt = new Date();
        if (global.stat.sttime === 0)
            global.stat.sttime =
                tempt.getFullYear() +
                "/" +
                (tempt.getMonth() + 1) +
                "/" +
                tempt.getDate() +
                " " +
                tempt.getHours() +
                ":" +
                (tempt.getMinutes() >= 10 ? tempt.getMinutes() : "0" + tempt.getMinutes()) +
                ":" +
                (tempt.getSeconds() > 10 ? tempt.getSeconds() : "0" + tempt.getSeconds());
        if (global.stat.msts === 0)
            global.stat.msts = [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0],
            ];
        if (global.stat.msks === 0) global.stat.msks = [0, 0, 0, 0, 0, 0, 0];
        dom.ct_bt4_21b.value = global.bg_r;
        dom.ct_bt4_22b.value = global.bg_g;
        dom.ct_bt4_23b.value = global.bg_b;
        global.stat.wsnburst = 50;
        dom.ctrwin4.style.display = "none";
        dom.ctrwin2.style.display = "none";
        dom.ctrwin1.style.display = "";
        global.lw_op = 0;
        if (global.flags.civil === false && global.flags.btl === true)
            for (let obj in area)
                if (area[obj].id === a1.x) {
                    area_init(area[obj]);
                    break;
                }
        let a2 = JSON.parse(str[5]);
        for (let o = 0; o < a2.length; o++) {
            for (let obj in rcp)
                if (rcp[obj].id === a2[o].id && rcp[obj].have === false) {
                    global.rec_d.push(rcp[obj]);
                    rcp[obj].have = true;
                    rcp[obj].data = a2[o].data;
                }
        }
        for (let o = 0; o < ro.length; o++) {
            for (let obj in rcp)
                if (rcp[obj].id === ro[o] && rcp[obj].have === false) {
                    global.rec_d.push(rcp[obj]);
                    rcp[obj].have = true;
                }
        }
        dom.d2.innerHTML = you.name;
        eqpres();
        unequip(you.eqp[4], { save: true });
        unequip(you.eqp[5], { save: true });
        you.stat_r();
        let a3 = JSON.parse(str[6]);
        global.flags.loadstate = true;
        if (a3[0].length != 0)
            for (let o = 0; o < a3[0].length; o++)
                for (let obj in item) {
                    if (item[obj].id === a3[0][o].id) {
                        giveItem(item[obj], a3[0][o].am, true, { fi: true });
                        inv[o].new = false;
                        for (let a in a3[0][o].data) inv[o].data[a] = a3[0][o].data[a];
                    }
                    continue;
                }
        if (a3[1].length != 0)
            for (let o = 0; o < a3[1].length; o++)
                for (let obj in wpn)
                    if (wpn[obj].id === a3[1][o].id) {
                        let t = giveItem(wpn[obj], 1, true);
                        t.new = false;
                        t.dp = a3[1][o].dp;
                        for (let a in a3[1][o].data) t.data[a] = a3[1][o].data[a];
                        if (a3[1][o].toeq === true) equip(t, { save: true });
                        continue;
                    }
        if (a3[2].length != 0)
            for (let o = 0; o < a3[2].length; o++)
                for (let obj in eqp)
                    if (eqp[obj].id === a3[2][o].id) {
                        let t = giveItem(eqp[obj], 1, true);
                        t.new = false;
                        t.dp = a3[2][o].dp;
                        for (let a in a3[2][o].data) t.data[a] = a3[2][o].data[a];
                        if (a3[2][o].toeq === true) {
                            if (t.slot === 5 && you.eqp[5].id === 10000) t.slot = 6;
                            equip(t, { save: true });
                        }
                    }
        if (a3[3].length != 0)
            for (let o = 0; o < a3[3].length; o++)
                for (let obj in sld)
                    if (sld[obj].id === a3[3][o].id) {
                        let t = giveItem(sld[obj], 1, true);
                        t.new = false;
                        t.dp = a3[3][o].dp;
                        for (let a in a3[3][o].data) t.data[a] = a3[3][o].data[a];
                        if (a3[3][o].toeq === true) equip(t, { save: true });
                        continue;
                    }
        if (a3[4].length != 0)
            for (let o = 0; o < a3[4].length; o++)
                for (let obj in acc)
                    if (acc[obj].id === a3[4][o].id) {
                        let t = giveItem(acc[obj], 1, true);
                        t.new = false;
                        t.dp = a3[4][o].dp;
                        for (let a in a3[4][o].data) t.data[a] = a3[4][o].data[a];
                        if (a3[4][o].toeq === true) equip(t, { save: true });
                        continue;
                    }
        if (you.eqp[0].id === 10000) {
            you.eqp[0].cls[2] = (you.lvl / 4) << 0;
            you.eqp[0].aff[0] = (you.lvl / 5) << 0;
            you.eqp[0].ctype = 2;
        }
        let a5 = JSON.parse(str[7]);
        let xx = 0;
        for (let o in area) if (a5[xx]) area[o].size = a5[xx++]; //||area[o].size;
        let a8 = JSON.parse(str[8]);
        dar = a8;
        if (a8[0].length != 0)
            for (let o = 0; o < a8[0].length; o++)
                for (let obj in item) if (item[obj].id === a8[0][o]) item[obj].data.dscv = true;
        if (a8[1].length != 0)
            for (let o = 0; o < a8[1].length; o++)
                for (let obj in wpn) if (wpn[obj].id === a8[1][o]) wpn[obj].data.dscv = true;
        if (a8[2].length != 0)
            for (let o = 0; o < a8[2].length; o++)
                for (let obj in eqp) if (eqp[obj].id === a8[2][o]) eqp[obj].data.dscv = true;
        if (a8[3].length != 0)
            for (let o = 0; o < a8[3].length; o++)
                for (let obj in sld) if (sld[obj].id === a8[3][o]) sld[obj].data.dscv = true;
        if (a8[4].length != 0)
            for (let o = 0; o < a8[4].length; o++)
                for (let obj in acc) if (acc[obj].id === a8[4][o]) acc[obj].data.dscv = true;
        if (a3[5].length != 0)
            for (let a in a3[5]) for (let b in item) if (item[b].id === a3[5][a].item) item[b].data = a3[5][a].data;
        for (let a in furniture) furniture[a].active = false;
        for (let a in furn) furn[a].data = {};
        furn = [];
        let a9 = JSON.parse(str[9]);
        for (let a = 0; a < a9.length; a++)
            for (let obj in furniture)
                if (furniture[obj].id === a9[a].id && a9[a].data.amount > 0) {
                    furn[a] = furniture[obj];
                    furn[a].data = a9[a].data;
                }
        let a10 = JSON.parse(str[10]);
        let a11 = JSON.parse(str[11]);
        global.flags = a1.e;
        global.flags.rdng = false;
        global.flags.civil = true;
        global.flags.btl = false;
        global.current_z = area.nwh;
        global.current_m = creature.default;
        update_m();
        dom.d7m.update();
        global.flags.wkdis = false;
        global.flags.jdgdis = false;
        for (let obj in vendor) {
            if (a10[obj] && a10[obj].stock) {
                vendor[obj].stock = a10[obj].stock;
                vendor[obj].data = a10[obj].data;
                if (!vendor[obj].data.time || vendor[obj].data.time < 0) vendor[obj].data.time = 1;
                for (let itm = 0; itm < a10[obj].stock.length; itm++) {
                    let k = itemgroup[((a10[obj].stock[itm][0] + 1) / 10000) << 0];
                    for (let v in k)
                        if (k[v].id === a10[obj].stock[itm][0]) {
                            vendor[obj].stock[itm][0] = k[v];
                            continue;
                        }
                }
            } else {
                restock(vendor[obj]);
            }
        }
        let a12 = JSON.parse(str[11]);
        for (let ttlid = 0; ttlid < a12.length; ttlid++)
            for (let obj in ttl)
                if (ttl[obj].id === a12[ttlid]) {
                    global.titles[ttlid] = ttl[obj];
                    global.titles[ttlid].have = true;
                }
        for (let obj in global.titlese) global.titles.push(global.titlese[obj]);
        global.titlese = [];
        let a13 = JSON.parse(str[12]);
        for (let s in a13) {
            for (let ss in furn) if (furn[ss].id === a13[s]) home[s] = furn[ss];
        }
        qsts = [];
        let a14 = JSON.parse(str[13]);
        for (let obj in a14)
            for (let q in quest)
                if (quest[q].id === a14[obj].id) {
                    qsts[obj] = quest[q];
                    qsts[obj].data = a14[obj].data;
                    if (qsts[obj].callback) qsts[obj].callback();
                }
        global.current_a = act.default;
        acts = [];
        for (let a in act) {
            act[a].have = false;
            act[a].data = {};
            act[a].active = false;
        }
        let a15 = JSON.parse(str[14]);
        for (let obj in a15)
            for (let q in act)
                if (act[q].id === a15[obj].id) {
                    acts[obj] = act[q];
                    acts[obj].data = a15[obj].data;
                    act[q].have = true;
                }
        for (let a in sectors) sectors[a].onLeave();
        sectors = [];
        let a16 = JSON.parse(str[15]);
        for (let obj in a16)
            for (let q in sector)
                if (sector[q].id === a16[obj].id) {
                    if (objempty(a16[obj].data) === false) {
                        for (let a in a16[obj].data) sector[q].data[a] = a16[obj].data[a];
                    } else if (sector[q].ddata) sector[q].data = sector[q].ddata;
                }
        clearInterval(timers.vndrstkchk);
        for (let obj in chss)
            if (chss[obj].id === a1.i) {
                global.current_l = chss[obj];
                smove(chss[obj], false);
            }
        let a17 = JSON.parse(str[16]);
        for (let a in container) container[a].c = [];
        if (a17[0] && !a17[0].c) {
            a17 = [{ id: 1, c: a17 }];
        }
        for (let a in a17) {
            for (let d in container)
                if (container[d].id === a17[a].id) {
                    for (let c in a17[a].c) {
                        let k = itemgroup[((a17[a].c[c].id + 1) / 10000) << 0];
                        for (let b in k)
                            if (k[b].id === a17[a].c[c].id) {
                                let ni = {
                                    item: k[b],
                                    data: a17[a].c[c].data,
                                    am: a17[a].c[c].am,
                                    dp: a17[a].c[c].dp,
                                };
                                container[d].c.push(ni);
                                break;
                            }
                    }
                    break;
                }
        }
        let a18 = JSON.parse(str[17]);
        for (let obj in a18)
            for (let q in chss)
                if (chss[q].id === a18[obj].id) {
                    if (objempty(a18[obj].data) === false) chss[q].data = a18[obj].data;
                }
        if (str[19]) {
            let a19 = JSON.parse(str[19]);
            for (let a in a19) for (let b in ttl) if (a19[a] === ttl[b].id) ttl[b].tget = true;
        }
        for (let a in ttl) {
            if (ttl[a].have && ttl[a].talent && !ttl[a].tget) {
                ttl[a].talent();
                ttl[a].tget = true;
            }
        }
        isort(global.sm);
        rsort(global.rm);
        rstcrtthg();
        you.stat_r();
        global.spbtsr[global.rm].style.color = "yellow";
        if (global.flags.aw_u) {
            dom.d0.style.display = "";
            dom.d1m.style.display = "";
            dom.inv_ctx.style.display = "";
            dom.gmsgs.style.display = "";
            dom.ct_ctrl.style.display = "";
            dom.ctr_1.style.display = "";
            dom.d_lct.style.display = "";
        }
        dom.ctrwin3.style.display = "none";
        dom.ctrwin5.style.display = "none";
        dom.d5_1_1.update();
        dom.d5_2_1.update();
        dom.d6.update();
        update_d();
        dom.d3.update();
        update_m();
        m_update();
        dom.d7m.update();
        dom.d5_3_1.update();
        if (global.flags.m_freeze === true) dom.m_b_1_c.innerHTML = "Ｘ";
        if (global.flags.m_blh === true) dom.m_b_2_c.innerHTML = "Ｘ";
        if (global.flags.jnlu) dom.ct_bt6.innerHTML = "journal";
        if (global.flags.asbu) dom.ct_bt1.innerHTML = "assemble";
        if (global.flags.actsu) dom.ct_bt3.innerHTML = "actions";
        if (global.flags.sklu) dom.ct_bt2.innerHTML = "skills";
        if (global.flags.m_un === true) {
            dom.mn_2.style.display = "";
            dom.mn_4.style.display = "";
            dom.mn_3.style.display = "";
            if (global.stat.mndrgnu) dom.mn_1.style.display = "";
            m_update();
        }
        wManager();
        dom.d_moon.innerHTML = global.text.lunarp[getLunarPhase()][0];
        addDesc(dom.d_moon, null, 2, "Lunar Phase", global.text.lunarp[getLunarPhase()][1]);
        wdrseason(global.flags.ssngaijin);
        if (global.flags.isday === false) dom.d_moon.style.display = "";
        else dom.d_moon.style.display = "none";
        dom.sl_extra.innerHTML = "Last save: " + global.lst_sve;
        dom.nthngdsp.style.display = "none";
        dom.ctrwin6.style.display = "none";
        invbtsrst();
        dom.d_time.innerHTML = "<small>" + getDay(global.flags.tmmode || 2) + "</small> " + timeDisp(time);
        global.flags.loadstate = false;
        global.flags.savestate = false;
        global.flags.ttlscrnopn = false;
        global.flags.expatv = false;
        global.flags.impatv = false;
        global.flags.expatv = false;
    }
    if (!global.flags.stbxinifld) {
        addToContainer(home.trunk, eqp.gnt);
        addToContainer(home.trunk, acc.fmlim);
        addToContainer(home.trunk, wpn.bdsrd);
        addToContainer(home.trunk, item.toolbx);
        addToContainer(home.trunk, sld.tge);
        addToContainer(home.trunk, item.bonig);
        global.flags.stbxinifld = true;
    }
    if (global.flags.bgspc) document.body.style.background = "linear-gradient(180deg,#000,#123)";
    else document.body.style.backgroundColor = "rgb(" + global.bg_r + "," + global.bg_g + "," + global.bg_b + ")";
    if (dom.bkssttbd) {
        empty(dom.bkssttbd);
        document.body.removeChild(dom.bkssttbd);
        global.flags.bksstt = false;
        kill(dom.bkssttbd);
    }
    if (global.flags.expatv) {
        empty(dom.ct_bt4_5a_nc);
        document.body.removeChild(dom.ct_bt4_5a_nc);
        kill(dom.ct_bt4_5a_nc);
    }
    if (global.flags.impatv) {
        empty(dom.ct_bt4_5b_nc);
        document.body.removeChild(dom.ct_bt4_5b_nc);
        kill(dom.ct_bt4_5b_nc);
    }
    if (dom.error) {
        empty(dom.error);
        document.body.removeChild(dom.error);
        kill(dom.error);
    }
    if (global.flags.autosave === true) {
        dom.autosves.checked = true;
        timers.autos = setInterval(function () {
            save(true);
        }, 30000);
    }
    //if(global.flags.msgtm===true)dom.ct_bt4_61b.checked=true;
    ////patch things
    if (skl.pet.lvl >= 10) giveTitle(ttl.pet3);
    if (item.amrthsck.data.finished) giveRcp(rcp.appljc);
    ////////////////
    if (dom.loading) {
        fade(dom.loading, 5, true);
        delete dom.loading;
    }
    if (dom.loadingt) {
        fade(dom.loadingt, 5, true);
        delete dom.loadingt;
    }
}

giveTitle(ttl.new, true);

if (!global.flags.aw_u) dom.d0.style.display = "none";

function callbackManager(id) {
    this.id = id || 0;
    this.hooks = [{ f: function (victim, killer) {}, id: 0, data: {} }];
    this.fire = function () {};
}

callback.onDeath = new callbackManager(1);
callback.onDeath.fire = function (victim, killer) {
    for (let a in this.hooks) this.hooks[a].f(victim, killer);
};

function attachCallback(callback, what, data) {
    callback.hooks.push(what);
}

function detachCallback(callback, what) {
    for (let a in callback.hooks) if (callback.hooks[a].id === what) callback.hooks.splice(callback.hooks[a], 1);
}

/*attachCallback(callback.onDeath,{
  f:function(victim, killer){
    if(victim.id===112) this.data.a++
    if(this.data.a===5) msg("KILLED FIVE",'yellow')
  },
  id:50,
  data:{a:0,q:true}
})*/

////////////////////////////////////////////

function giveQst(q) {
    if (!q.data.started) {
        q.init();
        q.data.started = true;
        msg(
            (q.repeatable ? '<span style="color:cyan">Repeatable</span> q' : "Q") +
                "uest accepted: " +
                '<span style="color:orange">"' +
                q.name +
                '"</span>',
            "lightblue",
            q,
            8
        );
        let have = false;
        for (let a in qsts)
            if (qsts[a].id === q.id) {
                have = true;
                break;
            }
        if (!have) qsts.push(q);
    }
}

function finishQst(q) {
    if (q.data.started) {
        q.data.done = true;
        q.data.started = false;
        q.data.pending = false;
        msg("Quest completed: ", "lime");
        msg_add('"' + q.name + '"', "orange");
        q.rwd();
        global.stat.qstc++;
    }
}

/*Orlandu - "Actonite containing a fragment of Orlandu's skeleton"
Ogimus - "Amethyst containing Ogmious the Guardian's soul"
Balvus - "Chiastrite containing the ashes of Balvus"
Beowulf - "Moon Zircon"
Sigguld - "Fire agate with the soul of Sigguld the Dragoon"
Altema - "Garnet containing Altema the Fallen's spirit"
Haeralis - "Star sapphire with the power of Haeralis the Brave"
Orion - "Black coral holding the hair of Orion the Beast"
Iocus - "Lazurite containing St. Iocus's prayer"
Trinity - "Jade containing the Nordic holy spirits"
Dragonite - "Serpentine containing a dragon's power"
Demonia - "Blood opal containing the blood of devils"

suffering
resentment
*/

////dss////

item.fsh1.dss = [{ item: item.fsh2, amount: 1 }];
eqp.bnd.dss = eqp.pnt.dss = eqp.brc.dss = eqp.vst.dss = [{ item: item.cclth, amount: 1, q: 0.5, max: 2 }];
eqp.tnc.dss = [{ item: item.cclth, amount: 2 }];
item.dfish.dss = [{ item: item.fbait1, amount: 1, q: 0.75, max: 3 }];
item.cclth.dss = [{ item: item.thrdnl, amount: 1, q: 1, max: 2 }];
item.dmice1.dss = [{ item: item.sbone, amount: 1, q: 0.6, max: 3 }];
item.dbdc1.dss = [{ item: item.sbone, amount: 1, q: 0.5, max: 2 }];

////misc////

function activateEffectors(e) {
    if (!e) return;
    for (let a in e)
        if (!e[a].e.active && (!e[a].c || e[a].c() === true)) {
            e[a].e.activate();
            e[a].e.active = true;
        }
}

function deactivateEffectors(e) {
    if (!e) return;
    for (let a in e)
        if (e[a].e.active) {
            e[a].e.deactivate();
            e[a].e.active = false;
        }
}

function runEffectors(e) {
    if (!e) return;
    for (let a in e) e[a].e.use();
}

function giveCrExp(skl, am, lvl) {
    if (!lvl || skl.lvl < lvl) giveSkExp(skl, am);
}

///////////////////////////////////////////
//CONT
///////////////////////////////////////////

function Container(id) {
    this.id = id || 0;
    this.c = [];
}

container.home_strg = new Container(1);
if (!home.trunk) {
    home.trunk = container.home_strg;
}

function evaluateSpecialRequirementsForRecipe(recipe) {
    if (recipe.srect == null) {
        return [0];
    }

    let results = [];
    for (let i in recipe.srec) {
        results[i] = recipe.srec[i]() === true ? 1 : 2;
    }
    return results;
}

function scan2(arr, val, am) {
    for (let o = 0; o < arr.length + 1; o++) {
        if (o === arr.length) return { a: false, b: arr[o] };
        if (arr[o].id === val.id && arr[o].amount >= am) return { a: true, b: arr[o] };
        else continue;
    }
}

function canMake(rc, times) {
    let missing = [];
    let has = [];
    let z = [];
    let b = [];
    let r = [];
    let o = evaluateSpecialRequirementsForRecipe(rc);
    for (let i = 0; i < rc.rec.length; i++) {
        let sc = new Object();
        if (!rc.rec[i].item.slot) {
            sc = scan2(inv, rc.rec[i].item, rc.rec[i].amount * times);
            z.push(rc.rec[i].item.amount * times);
        } else {
            let ar = findworst(inv, rc.rec[i].item);
            if (ar.length >= rc.rec[i].amount * times) sc.a = true;
            z.push(ar.length);
            r = ar;
        }
        if (!sc.a) {
            missing.push(rc.rec[i].item);
            b.push(false);
        } else {
            has.push(rc.rec[i].item);
            b.push(true);
        }
    }
    for (let a in global.tstcr) global.tstcr[a].testc = false;
    return {
        x: missing,
        y: has,
        z,
        o,
        success: missing.length === 0 && !o.includes(2),
        b,
        r,
    };
}

function make(rc, rp, times) {
    times = times || 1;
    let check = canMake(rc, times);
    if (rp || !check.success) {
        return check;
    }
    for (let k = 0; k < times; k++) {
        for (let j = 0; j < rc.rec.length; j++) {
            if (rc.rec[j].return) continue;
            if (!rc.rec[j].item.slot) {
                let itemToAlter = scan2(inv, rc.rec[j].item, rc.rec[j].amount).b;
                itemToAlter.amount -= rc.rec[j].amount;
                if (itemToAlter.amount === 0) removeItem(itemToAlter);
            } else {
                let ar = findworst(inv, rc.rec[j].item);
                let finar = [];
                for (let m = 0; m < rc.rec[j].amount; m++) finar.push(ar[m]);
                for (let m in finar) removeItem(finar[m]);
            }
        }
        if (!!rc.cmake) {
            rc.cmake();
        } else {
            for (let itm in rc.res) {
                if (!rc.res[itm].amount_max) giveItem(rc.res[itm].item, rc.res[itm].amount);
                else {
                    giveItem(rc.res[itm].item, rand(rc.res[itm].amount, rc.res[itm].amount_max));
                }
            }
            rc.onmake();
        }
    }
    isort(global.sm);
}

function restock(vnd) {
    vnd.stock = [];
    shuffle(vnd.items);
    for (let ims = 0; ims < vnd.items.length; ims++) {
        if ((!vnd.items[ims].cond || vnd.items[ims].cond() === true) && random() <= vnd.items[ims].c)
            vnd.stock.push([vnd.items[ims].item, rand(vnd.items[ims].min, vnd.items[ims].max), vnd.items[ims].p]);
        vnd.stock.sort(function (a, b) {
            if (a[0].id < b[0].id) return -1;
            if (a[0].id > b[0].id) return 1;
            return 0;
        });
    }
}

function shuffle(arr) {
    let copy = [];
    let index = 0;
    for (let a in arr) copy[a] = arr[a];
    while (copy.length != 0) {
        let val = rand(copy.length - 1);
        arr[index++] = copy[val];
        copy.splice(val, 1);
    }
}

global.current_a = act.default;

function renderAct(a) {
    this.accm = addElement(dom.acccon, "div", null, "skwmmc");
    a.t = this.accm;
    addDesc(this.accm, null, 2, a.name, a.desc());
    this.accm.innerHTML = a.name;
    this.accm.style.textAlign = "center";
    this.accm.style.display = "block";
    if (acts.length - 1 === acts.indexOf(a)) this.accm.style.borderBottom = "1px solid #46a";
    if (a.cond(false) !== true) this.accm.style.color = "grey";
    if (a.active === true) this.accm.style.color = "lime";
    this.accm.addEventListener("click", function () {
        switch (a.type) {
            case 1:
                if (a.cond() === true && a.id !== global.current_a.id) {
                    activateAct(a);
                    this.style.color = "lime";
                } else if (a.id === global.current_a.id) {
                    deactivateAct(global.current_a);
                    this.style.color = "inherit";
                }
                break;
            case 2:
                if (a.cond() === true) a.use();
                break;
            case 3:
                break;
        }
        for (let a in acts) refreshAct(acts[a].t, acts[a]);
    });
}

function refreshAct(e, a) {
    e.style.color = "inherit";
    if (a.cond(false) !== true) e.style.color = "grey";
    if (a.active === true) e.style.color = "lime";
}

function activateAct(actn) {
    global.current_a.deactivate();
    actn.activate();
    global.current_a = actn;
    global.flags.busy = true;
    dom.ct_bt3.style.backgroundColor = "darkslategray";
}

function deactivateAct(actn) {
    actn.deactivate();
    global.current_a = act.default;
    global.flags.busy = false;
    dom.ct_bt3.style.backgroundColor = "inherit";
    for (let a in acts) refreshAct(acts[a].t, acts[a]);
}

addDesc(dom.inv_btn_1, null, 2, "Filter", "All");
addDesc(dom.inv_btn_2, null, 2, "Filter", "Weapons");
addDesc(dom.inv_btn_3, null, 2, "Filter", "Armor");
addDesc(dom.inv_btn_4, null, 2, "Filter", "Comestibles");
addDesc(dom.inv_btn_5, null, 2, "Filter", "Materials/Other");
addDesc(dom.inv_btn_1_b, null, 2, "Filter", "Alphabetically");
addDesc(dom.inv_btn_2_b, null, 2, "Filter", "by Amount");
addDesc(dom.inv_btn_3_b, null, 2, "Filter", "by Type");

global.dscr = addElement(document.body, "div", "dscr");
global.dscr.style.display = "none";

function invbtsrst() {
    dom.inv_btn_1.removeAttribute("style");
    dom.inv_btn_2.removeAttribute("style");
    dom.inv_btn_3.removeAttribute("style");
    dom.inv_btn_4.removeAttribute("style");
    dom.inv_btn_5.removeAttribute("style");
    switch (global.sm) {
        case 1:
            dom.inv_btn_1.style.color = "black";
            dom.inv_btn_1.style.backgroundColor = "yellow";
            break;
        case 2:
            dom.inv_btn_2.style.color = "black";
            dom.inv_btn_2.style.backgroundColor = "yellow";
            break;
        case 3:
            dom.inv_btn_3.style.color = "black";
            dom.inv_btn_3.style.backgroundColor = "yellow";
            break;
        case 4:
            dom.inv_btn_4.style.color = "black";
            dom.inv_btn_4.style.backgroundColor = "yellow";
            break;
        case 5:
            dom.inv_btn_5.style.color = "black";
            dom.inv_btn_5.style.backgroundColor = "yellow";
            break;
    }
}

function update_db() {
    dom.d4_1.innerHTML = "STR: " + Math.round(you.str_d);
    dom.d4_2.innerHTML = "AGL: " + Math.round(you.agl_d);
    dom.d4_3.innerHTML = "INT: " + Math.round(you.int_d);
    dom.d4_4.innerHTML = "SPD: " + you.spd;
}
update_db();

function update_d() {
    dom.d5_1_1m.innerHTML =
        "hp: " + format3(global.current_m.hp.toString()) + "/" + format3(global.current_m.hpmax.toString());
    dom.d5_1m.style.width = (100 * global.current_m.hp) / global.current_m.hpmax + "%";
    dom.hit_c();
    dom.d5_3_1.update();
    dom.d5_1_1.update();
}
update_d();

global.text.mtp = ["Human", "Beast", "Undead", "Evil", "Phantom", "Dragon"];

function update_m() {
    dom.d2m.innerHTML = global.current_m.name;
    let mtp = global.text.mtp[global.current_m.type];
    if (global.current_m.id >= 1) mtp += global.current_m.sex === true ? " ♂" : " ♀";
    dom.d3m.innerHTML = " lvl:" + global.current_m.lvl + " '" + mtp + "'";
    dom.d4_1m.innerHTML = "STR: " + Math.round(global.current_m.str);
    dom.d4_2m.innerHTML = "AGL: " + Math.round(global.current_m.agl);
    dom.d4_3m.innerHTML = "INT: " + Math.round(global.current_m.int);
    dom.d4_4m.innerHTML = "SPD: " + global.current_m.spd;
    dom.d9m.update();
}

global.zone_a_p[0] = testz;

function offline_a() {
    global.offline_evil_index = 0;
    for (let i in global.zone_a_p) {
        let zone = global.zone_a_p[i];
        let apower = (zone.apop / zone.bpop) * 2;
        zone.vsize += zone.vsize * 0.0008 + 5;
        zone.apop += zone.apop * (randf(Math.log(zone.apop) * 0.8, Math.log(zone.apop) * 1.2) / 1000);
        zone.bpop += zone.bpop * (randf(Math.log(zone.bpop) * 0.8, Math.log(zone.bpop) * 1.2) / 1000);
        if (zone.apop > 0) zone.vsize -= Math.log2(zone.apop) * 2;
        else zone.bpop -= rand(20, 50);
        if (zone.bpop > 0) zone.apop -= zone.bpop / rand(40, 100);
        if (zone.vsize < 0) zone.apop -= rand(20, 50);
        global.offline_evil_index += zone.bpop;
        console.log("docile: " + zone.apop + " predator: " + zone.bpop + " forest: " + zone.vsize);
    }
    global.offline_evil_index = Math.sqrt(global.offline_evil_index + 2100) / 45;
}

function dscr(c, what, type, ttl, dsc, id) {
    id = id || 0;
    global.dscr.style.display = "";
    empty(global.dscr);
    global.dscr.style.top = c.clientY + 30;
    global.dscr.style.left = c.clientX + 30;
    if (!type || type === 1) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = what.name;
        switch (what.rar) {
            case 0: {
                this.label.style.color = "grey";
                break;
            }
            case 2: {
                this.label.style.textShadow = "0px 0px 1px blue";
                this.label.style.color = "cyan";
                break;
            }
            case 3: {
                this.label.style.textShadow = "0px 0px 2px lime";
                this.label.style.color = "lime";
                break;
            }
            case 4: {
                this.label.style.textShadow = "0px 0px 3px orange";
                this.label.style.color = "yellow";
                break;
            }
            case 5: {
                this.label.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
                this.label.style.color = "orange";
                break;
            }
            case 6: {
                this.label.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
                this.label.style.color = "purple";
                break;
            }
        }
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
        if (what.slot > 0) {
            if (what.slot === 1) {
                if (what.str > 0) this.text.innerHTML += "STR: <span style='color:lime'> +" + what.str + "</span><br>";
                else if (what.str < 0)
                    this.text.innerHTML += "STR: <span style='color:red'>" + what.str + "</span><br>";
            } else {
                if (what.str > 0) this.text.innerHTML += "DEF: <span style='color:lime'> +" + what.str + "</span><br>";
                else if (what.str < 0)
                    this.text.innerHTML += "DEF: <span style='color:red'>" + what.str + "</span><br>";
            }
            if (what.agl > 0) this.text.innerHTML += "AGL: <span style='color:lime'> +" + what.agl + "</span><br>";
            else if (what.agl < 0) this.text.innerHTML += "AGL: <span style='color:red'>" + what.agl + "</span><br>";
            if (what.int > 0) this.text.innerHTML += "INT: <span style='color:lime'> +" + what.int + "</span><br>";
            else if (what.int < 0) this.text.innerHTML += "INT: <span style='color:red'>" + what.int + "</span><br>";
            if (what.spd > 0) this.text.innerHTML += "SPD: <span style='color:lime'> +" + what.spd + "</span><br>";
            else if (what.spd < 0) this.text.innerHTML += "SPD: <span style='color:red'>" + what.spd + "</span><br>";

            if (what.slot < 8) {
                this.dp_c = addElement(global.dscr, "div", "dr_l");
                this.dp_t = addElement(this.dp_c, "small");
                this.dp_t.innerHTML = "DP:";
                this.dp_m = addElement(this.dp_c, "small", "dp_m");
                this.dp_mn = addElement(this.dp_m, "small");
                this.dp_mn.innerHTML = ((what.dp * 10) << 0) / 10 + "/" + what.dpmax;
                this.dp_mn.style.textShadow = "1px 1px black"; //this.dp_mn.style.backgroundColor='rgba(102, 51, 153,.8)';
                this.dp_mn.style.position = "inherit";
                this.dp_mn.style.top = -4; //this.dp_mn.style.border='1px black solid';
                this.dp_mn.style.padding = 1;
                this.dp_mn.style.left = "35%";
                let dp = (what.dp * 100) / what.dpmax;
                this.dp_m.style.width = dp + "%";
                if (dp >= 90) this.dp_m.style.backgroundColor = "royalblue";
                else if (dp < 90 && dp >= 70) this.dp_m.style.backgroundColor = "green";
                else if (dp < 70 && dp >= 35) this.dp_m.style.backgroundColor = "yellow";
                else if (dp < 35 && dp >= 10) this.dp_m.style.backgroundColor = "orange";
                else if (dp < 10) this.dp_m.style.backgroundColor = "red";
                clearInterval(timers.dp_tmr);
                timers.dp_tmr = setInterval(function () {
                    let dp = (what.dp * 100) / what.dpmax;
                    this.dp_mn.innerHTML = ((what.dp * 10) << 0) / 10 + "/" + what.dpmax;
                    this.dp_m.style.width = dp + "%";
                    if (dp >= 90) this.dp_m.style.backgroundColor = "royalblue";
                    else if (dp < 90 && dp >= 70) this.dp_m.style.backgroundColor = "green";
                    else if (dp < 70 && dp >= 35) this.dp_m.style.backgroundColor = "yellow";
                    else if (dp < 35 && dp >= 10) this.dp_m.style.backgroundColor = "orange";
                    else if (dp < 10) this.dp_m.style.backgroundColor = "red";
                }, 1000);
            }
            this.sltic = addElement(global.dscr, "div", "intfffx");
            this.sltic.style.textAlign = "left";
            let slti = addElement(this.sltic, "small");
            slti.innerHTML = "<br>Class: ";
            if (!!what.wtype) {
                switch (what.wtype) {
                    case 0:
                        slti.innerHTML += "Unarmed";
                        break;
                    case 1:
                        slti.innerHTML += "Sword";
                        break;
                    case 2:
                        slti.innerHTML += "Axe";
                        break;
                    case 3:
                        slti.innerHTML += "Knife";
                        break;
                    case 4:
                        slti.innerHTML += "Spear/Polearm";
                        break;
                    case 5:
                        slti.innerHTML += "Club/Hammer";
                        break;
                    case 6:
                        slti.innerHTML += "Staff/Wand";
                        break;
                    case 7:
                        slti.innerHTML += "Bow/Crossbow";
                        break;
                }
            } else {
                switch (what.slot) {
                    case 2:
                        slti.innerHTML += "Shield";
                        break;
                    case 3:
                        slti.innerHTML += "Head";
                        break;
                    case 4:
                        slti.innerHTML += "Body";
                        break;
                    case 5:
                        slti.innerHTML += "Hands";
                        break;
                    case 6:
                        slti.innerHTML += "Hands";
                        break;
                    case 7:
                        slti.innerHTML += "Legs";
                        break;
                    case 8:
                        slti.innerHTML += "Accessory";
                        break;
                    case 9:
                        slti.innerHTML += "Accessory";
                        break;
                    case 10:
                        slti.innerHTML += "Accessory";
                        break;
                }
            }
            if (what.twoh === true) slti.innerHTML += " (2H)";
            if (what.slot === 1)
                switch (what.ctype) {
                    case 0:
                        slti.innerHTML += ", Edged";
                        break;
                    case 1:
                        slti.innerHTML += ", Piercing";
                        break;
                    case 2:
                        slti.innerHTML += ", Blunt";
                        break;
                }
            if (what.data.kills) {
                let sp = addElement(this.sltic, "small");
                sp.style.position = "absolute";
                sp.style.right = 6;
                sp.innerHTML = "kills: " + col(what.data.kills, "yellow");
                clearInterval(timers.wpnkilsch);
                timers.wpnkilsch = setInterval(function () {
                    sp.innerHTML = "kills: " + col(what.data.kills, "yellow");
                }, 1000);
            }
        } else {
            this.sltic = addElement(global.dscr, "div");
            this.sltic.style.textAlign = "left";
            let slti = addElement(this.sltic, "small");
            slti.innerHTML = "<br>Class: ";
            if (what.isf === true) {
                slti.innerHTML += "Furniture";
                this.text.innerHTML +=
                    dom.dseparator + '<span style="color:chartreuse">Use to add to the furniture list</span>';
                if (what.parent) {
                    let owned = false;
                    let sp = addElement(this.sltic, "small");
                    sp.style.position = "absolute";
                    sp.style.right = 6;
                    for (let a in furn)
                        if (furn[a].id === what.parent.id) {
                            owned = true;
                            break;
                        }
                    sp.innerHTML =
                        'owned: <span style="color:' +
                        (owned ? "lime" : "red") +
                        '">' +
                        (owned ? "yes" : "no") +
                        "</span>";
                }
            } else if (what.id < 3000) {
                slti.innerHTML += "Food";
                if (what.rot) slti.innerHTML += "(" + '<span style="color:orange">perishable</span>' + ")";
            } else if (what.id >= 3000 && what.id < 5000) slti.innerHTML += "Medicine/Tool";
            else if (what.id >= 5000 && what.id < 9000) slti.innerHTML += "Material/Misc";
            else slti.innerHTML += "Book";
        }
        if (what.id < 3000) {
            dom.dtrd = addElement(this.sltic, "small");
            dom.dtrd.innerHTML = "Tried: ";
            dom.dtrd.style.position = "relative";
            dom.dtrd.style.right = 1;
            dom.dtrd.style.float = "right";
            if (what.data.tried === true) dom.dtrd.innerHTML += '<span style="color: lime">Yes</span>';
            else dom.dtrd.innerHTML += '<span style="color: crimson">Never</span>';
        }
        if (what.id >= 9000 && what.id < 10000) {
            dom.dtrd = addElement(this.sltic, "small");
            dom.dtrd.innerHTML = "Read: ";
            dom.dtrd.style.position = "relative";
            dom.dtrd.style.right = 1;
            dom.dtrd.style.float = "right";
            if (what.data.finished === true) dom.dtrd.innerHTML += '<span style="color: lime">Yes</span>';
            else dom.dtrd.innerHTML += '<span style="color: crimson">Never</span>';
        }
        this.rar_c = addElement(global.dscr, "div", "d_l");
        this.rar = addElement(this.rar_c, "small");
        this.rar.innerHTML = "<br>Rarity: ";
        this.rar.style.position = "relative";
        this.rar.style.float = "left";
        for (let i = 0; i < what.rar; i++) this.rar.innerHTML += " ★ ";
        dom.dscshe = addElement(global.dscr, "div"); //dom.dscshe.innerHTML = dom.dseparator+'2323'; dom.dscshe.style.paddingTop=20;
        global.shiftitem = { item: what };
    } else if (type === 2) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = ttl;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = dsc;
    } else if (type === 3) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = global.current_m.name;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = global.current_m.desc;
    } else if (type === 4) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = ttl;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = dsc;
        dom.gde = addElement(global.dscr, "small");
        dom.gde.style.position = "relavite";
        dom.gde.style.float = "left";
        dom.gde.innerHTML = "<br>Duration: ";
        if (what.duration !== -1) dom.gde.innerHTML += what.duration;
        else dom.gde.innerHTML += "∞";
        if (what.power) {
            dom.gde1 = addElement(global.dscr, "small");
            dom.gde1.style.position = "relavite";
            dom.gde1.style.float = "right";
            dom.gde1.innerHTML = "<br>Power: ";
            dom.gde1.innerHTML += what.power;
        }
        clearInterval(timers.inup);
        timers.inup = setInterval(function () {
            dom.gde.innerHTML = "<br>Duration: ";
            if (what.duration !== -1) dom.gde.innerHTML += what.duration;
            else dom.gde.innerHTML += "∞";
        }, 200);
    } else if (type === 5) {
        let t = ttl === true ? you.title : what;
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = t.name;
        switch (t.rar) {
            case 0: {
                this.label.style.color = "grey";
                break;
            }
            case 2: {
                this.label.style.textShadow = "0px 0px 1px blue";
                this.label.style.color = "cyan";
                break;
            }
            case 3: {
                this.label.style.textShadow = "0px 0px 2px lime";
                this.label.style.color = "lime";
                break;
            }
            case 4: {
                this.label.style.textShadow = "0px 0px 3px orange";
                this.label.style.color = "yellow";
                break;
            }
            case 5: {
                this.label.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
                this.label.style.color = "orange";
                break;
            }
            case 6: {
                this.label.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
                this.label.style.color = "purple";
                break;
            }
            case 7: {
                this.dl.style.textShadow = "hotpink 1px 1px .1em,cyan -1px -1px .1em";
                this.dl.style.color = "black";
                break;
            }
        }
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = t.desc;
        if (t.talent)
            this.text.innerHTML +=
                dom.dseparator +
                '<small style="color:cyan">talent effect<br></small><br><small style="color:darkorange">' +
                t.tdesc +
                "</small>";
        this.dl = addElement(global.dscr, "small");
        this.dl.style.position = "relative";
        this.dl.style.display = "flex";
        this.dl.innerHTML =
            "<br>Rank: " + (ttl === true ? (you.title.id === 0 ? "0" : you.title.rar) : what.id === 0 ? "0" : what.rar);
        if ((ttl === true && you.title.rars === true) || (!ttl && what.rars === true)) this.dl.innerHTML += "★";
    } else if (type === 6) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = !!what.bname ? what.bname : what.name;
        this.sp = addElement(this.label, "small");
        this.sp.style.position = "absolute";
        this.sp.style.right = 6;
        this.sp.innerHTML = "Ｐ: " + col(Math.round(what.p * 100) + "%", "magenta");
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = what.desc;
        if (!!what.mlstn) {
            this.prks = addElement(global.dscr, "div", "d_l");
            this.prks.innerHTML = "<br>Perks unlocked";
            this.prks.style.color = "cyan";
            for (let k = 0; k < what.mlstn.length; k++)
                if (what.mlstn[k].g === true) {
                    this.prk = addElement(global.dscr, "div", "d_t");
                    this.prk.innerHTML =
                        "lvl " + what.mlstn[k].lv + ':<span style="color:yellow"> ' + what.mlstn[k].p + " </span>";
                } else {
                    this.prk = addElement(global.dscr, "div", "d_t");
                    this.prk.innerHTML =
                        "lvl " + what.mlstn[k].lv + ':<span style="color:yellow"> ' + "??????????" + " </span>";
                    return;
                }
        }
    } else if (type === 7) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = what.x;
        this.label.style.color = "tomato";
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = what.y;
    } else if (type === 8) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = what.name;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = what.desc;
        this.dl = addElement(global.dscr, "small");
        this.dl.style.position = "relative";
        this.dl.style.display = "flex";
        this.dl.innerHTML = "<br>Rank: ";
        this.db = addElement(this.dl, "div");
        for (let i = 0; i < what.rar; i++) this.db.innerHTML += "★";
        this.db.style.paddingTop = 12;
        this.db.style.paddingLeft = 6;
        switch (what.rar) {
            case 0: {
                this.label.style.color = this.db.style.color = "grey";
                break;
            }
            case 2: {
                this.label.style.textShadow = this.db.style.textShadow = "0px 0px 1px blue";
                this.label.style.color = this.db.style.color = "cyan";
                break;
            }
            case 3: {
                this.label.style.textShadow = this.db.style.textShadow = "0px 0px 2px lime";
                this.label.style.color = this.db.style.color = "lime";
                break;
            }
            case 4: {
                this.label.style.textShadow = this.db.style.textShadow = "0px 0px 3px orange";
                this.label.style.color = this.db.style.color = "yellow";
                break;
            }
            case 5: {
                this.label.style.textShadow = this.db.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
                this.label.style.color = this.db.style.color = "orange";
                break;
            }
            case 6: {
                this.label.style.textShadow = this.db.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
                this.label.style.color = this.db.style.color = "purple";
                break;
            }
            case 7: {
                this.label.style.textShadow = this.db.style.textShadow = "hotpink 1px 1px .1em,cyan -1px -1px .1em";
                this.label.style.color = this.db.style.color = "black";
                break;
            }
        }
    } else if (type === 9) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = what.name;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = typeof what.desc === "function" ? what.desc(what) : what.desc;
    } else if (type === 10) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = what.name;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = what.desc + dom.dseparator;
        let t = Object.keys(global.drdata);
        let ids = [];
        for (let a in t) ids[a] = Number(t[a].substring(1));
        this.o = addElement(this.text, "small");
        this.o.innerHTML = "drop table";
        this.o.style.color = "cyan";
        let thing = false;
        for (let a in ids) {
            if (ids[a] === what.id || what.un) {
                let dt = global.drdata[Object.keys(global.drdata)[a]];
                thing = true;
                for (let b in what.drop) {
                    this.dbig = addElement(this.text, "div");
                    this.dbig.style.display = "flex";
                    this.dbig.style.border = "#1f72a2 1px solid";
                    this.dbig.style.backgroundColor = "#202031";
                    this.dcell1 = addElement(this.dbig, "div");
                    this.dcell2 = addElement(this.dbig, "div");
                    this.dbig.style.textAlign = "center";
                    this.dcell1.style.width = "80%";
                    this.dcell1.style.borderRight = "#1f72a2 1px solid";
                    this.dcell2.style.width = "20%";
                    if (b != what.drop.length - 1) this.dbig.style.borderBottom = "none";
                    this.dcell2.innerHTML = ((what.drop[b].chance * 100000000) << 0) / 1000000 + "%";
                    if (what.drop[b].chance >= 0.05) this.dcell2.style.color = "lime";
                    else if (what.drop[b].chance < 0.05 && what.drop[b].chance > 0.01)
                        this.dcell2.style.color = "yellow";
                    else if (what.drop[b].chance <= 0.01 && what.drop[b].chance > 0.001)
                        this.dcell2.style.color = "orange";
                    else if (what.drop[b].chance <= 0.001) this.dcell2.style.color = "crimson";
                    if (dt[b] || what.un) {
                        this.dcell1.innerHTML += what.drop[b].item.name;
                        if (what.drop[b].cond && !what.drop[b].cond()) {
                            this.dcell1.style.textDecoration = "line-through";
                            this.dcell1.style.color = "red";
                        }
                        switch (what.rar) {
                            case 0: {
                                this.dcell1.style.color = "grey";
                                break;
                            }
                            case 2: {
                                this.dcell1.style.textShadow = "0px 0px 1px blue";
                                this.dcell1.style.color = "cyan";
                                break;
                            }
                            case 3: {
                                this.dcell1.style.textShadow = "0px 0px 2px lime";
                                this.dcell1.style.color = "lime";
                                break;
                            }
                            case 4: {
                                this.dcell1.style.textShadow = "0px 0px 3px orange";
                                this.dcell1.style.color = "yellow";
                                break;
                            }
                            case 5: {
                                this.dcell1.style.textShadow = "0px 0px 2px crimson,0px 0px 5px red";
                                this.dcell1.style.color = "orange";
                                break;
                            }
                            case 6: {
                                this.dcell1.style.textShadow = "1px 1px 1px black,0px 0px 2px purple";
                                this.dcell1.style.color = "purple";
                                break;
                            }
                        }
                        if (what.drop[b].max) {
                            this.dcell1b = addElement(this.dcell1, "small");
                            this.dcell1b.style.color = "inherit";
                            this.dcell1b.style.position = "absolute";
                            this.dcell1b.style.right = 70;
                            this.dcell1b.style.paddingTop = 2;
                            this.dcell1b.innerHTML = what.drop[b].max;
                            if (what.drop[b].min && what.drop[b].min !== what.drop[b].max)
                                this.dcell1b.innerHTML += "-" + what.drop[b].min;
                        }
                    } else {
                        this.dcell1.innerHTML = "???????????";
                        this.dcell1.style.color = "yellow";
                    }
                }
                break;
            }
        }
        if (!thing) {
            for (let b in what.drop) {
                this.dbig = addElement(this.text, "div");
                this.dbig.style.display = "flex";
                this.dbig.style.border = "#1f72a2 1px solid";
                this.dbig.style.backgroundColor = "#202031";
                this.dcell1 = addElement(this.dbig, "div");
                this.dcell2 = addElement(this.dbig, "div");
                this.dbig.style.textAlign = "center";
                this.dcell1.style.width = "80%";
                this.dcell1.style.borderRight = "#1f72a2 1px solid";
                this.dcell2.style.width = "20%";
                if (b != what.drop.length - 1) this.dbig.style.borderBottom = "none";
                this.dcell1.innerHTML = "???????????";
                this.dcell1.style.color = "yellow";
                this.dcell2.innerHTML = ((what.drop[b].chance * 100000000) << 0) / 1000000 + "%";
                if (what.drop[b].chance >= 0.05) this.dcell2.style.color = "lime";
                else if (what.drop[b].chance < 0.05 && what.drop[b].chance > 0.01) this.dcell2.style.color = "yellow";
                else if (what.drop[b].chance <= 0.01 && what.drop[b].chance > 0.001) this.dcell2.style.color = "orange";
                else if (what.drop[b].chance <= 0.001) this.dcell2.style.color = "crimson";
            }
        }
    } else if (type === 12) {
        this.label = addElement(global.dscr, "div", "d_l");
        this.label.innerHTML = ttl;
        this.text = addElement(global.dscr, "div", "d_t");
        this.text.innerHTML = typeof dsc === "function" ? dsc(what) : dsc;
    }
}

function msg(txt, c, dsc, type, bc, chck) {
    if (global.flags.m_freeze === false && global.flags.loadstate === false) {
        while (dom.gmsgs.children[1].children.length > global.msgs_max - 1)
            dom.gmsgs.children[1].removeChild(dom.gmsgs.children[1].children[0]);
        let msg = addElement(dom.mscont, "div", null, "msg");
        if (global.flags.msgtm) {
            let now = new Date();
            let g = addElement(msg, "small");
            g.innerHTML =
                "[" +
                (now.getHours() < 10 ? "0" + now.getHours() : now.getHours()) +
                ":" +
                (now.getMinutes() < 10 ? "0" + now.getMinutes() : now.getMinutes()) +
                ":" +
                (now.getSeconds() < 10 ? "0" + now.getSeconds() : now.getSeconds()) +
                "]";
            g.style.backgroundColor = "#242848";
            g.style.display = "flex";
        }
        let mtxt = addElement(msg, "span");
        if (dsc) {
            if (type) addDesc(msg, dsc, type);
            else addDesc(msg, dsc);
        }
        //let nt = new String(); for(let a in txt){nt+=txt[a].charCodeAt()!==32?String.fromCharCode(41216-txt[a].charCodeAt()):' '}; txt=nt;
        if (c)
            mtxt.innerHTML = "<span style=color:" + c + (bc ? ";background-color:" + bc : "") + ">" + txt + "</span>";
        else mtxt.innerHTML = txt;
        dom.mscont.scrollTop = dom.mscont.scrollHeight;
        global.lastmsg = msg.innerHTML;
        //if(true) {if(msg.innerHTML==global.lstmsg) msg.innerHTML=global.lastmsg+'('+(++global.lastmsgc)+')';
        //  else {global.lastmsg=msg.innerHTML;global.lastmsgc=0;}} else global.lastmsg=msg.innerHTML;
    }
}

function _msg(txt, c, dsc, type, bc, chck) {
    while (dom.gmsgs.children[1].children.length > global.msgs_max - 1)
        dom.gmsgs.children[1].removeChild(dom.gmsgs.children[1].children[0]);
    let msg = addElement(dom.mscont, "div", null, "msg");
    if (dsc) {
        if (type) addDesc(msg, dsc, type);
        else addDesc(msg, dsc);
    }
    if (c) msg.innerHTML = "<span style=color:" + c + (bc ? ";background-color:" + bc : "") + ">" + txt + "</span>";
    else msg.innerHTML = txt;
    dom.mscont.scrollTop = dom.mscont.scrollHeight;
}

function msg_add(txt, c, bc, shd) {
    if (global.flags.m_freeze === false && global.flags.loadstate === false) {
        let bac = "";
        let b = "";
        if (bc) bac = "background-color:" + bc;
        if (shd) b = "text-shadow:" + shd.toString();
        else b = "";
        if (c)
            dom.gmsgs.children[1].children[dom.gmsgs.children[1].children.length - 1].innerHTML +=
                '<span style="color:' + c + ";" + bac + ";" + b + '">' + txt + "</span>";
        else dom.gmsgs.children[1].children[dom.gmsgs.children[1].children.length - 1].innerHTML += txt;
        dom.mscont.scrollTop = dom.mscont.scrollHeight;
    }
}

function format(thing, what) {
    msg("wHw");
}

function appear(dom) {
    if (!!dom) {
        let tmr = 0;
        dom.style.opacity = 0;
        dom.style.display = "";
        let a = setInterval(() => {
            tmr++;
            dom.style.opacity = tmr / 100;
            if (tmr === 100) clearInterval(a);
        }, 10);
    }
}

function fade(dom, timer, del) {
    let tmr = timer || 50;
    dom.style.opacity = 1;
    dom.style.display = "";
    let a = setInterval(() => {
        tmr--;
        dom.style.opacity = tmr / (timer || 50);
        if (tmr === 0) {
            clearInterval(a);
            if (del === true) {
                document.body.removeChild(dom);
            }
        }
    }, 10);
}

function addDesc(dm, what, type, ttl, dsc, f, id) {
    dm.addEventListener("mouseenter", (a) => {
        dscr(a, what, type, ttl, f === true ? dsc() : dsc, id);
        giveSkExp(skl.rdg, 0.002);
        global.stat.popt++;
        global.curwds = this;
        global.shiftid = id;
        if (global.kkey === 1) descsinfo(global.shiftid);
    });
    dm.addEventListener("mousemove", (a) => {
        global.dscr.style.top =
            global.dscr.clientHeight + 60 + a.clientY > document.body.clientHeight
                ? a.clientY +
                  30 +
                  global.dscr.clientHeight -
                  (a.clientY + 30 + global.dscr.clientHeight - document.body.clientHeight) -
                  global.dscr.clientHeight -
                  30
                : a.clientY + 30;
        global.dscr.style.left =
            global.dscr.clientWidth + 60 + a.clientX > document.body.clientWidth
                ? a.clientX +
                  30 +
                  global.dscr.clientWidth -
                  (a.clientX + 30 + global.dscr.clientWidth - document.body.clientWidth) -
                  global.dscr.clientWidth -
                  30
                : a.clientX + 30;
    });
    dm.addEventListener("mouseleave", () => {
        global.shiftid = 0;
        empty(global.dscr);
        global.dscr.style.display = "none";
        clearInterval(timers.inup);
        clearInterval(timers.dp_tmr);
        clearInterval(timers.wpnkilsch);
        if (dom.dscshe) dom.dscshe.innerHTML = "";
    });
}

function allbuff(who) {
    who.stat_r();
    for (let g in who.eff) if (who.eff[g].type === 1) who.eff[g].use(who.eff[g].y, who.eff[g].z);
    if (who.id === you.id) {
        let dm = skl.fgt.use();
        if (you.eqp[0].twoh === true) dm += skl.twoh.use();
        you.str += dm;
        you.int += dm;
        usePlayerWeaponSkill();
    }
}

function fght(att, def) {
    /*if(global.flags.btlinterrupt===true){
    msg('battle interrupted');if(global.current_z.size>0) {area_init(global.current_z);global.current_z.size--;}else if(global.current_z.size===-1)area_init(global.current_z);else {msg('Area cleared','orange');global.current_z.onEnd();global.flags.civil=true;global.flags.btl=false;}; dom.d7m.update(); global.flags.btlinterrupt=false; return;
  }*/
    if (!att.alive || !def.alive) {
        return;
    }
    if (global.flags.smkactv) {
        global.flags.smkactv = false;
        return;
    }
    att.stat_r();
    def.stat_r();
    for (let g in att.eff) if (att.eff[g].type === 1) att.eff[g].use(att.eff[g].y, att.eff[g].z);
    for (let g in def.eff) if (def.eff[g].type === 1) def.eff[g].use(def.eff[g].y, def.eff[g].z);
    if (att.spd > 0 && def.spd > 0) {
        global.s_l += Math.abs(att.spd - def.spd);
    } else {
        global.s_l = Math.abs(att.spd - def.spd);
    }
    let inn, sc;
    if (att.spd >= def.spd || att.spd <= 0) {
        inn = att;
        sc = def;
    } else {
        inn = def;
        sc = att;
    }
    global.miss = 0;
    let isyouinn = inn.id === you.id;
    //if(isyouinn===false){if(random()<.9){console.log('stealth active'); inn=att; sc=def}}
    if (inn.spd > 0) {
        if (global.s_l / sc.spd >= 2) {
            let acc_dmg = 0;
            let hts = 0;
            global.flags.multih = true;
            for (let ii = 0; ii < Math.ceil(global.s_l / sc.spd); ii++) {
                hts++;
                acc_dmg += inn.battle_ai(inn, sc);
                if (sc.hp <= 0) break;
            }
            global.flags.multih = false;
            if (att.id === you.id && acc_dmg >= sc.hpmax) global.stat.onesht++;
            if (global.flags.m_blh === false && hts - global.miss > 0) {
                if (hts === 1) printHitMessage(inn.name, acc_dmg, !isyouinn);
                else printMultihitMessage(hts, inn.name, acc_dmg, !isyouinn);
            } else if (global.flags.m_blh === false) msg(inn.name + " missed", "grey");
            if (sc.hp <= 0 && sc.alive === true) {
                global.atkdfty = [3, global.atkdftydt];
                sc.onDeath(inn);
                sc.onDeathE(inn);
            }
            global.s_l = global.s_l % sc.spd;
        } else {
            doSingleAttack(inn, sc, isyouinn);
        }
    }
    if (!sc.alive) {
        you.stat_r();
        return;
    }
    timers.btl2 = setTimeout(function () {
        if (global.flags.btl === true) {
            doSingleAttack(sc, inn, !isyouinn);
            you.stat_r();
        }
    }, 500 / global.fps);
}

function attack(att, def, atk, power) {
    if (!global.flags.btl) return;
    allbuff(att);
    allbuff(def);
    atk = atk || abl.default;
    let isyou = att.id === you.id;
    global.mabl = atk;
    let dmg;
    let hit;
    let dk = false;
    let a = 2 + rand(4);
    if (isyou === true) {
        wpnhitstt();
        hit = hit_calc(1);
        giveSkExp(skl.fgt, def.rnk);
        dk = global.flags.isdark && !cansee();
        if (dk) hit *= 0.3 + skl.ntst.lvl * 0.07;
    } else hit = hit_calc(2);
    global.target = you.eqp[a];
    global.t_n = a;
    if (rand(100) < hit) {
        global.target_g = a;
        if (isyou === true) {
            let t = you.eqp[0].dp > 0 ? 1 : 0.5;
            switch (you.eqp[0].wtype) {
                case 0:
                    giveSkExp(skl.unc, t);
                    break;
                case 1:
                    giveSkExp(skl.srdc, t);
                    break;
                case 2:
                    giveSkExp(skl.axc, t);
                    break;
                case 3:
                    giveSkExp(skl.knfc, t);
                    break;
                case 4:
                    giveSkExp(skl.plrmc, t);
                    break;
                case 5:
                    giveSkExp(skl.hmrc, t);
                    break;
                case 6:
                    giveSkExp(skl.stfc, t);
                    break;
            }
            if (dk) giveSkExp(skl.ntst, 0.1);
            if (you.mods.tstl > 0) {
                itm = select(def.drop);
                if (random() < (itm.chance + (itm.chance / 100) * you.luck) * 0.01 * skl.stel.use()) {
                    giveItem(itm.item);
                    giveSkExp(skl.stel, (1 / itm.chance) * 10);
                } else giveSkExp(skl.stel, 1);
            }
        } else {
            if (you.eqp[1].id !== 10000 && !you.eqp[0].twoh) giveSkExp(skl.shdc, 0.2);
            you.stat_r();
            if (you.mods.ddgmod !== 0)
                if (random() < you.mods.ddgmod) {
                    global.miss++;
                    if (global.flags.m_blh === false && !global.flags.multih && global.flags.m_blh === false)
                        msg(att.name + " missed", "grey");
                    global.flags.msd = true;
                    giveSkExp(skl.evas, 0.5);
                    return 0;
                }
        }
        dmg = Math.round(atk.f(att, def, power));
        def.hp -= dmg;
        global.flags.msd = false;
        if (global.flags.m_blh === false && !global.flags.multih && global.flags.m_blh === false)
            printHitMessage(att.name, dmg, att.id === you.id ? false : true);
        if (isyou === true) {
            dom.d8_2.innerHTML =
                "Critical chance: " +
                Math.round(
                    you.mods.crflt * 1000 +
                        ((you.crt * (2 - (you.sat / you.satmax + you.mods.sbonus) * 2) + you.crt) *
                            (you.luck / 25 + 1) +
                            skl.seye.use()) *
                            1000
                ) /
                    10 +
                "%";
            if (you.eqp[0].id != 10000) you.eqp[0].dp > 0 ? (you.eqp[0].dp -= 0.008) : (you.eqp[0].dp = 0);
            global.stat.dmgdt += dmg;
            if (global.flags.eshake === true) {
                dom.d1m.style.left = parseInt(global.special_x) + rand(-3, 3) + "px";
                dom.d1m.style.top = parseInt(global.special_y) + rand(-3, 3) + "px";
                setTimeout(() => {
                    dom.d1m.style.left = parseInt(global.special_x) + "px";
                    dom.d1m.style.top = parseInt(global.special_y) + "px";
                }, 60);
            }
        } else {
            if (global.target.id !== 10000) global.target.dp > 0 ? (global.target.dp -= 0.008) : (global.target.dp = 0);
            if (you.eqp[1].id !== 10000) you.eqp[1].dp > 0 ? (you.eqp[1].dp -= 0.008) : (you.eqp[1].dp = 0);
            if (dmg > 0) giveSkExp(skl.painr, 1);
            if (global.target.id === 10000 && dmg > 0) giveSkExp(skl.tghs, dmg * 0.05);
            global.stat.dmgrt += dmg;
        }
    } else {
        global.miss++;
        global.stat.misst++;
        if (global.flags.m_blh === false && !global.flags.multih && global.flags.m_blh === false)
            msg(att.name + " missed", "grey");
        global.flags.msd = true;
        if (dk) giveSkExp(skl.ntst, 0.01);
        if (!isyou) global.stat.dodgt++;
    }
    update_d();
    if (!global.flags.multih) {
        if (isyou && dmg >= def.hpmax) global.stat.onesht++;
        if (def.hp <= 0 && def.alive === true) {
            global.atkdfty = [3, global.atkdftydt];
            def.onDeath(att);
            def.onDeathE(att);
        }
    }
    return dmg || 0;
}

function tattack(pow, type, e) {
    let dmg;
    let ddat = skl.thr.use();
    let m = global.current_m;
    global.atkdftm[0] = type;
    let agl_bonus = 0;
    let spd = m.spd > 0 ? m.spd : 0;
    for (let i = 0; i < you.eqp.length; i++) agl_bonus += you.eqp[i].agl;
    let hit = (((you.agl + agl_bonus / 2) * you.efficiency()) / (spd * 5 + m.agl)) * 130 + 5 + ddat.b;
    giveSkExp(skl.thr, e);
    giveSkExp(skl.fgt, skl.thr.lvl * 5 + 1);
    if (rand(100) < hit) {
        dmg = Math.round(((1 + you.str_r * 0.05) * (you.efficiency() + 1) * pow * (ddat.a + 1)) / 2);
        global.stat.dmgdt += dmg;
        if (!global.flags.m_blh)
            msg(
                "You hit " + global.current_m.name + ' for <span style="color:hotpink">' + dmg + "</span> damage",
                "yellow"
            );
        global.current_m.hp -= dmg;
        if (m.hp <= 0 && m.alive === true) {
            m.onDeath(you);
            m.onDeathE();
        }
        dom.d5_1_1m.update();
        if (global.flags.eshake === true) {
            dom.d1m.style.left = parseInt(global.special_x) + rand(-3, 3) + "px";
            dom.d1m.style.top = parseInt(global.special_y) + rand(-3, 3) + "px";
            setTimeout(() => {
                dom.d1m.style.left = parseInt(global.special_x) + "px";
                dom.d1m.style.top = parseInt(global.special_y) + "px";
            }, 60);
        }
    } else {
        if (global.flags.m_blh === false) msg(you.name + " missed", "grey");
    }
}

function dmg_calc(att, def, atk) {
    let isyou = att.id === you.id;
    let atea = atk.aff || isyou ? att.eqp[0].atype : att.atype;
    let atcs = atk.class || isyou ? att.eqp[0].ctype : att.ctype;
    global.atype_d = atk.aff || att.atype;
    let ta = effect.tarnish.active === true ? 0.7 : effect.prostasia.active === true ? 1.3 : 1;
    let eff = you.efficiency();
    let dmg = 0;
    let b = 1;
    if (atk.stt === 1) {
        if (isyou === true) {
            global.atype_d = atk.aff || you.eqp[0].atype;
            global.atkdftm = [atea, atcs, 0];
            let b = you.luck / 25 + 1;
            let undc = 0;
            if (you.eqp[0].id === 10000) undc = you.mods.undc;
            dmg =
                ((att.str * eff +
                    ((att.eqp[0].str + undc) * (att.eqp[0].dp / att.eqp[0].dpmax) * 0.9 + 0.1) *
                        (att.eqp[0].id === 10000 ? 1 : ta)) *
                    (100 +
                        (att.eqp[0].aff[atea] * 10 +
                            atk.affp * 10 +
                            att.eqp[0].cls[atcs] * 10 +
                            att.maff[global.current_m.type] * 10 +
                            att.aff[atea] * 10) *
                            (att.eqp[0].id === 10000 ? 1 : ta))) /
                    100 -
                (def.str * (100 + def.aff[atea] * 5 + def.cls[atcs] * 5)) / 100 +
                1;
        } else {
            dmg =
                (att.str * (100 + att.eqp[0].aff[att.atype] * 10 + atk.affp * 10 + att.eqp[0].cls[att.ctype] * 10)) /
                    100 -
                ((((def.str * eff + global.target.str * ((global.target.dp / global.target.dpmax) * 0.85 + 0.15) * ta) *
                    (100 +
                        global.target.aff[att.atype] * 5 * ta +
                        global.target.cls[att.ctype] * 5 * ta +
                        you.caff[att.atype] * 10 +
                        you.cmaff[global.current_m.type] * 10 +
                        you.ccls[att.ctype] * 10)) /
                    100 +
                    ((you.eqp[1].str * (1 + skl.shdc.lvl / 20) * (you.eqp[1].dp / you.eqp[1].dpmax) * 0.6 + 0.4) * ta) /
                        2) *
                    (100 -
                        (you.eqp[1].aff[att.atype] * 5 * (1 + skl.shdc.lvl / 20) +
                            global.target.cls[att.ctype] * 5 * (1 + skl.shdc.lvl / 20) * ta))) /
                    100;
            b = 1;
        }
    } else if (atk.stt === 2) {
        if (isyou === true) {
            global.atype_d = atk.aff || you.eqp[0].atype;
            let b = you.luck / 20 + 1;
            dmg =
                ((att.int * eff +
                    (att.eqp[0].int * (att.eqp[0].dp / att.eqp[0].dpmax) * 0.9 + 0.1) *
                        (att.eqp[0].id === 10000 ? 1 : ta)) *
                    (100 +
                        (att.eqp[0].aff[atea] * 10 +
                            atk.affp * 10 +
                            att.eqp[0].cls[atcs] * 10 +
                            att.maff[global.current_m.type] * 10 +
                            att.aff[atea] * 10) *
                            (att.eqp[0].id === 10000 ? 1 : ta))) /
                    100 -
                (def.int * (100 + def.aff[atea] * 5 + def.cls[atcs] * 5)) / 100 +
                1;
        } else {
            dmg =
                (att.int * (100 + att.eqp[0].aff[att.atype] * 15 + atk.affp * 15 + att.eqp[0].cls[att.ctype] * 5)) /
                    100 -
                ((((def.int * eff + global.target.int * ((global.target.dp / global.target.dpmax) * 0.85 + 0.15) * ta) *
                    (100 +
                        global.target.aff[att.atype] * 5 * ta +
                        global.target.cls[att.ctype] * 5 * ta +
                        you.caff[att.atype] * 10 +
                        you.cmaff[global.current_m.type] * 10 +
                        you.ccls[att.ctype] * 10)) /
                    100 +
                    ((you.eqp[1].int * (1 + skl.shdc.lvl / 20) * (you.eqp[1].dp / you.eqp[1].dpmax) * 0.6 + 0.4) * ta) /
                        2) *
                    (100 -
                        (you.eqp[1].aff[att.atype] * 5 * (1 + skl.shdc.lvl / 20) +
                            global.target.cls[att.ctype] * 5 * (1 + skl.shdc.lvl / 20) * ta))) /
                    100;
            b = 1;
        }
    }
    let ran = random();
    let c = 0;
    if (isyou === true) c = skl.seye.use();
    let ctr_r = (att.crt * (2 - (you.sat / you.satmax + you.mods.sbonus) * 2) + att.crt) * b + c + you.mods.crflt;
    if (isyou === false && dmg > 0) {
        switch (global.atype_d) {
            case 1:
                giveSkExp(skl.aba, dmg * 0.01);
                break;
            case 2:
                giveSkExp(skl.abe, dmg * 0.01);
                break;
            case 3:
                giveSkExp(skl.abf, dmg * 0.01);
                break;
            case 4:
                giveSkExp(skl.abw, dmg * 0.01);
                break;
            case 5:
                giveSkExp(skl.abl, dmg * 0.01);
                break;
            case 6:
                giveSkExp(skl.abd, dmg * 0.01);
                break;
        }
        global.atkdftydt.a = atea;
        global.atkdftydt.c = atcs;
        global.atkdftydt.id = att.id;
    }
    let pn = isyou === true ? 1 : 1 - skl.painr.use();
    dmg = dmg * def.res.ph * pn;
    if (ran < ctr_r) {
        let cpw = 1;
        let dmod = 1;
        let cbst = 1;
        if (isyou === true) {
            giveSkExp(skl.seye, 1);
            cpw = you.mods.cpwr;
            cbst = 1 + skl.war.use();
            dom.d1m.style.left = parseInt(global.special_x) + rand(-3, 3) + "px";
            dom.d1m.style.top = parseInt(global.special_y) + rand(-3, 3) + "px";
            setTimeout(() => {
                dom.d1m.style.left = parseInt(global.special_x) + "px";
                dom.d1m.style.top = parseInt(global.special_y) + "px";
            }, 60);
        } else {
            giveSkExp(skl.dngs, 1);
            sk = skl.dngs.use();
            dmod = 1 - sk * (sk > 25 ? 0.01 : 0.02);
        }
        if (dmg <= 0) dmg = 0;
        cdmg = dmg * randf(1.9 * cpw, 2.1 * cpw) * 0.5 * dmod * cbst;
        global.flags.crti = true;
        return dmg + cdmg <= 1 ? rand(1, 5) : Math.ceil((dmg + cdmg) * att.dmlt * randf(0.9, 1.1)) + rand(1, 5);
    } else return dmg > 0 ? Math.ceil(dmg * att.dmlt * randf(0.9, 1.1)) : 0;
}

function dumb(x) {
    if (x) {
        let arr = [];
        for (let m = 0; m < 5; m++) {
            arr[m] = new Object();
            arr[m].obj = addElement(document.body, "span", null, "shn");
            arr[m].obj.style.pointerEvents = "none";
            arr[m].obj.innerHTML = select(["x", "X", "*", "#", "$"]);
            arr[m].obj.style.top = -55;
            arr[m].obj.style.left = -55;
            arr[m].posx = x.clientX;
            arr[m].posy = x.clientY;
            arr[m].accx = rand(-10, 10);
            arr[m].accy = rand(15, 25);
        }
        let t = 0;
        let g = setInterval(() => {
            t++;
            for (let m = 0; m < 5; m++) {
                arr[m].obj.style.top = arr[m].posy - (arr[m].accy - t) * t * 0.4;
                arr[m].obj.style.left = arr[m].posx + arr[m].accx * t * 0.5;
                arr[m].obj.style.opacity = (30 - t) / 30;
            }
            if (t === 30) {
                clearInterval(g);
                for (let m = 0; m < 5; m++) document.body.removeChild(arr[m].obj);
            }
        }, 20);
    }
}

function mf(num, index) {
    let d = addElement(document.body, "small");
    let c = ["rgb(255, 116, 63)", "rgb(192, 192, 192)", "rgb(255, 215, 0)"];
    d.style.position = "absolute";
    d.style.opacity = 1;
    d.style.width = 100;
    d.style.top = 755;
    d.style.left = 328 - 50 * index;
    d.innerHTML =
        '<span style="color: ' + c[index - 1] + '">●</span><span style="color: rgb(255,70,70)">' + num + "</span>";
    let t = 0;
    let g = setInterval(() => {
        t++;
        d.style.top = parseInt(d.style.top) - 2 + "px";
        d.style.opacity = (30 - t) / 30;
        if (t === 30) {
            clearInterval(g);
            document.body.removeChild(d);
        }
    }, 30);
}

function hit_calc(tp) {
    if (tp === 1) {
        let agl_bonus = 0;
        let spd = global.current_m.spd > 0 ? global.current_m.spd : 0;
        for (let i = 0; i < you.eqp.length; i++) agl_bonus += you.eqp[i].agl;
        //return (200 + ((you.agl+agl_bonus)*you.efficiency()) - (global.current_m.spd+global.current_m.agl+100/(100*you.efficiency())*100));
        return (
            (((you.agl + agl_bonus / 2) * you.efficiency()) / (spd + global.current_m.agl + global.current_m.eva)) *
                130 +
            5
        );
    } else if (tp === 2) {
        let agl_bonus = 0;
        let spd = you.spd > 0 ? you.spd : 0;
        for (let i = 0; i < you.eqp.length; i++) agl_bonus += you.eqp[i].agl;
        return (global.current_m.agl / ((spd + you.agl + agl_bonus / 2) * you.efficiency())) * 100 + 10 - skl.evas.lvl;
        //return (210 + global.current_m.agl - (you.spd+you.agl+100*(100*you.efficiency())/100));
    }
}

function wpnhitstt() {
    switch (you.eqp[0].wtype) {
        case 0:
            global.stat.msts[0][0]++;
            break;
        case 1:
            global.stat.msts[1][0]++;
            break;
        case 2:
            global.stat.msts[2][0]++;
            break;
        case 3:
            global.stat.msts[3][0]++;
            break;
        case 4:
            global.stat.msts[4][0]++;
            break;
        case 5:
            global.stat.msts[5][0]++;
            break;
        case 6:
            global.stat.msts[6][0]++;
            break;
        case 7:
            global.stat.msts[7][0]++;
            break;
    }
}

function wpndiestt(killer, me) {
    switch (killer.eqp[0].wtype) {
        case 0:
            global.stat.msts[0][1]++;
            break;
        case 1:
            global.stat.msts[1][1]++;
            break;
        case 2:
            global.stat.msts[2][1]++;
            break;
        case 3:
            global.stat.msts[3][1]++;
            break;
        case 4:
            global.stat.msts[4][1]++;
            break;
        case 5:
            global.stat.msts[5][1]++;
            break;
        case 6:
            global.stat.msts[6][1]++;
            break;
        case 7:
            global.stat.msts[7][1]++;
            break;
    }
    switch (me.type) {
        case 0:
            global.stat.msks[0]++;
            break;
        case 1:
            global.stat.msks[1]++;
            break;
        case 2:
            global.stat.msks[2]++;
            break;
        case 3:
            global.stat.msks[3]++;
            break;
        case 4:
            global.stat.msks[4]++;
            break;
        case 5:
            global.stat.msks[5]++;
            break;
    }
}

function renderRcp(rcp) {
    dom.ct_bt1_1_mc = addElement(dom.ct_bt1_1, "div", null, "crf_lg");
    dom.ct_bt1_1_mc.style.position = "relative";
    this.ct_bt1_1_m = addElement(dom.ct_bt1_1_mc, "span");
    rcp._t = this.ct_bt1_1_m;
    if (typeof InstallTrigger !== "undefined") {
        this.ct_bt1_1_m.style.paddingTop = 0;
        this.ct_bt1_1_m.style.paddingBottom = 0;
    }
    this.ct_bt1_1_m.innerHTML = rcp.name;
    let test = make(rcp, true);
    let safe = false;
    if (test.y.length != rcp.rec.length || test.o[0] === 2) this.ct_bt1_1_m.style.color = "grey";
    if (dom.spcldom && rcp.id === dom.spcldom.rcp.id) {
        dom.rcpcurar = addElement(dom.ct_bt1_1_mc, "span");
        dom.rcpcurar.innerHTML = "⋗⋗";
        dom.spcldom = dom.ct_bt1_1_mc;
        dom.spcldom.rcp = rcp;
        dom.rcpcurar.style.position = "absolute";
        dom.rcpcurar.style.right = 2;
        dom.rcpcurar.style.color = "rgb(188,254,254)";
    }
    dom.ct_bt1_1_mc.addEventListener("mouseenter", function () {
        test = make(rcp, true);
        global.curr_r = rcp;
        empty(dom.ct_bt1_2);
        this.ct_bt1_2a = addElement(dom.ct_bt1_2, "div");
        this.ct_bt1_2a.innerHTML = "reagents required";
        this.ct_bt1_2a.style.textAlign = "center";
        this.ct_bt1_2a.style.borderBottom = "1px solid #3e4092";
        if (skl.crft.lvl > 0) {
            this.ct_bt1_2at = addElement(dom.ct_bt1_2, "div", "rptbn");
            if (!global.flags.rptbncgt) {
                this.ct_bt1_2at.style.backgroundColor = "#a11";
                this.ct_bt1_2at.innerHTML = "";
            } else {
                this.ct_bt1_2at.style.backgroundColor = "green";
                this.ct_bt1_2at.innerHTML = "‣";
            }
            let tm =
                5000 - (skl.crft.lvl * 350 + skl.ptnc.lvl * 150) < 300
                    ? 300
                    : 5000 - (skl.crft.lvl * 350 + skl.ptnc.lvl * 150);
            addDesc(
                this.ct_bt1_2at,
                {
                    name: "Enable Repeatable Crafting",
                    desc: function () {
                        let txt =
                            "<span style='color:magenta'>Current speed: </span><span style='color:orange'>" +
                            (tm / 1000).toFixed(2) +
                            " sec</span>";
                        return txt;
                    },
                },
                9
            );
            this.ct_bt1_2at.addEventListener("click", function () {
                if (global.flags.rptbncgt) {
                    clearInterval(timers.rptbncgt);
                    global.flags.rptbncgtf = false;
                    this.style.backgroundColor = "#a11";
                    this.innerHTML = "";
                } else {
                    this.style.backgroundColor = "green";
                    this.innerHTML = "‣";
                }
                global.flags.rptbncgt = !global.flags.rptbncgt;
            });
        }
        rcp._t2 = [];
        for (let g = 0; g < rcp.rec.length; g++) {
            this.ct_bt1_2bc = addElement(dom.ct_bt1_2, "small");
            this.ct_bt1_2bc.style.display = "flex";
            this.ct_bt1_2bc1 = addElement(this.ct_bt1_2bc, "div", null, "rgt_ics");
            this.ct_bt1_2bc2 = addElement(this.ct_bt1_2bc, "div", null, "rgt_ics");
            rcp._t2[g] = this.ct_bt1_2bc2;
            if (rcp.rec[g].item.data.dscv === true) {
                this.ct_bt1_2bc1.innerHTML = rcp.rec[g].item.name;
                addDesc(this.ct_bt1_2bc, rcp.rec[g].item);
            } else this.ct_bt1_2bc1.innerHTML = "?????????";
            this.ct_bt1_2bc1.style.paddingLeft = "8px";
            let num = 0;
            if (test.z.length > 0) num = test.z[g];
            if (test.z[g] >= rcp.rec[g].amount || test.b[g] === true) {
                this.ct_bt1_2bc2.style.color = "lime";
                num = rcp.rec[g].item.slot ? test.z[g] : rcp.rec[g].item.amount;
            } else {
                this.ct_bt1_2bc2.style.color = "grey";
                num = rcp.rec[g].item.slot ? test.z[g] : rcp.rec[g].item.amount;
            }
            let n = "";
            if (test.z[g] > 0 && rcp.rec[g].item.slot) {
                for (let r in test.r)
                    for (let b in you.eqp)
                        if (you.eqp[b].data.uid === test.r[r].data.uid && you.eqp[b].id !== 10000) {
                            n = '<small style="color:orange">[E]</small>';
                            continue;
                        }
            }
            if (test.z[g] >= rcp.rec[g].amount || test.b[g] === true) this.ct_bt1_2bc2.style.color = "lime";
            else this.ct_bt1_2bc2.style.color = "grey";
            if (rcp.rec[g].return === true) this.ct_bt1_2bc2.innerHTML = "∞";
            else this.ct_bt1_2bc2.innerHTML = rcp.rec[g].amount + " / " + num + " " + n;
            this.ct_bt1_2bc2.style.borderRight = "none";
            this.ct_bt1_2bc2.style.textAlign = "center";
        }
        this.ct_bt1_2c = addElement(dom.ct_bt1_2, "div");
        this.ct_bt1_2c.innerHTML = "output";
        this.ct_bt1_2c.style.width = "55%";
        this.ct_bt1_2c.style.position = "absolute";
        this.ct_bt1_2c.style.borderTop = "1px solid #3e4092";
        this.ct_bt1_2c.style.borderBottom = "1px solid #3e4092";
        this.ct_bt1_2c.style.bottom = 71;
        this.ct_bt1_2c.style.textAlign = "center";
        for (let g in rcp.res) {
            this.ct_bt1_2cc = addElement(dom.ct_bt1_2, "small");
            this.ct_bt1_2cc.style.display = "flex";
            this.ct_bt1_2cc.style.position = "absolute";
            this.ct_bt1_2cc.style.bottom = typeof InstallTrigger !== "undefined" ? 48 - g * 21 : 50 - g * 21;
            this.ct_bt1_2cc.style.width = "55%";
            this.ct_bt1_2cc1 = addElement(this.ct_bt1_2cc, "div", "toh", "rgt_ics");
            this.ct_bt1_2cc2 = addElement(this.ct_bt1_2cc, "div", null, "rgt_ics");
            if (rcp.allow === true) {
                this.ct_bt1_2cc1.innerHTML = rcp.res[g].item.name;
                if (!!rcp.res[g].amount_max) {
                    this.ct_bt1_2cc2.innerHTML = rcp.res[g].amount + "~" + rcp.res[g].amount_max;
                } else this.ct_bt1_2cc2.innerHTML = rcp.res[g].amount;
                addDesc(this.ct_bt1_2cc1, rcp.res[g].item);
                this.ct_bt1_2cc2.style.color = "lime";
            } else {
                this.ct_bt1_2cc1.innerHTML = "?????????";
                this.ct_bt1_2cc2.innerHTML = "???";
                this.ct_bt1_2cc2.style.color = "grey";
            }
            this.ct_bt1_2cc2.style.textAlign = "center";
            this.ct_bt1_2cc2.style.borderRight = "none";
            this.ct_bt1_2cc1.style.paddingLeft = "8px";
            this.ct_bt1_2cc2.style.width = "27.5%";
            this.ct_bt1_2cc1.style.width = "75%";
        }
        if (rcp.srect != null) {
            let l = test.o.length;
            this.ct_bt1_3c = addElement(dom.ct_bt1_2, "div");
            this.ct_bt1_3c.innerHTML = "tools needed";
            this.ct_bt1_3c.style.width = "55%";
            this.ct_bt1_3c.style.position = "absolute";
            this.ct_bt1_3c.style.borderTop = "1px solid #3e4092";
            this.ct_bt1_3c.style.borderBottom = "1px solid #3e4092";
            this.ct_bt1_3c.style.bottom = 115 + (((l - 1) / 2) << 0) * 15;
            this.ct_bt1_3c.style.textAlign = "center"; // bluh!!!
            this.ct_bt1_3cc = addElement(dom.ct_bt1_2, "small"); //this.ct_bt1_3cc.style.fontSize='.8em';
            this.ct_bt1_3cc.style.width = "55%";
            this.ct_bt1_3cc.style.position = "absolute";
            this.ct_bt1_3cc.style.top = 250 - (((l - 1) / 2) << 0) * 15;
            this.ct_bt1_3cc.style.textAlign = "left";
            this.ct_bt1_3cc.style.left = "255px";
            if (l > 1) {
                for (let nu in test.o) {
                    if (test.o[nu] === 1)
                        this.ct_bt1_3cc.innerHTML +=
                            '<span style="color:lime">' + rcp.srect[nu] + "</span>" + (l - 1 == nu ? "" : ", ");
                    else if (test.o[nu] === 2)
                        this.ct_bt1_3cc.innerHTML +=
                            '<span style="color:red">' + rcp.srect[nu] + "</span>" + (l - 1 == nu ? "" : ", ");
                }
            } else {
                if (test.o[0] === 1) this.ct_bt1_3cc.style.color = "lime";
                else if (test.o[0] === 2) this.ct_bt1_3cc.style.color = "red";
                this.ct_bt1_3cc.innerHTML += rcp.srect[0];
            }
        }
    });
    dom.ct_bt1_1_mc.addEventListener("mouseenter", function () {
        if (dom.rcpcurar) dom.spcldom.removeChild(dom.rcpcurar);
        dom.rcpcurar = addElement(this, "span");
        dom.rcpcurar.innerHTML = "⋗⋗";
        dom.spcldom = this;
        dom.spcldom.rcp = rcp;
        dom.rcpcurar.style.position = "absolute";
        dom.rcpcurar.style.right = 2;
        dom.rcpcurar.style.color = "rgb(188,254,254)";
    });
    dom.ct_bt1_1_mc.addEventListener("click", function () {
        test = make(rcp, true);
        if (rcp.rec.length === test.y.length && test.o[0] !== 2) safe = true;
        if (global.flags.rptbncgt) {
            _fcraft(rcp, safe);
            global.crrpsat = rcp;
            clearInterval(timers.rptbncgt);
            global.flags.rptbncgtf = true;
            if (safe)
                timers.rptbncgt = setInterval(
                    () => {
                        _fcraft(global.crrpsat, safe);
                        giveSkExp(skl.ptnc, 0.05);
                        refreshRcp(global.curr_r);
                    },
                    5000 - (skl.crft.lvl * 350 + skl.ptnc.lvl * 150) < 300
                        ? 300
                        : 5000 - (skl.crft.lvl * 350 + skl.ptnc.lvl * 150)
                );
        } else _fcraft(rcp, safe);
        refreshRcp(rcp);
    });
}

function refreshRcp(fl) {
    if (global.rm === 0 || !global.rm) {
        for (let a in global.rec_d) _refreshRcpCnt(global.rec_d[a], global.rec_d[a]._t);
    } else {
        for (let a in global.srcp) _refreshRcpCnt(global.srcp[a], global.srcp[a]._t);
    }
    let t2 = fl._t2;
    let test = make(fl, true);
    for (let g in fl.rec) {
        if (!t2) break;
        let n = "";
        if (test.z[g] > 0 && fl.rec[g].item.slot) {
            for (let r in test.r)
                for (let b in you.eqp)
                    if (you.eqp[b].data.uid === test.r[r].data.uid && you.eqp[b].id !== 10000) {
                        n = '<small style="color:orange">[E]</small>';
                        continue;
                    }
        }
        let num = 0;
        if (test.z.length > 0) num = test.z[g];
        if (test.z[g] >= fl.rec[g].amount || test.b[g] === true) {
            t2[g].style.color = "lime";
            num = fl.rec[g].item.slot ? test.z[g] : fl.rec[g].item.amount;
        } else {
            t2[g].style.color = "grey";
            num = fl.rec[g].item.slot ? test.z[g] : fl.rec[g].item.amount;
        }
        t2[g].innerHTML = fl.rec[g].amount + " / " + num + " " + n;
    }
}

function _refreshRcpCnt(r, t, t2) {
    let test = make(r, true);
    if (test.y.length != r.rec.length || test.o[0] === 2) t.style.color = "grey";
    else t.style.color = "rgb(188,254,254)";
}

function _fcraft(what, safe) {
    if (safe) {
        safe = false;
        if (global.flags.sleepmode === true) {
            msg("You may want to wake up first", "red");
            return;
        }
        if (global.flags.btl === true) {
            msg("You're too busy fighting", "red");
            return;
        }
        if (global.flags.rdng === true) {
            msg("You're too occupied with reading", "red");
            return;
        }
        if (global.flags.busy === true) {
            msg("You're too busy with something else", "red");
            return;
        }
        let ntest = make(what, true);
        for (let g = 0; g < what.rec.length; g++) {
            if (what.rec.length === ntest.y.length && ntest.o[0] !== 2) safe = true;
        }
        if (safe) {
            make(what);
            global.stat.crftt++;
            iftrunkopen(1);
        } else {
            if (global.flags.rptbncgtf) {
                clearInterval(timers.rptbncgt);
                global.flags.rptbncgtf = false;
            }
        }
    }
}

function renderSkl(skl) {
    this.skwmmc = addElement(dom.skcon, "div", null, "skwmmc");
    addDesc(this.skwmmc, skl, 6);
    this.skwmm1 = addElement(this.skwmmc, "small");
    if (skl.sp) this.skwmm1.style.fontSize = skl.sp;
    this.skwmm1.style.width = "32%";
    this.skwmm1.innerHTML = skl.name + " lvl: " + skl.lvl;
    this.skwmm1.style.borderRight = "1px solid #46a";
    this.skwmm2 = addElement(this.skwmmc, "small");
    this.skwmm2.innerHTML = "　exp: " + formatw(Math.round(skl.exp)) + "/" + formatw(skl.expnext_t) + "　";
    this.skwmm2.style.borderRight = "1px solid #46a";
    this.skwmm2.style.fontSize = ".8em";
    this.skwmm2.style.width = "170px";
    this.skwmm3c = addElement(this.skwmmc, "div");
    this.skwmm3 = addElement(this.skwmm3c, "div");
    this.skwmm3c.style.width = "197px";
    this.skwmm3.innerHTML = "　";
    this.skwmm3.style.marginLeft = "2px";
    this.skwmm3.style.width = (skl.exp / skl.expnext_t) * 100 + "%";
    //if(skl.lastupd&&skl.lastupd-time.minute>=1) this.skwmm3.style.backgroundColor='limegreen'; else this.skwmm3.style.backgroundColor='yellow';
    this.skwmm3.style.backgroundColor = "yellow";
}

function area_init(area) {
    if (area.size !== 0) {
        if (area.id !== 101) {
            let rnd = random();
            for (let obj in area.pop)
                if (rnd >= area.popc[obj][0] && rnd <= area.popc[obj][1])
                    if (!area.pop[obj].cond || area.pop[obj].cond() === true) {
                        global.flags.civil = false;
                        global.flags.btl = true;
                        global.current_z = area;
                        let temp = area.pop[obj];
                        let newobj = temp.crt.id === creature.default.id ? creature.default : mon_gen(temp.crt);
                        lvlup(newobj, rand(temp.lvlmin - 1, temp.lvlmax - 1));
                        //newobj.data.lasthp=newobj.hp;
                        global.current_m = newobj;
                        update_m();
                        dom.d5_1_1m.update();
                        if (!!dom.d7m) dom.d7m.update(); //dom.d5m.update();
                        return newobj;
                    } else area_init(area);
        }
    } else msg("nobody's here");
    if (!!dom.d7m) dom.d7m.update();
    update_m();
    dom.d5_1_1m.update();
}

function mon_gen(crt) {
    crt.eff = [];
    global.e_em = [];
    empty(dom.d101m);
    let newobj = copy(crt);
    newobj.drop = crt.drop;
    if (!global.flags.inside) {
        if (global.flags.israin) giveEff(newobj, effect.wet, 5);
        if (global.flags.iscold) giveEff(newobj, effect.cold, 25);
    }
    newobj.sex = random() < 0.5;
    return newobj;
}

function giveEff(target, e, d, y, z) {
    if (target.id !== 0) {
        let ef = e;
        if (target.id !== you.id) {
            ef = new Object();
            for (let g in e) ef[g] = e[g];
        }
        if (target.id === you.id || global.flags.btl) {
            let p = findbyid(target.eff, e.id);
            if (!p || !p.active) {
                if (d) ef.duration = d;
                ef.y = y;
                ef.z = z;
                if (ef.x) eff_d(ef, ef.x, ef.c, ef.b, target);
                ef.target = target;
                target.eff.push(ef);
            }
            ef.onGive(d, y, z);
            ef.active = true;
        }
        effdfix();
        target.stat_r();
        return e;
    }
}

function removeEff(e, t) {
    if (e.active === true) {
        if (e.x) {
            if (e.target.id === you.id) {
                node = global.e_e.indexOf(e);
                dom.d101.removeChild(dom.d101.children[node]);
                global.e_e.splice(node, 1);
                if (dom.d101.children.length > you.eff.length) empty(dom.d101);
            } else {
                node = global.e_em.indexOf(e);
                dom.d101m.removeChild(dom.d101m.children[node]);
                global.e_em.splice(node, 1);
                if (dom.d101m.children.length > e.target.eff.length) empty(dom.d101m);
            }
            e.onRemove();
            global.dscr.style.display = "none";
        }
        e.target.eff.splice(e.target.eff.indexOf(e), 1);
        e.active = false;
        clearInterval(timers.inup);
        effdfix();
    }
    e.target.stat_r();
}

function effdfix() {
    if (you.eff.length >= 21) {
        dom.d7.style.height = 104;
        for (let i = 0; i < document.getElementsByClassName("se_ia").length; i++)
            document.getElementsByClassName("se_ia")[i].style.display = "inline-block";
        document.getElementById("se_i").style.display = "block";
    } else {
        dom.d7.style.height = 125;
        for (let i = 0; i < document.getElementsByClassName("se_ia").length; i++)
            document.getElementsByClassName("se_ia")[i].style.display = "";
        document.getElementById("se_i").style.display = "flex";
    }
}

function eff_d(e, s, c, b, tgt) {
    if (tgt.id === you.id) {
        let ic = addElement(dom.d101, "div", null, "se_ia");
        ic.innerHTML = s;
        ic.style.color = c;
        ic.style.backgroundColor = b;
        ic.addEventListener("click", () => {
            e.onClick();
        });
        addDesc(ic, e, 4, e.name, e.desc);
        if (e.duration !== 0) global.e_e.push(e);
    } else {
        let ic = addElement(dom.d101m, "div", null, "se_ia");
        ic.innerHTML = s;
        ic.style.color = c;
        ic.style.backgroundColor = b;
        addDesc(ic, e, 4, e.name, e.desc);
        if (e.duration !== 0) global.e_em.push(e);
    }
}

function equip(w, flags) {
    if (!w.data || !w.data.uid) return;
    if (w.data.uid === you.eqp[w.slot - 1].data.uid) {
        unequip(w, { save: true });
        if (w.twoh === true) {
            dom.d7_slot_2.innerHTML = "Shield";
            dom.d7_slot_2.style.color = "grey";
        }
        isort(global.sm);
    } else {
        if (w.req && !w.req() && !global.flags.loadstate) {
            msg("Requirenments not met!", "red");
            return;
        }
        /*switch(w.slot){
      case 5 :{
        if(you.eqp[4].id===10000) you.eqp[4]=w; else if(you.eqp[5].id===10000) {you.eqp[5]=w;w.slot=6} else {unequip(you.eqp[4]);you.eqp[4]=w}
      } break;
      case 6 :{
        if(you.eqp[5].id===10000) you.eqp[5]=w; else if(you.eqp[4].id===10000) {you.eqp[4]=w;w.slot=5} else {unequip(you.eqp[5]);you.eqp[5]=w}
      } break;
    default: {unequip(you.eqp[w.slot-1]); you.eqp[w.slot-1] = w;}; break
    }*/ unequip(you.eqp[w.slot - 1]);
        you.eqp[w.slot - 1] = w;
        if (w.twoh === true) {
            if (you.eqp[1].id !== 10000) unequip(you.eqp[1]);
        } else if (you.eqp[1].id !== 10000 && you.eqp[0].twoh === true) unequip(you.eqp[0]);
        if (w.eff.length > 0)
            for (let k = 0; k < w.eff.length; k++) {
                w.eff[k].use(w.eff[k].y, w.eff[k].z);
                giveEff(you, w.eff[k]);
            }
        w.oneq();
        if (w.degrade) planner.itmwear.data.items.push(w);
        if (w.slot === 1) you.atkmode = w.atkmode;
        w.wc = global.text.wecs[w.rar][0]; //w.wbc=global.text.wecs[w.rar][1];
        let spst;
        switch (w.rar) {
            case 2:
                spst = "0px 0px 2px blue";
                break;
            case 3:
                spst = "0px 0px 2px lime";
                break;
            case 4:
                spst = "0px 0px 3px orange";
                break;
            case 5:
                spst = "0px 0px 2px crimson,0px 0px 5px red";
                break;
            case 6:
                spst = "1px 1px 1px black,0px 0px 2px purple";
                break;
        }
        switch (w.slot - 1) {
            case 0:
                {
                    dom.d7_slot_1.removeAttribute("style");
                    dom.d7_slot_1.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_1.style.color = w.wc;
                        dom.d7_slot_1.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_1.style.backgroundColor = w.wbc;
                }
                break;
            case 1:
                {
                    dom.d7_slot_2.removeAttribute("style");
                    dom.d7_slot_2.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_2.style.color = w.wc;
                        dom.d7_slot_2.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_2.style.backgroundColor = w.wbc;
                }
                break;
            case 2:
                {
                    dom.d7_slot_3.removeAttribute("style");
                    dom.d7_slot_3.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_3.style.color = w.wc;
                        dom.d7_slot_3.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_3.style.backgroundColor = w.wbc;
                }
                break;
            case 3:
                {
                    dom.d7_slot_4.removeAttribute("style");
                    dom.d7_slot_4.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_4.style.color = w.wc;
                        dom.d7_slot_4.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_4.style.backgroundColor = w.wbc;
                }
                break;
            case 4:
                {
                    dom.d7_slot_5.removeAttribute("style");
                    dom.d7_slot_5.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_5.style.color = w.wc;
                        dom.d7_slot_5.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_5.style.backgroundColor = w.wbc;
                }
                break;
            case 5:
                {
                    dom.d7_slot_6.removeAttribute("style");
                    dom.d7_slot_6.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_6.style.color = w.wc;
                        dom.d7_slot_6.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_6.style.backgroundColor = w.wbc;
                }
                break;
            case 6:
                {
                    dom.d7_slot_7.removeAttribute("style");
                    dom.d7_slot_7.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_7.style.color = w.wc;
                        dom.d7_slot_7.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_7.style.backgroundColor = w.wbc;
                }
                break;
            case 7:
                {
                    dom.d7_slot_8.removeAttribute("style");
                    dom.d7_slot_8.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_8.style.color = w.wc;
                        dom.d7_slot_8.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_8.style.backgroundColor = w.wbc;
                }
                break;
            case 8:
                {
                    dom.d7_slot_9.removeAttribute("style");
                    dom.d7_slot_9.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_9.style.color = w.wc;
                        dom.d7_slot_9.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_9.style.backgroundColor = w.wbc;
                }
                break;
            case 9:
                {
                    dom.d7_slot_10.removeAttribute("style");
                    dom.d7_slot_10.innerHTML = you.eqp[w.slot - 1].name;
                    if (!!w.wc) {
                        dom.d7_slot_10.style.color = w.wc;
                        dom.d7_slot_10.style.textShadow = spst;
                    }
                    if (!!w.wbc) dom.d7_slot_10.style.backgroundColor = w.wbc;
                }
                break;
        }
        if (w.twoh === true) {
            dom.d7_slot_2.innerHTML = you.eqp[0].name;
            dom.d7_slot_2.removeAttribute("style");
            dom.d7_slot_2.style.color = "lightgrey";
        } else {
            if (you.eqp[1].id === 10000) {
                dom.d7_slot_2.innerHTML = "Shield";
                dom.d7_slot_2.removeAttribute("style");
                dom.d7_slot_2.style.color = "grey";
            }
        }
        if (!flags || !flags.save) {
            you.stat_r();
            update_d();
            isort(global.sm);
        }
    }
}

function unequip(w, flags) {
    if (!w.data || !w.data.uid) return;
    if (w.eff.length > 0)
        for (let k = 0; k < w.eff.length; k++) {
            w.eff[k].un();
            removeEff(w.eff[k]);
        }
    w.onuneq();
    you.eqp[w.slot - 1] = eqp.dummy;
    if (w.degrade) planner.itmwear.data.items.splice(planner.itmwear.data.items.indexOf(w), 1);
    switch (w.slot - 1) {
        case 0:
            {
                dom.d7_slot_1.innerHTML = "Weapon";
                dom.d7_slot_1.removeAttribute("style");
                dom.d7_slot_1.style.color = "grey";
                you.eqp[0].cls[2] = (you.lvl / 5) << 0;
                you.eqp[0].aff[0] = (you.lvl / 8) << 0;
                you.eqp[0].ctype = 2;
            }
            break;
        case 1:
            {
                dom.d7_slot_2.innerHTML = "Shield";
                dom.d7_slot_2.removeAttribute("style");
                dom.d7_slot_2.style.color = "grey";
            }
            break;
        case 2:
            {
                dom.d7_slot_3.innerHTML = "Head";
                dom.d7_slot_3.removeAttribute("style");
                dom.d7_slot_3.style.color = "grey";
            }
            break;
        case 3:
            {
                dom.d7_slot_4.innerHTML = "Body";
                dom.d7_slot_4.removeAttribute("style");
                dom.d7_slot_4.style.color = "grey";
            }
            break;
        case 4:
            {
                dom.d7_slot_5.innerHTML = "L arm";
                dom.d7_slot_5.removeAttribute("style");
                dom.d7_slot_5.style.color = "grey";
            }
            break;
        case 5:
            {
                dom.d7_slot_6.innerHTML = "R arm";
                dom.d7_slot_6.removeAttribute("style");
                dom.d7_slot_6.style.color = "grey";
            }
            break;
        case 6:
            {
                dom.d7_slot_7.innerHTML = "Legs";
                dom.d7_slot_7.removeAttribute("style");
                dom.d7_slot_7.style.color = "grey";
            }
            break;
        case 7:
            {
                dom.d7_slot_8.innerHTML = "Accessory";
                dom.d7_slot_8.removeAttribute("style");
                dom.d7_slot_8.style.color = "grey";
            }
            break;
        case 8:
            {
                dom.d7_slot_9.innerHTML = "Accessory";
                dom.d7_slot_9.removeAttribute("style");
                dom.d7_slot_9.style.color = "grey";
            }
            break;
        case 9:
            {
                dom.d7_slot_10.innerHTML = "Accessory";
                dom.d7_slot_10.removeAttribute("style");
                dom.d7_slot_10.style.color = "grey";
            }
            break;
    }
    if (!flags || !flags.save) {
        you.stat_r();
        update_d();
    }
}

function eqpres() {
    dom.d7_slot_1.innerHTML = "Weapon";
    dom.d7_slot_1.removeAttribute("style");
    dom.d7_slot_1.style.color = "grey";
    dom.d7_slot_2.innerHTML = "Shield";
    dom.d7_slot_2.removeAttribute("style");
    dom.d7_slot_2.style.color = "grey";
    dom.d7_slot_3.innerHTML = "Head";
    dom.d7_slot_3.removeAttribute("style");
    dom.d7_slot_3.style.color = "grey";
    dom.d7_slot_4.innerHTML = "Body";
    dom.d7_slot_4.removeAttribute("style");
    dom.d7_slot_4.style.color = "grey";
    dom.d7_slot_5.innerHTML = "L arm";
    dom.d7_slot_5.removeAttribute("style");
    dom.d7_slot_5.style.color = "grey";
    dom.d7_slot_6.innerHTML = "R arm";
    dom.d7_slot_6.removeAttribute("style");
    dom.d7_slot_6.style.color = "grey";
    dom.d7_slot_7.innerHTML = "Legs";
    dom.d7_slot_7.removeAttribute("style");
    dom.d7_slot_7.style.color = "grey";
    dom.d7_slot_8.innerHTML = "Accessory";
    dom.d7_slot_8.removeAttribute("style");
    dom.d7_slot_8.style.color = "grey";
    //    dom.d7_slot_9.innerHTML = 'Accessory';dom.d7_slot_9.removeAttribute('style');dom.d7_slot_9.style.color='grey'
    //    dom.d7_slot_10.innerHTML = 'Accessory';dom.d7_slot_10.removeAttribute('style');dom.d7_slot_10.style.color='grey'
}

function giveRcp(rcp) {
    if (!global.flags.asbu) {
        global.flags.asbu = true;
        dom.ct_bt1.innerHTML = "assemble";
    }
    if (rcp.have === false) {
        global.rec_d.push(rcp);
        rcp.have = true;
        if (global.lw_op === 1) rsort(global.rm);
        msg("New blueprint unlocked: ", "cyan");
        msg_add('"' + rcp.name + '"', "orange");
        return 1;
    } else return 0;
}

function giveWealth(val, mes, f) {
    if (you.mods.wthexrt !== 0 && f) val += 1;
    you.wealth += val;
    global.stat.moneyg += val;
    for (let x in global.monchk) global.monchk[x]();
    if (!global.stat.mndrgnu && you.wealth >= 100000000) {
        global.stat.mndrgnu = true;
        appear(dom.mn_1);
    }
    m_update();
    giveSkExp(skl.gred, val * 0.01);
    if (mes !== false) {
        msg("+", "gold");
        if (val >= GOLD) msg_add(" ●" + ((val / GOLD) << 0), "rgb(255, 215, 0)");
        if (val >= SILVER && val % GOLD >= SILVER) msg_add(" ●" + ((val / SILVER) % SILVER << 0), "rgb(192, 192, 192)");
        if (val < SILVER || (val > SILVER && val % SILVER > 0))
            msg_add(" ●" + (val % SILVER << 0), "rgb(255, 116, 63)");
    }
    recshop();
}

function spend(m) {
    if (you.wealth < m) return;
    you.wealth -= m;
    global.stat.moneysp += m;
    m_update();
}

function giveItem(obj, am, ignore, flag) {
    am = am || 1;
    if (!!obj.slot) {
        let nitm;
        for (let p = 0; p < am; p++) {
            obj.new = true;
            obj.data.uid = ++global.uid;
            let tmp = obj;
            obj.data.dscv = true;
            obj.have = true;
            nitm = copy(obj);
            nitm.data = deepCopy(obj.data);
            nitm.eff = tmp.eff;
            if (tmp.dss) nitm.dss = tmp.dss;
            inv.push(nitm);
            msg('New item obtained: <span style="color:coral">' + nitm.name + "</span>", "cyan", obj);
            obj.onGet();
            if (global.sm === nitm.stype) global.sinv.push(nitm);
            if (nitm.stype === global.sm || global.sm === 1) renderItem(nitm);
            let g = (obj.id / 10000) << 0;
            if (!scan(dar[g], obj.id)) dar[g].push(obj.id);
            if (flag && flag.fl) iftrunkopen(1);
            else iftrunkopenc(1);
            if (!global.flags.loadstate && !ignore) global.stat.igtttl += am;
        }
        return nitm;
    }
    if (!obj.have) {
        obj.new = true;
        if (global.flags.blken === true) {
            global.spnew++;
            clearInterval(timers.nsblk);
            timers.nsblk = setInterval(function () {
                let a = document.querySelectorAll(".blinks");
                let g = a.length;
                for (let i = 0; i < g; i++) a[i].style.opacity = global.vsnew / 10;
                if (--global.vsnew < 0) global.vsnew = 10;
            }, 100);
        }
        obj.have = true;
        obj.data.dscv = true;
        inv.push(obj);
        obj.amount += am;
        msg(
            'New item obtained: <span style="color:coral">' +
                obj.name +
                '</span><span style="color:lime"> x' +
                am +
                "</span>",
            "cyan",
            obj
        );
        obj.onGet();
        if (global.sm === obj.stype) global.sinv.push(obj);
        if (obj.stype === global.sm || global.sm === 1) renderItem(obj);
    } else {
        obj.amount += am;
        msg(
            'Item Acquired: <span style="color:chartreuse">' +
                obj.name +
                '</span><span style="color:lime"> x' +
                am +
                "</span>",
            "cyan",
            obj
        );
        if (global.sm === 1) updateInv(inv.indexOf(obj));
        else if (global.sm === obj.stype) updateInv(global.sinv.indexOf(obj));
        obj.onGet();
    }
    let g = (obj.id / 10000) << 0;
    if (!scan(dar[g], obj.id)) dar[g].push(obj.id);
    if (obj.multif) for (let a = 0; a < am; a++) obj.multif();
    if (obj.rot) {
        let thave = false;
        for (let a in planner.imorph.data.items)
            if (planner.imorph.data.items[a].id === obj.id) {
                thave = true;
                break;
            }
        if (!thave) {
            planner.imorph.data.items.push(obj);
            obj.data.rottil = 0;
        }
    }
    if (flag && !flag.fi && flag.fl) iftrunkopen(1);
    else iftrunkopenc(1);
    if (!global.flags.loadstate && !ignore) global.stat.igtttl += am;
    return obj;
}

function listen_k(e) {
    global.keytarget = e.target;
    if (e.which === 46) {
        for (let obj in global.shortcuts)
            if (global.shortcuts[obj][0] === global.keyobj.data.skey)
                global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obj]), 1);
        global.keytarget.children[0].innerHTML = global.keyobj.name;
        global.keyobj.data.skey = null;
    } else if ((e.which >= 47 && e.which <= 90) || (e.which >= 96 && e.which <= 105)) {
        global.keytarget.children[0].innerHTML =
            global.keyobj.name + "<small> {" + String.fromCharCode(global.keyobj.data.skey) + "}</small>";
        if (global.keyobj.data.skey > 0 && e.which !== global.keyobj.data.skey) {
            for (let obje in global.shortcuts) {
                if (global.shortcuts[obje][2].data.skey === global.keyobj.data.skey) {
                    global.shortcuts[obje][2].data.skey = null;
                    global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obje]), 1);
                }
            }
        }
        let tg;
        for (let obj in global.shortcuts) {
            if (e.which === global.shortcuts[obj][0]) {
                global.shortcuts[obj][2].data.skey = null;
                global.shortcuts.splice(global.shortcuts.indexOf(global.shortcuts[obj]), 1);
            }
        }
        global.keyobj.data.skey = e.which;
        global.shortcuts.push([e.which, global.keyobj.id, global.keyobj]);
        global.shortcuts[global.shortcuts.length - 1][2].data.skey = e.which;
        isort(global.sm);
    }
}

document.body.addEventListener("keydown", function (e) {
    if (global.flags.kfocus !== true) {
        for (let obj in global.shortcuts)
            if (e.which === global.shortcuts[obj][0]) {
                g = global.shortcuts[obj][2];
                if (g.amount > 0 || !!g.slot) {
                    g.use();
                    reduce(g);
                    iftrunkopenc(1);
                    if (g.id < 3000 && !g.data.tried) {
                        g.data.tried = true;
                        global.stat.ftried += 1;
                    }
                    break;
                }
            }
    }
    if (!global.flags.shifton && (e.which === 69 || e.which === 16)) {
        global.flags.shifton = true;
        global.kkey = 1;
        descsinfo(global.shiftid);
    }
});

document.body.addEventListener("keyup", function (e) {
    if (e.which === 69 || e.which === 16) {
        global.flags.shifton = false;
        if (dom.dscshe) dom.dscshe.innerHTML = "";
        global.kkey = -1;
    }
});

function descsinfo(id) {
    if (id === 100)
        if (global.shiftitem.item.rot && you.mods.survinf > 0) {
            let itm = global.shiftitem.item;
            let ds, rs, dt, rt, c;
            switch (you.mods.survinf) {
                case 1:
                    ds = Math.ceil(itm.amount * ((itm.rot[2] + itm.rot[3]) / 2));
                    rs = itm.data.rottil;
                    dt = "";
                    rt = "";
                    c = "";
                    if (ds < 5) dt = "a couple";
                    else if (ds < 10) dt = "a few";
                    else if (ds < 30) dt = "some";
                    else if (ds < 50) dt = "multiple";
                    else if (ds < 100) dt = "dozens";
                    else dt = "many";
                    if (rs < 0.1) {
                        rt = "very fresh";
                        c = "lime";
                    } else if (rs < 0.2) {
                        rt = "fresh";
                        c = "limegreen";
                    } else if (rs < 0.5) {
                        rt = "like it's reaching midlife";
                        c = "yellow";
                    } else if (rs < 0.75) {
                        rt = "will go bad soon";
                        c = "grey";
                    } else if (rs < 1) {
                        rt = "are almost decayed";
                        c = "red";
                    }
                    if (rs < 0.5)
                        dom.dscshe.innerHTML =
                            dom.dseparator +
                            '<span style="color:orange">This food looks <span style="color:' +
                            c +
                            '">' +
                            rt +
                            "</span>";
                    else
                        dom.dscshe.innerHTML =
                            dom.dseparator +
                            '<span style="color:orange"><span style="color:cyan">' +
                            dt +
                            '</span> units of this item <span style="color:' +
                            c +
                            '">' +
                            rt +
                            "</span></span>";
                    break;
                case 2:
                    ds = Math.ceil(itm.amount * ((itm.rot[2] + itm.rot[3]) / 2));
                    rs = Math.ceil((1 - itm.data.rottil) / ((itm.rot[0] + itm.rot[1]) / 2));
                    dom.dscshe.innerHTML =
                        dom.dseparator +
                        '<span style="color:orange">Upon examination, about <span style="color:cyan">' +
                        ds +
                        '</span> units of this item will decay in approximately <span style="color:yellow">' +
                        rs +
                        "</span> days</span>";
                    break;
            }
            dom.dscshe.style.paddingTop = 20;
        }
}

function renderItem(obj) {
    let inv_slot_c = addElement(dom.inv_con, "div", null, "noout");
    let inv_slot = addElement(inv_slot_c, "div", null, "inv_slot noout");
    /*switch(obj.wtype){
    case 1:var z= icon(inv_slot,2,1,18,18);z.style.paddingRight=2;break;
    case 2:var z= icon(inv_slot,4,1,18,18);z.style.paddingRight=2;break;
    case 3:var z= icon(inv_slot,3,1,18,18);z.style.paddingRight=2;break;
  }*/
    let inv_name = addElement(inv_slot, "span");
    inv_name.innerHTML = obj.name;
    if (!!obj.data.skey) inv_name.innerHTML += "<small> {" + String.fromCharCode(obj.data.skey) + "}</small>";
    if (obj.new === true)
        inv_name.innerHTML +=
            '<small style="font-size:.65em;color: yellow;position:absolute" class="blinks">　new</small>';
    inv_slot_c.addEventListener("mouseenter", function () {
        global.keyobj = obj;
        inv_slot.tabIndex = 0;
        inv_slot.focus();
        inv_slot.addEventListener("keydown", listen_k);
        global.flags.kfocus = true;
        if (obj.important === false && obj.slot) {
            dom.inv_del = addElement(inv_slot_c, "span", null, "del_b");
            dom.inv_del.innerHTML = "x";
            addDesc(
                dom.inv_del,
                null,
                2,
                "Throw away",
                'Deletes <span style="color:cyan">"' + obj.name + '"</span> permanently'
            );
            dom.inv_del.addEventListener("click", () => {
                if (obj.data.uid === you.eqp[obj.slot - 1].data.uid) {
                    let prm = addElement(document.body, "div");
                    prm.style.backgroundColor = "grey";
                    prm.style.width = document.body.clientWidth;
                    prm.style.height = document.body.clientHeight;
                    prm.style.position = "absolute";
                    prm.style.left = 0;
                    prm.style.top = 0;
                    prm.style.opacity = 0.4;
                    let prm2 = addElement(document.body, "div");
                    prm2.style.position = "absolute";
                    prm2.style.top = document.body.clientHeight / 2 - 40;
                    prm2.style.left = 1300 / 2 - 195;
                    prm2.style.width = 390;
                    prm2.style.height = 80;
                    prm2.style.border = "4px black solid";
                    prm2.style.padding = 5;
                    prm2.style.backgroundColor = "lightgrey";
                    let pin = addElement(prm2, "div");
                    pin.style.height = 32;
                    pin.innerHTML = 'Really destroy "' + obj.name + '"?';
                    pin.style.textAlign = "center";
                    pin.style.width = "100%";
                    pin.style.borderBottom = "2px solid black";
                    pin.style.paddingTop = 10;
                    let pcon = addElement(prm2, "div");
                    pcon.style.display = "flex";
                    pcon.style.textAlign = "center";
                    pcon.style.backgroundColor = "darkgrey";
                    let phai = addElement(pcon, "div");
                    phai.style.width = "50%";
                    phai.innerHTML = "YES";
                    phai.style.paddingTop = 9;
                    phai.style.paddingBottom = 9;
                    let piie = addElement(pcon, "div");
                    piie.style.width = "50%";
                    piie.innerHTML = "NO";
                    piie.style.paddingTop = 9;
                    piie.style.paddingBottom = 9;
                    phai.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#666";
                    });
                    piie.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#666";
                    });
                    phai.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "darkgrey";
                    });
                    piie.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "darkgrey";
                    });
                    phai.addEventListener("click", () => {
                        giveSkExp(skl.rccln, 2 ** obj.rar * 5 - 9.5);
                        giveSkExp(skl.thr, 0.5);
                        global.stat.thrt++;
                        removeItem(obj);
                        document.body.removeChild(prm);
                        document.body.removeChild(prm2);
                    });
                    piie.addEventListener("click", () => {
                        document.body.removeChild(prm);
                        document.body.removeChild(prm2);
                    });
                } else {
                    giveSkExp(skl.rccln, 2 ** obj.rar * 5 - 9.5);
                    removeItem(obj);
                    giveSkExp(skl.thr, 0.5);
                    global.stat.thrt++;
                    empty(global.dscr);
                }
            });
        }
        if (obj.slot === 5 || obj.slot === 6) {
            dom.eq_l = addElement(inv_slot_c, "small", null, "eq_l");
            dom.eq_l.innerHTML = "L";
            addDesc(dom.eq_l, obj);
            dom.eq_l.addEventListener("click", () => {
                if (obj.data.uid !== you.eqp[4].data.uid && obj.data.uid !== you.eqp[5].data.uid) {
                    obj.slot = 5;
                    equip(obj);
                } else if (obj.data.uid !== you.eqp[4].data.uid && obj.data.uid === you.eqp[5].data.uid) {
                    unequip(obj);
                    obj.slot = 5;
                    equip(obj);
                } else {
                    unequip(obj);
                    dom.eq_l.style.backgroundColor = "royalblue";
                    this.children[0].removeChild(this.children[0].lastChild);
                }
            });
            if (obj.data.uid === you.eqp[4].data.uid) dom.eq_l.style.backgroundColor = "crimson";
            dom.eq_r = addElement(inv_slot_c, "small", null, "eq_r");
            dom.eq_r.innerHTML = "R";
            addDesc(dom.eq_r, obj);
            dom.eq_r.addEventListener("click", () => {
                if (obj.data.uid !== you.eqp[4].data.uid && obj.data.uid !== you.eqp[5].data.uid) {
                    obj.slot = 6;
                    equip(obj);
                } else if (obj.data.uid === you.eqp[4].data.uid && obj.data.uid !== you.eqp[5].data.uid) {
                    unequip(obj);
                    obj.slot = 6;
                    equip(obj);
                } else {
                    unequip(obj);
                    dom.eq_r.style.backgroundColor = "royalblue";
                    this.children[0].removeChild(this.children[0].lastChild);
                }
            });
            if (obj.data.uid === you.eqp[5].data.uid) dom.eq_r.style.backgroundColor = "crimson";
        }
        if (obj.dss && item.toolbx.have) {
            dom.inv_dss = addElement(inv_slot_c, "span", null, "dss_b");
            dom.inv_dss.innerHTML = "∥";
            if (!obj.slot) dom.inv_dss.style.left = 242;
            else if (obj.slot === 5 || obj.slot === 6) dom.inv_dss.style.left = 208;
            let t = "";
            for (let a in obj.dss) {
                let am = obj.dss[a].amount;
                if (obj.dss[a].q) am = (am + am * (obj.dss[a].q * skl.dssmb.lvl)) << 0;
                if (obj.dss[a].max) if (am > obj.dss[a].max) am = obj.dss[a].max;
                let c = 1;
                if (obj.slot) c = obj.dp / obj.dpmax;
                am = Math.ceil(am / (2 - c));
                t +=
                    '<br><span style="color:orange">' +
                    obj.dss[a].item.name +
                    ': <span style="color:' +
                    (obj.dss[a].max && obj.dss[a].max === am ? "lime" : "lightblue") +
                    '">' +
                    am +
                    "</span></span>";
            }
            addDesc(
                dom.inv_dss,
                null,
                2,
                "Disassemble",
                'Deconstruct <span style="color:cyan">"' + obj.name + '"</span> into:<br>' + t
            );
            dom.inv_dss.addEventListener("click", () => {
                if (obj.slot && obj.data.uid === you.eqp[obj.slot - 1].data.uid) {
                    let prm = addElement(document.body, "div");
                    prm.style.backgroundColor = "grey";
                    prm.style.width = document.body.clientWidth;
                    prm.style.height = document.body.clientHeight;
                    prm.style.position = "absolute";
                    prm.style.left = 0;
                    prm.style.top = 0;
                    prm.style.opacity = 0.4;
                    let prm2 = addElement(document.body, "div");
                    prm2.style.position = "absolute";
                    prm2.style.top = document.body.clientHeight / 2 - 40;
                    prm2.style.left = 1300 / 2 - 195;
                    prm2.style.width = 390;
                    prm2.style.height = 90;
                    prm2.style.border = "4px black solid";
                    prm2.style.padding = 5;
                    prm2.style.backgroundColor = "lightgrey";
                    let pin = addElement(prm2, "div");
                    pin.style.height = 42;
                    pin.innerHTML =
                        'You are currently wearing "<span style="color:crimson">' +
                        obj.name +
                        '</span>"<br>Really deconstruct?';
                    pin.style.textAlign = "center";
                    pin.style.width = "100%";
                    pin.style.borderBottom = "2px solid black";
                    pin.style.paddingTop = 10;
                    let pcon = addElement(prm2, "div");
                    pcon.style.display = "flex";
                    pcon.style.textAlign = "center";
                    pcon.style.backgroundColor = "darkgrey";
                    let phai = addElement(pcon, "div");
                    phai.style.width = "50%";
                    phai.innerHTML = "YES";
                    phai.style.paddingTop = 9;
                    phai.style.paddingBottom = 9;
                    let piie = addElement(pcon, "div");
                    piie.style.width = "50%";
                    piie.innerHTML = "NO";
                    piie.style.paddingTop = 9;
                    piie.style.paddingBottom = 9;
                    phai.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#666";
                    });
                    piie.addEventListener("mouseenter", function () {
                        this.style.backgroundColor = "#666";
                    });
                    phai.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "darkgrey";
                    });
                    piie.addEventListener("mouseleave", function () {
                        this.style.backgroundColor = "darkgrey";
                    });
                    phai.addEventListener("click", () => {
                        disassembleGeneric(obj);
                        document.body.removeChild(prm);
                        document.body.removeChild(prm2);
                    });
                    piie.addEventListener("click", () => {
                        document.body.removeChild(prm);
                        document.body.removeChild(prm2);
                    });
                } else disassembleGeneric(obj);
            });
        }
    });
    inv_slot_c.addEventListener("mouseleave", function () {
        inv_slot.tabIndex = -1;
        inv_slot.removeEventListener("keydown", listen_k);
        global.keyobj = 0;
        global.flags.kfocus = false;
        if (obj.important === false && obj.slot) inv_slot_c.removeChild(dom.inv_del);
        if (obj.dss && item.toolbx.have) inv_slot_c.removeChild(dom.inv_dss);
        if (obj.slot === 5 || obj.slot === 6) {
            inv_slot_c.removeChild(dom.eq_r);
            inv_slot_c.removeChild(dom.eq_l);
        }
    });
    if (obj.slot && scanbyuid(you.eqp, obj.data.uid) === true) {
        dom.spc_a = addElement(inv_slot, "small", null, "spc_a");
        dom.spc_a.innerHTML = "E";
    }
    if (!obj.slot) {
        let s_am = addElement(inv_slot, "small", null, "s_am");
        s_am.innerHTML = " x" + obj.amount;
        inv_slot.addEventListener("mouseenter", function () {
            global.flags.kfocus = true;
            this.tabIndex = 0;
            this.focus();
            global.keyobj = obj;
            this.addEventListener("keydown", listen_k);
        });
        inv_slot.addEventListener("mouseleave", function () {
            global.flags.kfocus = false;
            this.tabIndex = -1;
            global.keyobj = 0;
            this.removeEventListener("keydown", listen_k);
        });
    }
    if (!!obj.c || !!obj.bc) {
        if (!!obj.c) inv_name.style.color = obj.c;
        if (!!obj.bc) inv_name.style.backgroundColor = obj.bc;
    } else {
        switch (obj.stype) {
            case 2:
                inv_name.style.color = "rgb(255,192,5)";
                break;
            case 3:
                inv_name.style.color = "rgb(0,235,255)";
                break;
            case 4:
                inv_name.style.color = "rgb(44,255,44)";
                break;
        }
    }
    addDesc(inv_slot, obj, null, null, null, null, 100);
    inv_slot.addEventListener("click", function (x) {
        if (obj.amount > 0 || !!obj.slot) {
            obj.use(x);
            if (!obj.slot) reduce(obj);
            if (obj.id < 3000 && !obj.data.tried) {
                obj.data.tried = true;
                global.stat.ftried += 1;
                if (global.dscr.style.display != "none")
                    dom.dtrd.innerHTML = 'Tried: <span style="color: lime">Yes</span>';
            }
        }
    });
    inv_slot.addEventListener("mouseleave", function () {
        if (obj.new === true) {
            obj.new = false;
            clearTimeout(timers.nsblk);
            inv_name.innerHTML = obj.name;
        }
    });
}

function updateInv(slot) {
    if (global.sm === 1) dom.inv_con.children[slot].children[0].children[1].innerHTML = " x" + inv[slot].amount;
    else dom.inv_con.children[slot].children[0].children[1].innerHTML = " x" + global.sinv[slot].amount;
}

function removeItem(obj, flag) {
    if (obj.slot) if (wearing(obj)) unequip(obj);
    if (obj.data.skey) {
        for (let s in global.shortcuts)
            if (obj.data.skey === global.shortcuts[s][0]) {
                global.shortcuts.splice(global.shortcuts.indexOf(obj.data.skey), 1);
                continue;
            }
    }
    let idx;
    if (global.sm === 1) {
        idx = inv.indexOf(obj);
        dom.inv_con.removeChild(dom.inv_con.children[idx]);
    } else if (global.sm === obj.stype) {
        idx = global.sinv.indexOf(obj);
        dom.inv_con.removeChild(dom.inv_con.children[idx]);
        global.sinv.splice(idx, 1);
    }
    global.dscr.style.display = "none";
    inv.splice(inv.indexOf(obj), 1);
    obj.have = false;
    if (obj.rot)
        for (let a in planner.imorph.data.items)
            if (planner.imorph.data.items[a].id === obj.id) {
                planner.imorph.data.items.splice(planner.imorph.data.items.indexOf(obj));
            }
    if (global.lw_op === 1) rsort(global.rm);
    if (flag && flag.fl) iftrunkopen(1);
    else iftrunkopenc(1);
    if (obj.slot) kill(obj);
}

function m_update() {
    dom.mn_1.innerHTML = "㊧" + ((you.wealth / 100000000) << 0);
    dom.mn_2.innerHTML = "●" + ((you.wealth / 10000) % 10000 << 0);
    dom.mn_3.innerHTML = "●" + ((you.wealth / 100) % 100 << 0);
    dom.mn_4.innerHTML = "●" + (you.wealth % 100 << 0);
}

function chs(txt, f, c, bc, iconx, icony, size, ignore, slimsize) {
    if (f === true) {
        clr_chs();
        dom.ch_1 = addElement(dom.ctr_2, "div", "chs");
        dom.ch_1.innerHTML = txt;
    } else {
        dom.ch_1 = addElement(dom.ctr_2, "div", null, "chs");
        dom.ch_1.innerHTML = txt;
    }
    if (!!iconx) {
        dom.ch_1.insertBefore(icon(dom.ch_1, iconx, icony), dom.ch_1.firstChild);
    }
    if (c) dom.ch_1.style.color = c;
    if (bc) dom.ch_1.style.backgroundColor = bc;
    if (size) dom.ch_1.style.fontSize = size;
    if (slimsize) dom.ch_1.style.height = slimsize;
    if (!ignore) global.menuo = 0;
    dom.ch_1.addEventListener("click", () => {
        clearInterval(timers.rptbncgt);
        global.flags.rptbncgtf = false;
        if (!global.flags.jdgdis) {
            global.flags.jdgdis = true;
            giveSkExp(skl.jdg, 0.1);
            setTimeout(() => {
                global.flags.jdgdis = false;
            }, 500);
        }
    });
    return dom.ch_1;
}

function chs_spec(type, x) {
    switch (type) {
        case 1:
            {
                clr_chs();
                let c = findbyid(furn, furniture.cat.id);
                let br = time.minute - c.data.age;
                dom.ch_1 = addElement(dom.ctr_2, "div", "chs");
                dom.ch_1.style.height = "200px";
                dom.ch_1_1 = addElement(dom.ch_1, "div", null, "chs_s");
                dom.ch_1_1.innerHTML =
                    'Name: <span style="color:orange">' + c.data.name + (c.data.sex === true ? " ♂" : " ♀") + "</span>";
                dom.ch_1_1.style.marginTop = -17;
                dom.ch_1_12 = addElement(dom.ch_1, "div", null, "chs_s");
                dom.ch_1_12.innerHTML =
                    'Day of birth: <span style="color:lime">' +
                    (((br / YEAR) << 0) +
                        "/" +
                        ((((br / MONTH) << 0) % 12) + 1) +
                        "/" +
                        ((((br / DAY) << 0) % 30) + 1)) +
                    "</span>";
                dom.ch_1_2 = addElement(dom.ch_1, "div", null, "chs_s");
                dom.ch_1_2.innerHTML =
                    "Age: " +
                    (c.data.age >= YEAR
                        ? '<span style="color:orange">' + ((c.data.age / YEAR) << 0) + "</span> Years "
                        : "") +
                    (c.data.age >= MONTH
                        ? '<span style="color:yellow">' + (((c.data.age / MONTH) << 0) % 12) + "</span> Months "
                        : "") +
                    (c.data.age >= DAY
                        ? '<span style="color:lime">' + (((c.data.age / DAY) << 0) % 30) + "</span> Days "
                        : "");
                dom.ch_1_3 = addElement(dom.ch_1, "div", null, "chs_s");
                dom.ch_1_3.innerHTML =
                    'Pattern: <span style="color:cyan">' +
                    global.text.cfp[c.data.p] +
                    '</span> | Color: <span style="color:cyan">' +
                    global.text.cfc[c.data.c] +
                    "</span>";
                dom.ch_1_4 = addElement(dom.ch_1, "div", null, "chs_s");
                dom.ch_1_4.innerHTML =
                    'Likes: <span style="color:lime">' +
                    global.text.cln[c.data.l1] +
                    '</span> And <span style="color:lime">' +
                    global.text.cln[c.data.l2] +
                    "</span>";
                timers.caupd = setInterval(() => {
                    dom.ch_1_2.innerHTML =
                        "Age: " +
                        (c.data.age >= YEAR
                            ? '<span style="color:orange">' + ((c.data.age / YEAR) << 0) + "</span> Years "
                            : "") +
                        (c.data.age >= MONTH
                            ? '<span style="color:yellow">' + (((c.data.age / MONTH) << 0) % 12) + "</span> Months "
                            : "") +
                        (c.data.age >= DAY
                            ? '<span style="color:lime">' + (((c.data.age / DAY) << 0) % 30) + "</span> Days "
                            : "");
                }, 1000);
            }
            break;
        case 2:
            {
                clr_chs();
                dom.ch_1 = addElement(dom.ctr_2, "div");
                dom.ch_1.style.height = "76%";
                dom.ch_1.style.backgroundColor = "rgb(0,20,44)";
                dom.flsthdr = addElement(dom.ch_1, "div");
                dom.flsthdra = addElement(dom.flsthdr, "div");
                dom.flsthdr.style.display = "flex";
                dom.flsthdra.innerHTML = "Furniture Owned";
                dom.flsthdra.style.position = "relative";
                dom.flsthdra.style.left = 120;
                dom.flsthdr.style.borderBottom = "1px #44c solid";
                dom.flsthdr.style.padding = 2;
                dom.flsthdrbc = addElement(dom.flsthdr, "div");
                dom.flsthdrb = addElement(dom.flsthdrbc, "small");
                dom.flsthdrb.innerHTML = "Home rating: ";
                dom.flsthdrbc.style.left = 237;
                dom.flsthdrb.style.paddingLeft = 6;
                dom.flsthdrbc.style.position = "relative";
                dom.flsthdrbc.style.borderLeft = "1px solid rgb(68, 68, 204)";
                dom.flsthdrbb = addElement(dom.flsthdrbc, "small");
                dom.flsthdrbb.style.color = "lime";
                let v = 0;
                for (let a in furn)
                    if (furn[a].v) {
                        if (furn[a].multv) v += furn[a].v * furn[a].amount;
                        else v += furn[a].v;
                    }
                dom.flsthdrbb.innerHTML = v;
                dom.ch_1h = addElement(dom.ch_1, "div", null);
                dom.ch_1h.style.textAlign = "left";
                dom.ch_1h.style.display = "block";
                for (let a in furn) {
                    renderFurniture(furn[a]);
                }
            }
            break;
        case 3:
            {
                clr_chs();
                global.menuo = 3;
                global.cchest = x;
                dom.ch_1a = addElement(dom.ctr_2, "div");
                dom.ch_1a.style.height = "74.5%";
                dom.ch_1a.style.backgroundColor = "rgb(0,20,44)";
                dom.ch_1a.style.display = "flex";
                dom.ch_1a.style.overflow = "auto";
                dom.ch_1a.style.position = "relative";
                dom.invp1 = addElement(dom.ch_1a, "div");
                dom.invp2 = addElement(dom.ch_1a, "div");
                dom.invp1.style.width = dom.invp2.style.width = "50%";
                dom.invp2noth = addElement(dom.ctr_2, "div");
                dom.invp2noth.style.top = 150;
                dom.invp2noth.style.position = "absolute";
                dom.invp2noth.style.color = "grey";
                dom.invp2noth.innerHTML = "Nothing in the box yet";
                dom.invp2noth.style.left = 301;
                dom.invp2noth.style.pointerEvents = "none";
                for (let obj in inv) rendertrunkitem(dom.invp1, inv[obj]);
                for (let obj in x.c)
                    rendertrunkitem(dom.invp2, x.c[obj].item, {
                        right: true,
                        nit: {
                            item: x.c[obj].item,
                            data: x.c[obj].data,
                            am: x.c[obj].am,
                            dp: x.c[obj].dp,
                        },
                    });
                if (x.c.length > 0) dom.invp2noth.style.display = "none";
                if (inv.length >= 21) dom.invp2noth.style.left = 301;
                else dom.invp2noth.style.left = 314;
            }
            break;
        case 4:
            {
                clr_chs();
                global.menuo = 4;
                global.shprf = x;
                dom.ch_1 = addElement(dom.ctr_2, "div");
                dom.ch_1.style.height = "76%";
                dom.ch_1.style.backgroundColor = "rgb(0,20,44)";
                dom.flsthdr = addElement(dom.ch_1, "div");
                dom.flsthdr.innerHTML = x.name;
                dom.flsthdr.style.borderBottom = "1px #44c solid";
                dom.flsthdr.style.padding = 2;
                dom.ch_1h = addElement(dom.ch_1, "div");
                dom.ch_1h.style.textAlign = "left";
                dom.ch_1h.style.display = "block";
                dom.ch_1h.style.height = "87%";
                dom.ch_1h.style.overflow = "auto";
                if (dom.ch_etn) empty(dom.ch_etn);
                for (let it in x.stock) {
                    rendershopitem(dom.ch_1h, x.stock[it], x);
                }
                dom.ch_1c = addElement(dom.ch_1, "div");
                dom.ch_1c.style.backgroundColor = "rgb(10, 30, 54)";
                dom.ch_1c.style.height = "5%";
                dom.ch_1c.style.width = "100%";
                dom.ch_1e = addElement(dom.ch_1c, "small"); //dom.ch_1e.style.border='1px solid #9485ed';
                dom.ch_1e.style.float = dom.ch_1e.style.textAlign = "left";
                dom.ch_2e = addElement(dom.ch_1c, "small"); //dom.ch_1e.style.border='1px solid #9485ed';
                dom.ch_2e.style.float = dom.ch_2e.style.textAlign = "right";
                dom.ch_2e.style.paddingRight = 6;
                //dom.ch_1e1 = addElement(dom.ch_1e,'input'); dom.ch_1e1.style.height=18;dom.ch_1e1.style.width=40;
                //dom.ch_1e1.style.textAlign='center'; dom.ch_1e1.style.color='white'; dom.ch_1e1.style.fontFamily='MS Gothic';
                //dom.ch_1e1.style.backgroundColor='transparent'
                dom.ch_1e.innerHTML =
                    '&nbspBuying price: <span style="color:lime">' +
                    Math.round(
                        (you.mods.infsrate - skl.trad.use()) *
                            x.infl *
                            (1 - (Math.sqrt(x.data.rep) ** 1.3 + 0.05) * 0.01) *
                            global.offline_evil_index *
                            10000
                    ) /
                        100 +
                    "%</span>";
                dom.ch_2e.innerHTML = "&nbspReputation: " + col(x.data.rep << 0, "lime");
            }
            break;
        case 5:
            {
            }
            break;
    }
    return dom.ch_1;
}

//linear-gradient(0deg,rgb(1,1,111),rgb(22,222,22))

function renderFurniture(frn) {
    dom.ch_etn = addElement(dom.ch_1h, "div", "bst_entrh", "bst_entr");
    dom.ch_etn.style.backgroundColor = "rgb(10,30,54)";
    dom.ch_etn1 = addElement(dom.ch_etn, "div", null, "bst_entr1");
    dom.ch_etn1.innerHTML = frn.name;
    switch (frn.id) {
        case home.bed.id:
            dom.ch_etn1.innerHTML += ' <small style="color:grey">[z]</small>';
            break;
        case home.pilw && home.pilw.id:
            dom.ch_etn1.innerHTML += ' <small style="color:grey">[zp]</small>';
            break;
        case home.blkt && home.blkt.id:
            dom.ch_etn1.innerHTML += ' <small style="color:grey">[zb]</small>';
            break;
        case home.tbw && home.tbw.id:
            dom.ch_etn1.innerHTML += ' <small style="color:pink">[t]</small>';
            break;
    }
    dom.ch_etn.addEventListener("mouseenter", function () {
        if (frn.removable === true) {
            dom.chsfdel = addElement(this.children[0], "div", null, "del_b");
            dom.chsfdel.innerHTML = "x";
            dom.chsfdel.style.right = 5;
            dom.chsfdel.style.top = 19;
            dom.chsfdel.addEventListener("click", function () {
                frn.data.amount--;
                frn.onRemove();
                if (frn.data.amount === 0) {
                    deactivatef(frn);
                    frn.onDestroy();
                    global.dscr.style.display = "none";
                    furn.splice(furn.indexOf(frn), 1);
                    chs_spec(2);
                    chs('"<= Return"', false).addEventListener("click", () => {
                        smove(chss.home, false);
                    });
                } else this.parentElement.parentElement.children[1].innerHTML = "x" + frn.data.amount;
                let v = 0;
                for (let a in furn)
                    if (furn[a].v) {
                        if (furn[a].multv) v += furn[a].v * furn[a].amount;
                        else v += furn[a].v;
                    }
                dom.flsthdrbb.innerHTML = v;
            });
        }
    });
    dom.ch_etn.addEventListener("mouseleave", function () {
        if (frn.removable === true) this.children[0].removeChild(dom.chsfdel);
    });
    dom.ch_etn.addEventListener("click", function () {
        frn.onSelect(); //this.dispatchEvent(new window.Event('mouseenter'))
    });
    dom.ch_etn2 = addElement(dom.ch_etn, "div", null, "bst_entr2");
    dom.ch_etn2.innerHTML = "x" + frn.data.amount;
    dom.ch_etn2.style.width = "6%";
    addDesc(dom.ch_etn, frn, 9);
}

function recshop() {
    if (global.menuo === 4) {
        empty(dom.ch_1h);
        for (let it in global.shprf.stock) {
            rendershopitem(dom.ch_1h, global.shprf.stock[it], global.shprf);
        }
        dom.ch_1e.innerHTML =
            '&nbspBuying price: <span style="color:lime">' +
            Math.round(
                (you.mods.infsrate - skl.trad.use()) *
                    global.shprf.infl *
                    (1 - (Math.sqrt(global.shprf.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index *
                    10000
            ) /
                100 +
            "%</span>";
        dom.ch_2e.innerHTML = "&nbspReputation: " + col(global.shprf.data.rep << 0, "lime");
    }
}

function rendershopitem(root, itm, vnd) {
    dom.ch_etn = addElement(root, "div", "bst_entrh", "bst_entr");
    dom.ch_etn.style.backgroundColor = "rgb(10,30,54)";
    addDesc(dom.ch_etn, itm[0]);
    dom.ch_etn1 = addElement(dom.ch_etn, "div", null, "bst_entr1");
    dom.ch_etn1.style.width = "79%";
    dom.ch_etn1n = addElement(dom.ch_etn1, "div");
    dom.ch_etn1n.innerHTML = itm[0].name;
    dom.ch_etn1n.style.width = 305;
    dom.ch_etn1b = addElement(dom.ch_etn1, "div");
    dom.ch_etn1.style.display = "flex";
    dom.ch_etn1b.style.display = "inline-flex";
    dom.ch_etn1b.style.position = "absolute";
    dom.ch_etn1b.style.right = 6;
    dom.ch_etn1b.style.textAlign = "center";
    dom.ch_etn1b.style.backgroundColor = "rgb(20,50,84)";
    let p = Math.ceil(
        itm[2] *
            (you.mods.infsrate - skl.trad.use()) *
            vnd.infl *
            (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
            global.offline_evil_index
    );
    switch (itm[0].stype) {
        case 2:
            dom.ch_etn1n.style.color = "rgb(255,192,5)";
            break;
        case 3:
            dom.ch_etn1n.style.color = "rgb(0,235,255)";
            break;
        case 4:
            dom.ch_etn1n.style.color = "rgb(44,255,44)";
            break;
    }
    dom.ch_etn2 = addElement(dom.ch_etn, "div", null, "bst_entr2");
    dom.ch_etn2.style.display = "flex";
    dom.ch_etn2.style.width = "22%";
    dom.ch_etn2.style.textAlign = "left";
    if (you.wealth < p) {
        dom.ch_etn2.style.color = "red";
        dom.ch_etn.style.backgroundColor = "rgb(68,26,38)";
    }
    dom.ch_etn2_1 = addElement(dom.ch_etn2, "span");
    dom.ch_etn2_1.style.width = "33.3%";
    dom.ch_etn2_2 = addElement(dom.ch_etn2, "span");
    dom.ch_etn2_2.style.width = "33.3%";
    dom.ch_etn2_3 = addElement(dom.ch_etn2, "span");
    dom.ch_etn2_3.style.width = "33.3%";
    if (p >= GOLD) {
        dom.ch_etn2_1.innerHTML = dom.coingold + ((p / GOLD) << 0);
        dom.ch_etn2_1.style.backgroundColor = "rgb(102, 66, 0)";
    }
    if (p >= SILVER && p % GOLD >= SILVER) {
        dom.ch_etn2_2.innerHTML = dom.coinsilver + ((p / SILVER) % SILVER << 0);
        dom.ch_etn2_2.style.backgroundColor = "rgb(56, 56, 56)";
    }
    if (p < SILVER || (p > SILVER && p % SILVER > 0)) {
        dom.ch_etn2_3.innerHTML = dom.coincopper + (p % SILVER << 0);
        dom.ch_etn2_3.style.backgroundColor = "rgb(102, 38, 23)";
    }
    dom.ch_etn3 = addElement(dom.ch_etn, "div", null, "bst_entr3");
    dom.ch_etn3.style.width = "14%";
    dom.ch_etn3.style.color = "lime";
    dom.ch_etn3.innerHTML = itm[1];
    if (itm[1] === 0) {
        dom.ch_etn3.innerHTML = "<small>sold out</small>";
        dom.ch_etn1n.style.color = "grey";
        dom.ch_etn2.style.color = "grey";
        dom.ch_etn3.style.color = "grey";
    }
    dom.ch_etn.addEventListener("mouseenter", function () {
        dom.ch_etn1b1 = addElement(this.children[0].children[1], "small", null, "ch_entbb");
        dom.ch_etn1b1.innerHTML = "1";
        dom.ch_etn1b2 = addElement(this.children[0].children[1], "small", null, "ch_entbb");
        dom.ch_etn1b2.innerHTML = "5";
        dom.ch_etn1b3 = addElement(this.children[0].children[1], "small", null, "ch_entbb");
        dom.ch_etn1b3.innerHTML = "10";
        dom.ch_etn1b4 = addElement(this.children[0].children[1], "small", null, "ch_entbb");
        dom.ch_etn1b4.innerHTML = "M";
        buycbs(itm, vnd);
        dom.ch_etn1b1.addEventListener("click", function () {
            let el = this.parentElement.parentElement.parentElement;
            let p = Math.ceil(
                itm[2] *
                    (you.mods.infsrate - skl.trad.use()) *
                    vnd.infl *
                    (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index
            );
            if (you.wealth >= p && itm[1] > 0) {
                itm[1]--;
                giveItem(itm[0]);
                spend(p);
                m_update();
                giveSkExp(skl.gred, itm[2] * 0.05);
                giveSkExp(skl.trad, itm[2] ** (1 + itm[0].rar * 0.1) * 0.05);
                if (p >= GOLD) mf(-Math.ceil((p - GOLD) / GOLD), 3);
                if (p >= SILVER) mf(-Math.ceil(((p - SILVER) / SILVER) % 100), 2);
                mf(-p % 100, 1);
                global.stat.buyt++;
                if (random() < 0.0008) {
                    giveItem(acc.dticket);
                    msg("Thank you for your patronage!", "gold", null, null, "magenta");
                }
                global.stat.shppnt += p * 0.01;
                vnd.data.rep += itm[2] * 0.0004 * vnd.repsc;
                if (vnd.data.rep > 100) vnd.data.rep = 100;
                if (itm[1] === 0) {
                    el.children[2].innerHTML = "<small>sold out</small>";
                    el.children[2].style.color =
                        el.children[0].children[0].style.color =
                        el.children[1].style.color =
                            "grey";
                } else el.children[2].innerHTML = itm[1];
            }
            buycbs(itm, vnd);
        });
        dom.ch_etn1b2.addEventListener("click", function () {
            let el = this.parentElement.parentElement.parentElement;
            let p = Math.ceil(
                itm[2] *
                    (you.mods.infsrate - skl.trad.use()) *
                    vnd.infl *
                    (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index
            );
            if (you.wealth >= p * 5 && itm[1] >= 5) {
                itm[1] -= 5;
                giveItem(itm[0], 5);
                spend(p * 5);
                m_update();
                giveSkExp(skl.gred, itm[2] * 5 * 0.05);
                giveSkExp(skl.trad, itm[2] ** (1 + itm[0].rar * 0.1) * 0.05 * 5);
                if (p * 5 >= GOLD) mf(-Math.ceil((p * 5 - GOLD) / GOLD), 3);
                if (p * 5 >= SILVER) mf(-Math.ceil(((p * 5 - SILVER) / SILVER) % 100), 2);
                mf((-p * 5) % 100, 1);
                global.stat.buyt += 5;
                if (random() < 0.004) {
                    giveItem(acc.dticket);
                    msg("Thank you for your patronage!", "gold", null, null, "magenta");
                }
                global.stat.shppnt += p * 0.01;
                vnd.data.rep += itm[2] * (5 * (1 + 0.05)) * 0.0004 * vnd.repsc;
                if (vnd.data.rep > 100) vnd.data.rep = 100;
                if (itm[1] === 0) {
                    el.children[2].innerHTML = "<small>sold out</small>";
                    el.children[2].style.color =
                        el.children[0].children[0].style.color =
                        el.children[1].style.color =
                            "grey";
                } else el.children[2].innerHTML = itm[1];
            }
            buycbs(itm, vnd);
        });
        dom.ch_etn1b3.addEventListener("click", function () {
            let el = this.parentElement.parentElement.parentElement;
            let p = Math.ceil(
                itm[2] *
                    (you.mods.infsrate - skl.trad.use()) *
                    vnd.infl *
                    (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index
            );
            if (you.wealth >= p * 10 && itm[1] >= 10) {
                itm[1] -= 10;
                giveItem(itm[0], 10);
                spend(p * 10);
                m_update();
                giveSkExp(skl.gred, itm[2] * 10 * 0.05);
                giveSkExp(skl.trad, itm[2] ** (1 + itm[0].rar * 0.1) * 0.05 * 10);
                if (p * 10 >= GOLD) mf(-Math.ceil((p * 10 - GOLD) / GOLD), 3);
                if (p * 10 >= SILVER) mf(-Math.ceil(((p * 10 - SILVER) / SILVER) % 100), 2);
                mf((-p * 10) % 100, 1);
                global.stat.buyt += 10;
                if (random() < 0.008) {
                    giveItem(acc.dticket);
                    msg("Thank you for your patronage!", "gold", null, null, "magenta");
                }
                global.stat.shppnt += p * 0.01;
                vnd.data.rep += itm[2] * (10 * (1 + 0.1)) * 0.0004 * vnd.repsc;
                if (vnd.data.rep > 100) vnd.data.rep = 100;
                if (itm[1] === 0) {
                    el.children[2].innerHTML = "<small>sold out</small>";
                    el.children[2].style.color =
                        el.children[0].children[0].style.color =
                        el.children[1].style.color =
                            "grey";
                } else el.children[2].innerHTML = itm[1];
            }
            buycbs(itm, vnd);
        });
        dom.ch_etn1b4.addEventListener("click", function () {
            let el = this.parentElement.parentElement.parentElement;
            let p = Math.ceil(
                itm[2] *
                    (you.mods.infsrate - skl.trad.use()) *
                    vnd.infl *
                    (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index
            );
            let max = (you.wealth / p) << 0;
            if (max > itm[1]) max = itm[1];
            if (you.wealth >= p && itm[1] > 0) {
                itm[1] -= max;
                giveItem(itm[0], max);
                spend(p * max);
                m_update();
                giveSkExp(skl.gred, itm[2] * max * 0.05);
                giveSkExp(skl.trad, itm[2] ** (1 + itm[0].rar * 0.1) * 0.05 * max);
                if (p * max >= GOLD) mf(-Math.ceil((p * max - GOLD) / GOLD), 3);
                if (p * max >= SILVER) mf(-Math.ceil(((p * max - SILVER) / SILVER) % 100), 2);
                mf((-p * max) % 100, 1);
                global.stat.buyt += max;
                if (random() < 0.0008 * max) {
                    giveItem(acc.dticket);
                    msg("Thank you for your patronage!", "gold", null, null, "magenta");
                }
                global.stat.shppnt += p * 0.01;
                vnd.data.rep += itm[2] * (max * (1 + max * 0.01)) * 0.0004 * vnd.repsc;
                if (vnd.data.rep > 100) vnd.data.rep = 100;
                if (itm[1] === 0) {
                    el.children[2].innerHTML = "<small>sold out</small>";
                    el.children[2].style.color =
                        el.children[0].children[0].style.color =
                        el.children[1].style.color =
                            "grey";
                } else el.children[2].innerHTML = itm[1];
            }
            buycbs(itm, vnd);
        });
    });
    dom.ch_etn.addEventListener("mouseleave", function () {
        empty(this.children[0].children[1]);
    });
    dom.ch_etn1n.addEventListener("click", function () {
        let el = this.parentElement.parentElement;
        let p = Math.ceil(
            itm[2] *
                (you.mods.infsrate - skl.trad.use()) *
                vnd.infl *
                (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                global.offline_evil_index
        );
        if (you.wealth >= p && itm[1] > 0) {
            itm[1]--;
            giveItem(itm[0]);
            spend(p);
            m_update();
            giveSkExp(skl.gred, itm[2] * 0.05);
            giveSkExp(skl.trad, itm[2] ** (1 + itm[0].rar * 0.1) * 0.05);
            if (p >= GOLD) mf(-Math.ceil((p - GOLD) / GOLD), 3);
            if (p >= SILVER) mf(-Math.ceil(((p - SILVER) / SILVER) % 100), 2);
            mf(-p % 100, 1);
            global.stat.buyt++;
            if (random() < 0.0008) {
                giveItem(acc.dticket);
                msg("Thank you for your patronage!", "gold", null, null, "magenta");
            }
            global.stat.shppnt += p * 0.01;
            vnd.data.rep += itm[2] * 0.0004 * vnd.repsc;
            if (vnd.data.rep > 100) vnd.data.rep = 100;
            if (itm[1] === 0) {
                el.children[2].innerHTML = "<small>sold out</small>";
                el.children[2].style.color = this.style.color = el.children[1].style.color = "grey";
            } else el.children[2].innerHTML = itm[1];
        }
        buycbs(itm, vnd);
    });
}

function buycbs(itm, vnd) {
    let p = Math.ceil(
        itm[2] *
            (you.mods.infsrate - skl.trad.use()) *
            vnd.infl *
            (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
            global.offline_evil_index
    );
    if (you.wealth < p || itm[1] <= 0) dom.ch_etn1b1.style.color = "grey";
    if (you.wealth < p * 5 || itm[1] < 5) dom.ch_etn1b2.style.color = "grey";
    if (you.wealth < p * 10 || itm[1] < 10) dom.ch_etn1b3.style.color = "grey";
    if (you.wealth < p || itm[1] <= 0) dom.ch_etn1b4.style.color = "grey";
    dom.ch_1e.innerHTML =
        '&nbspBuying price: <span style="color:lime">' +
        Math.round(
            (you.mods.infsrate - skl.trad.use()) *
                vnd.infl *
                (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                global.offline_evil_index *
                10000
        ) /
            100 +
        "%</span>";
    dom.ch_2e.innerHTML = "&nbspReputation: " + col(vnd.data.rep << 0, "lime");
    for (let i = 0; i < vnd.stock.length; i++) {
        if (
            you.wealth <
            Math.ceil(
                vnd.stock[i][2] *
                    (you.mods.infsrate - skl.trad.use()) *
                    vnd.infl *
                    (1 - (Math.sqrt(vnd.data.rep) ** 1.3 + 0.05) * 0.01) *
                    global.offline_evil_index
            )
        ) {
            dom.ch_1h.children[i].children[1].style.color = "red";
            dom.ch_1h.children[i].style.backgroundColor = "rgb(68,26,38)";
        }
    }
    for (let x in global.shptchk) global.shptchk[x](); //put it here for now
}

for (let x in global.cptchk) global.cptchk[x]();

function rendertrunkitem(root, item, ni) {
    if (!ni) {
        ni = new Object();
        ni.right = false;
    }
    let trunk = global.cchest;
    dom.invp1_con = addElement(root, "div", null, "trkitm");
    ni.right === true
        ? (dom.invp1_con.style.borderLeft = "1px rgb(204, 68, 68) solid")
        : (dom.invp1_con.style.borderRight = "1px rgb(204, 68, 68) solid");
    if (ni.right === true) {
        let c = copy(item);
        c.data = ni.nit.data;
        c.dp = ni.nit.dp;
        addDesc(dom.invp1_con, c);
    } else addDesc(dom.invp1_con, item);
    dom.invp1_s = addElement(dom.invp1_con, "small");
    dom.invp2_s = addElement(dom.invp1_con, "small");
    dom.invp1_s.style.marginLeft = ni.right ? 23 : 3;
    dom.invp1_s.innerHTML = item.name;
    dom.invp2_s.style.right = ni.right ? 3 : 20;
    dom.invp2_s.innerHTML = !item.slot ? "x" + (ni.right === true ? ni.nit.am : item.amount) : "";
    dom.invp2_s.style.position = "absolute";
    if (!!item.c || !!item.bc) {
        if (!!item.c) dom.invp1_s.style.color = item.c;
        if (!!item.bc) dom.invp1_s.style.backgroundColor = item.bc;
    } else {
        switch (item.stype) {
            case 2:
                dom.invp1_s.style.color = "rgb(255,192,5)";
                break;
            case 3:
                dom.invp1_s.style.color = "rgb(0,235,255)";
                break;
            case 4:
                dom.invp1_s.style.color = "rgb(44,255,44)";
                break;
        }
    }

    dom.invp1_con.addEventListener("mouseenter", function () {
        dom.invp1_op2 = addElement(this, "small", null, ni.right ? "atrkmove2" : "atrkmove");
        dom.invp1_op2.innerHTML = ni.right ? "<<" : ">>";
        dom.invp1_op2.addEventListener("mouseenter", function () {
            global.flags.rtcrutch = true;
        }); //ugly hack
        dom.invp1_op2.addEventListener("mouseleave", function () {
            global.flags.rtcrutch = false;
        }); //self to self: revisit later V:
        dom.invp1_op2.addEventListener("click", function () {
            let scann = false;
            let titem;
            if (ni.right === false) {
                for (let a in trunk.c) {
                    if (trunk.c[a].item.id === item.id && !item.slot) {
                        scann = true;
                        titem = trunk.c[a];
                        break;
                    }
                }
                if (scann === false) {
                    let nit = addToContainer(trunk, item, item.amount);
                    item.amount = 0;
                    titem = nit;
                    if (item.amount <= 0 || item.slot) {
                        dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);
                        removeItem(item, { fl: true });
                    } else if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                } else {
                    titem.am += item.amount;
                    item.amount = 0;
                    if (item.amount <= 0) {
                        dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);
                        removeItem(item, { fl: true });
                    } else if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                }
                if (titem.item.onTIn) titem.item.onTIn(trunk, titem); //  big stack moves into container
            } else {
                for (let a in inv) {
                    if (inv[a].id === item.id && !item.slot) {
                        scann = true;
                        titem = inv[a];
                        break;
                    }
                }
                if (scann === false) {
                    let fin;
                    if (ni.nit.item.slot) {
                        for (let a in trunk.c) {
                            if (trunk.c[a].data.uid === ni.nit.data.uid) {
                                fin = trunk.c[a];
                                break;
                            }
                        }
                    } else {
                        for (let a in trunk.c) {
                            if (trunk.c[a].item.id === ni.nit.item.id) {
                                fin = trunk.c[a];
                                break;
                            }
                        }
                    }
                    let g = giveItem(ni.nit.item, ni.nit.am, true, {
                        fl: true,
                    });
                    g.data = ni.nit.data;
                    g.dp = ni.nit.dp;
                    dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);
                    removeFromContainer(trunk, fin);
                    rendertrunkitem(dom.invp1, g);
                    if (trunk.c.length === 0) global.dscr.style.display = "none";
                } else {
                    titem.amount += ni.nit.am;
                    let fin;
                    for (let a in trunk.c) {
                        if (trunk.c[a].item.id === ni.nit.item.id) {
                            fin = trunk.c[a];
                            break;
                        }
                    }
                    dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);
                    removeFromContainer(trunk, fin);
                    if (trunk.c.length === 0) global.dscr.style.display = "none";
                    if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                }
                if (ni.nit.item.onTOut) ni.nit.item.onTOut(trunk, ni.nit); //  big stack moves out of container
            }
            iftrunkopen();
        });
    });
    dom.invp1_con.addEventListener("mouseleave", function () {
        empty(this.children[2]);
        this.removeChild(this.children[2]);
    });
    dom.invp1_con.addEventListener("click", function () {
        if (global.flags.rtcrutch === true) {
            this.children[0].click();
            return;
        } else {
            scann = false;
            let titem;
            if (ni.right === false) {
                for (let a in trunk.c) {
                    if (trunk.c[a].item.id === item.id && !item.slot) {
                        scann = true;
                        titem = trunk.c[a];
                        break;
                    }
                }
                if (scann === false) {
                    let nit = addToContainer(trunk, item);
                    item.amount--;
                    titem = nit;
                    if (item.amount <= 0) {
                        dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);
                        removeItem(item, { fl: true });
                    } else if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                } else {
                    titem.am++;
                    item.amount--;
                    if (item.amount <= 0 || item.slot) {
                        dom.invp1.removeChild(dom.invp1.children[inv.indexOf(item)]);
                        removeItem(item, { fl: true });
                    } else if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                }
                if (titem.item.onTIn) titem.item.onTIn(trunk, titem); //  1 item moves into container
            } else {
                for (let a in inv) {
                    if (inv[a].id === item.id && !item.slot) {
                        scann = true;
                        titem = inv[a];
                        break;
                    }
                }
                if (scann === false) {
                    let fin;
                    if (ni.nit.item.slot) {
                        for (let a in trunk.c) {
                            if (trunk.c[a].data.uid === ni.nit.data.uid) {
                                fin = trunk.c[a];
                                break;
                            }
                        }
                    } else {
                        for (let a in trunk.c) {
                            if (trunk.c[a].item.id === ni.nit.item.id) {
                                fin = trunk.c[a];
                                break;
                            }
                        }
                    }
                    let g = giveItem(ni.nit.item, 1, true, { fl: true });
                    g.data = ni.nit.data;
                    g.dp = ni.nit.dp;
                    rendertrunkitem(dom.invp1, g);
                    if (--fin.am <= 0) {
                        dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);
                        removeFromContainer(trunk, fin);
                    }
                    if (trunk.c.length === 0) global.dscr.style.display = "none";
                } else {
                    titem.amount++;
                    let fin;
                    for (let a in trunk.c) {
                        if (trunk.c[a].item.id === ni.nit.item.id) {
                            fin = trunk.c[a];
                            break;
                        }
                    }
                    if (--fin.am <= 0) {
                        dom.invp2.removeChild(dom.invp2.children[trunk.c.indexOf(fin)]);
                        removeFromContainer(trunk, fin);
                    }
                    if (trunk.c.length === 0) global.dscr.style.display = "none";
                    if (global.sm === 1) updateInv(inv.indexOf(item));
                    else if (global.sm === item.stype) updateInv(global.sinv.indexOf(item));
                }
                if (ni.nit.item.onTOut) ni.nit.item.onTOut(trunk, ni.nit); //  1 item moves out of container
            }
            iftrunkopen();
        }
    });
}

function updateTrunkItem(root, idx, item, am) {
    if (root.children[idx]) root.children[idx].children[1].innerHTML = item.slot ? "" : "x" + am;
}

function updateTrunkLeftItem(item, kill) {
    if (global.menuo === 3) {
        for (let a in inv)
            if ((inv[a].data.uid && inv[a].data.uid === item.data.uid) || inv[a].id === item.id) {
                if (kill) dom.invp1.removeChild(dom.invp1.children[inv.indexOf(inv[a])]);
                else {
                    dom.invp1.children[inv.indexOf(inv[a])].children[1].innerHTML = item.slot ? "" : "x" + item.amount;
                }
            }
    }
}

function iftrunkopen(side) {
    if (global.menuo === 3) {
        let trunk = global.cchest;
        if (!side || side === 1) for (let obj in inv) updateTrunkItem(dom.invp1, obj, inv[obj], inv[obj].amount);
        if (!side || side === 2)
            for (let obj in trunk.c) updateTrunkItem(dom.invp2, obj, trunk.c[obj].item, trunk.c[obj].am);
        if (trunk.length === 0) dom.invp2noth.style.display = "";
        else dom.invp2noth.style.display = "none";
    }
}

function iftrunkopenc(side) {
    if (global.menuo === 3) {
        let trunk = global.cchest;
        if (!side || side === 1) {
            empty(dom.invp1);
            for (let obj in inv) rendertrunkitem(dom.invp1, inv[obj]);
        }
        if (!side || side === 2) {
            empty(dom.invp2);
            for (let obj in trunk.c)
                rendertrunkitem(dom.invp2, trunk.c[obj].item, {
                    right: true,
                    nit: {
                        item: trunk.c[obj].item,
                        data: trunk.c[obj].data,
                        am: trunk.c[obj].am,
                        dp: trunk.c[obj].dp,
                    },
                });
        }
        if (trunk.length === 0) dom.invp2noth.style.display = "";
        else dom.invp2noth.style.display = "none";
    }
}

function addToContainer(cont, thing, am, data) {
    let it = thing;
    if (thing.slot) it = deepCopy(thing);
    let r = {
        item: it,
        am: am || 1,
        data: data || thing.data,
        dp: thing.slot ? thing.dp : 0,
    };
    if (r.item.slot) r.data.uid = ++global.uid;
    cont.c.push(r);
    if (global.menuo == 3)
        rendertrunkitem(dom.invp2, r.item, {
            right: true,
            nit: { item: r.item, data: r.data, am: r.am, dp: r.dp },
        });
    return r;
}

function removeFromContainer(cont, item, find) {
    if (find) {
        for (let a in cont.c)
            if (cont.c.indexOf(cont.c[a]) === cont.c.indexOf(item)) {
                cont.c.splice(cont.c.indexOf(item), 1);
                break;
            }
    } else cont.c.splice(cont.c.indexOf(item), 1);
}

function clr_chs(index) {
    if (!index) empty(dom.ctr_2);
    else dom.ctr_2.removeChild(dom.ctr_2.children[index]);
}

function smove(where, lv) {
    global.flags.busy = false;
    global.flags.work = false;
    global.wdwidx = 0;
    if (global.flags.loadstate) return;
    if (!global.flags.wkdis) {
        global.flags.wkdis = true;
        if (lv !== false) giveSkExp(skl.walk, 0.25);
        setTimeout(() => {
            global.flags.wkdis = false;
        }, 500);
    }
    you.eqp[6].dp = you.eqp[6].dp - 0.08 < 0 ? 0 : you.eqp[6].dp - 0.08;
    let flg = false;
    let und = [];
    for (let c in global.current_l.sector) {
        for (let a in where.sector) {
            for (let b in where.sector[a].group)
                if (
                    where.sector[a].group[b] === global.current_l.id &&
                    where.sector[a].id === global.current_l.sector[c].id
                )
                    flg = true;
        }
        if (flg === false) {
            global.current_l.sector[c].onLeave();
            deactivateEffectors(global.current_l.sector[c].effectors);
            sectors.splice(sectors.indexOf(global.current_l.sector[c]));
        } else flg = false;
    }
    global.current_l.onLeave();
    deactivateEffectors(global.current_l.effectors);
    global.flags.civil = true;
    global.flags.btl = false;
    global.current_z = area.nwh;
    dom.d7m.update();
    global.stat.smovet++;
    global.flags.inside = false;
    for (let a in where.sector) {
        if (where.sector[a].inside || where.inside) global.flags.inside = true;
    }
    clr_chs();
    activateEffectors(where.effectors);
    where.sl();
    global.current_l = where;
    for (let a in sectors) sectors[a].onMove();
    global.current_a.deactivate();
    global.current_a = act.default;
    dom.ct_bt3.style.backgroundColor = "inherit";
    for (let a in global.current_l.sector)
        if (!scanbyid(sectors, global.current_l.sector[a].id)) {
            sectors.push(global.current_l.sector[a]);
            global.current_l.sector[a].onEnter();
            activateEffectors(global.current_l.sector[a].effectors);
        }
    global.current_l.onEnter();
    rfeff(global.current_l);
    if (global.flags.btl === false) {
        global.current_m = creature.default;
        global.current_m.eff = [];
        empty(dom.d101m);
        dom.d5_1_1m.update();
        update_m();
    }
}

function giveFurniture(frt, l, show) {
    let frn = l === true ? copy(frt) : frt;
    if (show !== false)
        msg('Furniture Acquired: <span style="color:orange">"' + frt.name + '"</span>', "yellow", frt, 9);
    if (scanbyid(furn, frn.id)) frn.data.amount++;
    else {
        furn.push(frn);
        frn.data.amount++;
    }
    frn.onGive();
    if (global.wdwidx === 1) {
        empty(dom.ch_1h);
        for (let a in furn) renderFurniture(furn[a]);
    }
    let v = 0;
    for (let a in furn)
        if (furn[a].v) {
            if (furn[a].multv) v += furn[a].v * furn[a].amount;
            else v += furn[a].v;
        }
    if (dom.flsthdrbb) dom.flsthdrbb.innerHTML = v;
    return frn;
}

function activatef(f) {
    if (!f.active) {
        f.activate();
        f.active = true;
    }
}

function deactivatef(f) {
    if (f.active) {
        f.deactivate();
        f.active = false;
    }
}

document.body.removeChild(global._preig);
document.body.removeChild(global._preic);
document.body.removeChild(global._preic2);

function icon(root, x, y, sx, sy, sz) {
    //sz=2
    if (window.location.pathname.length === 1) {
        sx = sx || 16;
        sy = sy || 16;
        var div = addElement(root, "canvas");
        div.width = sx;
        div.height = sy;
        let data = global._preic_tmain.getImageData(x * sx - sx, y * sy - sy, sx, sy);
        div.getContext("2d").putImageData(data, 0, 0);
        //    let temp = addElement(root,'canvas'); temp.width=sx;temp.height=sy;
        //    let data = global._preic_tmain.getImageData(x*sx-sx,y*sy-sy,sx,sy);
        //    temp.getContext('2d').putImageData(data,0,0);
        //    var div = addElement(root,'canvas'); div.width=sx*sz;div.height=sy*sz;
        //    div.getContext('2d').imageSmoothingEnabled=false;
        //    div.getContext('2d').drawImage(temp,0,0,sx,sy,0,0,sx*sz,sy*sz);
    } else div = addElement(root, "span");
    return div;
}

function wManager() {
    let ses = getSeason();
    if (w_manager.duration > 0) w_manager.duration -= global.timescale;
    else {
        let chance = rand(1, 100);
        switch (ses) {
            case 1:
                switch (w_manager.curr.id) {
                    case weather.sunny.id:
                        if (chance <= 10) setWeather(weather.cloudy, rand(120, 220));
                        else if (chance > 10 && chance <= 20) setWeather(weather.overcast, rand(90, 280));
                        else if (chance > 20 && chance <= 90 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(300, 500));
                        else if (chance > 20 && chance <= 90 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(200, 400));
                        else setWeather(weather.sunny, rand(22, 44));
                        break;
                    case weather.cloudy.id:
                        if (chance <= 15) setWeather(weather.stormy, rand(100, 200));
                        else if (chance > 15 && chance <= 35) setWeather(weather.overcast, rand(90, 220));
                        else if (chance > 35 && chance <= 45) setWeather(weather.rain, rand(150, 250));
                        else if (chance > 45 && chance <= 65) setWeather(weather.drizzle, rand(30, 80));
                        else if (chance > 65 && chance <= 80 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(300, 500));
                        else if (chance > 65 && chance <= 80 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(200, 400));
                        else setWeather(weather.cloudy, rand(90, 160));
                        break;
                    case weather.stormy.id:
                        if (chance < 10) setWeather(weather.cloudy, rand(90, 120));
                        else if (chance > 10 && chance <= 40) setWeather(weather.storm, rand(90, 160));
                        else if (chance > 40 && chance <= 60) setWeather(weather.rain, rand(120, 200));
                        else if (chance > 60 && chance <= 75) setWeather(weather.drizzle, rand(20, 40));
                        else setWeather(weather.stormy, rand(60, 120));
                        break;
                    case weather.storm.id:
                        if (chance < 5) setWeather(weather.stormy, rand(80, 120));
                        else if (chance > 5 && chance <= 65) setWeather(weather.rain, rand(180, 250));
                        else if (chance > 65 && chance <= 75) setWeather(weather.heavyrain, rand(80, 150));
                        else setWeather(weather.storm, rand(20, 80));
                        break;
                    case weather.overcast.id:
                        if (chance < 20) setWeather(weather.stormy, rand(50, 120));
                        else if (chance > 20 && chance <= 45) setWeather(weather.cloudy, rand(100, 200));
                        else if (chance > 45 && chance <= 60) setWeather(weather.clear, rand(150, 250));
                        else setWeather(weather.overcast, rand(40, 90));
                        break;
                    case weather.rain.id:
                        if (chance < 10) setWeather(weather.drizzle, rand(30, 50));
                        else if (chance > 10 && chance <= 20) setWeather(weather.heavyrain, rand(100, 200));
                        else if (chance > 20 && chance <= 30) setWeather(weather.overcast, rand(52, 173));
                        else if (chance > 30 && chance <= 55) setWeather(weather.misty, rand(25, 55));
                        else if (chance > 55 && chance <= 80) setWeather(weather.clear, rand(225, 455));
                        else setWeather(weather.rain, rand(80, 120));
                        break;
                    case weather.heavyrain.id:
                        if (chance < 10) setWeather(weather.storm, rand(80, 130));
                        else if (chance > 10 && chance <= 65) setWeather(weather.rain, rand(100, 170));
                        else if (chance > 65 && chance <= 75) setWeather(weather.misty, rand(15, 40));
                        else if (chance > 75 && chance <= 80) setWeather(weather.clear, rand(110, 200));
                        else if (chance > 80 && chance <= 90) setWeather(weather.thunder, rand(120, 200));
                        else setWeather(weather.heavyrain, rand(50, 100));
                        break;
                    case weather.misty.id:
                        if (chance < 50) setWeather(weather.foggy, rand(22, 33));
                        else if (chance > 50 && chance <= 80 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 50 && chance <= 80 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.misty, rand(11, 22));
                        break;
                    case weather.foggy.id:
                        if (chance < 20) setWeather(weather.overcast, rand(80, 130));
                        else if (chance > 20 && chance <= 70 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 20 && chance <= 70 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.foggy, rand(11, 22));
                        break;
                    case weather.drizzle.id:
                        if (chance < 20) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 20 && chance <= 50) setWeather(weather.rain, rand(90, 180));
                        else if (chance > 50 && chance <= 65) setWeather(weather.clear, rand(90, 180));
                        else setWeather(weather.drizzle, rand(30, 62));
                        break;
                    case weather.clear.id:
                        if (chance < 10) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 10 && chance <= 55 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 10 && chance <= 55 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else if (chance > 55 && chance <= 65) setWeather(weather.cloudy, rand(100, 200));
                        else setWeather(weather.clear, rand(160, 290));
                        break;
                    case weather.thunder.id:
                        if (chance < 50) setWeather(weather.heavyrain, rand(60, 90));
                        else if (chance > 50 && chance <= 80) setWeather(weather.storm, rand(80, 120));
                        else setWeather(weather.thunder, rand(40, 60));
                        break;
                    default:
                        setWeather(weather.clear, rand(30, 60));
                        break;
                }
                break;
            case 2:
                switch (w_manager.curr.id) {
                    case weather.sunny.id:
                        if (chance <= 5) setWeather(weather.cloudy, rand(60, 120));
                        else if (chance > 5 && chance <= 90 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(400, 700));
                        else if (chance > 15 && chance <= 90 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(300, 500));
                        else setWeather(weather.sunny, rand(90, 180));
                        break;
                    case weather.cloudy.id:
                        if (chance <= 3) setWeather(weather.stormy, rand(30, 60));
                        else if (chance > 3 && chance <= 8) setWeather(weather.overcast, rand(40, 120));
                        else if (chance > 8 && chance <= 15) setWeather(weather.rain, rand(50, 100));
                        else if (chance > 15 && chance <= 25) setWeather(weather.drizzle, rand(30, 80));
                        else if (chance > 25 && chance <= 80 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(300, 500));
                        else if (chance > 25 && chance <= 80 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(200, 400));
                        else setWeather(weather.cloudy, rand(40, 120));
                        break;
                    case weather.stormy.id:
                        if (chance < 35) setWeather(weather.cloudy, rand(60, 120));
                        else if (chance > 35 && chance <= 40) setWeather(weather.storm, rand(90, 160));
                        else if (chance > 40 && chance <= 60) setWeather(weather.rain, rand(70, 120));
                        else if (chance > 60 && chance <= 85) setWeather(weather.drizzle, rand(60, 900));
                        else setWeather(weather.stormy, rand(60, 120));
                        break;
                    case weather.storm.id:
                        if (chance < 5) setWeather(weather.stormy, rand(30, 50));
                        else if (chance > 5 && chance <= 65) setWeather(weather.rain, rand(140, 200));
                        else if (chance > 65 && chance <= 70) setWeather(weather.heavyrain, rand(80, 150));
                        else setWeather(weather.storm, rand(20, 80));
                        break;
                    case weather.overcast.id:
                        if (chance < 5) setWeather(weather.stormy, rand(20, 60));
                        else if (chance > 5 && chance <= 45) setWeather(weather.cloudy, rand(100, 200));
                        else if (chance > 45 && chance <= 65) setWeather(weather.clear, rand(150, 250));
                        else setWeather(weather.overcast, rand(60, 110));
                        break;
                    case weather.rain.id:
                        if (chance < 10) setWeather(weather.drizzle, rand(50, 70));
                        else if (chance > 10 && chance <= 15) setWeather(weather.heavyrain, rand(50, 80));
                        else if (chance > 15 && chance <= 40) setWeather(weather.overcast, rand(82, 173));
                        else if (chance > 40 && chance <= 55) setWeather(weather.misty, rand(25, 55));
                        else if (chance > 55 && chance <= 80) setWeather(weather.clear, rand(225, 455));
                        else setWeather(weather.rain, rand(80, 120));
                        break;
                    case weather.heavyrain.id:
                        if (chance < 10) setWeather(weather.storm, rand(80, 130));
                        else if (chance > 10 && chance <= 65) setWeather(weather.rain, rand(100, 170));
                        else if (chance > 65 && chance <= 75) setWeather(weather.misty, rand(15, 40));
                        else if (chance > 75 && chance <= 87) setWeather(weather.clear, rand(110, 200));
                        else if (chance > 87 && chance <= 90) setWeather(weather.thunder, rand(120, 200));
                        else setWeather(weather.heavyrain, rand(50, 100));
                        break;
                    case weather.misty.id:
                        if (chance < 50) setWeather(weather.foggy, rand(22, 33));
                        else if (chance > 50 && chance <= 80 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 50 && chance <= 80 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.misty, rand(11, 22));
                        break;
                    case weather.foggy.id:
                        if (chance < 20) setWeather(weather.overcast, rand(80, 130));
                        else if (chance > 20 && chance <= 70 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 20 && chance <= 70 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.foggy, rand(11, 22));
                        break;
                    case weather.drizzle.id:
                        if (chance < 15) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 15 && chance <= 40) setWeather(weather.cloudy, rand(90, 180));
                        else if (chance > 40 && chance <= 50) setWeather(weather.rain, rand(50, 111));
                        else if (chance > 50 && chance <= 65) setWeather(weather.clear, rand(90, 180));
                        else setWeather(weather.drizzle, rand(30, 62));
                        break;
                    case weather.clear.id:
                        if (chance < 5) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 5 && chance <= 55 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 10 && chance <= 55 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else if (chance > 55 && chance <= 65) setWeather(weather.cloudy, rand(100, 200));
                        else setWeather(weather.clear, rand(160, 290));
                        break;
                    case weather.thunder.id:
                        if (chance < 50) setWeather(weather.heavyrain, rand(60, 90));
                        else if (chance > 50 && chance <= 80) setWeather(weather.storm, rand(80, 120));
                        else setWeather(weather.thunder, rand(40, 60));
                        break;
                    default:
                        setWeather(weather.clear, rand(30, 60));
                        break;
                }
                break;
            case 3:
                switch (w_manager.curr.id) {
                    case weather.sunny.id:
                        if (chance <= 25) setWeather(weather.cloudy, rand(120, 220));
                        else if (chance > 25 && chance <= 60) setWeather(weather.overcast, rand(90, 280));
                        else if (chance > 60 && chance <= 90 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(80, 150));
                        else if (chance > 60 && chance <= 90 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(120, 180));
                        else setWeather(weather.sunny, rand(22, 44));
                        break;
                    case weather.cloudy.id:
                        if (chance <= 30) setWeather(weather.stormy, rand(100, 200));
                        else if (chance > 30 && chance <= 55) setWeather(weather.overcast, rand(90, 220));
                        else if (chance > 55 && chance <= 85) setWeather(weather.rain, rand(150, 250));
                        else if (chance > 85 && chance <= 90) setWeather(weather.drizzle, rand(70, 120));
                        else if (chance > 90 && chance <= 95 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(170, 250));
                        else if (chance > 90 && chance <= 95 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(180, 300));
                        else setWeather(weather.cloudy, rand(90, 160));
                        break;
                    case weather.stormy.id:
                        if (chance < 15) setWeather(weather.cloudy, rand(90, 120));
                        else if (chance > 15 && chance <= 40) setWeather(weather.storm, rand(90, 160));
                        else if (chance > 40 && chance <= 70) setWeather(weather.rain, rand(120, 200));
                        else if (chance > 70 && chance <= 85) setWeather(weather.drizzle, rand(20, 40));
                        else setWeather(weather.stormy, rand(60, 120));
                        break;
                    case weather.storm.id:
                        if (chance < 10) setWeather(weather.stormy, rand(80, 120));
                        else if (chance > 10 && chance <= 45) setWeather(weather.rain, rand(180, 250));
                        else if (chance > 45 && chance <= 85) setWeather(weather.heavyrain, rand(100, 190));
                        else setWeather(weather.storm, rand(20, 80));
                        break;
                    case weather.overcast.id:
                        if (chance < 20) setWeather(weather.stormy, rand(50, 120));
                        else if (chance > 20 && chance <= 55) setWeather(weather.cloudy, rand(80, 150));
                        else if (chance > 55 && chance <= 60) setWeather(weather.clear, rand(150, 250));
                        else setWeather(weather.overcast, rand(40, 90));
                        break;
                    case weather.rain.id:
                        if (chance < 10) setWeather(weather.drizzle, rand(30, 50));
                        else if (chance > 10 && chance <= 30) setWeather(weather.heavyrain, rand(100, 200));
                        else if (chance > 30 && chance <= 40) setWeather(weather.overcast, rand(52, 173));
                        else if (chance > 40 && chance <= 50) setWeather(weather.misty, rand(25, 55));
                        else if (chance > 50 && chance <= 65) setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.rain, rand(80, 120));
                        break;
                    case weather.heavyrain.id:
                        if (chance < 15) setWeather(weather.storm, rand(80, 130));
                        else if (chance > 15 && chance <= 55) setWeather(weather.rain, rand(100, 170));
                        else if (chance > 55 && chance <= 65) setWeather(weather.misty, rand(15, 40));
                        else if (chance > 65 && chance <= 70) setWeather(weather.clear, rand(110, 200));
                        else if (chance > 70 && chance <= 95) setWeather(weather.thunder, rand(120, 200));
                        else setWeather(weather.heavyrain, rand(50, 100));
                        break;
                    case weather.misty.id:
                        if (chance < 25) setWeather(weather.foggy, rand(22, 33));
                        else if (chance > 25 && chance <= 55) setWeather(weather.overcast, rand(60, 100));
                        else if (chance > 55 && chance <= 75) setWeather(weather.cloudy, rand(60, 100));
                        else setWeather(weather.misty, rand(11, 22));
                        break;
                    case weather.foggy.id:
                        if (chance < 20) setWeather(weather.overcast, rand(80, 130));
                        else if (chance > 20 && chance <= 40) setWeather(weather.rain, rand(100, 200));
                        else if (chance > 40 && chance <= 70) setWeather(weather.heavyrain, rand(100, 200));
                        else setWeather(weather.foggy, rand(11, 22));
                        break;
                    case weather.drizzle.id:
                        if (chance < 15) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 15 && chance <= 55) setWeather(weather.rain, rand(90, 180));
                        else if (chance > 55 && chance <= 60) setWeather(weather.clear, rand(60, 100));
                        else if (chance > 60 && chance <= 70) setWeather(weather.cloudy, rand(40, 90));
                        else setWeather(weather.drizzle, rand(30, 62));
                        break;
                    case weather.clear.id:
                        if (chance < 25) setWeather(weather.overcast, rand(80, 140));
                        else if (chance > 25 && chance <= 45 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 25 && chance <= 45 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else if (chance > 45 && chance <= 70) setWeather(weather.cloudy, rand(100, 200));
                        else if (chance > 70 && chance <= 90) setWeather(weather.drizzle, rand(30, 80));
                        else setWeather(weather.clear, rand(120, 200));
                        break;
                    case weather.thunder.id:
                        if (chance < 30) setWeather(weather.heavyrain, rand(60, 90));
                        else if (chance > 30 && chance <= 60) setWeather(weather.storm, rand(80, 120));
                        else setWeather(weather.thunder, rand(40, 60));
                        break;
                    default:
                        setWeather(weather.clear, rand(30, 60));
                        break;
                }
                break;
            case 4:
                switch (w_manager.curr.id) {
                    case weather.sunny.id:
                        if (chance <= 40) setWeather(weather.cloudy, rand(120, 220));
                        else if (chance > 40 && chance <= 80) setWeather(weather.overcast, rand(90, 280));
                        else if (chance > 80 && chance <= 90 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 300));
                        else if (chance > 80 && chance <= 90 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 300));
                        else setWeather(weather.sunny, rand(22, 44));
                        break;
                    case weather.cloudy.id:
                        if (chance <= 15) setWeather(weather.overcast, rand(90, 220));
                        else if (chance > 15 && chance <= 17) setWeather(weather.rain, rand(30, 80));
                        else if (chance > 17 && chance <= 20) setWeather(weather.drizzle, rand(30, 80));
                        else if (chance > 20 && chance <= 30 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 300));
                        else if (chance > 20 && chance <= 30 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 300));
                        else if (chance > 30 && chance <= 60) setWeather(weather.snow, rand(180, 300));
                        else if (chance > 60 && chance <= 70) setWeather(weather.sstorm, rand(90, 200));
                        else setWeather(weather.cloudy, rand(90, 160));
                        break;
                    case weather.overcast.id:
                        if (chance < 20) setWeather(weather.snow, rand(50, 120));
                        else if (chance > 20 && chance <= 45) setWeather(weather.cloudy, rand(100, 200));
                        else if (chance > 45 && chance <= 60) setWeather(weather.clear, rand(150, 250));
                        else if (chance > 60 && chance <= 70) setWeather(weather.sstorm, rand(150, 250));
                        else setWeather(weather.overcast, rand(40, 90));
                        break;
                    case weather.rain.id:
                        if (chance < 10) setWeather(weather.drizzle, rand(30, 50));
                        else if (chance > 10 && chance <= 20) setWeather(weather.snow, rand(100, 200));
                        else if (chance > 20 && chance <= 30) setWeather(weather.overcast, rand(52, 173));
                        else if (chance > 30 && chance <= 55) setWeather(weather.misty, rand(25, 55));
                        else if (chance > 55 && chance <= 80) setWeather(weather.clear, rand(225, 455));
                        else setWeather(weather.rain, rand(20, 40));
                        break;
                    case weather.misty.id:
                        if (chance < 30) setWeather(weather.foggy, rand(22, 33));
                        else if (chance > 30 && chance <= 50) setWeather(weather.snow, rand(100, 200));
                        else if (chance > 50 && chance <= 80 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 50 && chance <= 80 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.misty, rand(11, 22));
                        break;
                    case weather.foggy.id:
                        if (chance < 20) setWeather(weather.overcast, rand(80, 130));
                        else if (chance > 20 && chance <= 70 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 20 && chance <= 70 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else setWeather(weather.foggy, rand(11, 22));
                        break;
                    case weather.drizzle.id:
                        if (chance < 20) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 20 && chance <= 25) setWeather(weather.rain, rand(90, 120));
                        else if (chance > 25 && chance <= 40) setWeather(weather.snow, rand(90, 180));
                        else if (chance > 40 && chance <= 65) setWeather(weather.clear, rand(90, 150));
                        else setWeather(weather.drizzle, rand(30, 62));
                        break;
                    case weather.clear.id:
                        if (chance < 10) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 10 && chance <= 55 && getHour() >= 5 && getHour() <= 16)
                            setWeather(weather.sunny, rand(100, 200));
                        else if (chance > 10 && chance <= 55 && getHour() < 5 && getHour() > 16)
                            setWeather(weather.clear, rand(100, 200));
                        else if (chance > 55 && chance <= 65) setWeather(weather.cloudy, rand(100, 200));
                        else if (chance > 65 && chance <= 75) setWeather(weather.snow, rand(100, 200));
                        else setWeather(weather.clear, rand(160, 290));
                        break;
                    case weather.snow.id:
                        if (chance < 20) setWeather(weather.sstorm, rand(80, 130));
                        else if (chance > 20 && chance <= 25) setWeather(weather.rain, rand(15, 50));
                        else if (chance > 25 && chance <= 40) setWeather(weather.clear, rand(90, 150));
                        else if (chance > 40 && chance <= 65) setWeather(weather.overcast, rand(140, 320));
                        else if (chance > 60 && chance <= 85) setWeather(weather.cloudy, rand(120, 200));
                        else setWeather(weather.snow, rand(30, 62));
                        break;
                    case weather.sstorm.id:
                        if (chance < 10) setWeather(weather.overcast, rand(30, 60));
                        else if (chance > 10 && chance <= 35) setWeather(weather.snow, rand(90, 120));
                        else if (chance > 35 && chance <= 45) setWeather(weather.cloudy, rand(90, 180));
                        else if (chance > 45 && chance <= 65) setWeather(weather.overcast, rand(90, 150));
                        else setWeather(weather.sstorm, rand(40, 120));
                        break;
                    default:
                        setWeather(weather.clear, rand(30, 60));
                        break;
                }
                break;
        }
        dom.d_weathert.style.backgroundColor = dom.d_weathert.style.color = "inherit";
        dom.d_weathert.innerHTML = w_manager.curr.name;
        dom.d_weathert.style.color = w_manager.curr.c ? w_manager.curr.c : "inherit";
        dom.d_weathert.style.backgroundColor = w_manager.curr.bc ? w_manager.curr.bc : "inherit";
        switch (w_manager.curr.id) {
            case weather.sunny.id:
                if (getHour() > 4 && getMinute() >= 30 && getHour() <= 6) {
                    dom.d_weathert.innerHTML = "Sunrise";
                    dom.d_weathert.style.color = "#ffef33";
                    dom.d_weathert.style.backgroundColor = "#bf495f";
                } else if (getHour() >= 20 && getHour() <= 21) {
                    dom.d_weathert.innerHTML = "Dusk";
                    dom.d_weathert.style.color = "yellow";
                    dom.d_weathert.style.backgroundColor = "#e8421c";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Bright Night";
                    dom.d_weathert.style.color = "cornflowerblue";
                    dom.d_weathert.style.backgroundColor = "#1d4677";
                }
                break;
            case weather.cloudy.id:
                if (getHour() > 4 && getMinute() >= 30 && getHour() <= 6) {
                    dom.d_weathert.innerHTML = "Sunrise";
                    dom.d_weathert.style.color = "#ffef33";
                    dom.d_weathert.style.backgroundColor = "#bf495f";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Night";
                    dom.d_weathert.style.color = "#69e1e6";
                    dom.d_weathert.style.backgroundColor = "#091523";
                }
                break;
            case weather.overcast.id:
                if (getHour() >= 18 && getHour() <= 21) {
                    dom.d_weathert.innerHTML = "Dusk";
                    dom.d_weathert.style.color = "yellow";
                    dom.d_weathert.style.backgroundColor = "#e8421c";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Night";
                    dom.d_weathert.style.color = "#69e1e6";
                    dom.d_weathert.style.backgroundColor = "#091523";
                }
                break;
            case weather.rain.id:
                if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Rainy Night";
                    dom.d_weathert.style.color = "cyan";
                    dom.d_weathert.style.backgroundColor = "#111f63";
                }
                break;
            case weather.misty.id:
                if (getHour() > 4 && getMinute() >= 30 && getHour() <= 6) {
                    dom.d_weathert.innerHTML = "Misty Morning";
                    dom.d_weathert.style.color = "#ffb91d";
                    dom.d_weathert.style.backgroundColor = "#926b64";
                } else if (getHour() >= 18 && getHour() <= 21) {
                    dom.d_weathert.innerHTML = "Dusk";
                    dom.d_weathert.style.color = "yellow";
                    dom.d_weathert.style.backgroundColor = "#e8421c";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Misty Night";
                    dom.d_weathert.style.color = "#1f69a9";
                    dom.d_weathert.style.backgroundColor = "#2c3044";
                }
                break;
            case weather.foggy.id:
                if (getHour() > 4 && getMinute() >= 30 && getHour() <= 6) {
                    dom.d_weathert.innerHTML = "Foggy Morning";
                    dom.d_weathert.style.color = "#ffc94f";
                    dom.d_weathert.style.backgroundColor = "#8e8280";
                } else if (getHour() >= 18 && getHour() <= 21) {
                    dom.d_weathert.innerHTML = "Dusk";
                    dom.d_weathert.style.color = "yellow";
                    dom.d_weathert.style.backgroundColor = "#e8421c";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Foggy Night";
                    dom.d_weathert.style.color = "#6dbbff";
                    dom.d_weathert.style.backgroundColor = "#273267";
                }
                break;
            case weather.drizzle.id:
                if (getHour() >= 22 && getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Night Drizzle";
                    dom.d_weathert.style.color = "cyan";
                    dom.d_weathert.style.backgroundColor = "#111f63";
                }
                break;
            case weather.clear.id:
                if (getHour() > 4 && getMinute() >= 30 && getHour() <= 6) {
                    dom.d_weathert.innerHTML = "Sunrise";
                    dom.d_weathert.style.color = "#ffef33";
                    dom.d_weathert.style.backgroundColor = "#9c3f3f";
                } else if (getHour() >= 20 && getHour() <= 21) {
                    dom.d_weathert.innerHTML = "Dusk";
                    dom.d_weathert.style.color = "yellow";
                    dom.d_weathert.style.backgroundColor = "#e8421c";
                } else if (getHour() >= 22 || getHour() <= 3) {
                    dom.d_weathert.innerHTML = "Starry Night";
                    dom.d_weathert.style.color = "#ffff66";
                    dom.d_weathert.style.backgroundColor = "#00397b";
                }
                break;
        }
    }
    w_manager.curr.ontick();
    onSeasonTick(ses);
}

function setWeather(w, d) {
    w_manager.curr = w;
    w_manager.duration = d;
    dom.d_weathert.style.backgroundColor = dom.d_weathert.style.color = "inherit";
    dom.d_weathert.innerHTML = w_manager.curr.name;
    //empty(dom.d_weather); icon(dom.d_weather,1,1,32,32)
    if (w.frain === true) {
        global.flags.israin = true;
        global.flags.issnow = false;
        dom.d_anomaly.innerHTML = "🌧";
    } else if (w.fsnow === true) {
        global.flags.issnow = true;
        global.flags.israin = false;
        dom.d_anomaly.innerHTML = "❄️";
    } else {
        global.flags.israin = false;
        dom.d_anomaly.innerHTML = "";
        global.flags.issnow = false;
    }
    if (w.c) dom.d_weathert.style.color = w.c;
    if (w.bc) dom.d_weathert.style.backgroundColor = w.bc;
}
setWeather(weather.clear, 600);

function isWeather(weather) {
    return w_manager.curr.id === weather.id;
}
wManager();
dom.d_time.innerHTML = "<small>" + getDay(global.flags.tmmode) + "</small> " + timeDisp(time);

function onSeasonTick(season) {
    switch (season) {
        case 4:
            if (global.stat.wsnrest > 0) {
                global.stat.wsnrest--;
                return;
            }
            if (!global.flags.inside) {
                if (!effect.cold.active) giveEff(you, effect.cold, 5);
                else {
                    if (w_manager.curr.id === weather.snow.id || w_manager.curr.id === weather.sstorm.id) {
                        effect.cold.duration += rand(3, 7);
                        giveSkExp(skl.coldr, 0.02);
                    } else effect.cold.duration += rand(1, 3);
                    if (effect.wet.active) {
                        effect.cold.duration += rand(5, 10);
                        effect.wet.duration -= 5;
                    }
                }
            }
            if (global.stat.wsnburst <= 0) {
                global.stat.wsnburst = rand(200, 1300);
                global.stat.wsnrest = rand(20, 100);
            }
            global.stat.wsnburst--;
            break;
    }
}

function getMinute() {
    return time.minute % 60;
}
function getHour() {
    return time.hour % 24;
}
function getDay(n) {
    return n === 1
        ? global.text.d_l[time.day % 7]
        : n === 2
        ? global.text.d_s[time.day % 7]
        : global.text.d_j[time.day % 7];
}
function getMonth() {
    return (time.month % 12) + 1;
}
function getYear() {
    return time.year;
}
function getLunarPhase() {
    return ((time.day % 62.64) / 7.83) << 0;
}
function getSeason(flag) {
    if (getMonth() > 2 && getMonth() <= 5) return !flag ? 1 : "Spring";
    else if (getMonth() > 5 && getMonth() <= 8) return !flag ? 2 : "Summer";
    else if (getMonth() > 8 && getMonth() <= 11) return !flag ? 3 : "Autumn";
    else return !flag ? 4 : "Winter";
}

function timeConv(chrono) {
    chrono.year = (chrono.minute / 518400) << 0;
    chrono.month = (chrono.minute / 43200) << 0;
    chrono.day = (chrono.minute / 1440) << 0;
    chrono.hour = (chrono.minute / 60) << 0;
}

function timeDisp(time, future) {
    let time_t = time;
    if (future) {
        time_t = copy(time);
        time_t.minute += future;
    }
    timeConv(time_t);
    let mm = time_t.minute % 60;
    if (mm < 10) mm = "0" + mm;
    return (
        time_t.year +
        "/" +
        ((time_t.month % 12) + 1) +
        "/" +
        ((time_t.day % 30) + 1) +
        " " +
        (time_t.hour % 24) +
        ":" +
        mm
    );
}

function dropC(crt, t) {
    t = t || 1;
    for (let j in crt.drop)
        if (!crt.drop[j].cond || (!!crt.drop[j].cond && crt.drop[j].cond() === true))
            if (random() < crt.drop[j].chance + (crt.drop[j].chance / 100) * you.luck) {
                giveItem(crt.drop[j].item, !!crt.drop[j].min ? rand(crt.drop[j].min, crt.drop[j].max) : t);
                if (you.mods.lkdbt > 0 && random() < you.mods.lkdbt) giveItem(crt.drop[j].item);
                let d = global.drdata["d" + crt.id];
                if (!d) {
                    d = global.drdata["d" + crt.id] = [];
                    d[j] = 1;
                } else d[j] = 1;
            }
    for (let jj in global.wdrop)
        if (random() < global.wdrop[jj].c + (global.wdrop[jj].c / 100) * you.luck) giveItem(global.wdrop[jj].item, t);
    for (let obj in global.current_z.drop)
        if (
            !global.current_z.drop[obj].cond ||
            (!!global.current_z.drop[obj].cond && global.current_z.drop[obj].cond() === true)
        )
            if (
                random() <
                global.current_z.drop[obj].c +
                    (global.current_z.drop[obj].c / 100) * you.luck +
                    (global.current_z.drop[obj].c / 75) * skl.hst.lvl
            ) {
                giveItem(global.current_z.drop[obj].item, t);
                giveSkExp(skl.hst, 0.2);
            }
    if (crt.rnk < 22) {
        let ar = ((crt.rnk - 1) / 3) << 0;
        for (let a in global.rdrop[ar])
            if (random() < global.rdrop[ar][a].c + (global.rdrop[ar][a].c / 100) * you.luck)
                giveItem(global.rdrop[ar][a].item, t);
    }
}

function dropread() {
    let t = Object.keys(global.drdata);
    let ids = [];
    for (let a in t) ids[a] = Number(t[a].substring(1));
    for (let a in ids) {
        for (let b in creature) {
            if (ids[a] === creature[b].id) {
                let dt = global.drdata[Object.keys(global.drdata)[a]];
                for (let c = 0; c < dt.length; c++) {
                    if (dt[c]) console.log(creature[b].drop[c].item.name);
                    else console.log("??????");
                }
            }
        }
    }
}

function roll(itm, c, mi, ma) {
    mi = mi || 1;
    let r = random();
    if (r < c + (c / 100) * you.luck) giveItem(itm, !!ma ? rand(mi, ma) : rand(mi));
}

function handStr() {
    return (
        (((5000 + you.str * 800) *
            (1 + you.lvl * 0.03) *
            (1 + skl.unc.lvl * 0.1 + skl.fgt.lvl * 0.08 + skl.tghs.lvl * 0.11)) /
            1000) <<
        0
    );
}

function format3(a) {
    if (a.length > 3) {
        let b = new String();
        for (let i = 0; i < a.length; i++) {
            if ((a.length - i) % 3 == 0 && i > (a > 0 ? 0 : 1)) b += ",";
            b += a[i];
        }
        return b;
    }
    return a;
}

function formatw(a) {
    let b = ((Math.log(Math.abs(a + 1)) * 0.43429448190325178) | 0) + 1;
    if (b > 3) {
        let n = (a / 1000 ** (((b - 1) / 3) << 0)) * 10;
        return ((n - ~~n >= 0.5 ? 1 : 0) + ~~n) / 10 + global.text.nt[((b - 4) / 3) << 0];
    }
    return a;
}

function d_loc(text) {
    let txt;
    if (global.flags.inside === true) txt = "|" + text + "|";
    else txt = text;
    dom.d_lctt.innerHTML = txt;
    global.current_l.locn = text;
}

function rfeff(what) {
    let t = "";
    for (let a in what.sector)
        if (what.sector[a].effectors)
            for (let b in what.sector[a].effectors)
                t +=
                    '<span style="color:' +
                    what.sector[a].effectors[b].e.c +
                    ';font-size:1.2em">&nbsp' +
                    what.sector[a].effectors[b].e.x +
                    "<span>";
    if (what.effectors)
        for (let a in what.effectors)
            t +=
                '<span style="color:' +
                what.effectors[a].e.c +
                ';font-size:1.2em">&nbsp' +
                what.effectors[a].e.x +
                "<span>";
    dom.d_lctte.innerHTML = t;
}

function lvlup(p, t) {
    if (t === 0) {
        p.hp = p.hp_r;
        p.str = p.str_r;
        p.agl = p.agl_r;
        p.spd = p.spd_r;
    } else {
        t = t || 1;
        p.lvl += t;
        let sb = randf(t * p.stat_p[1], 2 * t * p.stat_p[1]);
        p.str_r += sb;
        let sa = randf(t * p.stat_p[2], 2 * t * p.stat_p[2]);
        p.agl_r += sa;
        let si = randf(t * p.stat_p[3], 2 * t * p.stat_p[3]);
        p.int_r += si;
        let hpp;
        if (p.id === you.id)
            hpp = Math.round(rand(1.4 * Math.log(p.lvl) * t * p.stat_p[0], 1.8 * p.lvl * t * p.stat_p[0]));
        else hpp = Math.round(rand(1.8 * Math.log(p.lvl) * t * p.stat_p[0], 2.2 * p.lvl * t * p.stat_p[0]));
        p.hp_r += hpp;
        p.hpmax += hpp;
        p.hp += hpp;
        if (p.id !== you.id) p.hp = p.hpmax = p.hp_r;
        if (p.id != you.id) p.exp = (p.exp * (1 + t / 5) + 1) << 0;
        else {
            dom.d3.update();
            msg("Leveled Up " + you.lvl, "orange");
            msg("STR +" + Math.round(sb), "darkturquoise");
            msg_add(" | AGL +" + Math.round(sa), "darkturquoise");
            msg_add(" | INT +" + Math.round(si), "darkturquoise");
            msg_add(" | HP +" + hpp, "darkturquoise");
            you.expnext_t = you.expnext();
            if (you.eqp[0].id === 10000) {
                you.eqp[0].cls[2] = (you.lvl / 4) << 0;
                you.eqp[0].aff[0] = (you.lvl / 5) << 0;
                you.eqp[0].ctype = 2;
            }
            if (global.stat.deadt < 1 && you.lvl >= 20) giveTitle(ttl.ndthextr);
        }
    }
    p.stat_r();
    update_d();
}

function giveExp(exp, r, g, b) {
    if (!r) exp = Math.round(exp * you.exp_t * (0.4 + you.efficiency() * 0.6)) - (you.lvl - 1);
    exp = exp <= 0 ? 1 : exp;
    if (!b) {
        if (global.flags.m_blh === false)
            if (!g) {
                msg("EXP: +" + formatw(exp), "hotpink");
                global.stat.exptotl += exp;
            }
    } else {
        msg("EXP: +" + formatw(exp), "hotpink");
        global.stat.exptotl += exp;
    }
    if (you.exp + exp < you.expnext_t) you.exp += exp;
    else {
        let extra = you.exp + exp - you.expnext_t;
        you.exp = 0;
        lvlup(you);
        giveExp(extra, true, true);
    }
    dom.d5_2_1.update();
}

function giveTitle(title, lv) {
    if (title.have === false) {
        global.titles.push(title);
        if (title.id !== 0) global.titlese.push(title);
        you.title = title;
        title.have = true;
        if (!title.tget && title.talent) {
            title.talent();
            title.tget = true;
        }
        title.onGet();
        for (let x in global.ttlschk) global.ttlschk[x]();
        if (!lv) {
            msg("New Title Earned! " + col('"' + title.name + '"', "orange"), "cyan", title, 5);
            dom.d3.update();
        }
    } else return;
}

function isort(type, flags) {
    empty(dom.inv_con);
    if (type === 1) for (let k = 0; k < inv.length; k++) renderItem(inv[k]);
    else {
        global.sinv = [];
        for (let k = 0; k < inv.length; k++)
            if (type === inv[k].stype) {
                global.sinv.push(inv[k]);
                renderItem(inv[k]);
            }
    }
    global.sm = type;
    if (flags && flags.tr) iftrunkopenc(1);
}

function rsort(type) {
    empty(dom.ct_bt1_1);
    if (type === 0 || !type) for (let ind in global.rec_d) renderRcp(global.rec_d[ind]);
    else {
        global.srcp = [];
        for (let k = 0; k < global.rec_d.length; k++)
            if (type === global.rec_d[k].type) global.srcp.push(global.rec_d[k]);
        for (let k = 0; k < global.srcp.length; k++) renderRcp(global.srcp[k]);
    }
    global.rm = type;
}

function objempty(obj) {
    for (let a in obj) return false;
}

function kill(obj) {
    obj = null;
    // delete obj;
}

function effAct_test() {
    for (let index in you.eff) you.eff[index].use(creature.bat);
}

function canRead() {
    if (!global.flags.civil || global.flags.civil.btl) {
        msg("It is too dangerous to read right now", "red");
        return false;
    }
    if (global.flags.rdng) {
        msg("You're already reading", "orange");
        return false;
    }
    if (global.flags.work) {
        msg("You have a job to do", "orange");
        return false;
    }
    if (global.flags.busy) {
        msg("You'll have to stop what you're doing first", "orange");
        return false;
    }
    if (global.flags.isshop) {
        msg("This isn't the library", "orange");
        return false;
    }
    if (global.flags.sleepmode) {
        msg("You can't read while sleeping", "orange");
        return false;
    }
    return true;
}

function canScout(what) {
    if (what.data.scoutm) {
        for (let a in what.scout)
            if (what.data.gets[a] !== true && (!what.scout[a].cond || what.scout[a].cond() === true)) return 1;
        return 2;
    }
    return 3;
}

function scoutGeneric(chs) {
    if (global.flags.isdark && !cansee()) return msg("You can't see anything", "grey");
    let sct = select(chs.scout);
    let idx = chs.scout.indexOf(sct);
    giveSkExp(skl.scout, 0.3);
    chs.data.scout += 2 * (1 + skl.scout.lvl * 0.2);
    let m = 1;
    if (chs.data.scout >= chs.data.scoutm) {
        m = 5;
        chs.data.scout = 0;
    }
    if (
        (!sct.cond || sct.cond() === true) &&
        !chs.data.gets[idx] &&
        random() <= sct.c * m * (1 + skl.scout.lvl * 0.15) * (1 + chs.data.gotmod * 0.2)
    ) {
        global.stat.dsct++;
        chs.data.gotmod++;
        sct.f();
        giveSkExp(skl.scout, sct.exp ? sct.exp : 0.5 / sct.c);
    }
    let t = 2;
    for (let a in global.current_l.sector) {
        let m = canScout(global.current_l.sector[a]);
        if (m === 1) t = m;
    }
    if (canScout(global.current_l) >= 2 && t >= 2) {
        deactivateAct(act.scout);
        msg("There doesn't seem to be anything of interest left in this area");
    }
}

function disassembleGeneric(obj) {
    for (let a in obj.dss) {
        let am = obj.dss[a].amount;
        if (obj.dss[a].q) am = (am + am * (obj.dss[a].q * skl.dssmb.lvl)) << 0;
        if (obj.dss[a].max) if (am > obj.dss[a].max) am = obj.dss[a].max;
        let c = 1;
        if (obj.slot) c = obj.dp / obj.dpmax;
        am = Math.ceil(am / (2 - c));
        giveItem(obj.dss[a].item, am);
    }
    giveSkExp(skl.dssmb, (2 ** obj.rar || 1) * 5 - 9.5);
    global.stat.dsst++;
    if (obj.slot) removeItem(obj);
    else {
        obj.amount--;
        if (obj.amount <= 0) removeItem(obj);
        else if (obj.stype === global.sm) updateInv(global.sinv.indexOf(obj));
        else if (global.sm === 1) updateInv(inv.indexOf(obj));
    }
}

global.text.ssns = ["春", "夏", "秋", "冬"];

function wdrseason(flag) {
    let s;
    s = !flag ? getSeason(true) : global.text.ssns[getSeason() - 1];
    dom.d_weathers.innerHTML = "[" + s + "]";
    switch (getSeason()) {
        case 1:
            dom.d_weathers.style.color = "springgreen";
            dom.d_weathers.style.backgroundColor = "#253";
            break;
        case 2:
            dom.d_weathers.style.color = "lime";
            dom.d_weathers.style.backgroundColor = "#141";
            break;
        case 3:
            dom.d_weathers.style.color = "yellow";
            dom.d_weathers.style.backgroundColor = "#631";
            break;
        case 4:
            dom.d_weathers.style.color = "ghostwhite";
            dom.d_weathers.style.backgroundColor = "#556";
            break;
    }
}

function ontick() {
    global.stat.tick++;
    time.minute += global.timescale;
    wManager();
    for (let a in plans[0]) plans[0][a].f();
    dom.d_time.innerHTML = "<small>" + getDay(global.flags.tmmode || 2) + "</small> " + timeDisp(time); //global.stat.seed1=(random()*7e+7<<7)%7&7
    global.current_l.onStay();
    runEffectors(global.current_l.effectors);
    for (let a in sectors) {
        sectors[a].onStay();
        runEffectors(sectors[a].effectors);
    }
    giveSkExp(skl.aba, 0.004);
    let timeh = (time.minute / DAY) << 0;
    if (global.timehold !== timeh) {
        global.timehold = timeh; //proc when day passes
        for (let a in plans[1]) plans[1][a].f();
        for (let vnd in vendor) vendor[vnd].onDayPass();
        empty(dom.d_moon);
        dom.d_moon.innerHTML = global.text.lunarp[getLunarPhase()][0];
        addDesc(dom.d_moon, null, 2, "Lunar Phase", global.text.lunarp[getLunarPhase()][1]);
        wdrseason(global.flags.ssngaijin);
        if (getSeason() === 4) global.flags.iscold = true;
        else global.flags.iscold = false;
        global.offline_evil_index += 0.00008;
        /////////////////////////////////
        let timew = (time.minute / WEEK) << 0;
        if (global.timewold !== timew) {
            global.timewold = timew; //proc when week passes
            for (let a in plans[2]) plans[2][a].f();
        }
    }
    let h = getHour();
    if (h > 5 && h < 22) {
        global.flags.isday = true;
        dom.d_moon.style.display = "none";
    } else {
        if (global.flags.inside === false && random() < 0.00002 * you.mods.stdstps) {
            msg("A star particle landed on you!", "gold", null, null, "darkblue");
            giveItem(item.stdst);
        }
        global.flags.isday = false;
        dom.d_moon.style.display = "";
    }
    for (let g = 0; g < you.eff.length; g++)
        if (you.eff[g].type === 3 || you.eff[g].type === 5 || you.eff[g].type === 6)
            you.eff[g].use(you.eff[g].y, you.eff[g].z);
    for (let g = 0; g < global.current_m.eff.length; g++)
        if (
            global.current_m.eff[g].type === 3 ||
            global.current_m.eff[g].type === 5 ||
            global.current_m.eff[g].type === 6
        )
            global.current_m.eff[g].use(global.current_m.eff[g].y, global.current_m.eff[g].z);
    if (global.flags.btl === true) timers.btl = setTimeout(fght(you, global.current_m), 1000 / global.fps);
    else giveSkExp(skl.mdt, 0.0065 * (1 + skl.ptnc.lvl * 0.15) * (effect.incsk.active === true ? 2 : 1));
    for (let obj in furn) furn[obj].use();
    //for(let q in qsts) qsts[q].tracker();
    if (you.sat > 0) {
        let lose = you.mods.sdrate;
        if (global.flags.iswet === true) lose *= 3 / (1 + skl.abw.lvl * 0.03);
        if (global.flags.iscold === true) lose += effect.cold.duration / 1000 / (1 + skl.coldr.lvl * 0.05);
        you.sat -= lose;
    } else giveSkExp(skl.fmn, 0.1);
    if (global.flags.sleepmode) global.stat.timeslp += global.timescale;
    if (random() < 0.00000001) {
        let au = new Audio("laugh6.wav");
        au.play();
    }
    dom.d5_3_1.update();
}

(function update() {
    setTimeout(function () {
        update();
        ontick();
    }, 1000 / global.fps);
})();

function select(arr) {
    return arr[rand(arr.length - 1)];
}

function nograd(s) {
    if (s === true) {
        for (let i = 0; i < document.getElementsByClassName("d2").length; i++)
            document.getElementsByClassName("d2")[i].style.background = "#0e574b";
        for (let i = 0; i < document.getElementsByClassName("d3").length; i++)
            document.getElementsByClassName("d3")[i].style.background = "#0e574b";
        for (let i = 0; i < document.getElementsByClassName("hp").length; i++)
            document.getElementsByClassName("hp")[i].style.background = "#91e6b6";
        for (let i = 0; i < document.getElementsByClassName("exp").length; i++)
            document.getElementsByClassName("exp")[i].style.background = "#ea9c83";
        for (let i = 0; i < document.getElementsByClassName("en").length; i++)
            document.getElementsByClassName("en")[i].style.background = "#4f3170";
        dom.inv_ctx.style.background = dom.inv_control_b.style.background = dom.ctrmg.style.background = "#00224e";
        dom.d7m_c.style.background = "#392c72";
        for (let i = 0; i < document.styleSheets[0].rules.length; i++)
            if (
                document.styleSheets[0].rules[i].selectorText ==
                ".opt_c:hover, .ct_bts:hover, .chs:hover, .bts:hover, .bbts:hover, .bts_b:hover, .inv_slot:hover, .bts_m:hover"
            )
                document.styleSheets[0].rules[i].style.background = "#0e574b";
        global.flags.grd_s = false;
    } else {
        for (let i = 0; i < document.getElementsByClassName("d2").length; i++)
            document.getElementsByClassName("d2")[i].style.background =
                "linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))";
        for (let i = 0; i < document.getElementsByClassName("d3").length; i++)
            document.getElementsByClassName("d3")[i].style.background =
                "linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))";
        for (let i = 0; i < document.getElementsByClassName("hp").length; i++)
            document.getElementsByClassName("hp")[i].style.background =
                "linear-gradient(90deg,rgb(254,239,157),rgb(45,223,206))";
        for (let i = 0; i < document.getElementsByClassName("exp").length; i++)
            document.getElementsByClassName("exp")[i].style.background =
                "linear-gradient(90deg,rgb(254,239,157),rgb(219,119,158))";
        for (let i = 0; i < document.getElementsByClassName("en").length; i++)
            document.getElementsByClassName("en")[i].style.background =
                "linear-gradient(270deg,rgb(124,68,112),rgb(29,29,113))";
        dom.inv_ctx.style.background =
            dom.inv_control_b.style.background =
            dom.ctrmg.style.background =
                "linear-gradient(90deg,rgb(0,5,51),rgb(0,65,107))";
        dom.d7m_c.style.background = "linear-gradient(270deg,rgb(84,28,112),rgb(29,62,116))";
        for (let i = 0; i < document.styleSheets[0].rules.length; i++)
            if (
                document.styleSheets[0].rules[i].selectorText ==
                ".opt_c:hover, .ct_bts:hover, .chs:hover, .bts:hover, .bbts:hover, .bts_b:hover, .inv_slot:hover, .bts_m:hover"
            )
                document.styleSheets[0].rules[i].style.background =
                    "linear-gradient(90deg,rgb(25,129,108),rgb(1,41,39))";
        global.flags.grd_s = true;
    }
}

function reduce(itm, am) {
    if (am) {
        itm.amount = itm.amount - am <= 0 ? 0 : itm.amount - am;
    }
    if (itm.amount <= 0) {
        removeItem(itm);
        updateTrunkLeftItem(itm, true);
    } else if (global.sm === 1) updateInv(inv.indexOf(itm));
    else if (global.sm === itm.stype) updateInv(global.sinv.indexOf(itm));
    updateTrunkLeftItem(itm);
}
function cansee() {
    if ((global.flags.isdark && you.mods.light > 0) || skl.ntst.lvl >= 12) return true;
}

function col(txt, c, bc) {
    let cc;
    let bcc;
    if (c) cc = "color:" + c + ";";
    if (bc) bcc = "background-color:" + bc + ";";
    return "<span" + (c ? ' style="' + cc + (bc ? bcc : "") + '"' : "") + ">" + txt + "</span>";
}

function usePlayerWeaponSkill() {
    switch (you.eqp[0].wtype) {
        case 0:
            skl.unc.use();
            break;
        case 1:
            skl.srdc.use();
            break;
        case 2:
            skl.axc.use();
            break;
        case 3:
            skl.knfc.use();
            break;
        case 4:
            skl.plrmc.use();
            break;
        case 5:
            skl.hmrc.use();
            break;
        case 6:
            skl.stfc.use();
            break;
    }
}

function printBodyPartHit(partNumber) {
    switch (partNumber) {
        case 2:
            msg_add(" (head)", "orange");
            break;
        case 3:
            msg_add(" (body)", "orange");
            break;
        case 4:
            msg_add(" (L hand)", "orange");
            break;
        case 5:
            msg_add(" (R hand)", "orange");
            break;
        case 6:
            msg_add(" (legs)", "orange");
            break;
    }
}

function printCritIfCrit() {
    if (global.flags.crti) {
        msg_add(" CRIT! ", "yellow");
        global.flags.crti = false;
    }
}

function printDamageNumber(ddmg) {
    let col;
    let bcol = "";
    let shd = "";
    switch (global.atype_d) {
        case 0:
            col = "pink";
            break;
        case 1:
            col = "lime";
            break;
        case 2:
            col = "yellow";
            break;
        case 3:
            col = "orange";
            bcol = "crimson";
            break;
        case 4:
            col = "cyan";
            break;
        case 5:
            col = "lightgoldenrodyellow";
            shd = "gold 0px 0px 5px";
            break;
        case 6:
            col = "thistle";
            shd = "blueviolet 0px 0px 5px";
            break;
    }
    if (ddmg > 9999) formatw(ddmg);
    msg_add(ddmg, col, bcol, shd);
}

function printHitMessage(attackerName, ddmg, targetsPlayer) {
    if (global.mabl.id === 0) msg(attackerName + (targetsPlayer === true ? global.mabl.atrg : global.mabl.btrg));
    else
        msg(
            (targetsPlayer === true ? attackerName : "") +
                (targetsPlayer === true ? global.mabl.atrg : "You " + global.mabl.btrg)
        );
    printHitMessageResult(ddmg, targetsPlayer);
}

function printMultihitMessage(times, attackerName, acc_dmg, targetsPlayer) {
    msg(attackerName + " -> x" + (times - global.miss) + '(<span style="color:lightgrey">' + times + "</span>) for ");
    printHitMessageResult(acc_dmg, targetsPlayer);
    if (time - global.miss > 0) printBodyPartHit(global.target_g);
}

function printHitMessageResult(ddmg, targetsPlayer) {
    printDamageNumber(ddmg);
    printCritIfCrit();
    if (targetsPlayer === true && !global.flags.msd) printBodyPartHit(global.t_n);
}

function doSingleAttack(attacker, defender, isPlayerAttacking) {
    if (isPlayerAttacking) {
        let dm = skl.fgt.use();
        if (you.eqp[0].twoh === true) dm += skl.twoh.use();
        you.str += dm;
        you.int += dm;
        usePlayerWeaponSkill();
    }
    attacker.battle_ai(attacker, defender);
}

function getlastd() {
    switch (global.atkdfty[0]) {
        case 1:
            return '<span style="color:black;background-color:yellow">Struck by lightning</span>';
            break;
        case 2:
            switch (global.atkdfty[1]) {
                case 1:
                    return '<span style="color:red;background-color:darkmagenta">Suffocated from poison</span>';
                    break;
                case 2:
                    return '<span style="color:darkmagenta;">Suffocated from venom</span>';
                    break;
                case 3:
                    return '<span style="color:red;background-color:darkred">Bled out</span>';
                    break;
                case 4:
                    return '<span style="color:white;background-color:black">Rotten from corruption</span>';
                    break;
            }
            break;
        case 3:
            let txt = "";
            let fc = ["", "", ""];
            switch (global.atkdftydt.a) {
                case 0:
                    fc[0] = "pink";
                    break;
                case 1:
                    fc[0] = "lime";
                    break;
                case 2:
                    fc[0] = "yellow";
                    break;
                case 3:
                    fc[0] = "orange";
                    fc[1] = "crimson";
                    break;
                case 4:
                    fc[0] = "cyan";
                    break;
                case 5:
                    fc[0] = "lightgoldenrodyellow";
                    fc[2] = "gold 0px 0px 5px";
                    break;
                case 6:
                    fc[0] = "thistle";
                    fc[2] = "blueviolet 0px 0px 5px";
                    break;
            }
            switch (global.atkdftydt.c) {
                case 0:
                    txt +=
                        '<span style="color:' +
                        fc[0] +
                        ";background-color:" +
                        fc[1] +
                        ";text-shadow:" +
                        fc[2] +
                        '">' +
                        select(["Slashed", "Lacerated", "Cut down", "Hacked"]) +
                        "</span>";
                    break;
                case 1:
                    txt +=
                        '<span style="color:' +
                        fc[0] +
                        ";background-color:" +
                        fc[1] +
                        ";text-shadow:" +
                        fc[2] +
                        '">' +
                        select(["Pierced", "Impaled", "Gored"]) +
                        "</span>";
                    break;
                case 2:
                    txt +=
                        '<span style="color:' +
                        fc[0] +
                        ";background-color:" +
                        fc[1] +
                        ";text-shadow:" +
                        fc[2] +
                        '">' +
                        select(["Smashed", "Crushed", "Destroyed"]) +
                        "</span>";
                    break;
            }
            txt += " by ";
            for (let a in creature)
                if (creature[a].id === global.atkdftydt.id) {
                    txt += creature[a].name;
                    break;
                }
            return txt;
            break;
        default:
            return "what casualty?";
            break;
    }
}

function draggable(root, target) {
    root.addEventListener("mousedown", function (x) {
        global.ctarget = target;
        this.boxoffsetx = x.clientX - parseInt(target.style.left);
        this.boxoffsety = x.clientY - parseInt(target.style.top);
        global.croot = root;
        document.body.addEventListener("mousemove", draggablemove);
    });
    root.addEventListener("mouseup", function (x) {
        global.ctarget = null;
        global.croot = null;
        document.body.removeEventListener("mousemove", draggablemove);
    });
}

function draggablemove(x) {
    if (global.ctarget) {
        global.ctarget.style.left = x.clientX - global.croot.boxoffsetx;
        global.ctarget.style.top = x.clientY - global.croot.boxoffsety;
    }
}

function _dbgman() {
    let g = 0;
    for (let a in chss) if (chss[a].id > g) g = chss[a].id;
    return g;
}
function _dbgitc() {
    let g = 0;
    for (let a in item) g++;
    for (let a in acc) g++;
    for (let a in sld) g++;
    for (a in eqp) g++;
    for (let a in wpn) g++;
    return g;
}
function _dbgspawn(arr, times) {
    let result = [];
    for (let g = 0; g < times; g++) {
        for (let a in arr) {
            let t = 0;
            if (random() < arr[a].chance + (arr[a].chance / 100) * you.luck) {
                for (let b in result) {
                    if (result[b].item.id === arr[a].item.id) {
                        result[b].am++;
                        break;
                    }
                    if (++t === result.length) result.push({ item: arr[a].item, am: 1 });
                }
                if (!result.length > 0) result.push({ item: arr[a].item, am: 1 });
            }
        }
    }
    console.log("Spawn from the drop array " + times + " times\n::RESULT::");
    for (let a in result) console.log(result[a].item.name + ": x" + result[a].am);
    console.log("::END::");
}

function _dbggibberish(w, l) {
    let a = new String();
    for (let b = 0; b < w; b++) {
        lr = rand(1, l);
        for (let c = 0; c < lr; c++) {
            a += String.fromCharCode(rand(40960, 42124));
        }
        a += " ";
    }
    return a;
}

function giveall(what) {
    /*switch(what){
    case item: for(let a in item) giveItem(item[a]);break;
    case wpn: for(let a in wpn) giveItem(wpn[a]);break;
    case eqp: for(let a in eqp) giveItem(eqp[a]);break;
    case acc: for(let a in acc) giveItem(acc[a]);break;
    case ttl: for(let a in ttl) giveTitle(ttl[a]);break;
    case rcp: for(let a in rcp) giveRcp(rcp[a]);break;
  }*/
}

function scan(arr, val, am) {
    if (am) {
        for (let obj in arr) if (arr[obj].id === val.id && arr[obj].amount >= am) return true;
    } else for (let obj in arr) if (arr[obj] === val) return true;
}

//finder functions
function scanbyid(arr, val) {
    for (let obj in arr) if (arr[obj].id === val) return true;
}
function scanbyuid(arr, val) {
    for (let obj in arr) if (arr[obj].data.uid === val) return true;
}
function find(arr, val) {
    for (let obj in arr) if (arr[obj] === val) return arr[obj];
}
function findbyid(arr, val) {
    for (let obj in arr) if (arr[obj].id === val) return arr[obj];
}
function wearing(itm) {
    for (let obj in you.eqp) if (itm.data.uid === you.eqp[obj].data.uid && you.eqp[obj].id !== 10000) return true;
}
function wearingany(itm) {
    for (let obj in you.eqp) if (itm.id === you.eqp[obj].id && you.eqp[obj].id !== 10000) return true;
}
function findbest(arr, itm) {
    let temp = [];
    for (let a in arr) if (arr[a].id === itm.id) temp.push(arr[a]);
    return temp.sort(function (a, b) {
        if (a.dp > b.dp) return -1;
        return 1;
    });
}
function findworst(arr, itm) {
    let temp = [];
    for (let a in arr) if (arr[a].id === itm.id) temp.push(arr[a]);
    return temp.sort(function (a, b) {
        if (a.dp < b.dp) return -1;
        return 1;
    });
}

function addPlan(plan, data) {
    let p = deepCopy(plan);
    if (data) p.data = data;
    plans[plan.id].push(p);
}

function deepCopy(o) {
    let copy = o,
        k;
    if (o && typeof o === "object") {
        copy = Object.prototype.toString.call(o) === "[object Array]" ? [] : {};
        for (let k in o) {
            copy[k] = deepCopy(o[k]);
        }
    }
    return copy;
}

function copy(o) {
    let res = new Object();
    for (let a in o) res[a] = o[a];
    return res;
}

function empty(dom) {
    while (dom.lastChild) {
        dom.removeChild(dom.lastChild);
    }
}

test.maps = {};
test.maps.cellsize = 20;
test.maps.mapdata = [];
test.maps.mapdata[0] = {};
test.maps.mapdata[0].data = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 2, 3, 1, 1, 3, 2, 0, 1],
    [1, 2, 3, 1, 0, 1, 1, 0, 0, 0, 1],
    [1, 1, 0, 1, 0, 1, 1, 1, 2, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 3, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
];
test.maps.mapdata[0].c = ["white", "grey", "red", "ghostwhite"];
test.maps.mapdata[0].d = ["corridor", "wall", "secret", "secret enter"];

function _drawmap(mapdata) {
    if (test.maps.gui) {
        empty(test.maps.gui);
        document.body.removeChild(test.maps.gui);
        delete test.maps.gui;
        empty(test.maps.guioverlay);
        document.body.removeChild(test.maps.guioverlay);
        delete test.maps.guioverlay;
    }
    let size = test.maps.cellsize;
    test.maps.gui = addElement(document.body, "canvas");
    test.maps.gui.style.position = "absolute";
    test.maps.gui.style.top = 0;
    test.maps.gui.style.left = 0;
    test.maps.guit = test.maps.gui.getContext("2d");
    test.maps.guioverlay = addElement(document.body, "canvas");
    test.maps.guioverlay.style.position = "absolute";
    test.maps.guioverlay.width = window.innerWidth;
    test.maps.guioverlay.height = window.innerHeight;
    test.maps.guioverlay.style.pointerEvents = "none";
    test.maps.guioverlay.style.top = 0;
    test.maps.guioverlay.style.left = 0;
    draggable(test.maps.gui, test.maps.gui);
    let canvas = test.maps.gui;
    let tmain = test.maps.guit;
    let tmaino = test.maps.guioverlay.getContext("2d");
    canvas.height = mapdata.data.length * size;
    canvas.width = mapdata.data[0].length * size;
    for (let y in mapdata.data) {
        for (let x in mapdata.data[y]) {
            tmain.fillStyle = mapdata.c[mapdata.data[y][x]];
            tmain.fillRect(x * size, y * size, size, size);
        }
    }
    // mapdata.guicache = tmain.getImageData(0,0,canvas.width,canvas.height);
    test.maps.gui.addEventListener("mousemove", (xy) => {
        //tmain.clearRect(0,0,canvas.height,canvas.width)
        tmaino.clearRect(0, 0, test.maps.guioverlay.height, test.maps.guioverlay.width);
        //tmain.putImageData(mapdata.guicache,0,0)
        let l = parseInt(test.maps.gui.style.left);
        let t = parseInt(test.maps.gui.style.top);
        let cx = xy.clientX - parseInt(test.maps.gui.style.left);
        let cy = xy.clientY - parseInt(test.maps.gui.style.top);
        tmaino.strokeStyle = "lime";
        tmaino.strokeRect(l + ((cx / size) << 0) * size, t + ((cy / size) << 0) * size, size, size);
        tmaino.strokeStyle = "red";
        tmaino.beginPath();
        tmaino.moveTo(cx + 20 + l, cy + 20 + t);
        tmaino.lineTo(cx + 35 + l, cy + 30 + t);
        tmaino.lineTo(cx + 90 + l, cy + 30 + t);
        tmaino.stroke();
        tmaino.closePath();
        tmaino.font = 'italic  bold .6em "MS Gothic"';
        tmaino.fillStyle = "crimson";
        tmaino.fillText("X:" + (((cx / size) << 0) + 1) + " Y:" + (((cy / size) << 0) + 1), cx + 40 + l, cy + 45 + t);
        tmaino.fillText(mapdata.d[mapdata.data[(cy / size) << 0][(cx / size) << 0]], cx + 40 + l, cy + 25 + t);
    });
    test.maps.gui.addEventListener("mouseleave", () => {
        tmaino.clearRect(0, 0, test.maps.guioverlay.height, test.maps.guioverlay.width);
    });
}

/*pts=[];
wind = -2;
canvas = addElement(document.body,'canvas'); canvas.style.position='absolute'; canvas.style.top=canvas.style.left=0; canvas.style.pointerEvents='none'
tmain = canvas.getContext('2d'); canvas.height = window.innerHeight; canvas.width = window.innerWidth;
tmain.globalCompositeOperation='destination-over'; tmain.fillStyle='white'; tmain.font='20px MS Gothic'; 
drawsnow = setInterval(()=>{ //tmain.clearRect(0,0,window.innerWidth,window.innerHeight); 
  for(let a in pts){ 
    let p = pts[a]; p.windtimedest>p.windtime?p.windtime++:p.windtime--;
    if(p.windtime===p.windtimedest) {p.windtimedest=rand(550); p.windold=p.wind; p.wind = random()*wind}
    p.y+=.5; p.x+=(p.wind-p.windold)*(Math.min(p.windtimedest/Math.max(p.windtimedest,p.windtime)))
    tmain.fillText(p.c,p.x,p.y); 
    if(p.y>=window.innerHeight) pts.splice(pts[a],1);
  }
  if(random()<.1){pts.push({x:rand(window.innerWidth*1.5+10),y:0,wind:.1,windtimedest:1,switch:true,windold:.1,windded:0,windtime:0,c:select(['*',"'",'.','。'])})}
},10)*/

function _drawmwindow() {
    if (test.mguic) {
        empty(test.mguic);
        document.body.removeChild(test.mguic);
        delete test.mguic;
    }
    test.mguic = addElement(document.body, "div");
    test.mguic.style.height = 500;
    test.mguic.style.width = 500;
    test.mguic.style.padding = 2;
    test.mguic.style.position = "absolute";
    test.mguic.style.top = 100;
    test.mguic.style.left = 100;
    test.mguic.style.border = "2px solid black";
    test.mguic.style.backgroundColor = "#558";
    test.mguid = addElement(test.mguic, "div");
    test.mguid.style.height = 20;
    test.mguid.style.borderBottom = "2px solid rgb(0,40,64)";
    test.mguid.innerHTML = "M A S T E R I E S";
    test.mguid.style.color = "lime";
    test.mguid.style.textAlign = "center";
    test.mguidk = addElement(test.mguid, "div");
    test.mguidk.innerHTML = "✖";
    test.mguidk.style.float = "right";
    test.mguidk.style.color = "black";
    test.mguidk.style.backgroundColor = "crimson";
    test.mguidk.addEventListener("click", function () {
        empty(test.mguic);
        document.body.removeChild(test.mguic);
        delete test.mguic;
    });
    test.mgui = addElement(test.mguic, "canvas");
    test.mgui.offsetx = 0;
    test.mgui.offsety = 0;
    draggable(test.mguid, test.mguic);
    let canvas = test.mgui;
    let tmain = test.mgui.getContext("2d");
    canvas.height = 478;
    canvas.width = 500;
    let HEIGHT = canvas.height;
    let WIDTH = canvas.width;
    let _gr = tmain.createLinearGradient(200, 200, 200, 500);
    _gr.addColorStop(0, "#000");
    _gr.addColorStop(1, "#123");
    tmain.fillStyle = _gr;
    tmain.fillRect(0, 0, WIDTH, HEIGHT);
    tmain.c = canvas;
    tmain._bg = tmain.getImageData(0, 0, WIDTH, HEIGHT);
    _renderm(tmain);
    test.mgui.addEventListener("mousemove", (xy) => {
        for (let a in mastery) {
            let m = mastery[a];
            if (xy.offsetX > m.x - 3 && xy.offsetX < m.x + 53 && xy.offsetY > m.y - 3 && xy.offsetY < m.y + 53) {
                if (test.mgui.selected && test.mgui.selected.id === m.id) {
                    global.dscr.style.top =
                        global.dscr.clientHeight + 60 + xy.clientY > document.body.clientHeight
                            ? xy.clientY +
                              30 +
                              global.dscr.clientHeight -
                              (xy.clientY + 30 + global.dscr.clientHeight - document.body.clientHeight) -
                              global.dscr.clientHeight -
                              30
                            : xy.clientY + 30;
                    global.dscr.style.left =
                        global.dscr.clientWidth + 60 + xy.clientX > document.body.clientWidth
                            ? xy.clientX +
                              30 +
                              global.dscr.clientWidth -
                              (xy.clientX + 30 + global.dscr.clientWidth - document.body.clientWidth) -
                              global.dscr.clientWidth -
                              30
                            : xy.clientX + 30;
                    return;
                }
                test.mgui.selected = m;
                _renderm(tmain);
                if (!m.hidden && (m.dscv || m.have))
                    dscr(xy, null, 12, !m.have ? "????????" : m.name, !m.have ? m.condd : m.desc);
                return;
            }
        }
        if (test.mgui.selected) {
            test.mgui.selected = null;
            empty(global.dscr);
            global.dscr.style.display = "none";
            _renderm(tmain);
        }
    });
    test.mgui.addEventListener("click", (xy) => {
        if (test.mgui.selected && test.mgui.selected.data.lvl < test.mgui.selected.limit && test.mgui.selected.have) {
            test.mgui.selected.data.lvl++;
            test.mgui.selected.onlevel();
            you.stat_r();
            dom.d5_1_1m.update();
            dom.d5_3_1.update();
            global.dscr.children[1].innerHTML = test.mgui.selected.desc();
            _renderm(tmain, true);
        }
    });
}

function _renderm(tmain, forced) {
    tmain.clearRect(0, 0, tmain.c.width, tmain.c.height);
    tmain.putImageData(tmain._bg, 0, 0);
    let ofx = test.mgui.offsetx;
    let ofy = test.mgui.offsety;
    for (let a in mastery) {
        let m = mastery[a];
        if (mastery[a].have) {
            if (m.linkto)
                for (let b in m.linkto) {
                    if (m.data.lvl <= 0 || (m.linkto[b].hidden && !m.linkto[b].have)) break;
                    let p = m.linkto[b];
                    tmain.beginPath();
                    tmain.moveTo(m.x + 25, m.y + 25);
                    tmain.lineTo(p.x + 25, p.y + 25);
                    if (p.have) {
                        tmain.lineWidth = 6;
                        tmain.strokeStyle = "#a44";
                        tmain.stroke();
                        tmain.lineWidth = 2;
                        tmain.strokeStyle = "#ff0";
                        tmain.stroke();
                    } else {
                        tmain.lineWidth = 6;
                        tmain.strokeStyle = "#444";
                        tmain.stroke();
                        tmain.lineWidth = 1;
                        tmain.strokeStyle = "#ccc";
                        tmain.stroke();
                    }
                    tmain.closePath();
                }
        }
        if (m.linkfrom && !m.hidden) {
            let t = m.linkfrom.length;
            for (let c in m.linkfrom) {
                let p = m.linkfrom[c];
                if (p.data.lvl > 0) t--;
            }
            if (t === 0) m.have = true;
            else if (t !== m.linkfrom.length) {
                m.dscv = true;
                tmain.fillStyle = "#555";
                tmain.fillRect(m.x + ofx - 2, m.y + ofy - 2, 54, 54);
                tmain.fillStyle = "grey";
                tmain.fillRect(m.x + ofx, m.y + ofy, 50, 50);
                tmain.fillStyle = "#333";
                tmain.font = ' 1.2em "MS Gothic"';
                tmain.fillText("???", m.x + ofx + 9, m.y + ofy + 33);
            }
        }
        if (m.have) {
            tmain.fillStyle = test.mgui.selected && m.id === test.mgui.selected.id ? "lime" : "red";
            tmain.fillRect(m.x + ofx - 2, m.y + ofy - 2, 54, 54);
            tmain.fillStyle = "rgba(0,0,0,.5)";
            tmain.fillRect(m.x + ofx, m.y + ofy + 54, 50, 9);
            tmain.font = ' .6em "MS PGothic"';
            tmain.fillStyle = m.data.lvl === 0 ? "crimson" : m.data.lvl === m.limit ? "lime" : "yellow";
            tmain.fillText(m.data.lvl + "/" + m.limit, m.x + ofx + 1, m.y + ofy + 62);
            if (m.icon) {
                let data = global._preic2_tmain.getImageData((m.icon[0] - 1) * 50, (m.icon[1] - 1) * 50, 50, 50);
                tmain.putImageData(data, m.x, m.y);
            }
        }
    }
}

function rand(max, min) {
    if (min) return Math.round(random() * (max - min) + min);
    else return Math.round(random() * max);
}

function randf(max, min) {
    if (min) return random() * (max - min) + min;
    else return random() * max;
}

function class__MersenneTwister__(window) {
    var className = "MersenneTwister";

    var $next = "$__next__";

    var N = 624;
    var M = 397;
    var MAG01 = [0x0, 0x9908b0df];

    var F = (window[className] = function () {
        this.mt = new Array(N);
        this.mti = N + 1;

        var a = arguments;
        switch (a.length) {
            case 0:
                this.setSeed(new Date().getTime());
                break;
            case 1:
                this.setSeed(a[0]);
                break;
            default:
                var seeds = new Array();
                for (var i = 0; i < a.length; ++i) {
                    seeds.push(a[i]);
                }
                this.setSeed(seeds);
                break;
        }
    });

    var FP = F.prototype;

    FP.setSeed = function () {
        var a = arguments;
        switch (a.length) {
            case 1:
                if (a[0].constructor === Number) {
                    this.mt[0] = a[0];
                    for (var i = 1; i < N; ++i) {
                        var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
                        this.mt[i] =
                            ((1812433253 * ((s & 0xffff0000) >>> 16)) << 16) + 1812433253 * (s & 0x0000ffff) + i;
                    }
                    this.mti = N;
                    return;
                }

                this.setSeed(19650218);

                var l = a[0].length;
                var i = 1;
                var j = 0;

                for (var k = N > l ? N : l; k != 0; --k) {
                    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
                    this.mt[i] =
                        (this.mt[i] ^ (((1664525 * ((s & 0xffff0000) >>> 16)) << 16) + 1664525 * (s & 0x0000ffff))) +
                        a[0][j] +
                        j;
                    if (++i >= N) {
                        this.mt[0] = this.mt[N - 1];
                        i = 1;
                    }
                    if (++j >= l) {
                        j = 0;
                    }
                }

                for (var k = N - 1; k != 0; --k) {
                    var s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
                    this.mt[i] =
                        (this.mt[i] ^
                            (((1566083941 * ((s & 0xffff0000) >>> 16)) << 16) + 1566083941 * (s & 0x0000ffff))) -
                        i;
                    if (++i >= N) {
                        this.mt[0] = this.mt[N - 1];
                        i = 1;
                    }
                }

                this.mt[0] = 0x80000000;
                return;
            default:
                var seeds = new Array();
                for (var i = 0; i < a.length; ++i) {
                    seeds.push(a[i]);
                }
                this.setSeed(seeds);
                return;
        }
    };

    FP[$next] = function (bits) {
        if (this.mti >= N) {
            var x = 0;

            for (var k = 0; k < N - M; ++k) {
                x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
                this.mt[k] = this.mt[k + M] ^ (x >>> 1) ^ MAG01[x & 0x1];
            }
            for (var k = N - M; k < N - 1; ++k) {
                x = (this.mt[k] & 0x80000000) | (this.mt[k + 1] & 0x7fffffff);
                this.mt[k] = this.mt[k + (M - N)] ^ (x >>> 1) ^ MAG01[x & 0x1];
            }
            x = (this.mt[N - 1] & 0x80000000) | (this.mt[0] & 0x7fffffff);
            this.mt[N - 1] = this.mt[M - 1] ^ (x >>> 1) ^ MAG01[x & 0x1];

            this.mti = 0;
        }

        var y = this.mt[this.mti++];
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;
        return y >>> (32 - bits);
    };

    FP.nextBoolean = function () {
        return this[$next](1) == 1;
    };

    FP.nextInteger = function () {
        return this[$next](32);
    };

    FP.nextLong = function () {
        return this[$next](25) * 2097152 + this[$next](25);
    };

    FP.nextFloat = function () {
        return this[$next](32) / 4294967296.0; // 2^32
    };

    FP.nextDouble = function () {
        return (this[$next](25) * 2097152 + this[$next](25)) / 70368744177664.0; // 2^46
    };
}
class__MersenneTwister__(window);

Math.__MERSENNE_TWISTER__ = new MersenneTwister();
var random = function (s) {
    if (s) Math.__MERSENNE_TWISTER__.setSeed(s);
    return Math.__MERSENNE_TWISTER__.nextFloat();
};

function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
        (h = Math.imul(h ^ str.charCodeAt(i), 3432918353)), (h = (h << 13) | (h >>> 19));
    return function () {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    };
}

/**
 *
 *  Base64 encode / decode
 *  http://www.webtoolkit.info/
 *
 **/

var Base64 = {
    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output =
                output +
                this._keyStr.charAt(enc1) +
                this._keyStr.charAt(enc2) +
                this._keyStr.charAt(enc3) +
                this._keyStr.charAt(enc4);
        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if (c > 127 && c < 2048) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = (c1 = c2 = 0);

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            } else if (c > 191 && c < 224) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    },
};

function utf8_to_b64(str) {
    try {
        return Base64.encode(unescape(encodeURIComponent(str)));
    } catch (err) {
        return "";
    }
}

function b64_to_utf8(str) {
    try {
        return decodeURIComponent(escape(Base64.decode(str)));
    } catch (err) {
        return "";
    }
}
