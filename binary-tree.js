/*
stack:
depthfirst{
    in - D,B,A,C,E left children first
    pre - A,B,D,C,E
    post - D,B,E,C,A children first
}
(queue)breathfirst - A,B,C,D,E
        A
      /   \
    B       C
  /   \   /   \
D               E
*/
// let I = { value: "I", children: [] };
// let H = { value: "H", children: [] };
// let G = { value: "G", children: [] };
// let F = { value: "F", children: [G, H, I] };
// let D = { value: "D", childred: [] };
// let E = { value: "E", childred: [] };
// let B = { value: "B", childred: [D] };
// let C = { value: "C", childred: [E] };
// let A = { value: "A", childred: [B, C, F] };
// let root = A;
// console.log(JSON.stringify(root, null, 2));
// console.log(root.json((data) => data));
const filesize = require("filesize");
const fs = require("fs");
const util = require("util");

// let path = ".";
let threshold = 1;

let userInput = process.argv.slice(2);

switch (userInput[0]) {
  case "-p":
  case "-P":
  case "--p":
  case "--P":
    console.log("userinput:", userInput[1]);
    walkDirTree(userInput[1]);
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
    console.log("userInput[0] peter");
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

function setGlobalFlags() {
  console.log("setGlobalFlags()");
}

function walkDirTree(dirPath) {
  const dirName = dirPath.split("/").pop();
  dirPath += "/";
  let parentDir = {
    name: dirName,
    size: 0, //TODO as each child is process and its size to this
    children: [],
  };
  const names = fs.readdirSync(dirPath);
  for (let name of names) {
    const stat = fs.statSync(`${dirPath}${name}`);
    if (stat.isDirectory()) {
      // console.log(dir);
      let subdir = walkDirTree(`${dirPath}${name}`);
      parentDir.children.push(subdir);
    } else if (stat.isFile()) {
      let size = stat.size;
      let file = { name, size };
      parentDir.children.push(file);
    }
  }
  //maybe sort here
  return parentDir;
}

// walkDirTree(userInput[2]);

function printTree(parent) {
  console.log("printTree() TODO");
  // TODO walk your tree datastructure preoder
  //print parent info
  console.group();
  for (let child of parent.children) {
    //for every child od parent
    if (child.children) {
    }
    //print childs info
    //if child is directory
    //printTree(child)
    // else child is file
    // print file info
  }
  console.groupEnd();
}

function main() {
  setGlobalFlags();
  const tree = walkDirTree("remove_this");
  console.log(JSON.stringify(tree, null, 2));
  printTree(tree);
}

main();
// console.log(`./`);

//ELEPHANT CODE GRAVEYARD
// function breadthFirst(cur) {
//   if (cur === null) return;
//   let nodes = [cur];
//   while (nodes.length) {
//     cur = nodes.shift();
//     if (cur.left) nodes.push(cur.left);
//     if (cur.right) nodes.push(cur.right);
//     console.log(cur.value);
//   }
// }
// breadthFirst(root);
//
// function postOrder(cur) {
//   // children
//   for (let child of cur.children) postOrder(cur.value);
//   // parent
//   console.log(cur.value);
// }
// console.log(`\n postOrder`);
// postOrder(root);
