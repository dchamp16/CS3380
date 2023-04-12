const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");

function* pwsOfLen(n) {
  const alphanumeric =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  if (n === 1) yield* alphanumeric;
  else {
    yield* _.flatMap(alphanumeric, (ch1) => {
      return _.map(pwsOfLen(n - 1), (ch2) => ch1 + ch2);
    });
  }
}

(async function crack() {
  const textPass = Object.values(
    JSON.parse(fs.readFileSync("mcupws.json", "utf-8"))
  );

  // Generate passwords up to a maximum length of 8 characters
  const maxLength = 8;
  let listPass = [...textPass, ""];
  for (let len = 1; len <= maxLength; len++) {
    listPass.push(...pwsOfLen(len));
  }

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
