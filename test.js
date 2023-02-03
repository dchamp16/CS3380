const fs = require("fs");

async function postOrder(path) {
  // parent
  const dirEntries = await fs.readdirSync(path, { withFileTypes: true });
  // children
  for (let dirEntry of dirEntries) {
    if (dirEntry.isDirectory()) {
      let dir = {
        name: `${dirEntry.name}/`,
        size: 0, //TODO
        children: [], //TODO
      };
      console.log(dir);
      postOrder(`${path}${dir.name}`);
    } else if (dirEntry.isFile()) {
      let size = await fs.statSync(`${path}${dirEntry.name}`).size;
      let file = {
        name: `${dirEntry.name}/`,
        size: size,
      };
      console.log(file);
    }
  }
}
postOrder("/");
// console.log(`./`);
