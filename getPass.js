const fs = require("fs");
let arrPass = [];
fs.readFile("mcupws.json", "utf8", (error, data) => {
  if (error) {
    console.error(error);
  }
  const jsonObject = JSON.parse(data);
  for (let i = 0; i < 1000; i++) {
    arrPass.push(jsonObject[i]);
  }
  console.log(arrPass);
});
