const fs = require("fs");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const bcrypt = require("bcryptjs");

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

const stringsList = [
  "",
  ...Object.values(JSON.parse(fs.readFileSync("mcupws.json", "utf8"))),
  ...genCh(1),
  ...genCh(2),
  ...genCh(3),
];

if (cluster.isPrimary) {
  console.time(`${numCPUs} cores sync`);
  if (fs.existsSync("./hashes.answers.txt")) {
    fs.unlink("./hashes.answers.txt", (err) => {
      if (err) throw err;
      console.log("Removed old hashes.answers.txt");
    });
  }
  const [, , qty] = process.argv.map(Number);
  const splitQty = qty / numCPUs;
  let workersCompleted = 0;

  for (let i = 0; i < numCPUs; i++) {
    const worker = cluster.fork();
    let msg = { start: i * splitQty, end: i * splitQty + splitQty };
    worker.send(msg);
  }

  cluster.on("exit", () => {
    workersCompleted++;
    if (workersCompleted === numCPUs) {
      console.timeEnd(`${numCPUs} cores sync`); //10 cores sync: 21:44.179 (m:ss.mmm)
      console.log("All workers completed");
      process.exit();
    }
  });
} else {
  process.on("message", async ({ start, end }) => {
    let partnerHash = fs
      .readFileSync("hashtest.txt", "utf8")
      .split("\n")
      .slice(start, end);
    partnerHash = partnerHash.map(async (hash) => {
      const result = `${hash} ${bcryptCompare(hash)}`;
      console.log(`Hash processed: ${result}`);
      return result;
    });
    fs.appendFileSync("./hashes.answers.txt", [partnerHash.join()].join(""));
    process.exit();
  });
}

function bcryptCompare(hash) {
  for (let str of stringsList) {
    if (bcrypt.compare(str, hash)) {
      return str;
    }
  }
  return "";
}
