function getHelp() {
  const fs = require("fs");

  return fs.readFileSync("help.txt", "utf-8");
}

module.exports = getHelp;
function usage() {
  //TODO print the help screen
  process.exit(0);
}
