var global = new Object();

import { area } from "./Area.js";
let tempt = new Date();
import { item } from "./Item.js";

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
global.current_z = area.nwh;
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
global.text.d_l = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
global.text.d_s = ["Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat.", "Sun."];
global.text.d_j = ["月", "火", "水", "木", "金", "土", "日"];

global.text.alcohol_d = [
  "You drank some alcohol. You feel warm inside.",
  "You drank alcohol. Party on!",
  "You drank lots of alcohol. Are those white mice?",
  "You drank unholy amounts of alcohol. But what do you care?",
  "You embalmed yourself alive with so much alcohol, that even undead will leave your dead body alone.",
];

global.text.kntsct = [
  "Adjustable bend",
  "Adjustable grip hitch",
  "Albright special",
  "Alpine Butterfly",
  "Anchor bend",
  "Angle's loop ",
  "Arbor knot",
  "Artillery loop",
  "Ashley's bend",
  "Axle hitch",
  "Bachmann knot",
  "Bag knot",
  "Bait loop",
  "Barrel knot",
  "Basket weave knot",
  "Becket hitch ",
  "Beer knot",
  "Bimini twist",
  "Blackwall hitch",
  "Blake's hitch",
  "Blood knot",
  "Boa knot",
  "Boling knot",
  "Boom hitch",
  "Bourchier knot",
  "Heraldic knot",
  "Bumper knot",
  "Bunny ears",
  "Butterfly loop",
  "Carrick bend",
  "Cat's paw",
  "Catshank",
  "Celtic button knot",
  "Chain sinnet",
  "Chair knot",
  "Clove hitch",
  "Constrictor knot",
  "Cow hitch",
  "Crown knot",
  "Double loop",
  "Dogshank",
  "Diamond knot",
  "Dropper loop",
  "Death knot",
  "Eye splice",
  "Falconer's knot",
  "Farmer's loop",
  "Fiador knot",
  "Figure-eight knot",
  "Fisherman's bend",
  "Friendship knot",
  "Hackamore",
  "Garda hitch",
  "Grief knot",
  "Gordian knot",
  "Grantchester knot",
  "Ground-line hitch",
  "Gripping sailor's hitch",
  "Halter hitch",
  "Handcuff knot",
  "Hangman's noose",
  "Highpoint hitch",
  "Highwayman's hitch",
  "Hitching tie",
  "Hunter's bend",
  "Icicle hitch",
  "Jamming knot",
  "Killick hitch",
  "Klemheist knot",
  "Knot of isis",
  "Lariat loop",
  "Lighterman's hitch",
  "Linemans loop",
  "Lissajous knot",
  "Lobster buoy hitch",
  "Magnus hitch",
  "Marlinespike hitch",
  "Midshipman's hitch",
  "Miller's knot",
  "Monkey's fist",
  "Mountaineer's coil",
  "Munter hitch",
  "Nail knot",
  "Ossel hitch",
  "Overhand bend",
  "Palomar knot",
  "Pile hitch",
  "Pipe hitch",
  "Pretzel link knot",
  "Power cinch",
  "Racking bend",
  "Reef knot",
  "Reever Knot",
  "Rolling hitch",
  "Round turn",
  "Running bowline",
  "Sailor's hitch",
  "Sheepshank",
  "Shoelace knot",
  "Simple knot",
  "Slip knot",
  "Snell knot",
  "Snuggle hitch",
  "Span loop",
  "Square knot",
  "Strangle knot",
  "Surgeon's loop",
  "Tape knot",
  "Thief knot",
  "Transom knot",
  "Thumb knot",
  "Threefoil knot",
  "Trident loop",
  "Trilene knot",
  "Triple crown knot",
  "True lover's knot",
  "Turle knot",
  "Versatackle knot",
  "Underhand knot",
  "Underwriter's knot",
  "Uni knot",
  "Wall and crown knot",
  "Water knot",
  "Windsor knot",
  "Yosemite bowlin",
  "Zeppelin bend",
];

global.text.mscbkatxt = [
  "This fairy tale is about a wolf who eats so much salted meat she becomes trapped in the butcher's cellar.",
  "In this traditional story of beastly intrigue a clever fox convinces an elderly lion to kill a derogatory wolf.",
  "This is an illustrated fairy tale book about a conversation between a mouse and a cat.",
  "An amusing collection of stories featuring a Thunder God on the cover.",
  "This is a well illustrated fairy tale about a war between the birds and the beasts, with particulars on the wartime conduct and eventual fate of the bat.",
  'This book, titled "The Rattlesnake\'s Vengeance" is a collection of local myths and legends.',
  "This fairy tale book is a regional variant of a tale of friendship between the Demon and the Angel",
  'This fairy tale book is entitled "Little Red Cap".  It details a red-cloaked child\'s various encounters with talking wolves.',
  "A collection of ghost stories warning about the dangers of stealing from the dead.",
  "A book of culinary fairy tales.  The cover features an orange fairy juggling a lemon, a lime, and a tangerine slimes.",
  "A book of fables about people who change into birds.",
  'This compendium of amusing folk tales about the devil is titled "Hell\'s Kettle: Legends of the Devil."',
  'This charming book of fables is titled, "The Crystal Mountain and the Princess."',
  "This is a collection of fairy tale stories warning against the consequences of extreme greed.",
  "In this fairy tale a strong man frightens an ogre by squeezing water out of a stone.",
  'This book of rustic folk tales bears the title: "How to Shout Down the Devil."',
  'The title of this book is "Village Folk-tales of Darion."  It includes fables about logical errors and foolish misjudgements of the village men.',
  'This book of folk tales is titled, "The Girl with the Ugly Name, and Other Stories."',
  'Titled "The Fleeing Pancake", this collection of silly folk tales is suitable for small children.',
];

global.wdrop = [{ item: item.lckl, c: 0.0000048 }];
global.rdrop = [
  // g f e
  [{ item: item.lsrd, c: 0.00026 }],
  [{ item: item.lsrd, c: 0.0005 }],
  [
    { item: item.lsrd, c: 0.00098 },
    { item: item.lsstn, c: 0.00023 },
  ],
  [],
  [],
  [],
  [],
];
global.achchk = [
  //1 - you die, 2 - enemy dies
  [
    function (x) {
      if (ttl.ddw.have === false) {
        if ((x.id === 103 || x.id === 102) && x.lvl === 1) {
          giveTitle(ttl.ddw);
        }
      }
    },
  ],
  [
    function (x) {
      if (ttl.kill1.have === false) {
        if (global.stat.akills >= 10000) {
          giveTitle(ttl.kill1);
        }
      }
    },
    function (x) {
      if (ttl.kill2.have === false) {
        if (global.stat.akills >= 50000) {
          giveTitle(ttl.kill2);
        }
      }
    },
    function (x) {
      if (ttl.kill3.have === false) {
        if (global.stat.akills >= 200000) {
          giveTitle(ttl.kill3);
        }
      }
    },
    function (x) {
      if (ttl.kill4.have === false) {
        if (global.stat.akills >= 1000000) {
          giveTitle(ttl.kill4);
        }
      }
    },
    function (x) {
      if (ttl.kill5.have === false) {
        if (global.stat.akills >= 5000000) {
          giveTitle(ttl.kill5);
        }
      }
    },
  ],
];
global.monchk = [
  function (x) {
    if (ttl.mone1.have === false) {
      if (global.stat.moneyg >= GOLD) {
        giveTitle(ttl.mone1);
      }
    }
  },
  //  function(x){if(ttl.mone2.have===false){if(global.stat.moneyg>=GOLD){giveTitle(ttl.mone2)}}},
  //  function(x){if(ttl.mone3.have===false){if(global.stat.moneyg>=GOLD){giveTitle(ttl.mone3)}}},
];
global.ttlschk = [
  function (x) {
    if (ttl.ttsttl1.have === false) {
      if (global.titles.length >= 10) {
        giveTitle(ttl.ttsttl1);
      }
    }
  },
  function (x) {
    if (ttl.ttsttl2.have === false) {
      if (global.titles.length >= 25) {
        giveTitle(ttl.ttsttl2);
      }
    }
  },
  function (x) {
    if (ttl.ttsttl3.have === false) {
      if (global.titles.length >= 50) {
        giveTitle(ttl.ttsttl3);
      }
    }
  },
];

global.shptchk = [
  function (x) {
    if (ttl.shpt1.have === false) {
      if (global.stat.buyt >= 500) {
        giveTitle(ttl.shpt1);
      }
    }
  },
  //  function(x){if(ttl.shpt2.have===false){if(global.stat.buyt>=5000){giveTitle(ttl.shpt2)}}},
  //  function(x){if(ttl.shpt3.have===false){if(global.stat.buyt>=10000){giveTitle(ttl.shpt3)}}},
];
global.cptchk = [
  function (x) {
    if (ttl.cpet1.have === false) {
      if (global.stat.cat_c >= 9999) {
        giveTitle(ttl.cpet1);
      }
    }
  },
];
global.htrchl = [
  function (x) {
    if (ttl.hstr1.have === false) {
      if (x >= 100) {
        giveTitle(ttl.hstr1);
      }
    }
  },
  function (x) {
    if (ttl.hstr2.have === false) {
      if (x >= 250) {
        giveTitle(ttl.hstr2);
      }
    }
  },
  function (x) {
    if (ttl.hstr3.have === false) {
      if (x >= 500) {
        giveTitle(ttl.hstr3);
      }
    }
  },
];
global.nethmchk = [
  function (x) {
    if (ttl.neet.have === false) {
      if (global.stat.athmec >= YEAR) {
        giveTitle(ttl.neet);
      }
    }
  },
  function (x) {
    if (ttl.neet2.have === false) {
      if (global.stat.athmec >= YEAR * 5) {
        giveTitle(ttl.neet2);
      }
    }
  },
  function (x) {
    if (ttl.neet3.have === false) {
      if (global.stat.athmec >= YEAR * 10) {
        giveTitle(ttl.neet3);
      }
    }
  },
];

global.current_m = creature.default;
global.t_n = 0;

global.text.cfc = [
  "White",
  "Black",
  "Orange",
  "Grey",
  "Black&White",
  "Brown",
  "Ginger",
  "Cinnamon",
  "Fawn",
  "Amber",
  "Cream",
  "Chocolate",
];
global.text.cfp = [
  "Spotted",
  "Plain",
  "Solid",
  "Bicolored",
  "Tabby",
  "Tricolored",
  "Calico",
  "Tortoiseshell",
  "Wavy",
  "Fluffy",
  "Siamese",
  "Striped",
];
global.text.cln = [
  "Sleeping",
  "Playing",
  "Catching fireflies",
  "Eating",
  "Fish",
  "People",
  "Running outside",
  "Warm places",
  "Water",
  "Fighting",
  "Meowing",
  "Singing",
  "Catching mice",
  "Its Master",
  "Climbing trees",
  "Toppling objects",
  "Hiding",
  "Safe places",
  "Rooftops",
  "Sitting by the window",
  "Watching others",
  "Master's bed",
  "Being petted",
  "Being brushed",
  "Sitting on laps",
  "Other cats",
  "Dogs",
  "Warm weather",
  "Watching stars",
  "Toys",
  "Meat",
  "Rain",
  "Snow",
];

global._preig = addElement(document.body, "img");
global._preig.src = "ctst.png"; //global._preig.crossOrigin = "Anonymous"; global._preig.src='http://127.0.0.1:8887/ctst.png';
global._preic = addElement(document.body, "canvas");
global._preic_tmain = global._preic.getContext("2d");
global._preic2 = addElement(document.body, "canvas");
global._preic2_tmain = global._preic2.getContext("2d");
global._preic2.width = 512;
global._preic2.height = 512;
global._preig.onload = function () {
  global._preic_tmain.drawImage(global._preig, 0, 0);
  global._preic2_tmain.imageSmoothingEnabled = false;
  global._preic2_tmain.drawImage(global._preig, 0, 0, 400, 400);
};
global.text.bssel = [
  "Ack! There's dust and cobweb everywhere in this place",
  "Spiderweb lands on your face as you enter",
  "Various broken garbage is littered around",
  "You step on some glass shards and crush them",
];
global.text.bsseldark = [
  "Ack! Something touches you from the darkness",
  "You step in and something crunches underneath",
  "You feel like something moved in front of you",
  "You touched cobweb and felt gross",
];

export { global };
