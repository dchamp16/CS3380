const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");
let arrPass = [];

fs.readFile("mcupws.json", "utf8", (error, data) => {
  console.time("print hash");
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
  let emptryString = 1;
  while (emptryString <= 500) {
    arrPass.push("");
    emptryString++;
  }
  /* --------------- */
  const hashes = [];
  const salt = bcrypt.genSaltSync(4);
  for (let pw of arrPass) {
    const hash = bcrypt.hashSync(pw, salt);
    hashes.push(hash);
  }
  const shuffledHashes = _.shuffle(hashes);

  fs.writeFile("PeterRamos.2K.hashes.txt", shuffledHashes.join("\n"), (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
  console.timeEnd("print hash");
});

/* generator function random char */
function* alphanumericGenerator() {
  const chars = /a-zA-Z0-9/;

  // Produce 390 characters of 1 alphanumeric

  for (let i = 0; i < 390; i++) {
    let str = "";
    str += String.fromCharCode(Math.floor(Math.random() * 26) + 97);
    str += String.fromCharCode(Math.floor(Math.random() * 26) + 65);
    str += String.fromCharCode(Math.floor(Math.random() * 10) + 48);
    str = str.charAt(Math.floor(Math.random() * 3));
    yield str;
  }

  // Produce 100 characters of 2 alphanumeric
  for (let i = 0; i < 100; i++) {
    let str = "";
    for (let j = 0; j < 2; j++) {
      str += chars.test(
        String.fromCharCode(Math.floor(Math.random() * 62) + 48)
      )
        ? String.fromCharCode(Math.floor(Math.random() * 62) + 48)
        : String.fromCharCode(Math.floor(Math.random() * 25) + 97);
    }
    yield str;
  }

  // Produce 10 characters of 3 alphanumeric
  for (let i = 0; i < 10; i++) {
    let str = "";
    for (let j = 0; j < 3; j++) {
      str += chars.test(
        String.fromCharCode(Math.floor(Math.random() * 62) + 48)
      )
        ? String.fromCharCode(Math.floor(Math.random() * 62) + 48)
        : String.fromCharCode(Math.floor(Math.random() * 25) + 97);
    }
    yield str;
  }
}

/* ----------- */
