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

  let filesFolders = fs.readdirSync(path);
  let arrayFile = [{}];
  /*
regex check string if it has extension name
example: true
  example.txt
  doc.exe
  .gitignore
example: false
  document
  peterFiles
  mycomputer
  */
  const regexExtensionName = new RegExp(/[\.][\w]+/);

  try {
    for (let value of filesFolders) {
      await fs.stat(value, (error, stats) => {
        if (error) {
          console.log(error.message);
        } else {
          //checks if it a file
          if (stats.isDirectory() && !regexExtensionName.test(value)) {
            fs.stat(value + "/", (error, folder) => {
              arrayFile.push({
                name: value,
                sizeNum: folder.size,
                sizeStr: filesize.filesize(stats.size),
                isDirectory: folder.isDirectory(),
                blocks: Math.ceil(stats.size / 4096),
                files: [],
              });
            });
            //checkk if its a file
          } else {
            arrayFile.push({
              name: value,
              sizeNum: stats.size,
              sizeStr: filesize.filesize(stats.size),
              isFile: stats.isFile(),
              blocks: Math.ceil(stats.size / 4096),
            });
          }
        }
        const fs.readdirSync()


        for (let directory of directories) {
          fs.stat(`${__dirname}/${value}/${directory}`, (error, subFile) => {
            // console.log(subFile);
            console.log(arrayFile);
            // arrayFile[0].files.push({
            //   name: directory,
            //   sizeNum: subFile.size,
            //   sizeStr: filesize.filesize(subFile.size),
            //   isDirectory: subFile.isDirectory(),
            //   blocks: Math.ceil(stats.size / 4096),
            // });
          });
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
}, 15_000);

function usage() {
  //TODO print the help screen
  process.exit(0);
}
