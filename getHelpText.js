function getHelp() {
  const fs = require("fs");

  return fs.readFileSync("help.txt", "utf-8");
}

module.exports = getHelp;
