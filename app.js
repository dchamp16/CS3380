const bcrypt = require("bcryptjs");
const fs = require("fs");

fs.readFile("hashtest.txt", "utf-8", (err, peerPass) => {
  if (err) {
    console.log(err);
    return;
  }

  const peerHashed = peerPass.split("\n");
  const crackingPass = [];

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
    for (let k = 0; k < peerHashed.length; k++) {
      for (let j = 0; j < crackingPass.length; j++) {
        bcrypt.compare(crackingPass[j], peerHashed[k], (err, result) => {
          if (err) throw err;
          if (result) {
            console.log(`${peerHashed[k]} ${crackingPass[j]}`);
          }
        });
      }
    }
    console.timeEnd("cracking");
    console.log("Password not found.");
  });
});
