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

async function postOrder(dirPath) {
  const names = fs.readdirSync(dirPath);
  for (let name of names) {
    const stat = fs.statSync(`${dirPath}/${name}`);
    console.log(stat);
    if (stat.isDirectory()) {
      let parentDir = {
        name: stat.name,
        size: 0, //TODO
        children: [], //TODO pass the children
      };
      let subDir = postOrder(`${dirPath}/${name}`);
      parentDir.children.push(subDir);
    } else if (stat.isFile()) {
      let size = stat.size;
      let file = {
        name: `${name}`,
        size: size,
      };
      console.log(file);
    }
  }
}
postOrder(".");

function printTree(tree) {
  console.log("printTree() TODO");
  console.group();
  console.groupEnd();
}

function main() {
  const tree = postOrder(".");
}

// main();
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
