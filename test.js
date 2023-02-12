const fs = require("fs");

let filesAndFolders = fs.readdirSync(`remove_this/`);

console.log(filesAndFolders);
// let roots = fs.readdirSync(".");

for (let root of filesAndFolders) {
  fs.stat(root, (error, stats) => {
    if (error) {
      console.log(error);
    } else {
      console.log(root, stats);
    }
  });
}
