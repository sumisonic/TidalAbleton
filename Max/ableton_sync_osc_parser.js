autowatch = 1;
inlets = 1;
outlets = 1;

function list() {
  var a = arrayfromargs(arguments);
  post("received list " + a + "\n");
}

function anything() {
  // post(arguments)
  var args = arrayfromargs(arguments);
  switch (messagename) {
    case "/ableton_sync":
      parseOSC(arguments);
      break;
  }
}

function parseOSC(arguments) {
  var args = arrayfromargs(arguments);
  var params = {};
  for (i=0; i<args.length; i+=2) {
    // post(args[i], args[i+1], "\n")
    params[args[i]] = args[i+1];
  }

  //Play
  var play = params["play"];
  if (play != null) {
    outlet(0, ["play", play]);
  }

  //Prams
  var delta = params["delta"]
  var target = params["target"];
  var value = params["value"];
  if (delta != null && target != null && value != null) {
    var gate = params["gate"] != null ? params["gate"] : 1.0
    var glide = params["glide"] != null ? params["glide"] : 0.0
    var curve = params["curve"] != null ? params["curve"] : 0.0
    var gain = params["gain"] != null ? params["gain"] : 1.0
    // post("parse: " + args + "\n")
    outlet(0, ["params", value*gain, gate, glide, curve, delta, target])
  }
}
