const util = require("util");
const _ = require("lodash");
const getHelpText = require("./getHelpText");

// ------------------- user input

let userInput = process.argv.slice(2);

switch (userInput[0]) {
  case "-p":
  case "-P":
  case "--p":
  case "--P":
    console.log("userinput:", userInput[1]);
    checkFile(userInput[1]);
    break;
  case "-s":
  case "-S":
  case "--s":
  case "--S":
    //TODO sort alpha, extension, size
    break;
  case "-m":
  case "-M":
  case "--m":
  case "--M":
    //TODO size display KB,MB,GB TB instead of bytes
    break;
  case "-t":
  case "-T":
  case "--t":
  case "--T":
    // TODO min, only displays files and folders of at least minimum size. min is the number of billions. min may be an integer like 20 or a decimal fraction like 0.25. Default is -t 1.
    break;
  case "-b":
  case "-B":
  case "--b":
  case "--B":
    // TODO displays the actual storage sizes on disk. default is not blocksize
    break;
  case "-h":
  case "-H":
  case "--h":
  case "--H":
    // TODO displays the actual storage sizes on disk. default is not blocksize
    break;
  default:
    usage();
    break;
}

// ---------------

async function checkFile(path) {
  const fs = require("fs");
  const filesize = require("filesize");

  let filesFolders = fs.readdirSync(path);
  let arrayFiles = [];
  let temArr;
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
          if (stats.isFile && regexExtensionName.test(value)) {
            // console.log("file:", value);
            /* end test */
            fs.stat(value, (error, folder) => {
              arrayFiles.push({
                name: value,
                sizeNum: folder.size,
                sizeStr: filesize.filesize(stats.size),
                isDirectory: folder.isDirectory(),
                blocks: Math.ceil(stats.size / 4096),
              });
            });
            //checkk if its a file
          } else if (stats.isDirectory && !regexExtensionName.test(value)) {
            // console.log("direcory:", value);
            /* end test */
            arrayFiles.push({
              name: value,
              sizeNum: stats.size,
              sizeStr: filesize.filesize(stats.size),
              isFile: stats.isFile(),
              blocks: Math.ceil(stats.size / 4096),
              files: [],
            });

            // console.log(folderFiles);
          }
        }
        arrayFiles.sort((a, b) => a.sizeNum - b.sizeNum);
      });
    }

    let folders = fs.readdirSync(`.`);
    temArr = []; //TODO: change name
    for (let file of folders) {
      fs.stat(file, (error, subfile) => {
        if (subfile.isDirectory() && !regexExtensionName.test(subfile)) {
          let files = `${__dirname}/${file}`;
          let foldersWithFile = fs.readdirSync(files);
          foldersWithFile.forEach((data) => {
            // console.log(file);
            // if() //check if the extension same
            fs.stat(`${files}/${data}`, (err, fileStat) => {
              temArr.push({
                name: data,
                directoryName: file,
                sizeNum: fileStat.size,
                sizeStr: filesize.filesize(fileStat.size),
                isFile: fileStat.isFile(),
                blocks: Math.ceil(fileStat.size / 4096),
              });
            });
          });
        }
      });
    }
    setTimeout(() => {
      // console.log(temArr);
    }, 100);
  } catch (error) {
    console.log(error.message);
  }

  //compare() check if obj1 has key "files" then check if obj1 and obj2 subfile === then push all subfile to obj1 files
  function compare(obj1, obj2) {
    for (let directory in obj1) {
      for (let subFile in obj2) {
        if (Object.hasOwn(obj1[directory], "files")) {
          if (obj1[directory].name === obj2[subFile].directoryName) {
            obj1[directory].files.push(obj2[subFile]);
          }
        }
      }
    }
  }

  await setTimeout(() => {
    compare(arrayFiles, temArr);
    //sorted decending order
    let sorted = _.sortBy(arrayFiles, "sizeNum").reverse();

    console.log(util.inspect(sorted, { showHidden: false, depth: null }));

    // console.log(arrayFiles);
  }, 1000);
}

// checkFile(".");

/* clear the console in 10 second */
// setTimeout(() => {
//   console.clear();
// }, 15_000);

function usage() {
  //TODO print the help screen
  process.exit(0);
}
