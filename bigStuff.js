const filesize = require("filesize");
const fs = require("fs");
const util = require("util");
const _ = require("lodash");
const path = require("path");
const numberComma = (num) => new Intl.NumberFormat("en-US").format(num);

// let path = ".";
let threshold = 1;

let userInput = process.argv.slice(2);
const command = userInput[0];
const fileName = userInput[1];
const sortCommand = userInput[2];

switch (command) {
  case "-p":
  case "-P":
  case "--p":
  case "--P":
    printTree(fileName);
    break;
  case "-s":
  case "-S":
  case "--s":
  case "--S":
    switch (sortCommand) {
      case "alpha":
        nameSort(fileName);
        break;
      case "exten":
        extSort(fileName);
        break;
      case "size":
        sizeSort(fileName);
        break;
      default:
        printTree(fileName);
        break;
    }
    break;
  case "-m":
  case "-M":
  case "--m":
  case "--M":
    printTree(fileName);
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
    printBlock(fileName);
    break;
  case "-h":
  case "-H":
  case "--h":
  case "--H":
    console.log(usage());
    break;
  default:
    break;
}

// ---------------

function usage() {
  return fs.readFileSync("./help.txt", "utf-8");
  // process.exit(0);
}

function walkDirTree(dirPath) {
  dirPath += "/";
  let parentDir = {
    name: dirPath,
    size: 0,
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

  return parentDir;
}
// walkDirTree("remove_This");
function printTree(parent) {
  const tree = walkDirTree(parent);

  if (!tree.isFile) {
    console.log(tree.name, tree.commaSize);
    for (let children of tree.children) {
      if (children.isFile) {
        console.group();
        console.log(children.name, children.commaSize);
        console.groupEnd();
      } else {
        console.group();
        printTree(children.name);
        console.groupEnd();
      }
    }
  }
}
printTree("remove_this");

function sizeSort(parent, sortKind) {
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
        // console.log(size);
        sizeSort(size.name);
        console.groupEnd();
      }
    }
  }
}

function nameSort(parent) {
  const tree = walkDirTree(parent);

  let childrenSortSize = _.sortBy(tree.children, [
    function (o) {
      return o.name.toLowerCase();
    },
  ]);
  if (!tree.isFile) {
    console.log(tree.name, tree.filesizeString);
    for (let size of childrenSortSize) {
      if (size.isFile) {
        console.group();
        console.log(size.name, size.filesizeString);
        console.groupEnd();
      } else {
        console.group();
        // console.log(size);
        sizeSort(size.name);
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
    console.log(tree.name, tree.filesizeString);
    for (let ext of childrenSortExt) {
      if (ext.isFile) {
        console.group();
        console.log(ext.name);
        console.groupEnd();
      } else {
        console.group();
        sizeSort(ext.name);
        console.groupEnd();
      }
    }
  }
}

function printBlock(parent) {
  const tree = walkDirTree(parent);

  if (!tree.isFile) {
    console.log(tree.name);
    for (let children of tree.children) {
      if (children.isFile) {
        console.group(); // seperation
        console.log(children.name, children.block); // printout name and size
        console.groupEnd(); // end of seperation
      } else {
        console.group();
        printBlock(children.name);
        console.groupEnd();
      }
    }
  }
}
