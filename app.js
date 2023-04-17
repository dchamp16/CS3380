const bcrypt = require("bcryptjs");
const fs = require("fs");
const _ = require("lodash");
const cluster = require("cluster");

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

async function crack() {
  const textPass = Object.values(
    JSON.parse(fs.readFileSync("mcupws.json", "utf-8"))
  );

  // Generate passwords up to a maximum length of 8 characters
  let listPass = [...textPass, "", ...genCh(1), ...genCh(2), ...genCh(3)];

  let partnerHash = fs
    .readFileSync("ZhihuiChen.2k.hashes.txt", "utf-8")
    .split("\n");

  let result = [];

  if (cluster.isMaster) {
    console.time("process");

    // Create a worker for each CPU core
    const numWorkers = require("os").cpus().length;
    for (let i = 0; i < numWorkers; i++) {
      const worker = cluster.fork();

      // Send the list of passwords to each worker
      worker.send({ listPass });
    }

    cluster.on("online", (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
    });

    let numHashesProcessed = 0;

    cluster.on("message", (worker, message) => {
      // Receive the result of a hash processing from a worker
      const { hash, password } = message;
      result.push(`${hash} ${password}`);

      numHashesProcessed++;
      console.log(
        `Processed hash ${numHashesProcessed} of ${partnerHash.length}`
      );

      if (numHashesProcessed === partnerHash.length) {
        console.timeEnd("process");
        fs.writeFileSync("peer.2K.hashes.answers.txt", result.join("\n"));

        // Send an exit message to each worker
        for (const id in cluster.workers) {
          cluster.workers[id].send({ exit: true });
        }
      }
    });
  } else {
    // Receive the list of passwords from the master process
    process.on("message", (message) => {
      const { listPass } = message;

      // Process hashes using the list of passwords assigned to this worker
      for (const hash of partnerHash) {
        let password;
        for (const str of listPass) {
          if (bcrypt.compareSync(str, hash)) {
            password = str;
            break;
          }
        }
        process.send({ hash, password });
      }

      // Send an exit message to the master process
      process.send({ exit: true });
    });
  }
}

crack();
