const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");

const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function* genCh(len) {
  if (len === 1) yield* ALPHABET;
  else {
    for (let ch1 of ALPHABET) {
      for (let ch2 of genCh(len - 1)) {
        yield ch1 + ch2;
      }
    }
  }
}

(async function crack() {
  const textPass = Object.values(
    JSON.parse(fs.readFileSync("mcupws.json", "utf-8"))
  );

  // Generate passwords up to a maximum length of 8 characters
  let listPass = [...textPass, "", ...genCh(1), ...genCh(2), ...genCh(3)];

  let partnerHash = fs
    .readFileSync("ZhihuiChen.2k.hashes.txt", "utf-8")
    .split("\n");

  let result = [];
  console.time("process");
  for (const hash of partnerHash) {
    let password;
    for (const str of listPass) {
      if (bcrypt.compareSync(str, hash)) {
        password = str;
        break;
      }
    }
    result.push(`${hash} ${password}`);
    console.log(`Processed hash: ${hash}`);
  }
  console.timeEnd("process");
  fs.writeFileSync("peer.2K.hashes.answers.txt", result.join("\n"));
})();
