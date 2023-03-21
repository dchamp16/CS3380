const { globSync, Glob, globIterateSync } = require("glob");

// const g2 = new Glob("/**/*.js", { withFileTypes: false });
const label = "root globbing";
// sync iteration works as well
console.time(label);
// /dev/**/*.js <<path
for (const file of globIterateSync("/**/*.js")) {
  console.timeEnd(label);
  console.log(file);
  //   break;
}
