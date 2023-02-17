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

let path = ".";
let threshold = 1;

function usage() {
  process.exit(0);
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

walkDirTree("remove_this");

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
