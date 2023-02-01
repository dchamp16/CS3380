import Fs from "@supercharge/fs";
async function preOrder(path) {
  const fs = require("fs");
  //   console.log(fs.statSync("./remove_this"));
  let fileSize = Fs.size("remove_this");
  console.log(fileSize);
  return;
  try {
    console.log(`${path}/`);
    const children = await fs.readdirSync(path);
    await children.forEach((data) => {
      const stats = fs.statSync(data);
      const dirEntry = {
        name: data,
        size: stats.size,
      };
      console.log(dirEntry);

      //   console.log(data);
      //   console.log(stats);
    });
  } catch (error) {
    console.log(error);
  }
}
preOrder(".");
