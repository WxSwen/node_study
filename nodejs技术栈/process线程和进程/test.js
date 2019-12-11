var process = require("process");

function lastNextTick() {
  console.log("nexttick");
}

process.nextTick(lastNextTick);
console.log("???");
