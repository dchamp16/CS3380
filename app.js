async function preOrder(directory) {
  const fs = require("fs");
  const path = require("path");

  const children2 = await fs.readdirSync(directory);
  console.log(children2);
  // await children2.forEach((data) => {
  //   const stat = fs.stat(`test/${data}`, (err, stats) => {
  //     console.log(data);
  //     console.log(stats);
  //   });
  // });

  return;
  try {
    console.log(`/${directory}/`);
    const children = await fs.readdirSync(directory);
    await children.forEach((data) => {
      const stats = fs.statSync(data);
      const dirEntry = {
        name: data,
        size: stats.size,
      };
      console.log(dirEntry);
    });
  } catch (error) {
    console.log(error);
  }
}
preOrder(".");

// BLOAT CODE

/* 
  let folder = await fs.readdirSync(__dirname);
  await folder.forEach((data) => {
    const stats = fs.statSync(data);
    console.log(data);
    console.log(stats);
  });

  // console.log(fs.statSync(folder[0]));
  return;
*/
