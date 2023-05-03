const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;

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

if (cluster.isMaster) {
  // Master process

  console.log(`Master ${process.pid} is running`);

  // Spawn workers
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exit and respawn
  cluster.on("exit", (worker, code, signal) => {
    console.log(
      `Worker ${worker.process.pid} died with code ${code}. Respawning...`
    );
    cluster.fork();
  });
} else {
  // Worker process

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
    console.time(`Worker ${process.pid} processing time`);
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
    console.timeEnd(`Worker ${process.pid} processing time`);
    fs.writeFileSync(
      `peer.2K.hashes.answers.${process.pid}.txt`,
      result.join("\n")
    );
    process.exit();
  })();
}
