const fs = require("fs");
const chalk = require("chalk");

function specificLine(command) {
  fs.readFile("help-en-US.txt", "utf8", (err, data) => {
    if (err) {
      console.log(err.message);
    } else {
      let arrHelp = data.split("\n");
      let commandRegex = new RegExp("^-g", "g");
      for (let helpFile of arrHelp) {
        console.log(typeof helpFile);
        // if (helpFile.test(commandRegex)) {
        //   console.log(chalk.bgCyanBright(helpFile));
        // } else {
        //   console.log("exit");
        // }
      }
    }
  });
}
specificLine();
