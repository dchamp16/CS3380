const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { readFileSync, appendFileSync, existsSync, unlink } = require("fs");
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
const strLst = [
  "",
  ...Object.values(JSON.parse(readFileSync("./mcupws.json", "utf8"))),
  ...genCh(1),
  ...genCh(2),
  ...genCh(3),
];

if (cluster.isPrimary) {
  console.time(`${numCPUs} cores sync`);
  if (existsSync("./hashes.answers.txt")) {
    unlink("./hashes.answers.txt", (err) => {
      if (err) throw err;
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
      // when all workers are done
      console.timeEnd(`${numCPUs} cores sync`); // 10 cores sync: 15:50.058 (m:ss.mmm) for submittion
      process.exit();
    }
  });
} else {
  process.on("message", ({ start, end }) => {
    let hashLst = readFileSync("hashtest.txt", "utf8")
      .split("\n")
      .slice(start, end);
    hashLst = hashLst.map(
      (hash) => `${hash} ${strLst.find((str) => bcrypt.compareSync(str, hash))}`
    );
    appendFileSync("./hashes.answers.txt", [hashLst.join("\n")].join(""));
    process.exit();
  });
}
