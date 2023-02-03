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

async function preOrder(path) {
  const fs = require("fs");
  // parent
  const dirEntries = await fs.readdirSync(path, { withFileTypes: true });
  // children
  for (let dirEntry of dirEntries) {
    const stats = await fs.statSync(dirEntry);
    if (dirEntry.isDirectory()) {
      let dir = {
        name: `${dirEntry.name}/`,
        size: 0,
      };
      console.log(dir);
    } else if (dirEntry.isFile()) {
      let size = await fs.statSync(`${path}${dirEntry.name}`);
      let file = {
        name: `${dirEntry.name}/`,
        size: size,
      };
      console.log(file);
    }
  }
}
preOrder(".");
console.log(`./`);

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
