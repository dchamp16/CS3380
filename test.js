let fs = require("fs");

let filesAndFolders = fs.readdirSync(".");

for (let fileAndFolder of filesAndFolders) {
  fs.stat(fileAndFolder, (error, stats) => {
    if (error) throw error;
    if (stats.isDirectory()) {
      //   console.log(fileAndFolder, "FOLDER");
    } else if (stats.isFile()) {
    }
  });
}
