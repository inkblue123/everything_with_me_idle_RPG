var global = new Object();

let tempt = new Date();

// class Global {
//     constructor() {
//         this.minute = 0;
//         this.hour = 0;
//         this.day = 0;
//         this.month = 0;
//         this.year = 0;
//     }
// }

// global = new Global();
global.home_loc = 111;
global.lst_sve = "?";
global.ver = 470;
global.sm = 1;
global.rm = 0;
global.bg_g = global.bg_r = global.bg_b = 255;
global.s_l = 0;
global.spnew = 0;
global.vsnew = 10;
global.uid = 1;
global.wdwidx = 0;
global.menuo = 0;
global.lastmsgc = 0;
global.sinv = [];
global.srcp = [];
global.drdata = {};
global.lw_op = 0;
global.zone_a_p = [];
global.rec_d = [];
global.e_e = [];
global.e_em = [];
global.titles = [];
global.titlese = [];
global.tstcr = [];
global.atkdftm = [-1, -1, -1];
global.atkdfty = [-1, -1];
global.atkdftydt = {};
global.current_m;
global.current_z;
global.current_l;
global.stat = {
    tick: 0,
    akills: 0,
    fooda: 0,
    foodb: 0,
    foodal: 0,
    foodt: 0,
    ftried: 0,
    moneyg: 0,
    die_p: 0,
    die_p_t: 0,
    ivtntdj: 0,
    athme: 0,
    athmec: 0,
    slvs: 0,
    lgtstk: 0,
    moneysp: 0,
    shppnt: 0,
    exptotl: 0,
    seed1: ((Math.random() * 7e7) << 7) % 7 & 7,
    igtttl: 0,
    msts: [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
    ],
    msks: [0, 0, 0, 0, 0, 0, 0],
    sttime:
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
        (tempt.getSeconds() > 10 ? tempt.getSeconds() : "0" + tempt.getSeconds()),
    buyt: 0,
    rdttl: 0,
    dsst: 0,
    thrt: 0,
    crftt: 0,
    deadt: 0,
    smovet: 0,
    timeslp: 0,
    misst: 0,
    dodgt: 0,
    potnst: 0,
    medst: 0,
    plst: 0,
    jcom: 0,
    qstc: 0,
    popt: 0,
    dsct: 0,
    bloodt: 0,
    rdgtttl: 0,
    cat_c: 0,
    dmgdt: 0,
    dmgrt: 0,
    onesht: 0,
    pts: 0,
    gsvs: 0,
    hbhbsld: 0,
    wsnburst: 50,
    wsnrest: 50,
    indkill: 0,
    coldnt: 0,
    lastver: global.ver,
};
global.hit_a = 0;
global.hit_b = 0;
global.timescale = 1;
global.keytarget;
global.offline_evil_index = 1;
global.flags = {
    btl: false,
    m_freeze: false,
    msd: false,
    m_blh: false,
    crti: false,
    to_pause: false,
    civil: true,
    sleepmode: false,
    loadstate: false,
    eshake: false,
    msgtm: false,
    grd_s: true,
    inside: true,
    israin: false,
    issnow: false,
    iscold: false,
    bstu: false,
    blken: false,
    rtcrutch: false,
    savestate: false,
    expatv: false,
    gameone: false,
    tmmode: 1,
    ssngaijin: true,
    rptbncgt: false,
};
global.spirits = 100;
global.bestiary = [{ a: false }];
global.shortcuts = [];
global.msgs_max = 36;
global.text = new Object();
global.text.nt = [
    "K",
    "M",
    "B",
    "T",
    "Qa",
    "Qi",
    "Sx",
    "Sp",
    "Oc",
    "No",
    "De",
    "Un",
    "DDe",
    "TDe",
    "QaDe",
    "QiDe",
    "Lc",
];
global.fps = 1;
global.text.wecs = [
    ["grey", "inherit"],
    ["white", "inherit"],
    ["cyan", "cyan"],
    ["lime", "green"],
    ["yellow", "red"],
    ["orange", "orange"],
    ["purple", "white"],
];
global.text.lunarp = [
    ["🌑", "New Moon"],
    ["🌒", "Waxing Crescent Moon"],
    ["🌓", "First Quarter Moon"],
    ["🌔", "Waxing Gibbous Moon"],
    ["🌕", "Full Moon"],
    ["🌖", "Waning Gibbous Moon"],
    ["🌗", "Last Quarter Moon"],
    ["🌘", "Waning Crescent Moon"],
];
global.text.eranks = [
    "???",
    "--G",
    "-G",
    "G",
    "G+",
    "-F",
    "F",
    "F+",
    "-E",
    "E",
    "E+",
    "-D",
    "D",
    "D+",
    "-C",
    "C",
    "C+",
    "-B",
    "B",
    "B+",
    "--A",
    "-A",
    "A",
    "A+",
    "A++",
    "--S",
    "-S",
    "S",
    "S+",
    "S++",
    "--SS",
    "-SS",
    "SS",
    "SS+",
    "SS++",
    "--SSS",
    "-SSS",
    "SSS",
    "SSS+",
    "SSS++",
];

export { global };
