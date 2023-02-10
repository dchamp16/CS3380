// calculating block (size / 4096)
// use / so it works for everything

//TODO seperate file give the extension
//readme.txt txt
//.gitignore gitignore
//music '' << if no extension
//document ''

async function checkFile(path) {
  const fs = require("fs");
  const filesize = require("filesize");

  let rootFolder = fs.readdirSync(path);
  let arrayFile = [];

  try {
    for (let [key, value] of rootFolder.entries()) {
      await fs.stat(rootFolder[key], (error, stats) => {
        console.log(stats);
        if (error) {
          console.log(error.message);
        } else {
          //TODO check if its file or directory
          if (stats.isFile) {
            arrayFile.push({
              name: rootFolder[key],
              sizeNum: stats.size,
              sizeStr: filesize.filesize(stats.size),
              isFile: stats.isFile(),
              isDirectory: stats.isDirectory(),
              blocks: Math.ceil(stats.size / 4096),
            });
          }
        }
        arrayFile.sort((a, b) => a.sizeNum - b.sizeNum);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
  await setTimeout(() => {
    // console.log(arrayFile);
  }, 100);
}

checkFile(".");

/* clear the console in 10 second */
setTimeout(() => {
  console.clear();
}, 10_000);

function usage() {
  //TODO print the help screen
  process.exit(0);
}
