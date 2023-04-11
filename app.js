const bcrypt = require("bcryptjs");
const fs = require("fs");

const alphanumeric =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";

function* pwsOfLen(n) {
  if (n === 1) yield* alphanumeric;
  else {
    for (let ch1 of alphanumeric) {
      for (let ch2 of pwsOfLen(n - 1)) {
        yield ch1 + ch2;
      }
    }
  }
}

fs.readFile("hashtest.txt", "utf-8", (err, peerPass) => {
  if (err) {
    console.log(err);
    return;
  }

  const peerHashed = peerPass.split("\n");
  const crackingPass = ["", ...pwsOfLen(1), ...pwsOfLen(2), ...pwsOfLen(3)];

  fs.readFile("mcupws.json", "utf-8", (err, scrapePass) => {
    if (err) {
      console.log(err);
      return;
    }
    const jsonObject = JSON.parse(scrapePass);
    for (let i = 0; i < 9983; i++) {
      crackingPass.push(jsonObject[i]);
    }
    console.time("cracking");

    for (let j = 0; j < peerHashed.length; j++) {
      for (let k = 0; k < crackingPass.length; k++) {
        let compare = bcrypt.compareSync(crackingPass[k], peerHashed[j]);
        if (compare) {
          console.log(crackingPass[k], peerHashed[j]);
        }
      }
    }
    console.timeEnd("cracking");
  });
});
