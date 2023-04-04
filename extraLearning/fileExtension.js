const path = require("path");

let extensions = ["readme.txt", "test.js", ".gitignore", "document", "peter"];

for (let extension of extensions) {
  let ext = path.extname(extension).slice(1);
  console.log(ext);
}
