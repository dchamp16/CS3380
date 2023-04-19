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
  if (fs.existsSync("./hashes.answers.txt")) {
    fs.unlink("./hashes.answers.txt", (err) => {
      if (err) throw err;
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
  process.on("message", async ({ start, end }) => {
    let hashList = fs
      .readFileSync("./ZhihuiChen.2k.hashes.txt", "utf8")
      .split("\n")
      .slice(start, end);
    hashList = await Promise.all(
      hashList.map(async (hash) => {
        const result = `${hash} ${await bcryptCompare(hash)}`;
        console.log(`Hash processed: ${result}`);
        return result;
      })
    );
    fs.appendFileSync("./hashes.answers.txt", [hashList.join("\n")].join(""));
    process.exit();
  });
}
