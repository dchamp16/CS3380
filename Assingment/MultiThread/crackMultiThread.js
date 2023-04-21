const fs = require("fs");
const { Worker, isMainThread } = require("worker_threads");
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
  ...Object.values(JSON.parse(fs.readFileSync("./mcupws.json", "utf8"))),
  ...genCh(1),
  ...genCh(2),
  ...genCh(3),
];

if (isMainThread) {
  console.time(`${numCPUs} cores sync`);
  if (fs.existsSync("hashes.answers.txt")) {
    fs.unlinkSync("hashes.answers.txt");
    console.log("Removed old hashes.answers.txt");
  }
  const [, , qty] = process.argv.map(Number);
  const splitQty = qty / numCPUs;
  let workersCompleted = 0;

  for (let i = 0; i < numCPUs; i++) {
    const start = i * splitQty;
    const end = i * splitQty + splitQty;
    const worker = new Worker(__filename, {
      workerData: { start, end },
    });
    worker.on("exit", () => {
      workersCompleted++;
      if (workersCompleted === numCPUs) {
        console.timeEnd(`${numCPUs} cores sync`); //10 cores sync: 21:22.853 (m:ss.mmm)
        console.log("All workers completed");
        process.exit();
      }
    });
  }
} else {
  const { start, end } = require("worker_threads").workerData;
  (async () => {
    let partnerHash = fs
      .readFileSync("ZhihuiChen.2k.hashes.txt", "utf8")
      .split("\n")
      .slice(start, end);
    partnerHash = await Promise.all(
      partnerHash.map(async (hash) => {
        const result = `${hash} ${await bcryptCompare(hash)}`;
        console.log(`Hash processed: ${result}`);
        return result;
      })
    );
    fs.appendFileSync(
      "hashes.answers.txt",
      [partnerHash.join("\n")].join("") + "\n"
    );

    process.exit();
  })();
}

async function bcryptCompare(hash) {
  for (let str of stringsList) {
    if (await bcrypt.compare(str, hash)) {
      return str;
    }
  }
  return "";
}
