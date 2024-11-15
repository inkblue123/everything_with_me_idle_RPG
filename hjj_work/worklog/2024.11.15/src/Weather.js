var weather = new Object();

function Weather(id) {
  this.name = "?";
  this.id = id || -1;
  this.ontick = function () {};
}

weather.sunny = new Weather(100);
weather.sunny.name = "Sunny";
weather.sunny.c = "yellow";
weather.cloudy = new Weather(101);
weather.cloudy.name = "Cloudy";
weather.cloudy.c = "ghostwhite";
weather.stormy = new Weather(102);
weather.stormy.name = "Stormy";
weather.stormy.c = "#bdbdbd";
weather.overcast = new Weather(103);
weather.overcast.name = "Overcast";
weather.overcast.c = "lightgrey";
weather.storm = new Weather(104);
weather.storm.name = "Storm";
weather.storm.frain = true;
weather.storm.c = "lightgrey";
weather.storm.bc = "#5a5a5a";
weather.thunder = new Weather(105);
weather.thunder.name = "Thunderstorm";
weather.thunder.frain = true;
weather.thunder.c = "yellow";
weather.thunder.bc = "#5a5a5a";
weather.rain = new Weather(106);
weather.rain.name = "Rain";
weather.rain.c = "cyan";
weather.rain.bc = "#2a3971";
weather.rain.frain = true;
weather.heavyrain = new Weather(107);
weather.heavyrain.name = "Heavy rain";
weather.heavyrain.frain = true;
weather.heavyrain.c = "cyan";
weather.heavyrain.bc = "#4d5eb3";
weather.misty = new Weather(108);
weather.misty.name = "Misty";
weather.misty.bc = "#244b68";
weather.foggy = new Weather(109);
weather.foggy.name = "Foggy";
weather.foggy.bc = "#7c8b9a";
weather.drizzle = new Weather(110);
weather.drizzle.name = "Drizzle";
weather.drizzle.bc = "254863";
weather.drizzle.frain = true;
weather.clear = new Weather(111);
weather.clear.name = "Clear";
weather.snow = new Weather(112);
weather.snow.name = "Snow";
weather.snow.c = "white";
weather.snow.bc = "#aaa";
weather.snow.fsnow = true;
weather.sstorm = new Weather(113);
weather.sstorm.name = "Snow Storm";
weather.sstorm.c = "white";
weather.sstorm.bc = "#88a";
weather.sstorm.fsnow = true;

weather.storm.ontick =
  weather.rain.ontick =
  weather.heavyrain.ontick =
  weather.drizzle.ontick =
    function () {
      if (global.flags.inside === false) {
        if (effect.wet.active === false && !you.mods.rnprtk)
          giveEff(you, effect.wet, 5);
        let f = findbyid(global.current_m.eff, effect.wet.id);
        if (!f || f.active === false) giveEff(global.current_m, effect.wet, 5);
      }
    };

weather.thunder.ontick = function () {
  if (global.flags.inside === false) {
    if (effect.wet.active === false && !you.mods.rnprtk)
      giveEff(you, effect.wet, 5);
    let f = findbyid(global.current_m.eff, effect.wet.id);
    if (!f || f.active === false) giveEff(global.current_m, effect.wet, 5);
    if (random() < 0.0009) {
      global.stat.lgtstk++;
      msg("You were struck by lightning!", "black", null, null, "yellow");
      let d = (200 / (1 + skl.aba.lvl * 0.05)) << 0;
      if (you.hp - d < 0) {
        global.atkdfty[0] = 1;
        you.hp = 0;
        you.onDeath();
        giveSkExp(skl.painr, 300);
        giveSkExp(skl.dth, 100);
      } else {
        you.hp -= d;
        giveSkExp(skl.painr, 170);
      }
      giveSkExp(skl.aba, 30);
      dom.d5_1_1.update();
    }
  }
};

export { weather };
