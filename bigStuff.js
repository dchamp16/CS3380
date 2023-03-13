const filesize = require("filesize");
const fs = require("fs");
const _ = require("lodash");
const path = require("path");
const chalk = require('chalk')

console.log(chalk.blue("Hello world!"));

/*
let threshold = 1;

let userInput = process.argv.slice(2);
const command = userInput[0];
const sortCommand = userInput[1];

switch (command) {
  case "-p":
  case "--path":
    printTree(fileName);
    break;
  case "-s":
  case "--sort":
    switch (sortCommand) {
      case "alpha":
        inputSortDirectory();
        break;
      case "exten":
        inputSortDirectory();
        break;
      case "size":
        inputSortDirectory();
        break;
      default:
        inputSortDirectory();
        break;
    }
    break;
  case "-m":
  case "--metric":
    printTree(fileName);
    break;
  case "-t":
  case "--threshold":
    getThreshold(fileName);
    break;
  // case "-b":
  // case "--block":
  //   printBlock(fileName);
  //   break;
  case "-h":
  case "--help":
    usage();
    break;
  default:
    break;
}

// ---------------

function usage() {
  // let lang = "en";
  // let loc = "US";
  process.stdout.write("Enter Language");
  process.stdout.write("  >  ");
  // process.stdin.on("data", (data) => {
  //   console.log(data.toString().trimEnd()); //TODO need to get user prefer language help
  // });
  // return fs.readFileSync(`./help-${lang}-${loc}.txt`, "utf-8");
  // process.exit(0);
}

function walkDirTree(dirPath) {
  dirPath += "/";
  let parentDir = {
    name: dirPath,
    size: 0,
    commaSize: "",
    filesizeString: "",
    isFile: false,
    children: [],
  };
  const names = fs.readdirSync(dirPath);
  for (let name of names) {
    const stat = fs.statSync(`${dirPath}${name}`);
    if (stat.isDirectory()) {
      let subdir = walkDirTree(`${dirPath}${name}`);
      parentDir.children.push(subdir);
    } else if (stat.isFile()) {
      let size = stat.size;
      let file = {
        name,
        size,
        commaSize: size.toLocaleString(),
        filesizeString: "",
        isFile: stat.isFile(),
        ext: path.extname(name).slice(1),
        block: Math.ceil(size / 4096),
      };
      parentDir.children.push(file);
    }
  }
  parentDir.children.forEach((sizes, index) => {
    parentDir.size += sizes.size;
    parentDir.children[index].filesizeString = filesize.filesize(sizes.size);
  });
  parentDir.filesizeString = filesize.filesize(parentDir.size);
  parentDir.commaSize = parentDir.size.toLocaleString();

  return parentDir;
}

// walkDirTree("remove_This");

function printTree(parent) {
  const tree = walkDirTree(parent);

  if (!tree.isFile) {
    console.log(
      tree.name,
      command === "-m"
        ? tree.filesizeString
        : command === "--metric"
        ? tree.filesizeString
        : tree.commaSize
    );
    for (let children of tree.children) {
      if (children.isFile) {
        console.group();
        console.log(
          children.name,
          command === "-m"
            ? children.filesizeString
            : command === "--metric"
            ? children.filesizeString
            : children.commaSize
        );
        console.groupEnd();
      } else {
        console.group();
        printTree(children.name);
        console.groupEnd();
      }
    }
  }
}

if (command === ".") {
  printTree(".");
}

function sizeSort(parent) {
  const tree = walkDirTree(parent);
  let childrenSortSize = _.sortBy(tree.children, [
    function (o) {
      return o.size;
    },
  ]).reverse();

  if (!tree.isFile) {
    console.log(tree.name, tree.filesizeString);
    for (let size of childrenSortSize) {
      if (size.isFile) {
        console.group();
        console.log(size.name, size.filesizeString);
        console.groupEnd();
      } else {
        console.group();
        sizeSort(size.name);
        console.groupEnd();
      }
    }
  }
}

function nameSort(parent) {
  const tree = walkDirTree(parent);

  let childrenSortName = _.sortBy(tree.children, [
    function (o) {
      return o.name.toLowerCase();
    },
  ]);

  if (!tree.isFile) {
    console.log(tree.name);
    for (let size of childrenSortName) {
      if (size.isFile) {
        console.group();
        console.log(size.name);
        console.groupEnd();
      } else {
        console.group();
        nameSort(size.name);
        console.groupEnd();
      }
    }
  }
}

function extSort(parent) {
  const tree = walkDirTree(parent);

  let childrenSortExt = _.sortBy(tree.children, [
    function (o) {
      return o.ext;
    },
  ]);

  if (!tree.isFile) {
    console.log(tree.name);
    for (let ext of childrenSortExt) {
      if (ext.isFile) {
        console.group();
        console.log(ext.name, ext.ext);
        console.groupEnd();
      } else {
        console.group();
        extSort(ext.name);
        console.groupEnd();
      }
    }
  }
}

// function printBlock(parent) {
//   const tree = walkDirTree(parent);

//   if (!tree.isFile) {
//     console.log(tree.name);
//     for (let children of tree.children) {
//       if (children.isFile) {
//         console.group(); // seperation
//         console.log(children.name, children.block); // printout name and size
//         console.groupEnd(); // end of seperation
//       } else {
//         console.group();
//         printBlock(children.name);
//         console.groupEnd();
//       }
//     }
//   }
// }

function getThreshold(parent) {
  const tree = walkDirTree(parent);
  const billion = 1_000_000_000;

  if (tree.size < threshold * billion) {
    if (!tree.isFile) {
      console.log(tree.name, tree.filesizeString);
      for (let size of childrenSortSize) {
        if (size.isFile) {
          console.group();
          console.log(size.name, size.filesizeString);
          console.groupEnd();
        } else {
          console.group();
          sizeSort(size.name);
          console.groupEnd();
        }
      }
    }
  } else {
    process.exit();
  }
}

function inputSortDirectory() {
  process.stdout.write("Enter directory name");
  process.stdout.write("  >  ");
  process.stdin.on("data", (data) => {
    switch (sortCommand) {
      case "alpha":
        nameSort(data.toString().trimEnd());
        break;
      case "exten":
        extSort(data.toString().trimEnd());
        break;
      case "size":
        sizeSort(data.toString().trimEnd());
        break;
      default:
        printTree(data.toString().trimEnd());
        break;
    }
    process.exit();
  });
}
*/
