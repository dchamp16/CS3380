async function checkFile(path) {
  const fs = require("fs");
  const filesize = require("filesize");

  let rootFolder = fs.readdirSync(path);
  let arrayFile = [];

  for (let [key, value] of rootFolder.entries()) {
    await fs.stat(rootFolder[key], (error, stats) => {
      if (error) {
        console.log(error.message);
      } else {
        arrayFile.push({
          name: rootFolder[key],
          sizeNum: stats.size,
          sizeStr: filesize.filesize(stats.size),
          isFile: stats.isFile(),
          isDirectory: stats.isDirectory(),
        });
      }
      arrayFile.sort((a, b) => a.sizeNum - b.sizeNum);
    });
  }
  await setTimeout(() => {
    console.log(arrayFile);
  }, 100);
}

checkFile(".");

/* clear the console in 10 second */
setTimeout(() => {
  console.clear();
}, 10_000);
