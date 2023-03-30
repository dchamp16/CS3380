const fs = require("fs");
function printPassword(file) {
  fs.readFile(file, "utf-8", (err, data) => {
    err ? console.log(err) : console.log(data);
  });
}
printPassword("scrapePassword.json");
