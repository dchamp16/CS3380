const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");
let arrPass = [];

fs.readFile("mcupws.json", "utf8", (error, data) => {
  if (error) {
    console.error(error);
  }
  const jsonObject = JSON.parse(data);
  for (let i = 0; i < 1000; i++) {
    arrPass.push(jsonObject[i]);
  }
  /* generator */
  const gen = alphanumericGenerator();

  for (let i = 0; i < 390 + 99 + 10; i++) {
    arrPass.push(gen.next().value);
  }
  /* --------------- */

  /* generate empty string */
  let emptryString = 0;
  while (emptryString <= 500) {
    arrPass.push("");
    emptryString++;
  }
  /* --------------- */
  const hashes = [];

  for (let pw of arrPass) {
    const hash = bcrypt.hashSync(pw, 4);
    hashes.push(hash);
  }
  const shuffledHashes = _.shuffle(hashes);
  fs.writeFile("PeterRamos.2K.hashes.txt", shuffledHashes.join("\n"), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
});

/* generator function random char */
function* alphanumericGenerator() {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";

  // Produce 390 characters of 1 alphanumeric

  for (let i = 0; i < 390; i++) {
    let str = "";
    str += chars[Math.floor(Math.random() * chars.length)];
    yield str;
  }

  // Produce 100 characters of 2 alphanumeric

  for (let i = 0; i < 99; i++) {
    let str = "";
    for (let j = 0; j < 2; j++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    yield str;
  }

  // Produce 10 characters of 3 alphanumeric
  for (let i = 0; i < 10; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    yield str;
  }
}

/* ----------- */
